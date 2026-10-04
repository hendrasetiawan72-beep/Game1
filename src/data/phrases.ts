import { PhraseItem } from '../types/game';

export const PHRASE_BANK: PhraseItem[] = [
  // OPINION
  {
    id: 'op_1',
    phrase: 'In my opinion...',
    category: 'opinion',
    example: 'In my opinion, the school courtyard is the best place to begin searching.',
    notes: 'A standard, respectful way to introduce your personal perspective in formal or informal discussions.'
  },
  {
    id: 'op_2',
    phrase: 'I think...',
    category: 'opinion',
    example: 'I think we need to examine the trophy cabinet before jumping to conclusions.',
    notes: 'Natural and common in everyday conversations to share an initial constructive thought.'
  },
  {
    id: 'op_3',
    phrase: 'I believe...',
    category: 'opinion',
    example: 'I believe there is a misunderstanding between the students.',
    notes: 'Demonstrates conviction, ethical principle, or thoughtful confidence in a statement.'
  },
  {
    id: 'op_4',
    phrase: 'From my point of view...',
    category: 'opinion',
    example: 'From my point of view, safety in the workshop comes first.',
    notes: 'Professional and analytical, ideal for classroom presentations and technical vocational debates.'
  },
  {
    id: 'op_5',
    phrase: 'As far as I am concerned...',
    category: 'opinion',
    example: 'As far as I am concerned, teamwork makes the 25th anniversary a success.',
    notes: 'Emphasizes that this reflects your individual perspective or specific area of responsibility.'
  },

  // AGREE
  {
    id: 'ag_1',
    phrase: 'I agree with you.',
    category: 'agree',
    example: 'I agree with you, Pak Slamet was at his post during the morning shift.',
    notes: 'Direct, clear, and universally polite.'
  },
  {
    id: 'ag_2',
    phrase: 'Exactly!',
    category: 'agree',
    example: 'Exactly! The ledger numbers must balance with the physical inventory.',
    notes: 'Enthusiastic agreement when someone states a precise and verifiable truth.'
  },
  {
    id: 'ag_3',
    phrase: "That's true.",
    category: 'agree',
    example: "That's true, the Golden Trophy was cleaned just last week.",
    notes: 'Affirms that the other speaker’s fact or deduction is accurate.'
  },
  {
    id: 'ag_4',
    phrase: "I couldn't agree more.",
    category: 'agree',
    example: "I couldn't agree more, we should celebrate our school with mutual respect.",
    notes: 'Strong agreement indicating complete alignment with the speaker.'
  },
  {
    id: 'ag_5',
    phrase: "You're absolutely right.",
    category: 'agree',
    example: "You're absolutely right, jumping to accusations damages friendship.",
    notes: 'Warm, positive reinforcement of a peer or mentor’s viewpoint.'
  },

  // DISAGREE POLITELY
  {
    id: 'da_1',
    phrase: 'I see your point, but...',
    category: 'disagree_polite',
    example: 'I see your point, but we have no video evidence showing Rafi took the trophy.',
    notes: 'Acknowledges the speaker’s logic before introducing a counter-argument. Extremely polite.'
  },
  {
    id: 'da_2',
    phrase: "I'm afraid I disagree.",
    category: 'disagree_polite',
    example: "I'm afraid I disagree. Locking all labs will slow down preparation.",
    notes: 'The phrase "I\'m afraid" softens the disagreement to maintain professional harmony.'
  },
  {
    id: 'da_3',
    phrase: "I don't think so.",
    category: 'disagree_polite',
    example: "I don't think so, because the security log shows someone else entered at 5 PM.",
    notes: 'Gentle disagreement, much kinder than saying "You are wrong".'
  },
  {
    id: 'da_4',
    phrase: "I'm not so sure about that.",
    category: 'disagree_polite',
    example: "I'm not so sure about that. The wires might be disconnected, not damaged.",
    notes: 'Expresses constructive skepticism without attacking the person.'
  },

  // PARTIAL AGREEMENT
  {
    id: 'pa_1',
    phrase: "You're partly right, but...",
    category: 'partial_agree',
    example: "You're partly right, but that only explains why the box was open, not where it is.",
    notes: 'Validates partial truth while steering towards the complete truth.'
  },
  {
    id: 'pa_2',
    phrase: 'That might be true, however...',
    category: 'partial_agree',
    example: 'That might be true, however we still need to verify with Bu Nina first.',
    notes: 'High CEFR B1 connector that smoothly balances two differing perspectives.'
  }
];
