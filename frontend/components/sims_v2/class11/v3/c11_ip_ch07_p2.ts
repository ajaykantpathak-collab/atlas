import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch07_p2: SimDef = {
    id: 'v3_c11_ip_ch07_p2',
    title: 'Database Concepts and SQL · Part 2/2',
    subtitle: 'Give every part of a table its precise name — and see why NULL can\'t hold a key.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Database Concepts and SQL · Part 2/2',
    chapters: ['c11_ip_ch07'],
    nodeIds: ['c11_ip_cbse_07_007', 'c11_ip_cbse_07_008', 'c11_ip_cbse_07_009', 'c11_ip_cbse_07_010', 'c11_ip_cbse_07_011', 'c11_ip_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a database designer digitising a school\'s registers', intro: 'Three paper registers, one changed phone number, three places to update — the relational model was invented for exactly this mess.', goal: 'Distinguish relation, tuple, attribute, domain and keys, and contrast DBMS with file systems.' },
    discovery: {
        question: 'A designer argues: allow NULL in RollNumber because a new student may not have one yet. Does the relational model permit it?',
        options: ['No — RollNumber is the primary key, and NULL can\'t equal NULL, so two unassigned students would break tuple uniqueness', 'Yes — NULL means unknown, which is accurate here', 'Yes — as long as only one student lacks it', 'No — primary keys must be letters, not numbers'],
        answer: 'No — RollNumber is the primary key, and NULL can\'t equal NULL, so two unassigned students would break tuple uniqueness',
        hook: 'Two rows can share the same city and country legitimately — tuples are distinct on the whole row, not on any single column.',
    },
    teaching: [
        { title: 'DML Commands: INSERT INTO with Single and Multiple Rows', text: 'The INSERT INTO statement is a Data Manipulation Language (DML) command used to add new tuples (rows) into an existing table, either by explicitly specifying values for all columns in the defined.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Expose why two CSV files can\'t answer \'Name, Subject, Marks\' like a join can, then count a table\'s degree and cardinality correctly.',
        labels: ['DML Commands: INSERT INTO', 'DML Commands: UPDATE', 'SQL SELECT Statement: Selecting', 'SQL SELECT with WHERE', 'SQL Aggregate Functions: SUM,', 'SQL Clauses: ORDER BY,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_007', title: 'DML Commands: INSERT INTO with Single and Multiple Rows',
          caseStudy: { intro: 'Imagine you are the class monitor maintaining a digital "Student Club Membership" register in MySQL.',
            decisions: [{ prompt: 'What is the correct syntax to insert a single row into a table `STUDENT(RollNo INT, Name VARCHAR(20), Class INT)` providing values for all.', options: [
                { text: 'Correct answer: `INSERT INTO STUDENT VALUES (101, \'Rahul\', 11);`', outcome: 'Correct answer: `INSERT INTO STUDENT VALUES (101, \'Rahul\', 11);` A wrong answer like `INSERT INTO.' },
                { text: 'when using multi-row INSERT, if one row violates a constraint (e', outcome: 'Not quite — Students often believe that when using multi-row INSERT, if one row violates a constraint (e.g.', reveals: 'when-using-multi-row-insert' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_009', title: 'SQL SELECT Statement: Selecting Columns and Rows',
          caseStudy: { intro: 'Imagine you are the class teacher who needs to quickly see only the roll numbers and names of all 50 students from the STUDENT table, not their dates of birth.',
            decisions: [{ prompt: 'What is the exact syntax to retrieve only the \'SName\' and \'SDateofBirth\' columns from the STUDENT table?', options: [
                { text: 'Correct answer: `SELECT SName, SDateofBirth FROM STUDENT;`', outcome: 'Correct answer: `SELECT SName, SDateofBirth FROM STUDENT;`. A wrong answer like `SELECT * FROM.' },
                { text: 'selecting columns', outcome: 'Not quite — Students often confuse "selecting columns" (projection) with "selecting rows" (selection).', reveals: 'students-often-confuse-selecting-columns' },
                { text: 'selecting rows', outcome: 'Not quite — Students often confuse "selecting columns" (projection) with "selecting rows" (selection).', reveals: 'students-often-confuse-selecting-columns' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_010', title: 'SQL SELECT with WHERE Clause: Operators and Examples',
          caseStudy: { intro: 'Imagine you are the class monitor and need to find all students who scored above 80 in Mathematics AND have attendance greater than 75% to recommend them for.',
            decisions: [{ prompt: 'What are the three logical operators available in SQL WHERE clause, and what is the result of the expression `TRUE AND FALSE OR TRUE` when.', options: [
                { text: 'The three logical operators are AND, OR, NOT', outcome: 'The three logical operators are AND, OR, NOT. SQL evaluates AND before OR, so `TRUE AND FALSE`.' },
                { text: 'OR is evaluated first or misidentifying operators', outcome: 'Not quite — Students believe `WHERE COLUMN = NULL` works to find null values, because in programming languages.', reveals: 'where-column-null-works-to' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_011', title: 'SQL Aggregate Functions: SUM, AVG, COUNT, MAX, MIN',
          scaffold: { problem: 'A school canteen SALES table has columns: Item (VARCHAR), Price (DECIMAL), Qty (INT).',
            steps: [
            { text: 'Identify the table (SALES) and the expression for revenue per row: Price * Qty.' },
            { text: 'Recognize that Qty has a NULL; rows with NULL Qty must be excluded because Price * NULL = NULL.' },
            { text: 'Use WHERE Qty IS NOT NULL to filter out the NULL row before aggregation.' },
            { text: 'Apply SUM() on the filtered Price * Qty values.' },
            { text: 'Write the complete query and verify with manual calculation: (15*20)+(50*15)+(100*10) = 300+750+1000 = 2050.', faded: true, blankAnswer: 'SELECT SUM(Price * Qty) FROM SALES WHERE Qty IS NOT NULL.' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_012', title: 'SQL Clauses: ORDER BY, GROUP BY and HAVING with Examples',
          caseStudy: { intro: 'Imagine you are the sports coordinator of your school and have a table `SPORTS_FEES` with columns `Student_ID`, `Sport`, `Fee_Paid`, `Grade`.',
            decisions: [{ prompt: 'What is the correct logical order of clause execution in a SQL query containing WHERE, GROUP BY, HAVING, and ORDER BY clauses?', options: [
                { text: 'Correct order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', outcome: 'Correct order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.' },
                { text: 'HAVING can use column aliases defined in SELECT (e', outcome: 'Not quite — Students believe HAVING can use column aliases defined in SELECT (e.g., `HAVING Avg_Sal > 50000`.', reveals: 'having-can-use-column-aliases' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Digitising the school library, a teammate designs a STUDENT table referencing GUARDIAN.GPhone as a foreign key — \'a foreign key references another table, and GPhone is unique.\' He also calls attribute, column, field and domain \'all the same word.\'',
            decisions: [{ prompt: 'What do relational rules actually demand?', options: [
                { text: 'Apply the key rules: a foreign key must reference the PRIMARY KEY of the other table — GPhone is unique but it\'s an alternate/candidate key, so it can\'t be the FK target; GUID can. And the terms sit at different levels: relation = the table, attribute = a column, tuple = a row, domain = the set of legal values for a column — the FK\'s domain must match the referenced PK\'s domain exactly.', outcome: 'The schema holds: one update fixes the phone number everywhere, because the links reference real primary keys over matching domains.' },
                { text: 'Accept GPhone as FK target — unique is unique; any one-of-a-kind column can be referenced.', outcome: 'Uniqueness isn\'t enough: referential integrity requires pointing at the primary key — candidate keys that weren\'t chosen can\'t anchor references.', reveals: 'fk-can-reference-any-unique-column' },
                { text: 'Keep the synonyms — column, field, attribute, domain are interchangeable labels.', outcome: 'They describe different levels: domain is the legal value set, attribute names the column, tuples are the rows — blurring them breaks constraint and integrity thinking.', reveals: 'domain-attribute-field-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'Files scatter, relations link — a DBMS exists so a changed phone number is written once, not hunted through three registers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_007', difficulty: 'standard',
          question: 'The INSERT INTO statement is a Data Manipulation Language (DML) command used.',
          hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and constraints) and c11_ip_cbse_07_003 (Keys).',
          misconception: 'Students often believe that when using multi-row INSERT, if one row violates a constraint (e.g., duplicate PRIMARY.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to insert a single row into a table `STUDENT(RollNo INT, Name VARCHAR(20), Class INT)` providing values for all columns in the.', answer: 'Correct answer: `INSERT INTO STUDENT VALUES (101, \'Rahul\', 11);`',
                  options: ['Correct answer: `INSERT INTO STUDENT VALUES (101, \'Rahul\', 11);`', 'when using multi-row INSERT, if one row violates a constraint (e'],
                  hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and constraints) and c11_ip_cbse_07_003 (Keys) to solidify.',
                  misconception: 'Students often believe that when using multi-row INSERT, if one row violates a constraint (e.g., duplicate PRIMARY KEY), the other valid.' }
          ],
            remediations: { 'when-using-multi-row-insert': { steps: ['Create a test table `T(ID INT PRIMARY KEY, Val VARCHAR(10))`.', 'Run `INSERT INTO T VALUES (1,\'A\'), (1,\'B\'), (2,\'C\');` — observe error and `SELECT * FROM T;` showing empty table.', 'Run `INSERT IGNORE INTO T VALUES (1,\'A\'), (1,\'B\'), (2,\'C\');` — observe warning but row (1,\'A\') and (2,\'C\') inserted.', 'Explain: Without IGNORE, atomicity protects consistency; with IGNORE, MySQL silently skips bad rows.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that when using multi-row INSERT, if one row violates a constraint (e.g., duplicate PRIMARY.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following approach: "To insert 100 rows, I will write 100 separate INSERT statements because it\'s easier to debug." Justify whether this is good.', answer: 'Correct answer: This is poor practice',
                  options: ['Correct answer: This is poor practice', 'when using multi-row INSERT, if one row violates a constraint (e'],
                  hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and constraints) and c11_ip_cbse_07_003 (Keys) to solidify.',
                  misconception: 'Students often believe that when using multi-row INSERT, if one row violates a constraint (e.g., duplicate PRIMARY KEY), the other valid.' },
                { id: 'b', prompt: 'Design a new table `LIBRARY_BOOK(BookID INT PRIMARY KEY, Title VARCHAR(50) NOT NULL, Author VARCHAR(30), Genre VARCHAR(15) DEFAULT \'Fiction\', Copies INT.', answer: 'Correct answer: The third row will fail',
                  options: ['Correct answer: The third row will fail', 'when using multi-row INSERT, if one row violates a constraint (e'],
                  hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and constraints) and c11_ip_cbse_07_003 (Keys) to solidify.',
                  misconception: 'Students often believe that when using multi-row INSERT, if one row violates a constraint (e.g., duplicate PRIMARY KEY), the other valid.' }
          ],
            remediations: { 'when-using-multi-row-insert': { steps: ['Create a test table `T(ID INT PRIMARY KEY, Val VARCHAR(10))`.', 'Run `INSERT INTO T VALUES (1,\'A\'), (1,\'B\'), (2,\'C\');` — observe error and `SELECT * FROM T;` showing empty table.', 'Run `INSERT IGNORE INTO T VALUES (1,\'A\'), (1,\'B\'), (2,\'C\');` — observe warning but row (1,\'A\') and (2,\'C\') inserted.', 'Explain: Without IGNORE, atomicity protects consistency; with IGNORE, MySQL silently skips bad rows.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_008', difficulty: 'standard',
          question: 'UPDATE and DELETE are Data Manipulation Language (DML) commands used to modify.',
          hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE) and c11_ip_cbse_07_007 (INSERT INTO) to rebuild.',
          misconception: 'Students believe that UPDATE and DELETE without WHERE clause will produce an error or prompt for confirmation.',
          parts: [
                { id: 'a', prompt: 'Compare the effect of these two statements on the ATTENDANCE table (AttendanceDate, RollNumber, AttendanceStatus): A) DELETE FROM ATTENDANCE WHERE.', answer: 'Correct answer: Statement B deletes more rows',
                  options: ['Correct answer: Statement B deletes more rows', 'A deletes more because it\'s a specific date'],
                  hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE) and c11_ip_cbse_07_007 (INSERT INTO) to rebuild a test.',
                  misconception: 'Students believe that UPDATE and DELETE without WHERE clause will produce an error or prompt for confirmation.' }
          ],
            remediations: { 'update-and-delete-without-where': { steps: ['Have the student run DELETE FROM STUDENT; on a test table with 3 rows in MySQL Workbench, then immediately run SELECT *.', 'Ask them to write a Python script using mysql-connector that executes UPDATE STUDENT SET SName=\'X\' WHERE.', 'Make them write a "safe delete" pattern: first SELECT with the same WHERE to preview rows, then DELETE with identical.', 'Drill the mantra: "No WHERE = everywhere" until they automatically type WHERE before hitting Enter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_009', difficulty: 'standard',
          question: 'The SQL SELECT statement retrieves data from one or more tables.',
          hint: 'Revisit node c11_ip_cbse_07_002 (Relational Data Model) and practice identifying.',
          misconception: 'Students often confuse "selecting columns" (projection) with "selecting rows" (selection).',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax to retrieve only the \'SName\' and \'SDateofBirth\' columns from the STUDENT table?', answer: 'Correct answer: `SELECT SName, SDateofBirth FROM STUDENT;`',
                  options: ['Correct answer: `SELECT SName, SDateofBirth FROM STUDENT;`', 'selecting columns', 'selecting rows'],
                  hint: 'Revisit node c11_ip_cbse_07_002 (Relational Data Model) and practice identifying degree/cardinality.',
                  misconception: 'Students often confuse "selecting columns" (projection) with "selecting rows" (selection).' },
                { id: 'b', prompt: 'If the STUDENT table has 6 rows and 4 columns (RollNumber, SName, SDateofBirth, GUID), what will be the degree and cardinality of the result of `SELECT.', answer: 'Degree = 2 (two columns selected), Cardinality = 6 (all rows returned',
                  options: ['Degree = 2 (two columns selected), Cardinality = 6 (all rows returned', 'selecting columns', 'selecting rows', 'SELECT * is implicit or that row filtering happens automatically'],
                  hint: 'Revisit node c11_ip_cbse_07_002 (Relational Data Model) and practice identifying degree/cardinality.',
                  misconception: 'Students often confuse "selecting columns" (projection) with "selecting rows" (selection).' },
                { id: 'c', prompt: 'Write a query to display all columns of the GUARDIAN table for a school database.', answer: '`SELECT * FROM GUARDIAN;`',
                  options: ['`SELECT * FROM GUARDIAN;`', 'all columns', 'selecting columns', 'selecting rows'],
                  hint: 'Revisit node c11_ip_cbse_07_002 (Relational Data Model) and practice identifying degree/cardinality.',
                  misconception: 'Students often confuse "selecting columns" (projection) with "selecting rows" (selection).' },
                { id: 'd', prompt: 'Compare the results of `SELECT SName FROM STUDENT;` and `SELECT SName, SName FROM STUDENT;`. Are they identical? Why or why not?', answer: 'Not identical',
                  options: ['Not identical', 'identical', 'selecting columns', 'selecting rows'],
                  hint: 'Revisit node c11_ip_cbse_07_002 (Relational Data Model) and practice identifying degree/cardinality.',
                  misconception: 'Students often confuse "selecting columns" (projection) with "selecting rows" (selection).' }
          ],
            remediations: { 'students-often-confuse-selecting-columns': { steps: ['Draw a table on paper: label columns RollNumber, SName, etc.', 'Use a ruler to vertically cover unwanted columns — this is SELECT column_list.', 'Use a ruler to horizontally cover unwanted rows — this is WHERE condition.', 'Emphasize: SELECT = vertical cut (columns), WHERE = horizontal cut (rows).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_010', difficulty: 'standard',
          question: 'The WHERE clause in SQL SELECT statements filters rows from a table based.',
          hint: 'Revisit c11_ip_cbse_07_009 (basic SELECT) and c7_math_ch02_003 (comparison operators).',
          misconception: 'Students believe `WHERE COLUMN = NULL` works to find null values, because in programming languages `== null` is valid.',
          parts: [
                { id: 'a', prompt: 'What are the three logical operators available in SQL WHERE clause, and what is the result of the expression `TRUE AND FALSE OR TRUE` when evaluated according.', answer: 'The three logical operators are AND, OR, NOT',
                  options: ['The three logical operators are AND, OR, NOT', 'OR is evaluated first or misidentifying operators'],
                  hint: 'Revisit c11_ip_cbse_07_009 (basic SELECT) and c7_math_ch02_003 (comparison operators) to rebuild.',
                  misconception: 'Students believe `WHERE COLUMN = NULL` works to find null values, because in programming languages `== null` is valid.' }
          ],
            remediations: { 'where-column-null-works-to': { steps: ['Show a tiny table with a NULL column.', 'Run `SELECT * FROM T WHERE COL = NULL;` — observe zero rows.', 'Run `SELECT * FROM T WHERE COL IS NULL;` — observe the NULL row.', 'Explain that NULL means "unknown", so equality comparison cannot determine truth.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_011', difficulty: 'standard',
          question: 'SQL aggregate functions perform calculations on a set of values from a column.',
          hint: 'Revisit c11_ip_cbse_07_009 for SELECT syntax and c6_math_ch09_100 for mean calculation.',
          misconception: 'Students believe aggregate functions automatically group by other columns in the SELECT list.',
          parts: [
                { id: 'a', prompt: 'What is the result of COUNT(*) versus COUNT(Price) on a table with 10 rows where 3 rows have NULL in the Price column?', answer: 'COUNT(*) returns 10',
                  options: ['COUNT(*) returns 10', 'COUNT ignores NULLs universally or confuses the two syntaxes', 'aggregate functions automatically group by other columns in the SELECT list'],
                  hint: 'Revisit c11_ip_cbse_07_009 for SELECT syntax and c6_math_ch09_100 for mean calculation steps.',
                  misconception: 'Students believe aggregate functions automatically group by other columns in the SELECT list.' },
                { id: 'b', prompt: 'Write a query to find the total revenue from a SALES table with columns Price and Quantity, but only for items where Quantity > 5.', answer: 'SELECT SUM(Price * Quantity) FROM SALES WHERE Quantity > 5',
                  options: ['SELECT SUM(Price * Quantity) FROM SALES WHERE Quantity > 5', 'aggregate functions automatically group by other columns in the SELECT list'],
                  hint: 'Revisit c11_ip_cbse_07_009 for SELECT syntax and c6_math_ch09_100 for mean calculation steps.',
                  misconception: 'Students believe aggregate functions automatically group by other columns in the SELECT list.' },
                { id: 'c', prompt: 'A table has 100 rows. MAX(Score) = 95, MIN(Score) = 10. After inserting a new row with Score = NULL, what are the new MAX and MIN?', answer: 'NULL is ignored, so MAX and MIN remain 95 and 10',
                  options: ['NULL is ignored, so MAX and MIN remain 95 and 10', 'NULL is treated as zero or negative infinity', 'aggregate functions automatically group by other columns in the SELECT list'],
                  hint: 'Revisit c11_ip_cbse_07_009 for SELECT syntax and c6_math_ch09_100 for mean calculation steps.',
                  misconception: 'Students believe aggregate functions automatically group by other columns in the SELECT list.' }
          ],
            remediations: { 'aggregate-functions-automatically-group-by': { steps: ['Show the error message from MySQL: "ERROR 1140: Incompatible mix of group and non-group columns".', 'Explain that aggregates collapse all rows into one; there is no "per group" without GROUP BY.', 'Have the student run SELECT AVG(Marks) alone, then add GROUP BY Class.', 'Contrast with spreadsheet pivot tables to clarify the mental model shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_012', difficulty: 'standard',
          question: 'The ORDER BY clause sorts the result set of a query in ascending (ASC).',
          hint: 'Revisit c11_ip_cbse_07_011 (Aggregate Functions) and practice computing SUM, AVG, COUNT.',
          misconception: 'Students believe HAVING can use column aliases defined in SELECT (e.g., `HAVING Avg_Sal > 50000` after `SELECT.',
          parts: [
                { id: 'a', prompt: 'What is the correct logical order of clause execution in a SQL query containing WHERE, GROUP BY, HAVING, and ORDER BY clauses?', answer: 'Correct order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
                  options: ['Correct order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', 'HAVING can use column aliases defined in SELECT (e'],
                  hint: 'Revisit c11_ip_cbse_07_011 (Aggregate Functions) and practice computing SUM, AVG, COUNT on whole.',
                  misconception: 'Students believe HAVING can use column aliases defined in SELECT (e.g., `HAVING Avg_Sal > 50000` after `SELECT AVG(Salary) AS Avg_Sal`).' },
                { id: 'b', prompt: 'Consider a table `SALES(Salesperson, Region, Amount)`. A student writes: `SELECT Region, SUM(Amount) FROM SALES WHERE SUM(Amount) > 10000 GROUP BY Region;`.', answer: 'The query fails because WHERE clause cannot contain aggregate functions',
                  options: ['The query fails because WHERE clause cannot contain aggregate functions', 'HAVING can use column aliases defined in SELECT (e'],
                  hint: 'Revisit c11_ip_cbse_07_011 (Aggregate Functions) and practice computing SUM, AVG, COUNT on whole.',
                  misconception: 'Students believe HAVING can use column aliases defined in SELECT (e.g., `HAVING Avg_Sal > 50000` after `SELECT AVG(Salary) AS Avg_Sal`).' },
                { id: 'c', prompt: 'Compare and contrast the effect of `ORDER BY Marks DESC` versus `ORDER BY 2 DESC` when used with `SELECT Name, Marks FROM STUDENTS`.', answer: '`ORDER BY Marks DESC` sorts by the column name',
                  options: ['`ORDER BY Marks DESC` sorts by the column name', 'HAVING can use column aliases defined in SELECT (e'],
                  hint: 'Revisit c11_ip_cbse_07_011 (Aggregate Functions) and practice computing SUM, AVG, COUNT on whole.',
                  misconception: 'Students believe HAVING can use column aliases defined in SELECT (e.g., `HAVING Avg_Sal > 50000` after `SELECT AVG(Salary) AS Avg_Sal`).' }
          ],
            remediations: { 'having-can-use-column-aliases': { steps: ['Draw the logical execution pipeline on paper: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 'Label each stage with "Can use aliases?" (NO for HAVING, YES for ORDER BY).', 'Practice rewriting 5 queries: first with aggregate repeated in HAVING, then with alias in ORDER BY only.', 'Memorize the rule: "HAVING sees raw aggregates; ORDER BY sees SELECT output." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
