import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch02_p2: SimDef = {
    id: 'v3_c11_hist_ch02_p2',
    title: 'An Empire Across Three Continents · Part 2/2',
    subtitle: 'Read an empire as a lake with edges — and a republic wearing a crown.',
    classLevel: 11, subject: 'history', topic: 'An Empire Across Three Continents · Part 2/2',
    chapters: ['c11_hist_ch02'],
    nodeIds: ['c11_hist_cbse_02_007', 'c11_hist_cbse_02_008', 'c11_hist_cbse_02_009', 'c11_hist_cbse_02_010', 'c11_hist_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geographer tracing where Rome stopped and why', intro: 'A city-state in Italy ended up ruling Scotland to Syria — because it owned the sea between them.', goal: 'Explain Mediterranean integration, provincial cities, and the Augustan settlement\'s disguise.' },
    discovery: {
        question: 'Did Rome expand like an ink blot, seeping outward equally in every direction?',
        options: ['No — it followed resource corridors along the Mediterranean and stopped dead at the Rhine-Danube, the Euphrates and the Sahara', 'Yes — empires grow uniformly in all directions', 'Yes — legions marched wherever they pleased', 'No — it only expanded east toward India'],
        answer: 'No — it followed resource corridors along the Mediterranean and stopped dead at the Rhine-Danube, the Euphrates and the Sahara',
        hook: 'The sea was the empire\'s private highway — Spanish olive oil could undercut Italian producers 2,000 km away because \'Mare Nostrum\' made bulk trade coastal and cheap.',
    },
    teaching: [
        { title: 'Slavery in the Roman Empire: Economic and Social Role', text: 'Slavery in the Roman Empire (27 BCE – 476 CE West / 1453 CE East) was a legally sanctioned system of forced labour where enslaved persons (servi) were considered property (res) without legal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compare Rome\'s self-governing civitates with the Maurya-appointed nagara, then test whether Augustus\'s Principate was a republic or a monarchy in disguise.',
        labels: ['Slavery in the Roman', 'The Late Roman Empire', 'Economic Crisis and', 'The Byzantine Empire', 'Cultural Diversity: Languages, Religions'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_007', title: 'Slavery in the Roman Empire: Economic and Social Role',
          caseStudy: { intro: 'Imagine you are visiting the ruins of a Roman villa in Italy or a mosaic floor in a museum showing agricultural scenes — you might wonder: who actually did the.',
            decisions: [{ prompt: 'In the early Principate (Augustan era), approximately how many slaves existed in Italy relative to the total Italian population, according.', options: [
                { text: 'Under Augustus, there were about 3 million slaves in a total Italian population of 7.5', outcome: 'Under Augustus, there were about 3 million slaves in a total Italian population of 7.5 million.' },
                { text: 'slaves were a tiny minority', outcome: 'Not quite — Students often believe Roman slavery was a uniform, unchanging system where all slaves worked.', reveals: 'roman-slavery-was-a-uniform' },
                { text: 'most of the empire\'s population were slaves', outcome: 'Not quite — Students often believe Roman slavery was a uniform, unchanging system where all slaves worked.', reveals: 'roman-slavery-was-a-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_010', title: 'The Byzantine Empire and the Survival of the East',
          caseStudy: { intro: 'Imagine you are visiting the Hagia Sophia in Istanbul today — its massive dome has stood for nearly 1,500 years, surviving earthquakes, sieges, and empire.',
            decisions: [{ prompt: 'In what year did Constantine I officially dedicate Constantinople as the new capital of the Roman Empire, and what was the city\'s earlier.', options: [
                { text: 'Constantine dedicated Constantinople in 324 CE (formally inaugurated 330 CE)', outcome: 'Constantine dedicated Constantinople in 324 CE (formally inaugurated 330 CE); the city was formerly.' },
                { text: 'Byzantine Empire', outcome: 'Not quite — Students often believe the "Byzantine Empire" was a new state founded after 476 CE, distinct from.', reveals: 'the-byzantine-empire-was-a' },
                { text: 'Constantine founded the Byzantine Empire', outcome: 'Not quite — Students often believe the "Byzantine Empire" was a new state founded after 476 CE, distinct from.', reveals: 'the-byzantine-empire-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_011', title: 'Cultural Diversity: Languages, Religions and the Citizenship Model',
          caseStudy: { intro: 'Imagine you are visiting the Qutub Minar complex in Delhi and notice Arabic inscriptions alongside Sanskrit motifs on the same pillars — a visible layering.',
            decisions: [{ prompt: 'In which year was the Constitutio Antoniniana issued, granting Roman citizenship to all free inhabitants of the empire, and which emperor.', options: [
                { text: 'The Constitutio Antoniniana was issued in 212 CE by Emperor Caracalla (Marcus Aurelius', outcome: 'The Constitutio Antoniniana was issued in 212 CE by Emperor Caracalla (Marcus Aurelius Antoninus).' },
                { text: 'Romanisation', outcome: 'Not quite — Students often believe the Roman Empire imposed cultural uniformity through "Romanisation".', reveals: 'the-roman-empire-imposed-cultural' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In an empire-mapping exercise, a student shades Rome\'s expansion as \'spreading equally in all directions like an ink blot\' and describes Mediterranean trade as \'galleys running luxury cargo — silk and spices — straight from Italy to India.\'',
            decisions: [{ prompt: 'How should the empire\'s geography and trade really be pictured?', options: [
                { text: 'Redraw along corridors and hard stops: the Mediterranean was Rome\'s \'private lake\' — control of the sea meant control of the empire; expansion followed resource corridors and halted at non-navigable barriers — the Rhine-Danube line, the Sahara, the Euphrates facing Parthia. And the sea trade was bulk cabotage — grain, oil, wine moving coast to coast; Indian Ocean luxury goods were a separate circuit meeting it only at Red Sea ports.', outcome: 'The map gets accurate: a maritime empire bounded by ecology and rivals, running on bulk goods — not an ink blot and not a silk road on water.' },
                { text: 'Keep the ink-blot model — empires expand until they naturally stop.', outcome: 'The stops were specific and structural: desert, ocean and a rival empire marked real limits — expansion was never directionless.', reveals: 'empire-expands-equally' },
                { text: 'Keep the luxury-trade image — Rome\'s wealth famously came from Eastern luxuries.', outcome: 'The Mediterranean system\'s engine was high-volume staples; pepper and silk moved on a peripheral Indian Ocean circuit through intermediaries — a different network entirely.', reveals: 'mediterranean-was-luxury-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Trajan watched a merchant ship leave for India with longing — the Mediterranean was a closed lake Rome owned; the Indian Ocean was a market it could only envy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_007', difficulty: 'standard',
          question: 'Slavery in the Roman Empire (27 BCE – 476 CE West / 1453 CE East) was a legally.',
          hint: 'Revisit c11_hist_cbse_02_004 (army, end of expansion) and c11_hist_cbse_02_006.',
          misconception: 'Students often believe Roman slavery was a uniform, unchanging system where all slaves worked in chains on latifundia.',
          parts: [
                { id: 'a', prompt: 'The textbook describes two distinct methods the Romans used to control labour — one for slaves in gangs, another for free workers in debt.', answer: 'For slave gangs: chaining workers by the feet in squads of ten (Columella\'s',
                  options: ['For slave gangs: chaining workers by the feet in squads of ten (Columella\'s', 'whipping'],
                  hint: 'Revisit c11_hist_cbse_02_004 (army, end of expansion) and c11_hist_cbse_02_006 (latifundia, villa.',
                  misconception: 'Students often believe Roman slavery was a uniform, unchanging system where all slaves worked in chains on latifundia — like the Hollywood.' }
          ],
            remediations: { 'roman-slavery-was-a-uniform': { steps: ['If the student holds this misconception, have them re-read the "Controlling Workers" section (pp.', '48–49) and create a three-column table: Sector (Agriculture / Mining-Industry / Skilled Services), Labour Type (Slave.', 'Then ask: "Which sector used the most violent control?', 'Which used the most legal control?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Roman slavery was a uniform, unchanging system where all slaves worked in chains on latifundia.',
          parts: [
                { id: 'a', prompt: 'The textbook states: "Thousands surrender themselves to work in servitude, although they are free." Evaluate whether this voluntary debt bondage undermines the.', answer: 'No, it blurs but does not erase the distinction',
                  options: ['No, it blurs but does not erase the distinction', 'they were the same', 'totally different'],
                  hint: 'Revisit c11_hist_cbse_02_004 (army, end of expansion) and c11_hist_cbse_02_006 (latifundia, villa.',
                  misconception: 'Students often believe Roman slavery was a uniform, unchanging system where all slaves worked in chains on latifundia — like the Hollywood.' }
          ],
            remediations: { 'roman-slavery-was-a-uniform': { steps: ['If the student holds this misconception, have them re-read the "Controlling Workers" section (pp.', '48–49) and create a three-column table: Sector (Agriculture / Mining-Industry / Skilled Services), Labour Type (Slave.', 'Then ask: "Which sector used the most violent control?', 'Which used the most legal control?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_008', difficulty: 'standard',
          question: 'The Late Roman Empire (c. 284–476 CE) marks the transition from the Principate.',
          hint: 'Review the "Third-Century Crisis" section in NCERT (pp. 43-44) and the table.',
          misconception: 'Students believe Constantine made Christianity the *official state religion* in 312 CE after his vision at the Milvian.',
          parts: [
                { id: 'a', prompt: 'Analyse the economic reasoning behind Constantine\'s introduction of the solidus (4.5g pure gold coin) when the silver denarius had collapsed.', answer: 'The denarius collapsed',
                  options: ['The denarius collapsed', 'gold being more valuable'],
                  hint: 'Review the "Third-Century Crisis" section in NCERT (pp. 43-44) and the table of 3rd-century.',
                  misconception: 'Students believe Constantine made Christianity the *official state religion* in 312 CE after his vision at the Milvian Bridge.' }
          ],
            remediations: { 'constantine-made-christianity-the-official': { steps: ['Create a two-column table — "Constantine\'s Actions (312–337)" vs "Theodosius\'s Actions (379–395)" — listing specific.', 'Mark each as "toleration," "patronage," "doctrinal definition," or "coercion."', 'Identify which emperor first banned pagan sacrifice (Theodosius, 391).', 'Read the NCERT paragraph on "Late Antiquity" (p. 52) noting the phrase "gradual and complex process" and "polytheism.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_009', difficulty: 'standard',
          question: 'The Economic Crisis and Decline of the Western Roman Empire refers to the.',
          hint: 'Revisit c11_hist_cbse_02_003 (Principate) and c11_hist_cbse_02_004 (Army) — specifically.',
          misconception: 'Students believe the Western Roman Empire "fell" in a single event (476 CE) caused by "barbarian invasions" — imagining.',
          parts: [
                { id: 'a', prompt: 'A historian argues: "The Western Roman Empire fell because Germanic tribes were militarily superior." Using evidence from the third and fourth centuries.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'military superiority'],
                  hint: 'Revisit c11_hist_cbse_02_003 (Principate) and c11_hist_cbse_02_004 (Army) — specifically the.',
                  misconception: 'Students believe the Western Roman Empire "fell" in a single event (476 CE) caused by "barbarian invasions" — imagining hordes of Germanic.' }
          ],
            remediations: { 'the-western-roman-empire-fell': { steps: ['Re-read the "Third-Century Crisis" section in NCERT (pp. 41–42) and list *three* specific symptoms (e.g., 25 emperors.', 'Trace *one* symptom to its economic root — e.g., "rapid succession of emperors → each needed donative to army → debased.', 'Compare with Gupta decline (c7_hist_ch04_011): both faced *fragmentation of revenue* but Rome had *no successor state*.', 'Write a 100-word answer: "Why did Odoacer not crown himself emperor in 476 CE?" (Answer: legitimacy came from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_010', difficulty: 'standard',
          question: 'The Byzantine Empire (c. 330–1453 CE) was the eastern continuation of the Roman.',
          hint: 'Revisit c11_hist_cbse_02_008 (Constantine\'s reforms) and c11_hist_cbse_02_009 (western.',
          misconception: 'Students often believe the "Byzantine Empire" was a new state founded after 476 CE, distinct from Rome.',
          parts: [
                { id: 'a', prompt: 'In what year did Constantine I officially dedicate Constantinople as the new capital of the Roman Empire, and what was the city\'s earlier name?', answer: 'Constantine dedicated Constantinople in 324 CE (formally inaugurated 330 CE)',
                  options: ['Constantine dedicated Constantinople in 324 CE (formally inaugurated 330 CE)', 'Byzantine Empire', 'Constantine founded the Byzantine Empire', 'the "Byzantine Empire" was a new state founded after 476 CE, distinct from Rome'],
                  hint: 'Revisit c11_hist_cbse_02_008 (Constantine\'s reforms) and c11_hist_cbse_02_009 (western decline).',
                  misconception: 'Students often believe the "Byzantine Empire" was a new state founded after 476 CE, distinct from Rome.' },
                { id: 'b', prompt: 'Analyse the following statement using evidence from the 6th century: "Justinian\'s reconquest of the western Mediterranean strengthened the Byzantine Empire.', answer: 'Refute',
                  options: ['Refute', 'Byzantine Empire', 'Constantine founded the Byzantine Empire', 'the "Byzantine Empire" was a new state founded after 476 CE, distinct from Rome'],
                  hint: 'Revisit c11_hist_cbse_02_008 (Constantine\'s reforms) and c11_hist_cbse_02_009 (western decline).',
                  misconception: 'Students often believe the "Byzantine Empire" was a new state founded after 476 CE, distinct from Rome.' }
          ],
            remediations: { 'the-byzantine-empire-was-a': { steps: ['If the student conflates "Byzantine" with "post-476 new state": (1) Show the 6th-century coin of Justinian inscribed.', 'Stress: the east *was* Rome; "Byzantine" is a modern historiographical label for its medieval phase.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_011', difficulty: 'standard',
          question: 'The Roman Empire\'s cultural diversity refers to the coexistence of multiple.',
          hint: 'If stuck, revisit c11_hist_cbse_02_003 (Augustus and Principate) to see how the emperor.',
          misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods.',
          parts: [
                { id: 'a', prompt: 'Why did the Roman Empire maintain two official administrative languages (Latin and Greek) instead of imposing Latin everywhere, and where did the linguistic.', answer: 'The empire retained Greek in the East',
                  options: ['The empire retained Greek in the East', 'Latin was forced on the East after Augustus', 'the boundary was the Danube', 'Romanisation'],
                  hint: 'If stuck, revisit c11_hist_cbse_02_003 (Augustus and Principate) to see how the emperor, Senate.',
                  misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods, and Roman law.' },
                { id: 'b', prompt: 'Compare the Roman citizenship model (gradual extension culminating in universal grant 212 CE) with the Mughal mansabdari system\'s approach to integrating.', answer: 'Similarities: (1) Both systems co-opted regional elites into imperial service',
                  options: ['Similarities: (1) Both systems co-opted regional elites into imperial service', 'citizenship = mansab', 'Romanisation'],
                  hint: 'If stuck, revisit c11_hist_cbse_02_003 (Augustus and Principate) to see how the emperor, Senate.',
                  misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods, and Roman law.' }
          ],
            remediations: { 'the-roman-empire-imposed-cultural': { steps: ['Re-read the NCERT passage on "Many languages were spoken... but for the purposes of administration Latin and Greek were.', 'Compare the 212 CE edict\'s wording in the *Digest* (Ulpian: "all free persons in the Roman world are made Roman.', 'Create a two-column table: "State-imposed uniformity" (Latin in army/law, emperor cult) vs.', 'Write a 3-sentence correction: "The Roman Empire managed diversity through bilingual administration and legal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
