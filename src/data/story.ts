import { DialogueNode, NPCData } from '../types/game';

export const NPCS: NPCData[] = [
  // Courtyard NPCs
  {
    id: 'principal',
    name: 'Pak Haryono',
    role: 'School Principal',
    avatarType: 'principal',
    zone: 'courtyard',
    x: 520,
    y: 280,
    initialDialogueNodeId: 'principal_ch1_start',
    chapterDialogueNodes: {
      1: 'principal_ch1_start',
      2: 'principal_ch2_start',
      3: 'principal_ch3_debate'
    }
  },
  {
    id: 'security',
    name: 'Pak Slamet',
    role: 'Head Security Guard',
    avatarType: 'security',
    zone: 'courtyard',
    x: 200,
    y: 540,
    initialDialogueNodeId: 'security_ch1_start',
    chapterDialogueNodes: {
      1: 'security_ch1_start',
      2: 'security_ch2_start',
      3: 'security_ch3_start'
    }
  },
  {
    id: 'canteen',
    name: 'Ibu Siti',
    role: 'Canteen Owner',
    avatarType: 'canteen',
    zone: 'courtyard',
    x: 820,
    y: 530,
    initialDialogueNodeId: 'canteen_ch1_start',
    chapterDialogueNodes: {
      1: 'canteen_ch1_start',
      2: 'canteen_ch2_start',
      3: 'canteen_ch3_start'
    }
  },
  {
    id: 'fajar',
    name: 'Fajar',
    role: 'Student Council President',
    avatarType: 'boy_student',
    zone: 'courtyard',
    x: 420,
    y: 440,
    initialDialogueNodeId: 'fajar_ch1_start',
    chapterDialogueNodes: {
      1: 'fajar_ch1_start',
      2: 'fajar_ch2_start',
      3: 'fajar_ch3_start'
    }
  },
  {
    id: 'senior_rafi',
    name: 'Senior Rafi',
    role: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    zone: 'courtyard',
    x: 620,
    y: 440,
    initialDialogueNodeId: 'rafi_ch1_preview',
    chapterDialogueNodes: {
      1: 'rafi_ch1_preview',
      2: 'rafi_ch2_secret',
      3: 'rafi_ch3_climax'
    }
  },

  // AKL Lab NPCs
  {
    id: 'bu_rini',
    name: 'Bu Rini',
    role: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    zone: 'akl',
    x: 320,
    y: 240,
    initialDialogueNodeId: 'bu_rini_start',
    chapterDialogueNodes: {
      1: 'bu_rini_start',
      2: 'bu_rini_ch2',
      3: 'bu_rini_ch3'
    }
  },
  {
    id: 'budi',
    name: 'Budi',
    role: 'AKL Student Classmate',
    avatarType: 'boy_student',
    zone: 'akl',
    x: 580,
    y: 360,
    initialDialogueNodeId: 'budi_start',
    chapterDialogueNodes: {
      1: 'budi_start',
      2: 'budi_ch2',
      3: 'budi_ch3'
    },
    minigameTrigger: 'akl'
  },

  // Otomotif Workshop NPCs
  {
    id: 'pak_joko',
    name: 'Pak Joko',
    role: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    zone: 'otomotif',
    x: 300,
    y: 260,
    initialDialogueNodeId: 'pak_joko_start',
    chapterDialogueNodes: {
      1: 'pak_joko_start',
      2: 'pak_joko_ch2',
      3: 'pak_joko_ch3'
    }
  },
  {
    id: 'doni',
    name: 'Doni',
    role: 'Otomotif Student',
    avatarType: 'student_doni',
    zone: 'otomotif',
    x: 620,
    y: 380,
    initialDialogueNodeId: 'doni_ch1',
    chapterDialogueNodes: {
      1: 'doni_ch1',
      2: 'doni_start',
      3: 'doni_ch3'
    },
    minigameTrigger: 'otomotif'
  },

  // TJKT Lab NPCs
  {
    id: 'bu_nina',
    name: 'Bu Nina',
    role: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    zone: 'tjkt',
    x: 340,
    y: 250,
    initialDialogueNodeId: 'bu_nina_start',
    chapterDialogueNodes: {
      1: 'bu_nina_start',
      2: 'bu_nina_ch2',
      3: 'bu_nina_ch3'
    }
  },
  {
    id: 'maya',
    name: 'Maya',
    role: 'TJKT Systems Student',
    avatarType: 'girl_student',
    zone: 'tjkt',
    x: 600,
    y: 360,
    initialDialogueNodeId: 'maya_ch1',
    chapterDialogueNodes: {
      1: 'maya_ch1',
      2: 'maya_start',
      3: 'maya_ch3'
    },
    minigameTrigger: 'tjkt'
  }
];

export const DIALOGUE_NODES: Record<string, DialogueNode> = {
  // PRINCIPAL
  principal_ch1_start: {
    id: 'principal_ch1_start',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Welcome to SMK Muhammadiyah Bawang! Tomorrow marks our school's 25th Silver Jubilee anniversary. But our beloved Golden Trophy has disappeared from its pedestal! As our newest student investigator, will you help examine the clues respectfully?",
    choices: [
      {
        text: "I don't care about an old trophy. Why don't you buy a plastic cup instead?",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disrespectful! That severely damages the principal's trust.",
        nextNodeId: 'principal_ch1_advice'
      },
      {
        text: "I think we can solve this mystery together, Pak Haryono. Where should I begin?",
        isCorrect: true,
        trustChange: 15,
        feedback: "Wonderful! Stating your optimistic opinion with 'I think' builds confidence!",
        unlockClueId: 'clue_pedestal',
        nextNodeId: 'principal_ch1_advice'
      },
      {
        text: "I couldn't agree more. Someone clearly stole it and must be punished immediately!",
        isCorrect: false,
        trustChange: -5,
        feedback: "Too hasty! 'I couldn't agree more' shows agreement, but jumping to accusations without evidence isn't wise.",
        nextNodeId: 'principal_ch1_advice'
      }
    ]
  },
  principal_ch1_advice: {
    id: 'principal_ch1_advice',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Examine the empty pedestal, speak with Pak Slamet at the gate and Ibu Siti at the canteen, then visit the AKL Accounting Lab to inspect the asset records. Remember: communicate with polite language!",
    choices: [
      {
        text: "Whatever, I will just wander around without any plan.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Too casual for addressing a school principal!"
      },
      {
        text: "In my opinion, listening to all staff members will reveal the full story.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Excellent! 'In my opinion' shows maturity and analytical perspective."
      },
      {
        text: "I agree with you, sir. I will proceed with great care.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Polite and affirmative! 'I agree with you' shows teamwork and respect."
      }
    ]
  },

  // SECURITY GUARD PAK SLAMET
  security_ch1_start: {
    id: 'security_ch1_start',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Peace be with you! I have guarded SMK Muhiba for 15 years. Yesterday at dusk around 5:30 PM, I saw someone carrying a heavy wrapped container towards the workshops. Some say it looked suspicious.",
    choices: [
      {
        text: "You fell asleep on duty, didn't you?",
        isCorrect: false,
        trustChange: -15,
        feedback: "Rude accusation! That lowers the security officer's trust."
      },
      {
        text: "I agree with you! It must be the thief caught in the act!",
        isCorrect: false,
        trustChange: -5,
        feedback: "Pak Slamet did not say it was a thief. Avoid overgeneralizing without facts.",
        nextNodeId: 'security_ch1_detail'
      },
      {
        text: "That's true, but from my point of view, carrying equipment is normal for vocational students.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Brilliant! You acknowledged truth ('That's true') and provided a balanced perspective ('from my point of view').",
        unlockClueId: 'clue_security_log',
        nextNodeId: 'security_ch1_detail'
      }
    ]
  },
  security_ch1_detail: {
    id: 'security_ch1_detail',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Here is the sign-out ledger. The student signed with initials 'R' and listed 'Equipment Maintenance'. No school property left through the gate.",
    choices: [
      {
        text: "This notebook looks fake and untrustworthy.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Insulting! Express doubts constructively instead."
      },
      {
        text: "Exactly! That proves the trophy is still somewhere inside our school grounds.",
        isCorrect: true,
        trustChange: 15,
        feedback: "'Exactly!' expresses precise agreement grounded in verified evidence."
      },
      {
        text: "I'm afraid I disagree. Maybe someone threw it over the perimeter fence.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Good polite disagreement ('I'm afraid I disagree') with a reasonable hypothesis!"
      }
    ]
  },

  // CANTEEN IBU SITI
  canteen_ch1_start: {
    id: 'canteen_ch1_start',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "Hello dear! Everybody in the canteen is buzzing about the trophy. Some 10th graders claim senior Rafi stole it because he was angry about the exam schedule. Do you believe that gossip?",
    choices: [
      {
        text: "Yes, Rafi is guilty! Everyone knows it!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Gossip and slander harm the school atmosphere."
      },
      {
        text: "You're partly right, but maybe Rafi is just misunderstood.",
        isCorrect: true,
        trustChange: 12,
        feedback: "Great use of partial agreement ('You're partly right, but...')!",
        unlockClueId: 'clue_canteen_receipt',
        nextNodeId: 'canteen_ch1_receipt'
      },
      {
        text: "I see your point, but in my opinion, we should not spread rumors without evidence.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Masterful! 'I see your point, but in my opinion...' defuses rumors respectfully.",
        unlockClueId: 'clue_canteen_receipt',
        nextNodeId: 'canteen_ch1_receipt'
      }
    ]
  },
  canteen_ch1_receipt: {
    id: 'canteen_ch1_receipt',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "You are such a polite and thoughtful student! Actually, Rafi was here yesterday buying sweet tea and fried tempe for his juniors working late. Here is the receipt stub.",
    choices: [
      {
        text: "I couldn't agree more with your kind judgment, Ibu Siti.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Warm and courteous agreement!"
      },
      {
        text: "That's true! A caring senior wouldn't steal his own school's pride.",
        isCorrect: true,
        trustChange: 10,
        feedback: "'That's true!' logically supports your compassionate deduction."
      },
      {
        text: "Food receipts are completely meaningless.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dismissive attitude towards evidence."
      }
    ]
  },

  // FAJAR (STUDENT COUNCIL PRESIDENT IN COURTYARD)
  fajar_ch1_start: {
    id: 'fajar_ch1_start',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "Hi there! I am coordinating the decorations for tomorrow's Jubilee. Everyone is worried that losing the Golden Trophy will ruin the opening ceremony.",
    choices: [
      {
        text: "Cancel the whole celebration immediately!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Giving up causes unnecessary panic among the organizers."
      },
      {
        text: "In my opinion, we should keep preparing the stage while investigating the facts calmly.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Mature leadership opinion using 'In my opinion'!"
      },
      {
        text: "That's true, but teamwork will keep the celebration alive regardless.",
        isCorrect: true,
        trustChange: 12,
        feedback: "Encouraging perspective validating teamwork!"
      }
    ]
  },
  fajar_ch2_start: {
    id: 'fajar_ch2_start',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "The student council met this morning. Some representatives wanted to confront Rafi aggressively about the rumors.",
    choices: [
      {
        text: "I see your point, but confronting someone without verified proof creates division.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Masterful polite disagreement that protects school unity."
      },
      {
        text: "Yes, let's protest outside the workshop right now!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Hostile actions disrupt learning and harm harmony."
      },
      {
        text: "From my point of view, we should consult the teachers before taking any action.",
        isCorrect: true,
        trustChange: 12,
        feedback: "Wise administrative advice using 'From my point of view'!"
      }
    ]
  },
  fajar_ch3_start: {
    id: 'fajar_ch3_start',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "Look at the decorated stage! The 25th Silver Jubilee is finally here. Thank you for maintaining peace with respectful words.",
    choices: [
      {
        text: "I couldn't agree more! Respectful communication made this great day possible.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Inspiring conclusion to student collaboration!"
      }
    ]
  },

  // SENIOR RAFI
  rafi_ch1_preview: {
    id: 'rafi_ch1_preview',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Hello junior! I see you are looking around the courtyard. Tomorrow is a historic milestone for SMK Muhiba. Keep your eyes open for true craftsmanship.",
    choices: [
      {
        text: "Did you steal the golden trophy yesterday?",
        isCorrect: false,
        trustChange: -15,
        feedback: "Blunt, rude accusations close doors to constructive conversation."
      },
      {
        text: "In my opinion, our school history deserves honor. We will find whatever went missing.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Polite, dignified response that earns Rafi's respect."
      },
      {
        text: "I agree with you! Our vocational skills are something to celebrate.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Positive vocational solidarity!"
      }
    ]
  },
  rafi_ch2_secret: {
    id: 'rafi_ch2_secret',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Psst... You're the new student everyone is talking about. I know rumors are flying that I took the trophy. Please trust that everything will be revealed at tomorrow's ceremony.",
    choices: [
      {
        text: "Thief! I am reporting you right now!",
        isCorrect: false,
        trustChange: -25,
        feedback: "Aggressive behavior ruins communication and prevents learning the truth!"
      },
      {
        text: "I see your point, but can you at least give us a hint so rumors don't escalate?",
        isCorrect: true,
        trustChange: 15,
        feedback: "Diplomatic inquiry ('I see your point, but...') keeps dialogue open without pressuring.",
        unlockClueId: 'clue_anniversary_draft',
        nextNodeId: 'rafi_ch2_hint'
      },
      {
        text: "In my opinion, keeping total secrets makes people suspicious.",
        isCorrect: true,
        trustChange: 12,
        feedback: "Honest and respectful feedback!",
        unlockClueId: 'clue_anniversary_draft',
        nextNodeId: 'rafi_ch2_hint'
      }
    ]
  },
  rafi_ch2_hint: {
    id: 'rafi_ch2_hint',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Here... look at this sketch in my notebook. Read the inscription. Tomorrow in Chapter 3, stand with me during the assembly and help explain the truth with polite English!",
    choices: [
      {
        text: "I agree with you, Rafi. True facts will shine brighter than false rumors.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Inspiring support! You are ready for the final Chapter 3."
      }
    ]
  },
  rafi_ch3_climax: {
    id: 'rafi_ch3_climax',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "The moment has arrived! Look upon the restored Golden Trophy—hand-polished and engraved with 25th Silver Jubilee laurels!",
    choices: [
      {
        text: "I couldn't agree more! It is an absolute masterpiece of craftsmanship!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Celebrating the glorious truth together!"
      }
    ]
  },

  // BU RINI (AKL TEACHER)
  bu_rini_start: {
    id: 'bu_rini_start',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Welcome to the AKL Accounting Laboratory! We track all assets of SMK Muhammadiyah Bawang with meticulous precision. Our balance sheet indicates the Golden Trophy was donated 25 years ago.",
    choices: [
      {
        text: "I don't think so. Accounting books are useless for finding lost objects.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Too dismissive of accounting discipline! Be respectful."
      },
      {
        text: "From my point of view, auditing the maintenance log will help pinpoint when it was relocated.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Professional phrasing! 'From my point of view' fits an academic accounting discussion perfectly.",
        nextNodeId: 'bu_rini_advice'
      },
      {
        text: "I agree with you, Bu Rini. Every asset must have an audit trail.",
        isCorrect: true,
        trustChange: 12,
        feedback: "'I agree with you' shows strong vocational solidarity!",
        nextNodeId: 'bu_rini_advice'
      }
    ]
  },
  bu_rini_advice: {
    id: 'bu_rini_advice',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Budi is practicing at the Debate Ledger terminal. Help him complete the debate matching exercise to uncover the missing asset ledger entry!",
    choices: [
      {
        text: "I will do that right away. Thank you, Bu Rini!",
        isCorrect: true,
        trustChange: 5,
        feedback: "Ready for the AKL Mini-Game!"
      }
    ]
  },
  bu_rini_ch2: {
    id: 'bu_rini_ch2',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "We cross-referenced the anniversary budget. There is an approved expense line for 'Trophy Restoration Materials' signed by the Principal!",
    choices: [
      {
        text: "Exactly! That proves everything was officially planned.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Solid financial fact check!"
      }
    ]
  },
  bu_rini_ch3: {
    id: 'bu_rini_ch3',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Our financial records balance 100%, and the trophy is back in pristine shape. Great job, student!",
    choices: [
      {
        text: "In my opinion, precision and honesty are the best values.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Inspiring!"
      }
    ]
  },

  // BUDI (AKL STUDENT)
  budi_start: {
    id: 'budi_start',
    speaker: 'Budi',
    speakerRole: 'AKL Classmate',
    avatarType: 'boy_student',
    text: "Hey! I'm balancing our department records on the Debate Ledger. People are arguing about whether financial budgets should prioritize festivals or workshop tools. Can you help me resolve these statements with proper English expressions?",
    choices: [
      {
        text: "I'm afraid I don't have time for silly matching exercises.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Calling a classmate's work 'silly' is impolite."
      },
      {
        text: "I would be glad to! In my opinion, sound reasoning and polite debate resolve any disagreement.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Encouraging and constructive! Ready to play Debate Ledger."
      }
    ]
  },
  budi_ch2: {
    id: 'budi_ch2',
    speaker: 'Budi',
    speakerRole: 'AKL Classmate',
    avatarType: 'boy_student',
    text: "I reviewed the expense logs again. Rafi submitted official receipts for buffing wheels and polishing compound, not personal purchases.",
    choices: [
      {
        text: "That's true! Audit documents don't lie.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Validating financial evidence with 'That's true'!"
      },
      {
        text: "I see your point, but people still spread gossip without reading the logs.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Thoughtful distinction between facts and rumors."
      }
    ]
  },
  budi_ch3: {
    id: 'budi_ch3',
    speaker: 'Budi',
    speakerRole: 'AKL Classmate',
    avatarType: 'boy_student',
    text: "Everything balanced out in the end! We have the trophy and clear accounts. Happy 25th anniversary!",
    choices: [
      {
        text: "I couldn't agree more, Budi! Great work keeping the records straight.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Warm solidarity!"
      }
    ]
  },

  // PAK JOKO (OTOMOTIF TEACHER)
  pak_joko_start: {
    id: 'pak_joko_start',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Welcome to the Otomotif Workshop! Some students rushed in here this morning claiming that we are hiding the Golden Trophy inside a car engine. What an outrageous accusation!",
    choices: [
      {
        text: "You are definitely guilty, hand over the trophy right now!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Never scream at teachers or workshop masters!"
      },
      {
        text: "I see your point, but people are anxious because the anniversary is tomorrow.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Empathetic bridge! 'I see your point, but...' validates his frustration while explaining context.",
        unlockClueId: 'clue_workshop_polish',
        nextNodeId: 'pak_joko_detail'
      },
      {
        text: "You're partly right, but why is there a bottle of gold metal polish on that bench?",
        isCorrect: true,
        trustChange: 12,
        feedback: "Observant and polite inquiry using partial agreement!",
        unlockClueId: 'clue_workshop_polish',
        nextNodeId: 'pak_joko_detail'
      }
    ]
  },
  pak_joko_detail: {
    id: 'pak_joko_detail',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "You have sharp eyes! That polish was requested for a special assignment. Speak to Doni at the motorcycle lift; he's diagnosing an engine misfire while practicing polite opinion phrases.",
    choices: [
      {
        text: "Understood! I will assist Doni with the engine right away.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Ready for the Otomotif 'Engine Talk' minigame!"
      }
    ]
  },
  pak_joko_ch2: {
    id: 'pak_joko_ch2',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Doni and I have been calibrating engines and testing buffing wheels all morning. Precision in vocational work takes patience.",
    choices: [
      {
        text: "From my point of view, technical precision is the hallmark of SMK Muhiba.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Respecting craftsmanship!"
      }
    ]
  },
  pak_joko_ch3: {
    id: 'pak_joko_ch3',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Look at the trophy pedestal in the courtyard now! Rafi and our workshop apprentices spent 18 hours buffing the bronze and engraving the 25-year laurels. What a masterpiece!",
    choices: [
      {
        text: "I couldn't agree more! The craftsmanship is breathtaking!",
        isCorrect: true,
        trustChange: 10,
        feedback: "High craftsmanship pride!"
      }
    ]
  },

  // DONI (OTOMOTIF STUDENT)
  doni_ch1: {
    id: 'doni_ch1',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Hey! We are prepping the workshop for open house tours. Have you checked out our motorcycle lift?",
    choices: [
      {
        text: "In my opinion, workplace safety standards look exemplary here.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Courteous vocational compliment!"
      },
      {
        text: "Your workshop is too loud.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Unnecessarily dismissive."
      }
    ]
  },
  doni_start: {
    id: 'doni_start',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Hey friend! I need to formulate an opinion report for Pak Joko about our engine tuning, but my English sentence blocks got scrambled. Can you help me arrange the blocks into polite opinion and disagreement statements?",
    choices: [
      {
        text: "Fixing motorcycles has nothing to do with English. Do it yourself.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Vocational engineers need global English communication skills!"
      },
      {
        text: "In my opinion, teamwork makes any mechanical repair easier! Let's do it.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Positive attitude and great English! Mini-game ready."
      }
    ]
  },
  doni_ch3: {
    id: 'doni_ch3',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Rafi worked on that bronze cup right here at our bench. His hands were covered in metal polish! Now the whole school is cheering for him.",
    choices: [
      {
        text: "That's true! Honest hard work always earns recognition.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Heartwarming affirmation!"
      }
    ]
  },

  // BU NINA (TJKT TEACHER)
  bu_nina_start: {
    id: 'bu_nina_start',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Welcome to the TJKT Network Lab! We monitor our campus LAN, server racks, and security cameras. Someone told the rumor mill that the CCTV was hacked to hide the trophy.",
    choices: [
      {
        text: "TJKT failed at security! You should be ashamed!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Extremely offensive! Treat educators with respect."
      },
      {
        text: "That might be true, however we should verify the server timestamps first.",
        isCorrect: true,
        trustChange: 15,
        feedback: "High-level partial agreement ('That might be true, however...')!",
        unlockClueId: 'clue_server_backup',
        nextNodeId: 'bu_nina_detail'
      },
      {
        text: "I'm afraid I disagree with that rumor. Did your network logs show any unauthorized breach?",
        isCorrect: true,
        trustChange: 15,
        feedback: "Superb polite disagreement ('I'm afraid I disagree') backed by technical inquiry!",
        unlockClueId: 'clue_server_backup',
        nextNodeId: 'bu_nina_detail'
      }
    ]
  },
  bu_nina_detail: {
    id: 'bu_nina_detail',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Exactly! There was zero hacking. It was just a routine firmware update at 5:00 PM. Maya is currently testing our network patch panel with conversational logic. Go assist her!",
    choices: [
      {
        text: "I agree with you, Bu Nina. I will connect the network cables with Maya.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Onward to the TJKT 'Network Connect' minigame!"
      }
    ]
  },
  bu_nina_ch2: {
    id: 'bu_nina_ch2',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "The log files are pristine. Rafi was caught on camera borrowing the microfiber cloth from the media center with written permission.",
    choices: [
      {
        text: "Exactly! That corroborates the security guard's register.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Cross-referencing data effectively!"
      }
    ]
  },
  bu_nina_ch3: {
    id: 'bu_nina_ch3',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Our livestream of the 25th anniversary is broadcasting across the regency! All network links are green.",
    choices: [
      {
        text: "That's true! Muhiba's excellence is known everywhere!",
        isCorrect: true,
        trustChange: 10,
        feedback: "Network live!"
      }
    ]
  },

  // MAYA (TJKT STUDENT)
  maya_ch1: {
    id: 'maya_ch1',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "Hello! We are monitoring network traffic for the school's online celebration. All bandwidth tests are looking stable.",
    choices: [
      {
        text: "In my opinion, reliable internet infrastructure is crucial for modern schools.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Valuing technological readiness!"
      },
      {
        text: "Computers are overrated.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dismissive attitude."
      }
    ]
  },
  maya_start: {
    id: 'maya_start',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "Hi there! Our router switch cables were disconnected during the server reboot. Each cable represents an English opinion statement that must link to its logical polite response pin. Can you help me patch the network?",
    choices: [
      {
        text: "Cables are boring, I only care about wireless signals.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dismissive attitude towards physical networking fundamentals."
      },
      {
        text: "From my point of view, network logic and clear communication are identical! Let's patch them.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Inspiring! Unlocks TJKT Network Connect minigame."
      }
    ]
  },
  maya_ch3: {
    id: 'maya_ch3',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "Over 5,000 alumni are watching our livestream right now! Everyone is complimenting the restored Golden Trophy on screen.",
    choices: [
      {
        text: "I couldn't agree more! It is a proud day for all students and alumni.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Celebrating alumni pride!"
      }
    ]
  },

  // CHAPTER 3 CLIMAX & CONFRONTATION
  principal_ch2_start: {
    id: 'principal_ch2_start',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Good morning! Day 2 of our investigation begins. Rumors have reached the staffroom that senior Rafi was seen working late in the Otomotif Workshop and TJKT Lab. Remember: evaluate facts before judging anyone!",
    choices: [
      {
        text: "I don't think so. If Rafi was there, he must be guilty!",
        isCorrect: false,
        trustChange: -10,
        feedback: "Avoid assuming guilt without evidence."
      },
      {
        text: "I couldn't agree more, sir. Premature accusations only cause misunderstandings.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Profound wisdom! 'I couldn't agree more' reflects high communication ethics."
      }
    ]
  },
  principal_ch3_debate: {
    id: 'principal_ch3_debate',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Attention students and teachers of SMK Muhammadiyah Bawang! It is Day 3, our 25th Silver Jubilee! The courtyard is full, but angry voices are shouting that Senior Rafi took the Golden Trophy. As our lead investigator, what is your official stance?",
    choices: [
      {
        text: "I couldn't agree more with the angry crowd! Expel Rafi immediately!",
        isCorrect: false,
        trustChange: -25,
        feedback: "Unfair and destructive to condemn someone based on crowd anger."
      },
      {
        text: "I see your point, but everyone is angry, so let's just blame Rafi.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Never sacrifice an innocent student to appease angry rumors!"
      },
      {
        text: "In my opinion, we must stop accusing without proof. From my point of view, Rafi has an honorable explanation!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Courageous and eloquent! Using 'In my opinion' and 'From my point of view' to champion justice.",
        unlockClueId: 'clue_principal_note',
        nextNodeId: 'ch3_debate_confrontation'
      }
    ]
  },
  ch3_debate_confrontation: {
    id: 'ch3_debate_confrontation',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Thank you for defending reason! Look everyone: behold what was inside the workshop!",
    choices: [
      {
        text: "That's true! Behold the Golden Trophy, polished to perfection with 25th Anniversary gold leaf!",
        isCorrect: true,
        trustChange: 20,
        feedback: "The glorious truth emerges!",
        nextNodeId: 'ch3_the_reveal'
      }
    ]
  },
  ch3_the_reveal: {
    id: 'ch3_the_reveal',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Haha! It is time to unveil the secret! The old 1999 trophy had tarnished brass after 25 years. I secretly tasked Senior Rafi and the Otomotif department to restore, polish, and engrave it as a surprise gift for our Jubilee celebration! Rafi never stole anything—he was our craftsman hero!",
    choices: [
      {
        text: "You're partly right, but you gave us quite a fright with the secrecy!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Playful partial agreement! The principal laughs heartily.",
        nextNodeId: 'ch3_celebration'
      },
      {
        text: "I couldn't agree more, sir! Disagreement without listening creates conflict, but polite dialogue builds unity.",
        isCorrect: true,
        trustChange: 25,
        feedback: "Inspiring moral lesson! The entire school applauds your polite communication skills!",
        nextNodeId: 'ch3_celebration'
      }
    ]
  },
  ch3_celebration: {
    id: 'ch3_celebration',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Let the 25th Anniversary celebration of SMK Muhammadiyah Bawang begin! Take the final Chapter 3 communication assessment to receive your official 'Best Communicator' badge of honor!",
    choices: [
      {
        text: "In my opinion, this has been an extraordinary celebration at SMK Muhiba!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Celebration unlocked! Head to the final quiz and victory hall."
      }
    ]
  },

  // SECURITY GUARD CH 2 & 3
  security_ch2_start: {
    id: 'security_ch2_start',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Good morning! I noticed Rafi was carrying metal polishing compound and jeweler's cloths yesterday. Doesn't look like any crime to me.",
    choices: [
      {
        text: "I agree with you, Pak Slamet. Real evidence points towards restoration, not theft.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Sharp deduction!"
      }
    ]
  },
  security_ch3_start: {
    id: 'security_ch3_start',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Happy 25th Anniversary! The gate is decorated with festive banners and flowers. Today we celebrate unity!",
    choices: [
      {
        text: "Exactly! It's a wonderful day for SMK Muhammadiyah Bawang!",
        isCorrect: true,
        trustChange: 10,
        feedback: "High spirits!"
      }
    ]
  },

  // CANTEEN IBU SITI CH 2 & 3
  canteen_ch2_start: {
    id: 'canteen_ch2_start',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "Have some refreshments! Many teachers came by saying Rafi is working on a special anniversary surprise. The rumors were completely unfounded.",
    choices: [
      {
        text: "That's true! In my opinion, checking directly with people is always better than gossip.",
        isCorrect: true,
        trustChange: 10,
        feedback: "Wise principle!"
      }
    ]
  },
  canteen_ch3_start: {
    id: 'canteen_ch3_start',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "I prepared festive celebratory dishes for our 25th anniversary! You communicated so politely throughout!",
    choices: [
      {
        text: "I couldn't agree more! Thank you very much, Ibu Siti!",
        isCorrect: true,
        trustChange: 10,
        feedback: "Delicious celebration!"
      }
    ]
  }
};
