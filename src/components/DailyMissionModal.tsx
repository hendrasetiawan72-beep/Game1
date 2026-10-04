import React, { useState } from 'react';
import { DailyMissionData, DailyMissionState } from '../utils/dailyMission';
import { sound } from '../utils/audio';
import { Flame, CheckCircle2, AlertCircle, X, Award, Send, Calendar, BookOpen } from 'lucide-react';

interface DailyMissionModalProps {
  mission: DailyMissionData;
  missionState: DailyMissionState;
  onComplete: () => void;
  onClose: () => void;
}

export const DailyMissionModal: React.FC<DailyMissionModalProps> = ({
  mission,
  missionState,
  onComplete,
  onClose
}) => {
  const isAlreadyDone = missionState.lastCompletedDate === mission.dateStr;
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(isAlreadyDone);

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted) return;
    setSelectedOptId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptId || hasSubmitted) return;
    const chosen = mission.options.find(o => o.id === selectedOptId);
    if (!chosen) return;

    setHasSubmitted(true);
    if (chosen.isBest) {
      sound.playFanfare();
      onComplete();
    } else {
      sound.playWrong();
    }
  };

  const selectedOpt = mission.options.find(o => o.id === selectedOptId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto">
      <div className="w-full max-w-lg bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-4 my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#BFDDF5]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-[#4A4A5E] flex items-center justify-center text-white shadow-sm shrink-0">
              <Flame size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-black text-sm sm:text-base text-[#4A4A5E] font-['Nunito']">
                  Daily English Mission
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF1B8] border border-[#4A4A5E]/20 text-[10px] font-black text-[#4A4A5E] flex items-center gap-1">
                  <Flame size={11} className="text-orange-500 fill-orange-400" />
                  Streak: {missionState.currentStreak} Days
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#7A7A8E] font-bold flex items-center gap-1 mt-0.5">
                <Calendar size={11} /> {mission.dateStr} · {mission.department}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 text-[#4A4A5E]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Badge */}
        {isAlreadyDone && (
          <div className="p-3 rounded-2xl bg-[#E8F8F5] border-2 border-[#27AE60] flex items-center gap-2 text-xs font-black text-[#1E8449]">
            <CheckCircle2 size={18} className="text-[#27AE60] shrink-0" />
            <span>Today's Daily Mission has been completed! Daily Streak maintained: +50 Bonus Points credited.</span>
          </div>
        )}

        {/* Mission Briefing Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFFBF5] to-[#BFDDF5]/20 border-2 border-[#DCCFF0] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#5DADE2] flex items-center gap-1">
              <BookOpen size={12} /> {mission.category}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFF1B8] border border-[#4A4A5E]/20 text-[10px] font-black text-[#4A4A5E]">
              +50 pts bonus
            </span>
          </div>

          <h3 className="font-extrabold text-xs sm:text-sm text-[#4A4A5E] leading-snug">
            {mission.title}
          </h3>

          <p className="text-xs text-[#555566] leading-relaxed">
            {mission.scenario}
          </p>

          <div className="p-2.5 rounded-xl bg-white border border-[#4A4A5E]/15 font-bold text-xs text-[#4A4A5E]">
            👉 <em>{mission.prompt}</em>
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7A7A8E]">
            Select Your Formulation:
          </span>
          {mission.options.map(opt => {
            const isSelected = selectedOptId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={hasSubmitted}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'border-[#5DADE2] bg-[#EBF5FB] shadow-sm'
                    : 'border-[#4A4A5E]/30 bg-white hover:border-[#4A4A5E]'
                } ${hasSubmitted ? 'cursor-default' : 'active:scale-[0.99]'}`}
              >
                <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'bg-[#5DADE2] text-white' : 'bg-gray-100 text-[#4A4A5E]'
                }`}>
                  {opt.id}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#4A4A5E] leading-snug flex-1">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result Feedback when submitted */}
        {hasSubmitted && selectedOpt && (
          <div className={`p-3.5 rounded-2xl border-2 space-y-1 ${
            selectedOpt.isBest
              ? 'bg-[#E8F8F5] border-[#27AE60] text-[#1E8449]'
              : 'bg-[#FDEDEC] border-[#E74C3C] text-[#C0392B]'
          }`}>
            <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider">
              {selectedOpt.isBest ? (
                <>
                  <CheckCircle2 size={16} /> Exemplary English Opinion!
                </>
              ) : (
                <>
                  <AlertCircle size={16} /> Language Coaching
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed font-bold">
              {selectedOpt.feedback}
            </p>
          </div>
        )}

        {/* Action Button */}
        {!hasSubmitted ? (
          <button
            type="button"
            disabled={!selectedOptId}
            onClick={handleSubmit}
            className="w-full py-3 rounded-full bg-[#5DADE2] hover:bg-[#3498DB] disabled:opacity-50 text-white font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Send size={15} />
            <span>Submit Daily Response (+50 Pts)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2.5 sm:py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <CheckCircle2 size={16} />
            <span>Keep Up the Streak!</span>
          </button>
        )}
      </div>
    </div>
  );
};
