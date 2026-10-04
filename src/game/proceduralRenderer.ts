import { AvatarType, NPCData, PlayerState, ZoneId } from '../types/game';
import { MAP_ZONES } from './mapData';

export class ProceduralRenderer {
  // Soft drop shadow
  public static drawShadow(ctx: CanvasRenderingContext2D, x: number, y: number, radiusX: number, radiusY: number) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(74, 74, 94, 0.14)';
    ctx.fill();
    ctx.restore();
  }

  // Smooth rounded rectangle
  public static roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill: string,
    stroke?: string,
    strokeWidth: number = 1.5
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw full zone background and detailed decor
  public static drawZone(
    ctx: CanvasRenderingContext2D,
    zoneId: ZoneId,
    chapter: number,
    timeTick: number
  ) {
    const zone = MAP_ZONES[zoneId];
    if (!zone) return;

    // 1. Fill ground base
    ctx.fillStyle = zone.backgroundColor;
    ctx.fillRect(0, 0, zone.width, zone.height);

    // 2. Zone specific detailed floor patterns
    if (zoneId === 'courtyard') {
      this.drawCourtyardFloor(ctx, zone.width, zone.height, chapter, timeTick);
    } else if (zoneId === 'akl') {
      this.drawAKLFloor(ctx, zone.width, zone.height, timeTick);
    } else if (zoneId === 'otomotif') {
      this.drawOtomotifFloor(ctx, zone.width, zone.height, timeTick);
    } else if (zoneId === 'tjkt') {
      this.drawTJKTFloor(ctx, zone.width, zone.height, timeTick);
    }

    // 3. Walls & Architectural Trims
    this.drawWallsAndBoundaries(ctx, zone);

    // 4. Doors & Transitions
    zone.doors.forEach(door => {
      this.drawDoor(ctx, door, timeTick);
    });

    // 5. Zone Static Objects & Detailed Equipment
    zone.objects.forEach(obj => {
      this.drawMapObject(ctx, obj, zoneId, chapter, timeTick);
    });
  }

  private static drawCourtyardFloor(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    chapter: number,
    timeTick: number
  ) {
    // Soft manicured grass
    ctx.fillStyle = '#E4F4E7';
    ctx.fillRect(40, 50, w - 80, h - 100);

    // Subtle grass tufts
    ctx.fillStyle = '#C8E6C9';
    for (let gx = 80; gx < w - 80; gx += 110) {
      for (let gy = 80; gy < h - 80; gy += 100) {
        ctx.fillRect(gx, gy, 3, 5);
        ctx.fillRect(gx + 4, gy - 2, 3, 7);
        ctx.fillRect(gx + 8, gy + 1, 3, 4);
      }
    }

    // Central paved plaza with border bevel
    this.drawShadow(ctx, 550, 375, 275, 215);
    this.roundRect(ctx, 275, 155, 550, 430, 24, '#EFEAE1');
    this.roundRect(ctx, 280, 160, 540, 420, 20, '#FFFBF5');

    // Stone pathway checker grid
    ctx.save();
    ctx.strokeStyle = 'rgba(74, 74, 94, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 310; x < 800; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 160);
      ctx.lineTo(x, 580);
      ctx.stroke();
    }
    for (let y = 190; y < 560; y += 35) {
      ctx.beginPath();
      ctx.moveTo(280, y);
      ctx.lineTo(820, y);
      ctx.stroke();
    }
    ctx.restore();

    // Connecting paths to doors
    this.roundRect(ctx, 265, 50, 80, 120, 12, '#FFFBF5', '#E5DFD5', 1);
    this.roundRect(ctx, 510, 50, 80, 120, 12, '#FFFBF5', '#E5DFD5', 1);
    this.roundRect(ctx, 755, 50, 80, 120, 12, '#FFFBF5', '#E5DFD5', 1);
    this.roundRect(ctx, 485, 560, 130, 140, 12, '#FFFBF5', '#E5DFD5', 1);

    // Decorative stone fountains / planters
    this.drawFlowerBed(ctx, 345, 185, 90, 55, ['#F8CFDA', '#FFF1B8', '#BFDDF5'], timeTick);
    this.drawFlowerBed(ctx, 665, 185, 90, 55, ['#FFD9C7', '#BFE8D6', '#DCCFF0'], timeTick);
    this.drawFlowerBed(ctx, 355, 505, 90, 50, ['#FFF1B8', '#F8CFDA', '#BFE8D6'], timeTick);
    this.drawFlowerBed(ctx, 655, 505, 90, 50, ['#BFDDF5', '#FFD9C7', '#DCCFF0'], timeTick);

    // Campus trees in grass corners
    this.drawCampusTree(ctx, 100, 320);
    this.drawCampusTree(ctx, 980, 300);

    // Chapter 3 Celebration Bunting & Confetti!
    if (chapter === 3) {
      this.drawCelebrationBunting(ctx, w, timeTick);
    }
  }

  private static drawCampusTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.drawShadow(ctx, x, y + 25, 24, 10);
    // Trunk
    this.roundRect(ctx, x - 5, y, 10, 25, 3, '#795548');
    // Foliage layers
    ctx.fillStyle = '#81C784';
    ctx.beginPath();
    ctx.arc(x, y - 10, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#A5D6A7';
    ctx.beginPath();
    ctx.arc(x - 5, y - 14, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#C8E6C9';
    ctx.beginPath();
    ctx.arc(x + 6, y - 18, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawFlowerBed(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: string[], timeTick: number) {
    this.drawShadow(ctx, x + w / 2, y + h / 2 + 5, w / 2, h / 2);
    this.roundRect(ctx, x, y, w, h, 14, '#C8E6C9', '#4A4A5E', 1.5);
    this.roundRect(ctx, x + 4, y + 4, w - 8, h - 8, 10, '#A5D6A7');

    const flowerCoords = [
      { dx: 16, dy: 16 }, { dx: 45, dy: 18 }, { dx: 72, dy: 16 },
      { dx: 28, dy: 34 }, { dx: 60, dy: 34 }
    ];
    flowerCoords.forEach((pt, i) => {
      const color = colors[i % colors.length];
      const petalBob = Math.sin(timeTick * 0.05 + i) * 1;
      ctx.beginPath();
      ctx.arc(x + pt.dx, y + pt.dy + petalBob, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + pt.dx, y + pt.dy + petalBob, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF1B8';
      ctx.fill();
    });
  }

  private static drawCelebrationBunting(ctx: CanvasRenderingContext2D, w: number, timeTick: number) {
    const colors = ['#F8CFDA', '#BFDDF5', '#FFF1B8', '#BFE8D6', '#DCCFF0', '#FFD9C7'];
    ctx.save();
    ctx.strokeStyle = '#4A4A5E';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(100, 95);
    ctx.quadraticCurveTo(w / 2, 135, w - 100, 95);
    ctx.stroke();

    for (let x = 120; x < w - 120; x += 30) {
      const t = (x - 100) / (w - 200);
      const cy = (1 - t) * (1 - t) * 95 + 2 * (1 - t) * t * 135 + t * t * 95;
      const color = colors[Math.floor(x / 30) % colors.length];

      ctx.beginPath();
      ctx.moveTo(x - 9, cy);
      ctx.lineTo(x + 9, cy);
      ctx.lineTo(x, cy + 18);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(74,74,94,0.4)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Floating confetti particles
    for (let i = 0; i < 22; i++) {
      const px = (i * 51 + (timeTick * 0.5)) % (w - 120) + 60;
      const py = (i * 37 + Math.sin(timeTick * 0.05 + i) * 20) % 520 + 90;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(px, py, 5, 5);
    }
    ctx.restore();
  }

  private static drawAKLFloor(ctx: CanvasRenderingContext2D, w: number, h: number, timeTick: number) {
    ctx.fillStyle = '#FFF1B8';
    ctx.fillRect(40, 50, w - 80, h - 100);

    // Warm parquet tile grid
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 217, 199, 0.55)';
    ctx.lineWidth = 1.5;
    for (let x = 40; x < w - 40; x += 45) {
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, h - 50);
      ctx.stroke();
    }
    for (let y = 50; y < h - 50; y += 45) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 40, y);
      ctx.stroke();
    }

    // Bulletin board with financial chart on North wall
    this.roundRect(ctx, 400, 10, 100, 32, 4, '#D7CCC8', '#4A4A5E', 1);
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(415, 28, 10, 10);
    ctx.fillRect(435, 22, 10, 16);
    ctx.fillRect(455, 16, 10, 22);
    ctx.fillRect(475, 12, 10, 26);
    ctx.restore();
  }

  private static drawOtomotifFloor(ctx: CanvasRenderingContext2D, w: number, h: number, timeTick: number) {
    ctx.fillStyle = '#BFDDF5';
    ctx.fillRect(40, 50, w - 80, h - 100);

    // Workshop epoxy floor safety striping
    ctx.save();
    ctx.strokeStyle = '#FFF1B8';
    ctx.setLineDash([12, 10]);
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 130, 280, 170);
    ctx.strokeRect(460, 130, 220, 140);
    ctx.restore();

    // Oil spill / clean floor sheen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(140, 220, 60, 4);
    ctx.fillRect(500, 200, 45, 4);
  }

  private static drawTJKTFloor(ctx: CanvasRenderingContext2D, w: number, h: number, timeTick: number) {
    ctx.fillStyle = '#BFE8D6';
    ctx.fillRect(40, 50, w - 80, h - 100);

    // High-tech anti-static tile grid
    ctx.save();
    ctx.strokeStyle = '#F8CFDA';
    ctx.lineWidth = 1.5;
    for (let x = 60; x < w - 60; x += 55) {
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, h - 50);
      ctx.stroke();
    }
    for (let y = 70; y < h - 50; y += 55) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 40, y);
      ctx.stroke();
    }

    // Fiber optic pulse conduit
    const pulseOffset = (timeTick * 1.8) % 260;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(140 + pulseOffset, 120);
    ctx.lineTo(165 + pulseOffset, 120);
    ctx.stroke();
    ctx.restore();
  }

  private static drawWallsAndBoundaries(ctx: CanvasRenderingContext2D, zone: typeof MAP_ZONES['courtyard']) {
    ctx.save();

    // Top wall
    if (zone.id === 'courtyard') {
      // Split top wall for 3 doorway arches
      this.roundRect(ctx, 0, 0, 250, 50, 0, zone.wallColor);
      this.roundRect(ctx, 0, 46, 250, 4, 0, zone.accentColor);

      this.roundRect(ctx, 360, 0, 135, 50, 0, zone.wallColor);
      this.roundRect(ctx, 360, 46, 135, 4, 0, zone.accentColor);

      this.roundRect(ctx, 605, 0, 135, 50, 0, zone.wallColor);
      this.roundRect(ctx, 605, 46, 135, 4, 0, zone.accentColor);

      this.roundRect(ctx, 850, 0, zone.width - 850, 50, 0, zone.wallColor);
      this.roundRect(ctx, 850, 46, zone.width - 850, 4, 0, zone.accentColor);
    } else {
      this.roundRect(ctx, 0, 0, zone.width, 50, 0, zone.wallColor);
      this.roundRect(ctx, 0, 46, zone.width, 4, 0, zone.accentColor);
    }

    // Left wall
    this.roundRect(ctx, 0, 0, 40, zone.height, 0, zone.wallColor);
    this.roundRect(ctx, 36, 0, 4, zone.height, 0, zone.accentColor);

    // Right wall
    this.roundRect(ctx, zone.width - 40, 0, 40, zone.height, 0, zone.wallColor);
    this.roundRect(ctx, zone.width - 40, 0, 4, zone.height, 0, zone.accentColor);

    // Bottom wall
    if (zone.id !== 'courtyard') {
      // Open doorway between x: 380 and 520
      this.roundRect(ctx, 0, zone.height - 50, 380, 50, 0, zone.wallColor);
      this.roundRect(ctx, 0, zone.height - 50, 380, 4, 0, zone.accentColor);

      this.roundRect(ctx, 520, zone.height - 50, zone.width - 520, 50, 0, zone.wallColor);
      this.roundRect(ctx, 520, zone.height - 50, zone.width - 520, 4, 0, zone.accentColor);
    } else {
      this.roundRect(ctx, 0, zone.height - 50, zone.width, 50, 0, zone.wallColor);
      this.roundRect(ctx, 0, zone.height - 50, zone.width, 4, 0, zone.accentColor);
    }

    // Zone Title on top wall
    ctx.fillStyle = '#4A4A5E';
    ctx.font = 'bold 15px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(zone.name, zone.width / 2, 28);
    ctx.restore();
  }

  private static drawDoor(ctx: CanvasRenderingContext2D, door: typeof MAP_ZONES['courtyard']['doors'][0], timeTick: number) {
    const pulse = Math.sin(timeTick * 0.08) * 3;
    this.drawShadow(ctx, door.x + door.w / 2, door.y + door.h / 2, door.w / 2, 12);

    // Doorway floor mat
    this.roundRect(ctx, door.x, door.y, door.w, door.h, 8, '#FFFBF5', '#4A4A5E', 2);
    this.roundRect(ctx, door.x + 4, door.y + 4, door.w - 8, door.h - 8, 6, '#BFDDF5');

    // Direction arrow
    ctx.save();
    ctx.fillStyle = '#4A4A5E';
    ctx.beginPath();
    if (door.y < 100) {
      ctx.moveTo(door.x + door.w / 2, door.y + 12 - pulse);
      ctx.lineTo(door.x + door.w / 2 - 10, door.y + 26 - pulse);
      ctx.lineTo(door.x + door.w / 2 + 10, door.y + 26 - pulse);
    } else {
      ctx.moveTo(door.x + door.w / 2, door.y + 36 + pulse);
      ctx.lineTo(door.x + door.w / 2 - 10, door.y + 20 + pulse);
      ctx.lineTo(door.x + door.w / 2 + 10, door.y + 20 + pulse);
    }
    ctx.fill();

    // Prominent door sign
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#4A4A5E';
    const textY = door.y > 100 ? door.y - 10 : door.y + door.h + 16;
    ctx.fillText(door.name, door.x + door.w / 2, textY);
    ctx.restore();
  }

  private static drawMapObject(
    ctx: CanvasRenderingContext2D,
    obj: typeof MAP_ZONES['courtyard']['objects'][0],
    zoneId: ZoneId,
    chapter: number,
    timeTick: number
  ) {
    ctx.save();

    if (obj.type === 'pedestal') {
      // Center Trophy Pedestal with architectural detailing
      this.drawShadow(ctx, obj.x + obj.w / 2, obj.y + obj.h - 10, obj.w / 2 + 8, 18);

      // Base marble steps
      this.roundRect(ctx, obj.x - 12, obj.y + 35, obj.w + 24, 35, 8, '#DCCFF0', '#4A4A5E');
      this.roundRect(ctx, obj.x - 2, obj.y + 15, obj.w + 4, 35, 6, '#FFFBF5', '#4A4A5E');

      // Top glass display case
      this.roundRect(ctx, obj.x + 8, obj.y - 22, obj.w - 16, 48, 6, 'rgba(191, 221, 245, 0.45)', '#BFDDF5');

      if (chapter === 3) {
        // Chapter 3: THE GOLDEN TROPHY RESTORED & GLEAMING
        const bob = Math.sin(timeTick * 0.08) * 3;
        this.roundRect(ctx, obj.x + 28, obj.y + 2 + bob, 24, 10, 3, '#D4AC0D', '#9A7D0A');

        ctx.beginPath();
        ctx.arc(obj.x + 40, obj.y - 8 + bob, 16, 0, Math.PI);
        ctx.fillStyle = '#F4D03F';
        ctx.fill();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = '#B7950B';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(obj.x + 22, obj.y - 10 + bob, 8, 0, Math.PI * 2);
        ctx.arc(obj.x + 58, obj.y - 10 + bob, 8, 0, Math.PI * 2);
        ctx.strokeStyle = '#D4AC0D';
        ctx.lineWidth = 2.8;
        ctx.stroke();

        ctx.fillStyle = '#1E8449';
        ctx.font = 'bold 9px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('25th', obj.x + 40, obj.y - 6 + bob);

        // Gold sparkles
        const sX = obj.x + 40 + Math.sin(timeTick * 0.1) * 22;
        const sY = obj.y - 22 + Math.cos(timeTick * 0.1) * 12;
        ctx.fillStyle = '#FFF1B8';
        ctx.beginPath();
        ctx.arc(sX, sY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Chapter 1 & 2: Empty cushion with clue note
        this.roundRect(ctx, obj.x + 20, obj.y + 5, 40, 14, 4, '#F8CFDA');
        ctx.fillStyle = '#E74C3C';
        ctx.font = 'bold 12px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('?', obj.x + 40, obj.y + 16);

        const sAlpha = 0.5 + Math.sin(timeTick * 0.1) * 0.4;
        ctx.fillStyle = `rgba(245, 176, 65, ${sAlpha})`;
        ctx.beginPath();
        ctx.arc(obj.x + 30, obj.y + 10, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#4A4A5E';
      ctx.font = 'bold 10px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(chapter === 3 ? 'Muhiba Golden Trophy!' : 'Missing Trophy Pedestal', obj.x + 40, obj.y + 60);

    } else if (obj.type === 'musholla') {
      // Detailed Musholla Al-Ikhlas
      this.drawShadow(ctx, obj.x + obj.w / 2, obj.y + obj.h, obj.w / 2, 14);
      this.roundRect(ctx, obj.x, obj.y + 30, obj.w, obj.h - 30, 14, '#E8F8F5', '#4A4A5E');

      // Dome with shading & crescent finial
      ctx.beginPath();
      ctx.arc(obj.x + obj.w / 2, obj.y + 30, 38, Math.PI, 0);
      ctx.fillStyle = '#A3E4D7';
      ctx.fill();
      ctx.strokeStyle = '#4A4A5E';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Crescent moon
      ctx.beginPath();
      ctx.arc(obj.x + obj.w / 2, obj.y - 14, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#F9E79F';
      ctx.fill();

      // Prayer Arch Entrances
      this.roundRect(ctx, obj.x + 25, obj.y + 55, 36, 55, 12, '#D1F2EB');
      this.roundRect(ctx, obj.x + 98, obj.y + 55, 36, 55, 12, '#D1F2EB');

      // Green prayer carpets inside
      this.roundRect(ctx, obj.x + 30, obj.y + 90, 26, 15, 2, '#48C9B0');
      this.roundRect(ctx, obj.x + 103, obj.y + 90, 26, 15, 2, '#48C9B0');

      ctx.fillStyle = '#4A4A5E';
      ctx.font = 'bold 11px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Musholla Al-Ikhlas', obj.x + obj.w / 2, obj.y + obj.h + 14);

    } else if (obj.type === 'canteen_table') {
      // Canteen building with snack display & tea dispenser
      this.drawShadow(ctx, obj.x + obj.w / 2, obj.y + obj.h, obj.w / 2 + 10, 14);

      // Striped awning
      this.roundRect(ctx, obj.x - 20, obj.y - 20, obj.w + 40, 24, 6, '#FFD9C7', '#4A4A5E');
      for (let s = 0; s < 5; s++) {
        this.roundRect(ctx, obj.x - 16 + s * 30, obj.y - 20, 14, 24, 2, '#FFF1B8');
      }

      // Counter
      this.roundRect(ctx, obj.x - 10, obj.y + 4, obj.w + 20, obj.h + 10, 10, '#FFFBF5', '#4A4A5E');

      // Glass snack display cabinet
      this.roundRect(ctx, obj.x + 8, obj.y + 10, 48, 28, 4, 'rgba(191, 221, 245, 0.4)', '#BFDDF5');
      this.roundRect(ctx, obj.x + 14, obj.y + 16, 16, 10, 2, '#FAD7A0');
      this.roundRect(ctx, obj.x + 34, obj.y + 16, 16, 10, 2, '#EDBB99');

      // Tea urn dispenser
      this.roundRect(ctx, obj.x + 75, obj.y + 8, 22, 32, 4, '#BDC3C7', '#4A4A5E');
      ctx.fillStyle = '#E59866';
      ctx.beginPath();
      ctx.arc(obj.x + 108, obj.y + 22, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4A4A5E';
      ctx.font = 'bold 11px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Kantin Bu Siti', obj.x + obj.w / 2, obj.y + obj.h + 24);

    } else if (obj.type === 'gate_sign') {
      // Main Gate & Grand Sign
      this.roundRect(ctx, obj.x, obj.y, obj.w, obj.h, 8, '#FFFBF5', '#4A4A5E', 2);
      this.roundRect(ctx, obj.x + 6, obj.y + 4, obj.w - 12, obj.h - 8, 6, '#BFE8D6');

      ctx.fillStyle = '#4A4A5E';
      ctx.font = 'bold 11px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GERBANG UTAMA: SMK MUHAMMADIYAH BAWANG', obj.x + obj.w / 2, obj.y + 19);

    } else if (obj.type === 'minigame_station') {
      // Detailed Minigame Terminals
      this.drawShadow(ctx, obj.x + obj.w / 2, obj.y + obj.h, obj.w / 2, 12);

      let stationColor = '#FFF1B8';
      let screenColor = '#FFD9C7';
      let icon = '📊';

      if (zoneId === 'otomotif') {
        stationColor = '#BFDDF5';
        screenColor = '#DCCFF0';
        icon = '🔧';
      } else if (zoneId === 'tjkt') {
        stationColor = '#BFE8D6';
        screenColor = '#F8CFDA';
        icon = '🌐';
      }

      this.roundRect(ctx, obj.x, obj.y, obj.w, obj.h, 12, stationColor, '#4A4A5E');
      this.roundRect(ctx, obj.x + 10, obj.y + 8, obj.w - 20, obj.h - 30, 8, screenColor, '#4A4A5E');

      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(icon, obj.x + obj.w / 2, obj.y + 36);

      this.roundRect(ctx, obj.x + 6, obj.y + obj.h - 16, obj.w - 12, 18, 9, '#4A4A5E');
      ctx.fillStyle = '#FFFBF5';
      ctx.font = 'bold 9px Poppins, sans-serif';
      ctx.fillText('PRESS E / TAP', obj.x + obj.w / 2, obj.y + obj.h - 4);

    } else {
      // Detailed furniture / equipment
      this.drawShadow(ctx, obj.x + obj.w / 2, obj.y + obj.h, obj.w / 2, 10);
      this.roundRect(ctx, obj.x, obj.y, obj.w, obj.h, 8, '#FFFBF5', '#4A4A5E');

      if (obj.label) {
        ctx.fillStyle = '#4A4A5E';
        ctx.font = 'bold 10px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(obj.label, obj.x + obj.w / 2, obj.y + obj.h / 2 + 4);
      }
    }

    ctx.restore();
  }

  // Draw NPC with expressive avatar & uniform
  public static drawNPC(
    ctx: CanvasRenderingContext2D,
    npc: NPCData,
    playerX: number,
    playerY: number,
    timeTick: number
  ) {
    const dist = Math.hypot(npc.x - playerX, npc.y - playerY);
    const isNearby = dist < 75;
    const idleBob = Math.sin(timeTick * 0.06 + npc.x) * 2;

    ctx.save();
    this.drawShadow(ctx, npc.x, npc.y + 24, 15, 7);

    // Body / Outfit
    this.drawNPCOutfit(ctx, npc.avatarType, npc.x, npc.y + idleBob);

    // Head
    const headY = npc.y - 12 + idleBob;
    ctx.beginPath();
    ctx.arc(npc.x, headY, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#FDEBD0';
    ctx.fill();

    // Hair / Headgear
    this.drawNPCHeadgear(ctx, npc.avatarType, npc.x, headY);

    // Expressive dot eyes & blinking
    const isBlinking = timeTick % 120 > 115;
    ctx.fillStyle = '#4A4A5E';
    if (isBlinking) {
      ctx.fillRect(npc.x - 7, headY - 1, 4, 1.5);
      ctx.fillRect(npc.x + 3, headY - 1, 4, 1.5);
    } else {
      ctx.beginPath();
      ctx.arc(npc.x - 5, headY - 1, 2, 0, Math.PI * 2);
      ctx.arc(npc.x + 5, headY - 1, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Smile
    ctx.beginPath();
    ctx.arc(npc.x, headY + 3.5, 3.5, 0, Math.PI);
    ctx.strokeStyle = '#4A4A5E';
    ctx.lineWidth = 1.3;
    ctx.stroke();

    // Blush cheeks
    ctx.fillStyle = 'rgba(248, 207, 218, 0.7)';
    ctx.beginPath();
    ctx.arc(npc.x - 9, headY + 3, 3, 0, Math.PI * 2);
    ctx.arc(npc.x + 9, headY + 3, 3, 0, Math.PI * 2);
    ctx.fill();

    // Name badge tag
    this.roundRect(ctx, npc.x - 38, npc.y - 42 + idleBob, 76, 16, 8, '#FFFBF5', '#4A4A5E');
    ctx.fillStyle = '#4A4A5E';
    ctx.font = 'bold 9px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(npc.name, npc.x, npc.y - 31 + idleBob);

    // Nearby interaction prompt bubble
    if (isNearby) {
      const bubbleY = npc.y - 60 + idleBob + Math.sin(timeTick * 0.1) * 3;
      this.roundRect(ctx, npc.x - 28, bubbleY, 56, 18, 9, '#BFDDF5', '#4A4A5E');
      ctx.fillStyle = '#4A4A5E';
      ctx.font = 'bold 9px Poppins, sans-serif';
      ctx.fillText('💬 TALK', npc.x, bubbleY + 12);
    }

    ctx.restore();
  }

  private static drawNPCOutfit(ctx: CanvasRenderingContext2D, avatarType: string, x: number, y: number) {
    if (avatarType === 'principal') {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#34495E');
      this.roundRect(ctx, x - 3, y - 2, 6, 14, 2, '#F4D03F');
    } else if (avatarType === 'security') {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#EDBB99');
      this.roundRect(ctx, x + 3, y + 2, 5, 5, 2, '#F4D03F');
    } else if (avatarType === 'canteen') {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#F8CFDA');
      this.roundRect(ctx, x - 8, y + 2, 16, 20, 4, '#FFF1B8');
    } else if (avatarType === 'mechanic_joko' || avatarType === 'student_doni') {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#5DADE2');
      this.roundRect(ctx, x - 6, y + 4, 12, 8, 2, '#2E86C1');
    } else if (avatarType === 'teacher_rini' || avatarType === 'teacher_nina') {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#DCCFF0');
      this.roundRect(ctx, x - 4, y, 8, 22, 2, '#FFFBF5');
    } else if (avatarType === 'senior_rafi') {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#4A4A5E');
      ctx.strokeStyle = '#F4D03F';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 11, y);
      ctx.lineTo(x + 11, y + 20);
      ctx.stroke();
    } else {
      this.roundRect(ctx, x - 13, y - 2, 26, 24, 6, '#FFFBF5', '#BDC3C7');
      this.roundRect(ctx, x - 10, y + 2, 20, 20, 4, '#BFDDF5');
    }

    this.roundRect(ctx, x - 10, y + 20, 8, 8, 3, '#34495E');
    this.roundRect(ctx, x + 2, y + 20, 8, 8, 3, '#34495E');
  }

  private static drawNPCHeadgear(ctx: CanvasRenderingContext2D, avatarType: string, x: number, headY: number) {
    if (avatarType === 'security') {
      this.roundRect(ctx, x - 16, headY - 18, 32, 10, 4, '#34495E');
      this.roundRect(ctx, x - 20, headY - 10, 40, 5, 2, '#2C3E50');
    } else if (avatarType === 'canteen' || avatarType === 'teacher_rini' || avatarType === 'girl_student') {
      ctx.beginPath();
      ctx.arc(x, headY - 2, 18, 0, Math.PI * 2);
      ctx.fillStyle = avatarType === 'canteen' ? '#FFD9C7' : avatarType === 'teacher_rini' ? '#DCCFF0' : '#BFE8D6';
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(x, headY, 12, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDEBD0';
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(x, headY - 4, 16, Math.PI, 0);
      ctx.fillStyle = '#2C3E50';
      ctx.fill();
    }
  }

  // Draw Player Avatar
  public static drawPlayer(
    ctx: CanvasRenderingContext2D,
    player: PlayerState,
    timeTick: number
  ) {
    const isMoving = player.isMoving;
    const walkBob = isMoving ? Math.sin(timeTick * 0.2) * 3 : Math.sin(timeTick * 0.05) * 1;
    const legOffset = isMoving ? Math.sin(timeTick * 0.2) * 4 : 0;

    ctx.save();
    this.drawShadow(ctx, player.x, player.y + 24, 16, 8);

    // Legs / shoes
    this.roundRect(ctx, player.x - 10, player.y + 20 - legOffset, 8, 9, 3, '#34495E');
    this.roundRect(ctx, player.x + 2, player.y + 20 + legOffset, 8, 9, 3, '#34495E');

    // Body
    this.drawPlayerOutfit(ctx, player.major, player.x, player.y + walkBob);

    // Head
    const headY = player.y - 12 + walkBob;
    ctx.beginPath();
    ctx.arc(player.x, headY, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#FDEBD0';
    ctx.fill();

    // Hair / Hijab
    this.drawPlayerHairOrHijab(ctx, player.avatar, player.x, headY, player.direction);

    // Eyes & facial features
    if (player.direction !== 'up') {
      const eyeOffset = player.direction === 'left' ? -4 : player.direction === 'right' ? 4 : 0;
      const isBlinking = timeTick % 100 > 95;

      ctx.fillStyle = '#4A4A5E';
      if (isBlinking) {
        ctx.fillRect(player.x - 7 + eyeOffset, headY - 1, 4, 1.5);
        ctx.fillRect(player.x + 3 + eyeOffset, headY - 1, 4, 1.5);
      } else {
        ctx.beginPath();
        ctx.arc(player.x - 5 + eyeOffset, headY - 1, 2.2, 0, Math.PI * 2);
        ctx.arc(player.x + 5 + eyeOffset, headY - 1, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(player.x + eyeOffset, headY + 3.5, 3.5, 0, Math.PI);
      ctx.strokeStyle = '#4A4A5E';
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.fillStyle = 'rgba(248, 207, 218, 0.8)';
      ctx.beginPath();
      ctx.arc(player.x - 9 + eyeOffset, headY + 3, 3, 0, Math.PI * 2);
      ctx.arc(player.x + 9 + eyeOffset, headY + 3, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Player Name tag
    this.roundRect(ctx, player.x - 40, player.y - 44 + walkBob, 80, 17, 8, '#FFFBF5', '#4A4A5E');
    ctx.fillStyle = '#4A4A5E';
    ctx.font = 'bold 9px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${player.name} (${player.major})`, player.x, player.y - 32 + walkBob);

    ctx.restore();
  }

  private static drawPlayerOutfit(ctx: CanvasRenderingContext2D, major: string, x: number, y: number) {
    let vestColor = '#FFF1B8';
    if (major === 'Otomotif') vestColor = '#BFDDF5';
    else if (major === 'TJKT') vestColor = '#BFE8D6';

    this.roundRect(ctx, x - 14, y - 2, 28, 24, 7, '#FFFBF5', '#BDC3C7');
    this.roundRect(ctx, x - 10, y, 20, 22, 5, vestColor);
    this.roundRect(ctx, x - 8, y + 4, 6, 6, 2, '#4A4A5E');
  }

  private static drawPlayerHairOrHijab(
    ctx: CanvasRenderingContext2D,
    avatar: AvatarType,
    x: number,
    headY: number,
    direction: string
  ) {
    if (avatar === 'girl_hijab') {
      ctx.beginPath();
      ctx.arc(x, headY - 2, 19, 0, Math.PI * 2);
      ctx.fillStyle = '#DCCFF0';
      ctx.fill();

      if (direction !== 'up') {
        ctx.beginPath();
        ctx.ellipse(x, headY, 12, 13, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FDEBD0';
        ctx.fill();
      }
    } else if (avatar === 'girl_nohijab') {
      ctx.beginPath();
      ctx.arc(x, headY - 4, 18, Math.PI, 0);
      ctx.fillStyle = '#5D4037';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + 14, headY - 6, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#5D4037';
      ctx.fill();

      this.roundRect(ctx, x + 8, headY - 12, 7, 5, 2, '#F8CFDA');
    } else {
      ctx.beginPath();
      ctx.arc(x, headY - 4, 18, Math.PI, 0);
      ctx.fillStyle = '#2C3E50';
      ctx.fill();

      this.roundRect(ctx, x - 16, headY - 6, 4, 10, 2, '#2C3E50');
      this.roundRect(ctx, x + 12, headY - 6, 4, 10, 2, '#2C3E50');
    }
  }
}
