import React from 'react';
import { sound } from '../utils/audio';
import { Search, Sparkles, X, Volume2 } from 'lucide-react';

interface InspectModalProps {
  message: string;
  clueUnlocked?: boolean;
  onClose: () => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  message,
  clueUnlocked,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/45 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col space-y-3.5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#BFDDF5]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#BFDDF5] text-[#4A4A5E]">
              <Search size={16} />
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-[#4A4A5E] font-['Nunito']">
              Scene Inspection
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => sound.speakPhrase(message)}
              className="p-1 rounded-lg hover:bg-gray-100 text-[#7A7A8E]"
              title="Pronounce inspection"
            >
              <Volume2 size={15} />
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

        <div className="p-3.5 rounded-2xl bg-[#FFFBF5] border-2 border-[#DCCFF0]">
          <p className="text-xs sm:text-sm font-bold text-[#4A4A5E] leading-relaxed">
            {message}
          </p>
        </div>

        {clueUnlocked && (
          <div className="p-2.5 rounded-2xl bg-[#E8F8F5] border-2 border-[#27AE60] flex items-center gap-2 text-xs font-black text-[#27AE60] animate-bounce">
            <Sparkles size={15} className="text-amber-500" />
            <span>New Clue Card added to your Case Dossier!</span>
          </div>
        )}

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-full bg-[#BFDDF5] text-[#4A4A5E] font-extrabold text-xs border border-[#4A4A5E] hover:scale-101 transition-all"
        >
          Understood
        </button>
      </div>
    </div>
  );
};
