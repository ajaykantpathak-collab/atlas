import { inferTemplateType } from '../lib/c68/SimulationRegistry';
import fs from 'fs';
import path from 'path';

const subjects: Record<string, string> = {
  physics: 'physics', chem: 'chem', bio: 'bio', maths: 'maths',
  geo: 'geo', cs: 'cs', histciv: 'histciv',
};

const allNodes: Array<{nodeId: string; title: string; subject: string}> = [];
for (const [subj, dir] of Object.entries(subjects)) {
  const enrDir = path.join('D:\\cisce', dir, 'enrichment');
  if (!fs.existsSync(enrDir)) continue;
  for (const cls of [6, 7, 8]) {
    const files = fs.readdirSync(enrDir).filter(f => f.startsWith('c' + cls + '_') && f.endsWith('.marker'));
    for (const f of files) {
      const content = fs.readFileSync(path.join(enrDir, f), 'utf8');
      const regex = /--- NODE (\S+) ---[\r\n]+TITLE: (.+)/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        allNodes.push({ nodeId: m[1], title: m[2].trim(), subject: subj });
      }
    }
  }
}

const cm = allNodes.filter(n => inferTemplateType({ nodeId: n.nodeId, title: n.title, subject: n.subject } as any) === 'concept-map');
console.log('concept-map (' + cm.length + ' nodes):');
cm.forEach(n => console.log('  ' + n.nodeId + ': ' + n.title.substring(0, 70)));
