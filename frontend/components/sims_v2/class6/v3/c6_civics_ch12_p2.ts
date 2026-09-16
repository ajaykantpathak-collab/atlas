import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch12_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch12_p2: SimDef = {
    id: 'v3_c6_civics_ch12_p2',
    title: 'Grassroots Democracy · Part 2/2',
    subtitle: 'Why does the smallest government often solve the biggest local problems?',
    classLevel: 6, subject: 'civics', topic: 'Grassroots Democracy · Part 2/2',
    chapters: ['c6_civics_ch12'],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_022'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Gram Sabha member with a broken fence to fix', intro: 'The playground fence is broken and the state office is 300 km away. Luckily, democracy has roots — and they reach right into your village square.', goal: 'Experience participation as everyday problem-solving, not just election-day voting.' },
    discovery: {
        question: 'A village has 200 children and zero swings. Should they write to the state capital and wait, or gather in the Gram Sabha and decide it themselves? Which path gets kids swinging sooner?',
        options: ['The Gram Sabha — the people closest to a problem can see it, discuss it and fix it fastest', 'The state government — bigger government always means better solutions', 'Neither — villages can\'t build anything without outside engineers', 'Write to the Prime Minister — the very top always decides best'],
        answer: 'The Gram Sabha — the people closest to a problem can see it, discuss it and fix it fastest',
        hook: 'Democracy doesn\'t only live in faraway parliaments. Its roots are in your street — where neighbours meet, argue, decide and fix things together.',
    },
    teaching: [
        { title: 'Local Self-Government and Social Infrastructure', text: 'Local self-government is a system where people in villages and towns manage their own daily needs, like schools and clinics, through elected councils like the Gram Panchayat.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch12_021', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Bring a broken-fence problem to the Gram Sabha — gather the villagers, hear every side, and steer the meeting toward a fix the whole village owns.',
        labels: ['Local Self-Government and Social', 'Government Services in Daily'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch12_021', title: 'Local Self-Government and Social Infrastructure',
          caseStudy: { intro: 'Think about your own school: who makes sure there is a working water tap, a clean classroom, or a paved path to the gate?',
            decisions: [{ prompt: 'What is one example of social infrastructure that a Gram Panchayat might manage in a village?', options: [
                { text: 'A primary school or a primary health centre is an example', outcome: 'A primary school or a primary health centre is an example. A wrong answer (like "building.' },
                { text: 'building a factory', outcome: 'Not quite — Students often think "infrastructure" only means things like roads, bridges, or electricity.', reveals: 'infrastructure-only-means-things-like' },
                { text: 'infrastructure', outcome: 'Not quite — Students often think "infrastructure" only means things like roads, bridges, or electricity.', reveals: 'infrastructure-only-means-things-like' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_022', title: 'Government Services in Daily Life',
          caseStudy: { intro: 'Think about your walk to school this morning: did you travel on a paved road? Did you see a street light, a public park, or a government school building?',
            decisions: [{ prompt: 'Name two services that the local government provides to the people in a village or town.', options: [
                { text: 'Water supply and road maintenance', outcome: 'Water supply and road maintenance. A wrong answer (like "my own bicycle" or "my house") reveals the.' },
                { text: 'my own bicycle', outcome: 'Not quite — Students often think "Government" only means the Prime Minister or the President in the capital.', reveals: 'government-only-means-the-prime' },
                { text: 'my house', outcome: 'Not quite — Students often think "Government" only means the Prime Minister or the President in the capital.', reveals: 'government-only-means-the-prime' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_021', title: 'Use it in the wild',
          caseStudy: { intro: 'A village full of children has no playground. At the weekly meeting, one elder suggests writing a petition to the state government in the distant capital, \'since real power sits up there.\'',
            decisions: [{ prompt: 'Is the state capital the right address for this problem?', options: [
                { text: 'No — this is exactly what the Gram Panchayat is for. A local body knows the village\'s children, the available land and the budget needed, and can act quickly because the decision sits with the people affected. The three-tier system deliberately keeps village-sized problems in the village, reserving bigger issues for higher levels.', outcome: 'Local problems are solved best locally — a playground needs no state machinery, only the village institution designed to handle exactly such community needs.' },
                { text: 'The elder is right — only the state government has real authority, so every decision should travel up to the capital.', outcome: 'That would bury a small local fix in distant bureaucracy — grassroots democracy exists precisely so villages decide their own everyday matters.', reveals: 'only-state-can-act' },
                { text: 'Neither should act — a playground is a private want, and government at any level has no role in children\'s recreation.', outcome: 'Common village needs like play spaces, water and paths are exactly what local self-government exists to provide — a playground is a public good, not a private luxury.', reveals: 'playgrounds-not-public' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_022', title: 'You made it',
          caseStudy: { intro: 'Grassroots democracy isn\'t voting once in five years — it\'s neighbours solving problems all year round. Power planted close to the ground grows fastest.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch12_021', difficulty: 'standard',
          question: 'Local self-government is a system where people in villages and towns manage.',
          hint: 'Review the "Gram Panchayat" section of the NCERT text, specifically focusing on their.',
          misconception: 'Students often think "infrastructure" only means things like roads, bridges, or electricity (physical infrastructure).',
          parts: [
                { id: 'a', prompt: 'What is one example of social infrastructure that a Gram Panchayat might manage in a village?', answer: 'A primary school or a primary health centre is an example',
                  options: ['A primary school or a primary health centre is an example', 'building a factory', 'infrastructure'],
                  hint: 'Review the "Gram Panchayat" section of the NCERT text, specifically focusing on their daily tasks.',
                  misconception: 'Students often think "infrastructure" only means things like roads, bridges, or electricity (physical infrastructure).' },
                { id: 'b', prompt: 'If a village wants to improve the attendance of girls in the local school, what is one "social infrastructure" change the Panchayat could make?', answer: 'They could build a private, functioning toilet',
                  options: ['They could build a private, functioning toilet', 'giving money to families', 'infrastructure'],
                  hint: 'Review the "Gram Panchayat" section of the NCERT text, specifically focusing on their daily tasks.',
                  misconception: 'Students often think "infrastructure" only means things like roads, bridges, or electricity (physical infrastructure).' }
          ],
            remediations: { 'infrastructure-only-means-things-like': { steps: ['Ask the student to draw a "Human Needs Map." On one side, draw things a body needs to grow (food, health, learning).', 'On the other, draw things a machine needs (fuel, parts).', 'Point out that the first side represents social infrastructure managed by the local government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_021', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "infrastructure" only means things like roads, bridges, or electricity (physical infrastructure).',
          parts: [
                { id: 'a', prompt: 'Is it more important for a village to have a big statue or a well-stocked primary health clinic? Justify your choice.', answer: 'A health clinic is more important',
                  options: ['A health clinic is more important', 'infrastructure'],
                  hint: 'Review the "Gram Panchayat" section of the NCERT text, specifically focusing on their daily tasks.',
                  misconception: 'Students often think "infrastructure" only means things like roads, bridges, or electricity (physical infrastructure).' }
          ],
            remediations: { 'infrastructure-only-means-things-like': { steps: ['Ask the student to draw a "Human Needs Map." On one side, draw things a body needs to grow (food, health, learning).', 'On the other, draw things a machine needs (fuel, parts).', 'Point out that the first side represents social infrastructure managed by the local government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_022', difficulty: 'standard',
          question: 'Government services are essential facilities and support systems provided.',
          hint: 'Review the concept of "Public vs. Private" property.',
          misconception: 'Students often think "Government" only means the Prime Minister or the President in the capital.',
          parts: [
                { id: 'a', prompt: 'Name two services that the local government provides to the people in a village or town.', answer: 'Water supply and road maintenance',
                  options: ['Water supply and road maintenance', 'my own bicycle', 'my house', 'Government'],
                  hint: 'Review the concept of "Public vs. Private" property.',
                  misconception: 'Students often think "Government" only means the Prime Minister or the President in the capital.' }
          ],
            remediations: { 'government-only-means-the-prime': { steps: ['First, show the student the three-tier pyramid diagram from their textbook.', 'Point to the "Village" level and explain that this is the "closest" government to them.', 'Ask them to name their local Sarpanch or Ward Member to ground the concept in reality.', 'Finally, explain that "Government" happens at many levels, and the one closest to them handles their daily neighborhood.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
