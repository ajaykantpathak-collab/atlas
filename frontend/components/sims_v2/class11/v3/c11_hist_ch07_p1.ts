import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch07_p1: SimDef = {
    id: 'v3_c11_hist_ch07_p1',
    title: 'Changing Cultural Traditions · Part 1/2',
    subtitle: 'Time the rebirth correctly — it started before the city fell.',
    classLevel: 11, subject: 'history', topic: 'Changing Cultural Traditions · Part 1/2',
    chapters: ['c11_hist_ch07'],
    nodeIds: ['c11_hist_cbse_07_001', 'c11_hist_cbse_07_002', 'c11_hist_cbse_07_003', 'c11_hist_cbse_07_004', 'c11_hist_cbse_07_005', 'c11_hist_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a scholar tracing how Greek manuscripts reached Florence', intro: 'Statues commissioned by merchant-bankers crowd a Florentine square — why here, why then, and who actually paid for it?', goal: 'Explain the city-state conditions behind the Renaissance and humanism\'s relationship to Christianity.' },
    discovery: {
        question: 'Constantinople fell in 1453, Greek scholars fled west — and that\'s what caused the Renaissance?',
        options: ['No — the Renaissance was decades underway by 1400; scholars had been arriving since the 1390s and 1453 only accelerated it', 'Yes — one event started the whole movement', 'Yes — Italy had no Greek texts before 1453', 'No — the Renaissance actually caused the fall'],
        answer: 'No — the Renaissance was decades underway by 1400; scholars had been arriving since the 1390s and 1453 only accelerated it',
        hook: 'And the humanists weren\'t secular rebels — Petrarch and Erasmus were devout Christians mining classical sources to deepen faith, not escape it.',
    },
    teaching: [
        { title: 'The Italian Renaissance: Origins in the City-States', text: 'The Italian Renaissance (c. 1300–1550 CE) was a cultural and intellectual rebirth originating in the independent city-states of northern and central Italy—Florence, Venice, Milan, and Rome—where.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the Medici\'s banker-capitalism from feudal lordship, then weigh the printing press against manuscript networks in humanism\'s spread.',
        labels: ['The Italian Renaissance: Origins', 'Humanism: The New Focus', 'The Revival of Classical', 'Renaissance Art: Realism, Perspective', 'Print Culture: Gutenberg', 'The Protestant Reformation: Martin'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_001', title: 'The Italian Renaissance: Origins in the City-States',
          caseStudy: { intro: 'Imagine you are standing in the Piazza della Signoria in Florence today, surrounded by statues that were once commissioned by merchant-bankers who ruled the.',
            decisions: [{ prompt: 'Which Italian city-state is correctly paired with its primary source of wealth that funded Renaissance patronage?', options: [
                { text: 'Florence – wool textiles and banking (especially the florin)', outcome: 'Florence – wool textiles and banking (especially the florin); Venice – maritime trade and spice.' },
                { text: 'Rome – papal taxes', outcome: 'Not quite — Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around.', reveals: 'the-renaissance-began-because-italians' },
                { text: 'Italians rediscovered Roman ruins lying around them', outcome: 'Not quite — Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around.', reveals: 'the-renaissance-began-because-italians' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_002', title: 'Humanism: The New Focus on the Individual and Classical Antiquity',
          caseStudy: { intro: 'Imagine you visit the National Museum in Delhi and see a replica of Michelangelo\'s David — a sculpture that celebrates the perfect human form rather than.',
            decisions: [{ prompt: 'Who is considered the \'father of humanism\' and what specific action did he take to revive classical learning?', options: [
                { text: 'Petrarch (1304–1374) is called the father of humanism', outcome: 'Petrarch (1304–1374) is called the father of humanism; he actively searched for and copied lost.' },
                { text: 'Erasmus or Dante', outcome: 'Not quite — Students often think Renaissance humanism was a secular, anti-religious movement akin to modern.', reveals: 'renaissance-humanism-was-a-secular' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_003', title: 'The Revival of Classical Learning: Greek and Roman Texts',
          caseStudy: { intro: 'Imagine you find your grandmother\'s old letters written in a script no one in your family reads anymore — they contain family recipes, stories, and wisdom.',
            decisions: [{ prompt: 'What was the primary language of the Greek classical texts brought to Italy by Byzantine scholars after 1453, and why did this create.', options: [
                { text: 'The primary language was Greek', outcome: 'The primary language was Greek. The bottleneck arose because very few Western European scholars.' },
                { text: 'Arabic', outcome: 'Not quite — Students often believe classical texts were "lost" and then suddenly "found" in 1453 when.', reveals: 'classical-texts-were-lost-and' },
                { text: 'and then suddenly', outcome: 'Not quite — Students often believe classical texts were "lost" and then suddenly "found" in 1453 when.', reveals: 'classical-texts-were-lost-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_004', title: 'Renaissance Art: Realism, Perspective and the Artist as Genius',
          caseStudy: { intro: 'Imagine you are standing before the **Taj Mahal** — its perfect symmetry, the way the minarets lean slightly outward to frame the dome, the marble inlay that.',
            decisions: [{ prompt: 'Identify the Florentine architect who conducted the famous baptistery experiment (c.', options: [
                { text: '**Filippo Brunelleschi.**', outcome: '**Filippo Brunelleschi.** A wrong answer (e.g., Alberti, Masaccio, or Leonardo) reveals confusion.' },
                { text: 'Renaissance realism', outcome: 'Not quite — **Students believe "Renaissance realism" means "painting exactly what the eye sees like.', reveals: 'students-believe-renaissance-realism-means' },
                { text: 'painting exactly what the eye sees like a photograph', outcome: 'Not quite — **Students believe "Renaissance realism" means "painting exactly what the eye sees like.', reveals: 'students-believe-renaissance-realism-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_005', title: 'Print Culture: Gutenberg and the Printing Revolution',
          caseStudy: { intro: 'Imagine you are a 15th-century merchant in Venice: you need a reliable copy of Aristotle\'s *Politics* for your son\'s university studies, but manuscript copies.',
            decisions: [{ prompt: 'What was the key technical innovation that distinguished Gutenberg\'s press from earlier Chinese/Korean movable type, and in what year was.', options: [
                { text: 'Gutenberg\'s key innovation was the *combination* of movable *metal* type (cast from a', outcome: 'Gutenberg\'s key innovation was the *combination* of movable *metal* type (cast from a durable.' },
                { text: 'wooden type', outcome: 'Not quite — Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed.', reveals: 'gutenberg-invented-printing-ignoring-that' },
                { text: 'Gutenberg invented printing', outcome: 'Not quite — Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed.', reveals: 'gutenberg-invented-printing-ignoring-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_006', title: 'The Protestant Reformation: Martin Luther and the Challenge to Rome',
          caseStudy: { intro: 'Imagine you visit a historic church in Kerala built by Portuguese missionaries in the 1500s.',
            decisions: [{ prompt: 'What was the immediate trigger for Martin Luther writing the 95 Theses in 1517?', options: [
                { text: 'The immediate trigger was the sale of indulgences by Johann Tetzel in German territories', outcome: 'The immediate trigger was the sale of indulgences by Johann Tetzel in German territories to fund.' },
                { text: 'Luther wanted to translate the Bible', outcome: 'Not quite — Students often believe Martin Luther initially wanted to split from the Catholic Church and create.', reveals: 'martin-luther-initially-wanted-to' },
                { text: 'The Pope excommunicated him first', outcome: 'Not quite — Students often believe Martin Luther initially wanted to split from the Catholic Church and create.', reveals: 'martin-luther-initially-wanted-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class makes a \'Why Florence?\' exhibit on the Renaissance. A teammate\'s caption reads: \'Italians dug up Roman ruins, remembered their glorious past, and humanism taught them to reject religion for secular values.\'',
            decisions: [{ prompt: 'What should the caption say instead?', options: [
                { text: 'Explain the real inputs: urban wealth from Mediterranean trade and competitive merchant patronage funded the art; the key texts were Greek — Aristotle, Plato, Homer — arriving via Byzantine scholars and Arabic translations (Averroes, Avicenna), not dug from the Forum. And humanism wasn\'t anti-religious: Petrarch, Erasmus and More were devout Christians seeking ad fontes reform — uniting rhetoric with wisdom, not faith with doubt.', outcome: 'The exhibit now shows cause, not myth: capitalism plus recovered manuscripts produced the rebirth — and humanism deepened Christianity rather than abandoning it.' },
                { text: 'Keep the ruins story — Roman soil under their feet is what inspired the revival.', outcome: 'Ruins inspired architecture, but the intellectual content arrived in manuscripts preserved in Constantinople and Baghdad — the revival came through trade networks, not excavation.', reveals: 'renaissance-came-from-ruins' },
                { text: 'Keep \'secular humanism\' — studying humans instead of God is anti-religious by definition.', outcome: 'Renaissance humanism ≠ modern secular humanism: most humanists were devout, using classical sources to reform and enrich Christianity.', reveals: 'humanism-was-anti-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'The Renaissance ran on trade profits and merchant patronage — art was what finance bought when it looked in a mirror.',
            decisions: [{ prompt: 'What comes next? Changing Cultural Traditions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Changing Cultural Traditions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_001', difficulty: 'standard',
          question: 'The Italian Renaissance (c. 1300–1550 CE) was a cultural and intellectual.',
          hint: 'Revisit c10_hist_cbse_03_001 (Silk Routes) and c10_hist_cbse_04_002 (factory system.',
          misconception: 'Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around them." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Which Italian city-state is correctly paired with its primary source of wealth that funded Renaissance patronage?', answer: 'Florence – wool textiles and banking (especially the florin)',
                  options: ['Florence – wool textiles and banking (especially the florin)', 'Rome – papal taxes', 'Italians rediscovered Roman ruins lying around them', 'the Renaissance began'],
                  hint: 'Revisit c10_hist_cbse_03_001 (Silk Routes) and c10_hist_cbse_04_002 (factory system origins) to see.',
                  misconception: 'Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around them." In reality, the key texts were Greek.' },
                { id: 'b', prompt: 'A historian argues: "The Medici family\'s power in Florence was essentially identical to feudal lords in France—both extracted surplus from peasants to fund.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'Italians rediscovered Roman ruins lying around them', 'the Renaissance began'],
                  hint: 'Revisit c10_hist_cbse_03_001 (Silk Routes) and c10_hist_cbse_04_002 (factory system origins) to see.',
                  misconception: 'Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around them." In reality, the key texts were Greek.' }
          ],
            remediations: { 'the-renaissance-began-because-italians': { steps: ['Review the Mediterranean trade map (c10_hist_cbse_03_001) to trace how Greek manuscripts moved from Constantinople →.', 'Compare the Latin West\'s access to Aristotle (via Arabic translations in Toledo) with the Italian direct access.', 'Use the worked example on manuscript transmission to see why "ruins" is a category error—texts, not stones, carried.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around them." In reality, the.',
          parts: [
                { id: 'a', prompt: '"The fall of Constantinople in 1453 caused the Renaissance by bringing Greek scholars to Italy." Assess this statement.', answer: 'The statement reverses chronology and overstates a single event',
                  options: ['The statement reverses chronology and overstates a single event', 'start date', 'Italians rediscovered Roman ruins lying around them', 'the Renaissance began'],
                  hint: 'Revisit c10_hist_cbse_03_001 (Silk Routes) and c10_hist_cbse_04_002 (factory system origins) to see.',
                  misconception: 'Students believe the Renaissance began because "Italians rediscovered Roman ruins lying around them." In reality, the key texts were Greek.' }
          ],
            remediations: { 'the-renaissance-began-because-italians': { steps: ['Review the Mediterranean trade map (c10_hist_cbse_03_001) to trace how Greek manuscripts moved from Constantinople →.', 'Compare the Latin West\'s access to Aristotle (via Arabic translations in Toledo) with the Italian direct access.', 'Use the worked example on manuscript transmission to see why "ruins" is a category error—texts, not stones, carried.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_002', difficulty: 'standard',
          question: 'Humanism was an intellectual movement of the Renaissance (14th–16th centuries).',
          hint: 'Review c11_hist_cbse_07_001, especially the sections on Florence\'s civic culture and.',
          misconception: 'Students often think Renaissance humanism was a secular, anti-religious movement akin to modern secular humanism.',
          parts: [
                { id: 'a', prompt: 'Who is considered the \'father of humanism\' and what specific action did he take to revive classical learning?', answer: 'Petrarch (1304–1374) is called the father of humanism',
                  options: ['Petrarch (1304–1374) is called the father of humanism', 'Erasmus or Dante'],
                  hint: 'Review c11_hist_cbse_07_001, especially the sections on Florence\'s civic culture and Medici.',
                  misconception: 'Students often think Renaissance humanism was a secular, anti-religious movement akin to modern secular humanism.' },
                { id: 'b', prompt: 'Compare the goals of Italian civic humanism (e.g., Leonardo Bruni) with Northern Christian humanism (e.g., Erasmus).', answer: 'Both used Cicero and other classical authors',
                  options: ['Both used Cicero and other classical authors', 'conflates them overlooks the political vs'],
                  hint: 'Review c11_hist_cbse_07_001, especially the sections on Florence\'s civic culture and Medici.',
                  misconception: 'Students often think Renaissance humanism was a secular, anti-religious movement akin to modern secular humanism.' }
          ],
            remediations: { 'renaissance-humanism-was-a-secular': { steps: ['If the student holds this misconception, have them read a short excerpt from Erasmus\'s *Handbook of the Christian.', 'Then ask: "Does Erasmus reject Christianity or use classical tools to strengthen it?" Next, compare with a modern.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_003', difficulty: 'standard',
          question: 'The Revival of Classical Learning refers to the systematic recovery.',
          hint: 'Revisit c11_hist_cbse_07_002 (Humanism) — focus on Petrarch\'s letters where he describes.',
          misconception: 'Students often believe classical texts were "lost" and then suddenly "found" in 1453 when Constantinople fell.',
          parts: [
                { id: 'a', prompt: 'What was the primary language of the Greek classical texts brought to Italy by Byzantine scholars after 1453, and why did this create a translation bottleneck.', answer: 'The primary language was Greek',
                  options: ['The primary language was Greek', 'Arabic', 'and then suddenly'],
                  hint: 'Revisit c11_hist_cbse_07_002 (Humanism) — focus on Petrarch\'s letters where he describes hunting.',
                  misconception: 'Students often believe classical texts were "lost" and then suddenly "found" in 1453 when Constantinople fell, imagining a single dramatic.' },
                { id: 'b', prompt: 'A 15th-century Italian scholar wants to study Aristotle\'s *Poetics*.', answer: 'Most reliable: (c) Aldine edition',
                  options: ['Most reliable: (c) Aldine edition', 'and then suddenly'],
                  hint: 'Revisit c11_hist_cbse_07_002 (Humanism) — focus on Petrarch\'s letters where he describes hunting.',
                  misconception: 'Students often believe classical texts were "lost" and then suddenly "found" in 1453 when Constantinople fell, imagining a single dramatic.' },
                { id: 'c', prompt: 'Compare the role of the *Fall of Constantinople (1453)* and the *invention of the printing press (c. 1450)* in the revival of classical learning.', answer: 'The printing press had greater long-term impact on standardisation',
                  options: ['The printing press had greater long-term impact on standardisation', 'and then suddenly'],
                  hint: 'Revisit c11_hist_cbse_07_002 (Humanism) — focus on Petrarch\'s letters where he describes hunting.',
                  misconception: 'Students often believe classical texts were "lost" and then suddenly "found" in 1453 when Constantinople fell, imagining a single dramatic.' }
          ],
            remediations: { 'classical-texts-were-lost-and': { steps: ['If the student holds this misconception, have them construct a *three-column timeline*: Column A — Key Greek texts.', 'Boethius; *Physics*: 1150s Toledo; *Republic*: 1402 Bruni translation); Column C — Key translator/scholar.', 'Then ask: "Which texts were available *before* 1453?', 'Which required Greek manuscripts *after* 1390?" This visualises the staggered, multi-source recovery.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_004', difficulty: 'standard',
          question: 'Renaissance Art (c. 1300–1600 CE) refers to the radical transformation.',
          hint: 'Revisit **c11_hist_cbse_07_002 (Humanism)** — focus on Pico della Mirandola\'s *Oration.',
          misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality.',
          parts: [
                { id: 'a', prompt: 'Identify the Florentine architect who conducted the famous baptistery experiment (c.', answer: '**Filippo Brunelleschi.**',
                  options: ['**Filippo Brunelleschi.**', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Revisit **c11_hist_cbse_07_002 (Humanism)** — focus on Pico della Mirandola\'s *Oration on the.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' }
          ],
            remediations: { 'students-believe-renaissance-realism-means': { steps: ['**Show the "two-eye" problem**: Have students close one eye, hold a thumb up, then switch eyes — the thumb jumps.', 'Explain: *Perspective assumes a Cyclopean, stationary eye.* 2.', '**Compare Michelangelo\'s *David* (1504) with a 3D scan of a real man**: Measure the hand-to-body ratio.', 'Discuss why the artist *chose* distortion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_005', difficulty: 'standard',
          question: 'The Printing Revolution refers to the transformative shift in European.',
          hint: 'If stuck, revisit the "Aldus Manutius" case study (c11_hist_cbse_07_003) — how his.',
          misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and.',
          parts: [
                { id: 'a', prompt: 'Why did the printing press spread so rapidly across Europe (over 250 cities by 1500) despite high initial capital costs?', answer: 'The press spread',
                  options: ['The press spread', 'demand for books', 'Gutenberg invented printing', '"Gutenberg invented printing"'],
                  hint: 'If stuck, revisit the "Aldus Manutius" case study (c11_hist_cbse_07_003) — how his portable Greek.',
                  misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and movable *ceramic* type.' },
                { id: 'b', prompt: 'A historian argues: "The Printing Revolution caused the Protestant Reformation." Using evidence from 1517–1525, evaluate this claim by distinguishing.', answer: 'Printing was a *necessary but not sufficient* condition',
                  options: ['Printing was a *necessary but not sufficient* condition', 'Gutenberg invented printing', '"Gutenberg invented printing"'],
                  hint: 'If stuck, revisit the "Aldus Manutius" case study (c11_hist_cbse_07_003) — how his portable Greek.',
                  misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and movable *ceramic* type.' }
          ],
            remediations: { 'gutenberg-invented-printing-ignoring-that': { steps: ['Revisit Class 10 node c10_hist_cbse_05_001 (Chinese/Korean printing) to contrast technologies.', 'Use the "Incunabula Map" (ISTC data) to visualize press spread: count cities with presses in 1470 vs.', 'Analyze a primary source: the 1473 *Colophon* of Peter Schoeffer (Gutenberg\'s partner) listing costs — calculate how.', 'Compare two 16th-century title pages: a Latin academic folio vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_006', difficulty: 'standard',
          question: 'The Protestant Reformation was a 16th-century religious, political, and.',
          hint: 'Revisit the node on Print Culture (c11_hist_cbse_07_005) and Humanism.',
          misconception: 'Students often believe Martin Luther initially wanted to split from the Catholic Church and create a new denomination.',
          parts: [
                { id: 'a', prompt: 'A historian argues: "The Reformation succeeded because German princes used it to seize Church lands and assert independence from the Holy Roman Emperor." Using.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'materialist-only'],
                  hint: 'Revisit the node on Print Culture (c11_hist_cbse_07_005) and Humanism (c11_hist_cbse_07_002).',
                  misconception: 'Students often believe Martin Luther initially wanted to split from the Catholic Church and create a new denomination.' }
          ],
            remediations: { 'martin-luther-initially-wanted-to': { steps: ['Have the student read the opening paragraphs of Luther\'s 95 Theses (1517) and his "Letter to the Archbishop of Mainz".', 'Then compare with the 1520 treatise "On the Freedom of a Christian" where he rejects papal authority.', 'Ask: "At what point does Luther shift from reformer to revolutionary?" Use a two-column chart (1517 vs.', '1520) to track changes in tone, audience, and theological claims.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
