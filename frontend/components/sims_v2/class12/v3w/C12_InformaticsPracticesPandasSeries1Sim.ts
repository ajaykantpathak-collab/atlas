import type { SimDef } from '../../engine/types';
import C12_InformaticsPracticesPandasSeries1Sim from '../../../simulations/c6_12/C12_InformaticsPracticesPandasSeries1Sim';

/** v3 wrapped master — C12_InformaticsPracticesPandasSeries1Sim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_informaticspracticespandasseries1sim: SimDef = {
    id: 'v3w_c12_informaticspracticespandasseries1sim',
    title: 'Informatics Practices Pandas Series1',
    subtitle: 'This node covers detection (`isnull`, `notnull`), removal (`dropna` with parameters.',
    classLevel: 12, subject: 'science', topic: 'Handling missing data: isnull, dropna, and fillna',
    chapters: [],
    nodeIds: ['c12_ip_cbse_02_006', 'c12_ip_cbse_02_010', 'c12_ip_cbse_02_012', 'c12_ip_cbse_02_002', 'c12_ip_cbse_02_008', 'c12_ip_cbse_02_004', 'c12_ip_cbse_02_007', 'c12_ip_cbse_02_001', 'c12_ip_cbse_02_005', 'c12_ip_cbse_02_009', 'c12_ip_cbse_02_011', 'c12_ip_cbse_02_003', 'c12_ip_cbse_03_001', 'c12_ip_cbse_05_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you downloaded a CSV of Class 12 board exam results from your school portal, but some students were.', goal: 'Master Informatics Practices Pandas Series1.' },
    discovery: {
        question: 'What does `df.isnull().sum()` return when applied to a DataFrame with 3 columns and 5 rows where column \'A\' has 2 NaN, column \'B\' has 0 NaN, and column \'C\' has.',
        options: ['It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]', 'True/False', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
        answer: 'It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]',
        hook: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.',
    },
    teaching: [
        { title: 'Missing data handling in Pandas refers to.', text: 'Missing data handling in Pandas refers to the systematic detection, removal, or replacement of `NaN` (Not a Number) values in Series and DataFrames using three core methods: `isnull()` identifies.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_006', title: 'Missing data handling in Pandas refers.',
          scaffold: { problem: 'A school\'s Class 12 term-1 marks CSV has 40 students and 5 subjects (English, Physics, Chemistry, Maths, CS).',
            steps: [
            { text: 'Import pandas and load CSV: `df = pd.read_csv(\'term1_marks.csv\')` — verify shape (40, 5) and dtypes (subjects as.' },
            { text: 'Detect missing values: `missing_counts = df.isnull().sum()` — expect Physics: 3, Maths: 2, others: 0. Print to confirm.' },
            { text: 'Drop rows where both Physics and Maths are NaN: `df = df.dropna(subset=[\'Physics\', \'Maths\'], how=\'all\')` — `how=\'all\'`.' },
            { text: 'Compute subject medians on remaining data: `phy_median = df[\'Physics\'].median()`, `maths_median = df[\'Maths\'].median()`.' },
            { text: 'Fill column-specific NaN: `df[\'Physics\'] = df[\'Physics\'].fillna(phy_median)`, `df[\'Maths\'] =.' },
            { text: 'Export cleaned data: `df.to_csv(\'cleaned_marks.csv\', index=False)` — `index=False` prevents writing row numbers 0-38 as.' },
            { text: 'Validate: Reload `cleaned_marks.csv`, check shape, `isnull().sum()`, and that subject medians match Step 4.', faded: true, blankAnswer: 'Cleaned DataFrame with 0 missing values, shape (38-40, 5),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_010', title: 'Filtering a DataFrame selects rows that.',
          scaffold: { problem: 'A school DataFrame `students` has columns: \'Name\', \'Class\', \'Math\', \'Science\', \'English\'.',
            steps: [
            { text: 'Load or create the DataFrame `students` with the given columns.' },
            { text: 'Build a Boolean mask for Class 12: `mask_class = students[\'Class\'] == 12`.' },
            { text: 'Build masks for Math > 85 and Science > 85: `mask_math = students[\'Math\'] > 85`, `mask_sci = students[\'Science\'] > 85`.' },
            { text: 'Combine masks with `&` (AND): `final_mask = mask_class & mask_math & mask_sci`.' },
            { text: 'Apply mask and select required columns: `filtered = students.loc[final_mask, [\'Name\', \'Math\', \'Science\']]`.' },
            { text: 'Sort by Science descending: `result = filtered.sort_values(\'Science\', ascending=False)`.' },
            { text: 'Display `result`.', faded: true, blankAnswer: 'A DataFrame showing Names, Math, Science marks of Class 12.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_012', title: 'Plotting from Pandas refers to using.',
          scaffold: { problem: 'Load monthly temperature data (in °C) for Delhi from a CSV file `delhi_temp.csv` with columns `Month` (Jan-Dec) and `Temperature`.',
            steps: [
            { text: 'Import pandas as pd and matplotlib.pyplot as plt' },
            { text: 'Read CSV into DataFrame: `df = pd.read_csv(\'delhi_temp.csv\')` and verify with `df.head()`' },
            { text: 'Call Pandas plot method: `ax = df.plot(kind=\'line\', x=\'Month\', y=\'Temperature\', figsize=(10,6), marker=\'o\', grid=True)`' },
            { text: 'Customize using returned axes: `ax.set_title(\'Delhi Monthly Temperature Trend 2023\')`, `ax.set_xlabel(\'Month\')`,.' },
            { text: 'Save and display: `plt.tight_layout()`, `plt.savefig(\'temp_trend.png\', dpi=300)`, `plt.show()`', faded: true, blankAnswer: 'A line plot with 12 points (Jan-Dec) connected by lines,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_002', title: 'A Pandas DataFrame is a.',
          scaffold: { problem: 'A school stores student marks in three separate lists: `names = [\'Arnav\', \'Diya\', \'Karan\']`, `maths = [85, 92, 78]`, `science = [90, 88,.',
            steps: [
            { text: 'Import pandas and create a dictionary mapping column names to the lists: `data = {\'Name\': names, \'Maths\': maths,.' },
            { text: 'Call `pd.DataFrame(data, index=[\'S1\',\'S2\',\'S3\'])` — the `index` parameter sets row labels explicitly.' },
            { text: 'Inspect structure: `df.shape` returns (3,3), `df.dtypes` shows Name:object, Maths:int64, Science:int64.' },
            { text: 'Compute transpose: `df.T` swaps rows and columns; new shape is (3,3) but index becomes [\'Name\',\'Maths\',\'Science\'] and.' },
            { text: 'Verify that `df.loc[\'S2\', \'Maths\']` returns 92 and `df.T.loc[\'Maths\', \'S2\']` returns the same value — confirming.', faded: true, blankAnswer: 'DataFrame with 3 rows (S1-S3) and 3 columns (Name, Maths,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_008', title: 'Descriptive statistics in Pandas refer.',
          scaffold: { problem: 'A teacher has the following marks (out of 100) for 10 students in a Class 12 IP test: [78, 85, 92, 78, 88, 95, 70, 82, 78, 90].',
            steps: [
            { text: 'Import pandas and create the Series `marks = pd.Series([78, 85, 92, 78, 88, 95, 70, 82, 78, 90])`.' },
            { text: 'Compute mean using `marks.mean()` → 83.6. This is the average mark.' },
            { text: 'Compute median using `marks.median()` → 83.5. Since n=10 (even), median is average of 5th and 6th sorted values (82 and.' },
            { text: 'Compute mode using `marks.mode()` → returns a Series with value 78 (appears 3 times).' },
            { text: 'Compute standard deviation using `marks.std()` → ≈ 7.72. This measures spread; default ddof=1 (sample std).' },
            { text: 'Compute full summary using `marks.describe()` → gives count, mean, std, min, 25%, 50%, 75%, max.' },
            { text: 'Interpretation: Mean (83.6) and median (83.5) are close → symmetric distribution.', faded: true, blankAnswer: 'mean=83.6, median=83.5, mode=78 (as Series), std≈7.72,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_02_004', title: 'The `read_csv()` and `read_excel()`.',
          scaffold: { problem: 'A school stores student records in "students.csv" at "C:/Data/students.csv" with columns: AdmNo, Name, Class, Section, Marks.',
            steps: [
            { text: 'Import pandas library with standard alias `pd`.' },
            { text: 'Use `pd.read_csv()` with the full file path as string argument.' },
            { text: 'Assign the returned DataFrame to variable `df`.' },
            { text: 'Use `df.head(3)` to display the first 3 rows for verification.' },
            { text: 'Confirm output shows columns AdmNo, Name, Class, Section, Marks with correct data alignment.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'dissect', nodeId: 'c12_ip_cbse_02_010', title: 'Identify each idea',
          dissect: { specimen: 'Informatics Practices Pandas Series1', spots: [
            { id: 's1', label: 'Missing data handling in Pandas', prompt: 'Which idea is this? — Missing data handling in Pandas refers to the systematic detection, removal, or.', answer: 'Missing data handling in Pandas', options: ['Missing data handling in Pandas', 'Filtering a DataFrame selects rows', 'Plotting from Pandas refers to', 'A Pandas DataFrame is a'] },
            { id: 's2', label: 'Filtering a DataFrame selects rows', prompt: 'Which idea is this? — Filtering a DataFrame selects rows that satisfy one or more logical conditions on column.', answer: 'Filtering a DataFrame selects rows', options: ['Filtering a DataFrame selects rows', 'Missing data handling in Pandas', 'Plotting from Pandas refers to', 'A Pandas DataFrame is a'] },
            { id: 's3', label: 'Plotting from Pandas refers to', prompt: 'Which idea is this? — Plotting from Pandas refers to using the built-in `.plot()` method on Series and.', answer: 'Plotting from Pandas refers to', options: ['Plotting from Pandas refers to', 'Missing data handling in Pandas', 'Filtering a DataFrame selects rows', 'A Pandas DataFrame is a'] },
            { id: 's4', label: 'A Pandas DataFrame is a', prompt: 'Which idea is this? — A Pandas DataFrame is a two-dimensional, size-mutable, heterogeneous tabular data.', answer: 'A Pandas DataFrame is a', options: ['A Pandas DataFrame is a', 'Missing data handling in Pandas', 'Filtering a DataFrame selects rows', 'Plotting from Pandas refers to'] },
            { id: 's5', label: 'Descriptive statistics in Pandas refer', prompt: 'Which idea is this? — Descriptive statistics in Pandas refer to built-in methods (mean(), median(), mode(),.', answer: 'Descriptive statistics in Pandas refer', options: ['Descriptive statistics in Pandas refer', 'Missing data handling in Pandas', 'Filtering a DataFrame selects rows', 'Plotting from Pandas refers to'] },
            { id: 's6', label: 'The read_csv and read_excel functions', prompt: 'Which idea is this? — The `read_csv()` and `read_excel()` functions in Pandas are used to import tabular data.', answer: 'The read_csv and read_excel functions', options: ['The read_csv and read_excel functions', 'Missing data handling in Pandas', 'Filtering a DataFrame selects rows', 'Plotting from Pandas refers to'] }
          ] } }
    ],
    explore: { component: C12_InformaticsPracticesPandasSeries1Sim, prompt: 'Explore the interactive — Informatics Practices Pandas Series1' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_006', difficulty: 'standard',
          question: 'Missing data handling in Pandas refers to the systematic detection, removal, or.',
          hint: 'If confused about `axis` in `dropna`, revisit `c12_ip_cbse_02_003` (loc/iloc row vs.',
          misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.',
          parts: [
                { id: 'a', prompt: 'What does `df.isnull().sum()` return when applied to a DataFrame with 3 columns and 5 rows where column \'A\' has 2 NaN, column \'B\' has 0 NaN, and column \'C\' has.', answer: 'It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]',
                  options: ['It returns a Series with index [\'A\', \'B\', \'C\'] and values [2, 0, 5]', 'True/False', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.' },
                { id: 'b', prompt: 'Compare `df.dropna(thresh=3)` and `df.dropna(axis=1, thresh=3)` on a DataFrame with 5 rows and 4 columns.', answer: '`thresh=3` with default `axis=0` keeps rows having **at least 3 non-NaN values**',
                  options: ['`thresh=3` with default `axis=0` keeps rows having **at least 3 non-NaN values**', 'they always give same output', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.' }
          ],
            remediations: { 'fillna-0-is-a-universal': { steps: ['Revisit `c12_ip_cbse_02_005` (head/tail/shape) to inspect DataFrames before/after `fillna` and verify row counts match.', 'Create a 5×3 DataFrame with deliberate NaN patterns: one column all NaN, one row all NaN, scattered NaN.', 'Run `isnull().sum()`, `dropna(thresh=2)`, `fillna(method=\'ffill\')`, `fillna(df.median())` and **print each result**.', 'Re-diagnostic: Given `df = pd.DataFrame({\'A\':[1,np.nan,3], \'B\':[np.nan,5,np.nan]})`, predict `df.fillna({\'A\':0,.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.',
          parts: [
                { id: 'a', prompt: 'A dataset records daily temperature (in °C) for 30 days. Day 15 and 16 are missing due to sensor failure.', answer: '`ffill` (forward fill) propagates Day 14\'s temperature to Day 15 and 16',
                  options: ['`ffill` (forward fill) propagates Day 14\'s temperature to Day 15 and 16', 'ffill is fine because it\'s time-series', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.' },
                { id: 'b', prompt: 'Compare `df.dropna(thresh=3)` and `df.dropna(axis=1, thresh=3)` on a DataFrame with 5 rows and 4 columns.', answer: '`thresh=3` with default `axis=0` keeps rows having **at least 3 non-NaN values**',
                  options: ['`thresh=3` with default `axis=0` keeps rows having **at least 3 non-NaN values**', 'they always give same output', '`fillna(0)` is a universal "safe" fix for missing numeric data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `fillna(0)` is a universal "safe" fix for missing numeric data.' }
          ],
            remediations: { 'fillna-0-is-a-universal': { steps: ['Revisit `c12_ip_cbse_02_005` (head/tail/shape) to inspect DataFrames before/after `fillna` and verify row counts match.', 'Create a 5×3 DataFrame with deliberate NaN patterns: one column all NaN, one row all NaN, scattered NaN.', 'Run `isnull().sum()`, `dropna(thresh=2)`, `fillna(method=\'ffill\')`, `fillna(df.median())` and **print each result**.', 'Re-diagnostic: Given `df = pd.DataFrame({\'A\':[1,np.nan,3], \'B\':[np.nan,5,np.nan]})`, predict `df.fillna({\'A\':0,.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_010', difficulty: 'standard',
          question: 'Filtering a DataFrame selects rows that satisfy one or more logical conditions.',
          hint: 'Review `c12_ip_cbse_02_003` (Boolean indexing examples) and practice writing masks for.',
          misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Filtering a DataFrame selects rows that satisfy one or more logical conditions on column',
                  options: ['Filtering a DataFrame selects rows that satisfy one or more logical conditions on column', 'Missing data handling in Pandas refers to the systematic detection, removal, or', 'Plotting from Pandas refers to using the built-in `.plot()` method on Series and', 'A Pandas DataFrame is a two-dimensional, size-mutable, heterogeneous tabular data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas methods have an `inplace`.' }
          ],
            remediations: { 'df': { steps: ['Revisit `c12_ip_cbse_02_003` (Indexing and slicing with loc/iloc) to reinforce that `loc[]` with a Boolean mask returns.', 'Practice the pattern `df = df.sort_values(...)` or `sorted_df = df.sort_values(...)` in a notebook, printing `df`.', 'Use `df.copy()` explicitly when an in‑place modification is intended, and compare memory addresses with `id()`.', 'Re‑attempt Diagnostic Question 3 and 6 after this exercise.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas.',
          parts: [
                { id: 'a', prompt: 'A student writes `df[df[\'Age\'] > 18 | df[\'Age\'] < 60]` to select adults aged 18‑60. Critique this code and provide the correct version.', answer: 'The code uses `|` (OR) instead of `&` (AND), so it selects all rows',
                  options: ['The code uses `|` (OR) instead of `&` (AND), so it selects all rows', 'that `df'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas methods have an `inplace`.' },
                { id: 'b', prompt: 'Design a DataFrame with columns \'Product\', \'Stock\', \'ReorderLevel\', \'Supplier\'.', answer: '`df.loc[df[\'Stock\'] < df[\'ReorderLevel\']].sort_values([\'Supplier\', \'Stock\'],',
                  options: ['`df.loc[df[\'Stock\'] < df[\'ReorderLevel\']].sort_values([\'Supplier\', \'Stock\'],', 'that `df'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas methods have an `inplace`.' }
          ],
            remediations: { 'df': { steps: ['Revisit `c12_ip_cbse_02_003` (Indexing and slicing with loc/iloc) to reinforce that `loc[]` with a Boolean mask returns.', 'Practice the pattern `df = df.sort_values(...)` or `sorted_df = df.sort_values(...)` in a notebook, printing `df`.', 'Use `df.copy()` explicitly when an in‑place modification is intended, and compare memory addresses with `id()`.', 'Re‑attempt Diagnostic Question 3 and 6 after this exercise.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_012', difficulty: 'standard',
          question: 'Plotting from Pandas refers to using the built-in `.plot()` method on Series.',
          hint: 'Revisit c12_ip_cbse_02_004 (read_csv) and c11_ip_cbse_08_003 (plt.plot basics).',
          misconception: 'Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they write.',
          parts: [
                { id: 'a', prompt: 'What is the default value of the `kind` parameter in `Series.plot()` and `DataFrame.plot()`?', answer: 'The default `kind` is `\'line\'` for both Series and DataFrame',
                  options: ['The default `kind` is `\'line\'` for both Series and DataFrame', 'Pandas is only for data manipulation and matplotlib is only for plotting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they write `plt.plot(df[\'Month\'], df[\'Sales\'])`.' }
          ],
            remediations: { 'pandas-is-only-for-data': { steps: ['Revisit `c11_ip_cbse_08_003` (line charts) and `c11_ip_cbse_08_004` (bar charts) — run the exact examples to recall.', 'Create a minimal Series: `s = pd.Series([10,20,15,30], index=[\'Jan\',\'Feb\',\'Mar\',\'Apr\'])`.', 'Call `s.plot()` — observe default line plot with index as x-axis.', 'Call `s.plot(kind=\'bar\')` — observe bar chart with index labels.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they write.',
          parts: [
                { id: 'a', prompt: 'Design a single visualization to compare the *shape* of score distributions for three sections (A, B, C) of Class 12 in a subject, where the data is in a.', answer: '```python',
                  options: ['```python', 'Pandas is only for data manipulation and matplotlib is only for plotting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Pandas is only for data manipulation and matplotlib is only for plotting — they write `plt.plot(df[\'Month\'], df[\'Sales\'])`.' }
          ],
            remediations: { 'pandas-is-only-for-data': { steps: ['Revisit `c11_ip_cbse_08_003` (line charts) and `c11_ip_cbse_08_004` (bar charts) — run the exact examples to recall.', 'Create a minimal Series: `s = pd.Series([10,20,15,30], index=[\'Jan\',\'Feb\',\'Mar\',\'Apr\'])`.', 'Call `s.plot()` — observe default line plot with index as x-axis.', 'Call `s.plot(kind=\'bar\')` — observe bar chart with index labels.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_002', difficulty: 'standard',
          question: 'A Pandas DataFrame is a two-dimensional, size-mutable, heterogeneous tabular.',
          hint: 'If stuck, revisit **c11_ip_cbse_04_009** (Dictionary Operations) and.',
          misconception: '**Misconception**: "When creating a DataFrame from a dictionary, the keys become row labels." **Why it happens**:.',
          parts: [
                { id: 'a', prompt: 'Explain why `pd.DataFrame([{\'a\': 1, \'b\': 2}, {\'a\': 3, \'c\': 4}])` produces a DataFrame with three columns (a, b, c) and two rows, with NaN in the (1, \'b\') and.', answer: 'Each dictionary becomes a row',
                  options: ['Each dictionary becomes a row', 'it raises an error', 'When creating a DataFrame from a dictionary, the keys become row labels'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "When creating a DataFrame from a dictionary, the keys become row labels." **Why it happens**: Students confuse.' }
          ],
            remediations: { 'misconception-when-creating-a-dataframe': { steps: ['Revisit **c12_ip_cbse_02_001** (Pandas Series) to reinforce that a DataFrame is a collection of Series sharing an index.', 'Draw a 2×3 table on paper: label columns (keys) and rows (0,1).', 'Map each creation method to this visual.', 'Run this re-diagnostic in a notebook: create `df = pd.DataFrame({\'X\':[1,2], \'Y\':[3,4]})`; print `df.index`,.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_008', difficulty: 'standard',
          question: 'Descriptive statistics in Pandas refer to built-in methods (mean(), median(),.',
          hint: 'If stuck, revisit Class 11 Statistics nodes c11_stat_cbse_05_002 (mean),.',
          misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually.',
          parts: [
                { id: 'a', prompt: 'Given a Series `s = pd.Series([10, 20, 30, 40, 50, 1000])`, compute the mean and median manually, then explain why they differ and which better represents the.', answer: 'Mean = (10+20+30+40+50+1000)/6 = 1150/6 ≈ 191.67',
                  options: ['Mean = (10+20+30+40+50+1000)/6 = 1150/6 ≈ 191.67', '`DataFrame'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' },
                { id: 'b', prompt: 'A DataFrame `df` has columns \'Math\', \'Physics\', \'Chemistry\' with marks of 50 students. You run `df.describe()`.', answer: 'Physics has the most consistent performance',
                  options: ['Physics has the most consistent performance', '`DataFrame'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' }
          ],
            remediations: { 'dataframe': { steps: ['Revisit the definition of sample vs population standard deviation (Class 11 Statistics node c11_stat_cbse_06_006).', 'Run a tiny Series with known values: `s = pd.Series([1,2,3,4,5])`; compute `s.std()` and `s.std(ddof=0)` to see the.', 'Practice `mode()` on a multimodal Series: `pd.Series([1,1,2,2,3])` and observe the output is a Series with two values.', 'Re-do Diagnostic Questions 2 and 4 with this corrected understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Since `describe()` gives count, mean, std, min, 25%, 50%, 75%, max, we don\'t need to call `median()` separately." Is it.', answer: '`describe()` includes the 50th percentile',
                  options: ['`describe()` includes the 50th percentile', 'always true', 'never true', '`DataFrame'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' },
                { id: 'b', prompt: 'Create a small dataset (5-6 values) where the mean, median, and mode are all different.', answer: 'Example: `s = pd.Series([1, 2, 2, 3, 100])`',
                  options: ['Example: `s = pd.Series([1, 2, 2, 3, 100])`', '`DataFrame'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' },
                { id: 'c', prompt: 'A DataFrame `df` has columns \'Math\', \'Physics\', \'Chemistry\' with marks of 50 students. You run `df.describe()`.', answer: 'Physics has the most consistent performance',
                  options: ['Physics has the most consistent performance', '`DataFrame'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think `DataFrame.describe()` includes the median as a separate row labeled \'median\', but it\'s actually labeled \'50%\'.' }
          ],
            remediations: { 'dataframe': { steps: ['Revisit the definition of sample vs population standard deviation (Class 11 Statistics node c11_stat_cbse_06_006).', 'Run a tiny Series with known values: `s = pd.Series([1,2,3,4,5])`; compute `s.std()` and `s.std(ddof=0)` to see the.', 'Practice `mode()` on a multimodal Series: `pd.Series([1,1,2,2,3])` and observe the output is a Series with two values.', 'Re-do Diagnostic Questions 2 and 4 with this corrected understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_004', difficulty: 'standard',
          question: 'The `read_csv()` and `read_excel()` functions in Pandas are used to import.',
          hint: 'Revisit Class 11 node `c11_ip_cbse_06_009` (Introduction to CSV Files) and.',
          misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write.',
          parts: [
                { id: 'a', prompt: 'What is the default value of the `sep` parameter in `pd.read_csv()`, and what does it imply about the file format?', answer: 'The default value of `sep` is a comma (`,`)',
                  options: ['The default value of `sep` is a comma (`,`)', 'data.xlsx', 'data.csv'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write `pd.read_csv("data.xlsx")` or.' }
          ],
            remediations: { 'read-csv-and-read-excel': { steps: ['Have the student create two files: `test.csv` (comma-separated, with header) and `test.xlsx` (same data, Excel format).', 'Ask them to run `pd.read_csv("test.xlsx")` and observe the `ValueError: Excel file format cannot be determined`.', 'Then run `pd.read_excel("test.csv")` and observe `FileNotFoundError` or garbage output.', 'Explain: CSV = plain text → `read_csv`; Excel = binary workbook → `read_excel` + engine.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write.',
          parts: [
                { id: 'a', prompt: 'A student writes `df = pd.read_excel("marks.xlsx")` but gets a `ModuleNotFoundError: No module named \'openpyxl\'`.', answer: 'This is an environment issue, not a code logic error',
                  options: ['This is an environment issue, not a code logic error', 'change to read_csv', 'import openpyxl in code', 'data.xlsx'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `read_csv` and `read_excel` are interchangeable for any tabular file — they write `pd.read_csv("data.xlsx")` or.' }
          ],
            remediations: { 'read-csv-and-read-excel': { steps: ['Have the student create two files: `test.csv` (comma-separated, with header) and `test.xlsx` (same data, Excel format).', 'Ask them to run `pd.read_csv("test.xlsx")` and observe the `ValueError: Excel file format cannot be determined`.', 'Then run `pd.read_excel("test.csv")` and observe `FileNotFoundError` or garbage output.', 'Explain: CSV = plain text → `read_csv`; Excel = binary workbook → `read_excel` + engine.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
