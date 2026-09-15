import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch18_p1: SimDef = {
    id: 'v3_c12_eng_k_ch18_p1',
    title: 'The Argumentative Indian (Non-fiction) · Part 1/3',
    subtitle: 'A Nobel economist reads the Gita as a debate India never finished',
    classLevel: 12, subject: 'eng_k', topic: 'The Argumentative Indian (Non-fiction) · Part 1/3',
    chapters: ['c12_eng_k_ch18'],
    nodeIds: ['c12_eng_k_cbse_18_001', 'c12_eng_k_cbse_18_002', 'c12_eng_k_cbse_18_003', 'c12_eng_k_cbse_18_004', 'c12_eng_k_cbse_18_005', 'c12_eng_k_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Public reasoning analyst', intro: 'Three thousand years of argument — epics, Upanishads, women questioners, dissident movements — and Sen asks if that\'s why democracy survived here.', goal: 'Evaluate Sen\'s evidence for India\'s argumentative tradition and its qualified link to democracy.' },
    discovery: {
        question: 'On the battlefield, Krishna orders Arjuna to fight as duty; Arjuna counts the corpses the war will make. Sen refuses to call either wrong — why preserve both voices?',
        options: ['Because the Gita stages two live moral frameworks — duty-based \'faring forward\' vs consequence-based \'faring well\' — and the epic\'s tragic end quietly vindicates Arjuna\'s doubts', 'Because Krishna is always right', 'Because Arjuna won the argument', 'Because epics need conflict'],
        answer: 'Because the Gita stages two live moral frameworks — duty-based \'faring forward\' vs consequence-based \'faring well\' — and the epic\'s tragic end quietly vindicates Arjuna\'s doubts',
        hook: 'This isn\'t a pride parade of \'Indians love to argue\' — Sen is an economist building evidence: a nine-hour UN speech, an epic seven times the Iliad and Odyssey combined, Gargi\'s interrogations. He critiques exclusions too — who was allowed to argue matters as much as that they argued.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is the preparatory stage where students acquire essential knowledge about the author\'s credentials, the book\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_18_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prosecute the thesis like Sen: weigh prolixity\'s evidence, test whether the argumentative tradition was truly inclusive of women and the marginalised, and judge if it really undergirds Indian democracy.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a documentary on "How India Became a Democracy." Before pressing play, you\'d want to know: who made it? What\'s their expertise?',
            decisions: [{ prompt: 'What is the subtitle of Amartya Sen\'s book *The Argumentative Indian*, and what does it indicate about the essay\'s disciplinary approach?', options: [
                { text: 'The subtitle is "Writings on Indian Culture, History and Identity." It indicates the', outcome: 'The subtitle is "Writings on Indian Culture, History and Identity." It indicates the essay.' },
                { text: 'Essays on Indian Philosophy', outcome: 'Not quite — Students often treat "The Argumentative Indian" as a celebration of Indian culture or a religious.', reveals: 'students-often-treat-the-argumentative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked: "How does Sen prove that argumentation is central to Indian identity?" You cannot just list examples — you must show how the essay.',
            decisions: [{ prompt: 'What are the three major thematic sections of Sen\'s essay as indicated by the textbook\'s bold headings, and in what order do they appear?', options: [
                { text: 'The three sections in order are: (1) "Dialogue and Significance" (pp', outcome: 'The three sections in order are: (1) "Dialogue and Significance" (pp.' },
                { text: 'Bhagavad Gita', outcome: 'Not quite — Students think "plot" means "what happens" and since this is an essay, they say "there is no plot.".', reveals: 'plot-means-what-happens-and' },
                { text: 'and since this is an essay, they say', outcome: 'Not quite — Students think "plot" means "what happens" and since this is an essay, they say "there is no plot.".', reveals: 'plot-means-what-happens-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are reading a powerful op-ed in a newspaper about a current debate — say, climate policy.',
            decisions: [{ prompt: 'What is the primary difference between "setting" in a fictional narrative and "setting" in an argumentative non-fiction essay like Sen\'s?', options: [
                { text: 'In fiction, setting is primarily the physical/time/place backdrop for characters and plot', outcome: 'In fiction, setting is primarily the physical/time/place backdrop for characters and plot.' },
                { text: 'setting is where the essay takes place', outcome: 'Not quite — Students often treat "atmosphere" as the author\'s personal mood (e.g., "Sen feels proud of India").', reveals: 'students-often-treat-atmosphere-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re reading an op-ed by a Nobel Prize-winning economist about Indian democracy. You don\'t just ask "What is he saying?" — you ask "Who is speaking?',
            decisions: [{ prompt: 'What is "authorial persona" in a non-fiction essay, and how does it differ from a character in fiction?', options: [
                { text: 'Authorial persona is the constructed voice and intellectual stance the writer adopts', outcome: 'Authorial persona is the constructed voice and intellectual stance the writer adopts — their.' },
                { text: 'It\'s the main person the essay talks about', outcome: 'Not quite — Students treat "Character Analysis: Protagonist" as **analyzing the historical figures Sen.', reveals: 'students-treat-character-analysis-protagonist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re in a heated family WhatsApp group debate about a news article — everyone has an opinion, counter-arguments fly, and the discussion goes on for.',
            decisions: [{ prompt: 'What is the "primary theme" of Amartya Sen\'s essay "The Argumentative Indian" as presented in the NCERT excerpt?', options: [
                { text: 'The primary theme is India\'s long tradition of public reasoning, dialogue, and', outcome: 'The primary theme is India\'s long tradition of public reasoning, dialogue, and argumentation.' },
                { text: 'Sen praises Indian epics', outcome: 'Not quite — Students consistently confuse "theme" with "topic list." They write: "The themes are: 1) Indian.', reveals: 'students-consistently-confuse-theme-with' },
                { text: 'Sen discusses the Bhagavad Gita', outcome: 'Not quite — Students consistently confuse "theme" with "topic list." They write: "The themes are: 1) Indian.', reveals: 'students-consistently-confuse-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Drafting a club speech, a student writes: \'Indians have always argued, so democracy here is automatic and always included everyone.\'',
            decisions: [{ prompt: 'Would Sen endorse that line?', options: [
                { text: 'No — Sen qualifies everything: the argumentative tradition is real but historically excluded women, lower castes and classes; public reasoning strengthens democracy only when it\'s deliberately inclusive, not \'natural\'.', outcome: 'The essay\'s power is in its qualifications — pride-affirming soundbites are precisely what it refuses to offer.' },
                { text: 'Yes — a talkative culture makes democracy inevitable.', outcome: 'Sen rejects cultural determinism; argument is a resource that must be used, not a guarantee.', reveals: 'culture-causes-democracy' },
                { text: 'Yes — and the tradition was open to everyone from the start.', outcome: 'Sen documents exactly who was shut out; romanticising the past as universal is the selectivity he warns against.', reveals: 'tradition-was-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now handle a big cultural claim with a scholar\'s restraint — celebrating the tradition while auditing its exclusions. That\'s the essay\'s true discipline.',
            decisions: [{ prompt: 'What comes next? The Argumentative Indian (Non-fiction) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Argumentative Indian (Non-fiction) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative.',
          hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Woven Words Ch1 Before You Read) and practice.',
          misconception: 'Students often treat "The Argumentative Indian" as a celebration of Indian culture or a religious defense of the Gita.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is',
                  options: ['"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is', 'In a non-fiction argumentative essay like "The Argumentative Indian," **plot and', 'In non-fiction argumentative prose, **setting** refers to the historical, cultural,', 'Character analysis in non-fiction essays examines the **authorial persona**'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Woven Words Ch1 Before You Read) and practice the.',
                  misconception: 'Students often treat "The Argumentative Indian" as a celebration of Indian culture or a religious defense of the Gita.' }
          ],
            remediations: { 'students-often-treat-the-argumentative': { steps: ['If a student exhibits the above misconception: (1) Have them re-read only the "Stop and Think" boxes and the "Democracy.', '(2) Ask them to write one sentence answering: "Does Sen think the Gita\'s message is complete?', 'Quote the exact phrase where he says it isn\'t." (3) Have them list the three groups Sen says were historically excluded.', '(4) Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_002', difficulty: 'standard',
          question: 'In a non-fiction argumentative essay like "The Argumentative Indian," **plot.',
          hint: 'If unable to separate content from function, revisit **c11_eng_w_cbse_05_002** (Woven.',
          misconception: 'Students think "plot" means "what happens" and since this is an essay, they say "there is no plot." They then list.',
          parts: [
                { id: 'a', prompt: 'What are the three major thematic sections of Sen\'s essay as indicated by the textbook\'s bold headings, and in what order do they appear?', answer: 'The three sections in order are: (1) "Dialogue and Significance" (pp',
                  options: ['The three sections in order are: (1) "Dialogue and Significance" (pp', 'Bhagavad Gita', 'and since this is an essay, they say', 'Bhagavad Gita" as a section'],
                  hint: 'If unable to separate content from function, revisit **c11_eng_w_cbse_05_002** (Woven Words Ch5.',
                  misconception: 'Students think "plot" means "what happens" and since this is an essay, they say "there is no plot." They then list topics (Gita, women.' },
                { id: 'b', prompt: 'The essay contains five "Stop and Think" boxes. Identify the *structural position* of the first two (after the Gita discussion, before the gender section) and.', answer: 'The first two "Stop and Think" boxes appear on p',
                  options: ['The first two "Stop and Think" boxes appear on p', 'and since this is an essay, they say'],
                  hint: 'If unable to separate content from function, revisit **c11_eng_w_cbse_05_002** (Woven Words Ch5.',
                  misconception: 'Students think "plot" means "what happens" and since this is an essay, they say "there is no plot." They then list topics (Gita, women.' }
          ],
            remediations: { 'plot-means-what-happens-and': { steps: ['Have the student reread **only the bold headings and first/last sentence of each paragraph** (skim for architecture).', 'Ask: "What *job* does this paragraph do?', '(e.g., \'introduces counterargument\', \'provides historical evidence\', \'qualifies the claim\')".', 'Have them draw a flowchart: Box 1 → Box 2 → Box 3 with arrows labeled "expands", "complicates", "applies".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "plot" means "what happens" and since this is an essay, they say "there is no plot." They then list.',
          parts: [
                { id: 'a', prompt: 'Write a 50-word "structural summary" of the essay that captures its narrative arc *without mentioning any specific example* (no Gita, Gargi, Kabir, etc.).', answer: 'Strong answer: "Hook (prolixity anecdote) → Thesis (argumentative tradition) →',
                  options: ['Strong answer: "Hook (prolixity anecdote) → Thesis (argumentative tradition) →', 'and since this is an essay, they say'],
                  hint: 'If unable to separate content from function, revisit **c11_eng_w_cbse_05_002** (Woven Words Ch5.',
                  misconception: 'Students think "plot" means "what happens" and since this is an essay, they say "there is no plot." They then list topics (Gita, women.' }
          ],
            remediations: { 'plot-means-what-happens-and': { steps: ['Have the student reread **only the bold headings and first/last sentence of each paragraph** (skim for architecture).', 'Ask: "What *job* does this paragraph do?', '(e.g., \'introduces counterargument\', \'provides historical evidence\', \'qualifies the claim\')".', 'Have them draw a flowchart: Box 1 → Box 2 → Box 3 with arrows labeled "expands", "complicates", "applies".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_003', difficulty: 'standard',
          question: 'In non-fiction argumentative prose, **setting** refers to the historical.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (Hornbill Chapter 1: Setting and Atmosphere) and.',
          misconception: 'Students often treat "atmosphere" as the author\'s personal mood (e.g., "Sen feels proud of India") rather than the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In non-fiction argumentative prose, **setting** refers to the historical, cultural,',
                  options: ['In non-fiction argumentative prose, **setting** refers to the historical, cultural,', '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is', 'In a non-fiction argumentative essay like "The Argumentative Indian," **plot and', 'Character analysis in non-fiction essays examines the **authorial persona**'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (Hornbill Chapter 1: Setting and Atmosphere) and re-do the.',
                  misconception: 'Students often treat "atmosphere" as the author\'s personal mood (e.g., "Sen feels proud of India") rather than the **rhetorical climate.' }
          ],
            remediations: { 'students-often-treat-atmosphere-as': { steps: ['Ask the student to list 5 adjectives describing the "feel" of the first paragraph vs.', 'the democracy paragraph — forcing them to distinguish textual tone from authorial emotion.', 'Have them highlight every qualifying phrase in the essay ("often enough," "by and large," "not entirely," "I would.', 'Assign a 150-word rewrite of a current news editorial where they deliberately shift atmosphere twice (e.g., from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_004', difficulty: 'standard',
          question: 'Character analysis in non-fiction essays examines the **authorial persona**.',
          hint: 'If stuck, return to c11_eng_h_cbse_01_004 and re-learn: "Character = what the text.',
          misconception: 'Students treat "Character Analysis: Protagonist" as **analyzing the historical figures Sen discusses** (Krishna.',
          parts: [
                { id: 'a', prompt: 'In the first three paragraphs, Sen writes: "I recall with much joy how my own life was vastly enriched when I encountered them first as a restless youngster.', answer: 'It establishes Sen as a *participant* in the tradition, not just an observer',
                  options: ['It establishes Sen as a *participant* in the tradition, not just an observer', 'He liked the Mahabharata'],
                  hint: 'If stuck, return to c11_eng_h_cbse_01_004 and re-learn: "Character = what the text reveals about.',
                  misconception: 'Students treat "Character Analysis: Protagonist" as **analyzing the historical figures Sen discusses** (Krishna, Arjuna, Gargi, Draupadi.' }
          ],
            remediations: { 'students-treat-character-analysis-protagonist': { steps: ['If student analyzes Krishna/Arjuna/Gargi instead of Sen: 1.', '**Re-read the first 5 paragraphs** with a highlighter: mark every "I," "my," "we," "our," "me." 2.', '**Ask aloud:** "What does *this sentence* tell me about the *writer* — not the subject?" 3.', '**Complete this frame:** "By choosing to open with ___, Sen shows himself to be a thinker who ___." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_005', difficulty: 'standard',
          question: 'In non-fiction essays, supporting characters are the historical, literary.',
          hint: 'If stuck, re-read the “Gender, Caste and Voice” section (pp. 180-185) and list each named.',
          misconception: 'Students often treat supporting characters in non-fiction as mere “examples” or “illustrations” of Sen’s points.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In non-fiction essays, supporting characters are the historical, literary, philosophical,',
                  options: ['In non-fiction essays, supporting characters are the historical, literary, philosophical,', '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is', 'In a non-fiction argumentative essay like "The Argumentative Indian," **plot and', 'In non-fiction argumentative prose, **setting** refers to the historical, cultural,'],
                  hint: 'If stuck, re-read the “Gender, Caste and Voice” section (pp. 180-185) and list each named person.',
                  misconception: 'Students often treat supporting characters in non-fiction as mere “examples” or “illustrations” of Sen’s points, forgetting that Sen stages.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If the student conflates “example” with “argumentative voice,” do this: (1) Re-read the Gargi passage (pp.', '181-182) and highlight every verb that shows her agency (e.g., “enters the fray,” “approaches you with two questions”).', '(2) Write one sentence: “Gargi does not just illustrate women’s participation; she ______.” (3) Repeat for Draupadi and.', '(4) Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_006', difficulty: 'standard',
          question: 'The primary theme of "The Argumentative Indian" is India\'s ancient.',
          hint: 'If stuck on thesis-tracing, review Class 11 Hornbill Chapter 1 "The Portrait of a Lady".',
          misconception: 'Students consistently confuse "theme" with "topic list." They write: "The themes are: 1) Indian epics are long, 2).',
          parts: [
                { id: 'a', prompt: 'What is the "primary theme" of Amartya Sen\'s essay "The Argumentative Indian" as presented in the NCERT excerpt?', answer: 'The primary theme is India\'s long tradition of public reasoning, dialogue, and',
                  options: ['The primary theme is India\'s long tradition of public reasoning, dialogue, and', 'Sen praises Indian epics', 'Sen discusses the Bhagavad Gita', 'They write'],
                  hint: 'If stuck on thesis-tracing, review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" Theme node.',
                  misconception: 'Students consistently confuse "theme" with "topic list." They write: "The themes are: 1) Indian epics are long, 2) Krishna vs Arjuna, 3).' },
                { id: 'b', prompt: 'Apply Sen\'s framework to a contemporary issue: The government proposes a new dam project (duty: provide electricity/irrigation).', answer: 'The government\'s stance — "we must build the dam',
                  options: ['The government\'s stance — "we must build the dam', 'anti-development', 'They write'],
                  hint: 'If stuck on thesis-tracing, review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" Theme node.',
                  misconception: 'Students consistently confuse "theme" with "topic list." They write: "The themes are: 1) Indian epics are long, 2) Krishna vs Arjuna, 3).' }
          ],
            remediations: { 'students-consistently-confuse-theme-with': { steps: ['Have the student re-read only the first and last paragraphs of each major section (Prolixity, Dialogue and.', 'Ask: "What *one sentence* connects all four?" — guide them to draft: "Sen argues that X, Y, Z, and W together prove.', 'Compare their draft to the MASTERY_CRITERIA definition.', 'Assign WORKED_EXAMPLE_1 as remedial practice — it models the synthesis move explicitly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
