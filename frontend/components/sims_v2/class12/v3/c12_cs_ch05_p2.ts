import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch05_p2: SimDef = {
    id: 'v3_c12_cs_ch05_p2',
    title: 'SQL · Part 2/2',
    subtitle: 'MySQL isn\'t a language — and that mix-up costs marks',
    classLevel: 12, subject: 'computer_science', topic: 'SQL · Part 2/2',
    chapters: ['c12_cs_ch05'],
    nodeIds: ['c12_cs_cbse_05_007', 'c12_cs_cbse_05_008', 'c12_cs_cbse_05_009', 'c12_cs_cbse_05_010', 'c12_cs_cbse_05_011', 'c12_cs_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Backend developer', intro: 'Every app\'s memory is a database, and SQL is how you talk to it. Learn the language, pick the engine, done.', goal: 'Distinguish SQL from MySQL and write CREATE, INSERT and SELECT statements with correct data types.' },
    discovery: {
        question: 'A teammate announces, \'I\'m going to learn MySQL — the language all databases speak.\' Spot the error in ten words or less.',
        options: ['MySQL is the software; SQL is the language it speaks', 'None — MySQL IS the language', 'MySQL is the database file itself', 'SQL only works inside MySQL anyway'],
        answer: 'MySQL is the software; SQL is the language it speaks',
        hook: 'SQL is an ANSI/ISO standard language; MySQL is one RDBMS that implements it — like grammar vs one particular book. Mixing them up is why students say \'MySQL query\' when they mean SQL, and why CHAR vs VARCHAR for a 10-digit phone number stumps them.',
    },
    teaching: [
        { title: 'SQL Functions: String and Date Functions', text: 'SQL string functions manipulate character data (e.g., changing case, extracting substrings, trimming spaces, concatenating), while date functions extract or transform temporal data (e.g., year.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Speak to a database: create the school-fest schema, pick data types that enforce integrity (why CHAR(10) beats VARCHAR for mobiles), insert real rows, and graduate to SELECT, WHERE, ORDER BY and friends.',
        labels: ['SQL Functions: String', 'ORDER BY and GROUP', 'HAVING Clause vs WHERE', 'SQL JOIN: INNER JOIN', 'SQL JOIN: LEFT, RIGHT', 'Subqueries in SQL'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_007', title: 'SQL Functions: String and Date Functions',
          caseStudy: { intro: 'Imagine you have a school database where student names are stored inconsistently — some in uppercase, some with extra spaces, and birthdates stored as DATE.',
            decisions: [{ prompt: 'List four MySQL string functions and one date function that extracts the year from a date.', options: [
                { text: 'Correct answer: String functions', outcome: 'Correct answer: String functions — UPPER, LOWER, SUBSTRING, TRIM, CONCAT, LENGTH, LEFT, RIGHT (any.' },
                { text: 'SUBSTR instead of SUBSTRING, or using EXTRACT(YEAR FROM date', outcome: 'Not quite — Students believe `SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java.', reveals: 'substring-str' },
                { text: '`SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java', outcome: 'Not quite — Students believe `SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java.', reveals: 'substring-str' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_008', title: 'ORDER BY and GROUP BY Clauses',
          caseStudy: { intro: 'Imagine you are the data analyst for a school\'s annual sports day. You have a table `RESULTS` with columns: `Event`, `StudentName`, `House`, `TimeSec`.',
            decisions: [{ prompt: 'What is the default sort order when you write `ORDER BY column_name` without specifying ASC or DESC?', options: [
                { text: 'The default sort order is ASC (ascending)', outcome: 'The default sort order is ASC (ascending). A wrong answer (e.g., "DESC" or "random") reveals the.' },
                { text: 'random', outcome: 'Not quite — Students believe that `GROUP BY` automatically sorts the output by the grouping columns (like.', reveals: 'group-by-automatically-sorts-the' },
                { text: 'guesses', outcome: 'Not quite — Students believe that `GROUP BY` automatically sorts the output by the grouping columns (like.', reveals: 'group-by-automatically-sorts-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_009', title: 'HAVING Clause vs WHERE Clause',
          caseStudy: { intro: 'Imagine you are analysing sales data for a school canteen: you want to find items that sold more than 50 units in total.',
            decisions: [{ prompt: 'What is the fundamental difference between the WHERE clause and the HAVING clause in terms of when they are applied during query execution?', options: [
                { text: 'WHERE filters rows before GROUP BY aggregation', outcome: 'WHERE filters rows before GROUP BY aggregation; HAVING filters groups after aggregation.' },
                { text: 'both filter rows', outcome: 'Not quite — Students often think HAVING is just a "WHERE for groups" and can replace WHERE entirely.', reveals: 'having-is-just-a-where' },
                { text: 'WHERE for groups', outcome: 'Not quite — Students often think HAVING is just a "WHERE for groups" and can replace WHERE entirely.', reveals: 'having-is-just-a-where' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_011', title: 'SQL JOIN: LEFT, RIGHT and CROSS JOIN',
          caseStudy: { intro: 'Imagine a school database with two tables: `Students` (StudentID, Name) and `Enrollments` (EnrollmentID, StudentID, CourseName).',
            decisions: [{ prompt: 'What is the key difference between INNER JOIN and LEFT JOIN in terms of rows returned from the left table?', options: [
                { text: 'INNER JOIN returns only rows from the left table that have a matching row in the right', outcome: 'INNER JOIN returns only rows from the left table that have a matching row in the right table based.' },
                { text: 'LEFT JOIN returns only matching rows', outcome: 'Not quite — Students often believe that LEFT JOIN and RIGHT JOIN are symmetric and produce identical results.', reveals: 'left-join-and-right-join' },
                { text: 'preserve left table', outcome: 'Not quite — Students often believe that LEFT JOIN and RIGHT JOIN are symmetric and produce identical results.', reveals: 'left-join-and-right-join' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_012', title: 'Subqueries in SQL',
          caseStudy: { intro: 'Imagine you run a small online bookstore and want to find all customers who have spent more than the average order value.',
            decisions: [{ prompt: 'What is the syntactic difference between a non-correlated subquery and a correlated subquery in the WHERE clause?', options: [
                { text: 'A non-correlated subquery does not reference any column from the outer query and executes', outcome: 'A non-correlated subquery does not reference any column from the outer query and executes.' },
                { text: 'both reference outer columns', outcome: 'Not quite — Students often think `NOT IN (subquery)` is the direct opposite of `IN (subquery)` and works.', reveals: 'not-in-subquery-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Migrating a school project from MySQL to PostgreSQL, a student copies her script over unchanged — \'SQL is a standard, so it\'ll just run\' — and watches it fail on `AUTO_INCREMENT` and `LIMIT`.',
            decisions: [{ prompt: 'Why did the \'standard\' SQL break?', options: [
                { text: 'The standard covers core SELECT/INSERT/CREATE, but every RDBMS bolts on its own syntax — AUTO_INCREMENT vs SERIAL, LIMIT vs FETCH FIRST, backticks vs double quotes — so porting means translating the dialect.', outcome: 'SQL is the language, MySQL is one product speaking it with an accent; the script needs dialect conversion, not blind copying.' },
                { text: 'SQL and MySQL are two names for the same thing, so \'MySQL queries\' are inherently portable.', outcome: 'SQL is the language standard; MySQL is one implementation — conflating them hides exactly the proprietary features that broke.', reveals: 'sql-equals-mysql' },
                { text: 'PostgreSQL must be buggy — standard-compliant SQL can\'t fail.', outcome: 'AUTO_INCREMENT and backticks are MySQL-only extensions; the failures mark non-standard syntax, not a faulty server.', reveals: 'standard-means-fully-portable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'You can now build a table that refuses bad data and query it like a pro. SQL is the single most-employed skill in this entire subject.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_007', difficulty: 'standard',
          question: 'SQL string functions manipulate character data (e.g., changing case, extracting.',
          hint: 'If stuck, review c12_cs_cbse_05_004 (SELECT Statement) for query structure and.',
          misconception: 'Students believe `SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java.',
          parts: [
                { id: 'a', prompt: 'List four MySQL string functions and one date function that extracts the year from a date.', answer: 'Correct answer: String functions',
                  options: ['Correct answer: String functions', 'SUBSTR instead of SUBSTRING, or using EXTRACT(YEAR FROM date', '`SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java'],
                  hint: 'If stuck, review c12_cs_cbse_05_004 (SELECT Statement) for query structure and c12_cs_cbse_05_006.',
                  misconception: 'Students believe `SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java.' }
          ],
            remediations: { 'substring-str': { steps: ['Revisit the concept of 1-based indexing: create a mini-table `SELECT SUBSTRING(\'HELLO\', n, 1) FOR n=1..5` and observe.', 'Practice `DATE_FORMAT` with a fixed date literal and list all format specifiers from the MySQL manual; build a cheat.', 'For name splitting, write a step-by-step query: first select `name`, `INSTR(name, \' \')`, `SUBSTRING_INDEX(name, \' \'.', 'Re-do Diagnostic Questions 2 and 4 after this practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java.',
          parts: [
                { id: 'a', prompt: 'A query uses `WHERE MONTH(dob) = 1` to find January births. Another uses `WHERE dob LIKE \'____-01-%\'`. Evaluate which is better and why.', answer: 'Correct answer: `MONTH(dob) = 1` is better',
                  options: ['Correct answer: `MONTH(dob) = 1` is better', 'it\'s simpler', '`SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java'],
                  hint: 'If stuck, review c12_cs_cbse_05_004 (SELECT Statement) for query structure and c12_cs_cbse_05_006.',
                  misconception: 'Students believe `SUBSTRING(str, pos, len)` uses 0-based indexing like Python/Java.' }
          ],
            remediations: { 'substring-str': { steps: ['Revisit the concept of 1-based indexing: create a mini-table `SELECT SUBSTRING(\'HELLO\', n, 1) FOR n=1..5` and observe.', 'Practice `DATE_FORMAT` with a fixed date literal and list all format specifiers from the MySQL manual; build a cheat.', 'For name splitting, write a step-by-step query: first select `name`, `INSTR(name, \' \')`, `SUBSTRING_INDEX(name, \' \'.', 'Re-do Diagnostic Questions 2 and 4 after this practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_008', difficulty: 'standard',
          question: 'The ORDER BY clause sorts the result set of a query in ascending (ASC).',
          hint: 'If confused about grouping, revisit the concept of "frequency table" from Class 11.',
          misconception: 'Students believe that `GROUP BY` automatically sorts the output by the grouping columns (like `ORDER BY`).',
          parts: [
                { id: 'a', prompt: 'What is the default sort order when you write `ORDER BY column_name` without specifying ASC or DESC?', answer: 'The default sort order is ASC (ascending)',
                  options: ['The default sort order is ASC (ascending)', 'random', 'guesses'],
                  hint: 'If confused about grouping, revisit the concept of "frequency table" from Class 11 Statistics.',
                  misconception: 'Students believe that `GROUP BY` automatically sorts the output by the grouping columns (like `ORDER BY`).' },
                { id: 'b', prompt: 'Two queries are given: ```sql -- Query A SELECT DeptID, AVG(Salary) FROM EMP GROUP BY DeptID ORDER BY AVG(Salary) DESC; -- Query B SELECT DeptID, AVG(Salary).', answer: 'Yes, they are equivalent',
                  options: ['Yes, they are equivalent', 'they are identical and positional is better', 'which is better practice'],
                  hint: 'If confused about grouping, revisit the concept of "frequency table" from Class 11 Statistics.',
                  misconception: 'Students believe that `GROUP BY` automatically sorts the output by the grouping columns (like `ORDER BY`).' }
          ],
            remediations: { 'group-by-automatically-sorts-the': { steps: ['Revisit `c12_cs_cbse_05_004` (SELECT basics) and `c12_cs_cbse_05_006` (aggregate functions) to ensure row vs group.', 'Run this exact experiment in MySQL: ```sql CREATE TABLE T(A INT, B INT); INSERT INTO T VALUES (2,10),(1,20),(2,30).', 'Re-attempt Diagnostic Question 2 and 4.', 'If still confused, review `c12_cs_cbse_05_009` (HAVING vs WHERE) next.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_009', difficulty: 'standard',
          question: 'The WHERE clause filters individual rows before any grouping occurs, while the.',
          hint: 'If stuck, revisit the logical order of SQL execution (FROM → WHERE → GROUP BY → HAVING →.',
          misconception: 'Students often think HAVING is just a "WHERE for groups" and can replace WHERE entirely.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between the WHERE clause and the HAVING clause in terms of when they are applied during query execution?', answer: 'WHERE filters rows before GROUP BY aggregation',
                  options: ['WHERE filters rows before GROUP BY aggregation', 'both filter rows', 'WHERE for groups', 'HAVING is just a "WHERE for groups" and can replace WHERE entirely'],
                  hint: 'If stuck, revisit the logical order of SQL execution (FROM → WHERE → GROUP BY → HAVING → SELECT).',
                  misconception: 'Students often think HAVING is just a "WHERE for groups" and can replace WHERE entirely.' },
                { id: 'b', prompt: 'Explain why the query `SELECT department, AVG(salary) FROM employees WHERE AVG(salary) > 50000 GROUP BY department;` produces an error, and how to fix it.', answer: 'WHERE cannot use aggregate functions',
                  options: ['WHERE cannot use aggregate functions', 'use WHERE with a subquery', 'WHERE for groups', 'HAVING is just a "WHERE for groups" and can replace WHERE entirely'],
                  hint: 'If stuck, revisit the logical order of SQL execution (FROM → WHERE → GROUP BY → HAVING → SELECT).',
                  misconception: 'Students often think HAVING is just a "WHERE for groups" and can replace WHERE entirely.' },
                { id: 'c', prompt: 'Compare the result sets of these two queries on the same table: Query A: `SELECT dept, COUNT(*) FROM emp WHERE salary > 30000 GROUP BY dept;` Query B: `SELECT.', answer: 'Query A counts employees per department who individually earn >30000',
                  options: ['Query A counts employees per department who individually earn >30000', 'WHERE for groups', 'HAVING is just a "WHERE for groups" and can replace WHERE entirely'],
                  hint: 'If stuck, revisit the logical order of SQL execution (FROM → WHERE → GROUP BY → HAVING → SELECT).',
                  misconception: 'Students often think HAVING is just a "WHERE for groups" and can replace WHERE entirely.' }
          ],
            remediations: { 'having-is-just-a-where': { steps: ['Revisit node c12_cs_cbse_05_005 (WHERE Clause) and c12_cs_cbse_05_008 (GROUP BY) to reinforce row-level filtering and.', 'Draw the SQL execution order flowchart: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 'Practice 5 queries: two with only WHERE, two with only HAVING, one with both.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4; if still incorrect, review aggregate function rules.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_010', difficulty: 'standard',
          question: 'An INNER JOIN in SQL combines rows from two or more tables based on a matching.',
          hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE.',
          misconception: 'Students often believe that INNER JOIN returns all rows from the first (left) table and fills non-matching columns with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An INNER JOIN in SQL combines rows from two or more tables based on a matching column',
                  options: ['An INNER JOIN in SQL combines rows from two or more tables based on a matching column', 'SQL (Structured Query Language) is a standardized programming language used to manage and', 'DDL (Data Definition Language) commands are SQL statements used to define, modify, and', 'DML (Data Manipulation Language) commands are SQL statements used to add, modify, or'],
                  hint: 'If stuck, revisit c12_cs_cbse_05_004 (SELECT basics) and c12_cs_cbse_05_005 (WHERE clause).',
                  misconception: 'Students often believe that INNER JOIN returns all rows from the first (left) table and fills non-matching columns with NULL — this.' }
          ],
            remediations: { 'inner-join-returns-all-rows': { steps: ['Revisit the Venn diagram representation: draw two overlapping circles labelled Table A and Table B, shade only the.', 'Take a concrete example with 3 rows each, manually trace the matching.', 'Rewrite the INNER JOIN query using the old comma+WHERE syntax to see the equivalence.', 'Then attempt Diagnostic Question 4 again; if still wrong, review c12_cs_cbse_05_004 (basic SELECT) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_011', difficulty: 'standard',
          question: 'LEFT JOIN returns all rows from the left table and matching rows from the right.',
          hint: 'Review INNER JOIN examples from node `c12_cs_cbse_05_010` and practice writing queries.',
          misconception: 'Students often believe that LEFT JOIN and RIGHT JOIN are symmetric and produce identical results regardless of table.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'LEFT JOIN returns all rows from the left table and matching rows from the right table,',
                  options: ['LEFT JOIN returns all rows from the left table and matching rows from the right table,', 'SQL (Structured Query Language) is a standardized programming language used to manage and', 'DDL (Data Definition Language) commands are SQL statements used to define, modify, and', 'DML (Data Manipulation Language) commands are SQL statements used to add, modify, or'],
                  hint: 'Review INNER JOIN examples from node `c12_cs_cbse_05_010` and practice writing queries that join.',
                  misconception: 'Students often believe that LEFT JOIN and RIGHT JOIN are symmetric and produce identical results regardless of table order, so they write.' }
          ],
            remediations: { 'left-join-and-right-join': { steps: ['If the student confuses LEFT/RIGHT JOIN preservation, have them draw two circles (Venn diagram) labeling left and right.', 'Then give a concrete 3-row vs 2-row example and ask them to trace each row.', 'For CROSS JOIN confusion, have them compute 3×2 manually on paper, then run the query to verify 6 rows.', 'Revisit prerequisite node `c12_cs_cbse_05_010` (INNER JOIN) to contrast the "matching only" behavior with "preserve.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_05_012', difficulty: 'standard',
          question: 'A subquery (inner query) is a SELECT statement nested inside another SQL.',
          hint: 'Review c12_cs_cbse_05_006 (aggregate functions) and c12_cs_cbse_05_010 (INNER JOIN) with.',
          misconception: 'Students often think `NOT IN (subquery)` is the direct opposite of `IN (subquery)` and works identically with NULLs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A subquery (inner query) is a SELECT statement nested inside another SQL statement (outer',
                  options: ['A subquery (inner query) is a SELECT statement nested inside another SQL statement (outer', 'SQL (Structured Query Language) is a standardized programming language used to manage and', 'DDL (Data Definition Language) commands are SQL statements used to define, modify, and', 'DML (Data Manipulation Language) commands are SQL statements used to add, modify, or'],
                  hint: 'Review c12_cs_cbse_05_006 (aggregate functions) and c12_cs_cbse_05_010 (INNER JOIN) with practice.',
                  misconception: 'Students often think `NOT IN (subquery)` is the direct opposite of `IN (subquery)` and works identically with NULLs.' }
          ],
            remediations: { 'not-in-subquery-is-the': { steps: ['Revisit the concept of three-valued logic (TRUE, FALSE, UNKNOWN) from Class 11 logic nodes (c11_math_cbse_14_001.', 'Practice writing both IN and NOT IN subqueries on a sample table with deliberate NULLs; observe the result.', 'Rewrite each NOT IN as NOT EXISTS and verify they match when NULLs are present.', 'Re-attempt Diagnostic Question 2 and 3; if still incorrect, review the truth table for NOT IN with NULL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
