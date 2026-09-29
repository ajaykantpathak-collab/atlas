import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch20_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch20_p1: SimDef = {
    id: 'v3_c12_geo_ch20_p1',
    title: 'Graphical Representation of Data · Part 1/2',
    subtitle: 'The district looked uniform — until the dots moved in',
    classLevel: 12, subject: 'geography', topic: 'Graphical Representation of Data · Part 1/2',
    chapters: ['c12_geo_ch20'],
    nodeIds: ['c12_geo_cbse_20_001', 'c12_geo_cbse_20_002', 'c12_geo_cbse_20_003', 'c12_geo_cbse_20_004', 'c12_geo_cbse_20_005', 'c12_geo_cbse_20_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cartographer', intro: 'A table of numbers hides what a drawn line reveals in a glance. But pick the wrong line and it lies.', goal: 'Match data types to graphical methods — line, bar, pie, flow, dot, choropleth, isopleth — under the three construction rules.' },
    discovery: {
        question: 'A district shades uniformly dark on a choropleth — half of it a dense city, half empty desert. The map just lied. Which tool tells the truth?',
        options: ['A dot map — each dot marks real people where they actually are; choropleths only paint areal averages that flatten internal contrast', 'A pie chart — slicing the district\'s total shows each region\'s true share', 'A finer choropleth — more sub-zones inside the district restore the lost contrast', 'An isopleth map — density contour lines trace the real city-to-desert gradient'],
        answer: 'A dot map — each dot marks real people where they actually are; choropleths only paint areal averages that flatten internal contrast',
        hook: 'Graphs aren\'t interchangeable decorations — each has a data type it\'s built for: lines for continuous time, bars for discrete comparisons, pies for parts of a whole, flow maps for movement, isopleths for continuous fields. Three rules govern all: right method, right scale, complete design (title, legend, direction).',
    },
    teaching: [
        { title: 'Graphical Representation: Need and General Rules for Construction', text: 'Graphical representation is the transformation of numerical or spatial data into visual forms — such as graphs, diagrams, and maps — to reveal patterns, trends, and relationships that remain obscured.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_20_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match data to diagram like a cartographer: pair temperature with rainfall on a climograph, widen flow-map lines by truck count, and explain why 15 export shares murder a pie chart.',
        labels: ['Graphical Representation: Need', 'Types of Diagrams: One-Dimensional', 'Types of Diagrams: Two-Dimensional', 'Types of Diagrams: Three-Dimensional', 'Line Graphs: Construction', 'Bar Diagrams: Simple, Multiple'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_001', title: 'Graphical Representation: Need and General Rules for Construction',
          caseStudy: { intro: 'Open any newspaper and you will see a temperature–rainfall graph for your city, a bar chart of state-wise literacy rates, or a flow map of railway traffic.',
            decisions: [{ prompt: 'List the three general rules for constructing graphs, diagrams, and maps as prescribed in the NCERT textbook.', options: [
                { text: 'The three rules are: (1) Selection of a suitable method, (2) Selection of a suitable', outcome: 'The three rules are: (1) Selection of a suitable method, (2) Selection of a suitable scale, (3).' },
                { text: 'neatness', outcome: 'Not quite — Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for.', reveals: 'any-graph-can-represent-any' },
                { text: 'colouring', outcome: 'Not quite — Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for.', reveals: 'any-graph-can-represent-any' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_002', title: 'Types of Diagrams: One-Dimensional (Line, Bar Diagrams)',
          scaffold: { problem: 'Construct a line graph for the decadal population growth rate (%) of India: 1901: —, 1911: 0.56, 1921: -0.30, 1931: 1.04, 1941: 1.33, 1951.',
            steps: [
            { text: 'Identify variables — X = time (years, continuous, equal intervals of 10 years), Y = growth rate (%), range = -0.30.' },
            { text: 'Choose scales — X-axis: 11 intervals (1901–2011), 20 cm / 11 ≈ 1.8 cm per decade → use 2 cm per decade (total 22.' },
            { text: 'Draw axes — X-axis horizontal, Y-axis vertical, intersecting at (1901, 0).' },
            { text: 'Plot points — For each year, locate X position, measure Y value using scale (e.g., 1911: 0.56% → 0.56 × 5 = 2.8.' },
            { text: 'Join dots with smooth freehand curve (not straight segments) to show continuous trend.', faded: true, blankAnswer: 'Completed line graph with proper axes, scales, title, and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_003', title: 'Types of Diagrams: Two-Dimensional (Rectangles, Pie Diagrams)',
          scaffold: { problem: 'Construct a pie diagram for the following data on India\'s major rice-producing states (production in lakh tonnes, 2020-21).',
            steps: [
            { text: 'Verify total = 700 lakh tonnes. Calculate percentage for each state: (State Production / 700) × 100.' },
            { text: 'Compute percentages: WB = 20.86%, UP = 19.29%, Punjab = 16.00%, AP = 12.14%, Others = 31.71%.' },
            { text: 'Convert percentages to angles using θ = % × 3.6°: WB = 75.1°, UP = 69.4°, Punjab = 57.6°, AP = 43.7°, Others = 114.2°.' },
            { text: 'Round angles to nearest degree: 75°, 69°, 58°, 44°, 114°. Check sum = 360°.' },
            { text: 'Draw circle (radius 4 cm). Mark radius as baseline. Using protractor, draw sectors in **ascending angle order**: 44°.', faded: true, blankAnswer: 'Pie diagram with five sectors of angles 44°, 58°, 69°, 75°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_004', title: 'Types of Diagrams: Three-Dimensional (Cube Diagrams)',
          scaffold: { problem: 'Construct cube diagrams for the following coal production data (2022-23): Jharkhand (145 Mt), Odisha (130 Mt), Chhattisgarh (110 Mt).',
            steps: [
            { text: 'Identify maximum value = 145 Mt (Jharkhand). We want max side ≤ 3 cm → max volume ≤ 27 cm³.' },
            { text: 'Compute volume for each state: Volume = Production / k. Jharkhand = 145/10 = 14.5 cm³; Odisha = 13.0 cm³; Chhattisgarh.' },
            { text: 'Compute side length = ∛(Volume). Jharkhand: ∛14.5 ≈ 2.44 cm; Odisha: ∛13.0 ≈ 2.35 cm; Chhattisgarh: ∛11.0 ≈ 2.22.' },
            { text: 'Draw cubes on graph paper with these side lengths, maintaining equal spacing (1.5 cm gaps).' },
            { text: 'Add title "Coal Production in Major States, 2022-23", volumetric scale legend "1 cm³ = 10 Million Tonnes", and source.', faded: true, blankAnswer: 'Cubes with sides 2.44 cm, 2.35 cm, 2.22 cm, 2.12.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_005', title: 'Line Graphs: Construction and Interpretation (Time Series Data)',
          scaffold: { problem: 'Construct a line graph for the decadal population growth rate (%) of India from 1951 to 2011 using the data: 1951: 1.25, 1961: 1.96, 1971.',
            steps: [
            { text: 'Identify variables — X = Year (1951–2011), Y = Growth rate (1.25%–2.22%). Time is independent → X‑axis.' },
            { text: 'Choose scales. X‑axis: 7 decades fit in 14 cm → 1 cm = 1 decade (or 10 years). Y‑axis: range 1.25–2.22 = 0.97.' },
            { text: 'Draw axes, label X with years at 1‑cm intervals, Y with growth rate at 0.1% intervals from 1.2% to 2.3%.' },
            { text: 'Plot each year’s growth rate as a dot at the intersection of the year and the corresponding Y value (e.g., 1961.' },
            { text: 'Join consecutive dots with straight line segments using a ruler.' },
            { text: 'Interpret: The line rises sharply 1951–1981, peaks at 1981, then declines steadily — indicating the demographic.', faded: true, blankAnswer: 'A correctly scaled line graph showing an inverted‑U trend.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_006', title: 'Bar Diagrams: Simple, Multiple and Component Bar Diagrams',
          scaffold: { problem: 'Construct a multiple bar diagram to compare the production of Rice and Wheat (in million tonnes) for four major states using the data.',
            steps: [
            { text: 'Identify the two variables (Rice, Wheat) and four categories (states).' },
            { text: 'Choose scale: 1 cm = 5 million tonnes. Max value = 30.2 (UP Wheat) → bar height = 30.2/5 = 6.04 cm.' },
            { text: 'Draw X-axis with four equal main intervals for states. Within each interval, mark two equal sub-intervals for Rice and.' },
            { text: 'Calculate bar heights: WB Rice 14.6/5=2.92 cm, WB Wheat 0.9/5=0.18 cm; UP Rice 13.6/5=2.72 cm, UP Wheat 30.2/5=6.04.' },
            { text: 'Draw bars with distinct shading/patterns (e.g., Rice: vertical lines, Wheat: horizontal lines).', faded: true, blankAnswer: 'A correctly drawn multiple bar diagram with four.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the practical exam, a friend plots twelve months of city temperature as twelve separate bars \'because bars are easier to draw\', then reads a stacked electricity bar chart and announces \'thermal\'s share fell from 83% to 78%.\'',
            decisions: [{ prompt: 'Which diagram conventions is he breaking?', options: [
                { text: 'Both — continuous time-series like monthly temperature belong on a line graph that shows the trend\'s shape, and a compound bar stacks absolute values, so percentage shares must be computed segment-by-total, not read off the heights.', outcome: 'The chapter matches diagram to data nature — lines for continuous series, bars for discrete comparison — and warns that stacked bars display absolute magnitudes only.' },
                { text: 'Only the first — the temperature bars are ugly but fine, since months are twelve distinct labels.', outcome: 'Months are positions on a continuous time axis, not independent categories; bars imply discreteness and hide the seasonal curve the data actually draws.', reveals: 'months-are-categories' },
                { text: 'Neither — a compound bar\'s segments are proportions, so the share drop is directly visible.', outcome: 'That confuses compound with percentage bars: only a percentage bar normalises every bar to 100; in a compound bar the same segment height can mean a different share as totals change.', reveals: 'stacked-equals-percent' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now choose the right visual for any dataset — and spot the map that\'s lying by averaging.',
            decisions: [{ prompt: 'What comes next? Graphical Representation of Data · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Graphical Representation of Data · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_001', difficulty: 'standard',
          question: 'Graphical representation is the transformation of numerical or spatial data.',
          hint: 'Revisit Class 11 Practical Work in Geography Part-I, Chapter 1 (Essentials of Map Making).',
          misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares,.',
          parts: [
                { id: 'a', prompt: 'Compare the use of a line graph versus a simple bar diagram for representing the *decadal population growth rate of India (1901–2011)*.', answer: 'A **line graph** is more appropriate',
                  options: ['A **line graph** is more appropriate', '*any* graph can represent *any* data'],
                  hint: 'Revisit Class 11 Practical Work in Geography Part-I, Chapter 1 (Essentials of Map Making) and.',
                  misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a pie diagram for.' }
          ],
            remediations: { 'any-graph-can-represent-any': { steps: ['Revisit **c11_geo_cbse_22_001** (map elements) and **c11_geo_cbse_22_003** (scale concepts) to reinforce the design and.', 'Using the NCERT Tables 3.1–3.10, practice *only* the decision step: “Which method — line, bar, pie, flow, dot.', 'Write one-sentence justification.” 3.', 'Draw a **decision flowchart** on an A4 sheet: - Time-series continuous?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares,.',
          parts: [
                { id: 'a', prompt: 'Design a flow map to show the daily movement of 200 trucks from Delhi to Jaipur, 150 to Chandigarh, 80 to Lucknow, 40 to Agra, and 20 to Kanpur.', answer: 'the scale you would choose for line width, (',
                  options: ['the scale you would choose for line width, (', '*any* graph can represent *any* data'],
                  hint: 'Revisit Class 11 Practical Work in Geography Part-I, Chapter 1 (Essentials of Map Making) and.',
                  misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a pie diagram for.' }
          ],
            remediations: { 'any-graph-can-represent-any': { steps: ['Revisit **c11_geo_cbse_22_001** (map elements) and **c11_geo_cbse_22_003** (scale concepts) to reinforce the design and.', 'Using the NCERT Tables 3.1–3.10, practice *only* the decision step: “Which method — line, bar, pie, flow, dot.', 'Write one-sentence justification.” 3.', 'Draw a **decision flowchart** on an A4 sheet: - Time-series continuous?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_002', difficulty: 'standard',
          question: 'One-dimensional diagrams represent statistical data using only length.',
          hint: 'If unsure whether a variable is continuous or discrete, ask: "Can I meaningfully.',
          misconception: 'Students believe "bar diagrams are only for discrete categories and line graphs only for time" — they fail to recognize.',
          parts: [
                { id: 'a', prompt: 'Construct a simple bar diagram for the following data: Rice production (lakh tonnes) in major states 2020–21 — West Bengal 155, Uttar Pradesh 142, Punjab 128.', answer: '(1) Draw X-Y axes',
                  options: ['(1) Draw X-Y axes', 'draw bars', 'bar diagrams are only for discrete categories and line graphs only for time'],
                  hint: 'If unsure whether a variable is continuous or discrete, ask: "Can I meaningfully interpolate.',
                  misconception: 'Students believe "bar diagrams are only for discrete categories and line graphs only for time" — they fail to recognize that line graphs.' }
          ],
            remediations: { 'bar-diagrams-are-only-for': { steps: ['Revisit c12_geo_cbse_20_001 (General Rules) — focus on "Selection of Suitable Method" paragraph linking data.', 'Take NCERT Table 3.1 (population growth rate) and Table 3.3 (monthly rainfall) — explicitly list why one is continuous.', 'Practice classifying 5 new datasets (e.g., state-wise forest cover, river discharge at gauging stations, crop yield per.', 'Re-attempt Diagnostic Questions 1 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_003', difficulty: 'standard',
          question: 'Two-dimensional diagrams represent statistical data using geometric shapes.',
          hint: 'If confused about area vs. length, revisit c12_geo_cbse_20_002 Worked Example 3 (simple.',
          misconception: 'Students believe that in a rectangular diagram, **only the length matters** (like a bar diagram) and they arbitrarily.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Two-dimensional diagrams represent statistical data using geometric shapes where **area**',
                  options: ['Two-dimensional diagrams represent statistical data using geometric shapes where **area**', 'Graphical representation is the transformation of numerical or spatial data into visual', 'One-dimensional diagrams represent statistical data using only length (height/width) of', 'A cube diagram is a three-dimensional graphical representation where the volume of a cube'],
                  hint: 'If confused about area vs. length, revisit c12_geo_cbse_20_002 Worked Example 3 (simple bar.',
                  misconception: 'Students believe that in a rectangular diagram, **only the length matters** (like a bar diagram) and they arbitrarily fix breadth (e.g., 1.' }
          ],
            remediations: { 'in-a-rectangular-diagram': { steps: ['Revisit **c12_geo_cbse_20_002** (One-Dimensional Diagrams) and explicitly contrast: "Bar diagram = length ∝ value.', 'Practice angle calculation: take any 5-category percentage dataset, compute angles using 3.6°, verify sum = 360°.', 'Draw 3 pie diagrams on graph paper: (a) largest-first, (b) smallest-first, (c) random order.', 'Measure final sector error with protractor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_004', difficulty: 'standard',
          question: 'A cube diagram is a three-dimensional graphical representation where the volume.',
          hint: 'If stuck on cube root logic, revisit the rectangle area-proportional derivation.',
          misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length.',
          parts: [
                { id: 'a', prompt: 'Why can\'t we use the same scale factor (e.g., 1 cm = 10 million tonnes) for both a bar diagram and a cube diagram when representing the same dataset?', answer: 'A bar diagram uses a linear scale where 1 cm length represents a fixed quantity',
                  options: ['A bar diagram uses a linear scale where 1 cm length represents a fixed quantity', 'we can use the same scale'],
                  hint: 'If stuck on cube root logic, revisit the rectangle area-proportional derivation.',
                  misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length as `side = (data.' },
                { id: 'b', prompt: 'Two students construct cube diagrams for the same dataset (State A: 64 units, State B: 27 units). Student X uses scale 1 cm³ = 1 unit.', answer: 'Student X: Volume = 64 cm³ → Side = ∛64 = 4 cm',
                  options: ['Student X: Volume = 64 cm³ → Side = ∛64 = 4 cm', 'side length becomes 1/8th'],
                  hint: 'If stuck on cube root logic, revisit the rectangle area-proportional derivation.',
                  misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length as `side = (data.' }
          ],
            remediations: { 'the-linear-scaling-trap-students': { steps: ['Revisit **c12_geo_cbse_20_003** (Two-Dimensional Diagrams) and explicitly compare the scaling logic: in rectangles.', 'Practice cube root calculations for 10 typical geographical values (e.g., 8, 27, 64, 125, 10, 20, 30, 40, 50, 60) using.', 'Re-do Diagnostic Question 3 with three different datasets, verifying each step with a peer.', 'Draw one cube diagram on graph paper, physically measuring the side with a ruler to confirm the calculated length.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_005', difficulty: 'standard',
          question: 'A line graph is a one-dimensional diagram that represents time series data.',
          hint: 'Review Class 10 Mathematics coordinate geometry (plotting points, slope of a line) and.',
          misconception: 'Students often believe that the visual steepness of a line graph directly indicates the magnitude of change, ignoring.',
          parts: [
                { id: 'a', prompt: 'Why must the Y‑axis scale be chosen to include negative values when plotting population growth rates that can be negative (e.g., -0.30% in 1921), and what.', answer: 'Negative growth rates are legitimate data points',
                  options: ['Negative growth rates are legitimate data points', 'start at zero because it looks neater'],
                  hint: 'Review Class 10 Mathematics coordinate geometry (plotting points, slope of a line) and Class 11.',
                  misconception: 'Students often believe that the visual steepness of a line graph directly indicates the magnitude of change, ignoring the effect of scale.' }
          ],
            remediations: { 'the-visual-steepness-of-a': { steps: ['Revisit **c11_geo_cbse_22_003** (Map Scale) to reinforce how scale choice changes visual impression.', 'Practice plotting the same data set (e.g., India’s decadal growth rates) on three different Y‑axis scales and compare.', 'Use the NCERT Example 3.1 (Table 3.1) and deliberately plot it with a wrong scale (starting at 0) to see the distortion.', 'Re‑attempt Diagnostic Question 3 with a focus on calculating slope in real units, not graph‑paper units.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_006', difficulty: 'standard',
          question: 'Bar diagrams are one-dimensional graphical representations where rectangular.',
          hint: 'If stuck on scaling or bar placement, revisit c12_geo_cbse_20_001 (General Rules) and.',
          misconception: 'Students often think that in a component (compound) bar diagram, the segments can be arranged in any order within the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bar diagrams are one-dimensional graphical representations where rectangular bars of',
                  options: ['Bar diagrams are one-dimensional graphical representations where rectangular bars of', 'Graphical representation is the transformation of numerical or spatial data into visual', 'One-dimensional diagrams represent statistical data using only length (height/width) of', 'Two-dimensional diagrams represent statistical data using geometric shapes where **area**'],
                  hint: 'If stuck on scaling or bar placement, revisit c12_geo_cbse_20_001 (General Rules) and practice.',
                  misconception: 'Students often think that in a component (compound) bar diagram, the segments can be arranged in any order within the bar.' }
          ],
            remediations: { 'in-a-component-compound-bar': { steps: ['If a student cannot keep component order consistent, have them: (1) Revisit the NCERT Example 3.6 (Fig 3.7) and trace.', '(2) Practice with a new dataset: "Sources of irrigation (canal, tube well, well) for three states" — draw three.', '(3) Self-check: cover the legend and see if you can still identify components by position alone.', '(4) Re-attempt Diagnostic Question 4 with the correct segment order.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
