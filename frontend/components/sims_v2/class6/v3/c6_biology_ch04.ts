import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch04 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch04: SimDef = {
    id: 'v3_c6_biology_ch04',
    title: 'Diversity in the Living World',
    subtitle: 'This node covers the idea of diversity and simple grouping by observable features.',
    classLevel: 6, subject: 'biology', topic: 'Diversity in the Living World',
    chapters: ['c6_biology_ch04'],
    nodeIds: ['c6_biology_ch04_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Step outside or picture a park — grass, a banyan tree, an ant, a pigeon, a dog, a butterfly, and you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Name three features by which living organisms can be grouped.',
        options: ['Organisms can be grouped by habitat (where they live', 'beautiful', 'any creature that lives in water is a fish and anything that flies is a bird'],
        answer: 'Organisms can be grouped by habitat (where they live',
        hook: 'Students often think any creature that lives in water is a fish and anything that flies is a bird.',
    },
    teaching: [
        { title: 'Habitats and adaptations', text: 'Diversity in the living world means the great variety of living organisms that differ in size, shape, habitat, food habits, and ways of moving and reproducing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_biology_ch04_001', title: 'Habitats and adaptations',
          caseStudy: { intro: 'Step outside or picture a park — grass, a banyan tree, an ant, a pigeon, a dog, a butterfly, and you. All alive, all different.',
            decisions: [{ prompt: 'What does "diversity in the living world" mean?', options: [
                { text: 'Diversity in the living world means the great variety of living organisms that differ', outcome: 'Diversity in the living world means the great variety of living organisms that differ from one.' },
                { text: 'many kinds', outcome: 'Not quite — Students often think any creature that lives in water is a fish and anything that flies is a bird.', reveals: 'any-creature-that-lives-in' },
                { text: 'any creature that lives in water is a fish and anything that flies is a bird', outcome: 'Not quite — Students often think any creature that lives in water is a fish and anything that flies is a bird.', reveals: 'any-creature-that-lives-in' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch04_001', title: 'You made it',
          caseStudy: { intro: 'You finished Diversity in the Living World — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch04_001', difficulty: 'standard',
          question: 'Diversity in the living world means the great variety of living organisms that.',
          hint: 'If stuck, revisit "Sources of Food" — the plant/animal split is the first grouping.',
          misconception: 'Students often think any creature that lives in water is a fish and anything that flies is a bird.',
          parts: [
                { id: 'a', prompt: 'Name three features by which living organisms can be grouped.', answer: 'Organisms can be grouped by habitat (where they live',
                  options: ['Organisms can be grouped by habitat (where they live', 'beautiful', 'any creature that lives in water is a fish and anything that flies is a bird'],
                  hint: 'If stuck, revisit "Sources of Food" — the plant/animal split is the first grouping.',
                  misconception: 'Students often think any creature that lives in water is a fish and anything that flies is a bird.' },
                { id: 'b', prompt: 'Group these into water-dwellers and land-dwellers: fish, dog, lotus, eagle, whale, cat.', answer: 'Water-dwellers: fish, lotus, whale',
                  options: ['Water-dwellers: fish, lotus, whale', 'any creature that lives in water is a fish and anything that flies is a bird'],
                  hint: 'If stuck, revisit "Sources of Food" — the plant/animal split is the first grouping.',
                  misconception: 'Students often think any creature that lives in water is a fish and anything that flies is a bird.' }
          ],
            remediations: { 'any-creature-that-lives-in': { steps: ['Play "sorting shelf": write ten creature names on paper slips and ask the student to make two piles by any feature they.', 'The piles changing with the rule teaches that grouping follows the chosen feature.', 'End with the trap cases — whale, bat, mushroom — and ask "what feature fooled you here?"'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any creature that lives in water is a fish and anything that flies is a bird.',
          parts: [
                { id: 'a', prompt: 'A gardener sees a mushroom growing on a dead tree trunk. Is it a plant? Discuss.', answer: 'A mushroom looks plant-like but is a fungus — it cannot make its own food',
                  options: ['A mushroom looks plant-like but is a fungus — it cannot make its own food', 'any creature that lives in water is a fish and anything that flies is a bird'],
                  hint: 'If stuck, revisit "Sources of Food" — the plant/animal split is the first grouping.',
                  misconception: 'Students often think any creature that lives in water is a fish and anything that flies is a bird.' }
          ],
            remediations: { 'any-creature-that-lives-in': { steps: ['Play "sorting shelf": write ten creature names on paper slips and ask the student to make two piles by any feature they.', 'The piles changing with the rule teaches that grouping follows the chosen feature.', 'End with the trap cases — whale, bat, mushroom — and ask "what feature fooled you here?"'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
