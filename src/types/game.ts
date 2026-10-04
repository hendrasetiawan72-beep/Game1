export type AvatarType = 'boy' | 'girl_hijab' | 'girl_nohijab';

export type MajorType = 'AKL' | 'Otomotif' | 'TJKT';

export type ZoneId = 'courtyard' | 'akl' | 'otomotif' | 'tjkt';

export type PhraseCategory = 
  | 'opinion'           // Expressing Opinion
  | 'agree'             // Agreeing
  | 'disagree_polite'   // Disagreeing Politely
  | 'partial_agree';    // Partial Agreement

export interface PhraseItem {
  id: string;
  phrase: string;
  category: PhraseCategory;
  example: string;
  notes: string;
}

export interface ClueCard {
  id: string;
  title: string;
  phrase: string;
  chapter: 1 | 2 | 3;
  foundAt: string;
  description: string;
  iconType: 'book' | 'wrench' | 'cable' | 'trophy' | 'cup' | 'shield';
}

export interface DialogueChoice {
  text: string;
  isCorrect: boolean;
  trustChange: number;
  feedback: string;
  unlockClueId?: string;
  nextNodeId?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerRole: string;
  avatarType: string;
  text: string;
  choices: DialogueChoice[];
}

export interface NPCData {
  id: string;
  name: string;
  role: string;
  avatarType: string;
  zone: ZoneId;
  x: number;
  y: number;
  initialDialogueNodeId: string;
  chapterDialogueNodes?: Record<number, string>;
  minigameTrigger?: 'akl' | 'otomotif' | 'tjkt';
  requiredChapter?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  isMCMA?: boolean; // Multiple Choice Multiple Answer
  options: string[];
  correctIndices: number[]; // Array of correct index numbers (supports both single & multi-answer)
  explanation: string;
  category: PhraseCategory;
}

export interface PlayerState {
  name: string;
  studentClass: string;
  avatar: AvatarType;
  major: MajorType;
  x: number;
  y: number;
  zone: ZoneId;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
}

export interface GameState {
  currentChapter: 1 | 2 | 3;
  trustMeter: number;
  score: number;
  collectedClues: string[];
  elapsedSeconds: number;
  completedMinigames: {
    akl: boolean;
    otomotif: boolean;
    tjkt: boolean;
  };
  completedQuizzes: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  chapterStars: {
    1: number;
    2: number;
    3: number;
  };
  talkedNpcs: string[];
  answeredNpcs?: Record<string, AnsweredNPCRecord>;
  gameCompleted: boolean;
}

export interface AnsweredNPCRecord {
  npcId: string;
  speaker: string;
  speakerRole: string;
  avatarType: string;
  questionText: string;
  chosenAnswer: string;
  feedback: string;
  isCorrect: boolean;
  trustChange: number;
  chapter: number;
}

export interface InspectData {
  title?: string;
  message: string;
  clueUnlocked?: boolean;
  choices?: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    trustChange?: number;
  }[];
}
