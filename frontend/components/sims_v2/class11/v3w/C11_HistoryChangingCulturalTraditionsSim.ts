import type { SimDef } from '../../engine/types';
import C11_HistoryChangingCulturalTraditionsSim from '../../../simulations/c6_12/C11_HistoryChangingCulturalTraditionsSim';

/** v3 wrapped master — C11_HistoryChangingCulturalTraditionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historychangingculturaltraditionssim: SimDef = {
    id: 'v3w_c11_historychangingculturaltraditionssim',
    title: 'Changing Cultural Traditions',
    subtitle: 'Covers Italian Renaissance society (1350–1550) with focus on Florence, Venice, and.',
    classLevel: 11, subject: 'history', topic: 'Women and the Family in Renaissance Society',
    chapters: [],
    nodeIds: ['c11_hist_cbse_07_011', 'c11_hist_cbse_01_003', 'c11_hist_cbse_02_008', 'c11_hist_cbse_07_004', 'c11_hist_cbse_02_011', 'c11_hist_cbse_01_011', 'c11_hist_cbse_07_007', 'c11_hist_cbse_05_009', 'c11_hist_cbse_05_010', 'c11_hist_cbse_02_005', 'c11_hist_cbse_07_001', 'c11_hist_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are visiting the Uffizi Gallery in Florence and see Bronzino\'s portrait of Eleonora di Toledo.', goal: 'Master Changing Cultural Traditions.' },
    discovery: {
        question: 'Why did humanist educators like Vittorino da Feltre and Juan Luis Vives advocate Latin education for noble girls but explicitly forbid them from studying.',
        options: ['Correct answer: Humanists viewed female education as ornamental', 'women were considered intellectually inferior', 'liberated'],
        answer: 'Humanists viewed female education as ornamental',
        hook: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra.',
    },
    teaching: [
        { title: 'The topic "Women and the Family in.', text: 'The topic "Women and the Family in Renaissance Society" examines the social, legal, and cultural position of women and the structure of family life in Italian city-states (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_011', title: 'The topic "Women and the Family in.',
          scaffold: { problem: 'Using the 1427 Florentine *catasto* data (average merchant dowry = 1,200 florins; skilled artisan annual wage = 30 florins; convent dowry =.',
            steps: [
            { text: 'Identify the key variables from the source — marriage dowry (1,200 florins), convent dowry (500 florins), artisan wage.' },
            { text: 'Calculate marriage cost in labour-years: 1,200 ÷ 30 = 40 years of artisan labour for *one* daughter\'s marriage.' },
            { text: 'Calculate convent cost in labour-years: 500 ÷ 30 = 16.7 years — less than half the marriage cost.' },
            { text: 'Model the family budget: 3 daughters × 1,200 florins = 3,600 florins total marriage cost = 120 labour-years (impossible.' },
            { text: 'Apply primogeniture logic — eldest son inherits workshop; second son may get small capital; daughters are "cost.' },
            { text: 'Predict outcome: 1 daughter marries (family\'s best alliance), 2 enter convent (cheaper, preserves estate), sons.' },
            { text: 'Connect to aggregate data — by 1500, 50% of Florentine patrician women were nuns, creating a "convent city" within the.', faded: true, blankAnswer: 'An artisan needs 40 years\' wages for a marriage dowry vs..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_003', title: 'Cuneiform script is the wedge-shaped.',
          scaffold: { problem: 'Analyze how the material properties of clay and reed determined the formal characteristics of cuneiform signs (wedge shape, direction of.',
            steps: [
            { text: 'Identify the raw materials — alluvial clay (fine-grained, plastic when wet, hard when dry) and reed stems (hollow,.' },
            { text: 'Link clay properties to tablet form — palm-sized because larger tablets crack during drying; flattened surfaces because.' },
            { text: 'Link reed properties to sign morphology — oblique cut creates a triangular tip; pressing (not dragging) avoids tearing.' },
            { text: 'Derive writing direction — right-to-left, top-to-bottom avoids smudging fresh signs with the writing hand (right-handed.' },
            { text: 'Connect to scribal training — students copied sign lists (e.g., *Sumerian-Akkadian lexical lists*) on small practice.' },
            { text: 'Evaluate systemic impact — these constraints made cuneiform slow to write, bulky to store, and unsuited for rapid.', faded: true, blankAnswer: 'Clay\'s plasticity and sun-drying dictated small, flat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_02_008', title: 'The Late Roman Empire (c. 284–476 CE).',
          scaffold: { problem: 'Using the NCERT text and timeline, explain why Diocletian\'s Tetrarchy failed to provide stable succession despite its elaborate design, and.',
            steps: [
            { text: 'Identify the Tetrarchy\'s succession mechanism — two Augusti retire after 20 years, two Caesares promoted, new Caesares.' },
            { text: 'Trace the actual sequence — Diocletian and Maximian retired in 305 CE, but Constantius Chlorus (Caesar in West) died in.' },
            { text: 'Analyse the structural flaw — the system ignored dynastic loyalty of armies.' },
            { text: 'Compare Constantine\'s solution — he defeated all rivals (Maxentius 312, Licinius 324), established hereditary.' },
            { text: 'Evaluate the outcome — Constantine\'s dynasty lasted until 363 CE (Julian\'s death), longer than the Tetrarchy (305-313.', faded: true, blankAnswer: 'The Tetrarchy failed because its succession mechanism.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_004', title: 'Renaissance Art (c. 1300–1600 CE).',
          scaffold: { problem: 'Using only the visual evidence in Masaccio\'s *Tribute Money* (Brancacci Chapel, c.',
            steps: [
            { text: 'Identify all orthogonals — the horizontal lines of the building cornices, the mountain ridges, and the gestures of.' },
            { text: 'Trace these lines mentally or on a transparent overlay; they meet at the **head of Christ**, exactly at the horizon.' },
            { text: 'Note that the three episodes are **not separated by frames** but unfold in a continuous landscape unified by this.' },
            { text: 'Analyse the **theological implication**: Christ is the still centre (vanishing point) around which human action (tax,.' },
            { text: 'Contrast with medieval continuous narrative (e.g., Giotto\'s *Legend of St Francis*) where space is compartmentalised;.', faded: true, blankAnswer: 'The vanishing point at Christ\'s head anchors a single,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_02_011', title: 'The Roman Empire\'s cultural diversity.',
          scaffold: { problem: 'Using the NCERT evidence on Spanish olive oil (Dressel 20 amphorae, 140–160 CE peak) and North African dominance (3rd–4th c.), explain how.',
            steps: [
            { text: 'Identify the economic actors — Spanish (Baetica) and North African (Byzacium) landowners producing olive oil for.' },
            { text: 'Note the transport mechanism — Dressel 20 amphorae (standardised containers) shipped across the Mediterranean, found.' },
            { text: 'Observe the linguistic evidence — amphora stamps in Latin (Spanish) and Latin/Punic (African), but Greek-speaking.' },
            { text: 'Trace the social impact — Spanish and African elites entered the Senate (e.g., Trajan from Italica, Septimius Severus.' },
            { text: 'Conclude: Economic integration created a shared commercial space (amphorae, coins, contracts in Latin/Greek) while.', faded: true, blankAnswer: 'The Roman Mediterranean economy integrated diverse regions.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_011', title: 'The Legacy of Mesopotamian Civilisation.',
          scaffold: { problem: 'Using the chapter\'s evidence, explain why the Gilgamesh Epic\'s ending—where Gilgamesh finds consolation in Uruk\'s city wall rather than in.',
            steps: [
            { text: 'Identify the key contrast—tribal hero expects sons to continue his line; Gilgamesh looks at the built city (fired-brick.' },
            { text: 'Recall the chapter\'s definition of urbanism: cities as centres of non-food production, division of labour, written.' },
            { text: 'Connect the wall to urban institutions—it required organised labour, bronze tools, baked bricks, planning, and.' },
            { text: 'Note that the Epic was preserved in scribal schools (Assurbanipal\'s library had copies), showing the text itself is a.' },
            { text: 'Conclude that the epic articulates a civilisation\'s self-understanding: permanence lies in collective urban.', faded: true, blankAnswer: 'The ending reflects the Mesopotamian belief that the.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_01_003', title: 'Identify each idea',
          dissect: { specimen: 'Changing Cultural Traditions', spots: [
            { id: 's1', label: 'The topic Women and the', prompt: 'Which idea is this? — The topic "Women and the Family in Renaissance Society" examines the social, legal, and.', answer: 'The topic Women and the', options: ['The topic Women and the', 'Cuneiform script is the wedge-shaped', 'The Late Roman Empire c', 'Renaissance Art c 13001600 CE'] },
            { id: 's2', label: 'Cuneiform script is the wedge-shaped', prompt: 'Which idea is this? — Cuneiform script is the wedge-shaped writing system developed in ancient Mesopotamia.', answer: 'Cuneiform script is the wedge-shaped', options: ['Cuneiform script is the wedge-shaped', 'The topic Women and the', 'The Late Roman Empire c', 'Renaissance Art c 13001600 CE'] },
            { id: 's3', label: 'The Late Roman Empire c', prompt: 'Which idea is this? — The Late Roman Empire (c. 284–476 CE) marks the transition from the Principate to the.', answer: 'The Late Roman Empire c', options: ['The Late Roman Empire c', 'The topic Women and the', 'Cuneiform script is the wedge-shaped', 'Renaissance Art c 13001600 CE'] },
            { id: 's4', label: 'Renaissance Art c 13001600 CE', prompt: 'Which idea is this? — Renaissance Art (c. 1300–1600 CE) refers to the radical transformation in European visual.', answer: 'Renaissance Art c 13001600 CE', options: ['Renaissance Art c 13001600 CE', 'The topic Women and the', 'Cuneiform script is the wedge-shaped', 'The Late Roman Empire c'] },
            { id: 's5', label: 'The Roman Empires cultural diversity', prompt: 'Which idea is this? — The Roman Empire\'s cultural diversity refers to the coexistence of multiple languages.', answer: 'The Roman Empires cultural diversity', options: ['The Roman Empires cultural diversity', 'The topic Women and the', 'Cuneiform script is the wedge-shaped', 'The Late Roman Empire c'] },
            { id: 's6', label: 'The Legacy of Mesopotamian Civilisation', prompt: 'Which idea is this? — The Legacy of Mesopotamian Civilisation refers to the enduring intellectual, cultural,.', answer: 'The Legacy of Mesopotamian Civilisation', options: ['The Legacy of Mesopotamian Civilisation', 'The topic Women and the', 'Cuneiform script is the wedge-shaped', 'The Late Roman Empire c'] }
          ] } }
    ],
    explore: { component: C11_HistoryChangingCulturalTraditionsSim, prompt: 'Explore the interactive — Changing Cultural Traditions' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_011', difficulty: 'standard',
          question: 'The topic "Women and the Family in Renaissance Society" examines the social,.',
          hint: 'If stuck, revisit c11_hist_cbse_07_002 (Humanism) and identify every passage where the.',
          misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra.',
          parts: [
                { id: 'a', prompt: 'In which Italian city-state did the 1427 *catasto* (tax census) reveal that dowry amounts had risen so sharply that families with multiple daughters faced.', answer: 'Florence',
                  options: ['Correct answer: Florence', 'liberated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra Fedele) gained fame.' },
                { id: 'b', prompt: 'Why did humanist educators like Vittorino da Feltre and Juan Luis Vives advocate Latin education for noble girls but explicitly forbid them from studying.', answer: 'Humanists viewed female education as ornamental',
                  options: ['Correct answer: Humanists viewed female education as ornamental', 'women were considered intellectually inferior', 'liberated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra Fedele) gained fame.' }
          ],
            remediations: { 'the-renaissance-liberated-women-because': { steps: ['Have the student read two primary sources side-by-side — Cereta\'s *Letter to Bibolo Semproni* (1488) defending her.', 'Ask: "Who had more freedom — the humanist writing letters in her *studiolo*, or the artisan\'s wife buying wool at.', 'Map the *geography of constraint*: mark on a Florence map the convent walls, the *serraglio* (prostitute zone), the.', 'Re-read Alberti\'s *Della Famiglia* Book 3: highlight every verb commanding the wife ("she must," "she shall") — count.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The *Querelle des Femmes* (c. 1400–1600) proves Renaissance intellectuals seriously debated women\'s equality." Use Christine de Pizan\'s.', answer: 'The claim overstates the debate\'s radicalism',
                  options: ['Correct answer: The claim overstates the debate\'s radicalism', 'yes, it was early feminism', 'women are different but equal in dignity', 'liberated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra Fedele) gained fame.' },
                { id: 'b', prompt: 'Construct a 3-panel timeline (1350, 1450, 1550) showing how the *legal status* of a Florentine merchant\'s wife changed — or didn\'t — across the Renaissance.', answer: 'Correct answer (criteria): - 1350: *Statuti del Popolo*',
                  options: ['Correct answer (criteria): - 1350: *Statuti del Popolo*', 'liberated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra Fedele) gained fame.' }
          ],
            remediations: { 'the-renaissance-liberated-women-because': { steps: ['Have the student read two primary sources side-by-side — Cereta\'s *Letter to Bibolo Semproni* (1488) defending her.', 'Ask: "Who had more freedom — the humanist writing letters in her *studiolo*, or the artisan\'s wife buying wool at.', 'Map the *geography of constraint*: mark on a Florence map the convent walls, the *serraglio* (prostitute zone), the.', 'Re-read Alberti\'s *Della Famiglia* Book 3: highlight every verb commanding the wife ("she must," "she shall") — count.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_003', difficulty: 'standard',
          question: 'Cuneiform script is the wedge-shaped writing system developed in ancient.',
          hint: 'Revisit c11_hist_cbse_01_002 — focus on the bullae (clay envelopes) and how token.',
          misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most.',
          parts: [
                { id: 'a', prompt: 'What is the approximate date of the earliest known cuneiform tablets from Uruk, and what primary content do they record?', answer: 'The earliest cuneiform tablets date to c',
                  options: ['The earliest cuneiform tablets date to c', '2000 BCE', 'law codes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' },
                { id: 'b', prompt: 'Why did Mesopotamian scribes use a reed stylus on clay tablets rather than ink on papyrus or carving on stone, given that Egypt used papyrus and the Harappans.', answer: 'Mesopotamia lacked papyrus and had limited stone/wood',
                  options: ['Mesopotamia lacked papyrus and had limited stone/wood', 'clay was more durable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' },
                { id: 'c', prompt: 'A scribe in 2600 BCE Uruk receives an order: "Record the delivery of 300 litres of barley to the temple storehouse, received from Farmer A, witnessed by.', answer: 'Steps: (1) Collect levigated clay from riverbed',
                  options: ['Steps: (1) Collect levigated clay from riverbed', 'moist clay'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' }
          ],
            remediations: { 'cuneiform-was-an-alphabet-where': { steps: ['Show the student a photo of a cuneiform tablet (e.g., the mathematical tablet with √2) and a school exercise tablet.', 'Have them copy 5 signs with a reed on clay — time them; discuss physical difficulty.', 'Compare with a Brahmi alphabet chart — highlight sign-count difference.', 'Read the NCERT passage on literacy ("Very few Mesopotamians could read and write...', 'Rewrite a 3-mark answer: "Explain why literacy was limited in Mesopotamia" using evidence from steps 1–4.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Cuneiform\'s longevity (3200 BCE – 1st century CE) proves it was a perfectly efficient writing system for all Mesopotamian languages."', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'yes, it lasted 3000 years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' }
          ],
            remediations: { 'cuneiform-was-an-alphabet-where': { steps: ['Show the student a photo of a cuneiform tablet (e.g., the mathematical tablet with √2) and a school exercise tablet.', 'Have them copy 5 signs with a reed on clay — time them; discuss physical difficulty.', 'Compare with a Brahmi alphabet chart — highlight sign-count difference.', 'Read the NCERT passage on literacy ("Very few Mesopotamians could read and write...', 'Rewrite a 3-mark answer: "Explain why literacy was limited in Mesopotamia" using evidence from steps 1–4.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_008', difficulty: 'standard',
          question: 'The Late Roman Empire (c. 284–476 CE) marks the transition from the Principate.',
          hint: 'Review the "Third-Century Crisis" section in NCERT (pp. 43-44) and the table of.',
          misconception: 'Students believe Constantine made Christianity the *official state religion* in 312 CE after his vision at the Milvian.',
          parts: [
                { id: 'a', prompt: 'Analyse the economic reasoning behind Constantine\'s introduction of the solidus (4.5g pure gold coin) when the silver denarius had collapsed.', answer: 'The denarius collapsed',
                  options: ['The denarius collapsed', 'gold being more valuable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Constantine made Christianity the *official state religion* in 312 CE after his vision at the Milvian Bridge.' }
          ],
            remediations: { 'constantine-made-christianity-the-official': { steps: ['Create a two-column table — "Constantine\'s Actions (312–337)" vs "Theodosius\'s Actions (379–395)" — listing specific.', 'Mark each as "toleration," "patronage," "doctrinal definition," or "coercion."', 'Identify which emperor first banned pagan sacrifice (Theodosius, 391).', 'Read the NCERT paragraph on "Late Antiquity" (p. 52) noting the phrase "gradual and complex process" and "polytheism.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_004', difficulty: 'standard',
          question: 'Renaissance Art (c. 1300–1600 CE) refers to the radical transformation in.',
          hint: 'Revisit **c11_hist_cbse_07_002 (Humanism)** — focus on Pico della Mirandola\'s *Oration on.',
          misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality,.',
          parts: [
                { id: 'a', prompt: 'Identify the Florentine architect who conducted the famous baptistery experiment (c.', answer: '**Filippo Brunelleschi.**',
                  options: ['**Filippo Brunelleschi.**', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' }
          ],
            remediations: { 'students-believe-renaissance-realism-means': { steps: ['**Show the "two-eye" problem**: Have students close one eye, hold a thumb up, then switch eyes — the thumb jumps.', 'Explain: *Perspective assumes a Cyclopean, stationary eye.* 2.', '**Compare Michelangelo\'s *David* (1504) with a 3D scan of a real man**: Measure the hand-to-body ratio.', 'Discuss why the artist *chose* distortion.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The artist\'s rise to genius status was primarily due to the invention of perspective." Argue for or against using evidence from patronage,.', answer: '**Against.** Perspective was a *necessary but insufficient* condition',
                  options: ['**Against.** Perspective was a *necessary but insufficient* condition', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' },
                { id: 'b', prompt: 'Construct a 4-panel visual timeline (described in words) showing the **progression from symbolic to optical realism** in the depiction of the human body from.', answer: '**Panel 1 (c',
                  options: ['**Panel 1 (c', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' }
          ],
            remediations: { 'students-believe-renaissance-realism-means': { steps: ['**Show the "two-eye" problem**: Have students close one eye, hold a thumb up, then switch eyes — the thumb jumps.', 'Explain: *Perspective assumes a Cyclopean, stationary eye.* 2.', '**Compare Michelangelo\'s *David* (1504) with a 3D scan of a real man**: Measure the hand-to-body ratio.', 'Discuss why the artist *chose* distortion.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_011', difficulty: 'standard',
          question: 'The Roman Empire\'s cultural diversity refers to the coexistence of multiple.',
          hint: 'If stuck, revisit c11_hist_cbse_02_003 (Augustus and Principate) to see how the emperor,.',
          misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods,.',
          parts: [
                { id: 'a', prompt: 'Why did the Roman Empire maintain two official administrative languages (Latin and Greek) instead of imposing Latin everywhere, and where did the linguistic.', answer: 'The empire retained Greek in the East',
                  options: ['The empire retained Greek in the East', 'Latin was forced on the East after Augustus', 'the boundary was the Danube'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods, and Roman law on.' },
                { id: 'b', prompt: 'Compare the Roman citizenship model (gradual extension culminating in universal grant 212 CE) with the Mughal mansabdari system\'s approach to integrating.', answer: 'Similarities: (1) Both systems co-opted regional elites into imperial service',
                  options: ['Similarities: (1) Both systems co-opted regional elites into imperial service', 'citizenship = mansab', 'Romanisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods, and Roman law on.' }
          ],
            remediations: { 'the-roman-empire-imposed-cultural': { steps: ['Re-read the NCERT passage on "Many languages were spoken... but for the purposes of administration Latin and Greek were.', 'Compare the 212 CE edict\'s wording in the *Digest* (Ulpian: "all free persons in the Roman world are made Roman.', 'Create a two-column table: "State-imposed uniformity" (Latin in army/law, emperor cult) vs.', 'Write a 3-sentence correction: "The Roman Empire managed diversity through bilingual administration and legal.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Roman Empire\'s shift to Christianity as the sole authorised religion (Theodosius I, 391 CE) destroyed the cultural diversity that had.', answer: 'The claim is partially true but overstated',
                  options: ['The claim is partially true but overstated', 'yes, diversity ended', 'no change', 'Romanisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods, and Roman law on.' },
                { id: 'b', prompt: 'Compare the Roman citizenship model (gradual extension culminating in universal grant 212 CE) with the Mughal mansabdari system\'s approach to integrating.', answer: 'Similarities: (1) Both systems co-opted regional elites into imperial service',
                  options: ['Similarities: (1) Both systems co-opted regional elites into imperial service', 'citizenship = mansab', 'Romanisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Roman Empire imposed cultural uniformity through "Romanisation" — forcing Latin, Roman gods, and Roman law on.' }
          ],
            remediations: { 'the-roman-empire-imposed-cultural': { steps: ['Re-read the NCERT passage on "Many languages were spoken... but for the purposes of administration Latin and Greek were.', 'Compare the 212 CE edict\'s wording in the *Digest* (Ulpian: "all free persons in the Roman world are made Roman.', 'Create a two-column table: "State-imposed uniformity" (Latin in army/law, emperor cult) vs.', 'Write a 3-sentence correction: "The Roman Empire managed diversity through bilingual administration and legal.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_011', difficulty: 'standard',
          question: 'The Legacy of Mesopotamian Civilisation refers to the enduring intellectual,.',
          hint: 'Revisit the worked example in node c11_hist_cbse_01_008 where the square root of 2 is.',
          misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they.',
          parts: [
                { id: 'a', prompt: 'What is the sexagesimal value recorded on c. 1800 BCE tablets for the square root of 2, and how accurate is it compared to the modern value?', answer: 'The tablets give √2 as 1 + 24/60 + 51/60² + 10/60³ = 1.41421296',
                  options: ['The tablets give √2 as 1 + 24/60 + 51/60² + 10/60³ = 1.41421296', 'they used √2 = 1.41', 'primitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they assume the 60-minute.' },
                { id: 'b', prompt: 'A student claims: "The 60-minute hour came from the Greeks because they invented geometry." Using evidence from the chapter, explain why this is incorrect and.', answer: 'The sexagesimal system (base-60) originated in Mesopotamia c',
                  options: ['The sexagesimal system (base-60) originated in Mesopotamia c', 'primitive', 'liking old things'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they assume the 60-minute.' }
          ],
            remediations: { 'mesopotamian-mathematics-was-primitive-because': { steps: ['Have the student convert 1.5 hours into sexagesimal notation (1;30) and 45 minutes into a fraction of an hour (45/60 =.', 'Use a two-column table: "Assurbanipal" vs.', '"Nabonidus" with rows for *method* (collecting/copying vs.', 'excavating/inspecting), *purpose* (scholarly preservation vs.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Mesopotamian urban schools were the world\'s first research institutions." Support your judgment with evidence from the chapter.', answer: 'The claim is largely valid',
                  options: ['The claim is largely valid', 'primitive', 'liking old things', 'the 60-minute hour is a modern metric invention'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they assume the 60-minute.' },
                { id: 'b', prompt: 'Construct a timeline showing the transmission of Mesopotamian time-reckoning (12 months, 24 hours, 60 minutes) from c.', answer: 'A strong answer includes: (1) Old Babylonian period (c',
                  options: ['A strong answer includes: (1) Old Babylonian period (c', 'primitive', 'liking old things', 'the 60-minute hour is a modern metric invention'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they assume the 60-minute.' }
          ],
            remediations: { 'mesopotamian-mathematics-was-primitive-because': { steps: ['Have the student convert 1.5 hours into sexagesimal notation (1;30) and 45 minutes into a fraction of an hour (45/60 =.', 'Use a two-column table: "Assurbanipal" vs.', '"Nabonidus" with rows for *method* (collecting/copying vs.', 'excavating/inspecting), *purpose* (scholarly preservation vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
