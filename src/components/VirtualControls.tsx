import React, { useState } from 'react';
import { MessageSquare, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, DoorOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { ZoneId } from '../types/game';

interface VirtualControlsProps {
  onDirectionChange: (dir: { x: number; y: number } | null) => void;
  onInteract: () => void;
  isNearbyInteractable: boolean;
  isVisible: boolean; // Auto-hidden when dialogue or any modal is open
  currentZone?: ZoneId;
  onExitToCourtyard?: () => void;
}

export const VirtualControls: React.FC<VirtualControlsProps> = ({
  onDirectionChange,
  onInteract,
  isNearbyInteractable,
  isVisible,
  currentZone,
  onExitToCourtyard
}) => {
  const [activeDir, setActiveDir] = useState<string | null>(null);
  const lastActionTime = React.useRef<number>(0);

  if (!isVisible) {
    return null;
  }

  const handleActionClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - lastActionTime.current < 450) return;
    lastActionTime.current = now;
    sound.playClick();
    onInteract();
  };

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

  const isInLab = currentZone && currentZone !== 'courtyard';

  return (
    <div className="absolute inset-x-0 bottom-8 sm:bottom-6 pointer-events-none z-20 flex flex-col justify-end px-3 sm:px-6 select-none">
      {/* Desktop Helper Guide (hidden on mobile) */}
      <div className="hidden md:flex justify-center mb-2">
        <div className="px-3.5 py-1 rounded-full bg-[#FFFDF9]/95 border border-[#4A4A5E]/20 text-[11px] font-bold text-[#7A7A8E] shadow-sm backdrop-blur-xs">
          Desktop: <span className="text-[#4A4A5E]">WASD / Arrow Keys</span> to walk · <span className="text-[#4A4A5E]">Space / E</span> to interact
        </div>
      </div>

      {/* Floating Mobile-First Controls Dock (Elevated position to prevent thumb cramping at bottom edge) */}
      <div className="flex items-end justify-between w-full pointer-events-auto max-w-5xl mx-auto">
        {/* Floating D-Pad on bottom-left */}
        <div
          className="relative w-28 h-28 sm:w-32 sm:h-32 bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#4A4A5E]/40 rounded-3xl p-1 shadow-2xl flex items-center justify-center touch-none select-none ring-2 ring-black/5"
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* UP */}
          <button
            onTouchStart={(e) => handleDirStart(e, 0, -1, 'up')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, 0, -1, 'up')}
            onMouseUp={handleDirEnd}
            aria-label="Move Up"
            className={`absolute top-1 w-9 h-8 sm:w-10 sm:h-9 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'up' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/95 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowUp size={18} className="text-[#4A4A5E]" />
          </button>

          {/* DOWN */}
          <button
            onTouchStart={(e) => handleDirStart(e, 0, 1, 'down')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, 0, 1, 'down')}
            onMouseUp={handleDirEnd}
            aria-label="Move Down"
            className={`absolute bottom-1 w-9 h-8 sm:w-10 sm:h-9 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'down' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/95 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowDown size={18} className="text-[#4A4A5E]" />
          </button>

          {/* LEFT */}
          <button
            onTouchStart={(e) => handleDirStart(e, -1, 0, 'left')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, -1, 0, 'left')}
            onMouseUp={handleDirEnd}
            aria-label="Move Left"
            className={`absolute left-1 w-8 h-9 sm:w-9 sm:h-10 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'left' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/95 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowLeft size={18} className="text-[#4A4A5E]" />
          </button>

          {/* RIGHT */}
          <button
            onTouchStart={(e) => handleDirStart(e, 1, 0, 'right')}
            onTouchEnd={handleDirEnd}
            onMouseDown={(e) => handleDirStart(e, 1, 0, 'right')}
            onMouseUp={handleDirEnd}
            aria-label="Move Right"
            className={`absolute right-1 w-8 h-9 sm:w-9 sm:h-10 rounded-xl flex items-center justify-center border border-[#4A4A5E]/20 transition-all ${
              activeDir === 'right' ? 'bg-[#FFF1B8] scale-95 shadow-inner' : 'bg-white/95 active:bg-[#FFF1B8]'
            }`}
          >
            <ArrowRight size={18} className="text-[#4A4A5E]" />
          </button>

          {/* Center Hub */}
          <div className="w-6 h-6 rounded-full bg-[#DCCFF0] border border-[#4A4A5E]/30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4A4A5E]" />
          </div>
        </div>

        {/* Right Floating Stack: Optional Exit Button + Action/Interact Button */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          {/* Dedicated Floating Exit Button when inside a lab */}
          {isInLab && onExitToCourtyard && (
            <button
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                sound.playSparkle();
                onExitToCourtyard();
              }}
              onClick={(e) => {
                e.stopPropagation();
                sound.playSparkle();
                onExitToCourtyard();
              }}
              aria-label="Exit to Courtyard"
              className="px-3.5 py-1.5 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] border-2 border-[#4A4A5E] text-[#1E8449] font-black text-xs shadow-xl flex items-center gap-1.5 active:scale-95 transition-all animate-pulse"
            >
              <DoorOpen size={16} />
              <span>Exit to Courtyard</span>
            </button>
          )}

          {/* Floating Action Button: TALK / INTERACT / ENTER */}
          <button
            onTouchStart={handleActionClick}
            onClick={handleActionClick}
            aria-label="Action button"
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-[#4A4A5E] shadow-2xl flex flex-col items-center justify-center transition-all active:scale-90 ${
              isNearbyInteractable
                ? 'bg-[#BFE8D6] text-[#4A4A5E] scale-105 animate-pulse ring-4 ring-[#BFE8D6]/60'
                : 'bg-[#FFFDF9]/95 text-[#7A7A8E] hover:bg-[#FFF1B8]'
            }`}
          >
            {isNearbyInteractable ? (
              <MessageSquare size={22} className="text-[#1E8449]" />
            ) : (
              <DoorOpen size={20} className="text-[#4A4A5E]" />
            )}
            <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">
              {isNearbyInteractable ? 'Interact' : 'Action'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
