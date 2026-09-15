import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch10_p2: SimDef = {
    id: 'v3_c12_geo_ch10_p2',
    title: 'Human Settlements in India · Part 2/2',
    subtitle: 'Same village count, three shapes — the map of who gets water',
    classLevel: 12, subject: 'geography', topic: 'Human Settlements in India · Part 2/2',
    chapters: ['c12_geo_ch10'],
    nodeIds: ['c12_geo_cbse_10_007', 'c12_geo_cbse_10_008', 'c12_geo_cbse_10_009', 'c12_geo_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Settlement geographer', intro: 'Why does one village huddle and another scatter? The answer is written in terrain, water and caste.', goal: 'Classify rural settlement patterns and connect their forms to terrain, resources and social structure.' },
    discovery: {
        question: 'A village in the Ganga plain is one tight rectangle of homes; a Nagaland hillside holds scattered lone huts; a Thar cluster spreads thin around wells. Same country — three architectures. Why?',
        options: ['Form follows resource logic — fertile flat plains cluster for security and land efficiency; fragmented slopes and scarce water force dispersion', 'Random chance', 'Government design', 'Climate alone'],
        answer: 'Form follows resource logic — fertile flat plains cluster for security and land efficiency; fragmented slopes and scarce water force dispersion',
        hook: '\'Broken\' villages aren\'t all alike: semi-clustered means one village segregated by caste — dominant centre, marginal flanks; hamleted means a large village split into named units (panna, para, dhani). Same scattered look, different social machinery. And single-function towns can\'t stay single — metropolises always go multifunctional.',
    },
    teaching: [
        { title: 'Million-Plus Cities in India: Distribution and Growth', text: 'Million-plus cities (or metropolitan cities) are urban agglomerations with a population of one million (10 lakh) or more as per the Census of India.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_10_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Read settlement morphology like a field scientist: classify clustered, semi-clustered, hamleted and dispersed patterns, then trace how a mining town\'s fate proves why functions must multiply.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_10_007', title: 'Million-Plus Cities in India: Distribution and Growth',
          scaffold: { problem: 'Census 2011 shows Urban Agglomeration populations: Lucknow UA = 29.0 lakh (2001: 22.5 lakh), Kanpur UA = 29.2 lakh (2001: 27.2 lakh).',
            steps: [
            { text: 'Identify formula: Growth Rate = [(Pop_2011 - Pop_2001) / Pop_2001] × 100' },
            { text: 'Lucknow growth = (29.0 - 22.5) = 6.5 lakh; Rate = (6.5 / 22.5) × 100 = 28.9%' },
            { text: 'Kanpur growth = (29.2 - 27.2) = 2.0 lakh; Rate = (2.0 / 27.2) × 100 = 7.4%' },
            { text: 'Lucknow grew faster (28.9% vs 7.4%). Both are in UP Ganga plain, but Lucknow is state capital (administrative + service.' },
            { text: 'Verify: National urban growth 31.8% — Lucknow near average, Kanpur far below, indicating deindustrialization.', faded: true, blankAnswer: 'Lucknow 28.9%, Kanpur 7.4%. Lucknow grew faster due.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_008', title: 'Problems of Urban Settlements: Slums, Congestion, Infrastructure',
          caseStudy: { intro: 'Begin by observing a busy Indian city like Mumbai or Delhi: notice the juxtaposition of high-rise buildings and sprawling slums, traffic jams on narrow roads.',
            decisions: [{ prompt: 'According to Census 2011, what percentage of India\'s urban population lived in slums, and which state had the highest slum population?', options: [
                { text: 'As per Census 2011, 17.4% of India\'s urban population lived in slums', outcome: 'As per Census 2011, 17.4% of India\'s urban population lived in slums.' },
                { text: 'rural-urban migration', outcome: 'Not quite — Students often think slums are purely a result of "rural-urban migration" and that stopping.', reveals: 'slums-are-purely-a-result' },
                { text: 'congestion', outcome: 'Not quite — Students often think slums are purely a result of "rural-urban migration" and that stopping.', reveals: 'slums-are-purely-a-result' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_009', title: 'Problems of Rural Settlements: Infrastructure and Services',
          caseStudy: { intro: 'Imagine visiting a village in interior Odisha where the nearest primary health centre is 15 km away on a muddy track, electricity runs 6 hours daily, and the.',
            decisions: [{ prompt: 'What is the Census of India definition of a village, and which two infrastructure amenities are used as key indicators of rural development.', options: [
                { text: 'A village is a statutory revenue unit with defined boundaries', outcome: 'A village is a statutory revenue unit with defined boundaries; key infrastructure indicators in the.' },
                { text: 'lack of funds', outcome: 'Not quite — Students often think rural infrastructure problems are only about "lack of funds" and that building.', reveals: 'rural-infrastructure-problems-are-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_010', title: 'Urban Planning and Smart Cities Mission in India',
          caseStudy: { intro: 'Observe your nearest city: traffic choking at a junction, water supply for 2 hours/day, garbage piled at a corner, no footpaths — these are "urban stresses".',
            decisions: [{ prompt: 'Name the two distinct development models under the Smart Cities Mission and state the minimum area requirement for Area-Based Development.', options: [
                { text: 'Correct: (1) Area-Based Development (ABD)', outcome: 'Correct: (1) Area-Based Development (ABD) — retrofitting (≥50 acres), redevelopment (≥50 acres),.' },
                { text: 'ABD requires 100 acres', outcome: 'Not quite — Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s.', reveals: 'smart-city-it-city-high' },
                { text: 'only one model exists', outcome: 'Not quite — Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s.', reveals: 'smart-city-it-city-high' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field survey in the lower Himalayan valleys, your team finds a revenue village made of five small hut-clusters 200–500 m apart across terraces, each with its own name. A teammate writes in the report: \'no real village here — just scattered isolated houses.\'',
            decisions: [{ prompt: 'How should the settlement actually be classified?', options: [
                { text: 'Hamleted — physically separate, separately named units that still share one village identity and administration; such units are locally called panna, para, palli, nagla, dhani or tola in different regions, so the fragmentation isn\'t absence of a settlement.', outcome: 'The chapter\'s distinction is precise: hamleted villages break into named sub-units but keep common revenue identity, while truly dispersed settlement lacks nucleation altogether — the teammate conflated the two.' },
                { text: 'Dispersed — five separated clusters on terraces fits \'scattered huts\' by definition.', outcome: 'Dispersed means isolated dwellings without shared nucleation — Kerala homesteads or Meghalaya jhum clearings; named clusters under one village administration is the signature of hamleted, not dispersed.', reveals: 'separation-equals-dispersal' },
                { text: 'Clustered — since people still group into huts rather than living alone, the core pattern is nucleation.', outcome: 'Clustered means one compact nucleus; five distinct named groups separated by cultivated terraces is precisely the in-between form the hamleted category exists to describe.', reveals: 'any-grouping-is-clustered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'You can now read a village\'s shape as a record of its land, water and social order — settlement form is geography made visible.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_007', difficulty: 'standard',
          question: 'Million-plus cities (or metropolitan cities) are urban agglomerations with.',
          hint: 'If confused between city and UA, revisit Census 2011 definition in c12_geo_cbse_10_004.',
          misconception: 'Students think "million-plus city" means the municipal corporation area has ≥10 lakh people.',
          parts: [
                { id: 'a', prompt: 'Using the data below (hypothetical but realistic), calculate the decadal growth rate (2001-2011) for City X and determine if its growth exceeds the national.', answer: 'Step 1: Growth = 18.7 - 12.5 = 6.2 lakh',
                  options: ['Step 1: Growth = 18.7 - 12.5 = 6.2 lakh', 'million-plus city', 'megacity', '"million-plus city" means the municipal corporation area has ≥10 lakh people'],
                  hint: 'If confused between city and UA, revisit Census 2011 definition in c12_geo_cbse_10_004 and practice.',
                  misconception: 'Students think "million-plus city" means the municipal corporation area has ≥10 lakh people.' }
          ],
            remediations: { 'million-plus-city-means-the': { steps: ['Revisit c11_geo_cbse_17_005 (Metropolitan Cities and Million-Plus Cities in India) to clarify UA vs municipal boundary.', 'On a printed outline map, mark the 53 million-plus UAs from Census 2011 list (NCERT Appendix).', 'Compute growth rates for 5 cities using Table 2.1 (this chapter) and verify against national urban growth.', 'Re-attempt Diagnostic Question 3 with a new city data set.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "million-plus city" means the municipal corporation area has ≥10 lakh people.',
          parts: [
                { id: 'a', prompt: '"Million-plus cities in India are engines of economic growth but also magnets for unsustainable resource consumption." Evaluate this statement using two.', answer: 'Example 1: Bengaluru (IT hub)',
                  options: ['Example 1: Bengaluru (IT hub)', 'pollution increases', 'million-plus city', 'megacity'],
                  hint: 'If confused between city and UA, revisit Census 2011 definition in c12_geo_cbse_10_004 and practice.',
                  misconception: 'Students think "million-plus city" means the municipal corporation area has ≥10 lakh people.' },
                { id: 'b', prompt: 'Design a choropleth map legend (4 classes) to show the state-wise number of million-plus cities from Census 2011.', answer: 'Data range: 0 to 7 (Uttar Pradesh has 7)',
                  options: ['Data range: 0 to 7 (Uttar Pradesh has 7)', 'million-plus city', 'megacity', '"million-plus city" means the municipal corporation area has ≥10 lakh people'],
                  hint: 'If confused between city and UA, revisit Census 2011 definition in c12_geo_cbse_10_004 and practice.',
                  misconception: 'Students think "million-plus city" means the municipal corporation area has ≥10 lakh people.' }
          ],
            remediations: { 'million-plus-city-means-the': { steps: ['Revisit c11_geo_cbse_17_005 (Metropolitan Cities and Million-Plus Cities in India) to clarify UA vs municipal boundary.', 'On a printed outline map, mark the 53 million-plus UAs from Census 2011 list (NCERT Appendix).', 'Compute growth rates for 5 cities using Table 2.1 (this chapter) and verify against national urban growth.', 'Re-attempt Diagnostic Question 3 with a new city data set.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_008', difficulty: 'standard',
          question: 'Urban settlement problems refer to the adverse conditions arising from rapid.',
          hint: 'If stuck, revisit c12_geo_cbse_10_005 (Urbanisation trends) and c12_geo_cbse_10_007.',
          misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the.',
          parts: [
                { id: 'a', prompt: 'According to Census 2011, what percentage of India\'s urban population lived in slums, and which state had the highest slum population?', answer: 'As per Census 2011, 17.4% of India\'s urban population lived in slums',
                  options: ['As per Census 2011, 17.4% of India\'s urban population lived in slums', 'rural-urban migration', 'congestion'],
                  hint: 'If stuck, revisit c12_geo_cbse_10_005 (Urbanisation trends) and c12_geo_cbse_10_007 (Million-plus.',
                  misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the problem.' },
                { id: 'b', prompt: 'Explain why slums tend to develop on ecologically fragile lands (e.g., floodplains, steep slopes) in Indian cities, and how this increases vulnerability.', answer: 'Slums develop on ecologically fragile lands',
                  options: ['Slums develop on ecologically fragile lands', 'poor planning', 'rural-urban migration', 'congestion'],
                  hint: 'If stuck, revisit c12_geo_cbse_10_005 (Urbanisation trends) and c12_geo_cbse_10_007 (Million-plus.',
                  misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the problem.' },
                { id: 'c', prompt: 'Calculate the approximate population density of a slum cluster in Mumbai (Dharavi) given: area = 2.1 sq km, population = 850,000.', answer: 'Step 1: Density = Population / Area = 850,000 / 2.1 = 404,762 persons/sq km',
                  options: ['Step 1: Density = Population / Area = 850,000 / 2.1 = 404,762 persons/sq km', 'rural-urban migration', 'congestion'],
                  hint: 'If stuck, revisit c12_geo_cbse_10_005 (Urbanisation trends) and c12_geo_cbse_10_007 (Million-plus.',
                  misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the problem.' }
          ],
            remediations: { 'slums-are-purely-a-result': { steps: ['If the student holds the migration-only misconception, have them: (1) Revisit c11_geo_cbse_16_004 (Rural-Urban.', '(2) Analyze Census 2011 slum data: compare slum growth rate vs urban growth rate.', '(3) Map a city\'s slum locations (using Bhuvan or OpenStreetMap) and note their proximity to employment centers, not.', '(4) Re-attempt Diagnostic Question 2 with this evidence.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_009', difficulty: 'standard',
          question: 'Problems of rural settlements in India refer to the persistent deficits.',
          hint: 'If stuck, re-read NCERT Class 11 Ch.10 "Human Settlements" section "Problems of Rural.',
          misconception: 'Students often think rural infrastructure problems are only about "lack of funds" and that building more roads/schools.',
          parts: [
                { id: 'a', prompt: 'What is the Census of India definition of a village, and which two infrastructure amenities are used as key indicators of rural development in the Census.', answer: 'A village is a statutory revenue unit with defined boundaries',
                  options: ['A village is a statutory revenue unit with defined boundaries', 'lack of funds'],
                  hint: 'If stuck, re-read NCERT Class 11 Ch.10 "Human Settlements" section "Problems of Rural Settlements".',
                  misconception: 'Students often think rural infrastructure problems are only about "lack of funds" and that building more roads/schools automatically solves.' },
                { id: 'b', prompt: 'Using the data below from a hypothetical Census village directory, calculate the percentage of villages lacking all-weather road connectivity and interpret.', answer: 'Step 1: Villages without all-weather road = 850 - 510 = 340',
                  options: ['Step 1: Villages without all-weather road = 850 - 510 = 340', 'lack of funds'],
                  hint: 'If stuck, re-read NCERT Class 11 Ch.10 "Human Settlements" section "Problems of Rural Settlements".',
                  misconception: 'Students often think rural infrastructure problems are only about "lack of funds" and that building more roads/schools automatically solves.' }
          ],
            remediations: { 'rural-infrastructure-problems-are-only': { steps: ['Revisit c11_geo_cbse_17_007 (Class 11 rural problems) and list the 5 infrastructure categories mentioned there.', 'Open Census 2011 Village Directory for your district; pick 10 villages and tabulate which have: all-weather road, tap.', 'Plot these villages on a toposheet (skills from c11_geo_cbse_24_006) and observe pattern: are connected villages.', 'Re-attempt Diagnostic Question 4 with this real data.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_010', difficulty: 'standard',
          question: 'The Smart Cities Mission (launched 2015) is a Government of India urban renewal.',
          hint: 'If stuck on SPV structure or funding flow, revisit c11_ps_cbse_17_006 (74th Amendment).',
          misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.',
          parts: [
                { id: 'a', prompt: 'Name the two distinct development models under the Smart Cities Mission and state the minimum area requirement for Area-Based Development (ABD) as per Mission.', answer: 'Correct: (1) Area-Based Development (ABD)',
                  options: ['Correct: (1) Area-Based Development (ABD)', 'ABD requires 100 acres', 'only one model exists', 'Smart City = IT city / high-tech city'],
                  hint: 'If stuck on SPV structure or funding flow, revisit c11_ps_cbse_17_006 (74th Amendment) and.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' },
                { id: 'b', prompt: 'Explain why the Smart Cities Mission uses a "Challenge Method" (competitive selection) instead of formula-based allocation like AMRUT.', answer: 'Correct: Challenge Method ensures cities compete on proposal quality (vision,',
                  options: ['Correct: Challenge Method ensures cities compete on proposal quality (vision,', 'to save money', 'because some cities are smarter', 'Smart City = IT city / high-tech city'],
                  hint: 'If stuck on SPV structure or funding flow, revisit c11_ps_cbse_17_006 (74th Amendment) and.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' },
                { id: 'c', prompt: 'A city\'s Smart City Proposal allocates ₹2,000 crore: 60% for ABD (retrofitting 120 acres), 20% for Pan-City (Integrated Command Control Centre), 10% for O&M.', answer: 'Step 1: ABD allocation = 60% of ₹2,000 cr = ₹1,200 cr',
                  options: ['Step 1: ABD allocation = 60% of ₹2,000 cr = ₹1,200 cr', 'Smart City = IT city / high-tech city'],
                  hint: 'If stuck on SPV structure or funding flow, revisit c11_ps_cbse_17_006 (74th Amendment) and.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' }
          ],
            remediations: { 'smart-city-it-city-high': { steps: ['Revisit **c11_geo_cbse_17_008** (Smart Cities Mission intro) and **c12_geo_cbse_10_008** (Urban problems) to relink.', 'Download *one* actual Smart City Proposal (e.g., Bhubaneswar Round 1 winner) from smartcities.gov.in.', 'Map its ABD area on Google Earth; list 5 Pan-City projects.', 'Re-do Diagnostic Q3 (calculation) with that city\'s numbers.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
