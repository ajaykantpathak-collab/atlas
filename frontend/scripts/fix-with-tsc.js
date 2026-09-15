// tsc-based fix script — runs TypeScript compiler on generated files
// sends actual compiler errors to Opus for fixing
//
// Usage:
//   node scripts/fix-with-tsc.js                    # fix all files in c6_12
//   node scripts/fix-with-tsc.js SomeFile.tsx       # fix specific file

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────
const OPUS_API_KEYS = [
  'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe',
  'sk-ant-opm-71R9wtEucISZPpEWPa9bYvANSWu3NjX-',
];
const OPUS_API_HOST = 'api.opusmax.pro';
const MODEL = 'claude-opus-4-6';
const MAX_TOKENS = 32000;
const THINKING_BUDGET = 10000;
const MAX_RETRIES = 3;

const FRONTEND_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(FRONTEND_DIR, 'components', 'simulations', 'c6_12');
const TSC_CMD = `npx tsc --noEmit --skipLibCheck --jsx react-jsx --esModuleInterop --moduleResolution node --target es2020 --module esnext --strict false`;

// ─── Rate limiter ─────────────────────────────────────────────
let lastRequestTime = 0;
async function rateLimit() {
  const now = Date.now();
  const wait = Math.max(0, 1000 - (now - lastRequestTime));
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  lastRequestTime = Date.now();
}

// ─── Call Opus ────────────────────────────────────────────────
async function callOpus(prompt, keyIdx) {
  await rateLimit();
  return new Promise((resolve, reject) => {
    const key = OPUS_API_KEYS[keyIdx % OPUS_API_KEYS.length];
    const body = JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      thinking: { type: 'enabled', budget_tokens: THINKING_BUDGET },
      messages: [{ role: 'user', content: prompt }],
    });

    const req = https.request({
      hostname: OPUS_API_HOST,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const textBlock = json.content?.find(b => b.type === 'text');
            const text = textBlock?.text || '';
            if (text.includes('Usage limit reached') || text.includes('quota')) {
              reject(new Error('QUOTA_EXHAUSTED'));
              return;
            }
            if (!text || text.length < 500) {
              reject(new Error(`Response too short: ${text?.length || 0}`));
              return;
            }
            resolve({ text, model: json.model, usage: json.usage });
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        } else if (res.statusCode === 429) {
          reject(new Error('429 rate limited'));
        } else if (res.statusCode === 529) {
          reject(new Error('529 overloaded'));
        } else {
          reject(new Error(`API error ${res.statusCode}: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', (e) => reject(new Error(`Network: ${e.message}`)));
    req.setTimeout(300000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body);
    req.end();
  });
}

// ─── Call with retry ──────────────────────────────────────────
async function callOpusWithRetry(prompt, fileId, keyIdx) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callOpus(prompt, keyIdx);
    } catch (e) {
      const isQuota = e.message.includes('QUOTA_EXHAUSTED');
      if (isQuota && OPUS_API_KEYS.length > 1) {
        const otherKey = (keyIdx + 1) % OPUS_API_KEYS.length;
        console.log(`  [${fileId}] Key${keyIdx+1} quota, trying Key${otherKey+1}...`);
        try { return await callOpus(prompt, otherKey); }
        catch (e2) {
          if (e2.message.includes('QUOTA_EXHAUSTED')) {
            console.log(`  [${fileId}] Both keys quota, waiting 300s...`);
            await new Promise(r => setTimeout(r, 300000));
            continue;
          }
          throw e2;
        }
      }
      if (attempt < MAX_RETRIES) {
        const delay = 5000 * attempt;
        console.log(`  [${fileId}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message.substring(0, 60)}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
}

// ─── Extract code ─────────────────────────────────────────────
function extractCode(response) {
  let code = response.trim();
  if (code.startsWith('```')) {
    const nl = code.indexOf('\n');
    if (nl > 0) code = code.substring(nl + 1);
  }
  if (code.endsWith('```')) code = code.substring(0, code.length - 3);
  const ucIdx = Math.max(code.indexOf("'use client'"), code.indexOf('"use client"'));
  if (ucIdx > 0) code = code.substring(ucIdx);
  return code.trim();
}

// ─── Run tsc and get errors ───────────────────────────────────
function getTscErrors(filePath) {
  try {
    const output = execSync(`${TSC_CMD} "${filePath}" 2>&1`, {
      cwd: FRONTEND_DIR,
      encoding: 'utf8',
      timeout: 30000,
    });
    return []; // no errors
  } catch (e) {
    // tsc returns non-zero exit on errors, output is in e.stdout
    const output = e.stdout || e.message || '';
    const errors = output.split('\n')
      .filter(l => l.includes('error TS'))
      .map(l => l.trim());
    return errors;
  }
}

// ─── Build fix prompt from tsc errors ─────────────────────────
function buildTscFixPrompt(fileName, code, errors) {
  // Limit errors to first 20 to keep prompt size reasonable
  const errorList = errors.slice(0, 20).join('\n');

  return `You generated a React/TypeScript component that has TypeScript compilation errors. Fix ALL the errors below and output the COMPLETE corrected component.

## FILE: ${fileName}

## TYPESCRIPT COMPILER ERRORS (fix every one):
${errorList}

${errors.length > 20 ? `... and ${errors.length - 20} more errors. Fix all of them.` : ''}

## IMPORTANT NOTES:
- The sim-engine components (HintBubble, Confetti, SuccessBanner, SparkleBurst) do NOT have a 'show' prop
- They use 'message' (not 'text') and require 'onComplete' callback
- Use conditional rendering: {showHint && <HintBubble message={hint} onComplete={() => setShowHint(false)} />}
- For slider inputs, use: type="range" min={5} max={100} (curly braces for numeric props)
- Do NOT use 'any' type
- Keep ALL the good parts of the original code — only fix what's broken

## ORIGINAL CODE:
${code}

## INSTRUCTIONS:
- Output the COMPLETE fixed component (not just changed parts)
- Output ONLY code — no markdown fences, no explanations
- Start with 'use client';
- End with the default export`;
}

// ─── Process one file ─────────────────────────────────────────
async function fixFile(filePath, keyIdx) {
  const fileName = path.basename(filePath);
  const tag = `[${fileName}]`;

  // 1. Get tsc errors
  const errors = getTscErrors(filePath);
  if (errors.length === 0) {
    console.log(`${tag} CLEAN — no errors`);
    return { file: fileName, success: true, errors: 0 };
  }

  console.log(`${tag} ${errors.length} tsc errors — sending to Opus for fix...`);
  errors.slice(0, 5).forEach(e => console.log(`  ${e.substring(0, 120)}`));

  // 2. Read current code
  const code = fs.readFileSync(filePath, 'utf8');

  // 3. Build fix prompt
  const fixPrompt = buildTscFixPrompt(fileName, code, errors);
  console.log(`${tag} Fix prompt: ${(fixPrompt.length / 1024).toFixed(0)} KB`);

  // 4. Call Opus
  let result;
  try {
    result = await callOpusWithRetry(fixPrompt, fileName, keyIdx);
  } catch (e) {
    console.error(`${tag} FIX FAILED: ${e.message}`);
    return { file: fileName, success: false, errors: errors.length, error: e.message };
  }

  // 5. Extract and write fixed code
  const fixedCode = extractCode(result.text);
  console.log(`${tag} Fix response: ${fixedCode.length} chars, ${fixedCode.split('\n').length} lines`);

  if (fixedCode.length < 500) {
    console.error(`${tag} Fix too short — keeping original`);
    return { file: fileName, success: false, errors: errors.length, error: 'Fix too short' };
  }

  // 6. Write fixed file
  fs.writeFileSync(filePath, fixedCode, 'utf8');

  // 7. Re-check with tsc
  const remainingErrors = getTscErrors(filePath);
  console.log(`${tag} After fix: ${remainingErrors.length} errors remaining`);

  if (remainingErrors.length === 0) {
    console.log(`${tag} FIXED — all errors resolved`);
    return { file: fileName, success: true, errors: 0, fixedFrom: errors.length };
  } else {
    // Show remaining errors
    remainingErrors.slice(0, 5).forEach(e => console.log(`  ${e.substring(0, 120)}`));

    // Try one more fix pass
    if (errors.length > remainingErrors.length) {
      console.log(`${tag} Improved (${errors.length} → ${remainingErrors.length}), trying one more pass...`);
      const code2 = fs.readFileSync(filePath, 'utf8');
      const fixPrompt2 = buildTscFixPrompt(fileName, code2, remainingErrors);
      try {
        const result2 = await callOpusWithRetry(fixPrompt2, fileName + '_R2', keyIdx);
        const fixedCode2 = extractCode(result2.text);
        if (fixedCode2.length > 500) {
          fs.writeFileSync(filePath, fixedCode2, 'utf8');
          const finalErrors = getTscErrors(filePath);
          console.log(`${tag} After 2nd fix: ${finalErrors.length} errors remaining`);
          if (finalErrors.length === 0) {
            console.log(`${tag} FIXED — all errors resolved (2 passes)`);
            return { file: fileName, success: true, errors: 0, fixedFrom: errors.length, passes: 2 };
          }
          return { file: fileName, success: false, errors: finalErrors.length, fixedFrom: errors.length, passes: 2 };
        }
      } catch (e) {
        console.log(`${tag} 2nd fix failed: ${e.message}`);
      }
    }

    return { file: fileName, success: false, errors: remainingErrors.length, fixedFrom: errors.length };
  }
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  // Get files to fix
  let files;
  if (process.argv[2]) {
    // Fix specific file
    files = [path.join(OUTPUT_DIR, process.argv[2])];
  } else {
    // Fix all .tsx files in c6_12
    files = fs.readdirSync(OUTPUT_DIR)
      .filter(f => f.endsWith('.tsx'))
      .map(f => path.join(OUTPUT_DIR, f));
  }

  console.log(`\n=== TSC FIX SCRIPT ===`);
  console.log(`Files to check: ${files.length}`);
  console.log(`Model: ${MODEL}`);
  console.log('');

  const results = [];
  for (let i = 0; i < files.length; i++) {
    const keyIdx = i % OPUS_API_KEYS.length;
    const result = await fixFile(files[i], keyIdx);
    results.push(result);
    console.log('');
  }

  // Summary
  const clean = results.filter(r => r.success).length;
  const stillBroken = results.filter(r => !r.success).length;
  console.log(`=== SUMMARY ===`);
  console.log(`Clean: ${clean}/${results.length}`);
  console.log(`Still broken: ${stillBroken}/${results.length}`);

  if (stillBroken > 0) {
    console.log(`\nStill broken files:`);
    results.filter(r => !r.success).forEach(r =>
      console.log(`  ${r.file}: ${r.errors} errors (was ${r.fixedFrom || r.errors})`)
    );
  }

  // Save log
  const logFile = path.join(__dirname, `fix-with-tsc_log_${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify(results, null, 2));
  console.log(`\nLog: ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
