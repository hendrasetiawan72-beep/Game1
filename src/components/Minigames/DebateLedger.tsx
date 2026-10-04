import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { CheckCircle2, RotateCcw, Volume2, X } from 'lucide-react';

interface DebateLedgerProps {
  onClose: () => void;
  onComplete: () => void;
}

interface LedgerItem {
  id: string;
  speaker: string;
  statement: string;
  correctResponseId: string;
}

interface ResponseCard {
  id: string;
  category: string;
  text: string;
}

const LEDGER_DATA: LedgerItem[] = [
  {
    id: 'l1',
    speaker: 'Treasurer Siti',
    statement: '"We must allocate emergency funds to repair our vocational lab equipment."',
    correctResponseId: 'r1'
  },
  {
    id: 'l2',
    speaker: 'Auditor Dimas',
    statement: '"We should skip keeping physical asset records and rely only on memory."',
    correctResponseId: 'r2'
  },
  {
    id: 'l3',
    speaker: 'Principal Assistant',
    statement: '"Spending on the 25th anniversary celebration is a total waste of school money."',
    correctResponseId: 'r3'
  },
  {
    id: 'l4',
    speaker: 'Class Rep',
    statement: '"The Golden Trophy is a symbol of our students\' 25 years of hard work."',
    correctResponseId: 'r4'
  }
];

const RESPONSE_CARDS: ResponseCard[] = [
  {
    id: 'r1',
    category: 'Strong Agreement',
    text: "I couldn't agree more. Functional tools directly impact our learning quality."
  },
  {
    id: 'r2',
    category: 'Polite Disagreement',
    text: "I'm afraid I disagree. Accurate documentation protects school property from being lost."
  },
  {
    id: 'r3',
    category: 'Partial Agreement',
    text: "You're partly right, but celebrating our achievements boosts school morale and unity."
  },
  {
    id: 'r4',
    category: 'Direct Agreement',
    text: "That's true! It honors all alumni and teachers who came before us."
  }
];

export const DebateLedger: React.FC<DebateLedgerProps> = ({ onClose, onComplete }) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleSelectSlot = (ledgerId: string) => {
    sound.playClick();
    if (!selectedResponse) {
      if (matches[ledgerId]) {
        const newMatches = { ...matches };
        delete newMatches[ledgerId];
        setMatches(newMatches);
      }
      return;
    }

    const newMatches = { ...matches };
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === selectedResponse) {
        delete newMatches[key];
      }
    });

    newMatches[ledgerId] = selectedResponse;
    setMatches(newMatches);
    setSelectedResponse(null);

    if (Object.keys(newMatches).length === 4) {
      checkAnswers(newMatches);
    }
  };

  const checkAnswers = (currentMatches: Record<string, string>) => {
    let allCorrect = true;
    for (const item of LEDGER_DATA) {
      if (currentMatches[item.id] !== item.correctResponseId) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      sound.playFanfare();
      setIsCompleted(true);
      setFeedbackMsg('Ledger Balanced! All debate statements matched with respectful English responses.');
      onComplete();
    } else {
      sound.playWrong();
      setFeedbackMsg('Some entries do not balance! Look closely at the polite agreement and disagreement markers.');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setMatches({});
    setSelectedResponse(null);
    setFeedbackMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/45 backdrop-blur-xs select-none">
      <div className="w-full max-w-3xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#FFD9C7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <h2 className="text-base sm:text-lg font-extrabold text-[#4A4A5E] font-['Nunito']">
                AKL Debate Ledger: Balancing Opinions
              </h2>
            </div>
            <p className="text-[10px] sm:text-xs text-[#7A7A8E]">
              Match each ledger statement with the appropriate polite English response.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-[#FFD9C7] text-[#4A4A5E]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {/* Instructions banner */}
          <div className="bg-[#FFF1B8]/60 p-2.5 rounded-2xl flex items-center justify-between text-[11px] text-[#4A4A5E]">
            <span>
              Tap a <strong>Response Card</strong> below, then tap an open <strong>Ledger Slot</strong> to match!
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#FFFBF5] border border-[#4A4A5E]"
            >
              <RotateCcw size={10} /> Reset
            </button>
          </div>

          {/* Ledger Table */}
          <div className="space-y-2">
            {LEDGER_DATA.map(item => {
              const matchedRespId = matches[item.id];
              const matchedResp = RESPONSE_CARDS.find(r => r.id === matchedRespId);
              const isCorrect = isCompleted && matchedRespId === item.correctResponseId;

              return (
                <div
                  key={item.id}
                  className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isCorrect
                      ? 'bg-[#E8F8F5] border-[#48C9B0]'
                      : matchedResp
                      ? 'bg-[#FFF9E6] border-[#F5B041]'
                      : 'bg-white border-[#E0E0E0]'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase text-[#F5B041] block">
                      {item.speaker}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#4A4A5E]">{item.statement}</p>
                  </div>

                  {/* Slot button */}
                  <div className="w-full sm:w-72">
                    <button
                      onClick={() => handleSelectSlot(item.id)}
                      className={`w-full p-2 rounded-xl border-2 text-left text-xs font-medium transition-all ${
                        matchedResp
                          ? 'bg-[#FFFBF5] border-[#4A4A5E] text-[#4A4A5E] shadow-xs'
                          : 'border-dashed border-[#B0B0C0] bg-[#FAF8F5] text-[#8A8A9E] hover:border-[#4A4A5E]'
                      }`}
                    >
                      {matchedResp ? (
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="text-[9px] font-bold text-[#5DADE2] block">
                              [{matchedResp.category}]
                            </span>
                            <span className="text-[11px] font-bold">{matchedResp.text}</span>
                          </div>
                          <span className="text-xs text-red-500 font-bold ml-1">✕</span>
                        </div>
                      ) : (
                        <span className="italic text-[11px]">Tap to place selected response</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Response pool */}
          <div className="pt-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A8E] mb-1.5">
              Available Response Cards:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RESPONSE_CARDS.map(card => {
                const isAssigned = Object.values(matches).includes(card.id);
                const isSelected = selectedResponse === card.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      if (!isAssigned) {
                        sound.playClick();
                        setSelectedResponse(isSelected ? null : card.id);
                      }
                    }}
                    className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isAssigned
                        ? 'opacity-40 bg-gray-100 border-gray-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#FFF1B8] border-[#4A4A5E] shadow-md scale-[1.01]'
                        : 'bg-white border-[#E0E0E0] hover:border-[#BFDDF5]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#BFDDF5] text-[#4A4A5E]">
                        {card.category}
                      </span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          sound.speakPhrase(card.text);
                        }}
                        className="p-0.5 text-[#7A7A8E] hover:text-[#4A4A5E]"
                        title="Pronounce English sentence"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-[#4A4A5E]">{card.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback banner */}
          {feedbackMsg && (
            <div
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                isCompleted ? 'bg-[#E8F8F5] text-[#27AE60] border border-[#27AE60]' : 'bg-[#FDEDEC] text-[#E74C3C] border border-[#E74C3C]'
              }`}
            >
              {isCompleted && <CheckCircle2 size={15} />}
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2.5 border-t-2 border-[#FFD9C7] flex justify-between items-center">
          <span className="text-[11px] text-[#7A7A8E]">
            {Object.keys(matches).length}/4 debate transactions matched
          </span>
          {isCompleted ? (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-5 py-1.5 rounded-full bg-[#BFE8D6] text-[#4A4A5E] font-black text-xs border-2 border-[#4A4A5E] shadow-sm hover:scale-105 transition-all"
            >
              Claim Clue (+50 pts)
            </button>
          ) : (
            <button
              onClick={() => checkAnswers(matches)}
              disabled={Object.keys(matches).length < 4}
              className={`px-4 py-1.5 rounded-full font-bold text-xs border-2 border-[#4A4A5E] transition-all ${
                Object.keys(matches).length === 4
                  ? 'bg-[#FFF1B8] text-[#4A4A5E] hover:scale-105 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              }`}
            >
              Validate Balance
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
