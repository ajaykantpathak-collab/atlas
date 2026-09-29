import type { SimDef } from '../../engine/types';
import C11_EconomicsPlanningEconomicDevelopmentSim from '../../../simulations/c6_12/C11_EconomicsPlanningEconomicDevelopmentSim';

/** v3 wrapped master — C11_EconomicsPlanningEconomicDevelopmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicsplanningeconomicdevelopmentsim: SimDef = {
    id: 'v3w_c11_economicsplanningeconomicdevelopmentsim',
    title: 'Low Level of Economic Development Under British Rule',
    subtitle: 'Covers the macroeconomic consequences of colonial policies on national income,.',
    classLevel: 11, subject: 'economics', topic: 'Low Level of Economic Development Under British Rule',
    chapters: [],
    nodeIds: ['c11_eco_cbse_01_002', 'c11_eco_cbse_01_007', 'c11_eco_cbse_01_012', 'c11_eco_cbse_08_004', 'c11_eco_cbse_02_001', 'c11_eco_cbse_02_009', 'c11_eco_cbse_02_011', 'c11_eco_cbse_04_008', 'c11_eco_cbse_08_001', 'c11_eco_cbse_08_006', 'c11_eco_cbse_08_007', 'c11_eco_cbse_08_008', 'c11_eco_cbse_08_010', 'c11_eco_cbse_08_011', 'c11_eco_cbse_01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are an economic historian examining two snapshots of India: one from 1750 showing thriving.', goal: 'Master Low Level of Economic Development Under British Rule.' },
    discovery: {
        question: 'State the approximate share of the modern industrial sector in India\'s GDP at the time of independence, and name the two industries that dominated this sector.',
        options: ['The modern industrial sector contributed less than 5% to GDP at independence', '15-20%', 'iron and steel'],
        answer: 'The modern industrial sector contributed less than 5% to GDP at independence',
        hook: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing.',
    },
    teaching: [
        { title: 'Low level of economic development under.', text: 'Low level of economic development under British rule refers to the systematic underdevelopment of India\'s economy characterized by stagnant per capita income growth (less than 0.5% annually),.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_002', title: 'Low level of economic development under.',
          scaffold: { problem: 'Using V.K.R.V. Rao\'s methodology, estimate India\'s per capita income in 1900-01 given: Net National Product at factor cost = ₹11,500 crore.',
            steps: [
            { text: 'Identify the formula for per capita income: PCI = NNP / Population' },
            { text: 'Calculate 1900-01 PCI: ₹11,500 crore / 238 million = ₹11,500 × 10^7 / 238 × 10^6 = ₹115,000 / 238 = ₹483.19 per annum' },
            { text: 'Calculate 1946-47 PCI (given): ₹265 per annum (note: this shows DECLINE, indicating data issues or different base years)' },
            { text: 'Recognize the anomaly — Rao\'s actual estimate for 1900-01 was ~₹200, for 1946-47 ~₹265.' },
            { text: 'Calculate annual growth rate over 47 years: (265/200)^(1/47) - 1 = (1.325)^(0.02128) - 1 = 1.00606 - 1 = 0.606% ≈ 0.6%.', faded: true, blankAnswer: 'Per capita income grew at approximately 0.6% per annum.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_007', title: 'Modern Industry\'s Limited Growth and.',
          scaffold: { problem: 'In 1939, India\'s cotton textile industry had 200 mills with 10 million spindles. Each spindle required replacement every 8 years.',
            steps: [
            { text: 'Identify the capital good in question — textile spindles are capital goods (machinery components), not consumer goods.' },
            { text: 'Calculate annual replacement demand: 10 million spindles / 8 years = 1.25 million spindles per year.' },
            { text: 'Calculate annual import cost: 1.25 million × ₹15 = ₹18.75 million = ₹1.875 crore.' },
            { text: 'Calculate percentage of output: (₹1.875 crore / ₹120 crore) × 100 = 1.56%.' },
            { text: 'Interpret economically — this 1.56% is a *permanent* foreign exchange leakage; every year, 1.56% of cotton textile.', faded: true, blankAnswer: 'Annual spindle import bill = ₹1.875 crore; Percentage of.' }
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
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_004', title: 'Demographic transition is the.',
          scaffold: { problem: 'Using Table 8.1 data, compute the approximate number of females per 1000 males for India, China, and Pakistan.',
            steps: [
            { text: 'Extract sex ratios from Table 8.1: India 930, China 898, Pakistan 948 (females per 1000 males).' },
            { text: 'Compute deficit from biological norm (952): India deficit = 952 - 930 = 22; China deficit = 952 - 898 = 54; Pakistan.' },
            { text: 'Apply to female population: India female pop ≈ 1428m × (930/1930) ≈ 688m; missing women ≈ 688m × (22/930) ≈ 16.3.' },
            { text: 'Interpret: China\'s massive deficit reflects decades of sex-selective abortion under one-child policy; India\'s deficit.' },
            { text: 'Economic implications: Skewed sex ratios lead to marriage squeeze, trafficking, surplus male labour, and reduced female.', faded: true, blankAnswer: 'India: ~16.3 million missing women; China: ~40.1 million;.' }
            ] } },
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
        { type: 'case', nodeId: 'c11_eco_cbse_02_009', title: 'Import substitution is an.',
          caseStudy: { intro: 'Imagine you run a small Indian bicycle factory in 1965. You see imported bicycles from Japan selling cheaper and better than yours.',
            decisions: [{ prompt: 'Define import substitution strategy and name the two specific policy instruments used to implement it in India during 1950-1990.', options: [
                { text: 'Import substitution is an inward-looking trade strategy that aims to replace imports with', outcome: 'Import substitution is an inward-looking trade strategy that aims to replace imports with domestic.' },
                { text: 'restrictions', outcome: 'Not quite — Students often believe import substitution means "zero imports" or "complete ban on foreign goods.".', reveals: 'import-substitution-means-zero-imports' },
                { text: 'zero imports', outcome: 'Not quite — Students often believe import substitution means "zero imports" or "complete ban on foreign goods.".', reveals: 'import-substitution-means-zero-imports' }
            ] }] } }
    ],
    explore: { component: C11_EconomicsPlanningEconomicDevelopmentSim, prompt: 'Explore the interactive — Low Level of Economic Development Under British Rule' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_002', difficulty: 'standard',
          question: 'Low level of economic development under British rule refers to the systematic.',
          hint: 'Review Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage applications.',
          misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Low level of economic development under British rule refers to the systematic',
                  options: ['Low level of economic development under British rule refers to the systematic', 'Modern Industry\'s Limited Growth and Lopsided Pattern refers to the structural distortion', 'Infrastructure under colonial rule refers to the basic physical and organizational', 'Demographic transition is the historical shift from high birth and death rates to low'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern industry.' }
          ],
            remediations: { 'low-economic-development-means-the': { steps: ['Have student list 5 British-built infrastructures/industries (railways, TISCO, cotton mills, telegraph, ports).', 'For each, ask: "Who primarily benefited? What was the design logic?"', 'Contrast with post-independence First Five Year Plan priorities (irrigation, power, heavy industry, rural roads).', 'Create a two-column table: Colonial Investment vs. Developmental Investment.', 'Student writes 3-sentence synthesis: "British investments were real but served extraction; development requires.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "British rule brought modern infrastructure (railways, telegraph, ports) which laid the foundation for India\'s post-independence.', answer: 'The claim is partially true but misleading',
                  options: ['The claim is partially true but misleading', 'low economic development'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern industry.' },
                { id: 'b', prompt: 'Construct a data table showing the composition of India\'s foreign trade in 1947 versus a hypothetical "development-oriented" trade structure.', answer: 'Actual 1947 (approximate): Exports',
                  options: ['Actual 1947 (approximate): Exports', 'low economic development'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern industry.' }
          ],
            remediations: { 'low-economic-development-means-the': { steps: ['Have student list 5 British-built infrastructures/industries (railways, TISCO, cotton mills, telegraph, ports).', 'For each, ask: "Who primarily benefited? What was the design logic?"', 'Contrast with post-independence First Five Year Plan priorities (irrigation, power, heavy industry, rural roads).', 'Create a two-column table: Colonial Investment vs. Developmental Investment.', 'Student writes 3-sentence synthesis: "British investments were real but served extraction; development requires.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_007', difficulty: 'standard',
          question: 'Modern Industry\'s Limited Growth and Lopsided Pattern refers to the structural.',
          hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10.',
          misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing.',
          parts: [
                { id: 'a', prompt: 'State the approximate share of the modern industrial sector in India\'s GDP at the time of independence, and name the two industries that dominated this sector.', answer: 'The modern industrial sector contributed less than 5% to GDP at independence',
                  options: ['The modern industrial sector contributed less than 5% to GDP at independence', '15-20%', 'iron and steel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' },
                { id: 'b', prompt: 'Explain why the absence of a capital goods industry made India\'s industrial growth "lopsided" rather than merely "slow."', answer: '"Slow" means low growth rate',
                  options: ['"Slow" means low growth rate', 'low growth rate', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' },
                { id: 'c', prompt: 'Using the data below, calculate the ratio of consumer goods industries to capital goods industries in 1947, and interpret what this ratio implies for.', answer: 'Consumer goods total = 120+45+10+5+3 = ₹183 crore',
                  options: ['Consumer goods total = 120+45+10+5+3 = ₹183 crore', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' }
          ],
            remediations: { 'students-equate-modern-industry-with': { steps: ['Distinguish *product categories* — list 5 consumer goods (cloth, sugar, paper) and 5 capital goods (lathe machines,.', 'Check 1947 production data for each capital good — all zero.', 'Trace *why* — British tariff policy (no protection for capital goods), managing agency system (profits remitted, not.', 'Re-read NCERT para: "Hardly any capital goods industry to help promote further industrialisation." The key phrase is.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the claim: "The British developed India\'s infrastructure (railways, ports, telegraph) which laid the foundation for modern industry."', answer: 'The claim is partially true but misleading',
                  options: ['The claim is partially true but misleading', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' },
                { id: 'b', prompt: 'Construct a counterfactual industrial structure for 1947 India that would have been "balanced" rather than "lopsided." Specify: (a) two additional capital.', answer: 'two additional capital goods industries needed, (',
                  options: ['two additional capital goods industries needed, (', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' }
          ],
            remediations: { 'students-equate-modern-industry-with': { steps: ['Distinguish *product categories* — list 5 consumer goods (cloth, sugar, paper) and 5 capital goods (lathe machines,.', 'Check 1947 production data for each capital good — all zero.', 'Trace *why* — British tariff policy (no protection for capital goods), managing agency system (profits remitted, not.', 'Re-read NCERT para: "Hardly any capital goods industry to help promote further industrialisation." The key phrase is.'] } } },
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
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_004', difficulty: 'standard',
          question: 'Demographic transition is the historical shift from high birth and death rates.',
          hint: 'Review Class 8 Economics Chapter 2 (Dynamics of Population) nodes c8_eco_ch2_6 and.',
          misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off.".',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate annual population increase in millions for India and Pakistan using 2021-23 data: India population 1428 million, growth 0.81%;.', answer: 'Step 1: India increase = 1428 × 0.0081 = 11.57 million',
                  options: ['Step 1: India increase = 1428 × 0.0081 = 11.57 million', 'developed', 'better off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off." They confuse the.' }
          ],
            remediations: { 'a-declining-population-growth-rate': { steps: ['Revisit the demographic transition model diagram (Class 8, c8_eco_ch2_8) and label each country\'s approximate position.', 'Calculate old-age dependency ratio proxies: for China, note fertility 1.2 implies fewer future workers per retiree; for.', 'Read NCERT paragraph on "one-child norm implications" (page 139) and list three economic costs of rapid aging.', 'Practice interpreting population pyramids for each stage using c8_math_ch12_12 (line plots) to visualise age structure.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Pakistan\'s high fertility rate (3.4) and low urbanisation (38%) indicate it is in Stage 2 of demographic transition, so it will.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'developed', 'better off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off." They confuse the.' }
          ],
            remediations: { 'a-declining-population-growth-rate': { steps: ['Revisit the demographic transition model diagram (Class 8, c8_eco_ch2_8) and label each country\'s approximate position.', 'Calculate old-age dependency ratio proxies: for China, note fertility 1.2 implies fewer future workers per retiree; for.', 'Read NCERT paragraph on "one-child norm implications" (page 139) and list three economic costs of rapid aging.', 'Practice interpreting population pyramids for each stage using c8_math_ch12_12 (line plots) to visualise age structure.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_001', difficulty: 'standard',
          question: 'A Five Year Plan in India is a comprehensive policy document formulated by the.',
          hint: 'If stuck, revisit c9_eco_ch1_1 (Scarcity) and c9_eco_ch1_3 (Opportunity Cost) to recall.',
          misconception: 'Students believe the four goals (growth, modernisation, self-reliance, equity) were pursued simultaneously with equal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Five Year Plan in India is a comprehensive policy document formulated by the Planning',
                  options: ['A Five Year Plan in India is a comprehensive policy document formulated by the Planning', 'Low level of economic development under British rule refers to the systematic', 'Modern Industry\'s Limited Growth and Lopsided Pattern refers to the structural distortion', 'Infrastructure under colonial rule refers to the basic physical and organizational'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the four goals (growth, modernisation, self-reliance, equity) were pursued simultaneously with equal weight in every plan.' }
          ],
            remediations: { 'the-four-goals-growth': { steps: ['Re-read the NCERT paragraph: \'It will be unrealistic to expect all the goals of a plan to be given equal importance in.', 'Create a timeline: Plan I (Agri/Growth) → Plan II (Industry/Modernisation+Self-reliance) → Plan III (Balance) → Plan.', 'For each plan, identify the *binding constraint* (food, capital goods, foreign exchange, poverty) and which goal was.', 'Practice the board-style question: \'Explain why the goal of self-reliance was emphasised in the first seven plans but.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_009', difficulty: 'standard',
          question: 'Import substitution is an inward-looking trade strategy where a country.',
          hint: 'Revisit Class 9 market equilibrium (c9_eco_ch2_10) and Class 10 foreign trade.',
          misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India.',
          parts: [
                { id: 'a', prompt: 'Suppose India imposes a 50% tariff on imported cars. The world price of a car is ₹10 lakh.', answer: 'Step 1: World price = ₹10 lakh',
                  options: ['Step 1: World price = ₹10 lakh', 'zero imports', 'complete ban on foreign goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India never banned all.' },
                { id: 'b', prompt: 'Analyze how import substitution affected the following three variables in India during 1950-1990: (a) Industrial sector\'s share in GDP, (b) Variety of.', answer: 'Industrial sector\'s share in GDP, (',
                  options: ['Industrial sector\'s share in GDP, (', 'zero imports', 'complete ban on foreign goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India never banned all.' }
          ],
            remediations: { 'import-substitution-means-zero-imports': { steps: ['Show the student India\'s actual import data - in 1990-91, imports were 8.3% of GDP, not zero.', 'Distinguish between "consumer goods imports" (heavily restricted) and "capital goods/technology imports" (permitted.', 'Use the car example - Premier Padmini and Ambassador were domestic cars, but India still imported CKD (completely.', 'Have the student re-read the NCERT line: "Protection from imports took two forms: tariffs and quotas" - neither is a.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India.',
          parts: [
                { id: 'a', prompt: 'Analyze how import substitution affected the following three variables in India during 1950-1990: (a) Industrial sector\'s share in GDP, (b) Variety of.', answer: 'Industrial sector\'s share in GDP, (',
                  options: ['Industrial sector\'s share in GDP, (', 'zero imports', 'complete ban on foreign goods', 'import substitution means "zero imports" or "complete ban on foreign goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe import substitution means "zero imports" or "complete ban on foreign goods." In reality, India never banned all.' }
          ],
            remediations: { 'import-substitution-means-zero-imports': { steps: ['Show the student India\'s actual import data - in 1990-91, imports were 8.3% of GDP, not zero.', 'Distinguish between "consumer goods imports" (heavily restricted) and "capital goods/technology imports" (permitted.', 'Use the car example - Premier Padmini and Ambassador were domestic cars, but India still imported CKD (completely.', 'Have the student re-read the NCERT line: "Protection from imports took two forms: tariffs and quotas" - neither is a.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
