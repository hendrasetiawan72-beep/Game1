/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AvatarType,
  DialogueChoice,
  DialogueNode,
  GameState,
  InspectData,
  MajorType,
  NPCData,
  PlayerState,
  ZoneId,
  AnsweredNPCRecord
} from './types/game';
import { DIALOGUE_NODES } from './data/story';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
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
import { DailyMissionModal } from './components/DailyMissionModal';
import { ReviewedDialogueModal } from './components/ReviewedDialogueModal';
import { RoomRestrictionModal } from './components/RoomRestrictionModal';
import { QuizLockedModal } from './components/QuizLockedModal';
import { sound } from './utils/audio';
import { getDailyMission, loadDailyMissionState, completeDailyMission, DailyMissionState, getTodayDateString } from './utils/dailyMission';
import { getRequiredCluesForDay, isRoomAllowedForMajor, getMajorRoom, checkDayCompletion, AccessibleWitness } from './utils/gameRules';

const STORAGE_KEY = 'opinion_quest_muhiba_save_v3';

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
  answeredNpcs: {},
  gameCompleted: false
};

const INITIAL_PLAYER_STATE: PlayerState = {
  name: 'Rizky',
  studentClass: 'X AKL 1',
  avatar: 'girl_hijab',
  major: 'AKL',
  x: 520,
  y: 460, // Clear open plaza south of pedestal base (y: 340-410)
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
      if (saved) {
        const parsed = JSON.parse(saved).player;
        if (parsed) {
          // If player was saved at old stuck position near pedestal, reposition safely
          if (parsed.zone === 'courtyard' && parsed.y > 330 && parsed.y < 445 && parsed.x > 480 && parsed.x < 620) {
            parsed.y = 460;
          }
          return parsed;
        }
      }
    } catch {}
    return INITIAL_PLAYER_STATE;
  });

  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Daily Mission State & Streak
  const [dailyMissionState, setDailyMissionState] = useState<DailyMissionState>(loadDailyMissionState);
  const [showDailyMission, setShowDailyMission] = useState<boolean>(false);
  const dailyMission = getDailyMission();

  // Modal States
  const [activeDialogueNode, setActiveDialogueNode] = useState<DialogueNode | null>(null);
  const currentTalkingNpcRef = useRef<NPCData | null>(null);
  const [reviewedDialogueRecord, setReviewedDialogueRecord] = useState<AnsweredNPCRecord | null>(null);

  const [roomRestrictionAlert, setRoomRestrictionAlert] = useState<{
    studentMajor: MajorType;
    attemptedLab: string;
    assignedLab: string;
  } | null>(null);

  const [quizLockedAlert, setQuizLockedAlert] = useState<{
    day: number;
    currentClues: number;
    requiredClues: number;
    answeredCount: number;
    totalConversations: number;
    remainingWitnesses: AccessibleWitness[];
  } | null>(null);

  const [autoQuizTriggeredForChapter, setAutoQuizTriggeredForChapter] = useState<number | null>(null);
  const [showAutoQuizBanner, setShowAutoQuizBanner] = useState<boolean>(false);

  const [activeMinigame, setActiveMinigame] = useState<'akl' | 'otomotif' | 'tjkt' | null>(null);
  const [showPhraseBank, setShowPhraseBank] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showChapterEnd, setShowChapterEnd] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [inspectData, setInspectData] = useState<InspectData | null>(null);
  const [isNearbyInteractable, setIsNearbyInteractable] = useState<boolean>(false);

  // Determine if any modal is currently active to prevent navigation collision
  const isAnyModalActive =
    !!activeDialogueNode ||
    !!reviewedDialogueRecord ||
    !!roomRestrictionAlert ||
    !!quizLockedAlert ||
    showDailyMission ||
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
      let majorIntroMsg = `Welcome, ${name} (${studentClass})! As an AKL (Accounting & Finance) investigator, Principal Pak Haryono requests your analytical skills to examine the 25th Anniversary Golden Trophy registry in the AKL Lab.`;

      if (major === 'Otomotif') {
        majorIntroMsg = `Welcome, ${name} (${studentClass})! As an Otomotif investigator, Principal Pak Haryono requests your mechanical eye to examine the trophy pedestal mounts and workshop clues in the Otomotif Workshop.`;
      } else if (major === 'TJKT') {
        majorIntroMsg = `Welcome, ${name} (${studentClass})! As a TJKT (Computer Network) investigator, Principal Pak Haryono needs your technical expertise to check CCTV server timestamp logs in the TJKT Lab.`;
      }

      setInspectData({
        title: 'Investigation Orientation',
        message: majorIntroMsg,
        choices: [
          {
            text: 'I understand, and I agree to proceed respectfully with this investigation.',
            isCorrect: true,
            feedback: 'Polite and professional! "I agree to proceed..." confirms your commitment to constructive inquiry.',
            trustChange: 15
          },
          {
            text: 'In my opinion, we should first interview witnesses around the courtyard before entering our lab.',
            isCorrect: true,
            feedback: 'Sound investigative initiative! "In my opinion..." introduces your strategic recommendation.',
            trustChange: 15
          },
          {
            text: 'From my point of view, our assigned department room will hold the most critical evidence.',
            isCorrect: true,
            feedback: 'Analytical! "From my point of view..." directs attention to the departments.',
            trustChange: 15
          }
        ]
      });
    }, 400);
  };

  // Talk to NPC handler
  // Rule: once an NPC has been talked to in current chapter, display previously answered text
  const handleTalkToNPC = useCallback((npc: NPCData) => {
    sound.playClick();

    const recordKey = `${npc.id}_ch${gameState.currentChapter}`;
    const existingRecord = gameState.answeredNpcs?.[recordKey];

    if (existingRecord) {
      setReviewedDialogueRecord(existingRecord);
      return;
    }

    currentTalkingNpcRef.current = npc;

    let nodeId = npc.initialDialogueNodeId;
    if (npc.chapterDialogueNodes && npc.chapterDialogueNodes[gameState.currentChapter]) {
      nodeId = npc.chapterDialogueNodes[gameState.currentChapter];
    }

    const node = DIALOGUE_NODES[nodeId];
    if (node) {
      setActiveDialogueNode(node);
    }
  }, [gameState.currentChapter, gameState.answeredNpcs]);

  // Choice selected in DialogueModal
  const handleChoiceSelected = (choice: DialogueChoice) => {
    const newTrust = Math.min(100, Math.max(0, gameState.trustMeter + choice.trustChange));
    const scoreAdd = choice.isCorrect ? 25 : 5;

    let newClues = [...gameState.collectedClues];
    if (choice.unlockClueId && !newClues.includes(choice.unlockClueId)) {
      newClues.push(choice.unlockClueId);
      sound.playSparkle();
    }

    const currentNpc = currentTalkingNpcRef.current;
    let newAnswered = { ...(gameState.answeredNpcs || {}) };

    if (currentNpc && activeDialogueNode) {
      const recordKey = `${currentNpc.id}_ch${gameState.currentChapter}`;
      newAnswered[recordKey] = {
        npcId: currentNpc.id,
        speaker: activeDialogueNode.speaker,
        speakerRole: activeDialogueNode.speakerRole,
        avatarType: activeDialogueNode.avatarType,
        questionText: activeDialogueNode.text,
        chosenAnswer: choice.text,
        feedback: choice.feedback,
        isCorrect: choice.isCorrect,
        trustChange: choice.trustChange,
        chapter: gameState.currentChapter
      };
    }

    setGameState(prev => ({
      ...prev,
      trustMeter: newTrust,
      score: prev.score + scoreAdd,
      collectedClues: newClues,
      talkedNpcs: currentNpc ? Array.from(new Set([...prev.talkedNpcs, currentNpc.id])) : prev.talkedNpcs,
      answeredNpcs: newAnswered
    }));

    if (choice.nextNodeId && DIALOGUE_NODES[choice.nextNodeId]) {
      setActiveDialogueNode(DIALOGUE_NODES[choice.nextNodeId]);
    } else {
      setActiveDialogueNode(null);
      currentTalkingNpcRef.current = null;
    }
  };

  // Door transition with Major Department Room Restriction
  const handleEnterDoor = (targetZone: ZoneId, targetX: number, targetY: number) => {
    // If entering a lab room from the Courtyard, enforce that the student enters their assigned major room!
    if (player.zone === 'courtyard' && targetZone !== 'courtyard') {
      if (!isRoomAllowedForMajor(targetZone, player.major)) {
        sound.playWrong();
        const assigned = getMajorRoom(player.major);
        const attempted =
          targetZone === 'akl'
            ? 'AKL Accounting Lab'
            : targetZone === 'otomotif'
            ? 'Otomotif Workshop'
            : 'TJKT Network Lab';

        // Immediately push player safely backward southwards off the door mat onto the open walkway (y: 145)
        setPlayer(prev => ({
          ...prev,
          y: 145,
          direction: 'down',
          isMoving: false
        }));

        setRoomRestrictionAlert({
          studentMajor: player.major,
          attemptedLab: attempted,
          assignedLab: assigned.name
        });
        return;
      }
    }

    setPlayer(prev => ({
      ...prev,
      zone: targetZone,
      x: targetX,
      y: targetY,
      isMoving: false
    }));
  };

  // Safe dismiss for room restriction modal that ensures player is positioned on the open walkway
  const handleDismissRoomRestriction = () => {
    sound.playClick();
    setRoomRestrictionAlert(null);
    setPlayer(prev => ({
      ...prev,
      y: 145,
      direction: 'down',
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

  const dayCompletion = checkDayCompletion(gameState, player.major);

  // Banner when all required clue cards are unlocked - directly clickable to open quiz
  useEffect(() => {
    if (!hasStarted || gameState.gameCompleted) return;
    const ch = gameState.currentChapter;
    if (gameState.completedQuizzes[ch]) {
      setShowAutoQuizBanner(false);
      return;
    }

    if (dayCompletion.hasEnoughClues && !showQuiz && !showChapterEnd && !showVictory) {
      if (autoQuizTriggeredForChapter !== ch) {
        setAutoQuizTriggeredForChapter(ch);
        sound.playFanfare();
        setShowAutoQuizBanner(true);
      }
    } else {
      setShowAutoQuizBanner(false);
    }
  }, [
    hasStarted,
    gameState.completedQuizzes,
    gameState.currentChapter,
    gameState.gameCompleted,
    dayCompletion.hasEnoughClues,
    showQuiz,
    showChapterEnd,
    showVictory,
    autoQuizTriggeredForChapter
  ]);

  // Fail-safe: if all witnesses are interviewed but required clues were not collected,
  // automatically stop the game and record final score!
  useEffect(() => {
    if (
      !hasStarted ||
      gameState.gameCompleted ||
      showVictory ||
      showQuiz ||
      showChapterEnd ||
      activeDialogueNode ||
      inspectData ||
      activeMinigame
    ) {
      return;
    }

    if (dayCompletion.hasCompletedAllConversations && !dayCompletion.hasEnoughClues) {
      sound.playWrong();
      setGameState(prev => ({
        ...prev,
        gameCompleted: true
      }));
      setShowVictory(true);
    }
  }, [
    hasStarted,
    gameState.gameCompleted,
    showVictory,
    showQuiz,
    showChapterEnd,
    activeDialogueNode,
    inspectData,
    activeMinigame,
    dayCompletion.hasCompletedAllConversations,
    dayCompletion.hasEnoughClues
  ]);

  // Open Quiz handler with Clue & Interview Gating:
  // Day 1 requires 2 clues, Day 2 requires 4 clues total, Day 3 requires 7 clues total
  // AND all accessible witnesses for the day must be interviewed
  const handleOpenQuizRequested = () => {
    if (!dayCompletion.isComplete) {
      sound.playWrong();
      setQuizLockedAlert({
        day: gameState.currentChapter,
        currentClues: dayCompletion.currentClues,
        requiredClues: dayCompletion.requiredClues,
        answeredCount: dayCompletion.answeredCount,
        totalConversations: dayCompletion.totalConversations,
        remainingWitnesses: dayCompletion.remainingWitnesses
      });
      return;
    }
    sound.playClick();
    setShowQuiz(true);
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

  // Advance Chapter / Day
  const handleAdvanceChapter = () => {
    setShowChapterEnd(false);
    setAutoQuizTriggeredForChapter(null);
    setShowAutoQuizBanner(false);
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

  // Daily Mission completion handler
  const handleCompleteDailyMission = () => {
    const updated = completeDailyMission();
    setDailyMissionState(updated);
    setGameState(prev => ({
      ...prev,
      score: prev.score + dailyMission.bonusPoints
    }));
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
          {/* Top HUD with Timer, Clue Gated Quiz, Daily Mission, and Submerging on Movement */}
          <HUD
            gameState={gameState}
            currentZone={player.zone}
            playerName={player.name}
            studentClass={player.studentClass}
            elapsedSeconds={gameState.elapsedSeconds || 0}
            dailyStreak={dailyMissionState.currentStreak}
            isDailyMissionCompleted={dailyMissionState.lastCompletedDate === getTodayDateString()}
            isQuizUnlocked={dayCompletion.isComplete}
            answeredConversationsCount={dayCompletion.answeredCount}
            totalConversationsCount={dayCompletion.totalConversations}
            isMoving={player.isMoving}
            onExitToCourtyard={handleExitToCourtyard}
            onOpenPhraseBank={() => setShowPhraseBank(true)}
            onOpenInventory={() => setShowInventory(true)}
            onOpenQuiz={handleOpenQuizRequested}
            onOpenDailyMission={() => setShowDailyMission(true)}
            onRestart={handleRestart}
          />

          {/* Celebratory Quiz Ready Banner - Can be directly clicked/tapped to open Quiz */}
          {showAutoQuizBanner && (
            <div
              onClick={() => {
                sound.playFanfare();
                setShowAutoQuizBanner(false);
                setShowQuiz(true);
              }}
              className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-2 border-white text-white font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 transition-all animate-bounce"
            >
              <span className="text-xl">🎉</span>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-emerald-200 font-extrabold">
                  Semua Kartu Terbuka!
                </div>
                <div className="font-black text-white text-xs sm:text-sm">
                  Tekan di sini untuk buka Quiz Day {gameState.currentChapter} & lanjut ke hari selanjutnya →
                </div>
              </div>
            </div>
          )}

          {/* 60fps Game Canvas with Touch & Flick Navigation */}
          <GameCanvas
            player={player}
            onUpdatePlayer={update => setPlayer(prev => ({ ...prev, ...update }))}
            gameState={gameState}
            onTalkToNPC={handleTalkToNPC}
            onEnterDoor={handleEnterDoor}
            onTriggerMinigame={handleTriggerMinigame}
            onInspectObject={(msg, clueId, label) => handleInspectObject(msg, clueId, label)}
            setNearbyInteractable={setIsNearbyInteractable}
            isPaused={isAnyModalActive}
          />

          {/* Modals & Popups */}

          {/* Dialogue Box (New active interview) */}
          {activeDialogueNode && (
            <DialogueModal
              node={activeDialogueNode}
              onChoiceSelected={handleChoiceSelected}
              onClose={() => {
                setActiveDialogueNode(null);
                currentTalkingNpcRef.current = null;
              }}
              trustMeter={gameState.trustMeter}
            />
          )}

          {/* Reviewed Dialogue Modal (When speaking again to an already-interviewed NPC) */}
          {reviewedDialogueRecord && (
            <ReviewedDialogueModal
              record={reviewedDialogueRecord}
              onClose={() => setReviewedDialogueRecord(null)}
            />
          )}

          {/* Daily English Opinion Mission Modal */}
          {showDailyMission && (
            <DailyMissionModal
              mission={dailyMission}
              missionState={dailyMissionState}
              onComplete={handleCompleteDailyMission}
              onClose={() => setShowDailyMission(false)}
            />
          )}

          {/* Room Restriction Modal */}
          {roomRestrictionAlert && (
            <RoomRestrictionModal
              studentMajor={roomRestrictionAlert.studentMajor}
              attemptedLab={roomRestrictionAlert.attemptedLab}
              assignedLab={roomRestrictionAlert.assignedLab}
              onClose={handleDismissRoomRestriction}
            />
          )}

          {/* Quiz Locked Modal */}
          {quizLockedAlert && (
            <QuizLockedModal
              day={quizLockedAlert.day}
              currentClues={quizLockedAlert.currentClues}
              requiredClues={quizLockedAlert.requiredClues}
              answeredCount={quizLockedAlert.answeredCount}
              totalConversations={quizLockedAlert.totalConversations}
              remainingWitnesses={quizLockedAlert.remainingWitnesses}
              onClose={() => setQuizLockedAlert(null)}
              onOpenInventory={() => setShowInventory(true)}
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
              isFailed={dayCompletion.hasCompletedAllConversations && !dayCompletion.hasEnoughClues}
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
