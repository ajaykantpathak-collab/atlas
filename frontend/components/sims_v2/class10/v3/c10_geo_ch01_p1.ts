import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch01_p1: SimDef = {
    id: 'v3_c10_geo_ch01_p1',
    title: 'Resources and Development · Part 1/2',
    subtitle: 'Decide what counts as a resource — and what doesn\'t yet',
    classLevel: 10, subject: 'geography', topic: 'Resources and Development · Part 1/2',
    chapters: ['c10_geo_ch01'],
    nodeIds: ['c10_geo_cbse_01_001', 'c10_geo_cbse_01_002', 'c10_geo_cbse_01_003', 'c10_geo_cbse_01_004', 'c10_geo_cbse_01_005', 'c10_geo_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a resource planner surveying a valley', intro: 'You\'ve been handed a map of a district and one blunt question: what here is actually a resource? The answer turns out to be trickier than \'everything useful.\'', goal: 'Classify resources by origin, exhaustibility, ownership and development status — and explain why the same substance can shift categories.' },
    discovery: {
        question: 'A river flows through a remote valley. To a city engineer it\'s a hydroelectric resource; to a village upstream it\'s irrigation; to an untouched forest stretch, the same water is \'not yet a resource.\' How can one substance switch between being and not being a resource?',
        options: ['A substance becomes a resource only when it meets a need AND is technologically accessible, economically feasible and culturally acceptable', 'Resources are fixed by nature — the engineer is simply wrong', 'Anything wet counts as a water resource automatically', 'Only things that can be sold in markets are resources'],
        answer: 'A substance becomes a resource only when it meets a need AND is technologically accessible, economically feasible and culturally acceptable',
        hook: 'A rock in a desert isn\'t a resource until technology, demand and cost line up. \'Resource\' is a relationship between humans and nature — not a label stamped on objects.',
    },
    teaching: [
        { title: 'Resources: Definition and Classification (Biotic, Abiotic)', text: 'A resource is any naturally occurring substance or feature that satisfies human needs, is technologically accessible, economically feasible, and culturally acceptable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit a patch of land — soil, water, forests, minerals, sunlight — and sort each item into biotic, abiotic, renewable, non-renewable and \'not yet a resource,\' then defend each call.',
        labels: ['Resources: Definition and Classification', 'Resources: Classification by Exhaustibility', 'Resources: Classification by Ownership', 'Development of Resources: Problems', 'Resource Planning in India', 'Conservation of Resources: Land'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_001', title: 'Resources: Definition and Classification (Biotic, Abiotic)',
          caseStudy: { intro: 'Start with a real-world observation: "Look at your school bag — the cotton fabric (from plants), the metal zip (from minerals), the plastic bottle (from.',
            decisions: [{ prompt: 'Define the term \'resource\' as per CBSE Class 10 Geography. List the four essential criteria that must be satisfied for any substance to.', options: [
                { text: 'A resource is anything that satisfies human needs, provided it is technologically', outcome: 'A resource is anything that satisfies human needs, provided it is technologically accessible.' },
                { text: 'gift of nature', outcome: 'Not quite — Students believe **any substance derived from living things, even millions of years ago,.', reveals: 'any-substance-derived-from-living' },
                { text: 'omits any criterion (e', outcome: 'Not quite — Students believe **any substance derived from living things, even millions of years ago,.', reveals: 'any-substance-derived-from-living' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_01_002', title: 'Resources: Classification by Exhaustibility (Renewable, Non-Renewable)',
          scaffold: { problem: 'The Central Ground Water Board reports that a block in Punjab has annual groundwater recharge of 120 million cubic metres (MCM), natural.',
            steps: [
            { text: 'Identify the formula for sustainable yield: SY = Recharge - Natural Discharge - Ecological Reserve.' },
            { text: 'Calculate Ecological Reserve = 10% of 120 MCM = 12 MCM.' },
            { text: 'Compute SY = 120 MCM - 15 MCM - 12 MCM = 93 MCM/yr.' },
            { text: 'Compare current extraction (140 MCM) with SY (93 MCM). Since 140 > 93, use is unsustainable.' },
            { text: 'Required reduction = 140 - 93 = 47 MCM (33.6% reduction needed).' },
            { text: 'Interpret: The block is "over-exploited" (extraction > 100% of recharge).', faded: true, blankAnswer: 'Sustainable Yield = 93 MCM/yr. Current extraction (140 MCM).' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_003', title: 'Resources: Classification by Ownership (Individual, Community, National, International)',
          caseStudy: { intro: 'Imagine you are standing in your family\'s backyard garden — the vegetables growing there belong to your family alone; that is an individual resource.',
            decisions: [{ prompt: 'Name the ownership category for each: (a) A farmer\'s private well in Punjab, (b) The grazing land used by all villagers in a Rajasthan.', options: [
                { text: '(a) Individual resource', outcome: '(a) Individual resource — owned by a private person. (b) Community resource — collectively owned.' },
                { text: 'national resource', outcome: 'Not quite — Students think "national resource" means "owned by the central government only" and "community.', reveals: 'national-resource-means-owned-by' },
                { text: 'owned by the central government only', outcome: 'Not quite — Students think "national resource" means "owned by the central government only" and "community.', reveals: 'national-resource-means-owned-by' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_004', title: 'Development of Resources: Problems and the Need for Resource Planning',
          caseStudy: { intro: 'Imagine you live in a village in Rajasthan where the only water source is a deep borewell that ran dry last summer, while in Punjab, farmers flood fields with.',
            decisions: [{ prompt: 'List any three problems that arise when resources are developed without proper planning, as discussed in this chapter.', options: [
                { text: 'Correct answer: (1) Overexploitation and depletion of finite resources (e.g.,', outcome: 'Correct answer: (1) Overexploitation and depletion of finite resources (e.g., groundwater.' },
                { text: 'pollution', outcome: 'Not quite — Students often think "resource planning" means only government making big dams or factories, and.', reveals: 'resource-planning-means-only-government' },
                { text: 'shortage', outcome: 'Not quite — Students often think "resource planning" means only government making big dams or factories, and.', reveals: 'resource-planning-means-only-government' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_005', title: 'Resource Planning in India: Need, Process and Examples',
          caseStudy: { intro: 'Observe your district: some areas have rich black soil for cotton, others face water scarcity despite good rainfall, and industrial zones may lack skilled.',
            decisions: [{ prompt: 'State the three sequential stages of resource planning in India as described in the NCERT Class 10 textbook.', options: [
                { text: 'Correct answer: (1) Identification and inventory of resources across regions through', outcome: 'Correct answer: (1) Identification and inventory of resources across regions through surveying.' },
                { text: 'conservation, distribution, utilisation', outcome: 'Not quite — Students think resource planning is only about *conserving* resources (like "save water, plant.', reveals: 'resource-planning-is-only-about' },
                { text: 'save water, plant trees', outcome: 'Not quite — Students think resource planning is only about *conserving* resources (like "save water, plant.', reveals: 'resource-planning-is-only-about' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_01_006', title: 'Conservation of Resources: Land Resources and Land Use Pattern',
          scaffold: { problem: 'A district in Maharashtra has total geographical area 15,000 km².',
            steps: [
            { text: 'Convert all areas to percentages of total geographical area (15,000 km²). Forest = (3000/15000)×100 = 20%.' },
            { text: 'Compare each with national average. Forest (20%) < 23%. Net Sown (50%) > 43%. Total Fallow (13.33%) > 8%.' },
            { text: 'Identify categories exceeding national average: Net Sown Area, Total Fallow, Culturable Waste, Permanent Pastures.' },
            { text: 'Interpret: High net sown indicates intensive agriculture; high fallow and culturable waste suggest land degradation.' },
            { text: 'Verify sum of percentages = 20+50+13.33+6.67+3.33+6.67 = 100% (approx). Correct.', faded: true, blankAnswer: 'Forest 20%, Net Sown 50%, Total Fallow 13.33%, Culturable.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_001', title: 'A real-world call',
          caseStudy: { intro: 'E-waste recycling recovers gold and copper — done formally, safely; done informally, by workers who burn circuit boards and breathe the fumes because it\'s the only job available.',
            decisions: [{ prompt: 'Is informal recycling livelihood or poisoning?', options: [
                { text: 'Ban it — the fumes are a public-health emergency', outcome: 'The health answer; a ban without alternative income turns a poisoning into a starvation.' },
                { text: 'Formalize it — train and equip the same workers', outcome: 'The just-transition answer — keeps the livelihood, removes the poison; requires someone to fund the equipment.' },
                { text: 'Regulate the producers — make electronics makers pay for safe recycling', outcome: 'The extended-responsibility answer — the cost lands where the product was made; only works where enforcement reaches.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school chart on \'Resources of India\', a student sorts pictures into two columns — \'from living things\' and \'from non-living things\'. She places coal and petroleum under living things \'because they are made of dead forests and sea creatures.\' Her partner disagrees.',
            decisions: [{ prompt: 'Which column do coal and petroleum actually belong in, and why?', options: [
                { text: 'The non-living column — the biotic/abiotic classification follows what the resource is now, not what it was millions of years ago. Petroleum and coal are minerals extracted from rock; biotic resources are obtained from the living biosphere — forests, animals, fisheries. Their biological ancestry does not make them biotic.', outcome: 'This is exactly the trap the classification guards against: \'comes from dead organisms\' describes origin, but the resource itself is abiotic — a mineral obtained from the lithosphere.' },
                { text: 'She is right — anything made of once-living matter counts as a biotic resource forever.', outcome: 'That rule would make every fossil fuel and limestone deposit \'biotic\'; classification looks at the resource\'s present form and where it is obtained from, not its deep ancestry.', reveals: 'dead-means-biotic' },
                { text: 'Both are wrong — coal and petroleum belong in a third \'fuel\' column, since fuels are a separate class.', outcome: 'Use-based grouping exists too, but for the biotic/abiotic question they are still abiotic — the chart\'s two columns already have a correct answer.', reveals: 'fuel-is-its-own-class' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Everything around you is either a resource or a resource-in-waiting. What decides isn\'t the thing itself — it\'s human need, technology and wisdom.',
            decisions: [{ prompt: 'What comes next? Resources and Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Resources and Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_001', difficulty: 'standard',
          question: 'A resource is any naturally occurring substance or feature that satisfies human.',
          hint: 'Revisit c8_geo_ch1_1 "When Does Nature Become a Resource" and re-learn the four criteria.',
          misconception: 'Students believe **any substance derived from living things, even millions of years ago, is biotic**.',
          parts: [
                { id: 'a', prompt: 'Coal is formed from fossilized plants. Why does CBSE classify coal as an **abiotic** resource and not a biotic one?', answer: 'CBSE classifies resources based on **current state and source category**, not',
                  options: ['CBSE classifies resources based on **current state and source category**, not', 'coal comes from plants so it\'s biotic'],
                  hint: 'Revisit c8_geo_ch1_1 "When Does Nature Become a Resource" and re-learn the four criteria with.',
                  misconception: 'Students believe **any substance derived from living things, even millions of years ago, is biotic**.' }
          ],
            remediations: { 'any-substance-derived-from-living': { steps: ['Draw a two-column table — "Biotic: Direct from Biosphere" vs "Abiotic: From Lithosphere/Atmosphere/Hydrosphere".', 'Place **coal, petroleum, natural gas** in the abiotic column with the label "Fossil fuels → mined like minerals".', 'Contrast with **biomass (firewood, biogas, crop residue)** in the biotic column — these are recently living, renewable.', 'Use the mnemonic: **"If you mine it, it\'s abiotic; if you grow/harvest it, it\'s biotic."** Practice with 5 Indian.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_002', difficulty: 'standard',
          question: 'Resources classified by exhaustibility are categorized based on their capacity.',
          hint: 'Revisit c8_geo_ch1_3 (Classification by Exhaustibility) and the bathtub.',
          misconception: 'Students believe **renewable resources are inexhaustible and can be used without limit**.',
          parts: [
                { id: 'a', prompt: 'Name two renewable and two non-renewable resources found in India. For each renewable resource, state the natural process that regenerates it.', answer: 'Renewable: (1) Solar energy',
                  options: ['Renewable: (1) Solar energy', 'wood" as non-renewable or "petroleum" as renewable', '**renewable resources are inexhaustible and can be used without limit**'],
                  hint: 'Revisit c8_geo_ch1_3 (Classification by Exhaustibility) and the bathtub recharge-extraction analogy.',
                  misconception: 'Students believe **renewable resources are inexhaustible and can be used without limit**.' },
                { id: 'b', prompt: 'A village in Maharashtra has 50 hectares of forest. The forest grows at 3 cubic metres per hectare per year.', answer: 'Step 1: Calculate annual growth = 50 ha × 3 m³/ha/yr = 150 m³/yr',
                  options: ['Step 1: Calculate annual growth = 50 ha × 3 m³/ha/yr = 150 m³/yr', 'yes, because forests are renewable', '**renewable resources are inexhaustible and can be used without limit**'],
                  hint: 'Revisit c8_geo_ch1_3 (Classification by Exhaustibility) and the bathtub recharge-extraction analogy.',
                  misconception: 'Students believe **renewable resources are inexhaustible and can be used without limit**.' }
          ],
            remediations: { 'renewable-resources-are-inexhaustible-and': { steps: ['Draw a simple bathtub diagram — tap = recharge, drain = extraction, water level = stock.', 'Use local data — e.g., CGWB block-level categorisation (safe/semi-critical/critical/over-exploited) for the student\'s.', 'Ask the student to classify their block and explain *why* it falls in that category using the bathtub model.', 'Connect to the formula: **Sustainable Yield = Annual Recharge - Natural Discharge - Allocation for Ecology**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **renewable resources are inexhaustible and can be used without limit**.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India should immediately stop all coal mining because coal is non-renewable and causes pollution." Consider energy security.', answer: 'The statement is geographically naive',
                  options: ['The statement is geographically naive', '**renewable resources are inexhaustible and can be used without limit**'],
                  hint: 'Revisit c8_geo_ch1_3 (Classification by Exhaustibility) and the bathtub recharge-extraction analogy.',
                  misconception: 'Students believe **renewable resources are inexhaustible and can be used without limit**.' }
          ],
            remediations: { 'renewable-resources-are-inexhaustible-and': { steps: ['Draw a simple bathtub diagram — tap = recharge, drain = extraction, water level = stock.', 'Use local data — e.g., CGWB block-level categorisation (safe/semi-critical/critical/over-exploited) for the student\'s.', 'Ask the student to classify their block and explain *why* it falls in that category using the bathtub model.', 'Connect to the formula: **Sustainable Yield = Annual Recharge - Natural Discharge - Allocation for Ecology**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_003', difficulty: 'standard',
          question: 'Resources classified by ownership refer to the categorization of natural and.',
          hint: 'Revisit c8_geo_ch1_1 (When Does Nature Become a Resource) to recall the resource.',
          misconception: 'Students think "national resource" means "owned by the central government only" and "community resource" means "owned.',
          parts: [
                { id: 'a', prompt: 'Name the ownership category for each: (a) A farmer\'s private well in Punjab, (b) The grazing land used by all villagers in a Rajasthan panchayat, (c) The iron.', answer: 'A farmer\'s private well in Punjab, (',
                  options: ['A farmer\'s private well in Punjab, (', 'national resource', 'owned by the central government only', 'community resource'],
                  hint: 'Revisit c8_geo_ch1_1 (When Does Nature Become a Resource) to recall the resource definition, and.',
                  misconception: 'Students think "national resource" means "owned by the central government only" and "community resource" means "owned by the village.' },
                { id: 'b', prompt: 'A mining company wants to extract bauxite from a forested hill in Chhattisgarh. The hill is legally "Reserved Forest" under the Indian Forest Act.', answer: '(i) Before laws: de facto community resource (traditional use)',
                  options: ['(i) Before laws: de facto community resource (traditional use)', 'national resource', 'owned by the central government only', 'community resource'],
                  hint: 'Revisit c8_geo_ch1_1 (When Does Nature Become a Resource) to recall the resource definition, and.',
                  misconception: 'Students think "national resource" means "owned by the central government only" and "community resource" means "owned by the village.' }
          ],
            remediations: { 'national-resource-means-owned-by': { steps: ['Draw a three-column table: Resource Example | Legal Owner (Statute) | Category.', 'Fill 4 rows: (a) Your house plot — You (Transfer of Property Act) — Individual; (b) Village pond — Gram Sabha.', 'Highlight that "State" in law means the sovereign (Union + States), not "state government."', 'Practice 3 past board questions on ownership classification from CBSE sample papers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_004', difficulty: 'standard',
          question: 'Resource development refers to the process of utilizing natural resources.',
          hint: 'If stuck, review Class 8 nodes c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_8.',
          misconception: 'Students often think "resource planning" means only government making big dams or factories, and that it applies only.',
          parts: [
                { id: 'a', prompt: 'List any three problems that arise when resources are developed without proper planning, as discussed in this chapter.', answer: 'Correct answer: (1) Overexploitation and depletion of finite resources (e.g.,',
                  options: ['Correct answer: (1) Overexploitation and depletion of finite resources (e.g.,', 'pollution', 'shortage', 'resource planning'],
                  hint: 'If stuck, review Class 8 nodes c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_8.',
                  misconception: 'Students often think "resource planning" means only government making big dams or factories, and that it applies only to non-renewable.' }
          ],
            remediations: { 'resource-planning-means-only-government': { steps: ['Revisit Class 8 node c8_geo_ch1_3 (Classification by Exhaustibility: Renewable and Non-Renewable) and c8_geo_ch1_8.', 'Use a local example — trace your household water source (borewell/tanker/municipal) and ask: "Who decides how much.', 'Draw a simple diagram: Recharge (rain) → Aquifer → Extraction (wells).', 'Connect to c10_geo_cbse_01_005 (Resource Planning in India) to see how India addresses this through policies.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_005', difficulty: 'standard',
          question: 'Resource planning in India is the systematic process of identifying, surveying.',
          hint: 'If stuck, revisit c6_geography_ch01_001 (India\'s geographical diversity) and c8_geo_ch1_5.',
          misconception: 'Students think resource planning is only about *conserving* resources (like "save water, plant trees") and miss that.',
          parts: [
                { id: 'a', prompt: 'A district in the Deccan Plateau has high laterite soil coverage, moderate rainfall (800 mm), and deposits of bauxite.', answer: 'Correct answer with steps: Step 1: Recognise the three stages',
                  options: ['Correct answer with steps: Step 1: Recognise the three stages', 'planning', 'save water, plant trees'],
                  hint: 'If stuck, revisit c6_geography_ch01_001 (India\'s geographical diversity) and c8_geo_ch1_5 (uneven.',
                  misconception: 'Students think resource planning is only about *conserving* resources (like "save water, plant trees") and miss that it is fundamentally.' }
          ],
            remediations: { 'resource-planning-is-only-about': { steps: ['Revisit the map of India\'s mineral belts (c10_geo_cbse_01_001) and overlay major industrial corridors — observe the.', 'Trace how the Dedicated Freight Corridor (Eastern/Western) and National Power Grid are planning responses to this.', 'Practice writing the three stages as a flowchart: Survey/Map → Institutional Setup → Plan Alignment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_006', difficulty: 'standard',
          question: 'Land resources refer to the naturally occurring land surface area available for.',
          hint: 'If stuck, revisit Class 6 \'Northern Plains\' and \'Desert Region\' (c6_geography_ch01_003.',
          misconception: 'Students often think \'fallow land\' and \'culturable waste land\' are the same.',
          parts: [
                { id: 'a', prompt: 'Why is the percentage of forest area in India (about 23%) still below the desired 33% as per the National Forest Policy, despite afforestation efforts?', answer: 'The gap persists',
                  options: ['The gap persists', '\'fallow land\' and \'culturable waste land\' are the same'],
                  hint: 'If stuck, revisit Class 6 \'Northern Plains\' and \'Desert Region\' (c6_geography_ch01_003.',
                  misconception: 'Students often think \'fallow land\' and \'culturable waste land\' are the same.' }
          ],
            remediations: { 'fallow-land-and-culturable-waste': { steps: ['Draw a two-column table with headers \'Fallow Land\' and \'Culturable Waste\'.', 'In Class 6 (c6_geography_ch04_025) you learned about sustainable farming — recall that fallowing is a traditional.', 'Use the NCERT Class 10 textbook definition: fallow = 1–5 years; culturable waste = >5 years.', 'Apply to a local example: a field left empty after rabi harvest is current fallow; a barren patch with salt crust for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
