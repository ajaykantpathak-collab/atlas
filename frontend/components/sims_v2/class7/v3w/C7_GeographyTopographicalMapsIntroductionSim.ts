import type { SimDef } from '../../engine/types';
import C7_GeographyTopographicalMapsIntroductionSim from '../../../simulations/c6_12/C7_GeographyTopographicalMapsIntroductionSim';

/** v3 wrapped master — C7_GeographyTopographicalMapsIntroductionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_geographytopographicalmapsintroductionsim: SimDef = {
    id: 'v3w_c7_geographytopographicalmapsintroductionsim',
    title: 'Physical Divisions of India: Mountains, Plains, Plateaus',
    subtitle: 'Covers the macro-level physical divisions of India (mountains, plains, plateaus, deserts,.',
    classLevel: 7, subject: 'geography', topic: 'Physical Divisions of India: Mountains, Plains, Plateaus',
    chapters: [],
    nodeIds: ['c7_geo_ch01_003', 'c7_geo_ch01_006', 'c7_geo_ch05_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you look at a relief map of India, you notice that the country is not a single uniform surface; it.', goal: 'Master Physical Divisions of India: Mountains, Plains, Plateaus.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The physical divisions of India refer to the.', text: 'The physical divisions of India refer to the broad structural landform units—namely the Northern Mountains, the Northern Plains, the Peninsular Plateau, the Indian Desert, the Coastal Plains, and the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_geo_ch01_003', title: 'The physical divisions of India refer.',
          scaffold: { problem: 'A geography student in Pune wishes to classify the local landform and determine whether it belongs to the Northern Plains or the Peninsular.',
            steps: [
            { text: 'Identify the geographical location (Pune, Maharashtra, in western peninsular India).' },
            { text: 'Examine the underlying rock structure and elevation (basaltic lava flows, elevated tableland well above sea level, far.' },
            { text: 'Compare characteristics against physical division definitions (Northern Plains are low-lying alluvial river basins;.' },
            { text: 'Conclude that the terrain is part of the Peninsular Plateau (specifically the Deccan Trap region).' },
            { text: 'Verify the classification by checking its position relative to the Vindhya and Satpura ranges and the absence of.', faded: true, blankAnswer: 'Pune is located in the Peninsular Plateau region,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch01_006', title: 'The Peninsular Plateau is a massive,.',
          scaffold: { problem: 'A farmer in Pune (Deccan Plateau) wants to understand why local rivers like the Bhima flow eastwards away from the nearby Arabian Sea, even.',
            steps: [
            { text: 'Identify the geographical location of Pune near the Western Ghats mountain range.' },
            { text: 'Recall the topography of the Deccan Plateau, noting that the Western Ghats form a high western rim that slopes gently.' },
            { text: 'Analyze the watershed principle where water flows downward from the highest elevation point (the crest of the Western.' },
            { text: 'Trace the path of rivers originating just east of the Western Ghats, observing that the eastward slope pulls drainage.' },
            { text: 'Conclude that proximity to a water body does not dictate river flow direction; elevation gradient and surface slope.', faded: true, blankAnswer: 'The Bhima river flows east because the Deccan Plateau tilts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch05_005', title: 'The Himalayan boundary between India.',
          scaffold: { problem: 'A reconnaissance team stationed near the Line of Actual Control in Ladakh needs to transport emergency medical supplies from a base camp at.',
            steps: [
            { text: 'Identify the geographical features involved—high altitude, steep vertical relief (1,700-meter elevation gain), and.' },
            { text: 'Apply physical principles of altitude—recognize that at 5,200 meters, atmospheric pressure drops significantly,.' },
            { text: 'Analyze the distance disparity—the road distance is more than double the air distance because switchbacks and hairpin.' },
            { text: 'Evaluate transport methods—heavy trucks struggle with steep inclines in thin air, making specialized high-altitude.' },
            { text: 'Conclude the logistical impact—mountain terrain dictates that supply lines are slow, weather-dependent, and require.', faded: true, blankAnswer: 'Logistics are severely constrained by extreme elevation.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_geo_ch01_006', title: 'Identify each idea',
          dissect: { specimen: 'Physical Divisions of India: Mountains, Plains, Plateaus', spots: [
            { id: 's1', label: 'The physical divisions of India', prompt: 'Which idea is this? — The physical divisions of India refer to the broad structural landform units—namely the.', answer: 'The physical divisions of India', options: ['The physical divisions of India', 'The Peninsular Plateau is a', 'The Himalayan boundary between India'] },
            { id: 's2', label: 'The Peninsular Plateau is a', prompt: 'Which idea is this? — The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline.', answer: 'The Peninsular Plateau is a', options: ['The Peninsular Plateau is a', 'The physical divisions of India', 'The Himalayan boundary between India'] },
            { id: 's3', label: 'The Himalayan boundary between India', prompt: 'Which idea is this? — The Himalayan boundary between India and China is a high-altitude physical frontier.', answer: 'The Himalayan boundary between India', options: ['The Himalayan boundary between India', 'The physical divisions of India', 'The Peninsular Plateau is a'] }
          ] } }
    ],
    explore: { component: C7_GeographyTopographicalMapsIntroductionSim, prompt: 'Explore the interactive — Physical Divisions of India: Mountains, Plains, Plateaus' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch01_003', difficulty: 'standard',
          question: 'The physical divisions of India refer to the broad structural landform.',
          hint: 'Review the physical map of India in the atlas, focusing on the color-coded elevation.',
          misconception: 'Students often think that all flat land in India belongs to the Northern Plains, failing to distinguish between the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The physical divisions of India refer to the broad structural landform units—namely the',
                  options: ['The physical divisions of India refer to the broad structural landform units—namely the', 'The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline', 'The Himalayan boundary between India and China is a high-altitude physical frontier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all flat land in India belongs to the Northern Plains, failing to distinguish between the alluvial Northern.' }
          ],
            remediations: { 'all-flat-land-in-india': { steps: ['To correct this misconception, guide the student to examine cross-sectional relief diagrams and contour maps of India.', 'Have them check two things: elevation above sea level (plateaus are elevated tablelands, plains are low-lying river.', 'Use a side-profile drawing to show that high-altitude flat areas are plateaus, while low-altitude flat areas near river.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_006', difficulty: 'standard',
          question: 'The Peninsular Plateau is a massive, triangular tableland composed of ancient.',
          hint: 'Review basic landform types (mountains vs. plains vs. plateaus) from Class 6 before.',
          misconception: 'Students often think that the entire Peninsular Plateau is a single, flat, uniform tableland that tilts exclusively.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline',
                  options: ['The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline', 'The physical divisions of India refer to the broad structural landform units—namely the', 'The Himalayan boundary between India and China is a high-altitude physical frontier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the entire Peninsular Plateau is a single, flat, uniform tableland that tilts exclusively toward the east.' }
          ],
            remediations: { 'the-entire-peninsular-plateau-is': { steps: ['To fix this, draw a quick cross-section sketch of India from north to south on a slate.', 'Draw the Vindhya range, drop a valley for the Narmada River, and then draw a massive step-up for the Deccan Plateau.', 'Label the northward-flowing rivers (Chambal, Betwa) in the northern section and the eastward-flowing rivers (Godavari,.'] } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_005', difficulty: 'standard',
          question: 'The Himalayan boundary between India and China is a high-altitude physical.',
          hint: 'Review node c6_geography_ch01_002 to refresh understanding of Himalayan landforms and.',
          misconception: 'Students often think the entire India-China border is a single, uniformly agreed-upon line across flat terrain, similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Himalayan boundary between India and China is a high-altitude physical frontier',
                  options: ['The Himalayan boundary between India and China is a high-altitude physical frontier', 'The physical divisions of India refer to the broad structural landform units—namely the', 'The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the entire India-China border is a single, uniformly agreed-upon line across flat terrain, similar to a fence between.' }
          ],
            remediations: { 'the-entire-india-china-border': { steps: ['To fix this, guide the student to examine a physical relief map of northern India in three distinct sections.', 'First, point out the high plateau of Ladakh in the west.', 'Second, look at the middle mountain passes.', 'Third, observe the eastern ranges bordering Arunachal Pradesh and the Brahmaputra valley.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
