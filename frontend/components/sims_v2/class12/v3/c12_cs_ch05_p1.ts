import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch05_p1: SimDef = {
    id: 'v3_c12_cs_ch05_p1',
    title: 'SQL · Part 1/2',
    subtitle: 'MySQL isn\'t a language — and that mix-up costs marks',
    classLevel: 12, subject: 'computer_science', topic: 'SQL · Part 1/2',
    chapters: ['c12_cs_ch05'],
    nodeIds: ['c12_cs_cbse_05_001', 'c12_cs_cbse_05_002', 'c12_cs_cbse_05_003', 'c12_cs_cbse_05_004', 'c12_cs_cbse_05_005', 'c12_cs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Backend developer', intro: 'Every app\'s memory is a database, and SQL is how you talk to it. Learn the language, pick the engine, done.', goal: 'Distinguish SQL from MySQL and write CREATE, INSERT and SELECT statements with correct data types.' },
    discovery: {
        question: 'A teammate announces, \'I\'m going to learn MySQL — the language all databases speak.\' Spot the error in ten words or less.',
        options: ['MySQL is the software; SQL is the language it speaks', 'None — MySQL IS the language', 'MySQL is the database file itself', 'SQL only works inside MySQL anyway'],
        answer: 'MySQL is the software; SQL is the language it speaks',
        hook: 'SQL is an ANSI/ISO standard language; MySQL is one RDBMS that implements it — like grammar vs one particular book. Mixing them up is why students say \'MySQL query\' when they mean SQL, and why CHAR vs VARCHAR for a 10-digit phone number stumps them.',
    },
    teaching: [
        { title: 'Introduction to SQL and MySQL', text: 'SQL (Structured Query Language) is a standardized programming language used to manage and manipulate relational databases; MySQL is an open-source relational database management system (RDBMS) that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Speak to a database: create the school-fest schema, pick data types that enforce integrity (why CHAR(10) beats VARCHAR for mobiles), insert real rows, and graduate to SELECT, WHERE, ORDER BY and friends.',
        labels: ['Introduction to SQL', 'DDL Commands: CREATE, ALTER,', 'DML Commands: INSERT, UPDATE,', 'SELECT Statement: Basic Queries', 'WHERE Clause and Operators', 'SQL Functions: Aggregate (SUM,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_001', title: 'Introduction to SQL and MySQL',
          caseStudy: { intro: 'Imagine you are building a contact list for your school’s annual fest: you need to store each participant’s name, class, phone number, and event category.',
            decisions: [{ prompt: 'What is the fundamental difference between SQL and MySQL?', options: [
                { text: 'SQL is a language standard (ANSI/ISO) for querying relational databases', outcome: 'SQL is a language standard (ANSI/ISO) for querying relational databases; MySQL is a specific RDBMS.' },
                { text: 'SQL is the software and MySQL is the language', outcome: 'Not quite — Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.', reveals: 'sql-and-mysql-are-the' },
                { text: 'MySQL queries', outcome: 'Not quite — Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.', reveals: 'sql-and-mysql-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_002', title: 'DDL Commands: CREATE, ALTER, DROP',
          caseStudy: { intro: 'Imagine you are designing a database for your school\'s library system.',
            decisions: [{ prompt: 'What is the primary purpose of the DDL command CREATE TABLE in SQL, and name two mandatory components required in its syntax?', options: [
                { text: 'The primary purpose of CREATE TABLE is to define a new table structure in the database by', outcome: 'The primary purpose of CREATE TABLE is to define a new table structure in the database.' },
                { text: 'rename column', outcome: 'Not quite — Students believe that ALTER TABLE ... MODIFY COLUMN can rename a column.', reveals: 'alter-table' },
                { text: 'it inserts data or doesn\'t require data types', outcome: 'Not quite — Students believe that ALTER TABLE ... MODIFY COLUMN can rename a column.', reveals: 'alter-table' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_004', title: 'SELECT Statement: Basic Queries',
          caseStudy: { intro: 'Imagine you are a librarian who needs to quickly generate a list of all book titles and their authors from the library database.',
            decisions: [{ prompt: 'What is the basic syntax of a SELECT statement to retrieve all columns from a table named \'students\'?', options: [
                { text: 'The correct syntax is `SELECT * FROM students;`', outcome: 'The correct syntax is `SELECT * FROM students;`. A wrong answer like `SELECT ALL FROM students`.' },
                { text: '`SELECT *` is always the best practice', outcome: 'Not quite — Students often think that `SELECT *` is always the best practice because it\'s shorter.', reveals: 'select-is-always-the-best' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_005', title: 'WHERE Clause and Operators in SQL',
          caseStudy: { intro: 'Imagine you are building a school library system and need to find all students who borrowed books in the last month and have overdue fines above ₹50.',
            decisions: [{ prompt: 'What is the result of the condition `WHERE marks BETWEEN 40 AND 50` for a row where marks = 50?', options: [
                { text: 'The row is included', outcome: 'The row is included because BETWEEN is inclusive of both boundary values.' },
                { text: 'excluded', outcome: 'Not quite — Students write `WHERE column = NULL` to check for missing values, believing NULL equals NULL.', reveals: 'students-write-where-column-null' },
                { text: 'depends on database', outcome: 'Not quite — Students write `WHERE column = NULL` to check for missing values, believing NULL equals NULL.', reveals: 'students-write-where-column-null' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_05_006', title: 'SQL Functions: Aggregate (SUM, AVG, COUNT, MAX, MIN)',
          scaffold: { problem: 'A school database has a table EXAM_RESULTS with columns: ROLL_NO (INT), STUDENT_NAME (VARCHAR), SUBJECT (VARCHAR), MARKS (INT).',
            steps: [
            { text: 'Identify the table (EXAM_RESULTS) and filter for Math subject using WHERE SUBJECT = \'Math\'.' },
            { text: 'For total marks awarded, use SUM(MARKS) — it automatically ignores the 2 NULL values.' },
            { text: 'For average marks of appeared students, use AVG(MARKS) — denominator is count of non-NULL marks (28).' },
            { text: 'For number of appeared students, use COUNT(MARKS) — counts only non-NULL marks (28).' },
            { text: 'For highest/lowest marks, use MAX(MARKS) and MIN(MARKS) — both ignore NULLs.' },
            { text: 'For total rows including absentees, use COUNT(*) — returns 30.', faded: true, blankAnswer: '(a) SELECT SUM(MARKS) FROM EXAM_RESULTS WHERE SUBJECT.' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Migrating a school project from MySQL to PostgreSQL, a student copies her script over unchanged — \'SQL is a standard, so it\'ll just run\' — and watches it fail on `AUTO_INCREMENT` and `LIMIT`.',
            decisions: [{ prompt: 'Why did the \'standard\' SQL break?', options: [
                { text: 'The standard covers core SELECT/INSERT/CREATE, but every RDBMS bolts on its own syntax — AUTO_INCREMENT vs SERIAL, LIMIT vs FETCH FIRST, backticks vs double quotes — so porting means translating the dialect.', outcome: 'SQL is the language, MySQL is one product speaking it with an accent; the script needs dialect conversion, not blind copying.' },
                { text: 'SQL and MySQL are two names for the same thing, so \'MySQL queries\' are inherently portable.', outcome: 'SQL is the language standard; MySQL is one implementation — conflating them hides exactly the proprietary features that broke.', reveals: 'sql-equals-mysql' },
                { text: 'PostgreSQL must be buggy — standard-compliant SQL can\'t fail.', outcome: 'AUTO_INCREMENT and backticks are MySQL-only extensions; the failures mark non-standard syntax, not a faulty server.', reveals: 'standard-means-fully-portable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now build a table that refuses bad data and query it like a pro. SQL is the single most-employed skill in this entire subject.',
            decisions: [{ prompt: 'What comes next? SQL · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — SQL · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_001', difficulty: 'standard',
          question: 'SQL (Structured Query Language) is a standardized programming language used.',
          hint: 'If the student cannot visualise tables, have them create a paper-based "participants".',
          misconception: 'Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between SQL and MySQL?', answer: 'SQL is a language standard (ANSI/ISO) for querying relational databases',
                  options: ['SQL is a language standard (ANSI/ISO) for querying relational databases', 'SQL is the software and MySQL is the language', 'MySQL queries', 'SQL queries'],
                  hint: 'If the student cannot visualise tables, have them create a paper-based "participants" sheet with 5.',
                  misconception: 'Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.' },
                { id: 'b', prompt: 'Write the exact sequence of SQL commands to create a database named `school_fest`, switch to it, create a table `participants` with columns `pid` (integer).', answer: '```sql CREATE DATABASE school_fest',
                  options: ['```sql CREATE DATABASE school_fest', 'SQL and MySQL are the same thing', '“SQL and MySQL are the same thing” and use the terms interchangeably'],
                  hint: 'If the student cannot visualise tables, have them create a paper-based "participants" sheet with 5.',
                  misconception: 'Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.' }
          ],
            remediations: { 'sql-and-mysql-are-the': { steps: ['Revisit the definition: write “SQL = Language Standard” and “MySQL = One RDBMS Product” on a sticky note.', 'Open two terminal windows: one running `mysql`, another running `sqlite3`.', 'Run `CREATE TABLE t (id INT AUTO_INCREMENT);` in both — observe the error in SQLite.', 'Rewrite the same table using standard SQL: `CREATE TABLE t (id INT GENERATED ALWAYS AS IDENTITY);` and test in both.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'A classmate argues: “Since SQL is a standard, any SQL code I write in MySQL will run unchanged on PostgreSQL, Oracle, or SQL Server.” Evaluate this claim and.', answer: 'The claim is false',
                  options: ['The claim is false', 'SQL and MySQL are the same thing', '“SQL and MySQL are the same thing” and use the terms interchangeably'],
                  hint: 'If the student cannot visualise tables, have them create a paper-based "participants" sheet with 5.',
                  misconception: 'Students often think “SQL and MySQL are the same thing” and use the terms interchangeably.' }
          ],
            remediations: { 'sql-and-mysql-are-the': { steps: ['Revisit the definition: write “SQL = Language Standard” and “MySQL = One RDBMS Product” on a sticky note.', 'Open two terminal windows: one running `mysql`, another running `sqlite3`.', 'Run `CREATE TABLE t (id INT AUTO_INCREMENT);` in both — observe the error in SQLite.', 'Rewrite the same table using standard SQL: `CREATE TABLE t (id INT GENERATED ALWAYS AS IDENTITY);` and test in both.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_002', difficulty: 'standard',
          question: 'DDL (Data Definition Language) commands are SQL statements used to define.',
          hint: 'If stuck on data type selection, revisit the data type classification activity.',
          misconception: 'Students believe that ALTER TABLE ... MODIFY COLUMN can rename a column.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between ALTER TABLE ... ADD COLUMN and ALTER TABLE ... MODIFY COLUMN in MySQL. Provide a scenario where you would use each.', answer: 'ADD COLUMN creates a new column in an existing table (e.g., adding \'email\' to',
                  options: ['ADD COLUMN creates a new column in an existing table (e.g., adding \'email\' to', 'rename column', 'swaps them or says MODIFY adds a column shows misunderstanding of structural vs', 'ALTER TABLE'],
                  hint: 'If stuck on data type selection, revisit the data type classification activity.',
                  misconception: 'Students believe that ALTER TABLE ... MODIFY COLUMN can rename a column.' },
                { id: 'b', prompt: 'Write a MySQL statement to create a table named \'Employee\' with columns: EmpID (integer, primary key), Name (variable character, max 50, not null), Salary.', answer: 'CREATE TABLE Employee (EmpID INT PRIMARY KEY, Name VARCHAR(50) NOT NULL, Salary',
                  options: ['CREATE TABLE Employee (EmpID INT PRIMARY KEY, Name VARCHAR(50) NOT NULL, Salary', 'rename column', 'ALTER TABLE'],
                  hint: 'If stuck on data type selection, revisit the data type classification activity.',
                  misconception: 'Students believe that ALTER TABLE ... MODIFY COLUMN can rename a column.' }
          ],
            remediations: { 'alter-table': { steps: ['If the student confuses MODIFY vs CHANGE, have them: (1) Revisit c12_cs_cbse_05_001 (Introduction to SQL) to review.', '(2) Practice two mini-tasks: (a) Change data type of \'Age\' from INT to SMALLINT using MODIFY.', '(b) Rename \'Age\' to \'StudentAge\' using CHANGE.', '(3) Run both in MySQL and observe DESC Student output.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_003', difficulty: 'standard',
          question: 'DML (Data Manipulation Language) commands are SQL statements used to add.',
          hint: 'If stuck on constraint violations during INSERT/UPDATE, revisit c12_cs_cbse_05_002.',
          misconception: 'Students believe that `UPDATE` and `DELETE` without a `WHERE` clause produce an error or prompt for confirmation.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement `UPDATE Student SET Class = \'XII\' WHERE AdmNo = 105;` is safer than `UPDATE Student SET Class = \'XII\';` and describe the exact.', answer: 'The first statement updates ONLY the row where AdmNo = 105 (at most one row',
                  options: ['The first statement updates ONLY the row where AdmNo = 105 (at most one row', 'both do the same thing', 'the second gives an error'],
                  hint: 'If stuck on constraint violations during INSERT/UPDATE, revisit c12_cs_cbse_05_002 to review how.',
                  misconception: 'Students believe that `UPDATE` and `DELETE` without a `WHERE` clause produce an error or prompt for confirmation.' }
          ],
            remediations: { 'update-and-delete-without-a': { steps: ['Revisit the concept of "implicit vs explicit column list in INSERT" using node c12_cs_cbse_05_003 prerequisite.', 'Practice writing UPDATE/DELETE with and without WHERE on a 5-row test table; count affected rows each time.', 'Create a cheat-sheet: "No WHERE = All Rows" in bold red.', 'Re-attempt Diagnostic Questions 2 and 5 until you can explain the zero-row case without hesitation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_004', difficulty: 'standard',
          question: 'The SELECT statement in SQL is used to retrieve data from one or more database.',
          hint: 'If stuck, revisit c12_cs_cbse_05_001 (Introduction to SQL and MySQL) to review table.',
          misconception: 'Students often think that `SELECT *` is always the best practice because it\'s shorter.',
          parts: [
                { id: 'a', prompt: 'What is the basic syntax of a SELECT statement to retrieve all columns from a table named \'students\'?', answer: 'The correct syntax is `SELECT * FROM students;`',
                  options: ['The correct syntax is `SELECT * FROM students;`', '`SELECT *` is always the best practice'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_001 (Introduction to SQL and MySQL) to review table structure and.',
                  misconception: 'Students often think that `SELECT *` is always the best practice because it\'s shorter.' },
                { id: 'b', prompt: 'Explain the difference between `SELECT * FROM employees;` and `SELECT emp_name, salary FROM employees;` in terms of the result set.', answer: 'The first returns all columns for every row',
                  options: ['The first returns all columns for every row', '`SELECT *` is always the best practice'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_001 (Introduction to SQL and MySQL) to review table structure and.',
                  misconception: 'Students often think that `SELECT *` is always the best practice because it\'s shorter.' },
                { id: 'c', prompt: 'Compare the output of `SELECT DISTINCT city FROM customers;` vs `SELECT city FROM customers;` when the customers table has duplicate city values.', answer: '`SELECT city` returns all rows including duplicates',
                  options: ['`SELECT city` returns all rows including duplicates', '`SELECT *` is always the best practice'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_001 (Introduction to SQL and MySQL) to review table structure and.',
                  misconception: 'Students often think that `SELECT *` is always the best practice because it\'s shorter.' }
          ],
            remediations: { 'select-is-always-the-best': { steps: ['If a student insists on using `SELECT *` everywhere, have them run a query on a large table (e.g., 10,000 rows) with.', 'Then ask them to modify a query that breaks when a new column is added to the table (e.g., a view or application.', 'This concrete demonstration shows the practical downside.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_005', difficulty: 'standard',
          question: 'The WHERE clause in SQL is a filtering mechanism that specifies conditions.',
          hint: 'Review the truth table for AND/OR/NOT with UNKNOWN (from Mathematical Reasoning, Class.',
          misconception: 'Students write `WHERE column = NULL` to check for missing values, believing NULL equals NULL.',
          parts: [
                { id: 'a', prompt: 'What is the result of the condition `WHERE marks BETWEEN 40 AND 50` for a row where marks = 50?', answer: 'The row is included',
                  options: ['The row is included', 'excluded', 'depends on database'],
                  hint: 'Review the truth table for AND/OR/NOT with UNKNOWN (from Mathematical Reasoning, Class 11) and.',
                  misconception: 'Students write `WHERE column = NULL` to check for missing values, believing NULL equals NULL.' },
                { id: 'b', prompt: 'A table `orders` has columns `order_date` (DATE) and `amount` (DECIMAL).', answer: 'Both conditions exclude the row',
                  options: ['Both conditions exclude the row', 'Condition 1 includes 29th'],
                  hint: 'Review the truth table for AND/OR/NOT with UNKNOWN (from Mathematical Reasoning, Class 11) and.',
                  misconception: 'Students write `WHERE column = NULL` to check for missing values, believing NULL equals NULL.' }
          ],
            remediations: { 'students-write-where-column-null': { steps: ['Revisit the concept of three-valued logic using a truth table for `=`, `IS`, `IS NOT` with NULL.', 'Practice 5 queries on a table with deliberate NULLs — predict output, run in MySQL, compare.', 'Complete the re-diagnostic: "Write a query to find rows where `discount` is missing OR `discount > 10`" — verify the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_006', difficulty: 'standard',
          question: 'Aggregate functions in SQL perform calculations on a set of values from.',
          hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE.',
          misconception: 'Students believe AVG(column) = SUM(column) / COUNT(*) — i.e., they think NULLs are treated as zeros in the denominator.',
          parts: [
                { id: 'a', prompt: 'What is the result of COUNT(*) versus COUNT(column_name) when the column contains NULL values in some rows?', answer: 'COUNT(*) counts ALL rows including those with NULL in any column',
                  options: ['COUNT(*) counts ALL rows including those with NULL in any column', 'both give same result', 'AVG(column) = SUM(column) / COUNT(*)', 'NULLs are treated as zeros in the denominator'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE clause).',
                  misconception: 'Students believe AVG(column) = SUM(column) / COUNT(*) — i.e., they think NULLs are treated as zeros in the denominator.' },
                { id: 'b', prompt: 'A table SALES has 10 rows. The AMOUNT column has values: 100, 200, NULL, 400, 500, NULL, 700, 800, 900, 1000. What will AVG(AMOUNT) return?', answer: 'AVG(AMOUNT) = (100+200+400+500+700+800+900+1000)/8 = 4600/8 = 575',
                  options: ['AVG(AMOUNT) = (100+200+400+500+700+800+900+1000)/8 = 4600/8 = 575', 'AVG(column) = SUM(column) / COUNT(*)', 'NULLs are treated as zeros in the denominator'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE clause).',
                  misconception: 'Students believe AVG(column) = SUM(column) / COUNT(*) — i.e., they think NULLs are treated as zeros in the denominator.' },
                { id: 'c', prompt: 'Write a query to find the total salary paid to employees in department \'IT\' from an EMPLOYEE table with columns EMP_ID, NAME, DEPT, SALARY.', answer: 'SELECT SUM(SALARY) FROM EMPLOYEE WHERE DEPT = \'IT\'',
                  options: ['SELECT SUM(SALARY) FROM EMPLOYEE WHERE DEPT = \'IT\'', 'AVG(column) = SUM(column) / COUNT(*)', 'NULLs are treated as zeros in the denominator'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE clause).',
                  misconception: 'Students believe AVG(column) = SUM(column) / COUNT(*) — i.e., they think NULLs are treated as zeros in the denominator.' },
                { id: 'd', prompt: 'Compare the output of MAX(MARKS) and MIN(MARKS) when all MARKS values are NULL. What does each return?', answer: 'Both MAX and MIN return NULL when all values are NULL (or table is empty)',
                  options: ['Both MAX and MIN return NULL when all values are NULL (or table is empty)', 'NULL = 0', 'AVG(column) = SUM(column) / COUNT(*)', 'NULLs are treated as zeros in the denominator'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE clause).',
                  misconception: 'Students believe AVG(column) = SUM(column) / COUNT(*) — i.e., they think NULLs are treated as zeros in the denominator.' }
          ],
            remediations: { 'avg-column-sum-column-count': { steps: ['Revisit c12_cs_cbse_05_004 (SELECT basics) to ensure row/column selection is clear.', 'Create a 5-row table with intentional NULLs in a numeric column.', 'Run all five aggregate functions with and without WHERE, then with DISTINCT.', 'Manually compute each result on paper, explicitly writing "NULL ignored" or "NULL counted" for each row.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
