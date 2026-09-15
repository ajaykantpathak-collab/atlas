import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch06_p2: SimDef = {
    id: 'v3_c11_hist_ch06_p2',
    title: 'The Three Orders · Part 2/2',
    subtitle: 'See a tidy medieval schema collide with the messy society it described.',
    classLevel: 11, subject: 'history', topic: 'The Three Orders · Part 2/2',
    chapters: ['c11_hist_ch06'],
    nodeIds: ['c11_hist_cbse_06_007', 'c11_hist_cbse_06_008', 'c11_hist_cbse_06_009', 'c11_hist_cbse_06_010', 'c11_hist_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a canon lawyer auditing who the schema forgot', intro: 'A cathedral dominates the town — but inside the neat triad of oratores, bellatores and laboratores, the merchants building that town don\'t exist.', goal: 'Evaluate the three-orders model against feudal society\'s actual divisions and the Church\'s real power.' },
    discovery: {
        question: 'Those who pray, those who fight, those who work — was Europe\'s three-order society a caste system like varna, fixed by birth and law?',
        options: ['No — it was an ideological model pushed by bishops: functional, porous, and blind to merchants, Jews and unfree knights who didn\'t fit', 'Yes — birth legally locked every order', 'Yes — both systems are identical', 'No — because Europe had no hierarchy at all'],
        answer: 'No — it was an ideological model pushed by bishops: functional, porous, and blind to merchants, Jews and unfree knights who didn\'t fit',
        hook: 'The model appears in sermons to kings, not in manor records — a society \'imagined by bishops\' while real towns full of merchants grew outside the schema.',
    },
    teaching: [
        { title: 'The Role of the Church: Monasteries, Bishops and the Papacy', text: 'The medieval Catholic Church (c. 500–1500 CE) functioned as a transnational institutional hierarchy headed by the Pope in Rome, comprising the secular clergy (bishops, parish priests) and regular.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test the three orders against real people — a merchant\'s son, a serf, a friar — then map how the Church became landowner, court and rival of kings.',
        labels: ['The Role of', 'Towns and the Growth', 'The Guild System: Craft', 'Cathedral Construction and', 'The Crisis of Feudalism'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_007', title: 'The Role of the Church: Monasteries, Bishops and the Papacy',
          caseStudy: { intro: 'Imagine you visit a medieval cathedral like Chartres or a monastery like Cluny — the sheer scale of stone, the precision of the architecture, the wealth.',
            decisions: [{ prompt: 'In which year did Pope Gregory VII issue the Dictatus Papae asserting papal authority to depose emperors, and what specific feudal practice.', options: [
                { text: '1075 CE; it challenged lay investiture', outcome: '1075 CE; it challenged lay investiture — the practice where secular rulers (kings, dukes) appointed.' },
                { text: '1054 or 1215, or citing clerical marriage', outcome: 'Not quite — Students often think the medieval Church was a monolithic, unchanging institution where the Pope.', reveals: 'the-medieval-church-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_008', title: 'Towns and the Growth of Trade in Medieval Europe',
          caseStudy: { intro: 'Imagine walking through the bustling lanes of medieval Hampi or the port of Surat in the 15th century — merchants weighing spices, scribes recording debts.',
            decisions: [{ prompt: 'In which century did the sustained revival of European towns and long-distance trade begin, and what was the primary agricultural.', options: [
                { text: 'The sustained revival began in the 11th century, driven primarily by the adoption of the', outcome: 'The sustained revival began in the 11th century, driven primarily by the adoption of the heavy.' },
                { text: '12th century due to the Crusades', outcome: 'Not quite — Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening.', reveals: 'the-crusades-1095-onward-caused' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_009', title: 'The Guild System: Craft and Merchant Associations',
          caseStudy: { intro: 'Imagine you visit a medieval Indian bazaar — say, the jewellers\' lane in Jaipur or the weavers\' quarter in Varanasi — where every shop follows the same.',
            decisions: [{ prompt: 'Name the three hierarchical ranks within a craft guild and state the typical duration (in years) an apprentice served before becoming.', options: [
                { text: 'The three ranks are Master, Journeyman, and Apprentice', outcome: 'The three ranks are Master, Journeyman, and Apprentice. Apprenticeship typically lasted 7 years.' },
                { text: '2 years', outcome: 'Not quite — Students often think guilds were "early trade unions" protecting workers.', reveals: 'guilds-were-early-trade-unions' },
                { text: 'Master–Apprentice–Worker', outcome: 'Not quite — Students often think guilds were "early trade unions" protecting workers.', reveals: 'guilds-were-early-trade-unions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_011', title: 'The Crisis of Feudalism: Plague, Famine and Revolt',
          caseStudy: { intro: 'Imagine you visit a medieval village fair in India and notice how a sudden disease outbreak among agricultural workers would disrupt the entire local.',
            decisions: [{ prompt: 'In which year did the Black Death first reach Europe via Mediterranean trade ports, and what was the estimated mortality range in the first.', options: [
                { text: 'The Black Death reached Europe in 1347 (via Genoese ships at Messina/Caffa) and killed an', outcome: 'The Black Death reached Europe in 1347 (via Genoese ships at Messina/Caffa) and killed an estimated.' },
                { text: '10–20%', outcome: 'Not quite — Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants.', reveals: 'the-black-death-alone-ended' },
                { text: 'labour shortage gave peasants freedom', outcome: 'Not quite — Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants.', reveals: 'the-black-death-alone-ended' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a comparative-societies debate, a student equates medieval Europe\'s Three Orders with the varna system: \'Oratores, Bellatores, Laboratores — birth fixed you forever, like caste. And the Church was a monolith where the Pope\'s word was law for everyone.\'',
            decisions: [{ prompt: 'How accurate is the comparison?', options: [
                { text: 'Qualify it: the Three Orders was a prescriptive ideology promoted by bishops — functional (pray/fight/work) and porous: a merchant\'s son could become a clerk, a peasant could buy freedom, younger nobles entered the Church; the legal lines were free/unfree and noble/non-noble. And the Church was no monolith — papal centralisation fought episcopal autonomy, secular clergy fought friars, kings taxed clergy against canon law.', outcome: 'The comparison survives with precision: an idealised hierarchy legitimising order — closer to a sermon than a statute, and a Church full of internal contest.' },
                { text: 'Keep the caste equivalence — three fixed estates, birth-decided, is the same structure.', outcome: 'The model was ideological and leaky: movement between orders happened routinely; treating it as birth-fixed law misreads a legitimating image as a legal system.', reveals: 'three-orders-equals-caste' },
                { text: 'Keep the monolith — a single Church under one Pope means unified command.', outcome: 'Unity was claimed, not achieved: secular vs regular clergy, canon vs customary law, and kings defying prohibitions all show a contested institution.', reveals: 'church-was-monolith' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'The real legal line wasn\'t pray-fight-work but free-unfree — the tidy triad was a sermon, not a census.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_007', difficulty: 'standard',
          question: 'The medieval Catholic Church (c. 500–1500 CE) functioned as a transnational.',
          hint: 'Revisit the lord-vassal ceremony (homage, fealty, investiture) in c11_hist_cbse_06_006.',
          misconception: 'Students often think the medieval Church was a monolithic, unchanging institution where the Pope simply commanded and.',
          parts: [
                { id: 'a', prompt: 'In which year did Pope Gregory VII issue the Dictatus Papae asserting papal authority to depose emperors, and what specific feudal practice did this directly.', answer: '1075 CE; it challenged lay investiture',
                  options: ['1075 CE; it challenged lay investiture', '1054 or 1215, or citing clerical marriage'],
                  hint: 'Revisit the lord-vassal ceremony (homage, fealty, investiture) in c11_hist_cbse_06_006 and the.',
                  misconception: 'Students often think the medieval Church was a monolithic, unchanging institution where the Pope simply commanded and everyone obeyed.' }
          ],
            remediations: { 'the-medieval-church-was-a': { steps: ['If the student sees the Church as a unified block, have them: (1) Create a conflict map with four nodes — Papacy.', '(2) Read the Dictatus Papae (1075) and the Concordat of Worms (1122) side by side to see how compromise worked.', '(3) Compare a Cluniac charter (papal protection) with a Cistercian grange account (economic management) to see.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_008', difficulty: 'standard',
          question: 'The revival of towns and expansion of trade in medieval Europe (c.',
          hint: 'If stuck, re-watch the 8-minute animation "The Medieval Agricultural Revolution" (BBC.',
          misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.',
          parts: [
                { id: 'a', prompt: 'Why did the phrase "Stadtluft macht frei" (city air makes you free) become a legal reality in medieval Europe, and what specific feudal obligation did.', answer: 'The phrase became legal reality',
                  options: ['The phrase became legal reality', 'kings freed serfs to weaken nobles'],
                  hint: 'If stuck, re-watch the 8-minute animation "The Medieval Agricultural Revolution" (BBC Bitesize) and.',
                  misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.' },
                { id: 'b', prompt: 'Compare the role of the Church in fostering trade in medieval Europe with the role of temple institutions in early medieval India (c. 8th–12th century).', answer: 'Similarities: (1) Both provided safe deposit and credit',
                  options: ['Similarities: (1) Both provided safe deposit and credit', 'both developed banking'],
                  hint: 'If stuck, re-watch the 8-minute animation "The Medieval Agricultural Revolution" (BBC Bitesize) and.',
                  misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.' }
          ],
            remediations: { 'the-crusades-1095-onward-caused': { steps: ['Revisit c11_hist_cbse_06_005 (The Manor and the Feudal Economy) — confirm the student can explain how the heavy plough.', 'Use a map exercise — plot the Hanseatic League (Baltic), Champagne fairs (France), and Venetian/Genoese routes.', 'Compare two charter extracts — one from a French royal town (e.g., Lorris, 1155) granting "year and a day" freedom, one.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_009', difficulty: 'standard',
          question: 'The guild system in medieval Europe (11th–16th centuries) was a network.',
          hint: 'Review node c11_hist_cbse_06_008 (Towns and Trade) — specifically the "commune movement".',
          misconception: 'Students often think guilds were "early trade unions" protecting workers.',
          parts: [
                { id: 'a', prompt: 'Name the three hierarchical ranks within a craft guild and state the typical duration (in years) an apprentice served before becoming a journeyman.', answer: 'The three ranks are Master, Journeyman, and Apprentice',
                  options: ['The three ranks are Master, Journeyman, and Apprentice', '2 years', 'Master–Apprentice–Worker', 'early trade unions'],
                  hint: 'Review node c11_hist_cbse_06_008 (Towns and Trade) — specifically the "commune movement" and how.',
                  misconception: 'Students often think guilds were "early trade unions" protecting workers.' },
                { id: 'b', prompt: 'A 13th-century Flemish cloth merchant wants to bypass the local drapers\' craft guild by distributing raw wool directly to rural spinners.', answer: 'He violates the craft guild\'s *monopoly on production stages*',
                  options: ['He violates the craft guild\'s *monopoly on production stages*', 'free trade', 'capitalism', 'early trade unions'],
                  hint: 'Review node c11_hist_cbse_06_008 (Towns and Trade) — specifically the "commune movement" and how.',
                  misconception: 'Students often think guilds were "early trade unions" protecting workers.' }
          ],
            remediations: { 'guilds-were-early-trade-unions': { steps: ['Re-read the guild oath from a 13th-century London cordwainers\' ordinance (source: *English Gilds*, Toulmin Smith).', 'Compare with a 19th-century trade union rulebook — identify who holds voting power.', 'Map the guild hierarchy (Master → Journeyman → Apprentice) onto a modern firm (Owner → Manager → Intern) to see that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think guilds were "early trade unions" protecting workers.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The guild system\'s decline after 1500 was primarily caused by the rise of nation-states granting monopoly charters to joint-stock.', answer: 'The claim is *partially correct but incomplete*',
                  options: ['The claim is *partially correct but incomplete*', 'early trade unions', 'guilds were "early trade unions" protecting workers'],
                  hint: 'Review node c11_hist_cbse_06_008 (Towns and Trade) — specifically the "commune movement" and how.',
                  misconception: 'Students often think guilds were "early trade unions" protecting workers.' }
          ],
            remediations: { 'guilds-were-early-trade-unions': { steps: ['Re-read the guild oath from a 13th-century London cordwainers\' ordinance (source: *English Gilds*, Toulmin Smith).', 'Compare with a 19th-century trade union rulebook — identify who holds voting power.', 'Map the guild hierarchy (Master → Journeyman → Apprentice) onto a modern firm (Owner → Manager → Intern) to see that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_010', difficulty: 'standard',
          question: 'Cathedral construction in medieval Europe (12th–16th centuries) refers to the.',
          hint: 'If stuck, review the manor economy (c11_hist_cbse_06_005) and the guild system.',
          misconception: 'Students often think Gothic cathedrals were built quickly, within a few years, by a single generation of workers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cathedral construction in medieval Europe (12th–16th centuries) refers to the large-scale',
                  options: ['Cathedral construction in medieval Europe (12th–16th centuries) refers to the large-scale', 'Feudal society in medieval Europe (c', 'The First Order refers to the clergy – the ordained religious hierarchy of the Roman', 'The Second Order refers to the nobility—the warrior elite of medieval European feudal'],
                  hint: 'If stuck, review the manor economy (c11_hist_cbse_06_005) and the guild system.',
                  misconception: 'Students often think Gothic cathedrals were built quickly, within a few years, by a single generation of workers.' }
          ],
            remediations: { 'gothic-cathedrals-were-built-quickly': { steps: ['If a student holds this misconception, have them compare the building accounts of Chartres Cathedral (main phase.', 'Use a simple Gantt-style chart on paper: list phases (foundation, nave, transept, towers, spires) with dates.', 'Then ask them to calculate the span.', 'Next, show how the master mason\'s role changed over time (e.g., Villard de Honnecourt\'s sketchbook).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_011', difficulty: 'standard',
          question: 'The Crisis of Feudalism (c. 1300–1450) refers to the systemic breakdown of the.',
          hint: 'Revisit the "Manor and Feudal Economy" node (c11_hist_cbse_06_005) — focus on the.',
          misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the.',
          parts: [
                { id: 'a', prompt: 'Why did the English Statute of Labourers (1351) and the French Ordinance of Labourers (1351) fail to freeze wages at pre-plague levels despite severe penalties?', answer: 'The statutes failed',
                  options: ['The statutes failed', 'peasant laziness', 'weak kings', 'labour shortage gave peasants freedom'],
                  hint: 'Revisit the "Manor and Feudal Economy" node (c11_hist_cbse_06_005) — focus on the labour-service.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle.' },
                { id: 'b', prompt: 'A manor record from 1360 shows a villein paying 12 pence/acre commutation rent instead of performing week-work.', answer: 'Commutation shows lords converting labour dues to money rents',
                  options: ['Commutation shows lords converting labour dues to money rents', 'generosity', 'decline of feudalism', 'labour shortage gave peasants freedom'],
                  hint: 'Revisit the "Manor and Feudal Economy" node (c11_hist_cbse_06_005) — focus on the labour-service.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle.' },
                { id: 'c', prompt: 'Compare the Jacquerie (France, 1358) and the English Peasants\' Revolt (1381) on three dimensions: (a) immediate trigger, (b) social composition, (c) outcome.', answer: 'immediate trigger, (',
                  options: ['immediate trigger, (', 'both failed', 'labour shortage gave peasants freedom', 'the Black Death *alone* ended serfdom'],
                  hint: 'Revisit the "Manor and Feudal Economy" node (c11_hist_cbse_06_005) — focus on the labour-service.',
                  misconception: 'Students believe the Black Death *alone* ended serfdom because "labour shortage gave peasants freedom." They miss the 50-year struggle.' }
          ],
            remediations: { 'the-black-death-alone-ended': { steps: ['Re-read the manorial court roll excerpt (c11_hist_cbse_06_005) showing a 1360 commutation entry—identify who initiates.', 'Plot wage data (carpenter/thresher) 1340–1400 on graph paper; note the lag between plague and wage rise.', 'Compare the 1351 Statute of Labourers text with the 1381 rebel demands—circle every clause about "fleeing servants" and.', 'Write a 100-word answer: "Why did lords prefer commutation over enforcing week-work?" This builds the supply-demand →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
