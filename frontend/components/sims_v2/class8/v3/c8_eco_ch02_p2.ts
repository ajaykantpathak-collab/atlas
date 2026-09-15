import type { SimDef } from '../../engine/types';

/** v3 generated — c8_eco_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_eco_ch02_p2: SimDef = {
    id: 'v3_c8_eco_ch02_p2',
    title: 'Dynamics of Population · Part 2/2',
    subtitle: 'Read the numbers behind the crowd',
    classLevel: 8, subject: 'economics', topic: 'Dynamics of Population · Part 2/2',
    chapters: ['c8_eco_ch02'],
    nodeIds: ['c8_eco_ch2_4', 'c8_eco_ch2_5', 'c8_eco_ch2_6', 'c8_eco_ch2_7', 'c8_eco_ch2_8', 'c8_eco_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village planner tracking population', intro: 'Your village looks the same size as last decade, but the people inside it have completely changed. Learn to read births, deaths and migration before the schools and job market overflow.', goal: 'Understand demography — how births, deaths and migration reshape a population\'s size and age structure, and why that drives labour supply, demand and infrastructure planning.' },
    discovery: {
        question: 'Two districts both have exactly 100,000 people. District A births 25 per 1,000 and loses 5 per 1,000; District B births 10 and loses 12. Which one needs to build more primary schools next year?',
        options: ['District A — it gains about 2,000 people a year while District B actually shrinks', 'Both equally — same total population means same needs', 'District B — more deaths means more replacement babies', 'Neither — totals never change'],
        answer: 'District A — it gains about 2,000 people a year while District B actually shrinks',
        hook: 'A population isn\'t a fixed count — it\'s a flowing river fed by births and drained by deaths and migration. Two places with identical totals can be heading in completely opposite directions.',
    },
    teaching: [
        { title: 'Population Structure: Age, Gender, Education, Occupation', text: 'Population structure refers to the composition of a population according to key demographic characteristics such as age groups, gender distribution, educational attainment, and occupational.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_eco_ch2_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Play Sarpanch of Rampur village: the toy shops of ten years ago now face teenagers needing high schools and jobs. Use births, deaths and migration to predict what the village must build next.',
        labels: ['Population Structure: Age, Gender,', 'Population Density: People Per', 'Birth Rate and Death', 'Migration: Movement of People', 'Population Growth: Historical Trends', 'Demographic Dividend: Working-Age Population'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_eco_ch2_6', title: 'Birth Rate and Death Rate: Natural Population Change',
          caseStudy: { intro: 'Imagine a district called Greenfield with a total mid-year population of 500,000 people.',
            decisions: [{ prompt: 'What is the mathematical formula used to calculate the Crude Birth Rate (CBR) of a region?', options: [
                { text: 'The Crude Birth Rate is calculated as: $\\text{CBR} = \\left(\\frac{\\text{Total Live Births', outcome: 'The Crude Birth Rate is calculated as: $\\text{CBR} = \\left(\\frac{\\text{Total Live Births in.' },
                { text: 'falling birth rate', outcome: 'Not quite — Students frequently confuse a "falling birth rate" with a "declining total population." For.', reveals: 'students-frequently-confuse-a-falling' },
                { text: 'declining total population', outcome: 'Not quite — Students frequently confuse a "falling birth rate" with a "declining total population." For.', reveals: 'students-frequently-confuse-a-falling' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch2_7', title: 'Migration: Movement of People and Its Impact',
          scaffold: { problem: 'Region X (a rural agrarian district in Eastern India) has an initial population of 500,000 at the start of a five-year period.',
            steps: [
            { text: 'Identify given variables: $P_0 = 500,000$, $B = 35,000$, $D = 15,000$, $I = 4,000$, $E = 28,000$.' },
            { text: 'Compute Natural Population Increase ($NI = B - D$):' },
            { text: 'Compute Net Migration ($NM = I - E$):' },
            { text: 'Compute Final Population ($P_1 = P_0 + NI + NM$):' },
            { text: 'Compute Net Migration Percentage relative to initial population:', faded: true, blankAnswer: '1. Natural Increase = +20,000 persons' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_eco_ch2_8', title: 'Population Growth: Historical Trends in India and World',
          scaffold: { problem: 'Examine the global historical population growth milestones:',
            steps: [
            { text: 'Identify the time span and population change for Period 1 (1B to 2B).' },
            { text: 'Calculate annual average addition for Period 1.' },
            { text: 'Identify the time span and population change for Period 2 (4B to 8B).' },
            { text: 'Calculate annual average addition for Period 2.' },
            { text: 'Compare the two periods and explain the economic drivers.', faded: true, blankAnswer: 'Period 1 addition = 8.13 million people/year; Period 2.' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Two districts each hold 100,000 people. District A records 2,500 births and 500 deaths a year; District B records 1,000 births and 1,200 deaths. A planner says, \'Same population, same budget needs — copy the plan across both.\'',
            decisions: [{ prompt: 'Is identical planning sensible?', options: [
                { text: 'No — demography is about change, not a static count. District A grows by 2,000 a year and will need far more primary schools as its babies age in; District B is actually shrinking by 200 a year, so copying the plan wastes resources.', outcome: 'This applies births, deaths and migration as the drivers of population change, and shows why structure — not just size — shapes demand.' },
                { text: 'Yes — planning is about the total headcount, and since both totals match today, the needs match too.', outcome: 'The totals hide opposite trajectories: A is adding 2,500 children annually while B loses people, so their school and clinic needs diverge within a few years.', reveals: 'population-is-a-snapshot' },
                { text: 'District B needs more schools — shrinking places always need extra facilities to attract people back.', outcome: 'B\'s low birth rate means fewer children arriving, so expanding schools there serves a cohort that is not growing; need follows the age structure, not the wish.', reveals: 'shrinking-needs-more' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Demography turns counting people into reading the future. Age structure decides who works and who depends — and that decides everything from school benches to bank deposits.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_eco_ch2_4', difficulty: 'standard',
          question: 'Population structure refers to the composition of a population according to key.',
          hint: 'Review basic ratio calculations and the division of populations into age brackets.',
          misconception: 'Students often think that a high total population automatically means a strong economy, ignoring population structure.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population structure refers to the composition of a population according to key',
                  options: ['Population structure refers to the composition of a population according to key', 'Demography is the scientific and statistical study of human populations, analyzing their', 'Population ageing is an economic and demographic phenomenon characterized by an', 'Population trends and economic development refer to the two-way relationship between'],
                  hint: 'Review basic ratio calculations and the division of populations into age brackets.',
                  misconception: 'Students often think that a high total population automatically means a strong economy, ignoring population structure.' }
          ],
            remediations: { 'a-high-total-population-automatically': { steps: ['To fix this misconception, use a concrete comparison between two towns of 10,000 people: Town A has 7,000 working-age.', 'Calculate the income and tax revenue potential for both to demonstrate why the age and skill structure matters more.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_5', difficulty: 'standard',
          question: 'Population density is an economic and demographic measure of the intensity.',
          hint: 'If you are stuck, go back and review how we count populations within specific geographic.',
          misconception: 'Students often assume that high population density is always an economic curse that leads to poverty and backwardness.',
          parts: [
                { id: 'a', prompt: 'Explain why a large state like Rajasthan has a much lower population density than a smaller state like West Bengal, even though Rajasthan has vast amounts.', answer: 'Rajasthan has a lower population density',
                  options: ['Rajasthan has a lower population density', 'because it is big'],
                  hint: 'If you are stuck, go back and review how we count populations within specific geographic boundaries.',
                  misconception: 'Students often assume that high population density is always an economic curse that leads to poverty and backwardness.' }
          ],
            remediations: { 'high-population-density-is-always': { steps: ['The Water Pipeline Scenario** Ask the student: "We need to lay a water pipeline that costs ₹10,00,000 to build." *.', 'Analysis** Have the student explain which case is more affordable for the government to build and maintain.', 'Conclusion** Reinforce that while high density brings crowd management challenges, it is economically essential for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that high population density is always an economic curse that leads to poverty and backwardness.',
          parts: [
                { id: 'a', prompt: 'An economic planner suggests: "To be fair, we should divide our state\'s health budget equally among all districts based solely on their geographic size (land.', answer: 'The planner\'s proposal is highly inefficient',
                  options: ['The planner\'s proposal is highly inefficient', 'spatial equality', 'economic efficiency'],
                  hint: 'If you are stuck, go back and review how we count populations within specific geographic boundaries.',
                  misconception: 'Students often assume that high population density is always an economic curse that leads to poverty and backwardness.' }
          ],
            remediations: { 'high-population-density-is-always': { steps: ['The Water Pipeline Scenario** Ask the student: "We need to lay a water pipeline that costs ₹10,00,000 to build." *.', 'Analysis** Have the student explain which case is more affordable for the government to build and maintain.', 'Conclusion** Reinforce that while high density brings crowd management challenges, it is economically essential for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_6', difficulty: 'standard',
          question: 'The Crude Birth Rate (CBR) is the annual number of live births per 1,000 people.',
          hint: 'If stuck on rate calculations, review `c8_eco_ch2_3` to practice dividing absolute.',
          misconception: 'Students frequently confuse a "falling birth rate" with a "declining total population." For example, if a region\'s.',
          parts: [
                { id: 'a', prompt: 'If a district experiences a significant drop in its death rate due to better medical infrastructure while its birth rate stays constant and high, what happens.', answer: 'The natural population growth rate will increase',
                  options: ['The natural population growth rate will increase', 'falling birth rate', 'declining total population', 'the population is shrinking'],
                  hint: 'If stuck on rate calculations, review `c8_eco_ch2_3` to practice dividing absolute numbers by total.',
                  misconception: 'Students frequently confuse a "falling birth rate" with a "declining total population." For example, if a region\'s birth rate falls from 28.' },
                { id: 'b', prompt: 'A town has a total population of 250,000. In one year, 4,500 live births and 2,000 deaths are recorded.', answer: '$\\text{CBR} = (4,500 / 250,000) \\times 1,000 = 18$ per 1,000',
                  options: ['$\\text{CBR} = (4,500 / 250,000) \\times 1,000 = 18$ per 1,000', 'falling birth rate', 'declining total population', 'the population is shrinking'],
                  hint: 'If stuck on rate calculations, review `c8_eco_ch2_3` to practice dividing absolute numbers by total.',
                  misconception: 'Students frequently confuse a "falling birth rate" with a "declining total population." For example, if a region\'s birth rate falls from 28.' }
          ],
            remediations: { 'students-frequently-confuse-a-falling': { steps: ['Guide the student through a balance sheet exercise.', 'Column 1 represents annual additions ($\\text{Birth Rate} \\times \\text{Population} / 1,000$) and Column 2 represents.', 'Show that whenever Column 1 > Column 2, the net balance (total population) increases.', 'Present a numerical progression where birth rates fall over time (28 → 22 → 16 per 1,000) while death rate remains at 7.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_7', difficulty: 'standard',
          question: 'Migration is the movement of people across administrative or geographic.',
          hint: 'If stuck on population calculations, review `c8_eco_ch2_6` to practice computing natural.',
          misconception: 'Students frequently assume that migration is a net negative loss for sending (origin) regions and a purely negative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Migration is the movement of people across administrative or geographic boundaries to',
                  options: ['Migration is the movement of people across administrative or geographic boundaries to', 'Demography is the scientific and statistical study of human populations, analyzing their', 'Population ageing is an economic and demographic phenomenon characterized by an', 'Population trends and economic development refer to the two-way relationship between'],
                  hint: 'If stuck on population calculations, review `c8_eco_ch2_6` to practice computing natural increase.',
                  misconception: 'Students frequently assume that migration is a net negative loss for sending (origin) regions and a purely negative burden on receiving.' }
          ],
            remediations: { 'students-frequently-assume-that-migration': { steps: ['When students fail to understand the economic balance of migration, use a concrete two-region labor and capital flow.', 'Draw Village A (low employment, wage ₹200/day) and City B (high labor demand, wage ₹600/day).', 'Show 5 workers moving from Village A to City B.', 'Calculate the labor output added to City B\'s factories (5 workers × output value) and track the city\'s growth.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_8', difficulty: 'standard',
          question: 'Population growth refers to the change in the total number of human inhabitants.',
          hint: 'If stuck, review how birth rate and death rate create a natural increase gap in node.',
          misconception: 'Students often mistakenly assume that rapid population growth is always caused by an increase in birth rates (more.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population growth refers to the change in the total number of human inhabitants in a',
                  options: ['Population growth refers to the change in the total number of human inhabitants in a', 'Demography is the scientific and statistical study of human populations, analyzing their', 'Population ageing is an economic and demographic phenomenon characterized by an', 'Population trends and economic development refer to the two-way relationship between'],
                  hint: 'If stuck, review how birth rate and death rate create a natural increase gap in node c8_eco_ch2_6.',
                  misconception: 'Students often mistakenly assume that rapid population growth is always caused by an increase in birth rates (more children being born per.' }
          ],
            remediations: { 'students-often-mistakenly-assume-that': { steps: ['Draw a simple line graph with two lines over time—one line for Birth Rate (BR) and one line for Death Rate (DR).', 'Show BR remaining steady at 40 per 1,000 between 1921 and 1971, while DR drops from 36 per 1,000 down to 15 per 1,000.', 'Highlight the shaded area between the two lines representing Natural Population Growth (BR - DR), showing how the gap.', 'Have the student calculate the gap value at 1921 (40 - 36 = 4 per 1,000) versus 1971 (40 - 15 = 25 per 1,000) to prove.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch2_9', difficulty: 'standard',
          question: 'Demographic Dividend refers to the economic growth potential that results from.',
          hint: 'If stuck, review c8_eco_ch2_4 (Population Structure) to learn how age pyramids categorize.',
          misconception: 'Students frequently believe that having a large population in the working-age group (15–64 years) automatically causes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Demographic Dividend refers to the economic growth potential that results from shifts in',
                  options: ['Demographic Dividend refers to the economic growth potential that results from shifts in', 'Demography is the scientific and statistical study of human populations, analyzing their', 'Population ageing is an economic and demographic phenomenon characterized by an', 'Population trends and economic development refer to the two-way relationship between'],
                  hint: 'If stuck, review c8_eco_ch2_4 (Population Structure) to learn how age pyramids categorize children.',
                  misconception: 'Students frequently believe that having a large population in the working-age group (15–64 years) automatically causes economic growth.' }
          ],
            remediations: { 'students-frequently-believe-that-having': { steps: ['Review the definition of \'Dividend\': Explain that a financial dividend requires investing money first; similarly,.', 'Use a visual labor market diagram: Show that a growing labor supply ($S_L$) without shifting labor demand ($D_L$).', 'Walk through a contrast exercise: Present two historical country examples (e.g., South Korea in 1970–1990 vs.', 'regions with high youth unemployment) to prove that jobs and skills are the necessary bridge between demographic change.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
