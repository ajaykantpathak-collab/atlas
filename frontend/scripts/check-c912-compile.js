// Quick compile check for all c9_12 simulation files
// Uses tsconfig.json from frontend root
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'components', 'simulations', 'c9_12');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

console.log(`Checking ${files.length} files...`);

let errors = [];
let checked = 0;

for (const file of files) {
  const fullPath = path.join(dir, file);
  try {
    execSync(`npx tsc --noEmit --jsx react-jsx --esModuleInterop --strict --skipLibCheck --moduleResolution node --target ES2020 --module ESNext --lib ES2020,DOM,DOM.Iterable "${fullPath}"`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe',
      timeout: 30000
    });
    checked++;
    if (checked % 20 === 0) console.log(`  ${checked}/${files.length} checked...`);
  } catch (e) {
    const stderr = e.stderr ? e.stderr.toString() : '';
    const stdout = e.stdout ? e.stdout.toString() : '';
    const output = stderr + stdout;
    // Filter out module resolution errors (expected since we don't have full project context)
    const realErrors = output.split('\n').filter(l =>
      l.includes('error TS') &&
      !l.includes('TS2307') && // Cannot find module (expected for relative imports)
      !l.includes('TS6053')    // File not found
    );
    if (realErrors.length > 0) {
      errors.push({ file, errors: realErrors });
      console.log(`  FAIL: ${file}`);
      realErrors.forEach(e => console.log(`    ${e.trim()}`));
    }
    checked++;
  }
}

console.log(`\n=== RESULTS ===`);
console.log(`Checked: ${checked}/${files.length}`);
console.log(`Passed: ${checked - errors.length}`);
console.log(`Failed: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nFailed files:`);
  errors.forEach(e => console.log(`  - ${e.file}`));
}
