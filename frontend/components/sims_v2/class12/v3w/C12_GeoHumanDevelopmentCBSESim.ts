import type { SimDef } from '../../engine/types';
import C12_GeoHumanDevelopmentCBSESim from '../../../simulations/c6_12_new/C12_GeoHumanDevelopmentCBSESim';

/** v3 wrapped master — C12_GeoHumanDevelopmentCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geohumandevelopmentcbsesim: SimDef = {
    id: 'v3w_c12_geohumandevelopmentcbsesim',
    title: 'Major Schools of Human Geography: Determinism',
    subtitle: 'This node covers only Environmental Determinism: its definition, historical context, key.',
    classLevel: 12, subject: 'science', topic: 'Major Schools of Human Geography: Determinism',
    chapters: [],
    nodeIds: ['c12_geo_cbse_01_004', 'c12_geo_cbse_01_005', 'c12_geo_cbse_01_006', 'c12_geo_cbse_03_001', 'c12_geo_cbse_03_002', 'c12_geo_cbse_03_003', 'c12_geo_cbse_03_004', 'c12_geo_cbse_03_005', 'c12_geo_cbse_03_006', 'c12_geo_cbse_03_007', 'c12_geo_cbse_03_008', 'c12_geo_cbse_03_009', 'c12_geo_cbse_03_010', 'c12_geo_cbse_07_001', 'c12_geo_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a tribal hamlet in the Abujh Maad region of Chhattisgarh where families practice shifting cultivation.', goal: 'Master Major Schools of Human Geography: Determinism.' },
    discovery: {
        question: 'A student argues: "The Inuit in the Arctic and the Bedouins in the Sahara both practice determinism because they wear fur and live in tents respectively.".',
        options: ['Step 1: Identify the determinist claim', 'adaptation', 'determination'],
        answer: 'Step 1: Identify the determinist claim',
        hook: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy,.',
    },
    teaching: [
        { title: 'Environmental Determinism is the school of.', text: 'Environmental Determinism is the school of thought in human geography which asserts that the physical environment (climate, terrain, soil, vegetation) exclusively controls, determines, and limits the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_004', title: 'Environmental Determinism is the school.',
          scaffold: { problem: 'A Class 12 student writes in the board exam: "Environmental Determinism means climate determines human behaviour.',
            steps: [
            { text: 'Identify the student\'s core claim — "climate determines behaviour" (climate determinism).' },
            { text: 'Check NCERT definition — Determinism = "interaction between primitive human society and strong forces of nature" at.' },
            { text: 'Error 1 — Rajasthan communities have high technology (irrigation, transport, solar power, tourism); they are not.' },
            { text: 'Error 2 — "Hardworking" is a cultural stereotype, not a geographical determination; determinism describes material.' },
            { text: 'Error 3 — The student ignores the *technological mediator*; NCERT says "Technology indicates the level of cultural.' },
            { text: 'Rewrite — "Environmental Determinism describes societies with minimal technology (e.g., Benda\'s shifting cultivation in.', faded: true, blankAnswer: 'Corrected answer as in Step 6. The 3 errors are: (1) Wrong.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_005', title: 'Possibilism is the school of thought in.',
          scaffold: { problem: 'In the Kashmir Valley, traditional houses (dhajji dewari) use timber-laced masonry that withstands earthquakes, while modern concrete.',
            steps: [
            { text: 'Identify the environmental constraint — Kashmir lies in Seismic Zone V (highest earthquake risk).' },
            { text: 'List the possibilities for construction — (a) heavy rigid concrete, (b) flexible timber-laced masonry, (c) steel-frame,.' },
            { text: 'Evaluate each possibility against local resources and culture — timber and stone are locally available; concrete.' },
            { text: 'Assess performance during earthquakes — dhajji dewari walls dissipate energy through friction in timber joints.' },
            { text: 'Conclude — possibilism values *locally adapted* technology that works *with* the constraint (seismic energy) rather.', faded: true, blankAnswer: 'Traditional dhajji dewari is a possibilist adaptation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_006', title: 'Neo-determinism (Stop-and-Go.',
          scaffold: { problem: 'A state government proposes a 2000 MW coal-fired thermal power plant in the Mahanadi basin, Chhattisgarh.',
            steps: [
            { text: 'Identify the environmental thresholds (red lights) — Grade-III forest = legal/ecological red light (Forest Conservation.' },
            { text: 'Identify conditional factors (amber lights) — Water allocation from Hirakud: depends on downstream flow requirements,.' },
            { text: 'Identify genuine possibilities (green lights) — If the plant uses supercritical technology (higher efficiency, lower.' },
            { text: 'Synthesise verdict — **Red lights dominate**: Forest diversion + seismic risk + tribal rights = multiple non-negotiable.' },
            { text: 'Verify against NCERT — Taylor: "human beings can conquer nature by obeying it." Obeying here means respecting forest,.', faded: true, blankAnswer: 'Project rejected at proposed site (multiple red lights)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_03_001', title: 'Human development is a qualitative,.',
          scaffold: { problem: 'A district in Madhya Pradesh reports: Crude Birth Rate 28, Crude Death Rate 8, Infant Mortality Rate 52, Literacy Rate 62% (Male 74%,.',
            steps: [
            { text: 'Convert each indicator to capability language — IMR 52 → health capability deprivation (children dying before age 1);.' },
            { text: 'Apply Haq\'s test — "Does positive growth in any indicator automatically mean development?" Check if income grew: if per.' },
            { text: 'Identify the *mechanism* of capability deprivation — low female literacy means women cannot read health notices, scheme.' },
            { text: 'Conclude — development requires simultaneous expansion in all three capabilities; single-indicator growth fails Haq\'s.' },
            { text: 'Verify against NCERT — the textbook\'s city example (population grows, services don\'t) is structurally identical:.', faded: true, blankAnswer: 'Most severe deprivations: health (IMR 52 >> national avg.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_03_002', title: 'Human development is a qualitative,.',
          scaffold: { problem: 'A district in Odisha reports 8% annual GDP growth for five years due to mining.',
            steps: [
            { text: 'Identify the growth indicator — 8% GDP growth driven by mining (quantitative, value-neutral).' },
            { text: 'Recall the NCERT condition — development requires positive change in quality (health, education, dignity).' },
            { text: 'Map each capability deficit — high infant mortality = poor health capability; low female literacy = poor education.' },
            { text: 'Conclude — growth has not translated into expanded capabilities; the district exhibits growth without development.' },
            { text: 'Policy implication — mining revenue must be invested in public health, girls\' schools, and sanitation to convert growth.', faded: true, blankAnswer: 'The district shows economic growth without human.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_03_003', title: 'The four pillars of human.',
          scaffold: { problem: 'In a tribal block of Odisha, 60% of children are malnourished, female literacy is 32%, and most households depend on rainfed agriculture.',
            steps: [
            { text: 'Recall the exact NCERT definition of each pillar: Equity = equal access to opportunities; Sustainability = continuity.' },
            { text: 'Analyze intervention (A): A district hospital improves health access but may not reach remote tribal hamlets equally.' },
            { text: 'Analyze intervention (B): Smartphones for ASHA workers improve health service delivery efficiency.' },
            { text: 'Analyze intervention (C): Millet meals + nutrition education directly address child malnutrition (health capability →.' },
            { text: 'Analyze intervention (D): Reserved panchayat seats give women decision-making power (empowerment) which can lead to.' },
            { text: 'Synthesize: (A)→Productivity, (B)→Productivity+Equity, (C)→All four, (D)→Empowerment→Equity. The most holistic is (C).', faded: true, blankAnswer: '(A) primarily Productivity (health capability); (B).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_01_005', title: 'Identify each idea',
          dissect: { specimen: 'Major Schools of Human Geography: Determinism', spots: [
            { id: 's1', label: 'Environmental Determinism is the school', prompt: 'Which idea is this? — Environmental Determinism is the school of thought in human geography which asserts that.', answer: 'Environmental Determinism is the school', options: ['Environmental Determinism is the school', 'Possibilism is the school of', 'Neo-determinism Stop-and-Go Determinism proposed by', 'Human development is a qualitative'] },
            { id: 's2', label: 'Possibilism is the school of', prompt: 'Which idea is this? — Possibilism is the school of thought in human geography which asserts that the physical.', answer: 'Possibilism is the school of', options: ['Possibilism is the school of', 'Environmental Determinism is the school', 'Neo-determinism Stop-and-Go Determinism proposed by', 'Human development is a qualitative'] },
            { id: 's3', label: 'Neo-determinism Stop-and-Go Determinism proposed by', prompt: 'Which idea is this? — Neo-determinism (Stop-and-Go Determinism), proposed by Griffith Taylor, is a middle-path.', answer: 'Neo-determinism Stop-and-Go Determinism proposed by', options: ['Neo-determinism Stop-and-Go Determinism proposed by', 'Environmental Determinism is the school', 'Possibilism is the school of', 'Human development is a qualitative'] },
            { id: 's4', label: 'Human development is a qualitative', prompt: 'Which idea is this? — Human development is a qualitative, value-positive process of enlarging people\'s freedoms.', answer: 'Human development is a qualitative', options: ['Human development is a qualitative', 'Environmental Determinism is the school', 'Possibilism is the school of', 'Neo-determinism Stop-and-Go Determinism proposed by'] },
            { id: 's5', label: 'The four pillars of human', prompt: 'Which idea is this? — The four pillars of human development—equity, sustainability, productivity, and.', answer: 'The four pillars of human', options: ['The four pillars of human', 'Environmental Determinism is the school', 'Possibilism is the school of', 'Neo-determinism Stop-and-Go Determinism proposed by'] }
          ] } }
    ],
    explore: { component: C12_GeoHumanDevelopmentCBSESim, prompt: 'Explore the interactive — Major Schools of Human Geography: Determinism' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_004', difficulty: 'standard',
          question: 'Environmental Determinism is the school of thought in human geography which.',
          hint: 'If stuck, revisit c12_geo_cbse_01_002 and map each Benda action to "nature as master" —.',
          misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy,.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Inuit in the Arctic and the Bedouins in the Sahara both practice determinism because they wear fur and live in tents respectively.".', answer: 'Step 1: Identify the determinist claim',
                  options: ['Step 1: Identify the determinist claim', 'adaptation', 'determination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' },
                { id: 'b', prompt: 'Compare the "Naturalisation of Humans" (Determinism) and "Humanisation of Nature" (Possibilism) using the two NCERT case studies: Benda (Abujh Maad) and Kari.', answer: '| Aspect | Benda (Determinism) | Kari (Possibilism) |',
                  options: ['| Aspect | Benda (Determinism) | Kari (Possibilism) |', 'Mother Nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' }
          ],
            remediations: { 'students-equate-environmental-determinism-with': { steps: ['Re-read the "Naturalisation of Humans" box (Benda story) and underline every verb showing *passive* human action.', 'Re-read the "Humanisation of Nature" box (Kari story) and underline every verb showing *active* human action (drives,.', 'Make a T-chart: Left column = Benda\'s verbs (determinism), Right column = Kari\'s verbs (possibilism).', 'Ask: "Which verb list requires technology?" → All Kari\'s verbs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy,.',
          parts: [
                { id: 'a', prompt: 'Compare the "Naturalisation of Humans" (Determinism) and "Humanisation of Nature" (Possibilism) using the two NCERT case studies: Benda (Abujh Maad) and Kari.', answer: '| Aspect | Benda (Determinism) | Kari (Possibilism) |',
                  options: ['| Aspect | Benda (Determinism) | Kari (Possibilism) |', 'Mother Nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' }
          ],
            remediations: { 'students-equate-environmental-determinism-with': { steps: ['Re-read the "Naturalisation of Humans" box (Benda story) and underline every verb showing *passive* human action.', 'Re-read the "Humanisation of Nature" box (Kari story) and underline every verb showing *active* human action (drives,.', 'Make a T-chart: Left column = Benda\'s verbs (determinism), Right column = Kari\'s verbs (possibilism).', 'Ask: "Which verb list requires technology?" → All Kari\'s verbs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_005', difficulty: 'standard',
          question: 'Possibilism is the school of thought in human geography which asserts that the.',
          hint: 'If stuck, revisit c12_geo_cbse_01_004 (Determinism) and the NCERT story of Benda (Abujh.',
          misconception: 'Students often equate possibilism with "humans can conquer nature completely" and cite examples like Dubai\'s Palm.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "Humans are completely free to do whatever they want on Earth" is a misinterpretation of possibilism.', answer: 'Possibilism does not claim absolute freedom',
                  options: ['Possibilism does not claim absolute freedom', 'possibilism means no environmental limits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate possibilism with "humans can conquer nature completely" and cite examples like Dubai\'s Palm Islands or.' }
          ],
            remediations: { 'students-often-equate-possibilism-with': { steps: ['If a student cannot distinguish possibilism from "technological optimism," do this 3-step remediation: 1.', 'Re-read the NCERT box "Humanisation of Nature" (Trondheim example) and list *all* the energy inputs required (oil for.', 'Compare with the "Naturalisation of Humans" box (Benda in Abujh Maad) — note the near-zero external energy use.', 'Discuss: "Which lifestyle has more *future* possibilities if fossil fuels become scarce?" This forces the student to.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_006', difficulty: 'standard',
          question: 'Neo-determinism (Stop-and-Go Determinism), proposed by Griffith Taylor, is a.',
          hint: 'If unclear on determinism vs. possibilism, revisit **c12_geo_cbse_01_004** (Benda\'s story.',
          misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write:.',
          parts: [
                { id: 'a', prompt: 'Why did Griffith Taylor propose neo-determinism as a "middle path" (Madhyam Marg) between environmental determinism and possibilism?', answer: 'Determinism (Ratzel, Semple) saw technology as negligible',
                  options: ['Correct answer: Determinism (Ratzel, Semple) saw technology as negligible', 'Taylor just compromised', 'stop-and-go'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' },
                { id: 'b', prompt: 'ANALYZE: Compare the 2013 Kedarnath disaster and the success of Indira Gandhi Canal in Rajasthan through the neo-determinist framework.', answer: 'Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,',
                  options: ['Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,', 'stop-and-go', 'balance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' }
          ],
            remediations: { 'students-confuse-neo-determinism-s': { steps: ['If the student cannot distinguish neo-determinism from "balance/compromise": 1.', 'Revisit **c12_geo_cbse_01_004 (Determinism)** and **c12_geo_cbse_01_005 (Possibilism)** — make a three-column table:.', 'Rows: Role of nature, Role of technology, Human agency, Red-light concept, Example.', 'Watch the 5-min animation "Griffith Taylor\'s Traffic Lights" (NCERT official YouTube) — pause at each colour and write.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write:.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "Neo-determinism is just environmental determinism repackaged for the climate-change era." Critique this statement using Griffith Taylor\'s original.', answer: 'Correct evaluation: The statement is **false**',
                  options: ['Correct evaluation: The statement is **false**', 'stop-and-go', 'balance', 'compromise'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' },
                { id: 'b', prompt: 'ANALYZE: Compare the 2013 Kedarnath disaster and the success of Indira Gandhi Canal in Rajasthan through the neo-determinist framework.', answer: 'Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,',
                  options: ['Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,', 'stop-and-go', 'balance', 'compromise'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' }
          ],
            remediations: { 'students-confuse-neo-determinism-s': { steps: ['If the student cannot distinguish neo-determinism from "balance/compromise": 1.', 'Revisit **c12_geo_cbse_01_004 (Determinism)** and **c12_geo_cbse_01_005 (Possibilism)** — make a three-column table:.', 'Rows: Role of nature, Role of technology, Human agency, Red-light concept, Example.', 'Watch the 5-min animation "Griffith Taylor\'s Traffic Lights" (NCERT official YouTube) — pause at each colour and write.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_001', difficulty: 'standard',
          question: 'Human development is a qualitative, value-positive process of enlarging.',
          hint: 'Revisit c11_geo_cbse_16_003 (Population Composition) — specifically the definitions of.',
          misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.',
          parts: [
                { id: 'a', prompt: 'A city\'s GDP per capita doubles over ten years, but its infant mortality rate remains unchanged and female literacy drops.', answer: 'GDP doubling is quantitative growth (value-neutral)',
                  options: ['Correct answer: GDP doubling is quantitative growth (value-neutral)', 'GDP isn\'t everything', 'not development'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.' }
          ],
            remediations: { 'students-equate-human-development-with': { steps: ['Re-read the NCERT paragraph starting "The concept of human development was introduced by Dr Mahbub-ul-Haq" — highlight.', 'Write three sentences using only those verbs describing your own life (e.g., "I am free to choose science stream").', 'Map each sentence to health/education/resources.', 'Attempt Diagnostic Question 2 again. If still stuck, revisit c11_geo_cbse_16_003 (Population Composition: literacy,.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.',
          parts: [
                { id: 'a', prompt: 'Design a 3-minute classroom activity for Class 12 students to experience how "lack of capability limits choice" — the core Mahbub ul Haq insight.', answer: 'Activity: "The Unread Notice." Distribute a handout with a fictional government',
                  options: ['Activity: "The Unread Notice." Distribute a handout with a fictional government', 'simulate poverty by skipping lunch'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "human development" with "human development index (HDI)" — they think the *concept* is the *measure*.' }
          ],
            remediations: { 'students-equate-human-development-with': { steps: ['Re-read the NCERT paragraph starting "The concept of human development was introduced by Dr Mahbub-ul-Haq" — highlight.', 'Write three sentences using only those verbs describing your own life (e.g., "I am free to choose science stream").', 'Map each sentence to health/education/resources.', 'Attempt Diagnostic Question 2 again. If still stuck, revisit c11_geo_cbse_16_003 (Population Composition: literacy,.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_002', difficulty: 'standard',
          question: 'Human development is a qualitative, value-positive process of enlarging.',
          hint: 'Revisit Class 10 Economics Chapter 1 (Development) and Class 11 Geography node.',
          misconception: 'Students equate "economic development" with "human development" and believe higher GDP per capita automatically means.',
          parts: [
                { id: 'a', prompt: 'Analyse the following statement: "Kerala has lower per capita income than Gujarat but higher HDI rank.', answer: 'The flaw is treating the relationship as binary',
                  options: ['The flaw is treating the relationship as binary', 'not the only factor', 'not a factor at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "economic development" with "human development" and believe higher GDP per capita automatically means better human.' }
          ],
            remediations: { 'students-equate-economic-development-with': { steps: ['Re-read the NCERT paragraph "Growth and Development" and create a two-column table: Growth (quantitative,.', 'Watch the 5-minute video "GDP vs HDI: The Kerala-Gujarat Comparison" (search on DIKSHA).', 'Take the "Growth vs Development" self-check quiz on the CBSE Geography practice portal.', 'If confusion persists, revisit Class 10 Economics node c10_geo_cbse_04_001 (Agriculture\'s role in economy) to see how.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "economic development" with "human development" and believe higher GDP per capita automatically means.',
          parts: [
                { id: 'a', prompt: 'Analyse the following statement: "Kerala has lower per capita income than Gujarat but higher HDI rank.', answer: 'The flaw is treating the relationship as binary',
                  options: ['The flaw is treating the relationship as binary', 'not the only factor', 'not a factor at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "economic development" with "human development" and believe higher GDP per capita automatically means better human.' }
          ],
            remediations: { 'students-equate-economic-development-with': { steps: ['Re-read the NCERT paragraph "Growth and Development" and create a two-column table: Growth (quantitative,.', 'Watch the 5-minute video "GDP vs HDI: The Kerala-Gujarat Comparison" (search on DIKSHA).', 'Take the "Growth vs Development" self-check quiz on the CBSE Geography practice portal.', 'If confusion persists, revisit Class 10 Economics node c10_geo_cbse_04_001 (Agriculture\'s role in economy) to see how.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_003', difficulty: 'standard',
          question: 'The four pillars of human development—equity, sustainability, productivity, and.',
          hint: 'Revisit c12_geo_cbse_03_001 (concept of human development) and c12_geo_cbse_03_002.',
          misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).',
          parts: [
                { id: 'a', prompt: 'Explain why sustainability is described as \'continuity in the availability of opportunities\' rather than just environmental conservation.', answer: 'Sustainability in human development means each generation must have the same',
                  options: ['Sustainability in human development means each generation must have the same', 'planting trees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).' },
                { id: 'b', prompt: 'Compare Kerala and Gujarat on the empowerment pillar. Both have similar per capita incomes, but Kerala has higher female literacy and political participation.', answer: 'Empowerment comes from increasing freedom and capability, not just income',
                  options: ['Empowerment comes from increasing freedom and capability, not just income', 'higher income always leads to empowerment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).' }
          ],
            remediations: { 'students-conflate-the-four-pillars': { steps: ['Re-read the NCERT section "The Four Pillars of Human Development" (page 16-17) and create a 2x2 table: Pillar | NCERT.', 'For each pillar, write one sentence explaining how it differs from the closest HDI dimension.', 'Take the diagnostic questions 1-4 again.', 'If confusion persists, watch the 10-minute video "Human Development Pillars Explained" by NCERT Official on YouTube and.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).',
          parts: [
                { id: 'a', prompt: 'Compare Kerala and Gujarat on the empowerment pillar. Both have similar per capita incomes, but Kerala has higher female literacy and political participation.', answer: 'Empowerment comes from increasing freedom and capability, not just income',
                  options: ['Empowerment comes from increasing freedom and capability, not just income', 'higher income always leads to empowerment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate the four pillars with the three HDI dimensions (health, education, income).' }
          ],
            remediations: { 'students-conflate-the-four-pillars': { steps: ['Re-read the NCERT section "The Four Pillars of Human Development" (page 16-17) and create a 2x2 table: Pillar | NCERT.', 'For each pillar, write one sentence explaining how it differs from the closest HDI dimension.', 'Take the diagnostic questions 1-4 again.', 'If confusion persists, watch the 10-minute video "Human Development Pillars Explained" by NCERT Official on YouTube and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
