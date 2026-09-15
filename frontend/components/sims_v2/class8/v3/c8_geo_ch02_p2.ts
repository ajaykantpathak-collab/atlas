import type { SimDef } from '../../engine/types';

/** v3 generated — c8_geo_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_geo_ch02_p2: SimDef = {
    id: 'v3_c8_geo_ch02_p2',
    title: 'World Geography: Some Glimpses · Part 2/2',
    subtitle: 'The planet that bulges when it spins',
    classLevel: 8, subject: 'geography', topic: 'World Geography: Some Glimpses · Part 2/2',
    chapters: ['c8_geo_ch02'],
    nodeIds: ['c8_geo_ch2_4', 'c8_geo_ch2_5', 'c8_geo_ch2_6', 'c8_geo_ch2_7', 'c8_geo_ch2_8', 'c8_geo_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geodesy explorer measuring the Earth', intro: 'Your school globe lied to you — politely. The real Earth is slightly squashed, and figuring out why takes you from potter\'s wheels to map distortions in one spin.', goal: 'Understand Earth as an oblate spheroid — how rotation creates the equatorial bulge, its effect on gravity, and why 3D Earth can\'t flatten onto 2D maps without distortion.' },
    discovery: {
        question: 'Earth isn\'t a perfect ball — its equatorial diameter is 12,756 km but the polar one is only 12,714 km. What squeezed it?',
        options: ['Its own spin — rotation flings material outward at the equator, bulging it like clay on a potter\'s wheel', 'The Moon\'s gravity squashed the poles flat', 'Heavy ice caps pushed the poles inward', 'It\'s an optical illusion from photos'],
        answer: 'Its own spin — rotation flings material outward at the equator, bulging it like clay on a potter\'s wheel',
        hook: 'Spin a wet wheel and water flies outward — Earth does the same. The equator whips around at ~1,670 km/h, so the planet bulges there by 42 km. Yet from space it still looks perfectly round — the squish is that tiny.',
    },
    teaching: [
        { title: 'Physical Maps: Reading Colours (Blue, Green, Brown, White)', text: 'A physical map uses a standardized international color convention to represent the relief (elevation above sea level) and depth (bathymetric depth below sea level) of Earth\'s natural surface.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_geo_ch2_4', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Put Earth on the weighing scale of physics: compute the 42 km diameter gap, figure out why you\'d weigh slightly more at the North Pole than at the equator, and discover why no flat map can copy this shape without lying.',
        labels: ['Physical Maps: Reading Colours', 'Continents: Africa, Asia, Europe,', 'Unique Physical Features', 'Oceans of the World', 'Mountain Ranges: Himalayas, Andes,', 'Deserts of the World'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_geo_ch2_5', title: 'Continents: Africa, Asia, Europe, North America, South America',
          caseStudy: { intro: 'Start by asking students to find India on a world map and trace the coastline outward — they will see India is a peninsula attached to a huge landmass called.',
            decisions: [{ prompt: 'Name the five continents covered in this lesson and state which one India belongs to.', options: [
                { text: 'The five continents are Africa, Asia, Europe, North America, and South America', outcome: 'The five continents are Africa, Asia, Europe, North America, and South America; India is part.' },
                { text: 'continent', outcome: 'Not quite — Students think "continent" and "country" are interchangeable categories — e.g., they say "Africa.', reveals: 'continent-and-country-are-interchangeable' },
                { text: 'country', outcome: 'Not quite — Students think "continent" and "country" are interchangeable categories — e.g., they say "Africa.', reveals: 'continent-and-country-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_6', title: 'Unique Physical Features of Each Continent',
          caseStudy: { intro: 'Look at the physical map of India you studied in Class 6 - the brown Himalayas, green northern plains, yellow Deccan plateau, and blue coastal waters.',
            decisions: [{ prompt: 'Name the continent that has the world\'s longest mountain range (Andes), largest rainforest (Amazon), and the driest non-polar desert.', options: [
                { text: 'South America', outcome: 'South America. A wrong answer (like Africa or Asia) reveals the student is recalling famous.' },
                { text: 'Europe and Asia are separate continents', outcome: 'Not quite — Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss.', reveals: 'europe-and-asia-are-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_7', title: 'Oceans of the World: Pacific, Atlantic, Indian, Arctic, Southern',
          caseStudy: { intro: 'When standing at Kanyakumari on the southern tip of India, a traveler can observe the convergence of three vast bodies of water: the Arabian Sea, the Bay.',
            decisions: [{ prompt: 'Which is the largest and deepest ocean on Earth, containing the Mariana Trench?', options: [
                { text: 'The Pacific Ocean is the largest and deepest ocean on Earth', outcome: 'The Pacific Ocean is the largest and deepest ocean on Earth. If a student answers "Atlantic Ocean,".' },
                { text: 'Atlantic Ocean', outcome: 'Not quite — Students often believe that the five oceans are completely separated, isolated bodies of water.', reveals: 'the-five-oceans-are-completely' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_8', title: 'Mountain Ranges: Himalayas, Andes, Rockies, Alps',
          caseStudy: { intro: 'When you look at photos of snow-covered peaks like Kanchenjunga or Mount Everest, you are looking at the Himalayas, India\'s northern mountain wall.',
            decisions: [{ prompt: 'On which continent is the Andes mountain range located, and what is its primary spatial orientation?', options: [
                { text: 'The Andes mountain range is located in South America along its western coast, running in', outcome: 'The Andes mountain range is located in South America along its western coast, running in.' },
                { text: 'North America or an east-west orientation', outcome: 'Not quite — Students frequently confuse the Andes and the Rockies regarding which continent each belongs.', reveals: 'students-frequently-confuse-the-andes' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A school globe looks perfectly round, so a classmate insists Earth is an exact sphere. He adds that since the flattening is \'only 42 km,\' printing the globe onto flat paper should lose nothing at all.',
            decisions: [{ prompt: 'Which parts of his claim need correcting?', options: [
                { text: 'Both parts: Earth is an oblate spheroid — spinning pushes material outward fastest at the equator, bulging it (~12,756 km) relative to the poles (~12,714 km). And no curved 3D surface, however slightly flattened, lies flat on paper without stretching or squeezing shapes — that is why map projections always distort something.', outcome: 'This links the rotation-causes-bulge mechanism to the unavoidable map-distortion consequence.' },
                { text: 'He is right on both counts — the globe looks round, and a 42 km difference is too tiny to matter for maps.', outcome: 'Looks deceive: the bulge is only ~0.33% of the diameter, invisible to the eye but real — and the flattening is not what distorts maps; flattening any sphere onto a plane does.', reveals: 'round-globe-round-earth' },
                { text: 'The bulge exists, but it is caused by gravity pulling harder at the equator, piling matter outward there.', outcome: 'Gravity pulls inward everywhere; the equator bulges because it is farthest from the rotation axis and spins fastest, so outward centrifugal effect peaks there.', reveals: 'gravity-pushes-outward' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Our planet is an oblate spheroid — a sphere squished by its own spin. That tiny 42 km bulge is why gravity changes with latitude and why every flat world map quietly distorts the truth.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_geo_ch2_4', difficulty: 'standard',
          question: 'A physical map uses a standardized international color convention to represent.',
          hint: 'If stuck, review `c7_geo_ch01_003` to understand the difference between mountains.',
          misconception: 'Students frequently believe that **green on a physical map represents dense forests, crop vegetation, or wet climatic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A physical map uses a standardized international color convention to represent the relief',
                  options: ['A physical map uses a standardized international color convention to represent the relief', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical'],
                  hint: 'If stuck, review `c7_geo_ch01_003` to understand the difference between mountains, plateaus, and.',
                  misconception: 'Students frequently believe that **green on a physical map represents dense forests, crop vegetation, or wet climatic zones**, and that.' }
          ],
            remediations: { 'students-frequently-believe-that-green': { steps: ['**Step 1 (Clarify standard definition)**: Show the student a physical map key/legend side-by-side with a satellite.', '**Step 2 (Demonstrate counter-example)**: Point out that low-lying desert areas near sea level are colored green.', '**Step 3 (Re-anchor the rule)**: Repeat the rule: "Physical map colors measure height above sea level, NOT plant life.".', '**Step 4 (Practice)**: Have the student trace a path from Kolkata (green: 10 m) to Bengaluru (light brown: 900 m).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_5', difficulty: 'standard',
          question: 'A continent is a large, continuous landmass separated by oceans, defined by its.',
          hint: 'Revisit c7_geo_ch01_001 (India\'s location) and practice identifying India\'s.',
          misconception: 'Students think "continent" and "country" are interchangeable categories — e.g., they say "Africa is a country".',
          parts: [
                { id: 'a', prompt: 'Name the five continents covered in this lesson and state which one India belongs to.', answer: 'The five continents are Africa, Asia, Europe, North America, and South America',
                  options: ['The five continents are Africa, Asia, Europe, North America, and South America', 'continent', 'country', 'Africa is a country'],
                  hint: 'Revisit c7_geo_ch01_001 (India\'s location) and practice identifying India\'s latitude/longitude on.',
                  misconception: 'Students think "continent" and "country" are interchangeable categories — e.g., they say "Africa is a country" or "Europe is a country like.' },
                { id: 'b', prompt: 'On an outline world map, a student shades the region between 60°N and 60°S latitude across all longitudes.', answer: 'Africa and South America lie entirely within 60°N–60°S and would be fully shaded',
                  options: ['Africa and South America lie entirely within 60°N–60°S and would be fully shaded', 'continent', 'country', 'Africa is a country'],
                  hint: 'Revisit c7_geo_ch01_001 (India\'s location) and practice identifying India\'s latitude/longitude on.',
                  misconception: 'Students think "continent" and "country" are interchangeable categories — e.g., they say "Africa is a country" or "Europe is a country like.' }
          ],
            remediations: { 'continent-and-country-are-interchangeable': { steps: ['Use a nesting doll analogy: show a physical map of India (one country, many states), then zoom out to Asia (one.', 'Have the student trace India\'s border in red, Asia\'s outline in blue, and the other four continents in green on the.', 'Ask: "How many red lines did you draw?', 'How many green?" This visual hierarchy corrects the category error in 5 minutes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_6', difficulty: 'standard',
          question: 'Unique physical features of each continent are the distinctive natural.',
          hint: 'If stuck, revisit c8_geo_ch2_4 (Physical Maps: Reading Colours) and practice identifying.',
          misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are.',
          parts: [
                { id: 'a', prompt: 'Name the continent that has the world\'s longest mountain range (Andes), largest rainforest (Amazon), and the driest non-polar desert (Atacama).', answer: 'South America',
                  options: ['South America', 'Europe and Asia are separate continents'],
                  hint: 'If stuck, revisit c8_geo_ch2_4 (Physical Maps: Reading Colours) and practice identifying Indian.',
                  misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a low, worn-down range.' },
                { id: 'b', prompt: 'On a blank world physical map, locate and label: (a) the Tibetan Plateau, (b) the Congo Basin, (c) the Canadian Shield, (d) the Great Artesian Basin.', answer: 'the Tibetan Plateau, (',
                  options: ['the Tibetan Plateau, (', 'Europe and Asia are separate continents'],
                  hint: 'If stuck, revisit c8_geo_ch2_4 (Physical Maps: Reading Colours) and practice identifying Indian.',
                  misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a low, worn-down range.' }
          ],
            remediations: { 'europe-and-asia-are-separate': { steps: ['Use a physical world map (from c8_geo_ch2_4) and trace the actual Ural Mountains - observe they are low (avg 600m).', 'Overlay a tectonic plate map - see Europe and Asia share the Eurasian Plate.', 'Compare physical feature lists side-by-side for Europe vs. Asia using a table.', 'Identify which features are truly unique to each (e.g., Tibetan Plateau only in Asia, North European Plain only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Antarctica\'s unique physical feature is its ice sheet, but if the ice melted, Antarctica would be just another mountainous continent.', answer: 'Inaccurate',
                  options: ['Inaccurate', 'Europe and Asia are separate continents'],
                  hint: 'If stuck, revisit c8_geo_ch2_4 (Physical Maps: Reading Colours) and practice identifying Indian.',
                  misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a low, worn-down range.' }
          ],
            remediations: { 'europe-and-asia-are-separate': { steps: ['Use a physical world map (from c8_geo_ch2_4) and trace the actual Ural Mountains - observe they are low (avg 600m).', 'Overlay a tectonic plate map - see Europe and Asia share the Eurasian Plate.', 'Compare physical feature lists side-by-side for Europe vs. Asia using a table.', 'Identify which features are truly unique to each (e.g., Tibetan Plateau only in Asia, North European Plain only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_7', difficulty: 'standard',
          question: 'The world\'s oceans form a vast, interconnected body of saline water covering.',
          hint: 'If stuck, review the physical world map showing continent outlines and identify the blue.',
          misconception: 'Students often believe that the five oceans are completely separated, isolated bodies of water separated by physical.',
          parts: [
                { id: 'a', prompt: 'Which is the largest and deepest ocean on Earth, containing the Mariana Trench?', answer: 'The Pacific Ocean is the largest and deepest ocean on Earth',
                  options: ['The Pacific Ocean is the largest and deepest ocean on Earth', 'Atlantic Ocean'],
                  hint: 'If stuck, review the physical world map showing continent outlines and identify the blue regions.',
                  misconception: 'Students often believe that the five oceans are completely separated, isolated bodies of water separated by physical land barriers.' }
          ],
            remediations: { 'the-five-oceans-are-completely': { steps: ['To correct this misunderstanding, have the student take a physical globe or a uninterrupted global map projection (such.', 'Ask them to trace a continuous line with a finger starting from Chennai in the Indian Ocean, passing south of Australia.', 'Reinforce that ocean names are human geographical boundaries designated for location reference, not physical walls.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_8', difficulty: 'standard',
          question: 'Mountain ranges are major continuous chains of mountains formed primarily.',
          hint: 'Revisit continent outlines in node c8_geo_ch2_5 and physical brown color contours in node.',
          misconception: 'Students frequently confuse the Andes and the Rockies regarding which continent each belongs to, and mistakenly assume.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mountain ranges are major continuous chains of mountains formed primarily through',
                  options: ['Mountain ranges are major continuous chains of mountains formed primarily through', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical'],
                  hint: 'Revisit continent outlines in node c8_geo_ch2_5 and physical brown color contours in node.',
                  misconception: 'Students frequently confuse the Andes and the Rockies regarding which continent each belongs to, and mistakenly assume that the Himalayas.' }
          ],
            remediations: { 'students-frequently-confuse-the-andes': { steps: ['Have the student open a world physical map and locate the equator and prime meridian.', 'Trace the western coast of South America with a blue marker from top to bottom, labeling this 7,000 km vertical chain.', 'Trace the western spine of North America, labeling it as the Rockies.', 'Trace the curved horizontal line across northern India and southern Asia, labeling it as the Himalayas (Highest.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_9', difficulty: 'standard',
          question: 'A desert is an arid geographic region receiving less than 25 centimetres (250.',
          hint: 'If stuck, review how mountains block moisture clouds (rain-shadow effect) in Class 7.',
          misconception: 'Students often believe that all deserts are vast seas of burning hot sand dunes created strictly by excessive tropical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A desert is an arid geographic region receiving less than 25 centimetres (250 mm) of',
                  options: ['A desert is an arid geographic region receiving less than 25 centimetres (250 mm) of', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical'],
                  hint: 'If stuck, review how mountains block moisture clouds (rain-shadow effect) in Class 7 climate.',
                  misconception: 'Students often believe that all deserts are vast seas of burning hot sand dunes created strictly by excessive tropical heat, and that.' }
          ],
            remediations: { 'all-deserts-are-vast-seas': { steps: ['Clarify the core scientific criterion for a desert—annual precipitation under 250 mm—regardless of thermal status. 2.', 'Use a world physical map overlaying ocean currents and topography.', 'Draw a cross-sectional mountain diagram showing moisture rising, cooling, and precipitating on the windward side.', 'Compare India\'s cold high-altitude desert (Ladakh) with the Gobi to ground the concept in an Indian geography context.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
