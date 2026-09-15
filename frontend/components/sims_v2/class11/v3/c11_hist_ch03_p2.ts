import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch03_p2: SimDef = {
    id: 'v3_c11_hist_ch03_p2',
    title: 'Changing Traditions · Part 2/2',
    subtitle: 'Diagnose an empire\'s fifty-year fever — and a sect that outlived its persecutors.',
    classLevel: 11, subject: 'history', topic: 'Changing Traditions · Part 2/2',
    chapters: ['c11_hist_ch03'],
    nodeIds: ['c11_hist_cbse_03_007', 'c11_hist_cbse_03_008', 'c11_hist_cbse_03_009', 'c11_hist_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian reading symptoms on an imperial chart', intro: 'Twenty emperors in fifty years, silver vanishing from the coins, walls going up around Rome — the crisis had no single cause, which is the point.', goal: 'Analyse the third-century crisis as systemic failure and trace Christianity from persecution to establishment.' },
    discovery: {
        question: 'Constantine\'s Edict of Milan in 313 CE made Christianity Rome\'s official religion — settled fact?',
        options: ['No — it only legalised the faith; sole official status came 67 years later under Theodosius in 380', 'Yes — Milan made it the state church', 'Yes — Constantine himself baptised the empire', 'No — Christianity stayed illegal until 476'],
        answer: 'No — it only legalised the faith; sole official status came 67 years later under Theodosius in 380',
        hook: 'And the third-century collapse wasn\'t barbarians breaking in — legions left the frontiers to fight rival emperors, and the invasions were the consequence.',
    },
    teaching: [
        { title: 'The Sassanid Empire of Iran: Rival to Rome', text: 'The Sassanid Empire (224–651 CE) was the last pre-Islamic Persian imperial dynasty, founded by Ardashir I after overthrowing the Parthians, which established a centralized state in Iran and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'List the third century\'s symptoms — twenty emperors, hollowed-out coins, wall-less Rome suddenly walled — then weigh whether Diocletian\'s Tetrarchy truly fixed succession.',
        labels: ['The Sassanid Empire', 'The Split Between Roman', 'Barbarian Kingdoms and', 'Continuities and Ruptures'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_007', title: 'The Sassanid Empire of Iran: Rival to Rome',
          caseStudy: { intro: 'Imagine you are visiting the rock reliefs at Naqsh-e Rostam in Iran, where Ardashir I depicts himself receiving the ring of kingship from Ahura Mazda —.',
            decisions: [{ prompt: 'In which year did Ardashir I defeat the last Parthian king Artabanus IV to establish the Sassanid Empire?', options: [
                { text: '224 CE', outcome: '224 CE. A wrong answer (e.g., 651 CE or 330 CE) reveals the student confuses the empire\'s.' },
                { text: 'just another Persian empire like the Achaemenids', outcome: 'Not quite — Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they.', reveals: 'the-sassanids-were-just-another' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_008', title: 'The Split Between Roman Catholicism and Eastern Orthodoxy',
          caseStudy: { intro: 'Imagine you visit a church in Kerala with a Syrian Christian community using Syriac liturgy, and another in Goa with Latin rites — both Christian, yet.',
            decisions: [{ prompt: 'What was the *Filioque* clause, and which church added it to the Nicene Creed unilaterally?', options: [
                { text: 'The *Filioque* ("and the Son") clause asserts that the Holy Spirit proceeds from the', outcome: 'The *Filioque* ("and the Son") clause asserts that the Holy Spirit proceeds from the Father **and.' },
                { text: 'it was about the Pope', outcome: 'Not quite — Students often believe the 1054 Schism was a sudden, total break where all Christians instantly.', reveals: 'the-1054-schism-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_009', title: 'Barbarian Kingdoms and the Transformation of the West',
          caseStudy: { intro: 'Imagine visiting the ruins of a Roman city like Taxila or Hampi in India — you see grand structures but also signs of new rulers adapting old spaces.',
            decisions: [{ prompt: 'Name the five major Germanic kingdoms established in the Western Roman Empire by 500 CE and the modern regions they roughly correspond to.', options: [
                { text: 'The five major kingdoms: Visigothic Kingdom (Iberia/Spain), Ostrogothic Kingdom (Italy),', outcome: 'The five major kingdoms: Visigothic Kingdom (Iberia/Spain), Ostrogothic Kingdom (Italy), Frankish.' },
                { text: 'Barbarian Kingdoms', outcome: 'Not quite — Students often believe the "Barbarian Kingdoms" were chaotic, lawless tribal chiefdoms that.', reveals: 'the-barbarian-kingdoms-were-chaotic' },
                { text: 'Anglo-Saxons or Lombards as pre-500 CE', outcome: 'Not quite — Students often believe the "Barbarian Kingdoms" were chaotic, lawless tribal chiefdoms that.', reveals: 'the-barbarian-kingdoms-were-chaotic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_010', title: 'Continuities and Ruptures in Late Antiquity',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in New Delhi and see a display of Roman gold coins found in South India (Arikamedu) alongside a 6th-century.',
            decisions: [{ prompt: 'Name the approximate chronological boundaries of "Late Antiquity" as used in current historiography and state the two traditional competing.', options: [
                { text: 'Correct answer: Late Antiquity spans roughly 250–750 CE', outcome: 'Correct answer: Late Antiquity spans roughly 250–750 CE. The two traditional narratives are.' },
                { text: '476–1453', outcome: 'Not quite — Students often believe "Late Antiquity" is just a new name for the "Dark Ages" (476–1000 CE) and.', reveals: 'late-antiquity-is-just-a' },
                { text: 'Renaissance vs Reformation', outcome: 'Not quite — Students often believe "Late Antiquity" is just a new name for the "Dark Ages" (476–1000 CE) and.', reveals: 'late-antiquity-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A class presentation on Rome\'s decline claims: \'The Third Century Crisis happened because barbarians invaded, and Constantine fixed everything by making Christianity the state religion in 313.\'',
            decisions: [{ prompt: 'What does the timeline actually support?', options: [
                { text: 'Reverse the causation and the law: invasions were largely a consequence of internal collapse — legions pulled off the Danube and Rhine to fight rival emperors left frontiers open (the Gothic crossing of 251 followed a civil war). And the Edict of Milan only granted tolerance; Christianity became the sole authorised religion under Theodosius in 380 — legalisation and establishment are different events, 67 years apart.', outcome: 'The presentation gains precision: systemic failure (army as king-maker, debased coinage, permeable frontiers) precedes invasion, and toleration precedes establishment.' },
                { text: 'Keep the invasion-first story — external pressure broke a healthy empire.', outcome: 'The symptoms were internal: 20+ emperors in 50 years and silverless coins show the Augustan settlement failing before the frontiers gave way.', reveals: 'invasions-caused-the-crisis' },
                { text: 'Keep 313 as the establishment date — tolerance and official religion are practically the same.', outcome: 'The gap matters: between 313 and 380 Christianity competed with paganism and Arian factions — that half-century of competition shaped church doctrine.', reveals: 'milan-made-christianity-official' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'An empire that needed emergency walls after three centuries of needing none — the crisis was the system failing, not the enemy arriving.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_007', difficulty: 'standard',
          question: 'The Sassanid Empire (224–651 CE) was the last pre-Islamic Persian imperial.',
          hint: 'If stuck, revisit the "Crisis of the Third Century" node (c11_hist_cbse_03_001) and map.',
          misconception: 'Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they miss that the.',
          parts: [
                { id: 'a', prompt: 'In which year did Ardashir I defeat the last Parthian king Artabanus IV to establish the Sassanid Empire?', answer: '224 CE',
                  options: ['224 CE', 'just another Persian empire like the Achaemenids'],
                  hint: 'If stuck, revisit the "Crisis of the Third Century" node (c11_hist_cbse_03_001) and map the.',
                  misconception: 'Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they miss that the Sassanids created.' },
                { id: 'b', prompt: 'Why did the Sassanids make Zoroastrianism the *exclusive* state religion, unlike the religiously pluralistic Parthians?', answer: 'To legitimize their rule as restorers of authentic Persian tradition and create',
                  options: ['To legitimize their rule as restorers of authentic Persian tradition and create', 'religious devotion', 'just another Persian empire like the Achaemenids'],
                  hint: 'If stuck, revisit the "Crisis of the Third Century" node (c11_hist_cbse_03_001) and map the.',
                  misconception: 'Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they miss that the Sassanids created.' },
                { id: 'c', prompt: 'The 602–628 CE Roman–Sassanid war is often called a "war of attrition." Analyze how the *strategic objectives* of Khosrow II and Heraclius differed from.', answer: 'Earlier wars aimed at frontier adjustments (e.g., Nisibis, Armenia)',
                  options: ['Earlier wars aimed at frontier adjustments (e.g., Nisibis, Armenia)', 'just another border war', 'just another Persian empire like the Achaemenids'],
                  hint: 'If stuck, revisit the "Crisis of the Third Century" node (c11_hist_cbse_03_001) and map the.',
                  misconception: 'Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they miss that the Sassanids created.' }
          ],
            remediations: { 'the-sassanids-were-just-another': { steps: ['Re-read the Kartir inscription excerpt (Ka\'ba-ye Zartosht) in the NCERT textbook box — identify three specific actions.', 'Compare with Ashoka\'s Rock Edict XII (c6_history_ch05_009) — note Ashoka *recommends* tolerance, Kartir *enforces*.', 'Draw a two-column table: "Achaemenid Satrapy" vs. "Sassanid *Kust* System" — focus on who controls temples, courts, and.', 'Explain in 3 sentences why this made the Sassanid state more fragile when its official religion was challenged.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they miss that the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Sassanid Empire fell because of internal religious divisions, not Arab military superiority." Use evidence from the treatment.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'just another Persian empire like the Achaemenids'],
                  hint: 'If stuck, revisit the "Crisis of the Third Century" node (c11_hist_cbse_03_001) and map the.',
                  misconception: 'Students often think the Sassanids were "just another Persian empire like the Achaemenids" — they miss that the Sassanids created.' }
          ],
            remediations: { 'the-sassanids-were-just-another': { steps: ['Re-read the Kartir inscription excerpt (Ka\'ba-ye Zartosht) in the NCERT textbook box — identify three specific actions.', 'Compare with Ashoka\'s Rock Edict XII (c6_history_ch05_009) — note Ashoka *recommends* tolerance, Kartir *enforces*.', 'Draw a two-column table: "Achaemenid Satrapy" vs. "Sassanid *Kust* System" — focus on who controls temples, courts, and.', 'Explain in 3 sentences why this made the Sassanid state more fragile when its official religion was challenged.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_008', difficulty: 'standard',
          question: 'The Great Schism of 1054 was the formal separation between the Roman Catholic.',
          hint: 'If stuck, revisit the Council of Chalcedon (451) — specifically Canon 28 and Pope Leo\'s.',
          misconception: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Great Schism of 1054 was the formal separation between the Roman Catholic Church',
                  options: ['The Great Schism of 1054 was the formal separation between the Roman Catholic Church', 'The Crisis of the Third Century (235–284 CE) was a period of extreme political', 'The Rise of Christianity in the Roman World refers to the historical process (c', 'The Church as an Institution refers to the hierarchical organisational structure of the'],
                  hint: 'If stuck, revisit the Council of Chalcedon (451) — specifically Canon 28 and Pope Leo\'s rejection.',
                  misconception: 'Students often believe the 1054 Schism was a sudden, total break where all Christians instantly chose sides.' }
          ],
            remediations: { 'the-1054-schism-was-a': { steps: ['Re-read the 1054 bull of excommunication — note it anathematizes Cerularius and his followers, not "all Greeks."', 'Map the geography of post-1054 communion: identify regions (Southern Italy, Sicily, Crusader states) where Latin and.', 'Compare the 1054 anathemas with the 1204 *Partitio terrarum imperii Romaniae* — the latter imposed Latin bishops.', 'Write a 3-sentence explanation distinguishing "canonical rupture" (1054) from "communal schism" (post-1204).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_009', difficulty: 'standard',
          question: 'The Barbarian Kingdoms refer to the successor states established by Germanic.',
          hint: 'Revisit c11_hist_cbse_03_001 (Crisis of the Third Century) and c11_hist_cbse_03_002 (Rise.',
          misconception: 'Students often believe the "Barbarian Kingdoms" were chaotic, lawless tribal chiefdoms that destroyed Roman.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Barbarian Kingdoms refer to the successor states established by Germanic tribes',
                  options: ['The Barbarian Kingdoms refer to the successor states established by Germanic tribes', 'The Crisis of the Third Century (235–284 CE) was a period of extreme political', 'The Rise of Christianity in the Roman World refers to the historical process (c', 'The Church as an Institution refers to the hierarchical organisational structure of the'],
                  hint: 'Revisit c11_hist_cbse_03_001 (Crisis of the Third Century) and c11_hist_cbse_03_002 (Rise.',
                  misconception: 'Students often believe the "Barbarian Kingdoms" were chaotic, lawless tribal chiefdoms that destroyed Roman civilisation.' }
          ],
            remediations: { 'the-barbarian-kingdoms-were-chaotic': { steps: ['If the student holds this misconception: Step 1 — Show the *Breviary of Alaric* (506 CE) excerpt: it copies Roman.', 'Ask: "Does this look like destruction or adaptation?" Step 2 — Compare a Merovingian gold *tremissis* (imitating Roman.', 'Step 3 — Map the bishoprics of 6th-century Gaul: they align exactly with Roman *civitates*.', 'The Church didn\'t vanish; it became the administrative backbone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_03_010', difficulty: 'standard',
          question: 'Continuities and Ruptures in Late Antiquity refers to the historical analysis.',
          hint: 'If stuck, re-read the "Walkthrough" of node c11_hist_cbse_03_005 (Byzantine Empire) and.',
          misconception: 'Students often believe "Late Antiquity" is just a new name for the "Dark Ages" (476–1000 CE) and assume the entire.',
          parts: [
                { id: 'a', prompt: 'Name the approximate chronological boundaries of "Late Antiquity" as used in current historiography and state the two traditional competing narratives (labels.', answer: 'Correct answer: Late Antiquity spans roughly 250–750 CE',
                  options: ['Correct answer: Late Antiquity spans roughly 250–750 CE', '476–1453', 'Renaissance vs Reformation', 'Late Antiquity'],
                  hint: 'If stuck, re-read the "Walkthrough" of node c11_hist_cbse_03_005 (Byzantine Empire) and.',
                  misconception: 'Students often believe "Late Antiquity" is just a new name for the "Dark Ages" (476–1000 CE) and assume the entire Mediterranean uniformly.' },
                { id: 'b', prompt: 'Using the sibling node on the Rise of Islam (c11_hist_cbse_03_006), identify one economic continuity and one cultural rupture caused by the early Islamic.', answer: 'Correct answer: Continuity',
                  options: ['Correct answer: Continuity', 'war destruction', 'Late Antiquity', 'Dark Ages'],
                  hint: 'If stuck, re-read the "Walkthrough" of node c11_hist_cbse_03_005 (Byzantine Empire) and.',
                  misconception: 'Students often believe "Late Antiquity" is just a new name for the "Dark Ages" (476–1000 CE) and assume the entire Mediterranean uniformly.' },
                { id: 'c', prompt: 'Compare the role of the Christian Church in the West (c11_hist_cbse_03_003) and the East (c11_hist_cbse_03_005) during 400–700 CE.', answer: 'Correct answer: Continuity',
                  options: ['Correct answer: Continuity', 'Late Antiquity', 'Dark Ages', 'the entire Mediterranean uniformly declined'],
                  hint: 'If stuck, re-read the "Walkthrough" of node c11_hist_cbse_03_005 (Byzantine Empire) and.',
                  misconception: 'Students often believe "Late Antiquity" is just a new name for the "Dark Ages" (476–1000 CE) and assume the entire Mediterranean uniformly.' }
          ],
            remediations: { 'late-antiquity-is-just-a': { steps: ['Create a three-column table: Region (West / East / Near East), Continuity (list 2), Rupture (list 2).', 'Populate using sibling nodes: West = Latin Church continuity / Imperial tax rupture; East = Roman bureaucracy.', 'Color-code: green for continuity, red for rupture.', 'Write one paragraph: "The Mediterranean world did not fall; it fractured into three zones where Roman institutions were.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
