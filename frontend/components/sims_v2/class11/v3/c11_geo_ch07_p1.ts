import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch07_p1: SimDef = {
    id: 'v3_c11_geo_ch07_p1',
    title: 'Landforms and their Evolution · Part 1/2',
    subtitle: 'Watch a river carve V-valleys and slowly erase its own waterfalls.',
    classLevel: 11, subject: 'geography', topic: 'Landforms and their Evolution · Part 1/2',
    chapters: ['c11_geo_ch07'],
    nodeIds: ['c11_geo_cbse_07_001', 'c11_geo_cbse_07_002', 'c11_geo_cbse_07_003', 'c11_geo_cbse_07_004', 'c11_geo_cbse_07_005', 'c11_geo_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fluvial geomorphologist reading a monsoon river', intro: 'The Yamuna runs brown with sediment — that colour is the river filing its own valley down.', goal: 'Identify the four fluvial erosion mechanisms and explain V-valley and waterfall evolution.' },
    discovery: {
        question: 'Jog Falls thunders off a hard basalt lip — so a waterfall must be a permanent fixture where the rock is tough?',
        options: ['No — the plunge pool undercuts the lip, the cap rock collapses, and the falls migrate upstream until the river\'s profile smooths out', 'Yes — hard rock anchors a waterfall forever', 'Yes — only earthquakes can move one', 'No — waterfalls evaporate before they can migrate'],
        answer: 'No — the plunge pool undercuts the lip, the cap rock collapses, and the falls migrate upstream until the river\'s profile smooths out',
        hook: 'A waterfall is a nick point being erased in slow motion — every falls you photograph is a scar mid-healing.',
    },
    teaching: [
        { title: 'Fluvial Processes: River Erosion Mechanisms', text: 'Fluvial erosion mechanisms are the four primary processes by which flowing river water mechanically wears away and removes bedrock and sediment from the channel bed and banks: hydraulic action (force.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read V-shaped contours on a topo map to find valley depth and flow direction, then separate corrasion, corrosion and attrition.',
        labels: ['Fluvial Processes: River Erosion', 'Fluvial Landforms: V-shaped Valleys', 'Fluvial Landforms: Meanders, Oxbow', 'Fluvial Landforms: Deltas', 'Groundwater and Karst Topography', 'Glacial Landforms: Cirques, U-shaped'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_07_001', title: 'Fluvial Processes: River Erosion Mechanisms',
          scaffold: { problem: 'The upper Bhagirathi (Ganga headwater) flows at 3.2 m/s over jointed granite with a discharge of 180 m³/s, slope 0.012, width 45 m.',
            steps: [
            { text: 'Identify given parameters: ρ = 1000 kg/m³, g = 9.8 m/s², Q = 180 m³/s, S = 0.012, w = 45 m.' },
            { text: 'Apply stream power formula ω = ρgQS/w = (1000 × 9.8 × 180 × 0.012) / 45.' },
            { text: 'Calculate numerator: 1000 × 9.8 = 9800; 9800 × 180 = 1,764,000; 1,764,000 × 0.012 = 21,168.' },
            { text: 'Divide by width: 21,168 / 45 = 470.4 W/m².' },
            { text: 'Interpret: ω = 470 W/m² is high (threshold for bedrock erosion ~100-200 W/m²).' },
            { text: 'Conclude: Abrasion dominates because high stream power mobilizes coarse tools that can grind the resistant granite.', faded: true, blankAnswer: 'ω = 470.4 W/m²; abrasion dominates due to high stream.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_002', title: 'Fluvial Landforms: V-shaped Valleys and Waterfalls',
          caseStudy: { intro: 'Observe a mountain stream near Manali or Darjeeling during monsoon — the water rushes down steep slopes, cutting deeply into bedrock rather than widening its.',
            decisions: [{ prompt: 'Define a V-shaped valley and state the dominant erosion process responsible for its formation in the upper course of a river.', options: [
                { text: 'A V-shaped valley is a steep-sided, narrow valley with a cross-profile resembling the', outcome: 'A V-shaped valley is a steep-sided, narrow valley with a cross-profile resembling the letter \'V\'.' },
                { text: 'lateral erosion forms V-shaped valleys', outcome: 'Not quite — Students often believe waterfalls form only when a river flows over a cliff created by faulting.', reveals: 'waterfalls-form-only-when-a' },
                { text: 'deposition forms them', outcome: 'Not quite — Students often believe waterfalls form only when a river flows over a cliff created by faulting.', reveals: 'waterfalls-form-only-when-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_07_003', title: 'Fluvial Landforms: Meanders, Oxbow Lakes and Floodplains',
          scaffold: { problem: 'On a 1:50,000 topographic map (Sheet 63K/12, Ganga near Buxar), a meander loop has a channel length of 8.2 cm along the blue line and.',
            steps: [
            { text: 'Convert map measurements to ground distances using scale 1:50,000 (1 cm = 500 m).' },
            { text: 'Calculate sinuosity index SI = Lc / Lv = 4,100 / 1,550 = 2.65. This falls in the meandering range (1.5–3.0).' },
            { text: 'Estimate meander wavelength λ using empirical relation λ ≈ 10–14 × W.' },
            { text: 'Estimate radius of curvature Rc ≈ 2–3 × W. Using mean 2.5: Rc = 2.5 × 225 = 562.5 m. (Range: 450–675 m).' },
            { text: 'Classify channel pattern: SI = 2.65 > 1.5, single-thread channel visible on map → meandering.' },
            { text: 'Interpret geographical significance: High sinuosity indicates mature stage, low gradient, fine sediment load.', faded: true, blankAnswer: '(a) SI = 2.65, (b) λ ≈ 2.7 km (2.25–3.15 km), (c) Rc ≈ 563.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_004', title: 'Fluvial Landforms: Deltas and Estuaries',
          caseStudy: { intro: 'Stand at the Sundarbans ferry ghat in West Bengal: the water is brown with silt, the channel splits into three, mangroves fringe mudbanks — you are on a delta.',
            decisions: [{ prompt: 'Define the term "distributary" and state its role in delta formation.', options: [
                { text: 'A distributary is a channel that branches off from the main river channel and carries', outcome: 'A distributary is a channel that branches off from the main river channel and carries water and.' },
                { text: 'a small tributary joining the main river', outcome: 'Not quite — Students think "all large rivers form deltas" and "estuaries are just river mouths without deltas.".', reveals: 'all-large-rivers-form-deltas' },
                { text: 'all large rivers form deltas', outcome: 'Not quite — Students think "all large rivers form deltas" and "estuaries are just river mouths without deltas.".', reveals: 'all-large-rivers-form-deltas' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_005', title: 'Groundwater and Karst Topography: Sinkholes, Caves, Stalactites',
          caseStudy: { intro: 'Observe how rainwater disappears into the ground near limestone quarries in regions like Meghalaya\'s Siju Cave area or the Deccan Plateau\'s limestone patches.',
            decisions: [{ prompt: 'What is the chemical equation for the dissolution of limestone by carbonic acid, and why does this reaction require the presence of both.', options: [
                { text: 'The reaction is: CaCO₃ (solid) + H₂CO₃ (aq) → Ca(HCO₃)₂ (aq)', outcome: 'The reaction is: CaCO₃ (solid) + H₂CO₃ (aq) → Ca(HCO₃)₂ (aq). Carbonic acid forms only when CO₂.' },
                { text: 'limestone dissolves in plain water', outcome: 'Not quite — Students often think stalactites and stalagmites are formed by "dripping water depositing minerals".', reveals: 'stalactites-and-stalagmites-are-formed' },
                { text: 'dripping water depositing minerals', outcome: 'Not quite — Students often think stalactites and stalagmites are formed by "dripping water depositing minerals".', reveals: 'stalactites-and-stalagmites-are-formed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_001', title: 'A real-world call',
          caseStudy: { intro: 'Natural hazards — floods, earthquakes — become disasters mainly where poverty forced people into dangerous places. The hazard is natural; the vulnerability is built.',
            decisions: [{ prompt: 'Is a \'natural\' disaster ever really natural?', options: [
                { text: 'The hazard is natural — the disaster is political', outcome: 'The framing disaster-research actually uses — nature provides the event; human choices provide the casualties.' },
                { text: 'Both are natural — people have always lived in risky places', outcome: 'Historically true; but \'always lived there\' often meant \'had nowhere else to go\'.' },
                { text: 'Doesn\'t matter — prepare either way', outcome: 'The pragmatist answer; but preparation designed for the wrong cause protects the wrong things.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a monsoon trek near a Deccan waterfall, a friend announces: \'This falls exists because a fault dropped the land here, and it\'ll be at this exact spot forever.\' Later she writes in her field diary: \'Attrition is how the river erodes its bed; corrasion and corrosion are the same thing.\'',
            decisions: [{ prompt: 'Which parts of her river science need fixing?', options: [
                { text: 'Fix all three: most peninsular waterfalls (Jog, Dudhsagar) form by differential erosion — a hard basalt cap over softer rock — and they retreat upstream cm per year, not stay fixed. Corrasion is mechanical grinding by the sediment load; corrosion is chemical solution of soluble rock — different processes. Attrition rounds the river\'s own pebbles; it doesn\'t erode bedrock directly.', outcome: 'Her diary now separates the four erosion mechanisms properly — hydraulic action, abrasion/corrasion, attrition, solution — and the waterfall becomes a moving feature, not a monument.' },
                { text: 'Let the fault story stand — a vertical drop needs a cliff, and cliffs need faulting.', outcome: 'Most Indian falls come from differential erosion of layered rock, not fault scarps — and the retreat upstream proves the drop is being actively excavated.', reveals: 'waterfalls-need-faults' },
                { text: 'Correct only the waterfall — corrasion and corrosion are close enough to treat as one process.', outcome: 'The names differ by a letter but the mechanisms differ in kind: grinding with sediment tools vs dissolving minerals chemically — boards test exactly this distinction.', reveals: 'corrasion-corrosion-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Rivers erode four ways at once — water that plucks, sediment that grinds, pebbles that round each other, and chemistry that quietly dissolves.',
            decisions: [{ prompt: 'What comes next? Landforms and their Evolution · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Landforms and their Evolution · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_001', difficulty: 'standard',
          question: 'Fluvial erosion mechanisms are the four primary processes by which flowing.',
          hint: 'Review the graded long profile concept from Class 9 (c9_geo_ch1_8) and the relationship.',
          misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion.',
          parts: [
                { id: 'a', prompt: 'Define hydraulic action in fluvial erosion and state the specific condition of bedrock that makes it most effective.', answer: 'Hydraulic action is the sheer force of moving water dislodging and removing rock',
                  options: ['Hydraulic action is the sheer force of moving water dislodging and removing rock', 'hydraulic action is sandpaper-like grinding', 'corrasion', 'corrosion'],
                  hint: 'Review the graded long profile concept from Class 9 (c9_geo_ch1_8) and the relationship between.',
                  misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion mechanism.' },
                { id: 'b', prompt: 'A river reach has a mean velocity of 2.5 m/s, carries a suspended load of 1200 ppm and bedload of 30% quartz pebbles (D50 = 45 mm) over a sandstone bedrock.', answer: 'ω = (1000 × 9.8 × 850 × 0.0015) / 120 = 105.4 W/m²',
                  options: ['ω = (1000 × 9.8 × 850 × 0.0015) / 120 = 105.4 W/m²', 'corrasion', 'corrosion', 'attrition erodes the river bed'],
                  hint: 'Review the graded long profile concept from Class 9 (c9_geo_ch1_8) and the relationship between.',
                  misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion mechanism.' }
          ],
            remediations: { 'corrasion-and-corrosion-are-synonyms': { steps: ['Create a 4-column table (Process, Agent, Action on Bedrock, Action on Sediment) and fill it using the definitions above.', 'Watch a 2-minute video of flume experiments showing each process in isolation (search "fluvial erosion processes.', 'Collect 10 pebbles from a local stream, measure roundness (Power\'s scale), and plot roundness vs.', 'Re-attempt Diagnostic Questions 1-2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Solution erosion is negligible in Indian rivers except in limestone terrains." Consider the chemical composition of major Indian river.', answer: 'The statement is false',
                  options: ['The statement is false', 'corrasion', 'corrosion', 'attrition erodes the river bed'],
                  hint: 'Review the graded long profile concept from Class 9 (c9_geo_ch1_8) and the relationship between.',
                  misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion mechanism.' }
          ],
            remediations: { 'corrasion-and-corrosion-are-synonyms': { steps: ['Create a 4-column table (Process, Agent, Action on Bedrock, Action on Sediment) and fill it using the definitions above.', 'Watch a 2-minute video of flume experiments showing each process in isolation (search "fluvial erosion processes.', 'Collect 10 pebbles from a local stream, measure roundness (Power\'s scale), and plot roundness vs.', 'Re-attempt Diagnostic Questions 1-2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_002', difficulty: 'standard',
          question: 'V-shaped valleys are steep-sided, narrow valleys with a cross-profile.',
          hint: 'Revisit c11_geo_cbse_07_001 for erosion mechanisms and Class 9 Chapter 1 (c9_geo_ch1_8).',
          misconception: 'Students often believe waterfalls form only when a river flows over a cliff created by faulting or a sudden drop.',
          parts: [
                { id: 'a', prompt: 'On a 1:50,000 topographic map, a river in its upper course shows contour lines forming sharp V-shapes pointing upstream with a contour interval of 20 m.', answer: 'Valley depth = 1,400 m - 1,200 m = 200 m',
                  options: ['Valley depth = 1,400 m - 1,200 m = 200 m', 'V points downstream'],
                  hint: 'Revisit c11_geo_cbse_07_001 for erosion mechanisms and Class 9 Chapter 1 (c9_geo_ch1_8) for river.',
                  misconception: 'Students often believe waterfalls form only when a river flows over a cliff created by faulting or a sudden drop in land level, and that.' },
                { id: 'b', prompt: 'Compare the cross-profile of a V-shaped valley in the Himalayas (e.g., Bhagirathi near Gangotri) with a U-shaped valley in the same region (e.g., a glacial.', answer: '(1) V-shape vs',
                  options: ['(1) V-shape vs', 'both are formed by rivers', 'U-shape is just a wider V-shape'],
                  hint: 'Revisit c11_geo_cbse_07_001 for erosion mechanisms and Class 9 Chapter 1 (c9_geo_ch1_8) for river.',
                  misconception: 'Students often believe waterfalls form only when a river flows over a cliff created by faulting or a sudden drop in land level, and that.' }
          ],
            remediations: { 'waterfalls-form-only-when-a': { steps: ['Use a physical model — tilt a tray of sand with a hard layer (cardboard) over soft sand; pour water to show nick point.', 'Show time-lapse video of waterfall retreat (e.g., Niagara Falls historical photos).', 'On a topographic map (Survey of India 1:50k sheet 53H/12 for Jog Falls), trace contour patterns upstream of the falls.', 'Contrast with a fault-scarp waterfall (e.g., Hundru Falls on Subarnarekha, Jharkhand) where retreat is slower due.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_003', difficulty: 'standard',
          question: 'Meanders are sinuous, loop-like bends in a river channel formed by lateral.',
          hint: 'Revisit c11_geo_cbse_07_001 "Fluvial Processes: River Erosion Mechanisms" — specifically.',
          misconception: 'Students believe meanders migrate downstream only, but in reality they migrate laterally (sideways) AND downstream.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Meanders are sinuous, loop-like bends in a river channel formed by lateral erosion on the',
                  options: ['Meanders are sinuous, loop-like bends in a river channel formed by lateral erosion on the', 'Fluvial erosion mechanisms are the four primary processes by', 'V-shaped valleys are steep-sided, narrow valleys with a cross-profile resembling the', 'A delta is a depositional landform formed at a river\'s mouth where sediment-laden water'],
                  hint: 'Revisit c11_geo_cbse_07_001 "Fluvial Processes: River Erosion Mechanisms" — specifically the.',
                  misconception: 'Students believe meanders migrate downstream only, but in reality they migrate laterally (sideways) AND downstream (translation), and can.' }
          ],
            remediations: { 'meanders-migrate-downstream-only': { steps: ['Use a stream table or sandbox model — carve a sinuous channel, run water, inject dye to visualize helicoidal flow.', 'On a printed topo map of the Ganga (e.g., Patna sheet), trace 3 successive meander loops, measure neck width vs.', 'Compare pre- and post-monsoon Sentinel-2 imagery of the same reach — identify new chute cutoffs on point bars.', 'Calculate sinuosity for a 10 km reach from 1975 and 2020 maps; discuss change.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_004', difficulty: 'standard',
          question: 'A delta is a depositional landform formed at a river\'s mouth where.',
          hint: 'Revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_003 (lower course.',
          misconception: 'Students think "all large rivers form deltas" and "estuaries are just river mouths without deltas." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Why does the Ganga-Brahmaputra form the world\'s largest delta while the Narmada and Tapti form estuaries, despite all four rivers originating in high-relief.', answer: 'The Ganga-Brahmaputra carries ~1 billion tonnes/year of sediment into a shallow,',
                  options: ['The Ganga-Brahmaputra carries ~1 billion tonnes/year of sediment into a shallow,', 'sediment amount', 'all large rivers form deltas', 'estuaries are just river mouths without deltas'],
                  hint: 'Revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_003 (lower course deposition).',
                  misconception: 'Students think "all large rivers form deltas" and "estuaries are just river mouths without deltas." In reality, the Narmada (1,312.' },
                { id: 'b', prompt: 'Given a topographic map (1:50,000) showing a river mouth with: (a) multiple bifurcating channels, (b) contour lines closing seaward at 5 m interval, (c).', answer: 'Landform: Arcuate delta (e.g., Godavari)',
                  options: ['Landform: Arcuate delta (e.g., Godavari)', 'all large rivers form deltas', 'estuaries are just river mouths without deltas'],
                  hint: 'Revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_003 (lower course deposition).',
                  misconception: 'Students think "all large rivers form deltas" and "estuaries are just river mouths without deltas." In reality, the Narmada (1,312.' },
                { id: 'c', prompt: 'Compare the ecological functioning of a tide-dominated estuary (e.g., Hooghly) and a wave-dominated delta (e.g., Krishna) regarding: (i) salinity gradient.', answer: '(i) Estuary: sharp longitudinal salinity gradient (0-35 ppt over 50-100 km)',
                  options: ['(i) Estuary: sharp longitudinal salinity gradient (0-35 ppt over 50-100 km)', 'coastal wetlands', 'all large rivers form deltas', 'estuaries are just river mouths without deltas'],
                  hint: 'Revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_003 (lower course deposition).',
                  misconception: 'Students think "all large rivers form deltas" and "estuaries are just river mouths without deltas." In reality, the Narmada (1,312.' }
          ],
            remediations: { 'all-large-rivers-form-deltas': { steps: ['Plot Narmada and Subarnarekha on India outline map; note coastal orientation (west vs east).', 'Compare tidal range data: Gulf of Khambhat (10 m) vs Bay of Bengal (2 m).', 'Calculate sediment yield: Narmada ~20 Mt/yr, Subarnarekha ~15 Mt/yr — similar, yet different landforms.', 'Conclude: marine energy (tides, waves, shelf slope) is the decisive filter, not river size alone.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_005', difficulty: 'standard',
          question: 'Karst topography is a distinctive landscape formed by the chemical dissolution.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and.',
          misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals.',
          parts: [
                { id: 'a', prompt: 'What is the chemical equation for the dissolution of limestone by carbonic acid, and why does this reaction require the presence of both carbon dioxide and.', answer: 'The reaction is: CaCO₃ (solid) + H₂CO₃ (aq) → Ca(HCO₃)₂ (aq)',
                  options: ['The reaction is: CaCO₃ (solid) + H₂CO₃ (aq) → Ca(HCO₃)₂ (aq)', 'limestone dissolves in plain water', 'dripping water depositing minerals'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and Biological".',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation.' },
                { id: 'b', prompt: 'On a topographic map of a karst region (scale 1:50,000), you notice numerous closed depressions with hachured contour lines, no surface streams, and a cave.', answer: 'Depth = (300 - 260) m = 40 m (2 contour intervals × 20 m)',
                  options: ['Depth = (300 - 260) m = 40 m (2 contour intervals × 20 m)', 'streams are too small to map', 'arid climate', 'dripping water depositing minerals'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and Biological".',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation.' },
                { id: 'c', prompt: 'Compare the formation conditions of a stalactite and a stalagmite.', answer: 'Stalactites grow downward from the ceiling where dripping water loses CO₂ and',
                  options: ['Stalactites grow downward from the ceiling where dripping water loses CO₂ and', 'they grow fast like icicles', 'dripping water depositing minerals'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and Biological".',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation.' }
          ],
            remediations: { 'stalactites-and-stalagmites-are-formed': { steps: ['Demonstrate the carbonation reaction in class — bubble CO₂ through water with universal indicator (pH drops), then add.', 'Use a syringe to show how pressure drop (simulating cave atmosphere) causes degassing.', 'Compare photos of evaporite crystals (geometric, sharp) vs. speleothems (smooth, layered) — link morphology to process.', 'Assign a map exercise identifying sinkhole types on Survey of India toposheets (e.g., 55M/12 for Kanger Valley) using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_006', difficulty: 'standard',
          question: 'Glacial landforms are erosional and depositional features created by the.',
          hint: 'Revisit the cross-profile comparison diagram of V-shaped vs. U-shaped valleys in the.',
          misconception: 'Students often think moraines are formed only at the glacier snout (terminal moraines) and that all moraines are linear.',
          parts: [
                { id: 'a', prompt: 'Explain why a glacial trough (U-shaped valley) has a flat floor and steep sides, whereas a river valley is V-shaped.', answer: 'Glaciers occupy the entire valley cross-section',
                  options: ['Glaciers occupy the entire valley cross-section', 'glaciers being wider'],
                  hint: 'Revisit the cross-profile comparison diagram of V-shaped vs. U-shaped valleys in the fluvial.',
                  misconception: 'Students often think moraines are formed only at the glacier snout (terminal moraines) and that all moraines are linear ridges parallel.' }
          ],
            remediations: { 'moraines-are-formed-only-at': { steps: ['Use a satellite image (Google Earth) of the Gangotri Glacier: trace the lateral moraines (parallel ridges on valley.', 'Draw cross-sections across each moraine type to show geometry: lateral = ridge along valley wall, medial = central.', 'Collect a hand sample of till from each: note identical unsorted, angular character proving same depositional process.', 'Explain that moraine classification is based on position relative to glacier, not shape alone.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
