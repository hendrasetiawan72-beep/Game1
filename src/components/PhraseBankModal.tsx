import React, { useState } from 'react';
import { PHRASE_BANK } from '../data/phrases';
import { PhraseCategory } from '../types/game';
import { sound } from '../utils/audio';
import { BookOpen, Volume2, X, Search } from 'lucide-react';

interface PhraseBankModalProps {
  onClose: () => void;
}

export const PhraseBankModal: React.FC<PhraseBankModalProps> = ({ onClose }) => {
  const [selectedCat, setSelectedCat] = useState<PhraseCategory | 'all'>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = PHRASE_BANK.filter(item => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesQuery =
      item.phrase.toLowerCase().includes(search.toLowerCase()) ||
      item.notes.toLowerCase().includes(search.toLowerCase()) ||
      item.example.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const getCategoryBadge = (cat: PhraseCategory) => {
    switch (cat) {
      case 'opinion':
        return { label: 'Giving Opinion', bg: 'bg-[#FFF1B8]', text: 'text-[#B7950B]' };
      case 'agree':
        return { label: 'Agreeing', bg: 'bg-[#BFE8D6]', text: 'text-[#1E8449]' };
      case 'disagree_polite':
        return { label: 'Polite Disagreement', bg: 'bg-[#BFDDF5]', text: 'text-[#2E86C1]' };
      case 'partial_agree':
        return { label: 'Partial Agreement', bg: 'bg-[#DCCFF0]', text: 'text-[#7D3C98]' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/45 backdrop-blur-xs select-none">
      <div className="w-full max-w-2xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#BFDDF5]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-2xl bg-[#BFDDF5] text-[#4A4A5E]">
              <BookOpen size={20} />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#4A4A5E] font-['Nunito']">
                English Phrase Bank (CEFR A2-B1)
              </h2>
              <p className="text-[10px] sm:text-xs text-[#7A7A8E]">
                Expressing Opinions, Agreement & Polite Disagreement
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

        {/* Filter Pills & Search */}
        <div className="py-2.5 space-y-2 border-b border-gray-200">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-[#7A7A8E]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search phrases or usage notes..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#4A4A5E]/30 text-xs font-bold text-[#4A4A5E] focus:outline-hidden focus:border-[#5DADE2]"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCat('all');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                selectedCat === 'all'
                  ? 'bg-[#4A4A5E] text-white border-[#4A4A5E]'
                  : 'bg-white text-[#7A7A8E] border-gray-300'
              }`}
            >
              All ({PHRASE_BANK.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCat('opinion');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                selectedCat === 'opinion'
                  ? 'bg-[#FFF1B8] text-[#4A4A5E] border-[#4A4A5E]'
                  : 'bg-white text-[#7A7A8E] border-gray-300'
              }`}
            >
              Opinion
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCat('agree');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                selectedCat === 'agree'
                  ? 'bg-[#BFE8D6] text-[#4A4A5E] border-[#4A4A5E]'
                  : 'bg-white text-[#7A7A8E] border-gray-300'
              }`}
            >
              Agree
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCat('disagree_polite');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                selectedCat === 'disagree_polite'
                  ? 'bg-[#BFDDF5] text-[#4A4A5E] border-[#4A4A5E]'
                  : 'bg-white text-[#7A7A8E] border-gray-300'
              }`}
            >
              Polite Disagree
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCat('partial_agree');
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                selectedCat === 'partial_agree'
                  ? 'bg-[#DCCFF0] text-[#4A4A5E] border-[#4A4A5E]'
                  : 'bg-white text-[#7A7A8E] border-gray-300'
              }`}
            >
              Partial Agree
            </button>
          </div>
        </div>

        {/* Phrase Cards List */}
        <div className="flex-1 overflow-y-auto py-2.5 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#7A7A8E]">
              No matching phrases found.
            </div>
          ) : (
            filtered.map(item => {
              const badge = getCategoryBadge(item.category);
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-white border-2 border-[#EAEAEA] hover:border-[#BFDDF5] transition-all shadow-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        sound.speakPhrase(item.phrase);
                      }}
                      className="p-1 rounded-lg hover:bg-gray-100 text-[#7A7A8E] hover:text-[#4A4A5E]"
                      title="Pronounce phrase"
                    >
                      <Volume2 size={15} />
                    </button>
                  </div>

                  <h3 className="text-xs sm:text-sm font-extrabold text-[#4A4A5E]">{item.phrase}</h3>

                  <div className="p-2 rounded-xl bg-[#FFFBF5] border border-gray-100 text-[11px]">
                    <span className="font-bold text-[#4A4A5E]">Example: </span>
                    <span className="text-[#555566] italic">"{item.example}"</span>
                  </div>

                  <p className="text-[10px] text-[#8A8A9E] leading-relaxed">
                    💡 {item.notes}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-2.5 border-t-2 border-[#BFDDF5] flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-1.5 rounded-full bg-[#BFDDF5] text-[#4A4A5E] font-black text-xs border border-[#4A4A5E] hover:scale-105 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
