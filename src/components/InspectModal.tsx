import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Search, Sparkles, X, Volume2, CheckCircle2, ArrowRight } from 'lucide-react';
import { InspectData } from '../types/game';

interface InspectModalProps {
  data: InspectData;
  onClose: () => void;
  onChoiceSelected?: (isCorrect: boolean, trustChange: number) => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  data,
  onClose,
  onChoiceSelected
}) => {
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  // Default thought choices if none provided
  const choices = data.choices || [
    {
      text: 'In my opinion, this clue provides an important piece of evidence.',
      isCorrect: true,
      feedback: 'Good deductive observation! "In my opinion..." introduces your reasoned view.',
      trustChange: 10
    },
    {
      text: 'From my point of view, we should examine all related workshop areas.',
      isCorrect: true,
      feedback: 'Analytical! "From my point of view..." connects physical clues logically.',
      trustChange: 10
    },
    {
      text: 'I think we can dismiss this clue without further investigation.',
      isCorrect: false,
      feedback: 'Careful! Every detail matters in a thorough investigation.',
      trustChange: -5
    }
  ];

  const handleSelect = (idx: number) => {
    setSelectedChoiceIdx(idx);
    const chosen = choices[idx];
    if (chosen.isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
    if (onChoiceSelected) {
      onChoiceSelected(chosen.isCorrect, chosen.trustChange || (chosen.isCorrect ? 10 : -5));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2.5 sm:p-4 bg-black/55 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col space-y-3.5 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#BFDDF5]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#BFDDF5] text-[#4A4A5E]">
              <Search size={16} />
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-[#4A4A5E] font-['Nunito']">
              {data.title || 'Scene Examination'}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => sound.speakPhrase(data.message)}
              className="p-1 rounded-lg hover:bg-gray-100 text-[#7A7A8E]"
              title="Pronounce inspection"
            >
              <Volume2 size={16} />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-full hover:bg-gray-100 text-[#4A4A5E]"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Observation text */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFBF5] border-2 border-[#DCCFF0]">
          <p className="text-xs sm:text-sm font-bold text-[#4A4A5E] leading-relaxed break-words">
            {data.message}
          </p>
        </div>

        {data.clueUnlocked && (
          <div className="p-2.5 rounded-2xl bg-[#E8F8F5] border-2 border-[#27AE60] flex items-center gap-2 text-xs font-black text-[#27AE60] animate-bounce">
            <Sparkles size={15} className="text-amber-500 shrink-0" />
            <span>New Clue Card added to your Case Dossier!</span>
          </div>
        )}

        {/* Interactive Reflection Choices */}
        {selectedChoiceIdx === null ? (
          <div className="space-y-2 pt-1">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#7A7A8E]">
              Formulate Your Opinion:
            </p>
            {choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full p-2.5 sm:p-3 rounded-2xl border-2 border-[#4A4A5E] bg-white hover:bg-[#FFF9E6] text-left transition-all active:scale-[0.98] shadow-xs group"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#BFDDF5] font-black text-xs text-[#4A4A5E] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#FFF1B8]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#4A4A5E] leading-snug break-words">
                      {choice.text}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2.5 pt-1">
            <div
              className={`p-3 rounded-2xl border-2 ${
                choices[selectedChoiceIdx].isCorrect
                  ? 'bg-[#E8F8F5] border-[#27AE60] text-[#1E8449]'
                  : 'bg-[#FDEDEC] border-[#E74C3C] text-[#C0392B]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 size={16} className={choices[selectedChoiceIdx].isCorrect ? 'text-[#27AE60]' : 'text-[#E74C3C]'} />
                <span className="text-[11px] font-black uppercase tracking-wider">
                  {choices[selectedChoiceIdx].isCorrect ? 'Thoughtful Perspective!' : 'Investigation Tip'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold leading-relaxed break-words">
                {choices[selectedChoiceIdx].feedback}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-full py-2.5 sm:py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <span>Continue Investigation</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
