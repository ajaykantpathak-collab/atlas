import type { SimDef } from '../../engine/types';

/** v3 generated — c8_eco_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_eco_ch03_p1: SimDef = {
    id: 'v3_c8_eco_ch03_p1',
    title: 'India\'s Urban Landscape · Part 1/2',
    subtitle: 'What actually makes a town a town',
    classLevel: 8, subject: 'economics', topic: 'India\'s Urban Landscape · Part 1/2',
    chapters: ['c8_eco_ch03'],
    nodeIds: ['c8_eco_ch3_1', 'c8_eco_ch3_10', 'c8_eco_ch3_11', 'c8_eco_ch3_12', 'c8_eco_ch3_2', 'c8_eco_ch3_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a census classification officer', intro: 'A crowded village and a small town can look identical from a bus window. Your job: apply the three official tests and find out which settlements truly crossed the line.', goal: 'Understand the Census criteria separating urban from rural India — population size, density and occupational structure — and how infrastructure shifts drive urbanisation.' },
    discovery: {
        question: 'A village has 10,000 residents — bigger than many towns — yet the Census still calls it rural. What gives?',
        options: ['80% of its workers still farm — a place is only urban when at least 75% of male workers do non-agricultural work', 'The Census just hasn\'t updated its records yet', 'It\'s rural because it lacks a shopping mall', 'Any place with fields nearby is automatically rural'],
        answer: '80% of its workers still farm — a place is only urban when at least 75% of male workers do non-agricultural work',
        hook: 'Big doesn\'t mean urban. The Census demands all three at once: 5,000+ people, 400+ per sq km, AND three-quarters of male workers off the farm. Miss one and you\'re still a village.',
    },
    teaching: [
        { title: 'Urban vs Rural Areas: Defining Characteristics', text: 'An urban area is a human settlement characterized by high population density, administrative recognition (like a municipality), and an economic structure where the vast majority of the workforce.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_eco_ch3_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit Settlement Z — 6,000 people on 20 sq km with 80% in factories — and decide if it earns \'town\' status. Then predict whether a new hospital and college could flip a rural block urban within ten years.',
        labels: ['Urban vs Rural Areas', 'Smart Cities: Technology', 'Urban Local Bodies: Municipal', 'Rural-Urban Migration: Push', 'India\'s Urban Legacy: From', 'Population Density in Cities'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_eco_ch3_1', title: 'Urban vs Rural Areas: Defining Characteristics',
          caseStudy: { intro: 'Imagine traveling from a peaceful village in rural Haryana to the bustling city of Gurugram.',
            decisions: [{ prompt: 'According to the Census of India, what are the three specific criteria that a settlement must simultaneously satisfy to be classified as.', options: [
                { text: 'To be classified as a Census Town, a settlement must have: (1) a minimum population of', outcome: 'To be classified as a Census Town, a settlement must have: (1) a minimum population of 5,000, (2).' },
                { text: 'it has many buildings', outcome: 'Not quite — Students often think that "urban" and "rural" are defined purely by visual modern amenities (like.', reveals: 'urban-and-rural-are-defined' },
                { text: 'only population size', outcome: 'Not quite — Students often think that "urban" and "rural" are defined purely by visual modern amenities (like.', reveals: 'urban-and-rural-are-defined' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch3_10', title: 'Smart Cities: Technology and Sustainable Urban Development',
          caseStudy: { intro: 'Imagine walking down an urban street in India in the middle of a hot afternoon.',
            decisions: [{ prompt: 'What is the primary economic objective of integrating Information and Communication Technology (ICT) into public utilities under the Smart.', options: [
                { text: 'The primary economic objective is to optimize resource allocation and reduce operational', outcome: 'The primary economic objective is to optimize resource allocation and reduce operational costs.' },
                { text: 'to make cities look futuristic', outcome: 'Not quite — Students frequently believe that a "Smart City" is defined by expensive, visible gadgets—like.', reveals: 'students-frequently-believe-that-a' },
                { text: 'to provide free internet', outcome: 'Not quite — Students frequently believe that a "Smart City" is defined by expensive, visible gadgets—like.', reveals: 'students-frequently-believe-that-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch3_11', title: 'Urban Local Bodies: Municipal Governance',
          scaffold: { problem: 'Imagine the Municipal Corporation of a town named Kalyanpur. The town has 10,000 households.',
            steps: [
            { text: 'Identify the total capital cost of the project and the government grant provided. Total Cost = ₹12,00,000.' },
            { text: 'Calculate the net capital deficit that the municipality must collect from the households.' },
            { text: 'Identify the total number of households contributing to this fund, which is 10,000.' },
            { text: 'Divide the net deficit by the total number of households to find the individual contribution.' },
            { text: 'Perform the arithmetic division: ₹40 per household.', faded: true, blankAnswer: '₹40 per household' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch3_12', title: 'Rural-Urban Migration: Push and Pull Factors',
          caseStudy: { intro: 'Let\'s begin with a scenario in rural Bihar. Ramesh is a smallholder farmer earning a highly unstable income of ₹3,500 per month due to erratic monsoon.',
            decisions: [{ prompt: 'What is the difference between a "push factor" and a "pull factor" in rural-urban migration? Provide one economic example of each.', options: [
                { text: 'A push factor is an adverse condition in a rural area that forces people to leave their', outcome: 'A push factor is an adverse condition in a rural area that forces people to leave their villages.' },
                { text: 'higher wages in cities', outcome: 'Not quite — Students believe migration is always beneficial for the migrant because cities offer higher wages.', reveals: 'migration-is-always-beneficial-for' },
                { text: 'migration is always beneficial for the migrant', outcome: 'Not quite — Students believe migration is always beneficial for the migrant because cities offer higher wages.', reveals: 'migration-is-always-beneficial-for' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch3_2', title: 'India\'s Urban Legacy: From Harappan Cities to Modern Metropolises',
          caseStudy: { intro: 'Imagine visiting the old, crowded markets of Chandni Chowk in Delhi or the massive docks of Mumbai Port.',
            decisions: [{ prompt: 'What economic condition is absolutely necessary for an ancient rural settlement to transition into a specialized urban city?', options: [
                { text: 'An agricultural surplus is necessary so that a portion of the population can survive', outcome: 'An agricultural surplus is necessary so that a portion of the population can survive without.' },
                { text: 'large buildings', outcome: 'Not quite — Students often think that urbanization is a purely modern phenomenon that began with the Industrial.', reveals: 'urbanization-is-a-purely-modern' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch3_3', title: 'Population Density in Cities: Measuring Crowding',
          scaffold: { problem: 'Urban Ward X in Chennai covers an area of $4\\text{ sq km}$ and has a resident population of 120,000 people.',
            steps: [
            { text: 'Identify given economic data for Ward X and Ward Y.' },
            { text: 'Apply the density formula ($\\text{Density} = \\frac{\\text{Population}}{\\text{Area}}$) to both wards.' },
            { text: 'Compare spatial crowding between Ward X and Ward Y.' },
            { text: 'Calculate the updated population and density for Ward X following housing expansion.' },
            { text: 'Compute new density and summarize economic impact.', faded: true, blankAnswer: '1. Ward X Density = $30,000\\text{ persons/sq km}$; Ward.' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A village of 8,000 people gets concrete roads, 4G towers and a new mall, while 80% of its workers still farm wheat and its homes spread over 25 sq km. Its sarpanch declares it is now officially a city.',
            decisions: [{ prompt: 'Does the Census definition back him up?', options: [
                { text: 'No — urban classification needs all three criteria together: at least 5,000 people, density of 400 per sq km, and 75% of male main workers in non-farm jobs. This village passes only the population test; 8,000 over 25 sq km is 320 per sq km, and 80% farming fails the occupation test.', outcome: 'This applies the conjunctive criteria rather than judging by modern looks — amenities do not reclassify a settlement.' },
                { text: 'Yes — paved roads, malls and smartphones are what make a place urban; paperwork thresholds are outdated.', outcome: 'Urban status is structural, not cosmetic: it is defined by how densely people live and how they earn their living, and this village\'s economy is still agricultural.', reveals: 'gadgets-make-a-city' },
                { text: 'Yes — with 8,000 people it clears the population bar, and the Census only requires one of the three criteria.', outcome: 'The three criteria must hold simultaneously; meeting population while failing density and occupation still leaves it rural.', reveals: 'one-criterion-enough' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch3_3', title: 'The bigger picture',
          caseStudy: { intro: 'Urban isn\'t a look, it\'s a livelihood. When workers leave farms for factories and services, density climbs — and only then does a settlement officially become a town.',
            decisions: [{ prompt: 'What comes next? India\'s Urban Landscape · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — India\'s Urban Landscape · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_eco_ch3_1', difficulty: 'standard',
          question: 'An urban area is a human settlement characterized by high population density.',
          hint: 'Work step by step.',
          misconception: 'Students often think that "urban" and "rural" are defined purely by visual modern amenities (like paved roads.',
          parts: [
                { id: 'a', prompt: 'Analyze how the difference in "market velocity" (the speed and frequency of transactions) between rural and urban areas is linked to their infrastructure.', answer: 'Urban markets experience high market velocity',
                  options: ['Urban markets experience high market velocity', 'urban people being richer'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often think that "urban" and "rural" are defined purely by visual modern amenities (like paved roads, smartphones, or concrete.' }
          ],
            remediations: { 'urban-and-rural-are-defined': { steps: ['To correct this misconception, guide the student through a comparative data analysis: 1.', 'Present a table comparing two hypothetical areas: * **Area A**: Population 7,000; Density 300/sq km; 80% work.', '* **Area B**: Population 5,500; Density 450/sq km; 80% work in small textile workshops and retail; has muddy roads and.', 'Ask: "Which area is economically \'urban\' according to the Census of India?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "urban" and "rural" are defined purely by visual modern amenities (like paved roads.',
          parts: [
                { id: 'a', prompt: 'A state government decides to build a massive multi-specialty hospital and a college in a rural block.', answer: 'The project will directly create non-agricultural jobs in healthcare, education,',
                  options: ['The project will directly create non-agricultural jobs in healthcare, education,', 'it becomes urban immediately'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often think that "urban" and "rural" are defined purely by visual modern amenities (like paved roads, smartphones, or concrete.' }
          ],
            remediations: { 'urban-and-rural-are-defined': { steps: ['To correct this misconception, guide the student through a comparative data analysis: 1.', 'Present a table comparing two hypothetical areas: * **Area A**: Population 7,000; Density 300/sq km; 80% work.', '* **Area B**: Population 5,500; Density 450/sq km; 80% work in small textile workshops and retail; has muddy roads and.', 'Ask: "Which area is economically \'urban\' according to the Census of India?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_10', difficulty: 'standard',
          question: 'A Smart City is an urban area that uses digital technology, information and.',
          hint: 'If you are stuck, think about a home budget. If your electricity bill is too high, is.',
          misconception: 'Students frequently believe that a "Smart City" is defined by expensive, visible gadgets—like public Wi-Fi kiosks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Smart City is an urban area that uses digital technology, information and communication',
                  options: ['A Smart City is an urban area that uses digital technology, information and communication', 'An urban area is a human settlement characterized by high population density,', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government', 'Rural-urban migration is the physical movement of people from rural areas (villages) to'],
                  hint: 'If you are stuck, think about a home budget. If your electricity bill is too high, is it better.',
                  misconception: 'Students frequently believe that a "Smart City" is defined by expensive, visible gadgets—like public Wi-Fi kiosks, glass skyscrapers, and.' }
          ],
            remediations: { 'students-frequently-believe-that-a': { steps: ['If a student struggles to grasp this concept, use the **"Leaky Bucket" economic analogy**: 1.', 'Draw a bucket representing a city\'s municipal budget.', 'Water poured in represents tax revenue, and water leaking out of holes represents wasted resources (leaking water.', 'Ask: "If you want more water in the bucket, should you buy a giant, expensive hose to pour more water in (building new.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_11', difficulty: 'standard',
          question: 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government.',
          hint: 'If you are struggling, review the node on Urban Infrastructure (c8_eco_ch3_6) to remind.',
          misconception: 'Students often assume that municipal governments receive all their funds directly from the central or state governments.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government',
                  options: ['Urban Local Bodies (ULBs) are constitutionally mandated local self-government', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Rural-urban migration is the physical movement of people from rural areas (villages) to'],
                  hint: 'If you are struggling, review the node on Urban Infrastructure (c8_eco_ch3_6) to remind yourself.',
                  misconception: 'Students often assume that municipal governments receive all their funds directly from the central or state governments as free grants, and.' }
          ],
            remediations: { 'municipal-governments-receive-all-their': { steps: ['Show the student that if a municipality relies 100% on state grants of ₹100, but the actual cost of clean water and.', 'Explain that to fill this gap, the municipality must levy a property tax of ₹30 and a water user charge of ₹20.', 'Demonstrate that when citizens refuse to pay the water charge, the water treatment plant runs out of funds for chlorine.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_12', difficulty: 'standard',
          question: 'Rural-urban migration is the physical movement of people from rural areas.',
          hint: 'Review c8_eco_ch3_1 for basic urbanisation concepts and c8_eco_ch3_10 for rural economic.',
          misconception: 'Students believe migration is always beneficial for the migrant because cities offer higher wages.',
          parts: [
                { id: 'a', prompt: 'Why might a family in a drought-prone village in Rajasthan choose to send only one family member to Jaipur to work in construction, rather than migrating as.', answer: 'The family is diversifying its economic risk',
                  options: ['The family is diversifying its economic risk', 'migration is always beneficial for the migrant'],
                  hint: 'Review c8_eco_ch3_1 for basic urbanisation concepts and c8_eco_ch3_10 for rural economic conditions.',
                  misconception: 'Students believe migration is always beneficial for the migrant because cities offer higher wages.' },
                { id: 'b', prompt: 'A rural laborer earns ₹4,000 per month in their village. They are considering migrating to Mumbai for an informal sector job that pays ₹14,000 per month.', answer: 'Step 1: Identify the given data: Rural wage ($W_r$) = ₹4,000',
                  options: ['Step 1: Identify the given data: Rural wage ($W_r$) = ₹4,000', 'migration is always beneficial for the migrant'],
                  hint: 'Review c8_eco_ch3_1 for basic urbanisation concepts and c8_eco_ch3_10 for rural economic conditions.',
                  misconception: 'Students believe migration is always beneficial for the migrant because cities offer higher wages.' },
                { id: 'c', prompt: 'Define push factors in the context of rural-urban migration and give two examples from the Indian context.', answer: 'Push factors are negative conditions in rural areas that force people to leave',
                  options: ['Push factors are negative conditions in rural areas that force people to leave', 'migration is always beneficial for the migrant'],
                  hint: 'Review c8_eco_ch3_1 for basic urbanisation concepts and c8_eco_ch3_10 for rural economic conditions.',
                  misconception: 'Students believe migration is always beneficial for the migrant because cities offer higher wages.' }
          ],
            remediations: { 'migration-is-always-beneficial-for': { steps: ['Present the Harris-Todaro model formula: Expected Urban Income = Probability of Employment x Urban Wage - Urban Living.', 'Have the student calculate expected income for different probability values.', 'Ask: At what probability does migration become unprofitable?', 'Connect to real-world Indian urban unemployment data.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_2', difficulty: 'standard',
          question: 'Urban legacy refers to the historical progression of urban areas as centers.',
          hint: 'If you are struggling, go back and review "Urban vs Rural Areas: Defining.',
          misconception: 'Students often think that urbanization is a purely modern phenomenon that began with the Industrial Revolution.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urban legacy refers to the historical progression of urban areas as centers of economic',
                  options: ['Urban legacy refers to the historical progression of urban areas as centers of economic', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government'],
                  hint: 'If you are struggling, go back and review "Urban vs Rural Areas: Defining Characteristics".',
                  misconception: 'Students often think that urbanization is a purely modern phenomenon that began with the Industrial Revolution or British rule in India.' }
          ],
            remediations: { 'urbanization-is-a-purely-modern': { steps: ['To correct this misconception, the teacher will present a side-by-side comparison table of Harappan Lothal (c.', '2400 BCE) and a modern port city like Mumbai.', 'Show how both cities possess specialized zones: residential, industrial (bead factories vs.', 'modern SEZs), and trade (dockyards vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_3', difficulty: 'standard',
          question: 'Population density in cities measures the average number of people residing.',
          hint: 'Review topic `c8_eco_ch3_1` to clarify how urban areas concentrate people and economic.',
          misconception: 'Students often confuse total population size with population density.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population density in cities measures the average number of people residing within a',
                  options: ['Population density in cities measures the average number of people residing within a', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government'],
                  hint: 'Review topic `c8_eco_ch3_1` to clarify how urban areas concentrate people and economic activities.',
                  misconception: 'Students often confuse total population size with population density.' }
          ],
            remediations: { 'students-often-confuse-total-population': { steps: ['Direct the student to explicitly write down both variables in every problem: Total Population ($P$) and Total Land Area.', 'Have the student calculate density for two contrasting visual cases: Case 1 ($1,000\\text{ people}$ in $1\\text{ sq km}$.', 'Case 2 ($5,000\\text{ people}$ in $10\\text{ sq km}$ grid).', 'Demonstrate that even though Case 2 has 5 times more total people, Case 1 has double the population density.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
