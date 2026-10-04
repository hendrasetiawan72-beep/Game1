/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AvatarType, DialogueChoice, DialogueNode, GameState, MajorType, NPCData, PlayerState, ZoneId } from './types/game';
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

const STORAGE_KEY = 'opinion_quest_muhiba_save_v1';

const INITIAL_GAME_STATE: GameState = {
  currentChapter: 1,
  trustMeter: 60,
  score: 0,
  collectedClues: [],
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
  const [inspectData, setInspectData] = useState<{ message: string; clueUnlocked?: boolean } | null>(null);
  const [isNearbyInteractable, setIsNearbyInteractable] = useState<boolean>(false);

  // Virtual Controls Direction
  const [virtualDirection, setVirtualDirection] = useState<{ x: number; y: number } | null>(null);

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

  // Save to localStorage
  useEffect(() => {
    if (hasStarted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameState, player }));
      } catch {}
    }
  }, [gameState, player, hasStarted]);

  // Start new game from CharacterSelect
  const handleStartGame = (name: string, avatar: AvatarType, major: MajorType) => {
    const newPlayer: PlayerState = {
      name,
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
      let majorIntroMsg = `Welcome, ${name}! You are in the AKL (Accounting & Finance) department. Principal Pak Haryono asks for your analytical skills to examine the 25th Anniversary Golden Trophy registry.`;

      if (major === 'Otomotif') {
        majorIntroMsg = `Welcome, ${name}! You are in the Otomotif department. Principal Pak Haryono requests your mechanical eye to examine the trophy pedestal mounts and workshop clues.`;
      } else if (major === 'TJKT') {
        majorIntroMsg = `Welcome, ${name}! You are in the TJKT (Computer Network) department. Principal Pak Haryono needs your technical expertise to check CCTV server timestamp logs.`;
      }

      setInspectData({
        message: majorIntroMsg,
        clueUnlocked: false
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

  // Inspect Object
  const handleInspectObject = (msg: string, clueId?: string) => {
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
      message: msg,
      clueUnlocked: unlocked
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
    <main className="w-screen h-screen relative overflow-hidden bg-[#FFFBF5] select-none font-['Nunito']">
      {!hasStarted ? (
        <CharacterSelect onStart={handleStartGame} />
      ) : (
        <>
          {/* Top HUD */}
          <HUD
            gameState={gameState}
            currentZone={player.zone}
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
            onInspectObject={(msg, clueId) => handleInspectObject(msg, clueId)}
            virtualDirection={virtualDirection}
            onInteractRequested={() => {}}
            setNearbyInteractable={setIsNearbyInteractable}
          />

          {/* Virtual Controls for mobile & touch (Auto-hidden when any modal is open to avoid collision) */}
          <VirtualControls
            onDirectionChange={dir => setVirtualDirection(dir)}
            onInteract={() => {
              const event = new KeyboardEvent('keydown', { code: 'KeyE' });
              window.dispatchEvent(event);
            }}
            isNearbyInteractable={isNearbyInteractable}
            isVisible={!isAnyModalActive}
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

          {/* Scene Inspection Modal */}
          {inspectData && (
            <InspectModal
              message={inspectData.message}
              clueUnlocked={inspectData.clueUnlocked}
              onClose={() => setInspectData(null)}
            />
          )}

          {/* Victory Modal */}
          {showVictory && (
            <VictoryModal
              gameState={gameState}
              playerName={player.name}
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
