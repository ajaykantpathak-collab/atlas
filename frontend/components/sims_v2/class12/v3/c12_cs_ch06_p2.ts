import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch06_p2: SimDef = {
    id: 'v3_c12_cs_ch06_p2',
    title: 'Database Connectivity · Part 2/2',
    subtitle: 'Perfect SQL, silently ignored — the translator Python can\'t skip',
    classLevel: 12, subject: 'computer_science', topic: 'Database Connectivity · Part 2/2',
    chapters: ['c12_cs_ch06'],
    nodeIds: ['c12_cs_cbse_06_007', 'c12_cs_cbse_06_008', 'c12_cs_cbse_06_009', 'c12_cs_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Application developer', intro: 'Your code and your database are strangers on a network. The connector introduces them — and this chapter teaches the handshake.', goal: 'Explain the connector–connection–cursor pipeline and sequence the steps for Python–MySQL database operations.' },
    discovery: {
        question: 'Your Python script has perfect SQL inside it, yet MySQL never receives a word. Why can\'t Python just \'send\' the query?',
        options: ['They\'re separate processes speaking different protocols — a connector library translates Python calls into MySQL network packets', 'Python refuses to run SQL by design', 'The SQL needs compiling first', 'MySQL only accepts queries from its own shell'],
        answer: 'They\'re separate processes speaking different protocols — a connector library translates Python calls into MySQL network packets',
        hook: 'SQL text isn\'t the message — it\'s the payload. The connector handles authentication, packet framing and results. And the ritual matters: connect → cursor → execute → commit → close; skip commit and your UPDATE vanishes, skip close and the server runs out of connections.',
    },
    teaching: [
        { title: 'Committing and Rolling Back Transactions', text: 'A transaction in database connectivity is a logical unit of work consisting of one or more SQL statements that must be executed atomically — either all succeed and are made permanent with `commit()`.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Wire a library app end-to-end: install the connector, open a session, drive a cursor through a book-return UPDATE, commit it, and clean up — then trace every component\'s role in the flow.',
        labels: ['Committing and Rolling Back', 'Closing Database Connection', 'CRUD Operations Using Python-MySQL', 'Exception Handling in Database'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_007', title: 'Committing and Rolling Back Transactions',
          caseStudy: { intro: 'Imagine you are building a banking app where transferring money requires two updates: deduct from sender and credit to receiver.',
            decisions: [{ prompt: 'What is the default autocommit mode in `mysql.connector` and what does it imply for each individual SQL statement executed?', options: [
                { text: 'The default autocommit mode in `mysql.connector` is `False`', outcome: 'The default autocommit mode in `mysql.connector` is `False`. This means each SQL statement is NOT.' },
                { text: 'no SQL ran', outcome: 'Not quite — Students often think that `rollback()` is only needed when the database throws an error, and that.', reveals: 'rollback-is-only-needed-when' },
                { text: 'autocommit is True', outcome: 'Not quite — Students often think that `rollback()` is only needed when the database throws an error, and that.', reveals: 'rollback-is-only-needed-when' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_008', title: 'Closing Database Connection and Resources',
          caseStudy: { intro: 'Imagine you borrow a book from a library and forget to return it — the library\'s copy remains checked out, and others cannot borrow it.',
            decisions: [{ prompt: 'What method is used to close a cursor object in `mysql.connector`? What about the connection object?', options: [
                { text: 'The cursor object uses `cursor.close()` and the connection object uses', outcome: 'The cursor object uses `cursor.close()` and the connection object uses `connection.close()`.' },
                { text: 'connection.close() closes both', outcome: 'Not quite — Students often think that closing the connection automatically closes the cursor, or that Python\'s.', reveals: 'closing-the-connection-automatically-closes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_009', title: 'CRUD Operations Using Python-MySQL',
          caseStudy: { intro: 'Imagine you are building a school library system where you need to add new books, display available books, update book quantities when issued, and remove.',
            decisions: [{ prompt: 'What is the correct placeholder syntax for parameterized queries in `mysql.connector` and why must it be used instead of string formatting?', options: [
                { text: 'The correct placeholder is `%s` (percent sign followed by lowercase s) for all data types', outcome: 'The correct placeholder is `%s` (percent sign followed by lowercase s) for all data types.' },
                { text: '`cursor', outcome: 'Not quite — Students often believe that `cursor.execute()` automatically saves changes to the database.', reveals: 'cursor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_010', title: 'Exception Handling in Database Connectivity',
          caseStudy: { intro: 'Imagine you are building an online fee-payment portal for your school.',
            decisions: [{ prompt: 'What is the base exception class for all mysql.connector errors, and which two specific subclasses would you catch to distinguish between.', options: [
                { text: 'The base class is `mysql.connector.Error`', outcome: 'The base class is `mysql.connector.Error`. Catch `mysql.connector.InterfaceError` for lost network.' },
                { text: 'specific enough', outcome: 'Not quite — Students believe `except mysql.connector.Error:` catches **only** database-related errors and.', reveals: 'except-mysql' },
                { text: 'only `Exception` or confusing `DatabaseError` with `InterfaceError`', outcome: 'Not quite — Students believe `except mysql.connector.Error:` catches **only** database-related errors and.', reveals: 'except-mysql' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A library app\'s \'return book\' feature runs without errors, yet the book still shows as issued in MySQL. The Python code executed the UPDATE, then closed — but never called conn.commit().',
            decisions: [{ prompt: 'Where did the update go?', options: [
                { text: 'Nowhere permanent — with autocommit off, the UPDATE sat in an uncommitted transaction and rolled back when the connection closed; add conn.commit() after the execute.', outcome: 'Connection manages the transaction boundary: DML only persists on commit, and cleanup means close cursor, close connection.' },
                { text: 'The connector auto-saves everything — the bug must be in the UPDATE\'s WHERE clause.', outcome: 'Executed SQL isn\'t persisted SQL; without commit the write vanishes on close, whatever the WHERE clause matched.', reveals: 'execute-commits-automatically' },
                { text: 'Importing mysql.connector already opened the database, so conn was redundant and broke things.', outcome: 'The module only supplies the API — connect() creates the session object whose cursor() runs SQL; neither is optional.', reveals: 'import-equals-connect' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You now know why the pipeline is connect→cursor→execute→commit→close — and what breaks at each skipped step. This is the exact pattern every Python backend uses.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_007', difficulty: 'standard',
          question: 'A transaction in database connectivity is a logical unit of work consisting.',
          hint: 'If stuck, review `c12_cs_cbse_06_004` (executing queries) and `c12_cs_cbse_06_006`.',
          misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions.',
          parts: [
                { id: 'a', prompt: 'What is the default autocommit mode in `mysql.connector` and what does it imply for each individual SQL statement executed?', answer: 'The default autocommit mode in `mysql.connector` is `False`',
                  options: ['The default autocommit mode in `mysql.connector` is `False`', 'no SQL ran', 'autocommit is True'],
                  hint: 'If stuck, review `c12_cs_cbse_06_004` (executing queries) and `c12_cs_cbse_06_006` (parameterized.',
                  misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions (like `ValueError` from.' },
                { id: 'b', prompt: 'Write a Python code snippet that transfers ₹500 from account \'A101\' to \'A102\' using a transaction.', answer: '```python import mysql.connector conn = mysql.connector.connect(user=\'root\',',
                  options: ['```python import mysql.connector conn = mysql.connector.connect(user=\'root\',', 'no SQL ran'],
                  hint: 'If stuck, review `c12_cs_cbse_06_004` (executing queries) and `c12_cs_cbse_06_006` (parameterized.',
                  misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions (like `ValueError` from.' },
                { id: 'c', prompt: 'Compare the effect of calling `commit()` versus `rollback()` on a transaction that has executed three INSERT statements.', answer: '`commit()` makes all three INSERTs permanent',
                  options: ['`commit()` makes all three INSERTs permanent', 'no SQL ran'],
                  hint: 'If stuck, review `c12_cs_cbse_06_004` (executing queries) and `c12_cs_cbse_06_006` (parameterized.',
                  misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions (like `ValueError` from.' }
          ],
            remediations: { 'rollback-is-only-needed-when': { steps: ['Revisit node `c12_cs_cbse_06_004` (Creating Cursor Object and Executing Queries) to practice executing multiple.', 'Revisit node `c12_cs_cbse_06_006` (Parameterized Queries) to reinforce safe query execution.', 'Write a mini-program that intentionally raises a Python exception after an UPDATE but before commit, then check the.', 'Add a `try-except-finally` block that prints "Rolling back" in the except clause and verify the change is gone.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since `mysql.connector` defaults to autocommit=False, I don\'t need to call `commit()` after a single INSERT; the data will be saved when the.', answer: 'The claim is false and dangerous',
                  options: ['The claim is false and dangerous', 'no SQL ran'],
                  hint: 'If stuck, review `c12_cs_cbse_06_004` (executing queries) and `c12_cs_cbse_06_006` (parameterized.',
                  misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions (like `ValueError` from.' },
                { id: 'b', prompt: 'Design a scenario where a transaction must include a SELECT statement (e.g., checking balance before update) and explain why that SELECT should be inside the.', answer: 'Scenario: Transfer funds only if sender balance ≥ amount',
                  options: ['Scenario: Transfer funds only if sender balance ≥ amount', 'no SQL ran'],
                  hint: 'If stuck, review `c12_cs_cbse_06_004` (executing queries) and `c12_cs_cbse_06_006` (parameterized.',
                  misconception: 'Students often think that `rollback()` is only needed when the database throws an error, and that Python exceptions (like `ValueError` from.' }
          ],
            remediations: { 'rollback-is-only-needed-when': { steps: ['Revisit node `c12_cs_cbse_06_004` (Creating Cursor Object and Executing Queries) to practice executing multiple.', 'Revisit node `c12_cs_cbse_06_006` (Parameterized Queries) to reinforce safe query execution.', 'Write a mini-program that intentionally raises a Python exception after an UPDATE but before commit, then check the.', 'Add a `try-except-finally` block that prints "Rolling back" in the except clause and verify the change is gone.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_008', difficulty: 'standard',
          question: 'Closing database connection and resources refers to the explicit release of the.',
          hint: 'Revisit c12_cs_cbse_06_003 (Connecting to MySQL) and c12_cs_cbse_06_004 (Creating Cursor.',
          misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector.',
          parts: [
                { id: 'a', prompt: 'What method is used to close a cursor object in `mysql.connector`? What about the connection object?', answer: 'The cursor object uses `cursor.close()` and the connection object uses',
                  options: ['The cursor object uses `cursor.close()` and the connection object uses', 'connection.close() closes both'],
                  hint: 'Revisit c12_cs_cbse_06_003 (Connecting to MySQL) and c12_cs_cbse_06_004 (Creating Cursor Object).',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' },
                { id: 'b', prompt: 'Why is it important to close the cursor before closing the connection? What happens if you close the connection first?', answer: 'The cursor depends on an open connection',
                  options: ['The cursor depends on an open connection', 'order doesn\'t matter'],
                  hint: 'Revisit c12_cs_cbse_06_003 (Connecting to MySQL) and c12_cs_cbse_06_004 (Creating Cursor Object).',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' },
                { id: 'c', prompt: 'Write a code snippet that opens a connection, creates a cursor, executes a query, fetches data, and then closes both cursor and connection properly, even if.', answer: '```python import mysql.connector conn = N/A cursor = N/A try: conn =',
                  options: ['```python import mysql.connector conn = N/A cursor = N/A try: conn =', 'localhost', ', password=', ', database='],
                  hint: 'Revisit c12_cs_cbse_06_003 (Connecting to MySQL) and c12_cs_cbse_06_004 (Creating Cursor Object).',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' }
          ],
            remediations: { 'closing-the-connection-automatically-closes': { steps: ['If the student holds this misconception, have them run a script that opens 20 connections in a loop without closing.', 'Next, modify the script to close each connection properly and observe the process list stay clean.', 'Then revisit **c12_cs_cbse_06_003** (Connecting to MySQL) and **c12_cs_cbse_06_004** (Creating Cursor Object).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_009', difficulty: 'standard',
          question: 'CRUD operations in Python-MySQL refer to the four fundamental database.',
          hint: 'If stuck, review `c12_cs_cbse_06_006` (Parameterized Queries) and `c12_cs_cbse_06_007`.',
          misconception: 'Students often believe that `cursor.execute()` automatically saves changes to the database.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between `cursor.execute("SELECT * FROM students")` followed by `cursor.fetchall()` versus `cursor.fetchone()` in terms of memory usage.', answer: '`fetchall()` retrieves all rows at once into a list of tuples, consuming memory',
                  options: ['`fetchall()` retrieves all rows at once into a list of tuples, consuming memory', '`cursor'],
                  hint: 'If stuck, review `c12_cs_cbse_06_006` (Parameterized Queries) and `c12_cs_cbse_06_007` (Committing.',
                  misconception: 'Students often believe that `cursor.execute()` automatically saves changes to the database.' }
          ],
            remediations: { 'cursor': { steps: ['Revisit node `c12_cs_cbse_06_007` (Committing and Rolling Back Transactions) and `c12_cs_cbse_06_006` (Parameterized.', 'Write a tiny script that does INSERT without commit, then SELECT in a separate connection — observe the row is missing.', 'Add `conn.commit()` and repeat.', 'Practice the `try-except-finally` template from `c12_cs_cbse_06_010` (Exception Handling) until it becomes muscle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_010', difficulty: 'standard',
          question: 'Exception handling in database connectivity is the practice of using Python\'s.',
          hint: 'If stuck, revisit `c12_cs_cbse_06_009` (CRUD Operations Using Python-MySQL) and manually.',
          misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific.',
          parts: [
                { id: 'a', prompt: 'What is the base exception class for all mysql.connector errors, and which two specific subclasses would you catch to distinguish between "lost network.', answer: 'The base class is `mysql.connector.Error`',
                  options: ['The base class is `mysql.connector.Error`', 'specific enough', 'only `Exception` or confusing `DatabaseError` with `InterfaceError`', '`except mysql'],
                  hint: 'If stuck, revisit `c12_cs_cbse_06_009` (CRUD Operations Using Python-MySQL) and manually trace.',
                  misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific enough".' },
                { id: 'b', prompt: 'Compare the behavior of these two snippets when a `IntegrityError` (duplicate primary key) occurs during `cursor.execute()`.', answer: 'Snippet A prints "Duplicate entry"',
                  options: ['Snippet A prints "Duplicate entry"', 'specific enough', '`except mysql'],
                  hint: 'If stuck, revisit `c12_cs_cbse_06_009` (CRUD Operations Using Python-MySQL) and manually trace.',
                  misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific enough".' }
          ],
            remediations: { 'except-mysql': { steps: ['Revisit `c12_cs_cbse_06_003` (Connecting to MySQL) — verify you can open/close a connection without errors.', 'Revisit `c12_cs_cbse_06_007` (Committing and Rolling Back Transactions) — practice manual `commit()`/`rollback()` in.', 'Write a 10-line script that intentionally causes `ProgrammingError` (bad SQL) and `IntegrityError` (duplicate key).', 'Re-diagnostic: run Diagnostic Question 4 again — if you still reverse the except order, watch the Python exception.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
