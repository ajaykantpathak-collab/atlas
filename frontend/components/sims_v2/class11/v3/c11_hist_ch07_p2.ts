import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch07_p2: SimDef = {
    id: 'v3_c11_hist_ch07_p2',
    title: 'Changing Cultural Traditions · Part 2/2',
    subtitle: 'Time the rebirth correctly — it started before the city fell.',
    classLevel: 11, subject: 'history', topic: 'Changing Cultural Traditions · Part 2/2',
    chapters: ['c11_hist_ch07'],
    nodeIds: ['c11_hist_cbse_07_007', 'c11_hist_cbse_07_008', 'c11_hist_cbse_07_009', 'c11_hist_cbse_07_010', 'c11_hist_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a scholar tracing how Greek manuscripts reached Florence', intro: 'Statues commissioned by merchant-bankers crowd a Florentine square — why here, why then, and who actually paid for it?', goal: 'Explain the city-state conditions behind the Renaissance and humanism\'s relationship to Christianity.' },
    discovery: {
        question: 'Constantinople fell in 1453, Greek scholars fled west — and that\'s what caused the Renaissance?',
        options: ['No — the Renaissance was decades underway by 1400; scholars had been arriving since the 1390s and 1453 only accelerated it', 'Yes — one event started the whole movement', 'Yes — Italy had no Greek texts before 1453', 'No — the Renaissance actually caused the fall'],
        answer: 'No — the Renaissance was decades underway by 1400; scholars had been arriving since the 1390s and 1453 only accelerated it',
        hook: 'And the humanists weren\'t secular rebels — Petrarch and Erasmus were devout Christians mining classical sources to deepen faith, not escape it.',
    },
    teaching: [
        { title: 'The Catholic Counter-Reformation and the Council of Trent', text: 'The Catholic Counter-Reformation (1545–1563) was the Catholic Church\'s systematic doctrinal, disciplinary, and institutional response to the Protestant Reformation, centred on the Council of Trent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the Medici\'s banker-capitalism from feudal lordship, then weigh the printing press against manuscript networks in humanism\'s spread.',
        labels: ['The Catholic Counter-Reformation', 'The Scientific Revolution: Copernicus,', 'Renaissance Architecture and', 'The Spread of Renaissance', 'Women and the Family'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_007', title: 'The Catholic Counter-Reformation and the Council of Trent',
          caseStudy: { intro: 'Imagine you visit the Church of St. Francis Xavier in Old Goa — its baroque altar and relics reflect the Counter-Reformation\'s visual theology.',
            decisions: [{ prompt: 'In which year did the Council of Trent open its first session, and which Pope convened it?', options: [
                { text: 'The Council of Trent opened on 13 December 1545 under Pope Paul III', outcome: 'The Council of Trent opened on 13 December 1545 under Pope Paul III.' },
                { text: 'Catholic Reformation', outcome: 'Not quite — Students often think the Counter-Reformation was only a reaction to Luther — a defensive "Catholic.', reveals: 'the-counter-reformation-was-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_008', title: 'The Scientific Revolution: Copernicus, Galileo and Newton',
          caseStudy: { intro: 'Imagine you\'re visiting the Jantar Mantar in Delhi or Jaipur — those massive stone instruments built by Maharaja Jai Singh II in the 1720s to track planetary.',
            decisions: [{ prompt: 'What was the title and publication year of Copernicus\'s major work that proposed the heliocentric model?', options: [
                { text: '*De Revolutionibus Orbium Coelestium* (On the Revolutions of the Heavenly Spheres),', outcome: '*De Revolutionibus Orbium Coelestium* (On the Revolutions of the Heavenly Spheres), published.' },
                { text: 'proved', outcome: 'Not quite — Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower.', reveals: 'galileo-proved-the-earth-moves' },
                { text: '*Dialogue Concerning the Two Chief World Systems* or giving a wrong date', outcome: 'Not quite — Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower.', reveals: 'galileo-proved-the-earth-moves' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_009', title: 'Renaissance Architecture and the Rediscovery of Vitruvius',
          caseStudy: { intro: 'Imagine standing before the dome of Florence Cathedral—how did Brunelleschi build the largest masonry dome since the Pantheon without scaffolding?',
            decisions: [{ prompt: 'In what year and location was Vitruvius\'s *De Architectura* rediscovered, and who found it?', options: [
                { text: 'Correct: 1414, Abbey of St', outcome: 'Correct: 1414, Abbey of St. Gall (Switzerland), discovered by Poggio Bracciolini.' },
                { text: '1450s, Rome, Alberti', outcome: 'Not quite — Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.', reveals: 'students-conflate-vitruvius-the-1st' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_010', title: 'The Spread of Renaissance Ideas to Northern Europe',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in Delhi and see a reproduction of Albrecht Dürer\'s "Self-Portrait at 28" (1500) – the intense gaze, the.',
            decisions: [{ prompt: 'What invention, perfected in Mainz c. 1450, accelerated the spread of Renaissance texts to Northern Europe more than any other factor?', options: [
                { text: 'The movable-type printing press perfected by Johannes Gutenberg in Mainz c', outcome: 'The movable-type printing press perfected by Johannes Gutenberg in Mainz c. 1450.' },
                { text: 'the compass', outcome: 'Not quite — Students think the Northern Renaissance began *after* the Italian Renaissance ended (c.', reveals: 'the-northern-renaissance-began-after' },
                { text: 'universities', outcome: 'Not quite — Students think the Northern Renaissance began *after* the Italian Renaissance ended (c.', reveals: 'the-northern-renaissance-began-after' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_011', title: 'Women and the Family in Renaissance Society',
          caseStudy: { intro: 'Imagine you are visiting the Uffizi Gallery in Florence and see Bronzino\'s portrait of Eleonora di Toledo with her son Giovanni — notice how the painting.',
            decisions: [{ prompt: 'In which Italian city-state did the 1427 *catasto* (tax census) reveal that dowry amounts had risen so sharply that families with multiple.', options: [
                { text: 'Correct answer: Florence', outcome: 'Correct answer: Florence. The 1427 Florentine catasto shows dowries averaging 1,000–1,500 florins.' },
                { text: 'liberated', outcome: 'Not quite — Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este.', reveals: 'the-renaissance-liberated-women-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class makes a \'Why Florence?\' exhibit on the Renaissance. A teammate\'s caption reads: \'Italians dug up Roman ruins, remembered their glorious past, and humanism taught them to reject religion for secular values.\'',
            decisions: [{ prompt: 'What should the caption say instead?', options: [
                { text: 'Explain the real inputs: urban wealth from Mediterranean trade and competitive merchant patronage funded the art; the key texts were Greek — Aristotle, Plato, Homer — arriving via Byzantine scholars and Arabic translations (Averroes, Avicenna), not dug from the Forum. And humanism wasn\'t anti-religious: Petrarch, Erasmus and More were devout Christians seeking ad fontes reform — uniting rhetoric with wisdom, not faith with doubt.', outcome: 'The exhibit now shows cause, not myth: capitalism plus recovered manuscripts produced the rebirth — and humanism deepened Christianity rather than abandoning it.' },
                { text: 'Keep the ruins story — Roman soil under their feet is what inspired the revival.', outcome: 'Ruins inspired architecture, but the intellectual content arrived in manuscripts preserved in Constantinople and Baghdad — the revival came through trade networks, not excavation.', reveals: 'renaissance-came-from-ruins' },
                { text: 'Keep \'secular humanism\' — studying humans instead of God is anti-religious by definition.', outcome: 'Renaissance humanism ≠ modern secular humanism: most humanists were devout, using classical sources to reform and enrich Christianity.', reveals: 'humanism-was-anti-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'The Renaissance ran on trade profits and merchant patronage — art was what finance bought when it looked in a mirror.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_007', difficulty: 'standard',
          question: 'The Catholic Counter-Reformation (1545–1563) was the Catholic Church\'s.',
          hint: 'Revisit c11_hist_cbse_07_006: focus on the distinction between Lutheran and Reformed.',
          misconception: 'Students often think the Counter-Reformation was only a reaction to Luther — a defensive "Catholic Reformation" — and.',
          parts: [
                { id: 'a', prompt: 'In which year did the Council of Trent open its first session, and which Pope convened it?', answer: 'The Council of Trent opened on 13 December 1545 under Pope Paul III',
                  options: ['The Council of Trent opened on 13 December 1545 under Pope Paul III', 'Catholic Reformation'],
                  hint: 'Revisit c11_hist_cbse_07_006: focus on the distinction between Lutheran and Reformed theology.',
                  misconception: 'Students often think the Counter-Reformation was only a reaction to Luther — a defensive "Catholic Reformation" — and miss that internal.' }
          ],
            remediations: { 'the-counter-reformation-was-only': { steps: ['If the student confuses pre- and post-Luther reform, have them create a two-column table: "Pre-1517 Reform Efforts".', '"Post-1517 Tridentine Reforms".', 'If they conflate inquisitions, use a map: mark Spanish tribunals (Seville, Toledo) vs.', 'Roman Congregation\'s reach (Italy, Poland, Germany) and note different legal procedures.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_008', difficulty: 'standard',
          question: 'The Scientific Revolution (c. 1543–1687) was a transformative period.',
          hint: 'Revisit the Ptolemaic system (epicycles, deferents, equants) and Aristotle\'s four causes.',
          misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Scientific Revolution (c',
                  options: ['The Scientific Revolution (c', 'The Italian Renaissance (c', 'Humanism was an intellectual movement of the Renaissance (14th–16th centuries) that', 'The Revival of Classical Learning refers to the systematic recovery, translation, and'],
                  hint: 'Revisit the Ptolemaic system (epicycles, deferents, equants) and Aristotle\'s four causes.',
                  misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing the telescope.' }
          ],
            remediations: { 'galileo-proved-the-earth-moves': { steps: ['Have the student read Galileo\'s actual inclined plane description in *Two New Sciences* (Day 1) — note he measures.', 'Compare Lippershey\'s 1608 patent application with Galileo\'s 1609 improvements (magnification from 3x to 30x).', 'Plot the stellar parallax problem on a diagram — show why even Tycho\'s precise naked-eye observations (±1 arcminute).', 'Ask: "What *would* have constituted proof in 1632?" This rebuilds the epistemic standards of the period.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Scientific Revolution was primarily a conflict between science and religion." Use the cases of Copernicus, Galileo, and Newton.', answer: 'The claim is an oversimplification',
                  options: ['The claim is an oversimplification', 'conflict thesis', 'proved'],
                  hint: 'Revisit the Ptolemaic system (epicycles, deferents, equants) and Aristotle\'s four causes.',
                  misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing the telescope.' }
          ],
            remediations: { 'galileo-proved-the-earth-moves': { steps: ['Have the student read Galileo\'s actual inclined plane description in *Two New Sciences* (Day 1) — note he measures.', 'Compare Lippershey\'s 1608 patent application with Galileo\'s 1609 improvements (magnification from 3x to 30x).', 'Plot the stellar parallax problem on a diagram — show why even Tycho\'s precise naked-eye observations (±1 arcminute).', 'Ask: "What *would* have constituted proof in 1632?" This rebuilds the epistemic standards of the period.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_009', difficulty: 'standard',
          question: 'Renaissance Architecture (c. 1400–1600 CE) refers to the revival and creative.',
          hint: 'Revisit node 002 "Humanism" and node 003 "Revival of Classical Learning"—focus on *how*.',
          misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.',
          parts: [
                { id: 'a', prompt: 'In what year and location was Vitruvius\'s *De Architectura* rediscovered, and who found it?', answer: 'Correct: 1414, Abbey of St',
                  options: ['Correct: 1414, Abbey of St', '1450s, Rome, Alberti'],
                  hint: 'Revisit node 002 "Humanism" and node 003 "Revival of Classical Learning"—focus on *how* Poggio.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' },
                { id: 'b', prompt: 'Why did Renaissance architects treat Vitruvius as an authority rather than just an ancient curiosity?', answer: 'Correct: Vitruvius provided the *only* systematic theoretical framework linking',
                  options: ['Correct: Vitruvius provided the *only* systematic theoretical framework linking', 'they liked Roman buildings'],
                  hint: 'Revisit node 002 "Humanism" and node 003 "Revival of Classical Learning"—focus on *how* Poggio.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' },
                { id: 'c', prompt: 'Brunelleschi\'s dome for Florence Cathedral (1420–36) uses a double-shell structure with herringbone brickwork.', answer: 'Correct: *Firmitas* (structural stability)',
                  options: ['Correct: *Firmitas* (structural stability)', 'Venustas because it looks beautiful'],
                  hint: 'Revisit node 002 "Humanism" and node 003 "Revival of Classical Learning"—focus on *how* Poggio.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' }
          ],
            remediations: { 'students-conflate-vitruvius-the-1st': { steps: ['Read Vitruvius Book III, Chapters 1–2 (translation) on the *homo ad circulum/quadratum*.', 'Compare Leonardo\'s annotations on his drawing with Vitruvius\'s text—identical fractions (1/10, 1/8, 1/6, 1/4).', 'Trace the same proportions in Alberti\'s *De Re Aedificatoria* (Book VI) and Palladio\'s *Quattro Libri* (Book I).', 'Write a 3-sentence correction: "Vitruvius codified the anthropometric module; Leonardo illustrated it; Renaissance.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_010', difficulty: 'standard',
          question: 'The spread of Renaissance ideas to Northern Europe (c. 1450–1600) refers to the.',
          hint: 'Revisit node 005 (Print Culture) and node 002 (Humanism) – specifically the shift from.',
          misconception: 'Students think the Northern Renaissance began *after* the Italian Renaissance ended (c. 1527 Sack of Rome).',
          parts: [
                { id: 'a', prompt: 'What invention, perfected in Mainz c. 1450, accelerated the spread of Renaissance texts to Northern Europe more than any other factor?', answer: 'The movable-type printing press perfected by Johannes Gutenberg in Mainz c',
                  options: ['The movable-type printing press perfected by Johannes Gutenberg in Mainz c', 'the compass', 'universities', 'the Northern Renaissance began *after* the Italian Renaissance ended (c'],
                  hint: 'Revisit node 005 (Print Culture) and node 002 (Humanism) – specifically the shift from medieval.',
                  misconception: 'Students think the Northern Renaissance began *after* the Italian Renaissance ended (c. 1527 Sack of Rome).' }
          ],
            remediations: { 'the-northern-renaissance-began-after': { steps: ['Draw a two-column timeline (Italy / North) 1450–1550 on paper.', 'Plot 5 Italian events (e.g., 1453 Constantinople falls, 1498 Savonarola, 1504 Michelangelo\'s David, 1513 Machiavelli\'s.', 'Plot 5 Northern events (1450 Gutenberg, 1494 Dürer Venice trip, 1509 Erasmus Praise of Folly, 1516 More\'s Utopia, 1522.', 'Draw arrows showing direct contacts (Dürer↔Bellini, Erasmus↔Aldus).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_011', difficulty: 'standard',
          question: 'The topic "Women and the Family in Renaissance Society" examines the social.',
          hint: 'If stuck, revisit c11_hist_cbse_07_002 (Humanism) and identify every passage where the.',
          misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra.',
          parts: [
                { id: 'a', prompt: 'In which Italian city-state did the 1427 *catasto* (tax census) reveal that dowry amounts had risen so sharply that families with multiple daughters faced.', answer: 'Correct answer: Florence',
                  options: ['Correct answer: Florence', 'liberated'],
                  hint: 'If stuck, revisit c11_hist_cbse_07_002 (Humanism) and identify every passage where the "ideal.',
                  misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra Fedele) gained fame.' },
                { id: 'b', prompt: 'Why did humanist educators like Vittorino da Feltre and Juan Luis Vives advocate Latin education for noble girls but explicitly forbid them from studying.', answer: 'Correct answer: Humanists viewed female education as ornamental',
                  options: ['Correct answer: Humanists viewed female education as ornamental', 'women were considered intellectually inferior', 'liberated'],
                  hint: 'If stuck, revisit c11_hist_cbse_07_002 (Humanism) and identify every passage where the "ideal.',
                  misconception: 'Students believe the Renaissance "liberated" women because a few elite women (Isabella d\'Este, Laura Cereta, Cassandra Fedele) gained fame.' }
          ],
            remediations: { 'the-renaissance-liberated-women-because': { steps: ['Have the student read two primary sources side-by-side — Cereta\'s *Letter to Bibolo Semproni* (1488) defending her.', 'Ask: "Who had more freedom — the humanist writing letters in her *studiolo*, or the artisan\'s wife buying wool.', 'Map the *geography of constraint*: mark on a Florence map the convent walls, the *serraglio* (prostitute zone), the.', 'Re-read Alberti\'s *Della Famiglia* Book 3: highlight every verb commanding the wife ("she must," "she shall") — count.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
