export interface DailyMissionData {
  id: string;
  dateStr: string;
  title: string;
  category: 'Expressing Opinions' | 'Agreeing Politely' | 'Constructive Disagreement' | 'Balanced Evaluation';
  department: string;
  scenario: string;
  prompt: string;
  options: {
    id: string;
    text: string;
    isBest: boolean;
    feedback: string;
  }[];
  bonusPoints: number;
}

export interface DailyMissionState {
  currentStreak: number;
  lastCompletedDate: string | null;
  lastLoginDate: string;
  totalMissionsCompleted: number;
}

const STORAGE_DAILY_KEY = 'opinion_quest_muhiba_daily_streak_v1';

// Seeded pseudo-random generator from date string (e.g. "2026-10-04")
function getSeedFromDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const VOCATIONAL_TOPICS = [
  {
    title: 'Automotive Workshop Safety Protocol Review',
    department: 'Otomotif Engineering',
    category: 'Constructive Disagreement' as const,
    scenario: 'During morning workshop briefing at SMK Muhammadiyah Bawang, an apprentice suggests skipping pre-inspection torque checks to finish motorcycle tune-ups faster.',
    prompt: 'How would you formulate a respectful and constructive English disagreement that upholds workshop safety?',
    options: [
      {
        id: 'A',
        text: 'I see your point about saving time, but in my opinion, thorough safety checks prevent catastrophic engine failures.',
        isBest: true,
        feedback: 'Outstanding diplomatic communication! "I see your point..., but in my opinion..." validates the colleague before offering critical safety reasoning.'
      },
      {
        id: 'B',
        text: 'I couldn’t agree more with taking shortcuts because speed is the only metric that matters in mechanics.',
        isBest: false,
        feedback: 'Incorrect. Safety and precision are paramount in vocational automotive standards.'
      },
      {
        id: 'C',
        text: 'Your idea is completely terrible and you should not be in the automotive workshop.',
        isBest: false,
        feedback: 'Avoid blunt or hostile remarks. Disagreements must remain polite and professional.'
      }
    ]
  },
  {
    title: 'AKL Digital Financial Ledger Transparency',
    department: 'Accounting & Finance (AKL)',
    category: 'Expressing Opinions' as const,
    scenario: 'The student cooperative committee is deliberating whether to publish the 25th Anniversary budget ledger online for all teachers and students to view.',
    prompt: 'Which response clearly and formally expresses your professional opinion in English?',
    options: [
      {
        id: 'A',
        text: 'From my point of view, open ledger reporting builds genuine institutional trust and demonstrates ethical financial stewardship.',
        isBest: true,
        feedback: 'Superb! "From my point of view..." clearly introduces analytical reasoning suited for institutional accounting.'
      },
      {
        id: 'B',
        text: 'Financial records are boring, so I think we should just hide all receipts until next year.',
        isBest: false,
        feedback: 'Unprofessional. Financial accounting requires transparency and diligence.'
      },
      {
        id: 'C',
        text: 'You are right that no student ever cares about school accounts.',
        isBest: false,
        feedback: 'Incorrect. School cooperatives rely on stakeholder confidence.'
      }
    ]
  },
  {
    title: 'TJKT Campus Fiber Optic Bandwidth Allocation',
    department: 'Computer Network (TJKT)',
    category: 'Balanced Evaluation' as const,
    scenario: 'The IT club proposes restricting all campus Wi-Fi bandwidth exclusively to laboratory servers during school hours, limiting student research access.',
    prompt: 'Select the English statement that best expresses a balanced, nuanced perspective.',
    options: [
      {
        id: 'A',
        text: 'You are partly right that servers need priority, but we must also ensure students have sufficient bandwidth for classroom research.',
        isBest: true,
        feedback: 'Brilliant balance! "You are partly right, but..." acknowledges server needs while protecting student learning access.'
      },
      {
        id: 'B',
        text: 'Shut down all internet access for everyone because connectivity is overrated.',
        isBest: false,
        feedback: 'Unrealistic and counterproductive for a vocational technology department.'
      },
      {
        id: 'C',
        text: 'I completely reject your opinion without giving any technical justification.',
        isBest: false,
        feedback: 'Fails to provide constructive feedback or technical compromise.'
      }
    ]
  },
  {
    title: 'School Jubilee Eco-Green Campus Initiative',
    department: 'Muhiba Student Council',
    category: 'Agreeing Politely' as const,
    scenario: 'Principal Pak Haryono recommends launching a school-wide recycling and solar lamp competition during the 25th Silver Jubilee celebration.',
    prompt: 'How would you enthusiastically and politely express strong agreement in English?',
    options: [
      {
        id: 'A',
        text: 'I couldn’t agree more, Pak Haryono; integrating eco-friendly innovation aligns perfectly with our Islamic vocational values.',
        isBest: true,
        feedback: 'Eloquent agreement! "I couldn’t agree more..." demonstrates respectful enthusiasm for positive school leadership.'
      },
      {
        id: 'B',
        text: 'That sounds like too much extra work for the student council.',
        isBest: false,
        feedback: 'Lacks community spirit and polite collaboration.'
      },
      {
        id: 'C',
        text: 'Maybe yes, maybe no, it does not make any difference to me.',
        isBest: false,
        feedback: 'Apathetic response. Aim for engaged and constructive communication.'
      }
    ]
  },
  {
    title: 'Vocational Internship Skill Prioritization',
    department: 'Industry Link & Match',
    category: 'Expressing Opinions' as const,
    scenario: 'An industry partner visits Muhiba to discuss whether technical diagnostic skills or interpersonal team communication matters more for apprentice hiring.',
    prompt: 'What statement best presents a well-rounded opinion on vocational competencies?',
    options: [
      {
        id: 'A',
        text: 'In my opinion, technical mastery is essential, but respectful communication is what truly enables successful team collaboration.',
        isBest: true,
        feedback: 'Insightful! Connects core vocational expertise with professional interpersonal etiquette.'
      },
      {
        id: 'B',
        text: 'Nobody needs to speak politely as long as machines are fixed quickly.',
        isBest: false,
        feedback: 'Workplace studies prove poor communication leads to accidents and job dissatisfaction.'
      },
      {
        id: 'C',
        text: 'Only grades on paper matter, practical skills do not count in real industries.',
        isBest: false,
        feedback: 'Contradicts modern vocational industry standards.'
      }
    ]
  }
];

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyMission(dateStr: string = getTodayDateString()): DailyMissionData {
  const seed = getSeedFromDate(dateStr);
  const topicIndex = seed % VOCATIONAL_TOPICS.length;
  const topic = VOCATIONAL_TOPICS[topicIndex];

  return {
    id: `mission_${dateStr}`,
    dateStr,
    title: topic.title,
    category: topic.category,
    department: topic.department,
    scenario: topic.scenario,
    prompt: topic.prompt,
    options: topic.options,
    bonusPoints: 50
  };
}

export function loadDailyMissionState(): DailyMissionState {
  const today = getTodayDateString();
  try {
    const raw = localStorage.getItem(STORAGE_DAILY_KEY);
    if (raw) {
      const parsed: DailyMissionState = JSON.parse(raw);
      // Check if last login was yesterday or today
      const lastLogin = new Date(parsed.lastLoginDate);
      const todayDate = new Date(today);
      const diffDays = Math.round((todayDate.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24));

      let updatedStreak = parsed.currentStreak || 1;
      if (diffDays > 1) {
        // Missed a day: reset streak to 1
        updatedStreak = 1;
      }

      return {
        ...parsed,
        currentStreak: updatedStreak,
        lastLoginDate: today
      };
    }
  } catch {}

  const initial: DailyMissionState = {
    currentStreak: 1,
    lastCompletedDate: null,
    lastLoginDate: today,
    totalMissionsCompleted: 0
  };
  saveDailyMissionState(initial);
  return initial;
}

export function saveDailyMissionState(state: DailyMissionState): void {
  try {
    localStorage.setItem(STORAGE_DAILY_KEY, JSON.stringify(state));
  } catch {}
}

export function completeDailyMission(today: string = getTodayDateString()): DailyMissionState {
  const cur = loadDailyMissionState();
  if (cur.lastCompletedDate === today) {
    return cur; // already completed today
  }

  const updated: DailyMissionState = {
    ...cur,
    currentStreak: cur.currentStreak + 1,
    lastCompletedDate: today,
    totalMissionsCompleted: cur.totalMissionsCompleted + 1
  };
  saveDailyMissionState(updated);
  return updated;
}
