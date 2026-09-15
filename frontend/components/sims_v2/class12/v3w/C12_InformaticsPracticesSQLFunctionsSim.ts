import type { SimDef } from '../../engine/types';
import C12_InformaticsPracticesSQLFunctionsSim from '../../../simulations/c6_12/C12_InformaticsPracticesSQLFunctionsSim';

/** v3 wrapped master — C12_InformaticsPracticesSQLFunctionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_informaticspracticessqlfunctionssim: SimDef = {
    id: 'v3w_c12_informaticspracticessqlfunctionssim',
    title: 'Informatics Practices SQLFunctions',
    subtitle: 'This node covers the five standard aggregate functions, their behaviour with NULL values,.',
    classLevel: 12, subject: 'science', topic: 'SQL Aggregate Functions: SUM, AVG, COUNT, MAX, MIN with GROUP BY',
    chapters: [],
    nodeIds: ['c12_ip_cbse_01_006', 'c12_ip_cbse_01_007', 'c12_ip_cbse_01_010', 'c12_ip_cbse_01_012', 'c12_ip_cbse_02_010', 'c12_ip_cbse_01_001', 'c12_ip_cbse_01_003', 'c12_ip_cbse_01_005', 'c12_ip_cbse_01_009', 'c12_ip_cbse_01_004', 'c12_ip_cbse_02_011', 'c12_ip_cbse_02_004', 'c12_ip_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the manager of a car showroom and you need to know how many cars each salesperson sold last.', goal: 'Master Informatics Practices SQLFunctions.' },
    discovery: {
        question: 'A query uses `SELECT COUNT(DISTINCT Model) FROM INVENTORY;`. The table has 8 rows with Model values: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE, LXI, VXI.',
        options: ['The result is 6 (distinct models: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE)', 'COUNT(DISTINCT Model) counts all rows, ignoring the DISTINCT keyword', '`WHERE` and `HAVING` are interchangeable filters'],
        answer: 'The result is 6 (distinct models: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE)',
        hook: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.',
    },
    teaching: [
        { title: 'SQL aggregate functions (SUM, AVG, COUNT,.', text: 'SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary value from a set of rows, and GROUP BY partitions rows into groups sharing identical values in specified columns so that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_ip_cbse_01_006', title: 'SQL aggregate functions (SUM, AVG,.',
          scaffold: { problem: 'Using the CARSHOWROOM database, write a query to display each fuel type (FuelType) and the total number of cars, the highest price, and the.',
            steps: [
            { text: 'Identify the table (INVENTORY) and the grouping column (FuelType).' },
            { text: 'Choose the aggregate functions: COUNT(*) for number of cars, MAX(Price) for highest price, AVG(Price) for average price.' },
            { text: 'Apply ROUND(AVG(Price), 2) to format the average.' },
            { text: 'Write the GROUP BY FuelType clause.' },
            { text: 'Add HAVING COUNT(*) > 2 to filter groups after aggregation.' },
            { text: 'Execute and verify against the sample data: Petrol has 5 cars, CNG has 2 cars, so only Petrol should appear.', faded: true, blankAnswer: '```sql' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_01_007', title: 'The ORDER BY clause sorts query results.',
          scaffold: { problem: 'The car showroom manager wants a list of the 3 most expensive cars in the INVENTORY table, showing CarId, CarName, and Price.',
            steps: [
            { text: 'Identify the table (INVENTORY) and the columns needed (CarId, CarName, Price).' },
            { text: 'Determine the sort order — "most expensive" means Price descending (DESC).' },
            { text: 'Write the SELECT clause with the three columns.' },
            { text: 'Add ORDER BY Price DESC to sort from highest to lowest price.' },
            { text: 'Append LIMIT 3 to keep only the top three rows.' },
            { text: 'Execute and verify the output matches the three highest prices in the table (673112.00, 654914.00, 647858.00).', faded: true, blankAnswer: '`SELECT CarId, CarName, Price FROM INVENTORY ORDER BY Price.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_01_010', title: 'The HAVING clause in SQL is used to.',
          scaffold: { problem: 'Using the CARSHOWROOM SALE table, list each customer (CustID) and the total amount they have spent (sum of SalePrice), but only for.',
            steps: [
            { text: 'Identify the table (SALE) and the columns needed (CustID, SalePrice).' },
            { text: 'Group by CustID because we want per-customer totals.' },
            { text: 'Apply SUM(SalePrice) to compute total spending per customer.' },
            { text: 'Use HAVING to keep only groups where SUM(SalePrice) > 1000000.' },
            { text: 'Write the full query with proper clause order.', faded: true, blankAnswer: '```sql' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_01_012', title: 'SQL single-row functions (also called.',
          scaffold: { problem: 'The CARSHOWROOM management wants a report showing each car\'s CarID, CarName, Price, GST (18% of Price rounded to 2 decimals), FinalPrice.',
            steps: [
            { text: 'Identify the base column (Price) and required calculations: GST = Price * 0.18, FinalPrice = Price + GST, EMI =.' },
            { text: 'Choose functions: ROUND for GST (2 decimals), ROUND with negative precision for EMI (nearest 1000 = ROUND(value, -3)).' },
            { text: 'Build expressions: ROUND(Price * 0.18, 2) AS GST, (Price + ROUND(Price * 0.18, 2)) AS FinalPrice, ROUND((Price +.' },
            { text: 'Write full query: SELECT CarID, CarName, Price, ROUND(Price * 0.18, 2) AS GST, (Price + ROUND(Price * 0.18, 2)) AS.' },
            { text: 'Verify with D001 (Price=582613.00): GST=ROUND(104870.34,2)=104870.34, FinalPrice=687483.34, EMI=ROUND(57290.278,.', faded: true, blankAnswer: 'Query as above; for D001: GST=104870.34,.' }
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
        { type: 'scaffold', nodeId: 'c12_ip_cbse_01_001', title: 'MySQL data types define the kind of.',
          scaffold: { problem: 'A school wants to store student data: admission number (max 99999), date of birth, height in meters (up to 2.50, two decimals), blood group.',
            steps: [
            { text: 'Analyze admission number — integer, max 99999 fits in SMALLINT UNSIGNED (0-65535, 2 bytes).' },
            { text: 'Date of birth — only date, no time. DATE (3 bytes) is perfect; DATETIME (8 bytes) wastes 5 bytes.' },
            { text: 'Height — exact decimal up to 2.50 with two decimals. DECIMAL(3,2) allows 9.99 max, uses 2 bytes (DECIMAL packs 9 digits.' },
            { text: 'Blood group — fixed 3 characters (e.g., \'A+\', \'B-\', \'AB+\', \'O-\').' },
            { text: 'Photograph — binary up to 200KB. BLOB max 64KB too small; MEDIUMBLOB max 16MB fits. Use MEDIUMBLOB.' },
            { text: 'Write CREATE TABLE with NOT NULL where appropriate and PRIMARY KEY on admission_no.', faded: true, blankAnswer: '```sql' }
            ] } },
        { type: 'dissect', nodeId: 'c12_ip_cbse_01_007', title: 'Identify each idea',
          dissect: { specimen: 'Informatics Practices SQLFunctions', spots: [
            { id: 's1', label: 'SQL aggregate functions SUM AVG', prompt: 'Which idea is this? — SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary value from a.', answer: 'SQL aggregate functions SUM AVG', options: ['SQL aggregate functions SUM AVG', 'The ORDER BY clause sorts', 'The HAVING clause in SQL', 'SQL single-row functions also called'] },
            { id: 's2', label: 'The ORDER BY clause sorts', prompt: 'Which idea is this? — The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order.', answer: 'The ORDER BY clause sorts', options: ['The ORDER BY clause sorts', 'SQL aggregate functions SUM AVG', 'The HAVING clause in SQL', 'SQL single-row functions also called'] },
            { id: 's3', label: 'The HAVING clause in SQL', prompt: 'Which idea is this? — The HAVING clause in SQL is used to filter groups of rows after aggregation (GROUP BY).', answer: 'The HAVING clause in SQL', options: ['The HAVING clause in SQL', 'SQL aggregate functions SUM AVG', 'The ORDER BY clause sorts', 'SQL single-row functions also called'] },
            { id: 's4', label: 'SQL single-row functions also called', prompt: 'Which idea is this? — SQL single-row functions (also called scalar functions) operate on a single value from.', answer: 'SQL single-row functions also called', options: ['SQL single-row functions also called', 'SQL aggregate functions SUM AVG', 'The ORDER BY clause sorts', 'The HAVING clause in SQL'] },
            { id: 's5', label: 'Filtering a DataFrame selects rows', prompt: 'Which idea is this? — Filtering a DataFrame selects rows that satisfy one or more logical conditions on column.', answer: 'Filtering a DataFrame selects rows', options: ['Filtering a DataFrame selects rows', 'SQL aggregate functions SUM AVG', 'The ORDER BY clause sorts', 'The HAVING clause in SQL'] },
            { id: 's6', label: 'MySQL data types define the', prompt: 'Which idea is this? — MySQL data types define the kind of value a column can store, determining its storage.', answer: 'MySQL data types define the', options: ['MySQL data types define the', 'SQL aggregate functions SUM AVG', 'The ORDER BY clause sorts', 'The HAVING clause in SQL'] }
          ] } }
    ],
    explore: { component: C12_InformaticsPracticesSQLFunctionsSim, prompt: 'Explore the interactive — Informatics Practices SQLFunctions' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_006', difficulty: 'standard',
          question: 'SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary.',
          hint: 'If stuck, review the difference between COUNT(*) and COUNT(column) using a table with.',
          misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.',
          parts: [
                { id: 'a', prompt: 'What is the result of `SELECT COUNT(*), COUNT(commission) FROM SALE;` if the SALE table has 6 rows and the commission column has 4 non‑NULL values and 2 NULL.', answer: 'The result is `COUNT(*) = 6` and `COUNT(commission) = 4`',
                  options: ['The result is `COUNT(*) = 6` and `COUNT(commission) = 4`', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' },
                { id: 'b', prompt: 'Consider the SALE table. A student writes: `SELECT CustID, COUNT(*) FROM SALE WHERE SalePrice > 600000 GROUP BY CustID HAVING COUNT(*) > 1;`.', answer: 'They are not equivalent',
                  options: ['They are not equivalent', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' }
          ],
            remediations: { 'where-and-having-are-interchangeable': { steps: ['Re‑visit the execution order diagram (FROM → WHERE → GROUP BY → HAVING → SELECT).', 'Practice converting English questions into the correct clause: "filter rows before grouping" → WHERE; "filter groups.', 'Use the CARSHOWROOM SALE table: write two queries – one with WHERE SalePrice > 600000 and one with HAVING.', 'Re‑attempt Diagnostic Question 4; if still wrong, review c12_ip_cbse_01_005 (WHERE clause) and c11_ip_cbse_07_012.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.',
          parts: [
                { id: 'a', prompt: 'A query uses `SELECT COUNT(DISTINCT Model) FROM INVENTORY;`. The table has 8 rows with Model values: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE, LXI, VXI.', answer: 'The result is 6 (distinct models: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE)',
                  options: ['The result is 6 (distinct models: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE)', 'COUNT(DISTINCT Model) counts all rows, ignoring the DISTINCT keyword', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' },
                { id: 'b', prompt: 'Design a real‑world scenario (different from car showroom) where you would need to use GROUP BY with two grouping columns and two different aggregate.', answer: 'Scenario: A school database with a table EXAM(StudentID, Subject, Marks)',
                  options: ['Scenario: A school database with a table EXAM(StudentID, Subject, Marks)', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' },
                { id: 'c', prompt: 'Consider the SALE table. A student writes: `SELECT CustID, COUNT(*) FROM SALE WHERE SalePrice > 600000 GROUP BY CustID HAVING COUNT(*) > 1;`.', answer: 'They are not equivalent',
                  options: ['They are not equivalent', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' }
          ],
            remediations: { 'where-and-having-are-interchangeable': { steps: ['Re‑visit the execution order diagram (FROM → WHERE → GROUP BY → HAVING → SELECT).', 'Practice converting English questions into the correct clause: "filter rows before grouping" → WHERE; "filter groups.', 'Use the CARSHOWROOM SALE table: write two queries – one with WHERE SalePrice > 600000 and one with HAVING.', 'Re‑attempt Diagnostic Question 4; if still wrong, review c12_ip_cbse_01_005 (WHERE clause) and c11_ip_cbse_07_012.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_007', difficulty: 'standard',
          question: 'The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC).',
          hint: 'If stuck, go back to c12_ip_cbse_01_004 (SELECT statement) and c12_ip_cbse_01_005 (WHERE.',
          misconception: 'Students often believe that LIMIT is applied before ORDER BY, thinking the database first picks N random rows and then.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what the following query does: `SELECT EmpName, Salary FROM EMPLOYEE ORDER BY Designation ASC, Salary DESC LIMIT 3;`', answer: 'The query first sorts employees by Designation in alphabetical order (A–Z)',
                  options: ['The query first sorts employees by Designation in alphabetical order (A–Z)', 'sorts by Salary first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that LIMIT is applied before ORDER BY, thinking the database first picks N random rows and then sorts them.' }
          ],
            remediations: { 'limit-is-applied-before-order': { steps: ['Revisit the SELECT statement node (c12_ip_cbse_01_004) and practice simple queries without sorting.', 'Review the WHERE clause node (c12_ip_cbse_01_005) to ensure filtering works.', 'Write five queries on the INVENTORY table: (a) sort by Price ASC, (b) sort by Price DESC, (c) sort by FuelType ASC then.', 'After each query, predict the row count and first row values before executing.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_010', difficulty: 'standard',
          question: 'The HAVING clause in SQL is used to filter groups of rows after aggregation.',
          hint: 'If stuck, review `c12_ip_cbse_01_006` (Aggregate Functions) and practice writing GROUP BY.',
          misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Compare the following two queries and explain which one will execute successfully and why: Query A: `SELECT CarId, SUM(SalePrice) FROM SALE WHERE.', answer: 'Query B executes successfully',
                  options: ['Query B executes successfully', 'Invalid use of group function', 'HAVING is just a synonym for WHERE and can be used interchangeably'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.' }
          ],
            remediations: { 'having-is-just-a-synonym': { steps: ['Revisit the execution order of a SELECT query: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 'Draw a flowchart showing where aggregates become available.', 'Practice converting a WHERE condition into HAVING by first writing the GROUP BY query, then adding the aggregate.', 'Use the CARSHOWROOM SALE table: write a query that groups by EmpID and shows total sales per employee, then add HAVING.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'A student claims: "HAVING can only be used with GROUP BY." Evaluate this statement and provide a counterexample if it is false, or justify if it is true.', answer: 'The statement is false',
                  options: ['The statement is false', 'Invalid use of group function', 'HAVING is just a synonym for WHERE and can be used interchangeably'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.' },
                { id: 'b', prompt: 'Compare the following two queries and explain which one will execute successfully and why: Query A: `SELECT CarId, SUM(SalePrice) FROM SALE WHERE.', answer: 'Query B executes successfully',
                  options: ['Query B executes successfully', 'Invalid use of group function', 'HAVING is just a synonym for WHERE and can be used interchangeably'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.' }
          ],
            remediations: { 'having-is-just-a-synonym': { steps: ['Revisit the execution order of a SELECT query: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 'Draw a flowchart showing where aggregates become available.', 'Practice converting a WHERE condition into HAVING by first writing the GROUP BY query, then adding the aggregate.', 'Use the CARSHOWROOM SALE table: write a query that groups by EmpID and shows total sales per employee, then add HAVING.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_012', difficulty: 'standard',
          question: 'SQL single-row functions (also called scalar functions) operate on a single.',
          hint: 'If stuck on function syntax or behavior, revisit c12_ip_cbse_01_001 (MySQL Data Types) to.',
          misconception: 'Students consistently write SELECT TRIM(\'.com\' FROM email) to remove \'.com\' from email endings, but TRIM only removes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SQL single-row functions (also called scalar functions) operate on a single value from',
                  options: ['SQL single-row functions (also called scalar functions) operate on a single value from', 'SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary value from a', 'The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order', 'The HAVING clause in SQL is used to filter groups of rows after aggregation (GROUP BY)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write SELECT TRIM(\'.com\' FROM email) to remove \'.com\' from email endings, but TRIM only removes leading/trailing.' }
          ],
            remediations: { 'students-consistently-write-select-trim': { steps: ['Revisit c12_ip_cbse_01_001 (MySQL Data Types) to confirm which functions apply to which data types — math functions.', 'Practice nested function tracing on paper: write LEFT(email, INSTR(email,\'@\')-1) and evaluate inside-out with a sample.', 'Use MySQL Workbench to run SELECT TRIM(\'.com\' FROM \'test.com\'), observe the wrong output, then run SELECT.', 'Re-attempt Diagnostic Questions 2 and 4 after this remediation.'] } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_02_010', difficulty: 'standard',
          question: 'Filtering a DataFrame selects rows that satisfy one or more logical conditions.',
          hint: 'Review `c12_ip_cbse_02_003` (Boolean indexing examples) and practice writing masks for.',
          misconception: 'Students often believe that `df.sort_values(\'col\')` modifies the original DataFrame in place because many Pandas.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Filtering a DataFrame selects rows that satisfy one or more logical conditions on column',
                  options: ['Filtering a DataFrame selects rows that satisfy one or more logical conditions on column', 'SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary value from a', 'The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order', 'The HAVING clause in SQL is used to filter groups of rows after aggregation (GROUP BY)'],
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
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_001', difficulty: 'standard',
          question: 'MySQL data types define the kind of value a column can store, determining its.',
          hint: 'Review c11_ip_cbse_07_005 focusing on the data type table (INT, DECIMAL, DATE, VARCHAR).',
          misconception: 'Students treat all "numbers" as numeric types: they use INT for phone numbers, PIN codes, Aadhaar (12 digits), and roll.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'MySQL data types define the kind of value a column can store, determining its storage',
                  options: ['MySQL data types define the kind of value a column can store, determining its storage', 'SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary value from a', 'The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order', 'The HAVING clause in SQL is used to filter groups of rows after aggregation (GROUP BY)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat all "numbers" as numeric types: they use INT for phone numbers, PIN codes, Aadhaar (12 digits), and roll numbers because.' }
          ],
            remediations: { 'students-treat-all-numbers-as': { steps: ['Revisit Class 11 node c11_ip_cbse_07_005 (DDL Commands: CREATE TABLE and Data Types in SQL) and list every numeric,.', 'For each type, write one real-world attribute that fits perfectly and one that would break (e.g., DECIMAL(5,2) fits.', 'Practice converting 5 case-study descriptions (from CBSE sample papers) into CREATE TABLE statements, justifying each.', 'Re-attempt Diagnostic Questions 3, 5, and 6 without notes.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
