// Vertex AI generation pipeline — uses service account auth + gemini-3.7-flash
// Reuses buildPrompt/extractCode/runRealChecks/getTscErrors/buildFixPrompt from opus pipeline
// Skips all completed templates, generates remaining with proper retries
//
// Usage:
//   node scripts/vertex-pipeline.js              # generate all missing
//   node scripts/vertex-pipeline.js --test       # one test only
//   node scripts/vertex-pipeline.js --regenerate-all  # regenerate ALL templates (backs up existing)

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const opus = require('./opus-c6-12-pipeline.js');
const { buildPrompt, extractCode, runRealChecks, getTscErrors, buildFixPrompt, PLAN, OUTPUT_DIR, BACKUP_DIR } = opus;

// ─── Config ───────────────────────────────────────────────────
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'vertex-service-account.json');
const MODEL = 'gemini-3.7-flash';
const LOCATION = 'global';
const MAX_TOKENS = 65536;  // gemini-3.7-flash supports up to 65536 output tokens
const TEMPERATURE = 0.7;
const NUM_WORKERS = 10;
const MAX_RETRIES = 8;
const RETRY_BASE_DELAY = 5000; // 5s base, exponential backoff
const MAX_RETRY_DELAY = 120000; // cap at 2 min
const ENABLE_FIX_PASS = true;
const FIX_PASS_MAX_TOKENS = 65536;
const MAX_FIX_PASSES = 2; // up to 2 fix passes before giving up
const TIMEOUT_MS = 300000; // 5 min per API call
const DEADLINE_HOURS = 8; // overall deadline
const LINE_MIN = 2000;
const MOTION_MIN = 60;
const CALLBACK_MIN = 12;

// ─── Service Account Auth ─────────────────────────────────────
function loadServiceAccount() {
  return JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
}

function base64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function getAccessToken(sa) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: sa.token_uri,
      exp: now + 3600,
      iat: now,
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const signInput = encodedHeader + '.' + encodedPayload;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signInput);
    const signature = signer.sign(sa.private_key, 'base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const jwt = signInput + '.' + signature;

    const body = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString();

    const url = new URL(sa.token_uri);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error('No access token: ' + data.substring(0, 200)));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Auth timeout')); });
    req.write(body);
    req.end();
  });
}

// Cache token, refresh 5 min before expiry
let cachedToken = null;
let tokenExpiry = 0;
async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry - 300000) return cachedToken;
  const sa = loadServiceAccount();
  cachedToken = await getAccessToken(sa);
  tokenExpiry = Date.now() + 3600000;
  return cachedToken;
}

// ─── Vertex AI call ───────────────────────────────────────────
function callVertex(prompt, maxTokens = MAX_TOKENS) {
  return new Promise(async (resolve) => {
    let token;
    try { token = await getToken(); }
    catch (e) { resolve({ success: false, error: 'Auth failed: ' + e.message, elapsed: 0 }); return; }

    const sa = loadServiceAccount();
    const body = JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: TEMPERATURE,
        topP: 0.95,
      },
    });

    const endpoint = LOCATION === 'global' ? 'aiplatform.googleapis.com' : `${LOCATION}-aiplatform.googleapis.com`;
    const urlPath = `/v1/projects/${sa.project_id}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    const start = Date.now();
    const req = https.request({
      hostname: endpoint,
      path: urlPath,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        const elapsed = Math.round((Date.now() - start) / 1000);
        try {
          const json = JSON.parse(data);
          if (json.error) {
            resolve({ success: false, error: json.error.message, elapsed, status: res.statusCode });
            return;
          }
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (!text || text.length < 500) {
            resolve({ success: false, error: 'Response too short: ' + text.length + ' chars', elapsed, status: res.statusCode, raw: text.substring(0, 200) });
            return;
          }
          resolve({ success: true, text, elapsed, status: res.statusCode });
        } catch (e) {
          resolve({ success: false, error: e.message, elapsed, status: res.statusCode, raw: data.substring(0, 300) });
        }
      });
    });
    req.on('error', (e) => resolve({ success: false, error: 'Network error: ' + e.message, elapsed: 0 }));
    req.on('timeout', () => { req.destroy(); resolve({ success: false, error: 'Request timeout (' + (TIMEOUT_MS / 1000) + 's)', elapsed: TIMEOUT_MS / 1000 }); });
    req.setTimeout(TIMEOUT_MS);
    req.write(body);
    req.end();
  });
}

// ─── Call with retry (graceful exponential backoff) ───────────
async function callWithRetry(prompt, tag, maxTokens = MAX_TOKENS) {
  let lastError = '';
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const result = await callVertex(prompt, maxTokens);
    if (result.success) return result;

    lastError = result.error || 'Unknown error';

    // Don't retry on fatal errors (bad key, model disabled, invalid request)
    const fatalPatterns = ['Invalid', 'disabled', 'not found', 'permission denied', 'unauthorized', 'API key'];
    if (fatalPatterns.some(p => lastError.includes(p))) {
      console.log(`${tag} FATAL (no retry): ${lastError.substring(0, 120)}`);
      return result;
    }

    // Retry on rate limit / timeout / server error / network error
    const isRateLimit = lastError.includes('rate') || lastError.includes('quota') || lastError.includes('429') || result.status === 429;
    const isServerError = result.status >= 500 || lastError.includes('500') || lastError.includes('503') || lastError.includes('overloaded');
    const isTimeout = lastError.includes('timeout') || lastError.includes('Timeout');
    const isNetwork = lastError.includes('Network') || lastError.includes('ECONNRESET') || lastError.includes('socket');

    // Exponential backoff with jitter, capped at MAX_RETRY_DELAY
    let delay = RETRY_BASE_DELAY * Math.pow(2, attempt);
    if (isRateLimit) delay = Math.max(delay, 30000); // at least 30s for rate limits
    delay = Math.min(delay, MAX_RETRY_DELAY);
    delay += Math.random() * 2000; // jitter to avoid thundering herd

    const reason = isRateLimit ? 'rate-limit' : isServerError ? 'server-error' : isTimeout ? 'timeout' : isNetwork ? 'network' : 'other';
    console.log(`${tag} Retry ${attempt + 1}/${MAX_RETRIES} in ${(delay / 1000).toFixed(1)}s — [${reason}] ${lastError.substring(0, 100)}`);

    if (attempt < MAX_RETRIES - 1) {
      await new Promise(r => setTimeout(r, delay));
    }
  }
  console.log(`${tag} EXHAUSTED all ${MAX_RETRIES} retries — last error: ${lastError.substring(0, 100)}`);
  return { success: false, error: 'Max retries exceeded: ' + lastError };
}

// ─── Structural pass check ────────────────────────────────────
function isStructuralPass(checks) {
  // Basic structural checks (original)
  const basic = checks.useClient && checks.allImportsPresent &&
    checks.hasDefaultExport && checks.onCompleteInProps &&
    checks.onCompleteCalled && checks.hasLocalStorage &&
    checks.bktUsed && checks.srsUsed && checks.masteryStored &&
    checks.audioUsed && checks.speechUsed &&
    checks.hasHintBubble && checks.hasConfetti &&
    checks.hasSuccessBanner && checks.hasSparkleBurst;
  if (!basic) return false;

  // New Brilliant-style feature checks (mandatory)
  const brilliant = checks.hasDiscoveryPhase && checks.hasNarrativeScenario &&
    checks.hasExplorationSteps && checks.hasPredictionQuestions &&
    checks.hasMultiplePredictions && checks.hasMultipleObservations &&
    checks.hasVisualFeedback && checks.hasShakeAnimation &&
    checks.hasClickToReveal &&
    checks.hasReflection && checks.hasMotivationalFeedback &&
    checks.hasMisconceptionTracking && checks.hasMultiRepresentation &&
    checks.hasSrsVisibility && checks.hasAccessibility &&
    checks.hasObservationQuestions && checks.hasSandboxPhase &&
    checks.hasRealTimeSliders && checks.hasRealWorldActivity &&
    checks.hasEscalatingHints && checks.hasAnswerRevealed &&
    checks.hasNextChallenge && checks.hasBktRef &&
    checks.hasNepCompetency && checks.hasCompetencyLevels &&
    checks.nonMcqCount >= 1;
  return brilliant;
}

// ─── Backup ───────────────────────────────────────────────────
function backupFile(id) {
  const src = path.join(OUTPUT_DIR, `${id}.tsx`);
  if (fs.existsSync(src)) {
    const backupPath = path.join(BACKUP_DIR, `${id}_${Date.now()}.tsx`);
    fs.copyFileSync(src, backupPath);
  }
}

// ─── Process one template ─────────────────────────────────────
async function processTemplate(template, workerId) {
  const tag = `[W${workerId}][${template.id}]`;
  const outputPath = path.join(OUTPUT_DIR, `${template.id}.tsx`);

  // Skip if exists and passes all checks (unless --regenerate-all)
  const regenerateAll = process.argv.includes('--regenerate-all');
  if (fs.existsSync(outputPath) && !regenerateAll) {
    const existingCode = fs.readFileSync(outputPath, 'utf8');
    const existingChecks = runRealChecks(template, existingCode);
    const existingTscErrors = getTscErrors(outputPath);
    const existingStructural = isStructuralPass(existingChecks);
    const existingNodePass = existingChecks.nodesCovered === existingChecks.nodesTotal;
    const existingLinePass = existingChecks.lineCount >= LINE_MIN;
    const existingMotionPass = existingChecks.motionCount >= MOTION_MIN;
    const existingCallbackPass = existingChecks.useCallbackCount >= CALLBACK_MIN;
    const existingSuccess = existingStructural && existingNodePass && existingLinePass && existingMotionPass && existingCallbackPass && existingTscErrors.length === 0;
    if (existingSuccess) {
      console.log(`${tag} SKIP — passes all checks (${existingChecks.lineCount} lines, tsc clean)`);
      return { id: template.id, success: true, skipped: true, checks: existingChecks };
    }
    // Exists but broken — backup then regenerate
    backupFile(template.id);
  } else if (fs.existsSync(outputPath) && regenerateAll) {
    backupFile(template.id);
    console.log(`${tag} REGENERATE — backing up existing file`);
  }

  console.log(`${tag} START — ${template.nodes.length} nodes`);

  // 1. Build prompt
  const prompt = buildPrompt(template);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  // 2. Generate with retry
  const result = await callWithRetry(prompt, tag);
  if (!result.success) {
    console.error(`${tag} FAIL: ${result.error}`);
    return { id: template.id, success: false, error: result.error };
  }

  // 3. Extract code
  let code = extractCode(result.text);
  if (!code || code.length < 500) {
    console.error(`${tag} FAIL: code too short (${code ? code.length : 0} chars, ${result.elapsed}s)`);
    return { id: template.id, success: false, error: 'Code too short' };
  }

  // 4. Write
  backupFile(template.id);
  fs.writeFileSync(outputPath, code, 'utf8');

  // 5. Checks
  let checks = runRealChecks(template, code);
  let tscErrors = getTscErrors(outputPath);
  console.log(`${tag} PASS 1: ${checks.lineCount} lines | motion ${checks.motionCount} | callbacks ${checks.useCallbackCount} | SVG ${checks.svgCount} | Canvas ${checks.canvasCount} | nodes ${checks.nodesCovered}/${checks.nodesTotal} | challenges ${checks.challengeCount} | non-MCQ ${checks.nonMcqCount} | competency ${checks.competencyBasedCount}/${checks.challengeCount} (${checks.hasNepCompetency ? 'OK' : 'LOW'}) | discovery ${checks.hasDiscoveryPhase ? 'Y' : 'N'} | explore ${checks.hasExplorationSteps ? 'Y' : 'N'} | sandbox ${checks.hasSandboxPhase ? 'Y' : 'N'} | predict ${checks.hasPredictionQuestions ? 'Y' : 'N'} | observe ${checks.hasObservationQuestions ? 'Y' : 'N'} | realtime ${checks.hasRealTimeSliders ? 'Y' : 'N'} | hints ${checks.hasEscalatingHints ? 'Y' : 'N'} | drag ${checks.hasDragHandlers ? 'Y' : 'N'} | tsc ${tscErrors.length} (${result.elapsed}s)`);

  // 6. Quality gate
  const structuralPass = isStructuralPass(checks);
  const nodePass = checks.nodesCovered === checks.nodesTotal;
  const linePass = checks.lineCount >= LINE_MIN;
  const motionPass = checks.motionCount >= MOTION_MIN;
  const callbackPass = checks.useCallbackCount >= CALLBACK_MIN;
  let success = structuralPass && nodePass && linePass && motionPass && callbackPass && tscErrors.length === 0;

  // 7. Fix passes (up to MAX_FIX_PASSES) if needed
  let fixPassNum = 0;
  let currentCode = code;
  while (!success && ENABLE_FIX_PASS && fixPassNum < MAX_FIX_PASSES) {
    fixPassNum++;
    const fixLabel = fixPassNum === 1 ? 'FIX PASS' : `FIX PASS ${fixPassNum}`;
    console.log(`${tag} ${fixLabel} — structural ${structuralPass}, nodes ${nodePass}, lines ${linePass} (${checks.lineCount}), motion ${motionPass} (${checks.motionCount}), callbacks ${callbackPass} (${checks.useCallbackCount}), tsc ${tscErrors.length}`);
    const fixPrompt = buildFixPrompt(template, currentCode, checks, tscErrors);
    const fixResult = await callWithRetry(fixPrompt, tag + `_FIX${fixPassNum}`, FIX_PASS_MAX_TOKENS);
    if (fixResult.success) {
      const fixedCode = extractCode(fixResult.text);
      if (fixedCode && fixedCode.length > 500) {
        fs.writeFileSync(outputPath, fixedCode, 'utf8');
        const fixedChecks = runRealChecks(template, fixedCode);
        const fixedTscErrors = getTscErrors(outputPath);
        const fixedStructural = isStructuralPass(fixedChecks);
        const fixedNodePass = fixedChecks.nodesCovered === fixedChecks.nodesTotal;
        const fixedLinePass = fixedChecks.lineCount >= LINE_MIN;
        const fixedMotionPass = fixedChecks.motionCount >= MOTION_MIN;
        const fixedCallbackPass = fixedChecks.useCallbackCount >= CALLBACK_MIN;
        success = fixedStructural && fixedNodePass && fixedLinePass && fixedMotionPass && fixedCallbackPass && fixedTscErrors.length === 0;
        checks = fixedChecks;
        tscErrors = fixedTscErrors;
        currentCode = fixedCode;
        console.log(`${tag} FIX${fixPassNum}: ${success ? 'SUCCESS' : 'NEEDS REVIEW'} — ${fixedChecks.lineCount} lines, ${fixedChecks.motionCount} motion, ${fixedChecks.useCallbackCount} callbacks, ${fixedChecks.challengeCount} challenges, ${fixedChecks.nonMcqCount} non-MCQ, competency ${fixedChecks.competencyBasedCount}/${fixedChecks.challengeCount}, discovery ${fixedChecks.hasDiscoveryPhase ? 'Y' : 'N'}, explore ${fixedChecks.hasExplorationSteps ? 'Y' : 'N'}, sandbox ${fixedChecks.hasSandboxPhase ? 'Y' : 'N'}, tsc ${fixedTscErrors.length} (${fixResult.elapsed}s)`);
      } else {
        console.log(`${tag} FIX${fixPassNum}: no usable code extracted (got ${fixedCode ? fixedCode.length : 0} chars)`);
        break;
      }
    } else {
      console.log(`${tag} FIX${fixPassNum}: failed — ${fixResult.error?.substring(0, 100)}`);
      // Don't break — try again if we have fix passes left
    }
  }

  console.log(`${tag} DONE: ${success ? 'SUCCESS' : 'NEEDS REVIEW'}`);
  return { id: template.id, success, checks, tscErrors: tscErrors.length };
}

// ─── Worker pool (with deadline + graceful error handling) ───
async function runWorkers(templates) {
  const results = [];
  let nextIdx = 0;
  const total = templates.length;
  const startTime = Date.now();
  const deadlineMs = DEADLINE_HOURS * 60 * 60 * 1000;

  async function worker(workerId) {
    while (true) {
      // Check deadline
      if (Date.now() - startTime > deadlineMs) {
        console.log(`[W${workerId}] Deadline reached (${DEADLINE_HOURS}h) — stopping`);
        break;
      }
      const idx = nextIdx++;
      if (idx >= total) break;
      const template = templates[idx];
      try {
        const result = await processTemplate(template, workerId);
        results.push(result);
        const done = results.length;
        const successCount = results.filter(r => r.success).length;
        const skipCount = results.filter(r => r.skipped).length;
        const elapsed = ((Date.now() - startTime) / 60000).toFixed(1);
        console.log(`  [PROGRESS] ${done}/${total} done — ${successCount} success, ${skipCount} skipped, ${done - successCount} need review (${elapsed}m elapsed)`);
      } catch (e) {
        console.error(`[W${workerId}][${template.id}] ERROR: ${e.message}`);
        results.push({ id: template.id, success: false, error: e.message });
        // Continue to next template — don't let one failure kill the worker
      }
    }
  }

  await Promise.all(Array.from({ length: NUM_WORKERS }, (_, i) => worker(i + 1)));
  return results;
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  const isTest = process.argv.includes('--test');
  const regenerateAll = process.argv.includes('--regenerate-all');

  // Get missing templates (or all if --regenerate-all)
  const existing = new Set(
    fs.existsSync(OUTPUT_DIR)
      ? fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.tsx')).map(f => f.replace(/\.tsx$/, ''))
      : []
  );
  let templates = regenerateAll ? [...PLAN] : PLAN.filter(t => !existing.has(t.id));

  if (isTest) {
    templates = templates.slice(0, 1);
    console.log(`\n=== VERTEX AI TEST (1 template) ===`);
  } else {
    console.log(`\n=== VERTEX AI PIPELINE ===`);
  }

  console.log(`Model: ${MODEL}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Workers: ${NUM_WORKERS}`);
  console.log(`Templates: ${templates.length} remaining (${existing.size} already done)`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Quality: ${LINE_MIN}+ lines, ${MOTION_MIN}+ motion, ${CALLBACK_MIN}+ callbacks`);
  console.log('');

  if (templates.length === 0) {
    console.log('All templates done!');
    return;
  }

  const startTime = Date.now();
  const results = await runWorkers(templates);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const skipped = results.filter(r => r.skipped).length;

  console.log('\n=== SUMMARY ===');
  console.log(`Time: ${Math.round(elapsed / 60)}m ${Math.round(elapsed % 60)}s`);
  console.log(`Succeeded: ${succeeded}/${results.length} (skipped: ${skipped})`);
  console.log(`Failed: ${failed}/${results.length}`);

  const needsReview = results.filter(r => !r.success && !r.skipped);
  if (needsReview.length > 0) {
    console.log('\nNeeds review (will retry on next run):');
    needsReview.forEach(r =>
      console.log(`  ${r.id}: ${r.error || 'checks failed'}${r.tscErrors ? ` (${r.tscErrors} tsc errors)` : ''}`)
    );
  }

  // Save summary
  const summaryFile = path.join(__dirname, `vertex_summary_${Date.now()}.json`);
  fs.writeFileSync(summaryFile, JSON.stringify({
    model: MODEL,
    elapsed,
    succeeded,
    failed,
    skipped,
    total: results.length,
    needsReview: needsReview.map(r => r.id),
    results
  }, null, 2));
  console.log(`\nSummary: ${summaryFile}`);
  console.log(`\nTo retry failed: node scripts/vertex-pipeline.js`);
  console.log(`To regenerate all: node scripts/vertex-pipeline.js --regenerate-all`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
