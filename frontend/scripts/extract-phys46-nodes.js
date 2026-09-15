// Extract node IDs with comments from all 46 physics sims
const fs = require('fs');
const path = require('path');

const simDir = 'D:/platform/frontend/components/simulations/c6_12';
const files = fs.readdirSync(simDir).filter(f => f.match(/C\d+_Physics\w+Sim\.tsx$/));

const results = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(simDir, file), 'utf8');
  const simName = file.replace('.tsx', '');
  const cls = parseInt(simName.match(/C(\d+)_/)[1]);
  
  // Extract NODE_XXX = 'id' // comment
  const nodeRegex = /NODE_\w+\s*=\s*['"]([^'"]+)['"]\s*\/\/\s*(.*)/g;
  const nodes = [];
  let match;
  while ((match = nodeRegex.exec(content)) !== null) {
    nodes.push({ id: match[1], comment: match[2].trim() });
  }
  
  // If no comments, try without comment
  if (nodes.length === 0) {
    const nodeRegex2 = /NODE_\w+\s*=\s*['"]([^'"]+)['"]/g;
    while ((match = nodeRegex2.exec(content)) !== null) {
      nodes.push({ id: match[1], comment: '' });
    }
  }
  
  results.push({ sim: simName, class: cls, nodes });
}

fs.writeFileSync('D:/platform/frontend/scripts/phys46-nodes-with-comments.json', JSON.stringify(results, null, 2));
console.log(`Extracted nodes from ${results.length} sims`);
console.log(`Total nodes: ${results.reduce((s, r) => s + r.nodes.length, 0)}`);
