import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch07_p1: SimDef = {
    id: 'v3_c11_stat_ch07_p1',
    title: 'Correlation · Part 1/2',
    subtitle: 'Separate moving together from making happen.',
    classLevel: 11, subject: 'statistics', topic: 'Correlation · Part 1/2',
    chapters: ['c11_stat_ch07'],
    nodeIds: ['c11_stat_cbse_07_001', 'c11_stat_cbse_07_002', 'c11_stat_cbse_07_003', 'c11_stat_cbse_07_004', 'c11_stat_cbse_07_005', 'c11_stat_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sceptic interrogating a suspicious correlation', intro: 'Bigger feet, better readers — the correlation is real, the causation is an illusion called age.', goal: 'Distinguish correlation from causation and read r\'s limits correctly.' },
    discovery: {
        question: 'Districts with more hospitals report more disease — therefore hospitals cause disease. Where\'s the fallacy?',
        options: ['A third variable — population density and urbanisation drive both; correlation measures co-movement, not causation', 'Nowhere — the correlation proves it', 'The hospitals were built badly', 'Correlation only works one way'],
        answer: 'A third variable — population density and urbanisation drive both; correlation measures co-movement, not causation',
        hook: 'And r = 0.92 says \'strong and positive\' but not automatically \'linear\' — the coefficient can\'t see the curve your scatter diagram can.',
    },
    teaching: [
        { title: 'Meaning and Definition of Correlation', text: 'Correlation is a statistical measure that quantifies the direction and strength of the linear relationship between two variables, indicating how they tend to change together without implying that one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Explain how shoe size correlates with reading skill in children (the hidden variable: age), then test what r alone can and cannot claim.',
        labels: ['Meaning and Definition', 'Types of Correlation: Positive,', 'Scatter Diagram: Interpretation', 'Karl Pearson\'s Coefficient', 'Calculation of Correlation Coefficient'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_001', title: 'Meaning and Definition of Correlation',
          caseStudy: { intro: 'Imagine you read a news headline: "Students who eat breakfast score higher on exams!" You wonder: does eating breakfast *cause* better scores, or do students.',
            decisions: [{ prompt: 'Define correlation in one sentence. What is the single most important thing correlation tells us about two variables?', options: [
                { text: 'Correlation is a statistical measure that describes the extent to', outcome: 'Correlation is a statistical measure that describes the extent to which two variables change.' },
                { text: 'correlation means one variable causes the other', outcome: 'Not quite — Students believe **correlation implies causation** — if two variables are correlated, one must.', reveals: 'correlation-implies-causation-if-two' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_002', title: 'Types of Correlation: Positive, Negative, Linear, and Non-Linear',
          caseStudy: { intro: 'Imagine you are a shopkeeper tracking daily ice-cream sales and maximum temperature. On hotter days, sales go up; on cooler days, sales drop.',
            decisions: [{ prompt: 'State the two independent criteria used to classify correlation into the four types: positive, negative, linear, and non-linear.', options: [
                { text: 'The two criteria are: (1) **Direction**', outcome: 'The two criteria are: (1) **Direction** — whether variables change in the same direction (positive).' },
                { text: 'positive and negative are the only types', outcome: 'Not quite — **“Linear correlation means the variables increase at the same rate.”** Many Class 11 students.', reveals: 'linear-correlation-means-the-variables' },
                { text: 'Linear correlation means the variables increase at the same rate', outcome: 'Not quite — **“Linear correlation means the variables increase at the same rate.”** Many Class 11 students.', reveals: 'linear-correlation-means-the-variables' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_003', title: 'Scatter Diagram: Interpretation of Correlation Patterns',
          scaffold: { problem: 'A researcher collects data on "Daily Maximum Temperature (°C)" and "Daily Ice Cream Sales (₹)" for a Delhi ice cream vendor over 12 summer.',
            steps: [
            { text: 'Identify variables — Temperature (X, independent) and Ice Cream Sales (Y, dependent).' },
            { text: 'Plot each of the 12 pairs as a dot: (32,4200), (35,5100), (38,6300), (40,6800), (42,7200), (36,5500), (39,6000).' },
            { text: 'Observe the overall pattern — dots form an elongated cluster sloping upward from lower-left (cool days, low sales).' },
            { text: 'Assess degree — the cluster is narrow; most points lie close to an imaginary straight line drawn through the middle.' },
            { text: 'Assess nature — the upward trend follows a straight-line path; no systematic curvature (e.g., flattening at high.' },
            { text: 'Synthesise interpretation — "The scatter diagram shows a high positive linear correlation between daily maximum.', faded: true, blankAnswer: 'High positive linear correlation. Direction: Positive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_004', title: 'Karl Pearson\'s Coefficient of Correlation: Formula and Interpretation',
          scaffold: { problem: 'A researcher collects data on daily study hours (X) and test scores (Y) for 5 students: (2, 50), (3, 60), (4, 65), (5, 75), (6, 85).',
            steps: [
            { text: 'Compute means: x̄ = (2+3+4+5+6)/5 = 4; ȳ = (50+60+65+75+85)/5 = 67' },
            { text: 'Compute deviations from mean: x_i - x̄ = (-2, -1, 0, 1, 2); y_i - ȳ = (-17, -7, -2, 8, 18)' },
            { text: 'Compute product of deviations: Σ(x_i - x̄)(y_i - ȳ) = (-2)(-17) + (-1)(-7) + (0)(-2) + (1)(8) + (2)(18) = 34 + 7 + 0.' },
            { text: 'Compute sum of squared deviations: Σ(x_i - x̄)² = 4+1+0+1+4 = 10; Σ(y_i - ȳ)² = 289+49+4+64+324 = 730' },
            { text: 'Apply formula: r = 85 / √(10 × 730) = 85 / √7300 ≈ 85 / 85.44 ≈ 0.995' },
            { text: 'Interpret: r ≈ 0.995 indicates a very strong positive linear relationship — as study hours increase, test scores.', faded: true, blankAnswer: 'r ≈ 0.995 (very strong positive linear correlation)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_005', title: 'Calculation of Correlation Coefficient Using Actual Mean Method',
          scaffold: { problem: 'Calculate the correlation coefficient between the height of fathers (X in cm) and sons (Y in cm) for the following 6 pairs using the actual.',
            steps: [
            { text: 'Calculate the arithmetic means. X̄ = (160+162+164+166+168+170)/6 = 990/6 = 165.' },
            { text: 'Compute deviations from mean for each pair. x = X - 165 → -5, -3, -1, 1, 3, 5. y = Y - 163 → -5, -3, -1, 1, 3, 5.' },
            { text: 'Compute squares and products. x²: 25, 9, 1, 1, 9, 25 → Σx² = 70. y²: 25, 9, 1, 1, 9, 25 → Σy² = 70.' },
            { text: 'Substitute into formula. r = 70 / √(70 × 70) = 70/70 = 1.' },
            { text: 'Interpret. r = +1 indicates a perfect positive linear correlation; son\'s height increases exactly in step with father\'s.', faded: true, blankAnswer: 'r = +1 (Perfect positive correlation)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_006', title: 'Calculation of Correlation Coefficient Using Assumed Mean Method',
          scaffold: { problem: 'A study examines the relationship between hours of weekly exercise (X) and resting heart rate in bpm (Y) for 8 individuals.',
            steps: [
            { text: 'Identify given data: N = 8 pairs. X values: 2,4,5,6,7,8,9,10. Y values: 78,72,70,68,65,62,60,58.' },
            { text: 'Construct the correlation table. For each pair, compute dx = X - 6, dy = Y - 68, then dx², dy², dxdy.' },
            { text: 'Sum each column: Σdx = (-4-2-1+0+1+2+3+4) = 3; Σdy = (10+4+2+0-3-6-8-10) = -11; Σdx² = 51; Σdy² = 329; Σdxdy = -129.' },
            { text: 'Substitute into formula: r = [8(-129) - (3)(-11)] / √[8(51) - (3)²] × √[8(329) - (-11)²] = [-1032 + 33] / √[408 - 9].' },
            { text: 'Verify: Actual means X̄ = 6.125, Ȳ = 66.625. The strong negative correlation (-0.998) makes physiological sense: more.', faded: true, blankAnswer: 'r ≈ -0.998 (strong negative correlation)' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Reading a scatter study, a student reports: \'r = 0.85 between shoe size and reading ability — bigger feet improve reading.\' He also calls a steep straight-line scatter \'non-linear, since the changes aren\'t equal.\'',
            decisions: [{ prompt: 'What does correlation actually measure?', options: [
                { text: 'Hold the two boundaries: correlation quantifies co-movement, not cause — the shoe-size link runs through a third variable (age), and zero correlation doesn\'t mean no relation (U-shaped patterns can hide). And \'linear\' means constant RATIO of change — any slope qualifies; Y = 50 + 2.5X is linear though changes aren\'t equal and the line doesn\'t pass through the origin.', outcome: 'The report corrects: r measures direction and strength of linear association — causation needs more, and linearity is about constant slope, not equal steps.' },
                { text: 'Keep the causal read — 0.85 is too strong to be coincidence.', outcome: 'Strength isn\'t direction of cause: co-movement can\'t distinguish X→Y, Y→X, a common cause, or coincidence — here age drives both.', reveals: 'correlation-implies-causation' },
                { text: 'Keep \'non-linear\' — the variables aren\'t rising at the same rate.', outcome: 'Linear means constant ratio, not 1:1 — a steep straight scatter is perfectly linear; non-linearity shows as curvature.', reveals: 'linear-means-equal-rates' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Correlation hears two things move together — it never hears which one is talking, or whether a third is conducting.',
            decisions: [{ prompt: 'What comes next? Correlation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Correlation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_001', difficulty: 'standard',
          question: 'Correlation is a statistical measure that quantifies the direction and strength.',
          hint: 'If stuck, review coordinate geometry (plotting points) from Class 9 Maths Chapter 1 and.',
          misconception: 'Students believe **correlation implies causation** — if two variables are correlated, one must cause the other.',
          parts: [
                { id: 'a', prompt: 'Define correlation in one sentence. What is the single most important thing correlation tells us about two variables?', answer: 'Correlation is a statistical measure that describes the extent to',
                  options: ['Correlation is a statistical measure that describes the extent to', 'correlation means one variable causes the other'],
                  hint: 'If stuck, review coordinate geometry (plotting points) from Class 9 Maths Chapter 1 and measures.',
                  misconception: 'Students believe **correlation implies causation** — if two variables are correlated, one must cause the other.' },
                { id: 'b', prompt: 'A researcher collects data on "hours of weekly exercise" and "resting heart rate (bpm)" for 50 adults.', answer: 'This is a **negative correlation**',
                  options: ['This is a **negative correlation**', 'positive correlation', 'points slope upward'],
                  hint: 'If stuck, review coordinate geometry (plotting points) from Class 9 Maths Chapter 1 and measures.',
                  misconception: 'Students believe **correlation implies causation** — if two variables are correlated, one must cause the other.' }
          ],
            remediations: { 'correlation-implies-causation-if-two': { steps: ['**Confront the fallacy directly**: Show the "ice cream → drowning" example.', 'Ask: "If we ban ice cream, will drownings stop?" Guide them to identify the confounder (temperature).', '**Use the "third variable" drill**: Give 3 spurious correlations (e.g., Nicolas Cage movies vs.', 'pool drownings; cheese consumption vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_002', difficulty: 'standard',
          question: 'Correlation is classified into four types based on direction and pattern: (1).',
          hint: 'If stuck, revisit Class 9 Mathematics Chapter 3 (Coordinate Geometry) — specifically.',
          misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies.',
          parts: [
                { id: 'a', prompt: 'State the two independent criteria used to classify correlation into the four types: positive, negative, linear, and non-linear.', answer: 'The two criteria are: (1) **Direction**',
                  options: ['The two criteria are: (1) **Direction**', 'positive and negative are the only types', 'Linear correlation means the variables increase at the same rate', 'linear'],
                  hint: 'If stuck, revisit Class 9 Mathematics Chapter 3 (Coordinate Geometry) — specifically plotting.',
                  misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies a 1:1 ratio (slope.' },
                { id: 'b', prompt: 'A student says: “If correlation is positive, it must be linear because both variables increase together.” Explain why this statement is incorrect, using.', answer: 'Positive correlation only means variables move in the same direction',
                  options: ['Positive correlation only means variables move in the same direction', 'Linear correlation means the variables increase at the same rate', 'linear', 'proportional'],
                  hint: 'If stuck, revisit Class 9 Mathematics Chapter 3 (Coordinate Geometry) — specifically plotting.',
                  misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies a 1:1 ratio (slope.' },
                { id: 'c', prompt: 'Compare and contrast the scatter diagram patterns for: (a) positive linear, (b) positive non-linear, (c) negative linear, (d) negative non-linear.', answer: 'positive linear, (',
                  options: ['positive linear, (', 'Linear correlation means the variables increase at the same rate', 'linear', 'proportional'],
                  hint: 'If stuck, revisit Class 9 Mathematics Chapter 3 (Coordinate Geometry) — specifically plotting.',
                  misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies a 1:1 ratio (slope.' }
          ],
            remediations: { 'linear-correlation-means-the-variables': { steps: ['**Revisit the definition of a linear function** from Class 9/10 coordinate geometry: Y = a + bX.', 'Emphasize that ‘b’ (slope) can be any real number — it represents the constant rate of change.', '**Contrast with proportional relationship** (Y = bX, a=0) using a simple table: X: 1,2,3,4 → Y: 10,20,30,40.', 'Y: 15,25,35,45 (linear, not proportional).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies.',
          parts: [
                { id: 'a', prompt: 'A researcher calculates Karl Pearson’s correlation coefficient (r) for a data set and obtains r = 0.92.', answer: 'The conclusion is **not fully justified**',
                  options: ['The conclusion is **not fully justified**', 'Linear correlation means the variables increase at the same rate', 'linear', 'proportional'],
                  hint: 'If stuck, revisit Class 9 Mathematics Chapter 3 (Coordinate Geometry) — specifically plotting.',
                  misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies a 1:1 ratio (slope.' },
                { id: 'b', prompt: 'Create your own real-world scenario (Indian context) involving two variables that exhibit **negative non-linear correlation**.', answer: '**Scenario:** Average speed of a vehicle (km/h) vs',
                  options: ['**Scenario:** Average speed of a vehicle (km/h) vs', 'Linear correlation means the variables increase at the same rate', 'linear', 'proportional'],
                  hint: 'If stuck, revisit Class 9 Mathematics Chapter 3 (Coordinate Geometry) — specifically plotting.',
                  misconception: '**“Linear correlation means the variables increase at the same rate.”** Many Class 11 students think “linear” implies a 1:1 ratio (slope.' }
          ],
            remediations: { 'linear-correlation-means-the-variables': { steps: ['**Revisit the definition of a linear function** from Class 9/10 coordinate geometry: Y = a + bX.', 'Emphasize that ‘b’ (slope) can be any real number — it represents the constant rate of change.', '**Contrast with proportional relationship** (Y = bX, a=0) using a simple table: X: 1,2,3,4 → Y: 10,20,30,40.', 'Y: 15,25,35,45 (linear, not proportional).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_003', difficulty: 'standard',
          question: 'A scatter diagram is a graphical tool that plots paired values of two variables.',
          hint: 'If stuck, revisit Class 9 Maths Chapter 3 (Coordinate Geometry): plotting points.',
          misconception: '**"If the dots don\'t form a straight line, there is no correlation."** Students see a clear curved pattern (e.g.',
          parts: [
                { id: 'a', prompt: 'Two scatter diagrams are drawn for the same bivariate data set: Diagram A has X-axis scale 1 cm = 5 units, Y-axis scale 1 cm = 5 units.', answer: '**Diagram A** gives the true impression',
                  options: ['**Diagram A** gives the true impression', 'both are equally valid'],
                  hint: 'If stuck, revisit Class 9 Maths Chapter 3 (Coordinate Geometry): plotting points, understanding.',
                  misconception: '**"If the dots don\'t form a straight line, there is no correlation."** Students see a clear curved pattern (e.g., U-shaped, inverted-U.' },
                { id: 'b', prompt: 'Given the following paired data for "Hours of Study per Week (X)" and "Marks Obtained in Statistics Test (Y)" for 10 students: (2, 35), (4, 42), (5, 50), (6.', answer: '**Direction: Positive**',
                  options: ['**Direction: Positive**', 'moderate', 'non-linear', 'linear'],
                  hint: 'If stuck, revisit Class 9 Maths Chapter 3 (Coordinate Geometry): plotting points, understanding.',
                  misconception: '**"If the dots don\'t form a straight line, there is no correlation."** Students see a clear curved pattern (e.g., U-shaped, inverted-U.' }
          ],
            remediations: { 'if-the-dots-don-t': { steps: ['**Show, don\'t tell:** Draw three scatter diagrams on the board — a straight line, a parabola, and a random cloud.', 'Ask: "Which show a relationship?" Guide the student to see the parabola has a *perfect* relationship (every X maps.', '**Connect to algebra:** Remind them that y = x² is a function — perfect dependence — but its scatter plot is curved.', 'Correlation ≠ causation, but *dependence* includes non-linear forms.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_004', difficulty: 'standard',
          question: 'Karl Pearson\'s Coefficient of Correlation (denoted by *r*) is a pure number.',
          hint: 'Revisit "Covariance" in Measures of Dispersion chapter — understand that cov(X,Y) = Σ(x_i.',
          misconception: 'Students often believe that **high *r* implies causation** (e.g., "*r*=0.9 between ice-cream sales and drowning deaths.',
          parts: [
                { id: 'a', prompt: 'Two datasets give *r* = 0.85. Dataset A: (Height in cm, Weight in kg). Dataset B: (Height in inches, Weight in lbs).', answer: 'Correct answer: **Same**',
                  options: ['Correct answer: **Same**', 'different because units are different', '**high *r* implies causation** (e'],
                  hint: 'Revisit "Covariance" in Measures of Dispersion chapter — understand that cov(X,Y) = Σ(x_i - x̄)(y_i.',
                  misconception: 'Students often believe that **high *r* implies causation** (e.g., "*r*=0.9 between ice-cream sales and drowning deaths means ice-cream.' }
          ],
            remediations: { 'high-r-implies-causation-e': { steps: ['Show a scatter plot of Y = X² with *r* = 0 and ask "Is there a relationship?" → forces recognition that *r* misses.', 'Use the classic "ice-cream vs drowning" example: both increase in summer (confounding variable = temperature).', 'Ask "Does banning ice-cream reduce drowning?" → exposes causation fallacy.', 'Re-derive *r* from covariance/standard deviations to show it is **standardised covariance** — only measures linear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_005', difficulty: 'standard',
          question: 'The Actual Mean Method (Direct Method) for calculating Karl Pearson\'s.',
          hint: 'If stuck on mean calculation, revisit Class 10 Statistics (c10_math_cbse_13_001) for the.',
          misconception: 'Students often believe that the actual mean method requires the means X̄ and Ȳ to be integers, and if they get decimal.',
          parts: [
                { id: 'a', prompt: 'Given the following data for X and Y, compute the correlation coefficient using the actual mean method. X: 10, 12, 14, 16, 18 Y: 20, 22, 24, 26, 28', answer: 'Step 1: X̄ = (10+12+14+16+18)/5 = 70/5 = 14',
                  options: ['Step 1: X̄ = (10+12+14+16+18)/5 = 70/5 = 14', 'they have made a mistake'],
                  hint: 'If stuck on mean calculation, revisit Class 10 Statistics (c10_math_cbse_13_001) for the direct.',
                  misconception: 'Students often believe that the actual mean method requires the means X̄ and Ȳ to be integers, and if they get decimal means, they either.' },
                { id: 'b', prompt: 'Compare the actual mean method and the assumed mean method in terms of the final value of r. Will they always give the same numerical result?', answer: 'Yes, both methods yield the identical value of r',
                  options: ['Yes, both methods yield the identical value of r', 'they give different results', 'assumed mean is approximate', 'they have made a mistake'],
                  hint: 'If stuck on mean calculation, revisit Class 10 Statistics (c10_math_cbse_13_001) for the direct.',
                  misconception: 'Students often believe that the actual mean method requires the means X̄ and Ȳ to be integers, and if they get decimal means, they either.' }
          ],
            remediations: { 'the-actual-mean-method-requires': { steps: ['If a student rounds off the means, stop them immediately and show that rounding changes Σx and Σy from zero.', 'Make them redo with exact fractions/decimals.', 'If they misuse the denominator, have them write the formula with parentheses: r = Σxy / √(Σx² × Σy²).', 'If they use X instead of x, ask them to label columns explicitly as \'x\', \'y\', \'x²\', \'y²\', \'xy\' and fill only using the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_006', difficulty: 'standard',
          question: 'The assumed mean method (step-deviation method) for Karl Pearson\'s correlation.',
          hint: 'If stuck, revisit Class 10 Statistics node c10_math_cbse_13_002 (Assumed Mean Method for.',
          misconception: 'Students believe the assumed mean *changes* the correlation value, so they try different assumed means hoping for.',
          parts: [
                { id: 'a', prompt: 'Compare the assumed mean method with the actual mean method for the data in Question 3. Prove algebraically that both yield identical r.', answer: 'Actual means: X̄ = 18, Ȳ = 35',
                  options: ['Actual means: X̄ = 18, Ȳ = 35', 'better'],
                  hint: 'If stuck, revisit Class 10 Statistics node c10_math_cbse_13_002 (Assumed Mean Method for Mean) and.',
                  misconception: 'Students believe the assumed mean *changes* the correlation value, so they try different assumed means hoping for a "better" r.' }
          ],
            remediations: { 'the-assumed-mean-changes-the': { steps: ['Have the student compute r for a tiny dataset (n=3) using both actual mean and two different assumed means, showing all.', 'Explicitly prove: dx = (X - X̄) + (X̄ - A_x) = deviation_from_actual + constant.', 'Show how the constant cancels in the formula.', 'Practice the sign convention: "dx = X minus A_x" - say it aloud while writing each deviation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
