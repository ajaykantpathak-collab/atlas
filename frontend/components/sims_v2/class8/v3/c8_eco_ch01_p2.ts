import type { SimDef } from '../../engine/types';

/** v3 generated — c8_eco_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_eco_ch01_p2: SimDef = {
    id: 'v3_c8_eco_ch01_p2',
    title: 'Factors of Production · Part 2/2',
    subtitle: 'Turn raw stuff into real value',
    classLevel: 8, subject: 'economics', topic: 'Factors of Production · Part 2/2',
    chapters: ['c8_eco_ch01'],
    nodeIds: ['c8_eco_ch1_4', 'c8_eco_ch1_5', 'c8_eco_ch1_6', 'c8_eco_ch1_7', 'c8_eco_ch1_8', 'c8_eco_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior production analyst', intro: 'Flour becomes bread, clay becomes pots, code becomes software. Your job: trace what goes in, what comes out, and figure out where the extra value was created.', goal: 'Understand production as an input–transformation–output process that adds economic value, and recognise it in services and intangibles, not just factories.' },
    discovery: {
        question: 'A potter uses ₹150 of clay and ₹100 of labour to make 2 pots that sell for ₹200 each. What\'s the total value of what went in versus what came out?',
        options: ['₹250 of inputs became ₹400 of outputs — the transformation added value', '₹150 of inputs became ₹200 of outputs', '₹400 of inputs became ₹250 of outputs', 'You can\'t compare them — labour isn\'t a real input'],
        answer: '₹250 of inputs became ₹400 of outputs — the transformation added value',
        hook: 'People forget labour when counting costs — they only see the clay. But production counts every input, including time and effort, and the magic is that outputs end up worth more than what went in.',
    },
    teaching: [
        { title: 'Labour as a Factor of Production: Human Effort', text: 'Labour as a factor of production refers to the physical and mental human effort exerted in the creation of goods and services in exchange for an economic reward such as wages or salaries.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_eco_ch1_4', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run three mini production units — a bakery, a hair salon and a software firm — and correctly tag every input (materials, labour, tools) and every output (bread, haircuts, code), then prove each one created new value.',
        labels: ['Labour as a Factor', 'Capital as a Factor', 'Entrepreneurship: Organising Factors', 'Human Capital: Skills, Knowledge,', 'Interconnection Between Factors', 'Business or Enterprise: Combining'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_eco_ch1_4', title: 'Labour as a Factor of Production: Human Effort',
          scaffold: { problem: 'A small tailoring shop in Jaipur employs 3 tailors. Each tailor works 8 hours a day and stitches 5 kurtas per day.',
            steps: [
            { text: 'Identify given data: Number of workers = 3, Daily wage per worker = ₹400, Kurtas stitched per worker = 5.' },
            { text: 'Calculate total daily wages paid by multiplying the number of workers by the wage per worker (3 × ₹400 = ₹1,200).' },
            { text: 'Calculate total daily output of kurtas by multiplying the number of workers by kurtas per worker (3 × 5 = 15 kurtas).' },
            { text: 'Apply the unit labour cost formula by dividing total wages by total output (₹1,200 / 15).' },
            { text: 'Interpret the result to find the exact labour cost per unit (₹80 per kurta).', faded: true, blankAnswer: 'Total daily labour cost is ₹1,200; Labour cost per kurta.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch1_5', title: 'Capital as a Factor of Production: Tools, Machinery, Money',
          scaffold: { problem: 'A small woodworking workshop in Nagpur wants to calculate its total capital investment for starting furniture production.',
            steps: [
            { text: 'Identify items that are durable, long-lasting physical assets used over multiple production cycles (Fixed Capital).' },
            { text: 'Sum the fixed capital values: ₹45,000 + ₹10,000 = ₹55,000.' },
            { text: 'Identify items that are consumed or circulated during production, including raw materials and daily cash float (Working.' },
            { text: 'Sum the working capital values: ₹20,000 + ₹2,000 + ₹3,000 = ₹25,000.' },
            { text: 'Add Fixed Capital and Working Capital to find Total Capital: ₹55,000 + ₹25,000 = ₹80,000.', faded: true, blankAnswer: 'Fixed Capital = ₹55,000; Working Capital = ₹25,000; Total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch1_6', title: 'Entrepreneurship: Organising Factors of Production',
          scaffold: { problem: 'Riya wants to start a pottery workshop in Jaipur. She rents a shed for ₹5,000 per month (Land), hires an artisan for ₹8,000 per month.',
            steps: [
            { text: 'Identify and sum all factor costs (Rent = ₹5,000; Wages = ₹8,000; Interest on Capital = 10% of ₹12,000 for one year.' },
            { text: 'Calculate total revenue by multiplying quantity sold by selling price (100 pots × ₹300 = ₹30,000).' },
            { text: 'Apply the profit formula: Profit = Total Revenue - Total Cost.' },
            { text: 'Compute the final value: ₹30,000 - ₹14,000 = ₹16,000.', faded: true, blankAnswer: 'Profit = ₹16,000 per month' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch1_7', title: 'Human Capital: Skills, Knowledge, and Education',
          caseStudy: { intro: 'Imagine two farmers in Bihar, Ramesh and Suresh, who both own exactly one acre of land.',
            decisions: [{ prompt: 'Define human capital in your own words and list its three primary components.', options: [
                { text: 'Human capital is the stock of skills, knowledge, and health embodied in people that makes', outcome: 'Human capital is the stock of skills, knowledge, and health embodied in people that makes them.' },
                { text: 'the total number of workers in a country', outcome: 'Not quite — Students frequently confuse "Labor" with "Human Capital." They assume that they are the same thing.', reveals: 'students-frequently-confuse-labor-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_9', title: 'Business or Enterprise: Combining Inputs to Create Goods',
          caseStudy: { intro: 'Imagine Ramesh, who wants to start a small bakery in his town in Bihar.',
            decisions: [{ prompt: 'What is the primary function of a business enterprise when it combines inputs?', options: [
                { text: 'The primary function of a business enterprise is to organize, coordinate, and manage the', outcome: 'The primary function of a business enterprise is to organize, coordinate, and manage the other.' },
                { text: 'only to make money without needing other resources', outcome: 'Not quite — Students often believe that a business\'s total cost consists only of direct, out-of-pocket cash.', reveals: 'a-business-s-total-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'For an economics poster, Tara photographs a car factory and captions it \'production.\' Her partner says their mother\'s hair salon cannot appear on the poster \'because no goods roll off an assembly line there.\'',
            decisions: [{ prompt: 'Should the salon be on the poster?', options: [
                { text: 'Yes — production is any process combining inputs into outputs that satisfy wants. The salon uses scissors, shampoo, electricity and the stylist\'s labour (inputs) and transforms them into haircuts and styling services (outputs); services count just as much as factory goods.', outcome: 'This applies the input-transformation-output definition broadly, recognising that value creation is not limited to manufacturing.' },
                { text: 'The partner is right — production means factories and machines, so a salon is just a service, not production.', outcome: 'That restricts production to physical goods and erases the service economy; a haircut is an output created from real inputs and labour.', reveals: 'production-needs-factory' },
                { text: 'Only if the salon also sells shampoo bottles — a service alone is never an output because you cannot hold it.', outcome: 'Outputs can be intangible; software and haircuts satisfy wants without being holdable, so the haircut already qualifies.', reveals: 'outputs-must-be-solid' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Production isn\'t just factories. Anywhere inputs get transformed into something people want — a haircut, a meal, an app — an economy is being built, one output at a time.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_eco_ch1_4', difficulty: 'standard',
          question: 'Labour as a factor of production refers to the physical and mental human effort.',
          hint: 'Review c8_eco_ch1_2 to remember the four factors of production before focusing on human.',
          misconception: 'Students often think that \'labour\' only includes heavy physical manual work done by construction workers or factory.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Labour as a factor of production refers to the physical and mental human effort exerted',
                  options: ['Labour as a factor of production refers to the physical and mental human effort exerted', 'The production process is the systematic method of combining various inputs (resources)', 'Goods are physical, tangible objects (like steel, rice, or laptops) that can be touched,', 'Technology in production refers to the application of scientific knowledge, tools,'],
                  hint: 'Review c8_eco_ch1_2 to remember the four factors of production before focusing on human effort.',
                  misconception: 'Students often think that \'labour\' only includes heavy physical manual work done by construction workers or factory hands, completely.' }
          ],
            remediations: { 'labour-only-includes-heavy-physical': { steps: ['To fix this, clarify that economics defines labour as *any* human effort—whether using muscles or the mind—directed.', 'Ask the student to compare a daily-wage mason building a wall with an architect drawing the blueprint; both are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_5', difficulty: 'standard',
          question: 'Capital as a factor of production refers to manufactured goods and financial.',
          hint: 'Review c8_eco_ch1_2 to reinforce the four basic factors of production and ensure the.',
          misconception: 'Students often confuse "money" with "capital" entirely, assuming that any cash a person holds is automatically a factor.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Capital as a factor of production refers to manufactured goods and financial',
                  options: ['Capital as a factor of production refers to manufactured goods and financial', 'The production process is the systematic method of combining various inputs (resources)', 'Goods are physical, tangible objects (like steel, rice, or laptops) that can be touched,', 'Technology in production refers to the application of scientific knowledge, tools,'],
                  hint: 'Review c8_eco_ch1_2 to reinforce the four basic factors of production and ensure the distinction.',
                  misconception: 'Students often confuse "money" with "capital" entirely, assuming that any cash a person holds is automatically a factor of production.' }
          ],
            remediations: { 'students-often-confuse-money-with': { steps: ['To correct this, guide the student through a sorting exercise using two columns: "Money used for Personal Consumption".', 'Emphasize that the economic role depends entirely on the purpose and destination of the funds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_6', difficulty: 'standard',
          question: 'Entrepreneurship is the fourth factor of production—the human force that.',
          hint: 'Review c8_eco_ch1_2 to understand the distinct roles of land, labour, and capital before.',
          misconception: 'Students often think that the entrepreneur is simply the richest person who provides the money (capital), failing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Entrepreneurship is the fourth factor of production—the human force that combines land,',
                  options: ['Entrepreneurship is the fourth factor of production—the human force that combines land,', 'The production process is the systematic method of combining various inputs (resources)', 'Goods are physical, tangible objects (like steel, rice, or laptops) that can be touched,', 'Technology in production refers to the application of scientific knowledge, tools,'],
                  hint: 'Review c8_eco_ch1_2 to understand the distinct roles of land, labour, and capital before tackling.',
                  misconception: 'Students often think that the entrepreneur is simply the richest person who provides the money (capital), failing to see that.' }
          ],
            remediations: { 'the-entrepreneur-is-simply-the': { steps: ['To fix this, break down a local shop into its four distinct components on a whiteboard: the physical shop floor (Land).', 'Emphasize that the shop owner\'s unique role is making decisions under uncertainty, not just owning the cash register.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_7', difficulty: 'standard',
          question: 'Human capital is the stock of skills, knowledge, experience, and health.',
          hint: 'Work step by step.',
          misconception: 'Students frequently confuse "Labor" with "Human Capital." They assume that they are the same thing and that doubling.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human capital is the stock of skills, knowledge, experience, and health embodied in',
                  options: ['Human capital is the stock of skills, knowledge, experience, and health embodied in', 'The production process is the systematic method of combining various inputs (resources)', 'Goods are physical, tangible objects (like steel, rice, or laptops) that can be touched,', 'Technology in production refers to the application of scientific knowledge, tools,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students frequently confuse "Labor" with "Human Capital." They assume that they are the same thing and that doubling the number of workers.' }
          ],
            remediations: { 'students-frequently-confuse-labor-with': { steps: ['To correct this misconception, guide the student through a hands-on comparison of two agricultural scenarios: 1.', '**Scenario A (Increasing Labor):** A farmer has 1 acre of land and hires 10 untrained laborers who only have hand.', 'Because the land is crowded, they get in each other\'s way, and total production only increases slightly.', '**Scenario B (Increasing Human Capital):** The farmer keeps only 2 laborers but pays for them to attend a modern.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_8', difficulty: 'standard',
          question: 'The interconnection between factors of production refers to the essential.',
          hint: 'Review c8_eco_ch1_2 to refresh the core definitions of each individual factor before.',
          misconception: 'Students often think that factors of production can be substituted infinitely without limits—believing that if you add.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The interconnection between factors of production refers to the essential economic',
                  options: ['The interconnection between factors of production refers to the essential economic', 'The production process is the systematic method of combining various inputs (resources)', 'Goods are physical, tangible objects (like steel, rice, or laptops) that can be touched,', 'Technology in production refers to the application of scientific knowledge, tools,'],
                  hint: 'Review c8_eco_ch1_2 to refresh the core definitions of each individual factor before looking at how.',
                  misconception: 'Students often think that factors of production can be substituted infinitely without limits—believing that if you add more capital.' }
          ],
            remediations: { 'factors-of-production-can-be': { steps: ['To fix this, trace a real production chain on the board: 1.', 'Start with poor quality soil (land) and untrained workers (labour).', 'Introduce a high-cost automated harvester (capital).', 'Show how an untrained worker breaks the machine\'s gears on rocky soil, leading to repair costs that bankrupt the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch1_9', difficulty: 'standard',
          question: 'A business or enterprise is an economic organization that systematically.',
          hint: 'Work step by step.',
          misconception: 'Students often believe that a business\'s total cost consists only of direct, out-of-pocket cash payments (explicit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A business or enterprise is an economic organization that systematically coordinates and',
                  options: ['A business or enterprise is an economic organization that systematically coordinates and', 'The production process is the systematic method of combining various inputs (resources)', 'Goods are physical, tangible objects (like steel, rice, or laptops) that can be touched,', 'Technology in production refers to the application of scientific knowledge, tools,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students often believe that a business\'s total cost consists only of direct, out-of-pocket cash payments (explicit costs like buying raw.' }
          ],
            remediations: { 'a-business-s-total-cost': { steps: ['To correct this misconception, guide the student through a comparison table using a real-world example: 1.', '**Scenario A (Renting):** Juhi rents a room for ₹3,000/month to run a tailoring shop.', 'She pays ₹5,000 for cloth.', 'Her explicit cost is ₹8,000.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
