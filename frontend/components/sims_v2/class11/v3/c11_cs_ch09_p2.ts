import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch09_p2: SimDef = {
    id: 'v3_c11_cs_ch09_p2',
    title: 'File Handling in Python · Part 2/2',
    subtitle: 'Persist data beyond the program — and never trust an extension to tell you a file\'s type.',
    classLevel: 11, subject: 'computer_science', topic: 'File Handling in Python · Part 2/2',
    chapters: ['c11_cs_ch09'],
    nodeIds: ['c11_cs_cbse_09_007', 'c11_cs_cbse_09_008', 'c11_cs_cbse_09_009', 'c11_cs_cbse_09_010', 'c11_cs_cbse_09_011', 'c11_cs_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer building a contact-saver app', intro: 'Marks for 500 students vanish when the program exits. Files are how data outlives the run.', goal: 'Distinguish text from binary files and use open() with the correct mode and path.' },
    discovery: {
        question: 'Rename photo.jpg to photo.txt and open it in Notepad — gibberish. Did the file become a text file?',
        options: ['No — the internal byte structure defines the type; the extension is only a hint', 'Yes — the .txt extension converts the contents automatically', 'Yes — but only after Notepad finishes reading it', 'No — because .jpg files cannot be renamed'],
        answer: 'No — the internal byte structure defines the type; the extension is only a hint',
        hook: 'An extension is a label on the box, not a conversion of what\'s inside — bytes decide the file type.',
    },
    teaching: [
        { title: 'Using with Statement for File Handling', text: 'The `with` statement in Python is a context manager that automatically handles resource acquisition and release for file operations, ensuring the file is properly closed even if an exception occurs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Open records/data.csv for reading, pick the right mode to write a JPEG without corruption, and choose a human-readable format for student records.',
        labels: ['Using with Statement', 'File Pointer and seek/tell', 'Appending Data to', 'Reading and Writing Binary', 'File Handling Errors', 'Practical File Operations: Copy,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_007', title: 'Using with Statement for File Handling',
          caseStudy: { intro: 'Imagine you\'re writing a program to save student marks to a file.',
            decisions: [{ prompt: 'What is the exact syntax for opening a file named "data.txt" in read mode using the `with` statement, and what happens to the file object.', options: [
                { text: 'Correct answer: `with open("data.txt", "r") as f:`', outcome: 'Correct answer: `with open("data.txt", "r") as f:` — the file object `f` is automatically closed.' },
                { text: 'the file stays open until `f.close()` is called', outcome: 'Not quite — Students believe the `with` statement is merely a shortcut for `try...finally` and that the file.', reveals: 'the-with-statement-is-merely' },
                { text: 'the `with` statement is merely a shortcut for `try', outcome: 'Not quite — Students believe the `with` statement is merely a shortcut for `try...finally` and that the file.', reveals: 'the-with-statement-is-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_008', title: 'File Pointer and seek/tell Methods',
          caseStudy: { intro: 'Imagine you have a 500-page diary (a large log file) and you need to read only the entry from last Tuesday — you don\'t want to flip through every page from the.',
            decisions: [{ prompt: 'What is the return value of `f.tell()` immediately after executing `f = open(\'data.txt\', \'r\'); f.read(10)` assuming the file contains.', options: [
                { text: 'The return value is 10 (or possibly more if newline translation occurs in text mode on', outcome: 'The return value is 10 (or possibly more if newline translation occurs in text mode on Windows).' },
                { text: 'depends on encoding', outcome: 'Not quite — Students believe `seek()` works identically in text and binary modes because "the file pointer.', reveals: 'seek-works-identically-in-text' },
                { text: 'the file pointer is just a position number', outcome: 'Not quite — Students believe `seek()` works identically in text and binary modes because "the file pointer.', reveals: 'seek-works-identically-in-text' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_009', title: 'Appending Data to an Existing File',
          caseStudy: { intro: 'Imagine you are maintaining a daily expense log in a file `expenses.txt`. Each day you want to add new expenses **without deleting previous entries**.',
            decisions: [{ prompt: 'What is the exact file mode string to open a text file for appending only (not reading), and where is the file pointer positioned.', options: [
                { text: 'The mode string is `\'a\'`', outcome: 'The mode string is `\'a\'`. The file pointer is positioned at the **end of the file (EOF)**.' },
                { text: 'opening a file in `\'a\'` mode and then calling `f', outcome: 'Not quite — Students believe that opening a file in `\'a\'` mode and then calling `f.seek(0)` allows them to read.', reveals: 'opening-a-file-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_010', title: 'Reading and Writing Binary Files',
          caseStudy: { intro: 'Imagine you are building a simple game where you need to save the player\'s high score, inventory items, and current level progress to a file so the game can.',
            decisions: [{ prompt: 'What is the primary difference between opening a file in `\'w\'` mode versus `\'wb\'` mode in Python, and what data type does the `write()`.', options: [
                { text: 'In `\'w\'` (text) mode, the file is opened for writing text strings with automatic encoding', outcome: 'In `\'w\'` (text) mode, the file is opened for writing text strings with automatic encoding (default.' },
                { text: 'both accept strings', outcome: 'Not quite — Students often believe that binary files are "just text files with a .bin extension" and try.', reveals: 'binary-files-are-just-text' },
                { text: 'just text files with a .bin extension', outcome: 'Not quite — Students often believe that binary files are "just text files with a .bin extension" and try.', reveals: 'binary-files-are-just-text' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_011', title: 'File Handling Errors and Exception Handling',
          caseStudy: { intro: 'Imagine you are writing a program to read a student\'s marks from a file "marks.txt" to calculate the average.',
            decisions: [{ prompt: 'What is the base class for all file-related exceptions in Python, and which specific exception is raised when trying to open a non-existent.', options: [
                { text: 'The base class for all file-related exceptions is OSError (or IOError in Python 2, but in', outcome: 'The base class for all file-related exceptions is OSError (or IOError in Python 2, but in Python 3.' },
                { text: 'Exception', outcome: 'Not quite — Students often think that using `try-except` around `open()` is enough, and they forget that the.', reveals: 'using-try-except-around-open' },
                { text: 'indicates the student doesn\'t know the exception hierarchy', outcome: 'Not quite — Students often think that using `try-except` around `open()` is enough, and they forget that the.', reveals: 'using-try-except-around-open' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_012', title: 'Practical File Operations: Copy, Merge, Count Words',
          caseStudy: { intro: 'Imagine you have three chapter-wise notes files (`ch1.txt`, `ch2.txt`, `ch3.txt`) and need to create a single combined study guide `full_notes.txt` for exam.',
            decisions: [{ prompt: 'What is the correct file mode to open a destination file when you want to copy content into it, ensuring any existing content is completely.', options: [
                { text: 'The correct mode is `\'w\'` (write mode)', outcome: 'The correct mode is `\'w\'` (write mode). It truncates the file to zero length if it exists,.' },
                { text: 'merging files simply means `dst', outcome: 'Not quite — Students believe that merging files simply means `dst.write(src1.read() + src2.read())` and that.', reveals: 'merging-files-simply-means-dst' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building the library app, you must store: (a) 2,000 book records the librarian wants to hand-edit occasionally, and (b) cover photos. A teammate \'solves\' it by saving everything as .txt files — \'txt means text file, so everything becomes readable\' — and opens a renamed .jpg in Notepad expecting to see the image\'s description.',
            decisions: [{ prompt: 'What\'s wrong with his approach?', options: [
                { text: 'File type is decided by internal bytes, not the extension: renaming .jpg to .txt doesn\'t transcode it — Notepad shows gibberish because the content is still binary. Book records belong in a text file (CSV/JSON — human-readable and editable); cover photos must stay binary (JPEG bytes only image tools can decode).', outcome: 'Extension is a hint for the OS; encoding is the truth. Match text files to human-editable data and binary to images/media.' },
                { text: 'He\'s right — the extension defines the file type, so renaming converts the photo into a text file.', outcome: 'A name can\'t rewrite bytes; the renamed file still contains raw image data that shows as garbage in any text editor.', reveals: 'extension-determines-file-type' },
                { text: 'Store everything in one binary file — binary is more efficient so it\'s always the better choice.', outcome: 'Efficiency isn\'t the only axis: the librarian can\'t hand-edit binary records; text readability is the feature that matters for the metadata.', reveals: 'binary-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'open() doesn\'t read anything — it hands you a handle; what flows through depends on the mode you chose.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_007', difficulty: 'standard',
          question: 'The `with` statement in Python is a context manager that automatically handles.',
          hint: 'Revisit node c11_cs_cbse_09_006 (Closing a File Using close() Method) and practise the.',
          misconception: 'Students believe the `with` statement is merely a shortcut for `try...finally` and that the file object `f` remains.',
          parts: [
                { id: 'a', prompt: 'What is the exact syntax for opening a file named "data.txt" in read mode using the `with` statement, and what happens to the file object after the indented.', answer: 'Correct answer: `with open("data.txt", "r") as f:`',
                  options: ['Correct answer: `with open("data.txt", "r") as f:`', 'the file stays open until `f.close()` is called', 'the `with` statement is merely a shortcut for `try'],
                  hint: 'Revisit node c11_cs_cbse_09_006 (Closing a File Using close() Method) and practise the.',
                  misconception: 'Students believe the `with` statement is merely a shortcut for `try...finally` and that the file object `f` remains accessible after the.' },
                { id: 'b', prompt: 'A student writes: `with open("log.txt", "w") as log: log.write("Start")` and then later tries `log.write("End")` outside the `with` block.', answer: 'Correct answer: `ValueError: I/O operation on closed file.` The file is closed',
                  options: ['Correct answer: `ValueError: I/O operation on closed file.` The file is closed', 'it works fine', 'AttributeError', 'the `with` statement is merely a shortcut for `try'],
                  hint: 'Revisit node c11_cs_cbse_09_006 (Closing a File Using close() Method) and practise the.',
                  misconception: 'Students believe the `with` statement is merely a shortcut for `try...finally` and that the file object `f` remains accessible after the.' },
                { id: 'c', prompt: 'Compare the behaviour of these two snippets when `write()` raises an `OSError` (disk full). Which snippet leaves the file handle open? ```python', answer: 'Snippet A leaves the file handle open',
                  options: ['Snippet A leaves the file handle open', 'both close the file', 'both leak', 'the `with` statement is merely a shortcut for `try'],
                  hint: 'Revisit node c11_cs_cbse_09_006 (Closing a File Using close() Method) and practise the.',
                  misconception: 'Students believe the `with` statement is merely a shortcut for `try...finally` and that the file object `f` remains accessible after the.' }
          ],
            remediations: { 'the-with-statement-is-merely': { steps: ['Show the student the exact bytecode difference: `with` generates `SETUP_WITH` / `WITH_CLEANUP_START` opcodes that.', 'Run a live demo: insert `raise Exception` inside the block, prove the file closes by checking `f.closed` inside.', 'Have them rewrite three previous `open`/`close` programs using `with` and verify with `f.closed` prints.', 'Emphasise: "The variable lives on, the resource doesn\'t."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the `with` statement is merely a shortcut for `try...finally` and that the file object `f` remains.',
          parts: [
                { id: 'a', prompt: 'A programmer argues: "Using `with` is slower because it adds overhead of calling `__enter__` and `__exit__`." Evaluate this claim for a typical Class 11.', answer: 'The claim is false in practice',
                  options: ['The claim is false in practice', 'the `with` statement is merely a shortcut for `try'],
                  hint: 'Revisit node c11_cs_cbse_09_006 (Closing a File Using close() Method) and practise the.',
                  misconception: 'Students believe the `with` statement is merely a shortcut for `try...finally` and that the file object `f` remains accessible after the.' }
          ],
            remediations: { 'the-with-statement-is-merely': { steps: ['Show the student the exact bytecode difference: `with` generates `SETUP_WITH` / `WITH_CLEANUP_START` opcodes that.', 'Run a live demo: insert `raise Exception` inside the block, prove the file closes by checking `f.closed` inside.', 'Have them rewrite three previous `open`/`close` programs using `with` and verify with `f.closed` prints.', 'Emphasise: "The variable lives on, the resource doesn\'t."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_008', difficulty: 'standard',
          question: 'A file pointer is an internal marker maintained by Python that tracks the.',
          hint: 'Revisit c11_cs_cbse_09_003 (File Modes) and c11_cs_cbse_09_004 (Reading) to clarify the.',
          misconception: 'Students believe `seek()` works identically in text and binary modes because "the file pointer is just a position.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the effect of `f.seek(-10, 2)` on a file opened as `\'rb\'` versus `\'r\'` when the file ends with a Windows-style `\\r\\n` newline sequence.', answer: 'In `\'rb\'`: pointer moves 10 bytes before the physical end of file',
                  options: ['In `\'rb\'`: pointer moves 10 bytes before the physical end of file', 'the file pointer is just a position number'],
                  hint: 'Revisit c11_cs_cbse_09_003 (File Modes) and c11_cs_cbse_09_004 (Reading) to clarify the text.',
                  misconception: 'Students believe `seek()` works identically in text and binary modes because "the file pointer is just a position number." They write.' }
          ],
            remediations: { 'seek-works-identically-in-text': { steps: ['Have the student create a 3-line text file with mixed ASCII and emoji (e.g., "A\\nB😀\\nC"), open it in `\'rb\'` and `\'r\'`.', 'Demonstrate `f.seek(5, 1)` failing in text mode with `UnsupportedOperation`.', 'Force them to articulate the rule: **"In text mode, seek only accepts (0, 0) or a value from tell(); in binary mode.', 'Assign a micro-task: write a function that reads the *middle* line of a file using only binary `seek`/`read` and manual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_009', difficulty: 'standard',
          question: 'Appending data to an existing file means opening the file in **append mode (\'a\'.',
          hint: 'Revisit c11_cs_cbse_09_003 (File Modes) and write a 5-row comparison table for all 6.',
          misconception: 'Students believe that opening a file in `\'a\'` mode and then calling `f.seek(0)` allows them to read or overwrite from.',
          parts: [
                { id: 'a', prompt: 'What is the exact file mode string to open a text file for appending only (not reading), and where is the file pointer positioned immediately after opening?', answer: 'The mode string is `\'a\'`',
                  options: ['The mode string is `\'a\'`', 'opening a file in `\'a\'` mode and then calling `f'],
                  hint: 'Revisit c11_cs_cbse_09_003 (File Modes) and write a 5-row comparison table for all 6 modes.',
                  misconception: 'Students believe that opening a file in `\'a\'` mode and then calling `f.seek(0)` allows them to read or overwrite from the beginning.' },
                { id: 'b', prompt: 'A student writes: `f = open(\'log.txt\', \'a\'); f.write(\'Error: Disk full\'); f.close()`. The file `log.txt` already contains two lines.', answer: 'It will be appended **directly after the last character**',
                  options: ['It will be appended **directly after the last character**', 'it adds a newline', 'opening a file in `\'a\'` mode and then calling `f'],
                  hint: 'Revisit c11_cs_cbse_09_003 (File Modes) and write a 5-row comparison table for all 6 modes.',
                  misconception: 'Students believe that opening a file in `\'a\'` mode and then calling `f.seek(0)` allows them to read or overwrite from the beginning.' },
                { id: 'c', prompt: 'Compare the effect of opening an existing file `data.txt` (size 100 bytes) in modes `\'w\'` vs `\'a\'` vs `\'a+\'`.', answer: '| Mode | Size after open | Pointer at | Can read?',
                  options: ['| Mode | Size after open | Pointer at | Can read?', 'opening a file in `\'a\'` mode and then calling `f'],
                  hint: 'Revisit c11_cs_cbse_09_003 (File Modes) and write a 5-row comparison table for all 6 modes.',
                  misconception: 'Students believe that opening a file in `\'a\'` mode and then calling `f.seek(0)` allows them to read or overwrite from the beginning.' }
          ],
            remediations: { 'opening-a-file-in-a': { steps: ['**Demonstrate the misconception live:** Create `demo.txt` with content "OLD".', 'Run: `with open(\'demo.txt\', \'a\') as f: f.seek(0); f.write(\'NEW\')`.', 'Show file becomes "OLDNEW", not "NEW".', '**Explain the OS rule:** "In append mode, the kernel forces every write to EOF.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_010', difficulty: 'standard',
          question: 'Binary files store data as raw bytes (0s and 1s) without any character encoding.',
          hint: 'Review `open()` modes (\'r\', \'w\', \'a\'), the `with` statement, and `seek()`/`tell()` from.',
          misconception: 'Students often believe that binary files are "just text files with a .bin extension" and try to open them in text.',
          parts: [
                { id: 'a', prompt: 'Write a Python program that creates a binary file `data.bin`, writes the bytes `b\'Python\'` followed by the integer 2025 encoded as 4 bytes in big-endian.', answer: '```python',
                  options: ['```python', 'just text files with a .bin extension'],
                  hint: 'Review `open()` modes (\'r\', \'w\', \'a\'), the `with` statement, and `seek()`/`tell()` from nodes.',
                  misconception: 'Students often believe that binary files are "just text files with a .bin extension" and try to open them in text editors or use text modes.' }
          ],
            remediations: { 'binary-files-are-just-text': { steps: ['**Concrete demonstration**: In the Python shell, run `open(\'test.bin\', \'wb\').write(b\'hello\')` and `open(\'test.bin\'.', 'Then run `open(\'test.bin\', \'w\').write(\'hello\')` and `open(\'test.bin\', \'r\').read()` to show text round-trip.', 'Finally, attempt `open(\'test.bin\', \'wb\').write(\'hello\')` to trigger the `TypeError`.', '**Visual analogy**: Compare a text file to a letter written in English (human-readable, encoding-dependent) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_011', difficulty: 'standard',
          question: 'File Handling Errors and Exception Handling refers to the mechanisms in Python.',
          hint: 'Review the `open()` function parameters, file modes, and the `with` statement from nodes.',
          misconception: 'Students often think that using `try-except` around `open()` is enough, and they forget that the file object must.',
          parts: [
                { id: 'a', prompt: 'Write a Python code snippet that attempts to open "config.txt" for reading, catches FileNotFoundError and PermissionError separately with custom messages.', answer: '```python try: with open("config.txt", "r") as f: content = f.read() except',
                  options: ['```python try: with open("config.txt", "r") as f: content = f.read() except', 'config.txt', ') as f: content = f.read() except FileNotFoundError: print(', ') except PermissionError: print('],
                  hint: 'Review the `open()` function parameters, file modes, and the `with` statement from nodes 09_002.',
                  misconception: 'Students often think that using `try-except` around `open()` is enough, and they forget that the file object must be closed in a `finally`.' }
          ],
            remediations: { 'using-try-except-around-open': { steps: ['If a student exhibits the above misconception, first demonstrate a scenario where a generic `except:` catches.', 'Then show a case where `FileNotFoundError` is not raised in `\'w\'` mode.', 'Next, have them rewrite the code using `with` and specific exception handlers.', 'Finally, give them a debugging exercise where a broad `except` hides a `ValueError` from `int()` conversion, and ask.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_09_012', difficulty: 'standard',
          question: 'Practical file operations involve applying file handling techniques to perform.',
          hint: 'Revisit c11_cs_cbse_09_007 (with statement) and c11_cs_cbse_09_011 (exception handling).',
          misconception: 'Students believe that merging files simply means `dst.write(src1.read() + src2.read())` and that this automatically.',
          parts: [
                { id: 'a', prompt: 'What is the correct file mode to open a destination file when you want to copy content into it, ensuring any existing content is completely replaced?', answer: 'The correct mode is `\'w\'` (write mode)',
                  options: ['The correct mode is `\'w\'` (write mode)', 'merging files simply means `dst'],
                  hint: 'Revisit c11_cs_cbse_09_007 (with statement) and c11_cs_cbse_09_011 (exception handling) — practice.',
                  misconception: 'Students believe that merging files simply means `dst.write(src1.read() + src2.read())` and that this automatically inserts a newline.' },
                { id: 'b', prompt: 'Compare the memory implications of using `read()` vs `readlines()` vs line-by-line iteration (`for line in src:`) when copying a 2 GB log file to another disk.', answer: 'Line-by-line iteration (`for line in src:`) is safest',
                  options: ['Line-by-line iteration (`for line in src:`) is safest', 'simplicity', 'merging files simply means `dst'],
                  hint: 'Revisit c11_cs_cbse_09_007 (with statement) and c11_cs_cbse_09_011 (exception handling) — practice.',
                  misconception: 'Students believe that merging files simply means `dst.write(src1.read() + src2.read())` and that this automatically inserts a newline.' }
          ],
            remediations: { 'merging-files-simply-means-dst': { steps: ['Have the student create two test files: `a.txt` with content `Hello` (no newline) and `b.txt` with `World` (no newline).', 'Run their merge code and examine output — they\'ll see `HelloWorld`.', 'Ask: "Where is the space/newline?" Guide them to add `dst.write(\'\\n\')` between files or ensure each source ends with.', 'For word counting, give them `test.txt` with `Hello,world how are you?` and ask them to predict `split()` output.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
