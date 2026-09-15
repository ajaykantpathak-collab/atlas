import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch04_p1: SimDef = {
    id: 'v3_c9_engl_ch04_p1',
    title: 'Vitamin-M · Part 1/2',
    subtitle: 'Losing memory without losing independence',
    classLevel: 9, subject: 'engl', topic: 'Vitamin-M · Part 1/2',
    chapters: ['c9_engl_ch04'],
    nodeIds: ['c9_engl_ch4_1', 'c9_engl_ch4_10', 'c9_engl_ch4_2', 'c9_engl_ch4_3', 'c9_engl_ch4_4', 'c9_engl_ch4_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a family navigating a loved one\'s forgetfulness', intro: 'When Grandpa starts forgetting names and routes, the family faces a brutal either/or: safety or self-respect. Follow the events that forced a third option.', goal: 'Summarise \'Vitamin-M\' (Grandpa\'s Memory Challenges) as a causal chain — inciting lapse, wandering crisis, care-home debate, the Vitamin-M intervention, restored autonomy — without opinion.' },
    discovery: {
        question: 'Grandpa forgets Ravi\'s name at breakfast, then wanders off and is brought home by a policeman. The family debates a care home — but the story\'s real engine is a different fight. Which one?',
        options: ['Grandpa\'s fierce wish for independence clashing with his family\'s fear for his safety', 'Grandpa vs his own forgetfulness, alone in his head', 'Ravi vs his mother over chores', 'The family vs modern medicine'],
        answer: 'Grandpa\'s fierce wish for independence clashing with his family\'s fear for his safety',
        hook: 'The medicine shelf is the story\'s mirror: it opens with Grandpa lost among unlabelled bottles and ends with him proudly rattling off the red jar for BP and the blue for sugar. \'Vitamin-M\' — labels, routines, dignity — is the compromise between care home and chaos.',
    },
    teaching: [
        { title: 'Story Summary: Grandpa\'s Memory Challenges', text: 'A story summary is a concise, objective retelling of a narrative\'s essential elements — protagonist, setting, central conflict, key plot events, and resolution — written in the student\'s own words.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch4_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rebuild the plot as a causal chain: forgotten name → wandering crisis → care-home debate → the Vitamin-M routine → the organised shelf. Then write a summary where every event visibly causes the next.',
        labels: ['Story Summary: Grandpa\'s Memory', 'Values: Empathy, Patience', 'Character Analysis: Grandpa', 'Character Analysis: Ravi', 'Theme: Caring for', 'Theme: Memory Loss'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch4_1', title: 'Story Summary: Grandpa\'s Memory Challenges',
          caseStudy: { intro: 'Imagine you\'re explaining the movie "Taare Zameen Par" to a friend who hasn\'t seen it — you\'d mention Ishaan, his dyslexia, the art teacher, and the ending.',
            decisions: [{ prompt: 'What is the primary purpose of a story summary in a Class 9 board exam answer?', options: [
                { text: 'The primary purpose is to demonstrate comprehension of the narrative arc by concisely', outcome: 'The primary purpose is to demonstrate comprehension of the narrative arc by concisely presenting.' },
                { text: 'to retell the whole story in detail', outcome: 'Not quite — Students believe a summary should include *all* memorable details — the policeman\'s name, the.', reveals: 'a-summary-should-include-all' },
                { text: 'to give your opinion about the story', outcome: 'Not quite — Students believe a summary should include *all* memorable details — the policeman\'s name, the.', reveals: 'a-summary-should-include-all' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_10', title: 'Values: Empathy, Patience and Respect for the Elderly',
          caseStudy: { intro: 'Imagine you are sitting with your grandfather who keeps asking the same question about your exam schedule for the fifth time in ten minutes.',
            decisions: [{ prompt: 'Define \'empathy\' in the context of literary character analysis. How does it differ from \'sympathy\'?', options: [
                { text: 'Empathy in literature is the ability of a character (or reader) to vicariously experience', outcome: 'Empathy in literature is the ability of a character (or reader) to vicariously experience and.' },
                { text: 'empathy means feeling sorry for someone', outcome: 'Not quite — Students often treat empathy, patience, and respect as interchangeable synonyms for "being nice.".', reveals: 'students-often-treat-empathy' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_2', title: 'Character Analysis: Grandpa and His Independence',
          caseStudy: { intro: 'Imagine your grandmother insists on climbing the stairs to the temple despite knee pain, refusing your offered arm because "these legs still work." That.',
            decisions: [{ prompt: 'What is the primary character trait that defines Grandpa in "Vitamin-M" and drives the story\'s central conflict?', options: [
                { text: 'Grandpa\'s defining trait is his fierce independence', outcome: 'Grandpa\'s defining trait is his fierce independence — his determination to manage his own life.' },
                { text: 'forgetfulness', outcome: 'Not quite — Students often equate Grandpa\'s independence with "stubbornness" or "denial of reality," treating.', reveals: 'students-often-equate-grandpa-s' },
                { text: 'grumpiness', outcome: 'Not quite — Students often equate Grandpa\'s independence with "stubbornness" or "denial of reality," treating.', reveals: 'students-often-equate-grandpa-s' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_3', title: 'Character Analysis: Ravi and His Mother (Vidya)',
          caseStudy: { intro: 'Imagine you\'re watching a family argument about whether your grandfather should be allowed to go to the market alone when he sometimes forgets his way home.',
            decisions: [{ prompt: 'Define "indirect characterization" and give one example of how the author reveals Ravi\'s personality without directly stating his traits.', options: [
                { text: 'Indirect characterization shows a character\'s personality through their actions, speech,', outcome: 'Indirect characterization shows a character\'s personality through their actions, speech, thoughts.' },
                { text: 'Ravi is funny', outcome: 'Not quite — Students believe character analysis means listing adjectives describing a character (e.g., "Ravi.', reveals: 'character-analysis-means-listing-adjectives' },
                { text: 'Ravi is funny, Vidya is strict', outcome: 'Not quite — Students believe character analysis means listing adjectives describing a character (e.g., "Ravi.', reveals: 'character-analysis-means-listing-adjectives' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_4', title: 'Theme: Caring for the Elderly',
          caseStudy: { intro: 'Think about the title "Vitamin-M." In nutrition, vitamins are essential for health — without them, the body weakens.',
            decisions: [{ prompt: 'What does the title "Vitamin-M" metaphorically represent in the context of the story?', options: [
                { text: '"Vitamin-M" metaphorically represents the emotional nourishment', outcome: '"Vitamin-M" metaphorically represents the emotional nourishment — love, attention, and.' },
                { text: 'it is a medical term', outcome: 'Not quite — Students think caring for the elderly means providing food, shelter, and medical care.', reveals: 'caring-for-the-elderly-means' },
                { text: 'caring for the elderly means providing food, shelter, and medical care', outcome: 'Not quite — Students think caring for the elderly means providing food, shelter, and medical care.', reveals: 'caring-for-the-elderly-means' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_5', title: 'Theme: Memory Loss and Aging',
          caseStudy: { intro: 'Imagine your grandmother forgets she already added sugar to her tea and adds it three times -- you might feel annoyed at first, then sad, then protective.',
            decisions: [{ prompt: 'List three specific incidents from "Vitamin-M" where Grandpa\'s memory loss is shown directly through his actions or speech.', options: [
                { text: 'Correct answer: (1) Grandpa calling Ravi by his father\'s name, (2) Grandpa insisting he', outcome: 'Correct answer: (1) Grandpa calling Ravi by his father\'s name, (2) Grandpa insisting he hasn\'t.' },
                { text: 'he forgets things', outcome: 'Not quite — Students think "theme of memory loss" means listing every forgetful moment.', reveals: 'theme-of-memory-loss-means' },
                { text: 'theme of memory loss', outcome: 'Not quite — Students think "theme of memory loss" means listing every forgetful moment.', reveals: 'theme-of-memory-loss-means' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'Grandpa\'s Memory Challenges,\' a student writes: \'Grandpa forgets Ravi\'s name. He wanders off. A policeman brings him home. Vidya cries. They buy labelled jars. Grandpa becomes happy.\'',
            decisions: [{ prompt: 'Why would examiners call this a list rather than a summary?', options: [
                { text: 'Because the events float loose of each other: the wandering is the crisis that triggers the care-home discussion, and the \'Vitamin-M\' routine — colour-coded jars, fixed walks — is the compromise that restores Grandpa\'s independence. The causal chain is the summary; bare events are just a travel log.', outcome: 'This supplies the cause-and-effect spine — conflict driving each event — which is what a board-level summary must demonstrate.' },
                { text: 'They would not — all the main events are present, and summary means writing what happened in order.', outcome: 'Events without linkage hide the story\'s engine: safety versus independence. Two sentences with \'as a result\' would show comprehension the list cannot.', reveals: 'list-is-summary' },
                { text: 'The draft only needs a moral ending like \'we must respect our elders\' to become a full summary.', outcome: 'A moral is interpretation, not plot; the missing piece is how each event causes the next, not a lesson pasted on top.', reveals: 'add-a-moral' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_5', title: 'The bigger picture',
          caseStudy: { intro: 'A summary isn\'t a list — it\'s a chain of \'because of this, that happened.\' The wandering caused the care-home talk; the care-home talk caused Vitamin-M; Vitamin-M gave Grandpa his shelf — and his dignity — back.',
            decisions: [{ prompt: 'What comes next? Vitamin-M · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Vitamin-M · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch4_1', difficulty: 'standard',
          question: 'A story summary is a concise, objective retelling of a narrative\'s essential.',
          hint: 'If stuck, review c8_engl_ch4_4 (Cherry Tree plot stages) and practise mapping its.',
          misconception: 'Students believe a summary should include *all* memorable details — the policeman\'s name, the temple\'s description, the.',
          parts: [
                { id: 'a', prompt: 'In "Grandpa\'s Memory Challenges," the central conflict is best described as: (A) Grandpa vs. his forgetfulness, (B) Grandpa\'s desire for independence vs.', answer: 'Option (B) is correct',
                  options: ['Option (B) is correct', 'summary', 'retelling'],
                  hint: 'If stuck, review c8_engl_ch4_4 (Cherry Tree plot stages) and practise mapping its seed→sapling→tree.',
                  misconception: 'Students believe a summary should include *all* memorable details — the policeman\'s name, the temple\'s description, the exact breakfast.' },
                { id: 'b', prompt: 'Arrange these events from "Grandpa\'s Memory Challenges" in correct causal sequence: (i) Grandpa forgets Ravi\'s name at breakfast, (ii) Family introduces.', answer: 'Correct sequence: 1',
                  options: ['Correct sequence: 1', 'summary', 'retelling'],
                  hint: 'If stuck, review c8_engl_ch4_4 (Cherry Tree plot stages) and practise mapping its seed→sapling→tree.',
                  misconception: 'Students believe a summary should include *all* memorable details — the policeman\'s name, the temple\'s description, the exact breakfast.' }
          ],
            remediations: { 'a-summary-should-include-all': { steps: ['**Isolate the narrative spine**: Give the student 5 index cards.', 'Ask them to write *only* the five most pivotal moments (inciting incident, two rising actions, climax, resolution).', 'Physically discard cards for minor details (policeman\'s dialogue, temple description).', '**Add causal arrows**: Have them arrange cards left-to-right and draw arrows labeled "because of this → this happens.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a summary should include *all* memorable details — the policeman\'s name, the temple\'s description, the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student summary: "Grandpa has memory problems. He forgets things and gets lost.', answer: 'Weakness 1: **Lacks causal connectors**',
                  options: ['Weakness 1: **Lacks causal connectors**', 'summary', 'retelling'],
                  hint: 'If stuck, review c8_engl_ch4_4 (Cherry Tree plot stages) and practise mapping its seed→sapling→tree.',
                  misconception: 'Students believe a summary should include *all* memorable details — the policeman\'s name, the temple\'s description, the exact breakfast.' }
          ],
            remediations: { 'a-summary-should-include-all': { steps: ['**Isolate the narrative spine**: Give the student 5 index cards.', 'Ask them to write *only* the five most pivotal moments (inciting incident, two rising actions, climax, resolution).', 'Physically discard cards for minor details (policeman\'s dialogue, temple description).', '**Add causal arrows**: Have them arrange cards left-to-right and draw arrows labeled "because of this → this happens.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_10', difficulty: 'standard',
          question: 'Empathy, patience, and respect for the elderly are interconnected human values.',
          hint: 'Review c9_engl_ch4_3 (Character Analysis: Ravi and His Mother) for PEEL modeling and.',
          misconception: 'Students often treat empathy, patience, and respect as interchangeable synonyms for "being nice." They write answers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Empathy, patience, and respect for the elderly are interconnected human values that',
                  options: ['Empathy, patience, and respect for the elderly are interconnected human values that', 'A story summary is a concise, objective retelling of a narrative\'s essential elements', 'Character analysis of Grandpa in "Vitamin-M" involves examining how the author portrays', 'Character analysis in Class 9 board exams requires examining how an author reveals a'],
                  hint: 'Review c9_engl_ch4_3 (Character Analysis: Ravi and His Mother) for PEEL modeling and c9_engl_ch4_6.',
                  misconception: 'Students often treat empathy, patience, and respect as interchangeable synonyms for "being nice." They write answers like "Ravi shows.' }
          ],
            remediations: { 'students-often-treat-empathy': { steps: ['Ask the student to act out (or describe) three micro-scenarios: (a) You see Grandpa searching for glasses — what do you.', '(empathy) (b) He asks the same question for the 6th time — what do you *do* with your irritation?', '(patience) (c) He refuses your help to button his shirt — what do you *think* about his right to refuse?', 'Map each response to the correct value label.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_2', difficulty: 'standard',
          question: 'Character analysis of Grandpa in "Vitamin-M" involves examining how the author.',
          hint: 'Review the PEEL paragraph structure practiced in c8_engl_ch4_3 (Cherry Tree Grandfather.',
          misconception: 'Students often equate Grandpa\'s independence with "stubbornness" or "denial of reality," treating it as a flaw to.',
          parts: [
                { id: 'a', prompt: 'What is the primary character trait that defines Grandpa in "Vitamin-M" and drives the story\'s central conflict?', answer: 'Grandpa\'s defining trait is his fierce independence',
                  options: ['Grandpa\'s defining trait is his fierce independence', 'forgetfulness', 'grumpiness'],
                  hint: 'Review the PEEL paragraph structure practiced in c8_engl_ch4_3 (Cherry Tree Grandfather analysis).',
                  misconception: 'Students often equate Grandpa\'s independence with "stubbornness" or "denial of reality," treating it as a flaw to be fixed.' },
                { id: 'b', prompt: 'Explain in your own words why Grandpa refuses Ravi\'s offer to hire a nurse, and what this reveals about his relationship with his family.', answer: 'Grandpa refuses the nurse',
                  options: ['Grandpa refuses the nurse', 'stubbornness'],
                  hint: 'Review the PEEL paragraph structure practiced in c8_engl_ch4_3 (Cherry Tree Grandfather analysis).',
                  misconception: 'Students often equate Grandpa\'s independence with "stubbornness" or "denial of reality," treating it as a flaw to be fixed.' },
                { id: 'c', prompt: 'Find two specific actions Grandpa takes in the story that demonstrate his independence.', answer: '1) Grandpa walks to the market alone despite memory lapses',
                  options: ['1) Grandpa walks to the market alone despite memory lapses', 'he does things himself'],
                  hint: 'Review the PEEL paragraph structure practiced in c8_engl_ch4_3 (Cherry Tree Grandfather analysis).',
                  misconception: 'Students often equate Grandpa\'s independence with "stubbornness" or "denial of reality," treating it as a flaw to be fixed.' }
          ],
            remediations: { 'students-often-equate-grandpa-s': { steps: ['Re-read the nurse-refusal scene aloud; ask: "What is Grandpa protecting?" (Answer: his family\'s peace, not his ego).', 'Create a two-column chart: Column A = actions that look stubborn; Column B = the loving motive behind each.', 'Practice writing one PEEL paragraph using the stem: "When Grandpa [action], it reveals he values [trait] because.', 'Compare with Cherry Tree Grandfather (c8_engl_ch4_3) to see independence as intergenerational gift, not obstacle.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_3', difficulty: 'standard',
          question: 'Character analysis in Class 9 board exams requires examining how an author.',
          hint: 'Review c6_english_u1_002 (Jahnavi character analysis) and c8_engl_ch4_2 (Rakesh character.',
          misconception: 'Students believe character analysis means listing adjectives describing a character (e.g., "Ravi is funny, Vidya.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Vidya insists on the "identity card" solution for Grandpa, and what this reveals about her character that is DIFFERENT from.', answer: 'Vidya insists on the identity card',
                  options: ['Vidya insists on the identity card', 'she cares for him', 'Ravi is funny, Vidya is strict', 'character analysis means listing adjectives describing a character (e'],
                  hint: 'Review c6_english_u1_002 (Jahnavi character analysis) and c8_engl_ch4_2 (Rakesh character analysis).',
                  misconception: 'Students believe character analysis means listing adjectives describing a character (e.g., "Ravi is funny, Vidya is strict").' }
          ],
            remediations: { 'character-analysis-means-listing-adjectives': { steps: ['Have the student reread ONLY the vegetable market scene and the identity card scene.', 'Ask: "What does each character DO?', 'What does each FEEL?" — make three columns.', 'Guide them to see Vidya\'s fear (not meanness) and Ravi\'s deflection (not indifference).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_4', difficulty: 'standard',
          question: 'The theme of caring for the elderly in "Vitamin-M" refers to the text\'s central.',
          hint: 'Revisit c9_engl_ch4_1 (Story Summary) for plot context and c9_engl_ch4_2 (Grandpa\'s.',
          misconception: 'Students think caring for the elderly means providing food, shelter, and medical care.',
          parts: [
                { id: 'a', prompt: 'What does the title "Vitamin-M" metaphorically represent in the context of the story?', answer: '"Vitamin-M" metaphorically represents the emotional nourishment',
                  options: ['"Vitamin-M" metaphorically represents the emotional nourishment', 'it is a medical term', 'caring for the elderly means providing food, shelter, and medical care'],
                  hint: 'Revisit c9_engl_ch4_1 (Story Summary) for plot context and c9_engl_ch4_2 (Grandpa\'s character.',
                  misconception: 'Students think caring for the elderly means providing food, shelter, and medical care.' },
                { id: 'b', prompt: 'Identify two specific actions by Ravi and Vidya in the story that demonstrate care for Grandpa.', answer: 'Action 1: Spending time with Grandpa',
                  options: ['Action 1: Spending time with Grandpa', 'they bought him gifts', 'caring for the elderly means providing food, shelter, and medical care'],
                  hint: 'Revisit c9_engl_ch4_1 (Story Summary) for plot context and c9_engl_ch4_2 (Grandpa\'s character.',
                  misconception: 'Students think caring for the elderly means providing food, shelter, and medical care.' },
                { id: 'c', prompt: 'How does the story challenge the assumption that material provision is the primary form of care for the elderly?', answer: 'The story shows that Grandpa does not lack material resources',
                  options: ['The story shows that Grandpa does not lack material resources', 'material provision is all that matters', 'caring for the elderly means providing food, shelter, and medical care'],
                  hint: 'Revisit c9_engl_ch4_1 (Story Summary) for plot context and c9_engl_ch4_2 (Grandpa\'s character.',
                  misconception: 'Students think caring for the elderly means providing food, shelter, and medical care.' }
          ],
            remediations: { 'caring-for-the-elderly-means': { steps: ['Ask the student: "What does a vitamin do for the body?" (Essential for health, cannot be produced by the body, must.', 'Ask: "If Vitamin-M is emotional, what is the \'deficiency disease\'?" (Loneliness, depression, feeling unwanted.) 3.', 'Have the student list three "Vitamin-M" activities from the story (listening, spending time, sharing meals).', 'Create a table: Physical vitamin | Emotional vitamin (Vitamin-M).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_5', difficulty: 'standard',
          question: 'The theme of memory loss and aging explores how progressive cognitive decline.',
          hint: 'Review "theme vs topic" using c8_engl_ch4_5 (Cherry Tree patience theme) -- identify how.',
          misconception: 'Students think "theme of memory loss" means listing every forgetful moment.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the incident of Grandpa\'s missing spectacles (which are on his head) functions differently in the story than the incident where.', answer: 'Correct answer: The spectacles incident uses gentle humour to show harmless',
                  options: ['Correct answer: The spectacles incident uses gentle humour to show harmless', 'just forgetfulness', 'theme of memory loss', '"theme of memory loss" means listing every forgetful moment'],
                  hint: 'Review "theme vs topic" using c8_engl_ch4_5 (Cherry Tree patience theme) -- identify how growth was.',
                  misconception: 'Students think "theme of memory loss" means listing every forgetful moment.' }
          ],
            remediations: { 'theme-of-memory-loss-means': { steps: ['Have the student create a two-column table: Column A "Memory Lapse," Column B "Preserved Ability in Same Scene."', 'Fill it for three scenes using the text.', 'Ask: "What does the author want us to see by putting these side by side?"', 'Guide them to articulate: "Memory loss coexists with enduring personhood." This shifts focus from cataloguing symptoms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
