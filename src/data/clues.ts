import { ClueCard } from '../types/game';

export const CLUE_CARDS: ClueCard[] = [
  {
    id: 'clue_pedestal',
    title: 'Polished Velvet Fiber',
    phrase: 'In my opinion...',
    chapter: 1,
    foundAt: 'Trophy Pedestal in Courtyard',
    description: 'Found near the empty trophy display: soft blue microfiber cloth strands used specifically for fine metal polishing.',
    iconType: 'trophy'
  },
  {
    id: 'clue_security_log',
    title: 'Security Gate Ledger',
    phrase: 'I agree with you.',
    chapter: 1,
    foundAt: 'Security Guard Post',
    description: 'Pak Slamet confirmed someone signed out a heavy cardboard case labeled "Equipment Care" yesterday at 5:30 PM.',
    iconType: 'shield'
  },
  {
    id: 'clue_canteen_receipt',
    title: 'Canteen Snack Receipt',
    phrase: 'That is true.',
    chapter: 1,
    foundAt: 'Ibu Siti Canteen',
    description: 'Rafi purchased 3 cups of hot sweet tea and fried snacks to share with workshop companions late yesterday afternoon.',
    iconType: 'cup'
  },
  {
    id: 'clue_workshop_polish',
    title: 'Brass & Chrome Shiner',
    phrase: 'I see your point, but...',
    chapter: 2,
    foundAt: 'Otomotif Workshop Bench',
    description: 'An opened bottle of premium metallic gold luster polish sits next to an engraving chisel in the workshop.',
    iconType: 'wrench'
  },
  {
    id: 'clue_server_backup',
    title: 'CCTV Network Ping Log',
    phrase: 'From my point of view...',
    chapter: 2,
    foundAt: 'TJKT Server Rack',
    description: 'The camera outside the trophy cabinet was not disabled by malicious tampering; it was undergoing scheduled firmware maintenance.',
    iconType: 'cable'
  },
  {
    id: 'clue_anniversary_draft',
    title: 'Surprise Engraving Sketch',
    phrase: "You're partly right, but...",
    chapter: 2,
    foundAt: 'AKL Debate Terminal',
    description: 'A pencil sketch reading: "Happy 25th Anniversary Muhiba - Dedicated to Teachers & Students" with precise trophy dimensions.',
    iconType: 'book'
  },
  {
    id: 'clue_principal_note',
    title: "Principal's Secret Seal",
    phrase: "I couldn't agree more.",
    chapter: 3,
    foundAt: 'Honor Stage Podium',
    description: 'A signed approval letter from Principal Pak Haryono authorizing Senior Rafi to restore the tarnished 1999 trophy.',
    iconType: 'trophy'
  }
];
