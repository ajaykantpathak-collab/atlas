import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch04_p1: SimDef = {
    id: 'v3_c12_cs_ch04_p1',
    title: 'Database Concepts · Part 1/2',
    subtitle: 'The parcel that shipped to the old address — why files betray you',
    classLevel: 12, subject: 'computer_science', topic: 'Database Concepts · Part 1/2',
    chapters: ['c12_cs_ch04'],
    nodeIds: ['c12_cs_cbse_04_001', 'c12_cs_cbse_04_002', 'c12_cs_cbse_04_003', 'c12_cs_cbse_04_004', 'c12_cs_cbse_04_005', 'c12_cs_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Database designer', intro: 'Every app you use is a database wearing a costume. This chapter shows you what\'s under the costume.', goal: 'Distinguish data, databases and DBMS, and explain the characteristics that make the database approach beat file systems.' },
    discovery: {
        question: 'A bookstore keeps customers, orders and payments in separate Excel files. A customer changes address — and gets missed in one file, so a parcel ships to the old house. What would a database have done differently?',
        options: ['One central record updated once — the DBMS\'s shared, consistent store means every report reads the same truth', 'Nothing — databases have the same problem', 'Excel just needed more columns', 'A database would email the customer automatically'],
        answer: 'One central record updated once — the DBMS\'s shared, consistent store means every report reads the same truth',
        hook: 'A database is the organised data; the DBMS is the software managing it — students merge the two. And Excel is neither: no concurrency control, no transactions, no catalog. Self-describing metadata and program-data independence are what actually separate a DBMS from a fancy file.',
    },
    teaching: [
        { title: 'Introduction to Databases and DBMS', text: 'A database is an organized collection of structured data stored electronically in a computer system, typically managed by a Database Management System (DBMS) — software that provides controlled.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Replace a school\'s spreadsheet chaos with a real database design: name the entities, define the views each user gets, and show exactly which DBMS feature — concurrency control, transactions, catalog — kills each spreadsheet failure.',
        labels: ['Introduction to Databases', 'File System vs Database', 'Database Models: Relational, Hierarchical,', 'Relational Data Model: Tuple,', 'Keys in RDBMS: Primary,', 'Relational Operations: Selection'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_001', title: 'Introduction to Databases and DBMS',
          caseStudy: { intro: 'Imagine you run a small online bookstore. Orders, customer details, book inventory, and payment records are currently stored in separate Excel files.',
            decisions: [{ prompt: 'What is the fundamental difference between a database and a DBMS? Give a one-sentence definition of each.', options: [
                { text: 'A database is the organized collection of data itself', outcome: 'A database is the organized collection of data itself; a DBMS is the software that manages that.' },
                { text: 'DBMS is the database', outcome: 'Not quite — Students often think a DBMS is just "a better way to store files" and equate it with a file.', reveals: 'a-dbms-is-just-a' },
                { text: 'database system', outcome: 'Not quite — Students often think a DBMS is just "a better way to store files" and equate it with a file.', reveals: 'a-dbms-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_002', title: 'File System vs Database System',
          caseStudy: { intro: 'Imagine a school office where student admission forms, fee receipts, and exam marks are stored in separate paper folders — each teacher updates their own.',
            decisions: [{ prompt: 'State the full form of DBMS and name one key advantage it provides over a traditional file system.', options: [
                { text: 'DBMS stands for Database Management System', outcome: 'DBMS stands for Database Management System. One key advantage is reduced data redundancy because.' },
                { text: 'DBMS is just a file manager', outcome: 'Not quite — Students often think "DBMS is just a fancy file system with a GUI" and believe that because they.', reveals: 'dbms-is-just-a-fancy' },
                { text: 'DBMS increases redundancy', outcome: 'Not quite — Students often think "DBMS is just a fancy file system with a GUI" and believe that because they.', reveals: 'dbms-is-just-a-fancy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_003', title: 'Database Models: Relational, Hierarchical, Network',
          caseStudy: { intro: 'Imagine you are designing a database for a school where each student can join multiple clubs and each club has many students.',
            decisions: [{ prompt: 'Name the three classical database models and give one real‑world analogy for each (e.g., hierarchical = organization chart).', options: [
                { text: 'The three models are Hierarchical (analogy: file‑system directory tree), Network', outcome: 'The three models are Hierarchical (analogy: file‑system directory tree), Network (analogy: road.' },
                { text: 'obsolete', outcome: 'Not quite — Students often think hierarchical and network models are "obsolete" and only of historical.', reveals: 'hierarchical-and-network-models-are' },
                { text: 'SQL" as a model', outcome: 'Not quite — Students often think hierarchical and network models are "obsolete" and only of historical.', reveals: 'hierarchical-and-network-models-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_004', title: 'Relational Data Model: Tuple, Attribute, Domain, Cardinality',
          caseStudy: { intro: 'Imagine you open a spreadsheet of your class marks: each row is one student\'s record, each column is a subject, and every cell holds a single mark like 87.',
            decisions: [{ prompt: 'Define the term "domain" in the context of the relational data model. Give an example of a valid domain for an attribute "DateOfBirth".', options: [
                { text: 'A domain is the set of all permissible atomic values that an attribute can take', outcome: 'A domain is the set of all permissible atomic values that an attribute can take.' },
                { text: 'domain is the column name', outcome: 'Not quite — Students often confuse **attribute** (the column header / schema-level concept) with **domain**.', reveals: 'students-often-confuse-attribute-the' },
                { text: 'domain is the table', outcome: 'Not quite — Students often confuse **attribute** (the column header / schema-level concept) with **domain**.', reveals: 'students-often-confuse-attribute-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_005', title: 'Keys in RDBMS: Primary, Candidate, Alternate, Foreign',
          caseStudy: { intro: 'Imagine you are designing a database for your school\'s library.',
            decisions: [{ prompt: 'Define the term "Candidate Key" in the context of the relational model. How does it differ from a "Super Key"?', options: [
                { text: 'A **Candidate Key** is a minimal super key', outcome: 'A **Candidate Key** is a minimal super key — a set of attributes that uniquely identifies each.' },
                { text: 'Candidate key is just any unique column', outcome: 'Not quite — **"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys.', reveals: 'alternate-key-and-foreign-key' },
                { text: 'Alternate Key and Foreign Key are the same thing', outcome: 'Not quite — **"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys.', reveals: 'alternate-key-and-foreign-key' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'An algorithm decides who gets a loan, a job interview, a scholarship. It\'s faster and cheaper than human review — and it learned from biased data nobody fully audited.',
            decisions: [{ prompt: 'Is an unfair algorithm better than an unfair human?', options: [
                { text: 'Yes — it applies its bias consistently', outcome: 'Consistency is something — but a consistently wrong system is wrong at scale, on every applicant, every time.' },
                { text: 'No — at least a human can be argued with', outcome: 'The appeal argument — you can persuade a person; an algorithm\'s \'no\' has no one home to hear the objection.' },
                { text: 'Neither — audit it like you\'d audit a human process', outcome: 'The engineering-ethics answer — transparency, bias testing, appeal paths; possible, but only if someone requires it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A clinic keeps each patient\'s record in a separate Word file. Reception can\'t find all patients with one diagnosis, and the doctor and receptionist overwrite each other\'s edits. The owner resists a DBMS: \'files give us full control\'.',
            decisions: [{ prompt: 'What does a DBMS actually fix here?', options: [
                { text: 'SQL queries plus indexing make the diagnosis search instant, and concurrency control stops simultaneous edits clobbering each other — with transactions, backup and the metadata catalogue thrown in.', outcome: 'A DBMS isn\'t \'a better filing cabinet\' — it\'s a managed layer for consistency, concurrent access and recovery that ad-hoc files can\'t reproduce cheaply.' },
                { text: 'Nothing — a DBMS is just a fancier way to store files, so files are fine.', outcome: 'Files have no query language, no locking, no transactions and no catalogue; the \'control\' claimed is really unpriced maintenance and inconsistency risk.', reveals: 'dbms-is-fancy-files' },
                { text: 'Just split the files by doctor — that gives the same result with zero new software.', outcome: 'Fragmenting the data worsens the exact failures at hand: cross-cutting search gets harder and concurrent edits still collide.', reveals: 'split-files-solves-concurrency' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue when a file is fine and when only a DBMS will do — with technical reasons, not vibes. Every backend you\'ll ever build starts here.',
            decisions: [{ prompt: 'What comes next? Database Concepts · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Database Concepts · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_001', difficulty: 'standard',
          question: 'A database is an organized collection of structured data stored electronically.',
          hint: 'If stuck, review the concept of "file" and "software application" from Class 11 Computer.',
          misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a database and a DBMS? Give a one-sentence definition of each.', answer: 'A database is the organized collection of data itself',
                  options: ['A database is the organized collection of data itself', 'DBMS is the database', 'database system', 'a better way to store files'],
                  hint: 'If stuck, review the concept of "file" and "software application" from Class 11 Computer Science.',
                  misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.' }
          ],
            remediations: { 'a-dbms-is-just-a': { steps: ['If the student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: a CSV file.', '(2) Have them list five things they can do in MySQL that are impossible in a CSV file (e.g., enforce foreign key.', '(3) Re-ask Diagnostic Question 2 and 3; if they now answer correctly, the misconception is resolved.', 'If not, revisit the definition of "database system" (database + DBMS + applications) and emphasize the software layer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.',
          parts: [
                { id: 'a', prompt: 'Design a mini database scenario for a local library (not a school library).', answer: 'at least three entity types, (',
                  options: ['at least three entity types, (', 'book title', 'a better way to store files', 'list functions of DBMS'],
                  hint: 'If stuck, review the concept of "file" and "software application" from Class 11 Computer Science.',
                  misconception: 'Students often think a DBMS is just "a better way to store files" and equate it with a file manager.' }
          ],
            remediations: { 'a-dbms-is-just-a': { steps: ['If the student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: a CSV file.', '(2) Have them list five things they can do in MySQL that are impossible in a CSV file (e.g., enforce foreign key.', '(3) Re-ask Diagnostic Question 2 and 3; if they now answer correctly, the misconception is resolved.', 'If not, revisit the definition of "database system" (database + DBMS + applications) and emphasize the software layer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_002', difficulty: 'standard',
          question: 'A file system manages data as separate files on storage media, requiring.',
          hint: 'Revisit c12_cs_cbse_04_001 and write down the three-sentence definition of DBMS and its.',
          misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file.',
          parts: [
                { id: 'a', prompt: 'State the full form of DBMS and name one key advantage it provides over a traditional file system.', answer: 'DBMS stands for Database Management System',
                  options: ['DBMS stands for Database Management System', 'DBMS is just a file manager', 'DBMS increases redundancy', 'DBMS is just a fancy file system with a GUI'],
                  hint: 'Revisit c12_cs_cbse_04_001 and write down the three-sentence definition of DBMS and its three main.',
                  misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file and filter rows.' }
          ],
            remediations: { 'dbms-is-just-a-fancy': { steps: ['Ask the student to list the exact steps they would take to update a student\'s address in two separate CSV files.', 'Have them simulate a power failure after the first file write and describe the resulting state.', 'Then show the same update in a DBMS with a transaction (BEGIN; UPDATE ...; UPDATE ...; COMMIT).', 'Ask: "What guarantees does the DBMS give that the file system does not?" This concrete comparison forces the student.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_003', difficulty: 'standard',
          question: 'A database model defines the logical structure of a database, specifying how.',
          hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the.',
          misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.',
          parts: [
                { id: 'a', prompt: 'Name the three classical database models and give one real‑world analogy for each (e.g., hierarchical = organization chart).', answer: 'The three models are Hierarchical (analogy: file‑system directory tree), Network',
                  options: ['The three models are Hierarchical (analogy: file‑system directory tree), Network', 'obsolete', 'SQL" as a model', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the definition of data.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'b', prompt: 'Explain why the hierarchical model cannot naturally represent a many‑to‑many relationship (e.g., Student‑Club) without data redundancy.', answer: 'In a hierarchical model, each child has exactly one parent',
                  options: ['In a hierarchical model, each child has exactly one parent', 'it can using pointers', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the definition of data.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'c', prompt: 'Given a small network‑model diagram with two record types (Owner: Department, Member: Employee) and a set linking them, write the steps to find all employees.', answer: '(1) Locate the \'CS\' department record (owner)',
                  options: ['(1) Locate the \'CS\' department record (owner)', 'SELECT * FROM Employee WHERE dept=\'CS\'', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the definition of data.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' },
                { id: 'd', prompt: 'Compare the three models on: (a) ease of ad‑hoc queries, (b) data independence, (c) implementation complexity. Present as a table.', answer: '| Model | Ad‑hoc Queries | Data Independence | Implementation Complexity |',
                  options: ['| Model | Ad‑hoc Queries | Data Independence | Implementation Complexity |', 'obsolete', 'hierarchical and network models are "obsolete" and only of historical interest'],
                  hint: 'If stuck, review the file‑system vs DBMS comparison (c12_cs_cbse_04_002) and the definition of data.',
                  misconception: 'Students often think hierarchical and network models are "obsolete" and only of historical interest.' }
          ],
            remediations: { 'hierarchical-and-network-models-are': { steps: ['Revisit the concept of "relationship degree" (one‑to‑many vs many‑to‑many) using c12_cs_cbse_04_001 (Intro to DBMS).', 'Draw the same Student‑Club scenario on paper for each model, physically tracing pointers (network) or foreign keys.', 'Re‑attempt Diagnostic Question 3 and 6, focusing on the procedural steps required in network vs.', 'declarative query in relational.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_004', difficulty: 'standard',
          question: 'In the relational data model, a **relation** is a table with rows and columns.',
          hint: 'Revisit Class 11 Maths Sets chapter: Cartesian product of sets A × B = {(a,b) | a∈A, b∈B}.',
          misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed.',
          parts: [
                { id: 'a', prompt: 'Define the term "domain" in the context of the relational data model. Give an example of a valid domain for an attribute "DateOfBirth".', answer: 'A domain is the set of all permissible atomic values that an attribute can take',
                  options: ['A domain is the set of all permissible atomic values that an attribute can take', 'domain is the column name', 'domain is the table', 'domain is 01-01-2005'],
                  hint: 'Revisit Class 11 Maths Sets chapter: Cartesian product of sets A × B = {(a,b) | a∈A, b∈B} and how.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' },
                { id: 'b', prompt: 'A relation instance has 5 attributes and 120 tuples. What are its degree and cardinality?', answer: 'Degree = 5 (number of attributes), Cardinality = 120 (number of tuples)',
                  options: ['Degree = 5 (number of attributes), Cardinality = 120 (number of tuples)', 'domain', 'data type', '"domain" means "data type" only'],
                  hint: 'Revisit Class 11 Maths Sets chapter: Cartesian product of sets A × B = {(a,b) | a∈A, b∈B} and how.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' },
                { id: 'c', prompt: 'Consider a relation `Student(RollNo, Name, Subjects)` where `Subjects` stores values like "Physics, Chemistry, Maths" in a single cell.', answer: 'Yes, it violates the relational model',
                  options: ['Yes, it violates the relational model', 'it\'s fine because it\'s just text', 'it violates primary key', 'domain'],
                  hint: 'Revisit Class 11 Maths Sets chapter: Cartesian product of sets A × B = {(a,b) | a∈A, b∈B} and how.',
                  misconception: 'Students often confuse **attribute** (the column header / schema-level concept) with **domain** (the set of allowed values) and think.' }
          ],
            remediations: { 'students-often-confuse-attribute-the': { steps: ['Have the student draw a 2×3 table on paper.', 'Ask: "Point to an attribute" (column header), "Point to a tuple" (one row), "How many tuples?" (cardinality), "How many.', 'For each column, ask: "List every value that could legally go in this column" — that list is the domain.', 'If they say "integer", ask: "Can -5 go in Age?" — when they say no, say "Exactly, so the domain is not \'integer\', it\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_005', difficulty: 'standard',
          question: 'In a relational database, a **key** is an attribute (or set of attributes) that.',
          hint: 'If stuck, revisit c12_cs_cbse_04_004 (Relational Data Model: Tuple, Attribute, Domain).',
          misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not.',
          parts: [
                { id: 'a', prompt: 'Define the term "Candidate Key" in the context of the relational model. How does it differ from a "Super Key"?', answer: 'A **Candidate Key** is a minimal super key',
                  options: ['A **Candidate Key** is a minimal super key', 'Candidate key is just any unique column', 'Alternate Key and Foreign Key are the same thing', 'alternate'],
                  hint: 'If stuck, revisit c12_cs_cbse_04_004 (Relational Data Model: Tuple, Attribute, Domain) and.',
                  misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not chosen as primary) with.' },
                { id: 'b', prompt: 'Given two relations: `Student(AdmNo, Name, Class)` with primary key AdmNo, and `LibraryCard(CardNo, AdmNo, IssueDate)` where CardNo is primary key and AdmNo.', answer: 'ON DELETE CASCADE, (',
                  options: ['ON DELETE CASCADE, (', 'the student cannot be deleted in any case', 'Alternate Key and Foreign Key are the same thing', 'alternate'],
                  hint: 'If stuck, revisit c12_cs_cbse_04_004 (Relational Data Model: Tuple, Attribute, Domain) and.',
                  misconception: '**"Alternate Key and Foreign Key are the same thing."** Students often confuse alternate keys (candidate keys not chosen as primary) with.' }
          ],
            remediations: { 'alternate-key-and-foreign-key': { steps: ['Revisit the definition of each key type using a single concrete relation (e.g., `Student` with AdmNo, Aadhar, Email).', 'Write them side-by-side: Candidate keys = {AdmNo}, {Aadhar}, {Email}; Primary = {AdmNo}; Alternate = {Aadhar}, {Email}.', 'Draw a two-table diagram (`Student` and `LibraryCard`) with arrows showing foreign key from `LibraryCard.AdmNo`.', 'Label the arrow "Foreign Key references Primary Key".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_006', difficulty: 'standard',
          question: 'Selection (σ) is a unary relational operation that returns a subset of tuples.',
          hint: 'If unsure about relation structure, revisit c12_cs_cbse_04_004 (Relational Data Model).',
          misconception: 'Students often think projection (π) only removes columns and forget that it also eliminates duplicate rows.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Selection (σ) is a unary relational operation that returns a subset of tuples (rows) from',
                  options: ['Selection (σ) is a unary relational operation that returns a subset of tuples (rows) from', 'A database is an organized collection of structured data stored electronically in a', 'A file system manages data as separate files on storage media, requiring application', 'A database model defines the logical structure of a database, specifying how data is'],
                  hint: 'If unsure about relation structure, revisit c12_cs_cbse_04_004 (Relational Data Model) and practice.',
                  misconception: 'Students often think projection (π) only removes columns and forget that it also eliminates duplicate rows.' }
          ],
            remediations: { 'projection-only-removes-columns-and': { steps: ['Write the original relation.', 'Apply projection by listing only the chosen columns.', 'Explicitly strike out duplicate rows in the result.', 'Count remaining rows. Repeat with 3-4 examples until they automatically check for duplicates.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
