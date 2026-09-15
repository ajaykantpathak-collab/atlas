import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch23_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch23_p1: SimDef = {
    id: 'v3_c11_geo_ch23_p1',
    title: 'Map Scale and Projection · Part 1/2',
    subtitle: 'Master the three ways maps state their shrink — and the conversion trap between them.',
    classLevel: 11, subject: 'geography', topic: 'Map Scale and Projection · Part 1/2',
    chapters: ['c11_geo_ch23'],
    nodeIds: ['c11_geo_cbse_23_001', 'c11_geo_cbse_23_002', 'c11_geo_cbse_23_003', 'c11_geo_cbse_23_004', 'c11_geo_cbse_23_005', 'c11_geo_cbse_23_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trekker converting map marks into kilometres', intro: 'The corner of a tourist map says \'1 cm = 2 km\' — harmless until someone has to turn it into an RF.', goal: 'Convert between statement scale and representative fraction and reason about scale accuracy.' },
    discovery: {
        question: '\'1 cm = 1 km\' — convert that statement scale to a Representative Fraction. Is it 1:1,000?',
        options: ['No — 1:100,000; a kilometre is 100,000 centimetres, not 1,000', 'Yes — the units cancel cleanly', 'No — 1:10,000; divide by ten', 'Yes — RF just repeats the numbers'],
        answer: 'No — 1:100,000; a kilometre is 100,000 centimetres, not 1,000',
        hook: 'And the bigger-looking RF is the smaller scale — 1:1,000,000 shows less detail than 1:50,000 because it\'s a fraction, not a size.',
    },
    teaching: [
        { title: 'Map Scale: Statement (Verbal) Scale Method', text: 'Statement (Verbal) Scale expresses the map-to-ground distance relationship in words using specific units, written in the standard format "1 unit on map represents X units on ground" (e.g., "1 cm = 1.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_23_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Normalise \'2 cm = 1 km\' into per-centimetre terms, compute a ground distance, then explain why a hiker\'s 2.5 map-miles became 3.8 trail-miles.',
        labels: ['Map Scale: Statement (Verbal)', 'Map Scale: Representative Fraction', 'Map Scale: Graphical (Bar)', 'Conversion Between Statement Scale', 'Map Projections: Classification by', 'Cylindrical Projections: Properties, Distortion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_001', title: 'Map Scale: Statement (Verbal) Scale Method',
          scaffold: { problem: 'A Survey of India topographical map (sheet 45D/10) has statement scale "2 cm = 1 km".',
            steps: [
            { text: 'Identify given statement scale: 2 cm (map) = 1 km (ground)' },
            { text: 'Normalize to unit map distance: 1 cm (map) = 0.5 km (ground) = 500 m (ground)' },
            { text: 'Apply to measured distance: 4.7 cm × 0.5 km/cm = 2.35 km' },
            { text: 'Convert to metres: 2.35 km × 1000 = 2350 m' },
            { text: 'Derive Representative Fraction: 1 km = 100,000 cm, so 2 cm = 100,000 cm → 1 cm = 50,000 cm → RF = 1:50,000' },
            { text: 'Verify using RF: Map distance 4.7 cm × 50,000 = 235,000 cm = 2350 m = 2.35 km ✓' },
            { text: 'Interpret: This matches Survey of India 1:50,000 series standard; statement scale "2 cm = 1 km" is the conventional.', faded: true, blankAnswer: 'Ground distance = 2.35 km (or 2350 m). RF verification.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_002', title: 'Map Scale: Representative Fraction (RF) Method',
          scaffold: { problem: 'A Survey of India toposheet (RF 1:50,000) shows a river stretch measuring 6.4 cm between two bridges.',
            steps: [
            { text: 'Identify given RF = 1:50,000, map distance = 6.4 cm.' },
            { text: 'Apply RF formula: Ground Distance = Map Distance × Denominator = 6.4 cm × 50,000 = 320,000 cm.' },
            { text: 'Convert cm to km: 320,000 cm ÷ 100 = 3,200 m ÷ 1,000 = 3.2 km. Actual river length = 3.2 km.' },
            { text: 'For new map RF 1:25,000, same ground distance (3.2 km = 320,000 cm).' },
            { text: 'Verify: 1:25,000 is larger scale (denominator smaller), so map distance should double (50,000/25,000 = 2).', faded: true, blankAnswer: 'Actual river length = 3.2 km. On 1:25,000 map, the stretch.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_003', title: 'Map Scale: Graphical (Bar) Scale Method',
          scaffold: { problem: 'Construct a plain graphical scale for a map with RF 1:100,000 to show kilometres and hectometres (100 m).',
            steps: [
            { text: 'Calculate ground distance per cm from RF: 1 cm = 100,000 cm = 1 km.' },
            { text: 'Primary division (1 km) = Total scale length / Total km = 10 cm / 10 km = 1 cm per km.' },
            { text: 'Secondary division (100 m = 0.1 km) = Primary division × 0.1 = 1 cm × 0.1 = 0.1 cm = 1 mm.' },
            { text: 'Number of primary divisions = 10 (0 to 10 km). Number of secondary divisions = 1 km / 0.1 km = 10 divisions left.' },
            { text: 'Verify: 10 primary × 1 cm = 10 cm total. 10 secondary × 1 mm = 1 cm left of zero.', faded: true, blankAnswer: 'Total ground distance = 10 km (or 9 km for strict 10.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_004', title: 'Conversion Between Statement Scale and Representative Fraction',
          scaffold: { problem: 'A topographical map of the Western Ghats has a Statement Scale: "3 cm represents 1.5 km". Convert this to RF.',
            steps: [
            { text: 'Write the given statement as a ratio: Map distance : Ground distance = 3 cm : 1.5 km.' },
            { text: 'Convert ground distance to centimeters: 1.5 km = 1.5 × 100,000 cm = 150,000 cm.' },
            { text: 'Ratio becomes 3 cm : 150,000 cm.' },
            { text: 'Reduce to 1 cm basis by dividing both sides by 3: 1 cm : 50,000 cm.' },
            { text: 'Write RF = 1:50,000.' },
            { text: 'Calculate ground distance for 7.2 cm map distance: 7.2 × 50,000 = 360,000 cm.' },
            { text: 'Convert ground distance to km: 360,000 ÷ 100,000 = 3.6 km.' },
            { text: 'Verify by reverse: 3.6 km on ground at RF 1:50,000 → map distance = 3.6 × 100,000 ÷ 50,000 = 7.2 cm. Matches.', faded: true, blankAnswer: 'RF = 1:50,000. Actual ground distance between peaks = 3.6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_005', title: 'Map Projections: Classification by Developable Surface',
          scaffold: { problem: 'A cartographer needs to map the Northern Sea Route (along the Arctic coast of Russia, approx. 70°N–80°N) for navigation.',
            steps: [
            { text: 'Identify the region\'s location: high latitudes (70°N–80°N), polar region.' },
            { text: 'Recall that developable surface choice should place the contact line/point near the region to minimize distortion.' },
            { text: 'Evaluate cylindrical: normal (equatorial contact) → huge distortion at 75°N (k = sec 75° ≈ 3.86); transverse (contact.' },
            { text: 'Evaluate conical: normal (contact at mid-latitude) → region far from standard parallel, large distortion; oblique cone.' },
            { text: 'Evaluate zenithal: polar aspect (plane tangent at North Pole) → contact point at pole, region (70°N–80°N) is close.' },
            { text: 'Select: Zenithal (Azimuthal) projection, polar aspect, tangent at North Pole (or secant with standard parallel.', faded: true, blankAnswer: 'Zenithal (Azimuthal) projection, polar aspect, tangent.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_006', title: 'Cylindrical Projections: Properties, Distortion and Uses',
          scaffold: { problem: 'Derive the y-coordinate formula for the Mercator projection on a sphere of radius R, starting from the conformality condition (h = k).',
            steps: [
            { text: 'Write the parallel scale factor h = sec φ (cylinder circumference / globe parallel length).' },
            { text: 'For conformality, meridian scale factor k must equal h. But k = (dy/dφ) / (R dφ) = (1/R) dy/dφ.' },
            { text: 'Integrate: y = R ∫ sec φ dφ = R ln|tan(π/4 + φ/2)| + C. Set y=0 at φ=0 → C=0.' },
            { text: 'For φ = 30° = π/6 rad: y = R ln|tan(π/4 + π/12)| = R ln|tan(π/3)| = R ln(√3) ≈ 6371 km × 0.5493 = 3500 km.' },
            { text: 'Map distance = ground distance / denominator of RF = 3,500,000 m / 50,000,000 = 0.07 m = 7 cm.', faded: true, blankAnswer: 'y = R ln|tan(π/4 + φ/2)|; distance from equator to 30°N = 7.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_23_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a map-skills test review, a classmate converts the statement scale \'1 cm = 1 km\' into a Representative Fraction of 1:1,000. He also insists \'1:1,000,000 is a larger scale than 1:50,000 because the number is bigger.\'',
            decisions: [{ prompt: 'Where do his scale conversions go wrong?', options: [
                { text: 'Redo the units: 1 km = 100,000 cm, so \'1 cm = 1 km\' is RF 1:100,000 — not 1:1,000. And RF is a fraction: 1/50,000 is a LARGER scale than 1/1,000,000 because the divisor is smaller — it shows more detail on a smaller area. The denominator divides, it doesn\'t measure.', outcome: 'Both fixes come from treating RF as a unitless ratio: convert to identical units first, and read the fraction\'s value — not the denominator\'s size.' },
                { text: 'Let the 1:1,000 stand — 1 km has 1,000 metres, so the conversion is close enough.', outcome: 'The error isn\'t rounding: metres vs centimetres changes the RF by 100×, and every ground distance derived from it comes out wrong.', reveals: 'km-equals-thousand-units' },
                { text: 'Agree on the denominator logic — a million must be bigger than fifty thousand.', outcome: 'The denominator is a divisor: bigger denominator means smaller fraction, smaller scale, less detail — 1:50,000 zooms closer than 1:1,000,000.', reveals: 'bigger-denominator-bigger-scale' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_23_006', title: 'The bigger picture',
          caseStudy: { intro: 'Statement, RF, graphical — three dialects of one relationship; only the drawn bar still tells the truth after a photocopy.',
            decisions: [{ prompt: 'What comes next? Map Scale and Projection · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Map Scale and Projection · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_001', difficulty: 'standard',
          question: 'Statement (Verbal) Scale expresses the map-to-ground distance relationship.',
          hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing.',
          misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000.',
          parts: [
                { id: 'a', prompt: 'What is the standard convention for writing a statement scale, and which distance (map or ground) is always stated first?', answer: 'Standard convention: "1 unit on map = X units on ground"',
                  options: ['Standard convention: "1 unit on map = X units on ground"', '1 cm = 1 km'],
                  hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing Quantities".',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' },
                { id: 'b', prompt: 'On a map with statement scale "2 cm = 1 km", a student measures 3.6 cm between two villages. Calculate the ground distance in kilometers and meters.', answer: 'Step 1: Normalize to 1 cm → 1 cm = 0.5 km (divide both sides by 2)',
                  options: ['Step 1: Normalize to 1 cm → 1 cm = 0.5 km (divide both sides by 2)', '1 cm = 1 km'],
                  hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing Quantities".',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' },
                { id: 'c', prompt: 'Compare statement scales "1 cm = 200 m" (Map A) and "1 cm = 5 km" (Map B). Which map shows more detail?', answer: 'Map A (1 cm = 200 m) shows more detail',
                  options: ['Map A (1 cm = 200 m) shows more detail', '5 km > 200 m', 'more ground shown', 'more detail'],
                  hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing Quantities".',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' }
          ],
            remediations: { 'the-statement-scale-1-cm': { steps: ['Remediation: (1) Drill metric conversions: 1 km = 1000 m = 100,000 cm using a 1 m ruler and 1 km mental image (10 min.', '(2) Physical demonstration: Print a map with "1 cm = 1 km", photocopy at 50%, measure same feature on both — show the.', '(3) Practice RF derivation: "1 cm = X km" → RF = 1 : (X × 100,000).', 'Do 5 conversions until automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000.',
          parts: [
                { id: 'a', prompt: 'A hiker uses a map with statement scale "1 inch = 1 mile" to plan a trek. They measure 2.5 inches between campsites and calculate 2.5 miles.', answer: 'The map scale is not necessarily inaccurate',
                  options: ['The map scale is not necessarily inaccurate', '1 cm = 1 km'],
                  hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing Quantities".',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' },
                { id: 'b', prompt: 'Design a statement scale for a map of your school campus (approx. 600 m × 400 m) to fit on A4 paper (21 cm × 29.7 cm) with 1 cm margins.', answer: 'Usable paper: 19 cm × 27.7 cm',
                  options: ['Usable paper: 19 cm × 27.7 cm', '1 cm = 1 km'],
                  hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing Quantities".',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' }
          ],
            remediations: { 'the-statement-scale-1-cm': { steps: ['Remediation: (1) Drill metric conversions: 1 km = 1000 m = 100,000 cm using a 1 m ruler and 1 km mental image (10 min.', '(2) Physical demonstration: Print a map with "1 cm = 1 km", photocopy at 50%, measure same feature on both — show the.', '(3) Practice RF derivation: "1 cm = X km" → RF = 1 : (X × 100,000).', 'Do 5 conversions until automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_002', difficulty: 'standard',
          question: 'Representative Fraction (RF) is a unitless ratio expressing map scale as 1 :.',
          hint: 'Revisit c11_geo_cbse_23_001 (Statement Scale) and practice converting "1 cm = 500 m" type.',
          misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.',
          parts: [
                { id: 'a', prompt: 'Why is Representative Fraction considered a "universal" scale method while statement scale is not?', answer: 'RF is universal because it is a pure ratio without units',
                  options: ['RF is universal because it is a pure ratio without units', 'RF is more accurate', '1 cm on map = 50,000 km on ground', 'RF 1:50,000 means "1 cm on map = 50,000 km on ground"'],
                  hint: 'Revisit c11_geo_cbse_23_001 (Statement Scale) and practice converting "1 cm = 500 m" type.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' },
                { id: 'b', prompt: 'On a map with RF 1:50,000, you measure the straight-line distance between two villages as 4.8 cm. Calculate the actual ground distance in kilometres.', answer: 'Step 1: RF = 1:50,000 → 1 cm map = 50,000 cm ground',
                  options: ['Step 1: RF = 1:50,000 → 1 cm map = 50,000 cm ground', '1 cm on map = 50,000 km on ground', 'RF 1:50,000 means "1 cm on map = 50,000 km on ground"'],
                  hint: 'Revisit c11_geo_cbse_23_001 (Statement Scale) and practice converting "1 cm = 500 m" type.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' },
                { id: 'c', prompt: 'Two maps of the same region have RFs 1:25,000 and 1:100,000. Which map shows more detail? Explain using the concept of scale denominator.', answer: '1:25,000 shows more detail',
                  options: ['1:25,000 shows more detail', 'larger number = larger scale = more detail', '1 cm on map = 50,000 km on ground', 'RF 1:50,000 means "1 cm on map = 50,000 km on ground"'],
                  hint: 'Revisit c11_geo_cbse_23_001 (Statement Scale) and practice converting "1 cm = 500 m" type.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' }
          ],
            remediations: { 'students-frequently-believe-rf-1': { steps: ['Have student write RF as a fraction (1/50,000) and compare with 1/1,000,000 using a number line.', 'Use a physical map — measure 1 cm, calculate ground distance in cm, then convert to km (50,000 cm = 0.5 km).', 'Photocopy the map at 200% enlargement — measure same feature, show statement scale breaks but RF ratio holds if you.', 'Practice converting 5 statement scales to RF, emphasizing "make map side 1 unit first, then convert ground to same.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_003', difficulty: 'standard',
          question: 'A graphical (bar) scale is a visual linear scale drawn on a map where a line.',
          hint: 'Revisit c11_geo_cbse_23_002 RF method — practice 5 conversions between RF and statement.',
          misconception: 'Students believe the graphical scale is just a "picture" of the RF and that its divisions must be calculated directly.',
          parts: [
                { id: 'a', prompt: 'What is the defining characteristic of a graphical (bar) scale that distinguishes it from a statement scale or representative fraction?', answer: 'A graphical scale remains accurate when a map is enlarged or reduced',
                  options: ['A graphical scale remains accurate when a map is enlarged or reduced', 'it shows distance in km', 'picture', '1 km division = 50,000 cm / 100,000 = 0'],
                  hint: 'Revisit c11_geo_cbse_23_002 RF method — practice 5 conversions between RF and statement scale, and.',
                  misconception: 'Students believe the graphical scale is just a "picture" of the RF and that its divisions must be calculated directly from the.' },
                { id: 'b', prompt: 'A map has RF 1:50,000. You need to construct a plain graphical scale to show kilometres and hectometres (100 m), with a total length of 15 cm representing 7.5.', answer: 'Step 1: RF 1:50,000 means 1 cm on map = 50,000 cm on ground = 0.5 km',
                  options: ['Step 1: RF 1:50,000 means 1 cm on map = 50,000 cm on ground = 0.5 km', 'picture', '1 km division = 50,000 cm / 100,000 = 0'],
                  hint: 'Revisit c11_geo_cbse_23_002 RF method — practice 5 conversions between RF and statement scale, and.',
                  misconception: 'Students believe the graphical scale is just a "picture" of the RF and that its divisions must be calculated directly from the.' },
                { id: 'c', prompt: 'Compare a map with RF 1:25,000 printed at original size versus the same map photocopied at 200% enlargement.', answer: 'At 200% enlargement, the graphical scale doubles in length',
                  options: ['At 200% enlargement, the graphical scale doubles in length', 'both work', 'picture', '1 km division = 50,000 cm / 100,000 = 0'],
                  hint: 'Revisit c11_geo_cbse_23_002 RF method — practice 5 conversions between RF and statement scale, and.',
                  misconception: 'Students believe the graphical scale is just a "picture" of the RF and that its divisions must be calculated directly from the.' }
          ],
            remediations: { 'the-graphical-scale-is-just': { steps: ['Take a physical map (atlas or printed) with a bar scale. Photocopy it at 50% and 200%.', 'On graph paper, draw a 10 cm line. Label it "represents 5 km". Divide into 5 primary (1 km each).', 'Practice measuring distances by paper-edge method: mark endpoints, align left mark at zero, read right mark.', 'Re-derive division lengths: total length / total ground km = cm per km.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_004', difficulty: 'standard',
          question: 'Conversion between Statement Scale (Verbal Scale) and Representative Fraction.',
          hint: 'Review metric unit conversions (km-m-cm) and ratio simplification from Class 6-8.',
          misconception: 'Students treat the RF denominator as if it is already in kilometers (e.g., RF 1:50,000 interpreted as "1 cm represents.',
          parts: [
                { id: 'a', prompt: 'A map has an RF of 1:25,000. Write the Statement Scale in the form "1 cm represents X km".', answer: 'Statement Scale: "1 cm represents 0.25 km" (or "1 cm represents 250 m")',
                  options: ['Statement Scale: "1 cm represents 0.25 km" (or "1 cm represents 250 m")', '1 cm represents 25 km'],
                  hint: 'Review metric unit conversions (km-m-cm) and ratio simplification from Class 6-8 Mathematics; then.',
                  misconception: 'Students treat the RF denominator as if it is already in kilometers (e.g., RF 1:50,000 interpreted as "1 cm represents 50 km") instead.' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['Have the student physically measure 1 cm on a ruler and 1 km on a local map (e.g., school atlas) to visualize the scale.', 'Practice unit conversion drills: 1 km = 1,000 m = 100,000 cm; 1 m = 100 cm.', 'Use a two-column table: Column A "Statement Scale (various bases)", Column B "Convert to 1 cm basis".', 'Only then introduce RF conversion using the 1 cm basis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_005', difficulty: 'standard',
          question: 'Map projection classification by developable surface categorizes projections.',
          hint: 'If stuck, review Class 8 node c8_geo_ch2_1 (Earth as Oblate Spheroid) and c8_geo_ch2_2.',
          misconception: 'Students believe "developable surface" means the projection surface is physically developable (like paper) and.',
          parts: [
                { id: 'a', prompt: 'Compare the distortion distribution in a normal cylindrical tangent projection vs a normal conical tangent projection for a mid-latitude region (e.g., 30°N).', answer: 'Correct answer: In a normal cylindrical tangent (equatorial contact), distortion',
                  options: ['Correct answer: In a normal cylindrical tangent (equatorial contact), distortion', 'cylindrical because it\'s simpler', 'developable surface'],
                  hint: 'If stuck, review Class 8 node c8_geo_ch2_1 (Earth as Oblate Spheroid) and c8_geo_ch2_2.',
                  misconception: 'Students believe "developable surface" means the projection surface is physically developable (like paper) and therefore the projection has.' }
          ],
            remediations: { 'developable-surface-means-the-projection': { steps: ['Take a sheet of paper and roll it into a cylinder; place it over a globe touching the equator.', 'Mark the equator on the paper.', 'Unroll – the equator is a straight line of true scale.', 'Now draw a circle of latitude at 30°N on the globe.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_006', difficulty: 'standard',
          question: 'A cylindrical projection is a map projection created by conceptually wrapping.',
          hint: 'Revisit node c11_geo_cbse_23_005, specifically the section on "Cylindrical Developable.',
          misconception: 'Students often believe that "cylindrical projection" means only the Mercator projection, and that all cylindrical.',
          parts: [
                { id: 'a', prompt: 'Explain why the Mercator projection shows a constant scale along the equator but an increasing scale factor toward the poles, using the concept of parallel.', answer: 'On the globe, the length of a parallel at latitude φ is 2πR cos φ',
                  options: ['On the globe, the length of a parallel at latitude φ is 2πR cos φ', 'scale increases because the cylinder gets wider', 'cylindrical projection'],
                  hint: 'Revisit node c11_geo_cbse_23_005, specifically the section on "Cylindrical Developable Surface" and.',
                  misconception: 'Students often believe that "cylindrical projection" means only the Mercator projection, and that all cylindrical projections have the.' }
          ],
            remediations: { 'cylindrical-projection-means-only-the': { steps: ['If a student exhibits this misconception, conduct a hands-on demonstration: (1) Take a tennis ball (globe) and wrap.', 'Mark the contact line in each case.', '(2) Use a light source at the ball\'s centre to cast shadows of drawn graticule lines onto the paper — this simulates.', '(3) Then show printed world maps in Mercator, Transverse Mercator (e.g., a UTM zone map of India), and Lambert.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
