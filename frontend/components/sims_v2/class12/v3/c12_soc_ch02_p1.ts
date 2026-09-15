import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch02_p1: SimDef = {
    id: 'v3_c12_soc_ch02_p1',
    title: 'The Demographic Structure of the Indian Society · Part 1/2',
    subtitle: 'Counting people was the easy part',
    classLevel: 12, subject: 'sociology', topic: 'The Demographic Structure of the Indian Society · Part 1/2',
    chapters: ['c12_soc_ch02'],
    nodeIds: ['c12_soc_cbse_02_001', 'c12_soc_cbse_02_002', 'c12_soc_cbse_02_003', 'c12_soc_cbse_02_004', 'c12_soc_cbse_02_005', 'c12_soc_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Population analyst', intro: 'A census gives you 1.2 billion people. A demographer\'s real questions start the moment the counting stops.', goal: 'Distinguish formal from social demography and explain why population data are social facts essential to theory and policy.' },
    discovery: {
        question: 'Suicide looks like the most private act imaginable — yet Durkheim found its rate stays eerily stable for whole countries and varies by religion and marital status. If it\'s personal, why does it behave like a statistic?',
        options: ['Because the rate is a social fact — a collective pattern shaped by social causes that no individual psychology can explain', 'Because depressed people copy each other', 'Because some countries underreport it', 'Because climate affects mood uniformly'],
        answer: 'Because the rate is a social fact — a collective pattern shaped by social causes that no individual psychology can explain',
        hook: 'Demography isn\'t the census — the count is just a tool. The discipline lives in rates, ratios and the social machinery behind them: why Kerala\'s fertility fell and Bihar\'s didn\'t is a question no headcount can answer.',
    },
    teaching: [
        { title: 'Demography as a Science: Definition, Scope and the Study of Population', text: 'Demography is the systematic, scientific study of human populations, focusing on their size, structure, distribution, and changes over time through the analysis of births, deaths, migration, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split a population question in two — let formal demography forecast the numbers while social demography digs out the norms and power relations driving them.',
        labels: ['Demography as a Science', 'Theories of Population: Malthusian', 'Population Size and Growth', 'Birth Rate and Death', 'Fertility and Mortality: Measures,', 'Sex Ratio: Definition, Trends'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_001', title: 'Demography as a Science: Definition, Scope and the Study of Population',
          caseStudy: { intro: 'Imagine you are a policy analyst asked to design a healthcare program for a district.',
            decisions: [{ prompt: 'Define demography and explain the meaning of its Greek roots *demos* and *graphein*.', options: [
                { text: 'Demography is the systematic study of population', outcome: 'Demography is the systematic study of population. *Demos* means "people" and *graphein* means.' },
                { text: 'study of population', outcome: 'Not quite — Students often think "demography = census" and that the census is just a headcount.', reveals: 'demography-census-and-that-the' },
                { text: 'demography = census', outcome: 'Not quite — Students often think "demography = census" and that the census is just a headcount.', reveals: 'demography-census-and-that-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_002', title: 'Theories of Population: Malthusian Theory and the Theory of Demographic Transition',
          caseStudy: { intro: 'Imagine a village where every family has 6 children, but the farmland cannot feed everyone.',
            decisions: [{ prompt: 'State the core mathematical difference between population growth and food supply growth according to Malthus, and name the two types.', options: [
                { text: 'Malthus argued population grows in geometric progression (e.g., 2, 4, 8, 16) while food', outcome: 'Malthus argued population grows in geometric progression (e.g., 2, 4, 8, 16) while food supply.' },
                { text: 'contraception', outcome: 'Not quite — Students often conflate Malthus\'s "preventive checks" with modern contraception, writing that.', reveals: 'students-often-conflate-malthus-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_003', title: 'Population Size and Growth: India\'s Population Trends Since 1901',
          caseStudy: { intro: 'Imagine you are a policy analyst in 2024 trying to predict how many schools India will need in 2035.',
            decisions: [{ prompt: 'What was India\'s average annual population growth rate during 1911-1921, and what major event caused this anomaly?', options: [
                { text: 'The average annual growth rate was -0.03% (negative), caused by the 1918-19 influenza', outcome: 'The average annual growth rate was -0.03% (negative), caused by the 1918-19 influenza pandemic.' },
                { text: 'population explosion', outcome: 'Not quite — Students often think "population explosion" refers to the entire 1901-2011 period uniformly.', reveals: 'population-explosion-refers-to-the' },
                { text: '"population explosion" refers to the entire 1901-2011 period uniformly', outcome: 'Not quite — Students often think "population explosion" refers to the entire 1901-2011 period uniformly.', reveals: 'population-explosion-refers-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_004', title: 'Birth Rate and Death Rate: Determinants and Trends in India',
          caseStudy: { intro: 'Imagine you are a district health officer in 2024 looking at two villages: Village A has a birth rate of 28 and death rate of 6; Village B has a birth rate.',
            decisions: [{ prompt: 'Define crude birth rate and crude death rate. Give the formula for each.', options: [
                { text: 'Crude Birth Rate (CBR) = (Number of live births in a year / Mid-year total population) ×', outcome: 'Crude Birth Rate (CBR) = (Number of live births in a year / Mid-year total population) × 1,000.' },
                { text: 'per 1,000', outcome: 'Not quite — Students often think “birth rate is high because people are uneducated and poor” and “death rate.', reveals: 'birth-rate-is-high-because' },
                { text: 'birth rate is high', outcome: 'Not quite — Students often think “birth rate is high because people are uneducated and poor” and “death rate.', reveals: 'birth-rate-is-high-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_02_005', title: 'Fertility and Mortality: Measures, Differentials and the Demographic Divide',
          scaffold: { problem: 'In a state, the mid-year population is 50 million. There are 12.5 million women aged 15-49.',
            steps: [
            { text: 'Identify given data — total population = 50,000,000; women 15-49 = 12,500,000; total live births = 1,250,000; women.' },
            { text: 'Recall formulas: CBR = (Total live births / Total mid-year population) × 1000; GFR = (Total live births / Women 15-49).' },
            { text: 'Substitute values: CBR = (1,250,000 / 50,000,000) × 1000 = 25 per 1000; GFR = (1,250,000 / 12,500,000) × 1000 = 100 per.' },
            { text: 'Interpret: CBR of 25 indicates moderate fertility; GFR of 100 means 10% of reproductive-age women gave birth that year.' },
            { text: 'Verify units and plausibility: All rates per 1000, ASFR < GFR < CBR?', faded: true, blankAnswer: 'CBR = 25 per 1000; GFR = 100 per 1000 women 15-49.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_02_006', title: 'Sex Ratio: Definition, Trends and Regional Variations in India',
          scaffold: { problem: 'According to Census 2011, a district has a total population of 18,50,000 with 9,62,000 males. Calculate the sex ratio.',
            steps: [
            { text: 'Identify given data — Total population = 18,50,000; Males = 9,62,000; Child population (0–6) = 2,10,000; Male children.' },
            { text: 'Calculate number of females = Total population – Males = 18,50,000 – 9,62,000 = 8,88,000.' },
            { text: 'Calculate overall sex ratio = (Females / Males) × 1000 = (8,88,000 / 9,62,000) × 1000 = 0.923 × 1000 = 923 females per.' },
            { text: 'Calculate female children = Child population – Male children = 2,10,000 – 1,12,000 = 98,000.' },
            { text: 'Calculate child sex ratio = (Female children / Male children) × 1000 = (98,000 / 1,12,000) × 1000 = 0.875 × 1000 = 875.' },
            { text: 'Interpret — Overall sex ratio (923) is below the national average (943), indicating historical gender deficit.', faded: true, blankAnswer: 'Overall sex ratio = 923 females per 1000 males; Child sex.' }
            ] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A data-lab team sees a country\'s stats — birth rate 35, death rate 10 — and declares \'permanent population explosion; Malthus was right, food will never catch up.\'',
            decisions: [{ prompt: 'What does Demographic Transition Theory say they\'re looking at?', options: [
                { text: 'Stage 2, the transitional explosion — mortality has fallen (medicine, sanitation) while fertility hasn\'t adjusted yet, so the gap bulges; it\'s a lag, not a destiny — births follow deaths downward as development continues, which is why the explosion is temporary by definition.', outcome: 'The chapter\'s mechanism: the bulge is structural lag, not proof of Malthusian doom — the same transition that produced it carries the society toward low-low stability.' },
                { text: 'They\'re right — the gap proves Malthus\'s arithmetic is finally playing out.', outcome: 'The data is transition, not doom — a low death rate with a high birth rate is the signature of a stage that ends; calling it permanent freezes a moving process at its widest point.', reveals: 'explosion-is-permanent' },
                { text: 'It\'s Stage 1 — high births plus any deaths means the old stagnant pattern.', outcome: 'Stage 1 needs a HIGH death rate near the birth rate — 35 against 10 is the mortality-collapse signature of Stage 2; misreading the death rate flips the diagnosis.', reveals: 'low-deaths-mean-stage-1' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell the \'how many\' from the \'why\' — and see why sociology owes its scientific credibility to population statistics.',
            decisions: [{ prompt: 'What comes next? The Demographic Structure of the Indian Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Demographic Structure of the Indian Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_001', difficulty: 'standard',
          question: 'Demography is the systematic, scientific study of human populations, focusing.',
          hint: 'Revisit c11_soc_cbse_05_001 (Scientific Method as the Defining Feature of Sociology) and.',
          misconception: 'Students often think "demography = census" and that the census is just a headcount.',
          parts: [
                { id: 'a', prompt: 'Define demography and explain the meaning of its Greek roots *demos* and *graphein*.', answer: 'Demography is the systematic study of population',
                  options: ['Demography is the systematic study of population', 'study of population', 'demography = census', '"demography = census" and that the census is just a headcount'],
                  hint: 'Revisit c11_soc_cbse_05_001 (Scientific Method as the Defining Feature of Sociology) and.',
                  misconception: 'Students often think "demography = census" and that the census is just a headcount.' },
                { id: 'b', prompt: 'A researcher collects data on age-specific fertility rates for five Indian states over 20 years and uses a mathematical model to project future population.', answer: 'This is formal demography',
                  options: ['This is formal demography', 'it uses data from society', 'demography = census', '"demography = census" and that the census is just a headcount'],
                  hint: 'Revisit c11_soc_cbse_05_001 (Scientific Method as the Defining Feature of Sociology) and.',
                  misconception: 'Students often think "demography = census" and that the census is just a headcount.' }
          ],
            remediations: { 'demography-census-and-that-the': { steps: ['If the student equates demography with census, do this 3-step remediation: (1) Ask: "If the census gives you 1.2.', 'What is the age/sex structure?', 'Why are rates changing?) (2) Show the formula for crude birth rate = (live births / mid-year population) × 1000.', '(3) Re-do Diagnostic Question 2: have the student write one formal and one social demography question on the *same*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "demography = census" and that the census is just a headcount.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Demography is only useful for government planning; sociology does not need it." Use Durkheim\'s suicide study as evidence.', answer: 'The statement is false',
                  options: ['The statement is false', 'demography = census', '"demography = census" and that the census is just a headcount'],
                  hint: 'Revisit c11_soc_cbse_05_001 (Scientific Method as the Defining Feature of Sociology) and.',
                  misconception: 'Students often think "demography = census" and that the census is just a headcount.' }
          ],
            remediations: { 'demography-census-and-that-the': { steps: ['If the student equates demography with census, do this 3-step remediation: (1) Ask: "If the census gives you 1.2.', 'What is the age/sex structure?', 'Why are rates changing?) (2) Show the formula for crude birth rate = (live births / mid-year population) × 1000.', '(3) Re-do Diagnostic Question 2: have the student write one formal and one social demography question on the *same*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_002', difficulty: 'standard',
          question: 'The Malthusian Theory posits that population grows geometrically (2, 4, 8, 16…).',
          hint: 'Revisit c11_soc_cbse_02_010 (Functionalist and Conflict Perspectives) and.',
          misconception: 'Students often conflate Malthus\'s "preventive checks" with modern contraception, writing that Malthus advocated birth.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Demographic Transition Theory calls the middle stage a "population explosion," and why this explosion is considered temporary.', answer: 'The "population explosion" in Stage 2 occurs',
                  options: ['The "population explosion" in Stage 2 occurs', 'lack of contraception'],
                  hint: 'Revisit c11_soc_cbse_02_010 (Functionalist and Conflict Perspectives) and c11_soc_cbse_01_005.',
                  misconception: 'Students often conflate Malthus\'s "preventive checks" with modern contraception, writing that Malthus advocated birth control.' },
                { id: 'b', prompt: 'A country has a crude birth rate of 35 per 1000 and a crude death rate of 10 per 1000.', answer: 'Stage 2 (transitional)',
                  options: ['Stage 2 (transitional)', 'population explosion'],
                  hint: 'Revisit c11_soc_cbse_02_010 (Functionalist and Conflict Perspectives) and c11_soc_cbse_01_005.',
                  misconception: 'Students often conflate Malthus\'s "preventive checks" with modern contraception, writing that Malthus advocated birth control.' },
                { id: 'c', prompt: 'Compare the Malthusian and Marxist explanations for poverty. Why did Marxist scholars reject Malthus\'s claim that population growth causes poverty?', answer: 'Malthus: Poverty results from population outstripping food supply',
                  options: ['Malthus: Poverty results from population outstripping food supply', 'Marxists agreed with Malthus but wanted revolution', 'Marxists said technology solves everything'],
                  hint: 'Revisit c11_soc_cbse_02_010 (Functionalist and Conflict Perspectives) and c11_soc_cbse_01_005.',
                  misconception: 'Students often conflate Malthus\'s "preventive checks" with modern contraception, writing that Malthus advocated birth control.' }
          ],
            remediations: { 'students-often-conflate-malthus-s': { steps: ['If a student confuses preventive checks with contraception: (1) Have them read the Malthus quotation in Box 2.1 aloud.', '(2) Ask: "What would a priest in 1798 consider a \'vice\'?" to surface the moral framework.', '(3) Contrast with Stage 2 of Demographic Transition where modern contraception actually lowers birth rates — this is.', '(4) Re-diagnose with Question 1 after 24 hours.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_003', difficulty: 'standard',
          question: 'Population size and growth trends refer to the quantitative changes in India\'s.',
          hint: 'Revisit c12_soc_cbse_02_001 (definition of rates, census methodology) and.',
          misconception: 'Students often think "population explosion" refers to the entire 1901-2011 period uniformly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population size and growth trends refer to the quantitative changes in India\'s total',
                  options: ['Population size and growth trends refer to the quantitative changes in India\'s total', 'Demography is the systematic, scientific study of human populations, focusing on their', 'The Malthusian Theory posits that population grows geometrically (2, 4, 8, 16…) while', 'Birth rate (crude birth rate) is the number of live births per 1,000 population in a'],
                  hint: 'Revisit c12_soc_cbse_02_001 (definition of rates, census methodology) and c12_soc_cbse_02_002.',
                  misconception: 'Students often think "population explosion" refers to the entire 1901-2011 period uniformly.' }
          ],
            remediations: { 'population-explosion-refers-to-the': { steps: ['If a student cannot distinguish the four growth phases, have them: (1) Re-read Table 1 and highlight each decade\'s.', '(2) Create a timeline marking 1918 flu, 1947 independence, 1960s Green Revolution, 1975-77 Emergency sterilization.', '(3) Re-attempt Diagnostic Question 4.', '(4) If still stuck, revisit node c12_soc_cbse_02_002 (Demographic Transition Theory) to link phases to theory stages.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_004', difficulty: 'standard',
          question: 'Birth rate (crude birth rate) is the number of live births per 1,000 population.',
          hint: 'If stuck, revisit the definitions in c12_soc_cbse_02_001 and the three-stage diagram.',
          misconception: 'Students often think “birth rate is high because people are uneducated and poor” and “death rate fell only because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Birth rate (crude birth rate) is the number of live births per 1,000 population in a',
                  options: ['Birth rate (crude birth rate) is the number of live births per 1,000 population in a', 'Demography is the systematic, scientific study of human populations, focusing on their', 'The Malthusian Theory posits that population grows geometrically (2, 4, 8, 16…) while', 'Population size and growth trends refer to the quantitative changes in India\'s total'],
                  hint: 'If stuck, revisit the definitions in c12_soc_cbse_02_001 and the three-stage diagram.',
                  misconception: 'Students often think “birth rate is high because people are uneducated and poor” and “death rate fell only because of modern medicine.” The.' }
          ],
            remediations: { 'birth-rate-is-high-because': { steps: ['If the student holds the above misconception, do: (1) Re-read the textbook paragraphs on “Unlike the death rate, the.', '15) and “The regional pattern of low child sex ratios” (p.', '(2) Create a two-column table: “Death-rate determinants (technical/state-led)” vs.', '“Birth-rate determinants (socio-cultural/structural)”.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_005', difficulty: 'standard',
          question: 'Fertility and mortality measures are quantitative indicators used to assess the.',
          hint: 'If stuck, revisit Node c12_soc_cbse_02_004 (Birth Rate and Death Rate: Determinants and.',
          misconception: 'Students often confuse "replacement level fertility" (TFR ≈ 2.1) with "zero population growth" and assume that once TFR.',
          parts: [
                { id: 'a', prompt: 'A district has 12,000 live births in a year, a mid-year population of 800,000, and 200,000 women aged 15-49.', answer: 'CBR = (12,000 / 800,000) × 1000 = 15 per 1000',
                  options: ['CBR = (12,000 / 800,000) × 1000 = 15 per 1000', 'replacement level fertility', 'zero population growth', 'once TFR hits 2'],
                  hint: 'If stuck, revisit Node c12_soc_cbse_02_004 (Birth Rate and Death Rate: Determinants and Trends) and.',
                  misconception: 'Students often confuse "replacement level fertility" (TFR ≈ 2.1) with "zero population growth" and assume that once TFR hits 2.1.' }
          ],
            remediations: { 'students-often-confuse-replacement-level': { steps: ['Revisit the age-structure pyramid (Node c12_soc_cbse_02_007) and trace the 0-4 cohort of 1991 moving up — show how.', 'Calculate projected births for a hypothetical population with TFR=2.1 but broad base — use the worked example method.', 'Re-diagnose with Question: "If a country\'s TFR drops to 2.1 today, will its population stabilise in 5 years?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_006', difficulty: 'standard',
          question: 'Sex ratio is defined as the number of females per 1000 males in a given.',
          hint: 'Revisit c12_soc_cbse_02_001 section on "Common Concepts and Indicators" — specifically.',
          misconception: 'Students often believe that a low sex ratio is "natural" or biological because "more boys are born than girls." They.',
          parts: [
                { id: 'a', prompt: 'A state has a child sex ratio of 850. If 1,20,000 male children (0–6 years) are recorded in the census, how many female children (0–6 years) would be expected?', answer: 'Child sex ratio = (Female children 0–6 / Male children 0–6) × 1000',
                  options: ['Child sex ratio = (Female children 0–6 / Male children 0–6) × 1000', 'natural', 'more boys are born than girls', 'a low sex ratio is "natural" or biological'],
                  hint: 'Revisit c12_soc_cbse_02_001 section on "Common Concepts and Indicators" — specifically the.',
                  misconception: 'Students often believe that a low sex ratio is "natural" or biological because "more boys are born than girls." They confuse the *sex ratio.' }
          ],
            remediations: { 'a-low-sex-ratio-is': { steps: ['If the student holds this misconception: Step 1 — Show the biological baseline: "Globally, 105 males are born per 100.', 'But by age 60, women outnumber men because of lower mortality.', 'So a healthy population has >1000 females per 1000 males." Step 2 — Contrast with Haryana\'s child sex ratio of 793.', 'That gap = missing girls." Step 3 — Assign re-diagnostic: "Calculate how many girls are \'missing\' in a cohort of 10,000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
