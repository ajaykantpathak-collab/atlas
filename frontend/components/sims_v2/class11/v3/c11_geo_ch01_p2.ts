import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch01_p2: SimDef = {
    id: 'v3_c11_geo_ch01_p2',
    title: 'Geography as a Discipline · Part 2/2',
    subtitle: 'Trade map-recitation for the spatial questions that define the discipline.',
    classLevel: 11, subject: 'geography', topic: 'Geography as a Discipline · Part 2/2',
    chapters: ['c11_geo_ch01'],
    nodeIds: ['c11_geo_cbse_01_007', 'c11_geo_cbse_01_008', 'c11_geo_cbse_01_009', 'c11_geo_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geographer interrogating a landscape', intro: 'A school building, a road, a monsoon, a market — same scene, but geography asks the questions that connect them.', goal: 'Define geography\'s spatial perspective and separate physical, human and environmental geography.' },
    discovery: {
        question: 'Asked what geographers do, a student answers \'memorise capitals and make maps.\' What does the discipline actually do?',
        options: ['Ask where things are, why they\'re there, and what follows — maps are the tool, not the subject', 'Catalogue every river, mountain and capital for exams', 'Draw and colour maps of countries', 'Study only natural landscapes, never human activity'],
        answer: 'Ask where things are, why they\'re there, and what follows — maps are the tool, not the subject',
        hook: 'Google Maps shows terrain, cities and live traffic in one view — that integration of nature and humanity in space is the whole discipline.',
    },
    teaching: [
        { title: 'Relation of Geography with Natural Sciences (Physics, Geology)', text: 'Geography\'s relation with natural sciences refers to the interdisciplinary integration where physical geography employs principles of Physics (solar radiation, thermodynamics, atmospheric dynamics.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort a list of observations into natural and human, then reframe \'Delhi is at 28.6°N\' into the spatial questions geography actually asks.',
        labels: ['Relation of Geography with', 'Geography as an Integrating', 'Physical Geography and Its'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_007', title: 'Relation of Geography with Natural Sciences (Physics, Geology)',
          caseStudy: { intro: 'Stand on the Marina Beach in Chennai at noon in May and feel the intense heat on your skin — that is solar radiation (Physics) interacting with the coastal.',
            decisions: [{ prompt: 'Name the two specific laws of physics that directly explain why the equator receives more annual insolation than the poles, and state the.', options: [
                { text: 'Correct answer: (1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with', outcome: 'Correct answer: (1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with Lambert\'s.' },
                { text: 'distance from sun', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks".', reveals: 'geography-describes-places' },
                { text: 'volcanoes', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks".', reveals: 'geography-describes-places' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_008', title: 'Relation of Geography with Social Sciences (History, Economics)',
          caseStudy: { intro: 'Observe your city\'s old market area: notice how the narrow lanes follow a river or ridge line (geography), the wholesale shops cluster near the old railway.',
            decisions: [{ prompt: 'State the core difference between how a historian and a geographer would study the 1857 Revolt in the Gangetic plain.', options: [
                { text: 'A historian sequences events chronologically (Meerut → Delhi → Kanpur → Lucknow) focusing', outcome: 'A historian sequences events chronologically (Meerut → Delhi → Kanpur → Lucknow) focusing.' },
                { text: 'both study dates', outcome: 'Not quite — Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g.', reveals: 'students-treat-geography-influences-history' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_009', title: 'Geography as an Integrating Discipline',
          caseStudy: { intro: 'Observe the recurring water crisis in Maharashtra\'s Marathwada region every summer: wells dry up, tankers queue up, and crop failures trigger farmer distress.',
            decisions: [{ prompt: 'Define \'geography as an integrating discipline\' in one sentence and name the two broad categories of disciplines it integrates.', options: [
                { text: 'Correct answer: Geography as an integrating discipline is the spatial science that', outcome: 'Correct answer: Geography as an integrating discipline is the spatial science that synthesizes.' },
                { text: 'integration', outcome: 'Not quite — Students often think "integration" means geography *borrows* facts from other sciences (e.g.', reveals: 'integration-means-geography-borrows-facts' },
                { text: 'geography uses geology for rocks, economics for trade', outcome: 'Not quite — Students often think "integration" means geography *borrows* facts from other sciences (e.g.', reveals: 'integration-means-geography-borrows-facts' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_010', title: 'Physical Geography and Its Sub-fields (Geomorphology, Climatology)',
          caseStudy: { intro: 'Begin by asking students to observe the view from their classroom window or a recent trip: notice the shape of the land (hills, plains, river valleys) and the.',
            decisions: [{ prompt: 'Name the two primary sub-fields of Physical Geography discussed in this node and give one key process studied in each.', options: [
                { text: 'The two primary sub-fields are Geomorphology and Climatology', outcome: 'The two primary sub-fields are Geomorphology and Climatology. Geomorphology studies processes like.' },
                { text: 'mountains are just there, and climate happens to them', outcome: 'Not quite — Students often think Geomorphology and Climatology operate independently — e.g., "mountains are.', reveals: 'geomorphology-and-climatology-operate-independen' },
                { text: 'Oceanography or Biogeography', outcome: 'Not quite — Students often think Geomorphology and Climatology operate independently — e.g., "mountains are.', reveals: 'geomorphology-and-climatology-operate-independen' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a career fair, a junior says she won\'t pick geography because \'it\'s basically making maps and memorising capitals — everything\'s already mapped by satellites anyway.\' You\'re manning the geography stall.',
            decisions: [{ prompt: 'How do you show her what geographers actually do?', options: [
                { text: 'Reframe the subject: geography studies the Earth\'s surface as the home of humankind — asking \'where?\', \'why there?\', and \'with what consequences?\' Maps are tools for spatial analysis, not the subject itself. A geographer analyses spatial patterns — e.g., how monsoon rainfall patterns shape cropping patterns — integrating natural and human phenomena that other disciplines study separately.', outcome: 'She sees the shift: maps answer \'where\', but geography asks why the pattern is there and what follows from it — a perspective satellites feed but can\'t replace.' },
                { text: 'Agree partly — admit geography is mostly map-work, but argue maps are still a useful skill.', outcome: 'That surrenders the real point: atlases dominate earlier classes precisely because map-skills are easy to test, while the spatial-analytic framework is the discipline.', reveals: 'geography-is-mapmaking' },
                { text: 'Tell her geography evolved from primitive description to modern science, so old geography was maps but new geography is better science.', outcome: 'Chronology isn\'t progress: determinism, possibilism, probabilism were contextual responses to different research questions, not \'wrong → right → more right\'.', reveals: 'evolution-is-linear-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'Geography isn\'t where things are — it\'s why there, and what that placement does to everything else.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_007', difficulty: 'standard',
          question: 'Geography\'s relation with natural sciences refers to the interdisciplinary.',
          hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2) for geological mechanisms and.',
          misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.',
          parts: [
                { id: 'a', prompt: 'APPLY: Using the hypsometric formula ΔP/Δz = -ρg and the dry adiabatic lapse rate (DALR = 9.8°C/km), calculate the temperature at the summit of Doddabetta.', answer: 'Correct working: Step 1: Elevation difference = 2,637 - 400 = 2,237 m = 2.237 km',
                  options: ['Correct working: Step 1: Elevation difference = 2,637 - 400 = 2,237 m = 2.237 km', 'geography describes places, physics explains processes, geology studies rocks'],
                  hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2) for geological mechanisms and Class 9.',
                  misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.' }
          ],
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "The Indian monsoon is purely a thermal phenomenon driven by differential heating of land and sea; geological factors like the Himalaya and Tibetan.', answer: 'Correct evaluation: Statement is false',
                  options: ['Correct evaluation: Statement is false', 'geography describes places, physics explains processes, geology studies rocks'],
                  hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2) for geological mechanisms and Class 9.',
                  misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.' }
          ],
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_008', difficulty: 'standard',
          question: 'Geography\'s relationship with History examines how spatial factors (location.',
          hint: 'Revisit c11_geo_cbse_01_004 (Physical Geography branches) and c11_geo_cbse_01_005 (Human.',
          misconception: 'Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g., "monsoon causes Indian.',
          parts: [
                { id: 'a', prompt: 'Why does the Deccan Trap basalt region historically host fewer large empires than the Gangetic alluvium, despite both being in peninsular India?', answer: 'Basalt weathers into shallow, nutrient-poor regur (black cotton soil) with low',
                  options: ['Basalt weathers into shallow, nutrient-poor regur (black cotton soil) with low', 'Deccan is drier'],
                  hint: 'Revisit c11_geo_cbse_01_004 (Physical Geography branches) and c11_geo_cbse_01_005 (Human Geography.',
                  misconception: 'Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g., "monsoon causes Indian agriculture").' },
                { id: 'b', prompt: 'Using the concept of \'comparative advantage\', explain why the British established jute mills in Bengal (Hooghly) rather than in Punjab where jute was also.', answer: 'Step 1: Identify inputs',
                  options: ['Step 1: Identify inputs', 'British preference'],
                  hint: 'Revisit c11_geo_cbse_01_004 (Physical Geography branches) and c11_geo_cbse_01_005 (Human Geography.',
                  misconception: 'Students treat "geography influences history/economics" as a one-way deterministic arrow (e.g., "monsoon causes Indian agriculture").' }
          ],
            remediations: { 'students-treat-geography-influences-history': { steps: ['Draw a simple feedback loop diagram — Physical Geography → Historical Decision → Economic Outcome → Modified Geography.', 'Populate with the Punjab canal colony example above.', 'Identify the \'decision node\' where human agency intervenes (canal alignment, crop choice).', 'Practice with a new case — e.g., Delhi Metro (historical decision) → land value gradient change (economic) →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_009', difficulty: 'standard',
          question: 'Geography as an integrating discipline is the spatial science that synthesizes.',
          hint: 'Revisit the "Relation of Geography with Natural Sciences" and "Relation of Geography with.',
          misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Narmada Valley Project is an engineering project, not a geographical one." Using the integrating discipline framework, list three.', answer: 'Correct answer with steps: 1',
                  options: ['Correct answer with steps: 1', 'dam height', 'power generation', 'integration'],
                  hint: 'Revisit the "Relation of Geography with Natural Sciences" and "Relation of Geography with Social.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' },
                { id: 'b', prompt: 'Compare the 2015 Chennai floods and the 2022 Bengaluru floods.', answer: 'Correct answer: Chennai\'s flat coastal plain with natural backwater channels',
                  options: ['Correct answer: Chennai\'s flat coastal plain with natural backwater channels', 'climate change', 'poor drainage', 'integration'],
                  hint: 'Revisit the "Relation of Geography with Natural Sciences" and "Relation of Geography with Social.',
                  misconception: 'Students often think "integration" means geography *borrows* facts from other sciences (e.g., "geography uses geology for rocks, economics.' }
          ],
            remediations: { 'integration-means-geography-borrows-facts': { steps: ['Take the Marathwada drought case. Draw a 2x2 matrix on paper: rows = Physical / Human, columns = Factor / Process.', 'Fill physical row with: Factor = Basalt geology (low porosity), Process = High runoff + low recharge, Policy.', 'Fill human row with: Factor = Sugarcane cultivation, Process = Political economy of sugar cooperatives, Policy = Free.', 'Draw arrows showing feedback loops: Free electricity → more tubewells → deeper drilling → aquifer depletion → more.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_010', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that studies the natural features.',
          hint: 'If stuck, revisit Class 9 "Plate Tectonics" (c9_geo_ch1_2) for Geomorphology and "Global.',
          misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate.',
          parts: [
                { id: 'a', prompt: 'Name the two primary sub-fields of Physical Geography discussed in this node and give one key process studied in each.', answer: 'The two primary sub-fields are Geomorphology and Climatology',
                  options: ['The two primary sub-fields are Geomorphology and Climatology', 'mountains are just there, and climate happens to them', 'Oceanography or Biogeography', 'Geomorphology and Climatology operate independently'],
                  hint: 'If stuck, revisit Class 9 "Plate Tectonics" (c9_geo_ch1_2) for Geomorphology and "Global Wind.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' },
                { id: 'b', prompt: 'Explain why the windward side of the Western Ghats receives heavy rainfall while the leeward side remains relatively dry, using concepts from both.', answer: 'The Western Ghats act as a geomorphological barrier (orographic lift) forcing',
                  options: ['The Western Ghats act as a geomorphological barrier (orographic lift) forcing', 'mountains block rain', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'If stuck, revisit Class 9 "Plate Tectonics" (c9_geo_ch1_2) for Geomorphology and "Global Wind.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' },
                { id: 'c', prompt: 'A student claims that the Thar Desert exists solely because of low rainfall (climatology).', answer: 'The claim is incomplete',
                  options: ['The claim is incomplete', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'If stuck, revisit Class 9 "Plate Tectonics" (c9_geo_ch1_2) for Geomorphology and "Global Wind.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' }
          ],
            remediations: { 'geomorphology-and-climatology-operate-independen': { steps: ['Use a two-column table: Column A lists a landform (Himalayas, Western Ghats, Thar, Deccan Plateau); Column B lists.', 'Ask students to draw arrows showing *how the landform modifies the climate* and *how the climate shapes the landform*.', 'Then, have them trace the origin of the sediment in the Northern Plains back to Himalayan uplift and monsoon-driven.', 'This forces integration of the two sub-fields through cause-effect chains.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
