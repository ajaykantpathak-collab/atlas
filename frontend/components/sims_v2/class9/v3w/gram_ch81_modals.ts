import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c9_gram_ch81 The Function Dial (modals + modal perfects).
 * Nodes: c9_gram_cbse_81_001, 81_002. */
export const c9_gram_ch81: SimDef = {
    id: 'v3w_c9_gram_ch81',
    title: 'The Function Dial',
    subtitle: 'Modals are graded on function, not feel — permission, advice, obligation, possibility each has its own word and strength',
    classLevel: 9, subject: 'english-grammar', topic: 'Modals and modal perfects',
    chapters: ['c9_gram_ch81'],
    nodeIds: ['c9_gram_cbse_81_001', 'c9_gram_cbse_81_002'],
    emoji: '🎚️', theme: { bg: 'from-slate-900 to-amber-950', accent: 'amber', scene: 'senior' },

    scenario: {
        role: 'a strength-calibrator matching every modal to the exact force the context needs',
        intro: '"You may leave" / "You should leave" / "You must leave" — same leaving, three power levels. The board tests whether you can read the strength the context demands.',
        goal: 'Map context to modal function+strength, then handle the modal perfects — should have / must have / could have — that talk about the past that wasn\'t.',
    },
    discovery: {
        question: '"You ___ submit the form by Friday — it is compulsory." should or must?',
        options: [
            'must — "compulsory" makes it obligation, not advice',
            'should — it is politer',
            'may — permission fits a form',
            'would — conditional fits',
        ],
        answer: 'must — "compulsory" makes it obligation, not advice',
        hook: '"should" understates a requirement as a suggestion — boards mark the strength-mismatch wrong.',
    },
    teaching: [
        { title: 'The ladders', text: 'Obligation: may < should < must. Possibility: might < may < could. The context clue decides the rung.', emoji: '🪜', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'The past that wasn\'t', text: 'should have = reproach. must have = deduction. could have = lost chance. Always modal + have + V3 — "should had" is always wrong.', emoji: '⏪', bgColor: 'from-orange-500 to-rose-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c9_gram_cbse_81_001', title: 'Climb the ladder',
          scaffold: {
            problem: 'A doctor to a patient with a serious condition: "You ___ see a specialist."',
            steps: [
                { text: 'Function check: advising or requiring? The condition is serious → requirement.' },
                { text: 'Requirement → must; gentle suggestion → should; permission → may.' },
                { text: '"You must see a specialist."', faded: true },
                { text: 'You: friend recommending a café → "You ___ try it." → ', blankAnswer: 'should' },
            ],
          } },
        { type: 'dissect', nodeId: 'c9_gram_cbse_81_002', title: 'The stance decoder',
          dissect: { specimen: 'modal perfects — same shape, different stances',
          spots: [
            { id: 's1', label: 'deduction', prompt: '"The ground is wet — it ___ have rained." Which stance?', answer: 'must — confident deduction from present evidence', options: ['must — confident deduction from present evidence', 'should — reproach', 'could — lost chance', 'might — weak guess'] },
            { id: 's2', label: 'reproach', prompt: '"You ___ have called — I waited all evening." Which stance?', answer: 'should — reproach about an unkept duty', options: ['should — reproach about an unkept duty', 'must — deduction', 'could — lost chance', 'will — future'] },
            { id: 's3', label: 'chance', prompt: '"He ___ have won, but he did not enter." Which stance?', answer: 'could — an unrealized ability or opportunity', options: ['could — an unrealized ability or opportunity', 'must — deduction', 'should — reproach', 'may — permission'] },
          ] } },
        { type: 'case', nodeId: 'c9_gram_cbse_81_001', title: 'Register the permission',
          caseStudy: {
            intro: 'The modal signals formality — may asks politely, can asks casually.',
            decisions: [
              { prompt: 'To a teacher: "___ I borrow your notes?"', options: [
                  { text: 'May — formal permission modal', outcome: 'Correct — "may" acknowledges the authority relationship.' },
                  { text: 'Can — it is grammatical', outcome: 'Grammatical but casual — boards prefer "may" when register is tested.', reveals: 'register-blind' },
                ] },
              { prompt: '"It ___ rain tonight — dark clouds are gathering." may or will?', options: [
                  { text: 'may — clouds suggest possibility, not certainty', outcome: 'Correct — evidence licenses a guess, not a forecast.' },
                  { text: 'will — weather predictions take will', outcome: '"Will" claims settled certainty the evidence does not support.', reveals: 'evidence-blind' },
                ] },
            ],
          } },
        { type: 'drill', nodeId: 'c9_gram_cbse_81_001', title: 'Function speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c9_gram_cbse_81_001', difficulty: 'standard',
          question: '"You ___ work hard if you want a seat in IIT."',
          options: [
              { text: 'must — the goal makes hard work non-negotiable' },
              { text: 'should — advice is politer', reveals: 'strength-weak' },
              { text: 'may — it is a possibility', reveals: 'function-blind' },
          ],
          answer: 'must — the goal makes hard work non-negotiable',
          remediations: {
              'strength-weak': { steps: ['Match strength to consequence — a required outcome demands must.', 'should = advice; must = requirement. The IIT seat is a requirement.'] },
              'function-blind': { steps: ['"may" permits or guesses — it never obliges.', 'Ask what the sentence DOES before picking the modal.'] },
          },
          hint: 'Optional improvement or required step?',
          misconception: 'students grade obligation by politeness, not by consequence' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_81_002', difficulty: 'advanced',
          question: '"You failed — you ___ have studied harder."',
          options: [
              { text: 'should — reproach about an unkept duty' },
              { text: 'must — deduction that you did study', reveals: 'deduction-advice' },
              { text: 'could — you had the ability', reveals: 'stance-mismatch' },
          ],
          answer: 'should — reproach about an unkept duty',
          remediations: {
              'deduction-advice': { steps: ['"must have studied" would mean the speaker CONCLUDES you studied — opposite meaning.', 'Reproach = should have; deduction = must have. Name the stance first.'] },
              'stance-mismatch': { steps: ['"could have" mourns a lost chance — but the sentence blames an unmet duty.'] },
          },
          hint: 'Is the speaker deducing or scolding?',
          misconception: 'students confuse deduction-must with reproach-should — same family, opposite jobs' },
        { type: 'mcq', nodeId: 'c9_gram_cbse_81_002', difficulty: 'advanced',
          question: 'Fix: "He could had won the match."',
          options: [
              { text: 'could have won — modal perfects are modal + have + V3' },
              { text: 'could won — drop the auxiliary', reveals: 'aux-drop' },
              { text: 'it is already correct', reveals: 'modal-had' },
          ],
          answer: 'could have won — modal perfects are modal + have + V3',
          remediations: {
              'modal-had': { steps: ['"had" belongs to pluperfect clauses, not modal perfects.', 'The fixed template: modal + have + V3 — should have gone, must have seen.'] },
              'aux-drop': { steps: ['Without "have", "could won" is ungrammatical — the past needs the have+V3 pair.'] },
          },
          hint: 'Modal perfects have ONE fixed shape.',
          misconception: '"modal + had" — double-marking the past' },
        { type: 'sort', nodeId: 'c9_gram_cbse_81_001', difficulty: 'foundation',
          question: 'Sort the modals by their function:',
          sortItems: [
              { id: 'a', label: 'can (I can swim)', emoji: '💪', correctBin: 'ability' },
              { id: 'b', label: 'may (May I go?)', emoji: '🙋', correctBin: 'permission' },
              { id: 'c', label: 'must (You must submit)', emoji: '⚠️', correctBin: 'obligation' },
              { id: 'd', label: 'should (You should rest)', emoji: '💡', correctBin: 'advice' },
              { id: 'e', label: 'might (It might rain)', emoji: '🌦️', correctBin: 'possibility' },
          ],
          bins: [
              { id: 'ability', label: 'ABILITY', color: '#22c55e' },
              { id: 'permission', label: 'PERMISSION', color: '#0ea5e9' },
              { id: 'obligation', label: 'OBLIGATION', color: '#ef4444' },
              { id: 'advice', label: 'ADVICE', color: '#f59e0b' },
              { id: 'possibility', label: 'POSSIBILITY', color: '#8b5cf6' },
          ],
          hint: 'Each modal has a job — the context calls the job, not the word.',
          misconception: 'students pick modals by sound — function and strength are the real axes' },
        { type: 'subpart', nodeId: 'c9_gram_cbse_81_002', difficulty: 'advanced',
          question: '"She could have topped the exam." — decode the meaning.',
          hint: 'Same shape, different stances — which one is this?',
          misconception: 'reads all modal perfects as "past possibility" — the stance distinction is lost',
          parts: [
              { id: 'a', prompt: 'The speaker\'s stance is…',
                answer: 'a lost chance — she had the ability but did not use it',
                options: ['a lost chance — she had the ability but did not use it', 'a deduction — she probably topped', 'a reproach — she should have studied'],
                hint: 'could have = unrealized ability.',
                misconception: 'stance unread' },
              { id: 'b', prompt: 'To express reproach instead, the modal becomes…',
                answer: 'should have — "she should have studied harder"',
                options: ['should have — "she should have studied harder"', 'must have — she must have topped', 'would have — she would have topped'],
                hint: 'Reproach rides on should.',
                misconception: 'stances swapped' },
          ] },
    ],

    reflect: { prompts: ['Which rung do you overuse — should or must?', 'When is "would have" legal?'] },
    successLine: 'Your modals carry exactly the force you intend — no more, no less.',
    tryAgainLine: 'Function first, strength second, word last.',
};
