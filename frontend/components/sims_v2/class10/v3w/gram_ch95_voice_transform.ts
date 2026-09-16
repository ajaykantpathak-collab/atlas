import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_gram_ch95 Sentence Surgery (voice + transformation).
 * Nodes: c10_gram_cbse_95_001 (voice), 95_002 (degrees), 95_003 (structures). */
export const c10_gram_ch95: SimDef = {
    id: 'v3_c10_gram_ch95',
    title: 'Sentence Surgery',
    subtitle: 'Same meaning, new structure — voice flips, degree swaps, and the simple-compound-complex containers',
    classLevel: 10, subject: 'english-grammar', topic: 'Voice and sentence transformation',
    chapters: ['c10_gram_ch95'],
    nodeIds: ['c10_gram_cbse_95_001', 'c10_gram_cbse_95_002', 'c10_gram_cbse_95_003'],
    emoji: '🔀', theme: { bg: 'from-slate-900 to-purple-950', accent: 'purple', scene: 'senior' },

    scenario: {
        role: 'a surgeon who can open any sentence, rearrange its organs, and stitch it back saying the same thing',
        intro: 'Transformation is the purest test of grammar mastery: the meaning is fixed, so every mark goes to structural control. Three degrees, two voices, three clause-containers — a finite machine.',
        goal: 'Move any sentence between active/passive, between the three degrees, and between simple/compound/complex — with zero meaning drift.',
    },
    discovery: {
        question: '"Asha is taller than any girl in the class" — what is secretly wrong?',
        options: [
            'It logically includes Asha herself — she cannot be taller than herself; needs "any OTHER girl"',
            'Nothing — it is a correct comparative',
            '"taller" should be "more tall"',
            '"girl" should be plural',
        ],
        answer: 'It logically includes Asha herself — she cannot be taller than herself; needs "any OTHER girl"',
        hook: 'One missing word — "other" — turns a perfect sentence into a logical impossibility. Frames carry set-logic.',
    },
    teaching: [
        { title: 'Voice surgery', text: 'Object → subject, verb → be+V3 (be carries the tense), doer → by-agent or deleted.', emoji: '🔁', bgColor: 'from-purple-500 to-violet-600' },
        { title: 'The containers', text: 'One finite verb = simple. Two equals + and/but = compound. Main + subordinate (because/although) = complex.', emoji: '📦', bgColor: 'from-violet-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_gram_cbse_95_001', title: 'The voice operation',
          scaffold: {
            problem: 'Passive: "The teacher praised the boy."',
            steps: [
                { text: 'Find the object — "the boy" walks to the front as new subject.' },
                { text: 'Verb → be + V3; "be" carries the tense: praised → was praised.' },
                { text: 'Old subject → "by the teacher" or delete it.', faded: true },
                { text: 'Result: The boy was praised (by the teacher).', faded: true },
                { text: 'You: "Someone has stolen my watch." → My watch ___ ', blankAnswer: 'has been stolen' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_95_002', title: 'Set-membership logic',
          dissect: { specimen: 'the three degree frames',
          spots: [
            { id: 's1', label: 'superlative', prompt: '"Asha is the tallest girl in the class" — where does Asha sit relative to the group?', answer: 'inside it — superlative keeps the entity inside the group (tallest IN the class)', options: ['inside it — superlative keeps the entity inside the group (tallest IN the class)', 'outside it', 'above it without belonging', 'the frame does not encode membership'] },
            { id: 's2', label: 'comparative', prompt: 'Why does "taller than any OTHER girl" need "other"?', answer: 'it removes Asha from the comparison set — otherwise she would have to exceed herself', options: ['it removes Asha from the comparison set — otherwise she would have to exceed herself', 'it makes the sentence polite', 'any is ungrammatical alone', 'other marks the past tense'] },
            { id: 's3', label: 'positive', prompt: '"No other girl is as tall as Asha" — what does "no other" claim?', answer: 'absolute top — no rival exists, stronger than "taller than most"', options: ['absolute top — no rival exists, stronger than "taller than most"', 'Asha is average', 'only one girl is tall', 'the class has few girls'] },
          ] } },
        { type: 'case', nodeId: 'c10_gram_cbse_95_003', title: 'The clause counter',
          caseStudy: {
            intro: 'Structure = finite-verb count + joiner type. Count the finite verbs, then identify what glues the clauses.',
            decisions: [
              { prompt: '"Although it rained, the match continued." — classify.', options: [
                  { text: 'complex — "although" subordinates the first clause', outcome: 'Correct — one main clause + one subordinate = complex.' },
                  { text: 'compound — two clauses joined', outcome: 'Count is right, joiner is wrong — "although" is a subordinator, not a coordinator. Complex.', reveals: 'count-only-classifier' },
                  { text: 'simple — it expresses one idea', outcome: 'Two finite verbs (rained, continued) = never simple.', reveals: 'verb-count-blind' },
                ] },
              { prompt: 'Make it simple: "He was tired, so he went to bed."', options: [
                  { text: 'Being tired, he went to bed.', outcome: 'Correct — the subordinate idea collapsed into a phrase; one finite verb remains.' },
                  { text: 'He was tired and went to bed.', outcome: 'Still two finite verbs — joining is not reducing. "Being tired" strips the second clause to a phrase.', reveals: 'join-not-reduce' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_gram_cbse_95_001', title: 'Rebuild in passive',
          build: {
            prompt: 'Order the blocks into passive: "was caught / the thief / by the police"',
            blocks: ['was caught', 'the thief', 'by the police'],
            answer: 'the thief was caught by the police',
          } },
        { type: 'drill', nodeId: 'c10_gram_cbse_95_002', title: 'Degree-flip speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_gram_cbse_95_001', difficulty: 'standard',
          question: 'Passive: "Someone has stolen my watch."',
          options: [
              { text: 'My watch has been stolen.' },
              { text: 'My watch has stolen.', reveals: 'be-dropped' },
              { text: 'My watch is stolen by someone.', reveals: 'agent-kept' },
          ],
          answer: 'My watch has been stolen.',
          remediations: {
              'be-dropped': { steps: ['Passive = be + V3 — the participle alone cannot carry voice.', '"be" takes the original tense AND the new subject\'s number: has + been.', 'Template: object + be(tense) + V3 (+ by-agent).'] },
              'agent-kept': { steps: ['Vague agents (someone, people, they) get DELETED, not "by someone".', 'Keep the agent only when it adds information — "by the police" yes, "by someone" no.'] },
          },
          hint: 'Passive needs a compound verb — what two pieces?',
          misconception: 'students convert to V3 but drop the be-auxiliary — participle alone carries no voice' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_95_002', difficulty: 'standard',
          question: 'Transform to comparative: "Asha is the tallest girl in the class."',
          options: [
              { text: 'Asha is taller than any other girl in the class.' },
              { text: 'Asha is taller than any girl in the class.', reveals: 'other-dropped' },
              { text: 'Asha is more taller than other girls.', reveals: 'double-mark' },
          ],
          answer: 'Asha is taller than any other girl in the class.',
          remediations: {
              'other-dropped': { steps: ['"other" removes Asha from the comparison set — without it she must exceed herself.', 'Frames: superlative → in/of the group; comparative → than any OTHER; positive → NO OTHER … as … as.', 'The word "other" is set-logic, not decoration.'] },
              'double-mark': { steps: ['One marker per degree — "-er" OR "more", never both.', 'more taller and most tallest are double-marking: pick one realization of the feature.'] },
          },
          hint: 'Can Asha be taller than herself? What word removes her from the set?',
          misconception: 'students drop "other" — creating the logical impossibility the frame exists to prevent' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_95_002', difficulty: 'advanced',
          question: 'Transform to positive: "Mumbai is bigger than most cities in India."',
          options: [
              { text: 'Very few cities in India are as big as Mumbai.' },
              { text: 'No city in India is as big as Mumbai.', reveals: 'overstate' },
              { text: 'Most cities are not as big as Mumbai.', reveals: 'frame-drift' },
          ],
          answer: 'Very few cities in India are as big as Mumbai.',
          remediations: {
              'overstate': { steps: ['"Most" leaves room for rivals — "no other" claims absolute top and changes the fact.', 'Match the strength: bigger than MOST → very few … as big as.', 'Transformation must preserve truth conditions, not just grammar.'] },
              'frame-drift': { steps: ['"Most cities are not as big" reverses the set — it says most are smaller, which is true, but the positive frame requires the as…as construction.'] },
          },
          hint: 'How many cities rival Mumbai — none, or very few?',
          misconception: 'students change the fact, not just the form — "most" becomes "no other" and the meaning drifts' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_95_003', difficulty: 'standard',
          question: 'Is this legal? "She loves maths, she practises daily."',
          options: [
              { text: 'No — comma splice; needs and (compound), because (complex), or a full stop' },
              { text: 'Yes — a comma can join two related clauses', reveals: 'comma-power' },
              { text: 'Yes — both clauses are short enough', reveals: 'comma-power' },
          ],
          answer: 'No — comma splice; needs and (compound), because (complex), or a full stop',
          remediations: {
              'comma-power': { steps: ['A comma separates; it never joins — only coordinators, subordinators, or semicolons join clauses.', 'Two independent clauses + comma = comma splice, the most common punctuation-structure error.', 'Fix by adding a joiner, splitting with a full stop, or upgrading to a semicolon.'] },
          },
          hint: 'What grammatical job does a comma do — join or separate?',
          misconception: 'students believe a comma has conjunctive power' },
        { type: 'subpart', nodeId: 'c10_gram_cbse_95_003', difficulty: 'advanced',
          question: 'Classify and transform: "Although it rained, the match continued."',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'How many finite verbs?',
                answer: 'two — rained, continued',
                options: ['two — rained, continued', 'one — continued', 'three'],
                hint: 'Count finite verbs, not words.',
                misconception: 'counts clauses by length, not finite verbs' },
              { id: 'b', prompt: 'So the structure is…',
                answer: 'complex — "although" subordinates',
                options: ['complex — "although" subordinates', 'compound — two clauses', 'simple — one idea'],
                hint: 'Subordinator + main clause = complex.',
                misconception: 'classifies by clause count alone' },
              { id: 'c', prompt: 'Make it compound.',
                answer: 'It rained, but the match continued.',
                options: ['It rained, but the match continued.', 'Although it rained, the match continued.', 'Raining, the match continued.'],
                hint: 'Swap the subordinator for a coordinator — equal weight both sides.',
                misconception: 'keeps the subordinator and calls it compound' },
          ] },
    ],

    reflect: { prompts: ['What word makes "taller than any girl" a lie?', 'When is passive the BETTER choice — not just the legal one?'] },
    successLine: 'You move sentences between containers without spilling a drop of meaning — surgical.',
    tryAgainLine: 'Check the frame, check the set-membership, check the joiner — then transform.',
};
