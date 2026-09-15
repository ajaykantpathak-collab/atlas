import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch04_p2: SimDef = {
    id: 'v3_c12_hist_ch04_p2',
    title: 'Thinkers, Beliefs and Buildings (Jainism, Buddhism) · Part 2/2',
    subtitle: 'The horse that wandered was drawing a border',
    classLevel: 12, subject: 'history', topic: 'Thinkers, Beliefs and Buildings (Jainism, Buddhism) · Part 2/2',
    chapters: ['c12_hist_ch04'],
    nodeIds: ['c12_hist_cbse_04_007', 'c12_hist_cbse_04_008', 'c12_hist_cbse_04_009', 'c12_hist_cbse_04_010', 'c12_hist_cbse_04_011', 'c12_hist_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Vedic-age historian', intro: 'Before temples and texts, there was fire — and whoever controlled it controlled the sacred.', goal: 'Trace the sacrificial tradition\'s shift from pastoral yajna to royal legitimation — and the critique it provoked.' },
    discovery: {
        question: 'A king lets a horse wander for a year, then performs a massive sacrifice where it went. Why did ashvamedha become politics by ritual?',
        options: ['The horse\'s path claimed the territory — an unchallenged wander meant unchallenged sovereignty, and the Brahmanas\' blessing sealed it', 'It was just religion', 'Horses needed exercise', 'Rigveda demanded it'],
        answer: 'The horse\'s path claimed the territory — an unchallenged wander meant unchallenged sovereignty, and the Brahmanas\' blessing sealed it',
        hook: 'Early Vedic yajnas were simple asks — cattle, sons, victory. Later royal rites needed hundreds of priests and made Brahmanas the sole keepers of cosmic order. But exclusivity bred its critics: the Upanishads asked what ritual couldn\'t answer, and the Shramana challenge followed.',
    },
    teaching: [
        { title: 'The Four Noble Truths and the Eightfold Path', text: 'The Four Noble Truths are the foundational doctrinal framework of Buddhism, articulated by the Buddha in his first sermon at Sarnath (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the fire\'s evolution: weigh a Rigvedic household offering against a year-long royal rite, and watch ritual monopoly produce the very questions that undid it.',
        labels: ['The Four Noble Truths', 'Buddhist Sangha: Monastic Code', 'Buddhist Councils and', 'Stupas: Relics, Anda, Harmika', 'Chaityas and Viharas: Rock-Cut', 'Buddhist Philosophy: Prakrit'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_008', title: 'Buddhist Sangha: Monastic Code (Vinaya Pitaka) and Community Rules',
          caseStudy: { intro: 'Imagine you visit a Buddhist monastery today and see monks eating from a single bowl, wearing patched robes, and gathering to settle a dispute by voting.',
            decisions: [{ prompt: 'What are the three baskets (Tipitaka) of the Buddhist canon, and which one contains the monastic code?', options: [
                { text: 'The three baskets are Vinaya Pitaka (monastic discipline), Sutta Pitaka (discourses), and', outcome: 'The three baskets are Vinaya Pitaka (monastic discipline), Sutta Pitaka (discourses), and.' },
                { text: 'Sutta Pitaka as the code', outcome: 'Not quite — Students often think the Vinaya Pitaka is only a list of prohibitions ("don\'t do this, don\'t.', reveals: 'the-vinaya-pitaka-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_009', title: 'Buddhist Councils and the Split: Theravada, Mahasanghika and Mahayana',
          caseStudy: { intro: 'Imagine you visit the Sanchi stupa and see the four gateways carved with stories of the Buddha\'s previous lives (Jatakas) — but you also notice later additions.',
            decisions: [{ prompt: 'Name the venue and royal patron of the Third Buddhist Council, and state its most significant doctrinal outcome.', options: [
                { text: 'Correct: Third Council at Pataliputra (c', outcome: 'Correct: Third Council at Pataliputra (c. 250 BCE) under Emperor Ashoka; outcome was the expulsion.' },
                { text: 'Kashmir under Kanishka', outcome: 'Not quite — Students often believe the split into Theravada and Mahayana happened at a single council (usually.', reveals: 'the-split-into-theravada-and' },
                { text: 'new religion', outcome: 'Not quite — Students often believe the split into Theravada and Mahayana happened at a single council (usually.', reveals: 'the-split-into-theravada-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_012', title: 'Buddhist Philosophy: Prakrit vs Pali vs Sanskrit Textual Traditions',
          caseStudy: { intro: 'Imagine you visit the National Museum in Delhi and see a 12th-century palm-leaf manuscript in a script you cannot read — the label says "Prajñāpāramitā.',
            decisions: [{ prompt: 'What is the name of the three-part canonical collection compiled at the First Buddhist Council, and in which language was it originally.', options: [
                { text: 'The Tipitaka (Three Baskets)', outcome: 'The Tipitaka (Three Baskets) — Vinaya Pitaka, Sutta Pitaka, Abhidhamma Pitaka — was originally.' },
                { text: 'Sanskrit', outcome: 'Not quite — Students believe Pali was the Buddha\'s "mother tongue" and Sanskrit was a later "corruption.".', reveals: 'pali-was-the-buddha-s' },
                { text: 'written at the First Council', outcome: 'Not quite — Students believe Pali was the Buddha\'s "mother tongue" and Sanskrit was a later "corruption.".', reveals: 'pali-was-the-buddha-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After two failed mock tests, a classmate shrugs: \'My rank is already decided — effort can\'t change what\'s measured out. Like a ball of string unwinding, it reaches the end on its own.\'',
            decisions: [{ prompt: 'Which Shramana-era position is he channeling, and what does the chapter\'s counter look like?', options: [
                { text: 'He\'s quoting Ajivika fatalism — Makkhali Gosala\'s string unwinding regardless of effort; the Jaina-Buddhist counter is that karma is made by present action, so effort is the variable — \'be lamps unto yourselves\', not unwind and wait.', outcome: 'The chapter\'s debate culture had an answer for exactly this: fatalism was one sect\'s position, refuted by traditions that made individual agency the engine of change.' },
                { text: 'He\'s basically Buddhist — Buddhism also says desire and effort lead to suffering, so detachment is right.', outcome: 'That conflates the rivals: the Buddha\'s path is built on striving — ethical effort is what ends suffering; the \'nothing can be changed\' line belongs to the fatalists his tradition argued against.', reveals: 'fatalism-equals-buddhism' },
                { text: 'He\'s a materialist — since nothing survives death, studying is pointless anyway.', outcome: 'That\'s the Lokayata extreme, not what he said: he affirmed a destined unwindable order, which is fatalism; materialism denies karma and afterlife outright — different exit, different error.', reveals: 'fatalism-equals-materialism' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'You can now read a sacrifice as a constitution — ritual that built sovereignty, and built its own opposition.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_007', difficulty: 'standard',
          question: 'The Four Noble Truths are the foundational doctrinal framework of Buddhism.',
          hint: 'Revisit the \'Four Sights\' and the Buddha\'s rejection of extreme asceticism.',
          misconception: 'Students often think the Eightfold Path is a sequential checklist (first right view, then right intention, etc.) to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Four Noble Truths are the foundational doctrinal framework of Buddhism, articulated',
                  options: ['The Four Noble Truths are the foundational doctrinal framework of Buddhism, articulated', 'The sacrificial tradition (yajna) in the Vedic period (c', 'The Shramana Challenge refers to the 6th century BCE emergence of renunciant traditions', 'Jainism is an ancient Indian shramana tradition centered on the teachings of 24'],
                  hint: 'Revisit the \'Four Sights\' and the Buddha\'s rejection of extreme asceticism in c12_hist_cbse_04_006.',
                  misconception: 'Students often think the Eightfold Path is a sequential checklist (first right view, then right intention, etc.) to be completed one.' }
          ],
            remediations: { 'the-eightfold-path-is-a': { steps: ['If the student holds the sequential misconception, have them re-read the Mahacattarisaka Sutta (Majjhima Nikaya 117).', 'Then ask them to map each of the eight factors onto the three trainings.', 'Finally, give a scenario: "A monk has perfect right view but breaks the precept against stealing.', 'Which training is deficient?" This forces integration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_008', difficulty: 'standard',
          question: 'The Buddhist Sangha was the monastic order founded by the Buddha, governed.',
          hint: 'Revisit the Eightfold Path\'s \'Right Livelihood\' and \'Right Action\' — the Vinaya specifies.',
          misconception: 'Students often think the Vinaya Pitaka is only a list of prohibitions ("don\'t do this, don\'t do that") and miss its.',
          parts: [
                { id: 'a', prompt: 'Why did the Buddha initially refuse to admit women into the sangha, and what changed his mind?', answer: 'The Buddha initially refused, fearing the sangha\'s longevity would be halved',
                  options: ['The Buddha initially refused, fearing the sangha\'s longevity would be halved', 'he never refused', 'it was due to political pressure'],
                  hint: 'Revisit the Eightfold Path\'s \'Right Livelihood\' and \'Right Action\' — the Vinaya specifies what.',
                  misconception: 'Students often think the Vinaya Pitaka is only a list of prohibitions ("don\'t do this, don\'t do that") and miss its positive organisational.' },
                { id: 'b', prompt: 'Compare the decision-making process in the Buddhist sangha with that of the gana-sanghas (republican polities) mentioned in earlier chapters.', answer: 'Both used consensus through discussion, resorting to voting if consensus failed',
                  options: ['Both used consensus through discussion, resorting to voting if consensus failed', 'the sangha was autocratic', 'no connection'],
                  hint: 'Revisit the Eightfold Path\'s \'Right Livelihood\' and \'Right Action\' — the Vinaya specifies what.',
                  misconception: 'Students often think the Vinaya Pitaka is only a list of prohibitions ("don\'t do this, don\'t do that") and miss its positive organisational.' }
          ],
            remediations: { 'the-vinaya-pitaka-is-only': { steps: ['If the student confuses Vinaya with Sutta or cannot explain a rule\'s rationale: 1) Re-read Source 7 in the textbook.', '2) Review node c12_hist_cbse_04_007 (Four Noble Truths/Eightfold Path) to see how monastic discipline supports the.', '3) Watch a 5-minute video on the patimokkha ceremony.', '4) Re-attempt Diagnostic Questions 3 and 5, writing the answer in your own words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_009', difficulty: 'standard',
          question: 'The Buddhist Councils were a series of four major monastic assemblies (c.',
          hint: 'If unclear why councils were needed, review the "Rules for monks and nuns" section.',
          misconception: 'Students often believe the split into Theravada and Mahayana happened at a single council (usually the Fourth under.',
          parts: [
                { id: 'a', prompt: 'Name the venue and royal patron of the Third Buddhist Council, and state its most significant doctrinal outcome.', answer: 'Correct: Third Council at Pataliputra (c',
                  options: ['Correct: Third Council at Pataliputra (c', 'Kashmir under Kanishka', 'new religion'],
                  hint: 'If unclear why councils were needed, review the "Rules for monks and nuns" section in NCERT (Source.',
                  misconception: 'Students often believe the split into Theravada and Mahayana happened at a single council (usually the Fourth under Kanishka) and that.' },
                { id: 'b', prompt: 'A 1st-century CE inscription at Sanchi records a donation by a bhikkhuni for "the welfare of all beings" and depicts a Bodhisattva figure.', answer: 'Correct: Early Mahayana',
                  options: ['Correct: Early Mahayana', 'new religion'],
                  hint: 'If unclear why councils were needed, review the "Rules for monks and nuns" section in NCERT (Source.',
                  misconception: 'Students often believe the split into Theravada and Mahayana happened at a single council (usually the Fourth under Kanishka) and that.' }
          ],
            remediations: { 'the-split-into-theravada-and': { steps: ['If the student conflates councils or misattributes the split: 1.', 'Revisit c12_hist_cbse_04_008 (Vinaya Pitaka rules) to see how monastic discipline worked.', 'Create a 2-column table: Council vs.', 'Dispute/Issue (use NCERT Timeline 1, p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the split into Theravada and Mahayana happened at a single council (usually the Fourth under.',
          parts: [
                { id: 'a', prompt: 'Critique the label "Hinayana" (Lesser Vehicle) as used in Mahayana texts to describe early schools.', answer: 'Correct: It is a polemical construct',
                  options: ['Correct: It is a polemical construct', 'Hinayana', 'new religion'],
                  hint: 'If unclear why councils were needed, review the "Rules for monks and nuns" section in NCERT (Source.',
                  misconception: 'Students often believe the split into Theravada and Mahayana happened at a single council (usually the Fourth under Kanishka) and that.' },
                { id: 'b', prompt: 'Construct a timeline (with approximate dates) showing: (a) the four councils, (b) the first schism (Sthaviravada/Mahasanghika), (c) the composition of the Pali.', answer: 'Expected timeline (key annotations): - c',
                  options: ['Expected timeline (key annotations): - c', 'new religion'],
                  hint: 'If unclear why councils were needed, review the "Rules for monks and nuns" section in NCERT (Source.',
                  misconception: 'Students often believe the split into Theravada and Mahayana happened at a single council (usually the Fourth under Kanishka) and that.' }
          ],
            remediations: { 'the-split-into-theravada-and': { steps: ['If the student conflates councils or misattributes the split: 1.', 'Revisit c12_hist_cbse_04_008 (Vinaya Pitaka rules) to see how monastic discipline worked.', 'Create a 2-column table: Council vs.', 'Dispute/Issue (use NCERT Timeline 1, p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_010', difficulty: 'standard',
          question: 'A stupa is a hemispherical Buddhist funerary monument originating as a simple.',
          hint: 'Revisit c12_hist_cbse_04_006 (Buddha\'s life) for the Mahaparinibbana episode and.',
          misconception: 'Students often think the harmika is a \'small box on top\' and the chhatra is just a decorative umbrella; they miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A stupa is a hemispherical Buddhist funerary monument originating as a simple earthen',
                  options: ['A stupa is a hemispherical Buddhist funerary monument originating as a simple earthen', 'The sacrificial tradition (yajna) in the Vedic period (c', 'The Shramana Challenge refers to the 6th century BCE emergence of renunciant traditions', 'Jainism is an ancient Indian shramana tradition centered on the teachings of 24'],
                  hint: 'Revisit c12_hist_cbse_04_006 (Buddha\'s life) for the Mahaparinibbana episode and.',
                  misconception: 'Students often think the harmika is a \'small box on top\' and the chhatra is just a decorative umbrella; they miss that the harmika.' }
          ],
            remediations: { 'the-harmika-is-a-small': { steps: ['95–97 (Section 7.3) and label Fig.', '4.10a (plan) and 4.10b (elevation) with anda, harmika, yashti, chhatra, vedika, torana, pradakshina path.', 'Watch the 5-min ASI video \'Sanchi Stupa Architecture\' (YouTube).', 'Re-attempt Diagnostic Q3 and Q4 using the labelled diagrams.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_011', difficulty: 'standard',
          question: 'Chaityas are rock-cut Buddhist prayer halls characterized by an apsidal.',
          hint: 'Revisit the stupa node (c12_hist_cbse_04_010) for the stupa diagram and the sangha node.',
          misconception: 'Students frequently conflate all rock-cut caves as "Buddhist caves" and assume they belong to a single period.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Chaityas are rock-cut Buddhist prayer halls characterized by an apsidal (semi-circular)',
                  options: ['Chaityas are rock-cut Buddhist prayer halls characterized by an apsidal (semi-circular)', 'The sacrificial tradition (yajna) in the Vedic period (c', 'The Shramana Challenge refers to the 6th century BCE emergence of renunciant traditions', 'Jainism is an ancient Indian shramana tradition centered on the teachings of 24'],
                  hint: 'Revisit the stupa node (c12_hist_cbse_04_010) for the stupa diagram and the sangha node.',
                  misconception: 'Students frequently conflate all rock-cut caves as "Buddhist caves" and assume they belong to a single period.' }
          ],
            remediations: { 'students-frequently-conflate-all-rock': { steps: ['If the student cannot distinguish chaitya from vihara plans, or misplaces sites chronologically: 1.', 'Revisit **c12_hist_cbse_04_010** (Stupas) to recall the stupa\'s components — the chaitya is a stupa enshrined in a hall.', 'Review **c8_hist_ch5_3** (Rock-Cut Architecture: Ellora and Udayagiri Caves) for the basic vocabulary of rock-cut terms.', 'Make a two-column table: **Chaitya** (apsidal, stupa, pradakshina path, congregation) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_04_012', difficulty: 'standard',
          question: 'Buddhist textual traditions refer to the three major linguistic corpora.',
          hint: 'Revisit the "How Buddhist texts were prepared and preserved" box in NCERT (p.',
          misconception: 'Students believe Pali was the Buddha\'s "mother tongue" and Sanskrit was a later "corruption." In reality: (1) The.',
          parts: [
                { id: 'a', prompt: 'What is the name of the three-part canonical collection compiled at the First Buddhist Council, and in which language was it originally transmitted?', answer: 'The Tipitaka (Three Baskets)',
                  options: ['The Tipitaka (Three Baskets)', 'Sanskrit', 'written at the First Council', 'mother tongue'],
                  hint: 'Revisit the "How Buddhist texts were prepared and preserved" box in NCERT (p.',
                  misconception: 'Students believe Pali was the Buddha\'s "mother tongue" and Sanskrit was a later "corruption." In reality: (1) The Buddha likely taught.' }
          ],
            remediations: { 'pali-was-the-buddha-s': { steps: ['If the student conflates Pali with the Buddha\'s spoken language or sees Sanskrit as exclusively Mahayana: (1) Revisit.', 'CE) as a third textual tradition — use the British Library Kharosthi fragments database; (3) Map the three transmission.', 'Re-diagnostic: "Identify the script, language, and school affiliation of three manuscript fragments from different.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
