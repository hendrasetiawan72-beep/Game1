import React, { useState } from 'react';
import { DialogueChoice, DialogueNode } from '../types/game';
import { sound } from '../utils/audio';
import { Volume2, Key, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface DialogueModalProps {
  node: DialogueNode;
  onChoiceSelected: (choice: DialogueChoice) => void;
  onClose: () => void;
  trustMeter: number;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({
  node,
  onChoiceSelected,
  onClose,
  trustMeter
}) => {
  const [selectedChoice, setSelectedChoice] = useState<DialogueChoice | null>(null);

  const handleSelect = (choice: DialogueChoice) => {
    setSelectedChoice(choice);
    if (choice.isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleContinue = () => {
    if (!selectedChoice) return;
    sound.playClick();
    onChoiceSelected(selectedChoice);
    setSelectedChoice(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/55 backdrop-blur-xs select-none">
      <div className="w-full max-w-xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-3.5 sm:p-5 shadow-2xl flex flex-col space-y-3 max-h-[82vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Speaker Info Header */}
        <div className="flex items-center justify-between border-b-2 border-[#BFDDF5] pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#BFDDF5] border-2 border-[#4A4A5E] flex items-center justify-center font-black text-sm sm:text-base text-[#4A4A5E] shadow-xs shrink-0">
              {node.speaker.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-sm sm:text-base text-[#4A4A5E] font-['Nunito'] truncate">
                  {node.speaker}
                </h3>
                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF1B8] text-[#4A4A5E] border border-[#4A4A5E]/20 truncate">
                  {node.speakerRole}
                </span>
              </div>
              <span className="text-[10px] text-[#7A7A8E] font-bold block">
                Trust Meter: <span className="text-[#4A4A5E] font-black">{trustMeter}%</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => sound.speakPhrase(node.text)}
              className="p-1.5 rounded-xl bg-[#FFFBF5] border border-[#4A4A5E]/30 hover:bg-[#BFDDF5] text-[#4A4A5E] transition-all"
              title="Pronounce dialogue in English"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>

        {/* NPC Dialogue Statement */}
        <div className="bg-[#FFFBF5] p-3 sm:p-3.5 rounded-2xl border-2 border-[#DCCFF0] shadow-inner">
          <p className="text-xs sm:text-sm font-bold text-[#4A4A5E] leading-relaxed break-words">
            "{node.text}"
          </p>
        </div>

        {/* Choices / Feedback */}
        {!selectedChoice ? (
          <div className="space-y-2 pt-0.5">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#7A7A8E]">
              Choose Your Response:
            </p>
            {node.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(choice)}
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
          /* Feedback Card */
          <div className="space-y-2.5 pt-0.5">
            <div
              className={`p-3 sm:p-3.5 rounded-2xl border-2 ${
                selectedChoice.isCorrect
                  ? 'bg-[#E8F8F5] border-[#27AE60] text-[#1E8449]'
                  : 'bg-[#FDEDEC] border-[#E74C3C] text-[#C0392B]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                {selectedChoice.isCorrect ? (
                  <CheckCircle2 size={16} className="text-[#27AE60] shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-[#E74C3C] shrink-0" />
                )}
                <span className="text-[11px] font-black uppercase tracking-wider">
                  {selectedChoice.isCorrect ? 'Appropriate English!' : 'Communication Advice'}
                </span>
                <span
                  className={`text-[10px] font-black ml-auto px-2 py-0.5 rounded-full ${
                    selectedChoice.trustChange >= 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {selectedChoice.trustChange >= 0 ? `+${selectedChoice.trustChange}` : selectedChoice.trustChange} Trust
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold leading-relaxed break-words">
                {selectedChoice.feedback}
              </p>

              {selectedChoice.unlockClueId && (
                <div className="mt-2 p-1.5 rounded-xl bg-white/90 border border-green-300 flex items-center gap-1.5 text-xs font-black text-green-800">
                  <Key size={13} className="text-amber-500 shrink-0" />
                  <span>New Clue Card Added to Inventory!</span>
                </div>
              )}
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-2.5 sm:py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
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
