/**
 * friendlyNodeTitle — the ONLY sanctioned way to show a node reference in
 * the UI. Raw ids (c6_biology_ch06_001) must never reach the screen.
 *
 *   c6_biology_ch06_001  →  "Class 6 · Biology · Chapter 6 · Topic 1"
 *   c10_phy_cbse_03_012  →  "Class 10 · Physics · Chapter 3 · Topic 12"
 *
 * Falls back to the input only when the id matches no known shape.
 */
const SUBJECT_NAMES: Record<string, string> = {
  bio: 'Biology', biology: 'Biology',
  chem: 'Chemistry', chemistry: 'Chemistry',
  phy: 'Physics', phys: 'Physics', physics: 'Physics',
  sci: 'Science', science: 'Science',
  maths: 'Mathematics', math: 'Mathematics', mathsc: 'Mathematics',
  appmath: 'Applied Mathematics', acc: 'Accounts', accountancy: 'Accounts',
  eco: 'Economics', economics: 'Economics',
  bs: 'Business Studies', bst: 'Business Studies',
  hist: 'History', histciv: 'History & Civics', history: 'History',
  civ: 'Civics', geo: 'Geography', geography: 'Geography',
  pol: 'Political Science', polsci: 'Political Science',
  psy: 'Psychology', psychology: 'Psychology',
  soc: 'Social Science', social: 'Social Science', sociology: 'Sociology',
  eng: 'English', english: 'English', hin: 'Hindi', hindi: 'Hindi',
  sans: 'Sanskrit', urd: 'Urdu', tam: 'Tamil', tel: 'Telugu',
  mar: 'Marathi', ben: 'Bengali',
  cs: 'Computer Science', ip: 'Informatics Practices', comp: 'Computer Science',
  evs: 'EVS', massmedia: 'Mass Media', hs: 'Home Science',
  legal: 'Legal Studies', entrepreneurship: 'Entrepreneurship',
  physical: 'Physical Education',
  // corpus subject slugs seen in node ids beyond the two-letter forms
  engl: 'English', gram: 'Grammar',
  // senior-corpus codes surfaced by the class-aware mastery map
  biotech: 'Biotechnology', stat: 'Statistics',
  ca: 'Computerised Accounting', ps: 'Physical Education',
};

export function subjectName(subj: string): string {
  const s = subj.toLowerCase();
  if (SUBJECT_NAMES[s]) return SUBJECT_NAMES[s];
  // multi-segment slugs ("hin_al") — try the leading language code
  const head = s.split('_')[0];
  if (SUBJECT_NAMES[head]) return SUBJECT_NAMES[head];
  return subj.replace(/_/g, ' ');
}

export function friendlyNodeTitle(nodeId: string): string {
  if (!nodeId) return '';
  // shape A: c{cls}_{subj}_ch{NN}_{NNN} | c{cls}_{subj}_{NN}_{NNN}
  const a = nodeId.match(
    /^c(\d{1,2})_([a-z]+?)(?:_cbse)?_ch(\d{1,2})(?:_(\d{1,3}))?$/i,
  );
  if (a) {
    const [, cls, subj, ch, nn] = a;
    const bits = [`Class ${Number(cls)}`, subjectName(subj), `Chapter ${Number(ch)}`];
    if (nn) bits.push(`Topic ${Number(nn)}`);
    return bits.join(' · ');
  }
  // shape B (galaxy/corpus ids): c{cls}_{subj}[_cbse]_{ch}_{topic},
  // subject may itself carry segments ("hin_al") — e.g.
  // c10_bio_cbse_01_001 → "Class 10 · Biology · Chapter 1 · Topic 1"
  const b = nodeId.match(
    /^c(\d{1,2})_([a-z]+(?:_[a-z]+)*?)(?:_cbse)?_(\d{1,3})_(\d{1,3})$/i,
  );
  if (b) {
    const [, cls, subj, ch, nn] = b;
    return [`Class ${Number(cls)}`, subjectName(subj), `Chapter ${Number(ch)}`, `Topic ${Number(nn)}`].join(' · ');
  }
  // fallback: humanize underscores
  const cleaned = nodeId.replace(/_/g, ' ').trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
