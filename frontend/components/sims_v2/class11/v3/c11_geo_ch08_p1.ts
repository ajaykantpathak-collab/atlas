import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch08_p1: SimDef = {
    id: 'v3_c11_geo_ch08_p1',
    title: 'Introduction to India · Part 1/2',
    subtitle: 'Locate India\'s true extremes and see what 30° of longitude does to a single clock.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to India · Part 1/2',
    chapters: ['c11_geo_ch08'],
    nodeIds: ['c11_geo_cbse_08_001', 'c11_geo_cbse_08_002', 'c11_geo_cbse_08_003', 'c11_geo_cbse_08_004', 'c11_geo_cbse_08_005', 'c11_geo_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a map-reader correcting the usual mistakes', intro: 'Same IST on every phone from Gujarat to Arunachal — but the sun disagrees by almost two hours.', goal: 'State India\'s latitudinal and longitudinal extent and analyse its boundary and time-zone implications.' },
    discovery: {
        question: 'Quick: India\'s southernmost point — Kanyakumari, right?',
        options: ['No — Indira Point in the Andaman & Nicobar Islands, at 6°45\'N, lies well south of Kanyakumari\'s 8°4\'N', 'Yes — the tip of the mainland is the southernmost point', 'Yes — islands never count for extent', 'No — it\'s actually Kibithu in Arunachal'],
        answer: 'No — Indira Point in the Andaman & Nicobar Islands, at 6°45\'N, lies well south of Kanyakumari\'s 8°4\'N',
        hook: 'The mainland answer is the classic trap — India\'s territory reaches far past its coastline.',
    },
    teaching: [
        { title: 'India: Location and Extent (Latitudinal and Longitudinal)', text: 'India\'s geographical location is defined by its latitudinal extent from 8°4\'N (Indira Point, Andaman & Nicobar Islands) to 37°6\'N (Indira Col, Ladakh) and longitudinal extent from 68°7\'E (Gujarat\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Convert the 30° longitudinal span into nearly two hours of solar time, then weigh whether one IST still serves a country that wide.',
        labels: ['India: Location and Extent', 'India\'s Neighbours: Land Boundaries', 'Standard Meridian of India', 'India: Size, Area', 'India: Physical Setting', 'Time Difference Across India'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_08_001', title: 'India: Location and Extent (Latitudinal and Longitudinal)',
          scaffold: { problem: 'A student in Porbandar (69°36\'E, Gujarat) and another in Kohima (94°06\'E, Nagaland) both observe the sun at local noon (sun highest.',
            steps: [
            { text: 'Identify the longitudinal coordinates: Porbandar = 69°36\'E, Kohima = 94°06\'E.' },
            { text: 'Convert to decimal degrees: Porbandar = 69 + 36/60 = 69.6°E; Kohima = 94 + 6/60 = 94.1°E.' },
            { text: 'Calculate longitudinal difference = 94.1° - 69.6° = 24.5°.' },
            { text: 'Apply conversion: 1° longitude = 4 minutes of time → 24.5° × 4 = 98 minutes = 1 hour 38 minutes.' },
            { text: 'Determine direction: Kohima is east of Porbandar, so local noon occurs earlier in Kohima by 1 hour 38 minutes.' },
            { text: 'Explain IST: India adopts a single standard time based on 82°30\'E (central meridian).', faded: true, blankAnswer: 'Local noon in Kohima occurs 1 hour 38 minutes before.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_002', title: 'India\'s Neighbours: Land Boundaries and Maritime Neighbours',
          caseStudy: { intro: 'Begin by asking the student to trace India\'s outline on a blank political map of South Asia and notice how the northern boundary follows the great Himalayan.',
            decisions: [{ prompt: 'Name the seven countries with which India shares a land boundary and the two countries with which it shares a maritime boundary.', options: [
                { text: 'Land neighbours (7): Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, Afghanistan', outcome: 'Land neighbours (7): Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, Afghanistan.' },
                { text: 'non-existent', outcome: 'Not quite — Students often believe that India\'s boundary with Afghanistan is a "myth" or "non-existent" because.', reveals: 'india-s-boundary-with-afghanistan' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_08_003', title: 'Standard Meridian of India (82 degrees 30 minutes East) and IST',
          scaffold: { problem: 'A flight departs from Mumbai (72.8°E) at 10:00 AM IST and lands in Kolkata (88.4°E) after 2 hours 30 minutes flight time.',
            steps: [
            { text: 'Identify IST is based on 82.5°E. Landing IST time = 10:00 + 2:30 = 12:30 PM IST.' },
            { text: 'Calculate longitudinal difference from IST meridian: Mumbai = 72.8° - 82.5° = -9.7° (west); Kolkata = 88.4° - 82.5°.' },
            { text: 'Convert to time offset: Mumbai = -9.7 × 4 = -38.8 min ≈ -39 min; Kolkata = +5.9 × 4 = +23.6 min ≈ +24 min.' },
            { text: 'Local solar time at landing: Mumbai = 12:30 - 39 min = 11:51 AM; Kolkata = 12:30 + 24 min = 12:54 PM.' },
            { text: 'Interpret: Passenger\'s watch (set to IST) shows 12:30 PM, but the sun in Kolkata is at a position corresponding.', faded: true, blankAnswer: 'Landing IST: 12:30 PM. Local solar time: Mumbai ~11:51.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_004', title: 'India: Size, Area and Administrative Divisions (States and UTs)',
          caseStudy: { intro: 'Begin by asking students to observe the political map of India in their atlas and note the sheer number of states and union territories.',
            decisions: [{ prompt: 'What is the total geographical area of India, and what is its rank in the world by area?', options: [
                { text: 'The total geographical area of India is 3.287 million square kilometres (3,287,263 km²),', outcome: 'The total geographical area of India is 3.287 million square kilometres (3,287,263 km²), making.' },
                { text: 'Union Territory', outcome: 'Not quite — Students often think that the number of states and UTs is fixed and that all states were formed.', reveals: 'the-number-of-states-and' },
                { text: 'UTs have no elected government, while Delhi and Puducherry have legislatures', outcome: 'Not quite — Students often think that the number of states and UTs is fixed and that all states were formed.', reveals: 'the-number-of-states-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_005', title: 'India: Physical Setting and Strategic Location in Asia',
          caseStudy: { intro: 'Begin with a satellite image of the Indian subcontinent at night—notice how the dense cluster of lights in the Indo-Gangetic plain contrasts with the dark.',
            decisions: [{ prompt: 'Name the four major physiographic divisions of India in order from north to south and state the approximate latitudinal range each occupies.', options: [
                { text: 'The four divisions north to south: (1) Himalayan Mountain System (~30°N–37°N), (2)', outcome: 'The four divisions north to south: (1) Himalayan Mountain System (~30°N–37°N), (2).' },
                { text: 'strategic location', outcome: 'Not quite — Students often believe the "strategic location" of India refers only to its position at the head.', reveals: 'the-strategic-location-of-india' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_08_006', title: 'Time Difference Across India and the Need for IST',
          scaffold: { problem: 'A train departs from Mumbai (72°50\'E) at 14:30 IST and arrives at Guwahati (91°45\'E) after 38 hours of travel.',
            steps: [
            { text: 'Identify the Standard Meridian (82°30\'E) and the longitudes of Mumbai (72°50\'E) and Guwahati (91°45\'E).' },
            { text: 'Calculate longitudinal difference of Guwahati from Standard Meridian: 91°45\' – 82°30\' = 9°15\' = 9.25° east.' },
            { text: 'Convert longitudinal difference to time: 9.25° × 4 min/° = 37 minutes.' },
            { text: 'Determine arrival time in IST: Departure 14:30 + 38 hours = 14:30 + 24h = 14:30 next day + 14h = 04:30 IST on the third.' },
            { text: 'Add local time offset: 04:30 IST + 37 min = 05:07 local mean time at Guwahati.', faded: true, blankAnswer: '05:07 AM local mean time at Guwahati on the third day.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a quiz prep session, your teammate writes: \'Kanyakumari is India\'s southernmost point; the Tropic of Cancer cuts India through the middle; and India shares no border with Afghanistan — look at the map.\'',
            decisions: [{ prompt: 'Which of the three statements survive checking?', options: [
                { text: 'None fully: India\'s southernmost point is Indira Point (6°45\'N) in the Nicobars, not Kanyakumari. The Tropic of Cancer (23°30\'N) sits slightly north of India\'s latitudinal midpoint (~22°35\'N) — the map\'s \'middle\' is an illusion. And the Afghanistan boundary (~106 km) is real but lies in Gilgit-Baltistan along the Wakhan Corridor — legally Indian territory under Pakistan\'s de facto control.', outcome: 'All three \'obvious\' facts get corrected — and the Afghanistan case shows why boundaries are geopolitical interfaces, not just drawn lines.' },
                { text: 'All three are fine — the map shows them plainly enough.', outcome: 'Map-reading habits hide the traps: Indira Point off the mainland edge, the Tropic off-centre, and PoK\'s shaded boundary masking the Afghan frontier.', reveals: 'map-shows-everything' },
                { text: 'Only fix the first two — the Afghanistan border really is a myth since no road connects the two countries.', outcome: 'No physical connection doesn\'t erase the boundary: the 106 km segment exists legally via the Instrument of Accession — it\'s under PoK control, not non-existent.', reveals: 'afghanistan-border-is-myth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'One clock for 3,000 km of sunrise — geography supplies the two-hour gap; administration decides who absorbs it.',
            decisions: [{ prompt: 'What comes next? Introduction to India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_001', difficulty: 'standard',
          question: 'India\'s geographical location is defined by its latitudinal extent from 8°4\'N.',
          hint: 'Review Class 7 Geography c7_geo_ch01_001 "India\'s Location: Latitude, Longitude and.',
          misconception: 'Students believe "Kanyakumari (8°4\'N) is India\'s southernmost point" and "the Tropic of Cancer passes through the.',
          parts: [
                { id: 'a', prompt: 'State the latitudinal and longitudinal extent of mainland India in degrees and minutes, and name the southernmost point of the Indian union (including islands).', answer: 'Mainland India: 8°4\'N to 37°6\'N latitude, 68°7\'E to 97°25\'E longitude',
                  options: ['Mainland India: 8°4\'N to 37°6\'N latitude, 68°7\'E to 97°25\'E longitude', 'Kanyakumari (8°4\'N) is India\'s southernmost point', 'the Tropic of Cancer passes through the middle of India'],
                  hint: 'Review Class 7 Geography c7_geo_ch01_001 "India\'s Location: Latitude, Longitude and Extent" for.',
                  misconception: 'Students believe "Kanyakumari (8°4\'N) is India\'s southernmost point" and "the Tropic of Cancer passes through the middle of India." The.' },
                { id: 'b', prompt: 'Calculate the local time difference between Dwarka (69°05\'E, Gujarat) and Itanagar (93°36\'E, Arunachal Pradesh) using the 1° longitude = 4 minutes rule.', answer: 'Step 1: Longitudinal difference = 93°36\'E - 69°05\'E = 24°31\'',
                  options: ['Step 1: Longitudinal difference = 93°36\'E - 69°05\'E = 24°31\'', 'Kanyakumari (8°4\'N) is India\'s southernmost point', 'the Tropic of Cancer passes through the middle of India'],
                  hint: 'Review Class 7 Geography c7_geo_ch01_001 "India\'s Location: Latitude, Longitude and Extent" for.',
                  misconception: 'Students believe "Kanyakumari (8°4\'N) is India\'s southernmost point" and "the Tropic of Cancer passes through the middle of India." The.' },
                { id: 'c', prompt: 'Compare the latitudinal spread of India (8°4\'N–37°6\'N) with that of Brazil (5°16\'N–33°45\'S) and explain why India experiences greater seasonal temperature.', answer: 'India\'s range = 29°2\' entirely in Northern Hemisphere',
                  options: ['India\'s range = 29°2\' entirely in Northern Hemisphere', 'India is farther from equator', 'Kanyakumari (8°4\'N) is India\'s southernmost point', 'the Tropic of Cancer passes through the middle of India'],
                  hint: 'Review Class 7 Geography c7_geo_ch01_001 "India\'s Location: Latitude, Longitude and Extent" for.',
                  misconception: 'Students believe "Kanyakumari (8°4\'N) is India\'s southernmost point" and "the Tropic of Cancer passes through the middle of India." The.' }
          ],
            remediations: { 'kanyakumari-8-4-n-is': { steps: ['On a physical map, locate Indira Point (Great Nicobar) and Kanyakumari; measure their latitudes — note 1°55\' difference.', 'Calculate India\'s latitudinal midpoint: (37°6\' + 8°4\')/2 = 22°35\'N; compare with Tropic of Cancer (23°30\'N).', 'Explain that "middle" is ambiguous — geometric centre vs. population-weighted centre vs. climatic divider.', 'Practice writing: "Mainland southernmost: Kanyakumari (8°4\'N); Union southernmost: Indira Point (6°45\'N)" — this exact.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Kanyakumari (8°4\'N) is India\'s southernmost point" and "the Tropic of Cancer passes through the.',
          parts: [
                { id: 'a', prompt: 'Design a map-based activity for Class 9 students to discover why the Tropic of Cancer passes through 8 Indian states but the Equator passes through none.', answer: 'Activity: Provide outline map with latitude lines',
                  options: ['Activity: Provide outline map with latitude lines', 'Kanyakumari (8°4\'N) is India\'s southernmost point', 'the Tropic of Cancer passes through the middle of India'],
                  hint: 'Review Class 7 Geography c7_geo_ch01_001 "India\'s Location: Latitude, Longitude and Extent" for.',
                  misconception: 'Students believe "Kanyakumari (8°4\'N) is India\'s southernmost point" and "the Tropic of Cancer passes through the middle of India." The.' }
          ],
            remediations: { 'kanyakumari-8-4-n-is': { steps: ['On a physical map, locate Indira Point (Great Nicobar) and Kanyakumari; measure their latitudes — note 1°55\' difference.', 'Calculate India\'s latitudinal midpoint: (37°6\' + 8°4\')/2 = 22°35\'N; compare with Tropic of Cancer (23°30\'N).', 'Explain that "middle" is ambiguous — geometric centre vs. population-weighted centre vs. climatic divider.', 'Practice writing: "Mainland southernmost: Kanyakumari (8°4\'N); Union southernmost: Indira Point (6°45\'N)" — this exact.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_002', difficulty: 'standard',
          question: 'India shares its land boundary of approximately 15,106.7 km with seven.',
          hint: 'If stuck, revisit Class 6 "Physical Divisions of India" (c6_geography_ch01_001.',
          misconception: 'Students often believe that India\'s boundary with Afghanistan is a "myth" or "non-existent" because they see no direct.',
          parts: [
                { id: 'a', prompt: 'Compare the strategic vulnerability of the "Chicken\'s Neck" (Siliguri Corridor) with that of the "Siachen Glacier" sector.', answer: 'The Siliguri Corridor (≈22 km wide) connects the Northeast to mainland India',
                  options: ['The Siliguri Corridor (≈22 km wide) connects the Northeast to mainland India', 'border disputes', 'altitude', 'choke points'],
                  hint: 'If stuck, revisit Class 6 "Physical Divisions of India" (c6_geography_ch01_001.',
                  misconception: 'Students often believe that India\'s boundary with Afghanistan is a "myth" or "non-existent" because they see no direct land connection.' }
          ],
            remediations: { 'india-s-boundary-with-afghanistan': { steps: ['Project a physical map of Jammu & Kashmir (pre-2019) showing the Wakhan Corridor as a narrow Afghan panhandle.', 'Trace the watershed between the Hindu Kush and Karakoram to locate the India–Afghanistan trijunction near the Kilik.', 'Cross-reference with the 1947 Instrument of Accession and the 1963 Sino-Pakistan Agreement (which ceded the Shaksgam.', 'Have the student mark this 106 km segment on their own outline map using a distinct symbol (e.g., double-dashed line).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_003', difficulty: 'standard',
          question: 'The Standard Meridian of India is the longitudinal line at 82°30\'E (82.5°E).',
          hint: 'If stuck, revisit the longitude-time relationship (Class 9 Geography: Rotation and.',
          misconception: 'Students often believe the Standard Meridian (82°30\'E) is the exact geometric center of India\'s longitudinal extent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Standard Meridian of India is the longitudinal line at 82°30\'E (82.5°E) that passes',
                  options: ['The Standard Meridian of India is the longitudinal line at 82°30\'E (82.5°E) that passes', 'India\'s geographical location is defined by its latitudinal extent from 8°4\'N (Indira', 'India shares its land boundary of approximately 15,106.7 km with seven neighbouring', 'India\'s size and area refer to its total geographical area of 3.287 million square'],
                  hint: 'If stuck, revisit the longitude-time relationship (Class 9 Geography: Rotation and Revolution) and.',
                  misconception: 'Students often believe the Standard Meridian (82°30\'E) is the exact geometric center of India\'s longitudinal extent.' }
          ],
            remediations: { 'the-standard-meridian-82-30': { steps: ['Draw a number line from 0° (Greenwich) to 180°E. Mark multiples of 7°30\' (7.5°, 15°, 22.5°, ... 82.5°).', 'Show that 82.5° is exactly 11 × 7.5°, making IST = 5.5 hours ahead of UTC.', 'Calculate the midpoint of India\'s extent (82°46\'E) and show its offset from UTC would be 5h 31m 4s.', 'Use a railway timetable example: if every country used geometric midpoints, international scheduling would require.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_004', difficulty: 'standard',
          question: 'India\'s size and area refer to its total geographical area of 3.287 million.',
          hint: 'If stuck, review the political map of India (Class 6/7) and the chapter on Federalism.',
          misconception: 'Students often think that the number of states and UTs is fixed and that all states were formed on linguistic basis.',
          parts: [
                { id: 'a', prompt: 'Compare the area of Rajasthan (largest state) and Goa (smallest state).', answer: 'Rajasthan (~342,239 km²) is about 92 times larger than Goa (~3,702 km²)',
                  options: ['Rajasthan (~342,239 km²) is about 92 times larger than Goa (~3,702 km²)', 'Union Territory', 'UTs have no elected government, while Delhi and Puducherry have legislatures'],
                  hint: 'If stuck, review the political map of India (Class 6/7) and the chapter on Federalism in Class 10.',
                  misconception: 'Students often think that the number of states and UTs is fixed and that all states were formed on linguistic basis alone.' }
          ],
            remediations: { 'the-number-of-states-and': { steps: ['If the student holds this misconception, have them: 1) Create a timeline of state formation post-independence (1950.', '2) Colour-code each new state by primary basis of formation (linguistic, tribal, administrative, developmental).', '3) Compare the powers of a state (e.g., Tamil Nadu) vs a UT with legislature (Delhi) vs a UT without legislature.', 'This visual and comparative exercise clarifies the diversity of criteria and the evolving nature of administrative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_005', difficulty: 'standard',
          question: 'India\'s physical setting comprises four major physiographic divisions—the.',
          hint: 'Review c9_geo_ch1_2 (Plate Tectonics) and c9_geo_ch1_4 (Fold Mountains) with focus on the.',
          misconception: 'Students often believe the "strategic location" of India refers only to its position at the head of the Indian Ocean.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'India\'s physical setting comprises four major physiographic divisions—the Himalayan',
                  options: ['India\'s physical setting comprises four major physiographic divisions—the Himalayan', 'India\'s geographical location is defined by its latitudinal extent from 8°4\'N (Indira', 'India shares its land boundary of approximately 15,106.7 km with seven neighbouring', 'The Standard Meridian of India is the longitudinal line at 82°30\'E (82.5°E) that passes'],
                  hint: 'Review c9_geo_ch1_2 (Plate Tectonics) and c9_geo_ch1_4 (Fold Mountains) with focus on the Indian.',
                  misconception: 'Students often believe the "strategic location" of India refers only to its position at the head of the Indian Ocean, ignoring that the.' }
          ],
            remediations: { 'the-strategic-location-of-india': { steps: ['Revisit c9_geo_ch1_2 (Plate Tectonics) and c9_geo_ch1_4 (Fold Mountains) to reconstruct the collision that created the.', 'On a physical map, trace the subcontinental boundary—Hindu Kush → Karakoram → Himalayas → Purvanchal → Arakan Yoma →.', 'Overlay mineral belts (Chota Nagpur, Dharwar Craton) on the Peninsular Plateau map from c10_geo_cbse_05_009 to see how.', 'Rewrite the definition of "strategic location" to include land-based resource security, not just maritime position.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_08_006', difficulty: 'standard',
          question: 'Indian Standard Time (IST) is the uniform time observed across India, based.',
          hint: 'If stuck, review Class 9 Geography Chapter 2 (Seasons) — specifically the section.',
          misconception: 'Students often think IST is the local time of the exact centre of India (e.g., 82°30\'E is the midpoint of 68°7\'E and.',
          parts: [
                { id: 'a', prompt: 'What is the longitudinal extent of mainland India and what is the approximate time difference between its easternmost and westernmost points?', answer: 'Mainland India extends from 68°7\'E to 97°25\'E, a span of ~29°18\'',
                  options: ['Mainland India extends from 68°7\'E to 97°25\'E, a span of ~29°18\'', '2 hours 30 minutes', 'IST is the local time of the exact centre of India (e'],
                  hint: 'If stuck, review Class 9 Geography Chapter 2 (Seasons) — specifically the section "Rotation.',
                  misconception: 'Students often think IST is the local time of the exact centre of India (e.g., 82°30\'E is the midpoint of 68°7\'E and 97°25\'E).' },
                { id: 'b', prompt: 'If it is 12:00 noon IST (referenced to 82°30\'E), what is the local mean time at Porbandar (69°36\'E) and at Itanagar (93°36\'E)? Show your calculation.', answer: 'Step 1: Difference from Standard Meridian',
                  options: ['Step 1: Difference from Standard Meridian', 'IST is the local time of the exact centre of India (e'],
                  hint: 'If stuck, review Class 9 Geography Chapter 2 (Seasons) — specifically the section "Rotation.',
                  misconception: 'Students often think IST is the local time of the exact centre of India (e.g., 82°30\'E is the midpoint of 68°7\'E and 97°25\'E).' }
          ],
            remediations: { 'ist-is-the-local-time': { steps: ['Revisit the longitude-time rule using a diagram: draw Earth as a circle, mark 360°/24h = 15°/h = 1°/4min.', 'On an outline map of India, plot 68°7\'E, 82°30\'E, 97°25\'E. Calculate differences: 82.5° – 68.12° = 14.38° (west) → 57.5.', 'Show that the extremes are roughly symmetric around 82°30\'E (not the mathematical centre).', 'Discuss why half-hour offsets (UTC+5:30) are standard (e.g., Iran, Afghanistan, Sri Lanka, Newfoundland) — it avoids.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
