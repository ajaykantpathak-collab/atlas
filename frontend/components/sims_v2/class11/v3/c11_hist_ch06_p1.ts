import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch06_p1: SimDef = {
    id: 'v3_c11_hist_ch06_p1',
    title: 'The Three Orders · Part 1/2',
    subtitle: 'See a tidy medieval schema collide with the messy society it described.',
    classLevel: 11, subject: 'history', topic: 'The Three Orders · Part 1/2',
    chapters: ['c11_hist_ch06'],
    nodeIds: ['c11_hist_cbse_06_001', 'c11_hist_cbse_06_002', 'c11_hist_cbse_06_003', 'c11_hist_cbse_06_004', 'c11_hist_cbse_06_005', 'c11_hist_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a canon lawyer auditing who the schema forgot', intro: 'A cathedral dominates the town — but inside the neat triad of oratores, bellatores and laboratores, the merchants building that town don\'t exist.', goal: 'Evaluate the three-orders model against feudal society\'s actual divisions and the Church\'s real power.' },
    discovery: {
        question: 'Those who pray, those who fight, those who work — was Europe\'s three-order society a caste system like varna, fixed by birth and law?',
        options: ['No — it was an ideological model pushed by bishops: functional, porous, and blind to merchants, Jews and unfree knights who didn\'t fit', 'Yes — birth legally locked every order', 'Yes — both systems are identical', 'No — because Europe had no hierarchy at all'],
        answer: 'No — it was an ideological model pushed by bishops: functional, porous, and blind to merchants, Jews and unfree knights who didn\'t fit',
        hook: 'The model appears in sermons to kings, not in manor records — a society \'imagined by bishops\' while real towns full of merchants grew outside the schema.',
    },
    teaching: [
        { title: 'Feudal Society: The Three Orders of Medieval Europe', text: 'Feudal society in medieval Europe (c. 9th–15th century) was a hierarchical social, economic, and political system structured around land tenure and reciprocal obligations, divided into three.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test the three orders against real people — a merchant\'s son, a serf, a friar — then map how the Church became landowner, court and rival of kings.',
        labels: ['Feudal Society: The Three', 'The First Order', 'The Second Order', 'The Third Order', 'The Manor and', 'The Lord-Vassal Relationship: Fiefs'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_001', title: 'Feudal Society: The Three Orders of Medieval Europe',
          caseStudy: { intro: 'Imagine you are visiting the ruins of a medieval European cathedral — say, Chartres in France — and notice how the building dominates the town, just as the.',
            decisions: [{ prompt: 'In which century did the "Three Orders" conceptual model (Oratores, Bellatores, Laboratores) first appear in European written sources, and.', options: [
                { text: 'The model appears in the early 11th century (c', outcome: 'The model appears in the early 11th century (c. 1020), articulated by Bishop Adalbero of Laon in.' },
                { text: '9th century', outcome: 'Not quite — Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian.', reveals: 'the-three-orders-was-a' },
                { text: 'Charlemagne', outcome: 'Not quite — Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian.', reveals: 'the-three-orders-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_003', title: 'The Second Order: The Nobility and the Warrior Elite',
          caseStudy: { intro: 'Imagine you are visiting the Mehrangarh Fort in Jodhpur and notice how the Rathore rulers\' legitimacy rested on martial prowess, hereditary land grants.',
            decisions: [{ prompt: 'Name the ceremony that formally created the bond between a lord and a vassal in medieval Europe, and state the two key acts performed.', options: [
                { text: 'The ceremony was called *homage and fealty*', outcome: 'The ceremony was called *homage and fealty*. The vassal knelt, placed his hands between the lord\'s.' },
                { text: 'investiture', outcome: 'Not quite — Students often think "nobility" and "knighthood" are synonymous, imagining every noble was a knight.', reveals: 'nobility-and-knighthood-are-synonymous' },
                { text: 'nobility', outcome: 'Not quite — Students often think "nobility" and "knighthood" are synonymous, imagining every noble was a knight.', reveals: 'nobility-and-knighthood-are-synonymous' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_004', title: 'The Third Order: The Peasantry and Serfdom',
          caseStudy: { intro: 'Imagine a farmer in a present‑day Indian village who cultivates a small plot but must give a fixed share of the harvest to a landlord and cannot leave the.',
            decisions: [{ prompt: 'What is the fundamental legal difference between a free peasant and a serf in medieval Europe?', options: [
                { text: 'A free peasant personally owns or rents land and can leave the village after giving due', outcome: 'A free peasant personally owns or rents land and can leave the village after giving due notice;.' },
                { text: 'serfs were slaves', outcome: 'Not quite — Students often believe all medieval peasants were serfs and that serfs were legally identical.', reveals: 'all-medieval-peasants-were-serfs' },
                { text: 'all medieval peasants were serfs and that serfs were legally identical to slaves', outcome: 'Not quite — Students often believe all medieval peasants were serfs and that serfs were legally identical.', reveals: 'all-medieval-peasants-were-serfs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_005', title: 'The Manor and the Feudal Economy: Land, Labour and Obligations',
          caseStudy: { intro: 'Imagine you are visiting the ruins of a medieval village in Rajasthan and notice a central fortified house surrounded by clustered huts and open fields divided.',
            decisions: [{ prompt: 'Define the term "demesne" in the context of a medieval European manor.', options: [
                { text: 'The demesne was the portion of the manor’s arable land directly cultivated by the lord', outcome: 'The demesne was the portion of the manor’s arable land directly cultivated by the lord (using.' },
                { text: 'the whole village land', outcome: 'Not quite — Students often conflate the *manor* (an economic estate) with the *fief* (a political grant of land.', reveals: 'students-often-conflate-the-manor' },
                { text: 'the peasant’s plot', outcome: 'Not quite — Students often conflate the *manor* (an economic estate) with the *fief* (a political grant of land.', reveals: 'students-often-conflate-the-manor' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_006', title: 'The Lord-Vassal Relationship: Fiefs and Military Service',
          caseStudy: { intro: 'Imagine you\'re visiting the Mehrangarh Fort in Jodhpur and notice how the Rajput thakurs held land from the Maharaja in exchange for military service -.',
            decisions: [{ prompt: 'What were the two core ceremonies that formalised the lord-vassal bond in medieval Europe, and what did each ceremony signify?', options: [
                { text: 'The two ceremonies were **homage** (vassal kneels, places hands between lord\'s hands,', outcome: 'The two ceremonies were **homage** (vassal kneels, places hands between lord\'s hands, pledges.' },
                { text: 'signing a charter', outcome: 'Not quite — Students think the fief was "owned" by the vassal like modern property.', reveals: 'the-fief-was-owned-by' },
                { text: 'paying money', outcome: 'Not quite — Students think the fief was "owned" by the vassal like modern property.', reveals: 'the-fief-was-owned-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a comparative-societies debate, a student equates medieval Europe\'s Three Orders with the varna system: \'Oratores, Bellatores, Laboratores — birth fixed you forever, like caste. And the Church was a monolith where the Pope\'s word was law for everyone.\'',
            decisions: [{ prompt: 'How accurate is the comparison?', options: [
                { text: 'Qualify it: the Three Orders was a prescriptive ideology promoted by bishops — functional (pray/fight/work) and porous: a merchant\'s son could become a clerk, a peasant could buy freedom, younger nobles entered the Church; the legal lines were free/unfree and noble/non-noble. And the Church was no monolith — papal centralisation fought episcopal autonomy, secular clergy fought friars, kings taxed clergy against canon law.', outcome: 'The comparison survives with precision: an idealised hierarchy legitimising order — closer to a sermon than a statute, and a Church full of internal contest.' },
                { text: 'Keep the caste equivalence — three fixed estates, birth-decided, is the same structure.', outcome: 'The model was ideological and leaky: movement between orders happened routinely; treating it as birth-fixed law misreads a legitimating image as a legal system.', reveals: 'three-orders-equals-caste' },
                { text: 'Keep the monolith — a single Church under one Pope means unified command.', outcome: 'Unity was claimed, not achieved: secular vs regular clergy, canon vs customary law, and kings defying prohibitions all show a contested institution.', reveals: 'church-was-monolith' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'The real legal line wasn\'t pray-fight-work but free-unfree — the tidy triad was a sermon, not a census.',
            decisions: [{ prompt: 'What comes next? The Three Orders · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Three Orders · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_001', difficulty: 'standard',
          question: 'Feudal society in medieval Europe (c. 9th–15th century) was a hierarchical.',
          hint: 'Revisit the Treaty of Verdun (843) and the "feudal revolution" debate (c.',
          misconception: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth.',
          parts: [
                { id: 'a', prompt: 'In which century did the "Three Orders" conceptual model (Oratores, Bellatores, Laboratores) first appear in European written sources, and which bishop is most.', answer: 'The model appears in the early 11th century (c',
                  options: ['The model appears in the early 11th century (c', '9th century', 'Charlemagne'],
                  hint: 'Revisit the Treaty of Verdun (843) and the "feudal revolution" debate (c.',
                  misconception: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth permanently fixed one\'s.' },
                { id: 'b', prompt: 'Why did the Three Orders model place the clergy (Oratores) at the top of the social hierarchy, above the nobility (Bellatores), even though kings and nobles.', answer: 'The clergy claimed primacy',
                  options: ['The clergy claimed primacy', 'wealth', 'land ownership'],
                  hint: 'Revisit the Treaty of Verdun (843) and the "feudal revolution" debate (c.',
                  misconception: 'Students often believe the Three Orders was a *legal caste system* enforced by law, like Indian varna, where birth permanently fixed one\'s.' }
          ],
            remediations: { 'the-three-orders-was-a': { steps: ['If the student conflates the Three Orders with a rigid caste system: (1) Have them read Adalbero\'s poem (translated).', '(3) Ask: "If orders were fixed by birth, why did the Church run schools for peasant boys?" This breaks the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_002', difficulty: 'standard',
          question: 'The First Order refers to the clergy – the ordained religious hierarchy of the.',
          hint: 'Revisit c11_hist_cbse_06_001 – specifically the section defining the Three Orders and the.',
          misconception: 'Students often believe the medieval Church was a unified, all-powerful monolith with the Pope commanding absolute.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The First Order refers to the clergy – the ordained religious hierarchy of the Roman',
                  options: ['The First Order refers to the clergy – the ordained religious hierarchy of the Roman', 'Feudal society in medieval Europe (c', 'The Second Order refers to the nobility—the warrior elite of medieval European feudal', 'The Third Order in medieval European feudal society (9th–14th centuries) comprised the'],
                  hint: 'Revisit c11_hist_cbse_06_001 – specifically the section defining the Three Orders and the concept.',
                  misconception: 'Students often believe the medieval Church was a unified, all-powerful monolith with the Pope commanding absolute obedience from all clergy.' }
          ],
            remediations: { 'the-medieval-church-was-a': { steps: ['If the student holds the monolithic-Church misconception: Step 1 – Read the Dictatus Papae (1075) by Gregory VII.', 'Step 2 – Compare the English Constitutions of Clarendon (1164) with the papal bull Clericis Laicos (1296) to see.', 'Step 3 – Map a 13th-century diocese: identify the bishop, the cathedral chapter (canons), the monastic houses exempt.', 'This reveals fragmented authority, not monolith.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_003', difficulty: 'standard',
          question: 'The Second Order refers to the nobility—the warrior elite of medieval European.',
          hint: 'Revisit c11_hist_cbse_06_006 (Lord-Vassal Relationship) and draw a three-tier pyramid.',
          misconception: 'Students often think "nobility" and "knighthood" are synonymous, imagining every noble was a knight in shining armour.',
          parts: [
                { id: 'a', prompt: 'Name the ceremony that formally created the bond between a lord and a vassal in medieval Europe, and state the two key acts performed during it.', answer: 'The ceremony was called *homage and fealty*',
                  options: ['The ceremony was called *homage and fealty*', 'investiture', 'nobility', 'knighthood'],
                  hint: 'Revisit c11_hist_cbse_06_006 (Lord-Vassal Relationship) and draw a three-tier pyramid: King →.',
                  misconception: 'Students often think "nobility" and "knighthood" are synonymous, imagining every noble was a knight in shining armour.' },
                { id: 'b', prompt: 'Why did primogeniture (inheritance by the eldest son) become the dominant inheritance custom among the European nobility by the 12th century?', answer: 'Primogeniture prevented the fragmentation of fiefs',
                  options: ['Primogeniture prevented the fragmentation of fiefs', 'keeping the family rich', 'nobility', 'knighthood'],
                  hint: 'Revisit c11_hist_cbse_06_006 (Lord-Vassal Relationship) and draw a three-tier pyramid: King →.',
                  misconception: 'Students often think "nobility" and "knighthood" are synonymous, imagining every noble was a knight in shining armour.' },
                { id: 'c', prompt: 'A 12th-century charter records that a knight holds a fief of 500 hectares and owes 40 days of military service annually.', answer: 'The knight serves 40 days at his own cost',
                  options: ['The knight serves 40 days at his own cost', 'nobility', 'knighthood'],
                  hint: 'Revisit c11_hist_cbse_06_006 (Lord-Vassal Relationship) and draw a three-tier pyramid: King →.',
                  misconception: 'Students often think "nobility" and "knighthood" are synonymous, imagining every noble was a knight in shining armour.' }
          ],
            remediations: { 'nobility-and-knighthood-are-synonymous': { steps: ['Re-read the lord-vassal ceremony (homage/fealty) in c11_hist_cbse_06_006 to see how personal bonds created legal.', 'Use a two-column table to contrast "knight" (military rank, achievable by non-nobles) vs.', 'Map the Indian parallel—compare a *sardar* (military commander) with a *zamindar* (hereditary landholder)—to grasp that.', 'Re-attempt Diagnostic Question 4 with this distinction in mind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_004', difficulty: 'standard',
          question: 'The Third Order in medieval European feudal society (9th–14th centuries).',
          hint: 'If stuck, revisit the “Three Orders” diagram in node 001 and the “Lord‑Vassal” flowchart.',
          misconception: 'Students often believe all medieval peasants were serfs and that serfs were legally identical to slaves.',
          parts: [
                { id: 'a', prompt: 'Why did lords prefer to collect labor services (corvée) rather than money rents from serfs in the early medieval period?', answer: 'Money was scarce and markets underdeveloped',
                  options: ['Money was scarce and markets underdeveloped', 'lords were cruel', 'all medieval peasants were serfs and that serfs were legally identical to slaves'],
                  hint: 'If stuck, revisit the “Three Orders” diagram in node 001 and the “Lord‑Vassal” flowchart in node.',
                  misconception: 'Students often believe all medieval peasants were serfs and that serfs were legally identical to slaves.' }
          ],
            remediations: { 'all-medieval-peasants-were-serfs': { steps: ['Re‑read the definition of “villein” and “bordar” in the Domesday Book extract (NCERT Theme 3, Box 3).', 'Create a two‑column table: “Serf Rights” vs.', '“Slave Rights” using the manorial court roll examples in the textbook.', 'Watch the 5‑minute video “A Day in the Life of a Medieval Serf” (linked in the digital resources) and note three.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe all medieval peasants were serfs and that serfs were legally identical to slaves.',
          parts: [
                { id: 'a', prompt: 'Construct a 5‑entry timeline showing key moments in the evolution of serfdom in England from the Norman Conquest to the Black Death.', answer: 'Expected entries: 1066 Norman Conquest introduces feudal tenure',
                  options: ['Expected entries: 1066 Norman Conquest introduces feudal tenure', 'all medieval peasants were serfs and that serfs were legally identical to slaves'],
                  hint: 'If stuck, revisit the “Three Orders” diagram in node 001 and the “Lord‑Vassal” flowchart in node.',
                  misconception: 'Students often believe all medieval peasants were serfs and that serfs were legally identical to slaves.' }
          ],
            remediations: { 'all-medieval-peasants-were-serfs': { steps: ['Re‑read the definition of “villein” and “bordar” in the Domesday Book extract (NCERT Theme 3, Box 3).', 'Create a two‑column table: “Serf Rights” vs.', '“Slave Rights” using the manorial court roll examples in the textbook.', 'Watch the 5‑minute video “A Day in the Life of a Medieval Serf” (linked in the digital resources) and note three.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_005', difficulty: 'standard',
          question: 'The manor was the basic economic and social unit of feudal Europe (9th–15th.',
          hint: 'If stuck, revisit the distinction between "villein" and "free tenant" in node 004 and the.',
          misconception: 'Students often conflate the *manor* (an economic estate) with the *fief* (a political grant of land in return for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The manor was the basic economic and social unit of feudal Europe (9th–15th centuries), a',
                  options: ['The manor was the basic economic and social unit of feudal Europe (9th–15th centuries), a', 'Feudal society in medieval Europe (c', 'The First Order refers to the clergy – the ordained religious hierarchy of the Roman', 'The Second Order refers to the nobility—the warrior elite of medieval European feudal'],
                  hint: 'If stuck, revisit the distinction between "villein" and "free tenant" in node 004 and the concept.',
                  misconception: 'Students often conflate the *manor* (an economic estate) with the *fief* (a political grant of land in return for military service).' }
          ],
            remediations: { 'students-often-conflate-the-manor': { steps: ['Re-read node 004 (The Third Order) to clarify the legal status of serfs vs.', 'Study a primary source: a 13th-century English manorial court roll (e.g., Elton or Ramsey) to see actual entries for.', 'Draw a comparative table: Manor vs.', 'Watch a 10-minute documentary segment on the open-field system (e.g., BBC "The Medieval Mind") to visualise strip.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_06_006', difficulty: 'standard',
          question: 'The lord-vassal relationship was the core feudal bond in medieval Europe.',
          hint: 'Revisit c11_hist_cbse_06_003 "The Second Order: The Nobility and the Warrior Elite".',
          misconception: 'Students think the fief was "owned" by the vassal like modern property.',
          parts: [
                { id: 'a', prompt: 'A vassal holds a fief worth £20 annual income. His lord demands 40 days of knight service per year.', answer: '40 days × 2 shillings = 80 shillings = £4',
                  options: ['40 days × 2 shillings = 80 shillings = £4', 'property rights', 'the fief was "owned" by the vassal like modern property'],
                  hint: 'Revisit c11_hist_cbse_06_003 "The Second Order: The Nobility and the Warrior Elite" - focus on the.',
                  misconception: 'Students think the fief was "owned" by the vassal like modern property.' }
          ],
            remediations: { 'the-fief-was-owned-by': { steps: ['Re-read the homage ceremony in c11_hist_cbse_06_003 (Nobility) - note the vassal becomes "the man" of the lord.', 'Compare with modern property deed - list 3 differences (hereditary? alienable? absolute?).', 'Analyze the "relief" payment - why pay to inherit "your own" land?', 'Write a 50-word explanation of *dominium utile* vs *dominium directum* using the Indian *zamindari* vs *ryotwari*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
