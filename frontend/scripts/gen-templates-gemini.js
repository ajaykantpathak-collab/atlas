// Gemini 3.6-flash template generation — reuses the Opus prompt + checks + fix pass
// 3 keys, 3 templates per round, 65s break between rounds
//
// Usage:
//   node scripts/gen-templates-gemini.js                # auto-select ~57 missing templates
//   node scripts/gen-templates-gemini.js <count>        # first <count> missing templates
//   node scripts/gen-templates-gemini.js <count> --now  # skip the 10s start delay
//
// Reuses buildPrompt / extractCode / runRealChecks / getTscErrors / buildFixPrompt / backupFile
// from opus-c6-12-pipeline.js so the quality bar is identical to the Opus run.

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── Reuse Opus pipeline helpers (prompt + checks + fix pass) ───
const opus = require('./opus-c6-12-pipeline.js');
const { buildPrompt, extractCode, runRealChecks, getTscErrors, buildFixPrompt, backupFile, PLAN, OUTPUT_DIR, BACKUP_DIR } = opus;

// ─── Gemini API config ────────────────────────────────────────
const KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
];
const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const BREAK_MS = 65000;       // 65s break between rounds (Gemini free-tier friendly)
const FIX_PASS_MAX_TOKENS = 65536;
const ENABLE_FIX_PASS = true;
const START_DELAY_MS = 10000; // 10s grace period before first round

// ─── Helpers ──────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function getMissingTemplates(count) {
  const existing = new Set(
    fs.existsSync(OUTPUT_DIR)
      ? fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.tsx')).map(f => f.replace(/\.tsx$/, ''))
      : []
  );
  return PLAN.filter(t => !existing.has(t.id)).slice(0, count);
}

// ─── Gemini API call ──────────────────────────────────────────
function callGemini(prompt, keyIdx, maxTokens = MAX_TOKENS) {
  return new Promise((resolve) => {
    const key = KEYS[keyIdx];
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
    });

    const start = Date.now();
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
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
          if (!text) {
            resolve({ success: false, error: 'No text in response', elapsed, status: res.statusCode });
            return;
          }
          resolve({ success: true, text, elapsed, status: res.statusCode });
        } catch (e) {
          resolve({ success: false, error: e.message, elapsed, status: res.statusCode });
        }
      });
    });
    req.on('error', (e) => resolve({ success: false, error: e.message, elapsed: 0 }));
    req.setTimeout(180000, () => { req.destroy(); resolve({ success: false, error: 'Request timeout (180s)', elapsed: 180 }); });
    req.write(body);
    req.end();
  });
}

// ─── Determine structural pass (same criteria as Opus) ────────
function isStructuralPass(checks) {
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

// ─── Process one template end-to-end ──────────────────────────
async function processTemplate(template, keyIdx) {
  const tag = `[${template.id}]`;
  const outputPath = path.join(OUTPUT_DIR, `${template.id}.tsx`);

  // 0. Skip if file already exists and passes all checks
  if (fs.existsSync(outputPath)) {
    const existingCode = fs.readFileSync(outputPath, 'utf8');
    const existingChecks = runRealChecks(template, existingCode);
    const existingTscErrors = getTscErrors(outputPath);
    const existingStructural = isStructuralPass(existingChecks);
    const existingNodePass = existingChecks.nodesCovered === existingChecks.nodesTotal;
    const existingLinePass = existingChecks.lineCount >= 2000;
    const existingMotionPass = existingChecks.motionCount >= 60;
    const existingCallbackPass = existingChecks.useCallbackCount >= 12;
    const existingSuccess = existingStructural && existingNodePass && existingLinePass && existingMotionPass && existingCallbackPass && existingTscErrors.length === 0;
    if (existingSuccess) {
      console.log(`${tag} SKIP — already exists and passes all checks (${existingChecks.lineCount} lines, tsc clean)`);
      return { id: template.id, success: true, checks: existingChecks, skipped: true };
    }
    // File exists but broken — back it up then regenerate
    backupFile(template.id);
  }

  console.log(`${tag} START — C${template.class} ${template.subjectName}, ${template.nodes.length} nodes (key ${keyIdx + 1})`);

  // 1. Build prompt (same as Opus)
  const prompt = buildPrompt(template);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  // 2. Call Gemini
  let result;
  try {
    result = await callGemini(prompt, keyIdx);
  } catch (e) {
    console.error(`${tag} FAIL: ${e.message}`);
    return { id: template.id, success: false, error: e.message };
  }
  if (!result.success) {
    console.error(`${tag} FAIL: ${result.error} (${result.elapsed}s, status ${result.status})`);
    try { fs.writeFileSync(path.join(__dirname, `raw_gemini_${template.id}.txt`), result.error || '', 'utf8'); } catch (e) {}
    return { id: template.id, success: false, error: result.error };
  }

  // 3. Extract code
  let code = extractCode(result.text);
  if (!code || code.length < 500) {
    console.error(`${tag} FAIL: code too short or not extractable (${code ? code.length : 0} chars, ${result.elapsed}s)`);
    try { fs.writeFileSync(path.join(__dirname, `raw_gemini_${template.id}.txt`), result.text, 'utf8'); } catch (e) {}
    return { id: template.id, success: false, error: 'Code too short / not extractable' };
  }

  // 4. Backup + write
  backupFile(template.id);
  fs.writeFileSync(outputPath, code, 'utf8');

  // 5. Real checks
  let checks = runRealChecks(template, code);
  console.log(`${tag} PASS 1: ${checks.lineCount} lines | SVG ${checks.svgCount} | Canvas ${checks.canvasCount} | useClient ${checks.useClient} | imports ${checks.allImportsPresent ? 'OK' : 'MISSING'} | nodes ${checks.nodesCovered}/${checks.nodesTotal} | challenges ${checks.challengeCount} | non-MCQ ${checks.nonMcqCount} | competency ${checks.competencyBasedCount}/${checks.challengeCount} (${checks.hasNepCompetency ? 'OK' : 'LOW'}) | discovery ${checks.hasDiscoveryPhase ? 'Y' : 'N'} | explore ${checks.hasExplorationSteps ? 'Y' : 'N'} | sandbox ${checks.hasSandboxPhase ? 'Y' : 'N'} | predict ${checks.hasPredictionQuestions ? 'Y' : 'N'} | observe ${checks.hasObservationQuestions ? 'Y' : 'N'} | realtime ${checks.hasRealTimeSliders ? 'Y' : 'N'} | hints ${checks.hasEscalatingHints ? 'Y' : 'N'} | drag ${checks.hasDragHandlers ? 'Y' : 'N'} | BKT ${checks.bktUsed} | SRS ${checks.srsUsed} | mastery ${checks.masteryStored} | audio ${checks.audioUsed} | speech ${checks.speechUsed} (${result.elapsed}s)`);

  // 6. tsc check
  let tscErrors = getTscErrors(outputPath);
  if (tscErrors.length > 0) {
    console.log(`${tag} TSC: ${tscErrors.length} compiler errors`);
    tscErrors.slice(0, 3).forEach(e => console.log(`  ${e.substring(0, 140)}`));
  } else {
    console.log(`${tag} TSC: CLEAN`);
  }

  // 7. Fix pass (using Gemini) if structural, motion, useCallback, or tsc failed
  const structuralPass = isStructuralPass(checks);
  const nodePass = checks.nodesCovered === checks.nodesTotal;
  const linePass = checks.lineCount >= 2000;
  const motionPass = checks.motionCount >= 60;
  const callbackPass = checks.useCallbackCount >= 12;
  let success = structuralPass && nodePass && linePass && motionPass && callbackPass && tscErrors.length === 0;

  if (!success && ENABLE_FIX_PASS) {
    console.log(`${tag} FIX PASS — structural ${structuralPass}, nodes ${nodePass}, lines ${linePass} (${checks.lineCount}), motion ${motionPass} (${checks.motionCount}), callbacks ${callbackPass} (${checks.useCallbackCount}), tsc ${tscErrors.length}`);
    const fixPrompt = buildFixPrompt(template, code, checks, tscErrors);
    let fixResult;
    try {
      fixResult = await callGemini(fixPrompt, keyIdx, FIX_PASS_MAX_TOKENS);
    } catch (e) {
      console.log(`${tag} FIX FAIL: ${e.message}`);
    }
    if (fixResult && fixResult.success) {
      const fixedCode = extractCode(fixResult.text);
      if (fixedCode && fixedCode.length > 500) {
        fs.writeFileSync(outputPath, fixedCode, 'utf8');
        const fixedChecks = runRealChecks(template, fixedCode);
        const fixedTscErrors = getTscErrors(outputPath);
        const fixedStructural = isStructuralPass(fixedChecks);
        const fixedNodePass = fixedChecks.nodesCovered === fixedChecks.nodesTotal;
        const fixedLinePass = fixedChecks.lineCount >= 2000;
        const fixedMotionPass = fixedChecks.motionCount >= 60;
        const fixedCallbackPass = fixedChecks.useCallbackCount >= 12;
        success = fixedStructural && fixedNodePass && fixedLinePass && fixedMotionPass && fixedCallbackPass && fixedTscErrors.length === 0;
        checks = fixedChecks;
        tscErrors = fixedTscErrors;
        console.log(`${tag} FIX: ${success ? 'SUCCESS' : 'STILL BROKEN'} — ${fixedChecks.lineCount} lines, ${fixedChecks.motionCount} motion, ${fixedChecks.useCallbackCount} callbacks, ${fixedChecks.challengeCount} challenges, ${fixedChecks.nonMcqCount} non-MCQ, competency ${fixedChecks.competencyBasedCount}/${fixedChecks.challengeCount}, explore ${fixedChecks.hasExplorationSteps ? 'Y' : 'N'}, sandbox ${fixedChecks.hasSandboxPhase ? 'Y' : 'N'}, tsc ${fixedTscErrors.length} errors (${fixResult.elapsed}s)`);
      } else {
        console.log(`${tag} FIX: no usable code extracted (${fixResult.elapsed}s)`);
      }
    } else if (fixResult) {
      console.log(`${tag} FIX: API error — ${fixResult.error}`);
    }
  }

  console.log(`${tag} DONE: ${success ? 'SUCCESS' : 'NEEDS REVIEW'}`);
  return { id: template.id, success, checks, tscErrors: tscErrors.length, class: template.class, subject: template.subject };
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  const countArg = parseInt(process.argv[2] || '57', 10);
  const startNow = process.argv.includes('--now');
  const count = Math.min(countArg || 57, 60);

  const templates = getMissingTemplates(count);
  if (templates.length === 0) {
    console.log('No missing templates to generate. All done!');
    return;
  }

  console.log(`\n=== GEMINI ${MODEL} GENERATION (Opus prompt parity) ===`);
  console.log(`Templates: ${templates.length} (of ${count} requested, ${PLAN.length - templates.length} already exist)`);
  console.log(`Keys: ${KEYS.length} | Round size: 3 (1 per key) | Break: ${BREAK_MS / 1000}s`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Fix pass: ${ENABLE_FIX_PASS ? 'ENABLED' : 'DISABLED'}`);
  console.log('');

  if (!startNow) {
    console.log(`Starting in ${START_DELAY_MS / 1000}s (use --now to skip)...`);
    await sleep(START_DELAY_MS);
  }

  const allResults = [];
  const totalStart = Date.now();

  for (let round = 0; round < templates.length; round += 3) {
    const roundTemplates = templates.slice(round, round + 3);
    const roundNum = Math.floor(round / 3) + 1;
    const totalRounds = Math.ceil(templates.length / 3);

    console.log(`\n--- ROUND ${roundNum}/${totalRounds} ---`);
    console.log(`  ${roundTemplates.map((t, i) => `[Key ${i + 1}] ${t.id}`).join(' | ')}`);

    const results = await Promise.all(
      roundTemplates.map((t, i) => processTemplate(t, i % KEYS.length))
    );
    allResults.push(...results);

    // Save progress after each round
    const progressFile = path.join(__dirname, 'gemini_c6_12_progress.json');
    const successCount = allResults.filter(r => r.success).length;
    fs.writeFileSync(progressFile, JSON.stringify({
      lastRun: new Date().toISOString(),
      roundsDone: roundNum,
      totalRounds,
      completed: allResults.length,
      successCount,
      failedCount: allResults.length - successCount,
      lastIds: results.map(r => r.id),
    }, null, 2));

    // 65s break between rounds (unless last round)
    if (round + 3 < templates.length) {
      console.log(`  ...waiting ${BREAK_MS / 1000}s before next round...`);
      await sleep(BREAK_MS);
    }
  }

  const totalElapsed = Math.round((Date.now() - totalStart) / 1000);
  const success = allResults.filter(r => r.success).length;
  const fail = allResults.filter(r => !r.success).length;
  const skipped = allResults.filter(r => r.skipped).length;

  console.log(`\n=== SUMMARY ===`);
  console.log(`Success: ${success}/${templates.length} (skipped: ${skipped})`);
  console.log(`Failed/needs review: ${fail}/${templates.length}`);
  console.log(`Total time: ${Math.round(totalElapsed / 60)}m ${totalElapsed % 60}s`);
  console.log(`\nGenerated files:`);
  allResults.filter(r => r.success && r.checks).forEach(r =>
    console.log(`  ${r.id}: ${r.checks.lineCount} lines, ${r.checks.svgCount} SVG, ${r.checks.canvasCount} Canvas, ${r.checks.nodesCovered}/${r.checks.nodesTotal} nodes${r.skipped ? ' (skipped)' : ''}`)
  );

  if (fail > 0) {
    console.log(`\nFailed / needs review:`);
    allResults.filter(r => !r.success).forEach(r =>
      console.log(`  ${r.id}: ${r.error || 'checks failed'}`)
    );
  }

  // Save summary
  const summaryFile = path.join(__dirname, `gemini_summary_${Date.now()}.json`);
  fs.writeFileSync(summaryFile, JSON.stringify({
    model: MODEL,
    totalElapsed,
    success,
    fail,
    skipped,
    results: allResults,
  }, null, 2));
  console.log(`\nSummary: ${summaryFile}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
