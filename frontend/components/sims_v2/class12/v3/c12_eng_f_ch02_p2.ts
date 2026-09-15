import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch02_p2: SimDef = {
    id: 'v3_c12_eng_f_ch02_p2',
    title: 'Lost Spring · Part 2/3',
    subtitle: 'Two cages, one stolen spring — poverty engineered, not accidental',
    classLevel: 12, subject: 'eng_f', topic: 'Lost Spring · Part 2/3',
    chapters: ['c12_eng_f_ch02'],
    nodeIds: ['c12_eng_f_cbse_02_007', 'c12_eng_f_cbse_02_008', 'c12_eng_f_cbse_02_009', 'c12_eng_f_cbse_02_010', 'c12_eng_f_cbse_02_011', 'c12_eng_f_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Investigative journalist', intro: 'A boy who should be in school wipes tables at a tea stall. This chapter asks why millions like him never get spring.', goal: 'Read Lost Spring as literary journalism exposing structural poverty, migration and caste-driven child labour.' },
    discovery: {
        question: 'Saheb calls ragpicking \'gold\' — a rupee glinting in a garbage heap. The elders call it survival. Is the author romanticising child labour?',
        options: ['No — the child\'s wonder beside the elder\'s trap exposes how poverty commodifies innocence itself', 'Yes — it shows children are happy working', 'Neither — it\'s just a description', 'The gold line is a metaphor for actual treasure'],
        answer: 'No — the child\'s wonder beside the elder\'s trap exposes how poverty commodifies innocence itself',
        hook: 'Lost Spring is journalism, not fiction — two different cages: stateless 1971 migrants in Seemapuri and caste-bound bangle families in Firozabad. Pity is the wrong lens; the text anatomises a system — middlemen, police, \'karam\' — that keeps law on paper and children at furnaces.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas that run alongside the primary theme, adding depth and complexity to a text by exploring related social, psychological, or moral dimensions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Investigate two stolen childhoods like a reporter: separate migrant statelessness from caste entrapment, weigh the laws that exist against the nexus that ignores them, and decode what the title\'s \'spring\' really lost.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "The story \'Lost Spring\' is not just about child labour. It explores several interconnected social evils.',
            decisions: [{ prompt: 'Name any three secondary themes present in "Lost Spring" other than the primary theme of child labour/stolen childhood.', options: [
                { text: 'Correct answer: (1) Generational poverty and the cycle of survival, (2) Caste-based', outcome: 'Correct answer: (1) Generational poverty and the cycle of survival, (2) Caste-based hereditary.' },
                { text: 'poverty, shoes, bangles', outcome: 'Not quite — Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall,".', reveals: 'students-confuse-topics-with-themes' },
                { text: 'topics', outcome: 'Not quite — Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall,".', reveals: 'students-confuse-topics-with-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading a government report on child labour: it gives statistics — "20,000 children work in glass furnaces." Now read Anees Jung: "Their eyes.',
            decisions: [{ prompt: 'Define metaphor and give ONE example from *Lost Spring* that is NOT "Garbage to them is gold".', options: [
                { text: '**Correct answer:** A metaphor is an implicit comparison where one thing is described', outcome: '**Correct answer:** A metaphor is an implicit comparison where one thing is described *as* another.' },
                { text: 'hands move mechanically *like* the tongs of a machine', outcome: 'Not quite — **Students treat imagery as "description" and metaphor as "decoration".** They write: "The author.', reveals: 'students-treat-imagery-as-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are watching a child named Saheb wearing discarded tennis shoes with a hole, standing outside a fenced tennis court where rich boys play.',
            decisions: [{ prompt: 'What is the literal meaning of the name "Saheb-e-Alam," and what is the ironic contrast between this meaning and Saheb\'s actual life in the.', options: [
                { text: 'The literal meaning is "lord of the universe." The irony is that Saheb is a barefoot', outcome: 'The literal meaning is "lord of the universe." The irony is that Saheb is a barefoot ragpicker who.' },
                { text: 'his name means he is rich', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading "Lost Spring" and hit the phrase "slog their daylight hours" — you don\'t know "slog", but you see children working in furnaces, losing.',
            decisions: [{ prompt: 'What does the expression "perpetual state of poverty" mean in the context of the ragpickers in Seemapuri, and which word in the phrase.', options: [
                { text: '"Perpetual state of poverty" means poverty that is endless, continuing indefinitely', outcome: '"Perpetual state of poverty" means poverty that is endless, continuing indefinitely across.' },
                { text: 'very poor right now', outcome: 'Not quite — Students think "vocabulary in context" means guessing a synonym from a dictionary-like definition.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'perpetual', outcome: 'Not quite — Students think "vocabulary in context" means guessing a synonym from a dictionary-like definition.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading Saheb\'s dialogue: "I have nothing else to do," he mutters.',
            decisions: [{ prompt: 'Identify the tense and voice of the verb phrase "have come to recognise" in the sentence: "Over the months, I have come to recognise each.', options: [
                { text: 'Correct answer: Present perfect active', outcome: 'Correct answer: Present perfect active. The auxiliary "have" + past participle "come" forms present.' },
                { text: 'past tense', outcome: 'Not quite — Students often treat grammar analysis as merely labeling parts of speech (e.g., "this is a past.', reveals: 'students-often-treat-grammar-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you sit in the exam hall and see a 3-mark question: *"Why does Anees Jung say that promises made to poor children are rarely kept?"* Your heart races.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "garbage to them is gold" as used in the context of Saheb and the ragpickers of Seemapuri?', options: [
                { text: 'The phrase literally means that the ragpickers find valuable items (like rupee coins or', outcome: 'The phrase literally means that the ragpickers find valuable items (like rupee coins or ten-rupee.' },
                { text: 'garbage is precious like gold', outcome: 'Not quite — Students often treat **inferential questions as "opinion questions"** and write vague answers like.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An NGO volunteer finds children feeding glass furnaces in a bangle-making town. The elders say, \'this is our ancestral craft — it\'s tradition.\'',
            decisions: [{ prompt: 'How should she respond?', options: [
                { text: 'Treat it as a structural trap, not a tradition: the work is hazardous child labour sustained by middlemen, debt and dead ends — so push schooling, enforcement and viable alternatives together.', outcome: 'Like Mukesh\'s Firozabad in \'Lost Spring\', \'tradition\' is how exploitation dresses itself up; a rescued child with no alternative goes straight back to the furnace.' },
                { text: 'Respect it — it\'s their culture, and outsiders shouldn\'t interfere.', outcome: 'That confuses inherited compulsion with chosen culture; the children themselves dream of garages and schools.', reveals: 'culture-excuse-for-exploitation' },
                { text: 'Just pull the children out this week — job done.', outcome: 'Rescue without alternatives returns them to the same economic trap; the system, not just the child, has to change.', reveals: 'rescue-without-alternative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lyrical reportage as structural evidence, not just a sad story. That pivot — from feeling to analysis — is what separates a full-marks answer from a plot summary.',
            decisions: [{ prompt: 'What comes next? Lost Spring · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Lost Spring · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas that run alongside the primary theme.',
          hint: 'If stuck, review the distinction between topic and theme using the formula: "The text.',
          misconception: 'Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall," "Firozabad," "Seemapuri".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the "barefoot tradition" functions as a secondary theme in the Saheb narrative.', answer: 'Correct answer: The barefoot tradition appears as a cultural explanation for why',
                  options: ['Correct answer: The barefoot tradition appears as a cultural explanation for why', 'children don\'t wear shoes', 'tradition', 'topics'],
                  hint: 'If stuck, review the distinction between topic and theme using the formula: "The text is about.',
                  misconception: 'Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall," "Firozabad," "Seemapuri" as themes.' },
                { id: 'b', prompt: 'Compare and contrast how the theme of "migration and displacement" operates in Saheb\'s story (Dhaka to Seemapuri) versus the implied migration in Mukesh\'s.', answer: 'Correct answer: Saheb\'s migration is physical and recent',
                  options: ['Correct answer: Saheb\'s migration is physical and recent', 'miles away from Delhi, metaphorically', 'Saheb moved, Mukesh didn\'t', 'topics'],
                  hint: 'If stuck, review the distinction between topic and theme using the formula: "The text is about.',
                  misconception: 'Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall," "Firozabad," "Seemapuri" as themes.' }
          ],
            remediations: { 'students-confuse-topics-with-themes': { steps: ['If the student lists topics instead of themes: Step 1 — Ask "What IDEA does the bangles represent?', 'What IDEA does garbage represent?" Step 2 — Have them complete: "The bangles show how ______ traps people." "The.', 'Bangles + "born in caste, seen nothing but bangles" = Hereditary occupational entrapment.', 'Step 4 — Re-attempt Diagnostic Question 1 with this formula.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall," "Firozabad," "Seemapuri".',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s portrayal of the "vicious circle of middlemen" (sahukars, police, politicians, bureaucrats) as a secondary theme.', answer: 'Correct answer: Yes, the portrayal is effective',
                  options: ['Correct answer: Yes, the portrayal is effective', 'middlemen are bad so they can\'t organise', 'topics', 'themes'],
                  hint: 'If stuck, review the distinction between topic and theme using the formula: "The text is about.',
                  misconception: 'Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall," "Firozabad," "Seemapuri" as themes.' },
                { id: 'b', prompt: 'Create a new secondary theme statement for "Lost Spring" that is not explicitly named in the text but emerges from the interplay of the two narratives.', answer: 'Correct answer: Theme: "The commodification of childhood wonder"',
                  options: ['Correct answer: Theme: "The commodification of childhood wonder"', 'topics', 'themes', 'bangles'],
                  hint: 'If stuck, review the distinction between topic and theme using the formula: "The text is about.',
                  misconception: 'Students confuse "topics" with "themes." They list "bangles," "garbage," "shoes," "tea stall," "Firozabad," "Seemapuri" as themes.' }
          ],
            remediations: { 'students-confuse-topics-with-themes': { steps: ['If the student lists topics instead of themes: Step 1 — Ask "What IDEA does the bangles represent?', 'What IDEA does garbage represent?" Step 2 — Have them complete: "The bangles show how ______ traps people." "The.', 'Bangles + "born in caste, seen nothing but bangles" = Hereditary occupational entrapment.', 'Step 4 — Re-attempt Diagnostic Question 1 with this formula.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If unclear on tenor/vehicle or PEEL, review **c11_eng_h_cbse_01_008** (Class 11 Literary.',
          misconception: '**Students treat imagery as "description" and metaphor as "decoration".** They write: "The author uses imagery.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If unclear on tenor/vehicle or PEEL, review **c11_eng_h_cbse_01_008** (Class 11 Literary Devices).',
                  misconception: '**Students treat imagery as "description" and metaphor as "decoration".** They write: "The author uses imagery to describe the place".' }
          ],
            remediations: { 'students-treat-imagery-as-description': { steps: ['** Re-read the "Thinking about language" section in the NCERT (pages 20-21) — it explicitly defines hyperbole.', '** Take the 11 examples listed there (e.g., "drowned in an air of desolation", "web of poverty") and for **each**, fill.', '** Re-attempt Diagnostic Questions 2 and 4 using this table. **', '** If still stuck, revisit **c11_eng_h_cbse_01_008** (Class 11 Hornbill Ch1 Literary Devices) for the foundational PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck on identifying symbolism, review the "bangle" analysis in c12_eng_f_cbse_02_008.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck.',
          parts: [
                { id: 'a', prompt: 'Saheb takes a job at a tea stall for 800 rupees and meals. The author notes: "The steel canister seems heavier than the plastic bag he would carry so lightly.', answer: 'The steel canister symbolizes the loss of autonomy and the burden of child labor',
                  options: ['The steel canister symbolizes the loss of autonomy and the burden of child labor', 'the canister represents his income'],
                  hint: 'If stuck on identifying symbolism, review the "bangle" analysis in c12_eng_f_cbse_02_008 (Step 3.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony from coincidence, do this 3-step remediation: (1) Revisit the definition: irony.', '(2) Use the "Saheb-e-Alam" example: walk through the literal meaning vs.', 'his life, asking "What does the author want us to feel at this gap?" (3) Give a mini-exercise: list 5 events from the.', 'If stuck, return to node c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism) for foundational practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_010', difficulty: 'standard',
          question: 'Vocabulary in context refers to the skill of determining the meaning.',
          hint: 'If stuck, re-read the "Notice these expressions" box in the NCERT text and the paragraphs.',
          misconception: 'Students think "vocabulary in context" means guessing a synonym from a dictionary-like definition in the text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context refers to the skill of determining the meaning of unfamiliar words',
                  options: ['Vocabulary in context refers to the skill of determining the meaning of unfamiliar words', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, re-read the "Notice these expressions" box in the NCERT text and the paragraphs around.',
                  misconception: 'Students think "vocabulary in context" means guessing a synonym from a dictionary-like definition in the text.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Have the student re-read the "Notice these expressions" box in the NCERT text and match each expression to the exact.', 'For each, identify: (a) the literal words, (b) the metaphor/contrast/irony used, (c) the socio-economic reality.', 'Practice with a new paragraph: "The steel canister seems heavier than the plastic bag he would carry so lightly over.', 'The canister belongs to the man who owns the tea shop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how grammatical.',
          hint: 'If stuck, review c11_eng_h_cbse_01_011 worked examples on linking grammar to theme.',
          misconception: 'Students often treat grammar analysis as merely labeling parts of speech (e.g., "this is a past tense verb") without.',
          parts: [
                { id: 'a', prompt: 'Identify the tense and voice of the verb phrase "have come to recognise" in the sentence: "Over the months, I have come to recognise each of them."', answer: 'Correct answer: Present perfect active',
                  options: ['Correct answer: Present perfect active', 'past tense'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_011 worked examples on linking grammar to theme in "The Portrait.',
                  misconception: 'Students often treat grammar analysis as merely labeling parts of speech (e.g., "this is a past tense verb") without linking the.' },
                { id: 'b', prompt: 'Rewrite the direct speech "Why aren\'t you wearing chappals?" into reported speech with the reporting verb "asked".', answer: 'Correct answer: She asked why he wasn\'t wearing chappals',
                  options: ['Correct answer: She asked why he wasn\'t wearing chappals', 'She asked why aren\'t you wearing chappals'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_011 worked examples on linking grammar to theme in "The Portrait.',
                  misconception: 'Students often treat grammar analysis as merely labeling parts of speech (e.g., "this is a past tense verb") without linking the.' }
          ],
            remediations: { 'students-often-treat-grammar-analysis': { steps: ['If a student cannot connect grammar to theme: 1) Revisit c11_eng_h_cbse_01_011 (Class 11 Grammar: Language Usage) for.', '2) Reread the "Lost Spring" excerpt highlighting only verb forms — colour-code: past narration, present dialogue.', '3) For each colour, write one sentence: "This [structure] shows [theme] because..." 4) Re-attempt Diagnostic Questions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck on inferential questions, revisit the "Understanding the Text" questions in the.',
          misconception: 'Students often treat **inferential questions as "opinion questions"** and write vague answers like "I think Saheb.',
          parts: [
                { id: 'a', prompt: 'Analyze the difference between Saheb\'s and Mukesh\'s attitudes toward their situations. What does this contrast reveal about the theme of "daring to dream"?', answer: 'Saheb accepts his fate',
                  options: ['Saheb accepts his fate', 'daring is not part of his growing up', 'Saheb is poor, Mukesh is ambitious'],
                  hint: 'If stuck on inferential questions, revisit the "Understanding the Text" questions in the NCERT.',
                  misconception: 'Students often treat **inferential questions as "opinion questions"** and write vague answers like "I think Saheb is sad" without textual.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student writes opinions without evidence: (1) Give them a 3-mark inferential question and ask them to **highlight.', '(2) Have them redo the answer using the **PEEL template**: "The text says ______ (Evidence).', 'This shows ______ (Explanation).', 'This connects to the theme of ______ (Link)." (3) Re-test with a similar question from the NCERT "Talking about the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
