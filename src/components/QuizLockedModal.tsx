import React from 'react';
import { sound } from '../utils/audio';
import { Lock, Key, ArrowRight, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { AccessibleWitness } from '../utils/gameRules';

interface QuizLockedModalProps {
  day: number;
  currentClues: number;
  requiredClues: number;
  answeredCount: number;
  totalConversations: number;
  remainingWitnesses?: AccessibleWitness[];
  onClose: () => void;
  onOpenInventory: () => void;
}

export const QuizLockedModal: React.FC<QuizLockedModalProps> = ({
  day,
  currentClues,
  requiredClues,
  answeredCount,
  totalConversations,
  remainingWitnesses = [],
  onClose,
  onOpenInventory
}) => {
  const missingClues = Math.max(0, requiredClues - currentClues);
  const missingInterviews = Math.max(0, totalConversations - answeredCount);
  const cluesDone = missingClues === 0;
  const interviewsDone = missingInterviews === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-full max-w-md bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-5 shadow-2xl flex flex-col space-y-3 text-center animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF1B8] border-2 border-[#4A4A5E] flex items-center justify-center text-amber-700 shadow-sm animate-pulse shrink-0">
          <Lock size={28} />
        </div>

        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF1B8] border border-[#4A4A5E] text-[10px] font-black text-[#4A4A5E] uppercase tracking-wider mb-1">
            <Lock size={11} /> Day {day} Assessment Requirements
          </div>
          <h3 className="font-black text-base text-[#4A4A5E]">
            Complete All Clues & Interviews First
          </h3>
          <p className="text-[11px] text-[#7A7A8E] mt-0.5">
            The Day {day} Quiz will automatically unlock and open once both conditions are met!
          </p>
        </div>

        <div className="bg-[#FFFBF5] p-3 rounded-2xl border-2 border-[#DCCFF0] text-xs text-[#555566] leading-relaxed space-y-2.5 text-left">
          {/* Requirement 1: Clues */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
            cluesDone
              ? 'bg-[#E8F8F5] border-[#27AE60]/40 text-[#1E8449]'
              : 'bg-white border-[#4A4A5E]/20 text-[#4A4A5E]'
          }`}>
            <div className="flex items-center gap-2">
              {cluesDone ? (
                <CheckCircle2 size={16} className="text-[#27AE60] shrink-0" />
              ) : (
                <AlertCircle size={16} className="text-amber-500 shrink-0" />
              )}
              <div>
                <div className="font-black text-xs">Clues Collected</div>
                <div className="text-[10px] opacity-80">
                  {cluesDone ? 'All required clues unlocked!' : `Need ${missingClues} more clue(s) for Day ${day}`}
                </div>
              </div>
            </div>
            <span className="font-black text-sm tabular-nums">
              {currentClues} / {requiredClues}
            </span>
          </div>

          {/* Requirement 2: Conversations */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
            interviewsDone
              ? 'bg-[#E8F8F5] border-[#27AE60]/40 text-[#1E8449]'
              : 'bg-white border-[#4A4A5E]/20 text-[#4A4A5E]'
          }`}>
            <div className="flex items-center gap-2">
              {interviewsDone ? (
                <CheckCircle2 size={16} className="text-[#27AE60] shrink-0" />
              ) : (
                <MessageSquare size={16} className="text-amber-500 shrink-0" />
              )}
              <div>
                <div className="font-black text-xs">Witness Interviews</div>
                <div className="text-[10px] opacity-80">
                  {interviewsDone ? 'All school witnesses interviewed!' : `Need to interview ${missingInterviews} more person(s)`}
                </div>
              </div>
            </div>
            <span className="font-black text-sm tabular-nums">
              {answeredCount} / {totalConversations}
            </span>
          </div>

          {/* Remaining Witnesses List if any */}
          {!interviewsDone && remainingWitnesses.length > 0 && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <div className="font-black text-[11px] flex items-center gap-1">
                <span>📍 Remaining Witnesses to Interview:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                {remainingWitnesses.map(w => (
                  <div key={w.id} className="text-[10px] bg-white/80 px-2 py-1 rounded-lg border border-amber-200/60 font-semibold flex items-center justify-between">
                    <span>{w.name} ({w.role})</span>
                    <span className="text-[9px] text-amber-700 font-bold ml-1">{w.locationName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenInventory();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#FFD9C7] hover:bg-[#F8C4B4] text-[#4A4A5E] font-black text-xs border-2 border-[#4A4A5E] flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <Key size={14} />
            <span>Check Clues</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#5DADE2] hover:bg-[#3498DB] text-white font-black text-xs border-2 border-[#4A4A5E] flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Continue Search</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
