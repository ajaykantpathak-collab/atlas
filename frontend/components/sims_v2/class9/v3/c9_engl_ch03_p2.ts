import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch03_p2: SimDef = {
    id: 'v3_c9_engl_ch03_p2',
    title: 'Winds of Change · Part 2/2',
    subtitle: 'A fan\'s two-thousand-year glow-up',
    classLevel: 9, subject: 'engl', topic: 'Winds of Change · Part 2/2',
    chapters: ['c9_engl_ch03'],
    nodeIds: ['c9_engl_ch3_6', 'c9_engl_ch3_7', 'c9_engl_ch3_8', 'c9_engl_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian of everyday objects', intro: 'The humble hand fan went from a leaf to a jewelled royal emblem to a servant-pulled ceiling machine. Your job: squeeze that entire evolution into a paragraph without breaking its timeline.', goal: 'Summarise an expository \'evolution\' text by preserving chronological stages and causal links — selecting major transitions and dropping decorative details.' },
    discovery: {
        question: 'Someone \'summarises\' the pankha\'s history as: leaf fans, bamboo fans, cloth fans, electric fans — all stages, no order, no links. What\'s wrong with it?',
        options: ['Evolution is a chain, not a list — each stage caused the next, so a summary must keep the timeline and the \'as X improved, Y replaced it\' links', 'Nothing — all four stages are named', 'It should start with electric fans', 'It needs more decoration details'],
        answer: 'Evolution is a chain, not a list — each stage caused the next, so a summary must keep the timeline and the \'as X improved, Y replaced it\' links',
        hook: 'In an evolutionary text, order IS the meaning. The Mughal jewelled pankha only exists because medieval weavers and Sultanate painters came first — scramble the sequence and you\'ve deleted the logic, not summarised it.',
    },
    teaching: [
        { title: 'Materials and Techniques: Bamboo, Cane, Palm Leaf, Silk', text: 'Materials and techniques of traditional pankha making refer to the specific natural materials (bamboo, cane, palm leaf, silk) and craft methods (splitting, weaving, joining, mounting on handles) used.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch3_6', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the pankha\'s full journey — palmyra leaf to woven bamboo to painted cloth to rope-pulled colonial punkah to electric fan — and compress it into 100 words where every stage arrives because the last one allowed it.',
        labels: ['Materials and Techniques: Bamboo,', 'Literary Device: Expository Structure', 'Vocabulary in Context: Words', 'Cultural Core: How Crafts'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch3_6', title: 'Materials and Techniques: Bamboo, Cane, Palm Leaf, Silk',
          caseStudy: { intro: 'Hold a traditional pankha in your hand. Feel the bamboo frame — it is light, flexible, and strong.',
            decisions: [{ prompt: 'Name the four main materials used in traditional pankha making and state one property of each that makes it suitable for fan construction.', options: [
                { text: 'Bamboo: light, flexible, strong', outcome: 'Bamboo: light, flexible, strong — ideal for frames and handles.' },
                { text: 'plastic and metal', outcome: 'Not quite — Students think craft materials are chosen purely for aesthetics or cost.', reveals: 'craft-materials-are-chosen-purely' },
                { text: 'craft materials are chosen purely for aesthetics or cost', outcome: 'Not quite — Students think craft materials are chosen purely for aesthetics or cost.', reveals: 'craft-materials-are-chosen-purely' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_8', title: 'Vocabulary in Context: Words for Craft and Design',
          caseStudy: { intro: 'Imagine you\'re writing a museum label for a 200-year-old Rajasthani pankha—you can\'t just say "it\'s a pretty fan." You need words like *warp*, *weft*, *paisley.',
            decisions: [{ prompt: 'Define the term "warp" in the context of textile-related crafts like pankha-making, and explain how it differs from "weft."', options: [
                { text: 'Warp refers to the lengthwise threads held stationary on a loom or frame, while weft', outcome: 'Warp refers to the lengthwise threads held stationary on a loom or frame, while weft refers to the.' },
                { text: 'warp means the design', outcome: 'Not quite — Students treat craft vocabulary as interchangeable "fancy words" for general descriptors (e.g.', reveals: 'students-treat-craft-vocabulary-as' },
                { text: 'warp and weft are the same', outcome: 'Not quite — Students treat craft vocabulary as interchangeable "fancy words" for general descriptors (e.g.', reveals: 'students-treat-craft-vocabulary-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'Evolution of the Pankha,\' a student writes: \'There were leaf fans, bamboo fans, cloth fans and electric fans.\' For order, he puts the Mughal jewelled pankha before the medieval woven one \'because it sounds more impressive.\'',
            decisions: [{ prompt: 'What two things does this summary get wrong?', options: [
                { text: 'It lists stages with no development — \'as weaving improved, bamboo replaced leaves; later courts turned the fan ceremonial\' shows how each stage produced the next — and it scrambles the timeline, which in an evolutionary text destroys the logic itself.', outcome: 'This fixes both faults: causal connectors between stages and strict chronology are what make it an evolution, not a catalogue.' },
                { text: 'Only the wording is weak — any order is fine as long as every stage gets mentioned.', outcome: 'In a text about change over time, order is the argument; a jumbled \'evolution\' proves nothing evolved.', reveals: 'order-is-optional' },
                { text: 'The summary needs more detail, not less — adding the colours and patterns of each fan would fix it.', outcome: 'Detail without sequence or causation makes the warehouse bigger, not the summary better; selection and timeline are the skills being tested.', reveals: 'more-detail-better' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Summarising \'how X evolved\' means keeping the cause-and-effect spine: each stage is an answer to the last stage\'s limits. Lose the chronology and you\'ve lost the story.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch3_6', difficulty: 'standard',
          question: 'Materials and techniques of traditional pankha making refer to the specific.',
          hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) for the overall context.',
          misconception: 'Students think craft materials are chosen purely for aesthetics or cost.',
          parts: [
                { id: 'a', prompt: 'Name the four main materials used in traditional pankha making and state one property of each that makes it suitable for fan construction.', answer: 'Bamboo: light, flexible, strong',
                  options: ['Bamboo: light, flexible, strong', 'plastic and metal', 'craft materials are chosen purely for aesthetics or cost'],
                  hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) for the overall context, and review.',
                  misconception: 'Students think craft materials are chosen purely for aesthetics or cost.' },
                { id: 'b', prompt: 'Describe the technique of making a palm leaf pankha in three steps.', answer: 'Step 1: Harvest mature palm leaves and dry them flat to prevent curling',
                  options: ['Step 1: Harvest mature palm leaves and dry them flat to prevent curling', 'just cut and attach', 'omits drying (e', 'craft materials are chosen purely for aesthetics or cost'],
                  hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) for the overall context, and review.',
                  misconception: 'Students think craft materials are chosen purely for aesthetics or cost.' }
          ],
            remediations: { 'craft-materials-are-chosen-purely': { steps: ['Show the student samples (or photos) of bamboo, cane, palm leaf, and silk pankhas.', 'Ask them to describe how each feels, how it is made, and where the material comes from.', 'Create a table: Material | Source region | Working property | Technique.', 'Have them fill it from the text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think craft materials are chosen purely for aesthetics or cost.',
          parts: [
                { id: 'a', prompt: 'Explain how regional geography determines the choice of pankha material. Give two examples.', answer: 'Geography determines material availability',
                  options: ['Geography determines material availability', 'all regions use the same material', 'craft materials are chosen purely for aesthetics or cost'],
                  hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) for the overall context, and review.',
                  misconception: 'Students think craft materials are chosen purely for aesthetics or cost.' },
                { id: 'b', prompt: 'A craftsperson wants to make a decorative pankha for a wedding gift. Which material would you recommend and why?', answer: 'Silk is the best choice for a decorative wedding pankha because: (1) Aesthetics',
                  options: ['Silk is the best choice for a decorative wedding pankha because: (1) Aesthetics', 'bamboo because it is cheap', 'craft materials are chosen purely for aesthetics or cost'],
                  hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) for the overall context, and review.',
                  misconception: 'Students think craft materials are chosen purely for aesthetics or cost.' }
          ],
            remediations: { 'craft-materials-are-chosen-purely': { steps: ['Show the student samples (or photos) of bamboo, cane, palm leaf, and silk pankhas.', 'Ask them to describe how each feels, how it is made, and where the material comes from.', 'Create a table: Material | Source region | Working property | Technique.', 'Have them fill it from the text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_7', difficulty: 'standard',
          question: 'Expository structure is the organizational framework of informative writing.',
          hint: 'Review \'topic sentence + supporting details\' from Class 8 descriptive writing.',
          misconception: 'Students believe expository writing is \'just listing facts in order\' and that \'objective tone\' means \'no strong verbs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Expository structure is the organizational framework of informative writing that presents',
                  options: ['Expository structure is the organizational framework of informative writing that presents', 'A text summary of an expository passage like "Evolution of the Pankha" is a concise,', 'Values of preserving indigenous crafts and heritage refer to the ethical, cultural, and', 'Pankhas (hand fans) are traditional Indian craft items that embody cultural heritage'],
                  hint: 'Review \'topic sentence + supporting details\' from Class 8 descriptive writing (c8_engl_ch4_12) and.',
                  misconception: 'Students believe expository writing is \'just listing facts in order\' and that \'objective tone\' means \'no strong verbs or clear stance.\'.' }
          ],
            remediations: { 'expository-writing-is-just-listing': { steps: ['Show two 50-word paragraphs on the same facts: one \'grocery list,\' one structured with thesis + classification.', 'Ask: \'Which helps you UNDERSTAND the craft better?', 'Color-code the structured version: Thesis (red), Topic sentences (blue), Evidence (green), Transitions (yellow).', 'Have student rewrite the grocery list using the color-coded skeleton.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_8', difficulty: 'standard',
          question: 'From \'Evolution of the Pankha\': the skill or concept this node teaches, applied.',
          hint: 'Review "context clue strategies" from c6_english_u3_027 and "expository text structure".',
          misconception: 'Students treat craft vocabulary as interchangeable "fancy words" for general descriptors (e.g., using "motif,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'Evolution of the Pankha\': the skill or concept this node teaches, applied to the',
                  options: ['From \'Evolution of the Pankha\': the skill or concept this node teaches, applied to the', 'A text summary of an expository passage like "Evolution of the Pankha" is a concise,', 'Values of preserving indigenous crafts and heritage refer to the ethical, cultural, and', 'Pankhas (hand fans) are traditional Indian craft items that embody cultural heritage'],
                  hint: 'Review "context clue strategies" from c6_english_u3_027 and "expository text structure" from.',
                  misconception: 'Students treat craft vocabulary as interchangeable "fancy words" for general descriptors (e.g., using "motif," "pattern," "design,".' }
          ],
            remediations: { 'students-treat-craft-vocabulary-as': { steps: ['Give the student four sentences each using one of the confused terms (motif, pattern, design, decoration) correctly.', 'Ask them to replace the target term with a simpler word and identify what precise meaning is lost.', 'Have them sort 12 craft terms from the chapter into a 4-column table: Structural, Technical, Aesthetic.', 'Assign a 50-word rewrite of a vague description using only terms from the table, then peer-review for precision.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_9', difficulty: 'standard',
          question: 'Cultural Core refers to the deep-seated values, beliefs, and historical.',
          hint: 'Review c9_engl_ch3_7 (expository structure) to relearn how to locate cause-effect.',
          misconception: 'Students treat \'reflects regional identity\' as a vague synonym for \'looks traditional\' and list surface features.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cultural Core refers to the deep-seated values, beliefs, and historical experiences of a',
                  options: ['Cultural Core refers to the deep-seated values, beliefs, and historical experiences of a', 'A text summary of an expository passage like "Evolution of the Pankha" is a concise,', 'Values of preserving indigenous crafts and heritage refer to the ethical, cultural, and', 'Pankhas (hand fans) are traditional Indian craft items that embody cultural heritage'],
                  hint: 'Review c9_engl_ch3_7 (expository structure) to relearn how to locate cause-effect relationships.',
                  misconception: 'Students treat \'reflects regional identity\' as a vague synonym for \'looks traditional\' and list surface features (colors, shapes) without.' }
          ],
            remediations: { 'students-treat-reflects-regional-identity': { steps: ['Give the student a two-column table — Column A: Craft Feature (from text), Column B: Why this feature exists in THIS.', 'Model filling Row 1 together using the pankha text: Feature = bamboo frame; Why = bamboo grows in Rajasthan\'s forests.', 'Student completes Rows 2-3 (mirror-work, palm leaf) independently.', 'Student converts each row into a PEEL paragraph.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
