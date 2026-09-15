const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/platform/frontend/scripts/cbse-chem44-misconceptions.json', 'utf8'));
let output = '';
for (const [simId, miscs] of Object.entries(data)) {
  output += `// === ${simId} ===\n`;
  output += `const MISCONCEPTIONS_CHECKLIST: Misconception[] = [\n`;
  for (const m of miscs) {
    output += `  {\n`;
    output += `    id: ${JSON.stringify(m.id)},\n`;
    output += `    title: ${JSON.stringify(m.title)},\n`;
    output += `    description: ${JSON.stringify(m.description)},\n`;
    output += `    correction: ${JSON.stringify(m.correction)},\n`;
    output += `  },\n`;
  }
  output += `];\n\n`;
}
fs.writeFileSync('D:/platform/frontend/scripts/chem44-misc-constants.ts', output);
console.log('Written. Sims: ' + Object.keys(data).length);
