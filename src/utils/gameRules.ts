import { GameState, MajorType, ZoneId } from '../types/game';

// Day 1: 2 clues required to unlock Quiz
// Day 2: 4 clues total (2 from Day 1 + 2 from Day 2)
// Day 3: 7 clues total (3 new clues in Day 3 = all 7 clues)
export function getRequiredCluesForDay(day: 1 | 2 | 3): number {
  if (day === 1) return 2;
  if (day === 2) return 4;
  return 7;
}

export function getMajorRoom(major: MajorType): { zoneId: ZoneId; name: string } {
  switch (major) {
    case 'AKL':
      return { zoneId: 'akl', name: 'AKL Accounting Lab' };
    case 'Otomotif':
      return { zoneId: 'otomotif', name: 'Otomotif Workshop' };
    case 'TJKT':
      return { zoneId: 'tjkt', name: 'TJKT Network Lab' };
  }
}

export function isRoomAllowedForMajor(targetZone: ZoneId, major: MajorType): boolean {
  if (targetZone === 'courtyard') return true; // Courtyard is open to all
  const assigned = getMajorRoom(major);
  return targetZone === assigned.zoneId;
}

export interface AccessibleWitness {
  id: string;
  name: string;
  role: string;
  zone: ZoneId;
  locationName: string;
}

export function getAccessibleWitnesses(major: MajorType): AccessibleWitness[] {
  const courtyardWitnesses: AccessibleWitness[] = [
    { id: 'principal', name: 'Pak Haryono', role: 'School Principal', zone: 'courtyard', locationName: 'Courtyard (North)' },
    { id: 'security', name: 'Pak Slamet', role: 'Head Security Guard', zone: 'courtyard', locationName: 'Courtyard (Security Post)' },
    { id: 'canteen', name: 'Ibu Siti', role: 'Canteen Owner', zone: 'courtyard', locationName: 'Courtyard (Canteen Area)' },
    { id: 'fajar', name: 'Fajar', role: 'Student Council President', zone: 'courtyard', locationName: 'Courtyard (Stage)' },
    { id: 'senior_rafi', name: 'Senior Rafi', role: 'Senior Class President', zone: 'courtyard', locationName: 'Courtyard (Center Plaza)' },
    { id: 'syamsul', name: 'Pak Syamsul', role: 'Musholla Caretaker', zone: 'courtyard', locationName: 'Courtyard (Musholla)' }
  ];

  let roomWitnesses: AccessibleWitness[] = [];
  if (major === 'AKL') {
    roomWitnesses = [
      { id: 'tari', name: 'Tari', role: 'Student Treasurer', zone: 'akl', locationName: 'AKL Accounting Lab' },
      { id: 'bu_rini', name: 'Bu Rini', role: 'Accounting Teacher', zone: 'akl', locationName: 'AKL Accounting Lab' },
      { id: 'budi', name: 'Budi', role: 'AKL Student', zone: 'akl', locationName: 'AKL Accounting Lab' }
    ];
  } else if (major === 'Otomotif') {
    roomWitnesses = [
      { id: 'hendra', name: 'Hendra', role: 'Mechanic Student', zone: 'otomotif', locationName: 'Otomotif Workshop' },
      { id: 'pak_joko', name: 'Pak Joko', role: 'Vocational Head', zone: 'otomotif', locationName: 'Otomotif Workshop' },
      { id: 'doni', name: 'Doni', role: 'Apprentice Student', zone: 'otomotif', locationName: 'Otomotif Workshop' }
    ];
  } else {
    roomWitnesses = [
      { id: 'rio', name: 'Rio', role: 'Network Student', zone: 'tjkt', locationName: 'TJKT Network Lab' },
      { id: 'bu_nina', name: 'Bu Nina', role: 'Network Teacher', zone: 'tjkt', locationName: 'TJKT Network Lab' },
      { id: 'maya', name: 'Maya', role: 'Server Administrator', zone: 'tjkt', locationName: 'TJKT Network Lab' }
    ];
  }

  return [...courtyardWitnesses, ...roomWitnesses];
}

export interface DayCompletionStatus {
  isComplete: boolean;
  requiredClues: number;
  currentClues: number;
  hasEnoughClues: boolean;
  answeredCount: number;
  totalConversations: number;
  hasCompletedAllConversations: boolean;
  remainingWitnesses: AccessibleWitness[];
}

export function checkDayCompletion(gameState: GameState, major: MajorType): DayCompletionStatus {
  const ch = gameState.currentChapter;
  const requiredClues = getRequiredCluesForDay(ch);
  const currentClues = gameState.collectedClues.length;
  const hasEnoughClues = currentClues >= requiredClues;

  const accessible = getAccessibleWitnesses(major);
  const remainingWitnesses = accessible.filter(
    w => !gameState.answeredNpcs?.[`${w.id}_ch${ch}`]
  );
  const answeredCount = accessible.length - remainingWitnesses.length;
  const hasCompletedAllConversations = remainingWitnesses.length === 0;

  return {
    isComplete: hasEnoughClues && hasCompletedAllConversations,
    requiredClues,
    currentClues,
    hasEnoughClues,
    answeredCount,
    totalConversations: accessible.length,
    hasCompletedAllConversations,
    remainingWitnesses
  };
}
