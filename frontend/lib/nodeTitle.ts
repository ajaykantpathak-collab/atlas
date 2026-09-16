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
};

export function subjectName(subj: string): string {
  return SUBJECT_NAMES[subj.toLowerCase()] ?? subj.replace(/_/g, ' ');
}

export function friendlyNodeTitle(nodeId: string): string {
  if (!nodeId) return '';
  // shapes: c{cls}_{subj}[_cbse]_ch{NN}_{NNN} | c{cls}_{subj}_{NN}_{NNN}
  const m = nodeId.match(
    /^c(\d{1,2})_([a-z]+?)(?:_cbse)?_ch(\d{1,2})(?:_(\d{1,3}))?$/i,
  );
  if (m) {
    const [, cls, subj, ch, nn] = m;
    const bits = [`Class ${Number(cls)}`, subjectName(subj), `Chapter ${Number(ch)}`];
    if (nn) bits.push(`Topic ${Number(nn)}`);
    return bits.join(' · ');
  }
  // fallback: humanize underscores
  const cleaned = nodeId.replace(/_/g, ' ').trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
