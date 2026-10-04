import React from 'react';
import { sound } from '../utils/audio';
import { Star, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ChapterEndModalProps {
  completedChapter: 1 | 2;
  stars: number;
  cluesCount: number;
  onAdvanceChapter: () => void;
}

export const ChapterEndModal: React.FC<ChapterEndModalProps> = ({
  completedChapter,
  stars,
  cluesCount,
  onAdvanceChapter
}) => {
  const nextChapter = (completedChapter + 1) as 2 | 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col space-y-4 text-center animate-in zoom-in-95 duration-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1B8] border border-[#4A4A5E] text-[11px] font-black text-[#4A4A5E]">
            <Sparkles size={13} className="text-amber-500" />
            <span>Day {completedChapter} Complete!</span>
          </div>
          <h2 className="text-xl font-black text-[#4A4A5E] font-['Nunito'] pt-0.5">
            {completedChapter === 1 ? 'Initial Clues Gathered' : 'Evidence Leads Uncovered'}
          </h2>
          <p className="text-xs text-[#7A7A8E]">
            {completedChapter === 1
              ? 'You investigated the courtyard and AKL lab. The mystery deepens!'
              : 'You assisted Otomotif and TJKT labs. The evidence points towards Senior Rafi!'}
          </p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 py-0.5">
          {[1, 2, 3].map(s => (
            <Star
              key={s}
              size={32}
              className={`${
                s <= stars ? 'text-amber-400 fill-amber-400 scale-110' : 'text-gray-300'
              } transition-all`}
            />
          ))}
        </div>

        <div className="p-3 rounded-2xl bg-[#FFFBF5] border-2 border-[#4A4A5E]/20 text-xs space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-green-700 font-bold">
            <CheckCircle2 size={15} />
            <span>Chapter {completedChapter} Quiz Completed ({stars} Stars)</span>
          </div>
          <div className="flex items-center gap-2 text-[#4A4A5E] font-bold">
            <CheckCircle2 size={15} />
            <span>{cluesCount} Clue Cards Collected in Dossier</span>
          </div>
          <div className="flex items-center gap-2 text-[#4A4A5E] font-bold">
            <CheckCircle2 size={15} />
            <span>
              {completedChapter === 1
                ? 'Tomorrow: Investigate Otomotif & TJKT departments'
                : 'Tomorrow: The 25th Anniversary Grand Debate in the Courtyard!'}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playFanfare();
            onAdvanceChapter();
          }}
          className="w-full py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
        >
          <span>Begin Day {nextChapter}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
