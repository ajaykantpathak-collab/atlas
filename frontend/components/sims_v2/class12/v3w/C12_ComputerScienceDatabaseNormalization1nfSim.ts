import type { SimDef } from '../../engine/types';
import C12_ComputerScienceDatabaseNormalization1nfSim from '../../../simulations/c6_12/C12_ComputerScienceDatabaseNormalization1nfSim';

/** v3 wrapped master — C12_ComputerScienceDatabaseNormalization1nfSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencedatabasenormalization1nfsim: SimDef = {
    id: 'v3w_c12_computersciencedatabasenormalization1nfsim',
    title: 'Introduction to Databases and DBMS',
    subtitle: 'This node covers fundamental definitions: data vs information, database, DBMS, database.',
    classLevel: 12, subject: 'computer_science', topic: 'Introduction to Databases and DBMS',
    chapters: [],
    nodeIds: ['c12_cs_cbse_04_001', 'c12_cs_cbse_04_003', 'c12_cs_cbse_04_004', 'c12_cs_cbse_04_010', 'c12_cs_cbse_04_002', 'c12_cs_cbse_04_005', 'c12_cs_cbse_04_008', 'c12_cs_cbse_04_009', 'c12_cs_cbse_12_003', 'c12_cs_cbse_12_012', 'c12_cs_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you run a small online bookstore. Orders, customer details, book inventory, and payment records are.', goal: 'Master Introduction to Databases and DBMS.' },
    discovery: {
        question: 'What is the fundamental difference between a database and a DBMS? Give a one-sentence definition of each.',
        options: ['A database is the organized collection of data itself', 'DBMS is the database', 'database system'],
        answer: 'A database is the organized collection of data itself',
        hook: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.',
    },
    teaching: [
        { title: 'A database is an organized collection of.', text: 'A database is an organized collection of structured data stored electronically in a computer system, typically managed by a Database Management System (DBMS) — software that provides controlled.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_001', title: 'A database is an organized collection.',
          scaffold: { problem: 'A small medical clinic currently keeps patient records in separate Word documents (one per patient).',
            steps: [
            { text: 'Identify problem (i) — searching across documents is manual and slow. DBMS feature: Query Language (SQL) with indexing.' },
            { text: 'Identify problem (ii) — concurrent updates cause lost updates. DBMS feature: Concurrency Control (Locking / MVCC).' },
            { text: 'Identify problem (iii) — no backup/recovery. DBMS feature: Backup and Recovery (Transaction Log, Point-in-Time.' },
            { text: 'Synthesize: A single DBMS (e.g., PostgreSQL) provides all three features out-of-the-box, eliminating custom development.' },
            { text: 'Verify: Each feature maps to a standard DBMS function (query, concurrency, recovery) — no ad-hoc scripting needed.', faded: true, blankAnswer: '(i) SQL + Indexing; (ii) Concurrency Control.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_003', title: 'A database model defines the logical.',
          scaffold: { problem: 'A school has Students and Clubs. Each student can join multiple clubs; each club has multiple students.',
            steps: [
            { text: 'Identify the two entities (Student, Club) and the many‑to‑many relationship (Membership).' },
            { text: 'In hierarchical model, choose a root — either Student or Club. Suppose we choose Student as root.' },
            { text: 'Under each Student record, create child Club records for every club the student joins.' },
            { text: 'To find all members of a club, you must scan every Student subtree and collect matching Club records — inefficient.' },
            { text: 'Conclude: Hierarchical model forces redundancy (Club data repeated) and makes reverse queries (club → students).', faded: true, blankAnswer: 'Structure: Student (root) → Club (child, repeated per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_004', title: 'In the relational data model, a.',
          scaffold: { problem: 'A school maintains a relation `Student(AdmNo, Name, Class, Section, DOB)`. The current instance has 850 students.',
            steps: [
            { text: 'Identify the given relation schema: 5 attributes (AdmNo, Name, Class, Section, DOB) → degree = 5.' },
            { text: 'Identify the given relation instance size: 850 students → 850 tuples → cardinality = 850.' },
            { text: 'For part (b), adding one attribute increases degree by 1 → new degree = 6; no new tuples added → cardinality unchanged.' },
            { text: 'For part (c), domain of `Class` = {1, 2, 3, ..., 12} (integers 1 to 12); domain of `Section` = {\'A\', \'B\', \'C\', \'D\'}.' },
            { text: 'Verify: degree = number of columns, cardinality = number of rows. Adding column changes schema not instance size.', faded: true, blankAnswer: '(a) Degree = 5, Cardinality = 850. (b) New degree = 6,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_010', title: 'Normalization is the systematic process.',
          scaffold: { problem: 'A coaching center maintains a single table Batch_Details(Batch_ID, Batch_Name, Student_ID, Student_Name, Course_ID, Course_Name, Fee).',
            steps: [
            { text: 'Identify the candidate key. The only determinant that can determine all attributes is (Batch_ID, Student_ID, Course_ID).' },
            { text: 'List non‑prime attributes: Batch_Name, Student_Name, Course_Name, Fee.' },
            { text: 'Check 1NF — assume all attributes are atomic (no repeating groups).' },
            { text: 'Check 2NF — look for partial dependencies. Batch_ID → Batch_Name (Batch_Name depends on part of key), Student_ID →.' },
            { text: 'Check 3NF on each. R1, R2, R3 have single‑attribute keys, so no non‑prime attributes → automatically in 3NF.' },
            { text: 'Verify lossless join and dependency preservation (optional but good practice).', faded: true, blankAnswer: 'Final 3NF schemas: R1(Batch_ID, Batch_Name), R2(Student_ID,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_002', title: 'A file system manages data as separate.',
          scaffold: { problem: 'A coaching institute maintains student data in three separate text files: STUDENT.TXT (RollNo, Name, Phone), BATCH.TXT (RollNo, BatchCode,.',
            steps: [
            { text: 'Read STUDENT.TXT into memory, parse each line into fields.' },
            { text: 'Read BATCH.TXT, parse, and build a mapping from RollNo to BatchCode.' },
            { text: 'Read FEES.TXT, parse, and for each RollNo sum AmountPaid.' },
            { text: 'For each student in STUDENT.TXT, look up BatchCode from Step 2 mapping and total paid from Step 3 mapping; if BatchCode.' },
            { text: 'Identify problems: (a) If a RollNo in BATCH.TXT has a typo (e.g., \'101\' vs \'10 1\'), the join fails silently — no.', faded: true, blankAnswer: 'File-system steps as above; three problems: lack of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_005', title: 'In a relational database, a **key** is.',
          scaffold: { problem: 'A school maintains a `Teacher` table with attributes: `TeacherID`, `AadharNo`, `PAN`, `Email`, `Phone`, `DeptID`.',
            steps: [
            { text: 'List all attributes and their uniqueness property based on the problem statement.' },
            { text: 'Identify candidate keys — any minimal set of attributes that uniquely identifies a tuple.' },
            { text: 'Choose primary key — typically the one most suitable for referencing (short, stable, numeric).' },
            { text: 'Alternate keys = all candidate keys except the primary key = {AadharNo}, {PAN}, {Email}.' },
            { text: 'Explain non-candidate keys: Phone is not unique (two teachers may share a landline), so it cannot identify a tuple.', faded: true, blankAnswer: 'Candidate keys: {TeacherID}, {AadharNo}, {PAN}, {Email}..' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_04_003', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Databases and DBMS', spots: [
            { id: 's1', label: 'A database is an organized', prompt: 'Which idea is this? — A database is an organized collection of structured data stored electronically in a.', answer: 'A database is an organized', options: ['A database is an organized', 'A database model defines the', 'In the relational data model', 'Normalization is the systematic process'] },
            { id: 's2', label: 'A database model defines the', prompt: 'Which idea is this? — A database model defines the logical structure of a database, specifying how data is.', answer: 'A database model defines the', options: ['A database model defines the', 'A database is an organized', 'In the relational data model', 'Normalization is the systematic process'] },
            { id: 's3', label: 'In the relational data model', prompt: 'Which idea is this? — In the relational data model, a **relation** is a table with rows and columns where each.', answer: 'In the relational data model', options: ['In the relational data model', 'A database is an organized', 'A database model defines the', 'Normalization is the systematic process'] },
            { id: 's4', label: 'Normalization is the systematic process', prompt: 'Which idea is this? — Normalization is the systematic process of decomposing relations (tables) to eliminate.', answer: 'Normalization is the systematic process', options: ['Normalization is the systematic process', 'A database is an organized', 'A database model defines the', 'In the relational data model'] },
            { id: 's5', label: 'A file system manages data', prompt: 'Which idea is this? — A file system manages data as separate files on storage media, requiring application.', answer: 'A file system manages data', options: ['A file system manages data', 'A database is an organized', 'A database model defines the', 'In the relational data model'] },
            { id: 's6', label: 'In a relational database a', prompt: 'Which idea is this? — In a relational database, a **key** is an attribute (or set of attributes) that uniquely.', answer: 'In a relational database a', options: ['In a relational database a', 'A database is an organized', 'A database model defines the', 'In the relational data model'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceDatabaseNormalization1nfSim, prompt: 'Explore the interactive — Introduction to Databases and DBMS' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_001', difficulty: 'standard',
          question: 'A database is an organized collection of structured data stored electronically.',
          hint: 'If stuck, review the concept of "file" and "software application" from Class 11 Computer.',
          misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a database and a DBMS? Give a one-sentence definition of each.', answer: 'A database is the organized collection of data itself',
                  options: ['A database is the organized collection of data itself', 'DBMS is the database', 'database system'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.' }
          ],
            remediations: { 'a-dbms-is-just-a': { steps: ['If the student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: a CSV file.', '(2) Have them list five things they can do in MySQL that are impossible in a CSV file (e.g., enforce foreign key,.', '(3) Re-ask Diagnostic Question 2 and 3; if they now answer correctly, the misconception is resolved.', 'If not, revisit the definition of "database system" (database + DBMS + applications) and emphasize the software layer.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.',
          parts: [
                { id: 'a', prompt: 'Design a mini database scenario for a local library (not a school library).', answer: 'at least three entity types, (',
                  options: ['at least three entity types, (', 'book title', 'a better way to store files', 'list functions of DBMS'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.' }
          ],
            remediations: { 'a-dbms-is-just-a': { steps: ['If the student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: a CSV file.', '(2) Have them list five things they can do in MySQL that are impossible in a CSV file (e.g., enforce foreign key,.', '(3) Re-ask Diagnostic Question 2 and 3; if they now answer correctly, the misconception is resolved.', 'If not, revisit the definition of "database system" (database + DBMS + applications) and emphasize the software layer.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_003', difficulty: 'standard',
          question: 'A database model defines the logical structure of a database, specifying how.',
          hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the.',
          misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.',
          parts: [
                { id: 'a', prompt: 'Name the three classical database models and give one real‑world analogy for each (e.g., hierarchical = organization chart).', answer: 'The three models are Hierarchical (analogy: file‑system directory tree), Network',
                  options: ['The three models are Hierarchical (analogy: file‑system directory tree), Network', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'b', prompt: 'Explain why the hierarchical model cannot naturally represent a many‑to‑many relationship (e.g., Student‑Club) without data redundancy.', answer: 'In a hierarchical model, each child has exactly one parent',
                  options: ['In a hierarchical model, each child has exactly one parent', 'it can using pointers', 'obsolete'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'c', prompt: 'Given a small network‑model diagram with two record types (Owner: Department, Member: Employee) and a set linking them, write the steps to find all employees.', answer: '(1) Locate the \'CS\' department record (owner)',
                  options: ['(1) Locate the \'CS\' department record (owner)', 'SELECT * FROM Employee WHERE dept=\'CS\'', 'obsolete'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' }
          ],
            remediations: { 'hierarchical-and-network-models-are': { steps: ['Revisit the concept of "relationship degree" (one‑to‑many vs many‑to‑many) using c12_cs_cbse_04_001 (Intro to DBMS).', 'Draw the same Student‑Club scenario on paper for each model, physically tracing pointers (network) or foreign keys.', 'Re‑attempt Diagnostic Question 3 and 6, focusing on the procedural steps required in network vs.', 'declarative query in relational.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.',
          parts: [
                { id: 'a', prompt: '"Relational model is always superior to hierarchical and network models." Evaluate this statement with two arguments for and two against.', answer: 'For: (1) Relational provides high data independence and simple querying via SQL',
                  options: ['For: (1) Relational provides high data independence and simple querying via SQL', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'b', prompt: 'Design a tiny database for a "Library Book‑Loan" system using each model. Show the structure (records/sets/tables) for: Book, Member, Loan (with due date).', answer: 'Hierarchical: Two separate trees',
                  options: ['Hierarchical: Two separate trees', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' }
          ],
            remediations: { 'hierarchical-and-network-models-are': { steps: ['Revisit the concept of "relationship degree" (one‑to‑many vs many‑to‑many) using c12_cs_cbse_04_001 (Intro to DBMS).', 'Draw the same Student‑Club scenario on paper for each model, physically tracing pointers (network) or foreign keys.', 'Re‑attempt Diagnostic Question 3 and 6, focusing on the procedural steps required in network vs.', 'declarative query in relational.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_004', difficulty: 'standard',
          question: 'In the relational data model, a **relation** is a table with rows and columns.',
          hint: 'Revisit Class 11 Maths Sets chapter: Cartesian product of sets A × B = {(a,b) | a∈A, b∈B}.',
          misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed.',
          parts: [
                { id: 'a', prompt: 'Define the term "domain" in the context of the relational data model. Give an example of a valid domain for an attribute "DateOfBirth".', answer: 'A domain is the set of all permissible atomic values that an attribute can take',
                  options: ['A domain is the set of all permissible atomic values that an attribute can take', 'domain is the column name', 'domain is the table'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' },
                { id: 'b', prompt: 'A relation instance has 5 attributes and 120 tuples. What are its degree and cardinality?', answer: 'Degree = 5 (number of attributes), Cardinality = 120 (number of tuples)',
                  options: ['Degree = 5 (number of attributes), Cardinality = 120 (number of tuples)', 'domain', 'data type'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' },
                { id: 'c', prompt: 'Consider a relation `Student(RollNo, Name, Subjects)` where `Subjects` stores values like "Physics, Chemistry, Maths" in a single cell.', answer: 'Yes, it violates the relational model',
                  options: ['Yes, it violates the relational model', 'it\'s fine because it\'s just text', 'it violates primary key'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' }
          ],
            remediations: { 'students-often-confuse-attribute-the': { steps: ['Have the student draw a 2×3 table on paper.', 'Ask: "Point to an attribute" (column header), "Point to a tuple" (one row), "How many tuples?" (cardinality), "How many.', 'For each column, ask: "List every value that could legally go in this column" — that list is the domain.', 'If they say "integer", ask: "Can -5 go in Age?" — when they say no, say "Exactly, so the domain is not \'integer\', it\'s.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed.',
          parts: [
                { id: 'a', prompt: 'Create a relation instance for "LibraryBook" with attributes: `BookID`, `Title`, `Author`, `Genre`, `CopiesAvailable`.', answer: 'A valid answer shows a 4-row × 5-column table',
                  options: ['A valid answer shows a 4-row × 5-column table', 'domain', 'data type', '"domain" means "data type" only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' }
          ],
            remediations: { 'students-often-confuse-attribute-the': { steps: ['Have the student draw a 2×3 table on paper.', 'Ask: "Point to an attribute" (column header), "Point to a tuple" (one row), "How many tuples?" (cardinality), "How many.', 'For each column, ask: "List every value that could legally go in this column" — that list is the domain.', 'If they say "integer", ask: "Can -5 go in Age?" — when they say no, say "Exactly, so the domain is not \'integer\', it\'s.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_010', difficulty: 'standard',
          question: 'Normalization is the systematic process of decomposing relations (tables) to.',
          hint: 'If stuck, revisit the concept of functional dependency (X → Y) and practice finding.',
          misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids.',
          parts: [
                { id: 'a', prompt: 'What is the defining requirement for a relation to be in First Normal Form (1NF)?', answer: 'A relation is in 1NF if and only if every attribute domain contains only atomic',
                  options: ['A relation is in 1NF if and only if every attribute domain contains only atomic', '1NF means having a primary key', 'atomic values'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids repeating groups.' },
                { id: 'b', prompt: 'Given a relation schema Student_Course(Student_ID, Student_Name, Course_ID, Course_Name, Instructor_ID, Instructor_Name) with functional dependencies:.', answer: 'Step 1: Identify candidate key = (Student_ID, Course_ID)',
                  options: ['Step 1: Identify candidate key = (Student_ID, Course_ID)', 'atomic values', 'no commas in a cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids repeating groups.' }
          ],
            remediations: { 'atomic-values-in-1nf-simply': { steps: ['If a student cannot distinguish partial from transitive dependency, guide them through this concrete exercise: (1).', 'Ask: "Does C depend on the whole key or part of it?" (Part → partial dependency).', 'Ask: "Does D depend on the key directly or through C?" (Through C → transitive dependency).', '(4) Have them label each non‑prime attribute as "fully dependent", "partially dependent", or "transitively dependent".'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids.',
          parts: [
                { id: 'a', prompt: 'A database designer claims: "If a relation is in 3NF, it is automatically in 2NF and 1NF." Evaluate this statement. Is it always true? Justify your answer.', answer: 'The statement is TRUE',
                  options: ['The statement is TRUE', 'False, because 3NF only deals with transitive dependencies', 'atomic values', 'no commas in a cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids repeating groups.' }
          ],
            remediations: { 'atomic-values-in-1nf-simply': { steps: ['If a student cannot distinguish partial from transitive dependency, guide them through this concrete exercise: (1).', 'Ask: "Does C depend on the whole key or part of it?" (Part → partial dependency).', 'Ask: "Does D depend on the key directly or through C?" (Through C → transitive dependency).', '(4) Have them label each non‑prime attribute as "fully dependent", "partially dependent", or "transitively dependent".'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_002', difficulty: 'standard',
          question: 'A file system manages data as separate files on storage media, requiring.',
          hint: 'Revisit c12_cs_cbse_04_001 and write down the three-sentence definition of DBMS and its.',
          misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file.',
          parts: [
                { id: 'a', prompt: 'State the full form of DBMS and name one key advantage it provides over a traditional file system.', answer: 'DBMS stands for Database Management System',
                  options: ['DBMS stands for Database Management System', 'DBMS is just a file manager', 'DBMS increases redundancy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file and filter rows,.' }
          ],
            remediations: { 'dbms-is-just-a-fancy': { steps: ['Ask the student to list the exact steps they would take to update a student\'s address in two separate CSV files.', 'Have them simulate a power failure after the first file write and describe the resulting state.', 'Then show the same update in a DBMS with a transaction (BEGIN; UPDATE ...; UPDATE ...; COMMIT).', 'Ask: "What guarantees does the DBMS give that the file system does not?" This concrete comparison forces the student to.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "For a single-user application with a few hundred records, a file system is always better than a DBMS because it is simpler and faster.".', answer: 'Refute',
                  options: ['Refute', 'DBMS is just a fancy file system with a GUI', 'because they can open an Excel file and filter rows, they are using a database'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file and filter rows,.' }
          ],
            remediations: { 'dbms-is-just-a-fancy': { steps: ['Ask the student to list the exact steps they would take to update a student\'s address in two separate CSV files.', 'Have them simulate a power failure after the first file write and describe the resulting state.', 'Then show the same update in a DBMS with a transaction (BEGIN; UPDATE ...; UPDATE ...; COMMIT).', 'Ask: "What guarantees does the DBMS give that the file system does not?" This concrete comparison forces the student to.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_005', difficulty: 'standard',
          question: 'In a relational database, a **key** is an attribute (or set of attributes) that.',
          hint: 'If stuck, revisit c12_cs_cbse_04_004 (Relational Data Model: Tuple, Attribute, Domain).',
          misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not.',
          parts: [
                { id: 'a', prompt: 'Define the term "Candidate Key" in the context of the relational model. How does it differ from a "Super Key"?', answer: 'A **Candidate Key** is a minimal super key',
                  options: ['A **Candidate Key** is a minimal super key', 'Candidate key is just any unique column', 'Alternate Key and Foreign Key are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not chosen as primary) with.' },
                { id: 'b', prompt: 'Given two relations: `Student(AdmNo, Name, Class)` with primary key AdmNo, and `LibraryCard(CardNo, AdmNo, IssueDate)` where CardNo is primary key and AdmNo is.', answer: 'ON DELETE CASCADE, (',
                  options: ['ON DELETE CASCADE, (', 'the student cannot be deleted in any case', 'Alternate Key and Foreign Key are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not chosen as primary) with.' }
          ],
            remediations: { 'alternate-key-and-foreign-key': { steps: ['Revisit the definition of each key type using a single concrete relation (e.g., `Student` with AdmNo, Aadhar, Email).', 'Write them side-by-side: Candidate keys = {AdmNo}, {Aadhar}, {Email}; Primary = {AdmNo}; Alternate = {Aadhar}, {Email}.', 'Draw a two-table diagram (`Student` and `LibraryCard`) with arrows showing foreign key from `LibraryCard.AdmNo` to.', 'Label the arrow "Foreign Key references Primary Key".'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not.',
          parts: [
                { id: 'a', prompt: 'Evaluate the design decision: In a `Course` table, the primary key is `CourseCode`.', answer: 'Making `(StudentID, CourseCode)` the primary key of `Enrollment` enforces that',
                  options: ['Making `(StudentID, CourseCode)` the primary key of `Enrollment` enforces that', 'It\'s fine because primary key must be unique', 'Alternate Key and Foreign Key are the same thing', 'alternate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not chosen as primary) with.' },
                { id: 'b', prompt: 'Create a small relational schema (3 tables) for a "Movie Booking" system: `Movie`, `CinemaHall`, `Show`.', answer: '**Expected schema:** - `Movie(MovieID, Title, Genre, Duration)`',
                  options: ['**Expected schema:** - `Movie(MovieID, Title, Genre, Duration)`', 'Alternate Key and Foreign Key are the same thing', 'alternate', 'alternative reference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not chosen as primary) with.' }
          ],
            remediations: { 'alternate-key-and-foreign-key': { steps: ['Revisit the definition of each key type using a single concrete relation (e.g., `Student` with AdmNo, Aadhar, Email).', 'Write them side-by-side: Candidate keys = {AdmNo}, {Aadhar}, {Email}; Primary = {AdmNo}; Alternate = {Aadhar}, {Email}.', 'Draw a two-table diagram (`Student` and `LibraryCard`) with arrows showing foreign key from `LibraryCard.AdmNo` to.', 'Label the arrow "Foreign Key references Primary Key".'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
