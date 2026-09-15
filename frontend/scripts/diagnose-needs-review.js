#!/usr/bin/env node
/**
 * Diagnostic script — READS ONLY, does not generate or modify anything.
 * Checks all 90 NEEDS REVIEW files against the same quality gates as the pipeline
 * and reports which specific features are missing for each file.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');
const SUMMARY_PATH = path.join(__dirname, 'vertex_summary_1787708486777.json');

const summary = JSON.parse(fs.readFileSync(SUMMARY_PATH, 'utf8'));
const needsReview = summary.needsReview;

// Reuse the same check logic from the pipeline
function runChecks(code) {
  const lineCount = code.split('\n').length;
  const useClient = code.includes("'use client'") || code.includes('"use client"');

  const importChecks = {
    srs: code.includes('createReviewItem') || code.includes('sm2Update'),
    bkt: code.includes('createBKTState') || code.includes('bktUpdate'),
    mastery: code.includes('recordGameScore') || code.includes('getNodeMastery'),
    topicGraph: code.includes('SUBJECT_CONFIG'),
    simEngine: code.includes('audioManager') || code.includes('Confetti') || code.includes('HintBubble'),
  };

  const hasDefaultExport = /export\s+default\s+/.test(code);
  const onCompleteInProps = /onComplete\??\s*:\s*\(?\s*score\s*:\s*number\s*\)?/.test(code);
  const onCompleteCalled = /onComplete\s*\(/.test(code);
  const hasLocalStorage = /localStorage\.(getItem|setItem)/.test(code) ||
                          /recordGameScore|getNodeMastery|getNodesNeedingReview/.test(code);
  const bktUsed = /bktUpdate\s*\(/.test(code);
  const srsUsed = /sm2Update\s*\(/.test(code);
  const masteryStored = /recordGameScore\s*\(/.test(code);
  const audioUsed = /audioManager\.play\s*\(/.test(code);
  const speechUsed = /speechManager\.speak\s*\(/.test(code);
  const hasHintBubble = /<HintBubble/.test(code);
  const hasConfetti = /<Confetti/.test(code);
  const hasSuccessBanner = /<SuccessBanner/.test(code);
  const hasSparkleBurst = /<SparkleBurst/.test(code);

  const svgCount = (code.match(/<svg/g) || []).length;
  const canvasCount = (code.match(/<canvas/g) || []).length;
  const useCallbackCount = (code.match(/useCallback/g) || []).length;
  const motionCount = (code.match(/motion\./g) || []).length;

  // Brilliant-style feature checks
  const hasDiscoveryPhase = /'discovery'/.test(code) && /phase.*discovery/.test(code);
  const hasNarrativeScenario = /SCENARIO\s*=/.test(code) || /scenario\s*[:=]/i.test(code);
  const hasExplorationSteps = /EXPLORATION_STEPS|explorationSteps/i.test(code);
  const hasPredictionQuestions = /PREDICTION_QUESTIONS|predictionQuestions|handlePrediction/i.test(code);
  const hasObservationQuestions = /OBSERVATION_QUESTIONS|observationQuestions|handleObservation/i.test(code);
  const hasMultiplePredictions = (code.match(/PREDICTION_QUESTIONS\s*=\s*\[/g) || []).length > 0 && (code.match(/verifyInstruction/g) || []).length >= 2;
  const hasMultipleObservations = (code.match(/OBSERVATION_QUESTIONS\s*=\s*\[/g) || []).length > 0 && (code.match(/observableOptions/g) || []).length >= 2;
  const hasVisualFeedback = /wrongShake|setWrongShake|wrongFlash|setWrongFlash/i.test(code);
  const hasShakeAnimation = /animate.*x.*-10.*10|animate.*\{.*x.*\[0,.*-10/i.test(code);
  const hasClickToReveal = /revealedSteps|setRevealedSteps|Show next step/i.test(code);
  const hasReflection = /Reflect|most surprising|explain this topic to a friend|where in real life/i.test(code);
  const hasMotivationalFeedback = /PERFECT SCORE|Do not give up|You WILL get this|Great work|Good effort/i.test(code);
  const hasMisconceptionTracking = /hitMisconceptions|setHitMisconceptions|Misconception Profile|misconceptionIndex/i.test(code);
  const representationCount = [
    /truth\s*table/i.test(code),
    /venn|circle.*overlap|set.*overlap/i.test(code),
    /<svg|viewBox/i.test(code),
    /<canvas|getContext/i.test(code),
    /recharts|<LineChart|<BarChart|<PieChart/i.test(code),
    /d3\.|scaleLinear|axisBottom/i.test(code),
  ].filter(Boolean).length;
  const hasMultiRepresentation = representationCount >= 2;
  const hasSrsVisibility = /review.*in.*days|review.*schedule|reviewed in|Come back then|strengthen your memory/i.test(code);
  const hasAccessibility = /aria-label|aria-|role=["']button["']|role=["']slider["']/i.test(code);
  const hasSandboxPhase = /'sandbox'/.test(code) && /phase.*sandbox/.test(code);
  const hasRealWorldActivity = /REAL_WORLD_ACTIVITY|realWorldActivity/i.test(code);
  const hasEscalatingHints = /hints\s*[=:]\s*\[/.test(code) && /hintCount/.test(code);
  const hasAnswerRevealed = /answerRevealed/.test(code);
  const hasNextChallenge = /handleNextChallenge|nextChallenge/i.test(code);
  const hasBktRef = /bktStateRef/.test(code);
  const hasDragHandlers = /handleDragStart/.test(code) && /handleDragDrop/.test(code);
  const hasRealTimeSliders = /type=["']range["'][^>]*onChange=\{[^}]*set[A-Z]/.test(code) ||
                             /onChange=\{[^}]*set\w+\(Number\(e\.target\.value\)\)\}/.test(code) ||
                             /handlePriceChange|handleSliderChange|handleVariableChange/.test(code);
  const hasDragLabel = /drag-label|dragLabel/.test(code);
  const hasDragSort = /drag-sort|dragSort/.test(code);
  const hasNumeric = /'numeric'/.test(code) && /correctAnswer/.test(code);
  const hasConstruct = /'construct'/.test(code) && /availableParts/.test(code);
  const nonMcqCount = [hasDragLabel, hasDragSort, hasNumeric, hasConstruct].filter(Boolean).length;
  const challengeCount = (code.match(/difficulty:\s*['"](?:foundation|standard|advanced)['"]/g) || []).length;
  const hasCompetencyLevels = /competencyLevel\s*[:=]/.test(code);
  const competencyApplicationCount = (code.match(/competencyLevel:\s*['"]application['"]/g) || []).length;
  const competencyAnalysisCount = (code.match(/competencyLevel:\s*['"]analysis['"]/g) || []).length;
  const competencyEvaluationCount = (code.match(/competencyLevel:\s*['"]evaluation['"]/g) || []).length;
  const competencyCreativityCount = (code.match(/competencyLevel:\s*['"]creativity['"]/g) || []).length;
  const competencyBasedCount = competencyApplicationCount + competencyAnalysisCount + competencyEvaluationCount + competencyCreativityCount;
  const hasNepCompetency = hasCompetencyLevels && competencyBasedCount >= 8;

  // Build list of all structural failures
  const failures = [];

  // Basic checks
  if (!useClient) failures.push('useClient');
  if (!importChecks.srs) failures.push('import:srs');
  if (!importChecks.bkt) failures.push('import:bkt');
  if (!importChecks.mastery) failures.push('import:mastery');
  if (!importChecks.topicGraph) failures.push('import:topicGraph');
  if (!importChecks.simEngine) failures.push('import:simEngine');
  if (!hasDefaultExport) failures.push('hasDefaultExport');
  if (!onCompleteInProps) failures.push('onCompleteInProps');
  if (!onCompleteCalled) failures.push('onCompleteCalled');
  if (!hasLocalStorage) failures.push('hasLocalStorage');
  if (!bktUsed) failures.push('bktUsed');
  if (!srsUsed) failures.push('srsUsed');
  if (!masteryStored) failures.push('masteryStored');
  if (!audioUsed) failures.push('audioUsed');
  if (!speechUsed) failures.push('speechUsed');
  if (!hasHintBubble) failures.push('hasHintBubble');
  if (!hasConfetti) failures.push('hasConfetti');
  if (!hasSuccessBanner) failures.push('hasSuccessBanner');
  if (!hasSparkleBurst) failures.push('hasSparkleBurst');

  // Brilliant-style checks
  if (!hasDiscoveryPhase) failures.push('hasDiscoveryPhase');
  if (!hasNarrativeScenario) failures.push('hasNarrativeScenario');
  if (!hasExplorationSteps) failures.push('hasExplorationSteps');
  if (!hasPredictionQuestions) failures.push('hasPredictionQuestions');
  if (!hasObservationQuestions) failures.push('hasObservationQuestions');
  if (!hasMultiplePredictions) failures.push('hasMultiplePredictions');
  if (!hasMultipleObservations) failures.push('hasMultipleObservations');
  if (!hasVisualFeedback) failures.push('hasVisualFeedback');
  if (!hasShakeAnimation) failures.push('hasShakeAnimation');
  if (!hasClickToReveal) failures.push('hasClickToReveal');
  if (!hasReflection) failures.push('hasReflection');
  if (!hasMotivationalFeedback) failures.push('hasMotivationalFeedback');
  if (!hasMisconceptionTracking) failures.push('hasMisconceptionTracking');
  if (!hasMultiRepresentation) failures.push('hasMultiRepresentation');
  if (!hasSrsVisibility) failures.push('hasSrsVisibility');
  if (!hasAccessibility) failures.push('hasAccessibility');
  if (!hasSandboxPhase) failures.push('hasSandboxPhase');
  if (!hasRealTimeSliders) failures.push('hasRealTimeSliders');
  if (!hasRealWorldActivity) failures.push('hasRealWorldActivity');
  if (!hasEscalatingHints) failures.push('hasEscalatingHints');
  if (!hasAnswerRevealed) failures.push('hasAnswerRevealed');
  if (!hasNextChallenge) failures.push('hasNextChallenge');
  if (!hasBktRef) failures.push('hasBktRef');
  if (!hasNepCompetency) failures.push('hasNepCompetency');
  if (!hasCompetencyLevels) failures.push('hasCompetencyLevels');
  if (nonMcqCount < 1) failures.push('nonMcqCount<1');

  // Threshold checks
  const linePass = lineCount >= 2000;
  const motionPass = motionCount >= 60;
  const callbackPass = useCallbackCount >= 12;
  if (!linePass) failures.push(`lines(${lineCount})`);
  if (!motionPass) failures.push(`motion(${motionCount})`);
  if (!callbackPass) failures.push(`callbacks(${useCallbackCount})`);

  return {
    failures,
    lineCount, motionCount, useCallbackCount,
    svgCount, canvasCount, challengeCount, nonMcqCount,
    competencyBasedCount, hasNepCompetency,
    structuralPass: failures.filter(f => !f.match(/^(lines|motion|callbacks)\(/)).length === 0,
  };
}

// Process all 90 files
const results = {};
const failureFrequency = {};

for (const id of needsReview) {
  const filePath = path.join(OUTPUT_DIR, `${id}.tsx`);
  if (!fs.existsSync(filePath)) {
    results[id] = { failures: ['FILE NOT FOUND'], structuralPass: false };
    continue;
  }
  const code = fs.readFileSync(filePath, 'utf8');
  const checks = runChecks(code);
  results[id] = checks;
  for (const f of checks.failures) {
    failureFrequency[f] = (failureFrequency[f] || 0) + 1;
  }
}

// Print summary
console.log('=== FAILURE FREQUENCY (across 90 files) ===');
const sortedFailures = Object.entries(failureFrequency).sort((a, b) => b[1] - a[1]);
for (const [failure, count] of sortedFailures) {
  console.log(`  ${count.toString().padStart(3)}x  ${failure}`);
}

console.log('\n=== PER-FILE DETAILS ===');
// Categorize files
const tscErrorFiles = [];
const structuralOnlyFiles = [];
const thresholdFiles = [];
const seriousFiles = [];

for (const id of needsReview) {
  const r = results[id];
  const structuralFailures = r.failures.filter(f => !f.match(/^(lines|motion|callbacks)\(/));
  const thresholdFailures = r.failures.filter(f => f.match(/^(lines|motion|callbacks)\(/));
  const isSerious = r.failures.length > 10 || r.failures.includes('FILE NOT FOUND');

  console.log(`\n${id}:`);
  console.log(`  Lines: ${r.lineCount || 'N/A'}, Motion: ${r.motionCount || 'N/A'}, Callbacks: ${r.useCallbackCount || 'N/A'}`);
  console.log(`  Failures (${r.failures.length}): ${r.failures.join(', ')}`);

  if (r.failures.length > 10) {
    seriousFiles.push(id);
  } else if (thresholdFailures.length > 0 && structuralFailures.length <= 3) {
    thresholdFiles.push(id);
  } else if (structuralFailures.length > 0 && structuralFailures.length <= 5) {
    structuralOnlyFiles.push(id);
  } else {
    seriousFiles.push(id);
  }
}

console.log('\n=== CATEGORIZATION ===');
console.log(`\nManually fixable (1-5 structural failures, no threshold issues): ${structuralOnlyFiles.length}`);
structuralOnlyFiles.forEach(f => console.log(`  ${f}`));

console.log(`\nThreshold issues (lines/motion/callbacks below min, few structural): ${thresholdFiles.length}`);
thresholdFiles.forEach(f => console.log(`  ${f}`));

console.log(`\nSerious offenders (>10 failures or FILE NOT FOUND): ${seriousFiles.length}`);
seriousFiles.forEach(f => console.log(`  ${f}`));

// Output JSON for easy processing
const outputPath = path.join(__dirname, 'diagnose-results.json');
fs.writeFileSync(outputPath, JSON.stringify({ results, failureFrequency, structuralOnlyFiles, thresholdFiles, seriousFiles }, null, 2));
console.log(`\nDetailed results saved to: ${outputPath}`);
