import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c7_comp_ch85 The Bulletin Board (notice + informal letter with purpose).
 * Nodes: c7_comp_cbse_85_001, 85_002. */
export const c7_comp_ch85: SimDef = {
    id: 'v3_c7_comp_ch85',
    title: 'The Bulletin Board',
    subtitle: 'The notice speaks for the school; the letter speaks like you — two contracts, one desk',
    classLevel: 7, subject: 'english-composition', topic: 'Notices and purpose-driven informal letters',
    chapters: ['c7_comp_ch85'],
    nodeIds: ['c7_comp_cbse_85_001', 'c7_comp_cbse_85_002'],
    emoji: '📌', theme: { bg: 'from-slate-900 to-lime-950', accent: 'lime', scene: 'junior' },

    scenario: {
        role: 'the class monitor who writes the notice AND the letter to a friend on the same afternoon',
        intro: 'A notice is a clipped announcement in a box — third person, 4W facts, no "I". A letter to a friend is the opposite — it must sound like you.',
        goal: 'Draft a compliant boxed notice and a warm letter that shares news, asks back, and looks forward.',
    },
    discovery: {
        question: 'Which belongs in a notice: "You should all come and have fun!" or "Interested students may register with Mrs Das by Friday"?',
        options: [
            'The second — third person, action + deadline + contact',
            'The first — notices should be exciting',
            'Both — a notice can be warm too',
            'Neither — notices only have a heading',
        ],
        answer: 'The second — third person, action + deadline + contact',
        hook: 'Notices inform; they never invite or excite. The institution speaks, not you.',
    },
    teaching: [
        { title: 'The box and the stack', text: 'ORG NAME / NOTICE / date / heading, then a clipped body answering What-When-Where-Whom, then signature + designation.', emoji: '📋', bgColor: 'from-lime-500 to-green-600' },
        { title: 'The three jobs of a letter body', text: 'Share your news, ask about them, close looking forward — invite, plan, or write-back.', emoji: '✉️', bgColor: 'from-green-500 to-emerald-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c7_comp_cbse_85_001', title: 'Stack the notice',
          scaffold: {
            problem: 'Draft a notice: inter-class quiz, 20 May, 10 am, library; register with Mr Sen by 15 May.',
            steps: [
                { text: 'Draw the box. Header stack: SCHOOL NAME / NOTICE / date / heading.' },
                { text: 'Body in third person: "An inter-class quiz will be held on 20 May at 10 am in the library."' },
                { text: 'Contact line: "Interested students may register with Mr Sen by 15 May."', faded: true },
                { text: 'Sign: name + designation (Head Girl).', faded: true },
                { text: 'You: heading for a lost-watch notice → "___"', blankAnswer: 'Lost and Found — Wrist Watch' },
            ],
          } },
        { type: 'dissect', nodeId: 'c7_comp_cbse_85_001', title: 'Audit this notice',
          dissect: { specimen: 'a 68-word first-person notice',
          spots: [
            { id: 's1', label: 'person', prompt: '"I am happy to inform you all that we are having a very exciting annual day…" — first fault?', answer: 'first person — the institution speaks, never the writer', options: ['first person — the institution speaks, never the writer', 'the comma splice', 'annual should be capital', 'nothing wrong'] },
            { id: 's2', label: 'limit', prompt: 'It runs 68 words. The limit?', answer: 'about 50 — cut enthusiasm first, keep the 4W facts', options: ['about 50 — cut enthusiasm first, keep the 4W facts', '100 words', 'no limit', '30 words'] },
            { id: 's3', label: 'header', prompt: 'The header order?', answer: 'org name → NOTICE → date → heading', options: ['org name → NOTICE → date → heading', 'heading → NOTICE → org name', 'NOTICE → heading → date', 'date first, always'] },
          ] } },
        { type: 'case', nodeId: 'c7_comp_cbse_85_002', title: 'Postcard or letter?',
          caseStudy: {
            intro: 'A letter body does three jobs — news, questions, forward-look. Judge these drafts.',
            decisions: [
              { prompt: 'Draft A: "I went to Shimla. It was cold. I saw snow. That is all." — verdict?', options: [
                  { text: 'A postcard, not a letter — no questions, no warmth, dead close', outcome: 'Correct — reports are not letters; the reader is never spoken to.' },
                  { text: 'A fine short letter', outcome: 'It only reports — the three jobs (news, ask-back, forward-look) are all missing.', reveals: 'flat-letter' },
                ] },
              { prompt: 'Which close earns warmth marks?', options: [
                  { text: '"Write back soon — I want to hear everything!"', outcome: 'Correct — forward-looking and personal.' },
                  { text: '"This concludes my letter."', outcome: 'Formal-report close in a friendly letter — wrong register entirely.', reveals: 'formal-bleed' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c7_comp_cbse_85_002', title: 'Assemble the warm body',
          build: {
            prompt: 'Order the three letter-body jobs:',
            blocks: ['questions about them', 'your news', 'a forward look (invite/plan/write-back)'],
            answer: 'your news, questions about them, a forward look (invite/plan/write-back)',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c7_comp_cbse_85_001', difficulty: 'foundation',
          question: 'Where does the school\'s name go in a notice?',
          options: [
              { text: 'At the very top, above NOTICE — the issuing authority leads' },
              { text: 'At the bottom with the signature', reveals: 'authority-bottom' },
              { text: 'In the heading', reveals: 'authority-misplace' },
          ],
          answer: 'At the very top, above NOTICE — the issuing authority leads',
          remediations: {
              'authority-bottom': { steps: ['The signature block holds the writer\'s name+designation — the org name leads the whole document.', 'Authority IS the format: org → NOTICE → date → heading.'] },
              'authority-misplace': { steps: ['The heading names the EVENT; the org name names WHO is announcing. Separate lines, org first.'] },
          },
          hint: 'Who is announcing? That name leads.',
          misconception: 'students treat the org name like a signature instead of the issuing authority' },
        { type: 'mcq', nodeId: 'c7_comp_cbse_85_001', difficulty: 'standard',
          question: '"NOTICE — Hi friends! We are having a super fun book fair next week, please come all!!!" — count the violations.',
          options: [
              { text: 'First person, exclamations, no org name/date/heading/contact, invitation-tone — nearly everything' },
              { text: 'Only the missing date', reveals: 'single-fault' },
              { text: 'Only the first person', reveals: 'single-fault' },
          ],
          answer: 'First person, exclamations, no org name/date/heading/contact, invitation-tone — nearly everything',
          remediations: {
              'single-fault': { steps: ['Audit in two passes: skeleton (org, NOTICE, date, heading, contact, signature) then register (person, exclamations, limit).', 'Single-fault audits always miss half the violations.'] },
          },
          hint: 'Check the skeleton AND the register — two passes.',
          misconception: 'students spot one fault and stop — notices need systematic audit' },
        { type: 'mcq', nodeId: 'c7_comp_cbse_85_002', difficulty: 'standard',
          question: 'What three jobs does an informal letter body do?',
          options: [
              { text: 'Share your news, ask about them, close looking forward' },
              { text: 'Greet, report facts, sign off', reveals: 'flat-letter' },
              { text: 'Announce, list, conclude', reveals: 'essay-bleed' },
          ],
          answer: 'Share your news, ask about them, close looking forward',
          remediations: {
              'flat-letter': { steps: ['A body that only reports is a postcard — letters turn toward the reader.', 'The reader wants to be asked about and written back to.'] },
              'essay-bleed': { steps: ['Announce-list-conclude is essay structure — a letter is a conversation on paper.'] },
          },
          hint: 'Does the letter talk TO the reader or only ABOUT your week?',
          misconception: 'students write report-bodies — letters need reader-interaction' },
        { type: 'sort', nodeId: 'c7_comp_cbse_85_001', difficulty: 'foundation',
          question: 'Notice-legal or notice-illegal?',
          sortItems: [
              { id: 'a', label: 'All students are informed that…', emoji: '📢', correctBin: 'legal' },
              { id: 'b', label: 'You should totally come!', emoji: '🎉', correctBin: 'illegal' },
              { id: 'c', label: 'Entries close on 12 March.', emoji: '📅', correctBin: 'legal' },
              { id: 'd', label: 'I am happy to tell you…', emoji: '😊', correctBin: 'illegal' },
              { id: 'e', label: 'Contact the undersigned by Friday.', emoji: '🖋️', correctBin: 'legal' },
          ],
          bins: [
              { id: 'legal', label: 'NOTICE-LEGAL', color: '#22c55e' },
              { id: 'illegal', label: 'NOTICE-ILLEGAL', color: '#ef4444' },
          ],
          hint: 'Third person + facts = legal. I/you + excitement = illegal.',
          misconception: 'students import letter-warmth into the clipped notice register' },
        { type: 'subpart', nodeId: 'c7_comp_cbse_85_002', difficulty: 'standard',
          question: 'Letter to a friend apologizing for missing their party — build it.',
          hint: 'Warm voice, real reason, forward look.',
          misconception: 'apologizes coldly ("I regret to inform") or skips the reason',
          parts: [
              { id: 'a', prompt: 'Which apology line fits informal register?',
                answer: '"I am so sorry I missed it — I was down with fever all weekend."',
                options: ['"I am so sorry I missed it — I was down with fever all weekend."', '"I regret to inform you of my absence."', '"Couldn\'t come. Whatever."'],
                hint: 'Warm + a real reason.',
                misconception: 'formal-bleed or dismissive tone' },
              { id: 'b', prompt: 'What closes the letter forward?',
                answer: 'a make-up plan — "Let me take you out Saturday to celebrate properly"',
                options: ['a make-up plan — "Let me take you out Saturday to celebrate properly"', '"That is all for now."', '"Hope you are not angry."'],
                hint: 'The forward look repairs the miss.',
                misconception: 'ends on the apology instead of looking forward' },
          ] },
    ],

    reflect: { prompts: ['Which contract is harder — the institution\'s voice or your own on paper?', 'What does a notice NEVER do?'] },
    successLine: 'Two contracts mastered — the school speaks through you in the notice, and you sound like you in the letter.',
    tryAgainLine: 'Ask before every line: am I the institution or the friend right now?',
};
