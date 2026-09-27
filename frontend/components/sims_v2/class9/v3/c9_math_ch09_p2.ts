import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch09_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch09_p2: SimDef = {
    id: 'v3_c9_math_ch09_p2',
    title: 'Introduction to Euclid\'s Geometry · Part 2/2',
    subtitle: 'Covers the logical properties of axiom systems (consistency, independence, completeness).',
    classLevel: 9, subject: 'mathematics', topic: 'Introduction to Euclid\'s Geometry · Part 2/2',
    chapters: ['c9_math_ch09'],
    nodeIds: ['c9_math_ch9_7', 'c9_math_ch9_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Think about the rules of a board game like Snakes and Ladders: if the rulebook said "move forward 3 steps".', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Consider the axiom set: {A: "All squares are rectangles", B: "All rectangles have four sides", C: "All squares have four sides"}. Is this system independent?',
        options: ['**Correct answer:** No, the system is NOT independent', 'Yes, they are all different statements', 'independent axioms'],
        answer: '**Correct answer:** No, the system is NOT independent',
        hook: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about.',
    },
    teaching: [
        { title: 'Consistent and Independent Axiom Systems', text: 'An axiom system is **consistent** if it is impossible to derive a contradiction (i.e., there is no statement P such that both P and not-P are provable).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch9_7', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c9_math_ch9_7', title: 'Consistent and Independent Axiom Systems',
          caseStudy: { intro: 'Think about the rules of a board game like Snakes and Ladders: if the rulebook said "move forward 3 steps" AND "move backward 3 steps" on the same square.',
            decisions: [{ prompt: 'Define "consistent axiom system" and "independent axiom system" in your own words.', options: [
                { text: '**Correct answer:** A consistent axiom system has no contradictions (cannot prove both P', outcome: '**Correct answer:** A consistent axiom system has no contradictions (cannot prove both P and.' },
                { text: 'consistent means all statements are true', outcome: 'Not quite — **Students think "independent axioms" means "axioms that are about different topics" (e.g., one.', reveals: 'students-think-independent-axioms-means' },
                { text: 'independent axioms', outcome: 'Not quite — **Students think "independent axioms" means "axioms that are about different topics" (e.g., one.', reveals: 'students-think-independent-axioms-means' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch9_8', title: 'Historical Development of Geometry: Sulbasutras to Euclid',
          caseStudy: { intro: 'Suppose your grandmother asks you to draw a *rangoli* design where a small square must be transformed into a larger square of exactly double the area using.',
            decisions: [{ prompt: 'State the primary practical purpose of the Sulbasutras and contrast it with the primary intellectual purpose of Euclid\'s Elements in one.', options: [
                { text: 'The Sulbasutras provided precise geometric constructions for building Vedic fire altars', outcome: 'The Sulbasutras provided precise geometric constructions for building Vedic fire altars of specific.' },
                { text: 'both were for proving theorems', outcome: 'Not quite — Students think the Sulbasutras "knew the Pythagorean theorem" in the same sense Euclid proved.', reveals: 'the-sulbasutras-knew-the-pythagorean' },
                { text: 'knew the Pythagorean theorem', outcome: 'Not quite — Students think the Sulbasutras "knew the Pythagorean theorem" in the same sense Euclid proved.', reveals: 'the-sulbasutras-knew-the-pythagorean' }
            ] }] } },
        { type: 'drill', nodeId: 'c9_math_ch9_8', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch9_8', title: 'You made it',
          caseStudy: { intro: 'You finished Introduction to Euclid\'s Geometry — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch9_7', difficulty: 'standard',
          question: 'An axiom system is **consistent** if it is impossible to derive a contradiction.',
          hint: 'Revisit c9_math_ch9_6 (Building Proofs from Axioms) and practice writing 3-step proofs.',
          misconception: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about.',
          parts: [
                { id: 'a', prompt: 'Consider the axiom set: {A: "All squares are rectangles", B: "All rectangles have four sides", C: "All squares have four sides"}. Is this system independent?', answer: '**Correct answer:** No, the system is NOT independent',
                  options: ['**Correct answer:** No, the system is NOT independent', 'Yes, they are all different statements', 'independent axioms', 'axioms that are about different topics'],
                  hint: 'Revisit c9_math_ch9_6 (Building Proofs from Axioms) and practice writing 3-step proofs where each.',
                  misconception: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about circles).** They see.' },
                { id: 'b', prompt: 'A student proposes the following axioms for a geometry of "paths": P1: Every path has a start and an end.', answer: '**Correct answer:** The system is **inconsistent**',
                  options: ['**Correct answer:** The system is **inconsistent**', 'It\'s consistent because P1 and P2 don\'t contradict', 'independent axioms', 'axioms that are about different topics'],
                  hint: 'Revisit c9_math_ch9_6 (Building Proofs from Axioms) and practice writing 3-step proofs where each.',
                  misconception: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about circles).** They see.' },
                { id: 'c', prompt: 'Compare Euclid\'s five postulates with the following modified set: M1: A straight line can be drawn between any two points.', answer: '**Correct answer:** The system is **inconsistent**',
                  options: ['**Correct answer:** The system is **inconsistent**', 'It\'s independent', 'independent axioms', 'axioms that are about different topics'],
                  hint: 'Revisit c9_math_ch9_6 (Building Proofs from Axioms) and practice writing 3-step proofs where each.',
                  misconception: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about circles).** They see.' }
          ],
            remediations: { 'students-think-independent-axioms-means': { steps: ['** Show two formal axiom sets with *identical vocabulary* but different independence status: Set A: {A, B, A∧B} — not.', '** Ask: "In both sets, all axioms use A, B, C. Why is Set A not independent but Set B is?" Guide them to see it\'s about.', '** Have them attempt to derive Postulate 1 from Postulates 2–5 in Euclid — they\'ll see it\'s impossible not because.', '** Reinforce: "Independence = \'cannot be proved from the others using logic alone\'.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s claim: "Euclid\'s fifth postulate is not independent because many mathematicians tried to prove it from the first four — the fact that.', answer: '**Correct answer:** The claim is **incorrect**',
                  options: ['**Correct answer:** The claim is **incorrect**', 'we haven\'t found a proof', 'no proof exists', 'independent axioms'],
                  hint: 'Revisit c9_math_ch9_6 (Building Proofs from Axioms) and practice writing 3-step proofs where each.',
                  misconception: '**Students think "independent axioms" means "axioms that are about different topics" (e.g., one about lines, one about circles).** They see.' }
          ],
            remediations: { 'students-think-independent-axioms-means': { steps: ['** Show two formal axiom sets with *identical vocabulary* but different independence status: Set A: {A, B, A∧B} — not.', '** Ask: "In both sets, all axioms use A, B, C. Why is Set A not independent but Set B is?" Guide them to see it\'s about.', '** Have them attempt to derive Postulate 1 from Postulates 2–5 in Euclid — they\'ll see it\'s impossible not because.', '** Reinforce: "Independence = \'cannot be proved from the others using logic alone\'.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch9_8', difficulty: 'standard',
          question: 'The historical development of geometry traces the evolution from the.',
          hint: 'If stuck, revisit c8_math_ch9_2 (doubling the square construction) and c9_math_ch9_5.',
          misconception: 'Students think the Sulbasutras "knew the Pythagorean theorem" in the same sense Euclid proved it — i.e., as a universal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The historical development of geometry traces the evolution from the **Sulbasutras**',
                  options: ['The historical development of geometry traces the evolution from the **Sulbasutras**', 'In Euclidean geometry, a **point** is an undefined term representing an exact location in', 'Euclid\'s Axioms (Common Notions) are self-evident truths about equality and magnitude', 'Euclid\'s Five Postulates are the foundational geometric assumptions specific to geometry'],
                  hint: 'If stuck, revisit c8_math_ch9_2 (doubling the square construction) and c9_math_ch9_5 (axiom.',
                  misconception: 'Students think the Sulbasutras "knew the Pythagorean theorem" in the same sense Euclid proved it — i.e., as a universal logical truth.' }
          ],
            remediations: { 'the-sulbasutras-knew-the-pythagorean': { steps: ['If a student conflates the two, do this 3-step remediation: 1.', 'Show Baudhayana 1.48 Sanskrit + translation: "The areas produced by the length and breadth together equal the area.', 'Show Euclid I.47 proof structure: "Let ABC be a right triangle...', 'triangles ABD and FBC are congruent (I.4)...'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
