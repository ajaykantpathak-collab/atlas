import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch01_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch01_p2: SimDef = {
    id: 'v3_c10_geo_ch01_p2',
    title: 'Resources and Development · Part 2/2',
    subtitle: 'Decide what counts as a resource — and what doesn\'t yet',
    classLevel: 10, subject: 'geography', topic: 'Resources and Development · Part 2/2',
    chapters: ['c10_geo_ch01'],
    nodeIds: ['c10_geo_cbse_01_007', 'c10_geo_cbse_01_008', 'c10_geo_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a resource planner surveying a valley', intro: 'You\'ve been handed a map of a district and one blunt question: what here is actually a resource? The answer turns out to be trickier than \'everything useful.\'', goal: 'Classify resources by origin, exhaustibility, ownership and development status — and explain why the same substance can shift categories.' },
    discovery: {
        question: 'A river flows through a remote valley. To a city engineer it\'s a hydroelectric resource; to a village upstream it\'s irrigation; to an untouched forest stretch, the same water is \'not yet a resource.\' How can one substance switch between being and not being a resource?',
        options: ['A substance becomes a resource only when it meets a need AND is technologically accessible, economically feasible and culturally acceptable', 'Resources are fixed by nature — the engineer is simply wrong', 'Anything wet counts as a water resource automatically', 'Only things that can be sold in markets are resources'],
        answer: 'A substance becomes a resource only when it meets a need AND is technologically accessible, economically feasible and culturally acceptable',
        hook: 'A rock in a desert isn\'t a resource until technology, demand and cost line up. \'Resource\' is a relationship between humans and nature — not a label stamped on objects.',
    },
    teaching: [
        { title: 'Soil as a Resource: Types of Soil in India (Alluvial, Black, Red, Laterite)', text: 'Soil is a naturally occurring, unconsolidated mineral and organic material on the Earth\'s surface that supports plant growth; in India, the four major soil types — Alluvial (deposited by rivers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit a patch of land — soil, water, forests, minerals, sunlight — and sort each item into biotic, abiotic, renewable, non-renewable and \'not yet a resource,\' then defend each call.',
        labels: ['Soil as a Resource', 'Soil Erosion and Conservation', 'Land Use Pattern'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_008', title: 'Soil Erosion and Conservation Methods (Contour Ploughing, Terracing, Shelter Belts)',
          caseStudy: { intro: 'Imagine standing on a farm in the Shiwalik hills after a heavy monsoon downpour: you see brown, muddy water rushing down the slope, carrying away the topsoil.',
            decisions: [{ prompt: 'Define gully erosion and name one region in India where it is prominently found.', options: [
                { text: 'Gully erosion occurs when running water cuts deep channels (gullies) into the soil,', outcome: 'Gully erosion occurs when running water cuts deep channels (gullies) into the soil, making the land.' },
                { text: 'shelter belts are only for deserts and contour ploughing is only for hills', outcome: 'Not quite — Students think shelter belts are only for deserts and contour ploughing is only for hills.', reveals: 'shelter-belts-are-only-for' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_01_009', title: 'Land Use Pattern in India: Forests, Net Sown Area, Fallow Land',
          scaffold: { problem: 'A student reads that India\'s forest cover is 24.56% (ISFR 2021) but the land use statistics show \'area under forests\' as 23.3% of reporting.',
            steps: [
            { text: 'Recognize that \'forest cover\' (from satellite data) includes all lands >1 ha with >10% canopy density, irrespective.' },
            { text: 'Note that reporting area is less than geographical area because some regions (e.g., parts of J&K, Northeast) are not.' },
            { text: 'Use the given forest cover percentage of geographical area: 80.9 / 328.7 × 100 = 24.6% (matches ISFR).' },
            { text: 'Use the land use statistic: area under forests = 23.3% of reporting area. Let reporting area = R.' },
            { text: 'The discrepancy arises because revenue forests ≠ actual forest cover.', faded: true, blankAnswer: 'The 24.56% is forest cover as % of geographical area.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_007', title: 'A real-world call',
          caseStudy: { intro: 'E-waste recycling recovers gold and copper — done formally, safely; done informally, by workers who burn circuit boards and breathe the fumes because it\'s the only job available.',
            decisions: [{ prompt: 'Is informal recycling livelihood or poisoning?', options: [
                { text: 'Ban it — the fumes are a public-health emergency', outcome: 'The health answer; a ban without alternative income turns a poisoning into a starvation.' },
                { text: 'Formalize it — train and equip the same workers', outcome: 'The just-transition answer — keeps the livelihood, removes the poison; requires someone to fund the equipment.' },
                { text: 'Regulate the producers — make electronics makers pay for safe recycling', outcome: 'The extended-responsibility answer — the cost lands where the product was made; only works where enforcement reaches.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school chart on \'Resources of India\', a student sorts pictures into two columns — \'from living things\' and \'from non-living things\'. She places coal and petroleum under living things \'because they are made of dead forests and sea creatures.\' Her partner disagrees.',
            decisions: [{ prompt: 'Which column do coal and petroleum actually belong in, and why?', options: [
                { text: 'The non-living column — the biotic/abiotic classification follows what the resource is now, not what it was millions of years ago. Petroleum and coal are minerals extracted from rock; biotic resources are obtained from the living biosphere — forests, animals, fisheries. Their biological ancestry does not make them biotic.', outcome: 'This is exactly the trap the classification guards against: \'comes from dead organisms\' describes origin, but the resource itself is abiotic — a mineral obtained from the lithosphere.' },
                { text: 'She is right — anything made of once-living matter counts as a biotic resource forever.', outcome: 'That rule would make every fossil fuel and limestone deposit \'biotic\'; classification looks at the resource\'s present form and where it is obtained from, not its deep ancestry.', reveals: 'dead-means-biotic' },
                { text: 'Both are wrong — coal and petroleum belong in a third \'fuel\' column, since fuels are a separate class.', outcome: 'Use-based grouping exists too, but for the biotic/abiotic question they are still abiotic — the chart\'s two columns already have a correct answer.', reveals: 'fuel-is-its-own-class' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_01_009', title: 'You made it',
          caseStudy: { intro: 'Everything around you is either a resource or a resource-in-waiting. What decides isn\'t the thing itself — it\'s human need, technology and wisdom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_007', difficulty: 'standard',
          question: 'Soil is a naturally occurring, unconsolidated mineral and organic material.',
          hint: 'Revise Class 6 Northern Plains and Peninsular Plateau (c6_geography_ch01_003.',
          misconception: 'Students think Black soil is found everywhere on the Deccan Plateau, but it is restricted to the basaltic lava flow.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Soil is a naturally occurring, unconsolidated mineral and organic material on the Earth\'s',
                  options: ['Soil is a naturally occurring, unconsolidated mineral and organic material on the Earth\'s', 'A resource is any naturally occurring substance or feature that satisfies human needs, is', 'Resources classified by exhaustibility are categorized based on their capacity to', 'Resources classified by ownership refer to the categorization of natural and human-made'],
                  hint: 'Revise Class 6 Northern Plains and Peninsular Plateau (c6_geography_ch01_003.',
                  misconception: 'Students think Black soil is found everywhere on the Deccan Plateau, but it is restricted to the basaltic lava flow region (Deccan Traps).' }
          ],
            remediations: { 'black-soil-is-found-everywhere': { steps: ['Take an outline map of India. Shade the Deccan Traps (Maharashtra, parts of Madhya Pradesh, Gujarat, Telangana) — this.', 'Shade the Western Ghats windward side, Eastern Ghats highlands, and Meghalaya plateau — this is Laterite soil.', 'Shade the remaining Peninsular Plateau (Tamil Nadu, Karnataka plateau, Andhra Pradesh, Odisha) — this is Red soil.', 'Overlay rainfall map (from c6_geography_ch03_016): >200 cm = Laterite zone; 50-100 cm = Black soil zone; 75-150.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_008', difficulty: 'standard',
          question: 'Soil erosion is the removal of the topsoil layer by natural agents like water.',
          hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c9_geo_ch1_9 (Erosion and.',
          misconception: 'Students think shelter belts are only for deserts and contour ploughing is only for hills.',
          parts: [
                { id: 'a', prompt: 'A farmer in the Palani Hills (Tamil Nadu) grows tea on a 15° slope. The soil is lateritic and receives 1500 mm annual rainfall.', answer: 'Terracing',
                  options: ['Terracing', 'shelter belts are only for deserts and contour ploughing is only for hills'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c9_geo_ch1_9 (Erosion and Deposition.',
                  misconception: 'Students think shelter belts are only for deserts and contour ploughing is only for hills.' },
                { id: 'b', prompt: 'Compare the effectiveness of shelter belts in the Thar Desert versus the Indo-Gangetic Plain. Which region benefits more and why?', answer: 'Thar Desert benefits more',
                  options: ['Thar Desert benefits more', 'shelter belts are only for deserts and contour ploughing is only for hills'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c9_geo_ch1_9 (Erosion and Deposition.',
                  misconception: 'Students think shelter belts are only for deserts and contour ploughing is only for hills.' }
          ],
            remediations: { 'shelter-belts-are-only-for': { steps: ['Draw a cross-section of a slope showing contour furrows vs. terraces; label slope angle, water flow direction, and.', 'Use a map of India (from c6_geography_ch01_003, c6_geography_ch01_004) to mark three regions: one where contour.', 'For each region, write the dominant erosion agent (water/wind), slope range, and soil type — this forces the student.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think shelter belts are only for deserts and contour ploughing is only for hills.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Contour ploughing alone can solve soil erosion in the Western Ghats." Support your evaluation with two arguments.', answer: 'The statement is false',
                  options: ['The statement is false', 'shelter belts are only for deserts and contour ploughing is only for hills'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c9_geo_ch1_9 (Erosion and Deposition.',
                  misconception: 'Students think shelter belts are only for deserts and contour ploughing is only for hills.' },
                { id: 'b', prompt: 'Design a soil conservation plan for a 5-hectare farm in the Bundelkhand region (Uttar Pradesh) with undulating topography, sandy loam soil, and 800 mm erratic.', answer: 'Good answer: (1) Upper gentle slopes (3-8%): contour ploughing + strip cropping',
                  options: ['Good answer: (1) Upper gentle slopes (3-8%): contour ploughing + strip cropping', 'shelter belts are only for deserts and contour ploughing is only for hills'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) and c9_geo_ch1_9 (Erosion and Deposition.',
                  misconception: 'Students think shelter belts are only for deserts and contour ploughing is only for hills.' }
          ],
            remediations: { 'shelter-belts-are-only-for': { steps: ['Draw a cross-section of a slope showing contour furrows vs. terraces; label slope angle, water flow direction, and.', 'Use a map of India (from c6_geography_ch01_003, c6_geography_ch01_004) to mark three regions: one where contour.', 'For each region, write the dominant erosion agent (water/wind), slope range, and soil type — this forces the student.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_01_009', difficulty: 'standard',
          question: 'Land use pattern in India refers to the classification of the country\'s total.',
          hint: 'Revisit the nine-fold classification table in NCERT Chapter 1 and the distinction between.',
          misconception: 'Students often think \'fallow land\' means completely barren, unproductive land.',
          parts: [
                { id: 'a', prompt: 'Why does the percentage of land under forests in India (about 23%) remain significantly lower than the 33% target set by the National Forest Policy, despite.', answer: 'The gap persists',
                  options: ['The gap persists', '\'fallow land\' means completely barren, unproductive land'],
                  hint: 'Revisit the nine-fold classification table in NCERT Chapter 1 and the distinction between.',
                  misconception: 'Students often think \'fallow land\' means completely barren, unproductive land.' },
                { id: 'b', prompt: 'Compare the land use pattern of Punjab (net sown area > 80%) with that of Arunachal Pradesh (forest > 80%).', answer: 'Punjab lies on the flat, fertile alluvial plains of the Indus system',
                  options: ['Punjab lies on the flat, fertile alluvial plains of the Indus system', '\'fallow land\' means completely barren, unproductive land'],
                  hint: 'Revisit the nine-fold classification table in NCERT Chapter 1 and the distinction between.',
                  misconception: 'Students often think \'fallow land\' means completely barren, unproductive land.' }
          ],
            remediations: { 'fallow-land-means-completely-barren': { steps: ['Draw a nine-fold classification table on paper with definitions and a local example for each (e.g., current fallow.', 'Use the NCERT pie chart (Figure 1.4) to match each slice to the definition.', 'Visit a nearby revenue office or use the Bhuvan portal to see the actual land use categories for your village.', 'Explain to a peer why \'forest area\' in government records ≠ \'actual forest cover\' — this distinction is a frequent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
