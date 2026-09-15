/**
 * generate-game.js — Generate a single game file using Gemini 3.1 Flash Lite
 *
 * Usage:
 *   set GEMINI_KEY=your_key
 *   node scripts/generate-game.js <game-config.json>
 *
 * The config JSON specifies:
 *   - outputFile: absolute path to write
 *   - enrichmentFiles: array of enrichment .marker file paths to read
 *   - referenceFile: path to WaterGame.tsx (reference pattern)
 *   - mascotName: e.g., "Astronomer Tara"
 *   - mascotDescription: e.g., "a friendly astronomer girl with telescope and star hair clip"
 *   - sceneDescription: e.g., "sky scene with day sky, sun, clouds, stars, moon, horizon"
 *   - svgObjects: array of { name, description } for custom SVG objects
 *   - gameTitle: e.g., "SunMoonGame"
 *   - cisceNodes: e.g., "c1_phy_006, c1_phy_007, c1_phy_008"
 *   - challengeTypes: array describing the 8 progressive challenges
 *   - extraInstructions: any additional guidance
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
    req.setTimeout(120000, () => {
      req.destroy(new Error('Request timeout (120s)'));
    });

    req.write(body);
    req.end();
  });
}

function extractCodeBlock(text) {
  // Try to extract TypeScript code from markdown code block
  const tsMatch = text.match(/```typescript\n([\s\S]*?)```/);
  if (tsMatch) return tsMatch[1];

  const tsxMatch = text.match(/```tsx\n([\s\S]*?)```/);
  if (tsxMatch) return tsxMatch[1];

  const codeMatch = text.match(/```\n([\s\S]*?)```/);
  if (codeMatch) return codeMatch[1];

  // If no code block, check if the whole response starts with 'use client'
  if (text.trim().startsWith("'use client'") || text.trim().startsWith('"use client"')) {
    return text.trim();
  }

  // Last resort: return as-is
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
  // Truncate reference to ~500 lines to keep prompt manageable
  const refLines = referenceContent.split('\n');
  const refTruncated = refLines.slice(0, 500).join('\n');

  const svgObjectsText = (config.svgObjects || [])
    .map(o => `  - ${o.name}: ${o.description}`)
    .join('\n');

  const challengeTypesText = (config.challengeTypes || [])
    .map((c, i) => `  Challenge ${i + 1}: ${c}`)
    .join('\n');

  const classLevel = config.classLevel || 3;
  const ageRange = config.ageRange || '8-9';
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
13. Auto-hint after 10 seconds of inactivity using useRef timer.
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
  - WRONG: <HintBubble hint="hint" /> (wrong prop name)

<SparkleBurst x={number} y={number} onComplete={() => void} />
  - Requires: x (number), y (number), onComplete (function)
  - WRONG: <SparkleBurst x={100} y={200} /> (missing onComplete)
  - WRONG: <SparkleBurst /> (missing all props)

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

Example usage:
  speechManager.speak(currentSlide.spoken);  // when teaching slide changes
  speechManager.speak(currentChallenge.question);  // when challenge starts
  speechManager.speak('Great job! That is correct!');  // on correct answer
  speechManager.speak(currentChallenge.misconception);  // on wrong answer
  speechManager.speak(currentChallenge.hint);  // when hint is shown

DO NOT call speechManager.speakNumber() unless the game specifically involves numbers.
DO NOT call speechManager in a tight loop — only on user interactions or state changes.
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

WRONG (fails check 1 — CSS gradient only):
<div style={{ background: 'linear-gradient(180deg, #87CEEB, #E0F2FE)' }} />

WRONG (fails check 1 — no gradient at all):
<div style={{ background: '#87CEEB' }} />

=== CRITICAL: GameScreen TYPE DEFINITION ===
You MUST define the GameScreen type at the top of the file, BEFORE any component that uses it:

type GameScreen = 'teaching' | 'play';

DO NOT use GameScreen in useState without defining it first.
DO NOT write: const [screen, setScreen] = useState<GameScreen>('teaching') without the type definition above.

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

=== CRITICAL: SORT ITEMS ARRAY ACCESS — DO NOT WRITE .i ===
When accessing challenge.sortItems, ALWAYS use .find() with optional chaining:

  const item = challenge.sortItems?.find(i => i.id === id);
  if (!item || !challenge.bins) return false;

NEVER write: challenge.sortItems?.i.find(...) — there is NO .i property on arrays!
NEVER write: challenge.sortItems?.i ? undefined : challenge.sortItems?.find(...)
NEVER write: challenge.sortItems?.i(i => i.id === id)
The .i property does NOT exist on arrays. Always use .find() directly.

=== CRITICAL: SORT COMPLETION CHECK ===
After placing an item, check if ALL items are placed:

  const updatedPlaced = { ...placedItems, [id]: true };
  const allDone = challenge.sortItems?.every(i => updatedPlaced[i.id]);
  if (allDone) {
    audioManager.play('success');
    // show success feedback, advance to next challenge
  }

DO NOT forget this check — without it, sort challenges never complete.

=== CRITICAL: FINAL SCORE AND ONCOMPLETE ===
When all 8 challenges are done, calculate final score and call onComplete:

  if (challengeIdx < CHALLENGES.length - 1) {
    setChallengeIdx(prev => prev + 1);
  } else {
    // All challenges complete!
    setShowConfetti(true);
    audioManager.play('celebration');
    const finalScore = Math.max(0, 100 - errors * 5);
    if (onComplete) onComplete(finalScore);
  }

DO NOT forget to call onComplete — without it, the living world never updates mastery.
DO NOT use onComplete?.(finalScore) if onComplete is not optional — check the interface.

=== CRITICAL: SORT CARDS MUST USE CUSTOM SVG ICONS, NOT EMOJI ===
The sort cards (draggable items) are the MAIN INTERACTIVE OBJECTS.
They MUST render custom SVG icons, NOT emoji characters.

Each sort item must have an "icon" field (string) that maps to a custom SVG component function.
The SortCard component must render the SVG icon based on the icon field using a renderIcon function.

CORRECT — renderIcon function that maps icon strings to SVG components:
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

WRONG (FAILS CHECK 2 — emoji as primary visual):
function SortCard({ item, ... }) {
  return (
    <Draggable ...>
      <div ...>
        <span style={{ fontSize: 36 }}>{item.emoji}</span>
        <span>{item.label}</span>
      </div>
    </Draggable>
  );
}

WRONG (FAILS CHECK 2 — hardcoded icon, ignores icon field):
function SortCard({ ... }) {
  return (
    <Draggable ...>
      <div ...>
        <CoinIcon size={24} />  // WRONG — always renders same icon regardless of item.icon
        <span>{label}</span>
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
- handleHint with audioManager.play('hint')
- useEffect for auto-hint timer (10 seconds)
- useEffect to reset sort state on challenge change
- Sort completion check: challenge.sortItems?.every(i => placedItems[i.id])
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
    console.error('Usage: node scripts/generate-game.js <game-config.json>');
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

  // Write the output file
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
