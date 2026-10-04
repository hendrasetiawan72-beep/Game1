import React, { useState } from 'react';
import { CHAPTER_QUIZZES } from '../data/quizzes';
import { sound } from '../utils/audio';
import { Award, CheckCircle2, AlertCircle, ArrowRight, X, RotateCcw, CheckSquare, Square } from 'lucide-react';

interface QuizModalProps {
  chapter: 1 | 2 | 3;
  onClose: () => void;
  onCompleteQuiz: (chapter: 1 | 2 | 3, stars: number, scoreBonus: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  chapter,
  onClose,
  onCompleteQuiz
}) => {
  const questions = CHAPTER_QUIZZES[chapter];
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  const handleToggleOption = (idx: number) => {
    if (isAnswerSubmitted) return;

    if (currentQ.isMCMA) {
      sound.playClick();
      if (selectedIndices.includes(idx)) {
        setSelectedIndices(prev => prev.filter(i => i !== idx));
      } else {
        setSelectedIndices(prev => [...prev, idx]);
      }
    } else {
      // Single choice: select and submit immediately
      sound.playClick();
      const isCorrect = currentQ.correctIndices.includes(idx);
      setSelectedIndices([idx]);
      setIsAnswerSubmitted(true);

      if (isCorrect) {
        sound.playCorrect();
        setScore(prev => prev + 1);
      } else {
        sound.playWrong();
      }
    }
  };

  const handleSubmitMCMA = () => {
    if (selectedIndices.length === 0 || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    // Check if selected matches correctIndices exactly
    const correctSorted = [...currentQ.correctIndices].sort();
    const selectedSorted = [...selectedIndices].sort();
    const isCorrect =
      correctSorted.length === selectedSorted.length &&
      correctSorted.every((val, idx) => val === selectedSorted[idx]);

    if (isCorrect) {
      sound.playCorrect();
      setScore(prev => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIndices([]);
      setIsAnswerSubmitted(false);
    } else {
      sound.playFanfare();
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedIndices([]);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const starsEarned = score >= 5 ? 3 : score >= 3 ? 2 : 1;
  const scoreBonus = score * 30;

  // Evaluate correctness for feedback
  const isCurrentSelectionCorrect = () => {
    if (!isAnswerSubmitted) return false;
    const correctSorted = [...currentQ.correctIndices].sort();
    const selectedSorted = [...selectedIndices].sort();
    return (
      correctSorted.length === selectedSorted.length &&
      correctSorted.every((val, idx) => val === selectedSorted[idx])
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#DCCFF0]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-2xl bg-[#DCCFF0] text-[#4A4A5E]">
              <Award size={20} />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#4A4A5E] font-['Nunito']">
                Chapter {chapter} English Quiz
              </h2>
              <p className="text-[10px] sm:text-xs text-[#7A7A8E]">
                {currentQ?.isMCMA ? 'Multiple Choice (Select all correct options)' : 'Single Choice Evaluation'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-gray-100 text-[#4A4A5E]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-[11px] font-bold text-[#7A7A8E]">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-[#4A4A5E] font-black">Score: {score}/{questions.length}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#BFE8D6] transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="p-3.5 rounded-2xl bg-[#FFFBF5] border-2 border-[#4A4A5E]/20">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                  currentQ.isMCMA ? 'bg-[#DCCFF0] text-[#4A4A5E]' : 'bg-[#FFF1B8] text-[#4A4A5E]'
                }`}>
                  {currentQ.isMCMA ? 'MCMA (Multi-Select)' : 'Single Choice'}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-[#4A4A5E] leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedIndices.includes(idx);
                const isCorrectIndex = currentQ.correctIndices.includes(idx);

                let btnStyle = 'bg-white border-[#4A4A5E]/25 text-[#4A4A5E] hover:border-[#4A4A5E]';

                if (isAnswerSubmitted) {
                  if (isCorrectIndex) {
                    btnStyle = 'bg-[#E8F8F5] border-[#27AE60] text-[#1E8449] font-black';
                  } else if (isSelected && !isCorrectIndex) {
                    btnStyle = 'bg-[#FDEDEC] border-[#E74C3C] text-[#C0392B]';
                  } else {
                    btnStyle = 'opacity-40 bg-gray-50 border-gray-200 text-gray-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-[#FFF1B8] border-[#4A4A5E] text-[#4A4A5E] shadow-xs';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleToggleOption(idx)}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2">
                      {currentQ.isMCMA ? (
                        isSelected ? (
                          <CheckSquare size={16} className="text-[#4A4A5E] shrink-0" />
                        ) : (
                          <Square size={16} className="text-gray-400 shrink-0" />
                        )
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-[#BFDDF5] font-black text-[10px] text-[#4A4A5E] flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )}
                      <span>{opt}</span>
                    </div>

                    {isAnswerSubmitted && isCorrectIndex && (
                      <CheckCircle2 size={16} className="text-[#27AE60] shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrectIndex && (
                      <AlertCircle size={16} className="text-[#E74C3C] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* MCMA Submit Button */}
            {currentQ.isMCMA && !isAnswerSubmitted && (
              <button
                onClick={handleSubmitMCMA}
                disabled={selectedIndices.length === 0}
                className={`w-full py-2.5 rounded-full font-black text-xs border-2 border-[#4A4A5E] transition-all shadow-xs ${
                  selectedIndices.length > 0
                    ? 'bg-[#BFE8D6] text-[#4A4A5E] hover:scale-[1.01] active:scale-95 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                }`}
              >
                Confirm Selection ({selectedIndices.length} checked)
              </button>
            )}

            {/* Answer Explanation */}
            {isAnswerSubmitted && (
              <div
                className={`p-3 rounded-2xl border text-xs space-y-1 ${
                  isCurrentSelectionCorrect()
                    ? 'bg-[#E8F8F5] border-[#27AE60] text-[#1E8449]'
                    : 'bg-[#FFF9E6] border-[#F5B041] text-[#7D6608]'
                }`}
              >
                <div className="font-black uppercase tracking-wider text-[10px]">
                  {isCurrentSelectionCorrect() ? 'Correct!' : 'Key Takeaway:'}
                </div>
                <p className="font-bold">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="flex-1 overflow-y-auto py-5 text-center space-y-4">
            <div className="space-y-1">
              <span className="text-3xl">🎉</span>
              <h3 className="text-xl font-black text-[#4A4A5E] font-['Nunito']">
                Chapter {chapter} Complete!
              </h3>
              <p className="text-xs text-[#7A7A8E]">
                You scored {score} out of {questions.length} correct!
              </p>
            </div>

            {/* Score & Evaluation Badge */}
            <div className="flex justify-center py-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#E8F8F5] border-2 border-[#27AE60] text-[#1E8449]">
                <Award size={28} className="text-[#27AE60]" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-[#27AE60]">Evaluation Result</div>
                  <div className="text-base font-black">
                    {score >= 5 ? 'Grade A+ · Outstanding' : score >= 3 ? 'Grade B · Competent' : 'Grade C · Completed'}
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-block p-3 rounded-2xl bg-[#FFFBF5] border-2 border-[#4A4A5E]/20 text-xs font-bold text-[#4A4A5E]">
              Bonus Points Earned: <span className="text-green-600 font-black">+{scoreBonus} pts</span>
            </div>

            <div className="flex justify-center gap-2.5 pt-2">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-white border-2 border-[#4A4A5E] text-xs font-bold text-[#4A4A5E] hover:bg-gray-50"
              >
                <RotateCcw size={13} /> Retry
              </button>

              <button
                onClick={() => {
                  sound.playFanfare();
                  onCompleteQuiz(chapter, starsEarned, scoreBonus);
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#BFE8D6] border-2 border-[#4A4A5E] text-xs font-black text-[#4A4A5E] hover:scale-105 shadow-md"
              >
                <span>{chapter < 3 ? 'Proceed to Next Chapter' : 'Celebrate Grand Finale!'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Footer Next Button */}
        {!isFinished && isAnswerSubmitted && (
          <div className="pt-2.5 border-t-2 border-[#DCCFF0] flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#BFE8D6] text-[#4A4A5E] font-black text-xs border-2 border-[#4A4A5E] hover:scale-105 shadow-sm transition-all"
            >
              <span>{currentIdx + 1 === questions.length ? 'View Results' : 'Next Question'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
