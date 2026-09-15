import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch03_p1: SimDef = {
    id: 'v3_c12_geo_ch03_p1',
    title: 'Human Development · Part 1/2',
    subtitle: 'GDP doubled, choices shrank — the difference that defines development',
    classLevel: 12, subject: 'geography', topic: 'Human Development · Part 1/2',
    chapters: ['c12_geo_ch03'],
    nodeIds: ['c12_geo_cbse_03_001', 'c12_geo_cbse_03_002', 'c12_geo_cbse_03_003', 'c12_geo_cbse_03_004', 'c12_geo_cbse_03_005', 'c12_geo_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Development analyst', intro: 'Mahbub ul Haq asked a dangerous question: what if a country gets richer and its people get less free? The answer built the HDI era.', goal: 'Distinguish growth from human development and apply the capability lens of health, education and access to resources.' },
    discovery: {
        question: 'A city doubles its GDP per capita in a decade — while infant mortality stays flat and female literacy falls. Mahbub ul Haq\'s verdict?',
        options: ['Growth without development — choices actually shrank; development is qualitative and value-positive, and this city moved backwards on health and education', 'Full development — GDP doubled', 'Partial development — money first, people later', 'No development needed — wealth is enough'],
        answer: 'Growth without development — choices actually shrank; development is qualitative and value-positive, and this city moved backwards on health and education',
        hook: 'Growth is quantitative and value-neutral — it can even be negative; development must expand what people can be and do. And the trap: HDI measures the average, not the spread — a rising rank can hide deepening deprivation for those the average forgets.',
    },
    teaching: [
        { title: 'Human Development: Concept and Meaning (Mahbub ul Haq)', text: 'Human development is a qualitative, value-positive process of enlarging people\'s freedoms and capabilities to lead lives they value, introduced by Dr. Mahbub ul Haq.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit a nation\'s true progress: separate growth from development, run the three capability tests — health, education, resources — then interrogate whether an HDI rise means everyone got freer.',
        labels: ['Human Development: Concept', 'Human Development vs Economic', 'Four Pillars of Human', 'Approaches to Human Development', 'Human Development Index (HDI)', 'Human Development Index: Country'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_001', title: 'Human Development: Concept and Meaning (Mahbub ul Haq)',
          caseStudy: { intro: 'Look at your own neighbourhood: a new mall opens (growth in commercial space) but the nearby government school still lacks clean toilets and qualified.',
            decisions: [{ prompt: 'State the fundamental difference between growth and development as defined in the NCERT, using the terms "quantitative" and "qualitative".', options: [
                { text: 'Correct answer: Growth is quantitative and value-neutral (can be positive or negative,', outcome: 'Correct answer: Growth is quantitative and value-neutral (can be positive or negative, e.g.' },
                { text: 'growth is economic, development is social', outcome: 'Not quite — Students equate "human development" with "human development index (HDI)" — they think the *concept*.', reveals: 'students-equate-human-development-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_003', title: 'Four Pillars of Human Development: Equity, Sustainability, Productivity, Empowerment',
          caseStudy: { intro: 'Observe a local Anganwadi center: children from different castes and income groups receive mid-day meals, health check-ups, and early education.',
            decisions: [{ prompt: 'Define \'equity\' in the context of human development and give one Indian example where equity is violated in access to education.', options: [
                { text: 'Equity means making equal access to opportunities available to everybody irrespective of', outcome: 'Equity means making equal access to opportunities available to everybody irrespective of gender.' },
                { text: 'equity means everyone gets the same resources', outcome: 'Not quite — Students conflate the four pillars with the three HDI dimensions (health, education, income).', reveals: 'students-conflate-the-four-pillars' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_004', title: 'Approaches to Human Development: Income, Welfare, Basic Needs, Capability',
          caseStudy: { intro: 'Observe a mid-day meal programme in a government school near you: children receive free lunch (Basic Needs), funded by state welfare budgets (Welfare).',
            decisions: [{ prompt: 'Name the four approaches to human development listed in NCERT Table 3.1 and identify the economist associated with the Capability Approach.', options: [
                { text: 'The four approaches are: (1) Income Approach, (2) Welfare Approach, (3) Basic Needs', outcome: 'The four approaches are: (1) Income Approach, (2) Welfare Approach, (3) Basic Needs Approach, (4).' },
                { text: 'GDP Approach', outcome: 'Not quite — Students conflate the *Welfare Approach* with the *Capability Approach* because both involve.', reveals: 'students-conflate-the-welfare-approach' },
                { text: 'Growth Approach', outcome: 'Not quite — Students conflate the *Welfare Approach* with the *Capability Approach* because both involve.', reveals: 'students-conflate-the-welfare-approach' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_03_005', title: 'Human Development Index (HDI): Components and Calculation',
          scaffold: { problem: 'The state of Maharashtra reports: Life Expectancy at Birth = 71.6 years, Adult Literacy Rate = 82.3%, Gross Enrolment Ratio = 78.5%, Per.',
            steps: [
            { text: 'Identify the goalposts for each indicator from the original HDI methodology: Health (min=25, max=85), Education.' },
            { text: 'Compute Life Expectancy Index = (71.6 – 25) / (85 – 25) = 46.6 / 60 = 0.7767.' },
            { text: 'Compute Adult Literacy Index = (82.3 – 0) / (100 – 0) = 0.823.' },
            { text: 'Compute Education Index = (2/3 × 0.823) + (1/3 × 0.785) = 0.5487 + 0.2617 = 0.8104.' },
            { text: 'Compute Income Index using log transformation: log(8200) ≈ 3.9138, log(100) = 2, log(40000) ≈ 4.6021.' },
            { text: 'Compute HDI = (1/3) × (0.7767 + 0.8104 + 0.7355) = (1/3) × 2.3226 = 0.7742.' },
            { text: 'Interpret: Maharashtra\'s HDI (0.774) is significantly above India\'s national average (0.645), placing it in the "High.', faded: true, blankAnswer: 'Maharashtra HDI ≈ 0.774 (High Human Development).' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_006', title: 'Human Development Index: Country Classification (High, Medium, Low)',
          caseStudy: { intro: 'Begin by showing students two photographs: a bustling metro station in Oslo (Norway, HDI 0.961) and a rural clinic in Niger (HDI 0.400).',
            decisions: [{ prompt: 'A country reports an HDI value of 0.742 in the 2025 Human Development Report.', options: [
                { text: 'The country falls in the **High human development** tier (0.700–0.799)', outcome: 'The country falls in the **High human development** tier (0.700–0.799).' },
                { text: 'based mainly on income**—e.g', outcome: 'Not quite — Students believe **HDI tiers are fixed "clubs" based mainly on income**—e.g., "All oil-rich Gulf.', reveals: 'hdi-tiers-are-fixed-clubs' },
                { text: '**HDI tiers are fixed "clubs" based mainly on income**—e', outcome: 'Not quite — Students believe **HDI tiers are fixed "clubs" based mainly on income**—e.g., "All oil-rich Gulf.', reveals: 'hdi-tiers-are-fixed-clubs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at a state policy cell, you\'re asked which of two districts deserves a \'model development\' citation. District A has higher per-capita income; District B has lower income but better life expectancy, higher literacy, and stronger public services.',
            decisions: [{ prompt: 'What does the human development framework say?', options: [
                { text: 'Cite District B — growth is quantitative and value-neutral while development is qualitative and value-positive; the capability approach counts health and education as capabilities in themselves, so lower income can still mean higher development, as Kerala shows against richer states.', outcome: 'The chapter\'s core claim: development happens only when capabilities enlarge real choices — B\'s life expectancy and literacy are development; A\'s income is only growth.' },
                { text: 'Cite District A — higher income means higher development; health and literacy follow money automatically.', outcome: 'That\'s the income approach the chapter refutes: positive growth does not always lead to development, and identical-income states can sit far apart on human development once you look at capabilities.', reveals: 'income-equals-development' },
                { text: 'Declare it a tie — since the comparison mixes economic and social indicators, no ranking is possible.', outcome: 'False neutrality misses the framework: the capability approach exists precisely to rank such cases — B\'s superior health and education outcomes make it more developed despite lower income.', reveals: 'mixed-indicators-mean-tie' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read development as enlarged choice, not enlarged output — and catch the \'growth without development\' trap that fools headline-readers.',
            decisions: [{ prompt: 'What comes next? Human Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_001', difficulty: 'standard',
          question: 'Human development is a qualitative, value-positive process of enlarging.',
          hint: 'Revisit c11_geo_cbse_16_003 (Population Composition) — specifically the definitions.',
          misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.',
          parts: [
                { id: 'a', prompt: 'A city\'s GDP per capita doubles over ten years, but its infant mortality rate remains unchanged and female literacy drops.', answer: 'Correct answer: GDP doubling is quantitative growth (value-neutral)',
                  options: ['Correct answer: GDP doubling is quantitative growth (value-neutral)', 'GDP isn\'t everything', 'not development'],
                  hint: 'Revisit c11_geo_cbse_16_003 (Population Composition) — specifically the definitions of literacy.',
                  misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.' }
          ],
            remediations: { 'students-equate-human-development-with': { steps: ['Re-read the NCERT paragraph starting "The concept of human development was introduced by Dr Mahbub-ul-Haq" — highlight.', 'Write three sentences using only those verbs describing your own life (e.g., "I am free to choose science stream").', 'Map each sentence to health/education/resources.', 'Attempt Diagnostic Question 2 again. If still stuck, revisit c11_geo_cbse_16_003 (Population Composition: literacy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.',
          parts: [
                { id: 'a', prompt: 'Design a 3-minute classroom activity for Class 12 students to experience how "lack of capability limits choice" — the core Mahbub ul Haq insight.', answer: 'Activity: "The Unread Notice." Distribute a handout with a fictional government',
                  options: ['Activity: "The Unread Notice." Distribute a handout with a fictional government', 'simulate poverty by skipping lunch'],
                  hint: 'Revisit c11_geo_cbse_16_003 (Population Composition) — specifically the definitions of literacy.',
                  misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.' }
          ],
            remediations: { 'students-equate-human-development-with': { steps: ['Re-read the NCERT paragraph starting "The concept of human development was introduced by Dr Mahbub-ul-Haq" — highlight.', 'Write three sentences using only those verbs describing your own life (e.g., "I am free to choose science stream").', 'Map each sentence to health/education/resources.', 'Attempt Diagnostic Question 2 again. If still stuck, revisit c11_geo_cbse_16_003 (Population Composition: literacy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_002', difficulty: 'standard',
          question: 'Human development is a qualitative, value-positive process of enlarging.',
          hint: 'Revisit Class 10 Economics Chapter 1 (Development) and Class 11 Geography node.',
          misconception: 'Students equate "economic development" with "human development" and believe higher GDP per capita automatically means.',
          parts: [
                { id: 'a', prompt: 'Analyse the following statement: "Kerala has lower per capita income than Gujarat but higher HDI rank.', answer: 'The flaw is treating the relationship as binary',
                  options: ['The flaw is treating the relationship as binary', 'not the only factor', 'not a factor at all'],
                  hint: 'Revisit Class 10 Economics Chapter 1 (Development) and Class 11 Geography node c11_geo_cbse_18_003.',
                  misconception: 'Students equate "economic development" with "human development" and believe higher GDP per capita automatically means better human.' }
          ],
            remediations: { 'students-equate-economic-development-with': { steps: ['Re-read the NCERT paragraph "Growth and Development" and create a two-column table: Growth (quantitative.', 'Watch the 5-minute video "GDP vs HDI: The Kerala-Gujarat Comparison" (search on DIKSHA).', 'Take the "Growth vs Development" self-check quiz on the CBSE Geography practice portal.', 'If confusion persists, revisit Class 10 Economics node c10_geo_cbse_04_001 (Agriculture\'s role in economy) to see how.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_003', difficulty: 'standard',
          question: 'The four pillars of human development—equity, sustainability, productivity, and.',
          hint: 'Revisit c12_geo_cbse_03_001 (concept of human development) and c12_geo_cbse_03_002.',
          misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).',
          parts: [
                { id: 'a', prompt: 'Explain why sustainability is described as \'continuity in the availability of opportunities\' rather than just environmental conservation.', answer: 'Sustainability in human development means each generation must have the same',
                  options: ['Sustainability in human development means each generation must have the same', 'planting trees'],
                  hint: 'Revisit c12_geo_cbse_03_001 (concept of human development) and c12_geo_cbse_03_002 (growth.',
                  misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).' },
                { id: 'b', prompt: 'Compare Kerala and Gujarat on the empowerment pillar. Both have similar per capita incomes, but Kerala has higher female literacy and political participation.', answer: 'Empowerment comes from increasing freedom and capability, not just income',
                  options: ['Empowerment comes from increasing freedom and capability, not just income', 'higher income always leads to empowerment'],
                  hint: 'Revisit c12_geo_cbse_03_001 (concept of human development) and c12_geo_cbse_03_002 (growth.',
                  misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).' }
          ],
            remediations: { 'students-conflate-the-four-pillars': { steps: ['Re-read the NCERT section "The Four Pillars of Human Development" (page 16-17) and create a 2x2 table: Pillar | NCERT.', 'For each pillar, write one sentence explaining how it differs from the closest HDI dimension.', 'Take the diagnostic questions 1-4 again.', 'If confusion persists, watch the 10-minute video "Human Development Pillars Explained" by NCERT Official on YouTube and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_004', difficulty: 'standard',
          question: 'The four approaches to human development — Income, Welfare, Basic Needs, and.',
          hint: 'Revisit c12_geo_cbse_03_002 worked examples on "Growth without Development" — use the.',
          misconception: 'Students conflate the *Welfare Approach* with the *Capability Approach* because both involve government spending.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The four approaches to human development',
                  options: ['The four approaches to human development', 'Human development is a qualitative, value-positive process of enlarging people\'s freedoms', 'Human development is a qualitative, value-positive process of enlarging people\'s freedoms', 'The four pillars of human development—equity, sustainability, productivity, and'],
                  hint: 'Revisit c12_geo_cbse_03_002 worked examples on "Growth without Development" — use the city.',
                  misconception: 'Students conflate the *Welfare Approach* with the *Capability Approach* because both involve government spending on health/education.' }
          ],
            remediations: { 'students-conflate-the-welfare-approach': { steps: ['Re-read the NCERT Table 3.1 — create a 4-column comparison chart (Approach | Core Idea | People\'s Role | Policy Focus).', 'Watch Amartya Sen\'s 5-minute video "Capability Approach vs Basic Needs" (available on UNDP YouTube).', 'Apply to a local case — interview an ASHA worker: "Does the government giving free medicine (Welfare) mean the patient.', 'Re-attempt Diagnostic Question 4 as a table. If still stuck, revisit c12_geo_cbse_03_003 (Four Pillars) — empowerment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_005', difficulty: 'standard',
          question: 'The Human Development Index (HDI) is a composite statistical measure used.',
          hint: 'If stuck on normalization, revisit the concept of "index numbers" from Class 11 Economics.',
          misconception: 'Students often believe that the HDI is calculated as a simple average of the three *raw* indicators (e.g., (Life.',
          parts: [
                { id: 'a', prompt: 'What are the three dimensions of the Human Development Index and the specific indicator used for each dimension according to the original UNDP methodology.', answer: 'The three dimensions and their indicators are: (1) Health',
                  options: ['The three dimensions and their indicators are: (1) Health', 'infant mortality rate', 'mean years of schooling', 'infant mortality rate" for health or "mean years of schooling" for education'],
                  hint: 'If stuck on normalization, revisit the concept of "index numbers" from Class 11 Economics (Index.',
                  misconception: 'Students often believe that the HDI is calculated as a simple average of the three *raw* indicators (e.g., (Life Expectancy + Literacy Rate.' }
          ],
            remediations: { 'the-hdi-is-calculated-as': { steps: ['Revisit **c12_geo_cbse_03_004** (Capabilities Approach) to understand *why* we measure capabilities, not just income.', 'Review the normalization formula: Index = (Actual – Min) / (Max – Min).', 'Practice with a simple example: if max=100, min=0, actual=60 → index=0.6.', 'Study the **logarithmic income transformation**: plot log(income) vs income to see diminishing returns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_006', difficulty: 'standard',
          question: 'The Human Development Index (HDI) country classification system categorizes.',
          hint: 'If unsure about geometric mean vs arithmetic mean impact, re-work the numerical example.',
          misconception: 'Students believe **HDI tiers are fixed "clubs" based mainly on income**—e.g., "All oil-rich Gulf states are Very High.',
          parts: [
                { id: 'a', prompt: 'A country reports an HDI value of 0.742 in the 2025 Human Development Report.', answer: 'The country falls in the **High human development** tier (0.700–0.799)',
                  options: ['The country falls in the **High human development** tier (0.700–0.799)', 'based mainly on income**—e.g', '**HDI tiers are fixed "clubs" based mainly on income**—e'],
                  hint: 'If unsure about geometric mean vs arithmetic mean impact, re-work the numerical example.',
                  misconception: 'Students believe **HDI tiers are fixed "clubs" based mainly on income**—e.g., "All oil-rich Gulf states are Very High HDI." In reality.' },
                { id: 'b', prompt: 'Given the 2025 HDR data: Very High = 74 countries, High = 50, Medium = 53, Low = 26. Calculate the percentage of the 193 UN member states in each tier.', answer: '**Calculation**: Very High = 74/193 ≈ 38.3%',
                  options: ['**Calculation**: Very High = 74/193 ≈ 38.3%', 'based mainly on income**—e.g', '**HDI tiers are fixed "clubs" based mainly on income**—e'],
                  hint: 'If unsure about geometric mean vs arithmetic mean impact, re-work the numerical example.',
                  misconception: 'Students believe **HDI tiers are fixed "clubs" based mainly on income**—e.g., "All oil-rich Gulf states are Very High HDI." In reality.' }
          ],
            remediations: { 'hdi-tiers-are-fixed-clubs': { steps: ['**Step 1**: Revisit **c12_geo_cbse_03_005** (HDI Components and Calculation) — re-derive the geometric mean formula.', '**Step 2**: Plot 10 countries on a scatter graph: x-axis = GNI per capita (log scale), y-axis = HDI.', 'Identify outliers (high income, medium HDI).', '**Step 3**: For each outlier, read the HDR country note to find the *specific capability deficit* (e.g., "low female.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
