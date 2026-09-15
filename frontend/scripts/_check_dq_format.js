// Compare diagnostic question format between existing and generated enrichment
const fs = require('fs');

function extractDQs(filepath, label, maxNodes = 5) {
  const content = fs.readFileSync(filepath, 'utf8');
  const blocks = content.split(/--- NODE \S+ ---/).slice(1);
  console.log(`\n=== ${label} (${blocks.length} nodes) ===`);
  for (let i = 0; i < Math.min(blocks.length, maxNodes); i++) {
    const m = blocks[i].match(/DIAGNOSTIC_QUESTION:\s*\n([\s\S]*?)(?=\nCOMMON_MISCONCEPTION:)/);
    if (m) {
      const dq = m[1].trim();
      const qCount = (dq.match(/^Q:/gm) || []).length;
      console.log(`  Node ${i+1}: ${qCount} question(s), ${dq.length} chars`);
      // Show first 200 chars
      console.log(`    ${dq.substring(0, 200).replace(/\n/g, ' ')}...`);
    }
  }
}

// Existing enrichment files
extractDQs('D:\\platform\\cbse_data\\enrichment\\accounts_c11_b1.marker', 'EXISTING - Accounts C11');
extractDQs('D:\\platform\\cbse_data\\enrichment\\new_c6_b1.marker', 'GENERATED - New C6 Science');
extractDQs('D:\\platform\\cbse_data\\enrichment\\new_c6_b9.marker', 'GENERATED - New C6 Social');

// Check more existing files for multi-question format
const enrichDir = 'D:\\platform\\cbse_data\\enrichment';
const existingFiles = fs.readdirSync(enrichDir).filter(f => f.endsWith('.marker') && !f.startsWith('new_') && !f.startsWith('exist_')).slice(0, 5);
for (const f of existingFiles) {
  extractDQs(`${enrichDir}\\${f}`, `EXISTING - ${f}`, 2);
}
