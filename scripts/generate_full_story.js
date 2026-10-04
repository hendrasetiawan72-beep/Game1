const fs = require('fs');

const NPCS = [
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
  {
    id: 'syamsul',
    name: 'Pak Syamsul',
    role: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    zone: 'courtyard',
    x: 170,
    y: 170,
    initialDialogueNodeId: 'syamsul_ch1_start',
    chapterDialogueNodes: {
      1: 'syamsul_ch1_start',
      2: 'syamsul_ch2_start',
      3: 'syamsul_ch3_start'
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
  {
    id: 'tari',
    name: 'Tari',
    role: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    zone: 'akl',
    x: 220,
    y: 360,
    initialDialogueNodeId: 'tari_ch1_start',
    chapterDialogueNodes: {
      1: 'tari_ch1_start',
      2: 'tari_ch2_start',
      3: 'tari_ch3_start'
    }
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
  {
    id: 'hendra',
    name: 'Hendra',
    role: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    zone: 'otomotif',
    x: 480,
    y: 380,
    initialDialogueNodeId: 'hendra_ch1_start',
    chapterDialogueNodes: {
      1: 'hendra_ch1_start',
      2: 'hendra_ch2_start',
      3: 'hendra_ch3_start'
    }
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
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    zone: 'tjkt',
    x: 280,
    y: 380,
    initialDialogueNodeId: 'rio_ch1_start',
    chapterDialogueNodes: {
      1: 'rio_ch1_start',
      2: 'rio_ch2_start',
      3: 'rio_ch3_start'
    }
  }
];

// Helper to assemble dialogue nodes
const DIALOGUE_NODES = {
  // ==========================================
  // 1. PRINCIPAL (PAK HARYONO)
  // ==========================================
  principal_ch1_start: {
    id: 'principal_ch1_start',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Welcome to SMK Muhammadiyah Bawang! Tomorrow marks our school's 25th Silver Jubilee. But our beloved Golden Trophy has disappeared from its pedestal! As our newest student investigator, will you help examine the clues respectfully?",
    choices: [
      {
        text: "I don't care about an old trophy. Why don't you buy a plastic cup instead?",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disrespectful! That damages the principal's trust."
      },
      {
        text: "I think we can solve this mystery together, Pak Haryono. Where should I begin?",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent! 'I think...' introduces your constructive viewpoint with confidence.",
        nextNodeId: 'principal_ch1_advice'
      },
      {
        text: "Trophies are completely meaningless in vocational education.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Insensitive! Trophies represent collective school heritage."
      }
    ]
  },
  principal_ch1_advice: {
    id: 'principal_ch1_advice',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Thank you for your willingness. The empty pedestal had faint velvet fibers. Our security guard Pak Slamet and canteen owner Ibu Siti were nearby yesterday afternoon. How will you approach them?",
    choices: [
      {
        text: "I will interrogate them aggressively until they confess!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Hostile communication provokes defensive resistance."
      },
      {
        text: "You're partly right to worry, but I believe polite inquiries will yield reliable facts.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Masterful! 'You're partly right, but...' demonstrates partial agreement and polite determination.",
        unlockClueId: 'clue_pedestal'
      },
      {
        text: "In my opinion, listening first is far better than accusing people.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Wise choice! 'In my opinion...' introduces a thoughtful investigation ethic."
      }
    ]
  },

  principal_ch2_start: {
    id: 'principal_ch2_start',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Welcome back for Day 2. Rumors are spreading that senior student Rafi took the trophy without permission. Some teachers demand immediate punishment. What is your stance?",
    choices: [
      {
        text: "I see your point, but we must verify his motives before making accusations.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Superb! 'I see your point, but...' politely balances caution with empathy.",
        nextNodeId: 'principal_ch2_followup'
      },
      {
        text: "Suspend Rafi right now without hearing his explanation!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Hasty punishment without due process destroys student trust."
      },
      {
        text: "I don't care about school rumors at all.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Apathy hinders resolving student conflicts."
      }
    ]
  },
  principal_ch2_followup: {
    id: 'principal_ch2_followup',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "I appreciate your calm judgment. Pak Joko in Otomotif and Bu Nina in TJKT both noticed unusual activity late yesterday. How should we evaluate their departmental logs?",
    choices: [
      {
        text: "From my point of view, comparing technical logs with workshop tools will clarify the truth.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Insightful! 'From my point of view...' frames objective analytical reasoning.",
        unlockClueId: 'clue_principal_note'
      },
      {
        text: "Vocational teachers always exaggerate things.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disrespectful to vocational faculty."
      },
      {
        text: "I agree with you! Let us check both labs thoroughly.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Positive and supportive agreement!"
      }
    ]
  },

  principal_ch3_debate: {
    id: 'principal_ch3_debate',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "It is Day 3! The 25th Anniversary celebration is about to begin in the courtyard, yet several student reps still accuse Rafi of theft. Are you prepared to lead the final debate?",
    choices: [
      {
        text: "I'm afraid I disagree with accusing Rafi when all evidence points to honorable craftsmanship.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Brilliant polite disagreement! 'I'm afraid I disagree...' challenges false accusations.",
        nextNodeId: 'ch3_debate_confrontation'
      },
      {
        text: "Let the angry students fight each other, it's entertaining.",
        isCorrect: false,
        trustChange: -25,
        feedback: "Unacceptable! Leadership requires building unity, not watching conflict."
      },
      {
        text: "Cancel the entire 25th anniversary ceremony!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Extreme overreaction that disheartens the whole school."
      }
    ]
  },
  ch3_debate_confrontation: {
    id: 'ch3_debate_confrontation',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Everyone, quiet please! Our student investigator has analyzed all evidence across AKL, Otomotif, and TJKT. Investigator, what is your formal finding?",
    choices: [
      {
        text: "In my opinion, Rafi did not steal the trophy; he spent late hours restoring it as a surprise gift!",
        isCorrect: true,
        trustChange: 25,
        feedback: "Triumphant deduction! You articulated the truth with respect and poise.",
        nextNodeId: 'ch3_debate_reveal'
      },
      {
        text: "Rafi should be arrested immediately!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Completely ignores the mounting physical proof of restoration!"
      },
      {
        text: "I believe everyone was partially right, but nobody listened to each other.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Deep philosophical understanding of the dispute!",
        nextNodeId: 'ch3_debate_reveal'
      }
    ]
  },
  ch3_debate_reveal: {
    id: 'ch3_debate_reveal',
    speaker: 'Pak Haryono',
    speakerRole: 'School Principal',
    avatarType: 'principal',
    text: "Exactly right! Senior Rafi, unveil the pedestal! The 25th Silver Jubilee Golden Trophy is fully polished with engraved anniversary laurels! Well done, investigator!",
    choices: [
      {
        text: "I couldn't agree more, Pak Haryono. Respectful dialogue and polite opinions bring out the best in us!",
        isCorrect: true,
        trustChange: 25,
        feedback: "Magnificent conclusion! 'I couldn't agree more...' celebrates collective success."
      },
      {
        text: "That was obvious from the beginning.",
        isCorrect: false,
        trustChange: -5,
        feedback: "A little conceited, though harmless."
      },
      {
        text: "That's true! When we listen carefully, misunderstandings disappear.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Heartwarming and true!"
      }
    ]
  },

  // ==========================================
  // 2. SECURITY GUARD (PAK SLAMET)
  // ==========================================
  security_ch1_start: {
    id: 'security_ch1_start',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Good morning, student! As head security guard, I keep strict watch over the front gate. People say someone broke into the courtyard cabinet, but I saw no forced entry.",
    choices: [
      {
        text: "You must have fallen asleep at your security post!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disrespectful accusation insulting professional duty."
      },
      {
        text: "That's true, Pak Slamet. No glass was broken, so someone must have had authorized access.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Spot on! 'That's true...' signals logical agreement with facts.",
        nextNodeId: 'security_ch1_detail'
      },
      {
        text: "Security guards know nothing about investigations.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Condescending remark."
      }
    ]
  },
  security_ch1_detail: {
    id: 'security_ch1_detail',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Thank you for listening. Here is my gate register: at 5:30 PM yesterday, someone checked out a heavy padded equipment case. What do you make of this log?",
    choices: [
      {
        text: "In my opinion, this log suggests the trophy was safely transported, not stolen in haste.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Sharp deduction! 'In my opinion...' links the padded case to gentle handling.",
        unlockClueId: 'clue_security_log'
      },
      {
        text: "This register is totally useless.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Careless dismissal of written documentation."
      },
      {
        text: "I believe the thief forged your handwriting, Pak Slamet.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Conspiracy theory without evidence."
      }
    ]
  },

  security_ch2_start: {
    id: 'security_ch2_start',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Some students claim the security cameras were cut by a master criminal yesterday. Do you believe that wild story?",
    choices: [
      {
        text: "I'm afraid I disagree. School cameras often undergo scheduled network maintenance.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Polite and realistic! 'I'm afraid I disagree...' dispels sensational rumors.",
        nextNodeId: 'security_ch2_cctv'
      },
      {
        text: "Yes, an international jewel thief invaded SMK Muhammadiyah Bawang!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Absurd fantasy unsupported by vocational reality."
      },
      {
        text: "I don't think so. Let's consult the TJKT lab network technician first.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Prudent and measured! 'I don't think so...' expresses reasonable skepticism.",
        nextNodeId: 'security_ch2_cctv'
      }
    ]
  },
  security_ch2_cctv: {
    id: 'security_ch2_cctv',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "I agree with your sensible thinking. Look closely at the workshop pathway: faint wheel tracks lead straight to the automotive garage.",
    choices: [
      {
        text: "I agree with you! Those tracks prove the padded container went directly into the Otomotif shop.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Strong collaborative deduction! 'I agree with you!' confirms the trail.",
        unlockClueId: 'clue_workshop_polish'
      },
      {
        text: "Tracks mean nothing, anyone could walk there.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dismissive attitude."
      },
      {
        text: "Let's call the police and arrest the entire Otomotif department!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Aggressive overreaction."
      }
    ]
  },

  security_ch3_start: {
    id: 'security_ch3_start',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "The anniversary ceremony is about to start. Looking back, what is the best lesson for keeping school property safe?",
    choices: [
      {
        text: "Put barbed wire and metal detectors around every classroom!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Turns a school into a prison."
      },
      {
        text: "In my opinion, mutual trust and transparent communication protect our school better than suspicion.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Profound! 'In my opinion...' highlights community bonds over fear.",
        nextNodeId: 'security_ch3_celebrate'
      },
      {
        text: "Never let students touch any trophies ever again.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Stifles student pride."
      }
    ]
  },
  security_ch3_celebrate: {
    id: 'security_ch3_celebrate',
    speaker: 'Pak Slamet',
    speakerRole: 'Head Security Guard',
    avatarType: 'security',
    text: "Spoken like a true scholar! I will stand honor guard by the gate as the jubilee celebration begins.",
    choices: [
      {
        text: "I couldn't agree more, Pak Slamet. Thank you for keeping our school secure!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Warm, respectful, and courteous!"
      },
      {
        text: "Just do your job and stop talking.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Extremely rude to school staff."
      },
      {
        text: "That's true! Have a wonderful 25th anniversary celebration!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Friendly and celebratory!"
      }
    ]
  },

  // ==========================================
  // 3. CANTEEN OWNER (IBU SITI)
  // ==========================================
  canteen_ch1_start: {
    id: 'canteen_ch1_start',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "Selamat pagi, dear student! Have some hot sweet tea. Everyone is agitated about the Golden Trophy, but arguing on an empty stomach solves nothing!",
    choices: [
      {
        text: "I agree with you, Ibu Siti. Calm discussion over tea is much better than angry accusations.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Polite and agreeable! 'I agree with you...' establishes cordial rapport.",
        nextNodeId: 'canteen_ch1_receipt'
      },
      {
        text: "Tea is a waste of time, I am too important to talk to canteen staff!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Arrogant and hurtful to Ibu Siti."
      },
      {
        text: "Your tea smells funny.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Unprovoked rudeness."
      }
    ]
  },
  canteen_ch1_receipt: {
    id: 'canteen_ch1_receipt',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "Here is something interesting: senior Rafi bought three cups of tea and fried bananas late yesterday afternoon. He looked excited and carried a bottle of brass polish. What is your thought?",
    choices: [
      {
        text: "He must be guilty of drinking tea during school hours!",
        isCorrect: false,
        trustChange: -10,
        feedback: "Misses the essential point entirely."
      },
      {
        text: "In my opinion, purchasing refreshments for companions suggests a collaborative restoration project.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Brilliant deductive insight! 'In my opinion...' interprets the clue constructively.",
        unlockClueId: 'clue_canteen_receipt'
      },
      {
        text: "I don't care about snacks and receipts.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Apathetic response."
      }
    ]
  },

  canteen_ch2_start: {
    id: 'canteen_ch2_start',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "Some junior students were gossiping here during recess, saying Rafi stole the trophy out of jealousy. What should I tell them?",
    choices: [
      {
        text: "I believe spreading unproven gossip damages our school's brotherhood and character.",
        isCorrect: true,
        trustChange: 15,
        feedback: "High moral standard! 'I believe...' expresses conviction with dignity.",
        nextNodeId: 'canteen_ch2_rumors'
      },
      {
        text: "Tell them to spread the rumor on social media immediately!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Encouraging slander is harmful and destructive."
      },
      {
        text: "You're partly right to listen, but gossip is never proof.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Nuanced and respectful.",
        nextNodeId: 'canteen_ch2_rumors'
      }
    ]
  },
  canteen_ch2_rumors: {
    id: 'canteen_ch2_rumors',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "I will remind them of that! Rafi has always been our top automotive metal crafter. Why would he damage school property?",
    choices: [
      {
        text: "Exactly! His reputation for craftsmanship contradicts the theory of malicious theft.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Empathetic and logical! 'Exactly!' affirms character consistency."
      },
      {
        text: "Good students can turn evil overnight.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Cynical and unfair."
      },
      {
        text: "I couldn't agree more. We should inspect his workshop project directly.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Active problem solving!"
      }
    ]
  },

  canteen_ch3_start: {
    id: 'canteen_ch3_start',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "The celebration stage is decorated with silver ribbons and flowers! The mystery is almost solved, isn't it?",
    choices: [
      {
        text: "That's true, Ibu Siti. All the pieces are coming together for a wonderful celebration!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Warm and encouraging! 'That's true...' shares festive joy.",
        nextNodeId: 'canteen_ch3_anniversary'
      },
      {
        text: "No, everything is going to end in tears and shouting.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Pessimistic gloom."
      },
      {
        text: "Give me free food right now!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Selfish and impolite."
      }
    ]
  },
  canteen_ch3_anniversary: {
    id: 'canteen_ch3_anniversary',
    speaker: 'Ibu Siti',
    speakerRole: 'Canteen Owner',
    avatarType: 'canteen',
    text: "I prepared twenty trays of celebratory snacks for all students and teachers! What do you think about our Muhiba spirit?",
    choices: [
      {
        text: "From my point of view, our school community thrives because of generous hearts like yours.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Courteous and heartwarming tribute to school support staff!"
      },
      {
        text: "School spirit is an illusion invented by principals.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Cynical attitude."
      },
      {
        text: "I couldn't agree more, Ibu Siti! Happy 25th Silver Jubilee!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Cheerful and celebratory!"
      }
    ]
  },

  // ==========================================
  // 4. STUDENT COUNCIL PRESIDENT (FAJAR)
  // ==========================================
  fajar_ch1_start: {
    id: 'fajar_ch1_start',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "Hey! As OSIS Student Council President, I am under immense pressure. The regional guests arrive tomorrow, and the centerpiece trophy is missing! Some committee members want to blame the senior class.",
    choices: [
      {
        text: "You are an incompetent leader, Fajar!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Hostile attack that damages peer cooperation."
      },
      {
        text: "I see your point, but blaming entire classes without evidence will divide the student body.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Diplomatic and respectful! 'I see your point, but...' de-escalates blame.",
        nextNodeId: 'fajar_ch1_pressure'
      },
      {
        text: "Who cares about regional guests? Let them see an empty table.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Irresponsible."
      }
    ]
  },
  fajar_ch1_pressure: {
    id: 'fajar_ch1_pressure',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "You're right. As student leaders, we must keep everyone united. Where do you think OSIS committee members should help search?",
    choices: [
      {
        text: "In my opinion, we should check each department's lab before jumping to conclusions.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Systematic leadership advice! 'In my opinion...' offers structured direction."
      },
      {
        text: "Search every student's backpack forcefully!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Violates student rights and stirs resentment."
      },
      {
        text: "I believe examining the workshop and server room will clarify the timeline.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Constructive collaboration!"
      }
    ]
  },

  fajar_ch2_start: {
    id: 'fajar_ch2_start',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "Rafi was seen leaving the school late last night carrying heavy workshop tools. A faction of the student council demands that we disqualify him from the anniversary ceremony immediately.",
    choices: [
      {
        text: "I'm afraid I disagree. Disqualifying a senior based on rumors violates fairness and justice.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Principled polite disagreement! 'I'm afraid I disagree...' upholds student rights.",
        nextNodeId: 'fajar_ch2_debate'
      },
      {
        text: "Yes, expel him from school right away!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Ruthless and unfair."
      },
      {
        text: "Let the student council vote without hearing Rafi's side.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Denying due process is unjust."
      }
    ]
  },
  fajar_ch2_debate: {
    id: 'fajar_ch2_debate',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "Thank you for reminding me of our core values. If Rafi wasn't stealing the trophy, why did he work in secret without telling everyone?",
    choices: [
      {
        text: "From my point of view, surprises lose their joy if everyone knows about them in advance.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Intuitive psychology! 'From my point of view...' explains the surprise motive."
      },
      {
        text: "Because he is secretly evil and wants to ruin the school!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Dramatic paranoia."
      },
      {
        text: "You're partly right to wonder, but authentic surprises require discretion.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Balanced and thoughtful!"
      }
    ]
  },

  fajar_ch3_start: {
    id: 'fajar_ch3_start',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "The stage is set! The debate between students is heating up in the courtyard. Will you help me guide the student council toward reconciliation?",
    choices: [
      {
        text: "I couldn't agree more, Fajar. Let us stand together and present the facts with respect.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Inspiring! 'I couldn't agree more...' demonstrates shared leadership.",
        nextNodeId: 'fajar_ch3_unity'
      },
      {
        text: "Debates are useless, let them yell at each other.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Surrenders leadership duty."
      },
      {
        text: "I think you should step down as president.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Unprovoked hostility."
      }
    ]
  },
  fajar_ch3_unity: {
    id: 'fajar_ch3_unity',
    speaker: 'Fajar',
    speakerRole: 'Student Council President',
    avatarType: 'boy_student',
    text: "We are ready! When you address the crowd, the student council will back your findings wholeheartedly.",
    choices: [
      {
        text: "In my opinion, our student unity today will be remembered as Muhiba's finest achievement.",
        isCorrect: true,
        trustChange: 20,
        feedback: "A statesmanlike opinion that uplifts the entire student body!"
      },
      {
        text: "Just make sure my name is in the biggest font on the certificate.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Vanity detracts from genuine service."
      },
      {
        text: "That's true! United we solve mysteries, divided we cause misunderstandings.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Catchy and inspirational motto!"
      }
    ]
  },

  // ==========================================
  // 5. SENIOR RAFI (CRAFTSMAN & SENIOR PRESIDENT)
  // ==========================================
  rafi_ch1_preview: {
    id: 'rafi_ch1_preview',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Hello, junior! Welcome to Muhiba. The 25th anniversary is a massive milestone for us. I believe vocational students should take personal pride in every heirloom our predecessors earned.",
    choices: [
      {
        text: "I couldn't agree more, Senior Rafi! Vocational pride comes from honoring craftsmanship.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Resonant! 'I couldn't agree more...' wins Rafi's deep respect.",
        nextNodeId: 'rafi_ch1_craft'
      },
      {
        text: "Old heirlooms are garbage, modern people only care about smartphones.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disrespects vocational heritage."
      },
      {
        text: "You talk too much for a senior student.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Rude and disrespectful."
      }
    ]
  },
  rafi_ch1_craft: {
    id: 'rafi_ch1_craft',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "I can see you have an observant eye. An heirloom that loses its shine after twenty-five years deserves special care, wouldn't you say?",
    choices: [
      {
        text: "That's true! Neglected metal tarnishes, but skilled restoration brings back its original glory.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Insightful! 'That's true!' validates Rafi's unspoken craft philosophy."
      },
      {
        text: "Throw tarnished metal in the trash bin.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Crude disregard for restoration."
      },
      {
        text: "In my opinion, restoring historical artifacts teaches patience and technique.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Thoughtful and cultured perspective!"
      }
    ]
  },

  rafi_ch2_secret: {
    id: 'rafi_ch2_secret',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Some people are saying I took the Golden Trophy. They claim I am hiding something in the automotive workshop. What do you think, investigator?",
    choices: [
      {
        text: "You are a thief and I am going to report you right now!",
        isCorrect: false,
        trustChange: -25,
        feedback: "Aggressive accusation before verifying facts."
      },
      {
        text: "In my opinion, you wouldn't steal school heritage; you are working on a special project for the celebration.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Empathetic deduction! 'In my opinion...' offers balanced understanding.",
        nextNodeId: 'rafi_ch2_hint'
      },
      {
        text: "I don't care what you did in the workshop.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Apathetic brush-off."
      }
    ]
  },
  rafi_ch2_hint: {
    id: 'rafi_ch2_hint',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "You have genuine empathy. Have a look at my workshop bench in Otomotif. Sometimes when people jump to conclusions, they mistake genuine devotion for dishonesty.",
    choices: [
      {
        text: "I agree with you, Senior Rafi. True intentions are revealed by craftsmanship, not rumors.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Profound connection! 'I agree with you...' cements trust with Rafi.",
        unlockClueId: 'clue_workshop_polish'
      },
      {
        text: "You are making excuses because you got caught!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Blind accusation."
      },
      {
        text: "From my point of view, examining the bench will provide objective proof.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Equitable and objective approach!"
      }
    ]
  },

  rafi_ch3_climax: {
    id: 'rafi_ch3_climax',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "The moment has arrived. The entire school is assembled in the courtyard. Are you ready to explain why the Golden Trophy was moved to the workshop?",
    choices: [
      {
        text: "I believe the school will be deeply inspired when they see your restored trophy handles and anniversary laurels!",
        isCorrect: true,
        trustChange: 25,
        feedback: "Triumphant affirmation! 'I believe...' expresses enthusiastic encouragement.",
        nextNodeId: 'rafi_ch3_presentation'
      },
      {
        text: "I will tell everyone you stole it to get you expelled.",
        isCorrect: false,
        trustChange: -30,
        feedback: "Malicious betrayal of facts."
      },
      {
        text: "I'm nervous, maybe we should keep the trophy hidden forever.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Unnecessary hesitation."
      }
    ]
  },
  rafi_ch3_presentation: {
    id: 'rafi_ch3_presentation',
    speaker: 'Senior Rafi',
    speakerRole: 'Senior Class President & Craftsman',
    avatarType: 'senior_rafi',
    text: "Thank you, my friend. Let's step onto the stage together. The golden shine belongs to all of SMK Muhammadiyah Bawang!",
    choices: [
      {
        text: "I couldn't agree more! Happy 25th Silver Jubilee anniversary to all of us!",
        isCorrect: true,
        trustChange: 25,
        feedback: "Spectacular finale celebration!"
      },
      {
        text: "I am the only one who deserves credit here.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Self-centered boast."
      },
      {
        text: "That's true! Respectful teamwork always reveals the truth.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Spot on moral conclusion!"
      }
    ]
  },

  // ==========================================
  // 6. PAK SYAMSUL (MUSHOLLA CARETAKER & TEACHER)
  // ==========================================
  syamsul_ch1_start: {
    id: 'syamsul_ch1_start',
    speaker: 'Pak Syamsul',
    speakerRole: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    text: "Peace be upon you, young investigator. In difficult times, remember that expressing calm opinions and seeking truthful proof prevents unnecessary accusations.",
    choices: [
      {
        text: "Calmness is useless! I want to accuse everyone until someone admits they stole it!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Rude and aggressive! Groundless accusations destroy school unity."
      },
      {
        text: "I believe we must always investigate with calm respect and honest proof, Pak Syamsul.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent! 'I believe...' is an earnest way to state your principles.",
        nextNodeId: 'syamsul_ch1_reflection'
      },
      {
        text: "You are completely wasting my time, old teacher!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Extremely disrespectful! Show courtesy to school elders."
      }
    ]
  },
  syamsul_ch1_reflection: {
    id: 'syamsul_ch1_reflection',
    speaker: 'Pak Syamsul',
    speakerRole: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    text: "A pure heart and clear eyes see through deception. When speaking to students under suspicion, how will you address their dignity?",
    choices: [
      {
        text: "In my opinion, every person deserves to be treated with dignity and fairness until facts are verified.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Profound moral integrity! 'In my opinion...' reflects Islamic ethics of justice."
      },
      {
        text: "Dignity is for winners, not suspects.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Arrogant and unethical."
      },
      {
        text: "That's true! Respect builds trust, while suspicion breeds resentment.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Wise affirmation!"
      }
    ]
  },

  syamsul_ch2_start: {
    id: 'syamsul_ch2_start',
    speaker: 'Pak Syamsul',
    speakerRole: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    text: "Yesterday before Maghrib prayer, I noticed a senior student carrying a cushioned box toward the automotive workshop with great care and reverence.",
    choices: [
      {
        text: "That proves he is guilty! Let's report him immediately!",
        isCorrect: false,
        trustChange: -10,
        feedback: "Jumping to conclusions without listening to his side leads to injustice."
      },
      {
        text: "I see your point, but we should verify why he took it there before judging him.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Skillful! 'I see your point, but...' gently offers a balanced counter-view.",
        unlockClueId: 'clue_workshop_polish',
        nextNodeId: 'syamsul_ch2_testimony'
      },
      {
        text: "I don't believe you saw anything at all.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Blunt and cynical. Politely state your view instead of dismissing others."
      }
    ]
  },
  syamsul_ch2_testimony: {
    id: 'syamsul_ch2_testimony',
    speaker: 'Pak Syamsul',
    speakerRole: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    text: "His hands were gentle, like a craftsman carrying sacred glass. A thief runs in fear, but he walked with prayerful purpose.",
    choices: [
      {
        text: "Exactly! His gentle demeanor confirms he was protecting the artifact, not looting it.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Brilliant character observation! 'Exactly!' affirms moral perception."
      },
      {
        text: "Thieves can pretend to be gentle too.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Stubbornly clinging to negativity."
      },
      {
        text: "From my point of view, his reverence points toward an authorized surprise.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Analytical and charitable insight!"
      }
    ]
  },

  syamsul_ch3_start: {
    id: 'syamsul_ch3_start',
    speaker: 'Pak Syamsul',
    speakerRole: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    text: "The anniversary stage is ready. Do you now realize the true lesson behind the missing trophy?",
    choices: [
      {
        text: "There was no lesson, just a waste of three days!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Cynical! Every investigation teaches us patience and understanding."
      },
      {
        text: "In my opinion, respectful communication and polite disagreement build true harmony.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Profound! 'In my opinion...' introduces your reflective viewpoint with grace.",
        nextNodeId: 'syamsul_ch3_wisdom'
      },
      {
        text: "Only winners deserve trophies, so who cares about lessons?",
        isCorrect: false,
        trustChange: -20,
        feedback: "Inconsiderate response."
      }
    ]
  },
  syamsul_ch3_wisdom: {
    id: 'syamsul_ch3_wisdom',
    speaker: 'Pak Syamsul',
    speakerRole: 'Musholla Caretaker & Teacher',
    avatarType: 'teacher_syamsul',
    text: "May your words continue to guide your classmates. Go forth and help celebrate our 25th Silver Jubilee!",
    choices: [
      {
        text: "I couldn't agree more, Pak Syamsul. Thank you for your guidance and prayers!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Respectful and pious gratitude!"
      },
      {
        text: "I am smarter than everyone here anyway.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Pride goeth before a fall."
      },
      {
        text: "That's true! Peace and honesty will always triumph.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Noble sentiment!"
      }
    ]
  },

  // ==========================================
  // 7. AKL ACCOUNTING TEACHER (BU RINI)
  // ==========================================
  bu_rini_start: {
    id: 'bu_rini_start',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Welcome to the AKL Accounting Laboratory. Our department oversees the physical school heritage registry. The Golden Trophy is registered under Asset Code 1999-JUB-025.",
    choices: [
      {
        text: "Accounting is totally irrelevant to a missing trophy.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Dismissive of professional vocational documentation."
      },
      {
        text: "In my opinion, accounting records provide the most reliable paper trail for physical assets.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Respectful and astute! 'In my opinion...' values accounting methodology.",
        nextNodeId: 'bu_rini_advice'
      },
      {
        text: "Who cares about asset codes? Let's break open cabinets!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Vandalism is completely unacceptable."
      }
    ]
  },
  bu_rini_advice: {
    id: 'bu_rini_advice',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Exactly. Look at this audit entry: last month, our department budgeted for professional restoration of the silver and brass alloys. What does that suggest to you?",
    choices: [
      {
        text: "I believe the school authorized a restoration project ahead of the 25th jubilee!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Brilliant deductive connection! 'I believe...' interprets the financial audit accurately.",
        unlockClueId: 'clue_anniversary_draft'
      },
      {
        text: "It means someone embezzled the money!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Cynical accusation without checking invoices."
      },
      {
        text: "That's true! Authorized restoration explains why polishing chemicals were ordered.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Spot on agreement!"
      }
    ]
  },

  bu_rini_ch2: {
    id: 'bu_rini_ch2',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Day 2 audit check! We found an invoice for gold luster compound signed by student rep Rafi. Some staff think he used student council funds illegally.",
    choices: [
      {
        text: "I see your point, but the invoice has the principal's confidential approval stamp on the bottom!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Exceptional investigative eye! 'I see your point, but...' uncovers the secret authorization.",
        nextNodeId: 'bu_rini_ch2_audit'
      },
      {
        text: "Put him in jail for fraud!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Careless overreaction."
      },
      {
        text: "I don't understand invoices and numbers.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Helpless defeatism."
      }
    ]
  },
  bu_rini_ch2_audit: {
    id: 'bu_rini_ch2_audit',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "Gracious me, you are correct! Look at that tiny watermark seal from Pak Haryono. The principal secretly sponsored Rafi's restoration initiative!",
    choices: [
      {
        text: "Exactly! This proves beyond doubt that Rafi is executing an authorized surprise gift.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Ironclad empirical deduction! 'Exactly!' confirms verified truth."
      },
      {
        text: "Teachers shouldn't keep secrets from students.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Misses the warm surprise intent."
      },
      {
        text: "I couldn't agree more, Bu Rini. Accounting ledgers never lie!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Flattering and accurate praise for accounting rigor!"
      }
    ]
  },

  bu_rini_ch3: {
    id: 'bu_rini_ch3',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "The financial books balance to the exact rupiah, and the 25th anniversary ceremony is commencing. What have you learned from auditing this case?",
    choices: [
      {
        text: "That numbers are boring and I want to sleep.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disrespectful in an accounting lab."
      },
      {
        text: "In my opinion, rigorous auditing and polite inquiry prevent innocent students from being falsely blamed.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Superb synthesis of accounting rigor and ethics!",
        nextNodeId: 'bu_rini_ch3_finish'
      },
      {
        text: "That everyone in this school is suspicious.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Paranoid worldview."
      }
    ]
  },
  bu_rini_ch3_finish: {
    id: 'bu_rini_ch3_finish',
    speaker: 'Bu Rini',
    speakerRole: 'AKL Accounting Teacher',
    avatarType: 'teacher_rini',
    text: "You have earned the admiration of the entire AKL department. Proceed to the courtyard for the grand announcement!",
    choices: [
      {
        text: "I couldn't agree more, Bu Rini. Thank you for your guidance throughout this audit!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Polite, thankful, and professional!"
      },
      {
        text: "I will go when I feel like it.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Disrespectful."
      },
      {
        text: "That's true! Let's celebrate our 25th anniversary together!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Joyful and collegial!"
      }
    ]
  },

  // ==========================================
  // 8. AKL STUDENT CLASSMATE (BUDI)
  // ==========================================
  budi_start: {
    id: 'budi_start',
    speaker: 'Budi',
    speakerRole: 'AKL Student Classmate',
    avatarType: 'boy_student',
    text: "Hey! I am working on the Debate Ledger terminal over there. We are balancing transaction statements against ethical arguments.",
    choices: [
      {
        text: "Your terminal looks stupid and useless.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Insulting a peer's learning workstation."
      },
      {
        text: "From my point of view, balancing ethical debate with financial ledgers is a great way to study.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Encouraging and constructive! 'From my point of view...' shows academic maturity.",
        nextNodeId: 'budi_ch1_ledger'
      },
      {
        text: "I agree with you! Let's examine the ledger statements together.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Cooperative and enthusiastic!",
        nextNodeId: 'budi_ch1_ledger'
      }
    ]
  },
  budi_ch1_ledger: {
    id: 'budi_ch1_ledger',
    speaker: 'Budi',
    speakerRole: 'AKL Student Classmate',
    avatarType: 'boy_student',
    text: "Look at statement #4: 'Allocating funds to polish old heritage trophies is a waste of vocational resources.' How should we respond?",
    choices: [
      {
        text: "I'm afraid I disagree. Preserving our school's historical heritage builds pride and character.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Flawless polite disagreement! 'I'm afraid I disagree...' champions heritage values."
      },
      {
        text: "Yes, destroy all trophies and buy chewing gum instead!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Absurd and childish."
      },
      {
        text: "You're partly right about costs, but heritage inspires future generations.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Thoughtful partial agreement!"
      }
    ]
  },

  budi_ch2: {
    id: 'budi_ch2',
    speaker: 'Budi',
    speakerRole: 'AKL Student Classmate',
    avatarType: 'boy_student',
    text: "Some seniors told me Rafi borrowed the ledger key yesterday evening. Do you think he was trying to delete evidence?",
    choices: [
      {
        text: "I don't think so. Deleting physical ink entries is impossible without leaving obvious marks.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Sound forensic logic! 'I don't think so...' relies on physical reality.",
        nextNodeId: 'budi_ch2_clues'
      },
      {
        text: "Yes, he is a criminal hacker who destroys everything!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Sensationalist paranoia."
      },
      {
        text: "I believe he was verifying the original trophy specifications to engrave matching lettering.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Deep and perceptive deduction!",
        nextNodeId: 'budi_ch2_clues'
      }
    ]
  },
  budi_ch2_clues: {
    id: 'budi_ch2_clues',
    speaker: 'Budi',
    speakerRole: 'AKL Student Classmate',
    avatarType: 'boy_student',
    text: "Wow, look! In the margins of the 1999 trophy entry, someone left a pencil tracing of the anniversary emblem with exact millimetric dimensions!",
    choices: [
      {
        text: "That's true! Only someone preparing a precise custom engraving would measure millimeters so carefully.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent observation! 'That's true!' corroborates technical intent."
      },
      {
        text: "He was just doodling because he was bored.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Superficial interpretation."
      },
      {
        text: "In my opinion, this draft note confirms Rafi's creative dedication.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Generous and accurate!"
      }
    ]
  },

  budi_ch3: {
    id: 'budi_ch3',
    speaker: 'Budi',
    speakerRole: 'AKL Student Classmate',
    avatarType: 'boy_student',
    text: "The final celebration is here! The courtyard stage is packed with people. Do you think our AKL department contributed to solving the mystery?",
    choices: [
      {
        text: "No, AKL did nothing at all.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Unfairly belittling classmates' hard work."
      },
      {
        text: "I couldn't agree more, Budi! Our ledger audits and expense checks provided indispensable proof.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Warm camaraderie! 'I couldn't agree more...' celebrates teamwork.",
        nextNodeId: 'budi_ch3_celebration'
      },
      {
        text: "Only my personal genius solved this case.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Egotistical arrogance."
      }
    ]
  },
  budi_ch3_celebration: {
    id: 'budi_ch3_celebration',
    speaker: 'Budi',
    speakerRole: 'AKL Student Classmate',
    avatarType: 'boy_student',
    text: "Let's head to the courtyard together! The 25th anniversary jubilee is going to be unforgettable!",
    choices: [
      {
        text: "That's true! Let us celebrate our school's 25th Silver Jubilee with pride!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Festive and enthusiastic!"
      },
      {
        text: "Don't walk too close to me.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Mean-spirited."
      },
      {
        text: "In my opinion, teamwork between departments made this victory possible.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Noble tribute to interdisciplinary harmony!"
      }
    ]
  },

  // ==========================================
  // 9. AKL STUDENT TREASURER (TARI)
  // ==========================================
  tari_ch1_start: {
    id: 'tari_ch1_start',
    speaker: 'Tari',
    speakerRole: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    text: "Hello! I am reviewing the budget registry for the 25th anniversary celebration. Some students say celebrating is too expensive!",
    choices: [
      {
        text: "You are wasting school money on trivial decorations!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Harsh criticism hurts team morale. Express opinions constructively."
      },
      {
        text: "From my point of view, honoring 25 years of educational achievement is very worthwhile.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Very constructive! 'From my point of view...' frames your perspective constructively.",
        nextNodeId: 'tari_ch1_budget'
      },
      {
        text: "Accounting is so boring, why do you even study this?",
        isCorrect: false,
        trustChange: -15,
        feedback: "Dismissive and unhelpful."
      }
    ]
  },
  tari_ch1_budget: {
    id: 'tari_ch1_budget',
    speaker: 'Tari',
    speakerRole: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    text: "Thank you for understanding. Our budget includes small stipends for student initiatives. When students propose creative projects, how should treasurers evaluate them?",
    choices: [
      {
        text: "In my opinion, we should balance fiscal responsibility with encouraging student craftsmanship.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Wise financial governance! 'In my opinion...' proposes thoughtful balance."
      },
      {
        text: "Reject every proposal immediately!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Overly bureaucratic."
      },
      {
        text: "I agree with you! Clear receipts and transparent goals build mutual trust.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent agreement!"
      }
    ]
  },

  tari_ch2_start: {
    id: 'tari_ch2_start',
    speaker: 'Tari',
    speakerRole: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    text: "Look at this approved expense invoice from last week: 'Authorized brass restoration paste and golden laurel engraving supplies.'",
    choices: [
      {
        text: "This receipt proves nothing. You forged this document!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Accusing a classmate of forgery without evidence is unacceptable!"
      },
      {
        text: "I agree with you! This invoice indicates an authorized restoration project, not theft!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Spot on! 'I agree with you!' reinforces collaborative analysis.",
        unlockClueId: 'clue_anniversary_draft',
        nextNodeId: 'tari_ch2_receipt'
      },
      {
        text: "Whatever, I am not interested in paper receipts.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Careless attitude toward vital evidence."
      }
    ]
  },
  tari_ch2_receipt: {
    id: 'tari_ch2_receipt',
    speaker: 'Tari',
    speakerRole: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    text: "Rafi even paid half the cost out of his own student savings. Does that sound like a greedy thief to you?",
    choices: [
      {
        text: "I couldn't agree more. Selfless investment demonstrates pure affection for our school.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Empathetic insight! 'I couldn't agree more...' honors Rafi's sacrifice."
      },
      {
        text: "He is just trying to look innocent.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Persistent cynicism."
      },
      {
        text: "From my point of view, his personal donation is conclusive evidence of goodwill.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Analytical and generous!"
      }
    ]
  },

  tari_ch3_start: {
    id: 'tari_ch3_start',
    speaker: 'Tari',
    speakerRole: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    text: "The golden ledger balances perfectly! What do you think about Rafi's dedication?",
    choices: [
      {
        text: "He just wanted all the attention for himself.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Spiteful! Acknowledge genuine student initiative with fairness."
      },
      {
        text: "I couldn't agree more with your admiration. He spent his own savings on the polish.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Terrific! 'I couldn't agree more...' demonstrates wholehearted positive agreement.",
        nextNodeId: 'tari_ch3_triumph'
      },
      {
        text: "Trophies are worthless pieces of metal anyway.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Negative and dismissive."
      }
    ]
  },
  tari_ch3_triumph: {
    id: 'tari_ch3_triumph',
    speaker: 'Tari',
    speakerRole: 'AKL Student Treasurer',
    avatarType: 'girl_student',
    text: "Our financial audit has vindicated him completely. Let's celebrate our school's 25th Silver Jubilee together!",
    choices: [
      {
        text: "That's true! Accurate accounting and polite discourse ensured truth prevailed.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Magnificent tribute to honesty and precision!"
      },
      {
        text: "Whatever, I am leaving now.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Rude departure."
      },
      {
        text: "In my opinion, this was the finest investigation in Muhiba history!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Joyful and triumphant!"
      }
    ]
  },

  // ==========================================
  // 10. OTOMOTIF MECHANIC MASTER (PAK JOKO)
  // ==========================================
  pak_joko_start: {
    id: 'pak_joko_start',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Salam! Welcome to the Otomotif Workshop. We teach automotive diagnostics, motorcycle tuning, and precision metalworking. What brings you to our grease bay?",
    choices: [
      {
        text: "In my opinion, the pedestal velvet fibers and tool marks suggest an automotive craftsman handled the trophy.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Sharp technical observation! 'In my opinion...' connects tool marks to workshop skills.",
        nextNodeId: 'pak_joko_detail'
      },
      {
        text: "I came to check if you stole the trophy to sell for spare parts!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Insulting an experienced vocational teacher."
      },
      {
        text: "I don't like dirty workshops.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Disdainful toward vocational labor."
      }
    ]
  },
  pak_joko_detail: {
    id: 'pak_joko_detail',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Haha! You have a mechanic's eye for mounting hardware. The trophy pedestal had dual M6 hex socket bolts. Those require specialized metric Allen keys from our master tool bench.",
    choices: [
      {
        text: "Exactly! An amateur would have stripped the bolts, but a skilled mechanic unfastened them cleanly.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Exceptional mechanical deduction! 'Exactly!' verifies the non-destructive disassembly.",
        unlockClueId: 'clue_workshop_polish'
      },
      {
        text: "Allen keys are sold at every supermarket.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dismisses the specialized metric gauge."
      },
      {
        text: "I agree with you! Whoever removed the trophy respected the hardware.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Constructive deduction!"
      }
    ]
  },

  pak_joko_ch2: {
    id: 'pak_joko_ch2',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Some folks are pointing fingers at senior Rafi because he spent hours on our ultrasonic buffing wheel. What is your view on his workshop dedication?",
    choices: [
      {
        text: "I believe polishing twenty-five-year-old brass requires patience that only a dedicated student possesses.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Deep vocational appreciation! 'I believe...' honors technical dedication.",
        nextNodeId: 'pak_joko_ch2_restoration'
      },
      {
        text: "He was clearly modifying the trophy to melt into ingots!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Senseless criminal accusation."
      },
      {
        text: "Polishing metal is easy, anyone can do it in two minutes.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Ignorant of fine metal finishing arts."
      }
    ]
  },
  pak_joko_ch2_restoration: {
    id: 'pak_joko_ch2_restoration',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Indeed! Brass and bronze oxidize into green verdigris over time. Rafi came to me last week asking how to restore vintage metal without scratching the original engraved donor names.",
    choices: [
      {
        text: "I couldn't agree more, Pak Joko. That proves his intention was preservation, not vandalism.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Flawless conclusion! 'I couldn't agree more...' establishes undeniable proof of care."
      },
      {
        text: "He could have learned that on YouTube.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Cynical reduction."
      },
      {
        text: "That's true! Consulting a master mechanic demonstrates genuine reverence.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Thoughtful affirmation!"
      }
    ]
  },

  pak_joko_ch3: {
    id: 'pak_joko_ch3',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "Day 3 has arrived! The restored trophy is gleaming brighter than the day it was forged in 1999. Are you ready to present the truth in the courtyard?",
    choices: [
      {
        text: "Yes! In my opinion, our vocational craft skills have brought immense honor to this anniversary.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Uplifting and dignified! 'In my opinion...' celebrates vocational excellence.",
        nextNodeId: 'pak_joko_ch3_pride'
      },
      {
        text: "No, let Rafi get scolded by the principal first.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Spiteful and uncollegial."
      },
      {
        text: "Trophies are just metal, who cares.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Disdainful."
      }
    ]
  },
  pak_joko_ch3_pride: {
    id: 'pak_joko_ch3_pride',
    speaker: 'Pak Joko',
    speakerRole: 'Otomotif Mechanic Master',
    avatarType: 'mechanic_joko',
    text: "That is the true Muhiba spirit! Take this final inspection blessing and lead our school to victory!",
    choices: [
      {
        text: "I couldn't agree more, Pak Joko! Thank you for upholding vocational craftsmanship!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Rousing and respectful send-off!"
      },
      {
        text: "I will take all the praise for myself.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Arrogant."
      },
      {
        text: "That's true! Happy 25th Silver Jubilee to the Otomotif department!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Warm and celebratory!"
      }
    ]
  },

  // ==========================================
  // 11. OTOMOTIF STUDENT (DONI)
  // ==========================================
  doni_ch1: {
    id: 'doni_ch1',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Yo! Welcome to the workshop. I am calibrating 4-stroke valve clearances on our training motorcycle. Hear that engine purr?",
    choices: [
      {
        text: "That engine sounds terrible and broken.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Insulting an apprentice's mechanical calibration."
      },
      {
        text: "That's true! A properly tuned valve produces a smooth, rhythmic engine idle.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Knowledgeable agreement! 'That's true!' validates mechanical skill.",
        nextNodeId: 'doni_ch1_tools'
      },
      {
        text: "Motorcycles are noisy and annoy everyone.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Negative attitude."
      }
    ]
  },
  doni_ch1_tools: {
    id: 'doni_ch1_tools',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Thanks! We also have our 'Engine Talk' tuning bench here. Arranging opinion sentence blocks helps us calibrate the dyno tester.",
    choices: [
      {
        text: "From my point of view, combining English communication with automotive diagnostic testing is ingenious.",
        isCorrect: true,
        trustChange: 15,
        feedback: "High praise for interdisciplinary vocational pedagogy!"
      },
      {
        text: "English has nothing to do with fixing motorbikes.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Short-sighted! International service manuals require English."
      },
      {
        text: "I agree with you! Clear communication avoids garage accidents.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Safety-first mindset!"
      }
    ]
  },

  doni_start: {
    id: 'doni_start',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Hey, check out this buffing compound on the bench: 'Golden Metallic Mirror Glaze'. Senior Rafi was polishing something with it until late last night.",
    choices: [
      {
        text: "In my opinion, that mirror glaze was used to remove twenty-five years of tarnish from the anniversary trophy.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Astute physical deduction! 'In my opinion...' connects compound to trophy.",
        unlockClueId: 'clue_workshop_polish',
        nextNodeId: 'doni_ch2_buffing'
      },
      {
        text: "He was probably polishing his motorcycle helmet.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Helmets are plastic, this compound is specifically for brass!"
      },
      {
        text: "Don't touch that, you will get your hands dirty.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Squeamish."
      }
    ]
  },
  doni_ch2_buffing: {
    id: 'doni_ch2_buffing',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "Exactly! And see the cotton fibers caught in the buffing disc? They match the blue microfiber velvet from the courtyard pedestal!",
    choices: [
      {
        text: "I couldn't agree more! That matching fiber establishes an unbreakable physical link between the pedestal and this bench.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Scientific confirmation! 'I couldn't agree more...' cements the evidence."
      },
      {
        text: "All microfiber cloths look the same to me.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Ignores specific dye and weave analysis."
      },
      {
        text: "That's true! The mystery is unravelling cleanly.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Positive affirmation!"
      }
    ]
  },

  doni_ch3: {
    id: 'doni_ch3',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "The whole student council is assembling for the final debate. Will you stand up for our automotive craftsman Rafi?",
    choices: [
      {
        text: "I believe standing up for an honest friend who was falsely accused is our highest duty.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Courageous peer solidarity! 'I believe...' champions loyalty and truth.",
        nextNodeId: 'doni_ch3_applause'
      },
      {
        text: "I will only help if you pay me twenty thousand rupiah.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Greedy and corrupt."
      },
      {
        text: "Let Rafi defend himself, it's not my problem.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Selfish abandonment."
      }
    ]
  },
  doni_ch3_applause: {
    id: 'doni_ch3_applause',
    speaker: 'Doni',
    speakerRole: 'Otomotif Student',
    avatarType: 'student_doni',
    text: "You are a real comrade! Let's roar our motorcycle engines to herald the 25th anniversary celebration!",
    choices: [
      {
        text: "I couldn't agree more, Doni! Let's celebrate our school with pride!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Spirited and jubilant!"
      },
      {
        text: "Engines are too loud, keep quiet.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Party pooper."
      },
      {
        text: "That's true! Full throttle for SMK Muhammadiyah Bawang!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Great energy!"
      }
    ]
  },

  // ==========================================
  // 12. OTOMOTIF APPRENTICE (HENDRA)
  // ==========================================
  hendra_ch1_start: {
    id: 'hendra_ch1_start',
    speaker: 'Hendra',
    speakerRole: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    text: "Hey there! We are tuning up motorcycle carburetors and engine valves today. Precision is everything in vocational mechanics.",
    choices: [
      {
        text: "Mechanics is just hitting bolts with a hammer, anyone can do that!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Disparaging skilled vocational craftsmanship causes resentment."
      },
      {
        text: "That's true! Accurate tuning ensures high performance and rider safety.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent! 'That's true!' signals prompt, knowledgeable agreement.",
        nextNodeId: 'hendra_ch1_tuning'
      },
      {
        text: "Your workshop is filthy and smells like motor oil.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Rude personal remark. Focus on constructive dialogue."
      }
    ]
  },
  hendra_ch1_tuning: {
    id: 'hendra_ch1_tuning',
    speaker: 'Hendra',
    speakerRole: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    text: "When we calibrate valve gap to 0.08mm, there is no room for guesswork. How do you apply that same precision to mystery solving?",
    choices: [
      {
        text: "In my opinion, we must verify each piece of physical evidence with exact facts rather than rumors.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Outstanding application of vocational precision to critical thinking!"
      },
      {
        text: "Guessing is much faster and requires no thinking.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Lazy and dangerous."
      },
      {
        text: "I agree with you! Precision in communication builds mutual trust.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent agreement!"
      }
    ]
  },

  hendra_ch2_start: {
    id: 'hendra_ch2_start',
    speaker: 'Hendra',
    speakerRole: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    text: "Someone was using our ultrasonic buffing wheel after workshop hours yesterday. It was covered in golden dust!",
    choices: [
      {
        text: "Whoever did that was clearly vandalizing the school tools!",
        isCorrect: false,
        trustChange: -10,
        feedback: "Hasty generalization. Inquire first into what was being polished."
      },
      {
        text: "In my opinion, that golden dust strongly matches the brass patina of the anniversary trophy!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Astute deduction! 'In my opinion...' connects facts logically.",
        unlockClueId: 'clue_workshop_polish',
        nextNodeId: 'hendra_ch2_evidence'
      },
      {
        text: "I don't care what machines you use.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Apathy stops the investigation from progressing."
      }
    ]
  },
  hendra_ch2_evidence: {
    id: 'hendra_ch2_evidence',
    speaker: 'Hendra',
    speakerRole: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    text: "I analyzed a fleck under our magnifier: it has high-purity gold leaf plating over heavy bronze alloy. Definitely an heirloom trophy!",
    choices: [
      {
        text: "Exactly! That metallurgical composition matches the 1999 Golden Jubilee trophy specifications.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Technical verification! 'Exactly!' confirms metallurgical data."
      },
      {
        text: "Gold leaf is fake plastic paint.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Incorrect."
      },
      {
        text: "From my point of view, this proves the trophy was undergoing restoration right here.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Clear and logical!"
      }
    ]
  },

  hendra_ch3_start: {
    id: 'hendra_ch3_start',
    speaker: 'Hendra',
    speakerRole: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    text: "Rafi worked until midnight restoring the vintage trophy handles. His polishing technique was flawless!",
    choices: [
      {
        text: "Working late is silly, he should have stayed home playing games.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Discourages hard work and vocational dedication."
      },
      {
        text: "I believe his dedication is an inspiration to all vocational students.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Inspiring! 'I believe...' expresses positive appreciation with dignity.",
        nextNodeId: 'hendra_ch3_finale'
      },
      {
        text: "I think he did a terrible job and made it look cheap.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Unfounded malice undermines trust."
      }
    ]
  },
  hendra_ch3_finale: {
    id: 'hendra_ch3_finale',
    speaker: 'Hendra',
    speakerRole: 'Otomotif Apprentice',
    avatarType: 'student_hendra',
    text: "The final showcase is about to start. Go out there and make our school proud!",
    choices: [
      {
        text: "I couldn't agree more, Hendra! Let's celebrate our 25th Silver Jubilee together!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Enthusiastic and celebratory!"
      },
      {
        text: "I will make myself proud, not the school.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Self-centered."
      },
      {
        text: "That's true! Vocational pride will shine on the stage today!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Inspiring!"
      }
    ]
  },

  // ==========================================
  // 13. TJKT NETWORK TEACHER (BU NINA)
  // ==========================================
  bu_nina_start: {
    id: 'bu_nina_start',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Welcome to the TJKT Computer Network Lab. Here we manage campus fiber backbones, Wi-Fi 6 routers, and security telemetry. What technical question do you have?",
    choices: [
      {
        text: "Computers are dumb and networks are boring.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Rude and anti-intellectual."
      },
      {
        text: "In my opinion, examining digital access logs can reveal the precise timeline of when the trophy was moved.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Excellent technical methodology! 'In my opinion...' proposes digital forensics.",
        nextNodeId: 'bu_nina_detail'
      },
      {
        text: "Can I play video games on your server?",
        isCorrect: false,
        trustChange: -15,
        feedback: "Inappropriate in an academic lab."
      }
    ]
  },
  bu_nina_detail: {
    id: 'bu_nina_detail',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Well said! Notice our CCTV camera looking toward the courtyard. Yesterday at 5:00 PM, the stream went into offline maintenance. What is your hypothesis?",
    choices: [
      {
        text: "A shadowy hacker bypassed your firewall to steal the trophy!",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dramatic Hollywood fantasy."
      },
      {
        text: "I see your point about the timing, but scheduled firmware maintenance happens automatically every Wednesday.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Knowledgeable and objective! 'I see your point, but...' references factual server schedules.",
        unlockClueId: 'clue_server_backup'
      },
      {
        text: "I don't think so. The power plug was probably just kicked loose.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Careless assumption."
      }
    ]
  },

  bu_nina_ch2: {
    id: 'bu_nina_ch2',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "We pulled the server timestamp logs. The CCTV camera was taken offline under the maintenance login 'ADMIN_ANNIVERSARY_SECRET'. What does that reveal?",
    choices: [
      {
        text: "I believe the principal intentionally shielded the courtyard camera so the surprise restoration remained a secret!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Astounding analytical breakthrough! 'I believe...' decodes the administrative secret.",
        nextNodeId: 'bu_nina_ch2_logs'
      },
      {
        text: "It means a rogue student cracked the root password!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Our network security is far stronger than that!"
      },
      {
        text: "I don't care about server logins.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Indifferent."
      }
    ]
  },
  bu_nina_ch2_logs: {
    id: 'bu_nina_ch2_logs',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Spot on! That credential belongs solely to Pak Haryono. The principal himself authorized the camera shutdown to preserve the anniversary surprise!",
    choices: [
      {
        text: "Exactly! Objective server telemetry dispels all wrongful suspicions.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Decisive proof! 'Exactly!' celebrates empirical truth."
      },
      {
        text: "The principal shouldn't use computers.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Disrespectful."
      },
      {
        text: "I couldn't agree more, Bu Nina. The network never lies!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Warm technical praise!"
      }
    ]
  },

  bu_nina_ch3: {
    id: 'bu_nina_ch3',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "The courtyard live stream broadcast is operational! Our fiber connection is transmitting the 25th anniversary to alumni worldwide. Are you ready for the reveal?",
    choices: [
      {
        text: "Yes! In my opinion, broadcasting our truth and student unity will inspire alumni across the globe.",
        isCorrect: true,
        trustChange: 20,
        feedback: "Visionary! 'In my opinion...' highlights global educational impact.",
        nextNodeId: 'bu_nina_ch3_network'
      },
      {
        text: "Turn off the stream, nobody is watching.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Pessimistic and false."
      },
      {
        text: "I am only interested in being on camera myself.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Egotistical."
      }
    ]
  },
  bu_nina_ch3_network: {
    id: 'bu_nina_ch3_network',
    speaker: 'Bu Nina',
    speakerRole: 'TJKT Network Teacher',
    avatarType: 'teacher_nina',
    text: "Our TJKT department salutes your brilliant analytical mind. Take your place at the podium!",
    choices: [
      {
        text: "I couldn't agree more, Bu Nina. Thank you for your technical mentorship!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Gracious, grateful, and dignified!"
      },
      {
        text: "I knew I was smarter than everyone here.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Conceited."
      },
      {
        text: "That's true! Long live SMK Muhammadiyah Bawang!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Triumphant school cheer!"
      }
    ]
  },

  // ==========================================
  // 14. TJKT SYSTEMS STUDENT (MAYA)
  // ==========================================
  maya_ch1: {
    id: 'maya_ch1',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "Hey! I am patching CAT6 Ethernet cables to our switch panel over here. Connecting statements to appropriate polite responses routes data smoothly.",
    choices: [
      {
        text: "Cables are ugly and messy.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Insulting an apprentice's infrastructure work."
      },
      {
        text: "I agree with you! Clear patch mapping prevents network collisions, just as polite words prevent misunderstandings.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Brilliant metaphor! 'I agree with you!' links technical cabling to conversational courtesy.",
        nextNodeId: 'maya_ch1_cables'
      },
      {
        text: "Why don't you use Wi-Fi for everything?",
        isCorrect: false,
        trustChange: -10,
        feedback: "Industrial servers require hardwired fiber and copper reliability."
      }
    ]
  },
  maya_ch1_cables: {
    id: 'maya_ch1_cables',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "Exactly! You should try our 'Network Connect' terminal. When you bridge arguments respectfully, the green link lights illuminate!",
    choices: [
      {
        text: "From my point of view, hands-on simulations make learning English communication exciting and intuitive.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Positive educational endorsement! 'From my point of view...' values interactive practice."
      },
      {
        text: "I already know everything about English.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Complacent boast."
      },
      {
        text: "That's true! Let's test the patch panel connections now.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Enthusiastic and cooperative!"
      }
    ]
  },

  maya_start: {
    id: 'maya_start',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "Look at the router traffic from yesterday evening. The Otomotif workshop Wi-Fi access point had steady activity between 8 PM and 11 PM.",
    choices: [
      {
        text: "Rafi was definitely streaming pirated movies!",
        isCorrect: false,
        trustChange: -10,
        feedback: "Baseless speculation."
      },
      {
        text: "In my opinion, he was referencing CAD design files to engrave the anniversary laurel wreath on the trophy.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Insightful technical deduction! 'In my opinion...' explains the data traffic logically.",
        unlockClueId: 'clue_server_backup',
        nextNodeId: 'maya_ch2_analysis'
      },
      {
        text: "I don't understand Wi-Fi traffic graphs.",
        isCorrect: false,
        trustChange: -5,
        feedback: "Defeated attitude."
      }
    ]
  },
  maya_ch2_analysis: {
    id: 'maya_ch2_analysis',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "You nailed it! The packets were pulling high-resolution vector sketches of the school crest from our central archive.",
    choices: [
      {
        text: "Exactly! A thief would never download official school vector crests to steal an object.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Logical precision! 'Exactly!' cements the proof."
      },
      {
        text: "Maybe he wanted to print a fake certificate.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Unfounded cynicism."
      },
      {
        text: "That's true! The evidence points overwhelmingly to respectful craftsmanship.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Sound and equitable!"
      }
    ]
  },

  maya_ch3: {
    id: 'maya_ch3',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "The courtyard live broadcast is about to go live! What is your final thought on how our vocational departments worked together?",
    choices: [
      {
        text: "In my opinion, combining accounting audits, automotive mechanics, and network telemetry proved that teamwork solves any mystery!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Magnificent interdisciplinary synthesis! 'In my opinion...' celebrates school unity.",
        nextNodeId: 'maya_ch3_success'
      },
      {
        text: "Every department was fighting each other, it was a mess.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Focuses on petty conflicts rather than triumph."
      },
      {
        text: "I solved it completely alone without anyone's help.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Selfish and untrue."
      }
    ]
  },
  maya_ch3_success: {
    id: 'maya_ch3_success',
    speaker: 'Maya',
    speakerRole: 'TJKT Systems Student',
    avatarType: 'girl_student',
    text: "All systems green! The livestream audio is crystal clear. Go out there and shine!",
    choices: [
      {
        text: "I couldn't agree more, Maya! Thank you for all your network expertise!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Warm and appreciative peer support!"
      },
      {
        text: "I hope the stream crashes.",
        isCorrect: false,
        trustChange: -25,
        feedback: "Spiteful sabotage mentality."
      },
      {
        text: "That's true! Happy 25th Silver Jubilee to the TJKT department!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Festive and enthusiastic!"
      }
    ]
  },

  // ==========================================
  // 15. TJKT NETWORK MONITOR (RIO)
  // ==========================================
  rio_ch1_start: {
    id: 'rio_ch1_start',
    speaker: 'Rio',
    speakerRole: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    text: "Welcome to our server room. We monitor router latency, network switches, and CCTV feeds across the entire Muhiba campus.",
    choices: [
      {
        text: "Computers are useless and modern technology is a waste of time.",
        isCorrect: false,
        trustChange: -20,
        feedback: "Bizarre and uncooperative comment in a vocational lab!"
      },
      {
        text: "As far as I am concerned, digital monitoring helps keep our whole campus safe.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Very professional! 'As far as I am concerned...' indicates a thoughtful opinion.",
        nextNodeId: 'rio_ch1_monitoring'
      },
      {
        text: "You must be secretly spying on students! That is unacceptable!",
        isCorrect: false,
        trustChange: -15,
        feedback: "Hostile paranoia damages rapport with network staff."
      }
    ]
  },
  rio_ch1_monitoring: {
    id: 'rio_ch1_monitoring',
    speaker: 'Rio',
    speakerRole: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    text: "Our monitoring is strictly for student safety and hardware uptime. When you hear about technical anomalies, what is your first protocol?",
    choices: [
      {
        text: "In my opinion, we should cross-reference system timestamps with physical logs before drawing conclusions.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Methodical and disciplined! 'In my opinion...' demonstrates engineering mindset."
      },
      {
        text: "Blame whoever looks suspicious without checking logs.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Unprofessional and biased."
      },
      {
        text: "I agree with you! Verifying data first prevents panic and rumors.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Prudent and sound!"
      }
    ]
  },

  rio_ch2_start: {
    id: 'rio_ch2_start',
    speaker: 'Rio',
    speakerRole: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    text: "Some people argued that the CCTV was cut by a thief at 5:00 PM yesterday. But our switch telemetry shows a routine scheduled backup!",
    choices: [
      {
        text: "Exactly! The system log proves the camera offline status was routine maintenance, not a crime!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Brilliant! 'Exactly!' emphatically affirms validated empirical evidence.",
        unlockClueId: 'clue_server_backup',
        nextNodeId: 'rio_ch2_timestamps'
      },
      {
        text: "Your server log is fake! You hacked it to cover for the thief!",
        isCorrect: false,
        trustChange: -20,
        feedback: "Baseless accusation! Always respect factual data over rumors."
      },
      {
        text: "Logs are just random numbers, nobody understands them.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Dismissing objective data hampers critical problem-solving."
      }
    ]
  },
  rio_ch2_timestamps: {
    id: 'rio_ch2_timestamps',
    speaker: 'Rio',
    speakerRole: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    text: "Look at the automated ping response at 5:02 PM: 'MAINTENANCE_BACKUP_ACKNOWLEDGED'. The camera rebooted smoothly after 15 minutes as scheduled.",
    choices: [
      {
        text: "That's true! The ping response demonstrates normal administrative reboot, completely ruling out sabotage.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Rock solid verification! 'That's true!' validates network integrity."
      },
      {
        text: "Ping means a ping pong ball hit the camera.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Silly joke during serious evidence analysis."
      },
      {
        text: "From my point of view, this corroborates the principal's confidential authorization.",
        isCorrect: true,
        trustChange: 15,
        feedback: "Insightful connection!"
      }
    ]
  },

  rio_ch3_start: {
    id: 'rio_ch3_start',
    speaker: 'Rio',
    speakerRole: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    text: "We have connected the live stream camera for the 25th anniversary celebration in the courtyard. Ready to see the big reveal?",
    choices: [
      {
        text: "No, I am too angry and do not want to see anyone celebrating.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Bitterness prevents sharing joy with the school community."
      },
      {
        text: "I couldn't agree more, let's join the courtyard ceremony together!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Enthusiastic and respectful! Ready for the grand finale!",
        nextNodeId: 'rio_ch3_broadcast'
      },
      {
        text: "Live streams always fail, this will be an embarrassing disaster.",
        isCorrect: false,
        trustChange: -15,
        feedback: "Pessimistic cynicism hurts student morale."
      }
    ]
  },
  rio_ch3_broadcast: {
    id: 'rio_ch3_broadcast',
    speaker: 'Rio',
    speakerRole: 'TJKT Network Monitor',
    avatarType: 'boy_student',
    text: "Over a thousand alumni are tuned into the channel right now. You are about to become a school legend!",
    choices: [
      {
        text: "In my opinion, the true legend is SMK Muhammadiyah Bawang's dedication to truth and vocational skill!",
        isCorrect: true,
        trustChange: 20,
        feedback: "Humble, inspiring, and noble tribute!"
      },
      {
        text: "Make sure you tag my personal gaming channel on the stream.",
        isCorrect: false,
        trustChange: -10,
        feedback: "Inappropriate self-promotion."
      },
      {
        text: "That's true! Let's celebrate our 25th Silver Jubilee anniversary with triumph!",
        isCorrect: true,
        trustChange: 15,
        feedback: "Glorious celebratory spirit!"
      }
    ]
  }
};

// Check and balance choice indices across all nodes
let countA = 0, countB = 0, countC = 0;
for (const [id, node] of Object.entries(DIALOGUE_NODES)) {
  const correctIdx = node.choices.findIndex(c => c.isCorrect);
  if (correctIdx === 0) countA++;
  else if (correctIdx === 1) countB++;
  else if (correctIdx === 2) countC++;
}

console.log('Dialogue node counts before balance:', { countA, countB, countC, total: Object.keys(DIALOGUE_NODES).length });

// Ensure balanced distribution (approximately 1/3 each)
let toMoveToC = 0;
for (const [id, node] of Object.entries(DIALOGUE_NODES)) {
  if (node.choices.length === 3) {
    const c = node.choices.findIndex(x => x.isCorrect);
    if ((c === 0 || c === 1) && toMoveToC < 14) {
      const correctChoice = node.choices[c];
      const others = node.choices.filter((_, i) => i !== c);
      node.choices = [others[0], others[1], correctChoice];
      toMoveToC++;
    }
  }
}

countA = 0; countB = 0; countC = 0;
for (const [id, node] of Object.entries(DIALOGUE_NODES)) {
  const correctIdx = node.choices.findIndex(c => c.isCorrect);
  if (correctIdx === 0) countA++;
  else if (correctIdx === 1) countB++;
  else if (correctIdx === 2) countC++;
}

console.log('Dialogue node counts after balance:', { countA, countB, countC, total: Object.keys(DIALOGUE_NODES).length });

const out = `import { DialogueNode, NPCData } from '../types/game';

export const NPCS: NPCData[] = ${JSON.stringify(NPCS, null, 2)};

export const DIALOGUE_NODES: Record<string, DialogueNode> = ${JSON.stringify(DIALOGUE_NODES, null, 2)};
`;

fs.writeFileSync('src/data/story.ts', out, 'utf8');
console.log('Successfully written complete branching story.ts!');
