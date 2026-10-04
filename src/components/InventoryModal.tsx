import React from 'react';
import { CLUE_CARDS } from '../data/clues';
import { sound } from '../utils/audio';
import { Key, Volume2, X, Trophy, Shield, Coffee, Wrench, Cable, Book, Sparkles } from 'lucide-react';

interface InventoryModalProps {
  collectedClueIds: string[];
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ collectedClueIds, onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'trophy': return <Trophy size={16} className="text-amber-500" />;
      case 'shield': return <Shield size={16} className="text-blue-500" />;
      case 'cup': return <Coffee size={16} className="text-orange-500" />;
      case 'wrench': return <Wrench size={16} className="text-indigo-500" />;
      case 'cable': return <Cable size={16} className="text-teal-500" />;
      case 'book': return <Book size={16} className="text-rose-500" />;
      default: return <Key size={16} className="text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/45 backdrop-blur-xs select-none">
      <div className="w-full max-w-2xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#FFD9C7]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-2xl bg-[#FFD9C7] text-[#4A4A5E]">
              <Key size={20} />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#4A4A5E] font-['Nunito']">
                Case Files & Clue Cards
              </h2>
              <p className="text-[10px] sm:text-xs text-[#7A7A8E]">
                {collectedClueIds.length} of {CLUE_CARDS.length} Evidence Cards Collected
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-[#FFD9C7] text-[#4A4A5E]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Clue Grid */}
        <div className="flex-1 overflow-y-auto py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CLUE_CARDS.map(clue => {
              const isFound = collectedClueIds.includes(clue.id);

              return (
                <div
                  key={clue.id}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isFound
                      ? 'bg-white border-[#4A4A5E] shadow-xs'
                      : 'bg-gray-100/70 border-dashed border-gray-300 opacity-60'
                  }`}
                >
                  {isFound ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-xl bg-[#FFFBF5] border border-[#4A4A5E]/20">
                            {getIcon(clue.iconType)}
                          </span>
                          <div>
                            <span className="text-[9px] font-black uppercase text-[#F5B041]">
                              Chapter {clue.chapter}
                            </span>
                            <h3 className="text-xs font-black text-[#4A4A5E]">{clue.title}</h3>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            sound.playClick();
                            sound.speakPhrase(clue.phrase);
                          }}
                          className="p-1 rounded-lg hover:bg-gray-100 text-[#7A7A8E]"
                          title="Pronounce phrase"
                        >
                          <Volume2 size={15} />
                        </button>
                      </div>

                      {/* Key Phrase Highlight */}
                      <div className="p-2 rounded-xl bg-[#FFF9E6] border border-[#F5B041]/30">
                        <div className="flex items-center gap-1 text-[9px] font-black text-[#B7950B] uppercase">
                          <Sparkles size={10} />
                          <span>Target Expression:</span>
                        </div>
                        <p className="text-xs font-black text-[#4A4A5E]">{clue.phrase}</p>
                      </div>

                      <p className="text-[11px] text-[#555566] leading-relaxed">
                        {clue.description}
                      </p>

                      <div className="pt-0.5 text-[9px] text-[#8A8A9E] font-bold">
                        📍 Found at: {clue.foundAt}
                      </div>
                    </div>
                  ) : (
                    <div className="py-5 text-center space-y-1">
                      <span className="text-lg">🔒</span>
                      <h3 className="text-xs font-bold text-gray-500">Undiscovered Clue</h3>
                      <p className="text-[9px] text-gray-400">
                        Investigate NPCs and stations in Chapter {clue.chapter}.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2.5 border-t-2 border-[#FFD9C7] flex justify-between items-center">
          <span className="text-[10px] sm:text-xs text-[#7A7A8E]">
            Collect clues to prepare for the final assembly debate.
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-1.5 rounded-full bg-[#FFD9C7] text-[#4A4A5E] font-black text-xs border border-[#4A4A5E] hover:scale-105 transition-all"
          >
            Close Files
          </button>
        </div>
      </div>
    </div>
  );
};
