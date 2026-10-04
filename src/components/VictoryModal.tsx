import React from 'react';
import { GameState } from '../types/game';
import { sound } from '../utils/audio';
import { Award, Trophy, Star, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';

interface VictoryModalProps {
  gameState: GameState;
  playerName: string;
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ gameState, playerName, onPlayAgain }) => {
  const totalStars = Object.values(gameState.chapterStars).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs overflow-y-auto select-none">
      <div className="w-full max-w-xl bg-[#FFFDF9] border-4 border-[#4A4A5E] rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col space-y-4 my-auto text-center animate-in zoom-in-95 duration-300">
        {/* Confetti & Golden Trophy Banner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF1B8] border-2 border-[#4A4A5E] text-[11px] font-black text-[#4A4A5E] shadow-xs">
            <Sparkles size={13} className="text-amber-500" />
            <span>25th Silver Jubilee • SMK Muhammadiyah Bawang</span>
          </div>

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#FFF1B8] to-[#FFD9C7] border-3 border-[#4A4A5E] flex items-center justify-center shadow-md animate-bounce">
            <Trophy size={42} className="text-amber-500 fill-amber-400 drop-shadow-sm" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#4A4A5E] font-['Nunito'] tracking-tight">
            The Golden Mystery Revealed!
          </h1>
          <p className="text-xs text-[#7A7A8E] max-w-sm mx-auto">
            Senior Rafi secretly restored the Golden Trophy with 25th anniversary laurels as an authorized surprise gift!
          </p>
        </div>

        {/* Award Certificate */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#BFE8D6]/40 via-[#BFDDF5]/40 to-[#DCCFF0]/40 border-2 border-[#4A4A5E] space-y-2 shadow-inner">
          <div className="flex items-center justify-center gap-1.5">
            <Award size={20} className="text-[#27AE60]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#4A4A5E]">
              Official Award Certificate
            </span>
          </div>

          <p className="text-base sm:text-lg font-black text-[#4A4A5E]">
            {playerName}
          </p>
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#FFF1B8] border border-[#4A4A5E] font-black text-[11px] text-[#4A4A5E]">
            🏅 BEST COMMUNICATOR BADGE OF HONOR
          </div>

          <p className="text-[11px] text-[#555566] italic max-w-xs mx-auto leading-relaxed">
            "For proving that disagreement without listening causes misunderstanding, while polite opinions and respectful dialogue build community and trust."
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[9px] uppercase font-bold text-[#7A7A8E] block">Final Score</span>
            <span className="text-lg font-black text-[#4A4A5E]">{gameState.score}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[9px] uppercase font-bold text-[#7A7A8E] block">Stars Earned</span>
            <div className="flex items-center justify-center gap-0.5 text-amber-500 font-black text-sm mt-0.5">
              <Star size={14} className="fill-amber-400" />
              <span>{totalStars} / 9</span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[9px] uppercase font-bold text-[#7A7A8E] block">School Trust</span>
            <span className="text-lg font-black text-[#27AE60]">{gameState.trustMeter}%</span>
          </div>
        </div>

        {/* Mastered Skills List */}
        <div className="p-3 rounded-2xl bg-[#FFFBF5] border-2 border-[#4A4A5E]/20 text-left space-y-1 text-xs">
          <span className="font-extrabold text-[#4A4A5E] block uppercase tracking-wider text-[9px]">
            Mastered English Expressions:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#555566]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-500 shrink-0" />
              <span>In my opinion... / I think...</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-500 shrink-0" />
              <span>I couldn't agree more!</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-500 shrink-0" />
              <span>I see your point, but...</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-500 shrink-0" />
              <span>You're partly right, but...</span>
            </div>
          </div>
        </div>

        {/* Play Again */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="w-full py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all"
        >
          <RotateCcw size={15} />
          <span>Play Again / New Investigation</span>
        </button>
      </div>
    </div>
  );
};
