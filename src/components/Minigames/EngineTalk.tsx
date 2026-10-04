import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Gauge, RotateCcw, Wrench, X, Sparkles, Volume2 } from 'lucide-react';

interface EngineTalkProps {
  onClose: () => void;
  onComplete: () => void;
}

interface RoundData {
  title: string;
  goalContext: string;
  correctBlocks: string[];
  pool: string[];
}

const ROUNDS: RoundData[] = [
  {
    title: 'Round 1: Spark Ignition (Expressing Opinion)',
    goalContext: 'Assemble an opinion statement regarding testing the spark plug gap before ignition.',
    correctBlocks: ['In my opinion,', 'we should inspect', 'the spark plug gap', 'before starting.'],
    pool: ['the spark plug gap', 'In my opinion,', 'before starting.', 'we should inspect', 'you know nothing,']
  },
  {
    title: 'Round 2: Battery vs Carburetor (Polite Disagreement)',
    goalContext: 'Assemble a polite disagreement regarding checking battery voltage first.',
    correctBlocks: ['I see your point,', 'but', 'we need to test', 'the battery voltage first.'],
    pool: ['we need to test', 'I see your point,', 'the battery voltage first.', 'but', 'shut up and leave,']
  }
];

export const EngineTalk: React.FC<EngineTalkProps> = ({ onClose, onComplete }) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [isRoundSuccess, setIsRoundSuccess] = useState<boolean>(false);
  const [isAllComplete, setIsAllComplete] = useState<boolean>(false);
  const [rpm, setRpm] = useState<number>(1000);

  const round = ROUNDS[currentRoundIdx];

  const handleAddBlock = (block: string) => {
    if (selectedBlocks.includes(block) || isRoundSuccess) return;
    sound.playClick();
    const next = [...selectedBlocks, block];
    setSelectedBlocks(next);

    if (next.length === round.correctBlocks.length) {
      const match = next.every((val, idx) => val === round.correctBlocks[idx]);
      if (match) {
        sound.playEngineRev();
        sound.playCorrect();
        setIsRoundSuccess(true);
        setRpm(5500 + currentRoundIdx * 1200);

        if (currentRoundIdx + 1 < ROUNDS.length) {
          setTimeout(() => {
            setCurrentRoundIdx(prev => prev + 1);
            setSelectedBlocks([]);
            setIsRoundSuccess(false);
            setRpm(1200);
          }, 1600);
        } else {
          setTimeout(() => {
            sound.playFanfare();
            setIsAllComplete(true);
            onComplete();
          }, 1200);
        }
      } else {
        sound.playWrong();
      }
    }
  };

  const handleRemoveBlock = (index: number) => {
    if (isRoundSuccess) return;
    sound.playClick();
    setSelectedBlocks(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedBlocks([]);
    setIsRoundSuccess(false);
    setRpm(1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/45 backdrop-blur-xs select-none">
      <div className="w-full max-w-2xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#BFDDF5]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-xl bg-[#BFDDF5] text-[#4A4A5E]">
              <Wrench size={20} />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#4A4A5E] font-['Nunito']">
                Otomotif: "Engine Talk" Sentence Builder
              </h2>
              <p className="text-[10px] sm:text-xs text-[#7A7A8E]">
                Assemble polite English opinion phrases to tune the motorcycle engine!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-[#BFDDF5] text-[#4A4A5E]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Engine Diagnostics Display */}
        <div className="my-2.5 p-3 rounded-2xl bg-gradient-to-r from-[#BFDDF5]/40 to-[#DCCFF0]/40 border-2 border-[#5DADE2] flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#5DADE2] text-white">
                STEP {currentRoundIdx + 1} OF {ROUNDS.length}
              </span>
              <span className="text-xs font-bold text-[#4A4A5E]">{round.title}</span>
            </div>
            <p className="text-[11px] text-[#555566] italic">
              Goal: {round.goalContext}
            </p>
          </div>

          {/* Tachometer */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-[#4A4A5E] shadow-inner shrink-0">
            <Gauge size={20} className={isRoundSuccess ? 'text-green-500 animate-spin' : 'text-[#5DADE2]'} />
            <div>
              <span className="text-[8px] text-gray-500 font-bold block uppercase">Engine</span>
              <span className="text-sm font-black text-[#4A4A5E] font-mono">{rpm} RPM</span>
            </div>
          </div>
        </div>

        {/* Sentence Assembly Slot Tray */}
        <div className="p-3 rounded-2xl bg-white border-2 border-dashed border-[#4A4A5E] min-h-[75px] flex flex-wrap items-center gap-1.5">
          {selectedBlocks.length === 0 ? (
            <span className="text-[11px] text-[#8A8A9E] italic w-full text-center">
              Tap phrase blocks below to snap them into the engine pipeline...
            </span>
          ) : (
            selectedBlocks.map((blk, idx) => (
              <div
                key={idx}
                onClick={() => handleRemoveBlock(idx)}
                className="px-3 py-1.5 rounded-xl bg-[#BFDDF5] border-2 border-[#4A4A5E] text-xs font-black text-[#4A4A5E] flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <span>{blk}</span>
                <span className="text-red-500 font-bold text-[10px]">✕</span>
              </div>
            ))
          )}
        </div>

        {/* Full Sentence Pronunciation button */}
        {selectedBlocks.length === round.correctBlocks.length && (
          <div className="flex justify-end pt-1">
            <button
              onClick={() => sound.speakPhrase(selectedBlocks.join(' '))}
              className="flex items-center gap-1 text-[11px] font-bold text-[#5DADE2] hover:underline"
            >
              <Volume2 size={13} /> Listen to phrase
            </button>
          </div>
        )}

        {/* Phrase Block Pool */}
        <div className="pt-2 flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A8E]">
              Engine Blocks (Tap to add):
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[10px] font-bold text-[#4A4A5E] hover:underline"
            >
              <RotateCcw size={10} /> Clear
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {round.pool.map((blk, i) => {
              const isUsed = selectedBlocks.includes(blk);
              return (
                <button
                  key={i}
                  disabled={isUsed || isRoundSuccess}
                  onClick={() => handleAddBlock(blk)}
                  className={`px-3.5 py-2 rounded-2xl border-2 font-bold text-xs transition-all ${
                    isUsed
                      ? 'opacity-30 bg-gray-200 border-gray-300 cursor-not-allowed'
                      : 'bg-[#FFFBF5] border-[#4A4A5E] text-[#4A4A5E] hover:bg-[#DCCFF0] active:scale-95 shadow-xs cursor-pointer'
                  }`}
                >
                  {blk}
                </button>
              );
            })}
          </div>
        </div>

        {/* Success Alert */}
        {isRoundSuccess && (
          <div className="mt-2 p-2 rounded-2xl bg-[#E8F8F5] border-2 border-[#27AE60] flex items-center gap-2 text-xs font-bold text-[#27AE60] animate-pulse">
            <Sparkles size={15} />
            <span>Vroom! Engine tuned with polite English! Advancing...</span>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2.5 border-t-2 border-[#BFDDF5] flex justify-between items-center">
          <span className="text-[11px] text-[#7A7A8E]">
            {isAllComplete ? 'All Engine Tests Completed!' : `Round ${currentRoundIdx + 1} of ${ROUNDS.length}`}
          </span>
          {isAllComplete && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-5 py-1.5 rounded-full bg-[#BFE8D6] text-[#4A4A5E] font-black text-xs border-2 border-[#4A4A5E] shadow-sm hover:scale-105 transition-all"
            >
              Collect Clue (+50 pts)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
