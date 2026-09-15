import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch02_p2: SimDef = {
    id: 'v3_c12_ip_ch02_p2',
    title: 'Data Handling Using Pandas · Part 2/2',
    subtitle: 'The dictionary\'s keys became the address book',
    classLevel: 12, subject: 'informatics_practices', topic: 'Data Handling Using Pandas · Part 2/2',
    chapters: ['c12_ip_ch02'],
    nodeIds: ['c12_ip_cbse_02_007', 'c12_ip_cbse_02_008', 'c12_ip_cbse_02_009', 'c12_ip_cbse_02_010', 'c12_ip_cbse_02_011', 'c12_ip_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Data-frame builder', intro: 'A week\'s temperatures become answerable questions the moment each value gets a label.', goal: 'Create Pandas Series from lists, arrays and dicts — and predict the index each way.' },
    discovery: {
        question: 'You hand pandas a dictionary of monthly sales — and the months become the index without being asked. Where did the labels come from?',
        options: ['The keys — a dict\'s keys become the Series index in insertion order, values become data; no index argument means pandas builds 0,1,2... only when nothing else provides labels', 'The values did', 'Alphabetical order', 'Random order'],
        answer: 'The keys — a dict\'s keys become the Series index in insertion order, values become data; no index argument means pandas builds 0,1,2... only when nothing else provides labels',
        hook: 'List or NumPy array — same default RangeIndex; the source container doesn\'t matter. And \'sales[1]\' works but \'sales[\'Feb\']\' is the point: labels are addresses you chose, not positions you memorised.',
    },
    teaching: [
        { title: 'Adding and deleting DataFrame columns and rows', text: 'Adding and deleting DataFrame columns and rows refers to the structural modification operations in Pandas that allow dynamic expansion or contraction of a two-dimensional labeled data structure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build Series three ways — list, array, dict — predict each index before printing, and catch the case where a custom index asks for a label the data never had.',
        labels: ['Adding and deleting DataFrame', 'Descriptive statistics: mean, median,', 'Grouping data with groupby', 'Filtering and sorting DataFrames', 'Exporting data: to_csv', 'Plotting from Pandas: line,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_008', title: 'Descriptive statistics: mean, median, mode, std, describe',
          scaffold: { problem: 'A teacher has the following marks (out of 100) for 10 students in a Class 12 IP test: [78, 85, 92, 78, 88, 95, 70, 82, 78, 90].',
            steps: [
            { text: 'Import pandas and create the Series `marks = pd.Series([78, 85, 92, 78, 88, 95, 70, 82, 78, 90])`.' },
            { text: 'Compute mean using `marks.mean()` → 83.6. This is the average mark.' },
            { text: 'Compute median using `marks.median()` → 83.5. Since n=10 (even), median is average of 5th and 6th sorted values (82 and.' },
            { text: 'Compute mode using `marks.mode()` → returns a Series with value 78 (appears 3 times).' },
            { text: 'Compute standard deviation using `marks.std()` → ≈ 7.72. This measures spread; default ddof=1 (sample std).' },
            { text: 'Compute full summary using `marks.describe()` → gives count, mean, std, min, 25%, 50%, 75%, max.' },
            { text: 'Interpretation: Mean (83.6) and median (83.5) are close → symmetric distribution.', faded: true, blankAnswer: 'mean=83.6, median=83.5, mode=78 (as Series), std≈7.72.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_009', title: 'Grouping data with groupby and aggregation functions',
          scaffold: { problem: 'A school has the following marks data for students in three classes (A, B, C) across two subjects (Math, Science).',
            steps: [
            { text: 'Import pandas and create the DataFrame from the given data using a dictionary of lists.' },
            { text: 'Verify the DataFrame structure with df.head() and df.dtypes to ensure \'Marks\' is numeric.' },
            { text: 'Group by two columns [\'Class\', \'Subject\'] because we need averages for each combination of class and subject.' },
            { text: 'Select the \'Marks\' column and apply .mean() aggregation.' },
            { text: 'The result is a Series with a MultiIndex (Class, Subject). Use .reset_index() to convert to a DataFrame with columns.' },
            { text: 'Interpret the output: Class A Math avg = 87.5, Class A Science avg = 80.0, Class B Math avg = 77.5, Class B Science avg.', faded: true, blankAnswer: '```' }
            ] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_010', title: 'Filtering and sorting DataFrames by values',
          caseStudy: { intro: 'Imagine you have a CSV of 10,000 e‑commerce orders with columns: OrderID, CustomerCity, ProductCategory, Quantity, UnitPrice, OrderDate.',
            decisions: [{ prompt: 'What is the output of `df.loc[df[\'Marks\'] > 80]` if `df` is a DataFrame with a column \'Marks\' containing integer values?', options: [
                { text: 'The output is a new DataFrame containing only the rows where the \'Marks\' column value is', outcome: 'The output is a new DataFrame containing only the rows where the \'Marks\' column value is greater.' },
                { text: 'returns a Series', outcome: 'Not quite — Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place.', reveals: 'df' },
                { text: 'modifies df in place', outcome: 'Not quite — Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place.', reveals: 'df' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_011', title: 'Exporting data: to_csv and to_excel from DataFrames',
          caseStudy: { intro: 'Imagine you have cleaned and analysed a dataset of Class 12 board exam results for 500 students in a DataFrame — now your principal needs the file in Excel.',
            decisions: [{ prompt: 'What is the default behaviour of `DataFrame.to_csv()` regarding the row index and column headers?', options: [
                { text: 'By default, `to_csv()` writes the row index as the first column and includes the column', outcome: 'By default, `to_csv()` writes the row index as the first column and includes the column headers.' },
                { text: 'index is not written', outcome: 'Not quite — Students believe `to_excel` works without installing `openpyxl` (or `xlwt` for .xls) because.', reveals: 'to-excel-works-without-installing' },
                { text: 'headers are omitted', outcome: 'Not quite — Students believe `to_excel` works without installing `openpyxl` (or `xlwt` for .xls) because.', reveals: 'to-excel-works-without-installing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_012', title: 'Plotting from Pandas: line, bar, and histogram with matplotlib',
          caseStudy: { intro: 'Imagine you have a CSV file `monthly_sales.csv` with 12 rows (months) and columns `Month`, `Revenue`, `Expenses`.',
            decisions: [{ prompt: 'What is the default value of the `kind` parameter in `Series.plot()` and `DataFrame.plot()`?', options: [
                { text: 'The default `kind` is `\'line\'` for both Series and DataFrame', outcome: 'The default `kind` is `\'line\'` for both Series and DataFrame. A wrong answer (e.g., `\'bar\'`.' },
                { text: 'Pandas is only for data manipulation and matplotlib is only for plotting', outcome: 'Not quite — Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they.', reveals: 'pandas-is-only-for-data' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate loads exam marks as a dictionary {\'Maths\': [...], \'Physics\': [...]} into a DataFrame, then panics: \'pandas put the subjects as columns — my student names were supposed to be columns and it made numbered rows instead.\'',
            decisions: [{ prompt: 'What did the constructor actually do?', options: [
                { text: 'Exactly what dict-of-lists means — keys become column labels and rows get a default 0..n index; his student names were never in the input, so the table is correctly shaped — subjects as columns, anonymous numbered rows — and the fix is supplying an index, not blaming pandas.', outcome: 'The chapter\'s orientation rule: input structure maps to output labels — dict keys are always columns; rows need an explicit index to carry names.' },
                { text: 'He\'s right that pandas guessed wrong — it should know names are rows.', outcome: 'Nothing was guessed: the input contained only subject lists, so the RangeIndex is the default, not an error — expecting names that were never passed in is the actual bug.', reveals: 'pandas-guesses-intent' },
                { text: 'Transpose the DataFrame — .T will fix the orientation permanently.', outcome: 'Transpose flips subjects to rows, but the student names still don\'t exist anywhere in the data — you can\'t pivot in labels that were never loaded.', reveals: 'transpose-adds-labels' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You can now read a Series as labelled data — where the index is an address book, not a row number.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_007', difficulty: 'standard',
          question: 'Adding and deleting DataFrame columns and rows refers to the structural.',
          hint: 'Revisit c12_ip_cbse_02_002 (DataFrame creation) to practice building DataFrames with.',
          misconception: '**Misconception:** "Adding a row with `df.loc[\'NewRow\'] = [values]` works exactly like adding a column with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adding and deleting DataFrame columns and rows refers to the structural modification',
                  options: ['Adding and deleting DataFrame columns and rows refers to the structural modification', 'A Pandas Series is a one-dimensional labeled array capable of holding any data type', 'A Pandas DataFrame is a two-dimensional, size-mutable, heterogeneous tabular data', '**loc** is a label-based indexer for DataFrame that selects rows and columns by their'],
                  hint: 'Revisit c12_ip_cbse_02_002 (DataFrame creation) to practice building DataFrames with explicit row.',
                  misconception: '**Misconception:** "Adding a row with `df.loc[\'NewRow\'] = [values]` works exactly like adding a column with `df[\'NewCol\'] = [values]`.' }
          ],
            remediations: { 'misconception-adding-a-row-with': { steps: ['** Have the student create a DataFrame `df = pd.DataFrame({\'A\': [1,2], \'B\': [3,4], \'C\': [5,6]}, index=[\'x\',\'y\'])`. **', '** Ask them to predict the result of `df.loc[\'z\'] = [10, 20, 30]` — they\'ll likely say "adds row z with A=10, B=20.', '** Now reorder columns: `df = df[[\'C\', \'A\', \'B\']]`. Print `df` to show new order. **', '** Execute `df.loc[\'w\'] = [100, 200, 300]` and print again. Student sees C=100, A=200, B=300 — **not** A=100, B=200.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_008', difficulty: 'standard',
          question: 'Descriptive statistics in Pandas refer to built-in methods (mean(), median().',
          hint: 'If stuck, revisit Class 11 Statistics nodes c11_stat_cbse_05_002 (mean).',
          misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually.',
          parts: [
                { id: 'a', prompt: 'Given a Series `s = pd.Series([10, 20, 30, 40, 50, 1000])`, compute the mean and median manually, then explain why they differ and which better represents the.', answer: 'Mean = (10+20+30+40+50+1000)/6 = 1150/6 ≈ 191.67',
                  options: ['Mean = (10+20+30+40+50+1000)/6 = 1150/6 ≈ 191.67', '`DataFrame'],
                  hint: 'If stuck, revisit Class 11 Statistics nodes c11_stat_cbse_05_002 (mean), c11_stat_cbse_05_005.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' },
                { id: 'b', prompt: 'A DataFrame `df` has columns \'Math\', \'Physics\', \'Chemistry\' with marks of 50 students. You run `df.describe()`.', answer: 'Physics has the most consistent performance',
                  options: ['Physics has the most consistent performance', '`DataFrame'],
                  hint: 'If stuck, revisit Class 11 Statistics nodes c11_stat_cbse_05_002 (mean), c11_stat_cbse_05_005.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' }
          ],
            remediations: { 'dataframe': { steps: ['Revisit the definition of sample vs population standard deviation (Class 11 Statistics node c11_stat_cbse_06_006).', 'Run a tiny Series with known values: `s = pd.Series([1,2,3,4,5])`; compute `s.std()` and `s.std(ddof=0)` to see the.', 'Practice `mode()` on a multimodal Series: `pd.Series([1,1,2,2,3])` and observe the output is a Series with two values.', 'Re-do Diagnostic Questions 2 and 4 with this corrected understanding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Since `describe()` gives count, mean, std, min, 25%, 50%, 75%, max, we don\'t need to call `median()` separately." Is.', answer: '`describe()` includes the 50th percentile',
                  options: ['`describe()` includes the 50th percentile', 'always true', 'never true', '`DataFrame'],
                  hint: 'If stuck, revisit Class 11 Statistics nodes c11_stat_cbse_05_002 (mean), c11_stat_cbse_05_005.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' },
                { id: 'b', prompt: 'Create a small dataset (5-6 values) where the mean, median, and mode are all different.', answer: 'Example: `s = pd.Series([1, 2, 2, 3, 100])`',
                  options: ['Example: `s = pd.Series([1, 2, 2, 3, 100])`', '`DataFrame'],
                  hint: 'If stuck, revisit Class 11 Statistics nodes c11_stat_cbse_05_002 (mean), c11_stat_cbse_05_005.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' }
          ],
            remediations: { 'dataframe': { steps: ['Revisit the definition of sample vs population standard deviation (Class 11 Statistics node c11_stat_cbse_06_006).', 'Run a tiny Series with known values: `s = pd.Series([1,2,3,4,5])`; compute `s.std()` and `s.std(ddof=0)` to see the.', 'Practice `mode()` on a multimodal Series: `pd.Series([1,1,2,2,3])` and observe the output is a Series with two values.', 'Re-do Diagnostic Questions 2 and 4 with this corrected understanding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_009', difficulty: 'standard',
          question: 'Groupby is a Pandas operation that splits a DataFrame into groups based on one.',
          hint: 'If stuck, revisit c12_ip_cbse_02_008 (Descriptive statistics) and practice computing.',
          misconception: 'Students believe that after `df.groupby(\'Category\')[\'Value\'].sum()`, the result is a DataFrame with two columns.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python import pandas as pd df = pd.DataFrame({\'Class\': [\'A\',\'A\',\'B\',\'B\'], \'Marks\': [80,90,70,85]}) result.', answer: 'Correct output: ``` Class A 170 B 155 Name: Marks, dtype: int64 ```',
                  options: ['Correct output: ``` Class A 170 B 155 Name: Marks, dtype: int64 ```', 'groupby preserves the original integer index', 'after `df'],
                  hint: 'If stuck, revisit c12_ip_cbse_02_008 (Descriptive statistics) and practice computing mean/sum on.',
                  misconception: 'Students believe that after `df.groupby(\'Category\')[\'Value\'].sum()`, the result is a DataFrame with two columns: \'Category\' and \'Value\'.' },
                { id: 'b', prompt: 'Explain in your own words what happens when you write `df.groupby(\'Region\')[\'Sales\'].mean()` — describe the three conceptual steps (split, apply, combine) and.', answer: 'Correct explanation: (1) Split',
                  options: ['Correct explanation: (1) Split', 'it calculates the mean of the whole Sales column', 'it returns a DataFrame with Region and Mean_Sales columns', 'after `df'],
                  hint: 'If stuck, revisit c12_ip_cbse_02_008 (Descriptive statistics) and practice computing mean/sum on.',
                  misconception: 'Students believe that after `df.groupby(\'Category\')[\'Value\'].sum()`, the result is a DataFrame with two columns: \'Category\' and \'Value\'.' },
                { id: 'c', prompt: 'Given the DataFrame `df` with columns `[\'City\', \'Product\', \'Units_Sold\']`, write a single statement to get the total units sold for each (City, Product).', answer: 'Correct code: ```python df.groupby([\'City\',',
                  options: ['Correct code: ```python df.groupby([\'City\',', 'after `df'],
                  hint: 'If stuck, revisit c12_ip_cbse_02_008 (Descriptive statistics) and practice computing mean/sum on.',
                  misconception: 'Students believe that after `df.groupby(\'Category\')[\'Value\'].sum()`, the result is a DataFrame with two columns: \'Category\' and \'Value\'.' },
                { id: 'd', prompt: 'Compare the outputs of these two statements on the same DataFrame `df` with columns `[\'Dept\', \'Salary\']`: (A) `df.groupby(\'Dept\')[\'Salary\'].mean()` (B).', answer: '(A) returns a Series with \'Dept\' as index (name=\'Dept\') and dtype float64',
                  options: ['(A) returns a Series with \'Dept\' as index (name=\'Dept\') and dtype float64', 'they are the same', 'after `df'],
                  hint: 'If stuck, revisit c12_ip_cbse_02_008 (Descriptive statistics) and practice computing mean/sum on.',
                  misconception: 'Students believe that after `df.groupby(\'Category\')[\'Value\'].sum()`, the result is a DataFrame with two columns: \'Category\' and \'Value\'.' }
          ],
            remediations: { 'after-df': { steps: ['Have the student run `type(result)` and `result.index.name` to confirm it is a Series with index name \'Category\'.', 'Show `result.reset_index()` and explain that this converts the index into a regular column, yielding a DataFrame with.', 'Give a mini-exercise: "Starting from the Series result, write code to get a DataFrame with columns \'Category\' and.', 'Re-diagnose with a question: "If you need to merge this grouped result with another DataFrame on \'Category\', which form.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_010', difficulty: 'standard',
          question: 'Filtering a DataFrame selects rows that satisfy one or more logical conditions.',
          hint: 'Review `c12_ip_cbse_02_003` (Boolean indexing examples) and practice writing masks for.',
          misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Filtering a DataFrame selects rows that satisfy one or more logical conditions on column',
                  options: ['Filtering a DataFrame selects rows that satisfy one or more logical conditions on column', 'A Pandas Series is a one-dimensional labeled array capable of holding any data type', 'A Pandas DataFrame is a two-dimensional, size-mutable, heterogeneous tabular data', '**loc** is a label-based indexer for DataFrame that selects rows and columns by their'],
                  hint: 'Review `c12_ip_cbse_02_003` (Boolean indexing examples) and practice writing masks for single and.',
                  misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas methods have an `inplace`.' }
          ],
            remediations: { 'df': { steps: ['Revisit `c12_ip_cbse_02_003` (Indexing and slicing with loc/iloc) to reinforce that `loc[]` with a Boolean mask returns.', 'Practice the pattern `df = df.sort_values(...)` or `sorted_df = df.sort_values(...)` in a notebook, printing `df`.', 'Use `df.copy()` explicitly when an in‑place modification is intended, and compare memory addresses with `id()`.', 'Re‑attempt Diagnostic Question 3 and 6 after this exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_011', difficulty: 'standard',
          question: 'Exporting a pandas DataFrame to external storage formats using the `to_csv()`.',
          hint: 'Revisit `c12_ip_cbse_02_002` (DataFrame creation) and `c12_ip_cbse_02_004` (importing).',
          misconception: 'Students believe `to_excel` works without installing `openpyxl` (or `xlwt` for .xls) because `to_csv` needs no extra.',
          parts: [
                { id: 'a', prompt: 'A student writes `df.to_csv(\'data.csv\', sep=\'|\', index=False)` but finds the file opens in Excel with all data in column A.', answer: 'Excel\'s default CSV parser expects a comma separator',
                  options: ['Excel\'s default CSV parser expects a comma separator', 'pandas wrote it wrong'],
                  hint: 'Revisit `c12_ip_cbse_02_002` (DataFrame creation) and `c12_ip_cbse_02_004` (importing) to see how.',
                  misconception: 'Students believe `to_excel` works without installing `openpyxl` (or `xlwt` for .xls) because `to_csv` needs no extra package.' },
                { id: 'b', prompt: 'Compare the memory and performance implications of exporting a 10,000-row DataFrame to CSV vs Excel (.xlsx).', answer: 'CSV is plain text, smaller on disk, faster to write/read, and human-readable',
                  options: ['CSV is plain text, smaller on disk, faster to write/read, and human-readable', 'Excel is better because it\'s binary'],
                  hint: 'Revisit `c12_ip_cbse_02_002` (DataFrame creation) and `c12_ip_cbse_02_004` (importing) to see how.',
                  misconception: 'Students believe `to_excel` works without installing `openpyxl` (or `xlwt` for .xls) because `to_csv` needs no extra package.' }
          ],
            remediations: { 'to-excel-works-without-installing': { steps: ['Revisit `c12_ip_cbse_02_004` (Importing data) to see the symmetry: `read_csv` has `sep`, `header`, `index_col`.', 'Practice writing three files: (a) default CSV, (b) CSV with `index=False, sep=\';\'`, (c) Excel with `sheet_name=\'Data\'.', 'Open each in Notepad and Excel to see the raw text/XML.', 'Re-attempt Diagnostic Questions 2 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_012', difficulty: 'standard',
          question: 'Plotting from Pandas refers to using the built-in `.plot()` method on Series.',
          hint: 'Revisit c12_ip_cbse_02_004 (read_csv) and c11_ip_cbse_08_003 (plt.plot basics).',
          misconception: 'Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they write.',
          parts: [
                { id: 'a', prompt: 'What is the default value of the `kind` parameter in `Series.plot()` and `DataFrame.plot()`?', answer: 'The default `kind` is `\'line\'` for both Series and DataFrame',
                  options: ['The default `kind` is `\'line\'` for both Series and DataFrame', 'Pandas is only for data manipulation and matplotlib is only for plotting'],
                  hint: 'Revisit c12_ip_cbse_02_004 (read_csv) and c11_ip_cbse_08_003 (plt.plot basics).',
                  misconception: 'Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they write `plt.plot(df[\'Month\'], df[\'Sales\'])`.' }
          ],
            remediations: { 'pandas-is-only-for-data': { steps: ['Revisit `c11_ip_cbse_08_003` (line charts) and `c11_ip_cbse_08_004` (bar charts) — run the exact examples to recall.', 'Create a minimal Series: `s = pd.Series([10,20,15,30], index=[\'Jan\',\'Feb\',\'Mar\',\'Apr\'])`.', 'Call `s.plot()` — observe default line plot with index as x-axis.', 'Call `s.plot(kind=\'bar\')` — observe bar chart with index labels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
