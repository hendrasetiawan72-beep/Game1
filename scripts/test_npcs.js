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

console.log('Total NPCs configured:', NPCS.length);
