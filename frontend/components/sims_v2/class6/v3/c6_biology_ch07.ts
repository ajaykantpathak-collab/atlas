import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch07 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch07: SimDef = {
    id: 'v3_c6_biology_ch07',
    title: 'Living Creatures',
    subtitle: 'This node covers the characteristics that distinguish living from non-living things.',
    classLevel: 6, subject: 'biology', topic: 'Living Creatures',
    chapters: ['c6_biology_ch07'],
    nodeIds: ['c6_biology_ch07_001', 'c6_biology_ch07_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Play detective. Is a car living? It moves and needs petrol — but it does not grow from a baby car into.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is a life cycle?',
        options: ['A life cycle is the sequence of stages an organism passes through', 'being born and dying', 'a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal'],
        answer: 'A life cycle is the sequence of stages an organism passes through',
        hook: 'Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.',
    },
    teaching: [
        { title: 'Growth and development in living things', text: 'Living things are set apart from non-living things by characteristics they all share: they need food for energy (nutrition), they grow, they respire, they respond to stimuli around them, they remove.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch07_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch07_001', title: 'Growth and development in living things',
          caseStudy: { intro: 'Play detective. Is a car living? It moves and needs petrol — but it does not grow from a baby car into an adult car, it does not breathe, and it never makes.',
            decisions: [{ prompt: 'Name any five characteristics that distinguish living things from non-living things.', options: [
                { text: 'Living things need food (nutrition), grow, respire, respond to stimuli, excrete waste,', outcome: 'Living things need food (nutrition), grow, respire, respond to stimuli, excrete waste, move.' },
                { text: 'anything that moves is living', outcome: 'Not quite — Students often think anything that moves is living — so they call a fan or a car alive.', reveals: 'anything-that-moves-is-living' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch07_002', title: 'Life cycles — plants, mosquitoes, frogs',
          caseStudy: { intro: 'Watch a seed buried in wet soil — it swells, splits, sends a root down and a shoot up; that is germination, the start of a plant\'s life cycle.',
            decisions: [{ prompt: 'What is a life cycle?', options: [
                { text: 'A life cycle is the sequence of stages an organism passes through', outcome: 'A life cycle is the sequence of stages an organism passes through — from birth, through growth,.' },
                { text: 'being born and dying', outcome: 'Not quite — Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.', reveals: 'a-butterfly-s-caterpillar-or' },
                { text: 'a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal', outcome: 'Not quite — Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.', reveals: 'a-butterfly-s-caterpillar-or' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch07_002', title: 'Identify each idea',
          dissect: { specimen: 'Living Creatures', spots: [
            { id: 's1', label: 'Growth and development in living things', prompt: 'Which idea is this? — Living things are set apart from non-living things by characteristics they all share.', answer: 'Growth and development in living things', options: ['Growth and development in living things', 'Life cycles plants mosquitoes frogs'] },
            { id: 's2', label: 'Life cycles plants mosquitoes frogs', prompt: 'Which idea is this? — A life cycle is the sequence of stages an organism passes through from birth to the.', answer: 'Life cycles plants mosquitoes frogs', options: ['Life cycles plants mosquitoes frogs', 'Growth and development in living things'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch07_002', title: 'You made it',
          caseStudy: { intro: 'You finished Living Creatures — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch07_002', difficulty: 'standard',
          question: 'A life cycle is the sequence of stages an organism passes through from birth.',
          hint: 'If stuck, revisit "Living vs Non-living" — growth and reproduction are two of the signs.',
          misconception: 'Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.',
          parts: [
                { id: 'a', prompt: 'What is a life cycle?', answer: 'A life cycle is the sequence of stages an organism passes through',
                  options: ['A life cycle is the sequence of stages an organism passes through', 'being born and dying', 'a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal'],
                  hint: 'If stuck, revisit "Living vs Non-living" — growth and reproduction are two of the signs.',
                  misconception: 'Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.' }
          ],
            remediations: { 'a-butterfly-s-caterpillar-or': { steps: ['Draw two circles together — one for a plant, one for a frog — and place each stage as a point on the circle.', 'Trace the arrow from seed to flower to seed, and egg to tadpole to frog — the circle shape makes the idea stick.', 'Then show a photo of a caterpillar and a butterfly and ask "same animal or two?" — the answer lands the concept.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.',
          parts: [
                { id: 'a', prompt: 'At which stage does a plant actually make new seeds?', answer: 'At the flower stage',
                  options: ['At the flower stage', 'the seed makes seeds', 'a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal'],
                  hint: 'If stuck, revisit "Living vs Non-living" — growth and reproduction are two of the signs.',
                  misconception: 'Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.' },
                { id: 'b', prompt: 'Why is the life cycle called a cycle and not a line?', answer: 'Because the last stage',
                  options: ['Because the last stage', 'a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal'],
                  hint: 'If stuck, revisit "Living vs Non-living" — growth and reproduction are two of the signs.',
                  misconception: 'Students often think a butterfly\'s caterpillar or a mosquito\'s wriggler is a different animal.' }
          ],
            remediations: { 'a-butterfly-s-caterpillar-or': { steps: ['Draw two circles together — one for a plant, one for a frog — and place each stage as a point on the circle.', 'Trace the arrow from seed to flower to seed, and egg to tadpole to frog — the circle shape makes the idea stick.', 'Then show a photo of a caterpillar and a butterfly and ask "same animal or two?" — the answer lands the concept.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
