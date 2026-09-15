import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch08_p1: SimDef = {
    id: 'v3_c11_ip_ch08_p1',
    title: 'Data Visualisation and Cyber Safety · Part 1/2',
    subtitle: 'Match the chart to the question — and the show() to the plot.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Data Visualisation and Cyber Safety · Part 1/2',
    chapters: ['c11_ip_ch08'],
    nodeIds: ['c11_ip_cbse_08_001', 'c11_ip_cbse_08_002', 'c11_ip_cbse_08_003', 'c11_ip_cbse_08_004', 'c11_ip_cbse_08_005', 'c11_ip_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst turning 110 raw numbers into one insight', intro: 'Ten matches, eleven batsmen, a spreadsheet of runs — the eye can\'t read it; the right chart can.', goal: 'Select visualisations by analytical task and produce basic Matplotlib plots correctly.' },
    discovery: {
        question: 'Average marks per subject, plotted as a line chart \'because lines show trends.\' Sound choice?',
        options: ['No — subjects are categories, not a timeline; comparison wants a bar chart, and the question picks the chart', 'Yes — lines show trends, always', 'Yes — any chart fits any data', 'No — only pie charts show subject marks'],
        answer: 'No — subjects are categories, not a timeline; comparison wants a bar chart, and the question picks the chart',
        hook: 'There\'s no single \'correct\' chart — monthly sales want a line for trend, a bar for month-vs-month; the data is fixed but the question chooses.',
    },
    teaching: [
        { title: 'Introduction to Data Visualisation and its Importance', text: 'Data Visualisation is the graphical representation of information and data using visual elements like charts, graphs, maps, and plots to communicate patterns, trends, outliers, and relationships.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Pick box plot over bar to compare mark distributions across streams, then draw a 7-day temperature line with plt.plot — and remember what actually renders it.',
        labels: ['Introduction to Data Visualisation', 'Introduction to Matplotlib', 'Creating Line Charts Using', 'Creating Bar Charts Using', 'Creating Scatter Plots Using', 'Customising Charts: xlabel, ylabel,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_001', title: 'Introduction to Data Visualisation and its Importance',
          caseStudy: { intro: 'Imagine you are the captain of your school cricket team and have the runs scored by each player in the last 10 matches as a raw spreadsheet of 110 numbers.',
            decisions: [{ prompt: 'Define Data Visualisation in your own words and state its primary purpose in data analysis.', options: [
                { text: 'Data Visualisation is the representation of data in graphical form (charts, graphs, maps)', outcome: 'Data Visualisation is the representation of data in graphical form (charts, graphs, maps) to make.' },
                { text: 'making charts look attractive', outcome: 'Not quite — Students often believe that "any chart can be used for any data" and choose based on familiarity.', reveals: 'any-chart-can-be-used' },
                { text: 'any chart can be used for any data', outcome: 'Not quite — Students often believe that "any chart can be used for any data" and choose based on familiarity.', reveals: 'any-chart-can-be-used' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_002', title: 'Introduction to Matplotlib and the pyplot Module',
          caseStudy: { intro: 'Imagine you have recorded the maximum temperature in your city for the last seven days: [32, 34, 31, 33, 35, 36, 34] °C. You want to see the trend at a glance.',
            decisions: [{ prompt: 'What is the standard convention for importing the pyplot module from Matplotlib in Python scripts?', options: [
                { text: 'The standard convention is `import matplotlib.pyplot as plt`', outcome: 'The standard convention is `import matplotlib.pyplot as plt`. A wrong answer (e.g., `import.' },
                { text: 'Matplotlib isn’t working', outcome: 'Not quite — Students often believe that `plt.plot()` immediately displays the graph, so they omit `plt.show()`.', reveals: 'plt' },
                { text: '`plt.plot()` immediately displays the graph, so they omit `plt', outcome: 'Not quite — Students often believe that `plt.plot()` immediately displays the graph, so they omit `plt.show()`.', reveals: 'plt' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_003', title: 'Creating Line Charts Using plt.plot() and Customisation',
          caseStudy: { intro: 'Imagine you are tracking the daily maximum temperature in your city for a week: [32, 34, 31, 33, 35, 36, 34] degrees Celsius.',
            decisions: [{ prompt: 'What is the default behaviour of `plt.plot(y)` when only a single list `y` is provided? Describe the x-coordinates used.', options: [
                { text: 'When only `y` is provided, `plt.plot(y)` uses integer indices starting from 0 as the', outcome: 'When only `y` is provided, `plt.plot(y)` uses integer indices starting from 0 as the x-coordinates.' },
                { text: 'x-coordinates are 1, 2, 3', outcome: 'Not quite — Students often believe that `plt.plot()` automatically sorts the x-values before drawing lines,.', reveals: 'plt' },
                { text: 'that `plt', outcome: 'Not quite — Students often believe that `plt.plot()` automatically sorts the x-values before drawing lines,.', reveals: 'plt' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_004', title: 'Creating Bar Charts Using plt.bar() with Labels and Titles',
          caseStudy: { intro: 'Imagine you conducted a survey in your class asking "Which is your favorite fruit?" and got responses: Apple (12), Banana (8), Mango (15), Orange (5).',
            decisions: [{ prompt: 'What is the fundamental difference between the x-axis in a bar chart created with `plt.bar(categories, values)` and the x-axis in a line.', options: [
                { text: 'In a bar chart, the x-axis represents discrete categorical labels (strings like \'Apple\',', outcome: 'In a bar chart, the x-axis represents discrete categorical labels (strings like \'Apple\', \'Banana\').' },
                { text: 'both are numerical', outcome: 'Not quite — Students treat bar chart x-axis as numerical because they see `plt.bar(x, y)` and assume `x` must.', reveals: 'students-treat-bar-chart-x' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_005', title: 'Creating Scatter Plots Using plt.scatter()',
          caseStudy: { intro: 'Imagine you are analysing the relationship between hours studied and marks obtained by Class 11 students in your school.',
            decisions: [{ prompt: 'What is the primary purpose of a scatter plot in data visualisation, and how does it differ from a line chart created with `plt.plot()`?', options: [
                { text: 'A scatter plot displays the relationship between two continuous variables by plotting', outcome: 'A scatter plot displays the relationship between two continuous variables by plotting individual.' },
                { text: 'both show trends', outcome: 'Not quite — Students believe `plt.scatter()` and `plt.plot()` are interchangeable for showing relationships.', reveals: 'plt' },
                { text: '`plt.scatter()` and `plt', outcome: 'Not quite — Students believe `plt.scatter()` and `plt.plot()` are interchangeable for showing relationships.', reveals: 'plt' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_006', title: 'Customising Charts: xlabel, ylabel, title, legend and savefig',
          caseStudy: { intro: 'Imagine you have plotted the monthly electricity consumption (in kWh) for two households over a year using a line chart.',
            decisions: [{ prompt: 'What is the exact purpose of the `label` parameter inside `plt.plot()` and how does it relate to `plt.legend()`?', options: [
                { text: 'The `label` parameter assigns a text identifier to a specific data series (line, bar,', outcome: 'The `label` parameter assigns a text identifier to a specific data series (line, bar, scatter).' },
                { text: '`plt.legend(', outcome: 'Not quite — Students often believe that `plt.legend()` automatically picks up the variable names of the data.', reveals: 'plt' },
                { text: '`plt.legend()` automatically picks up the variable names of the data arrays (e', outcome: 'Not quite — Students often believe that `plt.legend()` automatically picks up the variable names of the data.', reveals: 'plt' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the science-fair data board, a teammate plots average marks per subject as a LINE chart \'because lines show trends\', and in Python runs `plt.plot(days, temps)` then declares \'Matplotlib is broken — no graph appeared.\'',
            decisions: [{ prompt: 'What are the correct visualisation and rendering rules?', options: [
                { text: 'Match chart to task and add the render step: subjects are categorical X — a line falsely implies continuity; comparison across categories wants a bar chart (lines need an ordered/continuous axis like time). And in a script, `plt.plot()` only builds the figure — `plt.show()` starts the GUI event loop that paints it; Jupyter auto-rendering is what trained the wrong expectation.', outcome: 'The board gets a bar chart that answers the comparison question honestly, and the script renders once `plt.show()` is called.' },
                { text: 'Keep the line chart — connecting the points looks like progress across subjects.', outcome: 'That continuity is false: moving from Hindi to Maths isn\'t a trend — lines reserve slope-meaning for ordered axes like time.', reveals: 'line-chart-for-categories' },
                { text: 'Reinstall Matplotlib — no output after plot() must mean a broken install.', outcome: 'Construction and rendering are separate calls: plot() adds the drawing, show() displays it — no error appeared because nothing was wrong.', reveals: 'plot-shows-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'plt.plot() only prepares the drawing; plt.show() is what puts it on screen — the picture exists in memory first, always.',
            decisions: [{ prompt: 'What comes next? Data Visualisation and Cyber Safety · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Visualisation and Cyber Safety · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_001', difficulty: 'standard',
          question: 'Data Visualisation is the graphical representation of information and data.',
          hint: 'Revisit Class 8 Maths "Data Handling" (c8_math_ch12_12) to practice identifying variable.',
          misconception: 'Students often believe that "any chart can be used for any data" and choose based on familiarity or visual appeal.',
          parts: [
                { id: 'a', prompt: 'A teacher has the monthly attendance percentages of 40 students for the whole year.', answer: 'A line chart (one line per student, or a heatmap) is most effective',
                  options: ['A line chart (one line per student, or a heatmap) is most effective', 'any chart can be used for any data'],
                  hint: 'Revisit Class 8 Maths "Data Handling" (c8_math_ch12_12) to practice identifying variable types and.',
                  misconception: 'Students often believe that "any chart can be used for any data" and choose based on familiarity or visual appeal (e.g., using a pie chart.' },
                { id: 'b', prompt: 'You have a dataset of 500 students with their Stream (Science/Commerce/Humanities) and their average marks.', answer: 'A box plot (or violin plot) is ideal',
                  options: ['A box plot (or violin plot) is ideal', 'any chart can be used for any data'],
                  hint: 'Revisit Class 8 Maths "Data Handling" (c8_math_ch12_12) to practice identifying variable types and.',
                  misconception: 'Students often believe that "any chart can be used for any data" and choose based on familiarity or visual appeal (e.g., using a pie chart.' },
                { id: 'c', prompt: 'Analyse the following statement: "A 3D pie chart with exploded slices is the best way to show market share of five smartphone brands because it looks.', answer: 'Flaw 1: 3D distortion misrepresents slice areas, making accurate comparison of',
                  options: ['Flaw 1: 3D distortion misrepresents slice areas, making accurate comparison of', 'any chart can be used for any data'],
                  hint: 'Revisit Class 8 Maths "Data Handling" (c8_math_ch12_12) to practice identifying variable types and.',
                  misconception: 'Students often believe that "any chart can be used for any data" and choose based on familiarity or visual appeal (e.g., using a pie chart.' }
          ],
            remediations: { 'any-chart-can-be-used': { steps: ['Have the student list the variable types in their dataset (e.g., Subject = categorical, Marks = numerical).', 'Ask them to state the exact question in words: "Compare across categories" vs "Show change over time" vs "Show.', 'Use a decision flowchart: If X is time → line; if X is categorical and Y is numerical → bar; if both numerical →.', 'Practice with 5 diverse datasets, forcing them to justify each choice using the flowchart.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "any chart can be used for any data" and choose based on familiarity or visual appeal.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "For any dataset, there is a single \'correct\' chart type that must be used." Defend your position with two examples where the same data can.', answer: 'The statement is false',
                  options: ['The statement is false', 'any chart can be used for any data'],
                  hint: 'Revisit Class 8 Maths "Data Handling" (c8_math_ch12_12) to practice identifying variable types and.',
                  misconception: 'Students often believe that "any chart can be used for any data" and choose based on familiarity or visual appeal (e.g., using a pie chart.' }
          ],
            remediations: { 'any-chart-can-be-used': { steps: ['Have the student list the variable types in their dataset (e.g., Subject = categorical, Marks = numerical).', 'Ask them to state the exact question in words: "Compare across categories" vs "Show change over time" vs "Show.', 'Use a decision flowchart: If X is time → line; if X is categorical and Y is numerical → bar; if both numerical →.', 'Practice with 5 diverse datasets, forcing them to justify each choice using the flowchart.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_002', difficulty: 'standard',
          question: 'Matplotlib is a comprehensive Python library for creating static, animated, and.',
          hint: 'Review Python list creation, `range()`, and function calls from Class 11 Computer Science.',
          misconception: 'Students often believe that `plt.plot()` immediately displays the graph, so they omit `plt.show()` and conclude.',
          parts: [
                { id: 'a', prompt: 'What is the standard convention for importing the pyplot module from Matplotlib in Python scripts?', answer: 'The standard convention is `import matplotlib.pyplot as plt`',
                  options: ['The standard convention is `import matplotlib.pyplot as plt`', 'Matplotlib isn’t working', '`plt.plot()` immediately displays the graph, so they omit `plt'],
                  hint: 'Review Python list creation, `range()`, and function calls from Class 11 Computer Science.',
                  misconception: 'Students often believe that `plt.plot()` immediately displays the graph, so they omit `plt.show()` and conclude “Matplotlib isn’t working.”.' },
                { id: 'b', prompt: 'Why is `plt.show()` necessary after calling `plt.plot()`? What happens if you omit it in a regular Python script (not a Jupyter notebook)?', answer: '`plt.plot()` only builds the plot in memory',
                  options: ['`plt.plot()` only builds the plot in memory', 'Matplotlib isn’t working', '`plt.plot()` immediately displays the graph, so they omit `plt'],
                  hint: 'Review Python list creation, `range()`, and function calls from Class 11 Computer Science.',
                  misconception: 'Students often believe that `plt.plot()` immediately displays the graph, so they omit `plt.show()` and conclude “Matplotlib isn’t working.”.' },
                { id: 'c', prompt: 'Given `x = [1, 2, 3, 4]` and `y = [10, 20, 25, 30]`, write the complete Python code (including import) to display a line plot of y versus x.', answer: '```python import matplotlib.pyplot as plt x = [1, 2, 3, 4] y = [10, 20, 25, 30]',
                  options: ['```python import matplotlib.pyplot as plt x = [1, 2, 3, 4] y = [10, 20, 25, 30]', 'Matplotlib isn’t working', '`plt.plot()` immediately displays the graph, so they omit `plt'],
                  hint: 'Review Python list creation, `range()`, and function calls from Class 11 Computer Science.',
                  misconception: 'Students often believe that `plt.plot()` immediately displays the graph, so they omit `plt.show()` and conclude “Matplotlib isn’t working.”.' }
          ],
            remediations: { 'plt': { steps: ['Ask the student to run a script with only `plt.plot()` and observe no window.', 'Have them add `plt.show()` and run again – the plot appears.', 'Explain the analogy: `plt.plot()` is like drawing on a canvas behind a curtain; `plt.show()` opens the curtain.', 'If they are using an IDE that buffers output, show how to enable “Show plots in tool window” or run from terminal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_003', difficulty: 'standard',
          question: 'A line chart is a graphical representation that displays data points connected.',
          hint: 'Revisit Class 9 Mathematics: Cartesian Coordinate System (c9_math_ch1_1) and Plotting.',
          misconception: 'Students often believe that `plt.plot()` automatically sorts the x-values before drawing lines, so they pass unsorted.',
          parts: [
                { id: 'a', prompt: 'Compare the charts produced by `plt.plot(x, y1, label=\'A\')` and `plt.plot(x, y2, label=\'B\')` followed by `plt.legend()` versus calling `plt.plot(x, y1.', answer: 'Yes, the legends are identical',
                  options: ['Yes, the legends are identical', 'that `plt'],
                  hint: 'Revisit Class 9 Mathematics: Cartesian Coordinate System (c9_math_ch1_1) and Plotting Points.',
                  misconception: 'Students often believe that `plt.plot()` automatically sorts the x-values before drawing lines, so they pass unsorted x and y pairs and.' }
          ],
            remediations: { 'plt': { steps: ['To remediate, first show a live demo: plot x=[3,1,2], y=[30,10,20] and observe the zigzag.', 'Then ask the student to sort the pairs by x using `zip` and `sorted`: `pairs = sorted(zip(x, y))`; `x_sorted, y_sorted.', 'Re-plot with sorted lists to see the correct trend.', 'Emphasise that `plt.plot()` is a low-level drawing command, not a mathematical function plotter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_004', difficulty: 'standard',
          question: 'A bar chart is a categorical data visualization that represents discrete.',
          hint: 'Review c11_ip_cbse_08_003 (line charts) focusing on the plt.xlabel/ylabel/title pattern.',
          misconception: 'Students treat bar chart x-axis as numerical because they see `plt.bar(x, y)` and assume `x` must be numbers like.',
          parts: [
                { id: 'a', prompt: 'Given the code below, what will be the x-axis labels on the resulting bar chart?', answer: 'The x-axis will show \'Physics\', \'Chemistry\', \'Maths\' as tick labels',
                  options: ['The x-axis will show \'Physics\', \'Chemistry\', \'Maths\' as tick labels', '0, 1, 2', 'Subjects'],
                  hint: 'Review c11_ip_cbse_08_003 (line charts) focusing on the plt.xlabel/ylabel/title pattern, and.',
                  misconception: 'Students treat bar chart x-axis as numerical because they see `plt.bar(x, y)` and assume `x` must be numbers like in `plt.plot(x, y)`.' }
          ],
            remediations: { 'students-treat-bar-chart-x': { steps: ['Show side-by-side: `plt.plot([1,2,3], [10,20,15])` vs `plt.bar([\'A\',\'B\',\'C\'], [10,20,15])`.', 'Ask: "Where is \'A\' located on the x-axis?" (Answer: at position 0).', 'Demonstrate `plt.bar([1,2,3], [10,20,15])` produces bars at x=1,2,3 with gap at 0.', 'Have student convert their numerical category codes to strings and re-run.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_005', difficulty: 'standard',
          question: 'A scatter plot is a data visualisation technique that uses Cartesian.',
          hint: 'Revisit Class 9 coordinate geometry (plotting points, quadrants) and Class 11 IP node.',
          misconception: 'Students believe `plt.scatter()` and `plt.plot()` are interchangeable for showing relationships because both accept.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A scatter plot is a data visualisation technique that uses Cartesian coordinates to',
                  options: ['A scatter plot is a data visualisation technique that uses Cartesian coordinates to', 'Data Visualisation is the graphical representation of information and data using visual', 'Matplotlib is a comprehensive Python library for creating static, animated, and', 'A line chart is a graphical representation that displays data points connected by'],
                  hint: 'Revisit Class 9 coordinate geometry (plotting points, quadrants) and Class 11 IP node.',
                  misconception: 'Students believe `plt.scatter()` and `plt.plot()` are interchangeable for showing relationships because both accept x and y lists.' }
          ],
            remediations: { 'plt': { steps: ['Have the student plot the same dataset (e.g., `x=[1,3,2,4]`, `y=[2,6,4,8]`) using both `plt.scatter()` and `plt.plot()`.', 'Ask: "Does the line in plot() connect related observations?', 'Are the points in order of height?', 'Guide them to see that `plot()` connects point 1 to 2 to 3 to 4 by index order, not by x-value order.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_006', difficulty: 'standard',
          question: 'Customising charts in Matplotlib involves adding descriptive elements (xlabel.',
          hint: 'Revisit the `plt.plot()` syntax from node c11_ip_cbse_08_003 and practice adding.',
          misconception: 'Students often believe that `plt.legend()` automatically picks up the variable names of the data arrays (e.g., if they.',
          parts: [
                { id: 'a', prompt: 'A student writes `plt.xlabel(\'Time\')` and `plt.ylabel(\'Speed\')` *after* `plt.savefig(\'graph.png\')`. The saved image has no axis labels.', answer: 'Matplotlib renders the figure at the moment `savefig()` is called',
                  options: ['Matplotlib renders the figure at the moment `savefig()` is called', '`plt.legend()` automatically picks up the variable names of the data arrays (e'],
                  hint: 'Revisit the `plt.plot()` syntax from node c11_ip_cbse_08_003 and practice adding a `label` argument.',
                  misconception: 'Students often believe that `plt.legend()` automatically picks up the variable names of the data arrays (e.g., if they plotted `y1` and.' },
                { id: 'b', prompt: 'Compare the effect of `plt.title(\'Sales\')` versus `plt.suptitle(\'Sales\')` when used in a script that creates a single plot.', answer: '`plt.title()` sets the title of the current Axes (the individual plot), while',
                  options: ['`plt.title()` sets the title of the current Axes (the individual plot), while', '`plt.legend()` automatically picks up the variable names of the data arrays (e'],
                  hint: 'Revisit the `plt.plot()` syntax from node c11_ip_cbse_08_003 and practice adding a `label` argument.',
                  misconception: 'Students often believe that `plt.legend()` automatically picks up the variable names of the data arrays (e.g., if they plotted `y1` and.' }
          ],
            remediations: { 'plt': { steps: ['If a student\'s legend shows empty entries or wrong labels, ask them to print the `label` argument they passed to each.', 'Then have them write a minimal script with two `plot()` calls, each with a distinct `label=\'...\'`, followed.', 'Run it and observe the legend.', 'Next, remove one `label` and run again to see the missing entry.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
