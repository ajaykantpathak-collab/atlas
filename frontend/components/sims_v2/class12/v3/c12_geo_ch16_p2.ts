import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch16_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch16_p2: SimDef = {
    id: 'v3_c12_geo_ch16_p2',
    title: 'International Trade · Part 2/2',
    subtitle: '95% by sea, but the sky carries a third of the value',
    classLevel: 12, subject: 'geography', topic: 'International Trade · Part 2/2',
    chapters: ['c12_geo_ch16'],
    nodeIds: ['c12_geo_cbse_16_007', 'c12_geo_cbse_16_008', 'c12_geo_cbse_16_009', 'c12_geo_cbse_16_010', 'c12_geo_cbse_16_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Trade analyst', intro: 'The label inside your shirt crossed a border. Trade isn\'t economics — it\'s the map arguing with itself.', goal: 'Explain trade\'s geographical basis, India\'s post-1991 surge, and how ports, hinterlands and modes divide the cargo.' },
    discovery: {
        question: 'Air cargo moves under 5% of India\'s trade by volume — and ~30-35% by value. Is airport investment for trade a misallocation?',
        options: ['No — tonnage and value measure different trades; gems, pharma and perishables fly because speed, not weight, is what they\'re paying for', 'Yes — volume is all that matters', 'Only for passenger travel', 'Only if ports fail'],
        answer: 'No — tonnage and value measure different trades; gems, pharma and perishables fly because speed, not weight, is what they\'re paying for',
        hook: 'Trade exists because resources are uneven — no country is self-sufficient. And ports aren\'t equal by accident: the west coast\'s submerged inlets gift natural harbours (Mumbai, Kandla) while the east\'s deltas force artificial ones (Chennai). Hinterlands overlap — UP can exit through Mumbai or Kolkata depending on freight rates.',
    },
    teaching: [
        { title: 'Changing Pattern of India\'s Foreign Trade Since 1991', text: 'The changing pattern of India\'s foreign trade since 1991 refers to the structural transformation in the volume, composition, and direction of India\'s exports and imports driven by economic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_16_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace India\'s trade surge from ₹1,214 crore to ₹77 lakh crore: compute the growth, blame the right 1991 reforms, map ports to hinterlands, and defend a new Odisha port against its turtles.',
        labels: ['Changing Pattern of India\'s', 'Sea Routes and Major', 'Air Cargo and Land', 'Trade Organisations: WTO', 'Free Trade and Globalisation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_007', title: 'Changing Pattern of India\'s Foreign Trade Since 1991',
          scaffold: { problem: 'Using NCERT Table 8.1, calculate the compound annual growth rate (CAGR) of India\'s exports between 2004-05 (Rs 3,75,340 crore) and 2021-22.',
            steps: [
            { text: 'Identify the formula for CAGR: (Ending Value / Beginning Value)^(1/n) - 1, where n = number of years.' },
            { text: 'Compute n = 2021-22 - 2004-05 = 17 years.' },
            { text: 'Compute ratio = 31,47,021 / 3,75,340 = 8.384.' },
            { text: 'Compute 8.384^(1/17). Using log: ln(8.384) = 2.126; 2.126/17 = 0.125; e^0.125 = 1.133. So CAGR ≈ 13.3% per annum.' },
            { text: 'Interpret: 13.3% export CAGR over 17 years reflects sustained integration into global markets after 1991 reforms, but.', faded: true, blankAnswer: 'Export CAGR ≈ 13.3% per annum (2004-05 to 2021-22). This.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_008', title: 'Sea Routes and Major Ports in India\'s Trade',
          caseStudy: { intro: 'Look at a physical map of India — notice how the west coast (Gujarat to Kerala) has a wider continental shelf, numerous natural harbours (Mumbai, Mormugao.',
            decisions: [{ prompt: 'Name the only major port on India\'s east coast that is a land-locked harbour connected to the sea by a channel cut through solid rock and.', options: [
                { text: 'Visakhapatnam Port (Andhra Pradesh)', outcome: 'Visakhapatnam Port (Andhra Pradesh) — hinterland: Andhra Pradesh and Telangana.' },
                { text: 'harbour', outcome: 'Not quite — Students memorise port names as a list but cannot explain *why* a specific port handles a specific.', reveals: 'students-memorise-port-names-as' },
                { text: 'natural harbour', outcome: 'Not quite — Students memorise port names as a list but cannot explain *why* a specific port handles a specific.', reveals: 'students-memorise-port-names-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_009', title: 'Air Cargo and Land Trade Routes of India',
          caseStudy: { intro: 'Imagine you order a smartphone online — it likely arrives by air cargo through Delhi or Mumbai airport within days.',
            decisions: [{ prompt: 'Name the two primary modes through which most of India\'s foreign trade is carried, and identify the neighbouring countries connected.', options: [
                { text: 'Correct answer: Most of India\'s foreign trade is carried through **sea and air routes**', outcome: 'Correct answer: Most of India\'s foreign trade is carried through **sea and air routes**.' },
                { text: 'land and sea', outcome: 'Not quite — **Students think "land routes" means only the Attari-Wagah border (India-Pakistan) because it\'s.', reveals: 'students-think-land-routes-means' },
                { text: 'land routes', outcome: 'Not quite — **Students think "land routes" means only the Attari-Wagah border (India-Pakistan) because it\'s.', reveals: 'students-think-land-routes-means' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_010', title: 'Trade Organisations: WTO and India\'s Role',
          scaffold: { problem: 'India imposes a 10% Basic Customs Duty (BCD) on imported solar cells and modules.',
            steps: [
            { text: 'Identify the measure — BCD 10% on solar cells (HS 8541) + Domestic Content Requirement (DCR) mandating use.' },
            { text: 'Check tariff binding — India\'s WTO schedule binds solar cells at 0% (ITA-1 product).' },
            { text: 'Check National Treatment — DCR treats imported cells less favourably than domestic cells for access to government.' },
            { text: 'Evaluate defences — Article XX(j): "essential products" — Panel/Appellate Body (AB) in prior cases (e.g., China-Raw.' },
            { text: 'Apply AB precedent (US-Gasoline, Brazil-Retreaded Tyres) — exceptions under Article XX require *necessity* and.' },
            { text: 'Conclusion — India lost at Panel (2016) and AB (2018); implemented ruling by removing DCR.', faded: true, blankAnswer: 'The 10% BCD violates India\'s ITA-1 zero-binding; the DCR.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_011', title: 'Free Trade and Globalisation: Impact on Indian Economy',
          scaffold: { problem: 'Using Table 8.1, calculate the compound annual growth rate (CAGR) of India\'s total trade (exports + imports) from 2004-05 to 2021-22.',
            steps: [
            { text: 'Identify total trade in base year (2004-05): Exports 3,75,340 + Imports 5,01,065 = 8,76,405 crore.' },
            { text: 'Identify total trade in end year (2021-22): Exports 31,47,021 + Imports 45,72,775 = 77,19,796 crore.' },
            { text: 'Determine number of years: 2021-22 minus 2004-05 = 17 years.' },
            { text: 'Apply CAGR formula: (End Value / Start Value)^(1/n) - 1 = (77,19,796 / 8,76,405)^(1/17) - 1.' },
            { text: 'Calculate ratio = 8.81; 8.81^(1/17) ≈ 1.136; CAGR ≈ 13.6% per annum.' },
            { text: 'Interpret: A 13.6% annual growth in total trade volume over 17 years far exceeds GDP growth (~6-7%), indicating trade.', faded: true, blankAnswer: 'CAGR ≈ 13.6% per annum. This signifies that India\'s trade.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup founder at your incubation cell celebrates signing one bilateral trade deal: \'Zero-duty access to that country — our export problem is solved, and it\'s so much faster than waiting for some WTO round.\'',
            decisions: [{ prompt: 'What should she know about bilateral vs multilateral trade before celebrating?', options: [
                { text: 'Bilateral deals buy speed and depth but create preferential margins that divert trade and a \'spaghetti bowl\' of rules of origin for every new partner — and when a dispute comes, only the multilateral system offers standing enforcement, so it\'s a complement, not a solution.', outcome: 'The chapter\'s distinction is architectural: two-party agreements tailor concessions but multiply compliance rules and can pull imports away from more efficient non-partner suppliers — trade diversion the headline tariff hides.' },
                { text: 'She\'s right — a signed bilateral agreement is a WTO outcome delivered sooner, full stop.', outcome: 'Bilateral isn\'t a faster mini-WTO: it can carry WTO-plus obligations like data flows and IP that multilateral rounds deliberately avoid, and its ad hoc panels lack the appellate weight WTO rulings historically carried.', reveals: 'bilateral-is-mini-wto' },
                { text: 'Warn her that any preferential deal is illegal under the WTO\'s non-discrimination rule.', outcome: 'Over-correction — the multilateral framework permits notified free-trade agreements; the real issue is proliferation of divergent rules and asymmetric obligations, not legality.', reveals: 'ftas-violate-mfn' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_16_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue trade as geography — uneven resources meeting routes — and separate volume logic from value logic like a real analyst.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_007', difficulty: 'standard',
          question: 'The changing pattern of India\'s foreign trade since 1991 refers to the.',
          hint: 'If stuck, review c11_geo_cbse_20_008 focusing on "New Industrial Policy 1991: key.',
          misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage growth of India\'s total foreign trade (exports + imports) between 1950-51 and 2020-21 using the NCERT figures: 1950-51 =.', answer: 'Total trade grew from Rs 1,214 crore to Rs 77,19,796 crore',
                  options: ['Total trade grew from Rs 1,214 crore to Rs 77,19,796 crore', 'liberalisation caused India to import more foodgrains'],
                  hint: 'If stuck, review c11_geo_cbse_20_008 focusing on "New Industrial Policy 1991: key features" and.',
                  misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued after the 1970s.' },
                { id: 'b', prompt: 'Explain why the share of \'Agriculture and allied products\' in India\'s exports fell from 12.6% (2015-16) to 11.9% (2021-22) while \'Crude and petroleum products\'.', answer: 'Agriculture share declined due to low value addition, international competition',
                  options: ['Agriculture share declined due to low value addition, international competition', 'low production', 'crude oil exports', 'liberalisation caused India to import more foodgrains'],
                  hint: 'If stuck, review c11_geo_cbse_20_008 focusing on "New Industrial Policy 1991: key features" and.',
                  misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued after the 1970s.' },
                { id: 'c', prompt: 'Using Table 8.4, calculate the absolute change (in percentage points) in the share of \'Fuel (Coal, POL)\' in India\'s import basket between 2015-16 and 2021-22.', answer: 'Fuel share: 2015-16 = 25.4%',
                  options: ['Fuel share: 2015-16 = 25.4%', 'renewable failure', 'liberalisation caused India to import more foodgrains'],
                  hint: 'If stuck, review c11_geo_cbse_20_008 focusing on "New Industrial Policy 1991: key features" and.',
                  misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued after the 1970s.' },
                { id: 'd', prompt: 'Compare the regional direction of India\'s imports in 2016-17 vs 2021-22 using Table 8.6.', answer: 'Asia and ASEAN: 2016-17 = Rs 15,44,520 crore',
                  options: ['Asia and ASEAN: 2016-17 = Rs 15,44,520 crore', 'liberalisation caused India to import more foodgrains'],
                  hint: 'If stuck, review c11_geo_cbse_20_008 focusing on "New Industrial Policy 1991: key features" and.',
                  misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued after the 1970s.' }
          ],
            remediations: { 'liberalisation-caused-india-to-import': { steps: ['Revisit c11_geo_cbse_20_008 (Industrial Policy and Liberalisation Since 1991) to re-learn the sequence: delicensing →.', 'Then re-read NCERT Tables 8.2 and 8.4 side-by-side, highlighting each row\'s 2015-16 vs 2021-22 change with a coloured.', 'Finally, attempt Diagnostic Q2 and Q3 again with the tables open.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s persistent trade deficit since 1991 is primarily caused by non-essential luxury imports." Use Table 8.5 (principal imports.', answer: 'The statement is false',
                  options: ['The statement is false', 'liberalisation caused India to import more foodgrains'],
                  hint: 'If stuck, review c11_geo_cbse_20_008 focusing on "New Industrial Policy 1991: key features" and.',
                  misconception: 'Students think "liberalisation caused India to import more foodgrains" — actually, foodgrain imports were discontinued after the 1970s.' }
          ],
            remediations: { 'liberalisation-caused-india-to-import': { steps: ['Revisit c11_geo_cbse_20_008 (Industrial Policy and Liberalisation Since 1991) to re-learn the sequence: delicensing →.', 'Then re-read NCERT Tables 8.2 and 8.4 side-by-side, highlighting each row\'s 2015-16 vs 2021-22 change with a coloured.', 'Finally, attempt Diagnostic Q2 and Q3 again with the tables open.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_008', difficulty: 'standard',
          question: 'Sea routes are the established maritime pathways connecting Indian ports.',
          hint: 'Revisit c11_geo_cbse_09_007 (Coastal Plains) for the geomorphology, and.',
          misconception: 'Students memorise port names as a list but cannot explain *why* a specific port handles a specific cargo.',
          parts: [
                { id: 'a', prompt: 'Name the only major port on India\'s east coast that is a land-locked harbour connected to the sea by a channel cut through solid rock and sand, and state its.', answer: 'Visakhapatnam Port (Andhra Pradesh)',
                  options: ['Visakhapatnam Port (Andhra Pradesh)', 'harbour', 'natural harbour'],
                  hint: 'Revisit c11_geo_cbse_09_007 (Coastal Plains) for the geomorphology, and c11_geo_cbse_21_008 (Trade.',
                  misconception: 'Students memorise port names as a list but cannot explain *why* a specific port handles a specific cargo.' },
                { id: 'b', prompt: 'A shipment of iron ore from Bellary-Hospet (Karnataka) is exported to Japan.', answer: 'Port: Mormugao (Goa)',
                  options: ['Port: Mormugao (Goa)', 'harbour', 'natural harbour'],
                  hint: 'Revisit c11_geo_cbse_09_007 (Coastal Plains) for the geomorphology, and c11_geo_cbse_21_008 (Trade.',
                  misconception: 'Students memorise port names as a list but cannot explain *why* a specific port handles a specific cargo.' },
                { id: 'c', prompt: 'Compare the hinterland overlap problem between Mumbai Port and Jawaharlal Nehru Port (JNPT) with that between Kolkata Port and Haldia Port.', answer: 'Mumbai-JNPT: deliberate satellite port creation',
                  options: ['Mumbai-JNPT: deliberate satellite port creation', 'congestion relief', 'harbour', 'natural harbour'],
                  hint: 'Revisit c11_geo_cbse_09_007 (Coastal Plains) for the geomorphology, and c11_geo_cbse_21_008 (Trade.',
                  misconception: 'Students memorise port names as a list but cannot explain *why* a specific port handles a specific cargo.' }
          ],
            remediations: { 'students-memorise-port-names-as': { steps: ['Take an outline map of India. Plot the 12 major ports in RED (west coast) and BLUE (east coast) from north to south.', 'For each port, draw a shaded hinterland zone (pencil) using NCERT\'s listed states — e.g., Kandla → Gujarat, Rajasthan.', 'Overlay railway lines (from Class 11 Transport chapter) connecting hinterland to port.', 'Write one sentence per port: "Port X handles Cargo Y because [geomorphology + hinterland resource + trade route]."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_009', difficulty: 'standard',
          question: 'Air cargo routes in India refer to the network of international and domestic.',
          hint: 'Revise Class 11 Chapter 21 (Transport) for air transport features and Class 6 Chapter 5.',
          misconception: '**Students think "land routes" means only the Attari-Wagah border (India-Pakistan) because it\'s famous.** In reality.',
          parts: [
                { id: 'a', prompt: 'A pharmaceutical company in Hyderabad needs to export temperature-sensitive vaccines to Europe urgently.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'land routes', 'major land trade route', 'Delhi for Hyderabad shipment'],
                  hint: 'Revise Class 11 Chapter 21 (Transport) for air transport features and Class 6 Chapter 5 (India\'s.',
                  misconception: '**Students think "land routes" means only the Attari-Wagah border (India-Pakistan) because it\'s famous.** In reality, **Petrapole-Benapole.' }
          ],
            remediations: { 'students-think-land-routes-means': { steps: ['** Open the **India political map** (NCERT Class 12 Appendix).', '** On same map, mark **6 air cargo hubs** (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata).', '** Make a **2-column table**: Commodity → Best Mode (Air/Land) with reason (value/kg, perishability, neighbour access).', '** Re-attempt Diagnostic Q3 and Q4. If still stuck, revisit **c11_geo_cbse_21_005 (Air Transport)** and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_010', difficulty: 'standard',
          question: 'The World Trade Organization (WTO) is the only global international.',
          hint: 'If stuck on subsidy boxes, revisit Class 11 Economics "Liberalisation" chapter.',
          misconception: 'Students often think "WTO = free trade for all" and that India *opposes* free trade.',
          parts: [
                { id: 'a', prompt: 'Calculate the Aggregate Measurement of Support (AMS) for wheat if: (a) India\'s MSP = ₹2,275/quintal (2023-24), (b) External reference price (1986-88 base).', answer: '**Step 1:** Convert units',
                  options: ['**Step 1:** Convert units', 'WTO = free trade for all', 'India should leave WTO', 'WTO hurts developing countries'],
                  hint: 'If stuck on subsidy boxes, revisit Class 11 Economics "Liberalisation" chapter.',
                  misconception: 'Students often think "WTO = free trade for all" and that India *opposes* free trade.' }
          ],
            remediations: { 'wto-free-trade-for-all': { steps: ['** Revisit c12_geo_cbse_16_003 (Balance of Trade) — calculate India\'s trade deficit in goods vs surplus in services.', '** Review c10_geo_cbse_07_008 (International Trade basics) — distinguish tariff vs non-tariff barriers, MFN vs FTA. **', '** Use WTO\'s "Trade Policy Review" for India (latest: 2020) — read the "Agriculture" and "Services" sections; map each.', '** Re-attempt Diagnostic Questions 2 and 4 — they test the core defensive/offensive asymmetry.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_011', difficulty: 'standard',
          question: 'Free trade refers to the unrestricted exchange of goods and services between.',
          hint: 'If stuck, review c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since.',
          misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all.',
          parts: [
                { id: 'a', prompt: 'Explain why the share of petroleum products in India\'s imports increased from 25.4% (2015-16) to 31.6% (2021-22) despite efforts to promote renewable energy.', answer: 'The rise reflects growing industrialisation and rising energy demand',
                  options: ['The rise reflects growing industrialisation and rising energy demand', 'more vehicles', 'trade deficit', 'economic loss'],
                  hint: 'If stuck, review c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since 1991) for the.',
                  misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all sectors equally.' },
                { id: 'b', prompt: 'Using Table 8.2, calculate the percentage point change in the share of manufactured goods in India\'s exports between 2015-16 and 2021-22.', answer: 'Step 1: Identify values',
                  options: ['Step 1: Identify values', 'trade deficit', 'economic loss'],
                  hint: 'If stuck, review c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since 1991) for the.',
                  misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all sectors equally.' }
          ],
            remediations: { 'students-often-equate-free-trade': { steps: ['If the misconception persists: (1) Revisit node c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since.', '(2) Use Table 8.4 to calculate the share of "strategic imports" (petroleum, capital goods, fertilisers) vs.', 'consumer goods — note that over 60% of imports are inputs, not final consumption.', '(3) Map the hinterlands of JNPT and Mundra (node 008) to see how port-led development created export clusters, proving.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
