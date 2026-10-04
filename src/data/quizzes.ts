import { QuizQuestion } from '../types/game';

export const CHAPTER_QUIZZES: Record<1 | 2 | 3, QuizQuestion[]> = {
  1: [
    {
      id: 'q1_1',
      question: 'Which of the following phrases is the most polite and natural way to open your personal opinion?',
      isMCMA: false,
      options: [
        'You are completely wrong, so listen to me.',
        'I do not care what anyone else thinks.',
        'In my opinion, we should check the courtyard first.',
        'Stop talking right now.'
      ],
      correctIndices: [2], // Option C
      explanation: '"In my opinion..." is a respectful, standardized expression used to share personal thoughts.',
      category: 'opinion'
    },
    {
      id: 'q1_2',
      question: '[MCMA - Select ALL that apply] Which of the following expressions show direct and polite agreement with a classmate?',
      isMCMA: true,
      options: [
        'I agree with you.',
        'I don\'t think so.',
        'That\'s true.',
        'You\'re partly right, but no.'
      ],
      correctIndices: [0, 2], // Options A and C
      explanation: 'Both "I agree with you." and "That\'s true." directly indicate polite agreement with an interlocutor.',
      category: 'agree'
    },
    {
      id: 'q1_3',
      question: 'When a classmate states an accurate fact, which short exclamation enthusiastically affirms their precision?',
      isMCMA: false,
      options: [
        'Maybe never!',
        'Exactly!',
        'No way!',
        'I disagree.'
      ],
      correctIndices: [1], // Option B
      explanation: '"Exactly!" expresses enthusiastic, positive agreement with an accurate deduction or point.',
      category: 'agree'
    },
    {
      id: 'q1_4',
      question: '[MCMA - Select ALL that apply] Which of these statements represent polite ways to express disagreement?',
      isMCMA: true,
      options: [
        'I\'m afraid I disagree.',
        'You are lying to me!',
        'I see your point, but we need more facts.',
        'Whatever you say doesn\'t matter.'
      ],
      correctIndices: [0, 2], // Options A and C
      explanation: '"I\'m afraid I disagree." and "I see your point, but..." politely disagree without attacking the speaker.',
      category: 'disagree_polite'
    },
    {
      id: 'q1_5',
      question: 'Which sentence correctly signals a subjective personal viewpoint rather than an objective command?',
      isMCMA: false,
      options: [
        'Close the laboratory door immediately.',
        'Water boils at 100 degrees Celsius.',
        'The clock indicates 12:00 PM right now.',
        'I think the trophy will be located before the ceremony.'
      ],
      correctIndices: [3], // Option D
      explanation: '"I think..." signals a subjective perspective or expectation rather than a physical command or established natural law.',
      category: 'opinion'
    }
  ],
  2: [
    {
      id: 'q2_1',
      question: 'Someone blames senior Rafi without evidence. Which response tactfully challenges the accusation?',
      isMCMA: false,
      options: [
        'Yes, let us punish him without asking questions.',
        'I see your point, but we have no tangible proof yet.',
        'Shut up, you know nothing!',
        'I couldn\'t agree more, he must be guilty.'
      ],
      correctIndices: [1], // Option B
      explanation: '"I see your point, but..." validates listening to the speaker before offering balanced counter-evidence.',
      category: 'disagree_polite'
    },
    {
      id: 'q2_2',
      question: '[MCMA - Select ALL that apply] Which of the following phrases indicate strong, complete agreement with a statement?',
      isMCMA: true,
      options: [
        'I couldn\'t agree more.',
        'I\'m not so sure about that.',
        'You\'re absolutely right.',
        'I don\'t think so.'
      ],
      correctIndices: [0, 2], // Options A and C
      explanation: '"I couldn\'t agree more." and "You\'re absolutely right." both convey strong, 100% agreement.',
      category: 'agree'
    },
    {
      id: 'q2_3',
      question: 'A peer worries that working with machinery is dangerous, but you believe proper goggles ensure safety. Which partial agreement is best?',
      isMCMA: false,
      options: [
        'You are foolish to think that.',
        'I agree that we must close the workshop forever.',
        'You\'re partly right, but wearing protective safety gear keeps us secure.',
        'I don\'t care about safety equipment.'
      ],
      correctIndices: [2], // Option C
      explanation: '"You\'re partly right, but..." acknowledges the hazard while identifying the correct safety procedure.',
      category: 'partial_agree'
    },
    {
      id: 'q2_4',
      question: '[MCMA - Select ALL that apply] Which phrases can be used at the beginning of a sentence to introduce an opinion?',
      isMCMA: true,
      options: [
        'From my point of view,',
        'In my opinion,',
        'Without any words,',
        'As far as I am concerned,'
      ],
      correctIndices: [0, 1, 3], // Options A, B, and D
      explanation: '"From my point of view,", "In my opinion,", and "As far as I am concerned," are all standard expressions for introducing opinions.',
      category: 'opinion'
    },
    {
      id: 'q2_5',
      question: 'During a faculty discussion, which expression is the most polite formal disagreement when addressing a teacher?',
      isMCMA: false,
      options: [
        'You make no sense at all.',
        'That plan is completely ridiculous.',
        'I hate that proposal.',
        'I\'m afraid I disagree, Bu Nina.'
      ],
      correctIndices: [3], // Option D
      explanation: '"I\'m afraid I disagree..." uses the polite hedging phrase "I\'m afraid" to maintain professional respect.',
      category: 'disagree_polite'
    }
  ],
  3: [
    {
      id: 'q3_1',
      question: 'During a heated assembly debate, which statement best encourages constructive listening?',
      isMCMA: false,
      options: [
        'Let us shout louder than everyone else!',
        'In my opinion, we should listen to Rafi\'s explanation before making a decision.',
        'Nobody should be allowed to speak.',
        'I agree with whoever yells the loudest.'
      ],
      correctIndices: [1], // Option B
      explanation: 'Using "In my opinion, we should..." promotes calm, respectful resolution through active listening.',
      category: 'opinion'
    },
    {
      id: 'q3_2',
      question: '[MCMA - Select ALL that apply] Which of these sentences demonstrate partial agreement before introducing a counter-argument?',
      isMCMA: true,
      options: [
        'That might be true, however we still need to examine the timestamp.',
        'Rafi is 100% guilty without doubt.',
        'You\'re partly right, but that only explains part of the story.',
        'I refuse to answer any questions.'
      ],
      correctIndices: [0, 2], // Options A and C
      explanation: '"That might be true, however..." and "You\'re partly right, but..." both construct partial agreements effectively.',
      category: 'partial_agree'
    },
    {
      id: 'q3_3',
      question: 'Principal Pak Haryono states: "Respectful dialogue prevents misunderstandings." What is the best affirmative response?',
      isMCMA: false,
      options: [
        'I disagree, shouting is much better.',
        'Whatever, I am not listening.',
        'That\'s true! Respectful communication unites our school community.',
        'Silence is better than speaking.'
      ],
      correctIndices: [2], // Option C
      explanation: '"That\'s true!" followed by affirmative supporting reasoning confirms the educational value.',
      category: 'agree'
    },
    {
      id: 'q3_4',
      question: '[MCMA - Select ALL that apply] What makes polite disagreement different from an aggressive argument?',
      isMCMA: true,
      options: [
        'Polite disagreement attacks the person rather than the concept.',
        'Polite disagreement uses respectful discourse markers such as "I see your point, but...".',
        'Polite disagreement focuses on objective evidence rather than personal insults.',
        'Polite disagreement requires that you abandon your own point of view.'
      ],
      correctIndices: [1, 2], // Options B and C
      explanation: 'Polite disagreement respects the speaker through courteous phrasing and focuses on facts rather than emotional attacks.',
      category: 'disagree_polite'
    },
    {
      id: 'q3_5',
      question: 'A student suggests cancelling the school jubilee because of the controversy. Which polite disagreement is best?',
      isMCMA: false,
      options: [
        'Get out of the room right now!',
        'Yes, let us cancel everything immediately.',
        'I see your point, but our community worked hard and deserves to celebrate.',
        'Nobody cares about your thoughts.'
      ],
      correctIndices: [2], // Option C
      explanation: '"I see your point, but..." demonstrates empathy for the student\'s concern while defending the celebration constructively.',
      category: 'disagree_polite'
    }
  ]
};
