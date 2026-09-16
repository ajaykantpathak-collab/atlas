import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_comp_ch91 The Noticeboard (informal letter + notice).
 * Nodes: c10_comp_cbse_91_001 (informal letter), 91_002 (notice). */
export const c10_comp_ch91: SimDef = {
    id: 'v3_c10_comp_ch91',
    title: 'The Noticeboard',
    subtitle: 'Two formats, opposite registers — warmth inside a letter to a friend, cold precision inside a boxed notice',
    classLevel: 10, subject: 'english-composition', topic: 'Informal letter and notice writing',
    chapters: ['c10_comp_ch91'],
    nodeIds: ['c10_comp_cbse_91_001', 'c10_comp_cbse_91_002'],
    emoji: '📌', theme: { bg: 'from-slate-900 to-lime-950', accent: 'lime', scene: 'senior' },

    scenario: {
        role: 'the school secretary who writes a letter to a cousin and a notice for the whole school on the same desk',
        intro: 'Same hand, two contracts: the informal letter must SOUND like a person, the notice must READ like an institution. Mix them and both lose marks.',
        goal: 'Keep the informal skeleton light and warm; keep the notice boxed, third-person, and under 50 words.',
    },
    discovery: {
        question: 'A letter to your best friend ends "Yours faithfully." What is off?',
        options: [
            'The pair — personal relationships take Yours lovingly/affectionately',
            'Nothing — faithfully is always correct',
            'It should end with "Yours truly"',
            'Letters to friends need no sign-off',
        ],
        answer: 'The pair — personal relationships take Yours lovingly/affectionately',
        hook: 'The subscription is relationship-indexed — faithfully belongs to strangers and officials, not friends.',
    },
    teaching: [
        { title: 'The lighter skeleton', text: 'Informal: address, date, Dear ___, warm body, loving sign-off. No receiver block, no subject line.', emoji: '💌', bgColor: 'from-lime-500 to-green-600' },
        { title: 'The box', text: 'Notice: ORG NAME / NOTICE / date / heading / 4W body / signature — third person, ≤50 words, inside a literal box.', emoji: '📋', bgColor: 'from-green-500 to-emerald-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_comp_cbse_91_001', title: 'Sound like a person',
          scaffold: {
            problem: 'Rewrite this robot-opener for a letter to your cousin: "I am writing to apprise you of my recent academic achievement."',
            steps: [
                { text: 'The test: read it aloud — does it sound like a person talking?' },
                { text: 'Contractions are ALLOWED here — that is the informal privilege.' },
                { text: 'Lead with the feeling, not the announcement.', faded: true },
                { text: '"You will never guess — I topped the class!"', faded: true },
                { text: 'You: share news of winning a prize → "___"', blankAnswer: 'Guess what! I won first prize!' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_comp_cbse_91_002', title: 'Strip the notice',
          dissect: { specimen: 'a defective school notice',
          spots: [
            { id: 's1', label: 'header', prompt: 'Correct header order for a notice?', answer: 'organization name → NOTICE → date → heading', options: ['organization name → NOTICE → date → heading', 'heading → NOTICE → date → org name', 'NOTICE → org name → heading → date', 'date → org name → NOTICE → heading'] },
            { id: 's2', label: 'person', prompt: '"I am happy to inform you all that…" — what is the register violation?', answer: 'first person — notices announce in third person; the institution speaks, not the writer', options: ['first person — notices announce in third person; the institution speaks, not the writer', 'too many words only', 'happy is an emotion word', 'inform has wrong tense'] },
            { id: 's3', label: 'limit', prompt: 'The body is 68 words. What is the legal limit and what gets cut first?', answer: '50 words — cut enthusiasm-performance first (very exciting, definitely, fun), keep the 4W facts', options: ['50 words — cut enthusiasm-performance first (very exciting, definitely, fun), keep the 4W facts', '100 words — trim anywhere', '30 words — drop the venue', 'no limit — completeness matters more'] },
          ] } },
        { type: 'case', nodeId: 'c10_comp_cbse_91_001', title: 'Warmth or stiffness?',
          caseStudy: {
            intro: 'Informal letters are marked on sounding human. Pick the line a friend would actually write.',
            decisions: [
              { prompt: 'Sharing exam results with your grandmother:', options: [
                  { text: 'Nani, I did it — 92%! Your ladoos worked better than any tuition.', outcome: 'Correct — voice, warmth, a specific shared detail. This is what "informal register" pays for.' },
                  { text: 'I am pleased to inform you that I have secured 92% in the examinations.', outcome: 'Formal stiffness in a personal letter — technically correct, emotionally dead, marked down for register mismatch.', reveals: 'formal-bleed' },
                ] },
              { prompt: 'Does an informal letter need a subject line?', options: [
                  { text: 'No — subjects belong to formal/business formats', outcome: 'Correct — the informal skeleton is lighter by design.' },
                  { text: 'Yes — every letter needs a subject', outcome: 'That is the formal skeleton bleeding over — two formats, two checklists.', reveals: 'skeleton-merge' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_comp_cbse_91_002', title: 'Stack the notice header',
          build: {
            prompt: 'Order the notice header blocks:',
            blocks: ['heading', 'date', 'NOTICE', 'organization name'],
            answer: 'organization name, NOTICE, date, heading',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_comp_cbse_91_001', difficulty: 'foundation',
          question: 'Sign-off for a letter to your cousin:',
          options: [
              { text: 'Yours lovingly' },
              { text: 'Yours faithfully', reveals: 'pair-universal' },
              { text: 'Yours sincerely', reveals: 'pair-universal' },
          ],
          answer: 'Yours lovingly',
          remediations: {
              'pair-universal': { steps: ['The subscription is relationship-indexed: family/friends → lovingly/affectionately; named professionals → sincerely; unknown recipients → faithfully.', 'One pair does not fit all — match the sign-off to who is reading.'] },
          },
          hint: 'Who is reading — a stranger, a professional, or family?',
          misconception: 'students memorize one sign-off pair and apply it universally' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_91_002', difficulty: 'standard',
          question: 'Which body sentence belongs in a notice?',
          options: [
              { text: 'Interested students may register with the undersigned by 10 March.' },
              { text: 'You should totally come, it will be amazing!', reveals: 'notice-persuasion' },
              { text: 'I am happy to inform everyone about the event.', reveals: 'first-person' },
          ],
          answer: 'Interested students may register with the undersigned by 10 March.',
          remediations: {
              'notice-persuasion': { steps: ['Notices inform; they never persuade or perform enthusiasm.', 'Third person + action + deadline + contact = the notice sentence formula.'] },
              'first-person': { steps: ['The institution speaks, not the writer — no "I" inside a notice.', 'Convert "I am happy to inform" to "All students are informed" or just state the fact.'] },
          },
          hint: 'Inform, don\'t invite — and the institution speaks, not you.',
          misconception: 'students write notices as personal invitations — enthusiasm is a register violation' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_91_002', difficulty: 'advanced',
          question: 'A 68-word notice reads: "I am happy to inform you all that we are having a very exciting annual day on 15 March at 10 am in the auditorium and everyone should come!!!" — count the violations.',
          options: [
              { text: 'first person, exclamations, over-limit, missing org name/date/heading/contact — nearly everything' },
              { text: 'only the word limit', reveals: 'limit-only' },
              { text: 'only the first person', reveals: 'person-only' },
          ],
          answer: 'first person, exclamations, over-limit, missing org name/date/heading/contact — nearly everything',
          remediations: {
              'limit-only': { steps: ['Word count is one violation among many — audit register (person, exclamations) AND skeleton (header blocks, contact) too.', 'A compliant notice is boring on purpose: facts, third person, ≤50 words.'] },
              'person-only': { steps: ['The "I" is just the start — look at what else the sentence performs: excitement, invitation, no issuing authority.', 'Audit systematically: skeleton top-down, then register word-by-word.'] },
          },
          hint: 'Audit the skeleton AND the register — not just the word count.',
          misconception: 'students spot the limit but not the register violations — notices need systematic audit' },
        { type: 'sort', nodeId: 'c10_comp_cbse_91_001', difficulty: 'foundation',
          question: 'Which register — informal letter or notice?',
          sortItems: [
              { id: 'a', label: 'Guess what happened today!', emoji: '🎉', correctBin: 'letter' },
              { id: 'b', label: 'All students are informed that…', emoji: '📢', correctBin: 'notice' },
              { id: 'c', label: 'Hope you are doing well, Chintu.', emoji: '💛', correctBin: 'letter' },
              { id: 'd', label: 'Entries close on 12 March.', emoji: '📅', correctBin: 'notice' },
              { id: 'e', label: 'Write back soon, okay?', emoji: '✉️', correctBin: 'letter' },
              { id: 'f', label: 'The undersigned may be contacted.', emoji: '🖋️', correctBin: 'notice' },
          ],
          bins: [
              { id: 'letter', label: 'INFORMAL LETTER', color: '#22c55e' },
              { id: 'notice', label: 'NOTICE', color: '#0ea5e9' },
          ],
          hint: 'Sounds like speech → letter. Sounds like an institution → notice.',
          misconception: 'students cannot keep the two registers separate — the same hand writes both contracts' },
        { type: 'subpart', nodeId: 'c10_comp_cbse_91_002', difficulty: 'advanced',
          question: 'Draft the body of a notice: inter-school debate, 22 March, 11 am, main hall, register with Mrs Rao by 18 March.',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'Sentence 1 must deliver…',
                answer: 'what + when + where — the event facts',
                options: ['what + when + where — the event facts', 'an invitation to feel excited', 'the history of the debate'],
                hint: 'Notices lead with the 4W facts, nothing else.',
                misconception: 'leads with invitation-tone instead of facts' },
              { id: 'b', prompt: 'The action line tells readers…',
                answer: 'how to register + deadline + whom to contact',
                options: ['how to register + deadline + whom to contact', 'why they should attend', 'who is judging'],
                hint: 'Every notice ends with the action channel.',
                misconception: 'forgets the contact/deadline line' },
              { id: 'c', prompt: 'Roughly how many words is legal?',
                answer: 'under 50',
                options: ['under 50', 'under 100', 'no limit'],
                hint: 'Fifty. Count them.',
                misconception: 'treats the limit as advisory' },
          ] },
    ],

    reflect: { prompts: ['Read your informal letter aloud — does it sound like you?', 'What makes a notice boring on purpose?'] },
    successLine: 'Two contracts, one pen — you switch registers like a professional secretary.',
    tryAgainLine: 'Wrong register again? Ask: am I a friend or an institution right now?',
};
