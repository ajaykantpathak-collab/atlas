import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch02_p1: SimDef = {
    id: 'v3_c12_ip_ch02_p1',
    title: 'Data Handling Using Pandas · Part 1/2',
    subtitle: 'The dictionary\'s keys became the address book',
    classLevel: 12, subject: 'informatics_practices', topic: 'Data Handling Using Pandas · Part 1/2',
    chapters: ['c12_ip_ch02'],
    nodeIds: ['c12_ip_cbse_02_001', 'c12_ip_cbse_02_002', 'c12_ip_cbse_02_003', 'c12_ip_cbse_02_004', 'c12_ip_cbse_02_005', 'c12_ip_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Data-frame builder', intro: 'A week\'s temperatures become answerable questions the moment each value gets a label.', goal: 'Create Pandas Series from lists, arrays and dicts — and predict the index each way.' },
    discovery: {
        question: 'You hand pandas a dictionary of monthly sales — and the months become the index without being asked. Where did the labels come from?',
        options: ['The keys — a dict\'s keys become the Series index in insertion order, values become data; no index argument means pandas builds 0,1,2... only when nothing else provides labels', 'The values did', 'Alphabetical order', 'Random order'],
        answer: 'The keys — a dict\'s keys become the Series index in insertion order, values become data; no index argument means pandas builds 0,1,2... only when nothing else provides labels',
        hook: 'List or NumPy array — same default RangeIndex; the source container doesn\'t matter. And \'sales[1]\' works but \'sales[\'Feb\']\' is the point: labels are addresses you chose, not positions you memorised.',
    },
    teaching: [
        { title: 'Pandas Series: creation from lists, arrays, and dictionaries', text: 'A Pandas Series is a one-dimensional labeled array capable of holding any data type (integers, floats, strings, Python objects, etc.) where each element is associated with an index (label) that can.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build Series three ways — list, array, dict — predict each index before printing, and catch the case where a custom index asks for a label the data never had.',
        labels: ['Pandas Series: creation from', 'Pandas DataFrame: creation', 'Indexing and slicing DataFrames', 'Importing data: read_csv', 'Head, tail, and shape', 'Handling missing data: isnull,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_001', title: 'Pandas Series: creation from lists, arrays, and dictionaries',
          caseStudy: { intro: 'Imagine you have a list of daily temperatures for a week: `[32, 34, 31, 33, 35, 36, 34]`.',
            decisions: [{ prompt: 'What is the default index of a Pandas Series created from a list of 5 elements if no explicit `index` argument is provided?', options: [
                { text: 'The default index is a `RangeIndex` starting at 0 and ending at 4 (i.e., `[0, 1, 2, 3,', outcome: 'The default index is a `RangeIndex` starting at 0 and ending at 4 (i.e., `[0, 1, 2, 3, 4]`).' },
                { text: '1 to 5', outcome: 'Not quite — Students often believe that **when a Series is created from a dictionary, the resulting Series.', reveals: 'when-a-series-is-created' },
                { text: 'no index', outcome: 'Not quite — Students often believe that **when a Series is created from a dictionary, the resulting Series.', reveals: 'when-a-series-is-created' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_002', title: 'Pandas DataFrame: creation and structure of labelled 2D data',
          caseStudy: { intro: 'Imagine you have the marks of five students in three subjects stored in a Python dictionary where keys are subject names and values are lists of marks.',
            decisions: [{ prompt: 'What is the default row index of a DataFrame created from a dictionary of lists like `pd.DataFrame({\'A\': [1,2], \'B\': [3,4]})` if.', options: [
                { text: 'The default row index is a RangeIndex starting at 0: `RangeIndex(start=0, stop=2, step=1)`', outcome: 'The default row index is a RangeIndex starting at 0: `RangeIndex(start=0, stop=2, step=1)`.' },
                { text: 'the dictionary keys become the row index', outcome: 'Not quite — **Misconception**: "When creating a DataFrame from a dictionary, the keys become row labels." **Why.', reveals: 'misconception-when-creating-a-dataframe' },
                { text: 'When creating a DataFrame from a dictionary, the keys become row labels', outcome: 'Not quite — **Misconception**: "When creating a DataFrame from a dictionary, the keys become row labels." **Why.', reveals: 'misconception-when-creating-a-dataframe' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_003', title: 'Indexing and slicing DataFrames with loc and iloc',
          caseStudy: { intro: 'Imagine you are the class teacher with a marks DataFrame where rows are labelled by student *names* (not roll numbers) and columns are subject names.',
            decisions: [{ prompt: 'What is the output of `df.loc[\'Delhi\']` if `df` is a DataFrame with row index `[\'Assam\',\'Delhi\',\'Kerala\']` and columns.', options: [
                { text: 'It returns a **Series** containing the row for \'Delhi\' with index = column labels', outcome: 'It returns a **Series** containing the row for \'Delhi\' with index = column labels.' },
                { text: 'a DataFrame', outcome: 'Not quite — **Misconception:** "When row indices are integers 0,1,2,..., `loc` and `iloc` behave identically.".', reveals: 'misconception-when-row-indices-are' },
                { text: 'KeyError', outcome: 'Not quite — **Misconception:** "When row indices are integers 0,1,2,..., `loc` and `iloc` behave identically.".', reveals: 'misconception-when-row-indices-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_004', title: 'Importing data: read_csv and read_excel into DataFrames',
          caseStudy: { intro: 'Imagine you have a CSV file named "student_marks.csv" on your computer containing roll numbers, names, and marks of 50 students — how do you get this data into.',
            decisions: [{ prompt: 'What is the default value of the `sep` parameter in `pd.read_csv()`, and what does it imply about the file format?', options: [
                { text: 'The default value of `sep` is a comma (`,`)', outcome: 'The default value of `sep` is a comma (`,`), which implies the file is a standard CSV where values.' },
                { text: 'data.xlsx', outcome: 'Not quite — Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write.', reveals: 'read-csv-and-read-excel' },
                { text: 'data.csv', outcome: 'Not quite — Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write.', reveals: 'read-csv-and-read-excel' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_005', title: 'Head, tail, and shape: inspecting DataFrame contents',
          caseStudy: { intro: 'Imagine you just downloaded a CSV of 10,000 rows of Delhi metro ridership data. Before cleaning or analyzing, you need to know: how many rows and columns?',
            decisions: [{ prompt: 'What is the default number of rows displayed by `df.head()` and `df.tail()` if no argument is provided?', options: [
                { text: 'Both `df.head()` and `df.tail()` display 5 rows by default', outcome: 'Both `df.head()` and `df.tail()` display 5 rows by default. A wrong answer (e.g., 10, all rows,.' },
                { text: 'what will be the output of `df.head()`?', outcome: 'Not quite — Students think `head()` and `tail()` **modify** the DataFrame (like sorting) because they see.', reveals: 'head-and-tail-modify-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_006', title: 'Handling missing data: isnull, dropna, and fillna',
          caseStudy: { intro: 'Imagine you downloaded a CSV of Class 12 board exam results from your school portal, but some students were absent for Maths and their marks appear as empty.',
            decisions: [{ prompt: 'What does `df.isnull().sum()` return when applied to a DataFrame with 3 columns and 5 rows where column \'A\' has 2 NaN, column \'B\' has 0.', options: [
                { text: 'It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]', outcome: 'It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5] — the count of missing values.' },
                { text: 'True/False', outcome: 'Not quite — Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.', reveals: 'fillna-0-is-a-universal' },
                { text: '`fillna(0)` is a universal "safe" fix for missing numeric data', outcome: 'Not quite — Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.', reveals: 'fillna-0-is-a-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate loads exam marks as a dictionary {\'Maths\': [...], \'Physics\': [...]} into a DataFrame, then panics: \'pandas put the subjects as columns — my student names were supposed to be columns and it made numbered rows instead.\'',
            decisions: [{ prompt: 'What did the constructor actually do?', options: [
                { text: 'Exactly what dict-of-lists means — keys become column labels and rows get a default 0..n index; his student names were never in the input, so the table is correctly shaped — subjects as columns, anonymous numbered rows — and the fix is supplying an index, not blaming pandas.', outcome: 'The chapter\'s orientation rule: input structure maps to output labels — dict keys are always columns; rows need an explicit index to carry names.' },
                { text: 'He\'s right that pandas guessed wrong — it should know names are rows.', outcome: 'Nothing was guessed: the input contained only subject lists, so the RangeIndex is the default, not an error — expecting names that were never passed in is the actual bug.', reveals: 'pandas-guesses-intent' },
                { text: 'Transpose the DataFrame — .T will fix the orientation permanently.', outcome: 'Transpose flips subjects to rows, but the student names still don\'t exist anywhere in the data — you can\'t pivot in labels that were never loaded.', reveals: 'transpose-adds-labels' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a Series as labelled data — where the index is an address book, not a row number.',
            decisions: [{ prompt: 'What comes next? Data Handling Using Pandas · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Handling Using Pandas · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_001', difficulty: 'standard',
          question: 'A Pandas Series is a one-dimensional labeled array capable of holding any data.',
          hint: 'If stuck, revisit **dictionary key-value access** (c11_ip_cbse_04_009) and **list.',
          misconception: 'Students often believe that **when a Series is created from a dictionary, the resulting Series keeps the dictionary\'s.',
          parts: [
                { id: 'a', prompt: 'Compare the index of a Series created from a NumPy array `np.array([10,20,30])` with the index of a Series created from a list `[10,20,30]`.', answer: 'Yes, they are identical: both get a default `RangeIndex(0, 3)`',
                  options: ['Yes, they are identical: both get a default `RangeIndex(0, 3)`', 'the array keeps its own index', 'the list gets string indices'],
                  hint: 'If stuck, revisit **dictionary key-value access** (c11_ip_cbse_04_009) and **list indexing**.',
                  misconception: 'Students often believe that **when a Series is created from a dictionary, the resulting Series keeps the dictionary\'s key-value order.' }
          ],
            remediations: { 'when-a-series-is-created': { steps: ['Revisit the dictionary creation example in NCERT §2.2.1(C) and run the exact code: `dict1 = {\'India\': \'NewDelhi\', \'UK\'.', 'Then deliberately add an `index` argument with an extra label: `pd.Series(dict1, index=[\'India\',\'UK\',\'Japan\',\'USA\'])`.', 'Print and note the `NaN` for USA.', 'Now provide an index that **omits** a dictionary key: `pd.Series(dict1, index=[\'India\',\'UK\'])`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_002', difficulty: 'standard',
          question: 'A Pandas DataFrame is a two-dimensional, size-mutable, heterogeneous tabular.',
          hint: 'If stuck, revisit **c11_ip_cbse_04_009** (Dictionary Operations) and.',
          misconception: '**Misconception**: "When creating a DataFrame from a dictionary, the keys become row labels." **Why it happens**.',
          parts: [
                { id: 'a', prompt: 'Explain why `pd.DataFrame([{\'a\': 1, \'b\': 2}, {\'a\': 3, \'c\': 4}])` produces a DataFrame with three columns (a, b, c) and two rows, with NaN in the (1, \'b\') and.', answer: 'Each dictionary becomes a row',
                  options: ['Each dictionary becomes a row', 'it raises an error', 'When creating a DataFrame from a dictionary, the keys become row labels', 'row index is [\'Name\', \'Age\']'],
                  hint: 'If stuck, revisit **c11_ip_cbse_04_009** (Dictionary Operations) and **c11_ip_cbse_04_001** (List.',
                  misconception: '**Misconception**: "When creating a DataFrame from a dictionary, the keys become row labels." **Why it happens**: Students confuse.' }
          ],
            remediations: { 'misconception-when-creating-a-dataframe': { steps: ['Revisit **c12_ip_cbse_02_001** (Pandas Series) to reinforce that a DataFrame is a collection of Series sharing an index.', 'Draw a 2×3 table on paper: label columns (keys) and rows (0,1).', 'Map each creation method to this visual.', 'Run this re-diagnostic in a notebook: create `df = pd.DataFrame({\'X\':[1,2], \'Y\':[3,4]})`; print `df.index`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_003', difficulty: 'standard',
          question: '**loc** is a label-based indexer for DataFrame that selects rows and columns.',
          hint: 'Revisit **c12_ip_cbse_02_002** — create a DataFrame with `index=[\'X\',\'Y\',\'Z\']` and.',
          misconception: '**Misconception:** "When row indices are integers 0,1,2,..., `loc` and `iloc` behave identically." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why `df.loc[0:2]` and `df.iloc[0:2]` give different results when the DataFrame\'s row index is `[\'X\',\'Y\',\'Z\']`.', answer: '`df.loc[0:2]` looks for **row labels** 0,1,2',
                  options: ['`df.loc[0:2]` looks for **row labels** 0,1,2', 'both give first two rows'],
                  hint: 'Revisit **c12_ip_cbse_02_002** — create a DataFrame with `index=[\'X\',\'Y\',\'Z\']` and.',
                  misconception: '**Misconception:** "When row indices are integers 0,1,2,..., `loc` and `iloc` behave identically." **Why it\'s wrong:** They *coincide* only.' }
          ],
            remediations: { 'misconception-when-row-indices-are': { steps: ['Revisit **c12_ip_cbse_02_002** (DataFrame creation) and create three DataFrames: (a) default index, (b) string index.', 'For each, run `df.loc[0]`, `df.iloc[0]`, `df.loc[0:1]`, `df.iloc[0:1]` and tabulate outputs.', 'Write a one-line rule: "`loc` uses **index labels** (inclusive slice), `iloc` uses **Python positions** (half-open.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_004', difficulty: 'standard',
          question: 'The `read_csv()` and `read_excel()` functions in Pandas are used to import.',
          hint: 'Revisit Class 11 node `c11_ip_cbse_06_009` (Introduction to CSV Files) and.',
          misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write.',
          parts: [
                { id: 'a', prompt: 'What is the default value of the `sep` parameter in `pd.read_csv()`, and what does it imply about the file format?', answer: 'The default value of `sep` is a comma (`,`)',
                  options: ['The default value of `sep` is a comma (`,`)', 'data.xlsx', 'data.csv', '`read_csv` and `read_excel` are interchangeable for any tabular file'],
                  hint: 'Revisit Class 11 node `c11_ip_cbse_06_009` (Introduction to CSV Files) and `c11_ip_cbse_06_010`.',
                  misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write `pd.read_csv("data.xlsx")`.' }
          ],
            remediations: { 'read-csv-and-read-excel': { steps: ['Have the student create two files: `test.csv` (comma-separated, with header) and `test.xlsx` (same data, Excel format).', 'Ask them to run `pd.read_csv("test.xlsx")` and observe the `ValueError: Excel file format cannot be determined`.', 'Then run `pd.read_excel("test.csv")` and observe `FileNotFoundError` or garbage output.', 'Explain: CSV = plain text → `read_csv`; Excel = binary workbook → `read_excel` + engine.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write.',
          parts: [
                { id: 'a', prompt: 'A student writes `df = pd.read_excel("marks.xlsx")` but gets a `ModuleNotFoundError: No module named \'openpyxl\'`.', answer: 'This is an environment issue, not a code logic error',
                  options: ['This is an environment issue, not a code logic error', 'change to read_csv', 'import openpyxl in code', 'data.xlsx'],
                  hint: 'Revisit Class 11 node `c11_ip_cbse_06_009` (Introduction to CSV Files) and `c11_ip_cbse_06_010`.',
                  misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write `pd.read_csv("data.xlsx")`.' }
          ],
            remediations: { 'read-csv-and-read-excel': { steps: ['Have the student create two files: `test.csv` (comma-separated, with header) and `test.xlsx` (same data, Excel format).', 'Ask them to run `pd.read_csv("test.xlsx")` and observe the `ValueError: Excel file format cannot be determined`.', 'Then run `pd.read_excel("test.csv")` and observe `FileNotFoundError` or garbage output.', 'Explain: CSV = plain text → `read_csv`; Excel = binary workbook → `read_excel` + engine.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_005', difficulty: 'standard',
          question: 'The `head(n)`, `tail(n)`, and `shape` attributes/methods in Pandas provide.',
          hint: 'If stuck, revisit `c12_ip_cbse_02_002` (DataFrame creation) and `c12_ip_cbse_02_004`.',
          misconception: 'Students think `head()` and `tail()` **modify** the DataFrame (like sorting) because they see a different set of rows.',
          parts: [
                { id: 'a', prompt: 'What is the default number of rows displayed by `df.head()` and `df.tail()` if no argument is provided?', answer: 'Both `df.head()` and `df.tail()` display 5 rows by default',
                  options: ['Both `df.head()` and `df.tail()` display 5 rows by default', 'what will be the output of `df.head()`?'],
                  hint: 'If stuck, revisit `c12_ip_cbse_02_002` (DataFrame creation) and `c12_ip_cbse_02_004` (reading CSV).',
                  misconception: 'Students think `head()` and `tail()` **modify** the DataFrame (like sorting) because they see a different set of rows each time.' }
          ],
            remediations: { 'head-and-tail-modify-the': { steps: ['Revisit `c12_ip_cbse_02_002` (DataFrame creation) to reinforce that DataFrames are immutable unless explicitly.', 'Practice in a notebook: create a DataFrame, run `head()`, `tail()`, `shape`, then check `df.shape` again — confirm it’s.', 'Write a one-line summary: "`head`/`tail` = peek (return new object); `shape` = measure (return tuple)." 4.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_006', difficulty: 'standard',
          question: 'Missing data handling in Pandas refers to the systematic detection, removal,.',
          hint: 'If confused about `axis` in `dropna`, revisit `c12_ip_cbse_02_003` (loc/iloc row.',
          misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.',
          parts: [
                { id: 'a', prompt: 'What does `df.isnull().sum()` return when applied to a DataFrame with 3 columns and 5 rows where column \'A\' has 2 NaN, column \'B\' has 0 NaN, and column \'C\' has.', answer: 'It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]',
                  options: ['It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]', 'True/False', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
                  hint: 'If confused about `axis` in `dropna`, revisit `c12_ip_cbse_02_003` (loc/iloc row vs column.',
                  misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.' },
                { id: 'b', prompt: 'Compare `df.dropna(thresh=3)` and `df.dropna(axis=1, thresh=3)` on a DataFrame with 5 rows and 4 columns.', answer: '`thresh=3` with default `axis=0` keeps rows having **at least 3 non-NaN values**',
                  options: ['`thresh=3` with default `axis=0` keeps rows having **at least 3 non-NaN values**', 'they always give same output', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
                  hint: 'If confused about `axis` in `dropna`, revisit `c12_ip_cbse_02_003` (loc/iloc row vs column.',
                  misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.' }
          ],
            remediations: { 'fillna-0-is-a-universal': { steps: ['Revisit `c12_ip_cbse_02_005` (head/tail/shape) to inspect DataFrames before/after `fillna` and verify row counts match.', 'Create a 5×3 DataFrame with deliberate NaN patterns: one column all NaN, one row all NaN, scattered NaN.', 'Run `isnull().sum()`, `dropna(thresh=2)`, `fillna(method=\'ffill\')`, `fillna(df.median())` and **print each result**.', 'Re-diagnostic: Given `df = pd.DataFrame({\'A\':[1,np.nan,3], \'B\':[np.nan,5,np.nan]})`, predict `df.fillna({\'A\':0.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
