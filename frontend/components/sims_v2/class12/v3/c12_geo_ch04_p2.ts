import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch04_p2: SimDef = {
    id: 'v3_c12_geo_ch04_p2',
    title: 'Human Settlements · Part 2/2',
    subtitle: '10,000 people and still \'rural\' — the Census has three gates',
    classLevel: 12, subject: 'geography', topic: 'Human Settlements · Part 2/2',
    chapters: ['c12_geo_ch04'],
    nodeIds: ['c12_geo_cbse_04_007', 'c12_geo_cbse_04_008', 'c12_geo_cbse_04_009', 'c12_geo_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Settlement classifier', intro: 'Where does a village end and a town begin? India\'s Census answers with three simultaneous tests — and fails anyone who misses by one percent.', goal: 'Apply the Census of India\'s three criteria and distinguish statutory towns, census towns and rural settlements.' },
    discovery: {
        question: 'A settlement of 10,000 people at 500 persons/km² — but only 74% of male workers are in non-farm jobs. Urban or rural?',
        options: ['Rural — all three Census criteria must pass together, and 74% misses the 75% non-primary cut-off by a single point', 'Urban — it\'s big and dense', 'Urban — amenities decide', 'Depends on the state'],
        answer: 'Rural — all three Census criteria must pass together, and 74% misses the 75% non-primary cut-off by a single point',
        hook: 'Size is a decoy — the Census asks what people DO: ≥5,000 people, ≥400/km², ≥75% male workforce in non-primary work, all at once. And a notified Nagar Panchayat can be urban by law yet rural by Census — two lists, two truths, one settlement.',
    },
    teaching: [
        { title: 'Urbanisation: Causes and Trends Worldwide', text: 'Urbanisation is the process of population concentration in urban areas, marked by an increase in the proportion of a country\'s population living in urban settlements over time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play Census officer: classify real settlements through the three-gate filter, untangle statutory towns from census towns, and ask why India alone insists on counting what workers do.',
        labels: ['Urbanisation: Causes and Trends', 'Problems of Urban Settlements', 'Problems of Rural Settlements', 'Sustainable Settlement Planning'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_007', title: 'Urbanisation: Causes and Trends Worldwide',
          scaffold: { problem: 'According to Census 2011, India\'s total population was 1210.9 million and urban population was 377.1 million.',
            steps: [
            { text: 'Identify the given data for both census years: total and urban populations.' },
            { text: 'Compute urbanisation rate for each year using formula: (Urban/Total)×100.' },
            { text: 'Compute decadal urban growth rate: [(Urban_2011 – Urban_2001)/Urban_2001]×100.' },
            { text: 'Compute decadal total population growth rate: [(Total_2011 – Total_2001)/Total_2001]×100.' },
            { text: 'Compute absolute increase in urban and total population; find urban share of total increase = (Urban increase / Total.' },
            { text: 'Interpret: urbanisation rate rose from 27.8% to 31.1%; urban growth (31.8%) exceeded total growth (17.7%), indicating.', faded: true, blankAnswer: '(a) 2001: 27.8%, 2011: 31.1%. (b) Urban growth rate = 31.8%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_008', title: 'Problems of Urban Settlements: Slums, Congestion, Pollution',
          scaffold: { problem: 'Using Census 2011 data, Mumbai has 52.5% of households in slums (highest among metros), while Chennai has 28.5%.',
            steps: [
            { text: 'Identify the geographical contrast — Mumbai\'s linear north-south geography on reclaimed islands vs Chennai\'s radial.' },
            { text: 'Recall historical land reclamation — Mumbai\'s cotton mills (1850s-1980s) attracted massive migrant labor housed.' },
            { text: 'Analyze industrial location — Mumbai\'s island geography forced industry and housing into same narrow corridor (Parel.' },
            { text: 'Evaluate state housing policy — Maharashtra\'s Slum Areas Act (1971) and SRA (1995) formalized slums but incentivized.' },
            { text: 'Synthesize — Mumbai\'s geographical constraint (linear, land-scarce) + historical industrial concentration + TDR-driven.', faded: true, blankAnswer: 'Mumbai\'s 52.5% slum households stem from its linear island.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_009', title: 'Problems of Rural Settlements: Infrastructure and Services',
          caseStudy: { intro: 'Start with a real observation: ask students to compare their village/town or a nearby village they have visited with the nearest city — list what is missing.',
            decisions: [{ prompt: 'Name any three physical infrastructure deficits commonly found in rural settlements of the Himalayan region (e.g., Uttarakhand, Himachal.', options: [
                { text: 'Correct answer: (1) All-weather road connectivity', outcome: 'Correct answer: (1) All-weather road connectivity — steep slopes, landslides, and seismic activity.' },
                { text: 'lack of hospitals', outcome: 'Not quite — Students think "rural problems are the same everywhere in India — just lack of money." They write.', reveals: 'rural-problems-are-the-same' },
                { text: 'lack of funds', outcome: 'Not quite — Students think "rural problems are the same everywhere in India — just lack of money." They write.', reveals: 'rural-problems-are-the-same' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_010', title: 'Sustainable Settlement Planning and Smart Cities',
          scaffold: { problem: 'The Municipal Corporation of City X (population 1.5 million) plans a Smart City proposal for Area-Based Development (ABD) in a 500-acre.',
            steps: [
            { text: 'Identify the proposal\'s key parameters — land use mix, density (implied by 60% residential on 300 acres ≈ 150 du/acre.' },
            { text: 'Assess Environmental pillar — Positive: 50% water recycling, 25% solar, TOD reduces VKT.' },
            { text: 'Assess Social pillar — Positive: Mixed-income housing suggests inclusion.' },
            { text: 'Assess Economic pillar — Positive: Commercial component generates revenue.' },
            { text: 'Synthesise and propose improvements — Improvement 1: Mandate in-situ slum rehabilitation with tenure security and.', faded: true, blankAnswer: 'The proposal scores moderate on environment.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'Groundwater lets farmers grow water-hungry crops in dry regions — a lifeline that\'s emptying aquifers faster than rain refills them. Today\'s harvest borrows from tomorrow\'s water.',
            decisions: [{ prompt: 'Should the government restrict what farmers pump?', options: [
                { text: 'Yes — an empty aquifer helps nobody', outcome: 'The sustainability answer; restrictions without alternatives punish farmers who have no other water source.' },
                { text: 'No — farmers\' livelihoods aren\'t negotiable', outcome: 'The livelihood answer; but \'no restriction\' is also a decision — to let the resource end.' },
                { text: 'Restrict new borewells, support the shift to dry crops', outcome: 'The transition answer — honest that some farmers will farm differently or not at all; the support decides whether that\'s fair or cruel.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a district planning internship, a fast-growing settlement of 6,000 people with paved streets and dense housing is up for classification. Your supervisor calls it \'obviously urban now\' — but the data shows 80% of its male main workers still work in agriculture and it has no municipal notification.',
            decisions: [{ prompt: 'How does the Census of India classify it?', options: [
                { text: 'Rural — it passes the 5,000 population and 400/km² density tests but fails the strict third test: at least 75% of male main workers in non-agricultural work; all three criteria apply conjunctively, so urban looks don\'t make it urban.', outcome: 'The chapter\'s point is that the rural-urban line is multi-dimensional: morphological urbanism (concrete, crowding) with an agrarian workforce stays rural in Census terms until it clears every threshold.' },
                { text: 'Urban — 6,000 people and urban morphology settle it; workforce composition is a secondary detail.', outcome: 'That\'s the classic board-exam error: rounding \'mostly\' to urban while ignoring the exact 75% non-agricultural cut-off; a big farming village is still a village to the Census.', reveals: 'size-equals-urban' },
                { text: 'It\'s a census town, since any settlement crossing 5,000 qualifies statistically.', outcome: 'Census town status needs all three criteria — population, density, and the 75% non-agricultural workforce; crossing only the population bar is not enough.', reveals: 'five-thousand-means-census-town' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You can now classify any settlement by India\'s exact rules — and explain why the workforce test exists to keep dense farm villages honest.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_007', difficulty: 'standard',
          question: 'Urbanisation is the process of population concentration in urban areas, marked.',
          hint: 'If stuck, review the definition of Census towns vs. statutory towns (c12_geo_cbse_04_002).',
          misconception: 'Students often equate urbanisation with "growth of big cities" and ignore the growth of small and medium towns.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urbanisation is the process of population concentration in urban areas, marked by an',
                  options: ['Urbanisation is the process of population concentration in urban areas, marked by an', 'A human settlement is a cluster of dwellings where people live and interact,', 'A settlement is a human community with a defined spatial extent where people live, work,', 'Rural settlements are classified by their geometric shape or layout pattern on the ground'],
                  hint: 'If stuck, review the definition of Census towns vs. statutory towns (c12_geo_cbse_04_002) and the.',
                  misconception: 'Students often equate urbanisation with "growth of big cities" and ignore the growth of small and medium towns.' }
          ],
            remediations: { 'students-often-equate-urbanisation-with': { steps: ['Revisit c12_geo_cbse_04_002 (rural vs urban criteria) to recall how India defines urban (statutory + Census towns).', 'Review c11_geo_cbse_17_004 (urbanisation in India trends) and plot India\'s urbanisation rate (1901–2011) on graph paper.', 'Calculate urban growth rate and urbanisation rate for two consecutive Census years (e.g., 2001 and 2011) using the.', 'Compare India\'s urban primacy index (Delhi vs. Mumbai) with that of the USA (New York vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_008', difficulty: 'standard',
          question: 'Urban settlement problems refer to the systemic challenges arising from rapid.',
          hint: 'If unclear on slum definitions → review c11_geo_cbse_17_006 Census 2011 criteria.',
          misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are.',
          parts: [
                { id: 'a', prompt: 'According to Census of India 2011, what are the three categories of slums, and which category has the highest percentage of slum households in India?', answer: 'The three categories are: (1) Notified slums',
                  options: ['The three categories are: (1) Notified slums', 'slums are only a housing problem', 'congestion is only a traffic problem', '"slums are only a housing problem" and "congestion is only a traffic problem'],
                  hint: 'If unclear on slum definitions → review c11_geo_cbse_17_006 Census 2011 criteria.',
                  misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are multi-dimensional.' },
                { id: 'b', prompt: 'A 4-lane arterial road in a metro city carries 6,000 PCUs (Passenger Car Units) per hour during peak. Its design capacity is 4,800 PCU/hour.', answer: 'Step 1: V/C = Actual Volume / Design Capacity = 6,000 / 4,800 = 1.25',
                  options: ['Step 1: V/C = Actual Volume / Design Capacity = 6,000 / 4,800 = 1.25', 'slums are only a housing problem', 'congestion is only a traffic problem', '"slums are only a housing problem" and "congestion is only a traffic problem'],
                  hint: 'If unclear on slum definitions → review c11_geo_cbse_17_006 Census 2011 criteria.',
                  misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are multi-dimensional.' },
                { id: 'c', prompt: 'Compare the dominant sources of PM2.5 pollution in Delhi (winter) versus Mumbai (winter).', answer: 'Delhi (winter): Dominant sources',
                  options: ['Delhi (winter): Dominant sources', 'both have same sources', 'slums are only a housing problem', 'congestion is only a traffic problem'],
                  hint: 'If unclear on slum definitions → review c11_geo_cbse_17_006 Census 2011 criteria.',
                  misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are multi-dimensional.' }
          ],
            remediations: { 'slums-are-only-a-housing': { steps: ['Revisit c11_geo_cbse_17_006 (Class 11 Problems of Urban Settlements) — re-read Census 2011 slum definitions and create.', 'On a base map of your city, plot 5 slum clusters using Census 2011 data (available on data.gov.in) — annotate each.', 'Calculate V/C ratio for your daily commute road — count vehicles in 15 min peak, convert to PCU/hour, divide by IRC.', 'Download CPCB AQI bulletin for your city for last 7 days — identify dominant pollutant each day, correlate with wind.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the Slum Rehabilitation Authority (SRA) model in Mumbai versus the in-situ upgradation approach under PMAY-U (Pradhan Mantri Awas.', answer: 'SRA (Mumbai): Uses Transfer of Development Rights (TDR)',
                  options: ['SRA (Mumbai): Uses Transfer of Development Rights (TDR)', 'slums are only a housing problem', 'congestion is only a traffic problem', '"slums are only a housing problem" and "congestion is only a traffic problem'],
                  hint: 'If unclear on slum definitions → review c11_geo_cbse_17_006 Census 2011 criteria.',
                  misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are multi-dimensional.' },
                { id: 'b', prompt: 'Design a 3-point intervention plan to reduce traffic congestion and air pollution simultaneously in a 5 km radial corridor connecting a peripheral resettlement.', answer: 'one land-use measure, (',
                  options: ['one land-use measure, (', 'slums are only a housing problem', 'congestion is only a traffic problem', '"slums are only a housing problem" and "congestion is only a traffic problem'],
                  hint: 'If unclear on slum definitions → review c11_geo_cbse_17_006 Census 2011 criteria.',
                  misconception: 'Students believe "slums are only a housing problem" and "congestion is only a traffic problem." In reality: slums are multi-dimensional.' }
          ],
            remediations: { 'slums-are-only-a-housing': { steps: ['Revisit c11_geo_cbse_17_006 (Class 11 Problems of Urban Settlements) — re-read Census 2011 slum definitions and create.', 'On a base map of your city, plot 5 slum clusters using Census 2011 data (available on data.gov.in) — annotate each.', 'Calculate V/C ratio for your daily commute road — count vehicles in 15 min peak, convert to PCU/hour, divide by IRC.', 'Download CPCB AQI bulletin for your city for last 7 days — identify dominant pollutant each day, correlate with wind.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_009', difficulty: 'standard',
          question: 'Problems of rural settlements refer to the persistent deficits in physical.',
          hint: 'If stuck on settlement patterns → revisit c11_geo_cbse_17_002 (Rural Settlement Types).',
          misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like.',
          parts: [
                { id: 'a', prompt: 'Name any three physical infrastructure deficits commonly found in rural settlements of the Himalayan region (e.g., Uttarakhand, Himachal Pradesh) and state the.', answer: 'Correct answer: (1) All-weather road connectivity',
                  options: ['Correct answer: (1) All-weather road connectivity', 'lack of hospitals', 'lack of funds', 'rural problems are the same everywhere in India'],
                  hint: 'If stuck on settlement patterns → revisit c11_geo_cbse_17_002 (Rural Settlement Types).',
                  misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like "villages lack.' },
                { id: 'b', prompt: 'A village in Bundelkhand (Central India, hard rock terrain) has 1,200 population. It receives 800 mm annual rainfall (June-Sept).', answer: '(a) Demand = 1,200 × 70 lpcd = 84,000 litres/day = 84 m³/day',
                  options: ['(a) Demand = 1,200 × 70 lpcd = 84,000 litres/day = 84 m³/day', 'rural problems are the same everywhere in India', 'villages lack roads, hospitals, schools', 'infrastructure'],
                  hint: 'If stuck on settlement patterns → revisit c11_geo_cbse_17_002 (Rural Settlement Types).',
                  misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like "villages lack.' }
          ],
            remediations: { 'rural-problems-are-the-same': { steps: ['Revisit c11_geo_cbse_17_007 (Class 11 Problems of Rural Settlements) — list the 5 problem categories (infrastructure.', 'Take a blank outline map of India; mark 5 villages (one per region) and annotate the dominant physical constraint.', 'For each, write one infrastructure deficit caused by that constraint.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, review c11_geo_cbse_10_004 (Rainfall Distribution) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_010', difficulty: 'standard',
          question: 'Sustainable settlement planning is a holistic approach to designing and.',
          hint: 'If stuck on sustainability pillars, revisit c11_soc_cbse_08_008 (Sustainable Development.',
          misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.',
          parts: [
                { id: 'a', prompt: 'Explain why "compact city" form is considered more sustainable than "sprawl" for Indian metropolitan regions, linking land use, transport, and energy.', answer: 'Compact city form',
                  options: ['Compact city form', 'saving land', 'analyse the relationship'],
                  hint: 'If stuck on sustainability pillars, revisit c11_soc_cbse_08_008 (Sustainable Development.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' },
                { id: 'b', prompt: 'A city of 2 million people currently supplies 110 lpcd water. The Smart Cities Mission targets 135 lpcd with 24×7 supply.', answer: 'Step 1: Current effective supply per capita = 110 lpcd × (1 – 0.40) = 66 lpcd',
                  options: ['Step 1: Current effective supply per capita = 110 lpcd × (1 – 0.40) = 66 lpcd', 'calculate'],
                  hint: 'If stuck on sustainability pillars, revisit c11_soc_cbse_08_008 (Sustainable Development.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' },
                { id: 'c', prompt: 'Compare the RURBAN Mission (Shyama Prasad Mukherji Rurban Mission) and the Smart Cities Mission in terms of: (a) spatial unit of intervention, (b) core.', answer: 'spatial unit of intervention, (',
                  options: ['spatial unit of intervention, (', 'urban missions'],
                  hint: 'If stuck on sustainability pillars, revisit c11_soc_cbse_08_008 (Sustainable Development.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' }
          ],
            remediations: { 'students-equate-smart-city-with': { steps: ['Revisit c11_geo_cbse_17_006 (Urban Problems) and c11_geo_cbse_17_008 (Smart Cities Mission) — list 5 urban problems.', 'Draw a systems diagram: water-energy-waste-food-mobility flows for a 1 km² neighbourhood — mark where technology.', 'Take the CUET 2023/2024 geography case-based question on Smart Cities (available on NTA website) and write a 150-word.', 'Verify with teacher using the marking scheme — check if you addressed equity, ecology, and economy, not just tech.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
