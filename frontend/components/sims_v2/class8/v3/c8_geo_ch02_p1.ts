import type { SimDef } from '../../engine/types';

/** v3 generated — c8_geo_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_geo_ch02_p1: SimDef = {
    id: 'v3_c8_geo_ch02_p1',
    title: 'World Geography: Some Glimpses · Part 1/2',
    subtitle: 'The planet that bulges when it spins',
    classLevel: 8, subject: 'geography', topic: 'World Geography: Some Glimpses · Part 1/2',
    chapters: ['c8_geo_ch02'],
    nodeIds: ['c8_geo_ch2_1', 'c8_geo_ch2_10', 'c8_geo_ch2_11', 'c8_geo_ch2_12', 'c8_geo_ch2_2', 'c8_geo_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geodesy explorer measuring the Earth', intro: 'Your school globe lied to you — politely. The real Earth is slightly squashed, and figuring out why takes you from potter\'s wheels to map distortions in one spin.', goal: 'Understand Earth as an oblate spheroid — how rotation creates the equatorial bulge, its effect on gravity, and why 3D Earth can\'t flatten onto 2D maps without distortion.' },
    discovery: {
        question: 'Earth isn\'t a perfect ball — its equatorial diameter is 12,756 km but the polar one is only 12,714 km. What squeezed it?',
        options: ['Its own spin — rotation flings material outward at the equator, bulging it like clay on a potter\'s wheel', 'The Moon\'s gravity squashed the poles flat', 'Heavy ice caps pushed the poles inward', 'It\'s an optical illusion from photos'],
        answer: 'Its own spin — rotation flings material outward at the equator, bulging it like clay on a potter\'s wheel',
        hook: 'Spin a wet wheel and water flies outward — Earth does the same. The equator whips around at ~1,670 km/h, so the planet bulges there by 42 km. Yet from space it still looks perfectly round — the squish is that tiny.',
    },
    teaching: [
        { title: 'Earth as an Oblate Spheroid: Shape of the Planet', text: 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere flattened at the North and South Poles and bulging at the Equator.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_geo_ch2_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Put Earth on the weighing scale of physics: compute the 42 km diameter gap, figure out why you\'d weigh slightly more at the North Pole than at the equator, and discover why no flat map can copy this shape without lying.',
        labels: ['Earth as an Oblate', 'Rivers of the World', 'Human Actions and Environmental', 'Importance of Understanding World', 'Map Projections: Mercator', 'Distortions in Map Projections'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_geo_ch2_1', title: 'Earth as an Oblate Spheroid: Shape of the Planet',
          scaffold: { problem: 'An aircraft navigation computer needs to compare the theoretical travel distance around Earth along two full circles:',
            steps: [
            { text: 'Identify equatorial diameter ($d_e = 12,756\\text{ km}$) and polar diameter ($d_p = 12,714\\text{ km}$).' },
            { text: 'Calculate equatorial circumference ($C_e = \\pi \\times d_e = 3.1416 \\times 12,756\\text{ km}$).' },
            { text: 'Calculate polar circumference ($C_p = \\pi \\times d_p = 3.1416 \\times 12,714\\text{ km}$).' },
            { text: 'Compute difference between circumferences ($\\Delta C = C_e - C_p = 3.1416 \\times (12,756 - 12,714)$).' },
            { text: 'Interpret the physical meaning of the resulting distance discrepancy.', faded: true, blankAnswer: '1. $C_e = 3.1416 \\times 12,756 = 40,076.25\\text{ km}$' }
            ] } },
        { type: 'case', nodeId: 'c8_geo_ch2_10', title: 'Rivers of the World: Nile, Amazon, Ganga, Mississippi',
          caseStudy: { intro: 'When you look at a map of India, you notice how cities like Varanasi and Kolkata developed along the banks of the Ganga River because of fertile soil and water.',
            decisions: [{ prompt: 'Which river is recognized as the longest in the world, and into which body of water does it drain?', options: [
                { text: 'The Nile River is the longest river in the world and drains northwards into the', outcome: 'The Nile River is the longest river in the world and drains northwards into the Mediterranean Sea.' },
                { text: 'Amazon and Atlantic Ocean', outcome: 'Not quite — Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries.', reveals: 'students-frequently-confuse-the-longest' },
                { text: 'longest', outcome: 'Not quite — Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries.', reveals: 'students-frequently-confuse-the-longest' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_12', title: 'Importance of Understanding World Geography',
          caseStudy: { intro: 'To understand the importance of world geography, think about the smartphone or computer you are using right now, or the petrol that powers your school bus.',
            decisions: [{ prompt: 'What is meant by the term \'spatial interdependence\' in world geography?', options: [
                { text: 'Spatial interdependence refers to the mutual reliance of different regions and countries', outcome: 'Spatial interdependence refers to the mutual reliance of different regions and countries on one.' },
                { text: 'countries sharing borders', outcome: 'Not quite — Students often think that "geography is just about memorizing names of capitals, rivers, and.', reveals: 'geography-is-just-about-memorizing' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_geo_ch2_2', title: 'Map Projections: Mercator and Robinson Projections',
          scaffold: { problem: 'A student in Bengaluru looks at a Mercator projection map where the Scandinavian Peninsula (latitude ~60° N) appears equal in area.',
            steps: [
            { text: 'Identify the geographical locations and their latitudinal positions (Peninsular India lies close to the Equator.' },
            { text: 'Recall the distortion principle of the Mercator projection: distortion increases rapidly as latitude increases because.' },
            { text: 'Compare the scale factor at the two latitudes. Near the Equator ($\\theta \\approx 10^\\circ$), $\\cos(10^\\circ) \\approx.' },
            { text: 'Compare real areas. Peninsular India plus the Northern Plains covers over 3.28 million km², while Scandinavia covers.' },
            { text: 'Synthesize and conclude: The apparent visual equality is an optical illusion caused by Mercator\'s high-latitude.', faded: true, blankAnswer: 'The visual equality is false. In reality, India is about.' }
            ] } },
        { type: 'case', nodeId: 'c8_geo_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A school globe looks perfectly round, so a classmate insists Earth is an exact sphere. He adds that since the flattening is \'only 42 km,\' printing the globe onto flat paper should lose nothing at all.',
            decisions: [{ prompt: 'Which parts of his claim need correcting?', options: [
                { text: 'Both parts: Earth is an oblate spheroid — spinning pushes material outward fastest at the equator, bulging it (~12,756 km) relative to the poles (~12,714 km). And no curved 3D surface, however slightly flattened, lies flat on paper without stretching or squeezing shapes — that is why map projections always distort something.', outcome: 'This links the rotation-causes-bulge mechanism to the unavoidable map-distortion consequence.' },
                { text: 'He is right on both counts — the globe looks round, and a 42 km difference is too tiny to matter for maps.', outcome: 'Looks deceive: the bulge is only ~0.33% of the diameter, invisible to the eye but real — and the flattening is not what distorts maps; flattening any sphere onto a plane does.', reveals: 'round-globe-round-earth' },
                { text: 'The bulge exists, but it is caused by gravity pulling harder at the equator, piling matter outward there.', outcome: 'Gravity pulls inward everywhere; the equator bulges because it is farthest from the rotation axis and spins fastest, so outward centrifugal effect peaks there.', reveals: 'gravity-pushes-outward' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'Our planet is an oblate spheroid — a sphere squished by its own spin. That tiny 42 km bulge is why gravity changes with latitude and why every flat world map quietly distorts the truth.',
            decisions: [{ prompt: 'What comes next? World Geography: Some Glimpses · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — World Geography: Some Glimpses · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_geo_ch2_1', difficulty: 'standard',
          question: 'The Earth is an oblate spheroid (also described as a geoid), meaning it is.',
          hint: 'Review Class 7 topic `c7_geo_ch01_001` to refresh understanding of the Equator, the.',
          misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened.',
          parts: [
                { id: 'a', prompt: 'Why does Earth bulge around the Equator rather than around the North and South Poles?', answer: 'Earth bulges at the Equator',
                  options: ['Earth bulges at the Equator', 'gravity pulls Earth outward at the equator'],
                  hint: 'Review Class 7 topic `c7_geo_ch01_001` to refresh understanding of the Equator, the geographic.',
                  misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened pear from space.' },
                { id: 'b', prompt: 'An expedition team measures their weight using a precision spring balance at Indira Point (near the Equator) and again at the North Pole.', answer: 'They will weigh slightly more at the North Pole',
                  options: ['They will weigh slightly more at the North Pole', 'a larger distance from the center increases surface gravity'],
                  hint: 'Review Class 7 topic `c7_geo_ch01_001` to refresh understanding of the Equator, the geographic.',
                  misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened pear from space.' }
          ],
            remediations: { 'because-earth-is-an-oblate': { steps: ['Calculate the flattening percentage together: $\\frac{42}{12,756} \\times 100 \\approx 0.33\\%$. 2.', 'Scale this to a standard classroom globe with a diameter of 30 cm.', 'Demonstrate that on a 30 cm globe, the polar flattening is only 1 millimeter—unnoticeable to the eye, yet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_10', difficulty: 'standard',
          question: 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are.',
          hint: 'If stuck, review `c8_geo_ch2_4` (Physical Maps: Reading Colours) and `c8_geo_ch2_8`.',
          misconception: 'Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries the most water.',
          parts: [
                { id: 'a', prompt: 'Which river is recognized as the longest in the world, and into which body of water does it drain?', answer: 'The Nile River is the longest river in the world and drains northwards into the',
                  options: ['The Nile River is the longest river in the world and drains northwards into the', 'Amazon and Atlantic Ocean', 'longest', 'largest'],
                  hint: 'If stuck, review `c8_geo_ch2_4` (Physical Maps: Reading Colours) and `c8_geo_ch2_8` (Mountain.',
                  misconception: 'Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries the most water because it is the.' },
                { id: 'b', prompt: 'A map shows a river originating in the snow-capped Himalayas, flowing southeast through fertile plains, and forming a massive delta before emptying into the.', answer: 'The river is the Ganga (Ganges)',
                  options: ['The river is the Ganga (Ganges)', 'longest', 'largest'],
                  hint: 'If stuck, review `c8_geo_ch2_4` (Physical Maps: Reading Colours) and `c8_geo_ch2_8` (Mountain.',
                  misconception: 'Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries the most water because it is the.' }
          ],
            remediations: { 'students-frequently-confuse-the-longest': { steps: ['Have the student open a world physical map showing vegetation and precipitation overlays.', 'Point out the Amazon Basin in South America and highlight its deep green equatorial rainforest cover (indicating heavy.', 'Contrast this with the Nile\'s course through the yellow/brown arid Sahara Desert in Africa, showing that while the Nile.', 'Conclude with the visual rule: "Length = distance covered; Volume = rainfall received in the drainage basin."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries the most water.',
          parts: [
                { id: 'a', prompt: 'A developer proposes building a major industrial hub at the mouth of the Amazon River, arguing that its huge water volume makes it superior to the Ganga delta.', answer: 'The argument is flawed geographically',
                  options: ['The argument is flawed geographically', 'longest', 'largest'],
                  hint: 'If stuck, review `c8_geo_ch2_4` (Physical Maps: Reading Colours) and `c8_geo_ch2_8` (Mountain.',
                  misconception: 'Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries the most water because it is the.' },
                { id: 'b', prompt: 'Design an annotated map layout plan that categorizes the Nile, Amazon, Ganga, and Mississippi based on two criteria: Primary Source Region (Glacial/Mountain.', answer: 'A correct design should map: 1',
                  options: ['A correct design should map: 1', 'longest', 'largest'],
                  hint: 'If stuck, review `c8_geo_ch2_4` (Physical Maps: Reading Colours) and `c8_geo_ch2_8` (Mountain.',
                  misconception: 'Students frequently confuse the "longest" river with the "largest" river, assuming the Nile carries the most water because it is the.' }
          ],
            remediations: { 'students-frequently-confuse-the-longest': { steps: ['Have the student open a world physical map showing vegetation and precipitation overlays.', 'Point out the Amazon Basin in South America and highlight its deep green equatorial rainforest cover (indicating heavy.', 'Contrast this with the Nile\'s course through the yellow/brown arid Sahara Desert in Africa, showing that while the Nile.', 'Conclude with the visual rule: "Length = distance covered; Volume = rainfall received in the drainage basin."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_11', difficulty: 'standard',
          question: 'Global environmental challenges refer to the large-scale degradation of Earth\'s.',
          hint: 'If stuck, review `c7_geo_ch03_010` to understand how gases absorb heat, and.',
          misconception: 'Students frequently confuse the mechanism of global warming with that of ozone layer depletion.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical',
                  options: ['Global environmental challenges refer to the large-scale degradation of Earth\'s physical', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Understanding world geography is the systematic study of how physical landforms,'],
                  hint: 'If stuck, review `c7_geo_ch03_010` to understand how gases absorb heat, and `c7_geo_ch01_009`.',
                  misconception: 'Students frequently confuse the mechanism of global warming with that of ozone layer depletion.' }
          ],
            remediations: { 'students-frequently-confuse-the-mechanism': { steps: ['Draw two distinct layers on a whiteboard: the lower Troposphere and the upper Stratosphere.', 'In the Troposphere, draw a blanket of $CO_2$ molecules.', 'Show shortwave sunlight passing through it to hit Earth, and then draw wavy red arrows (heat) trying to escape but.', 'Label this "Global Warming - Trapping Heat." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_12', difficulty: 'standard',
          question: 'Understanding world geography is the systematic study of how physical.',
          hint: 'If stuck, review c7_geo_ch05_011 to remind yourself how India\'s geography (rivers.',
          misconception: 'Students often think that "geography is just about memorizing names of capitals, rivers, and mountains on a map, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Understanding world geography is the systematic study of how physical landforms,',
                  options: ['Understanding world geography is the systematic study of how physical landforms,', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical'],
                  hint: 'If stuck, review c7_geo_ch05_011 to remind yourself how India\'s geography (rivers, monsoons.',
                  misconception: 'Students often think that "geography is just about memorizing names of capitals, rivers, and mountains on a map, and has no impact.' }
          ],
            remediations: { 'geography-is-just-about-memorizing': { steps: ['**Map Overlay Exercise**: Have the student look at a map of global undersea internet cables and overlay it with.', 'Show how deep-sea cables are physically routed through strategic geographic passages.', '**"Trace the Product" Activity**: Take a common item like chocolate or a smartphone.', 'Have the student trace the physical origin of each raw material (cocoa from West Africa, rubber from Southeast Asia.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_2', difficulty: 'standard',
          question: 'A map projection is a mathematical method used to transfer the curved.',
          hint: 'If stuck, revisit the desktop globe to observe how meridians converge at the North and.',
          misconception: 'Students frequently believe that because Greenland appears larger than India or Africa on their classroom Mercator wall.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A map projection is a mathematical method used to transfer the curved, three-dimensional',
                  options: ['A map projection is a mathematical method used to transfer the curved, three-dimensional', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical'],
                  hint: 'If stuck, revisit the desktop globe to observe how meridians converge at the North and South Poles.',
                  misconception: 'Students frequently believe that because Greenland appears larger than India or Africa on their classroom Mercator wall map, Greenland must.' }
          ],
            remediations: { 'students-frequently-believe-that-because': { steps: ['Direct the student to take a desktop globe and an ordinary flat classroom wall map.', 'Have them locate India and Greenland on both.', 'Ask them to trace Greenland\'s boundary on tracing paper directly from the globe\'s surface, and then place that tracing.', 'Next, have them compare this globe overlay against the flat Mercator map where Greenland dwarfs the Indian subcontinent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_3', difficulty: 'standard',
          question: 'Map distortion refers to the unavoidable alteration of spatial.',
          hint: 'If stuck, review `c8_geo_ch2_1` to understand Earth\'s physical round shape, and trace.',
          misconception: 'Students often believe that wall maps displayed in classrooms show true physical sizes, leading them to conclude that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Map distortion refers to the unavoidable alteration of spatial properties—specifically',
                  options: ['Map distortion refers to the unavoidable alteration of spatial properties—specifically', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Major world river systems—such as the Nile, Amazon, Ganga, and Mississippi—are natural', 'Global environmental challenges refer to the large-scale degradation of Earth\'s physical'],
                  hint: 'If stuck, review `c8_geo_ch2_1` to understand Earth\'s physical round shape, and trace latitude.',
                  misconception: 'Students often believe that wall maps displayed in classrooms show true physical sizes, leading them to conclude that Greenland is larger.' }
          ],
            remediations: { 'wall-maps-displayed-in-classrooms': { steps: ['**Globe Comparison:** Have the student inspect a physical 3D globe alongside a Mercator wall map.', '**Overlay Technique:** Provide transparent cutouts of high-latitude landmasses (Greenland) and low-latitude landmasses.', '**Physical Placement:** Place the cutout of Greenland over India on the globe to visually prove that India is larger.', 'Then place the same cutouts on the Mercator map to highlight the artificial visual magnification caused.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
