import type { SimDef } from '../../engine/types';
import C12_ComputerScienceFinalRevisionCompleteSim from '../../../simulations/c6_12/C12_ComputerScienceFinalRevisionCompleteSim';

/** v3 wrapped master — C12_ComputerScienceFinalRevisionCompleteSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencefinalrevisioncompletesim: SimDef = {
    id: 'v3w_c12_computersciencefinalrevisioncompletesim',
    title: 'Final Revision Complete',
    subtitle: 'This node covers: (1) the hierarchy of mysql.connector exception classes (Error,.',
    classLevel: 12, subject: 'computer_science', topic: 'Exception Handling in Database Connectivity',
    chapters: [],
    nodeIds: ['c12_cs_cbse_06_010', 'c12_cs_cbse_10_010', 'c12_cs_cbse_06_008', 'c12_cs_cbse_10_005', 'c12_cs_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are building an online fee-payment portal for your school.', goal: 'Master Final Revision Complete.' },
    discovery: {
        question: 'What is the base exception class for all mysql.connector errors, and which two specific subclasses would you catch to distinguish between "lost network.',
        options: ['The base class is `mysql.connector.Error`', 'specific enough', '`except mysql'],
        answer: 'The base class is `mysql.connector.Error`',
        hook: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific.',
    },
    teaching: [
        { title: 'Exception handling in database connectivity.', text: 'Exception handling in database connectivity is the practice of using Python\'s try-except-else-finally blocks to catch and manage runtime errors (such as connection failures, SQL syntax errors,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_06_010', title: 'Exception handling in database.',
          scaffold: { problem: 'A school library system deducts ₹50 fine from a student\'s wallet when a book is returned late.',
            steps: [
            { text: 'Open cursor inside try block; define SQL for SELECT balance, UPDATE wallet, INSERT INTO fines.' },
            { text: 'Execute SELECT with parameterized query; fetchone() to get current balance.' },
            { text: 'If balance < fine_amount: raise a custom ValueError (not a DB error) to trigger except block without rollback.' },
            { text: 'Execute UPDATE and INSERT; commit only if both succeed.' },
            { text: 'Catch IntegrityError (e.g., foreign key violation if student_id missing), InterfaceError (network), ProgrammingError.' },
            { text: 'Finally block closes cursor; connection closure handled by caller.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_10_010', title: 'Exception handling in file operations.',
          scaffold: { problem: 'Write a function `safe_read_lines(filename)` that returns a list of stripped lines from a text file.',
            steps: [
            { text: 'Identify required exceptions — `FileNotFoundError`, `PermissionError`, and generic `OSError` (superclass) for others.' },
            { text: 'Use `with open(filename, \'r\', encoding=\'utf-8\') as f:` inside `try` to guarantee closure.' },
            { text: 'In `try` block, read lines: `lines = [line.rstrip(\'\\n\') for line in f]`.' },
            { text: '`except FileNotFoundError`: print message, return `[]`.' },
            { text: '`except PermissionError`: print message, return `N/A`.' },
            { text: '`except OSError as e`: print message, `raise` (re-raise same exception).' },
            { text: '`else`: return `lines` (only if no exception).' },
            { text: 'No `finally` needed because `with` handles closure.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_06_008', title: 'Closing database connection and.',
          scaffold: { problem: 'Write a Python program to connect to a MySQL database, execute a SELECT query, fetch all rows, and then close the cursor and connection.',
            steps: [
            { text: 'Import `mysql.connector`.' },
            { text: 'Initialize `conn = N/A` and `cursor = N/A` before the try block.' },
            { text: 'In the try block, establish connection using `connect()` with host, user, password, database.' },
            { text: 'Create cursor object via `conn.cursor()`.' },
            { text: 'Execute a SELECT query (e.g., `SELECT * FROM students`).' },
            { text: 'Fetch all rows using `cursor.fetchall()` and print them.' },
            { text: 'In the finally block, close cursor if it exists (`if cursor: cursor.close()`), then close connection if it exists (`if.', faded: true, blankAnswer: 'See code in DIAGNOSTIC_ANSWER_3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_10_005', title: 'The `with` statement in Python is a.',
          scaffold: { problem: 'A school stores student attendance in "attendance_July.txt" with one line per student: "RollNo,Name,PresentDays".',
            steps: [
            { text: 'Identify input file ("attendance_July.txt"), output file ("attendance_report.txt"), and formula: percentage =.' },
            { text: 'Use nested `with` to open both files simultaneously — input in "r" mode, output in "w" mode' },
            { text: 'Iterate through each line of input file, strip whitespace, split by comma to get roll, name, present_days' },
            { text: 'Convert present_days to int, calculate percentage, format output string, write to output file' },
            { text: 'Wrap in try-except to catch FileNotFoundError for missing input and PermissionError for output', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_10_010', title: 'Identify each idea',
          dissect: { specimen: 'Final Revision Complete', spots: [
            { id: 's1', label: 'Exception handling in database connectivity', prompt: 'Which idea is this? — Exception handling in database connectivity is the practice of using Python\'s.', answer: 'Exception handling in database connectivity', options: ['Exception handling in database connectivity', 'Exception handling in file operations', 'Closing database connection and resources', 'The with statement in Python'] },
            { id: 's2', label: 'Exception handling in file operations', prompt: 'Which idea is this? — Exception handling in file operations is the practice of using Python\'s.', answer: 'Exception handling in file operations', options: ['Exception handling in file operations', 'Exception handling in database connectivity', 'Closing database connection and resources', 'The with statement in Python'] },
            { id: 's3', label: 'Closing database connection and resources', prompt: 'Which idea is this? — Closing database connection and resources refers to the explicit release of the cursor.', answer: 'Closing database connection and resources', options: ['Closing database connection and resources', 'Exception handling in database connectivity', 'Exception handling in file operations', 'The with statement in Python'] },
            { id: 's4', label: 'The with statement in Python', prompt: 'Which idea is this? — The `with` statement in Python is a context manager that automatically handles resource.', answer: 'The with statement in Python', options: ['The with statement in Python', 'Exception handling in database connectivity', 'Exception handling in file operations', 'Closing database connection and resources'] },
            { id: 's5', label: 'A stack is a linear', prompt: 'Which idea is this? — A **stack** is a linear data structure that follows the **Last-In-First-Out (LIFO)**.', answer: 'A stack is a linear', options: ['A stack is a linear', 'Exception handling in database connectivity', 'Exception handling in file operations', 'Closing database connection and resources'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceFinalRevisionCompleteSim, prompt: 'Explore the interactive — Final Revision Complete' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_010', difficulty: 'standard',
          question: 'Exception handling in database connectivity is the practice of using Python\'s.',
          hint: 'If stuck, revisit `c12_cs_cbse_06_009` (CRUD Operations Using Python-MySQL) and manually.',
          misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific.',
          parts: [
                { id: 'a', prompt: 'What is the base exception class for all mysql.connector errors, and which two specific subclasses would you catch to distinguish between "lost network.', answer: 'The base class is `mysql.connector.Error`',
                  options: ['The base class is `mysql.connector.Error`', 'specific enough', '`except mysql'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific enough".' },
                { id: 'b', prompt: 'Compare the behavior of these two snippets when a `IntegrityError` (duplicate primary key) occurs during `cursor.execute()`.', answer: 'Snippet A prints "Duplicate entry"',
                  options: ['Snippet A prints "Duplicate entry"', 'specific enough', '`except mysql'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific enough".' }
          ],
            remediations: { 'except-mysql': { steps: ['Revisit `c12_cs_cbse_06_003` (Connecting to MySQL) — verify you can open/close a connection without errors.', 'Revisit `c12_cs_cbse_06_007` (Committing and Rolling Back Transactions) — practice manual `commit()`/`rollback()` in a.', 'Write a 10-line script that intentionally causes `ProgrammingError` (bad SQL) and `IntegrityError` (duplicate key),.', 'Re-diagnostic: run Diagnostic Question 4 again — if you still reverse the except order, watch the Python exception.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific.',
          parts: [
                { id: 'a', prompt: 'A board exam question asks: "Why must `cursor.close()` and `conn.close()` be placed in a `finally` block rather than at the end of the `try` block?" Evaluate.', answer: 'The statement is false',
                  options: ['The statement is false', 'specific enough', '`except mysql'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific enough".' },
                { id: 'b', prompt: 'Compare the behavior of these two snippets when a `IntegrityError` (duplicate primary key) occurs during `cursor.execute()`.', answer: 'Snippet A prints "Duplicate entry"',
                  options: ['Snippet A prints "Duplicate entry"', 'specific enough', '`except mysql'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `except mysql.connector.Error:` catches **only** database-related errors and is therefore "specific enough".' }
          ],
            remediations: { 'except-mysql': { steps: ['Revisit `c12_cs_cbse_06_003` (Connecting to MySQL) — verify you can open/close a connection without errors.', 'Revisit `c12_cs_cbse_06_007` (Committing and Rolling Back Transactions) — practice manual `commit()`/`rollback()` in a.', 'Write a 10-line script that intentionally causes `ProgrammingError` (bad SQL) and `IntegrityError` (duplicate key),.', 'Re-diagnostic: run Diagnostic Question 4 again — if you still reverse the except order, watch the Python exception.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_010', difficulty: 'standard',
          question: 'Exception handling in file operations is the practice of using Python\'s.',
          hint: 'Revisit c12_cs_cbse_10_002 (open modes and their failure modes) and c12_cs_cbse_10_005.',
          misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes.',
          parts: [
                { id: 'a', prompt: 'What is the most specific built-in exception raised when `open(\'missing.txt\', \'r\')` is executed and the file does not exist?', answer: '`FileNotFoundError` (a subclass of `OSError`)',
                  options: ['`FileNotFoundError` (a subclass of `OSError`)', 'What happens if the file doesn\'t exist?', 'the file is closed safely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes the file." **Why it\'s.' },
                { id: 'b', prompt: 'Explain why the following code is dangerous for file operations: ```python try: f = open(\'data.txt\', \'r\') content = f.read() except: print("Error occurred").', answer: 'Three critical flaws: (1) Bare `except:` catches **all** exceptions including',
                  options: ['Three critical flaws: (1) Bare `except:` catches **all** exceptions including', 'What happens if the file doesn\'t exist?', 'the file is closed safely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes the file." **Why it\'s.' }
          ],
            remediations: { 'misconception-using-with-open': { steps: ['If a student exhibits this misconception: (1) Show them a minimal crashing example: `with open(\'nonexistent.txt\') as f:.', '(2) Ask: "Did `with` prevent the crash?" → No.', '(3) Explain: `with` is for **cleanup**, `try-except` is for **error handling**.', 'They are orthogonal — use both.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes.',
          parts: [
                { id: 'a', prompt: 'A student writes this code to append to a log file: ```python try: with open(\'app.log\', \'a\') as f: f.write("Startup\\n") except OSError as e: print(f"Logging.', answer: 'The `except` block catches the error but **does not retry or queue the message**',
                  options: ['The `except` block catches the error but **does not retry or queue the message**', 'it handles the error', 'What happens if the file doesn\'t exist?', 'the file is closed safely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes the file." **Why it\'s.' }
          ],
            remediations: { 'misconception-using-with-open': { steps: ['If a student exhibits this misconception: (1) Show them a minimal crashing example: `with open(\'nonexistent.txt\') as f:.', '(2) Ask: "Did `with` prevent the crash?" → No.', '(3) Explain: `with` is for **cleanup**, `try-except` is for **error handling**.', 'They are orthogonal — use both.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_008', difficulty: 'standard',
          question: 'Closing database connection and resources refers to the explicit release of the.',
          hint: 'Revisit c12_cs_cbse_06_003 (Connecting to MySQL) and c12_cs_cbse_06_004 (Creating Cursor.',
          misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector.',
          parts: [
                { id: 'a', prompt: 'What method is used to close a cursor object in `mysql.connector`? What about the connection object?', answer: 'The cursor object uses `cursor.close()` and the connection object uses',
                  options: ['The cursor object uses `cursor.close()` and the connection object uses', 'connection.close() closes both'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' },
                { id: 'b', prompt: 'Why is it important to close the cursor before closing the connection? What happens if you close the connection first?', answer: 'The cursor depends on an open connection',
                  options: ['The cursor depends on an open connection', 'order doesn\'t matter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' },
                { id: 'c', prompt: 'Write a code snippet that opens a connection, creates a cursor, executes a query, fetches data, and then closes both cursor and connection properly, even if an.', answer: '```python import mysql.connector conn = N/A cursor = N/A try: conn =',
                  options: ['```python import mysql.connector conn = N/A cursor = N/A try: conn =', 'localhost', ', password='],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' }
          ],
            remediations: { 'closing-the-connection-automatically-closes': { steps: ['If the student holds this misconception, have them run a script that opens 20 connections in a loop without closing,.', 'Next, modify the script to close each connection properly and observe the process list stay clean.', 'Then revisit **c12_cs_cbse_06_003** (Connecting to MySQL) and **c12_cs_cbse_06_004** (Creating Cursor Object) to.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector.',
          parts: [
                { id: 'a', prompt: 'A student writes code that closes the connection but not the cursor. Is this acceptable? Justify your answer.', answer: 'No, it is not acceptable',
                  options: ['No, it is not acceptable', 'yes, it\'s fine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that closing the connection automatically closes the cursor, or that Python\'s garbage collector will eventually clean.' }
          ],
            remediations: { 'closing-the-connection-automatically-closes': { steps: ['If the student holds this misconception, have them run a script that opens 20 connections in a loop without closing,.', 'Next, modify the script to close each connection properly and observe the process list stay clean.', 'Then revisit **c12_cs_cbse_06_003** (Connecting to MySQL) and **c12_cs_cbse_06_004** (Creating Cursor Object) to.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_005', difficulty: 'standard',
          question: 'The `with` statement in Python is a context manager that automatically handles.',
          hint: 'If stuck, revisit c12_cs_cbse_10_002 (open modes) and c12_cs_cbse_10_003/004 (read/write.',
          misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax to open a file named "data.txt" in read mode using the `with` statement, and what happens to the file object when the indented block.', answer: 'Correct answer: `with open("data.txt", "r") as f:`',
                  options: ['Correct answer: `with open("data.txt", "r") as f:`', 'data.txt', 'but may not understand explicit mode specification'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...' },
                { id: 'b', prompt: 'Rewrite this legacy code to use `with` statement. The code reads a config file, processes each line, and must ensure the file closes even if `process_line()`.', answer: 'Correct answer: ```python with open("config.ini", "r") as f: for line in f:',
                  options: ['Correct answer: ```python with open("config.ini", "r") as f: for line in f:', '`with open('],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...' }
          ],
            remediations: { 'with-open': { steps: ['Revisit c12_cs_cbse_10_002 (open() modes) — ensure student knows mode strings.', 'Revisit c12_cs_cbse_10_003 and c12_cs_cbse_10_004 — practice read/write without `with` to feel the pain of manual close.', 'Show a live demo: run manual code that crashes mid-write, check file size (0 bytes or partial).', 'Re-diagnostic: give a snippet with `try-except` inside `with` and ask "does the file close before or after except block.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Using `with` is always better than manual `open()`/`close()` because it\'s shorter and handles everything." Defend or refute with a.', answer: 'Refute: `with` binds the file lifetime to the block scope',
                  options: ['Refute: `with` binds the file lifetime to the block scope', 'with is always better', '`with open('],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...' }
          ],
            remediations: { 'with-open': { steps: ['Revisit c12_cs_cbse_10_002 (open() modes) — ensure student knows mode strings.', 'Revisit c12_cs_cbse_10_003 and c12_cs_cbse_10_004 — practice read/write without `with` to feel the pain of manual close.', 'Show a live demo: run manual code that crashes mid-write, check file size (0 bytes or partial).', 'Re-diagnostic: give a snippet with `try-except` inside `with` and ask "does the file close before or after except block.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_011', difficulty: 'standard',
          question: 'A **stack** is a linear data structure that follows the **Last-In-First-Out.',
          hint: 'If stuck, immediately revisit **c12_cs_cbse_08_002** (Stack LIFO) and.',
          misconception: '**Misconception**: “Stack and queue are interchangeable; you can simulate a queue with two stacks, so there’s no real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A **stack** is a linear data structure that follows the **Last-In-First-Out (LIFO)**',
                  options: ['A **stack** is a linear data structure that follows the **Last-In-First-Out (LIFO)**', 'Exception handling in database connectivity is the practice of using Python\'s', 'Exception handling in file operations is the practice of using Python\'s', 'Closing database connection and resources refers to the explicit release of the cursor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: “Stack and queue are interchangeable; you can simulate a queue with two stacks, so there’s no real difference.” **Why.' }
          ],
            remediations: { 'misconception-stack-and-queue-are': { steps: ['**Revisit the physical analogies**: Stack = pile of plates (add/remove from top); Queue = line at a ration shop (join.', '**Re-trace Diagnostic Question 3** step-by-step on paper, labelling “top” and “front” explicitly.', '**Solve two board-style questions**: (a) Convert infix `A+B*C` to postfix using a stack (show each push/pop).', '(b) Simulate a circular queue of size 4 with enqueue/dequeue sequence.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
