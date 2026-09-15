import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch11_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch11_p2: SimDef = {
    id: 'v3_c11_geo_ch11_p2',
    title: 'Natural Hazards and Disasters · Part 2/2',
    subtitle: 'Split the event from its impact — and see why small quakes kill and big ones don\'t.',
    classLevel: 11, subject: 'geography', topic: 'Natural Hazards and Disasters · Part 2/2',
    chapters: ['c11_geo_ch11'],
    nodeIds: ['c11_geo_cbse_11_007', 'c11_geo_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disaster-risk analyst comparing two identical storms', intro: 'Same cyclone, two districts: one empties into shelters, one has kutcha roofs and no warning. Predict where the \'natural\' disaster lives.', goal: 'Distinguish hazard from disaster and analyse vulnerability in Indian seismic and cyclone contexts.' },
    discovery: {
        question: 'An M8.0 earthquake shakes the empty Central Indian Ocean; an M5.5 hits a dense, unprepared town. Which one is the disaster?',
        options: ['The M5.5 — disaster is hazard meeting vulnerability, not magnitude alone', 'The M8.0 — bigger is always worse', 'Both equally — an earthquake is a disaster by definition', 'Neither — disasters require casualties in the thousands'],
        answer: 'The M5.5 — disaster is hazard meeting vulnerability, not magnitude alone',
        hook: 'Bhuj 2001 and an identical quake under open ocean are the same event — one became a disaster because people, houses and unpreparedness stood in its way.',
    },
    teaching: [
        { title: 'Cyclones: Tropical Cyclones in India (Bay of Bengal vs Arabian Sea)', text: 'Tropical cyclones in India are intense low-pressure systems forming over warm tropical oceans (Bay of Bengal and Arabian Sea) with sustained winds ≥ 62 km/h, characterized by a warm core, spiral.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Score two regions hit by an identical cyclone for exposure, vulnerability and coping capacity, then read India\'s seismic zone map beyond \'history of past quakes.\'',
        labels: ['Cyclones: Tropical Cyclones', 'Disaster Management: Mitigation, Preparedness'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_008', title: 'Disaster Management: Mitigation, Preparedness and Response',
          caseStudy: { intro: 'Imagine you live in a coastal village in Odisha that faces cyclones every year.',
            decisions: [{ prompt: 'Define \'mitigation\' in the context of disaster management and give one structural and one non-structural measure for earthquake risk.', options: [
                { text: 'Mitigation refers to measures taken to reduce or eliminate the long-term risk to life and', outcome: 'Mitigation refers to measures taken to reduce or eliminate the long-term risk to life and property.' },
                { text: 'confuses mitigation with preparedness (e', outcome: 'Not quite — Students often think disaster management is only about post-disaster relief (distributing food.', reveals: 'disaster-management-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After a magnitude 8 earthquake in the empty mid-ocean makes headlines, a classmate says: \'Huge quake — that was a major disaster.\' Meanwhile, planning for Delhi, an official argues: \'Delhi hasn\'t had a big quake in living memory, so it doesn\'t belong in a high seismic zone.\'',
            decisions: [{ prompt: 'What do both speakers get wrong about hazards, disasters and zoning?', options: [
                { text: 'Split hazard from disaster: the mid-ocean quake is a hazard but not a disaster — disaster requires the event to hit exposed, vulnerable settlement (a magnitude 5.5 under an unprepared city like Latur 1993 is a disaster). And seismic zones aren\'t just quake history: zonation weighs maximum credible earthquakes on known faults, geological structure and site amplification — Delhi\'s Zone IV reflects capability, not memory.', outcome: 'The key maxim lands: hazards are inevitable, disasters are largely made by our choices — magnitude alone doesn\'t define either.' },
                { text: 'Agree with the classmate — an 8.0 quake is a disaster by definition; size is what matters.', outcome: 'Magnitude measures the hazard, not the disaster: without vulnerable people and buildings in its path, there is no disaster to count.', reveals: 'big-hazard-equals-disaster' },
                { text: 'Back the official — zone maps should follow recorded quakes, and Delhi\'s record is quiet.', outcome: 'Zones map potential, not just history: faults like Mahendragarh–Dehradun can deliver Mw 7+ even where written records are thin — that\'s why Delhi sits in Zone IV.', reveals: 'zones-follow-history-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_008', title: 'You made it',
          caseStudy: { intro: 'The hazard is nature\'s; the disaster is ours — risk = hazard × vulnerability × exposure.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_007', difficulty: 'standard',
          question: 'Tropical cyclones in India are intense low-pressure systems forming over warm.',
          hint: 'If stuck, revisit Class 9 Chapter 2 (Atmosphere) sections on pressure belts, wind.',
          misconception: 'Students often believe that the Arabian Sea produces more cyclones because it is larger, or that cyclones only occur.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tropical cyclones in India are intense low-pressure systems forming over warm tropical',
                  options: ['Tropical cyclones in India are intense low-pressure systems forming over warm tropical', 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone)', 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s crust that', 'A tsunami is a series of long-wavelength, long-period ocean waves generated by the sudden'],
                  hint: 'If stuck, revisit Class 9 Chapter 2 (Atmosphere) sections on pressure belts, wind systems, and the.',
                  misconception: 'Students often believe that the Arabian Sea produces more cyclones because it is larger, or that cyclones only occur during the monsoon.' }
          ],
            remediations: { 'the-arabian-sea-produces-more': { steps: ['Plot the last 10 years’ cyclone tracks from IMD data on a blank map of the Indian Ocean — use red for Bay of Bengal.', 'Count systems per basin per month; create a bar graph.', 'Overlay monthly mean wind shear (200–850 hPa) and SST charts from NOAA/ESRL.', 'Observe the inverse relationship between shear and cyclone count during June–September.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_008', difficulty: 'standard',
          question: 'Disaster management is the systematic process of planning, organizing, and.',
          hint: 'If stuck, revisit the hazard-specific node for the disaster most relevant to your region.',
          misconception: 'Students often think disaster management is only about post-disaster relief (distributing food, blankets).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Disaster management is the systematic process of planning, organizing, and implementing',
                  options: ['Disaster management is the systematic process of planning, organizing, and implementing', 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone)', 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s crust that', 'A tsunami is a series of long-wavelength, long-period ocean waves generated by the sudden'],
                  hint: 'If stuck, revisit the hazard-specific node for the disaster most relevant to your region (e.g.',
                  misconception: 'Students often think disaster management is only about post-disaster relief (distributing food, blankets).' }
          ],
            remediations: { 'disaster-management-is-only-about': { steps: ['Show the Odisha cyclone mortality comparison (1999 vs 2013) using a simple bar chart.', 'Ask students to list what changed—guide them to identify shelters, early warnings, community volunteers.', 'Map these to the disaster management cycle phases.', 'Have students interview a local disaster management official or volunteer to see pre-disaster activities.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
