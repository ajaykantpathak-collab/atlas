import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch05_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch05_p2: SimDef = {
    id: 'v3_c10_engl_ch05_p2',
    title: 'Glimpses of India · Part 2/2',
    subtitle: 'Hear the jhang-jhang that still runs a Goan village\'s mornings',
    classLevel: 10, subject: 'engl', topic: 'Glimpses of India · Part 2/2',
    chapters: ['c10_engl_ch05'],
    nodeIds: ['c10_engl_cbse_05_007', 'c10_engl_cbse_05_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a food historian tracing how bread became Goan', intro: 'Before alarm clocks, a bamboo staff\'s rhythm told a Goan village that morning — and fresh pao — had arrived.', goal: 'Explain the Portuguese legacy in Goan baking and why the pader is a cultural institution, not a vendor.' },
    discovery: {
        question: 'In a Goan village, a man in a knee-length kabai arrives each morning to the \'jhang-jhang\' of a bamboo staff — and the text insists he is NOT a relic of the past. What is he really?',
        options: ['A living cultural institution — his breads are still essential to every Goan festival and marriage', 'A quaint historical figure — the last of the old Portuguese bakers', 'Just a bread-seller doing his morning and evening rounds', 'A tourist attraction maintained for nostalgia'],
        answer: 'A living cultural institution — his breads are still essential to every Goan festival and marriage',
        hook: 'The pader didn\'t survive as a museum piece. Bol at Christmas, sandwiches at engagements — Goa took a Portuguese import and made it impossible to celebrate without.',
    },
    teaching: [
        { title: 'Theme: Cultural Diversity and Regional Identity in India', text: 'Cultural diversity and regional identity in "Glimpses of India" refers to the way the three prose pieces — "A Baker from Goa," "Coorg," and "Tea from Assam" — each portray a distinct region\'s unique.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the baker\'s daily route through the village — his kabai, his furnace, his jhang-jhang — and show how a colonial legacy became a Goan necessity.',
        labels: ['Theme: Cultural Diversity', 'Descriptive Writing: Landscape, People'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_007', title: 'Theme: Cultural Diversity and Regional Identity in India',
          caseStudy: { intro: 'Imagine you are a travel blogger visiting Goa, Coorg, and Assam in one trip.',
            decisions: [{ prompt: 'What is the central theme that connects the three parts of "Glimpses of India"?', options: [
                { text: 'The central theme is cultural diversity and regional identity', outcome: 'The central theme is cultural diversity and regional identity — each part showcases a distinct.' },
                { text: 'the theme is about food', outcome: 'Not quite — Students treat the three pieces as isolated stories and write three separate mini-summaries in.', reveals: 'students-treat-the-three-pieces' },
                { text: 'it\'s about travel', outcome: 'Not quite — Students treat the three pieces as isolated stories and write three separate mini-summaries in.', reveals: 'students-treat-the-three-pieces' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_008', title: 'Descriptive Writing: Landscape, People and Customs Across Regions',
          caseStudy: { intro: 'Imagine you have a pen pal in another country who has never seen India.',
            decisions: [{ prompt: 'List the five senses that descriptive writing should appeal to, and give one example from "Glimpses of India" for each sense (e.g., sight.', options: [
                { text: 'The five senses are sight, sound, smell, touch, and taste', outcome: 'The five senses are sight, sound, smell, touch, and taste. Examples from the text: Sight — "the.' },
                { text: 'adjectives', outcome: 'Not quite — Students believe descriptive writing means using as many adjectives as possible ("beautiful, green.', reveals: 'descriptive-writing-means-using-as' },
                { text: 'describing words', outcome: 'Not quite — Students believe descriptive writing means using as many adjectives as possible ("beautiful, green.', reveals: 'descriptive-writing-means-using-as' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A grandmother describes how, in her childhood, the neighbourhood baker came each morning with a jingling basket and kept every family\'s monthly account in pencil on the wall. Her grandson scoffs: \'Old trades like that died out because delivery apps are just better.\'',
            decisions: [{ prompt: 'What does the Goan \'pader\' tradition in the chapter suggest about what would actually be lost?', options: [
                { text: 'The pader was not just a bread-seller — he was a daily ritual, a trusted figure whose jingling staff woke the village, and his pencil-on-the-wall accounts ran on relationship rather than apps. When such a trade disappears, what is lost is a sensory rhythm, human trust and a living piece of Goa\'s Portuguese-era culture — not merely a delivery channel.', outcome: 'The chapter treats the pader as a living link to the past: the loaves, the morning routine and the informal credit all carry cultural memory that an app notification cannot replace.' },
                { text: 'The grandson is right — trades survive only if they are efficient, so the pader\'s disappearance would just prove he was inferior.', outcome: 'Survival is not a verdict on worth — the pader endured because he was woven into community life, and his loss would be cultural, not just commercial.', reveals: 'new-always-beats-old' },
                { text: 'Grandmother\'s memory proves the pader was mainly about nostalgia — the actual bread and accounts were incidental.', outcome: 'The text shows the opposite — the bread was a daily necessity and the monthly pencil accounts a real trust-based economy; nostalgia is how it is remembered, not what it was.', reveals: 'tradition-is-only-nostalgia' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_008', title: 'You made it',
          caseStudy: { intro: 'Culture isn\'t what invaders leave behind; it\'s what people choose to keep. The pader endures because Goa kneaded Portuguese bread into its own identity.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_007', difficulty: 'standard',
          question: 'Cultural diversity and regional identity in "Glimpses of India" refers to the.',
          hint: 'If stuck, review the "Cultural Marker + Historical Force" table from nodes 001-006 and.',
          misconception: 'Students treat the three pieces as isolated stories and write three separate mini-summaries in a "theme" answer, using.',
          parts: [
                { id: 'a', prompt: 'What is the central theme that connects the three parts of "Glimpses of India"?', answer: 'The central theme is cultural diversity and regional identity',
                  options: ['The central theme is cultural diversity and regional identity', 'the theme is about food', 'it\'s about travel'],
                  hint: 'If stuck, review the "Cultural Marker + Historical Force" table from nodes 001-006 and practice.',
                  misconception: 'Students treat the three pieces as isolated stories and write three separate mini-summaries in a "theme" answer, using phrases like "In the.' },
                { id: 'b', prompt: 'Explain in your own words how the Portuguese legacy in Goa differs from the British legacy in Assam as presented in the chapter.', answer: 'The Portuguese legacy in Goa lives on in everyday cultural practices',
                  options: ['The Portuguese legacy in Goa lives on in everyday cultural practices', 'both are colonial leftovers'],
                  hint: 'If stuck, review the "Cultural Marker + Historical Force" table from nodes 001-006 and practice.',
                  misconception: 'Students treat the three pieces as isolated stories and write three separate mini-summaries in a "theme" answer, using phrases like "In the.' },
                { id: 'c', prompt: 'Compare how the writers use landscape description to establish regional identity in any two of the three pieces.', answer: 'In "Coorg," the landscape',
                  options: ['In "Coorg," the landscape', 'beautiful'],
                  hint: 'If stuck, review the "Cultural Marker + Historical Force" table from nodes 001-006 and practice.',
                  misconception: 'Students treat the three pieces as isolated stories and write three separate mini-summaries in a "theme" answer, using phrases like "In the.' }
          ],
            remediations: { 'students-treat-the-three-pieces': { steps: ['Give the student a one-page "Theme Synthesis Template": Column A = Region, Column B = 2 Cultural Markers, Column.', 'Have them fill it using only their notes from nodes 001-006.', 'Model turning the filled template into a paragraph using the connector: "While Goa\'s ___ reflects ___, Coorg\'s ___.', 'Practice with two past board questions on this theme, marking where each paragraph uses the template.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_008', difficulty: 'standard',
          question: 'Descriptive writing about landscapes, people, and customs across regions is the.',
          hint: 'Review sensory detail identification using c6_english_u1_009 (Writing: Letter Writing and.',
          misconception: 'Students believe descriptive writing means using as many adjectives as possible ("beautiful, green, misty, brave.',
          parts: [
                { id: 'a', prompt: 'List the five senses that descriptive writing should appeal to, and give one example from "Glimpses of India" for each sense (e.g., sight: "the baker\'s bamboo.', answer: 'The five senses are sight, sound, smell, touch, and taste',
                  options: ['The five senses are sight, sound, smell, touch, and taste', 'adjectives', 'describing words', 'beautiful, green, misty, brave, hospitable'],
                  hint: 'Review sensory detail identification using c6_english_u1_009 (Writing: Letter Writing and.',
                  misconception: 'Students believe descriptive writing means using as many adjectives as possible ("beautiful, green, misty, brave, hospitable").' },
                { id: 'b', prompt: 'Rewrite this flat sentence into a descriptive showing sentence using at least two senses and one figurative device: "The tea garden in Assam is very large and.', answer: 'Step 1: Identify the core image',
                  options: ['Step 1: Identify the core image', 'A wrong answer that merely adds adjectives (', 'beautiful, green, misty, brave, hospitable'],
                  hint: 'Review sensory detail identification using c6_english_u1_009 (Writing: Letter Writing and.',
                  misconception: 'Students believe descriptive writing means using as many adjectives as possible ("beautiful, green, misty, brave, hospitable").' },
                { id: 'c', prompt: 'Compare these two descriptions of Coorg\'s landscape. Which is more effective for a board exam answer and why?', answer: 'Description B is more effective',
                  options: ['Description B is more effective', 'beautiful, green, misty, brave, hospitable'],
                  hint: 'Review sensory detail identification using c6_english_u1_009 (Writing: Letter Writing and.',
                  misconception: 'Students believe descriptive writing means using as many adjectives as possible ("beautiful, green, misty, brave, hospitable").' }
          ],
            remediations: { 'descriptive-writing-means-using-as': { steps: ['Give the student a photograph of a landscape. Ask them to list 10 things they see, 5 they might hear, 3 they might.', 'Have them convert three items into "showing" sentences using a simile or metaphor.', 'Provide a model paragraph from the textbook (e.g., the opening of "Coorg") and ask them to highlight every sensory.', 'Co-write a paragraph together using the spatial organisation framework (foreground → middle ground → background).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe descriptive writing means using as many adjectives as possible ("beautiful, green, misty, brave.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s descriptive paragraph opening: "The people of Coorg are very brave and hospitable. They wear a special dress called kuppia.', answer: 'No, it would not score full marks',
                  options: ['No, it would not score full marks', 'beautiful, green, misty, brave, hospitable'],
                  hint: 'Review sensory detail identification using c6_english_u1_009 (Writing: Letter Writing and.',
                  misconception: 'Students believe descriptive writing means using as many adjectives as possible ("beautiful, green, misty, brave, hospitable").' }
          ],
            remediations: { 'descriptive-writing-means-using-as': { steps: ['Give the student a photograph of a landscape. Ask them to list 10 things they see, 5 they might hear, 3 they might.', 'Have them convert three items into "showing" sentences using a simile or metaphor.', 'Provide a model paragraph from the textbook (e.g., the opening of "Coorg") and ask them to highlight every sensory.', 'Co-write a paragraph together using the spatial organisation framework (foreground → middle ground → background).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
