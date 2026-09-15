import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch07_p1: SimDef = {
    id: 'v3_c11_ip_ch07_p1',
    title: 'Database Concepts and SQL · Part 1/2',
    subtitle: 'Give every part of a table its precise name — and see why NULL can\'t hold a key.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Database Concepts and SQL · Part 1/2',
    chapters: ['c11_ip_ch07'],
    nodeIds: ['c11_ip_cbse_07_001', 'c11_ip_cbse_07_002', 'c11_ip_cbse_07_003', 'c11_ip_cbse_07_004', 'c11_ip_cbse_07_005', 'c11_ip_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a database designer digitising a school\'s registers', intro: 'Three paper registers, one changed phone number, three places to update — the relational model was invented for exactly this mess.', goal: 'Distinguish relation, tuple, attribute, domain and keys, and contrast DBMS with file systems.' },
    discovery: {
        question: 'A designer argues: allow NULL in RollNumber because a new student may not have one yet. Does the relational model permit it?',
        options: ['No — RollNumber is the primary key, and NULL can\'t equal NULL, so two unassigned students would break tuple uniqueness', 'Yes — NULL means unknown, which is accurate here', 'Yes — as long as only one student lacks it', 'No — primary keys must be letters, not numbers'],
        answer: 'No — RollNumber is the primary key, and NULL can\'t equal NULL, so two unassigned students would break tuple uniqueness',
        hook: 'Two rows can share the same city and country legitimately — tuples are distinct on the whole row, not on any single column.',
    },
    teaching: [
        { title: 'Introduction to Data, Database and Database Management System', text: 'A Database Management System (DBMS) is a software system that enables users to define, create, maintain, and control access to a database—a logically organized collection of interrelated data stored.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Expose why two CSV files can\'t answer \'Name, Subject, Marks\' like a join can, then count a table\'s degree and cardinality correctly.',
        labels: ['Introduction to Data, Database', 'Relational Data Model: Tables,', 'Primary Key, Foreign Key', 'Introduction to SQL', 'DDL Commands: CREATE TABLE', 'DDL Commands: ALTER TABLE'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_001', title: 'Introduction to Data, Database and Database Management System',
          caseStudy: { intro: 'Imagine your school library still uses paper registers: one register for book details, another for student details, and a third for issue/return records.',
            decisions: [{ prompt: 'Define "data redundancy" in the context of a file system and give one concrete example from the school attendance scenario in the textbook.', options: [
                { text: 'Data redundancy is the duplication of the same data in multiple places within a file', outcome: 'Data redundancy is the duplication of the same data in multiple places within a file system.' },
                { text: 'redundancy means having extra columns', outcome: 'Not quite — Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another.', reveals: 'primary-key-unique-identifier-and' },
                { text: 'Primary Key = Unique Identifier', outcome: 'Not quite — Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another.', reveals: 'primary-key-unique-identifier-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_002', title: 'Relational Data Model: Tables, Tuples, Attributes and Domains',
          caseStudy: { intro: 'Imagine you are the class monitor asked to digitize the paper attendance register. You open a spreadsheet and wonder: "Is each row a student or a day?',
            decisions: [{ prompt: 'Define the term "degree of a relation" and state its value for the GUARDIAN relation shown in the NCERT textbook (Figure 7.5).', options: [
                { text: 'Degree is the number of attributes (columns) in a relation', outcome: 'Degree is the number of attributes (columns) in a relation. For GUARDIAN(GUID, GName, GPhone.' },
                { text: 'degree = 5 because there are 5 rows', outcome: 'Not quite — Students consistently treat "attribute", "column", "field", and "domain" as interchangeable.', reveals: 'students-consistently-treat-attribute' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_003', title: 'Primary Key, Foreign Key and Candidate Key Concepts',
          caseStudy: { intro: 'Imagine you are designing a database for your school library where each book must be uniquely tracked, each student has a unique admission number, and every.',
            decisions: [{ prompt: 'In the GUARDIAN relation (GUID, GName, GPhone, GAddress), the textbook states GUID and GPhone are candidate keys.', options: [
                { text: 'A candidate key must satisfy **uniqueness** (no two tuples have the same value for the', outcome: 'A candidate key must satisfy **uniqueness** (no two tuples have the same value for the key.' },
                { text: 'it must be unique', outcome: 'Not quite — **Misconception:** "A primary key is just any unique column; if a column has all distinct values.', reveals: 'misconception-a-primary-key-is' },
                { text: 'All three are primary keys', outcome: 'Not quite — **Misconception:** "A primary key is just any unique column; if a column has all distinct values.', reveals: 'misconception-a-primary-key-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_004', title: 'Introduction to SQL and MySQL Workbench Interface',
          caseStudy: { intro: 'Imagine you have a beautifully designed relational database for your school library (tables for Books, Students, IssuedBooks) but it sits silently on the.',
            decisions: [{ prompt: 'What is the full form of SQL and which category of SQL commands does `SELECT` belong to?', options: [
                { text: 'SQL stands for Structured Query Language', outcome: 'SQL stands for Structured Query Language. `SELECT` belongs to DML (Data Manipulation Language).' },
                { text: 'Simple Query Language', outcome: 'Not quite — Students often think **MySQL Workbench *is* the database** (the actual data storage).', reveals: 'mysql-workbench-is-the-database' },
                { text: 'I uninstalled Workbench, is my data gone?', outcome: 'Not quite — Students often think **MySQL Workbench *is* the database** (the actual data storage).', reveals: 'mysql-workbench-is-the-database' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_006', title: 'DDL Commands: ALTER TABLE and DROP TABLE',
          caseStudy: { intro: 'Imagine your school library database has a BOOKS table created last year without an ISBN column.',
            decisions: [{ prompt: 'What is the fundamental difference between ALTER TABLE and DROP TABLE in terms of data preservation and table existence after execution?', options: [
                { text: 'ALTER TABLE modifies the structure of an existing table while preserving all data and', outcome: 'ALTER TABLE modifies the structure of an existing table while preserving all data and keeping the.' },
                { text: 'both delete data', outcome: 'Not quite — Students believe ALTER TABLE ... MODIFY COLUMN can change a column\'s data type freely (e.g.', reveals: 'alter-table' },
                { text: 'ALTER TABLE creates a new table', outcome: 'Not quite — Students believe ALTER TABLE ... MODIFY COLUMN can change a column\'s data type freely (e.g.', reveals: 'alter-table' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Digitising the school library, a teammate designs a STUDENT table referencing GUARDIAN.GPhone as a foreign key — \'a foreign key references another table, and GPhone is unique.\' He also calls attribute, column, field and domain \'all the same word.\'',
            decisions: [{ prompt: 'What do relational rules actually demand?', options: [
                { text: 'Apply the key rules: a foreign key must reference the PRIMARY KEY of the other table — GPhone is unique but it\'s an alternate/candidate key, so it can\'t be the FK target; GUID can. And the terms sit at different levels: relation = the table, attribute = a column, tuple = a row, domain = the set of legal values for a column — the FK\'s domain must match the referenced PK\'s domain exactly.', outcome: 'The schema holds: one update fixes the phone number everywhere, because the links reference real primary keys over matching domains.' },
                { text: 'Accept GPhone as FK target — unique is unique; any one-of-a-kind column can be referenced.', outcome: 'Uniqueness isn\'t enough: referential integrity requires pointing at the primary key — candidate keys that weren\'t chosen can\'t anchor references.', reveals: 'fk-can-reference-any-unique-column' },
                { text: 'Keep the synonyms — column, field, attribute, domain are interchangeable labels.', outcome: 'They describe different levels: domain is the legal value set, attribute names the column, tuples are the rows — blurring them breaks constraint and integrity thinking.', reveals: 'domain-attribute-field-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Files scatter, relations link — a DBMS exists so a changed phone number is written once, not hunted through three registers.',
            decisions: [{ prompt: 'What comes next? Database Concepts and SQL · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Database Concepts and SQL · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_001', difficulty: 'standard',
          question: 'A Database Management System (DBMS) is a software system that enables users.',
          hint: 'Revisit Class 6 Math "Introduction to Data" (c6_math_ch09_095) and practice converting 5.',
          misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are.',
          parts: [
                { id: 'a', prompt: 'Explain why "data inconsistency" is a more dangerous problem than "data redundancy" in a file system, using the example of a student\'s name correction across.', answer: 'Redundancy wastes storage',
                  options: ['Redundancy wastes storage', 'redundancy uses more disk space', 'Primary Key = Unique Identifier', 'Foreign Key = Primary Key of another table'],
                  hint: 'Revisit Class 6 Math "Introduction to Data" (c6_math_ch09_095) and practice converting 5 raw.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions.' },
                { id: 'b', prompt: 'In the STUDENTATTENDANCE database (Figure 7.1), the GUARDIAN table has GUID as primary key. The STUDENT table includes GUID as a foreign key.', answer: 'Yes, GUID in STUDENT can be NULL',
                  options: ['Yes, GUID in STUDENT can be NULL', 'guardian unknown', 'foreign keys can never be NULL', 'Primary Key = Unique Identifier'],
                  hint: 'Revisit Class 6 Math "Introduction to Data" (c6_math_ch09_095) and practice converting 5 raw.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions.' }
          ],
            remediations: { 'primary-key-unique-identifier-and': { steps: ['Have the student list all candidate keys for GUARDIAN (GUID, GPhone).', 'Ask "Which one did the designer choose as primary key?" (GUID).', 'Show the schema diagram (Figure 7.2) where the foreign key arrow from STUDENT.GUID points to GUARDIAN.GUID—not.', 'Give a counter-example: "If STUDENT had GPhone as foreign key and a guardian changes phone number, the link breaks."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_002', difficulty: 'standard',
          question: 'In the Relational Data Model, a **relation** (table) is a two-dimensional.',
          hint: 'Revisit Class 9 Coordinate Geometry (c9_math_ch1_1) – the (x,y) ordered pair is the.',
          misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.',
          parts: [
                { id: 'a', prompt: 'Define the term "degree of a relation" and state its value for the GUARDIAN relation shown in the NCERT textbook (Figure 7.5).', answer: 'Degree is the number of attributes (columns) in a relation',
                  options: ['Degree is the number of attributes (columns) in a relation', 'degree = 5 because there are 5 rows'],
                  hint: 'Revisit Class 9 Coordinate Geometry (c9_math_ch1_1) – the (x,y) ordered pair is the simplest tuple.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' },
                { id: 'b', prompt: 'The ATTENDANCE relation has attributes (AttendanceDate, RollNumber, AttendanceStatus). On 2018-09-01, RollNumber 3 (Taleem Shah) is marked \'A\'.', answer: 'Yes, they are distinct tuples',
                  options: ['Yes, they are distinct tuples', 'they are duplicates'],
                  hint: 'Revisit Class 9 Coordinate Geometry (c9_math_ch1_1) – the (x,y) ordered pair is the simplest tuple.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' }
          ],
            remediations: { 'students-consistently-treat-attribute': { steps: ['Draw a three-column table on the board: left column "Concept", middle "Schema-level (design time)", right.', 'Fill rows: Attribute → "RollNumber (name + type INTEGER)" → "the column in every row"; Domain → "ℤ⁺ (all positive.', 'Give a concrete counter-example: "If domain = INTEGER, can RollNumber be -5?', 'Have the student redefine each term in their own words using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.',
          parts: [
                { id: 'a', prompt: 'Design a minimal relation schema for a "LIBRARY_BOOK" entity that captures: book identification, title, author, publication year, and current status.', answer: 'Relation: LIBRARY_BOOK(BookID, Title, Author, PubYear, Status)',
                  options: ['Relation: LIBRARY_BOOK(BookID, Title, Author, PubYear, Status)', 'available, issued, reserved'],
                  hint: 'Revisit Class 9 Coordinate Geometry (c9_math_ch1_1) – the (x,y) ordered pair is the simplest tuple.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' }
          ],
            remediations: { 'students-consistently-treat-attribute': { steps: ['Draw a three-column table on the board: left column "Concept", middle "Schema-level (design time)", right.', 'Fill rows: Attribute → "RollNumber (name + type INTEGER)" → "the column in every row"; Domain → "ℤ⁺ (all positive.', 'Give a concrete counter-example: "If domain = INTEGER, can RollNumber be -5?', 'Have the student redefine each term in their own words using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_003', difficulty: 'standard',
          question: 'A **Candidate Key** is a minimal set of one or more attributes that can.',
          hint: 'Revisit c11_ip_cbse_07_002 — specifically the definitions of tuple, attribute, degree.',
          misconception: '**Misconception:** "A primary key is just any unique column; if a column has all distinct values, it can be the primary.',
          parts: [
                { id: 'a', prompt: 'Given the following instance of a relation COURSE_ENROLLMENT (StudentID, CourseCode, Semester, Grade), identify which of the following attribute sets are.', answer: '(a) **Candidate key** if',
                  options: ['(a) **Candidate key** if', 'All three are primary keys'],
                  hint: 'Revisit c11_ip_cbse_07_002 — specifically the definitions of tuple, attribute, degree, cardinality.',
                  misconception: '**Misconception:** "A primary key is just any unique column; if a column has all distinct values, it can be the primary key." **Why it\'s.' }
          ],
            remediations: { 'misconception-a-primary-key-is': { steps: ['**Re-teach the hierarchy:** Draw a Venn diagram: Superkeys ⊃ Candidate Keys ⊃ Primary Key (single) + Alternate Keys.', 'Emphasise: *Every primary key is a candidate key; not every candidate key is a primary key.* 2.', '**Use the GUARDIAN example:** Walk through GUID vs.', 'GPhone — both candidate keys, GUID chosen as primary, GPhone becomes alternate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_004', difficulty: 'standard',
          question: 'SQL (Structured Query Language) is the standard language for communicating with.',
          hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) to recall table/tuple/attribute.',
          misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).',
          parts: [
                { id: 'a', prompt: 'What is the full form of SQL and which category of SQL commands does `SELECT` belong to?', answer: 'SQL stands for Structured Query Language',
                  options: ['SQL stands for Structured Query Language', 'Simple Query Language', 'I uninstalled Workbench, is my data gone?', 'SQL stands for "Simple Query Language" or that `SELECT` is DDL'],
                  hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) to recall table/tuple/attribute terminology, and.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' },
                { id: 'b', prompt: 'In MySQL Workbench, you see a panel on the left listing `sys`, `mysql`, `school_db` with expandable icons for Tables, Views, Routines.', answer: 'This is the **Schema Navigator** (or Navigator panel)',
                  options: ['This is the **Schema Navigator** (or Navigator panel)', 'Query Editor', 'data inside tables', 'I uninstalled Workbench, is my data gone?'],
                  hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) to recall table/tuple/attribute terminology, and.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' },
                { id: 'c', prompt: 'You have connected to the MySQL server in Workbench. You want to see the structure (column names, data types) of the `STUDENT` table in the `school_db` schema.', answer: 'Steps: 1) In Navigator panel, ensure `Schemas` tab is selected',
                  options: ['Steps: 1) In Navigator panel, ensure `Schemas` tab is selected', 'write `DESC STUDENT;` in query editor', 'I uninstalled Workbench, is my data gone?', '**MySQL Workbench *is* the database** (the actual data storage)'],
                  hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) to recall table/tuple/attribute terminology, and.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' }
          ],
            remediations: { 'mysql-workbench-is-the-database': { steps: ['**Clarify the architecture**: Draw a 3-box diagram: [You] <--GUI--> [MySQL Workbench (Client)] <--TCP/IP--> [MySQL.', 'Emphasize Workbench is just a window *into* the server.', '**Hands-on fix**: Have student stop the MySQL service (Services.msc or `systemctl stop mysql`), then try to connect.', 'Restart service — connects.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_005', difficulty: 'standard',
          question: 'The CREATE TABLE command is a Data Definition Language (DDL) statement used.',
          hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) and c11_ip_cbse_07_003 (Keys).',
          misconception: '**Misconception:** "VARCHAR(n) and CHAR(n) both store strings of length n, so it doesn\'t matter which I use." **Why.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The CREATE TABLE command is a Data Definition Language (DDL) statement used to define a',
                  options: ['The CREATE TABLE command is a Data Definition Language (DDL) statement used to define a', 'A Database Management System (DBMS) is a software system that enables users to define,', 'In the Relational Data Model, a **relation** (table) is a two-dimensional structure that', 'A **Candidate Key** is a minimal set of one or more attributes that can uniquely identify'],
                  hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) and c11_ip_cbse_07_003 (Keys) — practice.',
                  misconception: '**Misconception:** "VARCHAR(n) and CHAR(n) both store strings of length n, so it doesn\'t matter which I use." **Why it\'s wrong:** `CHAR(n)`.' }
          ],
            remediations: { 'misconception-varchar-n-and-char': { steps: ['**Concrete demo:** In MySQL Workbench, run: ```sql CREATE TABLE T1 (c1 CHAR(5), c2 VARCHAR(5)); INSERT INTO T1 VALUES.', '**Force the rule:** "If the real-world attribute has a **fixed, known length** (Aadhar 12, Mobile 10, PIN 6, Session.', 'If length varies naturally (Name, Address, Description), use `VARCHAR` with a sensible max." 3.', '**Drill:** Give 5 attributes (e.g., ISBN-13, Email, StateCode, PAN, Bio) and have the student choose CHAR vs VARCHAR.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_006', difficulty: 'standard',
          question: 'ALTER TABLE is a DDL command used to modify the structure of an existing table.',
          hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and Data Types) and c11_ip_cbse_07_003 (Keys.',
          misconception: 'Students believe ALTER TABLE ... MODIFY COLUMN can change a column\'s data type freely (e.g., VARCHAR to INT) without.',
          parts: [
                { id: 'a', prompt: 'A student writes: `ALTER TABLE STUDENTS ADD COLUMN Email VARCHAR(50) NOT NULL;` on a table that already has 200 rows.', answer: 'The statement fails',
                  options: ['The statement fails', 'it works fine', 'use UPDATE after', 'Just use MODIFY COLUMN Dept_Code INT'],
                  hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and Data Types) and c11_ip_cbse_07_003 (Keys concepts).',
                  misconception: 'Students believe ALTER TABLE ... MODIFY COLUMN can change a column\'s data type freely (e.g., VARCHAR to INT) without data loss, and that.' }
          ],
            remediations: { 'alter-table': { steps: ['Have the student create a test table with sample data: `CREATE TABLE TEST (Code CHAR(3)); INSERT INTO TEST VALUES.', 'Ask them to run `ALTER TABLE TEST MODIFY COLUMN Code INT;` and observe the error/truncation.', 'Create parent-child tables with a foreign key, then attempt `DROP TABLE parent;` to see the referential integrity error.', 'Guide them to read the exact error messages (ERROR 1051, ERROR 3730) and connect each to the specific rule violated.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
