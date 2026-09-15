import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch06_p2: SimDef = {
    id: 'v3_c11_ip_ch06_p2',
    title: 'File Handling · Part 2/2',
    subtitle: 'Learn the open-work-close rhythm — and what the buffer hides from you.',
    classLevel: 11, subject: 'informatics_practices', topic: 'File Handling · Part 2/2',
    chapters: ['c11_ip_ch06'],
    nodeIds: ['c11_ip_cbse_06_007', 'c11_ip_cbse_06_008', 'c11_ip_cbse_06_009', 'c11_ip_cbse_06_010', 'c11_ip_cbse_06_011', 'c11_ip_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer making exam marks survive a restart', intro: 'Variables die when the program exits — only a file on disk remembers tomorrow. Open it, do the work, close it.', goal: 'Choose text vs binary files correctly and explain open/close and buffering.' },
    discovery: {
        question: 'A program opens a file, writes data, then crashes before `close()` — is the data safely on disk?',
        options: ['Not guaranteed — Python buffers output, and only close() (or flush()) forces the buffer to disk', 'Yes — the OS saves everything automatically', 'Yes — write() always hits the disk instantly', 'No — the file is always left empty'],
        answer: 'Not guaranteed — Python buffers output, and only close() (or flush()) forces the buffer to disk',
        hook: 'And open() doesn\'t read anything — it hands you a handle; the data only moves when you explicitly read or write.',
    },
    teaching: [
        { title: 'File Pointer Operations: seek() and tell() Methods', text: 'The `seek(offset, whence)` method moves the file pointer to a specific byte position within an open file, where `offset` is the number of bytes to move and `whence` (0, 1, or 2) specifies the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split report-card data into CSV text and scanned signatures into binary, then defend why \'always use binary mode\' is bad advice for text.',
        labels: ['File Pointer Operations: seek()', 'Appending Data to', 'Introduction to CSV Files', 'Reading CSV Files Using', 'Writing CSV Files Using', 'Practical File Operations: Counting'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_06_007', title: 'File Pointer Operations: seek() and tell() Methods',
          scaffold: { problem: 'A file `sales.txt` contains daily sales (one amount per line): `1200\\n2500\\n3100\\n1800\\n4200\\n`.',
            steps: [
            { text: 'Open `sales.txt` in `\'r\'` mode using `with` statement.' },
            { text: 'Initialize empty list `positions = []`. Loop: while True, record `pos = f.tell()`, then `line = f.readline()`.' },
            { text: 'After loop, `positions` = [0, 5, 10, 15, 20] (assuming each line ends with `\\n` and amounts are 4 digits).' },
            { text: 'To read 3rd line (index 2), do `f.seek(positions[2])` then `line = f.readline()`.' },
            { text: 'Print `line.strip()` → outputs `3100`. Confirm it matches the 3rd line.', faded: true, blankAnswer: '3100' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_009', title: 'Introduction to CSV Files and the csv Module',
          caseStudy: { intro: 'Imagine you have a marksheet in Excel with columns: Roll No, Name, Math, Science, English.',
            decisions: [{ prompt: 'What is the primary purpose of the `newline=\'\'` parameter when opening a CSV file in Python using the `open()` function?', options: [
                { text: 'The `newline=\'\'` parameter tells Python not to perform universal newline translation,', outcome: 'The `newline=\'\'` parameter tells Python not to perform universal newline translation, allowing the.' },
                { text: 'it creates a new line', outcome: 'Not quite — Students think CSV parsing is just "split by comma" and that `open(\'file.csv\')` without.', reveals: 'csv-parsing-is-just-split' },
                { text: 'it skips the header', outcome: 'Not quite — Students think CSV parsing is just "split by comma" and that `open(\'file.csv\')` without.', reveals: 'csv-parsing-is-just-split' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_010', title: 'Reading CSV Files Using csv.reader and DictReader',
          caseStudy: { intro: 'Imagine you have a CSV file `students.csv` containing roll numbers, names, and marks for 500 students from your school\'s annual exam.',
            decisions: [{ prompt: 'What is the fundamental difference in the data structure returned per row when iterating over a `csv.reader` object versus.', options: [
                { text: '`csv.reader` returns each row as a `list` of strings (positional access via index), while', outcome: '`csv.reader` returns each row as a `list` of strings (positional access via index), while.' },
                { text: 'both return lists', outcome: 'Not quite — Students believe `csv.DictReader` automatically converts numeric strings to `int` or `float`.', reveals: 'csv' },
                { text: 'both return dictionaries', outcome: 'Not quite — Students believe `csv.DictReader` automatically converts numeric strings to `int` or `float`.', reveals: 'csv' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_011', title: 'Writing CSV Files Using csv.writer and DictWriter',
          caseStudy: { intro: 'Imagine you have collected survey data from 50 classmates about their favorite subjects and marks, stored as a list of dictionaries in Python.',
            decisions: [{ prompt: 'What is the purpose of the `newline=\'\'` parameter when opening a file for CSV writing in Python, and what happens if you omit it on Windows?', options: [
                { text: 'The `newline=\'\'` parameter tells Python not to perform universal newline translation,', outcome: 'The `newline=\'\'` parameter tells Python not to perform universal newline translation, allowing the.' },
                { text: 'it prevents extra spaces', outcome: 'Not quite — Students believe `csv.writer` and `csv.DictWriter` automatically handle file opening modes and.', reveals: 'csv' },
                { text: '`csv.writer` and `csv', outcome: 'Not quite — Students believe `csv.writer` and `csv.DictWriter` automatically handle file opening modes and.', reveals: 'csv' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_012', title: 'Practical File Operations: Counting Words, Lines and Characters',
          caseStudy: { intro: 'Imagine you are given a text file `diary.txt` containing your daily journal entries and you want to know how many lines you wrote, how many words you used, and.',
            decisions: [{ prompt: 'What is the difference between `str.split()` and `str.splitlines()` when applied to a string read from a text file?', options: [
                { text: '`str.split()` without arguments splits on any whitespace (spaces, tabs, newlines) and', outcome: '`str.split()` without arguments splits on any whitespace (spaces, tabs, newlines) and returns.' },
                { text: 'both split on newlines', outcome: 'Not quite — Students often believe that `content.split(\' \')` correctly counts words because they think words.', reveals: 'content' },
                { text: '`content', outcome: 'Not quite — Students often believe that `content.split(\' \')` correctly counts words because they think words.', reveals: 'content' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s marks-manager program loses all 50 students\' data on exit. He also tries `open(\'data.dat\')`, `print(file)` to see contents, and writes image bytes with `file.write(\'...\')` in text mode — \'files are just .txt things, and close() is optional since programs close files anyway.\'',
            decisions: [{ prompt: 'Which file-handling facts fix his program?', options: [
                { text: 'Rebuild the pipeline: variables live in RAM — files persist on disk via the open → work → close rhythm. `open()` returns a handle, not the contents — you must read()/write() explicitly. Binary files are raw bytes (images, .dat, pickle) needing \'rb\'/\'wb\' — text mode corrupts them. And close() flushes the buffer; relying on program-end risks losing everything you wrote.', outcome: 'The data survives restarts: right mode for the data\'s nature, explicit reads, and close() as the non-negotiable commit.' },
                { text: 'Keep everything in text mode — all files are readable text if you open them right.', outcome: 'Every file is bytes; text mode is a convenience layer that decodes — forcing it on binary data mangles content or throws decode errors.', reveals: 'all-files-are-text' },
                { text: 'Skip close() — Python tidies up when the program ends, that\'s automatic.', outcome: 'Buffering means unflushed writes may never reach disk; \'automatic\' closure is exactly how his data vanished.', reveals: 'close-is-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'Every file is bytes underneath; text mode\'s gift is encoding and newline translation you don\'t have to manage yourself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_007', difficulty: 'standard',
          question: 'The `seek(offset, whence)` method moves the file pointer to a specific byte.',
          hint: 'Revisit c11_ip_cbse_06_004 (reading methods) and trace the pointer movement manually on.',
          misconception: 'Students believe `seek(n)` in text mode moves by *characters* (like string indexing) rather than *bytes*.',
          parts: [
                { id: 'a', prompt: 'Given a text file `data.txt` containing lines of varying length, you record `pos = f.tell()` before reading a line with `f.readline()`.', answer: 'Yes, you will get the same line',
                  options: ['Yes, you will get the same line', 'no, because text mode translates newlines'],
                  hint: 'Revisit c11_ip_cbse_06_004 (reading methods) and trace the pointer movement manually on a small.',
                  misconception: 'Students believe `seek(n)` in text mode moves by *characters* (like string indexing) rather than *bytes*.' }
          ],
            remediations: { 'seek-n-in-text-mode': { steps: ['Create a file `test.txt` with content: `A\\nB\\n₹\\nD` (save as UTF-8).', 'Open in `\'r\'` mode, print `tell()` before each `readline()`.', 'Note positions: 0, 2, 4, 7 (because \'₹\' takes 3 bytes + `\\n`).', 'Try `seek(5)` → read → observe `UnicodeDecodeError` or `�`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_008', difficulty: 'standard',
          question: 'Appending data to an existing text file means opening the file in append mode.',
          hint: 'Revisit c11_ip_cbse_06_003 (File Access Modes) and practice opening same file in \'w\'.',
          misconception: 'Students believe that opening a file in append mode (\'a\') allows reading the existing content using `read()`.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Appending data to an existing text file means opening the file in append mode (\'a\')',
                  options: ['Appending data to an existing text file means opening the file in append mode (\'a\')', 'File handling is the process of storing data permanently on secondary storage devices', 'The `open()` function in Python creates a file object that links a program to a specific', 'File access modes in Python specify the operations permitted on a file (reading, writing,'],
                  hint: 'Revisit c11_ip_cbse_06_003 (File Access Modes) and practice opening same file in \'w\', \'r\', and \'a\'.',
                  misconception: 'Students believe that opening a file in append mode (\'a\') allows reading the existing content using `read()` or `readline()` immediately.' }
          ],
            remediations: { 'opening-a-file-in-append': { steps: ['Demonstrate the error live - open a file with known content in \'a\' mode, call `read()`, show empty output.', 'Explain that \'a\' moves pointer to EOF (use `tell()` to prove position equals file size).', 'Show correct modes: \'a+\' for read-append (pointer at EOF but can `seek(0)` to read), or open twice - first \'r\' to read.', 'Practice exercise: "Write a function `append_after_reading(filename, new_line)` that reads all lines, prints them, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_009', difficulty: 'standard',
          question: 'A CSV (Comma Separated Values) file is a plain text file that stores tabular.',
          hint: 'Review `with` statement (node c11_ip_cbse_06_006) and file modes (node.',
          misconception: 'Students think CSV parsing is just "split by comma" and that `open(\'file.csv\')` without `newline=\'\'` is fine.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A CSV (Comma Separated Values) file is a plain text file that stores tabular data where',
                  options: ['A CSV (Comma Separated Values) file is a plain text file that stores tabular data where', 'File handling is the process of storing data permanently on secondary storage devices', 'The `open()` function in Python creates a file object that links a program to a specific', 'File access modes in Python specify the operations permitted on a file (reading, writing,'],
                  hint: 'Review `with` statement (node c11_ip_cbse_06_006) and file modes (node c11_ip_cbse_06_003).',
                  misconception: 'Students think CSV parsing is just "split by comma" and that `open(\'file.csv\')` without `newline=\'\'` is fine.' }
          ],
            remediations: { 'csv-parsing-is-just-split': { steps: ['Show a CSV line: `101,"Roy, Aniket",90` and ask: "How many fields?', 'What does `split(\',\')` give?" → 3 fields, but split gives 4.', 'Demonstrate `csv.reader` on same line → correct list.', 'Explain: CSV uses quotes to *embrace* commas.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think CSV parsing is just "split by comma" and that `open(\'file.csv\')` without `newline=\'\'` is fine.',
          parts: [
                { id: 'a', prompt: 'A CSV file uses semicolon (`;`) as delimiter because data contains commas. Evaluate the following code: `csv.reader(open(\'data.csv\'), delimiter=\';\')`.', answer: 'The code is incorrect',
                  options: ['The code is incorrect', 'split by comma', 'CSV parsing is just "split by comma" and that `open(\'file'],
                  hint: 'Review `with` statement (node c11_ip_cbse_06_006) and file modes (node c11_ip_cbse_06_003).',
                  misconception: 'Students think CSV parsing is just "split by comma" and that `open(\'file.csv\')` without `newline=\'\'` is fine.' }
          ],
            remediations: { 'csv-parsing-is-just-split': { steps: ['Show a CSV line: `101,"Roy, Aniket",90` and ask: "How many fields?', 'What does `split(\',\')` give?" → 3 fields, but split gives 4.', 'Demonstrate `csv.reader` on same line → correct list.', 'Explain: CSV uses quotes to *embrace* commas.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_010', difficulty: 'standard',
          question: 'The `csv.reader` object returns an iterator that yields each row of a CSV file.',
          hint: 'Revisit `c11_ip_cbse_06_006` (with statement) and `c11_ip_cbse_06_004` (reading text.',
          misconception: 'Students believe `csv.DictReader` automatically converts numeric strings to `int` or `float` because the columns "look.',
          parts: [
                { id: 'a', prompt: 'A student writes the following code to read `data.csv` which has headers `Name,Age,City`: ```python import csv with open(\'data.csv\', \'r\') as f: reader.', answer: 'The code will raise a `KeyError: \'name\'`',
                  options: ['The code will raise a `KeyError: \'name\'`', 'it prints the name correctly', 'it prints nothing', 'look like numbers'],
                  hint: 'Revisit `c11_ip_cbse_06_006` (with statement) and `c11_ip_cbse_06_004` (reading text files line.',
                  misconception: 'Students believe `csv.DictReader` automatically converts numeric strings to `int` or `float` because the columns "look like numbers.".' }
          ],
            remediations: { 'csv': { steps: ['Show the student a raw CSV line: `101,Aarav,85,92` and ask: "What does `row[2]` give you?" → `\'85\'` (string).', 'Have them write `print(type(row[\'Marks\']))` in a live DictReader loop — they see `<class \'str\'>`.', 'Demonstrate the bug: `total = row[\'Maths\'] + row[\'Physics\']` produces `\'8592\'`, then fix with `int(row[\'Maths\']).', 'Assign a micro-task: "Read `marks.csv`, compute average of Maths column" — they must explicitly convert each value.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_011', difficulty: 'standard',
          question: 'Writing CSV files in Python uses the `csv.writer` and `csv.DictWriter` classes.',
          hint: 'Revisit `c11_ip_cbse_06_009` (CSV introduction) to see CSV structure, and.',
          misconception: 'Students believe `csv.writer` and `csv.DictWriter` automatically handle file opening modes and encoding, so they write.',
          parts: [
                { id: 'a', prompt: 'A student writes CSV data using `csv.writer` but finds that fields containing commas (e.g., `"Delhi, India"`) appear split across two columns in Excel.', answer: 'By default, `csv.writer` uses `quoting=csv.QUOTE_MINIMAL`',
                  options: ['By default, `csv.writer` uses `quoting=csv.QUOTE_MINIMAL`', '`csv.writer` and `csv'],
                  hint: 'Revisit `c11_ip_cbse_06_009` (CSV introduction) to see CSV structure, and `c11_ip_cbse_06_006`.',
                  misconception: 'Students believe `csv.writer` and `csv.DictWriter` automatically handle file opening modes and encoding, so they write `open(\'file.csv\'.' }
          ],
            remediations: { 'csv': { steps: ['Show the student a CSV file written without `newline=\'\'` on Windows — open it in Notepad++ to reveal `\\r\\r\\n` line.', 'Have them write a row with `\'Mumbai, Maharashtra\'` and open in Excel to see the comma split columns.', 'Demonstrate the fix: add `newline=\'\', encoding=\'utf-8\'` and rerun.', 'Ask them to explain *why* the `csv` module needs control over newlines (because it writes `\\r\\n` per RFC 4180).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_012', difficulty: 'standard',
          question: 'Practical file operations for counting words, lines, and characters involve.',
          hint: 'Revisit `split()` vs `split(\' \')` by testing both on `\'hello world\\ntest\'` in the Python.',
          misconception: 'Students often believe that `content.split(\' \')` correctly counts words because they think words are always separated.',
          parts: [
                { id: 'a', prompt: 'If a file contains the text `"Hello world\\n\\nPython"` (with three spaces between words and a blank line), what will `len(content.split())` and.', answer: '`len(content.split())` returns 3',
                  options: ['`len(content.split())` returns 3', '`content', 'words are always separated by a single space'],
                  hint: 'Revisit `split()` vs `split(\' \')` by testing both on `\'hello world\\ntest\'` in the Python shell and.',
                  misconception: 'Students often believe that `content.split(\' \')` correctly counts words because they think words are always separated by a single space.' },
                { id: 'b', prompt: 'Write a Python code snippet that correctly counts lines, words, and characters in a file `notes.txt` and handles the case where the file might not exist.', answer: '```python try: with open(\'notes.txt\', \'r\') as f: content = f.read() lines =',
                  options: ['```python try: with open(\'notes.txt\', \'r\') as f: content = f.read() lines =', 'Lines: {lines}, Words: {words}, Characters: {chars}', 'File not found', 'uses `f'],
                  hint: 'Revisit `split()` vs `split(\' \')` by testing both on `\'hello world\\ntest\'` in the Python shell and.',
                  misconception: 'Students often believe that `content.split(\' \')` correctly counts words because they think words are always separated by a single space.' },
                { id: 'c', prompt: 'Compare the character count obtained by `len(content)` versus `sum(len(line) for line in content.splitlines())` for a file ending with a newline.', answer: '`len(content)` is larger by exactly 1 (or more if multiple trailing newlines)',
                  options: ['`len(content)` is larger by exactly 1 (or more if multiple trailing newlines)', '`content', 'words are always separated by a single space'],
                  hint: 'Revisit `split()` vs `split(\' \')` by testing both on `\'hello world\\ntest\'` in the Python shell and.',
                  misconception: 'Students often believe that `content.split(\' \')` correctly counts words because they think words are always separated by a single space.' }
          ],
            remediations: { 'content': { steps: ['If a student uses `split(\' \')` or gets wrong counts: 1.', 'Ask them to print `repr(content)` to see invisible characters like `\\t`, `\\n`, and multiple spaces.', 'Have them test `\'a b\\tc\\nd\'.split(\' \')` and `\'a b\\tc\\nd\'.split()` side by side in the Python shell.', 'Explain that `split()` with no argument is defined as "split on runs of whitespace" — a single design decision.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
