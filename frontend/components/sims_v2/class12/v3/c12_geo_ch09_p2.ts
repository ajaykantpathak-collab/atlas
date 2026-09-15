import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch09_p2: SimDef = {
    id: 'v3_c12_geo_ch09_p2',
    title: 'Population: Distribution, Density, Growth · Part 2/2',
    subtitle: 'The biggest state isn\'t the most crowded — the map\'s favourite trap',
    classLevel: 12, subject: 'geography', topic: 'Population: Distribution, Density, Growth · Part 2/2',
    chapters: ['c12_geo_ch09'],
    nodeIds: ['c12_geo_cbse_09_007', 'c12_geo_cbse_09_008', 'c12_geo_cbse_09_009', 'c12_geo_cbse_09_010', 'c12_geo_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Population analyst', intro: 'One in six Indians lives in UP. One in nine hundred in Arunachal. The map of where we live is a story of rivers, canals and mines.', goal: 'Explain India\'s population distribution — its physical template and socio-economic rewrites — and separate distribution from density.' },
    discovery: {
        question: 'UP holds 16.5% of India\'s people — but on density it trails Bihar, West Bengal and Kerala. How can the \'most populated\' state not be the most crowded?',
        options: ['Distribution ≠ density — UP\'s share is absolute numbers over area; density is the ratio, and smaller states can pack tighter', 'Data error', 'UP is actually densest', 'Area cancels out'],
        answer: 'Distribution ≠ density — UP\'s share is absolute numbers over area; density is the ratio, and smaller states can pack tighter',
        hook: 'India\'s dark patches sit on alluvium and water — the Indo-Gangetic template — but human intervention redrafts the map: the Indira Gandhi Canal lights up the Thar, Jharkhand\'s minerals pull workers to rock. Physical factors set the board; history and development move the pieces.',
    },
    teaching: [
        { title: 'Population Composition: Literacy and Occupational Structure', text: 'Population composition by literacy refers to the proportion of literate individuals (aged 7 and above who can read and write with understanding in any language) in the total population aged 7+, while.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read India\'s population map like a demographer: explain why four states carry ~42% of the nation, why Rajasthan\'s clusters are \'induced\' while Kerala\'s are natural, and when socio-economics overrules terrain.',
        labels: ['Population Composition: Literacy', 'Rural-Urban Population in India', 'Migration in India: Types', 'National Population Policy (2000)', 'Population-Resource Relationship and Sustainable'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_007', title: 'Population Composition: Literacy and Occupational Structure',
          scaffold: { problem: 'Using Census 2011 data, State A has total population 8 crore (male 4.2 crore, female 3.8 crore).',
            steps: [
            { text: 'Identify the formula for literacy rate (literate pop 7+ / total pop 7+ × 100).' },
            { text: 'Compute male literacy rate for State A: (3.15 / 4.2) × 100 = 75.0%.' },
            { text: 'Compute female literacy rate for State A: (2.28 / 3.8) × 100 = 60.0%.' },
            { text: 'Gender gap State A = 75.0 – 60.0 = 15.0 pp.' },
            { text: 'Compute male literacy rate for State B: (4.88 / 6.1) × 100 = 80.0%.' },
            { text: 'Compute female literacy rate for State B: (3.54 / 5.9) × 100 = 60.0%.' },
            { text: 'Gender gap State B = 80.0 – 60.0 = 20.0 pp.' },
            { text: 'Compare: State B has higher gender disparity by 5.0 percentage points.', faded: true, blankAnswer: 'State A: Male 75.0%, Female 60.0%, Gap 15.0 pp. State.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_008', title: 'Rural-Urban Population in India: Trends and Patterns',
          scaffold: { problem: 'Census 2001: India\'s urban population = 286.1 million, rural = 742.5 million. Census 2011: urban = 377.1 million, rural = 833.5 million.',
            steps: [
            { text: 'Compute urban decadal growth rate 2001–11 = (377.1 - 286.1) / 286.1 × 100 = 91.0 / 286.1 × 100 = 31.81%.' },
            { text: 'Compute rural decadal growth rate 2001–11 = (833.5 - 742.5) / 742.5 × 100 = 91.0 / 742.5 × 100 = 12.26%.' },
            { text: 'URGD = 31.81 - 12.26 = 19.55 pp (≈19.6 pp).' },
            { text: 'Compare with 1991–2001 URGD (17.2 pp): URGD increased by 2.35 pp, indicating acceleration of urbanization despite.' },
            { text: 'Interpret: The rise in URGD is driven by census town proliferation (reclassification) and migration to non-metro urban.', faded: true, blankAnswer: 'URGD = 19.6 pp (2001–11), up from 17.2 pp (1991–2001).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_009', title: 'Migration in India: Types (Internal and International)',
          scaffold: { problem: 'According to Census 2011, Uttar Pradesh had 15.4 million out-migrants (place of last residence) to other states, and received 3.2 million.',
            steps: [
            { text: 'Identify the formula: Net Migration Rate = [(In-migrants - Out-migrants) / Mid-year Population] × 1000.' },
            { text: 'Plug in values: In-migrants = 3.2 million, Out-migrants = 15.4 million, Mid-year Population = 200 million.' },
            { text: 'Calculate net migrants = 3.2 - 15.4 = -12.2 million (negative = net out-migration).' },
            { text: 'Divide by mid-year population: -12.2 / 200 = -0.061.' },
            { text: 'Multiply by 1000: -0.061 × 1000 = -61 per 1000.' },
            { text: 'Interpret: UP loses 61 persons per 1000 population annually to other states — a significant demographic drain.', faded: true, blankAnswer: 'Net inter-state migration rate for UP = -61 per 1000.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_09_010', title: 'National Population Policy (2000): Objectives and Strategies',
          caseStudy: { intro: 'Start by showing a Class 12 student a newspaper headline: "India\'s TFR falls below replacement level — but Uttar Pradesh and Bihar still above 3.0." Ask: "If.',
            decisions: [{ prompt: 'What are the three time-bound objectives of the National Population Policy (2000) in correct chronological order?', options: [
                { text: 'Correct answer: Immediate objective (address unmet contraceptive needs, healthcare', outcome: 'Correct answer: Immediate objective (address unmet contraceptive needs, healthcare infrastructure.' },
                { text: 'NPP 2000 set sterilization targets for states', outcome: 'Not quite — Students confuse NPP 2000 with the 1976 policy\'s coercive sterilization targets, writing "NPP 2000.', reveals: 'students-confuse-npp-2000-with' },
                { text: 'reverses the order (e', outcome: 'Not quite — Students confuse NPP 2000 with the 1976 policy\'s coercive sterilization targets, writing "NPP 2000.', reveals: 'students-confuse-npp-2000-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_011', title: 'Population-Resource Relationship and Sustainable Development',
          scaffold: { problem: 'Using Census 2011 data, State X has: Total population = 72.6 million, Net sown area = 18.5 million hectares, Net cultivable area = 22.1.',
            steps: [
            { text: 'Crude density = 72,600,000 / 307,000 = 236.5 persons/km².' },
            { text: 'Physiological density = 72,600,000 / 18,500 = 3,924 persons/km² of net sown area.' },
            { text: 'Agricultural density = 18,700,000 / 22,100 = 846 persons/km² of net cultivable area.' },
            { text: 'Compare: Crude density (236) is moderate (near India average 382), but physiological density (3924) is very high — each.' },
            { text: 'Physiological density best reflects current food production pressure because it uses land *currently in cultivation*.', faded: true, blankAnswer: 'Crude density = 236.5 persons/km²; Physiological density.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s infographic on Indian population density declares Uttar Pradesh \'the most crowded state because it has India\'s biggest population\', and uses five equal-width colour classes from 17 to 11,297 persons per sq km — leaving almost every state the same colour.',
            decisions: [{ prompt: 'What corrections does this chapter demand?', options: [
                { text: 'Two fixes — density is persons per unit area, not total population, so Bihar, West Bengal and Kerala outrank UP and Delhi (11,297) dwarfs all states; and an outlier like Delhi needs its own class or inset, or equal intervals flatten every real difference.', outcome: 'The chapter separates arithmetic density from population size and warns that classification schemes decide whether a map informs or misleads — an extreme value can\'t share a linear scale.' },
                { text: 'Keep it — biggest population does mean most crowded; density is just population restated.', outcome: 'That\'s the exact misconception the chapter names: UP\'s 828/km² sits below Bihar\'s 1,102 and far below Delhi; size and crowding measure different things.', reveals: 'size-equals-crowding' },
                { text: 'Report physiological density instead so farmland pressure is captured accurately for every state.', outcome: 'Physiological density answers a different question — pressure on cultivated land — and needs net-cultivated-area data the map doesn\'t have; the fix for this graphic is better classes and outlier handling, not a different indicator.', reveals: 'physiological-fixes-mapping' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue India\'s population pattern with both physical and human causes — and never confuse share with density again.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_007', difficulty: 'standard',
          question: 'Population composition by literacy refers to the proportion of literate.',
          hint: 'If stuck on literacy rate calculation, revisit the Census definition of \'literate\' and.',
          misconception: 'Students often think \'literacy rate\' is calculated on total population (including children 0–6), but Census uses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Population composition by literacy refers to the proportion of literate individuals (aged',
                  options: ['Population composition by literacy refers to the proportion of literate individuals (aged', 'Population distribution refers to the spatial pattern of where people live across a', 'Population density is the number of persons living per unit area (usually per square', 'Factors affecting population distribution in India refer to the physical (climate,'],
                  hint: 'If stuck on literacy rate calculation, revisit the Census definition of \'literate\' and practice.',
                  misconception: 'Students often think \'literacy rate\' is calculated on total population (including children 0–6), but Census uses population aged 7+.' }
          ],
            remediations: { 'literacy-rate-is-calculated-on': { steps: ['Re-read the Census definition boxes in NCERT (Standard Census Definition for Main/Marginal Worker and Literacy).', 'Create a table contrasting the three rates: Literacy Rate (base: pop 7+), Work Participation Rate (base: total pop).', 'Practice calculating each from a sample dataset (e.g., village data from Census PCA).', 'Re-attempt Diagnostic Questions 1 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_008', difficulty: 'standard',
          question: 'Rural-urban composition refers to the distribution of a country\'s population.',
          hint: 'If unsure about census town criteria or growth rate formula, review c11_geo_cbse_16_004.',
          misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural-urban composition refers to the distribution of a country\'s population between',
                  options: ['Rural-urban composition refers to the distribution of a country\'s population between', 'Population distribution refers to the spatial pattern of where people live across a', 'Population density is the number of persons living per unit area (usually per square', 'Factors affecting population distribution in India refer to the physical (climate,'],
                  hint: 'If unsure about census town criteria or growth rate formula, review c11_geo_cbse_16_004.',
                  misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).' }
          ],
            remediations: { 'urbanization-means-only-migration-to': { steps: ['Revisit c11_geo_cbse_17_004 (Urbanisation in India: Trends, Causes and Problems) — focus on the distinction between.', 'Download Census 2011 PCA for your state; identify 5 census towns and verify the three criteria.', 'Plot a scatter diagram: x-axis = % urban (2001), y-axis = urban growth rate (2001–11) for all states; observe the.', 'Re-attempt Diagnostic Question 4 with this visual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s urbanization is \'exclusionary\' because census towns grow without municipal governance, denying residents basic services." Use.', answer: 'Valid evaluation: 2011 Census added 2,774 new census towns (vs',
                  options: ['Valid evaluation: 2011 Census added 2,774 new census towns (vs', 'urbanization', '"urbanization" means only migration to big cities (Mumbai, Delhi)'],
                  hint: 'If unsure about census town criteria or growth rate formula, review c11_geo_cbse_16_004.',
                  misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).' },
                { id: 'b', prompt: 'Design a two-indicator map (choropleth + proportional symbols) to show state-level urbanization level and urban growth rate (2001–2011).', answer: 'Choropleth: % urban population (2011)',
                  options: ['Choropleth: % urban population (2011)', 'urbanization', '"urbanization" means only migration to big cities (Mumbai, Delhi)'],
                  hint: 'If unsure about census town criteria or growth rate formula, review c11_geo_cbse_16_004.',
                  misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).' }
          ],
            remediations: { 'urbanization-means-only-migration-to': { steps: ['Revisit c11_geo_cbse_17_004 (Urbanisation in India: Trends, Causes and Problems) — focus on the distinction between.', 'Download Census 2011 PCA for your state; identify 5 census towns and verify the three criteria.', 'Plot a scatter diagram: x-axis = % urban (2001), y-axis = urban growth rate (2001–11) for all states; observe the.', 'Re-attempt Diagnostic Question 4 with this visual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_009', difficulty: 'standard',
          question: 'Migration in India refers to the permanent or semi-permanent change.',
          hint: 'If confused about stream classification, draw a 2×2 matrix (Origin: Rural/Urban.',
          misconception: 'Students think "migration" only means permanent, one-way moves from village to city (Rural-Urban), and equate.',
          parts: [
                { id: 'a', prompt: 'Compare the dominant push factors for international emigration from Kerala (to Gulf countries) versus international immigration into India (from Bangladesh).', answer: 'Kerala→Gulf: Push = high educated unemployment, limited local industrial jobs',
                  options: ['Kerala→Gulf: Push = high educated unemployment, limited local industrial jobs', 'economic migration', 'migration', 'inter-state migration'],
                  hint: 'If confused about stream classification, draw a 2×2 matrix (Origin: Rural/Urban × Destination.',
                  misconception: 'Students think "migration" only means permanent, one-way moves from village to city (Rural-Urban), and equate "inter-state migration" with.' }
          ],
            remediations: { 'migration-only-means-permanent': { steps: ['Revisit c12_geo_cbse_09_008 (Rural-Urban Population) — review the rural-urban migration link to urbanisation.', 'Open Census 2011 Migration Tables (D-series) for your state — locate the 4-stream matrix (R-R, R-U, U-R, U-U) for.', 'Create a 2×2 table on paper: rows = origin (R/U), columns = destination (R/U); fill with your state\'s numbers.', 'Identify which cell is largest — if Rural-Rural, ask "Why? Marriage? Agriculture?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_010', difficulty: 'standard',
          question: 'The National Population Policy (NPP) 2000 is a comprehensive policy framework.',
          hint: 'Revisit c11_geo_cbse_16_006 (demographic transition stages) and c11_geo_cbse_16_003.',
          misconception: 'Students confuse NPP 2000 with the 1976 policy\'s coercive sterilization targets, writing "NPP 2000 set sterilization.',
          parts: [
                { id: 'a', prompt: 'Using the formula for Total Fertility Rate (TFR = Σ age-specific fertility rates × 5), calculate the approximate TFR for a hypothetical state where.', answer: 'Step 1: Convert rates per 1000 to per woman: divide each by 1000',
                  options: ['Step 1: Convert rates per 1000 to per woman: divide each by 1000', 'NPP 2000 set sterilization targets for states'],
                  hint: 'Revisit c11_geo_cbse_16_006 (demographic transition stages) and c11_geo_cbse_16_003 (population.',
                  misconception: 'Students confuse NPP 2000 with the 1976 policy\'s coercive sterilization targets, writing "NPP 2000 set sterilization targets for states.".' },
                { id: 'b', prompt: 'Compare Kerala (TFR 1.6, 2011) and Bihar (TFR 3.4, 2011) — both implemented NPP 2000.', answer: 'Correct analysis: (1) Female literacy',
                  options: ['Correct analysis: (1) Female literacy', 'poverty', 'culture', 'NPP 2000 set sterilization targets for states'],
                  hint: 'Revisit c11_geo_cbse_16_006 (demographic transition stages) and c11_geo_cbse_16_003 (population.',
                  misconception: 'Students confuse NPP 2000 with the 1976 policy\'s coercive sterilization targets, writing "NPP 2000 set sterilization targets for states.".' }
          ],
            remediations: { 'students-confuse-npp-2000-with': { steps: ['Revisit c11_geo_cbse_16_007 (Class 11 NPP 2000 node) — create a two-column table: 1976 Policy (targets.', 'Read NFHS-4/5 fact sheets for any two high-TFR states — note the \'unmet need for spacing\' vs \'unmet need for limiting\'.', 'Re-attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_4 with the table and NFHS data.', 'If still stuck, watch the 10-min NCERT official video "National Population Policy 2000" on YouTube (channel: NCERT.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_011', difficulty: 'standard',
          question: 'Population-resource relationship examines how population size, distribution.',
          hint: 'Revisit c12_geo_cbse_09_002 (Density of Population) and practice calculating.',
          misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297.',
          parts: [
                { id: 'a', prompt: 'Define physiological density and agricultural density. How do they differ from crude (arithmetic) density in assessing population pressure on land resources?', answer: 'Physiological density = Total population / Net cultivated area',
                  options: ['Physiological density = Total population / Net cultivated area', 'cultivated', 'cultivable'],
                  hint: 'Revisit c12_geo_cbse_09_002 (Density of Population) and practice calculating.',
                  misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297 persons/km²).' },
                { id: 'b', prompt: 'Compare the occupational structure of India in 2001 (58.2% primary) and 2011 (54.6% primary).', answer: 'The primary sector\'s *share* fell',
                  options: ['The primary sector\'s *share* fell', 'fewer farmers now'],
                  hint: 'Revisit c12_geo_cbse_09_002 (Density of Population) and practice calculating.',
                  misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297 persons/km²).' }
          ],
            remediations: { 'students-equate-high-population-density': { steps: ['If the student persists in equating density with unsustainability: (1) Have them calculate per-capita ecological.', 'a tribal district using proxy data (electricity use, vehicle ownership, diet).', '(2) Map the source regions of Delhi\'s water (Tehri Dam, Yamuna) and food (Punjab, Haryana) to show telecoupling.', '(3) Revisit c11_geo_cbse_16_006 (Demographic Transition Theory) to see how Kerala achieved low growth *with* high.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
