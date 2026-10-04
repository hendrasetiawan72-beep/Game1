import React from 'react';
import { AnsweredNPCRecord } from '../types/game';
import { sound } from '../utils/audio';
import { CheckCircle2, MessageSquare, Volume2, X, Award, FileCheck } from 'lucide-react';

interface ReviewedDialogueModalProps {
  record: AnsweredNPCRecord;
  onClose: () => void;
}

export const ReviewedDialogueModal: React.FC<ReviewedDialogueModalProps> = ({
  record,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col space-y-3.5 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#BFDDF5]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#BFE8D6] border-2 border-[#4A4A5E] flex items-center justify-center font-black text-base text-[#1E8449] shadow-xs shrink-0 animate-bounce">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-sm sm:text-base text-[#4A4A5E] font-['Nunito']">
                  {record.speaker}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF1B8] text-[#4A4A5E] border border-[#4A4A5E]/20">
                  {record.speakerRole}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#27AE60] flex items-center gap-1 mt-0.5">
                <FileCheck size={11} /> Interview Completed · Day {record.chapter}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => sound.speakPhrase(`${record.questionText} ${record.chosenAnswer}`)}
              className="p-1.5 rounded-xl bg-[#FFFBF5] border border-[#4A4A5E]/30 hover:bg-[#BFDDF5] text-[#4A4A5E] transition-all"
              title="Pronounce interview statement"
            >
              <Volume2 size={16} />
            </button>
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
        </div>

        {/* Notice info banner */}
        <div className="p-2.5 rounded-2xl bg-[#E8F8F5] border-2 border-[#27AE60] flex items-center gap-2 text-xs font-bold text-[#1E8449]">
          <Award size={16} className="text-[#27AE60] shrink-0" />
          <span>You already completed this interview today. Your statement has been entered into the case log.</span>
        </div>

        {/* Question Discussed */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7A7A8E] flex items-center gap-1">
            <MessageSquare size={11} /> Witness Statement:
          </span>
          <div className="bg-[#FFFBF5] p-3 rounded-2xl border-2 border-[#DCCFF0]">
            <p className="text-xs sm:text-sm font-bold text-[#4A4A5E] leading-relaxed break-words">
              "{record.questionText}"
            </p>
          </div>
        </div>

        {/* Player's Recorded Answer */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#27AE60] flex items-center gap-1">
            <CheckCircle2 size={11} /> Your Recorded Response (English Opinion):
          </span>
          <div className="bg-[#F4FBF7] p-3 rounded-2xl border-2 border-[#27AE60]">
            <p className="text-xs sm:text-sm font-bold text-[#1E8449] leading-relaxed break-words">
              "{record.chosenAnswer}"
            </p>
          </div>
        </div>

        {/* Teacher/Witness Feedback */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7A7A8E]">
            Witness Reaction & Analysis:
          </span>
          <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#4A4A5E]/20 text-xs sm:text-sm font-bold text-[#555566] leading-relaxed break-words">
            {record.feedback}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-2.5 sm:py-3 rounded-full bg-[#BFDDF5] hover:bg-[#A9CCE3] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-sm active:scale-95 transition-all mt-1"
        >
          Return to Investigation
        </button>
      </div>
    </div>
  );
};
