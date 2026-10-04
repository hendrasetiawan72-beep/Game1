import React, { useEffect, useRef, useState } from 'react';
import { GameState } from '../types/game';
import { sound } from '../utils/audio';
import { Award, Trophy, Star, Sparkles, RotateCcw, CheckCircle2, Send, Clock, User, GraduationCap } from 'lucide-react';

interface VictoryModalProps {
  gameState: GameState;
  playerName: string;
  studentClass: string;
  major: string;
  elapsedSeconds: number;
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  gameState,
  playerName,
  studentClass,
  major,
  elapsedSeconds,
  onPlayAgain
}) => {
  const totalStars = Object.values(gameState.chapterStars).reduce((a, b) => a + b, 0);
  const [hasSentSuccessfully, setHasSentSuccessfully] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Wire up the Web3Forms submit event listener exactly as specified
  useEffect(() => {
    const form = document.getElementById('form') as HTMLFormElement;
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!submitBtn) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("access_key", "41933c2d-787e-483f-a700-ec9cddd2e3a3");

      const originalText = submitBtn.textContent || "Send your score to Mr. Hendra";

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          alert("Success! Your message has been sent.");
          form.reset();
          setHasSentSuccessfully(true);
        } else {
          alert("Error: " + data.message);
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto select-none">
      <div className="w-full max-w-xl bg-[#FFFDF9] border-4 border-[#4A4A5E] rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-4 my-auto text-center animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto">
        {/* Banner & Golden Trophy */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF1B8] border-2 border-[#4A4A5E] text-[11px] font-black text-[#4A4A5E] shadow-xs">
            <Sparkles size={13} className="text-amber-500" />
            <span>25th Silver Jubilee • SMK Muhammadiyah Bawang</span>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#FFF1B8] to-[#FFD9C7] border-3 border-[#4A4A5E] flex items-center justify-center shadow-md animate-bounce">
            <Trophy size={36} className="text-amber-500 fill-amber-400 drop-shadow-xs" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#4A4A5E] font-['Nunito'] tracking-tight">
            The Golden Mystery Revealed!
          </h1>
          <p className="text-xs text-[#7A7A8E] max-w-md mx-auto leading-relaxed">
            Senior Rafi secretly restored the Golden Trophy with 25th anniversary laurels as an authorized surprise gift! Polite dialogue solved the mystery!
          </p>
        </div>

        {/* Award Certificate */}
        <div className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-[#BFE8D6]/40 via-[#BFDDF5]/40 to-[#DCCFF0]/40 border-2 border-[#4A4A5E] space-y-1.5 shadow-inner">
          <div className="flex items-center justify-center gap-1.5">
            <Award size={18} className="text-[#27AE60]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#4A4A5E]">
              Official Award Certificate
            </span>
          </div>

          <div className="space-y-0.5">
            <p className="text-base sm:text-lg font-black text-[#4A4A5E]">
              {playerName}
            </p>
            <p className="text-xs font-bold text-[#7A7A8E]">
              Class {studentClass} · {major} Department
            </p>
          </div>

          <div className="inline-block px-3 py-0.5 rounded-full bg-[#FFF1B8] border border-[#4A4A5E] font-black text-[11px] text-[#4A4A5E]">
            🏅 BEST COMMUNICATOR BADGE OF HONOR
          </div>

          <p className="text-[10px] sm:text-[11px] text-[#555566] italic max-w-sm mx-auto leading-relaxed">
            "Disagreement without listening causes misunderstanding; polite opinions and respectful dialogue build community and trust."
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#7A7A8E] block truncate">Final Score</span>
            <span className="text-base sm:text-lg font-black text-[#4A4A5E]">{gameState.score}</span>
          </div>

          <div className="p-2 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#7A7A8E] block truncate">Stars</span>
            <div className="flex items-center justify-center gap-0.5 text-amber-500 font-black text-sm mt-0.5">
              <Star size={13} className="fill-amber-400" />
              <span>{totalStars}/9</span>
            </div>
          </div>

          <div className="p-2 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#7A7A8E] block truncate">School Trust</span>
            <span className="text-base sm:text-lg font-black text-[#27AE60]">{gameState.trustMeter}%</span>
          </div>

          <div className="p-2 rounded-2xl bg-white border-2 border-[#4A4A5E]/20">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#7A7A8E] block truncate">Time Taken</span>
            <span className="text-base sm:text-lg font-black text-[#5DADE2] font-mono tabular-nums">{formatTime(elapsedSeconds)}</span>
          </div>
        </div>

        {/* Web3Forms Score Submission Form */}
        <div className="p-3.5 sm:p-4 rounded-3xl bg-[#FFFBF5] border-2 border-[#5DADE2] text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <GraduationCap size={18} className="text-[#5DADE2]" />
              <h3 className="font-black text-xs sm:text-sm text-[#4A4A5E]">
                Submit Score to Teacher
              </h3>
            </div>
            {hasSentSuccessfully && (
              <span className="flex items-center gap-1 text-[11px] font-black text-[#27AE60] bg-green-100 px-2.5 py-0.5 rounded-full border border-green-300">
                <CheckCircle2 size={13} />
                Sent Successfully!
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#7A7A8E] leading-relaxed">
            Report your final English mystery investigation results to <strong className="text-[#4A4A5E]">Mr. Hendra</strong> via the official score verification system.
          </p>

          <form id="form" ref={formRef} className="space-y-3">
            {/* Hidden fields holding student verification data */}
            <input type="hidden" name="name" value={playerName} />
            <input type="hidden" name="student_class" value={studentClass} />
            <input type="hidden" name="major" value={major} />
            <input type="hidden" name="final_score" value={gameState.score} />
            <input type="hidden" name="stars_earned" value={`${totalStars} / 9`} />
            <input type="hidden" name="trust_meter" value={`${gameState.trustMeter}%`} />
            <input type="hidden" name="clues_found" value={`${gameState.collectedClues.length} / 7`} />
            <input type="hidden" name="time_elapsed" value={formatTime(elapsedSeconds)} />
            <input type="hidden" name="subject" value={`Opinion Quest Score: ${playerName} (${studentClass}) - Score: ${gameState.score}`} />
            <input type="hidden" name="from_name" value={`${playerName} - ${studentClass}`} />

            {/* Summary preview */}
            <div className="p-2.5 rounded-2xl bg-white border border-[#4A4A5E]/20 text-[11px] grid grid-cols-2 gap-1.5 font-bold text-[#555566]">
              <div>👤 Student: <span className="text-[#4A4A5E] font-black">{playerName}</span></div>
              <div>🏫 Class: <span className="text-[#4A4A5E] font-black">{studentClass}</span></div>
              <div>🎯 Score: <span className="text-[#27AE60] font-black">{gameState.score} pts</span></div>
              <div>⏱️ Time: <span className="text-[#5DADE2] font-black">{formatTime(elapsedSeconds)}</span></div>
            </div>

            {/* The specified submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#5DADE2] hover:bg-[#3498DB] text-white font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={15} />
              <span>Send your score to Mr. Hendra</span>
            </button>
          </form>
        </div>

        {/* Play Again */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="w-full py-2.5 sm:py-3 rounded-full bg-[#BFE8D6] hover:bg-[#A3E4D7] text-[#4A4A5E] font-black text-xs sm:text-sm border-2 border-[#4A4A5E] shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all"
        >
          <RotateCcw size={15} />
          <span>Play Again / New Investigation</span>
        </button>
      </div>
    </div>
  );
};
