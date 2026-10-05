import { ZoneId } from '../types/game';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DoorTrigger {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  targetZone: ZoneId;
  targetX: number;
  targetY: number;
}

export interface MapObject {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  interactive?: boolean;
  inspectMessage?: string;
  unlockClueId?: string;
}

export interface ZoneMapData {
  id: ZoneId;
  name: string;
  subtitle: string;
  width: number;
  height: number;
  backgroundColor: string;
  floorColor: string;
  wallColor: string;
  accentColor: string;
  obstacles: Rect[];
  doors: DoorTrigger[];
  objects: MapObject[];
}

export const MAP_ZONES: Record<ZoneId, ZoneMapData> = {
  courtyard: {
    id: 'courtyard',
    name: 'Courtyard & Plaza',
    subtitle: 'SMK Muhammadiyah Bawang - Central Hub',
    width: 1100,
    height: 750,
    backgroundColor: '#E8F5E9',
    floorColor: '#FFFBF5',
    wallColor: '#C8E6C9',
    accentColor: '#81C784',
    obstacles: [
      // Top wall - grand solid facade
      { x: 0, y: 0, w: 1100, h: 50 },

      // Bottom wall
      { x: 0, y: 700, w: 1100, h: 50 },

      // Left perimeter wall - split for Bengkel Otomotif doorway at y: 280-385
      { x: 0, y: 0, w: 40, h: 280 },
      { x: 0, y: 385, w: 40, h: 365 },

      // Right perimeter wall - split for Lab AKL (y: 160-255) and Lab TJKT (y: 310-405)
      { x: 1060, y: 0, w: 40, h: 160 },
      { x: 1060, y: 255, w: 40, h: 55 },
      { x: 1060, y: 405, w: 40, h: 345 },

      // Buildings & furniture
      { x: 80, y: 480, w: 140, h: 120 }, // Security post
      { x: 780, y: 460, w: 240, h: 160 }, // Canteen
      { x: 80, y: 80, w: 180, h: 140 }, // Musholla
      { x: 500, y: 340, w: 100, h: 70 }, // Pedestal base

      // Flower beds / planters
      { x: 340, y: 180, w: 90, h: 60 },
      { x: 670, y: 180, w: 90, h: 60 },
      { x: 360, y: 520, w: 100, h: 50 },
    ],
    doors: [
      // Sebelah Kiri (Left side of game): Bengkel Otomotif
      {
        id: 'door_to_otomotif',
        name: 'Bengkel Otomotif',
        x: 10,
        y: 285,
        w: 75,
        h: 95,
        targetZone: 'otomotif',
        targetX: 740,
        targetY: 310
      },
      // Sebelah Kanan (Right side of game): Laboratorium AKL & Laboratorium TJKT
      {
        id: 'door_to_akl',
        name: 'Laboratorium AKL',
        x: 1015,
        y: 165,
        w: 75,
        h: 85,
        targetZone: 'akl',
        targetX: 130,
        targetY: 310
      },
      {
        id: 'door_to_tjkt',
        name: 'Laboratorium TJKT',
        x: 1015,
        y: 315,
        w: 75,
        h: 85,
        targetZone: 'tjkt',
        targetX: 130,
        targetY: 310
      }
    ],
    objects: [
      {
        id: 'trophy_pedestal',
        type: 'pedestal',
        x: 510,
        y: 330,
        w: 80,
        h: 80,
        label: 'Trophy Pedestal',
        interactive: true,
        inspectMessage: 'The glass case is lifted! Soft velvet polishing fibers are caught on the golden corner.',
        unlockClueId: 'clue_pedestal'
      },
      {
        id: 'school_gate_sign',
        type: 'gate_sign',
        x: 360,
        y: 686,
        w: 380,
        h: 46,
        label: 'Main Gate: SMK Muhammadiyah Bawang',
        interactive: true,
        inspectMessage: 'A grand celebratory banner hangs above: "25th Silver Jubilee Anniversary - Islamic Vocational Excellence".'
      },
      {
        id: 'musholla_corner',
        type: 'musholla',
        x: 90,
        y: 70,
        w: 160,
        h: 120,
        label: 'Musholla Al-Ikhlas',
        interactive: true,
        inspectMessage: 'The school prayer room is serene, clean, and neatly arranged with soft green carpets.'
      },
      {
        id: 'canteen_table',
        type: 'canteen_table',
        x: 820,
        y: 480,
        w: 120,
        h: 60,
        label: 'Canteen Counter',
        interactive: true,
        inspectMessage: 'Ibu Siti has fresh snacks and hot sweet tea ready for students and teachers.'
      }
    ]
  },

  akl: {
    id: 'akl',
    name: 'AKL Accounting Lab',
    subtitle: 'Accounting & Institutional Finance',
    width: 900,
    height: 650,
    backgroundColor: '#FFF9E6',
    floorColor: '#FFF1B8',
    wallColor: '#FFD9C7',
    accentColor: '#F5B041',
    obstacles: [
      { x: 0, y: 0, w: 900, h: 50 },
      // Bottom wall split with wide opening between x: 320 and 580 for effortless doorway exit
      { x: 0, y: 600, w: 320, h: 50 },
      { x: 580, y: 600, w: 320, h: 50 },

      // Left wall split with doorway for side exit back to Courtyard
      { x: 0, y: 0, w: 40, h: 250 },
      { x: 0, y: 370, w: 40, h: 280 },
      { x: 860, y: 0, w: 40, h: 650 },
      { x: 120, y: 160, w: 260, h: 70 },
      { x: 500, y: 160, w: 260, h: 70 },
      { x: 80, y: 390, w: 100, h: 140 },
      { x: 300, y: 220, w: 120, h: 60 }
    ],
    doors: [
      {
        id: 'door_akl_to_courtyard_left',
        name: 'Exit to Courtyard',
        x: 10,
        y: 260,
        w: 75,
        h: 95,
        targetZone: 'courtyard',
        targetX: 960,
        targetY: 205
      },
      {
        id: 'door_akl_to_courtyard_bottom',
        name: 'Exit to Courtyard',
        x: 330,
        y: 520,
        w: 240,
        h: 90,
        targetZone: 'courtyard',
        targetX: 960,
        targetY: 205
      }
    ],
    objects: [
      {
        id: 'debate_ledger_terminal',
        type: 'minigame_station',
        x: 600,
        y: 340,
        w: 100,
        h: 80,
        label: 'Debate Ledger Station',
        interactive: true,
        inspectMessage: 'Interactive financial ledger terminal: balance opinion statements with appropriate responses!'
      },
      {
        id: 'asset_cabinet',
        type: 'archive_shelf',
        x: 90,
        y: 400,
        w: 80,
        h: 120,
        label: 'Asset Archive Shelves',
        interactive: true,
        inspectMessage: 'Ledger folder 1999-2024: "Golden Jubilee Trophy: Insured and registered under school heritage assets."'
      }
    ]
  },

  otomotif: {
    id: 'otomotif',
    name: 'Otomotif Workshop',
    subtitle: 'Automotive Engineering & Motorcycle Repair',
    width: 900,
    height: 650,
    backgroundColor: '#EDF5FC',
    floorColor: '#BFDDF5',
    wallColor: '#DCCFF0',
    accentColor: '#5DADE2',
    obstacles: [
      { x: 0, y: 0, w: 900, h: 50 },
      // Bottom wall split with wide opening between x: 320 and 580 for effortless doorway exit
      { x: 0, y: 600, w: 320, h: 50 },
      { x: 580, y: 600, w: 320, h: 50 },

      { x: 0, y: 0, w: 40, h: 650 },
      // Right wall split with doorway for side exit back to Courtyard
      { x: 860, y: 0, w: 40, h: 250 },
      { x: 860, y: 370, w: 40, h: 280 },
      { x: 120, y: 150, w: 240, h: 130 },
      { x: 480, y: 150, w: 180, h: 100 },
      { x: 740, y: 100, w: 100, h: 140 },
      { x: 80, y: 380, w: 120, h: 160 }
    ],
    doors: [
      {
        id: 'door_otomotif_to_courtyard_right',
        name: 'Exit to Courtyard',
        x: 815,
        y: 260,
        w: 75,
        h: 95,
        targetZone: 'courtyard',
        targetX: 130,
        targetY: 330
      },
      {
        id: 'door_otomotif_to_courtyard_bottom',
        name: 'Exit to Courtyard',
        x: 330,
        y: 520,
        w: 240,
        h: 90,
        targetZone: 'courtyard',
        targetX: 130,
        targetY: 330
      }
    ],
    objects: [
      {
        id: 'engine_talk_station',
        type: 'minigame_station',
        x: 620,
        y: 350,
        w: 110,
        h: 80,
        label: 'Engine Talk Tuning Bench',
        interactive: true,
        inspectMessage: 'Electronic dyno-tester: arrange English opinion sentence blocks to calibrate the motorcycle engine!'
      },
      {
        id: 'tool_bench',
        type: 'workbench',
        x: 750,
        y: 110,
        w: 80,
        h: 120,
        label: 'Master Tool Bench',
        interactive: true,
        inspectMessage: 'Polishing cloths, brass buffing compound, and engraving chisels are neatly lined up.'
      }
    ]
  },

  tjkt: {
    id: 'tjkt',
    name: 'TJKT Network Lab',
    subtitle: 'Computer Network & Telecommunication',
    width: 900,
    height: 650,
    backgroundColor: '#EDFAF5',
    floorColor: '#BFE8D6',
    wallColor: '#F8CFDA',
    accentColor: '#48C9B0',
    obstacles: [
      { x: 0, y: 0, w: 900, h: 50 },
      // Bottom wall split with wide opening between x: 320 and 580 for effortless doorway exit
      { x: 0, y: 600, w: 320, h: 50 },
      { x: 580, y: 600, w: 320, h: 50 },

      // Left wall split with doorway for side exit back to Courtyard
      { x: 0, y: 0, w: 40, h: 250 },
      { x: 0, y: 370, w: 40, h: 280 },
      { x: 860, y: 0, w: 40, h: 650 },
      { x: 140, y: 140, w: 220, h: 110 },
      { x: 480, y: 140, w: 280, h: 100 },
      { x: 80, y: 380, w: 130, h: 160 }
    ],
    doors: [
      {
        id: 'door_tjkt_to_courtyard_left',
        name: 'Exit to Courtyard',
        x: 10,
        y: 260,
        w: 75,
        h: 95,
        targetZone: 'courtyard',
        targetX: 960,
        targetY: 355
      },
      {
        id: 'door_tjkt_to_courtyard_bottom',
        name: 'Exit to Courtyard',
        x: 330,
        y: 520,
        w: 240,
        h: 90,
        targetZone: 'courtyard',
        targetX: 960,
        targetY: 355
      }
    ],
    objects: [
      {
        id: 'network_connect_station',
        type: 'minigame_station',
        x: 600,
        y: 330,
        w: 110,
        h: 80,
        label: 'Network Patch Panel Station',
        interactive: true,
        inspectMessage: 'Patch panel terminal: link conversational opinion statements to polite reactions!'
      },
      {
        id: 'server_monitors',
        type: 'server_terminal',
        x: 170,
        y: 150,
        w: 120,
        h: 80,
        label: 'CCTV Security Server',
        interactive: true,
        inspectMessage: 'All camera nodes are online. The 5:00 PM record shows routine scheduled maintenance.'
      }
    ]
  }
};
