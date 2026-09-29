import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch20_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch20_p2: SimDef = {
    id: 'v3_c12_geo_ch20_p2',
    title: 'Graphical Representation of Data · Part 2/2',
    subtitle: 'The district looked uniform — until the dots moved in',
    classLevel: 12, subject: 'geography', topic: 'Graphical Representation of Data · Part 2/2',
    chapters: ['c12_geo_ch20'],
    nodeIds: ['c12_geo_cbse_20_007', 'c12_geo_cbse_20_008', 'c12_geo_cbse_20_009', 'c12_geo_cbse_20_010', 'c12_geo_cbse_20_011', 'c12_geo_cbse_20_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cartographer', intro: 'A table of numbers hides what a drawn line reveals in a glance. But pick the wrong line and it lies.', goal: 'Match data types to graphical methods — line, bar, pie, flow, dot, choropleth, isopleth — under the three construction rules.' },
    discovery: {
        question: 'A district shades uniformly dark on a choropleth — half of it a dense city, half empty desert. The map just lied. Which tool tells the truth?',
        options: ['A dot map — each dot marks real people where they actually are; choropleths only paint areal averages that flatten internal contrast', 'A pie chart — slicing the district\'s total shows each region\'s true share', 'A finer choropleth — more sub-zones inside the district restore the lost contrast', 'An isopleth map — density contour lines trace the real city-to-desert gradient'],
        answer: 'A dot map — each dot marks real people where they actually are; choropleths only paint areal averages that flatten internal contrast',
        hook: 'Graphs aren\'t interchangeable decorations — each has a data type it\'s built for: lines for continuous time, bars for discrete comparisons, pies for parts of a whole, flow maps for movement, isopleths for continuous fields. Three rules govern all: right method, right scale, complete design (title, legend, direction).',
    },
    teaching: [
        { title: 'Pie Diagrams: Construction and Percentage Calculation', text: 'A pie diagram (or divided circle diagram) is a two-dimensional graphical representation where a circle is divided into sectors whose central angles are proportional to the magnitudes of the data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_20_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match data to diagram like a cartographer: pair temperature with rainfall on a climograph, widen flow-map lines by truck count, and explain why 15 export shares murder a pie chart.',
        labels: ['Pie Diagrams: Construction', 'Histograms: Construction for Frequency', 'Frequency Polygon and Frequency', 'Cumulative Frequency Curve (Ogive)', 'Scatter Diagrams: Interpretation', 'Flow Maps and Dot'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_007', title: 'Pie Diagrams: Construction and Percentage Calculation',
          scaffold: { problem: 'Construct a pie diagram for the following data on India\'s rice production by major states (2010-11): West Bengal 14.6%, Uttar Pradesh.',
            steps: [
            { text: 'Verify percentages sum to 100% (14.6+13.6+13.5+10.8+8.5+6.4+32.6 = 100.0).' },
            { text: 'Calculate each sector angle by multiplying percentage by 3.6: WB 52.56°, UP 48.96°, AP 48.6°, Punjab 38.88°, TN 30.6°.' },
            { text: 'Round angles to nearest degree: WB 53°, UP 49°, AP 49°, Punjab 39°, TN 31°, Bihar 23°, Others 117°.' },
            { text: 'Arrange angles in ascending order: Bihar (23°), Tamil Nadu (31°), Punjab (39°), Andhra Pradesh (49°), Uttar Pradesh.' },
            { text: 'Draw a circle of radius 4 cm. Mark a vertical radius as the starting line.' },
            { text: 'Add title "India\'s Rice Production by Major States 2010-11", subtitle "Percentage share", and a legend at bottom-right.', faded: true, blankAnswer: 'A correctly drawn pie diagram with seven sectors, angles.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_008', title: 'Histograms: Construction for Frequency Distribution',
          scaffold: { problem: 'The following table shows the distribution of monthly maximum temperature (°C) recorded at a meteorological station over 30 years.',
            steps: [
            { text: 'Verify class intervals are continuous and equal. The given classes are 25–29, 29–33, etc.' },
            { text: 'Determine true class boundaries: 25, 29, 33, 37, 41, 45. These will be marked on the X-axis.' },
            { text: 'Choose scales: X-axis: 1 cm = 4°C (or 0.5 cm per degree). Y-axis: 1 cm = 5 months (max frequency = 36).' },
            { text: 'Draw X and Y axes. Mark class boundaries on X-axis at equal intervals (since width is constant).' },
            { text: 'Draw adjacent rectangles: first rectangle from 25 to 29 (width 4) up to height 12; second from 29 to 33 up to 24; third.' },
            { text: 'Add title: “Histogram of Monthly Maximum Temperature (30-year record)”. Add source note if available.' },
            { text: 'Interpret: The tallest bar is 33–37°C with frequency 36 → modal class = 33–37°C.', faded: true, blankAnswer: 'Histogram constructed with bars for classes 25–29 (ht=12).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_009', title: 'Frequency Polygon and Frequency Curve: Construction',
          scaffold: { problem: 'Construct a frequency polygon and frequency curve for the distribution of average monthly rainfall (cm) in Mumbai for the monsoon months.',
            steps: [
            { text: 'Verify class intervals are continuous and equal (width = 10 cm).' },
            { text: 'Add preceding class (40–50) mid-point = 45 with frequency 0, and succeeding class (100–110) mid-point = 105 with.' },
            { text: 'Draw X and Y axes on graph paper. Label X-axis "Rainfall (cm)" with scale 1 cm = 5 cm → each 10 cm class = 2 cm.' },
            { text: 'Plot points: (45,0), (55,4), (65,7), (75,10), (85,6), (95,3), (105,0). Use sharp pencil dots.' },
            { text: 'Join the points with straight line segments using a ruler → frequency polygon.', faded: true, blankAnswer: 'Frequency polygon: straight-line segments connecting.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_20_010', title: 'Cumulative Frequency Curve (Ogive): Less Than and More Than Types',
          scaffold: { problem: 'The following data shows the annual rainfall (in cm) recorded at a station for 40 years.',
            steps: [
            { text: 'Identify upper class boundaries: 20, 40, 60, 80, 100.' },
            { text: 'Compute less-than cumulative frequencies: <20: 4; <40: 4+6=10; <60: 10+10=20; <80: 20+12=32; <100: 32+8=40.' },
            { text: 'Choose scale: X-axis 1 cm = 20 cm rainfall; Y-axis 1 cm = 5 years (cumulative frequency).' },
            { text: 'Plot points (20,4), (40,10), (60,20), (80,32), (100,40) and join with smooth curve.' },
            { text: 'Locate N/2 = 20 on Y-axis, draw horizontal line to meet curve, drop perpendicular to X-axis. Read median ≈ 60 cm.', faded: true, blankAnswer: 'Median rainfall ≈ 60 cm.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_011', title: 'Scatter Diagrams: Interpretation of Correlation',
          caseStudy: { intro: 'Imagine you are a farmer in Punjab comparing the amount of fertilizer applied per hectare (X) with the wheat yield obtained (Y) over the last ten seasons.',
            decisions: [{ prompt: 'What is the primary purpose of a scatter diagram in geographical analysis?', options: [
                { text: 'A scatter diagram visually reveals the nature of the relationship (correlation) between', outcome: 'A scatter diagram visually reveals the nature of the relationship (correlation) between two.' },
                { text: 'to show the frequency distribution of a single variable', outcome: 'Not quite — Students often believe that a scatter diagram with points forming a clear curve (e.g., parabolic).', reveals: 'a-scatter-diagram-with-points' },
                { text: 'to compare categories', outcome: 'Not quite — Students often believe that a scatter diagram with points forming a clear curve (e.g., parabolic).', reveals: 'a-scatter-diagram-with-points' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_012', title: 'Flow Maps and Dot Maps: Spatial Data Representation',
          caseStudy: { intro: 'Begin by showing a real-world example: a map of Delhi Metro ridership where line thickness shows passenger volume between stations.',
            decisions: [{ prompt: 'What is the primary purpose of a flow map, and how does line width encode information?', options: [
                { text: 'A flow map shows the movement of phenomena (goods, people, vehicles) between origins and', outcome: 'A flow map shows the movement of phenomena (goods, people, vehicles) between origins and.' },
                { text: 'line width shows distance', outcome: 'Not quite — Students often think flow maps only show transport (trains, vehicles) and forget they can represent.', reveals: 'flow-maps-only-show-transport' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For the practical exam, a friend plots twelve months of city temperature as twelve separate bars \'because bars are easier to draw\', then reads a stacked electricity bar chart and announces \'thermal\'s share fell from 83% to 78%.\'',
            decisions: [{ prompt: 'Which diagram conventions is he breaking?', options: [
                { text: 'Both — continuous time-series like monthly temperature belong on a line graph that shows the trend\'s shape, and a compound bar stacks absolute values, so percentage shares must be computed segment-by-total, not read off the heights.', outcome: 'The chapter matches diagram to data nature — lines for continuous series, bars for discrete comparison — and warns that stacked bars display absolute magnitudes only.' },
                { text: 'Only the first — the temperature bars are ugly but fine, since months are twelve distinct labels.', outcome: 'Months are positions on a continuous time axis, not independent categories; bars imply discreteness and hide the seasonal curve the data actually draws.', reveals: 'months-are-categories' },
                { text: 'Neither — a compound bar\'s segments are proportions, so the share drop is directly visible.', outcome: 'That confuses compound with percentage bars: only a percentage bar normalises every bar to 100; in a compound bar the same segment height can mean a different share as totals change.', reveals: 'stacked-equals-percent' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_20_012', title: 'You made it',
          caseStudy: { intro: 'You can now choose the right visual for any dataset — and spot the map that\'s lying by averaging.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_007', difficulty: 'standard',
          question: 'A pie diagram (or divided circle diagram) is a two-dimensional graphical.',
          hint: 'If stuck on angle calculation, revisit the percentage-to-degree conversion (percentage.',
          misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it.',
          parts: [
                { id: 'a', prompt: 'State the formula used to calculate the central angle of a sector in a pie diagram when the data are given as percentages.', answer: 'The formula is: Angle = Percentage × 3.6 (since 360°/100 = 3.6)',
                  options: ['The formula is: Angle = Percentage × 3.6 (since 360°/100 = 3.6)', 'Angle = Percentage × 360', 'percentage'],
                  hint: 'If stuck on angle calculation, revisit the percentage-to-degree conversion (percentage × 3.6) and.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' },
                { id: 'b', prompt: 'Given the following data on India\'s land use (1950-51): Net Sown Area 42%, Forest 14%, Not available for cultivation 17%, Fallow Land 10%, Pasture and Tree 9%.', answer: 'Step 1: Multiply each percentage by 3.6',
                  options: ['Step 1: Multiply each percentage by 3.6', 'percentage'],
                  hint: 'If stuck on angle calculation, revisit the percentage-to-degree conversion (percentage × 3.6) and.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' }
          ],
            remediations: { 'the-percentage-column-in-a': { steps: ['Revisit the percentage-to-angle conversion: practise 360/100 = 3.6 until it is automatic.', 'Draw a 4 cm circle on graph paper; use a protractor to plot the Example 3.7 data (Europe 73°, Africa 23°, America 53°.', 'Check closure: the last sector should exactly meet the starting radius.', 'If a gap remains, measure the error and trace back to the step where the protractor was misaligned.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it.',
          parts: [
                { id: 'a', prompt: 'Evaluate the suitability of a pie diagram for representing the following dataset: "Monthly rainfall (cm) in Delhi for 12 months".', answer: 'A pie diagram is unsuitable because: (1) Rainfall data is a time series',
                  options: ['A pie diagram is unsuitable because: (1) Rainfall data is a time series', 'pie diagrams can show any data', 'percentage'],
                  hint: 'If stuck on angle calculation, revisit the percentage-to-degree conversion (percentage × 3.6) and.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' },
                { id: 'b', prompt: 'Design a pie diagram to represent the percentage distribution of India\'s population by religion (hypothetical data: Hindu 79.8%, Muslim 14.2%, Christian 2.3%.', answer: 'Radius: 4 cm (fits A4 sheet)',
                  options: ['Radius: 4 cm (fits A4 sheet)', 'percentage'],
                  hint: 'If stuck on angle calculation, revisit the percentage-to-degree conversion (percentage × 3.6) and.',
                  misconception: 'Students often think the "percentage" column in a pie-diagram table is the final answer and forget to convert it to degrees.' }
          ],
            remediations: { 'the-percentage-column-in-a': { steps: ['Revisit the percentage-to-angle conversion: practise 360/100 = 3.6 until it is automatic.', 'Draw a 4 cm circle on graph paper; use a protractor to plot the Example 3.7 data (Europe 73°, Africa 23°, America 53°.', 'Check closure: the last sector should exactly meet the starting radius.', 'If a gap remains, measure the error and trace back to the step where the protractor was misaligned.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_008', difficulty: 'standard',
          question: 'A histogram is a one-dimensional graphical representation of a continuous.',
          hint: 'If stuck on frequency density, revisit the concept of “area represents frequency”.',
          misconception: 'Students often treat histograms exactly like bar diagrams: they leave gaps between bars, use raw frequency as height.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A histogram is a one-dimensional graphical representation of a continuous frequency',
                  options: ['A histogram is a one-dimensional graphical representation of a continuous frequency', 'Graphical representation is the transformation of numerical or spatial data into visual', 'One-dimensional diagrams represent statistical data using only length (height/width) of', 'Two-dimensional diagrams represent statistical data using geometric shapes where **area**'],
                  hint: 'If stuck on frequency density, revisit the concept of “area represents frequency” by drawing.',
                  misconception: 'Students often treat histograms exactly like bar diagrams: they leave gaps between bars, use raw frequency as height even for unequal class.' }
          ],
            remediations: { 'students-often-treat-histograms-exactly': { steps: ['Revisit c12_geo_cbse_20_006 (Bar Diagrams) to recall the gap rule for discrete data.', 'Draw a number line and mark class boundaries (0, 10, 20…) to visualize continuity — bars must cover the line without.', 'Practice frequency density calculation with a simple unequal-interval example (e.g., 0–5, 5–15, 15–30) using the.', 'Verify that area = density × width = frequency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_009', difficulty: 'standard',
          question: 'A frequency polygon is a line graph constructed by plotting the frequencies.',
          hint: 'If stuck on mid-point calculation or histogram scaling, review Class 11 Psychology node.',
          misconception: 'Students often confuse the frequency polygon with the histogram and think the polygon is simply "joining the top.',
          parts: [
                { id: 'a', prompt: 'Given the following frequency distribution of daily maximum temperatures (°C) for a city in June, construct the frequency polygon on graph paper.', answer: '**Mid-points**: 31, 33, 35, 37, 39',
                  options: ['**Mid-points**: 31, 33, 35, 37, 39', 'joining the top mid-points of the histogram bars'],
                  hint: 'If stuck on mid-point calculation or histogram scaling, review Class 11 Psychology node.',
                  misconception: 'Students often confuse the frequency polygon with the histogram and think the polygon is simply "joining the top mid-points of the.' }
          ],
            remediations: { 'students-often-confuse-the-frequency': { steps: ['Revisit **c12_geo_cbse_20_008 (Histograms)** to recall how class intervals and frequencies are represented as bars.', 'Practice the **mid-point formula** (lower + upper)/2 on 5 different class intervals from a Class 11 statistics node.', 'On graph paper, draw a histogram for a simple distribution (e.g., 5 classes), then **explicitly mark the mid-points**.', 'Finally, trace a smooth curve through those same points freehand.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_010', difficulty: 'standard',
          question: 'A cumulative frequency curve (ogive) is a graphical representation.',
          hint: 'If stuck, review the difference between class limits and class boundaries, and practice.',
          misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.',
          parts: [
                { id: 'a', prompt: 'What is the correct X-axis variable for a "less than" cumulative frequency curve (ogive)?', answer: 'The X-axis uses the upper class boundaries of each class interval',
                  options: ['The X-axis uses the upper class boundaries of each class interval', 'less than', 'more than'],
                  hint: 'If stuck, review the difference between class limits and class boundaries, and practice cumulative.',
                  misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.' },
                { id: 'b', prompt: 'Given the following grouped data of annual rainfall (cm) for 30 years: 0-20: 3, 20-40: 5, 40-60: 12, 60-80: 7, 80-100: 3.', answer: 'Less-than cumulative frequencies: <20: 3, <40: 8, <60: 20, <80: 27, <100: 30',
                  options: ['Less-than cumulative frequencies: <20: 3, <40: 8, <60: 20, <80: 27, <100: 30', 'less than', 'more than'],
                  hint: 'If stuck, review the difference between class limits and class boundaries, and practice cumulative.',
                  misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.' },
                { id: 'c', prompt: 'Two ogives (less than and more than) are drawn on the same graph for a dataset of 40 observations.', answer: 'Median = 52.5',
                  options: ['Median = 52.5', 'less than', 'more than'],
                  hint: 'If stuck, review the difference between class limits and class boundaries, and practice cumulative.',
                  misconception: 'Students often plot ogives using class mid-points (like frequency polygons) instead of class boundaries.' }
          ],
            remediations: { 'students-often-plot-ogives-using': { steps: ['Revisit c12_geo_cbse_20_009 (Frequency Polygon) to recall why mid-points are used there but NOT for ogives.', 'Practice converting a simple frequency table (e.g., 5 classes) into both less-than and more-than cumulative frequency.', 'Draw both ogives on the same graph paper using correct boundaries; verify they intersect.', 'Use the intersection to read median and compare with formula median = L + ((N/2 - CF)/f) * h to confirm.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_011', difficulty: 'standard',
          question: 'A scatter diagram is a two-dimensional graphical plot that displays the.',
          hint: 'Revisit c12_geo_cbse_20_001 (axis scaling rules) and c12_geo_cbse_20_005 (plotting points.',
          misconception: 'Students often believe that a scatter diagram with points forming a clear curve (e.g., parabolic) indicates "no.',
          parts: [
                { id: 'a', prompt: 'A student plots average annual rainfall (cm) on the X-axis and rice yield (quintals/ha) on the Y-axis for 15 districts.', answer: 'Correlation does not imply causation',
                  options: ['Correlation does not imply causation', 'no correlation', 'a scatter diagram with points forming a clear curve (e'],
                  hint: 'Revisit c12_geo_cbse_20_001 (axis scaling rules) and c12_geo_cbse_20_005 (plotting points on line.',
                  misconception: 'Students often believe that a scatter diagram with points forming a clear curve (e.g., parabolic) indicates "no correlation" because it.' },
                { id: 'b', prompt: 'Given the following paired data for 5 hill stations: Altitude (m): 1200, 1500, 1800, 2100, 2400; Mean July Temp (°C): 22.4, 20.5, 18.7, 16.8, 15.0.', answer: '(1) X-axis: Altitude 1000–2500 m, 1 cm = 200 m',
                  options: ['(1) X-axis: Altitude 1000–2500 m, 1 cm = 200 m', 'no correlation', 'a scatter diagram with points forming a clear curve (e'],
                  hint: 'Revisit c12_geo_cbse_20_001 (axis scaling rules) and c12_geo_cbse_20_005 (plotting points on line.',
                  misconception: 'Students often believe that a scatter diagram with points forming a clear curve (e.g., parabolic) indicates "no correlation" because it.' }
          ],
            remediations: { 'a-scatter-diagram-with-points': { steps: ['If a student cannot distinguish linear from non-linear patterns, have them plot three simple datasets on graph paper.', 'Ask them to describe each in one sentence.', 'Then give a real geographical dataset (e.g., temperature vs.', 'altitude from a local hill station) and ask them to sketch the expected shape before plotting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_20_012', difficulty: 'standard',
          question: 'Flow maps are thematic maps that use lines of varying width to represent the.',
          hint: 'If stuck, revisit c12_geo_cbse_20_001 (General Rules for Drawing Graphs, Diagrams and.',
          misconception: 'Students often think flow maps only show transport (trains, vehicles) and forget they can represent any flow.',
          parts: [
                { id: 'a', prompt: 'Why must dots on a dot map be of uniform size, and why should they not be placed in mountainous or desert areas when mapping population distribution?', answer: 'Uniform dot size ensures each dot represents the same quantity, allowing visual',
                  options: ['Uniform dot size ensures each dot represents the same quantity, allowing visual', 'dots can vary in size to show importance'],
                  hint: 'If stuck, revisit c12_geo_cbse_20_001 (General Rules for Drawing Graphs, Diagrams and Maps) for.',
                  misconception: 'Students often think flow maps only show transport (trains, vehicles) and forget they can represent any flow (migration, trade, water.' }
          ],
            remediations: { 'flow-maps-only-show-transport': { steps: ['If a student confuses flow map purpose, have them trace a real transport map (e.g., Delhi Metro map) and compare line.', 'For dot map errors, give them a blank outline of India with rivers and mountains marked, and ask them to place 100 dots.', '200 million, 1 dot = 2 million) only in plains.', 'Then compare with NCERT Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
