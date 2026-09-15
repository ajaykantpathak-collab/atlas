import type { SimDef } from '../../engine/types';
import C8_GeographyRepresentationGeographicalFeaturesSim from '../../../simulations/c6_12/C8_GeographyRepresentationGeographicalFeaturesSim';

/** v3 wrapped master — C8_GeographyRepresentationGeographicalFeaturesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_geographyrepresentationgeographicalfeaturessim: SimDef = {
    id: 'v3w_c8_geographyrepresentationgeographicalfeaturessim',
    title: 'Representation Geographical Features',
    subtitle: 'Covers reading and interpreting standard relief colors (blue, green, yellow, brown,.',
    classLevel: 8, subject: 'geography', topic: 'Physical Maps: Reading Colours (Blue, Green, Brown, White)',
    chapters: [],
    nodeIds: ['c8_geo_ch2_4', 'c8_geo_ch2_1', 'c8_geo_ch2_3', 'c8_geo_ch2_6', 'c8_geo_ch2_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'When looking at a physical map of India, you immediately notice broad green areas along the northern river.', goal: 'Master Representation Geographical Features.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'A physical map uses a standardized.', text: 'A physical map uses a standardized international color convention to represent the relief (elevation above sea level) and depth (bathymetric depth below sea level) of Earth\'s natural surface.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_geo_ch2_1', title: 'The Earth is an oblate spheroid (also.',
          scaffold: { problem: 'An aircraft navigation computer needs to compare the theoretical travel distance around Earth along two full circles:',
            steps: [
            { text: 'Identify equatorial diameter ($d_e = 12,756\\text{ km}$) and polar diameter ($d_p = 12,714\\text{ km}$).' },
            { text: 'Calculate equatorial circumference ($C_e = \\pi \\times d_e = 3.1416 \\times 12,756\\text{ km}$).' },
            { text: 'Calculate polar circumference ($C_p = \\pi \\times d_p = 3.1416 \\times 12,714\\text{ km}$).' },
            { text: 'Compute difference between circumferences ($\\Delta C = C_e - C_p = 3.1416 \\times (12,756 - 12,714)$).' },
            { text: 'Interpret the physical meaning of the resulting distance discrepancy.', faded: true, blankAnswer: '1. $C_e = 3.1416 \\times 12,756 = 40,076.25\\text{ km}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_geo_ch2_6', title: 'Unique physical features of each.',
          scaffold: { problem: 'A student sees a physical map showing a continent with: (1) a massive high plateau averaging 4,500m elevation in the south, (2) a huge.',
            steps: [
            { text: 'Observe the key clues - massive high plateau (Tibetan Plateau), northern desert (Gobi/Taklamakan), river from plateau.' },
            { text: 'Recall that only Asia has the Tibetan Plateau - the "Roof of the World" formed by India-Asia collision.' },
            { text: 'Match the desert location - Gobi Desert is in Mongolia/China, rain-shadow from Himalayas.' },
            { text: 'Verify river direction - Yellow River rises on Tibetan Plateau, flows north then east across North China Plain.' },
            { text: 'Confirm rift valley - Lake Baikal is the deepest continental rift lake, part of Baikal Rift Zone.' },
            { text: 'Conclude continent is Asia; features are Tibetan Plateau, Gobi Desert, Yellow River, Baikal Rift.', faded: true, blankAnswer: 'Asia - Tibetan Plateau, Gobi Desert, Yellow River, Baikal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_geo_ch2_7', title: 'The world\'s oceans form a vast,.',
          scaffold: { problem: 'A shipping logistics officer in Kochi (Kerala, India) needs to plan a voyage transporting tea and spices to San Francisco (USA).',
            steps: [
            { text: 'Identify the geographical starting point (Kochi, India in the Indian Ocean) and destination (San Francisco, USA on the.' },
            { text: 'Trace Route A: From Kochi (Indian Ocean), sail east through the Strait of Malacca into the South China Sea, entering.' },
            { text: 'Trace Route B: From Kochi (Indian Ocean), sail west across the Arabian Sea, around the southern tip of Africa (Atlantic.' },
            { text: 'Compare the spatial extents of the ocean basins involved. Route A primarily involves traversing the Indian Ocean and.' },
            { text: 'Verify and conclude based on ocean positioning: Route A is the direct route across the Pacific Ocean, avoiding the.', faded: true, blankAnswer: 'Route A (heading east across the Pacific Ocean) is.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_geo_ch2_1', title: 'Identify each idea',
          dissect: { specimen: 'Representation Geographical Features', spots: [
            { id: 's1', label: 'A physical map uses a', prompt: 'Which idea is this? — A physical map uses a standardized international color convention to represent the relief.', answer: 'A physical map uses a', options: ['A physical map uses a', 'The Earth is an oblate', 'Map distortion refers to the', 'Unique physical features of each'] },
            { id: 's2', label: 'The Earth is an oblate', prompt: 'Which idea is this? — The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere.', answer: 'The Earth is an oblate', options: ['The Earth is an oblate', 'A physical map uses a', 'Map distortion refers to the', 'Unique physical features of each'] },
            { id: 's3', label: 'Map distortion refers to the', prompt: 'Which idea is this? — Map distortion refers to the unavoidable alteration of spatial properties—specifically.', answer: 'Map distortion refers to the', options: ['Map distortion refers to the', 'A physical map uses a', 'The Earth is an oblate', 'Unique physical features of each'] },
            { id: 's4', label: 'Unique physical features of each', prompt: 'Which idea is this? — Unique physical features of each continent are the distinctive natural landforms, water.', answer: 'Unique physical features of each', options: ['Unique physical features of each', 'A physical map uses a', 'The Earth is an oblate', 'Map distortion refers to the'] },
            { id: 's5', label: 'The worlds oceans form a', prompt: 'Which idea is this? — The world\'s oceans form a vast, interconnected body of saline water covering.', answer: 'The worlds oceans form a', options: ['The worlds oceans form a', 'A physical map uses a', 'The Earth is an oblate', 'Map distortion refers to the'] }
          ] } }
    ],
    explore: { component: C8_GeographyRepresentationGeographicalFeaturesSim, prompt: 'Explore the interactive — Representation Geographical Features' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_geo_ch2_4', difficulty: 'standard',
          question: 'A physical map uses a standardized international color convention to represent.',
          hint: 'If stuck, review `c7_geo_ch01_003` to understand the difference between mountains,.',
          misconception: 'Students frequently believe that **green on a physical map represents dense forests, crop vegetation, or wet climatic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A physical map uses a standardized international color convention to represent the relief',
                  options: ['A physical map uses a standardized international color convention to represent the relief', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Map distortion refers to the unavoidable alteration of spatial properties—specifically', 'Unique physical features of each continent are the distinctive natural landforms, water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that **green on a physical map represents dense forests, crop vegetation, or wet climatic zones**, and that.' }
          ],
            remediations: { 'students-frequently-believe-that-green': { steps: ['**Step 1 (Clarify standard definition)**: Show the student a physical map key/legend side-by-side with a satellite.', '**Step 2 (Demonstrate counter-example)**: Point out that low-lying desert areas near sea level are colored green on.', '**Step 3 (Re-anchor the rule)**: Repeat the rule: "Physical map colors measure height above sea level, NOT plant life.".', '**Step 4 (Practice)**: Have the student trace a path from Kolkata (green: 10 m) to Bengaluru (light brown: 900 m) to.'] } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_1', difficulty: 'standard',
          question: 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a.',
          hint: 'Review Class 7 topic `c7_geo_ch01_001` to refresh understanding of the Equator, the.',
          misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened.',
          parts: [
                { id: 'a', prompt: 'Why does Earth bulge around the Equator rather than around the North and South Poles?', answer: 'Earth bulges at the Equator',
                  options: ['Earth bulges at the Equator', 'gravity pulls Earth outward at the equator'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened pear from space.' },
                { id: 'b', prompt: 'An expedition team measures their weight using a precision spring balance at Indira Point (near the Equator) and again at the North Pole.', answer: 'They will weigh slightly more at the North Pole',
                  options: ['They will weigh slightly more at the North Pole', 'a larger distance from the center increases surface gravity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened pear from space.' }
          ],
            remediations: { 'because-earth-is-an-oblate': { steps: ['Calculate the flattening percentage together: $\\frac{42}{12,756} \\times 100 \\approx 0.33\\%$. 2.', 'Scale this to a standard classroom globe with a diameter of 30 cm.', 'Demonstrate that on a 30 cm globe, the polar flattening is only 1 millimeter—unnoticeable to the eye, yet.'] } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened.',
          parts: [
                { id: 'a', prompt: 'An expedition team measures their weight using a precision spring balance at Indira Point (near the Equator) and again at the North Pole.', answer: 'They will weigh slightly more at the North Pole',
                  options: ['They will weigh slightly more at the North Pole', 'a larger distance from the center increases surface gravity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because Earth is an oblate spheroid, it looks visibly misshapen like an egg or a flattened pear from space.' }
          ],
            remediations: { 'because-earth-is-an-oblate': { steps: ['Calculate the flattening percentage together: $\\frac{42}{12,756} \\times 100 \\approx 0.33\\%$. 2.', 'Scale this to a standard classroom globe with a diameter of 30 cm.', 'Demonstrate that on a 30 cm globe, the polar flattening is only 1 millimeter—unnoticeable to the eye, yet.'] } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_3', difficulty: 'standard',
          question: 'Map distortion refers to the unavoidable alteration of spatial.',
          hint: 'If stuck, review `c8_geo_ch2_1` to understand Earth\'s physical round shape, and trace.',
          misconception: 'Students often believe that wall maps displayed in classrooms show true physical sizes, leading them to conclude that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Map distortion refers to the unavoidable alteration of spatial properties—specifically',
                  options: ['Map distortion refers to the unavoidable alteration of spatial properties—specifically', 'A physical map uses a standardized international color convention to represent the relief', 'The Earth is an oblate spheroid (also described as a geoid), meaning it is a sphere', 'Unique physical features of each continent are the distinctive natural landforms, water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that wall maps displayed in classrooms show true physical sizes, leading them to conclude that Greenland is larger.' }
          ],
            remediations: { 'wall-maps-displayed-in-classrooms': { steps: ['**Globe Comparison:** Have the student inspect a physical 3D globe alongside a Mercator wall map.', '**Overlay Technique:** Provide transparent cutouts of high-latitude landmasses (Greenland) and low-latitude landmasses.', '**Physical Placement:** Place the cutout of Greenland over India on the globe to visually prove that India is larger.', 'Then place the same cutouts on the Mercator map to highlight the artificial visual magnification caused by.'] } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_6', difficulty: 'standard',
          question: 'Unique physical features of each continent are the distinctive natural.',
          hint: 'If stuck, revisit c8_geo_ch2_4 (Physical Maps: Reading Colours) and practice identifying.',
          misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a.',
          parts: [
                { id: 'a', prompt: 'Name the continent that has the world\'s longest mountain range (Andes), largest rainforest (Amazon), and the driest non-polar desert (Atacama).', answer: 'South America',
                  options: ['South America', 'Europe and Asia are separate continents'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a low, worn-down range.' },
                { id: 'b', prompt: 'On a blank world physical map, locate and label: (a) the Tibetan Plateau, (b) the Congo Basin, (c) the Canadian Shield, (d) the Great Artesian Basin.', answer: 'the Tibetan Plateau, (',
                  options: ['the Tibetan Plateau, (', 'Europe and Asia are separate continents'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a low, worn-down range.' }
          ],
            remediations: { 'europe-and-asia-are-separate': { steps: ['Use a physical world map (from c8_geo_ch2_4) and trace the actual Ural Mountains - observe they are low (avg 600m).', 'Overlay a tectonic plate map - see Europe and Asia share the Eurasian Plate.', 'Compare physical feature lists side-by-side for Europe vs. Asia using a table.', 'Identify which features are truly unique to each (e.g., Tibetan Plateau only in Asia, North European Plain only in.', 'Conclude that continental boundaries here are cultural, not physical.'] } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Antarctica\'s unique physical feature is its ice sheet, but if the ice melted, Antarctica would be just another mountainous continent.', answer: 'Inaccurate',
                  options: ['Inaccurate', 'Europe and Asia are separate continents'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Europe and Asia are separate continents because of the Ural Mountains" but miss that the Urals are a low, worn-down range.' }
          ],
            remediations: { 'europe-and-asia-are-separate': { steps: ['Use a physical world map (from c8_geo_ch2_4) and trace the actual Ural Mountains - observe they are low (avg 600m).', 'Overlay a tectonic plate map - see Europe and Asia share the Eurasian Plate.', 'Compare physical feature lists side-by-side for Europe vs. Asia using a table.', 'Identify which features are truly unique to each (e.g., Tibetan Plateau only in Asia, North European Plain only in.', 'Conclude that continental boundaries here are cultural, not physical.'] } } },
        { type: 'subpart', nodeId: 'c8_geo_ch2_7', difficulty: 'standard',
          question: 'The world\'s oceans form a vast, interconnected body of saline water covering.',
          hint: 'If stuck, review the physical world map showing continent outlines and identify the blue.',
          misconception: 'Students often believe that the five oceans are completely separated, isolated bodies of water separated by physical.',
          parts: [
                { id: 'a', prompt: 'Which is the largest and deepest ocean on Earth, containing the Mariana Trench?', answer: 'The Pacific Ocean is the largest and deepest ocean on Earth',
                  options: ['The Pacific Ocean is the largest and deepest ocean on Earth', 'Atlantic Ocean'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the five oceans are completely separated, isolated bodies of water separated by physical land barriers or.' }
          ],
            remediations: { 'the-five-oceans-are-completely': { steps: ['To correct this misunderstanding, have the student take a physical globe or a uninterrupted global map projection (such.', 'Ask them to trace a continuous line with a finger starting from Chennai in the Indian Ocean, passing south of Australia.', 'Reinforce that ocean names are human geographical boundaries designated for location reference, not physical walls.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
