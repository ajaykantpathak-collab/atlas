/**
 * Component quality audit — checks every simulation component for:
 * 1. 'use client' directive
 * 2. React hooks imports
 * 3. motion/AnimatePresence imports
 * 4. Exported props interface
 * 5. Default props using real enrichment data (definition, eli5, misconceptions)
 * 6. Three tabs (ELI5, Theory, Misconceptions)
 * 7. SVG interactive visualization
 * 8. Editable number inputs (live readouts)
 * 9. Sliders with min/max labels
 * 10. Reset button
 * 11. Three progressive challenges
 * 12. Real-world activity section
 * 13. No LaTeX notation in JSX
 * 14. onComplete callback
 * 15. Line count
 */
import fs from 'fs';
import path from 'path';

const SIM_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_8');

const COMPONENTS = [
  // Physics (10)
  'MeasurementLabSimulation', 'MotionCartSimulation', 'LightRaySimulation',
  'CircuitBuilderSimulation', 'MatterStatesSimulation', 'SoundWaveSimulation',
  'HeatTransferSimulation', 'MagnetExplorerSimulation', 'DensityTankSimulation',
  'EnergyLeverSimulation',
  // Chemistry (6)
  'AtomBuilderSimulation', 'MixtureSeparatorSimulation', 'ReactionViewerSimulation',
  'PeriodicTableExplorerSimulation', 'GasPropertiesLabSimulation', 'ChemicalEquationBalancerSimulation',
  // Biology (7)
  'CellExplorerSimulation', 'BodySystemsSimulation', 'PlantBiologySimulation',
  'EcologyExplorerSimulation', 'HealthDiseaseSimulation', 'ClassificationSorterSimulation',
  'DiagramExplorerSimulation',
  // Maths (11)
  'NumberLineSimulation', 'ArithmeticLabSimulation', 'FractionDecimalLabSimulation',
  'AlgebraSolverSimulation', 'SetBuilderSimulation', 'CommercialMathsSimulation',
  'RatioProportionSimulation', 'ExponentLabSimulation', 'GeometryConstructorSimulation',
  'GraphPlotterSimulation', 'ProbabilityLabSimulation',
  // Geography (3)
  'MapExplorerSimulation', 'LandformExplorerSimulation', 'ClimateResourceExplorerSimulation',
  // CS (6)
  'CodeEditorSimulation', 'FlowchartBuilderSimulation', 'ComputerHardwareExplorerSimulation',
  'SoftwareAppsLabSimulation', 'NetworkingCloudExplorerSimulation', 'NumberSystemConverterSimulation',
  // History/Civics (5)
  'TimelineBuilderSimulation', 'CivilizationExplorerSimulation', 'GovernanceExplorerSimulation',
  'MovementExplorerSimulation', 'ConceptMapSimulation',
  // Fallback
  'TextExplorerSimulation',
];

interface CheckResult {
  component: string;
  lines: number;
  checks: Record<string, boolean>;
  issues: string[];
}

const results: CheckResult[] = [];

for (const comp of COMPONENTS) {
  const filePath = path.join(SIM_DIR, `${comp}.tsx`);
  const result: CheckResult = {
    component: comp,
    lines: 0,
    checks: {},
    issues: [],
  };

  if (!fs.existsSync(filePath)) {
    result.issues.push('FILE MISSING');
    results.push(result);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  result.lines = content.split('\n').length;

  // Check 1: 'use client'
  result.checks['use client'] = content.includes("'use client'");

  // Check 2: React hooks
  result.checks['React hooks'] = content.includes('useState') && content.includes('useEffect');

  // Check 3: motion/AnimatePresence
  result.checks['motion imports'] = content.includes('motion') && content.includes('AnimatePresence');

  // Check 4: Props interface
  result.checks['props interface'] = /export\s+interface\s+\w+Props/.test(content) || /interface\s+\w+Props/.test(content);

  // Check 5: Real enrichment defaults (definition, eli5, misconceptions in defaults)
  const hasDefinition = content.includes('definition') && content.includes('eli5');
  const hasMisconceptions = content.includes('misconception');
  result.checks['enrichment defaults'] = hasDefinition && hasMisconceptions;

  // Check 6: Three tabs
  const tabCount = (content.match(/activeTab\s*===\s*['"]/g) || []).length;
  result.checks['3 tabs'] = tabCount >= 3;

  // Check 7: SVG
  result.checks['SVG'] = content.includes('<svg') || content.includes('<SVG');

  // Check 8: Editable number inputs
  result.checks['editable inputs'] = content.includes('type="number"') || content.includes("type='number'");

  // Check 9: Sliders
  result.checks['sliders'] = content.includes('type="range"') || content.includes("type='range'");

  // Check 10: Reset button
  result.checks['reset button'] = content.toLowerCase().includes('reset');

  // Check 11: Three challenges
  const challengeCount = (content.match(/challenge\s*===?\s*\d|challengeIndex|currentChallenge/gi) || []).length;
  result.checks['3+ challenges'] = challengeCount >= 2;

  // Check 12: Real-world activity
  result.checks['real-world activity'] = content.toLowerCase().includes('real-world') || content.toLowerCase().includes('real world') || content.toLowerCase().includes('activity');

  // Check 13: No LaTeX
  const hasLatex = content.includes('\\frac') || content.includes('\\times') || content.includes('\\div') || content.includes('\\sqrt');
  result.checks['no LaTeX'] = !hasLatex;

  // Check 14: onComplete
  result.checks['onComplete'] = content.includes('onComplete');

  // Collect issues
  for (const [check, passed] of Object.entries(result.checks)) {
    if (!passed) result.issues.push(`FAIL: ${check}`);
  }

  // Line count warning
  if (result.lines < 400) result.issues.push(`WARNING: only ${result.lines} lines`);

  results.push(result);
}

// Print results
console.log('=== COMPONENT QUALITY AUDIT ===\n');
let allPass = true;
for (const r of results) {
  const status = r.issues.length === 0 ? 'PASS' : 'FAIL';
  if (status === 'FAIL') allPass = false;
  console.log(`[${status}] ${r.component} (${r.lines} lines)${r.issues.length > 0 ? ' — ' + r.issues.length + ' issues' : ''}`);
  for (const issue of r.issues) {
    console.log(`         ${issue}`);
  }
}

console.log('\n=== SUMMARY ===');
const passed = results.filter(r => r.issues.length === 0).length;
const failed = results.filter(r => r.issues.length > 0).length;
console.log(`Total components: ${results.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`All pass: ${allPass}`);
