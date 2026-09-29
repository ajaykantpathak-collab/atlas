import type { SimDef } from '../../engine/types';
import C12_GeoInternationalTradeCBSESim from '../../../simulations/c6_12_new/C12_GeoInternationalTradeCBSESim';

/** v3 wrapped master — C12_GeoInternationalTradeCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geointernationaltradecbsesim: SimDef = {
    id: 'v3w_c12_geointernationaltradecbsesim',
    title: 'International Trade: Definition, Basis and Importance',
    subtitle: 'This node covers the definition, basis (resource distribution, comparative advantage,.',
    classLevel: 12, subject: 'science', topic: 'International Trade: Definition, Basis and Importance',
    chapters: [],
    nodeIds: ['c12_geo_cbse_16_001', 'c12_geo_cbse_16_004', 'c12_geo_cbse_16_009', 'c12_geo_cbse_16_010', 'c12_geo_cbse_16_011', 'c12_geo_cbse_08_003', 'c12_geo_cbse_08_004', 'c12_geo_cbse_08_011', 'c12_geo_cbse_15_007', 'c12_geo_cbse_15_012', 'c12_geo_cbse_07_002', 'c12_geo_cbse_16_002', 'c12_geo_cbse_16_003', 'c12_geo_cbse_16_005', 'c12_geo_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real-world observation: ask the student to check the label on their shirt, phone, or a packet of.', goal: 'Master International Trade: Definition, Basis and Importance.' },
    discovery: {
        question: 'India\'s international trade was worth Rs. 1,214 crore in 1950-51 and Rs. 77,19,796 crore in 2020-21. Calculate the percentage growth.',
        options: ['Correct calculation: ((77,19,796 - 1,214) / 1,214) × 100 = 6,35,830.5% growth', 'globalisation', 'international trade'],
        answer: 'Correct calculation: ((77,19,796 - 1,214) / 1,214) × 100 = 6,35,830.5% growth',
        hook: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT,.',
    },
    teaching: [
        { title: 'International trade is the exchange of.', text: 'International trade is the exchange of goods, services, and capital across national borders driven by the uneven distribution of natural resources, differences in climate, technology, labour skills,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_001', title: 'International trade is the exchange of.',
          scaffold: { problem: 'Using NCERT Table 8.1 data, calculate the compound annual growth rate (CAGR) of India\'s total trade (exports + imports) from 1950-51 (Rs.',
            steps: [
            { text: 'Identify the formula for CAGR: (Ending Value / Beginning Value)^(1/n) - 1, where n = number of years.' },
            { text: 'Calculate total trade for base year: The text gives "external trade was worth Rs.' },
            { text: 'Compute ratio: 77,19,796 / 1,214 = 6,358.32.' },
            { text: 'Take 70th root: 6,358.32^(1/70) = e^(ln(6358.32)/70) = e^(8.757/70) = e^0.1251 = 1.1332.' },
            { text: 'Subtract 1: 1.1332 - 1 = 0.1332 = 13.32% CAGR.' },
            { text: 'Interpret: A 13.3% annual compound growth over 70 years means India\'s trade doubled every ~5.3 years (Rule of 70:.', faded: true, blankAnswer: 'CAGR = 13.32% per annum. This implies India\'s trade volume.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_004', title: 'Direction of trade refers to the.',
          scaffold: { problem: 'Using NCERT Table 8.6, determine which region showed the highest absolute growth in import value (in ₹ crore) between 2016-17 and 2021-22,.',
            steps: [
            { text: 'Extract import values for all five regions for both years from Table 8.6.' },
            { text: 'Compute absolute growth = Value_2021-22 - Value_2016-17 for each region.' },
            { text: 'Identify the region with maximum absolute growth.' },
            { text: 'Calculate growth rate = (Absolute Growth / Value_2016-17) × 100 for that region.' },
            { text: 'Interpret the result in context of India\'s trade policy.', faded: true, blankAnswer: 'Asia-ASEAN: 29,18,577 - 15,44,520 = 13,74,057 crore growth;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_009', title: 'Air cargo routes in India refer to the.',
          scaffold: { problem: '** A floriculture farmer in Pune (Maharashtra) wants to export roses to the Netherlands.',
            steps: [
            { text: 'Identify commodity characteristics — perishable, high value/kg, time-sensitive → requires **air cargo**.' },
            { text: 'Locate nearest major international cargo airport from textbook list — **Mumbai (Chhatrapati Shivaji Maharaj.' },
            { text: 'Check infrastructure — Mumbai airport has **cold-chain facilities (perishable cargo centre)**, customs clearance for.' },
            { text: 'Compare alternatives — Pune airport (Lohegaon) is closer but **not in textbook\'s 25 major airports list**; limited.' },
            { text: 'Verify — Mumbai handles ~40% of India\'s air cargo; Netherlands is top destination for Indian floriculture.', faded: true, blankAnswer: '** Export via Mumbai airport by air cargo. Justification:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_010', title: 'The World Trade Organization (WTO) is.',
          scaffold: { problem: 'India imposes a 10% Basic Customs Duty (BCD) on imported solar cells and modules.',
            steps: [
            { text: 'Identify the measure — BCD 10% on solar cells (HS 8541) + Domestic Content Requirement (DCR) mandating use of.' },
            { text: 'Check tariff binding — India\'s WTO schedule binds solar cells at 0% (ITA-1 product).' },
            { text: 'Check National Treatment — DCR treats imported cells less favourably than domestic cells for access to government.' },
            { text: 'Evaluate defences — Article XX(j): "essential products" — Panel/Appellate Body (AB) in prior cases (e.g., China-Raw.' },
            { text: 'Apply AB precedent (US-Gasoline, Brazil-Retreaded Tyres) — exceptions under Article XX require *necessity* and.' },
            { text: 'Conclusion — India lost at Panel (2016) and AB (2018); implemented ruling by removing DCR.', faded: true, blankAnswer: 'The 10% BCD violates India\'s ITA-1 zero-binding; the DCR.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_16_011', title: 'Free trade refers to the unrestricted.',
          scaffold: { problem: 'Using Table 8.1, calculate the compound annual growth rate (CAGR) of India\'s total trade (exports + imports) from 2004-05 to 2021-22.',
            steps: [
            { text: 'Identify total trade in base year (2004-05): Exports 3,75,340 + Imports 5,01,065 = 8,76,405 crore.' },
            { text: 'Identify total trade in end year (2021-22): Exports 31,47,021 + Imports 45,72,775 = 77,19,796 crore.' },
            { text: 'Determine number of years: 2021-22 minus 2004-05 = 17 years.' },
            { text: 'Apply CAGR formula: (End Value / Start Value)^(1/n) - 1 = (77,19,796 / 8,76,405)^(1/17) - 1.' },
            { text: 'Calculate ratio = 8.81; 8.81^(1/17) ≈ 1.136; CAGR ≈ 13.6% per annum.' },
            { text: 'Interpret: A 13.6% annual growth in total trade volume over 17 years far exceeds GDP growth (~6-7%), indicating trade.', faded: true, blankAnswer: 'CAGR ≈ 13.6% per annum. This signifies that India\'s trade.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_003', title: 'Water transport refers to the movement.',
          scaffold: { problem: 'A fertilizer plant at Phulpur (Uttar Pradesh) wants to import 50,000 tonnes of rock phosphate from Jorf Lasfar (Morocco) via ocean and.',
            steps: [
            { text: 'Calculate ocean leg cost (same for both): 50,000 tonnes × $18/tonne = $900,000.' },
            { text: 'Option A rail cost: 50,000 tonnes × 1,100 km × $0.03/tonne-km = $1,650,000.' },
            { text: 'Option A total = $900,000 + $1,650,000 = $2,550,000.' },
            { text: 'Option B barge cost: 50,000 tonnes × 650 km × $0.015/tonne-km = $487,500.' },
            { text: 'Option B road cost: 50,000 tonnes × 150 km × $0.06/tonne-km = $450,000.' },
            { text: 'Option B total = $900,000 + $487,500 + $450,000 = $1,837,500.' },
            { text: 'Compare: Option B saves $712,500 (28% cheaper). Verify: barge+road cheaper than rail for this corridor due to low barge.', faded: true, blankAnswer: 'Option B (Kolkata + NW-1 barge + road) is cheaper at.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_16_004', title: 'Identify each idea',
          dissect: { specimen: 'International Trade: Definition, Basis and Importance', spots: [
            { id: 's1', label: 'International trade is the exchange', prompt: 'Which idea is this? — International trade is the exchange of goods, services, and capital across national.', answer: 'International trade is the exchange', options: ['International trade is the exchange', 'Direction of trade refers to', 'Air cargo routes in India', 'The World Trade Organization WTO'] },
            { id: 's2', label: 'Direction of trade refers to', prompt: 'Which idea is this? — Direction of trade refers to the geographical pattern of a country\'s international trade.', answer: 'Direction of trade refers to', options: ['Direction of trade refers to', 'International trade is the exchange', 'Air cargo routes in India', 'The World Trade Organization WTO'] },
            { id: 's3', label: 'Air cargo routes in India', prompt: 'Which idea is this? — Air cargo routes in India refer to the network of international and domestic airports.', answer: 'Air cargo routes in India', options: ['Air cargo routes in India', 'International trade is the exchange', 'Direction of trade refers to', 'The World Trade Organization WTO'] },
            { id: 's4', label: 'The World Trade Organization WTO', prompt: 'Which idea is this? — The World Trade Organization (WTO) is the only global international organization dealing.', answer: 'The World Trade Organization WTO', options: ['The World Trade Organization WTO', 'International trade is the exchange', 'Direction of trade refers to', 'Air cargo routes in India'] },
            { id: 's5', label: 'Free trade refers to the', prompt: 'Which idea is this? — Free trade refers to the unrestricted exchange of goods and services between countries.', answer: 'Free trade refers to the', options: ['Free trade refers to the', 'International trade is the exchange', 'Direction of trade refers to', 'Air cargo routes in India'] },
            { id: 's6', label: 'Water transport refers to the', prompt: 'Which idea is this? — Water transport refers to the movement of goods and passengers over water bodies —.', answer: 'Water transport refers to the', options: ['Water transport refers to the', 'International trade is the exchange', 'Direction of trade refers to', 'Air cargo routes in India'] }
          ] } }
    ],
    explore: { component: C12_GeoInternationalTradeCBSESim, prompt: 'Explore the interactive — International Trade: Definition, Basis and Importance' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_001', difficulty: 'standard',
          question: 'International trade is the exchange of goods, services, and capital across.',
          hint: 'If stuck on the "why trade?" question, revisit Class 8 c8_geo_ch1_5 (Distribution of.',
          misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT,.',
          parts: [
                { id: 'a', prompt: 'India\'s international trade was worth Rs. 1,214 crore in 1950-51 and Rs. 77,19,796 crore in 2020-21. Calculate the percentage growth.', answer: 'Correct calculation: ((77,19,796 - 1,214) / 1,214) × 100 = 6,35,830.5% growth',
                  options: ['Correct calculation: ((77,19,796 - 1,214) / 1,214) × 100 = 6,35,830.5% growth', 'globalisation', 'international trade'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT, tourism, banking) and.' }
          ],
            remediations: { 'international-trade-means-only-exports': { steps: ['If the student cannot explain the geographical basis of trade, have them revisit Class 8 c8_geo_ch1_5 (Distribution of.', 'Then ask: "Which country has all?" N/A — that is the basis of trade.', 'For port vs harbour confusion, use Class 11 c11_geo_cbse_21_004 (Water Transport) and the NCERT port descriptions: make.', 'Practice until they can distinguish the physical feature (harbour) from the economic facility (port) for all 5.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Air transport\'s share in India\'s international trade volume is negligible, so investing in new airports under UDAN scheme is a.', answer: 'Correct evaluation: The statement is flawed',
                  options: ['Correct evaluation: The statement is flawed', 'international trade', '(natural or artificial sheltered water body)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "international trade" means only exports and imports of goods — they forget services (software, IT, tourism, banking) and.' }
          ],
            remediations: { 'international-trade-means-only-exports': { steps: ['If the student cannot explain the geographical basis of trade, have them revisit Class 8 c8_geo_ch1_5 (Distribution of.', 'Then ask: "Which country has all?" N/A — that is the basis of trade.', 'For port vs harbour confusion, use Class 11 c11_geo_cbse_21_004 (Water Transport) and the NCERT port descriptions: make.', 'Practice until they can distinguish the physical feature (harbour) from the economic facility (port) for all 5.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_004', difficulty: 'standard',
          question: 'Direction of trade refers to the geographical pattern of a country\'s.',
          hint: 'If stuck on regional groupings, revisit c11_geo_cbse_08_005 (India\'s location in Asia).',
          misconception: 'Students believe the USA is India\'s largest trading partner because it is the top *country-level* export destination,.',
          parts: [
                { id: 'a', prompt: 'Explain why Asia-ASEAN is India\'s largest trading region, integrating at least three factors: geographical, economic, and historical.', answer: 'Asia-ASEAN dominates due to: (1) Geographical proximity',
                  options: ['Asia-ASEAN dominates due to: (1) Geographical proximity', 'China is a big economy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the USA is India\'s largest trading partner because it is the top *country-level* export destination, but they miss that.' }
          ],
            remediations: { 'the-usa-is-india-s': { steps: ['Revisit NCERT Table 8.6 — physically cover the 2016-17 column and compute 2021-22 percentage shares for all five.', 'On a world map outline, shade the five regions in different colours and draw arrows proportional to import values.', 'Compare with Table 8.5 (principal import commodities) to link *direction* (West Asia for oil, China for electronics).', 'Re-attempt Diagnostic Question 3 and 4. If percentage calculation errors persist, review arithmetic of percentage share.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the USA is India\'s largest trading partner because it is the top *country-level* export destination,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s growing trade deficit with Asia-ASEAN is a structural concern that requires immediate policy intervention." Use trade.', answer: 'The statement is partially valid but oversimplified',
                  options: ['The statement is partially valid but oversimplified', 'reducing all imports from China'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the USA is India\'s largest trading partner because it is the top *country-level* export destination, but they miss that.' }
          ],
            remediations: { 'the-usa-is-india-s': { steps: ['Revisit NCERT Table 8.6 — physically cover the 2016-17 column and compute 2021-22 percentage shares for all five.', 'On a world map outline, shade the five regions in different colours and draw arrows proportional to import values.', 'Compare with Table 8.5 (principal import commodities) to link *direction* (West Asia for oil, China for electronics).', 'Re-attempt Diagnostic Question 3 and 4. If percentage calculation errors persist, review arithmetic of percentage share.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_009', difficulty: 'standard',
          question: 'Air cargo routes in India refer to the network of international and domestic.',
          hint: 'Revise Class 11 Chapter 21 (Transport) for air transport features and Class 6 Chapter 5.',
          misconception: '**Students think "land routes" means only the Attari-Wagah border (India-Pakistan) because it\'s famous.** In reality,.',
          parts: [
                { id: 'a', prompt: 'A pharmaceutical company in Hyderabad needs to export temperature-sensitive vaccines to Europe urgently.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'land routes', 'major land trade route'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students think "land routes" means only the Attari-Wagah border (India-Pakistan) because it\'s famous.** In reality, **Petrapole-Benapole.' }
          ],
            remediations: { 'students-think-land-routes-means': { steps: ['** Open the **India political map** (NCERT Class 12 Appendix).', '** On same map, mark **6 air cargo hubs** (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata).', '** Make a **2-column table**: Commodity → Best Mode (Air/Land) with reason (value/kg, perishability, neighbour access).', '** Re-attempt Diagnostic Q3 and Q4. If still stuck, revisit **c11_geo_cbse_21_005 (Air Transport)** and.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_010', difficulty: 'standard',
          question: 'The World Trade Organization (WTO) is the only global international.',
          hint: 'If stuck on subsidy boxes, revisit Class 11 Economics "Liberalisation" chapter.',
          misconception: 'Students often think "WTO = free trade for all" and that India *opposes* free trade.',
          parts: [
                { id: 'a', prompt: 'Calculate the Aggregate Measurement of Support (AMS) for wheat if: (a) India\'s MSP = ₹2,275/quintal (2023-24), (b) External reference price (1986-88 base) =.', answer: '**Step 1:** Convert units',
                  options: ['**Step 1:** Convert units', 'WTO = free trade for all', 'India should leave WTO'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "WTO = free trade for all" and that India *opposes* free trade.' }
          ],
            remediations: { 'wto-free-trade-for-all': { steps: ['** Revisit c12_geo_cbse_16_003 (Balance of Trade) — calculate India\'s trade deficit in goods vs surplus in services;.', '** Review c10_geo_cbse_07_008 (International Trade basics) — distinguish tariff vs non-tariff barriers, MFN vs FTA. **', '** Use WTO\'s "Trade Policy Review" for India (latest: 2020) — read the "Agriculture" and "Services" sections; map each.', '** Re-attempt Diagnostic Questions 2 and 4 — they test the core defensive/offensive asymmetry.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "WTO = free trade for all" and that India *opposes* free trade.',
          parts: [
                { id: 'a', prompt: 'Design a 3-point strategy for India to advance its interests at the next WTO Ministerial Conference (MC14), addressing: (a) Permanent solution for Public.', answer: '**Expected answer criteria:** 1',
                  options: ['**Expected answer criteria:** 1', 'WTO = free trade for all', 'India should leave WTO', 'WTO hurts developing countries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "WTO = free trade for all" and that India *opposes* free trade.' }
          ],
            remediations: { 'wto-free-trade-for-all': { steps: ['** Revisit c12_geo_cbse_16_003 (Balance of Trade) — calculate India\'s trade deficit in goods vs surplus in services;.', '** Review c10_geo_cbse_07_008 (International Trade basics) — distinguish tariff vs non-tariff barriers, MFN vs FTA. **', '** Use WTO\'s "Trade Policy Review" for India (latest: 2020) — read the "Agriculture" and "Services" sections; map each.', '** Re-attempt Diagnostic Questions 2 and 4 — they test the core defensive/offensive asymmetry.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_011', difficulty: 'standard',
          question: 'Free trade refers to the unrestricted exchange of goods and services between.',
          hint: 'If stuck, review c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since.',
          misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all.',
          parts: [
                { id: 'a', prompt: 'Explain why the share of petroleum products in India\'s imports increased from 25.4% (2015-16) to 31.6% (2021-22) despite efforts to promote renewable energy.', answer: 'The rise reflects growing industrialisation and rising energy demand',
                  options: ['The rise reflects growing industrialisation and rising energy demand', 'more vehicles', 'trade deficit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all sectors equally.' },
                { id: 'b', prompt: 'Using Table 8.2, calculate the percentage point change in the share of manufactured goods in India\'s exports between 2015-16 and 2021-22.', answer: 'Step 1: Identify values',
                  options: ['Step 1: Identify values', 'trade deficit', 'economic loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all sectors equally.' }
          ],
            remediations: { 'students-often-equate-free-trade': { steps: ['If the misconception persists: (1) Revisit node c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since.', '(2) Use Table 8.4 to calculate the share of "strategic imports" (petroleum, capital goods, fertilisers) vs.', 'consumer goods — note that over 60% of imports are inputs, not final consumption.', '(3) Map the hinterlands of JNPT and Mundra (node 008) to see how port-led development created export clusters, proving.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_16_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all.',
          parts: [
                { id: 'a', prompt: 'Design a policy brief (150 words) for the Commerce Ministry proposing two measures to reduce India\'s trade deficit with Asia and ASEAN while leveraging.', answer: 'A strong brief would: (1) Identify top import categories from Asia (petroleum,',
                  options: ['A strong brief would: (1) Identify top import categories from Asia (petroleum,', 'trade deficit', 'economic loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "free trade" with "zero tariffs on all goods" and assume globalisation automatically benefits all sectors equally.' }
          ],
            remediations: { 'students-often-equate-free-trade': { steps: ['If the misconception persists: (1) Revisit node c12_geo_cbse_16_007 (Changing Pattern of India\'s Foreign Trade Since.', '(2) Use Table 8.4 to calculate the share of "strategic imports" (petroleum, capital goods, fertilisers) vs.', 'consumer goods — note that over 60% of imports are inputs, not final consumption.', '(3) Map the hinterlands of JNPT and Mundra (node 008) to see how port-led development created export clusters, proving.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_003', difficulty: 'standard',
          question: 'Water transport refers to the movement of goods and passengers over water.',
          hint: 'If unable to locate or classify Indian waterways/ports, revisit c11_geo_cbse_21_004 and.',
          misconception: 'Students think “inland water transport is only for bulk goods like coal and sand” and overlook its growing role in.',
          parts: [
                { id: 'a', prompt: 'A bulk carrier loads 150,000 tonnes of iron ore at Port Hedland (Australia) for Qingdao (China).', answer: 'Step 1: Distance = 4,800 nautical miles',
                  options: ['Step 1: Distance = 4,800 nautical miles', 'inland water transport is only for bulk goods like coal and sand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think “inland water transport is only for bulk goods like coal and sand” and overlook its growing role in containerised cargo.' }
          ],
            remediations: { 'inland-water-transport-is-only': { steps: ['Revisit c11_geo_cbse_21_004 (Water Transport: Inland Waterways and Ocean Routes) — focus on the table of India’s.', 'On a physical map of India, trace NW-1 (Ganga), NW-2 (Brahmaputra), NW-3 (Kerala backwaters) and mark seasonal depth.', 'On a world outline map, draw the pre-2024 and post-2024 Europe-Asia routes; calculate the extra distance and time for.', 'Re-attempt Diagnostic Questions 2, 4, and 5 with these maps. If still stuck, review the “Types of Port” section in.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think “inland water transport is only for bulk goods like coal and sand” and overlook its growing role in.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “The Suez Canal’s 2015 expansion (new parallel channel) eliminated the geopolitical risk of chokepoint closure.” Use evidence from.', answer: 'The statement is false',
                  options: ['The statement is false', 'expansion solved congestion, so risk is gone', 'inland water transport is only for bulk goods like coal and sand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think “inland water transport is only for bulk goods like coal and sand” and overlook its growing role in containerised cargo.' }
          ],
            remediations: { 'inland-water-transport-is-only': { steps: ['Revisit c11_geo_cbse_21_004 (Water Transport: Inland Waterways and Ocean Routes) — focus on the table of India’s.', 'On a physical map of India, trace NW-1 (Ganga), NW-2 (Brahmaputra), NW-3 (Kerala backwaters) and mark seasonal depth.', 'On a world outline map, draw the pre-2024 and post-2024 Europe-Asia routes; calculate the extra distance and time for.', 'Re-attempt Diagnostic Questions 2, 4, and 5 with these maps. If still stuck, review the “Types of Port” section in.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
