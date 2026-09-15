import type { SimDef } from '../../engine/types';

/** v3 generated — c8_eco_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_eco_ch02_p1: SimDef = {
    id: 'v3_c8_eco_ch02_p1',
    title: 'Dynamics of Population · Part 1/2',
    subtitle: 'Read the numbers behind the crowd',
    classLevel: 8, subject: 'economics', topic: 'Dynamics of Population · Part 1/2',
    chapters: ['c8_eco_ch02'],
    nodeIds: ['c8_eco_ch2_1', 'c8_eco_ch2_10', 'c8_eco_ch2_11', 'c8_eco_ch2_12', 'c8_eco_ch2_2', 'c8_eco_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village planner tracking population', intro: 'Your village looks the same size as last decade, but the people inside it have completely changed. Learn to read births, deaths and migration before the schools and job market overflow.', goal: 'Understand demography — how births, deaths and migration reshape a population\'s size and age structure, and why that drives labour supply, demand and infrastructure planning.' },
    discovery: {
        question: 'Two districts both have exactly 100,000 people. District A births 25 per 1,000 and loses 5 per 1,000; District B births 10 and loses 12. Which one needs to build more primary schools next year?',
        options: ['District A — it gains about 2,000 people a year while District B actually shrinks', 'Both equally — same total population means same needs', 'District B — more deaths means more replacement babies', 'Neither — totals never change'],
        answer: 'District A — it gains about 2,000 people a year while District B actually shrinks',
        hook: 'A population isn\'t a fixed count — it\'s a flowing river fed by births and drained by deaths and migration. Two places with identical totals can be heading in completely opposite directions.',
    },
    teaching: [
        { title: 'Demography: Study of Human Population', text: 'Demography is the scientific and statistical study of human populations, analyzing their size, structure, distribution, and how they change over time through births, deaths, and migration.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_eco_ch2_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Play Sarpanch of Rampur village: the toy shops of ten years ago now face teenagers needing high schools and jobs. Use births, deaths and migration to predict what the village must build next.',
        labels: ['Demography: Study of Human', 'Population Ageing: Implications', 'Population Trends and Economic', 'Government Planning Using Demographic', 'Components of Demography: Size,', 'Population Size: Counting People'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_eco_ch2_1', title: 'Demography: Study of Human Population',
          caseStudy: { intro: 'Imagine you are the Sarpanch (head) of a village called Rampur in Uttar Pradesh.',
            decisions: [{ prompt: 'What is demography, and what are the three primary dynamic processes that cause a population to change over time?', options: [
                { text: 'Demography is the scientific study of human populations, focusing on their size,', outcome: 'Demography is the scientific study of human populations, focusing on their size, structure, and.' },
                { text: 'counting people', outcome: 'Not quite — Students often think of "population" as a single, static number and assume that a larger population.', reveals: 'of-population-as-a-single' },
                { text: 'the census', outcome: 'Not quite — Students often think of "population" as a single, static number and assume that a larger population.', reveals: 'of-population-as-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch2_10', title: 'Population Ageing: Implications for Society and Economy',
          caseStudy: { intro: 'Imagine a family where four working adults earn money to support themselves, one young child, and one retired grandparent.',
            decisions: [{ prompt: 'What is the "Old-Age Dependency Ratio" (OADR), and which two demographic age groups are compared to calculate it?', options: [
                { text: 'The Old-Age Dependency Ratio is the ratio of the number of elderly dependents (typically', outcome: 'The Old-Age Dependency Ratio is the ratio of the number of elderly dependents (typically those aged.' },
                { text: 'will boost investment', outcome: 'Not quite — Students often assume that population ageing is a positive economic sign because older people have.', reveals: 'population-ageing-is-a-positive' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch2_11', title: 'Population Trends and Economic Development',
          scaffold: { problem: 'In the year 2020, District Rampur had a Total Annual Income of ₹1,200 crore and a population of 30 lakh (3 million).',
            steps: [
            { text: 'Identify given data for 2020 and convert units cleanly.' },
            { text: 'Compute PCI for 2020.' },
            { text: 'Identify given data for 2025 and convert units cleanly.' },
            { text: 'Compute PCI for 2025.' },
            { text: 'Compare 2020 and 2025 PCI values and interpret economically.', faded: true, blankAnswer: '1. PCI (2020) = ₹4,000 per person' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch2_2', title: 'Components of Demography: Size, Structure, Pattern, Trend',
          scaffold: { problem: 'A district in Maharashtra has a total population size of 200,000 people.',
            steps: [
            { text: 'Identify the total population size given in the problem, which is 200,000.' },
            { text: 'Identify the percentage share of each age group component in the population structure (30%, 60%, 10%).' },
            { text: 'Multiply the total population size by each group\'s percentage expressed as a decimal (0.30, 0.60, 0.10).' },
            { text: 'Calculate children: 200,000 × 0.30 = 60,000; Working-age: 200,000 × 0.60 = 120,000; Elderly: 200,000 × 0.10 = 20,000.' },
            { text: 'Verify that the sum of all parts equals the total size: 60,000 + 120,000 + 20,000 = 200,000.', faded: true, blankAnswer: 'Children: 60,000; Working-age adults: 120,000; Elderly.' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch2_3', title: 'Population Size: Counting People in a Region',
          caseStudy: { intro: 'Imagine the District Magistrate of Rampur district planning how many government schools, primary health centres, and fair-price ration shops need to be built.',
            decisions: [{ prompt: 'What is a Population Census, and how often is it conducted in India?', options: [
                { text: 'A Population Census is the official, systematic head-counting and recording of', outcome: 'A Population Census is the official, systematic head-counting and recording of information about.' },
                { text: 'because a country like India has a massive total population size (over 1', outcome: 'Not quite — Students frequently confuse absolute population size with population growth rate or population.', reveals: 'students-frequently-confuse-absolute-population' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Two districts each hold 100,000 people. District A records 2,500 births and 500 deaths a year; District B records 1,000 births and 1,200 deaths. A planner says, \'Same population, same budget needs — copy the plan across both.\'',
            decisions: [{ prompt: 'Is identical planning sensible?', options: [
                { text: 'No — demography is about change, not a static count. District A grows by 2,000 a year and will need far more primary schools as its babies age in; District B is actually shrinking by 200 a year, so copying the plan wastes resources.', outcome: 'This applies births, deaths and migration as the drivers of population change, and shows why structure — not just size — shapes demand.' },
                { text: 'Yes — planning is about the total headcount, and since both totals match today, the needs match too.', outcome: 'The totals hide opposite trajectories: A is adding 2,500 children annually while B loses people, so their school and clinic needs diverge within a few years.', reveals: 'population-is-a-snapshot' },
                { text: 'District B needs more schools — shrinking places always need extra facilities to attract people back.', outcome: 'B\'s low birth rate means fewer children arriving, so expanding schools there serves a cohort that is not growing; need follows the age structure, not the wish.', reveals: 'shrinking-needs-more' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'Demography turns counting people into reading the future. Age structure decides who works and who depends — and that decides everything from school benches to bank deposits.',
            decisions: [{ prompt: 'What comes next? Dynamics of Population · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Dynamics of Population · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_eco_ch2_1', difficulty: 'standard',
          question: 'Demography is the scientific and statistical study of human populations.',
          hint: 'If stuck, review how public services (social infrastructure) are funded and how.',
          misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads.',
          parts: [
                { id: 'a', prompt: 'What is demography, and what are the three primary dynamic processes that cause a population to change over time?', answer: 'Demography is the scientific study of human populations, focusing on their size,',
                  options: ['Demography is the scientific study of human populations, focusing on their size,', 'counting people', 'the census', 'population'],
                  hint: 'If stuck, review how public services (social infrastructure) are funded and how governments decide.',
                  misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads to poverty.' },
                { id: 'b', prompt: 'Why would an economist be interested in studying the age structure of a country\'s population rather than just looking at the total population count?', answer: 'An economist studies age structure',
                  options: ['An economist studies age structure', 'more people means more demand', 'population', 'a larger population always leads to poverty'],
                  hint: 'If stuck, review how public services (social infrastructure) are funded and how governments decide.',
                  misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads to poverty.' },
                { id: 'c', prompt: 'A coastal district in Kerala experiences a massive wave of out-migration, where 30% of its young working-age population (ages 20-35) moves to Gulf countries.', answer: 'The out-migration of working-age adults reduces the local labor supply',
                  options: ['The out-migration of working-age adults reduces the local labor supply', 'fewer people means less money', 'population', 'a larger population always leads to poverty'],
                  hint: 'If stuck, review how public services (social infrastructure) are funded and how governments decide.',
                  misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads to poverty.' }
          ],
            remediations: { 'of-population-as-a-single': { steps: ['To correct this misconception, guide the student through a simple comparison of two hypothetical economies: - **Economy.', '90 are young children or elderly retirees, and only 10 are working-age adults.', '- **Economy Y**: Has 200 people.', '20 are children/elderly, and 180 are working-age adults.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads.',
          parts: [
                { id: 'a', prompt: '"An increase in a nation\'s population is always an economic burden because it means more mouths to feed." Evaluate this statement using demographic and.', answer: 'This statement is incorrect and oversimplified',
                  options: ['This statement is incorrect and oversimplified', 'population', 'a larger population always leads to poverty'],
                  hint: 'If stuck, review how public services (social infrastructure) are funded and how governments decide.',
                  misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads to poverty.' },
                { id: 'b', prompt: 'Imagine you are an urban planner for a rapidly growing city like Bengaluru.', answer: 'A strong 3-point checklist would include: 1',
                  options: ['A strong 3-point checklist would include: 1', 'population', 'a larger population always leads to poverty'],
                  hint: 'If stuck, review how public services (social infrastructure) are funded and how governments decide.',
                  misconception: 'Students often think of "population" as a single, static number and assume that a larger population always leads to poverty.' }
          ],
            remediations: { 'of-population-as-a-single': { steps: ['To correct this misconception, guide the student through a simple comparison of two hypothetical economies: - **Economy.', '90 are young children or elderly retirees, and only 10 are working-age adults.', '- **Economy Y**: Has 200 people.', '20 are children/elderly, and 180 are working-age adults.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_10', difficulty: 'standard',
          question: 'Population ageing is an economic and demographic phenomenon characterized by.',
          hint: 'If you are struggling, review the concepts of demographic age structures.',
          misconception: 'Students often assume that population ageing is a positive economic sign because older people have accumulated lifetime.',
          parts: [
                { id: 'a', prompt: 'Why does a continuous decline in birth rates, combined with an increase in life expectancy, lead to population ageing? Explain the role of both factors.', answer: 'A decline in birth rates reduces the influx of newborn children',
                  options: ['A decline in birth rates reduces the influx of newborn children', 'population ageing is only caused by people living longer', 'will boost investment'],
                  hint: 'If you are struggling, review the concepts of demographic age structures.',
                  misconception: 'Students often assume that population ageing is a positive economic sign because older people have accumulated lifetime savings in banks.' },
                { id: 'b', prompt: 'A town called Sundarnagar has a total population of 20,000. Among them, 4,000 are children (0–14 years), 12,000 are working-age adults (15–59 years), and 4,000.', answer: '**Step 1:** Identify the elderly population ($60+$ years) = $4,000$',
                  options: ['**Step 1:** Identify the elderly population ($60+$ years) = $4,000$', 'will boost investment'],
                  hint: 'If you are struggling, review the concepts of demographic age structures.',
                  misconception: 'Students often assume that population ageing is a positive economic sign because older people have accumulated lifetime savings in banks.' }
          ],
            remediations: { 'population-ageing-is-a-positive': { steps: ['**Step 1 (Micro-demonstration):** Have the student draw a balance sheet for a 3-person household: Mother (earns.', 'The family surplus is ₹25,000.', '**Step 2 (The Shift):** Now, change the scenario: The mother retires (income drops to zero, needs ₹10,000 for medicine).', 'Only the child is now working, earning ₹40,000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_11', difficulty: 'standard',
          question: 'Population trends and economic development refer to the two-way relationship.',
          hint: 'If stuck, review how to calculate Per Capita Income by dividing total national income.',
          misconception: 'Students often assume that a large population is always a burden that guarantees economic poverty, or conversely, that.',
          parts: [
                { id: 'a', prompt: 'What is the formula used to calculate Per Capita Income (PCI) of a country?', answer: 'Per Capita Income (PCI) = Total National Income / Total Population',
                  options: ['Per Capita Income (PCI) = Total National Income / Total Population', 'Total Population / Total National Income'],
                  hint: 'If stuck, review how to calculate Per Capita Income by dividing total national income by total.',
                  misconception: 'Students often assume that a large population is always a burden that guarantees economic poverty, or conversely, that any population.' }
          ],
            remediations: { 'a-large-population-is-always': { steps: ['To fix this misconception, lead the student through a two-country comparison using a explicit numerical table: 1.', 'Country X: Population 100 million, 80% unskilled, minimal capital equipment.', 'Result: Low production per worker, low total income, high burden on state welfare.', 'Country Y: Population 100 million, 90% highly skilled/educated, advanced technology/capital equipment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_12', difficulty: 'standard',
          question: 'Government planning using demographic data is the systematic process by which.',
          hint: 'If stuck, review the concepts of demographic dividend (c8_eco_ch2_9) and population.',
          misconception: 'A common misconception among students is that any population increase requires an identical, uniform increase in all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Government planning using demographic data is the systematic process by',
                  options: ['Government planning using demographic data is the systematic process by', 'Demography is the scientific and statistical study of human populations, analyzing their', 'Population ageing is an economic and demographic phenomenon characterized by an', 'Population trends and economic development refer to the two-way relationship between'],
                  hint: 'If stuck, review the concepts of demographic dividend (c8_eco_ch2_9) and population ageing.',
                  misconception: 'A common misconception among students is that any population increase requires an identical, uniform increase in all types of public.' }
          ],
            remediations: { 'a-common-misconception-among-students': { steps: ['**Visualize the Cohorts:** Draw a simple population pyramid or table on the board showing two extremes: "State Young".', '**Roleplay Allocation:** Give the student ₹100 of "monopoly money" representing the state budget.', '**Scenario Testing:** Ask the student: "If you spend ₹80 of your budget on primary schools in \'State Old\', what happens.', 'Will those schools be full or empty?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_2', difficulty: 'standard',
          question: 'The components of demography refer to the core structural elements used.',
          hint: 'Review c8_eco_ch2_1 to solidify the definition of demography before diving into size.',
          misconception: 'Students often confuse population "structure" with population "size," assuming that if a town\'s total population size.',
          parts: [
                { id: 'a', prompt: 'What term describes the composition of a population according to characteristics such as age, gender, and education level?', answer: 'population structure',
                  options: ['population structure', 'population size', 'pattern', 'structure'],
                  hint: 'Review c8_eco_ch2_1 to solidify the definition of demography before diving into size, structure.',
                  misconception: 'Students often confuse population "structure" with population "size," assuming that if a town\'s total population size stays the same.' },
                { id: 'b', prompt: 'A small town has a total population size of 50,000 people. If 60% of this population falls into the working-age group (15–64 years), calculate the exact number.', answer: '30,000 individuals',
                  options: ['30,000 individuals', 'structure'],
                  hint: 'Review c8_eco_ch2_1 to solidify the definition of demography before diving into size, structure.',
                  misconception: 'Students often confuse population "structure" with population "size," assuming that if a town\'s total population size stays the same.' }
          ],
            remediations: { 'students-often-confuse-population-structure': { steps: ['To fix this misconception, use a concrete two-column data table showing a town with 1,000 residents in Year 1 (800.', 'Point out that while the total size (1,000) is unchanged, the structure has reversed completely, which means toy shops.', 'Emphasize that size counts the *total quantity*, while structure counts the *internal categories* of people.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_3', difficulty: 'standard',
          question: 'Population size refers to the total absolute count of individuals residing.',
          hint: 'Work step by step.',
          misconception: 'Students frequently confuse absolute population size with population growth rate or population density, mistakenly.',
          parts: [
                { id: 'a', prompt: 'What is a Population Census, and how often is it conducted in India?', answer: 'A Population Census is the official, systematic head-counting and recording of',
                  options: ['A Population Census is the official, systematic head-counting and recording of', 'because a country like India has a massive total population size (over 1'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students frequently confuse absolute population size with population growth rate or population density, mistakenly assuming that a region.' },
                { id: 'b', prompt: 'Why is population size classified as a "stock variable" rather than a "flow variable"? Explain using an economic analogy.', answer: 'Population size is a stock variable',
                  options: ['Population size is a stock variable', 'because a country like India has a massive total population size (over 1'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students frequently confuse absolute population size with population growth rate or population density, mistakenly assuming that a region.' },
                { id: 'c', prompt: 'District A and District B both gained 5,000 residents in 2023. District A started with 100,000 people, while District B started with 500,000 people.', answer: 'Absolute growth is identical for both districts (+5,000 people)',
                  options: ['Absolute growth is identical for both districts (+5,000 people)', 'because a country like India has a massive total population size (over 1'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students frequently confuse absolute population size with population growth rate or population density, mistakenly assuming that a region.' }
          ],
            remediations: { 'students-frequently-confuse-absolute-population': { steps: ['Draw two rectangles on paper representing Region X (large land area: 1,000 sq km) and Region Y (small land area: 10.', 'Draw 100 dots in Region X and 50 dots in Region Y. Point out that Region X has a larger population size (100 people.', 'Calculate density for both: Region X has $100 / 1,000 = 0.1 \\text{ persons/sq km}$, while Region Y has $50 / 10 = 5.', 'Add 2 dots to Region X ($+2\\%$ growth) and 5 dots to Region Y ($+10\\%$ growth).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
