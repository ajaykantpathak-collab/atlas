/**
 * generate-game-c4.js — Generate a single Class 4 game file using Gemini
 *
 * IMPROVEMENTS over Class 3 generator:
 * 1. Auto-hint timer MUST be exactly 10000ms (not 12000ms)
 * 2. onComplete MUST be called with finalScore (multi-line format explicitly shown)
 * 3. All strings with apostrophes MUST use double quotes or escape with \'
 * 4. No foreign text (Korean, Chinese, etc.) — English only
 * 5. Variable names must be consistent (currentChallenge, not challenge)
 * 6. Sort items must use .find() with optional chaining, never .i
 * 7. All 4 feedback components must have exact prop signatures
 * 8. Explicit code template showing correct timer, onComplete, and handler patterns
 *
 * Usage:
 *   set GEMINI_KEY=your_key
 *   node scripts/generate-game-c4.js <game-config.json> [model]
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const MODEL = process.argv[3] || 'gemini-3.5-flash-lite';
const API_HOST = 'generativelanguage.googleapis.com';
const API_PATH = `/v1beta/models/${MODEL}:generateContent`;
const MAX_OUTPUT_TOKENS = 65536;
const TEMPERATURE = 0.7;

function readFileIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.warn(`Warning: Could not read ${filePath}: ${e.message}`);
    return null;
  }
}

function callGemini(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        topP: 0.95,
      },
    });

    const options = {
      hostname: API_HOST,
      path: `${API_PATH}?key=${process.env.GEMINI_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    console.log(`Calling Gemini ${MODEL}...`);
    console.log(`Prompt length: ${prompt.length} chars`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`HTTP ${res.statusCode}`);
          console.error(data.substring(0, 1000));
          reject(new Error(`Gemini API returned ${res.statusCode}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0]) {
            const text = json.candidates[0].content.parts[0].text;
            const usage = json.usageMetadata;
            console.log(`Output length: ${text.length} chars`);
            console.log(`Tokens - input: ${usage?.promptTokenCount}, output: ${usage?.candidatesTokenCount}, total: ${usage?.totalTokenCount}`);
            resolve(text);
          } else {
            console.error('No candidates in response');
            console.error(data.substring(0, 1000));
            reject(new Error('No candidates in Gemini response'));
          }
        } catch (e) {
          console.error('Parse error:', e.message);
          console.error(data.substring(0, 1000));
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(180000, () => {
      req.destroy(new Error('Request timeout (180s)'));
    });

    req.write(body);
    req.end();
  });
}

function extractCodeBlock(text) {
  const tsMatch = text.match(/```typescript\n([\s\S]*?)```/);
  if (tsMatch) return tsMatch[1];

  const tsxMatch = text.match(/```tsx\n([\s\S]*?)```/);
  if (tsxMatch) return tsxMatch[1];

  const codeMatch = text.match(/```\n([\s\S]*?)```/);
  if (codeMatch) return codeMatch[1];

  if (text.trim().startsWith("'use client'") || text.trim().startsWith('"use client"')) {
    return text.trim();
  }

  console.warn('Warning: No code block found, returning raw text');
  return text;
}

function buildPrompt(config) {
  const enrichmentContents = (config.enrichmentFiles || [])
    .map(f => {
      const content = readFileIfExists(f);
      return content ? `\n=== ENRICHMENT FILE: ${path.basename(f)} ===\n${content}` : '';
    })
    .join('\n');

  const referenceContent = readFileIfExists(config.referenceFile) || '';
  const refLines = referenceContent.split('\n');
  const refTruncated = refLines.slice(0, 500).join('\n');

  const svgObjectsText = (config.svgObjects || [])
    .map(o => `  - ${o.name}: ${o.description}`)
    .join('\n');

  const challengeTypesText = (config.challengeTypes || [])
    .map((c, i) => `  Challenge ${i + 1}: ${c}`)
    .join('\n');

  const classLevel = config.classLevel || 4;
  const ageRange = config.ageRange || '9-10';
  const className = `Class ${classLevel}`;

  return `You are an expert React/TypeScript developer writing educational games for ${className} students (age ${ageRange}) in India (CISCE/ICSE curriculum).

Write a COMPLETE, production-quality React/TypeScript game component file. The file must be 700-1000 lines of substantive code.

TASK: Write ${config.gameTitle}.tsx

CISCE NODES: ${config.cisceNodes}

ENRICHMENT CONTENT (read this carefully — the game must align with this content):
${enrichmentContents}

REFERENCE PATTERN (WaterGame.tsx — follow this exact structure, imports, and patterns):
${refTruncated}

GAME SPECIFICATION:
- Game title: ${config.gameTitle}
- Class level: ${className} (age ${ageRange})
- Unique mascot: ${config.mascotName} — ${config.mascotDescription}
- Custom SVG scene background: ${config.sceneDescription}
- Custom SVG objects (NOT emoji as primary visual):
${svgObjectsText}

CHALLENGE STRUCTURE (8 progressive challenges, easy → hard):
${challengeTypesText}

STRICT REQUIREMENTS — ALL 14 CHECKS MUST PASS:

1. Custom SVG scene background with sky, ground, themed elements. MUST use <linearGradient> or <radialGradient> inside an <svg> element. NO CSS linear-gradient as the only background. NO emoji-only backgrounds.
2. Custom SVG objects as topic-specific SVG component functions. Emoji OK in teaching slides only, NOT as main interactive objects.
3. Unique mascot with custom SVG (NOT OwlMascot). Mascot must have mood states (happy, celebrate, thinking) and speech bubble.
4. Drag-and-drop using Draggable component: import { Draggable } from '../../sim-primitives/Draggable'. Use <Draggable> in sort challenges.
5. Teaching screen with EXACTLY 5 slides in TEACHING_SLIDES array. Each slide: title, text, emoji, bgColor, spoken.
6. EXACTLY 8 challenges in CHALLENGES array. Each: type, question, answer, options, hint, misconception. Progressive difficulty.
7. Misconception feedback from the enrichment file's COMMON_MISCONCEPTION section. NO generic "Try again".
8. Import and use ALL 4: Confetti, SuccessBanner, HintBubble, SparkleBurst from '../../../lib/sim-engine/feedback'.
9. Import and use BOTH audioManager from '../../../lib/sim-engine/audio' AND speechManager from '../../../lib/sim-engine/speech'. Use audioManager.play() for sound effects and speechManager.speak() for spoken instructions, feedback, and teaching content.
10. 700+ lines minimum. Substantive content, not padding.
11. Must compile with zero TypeScript errors (strict mode). No 'any', no unused imports/vars.
12. Export interface with onComplete?: (score: number) => void, width?: number, height?: number. Call onComplete with score = max(0, 100 - errors*5).
13. Auto-hint after EXACTLY 10 seconds (10000ms) of inactivity using useRef timer.
14. Progressive difficulty — challenges get harder, not random.

=== CRITICAL: EXACT FEEDBACK COMPONENT PROP SIGNATURES ===
These 4 components from '../../../lib/sim-engine/feedback' have EXACT prop signatures. DO NOT deviate:

<Confetti onComplete={() => void} />
  - Requires: onComplete (function, no args)
  - WRONG: <Confetti /> (missing onComplete)

<SuccessBanner message="string" onComplete={() => void} />
  - Requires: message (string), onComplete (function)
  - WRONG: <SuccessBanner text="hello" /> (prop is 'message' not 'text')
  - WRONG: <SuccessBanner score={5} totalStars={3} /> (wrong props)

<HintBubble message="string" onComplete={() => void} />
  - Requires: message (string), onComplete (function)
  - WRONG: <HintBubble text="hint" onClose={() => {}} /> (wrong prop names)

<SparkleBurst x={number} y={number} onComplete={() => void} />
  - Requires: x (number), y (number), onComplete (function)
  - WRONG: <SparkleBurst x={100} y={200} /> (missing onComplete)

=== CRITICAL: EXPORT PATTERN ===
Use NAMED export, NOT default export:

export interface ${config.gameTitle}Props {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ${config.gameTitle}({ width = 720, height = 560, onComplete }: ${config.gameTitle}Props) {
  // ... game code
}

DO NOT write: export default function ${config.gameTitle}(...)
DO NOT write: function ${config.gameTitle}(...) without export

=== CRITICAL: VALID SOUND EFFECTS ===
Only these strings are valid for audioManager.play():
'pickup', 'drop-correct', 'drop-wrong', 'tap', 'success', 'error', 'celebration', 'hint', 'count', 'balance', 'whoosh', 'sparkle', 'chime', 'pop', 'swoop'

DO NOT use: 'celebrate' (use 'celebration'), 'correct' (use 'success'), 'wrong' (use 'error')

=== CRITICAL: SPEECH MANAGER USAGE ===
You MUST import and use speechManager from '../../../lib/sim-engine/speech':
  import { speechManager } from '../../../lib/sim-engine/speech';

Call speechManager.speak() for:
  - Teaching slide narration (when a slide is shown, speak the slide's "spoken" text)
  - Challenge questions (speak the question when a new challenge starts)
  - Correct answer feedback (speak encouragement like "Great job!")
  - Incorrect answer feedback (speak the misconception text)
  - Hint messages (speak the hint when shown)
  - Completion message (speak a celebration message)

Call speechManager.stop() when the game unmounts (in a useEffect cleanup).

=== CRITICAL: SVG GRADIENT REQUIREMENT ===
The scene background MUST contain an inline <svg> with a <defs> section containing <linearGradient> or <radialGradient>.

CORRECT:
<svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
  <defs>
    <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#87CEEB" />
      <stop offset="100%" stopColor="#E0F2FE" />
    </linearGradient>
  </defs>
  <rect width={width} height={height} fill="url(#sky-grad)" />
  {/* themed scene elements like trees, buildings, etc. */}
</svg>

=== CRITICAL: GameScreen TYPE DEFINITION ===
You MUST define the GameScreen type at the top of the file, BEFORE any component that uses it:

type GameScreen = 'teaching' | 'play';

=== CRITICAL: STRING QUOTING — APOSTROPHE BUG PREVENTION ===
Many educational strings contain apostrophes (Earth's, body's, child's, etc.).
ALWAYS use DOUBLE QUOTES for any string that contains an apostrophe:

CORRECT:
  text: "Water is Earth's most precious resource!"
  spoken: "The body's digestive system breaks down food."
  misconception: "A child's teeth need regular brushing."

WRONG (causes syntax error):
  text: 'Water is Earth's most precious resource!'
  spoken: 'The body's digestive system breaks down food.'

If you MUST use single quotes, escape the apostrophe:
  text: 'Water is Earth\\'s most precious resource!'

PREFER DOUBLE QUOTES for all strings to avoid this class of bugs entirely.

=== CRITICAL: NO FOREIGN TEXT ===
ALL text in the game must be in ENGLISH only.
DO NOT include any Korean, Chinese, Japanese, Hindi, or other non-English text.
DO NOT include any Unicode characters that are not standard English.
If you are unsure about a character, use plain ASCII English.

=== CRITICAL: VARIABLE NAME CONSISTENCY ===
ALWAYS use 'currentChallenge' as the variable name for the current challenge:

  const currentChallenge = CHALLENGES[challengeIdx];

DO NOT use 'challenge' as a shorthand — it causes scope confusion.
DO NOT mix 'challenge' and 'currentChallenge' in the same file.

=== CRITICAL: AUTO-HINT TIMER — MUST BE EXACTLY 10000ms ===
The inactivity timer MUST be set to EXACTLY 10000 milliseconds (10 seconds).
DO NOT use 12000, 15000, or any other value.

CORRECT:
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

WRONG (fails check 13):
    }, 12000);  // WRONG — must be 10000
    }, 15000);  // WRONG — must be 10000

=== CRITICAL: ONCOMPLETE CALLBACK — MUST BE CALLED ===
When all 8 challenges are complete, you MUST call onComplete with the final score.
Use this EXACT pattern:

  const advanceChallenge = () => {
    setSelectedOpt(null);
    setIsIncorrect(false);
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = "Wonderful! You are a brilliant star!";
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

DO NOT forget the onComplete call. DO NOT use onComplete?.(finalScore) — check with if first.

=== CRITICAL: DRAGGABLE USAGE ===
import { Draggable } from '../../sim-primitives/Draggable';

<Draggable
  id={item.id}
  x={pos.x}
  y={pos.y}
  draggable={!placed}
  placed={placed}
  onDragStart={handleDragStart}
  onDragEnd={(id, x, y) => handleDragEnd(id, x, y)}
  width={110}
  height={95}
>
  <div style={{ width: 110, height: 95 }}>
    {/* card content */}
  </div>
</Draggable>

=== CRITICAL: SORT ITEMS ARRAY ACCESS ===
When accessing challenge.sortItems, ALWAYS use .find() with optional chaining:

  const item = currentChallenge.sortItems?.find(i => i.id === id);
  if (!item || !currentChallenge.bins) return false;

NEVER write: challenge.sortItems?.i.find(...) — there is NO .i property on arrays!
NEVER write: challenge.sortItems?.i(i => i.id === id)
Always use .find() directly.

=== CRITICAL: SORT COMPLETION CHECK ===
After placing an item, check if ALL items are placed:

  const updatedPlaced = { ...placedItems, [id]: true };
  const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
  if (allDone) {
    audioManager.play('success');
    setMascotMood('celebrate');
    setScore(prev => prev + 15);
    const msg = "Fantastic sorting! All correct!";
    setSuccessMsg(msg);
    setSpeakingText(msg);
    speechManager.speak(msg);
  }

DO NOT forget this check — without it, sort challenges never complete.

=== CRITICAL: SORT CARDS MUST USE CUSTOM SVG ICONS, NOT EMOJI ===
The sort cards (draggable items) are the MAIN INTERACTIVE OBJECTS.
They MUST render custom SVG icons, NOT emoji characters.

Each sort item must have an "icon" field (string) that maps to a custom SVG component function.
The SortCard component must render the SVG icon based on the icon field using a renderIcon function.

CORRECT — renderSortIcon function that maps icon strings to SVG components:
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'leaf': return <LeafIcon size={size} />;
    case 'seed': return <SeedIcon size={size} />;
    case 'root': return <RootIcon size={size} />;
    default: return <LeafIcon size={size} />;
  }
}

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: SortCardProps) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed}
      onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

The sortItems array should use "icon" field (not "emoji"):
  sortItems: [
    { id: 'leaf', label: 'Leaf', icon: 'leaf', correctBin: 'plant-part' },
    { id: 'root', label: 'Root', icon: 'root', correctBin: 'plant-part' },
  ]

Emoji is ONLY allowed in:
- Teaching slides (TEACHING_SLIDES array — the "emoji" field)
- Mascot speech bubble text
- Decorative elements in the scene (not as primary interactive objects)

=== CRITICAL: HANDLESHOWHINT FUNCTION ===
You MUST define a handleShowHint function that is called both by the Hint button AND by the inactivity timer:

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

The inactivity timer MUST call handleShowHint:
  inactivityTimer.current = setTimeout(() => {
    handleShowHint();
  }, 10000);

=== CRITICAL: HINT STATE VARIABLE ===
Use 'setHintMsg' for the hint state variable (NOT setHintText, NOT setHint, NOT setShowHint):
  const [hintMsg, setHintMsg] = useState<string | null>(null);

And render it as:
  {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

=== COMPLETE CODE SKELETON — FOLLOW THIS EXACTLY ===

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ... SVG icon components (10+) ...
// ... Scene background component with <linearGradient> ...
// ... Mascot component with mood states ...
// ... StarRow component ...
// ... renderSortIcon function ...
// ... SortCard component ...
// ... SortBin component ...

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBin {
  id: string;
  label: string;
  color: string;
}

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: SortItem[];
  bins?: SortBin[];
}

const TEACHING_SLIDES: TeachingSlide[] = [
  // EXACTLY 5 slides
];

const CHALLENGES: Challenge[] = [
  // EXACTLY 8 challenges, progressive difficulty
];

export interface ${config.gameTitle}Props {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ${config.gameTitle}({ width = 720, height = 560, onComplete }: ${config.gameTitle}Props) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const currentChallenge = CHALLENGES[challengeIdx];

  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 40 + idx * 130, y: height - 160 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! That is correct!";
      setSuccessMsg(msg);
      setSpeakingText(msg);
      speechManager.speak(msg);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setIsIncorrect(true);
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  const advanceChallenge = () => {
    setSelectedOpt(null);
    setIsIncorrect(false);
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = "Wonderful! You are a brilliant star!";
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;
    // ... bin hit detection ...
    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });
      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = "Fantastic sorting! All correct!";
        setSuccessMsg(msg);
        setSpeakingText(msg);
        speechManager.speak(msg);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  // ... render teaching screen and play screen ...
}

=== END SKELETON ===

CRITICAL CODE PATTERNS TO FOLLOW (from WaterGame reference):
- File starts with: 'use client';
- Import paths: '../../sim-primitives/Draggable', '../../../lib/sim-engine/audio', '../../../lib/sim-engine/speech', '../../../lib/sim-engine/feedback'
- MUST import and use BOTH audioManager AND speechManager
- Type: type GameScreen = 'teaching' | 'play'; (MUST be defined before use!)
- TEACHING_SLIDES array with 5 objects: { title, text, emoji, bgColor, spoken }
- CHALLENGES array with 8 objects: { type, question, answer, options, hint, misconception, sortItems?, bins? }
- renderSortIcon function that maps icon strings to SVG components (NOT hardcoded!)
- Mascot function with mood prop and speaking prop (speech bubble via AnimatePresence)
- StarRow function for star rewards
- Scene background function with SVG <linearGradient> and themed elements
- Custom SVG icon functions for each topic object (10+ icons)
- SortCard function wrapping Draggable, using renderSortIcon
- SortBin function for drop targets
- TeachingScreen with 5 slides, progress dots, prev/next buttons
- Main exported component with all state management
- handleAnswer for multiple choice, handleDragStart/handleDragEnd for sort challenges
- handleShowHint with audioManager.play('hint')
- useEffect for auto-hint timer (EXACTLY 10 seconds = 10000ms)
- useEffect to reset sort state on challenge change
- Sort completion check: currentChallenge.sortItems?.every(i => placedItems[i.id])
- onComplete callback called when all 8 challenges done with finalScore = Math.max(0, 100 - errors*5)
- Confetti + SuccessBanner on completion (with correct props!)
- SparkleBurst on correct answers (with x, y, onComplete props!)
- HintBubble for hints (with message and onComplete props!)

${config.extraInstructions || ''}

OUTPUT: Write ONLY the TypeScript code. Start with 'use client'; and end with the closing brace of the exported component. Do NOT include any explanation text before or after the code. Wrap the code in a typescript code block.`;
}

async function main() {
  const configPath = process.argv[2];
  if (!configPath) {
    console.error('Usage: node scripts/generate-game-c4.js <game-config.json> [model]');
    process.exit(1);
  }

  if (!process.env.GEMINI_KEY) {
    console.error('Error: GEMINI_KEY environment variable not set');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  console.log(`\n=== Generating ${config.gameTitle} ===`);
  console.log(`Output: ${config.outputFile}`);
  console.log(`Enrichment files: ${(config.enrichmentFiles || []).length}`);
  console.log(`Mascot: ${config.mascotName}`);
  console.log(`Scene: ${config.sceneDescription}`);
  console.log('');

  const prompt = buildPrompt(config);
  const response = await callGemini(prompt);
  const code = extractCodeBlock(response);

  const outputDir = path.dirname(config.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(config.outputFile, code, 'utf-8');

  const lineCount = code.split('\n').length;
  console.log(`\n=== Generation Complete ===`);
  console.log(`File: ${config.outputFile}`);
  console.log(`Lines: ${lineCount}`);
  console.log(`Chars: ${code.length}`);
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
