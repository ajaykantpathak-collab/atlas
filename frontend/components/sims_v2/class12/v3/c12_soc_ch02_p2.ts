import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch02_p2: SimDef = {
    id: 'v3_c12_soc_ch02_p2',
    title: 'The Demographic Structure of the Indian Society · Part 2/2',
    subtitle: 'Counting people was the easy part',
    classLevel: 12, subject: 'sociology', topic: 'The Demographic Structure of the Indian Society · Part 2/2',
    chapters: ['c12_soc_ch02'],
    nodeIds: ['c12_soc_cbse_02_007', 'c12_soc_cbse_02_008', 'c12_soc_cbse_02_009', 'c12_soc_cbse_02_010', 'c12_soc_cbse_02_011', 'c12_soc_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Population analyst', intro: 'A census gives you 1.2 billion people. A demographer\'s real questions start the moment the counting stops.', goal: 'Distinguish formal from social demography and explain why population data are social facts essential to theory and policy.' },
    discovery: {
        question: 'Suicide looks like the most private act imaginable — yet Durkheim found its rate stays eerily stable for whole countries and varies by religion and marital status. If it\'s personal, why does it behave like a statistic?',
        options: ['Because the rate is a social fact — a collective pattern shaped by social causes that no individual psychology can explain', 'Because depressed people copy each other', 'Because some countries underreport it', 'Because climate affects mood uniformly'],
        answer: 'Because the rate is a social fact — a collective pattern shaped by social causes that no individual psychology can explain',
        hook: 'Demography isn\'t the census — the count is just a tool. The discipline lives in rates, ratios and the social machinery behind them: why Kerala\'s fertility fell and Bihar\'s didn\'t is a question no headcount can answer.',
    },
    teaching: [
        { title: 'Age Structure: The Demographic Dividend and Its Implications', text: 'Age structure refers to the proportion of persons in different age groups relative to the total population; the demographic dividend is the economic growth potential that arises when the working-age.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split a population question in two — let formal demography forecast the numbers while social demography digs out the norms and power relations driving them.',
        labels: ['Age Structure: The Demographic', 'Literacy and Education: Levels,', 'Rural-Urban Distribution and', 'Population Composition: Occupational Structure', 'Migration: Types, Causes', 'Population Policy in India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_02_007', title: 'Age Structure: The Demographic Dividend and Its Implications',
          scaffold: { problem: 'In a hypothetical state, the 2021 Census reports: 0‑14 years = 30 million, 15‑59 years = 55 million, 60+ years = 8 million.',
            steps: [
            { text: 'Identify the three age groups and their populations from the problem statement.' },
            { text: 'Recall the dependency ratio formula for India: (0‑14 + 60+) / (15‑59) × 100.' },
            { text: 'Substitute the values: (30 + 8) / 55 × 100 = 38 / 55 × 100.' },
            { text: 'Compute: 38 ÷ 55 = 0.6909; 0.6909 × 100 ≈ 69.1.' },
            { text: 'Interpret: A dependency ratio of ~69 means 69 dependents per 100 workers.', faded: true, blankAnswer: 'Dependency ratio ≈ 69.1 dependents per 100 working‑age.' }
            ] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_008', title: 'Literacy and Education: Levels, Differentials and the Census Definition',
          caseStudy: { intro: 'Imagine you are a district collector reviewing the 2011 Census report for your area: the overall literacy rate is 73%, but female literacy is only 64.6% while.',
            decisions: [{ prompt: 'According to the Census of India, what is the minimum age at which a person is counted as literate, and what specific ability must they.', options: [
                { text: 'The Census counts a person as literate if they are aged 7 years or above and can read and', outcome: 'The Census counts a person as literate if they are aged 7 years or above and can read and write.' },
                { text: 'can sign their name', outcome: 'Not quite — Students often equate "literacy rate" with "education level" and assume that a high literacy rate.', reveals: 'students-often-equate-literacy-rate' },
                { text: 'literate = can sign name', outcome: 'Not quite — Students often equate "literacy rate" with "education level" and assume that a high literacy rate.', reveals: 'students-often-equate-literacy-rate' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_02_010', title: 'Population Composition: Occupational Structure and the Work Participation Rate',
          scaffold: { problem: 'In a tehsil, Census 2011 data shows: Total Population = 850,000; Main Workers = 210,000; Marginal Workers = 45,000.',
            steps: [
            { text: 'Identify given values — Total Population = 850,000; Main Workers = 210,000; Marginal Workers = 45,000.' },
            { text: 'Recall WPR formula: WPR = (Main Workers + Marginal Workers) / Total Population × 100.' },
            { text: 'Compute Total Workers = 210,000 + 45,000 = 255,000.' },
            { text: 'Calculate WPR = (255,000 / 850,000) × 100 = 30%.' },
            { text: 'Compute Non-workers = Total Population - Total Workers = 850,000 - 255,000 = 595,000.' },
            { text: 'Interpret — WPR of 30% is below national average (39.8%), indicating low labour force engagement; high non-worker share.', faded: true, blankAnswer: 'WPR = 30%; Non-workers = 595,000.' }
            ] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_011', title: 'Migration: Types, Causes and Consequences of Internal Migration in India',
          caseStudy: { intro: 'Imagine a 24-year-old from a village in Gaya district, Bihar, who works as a construction labourer in Gurugram for eight months a year and returns home for the.',
            decisions: [{ prompt: 'According to the Census of India, what is the minimum duration of stay required for a person to be counted as a migrant at the new place.', options: [
                { text: 'The minimum duration is six months', outcome: 'The minimum duration is six months. A wrong answer (e.g., "one month" or "one year") reveals that.' },
                { text: 'one month', outcome: 'Not quite — Students often equate "migration" only with permanent rural-to-urban movement of men for factory.', reveals: 'students-often-equate-migration-only' },
                { text: 'one year', outcome: 'Not quite — Students often equate "migration" only with permanent rural-to-urban movement of men for factory.', reveals: 'students-often-equate-migration-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_012', title: 'Population Policy in India: Family Planning and the National Population Policy',
          caseStudy: { intro: 'Imagine you\'re a health worker in 1976 during the Emergency — your supervisor hands you a quota: "Bring 20 people for sterilisation this week or lose your.',
            decisions: [{ prompt: 'What was the primary objective of India\'s National Family Planning Programme launched in 1952, and which demographic indicator was.', options: [
                { text: 'The primary objective was to slow down the rate of population growth by promoting birth', outcome: 'The primary objective was to slow down the rate of population growth by promoting birth control.' },
                { text: 'reducing death rate', outcome: 'Not quite — Students believe "National Population Policy 2000 replaced Family Planning Programme" — they treat.', reveals: 'national-population-policy-2000-replaced' },
                { text: 'improving sex ratio', outcome: 'Not quite — Students believe "National Population Policy 2000 replaced Family Planning Programme" — they treat.', reveals: 'national-population-policy-2000-replaced' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A data-lab team sees a country\'s stats — birth rate 35, death rate 10 — and declares \'permanent population explosion; Malthus was right, food will never catch up.\'',
            decisions: [{ prompt: 'What does Demographic Transition Theory say they\'re looking at?', options: [
                { text: 'Stage 2, the transitional explosion — mortality has fallen (medicine, sanitation) while fertility hasn\'t adjusted yet, so the gap bulges; it\'s a lag, not a destiny — births follow deaths downward as development continues, which is why the explosion is temporary by definition.', outcome: 'The chapter\'s mechanism: the bulge is structural lag, not proof of Malthusian doom — the same transition that produced it carries the society toward low-low stability.' },
                { text: 'They\'re right — the gap proves Malthus\'s arithmetic is finally playing out.', outcome: 'The data is transition, not doom — a low death rate with a high birth rate is the signature of a stage that ends; calling it permanent freezes a moving process at its widest point.', reveals: 'explosion-is-permanent' },
                { text: 'It\'s Stage 1 — high births plus any deaths means the old stagnant pattern.', outcome: 'Stage 1 needs a HIGH death rate near the birth rate — 35 against 10 is the mortality-collapse signature of Stage 2; misreading the death rate flips the diagnosis.', reveals: 'low-deaths-mean-stage-1' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You can now tell the \'how many\' from the \'why\' — and see why sociology owes its scientific credibility to population statistics.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_007', difficulty: 'standard',
          question: 'Age structure refers to the proportion of persons in different age groups.',
          hint: 'If stuck, revisit c12_soc_cbse_02_003 (Population Size and Growth) for the demographic.',
          misconception: 'Students often equate “demographic dividend” with “population growth” or assume a young population *guarantees*.',
          parts: [
                { id: 'a', prompt: 'Why does the NCERT text say the demographic dividend is “temporary”?', answer: 'The dividend is temporary',
                  options: ['The dividend is temporary', 'India has a demographic dividend'],
                  hint: 'If stuck, revisit c12_soc_cbse_02_003 (Population Size and Growth) for the demographic transition.',
                  misconception: 'Students often equate “demographic dividend” with “population growth” or assume a young population *guarantees* economic growth.' },
                { id: 'b', prompt: 'Using the data in Table 2, calculate the dependency ratio for India in 2001 and 2026 (projected). Interpret the change.', answer: '2001: 0‑14 = 34%, 60+ = 7% → dependents = 41%',
                  options: ['2001: 0‑14 = 34%, 60+ = 7% → dependents = 41%', 'India has a demographic dividend'],
                  hint: 'If stuck, revisit c12_soc_cbse_02_003 (Population Size and Growth) for the demographic transition.',
                  misconception: 'Students often equate “demographic dividend” with “population growth” or assume a young population *guarantees* economic growth.' }
          ],
            remediations: { 'students-often-equate-demographic-dividend': { steps: ['Re‑read Box 2.3 and underline every condition attached to the dividend (education, employment, falling dependency.', 'Re‑calculate the dependency ratio for 2001 and 2026 using the *exact* age groups given in Table 2 (0‑14, 15‑59, 60+).', 'Draw two population pyramids side‑by‑side (Kerala vs.', 'UP) and label the policy implication for each bulge/narrowing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate “demographic dividend” with “population growth” or assume a young population *guarantees*.',
          parts: [
                { id: 'a', prompt: '“India’s demographic dividend will automatically boost GDP growth because we have a young population.” Evaluate this statement using evidence from the text.', answer: 'The statement is false',
                  options: ['The statement is false', 'India has a demographic dividend'],
                  hint: 'If stuck, revisit c12_soc_cbse_02_003 (Population Size and Growth) for the demographic transition.',
                  misconception: 'Students often equate “demographic dividend” with “population growth” or assume a young population *guarantees* economic growth.' },
                { id: 'b', prompt: 'Design a one‑page policy brief for a state government (choose either Kerala or Uttar Pradesh) that outlines three concrete steps to harness or manage its.', answer: 'A good brief for Uttar Pradesh would include: (1) massive investment in',
                  options: ['A good brief for Uttar Pradesh would include: (1) massive investment in', 'India has a demographic dividend'],
                  hint: 'If stuck, revisit c12_soc_cbse_02_003 (Population Size and Growth) for the demographic transition.',
                  misconception: 'Students often equate “demographic dividend” with “population growth” or assume a young population *guarantees* economic growth.' }
          ],
            remediations: { 'students-often-equate-demographic-dividend': { steps: ['Re‑read Box 2.3 and underline every condition attached to the dividend (education, employment, falling dependency.', 'Re‑calculate the dependency ratio for 2001 and 2026 using the *exact* age groups given in Table 2 (0‑14, 15‑59, 60+).', 'Draw two population pyramids side‑by‑side (Kerala vs.', 'UP) and label the policy implication for each bulge/narrowing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_008', difficulty: 'standard',
          question: 'Literacy, as defined by the Census of India, is the ability to read and write.',
          hint: 'If stuck on interpreting Table 4, revisit the definition of "literacy rate" in the.',
          misconception: 'Students often equate "literacy rate" with "education level" and assume that a high literacy rate automatically means.',
          parts: [
                { id: 'a', prompt: 'Using Table 4, calculate the percentage-point increase in total literacy rate between 1991 and 2011.', answer: 'Step 1: Total literacy 1991 = 52.2%, 2011 = 73.0%',
                  options: ['Step 1: Total literacy 1991 = 52.2%, 2011 = 73.0%', 'literacy increased by 20.8%', 'confuses percentage points with percent change (e'],
                  hint: 'If stuck on interpreting Table 4, revisit the definition of "literacy rate" in the chapter\'s.',
                  misconception: 'Students often equate "literacy rate" with "education level" and assume that a high literacy rate automatically means a well-educated.' }
          ],
            remediations: { 'students-often-equate-literacy-rate': { steps: ['If a student conflates literacy with educational attainment: (1) Have them re-read the Census definition in the chapter.', '(2) Ask them to calculate the literacy rate and the percentage of population with Class 12+ education for a state using.', '(3) Assign a short writing task: "Explain why a district with 80% literacy can still have low female labour force.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_009', difficulty: 'standard',
          question: 'Rural-urban distribution refers to the proportional division of a country\'s.',
          hint: 'Revisit c12_soc_cbse_02_003 (Population Size and Growth) for table-reading practice and.',
          misconception: 'Students often equate \'urbanisation\' only with migration to big cities (metropolises), ignoring two other components.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural-urban distribution refers to the proportional division of a country\'s population',
                  options: ['Rural-urban distribution refers to the proportional division of a country\'s population', 'Demography is the systematic, scientific study of human populations, focusing on their', 'The Malthusian Theory posits that population grows geometrically (2, 4, 8, 16…) while', 'Population size and growth trends refer to the quantitative changes in India\'s total'],
                  hint: 'Revisit c12_soc_cbse_02_003 (Population Size and Growth) for table-reading practice and.',
                  misconception: 'Students often equate \'urbanisation\' only with migration to big cities (metropolises), ignoring two other components: (1) natural increase.' }
          ],
            remediations: { 'students-often-equate-urbanisation-only': { steps: ['Re-read the Census of India definitions of \'urban\' (statutory towns + census towns) in the Glossary.', 'Using Table 5, calculate the *urbanisation rate* (change in urban % per decade) for 1991‑2001 and 2001‑2011 — you\'ll.', 'List the three components of urban growth (natural increase, net migration, reclassification) and find one Indian.', 'Re-attempt Diagnostic Question 4 — if you now identify the \'reclassification\' deviation from the classical model, the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_010', difficulty: 'standard',
          question: 'Occupational structure refers to the distribution of the workforce across the.',
          hint: 'Revisit Census 2011 worker definitions in the textbook glossary and practice classifying.',
          misconception: 'Students often equate "Work Participation Rate" with "Employment Rate" and assume all workers are in the formal sector.',
          parts: [
                { id: 'a', prompt: 'What is the exact formula for Work Participation Rate (WPR) as used in the Indian Census, and what two categories of workers constitute the numerator?', answer: 'WPR = (Main Workers + Marginal Workers) / Total Population × 100',
                  options: ['WPR = (Main Workers + Marginal Workers) / Total Population × 100', 'main workers', 'employed persons'],
                  hint: 'Revisit Census 2011 worker definitions in the textbook glossary and practice classifying 10.',
                  misconception: 'Students often equate "Work Participation Rate" with "Employment Rate" and assume all workers are in the formal sector.' },
                { id: 'b', prompt: 'Explain why India’s female Work Participation Rate (≈25% in 2011) is far lower than male WPR (≈53%) despite similar age structures, using the concept.', answer: 'Female WPR is low',
                  options: ['Female WPR is low', 'illiteracy', 'choice'],
                  hint: 'Revisit Census 2011 worker definitions in the textbook glossary and practice classifying 10.',
                  misconception: 'Students often equate "Work Participation Rate" with "Employment Rate" and assume all workers are in the formal sector.' },
                { id: 'c', prompt: 'Compare the occupational structure of India (2011) with that of a developed country (e.g., USA: primary <2%, secondary ~20%, tertiary ~78%).', answer: 'Reasons: (1) Slow industrialisation',
                  options: ['Reasons: (1) Slow industrialisation', 'lack of education'],
                  hint: 'Revisit Census 2011 worker definitions in the textbook glossary and practice classifying 10.',
                  misconception: 'Students often equate "Work Participation Rate" with "Employment Rate" and assume all workers are in the formal sector.' }
          ],
            remediations: { 'students-often-equate-work-participation': { steps: ['If a student confuses WPR with employment rate: (1) Have them write both definitions side-by-side highlighting.', '(2) Give a mini-dataset: population 1000, main workers 200, marginal 50, unemployed (NSSO) 30.', 'Ask them to compute both rates.', '(3) Discuss why a woman doing unpaid farm work is a "worker" in Census but "out of labour force" in NSSO if not seeking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_011', difficulty: 'standard',
          question: 'Internal migration in India refers to the movement of people across.',
          hint: 'If stuck, review the Census 2011 migration classification table in NCERT Appendix and the.',
          misconception: 'Students often equate "migration" only with permanent rural-to-urban movement of men for factory jobs.',
          parts: [
                { id: 'a', prompt: 'According to the Census of India, what is the minimum duration of stay required for a person to be counted as a migrant at the new place of residence?', answer: 'The minimum duration is six months',
                  options: ['The minimum duration is six months', 'one month', 'one year', 'most migrants are male'],
                  hint: 'If stuck, review the Census 2011 migration classification table in NCERT Appendix and the push-pull.',
                  misconception: 'Students often equate "migration" only with permanent rural-to-urban movement of men for factory jobs.' },
                { id: 'b', prompt: 'A woman moves from her village in Tamil Nadu to Chennai after marriage and has lived there for ten years.', answer: 'The woman: rural-to-urban, long-term/permanent migrant',
                  options: ['The woman: rural-to-urban, long-term/permanent migrant', 'most migrants are male'],
                  hint: 'If stuck, review the Census 2011 migration classification table in NCERT Appendix and the push-pull.',
                  misconception: 'Students often equate "migration" only with permanent rural-to-urban movement of men for factory jobs.' },
                { id: 'c', prompt: 'Compare the consequences of male-dominated seasonal migration from rural Bihar to Punjab\'s agriculture with female-dominated permanent migration from rural.', answer: 'In Bihar-Punjab circular migration, men leave',
                  options: ['In Bihar-Punjab circular migration, men leave', 'women gain empowerment', 'most migrants are male'],
                  hint: 'If stuck, review the Census 2011 migration classification table in NCERT Appendix and the push-pull.',
                  misconception: 'Students often equate "migration" only with permanent rural-to-urban movement of men for factory jobs.' }
          ],
            remediations: { 'students-often-equate-migration-only': { steps: ['Revisit the Census 2011 migration tables (provided in NCERT Appendix) and manually classify 10 hypothetical cases into.', 'Draw a push-pull diagram for a specific corridor (e.g., Odisha to Kerala) using the "migration systems" approach.', 'Write a 150-word answer contrasting consequences for a source village with high male out-migration vs.', 'Re-attempt Diagnostic Questions 2 and 4; if still incorrect, review Class 11 node c11_soc_cbse_07_010 (Urbanisation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_02_012', difficulty: 'standard',
          question: 'Population Policy in India refers to the systematic set of government.',
          hint: 'Revisit c12_soc_cbse_02_005 (Fertility Measures) — specifically the worked example.',
          misconception: 'Students believe "National Population Policy 2000 replaced Family Planning Programme" — they treat it as a simple.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the National Family Planning Programme was renamed the National Family Welfare Programme after the Emergency (1975-77), and what.', answer: 'The renaming signalled a shift from coercive, target-driven sterilisation camps',
                  options: ['The renaming signalled a shift from coercive, target-driven sterilisation camps', 'name change', 'less force', 'National Population Policy 2000 replaced Family Planning Programme'],
                  hint: 'Revisit c12_soc_cbse_02_005 (Fertility Measures) — specifically the worked example showing TFR.',
                  misconception: 'Students believe "National Population Policy 2000 replaced Family Planning Programme" — they treat it as a simple programme rename.' },
                { id: 'b', prompt: 'A state has a Total Fertility Rate (TFR) of 3.1 (like Uttar Pradesh in 2016) while another has 1.7 (like Tamil Nadu).', answer: 'Current TFR = 3.1',
                  options: ['Current TFR = 3.1', 'National Population Policy 2000 replaced Family Planning Programme', 'replacement level TFR = 2.1', 'two-child norm'],
                  hint: 'Revisit c12_soc_cbse_02_005 (Fertility Measures) — specifically the worked example showing TFR.',
                  misconception: 'Students believe "National Population Policy 2000 replaced Family Planning Programme" — they treat it as a simple programme rename.' }
          ],
            remediations: { 'national-population-policy-2000-replaced': { steps: ['If the student conflates policy phases or misstates replacement level: 1.', '**Create a timeline chart** (1952 → 1975-77 → 1977 → 2000 → 2017) with three columns: Programme Name, Key Approach.', '**Revisit c12_soc_cbse_02_004 (Birth/Death Rate)** and **c12_soc_cbse_02_005 (Fertility Measures)** to clarify TFR vs.', '**Re-do Diagnostic Q3 and Q4** — these test the exact confusion points.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
