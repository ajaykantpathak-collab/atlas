import type { SimDef } from '../../engine/types';

/** v3 generated — c8_eco_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_eco_ch01_p1: SimDef = {
    id: 'v3_c8_eco_ch01_p1',
    title: 'Factors of Production · Part 1/2',
    subtitle: 'Turn raw stuff into real value',
    classLevel: 8, subject: 'economics', topic: 'Factors of Production · Part 1/2',
    chapters: ['c8_eco_ch01'],
    nodeIds: ['c8_eco_ch1_1', 'c8_eco_ch1_10', 'c8_eco_ch1_11', 'c8_eco_ch1_12', 'c8_eco_ch1_2', 'c8_eco_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior production analyst', intro: 'Flour becomes bread, clay becomes pots, code becomes software. Your job: trace what goes in, what comes out, and figure out where the extra value was created.', goal: 'Understand production as an input–transformation–output process that adds economic value, and recognise it in services and intangibles, not just factories.' },
    discovery: {
        question: 'A potter uses ₹150 of clay and ₹100 of labour to make 2 pots that sell for ₹200 each. What\'s the total value of what went in versus what came out?',
        options: ['₹250 of inputs became ₹400 of outputs — the transformation added value', '₹150 of inputs became ₹200 of outputs', '₹400 of inputs became ₹250 of outputs', 'You can\'t compare them — labour isn\'t a real input'],
        answer: '₹250 of inputs became ₹400 of outputs — the transformation added value',
        hook: 'People forget labour when counting costs — they only see the clay. But production counts every input, including time and effort, and the magic is that outputs end up worth more than what went in.',
    },
    teaching: [
        { title: 'Production Process: Inputs and Outputs', text: 'The production process is the systematic method of combining various inputs (resources) through a transformation process to create outputs (goods and services) that satisfy human wants and generate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_eco_ch1_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run three mini production units — a bakery, a hair salon and a software firm — and correctly tag every input (materials, labour, tools) and every output (bread, haircuts, code), then prove each one created new value.',
        labels: ['Production Process: Inputs', 'Types of Goods', 'Role of Technology', 'Sustainable Production: Efficient Use', 'Factors of Production: Definition', 'Land as a Factor'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_eco_ch1_1', title: 'Production Process: Inputs and Outputs',
          caseStudy: { intro: 'Imagine walking into a local bakery in your neighborhood and watching the baker mix flour, sugar, water, and yeast, place the dough into a hot oven, and pull.',
            decisions: [{ prompt: 'What are the two primary components that make up any basic economic production process?', options: [
                { text: 'The two primary components are inputs and outputs', outcome: 'The two primary components are inputs and outputs. A student who answers incorrectly by naming only.' },
                { text: 'production', outcome: 'Not quite — Students often think that "production" only refers to large factories making heavy industrial.', reveals: 'production-only-refers-to-large' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_10', title: 'Types of Goods and Services: Examples from Daily Life',
          caseStudy: { intro: 'Imagine walking through a bustling local market in India: you buy a basket of fresh apples from a fruit vendor, and later your parents take you to a local.',
            decisions: [{ prompt: 'Which of the following is classified strictly as an economic service rather than a physical good in daily life?', options: [
                { text: 'B) A haircut received from a local barber at a salon', outcome: 'B) A haircut received from a local barber at a salon. A haircut is an intangible economic activity.' },
                { text: 'consumer good', outcome: 'Not quite — Students often think that any item purchased with money is automatically a "consumer good" and fail.', reveals: 'any-item-purchased-with-money' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_11', title: 'Role of Technology in Production',
          caseStudy: { intro: 'Let us begin with a real-world scenario from Khurja, Uttar Pradesh, a town famous for pottery. Ramesh runs a small workshop making clay cups (*kulhads*).',
            decisions: [{ prompt: 'What is meant by "productivity" in a production process, and how is it calculated?', options: [
                { text: 'Productivity is a measure of how efficiently inputs are converted into outputs', outcome: 'Productivity is a measure of how efficiently inputs are converted into outputs.' },
                { text: 'the total amount of goods produced', outcome: 'Not quite — a wrong answer reveals:* If a student defines productivity simply as "the total amount of goods.', reveals: 'a-wrong-answer-reveals-if' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch1_12', title: 'Sustainable Production: Efficient Use of Resources',
          scaffold: { problem: 'A clay toy maker in pottery village uses 500 kg of clay to make 400 finished toys, while 100 kg of clay is ruined and wasted during.',
            steps: [
            { text: 'Identify initial inputs and useful outputs: Total Input = 500 kg, Useful Output = 400 kg.' },
            { text: 'Recall the resource efficiency formula: Efficiency = (Useful Output / Total Input) × 100.' },
            { text: 'Calculate initial efficiency: (400 / 500) × 100 = 0.8 × 100 = 80%.' },
            { text: 'Identify new inputs with reduced waste: Total Input = 400 kg toys + 20 kg waste = 420 kg of clay used for 400 toys.' },
            { text: 'Calculate new efficiency: (400 / 420) × 100 = 95.24%.', faded: true, blankAnswer: 'Initial efficiency was 80%; new efficiency is 95.24%.' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch1_2', title: 'Factors of Production: Definition and Types',
          caseStudy: { intro: 'Imagine you visit a local bakery in your town that makes fresh biscuits.',
            decisions: [{ prompt: 'What are the four primary factors of production recognized in economics?', options: [
                { text: 'The four primary factors of production are land, labour, capital, and entrepreneurship', outcome: 'The four primary factors of production are land, labour, capital, and entrepreneurship.' },
                { text: '\'capital\' means money or financial funds used to start a business', outcome: 'Not quite — Students often think that \'capital\' means money or financial funds used to start a business.', reveals: 'capital-means-money-or-financial' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For an economics poster, Tara photographs a car factory and captions it \'production.\' Her partner says their mother\'s hair salon cannot appear on the poster \'because no goods roll off an assembly line there.\'',
            decisions: [{ prompt: 'Should the salon be on the poster?', options: [
                { text: 'Yes — production is any process combining inputs into outputs that satisfy wants. The salon uses scissors, shampoo, electricity and the stylist\'s labour (inputs) and transforms them into haircuts and styling services (outputs); services count just as much as factory goods.', outcome: 'This applies the input-transformation-output definition broadly, recognising that value creation is not limited to manufacturing.' },
                { text: 'The partner is right — production means factories and machines, so a salon is just a service, not production.', outcome: 'That restricts production to physical goods and erases the service economy; a haircut is an output created from real inputs and labour.', reveals: 'production-needs-factory' },
                { text: 'Only if the salon also sells shampoo bottles — a service alone is never an output because you cannot hold it.', outcome: 'Outputs can be intangible; software and haircuts satisfy wants without being holdable, so the haircut already qualifies.', reveals: 'outputs-must-be-solid' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'Production isn\'t just factories. Anywhere inputs get transformed into something people want — a haircut, a meal, an app — an economy is being built, one output at a time.',
            decisions: [{ prompt: 'What comes next? Factors of Production · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Factors of Production · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_eco_ch1_1', difficulty: 'standard',
          question: 'The production process is the systematic method of combining various inputs.',
          hint: 'Review c6_economics_ch12_001 to recall how markets operate and what items are exchanged.',
          misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail.',
          parts: [
                { id: 'a', prompt: 'What are the two primary components that make up any basic economic production process?', answer: 'The two primary components are inputs and outputs',
                  options: ['The two primary components are inputs and outputs', 'production'],
                  hint: 'Review c6_economics_ch12_001 to recall how markets operate and what items are exchanged between.',
                  misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail to recognize that.' },
                { id: 'b', prompt: 'Why is a wooden chair considered an output rather than an input when a carpenter finishes making it in a workshop?', answer: 'A wooden chair is an output',
                  options: ['A wooden chair is an output', 'production'],
                  hint: 'Review c6_economics_ch12_001 to recall how markets operate and what items are exchanged between.',
                  misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail to recognize that.' },
                { id: 'c', prompt: 'A local pottery maker uses 5 kilograms of clay, worth ₹150, and spends 2 hours of labor valued at ₹100 to make 2 finished clay pots that sell for ₹200 each.', answer: 'Step 1: Identify material input cost = ₹150',
                  options: ['Step 1: Identify material input cost = ₹150', 'production'],
                  hint: 'Review c6_economics_ch12_001 to recall how markets operate and what items are exchanged between.',
                  misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail to recognize that.' },
                { id: 'd', prompt: 'How does the transformation of raw cotton into a finished school uniform demonstrate the core concept of the production process?', answer: 'Raw cotton, buttons, and thread serve as inputs',
                  options: ['Raw cotton, buttons, and thread serve as inputs', 'production'],
                  hint: 'Review c6_economics_ch12_001 to recall how markets operate and what items are exchanged between.',
                  misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail to recognize that.' }
          ],
            remediations: { 'production-only-refers-to-large': { steps: ['To fix this, guide the student through a non-factory example like a hair salon or a restaurant.', 'List what the salon uses (scissors, shampoo, electricity, stylist\'s time) as inputs and the haircut or styling service.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether a computer software program created by an IT firm in Bengaluru fits the definition of an output in the production process, even though it.', answer: 'Yes, software is an output',
                  options: ['Yes, software is an output', 'production'],
                  hint: 'Review c6_economics_ch12_001 to recall how markets operate and what items are exchanged between.',
                  misconception: 'Students often think that "production" only refers to large factories making heavy industrial goods, and they fail to recognize that.' }
          ],
            remediations: { 'production-only-refers-to-large': { steps: ['To fix this, guide the student through a non-factory example like a hair salon or a restaurant.', 'List what the salon uses (scissors, shampoo, electricity, stylist\'s time) as inputs and the haircut or styling service.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_10', difficulty: 'standard',
          question: 'Goods are physical, tangible objects (like steel, rice, or laptops) that can.',
          hint: 'Review basic market transactions and the difference between buying a physical apple.',
          misconception: 'Students often think that any item purchased with money is automatically a "consumer good" and fail to realize that the.',
          parts: [
                { id: 'a', prompt: 'Which of the following is classified strictly as an economic service rather than a physical good in daily life?', answer: 'B) A haircut received from a local barber at a salon',
                  options: ['B) A haircut received from a local barber at a salon', 'consumer good'],
                  hint: 'Review basic market transactions and the difference between buying a physical apple versus paying.',
                  misconception: 'Students often think that any item purchased with money is automatically a "consumer good" and fail to realize that the exact same physical.' },
                { id: 'b', prompt: 'A local bakery in Chennai produces 200 loaves of bread using flour, yeast, and an oven (valued at ₹4,000 total input cost) and sells them all to households for.', answer: 'Identify input cost (₹4,000) and total revenue from sale (₹6,000)',
                  options: ['Identify input cost (₹4,000) and total revenue from sale (₹6,000)', 'consumer good'],
                  hint: 'Review basic market transactions and the difference between buying a physical apple versus paying.',
                  misconception: 'Students often think that any item purchased with money is automatically a "consumer good" and fail to realize that the exact same physical.' }
          ],
            remediations: { 'any-item-purchased-with-money': { steps: ['To fix this, guide the student through a two-step questioning technique: First, ask "Can you touch and store this.', 'Second, ask "Who is using this item and for what purpose?" If a household uses it for personal living, it is a consumer.', 'If a business uses it to make other products or services for profit, it is a producer good.', 'Practice this with everyday items like a delivery scooter used by a courier company versus a family bicycle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_11', difficulty: 'standard',
          question: 'Technology in production refers to the application of scientific knowledge.',
          hint: 'Work step by step.',
          misconception: 'a wrong answer reveals:* If a student defines productivity simply as "the total amount of goods produced," they are.',
          parts: [
                { id: 'a', prompt: 'What is meant by "productivity" in a production process, and how is it calculated?', answer: 'Productivity is a measure of how efficiently inputs are converted into outputs',
                  options: ['Productivity is a measure of how efficiently inputs are converted into outputs', 'the total amount of goods produced'],
                  hint: 'Think about the key idea.',
                  misconception: 'a wrong answer reveals:* If a student defines productivity simply as "the total amount of goods produced," they are confusing *total.' },
                { id: 'b', prompt: 'Explain why introducing an automatic drip irrigation system on a farm is considered a "technological upgrade," even though the physical land and the water.', answer: 'Drip irrigation is a technological upgrade',
                  options: ['Drip irrigation is a technological upgrade', 'it is just water and pipes, not computers', 'technology', 'the total amount of goods produced'],
                  hint: 'Think about the key idea.',
                  misconception: 'a wrong answer reveals:* If a student defines productivity simply as "the total amount of goods produced," they are confusing *total.' },
                { id: 'c', prompt: 'A textile workshop in Tiruppur has 5 tailors. Using manual sewing machines, they produce a total of 25 shirts per day.', answer: '**Step 1:** Identify initial data: Output = 25 shirts, Labour = 5 tailors',
                  options: ['**Step 1:** Identify initial data: Output = 25 shirts, Labour = 5 tailors', 'the total amount of goods produced'],
                  hint: 'Think about the key idea.',
                  misconception: 'a wrong answer reveals:* If a student defines productivity simply as "the total amount of goods produced," they are confusing *total.' }
          ],
            remediations: { 'a-wrong-answer-reveals-if': { steps: ['Re-read the WALKTHROUGH above, then retry the diagnostic.', 'If it still feels unclear, open the prerequisite lesson linked on this page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_12', difficulty: 'standard',
          question: 'Sustainable production is the method of manufacturing goods and services using.',
          hint: 'Review c8_eco_ch1_1 to understand inputs and outputs, then examine how wasted inputs.',
          misconception: 'Students often think that "sustainable production" is purely an act of charity or environmental protection that has.',
          parts: [
                { id: 'a', prompt: 'A paper mill uses 1,000 kilograms of wood pulp to produce 800 kilograms of paper, generating 200 kilograms of waste sludge.', answer: 'Identify initial paper output: 800 kg',
                  options: ['Identify initial paper output: 800 kg', 'sustainable production'],
                  hint: 'Review c8_eco_ch1_1 to understand inputs and outputs, then examine how wasted inputs drive.',
                  misconception: 'Students often think that "sustainable production" is purely an act of charity or environmental protection that has no relationship.' },
                { id: 'b', prompt: 'Analyze how shifting from traditional coal-powered electricity to solar energy affects a manufacturing firm\'s variable costs and its dependency on natural.', answer: 'Shifting to solar energy reduces long-term variable energy costs',
                  options: ['Shifting to solar energy reduces long-term variable energy costs', 'sustainable production'],
                  hint: 'Review c8_eco_ch1_1 to understand inputs and outputs, then examine how wasted inputs drive.',
                  misconception: 'Students often think that "sustainable production" is purely an act of charity or environmental protection that has no relationship.' }
          ],
            remediations: { 'sustainable-production-is-purely-an': { steps: ['Calculate the cost of 20% wasted flour per month.', 'Calculate the savings when waste drops to 2%.', 'Compare those savings against the negligible cost of buying a dough-scrap collector.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_2', difficulty: 'standard',
          question: 'Factors of production are the economic resources—specifically land, labour.',
          hint: 'Review node c8_eco_ch1_1 to understand how basic inputs transform into outputs.',
          misconception: 'Students often think that \'capital\' means money or financial funds used to start a business.',
          parts: [
                { id: 'a', prompt: 'A local textile factory in Surat employs 50 workers, uses 10 electric looms, sits on a 2000 sq meter plot, and is managed by Mr.', answer: 'Step 1: Identify the inputs mentioned in the scenario',
                  options: ['Step 1: Identify the inputs mentioned in the scenario', '\'capital\' means money or financial funds used to start a business'],
                  hint: 'Review node c8_eco_ch1_1 to understand how basic inputs transform into outputs.',
                  misconception: 'Students often think that \'capital\' means money or financial funds used to start a business.' }
          ],
            remediations: { 'capital-means-money-or-financial': { steps: ['To fix this, clarify that while money is used to *buy* capital, money itself does not produce goods.', 'Ask students: \'Does a currency note bake bread, or does an oven bake bread?\' Show that the oven is physical capital.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_3', difficulty: 'standard',
          question: 'Land as a factor of production refers to all natural resources—including soil.',
          hint: 'Review c8_eco_ch1_2 to refresh the basic categories of production inputs before focusing.',
          misconception: 'Students often confuse "land" as a factor of production with real estate property or urban plots used for housing.',
          parts: [
                { id: 'a', prompt: 'A farmer in Haryana owns 5 acres of land. Over three years, the farmer uses chemical fertilizers intensively, raising wheat production from 100 quintals to 140.', answer: 'Identify initial yield per acre: 100 quintals / 5 acres = 20 quintals/acre',
                  options: ['Identify initial yield per acre: 100 quintals / 5 acres = 20 quintals/acre', 'higher output means more land was created'],
                  hint: 'Review c8_eco_ch1_2 to refresh the basic categories of production inputs before focusing.',
                  misconception: 'Students often confuse "land" as a factor of production with real estate property or urban plots used for housing.' }
          ],
            remediations: { 'students-often-confuse-land-as': { steps: ['To fix this, separate physical structures from natural elements using a simple equation: Total Production Input.', 'Ask students to look at a cotton shirt: the cotton plant grew from soil and water (Land), the spinning machine was.', 'Reinforce that land strictly refers to what nature provides before humans modify it.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
