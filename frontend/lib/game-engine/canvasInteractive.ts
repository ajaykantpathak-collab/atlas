// Shared heuristic: does this challenge render as a canvas interaction (DOM answer buttons hidden)?
// Consumed by GameRenderer (UI) and lib/game-engine/Renderer (canvas) so both agree on who owns answering.
function isCanvasInteractive(question: string, subject: string): boolean {
  const q = question.toLowerCase();
  // Addition with small numbers (drag-to-count)
  const addMatch = q.match(/(\d+)\s*\+\s*(\d+)/);
  if (addMatch) {
    const a = parseInt(addMatch[1]);
    const b = parseInt(addMatch[2]);
    if (a + b <= 20) return true;
  }
  // "X items and Y more" without explicit +
  const moreMatch = q.match(/(\d+)\s+\w+.*?\s+(\d+)\s+more/);
  if (moreMatch && subject === 'maths') {
    const a = parseInt(moreMatch[1]);
    const b = parseInt(moreMatch[2]);
    if (a + b <= 20) return true;
  }
  // Subtraction with small numbers
  const subMatch = q.match(/(\d+)\s*-\s*(\d+)/);
  if (subMatch) {
    const a = parseInt(subMatch[1]);
    const b = parseInt(subMatch[2]);
    if (a <= 20 && b <= 20) return true;
  }
  // "X items and gives Y away" / "X items and Y left"
  const giveMatch = q.match(/(\d+)\s+\w+.*?(\d+)\s+(?:away|to|left)/);
  if (giveMatch && subject === 'maths') {
    const a = parseInt(giveMatch[1]);
    const b = parseInt(giveMatch[2]);
    if (a <= 20 && b <= 20) return true;
  }
  // Number line
  if (q.includes('number line') || q.includes('hop')) return true;
  // Fractions (pizza)
  if (q.includes('fraction') || q.includes('half') || q.includes('quarter') || q.includes('third')) return true;
  // Body parts
  if (q.includes('body') || q.includes('eye') || q.includes('ear') || q.includes('nose') || q.includes('mouth') || q.includes('hand') || q.includes('leg') || q.includes('heart') || q.includes('brain') || q.includes('bone') || q.includes('muscle') || q.includes('skin') || q.includes('teeth')) return true;
  // Angles
  if (q.includes('angle') && (q.includes('90') || q.includes('right') || q.includes('acute') || q.includes('obtuse') || q.includes('straight') || q.includes('reflex'))) return true;
  // Perimeter
  if (q.includes('perimeter') || (q.includes('fencing') && q.includes('around'))) return true;
  // Area
  if (q.includes('area') && (q.includes('rectangle') || q.includes('square') || q.includes('length'))) return true;
  // Percentages
  if (q.includes('percent') || q.includes('%')) return true;
  // Integers
  if (q.includes('integer') || q.includes('negative') || q.includes('-5') || q.includes('-1') || q.includes('left of zero')) return true;
  // 3D shapes
  if (q.includes('3d') || q.includes('cylinder') || q.includes('cube') || q.includes('sphere') || q.includes('cone') || q.includes('pyramid') || q.includes('faces') || q.includes('edges') || q.includes('vertices')) return true;
  // Symmetry
  if (q.includes('symmetry') || q.includes('symmetrical') || q.includes('reflection')) return true;
  // Decimals
  if (q.includes('decimal') || q.match(/\d+\.\d+/)) return true;
  // Prime / composite
  if (q.includes('prime') || q.includes('composite') || q.includes('factor')) return true;
  // HCF / LCM
  if (q.includes('hcf') || q.includes('lcm') || q.includes('greatest common') || q.includes('least common')) return true;
  // Patterns
  if (q.includes('pattern') || q.includes('sequence') || q.includes('next two') || q.includes('progressive')) return true;
  // Roman numerals
  if (q.includes('roman') || q.match(/\b[IVXLCDM]+\b/)) return true;
  // Science topics — all interactive with option cards
  if (q.includes('physical change') || q.includes('chemical change') || q.includes('melting') || q.includes('burning') || q.includes('rusting')) return true;
  if (q.includes('circulat') || q.includes('blood') || q.includes('artery') || q.includes('vein') || q.includes('heart')) return true;
  if (q.includes('crop') || q.includes('kharif') || q.includes('rabi') || q.includes('agriculture') || q.includes('farming')) return true;
  if (q.includes('earthquake') || q.includes('volcano') || q.includes('flood') || q.includes('drought') || q.includes('disaster') || q.includes('tsunami')) return true;
  if (q.includes('mixture') || q.includes('solution') || q.includes('suspension') || q.includes('colloid') || q.includes('filtration') || q.includes('evaporation') || q.includes('separation')) return true;
  if (q.includes('abacus') || q.includes('babbage') || q.includes('eniac') || q.includes('vacuum') || q.includes('analytical') || q.includes('generation') || q.includes('computer') || q.includes('calculating')) return true;
  if (q.includes('environment') || q.includes('biotic') || q.includes('abiotic') || q.includes('renewable') || q.includes('natural resource')) return true;
  if (q.includes('transport') || q.includes('airway') || q.includes('railway') || q.includes('roadway')) return true;
  if (q.includes('air') || q.includes('nitrogen') || q.includes('oxygen') || q.includes('gas') || q.includes('breeze') || q.includes('wind')) return true;
  // Sim framework: algebra, geometry construction, graphing
  if (q.includes('algebra') || q.includes('equation') || q.includes('solve for x') || q.match(/\bx\s*[+\-]\s*\d+\s*=\s*\d+/) || q.match(/\d+\s*[+\-]\s*x\s*=\s*\d+/)) return true;
  if (q.includes('construct') || q.includes('protractor') || q.includes('draw angle') || q.includes('draw a triangle') || q.includes('construct a triangle')) return true;
  if (q.includes('graph') || q.includes('coordinate') || q.includes('plot') || q.includes('cartesian') || q.includes('ordered pair') || q.match(/\(\s*-?\d+\s*,\s*-?\d+\s*\)/)) return true;
  if (q.includes('photosynthesis') || q.includes('germination') || q.includes('seed')) return true;
  return false;
}

export { isCanvasInteractive };

