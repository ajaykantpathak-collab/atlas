import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_comp_ch90 The Complaint Desk (formal letter).
 * Nodes: c10_engl_cbse_90_001 (skeleton), 90_002 (register). */
export const c10_comp_ch90: SimDef = {
    id: 'v3w_c10_comp_ch90',
    title: 'The Complaint Desk',
    subtitle: 'Eight blocks in legal order, one register — the formal letter is a checklist wearing a stamp',
    classLevel: 10, subject: 'english-composition', topic: 'Formal letter — skeleton and register',
    chapters: ['c10_comp_ch90'],
    nodeIds: ['c10_engl_cbse_90_001', 'c10_engl_cbse_90_002'],
    emoji: '📮', theme: { bg: 'from-slate-900 to-cyan-950', accent: 'cyan', scene: 'senior' },

    scenario: {
        role: 'a municipal correspondent whose letter must survive a clerk\'s desk',
        intro: 'Before anyone reads your complaint, the format marks are already won or lost — a missing subject line is a mark thrown away on an empty page.',
        goal: 'Produce the 8-element skeleton in legal order, pair salutation with subscription correctly, and keep the register office-formal end to end.',
    },
    discovery: {
        question: 'A letter opens "Dear Sir" and signs off "Yours sincerely." What is broken?',
        options: [
            'The pair — Dear Sir/Madam locks to Yours faithfully; sincerely pairs with named recipients',
            'Nothing — sincerely is always acceptable',
            'Dear Sir should be Respected Sir',
            'The sign-off should come before the body',
        ],
        answer: 'The pair — Dear Sir/Madam locks to Yours faithfully; sincerely pairs with named recipients',
        hook: 'Salutation and subscription are a contract — "Dear Sir" + "Yours sincerely" is a format error most students never see.',
    },
    teaching: [
        { title: 'The skeleton', text: 'sender addr → date → receiver addr → subject → salutation → body → subscription → name. Eight blocks, one legal order.', emoji: '🦴', bgColor: 'from-cyan-500 to-sky-600' },
        { title: 'The register', text: 'No contractions, no slang, no exclamations, no vague words. Facts stated, courtesy deployed — "I would be grateful" commands better than "you must".', emoji: '🎩', bgColor: 'from-sky-500 to-blue-600' },
    ],

    beats: [
        { type: 'build', nodeId: 'c10_engl_cbse_90_001', title: 'Assemble the skeleton',
          build: {
            prompt: 'Order the blocks into a legal formal letter header:',
            blocks: ['salutation', 'subject', "receiver's address", "sender's address", 'date'],
            answer: "sender's address, date, receiver's address, subject, salutation",
          } },
        { type: 'dissect', nodeId: 'c10_engl_cbse_90_001', title: 'Audit this letter',
          dissect: { specimen: 'a complaint letter with format wounds',
          spots: [
            { id: 's1', label: 'header', prompt: 'The letter jumps from sender\'s address straight to "Dear Sir". What two elements were skipped?', answer: 'date and receiver\'s address — both carry format marks', options: ['date and receiver\'s address — both carry format marks', 'only the subject', 'nothing was skipped', 'the envelope line'] },
            { id: 's2', label: 'subject', prompt: 'Why does the subject line matter so much?', answer: 'it is a one-line headline stating the issue — and the most commonly lost format mark', options: ['it is a one-line headline stating the issue — and the most commonly lost format mark', 'it decorates the letter', 'it repeats the address', 'it replaces the salutation'] },
            { id: 's3', label: 'sign-off', prompt: '"Dear Mr Sharma" should end with…?', answer: 'Yours sincerely — named recipient pairs with sincerely', options: ['Yours sincerely — named recipient pairs with sincerely', 'Yours faithfully — formal letters always use faithfully', 'Yours lovingly — all letters use lovingly', 'With regards — safest option'] },
          ] } },
        { type: 'case', nodeId: 'c10_engl_cbse_90_002', title: 'The register filter',
          caseStudy: {
            intro: 'Every informal marker in a formal letter is a mark leaking out. Hunt them.',
            decisions: [
              { prompt: '"I\'m writing coz the streetlight near my house hasn\'t worked for like two weeks and it\'s super annoying." — fix the register.', options: [
                  { text: 'I am writing to report that the streetlight near my residence has been non-functional for two weeks.', outcome: 'Correct — every marker fixed: contraction, "coz", "like", "super annoying" all replaced with factual register.' },
                  { text: 'I am writing because the streetlight near my house has not worked for two weeks and it is very annoying.', outcome: 'Half-fixed — "very annoying" is still an emotive claim; formal converts feelings to facts: "non-functional", "a matter of concern".', reveals: 'emotive-residue' },
                  { text: 'I am writing coz the streetlight is broken since two weeks, kindly do the needful.', outcome: '"coz" survived, "since" is the wrong duration marker, and "do the needful" is a dated Indianism boards mark down.', reveals: 'indianism' },
                ] },
              { prompt: 'Which opener suits a letter to the editor?', options: [
                  { text: 'Through the columns of your esteemed daily, I wish to highlight…', outcome: 'Correct — formal public register; addresses the channel, not the person.' },
                  { text: 'You won\'t believe what\'s happening in our park!', outcome: 'Attention-grabbing is informal register — formal letters address, they do not tease.', reveals: 'genre-confusion' },
                ] },
            ],
          } },
        { type: 'scaffold', nodeId: 'c10_engl_cbse_90_002', title: 'The courteous command',
          scaffold: {
            problem: 'Write the request line closing a complaint letter about garbage collection.',
            steps: [
                { text: 'Formal requests command through courtesy — never "You must fix this."' },
                { text: 'Template: I would be grateful if you could + verb.', faded: true },
                { text: '"I would be grateful if you could arrange daily collection."', faded: true },
                { text: 'You: request an inspection → "I would be grateful if ___"', blankAnswer: 'you could inspect the ward' },
            ],
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_engl_cbse_90_001', difficulty: 'standard',
          question: 'Order the header blocks: salutation, subject, receiver\'s address, sender\'s address, date.',
          options: [
              { text: "sender's address → date → receiver's address → subject → salutation" },
              { text: "sender's address → receiver's address → date → salutation → subject", reveals: 'order-scramble' },
              { text: "date → sender's address → salutation → subject → receiver's address", reveals: 'order-scramble' },
          ],
          answer: "sender's address → date → receiver's address → subject → salutation",
          remediations: {
              'order-scramble': { steps: ['Think like the receiver: who wrote this (sender) → when (date) → who am I (receiver) → what is it about (subject) → greeting.', 'The skeleton is top-down and positional — marks are lost per misplaced block.', 'Write the 8-item checklist before drafting any letter.'] },
          },
          hint: 'Who → when → to whom → about what → hello.',
          misconception: 'students know the pieces but not the legal order — format marks are positional' },
        { type: 'mcq', nodeId: 'c10_engl_cbse_90_001', difficulty: 'standard',
          question: 'Write the subject line for: complaint to MCD about garbage not collected for two weeks.',
          options: [
              { text: 'Non-collection of garbage in Ward 12 for two weeks' },
              { text: 'I want to complain that garbage has not been collected for two weeks and it is causing problems', reveals: 'subject-sentence' },
              { text: 'Garbage complaint', reveals: 'subject-vague' },
          ],
          answer: 'Non-collection of garbage in Ward 12 for two weeks',
          remediations: {
              'subject-sentence': { steps: ['The subject is a noun-phrase headline, not a sentence — no "I", no full stop needed.', 'Compress the issue: Non-collection of + issue + place + duration.'] },
              'subject-vague': { steps: ['"Garbage complaint" names the topic, not the issue — add what failed (non-collection) and where.', 'One line, specific enough that the clerk knows the problem before reading the body.'] },
          },
          hint: 'Headline, not sentence — noun phrase, one line.',
          misconception: 'students write full sentences as subjects — the subject is a headline' },
        { type: 'mcq', nodeId: 'c10_engl_cbse_90_002', difficulty: 'standard',
          question: 'Which closing line earns the request mark?',
          options: [
              { text: 'I would be grateful if you could look into this matter at the earliest.' },
              { text: 'You must fix this immediately or else.', reveals: 'assertive-formality' },
              { text: 'Please please do something fast, it is urgent!!!', reveals: 'emotive-residue' },
          ],
          answer: 'I would be grateful if you could look into this matter at the earliest.',
          remediations: {
              'assertive-formality': { steps: ['Formal register commands through courtesy — indirection carries MORE force, not less.', '"You must" reads as rude to an official; "I would be grateful if" reads as a citizen who knows the form.'] },
              'emotive-residue': { steps: ['Repetition + exclamations = panic, not urgency.', 'Convert emotion to a deadline: "at the earliest" does the work of three exclamation marks.'] },
          },
          hint: 'Formal requests are courteous and indirect — that IS the power move.',
          misconception: 'students think formality means assertiveness — it means courtesy that commands' },
        { type: 'sort', nodeId: 'c10_engl_cbse_90_002', difficulty: 'foundation',
          question: 'Sort the phrases — formal or informal register?',
          sortItems: [
              { id: 'a', label: 'I would be grateful if…', emoji: '🎩', correctBin: 'formal' },
              { id: 'b', label: "can't wait to hear back", emoji: '💬', correctBin: 'informal' },
              { id: 'c', label: 'kindly do the needful', emoji: '🧓', correctBin: 'dated' },
              { id: 'd', label: 'a matter of serious concern', emoji: '⚠️', correctBin: 'formal' },
              { id: 'e', label: 'it\'s super urgent!!!', emoji: '🔥', correctBin: 'informal' },
              { id: 'f', label: 'at the earliest convenience', emoji: '📅', correctBin: 'formal' },
          ],
          bins: [
              { id: 'formal', label: 'FORMAL ✓', color: '#22c55e' },
              { id: 'informal', label: 'INFORMAL ✗', color: '#ef4444' },
              { id: 'dated', label: 'DATED/INDIANISM', color: '#f59e0b' },
          ],
          hint: 'Formal = courteous fixed phrases. Dated phrases like "do the needful" get marked down too.',
          misconception: 'students think formal = fancy words; the real rules are deletions plus a fixed phrase-bank' },
        { type: 'subpart', nodeId: 'c10_engl_cbse_90_001', difficulty: 'advanced',
          question: 'Audit: a letter with sender\'s address, "Dear Sir", body, "Yours sincerely", name — but no date, no receiver\'s address, no subject.',
          hint: 'Run the 8-block checklist top-down, then check the pairing.',
          misconception: 'counts missing blocks but misses the wrong pairing',
          parts: [
              { id: 'a', prompt: 'How many format elements are missing?',
                answer: 'three — date, receiver\'s address, subject line',
                options: ['three — date, receiver\'s address, subject line', 'one — the subject', 'none — the skeleton is optional'],
                hint: 'Check all 8 blocks against the checklist.',
                misconception: 'spots the subject but not the header gaps' },
              { id: 'b', prompt: 'And the sign-off pairing is…',
                answer: 'wrong — Dear Sir needs Yours faithfully',
                options: ['wrong — Dear Sir needs Yours faithfully', 'correct — sincerely is universal', 'wrong — Dear Sir needs Yours lovingly'],
                hint: 'The pair is relationship-indexed.',
                misconception: 'memorized one pair, applies it universally' },
              { id: 'c', prompt: 'Total format marks lost in a 1-mark-per-element scheme?',
                answer: 'four — three missing + one wrong pairing',
                options: ['four — three missing + one wrong pairing', 'three', 'one'],
                hint: 'Each fault costs a mark — count all of them.',
                misconception: 'undercounts by treating pairing as free' },
          ] },
    ],

    reflect: { prompts: ['Which element do YOU always forget — subject, receiver, or the pairing?', 'Why does courtesy command harder than "you must"?'] },
    successLine: 'Your letters survive the clerk\'s desk — skeleton legal, register formal, every format mark banked.',
    tryAgainLine: 'Checklist before drafting — eight blocks, one pair, zero slang.',
};
