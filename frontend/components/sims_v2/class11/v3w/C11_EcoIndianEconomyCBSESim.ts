import type { SimDef } from '../../engine/types';
import C11_EcoIndianEconomyCBSESim from '../../../simulations/c6_12_new/C11_EcoIndianEconomyCBSESim';

/** v3 wrapped master — C11_EcoIndianEconomyCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_ecoindianeconomycbsesim: SimDef = {
    id: 'v3w_c11_ecoindianeconomycbsesim',
    title: 'Planning and Five Year Plans: Objectives and Features',
    subtitle: 'This node covers the conceptual foundation of Indian planning: the four goals, the.',
    classLevel: 11, subject: 'economics', topic: 'Planning and Five Year Plans: Objectives and Features',
    chapters: [],
    nodeIds: ['c11_eco_cbse_02_001', 'c11_eco_cbse_01_005', 'c11_eco_cbse_01_012', 'c11_eco_cbse_07_007', 'c11_eco_cbse_03_008', 'c11_eco_cbse_02_003', 'c11_eco_cbse_02_004', 'c11_eco_cbse_02_007', 'c11_eco_cbse_02_008', 'c11_eco_cbse_02_011', 'c11_eco_cbse_01_002', 'c11_eco_cbse_01_011', 'c11_eco_cbse_02_005', 'c11_eco_cbse_02_006', 'c11_eco_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine your family is planning a major home renovation over the next five years.', goal: 'Master Planning and Five Year Plans: Objectives and Features.' },
    discovery: {
        question: 'Compare the impact of railways on (a) village self-sufficiency and (b) volume of India\'s exports.',
        options: ['village self-sufficiency and (', 'exports brought gold into India', 'modernised'],
        answer: 'village self-sufficiency and (',
        hook: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.',
    },
    teaching: [
        { title: 'A Five Year Plan in India is a comprehensive.', text: 'A Five Year Plan in India is a comprehensive policy document formulated by the Planning Commission (now NITI Aayog) that specifies the quantitative targets and qualitative objectives for the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_001', title: 'A Five Year Plan in India is a.',
          scaffold: { problem: 'India\'s real GDP (2011-12 base) was ₹2,24,786 crore in 1950-51 and ₹3,69,500 crore in 1980-81.',
            steps: [
            { text: 'Identify the CAGR formula: g = (GDP_end / GDP_start)^(1/n) - 1.' },
            { text: 'Substitute values: GDP_start = 2,24,786, GDP_end = 3,69,500, n = 30.' },
            { text: 'Compute ratio: 3,69,500 / 2,24,786 = 1.6438.' },
            { text: 'Compute 30th root: 1.6438^(1/30) = e^(ln(1.6438)/30) = e^(0.497/30) = e^0.01657 = 1.0167.' },
            { text: 'g = 1.0167 - 1 = 0.0167 = 1.67% per annum.' },
            { text: 'Rule of 72: Doubling time ≈ 72 / 1.67 ≈ 43 years.' },
            { text: 'Economic interpretation: At 1.67% annual growth, per capita income (with ~2% population growth) barely rose — this.', faded: true, blankAnswer: 'CAGR = 1.67% per annum; Doubling time ≈ 43 years.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_005', title: 'Commercialisation of crops refers to.',
          scaffold: { problem: 'In a Bengal district in 1890, total cropped area was 500,000 hectares.',
            steps: [
            { text: 'Calculate Commercialisation Index 1890 = (Jute Area / Total Cropped Area) × 100 = (120,000 / 500,000) × 100 = 24%' },
            { text: 'Calculate Commercialisation Index 1910 = (180,000 / 500,000) × 100 = 36%' },
            { text: 'Compute annual growth rate of commercialisation index: ((36/24)^(1/20) - 1) × 100 = (1.5^0.05 - 1) × 100 ≈ (1.0205 - 1).' },
            { text: 'Compute rice area decline: (300,000 - 250,000) / 300,000 = 16.7% over 20 years, or ~0.91% annually' },
            { text: 'With population growing 1% annually and rice area falling 0.91%, per capita rice availability declined ~1.9% per year,.', faded: true, blankAnswer: 'Commercialisation Index: 1890 = 24%, 1910 = 36%; Annual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_012', title: 'Infrastructure under colonial rule.',
          scaffold: { problem: 'In 1947, India\'s railway network spanned 53,596 route km. Of this, 60% was broad gauge, 30% metre gauge, and 10% narrow gauge.',
            steps: [
            { text: 'Compute route km for each gauge: Broad = 0.60 × 53,596 = 32,157.6 km; Metre = 0.30 × 53,596 = 16,078.8 km; Narrow =.' },
            { text: 'Compute freight on broad gauge: 0.85 × 90 million = 76.5 million tonnes.' },
            { text: 'Compute freight on metre gauge (assume remaining 15% shared proportionally, but for simplicity take 13% on metre, 2% on.' },
            { text: 'Calculate tonnage per route km: Broad = 76.5e6 / 32,157.6 ≈ 2,379 tonnes/km; Metre = 11.7e6 / 16,078.8 ≈ 728 tonnes/km.' },
            { text: 'Interpret: Broad gauge (built for heavy bulk transport) carried 3.3× more tonnes per km, confirming it served.', faded: true, blankAnswer: 'Broad gauge: ~2,379 tonnes/km; Metre gauge: ~728 tonnes/km..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_007', title: 'Environmental degradation refers to the.',
          scaffold: { problem: 'A thermal power plant in Singrauli (MP) emits 120 tonnes/day of SO2 and 80 tonnes/day of PM2.5. The affected airshed has 2 lakh population.',
            steps: [
            { text: 'Identify the concentration-response coefficients: ΔPM2.5 = 35 μg/m³ → 3.5 increments of 10 μg/m³.' },
            { text: 'Calculate attributable cases: Excess deaths/day = 8 × 2.1% = 0.168 deaths/day.' },
            { text: 'Annualise: Excess deaths/year = 0.168 × 365 = 61.32 ≈ 61 deaths.' },
            { text: 'Monetise mortality: 61 deaths × ₹5 crore/VSL = ₹305 crore/year.' },
            { text: 'Monetise morbidity: 230 admissions × ₹25,000 = ₹57.5 lakh/year.' },
            { text: 'Total annual health cost = ₹305 crore + ₹0.575 crore = ₹305.575 crore ≈ ₹306 crore/year.', faded: true, blankAnswer: '₹306 crore per year (mortality: ₹305 crore, morbidity:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_008', title: 'Globalisation in the Indian context.',
          scaffold: { problem: 'India\'s bound tariff on wheat is 100% (WTO commitment). Applied MFN tariff is 40%. International wheat price (CIF) is ₹1,800/quintal.',
            steps: [
            { text: 'Identify given data — Bound rate = 100%, Applied rate = 40%, P_w = ₹1,800/q, P_d = ₹2,300/q' },
            { text: 'Calculate tariff water = Bound rate - Applied rate = 100% - 40% = 60 percentage points.' },
            { text: 'Calculate border price with applied tariff = P_w × (1 + Applied rate) = 1800 × 1.40 = ₹2,520/q.' },
            { text: 'Calculate NPR = [(P_d - P_w) / P_w] × 100 = [(2300 - 1800) / 1800] × 100 = 27.8%.' },
            { text: 'Calculate implicit tariff equivalent = [(P_d - P_w) / P_w] × 100 = 27.8% (same as NPR here since no QR).' },
            { text: 'WTO compliance check — Applied rate (40%) ≤ Bound rate (100%), so no violation.', faded: true, blankAnswer: '(a) Tariff water = 60 pp, (b) Border price = ₹2,520/q, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_02_003', title: 'The Mahalanobis Model, implemented in.',
          scaffold: { problem: 'The Second Plan document projected that domestic production of machinery would meet 75% of investment goods demand by 1960-61.',
            steps: [
            { text: 'Identify the target domestic production of machinery = 75% of total investment goods demand = 0.75 × ₹1,200 crore =.' },
            { text: 'Recognize that this ₹900 crore is the *annual output* (flow) of the heavy industry sector in 1960-61.' },
            { text: 'Apply the capital-output ratio (v = 3) for heavy industry: Capital Stock (K) = v × Annual Output (Y).' },
            { text: 'Calculate required capital stock: K = 3 × ₹900 crore = ₹2,700 crore.' },
            { text: 'Interpret: The Second Plan needed to build a heavy industry capital stock of ₹2,700 crore by 1960-61 to achieve the.', faded: true, blankAnswer: '₹2,700 crore' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_01_005', title: 'Identify each idea',
          dissect: { specimen: 'Planning and Five Year Plans: Objectives and Features', spots: [
            { id: 's1', label: 'A Five Year Plan in', prompt: 'Which idea is this? — A Five Year Plan in India is a comprehensive policy document formulated by the Planning.', answer: 'A Five Year Plan in', options: ['A Five Year Plan in', 'Commercialisation of crops refers to', 'Infrastructure under colonial rule refers', 'Environmental degradation refers to the'] },
            { id: 's2', label: 'Commercialisation of crops refers to', prompt: 'Which idea is this? — Commercialisation of crops refers to the structural shift in Indian agriculture under.', answer: 'Commercialisation of crops refers to', options: ['Commercialisation of crops refers to', 'A Five Year Plan in', 'Infrastructure under colonial rule refers', 'Environmental degradation refers to the'] },
            { id: 's3', label: 'Infrastructure under colonial rule refers', prompt: 'Which idea is this? — Infrastructure under colonial rule refers to the basic physical and organizational.', answer: 'Infrastructure under colonial rule refers', options: ['Infrastructure under colonial rule refers', 'A Five Year Plan in', 'Commercialisation of crops refers to', 'Environmental degradation refers to the'] },
            { id: 's4', label: 'Environmental degradation refers to the', prompt: 'Which idea is this? — Environmental degradation refers to the deterioration of environmental quality through.', answer: 'Environmental degradation refers to the', options: ['Environmental degradation refers to the', 'A Five Year Plan in', 'Commercialisation of crops refers to', 'Infrastructure under colonial rule refers'] },
            { id: 's5', label: 'Globalisation in the Indian context', prompt: 'Which idea is this? — Globalisation in the Indian context refers to the systematic integration of the domestic.', answer: 'Globalisation in the Indian context', options: ['Globalisation in the Indian context', 'A Five Year Plan in', 'Commercialisation of crops refers to', 'Infrastructure under colonial rule refers'] },
            { id: 's6', label: 'The Mahalanobis Model implemented in', prompt: 'Which idea is this? — The Mahalanobis Model, implemented in India\'s Second Five Year Plan (1956-61), is a.', answer: 'The Mahalanobis Model implemented in', options: ['The Mahalanobis Model implemented in', 'A Five Year Plan in', 'Commercialisation of crops refers to', 'Infrastructure under colonial rule refers'] }
          ] } }
    ],
    explore: { component: C11_EcoIndianEconomyCBSESim, prompt: 'Explore the interactive — Planning and Five Year Plans: Objectives and Features' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_001', difficulty: 'standard',
          question: 'A Five Year Plan in India is a comprehensive policy document formulated by the.',
          hint: 'If stuck, revisit c9_eco_ch1_1 (Scarcity) and c9_eco_ch1_3 (Opportunity Cost) to recall.',
          misconception: 'Students believe the four goals (growth, modernisation, self-reliance, equity) were pursued simultaneously with equal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Five Year Plan in India is a comprehensive policy document formulated by the Planning',
                  options: ['A Five Year Plan in India is a comprehensive policy document formulated by the Planning', 'Commercialisation of crops refers to the structural shift in Indian agriculture under', 'Infrastructure under colonial rule refers to the basic physical and organizational', 'Environmental degradation refers to the deterioration of environmental quality through'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the four goals (growth, modernisation, self-reliance, equity) were pursued simultaneously with equal weight in every plan.' }
          ],
            remediations: { 'the-four-goals-growth': { steps: ['Re-read the NCERT paragraph: \'It will be unrealistic to expect all the goals of a plan to be given equal importance in.', 'Create a timeline: Plan I (Agri/Growth) → Plan II (Industry/Modernisation+Self-reliance) → Plan III (Balance) → Plan.', 'For each plan, identify the *binding constraint* (food, capital goods, foreign exchange, poverty) and which goal was.', 'Practice the board-style question: \'Explain why the goal of self-reliance was emphasised in the first seven plans but.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_005', difficulty: 'standard',
          question: 'Commercialisation of crops refers to the structural shift in Indian agriculture.',
          hint: 'Review Node 004 (Land Revenue Systems) focusing on revenue fixation methods, peasant.',
          misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them,".',
          parts: [
                { id: 'a', prompt: 'Compare the impact of commercialisation on jute cultivators in Bengal versus cotton cultivators in western India (Maharashtra/Gujarat), considering land tenure.', answer: 'Jute in Bengal (zamindari): Cultivators were tenants-at-will with no land rights',
                  options: ['Jute in Bengal (zamindari): Cultivators were tenants-at-will with no land rights', 'farmers started selling crops in markets instead of consuming them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them," implying a voluntary,.' }
          ],
            remediations: { 'commercialisation-means-farmers-started-selling': { steps: ['Revisit Node 004 (land revenue systems) to understand how zamindari/ryotwari created cash revenue imperatives.', 'For each crop, identify the specific coercive mechanism: indigo = tinkathia + dadon; cotton = moneylender advance +.', 'Calculate the "terms of trade" for each: peasant sale price vs.', 'Trace how revenue + debt + low price = no surplus for food purchase.', 'Link to famine data (Node 010) showing mortality peaks in commercialised regions.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Commercialisation of agriculture integrated India into the global economy and therefore laid the foundation for modern agricultural.', answer: 'The claim is analytically flawed',
                  options: ['The claim is analytically flawed', 'farmers started selling crops in markets instead of consuming them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them," implying a voluntary,.' },
                { id: 'b', prompt: 'Compare the impact of commercialisation on jute cultivators in Bengal versus cotton cultivators in western India (Maharashtra/Gujarat), considering land tenure.', answer: 'Jute in Bengal (zamindari): Cultivators were tenants-at-will with no land rights',
                  options: ['Jute in Bengal (zamindari): Cultivators were tenants-at-will with no land rights', 'farmers started selling crops in markets instead of consuming them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them," implying a voluntary,.' }
          ],
            remediations: { 'commercialisation-means-farmers-started-selling': { steps: ['Revisit Node 004 (land revenue systems) to understand how zamindari/ryotwari created cash revenue imperatives.', 'For each crop, identify the specific coercive mechanism: indigo = tinkathia + dadon; cotton = moneylender advance +.', 'Calculate the "terms of trade" for each: peasant sale price vs.', 'Trace how revenue + debt + low price = no surplus for food purchase.', 'Link to famine data (Node 010) showing mortality peaks in commercialised regions.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_012', difficulty: 'standard',
          question: 'Infrastructure under colonial rule refers to the basic physical and.',
          hint: 'If stuck, revisit the *Drain of Wealth* node (c11_eco_cbse_01_009) and the.',
          misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.',
          parts: [
                { id: 'a', prompt: 'Using the data below, calculate the approximate percentage of India\'s railway network that served direct colonial extraction purposes if 80% of freight traffic.', answer: 'Step 1: Identify the proxy',
                  options: ['Step 1: Identify the proxy', 'modernised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' },
                { id: 'b', prompt: 'Compare the impact of railways on (a) village self-sufficiency and (b) volume of India\'s exports.', answer: 'village self-sufficiency and (',
                  options: ['village self-sufficiency and (', 'exports brought gold into India', 'modernised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' }
          ],
            remediations: { 'because-the-british-built-a': { steps: ['If a student holds this misconception, do this 3-step remediation: 1.', '**Map Exercise**: On an outline map of India, plot the major railway lines as of 1947.', 'Observe clustering around ports (Bombay, Calcutta, Madras) and mineral belts (Jharia, Raniganj) — not population.', '**Data Comparison**: Compare per capita railway route length in 1947 (≈0.15 km per 1000 people) with that in Britain or.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "The British administration in India was quite beneficial because it built railways, roads, and telegraphs."', answer: 'The statement is a half-truth',
                  options: ['The statement is a half-truth', 'modernised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' },
                { id: 'b', prompt: 'Construct a two-column table contrasting the *stated purpose* versus the *actual colonial motive* for each of the following: (i) Railways, (ii) Roads, (iii).', answer: '| Infrastructure | Stated / Surface Purpose | Actual Colonial Motive |',
                  options: ['| Infrastructure | Stated / Surface Purpose | Actual Colonial Motive |', 'modernised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' },
                { id: 'c', prompt: 'Compare the impact of railways on (a) village self-sufficiency and (b) volume of India\'s exports.', answer: 'village self-sufficiency and (',
                  options: ['village self-sufficiency and (', 'exports brought gold into India', 'modernised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' }
          ],
            remediations: { 'because-the-british-built-a': { steps: ['If a student holds this misconception, do this 3-step remediation: 1.', '**Map Exercise**: On an outline map of India, plot the major railway lines as of 1947.', 'Observe clustering around ports (Bombay, Calcutta, Madras) and mineral belts (Jharia, Raniganj) — not population.', '**Data Comparison**: Compare per capita railway route length in 1947 (≈0.15 km per 1000 people) with that in Britain or.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_007', difficulty: 'standard',
          question: 'Environmental degradation refers to the deterioration of environmental quality.',
          hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) and c11_eco_cbse_07_005.',
          misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT states "70% of water in India is polluted" leads to "increased incidence of water-borne diseases" AND "rising health expenditure" — trace.', answer: 'Pollutants (industrial effluents, sewage, agricultural runoff) → contaminate',
                  options: ['Pollutants (industrial effluents, sewage, agricultural runoff) → contaminate', 'diseases increase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).' }
          ],
            remediations: { 'environmental-health-costs-are-only': { steps: ['Re-read NCERT Box 7.1 (Global Warming) and Box 7.2 (Ozone Depletion) — list every health outcome mentioned (skin.', 'For each outcome, ask: "What does this cost the individual? The household? The government?', 'Use the "Work These Out" table in NCERT (p.117) — fill in Air/Water/Noise pollution diseases, then assign a cost type.', 'Calculate the total cost of YOUR household\'s averting expenditure last month (RO water, masks, medicines for.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The opportunity cost of environmental degradation is zero for a poor household that relies on firewood for cooking because they have.', answer: 'The statement is false',
                  options: ['The statement is false', 'no monetary payment', 'zero opportunity cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).' }
          ],
            remediations: { 'environmental-health-costs-are-only': { steps: ['Re-read NCERT Box 7.1 (Global Warming) and Box 7.2 (Ozone Depletion) — list every health outcome mentioned (skin.', 'For each outcome, ask: "What does this cost the individual? The household? The government?', 'Use the "Work These Out" table in NCERT (p.117) — fill in Air/Water/Noise pollution diseases, then assign a cost type.', 'Calculate the total cost of YOUR household\'s averting expenditure last month (RO water, masks, medicines for.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_008', difficulty: 'standard',
          question: 'Globalisation in the Indian context refers to the systematic integration of the.',
          hint: 'Revisit Class 10 Ch4 Globalisation nodes (c10_eco_cbse_04_003 to 04_005) and Class 11.',
          misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum*.',
          parts: [
                { id: 'a', prompt: 'India agreed to reduce its bound tariff rate on industrial goods from an average of 100% (1990) to 40% by 2005 under WTO.', answer: 'Tariff water = Bound rate (40%) - Applied rate (15%) = 25 percentage points',
                  options: ['Tariff water = Bound rate (40%) - Applied rate (15%) = 25 percentage points', 'water is 15%', 'it doesn\'t matter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' }
          ],
            remediations: { 'wto-forces-india-to-eliminate': { steps: ['Distinguish bound vs applied tariff using India\'s Tariff Schedule (ITC-HS) — pick 5 items, find bound rate (WTO IDB).', 'Map India\'s agricultural subsidies by box colour using Economic Survey data — classify fertiliser, power, irrigation,.', 'Read WTO dispute DS503 (US — Countervailing Measures on Indian Steel) to see how India defended export subsidies under.', 'Re-attempt Diagnostic Q2 and Q5 with this data.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum*.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "India\'s trade liberalisation under WTO has been asymmetric—developed countries maintained high agricultural subsidies and non-tariff.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'WTO forces India to eliminate all tariffs and subsidies', 'liberalisation commitments', 'zero tariffs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' },
                { id: 'b', prompt: 'Design a trade policy response for India if the EU imposes a Carbon Border Adjustment Mechanism (CBAM) on steel/aluminium imports from 2026, arguing it.', answer: 'legal basis at WTO, (',
                  options: ['legal basis at WTO, (', 'WTO forces India to eliminate all tariffs and subsidies', 'liberalisation commitments', 'zero tariffs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' }
          ],
            remediations: { 'wto-forces-india-to-eliminate': { steps: ['Distinguish bound vs applied tariff using India\'s Tariff Schedule (ITC-HS) — pick 5 items, find bound rate (WTO IDB).', 'Map India\'s agricultural subsidies by box colour using Economic Survey data — classify fertiliser, power, irrigation,.', 'Read WTO dispute DS503 (US — Countervailing Measures on Indian Steel) to see how India defended export subsidies under.', 'Re-attempt Diagnostic Q2 and Q5 with this data.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_003', difficulty: 'standard',
          question: 'The Mahalanobis Model, implemented in India\'s Second Five Year Plan (1956-61),.',
          hint: 'Revisit c11_eco_cbse_02_001 (goals of planning) and c11_eco_cbse_02_002 (First Plan) —.',
          misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture.',
          parts: [
                { id: 'a', prompt: 'In the Second Plan, total public sector outlay was ₹4,800 crore.', answer: 'Step 1: Total plan outlay = ₹4,800 crore',
                  options: ['Step 1: Total plan outlay = ₹4,800 crore', 'ignored agriculture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture vs ~30% to.' },
                { id: 'b', prompt: 'The Industrial Policy Resolution 1956 classified industries into three schedules.', answer: 'Machine tools are the "machines that make machines"',
                  options: ['Machine tools are the "machines that make machines"', 'ignored agriculture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture vs ~30% to.' }
          ],
            remediations: { 'the-mahalanobis-model-ignored-agriculture': { steps: ['Re-read the NCERT Box 2.3 on Mahalanobis and the paragraph on "Self-reliance" (page 21) — note the phrase "avoiding.', 'Draw the two-sector diagram: label axes "Capital Goods" and "Consumer Goods"; draw a production possibility frontier;.', 'Compare with First Plan (node 002) — note First Plan *did* prioritize agriculture (irrigation).', 'Identify the missing link: the model assumed land reforms would raise agricultural productivity *without* large capital.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture.',
          parts: [
                { id: 'a', prompt: 'The Industrial Policy Resolution 1956 classified industries into three schedules.', answer: 'Machine tools are the "machines that make machines"',
                  options: ['Machine tools are the "machines that make machines"', 'ignored agriculture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mahalanobis model "ignored agriculture" because the Second Plan allocated only ~20% to agriculture vs ~30% to.' }
          ],
            remediations: { 'the-mahalanobis-model-ignored-agriculture': { steps: ['Re-read the NCERT Box 2.3 on Mahalanobis and the paragraph on "Self-reliance" (page 21) — note the phrase "avoiding.', 'Draw the two-sector diagram: label axes "Capital Goods" and "Consumer Goods"; draw a production possibility frontier;.', 'Compare with First Plan (node 002) — note First Plan *did* prioritize agriculture (irrigation).', 'Identify the missing link: the model assumed land reforms would raise agricultural productivity *without* large capital.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
