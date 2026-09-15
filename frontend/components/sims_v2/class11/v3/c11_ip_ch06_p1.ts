import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch06_p1: SimDef = {
    id: 'v3_c11_ip_ch06_p1',
    title: 'File Handling · Part 1/2',
    subtitle: 'Learn the open-work-close rhythm — and what the buffer hides from you.',
    classLevel: 11, subject: 'informatics_practices', topic: 'File Handling · Part 1/2',
    chapters: ['c11_ip_ch06'],
    nodeIds: ['c11_ip_cbse_06_001', 'c11_ip_cbse_06_002', 'c11_ip_cbse_06_003', 'c11_ip_cbse_06_004', 'c11_ip_cbse_06_005', 'c11_ip_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer making exam marks survive a restart', intro: 'Variables die when the program exits — only a file on disk remembers tomorrow. Open it, do the work, close it.', goal: 'Choose text vs binary files correctly and explain open/close and buffering.' },
    discovery: {
        question: 'A program opens a file, writes data, then crashes before `close()` — is the data safely on disk?',
        options: ['Not guaranteed — Python buffers output, and only close() (or flush()) forces the buffer to disk', 'Yes — the OS saves everything automatically', 'Yes — write() always hits the disk instantly', 'No — the file is always left empty'],
        answer: 'Not guaranteed — Python buffers output, and only close() (or flush()) forces the buffer to disk',
        hook: 'And open() doesn\'t read anything — it hands you a handle; the data only moves when you explicitly read or write.',
    },
    teaching: [
        { title: 'Introduction to File Handling and File Types in Python', text: 'File handling is the process of storing data permanently on secondary storage devices (like hard disks) using files, and retrieving or modifying that data through programmatic operations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split report-card data into CSV text and scanned signatures into binary, then defend why \'always use binary mode\' is bad advice for text.',
        labels: ['Introduction to File Handling', 'Opening and Closing', 'File Access Modes: Read,', 'Reading a Text File', 'Writing to a Text', 'Using the with Statement'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_001', title: 'Introduction to File Handling and File Types in Python',
          caseStudy: { intro: 'Imagine you wrote a Python program to manage student marks for your Class 11 practical exam.',
            decisions: [{ prompt: 'What is the fundamental difference between a text file and a binary file in terms of how data is stored and read by humans?', options: [
                { text: 'A text file stores data as encoded characters (e.g., UTF-8) that humans can read directly', outcome: 'A text file stores data as encoded characters (e.g., UTF-8) that humans can read directly when.' },
                { text: 'text files are smaller', outcome: 'Not quite — Students often believe that **"file handling is only about reading/writing `.txt` files"** because.', reveals: 'file-handling-is-only-about' },
                { text: 'binary files are only for images', outcome: 'Not quite — Students often believe that **"file handling is only about reading/writing `.txt` files"** because.', reveals: 'file-handling-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_002', title: 'Opening and Closing a File Using open() and close()',
          caseStudy: { intro: 'Imagine you want to save your daily expenses in a text file named `expenses.txt` so you can analyse them later.',
            decisions: [{ prompt: 'What are the two mandatory arguments for the `open()` function when opening a text file in Python, and what does the function return?', options: [
                { text: 'The two mandatory arguments are the file path (string) and the mode (string such as \'r\',', outcome: 'The two mandatory arguments are the file path (string) and the mode (string such as \'r\', \'w\', \'a\').' },
                { text: 'only the file name is needed, or that it returns the file content', outcome: 'Not quite — Students often think that `open()` reads the file content into memory, so they try to print the.', reveals: 'open-reads-the-file-content' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_003', title: 'File Access Modes: Read, Write and Append Modes',
          caseStudy: { intro: 'Imagine you are building a digital diary application where users can write new entries, read past entries, and add to yesterday\'s entry without erasing it.',
            decisions: [{ prompt: 'What is the exact difference between opening a file in \'w\' mode versus \'a\' mode when the file already exists and contains data?', options: [
                { text: '\'w\' mode truncates the file to zero length immediately upon opening, destroying all', outcome: '\'w\' mode truncates the file to zero length immediately upon opening, destroying all existing.' },
                { text: 'writes to a file', outcome: 'Not quite — Students believe that \'w\' mode "writes to a file" and \'a\' mode "appends to a file", so they think.', reveals: 'w-mode-writes-to-a' },
                { text: 'appends to a file', outcome: 'Not quite — Students believe that \'w\' mode "writes to a file" and \'a\' mode "appends to a file", so they think.', reveals: 'w-mode-writes-to-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_004', title: 'Reading a Text File: read(), readline() and readlines()',
          caseStudy: { intro: 'Imagine you have a marksheet file `marks.txt` where each line contains a student\'s roll number and marks separated by a comma.',
            decisions: [{ prompt: 'What is the return type of `file_object.read()` when the file pointer is at the end of a non-empty text file?', options: [
                { text: 'The return type is `str` (an empty string `\'\'`)', outcome: 'The return type is `str` (an empty string `\'\'`). A wrong answer like `None` or `[]` reveals the.' },
                { text: '`read` returns `None` like some other languages', outcome: 'Not quite — Students believe `readline()` returns a line *without* the newline character (`\\n`), because.', reveals: 'readline-returns-a-line-without' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_005', title: 'Writing to a Text File: write() and writelines()',
          caseStudy: { intro: 'Imagine you are building a simple contact manager for your phone.',
            decisions: [{ prompt: 'What is the return value of the `write()` method when it successfully writes a string to a text file?', options: [
                { text: 'The `write()` method returns an integer representing the number of characters written to', outcome: 'The `write()` method returns an integer representing the number of characters written to the file.' },
                { text: 'returns None', outcome: 'Not quite — Students believe `writelines()` automatically adds a newline character after each string in the.', reveals: 'writelines-automatically-adds-a-newline' },
                { text: 'returns True/False', outcome: 'Not quite — Students believe `writelines()` automatically adds a newline character after each string in the.', reveals: 'writelines-automatically-adds-a-newline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_006', title: 'Using the with Statement for Automatic File Handling',
          caseStudy: { intro: 'Imagine you\'re writing a program to save student marks to a file, but halfway through writing, a power cut occurs or your code hits a division-by-zero error.',
            decisions: [{ prompt: 'What is the exact syntax to open a file named \'data.txt\' in read mode using the `with` statement, and what happens to the file object after.', options: [
                { text: 'The syntax is `with open(\'data.txt\', \'r\') as f:` followed by indented operations', outcome: 'The syntax is `with open(\'data.txt\', \'r\') as f:` followed by indented operations.' },
                { text: 'the file stays open until explicitly closed', outcome: 'Not quite — Students believe `with` only saves typing `close()` and that `f.close()` is still needed at the end.', reveals: 'with-only-saves-typing-close' },
                { text: '`with` only saves typing `close()` and that `f', outcome: 'Not quite — Students believe `with` only saves typing `close()` and that `f.close()` is still needed at the end.', reveals: 'with-only-saves-typing-close' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s marks-manager program loses all 50 students\' data on exit. He also tries `open(\'data.dat\')`, `print(file)` to see contents, and writes image bytes with `file.write(\'...\')` in text mode — \'files are just .txt things, and close() is optional since programs close files anyway.\'',
            decisions: [{ prompt: 'Which file-handling facts fix his program?', options: [
                { text: 'Rebuild the pipeline: variables live in RAM — files persist on disk via the open → work → close rhythm. `open()` returns a handle, not the contents — you must read()/write() explicitly. Binary files are raw bytes (images, .dat, pickle) needing \'rb\'/\'wb\' — text mode corrupts them. And close() flushes the buffer; relying on program-end risks losing everything you wrote.', outcome: 'The data survives restarts: right mode for the data\'s nature, explicit reads, and close() as the non-negotiable commit.' },
                { text: 'Keep everything in text mode — all files are readable text if you open them right.', outcome: 'Every file is bytes; text mode is a convenience layer that decodes — forcing it on binary data mangles content or throws decode errors.', reveals: 'all-files-are-text' },
                { text: 'Skip close() — Python tidies up when the program ends, that\'s automatic.', outcome: 'Buffering means unflushed writes may never reach disk; \'automatic\' closure is exactly how his data vanished.', reveals: 'close-is-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every file is bytes underneath; text mode\'s gift is encoding and newline translation you don\'t have to manage yourself.',
            decisions: [{ prompt: 'What comes next? File Handling · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — File Handling · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_001', difficulty: 'standard',
          question: 'File handling is the process of storing data permanently on secondary storage.',
          hint: 'If stuck, revisit the concept of **primary vs secondary memory** from Class 9/10 Computer.',
          misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use.',
          parts: [
                { id: 'a', prompt: 'A student writes a Python program that stores a list of 100 integers in a variable `marks = [95, 87, 78, ...]`. They run the program, then close it.', answer: 'Variables like `marks` reside in RAM (volatile memory)',
                  options: ['Variables like `marks` reside in RAM (volatile memory)', 'Python doesn\'t save variables automatically', 'file handling is only about reading/writing `.txt` files', '**"file handling is only about reading/writing `'],
                  hint: 'If stuck, revisit the concept of **primary vs secondary memory** from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use text files.' },
                { id: 'b', prompt: 'Your school wants to store the annual report card data for 500 students.', answer: 'Use a **text file (e.g., CSV)** for Name, Roll No, and Marks',
                  options: ['Use a **text file (e.g., CSV)** for Name, Roll No, and Marks', 'store everything in one binary file', 'save images as text using base64 in CSV', 'file handling is only about reading/writing `.txt` files'],
                  hint: 'If stuck, revisit the concept of **primary vs secondary memory** from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use text files.' },
                { id: 'c', prompt: 'Compare and contrast: Why can you open a `.py` Python script in Notepad and read it, but opening a `.exe` compiled program in Notepad shows garbage characters?', answer: 'A `.py` file is a **text file**',
                  options: ['A `.py` file is a **text file**', '.exe is encrypted', '.py is smaller', 'file handling is only about reading/writing `.txt` files'],
                  hint: 'If stuck, revisit the concept of **primary vs secondary memory** from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use text files.' }
          ],
            remediations: { 'file-handling-is-only-about': { steps: ['If a student confuses text vs binary: 1.', '**Show the bytes**: Use `open(\'image.jpg\', \'rb\').read(20)` and `open(\'notes.txt\', \'rb\').read(20)` in a Python shell.', '**Demonstrate corruption**: Write a string to a file in `\'wb\'` mode *without* `.encode()`, then try reading in `\'r\'`.', 'Then write an image in `\'w\'` mode — show the saved file is corrupted (won\'t open in image viewer).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since binary files can store *any* data (text, images, numbers), we should always use binary mode (`\'wb\'`, `\'rb\'`) in Python and never text.', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'file handling is only about reading/writing `.txt` files', '**"file handling is only about reading/writing `'],
                  hint: 'If stuck, revisit the concept of **primary vs secondary memory** from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use text files.' },
                { id: 'b', prompt: 'Design a real-world scenario (Indian context) where a school management system must use **both** text and binary files together.', answer: '**Scenario:** A CBSE school stores student records in `students.csv` (text)',
                  options: ['**Scenario:** A CBSE school stores student records in `students.csv` (text)', 'file handling is only about reading/writing `.txt` files', '**"file handling is only about reading/writing `'],
                  hint: 'If stuck, revisit the concept of **primary vs secondary memory** from Class 9/10 Computer Science.',
                  misconception: 'Students often believe that **"file handling is only about reading/writing `.txt` files"** because early examples use text files.' }
          ],
            remediations: { 'file-handling-is-only-about': { steps: ['If a student confuses text vs binary: 1.', '**Show the bytes**: Use `open(\'image.jpg\', \'rb\').read(20)` and `open(\'notes.txt\', \'rb\').read(20)` in a Python shell.', '**Demonstrate corruption**: Write a string to a file in `\'wb\'` mode *without* `.encode()`, then try reading in `\'r\'`.', 'Then write an image in `\'w\'` mode — show the saved file is corrupted (won\'t open in image viewer).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_002', difficulty: 'standard',
          question: 'The `open()` function in Python creates a file object that links a program to.',
          hint: 'Revisit the definition of a file, file types (text vs binary), and the concept of a file.',
          misconception: 'Students often think that `open()` reads the file content into memory, so they try to print the file object directly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `open()` function in Python creates a file object that links a program to a specific',
                  options: ['The `open()` function in Python creates a file object that links a program to a specific', 'File handling is the process of storing data permanently on secondary storage devices', 'File access modes in Python specify the operations permitted on a file (reading, writing,', 'The `read()`, `readline()`, and `readlines()` are methods of a file object opened in text'],
                  hint: 'Revisit the definition of a file, file types (text vs binary), and the concept of a file object.',
                  misconception: 'Students often think that `open()` reads the file content into memory, so they try to print the file object directly.' }
          ],
            remediations: { 'open-reads-the-file-content': { steps: ['Show the student the output of `print(open(\'test.txt\', \'r\'))` and ask what they see—emphasise it\'s a wrapper, not.', 'Demonstrate a program that writes without `close()` and then crashes (e.g., `raise Exception`), then check the file—it.', 'Have them rewrite the code with `try/finally` and verify the data persists.', 'Reinforce: "Open returns a tool, not the treasure; close saves the treasure."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_003', difficulty: 'standard',
          question: 'File access modes in Python specify the operations permitted on a file.',
          hint: 'Review c11_ip_cbse_06_002: practice writing `open()` with different placeholder modes.',
          misconception: 'Students believe that \'w\' mode "writes to a file" and \'a\' mode "appends to a file", so they think the only difference.',
          parts: [
                { id: 'a', prompt: 'A student writes `f = open(\'data.txt\', \'r+\')` intending to read the file first and then write new data at the end. The file exists and contains "Hello".', answer: 'After `f.read()`, the file pointer is at the end of the file (position 5)',
                  options: ['After `f.read()`, the file pointer is at the end of the file (position 5)', 'writes to a file', 'appends to a file', 'the only difference is where new data goes'],
                  hint: 'Review c11_ip_cbse_06_002: practice writing `open()` with different placeholder modes until syntax.',
                  misconception: 'Students believe that \'w\' mode "writes to a file" and \'a\' mode "appends to a file", so they think the only difference is where new data.' },
                { id: 'b', prompt: 'Write a Python code snippet that safely opens \'config.ini\' for reading, but if the file does not exist, creates it with default content "debug=false" without.', answer: '```python try: f = open(\'config.ini\', \'r\') except FileNotFoundError: f =',
                  options: ['```python try: f = open(\'config.ini\', \'r\') except FileNotFoundError: f =', 'writes to a file', 'appends to a file', 'the only difference is where new data goes'],
                  hint: 'Review c11_ip_cbse_06_002: practice writing `open()` with different placeholder modes until syntax.',
                  misconception: 'Students believe that \'w\' mode "writes to a file" and \'a\' mode "appends to a file", so they think the only difference is where new data.' },
                { id: 'c', prompt: 'Compare the behaviors of \'w+\', \'r+\', and \'a+\' modes across these three dimensions: (1) File creation if missing, (2) Truncation of existing content, (3).', answer: '| Mode | Creates if missing?',
                  options: ['| Mode | Creates if missing?', 'writes to a file', 'appends to a file', '\'r+\' creates file or \'a+\' starts at 0'],
                  hint: 'Review c11_ip_cbse_06_002: practice writing `open()` with different placeholder modes until syntax.',
                  misconception: 'Students believe that \'w\' mode "writes to a file" and \'a\' mode "appends to a file", so they think the only difference is where new data.' }
          ],
            remediations: { 'w-mode-writes-to-a': { steps: ['Have the student trace a timeline: "At the exact moment `open(\'file.txt\', \'w\')` executes, what is the file size?', 'Before any `write()` call." 2.', 'Use a physical analogy: \'w\' = shred the document and get a blank paper; \'a\' = get the document and turn to the last.', 'Show a live demo in Python shell: create a file with content, open in \'w\', check size with `os.path.getsize()` before.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_004', difficulty: 'standard',
          question: 'The `read()`, `readline()`, and `readlines()` are methods of a file object.',
          hint: 'Revisit `open()` modes and the fact that `\'r\'` raises `FileNotFoundError` if file doesn\'t.',
          misconception: 'Students believe `readline()` returns a line *without* the newline character (`\\n`), because `print()` hides it.',
          parts: [
                { id: 'a', prompt: 'What is the return type of `file_object.read()` when the file pointer is at the end of a non-empty text file?', answer: 'The return type is `str` (an empty string `\'\'`)',
                  options: ['The return type is `str` (an empty string `\'\'`)', '`read` returns `None` like some other languages'],
                  hint: 'Revisit `open()` modes and the fact that `\'r\'` raises `FileNotFoundError` if file doesn\'t exist.',
                  misconception: 'Students believe `readline()` returns a line *without* the newline character (`\\n`), because `print()` hides it.' }
          ],
            remediations: { 'readline-returns-a-line-without': { steps: ['Show the raw representation: `repr(f.readline())` to make `\\n` visible.', 'Demonstrate with a 3-line file: print `readline()` output with `repr`, then `readlines()` output with `repr`.', 'Have student write a loop that prints each line with `print(repr(line))` to see the newline.', 'Practice: given a file, predict the exact list returned by `readlines()` including `\\n` positions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_005', difficulty: 'standard',
          question: 'Writing to a text file in Python is performed using the `write()` method.',
          hint: 'Revisit node c11_ip_cbse_06_003 (File Access Modes) and practice opening/closing files.',
          misconception: 'Students believe `writelines()` automatically adds a newline character after each string in the list, similar to how.',
          parts: [
                { id: 'a', prompt: 'Compare the behavior of `write()` and `writelines()` when given a list of strings. Why does `write()` raise a TypeError while `writelines()` succeeds?', answer: '`write()` accepts only a single string argument',
                  options: ['`write()` accepts only a single string argument', '`write()` can take a list confuses it with `writelines()` or `print(*list)`'],
                  hint: 'Revisit node c11_ip_cbse_06_003 (File Access Modes) and practice opening/closing files in \'w\' mode.',
                  misconception: 'Students believe `writelines()` automatically adds a newline character after each string in the list, similar to how `print()` adds.' }
          ],
            remediations: { 'writelines-automatically-adds-a-newline': { steps: ['Show the student the exact output of `f.writelines([\'A\', \'B\'])` → file contains `AB`.', 'Ask: "Where is the newline?', 'Demonstrate the fix: `f.writelines([\'A\\n\', \'B\\n\'])` → file contains `A\\nB\\n`.', 'Have them articulate the rule: "writelines writes strings exactly as given; I must put `\\n` inside each string." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_06_006', difficulty: 'standard',
          question: 'The `with` statement in Python is a context manager that automatically handles.',
          hint: 'Review c11_ip_cbse_06_002 (Opening and Closing Files) and trace through a try-except.',
          misconception: 'Students believe `with` only saves typing `close()` and that `f.close()` is still needed at the end of the block.',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax to open a file named \'data.txt\' in read mode using the `with` statement, and what happens to the file object after the indented block.', answer: 'The syntax is `with open(\'data.txt\', \'r\') as f:` followed by indented operations',
                  options: ['The syntax is `with open(\'data.txt\', \'r\') as f:` followed by indented operations', 'the file stays open until explicitly closed', '`with` only saves typing `close()` and that `f'],
                  hint: 'Review c11_ip_cbse_06_002 (Opening and Closing Files) and trace through a try-except block where.',
                  misconception: 'Students believe `with` only saves typing `close()` and that `f.close()` is still needed at the end of the block.' },
                { id: 'b', prompt: 'Compare the memory and resource implications of these two approaches for processing a 500MB log file: Approach A: `with open(\'huge.log\') as f: data = f.read()`.', answer: 'Approach B is better',
                  options: ['Approach B is better', 'because `with` makes it safe', '`with` only saves typing `close()` and that `f'],
                  hint: 'Review c11_ip_cbse_06_002 (Opening and Closing Files) and trace through a try-except block where.',
                  misconception: 'Students believe `with` only saves typing `close()` and that `f.close()` is still needed at the end of the block.' }
          ],
            remediations: { 'with-only-saves-typing-close': { steps: ['Show the bytecode - use `dis.dis()` to demonstrate `WITH_CLEANUP_START`/`WITH_CLEANUP_FINISH` opcodes that implement.', 'Create a failing example: `class BadFile: def __enter__(self): return self; def __exit__(self, *a): print(\'exit\'); def.', 'Have student trace execution flow on paper: `__enter__` -> block -> exception -> `__exit__` -> propagate exception.', 'Assign conversion exercise: rewrite 5 traditional open/close snippets to `with`, then deliberately add redundant.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
