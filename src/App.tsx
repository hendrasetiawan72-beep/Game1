/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AvatarType, DialogueChoice, DialogueNode, GameState, InspectData, MajorType, NPCData, PlayerState, ZoneId } from './types/game';
import { DIALOGUE_NODES } from './data/story';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { VirtualControls } from './components/VirtualControls';
import { DialogueModal } from './components/DialogueModal';
import { PhraseBankModal } from './components/PhraseBankModal';
import { InventoryModal } from './components/InventoryModal';
import { QuizModal } from './components/QuizModal';
import { ChapterEndModal } from './components/ChapterEndModal';
import { VictoryModal } from './components/VictoryModal';
import { CharacterSelect } from './components/CharacterSelect';
import { InspectModal } from './components/InspectModal';
import { DebateLedger } from './components/Minigames/DebateLedger';
import { EngineTalk } from './components/Minigames/EngineTalk';
import { NetworkConnect } from './components/Minigames/NetworkConnect';
import { sound } from './utils/audio';

const STORAGE_KEY = 'opinion_quest_muhiba_save_v2';

const INITIAL_GAME_STATE: GameState = {
  currentChapter: 1,
  trustMeter: 60,
  score: 0,
  collectedClues: [],
  elapsedSeconds: 0,
  completedMinigames: {
    akl: false,
    otomotif: false,
    tjkt: false
  },
  completedQuizzes: {
    1: false,
    2: false,
    3: false
  },
  chapterStars: {
    1: 0,
    2: 0,
    3: 0
  },
  talkedNpcs: [],
  gameCompleted: false
};

const INITIAL_PLAYER_STATE: PlayerState = {
  name: 'Rizky',
  studentClass: 'X AKL 1',
  avatar: 'girl_hijab',
  major: 'AKL',
  x: 520,
  y: 420,
  zone: 'courtyard',
  direction: 'up',
  isMoving: false
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).gameState;
    } catch {}
    return INITIAL_GAME_STATE;
  });

  const [player, setPlayer] = useState<PlayerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).player;
    } catch {}
    return INITIAL_PLAYER_STATE;
  });

  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Modal States
  const [activeDialogueNode, setActiveDialogueNode] = useState<DialogueNode | null>(null);
  const [activeMinigame, setActiveMinigame] = useState<'akl' | 'otomotif' | 'tjkt' | null>(null);
  const [showPhraseBank, setShowPhraseBank] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showChapterEnd, setShowChapterEnd] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [inspectData, setInspectData] = useState<InspectData | null>(null);
  const [isNearbyInteractable, setIsNearbyInteractable] = useState<boolean>(false);

  // Virtual Controls Direction & Trigger Ref
  const [virtualDirection, setVirtualDirection] = useState<{ x: number; y: number } | null>(null);
  const interactTriggerRef = useRef<(() => void) | null>(null);

  // Determine if any modal is currently active to prevent navigation collision
  const isAnyModalActive =
    !!activeDialogueNode ||
    !!activeMinigame ||
    showPhraseBank ||
    showInventory ||
    showQuiz ||
    showChapterEnd ||
    showVictory ||
    !!inspectData;

  // Running Timer Effect: ticks every 1 second while playing
  useEffect(() => {
    if (!hasStarted || gameState.gameCompleted) return;

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsedSeconds: (prev.elapsedSeconds || 0) + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, gameState.gameCompleted]);

  // Save to localStorage
  useEffect(() => {
    if (hasStarted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameState, player }));
      } catch {}
    }
  }, [gameState, player, hasStarted]);

  // Start new game from CharacterSelect
  const handleStartGame = (name: string, studentClass: string, avatar: AvatarType, major: MajorType) => {
    const newPlayer: PlayerState = {
      name,
      studentClass,
      avatar,
      major,
      x: 520,
      y: 430,
      zone: 'courtyard',
      direction: 'up',
      isMoving: false
    };

    setPlayer(newPlayer);
    setGameState(INITIAL_GAME_STATE);
    setHasStarted(true);

    setTimeout(() => {
      let majorIntroMsg = `Welcome, ${name} (${studentClass})! As an AKL (Accounting & Finance) investigator, Principal Pak Haryono requests your analytical skills to examine the 25th Anniversary Golden Trophy registry.`;

      if (major === 'Otomotif') {
        majorIntroMsg = `Welcome, ${name} (${studentClass})! As an Otomotif investigator, Principal Pak Haryono requests your mechanical eye to examine the trophy pedestal mounts and workshop clues.`;
      } else if (major === 'TJKT') {
        majorIntroMsg = `Welcome, ${name} (${studentClass})! As a TJKT (Computer Network) investigator, Principal Pak Haryono needs your technical expertise to check CCTV server timestamp logs.`;
      }

      setInspectData({
        title: 'Mission Briefing',
        message: majorIntroMsg,
        clueUnlocked: false,
        choices: [
          {
            text: 'I think we can solve this mystery together with polite dialogue and clear evidence.',
            isCorrect: true,
            feedback: 'Excellent! "I think..." opens your constructive viewpoint with confidence.',
            trustChange: 15
          },
          {
            text: 'In my opinion, we should first inspect the courtyard pedestal and interview witnesses.',
            isCorrect: true,
            feedback: 'Very proactive! "In my opinion..." proposes an orderly plan of action.',
            trustChange: 15
          },
          {
            text: 'From my point of view, checking the school labs will reveal the truth.',
            isCorrect: true,
            feedback: 'Analytical! "From my point of view..." directs attention to the departments.',
            trustChange: 15
          }
        ]
      });
    }, 400);
  };

  // Talk to NPC handler
  const handleTalkToNPC = useCallback((npc: NPCData) => {
    sound.playClick();
    let nodeId = npc.initialDialogueNodeId;

    if (npc.chapterDialogueNodes && npc.chapterDialogueNodes[gameState.currentChapter]) {
      nodeId = npc.chapterDialogueNodes[gameState.currentChapter];
    }

    const node = DIALOGUE_NODES[nodeId];
    if (node) {
      setActiveDialogueNode(node);
    }
  }, [gameState.currentChapter]);

  // Choice selected in DialogueModal
  const handleChoiceSelected = (choice: DialogueChoice) => {
    const newTrust = Math.min(100, Math.max(0, gameState.trustMeter + choice.trustChange));
    const scoreAdd = choice.isCorrect ? 25 : 5;

    let newClues = [...gameState.collectedClues];
    if (choice.unlockClueId && !newClues.includes(choice.unlockClueId)) {
      newClues.push(choice.unlockClueId);
      sound.playSparkle();
    }

    setGameState(prev => ({
      ...prev,
      trustMeter: newTrust,
      score: prev.score + scoreAdd,
      collectedClues: newClues
    }));

    if (choice.nextNodeId && DIALOGUE_NODES[choice.nextNodeId]) {
      setActiveDialogueNode(DIALOGUE_NODES[choice.nextNodeId]);
    } else {
      setActiveDialogueNode(null);
    }
  };

  // Door transition
  const handleEnterDoor = (targetZone: ZoneId, targetX: number, targetY: number) => {
    setPlayer(prev => ({
      ...prev,
      zone: targetZone,
      x: targetX,
      y: targetY,
      isMoving: false
    }));
  };

  // Quick exit back to courtyard from any lab
  const handleExitToCourtyard = () => {
    let targetX = 550;
    let targetY = 130;
    if (player.zone === 'akl') {
      targetX = 305;
    } else if (player.zone === 'otomotif') {
      targetX = 550;
    } else if (player.zone === 'tjkt') {
      targetX = 795;
    }
    handleEnterDoor('courtyard', targetX, targetY);
  };

  // Trigger Minigame
  const handleTriggerMinigame = (type: 'akl' | 'otomotif' | 'tjkt') => {
    setActiveMinigame(type);
  };

  // Complete Minigame
  const handleMinigameComplete = (type: 'akl' | 'otomotif' | 'tjkt') => {
    const clueMap = {
      akl: 'clue_anniversary_draft',
      otomotif: 'clue_workshop_polish',
      tjkt: 'clue_server_backup'
    };

    const newClues = [...gameState.collectedClues];
    const rewardClue = clueMap[type];
    if (rewardClue && !newClues.includes(rewardClue)) {
      newClues.push(rewardClue);
    }

    setGameState(prev => ({
      ...prev,
      score: prev.score + 50,
      trustMeter: Math.min(100, prev.trustMeter + 15),
      completedMinigames: {
        ...prev.completedMinigames,
        [type]: true
      },
      collectedClues: newClues
    }));
  };

  // Inspect Object with interactive reflection choices
  const handleInspectObject = (msg: string, clueId?: string, label?: string) => {
    let unlocked = false;
    if (clueId && !gameState.collectedClues.includes(clueId)) {
      unlocked = true;
      sound.playSparkle();
      setGameState(prev => ({
        ...prev,
        score: prev.score + 20,
        collectedClues: [...prev.collectedClues, clueId]
      }));
    }

    setInspectData({
      title: label || 'Scene Examination',
      message: msg,
      clueUnlocked: unlocked,
      choices: [
        {
          text: `In my opinion, this ${label ? label.toLowerCase() : 'evidence'} gives us an important clue.`,
          isCorrect: true,
          feedback: 'Well reasoned! "In my opinion..." introduces your reasoned evaluation.',
          trustChange: 10
        },
        {
          text: `From my point of view, we should connect this clue with witness statements.`,
          isCorrect: true,
          feedback: 'Excellent! "From my point of view..." connects physical clues logically.',
          trustChange: 10
        },
        {
          text: `I think this is completely useless and we should dismiss it.`,
          isCorrect: false,
          feedback: 'Caution! Prematurely ignoring clues can lead to misunderstandings.',
          trustChange: -5
        }
      ]
    });
  };

  // Complete Quiz handler
  const handleCompleteQuiz = (ch: 1 | 2 | 3, stars: number, bonus: number) => {
    setShowQuiz(false);
    const newStars = { ...gameState.chapterStars, [ch]: Math.max(gameState.chapterStars[ch], stars) };
    const newCompleted = { ...gameState.completedQuizzes, [ch]: true };

    setGameState(prev => ({
      ...prev,
      score: prev.score + bonus,
      trustMeter: Math.min(100, prev.trustMeter + 10),
      chapterStars: newStars,
      completedQuizzes: newCompleted
    }));

    if (ch < 3) {
      setShowChapterEnd(true);
    } else {
      setGameState(prev => ({ ...prev, gameCompleted: true }));
      setShowVictory(true);
    }
  };

  // Advance Chapter
  const handleAdvanceChapter = () => {
    setShowChapterEnd(false);
    const nextCh = (gameState.currentChapter + 1) as 2 | 3;
    setGameState(prev => ({
      ...prev,
      currentChapter: nextCh
    }));

    setPlayer(prev => ({
      ...prev,
      zone: 'courtyard',
      x: 520,
      y: 450,
      direction: 'up'
    }));

    sound.playFanfare();
  };

  // Restart
  const handleRestart = () => {
    sound.playClick();
    if (confirm('Start a new investigation? Your current progress will reset.')) {
      localStorage.removeItem(STORAGE_KEY);
      setGameState(INITIAL_GAME_STATE);
      setPlayer(INITIAL_PLAYER_STATE);
      setHasStarted(false);
      setShowVictory(false);
      setShowChapterEnd(false);
      setShowQuiz(false);
      setActiveDialogueNode(null);
      setActiveMinigame(null);
    }
  };

  return (
    <main className="w-full h-[100dvh] relative overflow-hidden bg-[#FFFBF5] select-none font-['Nunito']">
      {!hasStarted ? (
        <CharacterSelect onStart={handleStartGame} />
      ) : (
        <>
          {/* Top HUD with Timer and Exit Button */}
          <HUD
            gameState={gameState}
            currentZone={player.zone}
            playerName={player.name}
            studentClass={player.studentClass}
            elapsedSeconds={gameState.elapsedSeconds || 0}
            onExitToCourtyard={handleExitToCourtyard}
            onOpenPhraseBank={() => setShowPhraseBank(true)}
            onOpenInventory={() => setShowInventory(true)}
            onOpenQuiz={() => setShowQuiz(true)}
            onRestart={handleRestart}
          />

          {/* 60fps Game Canvas */}
          <GameCanvas
            player={player}
            onUpdatePlayer={update => setPlayer(prev => ({ ...prev, ...update }))}
            gameState={gameState}
            onTalkToNPC={handleTalkToNPC}
            onEnterDoor={handleEnterDoor}
            onTriggerMinigame={handleTriggerMinigame}
            onInspectObject={(msg, clueId, label) => handleInspectObject(msg, clueId, label)}
            virtualDirection={virtualDirection}
            onRegisterInteractTrigger={trigger => {
              interactTriggerRef.current = trigger;
            }}
            setNearbyInteractable={setIsNearbyInteractable}
          />

          {/* Mobile-First Virtual Controls (Auto-hidden when any modal is open to avoid collision) */}
          <VirtualControls
            onDirectionChange={dir => setVirtualDirection(dir)}
            onInteract={() => {
              if (interactTriggerRef.current) {
                interactTriggerRef.current();
              }
            }}
            isNearbyInteractable={isNearbyInteractable}
            isVisible={!isAnyModalActive}
            currentZone={player.zone}
            onExitToCourtyard={handleExitToCourtyard}
          />

          {/* Modals & Popups */}

          {/* Dialogue Box */}
          {activeDialogueNode && (
            <DialogueModal
              node={activeDialogueNode}
              onChoiceSelected={handleChoiceSelected}
              onClose={() => setActiveDialogueNode(null)}
              trustMeter={gameState.trustMeter}
            />
          )}

          {/* AKL Debate Ledger Minigame */}
          {activeMinigame === 'akl' && (
            <DebateLedger
              onClose={() => setActiveMinigame(null)}
              onComplete={() => handleMinigameComplete('akl')}
            />
          )}

          {/* Otomotif Engine Talk Minigame */}
          {activeMinigame === 'otomotif' && (
            <EngineTalk
              onClose={() => setActiveMinigame(null)}
              onComplete={() => handleMinigameComplete('otomotif')}
            />
          )}

          {/* TJKT Network Connect Minigame */}
          {activeMinigame === 'tjkt' && (
            <NetworkConnect
              onClose={() => setActiveMinigame(null)}
              onComplete={() => handleMinigameComplete('tjkt')}
            />
          )}

          {/* Phrase Bank Modal */}
          {showPhraseBank && (
            <PhraseBankModal onClose={() => setShowPhraseBank(false)} />
          )}

          {/* Case Inventory Modal */}
          {showInventory && (
            <InventoryModal
              collectedClueIds={gameState.collectedClues}
              onClose={() => setShowInventory(false)}
            />
          )}

          {/* Chapter Quiz Modal */}
          {showQuiz && (
            <QuizModal
              chapter={gameState.currentChapter}
              onClose={() => setShowQuiz(false)}
              onCompleteQuiz={handleCompleteQuiz}
            />
          )}

          {/* Day / Chapter End Modal */}
          {showChapterEnd && gameState.currentChapter < 3 && (
            <ChapterEndModal
              completedChapter={gameState.currentChapter as 1 | 2}
              stars={gameState.chapterStars[gameState.currentChapter]}
              cluesCount={gameState.collectedClues.length}
              onAdvanceChapter={handleAdvanceChapter}
            />
          )}

          {/* Scene Inspection Modal with Interactive Choices */}
          {inspectData && (
            <InspectModal
              data={inspectData}
              onClose={() => setInspectData(null)}
              onChoiceSelected={(isCorrect, trustChange) => {
                setGameState(prev => ({
                  ...prev,
                  trustMeter: Math.min(100, Math.max(0, prev.trustMeter + trustChange)),
                  score: prev.score + (isCorrect ? 15 : 0)
                }));
              }}
            />
          )}

          {/* Victory Modal with Web3Forms Score Submission */}
          {showVictory && (
            <VictoryModal
              gameState={gameState}
              playerName={player.name}
              studentClass={player.studentClass}
              major={player.major}
              elapsedSeconds={gameState.elapsedSeconds || 0}
              onPlayAgain={() => {
                localStorage.removeItem(STORAGE_KEY);
                setGameState(INITIAL_GAME_STATE);
                setPlayer(INITIAL_PLAYER_STATE);
                setHasStarted(false);
                setShowVictory(false);
              }}
            />
          )}
        </>
      )}
    </main>
  );
}
