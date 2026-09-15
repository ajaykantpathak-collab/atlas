import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch08_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch08_p2: SimDef = {
    id: 'v3_c11_geo_ch08_p2',
    title: 'Introduction to India · Part 2/2',
    subtitle: 'Locate India\'s true extremes and see what 30° of longitude does to a single clock.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to India · Part 2/2',
    chapters: ['c11_geo_ch08'],
    nodeIds: ['c11_geo_cbse_08_007', 'c11_geo_cbse_08_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a map-reader correcting the usual mistakes', intro: 'Same IST on every phone from Gujarat to Arunachal — but the sun disagrees by almost two hours.', goal: 'State India\'s latitudinal and longitudinal extent and analyse its boundary and time-zone implications.' },
    discovery: {
        question: 'Quick: India\'s southernmost point — Kanyakumari, right?',
        options: ['No — Indira Point in the Andaman & Nicobar Islands, at 6°45\'N, lies well south of Kanyakumari\'s 8°4\'N', 'Yes — the tip of the mainland is the southernmost point', 'Yes — islands never count for extent', 'No — it\'s actually Kibithu in Arunachal'],
        answer: 'No — Indira Point in the Andaman & Nicobar Islands, at 6°45\'N, lies well south of Kanyakumari\'s 8°4\'N',
        hook: 'The mainland answer is the classic trap — India\'s territory reaches far past its coastline.',
    },
    teaching: [
        { title: 'India\'s Coastline Length and Maritime Significance', text: 'India\'s coastline extends approximately 7,516.6 km (including mainland 6,100 km and island territories 1,416.6 km) along the Arabian Sea to the west, Bay of Bengal to the east, and Indian Ocean.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Convert the 30° longitudinal span into nearly two hours of solar time, then weigh whether one IST still serves a country that wide.',
        labels: ['India\'s Coastline Length', 'India: Location in'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_08_007', title: 'India\'s Coastline Length and Maritime Significance',
          scaffold: { problem: 'A student measures the mainland coastline on a 1:10,000,000 scale map using a divider set to 0.5 cm steps.',
            steps: [
            { text: 'Convert divider steps to map distance: Western = 42 × 0.5 cm = 21 cm; Eastern = 58 × 0.5 cm = 29 cm' },
            { text: 'Apply scale factor: 1 cm = 100 km (since 1:10,000,000 = 1 cm = 100 km).' },
            { text: 'Total mainland = 2,100 + 2,900 = 5,000 km (note: less than NCERT 6,100 km due to 0.5 cm step size missing smaller.' },
            { text: 'Western percentage = (2,100/5,000)×100 = 42%' },
            { text: 'Straight-line distance (Gujarat to Kerala vs West Bengal to Tamil Nadu) shows western coast ~1,400 km, eastern ~1,700.', faded: true, blankAnswer: 'Mainland coastline ≈ 5,000 km (at this measurement.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_08_008', title: 'India: Location in the Eastern and Northern Hemispheres',
          scaffold: { problem: 'A student in New Delhi (28°36\'N, 77°12\'E) wants to know the local solar time difference between New Delhi and the Standard Meridian.',
            steps: [
            { text: 'Identify the longitude of New Delhi (77°12\'E) and the Standard Meridian (82°30\'E).' },
            { text: 'Calculate the longitudinal difference: 82°30\'E - 77°12\'E = 5°18\' = 5.3°.' },
            { text: 'Convert longitudinal difference to time difference: 5.3° × 4 minutes/degree = 21.2 minutes.' },
            { text: 'Since New Delhi is west of the Standard Meridian, local solar time at New Delhi is behind IST by about 21 minutes.' },
            { text: 'Interpret: This means when IST shows 12:00 noon, the sun at New Delhi is at its highest point around 12:21 PM local.', faded: true, blankAnswer: 'New Delhi\'s local solar time is approximately 21 minutes.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a quiz prep session, your teammate writes: \'Kanyakumari is India\'s southernmost point; the Tropic of Cancer cuts India through the middle; and India shares no border with Afghanistan — look at the map.\'',
            decisions: [{ prompt: 'Which of the three statements survive checking?', options: [
                { text: 'None fully: India\'s southernmost point is Indira Point (6°45\'N) in the Nicobars, not Kanyakumari. The Tropic of Cancer (23°30\'N) sits slightly north of India\'s latitudinal midpoint (~22°35\'N) — the map\'s \'middle\' is an illusion. And the Afghanistan boundary (~106 km) is real but lies in Gilgit-Baltistan along the Wakhan Corridor — legally Indian territory under Pakistan\'s de facto control.', outcome: 'All three \'obvious\' facts get corrected — and the Afghanistan case shows why boundaries are geopolitical interfaces, not just drawn lines.' },
                { text: 'All three are fine — the map shows them plainly enough.', outcome: 'Map-reading habits hide the traps: Indira Point off the mainland edge, the Tropic off-centre, and PoK\'s shaded boundary masking the Afghan frontier.', reveals: 'map-shows-everything' },
                { text: 'Only fix the first two — the Afghanistan border really is a myth since no road connects the two countries.', outcome: 'No physical connection doesn\'t erase the boundary: the 106 km segment exists legally via the Instrument of Accession — it\'s under PoK control, not non-existent.', reveals: 'afghanistan-border-is-myth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_008', title: 'You made it',
          caseStudy: { intro: 'One clock for 3,000 km of sunrise — geography supplies the two-hour gap; administration decides who absorbs it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_007', difficulty: 'standard',
          question: 'India\'s coastline extends approximately 7,516.6 km (including mainland 6,100.',
          hint: 'Revisit Class 6 "Coastal Plains: Eastern and Western Seaboards" (c6_geography_ch01_005).',
          misconception: 'Students believe India\'s coastline is a single continuous length measured in a straight line from Gujarat to West.',
          parts: [
                { id: 'a', prompt: 'What is the total coastline length of India including island territories, and which two water bodies border the mainland on the east and west?', answer: 'Total coastline: 7,516.6 km (mainland 6,100 km + islands 1,416.6 km)',
                  options: ['Total coastline: 7,516.6 km (mainland 6,100 km + islands 1,416.6 km)', 'coastline length', 'coastal state count'],
                  hint: 'Revisit Class 6 "Coastal Plains: Eastern and Western Seaboards" (c6_geography_ch01_005) and Class 7.',
                  misconception: 'Students believe India\'s coastline is a single continuous length measured in a straight line from Gujarat to West Bengal, ignoring that.' }
          ],
            remediations: { 'india-s-coastline-is-a': { steps: ['Use a divider and string on a 1:5,000,000 map to measure coastline at two scales (1 cm and 0.5 cm step) - demonstrate.', 'Overlay transparency of Andaman & Nicobar and Lakshadweep on mainland map - visually compare island coastline.', 'Trace western coast estuaries (Zuari, Mandovi, Netravati) vs eastern coast deltas (Godavari, Krishna, Mahanadi) - count.', 'Recalculate total using measured segments + island perimeters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_008', difficulty: 'standard',
          question: 'India lies entirely in the Northern Hemisphere (between 8°4\'N and 37°6\'N.',
          hint: 'If stuck, revisit Class 7 Geography Chapter 1 (India\'s Location: Latitude, Longitude and.',
          misconception: 'Students often think that because India is in the Eastern Hemisphere, it is entirely in the Eastern Hemisphere relative.',
          parts: [
                { id: 'a', prompt: 'State the latitudinal and longitudinal extent of India in degrees and minutes, and name the hemispheres in which India lies.', answer: 'India extends from 8°4\'N to 37°6\'N latitude and 68°7\'E to 97°25\'E longitude',
                  options: ['India extends from 8°4\'N to 37°6\'N latitude and 68°7\'E to 97°25\'E longitude', 'Southern Hemisphere or wrong coordinates'],
                  hint: 'If stuck, revisit Class 7 Geography Chapter 1 (India\'s Location: Latitude, Longitude and Extent).',
                  misconception: 'Students often think that because India is in the Eastern Hemisphere, it is entirely in the Eastern Hemisphere relative to the Prime.' }
          ],
            remediations: { 'because-india-is-in-the': { steps: ['Have the student plot India\'s coordinates on a world map grid, marking the Equator and Prime Meridian.', 'Use a globe to show that all of India (including Andaman & Nicobar) lies north of the Equator and east of the Prime.', 'Highlight the Tropic of Cancer crossing India at 23°30\'N, and clarify that the Tropic of Capricorn is in the Southern.', 'Practice identifying hemispheres for other countries to reinforce the concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
