import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch10_p2: SimDef = {
    id: 'v3_c12_cs_ch10_p2',
    title: 'File Handling in Python · Part 2/2',
    subtitle: 'One wrong mode letter just erased the whole file',
    classLevel: 12, subject: 'computer_science', topic: 'File Handling in Python · Part 2/2',
    chapters: ['c12_cs_ch10'],
    nodeIds: ['c12_cs_cbse_10_007', 'c12_cs_cbse_10_008', 'c12_cs_cbse_10_009', 'c12_cs_cbse_10_010', 'c12_cs_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Data engineer', intro: 'RAM forgets everything when your program ends. Files are how programs remember — if you open them the right way.', goal: 'Distinguish text and binary files, choose correct open modes, and apply the open–process–close pattern for persistence.' },
    discovery: {
        question: 'A student opens \'data.dat\' in text mode \'to convert it to text,\' hits save, and the program\'s pickled records are permanently corrupt. What misconception destroyed the file?',
        options: ['That extension or mode defines the file — text mode re-encodes bytes through UTF-8 and newline translation, silently mangling binary data', 'Nothing — files can\'t be corrupted by opening them', 'The file was already corrupt', 'Binary files convert to text safely on open'],
        answer: 'That extension or mode defines the file — text mode re-encodes bytes through UTF-8 and newline translation, silently mangling binary data',
        hook: 'Files have no self-declared \'type\' — .txt is a hint, not a law. Content plus open-mode decides everything: \'w\' truncates to zero (it does NOT append), \'rb\' returns raw bytes, \'r\' decodes characters. The most dangerous corruptions throw no error at all.',
    },
    teaching: [
        { title: 'Appending Data to Existing Files', text: 'Appending data to an existing file in Python uses the file mode `\'a\'` (or `\'a+\'` for read-append) which opens the file for writing at the end of the file without truncating existing content; the file.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Give your mark-tracker a memory that survives restarts: choose text vs binary for CSV records vs pickled objects, then write the open → process → close ritual that never loses a byte.',
        labels: ['Appending Data to Existing', 'Reading and Writing Binary', 'Text File Operations: Count', 'Exception Handling in File', 'Pickle Module: Serializing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_008', title: 'Reading and Writing Binary Files',
          caseStudy: { intro: 'Imagine you want to save a screenshot (PNG) or a compiled Python program (`.pyc`) to disk.',
            decisions: [{ prompt: 'What is the correct file mode to open a binary file for writing in Python?', options: [
                { text: 'The correct mode is `\'wb\'` (write binary)', outcome: 'The correct mode is `\'wb\'` (write binary). A wrong answer like `\'w\'` reveals the student confuses.' },
                { text: 'binary files are only for images/executables', outcome: 'Not quite — Students often think “binary files are only for images/executables” and that text files are.', reveals: 'binary-files-are-only-for' },
                { text: 'normal', outcome: 'Not quite — Students often think “binary files are only for images/executables” and that text files are.', reveals: 'binary-files-are-only-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_009', title: 'Text File Operations: Count Words, Lines and Characters',
          caseStudy: { intro: 'Imagine you\'re building a simple plagiarism checker for school essays — you need to know how many lines, words, and characters each submitted file has.',
            decisions: [{ prompt: 'What does `len(content.split())` return when `content = "Hello world\\n\\nPython"`?', options: [
                { text: 'It returns 3', outcome: 'It returns 3. The `split()` method without arguments splits on ANY whitespace (spaces, tabs.' },
                { text: '`f.read()', outcome: 'Not quite — Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.', reveals: 'f' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_010', title: 'Exception Handling in File Operations',
          caseStudy: { intro: 'Imagine your board exam practical requires reading student marks from `marks.txt` — but the file might be missing, locked by another process, or corrupted.',
            decisions: [{ prompt: 'What is the most specific built-in exception raised when `open(\'missing.txt\', \'r\')` is executed and the file does not exist?', options: [
                { text: '`FileNotFoundError` (a subclass of `OSError`)', outcome: '`FileNotFoundError` (a subclass of `OSError`). A wrong answer like `IOError` or `Exception` reveals.' },
                { text: 'What happens if the file doesn\'t exist?', outcome: 'Not quite — **Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because.', reveals: 'misconception-using-with-open' },
                { text: 'the file is closed safely', outcome: 'Not quite — **Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because.', reveals: 'misconception-using-with-open' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_011', title: 'Pickle Module: Serializing and Deserializing Objects',
          caseStudy: { intro: 'Imagine you are building a text‑based RPG and want to save the player’s progress — current health, inventory list, position coordinates, and completed quests.',
            decisions: [{ prompt: 'What is the fundamental difference between `pickle.dump(obj, file)` and `pickle.dumps(obj)`?', options: [
                { text: '`pickle.dump(obj, file)` writes the pickled byte stream directly to an already opened', outcome: '`pickle.dump(obj, file)` writes the pickled byte stream directly to an already opened binary file.' },
                { text: 'both write to a file', outcome: 'Not quite — Students often believe `pickle` is a safe, universal format like JSON — they send pickled data over.', reveals: 'pickle-is-a-safe' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An attendance logger opens \'records.txt\' in \'w\' mode each morning to add the day\'s entries. Every evening, yesterday\'s data is mysteriously gone.',
            decisions: [{ prompt: 'What\'s destroying the old records?', options: [
                { text: 'The \'w\' mode itself — opening for write truncates the file to zero before writing; switching to \'a\' (append) keeps existing lines and adds new ones at the end.', outcome: 'The mode letter is a decision: \'w\' erases, \'a\' appends, \'r\' only reads — picking \'w\' for logging silently wipes history.' },
                { text: 'Nothing — \'w\' appends by nature, so the missing data must be a Python bug.', outcome: 'That\'s the misconception itself: \'w\' truncates unconditionally; the vanished days are the expected behaviour, not a bug.', reveals: 'w-mode-appends' },
                { text: 'The .txt extension forces text mode weirdness — renaming to .dat would fix it.', outcome: 'Extensions are labels, not behaviour: the same file reads as text or bytes depending on the mode you open with.', reveals: 'extension-decides-file-type' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'You can now persist data and explain exactly why \'w\' deletes, why pickle needs binary, and why the quiet bugs are the worst. File handling is every practical exam\'s foundation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_007', difficulty: 'standard',
          question: 'Appending data to an existing file in Python uses the file mode `\'a\'` (or.',
          hint: 'Revisit `c12_cs_cbse_10_002` (Opening Files: open() Function and File Modes) and make.',
          misconception: 'Students believe that in append mode (`\'a\'`), they can use `seek(0)` to move to the beginning, then `write()` to insert.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Appending data to an existing file in Python uses the file mode `\'a\'` (or `\'a+\'` for',
                  options: ['Appending data to an existing file in Python uses the file mode `\'a\'` (or `\'a+\'` for', 'File handling is the process of storing data persistently on secondary storage (hard', 'The `open()` function in Python is used to open a file and return a file object (also', 'The `read()`, `readline()`, and `readlines()` methods are used to read data from a text'],
                  hint: 'Revisit `c12_cs_cbse_10_002` (Opening Files: open() Function and File Modes) and make a comparison.',
                  misconception: 'Students believe that in append mode (`\'a\'`), they can use `seek(0)` to move to the beginning, then `write()` to insert data at the start.' }
          ],
            remediations: { 'in-append-mode-a': { steps: ['If a student exhibits the `seek()`-in-append misconception: (1) Have them run a 5-line script that opens `\'test.txt\'`.', '(2) Explain that POSIX/Windows guarantee atomic append: the kernel does `lseek(fd, 0, SEEK_END)` internally before.', '(3) Assign remediation: re-do node `c12_cs_cbse_10_006` (File Pointer Operations) focusing on the "mode-dependent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in append mode (`\'a\'`), they can use `seek(0)` to move to the beginning, then `write()` to insert.',
          parts: [
                { id: 'a', prompt: 'A student writes the following code to append a timestamp to `access.log` every time a function `log_access()` is called.', answer: 'The code is **correct and safe** for multi-process concurrency',
                  options: ['The code is **correct and safe** for multi-process concurrency', 'race condition — use locks'],
                  hint: 'Revisit `c12_cs_cbse_10_002` (Opening Files: open() Function and File Modes) and make a comparison.',
                  misconception: 'Students believe that in append mode (`\'a\'`), they can use `seek(0)` to move to the beginning, then `write()` to insert data at the start.' }
          ],
            remediations: { 'in-append-mode-a': { steps: ['If a student exhibits the `seek()`-in-append misconception: (1) Have them run a 5-line script that opens `\'test.txt\'`.', '(2) Explain that POSIX/Windows guarantee atomic append: the kernel does `lseek(fd, 0, SEEK_END)` internally before.', '(3) Assign remediation: re-do node `c12_cs_cbse_10_006` (File Pointer Operations) focusing on the "mode-dependent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_008', difficulty: 'standard',
          question: 'Binary files store data as raw bytes (sequences of 0s and 1s) without any.',
          hint: 'Review **c12_cs_cbse_10_002** for mode strings and **c12_cs_cbse_10_006** for pointer.',
          misconception: 'Students often think “binary files are only for images/executables” and that text files are “normal.” They then try.',
          parts: [
                { id: 'a', prompt: 'What is the correct file mode to open a binary file for writing in Python?', answer: 'The correct mode is `\'wb\'` (write binary)',
                  options: ['The correct mode is `\'wb\'` (write binary)', 'binary files are only for images/executables', 'normal', '“binary files are only for images/executables” and that text files are “normal'],
                  hint: 'Review **c12_cs_cbse_10_002** for mode strings and **c12_cs_cbse_10_006** for pointer operations.',
                  misconception: 'Students often think “binary files are only for images/executables” and that text files are “normal.” They then try to write a Python `str`.' },
                { id: 'b', prompt: 'Explain why opening a JPEG image file in text mode (`\'r\'`) and then writing it back out with `\'w\'` would likely corrupt the image.', answer: 'Text mode decodes bytes using the default encoding (UTF‑8) and translates',
                  options: ['Text mode decodes bytes using the default encoding (UTF‑8) and translates', 'binary files are only for images/executables', 'normal', '“binary files are only for images/executables” and that text files are “normal'],
                  hint: 'Review **c12_cs_cbse_10_002** for mode strings and **c12_cs_cbse_10_006** for pointer operations.',
                  misconception: 'Students often think “binary files are only for images/executables” and that text files are “normal.” They then try to write a Python `str`.' },
                { id: 'c', prompt: 'Compare the behavior of `seek(0, 2)` (seek to end) in a file opened in binary mode vs. text mode. What does `tell()` return in each case?', answer: 'In binary mode, `seek(0, 2)` moves the pointer to the end of the file',
                  options: ['In binary mode, `seek(0, 2)` moves the pointer to the end of the file', 'binary files are only for images/executables', 'normal', '“binary files are only for images/executables” and that text files are “normal'],
                  hint: 'Review **c12_cs_cbse_10_002** for mode strings and **c12_cs_cbse_10_006** for pointer operations.',
                  misconception: 'Students often think “binary files are only for images/executables” and that text files are “normal.” They then try to write a Python `str`.' }
          ],
            remediations: { 'binary-files-are-only-for': { steps: ['If a student confuses text/binary modes or `bytes`/`str`: 1.', 'Revisit **c12_cs_cbse_10_002** (file modes) and **c12_cs_cbse_10_006** (seek/tell with byte offsets).', 'Practice: write a string to a binary file by encoding (`f.write(s.encode())`), then read it back and decode.', 'Use a hex editor (or `xxd`/`od -x`) to view the actual bytes of a small binary file created by their code, reinforcing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_009', difficulty: 'standard',
          question: 'Text file operations for counting words, lines, and characters involve reading.',
          hint: 'Revisit c12_cs_cbse_10_003 (Reading Files) and practice `split()` vs `split(\' \')`.',
          misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.',
          parts: [
                { id: 'a', prompt: 'What does `len(content.split())` return when `content = "Hello world\\n\\nPython"`?', answer: 'It returns 3',
                  options: ['It returns 3', '`f.read()'],
                  hint: 'Revisit c12_cs_cbse_10_003 (Reading Files) and practice `split()` vs `split(\' \')` on strings with.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' },
                { id: 'b', prompt: 'A student writes `lines = len(f.readlines())` to count lines, but gets 0 for a file they know has 5 lines. They confirm the file path is correct.', answer: 'The file pointer is at the end of the file',
                  options: ['The file pointer is at the end of the file', '`f.read()'],
                  hint: 'Revisit c12_cs_cbse_10_003 (Reading Files) and practice `split()` vs `split(\' \')` on strings with.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' },
                { id: 'c', prompt: 'Write a Python snippet that correctly counts lines, words, and characters (including spaces and newlines) in `data.txt` using a single `read()` call, handling.', answer: '```python with open(\'data.txt\', \'r\') as f: content = f.read() lines =',
                  options: ['```python with open(\'data.txt\', \'r\') as f: content = f.read() lines =', 'Lines: {lines}, Words: {words}, Characters: {chars}', '`f.read()'],
                  hint: 'Revisit c12_cs_cbse_10_003 (Reading Files) and practice `split()` vs `split(\' \')` on strings with.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' },
                { id: 'd', prompt: 'Compare the memory usage and speed of these three approaches for a 500 MB log file: (A) `content = f.read()` then process, (B) `for line in f:` process line.', answer: 'Approach (B) iteration is best for 256 MB RAM',
                  options: ['Approach (B) iteration is best for 256 MB RAM', '`f.read()'],
                  hint: 'Revisit c12_cs_cbse_10_003 (Reading Files) and practice `split()` vs `split(\' \')` on strings with.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' }
          ],
            remediations: { 'f': { steps: ['If a student uses `count(\'\\n\') + 1` blindly: (1) Make them test with `echo -n "hello" > test.txt` (no newline) — their.', '(2) Test with empty file — returns 1 line.', '(3) Show `splitlines()` behavior: `"a\\nb".splitlines()` → `[\'a\', \'b\']` (2), `"a\\nb\\n".splitlines()` → `[\'a\', \'b\']` (2).', '(4) Have them rewrite using `splitlines()` and verify all three cases.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_010', difficulty: 'standard',
          question: 'Exception handling in file operations is the practice of using Python\'s.',
          hint: 'Revisit c12_cs_cbse_10_002 (open modes and their failure modes) and c12_cs_cbse_10_005.',
          misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes.',
          parts: [
                { id: 'a', prompt: 'What is the most specific built-in exception raised when `open(\'missing.txt\', \'r\')` is executed and the file does not exist?', answer: '`FileNotFoundError` (a subclass of `OSError`)',
                  options: ['`FileNotFoundError` (a subclass of `OSError`)', 'What happens if the file doesn\'t exist?', 'the file is closed safely'],
                  hint: 'Revisit c12_cs_cbse_10_002 (open modes and their failure modes) and c12_cs_cbse_10_005 (with.',
                  misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes the file." **Why it\'s.' },
                { id: 'b', prompt: 'Explain why the following code is dangerous for file operations: ```python try: f = open(\'data.txt\', \'r\') content = f.read() except: print("Error occurred").', answer: 'Three critical flaws: (1) Bare `except:` catches **all** exceptions including',
                  options: ['Three critical flaws: (1) Bare `except:` catches **all** exceptions including', 'What happens if the file doesn\'t exist?', 'the file is closed safely'],
                  hint: 'Revisit c12_cs_cbse_10_002 (open modes and their failure modes) and c12_cs_cbse_10_005 (with.',
                  misconception: '**Misconception:** "Using `with open(...) as f:` eliminates the need for `try-except` because it automatically closes the file." **Why it\'s.' }
          ],
            remediations: { 'misconception-using-with-open': { steps: ['If a student exhibits this misconception: (1) Show them a minimal crashing example: `with open(\'nonexistent.txt\') as.', '(2) Ask: "Did `with` prevent the crash?" → No.', '(3) Explain: `with` is for **cleanup**, `try-except` is for **error handling**.', 'They are orthogonal — use both.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_011', difficulty: 'standard',
          question: 'The `pickle` module in Python provides a way to serialize (pickle) and.',
          hint: 'Revisit binary file modes (c12_cs_cbse_10_008) and exception handling.',
          misconception: 'Students often believe `pickle` is a safe, universal format like JSON — they send pickled data over networks or load.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `pickle` module in Python provides a way to serialize (pickle) and deserialize',
                  options: ['The `pickle` module in Python provides a way to serialize (pickle) and deserialize', 'File handling is the process of storing data persistently on secondary storage (hard', 'The `open()` function in Python is used to open a file and return a file object (also', 'The `read()`, `readline()`, and `readlines()` methods are used to read data from a text'],
                  hint: 'Revisit binary file modes (c12_cs_cbse_10_008) and exception handling (c12_cs_cbse_10_010) before.',
                  misconception: 'Students often believe `pickle` is a safe, universal format like JSON — they send pickled data over networks or load pickles from untrusted.' }
          ],
            remediations: { 'pickle-is-a-safe': { steps: ['Re‑watch/read binary file modes (`\'wb\'`, `\'rb\'`) from node **c12_cs_cbse_10_008** — practice writing/reading raw bytes.', 'Review exception handling patterns (`try‑except‑else‑finally`, specific exception types) from node.', 'Re‑do **Diagnostic Question 3** step‑by‑step, explaining aloud why each mode and exception is chosen.', 'If custom class unpickling fails, revisit the `__init__`/`__repr__` structure and ensure the class definition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
