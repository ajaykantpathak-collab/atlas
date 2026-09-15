import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p3',
    title: 'eerk dkfy;k · Part 3/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'eerk dkfy;k · Part 3/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_013', 'c11_hin_ar_cbse_15_014', 'c11_hin_ar_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s explicit and implicit meanings by evaluating evidence, identifying underlying assumptions, and synthesizing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a detective examining a crime scene where the "crime" is the normalization of injustice.',
            decisions: [{ prompt: 'What is the central metaphor of the poem "Sabse Khatarnak" and how does the poet define it in the opening lines?', options: [
                { text: 'The central metaphor is "the most dangerous thing" (sabse khatarnak), defined not as', outcome: 'The central metaphor is "the most dangerous thing" (sabse khatarnak), defined not as physical.' },
                { text: 'the most dangerous thing', outcome: 'Not quite — Students often treat "critical thinking" as "finding faults" or "disagreeing with the poet.".', reveals: 'students-often-treat-critical-thinking' },
                { text: 'not feeling the heat of injustice', outcome: 'Not quite — Students often treat "critical thinking" as "finding faults" or "disagreeing with the poet.".', reveals: 'students-often-treat-critical-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the question asks: "कविता में विस्थापन की पीड़ा को कवि ने कैसे व्यक्त किया है?" You know the poem but your mind.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in structured answer writing?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a detailed summary of the poem with a few quoted lines constitutes.', reveals: 'writing-a-detailed-summary-of' },
                { text: 'lack logical flow', outcome: 'Not quite — Students believe that writing a detailed summary of the poem with a few quoted lines constitutes.', reveals: 'writing-a-detailed-summary-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a classroom circle and the teacher asks, "What does the poet mean by \'the most terrifying\'?" You might feel unsure where to start.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion in a Class 11 Hindi classroom?', options: [
                { text: 'The primary purpose is to collaboratively explore multiple interpretations of a text,', outcome: 'The primary purpose is to collaboratively explore multiple interpretations of a text, deepen.' },
                { text: 'to find the single correct meaning the teacher expects', outcome: 'Not quite — Students often think a literary discussion is a debate where they must \'win\' by proving their.', reveals: 'a-literary-discussion-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck, review the distinction between "symbol" (a thing representing another) and.',
          misconception: 'Students often treat "critical thinking" as "finding faults" or "disagreeing with the poet." In this poem, they may.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "false consciousness" to interpret the lines: "ghar se nikalna kaam par / aur kaam se ghar aana" (leaving home for work and returning from.', answer: 'The routine embodies false consciousness',
                  options: ['The routine embodies false consciousness', 'it shows hard work is dangerous', 'it describes a daily schedule'],
                  hint: 'If stuck, review the distinction between "symbol" (a thing representing another) and "conceit" (an.',
                  misconception: 'Students often treat "critical thinking" as "finding faults" or "disagreeing with the poet." In this poem, they may argue "Paash is too.' }
          ],
            remediations: { 'students-often-treat-critical-thinking': { steps: ['Ask the student to list three things they do every day without thinking (e.g., scrolling phone, commuting, saying "I\'m.', 'Have them write one sentence explaining how each routine might serve a system they oppose.', 'Return to the poem and map each of Paash\'s examples (work routine, reading newspaper, watching sunset) to this new list.', 'Finally, rewrite their "disagreement" as an analytical question: "What structural purpose does the poet\'s refusal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'Review the Theme nodes (006, 007) and Literary Devices nodes (008, 009) to refresh.',
          misconception: 'Students believe that writing a detailed summary of the poem with a few quoted lines constitutes a good analytical.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in structured answer writing?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'lack logical flow'],
                  hint: 'Review the Theme nodes (006, 007) and Literary Devices nodes (008, 009) to refresh thematic and.',
                  misconception: 'Students believe that writing a detailed summary of the poem with a few quoted lines constitutes a good analytical answer.' }
          ],
            remediations: { 'writing-a-detailed-summary-of': { steps: ['Show the student a model 5-mark answer with each PEEL component highlighted in different colors.', 'Give a new question and ask them to write *only* the Point sentence.', 'Ask them to add two Evidence lines from the poem.', 'Guide them to write Explanation for each evidence: "यह पंक्ति दर्शाती है कि..." 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the imagery and metaphor analysis (c11_hin_ar_cbse_15_008) and theme.',
          misconception: 'Students often think a literary discussion is a debate where they must \'win\' by proving their interpretation.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet says "esgur dh ywV lcls [krjukd ugha gksrh" (the burning of the pyre is not the most terrifying) and what this suggests.', answer: 'The poet rejects conventional fears (death, physical pain) to highlight a deeper',
                  options: ['The poet rejects conventional fears (death, physical pain) to highlight a deeper', 'fire is scary', 'lists literal fears (e'],
                  hint: 'If stuck, review the imagery and metaphor analysis (c11_hin_ar_cbse_15_008) and theme analysis.',
                  misconception: 'Students often think a literary discussion is a debate where they must \'win\' by proving their interpretation is correct.' }
          ],
            remediations: { 'a-literary-discussion-is-a': { steps: ['If a student dominates discussion without listening, pause the activity and model \'building language\': "I heard [peer].', 'That connects to line Y because..." Then assign a \'listener role\' where the student must paraphrase three peers\' points.', 'Practice this in small groups with a structured protocol (e.g., \'Save the Last Word for Me\') to internalize listening.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
