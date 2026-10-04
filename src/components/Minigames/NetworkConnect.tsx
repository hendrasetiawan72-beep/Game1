import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Network, RotateCcw, Volume2, X, CheckCircle } from 'lucide-react';

interface NetworkConnectProps {
  onClose: () => void;
  onComplete: () => void;
}

interface PortStatement {
  id: string;
  code: string;
  text: string;
  correctTargetId: string;
}

interface PortResponse {
  id: string;
  code: string;
  category: string;
  text: string;
}

const STATEMENTS: PortStatement[] = [
  {
    id: 's1',
    code: 'ETH-01',
    text: '"Artificial intelligence will soon replace all network technicians."',
    correctTargetId: 't1'
  },
  {
    id: 's2',
    code: 'ETH-02',
    text: '"Routine firewall updates are unnecessary if nothing broke yesterday."',
    correctTargetId: 't2'
  },
  {
    id: 's3',
    code: 'ETH-03',
    text: '"Fiber optic cables transmit data faster than copper wires over long distances."',
    correctTargetId: 't3'
  },
  {
    id: 's4',
    code: 'ETH-04',
    text: '"Vocational students from SMK Muhiba are among the most disciplined."',
    correctTargetId: 't4'
  }
];

const TARGET_RESPONSES: PortResponse[] = [
  {
    id: 't1',
    code: 'PORT-A',
    category: 'Partial Agreement',
    text: "You're partly right, but human diagnostic and physical cabling skills will always be needed."
  },
  {
    id: 't2',
    code: 'PORT-B',
    category: 'Polite Disagreement',
    text: "I'm afraid I disagree. Cyber threats evolve daily, so continuous updates are vital."
  },
  {
    id: 't3',
    code: 'PORT-C',
    category: 'Direct Agreement',
    text: "That's true! Photons travel with significantly lower signal attenuation."
  },
  {
    id: 't4',
    code: 'PORT-D',
    category: 'Strong Agreement',
    text: "I couldn't agree more! Industry partners constantly praise their work ethics."
  }
];

export const NetworkConnect: React.FC<NetworkConnectProps> = ({ onClose, onComplete }) => {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedStatementId, setSelectedStatementId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelectStatement = (id: string) => {
    sound.playClick();
    setSelectedStatementId(prev => (prev === id ? null : id));
  };

  const handleSelectTarget = (targetId: string) => {
    if (!selectedStatementId) return;
    sound.playClick();

    const newConn = { ...connections };
    Object.keys(newConn).forEach(key => {
      if (newConn[key] === targetId) {
        delete newConn[key];
      }
    });

    newConn[selectedStatementId] = targetId;
    setConnections(newConn);
    setSelectedStatementId(null);

    if (Object.keys(newConn).length === STATEMENTS.length) {
      checkConnections(newConn);
    }
  };

  const checkConnections = (conn: Record<string, string>) => {
    let allOk = true;
    for (const stmt of STATEMENTS) {
      if (conn[stmt.id] !== stmt.correctTargetId) {
        allOk = false;
        break;
      }
    }

    if (allOk) {
      sound.playFanfare();
      setIsCompleted(true);
      setFeedback('All Network Packets Flowing! Perfect conversational patching.');
      onComplete();
    } else {
      sound.playWrong();
      setFeedback('Signal Collision! Check which opinions require polite disagreement vs agreement.');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setConnections({});
    setSelectedStatementId(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/45 backdrop-blur-xs select-none">
      <div className="w-full max-w-3xl bg-[#FFFDF9] border-3 border-[#4A4A5E] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#BFE8D6]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-xl bg-[#BFE8D6] text-[#4A4A5E]">
              <Network size={20} />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#4A4A5E] font-['Nunito']">
                TJKT: "Network Connect" Patch Panel
              </h2>
              <p className="text-[10px] sm:text-xs text-[#7A7A8E]">
                Link statement ports to their polite conversational response pins.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-[#BFE8D6] text-[#4A4A5E]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Patch Panel Instructions */}
        <div className="my-2 p-2 rounded-xl bg-[#EDFAF5] border border-[#BFE8D6] flex items-center justify-between text-[11px] text-[#4A4A5E]">
          <span>
            Tap a <strong>Statement Port</strong> (left), then tap its <strong>Response Pin</strong> (right).
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg bg-white border border-[#4A4A5E]"
          >
            <RotateCcw size={10} /> Unplug All
          </button>
        </div>

        {/* Cable Connection Board */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
          {/* Left Column: Statements */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-[#48C9B0]">
              INPUT PORTS (Statements)
            </h3>
            {STATEMENTS.map(stmt => {
              const targetId = connections[stmt.id];
              const isSelected = selectedStatementId === stmt.id;
              const isConnected = !!targetId;

              return (
                <div
                  key={stmt.id}
                  onClick={() => handleSelectStatement(stmt.id)}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#BFE8D6] border-[#4A4A5E] shadow-md scale-[1.01]'
                      : isConnected
                      ? 'bg-[#FFFBF5] border-[#48C9B0]'
                      : 'bg-white border-[#E0E0E0] hover:border-[#BFE8D6]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-[#4A4A5E] text-white">
                      {stmt.code}
                    </span>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                        }`}
                      />
                      <span className="text-[9px] font-bold text-[#7A7A8E]">
                        {isConnected ? 'PATCHED' : 'UNLINKED'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#4A4A5E]">{stmt.text}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Responses */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-[#5DADE2]">
              OUTPUT PINS (Conversational Reaction)
            </h3>
            {TARGET_RESPONSES.map(resp => {
              const connectedStmtId = Object.keys(connections).find(k => connections[k] === resp.id);
              const isConnected = !!connectedStmtId;

              return (
                <div
                  key={resp.id}
                  onClick={() => handleSelectTarget(resp.id)}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    isConnected
                      ? 'bg-[#EDFAF5] border-[#27AE60] shadow-xs'
                      : selectedStatementId
                      ? 'bg-white border-[#5DADE2] hover:bg-[#BFDDF5]/40'
                      : 'bg-white border-[#E0E0E0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-[#5DADE2] text-white">
                      {resp.code} • {resp.category}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        sound.speakPhrase(resp.text);
                      }}
                      className="text-[#7A7A8E] hover:text-[#4A4A5E] p-0.5"
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-[#4A4A5E]">{resp.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`my-1.5 p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              isCompleted ? 'bg-[#E8F8F5] text-[#27AE60]' : 'bg-[#FDEDEC] text-[#E74C3C]'
            }`}
          >
            {isCompleted && <CheckCircle size={15} />}
            <span>{feedback}</span>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2.5 border-t-2 border-[#BFE8D6] flex justify-between items-center">
          <span className="text-[11px] text-[#7A7A8E]">
            {Object.keys(connections).length}/{STATEMENTS.length} Cables Connected
          </span>
          {isCompleted && (
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
