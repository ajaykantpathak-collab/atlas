import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch01_p1: SimDef = {
    id: 'v3_c12_ip_ch01_p1',
    title: 'Database Query Using SQL · Part 1/2',
    subtitle: 'FLOAT lost the paise — DECIMAL keeps them honest',
    classLevel: 12, subject: 'informatics_practices', topic: 'Database Query Using SQL · Part 1/2',
    chapters: ['c12_ip_ch01'],
    nodeIds: ['c12_ip_cbse_01_001', 'c12_ip_cbse_01_002', 'c12_ip_cbse_01_003', 'c12_ip_cbse_01_004', 'c12_ip_cbse_01_005', 'c12_ip_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Database designer', intro: 'Every column type is a promise about what values are legal — and what the storage bill will be.', goal: 'Choose MySQL data types by range, precision and storage — money exact, dates ranged, strings honest.' },
    discovery: {
        question: 'A canteen balance stored as FLOAT quietly drifts paise across a thousand transactions — ₹12345.67 becomes 12345.6700000001. What should the column have been?',
        options: ['DECIMAL(10,2) — fixed-point stores money exactly; FLOAT\'s binary approximation accumulates errors that audits will find', 'DOUBLE — more precision', 'INT — store paise', 'VARCHAR — store text'],
        answer: 'DECIMAL(10,2) — fixed-point stores money exactly; FLOAT\'s binary approximation accumulates errors that audits will find',
        hook: '\'VARCHAR always saves space\' fails on a 10-digit mobile — the length-prefix byte makes it bigger than CHAR(10). And a PIN code isn\'t a number: leading zeros matter, and nobody sums PINs. The smallest safe type is a design decision, not a default.',
    },
    teaching: [
        { title: 'MySQL Data Types: Numeric, Date/Time, and String types', text: 'MySQL data types define the kind of value a column can store, determining its storage size, range of permissible values, and the operations allowed on it.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design a schema that respects reality: pick types for balance, recharge date, status code and notes; weigh TIMESTAMP\'s 1970 floor against DATETIME\'s reach; and defend CHAR for data that never varies.',
        labels: ['MySQL Data Types: Numeric,', 'CREATE TABLE and ALTER', 'INSERT INTO: adding single', 'SELECT statement: choosing columns', 'WHERE clause: filtering rows', 'SQL Aggregate Functions: SUM,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_001', title: 'MySQL Data Types: Numeric, Date/Time, and String types',
          caseStudy: { intro: 'Imagine you are designing a database for a school canteen\'s prepaid card system.',
            decisions: [{ prompt: 'What is the key difference between MySQL\'s DECIMAL(10,2) and FLOAT(10,2) when storing a value like 12345.67, and why does it matter for.', options: [
                { text: 'DECIMAL(10,2) stores the value exactly as 12345.67 using fixed-point arithmetic, while', outcome: 'DECIMAL(10,2) stores the value exactly as 12345.67 using fixed-point arithmetic, while FLOAT(10,2).' },
                { text: 'they are the same', outcome: 'Not quite — Students treat all "numbers" as numeric types: they use INT for phone numbers, PIN codes, Aadhaar.', reveals: 'students-treat-all-numbers-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_002', title: 'CREATE TABLE and ALTER TABLE: defining and modifying schema',
          caseStudy: { intro: 'Imagine you are designing a database for a school\'s "Library Management System" where you need to track Books, Members, and Book_Issues.',
            decisions: [{ prompt: 'Write the SQL statement to create a table named `STUDENT` with columns: `RollNo` (integer, primary key), `Name` (varchar 50, not null).', options: [
                { text: '```sql CREATE TABLE STUDENT ( RollNo INT PRIMARY KEY, Name VARCHAR(50) NOT NULL, Email', outcome: '```sql CREATE TABLE STUDENT ( RollNo INT PRIMARY KEY, Name VARCHAR(50) NOT NULL, Email VARCHAR(100).' },
                { text: '`ALTER TABLE', outcome: 'Not quite — Students believe that `ALTER TABLE ... MODIFY COLUMN` can safely change a column\'s data type in any.', reveals: 'alter-table' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_003', title: 'INSERT INTO: adding single and multiple rows to a table',
          caseStudy: { intro: 'Imagine you are managing a school library database and need to add new books to the `BOOKS` table.',
            decisions: [{ prompt: 'What is the correct syntax to insert a single row into a table `STUDENT(RollNo INT PRIMARY KEY, Name VARCHAR(30), Class INT)` when you want.', options: [
                { text: 'Correct answer: `INSERT INTO STUDENT VALUES (101, \'Amit\', 12);`', outcome: 'Correct answer: `INSERT INTO STUDENT VALUES (101, \'Amit\', 12);` A wrong answer like `INSERT INTO.' },
                { text: 'values can be supplied in any order without explicit column listing', outcome: 'Not quite — Students often believe that when inserting multiple rows in a single statement, if one row violates.', reveals: 'when-inserting-multiple-rows-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_004', title: 'SELECT statement: choosing columns and using DISTINCT',
          caseStudy: { intro: 'Imagine you\'re managing a car showroom database and your boss asks: "Show me just the car models we have in stock — I don\'t need the prices or IDs right now.".',
            decisions: [{ prompt: 'What is the exact syntax to display only the CarName and Model columns from the INVENTORY table without showing any other columns?', options: [
                { text: 'Correct answer: `SELECT CarName, Model FROM INVENTORY;` A wrong answer like `SELECT *', outcome: 'Correct answer: `SELECT CarName, Model FROM INVENTORY;` A wrong answer like `SELECT * FROM.' },
                { text: 'DISTINCT applies to individual columns separately', outcome: 'Not quite — Students believe DISTINCT applies to individual columns separately — e.g., they think `SELECT.', reveals: 'distinct-applies-to-individual-columns' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_005', title: 'WHERE clause: filtering rows with comparison and logical operators',
          caseStudy: { intro: 'Imagine you are the sales manager at the CARSHOWROOM and you need to pull a list of all petrol cars manufactured in 2018 or later that cost less than.',
            decisions: [{ prompt: 'List all comparison operators valid in a MySQL WHERE clause and give a one-line example of each.', options: [
                { text: 'The six comparison operators are: = (equal), != or <> (not equal), > (greater than), <', outcome: 'The six comparison operators are: = (equal), != or <> (not equal), > (greater than), < (less than).' },
                { text: 'not equal', outcome: 'Not quite — Students often write `WHERE Column = \'Value1\' OR \'Value2\'` thinking it means "Column equals Value1.', reveals: 'students-often-write-where-column' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_006', title: 'SQL Aggregate Functions: SUM, AVG, COUNT, MAX, MIN with GROUP BY',
          caseStudy: { intro: 'Imagine you are the manager of a car showroom and you need to know how many cars each salesperson sold last month and the total revenue they generated.',
            decisions: [{ prompt: 'What is the result of `SELECT COUNT(*), COUNT(commission) FROM SALE;` if the SALE table has 6 rows and the commission column has 4 non‑NULL.', options: [
                { text: 'The result is `COUNT(*) = 6` and `COUNT(commission) = 4`', outcome: 'The result is `COUNT(*) = 6` and `COUNT(commission) = 4`. COUNT(*) counts all rows regardless.' },
                { text: '`WHERE` and `HAVING` are interchangeable filters', outcome: 'Not quite — Students often believe that `WHERE` and `HAVING` are interchangeable filters.', reveals: 'where-and-having-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a library-issue database for the school fest, your teammate says: \'Skip the SQL constraints — I\'ll just validate everything in the Python form before it inserts.\'',
            decisions: [{ prompt: 'What does the CREATE TABLE constraints design argue?', options: [
                { text: 'Enforce integrity at the table — PRIMARY KEY, FOREIGN KEY with the right delete action, NOT NULL, CHECK and DEFAULT stop bad rows at the database door, so no app bug, script or hand-edited import can ever write an orphan issue record.', outcome: 'The chapter\'s core insight: constraints in the schema guard the data no matter which code path touches it — form validation only guards the paths you remembered to write.' },
                { text: 'Agree — app-level checks are more flexible and you can change rules without touching the schema.', outcome: 'Flexibility is the risk: every new script, import or quick fix bypasses the form\'s rules, while a CHECK or foreign key can\'t be forgotten — the schema is the last line every write must cross.', reveals: 'app-checks-beat-constraints' },
                { text: 'Use constraints but cascade every delete — ON DELETE CASCADE everywhere keeps things clean.', outcome: 'Cascade is for records meaningless without the parent; issue history is an audit trail where SET NULL preserves the record — one referential action for everything deletes the data you needed to keep.', reveals: 'cascade-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now choose data types by constraint, not habit — and catch the penny-sized errors that compound into audit findings.',
            decisions: [{ prompt: 'What comes next? Database Query Using SQL · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Database Query Using SQL · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_001', difficulty: 'standard',
          question: 'MySQL data types define the kind of value a column can store, determining its.',
          hint: 'Review c11_ip_cbse_07_005 focusing on the data type table (INT, DECIMAL, DATE, VARCHAR).',
          misconception: 'Students treat all "numbers" as numeric types: they use INT for phone numbers, PIN codes, Aadhaar (12 digits), and roll.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'MySQL data types define the kind of value a column can store, determining its storage',
                  options: ['MySQL data types define the kind of value a column can store, determining its storage', 'CREATE TABLE is a DDL command that defines a new relation (table) by specifying column', 'The INSERT INTO statement in SQL is a Data Manipulation Language (DML) command used to', 'The SELECT statement retrieves data from one or more tables in a database'],
                  hint: 'Review c11_ip_cbse_07_005 focusing on the data type table (INT, DECIMAL, DATE, VARCHAR) and re-do.',
                  misconception: 'Students treat all "numbers" as numeric types: they use INT for phone numbers, PIN codes, Aadhaar (12 digits), and roll numbers because.' }
          ],
            remediations: { 'students-treat-all-numbers-as': { steps: ['Revisit Class 11 node c11_ip_cbse_07_005 (DDL Commands: CREATE TABLE and Data Types in SQL) and list every numeric.', 'For each type, write one real-world attribute that fits perfectly and one that would break (e.g., DECIMAL(5,2) fits.', 'Practice converting 5 case-study descriptions (from CBSE sample papers) into CREATE TABLE statements, justifying each.', 'Re-attempt Diagnostic Questions 3, 5, and 6 without notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_002', difficulty: 'standard',
          question: 'CREATE TABLE is a DDL command that defines a new relation (table) by specifying.',
          hint: 'Revisit Class 11 nodes c11_ip_cbse_07_005 (CREATE TABLE basics) and c12_ip_cbse_01_001.',
          misconception: 'Students believe that `ALTER TABLE ... MODIFY COLUMN` can safely change a column\'s data type in any direction (e.g.',
          parts: [
                { id: 'a', prompt: 'A table `PRODUCT` exists with columns: `PCode` (CHAR(5) PRIMARY KEY), `PName` (VARCHAR(30)), `Price` (DECIMAL(8,2)), `Category` (VARCHAR(20)).', answer: '```sql -- (a) ALTER TABLE PRODUCT ADD Discount DECIMAL(5,2) DEFAULT 0.00',
                  options: ['```sql -- (a) ALTER TABLE PRODUCT ADD Discount DECIMAL(5,2) DEFAULT 0.00', '`ALTER TABLE'],
                  hint: 'Revisit Class 11 nodes c11_ip_cbse_07_005 (CREATE TABLE basics) and c12_ip_cbse_01_001 (data type.',
                  misconception: 'Students believe that `ALTER TABLE ... MODIFY COLUMN` can safely change a column\'s data type in any direction (e.g., VARCHAR(20) →.' },
                { id: 'b', prompt: 'Compare and contrast: (i) A table-level PRIMARY KEY constraint vs column-level PRIMARY KEY constraint. (ii) A UNIQUE constraint vs a PRIMARY KEY constraint.', answer: '(i) Column-level: `ColName TYPE PRIMARY KEY`',
                  options: ['(i) Column-level: `ColName TYPE PRIMARY KEY`', '`ALTER TABLE'],
                  hint: 'Revisit Class 11 nodes c11_ip_cbse_07_005 (CREATE TABLE basics) and c12_ip_cbse_01_001 (data type.',
                  misconception: 'Students believe that `ALTER TABLE ... MODIFY COLUMN` can safely change a column\'s data type in any direction (e.g., VARCHAR(20) →.' }
          ],
            remediations: { 'alter-table': { steps: ['Create a test table with sample data: `CREATE TABLE TEST (Col1 VARCHAR(20)); INSERT INTO TEST VALUES.', 'Run `ALTER TABLE TEST MODIFY Col1 VARCHAR(10);` 3.', 'Run `SELECT * FROM TEST;` — observe `\'HelloWorl\'` (truncated).', 'Repeat with numeric: `CREATE TABLE T2 (Amt DECIMAL(6,2)); INSERT INTO T2 VALUES (1234.56); ALTER TABLE T2 MODIFY Amt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_003', difficulty: 'standard',
          question: 'The INSERT INTO statement in SQL is a Data Manipulation Language (DML) command.',
          hint: 'Revisit c11_ip_cbse_07_007 (INSERT INTO basics) and c12_ip_cbse_01_002 (CREATE TABLE.',
          misconception: 'Students often believe that when inserting multiple rows in a single statement, if one row violates a constraint (e.g.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to insert a single row into a table `STUDENT(RollNo INT PRIMARY KEY, Name VARCHAR(30), Class INT)` when you want to provide values.', answer: 'Correct answer: `INSERT INTO STUDENT VALUES (101, \'Amit\', 12);`',
                  options: ['Correct answer: `INSERT INTO STUDENT VALUES (101, \'Amit\', 12);`', 'values can be supplied in any order without explicit column listing'],
                  hint: 'Revisit c11_ip_cbse_07_007 (INSERT INTO basics) and c12_ip_cbse_01_002 (CREATE TABLE constraints).',
                  misconception: 'Students often believe that when inserting multiple rows in a single statement, if one row violates a constraint (e.g., duplicate primary.' },
                { id: 'b', prompt: 'A table `ORDERS(OrderID INT PRIMARY KEY, CustID INT, OrderDate DATE, Amount DECIMAL(10,2))` has a foreign key `CustID` referencing `CUSTOMER(CustID)`.', answer: 'The statement fails with a foreign key constraint violation',
                  options: ['The statement fails with a foreign key constraint violation', 'the row is inserted with CustID 5'],
                  hint: 'Revisit c11_ip_cbse_07_007 (INSERT INTO basics) and c12_ip_cbse_01_002 (CREATE TABLE constraints).',
                  misconception: 'Students often believe that when inserting multiple rows in a single statement, if one row violates a constraint (e.g., duplicate primary.' }
          ],
            remediations: { 'when-inserting-multiple-rows-in': { steps: ['If a student exhibits the above misconception, take these steps: 1.', 'Create a minimal table `DEMO(ID INT PRIMARY KEY, Val VARCHAR(10))` and insert one row `(1, \'X\')`.', 'Ask the student to predict the outcome of `INSERT INTO DEMO VALUES (2, \'Y\'), (1, \'Z\');`.', 'Execute it and show the error and that `SELECT * FROM DEMO;` still shows only the original row.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_004', difficulty: 'standard',
          question: 'The SELECT statement retrieves data from one or more tables in a database.',
          hint: 'Revisit Class 11 node c11_ip_cbse_07_009 (SQL SELECT Statement: Selecting Columns and.',
          misconception: 'Students believe DISTINCT applies to individual columns separately — e.g., they think `SELECT DISTINCT CarName, Model`.',
          parts: [
                { id: 'a', prompt: 'The INVENTORY table has 8 rows. The Model column contains: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE, LXI, VXI.', answer: 'Correct answer: 6 rows',
                  options: ['Correct answer: 6 rows', 'one duplicate pair isn\'t actually duplicate (e', 'DISTINCT applies to individual columns separately'],
                  hint: 'Revisit Class 11 node c11_ip_cbse_07_009 (SQL SELECT Statement: Selecting Columns and Rows) and.',
                  misconception: 'Students believe DISTINCT applies to individual columns separately — e.g., they think `SELECT DISTINCT CarName, Model` gives unique.' }
          ],
            remediations: { 'distinct-applies-to-individual-columns': { steps: ['Have the student create a 4-row mini-table on paper: (A, X), (A, Y), (B, X), (B, X).', 'Ask: "How many rows for SELECT DISTINCT col1, col2?" — they\'ll likely say 2 (unique A,B and unique X,Y).', 'Show the actual result: 3 rows — (A,X), (A,Y), (B,X).', 'Explain: DISTINCT sees ROWS, not columns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_005', difficulty: 'standard',
          question: 'The WHERE clause in SQL filters rows from a table by evaluating a boolean.',
          hint: 'Review truth tables for AND/OR/NOT and practice translating English sentences like.',
          misconception: 'Students often write `WHERE Column = \'Value1\' OR \'Value2\'` thinking it means "Column equals Value1 or Value2".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The WHERE clause in SQL filters rows from a table by evaluating a boolean expression',
                  options: ['The WHERE clause in SQL filters rows from a table by evaluating a boolean expression', 'MySQL data types define the kind of value a column can store, determining its storage', 'CREATE TABLE is a DDL command that defines a new relation (table) by specifying column', 'The INSERT INTO statement in SQL is a Data Manipulation Language (DML) command used to'],
                  hint: 'Review truth tables for AND/OR/NOT and practice translating English sentences like "either A or.',
                  misconception: 'Students often write `WHERE Column = \'Value1\' OR \'Value2\'` thinking it means "Column equals Value1 or Value2".' }
          ],
            remediations: { 'students-often-write-where-column': { steps: ['Revisit c11_ip_cbse_07_010 (Class 11 WHERE clause basics) and practice writing five queries using OR with two complete.', 'Create a truth table for AND/OR/NOT with sample rows to internalise precedence.', 'Write a query that intentionally uses `= NULL` and observe the empty result; then change to `IS NULL` and compare.', 'Take a board exam question (e.g., CBSE 2023 SQP Q6) and rewrite its WHERE clause step by step, explaining each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_006', difficulty: 'standard',
          question: 'SQL aggregate functions (SUM, AVG, COUNT, MAX, MIN) compute a single summary.',
          hint: 'If stuck, review the difference between COUNT(*) and COUNT(column) using a table with.',
          misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.',
          parts: [
                { id: 'a', prompt: 'What is the result of `SELECT COUNT(*), COUNT(commission) FROM SALE;` if the SALE table has 6 rows and the commission column has 4 non‑NULL values and 2 NULL.', answer: 'The result is `COUNT(*) = 6` and `COUNT(commission) = 4`',
                  options: ['The result is `COUNT(*) = 6` and `COUNT(commission) = 4`', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'If stuck, review the difference between COUNT(*) and COUNT(column) using a table with NULLs, and.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' },
                { id: 'b', prompt: 'Consider the SALE table. A student writes: `SELECT CustID, COUNT(*) FROM SALE WHERE SalePrice > 600000 GROUP BY CustID HAVING COUNT(*) > 1;`.', answer: 'They are not equivalent',
                  options: ['They are not equivalent', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'If stuck, review the difference between COUNT(*) and COUNT(column) using a table with NULLs, and.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' }
          ],
            remediations: { 'where-and-having-are-interchangeable': { steps: ['Re‑visit the execution order diagram (FROM → WHERE → GROUP BY → HAVING → SELECT).', 'Practice converting English questions into the correct clause: "filter rows before grouping" → WHERE; "filter groups.', 'Use the CARSHOWROOM SALE table: write two queries – one with WHERE SalePrice > 600000 and one with HAVING.', 'Re‑attempt Diagnostic Question 4; if still wrong, review c12_ip_cbse_01_005 (WHERE clause) and c11_ip_cbse_07_012.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.',
          parts: [
                { id: 'a', prompt: 'A query uses `SELECT COUNT(DISTINCT Model) FROM INVENTORY;`. The table has 8 rows with Model values: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE, LXI, VXI.', answer: 'The result is 6 (distinct models: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE)',
                  options: ['The result is 6 (distinct models: LXI, VXI, Sigma1.2, Delta1.2, 5 STR STD, CARE)', 'COUNT(DISTINCT Model) counts all rows, ignoring the DISTINCT keyword', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'If stuck, review the difference between COUNT(*) and COUNT(column) using a table with NULLs, and.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' },
                { id: 'b', prompt: 'Design a real‑world scenario (different from car showroom) where you would need to use GROUP BY with two grouping columns and two different aggregate.', answer: 'Scenario: A school database with a table EXAM(StudentID, Subject, Marks)',
                  options: ['Scenario: A school database with a table EXAM(StudentID, Subject, Marks)', '`WHERE` and `HAVING` are interchangeable filters'],
                  hint: 'If stuck, review the difference between COUNT(*) and COUNT(column) using a table with NULLs, and.',
                  misconception: 'Students often believe that `WHERE` and `HAVING` are interchangeable filters.' }
          ],
            remediations: { 'where-and-having-are-interchangeable': { steps: ['Re‑visit the execution order diagram (FROM → WHERE → GROUP BY → HAVING → SELECT).', 'Practice converting English questions into the correct clause: "filter rows before grouping" → WHERE; "filter groups.', 'Use the CARSHOWROOM SALE table: write two queries – one with WHERE SalePrice > 600000 and one with HAVING.', 'Re‑attempt Diagnostic Question 4; if still wrong, review c12_ip_cbse_01_005 (WHERE clause) and c11_ip_cbse_07_012.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
