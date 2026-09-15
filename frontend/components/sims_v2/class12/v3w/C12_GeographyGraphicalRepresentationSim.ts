import type { SimDef } from '../../engine/types';
import C12_GeographyGraphicalRepresentationSim from '../../../simulations/c6_12/C12_GeographyGraphicalRepresentationSim';

/** v3 wrapped master — C12_GeographyGraphicalRepresentationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographygraphicalrepresentationsim: SimDef = {
    id: 'v3w_c12_geographygraphicalrepresentationsim',
    title: 'Graphical Representation',
    subtitle: 'This node covers the *need* for graphical representation and the *general rules*.',
    classLevel: 12, subject: 'geography', topic: 'Graphical Representation: Need and General Rules for Construction',
    chapters: [],
    nodeIds: ['c12_geo_cbse_20_001', 'c12_geo_cbse_20_004', 'c12_geo_cbse_20_006', 'c12_geo_cbse_20_007', 'c12_geo_cbse_20_008', 'c12_geo_cbse_20_010', 'c12_geo_cbse_20_011', 'c12_geo_cbse_18_001', 'c12_geo_cbse_19_003', 'c12_geo_cbse_19_005', 'c12_geo_cbse_20_002', 'c12_geo_cbse_20_003', 'c12_geo_cbse_20_005', 'c12_geo_cbse_20_009', 'c12_geo_cbse_20_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Open any newspaper and you will see a temperature–rainfall graph for your city, a bar chart of state-wise.', goal: 'Master Graphical Representation.' },
    discovery: {
        question: 'State the formula used to calculate the central angle of a sector in a pie diagram when the data are given as percentages.',
        options: ['The formula is: Angle = Percentage × 3.6 (since 360°/100 = 3.6)', 'Angle = Percentage × 360', 'percentage'],
        answer: 'The formula is: Angle = Percentage × 3.6 (since 360°/100 = 3.6)',
        hook: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to.',
    },
    teaching: [
        { title: 'Graphical representation is the.', text: 'Graphical representation is the transformation of numerical or spatial data into visual forms — such as graphs, diagrams, and maps — to reveal patterns, trends, and relationships that remain obscured.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_001', title: 'Graphical representation is the.',
          scaffold: { problem: 'A student has collected monthly average temperature (°C) and rainfall (cm) data for Mumbai for 2023.',
            steps: [
            { text: 'Identify the nature of the data — two continuous variables (temperature, rainfall) measured over a uniform time axis.' },
            { text: 'Select the suitable method (Rule 1) — the textbook (Example 3.4) prescribes a **combined line-and-bar graph.' },
            { text: 'Choose suitable scales (Rule 2) — Temperature range ~20–35°C → right Y-axis, 5°C intervals.' },
            { text: 'Apply design components (Rule 3) — Draw X-axis with 12 equal divisions labelled J–D.' },
            { text: 'Verify — Check that the monsoon peak (June–Sept) aligns with high rainfall bars and that the temperature line shows the.', faded: true, blankAnswer: 'Use a combined line-and-bar graph (climograph). Steps: (1).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_004', title: 'A cube diagram is a three-dimensional.',
          scaffold: { problem: 'Construct cube diagrams for the following coal production data (2022-23): Jharkhand (145 Mt), Odisha (130 Mt), Chhattisgarh (110 Mt),.',
            steps: [
            { text: 'Identify maximum value = 145 Mt (Jharkhand). We want max side ≤ 3 cm → max volume ≤ 27 cm³.' },
            { text: 'Compute volume for each state: Volume = Production / k. Jharkhand = 145/10 = 14.5 cm³; Odisha = 13.0 cm³; Chhattisgarh.' },
            { text: 'Compute side length = ∛(Volume). Jharkhand: ∛14.5 ≈ 2.44 cm; Odisha: ∛13.0 ≈ 2.35 cm; Chhattisgarh: ∛11.0 ≈ 2.22 cm;.' },
            { text: 'Draw cubes on graph paper with these side lengths, maintaining equal spacing (1.5 cm gaps).' },
            { text: 'Add title "Coal Production in Major States, 2022-23", volumetric scale legend "1 cm³ = 10 Million Tonnes", and source.', faded: true, blankAnswer: 'Cubes with sides 2.44 cm, 2.35 cm, 2.22 cm, 2.12 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_006', title: 'Bar diagrams are one-dimensional.',
          scaffold: { problem: 'Construct a multiple bar diagram to compare the production of Rice and Wheat (in million tonnes) for four major states using the data.',
            steps: [
            { text: 'Identify the two variables (Rice, Wheat) and four categories (states).' },
            { text: 'Choose scale: 1 cm = 5 million tonnes. Max value = 30.2 (UP Wheat) → bar height = 30.2/5 = 6.04 cm.' },
            { text: 'Draw X-axis with four equal main intervals for states. Within each interval, mark two equal sub-intervals for Rice and.' },
            { text: 'Calculate bar heights: WB Rice 14.6/5=2.92 cm, WB Wheat 0.9/5=0.18 cm; UP Rice 13.6/5=2.72 cm, UP Wheat 30.2/5=6.04 cm;.' },
            { text: 'Draw bars with distinct shading/patterns (e.g., Rice: vertical lines, Wheat: horizontal lines).', faded: true, blankAnswer: 'A correctly drawn multiple bar diagram with four.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_007', title: 'A pie diagram (or divided circle.',
          scaffold: { problem: 'Construct a pie diagram for the following data on India\'s rice production by major states (2010-11): West Bengal 14.6%, Uttar Pradesh.',
            steps: [
            { text: 'Verify percentages sum to 100% (14.6+13.6+13.5+10.8+8.5+6.4+32.6 = 100.0).' },
            { text: 'Calculate each sector angle by multiplying percentage by 3.6: WB 52.56°, UP 48.96°, AP 48.6°, Punjab 38.88°, TN 30.6°,.' },
            { text: 'Round angles to nearest degree: WB 53°, UP 49°, AP 49°, Punjab 39°, TN 31°, Bihar 23°, Others 117°.' },
            { text: 'Arrange angles in ascending order: Bihar (23°), Tamil Nadu (31°), Punjab (39°), Andhra Pradesh (49°), Uttar Pradesh.' },
            { text: 'Draw a circle of radius 4 cm. Mark a vertical radius as the starting line.' },
            { text: 'Add title "India\'s Rice Production by Major States 2010-11", subtitle "Percentage share", and a legend at bottom-right.', faded: true, blankAnswer: 'A correctly drawn pie diagram with seven sectors, angles as.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_008', title: 'A histogram is a one-dimensional.',
          scaffold: { problem: 'The following table shows the distribution of monthly maximum temperature (°C) recorded at a meteorological station over 30 years.',
            steps: [
            { text: 'Verify class intervals are continuous and equal. The given classes are 25–29, 29–33, etc.' },
            { text: 'Determine true class boundaries: 25, 29, 33, 37, 41, 45. These will be marked on the X-axis.' },
            { text: 'Choose scales: X-axis: 1 cm = 4°C (or 0.5 cm per degree). Y-axis: 1 cm = 5 months (max frequency = 36).' },
            { text: 'Draw X and Y axes. Mark class boundaries on X-axis at equal intervals (since width is constant).' },
            { text: 'Draw adjacent rectangles: first rectangle from 25 to 29 (width 4) up to height 12; second from 29 to 33 up to 24; third.' },
            { text: 'Add title: “Histogram of Monthly Maximum Temperature (30-year record)”. Add source note if available.' },
            { text: 'Interpret: The tallest bar is 33–37°C with frequency 36 → modal class = 33–37°C.', faded: true, blankAnswer: 'Histogram constructed with bars for classes 25–29 (ht=12),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_010', title: 'A cumulative frequency curve (ogive) is.',
          scaffold: { problem: 'The following data shows the annual rainfall (in cm) recorded at a station for 40 years.',
            steps: [
            { text: 'Identify upper class boundaries: 20, 40, 60, 80, 100.' },
            { text: 'Compute less-than cumulative frequencies: <20: 4; <40: 4+6=10; <60: 10+10=20; <80: 20+12=32; <100: 32+8=40.' },
            { text: 'Choose scale: X-axis 1 cm = 20 cm rainfall; Y-axis 1 cm = 5 years (cumulative frequency).' },
            { text: 'Plot points (20,4), (40,10), (60,20), (80,32), (100,40) and join with smooth curve.' },
            { text: 'Locate N/2 = 20 on Y-axis, draw horizontal line to meet curve, drop perpendicular to X-axis. Read median ≈ 60 cm.', faded: true, blankAnswer: 'Median rainfall ≈ 60 cm.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_20_004', title: 'Identify each idea',
          dissect: { specimen: 'Graphical Representation', spots: [
            { id: 's1', label: 'Graphical representation is the transformation', prompt: 'Which idea is this? — Graphical representation is the transformation of numerical or spatial data into visual.', answer: 'Graphical representation is the transformation', options: ['Graphical representation is the transformation', 'A cube diagram is a', 'Bar diagrams are one-dimensional graphical', 'A pie diagram or divided'] },
            { id: 's2', label: 'A cube diagram is a', prompt: 'Which idea is this? — A cube diagram is a three-dimensional graphical representation where the volume of a cube.', answer: 'A cube diagram is a', options: ['A cube diagram is a', 'Graphical representation is the transformation', 'Bar diagrams are one-dimensional graphical', 'A pie diagram or divided'] },
            { id: 's3', label: 'Bar diagrams are one-dimensional graphical', prompt: 'Which idea is this? — Bar diagrams are one-dimensional graphical representations where rectangular bars of.', answer: 'Bar diagrams are one-dimensional graphical', options: ['Bar diagrams are one-dimensional graphical', 'Graphical representation is the transformation', 'A cube diagram is a', 'A pie diagram or divided'] },
            { id: 's4', label: 'A pie diagram or divided', prompt: 'Which idea is this? — A pie diagram (or divided circle diagram) is a two-dimensional graphical representation.', answer: 'A pie diagram or divided', options: ['A pie diagram or divided', 'Graphical representation is the transformation', 'A cube diagram is a', 'Bar diagrams are one-dimensional graphical'] },
            { id: 's5', label: 'A histogram is a one-dimensional', prompt: 'Which idea is this? — A histogram is a one-dimensional graphical representation of a continuous frequency.', answer: 'A histogram is a one-dimensional', options: ['A histogram is a one-dimensional', 'Graphical representation is the transformation', 'A cube diagram is a', 'Bar diagrams are one-dimensional graphical'] },
            { id: 's6', label: 'A cumulative frequency curve ogive', prompt: 'Which idea is this? — A cumulative frequency curve (ogive) is a graphical representation of cumulative.', answer: 'A cumulative frequency curve ogive', options: ['A cumulative frequency curve ogive', 'Graphical representation is the transformation', 'A cube diagram is a', 'Bar diagrams are one-dimensional graphical'] }
          ] } }
    ],
    explore: { component: C12_GeographyGraphicalRepresentationSim, prompt: 'Explore the interactive — Graphical Representation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_001', difficulty: 'standard',
          question: 'Graphical representation is the transformation of numerical or spatial data.',
          hint: 'Revisit Class 11 Practical Work in Geography Part-I, Chapter 1 (Essentials of Map Making).',
          misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a.',
          parts: [
                { id: 'a', prompt: 'Compare the use of a line graph versus a simple bar diagram for representing the *decadal population growth rate of India (1901–2011)*.', answer: 'A **line graph** is more appropriate',
                  options: ['A **line graph** is more appropriate', '*any* graph can represent *any* data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a pie diagram for.' }
          ],
            remediations: { 'any-graph-can-represent-any': { steps: ['Revisit **c11_geo_cbse_22_001** (map elements) and **c11_geo_cbse_22_003** (scale concepts) to reinforce the design and.', 'Using the NCERT Tables 3.1–3.10, practice *only* the decision step: “Which method — line, bar, pie, flow, dot,.', 'Write one-sentence justification.” 3.', 'Draw a **decision flowchart** on an A4 sheet: - Time-series continuous?'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a.',
          parts: [
                { id: 'a', prompt: 'Design a flow map to show the daily movement of 200 trucks from Delhi to Jaipur, 150 to Chandigarh, 80 to Lucknow, 40 to Agra, and 20 to Kanpur.', answer: 'the scale you would choose for line width, (',
                  options: ['the scale you would choose for line width, (', '*any* graph can represent *any* data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a pie diagram for.' },
                { id: 'b', prompt: 'Compare the use of a line graph versus a simple bar diagram for representing the *decadal population growth rate of India (1901–2011)*.', answer: 'A **line graph** is more appropriate',
                  options: ['A **line graph** is more appropriate', '*any* graph can represent *any* data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that *any* graph can represent *any* data — e.g., drawing a line graph for categorical crop shares, a pie diagram for.' }
          ],
            remediations: { 'any-graph-can-represent-any': { steps: ['Revisit **c11_geo_cbse_22_001** (map elements) and **c11_geo_cbse_22_003** (scale concepts) to reinforce the design and.', 'Using the NCERT Tables 3.1–3.10, practice *only* the decision step: “Which method — line, bar, pie, flow, dot,.', 'Write one-sentence justification.” 3.', 'Draw a **decision flowchart** on an A4 sheet: - Time-series continuous?'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_004', difficulty: 'standard',
          question: 'A cube diagram is a three-dimensional graphical representation where the volume.',
          hint: 'If stuck on cube root logic, revisit the rectangle area-proportional derivation in.',
          misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length.',
          parts: [
                { id: 'a', prompt: 'Why can\'t we use the same scale factor (e.g., 1 cm = 10 million tonnes) for both a bar diagram and a cube diagram when representing the same dataset?', answer: 'A bar diagram uses a linear scale where 1 cm length represents a fixed quantity',
                  options: ['A bar diagram uses a linear scale where 1 cm length represents a fixed quantity', 'we can use the same scale'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length as `side = (data.' },
                { id: 'b', prompt: 'Two students construct cube diagrams for the same dataset (State A: 64 units, State B: 27 units). Student X uses scale 1 cm³ = 1 unit.', answer: 'Student X: Volume = 64 cm³ → Side = ∛64 = 4 cm',
                  options: ['Student X: Volume = 64 cm³ → Side = ∛64 = 4 cm', 'side length becomes 1/8th'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length as `side = (data.' }
          ],
            remediations: { 'the-linear-scaling-trap-students': { steps: ['Revisit **c12_geo_cbse_20_003** (Two-Dimensional Diagrams) and explicitly compare the scaling logic: in rectangles,.', 'Practice cube root calculations for 10 typical geographical values (e.g., 8, 27, 64, 125, 10, 20, 30, 40, 50, 60) using.', 'Re-do Diagnostic Question 3 with three different datasets, verifying each step with a peer.', 'Draw one cube diagram on graph paper, physically measuring the side with a ruler to confirm the calculated length.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length.',
          parts: [
                { id: 'a', prompt: 'Two students construct cube diagrams for the same dataset (State A: 64 units, State B: 27 units). Student X uses scale 1 cm³ = 1 unit.', answer: 'Student X: Volume = 64 cm³ → Side = ∛64 = 4 cm',
                  options: ['Student X: Volume = 64 cm³ → Side = ∛64 = 4 cm', 'side length becomes 1/8th'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The Linear Scaling Trap:** Students consistently treat cube diagrams as "3D bar diagrams" and calculate side length as `side = (data.' }
          ],
            remediations: { 'the-linear-scaling-trap-students': { steps: ['Revisit **c12_geo_cbse_20_003** (Two-Dimensional Diagrams) and explicitly compare the scaling logic: in rectangles,.', 'Practice cube root calculations for 10 typical geographical values (e.g., 8, 27, 64, 125, 10, 20, 30, 40, 50, 60) using.', 'Re-do Diagnostic Question 3 with three different datasets, verifying each step with a peer.', 'Draw one cube diagram on graph paper, physically measuring the side with a ruler to confirm the calculated length.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_006', difficulty: 'standard',
          question: 'Bar diagrams are one-dimensional graphical representations where rectangular.',
          hint: 'If stuck on scaling or bar placement, revisit c12_geo_cbse_20_001 (General Rules) and.',
          misconception: 'Students often think that in a component (compound) bar diagram, the segments can be arranged in any order within the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bar diagrams are one-dimensional graphical representations where rectangular bars of',
                  options: ['Bar diagrams are one-dimensional graphical representations where rectangular bars of', 'Graphical representation is the transformation of numerical or spatial data into visual', 'A cube diagram is a three-dimensional graphical representation where the volume of a cube', 'A pie diagram (or divided circle diagram) is a two-dimensional graphical representation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in a component (compound) bar diagram, the segments can be arranged in any order within the bar.' }
          ],
            remediations: { 'in-a-component-compound-bar': { steps: ['If a student cannot keep component order consistent, have them: (1) Revisit the NCERT Example 3.6 (Fig 3.7) and trace.', '(2) Practice with a new dataset: "Sources of irrigation (canal, tube well, well) for three states" — draw three.', '(3) Self-check: cover the legend and see if you can still identify components by position alone.', '(4) Re-attempt Diagnostic Question 4 with the correct segment order.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_007', difficulty: 'standard',
          question: 'A pie diagram (or divided circle diagram) is a two-dimensional graphical.',
          hint: 'If stuck on angle calculation, revisit the percentage-to-degree conversion (percentage ×.',
          misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to.',
          parts: [
                { id: 'a', prompt: 'State the formula used to calculate the central angle of a sector in a pie diagram when the data are given as percentages.', answer: 'The formula is: Angle = Percentage × 3.6 (since 360°/100 = 3.6)',
                  options: ['The formula is: Angle = Percentage × 3.6 (since 360°/100 = 3.6)', 'Angle = Percentage × 360', 'percentage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' },
                { id: 'b', prompt: 'Given the following data on India\'s land use (1950-51): Net Sown Area 42%, Forest 14%, Not available for cultivation 17%, Fallow Land 10%, Pasture and Tree 9%,.', answer: 'Step 1: Multiply each percentage by 3.6',
                  options: ['Step 1: Multiply each percentage by 3.6', 'percentage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' }
          ],
            remediations: { 'the-percentage-column-in-a': { steps: ['Revisit the percentage-to-angle conversion: practise 360/100 = 3.6 until it is automatic.', 'Draw a 4 cm circle on graph paper; use a protractor to plot the Example 3.7 data (Europe 73°, Africa 23°, America 53°,.', 'Check closure: the last sector should exactly meet the starting radius.', 'If a gap remains, measure the error and trace back to the step where the protractor was misaligned.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to.',
          parts: [
                { id: 'a', prompt: 'Evaluate the suitability of a pie diagram for representing the following dataset: "Monthly rainfall (cm) in Delhi for 12 months".', answer: 'A pie diagram is unsuitable because: (1) Rainfall data is a time series',
                  options: ['A pie diagram is unsuitable because: (1) Rainfall data is a time series', 'pie diagrams can show any data', 'percentage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' },
                { id: 'b', prompt: 'Design a pie diagram to represent the percentage distribution of India\'s population by religion (hypothetical data: Hindu 79.8%, Muslim 14.2%, Christian 2.3%,.', answer: 'Radius: 4 cm (fits A4 sheet)',
                  options: ['Radius: 4 cm (fits A4 sheet)', 'percentage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' }
          ],
            remediations: { 'the-percentage-column-in-a': { steps: ['Revisit the percentage-to-angle conversion: practise 360/100 = 3.6 until it is automatic.', 'Draw a 4 cm circle on graph paper; use a protractor to plot the Example 3.7 data (Europe 73°, Africa 23°, America 53°,.', 'Check closure: the last sector should exactly meet the starting radius.', 'If a gap remains, measure the error and trace back to the step where the protractor was misaligned.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_008', difficulty: 'standard',
          question: 'A histogram is a one-dimensional graphical representation of a continuous.',
          hint: 'If stuck on frequency density, revisit the concept of “area represents frequency” by.',
          misconception: 'Students often treat histograms exactly like bar diagrams: they leave gaps between bars, use raw frequency as height.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A histogram is a one-dimensional graphical representation of a continuous frequency',
                  options: ['A histogram is a one-dimensional graphical representation of a continuous frequency', 'Graphical representation is the transformation of numerical or spatial data into visual', 'A cube diagram is a three-dimensional graphical representation where the volume of a cube', 'Bar diagrams are one-dimensional graphical representations where rectangular bars of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat histograms exactly like bar diagrams: they leave gaps between bars, use raw frequency as height even for unequal class.' }
          ],
            remediations: { 'students-often-treat-histograms-exactly': { steps: ['Revisit c12_geo_cbse_20_006 (Bar Diagrams) to recall the gap rule for discrete data.', 'Draw a number line and mark class boundaries (0, 10, 20…) to visualize continuity — bars must cover the line without.', 'Practice frequency density calculation with a simple unequal-interval example (e.g., 0–5, 5–15, 15–30) using the.', 'Verify that area = density × width = frequency.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_010', difficulty: 'standard',
          question: 'A cumulative frequency curve (ogive) is a graphical representation of.',
          hint: 'If stuck, review the difference between class limits and class boundaries, and practice.',
          misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.',
          parts: [
                { id: 'a', prompt: 'What is the correct X-axis variable for a "less than" cumulative frequency curve (ogive)?', answer: 'The X-axis uses the upper class boundaries of each class interval',
                  options: ['The X-axis uses the upper class boundaries of each class interval', 'less than', 'more than'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.' },
                { id: 'b', prompt: 'Given the following grouped data of annual rainfall (cm) for 30 years: 0-20: 3, 20-40: 5, 40-60: 12, 60-80: 7, 80-100: 3.', answer: 'Less-than cumulative frequencies: <20: 3, <40: 8, <60: 20, <80: 27, <100: 30',
                  options: ['Less-than cumulative frequencies: <20: 3, <40: 8, <60: 20, <80: 27, <100: 30', 'less than', 'more than'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.' },
                { id: 'c', prompt: 'Two ogives (less than and more than) are drawn on the same graph for a dataset of 40 observations.', answer: 'Median = 52.5',
                  options: ['Median = 52.5', 'less than', 'more than'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.' }
          ],
            remediations: { 'students-often-plot-ogives-using': { steps: ['Revisit c12_geo_cbse_20_009 (Frequency Polygon) to recall why mid-points are used there but NOT for ogives.', 'Practice converting a simple frequency table (e.g., 5 classes) into both less-than and more-than cumulative frequency.', 'Draw both ogives on the same graph paper using correct boundaries; verify they intersect.', 'Use the intersection to read median and compare with formula median = L + ((N/2 - CF)/f) * h to confirm.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
