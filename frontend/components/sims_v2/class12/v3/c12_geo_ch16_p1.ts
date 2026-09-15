import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch16_p1: SimDef = {
    id: 'v3_c12_geo_ch16_p1',
    title: 'International Trade · Part 1/2',
    subtitle: '95% by sea, but the sky carries a third of the value',
    classLevel: 12, subject: 'geography', topic: 'International Trade · Part 1/2',
    chapters: ['c12_geo_ch16'],
    nodeIds: ['c12_geo_cbse_16_001', 'c12_geo_cbse_16_002', 'c12_geo_cbse_16_003', 'c12_geo_cbse_16_004', 'c12_geo_cbse_16_005', 'c12_geo_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Trade analyst', intro: 'The label inside your shirt crossed a border. Trade isn\'t economics — it\'s the map arguing with itself.', goal: 'Explain trade\'s geographical basis, India\'s post-1991 surge, and how ports, hinterlands and modes divide the cargo.' },
    discovery: {
        question: 'Air cargo moves under 5% of India\'s trade by volume — and ~30-35% by value. Is airport investment for trade a misallocation?',
        options: ['No — tonnage and value measure different trades; gems, pharma and perishables fly because speed, not weight, is what they\'re paying for', 'Yes — volume is all that matters', 'Only for passenger travel', 'Only if ports fail'],
        answer: 'No — tonnage and value measure different trades; gems, pharma and perishables fly because speed, not weight, is what they\'re paying for',
        hook: 'Trade exists because resources are uneven — no country is self-sufficient. And ports aren\'t equal by accident: the west coast\'s submerged inlets gift natural harbours (Mumbai, Kandla) while the east\'s deltas force artificial ones (Chennai). Hinterlands overlap — UP can exit through Mumbai or Kolkata depending on freight rates.',
    },
    teaching: [
        { title: 'International Trade: Definition, Basis and Importance', text: 'International trade is the exchange of goods, services, and capital across national borders driven by the uneven distribution of natural resources, differences in climate, technology, labour skills.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_16_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace India\'s trade surge from ₹1,214 crore to ₹77 lakh crore: compute the growth, blame the right 1991 reforms, map ports to hinterlands, and defend a new Odisha port against its turtles.',
        labels: ['International Trade: Definition, Basis', 'Types of International Trade', 'Balance of Trade: Favourable', 'Direction of India\'s Foreign', 'Composition of India\'s Exports', 'Composition of India\'s Imports'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_001', title: 'International Trade: Definition, Basis and Importance',
          scaffold: { problem: 'Using NCERT Table 8.1 data, calculate the compound annual growth rate (CAGR) of India\'s total trade (exports + imports) from 1950-51 (Rs.',
            steps: [
            { text: 'Identify the formula for CAGR: (Ending Value / Beginning Value)^(1/n) - 1, where n = number of years.' },
            { text: 'Calculate total trade for base year: The text gives "external trade was worth Rs.' },
            { text: 'Compute ratio: 77,19,796 / 1,214 = 6,358.32.' },
            { text: 'Take 70th root: 6,358.32^(1/70) = e^(ln(6358.32)/70) = e^(8.757/70) = e^0.1251 = 1.1332.' },
            { text: 'Subtract 1: 1.1332 - 1 = 0.1332 = 13.32% CAGR.' },
            { text: 'Interpret: A 13.3% annual compound growth over 70 years means India\'s trade doubled every ~5.3 years (Rule of 70.', faded: true, blankAnswer: 'CAGR = 13.32% per annum. This implies India\'s trade volume.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_002', title: 'Types of International Trade: Bilateral and Multilateral',
          caseStudy: { intro: 'Observe that India signs a Comprehensive Economic Partnership Agreement (CEPA) with the UAE — a single partner — while simultaneously being a founding member.',
            decisions: [{ prompt: 'Define bilateral trade and give one example of a bilateral trade agreement India has signed.', options: [
                { text: 'Bilateral trade is trade between two countries governed by a mutually negotiated agreement', outcome: 'Bilateral trade is trade between two countries governed by a mutually negotiated agreement.' },
                { text: 'WTO or SAFTA', outcome: 'Not quite — Students often think "bilateral trade means trade between two countries, multilateral means trade.', reveals: 'bilateral-trade-means-trade-between' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_003', title: 'Balance of Trade: Favourable and Unfavourable Balance',
          scaffold: { problem: 'According to NCERT Table 8.1, in 2013-14 India\'s exports were ₹19,05,011 crore and imports were ₹27,15,434 crore.',
            steps: [
            { text: 'Identify the formula: Trade Balance = Exports - Imports.' },
            { text: 'Substitute values: TB = 19,05,011 - 27,15,434.' },
            { text: 'Perform subtraction: 19,05,011 - 27,15,434 = -8,10,423 crore. (Matches Table 8.1).' },
            { text: 'Interpret sign: Negative → Unfavourable Balance of Trade (Deficit of ₹8,10,423 crore).' },
            { text: 'Calculate deficit as % of imports: (Deficit / Imports) × 100 = (8,10,423 / 27,15,434) × 100 = 29.85%.' },
            { text: 'Interpretation: For every ₹100 of goods imported, India earned only ₹70.15 from exports in 2013-14.', faded: true, blankAnswer: 'Trade Balance = -₹8,10,423 crore (Unfavourable). Deficit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_004', title: 'Direction of India\'s Foreign Trade: Major Trading Partners',
          scaffold: { problem: 'Using NCERT Table 8.6, determine which region showed the highest absolute growth in import value (in ₹ crore) between 2016-17 and 2021-22.',
            steps: [
            { text: 'Extract import values for all five regions for both years from Table 8.6.' },
            { text: 'Compute absolute growth = Value_2021-22 - Value_2016-17 for each region.' },
            { text: 'Identify the region with maximum absolute growth.' },
            { text: 'Calculate growth rate = (Absolute Growth / Value_2016-17) × 100 for that region.' },
            { text: 'Interpret the result in context of India\'s trade policy.', faded: true, blankAnswer: 'Asia-ASEAN: 29,18,577 - 15,44,520 = 13,74,057 crore growth.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_005', title: 'Composition of India\'s Exports: Primary vs Manufactured Goods',
          scaffold: { problem: 'Using Table 8.2, calculate the percentage-point change for each export category from 2015-16 to 2021-22.',
            steps: [
            { text: 'Extract 2015-16 and 2021-22 shares for all five categories from Table 8.2.' },
            { text: 'Compute change = 2021-22 share minus 2015-16 share for each category.' },
            { text: 'Agriculture: 11.9 - 12.6 = -0.7 pp; Ore & Minerals: 2.0 - 1.6 = +0.4 pp; Manufactured: 67.8 - 72.9 = -5.1 pp; Crude.' },
            { text: 'Largest absolute increase = Crude petroleum (+4.5 pp). Largest absolute decrease = Manufactured goods (-5.1 pp).' },
            { text: 'Verify sum of changes ≈ 0 (rounding): -0.7+0.4-5.1+4.5+0.8 = -0.1 ≈ 0.', faded: true, blankAnswer: 'Crude petroleum (+4.5 pp) largest increase; Manufactured.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_006', title: 'Composition of India\'s Imports: Capital Goods, Petroleum, Edible Oils',
          scaffold: { problem: 'Using Table 8.4, determine which commodity group had the highest absolute increase in percentage share from 2015-16 to 2021-22, and explain.',
            steps: [
            { text: 'Extract percentage shares for each group in 2015-16 and 2021-22 from Table 8.4.' },
            { text: 'Calculate change = (2021-22 share) - (2015-16 share) for each group: Food: -0.7, Fuel: +6.2, Fertilisers: +0.2, Paper.' },
            { text: 'Identify maximum positive change: Fuel (Coal, POL) at +6.2 percentage points.' },
            { text: 'Link to energy geography: India\'s domestic crude production stagnated (~30-35 MMT) while consumption rose >5% annually.' },
            { text: 'Conclude: Structural import dependence, not just price, drives POL share rise.', faded: true, blankAnswer: 'Fuel (Coal, POL) with +6.2 percentage points; driven.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup founder at your incubation cell celebrates signing one bilateral trade deal: \'Zero-duty access to that country — our export problem is solved, and it\'s so much faster than waiting for some WTO round.\'',
            decisions: [{ prompt: 'What should she know about bilateral vs multilateral trade before celebrating?', options: [
                { text: 'Bilateral deals buy speed and depth but create preferential margins that divert trade and a \'spaghetti bowl\' of rules of origin for every new partner — and when a dispute comes, only the multilateral system offers standing enforcement, so it\'s a complement, not a solution.', outcome: 'The chapter\'s distinction is architectural: two-party agreements tailor concessions but multiply compliance rules and can pull imports away from more efficient non-partner suppliers — trade diversion the headline tariff hides.' },
                { text: 'She\'s right — a signed bilateral agreement is a WTO outcome delivered sooner, full stop.', outcome: 'Bilateral isn\'t a faster mini-WTO: it can carry WTO-plus obligations like data flows and IP that multilateral rounds deliberately avoid, and its ad hoc panels lack the appellate weight WTO rulings historically carried.', reveals: 'bilateral-is-mini-wto' },
                { text: 'Warn her that any preferential deal is illegal under the WTO\'s non-discrimination rule.', outcome: 'Over-correction — the multilateral framework permits notified free-trade agreements; the real issue is proliferation of divergent rules and asymmetric obligations, not legality.', reveals: 'ftas-violate-mfn' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue trade as geography — uneven resources meeting routes — and separate volume logic from value logic like a real analyst.',
            decisions: [{ prompt: 'What comes next? International Trade · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — International Trade · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_001', difficulty: 'standard',
          question: 'International trade is the exchange of goods, services, and capital across.',
          hint: 'If stuck on the "why trade?" question, revisit Class 8 c8_geo_ch1_5 (Distribution.',
          misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software,.',
          parts: [
                { id: 'a', prompt: 'India\'s international trade was worth Rs. 1,214 crore in 1950-51 and Rs. 77,19,796 crore in 2020-21. Calculate the percentage growth.', answer: 'Correct calculation: ((77,19,796 - 1,214) / 1,214) × 100 = 6,35,830.5% growth',
                  options: ['Correct calculation: ((77,19,796 - 1,214) / 1,214) × 100 = 6,35,830.5% growth', 'globalisation', 'international trade', '(natural or artificial sheltered water body)'],
                  hint: 'If stuck on the "why trade?" question, revisit Class 8 c8_geo_ch1_5 (Distribution of Natural.',
                  misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT, tourism, banking) and.' }
          ],
            remediations: { 'international-trade-means-only-exports': { steps: ['If the student cannot explain the geographical basis of trade, have them revisit Class 8 c8_geo_ch1_5 (Distribution.', 'Then ask: "Which country has all?" N/A — that is the basis of trade.', 'For port vs harbour confusion, use Class 11 c11_geo_cbse_21_004 (Water Transport) and the NCERT port descriptions: make.', 'Practice until they can distinguish the physical feature (harbour) from the economic facility (port) for all 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Air transport\'s share in India\'s international trade volume is negligible, so investing in new airports under UDAN scheme is.', answer: 'Correct evaluation: The statement is flawed',
                  options: ['Correct evaluation: The statement is flawed', 'international trade', '(natural or artificial sheltered water body)'],
                  hint: 'If stuck on the "why trade?" question, revisit Class 8 c8_geo_ch1_5 (Distribution of Natural.',
                  misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT, tourism, banking) and.' }
          ],
            remediations: { 'international-trade-means-only-exports': { steps: ['If the student cannot explain the geographical basis of trade, have them revisit Class 8 c8_geo_ch1_5 (Distribution.', 'Then ask: "Which country has all?" N/A — that is the basis of trade.', 'For port vs harbour confusion, use Class 11 c11_geo_cbse_21_004 (Water Transport) and the NCERT port descriptions: make.', 'Practice until they can distinguish the physical feature (harbour) from the economic facility (port) for all 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_002', difficulty: 'standard',
          question: 'Bilateral trade refers to the exchange of goods and services exclusively.',
          hint: 'If stuck, re-read c12_geo_cbse_16_001 focusing on "Basis of International Trade" and.',
          misconception: 'Students often think "bilateral trade means trade between two countries, multilateral means trade between many.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bilateral trade refers to the exchange of goods and services exclusively between two',
                  options: ['Bilateral trade refers to the exchange of goods and services exclusively between two', 'International trade is the exchange of goods, services, and capital across national', 'Balance of Trade (BoT) is the difference between the monetary value of a country\'s', 'Direction of trade refers to the geographical pattern of a country\'s international trade'],
                  hint: 'If stuck, re-read c12_geo_cbse_16_001 focusing on "Basis of International Trade" and "Importance.',
                  misconception: 'Students often think "bilateral trade means trade between two countries, multilateral means trade between many countries" and stop there.' }
          ],
            remediations: { 'bilateral-trade-means-trade-between': { steps: ['Revisit c12_geo_cbse_16_001 to reinforce the definition of international trade and the concept of trade agreements.', 'Draw a two-column table: left column "Bilateral", right column "Multilateral".', 'Fill rows: Number of parties, Legal framework, MFN applicability, Dispute settlement, Example (India-UAE CEPA vs WTO).', 'Watch a 10-minute video on "Trade diversion vs trade creation" (Viner model) to see how bilateral preferences distort.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_003', difficulty: 'standard',
          question: 'Balance of Trade (BoT) is the difference between the monetary value of.',
          hint: 'If stuck on calculation, review Class 6 Maths "Large Numbers" and Class 10 Geography node.',
          misconception: 'Students confuse **Balance of Trade (BoT)** with **Balance of Payments (BoP)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Balance of Trade (BoT) is the difference between the monetary value of a country\'s',
                  options: ['Balance of Trade (BoT) is the difference between the monetary value of a country\'s', 'International trade is the exchange of goods, services, and capital across national', 'Bilateral trade refers to the exchange of goods and services exclusively between two', 'Direction of trade refers to the geographical pattern of a country\'s international trade'],
                  hint: 'If stuck on calculation, review Class 6 Maths "Large Numbers" and Class 10 Geography node.',
                  misconception: 'Students confuse **Balance of Trade (BoT)** with **Balance of Payments (BoP)**.' }
          ],
            remediations: { 'students-confuse-balance-of-trade': { steps: ['Revisit **c12_geo_cbse_16_001** (International Trade basics) to clarify exports/imports as *goods only*.', 'Re-read NCERT Table 8.1 and 8.4: highlight column headers — "Exports", "Imports", "Trade Balance" — all in "Value in Rs.', 'Do a 5-minute T-chart: Left column "Visible Items (BoT)" — list 5 goods from Table 8.3/8.5; Right column "Invisible.', 'Re-attempt Diagnostic Q1 and Q2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_004', difficulty: 'standard',
          question: 'Direction of trade refers to the geographical pattern of a country\'s.',
          hint: 'If stuck on regional groupings, revisit c11_geo_cbse_08_005 (India\'s location in Asia).',
          misconception: 'Students believe the USA is India\'s largest trading partner because it is the top *country-level* export destination.',
          parts: [
                { id: 'a', prompt: 'Explain why Asia-ASEAN is India\'s largest trading region, integrating at least three factors: geographical, economic, and historical.', answer: 'Asia-ASEAN dominates due to: (1) Geographical proximity',
                  options: ['Asia-ASEAN dominates due to: (1) Geographical proximity', 'China is a big economy'],
                  hint: 'If stuck on regional groupings, revisit c11_geo_cbse_08_005 (India\'s location in Asia) and.',
                  misconception: 'Students believe the USA is India\'s largest trading partner because it is the top *country-level* export destination, but they miss that.' }
          ],
            remediations: { 'the-usa-is-india-s': { steps: ['Revisit NCERT Table 8.6 — physically cover the 2016-17 column and compute 2021-22 percentage shares for all five.', 'On a world map outline, shade the five regions in different colours and draw arrows proportional to import values.', 'Compare with Table 8.5 (principal import commodities) to link *direction* (West Asia for oil, China for electronics).', 'Re-attempt Diagnostic Question 3 and 4. If percentage calculation errors persist, review arithmetic of percentage share.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_005', difficulty: 'standard',
          question: 'Composition of India\'s exports refers to the categorical breakdown of goods.',
          hint: 'If stuck on classification, review c11_geo_cbse_20_001 (manufacturing vs primary) and.',
          misconception: 'Students often think "crude and petroleum products" are primary exports because they originate from crude oil.',
          parts: [
                { id: 'a', prompt: 'Explain why the share of agriculture and allied products in India\'s exports declined from 12.6% (2015-16) to 11.9% (2021-22) even though absolute export value.', answer: 'Share declines when a category grows slower than total exports',
                  options: ['Share declines when a category grows slower than total exports', 'A wrong answer blaming', 'government ban', 'crude and petroleum products'],
                  hint: 'If stuck on classification, review c11_geo_cbse_20_001 (manufacturing vs primary) and.',
                  misconception: 'Students often think "crude and petroleum products" are primary exports because they originate from crude oil.' },
                { id: 'b', prompt: 'Using Table 8.2, calculate the percentage-point change in the share of crude and petroleum products between 2015-16 and 2021-22.', answer: '2015-16 share = 11.9%, 2021-22 share = 16.4%',
                  options: ['2015-16 share = 11.9%, 2021-22 share = 16.4%', 'crude and petroleum products', 'share decline', 'absolute export decline'],
                  hint: 'If stuck on classification, review c11_geo_cbse_20_001 (manufacturing vs primary) and.',
                  misconception: 'Students often think "crude and petroleum products" are primary exports because they originate from crude oil.' },
                { id: 'c', prompt: 'Compare the trend of "Ore and Minerals" share with "Manufactured goods" share from 2015-16 to 2021-22.', answer: 'Ore and Minerals: 1.6% → 1.9% → 3.2% → 2.0% (volatile but roughly constant)',
                  options: ['Ore and Minerals: 1.6% → 1.9% → 3.2% → 2.0% (volatile but roughly constant)', 'largely remained constant', 'decreased', 'crude and petroleum products'],
                  hint: 'If stuck on classification, review c11_geo_cbse_20_001 (manufacturing vs primary) and.',
                  misconception: 'Students often think "crude and petroleum products" are primary exports because they originate from crude oil.' }
          ],
            remediations: { 'crude-and-petroleum-products-are': { steps: ['Re-read the paragraph under Table 8.2: "The composition of commodities...', 'Classify each of the five categories as primary/manufactured using the worked example grouping.', 'Re-calculate percentage-point changes for each category 2015-16 vs 2021-22.', 'Attempt Diagnostic Question 3 again. If still wrong, revisit c11_geo_cbse_20_008 (Industrial Policy and Liberalisation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_006', difficulty: 'standard',
          question: 'Composition of India\'s imports refers to the category-wise breakdown of goods.',
          hint: 'If stuck on percentage calculations, revisit Class 10 Maths statistics (mean, percentage).',
          misconception: 'Students believe "capital goods imports are rising because India is industrialising rapidly" — but Table 8.4 shows.',
          parts: [
                { id: 'a', prompt: 'From Table 8.4, which commodity group showed the largest percentage point increase in share of India\'s imports between 2015-16 and 2021-22, and what was the.', answer: 'Fuel (Coal, POL) increased from 25.4% to 31.6%, a rise of 6.2 percentage points',
                  options: ['Fuel (Coal, POL) increased from 25.4% to 31.6%, a rise of 6.2 percentage points', 'capital goods imports are rising', 'capital goods', 'consumer durables'],
                  hint: 'If stuck on percentage calculations, revisit Class 10 Maths statistics (mean, percentage) and Class.',
                  misconception: 'Students believe "capital goods imports are rising because India is industrialising rapidly" — but Table 8.4 shows a steady decline from.' },
                { id: 'b', prompt: 'Why did foodgrain imports disappear from India\'s import basket after the 1970s while edible oil imports surged to ₹1,41,532 crore in 2021-22, despite both.', answer: 'Green Revolution (HYV wheat/rice, irrigation, fertilisers) made India foodgrain',
                  options: ['Green Revolution (HYV wheat/rice, irrigation, fertilisers) made India foodgrain', 'climate unsuitable for oilseeds', 'capital goods imports are rising', 'capital goods'],
                  hint: 'If stuck on percentage calculations, revisit Class 10 Maths statistics (mean, percentage) and Class.',
                  misconception: 'Students believe "capital goods imports are rising because India is industrialising rapidly" — but Table 8.4 shows a steady decline from.' }
          ],
            remediations: { 'capital-goods-imports-are-rising': { steps: ['Revisit Table 8.4 — highlight capital goods row, trace 2015-16 to 2021-22.', 'Define capital goods using Class 11 industrial location factors (c11_geo_cbse_20_001): "plant, machinery, equipment for.', 'Contrast with "non-ferrous metals" (Table 8.5: ₹4.99 lakh cr) which are raw materials, not capital goods.', 'Redo Diagnostic Q4 with corrected understanding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
