import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch24_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch24_p1: SimDef = {
    id: 'v3_c11_geo_ch24_p1',
    title: 'Topographical Maps · Part 1/2',
    subtitle: 'Read brown squiggles as slopes, valleys and hills — the Survey of India\'s code for terrain.',
    classLevel: 11, subject: 'geography', topic: 'Topographical Maps · Part 1/2',
    chapters: ['c11_geo_ch24'],
    nodeIds: ['c11_geo_cbse_24_001', 'c11_geo_cbse_24_002', 'c11_geo_cbse_24_003', 'c11_geo_cbse_24_004', 'c11_geo_cbse_24_005', 'c11_geo_cbse_24_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trekker planning a Western Ghats route from a toposheet', intro: 'A zig-zag mountain path is just a contour line walked — the toposheet draws the same idea in brown ink.', goal: 'Interpret contours, contour intervals and the Survey of India sheet-numbering system.' },
    discovery: {
        question: 'On one toposheet the plains get a 20 m contour interval and the hills get 50 m — the interval adapts to terrain, surely?',
        options: ['No — the contour interval is fixed for the whole sheet in the margin; only the spacing between contours changes with slope', 'Yes — steep ground needs coarser intervals', 'Yes — every ridge gets its own interval', 'No — contours aren\'t about elevation at all'],
        answer: 'No — the contour interval is fixed for the whole sheet in the margin; only the spacing between contours changes with slope',
        hook: 'Contours never cross, close into loops on hills, and kink into V\'s pointing upstream — the pattern is the terrain, written flat.',
    },
    teaching: [
        { title: 'Topographical Maps: Definition, Coverage and SOI Numbering System', text: 'A topographical map is a detailed, large-scale representation of a small portion of the Earth\'s surface showing both natural features (relief, drainage, vegetation) and cultural features.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_24_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Count contours between index lines at CI 20 m, decode a sheet number like 56H/3 into its grid position, and turn contour spacing into gradient.',
        labels: ['Topographical Maps: Definition, Coverage', 'Contours: Definition, Characteristics', 'Interpreting Contours: Slope Types', 'Identification of Landforms: Valleys,', 'Drainage Patterns on Topographical', 'Settlement and Transport Features'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_24_001', title: 'Topographical Maps: Definition, Coverage and SOI Numbering System',
          scaffold: { problem: 'A researcher needs the 1:50,000 toposheet covering the Indian Institute of Science (IISc), Bengaluru (13.02° N, 77.57° E).',
            steps: [
            { text: 'Identify the 1:1M sheet covering 13°N, 77°E. The 1:1M grid uses 4°×4° blocks.' },
            { text: 'Within Sheet 61 (4°×4°), locate 1:250K sub-sheet (1°×1°). 13°N → 13-14°N band (row 2 from south if 12-13, 13-14, 14-15.' },
            { text: 'Within 1:250K Sheet J (1°×1°), locate 1:50K quadrant (15\'×15\'). 13.02°N → 13°00\'-13°15\'N (southern half).' },
            { text: 'Full SOI number = 61J/4.' },
            { text: 'Boundaries: Lat 13°00\'N to 13°15\'N; Long 77°30\'E to 77°45\'E. (Note: 15\' = 0.25°).' },
            { text: 'Verify area: Lat extent 15\' ≈ 27.7 km. Long extent at 13°N: 15\' × cos(13°) × 111 km/° = 0.25 × 0.974 × 111 ≈ 27.0 km.', faded: true, blankAnswer: 'SOI Toposheet Number: 61J/4. Boundaries: 13°00\'N–13°15\'N.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_24_002', title: 'Contours: Definition, Characteristics and Contour Interval',
          scaffold: { problem: 'On a Survey of India 1:50,000 topographical sheet (G43S10), the contour interval is given as 20 m.',
            steps: [
            { text: 'Identify the contour interval (CI) from the map margin: CI = 20 m (vertical difference between the two contours).' },
            { text: 'Measure the map distance between the two contours: given as 4 mm = 0.4 cm.' },
            { text: 'Convert map distance to ground distance (Horizontal Equivalent, HE) using the Representative Fraction (RF) 1:50,000.' },
            { text: 'Calculate gradient = CI / HE = 20 m / 200 m = 1/10 = 1:10.' },
            { text: 'Convert to percentage: (1/10) × 100 = 10%.' },
            { text: 'Interpret: a gradient of 1:10 (10%) indicates a moderately steep slope; for every 10 m horizontal travel, elevation.', faded: true, blankAnswer: 'Gradient = 1:10 (or 10%).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_24_003', title: 'Interpreting Contours: Slope Types (Gentle, Steep, Concave, Convex)',
          scaffold: { problem: 'On a 1:50,000 scale Survey of India toposheet (Sheet 45D/10), the contour interval is 20 m.',
            steps: [
            { text: 'Identify the contour interval (VI = 20 m) and map scale (1:50,000).' },
            { text: 'Convert map distances to ground distances (Horizontal Equivalent) for each segment: HE1 = 1.5 mm × 50,000 = 75,000.' },
            { text: 'Calculate gradient for each segment: tan θ1 = VI/HE1 = 20/75 = 0.267 → θ1 ≈ 15°; tan θ2 = 20/150 = 0.133 → θ2 ≈ 7.6°.' },
            { text: 'Analyze the trend: The upper segment (300-320 m) is steeper (15°) than the lower segment (320-340 m) (7.6°).' },
            { text: 'Classify slope type: Since spacing increases downward, the slope is concave.' },
            { text: 'Interpret in context: This concave profile is typical of a river valley side in the Deccan Plateau where erosion.', faded: true, blankAnswer: 'The slope is concave. Upper segment gradient ≈ 15°.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_24_004', title: 'Identification of Landforms: Valleys, Ridges, Spurs and Saddles',
          caseStudy: { intro: 'Imagine standing on a hilltop in the Western Ghats near Mahabaleshwar during monsoon - you see deep valleys cutting into the plateau, ridges radiating outward.',
            decisions: [{ prompt: 'On a 1:50,000 toposheet, you see a series of contour lines forming a distinct V-shape with the apex pointing towards higher elevation.', options: [
                { text: 'This represents a **valley** (V-shaped, youthful river valley)', outcome: 'This represents a **valley** (V-shaped, youthful river valley).' },
                { text: 'stream flows away from apex', outcome: 'Not quite — Students consistently **reverse the "V-rule" for valleys vs. ridges**: they think "V points.', reveals: 'students-consistently-reverse-the-v' },
                { text: 'V-shape = valley', outcome: 'Not quite — Students consistently **reverse the "V-rule" for valleys vs. ridges**: they think "V points.', reveals: 'students-consistently-reverse-the-v' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_24_005', title: 'Drainage Patterns on Topographical Maps (Dendritic, Trellis, Radial)',
          caseStudy: { intro: 'Imagine you are trekking in the Western Ghats near Mahabaleshwar and notice how every small stream splits into smaller rivulets like the branches of a banyan.',
            decisions: [{ prompt: 'On a 1:50,000 topographical sheet, you observe a stream network where tributaries join the main river at acute angles (30°–45°) in.', options: [
                { text: 'This represents a **dendritic drainage pattern**, indicating a **homogeneous lithology**', outcome: 'This represents a **dendritic drainage pattern**, indicating a **homogeneous lithology** (uniform.' },
                { text: 'trellis', outcome: 'Not quite — Students often believe **drainage pattern is determined solely by slope steepness** (e.g., "steep.', reveals: 'drainage-pattern-is-determined-solely' },
                { text: 'radial', outcome: 'Not quite — Students often believe **drainage pattern is determined solely by slope steepness** (e.g., "steep.', reveals: 'drainage-pattern-is-determined-solely' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_24_006', title: 'Settlement and Transport Features on Topographical Maps',
          scaffold: { problem: 'On a 1:50,000 toposheet (contour interval 20 m), a cart track (dashed black line) crosses 5 contours in a map distance of 1.5 cm.',
            steps: [
            { text: 'Identify the given data: CI = 20 m, number of contours crossed = 5, MD = 1.5 cm, Scale = 1:50,000.' },
            { text: 'Calculate Vertical Interval (VI) = CI × number of contours = 20 m × 5 = 100 m.' },
            { text: 'Calculate Horizontal Equivalent (HE) = MD × Scale / 100 = 1.5 cm × 50,000 / 100 = 750 m (since 1 m = 100 cm).' },
            { text: 'Compute Gradient = VI / HE = 100 / 750 = 0.133 = 1:7.5 or 13.3%.' },
            { text: 'Interpret: A gradient of 1:7.5 is very steep for a cart track; bullock carts typically manage up to 1:10 (10%).', faded: true, blankAnswer: 'Average gradient = 1:7.5 (13.3%), which is too steep for.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_24_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Planning a trek with a Survey of India toposheet marked 45D/7, a friend decodes it as \'series 45, the 10th sheet in sub-sheet D\' and asks how many 1:50,000 sheets sit inside 45D — he guesses ten. On the trek he also warns: \'The contour interval is 20 m on the flat parts but jumps to 50 m where it\'s steep.\'',
            decisions: [{ prompt: 'What does the numbering system actually mean, and what\'s wrong with the contour claim?', options: [
                { text: 'Decode properly: \'45\' is a grid position in the 4°×4° International Map grid, \'D\' is the 4th cell of a 4×4 matrix of 1:250,000 sheets, and each of those subdivides into exactly four 1:50,000 sheets (1–4) — so \'10\' can\'t exist and the answer is 4. And the contour interval is fixed for the whole sheet as printed in the margin; only the spacing between contours tightens on steep ground.', outcome: 'Both errors dissolve: the code is a nested spatial index, not serial numbers, and slope changes the gaps between contours — never the interval.' },
                { text: 'Go with the serial reading — 45D/10 reads like volume 45, section D, sheet 10.', outcome: 'Alphanumerics here are coordinates: the final quadrant only runs 1–4 because each 1:250,000 sheet splits into four 1:50,000 sheets.', reveals: 'toposheet-code-is-serial' },
                { text: 'Accept the variable interval — steep terrain needs a bigger vertical step to stay readable.', outcome: 'The interval is declared per sheet and constant; what changes with slope is the horizontal equivalent — close contours mean steep, not a bigger CI.', reveals: 'contour-interval-varies-on-sheet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_24_006', title: 'The bigger picture',
          caseStudy: { intro: 'Two millimetres between contours versus five is a 20% slope versus an 8% one — the map measures steepness if you read the spacing.',
            decisions: [{ prompt: 'What comes next? Topographical Maps · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Topographical Maps · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_001', difficulty: 'standard',
          question: 'A topographical map is a detailed, large-scale representation of a small.',
          hint: 'Review Class 8 "Map Projections: Distortions" (c8_geo_ch2_3) and Class 9 "Plate.',
          misconception: 'Students believe the SOI number "45D/10" implies Sheet 10 of Sub-sheet D of Series 45 in a simple linear sequence, like.',
          parts: [
                { id: 'a', prompt: 'A toposheet is numbered 56H/3. Calculate its latitudinal and longitudinal extent at 1:50,000 scale, and name the 1:1M sheet and 1:250K sheet it belongs to.', answer: 'Step 1: Decode 56H/3 → 1:1M sheet = 56, 1:250K sheet = H, 1:50K quadrant = 3',
                  options: ['Step 1: Decode 56H/3 → 1:1M sheet = 56, 1:250K sheet = H, 1:50K quadrant = 3', '45D/10'],
                  hint: 'Review Class 8 "Map Projections: Distortions" (c8_geo_ch2_3) and Class 9 "Plate Tectonics.',
                  misconception: 'Students believe the SOI number "45D/10" implies Sheet 10 of Sub-sheet D of Series 45 in a simple linear sequence, like book volumes.' }
          ],
            remediations: { 'the-soi-number-45d-10': { steps: ['Draw a 4°×4° square on paper. Label it "1:1M Sheet 45".', 'Divide into 4×4 grid (16 squares). Label rows A-D, columns 1-4?', 'Pick one (e.g., D). Divide into 2×2. Label quadrants 1 (NW), 2 (NE), 3 (SW), 4 (SE).', 'Physically trace: "45D/3 is the SW quadrant of the D sub-sheet of 1:1M sheet 45."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the SOI number "45D/10" implies Sheet 10 of Sub-sheet D of Series 45 in a simple linear sequence, like.',
          parts: [
                { id: 'a', prompt: 'Design a workflow for a disaster management team to quickly identify all 1:50,000 toposheets covering a flood-affected district spanning 3,600 km² in Assam.', answer: 'Step 1: Obtain district boundary as polygon (lat/long)',
                  options: ['Step 1: Obtain district boundary as polygon (lat/long)', '45D/10'],
                  hint: 'Review Class 8 "Map Projections: Distortions" (c8_geo_ch2_3) and Class 9 "Plate Tectonics.',
                  misconception: 'Students believe the SOI number "45D/10" implies Sheet 10 of Sub-sheet D of Series 45 in a simple linear sequence, like book volumes.' }
          ],
            remediations: { 'the-soi-number-45d-10': { steps: ['Draw a 4°×4° square on paper. Label it "1:1M Sheet 45".', 'Divide into 4×4 grid (16 squares). Label rows A-D, columns 1-4?', 'Pick one (e.g., D). Divide into 2×2. Label quadrants 1 (NW), 2 (NE), 3 (SW), 4 (SE).', 'Physically trace: "45D/3 is the SW quadrant of the D sub-sheet of 1:1M sheet 45."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_002', difficulty: 'standard',
          question: 'A contour is an imaginary line on a topographical map joining all points.',
          hint: 'If stuck, revisit c11_geo_cbse_24_001 (topographical map basics) and practice reading the.',
          misconception: 'Students often believe that the contour interval changes across a single map sheet (e.g., "CI is 20 m in plains but 50.',
          parts: [
                { id: 'a', prompt: 'Why do contour lines never cross or intersect each other on a topographical map?', answer: 'Each contour represents a unique elevation',
                  options: ['Each contour represents a unique elevation', 'because the map would become messy', 'contours only cross at cliffs', 'CI is 20 m in plains but 50 m in hills on the same map'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_001 (topographical map basics) and practice reading the margin.',
                  misconception: 'Students often believe that the contour interval changes across a single map sheet (e.g., "CI is 20 m in plains but 50 m in hills on the.' },
                { id: 'b', prompt: 'On a 1:50,000 toposheet with CI = 20 m, you see two index contours labelled 600 and 640.', answer: 'Index contours appear at every 5th contour (100 m vertical interval)',
                  options: ['Index contours appear at every 5th contour (100 m vertical interval)', 'CI is 20 m in plains but 50 m in hills on the same map', 'different CIs for different parts of the same toposheet', 'the contour interval changes across a single map sheet (e'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_001 (topographical map basics) and practice reading the margin.',
                  misconception: 'Students often believe that the contour interval changes across a single map sheet (e.g., "CI is 20 m in plains but 50 m in hills on the.' }
          ],
            remediations: { 'the-contour-interval-changes-across': { steps: ['Give the student a 1:50,000 toposheet extract (e.g., G43S10) and ask them to locate the contour interval note in the.', 'Have them trace three consecutive contours (e.g., 300, 320, 340) across a hill and a valley, verifying the elevation.', 'Ask them to measure horizontal distance between those contours in steep vs.', 'Reinforce with a diagram showing a single hill with constant CI but variable contour spacing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_003', difficulty: 'standard',
          question: 'Contour interpretation for slope types involves analyzing the spacing and.',
          hint: 'If stuck, revisit c11_geo_cbse_24_002 (Contours: Definition, Characteristics and Contour.',
          misconception: 'Students often think that concave slopes are always steep and convex slopes are always gentle because they associate.',
          parts: [
                { id: 'a', prompt: 'Why does a concave slope show contour lines that are closely spaced at the top and widely spaced at the bottom?', answer: 'A concave slope is steeper at the top and gentler at the bottom',
                  options: ['A concave slope is steeper at the top and gentler at the bottom', 'concave', 'convex', 'bulging out'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_002 (Contours: Definition, Characteristics and Contour Interval).',
                  misconception: 'Students often think that concave slopes are always steep and convex slopes are always gentle because they associate "concave" with "caving.' },
                { id: 'b', prompt: 'On a 1:50,000 topographical map with a contour interval of 20 m, you measure the horizontal distance between two adjacent contours on a slope as 2 mm on the.', answer: 'Horizontal equivalent = 2 mm × 50,000 = 100,000 mm = 100 m',
                  options: ['Horizontal equivalent = 2 mm × 50,000 = 100,000 mm = 100 m', 'concave', 'convex', 'bulging out'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_002 (Contours: Definition, Characteristics and Contour Interval).',
                  misconception: 'Students often think that concave slopes are always steep and convex slopes are always gentle because they associate "concave" with "caving.' }
          ],
            remediations: { 'concave-slopes-are-always-steep': { steps: ['Use a physical model (e.g., sand tray) to shape a concave and a convex slope, then simulate contour lines by slicing.', 'Have the student measure the horizontal distance between slices at top, middle, and bottom.', 'Plot these distances on graph paper to visualize that concavity/convexity is about the trend of spacing, not the.', 'Then, on a real SOI map (e.g., 45D/10), locate a concave slope (e.g., a river valley side) and a convex slope (e.g.,.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_004', difficulty: 'standard',
          question: 'Landform identification on topographical maps is the systematic interpretation.',
          hint: 'If stuck, return to c11_geo_cbse_24_002 and practice "contour walking" - trace 5 contours.',
          misconception: 'Students consistently **reverse the "V-rule" for valleys vs. ridges**: they think "V points downstream" for both,.',
          parts: [
                { id: 'a', prompt: 'On a 1:50,000 toposheet, you see a series of contour lines forming a distinct V-shape with the apex pointing towards higher elevation (contour values increase.', answer: 'This represents a **valley** (V-shaped, youthful river valley)',
                  options: ['This represents a **valley** (V-shaped, youthful river valley)', 'stream flows away from apex', 'V-shape = valley'],
                  hint: 'If stuck, return to c11_geo_cbse_24_002 and practice "contour walking" - trace 5 contours from.',
                  misconception: 'Students consistently **reverse the "V-rule" for valleys vs. ridges**: they think "V points downstream" for both, or memorize "valley =.' }
          ],
            remediations: { 'students-consistently-reverse-the-v': { steps: ['**Revisit c11_geo_cbse_24_002:** Practice reading contour values - pick any contour, trace it, read 3-4 spot heights.', '**Physical model exercise:** Use a clay model of a valley and ridge.', 'Shine light from side to cast "contour" shadows.', 'Rotate model - observe how V-shape orientation changes with light direction, but **contour values (elevation) stay.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_005', difficulty: 'standard',
          question: 'Drainage pattern refers to the geometric arrangement of streams, rivers, and.',
          hint: 'If stuck, revisit c11_geo_cbse_24_003 (slope types from contours) and c11_geo_cbse_24_004.',
          misconception: 'Students often believe **drainage pattern is determined solely by slope steepness** (e.g., "steep slopes = radial.',
          parts: [
                { id: 'a', prompt: 'A student identifies a drainage pattern as "trellis" because the main streams appear parallel.', answer: 'The classification is incorrect',
                  options: ['The classification is incorrect', 'parallel main streams', 'steep slopes = radial, gentle slopes = dendritic', '**drainage pattern is determined solely by slope steepness** (e'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_003 (slope types from contours) and c11_geo_cbse_24_004.',
                  misconception: 'Students often believe **drainage pattern is determined solely by slope steepness** (e.g., "steep slopes = radial, gentle slopes.' },
                { id: 'b', prompt: 'Given a topo sheet extract where contours form concentric circles with a spot height of 1,450 m at the centre, and blue-line streams radiate outward in all.', answer: '**Step 1:** Map distance = 4.2 cm',
                  options: ['**Step 1:** Map distance = 4.2 cm', 'steep slopes = radial, gentle slopes = dendritic', '**drainage pattern is determined solely by slope steepness** (e'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_003 (slope types from contours) and c11_geo_cbse_24_004.',
                  misconception: 'Students often believe **drainage pattern is determined solely by slope steepness** (e.g., "steep slopes = radial, gentle slopes.' }
          ],
            remediations: { 'drainage-pattern-is-determined-solely': { steps: ['**Revisit contour-stream relationship**: On a known dendritic area (e.g., Deccan Plateau topo sheet 55D/10), trace 5.', '**Contrast with trellis**: On Aravalli sheet 45D/12, identify a strike valley, trace consequent stream along it, then.', '**Build a "structure → pattern" table**: Homogeneous horizontal → dendritic; Alternating hard/soft folded → trellis.', '**Practice with 3 unknown extracts**: Classify each, write one-sentence structural justification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_006', difficulty: 'standard',
          question: 'Settlement and transport features on topographical maps refer to the.',
          hint: 'If stuck, revisit c11_geo_cbse_24_003 (Interpreting Contours: Slope Types) and practice.',
          misconception: 'Students often think that a "metalled road" (thick red line) on a toposheet is always a National Highway.',
          parts: [
                { id: 'a', prompt: 'Why do nucleated settlements typically appear on flat interfluves between two rivers on a toposheet, while dispersed settlements are found on undulating.', answer: 'Nucleated settlements cluster on flat interfluves',
                  options: ['Nucleated settlements cluster on flat interfluves', 'water availability', 'metalled road', 'a "metalled road" (thick red line) on a toposheet is always a National Highway'],
                  hint: 'If stuck, revisit c11_geo_cbse_24_003 (Interpreting Contours: Slope Types) and practice drawing.',
                  misconception: 'Students often think that a "metalled road" (thick red line) on a toposheet is always a National Highway.' }
          ],
            remediations: { 'a-metalled-road-thick-red': { steps: ['Open the SOI conventional signs chart (Appendix of Practical Work in Geography textbook) and locate the "Roads" section.', 'Compare the symbol for "Metalled Road" (thick red line) with "National Highway" (same symbol but with NH number).', 'On a toposheet (e.g., 45D/10), trace three red lines: one with "NH 44", one with "SH 26", one unnumbered.', 'Write in your notebook: "All NH are metalled roads, but not all metalled roads are NH."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
