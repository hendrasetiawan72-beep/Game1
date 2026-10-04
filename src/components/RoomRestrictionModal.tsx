import React from 'react';
import { sound } from '../utils/audio';
import { ShieldAlert, ArrowRight, DoorClosed } from 'lucide-react';
import { MajorType } from '../types/game';

interface RoomRestrictionModalProps {
  studentMajor: MajorType;
  attemptedLab: string;
  assignedLab: string;
  onClose: () => void;
}

export const RoomRestrictionModal: React.FC<RoomRestrictionModalProps> = ({
  studentMajor,
  attemptedLab,
  assignedLab,
  onClose
}) => {
  const handleUnderstood = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sound.playClick();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-full max-w-md bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-5 shadow-2xl flex flex-col space-y-3.5 text-center animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FDEDEC] border-2 border-[#E74C3C] flex items-center justify-center text-[#C0392B] shadow-sm animate-pulse">
          <DoorClosed size={28} />
        </div>

        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDEDEC] border border-[#E74C3C] text-[10px] font-black text-[#C0392B] uppercase tracking-wider mb-1">
            <ShieldAlert size={12} /> Restricted Laboratory Access
          </div>
          <h3 className="font-black text-base text-[#4A4A5E]">
            Assigned Room Required
          </h3>
        </div>

        <div className="bg-[#FFFBF5] p-3.5 rounded-2xl border-2 border-[#DCCFF0] text-xs text-[#555566] leading-relaxed space-y-1.5 text-left">
          <p>
            You are enrolled in the <strong className="text-[#4A4A5E]">{studentMajor} Department</strong>.
          </p>
          <p>
            You attempted to enter the <span className="text-[#C0392B] font-bold">{attemptedLab}</span>, but school regulations require students to conduct room investigations in their own department:
          </p>
          <div className="p-2.5 rounded-xl bg-white border border-[#4A4A5E]/20 text-[11px] font-bold text-[#4A4A5E] flex items-center justify-between shadow-xs">
            <span>Your Assigned Lab:</span>
            <span className="text-[#1E8449] font-black">{assignedLab}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUnderstood}
          onTouchEnd={handleUnderstood}
          className="w-full py-3 rounded-full bg-[#5DADE2] hover:bg-[#3498DB] active:bg-[#2980B9] text-white font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer hover:shadow-lg"
        >
          <span>Understood, Go to {assignedLab}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
