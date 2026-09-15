import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch11_p1: SimDef = {
    id: 'v3_c11_geo_ch11_p1',
    title: 'Natural Hazards and Disasters · Part 1/2',
    subtitle: 'Split the event from its impact — and see why small quakes kill and big ones don\'t.',
    classLevel: 11, subject: 'geography', topic: 'Natural Hazards and Disasters · Part 1/2',
    chapters: ['c11_geo_ch11'],
    nodeIds: ['c11_geo_cbse_11_001', 'c11_geo_cbse_11_002', 'c11_geo_cbse_11_003', 'c11_geo_cbse_11_004', 'c11_geo_cbse_11_005', 'c11_geo_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disaster-risk analyst comparing two identical storms', intro: 'Same cyclone, two districts: one empties into shelters, one has kutcha roofs and no warning. Predict where the \'natural\' disaster lives.', goal: 'Distinguish hazard from disaster and analyse vulnerability in Indian seismic and cyclone contexts.' },
    discovery: {
        question: 'An M8.0 earthquake shakes the empty Central Indian Ocean; an M5.5 hits a dense, unprepared town. Which one is the disaster?',
        options: ['The M5.5 — disaster is hazard meeting vulnerability, not magnitude alone', 'The M8.0 — bigger is always worse', 'Both equally — an earthquake is a disaster by definition', 'Neither — disasters require casualties in the thousands'],
        answer: 'The M5.5 — disaster is hazard meeting vulnerability, not magnitude alone',
        hook: 'Bhuj 2001 and an identical quake under open ocean are the same event — one became a disaster because people, houses and unpreparedness stood in its way.',
    },
    teaching: [
        { title: 'Natural Hazards vs Natural Disasters: Distinction and Classification', text: 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone) that *poses a threat* to life, property, or the environment; a natural disaster is the *realized impact* of that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Score two regions hit by an identical cyclone for exposure, vulnerability and coping capacity, then read India\'s seismic zone map beyond \'history of past quakes.\'',
        labels: ['Natural Hazards vs Natural', 'Earthquakes: Causes and Seismic', 'Tsunami: Causes, Mechanism', 'Floods: Causes and Flood-Prone', 'Droughts: Types (Meteorological, Hydrological,', 'Landslides: Causes and Vulnerable'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_001', title: 'Natural Hazards vs Natural Disasters: Distinction and Classification',
          caseStudy: { intro: 'Begin with a real-world observation: show two photographs — one of the 2001 Bhuj earthquake devastation (collapsed buildings, casualties) and another of.',
            decisions: [{ prompt: 'Define "natural hazard" and "natural disaster" in your own words, and state the single most critical factor that converts a hazard into.', options: [
                { text: 'A natural hazard is a potentially damaging physical event (e.g., earthquake, cyclone)', outcome: 'A natural hazard is a potentially damaging physical event (e.g., earthquake, cyclone); a natural.' },
                { text: 'magnitude of the event', outcome: 'Not quite — Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a.', reveals: 'natural-disaster-is-a-synonym' },
                { text: 'natural disaster', outcome: 'Not quite — Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a.', reveals: 'natural-disaster-is-a-synonym' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_002', title: 'Earthquakes: Causes and Seismic Zones of India',
          scaffold: { problem: 'The 2001 Bhuj earthquake (Mw 7.7) ruptured a 100 km × 20 km fault patch with average slip of 5 m. Shear modulus μ = 3×10¹⁰ Pa.',
            steps: [
            { text: 'Identify given values — rupture length L = 100 km = 100,000 m, width W = 20 km = 20,000 m, slip D = 5 m, μ = 3×10¹⁰ Pa.' },
            { text: 'Calculate rupture area A = L × W = 100,000 × 20,000 = 2×10⁹ m².' },
            { text: 'Compute seismic moment M₀ = μ × A × D = (3×10¹⁰) × (2×10⁹) × 5 = 3×10²⁰ N·m.' },
            { text: 'Apply moment magnitude formula: Mw = (2/3) log₁₀(M₀) - 6.0 = (2/3) log₁₀(3×10²⁰) - 6.0 = (2/3) × (log₁₀3 + 20) - 6.0.' },
            { text: 'Interpret — Mw 7.7 matches reported value; confirms large slip on a moderately sized fault in an intraplate setting.', faded: true, blankAnswer: 'M₀ = 3×10²⁰ N·m; Mw = 7.65 ≈ 7.7. The calculation verifies.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_003', title: 'Tsunami: Causes, Mechanism and Impact on Coasts',
          scaffold: { problem: 'A tsunami originates at the Andaman-Sumatra trench (water depth 4500 m).',
            steps: [
            { text: 'Calculate wave speed using shallow-water formula c = √(gD) = √(9.8 × 4500) = √44100 = 210 m/s = 756 km/h.' },
            { text: 'Convert period to seconds: T = 20 min × 60 = 1200 s. Calculate wavelength: λ = c × T = 210 × 1200 = 252,000 m = 252 km.' },
            { text: 'Travel time to Visakhapatnam: t = 1200 km / 756 km/h = 1.587 hours = 1 hour 35 minutes.' },
            { text: 'Wave steepness (H/λ) in deep ocean: typical tsunami height H = 0.5 m, so H/λ = 0.5/252,000 = 2×10⁻⁶ — extremely gentle.' },
            { text: 'Interpret: The wave passes a ship as a gentle 20-minute rise and fall of 0.5 m — indistinguishable from normal swell.', faded: true, blankAnswer: 'Speed = 756 km/h, Wavelength = 252 km, Travel time = 1.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_004', title: 'Floods: Causes and Flood-Prone Areas of India',
          caseStudy: { intro: 'Begin by asking students to recall the 2023 floods in Himachal Pradesh or the 2018 Kerala floods – events they may have seen in news.',
            decisions: [{ prompt: 'Name the three major river basins in India that are most prone to flooding and the primary meteorological cause for each.', options: [
                { text: 'The three major flood-prone river basins are: (1) Ganga Basin – caused by heavy southwest', outcome: 'The three major flood-prone river basins are: (1) Ganga Basin – caused by heavy southwest monsoon.' },
                { text: 'heavy rain', outcome: 'Not quite — Students often think floods in India are caused only by “heavy rainfall” and that all flood-prone.', reveals: 'floods-in-india-are-caused' },
                { text: 'heavy rainfall', outcome: 'Not quite — Students often think floods in India are caused only by “heavy rainfall” and that all flood-prone.', reveals: 'floods-in-india-are-caused' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_005', title: 'Droughts: Types (Meteorological, Hydrological, Agricultural) and Prone Areas',
          scaffold: { problem: 'The IMD normal rainfall for the Marathwada subdivision (Jun-Sep) is 680 mm. In 2023, the subdivision received 408 mm.',
            steps: [
            { text: 'Identify the normal (LPA) and actual rainfall for the season.' },
            { text: 'Apply the rainfall departure formula: (408 - 680) / 680 × 100 = -40%.' },
            { text: 'Compare with IMD categories: -26% to -50% = Moderate Meteorological Drought.' },
            { text: 'Explain that a 40% deficit reduces runoff and recharge; reservoirs enter the kharif season with lower carryover storage.' },
            { text: 'If Year 2 also has a deficit, cumulative storage depletion pushes the system into hydrological drought even if Year 2.' },
            { text: 'Conclude that multi-year deficits are the primary driver of severe hydrological drought in hard-rock aquifer regions.', faded: true, blankAnswer: 'Moderate Meteorological Drought (-40% departure). Continued.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_006', title: 'Landslides: Causes and Vulnerable Zones in Himalayas',
          scaffold: { problem: 'A debris slide occurs on a 30° slope in the Shiwaliks (sandstone-mudstone sequence) after 150 mm rainfall in 24 hours.',
            steps: [
            { text: 'Identify given parameters: β=30°, z=3m, γ_sat=19 kN/m³, c\'=5 kPa, φ\'=25°, γ_w=9.81 kN/m³.' },
            { text: 'Compute denominator (driving stress): γ_sat * z * sinβ * cosβ = 19 * 3 * 0.5 * 0.866 = 24.65 kPa.' },
            { text: 'Compute numerator for saturated case (m=1): c\' + (γ_sat - γ_w * m) * z * cos²β * tanφ\' = 5 + (19 - 9.81*1) * 3 * 0.75 *.' },
            { text: 'FoS_saturated = 14.64 / 24.65 = 0.59 (<1, failure).' },
            { text: 'Compute numerator for drained case (m=0): 5 + (19 - 0) * 3 * 0.75 * 0.466 = 5 + 19 * 1.0485 = 5 + 19.92 = 24.92 kPa.' },
            { text: 'FoS_drained = 24.92 / 24.65 = 1.01 (>1, stable).', faded: true, blankAnswer: 'FoS_saturated = 0.59 (Unstable), FoS_drained = 1.01.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After a magnitude 8 earthquake in the empty mid-ocean makes headlines, a classmate says: \'Huge quake — that was a major disaster.\' Meanwhile, planning for Delhi, an official argues: \'Delhi hasn\'t had a big quake in living memory, so it doesn\'t belong in a high seismic zone.\'',
            decisions: [{ prompt: 'What do both speakers get wrong about hazards, disasters and zoning?', options: [
                { text: 'Split hazard from disaster: the mid-ocean quake is a hazard but not a disaster — disaster requires the event to hit exposed, vulnerable settlement (a magnitude 5.5 under an unprepared city like Latur 1993 is a disaster). And seismic zones aren\'t just quake history: zonation weighs maximum credible earthquakes on known faults, geological structure and site amplification — Delhi\'s Zone IV reflects capability, not memory.', outcome: 'The key maxim lands: hazards are inevitable, disasters are largely made by our choices — magnitude alone doesn\'t define either.' },
                { text: 'Agree with the classmate — an 8.0 quake is a disaster by definition; size is what matters.', outcome: 'Magnitude measures the hazard, not the disaster: without vulnerable people and buildings in its path, there is no disaster to count.', reveals: 'big-hazard-equals-disaster' },
                { text: 'Back the official — zone maps should follow recorded quakes, and Delhi\'s record is quiet.', outcome: 'Zones map potential, not just history: faults like Mahendragarh–Dehradun can deliver Mw 7+ even where written records are thin — that\'s why Delhi sits in Zone IV.', reveals: 'zones-follow-history-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'The hazard is nature\'s; the disaster is ours — risk = hazard × vulnerability × exposure.',
            decisions: [{ prompt: 'What comes next? Natural Hazards and Disasters · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Natural Hazards and Disasters · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_001', difficulty: 'standard',
          question: 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 1 (c9_geo_ch1_12) "Natural Hazards.',
          misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is.',
          parts: [
                { id: 'a', prompt: 'The 2004 Indian Ocean tsunami was triggered by a megathrust earthquake off Sumatra.', answer: 'Primary hazard: geophysical (earthquake)',
                  options: ['Primary hazard: geophysical (earthquake)', 'geophysical', 'natural disaster', 'large natural hazard'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 (c9_geo_ch1_12) "Natural Hazards: Landslides, Floods.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' },
                { id: 'b', prompt: 'Analyze the statement: "The 2013 Uttarakhand floods were a natural disaster caused by unprecedented cloudburst." Identify two geographical inaccuracies in this.', answer: 'Inaccuracies: (1) "Natural disaster" implies the disaster itself is natural',
                  options: ['Inaccuracies: (1) "Natural disaster" implies the disaster itself is natural', 'natural disaster', 'large natural hazard', 'a big earthquake is a disaster, a small one is just a hazard'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 (c9_geo_ch1_12) "Natural Hazards: Landslides, Floods.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' }
          ],
            remediations: { 'natural-disaster-is-a-synonym': { steps: ['Revisit the Bhuj vs. Andaman Sea comparison in the Walkthrough.', 'On a blank India map, mark three locations: (i) high-hazard low-disaster (e.g., Andaman Sea), (ii) low-hazard.', 'For each, write one sentence using the formula: Disaster = Hazard × Vulnerability × Exposure / Capacity.', 'Explain orally to a peer why Latur (Zone III) caused more deaths than many Zone V events.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Classifying hazards into geophysical, hydrological, meteorological, climatological, and biological is merely academic; for disaster.', answer: 'Against',
                  options: ['Against', 'natural disaster', 'large natural hazard', 'a big earthquake is a disaster, a small one is just a hazard'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 (c9_geo_ch1_12) "Natural Hazards: Landslides, Floods.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' },
                { id: 'b', prompt: 'Design a one-page "Hazard Profile Card" template that a District Disaster Management Authority could use to summarize the hazard-disaster distinction for any.', answer: 'Template filled for Kendrapara, Odisha: (a) Cyclone & storm surge',
                  options: ['Template filled for Kendrapara, Odisha: (a) Cyclone & storm surge', 'natural disaster', 'large natural hazard', 'a big earthquake is a disaster, a small one is just a hazard'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 (c9_geo_ch1_12) "Natural Hazards: Landslides, Floods.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' }
          ],
            remediations: { 'natural-disaster-is-a-synonym': { steps: ['Revisit the Bhuj vs. Andaman Sea comparison in the Walkthrough.', 'On a blank India map, mark three locations: (i) high-hazard low-disaster (e.g., Andaman Sea), (ii) low-hazard.', 'For each, write one sentence using the formula: Disaster = Hazard × Vulnerability × Exposure / Capacity.', 'Explain orally to a peer why Latur (Zone III) caused more deaths than many Zone V events.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_002', difficulty: 'standard',
          question: 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s.',
          hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) — specifically.',
          misconception: 'Students believe seismic zones are determined ONLY by historical earthquake frequency — e.g., "Delhi hasn\'t had a big.',
          parts: [
                { id: 'a', prompt: 'Given: The 1905 Kangra earthquake (Mw 7.8) occurred in the Himalayan Seismic Zone. The 2001 Bhuj earthquake (Mw 7.7) occurred in the Kutch Rift.', answer: 'Kangra: Himalayan convergence (India plate underthrusting Eurasia) generates N-S',
                  options: ['Kangra: Himalayan convergence (India plate underthrusting Eurasia) generates N-S', 'both thrust faults', 'Delhi hasn\'t had a big quake, so it shouldn\'t be Zone IV', 'seismic zones are determined ONLY by historical earthquake frequency'],
                  hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) — specifically.',
                  misconception: 'Students believe seismic zones are determined ONLY by historical earthquake frequency — e.g., "Delhi hasn\'t had a big quake, so.' }
          ],
            remediations: { 'seismic-zones-are-determined-only': { steps: ['Show the IS 1893 zonation map alongside a tectonic map of India (faults, rifts, thrusts).', 'Overlay historical earthquakes (dots sized by magnitude).', 'Trace Zone V boundaries — match Himalayan thrusts, Kutch Rift, Andaman subduction.', 'Highlight Zone IV — Indo-Gangetic Plain (basin amplification), Delhi region (ridge faults), Koyna (reservoir-induced).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_003', difficulty: 'standard',
          question: 'A tsunami is a series of long-wavelength, long-period ocean waves generated.',
          hint: 'Revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) focusing on the India-Burma.',
          misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10.',
          parts: [
                { id: 'a', prompt: 'Define a tsunami and state its primary cause in the Indian Ocean context.', answer: 'A tsunami is a series of long-wavelength ocean waves caused by sudden vertical',
                  options: ['A tsunami is a series of long-wavelength ocean waves caused by sudden vertical', 'tsunamis are caused by high winds', 'they are tidal waves', 'a 10 m tsunami means 10 m high waves at sea'],
                  hint: 'Revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) focusing on the India-Burma plate.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10.' },
                { id: 'b', prompt: 'Explain why a tsunami wave that is only 0.5 metres high in the open ocean can become a 10-metre wall of water at the coast.', answer: 'In deep water, tsunami wavelength (λ) is 100-200 km and wave height (H) is small',
                  options: ['In deep water, tsunami wavelength (λ) is 100-200 km and wave height (H) is small', 'waves slowing down', 'a 10 m tsunami means 10 m high waves at sea', 'tsunami wave height in the open ocean is similar to its coastal run-up height (e'],
                  hint: 'Revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) focusing on the India-Burma plate.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10.' },
                { id: 'c', prompt: 'Compare the tsunami vulnerability of the Andaman & Nicobar Islands versus the Gujarat coast. Consider tectonic setting, bathymetry, and historical events.', answer: 'Andaman & Nicobar Islands: Directly on the Andaman-Sumatra subduction zone',
                  options: ['Andaman & Nicobar Islands: Directly on the Andaman-Sumatra subduction zone', 'a 10 m tsunami means 10 m high waves at sea', 'tsunami wave height in the open ocean is similar to its coastal run-up height (e'],
                  hint: 'Revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) focusing on the India-Burma plate.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10.' }
          ],
            remediations: { 'tsunami-wave-height-in-the': { steps: ['Use a wave tank demonstration (or video) showing a 1 cm paddle displacement generating a 10 cm run-up on a 1:10 slope.', 'Plot the 2004 tsunami travel-time contours from the Andaman source on an Indian Ocean map; have students calculate.', 'Contrast a storm surge map (e.g., Cyclone Amphan) with tsunami inundation map for the same coast — highlight different.', 'Assign a 150-word explanation: "Why a 2 cm signal on a deep-ocean BPR demands immediate evacuation even though the wave.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_004', difficulty: 'standard',
          question: 'Flood is an overflow of water onto normally dry land caused by excessive.',
          hint: 'Revise Class 9 river landforms (c9_geo_ch1_8) and Class 9 monsoon mechanism.',
          misconception: 'Students often think floods in India are caused only by “heavy rainfall” and that all flood-prone areas are similar.',
          parts: [
                { id: 'a', prompt: 'Given a rainfall map of India showing 300 mm/day over the Western Ghats and 150 mm/day over the Gangetic plains, which region is more likely to experience.', answer: 'The Western Ghats region is more likely to experience flash floods',
                  options: ['The Western Ghats region is more likely to experience flash floods', 'heavy rainfall'],
                  hint: 'Revise Class 9 river landforms (c9_geo_ch1_8) and Class 9 monsoon mechanism (c9_geo_ch2_7) using.',
                  misconception: 'Students often think floods in India are caused only by “heavy rainfall” and that all flood-prone areas are similar.' }
          ],
            remediations: { 'floods-in-india-are-caused': { steps: ['Show a comparative table of three flood types (riverine, flash, coastal) with columns: cause, duration, onset speed.', 'Use a sandbox model or digital simulation (e.g., stream table) to demonstrate how embankments raise bed level and.', 'Assign a map exercise: mark flood-prone areas and annotate with dominant cause (monsoon, cyclone, snowmelt, dam.', 'Discuss the Kosi 2008 avulsion as a case study of embankment failure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_005', difficulty: 'standard',
          question: 'Drought is a prolonged period of abnormally low precipitation leading to.',
          hint: 'Revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) and.',
          misconception: 'Students often treat "drought" as a single event defined only by low rainfall, ignoring that meteorological.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Drought is a prolonged period of abnormally low precipitation leading to a shortage of',
                  options: ['Drought is a prolonged period of abnormally low precipitation leading to a shortage of', 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone)', 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s crust that', 'A tsunami is a series of long-wavelength, long-period ocean waves generated by the sudden'],
                  hint: 'Revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) and Class 10.',
                  misconception: 'Students often treat "drought" as a single event defined only by low rainfall, ignoring that meteorological, hydrological, and agricultural.' }
          ],
            remediations: { 'students-often-treat-drought-as': { steps: ['Show a time-series graph of rainfall, reservoir level, and soil moisture for a district (e.g., Latur 2014-16).', 'Have students calculate the lag in months between rainfall recovery and reservoir recovery.', 'Assign a mini-case where they match reported impacts (crop failure, drinking water shortage, dry wells) to the correct.', 'Re-attempt Diagnostic Q2 and Q4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_006', difficulty: 'standard',
          question: 'A landslide is the rapid, gravity-driven downslope movement of a mass of rock.',
          hint: 'Revisit Class 9 \'Plate Tectonics\' (c9_geo_ch1_2) for Himalayan geodynamics, and Class 11.',
          misconception: 'Students believe landslides occur *only* during the monsoon and *only* on steep, bare slopes.',
          parts: [
                { id: 'a', prompt: 'Define \'landslide\' and distinguish it from \'soil creep\' in terms of velocity, moisture content, and visibility of movement.', answer: 'A landslide is a rapid, perceptible downslope movement of relatively dry',
                  options: ['A landslide is a rapid, perceptible downslope movement of relatively dry', 'landslides occur *only* during the monsoon and *only* on steep, bare slopes'],
                  hint: 'Revisit Class 9 \'Plate Tectonics\' (c9_geo_ch1_2) for Himalayan geodynamics, and Class 11.',
                  misconception: 'Students believe landslides occur *only* during the monsoon and *only* on steep, bare slopes.' },
                { id: 'b', prompt: 'A slope in the Shiwalik Himalayas has an angle of 35°. The material is weathered sandstone with cohesion c = 15 kPa and angle of internal friction φ = 28°.', answer: 'Step 1: Compute denominator γz sinβ cosβ = 20 × 3 × 0.574 × 0.819 = 28.18 kPa',
                  options: ['Step 1: Compute denominator γz sinβ cosβ = 20 × 3 × 0.574 × 0.819 = 28.18 kPa', 'landslides occur *only* during the monsoon and *only* on steep, bare slopes'],
                  hint: 'Revisit Class 9 \'Plate Tectonics\' (c9_geo_ch1_2) for Himalayan geodynamics, and Class 11.',
                  misconception: 'Students believe landslides occur *only* during the monsoon and *only* on steep, bare slopes.' }
          ],
            remediations: { 'landslides-occur-only-during-the': { steps: ['Show a cross-section of the 1998 Malpa landslide (deep-seated, failed in August after weeks of rain) vs.', 'Use a physical slope model (sand/clay layers in a tray) to demonstrate delayed failure: pour water, stop, observe.', 'Plot historical landslide events in Uttarakhand by month on a bar chart — reveal secondary peak in October.', 'Re-teach the infinite slope equation emphasizing the *time-dependent* pore pressure term (ru) and the *seismic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
