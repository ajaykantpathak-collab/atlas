import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch05 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch05: SimDef = {
    id: 'v3_c6_biology_ch05',
    title: 'Living Creatures',
    subtitle: 'This node covers the meaning of habitat and adaptation with familiar examples.',
    classLevel: 6, subject: 'biology', topic: 'Living Creatures',
    chapters: ['c6_biology_ch05'],
    nodeIds: ['c6_biology_ch05_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you had to move house permanently — to a desert, or underwater, or to a frozen land.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Why would a polar bear\'s white fur fail as an adaptation in a forest?',
        options: ['In a forest, white fur would make the bear easy to spot against the dark trees', 'fur is always good', 'decides'],
        answer: 'In a forest, white fur would make the bear easy to spot against the dark trees',
        hook: 'Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish chooses to grow.',
    },
    teaching: [
        { title: 'Characteristics of living things', text: 'A habitat is the natural home of a living organism — the place where it lives and gets food, water, shelter, and air.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_biology_ch05_001', title: 'Characteristics of living things',
          caseStudy: { intro: 'Imagine you had to move house permanently — to a desert, or underwater, or to a frozen land. You would need completely different tools and clothing for each.',
            decisions: [{ prompt: 'What is a habitat? Give two examples.', options: [
                { text: 'A habitat is the natural home of an organism where it finds food, water, shelter, and air', outcome: 'A habitat is the natural home of an organism where it finds food, water, shelter, and air.' },
                { text: 'a place', outcome: 'Not quite — Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish.', reveals: 'a-creature-decides-to-adapt' },
                { text: 'decides', outcome: 'Not quite — Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish.', reveals: 'a-creature-decides-to-adapt' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch05_001', title: 'You made it',
          caseStudy: { intro: 'You finished Living Creatures — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch05_001', difficulty: 'standard',
          question: 'A habitat is the natural home of a living organism — the place where it lives.',
          hint: 'If stuck, revisit "Diversity in the Living World" — the idea that each kind is built.',
          misconception: 'Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish chooses to grow.',
          parts: [
                { id: 'a', prompt: 'Why would a polar bear\'s white fur fail as an adaptation in a forest?', answer: 'In a forest, white fur would make the bear easy to spot against the dark trees',
                  options: ['In a forest, white fur would make the bear easy to spot against the dark trees', 'fur is always good', 'decides'],
                  hint: 'If stuck, revisit "Diversity in the Living World" — the idea that each kind is built differently.',
                  misconception: 'Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish chooses to grow fins.' }
          ],
            remediations: { 'a-creature-decides-to-adapt': { steps: ['If the student confuses habitat with adaptation, teach the pair as "address vs toolkit": habitat is WHERE it lives.', 'Practise matching triples — fish–water–fins, camel–desert–hump — until the student separates place from feature every.', 'Then flip it: give a feature (webbed feet) and ask which habitat needs it.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish chooses to grow.',
          parts: [
                { id: 'a', prompt: 'A frog lives on land and in water. Name one adaptation for each part of its habitat.', answer: 'For water: the frog has webbed feet for swimming',
                  options: ['For water: the frog has webbed feet for swimming', 'decides'],
                  hint: 'If stuck, revisit "Diversity in the Living World" — the idea that each kind is built differently.',
                  misconception: 'Students often think a creature "decides" to adapt — that a camel chooses to store water or a fish chooses to grow fins.' }
          ],
            remediations: { 'a-creature-decides-to-adapt': { steps: ['If the student confuses habitat with adaptation, teach the pair as "address vs toolkit": habitat is WHERE it lives.', 'Practise matching triples — fish–water–fins, camel–desert–hump — until the student separates place from feature every.', 'Then flip it: give a feature (webbed feet) and ask which habitat needs it.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
