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
  onInspectObject: (msg: string, clueId?: string) => void;
  virtualDirection: { x: number; y: number } | null;
  onInteractRequested: () => void;
  setNearbyInteractable: (has: boolean) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  player,
  onUpdatePlayer,
  gameState,
  onTalkToNPC,
  onEnterDoor,
  onTriggerMinigame,
  onInspectObject,
  virtualDirection,
  setNearbyInteractable
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysDown = useRef<Record<string, boolean>>({});
  const clickTarget = useRef<{ x: number; y: number } | null>(null);
  const timeTickRef = useRef<number>(0);
  const playerRef = useRef<PlayerState>(player);

  playerRef.current = player;
  const zone = MAP_ZONES[player.zone];

  // Active NPCs in this zone for current chapter
  const activeNPCs = NPCS.filter(npc => {
    if (npc.zone !== player.zone) return false;
    if (npc.requiredChapter && gameState.currentChapter < npc.requiredChapter) return false;
    return true;
  });

  // Check collision with obstacles
  const checkCollision = useCallback((x: number, y: number, radius: number = 14) => {
    const curZone = MAP_ZONES[playerRef.current.zone];
    if (!curZone) return false;

    // Check boundary margins
    if (x - radius < 0 || x + radius > curZone.width || y - radius < 0 || y + radius > curZone.height) {
      return true;
    }

    // Check map obstacles
    for (const obs of curZone.obstacles) {
      const closestX = Math.max(obs.x, Math.min(x, obs.x + obs.w));
      const closestY = Math.max(obs.y, Math.min(y, obs.y + obs.h));
      const distX = x - closestX;
      const distY = y - closestY;
      if (distX * distX + distY * distY < radius * radius) {
        return true;
      }
    }

    // Check NPC collision
    for (const npc of activeNPCs) {
      const dx = x - npc.x;
      const dy = y - npc.y;
      if (dx * dx + dy * dy < (radius + 14) * (radius + 14)) {
        return true;
      }
    }

    return false;
  }, [activeNPCs]);

  // Find nearest interactable target (NPC, Door, or Object)
  const getNearestInteractable = useCallback(() => {
    const p = playerRef.current;
    const curZone = MAP_ZONES[p.zone];

    // 1. Check NPCs
    for (const npc of activeNPCs) {
      const dist = Math.hypot(npc.x - p.x, npc.y - p.y);
      if (dist < 70) {
        return { type: 'npc' as const, data: npc };
      }
    }

    // 2. Check Doors
    if (curZone) {
      for (const door of curZone.doors) {
        const doorCenterX = door.x + door.w / 2;
        const doorCenterY = door.y + door.h / 2;
        const dist = Math.hypot(doorCenterX - p.x, doorCenterY - p.y);
        if (dist < 80) {
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
        if (dist < 75) {
          return { type: 'object' as const, data: obj };
        }
      }
    }

    return null;
  }, [activeNPCs]);

  // Trigger interaction (E, Space, or Action button)
  const triggerInteract = useCallback(() => {
    const target = getNearestInteractable();
    if (!target) return;

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
        onInspectObject(obj.inspectMessage, obj.unlockClueId);
      }
    }
  }, [getNearestInteractable, onTalkToNPC, onEnterDoor, onTriggerMinigame, onInspectObject]);

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

      let vx = 0;
      let vy = 0;
      const speed = 3.6;

      const k = keysDown.current;
      if (k['KeyW'] || k['ArrowUp']) vy -= 1;
      if (k['KeyS'] || k['ArrowDown']) vy += 1;
      if (k['KeyA'] || k['ArrowLeft']) vx -= 1;
      if (k['KeyD'] || k['ArrowRight']) vx += 1;

      if (virtualDirection) {
        vx = virtualDirection.x;
        vy = virtualDirection.y;
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

        if (!checkCollision(curP.x + normX, curP.y)) {
          nextX = curP.x + normX;
        }
        if (!checkCollision(nextX, curP.y + normY)) {
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

      // Check door triggers (walk directly onto door mat)
      if (curZone) {
        for (const door of curZone.doors) {
          if (
            curP.x >= door.x - 10 &&
            curP.x <= door.x + door.w + 10 &&
            curP.y >= door.y - 10 &&
            curP.y <= door.y + door.h + 10
          ) {
            sound.playSparkle();
            clickTarget.current = null;
            onEnterDoor(door.targetZone, door.targetX, door.targetY);
            break;
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
        ProceduralRenderer.drawNPC(ctx, npc, p.x, p.y, timeTickRef.current);
      });

      ProceduralRenderer.drawPlayer(ctx, p, timeTickRef.current);

      // Door nearby prompt
      curZone.doors.forEach(door => {
        const distToDoor = Math.hypot(door.x + door.w / 2 - p.x, door.y + door.h / 2 - p.y);
        if (distToDoor < 85) {
          const promptY = door.y > 100 ? door.y - 32 : door.y + door.h + 24;
          ProceduralRenderer.roundRect(ctx, door.x + door.w / 2 - 45, promptY, 90, 20, 10, '#BFE8D6', '#4A4A5E', 1.5);
          ctx.fillStyle = '#4A4A5E';
          ctx.font = 'bold 9px Poppins, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🚪 ENTER (E)', door.x + door.w / 2, promptY + 13);
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
    checkCollision,
    getNearestInteractable,
    onEnterDoor,
    onUpdatePlayer,
    setNearbyInteractable,
    virtualDirection,
    activeNPCs,
    gameState.currentChapter
  ]);

  // Handle canvas click/tap to walk or interact
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const p = playerRef.current;
    const curZone = MAP_ZONES[p.zone];
    if (!curZone) return;

    let camX = p.x - rect.width / 2;
    let camY = p.y - rect.height / 2;
    camX = Math.max(0, Math.min(camX, curZone.width - rect.width));
    camY = Math.max(0, Math.min(camY, curZone.height - rect.height));

    const clickX = e.clientX - rect.left + camX;
    const clickY = e.clientY - rect.top + camY;

    // 1. If clicked near a door, enter immediately if already close, or walk directly there
    for (const door of curZone.doors) {
      if (
        clickX >= door.x - 20 &&
        clickX <= door.x + door.w + 20 &&
        clickY >= door.y - 20 &&
        clickY <= door.y + door.h + 20
      ) {
        const dist = Math.hypot(door.x + door.w / 2 - p.x, door.y + door.h / 2 - p.y);
        if (dist < 85) {
          sound.playSparkle();
          clickTarget.current = null;
          onEnterDoor(door.targetZone, door.targetX, door.targetY);
          return;
        }
        clickTarget.current = { x: door.x + door.w / 2, y: door.y + door.h / 2 };
        return;
      }
    }

    // 2. If clicked near an NPC, talk if close or walk to them
    for (const npc of activeNPCs) {
      const dist = Math.hypot(npc.x - clickX, npc.y - clickY);
      if (dist < 40) {
        const distToPlayer = Math.hypot(npc.x - p.x, npc.y - p.y);
        if (distToPlayer < 75) {
          sound.playClick();
          onTalkToNPC(npc);
          return;
        }
        clickTarget.current = { x: npc.x, y: npc.y };
        return;
      }
    }

    // 3. General waypoint navigation
    clickTarget.current = { x: clickX, y: clickY };
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FFFBF5]">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full block cursor-crosshair touch-none"
      />
    </div>
  );
};
