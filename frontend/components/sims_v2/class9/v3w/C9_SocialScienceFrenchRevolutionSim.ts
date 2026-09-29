import type { SimDef } from '../../engine/types';
import C9_SocialScienceFrenchRevolutionSim from '../../../simulations/c6_12/C9_SocialScienceFrenchRevolutionSim';

/** v3 wrapped master — C9_SocialScienceFrenchRevolutionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_socialsciencefrenchrevolutionsim: SimDef = {
    id: 'v3w_c9_socialsciencefrenchrevolutionsim',
    title: 'Seasons: Rotation, Revolution and the Sun\'s Position',
    subtitle: 'Covers the astronomical basis of seasons: rotation (day/night), revolution (year), axial.',
    classLevel: 9, subject: 'science', topic: 'Seasons: Rotation, Revolution and the Sun\'s Position',
    chapters: [],
    nodeIds: ['c9_geo_ch2_6', 'c9_geo_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe how the shadow of your school flagpole changes length and direction from June to December — it is.', goal: 'Master Seasons: Rotation, Revolution and the Sun\'s Position.' },
    discovery: {
        question: 'Calculate the approximate day length at 30°N latitude on the June Solstice (June 21), given that the Sun\'s declination is 23.5°N.',
        options: ['Step 1: Latitude = 30°N, Declination = 23.5°N', 'equal day/night everywhere or cannot apply the spherical geometry formula', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
        answer: 'Step 1: Latitude = 30°N, Declination = 23.5°N',
        hook: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.',
    },
    teaching: [
        { title: 'Seasons are the periodic changes in weather.', text: 'Seasons are the periodic changes in weather patterns caused by Earth\'s revolution around the Sun combined with its fixed axial tilt of 23.5°, which alters the Sun\'s apparent position (declination).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_geo_ch2_6', title: 'Seasons are the periodic changes in.',
          scaffold: { problem: 'A student in Delhi (28.6°N) observes the Sun\'s altitude at solar noon on December 22 (Winter Solstice).',
            steps: [
            { text: 'Identify the date — December 22 is Winter Solstice, when Sun\'s declination δ = -23.5° (Tropic of Capricorn).' },
            { text: 'Recall the solar altitude formula at solar noon: Altitude = 90° - |latitude - declination|.' },
            { text: 'Substitute values: Altitude = 90° - |28.6° - (-23.5°)| = 90° - 52.1° = 37.9°.' },
            { text: 'Compare with June Solstice altitude: 90° - |28.6° - 23.5°| = 84.9°.' },
            { text: 'Conclude: Low solar angle + short day length (calculated via hour angle formula) = less heating = winter.', faded: true, blankAnswer: 'Sun\'s altitude at solar noon in Delhi on Dec 22 = 37.9°..' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_9', title: 'Climate change refers to long-term.',
          scaffold: { problem: 'Using the CO₂ forcing formula, calculate the radiative forcing from pre-industrial (280 ppm) to 2023 (419 ppm).',
            steps: [
            { text: 'Identify the formula ΔF = 5.35 × ln(C/C₀) for CO₂ radiative forcing.' },
            { text: 'Substitute C = 419 ppm, C₀ = 280 ppm → ΔF = 5.35 × ln(419/280) = 5.35 × ln(1.496) ≈ 5.35 × 0.403 ≈ 2.16 W/m².' },
            { text: 'Calculate equilibrium warming ΔT = λ × ΔF = 0.8 × 2.16 ≈ 1.73°C.' },
            { text: 'Note observed warming is ~1.2°C (1850–1900 to 2023). Discrepancy = 0.53°C.' },
            { text: 'Explain: (a) Ocean thermal inertia delays full equilibrium response (~0.4°C unrealized warming).', faded: true, blankAnswer: 'CO₂ forcing ≈ 2.16 W/m²; equilibrium warming ≈ 1.73°C;.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_geo_ch2_9', title: 'Identify each idea',
          dissect: { specimen: 'Seasons: Rotation, Revolution and the Sun\'s Position', spots: [
            { id: 's1', label: 'Seasons are the periodic changes', prompt: 'Which idea is this? — Seasons are the periodic changes in weather patterns caused by Earth\'s revolution around.', answer: 'Seasons are the periodic changes', options: ['Seasons are the periodic changes', 'Climate change refers to long-term'] },
            { id: 's2', label: 'Climate change refers to long-term', prompt: 'Which idea is this? — Climate change refers to long-term shifts in global or regional temperature and weather.', answer: 'Climate change refers to long-term', options: ['Climate change refers to long-term', 'Seasons are the periodic changes'] }
          ] } }
    ],
    explore: { component: C9_SocialScienceFrenchRevolutionSim, prompt: 'Explore the interactive — Seasons: Rotation, Revolution and the Sun\'s Position' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch2_6', difficulty: 'standard',
          question: 'Seasons are the periodic changes in weather patterns caused by Earth\'s.',
          hint: 'Review Class 7 "Seasons in India" (c7_geo_ch03_002) and Class 8 "Earth as an Oblate.',
          misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate day length at 30°N latitude on the June Solstice (June 21), given that the Sun\'s declination is 23.5°N.', answer: 'Step 1: Latitude = 30°N, Declination = 23.5°N',
                  options: ['Step 1: Latitude = 30°N, Declination = 23.5°N', 'equal day/night everywhere or cannot apply the spherical geometry formula', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' },
                { id: 'b', prompt: 'Compare the seasonal temperature range at 60°N (e.g., Oslo) versus 10°N (e.g., Chennai).', answer: 'At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)',
                  options: ['At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)', 'distance from equator', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' }
          ],
            remediations: { 'earth-is-closer-to-the': { steps: ['Show a diagram of Earth\'s orbit with correct perihelion/aphelion dates labeled.', 'Have students calculate solar constant at perihelion (1412 W/m²) vs. aphelion (1321 W/m²) — only 7% difference.', 'Compare with solar angle change: at 30°N, noon Sun altitude is 83.5° in June vs.', 'Conclude distance effect is minor; tilt effect is dominant.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.',
          parts: [
                { id: 'a', prompt: 'Compare the seasonal temperature range at 60°N (e.g., Oslo) versus 10°N (e.g., Chennai).', answer: 'At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)',
                  options: ['At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)', 'distance from equator', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' }
          ],
            remediations: { 'earth-is-closer-to-the': { steps: ['Show a diagram of Earth\'s orbit with correct perihelion/aphelion dates labeled.', 'Have students calculate solar constant at perihelion (1412 W/m²) vs. aphelion (1321 W/m²) — only 7% difference.', 'Compare with solar angle change: at 30°N, noon Sun altitude is 83.5° in June vs.', 'Conclude distance effect is minor; tilt effect is dominant.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
