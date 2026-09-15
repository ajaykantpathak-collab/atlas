import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch04_p1: SimDef = {
    id: 'v3_c12_hist_ch04_p1',
    title: 'Thinkers, Beliefs and Buildings (Jainism, Buddhism) · Part 1/2',
    subtitle: 'The horse that wandered was drawing a border',
    classLevel: 12, subject: 'history', topic: 'Thinkers, Beliefs and Buildings (Jainism, Buddhism) · Part 1/2',
    chapters: ['c12_hist_ch04'],
    nodeIds: ['c12_hist_cbse_04_001', 'c12_hist_cbse_04_002', 'c12_hist_cbse_04_003', 'c12_hist_cbse_04_004', 'c12_hist_cbse_04_005', 'c12_hist_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Vedic-age historian', intro: 'Before temples and texts, there was fire — and whoever controlled it controlled the sacred.', goal: 'Trace the sacrificial tradition\'s shift from pastoral yajna to royal legitimation — and the critique it provoked.' },
    discovery: {
        question: 'A king lets a horse wander for a year, then performs a massive sacrifice where it went. Why did ashvamedha become politics by ritual?',
        options: ['The horse\'s path claimed the territory — an unchallenged wander meant unchallenged sovereignty, and the Brahmanas\' blessing sealed it', 'It was just religion', 'Horses needed exercise', 'Rigveda demanded it'],
        answer: 'The horse\'s path claimed the territory — an unchallenged wander meant unchallenged sovereignty, and the Brahmanas\' blessing sealed it',
        hook: 'Early Vedic yajnas were simple asks — cattle, sons, victory. Later royal rites needed hundreds of priests and made Brahmanas the sole keepers of cosmic order. But exclusivity bred its critics: the Upanishads asked what ritual couldn\'t answer, and the Shramana challenge followed.',
    },
    teaching: [
        { title: 'Sacrificial Traditions: Vedic Ritualism and the Brahmana\'s Authority', text: 'The sacrificial tradition (yajna) in the Vedic period (c. 1500–500 BCE) was a ritual system where offerings (ghee, grains, soma) were made into the sacred fire (Agni) to invoke deities like Indra.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the fire\'s evolution: weigh a Rigvedic household offering against a year-long royal rite, and watch ritual monopoly produce the very questions that undid it.',
        labels: ['Sacrificial Traditions: Vedic Ritualism', 'The Shramana Challenge: Asceticism', 'Jainism: Mahavira and', 'Jain Philosophy: Five Vows', 'Jain Sects: Digambaras', 'Buddhism: The Life'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_001', title: 'Sacrificial Traditions: Vedic Ritualism and the Brahmana\'s Authority',
          caseStudy: { intro: 'Imagine you are standing at the Sanchi stupa (Fig. 4.3) and wonder: *what religious world existed before Buddhism?* Begin by recalling Class 9\'s "Vedic.',
            decisions: [{ prompt: 'In the early Vedic period (c. 1500–1000 BCE), yajnas were primarily performed for which of the following purposes?', options: [
                { text: 'Correct answer: **B**', outcome: 'Correct answer: **B**. The Rigvedic hymns (Source 1 in NCERT) explicitly invoke Agni for "abundant.' },
                { text: 'Hinduism', outcome: 'Not quite — **Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE.', reveals: 'students-think-the-vedic-sacrificial' },
                { text: 'rejected Hinduism', outcome: 'Not quite — **Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE.', reveals: 'students-think-the-vedic-sacrificial' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_002', title: 'The Shramana Challenge: Asceticism and Anti-Vedic Movements',
          caseStudy: { intro: 'Imagine you are at a Jain temple during Paryushan and hear the vow of ahimsa — non-violence to even insects.',
            decisions: [{ prompt: 'What is the literal meaning of *kutagarashala* and what role did it play in 6th century BCE intellectual life?', options: [
                { text: '*Kutagarashala* literally means "a hut with a pointed roof"', outcome: '*Kutagarashala* literally means "a hut with a pointed roof"; it served as a venue where travelling.' },
                { text: 'a Buddhist monastery', outcome: 'Not quite — Students often think "Shramana" = "Buddhism + Jainism only" and that all Shramanas were unified.', reveals: 'shramana-buddhism-jainism-only-and' },
                { text: 'a Vedic school', outcome: 'Not quite — Students often think "Shramana" = "Buddhism + Jainism only" and that all Shramanas were unified.', reveals: 'shramana-buddhism-jainism-only-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_003', title: 'Jainism: Mahavira and the Tirthankara Tradition',
          caseStudy: { intro: 'Imagine you are visiting the Mathura Museum and see a 3rd-century CE red sandstone statue of a naked figure standing in kayotsarga posture with a shrivatsa.',
            decisions: [{ prompt: 'Who was the 23rd Tirthankara immediately preceding Mahavira, and what is the traditional time gap between them according to Jain tradition?', options: [
                { text: 'The 23rd Tirthankara was Parshvanatha, traditionally placed 250 years before Mahavira (c', outcome: 'The 23rd Tirthankara was Parshvanatha, traditionally placed 250 years before Mahavira (c.' },
                { text: 'almost the same', outcome: 'Not quite — Students often think Jainism and Buddhism are "almost the same" because both are shramana.', reveals: 'jainism-and-buddhism-are-almost' },
                { text: 'Rishabhanatha as the immediate predecessor or giving a gap of 1000 years', outcome: 'Not quite — Students often think Jainism and Buddhism are "almost the same" because both are shramana.', reveals: 'jainism-and-buddhism-are-almost' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_004', title: 'Jain Philosophy: Five Vows (Mahavratas) and Anekantavada (Many-Sidedness)',
          caseStudy: { intro: 'Imagine you are standing before a 12th-century Jain manuscript illustration at the National Museum, Delhi, showing a monk carefully sweeping the ground before.',
            decisions: [{ prompt: 'List the five Mahavratas in the correct Sanskrit terms and give the one-sentence practical meaning of each for a Jain monk.', options: [
                { text: 'The five Mahavratas are: 1) Ahimsa', outcome: 'The five Mahavratas are: 1) Ahimsa — non-violence in thought, word, and deed toward all living.' },
                { text: 'all opinions are equally true', outcome: 'Not quite — Students often think Anekantavada means "all opinions are equally true" (relativism) and that the.', reveals: 'anekantavada-means-all-opinions-are' },
                { text: 'only four, confusing with Buddhist precepts, or giving layperson versions', outcome: 'Not quite — Students often think Anekantavada means "all opinions are equally true" (relativism) and that the.', reveals: 'anekantavada-means-all-opinions-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_005', title: 'Jain Sects: Digambaras and Shvetambaras and Differences in Practice',
          caseStudy: { intro: 'Imagine you are standing before the colossal monolithic statue of Bahubali at Shravanabelagola in Karnataka — its nudity, serene detachment, and sheer scale.',
            decisions: [{ prompt: 'Name the two major sects of Jainism and state the literal meaning of each sect\'s name.', options: [
                { text: 'The two major sects are Digambara (literally "sky-clad" or "clothed in the', outcome: 'The two major sects are Digambara (literally "sky-clad" or "clothed in the directions/space") and.' },
                { text: 'Hinayana/Mahayana', outcome: 'Not quite — Students often believe the Digambara-Shvetambara split is simply "one group wears clothes, the.', reveals: 'the-digambara-shvetambara-split-is' },
                { text: 'Theravada/Mahasanghika', outcome: 'Not quite — Students often believe the Digambara-Shvetambara split is simply "one group wears clothes, the.', reveals: 'the-digambara-shvetambara-split-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After two failed mock tests, a classmate shrugs: \'My rank is already decided — effort can\'t change what\'s measured out. Like a ball of string unwinding, it reaches the end on its own.\'',
            decisions: [{ prompt: 'Which Shramana-era position is he channeling, and what does the chapter\'s counter look like?', options: [
                { text: 'He\'s quoting Ajivika fatalism — Makkhali Gosala\'s string unwinding regardless of effort; the Jaina-Buddhist counter is that karma is made by present action, so effort is the variable — \'be lamps unto yourselves\', not unwind and wait.', outcome: 'The chapter\'s debate culture had an answer for exactly this: fatalism was one sect\'s position, refuted by traditions that made individual agency the engine of change.' },
                { text: 'He\'s basically Buddhist — Buddhism also says desire and effort lead to suffering, so detachment is right.', outcome: 'That conflates the rivals: the Buddha\'s path is built on striving — ethical effort is what ends suffering; the \'nothing can be changed\' line belongs to the fatalists his tradition argued against.', reveals: 'fatalism-equals-buddhism' },
                { text: 'He\'s a materialist — since nothing survives death, studying is pointless anyway.', outcome: 'That\'s the Lokayata extreme, not what he said: he affirmed a destined unwindable order, which is fatalism; materialism denies karma and afterlife outright — different exit, different error.', reveals: 'fatalism-equals-materialism' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a sacrifice as a constitution — ritual that built sovereignty, and built its own opposition.',
            decisions: [{ prompt: 'What comes next? Thinkers, Beliefs and Buildings (Jainism, Buddhism) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Thinkers, Beliefs and Buildings (Jainism, Buddhism) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_001', difficulty: 'standard',
          question: 'The sacrificial tradition (yajna) in the Vedic period (c. 1500–500 BCE) was.',
          hint: 'If stuck, revisit c9_hist_ch3_1 (Early vs Later Vedic) and c9_hist_ch3_9 (Varna-Jati).',
          misconception: '**Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE onwards, and that.',
          parts: [
                { id: 'a', prompt: 'In the early Vedic period (c. 1500–1000 BCE), yajnas were primarily performed for which of the following purposes?', answer: 'Correct answer: **B**',
                  options: ['Correct answer: **B**', 'Hinduism', 'rejected Hinduism'],
                  hint: 'If stuck, revisit c9_hist_ch3_1 (Early vs Later Vedic) and c9_hist_ch3_9 (Varna-Jati) — focus.',
                  misconception: '**Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE onwards, and that the Buddha/Mahavira.' },
                { id: 'b', prompt: 'Why did the ashvamedha (horse sacrifice) and rajasuya (royal consecration) become politically significant in the later Vedic period (c. 1000–500 BCE)?', answer: 'Correct answer: **B**',
                  options: ['Correct answer: **B**', 'replaced', 'Hinduism', 'rejected Hinduism'],
                  hint: 'If stuck, revisit c9_hist_ch3_1 (Early vs Later Vedic) and c9_hist_ch3_9 (Varna-Jati) — focus.',
                  misconception: '**Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE onwards, and that the Buddha/Mahavira.' },
                { id: 'c', prompt: 'A historian finds a later Vedic inscription describing a king who performed the ashvamedha, distributed 10,000 cows as dakshina, and claimed the title.', answer: 'Correct answer: **B**',
                  options: ['Correct answer: **B**', 'chiefs and kings who depended on Brahmana priests', 'Hinduism', 'rejected Hinduism'],
                  hint: 'If stuck, revisit c9_hist_ch3_1 (Early vs Later Vedic) and c9_hist_ch3_9 (Varna-Jati) — focus.',
                  misconception: '**Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE onwards, and that the Buddha/Mahavira.' }
          ],
            remediations: { 'students-think-the-vedic-sacrificial': { steps: ['If the student holds the static "Hinduism" misconception: 1.', '**Revisit c9_hist_ch3_1 (Vedic Society: Early and Later Vedic Periods)** — create a timeline: Rigveda (1500 BCE) →.', 'Mark *changes*: pastoral → agrarian; simple yajna → ashvamedha; external ritual → internal knowledge.', '**Re-read NCERT Section 2.1–2.3** — highlight verbs: "compiled," "later...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE onwards, and that.',
          parts: [
                { id: 'a', prompt: 'Construct a historical argument (150 words) explaining why the Vedic sacrificial tradition, despite its political utility for kings, generated its own.', answer: '**Expected argument structure:** 1',
                  options: ['**Expected argument structure:** 1', 'Hinduism', 'rejected Hinduism'],
                  hint: 'If stuck, revisit c9_hist_ch3_1 (Early vs Later Vedic) and c9_hist_ch3_9 (Varna-Jati) — focus.',
                  misconception: '**Students think the Vedic sacrificial tradition was a static, unchanging "Hinduism" from 1500 BCE onwards, and that the Buddha/Mahavira.' }
          ],
            remediations: { 'students-think-the-vedic-sacrificial': { steps: ['If the student holds the static "Hinduism" misconception: 1.', '**Revisit c9_hist_ch3_1 (Vedic Society: Early and Later Vedic Periods)** — create a timeline: Rigveda (1500 BCE) →.', 'Mark *changes*: pastoral → agrarian; simple yajna → ashvamedha; external ritual → internal knowledge.', '**Re-read NCERT Section 2.1–2.3** — highlight verbs: "compiled," "later...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_002', difficulty: 'standard',
          question: 'The Shramana Challenge refers to the 6th century BCE emergence of renunciant.',
          hint: 'If unclear on Vedic rituals, revisit **c9_hist_ch3_1** (Early/Later Vedic) and.',
          misconception: 'Students often think "Shramana" = "Buddhism + Jainism only" and that all Shramanas were unified in opposing Vedic.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of *kutagarashala* and what role did it play in 6th century BCE intellectual life?', answer: '*Kutagarashala* literally means "a hut with a pointed roof"',
                  options: ['*Kutagarashala* literally means "a hut with a pointed roof"', 'a Buddhist monastery', 'a Vedic school', 'Shramana'],
                  hint: 'If unclear on Vedic rituals, revisit **c9_hist_ch3_1** (Early/Later Vedic) and.',
                  misconception: 'Students often think "Shramana" = "Buddhism + Jainism only" and that all Shramanas were unified in opposing Vedic religion.' },
                { id: 'b', prompt: 'Compare the Ajivika and Lokayata positions on afterlife and karma.', answer: 'Ajivikas denied human agency (fatalism)',
                  options: ['Ajivikas denied human agency (fatalism)', 'Shramana', 'Buddhism + Jainism only'],
                  hint: 'If unclear on Vedic rituals, revisit **c9_hist_ch3_1** (Early/Later Vedic) and.',
                  misconception: 'Students often think "Shramana" = "Buddhism + Jainism only" and that all Shramanas were unified in opposing Vedic religion.' }
          ],
            remediations: { 'shramana-buddhism-jainism-only-and': { steps: ['Re-read NCERT Theme 2, Sections 2.1–2.3 (pp.', '83–87) focusing on the *sequence*: Vedic sacrifice → Upanishadic questions → 64 sects → kutagarashala debates.', 'Revisit **c7_hist_ch01_004** (Gangetic Plains urbanization) and **c9_hist_ch3_9** (Varna/Jati) to link social change.', 'Create a 4-column table: School | View on Karma | View on Afterlife | View on Human Effort.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_003', difficulty: 'standard',
          question: 'Jainism is an ancient Indian shramana tradition centered on the teachings of 24.',
          hint: 'If confused about the historical setting, revisit Class 9 node c9_hist_ch3_4 (Magadha.',
          misconception: 'Students often think Jainism and Buddhism are "almost the same" because both are shramana traditions rejecting Vedas.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Jainism is an ancient Indian shramana tradition centered on the teachings of 24',
                  options: ['Jainism is an ancient Indian shramana tradition centered on the teachings of 24', 'The sacrificial tradition (yajna) in the Vedic period (c', 'The Shramana Challenge refers to the 6th century BCE emergence of renunciant traditions', 'Jain philosophy centers on the Five Great Vows (Mahavratas)'],
                  hint: 'If confused about the historical setting, revisit Class 9 node c9_hist_ch3_4 (Magadha: Rise.',
                  misconception: 'Students often think Jainism and Buddhism are "almost the same" because both are shramana traditions rejecting Vedas and caste.' }
          ],
            remediations: { 'jainism-and-buddhism-are-almost': { steps: ['Re-read NCERT Theme 4, Section 3 (pp.', '88–89) focusing on the phrases "entire world is animated" and "asceticism and penance are required." 2.', 'Watch the 10-min video "Jainism: Mahavira and Tirthankaras" (NCERT official) noting the kayotsarga posture and.', 'Compare the five vows (next node c12_hist_cbse_04_004) with Buddhist precepts — make a two-column table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_004', difficulty: 'standard',
          question: 'Jain philosophy centers on the Five Great Vows (Mahavratas) — non-violence.',
          hint: 'Revisit the "Message of Mahavira" section (NCERT pp. 88-89) and the Uttaradhyayana Sutta.',
          misconception: 'Students often think Anekantavada means "all opinions are equally true" (relativism) and that the Mahavratas are simply.',
          parts: [
                { id: 'a', prompt: 'List the five Mahavratas in the correct Sanskrit terms and give the one-sentence practical meaning of each for a Jain monk.', answer: 'The five Mahavratas are: 1) Ahimsa',
                  options: ['The five Mahavratas are: 1) Ahimsa', 'all opinions are equally true', 'only four, confusing with Buddhist precepts, or giving layperson versions'],
                  hint: 'Revisit the "Message of Mahavira" section (NCERT pp. 88-89) and the Uttaradhyayana Sutta excerpt.',
                  misconception: 'Students often think Anekantavada means "all opinions are equally true" (relativism) and that the Mahavratas are simply stricter versions.' }
          ],
            remediations: { 'anekantavada-means-all-opinions-are': { steps: ['If the student conflates Anekantavada with relativism, re-read the Uttaradhyayana Sutta episode (Source 4) where.', 'Buddhist precepts, create a two-column table: column A = Jain vow with karmic mechanism (e.g., ahimsa stops.', 'Re-attempt Diagnostic Questions 2 and 4 after this exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_005', difficulty: 'standard',
          question: 'The Digambara ("sky-clad") and Shvetambara ("white-clad") are the two major.',
          hint: 'If unclear on aparigraha or anekantavada, revisit c12_hist_cbse_04_004 worked examples.',
          misconception: 'Students often believe the Digambara-Shvetambara split is simply "one group wears clothes, the other doesn\'t" —.',
          parts: [
                { id: 'a', prompt: 'Name the two major sects of Jainism and state the literal meaning of each sect\'s name.', answer: 'The two major sects are Digambara (literally "sky-clad" or "clothed in the',
                  options: ['The two major sects are Digambara (literally "sky-clad" or "clothed in the', 'Hinayana/Mahayana', 'Theravada/Mahasanghika', 'one group wears clothes, the other doesn\'t'],
                  hint: 'If unclear on aparigraha or anekantavada, revisit c12_hist_cbse_04_004 worked examples on vow.',
                  misconception: 'Students often believe the Digambara-Shvetambara split is simply "one group wears clothes, the other doesn\'t" — a superficial sartorial.' },
                { id: 'b', prompt: 'A historian finds a 5th-century CE Jain sculpture at Mathura showing a tirthankara standing in kayotsarga posture, completely nude, with no ornaments.', answer: 'The image belongs to the Digambara tradition',
                  options: ['The image belongs to the Digambara tradition', 'Mathura had both sects', 'one group wears clothes, the other doesn\'t'],
                  hint: 'If unclear on aparigraha or anekantavada, revisit c12_hist_cbse_04_004 worked examples on vow.',
                  misconception: 'Students often believe the Digambara-Shvetambara split is simply "one group wears clothes, the other doesn\'t" — a superficial sartorial.' },
                { id: 'c', prompt: 'Compare the Digambara and Shvetambara positions on whether women can attain moksha (liberation) in their current birth.', answer: 'Digambaras hold that women cannot attain moksha directly',
                  options: ['Digambaras hold that women cannot attain moksha directly', 'both sects allow women moksha', 'one group wears clothes, the other doesn\'t'],
                  hint: 'If unclear on aparigraha or anekantavada, revisit c12_hist_cbse_04_004 worked examples on vow.',
                  misconception: 'Students often believe the Digambara-Shvetambara split is simply "one group wears clothes, the other doesn\'t" — a superficial sartorial.' }
          ],
            remediations: { 'the-digambara-shvetambara-split-is': { steps: ['If the student cannot articulate at least three doctrinal differences beyond clothing, follow this remediation: (1).', '(2) Create a two-column table: left column = Digambara position, right column = Shvetambara position, for these five.', '(3) Use the NCERT Class 12 textbook box on "Jaina texts" (Theme 4, Section 3.1) to note which texts each sect accepts.', '(4) Re-attempt DIAGNOSTIC_QUESTION_4 and DIAGNOSTIC_QUESTION_5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_006', difficulty: 'standard',
          question: 'The life of Siddhartha Gautama (c. 563–483 BCE), who became the Buddha.',
          hint: 'If the Buddha\'s motivations feel opaque, revisit c12_hist_cbse_04_002\'s "Debates and.',
          misconception: 'Students conflate the *Buddha\'s life story* (hagiographical narrative) with *historical biography*, treating the Four.',
          parts: [
                { id: 'a', prompt: 'A Sanchi sculpture shows the Buddha\'s departure from Kapilavastu with his horse Kanthaka and groom Channa, but the Buddha himself is absent — only an empty.', answer: 'Early Buddhist art (c',
                  options: ['Early Buddhist art (c', 'they couldn\'t carve well', 'it was a style choice'],
                  hint: 'If the Buddha\'s motivations feel opaque, revisit c12_hist_cbse_04_002\'s "Debates and discussions".',
                  misconception: 'Students conflate the *Buddha\'s life story* (hagiographical narrative) with *historical biography*, treating the Four Sights, Mara\'s.' }
          ],
            remediations: { 'students-conflate-the-buddha-s': { steps: ['89–91 on "How Buddhist texts were prepared and preserved" — note the gap between oral teaching (Buddha\'s lifetime) and.', 'Revisit c12_hist_cbse_04_002 (Shramana Challenge) to grasp the shared intellectual world of Buddha and Mahavira.', '95) to plot the four pilgrimage sites and Ashoka\'s pillars — visualise the geography.', 'Re-attempt Diagnostic Questions 2 and 5 focusing on *textual construction* vs *historical fact*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
