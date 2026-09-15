import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch02_p3: SimDef = {
    id: 'v3_c11_eng_s_ch02_p3',
    title: 'The Address · Part 3/3',
    subtitle: 'Read a doorstep rejection as the machinery of dispossession, not a quarrel over furniture.',
    classLevel: 11, subject: 'eng_s', topic: 'The Address · Part 3/3',
    chapters: ['c11_eng_s_ch02'],
    nodeIds: ['c11_eng_s_cbse_02_013', 'c11_eng_s_cbse_02_014', 'c11_eng_s_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a survivor returning to claim a stolen past', intro: 'Number 46 still stands, the tablecloth is hers, the burn mark familiar — yet the room feels like a stranger\'s house.', goal: 'Situate the story in occupied Holland and analyse how its two-visit structure delivers disillusionment.' },
    discovery: {
        question: 'Mrs. Dorling \'safekeeps\' a Jewish family\'s belongings and later won\'t let the daughter in. Simple greed — or something larger?',
        options: ['Larger — she embodies the legalised seizure of Jewish property under occupation, not just one woman\'s dishonesty', 'Simple greed — a neighbour exploiting a friendship', 'Neither — she was protecting the items from damage', 'Larger — she was a paid government custodian by law'],
        answer: 'Larger — she embodies the legalised seizure of Jewish property under occupation, not just one woman\'s dishonesty',
        hook: 'Reading her as merely greedy shrinks systemic dispossession into personal villainy — the law itself made the theft respectable.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its surface meaning to interpret themes, character motivations, narrative techniques, and the author\'s purpose, using textual.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_02_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the story into its pre-war and post-war timeframes, place the flashbacks as structural pillars, and defend the choice to \'forget the address.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you find a box of your grandmother\'s old letters in a stranger\'s house - would you take them or walk away?',
            decisions: [{ prompt: 'What is the literal meaning of the narrator\'s statement "I resolved to forget the address" at the end of the story?', options: [
                { text: 'The narrator decides not to return to 46 Marconi Street and consciously chooses to erase', outcome: 'The narrator decides not to return to 46 Marconi Street and consciously chooses to erase the.' },
                { text: 'she forgot it by accident', outcome: 'Not quite — Students often believe the story is primarily about the Holocaust or war atrocities, and thus.', reveals: 'the-story-is-primarily-about' },
                { text: 'she lost the paper', outcome: 'Not quite — Students often believe the story is primarily about the Holocaust or war atrocities, and thus.', reveals: 'the-story-is-primarily-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you have just finished reading "The Address" and your teacher asks: "Why does the narrator decide to forget the address at the end?" You know the.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for CBSE Class 11 English?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Evidence, Line', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means writing a *summary* of the story.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means writing a *summary* of the story.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'ve just finished reading "The Address" and your teacher announces a graded group discussion tomorrow.',
            decisions: [{ prompt: 'What is the primary purpose of a structured literary discussion in a senior secondary English classroom?', options: [
                { text: 'The primary purpose is to collaboratively construct meaning by sharing evidence-based', outcome: 'The primary purpose is to collaboratively construct meaning by sharing evidence-based.' },
                { text: 'to test if we read the story', outcome: 'Not quite — Students believe a literary discussion is successful if everyone agrees or if the "right" answer.', reveals: 'a-literary-discussion-is-successful' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a Remembrance Week display your class presents \'The Address\'. The caption reads: \'A story about a selfish woman who kept a neighbour\'s furniture — a lesson in greed.\' A visitor who knows the history frowns at the caption.',
            decisions: [{ prompt: 'What does the caption get wrong?', options: [
                { text: 'It shrinks systemic dispossession to personal greed: Mrs Dorling\'s holding the family\'s things sits inside the Holocaust-era \'Aryanisation\' of Jewish property — ~75% of Dutch Jews were murdered, belongings \'safeguarded\' or seized, and the objects at 46 Marconi Street are the only remaining witnesses to erased lives. The narrator doesn\'t reclaim them because they\'re now \'uncanny\' — arranged in a stranger\'s room, they\'ve lost their meaning.', outcome: 'The address is about ruptured continuity, not bad manners; the objects testify to a family the state wiped out.' },
                { text: 'The caption is fine — at heart it\'s a morality tale about not taking other people\'s things.', outcome: 'That reads it as universal \'theft\' and misses the specific mechanism — state-sanctioned dispossession under occupation — and why the daughter walks away rather than demand her inheritance back.', reveals: 'address-is-about-greed' },
                { text: 'Reframe it as triumph — the daughter should have taken everything back to honour her mother.', outcome: 'That misses the ending\'s point: seeing her mother\'s cardigan worn as ordinary utility broke the link; reclaiming objects can\'t restore the erased world they came from.', reveals: 'reclaiming-is-the-lesson' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'The objects were real; the life they belonged to was not reclaimable — forgetting the address is the only honest resolution left.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'Review node c11_eng_s_cbse_02_012 for comprehension and c11_eng_s_cbse_02_006/007 for.',
          misconception: 'Students often believe the story is primarily about the Holocaust or war atrocities, and thus interpret the narrator\'s.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of dramatic irony to the first meeting between the narrator and Mrs. Dorling.', answer: 'Step 1: Identify the situation - narrator arrives at 46 Marconi Street, Mrs',
                  options: ['Step 1: Identify the situation - narrator arrives at 46 Marconi Street, Mrs', 'only notes "Mrs'],
                  hint: 'Review node c11_eng_s_cbse_02_012 for comprehension and c11_eng_s_cbse_02_006/007 for theme.',
                  misconception: 'Students often believe the story is primarily about the Holocaust or war atrocities, and thus interpret the narrator\'s loss solely as.' }
          ],
            remediations: { 'the-story-is-primarily-about': { steps: ['If a student conflates historical context with textual theme: 1) Have them re-read the first three paragraphs and list.', '2) Ask: "Does the word \'Jewish\' or \'Nazi\' appear?', 'What evidence shows the mother\'s fate?" 3) Guide them to the narrator\'s own words: "Afraid of being confronted with.', '4) Assign a comparative quick-write: "How would the story change if Mrs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the story is primarily about the Holocaust or war atrocities, and thus interpret the narrator\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate the narrator\'s decision to leave without taking any objects. Is this an act of weakness or strength?', answer: 'It is an act of strength',
                  options: ['It is an act of strength', 'giving up'],
                  hint: 'Review node c11_eng_s_cbse_02_012 for comprehension and c11_eng_s_cbse_02_006/007 for theme.',
                  misconception: 'Students often believe the story is primarily about the Holocaust or war atrocities, and thus interpret the narrator\'s loss solely as.' }
          ],
            remediations: { 'the-story-is-primarily-about': { steps: ['If a student conflates historical context with textual theme: 1) Have them re-read the first three paragraphs and list.', '2) Ask: "Does the word \'Jewish\' or \'Nazi\' appear?', 'What evidence shows the mother\'s fate?" 3) Guide them to the narrator\'s own words: "Afraid of being confronted with.', '4) Assign a comparative quick-write: "How would the story change if Mrs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "The Address" refers to the ability.',
          hint: 'If stuck, review c11_eng_s_cbse_02_013 (Critical Thinking) for practice on \'Explanation\'.',
          misconception: 'Students believe that "writing skills based on the chapter" means writing a *summary* of the story in different formats.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for CBSE Class 11 English?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Evidence, Line', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_s_cbse_02_013 (Critical Thinking) for practice on \'Explanation\' step, and.',
                  misconception: 'Students believe that "writing skills based on the chapter" means writing a *summary* of the story in different formats (diary, letter.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer this question in 3-4 sentences: "How does the \'green knitted cardigan\' function as a symbol in the opening scene?" Use one.', answer: '**Point:** The green knitted cardigan symbolises the violent displacement of the',
                  options: ['**Point:** The green knitted cardigan symbolises the violent displacement of the', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_s_cbse_02_013 (Critical Thinking) for practice on \'Explanation\' step, and.',
                  misconception: 'Students believe that "writing skills based on the chapter" means writing a *summary* of the story in different formats (diary, letter.' },
                { id: 'c', prompt: 'Compare these two opening sentences for the question "Justify the title \'The Address\'." Which is stronger analytically and why?', answer: '(B) is stronger',
                  options: ['(B) is stronger', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_s_cbse_02_013 (Critical Thinking) for practice on \'Explanation\' step, and.',
                  misconception: 'Students believe that "writing skills based on the chapter" means writing a *summary* of the story in different formats (diary, letter.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a narrative summary instead of an analytical response: 1.', '**Diagnose:** Highlight every sentence that merely recounts plot (e.g., "She went there," "She saw the cardigan").', '**Model:** Take their *content* and rewrite *one* paragraph using PEEL, showing how the same facts become evidence for.', '**Practise:** Give a new, narrow prompt ("Write 3 lines explaining why the burn mark matters") forcing them to produce.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the Critical Thinking node (c11_eng_s_cbse_02_013) for interpretive.',
          misconception: 'Students believe a literary discussion is successful if everyone agrees or if the "right" answer is found quickly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral activity where',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral activity where', '"Before You Read: Context and Background" is a pre-reading pedagogical framework that', 'Plot and narrative structure in "The Address" refers to the deliberate arrangement of', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review the Critical Thinking node (c11_eng_s_cbse_02_013) for interpretive frameworks and.',
                  misconception: 'Students believe a literary discussion is successful if everyone agrees or if the "right" answer is found quickly.' }
          ],
            remediations: { 'a-literary-discussion-is-successful': { steps: ['If a student falls into this misconception: (1) Pause the discussion and explicitly name the pattern: "We\'re listing.', '"It shows the daughter\'s assimilation." (3) Assign each student a specific interpretive lens (psychological.', '(4) Require every speaker to begin with "The text shows..." followed by a quotation or precise reference before stating.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
