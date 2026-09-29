'use client';

/**
 * GameRenderer — The ONE React component that mounts the game engine.
 *
 * All 133 games use this same component. It:
 * 1. Loads the game JSON data
 * 2. Creates a PixiJS canvas
 * 3. Initializes the GameEngine
 * 4. Renders teaching slides and challenges on the canvas
 * 5. Handles React-side UI overlays (slide navigation, progress bar)
 * 6. Calls onComplete when the game is done
 *
 * Usage:
 * <GameRenderer gameData={countingGameData} onComplete={(score) => ...} />
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LottieCelebration } from '../feedback/LottieCelebration';
import { RiveMascot, getMascotForSubject, type MascotMood } from '../mascots/RiveMascot';
import { LoadingScreen } from '../feedback/LoadingScreen';
import { simplifySlideText, simplifySlideTitle } from '../../lib/game-engine/SlideSimplifier';
import { getPracticePhase, getPhaseHint, getPhaseCorrectFeedback, getPhaseWrongFeedback, type GuidedPracticeState } from '../../lib/game-engine/GuidedPractice';
import { generateErrorFeedback } from '../../lib/game-engine/ErrorFeedback';
import { triggerHaptic, triggerScreenShake, playSnapSound, playSuccessChime, playPopSound } from '../../lib/game-engine/FeedbackEffects';
import { expandChallenges } from '../../lib/game-engine/ChallengeExpander';
import { isCanvasInteractive } from '../../lib/game-engine/canvasInteractive';
import { BackgroundMusic } from '../../lib/game-engine/BackgroundMusic';
import { getConnectionMessage } from '../../lib/game-engine/TopicConnections';
import { GameProgressStore } from '../../lib/game-engine/GameProgressStore';
import { GameEngine } from '../../lib/game-engine/GameEngine';
import { Renderer } from '../../lib/game-engine/Renderer';
import { audioManager } from '../../lib/sim-engine/audio';
import { speechManager } from '../../lib/sim-engine/speech';
import { recordGameCompletion } from '../../lib/game-engine/LivingWorldMap';
import { Draggable } from '../sim-primitives/Draggable';
import type { GameData, EngineState, GamePhase } from '../../lib/game-engine/types';
import { LearningAnalytics } from '../../lib/game-engine/analytics/LearningAnalytics';
import { ScaffoldingManager } from '../../lib/game-engine/scaffolding/ScaffoldingManager';
import { GamificationManager, BADGES } from '../../lib/game-engine/gamification/GamificationManager';
import { AccessibilityManager } from '../../lib/game-engine/accessibility/AccessibilityManager';
import { NarrativeManager } from '../../lib/game-engine/narrative/NarrativeManager';
import type { Badge } from '../../lib/game-engine/gamification/types';
import type { Insight } from '../../lib/game-engine/analytics/types';

export interface GameRendererProps {
  gameData: GameData;
  onComplete?: (score: number) => void;
  onStateChange?: (state: EngineState) => void;
  width?: number;
  height?: number;
  debug?: boolean;
}

// ─── Helper: detect if a challenge is canvas-interactive ───────

export function GameRenderer({
  gameData,
  onComplete,
  onStateChange,
  width = 720,
  height = 560,
  debug = false,
}: GameRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);

  const [phase, setPhase] = useState<GamePhase>('loading');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(100);
  const [artifactProgress, setArtifactProgress] = useState(0);
  const [adaptiveMode, setAdaptiveMode] = useState<'normal' | 'easier' | 'harder'>('normal');
  const [gameComplete, setGameComplete] = useState(false);
  const [rendererError, setRendererError] = useState<string | null>(null);
  const [sortPlaced, setSortPlaced] = useState<Record<string, boolean>>({});
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [mascotSpeech, setMascotSpeech] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showMeActive, setShowMeActive] = useState(false);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  // ─── World-class systems state ──────────────────────────────
  const analyticsRef = useRef<LearningAnalytics | null>(null);
  const scaffoldRef = useRef<ScaffoldingManager | null>(null);
  const gamificationRef = useRef<GamificationManager | null>(null);
  const a11yRef = useRef<AccessibilityManager | null>(null);
  const challengeStartTime = useRef<number>(Date.now());
  const [badgePopup, setBadgePopup] = useState<Badge | null>(null);
  const [streakInfo, setStreakInfo] = useState({ current: 0, best: 0, daily: 0, onFire: false });
  const [insights, setInsights] = useState<Insight[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [celebrationTrigger, setCelebrationTrigger] = useState(0);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [mascotSrc, setMascotSrc] = useState<string>('/rive/owl-mascot.riv');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [responsiveSize, setResponsiveSize] = useState({ w: width, h: height });
  const [guidedPractice, setGuidedPractice] = useState<GuidedPracticeState | null>(null);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const lastWrongAnswerRef = useRef<string>('');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [reviewSuggestions, setReviewSuggestions] = useState<Array<{ topic: string; subject: string; daysOverdue: number }>>([]);
  const [showA11yPanel, setShowA11yPanel] = useState(false);
  const [a11yConfig, setA11yConfig] = useState<{ reducedMotion: boolean; colorblindMode: boolean; fontSize: string; highContrast: boolean }>({ reducedMotion: false, colorblindMode: false, fontSize: 'medium', highContrast: false });
  const [showWorld, setShowWorld] = useState(false);
  const [narrativeName, setNarrativeName] = useState<string | null>(null);
  const [narrativeEmoji, setNarrativeEmoji] = useState<string | null>(null);

  // ─── Canvas Visual Challenge Updates ────────────────────────
  // When the correct answer is revealed, update the canvas visual to show it.
  // When a wrong answer happens, show a step-by-step solution walkthrough.

  useEffect(() => {
    if (showCorrectAnswer && rendererRef.current) {
      rendererRef.current.showVisualCorrectAnswer();
    }
  }, [showCorrectAnswer]);

  useEffect(() => {
    if (wrongAnswer && rendererRef.current && attemptCount === 1) {
      // Show solution walkthrough after first wrong answer
      rendererRef.current.showSolutionWalkthrough();
    }
  }, [wrongAnswer, attemptCount]);

  // Adaptive difficulty: if 2+ consecutive wrong, switch to easier mode
  // If 3+ consecutive correct, the game naturally progresses (no skip needed since
  // each correct answer advances). But we can reduce hint frequency for fast learners.
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setAdaptiveDifficulty(consecutiveWrong >= 2);
    }
    // Show encouragement after struggling
    if (consecutiveWrong >= 2) {
      setMascotMood('sad');
      setMascotSpeech("It's okay! Making mistakes is how we learn. Let me help you! 💪");
    }
  }, [consecutiveWrong]);

  // Track consecutive correct answers for positive reinforcement
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  // Reset consecutive correct on new challenge
  useEffect(() => {
    if (phase === 'playing' && challenge) {
      setConsecutiveCorrect(0);
    }
  }, [currentChallenge, phase]);

  // Positive reinforcement for streaks
  useEffect(() => {
    if (consecutiveCorrect >= 3) {
      setMascotSpeech("Wow! You're on fire! 🌟 Keep going!");
      setMascotMood('celebrate');
    }
  }, [consecutiveCorrect]);

  // ─── Pass scaffold manager to renderer ──────────────────────
  useEffect(() => {
    if (rendererRef.current && scaffoldRef.current) {
      rendererRef.current.setScaffoldManager(scaffoldRef.current);
    }
  }, [scaffoldRef.current]);

  // ─── Initialize Engine ──────────────────────────────────────

  useEffect(() => {
    if (!containerRef.current) return;

    // ─── Initialize world-class systems ──────────────────────
    if (!analyticsRef.current) {
      const analytics = new LearningAnalytics();
      analytics.init('student_001', 'Student', gameData.classLevel || 1);
      analyticsRef.current = analytics;

      const scaffold = new ScaffoldingManager(analytics);
      scaffoldRef.current = scaffold;

      const gamification = new GamificationManager(analytics);
      gamification.setBadgeCallback((badge) => {
        setBadgePopup(badge);
        audioManager.play('success');
        setTimeout(() => setBadgePopup(null), 4000);
      });
      gamificationRef.current = gamification;

      const a11y = new AccessibilityManager();
      a11y.init();
      a11yRef.current = a11y;
      setA11yConfig(a11y.getConfig());

      setStreakInfo(gamification.getStreakInfo());
    }

    // ─── Set narrative context ───────────────────────────────
    const topic = NarrativeManager.detectTopic(
      gameData.challenges[0]?.question || '',
      gameData.subject || '',
    );
    const story = NarrativeManager.getStory(topic);
    setNarrativeName(story.mascotName);
    setNarrativeEmoji(story.mascotEmoji);
    // Set Rive mascot based on subject
    setMascotSrc(getMascotForSubject(gameData.subject || 'maths', topic));
    setMascotMood('happy');

    // Expand challenges for more practice (8 → 24)
    const expandedData = {
      ...gameData,
      challenges: expandChallenges(gameData.challenges, gameData.subject || 'maths'),
    };

    // Create engine
    const engine = new GameEngine(expandedData);
    engineRef.current = engine;

    // Listen to engine events
    engine.on((event) => {
      switch (event.type) {
        case 'phase-change':
          setPhase(event.data?.phase as GamePhase);
          break;
        case 'slide-change':
          setCurrentSlide(event.data?.index as number);
          break;
        case 'challenge-start':
          setCurrentChallenge(event.data?.index as number);
          // Reset sort state for new challenge
          setSortPlaced({});
          setWrongAnswer(null);
          setShowCorrectAnswer(false);
          setAttemptCount(0);
          setMascotSpeech(null);
          setShowMeActive(false);
          setConsecutiveWrong(0);
          setMascotMood('thinking');
          // Update guided practice phase
          const gp = getPracticePhase(event.data?.index as number, totalChallenges);
          setGuidedPractice(gp);
          setMascotSpeech(gp.encouragement);
          setErrorFeedback(null); // Clear error feedback on new challenge
          // Save progress for session persistence
          GameProgressStore.save({
            gameFile: gameData.gameFile,
            classLevel: gameData.classLevel,
            currentChallenge: (event.data?.index as number) + 1,
            stars: engine.getStars(),
            score: engine.getScore(),
            timestamp: new Date().toISOString(),
          });
          challengeStartTime.current = Date.now();
          break;
        case 'answer-correct':
          setStars(engine.getStars());
          setMascotSpeech('Great job! You got it! 🎉');
          setWrongAnswer(null);
          setShowCorrectAnswer(false);
          setConsecutiveWrong(0);
          setConsecutiveCorrect(prev => prev + 1);
          setCelebrationTrigger(prev => prev + 1); // Fire Lottie confetti
          setMascotMood('celebrate');
          setErrorFeedback(null); // Clear error feedback on correct answer
          // Tactile + audio feedback for correct answer
          triggerHaptic('success');
          playSuccessChime();
          // Phase-specific correct feedback
          if (guidedPractice) {
            setMascotSpeech(getPhaseCorrectFeedback(guidedPractice.phase));
          }
          // ─── Record to analytics ────────────────────────────
          if (analyticsRef.current && gamificationRef.current && challenge) {
            const timeTaken = (Date.now() - challengeStartTime.current) / 1000;
            const topic = NarrativeManager.detectTopic(challenge.question, gameData.subject || '');
            analyticsRef.current.recordAttempt({
              question: challenge.question,
              subject: gameData.subject || 'maths',
              topic,
              studentAnswer: challenge.answer,
              correctAnswer: challenge.answer,
              correct: true,
              timeTaken,
              hintsUsed: attemptCount,
              showMeUsed: showMeActive,
              classLevel: gameData.classLevel || 1,
            });
            gamificationRef.current.recordCorrect({
              subject: gameData.subject || 'maths',
              timeTaken,
              showMeUsed: showMeActive,
              perfectGame: engine.getStars() === gameData.challenges.length,
            });
            setStreakInfo(gamificationRef.current.getStreakInfo());
            // Show insights every 5 challenges
            if ((currentChallenge + 1) % 5 === 0) {
              setInsights(analyticsRef.current.getInsights());
              setShowInsights(true);
              setTimeout(() => setShowInsights(false), 6000);
            }
          }
          break;
        case 'answer-wrong':
          setScore(engine.getScore());
          setAttemptCount(prev => prev + 1);
          setConsecutiveWrong(prev => prev + 1);
          setConsecutiveCorrect(0);
          setMascotMood('sad');
          // Tactile feedback for wrong answer
          triggerHaptic('error');
          if (containerRef.current?.parentElement) {
            triggerScreenShake(containerRef.current.parentElement, 'light');
          }
          // Phase-specific wrong feedback
          if (guidedPractice) {
            setMascotSpeech(getPhaseWrongFeedback(guidedPractice.phase));
          }
          // Generate specific error feedback
          if (challenge) {
            const feedback = generateErrorFeedback(
              challenge.question,
              lastWrongAnswerRef.current || wrongAnswer || '',
              challenge.answer,
              gameData.subject || 'maths',
              NarrativeManager.detectTopic(challenge.question, gameData.subject || ''),
            );
            setErrorFeedback(`${feedback.emoji} ${feedback.message} ${feedback.suggestion}`);
          }
          // ─── Record wrong to analytics + gamification ────────
          if (analyticsRef.current && gamificationRef.current && challenge) {
            const topic = NarrativeManager.detectTopic(challenge.question, gameData.subject || '');
            analyticsRef.current.recordAttempt({
              question: challenge.question,
              subject: gameData.subject || 'maths',
              topic,
              studentAnswer: 'wrong',
              correctAnswer: challenge.answer,
              correct: false,
              timeTaken: (Date.now() - challengeStartTime.current) / 1000,
              hintsUsed: attemptCount,
              showMeUsed: showMeActive,
              classLevel: gameData.classLevel || 1,
            });
            gamificationRef.current.recordWrong();
            setStreakInfo(gamificationRef.current.getStreakInfo());
          }
          // ─── Trigger remediation (alternative explanation) ──
          // After the 1st wrong answer, show an alternative representation
          if (rendererRef.current && challenge && attemptCount === 0) {
            setTimeout(() => {
              rendererRef.current?.triggerRemediation(
                challenge.question,
                gameData.subject || 'maths',
                challenge.answer,
                'wrong',
              );
            }, 1500);
          }
          break;
        case 'artifact-update':
          setArtifactProgress(event.data?.progress as number);
          break;
        case 'game-complete':
          setGameComplete(true);
          setScore(engine.getScore());
          setStars(engine.getStars());
          // Record to living world
          if (gameData.cisceNodes[0]) {
            recordGameCompletion(gameData.cisceNodes[0], engine.getScore(), engine.getStars());
          }
          // Get spiral review suggestions
          if (analyticsRef.current) {
            const due = analyticsRef.current.getDueReviews().slice(0, 3);
            setReviewSuggestions(due.map(r => ({ topic: r.topic, subject: r.subject, daysOverdue: r.daysOverdue })));
          }
          onComplete?.(engine.getScore());
          // Clear saved progress on completion
          GameProgressStore.clear(gameData.gameFile);
          break;
      }
      onStateChange?.(engine.getState());
    });

    // Create renderer (PixiJS) — try WebGL first, fallback to Canvas2D
    const { w: rw, h: rh } = responsiveSize;
    let renderer: Renderer | null = null;
    try {
      renderer = new Renderer(containerRef.current, engine, rw, rh);
      rendererRef.current = renderer;
    } catch (err) {
      console.error('WebGL renderer failed, trying Canvas2D fallback:', err);
      try {
        // Retry with forceCanvas option
        renderer = new Renderer(containerRef.current, engine, rw, rh, true);
        rendererRef.current = renderer;
      } catch (err2) {
        console.error('Canvas2D fallback also failed:', err2);
        setRendererError('Unable to initialize game renderer. Your browser may not support WebGL or Canvas2D.');
        return;
      }
    }

    // Unlock audio on first interaction
    const handleFirstInteraction = () => {
      audioManager.unlock();
      speechManager.unlock();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    // Start the game
    engine.start();

    // Cleanup
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      engine.destroy();
      renderer?.destroy();
      engineRef.current = null;
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.gameFile]);

  // ─── Loading screen: show while assets preload ──────────────
  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 25 + 10;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 400);
      }
      setLoadingProgress(prog);
    }, 200);
    return () => clearInterval(interval);
  }, [gameData.gameFile]);

  // ─── Responsive sizing — adapt canvas to container ──────────
  useEffect(() => {
    const computeSize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const availW = parent.clientWidth;
      const availH = parent.clientHeight;
      // Maintain 9:7 aspect ratio (close to 720:560), fit within parent
      const aspectRatio = 720 / 560;
      let w = availW;
      let h = w / aspectRatio;
      if (h > availH) {
        h = availH;
        w = h * aspectRatio;
      }
      // Clamp to reasonable bounds
      w = Math.max(320, Math.min(w, 720));
      h = Math.max(280, Math.min(h, 560));
      setResponsiveSize({ w: Math.round(w), h: Math.round(h) });
    };
    computeSize();
    const ro = new ResizeObserver(computeSize);
    if (containerRef.current?.parentElement) {
      ro.observe(containerRef.current.parentElement);
    }
    window.addEventListener('resize', computeSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computeSize);
    };
  }, []);

  // ─── Resize handler ─────────────────────────────────────────

  useEffect(() => {
    const { w, h } = responsiveSize;
    rendererRef.current?.resize(w, h);
  }, [responsiveSize]);

  // ─── Teaching Phase Controls ────────────────────────────────

  const handleNextSlide = useCallback(() => {
    engineRef.current?.nextSlide();
  }, []);

  // ─── Visual Problem Representation ──────────────────────────
  // Now handled by VisualChallenge component (imported above)

  const handlePrevSlide = useCallback(() => {
    engineRef.current?.prevSlide();
  }, []);

  const handleStartChallenges = useCallback(() => {
    audioManager.play('tap');
    engineRef.current?.startChallenges();
  }, []);

  // ─── Challenge Phase Controls ───────────────────────────────

  const handleNextChallenge = useCallback(() => {
    engineRef.current?.nextChallenge();
  }, []);

  const handleShowHint = useCallback(() => {
    engineRef.current?.showHint();
  }, []);

  // ─── Render ─────────────────────────────────────────────────

  const slide = gameData.slides[currentSlide];
  const challenge = gameData.challenges[currentChallenge];
  const totalSlides = gameData.slides.length;
  const totalChallenges = gameData.challenges.length;

  // ─── Auto-speak narration ───────────────────────────────────

  useEffect(() => {
    if (phase === 'teaching' && slide) {
      const rawText = slide.spoken || slide.text || slide.title || '';
      const text = simplifySlideText(rawText, gameData.classLevel || 1);
      if (text) {
        const timer = setTimeout(() => speechManager.speak(text), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, currentSlide, slide]);

  useEffect(() => {
    if (phase === 'playing' && challenge) {
      const text = challenge.question || '';
      if (text) {
        const timer = setTimeout(() => speechManager.speak(text), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, currentChallenge, challenge]);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-amber-50 mx-auto" style={{ width: responsiveSize.w, height: responsiveSize.h, maxWidth: '100%', maxHeight: '100%' }}>
      {/* Loading screen overlay */}
      <LoadingScreen visible={isLoading} progress={loadingProgress} />
      {/* Lottie celebration overlay */}
      <LottieCelebration trigger={celebrationTrigger} size={350} duration={2000} />
      {/* Renderer Error Fallback */}
      {rendererError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-bold text-red-700 mb-2">Renderer Error</h2>
            <p className="text-sm text-red-600">{rendererError}</p>
          </div>
        </div>
      )}

      {/* PixiJS Canvas Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Rive Mascot overlay (bottom-left, reacts to game events) */}
      {(phase === 'playing' || phase === 'teaching') && (
        <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
          <RiveMascot
            src={mascotSrc}
            mood={mascotMood}
            width={100}
            height={100}
          />
        </div>
      )}

      {/* Teaching Phase Overlay */}
      {phase === 'teaching' && slide && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pointer-events-none">
          {/* Header */}
          <div className="z-10 text-center mt-2 pointer-events-auto">
            <h1 className="text-xl font-black text-gray-800 drop-shadow-sm">
              {gameData.gameFile.replace(/([A-Z])/g, ' $1').trim()}
            </h1>
            <p className="text-xs font-semibold text-gray-500">
              Class {gameData.classLevel} • CBSE
            </p>
          </div>

          {/* Slide Card */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="z-10 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-4 border-gold-200 max-w-md w-full pointer-events-auto my-auto"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${slide.bgColor || 'from-gold-400 to-purple-500'} flex items-center justify-center text-2xl shadow-md mb-3`}>
              {slide.emoji}
            </div>
            <h2 className="text-lg font-black text-gray-800 mb-2 text-center">{simplifySlideTitle(slide.title, gameData.classLevel || 1)}</h2>
            <p className="text-sm font-medium text-gray-600 text-center leading-relaxed">{simplifySlideText(slide.text, gameData.classLevel || 1)}</p>

            {/* Visual diagram is rendered on the PixiJS canvas by the Renderer */}

            {/* Listen button for audio narration */}
            <button
              onClick={() => {
                const rawText = slide.spoken || slide.text || slide.title || '';
                const text = simplifySlideText(rawText, gameData.classLevel || 1);
                if (text) {
                  speechManager.speak(text);
                }
              }}
              className="mt-3 px-5 py-3 rounded-xl bg-gold-100 text-gold-700 text-base font-bold hover:bg-gold-200 transition-all flex items-center gap-2 shadow-sm"
            >
              🔊 Listen
            </button>
          </motion.div>

          {/* Navigation */}
          <div className="z-10 flex items-center justify-between w-full max-w-md px-4 mb-2 pointer-events-auto">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`px-5 py-3 rounded-xl font-bold text-base shadow-md transition-all ${
                currentSlide === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gold-500 text-white hover:bg-gold-600 active:scale-95'
              }`}
            >
              ← Prev
            </button>

            {/* Progress dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-gold-600 scale-125' : 'bg-gold-200'
                  }`}
                />
              ))}
            </div>

            {currentSlide < totalSlides - 1 ? (
              <button
                onClick={handleNextSlide}
                className="px-5 py-3 rounded-xl font-bold text-base bg-gold-500 text-white shadow-md hover:bg-gold-600 active:scale-95 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleStartChallenges}
                className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all animate-bounce"
              >
                Start! 🎮
              </button>
            )}
          </div>

          {/* Inter-topic connection hint on last slide */}
          {currentSlide === totalSlides - 1 && (() => {
            const gameTopic = gameData.gameFile.replace(/Game$/, '').toLowerCase();
            const conn = getConnectionMessage('counting', gameTopic) || getConnectionMessage('addition', gameTopic);
            return conn ? (
              <div className="z-10 mb-2 px-3 py-2 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-700 font-semibold text-center max-w-md pointer-events-auto">
                {conn}
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Playing Phase Overlay */}
      {phase === 'playing' && challenge && (
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {/* Top Bar */}
          <div className="z-10 flex items-center justify-between w-full pl-12 pr-4 pt-2 pointer-events-auto">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md border-2 border-gold-200">
              <span className="text-xs font-bold text-gold-900">
                Challenge {currentChallenge + 1} / {totalChallenges}
              </span>
              {/* Guided practice phase indicator */}
              {guidedPractice && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  guidedPractice.phase === 'i_do' ? 'bg-gold-100 text-gold-700' :
                  guidedPractice.phase === 'we_do' ? 'bg-green-100 text-green-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {guidedPractice.phaseEmoji} {guidedPractice.phaseLabel}
                </span>
              )}
              <div className="flex gap-0.5">
                {Array.from({ length: totalChallenges }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < stars ? 'bg-yellow-400' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>

            {/* Learning Artifact (UPGRADE 3) */}
            {gameData.learningArtifact && (
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md border-2 border-emerald-200">
                <span className="text-xs font-bold text-emerald-700">
                  {gameData.learningArtifact.title}
                </span>
                <span className="text-xs text-emerald-600">
                  {artifactProgress}/{gameData.learningArtifact.totalPieces}
                </span>
              </div>
            )}

            {/* Adaptive indicator */}
            {adaptiveMode !== 'normal' && (
              <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                adaptiveMode === 'easier' ? 'bg-gold-100 text-gold-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {adaptiveMode === 'easier' ? '📝 Easier mode' : '🔥 Harder mode'}
              </div>
            )}
          </div>

          {/* Question */}
          <div className="z-10 flex flex-col items-center bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-gold-200 max-w-lg w-full mx-auto mt-4 pointer-events-auto">
            <p className="text-sm font-bold text-gray-800 text-center leading-snug">
              {challenge.question}
            </p>

            {/* Visual problem representation is rendered on the PixiJS canvas */}

            {/* Interactive challenge indicator */}
            {isCanvasInteractive(challenge.question, gameData.subject || '') && !showCorrectAnswer && (
              <div className="mt-2 px-3 py-1.5 bg-purple-100 rounded-lg border border-purple-300 text-xs text-purple-700 font-bold flex items-center gap-2">
                👆 Drag, tap, or click on the picture above to answer!
              </div>
            )}

            {/* "Show me!" button — guided mode for interactive challenges */}
            {isCanvasInteractive(challenge.question, gameData.subject || '') && !showCorrectAnswer && !showMeActive && (
              <button
                onClick={() => {
                  setShowMeActive(true);
                  setMascotSpeech("Watch closely! I'll show you how, then it's your turn! 👀");
                  speechManager.speak('Watch closely! I will show you how, then it is your turn!');
                  if (rendererRef.current) {
                    rendererRef.current.triggerShowMe();
                  }
                  setTimeout(() => {
                    setShowMeActive(false);
                    setMascotSpeech('Now you try! You can do it! 💪');
                    speechManager.speak('Now you try! You can do it!');
                  }, 4000);
                }}
                className="mt-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-xl shadow-md border-2 border-yellow-500 text-base transition-all"
              >
                🦉 Show me how!
              </button>
            )}

            {/* Multiple choice answer buttons — hidden for canvas-interactive types, shown for others */}
            {!challenge.type.startsWith('sort') && challenge.options && challenge.options.length > 0 && !isCanvasInteractive(challenge.question, gameData.subject || '') && (
              <div className="flex flex-wrap gap-2 justify-center w-full mt-3">
                {challenge.options.map((opt, i) => {
                  const isCorrect = opt === challenge.answer;
                  const isWrong = wrongAnswer === opt;
                  const showCorrect = showCorrectAnswer && isCorrect;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={showCorrectAnswer}
                      onClick={() => {
                        const engine = engineRef.current;
                        if (engine) {
                          engine.onInteraction();
                          playPopSound(); // Pop sound on click
                          const correct = engine.submitAnswer(opt);
                          if (!correct) {
                            setWrongAnswer(opt);
                            lastWrongAnswerRef.current = opt;
                            setConsecutiveWrong(prev => prev + 1);
                            // After 2 wrong attempts, show the correct answer
                            if (attemptCount + 1 >= 2) {
                              setShowCorrectAnswer(true);
                              setMascotSpeech(`The correct answer is ${challenge.answer}! Let's try the next one together. 💪`);
                            } else {
                              setMascotSpeech(`Not quite! ${challenge.hint || 'Try again!'} 🤔`);
                            }
                          }
                        }
                      }}
                      className={`px-4 py-2.5 rounded-xl font-bold shadow-md border-2 text-sm transition-all flex items-center gap-1.5 ${
                        showCorrect
                          ? 'bg-green-500 text-white border-green-600 scale-110'
                          : isWrong
                          ? 'bg-red-400 text-white border-red-500'
                          : 'bg-gradient-to-r from-gold-400 to-purple-400 text-white border-gold-500'
                      }`}
                    >
                      {opt}
                      {showCorrect && <span> ✓</span>}
                      {isWrong && !showCorrect && <span> ✗</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* For interactive challenges: show answer reveal after 2 wrong (canvas-based) */}
            {isCanvasInteractive(challenge.question, gameData.subject || '') && showCorrectAnswer && (
              <div className="mt-3 px-4 py-2 bg-green-100 rounded-xl border-2 border-green-300 text-sm font-bold text-green-700">
                ✓ The answer is: {challenge.answer}
              </div>
            )}

            {/* Mascot speech bubble */}
            {mascotSpeech && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-4 py-2 bg-yellow-100 rounded-2xl border-2 border-yellow-300 text-sm font-semibold text-yellow-800"
              >
                💬 {mascotSpeech}
              </motion.div>
            )}

            {/* Scaffolding hint after wrong answer */}
            {attemptCount > 0 && !showCorrectAnswer && !challenge.type.startsWith('sort') && (
              <div className="mt-2 px-3 py-1.5 bg-gold-50 rounded-lg border border-gold-200 text-xs text-gold-700 font-semibold">
                💡 {guidedPractice ? getPhaseHint(guidedPractice.phase, challenge.hint || 'Take your time and look at the pictures above!') : (challenge.hint || 'Take your time and look at the pictures above!')}
              </div>
            )}

            {/* Specific error feedback — shows how close the answer was */}
            {errorFeedback && !showCorrectAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 px-3 py-2 bg-orange-50 rounded-lg border border-orange-200 text-xs text-orange-800 font-semibold"
              >
                {errorFeedback}
              </motion.div>
            )}

            {/* Adaptive difficulty indicator — struggling student gets easier mode */}
            {consecutiveWrong >= 2 && !showCorrectAnswer && (
              <div className="mt-2 px-3 py-1.5 bg-gold-100 rounded-lg border border-gold-300 text-xs text-gold-700 font-bold">
                📝 Easier mode activated — fewer objects, simpler questions!
              </div>
            )}

            {/* Move on button after correct answer is revealed */}
            {showCorrectAnswer && (
              <button
                onClick={() => {
                  const engine = engineRef.current;
                  if (engine) {
                    // Force correct to advance
                    engine.submitAnswer(challenge.answer);
                  }
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all"
              >
                Got it! Next Challenge →
              </button>
            )}

            {/* Sort challenge — drag-and-drop bins + cards */}
            {challenge.type.startsWith('sort') && challenge.bins && challenge.sortItems && (
              <div className="w-full mt-3">
                <p className="text-xs text-gold-500 font-semibold mb-2">
                  Drag each card into the correct bin!
                </p>
                {/* Bins row */}
                <div className="flex gap-2 justify-center mb-2">
                  {challenge.bins.map((bin, bi) => {
                    const placedItems = challenge.sortItems!.filter(si => sortPlaced[si.id] === true && si.correctBin === bin.id);
                    return (
                      <div
                        key={bin.id}
                        data-bin-id={bin.id}
                        className="flex-1 min-w-[70px] rounded-xl border-2 border-dashed p-2 text-center min-h-[50px]"
                        style={{ borderColor: bin.color || '#6c5ce7', background: (bin.color || '#6c5ce7') + '10' }}
                      >
                        <div className="text-xs font-bold" style={{ color: bin.color || '#6c5ce7' }}>
                          {bin.label}
                        </div>
                        {placedItems.length > 0 && (
                          <div className="text-lg mt-1">{placedItems.map(si => si.emoji || '✓').join(' ')}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Draggable cards area */}
                <div data-sort-container className="relative w-full h-[70px]" style={{ minHeight: 70 }}>
                  {challenge.sortItems.map((item, ii) => {
                    const placed = sortPlaced[item.id] === true;
                    if (placed) return null;
                    const cardW = 90;
                    const cardH = 50;
                    const colCount = Math.max(1, Math.floor(400 / (cardW + 8)));
                    const rowIdx = Math.floor(ii / colCount);
                    const colIdx = ii % colCount;
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={colIdx * (cardW + 8)}
                        y={rowIdx * (cardH + 4)}
                        width={cardW}
                        height={cardH}
                        placed={placed}
                        onDragEnd={(id, dropX, dropY) => {
                          // Check if dropped on a bin — find bin DOM elements
                          const binEls = document.querySelectorAll('[data-bin-id]');
                          let matchedBin: string | null = null;
                          binEls.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            // Adjust for the card center
                            const cardCenterX = rect.left;
                            const cardCenterY = rect.top;
                            // dropX/dropY are relative to parent — use pointer position instead
                          });
                          // Use a simpler approach: check pointer position via event
                          // Actually, the Draggable gives us x/y relative to its parent.
                          // Let's check against bin positions relative to the same parent.
                          const sortContainer = document.querySelector('[data-sort-container]');
                          if (!sortContainer) return false;
                          const containerRect = sortContainer.getBoundingClientRect();
                          binEls.forEach(el => {
                            const binRect = el.getBoundingClientRect();
                            const binLeft = binRect.left - containerRect.left;
                            const binTop = binRect.top - containerRect.top;
                            const binRight = binLeft + binRect.width;
                            const binBottom = binTop + binRect.height;
                            if (dropX + cardW / 2 >= binLeft && dropX + cardW / 2 <= binRight &&
                                dropY + cardH / 2 >= binTop && dropY + cardH / 2 <= binBottom) {
                              matchedBin = el.getAttribute('data-bin-id');
                            }
                          });

                          if (matchedBin) {
                            const isCorrect = matchedBin === item.correctBin;
                            if (isCorrect) {
                              audioManager.play('drop-correct');
                              setSortPlaced(prev => ({ ...prev, [item.id]: true }));
                              const engine = engineRef.current;
                              if (engine) engine.onInteraction();
                              // Check if all placed
                              const allPlaced = challenge.sortItems!.every(si =>
                                si.id === item.id || sortPlaced[si.id] === true
                              );
                              if (allPlaced) {
                                if (engine) engine.submitAnswer('sort');
                              }
                              return true; // snap to bin
                            } else {
                              audioManager.play('error');
                              return false; // spring back
                            }
                          }
                          return false; // spring back if not on a bin
                        }}
                      >
                        <div
                          className="rounded-lg border-2 border-gold-400 bg-white px-2 py-1 text-center shadow-md"
                          style={{ width: cardW, height: cardH }}
                        >
                          <div className="text-[11px] font-bold text-gray-700 leading-tight flex flex-col items-center justify-center h-full">
                            {item.emoji && <span className="text-lg leading-none">{item.emoji}</span>}
                            <span className="text-[10px] mt-0.5">{item.label}</span>
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
                {/* Placed items summary */}
                {Object.values(sortPlaced).filter(v => v === true).length > 0 && (
                  <div className="text-center text-[11px] text-green-600 font-semibold mt-1">
                    {Object.values(sortPlaced).filter(v => v === true).length} / {challenge.sortItems.length} sorted correctly
                  </div>
                )}
              </div>
            )}

            {/* Hint button */}
            <button
              onClick={handleShowHint}
              className="mt-3 px-4 py-2 text-sm text-gold-600 font-bold hover:text-gold-800 bg-gold-50 rounded-xl hover:bg-gold-100 transition-all"
            >
              💡 Need a hint?
            </button>
          </div>
        </div>
      )}

      {/* Challenge Complete Overlay */}
      {phase === 'challenge-complete' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border-4 border-emerald-300 pointer-events-auto text-center"
          >
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-lg font-black text-emerald-700">Correct!</h2>
            <p className="text-sm text-gray-600 mt-1">
              {currentChallenge + 1 < totalChallenges
                ? `Challenge ${currentChallenge + 1} complete!`
                : 'All challenges complete!'}
            </p>
            <button
              onClick={handleNextChallenge}
              className="mt-4 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all"
            >
              {currentChallenge + 1 < totalChallenges ? 'Next Challenge →' : 'Finish! 🏆'}
            </button>
          </motion.div>
        </div>
      )}

      {/* Game Complete Overlay */}
      {gameComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 text-center max-w-sm"
          >
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="text-2xl font-black text-gold-700 mb-2">Game Complete!</h2>

            {/* Stars */}
            <div className="flex justify-center gap-1 my-3">
              {Array.from({ length: totalChallenges }).map((_, i) => (
                <div key={i} className={`text-2xl ${i < stars ? '' : 'opacity-30'}`}>
                  ⭐
                </div>
              ))}
            </div>

            <p className="text-xl font-bold text-gray-700">Score: {score}/100</p>
            <p className="text-sm text-gray-500 mt-1">
              {score >= 80 ? 'Excellent work! 🌟' : score >= 60 ? 'Good job! 👍' : 'Keep practicing! 💪'}
            </p>

            {/* Artifact completed */}
            {gameData.learningArtifact && artifactProgress === gameData.learningArtifact.totalPieces && (
              <p className="text-sm text-emerald-600 font-semibold mt-2">
                ✨ {gameData.learningArtifact.title} complete!
              </p>
            )}

            {/* Spiral review suggestions */}
            {reviewSuggestions.length > 0 && (
              <div className="mt-4 p-3 bg-gold-50 rounded-xl border border-gold-200 text-left">
                <p className="text-xs font-bold text-gold-700 mb-2">📚 Review these topics:</p>
                {reviewSuggestions.map((r, i) => (
                  <div key={i} className="text-xs text-gold-600 mb-1">
                    • {r.topic} ({r.subject}) — {r.daysOverdue} days overdue
                  </div>
                ))}
              </div>
            )}

            {/* My World + Topic Map + Next Game buttons */}
            <div className="flex flex-col gap-2 mt-4 items-center">
              <a
                href="/play"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-purple-500 text-white font-bold text-sm hover:shadow-lg transition-all w-full"
              >
                🎯 Next Adventure →
              </a>
              {gameData.simId && (
                <a
                  href={`/sims-v2/${gameData.simId}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm hover:shadow-lg transition-all w-full"
                >
                  🧪 Explore the Sim — go deeper!
                </a>
              )}
              <div className="flex gap-2">
                <a
                  href="/my-world"
                  className="px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-all"
                >
                  🌍 My World
                </a>
                <a
                  href="/topic-map"
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white font-bold text-sm hover:bg-purple-600 transition-all"
                >
                  🗺️ Topic Map
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Streak counter (top-right) ─────────────────────────── */}
      {phase === 'playing' && streakInfo.current > 0 && (
        <div className="absolute top-2 right-2 z-30 flex items-center gap-1 bg-orange-100 rounded-full px-3 py-1 border-2 border-orange-300 shadow-sm">
          <span className="text-sm font-bold text-orange-700">
            {streakInfo.onFire ? '🔥' : '⭐'} {streakInfo.current}
          </span>
          {streakInfo.daily > 1 && (
            <span className="text-xs text-orange-500 font-semibold">📅 {streakInfo.daily}d</span>
          )}
        </div>
      )}

      {/* ─── Accessibility gear button (top-left) ────────────────── */}
      <button
        onClick={() => setShowA11yPanel(!showA11yPanel)}
        className="absolute top-2 left-2 z-30 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full shadow-sm hover:bg-white transition-all"
        aria-label="Accessibility settings"
      >
        ⚙️
      </button>

      {/* ─── Accessibility settings panel ────────────────────────── */}
      {showA11yPanel && (
        <div className="absolute top-12 left-2 z-40 bg-white rounded-xl shadow-lg border-2 border-gray-200 p-3 w-56">
          <h3 className="text-xs font-bold text-gray-700 mb-2">Accessibility</h3>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={a11yConfig.reducedMotion}
              onChange={() => {
                const a11y = a11yRef.current;
                if (a11y) {
                  a11y.toggle('reducedMotion');
                  setA11yConfig(a11y.getConfig());
                }
              }}
            />
            Reduced motion
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={a11yConfig.colorblindMode}
              onChange={() => {
                const a11y = a11yRef.current;
                if (a11y) {
                  a11y.toggle('colorblindMode');
                  setA11yConfig(a11y.getConfig());
                }
              }}
            />
            Colorblind mode
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={a11yConfig.highContrast}
              onChange={() => {
                const a11y = a11yRef.current;
                if (a11y) {
                  a11y.toggle('highContrast');
                  setA11yConfig(a11y.getConfig());
                }
              }}
            />
            High contrast
          </label>
          <div className="text-xs text-gray-600 mb-1">Font size:</div>
          <div className="flex gap-1 mb-2">
            {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
              <button
                key={size}
                onClick={() => {
                  const a11y = a11yRef.current;
                  if (a11y) {
                    a11y.setFontSize(size);
                    setA11yConfig(a11y.getConfig());
                  }
                }}
                className={`px-2 py-0.5 rounded text-xs ${a11yConfig.fontSize === size ? 'bg-gold-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {size[0].toUpperCase()}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <input
              type="checkbox"
              checked={musicEnabled}
              onChange={() => {
                const newEnabled = !musicEnabled;
                setMusicEnabled(newEnabled);
                BackgroundMusic.setEnabled(newEnabled);
                if (newEnabled) {
                  BackgroundMusic.start();
                } else {
                  BackgroundMusic.stop();
                }
              }}
            />
            🎵 Background music
          </label>
          <button
            onClick={() => setShowA11yPanel(false)}
            className="w-full text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}

      {/* ─── Badge popup ─────────────────────────────────────────── */}
      {badgePopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl border-4 border-yellow-400 p-6 text-center"
        >
          <div className="text-5xl mb-2">{badgePopup.emoji}</div>
          <h3 className="text-lg font-black text-yellow-700">Badge Earned!</h3>
          <p className="text-sm font-bold text-gray-700">{badgePopup.name}</p>
          <p className="text-xs text-gray-500 mt-1">{badgePopup.description}</p>
        </motion.div>
      )}

      {/* ─── Insights panel ──────────────────────────────────────── */}
      {showInsights && insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="absolute bottom-4 right-4 z-40 bg-white rounded-xl shadow-lg border-2 border-gold-200 p-3 max-w-xs"
        >
          <h3 className="text-xs font-bold text-gold-700 mb-2">📊 Your Learning Insights</h3>
          {insights.slice(0, 3).map((ins, i) => (
            <p key={i} className="text-xs text-gray-600 mb-1">
              {ins.type === 'strength' ? '💪' : ins.type === 'weakness' ? '📚' : ins.type === 'review_due' ? '🔄' : '🔥'} {ins.message}
            </p>
          ))}
        </motion.div>
      )}

      {/* ─── Narrative mascot name (bottom-left during play) ──────── */}
      {phase === 'playing' && narrativeName && (
        <div className="absolute bottom-2 left-2 z-20 text-xs font-semibold text-gray-500 bg-white/60 rounded px-2 py-0.5">
          {narrativeEmoji} {narrativeName}
        </div>
      )}

      {/* Debug overlay */}
      {debug && (
        <div className="absolute top-2 left-2 bg-black/70 text-green-400 text-xs font-mono p-2 rounded-lg z-50">
          <div>Phase: {phase}</div>
          <div>Slide: {currentSlide}/{totalSlides}</div>
          <div>Challenge: {currentChallenge}/{totalChallenges}</div>
          <div>Stars: {stars}</div>
          <div>Score: {score}</div>
          <div>Adaptive: {adaptiveMode}</div>
        </div>
      )}
    </div>
  );
}

// ─── Lazy-loaded version for dynamic import ───────────────────

import dynamic from 'next/dynamic';

export const LazyGameRenderer = dynamic(
  () => Promise.resolve(GameRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-[720px] h-[560px] bg-amber-50 rounded-3xl">
        <div className="text-gray-400 font-semibold">Loading game...</div>
      </div>
    ),
  },
);
