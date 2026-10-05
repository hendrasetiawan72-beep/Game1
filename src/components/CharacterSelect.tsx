import React, { useState } from 'react';
import { AvatarType, MajorType } from '../types/game';
import { sound } from '../utils/audio';
import { Award, Wrench, FileSpreadsheet, Network, ArrowRight, GraduationCap } from 'lucide-react';

interface CharacterSelectProps {
  onStart: (name: string, studentClass: string, avatar: AvatarType, major: MajorType) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onStart }) => {
  const [name, setName] = useState<string>('Rizky');
  const [studentClass, setStudentClass] = useState<string>('X AKL 1');
  const [avatar, setAvatar] = useState<AvatarType>('girl_hijab');
  const [major, setMajor] = useState<MajorType>('AKL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playFanfare();
    onStart(name.trim() || 'Student', studentClass.trim() || 'X AKL 1', avatar, major);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-gradient-to-br from-[#FFFBF5] via-[#BFDDF5]/20 to-[#BFE8D6]/30 overflow-y-auto select-none">
      <div className="w-full max-w-xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 my-auto">
        {/* Title Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1B8] border border-[#4A4A5E] text-[11px] font-black text-[#4A4A5E]">
            <Award size={13} className="text-amber-600" />
            <span>SMK Muhammadiyah Bawang • 25th Silver Jubilee</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#4A4A5E] font-['Nunito'] tracking-tight">
            Opinion Quest: The Muhiba Mystery
          </h1>
          <p className="text-[11px] sm:text-xs text-[#7A7A8E] max-w-md mx-auto leading-relaxed">
            The school Golden Trophy has vanished on the eve of the 25th Anniversary! Enter your name, class, and choose your vocational major to begin the investigation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Student Name & Class Fields in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Student Name */}
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#4A4A5E] mb-1">
                1. Student Name (Nama Siswa)
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your student name..."
                maxLength={20}
                className="w-full px-3.5 py-2 rounded-2xl bg-white border-2 border-[#4A4A5E] text-[#4A4A5E] font-bold text-xs sm:text-sm focus:outline-hidden focus:border-[#5DADE2] shadow-inner"
                required
              />
            </div>

            {/* Student Class / Grade (Manual entry) */}
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#4A4A5E] mb-1">
                2. Class / Grade (Isi Kelas Manual)
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={e => setStudentClass(e.target.value)}
                placeholder="Contoh: X AKL 1, XI TO 2, XII TJKT..."
                maxLength={20}
                className="w-full px-3.5 py-2 rounded-2xl bg-white border-2 border-[#4A4A5E] text-[#4A4A5E] font-bold text-xs sm:text-sm focus:outline-hidden focus:border-[#5DADE2] shadow-inner"
                required
              />
            </div>
          </div>

          {/* Avatar Choice */}
          <div>
            <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#4A4A5E] mb-1.5">
              3. Choose Student Avatar
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Boy */}
              <div
                onClick={() => {
                  sound.playClick();
                  setAvatar('boy');
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                  avatar === 'boy'
                    ? 'bg-[#BFDDF5] border-[#4A4A5E] shadow-sm scale-102'
                    : 'bg-white border-[#E0E0E0] hover:border-[#BFDDF5]'
                }`}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-[#FFFBF5] border-2 border-[#4A4A5E] flex items-center justify-center text-xl shadow-xs mb-1.5">
                  👦
                </div>
                <span className="text-[11px] font-black text-[#4A4A5E] block truncate">Boy Student</span>
                <span className="text-[9px] text-[#7A7A8E]">Neat dark hair</span>
              </div>

              {/* Girl with Hijab */}
              <div
                onClick={() => {
                  sound.playClick();
                  setAvatar('girl_hijab');
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                  avatar === 'girl_hijab'
                    ? 'bg-[#DCCFF0] border-[#4A4A5E] shadow-sm scale-102'
                    : 'bg-white border-[#E0E0E0] hover:border-[#DCCFF0]'
                }`}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-[#FFFBF5] border-2 border-[#4A4A5E] flex items-center justify-center text-xl shadow-xs mb-1.5">
                  🧕
                </div>
                <span className="text-[11px] font-black text-[#4A4A5E] block truncate">Girl (Hijab)</span>
                <span className="text-[9px] text-[#7A7A8E]">Pastel veil</span>
              </div>

              {/* Girl without Hijab */}
              <div
                onClick={() => {
                  sound.playClick();
                  setAvatar('girl_nohijab');
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                  avatar === 'girl_nohijab'
                    ? 'bg-[#F8CFDA] border-[#4A4A5E] shadow-sm scale-102'
                    : 'bg-white border-[#E0E0E0] hover:border-[#F8CFDA]'
                }`}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-[#FFFBF5] border-2 border-[#4A4A5E] flex items-center justify-center text-xl shadow-xs mb-1.5">
                  👧
                </div>
                <span className="text-[11px] font-black text-[#4A4A5E] block truncate">Girl (Ponytail)</span>
                <span className="text-[9px] text-[#7A7A8E]">Hair accessory</span>
              </div>
            </div>
          </div>

          {/* Vocational Major Selection */}
          <div>
            <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#4A4A5E] mb-1.5">
              4. Choose Vocational Major
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* AKL */}
              <div
                onClick={() => {
                  sound.playClick();
                  setMajor('AKL');
                }}
                className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  major === 'AKL'
                    ? 'bg-[#FFF1B8] border-[#4A4A5E] shadow-sm scale-101'
                    : 'bg-white border-[#E0E0E0] hover:border-[#FFF1B8]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <FileSpreadsheet size={15} className="text-[#F5B041]" />
                  <span className="text-xs font-black text-[#4A4A5E]">AKL</span>
                </div>
                <p className="text-[10px] font-bold text-[#4A4A5E] truncate">Accounting & Finance</p>
                <p className="text-[9px] text-[#7A7A8E] mt-0.5 leading-snug">
                  Audit trails & inventory ledger debates.
                </p>
              </div>

              {/* Otomotif */}
              <div
                onClick={() => {
                  sound.playClick();
                  setMajor('Otomotif');
                }}
                className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  major === 'Otomotif'
                    ? 'bg-[#BFDDF5] border-[#4A4A5E] shadow-sm scale-101'
                    : 'bg-white border-[#E0E0E0] hover:border-[#BFDDF5]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Wrench size={15} className="text-[#5DADE2]" />
                  <span className="text-xs font-black text-[#4A4A5E]">Otomotif</span>
                </div>
                <p className="text-[10px] font-bold text-[#4A4A5E] truncate">Automotive Tech</p>
                <p className="text-[9px] text-[#7A7A8E] mt-0.5 leading-snug">
                  Mechanical diagnostics & metal restoration.
                </p>
              </div>

              {/* TJKT */}
              <div
                onClick={() => {
                  sound.playClick();
                  setMajor('TJKT');
                }}
                className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  major === 'TJKT'
                    ? 'bg-[#BFE8D6] border-[#4A4A5E] shadow-sm scale-101'
                    : 'bg-white border-[#E0E0E0] hover:border-[#BFE8D6]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Network size={15} className="text-[#48C9B0]" />
                  <span className="text-xs font-black text-[#4A4A5E]">TJKT</span>
                </div>
                <p className="text-[10px] font-bold text-[#4A4A5E] truncate">Network & Telecom</p>
                <p className="text-[9px] text-[#7A7A8E] mt-0.5 leading-snug">
                  CCTV server timestamp logs & patching.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all"
          >
            <span>Begin Adventure: Day 1</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
