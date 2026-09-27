import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch03 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch03: SimDef = {
    id: 'v3_c6_biology_ch03',
    title: 'Diversity in the Living World',
    subtitle: 'This node covers the external parts of a flowering plant and their functions, plus the.',
    classLevel: 6, subject: 'biology', topic: 'Diversity in the Living World',
    chapters: ['c6_biology_ch03'],
    nodeIds: ['c6_biology_ch03_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Pull up a small plant carefully — a mustard seedling or a tuft of grass — and hold the whole thing in your.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Why is the leaf called the kitchen of the plant?',
        options: ['The leaf is called the kitchen', 'because leaves are eaten', 'roots are only there to hold the plant'],
        answer: 'The leaf is called the kitchen',
        hook: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the.',
    },
    teaching: [
        { title: 'Grouping plants and animals', text: 'A typical flowering plant has two systems: the shoot system above the ground — stem, leaves, flowers, and fruits — and the root system below it.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch03_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch03_001', title: 'Grouping plants and animals',
          caseStudy: { intro: 'Pull up a small plant carefully — a mustard seedling or a tuft of grass — and hold the whole thing in your hand.',
            decisions: [{ prompt: 'Name the two systems of a plant and the parts in each.', options: [
                { text: 'The root system (roots, below ground) and the shoot system (stem, leaves, flowers, and', outcome: 'The root system (roots, below ground) and the shoot system (stem, leaves, flowers, and fruits.' },
                { text: 'the plant', outcome: 'Not quite — Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth.', reveals: 'roots-are-only-there-to' },
                { text: 'roots are only there to hold the plant', outcome: 'Not quite — Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth.', reveals: 'roots-are-only-there-to' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch03_001', title: 'You made it',
          caseStudy: { intro: 'You finished Diversity in the Living World — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch03_001', difficulty: 'standard',
          question: 'A typical flowering plant has two systems: the shoot system above the ground.',
          hint: 'If stuck, revisit "Sources of Food" — plants as producers.',
          misconception: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the.',
          parts: [
                { id: 'a', prompt: 'What are the two main jobs of roots?', answer: 'Roots anchor the plant firmly in the soil and absorb water and minerals from it',
                  options: ['Roots anchor the plant firmly in the soil and absorb water and minerals from it', 'roots are only there to hold the plant'],
                  hint: 'If stuck, revisit "Sources of Food" — plants as producers.',
                  misconception: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the water and minerals the.' },
                { id: 'b', prompt: 'How are a carrot\'s roots different from a wheat plant\'s roots?', answer: 'A carrot has a taproot',
                  options: ['A carrot has a taproot', 'roots are only there to hold the plant'],
                  hint: 'If stuck, revisit "Sources of Food" — plants as producers.',
                  misconception: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the water and minerals the.' },
                { id: 'c', prompt: 'Why is the leaf called the kitchen of the plant?', answer: 'The leaf is called the kitchen',
                  options: ['The leaf is called the kitchen', 'because leaves are eaten', 'roots are only there to hold the plant'],
                  hint: 'If stuck, revisit "Sources of Food" — plants as producers.',
                  misconception: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the water and minerals the.' }
          ],
            remediations: { 'roots-are-only-there-to': { steps: ['Sketch a plant together and label each part with one action word — roots "anchor + drink," stem "holds + carries," leaf.', 'Cover the labels and retell the four jobs from memory.', 'Go outside, point at a real plant, and have the student name each part\'s job before touching the next one.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the.',
          parts: [
                { id: 'a', prompt: 'What does a flower develop into, and why does it matter?', answer: 'A flower develops into a fruit containing seeds — it matters',
                  options: ['A flower develops into a fruit containing seeds — it matters', 'roots are only there to hold the plant'],
                  hint: 'If stuck, revisit "Sources of Food" — plants as producers.',
                  misconception: 'Students often think roots are only there to hold the plant. Roots are also the plant\'s mouth — they absorb all the water and minerals the.' }
          ],
            remediations: { 'roots-are-only-there-to': { steps: ['Sketch a plant together and label each part with one action word — roots "anchor + drink," stem "holds + carries," leaf.', 'Cover the labels and retell the four jobs from memory.', 'Go outside, point at a real plant, and have the student name each part\'s job before touching the next one.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
