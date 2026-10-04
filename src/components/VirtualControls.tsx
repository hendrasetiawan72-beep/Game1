import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface VirtualControlsProps {
  onDirectionChange: (dir: { x: number; y: number } | null) => void;
  onInteract: () => void;
  isNearbyInteractable: boolean;
  isVisible: boolean; // Hide completely when any modal or dialogue is active
}

export const VirtualControls: React.FC<VirtualControlsProps> = ({
  onDirectionChange,
  onInteract,
  isNearbyInteractable,
  isVisible
}) => {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  if (!isVisible) {
    return null;
  }

  const handleDirStart = (e: React.TouchEvent | React.MouseEvent, x: number, y: number, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDir(name);
    sound.playStep();
    onDirectionChange({ x, y });
  };

  const handleDirEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDir(null);
    onDirectionChange(null);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none z-20 flex flex-col justify-end p-2 sm:p-4 select-none">
      {/* Desktop Helper Badge (only visible on md+ screens) */}
      <div className="hidden md:flex justify-center mb-1.5">
        <div className="px-3 py-0.5 rounded-full bg-[#FFFBF5]/90 border border-[#4A4A5E]/20 text-[10px] font-bold text-[#7A7A8E] shadow-xs backdrop-blur-xs">
          Desktop: <span className="text-[#4A4A5E]">WASD / Arrow Keys</span> to walk • <span className="text-[#4A4A5E]">Space / E</span> to interact
        </div>
      </div>

      {/* Mobile-First Touch Controls Dock */}
      <div className="flex items-end justify-between w-full pointer-events-auto max-w-5xl mx-auto px-1">
        {/* Floating D-Pad on bottom-left */}
        <div
          className="relative w-28 h-28 sm:w-32 sm:h-32 bg-[#FFFDF9]/85 backdrop-blur-md border-2 border-[#4A4A5E]/40 rounded-3xl p-1 shadow-lg flex items-center justify-center touch-none"
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* UP */}
          <button
            onTouchStart={(e) => handleDirStart(e, 0, -1, 'up')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, 0, -1, 'up')}
            onMouseUp={handleDirEnd}
            className={`absolute top-1 w-9 h-8 sm:w-10 sm:h-9 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'up' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/90 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowUp size={16} className="text-[#4A4A5E]" />
          </button>

          {/* DOWN */}
          <button
            onTouchStart={(e) => handleDirStart(e, 0, 1, 'down')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, 0, 1, 'down')}
            onMouseUp={handleDirEnd}
            className={`absolute bottom-1 w-9 h-8 sm:w-10 sm:h-9 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'down' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/90 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowDown size={16} className="text-[#4A4A5E]" />
          </button>

          {/* LEFT */}
          <button
            onTouchStart={(e) => handleDirStart(e, -1, 0, 'left')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, -1, 0, 'left')}
            onMouseUp={handleDirEnd}
            className={`absolute left-1 w-8 h-9 sm:w-9 sm:h-10 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'left' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/90 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowLeft size={16} className="text-[#4A4A5E]" />
          </button>

          {/* RIGHT */}
          <button
            onTouchStart={(e) => handleDirStart(e, 1, 0, 'right')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, 1, 0, 'right')}
            onMouseUp={handleDirEnd}
            className={`absolute right-1 w-8 h-9 sm:w-9 sm:h-10 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'right' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/90 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowRight size={16} className="text-[#4A4A5E]" />
          </button>

          {/* Center Hub */}
          <div className="w-6 h-6 rounded-full bg-[#DCCFF0] border border-[#4A4A5E]/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#4A4A5E]" />
          </div>
        </div>

        {/* Action Button: TALK / INTERACT on bottom-right */}
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            sound.playClick();
            onInteract();
          }}
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onInteract();
          }}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-[#4A4A5E] shadow-xl flex flex-col items-center justify-center transition-all active:scale-90 ${
            isNearbyInteractable
              ? 'bg-[#BFE8D6] text-[#4A4A5E] scale-105 animate-pulse shadow-green-300 ring-4 ring-[#BFE8D6]/50'
              : 'bg-[#FFFDF9]/90 text-[#7A7A8E] hover:bg-[#FFF1B8]'
          }`}
        >
          <MessageSquare size={22} className={isNearbyInteractable ? 'text-[#1E8449]' : 'text-[#4A4A5E]'} />
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">
            {isNearbyInteractable ? 'Talk' : 'Action'}
          </span>
        </button>
      </div>
    </div>
  );
};
