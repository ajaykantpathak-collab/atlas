import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch10_p1: SimDef = {
    id: 'v3_c12_cs_ch10_p1',
    title: 'File Handling in Python · Part 1/2',
    subtitle: 'One wrong mode letter just erased the whole file',
    classLevel: 12, subject: 'computer_science', topic: 'File Handling in Python · Part 1/2',
    chapters: ['c12_cs_ch10'],
    nodeIds: ['c12_cs_cbse_10_001', 'c12_cs_cbse_10_002', 'c12_cs_cbse_10_003', 'c12_cs_cbse_10_004', 'c12_cs_cbse_10_005', 'c12_cs_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Data engineer', intro: 'RAM forgets everything when your program ends. Files are how programs remember — if you open them the right way.', goal: 'Distinguish text and binary files, choose correct open modes, and apply the open–process–close pattern for persistence.' },
    discovery: {
        question: 'A student opens \'data.dat\' in text mode \'to convert it to text,\' hits save, and the program\'s pickled records are permanently corrupt. What misconception destroyed the file?',
        options: ['That extension or mode defines the file — text mode re-encodes bytes through UTF-8 and newline translation, silently mangling binary data', 'Nothing — files can\'t be corrupted by opening them', 'The file was already corrupt', 'Binary files convert to text safely on open'],
        answer: 'That extension or mode defines the file — text mode re-encodes bytes through UTF-8 and newline translation, silently mangling binary data',
        hook: 'Files have no self-declared \'type\' — .txt is a hint, not a law. Content plus open-mode decides everything: \'w\' truncates to zero (it does NOT append), \'rb\' returns raw bytes, \'r\' decodes characters. The most dangerous corruptions throw no error at all.',
    },
    teaching: [
        { title: 'Introduction to File Handling and File Types', text: 'File handling is the process of storing data persistently on secondary storage (hard disk, SSD) using named files, allowing programs to read from and write to these files across multiple executions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Give your mark-tracker a memory that survives restarts: choose text vs binary for CSV records vs pickled objects, then write the open → process → close ritual that never loses a byte.',
        labels: ['Introduction to File Handling', 'Opening Files: open() Function', 'Reading Files: read(), readline()', 'Writing to Files: write()', 'Using with Statement', 'File Pointer Operations: seek()'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_001', title: 'Introduction to File Handling and File Types',
          caseStudy: { intro: 'Imagine you built a student mark tracker in Python that runs perfectly — but every time you close the program, all entered marks vanish.',
            decisions: [{ prompt: 'What is the fundamental difference between a text file and a binary file in terms of how data is stored and interpreted by Python?', options: [
                { text: 'A text file stores data as encoded characters (e.g., UTF-8, ASCII) where each byte or', outcome: 'A text file stores data as encoded characters (e.g., UTF-8, ASCII) where each byte or byte-sequence.' },
                { text: 'text files are .txt and binary files are .dat', outcome: 'Not quite — Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary.', reveals: 'file-extension-determines-file-type' },
                { text: '.txt means text file, .dat/.bin means binary file', outcome: 'Not quite — Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary.', reveals: 'file-extension-determines-file-type' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_002', title: 'Opening Files: open() Function and File Modes',
          caseStudy: { intro: 'Imagine you are building a diary app in Python: every day you want to add a new entry to a file `diary.txt` without deleting yesterday\'s entry.',
            decisions: [{ prompt: 'What is the default file mode when you call `open(\'notes.txt\')` without a second argument?', options: [
                { text: 'The default mode is `\'r\'` (read text)', outcome: 'The default mode is `\'r\'` (read text). A wrong answer (e.g., `\'w\'` or `\'a\'`) reveals that the.' },
                { text: 'w stands for write', outcome: 'Not quite — Students often believe that `\'w\'` mode **appends** to a file because "w stands for write".', reveals: 'w-mode-appends-to-a' },
                { text: '(the general operation) with the specific mode `\'w\'`', outcome: 'Not quite — Students often believe that `\'w\'` mode **appends** to a file because "w stands for write".', reveals: 'w-mode-appends-to-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_003', title: 'Reading Files: read(), readline() and readlines()',
          caseStudy: { intro: 'Imagine you have a marksheet text file `marks.txt` with one student record per line: `RollNo,Name,Marks`.',
            decisions: [{ prompt: 'What does `file_obj.read()` return when called on a text file opened in `\'r\'` mode, assuming the file contains the text `Hello\\nWorld` and.', options: [
                { text: 'Correct answer: `\'Hello\\nWorld\'` (a single string containing the entire file content', outcome: 'Correct answer: `\'Hello\\nWorld\'` (a single string containing the entire file content including the.' },
                { text: '`read()` stops at the first newline', outcome: 'Not quite — **Misconception:** "`readline()` reads all lines and returns a list; `readlines()` reads just one.', reveals: 'misconception-readline-reads-all-lines' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_004', title: 'Writing to Files: write() and writelines()',
          caseStudy: { intro: 'Imagine you are building a simple expense tracker that saves each day\'s spending to a file so you can review it later.',
            decisions: [{ prompt: 'What is the exact difference between `file.write(s)` and `file.writelines(seq)` in terms of the argument each expects?', options: [
                { text: '`write()` expects a single string argument and writes it to the file', outcome: '`write()` expects a single string argument and writes it to the file; `writelines()` expects.' },
                { text: 'both take a list', outcome: 'Not quite — Students often believe that `writelines()` automatically adds a newline after each string, because.', reveals: 'writelines-automatically-adds-a-newline' },
                { text: 'writelines adds newlines automatically', outcome: 'Not quite — Students often believe that `writelines()` automatically adds a newline after each string, because.', reveals: 'writelines-automatically-adds-a-newline' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_005', title: 'Using with Statement for File Handling',
          caseStudy: { intro: 'Imagine you\'re writing a program to save student marks to a file.',
            decisions: [{ prompt: 'What is the exact syntax to open a file named "data.txt" in read mode using the `with` statement, and what happens to the file object when.', options: [
                { text: 'Correct answer: `with open("data.txt", "r") as f:`', outcome: 'Correct answer: `with open("data.txt", "r") as f:` — when the indented block ends (normally or via.' },
                { text: 'data.txt', outcome: 'Not quite — Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...', reveals: 'with-open' },
                { text: 'but may not understand explicit mode specification', outcome: 'Not quite — Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...', reveals: 'with-open' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_10_006', title: 'File Pointer Operations: seek() and tell()',
          scaffold: { problem: 'A binary file `students.dat` contains fixed-length records of 30 bytes each (roll_no: 4 bytes int, name: 20 bytes UTF-8 padded, marks: 4.',
            steps: [
            { text: 'Calculate byte offset of record index 9: offset = 9 × 30 = 270 bytes from start.' },
            { text: 'Open file in `\'rb\'` mode (read binary) using `with` statement for safety.' },
            { text: 'Use `f.seek(270, 0)` to move pointer to start of 10th record (whence=0 means from beginning).' },
            { text: 'Read exactly 30 bytes: `data = f.read(30)`.' },
            { text: 'Unpack using `struct.unpack(\'i20sf\', data)` to get roll_no, name_bytes, marks.' },
            { text: 'Decode name (strip null padding) and print roll_no and marks.' },
            { text: 'Verify file pointer is now at 300 (270 + 30) using `f.tell()`.', faded: true, blankAnswer: 'roll_no=1009, marks=87.5 (example values; actual depends.' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An attendance logger opens \'records.txt\' in \'w\' mode each morning to add the day\'s entries. Every evening, yesterday\'s data is mysteriously gone.',
            decisions: [{ prompt: 'What\'s destroying the old records?', options: [
                { text: 'The \'w\' mode itself — opening for write truncates the file to zero before writing; switching to \'a\' (append) keeps existing lines and adds new ones at the end.', outcome: 'The mode letter is a decision: \'w\' erases, \'a\' appends, \'r\' only reads — picking \'w\' for logging silently wipes history.' },
                { text: 'Nothing — \'w\' appends by nature, so the missing data must be a Python bug.', outcome: 'That\'s the misconception itself: \'w\' truncates unconditionally; the vanished days are the expected behaviour, not a bug.', reveals: 'w-mode-appends' },
                { text: 'The .txt extension forces text mode weirdness — renaming to .dat would fix it.', outcome: 'Extensions are labels, not behaviour: the same file reads as text or bytes depending on the mode you open with.', reveals: 'extension-decides-file-type' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now persist data and explain exactly why \'w\' deletes, why pickle needs binary, and why the quiet bugs are the worst. File handling is every practical exam\'s foundation.',
            decisions: [{ prompt: 'What comes next? File Handling in Python · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — File Handling in Python · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_001', difficulty: 'standard',
          question: 'File handling is the process of storing data persistently on secondary storage.',
          hint: 'If unclear on volatility, revisit Class 11 Computer Science Chapter "Computer System.',
          misconception: 'Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary file".',
          parts: [
                { id: 'a', prompt: 'A student writes a Python program that opens a file in \'w\' mode, writes "Hello", closes it, then reopens the same file in \'r\' mode and reads it.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', '.txt means text file, .dat/.bin means binary file', 'file extension determines file type: "'],
                  hint: 'If unclear on volatility, revisit Class 11 Computer Science Chapter "Computer System Organisation".',
                  misconception: 'Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary file".' },
                { id: 'b', prompt: 'You have a CSV file "marks.csv" containing student names and marks (text data). You also have a compiled Python module "mymodule.pyc" (bytecode).', answer: '"marks.csv" should be opened in text mode (\'r\')',
                  options: ['"marks.csv" should be opened in text mode (\'r\')', '.txt means text file, .dat/.bin means binary file', 'file extension determines file type: "'],
                  hint: 'If unclear on volatility, revisit Class 11 Computer Science Chapter "Computer System Organisation".',
                  misconception: 'Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary file".' }
          ],
            remediations: { 'file-extension-determines-file-type': { steps: ['Have the student create a file "demo.txt" with content "₹100" (rupee symbol).', 'Open in \'rb\' and print the raw bytes — observe b\'\\xe2\\x82\\xb9100\' (3 bytes for ₹).', 'Open in \'r\' (text) and print — observe "₹100" (1 character).', 'Explain: the FILE is identical; the MODE decides interpretation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary file".',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since binary files are more compact and faster, we should always use binary mode for all file operations in Python." Defend or refute.', answer: 'Refute',
                  options: ['Refute', '.txt means text file, .dat/.bin means binary file', 'file extension determines file type: "'],
                  hint: 'If unclear on volatility, revisit Class 11 Computer Science Chapter "Computer System Organisation".',
                  misconception: 'Students believe file extension determines file type: ".txt means text file, .dat/.bin means binary file".' }
          ],
            remediations: { 'file-extension-determines-file-type': { steps: ['Have the student create a file "demo.txt" with content "₹100" (rupee symbol).', 'Open in \'rb\' and print the raw bytes — observe b\'\\xe2\\x82\\xb9100\' (3 bytes for ₹).', 'Open in \'r\' (text) and print — observe "₹100" (1 character).', 'Explain: the FILE is identical; the MODE decides interpretation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_002', difficulty: 'standard',
          question: 'The `open()` function in Python is used to open a file and return a file object.',
          hint: 'Review Class 11 Python basics: function definition and calling (e.g., `len()`.',
          misconception: 'Students often believe that `\'w\'` mode **appends** to a file because "w stands for write".',
          parts: [
                { id: 'a', prompt: 'What is the default file mode when you call `open(\'notes.txt\')` without a second argument?', answer: 'The default mode is `\'r\'` (read text)',
                  options: ['The default mode is `\'r\'` (read text)', 'w stands for write', '(the general operation) with the specific mode `\'w\'`', '`\'w\'` mode **appends** to a file'],
                  hint: 'Review Class 11 Python basics: function definition and calling (e.g., `len()`, `print()`), string.',
                  misconception: 'Students often believe that `\'w\'` mode **appends** to a file because "w stands for write".' },
                { id: 'b', prompt: 'You want to open `data.txt` for both reading and writing, but you do NOT want to lose its current content. Which mode should you use?', answer: '`open(\'data.txt\', \'r+\')`',
                  options: ['`open(\'data.txt\', \'r+\')`', 'w stands for write', '(the general operation) with the specific mode `\'w\'`', '`\'w\'` mode **appends** to a file'],
                  hint: 'Review Class 11 Python basics: function definition and calling (e.g., `len()`, `print()`), string.',
                  misconception: 'Students often believe that `\'w\'` mode **appends** to a file because "w stands for write".' },
                { id: 'c', prompt: 'Compare the behaviour of `\'r+\'` and `\'w+\'` when the file does NOT exist. What happens in each case?', answer: '`\'r+\'` raises `FileNotFoundError`',
                  options: ['`\'r+\'` raises `FileNotFoundError`', 'w stands for write', '(the general operation) with the specific mode `\'w\'`', '`\'w\'` mode **appends** to a file'],
                  hint: 'Review Class 11 Python basics: function definition and calling (e.g., `len()`, `print()`), string.',
                  misconception: 'Students often believe that `\'w\'` mode **appends** to a file because "w stands for write".' }
          ],
            remediations: { 'w-mode-appends-to-a': { steps: ['Have the student create a 3-column table: Mode | File exists?', '| Pointer start | Truncates?', 'Fill it for all six text modes (`r`, `w`, `a`, `r+`, `w+`, `a+`) using the Python docs or NCERT textbook.', 'Then give three micro-tasks: (a) open `test.txt` for reading only, (b) open `log.txt` to add a line without erasing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_003', difficulty: 'standard',
          question: 'The `read()`, `readline()`, and `readlines()` methods are used to read data.',
          hint: 'Revisit `c12_cs_cbse_10_002` — practice opening files in `\'r\'` mode and printing the file.',
          misconception: '**Misconception:** "`readline()` reads all lines and returns a list; `readlines()` reads just one line." **Why.',
          parts: [
                { id: 'a', prompt: 'A student writes: `f = open(\'data.txt\', \'r\'); line1 = f.readline(); line2 = f.readline(); f.close()`.', answer: 'Correct answer: `line1 = \'Apple\\n\'`, `line2 = \'Banana\\n\'`',
                  options: ['Correct answer: `line1 = \'Apple\\n\'`, `line2 = \'Banana\\n\'`', '`readline()` strips the newline'],
                  hint: 'Revisit `c12_cs_cbse_10_002` — practice opening files in `\'r\'` mode and printing the file object.',
                  misconception: '**Misconception:** "`readline()` reads all lines and returns a list; `readlines()` reads just one line." **Why it happens:** The names are.' },
                { id: 'b', prompt: 'Compare the memory usage and file pointer position after these two sequences on a 10-line file `test.txt` (each line ends with `\\n`): Sequence A: `f.', answer: 'Correct answer: Both sequences leave the file pointer at EOF (end of file)',
                  options: ['Correct answer: Both sequences leave the file pointer at EOF (end of file)', '`readlines()` stops before the last newline'],
                  hint: 'Revisit `c12_cs_cbse_10_002` — practice opening files in `\'r\'` mode and printing the file object.',
                  misconception: '**Misconception:** "`readline()` reads all lines and returns a list; `readlines()` reads just one line." **Why it happens:** The names are.' }
          ],
            remediations: { 'misconception-readline-reads-all-lines': { steps: ['**Immediate fix:** Create a 3-line test file `test.txt` with content `A\\nB\\nC\\n`.', 'In Python shell, run: `f=open(\'test.txt\')`; then `print(repr(f.readline()))` → observe `\'A\\n\'`; then.', 'Repeat with `f=open(\'test.txt\')`; `print(repr(f.read()))` → `\'A\\nB\\nC\\n\'`.', '**Mnemonic:** "readline = **one** line (singular), readlines = **list** of lines (plural → list)." Write this on.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_004', difficulty: 'standard',
          question: 'The `write()` method writes a single string to an open file object, while the.',
          hint: 'Review c12_cs_cbse_10_002: practice opening files in different modes and predicting.',
          misconception: 'Students often believe that `writelines()` automatically adds a newline after each string, because the method name.',
          parts: [
                { id: 'a', prompt: 'What is the exact difference between `file.write(s)` and `file.writelines(seq)` in terms of the argument each expects?', answer: '`write()` expects a single string argument and writes it to the file',
                  options: ['`write()` expects a single string argument and writes it to the file', 'both take a list', 'writelines adds newlines automatically', 'write lines'],
                  hint: 'Review c12_cs_cbse_10_002: practice opening files in different modes and predicting whether content.',
                  misconception: 'Students often believe that `writelines()` automatically adds a newline after each string, because the method name suggests "write lines".' },
                { id: 'b', prompt: 'Explain why the following code produces a file with all content on a single line, and how to fix it: ```python lines = ["Apple", "Banana", "Cherry"] with.', answer: '`writelines()` does not insert newline characters',
                  options: ['`writelines()` does not insert newline characters', 'write lines'],
                  hint: 'Review c12_cs_cbse_10_002: practice opening files in different modes and predicting whether content.',
                  misconception: 'Students often believe that `writelines()` automatically adds a newline after each string, because the method name suggests "write lines".' }
          ],
            remediations: { 'writelines-automatically-adds-a-newline': { steps: ['If a student exhibits this misconception, have them: 1.', 'Create a test file with `f.writelines(["A", "B"])` and open it in a text editor to see the single-line output.', 'Modify the list to `["A\\n", "B\\n"]` and observe the two-line result.', 'Explain in their own words why the method is named `writelines` (it writes a *list* of strings, not *lines* with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_005', difficulty: 'standard',
          question: 'The `with` statement in Python is a context manager that automatically handles.',
          hint: 'If stuck, revisit c12_cs_cbse_10_002 (open modes) and c12_cs_cbse_10_003/004 (read/write.',
          misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax to open a file named "data.txt" in read mode using the `with` statement, and what happens to the file object when the indented block.', answer: 'Correct answer: `with open("data.txt", "r") as f:`',
                  options: ['Correct answer: `with open("data.txt", "r") as f:`', 'data.txt', 'but may not understand explicit mode specification', '`with open('],
                  hint: 'If stuck, revisit c12_cs_cbse_10_002 (open modes) and c12_cs_cbse_10_003/004 (read/write methods).',
                  misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...' },
                { id: 'b', prompt: 'Rewrite this legacy code to use `with` statement. The code reads a config file, processes each line, and must ensure the file closes even if `process_line()`.', answer: 'Correct answer: ```python with open("config.ini", "r") as f: for line in f:',
                  options: ['Correct answer: ```python with open("config.ini", "r") as f: for line in f:', 'keeps `f', '`with open('],
                  hint: 'If stuck, revisit c12_cs_cbse_10_002 (open modes) and c12_cs_cbse_10_003/004 (read/write methods).',
                  misconception: 'Students believe `with open(...) as f:` is just a shorthand for `f = open(...); try: ...' }
          ],
            remediations: { 'with-open': { steps: ['Revisit c12_cs_cbse_10_002 (open() modes) — ensure student knows mode strings.', 'Revisit c12_cs_cbse_10_003 and c12_cs_cbse_10_004 — practice read/write without `with` to feel the pain of manual close.', 'Show a live demo: run manual code that crashes mid-write, check file size (0 bytes or partial).', 'Re-diagnostic: give a snippet with `try-except` inside `with` and ask "does the file close before or after except block.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_006', difficulty: 'standard',
          question: 'The file pointer is an invisible cursor maintained by Python that tracks the.',
          hint: 'If stuck, review `c12_cs_cbse_10_002` (file modes table) and `c12_cs_cbse_10_004`.',
          misconception: 'Students believe `seek(offset, 1)` with a negative offset "rewinds" the file pointer by that many *characters* in text.',
          parts: [
                { id: 'a', prompt: 'What does `file.tell()` return immediately after opening a file in `\'r\'` mode, before any read or write operation?', answer: '`file.tell()` returns `0`',
                  options: ['`file.tell()` returns `0`', 'rewinds'],
                  hint: 'If stuck, review `c12_cs_cbse_10_002` (file modes table) and `c12_cs_cbse_10_004` (write() with.',
                  misconception: 'Students believe `seek(offset, 1)` with a negative offset "rewinds" the file pointer by that many *characters* in text mode.' },
                { id: 'b', prompt: 'Explain in your own words the difference between `seek(10, 0)`, `seek(10, 1)`, and `seek(-10, 2)` assuming the file is opened in binary mode.', answer: '`seek(10, 0)` moves the pointer to absolute byte 10 from the start of the file',
                  options: ['`seek(10, 0)` moves the pointer to absolute byte 10 from the start of the file', 'move to byte 10', 'rewinds'],
                  hint: 'If stuck, review `c12_cs_cbse_10_002` (file modes table) and `c12_cs_cbse_10_004` (write() with.',
                  misconception: 'Students believe `seek(offset, 1)` with a negative offset "rewinds" the file pointer by that many *characters* in text mode.' },
                { id: 'c', prompt: 'A binary file `data.bin` contains 100 records of exactly 20 bytes each. The file is opened as `f = open(\'data.bin\', \'rb+\')`.', answer: '`f.seek(4 * 20, 0)` or `f.seek(80, 0)`',
                  options: ['`f.seek(4 * 20, 0)` or `f.seek(80, 0)`', 'rewinds'],
                  hint: 'If stuck, review `c12_cs_cbse_10_002` (file modes table) and `c12_cs_cbse_10_004` (write() with.',
                  misconception: 'Students believe `seek(offset, 1)` with a negative offset "rewinds" the file pointer by that many *characters* in text mode.' }
          ],
            remediations: { 'seek-offset': { steps: ['Revisit node `c12_cs_cbse_10_002` (file modes) to re-learn the exact behaviour of `r+`, `rb+`, `w+`, `wb+`, `a`, `ab`.', 'Revisit node `c12_cs_cbse_10_003` (reading) and `c12_cs_cbse_10_004` (writing) to practice `read(n)` and `write(bytes)`.', 'Create a 3-record binary file using `struct.pack` (each record 12 bytes: `i f` = int + float).', 'Use `seek()` and `tell()` to: (a) read record 1, (b) update record 0, (c) append record 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
