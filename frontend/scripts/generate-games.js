/**
 * generate-games.js
 *
 * Generates Class 2+ game components using Ox Alpha via OpenRouter.
 * - Ox Alpha primary (free, 1M context, best coding model)
 * - 3 fallback models for reliability (GLM-5.3, DeepSeek V4 Pro, DeepSeek V4 Flash)
 * - Throughput sorting for fastest provider
 * - Retry-After header handling
 * - 20s gaps between requests (well under 20 RPM limit)
 * - Model self-checks against real API contracts before outputting
 * - One API call per game — model reasons internally, outputs verified code
 *
 * Usage:
 *   OPENROUTER_API_KEY=sk-or-v1-... node scripts/generate-games.js
 *
 * Output:
 *   components/simulations/<subject>/<GameName>.tsx
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── Configuration ────────────────────────────────────────────

const OR_HOST = 'openrouter.ai';
const OR_PATH = '/api/v1/chat/completions';
const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
  console.error('ERROR: OPENROUTER_API_KEY environment variable not set');
  process.exit(1);
}

// Primary model + fallbacks (tried in order if primary fails)
const PRIMARY_MODEL = 'stealth/ox-alpha';
const FALLBACK_MODELS = [
  'stealth/ox-alpha',
  'deepseek/deepseek-v4-flash',
  'deepseek/deepseek-v4-pro',
];

const GAP_MS = 20000; // 20 seconds between requests
const MAX_TOKENS = 131072; // Ox Alpha max output
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 30000; // 30s retry on error

const FRONTEND_ROOT = 'D:\\dream_app\\frontend';
const CISCE_ROOT = 'D:\\cisce';

// ─── API Contracts (ground truth for model self-checking) ─────

const API_CONTRACTS = `
# EXACT API CONTRACTS — verify your code against these before outputting

## Imports (use EXACTLY these paths, relative to components/simulations/<subject>/)
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';  // only if drag-and-drop needed
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

## audioManager API
audioManager.play(sound)  // NOT playClick(), NOT playSuccess(), etc.
audioManager.unlock()     // call on first user interaction

Valid sounds (SoundEffect type — use ONLY these):
  'pickup' | 'drop-correct' | 'drop-wrong' | 'tap' | 'success' | 'celebration' |
  'hint' | 'error' | 'count' | 'balance' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'swoop'

## speechManager API
speechManager.speak(text: string)
speechManager.speakNumber(n: number)
speechManager.getNumberName(n: number): string
speechManager.unlock()

## Feedback Components (EXACT props — do NOT use "show" prop)
<Confetti onComplete={() => {}} />
<SuccessBanner message="string" onComplete={() => {}} />
<HintBubble message="string" onComplete={() => {}} />
<SparkleBurst x={number} y={number} onComplete={() => {}} />

## Game Component Props (EXACT interface)
export interface GameNameProps {
  onComplete?: (score: number) => void;
  width?: number;
  height?: number;
}
export function GameName({ onComplete, width = 480, height = 400 }: GameNameProps) { ... }

## Root div MUST use passed dimensions:
<div className="relative overflow-hidden rounded-2xl" style={{ width, height }} ...>

## TypeScript STRICT rules to follow:
- No unused imports
- No unused variables
- All optional properties must be narrowed before use (use local const or if-check)
- No 'any' type
- All function parameters typed
- React hooks must be called at top level (not in conditions/loops)
`;

// ─── Quality Requirements ─────────────────────────────────────

const QUALITY_REQUIREMENTS = `
# QUALITY REQUIREMENTS — your output MUST have ALL of these

## Structure (target 600-700 lines):
1. File header comment with: game name, CISCE node IDs, enrichment source, ELI5, misconceptions, story, feature list
2. Teaching slides array (5 slides, each with title, text, emoji, bgColor, spoken)
3. TypeScript interfaces for Challenge and any data types
4. CHALLENGES array with 8 progressive challenges (NOT 6)
5. Custom SVG visual components (at least 3-4): main objects, mascot, scene background, star row
6. TeachingScreen component (separate function)
7. Main game component with full state management
8. Feedback overlays (Confetti, SuccessBanner, HintBubble, SparkleBurst)

## Each challenge must have:
- question: string
- answer: string (or number)
- options: string[] (or number[]) — 3 options
- hint: string (from enrichment)
- misconception: string (from enrichment — the correction text)
- visual data for rendering

## Custom SVG components (NO emoji as primary visuals):
- Main visual objects relevant to the topic (e.g. houses, jars, cupcakes, shapes)
- Mascot character unique to the game theme (e.g. Postman, Shopkeeper, Baker, Artist)
- Scene background (sky gradient, sun, clouds, ground, themed elements)
- StarRow component for progress
- All SVGs use gradients, shadows, details — not flat shapes

## State management:
- screen: 'teaching' | 'play'
- challengeIdx, selectedAnswer, showFeedback, isCorrect
- errors, stars, showHint, showConfetti, showSuccess
- sparklePos, allComplete
- mascot mood and speech
- useRef for timers (hint, feedback)
- Auto-hint after 10 seconds of inactivity
- Progress bar

## Interaction flow:
1. Teaching screen with 5 slides → "Let's Play!" button
2. Play screen shows question + visual + 3 answer options
3. Correct: success sound, mascot celebrates, sparkle, star earned, next challenge
4. Wrong: error sound, mascot shows misconception feedback, retry after 4.5s
5. Hint button + auto-hint after inactivity
6. All 8 complete: confetti, celebration, score = max(0, 100 - errors*5), onComplete(score)

## Curriculum fidelity:
- Use ONLY content from the enrichment file provided
- Misconception feedback must come from the enrichment's COMMON_MISCONCEPTION section
- ELI5 in header must come from enrichment's ELI5 section
- Teaching slides must cover the enrichment's DEFINITION and TEXT_WALKTHROUGH
- Challenges must test the enrichment's DIAGNOSTIC_QUESTION content
`;

// ─── Self-Check Instructions ──────────────────────────────────

const SELF_CHECK = `
# SELF-CHECK — perform these checks in your reasoning BEFORE outputting code

Before you output the final code, verify each of these. If ANY check fails, fix the issue in your reasoning, then output only the corrected code.

1. IMPORTS: Every import path matches the API contracts exactly. No invented imports.
2. AUDIO: Every audioManager.play() call uses only valid SoundEffect values. No playClick/playSuccess/etc.
3. FEEDBACK: Confetti, SuccessBanner, HintBubble, SparkleBurst use only onComplete (and message/x/y as required). No "show" prop anywhere.
4. PROPS: Exported component has interface with onComplete, width, height. Default width=480, height=400.
5. ROOT DIV: Uses style={{ width, height }} on the root div.
6. SVG: At least 3 custom SVG components. No emoji as primary visual (emoji OK in teaching slides and minor decoration only).
7. CHALLENGES: Exactly 8 challenges, each with question, answer, options, hint, misconception.
8. MASCOT: Custom SVG mascot with mood animations and speech bubble.
9. SCENE: Custom SVG scene background with sky gradient and themed elements.
10. STARS: StarRow component showing progress.
11. TEACHING: TeachingScreen as separate component with 5 slides.
12. STATE: All required state variables present. useRef for timers. Auto-hint effect.
13. TYPESCRIPT: No unused imports, no unused vars, no 'any', optional properties narrowed.
14. CONTENT: ELI5, misconceptions, and challenge content come from the enrichment file.
15. LENGTH: Code should be 600-700 lines. If under 500, you are missing components or depth.

Output ONLY the TypeScript code, starting with 'use client'; and ending with the closing brace of the main component. No markdown fences, no explanations, no commentary.
`;

// ─── Build Prompt ─────────────────────────────────────────────

function buildPrompt(gameConfig, enrichmentContent, referenceCode) {
  return `You are an expert React/TypeScript developer creating educational game components for the Atlas learning platform.

# TASK
Create a complete, production-ready React component for a Class 2 educational game.

## Game Details:
- Name: ${gameConfig.name}
- Subject: ${gameConfig.subject}
- File path: components/simulations/${gameConfig.subject}/${gameConfig.name}.tsx
- CISCE Nodes: ${gameConfig.nodes}
- Theme: ${gameConfig.theme}
- Story: ${gameConfig.story}

${API_CONTRACTS}

${QUALITY_REQUIREMENTS}

# ENRICHMENT CONTENT (source of all curriculum material)
Read this enrichment file carefully. Extract ELI5, misconceptions, definitions, walkthroughs, and diagnostic questions. Use them in your teaching slides, challenge questions, hints, and misconception feedback.

--- ENRICHMENT FILE START ---
${enrichmentContent}
--- ENRICHMENT FILE END ---

# REFERENCE CODE (a completed game showing the exact pattern to follow)
This is a completed Class 2 game that follows all the patterns, conventions, and quality standards. Study its structure, component organization, SVG style, state management, and interaction flow. Your output must match this quality level and follow the same patterns.

--- REFERENCE CODE START ---
${referenceCode}
--- REFERENCE CODE END ---

${SELF_CHECK}

Now generate the complete ${gameConfig.name}.tsx component:`;
}

// ─── API Call ─────────────────────────────────────────────────

function callOpenRouter(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: PRIMARY_MODEL,
      models: FALLBACK_MODELS,
      provider: {
        sort: 'throughput',
        allow_fallbacks: true,
      },
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: MAX_TOKENS,
      stream: true,
      temperature: 0.7,
    });

    const options = {
      hostname: OR_HOST,
      path: OR_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let content = '';
      let usage = null;
      let modelUsed = PRIMARY_MODEL;
      let buffer = '';
      let lastProgressTime = Date.now();
      let chunkCount = 0;

      if (res.statusCode === 429 || res.statusCode === 503) {
        const retryAfter = res.headers['retry-after'];
        const waitSec = retryAfter ? parseInt(retryAfter) : 30;
        reject(new Error(`HTTP ${res.statusCode} — retry after ${waitSec}s`));
        res.resume();
        return;
      }
      if (res.statusCode !== 200) {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 500)}`)));
        return;
      }

      res.on('data', (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const dataStr = line.slice(6).trim();
          if (dataStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
              const delta = parsed.choices[0].delta.content || '';
              if (delta) {
                content += delta;
                chunkCount++;
                // Show progress every 50 chunks
                if (chunkCount % 50 === 0) {
                  const elapsed = ((Date.now() - lastProgressTime) / 1000).toFixed(1);
                  const linesSoFar = content.split('\n').length;
                  const charsSoFar = content.length;
                  console.log(`  ...streaming: ${charsSoFar} chars, ${linesSoFar} lines (${chunkCount} chunks)`);
                  lastProgressTime = Date.now();
                }
              }
            }
            if (parsed.usage) usage = parsed.usage;
            if (parsed.model) modelUsed = parsed.model;
          } catch (e) {
            // ignore parse errors on partial lines
          }
        }
      });

      res.on('end', () => {
        if (content.length > 0) {
          resolve({ content, usage, model: modelUsed });
        } else {
          reject(new Error('No content received from stream'));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.setTimeout(600000); // 10 min timeout — streaming keeps connection alive
    req.write(body);
    req.end();
  });
}

async function callWithRetry(prompt) {
  let lastError;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    console.log(`  Attempt ${attempt + 1}/${MAX_RETRIES} via OpenRouter (Ox Alpha + fallbacks)...`);
    try {
      const result = await callOpenRouter(prompt);
      console.log(`  Success with model: ${result.model}`);
      return result;
    } catch (err) {
      lastError = err;
      console.log(`  Failed: ${err.message.substring(0, 200)}`);

      // If rate limited, wait the specified time
      if (err.message.includes('retry after')) {
        const match = err.message.match(/retry after (\d+)s/);
        const waitSec = match ? parseInt(match[1]) : 30;
        console.log(`  Rate limited. Waiting ${waitSec}s...`);
        await sleep(waitSec * 1000);
      } else if (attempt < MAX_RETRIES - 1) {
        console.log(`  Waiting ${RETRY_DELAY_MS / 1000}s before retry...`);
        await sleep(RETRY_DELAY_MS);
      }
    }
  }
  throw lastError;
}

// ─── Clean Output ─────────────────────────────────────────────

function cleanCode(raw) {
  let code = raw.trim();

  // Remove markdown fences if present
  if (code.startsWith('```')) {
    code = code.replace(/^```(?:typescript|tsx|js|jsx)?\n?/, '').replace(/\n?```$/, '');
  }

  // Ensure starts with 'use client'
  const useClientIdx = code.indexOf("'use client'");
  if (useClientIdx > 0) {
    code = code.substring(useClientIdx);
  }

  return code.trim();
}

// ─── Save Game ────────────────────────────────────────────────

function saveGame(subject, gameName, code) {
  const dir = path.join(FRONTEND_ROOT, 'components', 'simulations', subject);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${gameName}.tsx`);
  fs.writeFileSync(filePath, code, 'utf8');
  const lines = code.split('\n').length;
  console.log(`  Saved: ${filePath} (${lines} lines)`);
  return { filePath, lines };
}

// ─── Sleep ────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Main ─────────────────────────────────────────────────────

async function main() {
  console.log('=== Atlas Game Generator ===');
  console.log(`Primary: ${PRIMARY_MODEL}`);
  console.log(`Fallbacks: ${FALLBACK_MODELS.join(', ')}`);
  console.log(`Gap: ${GAP_MS / 1000}s between requests`);
  console.log(`Endpoint: https://${OR_HOST}${OR_PATH}`);
  console.log(`API key: ${API_KEY.substring(0, 15)}...`);
  console.log('');

  // Load reference game (NumbersUpTo999Game — our best Class 2 example)
  const referencePath = path.join(FRONTEND_ROOT, 'components', 'simulations', 'maths', 'NumbersUpTo999Game.tsx');
  const referenceCode = fs.readFileSync(referencePath, 'utf8');
  console.log(`Reference game loaded: ${referenceCode.split('\n').length} lines`);

  // Game queue — start with just ONE game to test quality
  const games = [
    {
      name: 'MeasurementGame',
      subject: 'maths',
      nodes: 'c2_math_020, c2_math_021, c2_math_022, c2_math_023',
      theme: 'Measuring length, weight, and capacity using uniform non-standard units (paperclips, toothpicks, sticks, balance scale, cups)',
      story: 'Help Builder Piku measure objects in the workshop! Compare lengths with paperclips, weigh objects on a balance, and measure capacity with cups!',
      enrichmentFiles: [
        'maths/enrichment/c2_maths_enrichment_part20.marker',
        'maths/enrichment/c2_maths_enrichment_part21.marker',
        'maths/enrichment/c2_maths_enrichment_part22.marker',
        'maths/enrichment/c2_maths_enrichment_part23.marker',
      ],
    },
  ];

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    console.log(`\n[${i + 1}/${games.length}] Generating ${game.name}...`);

    // Load enrichment content
    let enrichmentContent = '';
    for (const enrichmentFile of game.enrichmentFiles) {
      const enrichmentPath = path.join(CISCE_ROOT, enrichmentFile);
      if (fs.existsSync(enrichmentPath)) {
        const content = fs.readFileSync(enrichmentPath, 'utf8');
        enrichmentContent += content + '\n\n';
        console.log(`  Loaded enrichment: ${enrichmentFile} (${content.split('\n').length} lines)`);
      } else {
        console.error(`  ERROR: Enrichment file not found: ${enrichmentPath}`);
      }
    }

    // Build prompt
    const prompt = buildPrompt(game, enrichmentContent, referenceCode);
    console.log(`  Prompt size: ${prompt.length} chars (~${Math.round(prompt.length / 4)} tokens)`);

    // Call API
    try {
      const result = await callWithRetry(prompt);
      console.log(`  Response received. Usage:`, result.usage);
      console.log(`  Reasoning tokens: ${result.usage?.completion_tokens_details?.reasoning_tokens || 'N/A'}`);

      // Clean and save
      const code = cleanCode(result.content);
      const saveInfo = saveGame(game.subject, game.name, code);

      // Quick sanity checks
      const checks = [];
      checks.push(['starts with use client', code.startsWith("'use client'")]);
      checks.push(['has export function', code.includes('export function')]);
      checks.push(['has TeachingScreen', code.includes('TeachingScreen')]);
      checks.push(['has CHALLENGES', code.includes('CHALLENGES')]);
      checks.push(['has StarRow', code.includes('StarRow')]);
      checks.push(['has Confetti', code.includes('Confetti')]);
      checks.push(['has SuccessBanner', code.includes('SuccessBanner')]);
      checks.push(['has HintBubble', code.includes('HintBubble')]);
      checks.push(['has SparkleBurst', code.includes('SparkleBurst')]);
      checks.push(['has audioManager', code.includes('audioManager')]);
      checks.push(['has speechManager', code.includes('speechManager')]);
      checks.push(['no playClick', !code.includes('playClick')]);
      checks.push(['no playSuccess', !code.includes('playSuccess')]);
      checks.push(['no show={', !code.includes('show={')]);
      checks.push(['line count > 500', saveInfo.lines > 500]);

      console.log('\n  Sanity checks:');
      let allPass = true;
      for (const [name, pass] of checks) {
        console.log(`    ${pass ? 'PASS' : 'FAIL'}: ${name}`);
        if (!pass) allPass = false;
      }

      if (allPass) {
        console.log(`\n  All checks passed. ${game.name} ready for TypeScript verification.`);
      } else {
        console.log(`\n  Some checks failed. Review ${game.name} manually.`);
      }
    } catch (err) {
      console.error(`  ERROR generating ${game.name}: ${err.message}`);
    }

    // Wait before next request (skip after last one)
    if (i < games.length - 1) {
      console.log(`\n  Waiting ${GAP_MS / 1000}s before next request...`);
      await sleep(GAP_MS);
    }
  }

  console.log('\n=== Generation complete ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
