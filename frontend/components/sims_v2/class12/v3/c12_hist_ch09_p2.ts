import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch09_p2: SimDef = {
    id: 'v3_c12_hist_ch09_p2',
    title: 'Colonialism and the Countryside · Part 2/2',
    subtitle: 'Fix the tax forever — and watch the sunset auctions begin',
    classLevel: 12, subject: 'history', topic: 'Colonialism and the Countryside · Part 2/2',
    chapters: ['c12_hist_ch09'],
    nodeIds: ['c12_hist_cbse_09_007', 'c12_hist_cbse_09_008', 'c12_hist_cbse_09_009', 'c12_hist_cbse_09_010', 'c12_hist_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Agrarian historian', intro: 'A revenue rule meant to guarantee income created auctions, absentee landlords and a new village elite.', goal: 'Analyse the Permanent Settlement\'s design, defaults and the jotedar ascendancy — and the Fifth Report\'s bias.' },
    discovery: {
        question: '1793: Cornwallis fixed Bengal\'s land revenue forever, made tax-collectors into landowners — and within two decades estates were being auctioned by sunset. What broke?',
        options: ['Rigidity — the demand never flexed with harvest or price; miss the deadline and the law auctioned the estate, while village jotedars rose in the zamindars\' place', 'Zamindars were lazy', 'Prices stayed high', 'The Company wanted failure'],
        answer: 'Rigidity — the demand never flexed with harvest or price; miss the deadline and the law auctioned the estate, while village jotedars rose in the zamindars\' place',
        hook: 'Don\'t take the Fifth Report\'s \'collapse of zamindars\' at face value — archives show zamindars survived through benami sales and transfers to family. And the real shift was local: jotedars who lived in villages, lent money and held ryots directly outran absentee zamindars.',
    },
    teaching: [
        { title: 'The Zamindars\' Default: Sunset Law, Sales of Estates and the Sunset Clause', text: 'The Zamindars\' Default refers to the widespread failure of Bengal zamindars to meet the fixed revenue demand under the Permanent Settlement (1793), triggering the Sunset Law (which mandated auction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run the settlement\'s logic: chain high fixed demand to auctioned estates to the rise of the jotedar — then audit the Fifth Report\'s claim of collapse against zamindari archives.',
        labels: ['The Zamindars\' Default: Sunset', 'The Deccan Riots', 'Colonial Forest Acts', 'The Cotton Boom: Deccan,', 'The Colonial State'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_007', title: 'The Zamindars\' Default: Sunset Law, Sales of Estates and the Sunset Clause',
          caseStudy: { intro: 'Imagine you are a zamindar in 1797 Burdwan: the Collector has just announced your estate will be auctioned at sunset because you missed the revenue payment.',
            decisions: [{ prompt: 'What was the "Sunset Law" under the Permanent Settlement, and what immediate consequence did it stipulate for a zamindar who failed to pay.', options: [
                { text: 'The Sunset Law required the zamindar to deposit the revenue demand in the Company', outcome: 'The Sunset Law required the zamindar to deposit the revenue demand in the Company treasury.' },
                { text: 'the zamindar got a warning', outcome: 'Not quite — Students often think the Permanent Settlement made zamindars "landowners" with full property.', reveals: 'the-permanent-settlement-made-zamindars' },
                { text: 'the estate was confiscated without auction', outcome: 'Not quite — Students often think the Permanent Settlement made zamindars "landowners" with full property.', reveals: 'the-permanent-settlement-made-zamindars' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_008', title: 'The Deccan Riots of 1875: Moneylenders, Ryots and Social Boycott',
          caseStudy: { intro: 'Imagine you are a ryot in 1875 Supa village, Poona district. Your cotton crop fetched high prices during the American Civil War (1861-65), so you borrowed.',
            decisions: [{ prompt: 'In which year did the Deccan Riots begin, and at which village did they start?', options: [
                { text: 'The Deccan Riots began on 12 May 1875 at Supa village in Poona (Pune) district', outcome: 'The Deccan Riots began on 12 May 1875 at Supa village in Poona (Pune) district.' },
                { text: 'high interest rates', outcome: 'Not quite — Students think the Deccan Riots were a spontaneous outburst against "high interest rates" alone.', reveals: 'the-deccan-riots-were-a' },
                { text: 'the Deccan Riots were a spontaneous outburst against "high interest rates" alone', outcome: 'Not quite — Students think the Deccan Riots were a spontaneous outburst against "high interest rates" alone.', reveals: 'the-deccan-riots-were-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_009', title: 'Colonial Forest Acts and the Marginalisation of Pastoral Nomads',
          caseStudy: { intro: 'Imagine you are a Raika herder in 1880s Rajasthan, driving your camels along a migratory route your ancestors used for generations — only to be stopped by.',
            decisions: [{ prompt: 'In which year was the first comprehensive Indian Forest Act passed that introduced the classification of forests into Reserved, Protected.', options: [
                { text: '1878', outcome: '1878. A wrong answer (e.g., 1865 or 1927) reveals the student confuses the first tentative.' },
                { text: 'banned', outcome: 'Not quite — Students often believe the Forest Acts "banned" pastoral nomads from forests entirely.', reveals: 'the-forest-acts-banned-pastoral' },
                { text: 'the Forest Acts "banned" pastoral nomads from forests entirely', outcome: 'Not quite — Students often believe the Forest Acts "banned" pastoral nomads from forests entirely.', reveals: 'the-forest-acts-banned-pastoral' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_010', title: 'The Cotton Boom: Deccan, American Civil War and the Collapse of 1865',
          caseStudy: { intro: 'Imagine you are a farmer in 1862 in a village near Ahmednagar. A sahukar offers you ₹100 advance for every acre you plant with cotton — no questions asked.',
            decisions: [{ prompt: 'In which year did the American Civil War begin, and what immediate effect did it have on Indian cotton exports to Britain?', options: [
                { text: 'The American Civil War began in 1861', outcome: 'The American Civil War began in 1861. Indian cotton exports to Britain rose from less than 3%.' },
                { text: 'cotton prices rose', outcome: 'Not quite — Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.”.', reveals: 'the-cotton-boom-prospered-deccan' },
                { text: 'the cotton boom *prospered* Deccan peasants', outcome: 'Not quite — Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.”.', reveals: 'the-cotton-boom-prospered-deccan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_011', title: 'The Colonial State and the Land Revenue Demand: The Ryotwari Tax Burden',
          caseStudy: { intro: 'Imagine you are a farmer in 1870s Poona district: your cotton crop fetched high prices during the American Civil War, but now prices have collapsed while the.',
            decisions: [{ prompt: 'In which decade was the first Ryotwari revenue settlement introduced in the Bombay Deccan, and what was the revision period for revenue.', options: [
                { text: 'The first Ryotwari settlement was introduced in the 1820s, and lands were resurveyed', outcome: 'The first Ryotwari settlement was introduced in the 1820s, and lands were resurveyed every 30 years.' },
                { text: 'permanent settlement', outcome: 'Not quite — Students often think the Ryotwari system was "better" for peasants than the Permanent Settlement.', reveals: 'the-ryotwari-system-was-better' },
                { text: 'better', outcome: 'Not quite — Students often think the Ryotwari system was "better" for peasants than the Permanent Settlement.', reveals: 'the-ryotwari-system-was-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A microfinance pitch at a rural NGO offers farmers fixed monthly repayments \'scientifically assessed on average yield\' with no provision for a failed monsoon — \'the theory is sound, so the plan is fair.\'',
            decisions: [{ prompt: 'What did the Ryotwari settlement teach about that design?', options: [
                { text: 'Challenge the rigidity — the Deccan ryots faced an \'average-rent\' demand that stayed fixed while rainfall didn\'t, so they borrowed from moneylenders and slid into debt; the 1875 riots were the system\'s design meeting the land\'s reality, not farmer failure.', outcome: 'The chapter\'s lesson: an elegant theory (Ricardo\'s surplus) produced a debt trap because the demand was inflexible against a volatile climate — fairness on paper isn\'t fairness in the field.' },
                { text: 'Endorse it — cutting out intermediaries and assessing each field directly protects the farmer.', outcome: 'That was Munro\'s stated aim and the system\'s promise — but direct settlement meant the ryot faced the state alone with no buffer; removing the middleman didn\'t protect him, it exposed him.', reveals: 'no-middleman-equals-protection' },
                { text: 'Accept it with longer terms — the only flaw was the 30-year revision cycle.', outcome: 'Revisions made it worse, not better — rates climbed at each resurvey while depressions got no relief; the asymmetry captured upswings and ignored downturns, so time alone doesn\'t fix the design.', reveals: 'longer-terms-fix-rigidity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'You can now trace how a fiscal rule rewired an entire countryside — and read a colonial report for the argument it was built to make.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_007', difficulty: 'standard',
          question: 'The Zamindars\' Default refers to the widespread failure of Bengal zamindars.',
          hint: 'If stuck, re-read NCERT Theme 9, Section 1.2–1.3 (pages 228–231) on why zamindars.',
          misconception: 'Students often think the Permanent Settlement made zamindars "landowners" with full property rights, so they are.',
          parts: [
                { id: 'a', prompt: 'A zamindar in 1798 transfers part of his estate to his mother, then allows arrears to accumulate so that portion is auctioned.', answer: 'This is a fictitious (benami) sale',
                  options: ['This is a fictitious (benami) sale', 'landowners', 'sell land'],
                  hint: 'If stuck, re-read NCERT Theme 9, Section 1.2–1.3 (pages 228–231) on why zamindars defaulted and the.',
                  misconception: 'Students often think the Permanent Settlement made zamindars "landowners" with full property rights, so they are confused when zamindars.' }
          ],
            remediations: { 'the-permanent-settlement-made-zamindars': { steps: ['Revisit node c12_hist_cbse_09_001 (Permanent Settlement) and re-read the NCERT paragraphs 1.2–1.3 on the definition.', 'Then re-attempt Diagnostic Question 2, explicitly writing the causal chain: high fixed demand + price depression.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Permanent Settlement made zamindars "landowners" with full property rights, so they are.',
          parts: [
                { id: 'a', prompt: 'Construct a timeline (1793–1801) showing the interaction of three factors: (a) revenue demand inflexibility, (b) price depression/recovery, (c) zamindar.', answer: '1793: Permanent Settlement fixes demand high (speculative)',
                  options: ['1793: Permanent Settlement fixes demand high (speculative)', 'landowners', 'sell land'],
                  hint: 'If stuck, re-read NCERT Theme 9, Section 1.2–1.3 (pages 228–231) on why zamindars defaulted and the.',
                  misconception: 'Students often think the Permanent Settlement made zamindars "landowners" with full property rights, so they are confused when zamindars.' }
          ],
            remediations: { 'the-permanent-settlement-made-zamindars': { steps: ['Revisit node c12_hist_cbse_09_001 (Permanent Settlement) and re-read the NCERT paragraphs 1.2–1.3 on the definition.', 'Then re-attempt Diagnostic Question 2, explicitly writing the causal chain: high fixed demand + price depression.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_008', difficulty: 'standard',
          question: 'The Deccan Riots of 1875 were a widespread peasant uprising in the Bombay.',
          hint: 'If stuck, revisit c12_hist_cbse_09_002 (Ryotwari System) and the "Revenue demand and.',
          misconception: 'Students think the Deccan Riots were a spontaneous outburst against "high interest rates" alone.',
          parts: [
                { id: 'a', prompt: 'In which year did the Deccan Riots begin, and at which village did they start?', answer: 'The Deccan Riots began on 12 May 1875 at Supa village in Poona (Pune) district',
                  options: ['The Deccan Riots began on 12 May 1875 at Supa village in Poona (Pune) district', 'high interest rates', 'the Deccan Riots were a spontaneous outburst against "high interest rates" alone'],
                  hint: 'If stuck, revisit c12_hist_cbse_09_002 (Ryotwari System) and the "Revenue demand and peasant debt".',
                  misconception: 'Students think the Deccan Riots were a spontaneous outburst against "high interest rates" alone.' },
                { id: 'b', prompt: 'A ryot borrows Rs 100 at 3.125% per month (3-2 annas per cent per mensem).', answer: 'Monthly rate 3.125% = 37.5% per annum',
                  options: ['Monthly rate 3.125% = 37.5% per annum', 'high interest rates', 'the Deccan Riots were a spontaneous outburst against "high interest rates" alone'],
                  hint: 'If stuck, revisit c12_hist_cbse_09_002 (Ryotwari System) and the "Revenue demand and peasant debt".',
                  misconception: 'Students think the Deccan Riots were a spontaneous outburst against "high interest rates" alone.' }
          ],
            remediations: { 'the-deccan-riots-were-a': { steps: ['If the student holds the above misconception: Step 1 — Re-read the "Credit dries up" section (NCERT pp.', '251-252) and trace the revenue demand increase from 50% to 100% in the new settlement.', 'Step 2 — Compare with c12_hist_cbse_09_002 (Ryotwari System) to see how 30-year revision differed from Permanent.', 'Step 3 — Re-do Diagnostic Question 2 and 4, focusing on the sequence: global cotton market → local credit → state.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_009', difficulty: 'standard',
          question: 'The Colonial Forest Acts (primarily the Indian Forest Acts of 1865, 1878, and.',
          hint: 'Revisit the Paharia case (c12_hist_cbse_09_006): their "hoe agriculture" depended.',
          misconception: 'Students often believe the Forest Acts "banned" pastoral nomads from forests entirely.',
          parts: [
                { id: 'a', prompt: 'In which year was the first comprehensive Indian Forest Act passed that introduced the classification of forests into Reserved, Protected, and Village Forests?', answer: '1878',
                  options: ['1878', 'banned', 'the Forest Acts "banned" pastoral nomads from forests entirely'],
                  hint: 'Revisit the Paharia case (c12_hist_cbse_09_006): their "hoe agriculture" depended on fallow cycles.',
                  misconception: 'Students often believe the Forest Acts "banned" pastoral nomads from forests entirely.' },
                { id: 'b', prompt: 'Compare the impact of the Forest Acts on the Paharias (shifting cultivators in Rajmahal hills) and the Raikas (pastoral nomads in Rajasthan).', answer: 'Similarities: (1) Both lost access to fallow/grazing lands reclassified as',
                  options: ['Similarities: (1) Both lost access to fallow/grazing lands reclassified as', 'banned', 'the Forest Acts "banned" pastoral nomads from forests entirely'],
                  hint: 'Revisit the Paharia case (c12_hist_cbse_09_006): their "hoe agriculture" depended on fallow cycles.',
                  misconception: 'Students often believe the Forest Acts "banned" pastoral nomads from forests entirely.' }
          ],
            remediations: { 'the-forest-acts-banned-pastoral': { steps: ['If the student conflates "ban" with "regulation," have them re-read the 1878 Act\'s sections on Protected Forests.', 'Then ask them to trace a Raika family\'s annual migration on a map of Rajasthan, marking where permits were needed, fees.', 'Finally, give them a 1900 gazetteer extract showing grazing fees collected — ask: "If grazing was banned, why is there.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_010', difficulty: 'standard',
          question: 'The Cotton Boom (1861–1865) refers to the rapid expansion of cotton cultivation.',
          hint: 'If unclear on ryotwari vs. Permanent Settlement, revisit c12_hist_cbse_09_001 (Permanent.',
          misconception: 'Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.” In reality, the boom.',
          parts: [
                { id: 'a', prompt: 'In which year did the American Civil War begin, and what immediate effect did it have on Indian cotton exports to Britain?', answer: 'The American Civil War began in 1861',
                  options: ['The American Civil War began in 1861', 'cotton prices rose', 'the cotton boom *prospered* Deccan peasants'],
                  hint: 'If unclear on ryotwari vs. Permanent Settlement, revisit c12_hist_cbse_09_001 (Permanent.',
                  misconception: 'Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.” In reality, the boom deepened indebtedness.' },
                { id: 'b', prompt: 'Why did sahukars willingly give long-term loans (₹100 per acre) to ryots during 1861–1865, but refuse credit after 1865?', answer: 'During the boom, sahukars were confident of recovering loans',
                  options: ['During the boom, sahukars were confident of recovering loans', 'cotton prices rose', 'the cotton boom *prospered* Deccan peasants'],
                  hint: 'If unclear on ryotwari vs. Permanent Settlement, revisit c12_hist_cbse_09_001 (Permanent.',
                  misconception: 'Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.” In reality, the boom deepened indebtedness.' },
                { id: 'c', prompt: 'A ryot in the Deccan borrowed ₹500 at 3% monthly interest in 1862.', answer: 'Monthly rate = 3% → annual = 36%',
                  options: ['Monthly rate = 3% → annual = 36%', 'cotton prices rose', 'the cotton boom *prospered* Deccan peasants'],
                  hint: 'If unclear on ryotwari vs. Permanent Settlement, revisit c12_hist_cbse_09_001 (Permanent.',
                  misconception: 'Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.” In reality, the boom deepened indebtedness.' },
                { id: 'd', prompt: 'Compare the ryotwari revenue demand in the Bombay Deccan before and after the cotton boom.', answer: 'The first ryotwari settlement (1820s) was harsh',
                  options: ['The first ryotwari settlement (1820s) was harsh', 'demand was always high', 'cotton prices rose', 'the cotton boom *prospered* Deccan peasants'],
                  hint: 'If unclear on ryotwari vs. Permanent Settlement, revisit c12_hist_cbse_09_001 (Permanent.',
                  misconception: 'Students often think the cotton boom *prospered* Deccan peasants because “cotton prices rose.” In reality, the boom deepened indebtedness.' }
          ],
            remediations: { 'the-cotton-boom-prospered-deccan': { steps: ['If the student conflates boom with prosperity: (1) Re-read Source 8 (ryot petition) and Source 10 (debt calculation).', '(2) Revisit the worked example on compounding interest (Diagnostic Q3).', '(3) Compare with the Santhal experience (node c12_hist_cbse_09_005): both groups lost land to moneylenders despite.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_09_011', difficulty: 'standard',
          question: 'The Ryotwari system, implemented in the Bombay Deccan from the 1820s, was.',
          hint: 'If stuck, re-read the section "3.2 A new revenue system" in NCERT (pp.',
          misconception: 'Students often think the Ryotwari system was "better" for peasants than the Permanent Settlement because it eliminated.',
          parts: [
                { id: 'a', prompt: 'A ryot in 1840s Deccan borrows Rs 100 at 3.125% per month (37.5% per annum) to pay revenue.', answer: 'Interest per year = Rs 37.5',
                  options: ['Interest per year = Rs 37.5', 'better'],
                  hint: 'If stuck, re-read the section "3.2 A new revenue system" in NCERT (pp.',
                  misconception: 'Students often think the Ryotwari system was "better" for peasants than the Permanent Settlement because it eliminated zamindars.' }
          ],
            remediations: { 'the-ryotwari-system-was-better': { steps: ['Revisit node c12_hist_cbse_09_002 (Ryotwari System: Munro, Read and Direct Settlement) to clarify the system\'s design.', 'Review node c12_hist_cbse_09_010 (Cotton Boom) to see how global markets interacted with local revenue policy.', 'Re-read the Deccan Riots Commission section in NCERT (pp.', '254–256) and practice "reading against the grain" by listing what the report omits.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
