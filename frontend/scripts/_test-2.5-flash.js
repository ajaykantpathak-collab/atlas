// Quick test: generate one template with gemini-2.5-flash and compare quality
const fs = require('fs');
const path = require('path');
const https = require('https');
const opus = require('./opus-c6-12-pipeline.js');
const { buildPrompt, extractCode, runRealChecks, getTscErrors, PLAN, OUTPUT_DIR } = opus;

const KEYS = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
];

const MODEL = 'gemini-2.5-flash';
const MAX_TOKENS = 65536;

function callGemini(prompt, keyIdx) {
  return new Promise((resolve) => {
    const key = KEYS[keyIdx];
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: MAX_TOKENS, temperature: 0.7 },
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
          if (json.error) { resolve({ success: false, error: json.error.message, elapsed }); return; }
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (!text) { resolve({ success: false, error: 'No text', elapsed }); return; }
          resolve({ success: true, text, elapsed });
        } catch (e) { resolve({ success: false, error: e.message, elapsed }); }
      });
    });
    req.on('error', (e) => resolve({ success: false, error: e.message, elapsed: 0 }));
    req.setTimeout(180000, () => { req.destroy(); resolve({ success: false, error: 'Timeout', elapsed: 180 }); });
    req.write(body);
    req.end();
  });
}

async function main() {
  // Pick first missing template
  const existing = new Set(fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.tsx')).map(f => f.replace(/\.tsx$/, '')));
  const missing = PLAN.filter(t => !existing.has(t.id));
  const template = missing[0];
  if (!template) { console.log('No missing templates'); return; }

  console.log(`Testing ${MODEL} on: ${template.id}`);
  console.log(`Building prompt...`);
  const prompt = buildPrompt(template);
  console.log(`Prompt: ${(prompt.length / 1024).toFixed(0)} KB`);

  // Try each key until one works
  let result = null;
  for (let i = 0; i < KEYS.length; i++) {
    console.log(`Trying key ${i + 1}...`);
    result = await callGemini(prompt, i);
    if (result.success) { console.log(`Key ${i + 1} worked (${result.elapsed}s)`); break; }
    console.log(`Key ${i + 1} failed: ${result.error?.substring(0, 100)}`);
  }

  if (!result || !result.success) {
    console.log('All keys failed for 2.5-flash');
    return;
  }

  const code = extractCode(result.text);
  if (!code || code.length < 500) { console.log(`Code too short: ${code?.length || 0}`); return; }

  const outputPath = path.join(OUTPUT_DIR, `_TEST_2.5flash_${template.id}.tsx`);
  fs.writeFileSync(outputPath, code, 'utf8');

  const checks = runRealChecks(template, code);
  console.log(`\n=== 2.5-FLASH RESULTS ===`);
  console.log(`Lines: ${checks.lineCount}`);
  console.log(`Motion: ${checks.motionCount}`);
  console.log(`useState: ${checks.useStateCount}`);
  console.log(`useCallback: ${checks.useCallbackCount}`);
  console.log(`SVG: ${checks.svgCount} | Canvas: ${checks.canvasCount}`);
  console.log(`Nodes: ${checks.nodesCovered}/${checks.nodesTotal}`);
  console.log(`useClient: ${checks.useClient} | imports: ${checks.allImportsPresent}`);
  console.log(`BKT: ${checks.bktUsed} | SRS: ${checks.srsUsed} | mastery: ${checks.masteryStored}`);
  console.log(`audio: ${checks.audioUsed} | speech: ${checks.speechUsed}`);
  console.log(`HintBubble: ${checks.hasHintBubble} | Confetti: ${checks.hasConfetti} | SuccessBanner: ${checks.hasSuccessBanner} | SparkleBurst: ${checks.hasSparkleBurst}`);

  const tscErrors = getTscErrors(outputPath);
  console.log(`TSC errors: ${tscErrors.length}`);
  if (tscErrors.length > 0) tscErrors.slice(0, 3).forEach(e => console.log(`  ${e.substring(0, 140)}`));

  // Clean up test file
  fs.unlinkSync(outputPath);
  console.log(`\n(Test file removed — not saved permanently)`);
}

main().catch(e => console.error('FATAL:', e));
