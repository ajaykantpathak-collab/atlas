import type { SimDef } from '../../engine/types';
import C11_InformaticsPracticesFileSystemLimitsSim from '../../../simulations/c6_12/C11_InformaticsPracticesFileSystemLimitsSim';

/** v3 wrapped master — C11_InformaticsPracticesFileSystemLimitsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_informaticspracticesfilesystemlimitssim: SimDef = {
    id: 'v3w_c11_informaticspracticesfilesystemlimitssim',
    title: 'Informatics Practices File System Limits',
    subtitle: 'This node covers: data vs information, file system limitations (redundancy,.',
    classLevel: 11, subject: 'science', topic: 'Introduction to Data, Database and Database Management System',
    chapters: [],
    nodeIds: ['c11_ip_cbse_07_001', 'c11_ip_cbse_08_011', 'c11_ip_cbse_01_007', 'c11_ip_cbse_01_009', 'c11_ip_cbse_02_003', 'c11_ip_cbse_06_002', 'c11_ip_cbse_08_010', 'c11_ip_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine your school library still uses paper registers: one register for book details, another for student.', goal: 'Master Informatics Practices File System Limits.' },
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
        { type: 'scaffold', nodeId: 'c11_ip_cbse_08_011', title: 'Data protection refers to the.',
          scaffold: { problem: 'A Class 11 student, Priya, uses a "Free PDF Scanner" app that requests: Camera (scan docs), Storage (save PDFs), Contacts (share via.',
            steps: [
            { text: 'Identify the core function of a PDF scanner: capture images via camera, convert to PDF, save locally or share via.' },
            { text: 'Map each requested permission to core function necessity. Camera: Essential. Storage: Essential (save output).' },
            { text: 'Apply data minimization principle — only Camera and Storage are strictly necessary.' },
            { text: 'Assess breach impact. Exposed data includes: full contact list (names, phones, emails of family/friends), 6 months of.' },
            { text: 'Conclude: Granting excessive permissions amplified harm from 2 data points (scanned docs) to 6 categories of sensitive.', faded: true, blankAnswer: 'Excessive permissions: Contacts, Location, Microphone,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_01_007', title: 'Secondary storage devices are.',
          scaffold: { problem: 'A school computer lab has 30 PCs. Each needs: OS (50 GB), educational software (30 GB), student project space (20 GB).',
            steps: [
            { text: 'Calculate required storage per PC: 50 + 30 + 20 = 100 GB minimum.' },
            { text: 'Compute Option A total cost: 30 × ₹2,200 = ₹66,000.' },
            { text: 'Compute Option B total cost per PC: ₹3,500 + ₹1,500 = ₹5,000. For 30 PCs: 30 × ₹5,000 = ₹1,50,000.' },
            { text: 'Compare with budget ₹1,50,000: Option A (₹66,000) fits with ₹84,000 surplus; Option B (₹1,50,000) exactly exhausts.' },
            { text: 'Analyze performance: Option A — all data on SSD (fast boot, fast app launch, fast file access).' },
            { text: 'Consider reliability: Option A has no moving parts (better for student handling). Option B has HDD (fragile).' },
            { text: 'Final recommendation: Option A — lower cost, better performance, higher durability, leaves budget for other peripherals.', faded: true, blankAnswer: 'Option A (30 × 256 GB SSD) at ₹66,000 total — fits budget,.' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_01_009', title: 'An Operating System (OS) is a system.',
          caseStudy: { intro: 'Imagine you walk into a busy restaurant (the computer) with many customers (users/applications), tables (memory), waiters (CPU cores), and a kitchen (storage).',
            decisions: [{ prompt: '**REMEMBER**: State the five core management functions of an Operating System as per the NCERT Class 11 curriculum.', options: [
                { text: 'The five core functions are: (1) Process Management, (2) Memory Management, (3) File', outcome: 'The five core functions are: (1) Process Management, (2) Memory Management, (3) File Management,.' },
                { text: 'GUI provision', outcome: 'Not quite — **Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the.', reveals: 'misconception-the-operating-system-is' },
                { text: 'internet browsing', outcome: 'Not quite — **Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the.', reveals: 'misconception-the-operating-system-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_02_003', title: 'Python provides two distinct execution.',
          scaffold: { problem: 'A student wants to calculate the compound interest for principal ₹10,000 at 5% annual rate for 3 years.',
            steps: [
            { text: 'Open IDLE Shell (Interactive Mode) and assign test values: `P = 10000; r = 0.05; t = 3`' },
            { text: 'Type the formula `A = P * (1 + r) ** t` and press Enter — observe result `11576.25`' },
            { text: 'Verify by manual calculation: `10000 * 1.05^3 = 10000 * 1.157625 = 11576.25` — matches.' },
            { text: 'Open Editor (File → New File), write a script that takes input for P, r, t and prints A.' },
            { text: 'Save as `compound_interest.py`, run with F5, test with same values — output matches.', faded: true, blankAnswer: 'Interactive verification yields ₹11576.25; Script Mode.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_06_002', title: 'The `open()` function in Python creates.',
          scaffold: { problem: 'A teacher wants to create a new text file `attendance.txt` and write the header line "Roll No,Name,Present" into it.',
            steps: [
            { text: 'Identify the file name (`attendance.txt`) and the operation (writing a new header line).' },
            { text: 'Choose the appropriate mode: `\'w\'` for write (creates new file or truncates existing).' },
            { text: 'Specify encoding as `\'utf-8\'` for cross‑platform compatibility.' },
            { text: 'Call `open()` with the three arguments and assign the returned file object to a variable, say `f`.' },
            { text: 'Use the `write()` method on `f` to write the header string followed by a newline.' },
            { text: 'Call `f.close()` to flush buffers and release the file.', faded: true, blankAnswer: '```python' }
            ] } }
    ],
    explore: { component: C11_InformaticsPracticesFileSystemLimitsSim, prompt: 'Explore the interactive — Informatics Practices File System Limits' },
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
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_011', difficulty: 'standard',
          question: 'Data protection refers to the practices, safeguards, and legal frameworks.',
          hint: 'If stuck, revisit c11_ip_cbse_08_010 (Safe Browsing Practices) and audit your own phone\'s.',
          misconception: 'Students believe **Incognito/Private browsing mode makes them anonymous and prevents digital footprints**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Data protection refers to the practices, safeguards, and legal frameworks designed to',
                  options: ['Data protection refers to the practices, safeguards, and legal frameworks designed to', 'A Database Management System (DBMS) is a software system that enables users to define,', 'Secondary storage devices are non-volatile, high-capacity auxiliary memory units that', 'An Operating System (OS) is a system software that acts as an interface between the user'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Incognito/Private browsing mode makes them anonymous and prevents digital footprints**.' }
          ],
            remediations: { 'incognito-private-browsing-mode-makes': { steps: ['Demonstrate the misconception live. Open Incognito window, log into Google, search a unique nonsense term (e.g.,.', 'Open normal window, go to myactivity.google.com — show the search is there.', 'Open Command Prompt, run `ipconfig /displaydns` — show DNS cache still has google.com entries.', 'Explain: Incognito only prevents *local* browser history/cookies from persisting on *that device*.', 'Assign: "List 3 things Incognito hides and 3 things it does NOT hide" as a written exit ticket.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_007', difficulty: 'standard',
          question: 'Secondary storage devices are non-volatile, high-capacity auxiliary memory.',
          hint: 'Revisit Node 006 (Primary Memory) — specifically the RAM vs ROM comparison table and the.',
          misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup).',
          parts: [
                { id: 'a', prompt: 'You have a 2 TB HDD (₹4,500) and a 1 TB SSD (₹5,500). A video editor needs 1.5 TB for raw footage (sequential read/write) and 200 GB for OS + editing software.', answer: 'Allocate OS + software (200 GB) to SSD for fast random access (boot, app launch)',
                  options: ['Allocate OS + software (200 GB) to SSD for fast random access (boot, app launch)', 'SSD is always better than HDD', 'Buy 4 TB SSD for backup'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup) ignoring cost per.' }
          ],
            remediations: { 'ssd-is-always-better-than': { steps: ['Have the student calculate cost per GB for current market prices of 1 TB HDD, 1 TB SATA SSD, 1 TB NVMe SSD, 16 GB pen.', 'Give three workloads: (a) OS boot drive, (b) 5 TB video archive, (c) 8 GB file transfer between air-gapped PCs.', 'Ask them to pick one device per workload and justify using ₹/GB, speed requirement, portability.', 'Reveal the optimal mapping: (a) NVMe SSD, (b) HDD, (c) pen drive.', 'Explain that "better" is workload-dependent — no device dominates all metrics.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup).',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since RAM is volatile and SSD is non-volatile, we should replace RAM with SSD to make computers simpler and cheaper." Use the.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'SSD is always better than HDD', 'Buy 4 TB SSD for backup', '"SSD is always better than HDD" and recommend SSD for bulk archival (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup) ignoring cost per.' },
                { id: 'b', prompt: 'Design a 3-device storage strategy for a freelance photographer who: (a) shoots 50 GB RAW photos per wedding, (b) edits on a laptop, (c) delivers final 10 GB.', answer: 'Device 1: 1 TB NVMe SSD (laptop internal)',
                  options: ['Device 1: 1 TB NVMe SSD (laptop internal)', 'SSD is always better than HDD', 'Buy 4 TB SSD for backup', '"SSD is always better than HDD" and recommend SSD for bulk archival (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "SSD is always better than HDD" and recommend SSD for bulk archival (e.g., 10 TB family photo backup) ignoring cost per.' }
          ],
            remediations: { 'ssd-is-always-better-than': { steps: ['Have the student calculate cost per GB for current market prices of 1 TB HDD, 1 TB SATA SSD, 1 TB NVMe SSD, 16 GB pen.', 'Give three workloads: (a) OS boot drive, (b) 5 TB video archive, (c) 8 GB file transfer between air-gapped PCs.', 'Ask them to pick one device per workload and justify using ₹/GB, speed requirement, portability.', 'Reveal the optimal mapping: (a) NVMe SSD, (b) HDD, (c) pen drive.', 'Explain that "better" is workload-dependent — no device dominates all metrics.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_009', difficulty: 'standard',
          question: 'An Operating System (OS) is a system software that acts as an interface between.',
          hint: 'If stuck, revisit **c11_ip_cbse_01_008 (System Software vs Application Software)** to.',
          misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain in your own words why an Operating System is called a "Resource Manager".', answer: 'The OS is a resource manager',
                  options: ['The OS is a resource manager', 'the printer decides', 'the applications talk to each other'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and start menu." **Why.' }
          ],
            remediations: { 'misconception-the-operating-system-is': { steps: ['**Step 1**: Show a headless Linux server (e.g., Raspberry Pi via SSH) running `htop` — no GUI, but processes, memory,.', 'Ask: "Where is the OS?" **Step 2**: Use Task Manager (Windows) / System Monitor (Linux) → "Details" tab → highlight.', '**Step 4**: Assign: "Draw the layered architecture: Hardware → Kernel (Scheduler, VFS, Drivers) → System Libraries →.', 'Label where \'Windows 11\' brand lives (marketing layer) vs where the OS lives (kernel layer)."'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and.',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: "A mobile OS (Android/iOS) is just a cut-down version of a desktop OS (Linux/Unix) with a touch interface." Critique this statement using.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'screen size', 'touch vs mouse', 'If I uninstall the desktop theme, I have uninstalled the OS'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and start menu." **Why.' },
                { id: 'b', prompt: '**CREATE**: Design a **new OS type classification** for a hypothetical "Smart City Traffic Grid OS" that manages 10,000 interconnected traffic lights, cameras,.', answer: '**Name**: Distributed Real-Time Fault-Tolerant OS (DRTF-OS)',
                  options: ['**Name**: Distributed Real-Time Fault-Tolerant OS (DRTF-OS)', 'If I uninstall the desktop theme, I have uninstalled the OS'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "The Operating System is the Graphical User Interface (GUI) — Windows *is* the desktop, icons, and start menu." **Why.' }
          ],
            remediations: { 'misconception-the-operating-system-is': { steps: ['**Step 1**: Show a headless Linux server (e.g., Raspberry Pi via SSH) running `htop` — no GUI, but processes, memory,.', 'Ask: "Where is the OS?" **Step 2**: Use Task Manager (Windows) / System Monitor (Linux) → "Details" tab → highlight.', '**Step 4**: Assign: "Draw the layered architecture: Hardware → Kernel (Scheduler, VFS, Drivers) → System Libraries →.', 'Label where \'Windows 11\' brand lives (marketing layer) vs where the OS lives (kernel layer)."'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_003', difficulty: 'standard',
          question: 'Python provides two distinct execution modes: Interactive Mode executes single.',
          hint: 'Revisit "Python Installation and Using the IDLE Editor" (c11_ip_cbse_02_002) and practice.',
          misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be.',
          parts: [
                { id: 'a', prompt: 'What is the primary visual indicator that you are in Interactive Mode in IDLE?', answer: 'The `>>>` prompt (three greater-than signs) indicates Interactive Mode',
                  options: ['The `>>>` prompt (three greater-than signs) indicates Interactive Mode', 'a blank window', 'a .py file tab'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' },
                { id: 'b', prompt: 'You need to test the behavior of `list.append()` vs `list.extend()` with a nested list.', answer: 'Choose Interactive Mode for quick testing',
                  options: ['Choose Interactive Mode for quick testing', 'two windows in IDLE'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' },
                { id: 'c', prompt: 'Compare the persistence of variables between Interactive Mode and Script Mode.', answer: 'Interactive Mode: `NameError`',
                  options: ['Interactive Mode: `NameError`', 'two windows in IDLE'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' }
          ],
            remediations: { 'interactive-mode-and-script-mode': { steps: ['Have the student open IDLE and explicitly point out the two separate windows: "Shell" (with `>>>`) and "Untitled".', 'In Shell, type `if True:` and press Enter — show the `...` continuation prompt, then type `print("hi")` and press Enter.', 'Then type `else:` — show `SyntaxError` because the `if` block already closed.', 'In editor, write the same `if-else` block correctly indented, save, run — show it works.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Script Mode is always better than Interactive Mode because it saves your code." Provide two specific scenarios where Interactive Mode.', answer: 'Statement is false',
                  options: ['Statement is false', 'two windows in IDLE'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' },
                { id: 'b', prompt: 'Design a mini-workflow for a Class 11 student to discover the precedence of `**` vs unary `-` (i.e., `-2 ** 2` vs `(-2) ** 2`) using Interactive Mode, then.', answer: 'Interactive discovery: ``` >>> -2 ** 2 -4 >>> (-2) ** 2 4 ``` Script file',
                  options: ['Interactive discovery: ``` >>> -2 ** 2 -4 >>> (-2) ** 2 4 ``` Script file', 'two windows in IDLE'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Interactive Mode and Script Mode are just "two windows in IDLE" and that code written in one can be directly copied to the.' }
          ],
            remediations: { 'interactive-mode-and-script-mode': { steps: ['Have the student open IDLE and explicitly point out the two separate windows: "Shell" (with `>>>`) and "Untitled".', 'In Shell, type `if True:` and press Enter — show the `...` continuation prompt, then type `print("hi")` and press Enter.', 'Then type `else:` — show `SyntaxError` because the `if` block already closed.', 'In editor, write the same `if-else` block correctly indented, save, run — show it works.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_002', difficulty: 'standard',
          question: 'The `open()` function in Python creates a file object that links a program to a.',
          hint: 'Revisit the definition of a file, file types (text vs binary), and the concept of a file.',
          misconception: 'Students often think that `open()` reads the file content into memory, so they try to print the file object directly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `open()` function in Python creates a file object that links a program to a specific',
                  options: ['The `open()` function in Python creates a file object that links a program to a specific', 'A Database Management System (DBMS) is a software system that enables users to define,', 'Data protection refers to the practices, safeguards, and legal frameworks designed to', 'Secondary storage devices are non-volatile, high-capacity auxiliary memory units that'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that `open()` reads the file content into memory, so they try to print the file object directly.' }
          ],
            remediations: { 'open-reads-the-file-content': { steps: ['Show the student the output of `print(open(\'test.txt\', \'r\'))` and ask what they see—emphasise it\'s a wrapper, not.', 'Demonstrate a program that writes without `close()` and then crashes (e.g., `raise Exception`), then check the file—it.', 'Have them rewrite the code with `try/finally` and verify the data persists.', 'Reinforce: "Open returns a tool, not the treasure; close saves the treasure."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
