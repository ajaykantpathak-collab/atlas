import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch04_p2: SimDef = {
    id: 'v3_c12_cs_ch04_p2',
    title: 'Database Concepts · Part 2/2',
    subtitle: 'The parcel that shipped to the old address — why files betray you',
    classLevel: 12, subject: 'computer_science', topic: 'Database Concepts · Part 2/2',
    chapters: ['c12_cs_ch04'],
    nodeIds: ['c12_cs_cbse_04_007', 'c12_cs_cbse_04_008', 'c12_cs_cbse_04_009', 'c12_cs_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Database designer', intro: 'Every app you use is a database wearing a costume. This chapter shows you what\'s under the costume.', goal: 'Distinguish data, databases and DBMS, and explain the characteristics that make the database approach beat file systems.' },
    discovery: {
        question: 'A bookstore keeps customers, orders and payments in separate Excel files. A customer changes address — and gets missed in one file, so a parcel ships to the old house. What would a database have done differently?',
        options: ['One central record updated once — the DBMS\'s shared, consistent store means every report reads the same truth', 'Nothing — databases have the same problem', 'Excel just needed more columns', 'A database would email the customer automatically'],
        answer: 'One central record updated once — the DBMS\'s shared, consistent store means every report reads the same truth',
        hook: 'A database is the organised data; the DBMS is the software managing it — students merge the two. And Excel is neither: no concurrency control, no transactions, no catalog. Self-describing metadata and program-data independence are what actually separate a DBMS from a fancy file.',
    },
    teaching: [
        { title: 'Relational Operations: Union, Intersection and Cartesian Product', text: 'In relational algebra, **Union (∪)** combines tuples from two union-compatible relations (same number of attributes with corresponding domains) into a single relation with no duplicate tuples.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Replace a school\'s spreadsheet chaos with a real database design: name the entities, define the views each user gets, and show exactly which DBMS feature — concurrency control, transactions, catalog — kills each spreadsheet failure.',
        labels: ['Relational Operations: Union, Intersection', 'Database Constraints: Domain, Key', 'Referential Integrity in Relational', 'Normalization: 1NF, 2NF'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_007', title: 'Relational Operations: Union, Intersection and Cartesian Product',
          caseStudy: { intro: 'Imagine you are managing a school database: one table lists students who play cricket, another lists students who play football.',
            decisions: [{ prompt: 'What are the two necessary conditions for two relations to be union-compatible so that Union or Intersection can be applied?', options: [
                { text: 'The two relations must have (1) the same number of attributes (degree) and (2)', outcome: 'The two relations must have (1) the same number of attributes (degree) and (2) corresponding.' },
                { text: 'same table name', outcome: 'Not quite — Students often think that **Union and Intersection can be applied to any two relations as long.', reveals: 'union-and-intersection-can-be' },
                { text: 'same primary key', outcome: 'Not quite — Students often think that **Union and Intersection can be applied to any two relations as long.', reveals: 'union-and-intersection-can-be' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_008', title: 'Database Constraints: Domain, Key and Entity Integrity',
          caseStudy: { intro: 'Imagine you are designing a student database for your school. You create a table `STUDENT(RollNo, Name, Age, Email)`.',
            decisions: [{ prompt: 'What is the difference between a `UNIQUE` constraint and a `PRIMARY KEY` constraint in terms of NULL values?', options: [
                { text: 'A `PRIMARY KEY` column cannot contain any NULL values, whereas a `UNIQUE` column can', outcome: 'A `PRIMARY KEY` column cannot contain any NULL values, whereas a `UNIQUE` column can contain one.' },
                { text: 'both allow NULL', outcome: 'Not quite — Students often believe that a `UNIQUE` constraint automatically implies `NOT NULL`.', reveals: 'a-unique-constraint-automatically-implies' },
                { text: 'neither allows NULL', outcome: 'Not quite — Students often believe that a `UNIQUE` constraint automatically implies `NOT NULL`.', reveals: 'a-unique-constraint-automatically-implies' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_009', title: 'Referential Integrity in Relational Databases',
          caseStudy: { intro: 'Imagine a school database with two tables: `STUDENT(AdmNo, Name, Class)` and `LIBRARY_ISSUE(AdmNo, BookID, IssueDate)`.',
            decisions: [{ prompt: 'What is the exact condition that a foreign key column must satisfy to maintain referential integrity?', options: [
                { text: 'A foreign key column must contain either a value that matches a primary key value in the', outcome: 'A foreign key column must contain either a value that matches a primary key value in the referenced.' },
                { text: 'foreign key must be unique', outcome: 'Not quite — Students often believe that a foreign key column *must* be NOT NULL.', reveals: 'a-foreign-key-column-must' },
                { text: 'foreign key cannot be NULL', outcome: 'Not quite — Students often believe that a foreign key column *must* be NOT NULL.', reveals: 'a-foreign-key-column-must' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_010', title: 'Normalization: 1NF, 2NF and 3NF Basics',
          caseStudy: { intro: 'Imagine you are designing a database for a school\'s exam results.',
            decisions: [{ prompt: 'What is the defining requirement for a relation to be in First Normal Form (1NF)?', options: [
                { text: 'A relation is in 1NF if and only if every attribute domain contains only atomic', outcome: 'A relation is in 1NF if and only if every attribute domain contains only atomic (indivisible).' },
                { text: '1NF means having a primary key', outcome: 'Not quite — Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss.', reveals: 'atomic-values-in-1nf-simply' },
                { text: 'atomic values', outcome: 'Not quite — Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss.', reveals: 'atomic-values-in-1nf-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'An algorithm decides who gets a loan, a job interview, a scholarship. It\'s faster and cheaper than human review — and it learned from biased data nobody fully audited.',
            decisions: [{ prompt: 'Is an unfair algorithm better than an unfair human?', options: [
                { text: 'Yes — it applies its bias consistently', outcome: 'Consistency is something — but a consistently wrong system is wrong at scale, on every applicant, every time.' },
                { text: 'No — at least a human can be argued with', outcome: 'The appeal argument — you can persuade a person; an algorithm\'s \'no\' has no one home to hear the objection.' },
                { text: 'Neither — audit it like you\'d audit a human process', outcome: 'The engineering-ethics answer — transparency, bias testing, appeal paths; possible, but only if someone requires it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A clinic keeps each patient\'s record in a separate Word file. Reception can\'t find all patients with one diagnosis, and the doctor and receptionist overwrite each other\'s edits. The owner resists a DBMS: \'files give us full control\'.',
            decisions: [{ prompt: 'What does a DBMS actually fix here?', options: [
                { text: 'SQL queries plus indexing make the diagnosis search instant, and concurrency control stops simultaneous edits clobbering each other — with transactions, backup and the metadata catalogue thrown in.', outcome: 'A DBMS isn\'t \'a better filing cabinet\' — it\'s a managed layer for consistency, concurrent access and recovery that ad-hoc files can\'t reproduce cheaply.' },
                { text: 'Nothing — a DBMS is just a fancier way to store files, so files are fine.', outcome: 'Files have no query language, no locking, no transactions and no catalogue; the \'control\' claimed is really unpriced maintenance and inconsistency risk.', reveals: 'dbms-is-fancy-files' },
                { text: 'Just split the files by doctor — that gives the same result with zero new software.', outcome: 'Fragmenting the data worsens the exact failures at hand: cross-cutting search gets harder and concurrent edits still collide.', reveals: 'split-files-solves-concurrency' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You can now argue when a file is fine and when only a DBMS will do — with technical reasons, not vibes. Every backend you\'ll ever build starts here.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_007', difficulty: 'standard',
          question: 'In relational algebra, **Union (∪)** combines tuples from two union-compatible.',
          hint: 'If stuck, revisit Class 11 Mathematics nodes c11_math_cbse_01_009 (Union).',
          misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same.',
          parts: [
                { id: 'a', prompt: 'What are the two necessary conditions for two relations to be union-compatible so that Union or Intersection can be applied?', answer: 'The two relations must have (1) the same number of attributes (degree) and (2)',
                  options: ['The two relations must have (1) the same number of attributes (degree) and (2)', 'same table name', 'same primary key'],
                  hint: 'If stuck, revisit Class 11 Mathematics nodes c11_math_cbse_01_009 (Union), c11_math_cbse_01_010.',
                  misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same number of columns**.' }
          ],
            remediations: { 'union-and-intersection-can-be': { steps: ['Revisit the definition of **domain** in the relational model (node c12_cs_cbse_04_004).', 'Review Class 11 Set Theory nodes c11_math_cbse_01_009 (Union) and c11_math_cbse_01_010 (Intersection) to reinforce that.', 'Practice with a concrete counterexample: Relation R(A:int, B:int) and S(A:int, B:char).', 'Attempt to compute R ∪ S manually and observe that tuples like (1, 2) and (1, \'X\') cannot coexist in a single relation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same.',
          parts: [
                { id: 'a', prompt: 'A database designer claims: "Cartesian Product is useless in practice because it produces huge relations; we should never use it." Evaluate this statement.', answer: 'Partially true',
                  options: ['Partially true', 'entirely true'],
                  hint: 'If stuck, revisit Class 11 Mathematics nodes c11_math_cbse_01_009 (Union), c11_math_cbse_01_010.',
                  misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same number of columns**.' }
          ],
            remediations: { 'union-and-intersection-can-be': { steps: ['Revisit the definition of **domain** in the relational model (node c12_cs_cbse_04_004).', 'Review Class 11 Set Theory nodes c11_math_cbse_01_009 (Union) and c11_math_cbse_01_010 (Intersection) to reinforce that.', 'Practice with a concrete counterexample: Relation R(A:int, B:int) and S(A:int, B:char).', 'Attempt to compute R ∪ S manually and observe that tuples like (1, 2) and (1, \'X\') cannot coexist in a single relation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_008', difficulty: 'standard',
          question: 'Database constraints are rules enforced on data columns to ensure accuracy.',
          hint: 'If stuck, review the definitions of domain, candidate key, and primary key in the.',
          misconception: 'Students often believe that a `UNIQUE` constraint automatically implies `NOT NULL`.',
          parts: [
                { id: 'a', prompt: 'A table `PRODUCT(PID, PName, Price)` has a constraint `CHECK (Price > 0)`. A user tries to insert a row with `Price = NULL`. Will the insertion succeed?', answer: 'Yes, the insertion will succeed',
                  options: ['Yes, the insertion will succeed', 'it will fail', 'a `UNIQUE` constraint automatically implies `NOT NULL`'],
                  hint: 'If stuck, review the definitions of domain, candidate key, and primary key in the Relational Data.',
                  misconception: 'Students often believe that a `UNIQUE` constraint automatically implies `NOT NULL`.' },
                { id: 'b', prompt: 'Consider a table `BOOK(ISBN, Title, Author, Year)` with `ISBN` as primary key.', answer: 'Violations: 1',
                  options: ['Violations: 1', 'a `UNIQUE` constraint automatically implies `NOT NULL`'],
                  hint: 'If stuck, review the definitions of domain, candidate key, and primary key in the Relational Data.',
                  misconception: 'Students often believe that a `UNIQUE` constraint automatically implies `NOT NULL`.' }
          ],
            remediations: { 'a-unique-constraint-automatically-implies': { steps: ['Re‑visit **c12_cs_cbse_04_004** (Relational Data Model) to recall the formal definition of a domain and the role.', 'Review **c12_cs_cbse_04_005** (Keys in RDBMS) to reinforce the distinction between candidate, primary, and alternate.', 'Practice writing CREATE TABLE statements for three small scenarios (e.g., a `COURSE` table, a `STUDENT` table,.', 'Take a mini‑quiz: given five INSERT statements, predict which will fail and name the violated constraint.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_009', difficulty: 'standard',
          question: 'Referential integrity is a relational database constraint that ensures every.',
          hint: 'Revisit c12_cs_cbse_04_005 (Keys in RDBMS) and practice writing foreign key declarations.',
          misconception: 'Students often believe that a foreign key column *must* be NOT NULL.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Referential integrity is a relational database constraint that ensures every non-null',
                  options: ['Referential integrity is a relational database constraint that ensures every non-null', 'A database is an organized collection of structured data stored electronically in a', 'A file system manages data as separate files on storage media, requiring application', 'A database model defines the logical structure of a database, specifying how data is'],
                  hint: 'Revisit c12_cs_cbse_04_005 (Keys in RDBMS) and practice writing foreign key declarations with.',
                  misconception: 'Students often believe that a foreign key column *must* be NOT NULL.' }
          ],
            remediations: { 'a-foreign-key-column-must': { steps: ['If the student holds the above misconception, do: (1) Show the exact SQL syntax `CREATE TABLE CHILD (..., ParentID INT.', '(2) Insert a row with NULL in ParentID and verify it succeeds.', '(3) Explain that the foreign key constraint is only checked for non-NULL values.', '(4) Re-ask Diagnostic Question 1 to confirm correction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_010', difficulty: 'standard',
          question: 'Normalization is the systematic process of decomposing relations (tables).',
          hint: 'If stuck, revisit the concept of functional dependency (X → Y) and practice finding.',
          misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids.',
          parts: [
                { id: 'a', prompt: 'What is the defining requirement for a relation to be in First Normal Form (1NF)?', answer: 'A relation is in 1NF if and only if every attribute domain contains only atomic',
                  options: ['A relation is in 1NF if and only if every attribute domain contains only atomic', '1NF means having a primary key', 'atomic values', 'no commas in a cell'],
                  hint: 'If stuck, revisit the concept of functional dependency (X → Y) and practice finding candidate keys.',
                  misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids repeating groups.' },
                { id: 'b', prompt: 'Given a relation schema Student_Course(Student_ID, Student_Name, Course_ID, Course_Name, Instructor_ID, Instructor_Name) with functional dependencies.', answer: 'Step 1: Identify candidate key = (Student_ID, Course_ID)',
                  options: ['Step 1: Identify candidate key = (Student_ID, Course_ID)', 'atomic values', 'no commas in a cell', '"atomic values" in 1NF simply means "no commas in a cell'],
                  hint: 'If stuck, revisit the concept of functional dependency (X → Y) and practice finding candidate keys.',
                  misconception: 'Students often believe that "atomic values" in 1NF simply means "no commas in a cell." They miss that 1NF also forbids repeating groups.' }
          ],
            remediations: { 'atomic-values-in-1nf-simply': { steps: ['If a student cannot distinguish partial from transitive dependency, guide them through this concrete exercise: (1).', 'Ask: "Does C depend on the whole key or part of it?" (Part → partial dependency).', 'Ask: "Does D depend on the key directly or through C?" (Through C → transitive dependency).', '(4) Have them label each non‑prime attribute as "fully dependent", "partially dependent", or "transitively dependent".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
