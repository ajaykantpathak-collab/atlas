const fs = require('fs');
const g = require('D:/platform/frontend/components/sims_v2/tools/authored/_c11_ground.json');
const prefixes = process.argv[2].split(',');
for (const k of Object.keys(g)) {
  if (prefixes.some(p => k.startsWith(p))) {
    console.log('=== ' + k + ' | ' + g[k].title);
    if (g[k].def) console.log('D: ' + g[k].def.slice(0, 200));
    if (g[k].mis) console.log('M: ' + g[k].mis.slice(0, 160));
  }
}
