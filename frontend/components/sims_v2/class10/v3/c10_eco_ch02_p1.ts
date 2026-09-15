import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch02_p1: SimDef = {
    id: 'v3_c10_eco_ch02_p1',
    title: 'Sectors of the Indian Economy · Part 1/2',
    subtitle: 'Sort the whole economy into three buckets — then find the imbalance',
    classLevel: 10, subject: 'economics', topic: 'Sectors of the Indian Economy · Part 1/2',
    chapters: ['c10_eco_ch02'],
    nodeIds: ['c10_eco_cbse_02_001', 'c10_eco_cbse_02_002', 'c10_eco_cbse_02_003', 'c10_eco_cbse_02_004', 'c10_eco_cbse_02_005', 'c10_eco_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economist mapping India\'s production chain', intro: 'Your grandfather\'s village grows the wheat; a mill grinds it; a delivery app brings the pizza. Every rupee you spend lands in one of three sectors.', goal: 'Classify activities by nature of output and analyse why tertiary leads GDP while primary still leads employment.' },
    discovery: {
        question: 'A sugar mill buys sugarcane straight from farmers. Since it works on a primary-sector crop, the mill must be primary sector too — right?',
        options: ['Wrong — the mill transforms cane into sugar, so it\'s secondary; it\'s the output, not the input, that decides the sector', 'Right — anything using farm produce stays in the primary sector', 'It\'s tertiary — because the mill also sells the sugar', 'It splits — half primary for crushing, half secondary for packing'],
        answer: 'Wrong — the mill transforms cane into sugar, so it\'s secondary; it\'s the output, not the input, that decides the sector',
        hook: 'Don\'t classify a job by what goes in — classify it by what comes out. Nature\'s gift is primary, a transformed thing is secondary, a service is tertiary.',
    },
    teaching: [
        { title: 'Primary, Secondary and Tertiary Sectors: Classification and Examples', text: 'The three-sector classification categorizes all economic activities based on the nature of production: the **Primary sector** extracts natural resources (agriculture, mining, fishing); the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace one litre of milk from a cow in a village to a chilled packet in a city store — tag every stage primary, secondary or tertiary — then explain why services rule India\'s GDP but not its jobs.',
        labels: ['Primary, Secondary and Tertiary', 'Comparison of the Three', 'Gross Domestic Product (GDP)', 'Rising Importance of', 'Problems of Unemployment', 'How to Create More'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_001', title: 'Primary, Secondary and Tertiary Sectors: Classification and Examples',
          caseStudy: { intro: 'Imagine you are visiting your grandfather\'s village in Punjab: you see wheat growing in fields (primary), a flour mill grinding that wheat into atta.',
            decisions: [{ prompt: 'Define the Primary sector and give two examples from the Indian context that are NOT agriculture.', options: [
                { text: 'The Primary sector comprises activities that directly use natural resources to produce', outcome: 'The Primary sector comprises activities that directly use natural resources to produce raw.' },
                { text: 'wheat farming and cotton textiles', outcome: 'Not quite — Students believe **"if an activity uses raw materials from the primary sector, it is also primary.', reveals: 'if-an-activity-uses-raw' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_002', title: 'Comparison of the Three Sectors in the Indian Economy',
          scaffold: { problem: 'In 2022-23, India\'s GDP was ₹2,69,49,649 crore. Primary sector contributed ₹49,12,000 crore, Secondary ₹68,22,000 crore, and Tertiary.',
            steps: [
            { text: 'Identify given data — total GDP, sectoral GDPs, total employment, sectoral employments.' },
            { text: 'Calculate GDP shares: Primary = (49,12,000 / 2,69,49,649) × 100 = 18.2%; Secondary = (68,22,000 / 2,69,49,649) × 100.' },
            { text: 'Calculate employment shares: Primary = (24.5 / 56.5) × 100 = 43.4%; Secondary = (13.5 / 56.5) × 100 = 23.9%; Tertiary.' },
            { text: 'Calculate productivity (GDP per worker): Primary = 49,12,000 / 24.5 = ₹2,00,489; Secondary = 68,22,000 / 13.5.' },
            { text: 'Interpret: Tertiary has highest GDP share (56.5%) and highest productivity (₹8.2 lakh) but employs only 32.7%.', faded: true, blankAnswer: '(a) GDP shares: Primary 18.2%, Secondary 25.3%, Tertiary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_003', title: 'Gross Domestic Product (GDP): Contribution of the Three Sectors',
          scaffold: { problem: 'According to Government of India data, in 2021-22, India\'s GDP at factor cost was ₹1,47,35,515 crore.',
            steps: [
            { text: 'Identify the given data: Total GDP = ₹1,47,35,515 crore; Primary VA = ₹27,45,820 crore; Secondary VA = ₹38,56,780 crore.' },
            { text: 'Recall the identity: Total GDP = Primary VA + Secondary VA + Tertiary VA.' },
            { text: 'Calculate Tertiary VA = 1,47,35,515 - (27,45,820 + 38,56,780) = 1,47,35,515 - 66,02,600 = ₹81,32,915 crore.' },
            { text: 'Calculate percentage shares: Primary % = (27,45,820 / 1,47,35,515) × 100 = 18.63%.' },
            { text: 'Verify sum: 18.63% + 26.17% + 55.19% = 99.99% ≈ 100% (rounding difference).', faded: true, blankAnswer: 'Tertiary Sector Value Added = ₹81,32,915 crore; Primary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_004', title: 'Rising Importance of the Tertiary Sector in Production',
          scaffold: { problem: 'In 2011-12, India\'s Tertiary Sector GVA was ₹52.3 lakh crore and Total GVA was ₹81.1 lakh crore (at 2011-12 prices).',
            steps: [
            { text: 'Calculate 2011-12 share = (52.3 / 81.1) × 100 = 64.49%.' },
            { text: 'Calculate 2022-23 share = (98.5 / 160.2) × 100 = 61.49%.' },
            { text: 'Percentage point change = 61.49 - 64.49 = -3.00 percentage points (share declined slightly).' },
            { text: 'Calculate CAGR of Tertiary GVA: (End Value / Start Value)^(1/n) - 1 = (98.5 / 52.3)^(1/11) - 1.' },
            { text: '(1.883)^(0.0909) - 1 ≈ 1.059 - 1 = 0.059 = 5.9% per annum.', faded: true, blankAnswer: 'Share decreased by 3.00 percentage points; Tertiary GVA.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_005', title: 'Problems of Unemployment in the Three Sectors',
          caseStudy: { intro: 'Imagine a village in Punjab where a family of six works on a 2-hectare wheat farm — if two members left, the output would not fall, revealing disguised.',
            decisions: [{ prompt: 'What is disguised unemployment, and in which sector is it most prevalent in India?', options: [
                { text: 'Disguised unemployment occurs when more people are engaged in a task than required, so', outcome: 'Disguised unemployment occurs when more people are engaged in a task than required, so removing.' },
                { text: 'lack of jobs', outcome: 'Not quite — Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real.', reveals: 'unemployment-in-india-is-mainly' },
                { text: 'it\'s in the tertiary sector or confusing it with seasonal unemployment', outcome: 'Not quite — Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real.', reveals: 'unemployment-in-india-is-mainly' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_006', title: 'How to Create More Employment: Government Initiatives',
          caseStudy: { intro: 'Imagine a village in Maharashtra where farmers grow only one rain-fed crop per year, leaving them jobless for 4-5 months.',
            decisions: [{ prompt: 'List any three government initiatives for employment generation mentioned in the NCERT Class 10 textbook (Chapter 2) other than MGNREGA.', options: [
                { text: 'Correct answer: (1) Expanding irrigation facilities to enable multiple cropping, (2)', outcome: 'Correct answer: (1) Expanding irrigation facilities to enable multiple cropping, (2) Providing.' },
                { text: 'giving jobs directly', outcome: 'Not quite — Students believe government creates employment only by directly hiring workers (like MGNREGA).', reveals: 'government-creates-employment-only-by' },
                { text: 'MGNREGA', outcome: 'Not quite — Students believe government creates employment only by directly hiring workers (like MGNREGA).', reveals: 'government-creates-employment-only-by' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school project, a student lists the jobs on her street: a grape farmer, a winery worker who turns grapes into wine, a trucker who delivers the wine, and a guide who shows tourists the vineyard. Her teammate marks them all \'agriculture\' because \'it all starts with grapes.\'',
            decisions: [{ prompt: 'How should the four jobs actually be sorted into sectors?', options: [
                { text: 'Sort by the nature of the output, not the ingredient: the grape farmer is primary (grows a natural product), the winery worker is secondary (manufactures wine from grapes), and both the trucker and the guide are tertiary (they provide transport and tourism services).', outcome: 'The chain also shows interdependence — each sector depends on the one before it, but classification follows what each job produces: raw material, manufactured good, or service.' },
                { text: 'The teammate is right — anything connected to farming counts as the primary sector, so all four jobs are primary.', outcome: 'That erases the distinction the classification is built on — making wine is manufacturing and driving tourists is a service, whatever the original crop.', reveals: 'all-farm-linked-is-primary' },
                { text: 'The trucker and guide belong in the secondary sector because they \'work on\' the wine industry like the winery does.', outcome: 'They produce no physical good — moving and presenting things are services, which places them in the tertiary sector.', reveals: 'services-are-secondary' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Wheat to flour to a delivered pizza: one grain, three sectors. India\'s puzzle is that the sector earning the most isn\'t the one employing the most.',
            decisions: [{ prompt: 'What comes next? Sectors of the Indian Economy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sectors of the Indian Economy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_001', difficulty: 'standard',
          question: 'The three-sector classification categorizes all economic activities based.',
          hint: 'Revise Class 8 Economics Chapter 1: Factors of Production (c8_eco_ch1_2 to c8_eco_ch1_6).',
          misconception: 'Students believe **"if an activity uses raw materials from the primary sector, it is also primary sector"** (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The three-sector classification categorizes all economic activities based on the nature',
                  options: ['The three-sector classification categorizes all economic activities based on the nature', 'Comparison of the three sectors (Primary, Secondary, Tertiary) in the Indian economy', 'Gross Domestic Product (GDP) is the total monetary value of all final goods and services', 'The rising importance of the tertiary sector refers to the structural transformation'],
                  hint: 'Revise Class 8 Economics Chapter 1: Factors of Production (c8_eco_ch1_2 to c8_eco_ch1_6) — focus.',
                  misconception: 'Students believe **"if an activity uses raw materials from the primary sector, it is also primary sector"** (e.g., sugar mill, cotton.' }
          ],
            remediations: { 'if-an-activity-uses-raw': { steps: ['Take 5 concrete Indian examples (e.g., cotton ginning, milk pasteurization, tractor rental, cold storage, flour mill).', 'For each, write the **final output** in one word (cotton bales, packed milk, tractor service, stored vegetables, wheat.', 'Apply the rule: "Is the output a natural resource? → Primary. Is it a tangible manufactured good? → Secondary.', 'Compare with textbook classification (NCERT pg. 20-21).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_002', difficulty: 'standard',
          question: 'Comparison of the three sectors (Primary, Secondary, Tertiary) in the Indian.',
          hint: 'If stuck, revisit c10_eco_cbse_02_001 classification criteria and practice classifying 10.',
          misconception: 'Students believe "tertiary sector dominance in GDP means India is a developed economy" — they equate high service share.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage share of the tertiary sector in India\'s GDP and in employment as per the latest available data (2023-24 estimates).', answer: 'Correct answer: Tertiary sector contributes approximately 54% to GDP and employs',
                  options: ['Correct answer: Tertiary sector contributes approximately 54% to GDP and employs', 'tertiary sector dominance in GDP means India is a developed economy', 'analyze the sectoral shift', 'tertiary employs the most people'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_001 classification criteria and practice classifying 10 local.',
                  misconception: 'Students believe "tertiary sector dominance in GDP means India is a developed economy" — they equate high service share with high.' },
                { id: 'b', prompt: 'Given the following hypothetical data for a state: Primary sector GDP = ₹1,20,000 crore, Secondary sector GDP = ₹1,80,000 crore, Tertiary sector GDP.', answer: 'Step 1: Total GDP = 1,20,000 + 1,80,000 + 3,00,000 = ₹6,00,000 crore',
                  options: ['Step 1: Total GDP = 1,20,000 + 1,80,000 + 3,00,000 = ₹6,00,000 crore', 'tertiary sector dominance in GDP means India is a developed economy', 'analyze the sectoral shift'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_001 classification criteria and practice classifying 10 local.',
                  misconception: 'Students believe "tertiary sector dominance in GDP means India is a developed economy" — they equate high service share with high.' }
          ],
            remediations: { 'tertiary-sector-dominance-in-gdp': { steps: ['Revisit the worked example 3 productivity calculation — compute GDP per worker for each sector using real 2023-24 data.', 'Plot a bar chart comparing sectoral GDP share vs employment share — visually see the gap.', 'Read the NITI Aayog report summary on "Structural Transformation" to understand that high tertiary share ≠ high.', 'Practice writing the distinction: "Developed economies have high tertiary share WITH high productivity; India has high.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "tertiary sector dominance in GDP means India is a developed economy" — they equate high service share.',
          parts: [
                { id: 'a', prompt: 'Evaluate the impact of the Green Revolution on the inter-sectoral relationship between primary and secondary sectors in India.', answer: 'Correct answer: Strengthened forward linkages',
                  options: ['Correct answer: Strengthened forward linkages', 'weakened because industry grew faster', 'tertiary sector dominance in GDP means India is a developed economy', 'analyze the sectoral shift'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_001 classification criteria and practice classifying 10 local.',
                  misconception: 'Students believe "tertiary sector dominance in GDP means India is a developed economy" — they equate high service share with high.' }
          ],
            remediations: { 'tertiary-sector-dominance-in-gdp': { steps: ['Revisit the worked example 3 productivity calculation — compute GDP per worker for each sector using real 2023-24 data.', 'Plot a bar chart comparing sectoral GDP share vs employment share — visually see the gap.', 'Read the NITI Aayog report summary on "Structural Transformation" to understand that high tertiary share ≠ high.', 'Practice writing the distinction: "Developed economies have high tertiary share WITH high productivity; India has high.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_003', difficulty: 'standard',
          question: 'Gross Domestic Product (GDP) is the total monetary value of all final goods and.',
          hint: 'If stuck, revisit c10_eco_cbse_02_001 (classification of sectors) and practice.',
          misconception: 'Students often confuse \'sectoral share in GDP\' with \'sectoral share in employment\'.',
          parts: [
                { id: 'a', prompt: 'In a hypothetical economy, the Primary sector\'s value added is ₹40,000 crore, Secondary sector\'s value added is ₹60,000 crore, and Tertiary sector\'s value.', answer: 'Step 1: Total GDP = 40,000 + 60,000 + 1,00,000 = ₹2,00,000 crore',
                  options: ['Step 1: Total GDP = 40,000 + 60,000 + 1,00,000 = ₹2,00,000 crore', 'calculates shares without summing to 100% or uses incorrect denominator (e'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_001 (classification of sectors) and practice classifying 10.',
                  misconception: 'Students often confuse \'sectoral share in GDP\' with \'sectoral share in employment\'.' }
          ],
            remediations: { 'students-often-confuse-sectoral-share': { steps: ['If a student confuses GDP share with employment share, do this 3-step remediation: 1.', 'Show a two-column table: Sector | GDP Share (%) | Employment Share (%) for India (latest data).', 'Ask: "Which sector has the biggest gap between the two columns?', 'Use a concrete example: A farmer grows wheat worth ₹1 lakh (GDP contribution).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_004', difficulty: 'standard',
          question: 'The rising importance of the tertiary sector refers to the structural.',
          hint: 'If stuck, revisit c10_eco_cbse_02_003 (GDP calculation) and c7_eco_ch02_009 (sector.',
          misconception: 'Students believe the tertiary sector\'s rise is solely due to "modern" services like IT and software exports.',
          parts: [
                { id: 'a', prompt: 'State the approximate share of the tertiary sector in India\'s GDP as of the latest available data (2023-24) and name the two sectors whose development creates.', answer: 'The tertiary sector contributes approximately 54-55% of India\'s GDP (2023-24)',
                  options: ['The tertiary sector contributes approximately 54-55% of India\'s GDP (2023-24)', 'modern', 'importance', 'employment generation'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_003 (GDP calculation) and c7_eco_ch02_009 (sector classification.',
                  misconception: 'Students believe the tertiary sector\'s rise is solely due to "modern" services like IT and software exports.' },
                { id: 'b', prompt: 'Explain why the demand for services like banking, insurance, and transport increases automatically when the primary and secondary sectors grow, using the.', answer: 'When agriculture produces more, it needs transport to mandis, cold storage, and',
                  options: ['When agriculture produces more, it needs transport to mandis, cold storage, and', 'modern', 'importance', 'employment generation'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_003 (GDP calculation) and c7_eco_ch02_009 (sector classification.',
                  misconception: 'Students believe the tertiary sector\'s rise is solely due to "modern" services like IT and software exports.' },
                { id: 'c', prompt: 'Given the following hypothetical data for India in a year: Primary Sector GDP = ₹25 lakh crore, Secondary Sector GDP = ₹30 lakh crore, Tertiary Sector GDP.', answer: 'Step 1: Total GDP = 25 + 30 + 55 = ₹110 lakh crore',
                  options: ['Step 1: Total GDP = 25 + 30 + 55 = ₹110 lakh crore', 'modern', 'importance', 'employment generation'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_003 (GDP calculation) and c7_eco_ch02_009 (sector classification.',
                  misconception: 'Students believe the tertiary sector\'s rise is solely due to "modern" services like IT and software exports.' }
          ],
            remediations: { 'the-tertiary-sector-s-rise': { steps: ['Revisit the sectoral GDP data table from node c10_eco_cbse_02_003 — note the sub-sector breakdown (trade, transport.', 'Plot a simple bar graph: x-axis = sub-sectors, y-axis = % of GVA.', 'Calculate employment elasticity: (Δ% employment)/(Δ% GDP) for tertiary vs secondary using PLFS data.', 'Write one paragraph: "High GDP share ≠ high job creation because..." This connects output share to employment reality.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_005', difficulty: 'standard',
          question: 'Unemployment in the three sectors refers to the situation where individuals who.',
          hint: 'If stuck, review c10_eco_cbse_02_001 (sector classification) and c8_eco_ch1_4 (labour and.',
          misconception: 'Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real problem is sectoral.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Unemployment in the three sectors refers to the situation where individuals who are',
                  options: ['Unemployment in the three sectors refers to the situation where individuals who are', 'The three-sector classification categorizes all economic activities based on the nature', 'Comparison of the three sectors (Primary, Secondary, Tertiary) in the Indian economy', 'Gross Domestic Product (GDP) is the total monetary value of all final goods and services'],
                  hint: 'If stuck, review c10_eco_cbse_02_001 (sector classification) and c8_eco_ch1_4 (labour and marginal.',
                  misconception: 'Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real problem is sectoral mismatch: the primary.' }
          ],
            remediations: { 'unemployment-in-india-is-mainly': { steps: ['Revisit the definition of marginal product (from c8_eco_ch1_4 Labour as a Factor of Production) using a farm example.', 'Identify when marginal product becomes zero — those extra workers are disguisedly unemployed.', 'Contrast with a factory where a new machine replaces 10 workers — those workers are structurally unemployed if they.', 'Use a table comparing the three sectors\' unemployment types, causes, and examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_006', difficulty: 'standard',
          question: 'Government employment generation initiatives refer to policies and programs.',
          hint: 'If stuck, revisit c10_eco_cbse_02_005 (Problems of Unemployment) and c10_eco_cbse_02_001.',
          misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.',
          parts: [
                { id: 'a', prompt: 'A district has 60% workforce in agriculture but contributes only 18% to district GDP.', answer: 'Step 1: Direct jobs = 2,000 (secondary sector: food processing, packaging)',
                  options: ['Step 1: Direct jobs = 2,000 (secondary sector: food processing, packaging)', 'how does a dam create jobs?'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_005 (Problems of Unemployment) and c10_eco_cbse_02_001 (Sector.',
                  misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.' },
                { id: 'b', prompt: 'Compare the employment impact of (a) building a new highway versus (b) waiving farm loans. Which creates more sustainable employment?', answer: 'Correct answer: Highway construction creates more sustainable employment',
                  options: ['Correct answer: Highway construction creates more sustainable employment', 'it helps farmers immediately', 'how does a dam create jobs?'],
                  hint: 'If stuck, revisit c10_eco_cbse_02_005 (Problems of Unemployment) and c10_eco_cbse_02_001 (Sector.',
                  misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.' }
          ],
            remediations: { 'government-creates-employment-only-by': { steps: ['Draw a 3-column table: Initiative (e.g., Road) → Direct Jobs (construction) → Indirect Jobs (transport, trade.', 'Take the textbook example of a cold storage: list 5 specific jobs created (operator, loader, truck driver, commission.', 'Contrast with MGNREGA: "MGNREGA = direct wage employment for 100 days; Cold storage = permanent jobs for 10+ people.', 'Practice one case-based question from CBSE sample paper where you classify each job as primary/secondary/tertiary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
