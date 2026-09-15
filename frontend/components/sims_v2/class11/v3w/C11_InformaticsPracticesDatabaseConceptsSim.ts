import type { SimDef } from '../../engine/types';
import C11_InformaticsPracticesDatabaseConceptsSim from '../../../simulations/c6_12/C11_InformaticsPracticesDatabaseConceptsSim';

/** v3 wrapped master — C11_InformaticsPracticesDatabaseConceptsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_informaticspracticesdatabaseconceptssim: SimDef = {
    id: 'v3w_c11_informaticspracticesdatabaseconceptssim',
    title: 'Informatics Practices Database Concepts',
    subtitle: 'This node covers: data vs information, file system limitations (redundancy,.',
    classLevel: 11, subject: 'science', topic: 'Introduction to Data, Database and Database Management System',
    chapters: [],
    nodeIds: ['c11_ip_cbse_07_001', 'c11_ip_cbse_07_005', 'c11_ip_cbse_07_002', 'c11_ip_cbse_07_003', 'c11_ip_cbse_07_004', 'c11_ip_cbse_07_006', 'c11_ip_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine your school library still uses paper registers: one register for book details, another for student.', goal: 'Master Informatics Practices Database Concepts.' },
    discovery: {
        question: 'Explain why "data inconsistency" is a more dangerous problem than "data redundancy" in a file system, using the example of a student\'s name correction across.',
        options: ['Redundancy wastes storage', 'redundancy uses more disk space', 'Primary Key = Unique Identifier'],
        answer: 'Redundancy wastes storage',
        hook: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are.',
    },
    teaching: [
        { title: 'A Database Management System (DBMS) is a.', text: 'A Database Management System (DBMS) is a software system that enables users to define, create, maintain, and control access to a database—a logically organized collection of interrelated data stored.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_001', title: 'A Database Management System (DBMS) is.',
          scaffold: { problem: 'A coaching center maintains student records in three separate Excel files: STUDENT(RegNo, Name, Phone), BATCH(BatchCode, Time, Teacher),.',
            steps: [
            { text: 'List the three files and their columns. Note that RegNo appears in STUDENT and ENROLLMENT; BatchCode appears in BATCH.' },
            { text: 'Identify redundancy: Student Name and Phone are stored once per student in STUDENT, but if a student enrolls in.' },
            { text: 'Identify inconsistency risk: If a student changes phone number, it must be updated in STUDENT.' },
            { text: 'Identify dependence: If the owner adds a column "Email" to STUDENT, any Excel macro/VBA script reading STUDENT must be.' },
            { text: 'Design DBMS solution: Create three relations: Student(RegNo PK, Name, Phone), Batch(BatchCode PK, Time, Teacher),.' },
            { text: 'Show how DBMS resolves each: (a) Isolation → relations linked by FK; (b) Redundancy → Name/Phone stored once in.' },
            { text: 'Verify: Query "SELECT Name, Time, Teacher FROM Student JOIN Enrollment ON Student.RegNo=Enrollment.RegNo JOIN Batch ON.', faded: true, blankAnswer: 'Limitations exhibited: Data Isolation (separate files),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_005', title: 'The CREATE TABLE command is a Data.',
          scaffold: { problem: 'Design a `BOOK` table for a library. Each book has a 13-digit ISBN (may start with 0), title (max 100 chars, mandatory), author (max 50.',
            steps: [
            { text: 'List attributes with real-world meaning and constraints: ISBN (13 digits, leading zeros possible, PK), Title (variable,.' },
            { text: 'Map each to MySQL data type: ISBN → CHAR(13) (preserves leading zeros, fixed length), Title → VARCHAR(100) NOT NULL,.' },
            { text: 'Choose constraints: ISBN PRIMARY KEY, Title NOT NULL, CatCode NOT NULL + CHECK (CatCode IN.' },
            { text: 'Write the statement with column-level constraints where possible, table-level for composite/multi-column (none here).' },
            { text: 'Verify: all mandatory columns have NOT NULL, PK on ISBN, domain-specific CHECKs, correct precision for price.', faded: true, blankAnswer: '```sql' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_002', title: 'In the Relational Data Model, a.',
          scaffold: { problem: 'A school\'s "FEE_RECEIPT" relation has attributes (ReceiptNo, StudentID, Date, Amount, Mode). The current instance has 850 tuples.',
            steps: [
            { text: 'Identify the relation name (FEE_RECEIPT) and list its attributes explicitly from the problem statement: ReceiptNo,.' },
            { text: 'Count the attributes to find degree: there are 5 attributes → degree = 5.' },
            { text: 'The problem states "current instance has 850 tuples" → cardinality = 850 (cardinality is instance-specific, changes.' },
            { text: 'Check domain violation: the declared domain of Mode is the set {\'Cash\',\'Card\',\'UPI\',\'Cheque\'}.' },
            { text: 'Projection (ReceiptNo, Amount) selects 2 attributes → each resulting tuple has 2 attribute values (degree of projected.', faded: true, blankAnswer: '(a) Degree = 5. (b) Cardinality = 850. (c) Yes, \'Wallet\' ∉.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_003', title: 'A **Candidate Key** is a minimal set of.',
          scaffold: { problem: 'A school maintains a relation TEACHER(TID, TName, Dept, Phone, Email) with the following instance:',
            steps: [
            { text: 'Check each single attribute for uniqueness across all tuples. TID: T101, T102, T103 — all distinct → candidate key.' },
            { text: 'Check combinations for minimality. {TID, Phone} is unique but contains TID (already a candidate key) → not minimal →.' },
            { text: 'Candidate keys = {TID}, {Phone}, {Email}. All are minimal and unique.' },
            { text: 'Choose primary key. TID is best: system-generated, immutable, short. Phone/Email can change. Select TID as primary key.' },
            { text: 'Alternate keys = remaining candidate keys = {Phone}, {Email}. Both must be declared UNIQUE in SQL.', faded: true, blankAnswer: 'Candidate keys: {TID}, {Phone}, {Email}. Primary key: TID..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_004', title: 'SQL (Structured Query Language) is the.',
          scaffold: { problem: 'A student has installed MySQL Server and MySQL Workbench on their Windows laptop.',
            steps: [
            { text: 'Launch MySQL Workbench. On the home screen, locate the "MySQL Connections" section and click the **+** (plus) icon next.' },
            { text: 'In "Connection Name", type a descriptive name like `Local_Class11_IP`. Keep "Connection Method" as "Standard (TCP/IP)".' },
            { text: 'Set "Hostname" to `127.0.0.1` (or `localhost`) and "Port" to `3306` (default). Enter "Username" as `root`.' },
            { text: 'Click "Store in Keychain" (or "Store in Vault") button, enter the password `admin123` when prompted, and click OK.' },
            { text: 'Click "Test Connection" at the bottom of the dialog. If successful, a message "Successfully made the MySQL connection".' },
            { text: 'On the home screen, double-click the `Local_Class11_IP` connection tile.', faded: true, blankAnswer: 'Connection named `Local_Class11_IP` created and tested.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_006', title: 'ALTER TABLE is a DDL command used to.',
          scaffold: { problem: 'A school database has a table STUDENTS (Roll_No INT PRIMARY KEY, Name VARCHAR(50), Class VARCHAR(10), DOB DATE).',
            steps: [
            { text: 'Add Email column with DEFAULT placeholder since table is non-empty and column is NOT NULL: `ALTER TABLE STUDENTS ADD.' },
            { text: 'Add UNIQUE constraint on Email separately (MySQL allows this): `ALTER TABLE STUDENTS ADD CONSTRAINT uq_student_email.' },
            { text: 'Create CLASSES table first (referenced table must exist): `CREATE TABLE CLASSES (Class_ID INT PRIMARY KEY, Class_Name.' },
            { text: 'Add new Class_ID column as nullable first: `ALTER TABLE STUDENTS ADD COLUMN Class_ID INT;`' },
            { text: 'Update Class_ID based on old Class values (requires mapping logic): `UPDATE STUDENTS SET Class_ID = CASE Class WHEN.' },
            { text: 'Add foreign key constraint: `ALTER TABLE STUDENTS ADD CONSTRAINT fk_student_class FOREIGN KEY (Class_ID) REFERENCES.' },
            { text: 'Drop old Class column: `ALTER TABLE STUDENTS DROP COLUMN Class;`' },
            { text: 'Add CHECK constraint for DOB: `ALTER TABLE STUDENTS ADD CONSTRAINT chk_dob CHECK (DOB > \'2000-01-01\');` (Note: MySQL.', faded: true, blankAnswer: 'Sequence of 8 statements as above; existing data preserved.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_ip_cbse_07_005', title: 'Identify each idea',
          dissect: { specimen: 'Informatics Practices Database Concepts', spots: [
            { id: 's1', label: 'A Database Management System DBMS', prompt: 'Which idea is this? — A Database Management System (DBMS) is a software system that enables users to define,.', answer: 'A Database Management System DBMS', options: ['A Database Management System DBMS', 'The CREATE TABLE command is', 'In the Relational Data Model', 'A Candidate Key is a'] },
            { id: 's2', label: 'The CREATE TABLE command is', prompt: 'Which idea is this? — The CREATE TABLE command is a Data Definition Language (DDL) statement used to define a.', answer: 'The CREATE TABLE command is', options: ['The CREATE TABLE command is', 'A Database Management System DBMS', 'In the Relational Data Model', 'A Candidate Key is a'] },
            { id: 's3', label: 'In the Relational Data Model', prompt: 'Which idea is this? — In the Relational Data Model, a **relation** (table) is a two-dimensional structure that.', answer: 'In the Relational Data Model', options: ['In the Relational Data Model', 'A Database Management System DBMS', 'The CREATE TABLE command is', 'A Candidate Key is a'] },
            { id: 's4', label: 'A Candidate Key is a', prompt: 'Which idea is this? — A **Candidate Key** is a minimal set of one or more attributes that can uniquely identify.', answer: 'A Candidate Key is a', options: ['A Candidate Key is a', 'A Database Management System DBMS', 'The CREATE TABLE command is', 'In the Relational Data Model'] },
            { id: 's5', label: 'SQL Structured Query Language is', prompt: 'Which idea is this? — SQL (Structured Query Language) is the standard language for communicating with a.', answer: 'SQL Structured Query Language is', options: ['SQL Structured Query Language is', 'A Database Management System DBMS', 'The CREATE TABLE command is', 'In the Relational Data Model'] },
            { id: 's6', label: 'ALTER TABLE is a DDL', prompt: 'Which idea is this? — ALTER TABLE is a DDL command used to modify the structure of an existing table by adding,.', answer: 'ALTER TABLE is a DDL', options: ['ALTER TABLE is a DDL', 'A Database Management System DBMS', 'The CREATE TABLE command is', 'In the Relational Data Model'] }
          ] } }
    ],
    explore: { component: C11_InformaticsPracticesDatabaseConceptsSim, prompt: 'Explore the interactive — Informatics Practices Database Concepts' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_001', difficulty: 'standard',
          question: 'A Database Management System (DBMS) is a software system that enables users to.',
          hint: 'Revisit Class 6 Math "Introduction to Data" (c6_math_ch09_095) and practice converting 5.',
          misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are.',
          parts: [
                { id: 'a', prompt: 'Explain why "data inconsistency" is a more dangerous problem than "data redundancy" in a file system, using the example of a student\'s name correction across.', answer: 'Redundancy wastes storage',
                  options: ['Redundancy wastes storage', 'redundancy uses more disk space', 'Primary Key = Unique Identifier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions,.' },
                { id: 'b', prompt: 'In the STUDENTATTENDANCE database (Figure 7.1), the GUARDIAN table has GUID as primary key. The STUDENT table includes GUID as a foreign key.', answer: 'Yes, GUID in STUDENT can be NULL',
                  options: ['Yes, GUID in STUDENT can be NULL', 'guardian unknown', 'foreign keys can never be NULL'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions,.' }
          ],
            remediations: { 'primary-key-unique-identifier-and': { steps: ['Have the student list all candidate keys for GUARDIAN (GUID, GPhone).', 'Ask "Which one did the designer choose as primary key?" (GUID).', 'Show the schema diagram (Figure 7.2) where the foreign key arrow from STUDENT.GUID points to GUARDIAN.GUID—not to.', 'Give a counter-example: "If STUDENT had GPhone as foreign key and a guardian changes phone number, the link breaks."', 'Drill the rule: "Foreign key ALWAYS references the PRIMARY KEY of the parent table, not just any unique column."'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are.',
          parts: [
                { id: 'a', prompt: 'In the STUDENTATTENDANCE database (Figure 7.1), the GUARDIAN table has GUID as primary key. The STUDENT table includes GUID as a foreign key.', answer: 'Yes, GUID in STUDENT can be NULL',
                  options: ['Yes, GUID in STUDENT can be NULL', 'guardian unknown', 'foreign keys can never be NULL', 'Primary Key = Unique Identifier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions,.' }
          ],
            remediations: { 'primary-key-unique-identifier-and': { steps: ['Have the student list all candidate keys for GUARDIAN (GUID, GPhone).', 'Ask "Which one did the designer choose as primary key?" (GUID).', 'Show the schema diagram (Figure 7.2) where the foreign key arrow from STUDENT.GUID points to GUARDIAN.GUID—not to.', 'Give a counter-example: "If STUDENT had GPhone as foreign key and a guardian changes phone number, the link breaks."', 'Drill the rule: "Foreign key ALWAYS references the PRIMARY KEY of the parent table, not just any unique column."'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_005', difficulty: 'standard',
          question: 'The CREATE TABLE command is a Data Definition Language (DDL) statement used to.',
          hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) and c11_ip_cbse_07_003 (Keys) —.',
          misconception: '**Misconception:** "VARCHAR(n) and CHAR(n) both store strings of length n, so it doesn\'t matter which I use." **Why.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The CREATE TABLE command is a Data Definition Language (DDL) statement used to define a',
                  options: ['The CREATE TABLE command is a Data Definition Language (DDL) statement used to define a', 'A Database Management System (DBMS) is a software system that enables users to define,', 'In the Relational Data Model, a **relation** (table) is a two-dimensional structure that', 'A **Candidate Key** is a minimal set of one or more attributes that can uniquely identify'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "VARCHAR(n) and CHAR(n) both store strings of length n, so it doesn\'t matter which I use." **Why it\'s wrong:** `CHAR(n)`.' }
          ],
            remediations: { 'misconception-varchar-n-and-char': { steps: ['**Concrete demo:** In MySQL Workbench, run: ```sql CREATE TABLE T1 (c1 CHAR(5), c2 VARCHAR(5)); INSERT INTO T1 VALUES.', '**Force the rule:** "If the real-world attribute has a **fixed, known length** (Aadhar 12, Mobile 10, PIN 6, Session.', 'If length varies naturally (Name, Address, Description), use `VARCHAR` with a sensible max." 3.', '**Drill:** Give 5 attributes (e.g., ISBN-13, Email, StateCode, PAN, Bio) and have the student choose CHAR vs VARCHAR.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_002', difficulty: 'standard',
          question: 'In the Relational Data Model, a **relation** (table) is a two-dimensional.',
          hint: 'Revisit Class 9 Coordinate Geometry (c9_math_ch1_1) – the (x,y) ordered pair is the.',
          misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.',
          parts: [
                { id: 'a', prompt: 'The ATTENDANCE relation has attributes (AttendanceDate, RollNumber, AttendanceStatus). On 2018-09-01, RollNumber 3 (Taleem Shah) is marked \'A\'.', answer: 'Yes, they are distinct tuples',
                  options: ['Yes, they are distinct tuples', 'they are duplicates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' }
          ],
            remediations: { 'students-consistently-treat-attribute': { steps: ['Draw a three-column table on the board: left column "Concept", middle "Schema-level (design time)", right.', 'Fill rows: Attribute → "RollNumber (name + type INTEGER)" → "the column in every row"; Domain → "ℤ⁺ (all positive.', 'Give a concrete counter-example: "If domain = INTEGER, can RollNumber be -5?', 'Have the student redefine each term in their own words using this table.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.',
          parts: [
                { id: 'a', prompt: 'Design a minimal relation schema for a "LIBRARY_BOOK" entity that captures: book identification, title, author, publication year, and current status.', answer: 'Relation: LIBRARY_BOOK(BookID, Title, Author, PubYear, Status)',
                  options: ['Relation: LIBRARY_BOOK(BookID, Title, Author, PubYear, Status)', 'available, issued, reserved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' }
          ],
            remediations: { 'students-consistently-treat-attribute': { steps: ['Draw a three-column table on the board: left column "Concept", middle "Schema-level (design time)", right.', 'Fill rows: Attribute → "RollNumber (name + type INTEGER)" → "the column in every row"; Domain → "ℤ⁺ (all positive.', 'Give a concrete counter-example: "If domain = INTEGER, can RollNumber be -5?', 'Have the student redefine each term in their own words using this table.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_003', difficulty: 'standard',
          question: 'A **Candidate Key** is a minimal set of one or more attributes that can.',
          hint: 'Revisit c11_ip_cbse_07_002 — specifically the definitions of tuple, attribute, degree,.',
          misconception: '**Misconception:** "A primary key is just any unique column; if a column has all distinct values, it can be the primary.',
          parts: [
                { id: 'a', prompt: 'Given the following instance of a relation COURSE_ENROLLMENT (StudentID, CourseCode, Semester, Grade), identify which of the following attribute sets are.', answer: '(a) **Candidate key** if',
                  options: ['(a) **Candidate key** if', 'All three are primary keys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "A primary key is just any unique column; if a column has all distinct values, it can be the primary key." **Why it\'s.' }
          ],
            remediations: { 'misconception-a-primary-key-is': { steps: ['**Re-teach the hierarchy:** Draw a Venn diagram: Superkeys ⊃ Candidate Keys ⊃ Primary Key (single) + Alternate Keys.', 'Emphasise: *Every primary key is a candidate key; not every candidate key is a primary key.* 2.', '**Use the GUARDIAN example:** Walk through GUID vs.', 'GPhone — both candidate keys, GUID chosen as primary, GPhone becomes alternate.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_004', difficulty: 'standard',
          question: 'SQL (Structured Query Language) is the standard language for communicating with.',
          hint: 'Revisit c11_ip_cbse_07_002 (Relational Data Model) to recall table/tuple/attribute.',
          misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).',
          parts: [
                { id: 'a', prompt: 'What is the full form of SQL and which category of SQL commands does `SELECT` belong to?', answer: 'SQL stands for Structured Query Language',
                  options: ['SQL stands for Structured Query Language', 'Simple Query Language', 'I uninstalled Workbench, is my data gone?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' },
                { id: 'b', prompt: 'In MySQL Workbench, you see a panel on the left listing `sys`, `mysql`, `school_db` with expandable icons for Tables, Views, Routines.', answer: 'This is the **Schema Navigator** (or Navigator panel)',
                  options: ['This is the **Schema Navigator** (or Navigator panel)', 'Query Editor', 'data inside tables'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' },
                { id: 'c', prompt: 'You have connected to the MySQL server in Workbench. You want to see the structure (column names, data types) of the `STUDENT` table in the `school_db` schema.', answer: 'Steps: 1) In Navigator panel, ensure `Schemas` tab is selected',
                  options: ['Steps: 1) In Navigator panel, ensure `Schemas` tab is selected', 'write `DESC STUDENT;` in query editor', 'I uninstalled Workbench, is my data gone?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' }
          ],
            remediations: { 'mysql-workbench-is-the-database': { steps: ['**Clarify the architecture**: Draw a 3-box diagram: [You] <--GUI--> [MySQL Workbench (Client)] <--TCP/IP--> [MySQL.', 'Emphasize Workbench is just a window *into* the server.', '**Hands-on fix**: Have student stop the MySQL service (Services.msc or `systemctl stop mysql`), then try to connect in.', 'Restart service — connects.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).',
          parts: [
                { id: 'a', prompt: 'A student writes `select * from student;` in the Query Editor and clicks the lightning bolt icon (Execute). The Output Panel shows "Error Code: 1046.', answer: 'The student has not selected a default schema (database)',
                  options: ['The student has not selected a default schema (database)', 'add `USE school_db;` before the query', 'I uninstalled Workbench, is my data gone?', '**MySQL Workbench *is* the database** (the actual data storage)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' },
                { id: 'b', prompt: 'Design a new scenario (different from school library) where a Class 11 student would need to use MySQL Workbench.', answer: 'Example: **Database:** `canteen_db` **Tables:** `MENU` (ItemID, ItemName, Price,',
                  options: ['Example: **Database:** `canteen_db` **Tables:** `MENU` (ItemID, ItemName, Price,', 'I uninstalled Workbench, is my data gone?', '**MySQL Workbench *is* the database** (the actual data storage)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **MySQL Workbench *is* the database** (the actual data storage).' }
          ],
            remediations: { 'mysql-workbench-is-the-database': { steps: ['**Clarify the architecture**: Draw a 3-box diagram: [You] <--GUI--> [MySQL Workbench (Client)] <--TCP/IP--> [MySQL.', 'Emphasize Workbench is just a window *into* the server.', '**Hands-on fix**: Have student stop the MySQL service (Services.msc or `systemctl stop mysql`), then try to connect in.', 'Restart service — connects.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_006', difficulty: 'standard',
          question: 'ALTER TABLE is a DDL command used to modify the structure of an existing table.',
          hint: 'Revisit c11_ip_cbse_07_005 (CREATE TABLE and Data Types) and c11_ip_cbse_07_003 (Keys.',
          misconception: 'Students believe ALTER TABLE ... MODIFY COLUMN can change a column\'s data type freely (e.g., VARCHAR to INT) without.',
          parts: [
                { id: 'a', prompt: 'A student writes: `ALTER TABLE STUDENTS ADD COLUMN Email VARCHAR(50) NOT NULL;` on a table that already has 200 rows.', answer: 'The statement fails',
                  options: ['The statement fails', 'it works fine', 'use UPDATE after'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ALTER TABLE ... MODIFY COLUMN can change a column\'s data type freely (e.g., VARCHAR to INT) without data loss, and that.' }
          ],
            remediations: { 'alter-table': { steps: ['Have the student create a test table with sample data: `CREATE TABLE TEST (Code CHAR(3)); INSERT INTO TEST VALUES.', 'Ask them to run `ALTER TABLE TEST MODIFY COLUMN Code INT;` and observe the error/truncation.', 'Create parent-child tables with a foreign key, then attempt `DROP TABLE parent;` to see the referential integrity error.', 'Guide them to read the exact error messages (ERROR 1051, ERROR 3730) and connect each to the specific rule violated.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
