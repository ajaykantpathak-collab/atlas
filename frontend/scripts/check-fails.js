const fs = require('fs');
const dir = 'components/simulations/c6_8/';

// Check MagnetExplorer tabs
const c1 = fs.readFileSync(dir + 'MagnetExplorerSimulation.tsx', 'utf8');
const tm = c1.match(/tab\s*===?\s*['"][^'"]+['"]/g) || [];
console.log('Magnet tabs:', JSON.stringify(tm));
const tabState = c1.match(/useState<[^>]*>/g) || [];
console.log('Magnet useState types:', JSON.stringify(tabState.slice(0, 5)));

// Check EnergyLever hooks
const c2 = fs.readFileSync(dir + 'EnergyLeverSimulation.tsx', 'utf8');
const h2 = c2.match(/use[A-Z]\w+/g) || [];
console.log('Energy hooks:', JSON.stringify([...new Set(h2)]));

// Check ChemEq hooks
const c3 = fs.readFileSync(dir + 'ChemicalEquationBalancerSimulation.tsx', 'utf8');
const h3 = c3.match(/use[A-Z]\w+/g) || [];
console.log('ChemEq hooks:', JSON.stringify([...new Set(h3)]));

// Check Algebra hooks
const c4 = fs.readFileSync(dir + 'AlgebraSolverSimulation.tsx', 'utf8');
const h4 = c4.match(/use[A-Z]\w+/g) || [];
console.log('Algebra hooks:', JSON.stringify([...new Set(h4)]));

// Check TextExplorer sliders
const c5 = fs.readFileSync(dir + 'TextExplorerSimulation.tsx', 'utf8');
console.log('TextExplorer has range:', c5.includes('range'));
console.log('TextExplorer has input:', c5.includes('input'));
