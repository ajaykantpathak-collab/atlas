import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch06_p1: SimDef = {
    id: 'v3_c12_cs_ch06_p1',
    title: 'Database Connectivity · Part 1/2',
    subtitle: 'Perfect SQL, silently ignored — the translator Python can\'t skip',
    classLevel: 12, subject: 'computer_science', topic: 'Database Connectivity · Part 1/2',
    chapters: ['c12_cs_ch06'],
    nodeIds: ['c12_cs_cbse_06_001', 'c12_cs_cbse_06_002', 'c12_cs_cbse_06_003', 'c12_cs_cbse_06_004', 'c12_cs_cbse_06_005', 'c12_cs_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Application developer', intro: 'Your code and your database are strangers on a network. The connector introduces them — and this chapter teaches the handshake.', goal: 'Explain the connector–connection–cursor pipeline and sequence the steps for Python–MySQL database operations.' },
    discovery: {
        question: 'Your Python script has perfect SQL inside it, yet MySQL never receives a word. Why can\'t Python just \'send\' the query?',
        options: ['They\'re separate processes speaking different protocols — a connector library translates Python calls into MySQL network packets', 'Python refuses to run SQL by design', 'The SQL needs compiling first', 'MySQL only accepts queries from its own shell'],
        answer: 'They\'re separate processes speaking different protocols — a connector library translates Python calls into MySQL network packets',
        hook: 'SQL text isn\'t the message — it\'s the payload. The connector handles authentication, packet framing and results. And the ritual matters: connect → cursor → execute → commit → close; skip commit and your UPDATE vanishes, skip close and the server runs out of connections.',
    },
    teaching: [
        { title: 'Introduction to Database Connectivity', text: 'Database connectivity refers to the mechanism that allows a Python program to communicate with a database management system (DBMS) like MySQL, enabling operations such as querying, inserting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Wire a library app end-to-end: install the connector, open a session, drive a cursor through a book-return UPDATE, commit it, and clean up — then trace every component\'s role in the flow.',
        labels: ['Introduction to Database Connectivity', 'MySQL Connector: Installation', 'Connecting to MySQL Using', 'Creating Cursor Object', 'Fetching Data: fetchone(), fetchall(),', 'Parameterized Queries and Preventing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_001', title: 'Introduction to Database Connectivity',
          caseStudy: { intro: 'Imagine you are building a Python app for your school library. The librarian has all book records stored in a MySQL database.',
            decisions: [{ prompt: 'What is the primary purpose of a database connector (like `mysql-connector-python`) in Python-MySQL connectivity?', options: [
                { text: 'A database connector acts as a bridge that translates Python function calls into the', outcome: 'A database connector acts as a bridge that translates Python function calls into the MySQL network.' },
                { text: 'it stores data', outcome: 'Not quite — Students often think that **importing the `mysql.connector` module automatically connects to the.', reveals: 'importing-the-mysql' },
                { text: 'it is the database itself', outcome: 'Not quite — Students often think that **importing the `mysql.connector` module automatically connects to the.', reveals: 'importing-the-mysql' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_003', title: 'Connecting to MySQL Using mysql.connector',
          caseStudy: { intro: 'Imagine you are building a Python app for your school library that needs to read book records from a MySQL database running on the lab server.',
            decisions: [{ prompt: 'What is the exact method name and module used to create a connection to a MySQL database in Python, and what does it return on success?', options: [
                { text: 'The method is `mysql.connector.connect()` and it returns a `MySQLConnection` object on', outcome: 'The method is `mysql.connector.connect()` and it returns a `MySQLConnection` object on success.' },
                { text: '`connect(', outcome: 'Not quite — Students often believe that `mysql.connector.connect()` automatically selects the database named.', reveals: 'mysql' },
                { text: '`mysql', outcome: 'Not quite — Students often believe that `mysql.connector.connect()` automatically selects the database named.', reveals: 'mysql' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_004', title: 'Creating Cursor Object and Executing Queries',
          caseStudy: { intro: 'Imagine you have successfully connected Python to your school\'s MySQL database (node c12_cs_cbse_06_003).',
            decisions: [{ prompt: 'What method of a connection object is used to create a cursor, and what is the primary purpose of that cursor object in mysql.connector?', options: [
                { text: 'The method is `cursor()` (e.g., `cur = conn.cursor()`)', outcome: 'The method is `cursor()` (e.g., `cur = conn.cursor()`). The cursor\'s primary purpose is to execute.' },
                { text: 'execute() creates the cursor', outcome: 'Not quite — Students often believe that `cur.execute("SELECT ...")` immediately returns the data (like a list.', reveals: 'cur' },
                { text: 'cursor stores data permanently', outcome: 'Not quite — Students often believe that `cur.execute("SELECT ...")` immediately returns the data (like a list.', reveals: 'cur' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_005', title: 'Fetching Data: fetchone(), fetchall(), fetchmany()',
          caseStudy: { intro: 'Imagine you have just run a query to get the names and marks of 500 students from a school database.',
            decisions: [{ prompt: 'What is the return type of `cursor.fetchone()` when the result set has at least one row remaining, and what does it return when the result.', options: [
                { text: '`fetchone()` returns a tuple representing the next row (e.g., `(\'Aman\', 85)`), and', outcome: '`fetchone()` returns a tuple representing the next row (e.g., `(\'Aman\', 85)`), and returns `N/A`.' },
                { text: 'returns a list', outcome: 'Not quite — Students often believe `fetchmany(size)` returns exactly `size` rows every time, and that.', reveals: 'fetchmany-size-returns-exactly-size' },
                { text: 'raises an exception', outcome: 'Not quite — Students often believe `fetchmany(size)` returns exactly `size` rows every time, and that.', reveals: 'fetchmany-size-returns-exactly-size' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A library app\'s \'return book\' feature runs without errors, yet the book still shows as issued in MySQL. The Python code executed the UPDATE, then closed — but never called conn.commit().',
            decisions: [{ prompt: 'Where did the update go?', options: [
                { text: 'Nowhere permanent — with autocommit off, the UPDATE sat in an uncommitted transaction and rolled back when the connection closed; add conn.commit() after the execute.', outcome: 'Connection manages the transaction boundary: DML only persists on commit, and cleanup means close cursor, close connection.' },
                { text: 'The connector auto-saves everything — the bug must be in the UPDATE\'s WHERE clause.', outcome: 'Executed SQL isn\'t persisted SQL; without commit the write vanishes on close, whatever the WHERE clause matched.', reveals: 'execute-commits-automatically' },
                { text: 'Importing mysql.connector already opened the database, so conn was redundant and broke things.', outcome: 'The module only supplies the API — connect() creates the session object whose cursor() runs SQL; neither is optional.', reveals: 'import-equals-connect' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now know why the pipeline is connect→cursor→execute→commit→close — and what breaks at each skipped step. This is the exact pattern every Python backend uses.',
            decisions: [{ prompt: 'What comes next? Database Connectivity · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Database Connectivity · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_001', difficulty: 'standard',
          question: 'Database connectivity refers to the mechanism that allows a Python program.',
          hint: 'Review the concept of a library/module in Python (`import`) and the idea of a network.',
          misconception: 'Students often think that **importing the `mysql.connector` module automatically connects to the database**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Database connectivity refers to the mechanism that allows a Python program to communicate',
                  options: ['Database connectivity refers to the mechanism that allows a Python program to communicate', 'MySQL Connector/Python is a standardized database driver that enables Python applications', 'Connecting to MySQL using `mysql.connector` is the process of establishing a', 'A cursor object in Python\'s mysql.connector acts as a control structure that enables'],
                  hint: 'Review the concept of a library/module in Python (`import`) and the idea of a network protocol.',
                  misconception: 'Students often think that **importing the `mysql.connector` module automatically connects to the database**.' }
          ],
            remediations: { 'importing-the-mysql': { steps: ['**Remediation:** Show the student two lines side-by-side: `import mysql.connector` `conn.', 'Then ask: "Which one has the `cursor()` method?" Have them run `print(dir(mysql.connector))` vs `print(dir(conn))`.', 'This concrete comparison clarifies that `connect()` *returns* the object you actually work with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that **importing the `mysql.connector` module automatically connects to the database**.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Once a connection is established, it remains open indefinitely unless the program crashes." Is this good practice? Why or why not?', answer: 'No, it is not good practice',
                  options: ['No, it is not good practice', '**importing the `mysql'],
                  hint: 'Review the concept of a library/module in Python (`import`) and the idea of a network protocol.',
                  misconception: 'Students often think that **importing the `mysql.connector` module automatically connects to the database**.' },
                { id: 'b', prompt: 'Design a real-world scenario where a Python application needs to connect to a MySQL database.', answer: '**Scenario:** A library management system where',
                  options: ['**Scenario:** A library management system where', '**importing the `mysql'],
                  hint: 'Review the concept of a library/module in Python (`import`) and the idea of a network protocol.',
                  misconception: 'Students often think that **importing the `mysql.connector` module automatically connects to the database**.' }
          ],
            remediations: { 'importing-the-mysql': { steps: ['**Remediation:** Show the student two lines side-by-side: `import mysql.connector` `conn.', 'Then ask: "Which one has the `cursor()` method?" Have them run `print(dir(mysql.connector))` vs `print(dir(conn))`.', 'This concrete comparison clarifies that `connect()` *returns* the object you actually work with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_002', difficulty: 'standard',
          question: 'MySQL Connector/Python is a standardized database driver that enables Python.',
          hint: 'If stuck, revisit Python\'s module system (import, packages) and pip usage from Class 11.',
          misconception: 'Students often think that installing the connector also installs the MySQL database server, or that `import mysql`.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'MySQL Connector/Python is a standardized database driver that enables Python applications',
                  options: ['MySQL Connector/Python is a standardized database driver that enables Python applications', 'Database connectivity refers to the mechanism that allows a Python program to communicate', 'Connecting to MySQL using `mysql.connector` is the process of establishing a', 'A cursor object in Python\'s mysql.connector acts as a control structure that enables'],
                  hint: 'If stuck, revisit Python\'s module system (import, packages) and pip usage from Class 11 Python.',
                  misconception: 'Students often think that installing the connector also installs the MySQL database server, or that `import mysql` is sufficient.' }
          ],
            remediations: { 'installing-the-connector-also-installs': { steps: ['If the student cannot import `mysql.connector` after installation, have them: 1) Run `python -m pip install --upgrade.', '2) Check `sys.executable` in the script to confirm the interpreter matches.', '3) In a fresh terminal, activate the virtual environment and repeat the import test.', '4) If still failing, uninstall and reinstall with `python -m pip uninstall mysql-connector-python` then reinstall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_003', difficulty: 'standard',
          question: 'Connecting to MySQL using `mysql.connector` is the process of establishing.',
          hint: 'If stuck, revisit `c12_cs_cbse_06_002` to re-run the installation verification script and.',
          misconception: 'Students often believe that `mysql.connector.connect()` automatically selects the database named in the `database`.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the `database` parameter in `mysql.connector.connect()` is optional, and what happens if you omit it.', answer: 'The `database` parameter is optional',
                  options: ['The `database` parameter is optional', 'it defaults to \'test\'', '`mysql'],
                  hint: 'If stuck, revisit `c12_cs_cbse_06_002` to re-run the installation verification script and confirm.',
                  misconception: 'Students often believe that `mysql.connector.connect()` automatically selects the database named in the `database` parameter and that all.' },
                { id: 'b', prompt: 'Compare and contrast the behaviour of `mysql.connector.connect()` when (a) the MySQL service is not running on the target host, and (b) the service is running.', answer: 'Case (a) raises `mysql.connector.Error` with `errno=2003` (CR_CONN_HOST_ERROR)',
                  options: ['Case (a) raises `mysql.connector.Error` with `errno=2003` (CR_CONN_HOST_ERROR)', '`mysql'],
                  hint: 'If stuck, revisit `c12_cs_cbse_06_002` to re-run the installation verification script and confirm.',
                  misconception: 'Students often believe that `mysql.connector.connect()` automatically selects the database named in the `database` parameter and that all.' }
          ],
            remediations: { 'mysql': { steps: ['Revisit node `c12_cs_cbse_06_002` (MySQL Connector: Installation and Import) to confirm `import mysql.connector` works.', 'Open a Python shell and run `mysql.connector.connect(host=\'localhost\', user=\'root\', password=\'wrong\')` — observe the.', 'Run the same with correct password but non-existent database — observe that connection succeeds but `conn.database`.', 'Write a 5-line script that uses `try-except-finally` to connect, print `conn.is_connected()`, and close.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_004', difficulty: 'standard',
          question: 'A cursor object in Python\'s mysql.connector acts as a control structure that.',
          hint: 'If stuck, revisit the connection parameters (host, user, password, database) in node.',
          misconception: 'Students often believe that `cur.execute("SELECT ...")` immediately returns the data (like a list of tuples) and that.',
          parts: [
                { id: 'a', prompt: 'What method of a connection object is used to create a cursor, and what is the primary purpose of that cursor object in mysql.connector?', answer: 'The method is `cursor()` (e.g., `cur = conn.cursor()`)',
                  options: ['The method is `cursor()` (e.g., `cur = conn.cursor()`)', 'execute() creates the cursor', 'cursor stores data permanently', 'SELECT'],
                  hint: 'If stuck, revisit the connection parameters (host, user, password, database) in node.',
                  misconception: 'Students often believe that `cur.execute("SELECT ...")` immediately returns the data (like a list of tuples) and that they can iterate over.' },
                { id: 'b', prompt: 'Explain in your own words what happens when you call `cur.execute("SELECT name FROM students WHERE class = \'12A\'")` on a valid cursor object.', answer: 'The cursor sends the SQL to the MySQL server',
                  options: ['The cursor sends the SQL to the MySQL server', 'the cursor now contains a list of names', 'execute() returns the data', 'SELECT'],
                  hint: 'If stuck, revisit the connection parameters (host, user, password, database) in node.',
                  misconception: 'Students often believe that `cur.execute("SELECT ...")` immediately returns the data (like a list of tuples) and that they can iterate over.' },
                { id: 'c', prompt: 'Compare and contrast the behavior of `cur.execute()` when the SQL is a SELECT versus when it is an UPDATE.', answer: 'For SELECT: cursor holds a result set positioned before first row',
                  options: ['For SELECT: cursor holds a result set positioned before first row', 'SELECT', '`cur.execute("SELECT'],
                  hint: 'If stuck, revisit the connection parameters (host, user, password, database) in node.',
                  misconception: 'Students often believe that `cur.execute("SELECT ...")` immediately returns the data (like a list of tuples) and that they can iterate over.' }
          ],
            remediations: { 'cur': { steps: ['If the student cannot distinguish between execute and fetch, have them: 1.', 'Revisit node c12_cs_cbse_06_003 to confirm they can create a valid connection object.', 'Write a minimal script that only creates a cursor and calls execute on a SELECT, then prints `type(cur)` and.', 'Add `cur.fetchall()` and print the result — now data appears.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_005', difficulty: 'standard',
          question: 'The `fetchone()`, `fetchall()`, and `fetchmany(size)` methods of a MySQL cursor.',
          hint: 'If confused about cursor position, re-read the "cursor position" analogy in node.',
          misconception: 'Students often believe `fetchmany(size)` returns exactly `size` rows every time, and that it returns `N/A` when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `fetchone()`, `fetchall()`, and `fetchmany(size)` methods of a MySQL cursor object',
                  options: ['The `fetchone()`, `fetchall()`, and `fetchmany(size)` methods of a MySQL cursor object', 'Database connectivity refers to the mechanism that allows a Python program to communicate', 'MySQL Connector/Python is a standardized database driver that enables Python applications', 'Connecting to MySQL using `mysql.connector` is the process of establishing a'],
                  hint: 'If confused about cursor position, re-read the "cursor position" analogy in node.',
                  misconception: 'Students often believe `fetchmany(size)` returns exactly `size` rows every time, and that it returns `N/A` when exhausted (like.' }
          ],
            remediations: { 'fetchmany-size-returns-exactly-size': { steps: ['Revisit node `c12_cs_cbse_06_004` (Creating Cursor Object and Executing Queries) to ensure the student can execute.', 'Practice in a Python shell: create a small table, run `cursor.execute("SELECT * FROM demo")`, then call `fetchone()`.', 'Write a 5-line script that loops with `fetchmany(3)` until it returns `[]`, printing the length of each batch.', 'Verify the loop terminates correctly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_06_006', difficulty: 'standard',
          question: 'Parameterized queries (prepared statements) are SQL statements that use.',
          hint: 'If unsure about `cursor.execute()` syntax, revisit **c12_cs_cbse_06_004** and practice 3.',
          misconception: '**Misconception:** "Using `%s` in an f-string like `f\\"SELECT * FROM t WHERE c = %s\\" % (val,)` is a parameterized.',
          parts: [
                { id: 'a', prompt: 'A student writes: `cursor.execute(f\\"SELECT * FROM products WHERE price < {max_price}\\")` where `max_price` comes from user input.', answer: 'Even if `max_price` is cast to `float`, an attacker can supply input like `100',
                  options: ['Even if `max_price` is cast to `float`, an attacker can supply input like `100', 'type-checking sanitizes input'],
                  hint: 'If unsure about `cursor.execute()` syntax, revisit **c12_cs_cbse_06_004** and practice 3 simple.',
                  misconception: '**Misconception:** "Using `%s` in an f-string like `f\\"SELECT * FROM t WHERE c = %s\\" % (val,)` is a parameterized query." **Why it\'s.' },
                { id: 'b', prompt: 'Compare the **network-level interaction** between the Python client and MySQL server when using (a) string concatenation vs (b) parameterized queries.', answer: 'string concatenation vs (',
                  options: ['string concatenation vs (', 'the driver escapes quotes', 'escaping (which is error-prone) is the mechanism'],
                  hint: 'If unsure about `cursor.execute()` syntax, revisit **c12_cs_cbse_06_004** and practice 3 simple.',
                  misconception: '**Misconception:** "Using `%s` in an f-string like `f\\"SELECT * FROM t WHERE c = %s\\" % (val,)` is a parameterized query." **Why it\'s.' }
          ],
            remediations: { 'misconception-using-s-in-an': { steps: ['**Revisit `c12_cs_cbse_06_004` (Creating Cursor Object and Executing Queries):** Re-read the `cursor.execute()`.', 'Practice writing 5 queries with `execute(query, (param1, param2))` — note the tuple.', '**Hands-on injection demo:** In a local MySQL, create a table `users(id, name)`.', 'Run two scripts: (a) concatenated query with input `"x\' OR \'1\'=\'1"` — observe it returns all rows.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
