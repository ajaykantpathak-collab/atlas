import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch03_p1: SimDef = {
    id: 'v3_c7_eco_ch03_p1',
    title: 'Infrastructure: Engine of India\'s Development · Part 1/2',
    subtitle: 'This node covers the definition, core physical components, and tangible economic role.',
    classLevel: 7, subject: 'economics', topic: 'Infrastructure: Engine of India\'s Development · Part 1/2',
    chapters: ['c7_eco_ch03'],
    nodeIds: ['c7_eco_ch03_001', 'c7_eco_ch03_002', 'c7_eco_ch03_003', 'c7_eco_ch03_004', 'c7_eco_ch03_005', 'c7_eco_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking through a bustling Indian marketplace where farmers sell fresh vegetables, trucks deliver.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A potter makes perfect pots, yet loses ten percent of every shipment because a broken dirt road rattles his trucks for six hours. Nothing is wrong with the pots — so what is actually broken?',
        options: ['The physical infrastructure — roads, power, and water systems are the skeleton under every business, and cracks in it shake the whole economy', 'The pots — they need better clay', 'The trucks — they should drive slower', 'Nothing — bad luck breaks pottery'],
        answer: 'The physical infrastructure — roads, power, and water systems are the skeleton under every business, and cracks in it shake the whole economy',
        hook: 'Infrastructure is not a consumer good you buy at a shop — it is the shared framework that lets everything else happen. Pave the road and the same potter suddenly delivers faster, cheaper, and whole.',
    },
    teaching: [
        { title: 'Physical Infrastructure: Definition and Components', text: 'Physical infrastructure refers to the foundational tangible structures, facilities, and systems—such as roads, bridges, power grids, and water supply networks—that enable a society and economy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow one glass of clean water home — count every pipe, wire, road, and pole it needed — then total what a broken road costs the potter in a single day.',
        labels: ['Physical Infrastructure: Definition', 'Transportation Infrastructure: Roads, Bridges,', 'Utility Infrastructure: Electricity, Water', 'Communication Networks: Internet, Telecom,', 'Energy Infrastructure: Windmills, Solar', 'How Infrastructure Transformed Over'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_002', title: 'Transportation Infrastructure: Roads, Bridges, Railways',
          scaffold: { problem: 'A textile cooperative in Gujarat wants to transport 2,000 bundles of cloth to a distribution center 300 km away.',
            steps: [
            { text: 'Identify the given data: Quantity = 2,000 bundles, Distance = 300 km (which is 3 units of 100 km), Truck rate = ₹50 per.' },
            { text: 'Calculate total truck transport cost: Truck cost per bundle = ₹50 × 3 = ₹150.' },
            { text: 'Calculate total train transport cost: Train cost per bundle = ₹30 × 3 = ₹90.' },
            { text: 'Calculate absolute monetary savings: Savings = Total truck cost - Total train cost = ₹300,000 - ₹180,000 = ₹120,000.' },
            { text: 'Calculate percentage savings: (Savings ÷ Total truck cost) × 100 = (₹120,000 ÷ ₹300,000) × 100 = 40%.', faded: true, blankAnswer: 'Total savings are ₹120,000, representing a 40% reduction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_003', title: 'Utility Infrastructure: Electricity, Water Pipelines',
          scaffold: { problem: 'A cooperative dairy chilling plant in rural Haryana requires a continuous supply of electricity to keep 500 liters of milk cold.',
            steps: [
            { text: 'Identify normal grid power cost for 3 hours = 3 hours × 10 kWh/hour × ₹5/kWh = ₹150.' },
            { text: 'Calculate backup generator flat rate cost = ₹200.' },
            { text: 'Calculate backup generator fuel cost for 3 hours = 3 hours × ₹40/hour = ₹120.' },
            { text: 'Calculate total backup generator cost = ₹200 + ₹120 = ₹320.' },
            { text: 'Calculate extra cost incurred = Total backup cost - Normal grid cost = ₹320 - ₹150 = ₹170.', faded: true, blankAnswer: '₹170 extra cost incurred' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_004', title: 'Communication Networks: Internet, Telecom, Telephone Lines',
          scaffold: { problem: 'A handicraft manufacturer in Jaipur currently sells goods worth ₹2,00,000 annually through local wholesale agents who charge a 25%.',
            steps: [
            { text: 'Identify the baseline revenue and intermediary costs. Total annual revenue = ₹2,000,000. Agent commission rate = 25%.' },
            { text: 'Calculate the annual cost paid to agents under the old method: 25% of ₹2,000,000 = ₹5,00,000.' },
            { text: 'Calculate the annual cost of the new communication infrastructure (internet): ₹1,500 × 12 months = ₹18,000.' },
            { text: 'Calculate total expenses under the new method: ₹18,000 (internet cost) + ₹0 (agent commission) = ₹18,000.' },
            { text: 'Compute net financial benefit by comparing old intermediary costs with new infrastructure costs: ₹5,00,000 (old cost).', faded: true, blankAnswer: '₹4,82,000 net savings in the first year.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_005', title: 'Energy Infrastructure: Windmills, Solar Parks, Pipelines',
          scaffold: { problem: 'A textile mill in Tamil Nadu consumes 10,000 kilowatt-hours (kWh) of electricity per month.',
            steps: [
            { text: 'Identify the total energy consumption (10,000 kWh) and the proportion sourced from wind energy (80%) versus diesel.' },
            { text: 'Calculate the exact kWh obtained from the wind farm: 80% of 10,000 kWh = 0.80 × 10,000 = 8,000 kWh.' },
            { text: 'Calculate the exact kWh obtained from the diesel backup: 20% of 10,000 kWh = 0.20 × 10,000 = 2,000 kWh.' },
            { text: 'Calculate the cost for wind energy: 8,000 kWh × ₹6 per kWh = ₹48,000.' },
            { text: 'Calculate the cost for diesel backup: 2,000 kWh × ₹15 per kWh = ₹30,000.' },
            { text: 'Add both costs to find the total monthly expenditure: ₹48,000 + ₹30,000 = ₹78,000.', faded: true, blankAnswer: '₹78,000 per month.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch03_006', title: 'How Infrastructure Transformed Over the Years in India',
          scaffold: { problem: 'In 1960, a rural district in India had 50 km of paved roads and took 48 hours to transport wheat to the nearest port city.',
            steps: [
            { text: 'Identify initial and final values for road length (Initial = 50 km, Final = 500 km) and transport time (Initial = 48.' },
            { text: 'Apply the percentage change formula: $\\frac{\\text{Final} - \\text{Initial}}{\\text{Initial}} \\times 100$.' },
            { text: 'Calculate percentage increase in road length: $\\frac{500 - 50}{50} \\times 100 = \\frac{450}{50} \\times 100 = 9 \\times.' },
            { text: 'Calculate percentage reduction in transport time: $\\frac{48 - 8}{48} \\times 100 = \\frac{40}{48} \\times 100 = 0.833.' },
            { text: 'Interpret economically: A 900% expansion in road infrastructure drastically compressed transit time by 83.3%, cutting.', faded: true, blankAnswer: 'Road length increased by 900%, and transport time was.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A district has one crore rupees to spend. Proposal A: five air-conditioned guest houses for visiting officials. Proposal B: a water pipeline and a paved road connecting three farming villages. A junior official argues for A — \'visible buildings show development.\'',
            decisions: [{ prompt: 'Which proposal is real infrastructure investment?', options: [
                { text: 'Proposal B — the road slashes transport costs and spoilage so crops reach market profitably, and the pipeline returns hours of daily labour to households; both keep generating economic gains year after year. The guest houses serve a few officials and generate nothing comparable — infrastructure earns its name by enabling everyone else\'s work.', outcome: 'The difference is multiplication: roads, water and power raise the productivity of a whole district, while a luxury building\'s benefit stops at its own walls.' },
                { text: 'Proposal A is equally good infrastructure — any government building counts as development spending.', outcome: 'Buildings alone are not infrastructure — the term means the enabling backbone (roads, water, power) that lifts all activity, not just any construction.', reveals: 'any-building-is-infra' },
                { text: 'Neither — one crore is too small to matter, so the choice hardly makes a difference.', outcome: 'The road-pipeline package transforms trade and labour for three villages — infrastructure gains are about what they unlock, not just the amount spent.', reveals: 'small-spend-no-impact' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You rarely notice infrastructure until it fails. Roads and wires do not make products — they make products possible.',
            decisions: [{ prompt: 'What comes next? Infrastructure: Engine of India\'s Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Infrastructure: Engine of India\'s Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch03_001', difficulty: 'standard',
          question: 'Physical infrastructure refers to the foundational tangible structures.',
          hint: 'Review c6_economics_ch07_002 to recall basic examples of roads, bridges, power, and water.',
          misconception: 'Students often confuse physical infrastructure with private consumer goods or commercial buildings (like factories and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical infrastructure refers to the foundational tangible structures, facilities, and',
                  options: ['Physical infrastructure refers to the foundational tangible structures, facilities, and', 'Transportation infrastructure comprises the physical networks—specifically roads,', 'Utility infrastructure refers to the large-scale physical networks and systems—such as', 'Communication networks such as the internet, telecom systems, and telephone lines are'],
                  hint: 'Review c6_economics_ch07_002 to recall basic examples of roads, bridges, power, and water.',
                  misconception: 'Students often confuse physical infrastructure with private consumer goods or commercial buildings (like factories and shops).' }
          ],
            remediations: { 'students-often-confuse-physical-infrastructure': { steps: ['To fix this, guide the student through a simple sorting exercise using an Indian town example: Ask them if a local shoe.', 'Emphasize that physical infrastructure is the shared foundational network (pipes, wires, roads) without which.', 'Have them trace how electricity flows from a public power grid to a private shop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_002', difficulty: 'standard',
          question: 'Transportation infrastructure comprises the physical networks—specifically.',
          hint: 'Review c7_eco_ch03_001 to understand how physical infrastructure acts as the physical.',
          misconception: 'Students often believe that building any road or railway automatically guarantees economic development, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Transportation infrastructure comprises the physical networks—specifically roads,',
                  options: ['Transportation infrastructure comprises the physical networks—specifically roads,', 'Physical infrastructure refers to the foundational tangible structures, facilities, and', 'Utility infrastructure refers to the large-scale physical networks and systems—such as', 'Communication networks such as the internet, telecom systems, and telephone lines are'],
                  hint: 'Review c7_eco_ch03_001 to understand how physical infrastructure acts as the physical skeleton.',
                  misconception: 'Students often believe that building any road or railway automatically guarantees economic development, ignoring the complementary factors.' }
          ],
            remediations: { 'building-any-road-or-railway': { steps: ['To fix this misconception, guide the student through a two-step economic reality check using a local example.', 'First, calculate the cost of moving 100 bags of wheat over a broken road versus a paved road to show how transport.', 'Second, ask: "If a road is built through a desert where no one grows crops or has factories, will trucks drive on it?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_003', difficulty: 'standard',
          question: 'Utility infrastructure refers to the large-scale physical networks and.',
          hint: 'Review c7_eco_ch03_001 to understand the basic definition of physical infrastructure.',
          misconception: 'Students often believe that utility infrastructure like electricity and water pipelines are free public gifts provided.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Utility infrastructure refers to the large-scale physical networks and systems—such as',
                  options: ['Utility infrastructure refers to the large-scale physical networks and systems—such as', 'Physical infrastructure refers to the foundational tangible structures, facilities, and', 'Transportation infrastructure comprises the physical networks—specifically roads,', 'Communication networks such as the internet, telecom systems, and telephone lines are'],
                  hint: 'Review c7_eco_ch03_001 to understand the basic definition of physical infrastructure before.',
                  misconception: 'Students often believe that utility infrastructure like electricity and water pipelines are free public gifts provided naturally by the.' }
          ],
            remediations: { 'utility-infrastructure-like-electricity-and': { steps: ['Break down the journey of water from a river to a household tap, highlighting filtration plants, massive pumps, and.', 'Show that electricity requires generation plants, massive transmission towers, and local transformers.', 'Explain that every kilowatt and liter has a real cost of production and maintenance paid through taxes or utility bills.', 'Re-evaluate a daily household utility bill to show how consumption links directly to infrastructure upkeep costs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_004', difficulty: 'standard',
          question: 'Communication networks such as the internet, telecom systems, and telephone.',
          hint: 'Review c7_eco_ch03_003 to reinforce how non-transport public infrastructure supports.',
          misconception: 'Students often believe that communication networks like the internet and telecom lines are purely non-economic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Communication networks such as the internet, telecom systems, and telephone lines are',
                  options: ['Communication networks such as the internet, telecom systems, and telephone lines are', 'Physical infrastructure refers to the foundational tangible structures, facilities, and', 'Transportation infrastructure comprises the physical networks—specifically roads,', 'Utility infrastructure refers to the large-scale physical networks and systems—such as'],
                  hint: 'Review c7_eco_ch03_003 to reinforce how non-transport public infrastructure supports economic.',
                  misconception: 'Students often believe that communication networks like the internet and telecom lines are purely non-economic, consumer-facing services.' }
          ],
            remediations: { 'communication-networks-like-the-internet': { steps: ['Show that when a customer places an order on a mobile app, a message travels instantly via telecom networks to the.', 'Explain that without this digital communication network, the seller would not know what to stock or where to deliver.', 'Conclude that information flow is as vital to exchange as physical transport is to cargo.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_005', difficulty: 'standard',
          question: 'Energy infrastructure comprises the large-scale networks, facilities, and.',
          hint: 'Review c7_eco_ch03_003 to reinforce how utility networks operate before tackling.',
          misconception: 'Students often think that energy infrastructure like solar parks or wind farms only benefits large electricity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Energy infrastructure comprises the large-scale networks, facilities, and physical',
                  options: ['Energy infrastructure comprises the large-scale networks, facilities, and physical', 'Physical infrastructure refers to the foundational tangible structures, facilities, and', 'Transportation infrastructure comprises the physical networks—specifically roads,', 'Utility infrastructure refers to the large-scale physical networks and systems—such as'],
                  hint: 'Review c7_eco_ch03_003 to reinforce how utility networks operate before tackling large-scale energy.',
                  misconception: 'Students often think that energy infrastructure like solar parks or wind farms only benefits large electricity companies and has no direct.' }
          ],
            remediations: { 'energy-infrastructure-like-solar-parks': { steps: ['To fix this misconception, walk through a concrete local supply chain: 1) Trace a tomato harvested by a farmer to.', '2) Show how without reliable power from the solar park, the tomatoes rot, destroying the farmer\'s income.', '3) Conclude that energy infrastructure directly protects household earnings and stabilizes market prices for consumers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch03_006', difficulty: 'standard',
          question: 'The transformation of infrastructure over the years in India refers to the.',
          hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_002 to refresh definitions of physical and.',
          misconception: 'Students often believe that infrastructure has always existed in its current advanced state or that physical.',
          parts: [
                { id: 'a', prompt: 'What term describes roads, railways, and ports that are built or upgraded to connect different parts of a country over time?', answer: 'Physical infrastructure',
                  options: ['Physical infrastructure', 'social infrastructure'],
                  hint: 'Review c7_eco_ch03_001 and c7_eco_ch03_002 to refresh definitions of physical and transport.',
                  misconception: 'Students often believe that infrastructure has always existed in its current advanced state or that physical infrastructure upgrades happen.' }
          ],
            remediations: { 'infrastructure-has-always-existed-in': { steps: ['Look at data from 1950 (e.g., total paved road length, percentage of electrified villages) versus 2023.', 'Explain that every highway, power grid, and fiber-optic cable was built in phases through government planning and.', 'Use the concept of \'capital accumulation\'—reminding them that roads and power plants are long-term capital assets that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
