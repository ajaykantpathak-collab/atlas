import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch09_p1: SimDef = {
    id: 'v3_c12_hist_ch09_p1',
    title: 'Colonialism and the Countryside · Part 1/2',
    subtitle: 'Fix the tax forever — and watch the sunset auctions begin',
    classLevel: 12, subject: 'history', topic: 'Colonialism and the Countryside · Part 1/2',
    chapters: ['c12_hist_ch09'],
    nodeIds: ['c12_hist_cbse_09_001', 'c12_hist_cbse_09_002', 'c12_hist_cbse_09_003', 'c12_hist_cbse_09_004', 'c12_hist_cbse_09_005', 'c12_hist_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Agrarian historian', intro: 'A revenue rule meant to guarantee income created auctions, absentee landlords and a new village elite.', goal: 'Analyse the Permanent Settlement\'s design, defaults and the jotedar ascendancy — and the Fifth Report\'s bias.' },
    discovery: {
        question: '1793: Cornwallis fixed Bengal\'s land revenue forever, made tax-collectors into landowners — and within two decades estates were being auctioned by sunset. What broke?',
        options: ['Rigidity — the demand never flexed with harvest or price; miss the deadline and the law auctioned the estate, while village jotedars rose in the zamindars\' place', 'Zamindars were lazy', 'Prices stayed high', 'The Company wanted failure'],
        answer: 'Rigidity — the demand never flexed with harvest or price; miss the deadline and the law auctioned the estate, while village jotedars rose in the zamindars\' place',
        hook: 'Don\'t take the Fifth Report\'s \'collapse of zamindars\' at face value — archives show zamindars survived through benami sales and transfers to family. And the real shift was local: jotedars who lived in villages, lent money and held ryots directly outran absentee zamindars.',
    },
    teaching: [
        { title: 'The Permanent Settlement (1793): Cornwallis, the Zamindar and the Ryot', text: 'The Permanent Settlement of 1793, introduced by Governor-General Lord Cornwallis in Bengal, Bihar, and Orissa, fixed the land revenue demand permanently with zamindars (revenue collectors) who were.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run the settlement\'s logic: chain high fixed demand to auctioned estates to the rise of the jotedar — then audit the Fifth Report\'s claim of collapse against zamindari archives.',
        labels: ['The Permanent Settlement (1793)', 'The Ryotwari System: Munro,', 'The Mahalwari System: Holt', 'The Jotedars of Bengal', 'The Santhals and', 'The Paharias: Shifting Cultivators'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_001', title: 'The Permanent Settlement (1793): Cornwallis, the Zamindar and the Ryot',
          caseStudy: { intro: 'Imagine you are a revenue officer in 1790s Bengal trying to collect taxes from a region devastated by famine and declining cultivation.',
            decisions: [{ prompt: 'In which year was the Permanent Settlement introduced in Bengal, and who was the Governor-General at the time?', options: [
                { text: 'The Permanent Settlement was introduced in 1793 under Governor-General Lord Cornwallis', outcome: 'The Permanent Settlement was introduced in 1793 under Governor-General Lord Cornwallis.' },
                { text: 'landowners', outcome: 'Not quite — Students often believe the Permanent Settlement made zamindars "landowners" in the modern sense.', reveals: 'the-permanent-settlement-made-zamindars' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_002', title: 'The Ryotwari System: Munro, Read and Direct Settlement with the Peasant',
          caseStudy: { intro: 'Imagine you are a revenue officer in 1820s Poona tasked with designing a "fair" system that collects maximum revenue for the Company while avoiding the.',
            decisions: [{ prompt: 'In which region and decade was the Ryotwari System first introduced, and who were the two key British officials associated with its design?', options: [
                { text: 'The Ryotwari System was first introduced in the Bombay Deccan in the 1820s under Governor', outcome: 'The Ryotwari System was first introduced in the Bombay Deccan in the 1820s under Governor Thomas.' },
                { text: 'Bengal, 1793, Cornwallis', outcome: 'Not quite — Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore.', reveals: 'the-ryotwari-system-gave-ownership' },
                { text: 'Madras, 1800s', outcome: 'Not quite — Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore.', reveals: 'the-ryotwari-system-gave-ownership' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_003', title: 'The Mahalwari System: Holt Mackenzie and the Village Collective Settlement',
          caseStudy: { intro: 'Imagine you are a revenue officer in 1820s Agra, tasked with designing a system that avoids the zamindar exploitation of Bengal and the harsh individual.',
            decisions: [{ prompt: 'In which region and year was the Mahalwari System first introduced, and who was the key architect?', options: [
                { text: 'The Mahalwari System was first introduced in 1822 in the North-Western Provinces', outcome: 'The Mahalwari System was first introduced in 1822 in the North-Western Provinces (present-day Uttar.' },
                { text: 'village republic', outcome: 'Not quite — Students often think the Mahalwari System was a "village republic" that empowered peasants.', reveals: 'the-mahalwari-system-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_004', title: 'The Jotedars of Bengal: Rise of Rich Peasants and Challenge to Zamindars',
          caseStudy: { intro: 'Imagine you are visiting a village in present-day North Bengal and meet a wealthy farmer who lives in the village, lends money to neighbours, controls the.',
            decisions: [{ prompt: 'Who were the jotedars and in which region of Bengal were they most powerful according to Francis Buchanan\'s survey?', options: [
                { text: 'The jotedars were a class of rich peasants who acquired vast landholdings, controlled', outcome: 'The jotedars were a class of rich peasants who acquired vast landholdings, controlled local trade.' },
                { text: 'jotedars were zamindars', outcome: 'Not quite — Students often think "jotedar" is just another name for "zamindar" or "rich peasant" anywhere.', reveals: 'jotedar-is-just-another-name' },
                { text: 'they were powerful all over Bengal', outcome: 'Not quite — Students often think "jotedar" is just another name for "zamindar" or "rich peasant" anywhere.', reveals: 'jotedar-is-just-another-name' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_005', title: 'The Santhals and the Damin-i-Koh: Settled Agriculture and Rebellion (1855)',
          caseStudy: { intro: 'Imagine you are standing at the foothills of the Rajmahal hills today — you see ploughed fields where once there was dense forest.',
            decisions: [{ prompt: 'In which year was the Damin-i-Koh region demarcated for Santhal settlement, and what was the specific cultivation condition attached to the.', options: [
                { text: 'Damin-i-Koh was demarcated in 1832 with the condition that at least one-tenth of the area', outcome: 'Damin-i-Koh was demarcated in 1832 with the condition that at least one-tenth of the area must.' },
                { text: 'tribal revolt against British rule', outcome: 'Not quite — Students often think the Santhal Rebellion was primarily a "tribal revolt against British rule".', reveals: 'the-santhal-rebellion-was-primarily' },
                { text: 'nature of the revolt', outcome: 'Not quite — Students often think the Santhal Rebellion was primarily a "tribal revolt against British rule".', reveals: 'the-santhal-rebellion-was-primarily' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_006', title: 'The Paharias: Shifting Cultivators and the Impact of Colonial Forest Laws',
          caseStudy: { intro: 'Imagine you are standing in the Rajmahal hills today — the forests are thinner, the hills scarred by old cultivation patches.',
            decisions: [{ prompt: 'In which region did the Paharias primarily live, and what was their main mode of subsistence in the early 19th century?', options: [
                { text: 'The Paharias lived around the Rajmahal hills (present-day Jharkhand/West Bengal border)', outcome: 'The Paharias lived around the Rajmahal hills (present-day Jharkhand/West Bengal border) and.' },
                { text: 'they were settled plough cultivators in the Gangetic plains', outcome: 'Not quite — Students often think the Paharias "disappeared" or "were assimilated" after British contact.', reveals: 'the-paharias-disappeared-or-were' },
                { text: 'disappeared', outcome: 'Not quite — Students often think the Paharias "disappeared" or "were assimilated" after British contact.', reveals: 'the-paharias-disappeared-or-were' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A microfinance pitch at a rural NGO offers farmers fixed monthly repayments \'scientifically assessed on average yield\' with no provision for a failed monsoon — \'the theory is sound, so the plan is fair.\'',
            decisions: [{ prompt: 'What did the Ryotwari settlement teach about that design?', options: [
                { text: 'Challenge the rigidity — the Deccan ryots faced an \'average-rent\' demand that stayed fixed while rainfall didn\'t, so they borrowed from moneylenders and slid into debt; the 1875 riots were the system\'s design meeting the land\'s reality, not farmer failure.', outcome: 'The chapter\'s lesson: an elegant theory (Ricardo\'s surplus) produced a debt trap because the demand was inflexible against a volatile climate — fairness on paper isn\'t fairness in the field.' },
                { text: 'Endorse it — cutting out intermediaries and assessing each field directly protects the farmer.', outcome: 'That was Munro\'s stated aim and the system\'s promise — but direct settlement meant the ryot faced the state alone with no buffer; removing the middleman didn\'t protect him, it exposed him.', reveals: 'no-middleman-equals-protection' },
                { text: 'Accept it with longer terms — the only flaw was the 30-year revision cycle.', outcome: 'Revisions made it worse, not better — rates climbed at each resurvey while depressions got no relief; the asymmetry captured upswings and ignored downturns, so time alone doesn\'t fix the design.', reveals: 'longer-terms-fix-rigidity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now trace how a fiscal rule rewired an entire countryside — and read a colonial report for the argument it was built to make.',
            decisions: [{ prompt: 'What comes next? Colonialism and the Countryside · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Colonialism and the Countryside · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_001', difficulty: 'standard',
          question: 'The Permanent Settlement of 1793, introduced by Governor-General Lord.',
          hint: 'Review the revenue farming system under Warren Hastings (c8_hist_ch3_8) and the Mughal.',
          misconception: 'Students often believe the Permanent Settlement made zamindars "landowners" in the modern sense, giving them full.',
          parts: [
                { id: 'a', prompt: 'A zamindar in 1797 fails to pay the revenue by sunset on the due date.', answer: 'The estate is liable to be auctioned immediately',
                  options: ['The estate is liable to be auctioned immediately', 'the zamindar gets a warning', 'the Company waives the demand', 'landowners'],
                  hint: 'Review the revenue farming system under Warren Hastings (c8_hist_ch3_8) and the Mughal zabt system.',
                  misconception: 'Students often believe the Permanent Settlement made zamindars "landowners" in the modern sense, giving them full property rights over.' }
          ],
            remediations: { 'the-permanent-settlement-made-zamindars': { steps: ['If the student confuses zamindari property rights, have them re-read NCERT pages 229-230 on the definition of zamindar.', 'Then compare with Mughal zamindars (c6_history_ch09_035) who had judicial/military roles.', 'Create a two-column table: "Company\'s control over zamindars" vs "Zamindar\'s autonomy" using the text.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_002', difficulty: 'standard',
          question: 'The Ryotwari System was a land revenue settlement introduced in the Bombay.',
          hint: 'If stuck, revisit the **Permanent Settlement\'s "Sunset Law" and zamindar default.',
          misconception: 'Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore pro-peasant.',
          parts: [
                { id: 'a', prompt: 'A ryot in the Deccan holds 10 acres of "black cotton soil" assessed at ₹5/acre annual revenue. Rainfall fails for two consecutive years; his yield drops 60%.', answer: 'He must borrow from a moneylender (sahukar)',
                  options: ['He must borrow from a moneylender (sahukar)', 'he can petition for remission', 'revenue adjusts automatically', 'gave ownership rights to peasants'],
                  hint: 'If stuck, revisit the **Permanent Settlement\'s "Sunset Law" and zamindar default mechanisms** (node.',
                  misconception: 'Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore pro-peasant.' },
                { id: 'b', prompt: 'Compare the revenue flexibility of the Permanent Settlement (Bengal) and the Ryotwari Settlement (Bombay Deccan) during the 1830s price depression.', answer: 'The Ryotwari System created greater immediate pressure',
                  options: ['The Ryotwari System created greater immediate pressure', 'both were equally rigid', 'gave ownership rights to peasants'],
                  hint: 'If stuck, revisit the **Permanent Settlement\'s "Sunset Law" and zamindar default mechanisms** (node.',
                  misconception: 'Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore pro-peasant.' }
          ],
            remediations: { 'the-ryotwari-system-gave-ownership': { steps: ['247-248 (Ryotwari section) and p.', '248-249 (Revenue demand and peasant debt).', 'Create a two-column table: "Ricardian Theory Assumption" vs "Deccan Reality" (e.g., Theory: "Land has fixed average.', 'Watch the 10-min video "Ryotwari System - Munro\'s Experiment" (search YouTube for credible channels like *Magnet.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore pro-peasant.',
          parts: [
                { id: 'a', prompt: 'Construct a cause-effect chain (minimum 5 links) connecting: Ricardian theory → Ryotwari design choices → 1820s high assessment → 1830s price crash/famine →.', answer: 'Chain: (1) Ricardian theory → state claims "surplus" as revenue',
                  options: ['Chain: (1) Ricardian theory → state claims "surplus" as revenue', 'gave ownership rights to peasants'],
                  hint: 'If stuck, revisit the **Permanent Settlement\'s "Sunset Law" and zamindar default mechanisms** (node.',
                  misconception: 'Students often think the Ryotwari System "gave ownership rights to peasants" and was therefore pro-peasant.' }
          ],
            remediations: { 'the-ryotwari-system-gave-ownership': { steps: ['247-248 (Ryotwari section) and p.', '248-249 (Revenue demand and peasant debt).', 'Create a two-column table: "Ricardian Theory Assumption" vs "Deccan Reality" (e.g., Theory: "Land has fixed average.', 'Watch the 10-min video "Ryotwari System - Munro\'s Experiment" (search YouTube for credible channels like *Magnet.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_003', difficulty: 'standard',
          question: 'The Mahalwari System was a land revenue settlement introduced by Holt Mackenzie.',
          hint: 'If stuck, revisit the comparison table of the three systems (Permanent, Ryotwari.',
          misconception: 'Students often think the Mahalwari System was a "village republic" that empowered peasants collectively.',
          parts: [
                { id: 'a', prompt: 'In which region and year was the Mahalwari System first introduced, and who was the key architect?', answer: 'The Mahalwari System was first introduced in 1822 in the North-Western Provinces',
                  options: ['The Mahalwari System was first introduced in 1822 in the North-Western Provinces', 'village republic'],
                  hint: 'If stuck, revisit the comparison table of the three systems (Permanent, Ryotwari, Mahalwari) from.',
                  misconception: 'Students often think the Mahalwari System was a "village republic" that empowered peasants collectively.' },
                { id: 'b', prompt: 'A village under the Mahalwari System has a total assessed rental value of Rs 10,000.', answer: 'State demand = 2/3 × 10,000 = Rs 6,666.67',
                  options: ['State demand = 2/3 × 10,000 = Rs 6,666.67', 'village republic'],
                  hint: 'If stuck, revisit the comparison table of the three systems (Permanent, Ryotwari, Mahalwari) from.',
                  misconception: 'Students often think the Mahalwari System was a "village republic" that empowered peasants collectively.' },
                { id: 'c', prompt: 'Compare the Mahalwari System with the Permanent Settlement and Ryotwari System on these four dimensions: (a) unit of settlement, (b) permanence of revenue.', answer: 'unit of settlement, (',
                  options: ['unit of settlement, (', 'village republic'],
                  hint: 'If stuck, revisit the comparison table of the three systems (Permanent, Ryotwari, Mahalwari) from.',
                  misconception: 'Students often think the Mahalwari System was a "village republic" that empowered peasants collectively.' }
          ],
            remediations: { 'the-mahalwari-system-was-a': { steps: ['If the student holds this misconception, have them: (1) Re-read the 1833 Regulation VII excerpt in the NCERT (or.', '(2) Compare a Permanent Settlement village (zamindar collects, keeps surplus) with a Mahalwari village (lambardar.', '(3) Do a mini-case study: a 5-co-sharer village where one defaults — calculate the burden shift.', '(4) Re-attempt Diagnostic Question 5 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_004', difficulty: 'standard',
          question: 'The Jotedars were a class of rich peasants who emerged in North Bengal.',
          hint: 'Revisit the Permanent Settlement node (c12_hist_cbse_09_001) and focus on why zamindars.',
          misconception: 'Students often think "jotedar" is just another name for "zamindar" or "rich peasant" anywhere in India.',
          parts: [
                { id: 'a', prompt: 'Why did the jotedars resist the zamindar\'s efforts to increase the jama (revenue demand) of the village?', answer: 'Jotedars resisted',
                  options: ['Jotedars resisted', 'they resisted because they were loyal to the Company', 'jotedar', 'zamindar'],
                  hint: 'Revisit the Permanent Settlement node (c12_hist_cbse_09_001) and focus on why zamindars failed.',
                  misconception: 'Students often think "jotedar" is just another name for "zamindar" or "rich peasant" anywhere in India.' }
          ],
            remediations: { 'jotedar-is-just-another-name': { steps: ['Re-read the "Why zamindars defaulted" section (NCERT pp.', '229–230) and list the four reasons for default.', 'Re-read "The rise of the jotedars" (pp.', '231–232) and make a two-column table: "Zamindar\'s Power Source" vs "Jotedar\'s Power Source".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_005', difficulty: 'standard',
          question: 'The Santhal Rebellion (1855-56) was a major tribal uprising in the Rajmahal.',
          hint: 'Revisit c12_hist_cbse_09_001 (Permanent Settlement revenue logic) and.',
          misconception: 'Students often think the Santhal Rebellion was primarily a "tribal revolt against British rule" like 1857.',
          parts: [
                { id: 'a', prompt: 'Why did the British prefer Santhals over Paharias for settling the Rajmahal hills, and how did this preference reflect colonial economic priorities?', answer: 'The British preferred Santhals',
                  options: ['The British preferred Santhals', 'Santhals were peaceful', 'tribal revolt against British rule', 'nature of the revolt'],
                  hint: 'Revisit c12_hist_cbse_09_001 (Permanent Settlement revenue logic) and c12_hist_cbse_09_006 (Paharia.',
                  misconception: 'Students often think the Santhal Rebellion was primarily a "tribal revolt against British rule" like 1857.' },
                { id: 'b', prompt: 'A Santhal cultivator in 1850 borrows Rs 100 from a dikus at 50% annual interest compounded annually.', answer: 'After 3 years: Rs 100 × (1.5)³ = Rs 337.50',
                  options: ['After 3 years: Rs 100 × (1.5)³ = Rs 337.50', 'tribal revolt against British rule', 'nature of the revolt'],
                  hint: 'Revisit c12_hist_cbse_09_001 (Permanent Settlement revenue logic) and c12_hist_cbse_09_006 (Paharia.',
                  misconception: 'Students often think the Santhal Rebellion was primarily a "tribal revolt against British rule" like 1857.' }
          ],
            remediations: { 'the-santhal-rebellion-was-primarily': { steps: ['If the student conflates Santhal Rebellion with 1857: (1) Re-read NCERT pp.', '240-243 focusing on "Santhals: Pioneer Settlers" and "The Santhals, however, soon found..." (2) Make a three-column.', '(3) Compare with 1857 node (c6_history_ch10_042) — note 1857 was multi-class, Santhal was specific agrarian grievance.', '(4) Re-attempt Diagnostic Question 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_006', difficulty: 'standard',
          question: 'The Paharias were a tribal community inhabiting the Rajmahal hills (present-day.',
          hint: 'If unclear on shifting cultivation, review the Class 9 Geography case study of jhum.',
          misconception: 'Students often think the Paharias "disappeared" or "were assimilated" after British contact.',
          parts: [
                { id: 'a', prompt: 'Buchanan\'s 1810-11 survey describes the Paharias as "hostile, apprehensive of officials and unwilling to talk." Using the historical context, explain why the.', answer: 'The Paharias\' hostility stemmed from three decades of brutal repression (1770s',
                  options: ['The Paharias\' hostility stemmed from three decades of brutal repression (1770s', 'they were naturally savage and hostile to all outsiders', 'disappeared', 'were assimilated'],
                  hint: 'If unclear on shifting cultivation, review the Class 9 Geography case study of jhum in Northeast.',
                  misconception: 'Students often think the Paharias "disappeared" or "were assimilated" after British contact.' }
          ],
            remediations: { 'the-paharias-disappeared-or-were': { steps: ['If the student cannot distinguish shifting from settled cultivation, revisit Class 9 Geography node c9_geography_ch3_2.', 'For the colonial policy sequence, create a two-column table: "British Action" vs "Paharia Response" for 1770s, 1780s.', 'Then re-read NCERT pages 236-239 focusing on the verbs: "extermination", "pacification", "withdrew", "receded".', 'For the Damin-i-Koh impact, draw a cross-section map: lower hills (fertile, Santhal plough) → upper hills (rocky.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
