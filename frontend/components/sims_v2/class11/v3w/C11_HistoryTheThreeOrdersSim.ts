import type { SimDef } from '../../engine/types';
import C11_HistoryTheThreeOrdersSim from '../../../simulations/c6_12/C11_HistoryTheThreeOrdersSim';

/** v3 wrapped master — C11_HistoryTheThreeOrdersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historythethreeorderssim: SimDef = {
    id: 'v3w_c11_historythethreeorderssim',
    title: 'Feudal Society: The Three Orders of Medieval Europe',
    subtitle: 'This node covers the conceptual framework of the Three Orders (origins, ideology, and.',
    classLevel: 11, subject: 'history', topic: 'Feudal Society: The Three Orders of Medieval Europe',
    chapters: [],
    nodeIds: ['c11_hist_cbse_06_001', 'c11_hist_cbse_06_002', 'c11_hist_cbse_06_005', 'c11_hist_cbse_06_008', 'c11_hist_cbse_07_007', 'c11_hist_cbse_07_009', 'c11_hist_cbse_06_003', 'c11_hist_cbse_06_004', 'c11_hist_cbse_06_011', 'c11_hist_cbse_06_007', 'c11_hist_cbse_07_004', 'c11_hist_cbse_07_010', 'c11_hist_cbse_04_002', 'c11_hist_cbse_04_010', 'c11_hist_cbse_02_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are visiting the ruins of a medieval European cathedral — say, Chartres in France — and notice.', goal: 'Master Feudal Society: The Three Orders of Medieval Europe.' },
    discovery: {
        question: 'In which century did the "Three Orders" conceptual model (Oratores, Bellatores, Laboratores) first appear in European written sources, and which bishop is most.',
        options: ['The model appears in the early 11th century (c', '9th century', 'Charlemagne'],
        answer: 'The model appears in the early 11th century (c',
        hook: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth.',
    },
    teaching: [
        { title: 'Feudal society in medieval Europe (c..', text: 'Feudal society in medieval Europe (c. 9th–15th century) was a hierarchical social, economic, and political system structured around land tenure and reciprocal obligations, divided into three.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_06_001', title: 'Feudal society in medieval Europe (c..',
          scaffold: { problem: 'Using the Three Orders framework, explain why a 12th-century French bishop would support a king\'s campaign to suppress a peasant revolt,.',
            steps: [
            { text: 'Identify the ideological claim — Adalbero\'s model says Oratores pray for all, Bellatores protect all, Laboratores feed.' },
            { text: 'Locate the material reality — Bishops were major landlords (Oratores *as* Bellatores economically); peasant revolts.' },
            { text: 'Analyse the contradiction — The model masks class interest: the "praying" order lived off the "working" order\'s surplus.' },
            { text: 'Apply the concept of "ideological legitimation" — The bishop supports the king (Bellatores) to preserve the social.' },
            { text: 'Conclude — The Three Orders model *stabilised* hierarchy; revolts broke the reciprocal ideal, so the clergy backed.', faded: true, blankAnswer: 'The bishop supports the king because the Three Orders.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_06_002', title: 'The First Order refers to the clergy –.',
          scaffold: { problem: 'Using the three-pillar framework (spiritual, economic, political), explain how a 12th-century bishop exercised power over both the.',
            steps: [
            { text: 'Identify the spiritual pillar – the bishop controls access to sacraments (baptism, marriage, last rites) for all.' },
            { text: 'Identify the economic pillar – the bishop collects tithes from every household (peasant produce, noble demesne),.' },
            { text: 'Identify the political pillar – the bishop holds a canonical court judging marriage, inheritance, usury, and clerical.' },
            { text: 'Trace a concrete interaction – a peasant fails to pay tithe → bishop\'s official cites him to canonical court → lord.' },
            { text: 'Note the limits – the bishop is also a vassal of the king/emperor for his temporalities (regalia), owes knight-service.' },
            { text: 'Synthesize – the bishop\'s power rests on the fusion of spiritual monopoly, autonomous resource base, and legal.', faded: true, blankAnswer: 'The bishop\'s power derived from the interlocking of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_06_005', title: 'The manor was the basic economic and.',
          scaffold: { problem: 'Using the following data from a 1290 manorial account (compotus) for the manor of Broughton, reconstruct the lord’s grain income: Demesne.',
            steps: [
            { text: 'Calculate demesne gross output = 120 acres × 5 bushels/acre = 600 bushels.' },
            { text: 'Calculate total peasant holding = 40 villeins × 15 acres = 600 acres. Peasant gross output = 600 × 4 = 2400 bushels.' },
            { text: 'Champart = 1/10 × 1800 = 180 bushels.' },
            { text: 'Labour service contribution: 40 villeins × 3 days × 30 weeks = 3600 man-days.' },
            { text: 'Express as percentage of total manor net output (480 + 1800 = 2280 bushels). Lord’s share = 660/2280 ≈ 29%.', faded: true, blankAnswer: 'Lord’s grain income = 660 bushels (480 from demesne + 180.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_06_008', title: 'The revival of towns and expansion of.',
          scaffold: { problem: 'Using the "commercial revolution" framework, explain why the Champagne fairs (c.',
            steps: [
            { text: 'Identify the three trade zones that needed a meeting point — Baltic/North Sea (raw materials), Mediterranean.' },
            { text: 'Map the overland routes — the Seine-Saône-Rhône corridor connected the North Sea to the Mediterranean; the Count of.' },
            { text: 'Analyse the political incentive — the Counts of Champagne were weak vassals of the French king; they needed revenue and.' },
            { text: 'Evaluate the temporal rhythm — six fairs per year, each lasting 2–3 weeks, created a continuous circuit; Italian.' },
            { text: 'Conclude — the fairs were not a natural market but a *constructed institution* solving a coordination problem between.', faded: true, blankAnswer: 'The Champagne fairs emerged because the Counts of Champagne.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_007', title: 'The Catholic Counter-Reformation.',
          scaffold: { problem: 'Explain how the Council of Trent\'s decree on the Eucharist (Session XIII, 1551) simultaneously defined doctrine and enforced discipline.',
            steps: [
            { text: 'Identify the doctrinal issue — Protestants denied transubstantiation (Luther: consubstantiation; Zwingli: memorialism;.' },
            { text: 'Locate Trent\'s response — Canon 1: "If anyone denies that in the sacrament of the most holy Eucharist are contained.' },
            { text: 'Note the disciplinary canons attached — Canon 8 mandates annual communion for laity (Easter duty); Canon 11 requires.' },
            { text: 'Connect doctrine to practice — Transubstantiation demands reverence (tabernacle, communion rail, elevation); annual.' },
            { text: 'Show enforcement mechanism — Bishops must enforce via visitations; the Roman Missal (1570) standardises the ritual.' },
            { text: 'Evaluate long-term effect — Eucharistic adoration (Forty Hours, Corpus Christi processions) becomes a hallmark of.', faded: true, blankAnswer: 'Trent defined transubstantiation as dogma (Canon 1) and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_009', title: 'Renaissance Architecture (c. 1400–1600.',
          scaffold: { problem: 'Explain how the rediscovery of Vitruvius\'s *De Architectura* transformed the design of the Florentine palazzo from a medieval fortress into.',
            steps: [
            { text: 'Identify the medieval palazzo type — thick walls, few windows, internal courtyard for defence, vertical stacking of.' },
            { text: 'Locate the Vitruvian principles Alberti applies — Book VI on private houses: *symmetria* (modular proportion),.' },
            { text: 'Analyse Palazzo Rucellai\'s façade — three superimposed classical orders (Tuscan, Ionic, Corinthian) on a grid of.' },
            { text: 'Trace the *pian nobile* shift — principal floor (second level) expressed by taller windows with pediments, aligned with.' },
            { text: 'Evaluate the *cortile* (courtyard) — loggia on three sides with *arches on columns* (Vitruvian *areostyle* spacing),.' },
            { text: 'Conclude — Alberti didn\'t copy a Roman house (none survived intact); he *synthesised* Vitruvius\'s textual rules into a.', faded: true, blankAnswer: 'Palazzo Rucellai demonstrates the shift from *fortress* to.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Feudal Society: The Three Orders of Medieval Europe', spots: [
            { id: 's1', label: 'Feudal society in medieval Europe', prompt: 'Which idea is this? — Feudal society in medieval Europe (c. 9th–15th century) was a hierarchical social,.', answer: 'Feudal society in medieval Europe', options: ['Feudal society in medieval Europe', 'The First Order refers to', 'The manor was the basic', 'The revival of towns and'] },
            { id: 's2', label: 'The First Order refers to', prompt: 'Which idea is this? — The First Order refers to the clergy – the ordained religious hierarchy of the Roman.', answer: 'The First Order refers to', options: ['The First Order refers to', 'Feudal society in medieval Europe', 'The manor was the basic', 'The revival of towns and'] },
            { id: 's3', label: 'The manor was the basic', prompt: 'Which idea is this? — The manor was the basic economic and social unit of feudal Europe (9th–15th centuries), a.', answer: 'The manor was the basic', options: ['The manor was the basic', 'Feudal society in medieval Europe', 'The First Order refers to', 'The revival of towns and'] },
            { id: 's4', label: 'The revival of towns and', prompt: 'Which idea is this? — The revival of towns and expansion of trade in medieval Europe (c.', answer: 'The revival of towns and', options: ['The revival of towns and', 'Feudal society in medieval Europe', 'The First Order refers to', 'The manor was the basic'] },
            { id: 's5', label: 'The Catholic Counter-Reformation 15451563 was', prompt: 'Which idea is this? — The Catholic Counter-Reformation (1545–1563) was the Catholic Church\'s systematic.', answer: 'The Catholic Counter-Reformation 15451563 was', options: ['The Catholic Counter-Reformation 15451563 was', 'Feudal society in medieval Europe', 'The First Order refers to', 'The manor was the basic'] },
            { id: 's6', label: 'Renaissance Architecture c 14001600 CE', prompt: 'Which idea is this? — Renaissance Architecture (c. 1400–1600 CE) refers to the revival and creative adaptation.', answer: 'Renaissance Architecture c 14001600 CE', options: ['Renaissance Architecture c 14001600 CE', 'Feudal society in medieval Europe', 'The First Order refers to', 'The manor was the basic'] }
          ] } }
    ],
    explore: { component: C11_HistoryTheThreeOrdersSim, prompt: 'Explore the interactive — Feudal Society: The Three Orders of Medieval Europe' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_001', difficulty: 'standard',
          question: 'Feudal society in medieval Europe (c. 9th–15th century) was a hierarchical.',
          hint: 'Revisit the Treaty of Verdun (843) and the "feudal revolution" debate (c.',
          misconception: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth.',
          parts: [
                { id: 'a', prompt: 'In which century did the "Three Orders" conceptual model (Oratores, Bellatores, Laboratores) first appear in European written sources, and which bishop is most.', answer: 'The model appears in the early 11th century (c',
                  options: ['The model appears in the early 11th century (c', '9th century', 'Charlemagne'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth permanently fixed one\'s.' },
                { id: 'b', prompt: 'Why did the Three Orders model place the clergy (Oratores) at the top of the social hierarchy, above the nobility (Bellatores), even though kings and nobles.', answer: 'The clergy claimed primacy',
                  options: ['The clergy claimed primacy', 'wealth', 'land ownership'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth permanently fixed one\'s.' }
          ],
            remediations: { 'the-three-orders-was-a': { steps: ['If the student conflates the Three Orders with a rigid caste system: (1) Have them read Adalbero\'s poem (translated).', '(3) Ask: "If orders were fixed by birth, why did the Church run schools for peasant boys?" This breaks the.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_002', difficulty: 'standard',
          question: 'The First Order refers to the clergy – the ordained religious hierarchy of the.',
          hint: 'Revisit c11_hist_cbse_06_001 – specifically the section defining the Three Orders and the.',
          misconception: 'Students often believe the medieval Church was a unified, all-powerful monolith with the Pope commanding absolute.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The First Order refers to the clergy – the ordained religious hierarchy of the Roman',
                  options: ['The First Order refers to the clergy – the ordained religious hierarchy of the Roman', 'Feudal society in medieval Europe (c', 'The manor was the basic economic and social unit of feudal Europe (9th–15th centuries), a', 'The revival of towns and expansion of trade in medieval Europe (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the medieval Church was a unified, all-powerful monolith with the Pope commanding absolute obedience from all clergy.' }
          ],
            remediations: { 'the-medieval-church-was-a': { steps: ['If the student holds the monolithic-Church misconception: Step 1 – Read the Dictatus Papae (1075) by Gregory VII.', 'Step 2 – Compare the English Constitutions of Clarendon (1164) with the papal bull Clericis Laicos (1296) to see.', 'Step 3 – Map a 13th-century diocese: identify the bishop, the cathedral chapter (canons), the monastic houses exempt.', 'This reveals fragmented authority, not monolith.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_005', difficulty: 'standard',
          question: 'The manor was the basic economic and social unit of feudal Europe (9th–15th.',
          hint: 'If stuck, revisit the distinction between "villein" and "free tenant" in node 004 and the.',
          misconception: 'Students often conflate the *manor* (an economic estate) with the *fief* (a political grant of land in return for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The manor was the basic economic and social unit of feudal Europe (9th–15th centuries), a',
                  options: ['The manor was the basic economic and social unit of feudal Europe (9th–15th centuries), a', 'Feudal society in medieval Europe (c', 'The First Order refers to the clergy – the ordained religious hierarchy of the Roman', 'The revival of towns and expansion of trade in medieval Europe (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate the *manor* (an economic estate) with the *fief* (a political grant of land in return for military service).' }
          ],
            remediations: { 'students-often-conflate-the-manor': { steps: ['Re-read node 004 (The Third Order) to clarify the legal status of serfs vs.', 'Study a primary source: a 13th-century English manorial court roll (e.g., Elton or Ramsey) to see actual entries for.', 'Draw a comparative table: Manor vs.', 'Watch a 10-minute documentary segment on the open-field system (e.g., BBC "The Medieval Mind") to visualise strip.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_008', difficulty: 'standard',
          question: 'The revival of towns and expansion of trade in medieval Europe (c.',
          hint: 'If stuck, re-watch the 8-minute animation "The Medieval Agricultural Revolution" (BBC.',
          misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.',
          parts: [
                { id: 'a', prompt: 'Why did the phrase "Stadtluft macht frei" (city air makes you free) become a legal reality in medieval Europe, and what specific feudal obligation did it.', answer: 'The phrase became legal reality',
                  options: ['The phrase became legal reality', 'kings freed serfs to weaken nobles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.' },
                { id: 'b', prompt: 'Compare the role of the Church in fostering trade in medieval Europe with the role of temple institutions in early medieval India (c. 8th–12th century).', answer: 'Similarities: (1) Both provided safe deposit and credit',
                  options: ['Similarities: (1) Both provided safe deposit and credit', 'both developed banking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.' }
          ],
            remediations: { 'the-crusades-1095-onward-caused': { steps: ['Revisit c11_hist_cbse_06_005 (The Manor and the Feudal Economy) — confirm the student can explain how the heavy plough.', 'Use a map exercise — plot the Hanseatic League (Baltic), Champagne fairs (France), and Venetian/Genoese routes.', 'Compare two charter extracts — one from a French royal town (e.g., Lorris, 1155) granting "year and a day" freedom, one.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.',
          parts: [
                { id: 'a', prompt: 'Compare the role of the Church in fostering trade in medieval Europe with the role of temple institutions in early medieval India (c. 8th–12th century).', answer: 'Similarities: (1) Both provided safe deposit and credit',
                  options: ['Similarities: (1) Both provided safe deposit and credit', 'both developed banking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Crusades (1095 onward) *caused* the revival of European trade by opening Eastern markets.' }
          ],
            remediations: { 'the-crusades-1095-onward-caused': { steps: ['Revisit c11_hist_cbse_06_005 (The Manor and the Feudal Economy) — confirm the student can explain how the heavy plough.', 'Use a map exercise — plot the Hanseatic League (Baltic), Champagne fairs (France), and Venetian/Genoese routes.', 'Compare two charter extracts — one from a French royal town (e.g., Lorris, 1155) granting "year and a day" freedom, one.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_007', difficulty: 'standard',
          question: 'The Catholic Counter-Reformation (1545–1563) was the Catholic Church\'s.',
          hint: 'Revisit c11_hist_cbse_07_006: focus on the distinction between Lutheran and Reformed.',
          misconception: 'Students often think the Counter-Reformation was only a reaction to Luther — a defensive "Catholic Reformation" — and.',
          parts: [
                { id: 'a', prompt: 'In which year did the Council of Trent open its first session, and which Pope convened it?', answer: 'The Council of Trent opened on 13 December 1545 under Pope Paul III',
                  options: ['The Council of Trent opened on 13 December 1545 under Pope Paul III', 'Catholic Reformation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Counter-Reformation was only a reaction to Luther — a defensive "Catholic Reformation" — and miss that internal.' }
          ],
            remediations: { 'the-counter-reformation-was-only': { steps: ['If the student confuses pre- and post-Luther reform, have them create a two-column table: "Pre-1517 Reform Efforts".', '"Post-1517 Tridentine Reforms".', 'If they conflate inquisitions, use a map: mark Spanish tribunals (Seville, Toledo) vs.', 'Roman Congregation\'s reach (Italy, Poland, Germany) and note different legal procedures.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_009', difficulty: 'standard',
          question: 'Renaissance Architecture (c. 1400–1600 CE) refers to the revival and creative.',
          hint: 'Revisit node 002 "Humanism" and node 003 "Revival of Classical Learning"—focus on *how*.',
          misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.',
          parts: [
                { id: 'a', prompt: 'In what year and location was Vitruvius\'s *De Architectura* rediscovered, and who found it?', answer: 'Correct: 1414, Abbey of St',
                  options: ['Correct: 1414, Abbey of St', '1450s, Rome, Alberti'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' },
                { id: 'b', prompt: 'Why did Renaissance architects treat Vitruvius as an authority rather than just an ancient curiosity?', answer: 'Correct: Vitruvius provided the *only* systematic theoretical framework linking',
                  options: ['Correct: Vitruvius provided the *only* systematic theoretical framework linking', 'they liked Roman buildings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' },
                { id: 'c', prompt: 'Brunelleschi\'s dome for Florence Cathedral (1420–36) uses a double-shell structure with herringbone brickwork.', answer: 'Correct: *Firmitas* (structural stability)',
                  options: ['Correct: *Firmitas* (structural stability)', 'Venustas because it looks beautiful'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' }
          ],
            remediations: { 'students-conflate-vitruvius-the-1st': { steps: ['Read Vitruvius Book III, Chapters 1–2 (translation) on the *homo ad circulum/quadratum*.', 'Compare Leonardo\'s annotations on his drawing with Vitruvius\'s text—identical fractions (1/10, 1/8, 1/6, 1/4).', 'Trace the same proportions in Alberti\'s *De Re Aedificatoria* (Book VI) and Palladio\'s *Quattro Libri* (Book I).', 'Write a 3-sentence correction: "Vitruvius codified the anthropometric module; Leonardo illustrated it; Renaissance.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Palladio\'s *I Quattro Libri dell\'Architettura* (1570) made Vitruvius obsolete for Renaissance architects."', answer: 'Correct: False',
                  options: ['Correct: False', 'True, Palladio was better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate *Vitruvius* (the 1st-century BCE author) with *Vitruvian Man* (Leonardo\'s c.' }
          ],
            remediations: { 'students-conflate-vitruvius-the-1st': { steps: ['Read Vitruvius Book III, Chapters 1–2 (translation) on the *homo ad circulum/quadratum*.', 'Compare Leonardo\'s annotations on his drawing with Vitruvius\'s text—identical fractions (1/10, 1/8, 1/6, 1/4).', 'Trace the same proportions in Alberti\'s *De Re Aedificatoria* (Book VI) and Palladio\'s *Quattro Libri* (Book I).', 'Write a 3-sentence correction: "Vitruvius codified the anthropometric module; Leonardo illustrated it; Renaissance.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
