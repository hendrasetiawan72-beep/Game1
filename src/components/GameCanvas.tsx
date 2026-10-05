import React, { useRef, useEffect, useCallback } from 'react';
import { GameState, NPCData, PlayerState, ZoneId } from '../types/game';
import { MAP_ZONES } from '../game/mapData';
import { ProceduralRenderer } from '../game/proceduralRenderer';
import { NPCS } from '../data/story';
import { sound } from '../utils/audio';

interface GameCanvasProps {
  player: PlayerState;
  onUpdatePlayer: (update: Partial<PlayerState>) => void;
  gameState: GameState;
  onTalkToNPC: (npc: NPCData) => void;
  onEnterDoor: (targetZone: ZoneId, targetX: number, targetY: number) => void;
  onTriggerMinigame: (type: 'akl' | 'otomotif' | 'tjkt') => void;
  onInspectObject: (msg: string, clueId?: string, label?: string) => void;
  virtualDirection?: { x: number; y: number } | null;
  onRegisterInteractTrigger?: (triggerFn: () => void) => void;
  setNearbyInteractable: (has: boolean) => void;
  isPaused?: boolean;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  player,
  onUpdatePlayer,
  gameState,
  onTalkToNPC,
  onEnterDoor,
  onTriggerMinigame,
  onInspectObject,
  virtualDirection = null,
  onRegisterInteractTrigger,
  setNearbyInteractable,
  isPaused = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysDown = useRef<Record<string, boolean>>({});
  const clickTarget = useRef<{ x: number; y: number } | null>(null);
  const touchStartRef = useRef<{ clientX: number; clientY: number; time: number } | null>(null);
  const touchMoveDir = useRef<{ vx: number; vy: number } | null>(null);
  const flickImpulse = useRef<{ vx: number; vy: number; ticks: number } | null>(null);
  const timeTickRef = useRef<number>(0);
  const playerRef = useRef<PlayerState>(player);
  const lastDoorTriggerTime = useRef<number>(0);

  playerRef.current = player;
  const zone = MAP_ZONES[player.zone];

  // Active NPCs in this zone for current chapter
  const activeNPCs = NPCS.filter(npc => {
    if (npc.zone !== player.zone) return false;
    if (npc.requiredChapter && gameState.currentChapter < npc.requiredChapter) return false;
    return true;
  });

  // Check collision with obstacles and NPCs.
  // If moving AWAY from or reducing overlap with an obstacle or NPC, the movement is permitted,
  // preventing the player from ever getting stuck.
  const isPositionBlocked = useCallback((toX: number, toY: number, fromX: number, fromY: number, radius: number = 8) => {
    const curZone = MAP_ZONES[playerRef.current.zone];
    if (!curZone) return false;

    // Check boundary margins (allow moving away from boundary if already out)
    if (toX - radius < 12) {
      if (toX < fromX) return true; // Moving deeper into left wall
    }
    if (toX + radius > curZone.width - 12) {
      if (toX > fromX) return true; // Moving deeper into right wall
    }
    if (toY - radius < 12) {
      if (toY < fromY) return true; // Moving deeper into top wall
    }
    if (toY + radius > curZone.height - 12) {
      if (toY > fromY) return true; // Moving deeper into bottom wall
    }

    // Check map obstacles
    for (const obs of curZone.obstacles) {
      const closestToX = Math.max(obs.x, Math.min(toX, obs.x + obs.w));
      const closestToY = Math.max(obs.y, Math.min(toY, obs.y + obs.h));
      const distToSq = (toX - closestToX) ** 2 + (toY - closestToY) ** 2;

      if (distToSq < radius * radius) {
        // Overlapping with obstacle.
        // Compare with previous distance:
        const closestFromX = Math.max(obs.x, Math.min(fromX, obs.x + obs.w));
        const closestFromY = Math.max(obs.y, Math.min(fromY, obs.y + obs.h));
        const distFromSq = (fromX - closestFromX) ** 2 + (fromY - closestFromY) ** 2;

        // If moving AWAY from the obstacle (distance is increasing), ALLOW IT!
        if (distToSq > distFromSq + 0.001) {
          continue;
        }
        return true;
      }
    }

    // Check NPC collision (NPC foot radius ~8, player foot radius ~8 -> combined ~16)
    const combinedNpcRadius = radius + 8;
    for (const npc of activeNPCs) {
      const distToSq = (toX - npc.x) ** 2 + (toY - (npc.y + 10)) ** 2;
      if (distToSq < combinedNpcRadius * combinedNpcRadius) {
        const distFromSq = (fromX - npc.x) ** 2 + (fromY - (npc.y + 10)) ** 2;
        // If moving away from NPC, ALLOW IT!
        if (distToSq > distFromSq + 0.001) {
          continue;
        }
        return true;
      }
    }

    return false;
  }, [activeNPCs]);

  // Find nearest interactable target (NPC, Door, or Object) with generous hit radius
  const getNearestInteractable = useCallback(() => {
    const p = playerRef.current;
    const curZone = MAP_ZONES[p.zone];

    // 1. Check NPCs with generous talk radius
    for (const npc of activeNPCs) {
      const dist = Math.hypot(npc.x - p.x, npc.y - p.y);
      if (dist < 95) {
        return { type: 'npc' as const, data: npc };
      }
    }

    // 2. Check Doors (Generous radius of 150px so player easily triggers door exit)
    if (curZone) {
      for (const door of curZone.doors) {
        const doorCenterX = door.x + door.w / 2;
        const doorCenterY = door.y + door.h / 2;
        const dist = Math.hypot(doorCenterX - p.x, doorCenterY - p.y);
        if (dist < 150) {
          return { type: 'door' as const, data: door };
        }
      }
    }

    // 3. Check Interactive Objects
    if (curZone) {
      for (const obj of curZone.objects) {
        const objCenterX = obj.x + obj.w / 2;
        const objCenterY = obj.y + obj.h / 2;
        const dist = Math.hypot(objCenterX - p.x, objCenterY - p.y);
        if (dist < 85) {
          return { type: 'object' as const, data: obj };
        }
      }
    }

    // 4. If inside a lab and in bottom doorway zone, return exit door
    if (p.zone !== 'courtyard' && p.y >= 470 && curZone && curZone.doors.length > 0) {
      return { type: 'door' as const, data: curZone.doors[0] };
    }

    return null;
  }, [activeNPCs]);

  // Trigger interaction (E, Space, or Action button)
  const triggerInteract = useCallback(() => {
    const target = getNearestInteractable();
    if (!target) {
      // If player is inside a lab and presses action button near bottom, trigger exit to Courtyard
      const p = playerRef.current;
      if (p.zone !== 'courtyard' && p.y >= 450) {
        const curZone = MAP_ZONES[p.zone];
        if (curZone && curZone.doors.length > 0) {
          const door = curZone.doors[0];
          sound.playSparkle();
          clickTarget.current = null;
          onEnterDoor(door.targetZone, door.targetX, door.targetY);
        }
      }
      return;
    }

    if (target.type === 'npc') {
      sound.playClick();
      onTalkToNPC(target.data);
    } else if (target.type === 'door') {
      sound.playSparkle();
      clickTarget.current = null;
      onEnterDoor(target.data.targetZone, target.data.targetX, target.data.targetY);
    } else if (target.type === 'object') {
      const obj = target.data;
      if (obj.type === 'minigame_station') {
        sound.playClick();
        if (playerRef.current.zone === 'akl') onTriggerMinigame('akl');
        else if (playerRef.current.zone === 'otomotif') onTriggerMinigame('otomotif');
        else if (playerRef.current.zone === 'tjkt') onTriggerMinigame('tjkt');
      } else if (obj.inspectMessage) {
        sound.playClick();
        onInspectObject(obj.inspectMessage, obj.unlockClueId, obj.label);
      }
    }
  }, [getNearestInteractable, onTalkToNPC, onEnterDoor, onTriggerMinigame, onInspectObject]);

  // Register direct interact trigger callback for VirtualControls
  useEffect(() => {
    if (onRegisterInteractTrigger) {
      onRegisterInteractTrigger(triggerInteract);
    }
  }, [onRegisterInteractTrigger, triggerInteract]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const code = e.code;
      keysDown.current[code] = true;
      clickTarget.current = null;

      if (code === 'KeyE' || code === 'Space' || code === 'Enter') {
        e.preventDefault();
        triggerInteract();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerInteract]);

  // Main 60fps Game Loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      timeTickRef.current += 1;
      const curP = playerRef.current;
      const curZone = MAP_ZONES[curP.zone];

      if (isPaused) {
        if (curP.isMoving) {
          onUpdatePlayer({ isMoving: false });
        }
        clickTarget.current = null;
        render();
        animId = requestAnimationFrame(loop);
        return;
      }

      let vx = 0;
      let vy = 0;
      const speed = 3.6;

      const k = keysDown.current;
      if (k['KeyW'] || k['ArrowUp']) vy -= 1;
      if (k['KeyS'] || k['ArrowDown']) vy += 1;
      if (k['KeyA'] || k['ArrowLeft']) vx -= 1;
      if (k['KeyD'] || k['ArrowRight']) vx += 1;

      // Continuous touch drag on screen
      if (touchMoveDir.current) {
        vx = touchMoveDir.current.vx;
        vy = touchMoveDir.current.vy;
      } else if (virtualDirection) {
        vx = virtualDirection.x;
        vy = virtualDirection.y;
      }

      // Jentik layar / flick impulse gesture
      if (flickImpulse.current && flickImpulse.current.ticks > 0) {
        vx = flickImpulse.current.vx * 1.7;
        vy = flickImpulse.current.vy * 1.7;
        flickImpulse.current.ticks -= 1;
        if (flickImpulse.current.ticks <= 0) {
          flickImpulse.current = null;
        }
      }

      if (clickTarget.current) {
        const dx = clickTarget.current.x - curP.x;
        const dy = clickTarget.current.y - curP.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 8) {
          vx = dx / dist;
          vy = dy / dist;
        } else {
          clickTarget.current = null;
        }
      }

      // Failsafe auto-unstuck: If player is embedded inside an obstacle, nudge outward to safety
      if (curZone) {
        for (const obs of curZone.obstacles) {
          const closestX = Math.max(obs.x, Math.min(curP.x, obs.x + obs.w));
          const closestY = Math.max(obs.y, Math.min(curP.y, obs.y + obs.h));
          const dx = curP.x - closestX;
          const dy = curP.y - closestY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 8 * 8) {
            const dist = Math.sqrt(distSq) || 1;
            const pushX = (dx / dist) * 2.5;
            const pushY = (dy / dist) * 2.5;
            const newX = curP.x + (pushX !== 0 ? pushX : 0);
            const newY = curP.y + (pushY !== 0 ? pushY : 2.5);
            onUpdatePlayer({ x: newX, y: newY });
            break;
          }
        }
      }

      const len = Math.hypot(vx, vy);
      let newDir = curP.direction;

      if (len > 0.05) {
        const normX = (vx / len) * speed;
        const normY = (vy / len) * speed;

        if (Math.abs(vx) > Math.abs(vy)) {
          newDir = vx > 0 ? 'right' : 'left';
        } else {
          newDir = vy > 0 ? 'down' : 'up';
        }

        let nextX = curP.x;
        let nextY = curP.y;

        if (!isPositionBlocked(curP.x + normX, curP.y, curP.x, curP.y)) {
          nextX = curP.x + normX;
        }
        if (!isPositionBlocked(nextX, curP.y + normY, curP.x, curP.y)) {
          nextY = curP.y + normY;
        }

        if (nextX !== curP.x || nextY !== curP.y || newDir !== curP.direction || !curP.isMoving) {
          onUpdatePlayer({
            x: nextX,
            y: nextY,
            direction: newDir,
            isMoving: true
          });
        }
      } else if (curP.isMoving) {
        onUpdatePlayer({ isMoving: false });
      }

      // Check door triggers (walk directly onto door mat) with 1200ms debounce
      const now = Date.now();
      if (!isPaused && curZone && now - lastDoorTriggerTime.current > 1200) {
        for (const door of curZone.doors) {
          if (
            curP.x >= door.x - 20 &&
            curP.x <= door.x + door.w + 20 &&
            curP.y >= door.y - 20 &&
            curP.y <= door.y + door.h + 20
          ) {
            lastDoorTriggerTime.current = now;
            sound.playSparkle();
            clickTarget.current = null;
            onEnterDoor(door.targetZone, door.targetX, door.targetY);
            break;
          }
        }

        // Additional fail-safe: stepping near the bottom doorway inside any lab transitions to Courtyard
        if (curP.zone !== 'courtyard' && curP.y >= 540 && curP.x >= 320 && curP.x <= 580) {
          const exitDoor = curZone.doors[0];
          if (exitDoor) {
            lastDoorTriggerTime.current = now;
            sound.playSparkle();
            clickTarget.current = null;
            onEnterDoor(exitDoor.targetZone, exitDoor.targetX, exitDoor.targetY);
          }
        }
      }

      // Update nearby interactable status for action button glow
      const near = getNearestInteractable();
      setNearbyInteractable(!!near);

      // Render Canvas
      render();

      animId = requestAnimationFrame(loop);
    };

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const p = playerRef.current;
      const curZone = MAP_ZONES[p.zone];
      if (!curZone) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const viewW = rect.width;
      const viewH = rect.height;

      let camX = p.x - viewW / 2;
      let camY = p.y - viewH / 2;

      camX = Math.max(0, Math.min(camX, curZone.width - viewW));
      camY = Math.max(0, Math.min(camY, curZone.height - viewH));

      ctx.translate(-camX, -camY);
      ctx.clearRect(0, 0, curZone.width, curZone.height);

      ProceduralRenderer.drawZone(ctx, p.zone, gameState.currentChapter, timeTickRef.current);

      activeNPCs.forEach(npc => {
        const isAnswered = !!gameState.answeredNpcs?.[`${npc.id}_ch${gameState.currentChapter}`];
        ProceduralRenderer.drawNPC(ctx, npc, p.x, p.y, timeTickRef.current, isAnswered);
      });

      ProceduralRenderer.drawPlayer(ctx, p, timeTickRef.current);

      // Door nearby prompt
      curZone.doors.forEach(door => {
        const distToDoor = Math.hypot(door.x + door.w / 2 - p.x, door.y + door.h / 2 - p.y);
        if (distToDoor < 130) {
          const promptY = door.y > 100 ? door.y - 36 : door.y + door.h + 24;
          ProceduralRenderer.roundRect(ctx, door.x + door.w / 2 - 60, promptY, 120, 24, 12, '#BFE8D6', '#4A4A5E', 2);
          ctx.fillStyle = '#1E8449';
          ctx.font = 'bold 10px Poppins, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🚪 EXIT / ENTER (E)', door.x + door.w / 2, promptY + 16);
        }
      });

      if (clickTarget.current) {
        ctx.beginPath();
        ctx.arc(clickTarget.current.x, clickTarget.current.y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = '#5DADE2';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [
    isPositionBlocked,
    getNearestInteractable,
    onEnterDoor,
    onUpdatePlayer,
    setNearbyInteractable,
    virtualDirection,
    activeNPCs,
    gameState.currentChapter
  ]);

  // Handle touch and flick pointer events for mobile touch screen & desktop mouse
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if pointer capture unsupported
    }
    touchStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      time: Date.now()
    };
    touchMoveDir.current = null;
    flickImpulse.current = null;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!touchStartRef.current) return;
    const dx = e.clientX - touchStartRef.current.clientX;
    const dy = e.clientY - touchStartRef.current.clientY;
    const dist = Math.hypot(dx, dy);

    // If dragging/swiping finger continuously across the screen, move smoothly with finger
    if (dist > 16) {
      touchMoveDir.current = { vx: dx / dist, vy: dy / dist };
      clickTarget.current = null;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!touchStartRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      touchStartRef.current = null;
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const p = playerRef.current;
    const curZone = MAP_ZONES[p.zone];
    if (!curZone) {
      touchStartRef.current = null;
      return;
    }

    const dt = Date.now() - touchStartRef.current.time;
    const dx = e.clientX - touchStartRef.current.clientX;
    const dy = e.clientY - touchStartRef.current.clientY;
    const dist = Math.hypot(dx, dy);

    touchMoveDir.current = null;

    // 1. JENTIK LAYAR / FLICK GESTURE
    // A quick, energetic swipe on screen gives an instant momentum impulse in that direction!
    if (dt < 320 && dist > 25) {
      flickImpulse.current = {
        vx: dx / dist,
        vy: dy / dist,
        ticks: 15
      };
      clickTarget.current = null;
      sound.playStep();
      touchStartRef.current = null;
      return;
    }

    // 2. TAP GESTURE (Small movement or single tap)
    if (dist < 22) {
      let camX = p.x - rect.width / 2;
      let camY = p.y - rect.height / 2;
      camX = Math.max(0, Math.min(camX, curZone.width - rect.width));
      camY = Math.max(0, Math.min(camY, curZone.height - rect.height));

      const clickX = e.clientX - rect.left + camX;
      const clickY = e.clientY - rect.top + camY;

      // 1. Check doors
      for (const door of curZone.doors) {
        if (
          clickX >= door.x - 40 &&
          clickX <= door.x + door.w + 40 &&
          clickY >= door.y - 40 &&
          clickY <= door.y + door.h + 40
        ) {
          const distToDoor = Math.hypot(door.x + door.w / 2 - p.x, door.y + door.h / 2 - p.y);
          if (distToDoor < 180 || (p.zone !== 'courtyard' && (p.x <= 90 || p.x >= 810 || p.y >= 450))) {
            sound.playSparkle();
            clickTarget.current = null;
            onEnterDoor(door.targetZone, door.targetX, door.targetY);
            touchStartRef.current = null;
            return;
          }
          clickTarget.current = { x: door.x + door.w / 2, y: door.y + door.h / 2 };
          touchStartRef.current = null;
          return;
        }
      }

      // Direct lab exit click: clicking bottom doorway in a lab
      if (p.zone !== 'courtyard' && clickY >= 520 && clickX >= 300 && clickX <= 600) {
        const exitDoor = curZone.doors[0];
        if (exitDoor) {
          sound.playSparkle();
          clickTarget.current = null;
          onEnterDoor(exitDoor.targetZone, exitDoor.targetX, exitDoor.targetY);
          touchStartRef.current = null;
          return;
        }
      }

      // 2. Check NPCs (triggered strictly on pointer up so touch has ended!)
      for (const npc of activeNPCs) {
        const distToNpc = Math.hypot(npc.x - clickX, npc.y - clickY);
        if (distToNpc < 55) {
          const distToPlayer = Math.hypot(npc.x - p.x, npc.y - p.y);
          if (distToPlayer < 95) {
            sound.playClick();
            onTalkToNPC(npc);
            touchStartRef.current = null;
            return;
          }
          clickTarget.current = { x: npc.x, y: npc.y };
          touchStartRef.current = null;
          return;
        }
      }

      // 3. Check objects
      for (const obj of curZone.objects) {
        if (
          clickX >= obj.x - 20 &&
          clickX <= obj.x + obj.w + 20 &&
          clickY >= obj.y - 20 &&
          clickY <= obj.y + obj.h + 20
        ) {
          const distToObj = Math.hypot(obj.x + obj.w / 2 - p.x, obj.y + obj.h / 2 - p.y);
          if (distToObj < 95) {
            sound.playClick();
            if (obj.type === 'minigame_station') {
              if (p.zone === 'akl') onTriggerMinigame('akl');
              else if (p.zone === 'otomotif') onTriggerMinigame('otomotif');
              else if (p.zone === 'tjkt') onTriggerMinigame('tjkt');
            } else if (obj.inspectMessage) {
              onInspectObject(obj.inspectMessage, obj.unlockClueId, obj.label);
            }
            touchStartRef.current = null;
            return;
          }
          clickTarget.current = { x: obj.x + obj.w / 2, y: obj.y + obj.h / 2 };
          touchStartRef.current = null;
          return;
        }
      }

      // 4. Default: set waypoint to walk toward
      clickTarget.current = { x: clickX, y: clickY };
    }

    touchStartRef.current = null;
  };

  const handlePointerCancel = () => {
    touchStartRef.current = null;
    touchMoveDir.current = null;
    flickImpulse.current = null;
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-[#FFFBF5]"
      style={{
        backgroundImage: 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSbn8VvgDB_HZ-RfHFLJ6cm94IUJBXb2dPeFIOc8Q9F1fw826C9ui7G2q2ArRV_wLhkqHrFYHVuWnO9lwDkt5B67xxQEhyphenhyphenZmKrLhp4adzFBElL-9naX0Y_8JbC4YhAZbYywZdN5q6h32lCAMv931_lGJygObpkP4xFeiQFl1EEd_UpSJIRl-eUpq1s5O8N/s506/50562.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="w-full h-full block cursor-crosshair touch-none select-none"
      />
    </div>
  );
};
