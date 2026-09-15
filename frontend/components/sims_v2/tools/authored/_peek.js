// Print condensed grounding for given chapter keys.
// usage: node _peek.js key1 key2 ...
const j = require('./_c6c7_digest.json');
const keys = process.argv.slice(2);
for (const k of keys) {
  const e = j[k];
  if (!e) { console.log(`\n#### ${k} -> MISSING`); continue; }
  console.log(`\n#### ${k} | ${e.titles[0].split(' · ')[0]}`);
  const d = e.digest;
  // split into node sections, take fields from first 2 sections
  const sections = d.split(/(?==== )/).slice(0, 2);
  for (const s of sections) {
    const grab = (name, max) => {
      const m = s.match(new RegExp(name + ': ([\\s\\S]*?)(?=\\n[A-Z_]+:|$)'));
      if (!m) return '';
      let t = m[1].replace(/\s+/g, ' ').trim();
      if (t.length > max) t = t.slice(0, max) + '…';
      return `\n${name}: ${t}`;
    };
    console.log(grab('DEFINITION', 260));
    console.log(grab('WALKTHROUGH', 380));
    console.log(grab('COMMON_MISCONCEPTION', 300));
    console.log(grab('COMPETENCY_QUESTION_1', 220));
    console.log(grab('COMPETENCY_QUESTION_2', 220));
  }
}
