import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch03_p2: SimDef = {
    id: 'v3_c7_eco_ch03_p2',
    title: 'Infrastructure: Engine of India\'s Development · Part 2/2',
    subtitle: 'Covers the micro-level and community-level effects of infrastructure on daily household.',
    classLevel: 7, subject: 'economics', topic: 'Infrastructure: Engine of India\'s Development · Part 2/2',
    chapters: ['c7_eco_ch03'],
    nodeIds: ['c7_eco_ch03_007', 'c7_eco_ch03_008', 'c7_eco_ch03_009', 'c7_eco_ch03_010', 'c7_eco_ch03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine two villages in rural India: Village A has unpaved mud tracks and gets water from a distant river.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A potter makes perfect pots, yet loses ten percent of every shipment because a broken dirt road rattles his trucks for six hours. Nothing is wrong with the pots — so what is actually broken?',
        options: ['The physical infrastructure — roads, power, and water systems are the skeleton under every business, and cracks in it shake the whole economy', 'The pots — they need better clay', 'The trucks — they should drive slower', 'Nothing — bad luck breaks pottery'],
        answer: 'The physical infrastructure — roads, power, and water systems are the skeleton under every business, and cracks in it shake the whole economy',
        hook: 'Infrastructure is not a consumer good you buy at a shop — it is the shared framework that lets everything else happen. Pave the road and the same potter suddenly delivers faster, cheaper, and whole.',
    },
    teaching: [
        { title: 'Impact of Infrastructure on Quality of Life', text: 'The impact of infrastructure on quality of life refers to how physical, social, and utility networks—such as all-weather roads, clean drinking water pipelines, electricity grids, schools, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow one glass of clean water home — count every pipe, wire, road, and pole it needed — then total what a broken road costs the potter in a single day.',
        labels: ['Impact of Infrastructure', 'Role of Infrastructure', 'Infrastructure and Employment Generation', 'Rural vs Urban Infrastructure', 'Sustainable Infrastructure: Environmental Considerations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_007', title: 'Impact of Infrastructure on Quality of Life',
          scaffold: { problem: 'A rural household in Odisha spends 2.5 hours every day walking to collect 4 pots of water from a distant stream.',
            steps: [
            { text: 'Identify initial daily time spent on water collection = 2.5 hours per day (150 minutes).' },
            { text: 'Calculate daily time saved through infrastructure upgrade = 2.5 hours per day.' },
            { text: 'Calculate weekly time saved = 2.5 hours/day × 7 days = 17.5 hours per week.' },
            { text: 'Calculate time allocated to productive craft work (50% of saved time) = 50% of 17.5 hours = 8.75 hours per week.' },
            { text: 'Calculate total extra weekly income = 8.75 hours × ₹60 per hour = ₹525 per week.', faded: true, blankAnswer: '₹525 per week' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_008', title: 'Role of Infrastructure in Economic Development',
          scaffold: { problem: 'A cluster of handloom weavers in a rural cluster takes 4 days to deliver finished sarees to a city buyer 100 km away because of narrow dirt.',
            steps: [
            { text: 'Identify the initial monthly transport cost per weaver: Rs. 500 per trip $\\times$ 4 trips = Rs. 2,000 per month.' },
            { text: 'Identify the new monthly transport cost per weaver after the highway is built: Rs. 100 per trip $\\times$ 4 trips = Rs.' },
            { text: 'Calculate the monthly savings by subtracting the new cost from the old cost: Rs. 2,000 - Rs. 400 = Rs.' },
            { text: 'Calculate the annual savings by multiplying the monthly savings by 12 months: Rs. 1,600 $\\times$ 12 = Rs.' },
            { text: 'Interpret the economic impact: The highway directly increases the weaver\'s annual disposable income by Rs.', faded: true, blankAnswer: 'Rs. 19,200 saved per year per weaver.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_009', title: 'Infrastructure and Employment Generation',
          scaffold: { problem: 'The National Highways Authority plans to build a 50 km expressway. The project directly hires 1,200 construction workers.',
            steps: [
            { text: 'Identify the given direct employment figure from the problem statement (1,200 direct jobs).' },
            { text: 'Identify the indirect employment multiplier relationship (1.5 indirect jobs per direct job).' },
            { text: 'Calculate the total indirect employment by multiplying the direct jobs by the indirect multiplier (1,200 * 1.5 = 1,800.' },
            { text: 'Add direct employment and indirect employment together to find the total employment generated (1,200 + 1,800 = 3,000.' },
            { text: 'Interpret the economic result: The highway project creates 3,000 total jobs across construction and supporting supply.', faded: true, blankAnswer: '3,000 total jobs' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_010', title: 'Rural vs Urban Infrastructure: The Development Gap',
          scaffold: { problem: 'A state government evaluates two districts for setting up an IT park.',
            steps: [
            { text: 'Identify given costs for District X (₹0 extra cost) and District Y (₹15 Lakhs power backup + ₹10 Lakhs transport fleet).' },
            { text: 'Set up the calculation for total extra infrastructure cost in District Y: Total Cost = Power Backup Cost + Transport.' },
            { text: 'Compute the sum: ₹15,00,000 + ₹10,00,000 = ₹25,00,000.' },
            { text: 'Compare economic viability: District X incurs ₹0 extra, while District Y incurs ₹25 Lakhs extra annually.' },
            { text: 'Conclude that District X is economically viable because poor rural infrastructure imposes heavy private costs.', faded: true, blankAnswer: 'Total extra cost for District Y is ₹25,00,000 annually.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_011', title: 'Sustainable Infrastructure: Environmental Considerations',
          scaffold: { problem: 'A city in Gujarat plans to install street lighting. Project Sun provides solar-powered LED lights costing ₹50 lakhs initially, with.',
            steps: [
            { text: 'Identify the initial setup costs and annual operational costs for both projects.' },
            { text: 'Calculate the 5-year operational cost for Project Sun (Annual cost × 5 years). Calculation: ₹2 lakhs × 5 = ₹10 lakhs.' },
            { text: 'Calculate the 5-year operational cost for Project Grid (Annual cost × 5 years). Calculation: ₹9 lakhs × 5 = ₹45 lakhs.' },
            { text: 'Add the initial cost to the 5-year operational cost for both projects to find the total 5-year cost.' },
            { text: 'Compare the total costs and evaluate economic efficiency alongside environmental impact (zero emissions for Project.', faded: true, blankAnswer: 'Project Sun total 5-year cost is ₹60 lakhs; Project Grid.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A district has one crore rupees to spend. Proposal A: five air-conditioned guest houses for visiting officials. Proposal B: a water pipeline and a paved road connecting three farming villages. A junior official argues for A — \'visible buildings show development.\'',
            decisions: [{ prompt: 'Which proposal is real infrastructure investment?', options: [
                { text: 'Proposal B — the road slashes transport costs and spoilage so crops reach market profitably, and the pipeline returns hours of daily labour to households; both keep generating economic gains year after year. The guest houses serve a few officials and generate nothing comparable — infrastructure earns its name by enabling everyone else\'s work.', outcome: 'The difference is multiplication: roads, water and power raise the productivity of a whole district, while a luxury building\'s benefit stops at its own walls.' },
                { text: 'Proposal A is equally good infrastructure — any government building counts as development spending.', outcome: 'Buildings alone are not infrastructure — the term means the enabling backbone (roads, water, power) that lifts all activity, not just any construction.', reveals: 'any-building-is-infra' },
                { text: 'Neither — one crore is too small to matter, so the choice hardly makes a difference.', outcome: 'The road-pipeline package transforms trade and labour for three villages — infrastructure gains are about what they unlock, not just the amount spent.', reveals: 'small-spend-no-impact' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch03_011', title: 'You made it',
          caseStudy: { intro: 'You rarely notice infrastructure until it fails. Roads and wires do not make products — they make products possible.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch03_007', difficulty: 'standard',
          question: 'The impact of infrastructure on quality of life refers to how physical, social.',
          hint: 'Review c6_economics_ch07_001 to recall the basic definition of infrastructure and why.',
          misconception: 'Students often believe that infrastructure only benefits large businesses, factories, and rich city dwellers, failing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The impact of infrastructure on quality of life refers to how physical, social, and',
                  options: ['The impact of infrastructure on quality of life refers to how physical, social, and', 'Physical infrastructure refers to the foundational tangible structures, facilities, and', 'Transportation infrastructure comprises the physical networks—specifically roads,', 'Utility infrastructure refers to the large-scale physical networks and systems—such as'],
                  hint: 'Review c6_economics_ch07_001 to recall the basic definition of infrastructure and why public.',
                  misconception: 'Students often believe that infrastructure only benefits large businesses, factories, and rich city dwellers, failing to recognize how.' }
          ],
            remediations: { 'infrastructure-only-benefits-large-businesses': { steps: ['To fix this misconception, walk through a day-in-the-life comparison of a household with versus without basic.', 'Ask the student to calculate how many hours a child spends carrying water buckets versus reading books, and how a local.', 'Emphasize that infrastructure is a foundation for human dignity and daily well-being, not just heavy industry.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_008', difficulty: 'standard',
          question: 'Infrastructure serves as the backbone of economic development by providing the.',
          hint: 'Review node c7_eco_ch03_001 to solidify what physical infrastructure includes before.',
          misconception: 'Students often think that infrastructure spending is merely an expense for the government that drains public money.',
          parts: [
                { id: 'a', prompt: 'What term describes the essential physical and social networks—such as transport, power, and communication—that enable an economy to function and grow?', answer: 'infrastructure',
                  options: ['infrastructure', 'markets'],
                  hint: 'Review node c7_eco_ch03_001 to solidify what physical infrastructure includes before attempting.',
                  misconception: 'Students often think that infrastructure spending is merely an expense for the government that drains public money, failing to realize.' },
                { id: 'b', prompt: 'A state government invests 100 crore rupees to build reliable electricity grids in 50 rural districts, reducing factory power outages from 8 hours to zero.', answer: 'a 150% increase',
                  options: ['a 150% increase', '150 shirts'],
                  hint: 'Review node c7_eco_ch03_001 to solidify what physical infrastructure includes before attempting.',
                  misconception: 'Students often think that infrastructure spending is merely an expense for the government that drains public money, failing to realize.' }
          ],
            remediations: { 'infrastructure-spending-is-merely-an': { steps: ['To fix this misconception, walk through a simple cost-benefit ledger using a local market example.', '10 lakh paved road reduces transport damage for 50 vegetable vendors by a total of Rs.', '2 lakh every year, the infrastructure pays for itself in 5 years and continues generating wealth thereafter.', 'Emphasize that public infrastructure acts as a force multiplier for private enterprise, transforming idle resources.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_009', difficulty: 'standard',
          question: 'Infrastructure and employment generation refers to how building physical and.',
          hint: 'Review c7_eco_ch03_001 to solidify understanding of what physical infrastructure includes.',
          misconception: 'Students often believe that infrastructure only creates jobs while the physical structure is being built, thinking that.',
          parts: [
                { id: 'a', prompt: 'What type of jobs are created immediately on an infrastructure construction site, such as workers laying bricks or engineers building a bridge?', answer: 'Direct employment',
                  options: ['Direct employment', 'indirect employment'],
                  hint: 'Review c7_eco_ch03_001 to solidify understanding of what physical infrastructure includes before.',
                  misconception: 'Students often believe that infrastructure only creates jobs while the physical structure is being built, thinking that once a road.' }
          ],
            remediations: { 'infrastructure-only-creates-jobs-while': { steps: ['To fix this misconception, walk students through a two-phase timeline of a newly paved highway connecting a village.', 'Phase 1 is construction: point out that masons and truck drivers get paid wages immediately.', 'Phase 2 is post-completion: show that vegetable vendors, bus drivers, and delivery agents now use the smooth road daily.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_010', difficulty: 'standard',
          question: 'The rural-urban infrastructure gap refers to the disparity in the availability.',
          hint: 'Review c6_economics_ch07_001 and c7_eco_ch03_001 to refresh definitions of physical.',
          misconception: 'Students often believe that infrastructure development happens equally across all regions simply because the government.',
          parts: [
                { id: 'a', prompt: 'What term describes the difference in the availability and quality of physical and social facilities between villages and cities?', answer: 'the rural-urban infrastructure gap (or development gap)',
                  options: ['the rural-urban infrastructure gap (or development gap)', 'inflation', 'barter deficit'],
                  hint: 'Review c6_economics_ch07_001 and c7_eco_ch03_001 to refresh definitions of physical infrastructure.',
                  misconception: 'Students often believe that infrastructure development happens equally across all regions simply because the government has a national.' }
          ],
            remediations: { 'infrastructure-development-happens-equally-acros': { steps: ['To fix this, guide the student through a regional comparison exercise using two hypothetical districts.', 'Show them that private companies invest where electricity is constant and roads are paved (urban), leaving rural areas.', 'Draw a simple flowchart on paper: Poor Roads -> No Factories -> No Jobs -> Low Income -> Poor Local Taxes ->.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_011', difficulty: 'standard',
          question: 'Sustainable infrastructure refers to the design, construction, and operation.',
          hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_003 to solidify understanding of basic physical.',
          misconception: 'Students often believe that "sustainable infrastructure" means stopping all infrastructure development to protect.',
          parts: [
                { id: 'a', prompt: 'Why might a traditional coal-fired power plant be considered economically unsustainable in the long run compared to a solar park, even if the initial setup.', answer: 'While coal may have lower initial setup costs, it generates massive long-term',
                  options: ['While coal may have lower initial setup costs, it generates massive long-term', 'sustainable infrastructure', 'that coal is cheaper forever'],
                  hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_003 to solidify understanding of basic physical and utility.',
                  misconception: 'Students often believe that "sustainable infrastructure" means stopping all infrastructure development to protect nature, or that it.' },
                { id: 'b', prompt: 'A local government in India is planning a 50 km transport corridor. Option A (Traditional Road) costs ₹100 crores to build and causes high carbon emissions.', answer: '2 years',
                  options: ['2 years', 'sustainable infrastructure', 'it takes 10 years or rejecting Option B outright due to the higher upfront cost'],
                  hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_003 to solidify understanding of basic physical and utility.',
                  misconception: 'Students often believe that "sustainable infrastructure" means stopping all infrastructure development to protect nature, or that it.' }
          ],
            remediations: { 'sustainable-infrastructure-means-stopping-all': { steps: ['To fix this misconception, walk students through a concrete example: compare a traditional plastic-lined canal that.', 'Calculate the total cost over ten years for both options to show how sustainability saves money.', 'Emphasize that protecting the environment is an economic necessity, not a barrier to development.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "sustainable infrastructure" means stopping all infrastructure development to protect.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Spending extra money on green building materials for public schools and hospitals is a waste of taxpayer funds because it does not.', answer: 'I disagree with the argument',
                  options: ['I disagree with the argument', 'sustainable infrastructure'],
                  hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_003 to solidify understanding of basic physical and utility.',
                  misconception: 'Students often believe that "sustainable infrastructure" means stopping all infrastructure development to protect nature, or that it.' },
                { id: 'b', prompt: 'Design a two-point checklist for a municipal corporation in India to determine if a proposed bridge construction project meets sustainable infrastructure.', answer: 'The expected checklist should include: 1',
                  options: ['The expected checklist should include: 1', 'sustainable infrastructure'],
                  hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_003 to solidify understanding of basic physical and utility.',
                  misconception: 'Students often believe that "sustainable infrastructure" means stopping all infrastructure development to protect nature, or that it.' }
          ],
            remediations: { 'sustainable-infrastructure-means-stopping-all': { steps: ['To fix this misconception, walk students through a concrete example: compare a traditional plastic-lined canal that.', 'Calculate the total cost over ten years for both options to show how sustainability saves money.', 'Emphasize that protecting the environment is an economic necessity, not a barrier to development.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
