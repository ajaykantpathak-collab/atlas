import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch18_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch18_p2: SimDef = {
    id: 'v3_c12_eng_k_ch18_p2',
    title: 'The Argumentative Indian (Non-fiction) · Part 2/3',
    subtitle: 'A Nobel economist reads the Gita as a debate India never finished',
    classLevel: 12, subject: 'eng_k', topic: 'The Argumentative Indian (Non-fiction) · Part 2/3',
    chapters: ['c12_eng_k_ch18'],
    nodeIds: ['c12_eng_k_cbse_18_007', 'c12_eng_k_cbse_18_008', 'c12_eng_k_cbse_18_009', 'c12_eng_k_cbse_18_010', 'c12_eng_k_cbse_18_011', 'c12_eng_k_cbse_18_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Public reasoning analyst', intro: 'Three thousand years of argument — epics, Upanishads, women questioners, dissident movements — and Sen asks if that\'s why democracy survived here.', goal: 'Evaluate Sen\'s evidence for India\'s argumentative tradition and its qualified link to democracy.' },
    discovery: {
        question: 'On the battlefield, Krishna orders Arjuna to fight as duty; Arjuna counts the corpses the war will make. Sen refuses to call either wrong — why preserve both voices?',
        options: ['Because the Gita stages two live moral frameworks — duty-based \'faring forward\' vs consequence-based \'faring well\' — and the epic\'s tragic end quietly vindicates Arjuna\'s doubts', 'Because Krishna is always right', 'Because Arjuna won the argument', 'Because epics need conflict'],
        answer: 'Because the Gita stages two live moral frameworks — duty-based \'faring forward\' vs consequence-based \'faring well\' — and the epic\'s tragic end quietly vindicates Arjuna\'s doubts',
        hook: 'This isn\'t a pride parade of \'Indians love to argue\' — Sen is an economist building evidence: a nine-hour UN speech, an epic seven times the Iliad and Odyssey combined, Gargi\'s interrogations. He critiques exclusions too — who was allowed to argue matters as much as that they argued.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in a non-fiction essay are the supporting ideas that run alongside the primary argument, enriching the text by exploring related dimensions such as gender, caste, class, historical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_18_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prosecute the thesis like Sen: weigh prolixity\'s evidence, test whether the argumentative tradition was truly inclusive of women and the marginalised, and judge if it really undergirds Indian democracy.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re in a debate competition and your opponent says, "India\'s tradition of argument was only for elite men — it has nothing to do with democracy.',
            decisions: [{ prompt: 'List the four women interlocutors from ancient texts whom Sen explicitly names as participants in India\'s argumentative tradition, and the.', options: [
                { text: 'Gargi (Brihadaranyaka Upanishad), Maitreyi (Brihadaranyaka Upanishad), Draupadi', outcome: 'Gargi (Brihadaranyaka Upanishad), Maitreyi (Brihadaranyaka Upanishad), Draupadi (Mahabharata.' },
                { text: 'only modern figures like Sarojini Naidu or omitting the textual source', outcome: 'Not quite — Students often treat "secondary themes" as a random list of topics Sen mentions.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading Sen\'s essay and stumble on the phrase "rutting elephant tearing off his garland with his trunk" — why does a serious economist use such.',
            decisions: [{ prompt: 'What is the *literal* meaning of the metaphor "fare forward" as used by T.S.', options: [
                { text: 'Correct answer: "Fare forward" literally means to continue one\'s journey or voyage ahead,', outcome: 'Correct answer: "Fare forward" literally means to continue one\'s journey or voyage ahead, without.' },
                { text: 'fare well means to succeed', outcome: 'Not quite — Students often treat imagery and metaphor as *decorative flourishes* — "Sen uses beautiful language.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re reading a modern op-ed where the writer cites a 1945 nuclear scientist quoting a 2000-year-old Sanskrit text to critique *both* — that jarring.',
            decisions: [{ prompt: 'Define \'situational irony\' and \'symbol\' in the specific context of non-fiction argumentative prose like Sen\'s essay.', options: [
                { text: 'Situational irony in non-fiction occurs when a historical outcome or intellectual', outcome: 'Situational irony in non-fiction occurs when a historical outcome or intellectual position.' },
                { text: 'irony is sarcasm', outcome: 'Not quite — Students conflate **verbal irony/sarcasm** ("saying the opposite") with the **structural/historical.', reveals: 'students-conflate-verbal-irony-sarcasm' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading a dense opinion piece in *The Hindu* or *The Wire* and hit a word like "heterodoxy" — do you skip it, guess wildly, or decode it?',
            decisions: [{ prompt: 'What is the meaning of "prolixity" as used in the opening paragraph of the essay, and what context clue type (definition, example.', options: [
                { text: '"Prolixity" means excessive wordiness or lengthiness in speech/writing', outcome: '"Prolixity" means excessive wordiness or lengthiness in speech/writing.' },
                { text: 'fluency', outcome: 'Not quite — Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation*.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'eloquence', outcome: 'Not quite — Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation*.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a newspaper editorial where the writer says "The policy is largely successful" instead of "The policy is successful." Why add.',
            decisions: [{ prompt: 'From the first two paragraphs of the essay, list three words (other than "prolixity") that belong to the semantic field of speaking.', options: [
                { text: 'Correct answers include: loquaciousness, speak, dialogues, debates, arguments,', outcome: 'Correct answers include: loquaciousness, speak, dialogues, debates, arguments, counterarguments.' },
                { text: 'Kashmir', outcome: 'Not quite — Students equate "qualification" (hedging) with weakness or vagueness, believing strong writing.', reveals: 'students-equate-qualification-hedging-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Drafting a club speech, a student writes: \'Indians have always argued, so democracy here is automatic and always included everyone.\'',
            decisions: [{ prompt: 'Would Sen endorse that line?', options: [
                { text: 'No — Sen qualifies everything: the argumentative tradition is real but historically excluded women, lower castes and classes; public reasoning strengthens democracy only when it\'s deliberately inclusive, not \'natural\'.', outcome: 'The essay\'s power is in its qualifications — pride-affirming soundbites are precisely what it refuses to offer.' },
                { text: 'Yes — a talkative culture makes democracy inevitable.', outcome: 'Sen rejects cultural determinism; argument is a resource that must be used, not a guarantee.', reveals: 'culture-causes-democracy' },
                { text: 'Yes — and the tradition was open to everyone from the start.', outcome: 'Sen documents exactly who was shut out; romanticising the past as universal is the selectivity he warns against.', reveals: 'tradition-was-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now handle a big cultural claim with a scholar\'s restraint — celebrating the tradition while auditing its exclusions. That\'s the essay\'s true discipline.',
            decisions: [{ prompt: 'What comes next? The Argumentative Indian (Non-fiction) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Argumentative Indian (Non-fiction) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_007', difficulty: 'standard',
          question: 'Secondary themes in a non-fiction essay are the supporting ideas that run.',
          hint: 'If unclear on primary vs secondary, return to c12_eng_k_cbse_18_006 and write the primary.',
          misconception: 'Students often treat "secondary themes" as a random list of topics Sen mentions.',
          parts: [
                { id: 'a', prompt: 'List the four women interlocutors from ancient texts whom Sen explicitly names as participants in India\'s argumentative tradition, and the textual source for.', answer: 'Gargi (Brihadaranyaka Upanishad), Maitreyi (Brihadaranyaka Upanishad), Draupadi',
                  options: ['Gargi (Brihadaranyaka Upanishad), Maitreyi (Brihadaranyaka Upanishad), Draupadi', 'only modern figures like Sarojini Naidu or omitting the textual source'],
                  hint: 'If unclear on primary vs secondary, return to c12_eng_k_cbse_18_006 and write the primary theme.',
                  misconception: 'Students often treat "secondary themes" as a random list of topics Sen mentions.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If the student cannot distinguish primary vs secondary themes or link evidence to argument: (1) Re-read node.', '(2) Create a two-column table: Column A = Misconception Sen targets (e.g., "argument was male-only"), Column.', '(3) Practice writing one PEEL paragraph per secondary theme using the table.', '(4) Re-attempt Diagnostic Question 4 to test if the structural link is clear.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck on vehicle/tenor mapping, revisit Class 11 Hornbill Chapter 1 (The Portrait of.',
          misconception: 'Students often treat imagery and metaphor as *decorative flourishes* — "Sen uses beautiful language to make the essay.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is', 'In a non-fiction argumentative essay like "The Argumentative Indian," **plot and', 'In non-fiction argumentative prose, **setting** refers to the historical, cultural,'],
                  hint: 'If stuck on vehicle/tenor mapping, revisit Class 11 Hornbill Chapter 1 (The Portrait of a Lady).',
                  misconception: 'Students often treat imagery and metaphor as *decorative flourishes* — "Sen uses beautiful language to make the essay interesting." This.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['If a student cannot move beyond "imagery creates a picture," do this 3-step remediation: (1) Give them the "rutting.', '(2) Have them complete a two-column table: Column A = Image phrase; Column B = What this image *proves* about Sen\'s.', '(3) Re-attempt Diagnostic Question 3 with a new passage (e.g., "weapon of mass destruction" for Oppenheimer).', 'Only proceed when they can articulate *proof*, not just *picture*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_009', difficulty: 'standard',
          question: 'Irony in non-fiction argumentative writing is a rhetorical strategy where the.',
          hint: 'If unable to distinguish irony types or symbol vs metaphor, re-do the worked examples.',
          misconception: 'Students conflate **verbal irony/sarcasm** ("saying the opposite") with the **structural/historical irony** Sen employs.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'symbol\' to Oppenheimer in Sen\'s essay. Quote the specific lines linking him to Krishna/Arjuna, then explain what abstract concept.', answer: 'Lines: "J',
                  options: ['Lines: "J', 'Oppenheimer symbolizes science'],
                  hint: 'If unable to distinguish irony types or symbol vs metaphor, re-do the worked examples.',
                  misconception: 'Students conflate **verbal irony/sarcasm** ("saying the opposite") with the **structural/historical irony** Sen employs (where outcomes.' }
          ],
            remediations: { 'students-conflate-verbal-irony-sarcasm': { steps: ['**Revisit definitions**: Use Class 11 node `c11_eng_h_cbse_01_009` (Irony & Symbolism in Hornbill Ch.1) to relearn the.', '**Micro-practice**: Take a 2-paragraph op-ed (e.g., from *The Hindu* editorial page).', 'Highlight every historical reference.', 'Ask: "Is this used literally or as a symbol for X?" Flag any outcome that contradicts an earlier stated goal — label.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'If unsure about context-clue types, review the "Language Work" section of Class 11.',
          misconception: 'Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation* and *argumentative.',
          parts: [
                { id: 'a', prompt: 'What is the meaning of "prolixity" as used in the opening paragraph of the essay, and what context clue type (definition, example, contrast, inference).', answer: '"Prolixity" means excessive wordiness or lengthiness in speech/writing',
                  options: ['"Prolixity" means excessive wordiness or lengthiness in speech/writing', 'fluency', 'eloquence', 'prolix'],
                  hint: 'If unsure about context-clue types, review the "Language Work" section of Class 11 Hornbill Chapter.',
                  misconception: 'Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation* and *argumentative function*.' },
                { id: 'b', prompt: 'Sen writes: "The univocal \'message of the Gita\' requires supplementation by the broader argumentative wisdom of the Mahabharata." Explain what "univocal" means.', answer: '"Univocal" means having one single, unambiguous voice or interpretation',
                  options: ['"Univocal" means having one single, unambiguous voice or interpretation', 'authoritative', '(one) +'],
                  hint: 'If unsure about context-clue types, review the "Language Work" section of Class 11 Hornbill Chapter.',
                  misconception: 'Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation* and *argumentative function*.' },
                { id: 'c', prompt: 'Compare the connotations of "levelling" in this sentence: "The undermining of the superiority of the priestly caste played quite a big part in these initially.', answer: 'Everyday meaning: making flat/equal physically',
                  options: ['Everyday meaning: making flat/equal physically', 'it means making everyone equal', 'deontology', 'consequential'],
                  hint: 'If unsure about context-clue types, review the "Language Work" section of Class 11 Hornbill Chapter.',
                  misconception: 'Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation* and *argumentative function*.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Re-read the **exact paragraph** where the target word appears (use the NCERT text provided).', 'Highlight the **clue words** (e.g., for "heterodoxy": "toleration of intellectual heterodoxy", "persistent arguments".', 'Complete a **Frayer Model** for 3 troublesome words: Definition (in context), Characteristics, Examples (from essay).', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation* and *argumentative.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s claim: "Sen uses \'heretical\' to describe the medieval mystical poets because they were anti-religious." Use textual evidence to support.', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'deontology', 'consequential'],
                  hint: 'If unsure about context-clue types, review the "Language Work" section of Class 11 Hornbill Chapter.',
                  misconception: 'Students treat vocabulary-in-context as "guess the dictionary definition" and ignore *connotation* and *argumentative function*.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Re-read the **exact paragraph** where the target word appears (use the NCERT text provided).', 'Highlight the **clue words** (e.g., for "heterodoxy": "toleration of intellectual heterodoxy", "persistent arguments".', 'Complete a **Frayer Model** for 3 troublesome words: Definition (in context), Characteristics, Examples (from essay).', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'If unable to segment noun phrases, revisit c11_eng_h_cbse_01_011 (Language Work sections.',
          misconception: 'Students equate "qualification" (hedging) with weakness or vagueness, believing strong writing means absolute.',
          parts: [
                { id: 'a', prompt: 'From the first two paragraphs of the essay, list three words (other than "prolixity") that belong to the semantic field of speaking, writing, or argumentation.', answer: 'Correct answers include: loquaciousness, speak, dialogues, debates, arguments,',
                  options: ['Correct answers include: loquaciousness, speak, dialogues, debates, arguments,', 'Kashmir'],
                  hint: 'If unable to segment noun phrases, revisit c11_eng_h_cbse_01_011 (Language Work sections on noun.',
                  misconception: 'Students equate "qualification" (hedging) with weakness or vagueness, believing strong writing means absolute statements ("Sen proves.' },
                { id: 'b', prompt: 'Sen writes: "The arguments are also, often enough, quite substantive." Explain in your own words what the phrases "often enough" and "quite" do to the claim.', answer: '"Often enough" limits the frequency (not always, but sufficiently frequent)',
                  options: ['"Often enough" limits the frequency (not always, but sufficiently frequent)', 'they mean the same thing'],
                  hint: 'If unable to segment noun phrases, revisit c11_eng_h_cbse_01_011 (Language Work sections on noun.',
                  misconception: 'Students equate "qualification" (hedging) with weakness or vagueness, believing strong writing means absolute statements ("Sen proves.' },
                { id: 'c', prompt: 'Compare the rhetorical effect of these two versions of a Sen-like sentence: Version A: "India\'s argumentative tradition has crossed caste barriers." Version.', answer: 'Version B mirrors Sen\'s style',
                  options: ['Version B mirrors Sen\'s style', 'it\'s simpler'],
                  hint: 'If unable to segment noun phrases, revisit c11_eng_h_cbse_01_011 (Language Work sections on noun.',
                  misconception: 'Students equate "qualification" (hedging) with weakness or vagueness, believing strong writing means absolute statements ("Sen proves.' }
          ],
            remediations: { 'students-equate-qualification-hedging-with': { steps: ['Have the student re-read the "Language Work" section (NCERT pp.', '188-189) and physically mark every qualification phrase in the essay with a highlighter.', 'Give them five simple absolute sentences ("Democracy is good." "The Gita supports duty.") and ask them to rewrite each.', 'Use the noun phrase from Worked Example 1 — have them build three variants by adding/removing pre-modifiers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information directly stated.',
          hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text (pp.179, 185) — they are.',
          misconception: 'Students treat ALL comprehension questions as "find the answer in the text." They don\'t realize inferential questions.',
          parts: [
                { id: 'a', prompt: 'Question: "How does Sen connect Maitreyi\'s question (\'What should I do with that by which I do not become immortality?\') to his concept of economic.', answer: 'The inference is oversimplified and misses Sen\'s precise logical bridge',
                  options: ['The inference is oversimplified and misses Sen\'s precise logical bridge', 'not caring about money', 'distinguishing means (wealth) from ends (capabilities)'],
                  hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text (pp.179, 185) — they are the.',
                  misconception: 'Students treat ALL comprehension questions as "find the answer in the text." They don\'t realize inferential questions require a LOGICAL.' }
          ],
            remediations: { 'students-treat-all-comprehension-questions': { steps: ['Give the student a 2-column table: Column A = 5 question stems from the chapter\'s "Understanding the Text" section.', 'Have them classify each and justify in one sentence.', 'For every misclassified item, model the "keyword scan" technique: underline question verbs (what/why/how), locate.', 'Revisit node c12_eng_k_cbse_18_002 (Plot and Narrative Structure) to reinforce how Sen\'s essay structure (claim →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
