import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_gram_ch92 The Power Words (modals + modal perfects).
 * Nodes: c10_gram_cbse_92_001 (function map), 92_002 (modal perfects). */
export const c10_gram_ch92: SimDef = {
    id: 'v3w_c10_gram_ch92',
    title: 'The Power Words',
    subtitle: 'may &lt; should &lt; must — modals are function words, and boards test the function',
    classLevel: 10, subject: 'english-grammar', topic: 'Modals and modal perfects',
    chapters: ['c10_gram_ch92'],
    nodeIds: ['c10_gram_cbse_92_001', 'c10_gram_cbse_92_002'],
    emoji: '🎚️', theme: { bg: 'from-slate-900 to-amber-950', accent: 'amber', scene: 'senior' },

    scenario: {
        role: 'a diplomat calibrating exactly how forceful each sentence must be',
        intro: 'Every modal is a dial, not a decoration — permission, advice, obligation, possibility each has its own word. Choose wrong and the sentence still parses; it just says the wrong thing.',
        goal: 'Map any context to the modal whose FUNCTION fits — then master the past-tense forms (should have / must have / could have) that talk about what never happened.',
    },
    discovery: {
        question: '"You ___ leave now." — may, should, or must changes the sentence\'s power. Which one is an ORDER?',
        options: [
            'must — obligation, not permission or advice',
            'should — it sounds the most serious',
            'may — the speaker grants leaving',
            'all three mean the same thing here',
        ],
        answer: 'must — obligation, not permission or advice',
        hook: 'Same leaving, three power levels: may = I allow it, should = I advise it, must = I demand it.',
    },
    teaching: [
        { title: 'The function map', text: 'Modals encode jobs: ability (can), permission (may), advice (should), obligation (must), possibility (may/might/could), request (would/could).', emoji: '🗺️', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'Talking about the past that wasn\'t', text: 'modal + have + V3: should have = regret, must have = deduction, could have = lost chance.', emoji: '⏪', bgColor: 'from-orange-500 to-rose-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_gram_cbse_92_001', title: 'Climb the obligation ladder',
          scaffold: {
            problem: 'Rank by force: "You may leave" / "You must leave" / "You should leave" — then pick the right one for a doctor talking to a patient with a serious condition.',
            steps: [
                { text: 'may = permission — I allow it (lowest force).' },
                { text: 'should = advice — I recommend it (middle).' },
                { text: 'must = obligation — the outcome is non-negotiable (highest).', faded: true },
                { text: 'Serious condition → non-negotiable → "You must see a specialist."', faded: true },
                { text: 'You: friendly suggestion to try a new cafe → "You ___ try it." → ', blankAnswer: 'should' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_92_002', title: 'The modal-perfect decoder',
          dissect: { specimen: 'should have / must have / could have',
          spots: [
            { id: 's1', label: 'must have', prompt: '"The lights are off — they ___ have gone out." What stance does the speaker take?', answer: 'must — confident deduction from present evidence about a past event', options: ['must — confident deduction from present evidence about a past event', 'should — advice about the past', 'could — the lights had the ability to go out'] },
            { id: 's2', label: 'should have', prompt: '"You ___ have studied — now you have failed." What does the speaker express?', answer: 'should — reproach/regret about an undone past action', options: ['should — reproach/regret about an undone past action', 'must — the student was obligated and did study', 'might — a weak guess about the past'] },
            { id: 's3', label: 'could have', prompt: '"He ___ have won, but he did not enter." What was lost?', answer: 'could — an unrealized past ability or opportunity', options: ['could — an unrealized past ability or opportunity', 'should — a duty he failed', 'must — a deduction about the race'] },
          ] } },
        { type: 'case', nodeId: 'c10_gram_cbse_92_001', title: 'Permission register',
          caseStudy: {
            intro: '"___ I borrow your pen?" — the modal you pick signals formality as much as meaning.',
            decisions: [
              { prompt: 'To a teacher, politely, formally:', options: [
                  { text: 'May I borrow your pen?', outcome: 'Correct — "may" is the formal permission modal; it acknowledges the authority relationship.' },
                  { text: 'Can I borrow your pen?', outcome: 'Grammatical but informal — fine for a friend, under-calibrated for a teacher. Boards prefer "may" for formal permission.', reveals: 'register-blind' },
                  { text: 'Must I borrow your pen?', outcome: 'That asks whether you are OBLIGED to borrow — different function entirely.', reveals: 'function-blind' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_gram_cbse_92_002', title: 'Build a deduction',
          build: {
            prompt: 'Order the blocks: "rained / must / it / have / last night / — the ground is wet"',
            blocks: ['rained', 'must', 'it', 'have', 'last night', '— the ground is wet'],
            answer: 'it must have rained last night — the ground is wet',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_gram_cbse_92_001', difficulty: 'standard',
          question: '"You ___ work hard if you want a seat in IIT."',
          options: [
              { text: 'must — the goal makes hard work non-negotiable' },
              { text: 'should — advice is politer', reveals: 'obligation-weak' },
              { text: 'may — it is a possibility', reveals: 'function-blind' },
          ],
          answer: 'must — the goal makes hard work non-negotiable',
          remediations: {
              'obligation-weak': { steps: ['Match modal strength to consequence — a required outcome (IIT seat) demands "must".', '"should" understates necessity as optional advice.', 'Rule of thumb: goal-dependent → must; general improvement → should.'] },
              'function-blind': { steps: ['"may" = permission or possibility, never obligation.', 'Ask what the sentence DOES: it states a requirement — that is must territory.'] },
          },
          hint: 'Is the outcome optional or required?',
          misconception: 'students grade obligation by politeness rather than by consequence' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_92_001', difficulty: 'standard',
          question: '"It ___ rain tomorrow — the sky is clear."',
          options: [
              { text: 'may/might — the clear sky undercuts certainty, so only possibility survives' },
              { text: 'must — rain is always a strong prediction', reveals: 'evidence-blind' },
              { text: 'should — weather usually follows advice', reveals: 'function-blind' },
          ],
          answer: 'may/might — the clear sky undercuts certainty, so only possibility survives',
          remediations: {
              'evidence-blind': { steps: ['The second clause is evidence — read it before choosing.', 'Evidence against certainty → weak possibility (might) not strong claim (must).'] },
              'function-blind': { steps: ['"should" predicts likelihood from expectation, not from evidence — and the evidence here contradicts rain anyway.'] },
          },
          hint: 'The dash is a clue: what does the evidence permit?',
          misconception: 'students read modals as filler and ignore the evidential clue in the sentence' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_92_002', difficulty: 'advanced',
          question: '"The ground is wet — it ___ have rained last night."',
          options: [
              { text: 'must — confident deduction from present evidence about the past' },
              { text: 'should — it ought to have rained', reveals: 'deduction-advice-confusion' },
              { text: 'could — rain was possible', reveals: 'stance-weak' },
          ],
          answer: 'must — confident deduction from present evidence about the past',
          remediations: {
              'deduction-advice-confusion': { steps: ['"must have" = deduction (evidence → conclusion). "should have" = reproach (unkept duty). The ground is wet = evidence → deduction → must.', 'The two functions never overlap — name the stance first.'] },
              'stance-weak': { steps: ['"could have" says rain was merely possible — but the wet ground makes it near-certain. Match strength to evidence.'] },
          },
          hint: 'Deduction or advice? The wet ground is evidence, not a regret.',
          misconception: 'students confuse deduction-must with advisability-should — same modal family, opposite jobs' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_92_002', difficulty: 'advanced',
          question: 'Fix the error: "You should had apologised."',
          options: [
              { text: 'should have apologised — modal perfect needs have + V3' },
              { text: 'should had apologised is correct in formal English', reveals: 'double-past' },
              { text: 'should apologised — drop the auxiliary entirely', reveals: 'aux-drop' },
          ],
          answer: 'should have apologised — modal perfect needs have + V3',
          remediations: {
              'double-past': { steps: ['"had" is for pluperfect clauses, not modal perfects.', 'The template is fixed: modal + have + V3 — should have gone, must have seen, could have won.', 'Never "modal + had" — that is double-marking the past.'] },
              'aux-drop': { steps: ['Without "have", "should apologised" puts the obligation in the present — but the apology was needed yesterday.', 'Past reference → modal + have + V3.'] },
          },
          hint: 'Modal perfects have one fixed shape — what fills the gap?',
          misconception: 'students write "modal + had" — double-marking the past' },
        { type: 'subpart', nodeId: 'c10_gram_cbse_92_001', difficulty: 'standard',
          question: 'A friend asks for a day off school to attend a wedding. Build the permission sentence.',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'The function needed here is…',
                answer: 'permission',
                options: ['permission', 'obligation', 'deduction', 'advice'],
                hint: 'The friend is asking to be allowed, not advised.',
                misconception: 'confuses asking-permission with seeking-advice' },
              { id: 'b', prompt: 'Pick the polite, correct modal for "___ I go to the wedding?"',
                answer: 'may',
                options: ['may', 'must', 'should'],
                hint: 'Formal permission = may.',
                misconception: 'uses informal can where formal may fits' },
              { id: 'c', prompt: 'The principal says attendance is compulsory — now the modal is…',
                answer: 'must',
                options: ['must', 'may', 'might'],
                hint: 'Compulsory = obligation.',
                misconception: 'keeps permission-modal where obligation is stated' },
          ] },
    ],

    reflect: { prompts: ['Which rung of the obligation ladder do you overuse — should or must?', 'Explain "must have gone" to a friend in one line.'] },
    successLine: 'Your modals now carry exactly the force you intend — diplomat-grade calibration.',
    tryAgainLine: 'Name the function before the word — advice, permission, obligation, possibility?',
};
