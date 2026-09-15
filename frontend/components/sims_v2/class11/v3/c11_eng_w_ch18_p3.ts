import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch18_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch18_p3: SimDef = {
    id: 'v3_c11_eng_w_ch18_p3',
    title: 'Felling of the Banyan Tree (Poem) · Part 3/3',
    subtitle: 'Watch two hundred years come down in seven days — and keep growing in a dream.',
    classLevel: 11, subject: 'eng_w', topic: 'Felling of the Banyan Tree (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch18'],
    nodeIds: ['c11_eng_w_cbse_18_013', 'c11_eng_w_cbse_18_014', 'c11_eng_w_cbse_18_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a child watching the family banyan come down', intro: 'Sacred tree, developer\'s logic, fifty men with axes — and a boy who carries the stump to Bombay in his sleep.', goal: 'Analyse the poem\'s engineered narrative time and its unresolved ending.' },
    discovery: {
        question: 'The tree\'s seven-day felling sprawls across line after line, while its two hundred years of life compress into a single phrase: \'the rings of two hundred years.\' Why engineer time that way?',
        options: ['To make the killing feel interminable and the lost life feel instantaneous — the pace itself is the grief', 'To keep the poem short for exams', 'Because seven days is poetically harder to say than two centuries', 'No reason — narrative pacing is accidental here'],
        answer: 'To make the killing feel interminable and the lost life feel instantaneous — the pace itself is the grief',
        hook: 'The grandmother says \'trees are sacred\'; the father \'massacred them all\' — the poem lets both be true, and makes you watch the saw do it slowly.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to uncover deeper implications, evaluating the author\'s choices (language, structure, perspective), and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_18_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Label the stages of a felling — order, warning, seven days of sawing, fifty men, revealed rings — then test the ending where the tree \'grows and seethes in one\'s dreams.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you witness a massive old tree in your neighborhood being cut down to make way for a new apartment complex.',
            decisions: [{ prompt: 'What is the primary difference between literal comprehension and critical interpretation of a poem?', options: [
                { text: 'Literal comprehension retrieves facts explicitly stated in the text (e.g., the banyan', outcome: 'Literal comprehension retrieves facts explicitly stated in the text (e.g., the banyan tree was.' },
                { text: 'critical analysis', outcome: 'Not quite — Students often think "critical analysis" means criticizing the poem (finding faults) or simply.', reveals: 'critical-analysis-means-criticizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you see a massive old tree in your neighbourhood being cut down for a new road.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs about literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Evidence, Language', outcome: 'Not quite — Students often believe that "writing about the poem" means retelling the story in their own words.', reveals: 'writing-about-the-poem-means' },
                { text: 'writing about the poem', outcome: 'Not quite — Students often believe that "writing about the poem" means retelling the story in their own words.', reveals: 'writing-about-the-poem-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle and a classmate says, "The poem is just about an old tree being cut down; it doesn\'t matter today." You feel the poem.',
            decisions: [{ prompt: 'What are the three essential components of a productive literary discussion turn in a senior secondary classroom?', options: [
                { text: 'A productive turn includes: (1) a clear claim or response to a peer, (2) specific textual', outcome: 'A productive turn includes: (1) a clear claim or response to a peer, (2) specific textual evidence.' },
                { text: 'sharing opinions', outcome: 'Not quite — Students believe a good discussion contribution is stating a personal feeling ("I felt sad when the.', reveals: 'a-good-discussion-contribution-is' },
                { text: 'taking turns', outcome: 'Not quite — Students believe a good discussion contribution is stating a personal feeling ("I felt sad when the.', reveals: 'a-good-discussion-contribution-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your colony\'s oldest banyan is marked for felling to widen a road. At a residents\' meeting you read Chitre\'s \'Felling of the Banyan Tree\'. A neighbour shrugs: \'It\'s just a poem about chopping a tree — sentimental green stuff.\'',
            decisions: [{ prompt: 'What do you say the poem is actually about?', options: [
                { text: 'Read it as an elegy for a worldview: the banyan is sacred in Indian tradition, a community shelter, an ecological keystone — and its felling, ordered by the father over the grandmother\'s warning, enacts the violence of replacing roots with concrete. The family moves to Bombay where the only tree left \'grows and seethes in one\'s dreams\'; the personal migration mirrors millions. Structure enacts it: seven days of sawing stretch unbearably while two hundred years of rings compress into one phrase.', outcome: 'The poem stops being \'green sentiment\' and becomes what it is — memory, displacement, and a way of life where nature was kin, not resource.' },
                { text: 'Concede it\'s a simple chronological report — father orders, men saw, tree falls, family moves.', outcome: 'That misses the engineered narrative time: the sawing is stretched across enjambed lines to feel interminable while the tree\'s 200-year life is compressed — the pacing is the meaning.', reveals: 'felling-is-chronological-report' },
                { text: 'Offer it as an anti-development poem — the father is the villain who kills a sacred tree.', outcome: 'Blaming one man flattens it: the felling stands for an era\'s migration from green Baroda to concrete Bombay — the tragedy is systemic, not personal villainy.', reveals: 'father-is-the-villain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_015', title: 'You made it',
          caseStudy: { intro: 'The banyan is felled in Baroda and replanted as a nightmare in Bombay — the past tense ends, the present tense seethes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, review the distinction between a literary device (e.g., metaphor) and its.',
          misconception: 'Students often think "critical analysis" means criticizing the poem (finding faults) or simply listing literary devices.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "symbol" to the banyan tree: identify three specific details the poet gives about the tree and explain what each might symbolize in the.', answer: '1) "Three times as tall as our house" – symbolizes nature\'s dominance over human',
                  options: ['1) "Three times as tall as our house" – symbolizes nature\'s dominance over human', 'critical analysis'],
                  hint: 'If stuck, review the distinction between a literary device (e.g., metaphor) and its function (e.g.',
                  misconception: 'Students often think "critical analysis" means criticizing the poem (finding faults) or simply listing literary devices they have.' },
                { id: 'b', prompt: 'Analyze the effect of the poem\'s free verse structure and enjambment (e.g., "Whose roots lay deeper than all our lives / My father ordered it to be removed").', answer: 'The lack of a regular rhyme scheme mirrors the chaotic, irreversible destruction',
                  options: ['The lack of a regular rhyme scheme mirrors the chaotic, irreversible destruction', 'critical analysis'],
                  hint: 'If stuck, review the distinction between a literary device (e.g., metaphor) and its function (e.g.',
                  misconception: 'Students often think "critical analysis" means criticizing the poem (finding faults) or simply listing literary devices they have.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['If a student falls into this misconception, do NOT have them re-memorize device definitions.', 'Instead, take ONE line from the poem (e.g., "The great tree revealed its rings of two hundred years") and guide them.', '2) What does "revealed" suggest about the tree\'s agency?', '3) What does "rings" symbolize beyond age?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "critical analysis" means criticizing the poem (finding faults) or simply listing literary devices.',
          parts: [
                { id: 'a', prompt: 'Evaluate the poet\'s choice to end with the image of the tree growing and seething in dreams in Bombay. Is this an effective closure?', answer: 'Yes, it is effective',
                  options: ['Yes, it is effective', 'nice imagery', 'critical analysis'],
                  hint: 'If stuck, review the distinction between a literary device (e.g., metaphor) and its function (e.g.',
                  misconception: 'Students often think "critical analysis" means criticizing the poem (finding faults) or simply listing literary devices they have.' },
                { id: 'b', prompt: 'Create a four-line stanza in free verse that captures the same conflict between development and heritage as the poem, using a different natural object (e.g.,.', answer: 'A strong response will: (1) choose a concrete symbol, (2) show a specific act of',
                  options: ['A strong response will: (1) choose a concrete symbol, (2) show a specific act of', 'critical analysis'],
                  hint: 'If stuck, review the distinction between a literary device (e.g., metaphor) and its function (e.g.',
                  misconception: 'Students often think "critical analysis" means criticizing the poem (finding faults) or simply listing literary devices they have.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['If a student falls into this misconception, do NOT have them re-memorize device definitions.', 'Instead, take ONE line from the poem (e.g., "The great tree revealed its rings of two hundred years") and guide them.', '2) What does "revealed" suggest about the tree\'s agency?', '3) What does "rings" symbolize beyond age?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Felling of the Banyan Tree" refer to the.',
          hint: 'If stuck, review the PEEL method from c8_engl_ch1_17 and the quote-embedding technique.',
          misconception: 'Students often believe that "writing about the poem" means retelling the story in their own words.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs about literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Evidence, Language', 'writing about the poem', 'lack clear argumentation or textual support'],
                  hint: 'If stuck, review the PEEL method from c8_engl_ch1_17 and the quote-embedding technique from.',
                  misconception: 'Students often believe that "writing about the poem" means retelling the story in their own words.' },
                { id: 'b', prompt: 'Why is it insufficient to simply insert a quote from the poem into your answer without any surrounding explanation?', answer: 'A quote alone does not show *how* the language creates meaning',
                  options: ['A quote alone does not show *how* the language creates meaning', 'quote-dumping', 'writing about the poem', 'earn little credit'],
                  hint: 'If stuck, review the PEEL method from c8_engl_ch1_17 and the quote-embedding technique from.',
                  misconception: 'Students often believe that "writing about the poem" means retelling the story in their own words.' },
                { id: 'c', prompt: 'Two students write topic sentences for the prompt "Discuss the significance of the banyan tree in the poem." Student A: "The banyan tree is very big and old.".', answer: 'Student B\'s sentence is effective',
                  options: ['Student B\'s sentence is effective', 'writing about the poem', '"writing about the poem" means retelling the story in their own words'],
                  hint: 'If stuck, review the PEEL method from c8_engl_ch1_17 and the quote-embedding technique from.',
                  misconception: 'Students often believe that "writing about the poem" means retelling the story in their own words.' }
          ],
            remediations: { 'writing-about-the-poem-means': { steps: ['Give the student a sample exam question and a model PEEL paragraph.', 'Colour-code the four parts (Point, Evidence, Explanation, Link).', 'Ask them to identify the same four parts in another model answer.', 'Provide a "quote bank" of 5 key lines from the poem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Revisit c11_eng_w_cbse_18_008 (Imagery and Metaphor) and c11_eng_w_cbse_18_009 (Irony and.',
          misconception: 'Students believe a good discussion contribution is stating a personal feeling ("I felt sad when the tree fell").',
          parts: [
                { id: 'a', prompt: 'Compare two interpretations of "roots lay deeper than our lives": (A) the tree\'s biological longevity vs. (B) the tree as repository of cultural memory.', answer: 'Interpretation B better supports the dream image',
                  options: ['Interpretation B better supports the dream image', 'I felt sad when the tree fell'],
                  hint: 'Revisit c11_eng_w_cbse_18_008 (Imagery and Metaphor) and c11_eng_w_cbse_18_009 (Irony and.',
                  misconception: 'Students believe a good discussion contribution is stating a personal feeling ("I felt sad when the tree fell") or repeating a teacher\'s.' }
          ],
            remediations: { 'a-good-discussion-contribution-is': { steps: ['Conduct a "fishbowl" demo: four students discuss while outer circle maps each turn\'s claim-evidence-reasoning on.', 'Provide sentence stems: "The text shows X when it says \'...\' which suggests Y because..." 3.', 'Require each speaker to explicitly reference the previous speaker\'s point before adding new evidence.', 'Debrief by coding a transcript: highlight turns with textual evidence vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
