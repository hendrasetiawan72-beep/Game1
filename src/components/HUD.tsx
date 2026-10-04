import React from 'react';
import { GameState, ZoneId } from '../types/game';
import { sound } from '../utils/audio';
import { BookOpen, HelpCircle, Key, Star, Volume2, VolumeX, Award, Clock, LogOut } from 'lucide-react';
import { MAP_ZONES } from '../game/mapData';

interface HUDProps {
  gameState: GameState;
  currentZone: ZoneId;
  playerName: string;
  studentClass: string;
  elapsedSeconds: number;
  onExitToCourtyard: () => void;
  onOpenPhraseBank: () => void;
  onOpenInventory: () => void;
  onOpenQuiz: () => void;
  onRestart: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  gameState,
  currentZone,
  playerName,
  studentClass,
  elapsedSeconds,
  onExitToCourtyard,
  onOpenPhraseBank,
  onOpenInventory,
  onOpenQuiz,
  onRestart
}) => {
  const [muted, setMuted] = React.useState<boolean>(!sound.isEnabled());
  const zoneInfo = MAP_ZONES[currentZone];

  const toggleSound = () => {
    const next = !muted;
    sound.setSoundEnabled(!next);
    setMuted(next);
    if (!next) sound.playClick();
  };

  const isQuizReady = !gameState.completedQuizzes[gameState.currentChapter];

  // Format elapsed seconds as MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="absolute top-1.5 sm:top-2 inset-x-1.5 sm:inset-x-2 z-30 pointer-events-none select-none">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#4A4A5E] rounded-2xl sm:rounded-3xl p-2 sm:px-4 shadow-md pointer-events-auto">
        {/* Left: Day, Zone Info, Student & Timer */}
        <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="px-2 py-0.5 rounded-xl bg-[#FFF1B8] border border-[#4A4A5E] text-[#4A4A5E] font-black text-xs shrink-0">
              Day {gameState.currentChapter}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h1 className="font-extrabold text-xs sm:text-sm text-[#4A4A5E] font-['Nunito'] truncate max-w-[130px] sm:max-w-none">
                  {zoneInfo?.name || 'SMK Muhiba'}
                </h1>
              </div>
              <div className="text-[10px] text-[#7A7A8E] font-bold truncate max-w-[120px] sm:max-w-none">
                {playerName} · <span className="text-[#4A4A5E]">{studentClass}</span>
              </div>
            </div>
          </div>

          {/* Running Timer */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-[#FFFBF5] border border-[#4A4A5E]/20 text-[11px] font-bold text-[#4A4A5E] shrink-0">
            <Clock size={12} className="text-[#5DADE2]" />
            <span className="font-mono tabular-nums">{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Trust Meter Progress Bar */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
            <span className="text-[10px] font-bold text-[#7A7A8E]">Trust:</span>
            <div className="w-14 sm:w-20 h-2 rounded-full bg-gray-200 border border-[#4A4A5E]/30 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#FFD9C7] via-[#FFF1B8] to-[#BFE8D6] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, gameState.trustMeter))}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-[#4A4A5E]">{gameState.trustMeter}%</span>
          </div>
        </div>

        {/* Right: Actions, Quick Exit, Clues, Quiz */}
        <div className="flex items-center justify-between sm:justify-end gap-1 overflow-x-auto pt-0.5 sm:pt-0">
          {/* Prominent Exit to Courtyard Button when inside any lab */}
          {currentZone !== 'courtyard' && (
            <button
              onClick={() => {
                sound.playSparkle();
                onExitToCourtyard();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] border-2 border-[#4A4A5E] text-[#1E8449] font-black text-[11px] shadow-xs active:scale-95 transition-all shrink-0 animate-pulse"
              title="Return to Courtyard"
            >
              <LogOut size={12} />
              <span>Exit to Courtyard</span>
            </button>
          )}

          {/* Score & Stars */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-[#FFFBF5] border border-[#4A4A5E]/20 text-[11px] font-bold text-[#4A4A5E] shrink-0">
            <Star size={12} className="text-amber-500 fill-amber-400" />
            <span>{gameState.score}</span>
            <div className="flex items-center gap-0.5 ml-0.5">
              {[1, 2, 3].map(ch => (
                <div
                  key={ch}
                  className={`w-2.5 h-2.5 rounded-full flex items-center justify-center text-[7px] font-black ${
                    gameState.chapterStars[ch as 1 | 2 | 3] > 0
                      ? 'bg-amber-400 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  title={`Chapter ${ch}: ${gameState.chapterStars[ch as 1 | 2 | 3]} stars`}
                >
                  ★
                </div>
              ))}
            </div>
          </div>

          {/* Phrase Bank */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenPhraseBank();
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#BFDDF5] border border-[#4A4A5E] text-[#4A4A5E] font-bold text-[11px] active:scale-95 transition-all shadow-xs shrink-0"
            title="English Phrases"
          >
            <BookOpen size={12} />
            <span className="hidden sm:inline">Phrases</span>
          </button>

          {/* Clues */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenInventory();
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFD9C7] border border-[#4A4A5E] text-[#4A4A5E] font-bold text-[11px] active:scale-95 transition-all shadow-xs shrink-0"
            title="Collected Clues"
          >
            <Key size={12} />
            <span>Clues ({gameState.collectedClues.length})</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenQuiz();
            }}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#4A4A5E] font-black text-[11px] transition-all shadow-xs shrink-0 ${
              isQuizReady
                ? 'bg-[#BFE8D6] text-[#4A4A5E] animate-bounce'
                : 'bg-[#DCCFF0] text-[#4A4A5E]'
            }`}
            title="Take Chapter Quiz"
          >
            <Award size={12} />
            <span>Quiz</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="p-1 rounded-full bg-[#FFFBF5] border border-[#4A4A5E]/30 text-[#4A4A5E] hover:bg-gray-100 transition-all shrink-0"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          {/* Reset */}
          <button
            onClick={onRestart}
            className="p-1 rounded-full bg-[#FFFBF5] border border-[#4A4A5E]/30 text-[#7A7A8E] hover:text-red-500 transition-all shrink-0"
            title="Restart"
          >
            <HelpCircle size={13} />
          </button>
        </div>
      </div>
    </header>
  );
};
