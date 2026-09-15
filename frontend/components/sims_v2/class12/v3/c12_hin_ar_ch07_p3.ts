import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch07_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch07_p3',
    title: 'fQjkd xksj[kiqjh · Part 3/3',
    subtitle: 'He wrote the Ramayana where everyone could reach it',
    classLevel: 12, subject: 'hin_ar', topic: 'fQjkd xksj[kiqjh · Part 3/3',
    chapters: ['c12_hin_ar_ch07'],
    nodeIds: ['c12_hin_ar_cbse_07_013', 'c12_hin_ar_cbse_07_014', 'c12_hin_ar_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-poetry scholar', intro: 'Four hundred years ago, a saint decided God\'s story belonged in the marketplace tongue. Hindi was never the same.', goal: 'Place Tulsidas in the Bhakti movement and read his five chhands as form fitted to feeling.' },
    discovery: {
        question: 'In 16th-century India, scripture lived only in Sanskrit — until Tulsidas retold the Ramayana in everyday Awadhi. What made that one language choice revolutionary?',
        options: ['It broke the priestly monopoly — women, Shudras and the unlettered could finally reach the sacred story directly; vernacular became literature', 'Awadhi was more poetic', 'Sanskrit was forgotten', 'He didn\'t know Sanskrit'],
        answer: 'It broke the priestly monopoly — women, Shudras and the unlettered could finally reach the sacred story directly; vernacular became literature',
        hook: 'His five forms here aren\'t experiments — they\'re classical metres mastered and matched to mood: चप्पय\'s even matras for philosophy, दोहा\'s rolling asymmetry for narrative. Variety is discipline, not rebellion; form follows function.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the ability to examine a literary text deeply, identify underlying meanings, evaluate the author\'s techniques, and synthesize evidence to form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_07_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Bhakti workshop: place Tulsidas among the saints, learn what each chhand is built to carry, and weigh how a \'simple\' language shift levelled a hierarchy.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Start by asking the student: "When you read Tulsidas\'s description of the arrow\'s impact in the first poem, what do you feel is the deeper message beyond the.',
            decisions: [{ prompt: 'What is the primary difference between literal comprehension and critical interpretation of a literary text?', options: [
                { text: 'Literal comprehension retrieves explicit information (who, what, where), while critical', outcome: 'Literal comprehension retrieves explicit information (who, what, where), while critical.' },
                { text: 'critical analysis means finding \'hidden meanings\' that are entirely subjective', outcome: 'Not quite — Students often think critical analysis means finding \'hidden meanings\' that are entirely.', reveals: 'critical-analysis-means-finding-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the CBSE board exam hall, staring at Question 12: "राम के वनगमन प्रसंग में दशरथ की मानसिक दशा का चित्रण कीजिए।" You know the story, but your.',
            decisions: [{ prompt: 'What is the full form of PEEL in the context of writing structured answers for CBSE Hindi board exams?', options: [
                { text: 'PEEL stands for **Point** (मुख्य बिंदु), **Evidence** (पाठ्य साक्ष्य/उद्धरण),', outcome: 'PEEL stands for **Point** (मुख्य बिंदु), **Evidence** (पाठ्य साक्ष्य/उद्धरण), **Explanation**.' },
                { text: 'Paragraph, Example, Explanation, Conclusion', outcome: 'Not quite — **Misconception:** "Writing skills means writing *long* answers with *difficult* Sanskritized words.', reveals: 'misconception-writing-skills-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a Class 12 literature circle discussing Tulsidas\'s statement "राम नाम की लूट है, लूट सके सो लूट" — your friend says it\'s only about religion.',
            decisions: [{ prompt: 'What are the five poetic forms (नननन) used in Tulsidas\'s works as discussed in Chapter 7, and which form has 31-31 characters per line with.', options: [
                { text: 'The five forms are: दोहा (doha), चौपाई (chaupai), सवैया (savaiya), कवित्त (kavitt), and', outcome: 'The five forms are: दोहा (doha), चौपाई (chaupai), सवैया (savaiya), कवित्त (kavitt), and सोरठा.' },
                { text: 'कवित्त', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions — they wait for a turn, make.', reveals: 'discussion-means-taking-turns-stating' },
                { text: 'छंद परिचय', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions — they wait for a turn, make.', reveals: 'discussion-means-taking-turns-stating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re cutting a farewell video for a beloved coach. A teammate says the interview clips where the players hesitate before thanking him \'break the flow\' and should be dropped so the highlight reel stays \'propulsive.\'',
            decisions: [{ prompt: 'What would Tulsidas\'s design of the Guha episode argue?', options: [
                { text: 'Keep the hesitations — Tulsidas plants a doha where Guha pauses before letting Rama touch his feet precisely because the pause enacts his inner conflict; the interludes are where character interiority lives, not flow-breakers.', outcome: 'The chapter shows each poetic form sits at a deliberate narrative position — ask \'what would be lost if this were removed\'; in the video, what would be lost is the players\' love made visible as speech-failure.' },
                { text: 'Drop them — momentum is structure; pauses are where viewers swipe away.', outcome: 'That treats the poems in the Manas as decoration between plot points; the chapter\'s test is that the doha does narrative work prose can\'t — it performs devotion rather than describing it.', reveals: 'pauses-are-dead-air' },
                { text: 'Keep the clips but move them all to the end as an \'emotional section\' so they don\'t interrupt the action.', outcome: 'Tulsidas interleaves forms inside the episode rather than appending them — interiority must punctuate the action to mean anything; quarantined at the end it becomes a credits-roll extra.', reveals: 'emotion-belongs-at-the-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Tulsidas as both devotion and democratisation — metre chosen with a craftsman\'s ear, language chosen with a leveller\'s heart.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the ability to examine.',
          hint: 'If stuck, review c12_hin_ar_cbse_07_012 (Comprehension) for inferential question practice.',
          misconception: 'Students often think critical analysis means finding \'hidden meanings\' that are entirely subjective.',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL structure (Point, Evidence, Explanation, Link) to write a short analytical paragraph on how Tulsidas uses rural imagery (e.g., \'pkdj\', \'piy uV\'.', answer: 'Point: Tulsidas uses rural imagery to make divine love accessible',
                  options: ['Point: Tulsidas uses rural imagery to make divine love accessible', 'critical analysis means finding \'hidden meanings\' that are entirely subjective'],
                  hint: 'If stuck, review c12_hin_ar_cbse_07_012 (Comprehension) for inferential question practice and.',
                  misconception: 'Students often think critical analysis means finding \'hidden meanings\' that are entirely subjective.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['Revisit c12_hin_ar_cbse_07_012 (Comprehension) to practice identifying explicit vs implicit information.', 'Use the PEEL template on a single stanza: write Point, quote Evidence, Explain the device, Link to theme.', 'Compare your analysis with the NCERT \'vkjksg\' (explanatory notes) to see how scholars ground interpretations in text.', 'Re-attempt Diagnostic Question 3 with the template, then self-check using the PEEL checklist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think critical analysis means finding \'hidden meanings\' that are entirely subjective.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Tulsidas\'s use of Awadhi dialect in these poems is merely a linguistic choice, not a political or social statement." Defend your.', answer: 'The statement is false',
                  options: ['The statement is false', 'critical analysis means finding \'hidden meanings\' that are entirely subjective'],
                  hint: 'If stuck, review c12_hin_ar_cbse_07_012 (Comprehension) for inferential question practice and.',
                  misconception: 'Students often think critical analysis means finding \'hidden meanings\' that are entirely subjective.' },
                { id: 'b', prompt: 'Create a modern-day parallel scenario (in 3-4 sentences) that captures the essence of \'isV dh vkx\' as a metaphor for an irreversible, transformative emotional.', answer: 'A student from a remote village gets admitted to IIT',
                  options: ['A student from a remote village gets admitted to IIT', 'critical analysis means finding \'hidden meanings\' that are entirely subjective'],
                  hint: 'If stuck, review c12_hin_ar_cbse_07_012 (Comprehension) for inferential question practice and.',
                  misconception: 'Students often think critical analysis means finding \'hidden meanings\' that are entirely subjective.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['Revisit c12_hin_ar_cbse_07_012 (Comprehension) to practice identifying explicit vs implicit information.', 'Use the PEEL template on a single stanza: write Point, quote Evidence, Explain the device, Link to theme.', 'Compare your analysis with the NCERT \'vkjksg\' (explanatory notes) to see how scholars ground interpretations in text.', 'Re-attempt Diagnostic Question 3 with the template, then self-check using the PEEL checklist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck on *finding quotes*: Revisit c12_hin_ar_cbse_07_012 (Comprehension) — practice.',
          misconception: '**Misconception:** "Writing skills means writing *long* answers with *difficult* Sanskritized words (तत्सम शब्द).',
          parts: [
                { id: 'a', prompt: 'What is the full form of PEEL in the context of writing structured answers for CBSE Hindi board exams?', answer: 'PEEL stands for **Point** (मुख्य बिंदु), **Evidence** (पाठ्य साक्ष्य/उद्धरण),',
                  options: ['PEEL stands for **Point** (मुख्य बिंदु), **Evidence** (पाठ्य साक्ष्य/उद्धरण),', 'Paragraph, Example, Explanation, Conclusion'],
                  hint: 'If stuck on *finding quotes*: Revisit c12_hin_ar_cbse_07_012 (Comprehension) — practice "quote.',
                  misconception: '**Misconception:** "Writing skills means writing *long* answers with *difficult* Sanskritized words (तत्सम शब्द) to impress the examiner.".' },
                { id: 'b', prompt: 'A student writes: "दशरथ बहुत दुखी थे क्योंकि राम वन चले गए। यह बहुत दुखद प्रसंग है।" Identify **two** specific flaws in this answer with respect to CBSE Class.', answer: '**Flaw 1:** No textual evidence (उद्धरण)',
                  options: ['**Flaw 1:** No textual evidence (उद्धरण)', 'It\'s too short'],
                  hint: 'If stuck on *finding quotes*: Revisit c12_hin_ar_cbse_07_012 (Comprehension) — practice "quote.',
                  misconception: '**Misconception:** "Writing skills means writing *long* answers with *difficult* Sanskritized words (तत्सम शब्द) to impress the examiner.".' }
          ],
            remediations: { 'misconception-writing-skills-means-writing': { steps: ['** Student rewrites **one** weak answer from a past test using **PEEL highlighters** — Yellow=Point, Green=Evidence.', '** Teacher checks: Is every Green highlight an *exact textual quote* (not paraphrase)?', '** Student practices **3 micro-drills**: (a) Convert 5 prose lines into 3 PEEL paragraphs, (b) Write 2 critical.', '** Re-diagnostic: Student attempts a *new* board-style question (e.g., "तुलसीदास की भक्ति अवधारणा में \'सीस\' का महत्व").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck on form identification: revisit the "छंद परिचय" box at chapter end (page 47-48.',
          misconception: 'Students believe "discussion" means taking turns stating opinions — they wait for a turn, make a general comment.',
          parts: [
                { id: 'a', prompt: 'In the discussion question "सीता के वियोग में राम का जो शोक है, उसे कवि ने हनुमान के मुख से व्यक्त किया है" — why does the poet choose Hanuman as the speaker.', answer: 'Tulsidas uses Hanuman as the speaker',
                  options: ['Tulsidas uses Hanuman as the speaker', 'Hanuman is Ram\'s devotee', 'discussion', 'Tulsidas is great'],
                  hint: 'If stuck on form identification: revisit the "छंद परिचय" box at chapter end (page 47-48 in NCERT).',
                  misconception: 'Students believe "discussion" means taking turns stating opinions — they wait for a turn, make a general comment ("Tulsidas is great"), and.' },
                { id: 'b', prompt: 'Compare the discussion dynamics when analyzing a दोहा (closed form, 2 lines) versus a सवैया (open form, 4 lines with 13/11 meter).', answer: 'A दोहा discussion focuses on compression',
                  options: ['A दोहा discussion focuses on compression', 'discussion', 'Tulsidas is great'],
                  hint: 'If stuck on form identification: revisit the "छंद परिचय" box at chapter end (page 47-48 in NCERT).',
                  misconception: 'Students believe "discussion" means taking turns stating opinions — they wait for a turn, make a general comment ("Tulsidas is great"), and.' }
          ],
            remediations: { 'discussion-means-taking-turns-stating': { steps: ['If a student defaults to opinion-stating: Step 1 — Give them a 2-line doha from the chapter and ask: "What social class.', 'Prove it from the text." Step 2 — Have them practice the "Paraphrase-then-Pivot" technique: repeat a peer\'s point.', 'How many times did they use "because the text shows"?', 'Step 4 — Re-attempt with a new discussion prompt, targeting 3+ textual citations and 1 explicit build-on.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
