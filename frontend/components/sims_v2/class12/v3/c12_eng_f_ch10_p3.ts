import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch10_p3: SimDef = {
    id: 'v3_c12_eng_f_ch10_p3',
    title: 'An Elementary School Classroom in a Slum (Poem) · Part 3/3',
    subtitle: 'The map on the wall is the lie the classroom tells',
    classLevel: 12, subject: 'eng_f', topic: 'An Elementary School Classroom in a Slum (Poem) · Part 3/3',
    chapters: ['c12_eng_f_ch10'],
    nodeIds: ['c12_eng_f_cbse_10_013', 'c12_eng_f_cbse_10_014', 'c12_eng_f_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social critic', intro: 'A socialist poet who fought fascism walks into a slum school and sees the education system itself as the enemy.', goal: 'Read Spender\'s poem as a critique of systemic inequality, not a sentimental portrait of poverty.' },
    discovery: {
        question: 'Shakespeare\'s head and a world map hang on a slum classroom\'s wall — and Spender calls them \'wicked.\' Why would pictures of a bigger world be cruel?',
        options: ['They advertise a civilisation that permanently excludes these children — teaching them a world they can never enter is taunt, not education', 'They\'re just ugly pictures', 'Shakespeare is too hard for children', 'Maps are outdated'],
        answer: 'They advertise a civilisation that permanently excludes these children — teaching them a world they can never enter is taunt, not education',
        hook: 'This isn\'t a sad poem about poor kids — it\'s an indictment of a system that uses education to reinforce the class wall. \'History is theirs whose language is the sun\': control language and you control who gets written into history. Sentimental pity is the reading the poem rejects.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to evaluate its themes, structure, literary devices, and underlying philosophy, forming an independent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_10_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand inside that fog-dimmed classroom: weigh the rootless-weeds children against the civilised dome on the wall, then judge Spender\'s closing appeal to governor and inspector — real demand or rhetorical dare?',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are sitting in a noisy classroom during a free period — everyone talking, phones buzzing, chairs scraping.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "to have no truck with" as used in the poem, and which line contains it?', options: [
                { text: 'The phrase "to have no truck with" means to refuse to associate with, tolerate, or have', outcome: 'The phrase "to have no truck with" means to refuse to associate with, tolerate, or have dealings.' },
                { text: 'I want no truck with death', outcome: 'Not quite — Students consistently interpret "keeping quiet" as a call for passive withdrawal, escapism,.', reveals: 'students-consistently-interpret-keeping-quiet' },
                { text: 'to have no vehicle', outcome: 'Not quite — Students consistently interpret "keeping quiet" as a call for passive withdrawal, escapism,.', reveals: 'students-consistently-interpret-keeping-quiet' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are given a CBSE board question: "Write an article in 120-150 words on \'Education: The Only Hope for Slum Children\' based on the poem \'An.',
            decisions: [{ prompt: 'What is the primary purpose of using textual evidence from the poem in a writing task based on the chapter?', options: [
                { text: 'The primary purpose is to substantiate the writer\'s argument or analysis with concrete', outcome: 'The primary purpose is to substantiate the writer\'s argument or analysis with concrete proof from.' },
                { text: 'to show the examiner I read the poem', outcome: 'Not quite — Students believe that "writing based on the chapter" means writing a summary or character sketch.', reveals: 'writing-based-on-the-chapter' },
                { text: 'to fill the word count', outcome: 'Not quite — Students believe that "writing based on the chapter" means writing a summary or character sketch.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where everyone has read the poem but interpretations differ: one student sees hope in the "map" while another sees irony.',
            decisions: [{ prompt: 'What is the primary purpose of a structured literary discussion in a Class 12 English classroom?', options: [
                { text: 'The primary purpose is to collaboratively analyze the text by sharing interpretations', outcome: 'The primary purpose is to collaboratively analyze the text by sharing interpretations grounded.' },
                { text: 'to share personal feelings about the poem', outcome: 'Not quite — Students treat literary discussion as a "share your feelings" circle, offering personal reactions.', reveals: 'students-treat-literary-discussion-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Volunteering at a slum school, you propose bright wall maps and storybooks of green valleys \'to inspire them\'. Spender\'s poem would ask harder questions.',
            decisions: [{ prompt: 'Do the decorations fix anything?', options: [
                { text: 'Not by themselves — the poem calls the map \'wicked\' when it pictures a world the children can\'t reach; real help is systemic: nutrition, safe space, open pathways out of the slum.', outcome: 'Images of a world that excludes them only taunt; the poem demands changed conditions, not prettier walls.' },
                { text: 'Yes — showing them beautiful worlds is the first step out.', outcome: 'That\'s the poem\'s exact critique: windows that open onto unreachable worlds are cruelty, not education.', reveals: 'tokenism-as-reform' },
                { text: 'Neither — their fate is sealed by birth, so effort is wasted.', outcome: 'Spender writes against that determinism: the classroom fails them because society lets it, which is changeable.', reveals: 'poverty-is-destiny' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a classroom as a political argument — and hear the difference between sympathy and a demand to break the walls.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, revisit the "Think it out" questions in the NCERT text and map each to.',
          misconception: 'Students consistently interpret "keeping quiet" as a call for passive withdrawal, escapism, or death-like stillness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves examining a text beyond its literal',
                  options: ['Critical thinking in literary analysis involves examining a text beyond its literal', 'This node provides the historical, social, and biographical context necessary to', 'For a poem, plot and narrative structure refers to the organization of ideas, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, revisit the "Think it out" questions in the NCERT text and map each to a specific stanza.',
                  misconception: 'Students consistently interpret "keeping quiet" as a call for passive withdrawal, escapism, or death-like stillness — writing answers like.' }
          ],
            remediations: { 'students-consistently-interpret-keeping-quiet': { steps: ['Have the student re-read **only stanzas 4 and 5** aloud, circling every word that signals *life, action, or future*.', 'Ask: "If the poet wanted death, why does he count *up* to twelve and then *leave*?" — forcing them to see the poem as.', 'Assign a 50-word micro-essay: "Explain how \'keeping quiet\' is an *act of resistance* against the \'sadness of never.', 'Re-diagnose with Diagnostic Question 2; if the confusion persists, revisit **c12_eng_f_cbse_10_006 (Primary Theme)**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently interpret "keeping quiet" as a call for passive withdrawal, escapism, or death-like stillness.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the final stanza ("Perhaps the Earth can teach us...") as a conclusion. Does it resolve the poem\'s tension or leave it open?', answer: 'It leaves the tension *productively open*',
                  options: ['It leaves the tension *productively open*', 'a perfect solution', 'a failure to conclude', 'keeping quiet'],
                  hint: 'If stuck, revisit the "Think it out" questions in the NCERT text and map each to a specific stanza.',
                  misconception: 'Students consistently interpret "keeping quiet" as a call for passive withdrawal, escapism, or death-like stillness — writing answers like.' }
          ],
            remediations: { 'students-consistently-interpret-keeping-quiet': { steps: ['Have the student re-read **only stanzas 4 and 5** aloud, circling every word that signals *life, action, or future*.', 'Ask: "If the poet wanted death, why does he count *up* to twelve and then *leave*?" — forcing them to see the poem as.', 'Assign a 50-word micro-essay: "Explain how \'keeping quiet\' is an *act of resistance* against the \'sadness of never.', 'Re-diagnose with Diagnostic Question 2; if the confusion persists, revisit **c12_eng_f_cbse_10_006 (Primary Theme)**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "An Elementary School Classroom in a Slum".',
          hint: 'If stuck, revisit c12_eng_f_cbse_10_008 (Literary Devices: Imagery and Metaphor).',
          misconception: 'Students believe that "writing based on the chapter" means writing a summary or character sketch of the poem\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes an article on "The Plight of Slum Children" and includes the line: "The poet describes the children as having \'skins peeped through.', answer: 'The missing step is the "Explanation" (E) in PEEL',
                  options: ['The missing step is the "Explanation" (E) in PEEL', 'the quote speaks for itself', 'writing based on the chapter'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_10_008 (Literary Devices: Imagery and Metaphor) to re-learn how.',
                  misconception: 'Students believe that "writing based on the chapter" means writing a summary or character sketch of the poem\'s subjects.' },
                { id: 'b', prompt: 'You are writing a letter to the Editor highlighting the need for better infrastructure in government schools, using the poem as a reference.', answer: 'Option (b) is most effective',
                  options: ['Option (b) is most effective', 'writing based on the chapter'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_10_008 (Literary Devices: Imagery and Metaphor) to re-learn how.',
                  misconception: 'Students believe that "writing based on the chapter" means writing a summary or character sketch of the poem\'s subjects.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student produces a summary instead of an argument-driven piece: (1) Have them highlight every sentence in their.', 'every sentence that makes a claim about a real-world issue (green).', '(2) Delete all yellow sentences.', '(3) For each green claim, insert one specific poem detail as evidence using the "Quote Sandwich" method: Context.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured practice.',
          hint: 'Revisit c12_eng_f_cbse_10_008 (Imagery and Metaphor) and practice the "Metaphor →.',
          misconception: 'Students treat literary discussion as a "share your feelings" circle, offering personal reactions ("It\'s sad," "I hate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured practice of',
                  options: ['Speaking and Listening: Discussion Points refers to the structured practice of', 'This node provides the historical, social, and biographical context necessary to', 'For a poem, plot and narrative structure refers to the organization of ideas, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'Revisit c12_eng_f_cbse_10_008 (Imagery and Metaphor) and practice the "Metaphor → Connotation →.',
                  misconception: 'Students treat literary discussion as a "share your feelings" circle, offering personal reactions ("It\'s sad," "I hate inequality") without.' }
          ],
            remediations: { 'students-treat-literary-discussion-as': { steps: ['Have the student re-read stanza 1 and list every noun phrase describing the children (e.g., "rootless weeds," "rat\'s.', 'For each, ask: "What does this metaphor *do* that \'poor child\' does not?" 3.', 'Practice the "Quote → Effect → Question" frame orally with a partner using only these noun phrases.', 'Re-attempt a 2-minute discussion turn on one metaphor, recorded for self-review against the rubric: evidence?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
