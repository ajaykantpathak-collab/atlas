import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch01_p2: SimDef = {
    id: 'v3_c12_ip_ch01_p2',
    title: 'Database Query Using SQL · Part 2/2',
    subtitle: 'FLOAT lost the paise — DECIMAL keeps them honest',
    classLevel: 12, subject: 'informatics_practices', topic: 'Database Query Using SQL · Part 2/2',
    chapters: ['c12_ip_ch01'],
    nodeIds: ['c12_ip_cbse_01_007', 'c12_ip_cbse_01_008', 'c12_ip_cbse_01_009', 'c12_ip_cbse_01_010', 'c12_ip_cbse_01_011', 'c12_ip_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Database designer', intro: 'Every column type is a promise about what values are legal — and what the storage bill will be.', goal: 'Choose MySQL data types by range, precision and storage — money exact, dates ranged, strings honest.' },
    discovery: {
        question: 'A canteen balance stored as FLOAT quietly drifts paise across a thousand transactions — ₹12345.67 becomes 12345.6700000001. What should the column have been?',
        options: ['DECIMAL(10,2) — fixed-point stores money exactly; FLOAT\'s binary approximation accumulates errors that audits will find', 'DOUBLE — more precision', 'INT — store paise', 'VARCHAR — store text'],
        answer: 'DECIMAL(10,2) — fixed-point stores money exactly; FLOAT\'s binary approximation accumulates errors that audits will find',
        hook: '\'VARCHAR always saves space\' fails on a 10-digit mobile — the length-prefix byte makes it bigger than CHAR(10). And a PIN code isn\'t a number: leading zeros matter, and nobody sums PINs. The smallest safe type is a design decision, not a default.',
    },
    teaching: [
        { title: 'ORDER BY and LIMIT: sorting and restricting result sets', text: 'The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order based on one or more columns; the LIMIT clause restricts the number of rows returned, optionally with an OFFSET.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design a schema that respects reality: pick types for balance, recharge date, status code and notes; weigh TIMESTAMP\'s 1970 floor against DATETIME\'s reach; and defend CHAR for data that never varies.',
        labels: ['ORDER BY and LIMIT', 'JOIN operations: INNER JOIN', 'Subqueries: nested SELECT inside', 'HAVING clause: filtering groups', 'UPDATE and DELETE: modifying', 'SQL functions: math, string,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_008', title: 'JOIN operations: INNER JOIN across two tables on a key',
          caseStudy: { intro: 'Imagine you run a car showroom and have two separate lists: one list of all cars in inventory (with CarId, Model, Price) and another list of all sales made.',
            decisions: [{ prompt: 'What is the fundamental difference between a Cartesian product of two tables and an INNER JOIN on a common key?', options: [
                { text: 'A Cartesian product combines every row of the first table with every row of the second', outcome: 'A Cartesian product combines every row of the first table with every row of the second table.' },
                { text: 'they are the same', outcome: 'Not quite — Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join.', reveals: 'students-frequently-write-select-from' },
                { text: 'JOIN adds a WHERE clause', outcome: 'Not quite — Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join.', reveals: 'students-frequently-write-select-from' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_009', title: 'Subqueries: nested SELECT inside WHERE and HAVING clauses',
          caseStudy: { intro: 'Imagine you are the manager of the CARSHOWROOM and want to find all cars priced higher than the average price of Petrol cars.',
            decisions: [{ prompt: 'What is the cardinality requirement for a subquery used with the = operator in a WHERE clause, and what error occurs if it returns more.', options: [
                { text: 'The subquery must return exactly one row (single value)', outcome: 'The subquery must return exactly one row (single value). If it returns multiple rows, MySQL throws.' },
                { text: 'it returns the first row', outcome: 'Not quite — Students often write a subquery that returns multiple columns (e.g., `SELECT CarID, Price FROM.', reveals: 'students-often-write-a-subquery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_010', title: 'HAVING clause: filtering groups after aggregation',
          caseStudy: { intro: 'Imagine you are the sales manager of the CARSHOWROOM and you want to identify customers who have purchased more than one car — but you only care about the.',
            decisions: [{ prompt: 'What is the fundamental difference between the WHERE clause and the HAVING clause in terms of when they are applied during query execution?', options: [
                { text: 'WHERE filters individual rows *before* any grouping occurs, so it cannot use aggregate', outcome: 'WHERE filters individual rows *before* any grouping occurs, so it cannot use aggregate functions.' },
                { text: 'Invalid use of group function', outcome: 'Not quite — Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.', reveals: 'having-is-just-a-synonym' },
                { text: 'HAVING is just a synonym for WHERE and can be used interchangeably', outcome: 'Not quite — Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.', reveals: 'having-is-just-a-synonym' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_012', title: 'SQL functions: math, string, and date/time functions',
          caseStudy: { intro: 'Imagine you\'re building a customer dashboard for an Indian e-commerce startup: you need to display user names in proper case, extract the domain from email.',
            decisions: [{ prompt: 'What is the output of SELECT ROUND(283.2) in MySQL, and how does it differ from SELECT ROUND(283.2, 1)?', options: [
                { text: 'ROUND(283.2) returns 283 (rounds to nearest integer when D is omitted or 0), while', outcome: 'ROUND(283.2) returns 283 (rounds to nearest integer when D is omitted or 0), while ROUND(283.2, 1).' },
                { text: 'both return 283', outcome: 'Not quite — Students consistently write SELECT TRIM(\'.com\' FROM email) to remove \'.com\' from email endings, but.', reveals: 'students-consistently-write-select-trim' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a library-issue database for the school fest, your teammate says: \'Skip the SQL constraints — I\'ll just validate everything in the Python form before it inserts.\'',
            decisions: [{ prompt: 'What does the CREATE TABLE constraints design argue?', options: [
                { text: 'Enforce integrity at the table — PRIMARY KEY, FOREIGN KEY with the right delete action, NOT NULL, CHECK and DEFAULT stop bad rows at the database door, so no app bug, script or hand-edited import can ever write an orphan issue record.', outcome: 'The chapter\'s core insight: constraints in the schema guard the data no matter which code path touches it — form validation only guards the paths you remembered to write.' },
                { text: 'Agree — app-level checks are more flexible and you can change rules without touching the schema.', outcome: 'Flexibility is the risk: every new script, import or quick fix bypasses the form\'s rules, while a CHECK or foreign key can\'t be forgotten — the schema is the last line every write must cross.', reveals: 'app-checks-beat-constraints' },
                { text: 'Use constraints but cascade every delete — ON DELETE CASCADE everywhere keeps things clean.', outcome: 'Cascade is for records meaningless without the parent; issue history is an audit trail where SET NULL preserves the record — one referential action for everything deletes the data you needed to keep.', reveals: 'cascade-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'You can now choose data types by constraint, not habit — and catch the penny-sized errors that compound into audit findings.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_007', difficulty: 'standard',
          question: 'The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC).',
          hint: 'If stuck, go back to c12_ip_cbse_01_004 (SELECT statement) and c12_ip_cbse_01_005 (WHERE.',
          misconception: 'Students often believe that LIMIT is applied before ORDER BY, thinking the database first picks N random rows and then.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what the following query does: `SELECT EmpName, Salary FROM EMPLOYEE ORDER BY Designation ASC, Salary DESC LIMIT 3;`', answer: 'The query first sorts employees by Designation in alphabetical order (A–Z)',
                  options: ['The query first sorts employees by Designation in alphabetical order (A–Z)', 'sorts by Salary first'],
                  hint: 'If stuck, go back to c12_ip_cbse_01_004 (SELECT statement) and c12_ip_cbse_01_005 (WHERE clause).',
                  misconception: 'Students often believe that LIMIT is applied before ORDER BY, thinking the database first picks N random rows and then sorts them.' }
          ],
            remediations: { 'limit-is-applied-before-order': { steps: ['Revisit the SELECT statement node (c12_ip_cbse_01_004) and practice simple queries without sorting.', 'Review the WHERE clause node (c12_ip_cbse_01_005) to ensure filtering works.', 'Write five queries on the INVENTORY table: (a) sort by Price ASC, (b) sort by Price DESC, (c) sort by FuelType ASC then.', 'After each query, predict the row count and first row values before executing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_008', difficulty: 'standard',
          question: 'An INNER JOIN combines rows from two tables by matching values in a common.',
          hint: 'Revisit Class 11 nodes c11_ip_cbse_07_003 (keys), c11_ip_cbse_07_009 (SELECT), and.',
          misconception: 'Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join in WHERE) and.',
          parts: [
                { id: 'a', prompt: 'Consider two tables: `STUDENT(AdmNo, Name, StCode)` and `STREAM(StCode, StreamName)`. `StCode` is the primary key in STREAM and a foreign key in STUDENT.', answer: 'MySQL will execute a Cartesian product (cross join)',
                  options: ['MySQL will execute a Cartesian product (cross join)', 'it will give an error', 'it will automatically match on StCode', 'ambiguous column'],
                  hint: 'Revisit Class 11 nodes c11_ip_cbse_07_003 (keys), c11_ip_cbse_07_009 (SELECT), and.',
                  misconception: 'Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join in WHERE) and believe this.' },
                { id: 'b', prompt: 'Table A has 10 rows, Table B has 5 rows. The join column in Table A has 10 distinct values; in Table B it has 5 distinct values, all of which appear in Table.', answer: 'First case: 5 rows',
                  options: ['First case: 5 rows', '3 rows in the second case', 'ambiguous column'],
                  hint: 'Revisit Class 11 nodes c11_ip_cbse_07_003 (keys), c11_ip_cbse_07_009 (SELECT), and.',
                  misconception: 'Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join in WHERE) and believe this.' }
          ],
            remediations: { 'students-frequently-write-select-from': { steps: ['If a student confuses implicit vs explicit join syntax: Have them run both versions on the UNIFORM/COST example from.', 'Then ask them to add a filter `WHERE UColor = \'White\'` and show how the explicit syntax keeps the join condition.', 'If they get "ambiguous column" errors: Make them write a query selecting `UCode` without a table alias on the.', 'If they think NATURAL JOIN is "automatic magic": Have them create two tables with a coincidental same-named column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join in WHERE) and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "NATURAL JOIN is always better than JOIN ...', answer: 'The claim is false',
                  options: ['The claim is false', 'ambiguous column'],
                  hint: 'Revisit Class 11 nodes c11_ip_cbse_07_003 (keys), c11_ip_cbse_07_009 (SELECT), and.',
                  misconception: 'Students frequently write `SELECT * FROM Table1, Table2 WHERE Table1.id = Table2.id` (implicit join in WHERE) and believe this.' }
          ],
            remediations: { 'students-frequently-write-select-from': { steps: ['If a student confuses implicit vs explicit join syntax: Have them run both versions on the UNIFORM/COST example from.', 'Then ask them to add a filter `WHERE UColor = \'White\'` and show how the explicit syntax keeps the join condition.', 'If they get "ambiguous column" errors: Make them write a query selecting `UCode` without a table alias on the.', 'If they think NATURAL JOIN is "automatic magic": Have them create two tables with a coincidental same-named column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_009', difficulty: 'standard',
          question: 'A subquery (nested query) is a SELECT statement embedded within another SQL.',
          hint: 'If stuck, review c12_ip_cbse_01_006 (aggregate functions) and c12_ip_cbse_01_010 (HAVING).',
          misconception: 'Students often write a subquery that returns multiple columns (e.g., `SELECT CarID, Price FROM INVENTORY WHERE ...`).',
          parts: [
                { id: 'a', prompt: 'What is the cardinality requirement for a subquery used with the = operator in a WHERE clause, and what error occurs if it returns more than one row?', answer: 'The subquery must return exactly one row (single value)',
                  options: ['The subquery must return exactly one row (single value)', 'it returns the first row'],
                  hint: 'If stuck, review c12_ip_cbse_01_006 (aggregate functions) and c12_ip_cbse_01_010 (HAVING).',
                  misconception: 'Students often write a subquery that returns multiple columns (e.g., `SELECT CarID, Price FROM INVENTORY WHERE ...`) and use it with.' },
                { id: 'b', prompt: 'Explain in your own words why a subquery in a HAVING clause can reference an aggregate function from the outer query\'s grouping, but a subquery in a WHERE.', answer: 'WHERE filters rows before grouping, so aggregate functions are not yet computed',
                  options: ['WHERE filters rows before grouping, so aggregate functions are not yet computed', 'both can use aggregates'],
                  hint: 'If stuck, review c12_ip_cbse_01_006 (aggregate functions) and c12_ip_cbse_01_010 (HAVING).',
                  misconception: 'Students often write a subquery that returns multiple columns (e.g., `SELECT CarID, Price FROM INVENTORY WHERE ...`) and use it with.' }
          ],
            remediations: { 'students-often-write-a-subquery': { steps: ['Revisit c12_ip_cbse_01_006 (aggregate functions) to remember that AVG, SUM etc.', 'return a single value per group.', 'Practice writing standalone inner queries first, run them, and verify they return exactly one column and the expected.', 'Use the "scalar subquery" pattern: `WHERE col = (SELECT single_col FROM ...)` and test with a subquery that returns two.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_010', difficulty: 'standard',
          question: 'The HAVING clause in SQL is used to filter groups of rows after aggregation.',
          hint: 'If stuck, review `c12_ip_cbse_01_006` (Aggregate Functions) and practice writing GROUP.',
          misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Compare the following two queries and explain which one will execute successfully and why: Query A: `SELECT CarId, SUM(SalePrice) FROM SALE WHERE.', answer: 'Query B executes successfully',
                  options: ['Query B executes successfully', 'Invalid use of group function', 'HAVING is just a synonym for WHERE and can be used interchangeably'],
                  hint: 'If stuck, review `c12_ip_cbse_01_006` (Aggregate Functions) and practice writing GROUP BY queries.',
                  misconception: 'Students often believe that HAVING is just a synonym for WHERE and can be used interchangeably.' }
          ],
            remediations: { 'having-is-just-a-synonym': { steps: ['Revisit the execution order of a SELECT query: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 'Draw a flowchart showing where aggregates become available.', 'Practice converting a WHERE condition into HAVING by first writing the GROUP BY query, then adding the aggregate.', 'Use the CARSHOWROOM SALE table: write a query that groups by EmpID and shows total sales per employee, then add HAVING.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_011', difficulty: 'standard',
          question: 'The UPDATE statement modifies existing row(s) in a table by assigning new.',
          hint: 'Review WHERE clause patterns in node c12_ip_cbse_01_005, especially IN, BETWEEN, and.',
          misconception: 'Students often believe that UPDATE and DELETE without a WHERE clause produce an error or only affect the first row.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The UPDATE statement modifies existing row(s) in a table by assigning new values to',
                  options: ['The UPDATE statement modifies existing row(s) in a table by assigning new values to', 'MySQL data types define the kind of value a column can store, determining its storage', 'CREATE TABLE is a DDL command that defines a new relation (table) by specifying column', 'The INSERT INTO statement in SQL is a Data Manipulation Language (DML) command used to'],
                  hint: 'Review WHERE clause patterns in node c12_ip_cbse_01_005, especially IN, BETWEEN, and compound.',
                  misconception: 'Students often believe that UPDATE and DELETE without a WHERE clause produce an error or only affect the first row.' }
          ],
            remediations: { 'update-and-delete-without-a': { steps: ['If a student omits WHERE or uses wrong condition syntax: 1) Have them run a SELECT with the intended condition first.', '2) Then write the UPDATE/DELETE using the *same* WHERE clause.', '3) Practice with a test table (CREATE TABLE test AS SELECT * FROM INVENTORY) so mistakes are harmless.', '4) Reinforce: "No WHERE = every row.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_012', difficulty: 'standard',
          question: 'SQL single-row functions (also called scalar functions) operate on a single.',
          hint: 'If stuck on function syntax or behavior, revisit c12_ip_cbse_01_001 (MySQL Data Types).',
          misconception: 'Students consistently write SELECT TRIM(\'.com\' FROM email) to remove \'.com\' from email endings, but TRIM only removes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SQL single-row functions (also called scalar functions) operate on a single value from',
                  options: ['SQL single-row functions (also called scalar functions) operate on a single value from', 'MySQL data types define the kind of value a column can store, determining its storage', 'CREATE TABLE is a DDL command that defines a new relation (table) by specifying column', 'The INSERT INTO statement in SQL is a Data Manipulation Language (DML) command used to'],
                  hint: 'If stuck on function syntax or behavior, revisit c12_ip_cbse_01_001 (MySQL Data Types) to match.',
                  misconception: 'Students consistently write SELECT TRIM(\'.com\' FROM email) to remove \'.com\' from email endings, but TRIM only removes leading/trailing.' }
          ],
            remediations: { 'students-consistently-write-select-trim': { steps: ['Revisit c12_ip_cbse_01_001 (MySQL Data Types) to confirm which functions apply to which data types — math functions.', 'Practice nested function tracing on paper: write LEFT(email, INSTR(email,\'@\')-1) and evaluate inside-out with a sample.', 'Use MySQL Workbench to run SELECT TRIM(\'.com\' FROM \'test.com\'), observe the wrong output, then run SELECT.', 'Re-attempt Diagnostic Questions 2 and 4 after this remediation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
