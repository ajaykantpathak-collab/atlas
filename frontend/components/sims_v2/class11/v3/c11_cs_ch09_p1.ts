import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch09_p1: SimDef = {
    id: 'v3_c11_cs_ch09_p1',
    title: 'File Handling in Python · Part 1/2',
    subtitle: 'Persist data beyond the program — and never trust an extension to tell you a file\'s type.',
    classLevel: 11, subject: 'computer_science', topic: 'File Handling in Python · Part 1/2',
    chapters: ['c11_cs_ch09'],
    nodeIds: ['c11_cs_cbse_09_001', 'c11_cs_cbse_09_002', 'c11_cs_cbse_09_003', 'c11_cs_cbse_09_004', 'c11_cs_cbse_09_005', 'c11_cs_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer building a contact-saver app', intro: 'Marks for 500 students vanish when the program exits. Files are how data outlives the run.', goal: 'Distinguish text from binary files and use open() with the correct mode and path.' },
    discovery: {
        question: 'Rename photo.jpg to photo.txt and open it in Notepad — gibberish. Did the file become a text file?',
        options: ['No — the internal byte structure defines the type; the extension is only a hint', 'Yes — the .txt extension converts the contents automatically', 'Yes — but only after Notepad finishes reading it', 'No — because .jpg files cannot be renamed'],
        answer: 'No — the internal byte structure defines the type; the extension is only a hint',
        hook: 'An extension is a label on the box, not a conversion of what\'s inside — bytes decide the file type.',
    },
    teaching: [
        { title: 'Introduction to File Handling and File Types', text: 'File handling is the process of storing data permanently on secondary storage devices (like hard disks) using files, enabling data persistence beyond program execution.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Open records/data.csv for reading, pick the right mode to write a JPEG without corruption, and choose a human-readable format for student records.',
        labels: ['Introduction to File Handling', 'Opening a File Using', 'File Modes: Read, Write', 'Reading a File: read(),', 'Writing to a File', 'Closing a File Using'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_001', title: 'Introduction to File Handling and File Types',
          caseStudy: { intro: 'Imagine you are building a program to store the marks of 500 students in a school. If you store them in a list, the data disappears when the program ends.',
            decisions: [{ prompt: 'What is the primary purpose of file handling in programming, and name the two main categories of files based on their internal.', options: [
                { text: 'The primary purpose of file handling is to achieve data persistence', outcome: 'The primary purpose of file handling is to achieve data persistence — storing data on secondary.' },
                { text: 'file handling is for printing output', outcome: 'Not quite — Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file.', reveals: 'file-extension-e' },
                { text: 'categories are .txt and .pdf', outcome: 'Not quite — Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file.', reveals: 'file-extension-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_002', title: 'Opening a File Using open() Function',
          caseStudy: { intro: 'Imagine you are building a simple contact‑manager app that saves phone numbers to a file named `contacts.txt` on your computer.',
            decisions: [{ prompt: 'What does the `open()` function return when it executes successfully?', options: [
                { text: 'The `open()` function returns a **file object** (also called a file handle) that provides', outcome: 'The `open()` function returns a **file object** (also called a file handle) that provides methods.' },
                { text: 'it returns the file content', outcome: 'Not quite — **“`open()` reads the file content into memory.”** Many students believe that `f.', reveals: 'open-reads-the-file-content' },
                { text: 'it returns a string', outcome: 'Not quite — **“`open()` reads the file content into memory.”** Many students believe that `f.', reveals: 'open-reads-the-file-content' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_004', title: 'Reading a File: read(), readline() and readlines()',
          caseStudy: { intro: 'Imagine you have a text file `marks.txt` containing one student\'s marks per line: `78\\n92\\n85\\n`.',
            decisions: [{ prompt: 'What is the return type of `f.read()` when `f` is a file object opened in text mode `\'r\'` and the file contains three lines of text?', options: [
                { text: '`f.read()` returns a single string containing the entire file content including newline', outcome: '`f.read()` returns a single string containing the entire file content including newline characters.' },
                { text: 'list of lines', outcome: 'Not quite — Students believe `readline()` and `readlines()` strip the newline character `\\n` automatically.', reveals: 'readline-and-readlines-strip-the' },
                { text: 'first line only', outcome: 'Not quite — Students believe `readline()` and `readlines()` strip the newline character `\\n` automatically.', reveals: 'readline-and-readlines-strip-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_005', title: 'Writing to a File: write() and writelines()',
          caseStudy: { intro: 'Imagine you have a list of cricket players and their scores: `[\'Virat, 89\', \'Rohit, 72\', \'Shubman, 65\']`.',
            decisions: [{ prompt: 'What is the return value of `file.write(\'Hello\')` when the file is opened in text mode?', options: [
                { text: 'The method returns the number of characters written', outcome: 'The method returns the number of characters written, which is 5.' },
                { text: 'symmetry', outcome: 'Not quite — Students believe `write()` automatically appends a newline (like `print()`) and that `writelines()`.', reveals: 'write-automatically-appends-a-newline' },
                { text: '`write()` returns a success boolean', outcome: 'Not quite — Students believe `write()` automatically appends a newline (like `print()`) and that `writelines()`.', reveals: 'write-automatically-appends-a-newline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_006', title: 'Closing a File Using close() Method',
          caseStudy: { intro: 'Imagine you borrow a library book (open a file), read or write notes in it (read/write operations), but forget to return it (close).',
            decisions: [{ prompt: 'What is the exact syntax to close a file object named `f` in Python, and what happens to unwritten data in the buffer when this method.', options: [
                { text: 'The syntax is `f.close()`', outcome: 'The syntax is `f.close()`. When executed, Python flushes the internal write buffer (forcing all.' },
                { text: 'it just closes the file', outcome: 'Not quite — Students believe `close()` is optional because "Python automatically closes files when the program.', reveals: 'close-is-optional-because-python' },
                { text: 'data is saved automatically', outcome: 'Not quite — Students believe `close()` is optional because "Python automatically closes files when the program.', reveals: 'close-is-optional-because-python' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building the library app, you must store: (a) 2,000 book records the librarian wants to hand-edit occasionally, and (b) cover photos. A teammate \'solves\' it by saving everything as .txt files — \'txt means text file, so everything becomes readable\' — and opens a renamed .jpg in Notepad expecting to see the image\'s description.',
            decisions: [{ prompt: 'What\'s wrong with his approach?', options: [
                { text: 'File type is decided by internal bytes, not the extension: renaming .jpg to .txt doesn\'t transcode it — Notepad shows gibberish because the content is still binary. Book records belong in a text file (CSV/JSON — human-readable and editable); cover photos must stay binary (JPEG bytes only image tools can decode).', outcome: 'Extension is a hint for the OS; encoding is the truth. Match text files to human-editable data and binary to images/media.' },
                { text: 'He\'s right — the extension defines the file type, so renaming converts the photo into a text file.', outcome: 'A name can\'t rewrite bytes; the renamed file still contains raw image data that shows as garbage in any text editor.', reveals: 'extension-determines-file-type' },
                { text: 'Store everything in one binary file — binary is more efficient so it\'s always the better choice.', outcome: 'Efficiency isn\'t the only axis: the librarian can\'t hand-edit binary records; text readability is the feature that matters for the metadata.', reveals: 'binary-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'open() doesn\'t read anything — it hands you a handle; what flows through depends on the mode you chose.',
            decisions: [{ prompt: 'What comes next? File Handling in Python · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — File Handling in Python · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_001', difficulty: 'standard',
          question: 'File handling is the process of storing data permanently on secondary storage.',
          hint: 'If stuck, revisit the concept of volatile vs. non-volatile memory from Class 9/10.',
          misconception: 'Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file is text or binary.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of file handling in programming, and name the two main categories of files based on their internal representation.', answer: 'The primary purpose of file handling is to achieve data persistence',
                  options: ['The primary purpose of file handling is to achieve data persistence', 'file handling is for printing output', 'categories are .txt and .pdf', 'file extension (e'],
                  hint: 'If stuck, revisit the concept of volatile vs. non-volatile memory from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file is text or binary.' },
                { id: 'b', prompt: 'A programmer wants to store a Python dictionary containing student records (name, roll number, list of marks) in a file so that it can be easily read by.', answer: 'Choose a text file',
                  options: ['Choose a text file', 'binary file with pickle', 'file extension (e'],
                  hint: 'If stuck, revisit the concept of volatile vs. non-volatile memory from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file is text or binary.' },
                { id: 'c', prompt: 'Compare and contrast text files and binary files in terms of (a) storage efficiency, (b) portability across systems, and (c) ease of debugging.', answer: 'storage efficiency, (',
                  options: ['storage efficiency, (', 'text files are always smaller', 'binary files are always portable', 'file extension (e'],
                  hint: 'If stuck, revisit the concept of volatile vs. non-volatile memory from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file is text or binary.' }
          ],
            remediations: { 'file-extension-e': { steps: ['To correct this, perform a live demo: 1) Create a text file with `open(\'demo.txt\', \'w\')` and write "Hello".', 'Open in Notepad — readable.', '2) Create a binary file with `open(\'demo.bin\', \'wb\')` and write `b\'\\x48\\x65\\x6c\\x6c\\x6f\'` (bytes for "Hello").', 'Open in Notepad — shows "Hello" because bytes happen to be ASCII codes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file is text or binary.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Since binary files are more storage-efficient, we should always use binary files for all data storage in Python programs.".', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'file extension (e'],
                  hint: 'If stuck, revisit the concept of volatile vs. non-volatile memory from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that file extension (e.g., .txt, .dat, .bin) determines whether a file is text or binary.' }
          ],
            remediations: { 'file-extension-e': { steps: ['To correct this, perform a live demo: 1) Create a text file with `open(\'demo.txt\', \'w\')` and write "Hello".', 'Open in Notepad — readable.', '2) Create a binary file with `open(\'demo.bin\', \'wb\')` and write `b\'\\x48\\x65\\x6c\\x6c\\x6f\'` (bytes for "Hello").', 'Open in Notepad — shows "Hello" because bytes happen to be ASCII codes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_002', difficulty: 'standard',
          question: 'The `open()` function is a built-in Python function that opens a file and.',
          hint: 'Revisit the introduction to file handling (c11_cs_cbse_09_001), focusing on the.',
          misconception: '**“`open()` reads the file content into memory.”** Many students believe that `f = open(\'file.txt\')` loads the entire.',
          parts: [
                { id: 'a', prompt: 'Write a single Python statement to open the file `data.csv` located in the subfolder `records` (relative to the current script) for reading in text mode, and.', answer: '`f = open(\'records/data.csv\', \'r\')` Steps: 1) Identify the relative path',
                  options: ['`f = open(\'records/data.csv\', \'r\')` Steps: 1) Identify the relative path', '`open()` reads the file content into memory', '`f = open(\'file'],
                  hint: 'Revisit the introduction to file handling (c11_cs_cbse_09_001), focusing on the definitions of text.',
                  misconception: '**“`open()` reads the file content into memory.”** Many students believe that `f = open(\'file.txt\')` loads the entire file into the.' },
                { id: 'b', prompt: 'If you execute `f = open(\'missing.txt\', \'r\')` and the file `missing.txt` does not exist, what happens? Why is this behaviour important to anticipate?', answer: 'Python raises a `FileNotFoundError` exception',
                  options: ['Python raises a `FileNotFoundError` exception', 'it creates an empty file', 'it returns None', '`open()` reads the file content into memory'],
                  hint: 'Revisit the introduction to file handling (c11_cs_cbse_09_001), focusing on the definitions of text.',
                  misconception: '**“`open()` reads the file content into memory.”** Many students believe that `f = open(\'file.txt\')` loads the entire file into the.' }
          ],
            remediations: { 'open-reads-the-file-content': { steps: ['**Show, don’t just tell:** In the Python shell, run `f = open(\'demo.txt\', \'w\'); f.write(\'hello\'); f.close()` then `f.', 'The output shows `f` is a `_io.TextIOWrapper`, not a string.', '**Analogy:** Compare `open()` to inserting a key into a door lock – the key (file object) lets you enter the room.', '**Practice:** Give three tiny snippets: (a) `open(\'a.txt\').read()`, (b) `f = open(\'a.txt\'); f.read()`, (c) `f.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_003', difficulty: 'standard',
          question: 'File modes in Python specify the purpose for which a file is opened.',
          hint: 'If stuck, revisit the open() function parameters (c11_cs_cbse_09_002) and the distinction.',
          misconception: 'Students often believe that \'w\' mode creates a new file only if it doesn\'t exist, but if it exists, it appends to it.',
          parts: [
                { id: 'a', prompt: 'A program opens \'data.txt\' in \'r+\' mode, reads the first line, then writes a new line.', answer: 'In \'r+\' mode, the file pointer starts at the beginning',
                  options: ['In \'r+\' mode, the file pointer starts at the beginning', 'appends to end', 'creates new file'],
                  hint: 'If stuck, revisit the open() function parameters (c11_cs_cbse_09_002) and the distinction between.',
                  misconception: 'Students often believe that \'w\' mode creates a new file only if it doesn\'t exist, but if it exists, it appends to it.' }
          ],
            remediations: { 'w-mode-creates-a-new': { steps: ['To fix this, have the student run a quick interactive experiment: create a file with some text, then open it in \'w\'.', 'Next, repeat with \'a\' mode to see the original content preserved.', 'Then explicitly state the rule: "Write mode wipes the file clean; append mode adds to the end." Have them write.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_004', difficulty: 'standard',
          question: 'The `read()`, `readline()`, and `readlines()` methods are used to extract data.',
          hint: 'Revisit `open()` function (node c11_cs_cbse_09_002) and file modes (node.',
          misconception: 'Students believe `readline()` and `readlines()` strip the newline character `\\n` automatically, like `input()` does.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `read()`, `readline()`, and `readlines()` methods are used to extract data from a',
                  options: ['The `read()`, `readline()`, and `readlines()` methods are used to extract data from a', 'File handling is the process of storing data permanently on secondary storage devices', 'The `open()` function is a built-in Python function that opens a file and returns a file', 'File modes in Python specify the purpose for'],
                  hint: 'Revisit `open()` function (node c11_cs_cbse_09_002) and file modes (node c11_cs_cbse_09_003).',
                  misconception: 'Students believe `readline()` and `readlines()` strip the newline character `\\n` automatically, like `input()` does.' }
          ],
            remediations: { 'readline-and-readlines-strip-the': { steps: ['Have the student create a file `test.txt` with two lines: `ab\\ncd\\n`.', 'Run `print(repr(f.read()))` to show `ab\\ncd\\n` — the `\\n` is visible in `repr`.', 'Run `print(repr(f.readline()))` to show `ab\\n`.', 'Run `print(repr(f.readlines()))` to show `[\'ab\\n\', \'cd\\n\']`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_005', difficulty: 'standard',
          question: 'The `write()` method writes a single string to an open text file and returns.',
          hint: 'Revisit node `c11_cs_cbse_09_003` (File Modes) and practice opening files in different.',
          misconception: 'Students believe `write()` automatically appends a newline (like `print()`) and that `writelines()` inserts a newline.',
          parts: [
                { id: 'a', prompt: 'What is the return value of `file.write(\'Hello\')` when the file is opened in text mode?', answer: 'The method returns the number of characters written',
                  options: ['The method returns the number of characters written', 'symmetry', '`write()` returns a success boolean'],
                  hint: 'Revisit node `c11_cs_cbse_09_003` (File Modes) and practice opening files in different modes.',
                  misconception: 'Students believe `write()` automatically appends a newline (like `print()`) and that `writelines()` inserts a newline between each list.' },
                { id: 'b', prompt: 'Write a Python statement that opens `data.txt` in append mode and writes the string `\'New entry\\n\'` using `write()`.', answer: '`with open(\'data.txt\', \'a\') as f: f.write(\'New entry\\n\')`',
                  options: ['`with open(\'data.txt\', \'a\') as f: f.write(\'New entry\\n\')`', 'symmetry'],
                  hint: 'Revisit node `c11_cs_cbse_09_003` (File Modes) and practice opening files in different modes.',
                  misconception: 'Students believe `write()` automatically appends a newline (like `print()`) and that `writelines()` inserts a newline between each list.' },
                { id: 'c', prompt: 'Compare the effect of `f.write(\'abc\')` and `f.writelines([\'a\', \'b\', \'c\'])` on the file content and file pointer position.', answer: 'Both result in the file containing `abc` and the file pointer at position 3',
                  options: ['Both result in the file containing `abc` and the file pointer at position 3', 'symmetry'],
                  hint: 'Revisit node `c11_cs_cbse_09_003` (File Modes) and practice opening files in different modes.',
                  misconception: 'Students believe `write()` automatically appends a newline (like `print()`) and that `writelines()` inserts a newline between each list.' }
          ],
            remediations: { 'write-automatically-appends-a-newline': { steps: ['Show the student the raw file content using a hex viewer or `cat -A` to make invisible characters visible.', 'Have them write a list with `writelines()` and then read the file with `read()` to see the concatenated result.', 'Ask them to modify the list by adding `\'\\n\'` to each element and observe the change.', 'Finally, contrast with `print(..., file=f)` which does add newlines automatically.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_006', difficulty: 'standard',
          question: 'The `close()` method terminates the association between a Python file object.',
          hint: 'If stuck, revisit `c11_cs_cbse_09_002` (Opening a File Using open() Function) and.',
          misconception: 'Students believe `close()` is optional because "Python automatically closes files when the program ends" or "the.',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax to close a file object named `f` in Python, and what happens to unwritten data in the buffer when this method executes?', answer: 'The syntax is `f.close()`',
                  options: ['The syntax is `f.close()`', 'it just closes the file', 'data is saved automatically', 'Python automatically closes files when the program ends'],
                  hint: 'If stuck, revisit `c11_cs_cbse_09_002` (Opening a File Using open() Function) and.',
                  misconception: 'Students believe `close()` is optional because "Python automatically closes files when the program ends" or "the garbage collector handles.' }
          ],
            remediations: { 'close-is-optional-because-python': { steps: ['Show a live demo: Run a loop `for i in range(2000): open("tmp.txt","w").write("x")` — it crashes with `OSError: [Errno.', 'Use `lsof -p <pid>` (Linux) or Resource Monitor (Windows) to visualize leaked file descriptors before/after `close()`.', 'Create a `flush_demo.py`: write to file without close, kill process with `Ctrl+C`, show file is empty; repeat with.', 'Have student rewrite 3 buggy snippets by adding `try-finally-close` pattern.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
