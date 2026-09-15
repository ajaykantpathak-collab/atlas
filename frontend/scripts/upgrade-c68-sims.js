// Upgrade C6-8 sims: add localStorage + adaptive difficulty
// This modifies existing files to add missing features
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'components', 'simulations', 'c6_8');

const filesToUpgrade = [
  'ArithmeticLabSimulation',
  'CivilizationExplorerSimulation',
  'ClimateResourceExplorerSimulation',
  'CodeEditorSimulation',
  'CommercialMathsSimulation',
  'ComputerHardwareExplorerSimulation',
  'ConceptMapSimulation',
  'ExponentLabSimulation',
  'FlowchartBuilderSimulation',
  'FractionDecimalLabSimulation',
  'GeometryConstructorSimulation',
  'GovernanceExplorerSimulation',
  'GraphPlotterSimulation',
  'LandformExplorerSimulation',
  'MapExplorerSimulation',
  'MovementExplorerSimulation',
  'NetworkingCloudExplorerSimulation',
  'NumberLineSimulation',
  'NumberSystemConverterSimulation',
  'ProbabilityLabSimulation',
  'RatioProportionSimulation',
  'SetBuilderSimulation',
  'SoftwareAppsLabSimulation',
  'TextExplorerSimulation',
  'TimelineBuilderSimulation',
];

const STATE_BLOCK = `  const [difficultyLevel, setDifficultyLevel] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [retryCount, setRetryCount] = useState<number>(0);
  const [showVariant, setShowVariant] = useState<boolean>(false);
  const [savedMastery, setSavedMastery] = useState<{ score: number; date: string; difficulty: string } | null>(null);
  const [nextReviewDate, setNextReviewDate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(\`c68_mastery_\${nodeId}\`);
      if (stored) { try { setSavedMastery(JSON.parse(stored)); } catch (e) { /* ignore */ } }
      const review = localStorage.getItem(\`c68_review_\${nodeId}\`);
      if (review) setNextReviewDate(review);
    }
  }, [nodeId]);`;

const LOCALSTORAGE_SAVE = `    if (typeof window !== 'undefined') {
      const now = new Date().toISOString();
      localStorage.setItem(\`c68_mastery_\${nodeId}\`, JSON.stringify({ score, date: now, difficulty: difficultyLevel }));
      const reviewDays = score < 70 ? 3 : score < 90 ? 7 : 21;
      const reviewDate = new Date(Date.now() + reviewDays * 86400000).toISOString().split('T')[0];
      localStorage.setItem(\`c68_review_\${nodeId}\`, reviewDate);
      setNextReviewDate(reviewDate);
    }`;

const DIFFICULTY_UI = `          <div className="flex items-center gap-3">
            <span className={\`text-xs px-2 py-1 rounded border font-semibold \${difficultyLevel === 'foundation' ? 'bg-amber-50 text-amber-600 border-amber-200' : difficultyLevel === 'standard' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-purple-50 text-purple-600 border-purple-200'}\`}>
              Level: {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
            </span>
            {nextReviewDate && <span className="text-xs text-slate-400">📅 Next review: <strong>{nextReviewDate}</strong></span>}
            {savedMastery && <span className="text-xs text-slate-400">Best: {savedMastery.score}</span>}
          </div>`;

let successCount = 0;
let failCount = 0;

for (const fileBase of filesToUpgrade) {
  const filePath = path.join(dir, `${fileBase}.tsx`);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // 1. Add state variables after challengesCompleted state
  // Pattern: const [challengesCompleted, setChallengesCompleted] = useState<boolean>(false);
  const statePattern = /const \[challengesCompleted, setChallengesCompleted\] = useState<boolean>\(false\);/;
  if (statePattern.test(content)) {
    content = content.replace(statePattern, match => match + '\n' + STATE_BLOCK);
  } else {
    console.log(`  FAIL ${fileBase}: could not find challengesCompleted state`);
    failCount++;
    continue;
  }

  // 2. Add adaptive difficulty in isCorrect block
  // Pattern: setScore((prev) => Math.min(100, prev + 5));
  // Add: if (difficultyLevel === 'foundation') setDifficultyLevel('standard');
  const correctPattern = /setScore\(\(prev\) => Math\.min\(100, prev \+ 5\)\);/;
  if (correctPattern.test(content)) {
    content = content.replace(correctPattern, match => match + '\n      if (difficultyLevel === \'foundation\') setDifficultyLevel(\'standard\');');
  }

  // 3. Add adaptive difficulty in wrong block
  // Pattern: setScore((prev) => Math.max(10, prev - 15));
  // Add: if (difficultyLevel === 'standard') setDifficultyLevel('foundation'); setShowVariant(true);
  const wrongPattern = /setScore\(\(prev\) => Math\.max\(10, prev - 15\)\);/;
  if (wrongPattern.test(content)) {
    content = content.replace(wrongPattern, match => match + '\n      if (difficultyLevel === \'standard\') setDifficultyLevel(\'foundation\');\n      setShowVariant(true);');
  }

  // 4. Add localStorage save in handleFinalSubmit
  // Pattern: const handleFinalSubmit = () => {\n    setIsSubmitted(true);
  const submitPattern = /const handleFinalSubmit = \(\) => \{\n    setIsSubmitted\(true\);/;
  if (submitPattern.test(content)) {
    content = content.replace(submitPattern, match => match + '\n' + LOCALSTORAGE_SAVE);
  } else {
    console.log(`  WARN ${fileBase}: could not find handleFinalSubmit pattern`);
  }

  // 5. Add difficulty UI before Mastery: text
  // Pattern: <span className="text-xs text-slate-400">Mastery: {masteryCriteria}</span>
  const masteryPattern = /<span className="text-xs text-slate-400">Mastery: \{masteryCriteria\}<\/span>/;
  if (masteryPattern.test(content)) {
    content = content.replace(masteryPattern, DIFFICULTY_UI + '\n          <span className="text-xs text-slate-400">Mastery: {masteryCriteria}</span>');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  OK   ${fileBase}`);
    successCount++;
  } else {
    console.log(`  SKIP ${fileBase}: no changes made`);
    failCount++;
  }
}

console.log(`\n=== RESULTS ===`);
console.log(`Upgraded: ${successCount}/${filesToUpgrade.length}`);
console.log(`Failed: ${failCount}`);
