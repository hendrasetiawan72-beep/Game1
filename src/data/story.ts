import { DialogueNode, NPCData } from '../types/game';

export const NPCS: NPCData[] = [
  {
    "id": "principal",
    "name": "Pak Haryono",
    "role": "School Principal",
    "avatarType": "principal",
    "zone": "courtyard",
    "x": 520,
    "y": 280,
    "initialDialogueNodeId": "principal_ch1_start",
    "chapterDialogueNodes": {
      "1": "principal_ch1_start",
      "2": "principal_ch2_start",
      "3": "principal_ch3_debate"
    }
  },
  {
    "id": "security",
    "name": "Pak Slamet",
    "role": "Head Security Guard",
    "avatarType": "security",
    "zone": "courtyard",
    "x": 250,
    "y": 530,
    "initialDialogueNodeId": "security_ch1_start",
    "chapterDialogueNodes": {
      "1": "security_ch1_start",
      "2": "security_ch2_start",
      "3": "security_ch3_start"
    }
  },
  {
    "id": "canteen",
    "name": "Ibu Siti",
    "role": "Canteen Owner",
    "avatarType": "canteen",
    "zone": "courtyard",
    "x": 760,
    "y": 410,
    "initialDialogueNodeId": "canteen_ch1_start",
    "chapterDialogueNodes": {
      "1": "canteen_ch1_start",
      "2": "canteen_ch2_start",
      "3": "canteen_ch3_start"
    }
  },
  {
    "id": "fajar",
    "name": "Fajar",
    "role": "Student Council President",
    "avatarType": "boy_student",
    "zone": "courtyard",
    "x": 420,
    "y": 440,
    "initialDialogueNodeId": "fajar_ch1_start",
    "chapterDialogueNodes": {
      "1": "fajar_ch1_start",
      "2": "fajar_ch2_start",
      "3": "fajar_ch3_start"
    }
  },
  {
    "id": "senior_rafi",
    "name": "Senior Rafi",
    "role": "Senior Class President & Craftsman",
    "avatarType": "senior_rafi",
    "zone": "courtyard",
    "x": 620,
    "y": 440,
    "initialDialogueNodeId": "rafi_ch1_preview",
    "chapterDialogueNodes": {
      "1": "rafi_ch1_preview",
      "2": "rafi_ch2_secret",
      "3": "rafi_ch3_climax"
    }
  },
  {
    "id": "syamsul",
    "name": "Pak Syamsul",
    "role": "Musholla Caretaker & Teacher",
    "avatarType": "teacher_syamsul",
    "zone": "courtyard",
    "x": 285,
    "y": 160,
    "initialDialogueNodeId": "syamsul_ch1_start",
    "chapterDialogueNodes": {
      "1": "syamsul_ch1_start",
      "2": "syamsul_ch2_start",
      "3": "syamsul_ch3_start"
    }
  },
  {
    "id": "tari",
    "name": "Tari",
    "role": "AKL Student Treasurer",
    "avatarType": "girl_student",
    "zone": "akl",
    "x": 220,
    "y": 360,
    "initialDialogueNodeId": "tari_ch1_start",
    "chapterDialogueNodes": {
      "1": "tari_ch1_start",
      "2": "tari_ch2_start",
      "3": "tari_ch3_start"
    }
  },
  {
    "id": "hendra",
    "name": "Hendra",
    "role": "Otomotif Apprentice",
    "avatarType": "student_hendra",
    "zone": "otomotif",
    "x": 480,
    "y": 380,
    "initialDialogueNodeId": "hendra_ch1_start",
    "chapterDialogueNodes": {
      "1": "hendra_ch1_start",
      "2": "hendra_ch2_start",
      "3": "hendra_ch3_start"
    }
  },
  {
    "id": "rio",
    "name": "Rio",
    "role": "TJKT Network Monitor",
    "avatarType": "boy_student",
    "zone": "tjkt",
    "x": 280,
    "y": 380,
    "initialDialogueNodeId": "rio_ch1_start",
    "chapterDialogueNodes": {
      "1": "rio_ch1_start",
      "2": "rio_ch2_start",
      "3": "rio_ch3_start"
    }
  },
  {
    "id": "bu_rini",
    "name": "Bu Rini",
    "role": "AKL Accounting Teacher",
    "avatarType": "teacher_rini",
    "zone": "akl",
    "x": 460,
    "y": 240,
    "initialDialogueNodeId": "bu_rini_start",
    "chapterDialogueNodes": {
      "1": "bu_rini_start",
      "2": "bu_rini_ch2",
      "3": "bu_rini_ch3"
    }
  },
  {
    "id": "budi",
    "name": "Budi",
    "role": "AKL Student Classmate",
    "avatarType": "boy_student",
    "zone": "akl",
    "x": 580,
    "y": 360,
    "initialDialogueNodeId": "budi_start",
    "chapterDialogueNodes": {
      "1": "budi_start",
      "2": "budi_ch2",
      "3": "budi_ch3"
    },
    "minigameTrigger": "akl"
  },
  {
    "id": "pak_joko",
    "name": "Pak Joko",
    "role": "Otomotif Mechanic Master",
    "avatarType": "mechanic_joko",
    "zone": "otomotif",
    "x": 400,
    "y": 230,
    "initialDialogueNodeId": "pak_joko_start",
    "chapterDialogueNodes": {
      "1": "pak_joko_start",
      "2": "pak_joko_ch2",
      "3": "pak_joko_ch3"
    }
  },
  {
    "id": "doni",
    "name": "Doni",
    "role": "Otomotif Student",
    "avatarType": "student_doni",
    "zone": "otomotif",
    "x": 620,
    "y": 380,
    "initialDialogueNodeId": "doni_ch1",
    "chapterDialogueNodes": {
      "1": "doni_ch1",
      "2": "doni_start",
      "3": "doni_ch3"
    },
    "minigameTrigger": "otomotif"
  },
  {
    "id": "bu_nina",
    "name": "Bu Nina",
    "role": "TJKT Network Teacher",
    "avatarType": "teacher_nina",
    "zone": "tjkt",
    "x": 400,
    "y": 210,
    "initialDialogueNodeId": "bu_nina_start",
    "chapterDialogueNodes": {
      "1": "bu_nina_start",
      "2": "bu_nina_ch2",
      "3": "bu_nina_ch3"
    }
  },
  {
    "id": "maya",
    "name": "Maya",
    "role": "TJKT Systems Student",
    "avatarType": "girl_student",
    "zone": "tjkt",
    "x": 600,
    "y": 360,
    "initialDialogueNodeId": "maya_ch1",
    "chapterDialogueNodes": {
      "1": "maya_ch1",
      "2": "maya_start",
      "3": "maya_ch3"
    },
    "minigameTrigger": "tjkt"
  }
];

export const DIALOGUE_NODES: Record<string, DialogueNode> = {
  "syamsul_ch1_start": {
    "id": "syamsul_ch1_start",
    "speaker": "Pak Syamsul",
    "speakerRole": "Musholla Caretaker & Teacher",
    "avatarType": "teacher_syamsul",
    "text": "Peace be upon you, young investigator. In difficult times, remember that expressing calm opinions and seeking truthful proof prevents unnecessary accusations.",
    "choices": [
      {
        "text": "Calmness is useless! I want to accuse everyone until someone admits they stole it!",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Rude and aggressive! Groundless accusations destroy school unity."
      },
      {
        "text": "You are completely wasting my time, old teacher!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Extremely disrespectful! Show courtesy to school elders."
      },
      {
        "text": "I believe we must always investigate with calm respect and honest proof, Pak Syamsul.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Excellent! 'I believe...' is an earnest way to state your principles."
      }
    ]
  },
  "syamsul_ch2_start": {
    "id": "syamsul_ch2_start",
    "speaker": "Pak Syamsul",
    "speakerRole": "Musholla Caretaker & Teacher",
    "avatarType": "teacher_syamsul",
    "text": "Yesterday before Maghrib prayer, I noticed a senior student carrying a cushioned box toward the automotive workshop with great care and reverence.",
    "choices": [
      {
        "text": "That proves he is guilty! Let's report him immediately!",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Jumping to conclusions without listening to his side leads to injustice."
      },
      {
        "text": "I don't believe you saw anything at all.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Blunt and cynical. Politely state your view instead of dismissing others."
      },
      {
        "text": "I see your point, but we should verify why he took it there before judging him.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Skillful! 'I see your point, but...' gently offers a balanced counter-view.",
        "unlockClueId": "clue_workshop_polish"
      }
    ]
  },
  "syamsul_ch3_start": {
    "id": "syamsul_ch3_start",
    "speaker": "Pak Syamsul",
    "speakerRole": "Musholla Caretaker & Teacher",
    "avatarType": "teacher_syamsul",
    "text": "The anniversary stage is ready. Do you now realize the true lesson behind the missing trophy?",
    "choices": [
      {
        "text": "There was no lesson, just a waste of three days!",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Cynical! Every investigation teaches us patience and understanding."
      },
      {
        "text": "Only winners deserve trophies, so who cares about lessons?",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Inconsiderate response."
      },
      {
        "text": "In my opinion, respectful communication and polite disagreement build true harmony.",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Profound! 'In my opinion...' introduces your reflective viewpoint with grace."
      }
    ]
  },
  "tari_ch1_start": {
    "id": "tari_ch1_start",
    "speaker": "Tari",
    "speakerRole": "AKL Student Treasurer",
    "avatarType": "girl_student",
    "text": "Hello! I am reviewing the budget registry for the 25th anniversary celebration. Some students say celebrating is too expensive!",
    "choices": [
      {
        "text": "You are wasting school money on trivial decorations!",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Harsh criticism hurts team morale. Express opinions constructively."
      },
      {
        "text": "Accounting is so boring, why do you even study this?",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Dismissive and unhelpful."
      },
      {
        "text": "From my point of view, honoring 25 years of educational achievement is very worthwhile.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Very constructive! 'From my point of view...' frames your perspective constructively."
      }
    ]
  },
  "tari_ch2_start": {
    "id": "tari_ch2_start",
    "speaker": "Tari",
    "speakerRole": "AKL Student Treasurer",
    "avatarType": "girl_student",
    "text": "Look at this approved expense invoice from last week: 'Authorized brass restoration paste and golden laurel engraving supplies.'",
    "choices": [
      {
        "text": "This receipt proves nothing. You forged this document!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Accusing a classmate of forgery without evidence is unacceptable!"
      },
      {
        "text": "Whatever, I am not interested in paper receipts.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Careless attitude toward vital evidence."
      },
      {
        "text": "I agree with you! This invoice indicates an authorized restoration project, not theft!",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Spot on! 'I agree with you!' reinforces collaborative analysis.",
        "unlockClueId": "clue_anniversary_draft"
      }
    ]
  },
  "tari_ch3_start": {
    "id": "tari_ch3_start",
    "speaker": "Tari",
    "speakerRole": "AKL Student Treasurer",
    "avatarType": "girl_student",
    "text": "The golden ledger balances perfectly! What do you think about Rafi's dedication?",
    "choices": [
      {
        "text": "He just wanted all the attention for himself.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Spiteful! Acknowledge genuine student initiative with fairness."
      },
      {
        "text": "Trophies are worthless pieces of metal anyway.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Negative and dismissive."
      },
      {
        "text": "I couldn't agree more with your admiration. He spent his own savings on the polish.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Terrific! 'I couldn't agree more...' demonstrates wholehearted positive agreement."
      }
    ]
  },
  "hendra_ch1_start": {
    "id": "hendra_ch1_start",
    "speaker": "Hendra",
    "speakerRole": "Otomotif Apprentice",
    "avatarType": "student_hendra",
    "text": "Hey there! We are tuning up motorcycle carburetors and engine valves today. Precision is everything in vocational mechanics.",
    "choices": [
      {
        "text": "Mechanics is just hitting bolts with a hammer, anyone can do that!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Disparaging skilled vocational craftsmanship causes resentment."
      },
      {
        "text": "Your workshop is filthy and smells like motor oil.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Rude personal remark. Focus on constructive dialogue."
      },
      {
        "text": "That's true! Accurate tuning ensures high performance and rider safety.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Excellent! 'That's true!' signals prompt, knowledgeable agreement."
      }
    ]
  },
  "hendra_ch2_start": {
    "id": "hendra_ch2_start",
    "speaker": "Hendra",
    "speakerRole": "Otomotif Apprentice",
    "avatarType": "student_hendra",
    "text": "Someone was using our ultrasonic buffing wheel after workshop hours yesterday. It was covered in golden dust!",
    "choices": [
      {
        "text": "Whoever did that was clearly vandalizing the school tools!",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Hasty generalization. Inquire first into what was being polished."
      },
      {
        "text": "I don't care what machines you use.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Apathy stops the investigation from progressing."
      },
      {
        "text": "In my opinion, that golden dust strongly matches the brass patina of the anniversary trophy!",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Astute deduction! 'In my opinion...' connects facts logically.",
        "unlockClueId": "clue_workshop_polish"
      }
    ]
  },
  "hendra_ch3_start": {
    "id": "hendra_ch3_start",
    "speaker": "Hendra",
    "speakerRole": "Otomotif Apprentice",
    "avatarType": "student_hendra",
    "text": "Rafi worked until midnight restoring the vintage trophy handles. His polishing technique was flawless!",
    "choices": [
      {
        "text": "Working late is silly, he should have stayed home playing games.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Discourages hard work and vocational dedication."
      },
      {
        "text": "I think he did a terrible job and made it look cheap.",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Unfounded malice undermines trust."
      },
      {
        "text": "I believe his dedication is an inspiration to all vocational students.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Inspiring! 'I believe...' expresses positive appreciation with dignity."
      }
    ]
  },
  "rio_ch1_start": {
    "id": "rio_ch1_start",
    "speaker": "Rio",
    "speakerRole": "TJKT Network Monitor",
    "avatarType": "boy_student",
    "text": "Welcome to our server room. We monitor router latency, network switches, and CCTV feeds across the entire Muhiba campus.",
    "choices": [
      {
        "text": "Computers are useless and modern technology is a waste of time.",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Bizarre and uncooperative comment in a vocational lab!"
      },
      {
        "text": "You must be secretly spying on students! That is unacceptable!",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Hostile paranoia damages rapport with network staff."
      },
      {
        "text": "As far as I am concerned, digital monitoring helps keep our whole campus safe.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Very professional! 'As far as I am concerned...' indicates a thoughtful opinion."
      }
    ]
  },
  "rio_ch2_start": {
    "id": "rio_ch2_start",
    "speaker": "Rio",
    "speakerRole": "TJKT Network Monitor",
    "avatarType": "boy_student",
    "text": "Some people argued that the CCTV was cut by a thief at 5:00 PM yesterday. But our switch telemetry shows a routine scheduled backup!",
    "choices": [
      {
        "text": "Your server log is fake! You hacked it to cover for the thief!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Baseless accusation! Always respect factual data over rumors."
      },
      {
        "text": "Logs are just random numbers, nobody understands them.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Dismissing objective data hampers critical problem-solving."
      },
      {
        "text": "Exactly! The system log proves the camera offline status was routine maintenance, not a crime!",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Brilliant! 'Exactly!' emphatically affirms validated empirical evidence.",
        "unlockClueId": "clue_server_backup"
      }
    ]
  },
  "rio_ch3_start": {
    "id": "rio_ch3_start",
    "speaker": "Rio",
    "speakerRole": "TJKT Network Monitor",
    "avatarType": "boy_student",
    "text": "We have connected the live stream camera for the 25th anniversary celebration in the courtyard. Ready to see the big reveal?",
    "choices": [
      {
        "text": "No, I am too angry and do not want to see anyone celebrating.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Bitterness prevents sharing joy with the school community."
      },
      {
        "text": "Live streams always fail, this will be an embarrassing disaster.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Pessimistic cynicism hurts student morale."
      },
      {
        "text": "I couldn't agree more, let's join the courtyard ceremony together!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Enthusiastic and respectful! Ready for the grand finale!"
      }
    ]
  },
  "principal_ch1_start": {
    "id": "principal_ch1_start",
    "speaker": "Pak Haryono",
    "speakerRole": "School Principal",
    "avatarType": "principal",
    "text": "Welcome to SMK Muhammadiyah Bawang! Tomorrow marks our school's 25th Silver Jubilee anniversary. But our beloved Golden Trophy has disappeared from its pedestal! As our newest student investigator, will you help examine the clues respectfully?",
    "choices": [
      {
        "text": "I don't care about an old trophy. Why don't you buy a plastic cup instead?",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Disrespectful! That damages the principal's trust.",
        "nextNodeId": "principal_ch1_advice"
      },
      {
        "text": "I couldn't agree more. Someone clearly stole it and must be punished immediately!",
        "isCorrect": false,
        "trustChange": -5,
        "feedback": "Too hasty! Jumping to accusations without evidence isn't wise.",
        "nextNodeId": "principal_ch1_advice"
      },
      {
        "text": "I think we can solve this mystery together, Pak Haryono. Where should I begin?",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Wonderful! Stating your optimistic opinion with 'I think' builds confidence!",
        "unlockClueId": "clue_pedestal",
        "nextNodeId": "principal_ch1_advice"
      }
    ]
  },
  "principal_ch1_advice": {
    "id": "principal_ch1_advice",
    "speaker": "Pak Haryono",
    "speakerRole": "School Principal",
    "avatarType": "principal",
    "text": "Examine the empty pedestal, speak with Pak Slamet at the gate and Ibu Siti at the canteen, then visit the AKL Accounting Lab to inspect the asset records. Remember: communicate with polite language!",
    "choices": [
      {
        "text": "Whatever, I will just wander around without any plan.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Too casual for addressing a school principal!"
      },
      {
        "text": "I agree with you, sir. I will proceed with great care.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Polite and affirmative! 'I agree with you' shows teamwork and respect."
      },
      {
        "text": "In my opinion, listening to all staff members will reveal the full story.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Excellent! 'In my opinion' shows maturity and analytical perspective."
      }
    ]
  },
  "security_ch1_start": {
    "id": "security_ch1_start",
    "speaker": "Pak Slamet",
    "speakerRole": "Head Security Guard",
    "avatarType": "security",
    "text": "Peace be with you! I have guarded SMK Muhiba for 15 years. Yesterday at dusk around 5:30 PM, I saw someone carrying a heavy wrapped container towards the workshops. Some say it looked suspicious.",
    "choices": [
      {
        "text": "You fell asleep on duty, didn't you?",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Rude accusation! That lowers the security officer's trust."
      },
      {
        "text": "I agree with you! It must be the thief caught in the act!",
        "isCorrect": false,
        "trustChange": -5,
        "feedback": "Pak Slamet did not say it was a thief. Avoid overgeneralizing without facts.",
        "nextNodeId": "security_ch1_detail"
      },
      {
        "text": "That's true, but from my point of view, carrying equipment is normal for vocational students.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Brilliant! You acknowledged truth ('That's true') and provided a balanced perspective ('from my point of view').",
        "unlockClueId": "clue_security_log",
        "nextNodeId": "security_ch1_detail"
      }
    ]
  },
  "security_ch1_detail": {
    "id": "security_ch1_detail",
    "speaker": "Pak Slamet",
    "speakerRole": "Head Security Guard",
    "avatarType": "security",
    "text": "Here is the sign-out ledger. The student signed with initials 'R' and listed 'Equipment Maintenance'. No school property left through the gate.",
    "choices": [
      {
        "text": "This notebook looks fake and untrustworthy.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Insulting! Express doubts constructively instead."
      },
      {
        "text": "I'm afraid I disagree. Maybe someone threw it over the perimeter fence.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Good polite disagreement ('I'm afraid I disagree') with a reasonable hypothesis!"
      },
      {
        "text": "Exactly! That proves the trophy is still somewhere inside our school grounds.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "'Exactly!' expresses precise agreement grounded in verified evidence."
      }
    ]
  },
  "security_ch2_start": {
    "id": "security_ch2_start",
    "speaker": "Pak Slamet",
    "speakerRole": "Head Security Guard",
    "avatarType": "security",
    "text": "Good morning! I noticed Rafi was carrying metal polishing compound and jeweler's cloths yesterday. Doesn't look like any crime to me.",
    "choices": [
      {
        "text": "I don't think so, he is obviously hiding stolen treasure!",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Ignoring physical evidence leads to false conclusions."
      },
      {
        "text": "You're partly right, but we still need to locate where he took the trophy.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Constructive partial agreement that keeps the investigation focused."
      },
      {
        "text": "I agree with you, Pak Slamet. Real evidence points towards restoration, not theft.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Sharp deduction supporting the security officer's observation!"
      }
    ]
  },
  "security_ch3_start": {
    "id": "security_ch3_start",
    "speaker": "Pak Slamet",
    "speakerRole": "Head Security Guard",
    "avatarType": "security",
    "text": "Happy 25th Anniversary! The gate is decorated with festive banners and flowers. Today we celebrate unity!",
    "choices": [
      {
        "text": "Exactly! Thank you for guarding our campus day and night, Pak Slamet.",
        "isCorrect": true,
        "trustChange": 15,
        "unlockClueId": "clue_restoration_photo",
        "feedback": "Appreciative agreement! Pak Slamet hands you the workshop archival photograph showing Senior Rafi and teachers safely restoring the trophy."
      },
      {
        "text": "School anniversaries are noisy and boring.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Pessimistic and impolite."
      },
      {
        "text": "I couldn't agree more! It's a proud milestone for SMK Muhammadiyah Bawang.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Warm, respectful solidarity with school staff."
      }
    ]
  },
  "canteen_ch1_start": {
    "id": "canteen_ch1_start",
    "speaker": "Ibu Siti",
    "speakerRole": "Canteen Owner",
    "avatarType": "canteen",
    "text": "Hello dear! Everybody in the canteen is buzzing about the trophy. Some 10th graders claim senior Rafi stole it because he was angry about the exam schedule. Do you believe that gossip?",
    "choices": [
      {
        "text": "Yes, Rafi is guilty! Everyone knows it!",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Gossip and slander harm the school atmosphere."
      },
      {
        "text": "I see your point, but in my opinion, we should not spread rumors without evidence.",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Masterful! 'I see your point, but in my opinion...' defuses rumors respectfully.",
        "unlockClueId": "clue_canteen_receipt",
        "nextNodeId": "canteen_ch1_receipt"
      },
      {
        "text": "You're partly right, but maybe Rafi is just misunderstood.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Great use of partial agreement ('You're partly right, but...')!",
        "unlockClueId": "clue_canteen_receipt",
        "nextNodeId": "canteen_ch1_receipt"
      }
    ]
  },
  "canteen_ch1_receipt": {
    "id": "canteen_ch1_receipt",
    "speaker": "Ibu Siti",
    "speakerRole": "Canteen Owner",
    "avatarType": "canteen",
    "text": "You are such a polite and thoughtful student! Actually, Rafi was here yesterday buying sweet tea and fried tempe for his juniors working late. Here is the receipt stub.",
    "choices": [
      {
        "text": "Food receipts are completely meaningless.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Dismissive attitude towards evidence."
      },
      {
        "text": "That's true! A caring senior wouldn't steal his own school's pride.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "'That's true!' logically supports your compassionate deduction."
      },
      {
        "text": "I couldn't agree more with your kind judgment, Ibu Siti.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Warm and courteous agreement!"
      }
    ]
  },
  "canteen_ch2_start": {
    "id": "canteen_ch2_start",
    "speaker": "Ibu Siti",
    "speakerRole": "Canteen Owner",
    "avatarType": "canteen",
    "text": "Have some refreshments! Many teachers came by saying Rafi is working on a special anniversary surprise. The rumors were completely unfounded.",
    "choices": [
      {
        "text": "That's true! In my opinion, checking directly with people is always better than gossip.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Wise principle supporting direct communication!"
      },
      {
        "text": "I see your point, but we still need to see the restored trophy with our own eyes.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Balanced and cautious approach."
      },
      {
        "text": "Teachers are always covering up scandals.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Cynical disrespect toward educators."
      }
    ]
  },
  "canteen_ch3_start": {
    "id": "canteen_ch3_start",
    "speaker": "Ibu Siti",
    "speakerRole": "Canteen Owner",
    "avatarType": "canteen",
    "text": "I prepared festive celebratory dishes for our 25th anniversary! You communicated so politely throughout!",
    "choices": [
      {
        "text": "I couldn't agree more! Thank you very much for feeding everyone, Ibu Siti!",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Courteous and warm celebration!"
      },
      {
        "text": "That's true! Good food and polite discussion make the best school spirit.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Uplifting affirmation!"
      },
      {
        "text": "Give me the food, I don't want to talk.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Impolite manners."
      }
    ]
  },
  "fajar_ch1_start": {
    "id": "fajar_ch1_start",
    "speaker": "Fajar",
    "speakerRole": "Student Council President",
    "avatarType": "boy_student",
    "text": "Hi there! I am coordinating the decorations for tomorrow's Jubilee. Everyone is worried that losing the Golden Trophy will ruin the opening ceremony.",
    "choices": [
      {
        "text": "Cancel the whole celebration immediately!",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Giving up causes unnecessary panic among organizers."
      },
      {
        "text": "In my opinion, we should keep preparing the stage while investigating the facts calmly.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Mature leadership opinion using 'In my opinion'!"
      },
      {
        "text": "That's true, but teamwork will keep the celebration alive regardless.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Encouraging perspective validating teamwork!"
      }
    ]
  },
  "fajar_ch2_start": {
    "id": "fajar_ch2_start",
    "speaker": "Fajar",
    "speakerRole": "Student Council President",
    "avatarType": "boy_student",
    "text": "The student council met this morning. Some representatives wanted to confront Rafi aggressively about the rumors.",
    "choices": [
      {
        "text": "Yes, let's protest outside the workshop right now!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Hostile actions disrupt learning and harm harmony."
      },
      {
        "text": "I see your point, but confronting someone without verified proof creates division.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Masterful polite disagreement that protects school unity."
      },
      {
        "text": "From my point of view, we should check the campus CCTV server logs before making any assumptions.",
        "isCorrect": true,
        "trustChange": 15,
        "unlockClueId": "clue_server_backup",
        "feedback": "Prudent and factual! Fajar shares the IT camera ping log showing routine server maintenance, not tampering!"
      }
    ]
  },
  "fajar_ch3_start": {
    "id": "fajar_ch3_start",
    "speaker": "Fajar",
    "speakerRole": "Student Council President",
    "avatarType": "boy_student",
    "text": "Look at the decorated stage! The 25th Silver Jubilee is finally here. Thank you for maintaining peace with respectful words.",
    "choices": [
      {
        "text": "You're absolutely right! Mutual respect resolved what rumors nearly destroyed.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Strong positive agreement honoring harmony."
      },
      {
        "text": "I couldn't agree more! Respectful communication made this great day possible.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Inspiring conclusion to student collaboration!"
      },
      {
        "text": "It was mostly luck, not communication.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Undervalues the role of polite dialogue."
      }
    ]
  },
  "rafi_ch1_preview": {
    "id": "rafi_ch1_preview",
    "speaker": "Senior Rafi",
    "speakerRole": "Senior Class President & Craftsman",
    "avatarType": "senior_rafi",
    "text": "Hello junior! I see you are looking around the courtyard. Tomorrow is a historic milestone for SMK Muhiba. Keep your eyes open for true craftsmanship.",
    "choices": [
      {
        "text": "Did you steal the golden trophy yesterday?",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Blunt, rude accusations close doors to constructive conversation."
      },
      {
        "text": "In my opinion, our school history deserves honor. We will find whatever went missing.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Polite, dignified response that earns Rafi's respect."
      },
      {
        "text": "I agree with you! Our vocational skills are something to celebrate.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Positive vocational solidarity!"
      }
    ]
  },
  "rafi_ch2_secret": {
    "id": "rafi_ch2_secret",
    "speaker": "Senior Rafi",
    "speakerRole": "Senior Class President & Craftsman",
    "avatarType": "senior_rafi",
    "text": "Psst... You're the new student everyone is talking about. I know rumors are flying that I took the trophy. Please trust that everything will be revealed at tomorrow's ceremony.",
    "choices": [
      {
        "text": "Thief! I am reporting you right now!",
        "isCorrect": false,
        "trustChange": -25,
        "feedback": "Aggressive behavior ruins communication and prevents learning the truth!"
      },
      {
        "text": "I see your point, but can you at least give us a hint so rumors don't escalate?",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Diplomatic inquiry ('I see your point, but...') keeps dialogue open without pressuring.",
        "unlockClueId": "clue_anniversary_draft",
        "nextNodeId": "rafi_ch2_hint"
      },
      {
        "text": "In my opinion, keeping total secrets makes people suspicious.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Honest and respectful feedback!",
        "unlockClueId": "clue_anniversary_draft",
        "nextNodeId": "rafi_ch2_hint"
      }
    ]
  },
  "rafi_ch2_hint": {
    "id": "rafi_ch2_hint",
    "speaker": "Senior Rafi",
    "speakerRole": "Senior Class President & Craftsman",
    "avatarType": "senior_rafi",
    "text": "Here... look at this sketch in my notebook. Read the inscription. Tomorrow in Chapter 3, stand with me during the assembly and help explain the truth with polite English!",
    "choices": [
      {
        "text": "I don't believe sketches, this could be fabricated.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Unfounded cynicism alienates allies."
      },
      {
        "text": "I agree with you, Rafi. True facts will shine brighter than false rumors.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Inspiring support! You are ready for the final Chapter 3."
      },
      {
        "text": "From my point of view, clearing your name in public will restore trust immediately.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Prudent perspective using 'From my point of view'!"
      }
    ]
  },
  "rafi_ch3_climax": {
    "id": "rafi_ch3_climax",
    "speaker": "Senior Rafi",
    "speakerRole": "Senior Class President & Craftsman",
    "avatarType": "senior_rafi",
    "text": "The moment has arrived! Look upon the restored Golden Trophy—hand-polished and engraved with 25th Silver Jubilee laurels!",
    "choices": [
      {
        "text": "You're absolutely right! The golden shine and precision engraving look magnificent.",
        "isCorrect": true,
        "trustChange": 20,
        "unlockClueId": "clue_jubilee_ribbon",
        "feedback": "Strong positive agreement! Rafi presents the official Jubilee Golden Ribbon and engraved plaque attached to the trophy!"
      },
      {
        "text": "I couldn't agree more! It is an absolute masterpiece of craftsmanship!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Celebrating the glorious truth together!"
      },
      {
        "text": "It looks just okay, nothing special.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Ungenerous reaction."
      }
    ]
  },
  "bu_rini_start": {
    "id": "bu_rini_start",
    "speaker": "Bu Rini",
    "speakerRole": "AKL Accounting Teacher",
    "avatarType": "teacher_rini",
    "text": "Welcome to the AKL Accounting Laboratory! We track all assets of SMK Muhammadiyah Bawang with meticulous precision. Our balance sheet indicates the Golden Trophy was donated 25 years ago.",
    "choices": [
      {
        "text": "I don't think so. Accounting books are useless for finding lost objects.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Too dismissive of accounting discipline! Be respectful."
      },
      {
        "text": "From my point of view, auditing the maintenance log will help pinpoint when it was relocated.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Professional phrasing! 'From my point of view' fits an academic accounting discussion perfectly.",
        "nextNodeId": "bu_rini_advice"
      },
      {
        "text": "I agree with you, Bu Rini. Every asset must have an audit trail.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "'I agree with you' shows strong vocational solidarity!",
        "nextNodeId": "bu_rini_advice"
      }
    ]
  },
  "bu_rini_advice": {
    "id": "bu_rini_advice",
    "speaker": "Bu Rini",
    "speakerRole": "AKL Accounting Teacher",
    "avatarType": "teacher_rini",
    "text": "Budi is practicing at the Debate Ledger terminal. Help him complete the debate matching exercise to uncover the missing asset ledger entry!",
    "choices": [
      {
        "text": "In my opinion, balancing the ledger will reveal the authorized asset requisition.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Analytical mindset that impresses the accounting teacher!"
      },
      {
        "text": "I will do that right away. Thank you, Bu Rini!",
        "isCorrect": true,
        "trustChange": 5,
        "feedback": "Polite student readiness for the AKL Mini-Game!"
      },
      {
        "text": "Can someone else do it? I dislike spreadsheets.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Avoid complaining to teachers."
      }
    ]
  },
  "bu_rini_ch2": {
    "id": "bu_rini_ch2",
    "speaker": "Bu Rini",
    "speakerRole": "AKL Accounting Teacher",
    "avatarType": "teacher_rini",
    "text": "We cross-referenced the anniversary budget. There is an approved expense line for 'Trophy Restoration Materials' signed by the Principal!",
    "choices": [
      {
        "text": "I'm not so sure about that, what if the signature was forged?",
        "isCorrect": false,
        "trustChange": -5,
        "feedback": "Skeptical without reviewing the official seal."
      },
      {
        "text": "Exactly! That proves everything was officially planned.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Solid financial fact check affirming official records!"
      },
      {
        "text": "That's true! Transparent bookkeeping eliminates false accusations.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Insightful connection between financial transparency and justice."
      }
    ]
  },
  "bu_rini_ch3": {
    "id": "bu_rini_ch3",
    "speaker": "Bu Rini",
    "speakerRole": "AKL Accounting Teacher",
    "avatarType": "teacher_rini",
    "text": "Our financial records balance 100%, and the trophy is back in pristine shape. Great job, student!",
    "choices": [
      {
        "text": "In my opinion, precision and honesty are the best values.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Inspiring moral conclusion!"
      },
      {
        "text": "I couldn't agree more, Bu Rini! Professional accounting made this possible.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Warm, respectful acknowledgment of vocational excellence."
      },
      {
        "text": "Accounting was easy, anyone could do it.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Boastful attitude."
      }
    ]
  },
  "budi_start": {
    "id": "budi_start",
    "speaker": "Budi",
    "speakerRole": "AKL Classmate",
    "avatarType": "boy_student",
    "text": "Hey! I'm balancing our department records on the Debate Ledger. People are arguing about whether financial budgets should prioritize festivals or workshop tools. Can you help me resolve these statements with proper English expressions?",
    "choices": [
      {
        "text": "I'm afraid I don't have time for silly matching exercises.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Calling a classmate's work 'silly' is impolite."
      },
      {
        "text": "I would be glad to! In my opinion, sound reasoning and polite debate resolve any disagreement.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Encouraging and constructive! Ready to play Debate Ledger."
      },
      {
        "text": "I agree with you! Working on ledger debates will sharpen our communication.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Positive peer collaboration!"
      }
    ]
  },
  "budi_ch2": {
    "id": "budi_ch2",
    "speaker": "Budi",
    "speakerRole": "AKL Classmate",
    "avatarType": "boy_student",
    "text": "I reviewed the expense logs again. Rafi submitted official receipts for buffing wheels and polishing compound, not personal purchases.",
    "choices": [
      {
        "text": "That's true! Audit documents don't lie.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Validating financial evidence with 'That's true'!"
      },
      {
        "text": "I see your point, but people still spread gossip without reading the logs.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Thoughtful distinction between facts and rumors."
      },
      {
        "text": "Who cares about receipts? They are just boring paper.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Dismissive attitude toward financial proof."
      }
    ]
  },
  "budi_ch3": {
    "id": "budi_ch3",
    "speaker": "Budi",
    "speakerRole": "AKL Classmate",
    "avatarType": "boy_student",
    "text": "Everything balanced out in the end! We have the trophy and clear accounts. Happy 25th anniversary!",
    "choices": [
      {
        "text": "You're absolutely right! Accurate numbers and honest hearts won the day.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Warm, supportive camaraderie!"
      },
      {
        "text": "I couldn't agree more, Budi! Great work keeping the records straight.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Warm solidarity!"
      },
      {
        "text": "I solved everything myself, you barely helped.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Arrogant response damages friendship."
      }
    ]
  },
  "pak_joko_start": {
    "id": "pak_joko_start",
    "speaker": "Pak Joko",
    "speakerRole": "Otomotif Mechanic Master",
    "avatarType": "mechanic_joko",
    "text": "Welcome to the Otomotif Workshop! Some students rushed in here this morning claiming that we are hiding the Golden Trophy inside a car engine. What an outrageous accusation!",
    "choices": [
      {
        "text": "You are definitely guilty, hand over the trophy right now!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Never scream at teachers or workshop masters!"
      },
      {
        "text": "I see your point, but people are anxious because the anniversary is tomorrow.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Empathetic bridge! 'I see your point, but...' validates his frustration while explaining context.",
        "unlockClueId": "clue_workshop_polish",
        "nextNodeId": "pak_joko_detail"
      },
      {
        "text": "You're partly right, but why is there a bottle of gold metal polish on that bench?",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Observant and polite inquiry using partial agreement!",
        "unlockClueId": "clue_workshop_polish",
        "nextNodeId": "pak_joko_detail"
      }
    ]
  },
  "pak_joko_detail": {
    "id": "pak_joko_detail",
    "speaker": "Pak Joko",
    "speakerRole": "Otomotif Mechanic Master",
    "avatarType": "mechanic_joko",
    "text": "You have sharp eyes! That polish was requested for a special assignment. Speak to Doni at the motorcycle lift; he's diagnosing an engine misfire while practicing polite opinion phrases.",
    "choices": [
      {
        "text": "In my opinion, observing workshop details solves the mystery step by step.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Methodical and polite attitude that impresses Pak Joko!"
      },
      {
        "text": "Understood! I will assist Doni with the engine right away.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Ready for the Otomotif 'Engine Talk' minigame!"
      },
      {
        "text": "I don't like getting grease on my clothes.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Complaining in a vocational workshop is unprofessional."
      }
    ]
  },
  "pak_joko_ch2": {
    "id": "pak_joko_ch2",
    "speaker": "Pak Joko",
    "speakerRole": "Otomotif Mechanic Master",
    "avatarType": "mechanic_joko",
    "text": "Doni and I have been calibrating engines and testing buffing wheels all morning. Precision in vocational work takes patience.",
    "choices": [
      {
        "text": "That's true! Master technicians always pay attention to tiny details.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Appreciating hands-on vocational dedication!"
      },
      {
        "text": "From my point of view, technical precision is the hallmark of SMK Muhiba.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "High craftsmanship pride!"
      },
      {
        "text": "Sounds like a waste of time to me.",
        "isCorrect": false,
        "trustChange": -15,
        "feedback": "Insulting vocational discipline."
      }
    ]
  },
  "pak_joko_ch3": {
    "id": "pak_joko_ch3",
    "speaker": "Pak Joko",
    "speakerRole": "Otomotif Mechanic Master",
    "avatarType": "mechanic_joko",
    "text": "Look at the trophy pedestal in the courtyard now! Rafi and our workshop apprentices spent 18 hours buffing the bronze and engraving the 25-year laurels. What a masterpiece!",
    "choices": [
      {
        "text": "I couldn't agree more! The craftsmanship is breathtaking!",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "High craftsmanship pride!"
      },
      {
        "text": "You're absolutely right! Mechanical skill transformed old metal into a work of art.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Honoring mechanical craftsmanship."
      },
      {
        "text": "A machine could have done it faster.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Cold dismissive critique."
      }
    ]
  },
  "doni_ch1": {
    "id": "doni_ch1",
    "speaker": "Doni",
    "speakerRole": "Otomotif Student",
    "avatarType": "student_doni",
    "text": "Hey! We are prepping the workshop for open house tours. Have you checked out our motorcycle lift?",
    "choices": [
      {
        "text": "Your workshop is too loud.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Unnecessarily dismissive."
      },
      {
        "text": "In my opinion, workplace safety standards look exemplary here.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Courteous vocational compliment!"
      },
      {
        "text": "That's true! The hydraulic lift is impressive technology.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Friendly technical affirmation."
      }
    ]
  },
  "doni_start": {
    "id": "doni_start",
    "speaker": "Doni",
    "speakerRole": "Otomotif Student",
    "avatarType": "student_doni",
    "text": "Hey friend! I need to formulate an opinion report for Pak Joko about our engine tuning, but my English sentence blocks got scrambled. Can you help me arrange the blocks into polite opinion and disagreement statements?",
    "choices": [
      {
        "text": "Fixing motorcycles has nothing to do with English. Do it yourself.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Vocational engineers need global English communication skills!"
      },
      {
        "text": "In my opinion, teamwork makes any mechanical repair easier! Let's do it.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Positive attitude and great English! Mini-game ready."
      },
      {
        "text": "I agree with you! Formulating polite technical reports is a great skill to learn.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Encouraging and constructive partnership!"
      }
    ]
  },
  "doni_ch3": {
    "id": "doni_ch3",
    "speaker": "Doni",
    "speakerRole": "Otomotif Student",
    "avatarType": "student_doni",
    "text": "Rafi worked on that bronze cup right here at our bench. His hands were covered in metal polish! Now the whole school is cheering for him.",
    "choices": [
      {
        "text": "I couldn't agree more! Standing up for friends without rushing to judgment pays off.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Supportive, loyal communication!"
      },
      {
        "text": "That's true! Honest hard work always earns recognition.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Heartwarming affirmation!"
      },
      {
        "text": "He should have told everyone earlier and not caused drama.",
        "isCorrect": false,
        "trustChange": -5,
        "feedback": "Missing the joy of the anniversary surprise."
      }
    ]
  },
  "bu_nina_start": {
    "id": "bu_nina_start",
    "speaker": "Bu Nina",
    "speakerRole": "TJKT Network Teacher",
    "avatarType": "teacher_nina",
    "text": "Welcome to the TJKT Network Lab! We monitor our campus LAN, server racks, and security cameras. Someone told the rumor mill that the CCTV was hacked to hide the trophy.",
    "choices": [
      {
        "text": "TJKT failed at security! You should be ashamed!",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Extremely offensive! Treat educators with respect."
      },
      {
        "text": "That might be true, however we should verify the server timestamps first.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "High-level partial agreement ('That might be true, however...')!",
        "unlockClueId": "clue_server_backup",
        "nextNodeId": "bu_nina_detail"
      },
      {
        "text": "I'm afraid I disagree with that rumor. Did your network logs show any unauthorized breach?",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Superb polite disagreement ('I'm afraid I disagree') backed by technical inquiry!",
        "unlockClueId": "clue_server_backup",
        "nextNodeId": "bu_nina_detail"
      }
    ]
  },
  "bu_nina_detail": {
    "id": "bu_nina_detail",
    "speaker": "Bu Nina",
    "speakerRole": "TJKT Network Teacher",
    "avatarType": "teacher_nina",
    "text": "Exactly! There was zero hacking. It was just a routine firmware update at 5:00 PM. Maya is currently testing our network patch panel with conversational logic. Go assist her!",
    "choices": [
      {
        "text": "In my opinion, logical network routing connects people just like polite language does.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Philosophical and courteous connection!"
      },
      {
        "text": "I agree with you, Bu Nina. I will connect the network cables with Maya.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Onward to the TJKT 'Network Connect' minigame!"
      },
      {
        "text": "Network cables are a mess, I prefer wireless.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Dismissive attitude toward physical network architecture."
      }
    ]
  },
  "bu_nina_ch2": {
    "id": "bu_nina_ch2",
    "speaker": "Bu Nina",
    "speakerRole": "TJKT Network Teacher",
    "avatarType": "teacher_nina",
    "text": "The log files are pristine. Rafi was caught on camera borrowing the microfiber cloth from the media center with written permission.",
    "choices": [
      {
        "text": "Exactly! That corroborates the security guard's register.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Cross-referencing data effectively!"
      },
      {
        "text": "That's true! Digital records provide indisputable proof against rumors.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Recognizing technological validation."
      },
      {
        "text": "Anyone could easily fake an access log.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Cynical dismissal of server security."
      }
    ]
  },
  "bu_nina_ch3": {
    "id": "bu_nina_ch3",
    "speaker": "Bu Nina",
    "speakerRole": "TJKT Network Teacher",
    "avatarType": "teacher_nina",
    "text": "Our livestream of the 25th anniversary is broadcasting across the regency! All network links are green.",
    "choices": [
      {
        "text": "I couldn't agree more! High-speed connectivity showcases our vocational strength.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Honoring IT infrastructure!"
      },
      {
        "text": "That's true! Muhiba's excellence is known everywhere!",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Network live!"
      },
      {
        "text": "Streams crash all the time, don't celebrate too early.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Unnecessarily pessimistic."
      }
    ]
  },
  "maya_ch1": {
    "id": "maya_ch1",
    "speaker": "Maya",
    "speakerRole": "TJKT Systems Student",
    "avatarType": "girl_student",
    "text": "Hello! We are monitoring network traffic for the school's online celebration. All bandwidth tests are looking stable.",
    "choices": [
      {
        "text": "Computers are overrated.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Dismissive attitude."
      },
      {
        "text": "In my opinion, reliable internet infrastructure is crucial for modern schools.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Valuing technological readiness!"
      },
      {
        "text": "That's true! Smooth connectivity will make tomorrow's stream flawless.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Friendly technical encouragement."
      }
    ]
  },
  "maya_start": {
    "id": "maya_start",
    "speaker": "Maya",
    "speakerRole": "TJKT Systems Student",
    "avatarType": "girl_student",
    "text": "Hi there! Our router switch cables were disconnected during the server reboot. Each cable represents an English opinion statement that must link to its logical polite response pin. Can you help me patch the network?",
    "choices": [
      {
        "text": "Cables are boring, I only care about wireless signals.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Dismissive attitude towards physical networking fundamentals."
      },
      {
        "text": "From my point of view, network logic and clear communication are identical! Let's patch them.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Inspiring! Unlocks TJKT Network Connect minigame."
      },
      {
        "text": "I agree with you! Connecting conversational pins will be fun and educational.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Enthusiastic learning attitude!"
      }
    ]
  },
  "maya_ch3": {
    "id": "maya_ch3",
    "speaker": "Maya",
    "speakerRole": "TJKT Systems Student",
    "avatarType": "girl_student",
    "text": "Over 5,000 alumni are watching our livestream right now! Everyone is complimenting the restored Golden Trophy on screen.",
    "choices": [
      {
        "text": "You're absolutely right! The broadcast visuals look crisp and impressive.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Complimenting student multimedia production."
      },
      {
        "text": "I couldn't agree more! It is a proud day for all students and alumni.",
        "isCorrect": true,
        "trustChange": 10,
        "feedback": "Celebrating alumni pride!"
      },
      {
        "text": "5,000 viewers is not that many on the internet.",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Belittling student achievements."
      }
    ]
  },
  "principal_ch2_start": {
    "id": "principal_ch2_start",
    "speaker": "Pak Haryono",
    "speakerRole": "School Principal",
    "avatarType": "principal",
    "text": "Good morning! Day 2 of our investigation begins. Rumors have reached the staffroom that senior Rafi was seen working late in the Otomotif Workshop and TJKT Lab. Remember: evaluate facts before judging anyone!",
    "choices": [
      {
        "text": "I don't think so. If Rafi was there, he must be guilty!",
        "isCorrect": false,
        "trustChange": -10,
        "feedback": "Avoid assuming guilt without evidence."
      },
      {
        "text": "I couldn't agree more, sir. Premature accusations only cause misunderstandings.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Profound wisdom! 'I couldn't agree more' reflects high communication ethics."
      },
      {
        "text": "From my point of view, inspecting the labs directly will bring clarity.",
        "isCorrect": true,
        "trustChange": 12,
        "feedback": "Constructive action-oriented perspective."
      }
    ]
  },
  "principal_ch3_debate": {
    "id": "principal_ch3_debate",
    "speaker": "Pak Haryono",
    "speakerRole": "School Principal",
    "avatarType": "principal",
    "text": "Attention students and teachers of SMK Muhammadiyah Bawang! It is Day 3, our 25th Silver Jubilee! The courtyard is full, but angry voices are shouting that Senior Rafi took the Golden Trophy. As our lead investigator, what is your official stance?",
    "choices": [
      {
        "text": "I couldn't agree more with the angry crowd! Expel Rafi immediately!",
        "isCorrect": false,
        "trustChange": -25,
        "feedback": "Unfair and destructive to condemn someone based on crowd anger."
      },
      {
        "text": "I see your point, but everyone is angry, so let's just blame Rafi.",
        "isCorrect": false,
        "trustChange": -20,
        "feedback": "Never sacrifice an innocent student to appease angry rumors!"
      },
      {
        "text": "In my opinion, we must stop accusing without proof. From my point of view, Rafi has an honorable explanation!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Courageous and eloquent! Using 'In my opinion' and 'From my point of view' to champion justice.",
        "unlockClueId": "clue_principal_note",
        "nextNodeId": "ch3_debate_confrontation"
      }
    ]
  },
  "ch3_debate_confrontation": {
    "id": "ch3_debate_confrontation",
    "speaker": "Senior Rafi",
    "speakerRole": "Senior Class President & Craftsman",
    "avatarType": "senior_rafi",
    "text": "Thank you for defending reason! Look everyone: behold what was inside the workshop!",
    "choices": [
      {
        "text": "That's true! Behold the Golden Trophy, polished to perfection with 25th Anniversary gold leaf!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "The glorious truth emerges!",
        "nextNodeId": "ch3_the_reveal"
      },
      {
        "text": "I couldn't agree more! The trophy looks completely restored and brand new!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Enthusiastic affirmation that silences the doubters!",
        "nextNodeId": "ch3_the_reveal"
      },
      {
        "text": "Wait, is this really the real trophy or a replica?",
        "isCorrect": false,
        "trustChange": -5,
        "feedback": "Unnecessary doubt at the grand reveal.",
        "nextNodeId": "ch3_the_reveal"
      }
    ]
  },
  "ch3_the_reveal": {
    "id": "ch3_the_reveal",
    "speaker": "Pak Haryono",
    "speakerRole": "School Principal",
    "avatarType": "principal",
    "text": "Haha! It is time to unveil the secret! The old 1999 trophy had tarnished brass after 25 years. I secretly tasked Senior Rafi and the Otomotif department to restore, polish, and engrave it as a surprise gift for our Jubilee celebration! Rafi never stole anything—he was our craftsman hero!",
    "choices": [
      {
        "text": "You're partly right, but you gave us quite a fright with the secrecy!",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Playful partial agreement! The principal laughs heartily.",
        "nextNodeId": "ch3_celebration"
      },
      {
        "text": "I couldn't agree more, sir! Disagreement without listening creates conflict, but polite dialogue builds unity.",
        "isCorrect": true,
        "trustChange": 25,
        "feedback": "Inspiring moral lesson! The entire school applauds your polite communication skills!",
        "nextNodeId": "ch3_celebration"
      },
      {
        "text": "In my opinion, keeping secrets from the student body was very risky.",
        "isCorrect": true,
        "trustChange": 15,
        "feedback": "Honest and thoughtful critique that the principal respects!",
        "nextNodeId": "ch3_celebration"
      }
    ]
  },
  "ch3_celebration": {
    "id": "ch3_celebration",
    "speaker": "Pak Haryono",
    "speakerRole": "School Principal",
    "avatarType": "principal",
    "text": "Let the 25th Anniversary celebration of SMK Muhammadiyah Bawang begin! Take the final Chapter 3 communication assessment to receive your official 'Best Communicator' badge of honor!",
    "choices": [
      {
        "text": "In my opinion, this has been an extraordinary celebration at SMK Muhiba!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Celebration unlocked! Head to the final quiz and victory hall."
      },
      {
        "text": "I agree with you, Pak Haryono! Let us take the final quiz and celebrate!",
        "isCorrect": true,
        "trustChange": 20,
        "feedback": "Enthusiastic readiness for the grand finale!"
      },
      {
        "text": "I couldn't agree more! It has been an honor to investigate with polite communication.",
        "isCorrect": true,
        "trustChange": 25,
        "feedback": "Exemplary reflection on the power of polite English!"
      }
    ]
  }
};
