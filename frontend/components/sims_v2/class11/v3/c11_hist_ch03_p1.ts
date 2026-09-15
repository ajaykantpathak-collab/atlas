import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch03_p1: SimDef = {
    id: 'v3_c11_hist_ch03_p1',
    title: 'Changing Traditions · Part 1/2',
    subtitle: 'Diagnose an empire\'s fifty-year fever — and a sect that outlived its persecutors.',
    classLevel: 11, subject: 'history', topic: 'Changing Traditions · Part 1/2',
    chapters: ['c11_hist_ch03'],
    nodeIds: ['c11_hist_cbse_03_001', 'c11_hist_cbse_03_002', 'c11_hist_cbse_03_003', 'c11_hist_cbse_03_004', 'c11_hist_cbse_03_005', 'c11_hist_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian reading symptoms on an imperial chart', intro: 'Twenty emperors in fifty years, silver vanishing from the coins, walls going up around Rome — the crisis had no single cause, which is the point.', goal: 'Analyse the third-century crisis as systemic failure and trace Christianity from persecution to establishment.' },
    discovery: {
        question: 'Constantine\'s Edict of Milan in 313 CE made Christianity Rome\'s official religion — settled fact?',
        options: ['No — it only legalised the faith; sole official status came 67 years later under Theodosius in 380', 'Yes — Milan made it the state church', 'Yes — Constantine himself baptised the empire', 'No — Christianity stayed illegal until 476'],
        answer: 'No — it only legalised the faith; sole official status came 67 years later under Theodosius in 380',
        hook: 'And the third-century collapse wasn\'t barbarians breaking in — legions left the frontiers to fight rival emperors, and the invasions were the consequence.',
    },
    teaching: [
        { title: 'The Late Roman Empire and the Crisis of the Third Century', text: 'The Crisis of the Third Century (235–284 CE) was a period of extreme political instability, economic collapse, military anarchy, and foreign invasion that nearly caused the disintegration of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'List the third century\'s symptoms — twenty emperors, hollowed-out coins, wall-less Rome suddenly walled — then weigh whether Diocletian\'s Tetrarchy truly fixed succession.',
        labels: ['The Late Roman Empire', 'The Rise of Christianity', 'The Church as', 'Monasticism: Asceticism and', 'The Byzantine Empire: Constantinople', 'The Rise of Islam'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_001', title: 'The Late Roman Empire and the Crisis of the Third Century',
          caseStudy: { intro: 'Imagine you are standing before the ruins of the Aurelian Walls in Rome, built hastily during this crisis to protect a city that had not needed walls for.',
            decisions: [{ prompt: 'What was the immediate trigger for the Crisis of the Third Century in 235 CE?', options: [
                { text: 'The assassination of Emperor Severus Alexander by his own troops', outcome: 'The assassination of Emperor Severus Alexander by his own troops, which began a 50-year period.' },
                { text: 'the Gothic invasion of 251 CE', outcome: 'Not quite — Students often think the Crisis of the Third Century was caused primarily by "barbarian invasions".', reveals: 'the-crisis-of-the-third' },
                { text: 'barbarian invasions', outcome: 'Not quite — Students often think the Crisis of the Third Century was caused primarily by "barbarian invasions".', reveals: 'the-crisis-of-the-third' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_003', title: 'The Church as an Institution: Hierarchy and Authority',
          caseStudy: { intro: 'Imagine visiting the Basilica of Bom Jesus in Old Goa — a 16th-century church built by Portuguese missionaries.',
            decisions: [{ prompt: 'Name the four main tiers of the Roman Catholic Church\'s clerical hierarchy in descending order of authority during the High Middle Ages (c.', options: [
                { text: 'The four main tiers are: (1) Pope (Bishop of Rome), (2) Cardinals (princes of the Church,', outcome: 'The four main tiers are: (1) Pope (Bishop of Rome), (2) Cardinals (princes of the Church, papal.' },
                { text: 'Vatican bureaucracy', outcome: 'Not quite — Students often think the medieval Church was a monolithic, centrally controlled "Vatican.', reveals: 'the-medieval-church-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_004', title: 'Monasticism: Asceticism and the Desert Fathers',
          caseStudy: { intro: 'Imagine you visit the ancient caves of Ajanta or Ellora in India, where Buddhist monks once lived in isolation, practicing meditation and asceticism.',
            decisions: [{ prompt: 'Who is considered the father of Christian monasticism, and in which region did he live as a hermit in the 3rd-4th century CE?', options: [
                { text: 'Saint Anthony of Egypt (Anthony the Great) is regarded as the father of Christian', outcome: 'Saint Anthony of Egypt (Anthony the Great) is regarded as the father of Christian monasticism;.' },
                { text: 'running away from the world', outcome: 'Not quite — Students often think the Desert Fathers were "running away from the world" in a purely negative.', reveals: 'the-desert-fathers-were-running' },
                { text: 'Saint Benedict or placing him in Europe', outcome: 'Not quite — Students often think the Desert Fathers were "running away from the world" in a purely negative.', reveals: 'the-desert-fathers-were-running' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_006', title: 'The Rise of Islam and Its Challenge to Byzantium',
          caseStudy: { intro: 'Imagine you are visiting the Qutb Minar complex in Delhi and notice the Iron Pillar standing beside it—a 4th-century Gupta artifact later reused by Islamic.',
            decisions: [{ prompt: 'In which year did the Battle of Yarmouk take place, and which two major powers were the primary combatants?', options: [
                { text: 'The Battle of Yarmouk occurred in 636 CE between the Rashidun Caliphate (Arab Muslim', outcome: 'The Battle of Yarmouk occurred in 636 CE between the Rashidun Caliphate (Arab Muslim forces) and.' },
                { text: 'religious war', outcome: 'Not quite — Students often believe the Arab conquests were a simple "religious war" where Muslim armies forced.', reveals: 'the-arab-conquests-were-a' },
                { text: 'decadent', outcome: 'Not quite — Students often believe the Arab conquests were a simple "religious war" where Muslim armies forced.', reveals: 'the-arab-conquests-were-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A class presentation on Rome\'s decline claims: \'The Third Century Crisis happened because barbarians invaded, and Constantine fixed everything by making Christianity the state religion in 313.\'',
            decisions: [{ prompt: 'What does the timeline actually support?', options: [
                { text: 'Reverse the causation and the law: invasions were largely a consequence of internal collapse — legions pulled off the Danube and Rhine to fight rival emperors left frontiers open (the Gothic crossing of 251 followed a civil war). And the Edict of Milan only granted tolerance; Christianity became the sole authorised religion under Theodosius in 380 — legalisation and establishment are different events, 67 years apart.', outcome: 'The presentation gains precision: systemic failure (army as king-maker, debased coinage, permeable frontiers) precedes invasion, and toleration precedes establishment.' },
                { text: 'Keep the invasion-first story — external pressure broke a healthy empire.', outcome: 'The symptoms were internal: 20+ emperors in 50 years and silverless coins show the Augustan settlement failing before the frontiers gave way.', reveals: 'invasions-caused-the-crisis' },
                { text: 'Keep 313 as the establishment date — tolerance and official religion are practically the same.', outcome: 'The gap matters: between 313 and 380 Christianity competed with paganism and Arian factions — that half-century of competition shaped church doctrine.', reveals: 'milan-made-christianity-official' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'An empire that needed emergency walls after three centuries of needing none — the crisis was the system failing, not the enemy arriving.',
            decisions: [{ prompt: 'What comes next? Changing Traditions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Changing Traditions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_001', difficulty: 'standard',
          question: 'The Crisis of the Third Century (235–284 CE) was a period of extreme political.',
          hint: 'Review the Severan dynasty (193–235 CE) and the concept of "donativum" (accession bonus).',
          misconception: 'Students often think the Crisis of the Third Century was caused primarily by "barbarian invasions" (Goths, Franks.',
          parts: [
                { id: 'a', prompt: 'What was the immediate trigger for the Crisis of the Third Century in 235 CE?', answer: 'The assassination of Emperor Severus Alexander by his own troops',
                  options: ['The assassination of Emperor Severus Alexander by his own troops', 'the Gothic invasion of 251 CE', 'barbarian invasions'],
                  hint: 'Review the Severan dynasty (193–235 CE) and the concept of "donativum" (accession bonus) – the.',
                  misconception: 'Students often think the Crisis of the Third Century was caused primarily by "barbarian invasions" (Goths, Franks, Alemanni).' },
                { id: 'b', prompt: 'Compare the Roman response to the Crisis of the Third Century with the Gupta response to the Huna invasions in the 5th century (c7_hist_ch04_011).', answer: 'Similarity: both empires faced simultaneous frontier pressures and internal',
                  options: ['Similarity: both empires faced simultaneous frontier pressures and internal', 'both restored unity permanently', 'barbarian invasions'],
                  hint: 'Review the Severan dynasty (193–235 CE) and the concept of "donativum" (accession bonus) – the.',
                  misconception: 'Students often think the Crisis of the Third Century was caused primarily by "barbarian invasions" (Goths, Franks, Alemanni).' }
          ],
            remediations: { 'the-crisis-of-the-third': { steps: ['Re-read the worked example on the debasement-inflation-pay cycle (WORKED_EXAMPLE_1).', 'Create a timeline of 235–284 CE marking every emperor and major invasion; colour-code civil wars vs. foreign wars.', 'Explain aloud why the withdrawal of Rhine legions for the Battle of Mediolanum (259 CE) directly enabled the.', 'Compare with the Mauryan decline (c6_history_ch05_011) where provincial governors withdrew troops for succession.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_002', difficulty: 'standard',
          question: 'The Rise of Christianity in the Roman World refers to the historical process.',
          hint: 'Revisit c11_hist_cbse_03_001 (Crisis of the Third Century) and c6_history_ch05_011.',
          misconception: 'Students often believe Constantine made Christianity the *official* state religion in 313 CE (Edict of Milan).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Rise of Christianity in the Roman World refers to the historical process (c',
                  options: ['The Rise of Christianity in the Roman World refers to the historical process (c', 'The Crisis of the Third Century (235–284 CE) was a period of extreme political', 'The Church as an Institution refers to the hierarchical organisational structure of the', 'Monasticism refers to a religious way of life in'],
                  hint: 'Revisit c11_hist_cbse_03_001 (Crisis of the Third Century) and c6_history_ch05_011 (Spread.',
                  misconception: 'Students often believe Constantine made Christianity the *official* state religion in 313 CE (Edict of Milan).' }
          ],
            remediations: { 'constantine-made-christianity-the-official': { steps: ['Create a two-column table — left column "Edict of Milan (313 CE): provisions", right column "Edict of Thessalonica (380.', 'Highlight verbs: "licet" (it is permitted) vs. "credere iubemus" (we command to believe).', 'Ask the student to explain why Constantine stopped at tolerance (political coalition with pagan senators, unresolved.', 'Connect to Ashoka\'s Rock Edict 12 (tolerance) vs. a hypothetical "state Buddhism" edict — which never existed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_003', difficulty: 'standard',
          question: 'The Church as an Institution refers to the hierarchical organisational.',
          hint: 'Revisit c6_history_ch06_015 (Medieval Period introduction) and c7_hist_ch07_007.',
          misconception: 'Students often think the medieval Church was a monolithic, centrally controlled "Vatican bureaucracy" similar to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Church as an Institution refers to the hierarchical organisational structure of the',
                  options: ['The Church as an Institution refers to the hierarchical organisational structure of the', 'The Crisis of the Third Century (235–284 CE) was a period of extreme political', 'The Rise of Christianity in the Roman World refers to the historical process (c', 'Monasticism refers to a religious way of life in'],
                  hint: 'Revisit c6_history_ch06_015 (Medieval Period introduction) and c7_hist_ch07_007 (Administrative.',
                  misconception: 'Students often think the medieval Church was a monolithic, centrally controlled "Vatican bureaucracy" similar to a modern government.' }
          ],
            remediations: { 'the-medieval-church-was-a': { steps: ['Re-read the Investiture Controversy (c11_hist_cbse_03_002) to see how papal *spiritual* authority clashed with royal.', 'Map the journey of a single document — e.g., a papal provision appointing an Italian to an English benefice — and trace.', 'Compare with the Delhi Sultanate\'s *iqta* system (c7_hist_ch07_007): both granted revenue rights, but the Sultan could.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_004', difficulty: 'standard',
          question: 'Monasticism refers to a religious way of life in which individuals (monks/nuns).',
          hint: 'Review the conversion of Constantine (312 CE) and the Council of Nicaea (325 CE) from.',
          misconception: 'Students often think the Desert Fathers were "running away from the world" in a purely negative sense, ignoring that.',
          parts: [
                { id: 'a', prompt: 'Why did early Christians like Anthony withdraw to the desert? Explain the spiritual and social motivations.', answer: 'They sought to escape the perceived worldliness of the established Church after',
                  options: ['They sought to escape the perceived worldliness of the established Church after', 'fleeing persecution', 'running away from the world'],
                  hint: 'Review the conversion of Constantine (312 CE) and the Council of Nicaea (325 CE) from node.',
                  misconception: 'Students often think the Desert Fathers were "running away from the world" in a purely negative sense, ignoring that their withdrawal was.' }
          ],
            remediations: { 'the-desert-fathers-were-running': { steps: ['If a student holds this misconception, have them read Athanasius\'s "Life of Anthony" (excerpts) and compare with the.', 'Map the locations: Egyptian desert vs.', 'Then ask: "What did Anthony and the Buddhist elders *do* all day?" Guide them to see that both engaged in teaching.', 'Use a Venn diagram to separate eremitic vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Desert Fathers were "running away from the world" in a purely negative sense, ignoring that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Christian monasticism was a purely religious phenomenon with no significant social or economic impact in Late Antiquity."', answer: 'The claim is false',
                  options: ['The claim is false', 'running away from the world'],
                  hint: 'Review the conversion of Constantine (312 CE) and the Council of Nicaea (325 CE) from node.',
                  misconception: 'Students often think the Desert Fathers were "running away from the world" in a purely negative sense, ignoring that their withdrawal was.' },
                { id: 'b', prompt: 'Create a comparative timeline showing the parallel development of monastic/ascetic traditions in Christianity (Desert Fathers), Buddhism (Sangha), and Jainism.', answer: 'A good answer will show: Buddhism\'s Sangha (c',
                  options: ['A good answer will show: Buddhism\'s Sangha (c', 'running away from the world'],
                  hint: 'Review the conversion of Constantine (312 CE) and the Council of Nicaea (325 CE) from node.',
                  misconception: 'Students often think the Desert Fathers were "running away from the world" in a purely negative sense, ignoring that their withdrawal was.' }
          ],
            remediations: { 'the-desert-fathers-were-running': { steps: ['If a student holds this misconception, have them read Athanasius\'s "Life of Anthony" (excerpts) and compare with the.', 'Map the locations: Egyptian desert vs.', 'Then ask: "What did Anthony and the Buddhist elders *do* all day?" Guide them to see that both engaged in teaching.', 'Use a Venn diagram to separate eremitic vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_005', difficulty: 'standard',
          question: 'The Byzantine Empire (330–1453 CE) was the eastern continuation of the Roman.',
          hint: 'If confused about Byzantine "Roman-ness," revisit the Tetrarchy (c11_hist_cbse_03_001).',
          misconception: 'Students believe the Byzantine Empire was "Greek" from its inception and that Caesaropapism meant the emperor was.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Byzantine Empire (330–1453 CE) was the eastern continuation of the Roman Empire',
                  options: ['The Byzantine Empire (330–1453 CE) was the eastern continuation of the Roman Empire', 'The Crisis of the Third Century (235–284 CE) was a period of extreme political', 'The Rise of Christianity in the Roman World refers to the historical process (c', 'The Church as an Institution refers to the hierarchical organisational structure of the'],
                  hint: 'If confused about Byzantine "Roman-ness," revisit the Tetrarchy (c11_hist_cbse_03_001) — the empire.',
                  misconception: 'Students believe the Byzantine Empire was "Greek" from its inception and that Caesaropapism meant the emperor was a priest.' }
          ],
            remediations: { 'the-byzantine-empire-was-greek': { steps: ['Revisit c11_hist_cbse_03_001 (Late Roman Crisis) to see how Diocletian\'s tetrarchy and Constantine\'s reforms created.', 'Use a map: trace the shift from Latin-speaking West to Greek-speaking East by shading territories lost after 476 vs.', 'Compare the Byzantine emperor\'s coronation ritual (crowned by patriarch) with the Holy Roman Emperor\'s (crowned.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_006', difficulty: 'standard',
          question: 'The Rise of Islam refers to the 7th-century emergence of a new monotheistic.',
          hint: 'Revisit c11_hist_cbse_03_005, specifically the section on Heraclius\' counter-offensive.',
          misconception: 'Students often believe the Arab conquests were a simple "religious war" where Muslim armies forced conversion.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Rise of Islam refers to the 7th-century emergence of a new monotheistic faith in the',
                  options: ['The Rise of Islam refers to the 7th-century emergence of a new monotheistic faith in the', 'The Crisis of the Third Century (235–284 CE) was a period of extreme political', 'The Rise of Christianity in the Roman World refers to the historical process (c', 'The Church as an Institution refers to the hierarchical organisational structure of the'],
                  hint: 'Revisit c11_hist_cbse_03_005, specifically the section on Heraclius\' counter-offensive and the True.',
                  misconception: 'Students often believe the Arab conquests were a simple "religious war" where Muslim armies forced conversion at sword-point, and that the.' }
          ],
            remediations: { 'the-arab-conquests-were-a': { steps: ['Identify which clauses regulate taxation vs. social behavior.', 'Compare the *jizya* rate (1 dinar) to Byzantine poll tax (*kapnikon*).', 'Note the absence of conversion clauses.', 'Discuss why a "conquest for revenue" model better fits the evidence than "conquest for conversion." This directly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
