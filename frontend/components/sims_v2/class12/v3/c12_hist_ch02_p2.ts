import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch02_p2: SimDef = {
    id: 'v3_c12_hist_ch02_p2',
    title: 'Kings, Farmers and Towns (Early States and Economies) · Part 2/2',
    subtitle: 'The mint clerk who gave Ashoka back his name',
    classLevel: 12, subject: 'history', topic: 'Kings, Farmers and Towns (Early States and Economies) · Part 2/2',
    chapters: ['c12_hist_ch02'],
    nodeIds: ['c12_hist_cbse_02_007', 'c12_hist_cbse_02_008', 'c12_hist_cbse_02_009', 'c12_hist_cbse_02_010', 'c12_hist_cbse_02_011', 'c12_hist_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epigraphy analyst', intro: 'A forgotten script covered the pillars of an emperor no one could name — until coins betrayed its sounds.', goal: 'Follow Prinsep\'s decipherment of Brahmi and Kharoshthi — and what \'Piyadassi = Ashoka\' unlocked.' },
    discovery: {
        question: 'In 1838 a mint official cracked a dead script and revealed \'Piyadassi\' was Ashoka — pushing Indian history back a thousand years. What made decipherment possible?',
        options: ['Controlled comparison — bilingual Indo-Greek coins gave Kharoshthi\'s sounds; Brahmi he traced backwards from living descendants like Devanagari', 'Pure genius guesswork', 'A Rosetta stone in India', 'Pandits told him'],
        answer: 'Controlled comparison — bilingual Indo-Greek coins gave Kharoshthi\'s sounds; Brahmi he traced backwards from living descendants like Devanagari',
        hook: 'It wasn\'t a solitary eureka — decades of Asiatic Society work, Mackenzie\'s collections and pandits\' palaeography laid the ground. And the early scholars\' Sanskrit assumption was elite bias: the edicts were in everyday Prakrit, filtered wrongly through Brahmin informants.',
    },
    teaching: [
        { title: 'The Shungas, Kanvas and Satavahanas: Post-Mauryan Polities', text: 'The Shungas (c. 185–73 BCE), Kanvas (c. 73–28 BCE), and Satavahanas (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Crack a dead script yourself: match Greek names to Kharoshthi signs on coins, work Brahmi backwards through its descendants, and weigh why \'Piyadassi\' being Ashoka changed everything.',
        labels: ['The Shungas, Kanvas', 'Foreign Invasions: Indo-Greeks, Shakas,', 'Urbanisation in the Ganga', 'Trade Routes: Uttarapatha', 'Coins and Currency: Punch-Marked,', 'Agricultural Expansion: Irrigation, Land'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_007', title: 'The Shungas, Kanvas and Satavahanas: Post-Mauryan Polities',
          caseStudy: { intro: 'Imagine standing at the Sanchi stupa in Madhya Pradesh — the stone railings you see were actually added during the Shunga period, not by Ashoka.',
            decisions: [{ prompt: 'Who founded the Shunga dynasty, and in what year did he seize power from the last Mauryan ruler?', options: [
                { text: 'Pushyamitra Shunga, a Brahmin commander-in-chief (senapati), founded the Shunga dynasty c', outcome: 'Pushyamitra Shunga, a Brahmin commander-in-chief (senapati), founded the Shunga dynasty c.' },
                { text: 'Ashoka\'s son', outcome: 'Not quite — Students believe the Satavahanas were "southern" kings who had no connection to northern.', reveals: 'the-satavahanas-were-southern-kings' },
                { text: '321 BCE', outcome: 'Not quite — Students believe the Satavahanas were "southern" kings who had no connection to northern.', reveals: 'the-satavahanas-were-southern-kings' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_008', title: 'Foreign Invasions: Indo-Greeks, Shakas, Kushanas and Kshatrapas',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in Delhi and see a gold coin with a Greek legend on one side and Kharoshthi on the other, showing a king wearing.',
            decisions: [{ prompt: 'Which Indo-Greek king is famously associated with the Buddhist text *Milindapanha* and ruled from Sagala (modern Sialkot)?', options: [
                { text: 'Menander I (Milinda), c', outcome: 'Menander I (Milinda), c. 155–130 BCE. A wrong answer (e.g., Demetrius or Eucratides) reveals.' },
                { text: 'Kushana', outcome: 'Not quite — Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian.', reveals: 'shaka-and-kushana-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_009', title: 'Urbanisation in the Ganga Valley: Second Urbanisation and Towns',
          caseStudy: { intro: 'Imagine walking through the ruins of Rajgir or Pataliputra today — you see fortification walls, pottery shards with a glossy black finish, and coins with.',
            decisions: [{ prompt: 'What is the approximate chronological span of the Second Urbanisation in the Ganga Valley, and which archaeological culture is its most.', options: [
                { text: 'The Second Urbanisation spans c', outcome: 'The Second Urbanisation spans c. 6th century BCE to 3rd century CE; its most distinctive.' },
                { text: '3rd millennium BCE', outcome: 'Not quite — Students often think the Second Urbanisation was simply a "revival" of Harappan-style urbanism.', reveals: 'the-second-urbanisation-was-simply' },
                { text: 'Painted Grey Ware', outcome: 'Not quite — Students often think the Second Urbanisation was simply a "revival" of Harappan-style urbanism.', reveals: 'the-second-urbanisation-was-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_010', title: 'Trade Routes: Uttarapatha and Dakshinapatha and Long-Distance Commerce',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in Delhi and see a display of Roman gold coins excavated from a site near Coimbatore in Tamil Nadu — how did coins.',
            decisions: [{ prompt: 'Name the two principal long-distance trade routes of ancient India mentioned in Sanskrit texts and give one major city located on each.', options: [
                { text: 'The two routes are Uttarapatha (Northern Route) and Dakshinapatha (Southern Route)', outcome: 'The two routes are Uttarapatha (Northern Route) and Dakshinapatha (Southern Route).' },
                { text: 'the Silk Road or Grand Trunk Road', outcome: 'Not quite — Students often believe Uttarapatha and Dakshinapatha were single, well-defined highways like modern.', reveals: 'uttarapatha-and-dakshinapatha-were-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_011', title: 'Coins and Currency: Punch-Marked, Inscribed and Roman Coin Finds',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in Delhi and see a display of ancient coins: some are tiny, bent silver pieces with strange symbols.',
            decisions: [{ prompt: 'Identify the earliest type of coinage in the Indian subcontinent and state the approximate century of its appearance.', options: [
                { text: 'Correct answer: Punch-marked coins (silver and copper), appearing from the 6th century', outcome: 'Correct answer: Punch-marked coins (silver and copper), appearing from the 6th century BCE onwards.' },
                { text: 'Indo-Greek coins', outcome: 'Not quite — Students consistently believe: (1) "Punch-marked coins were issued *only* by the Mauryas" — NCERT.', reveals: 'students-consistently-believe-1-punch' },
                { text: 'Gupta gold coins', outcome: 'Not quite — Students consistently believe: (1) "Punch-marked coins were issued *only* by the Mauryas" — NCERT.', reveals: 'students-consistently-believe-1-punch' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history quiz final, your teammate answers: \'Ashoka converted to Buddhism after Kalinga, so he gave up war.\' The anchor awards the point — but you suspect it\'s wrong.',
            decisions: [{ prompt: 'What does the chapter actually record about Ashoka and Kalinga?', options: [
                { text: 'The Thirteenth Rock Edict records remorse for Kalinga\'s dead and deported, then replaces the drum of war with the drum of Dhamma — a policy pivot to conquest by righteousness, which is imperial strategy, not just private conversion; his own turn to Buddhism likely preceded the war.', outcome: 'The chapter\'s distinction: Dhamma was a secular moral code for holding a diverse empire — \'became Buddhist so gave up war\' confuses a public policy shift with a private religious event.' },
                { text: 'Let it stand — \'converted after Kalinga\' is close enough for a quiz.', outcome: 'It\'s the exam\'s favourite trap: the edicts say policy changed; the chronicles date his conversion earlier, and Dhamma-vijaya is about how an empire is ruled, not which faith the emperor joined.', reveals: 'conversion-explains-policy' },
                { text: 'Counter instead that Kalinga never happened — an empire that gave up war couldn\'t have fought one.', outcome: 'The edict itself is the evidence for the war\'s scale — Ashoka\'s own inscription describes the death and deportation; denying Kalinga erases the event that produced the pivot.', reveals: 'pacifism-erases-war' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You can now see decipherment as method, not magic — and catch the elite bias that almost hid Prakrit under Sanskrit.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_008', difficulty: 'standard',
          question: 'The period c. 2nd century BCE–3rd century CE saw successive waves of Central.',
          hint: 'If confused about the sequence of invasions, review the "After the Mauryas" node.',
          misconception: 'Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian invaders, and that the.',
          parts: [
                { id: 'a', prompt: 'Which Indo-Greek king is famously associated with the Buddhist text *Milindapanha* and ruled from Sagala (modern Sialkot)?', answer: 'Menander I (Milinda), c',
                  options: ['Menander I (Milinda), c', 'Kushana'],
                  hint: 'If confused about the sequence of invasions, review the "After the Mauryas" node.',
                  misconception: 'Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian invaders, and that the Western Kshatrapas.' },
                { id: 'b', prompt: 'A coin hoard found in Punjab contains: (1) Indo-Greek bilingual drachms, (2) Shaka silver coins with Greek/Kharoshthi legends, (3) Kushana gold dinars of Vima.', answer: 'Chronology: 1 → 2 → 3 → 4 (Roman coins arrive later via trade)',
                  options: ['Chronology: 1 → 2 → 3 → 4 (Roman coins arrive later via trade)', 'Kushana'],
                  hint: 'If confused about the sequence of invasions, review the "After the Mauryas" node.',
                  misconception: 'Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian invaders, and that the Western Kshatrapas.' }
          ],
            remediations: { 'shaka-and-kushana-are-interchangeable': { steps: ['Revisit c7_hist_ch03_004 (Kushana Empire) and c7_hist_ch03_005 (Indo-Greek Kingdoms) to re-learn the distinct.', 'Use Map 3 in the NCERT (Theme 2, p.', '43) to plot the territories of Indo-Greeks, Shakas, Kushanas, and Kshatrapas at three snapshots: 100 BCE, 50 CE, 150 CE.', 'Create a comparative table with columns: Dynasty, Origin, Capital, Key Ruler, Coin Features, Title, Art Patronage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian invaders, and that the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Indo-Greeks were merely transient invaders who left no lasting legacy in India." Use evidence from coinage, art, astronomy, and.', answer: 'The claim is false',
                  options: ['The claim is false', 'Kushana'],
                  hint: 'If confused about the sequence of invasions, review the "After the Mauryas" node.',
                  misconception: 'Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian invaders, and that the Western Kshatrapas.' },
                { id: 'b', prompt: 'Construct a timeline (c. 200 BCE–300 CE) showing the overlapping reigns of the last Indo-Greeks, the Shakas (Northern and Western Kshatrapas), the Parthians.', answer: 'Turning points: (1) c',
                  options: ['Turning points: (1) c', 'Kushana'],
                  hint: 'If confused about the sequence of invasions, review the "After the Mauryas" node.',
                  misconception: 'Students often think "Shaka" and "Kushana" are interchangeable labels for the same Central Asian invaders, and that the Western Kshatrapas.' }
          ],
            remediations: { 'shaka-and-kushana-are-interchangeable': { steps: ['Revisit c7_hist_ch03_004 (Kushana Empire) and c7_hist_ch03_005 (Indo-Greek Kingdoms) to re-learn the distinct.', 'Use Map 3 in the NCERT (Theme 2, p.', '43) to plot the territories of Indo-Greeks, Shakas, Kushanas, and Kshatrapas at three snapshots: 100 BCE, 50 CE, 150 CE.', 'Create a comparative table with columns: Dynasty, Origin, Capital, Key Ruler, Coin Features, Title, Art Patronage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_009', difficulty: 'standard',
          question: 'The Second Urbanisation (c. 6th century BCE – 3rd century CE) refers to the.',
          hint: 'If stuck, re-read the "Strategies for increasing production" section (NCERT pp.',
          misconception: 'Students often think the Second Urbanisation was simply a "revival" of Harappan-style urbanism, assuming similar grid.',
          parts: [
                { id: 'a', prompt: 'What is the approximate chronological span of the Second Urbanisation in the Ganga Valley, and which archaeological culture is its most distinctive marker?', answer: 'The Second Urbanisation spans c',
                  options: ['The Second Urbanisation spans c', '3rd millennium BCE', 'Painted Grey Ware', 'revival'],
                  hint: 'If stuck, re-read the "Strategies for increasing production" section (NCERT pp.',
                  misconception: 'Students often think the Second Urbanisation was simply a "revival" of Harappan-style urbanism, assuming similar grid planning, drainage.' },
                { id: 'b', prompt: 'Why did virtually all major towns of the Second Urbanisation emerge along routes of communication (riverine, land, or coastal)?', answer: 'Towns emerged along communication routes',
                  options: ['Towns emerged along communication routes', 'defence', 'religion', 'revival'],
                  hint: 'If stuck, re-read the "Strategies for increasing production" section (NCERT pp.',
                  misconception: 'Students often think the Second Urbanisation was simply a "revival" of Harappan-style urbanism, assuming similar grid planning, drainage.' }
          ],
            remediations: { 'the-second-urbanisation-was-simply': { steps: ['Revisit c7_hist_ch01_004 (Gangetic Plains and Growth of Mahajanapadas) to re-establish the agricultural-iron-surplus.', 'Review c6_history_ch04_003 (Harappan Town Planning) and create a two-column comparison table: Harappan vs.', 'Mahajanapada urban features.', '42–45 on NBPW, guilds, and punch-marked coins; underline every phrase indicating *difference* from Harappan evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_010', difficulty: 'standard',
          question: 'Uttarapatha (Northern Route) and Dakshinapatha (Southern Route) were the two.',
          hint: 'If stuck, revisit the map exercise in node c12_hist_cbse_02_005 (Mahajanapadas and.',
          misconception: 'Students often believe Uttarapatha and Dakshinapatha were single, well-defined highways like modern national highways.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Uttarapatha (Northern Route) and Dakshinapatha (Southern Route) were the two principal',
                  options: ['Uttarapatha (Northern Route) and Dakshinapatha (Southern Route) were the two principal', 'The decipherment of Brahmi and Kharoshthi scripts by James Prinsep in 1838 was the', 'The Mauryan Empire (c', 'Ashoka\'s inscriptions are a series of royal proclamations engraved on rocks and pillars'],
                  hint: 'If stuck, revisit the map exercise in node c12_hist_cbse_02_005 (Mahajanapadas and capitals) and.',
                  misconception: 'Students often believe Uttarapatha and Dakshinapatha were single, well-defined highways like modern national highways, rather than evolving.' }
          ],
            remediations: { 'uttarapatha-and-dakshinapatha-were-single': { steps: ['If the student holds the “single highway” misconception: (1) Revisit Map 3 in the textbook and trace at least three.', '(2) Read Source 9 (Periplus) and identify the multiple ports mentioned on the Malabar coast (Muziris, Nelkynda, Bacare).', '(3) Compare with the Harappan trade network (c6_history_ch04_004) which also used multiple riverine and coastal nodes.', '(4) Re-attempt Diagnostic Question 4 focusing on the distinction between bulk riverine transport and seasonal maritime.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_011', difficulty: 'standard',
          question: 'Coins and Currency in early India (c. 6th century BCE – 6th century CE) refers.',
          hint: 'If stuck, revisit the distinction between *punch-marked symbols* (administrative/merchant.',
          misconception: 'Students consistently believe: (1) "Punch-marked coins were issued *only* by the Mauryas" — NCERT says they were issued.',
          parts: [
                { id: 'a', prompt: 'Compare the coinage of the Kushanas and the Guptas in terms of (a) metal purity, (b) weight standard, and (c) political messaging.', answer: 'Correct answer: (a) Kushana gold coins (dinars) were of high but variable purity',
                  options: ['Correct answer: (a) Kushana gold coins (dinars) were of high but variable purity', 'Kushana has king standing, Gupta has king sitting', 'assertion-reason'],
                  hint: 'If stuck, revisit the distinction between *punch-marked symbols* (administrative/merchant marks).',
                  misconception: 'Students consistently believe: (1) "Punch-marked coins were issued *only* by the Mauryas" — NCERT says they were issued by *kings.' }
          ],
            remediations: { 'students-consistently-believe-1-punch': { steps: ['Re-read NCERT pp. 44–45 (Coins and kings) and create a three-column table: Coin Type | Issuer(s) | Key Feature.', 'On Map 3 (p. 43), mark find-spots: Taxila (Indo-Greek), Mathura (Kushana), Arikamedu (Roman), Punjab (Yaudheya), Ujjain.', 'Attempt Diagnostic Questions 2, 3, 4 again; if still incorrect, watch the 10-min video "Numismatics in Indian History".', 'Re-diagnostic: Write a 50-word answer to "Why did the Kushanas adopt the Roman weight standard?" — correct answer must.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_012', difficulty: 'standard',
          question: 'Agricultural expansion in early India (c. 600 BCE – 600 CE) involved the spread.',
          hint: 'Review the Sangam text categories (vellalar, uzhavar, adimai) and the NCERT discussion.',
          misconception: 'Students often think land grants were only given to Brahmanas for religious merit, ignoring that grants were also made.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agricultural expansion in early India (c',
                  options: ['Agricultural expansion in early India (c', 'The decipherment of Brahmi and Kharoshthi scripts by James Prinsep in 1838 was the', 'The Mauryan Empire (c', 'Ashoka\'s inscriptions are a series of royal proclamations engraved on rocks and pillars'],
                  hint: 'Review the Sangam text categories (vellalar, uzhavar, adimai) and the NCERT discussion on the.',
                  misconception: 'Students often think land grants were only given to Brahmanas for religious merit, ignoring that grants were also made to officials.' }
          ],
            remediations: { 'land-grants-were-only-given': { steps: ['If the student holds this misconception, have them re-read NCERT sections 5.2 and 5.4, and compare Source 5 (Sudarshana.', 'Then ask: "Who built the lake?', 'What does the Prabhavati Gupta grant exempt the village from?" This will clarify the variety of grant purposes and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
