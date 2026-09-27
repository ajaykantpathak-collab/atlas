import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c9_comp_ch86 The Official Desk (formal letter + notice).
 * Nodes: c9_engl_cbse_86_001, 86_002, 86_003. */
export const c9_comp_ch86: SimDef = {
    id: 'v3w_c9_comp_ch86',
    title: 'The Official Desk',
    subtitle: 'The eight-block skeleton, the register rules, and the boxed 50-word notice — formal formats earn marks before content is read',
    classLevel: 9, subject: 'english-composition', topic: 'Formal letter and notice writing',
    chapters: ['c9_comp_ch86'],
    nodeIds: ['c9_engl_cbse_86_001', 'c9_engl_cbse_86_002', 'c9_engl_cbse_86_003'],
    emoji: '📮', theme: { bg: 'from-slate-900 to-cyan-950', accent: 'cyan', scene: 'senior' },

    scenario: {
        role: 'a correspondent whose letters must survive a clerk\'s desk and whose notices must pass the noticeboard test',
        intro: 'Format marks are won or lost before anyone reads your argument — a missing subject line or a wrong sign-off pair is a mark thrown away on an empty page.',
        goal: 'Produce the 8-element skeleton in legal order, keep the register office-formal, and draft boxed notices under 50 words.',
    },
    discovery: {
        question: 'A letter opens "Dear Sir" and signs off "Yours sincerely." What is broken?',
        options: [
            'The pair — Dear Sir/Madam locks to Yours faithfully; sincerely pairs with named recipients',
            'Nothing — sincerely is always fine',
            'Dear Sir should be Respected Sir',
            'The sign-off should come first',
        ],
        answer: 'The pair — Dear Sir/Madam locks to Yours faithfully; sincerely pairs with named recipients',
        hook: 'Salutation and subscription are a contract — most students never see the pairing rule.',
    },
    teaching: [
        { title: 'The legal order', text: "sender's address → date → receiver's address → subject → salutation → body → subscription → name. Positional, all marked.", emoji: '🦴', bgColor: 'from-cyan-500 to-sky-600' },
        { title: 'Register is deletion', text: 'No contractions, slang, exclamations, or vague words. Convert feelings to facts: "smells gross" → "poses a health hazard".', emoji: '🎩', bgColor: 'from-sky-500 to-blue-600' },
    ],

    beats: [
        { type: 'build', nodeId: 'c9_engl_cbse_86_001', title: 'Assemble the header',
          build: {
            prompt: 'Order the formal letter header:',
            blocks: ['salutation', 'subject', "receiver's address", "sender's address", 'date'],
            answer: "sender's address, date, receiver's address, subject, salutation",
          } },
        { type: 'dissect', nodeId: 'c9_engl_cbse_86_002', title: 'Hunt the informal markers',
          dissect: { specimen: 'a complaint letter leaking register',
          spots: [
            { id: 's1', label: 'contraction', prompt: '"I\'m writing coz the streetlight hasn\'t worked…" — fix the opening.', answer: 'I am writing to report — no contractions, no "coz"; state the purpose formally', options: ['I am writing to report — no contractions, no "coz"; state the purpose formally', 'I\'m writing is fine', 'I write to say', 'just remove coz'] },
            { id: 's2', label: 'emotion', prompt: '"it\'s super annoying!!!" — the register fix?', answer: 'convert the feeling to a fact — "poses a daily inconvenience" or "remains non-functional"', options: ['convert the feeling to a fact — "poses a daily inconvenience" or "remains non-functional"', 'just remove the exclamation marks', 'say it louder — it is urgent', 'add more exclamations'] },
            { id: 's3', label: 'indianism', prompt: '"kindly do the needful" — acceptable?', answer: 'no — a dated Indianism boards mark down; say the actual action needed', options: ['no — a dated Indianism boards mark down; say the actual action needed', 'yes — it is formal', 'yes — everyone writes it', 'only in complaints'] },
          ] } },
        { type: 'case', nodeId: 'c9_engl_cbse_86_003', title: 'The 50-word box',
          caseStudy: {
            intro: 'Notices are the most mechanical format — and the most butchered.',
            decisions: [
              { prompt: 'Which body sentence is notice-legal?', options: [
                  { text: 'Interested students may register with the undersigned by 8 May.', outcome: 'Correct — third person, action + deadline + contact.' },
                  { text: 'You should all definitely come, it will be so much fun!!!', outcome: 'Invitation-tone with second person and exclamations — notices inform, never invite.', reveals: 'notice-persuasion' },
                ] },
              { prompt: 'A notice is 70 words including "a very exciting and wonderful celebration" — first cut?', options: [
                  { text: 'The enthusiasm-phrase — the 4W facts are untouchable, decoration is expendable', outcome: 'Correct — trim performance before facts.' },
                  { text: 'The date and venue — least important', outcome: 'The 4W facts ARE the notice — cut enthusiasm, never the facts.', reveals: 'fact-cut' },
                ] },
            ],
          } },
        { type: 'scaffold', nodeId: 'c9_engl_cbse_86_002', title: 'The courteous command',
          scaffold: {
            problem: 'Close a complaint letter requesting action on garbage collection.',
            steps: [
                { text: 'Formal requests command through courtesy — never "You must fix this."' },
                { text: 'Template: I would be grateful if you could + verb.', faded: true },
                { text: '"I would be grateful if you could arrange daily collection."', faded: true },
                { text: 'You: request an inspection → "I would be grateful if ___"', blankAnswer: 'you could inspect the ward' },
            ],
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c9_engl_cbse_86_001', difficulty: 'standard',
          question: 'Order the header: salutation, subject, receiver\'s address, sender\'s address, date.',
          options: [
              { text: "sender's address → date → receiver's address → subject → salutation" },
              { text: "sender's address → receiver's address → date → salutation → subject", reveals: 'order-scramble' },
              { text: "date → sender's address → salutation → subject → receiver's address", reveals: 'order-scramble' },
          ],
          answer: "sender's address → date → receiver's address → subject → salutation",
          remediations: {
              'order-scramble': { steps: ['Think like the receiver: who wrote → when → who am I → what about → greeting.', 'Write the 8-block checklist before drafting — format marks are positional.'] },
          },
          hint: 'Who → when → to whom → about what → hello.',
          misconception: 'students know the pieces but not the legal order' },
        { type: 'mcq', nodeId: 'c9_engl_cbse_86_001', difficulty: 'standard',
          question: 'Write the subject line for: inquiry about computer courses at an institute.',
          options: [
              { text: 'Inquiry regarding computer courses offered' },
              { text: 'I want to know about computer courses offered by you', reveals: 'subject-sentence' },
              { text: 'Computer courses', reveals: 'subject-vague' },
          ],
          answer: 'Inquiry regarding computer courses offered',
          remediations: {
              'subject-sentence': { steps: ['The subject is a noun-phrase headline — no "I", no verb needed.', 'Compress: [Issue-type] + regarding/of + topic.'] },
              'subject-vague': { steps: ['"Computer courses" names the topic but not the issue — add what you want (inquiry).', 'One line, specific enough to route the letter.'] },
          },
          hint: 'Headline, not sentence.',
          misconception: 'students write full sentences as subjects — the subject is a headline' },
        { type: 'mcq', nodeId: 'c9_engl_cbse_86_002', difficulty: 'standard',
          question: 'Which request close earns the mark?',
          options: [
              { text: 'I would be grateful if you could look into the matter at the earliest.' },
              { text: 'You must fix this immediately or else.', reveals: 'assertive-formality' },
              { text: 'Please please do something fast!!!', reveals: 'emotive-residue' },
          ],
          answer: 'I would be grateful if you could look into the matter at the earliest.',
          remediations: {
              'assertive-formality': { steps: ['Courtesy commands harder than force in formal register.', '"I would be grateful if" is the standard power-move — indirect, firm, correct.'] },
              'emotive-residue': { steps: ['Repetition + exclamation = panic, not urgency.', 'Convert urgency to a deadline: "at the earliest".'] },
          },
          hint: 'Formal commands through courtesy.',
          misconception: 'students think formality means assertiveness — it means courtesy that commands' },
        { type: 'sort', nodeId: 'c9_engl_cbse_86_003', difficulty: 'foundation',
          question: 'Notice element or letter element?',
          sortItems: [
              { id: 'a', label: 'organization name at top', emoji: '🏫', correctBin: 'notice' },
              { id: 'b', label: "sender's address", emoji: '🏠', correctBin: 'letter' },
              { id: 'c', label: 'the word NOTICE', emoji: '📢', correctBin: 'notice' },
              { id: 'd', label: 'subject line', emoji: '📋', correctBin: 'letter' },
              { id: 'e', label: 'signature + designation', emoji: '🖋️', correctBin: 'notice' },
              { id: 'f', label: 'Dear Sir/Madam', emoji: '🎩', correctBin: 'letter' },
          ],
          bins: [
              { id: 'notice', label: 'NOTICE', color: '#0ea5e9' },
              { id: 'letter', label: 'FORMAL LETTER', color: '#22c55e' },
          ],
          hint: 'The notice has no salutation and no subject line — authority leads instead.',
          misconception: 'students merge the two skeletons — subject lines inside notices, org-name headers inside letters' },
        { type: 'subpart', nodeId: 'c9_engl_cbse_86_001', difficulty: 'advanced',
          question: 'Audit: letter has sender\'s address, "Dear Sir", body, "Yours sincerely", name — but no date, receiver\'s address, or subject.',
          hint: 'Count missing blocks AND check the pairing.',
          misconception: 'spots the subject gap but misses the pairing error',
          parts: [
              { id: 'a', prompt: 'How many blocks are missing?',
                answer: 'three — date, receiver\'s address, subject line',
                options: ['three — date, receiver\'s address, subject line', 'one — the subject', 'none'],
                hint: 'Run the 8-block checklist.',
                misconception: 'partial audit' },
              { id: 'b', prompt: 'And the sign-off pairing?',
                answer: 'wrong — Dear Sir requires Yours faithfully',
                options: ['wrong — Dear Sir requires Yours faithfully', 'correct — sincerely is universal', 'wrong — needs lovingly'],
                hint: 'The pair is relationship-indexed.',
                misconception: 'one-pair-fits-all' },
              { id: 'c', prompt: 'Format marks lost (1 per fault)?',
                answer: 'four — three missing + one wrong pairing',
                options: ['four — three missing + one wrong pairing', 'three', 'one'],
                hint: 'Every fault costs.',
                misconception: 'undercounts' },
          ] },
    ],

    reflect: { prompts: ['Which block do you always forget?', 'Why does courtesy outrank force in formal letters?'] },
    successLine: 'Clerk-proof letters and noticeboard-legal notices — format marks banked before content is read.',
    tryAgainLine: 'Checklist first, register second — the skeleton is scored before the sentences.',
};
