import type { SimDef } from '../../engine/types';

/** v3 generated — c8_geo_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_geo_ch01_p1: SimDef = {
    id: 'v3_c8_geo_ch01_p1',
    title: 'Natural Resources and Their Use · Part 1/2',
    subtitle: 'When does plain nature become a resource?',
    classLevel: 8, subject: 'geography', topic: 'Natural Resources and Their Use · Part 1/2',
    chapters: ['c8_geo_ch01'],
    nodeIds: ['c8_geo_ch1_1', 'c8_geo_ch1_10', 'c8_geo_ch1_11', 'c8_geo_ch1_12', 'c8_geo_ch1_2', 'c8_geo_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a resource assessment officer', intro: 'Deep ore, sacred lithium, desert wind, hot springs — four piles of \'nature\' begging to be used. Your job: apply the four tests and decide what truly counts as a resource today.', goal: 'Understand that natural substances become resources only through utility, technological accessibility, economic feasibility and cultural acceptability — and apply these criteria to real cases.' },
    discovery: {
        question: 'High-grade iron ore sits 5 km under a Central Indian forest — but digging costs ₹10,000 a ton while the market pays only ₹4,000. Is it a resource right now?',
        options: ['No — it fails the economic feasibility test, so it\'s only a potential deposit, not a usable resource', 'Yes — iron is useful, so it automatically counts', 'Yes — anything buried underground is a resource', 'No — because it\'s in a forest and forests have no resources'],
        answer: 'No — it fails the economic feasibility test, so it\'s only a potential deposit, not a usable resource',
        hook: 'Nature doesn\'t hand us resources — humans create them. Himalayan rivers flowed for millennia before turbines turned them into electricity. Useful + reachable + affordable + acceptable: fail one test and it\'s just stuff in the ground.',
    },
    teaching: [
        { title: 'When Does Nature Become a Resource: Definition and Criteria', text: 'A resource is any element of the natural environment (matter or energy) that has utility to satisfy human needs, provided it is technologically accessible, economically feasible, and culturally.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_geo_ch1_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the four-tests gauntlet on real cases: Thar Desert wind then and now, lithium under a sacred site in Jammu & Kashmir, and Ladakh\'s hot springs. Decide what counts as a resource — and what stays merely potential.',
        labels: ['When Does Nature Become', 'Non-Renewable Resources: Coal, Petroleum,', 'Conservation of Natural Resources', 'Regenerative Economy: Working', 'Categories of Natural Resources', 'Classification by Exhaustibility: Renewable'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_geo_ch1_1', title: 'When Does Nature Become a Resource: Definition and Criteria',
          caseStudy: { intro: 'Look out of your window at a gust of wind blowing across the landscape, or think about the deep, untouched layers of rock beneath the Deccan Plateau.',
            decisions: [{ prompt: 'What are the four essential criteria that a natural substance must meet to be classified as a resource?', options: [
                { text: 'The four essential criteria are utility (usability), technological accessibility,', outcome: 'The four essential criteria are utility (usability), technological accessibility, economic.' },
                { text: 'it must be useful', outcome: 'Not quite — Students often believe that if a natural substance exists on Earth (like water, coal, or solar.', reveals: 'if-a-natural-substance-exists' },
                { text: 'resource', outcome: 'Not quite — Students often believe that if a natural substance exists on Earth (like water, coal, or solar.', reveals: 'if-a-natural-substance-exists' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_geo_ch1_10', title: 'Non-Renewable Resources: Coal, Petroleum, Natural Gas',
          scaffold: { problem: 'An offshore oilfield off the coast of Maharashtra (similar to Mumbai High) holds estimated recoverable crude oil reserves of 400 million.',
            steps: [
            { text: 'Identify given variables: Total Reserves = 400 million tonnes; Annual Extraction Rate = 16 million tonnes/year.' },
            { text: 'Apply the Resource Lifespan formula: $\\text{Lifespan} = \\frac{\\text{Total Reserves}}{\\text{Annual Extraction Rate}}$.' },
            { text: 'Compute the base lifespan: $\\frac{400}{16} = 25\\text{ years}$.' },
            { text: 'Analyze physical reservoir dynamics: As petroleum is withdrawn, natural underground gas/water pressure declines, making.' },
            { text: 'Conclude the geographical and operational implication: The field will supply peak extraction for fewer than 25 years.', faded: true, blankAnswer: 'The reserve has a theoretical lifespan of 25 years.' }
            ] } },
        { type: 'case', nodeId: 'c8_geo_ch1_12', title: 'Regenerative Economy: Working in Harmony with Nature',
          caseStudy: { intro: 'Observe how years of heavy chemical farming in agricultural regions like Punjab or Haryana led to fallen groundwater levels and depleted soil organic matter.',
            decisions: [{ prompt: 'What is the fundamental difference between a sustainable resource practice and a regenerative resource practice?', options: [
                { text: 'A sustainable practice aims to maintain natural resources at their current state without', outcome: 'A sustainable practice aims to maintain natural resources at their current state without further.' },
                { text: 'sustainable resource use', outcome: 'Not quite — Students often confuse "sustainable resource use" with "regenerative resource use." They wrongly.', reveals: 'students-often-confuse-sustainable-resource' },
                { text: 'regenerative resource use', outcome: 'Not quite — Students often confuse "sustainable resource use" with "regenerative resource use." They wrongly.', reveals: 'students-often-confuse-sustainable-resource' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_3', title: 'Classification by Exhaustibility: Renewable and Non-Renewable',
          caseStudy: { intro: 'Observe the electricity powering your ceiling fan and the water flowing from your tap at home.',
            decisions: [{ prompt: 'Which of the following is a non-renewable natural resource? A) Wind energy harnessed in Tamil Nadu B) Coal deposits found in the Damodar.', options: [
                { text: 'B) Coal deposits found in the Damodar River Valley', outcome: 'B) Coal deposits found in the Damodar River Valley. Coal takes millions of years of heat and.' },
                { text: 'renewable resources', outcome: 'Not quite — Students often assume that all "renewable resources" are completely inexhaustible and can never run.', reveals: 'all-renewable-resources-are-completely' },
                { text: 'renewable', outcome: 'Not quite — Students often assume that all "renewable resources" are completely inexhaustible and can never run.', reveals: 'all-renewable-resources-are-completely' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A geologist reports rich iron ore 5 km under a forest. Digging would cost ₹10,000 per tonne while ore sells at ₹4,000. A local official declares, \'Iron is useful, so this deposit is already a resource — start mining.\'',
            decisions: [{ prompt: 'Is the deposit a resource yet?', options: [
                { text: 'Not yet — a substance becomes a resource only when it is useful, technologically reachable, economically feasible AND culturally acceptable. Useful it is, and reachable barely, but extraction costs more than the ore is worth, so it stays a potential resource.', outcome: 'This applies all four criteria rather than stopping at usefulness — physical existence alone never makes a resource.' },
                { text: 'The official is right — anything useful found in nature is automatically a resource we can use.', outcome: 'That confuses a natural deposit with a resource; the same logic would call ancient sunlight a power plant before solar technology existed.', reveals: 'useful-equals-resource' },
                { text: 'It fails only because mining technology is lacking — with better drills the price problem disappears.', outcome: 'Even with perfect drills the economics fail: paying ₹10,000 to recover ₹4,000 of ore is unfeasible regardless of the machinery used.', reveals: 'tech-fixes-economics' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'A resource is born when human need meets human know-how. The wind didn\'t get stronger — we got smarter. Utility, technology, cost and culture together decide what nature becomes wealth.',
            decisions: [{ prompt: 'What comes next? Natural Resources and Their Use · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Natural Resources and Their Use · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_geo_ch1_1', difficulty: 'standard',
          question: 'A resource is any element of the natural environment (matter or energy) that.',
          hint: 'If you are stuck, review how farmers in India use soil and seasonal monsoon rainfall.',
          misconception: 'Students often believe that if a natural substance exists on Earth (like water, coal, or solar energy), it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A resource is any element of the natural environment (matter or energy) that has utility',
                  options: ['A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,', 'A regenerative economy is an economic framework where human production and consumption'],
                  hint: 'If you are stuck, review how farmers in India use soil and seasonal monsoon rainfall to grow crops.',
                  misconception: 'Students often believe that if a natural substance exists on Earth (like water, coal, or solar energy), it is automatically and eternally.' }
          ],
            remediations: { 'if-a-natural-substance-exists': { steps: ['To correct this, guide the student through a simple thought experiment using petroleum (crude oil).', 'Show them a picture of black, sticky sludge bubbling up in a field in ancient Assam.', 'Ask: "If you found this sticky black mud 2,000 years ago, what would you do with it?" (They will say: nothing, it ruins.', 'Then explain: "Today, we refine it to run planes and cars." - **Step 1**: Contrast the ancient view (useless, toxic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a natural substance exists on Earth (like water, coal, or solar energy), it.',
          parts: [
                { id: 'a', prompt: 'A mining company wants to extract lithium (used for mobile batteries) from a site in Jammu and Kashmir that is considered sacred by local communities.', answer: 'No, it should not be classified as a fully viable resource immediately',
                  options: ['No, it should not be classified as a fully viable resource immediately', 'Yes, because mobile phones are more important than local beliefs', 'resource', 'solar energy has always been a resource for humans throughout history'],
                  hint: 'If you are stuck, review how farmers in India use soil and seasonal monsoon rainfall to grow crops.',
                  misconception: 'Students often believe that if a natural substance exists on Earth (like water, coal, or solar energy), it is automatically and eternally.' },
                { id: 'b', prompt: 'Propose a 3-step framework or checklist that a local government in Ladakh should use to decide whether the hot springs (geothermal energy) in the region should.', answer: 'The proposed framework should include: 1',
                  options: ['The proposed framework should include: 1', 'building the plant immediately to make money', 'resource', 'solar energy has always been a resource for humans throughout history'],
                  hint: 'If you are stuck, review how farmers in India use soil and seasonal monsoon rainfall to grow crops.',
                  misconception: 'Students often believe that if a natural substance exists on Earth (like water, coal, or solar energy), it is automatically and eternally.' }
          ],
            remediations: { 'if-a-natural-substance-exists': { steps: ['To correct this, guide the student through a simple thought experiment using petroleum (crude oil).', 'Show them a picture of black, sticky sludge bubbling up in a field in ancient Assam.', 'Ask: "If you found this sticky black mud 2,000 years ago, what would you do with it?" (They will say: nothing, it ruins.', 'Then explain: "Today, we refine it to run planes and cars." - **Step 1**: Contrast the ancient view (useless, toxic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_10', difficulty: 'standard',
          question: 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and.',
          hint: 'Revisit node c8_geo_ch1_3 to review why replenishability depends on time rates.',
          misconception: 'Students frequently believe that non-renewable resources cannot form naturally ever again.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural',
                  options: ['Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Resource conservation at individual and community levels refers to the deliberate,', 'A regenerative economy is an economic framework where human production and consumption'],
                  hint: 'Revisit node c8_geo_ch1_3 to review why replenishability depends on time rates.',
                  misconception: 'Students frequently believe that non-renewable resources cannot form naturally ever again.' }
          ],
            remediations: { 'students-frequently-believe-that-non': { steps: ['Draw a timeline showing 300,000,000 years on the left (formation of Gondwana coal) versus 200 years on the right.', 'Use the "Bank Account Analogy": Imagine a bank account where ₹1 is deposited every 10,000 years, but you withdraw.', 'Emphasize that "non-renewable" is defined by the human consumption rate surpassing the natural replenishment rate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_11', difficulty: 'standard',
          question: 'Resource conservation at individual and community levels refers to the.',
          hint: 'Review c8_geo_ch1_8 (Over-Exploitation of Resources) to understand why conservation.',
          misconception: 'Students frequently believe that natural resource conservation is solely the responsibility of government bodies.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Resource conservation at individual and community levels refers to the deliberate,',
                  options: ['Resource conservation at individual and community levels refers to the deliberate,', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'A regenerative economy is an economic framework where human production and consumption'],
                  hint: 'Review c8_geo_ch1_8 (Over-Exploitation of Resources) to understand why conservation actions are.',
                  misconception: 'Students frequently believe that natural resource conservation is solely the responsibility of government bodies through laws and.' }
          ],
            remediations: { 'students-frequently-believe-that-natural': { steps: ['Trace a resource (e.g., water or fuelwood) from its natural source (river, aquifer, forest) to a typical household tap.', 'Calculate how individual wastage multiplies when repeated by thousands of households in a town.', 'Map out local community interventions (like village *Pani Panchayats* or neighborhood composting drives) that protect.', 'Compare a degraded unmanaged source with a community-managed source to see the physical geographical difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_12', difficulty: 'standard',
          question: 'A regenerative economy is an economic framework where human production and.',
          hint: 'If stuck, review node c8_geo_ch1_8 to see how human over-exploitation degrades land.',
          misconception: 'Students often confuse "sustainable resource use" with "regenerative resource use." They wrongly assume that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A regenerative economy is an economic framework where human production and consumption',
                  options: ['A regenerative economy is an economic framework where human production and consumption', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'If stuck, review node c8_geo_ch1_8 to see how human over-exploitation degrades land, water, and.',
                  misconception: 'Students often confuse "sustainable resource use" with "regenerative resource use." They wrongly assume that regeneration simply means "not.' }
          ],
            remediations: { 'students-often-confuse-sustainable-resource': { steps: ['Revisit the concept of ecological health using a simple banking analogy: sustainable use means spending only the.', 'Examine a local degradation map (e.g., soil erosion map of India) to identify regions where simple conservation is.', 'Trace the biological process of soil building: show how decaying organic matter creates humus, which holds water, feeds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_2', difficulty: 'standard',
          question: 'Biotic resources are natural resources derived from the biosphere and organic.',
          hint: 'Review node `c8_geo_ch1_1` to reinforce how human technology transforms natural physical.',
          misconception: 'Students frequently believe that coal, petroleum, natural gas, fallen timber, and humus in soil are abiotic resources.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biotic resources are natural resources derived from the biosphere and organic matter,',
                  options: ['Biotic resources are natural resources derived from the biosphere and organic matter,', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'Review node `c8_geo_ch1_1` to reinforce how human technology transforms natural physical substances.',
                  misconception: 'Students frequently believe that coal, petroleum, natural gas, fallen timber, and humus in soil are abiotic resources because they are.' }
          ],
            remediations: { 'students-frequently-believe-that-coal': { steps: ['Draw an "Origin Flowchart" on the board with two main starting branches: "Derived from Biosphere / Organic Matter".', 'Present cards containing pictures of natural items: Crude Oil, Bauxite Ore, Fresh Water, Coral Reef, Natural Gas, and.', 'Trace Crude Oil and Natural Gas back to ancient plankton and algae (Biosphere -> Biotic), while tracing Bauxite Ore and.', 'Re-test the student by asking them to classify dead leaf litter (humus) using the origin rule rather than its current.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_3', difficulty: 'standard',
          question: 'Resources classified by exhaustibility are divided into renewable.',
          hint: 'If stuck, review node `c8_geo_ch1_2` to understand how abiotic rocks/minerals differ from.',
          misconception: 'Students often assume that all "renewable resources" are completely inexhaustible and can never run out regardless.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a non-renewable natural resource? A) Wind energy harnessed in Tamil Nadu B) Coal deposits found in the Damodar River Valley C) Solar.', answer: 'B) Coal deposits found in the Damodar River Valley',
                  options: ['B) Coal deposits found in the Damodar River Valley', 'renewable resources', 'renewable'],
                  hint: 'If stuck, review node `c8_geo_ch1_2` to understand how abiotic rocks/minerals differ from dynamic.',
                  misconception: 'Students often assume that all "renewable resources" are completely inexhaustible and can never run out regardless of how humans use them.' },
                { id: 'b', prompt: 'A thermal power station burns 10,000 tonnes of coal daily, drawn from a local reserve estimated at 3,65,000 tonnes.', answer: 'Steps to solve: 1',
                  options: ['Steps to solve: 1', 'renewable resources', 'renewable'],
                  hint: 'If stuck, review node `c8_geo_ch1_2` to understand how abiotic rocks/minerals differ from dynamic.',
                  misconception: 'Students often assume that all "renewable resources" are completely inexhaustible and can never run out regardless of how humans use them.' },
                { id: 'c', prompt: 'Compare topsoil in an agricultural farm in Uttar Pradesh with petroleum in an offshore field in Mumbai High.', answer: 'Topsoil is naturally renewable through organic decay and rock weathering, taking',
                  options: ['Topsoil is naturally renewable through organic decay and rock weathering, taking', 'renewable resources', 'renewable'],
                  hint: 'If stuck, review node `c8_geo_ch1_2` to understand how abiotic rocks/minerals differ from dynamic.',
                  misconception: 'Students often assume that all "renewable resources" are completely inexhaustible and can never run out regardless of how humans use them.' }
          ],
            remediations: { 'all-renewable-resources-are-completely': { steps: ['When students exhibit this misconception, lead them through a "Bucket and Tap" physical analogy: 1.', 'Take a bucket representing a groundwater aquifer or local forest reserve.', 'Pour water into the bucket at a slow, steady rate using a cup (representing natural monsoon recharge or tree growth.', 'Punch a large hole at the bottom of the bucket (representing heavy industrial or agricultural extraction).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
