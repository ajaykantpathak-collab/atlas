import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch06_p2: SimDef = {
    id: 'v3_c11_cs_ch06_p2',
    title: 'Strings and Lists in Python · Part 2/3',
    subtitle: 'Index from zero, slice out substrings, and learn why strings refuse in-place edits.',
    classLevel: 11, subject: 'computer_science', topic: 'Strings and Lists in Python · Part 2/3',
    chapters: ['c11_cs_ch06'],
    nodeIds: ['c11_cs_cbse_06_007', 'c11_cs_cbse_06_008', 'c11_cs_cbse_06_009', 'c11_cs_cbse_06_010', 'c11_cs_cbse_06_011', 'c11_cs_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data clerk carving fields out of text records', intro: 'Forms want pieces of an ID card — board here, year there. Your scalpel is the index.', goal: 'Use zero-based indexing and slicing on strings and explain string immutability.' },
    discovery: {
        question: 'name = "Aarav" works, and name[0] reads \'A\' fine — but name[0] = "K" to make \'Karav\' throws TypeError. What rule did the assignment break?',
        options: ['Strings are immutable — \'edits\' must build a new string, never rewrite in place', 'Index 0 is reserved and cannot be assigned to', 'Single characters can\'t be stored in variables', 'The string was created with double quotes, which lock it'],
        answer: 'Strings are immutable — \'edits\' must build a new string, never rewrite in place',
        hook: 'Indexing reads fine — writing is what\'s banned. Immutability means every \'change\' is actually a fresh string.',
    },
    teaching: [
        { title: 'Mutable vs Immutable: Strings are Immutable', text: 'In Python, **immutability** means an object\'s state cannot be modified after creation; any operation that appears to change the object actually creates a new object with a new memory address.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Extract \'CBSE\' and \'2025\' from the ID \'CBSE2025\', grab the last character without hardcoding an index, and store a sentence containing both quote types.',
        labels: ['Mutable vs Immutable: Strings', 'Introduction to Lists', 'Creating Lists and Accessing', 'List Slicing and List', 'List Methods: append, insert,', 'Nested Lists and Traversal'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_007', title: 'Mutable vs Immutable: Strings are Immutable',
          caseStudy: { intro: 'Imagine you write your name on a whiteboard with permanent marker — you can\'t erase a single letter; you\'d have to rewrite the whole name on a fresh board.',
            decisions: [{ prompt: 'What error is raised when you execute `s = "PYTHON"; s[0] = "p"` and why does Python raise it?', options: [
                { text: '**Answer:** `TypeError: \'str\' object does not support item assignment`', outcome: '**Answer:** `TypeError: \'str\' object does not support item assignment`.' },
                { text: 'it changes to \'pYTHON\'', outcome: 'Not quite — **Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string.', reveals: 'exact-error-string-methods-like' },
                { text: 'no error, it works', outcome: 'Not quite — **Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string.', reveals: 'exact-error-string-methods-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_008', title: 'Introduction to Lists in Python',
          caseStudy: { intro: 'Imagine you\'re building a contact list on your phone—you need to store names, phone numbers, and email addresses together, but you also need to add new.',
            decisions: [{ prompt: 'What are the four defining characteristics of a Python list that distinguish it from other data structures?', options: [
                { text: 'The four defining characteristics are: (1) Ordered – elements maintain insertion sequence', outcome: 'The four defining characteristics are: (1) Ordered – elements maintain insertion sequence and have.' },
                { text: 'heterogeneous', outcome: 'Not quite — Students often believe that because lists are "like arrays" in other languages, they must store.', reveals: 'because-lists-are-like-arrays' },
                { text: 'like arrays', outcome: 'Not quite — Students often believe that because lists are "like arrays" in other languages, they must store.', reveals: 'because-lists-are-like-arrays' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_010', title: 'List Slicing and List Operations',
          caseStudy: { intro: 'Imagine you have a list of daily temperatures recorded for a month: `temps = [28, 30, 31, 29, 27, 26, 28, 32, 33, 31, 30, 29, 28, 27, 26, 25, 24, 26, 28, 30.',
            decisions: [{ prompt: 'What is the output of the following code? ```python numbers = [10, 20, 30, 40, 50, 60] print(numbers[1:4]) ```', options: [
                { text: 'The output is `[20, 30, 40]`', outcome: 'The output is `[20, 30, 40]`. Slicing `numbers[1:4]` starts at index 1 (inclusive) and stops before.' },
                { text: 'the stop index is inclusive', outcome: 'Not quite — Students often believe that slicing modifies the original list (like `pop` or `remove`).', reveals: 'slicing-modifies-the-original-list' },
                { text: 'slicing modifies the original list (like `pop` or `remove`)', outcome: 'Not quite — Students often believe that slicing modifies the original list (like `pop` or `remove`).', reveals: 'slicing-modifies-the-original-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re storing data for the school magazine app. A teammate writes: `grade = \'A\'` and claims it\'s a char (like in Java), and for the three-line event invitation he writes three separate strings joined by `+`. He says triple-quoted strings are \'just for comments\'.',
            decisions: [{ prompt: 'What does Python actually do with these?', options: [
                { text: 'Python has no char type — \'A\' is a one-character string; single and double quotes are interchangeable. And triple quotes create multi-line string literals: the invitation can be one `\'\'\'Dear Parents, ... three lines ...\'\'\'` object — not a comment.', outcome: 'Strings are immutable sequences of characters in any quote style; triple quotes exist precisely for multi-line text (docstrings are just that convention applied).' },
                { text: '\'A\' is a char — single quotes make characters, double quotes make strings.', outcome: 'Both make `str` objects — `type(\'a\')` and `type("a")` are identical; the char/string split is a C/Java habit Python doesn\'t share.', reveals: 'single-quotes-make-char' },
                { text: 'Triple quotes are only for docstrings and comments, so joining with + is the correct approach for multi-line text.', outcome: 'Docstrings are triple-quoted strings used as comments by position, but the literal itself is a real multi-line string — made exactly for cases like the invitation.', reveals: 'triple-quotes-are-comments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'A string is an ordered row of characters you can read from either end — but never rewrite in place.',
            decisions: [{ prompt: 'What comes next? Strings and Lists in Python · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Strings and Lists in Python · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_007', difficulty: 'standard',
          question: 'In Python, **immutability** means an object\'s state cannot be modified after.',
          hint: 'Revisit c11_cs_cbse_06_005 (String Methods) and c11_cs_cbse_06_004 (Concatenation).',
          misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why.',
          parts: [
                { id: 'a', prompt: 'What error is raised when you execute `s = "PYTHON"; s[0] = "p"` and why does Python raise it?', answer: '**Answer:** `TypeError: \'str\' object does not support item assignment`',
                  options: ['**Answer:** `TypeError: \'str\' object does not support item assignment`', 'it changes to \'pYTHON\'', 'no error, it works', 'What is `s` after `s = \'hello\''],
                  hint: 'Revisit c11_cs_cbse_06_005 (String Methods) and c11_cs_cbse_06_004 (Concatenation) — specifically.',
                  misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why students make it:**.' },
                { id: 'b', prompt: 'Explain in your own words what happens to the original string when you execute `name = "amit"; name = name.upper()`.', answer: '**Answer:** The original string `"amit"` remains unchanged in memory',
                  options: ['**Answer:** The original string `"amit"` remains unchanged in memory', 'the original string becomes \'AMIT\'', 'What is `s` after `s = \'hello\'', 'strings are mutable and methods modify in-place'],
                  hint: 'Revisit c11_cs_cbse_06_005 (String Methods) and c11_cs_cbse_06_004 (Concatenation) — specifically.',
                  misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why students make it:**.' },
                { id: 'c', prompt: 'Predict the output and explain the memory addresses: ```python s1 = "EXAM" print(id(s1)) s2 = s1 + "2024" print(id(s1), id(s2)) s1 = s1.lower() print(id(s1)).', answer: '**Answer:** - First `id(s1)` prints address A (e.g., 1402345678912)',
                  options: ['**Answer:** - First `id(s1)` prints address A (e.g., 1402345678912)', 'What is `s` after `s = \'hello\''],
                  hint: 'Revisit c11_cs_cbse_06_005 (String Methods) and c11_cs_cbse_06_004 (Concatenation) — specifically.',
                  misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why students make it:**.' },
                { id: 'd', prompt: 'Compare the memory behavior of these two loops. Which is more efficient and why? ```python', answer: '**Answer:** Loop B is far more efficient',
                  options: ['**Answer:** Loop B is far more efficient', 'both are same', 'Loop A is faster', 'What is `s` after `s = \'hello\''],
                  hint: 'Revisit c11_cs_cbse_06_005 (String Methods) and c11_cs_cbse_06_004 (Concatenation) — specifically.',
                  misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why students make it:**.' }
          ],
            remediations: { 'exact-error-string-methods-like': { steps: ['**Show, don\'t tell:** In the REPL, run `s = "test"; print(id(s)); s = s.upper(); print(id(s))` — point out the address.', '**Contrast with list:** Immediately run `lst = [1,2]; print(id(lst)); lst.append(3); print(id(lst))` — address stays.', 'Say: "Lists mutate; strings don\'t." 3.', '**Force the error:** Make them type `s[0] = \'X\'` and read the `TypeError` aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why.',
          parts: [
                { id: 'a', prompt: 'A student writes: `def clean(text): text = text.strip(); text = text.lower(); return text` and claims "this modifies the original string passed in".', answer: '**Answer:** The claim is **false**',
                  options: ['**Answer:** The claim is **false**', 'What is `s` after `s = \'hello\''],
                  hint: 'Revisit c11_cs_cbse_06_005 (String Methods) and c11_cs_cbse_06_004 (Concatenation) — specifically.',
                  misconception: '**Exact error:** "String methods like `replace()`, `upper()`, `strip()` modify the original string in-place." **Why students make it:**.' }
          ],
            remediations: { 'exact-error-string-methods-like': { steps: ['**Show, don\'t tell:** In the REPL, run `s = "test"; print(id(s)); s = s.upper(); print(id(s))` — point out the address.', '**Contrast with list:** Immediately run `lst = [1,2]; print(id(lst)); lst.append(3); print(id(lst))` — address stays.', 'Say: "Lists mutate; strings don\'t." 3.', '**Force the error:** Make them type `s[0] = \'X\'` and read the `TypeError` aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_008', difficulty: 'standard',
          question: 'A list in Python is an ordered, mutable collection of elements enclosed.',
          hint: 'Revisit c11_cs_cbse_06_007 (Mutable vs Immutable) and c11_cs_cbse_06_002 (String.',
          misconception: 'Students often believe that because lists are "like arrays" in other languages, they must store elements of the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A list in Python is an ordered, mutable collection of elements enclosed in square',
                  options: ['A list in Python is an ordered, mutable collection of elements enclosed in square', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Revisit c11_cs_cbse_06_007 (Mutable vs Immutable) and c11_cs_cbse_06_002 (String Indexing)—focus.',
                  misconception: 'Students often believe that because lists are "like arrays" in other languages, they must store elements of the same type.' }
          ],
            remediations: { 'because-lists-are-like-arrays': { steps: ['Show the student the Python memory model: draw a list as a row of boxes (references) pointing to separate object.', 'Emphasise the box holds an *address*, not the value itself.', 'Run `type(marks[0])`, `type(marks[2])` in the shell to prove each element carries its own type.', 'Contrast with `array.array(\'i\', [1,2,3])` from the `array` module which *does* enforce homogeneous signed integers—this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_009', difficulty: 'standard',
          question: 'A list in Python is an ordered, mutable collection of elements enclosed.',
          hint: 'Revisit c11_cs_cbse_06_008 (Introduction to Lists) and practice writing 5 different lists.',
          misconception: 'Students believe list indices represent the *ordinal position* (1st, 2nd, 3rd) rather than *offset from start*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A list in Python is an ordered, mutable collection of elements enclosed in square',
                  options: ['A list in Python is an ordered, mutable collection of elements enclosed in square', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Revisit c11_cs_cbse_06_008 (Introduction to Lists) and practice writing 5 different lists on paper.',
                  misconception: 'Students believe list indices represent the *ordinal position* (1st, 2nd, 3rd) rather than *offset from start*.' }
          ],
            remediations: { 'list-indices-represent-the-ordinal': { steps: ['Draw a number line on paper: mark positions 0,1,2,3 under list elements.', 'Write `fruits = ["apple", "banana", "cherry"]`.', 'Physically point: "0 steps → apple, 1 step → banana".', 'For negative: draw same line right-to-left with -1,-2,-3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_010', difficulty: 'standard',
          question: 'List slicing in Python uses the syntax `list[start:stop:step]` to extract.',
          hint: 'If stuck, revisit c11_cs_cbse_06_009 (Creating Lists and Accessing Elements) and practice.',
          misconception: 'Students often believe that slicing modifies the original list (like `pop` or `remove`).',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python numbers = [10, 20, 30, 40, 50, 60] print(numbers[1:4]) ```', answer: 'The output is `[20, 30, 40]`',
                  options: ['The output is `[20, 30, 40]`', 'the stop index is inclusive', 'slicing modifies the original list (like `pop` or `remove`)'],
                  hint: 'If stuck, revisit c11_cs_cbse_06_009 (Creating Lists and Accessing Elements) and practice index.',
                  misconception: 'Students often believe that slicing modifies the original list (like `pop` or `remove`).' },
                { id: 'b', prompt: 'Given `data = [\'a\', \'b\', \'c\', \'d\', \'e\']`, what does `data[-4:-1]` return? Explain in your own words how negative indices work in slicing.', answer: 'It returns `[\'b\', \'c\', \'d\']`',
                  options: ['It returns `[\'b\', \'c\', \'d\']`', 'negative slicing includes the stop index or misorders the start/stop', 'slicing modifies the original list (like `pop` or `remove`)'],
                  hint: 'If stuck, revisit c11_cs_cbse_06_009 (Creating Lists and Accessing Elements) and practice index.',
                  misconception: 'Students often believe that slicing modifies the original list (like `pop` or `remove`).' },
                { id: 'c', prompt: 'Write a single slicing expression to extract every second element from the list `values = [5, 10, 15, 20, 25, 30, 35, 40]` starting from the first element (5).', answer: 'The expression is `values[::2]` (or `values[0::2]`)',
                  options: ['The expression is `values[::2]` (or `values[0::2]`)', 'slicing modifies the original list (like `pop` or `remove`)'],
                  hint: 'If stuck, revisit c11_cs_cbse_06_009 (Creating Lists and Accessing Elements) and practice index.',
                  misconception: 'Students often believe that slicing modifies the original list (like `pop` or `remove`).' },
                { id: 'd', prompt: 'Consider `list1 = [1, 2, 3]` and `list2 = [4, 5]`. Predict the results of: (a) `list1 + list2` (b) `list1 * 3` (c) `2 in list1 + list2` Explain the order.', answer: '(a) `[1, 2, 3, 4, 5]` (concatenation creates a new list)',
                  options: ['(a) `[1, 2, 3, 4, 5]` (concatenation creates a new list)', '`in` has higher precedence than `+` or misreads the combined list', 'slicing modifies the original list (like `pop` or `remove`)'],
                  hint: 'If stuck, revisit c11_cs_cbse_06_009 (Creating Lists and Accessing Elements) and practice index.',
                  misconception: 'Students often believe that slicing modifies the original list (like `pop` or `remove`).' }
          ],
            remediations: { 'slicing-modifies-the-original-list': { steps: ['**For slice mutation confusion**: Show side-by-side in interpreter: `a = [1,2,3,4]; b = a[1:3]; print(a, b)` — original.', 'Then contrast with `a[1:3] = [9,9]` which *does* mutate via slice assignment (advanced, but shows difference).', '**For `*` with float**: Demonstrate `TypeError: can\'t multiply sequence by non-int`.', 'Explain `*` is defined only for integer repetition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_011', difficulty: 'standard',
          question: 'List methods `append()`, `insert()`, `remove()`, `pop()`, and `sort()` are.',
          hint: 'Revisit list creation and indexing (c11_cs_cbse_06_009) and the mutability demonstration.',
          misconception: 'Students believe `append`, `insert`, `remove`, and `sort` return the modified list, leading to code like `mylist.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'List methods `append()`, `insert()`, `remove()`, `pop()`, and `sort()` are built-in',
                  options: ['List methods `append()`, `insert()`, `remove()`, `pop()`, and `sort()` are built-in', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Revisit list creation and indexing (c11_cs_cbse_06_009) and the mutability demonstration.',
                  misconception: 'Students believe `append`, `insert`, `remove`, and `sort` return the modified list, leading to code like `mylist = mylist.append(5)` which.' }
          ],
            remediations: { 'append': { steps: ['Open a Python shell and run `L = [1,2]; print(L.append(3))` → observe `None`.', 'Write a trace table with columns: Operation, List Before, List After, Return Value.', 'For each method, fill one row: `append(9)`, `insert(0,8)`, `remove(2)`, `pop(1)`, `sort()`.', 'Explicitly note that only `pop` returns a non-`None` value.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_012', difficulty: 'standard',
          question: 'A nested list is a list that contains other lists as its elements, enabling the.',
          hint: 'Review list indexing (c11_cs_cbse_06_009) and for-loop traversal (c11_cs_cbse_06_006).',
          misconception: 'Students often think that `for row in matrix:` gives them an index, leading to code like `for row in matrix.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A nested list is a list that contains other lists as its elements, enabling the',
                  options: ['A nested list is a list that contains other lists as its elements, enabling the', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Review list indexing (c11_cs_cbse_06_009) and for-loop traversal (c11_cs_cbse_06_006) if stuck.',
                  misconception: 'Students often think that `for row in matrix:` gives them an index, leading to code like `for row in matrix: print(matrix[row])`.' }
          ],
            remediations: { 'for-row-in-matrix-gives': { steps: ['Show the student the difference by printing the loop variable in both styles: ```python matrix = [[1,2],[3,4]] for row.', 'Emphasize that in the first loop `row` *is* the inner list, so to access its elements you must write `for elem in row:`.', 'In the second loop `i` is an integer index, so you must write `matrix[i][j]` to reach elements.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
