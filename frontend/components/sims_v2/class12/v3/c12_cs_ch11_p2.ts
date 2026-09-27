import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch11_p2: SimDef = {
    id: 'v3_c12_cs_ch11_p2',
    title: 'Python Data Structures · Part 2/2',
    subtitle: 'scores * 3 didn\'t multiply anything — sequence algebra strikes',
    classLevel: 12, subject: 'computer_science', topic: 'Python Data Structures · Part 2/2',
    chapters: ['c12_cs_ch11'],
    nodeIds: ['c12_cs_cbse_11_007', 'c12_cs_cbse_11_008', 'c12_cs_cbse_11_009', 'c12_cs_cbse_11_010', 'c12_cs_cbse_11_011', 'c12_cs_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Python developer', intro: 'Lists, tuples, sets, dicts — Python\'s containers each keep order, safety or speed. Learn which does what.', goal: 'Master Python\'s built-in data structures: indexing, slicing, mutability and the operations that trip up beginners.' },
    discovery: {
        question: 'A student writes total = scores * 3 expecting 759 from [85, 90, 78]. Python happily returns something — but not a number. What did it build?',
        options: ['[85, 90, 78, 85, 90, 78, 85, 90, 78] — * on a list repeats the sequence, it doesn\'t multiply the values', '759 anyway — Python applies * to any sequence like plain multiplication', '[255, 270, 234] — * distributes element-wise the way a NumPy array would', 'TypeError — multiplying a list by an integer is illegal syntax'],
        answer: '[85, 90, 78, 85, 90, 78, 85, 90, 78] — * on a list repeats the sequence, it doesn\'t multiply the values',
        hook: 'Lists obey sequence algebra, not arithmetic: + concatenates into a new list while extend() mutates in place, and * repeats. Add mutable vs immutable — my_list[1]=99 works but my_str[1]=\'x\' raises TypeError — and you have the chapter\'s three classic traps.',
    },
    teaching: [
        { title: 'Traversing Dictionaries with Loops', text: 'Traversing a dictionary with loops means systematically accessing each key-value pair (or just keys, or just values) in a dictionary using Python\'s iteration constructs (`for` loops), typically via.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Command the workhorse of Python: slice with negative indices and steps, predict every output of +, * and in, then wield tuples, sets and dicts where each earns its place.',
        labels: ['Traversing Dictionaries with Loops', 'Sets in Python: Creation', 'Set Operations: Union, Intersection,', 'Nested Data Structures: List', 'Converting Between Data Structures', 'Searching and Sorting'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_007', title: 'Traversing Dictionaries with Loops',
          caseStudy: { intro: 'Imagine you have a dictionary `marks = {"Physics": 85, "Chemistry": 90, "Maths": 78}` and you need to print each subject with its mark, then calculate the.',
            decisions: [{ prompt: 'What does `for x in my_dict:` iterate over by default — keys, values, or key-value pairs?', options: [
                { text: 'It iterates over the **keys** of the dictionary', outcome: 'It iterates over the **keys** of the dictionary. A wrong answer (values or pairs) reveals the.' },
                { text: 'a dictionary is a collection of pairs', outcome: 'Not quite — Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".', reveals: 'for-k' },
                { text: '`for k, v in d:` works', outcome: 'Not quite — Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".', reveals: 'for-k' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_008', title: 'Sets in Python: Creation and Operations',
          caseStudy: { intro: 'Imagine you are building a contact-tracing app for a school event: you need to store unique student IDs of attendees, quickly check if a student was present.',
            decisions: [{ prompt: 'What is the correct way to create an empty set in Python, and why does `{}` not work?', options: [
                { text: 'The correct way is `empty_set = set()`', outcome: 'The correct way is `empty_set = set()`. `{}` creates an empty dictionary because curly braces.' },
                { text: '`{}` creates an empty set', outcome: 'Not quite — Students often believe that `{}` creates an empty set because curly braces are used for set.', reveals: 'creates-an-empty-set-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_009', title: 'Set Operations: Union, Intersection, Difference, Symmetric Difference',
          caseStudy: { intro: 'Imagine you are the sports coordinator of a school and have two lists: students who signed up for Cricket (`{\'A\', \'B\', \'C\', \'D\'}`) and students who signed.',
            decisions: [{ prompt: 'What is the result of the following Python code? ```python A = {1, 2, 3, 4} B = {3, 4, 5, 6} print(A ^ B) ```', options: [
                { text: 'The output is `{1, 2, 5, 6}`', outcome: 'The output is `{1, 2, 5, 6}`. Symmetric difference (`^`) returns elements that are in exactly one.' },
                { text: 'elements in either set but not both', outcome: 'Not quite — Students often think **difference is commutative** (`A - B == B - A`) because union and.', reveals: 'difference-is-commutative-a-b' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_010', title: 'Nested Data Structures: List of Dictionaries',
          caseStudy: { intro: 'Imagine you are building a contact list for your phone: each contact has a name, phone number, and email.',
            decisions: [{ prompt: 'What is the correct syntax to create a list containing two dictionaries, where each dictionary has keys \'id\' and \'score\' for two students?', options: [
                { text: 'Correct answer: `students = [{\'id\': 1, \'score\': 85}, {\'id\': 2, \'score\': 92}]`', outcome: 'Correct answer: `students = [{\'id\': 1, \'score\': 85}, {\'id\': 2, \'score\': 92}]`.' },
                { text: 'a tuple of dictionaries is a list, or they confuse list and tuple syntax', outcome: 'Not quite — Students often write `data[0][\'name\'] = \'New\'` to update the first record\'s name, which is correct.', reveals: 'students-often-write-data-0' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_012', title: 'Searching and Sorting in Data Structures',
          caseStudy: { intro: 'Imagine you have a contact list of 500 names on your phone and need to find "Rahul" — would you scroll one by one (linear) or jump to the middle if the list.',
            decisions: [{ prompt: 'What is the worst-case time complexity of linear search on a list of size n, and what does it mean in practical terms for a list of 10,000.', options: [
                { text: 'Worst-case time complexity is O(n)', outcome: 'Worst-case time complexity is O(n) — the algorithm may examine all n elements.' },
                { text: 'binary search is always faster than linear search', outcome: 'Not quite — Students believe **"binary search is always faster than linear search"** and apply it to unsorted.', reveals: 'binary-search-is-always-faster' },
                { text: '**`list', outcome: 'Not quite — Students believe **"binary search is always faster than linear search"** and apply it to unsorted.', reveals: 'binary-search-is-always-faster' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a quiz app, a student needs triple the total of [85, 90, 78] and writes total = scores * 3. The printed \'total\' is a nine-element list, not a number.',
            decisions: [{ prompt: 'What did `* 3` actually do?', options: [
                { text: 'List repetition — it built [85,90,78,85,90,78,85,90,78]; what she wanted was sum(scores) * 3, since * on a sequence repeats rather than multiplies elements.', outcome: 'Operators are overloaded by type: * on a list means \'repeat the sequence\', so reading it as arithmetic multiplication silently produces a longer list.' },
                { text: 'It multiplied every element by 3 — Python must have a display bug.', outcome: 'Element-wise multiplication isn\'t what * does on lists — that\'s why nine values appeared instead of [255,270,234].', reveals: 'star-multiplies-elements' },
                { text: 'It summed and tripled correctly — the printed list is just a formatting quirk.', outcome: 'The output literally shows repetition; a genuine 759 would print as an integer, not a bracketed sequence.', reveals: 'ignoring-actual-output' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_012', title: 'You made it',
          caseStudy: { intro: 'You now read list code and know the output before it runs — mutability, slicing and operator traps included. These are the most-asked output questions in the paper.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_007', difficulty: 'standard',
          question: 'Traversing a dictionary with loops means systematically accessing each.',
          hint: 'If stuck, review the difference between `d.keys()` (keys only), `d.values()` (values.',
          misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".',
          parts: [
                { id: 'a', prompt: 'What does `for x in my_dict:` iterate over by default — keys, values, or key-value pairs?', answer: 'It iterates over the **keys** of the dictionary',
                  options: ['It iterates over the **keys** of the dictionary', 'a dictionary is a collection of pairs', '`for k, v in d:` works'],
                  hint: 'If stuck, review the difference between `d.keys()` (keys only), `d.values()` (values only), and.',
                  misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".' },
                { id: 'b', prompt: 'Explain why the following code raises a `RuntimeError: dictionary changed size during iteration`: ```python d = {"a": 1, "b": 2} for k in d: if d[k] % 2 == 0.', answer: 'The loop iterates over the dictionary\'s internal hash table',
                  options: ['The loop iterates over the dictionary\'s internal hash table', 'a dictionary is a collection of pairs', '`for k, v in d:` works'],
                  hint: 'If stuck, review the difference between `d.keys()` (keys only), `d.values()` (values only), and.',
                  misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".' },
                { id: 'c', prompt: 'Given `inventory = {"apple": 50, "banana": 30, "orange": 20}`, write a loop that prints each fruit name in uppercase followed by its stock, and reduces each.', answer: '```python for fruit, stock in inventory.items(): print(fruit.upper(), stock)',
                  options: ['```python for fruit, stock in inventory.items(): print(fruit.upper(), stock)', 'a dictionary is a collection of pairs', '`for k, v in d:` works'],
                  hint: 'If stuck, review the difference between `d.keys()` (keys only), `d.values()` (values only), and.',
                  misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".' },
                { id: 'd', prompt: 'Compare the memory and time efficiency of these two loops for a dictionary with 10,000 entries: ```python', answer: 'Loop B is faster',
                  options: ['Loop B is faster', 'they\'re the same', 'a dictionary is a collection of pairs', '`for k, v in d:` works'],
                  hint: 'If stuck, review the difference between `d.keys()` (keys only), `d.values()` (values only), and.',
                  misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".' }
          ],
            remediations: { 'for-k': { steps: ['Revisit node `c12_cs_cbse_11_005` (Dictionaries: Creation and Accessing Values) to reinforce that `d[key]` returns.', 'Revisit node `c12_cs_cbse_11_006` (Dictionary Methods) to practice `.keys()`, `.values()`, `.items()` in isolation.', 'Write a 5-line script: create a 3-item dict, loop with `.items()`, print key and value, then deliberately try `for k,.', 'Re-attempt Diagnostic Question 1 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".',
          parts: [
                { id: 'a', prompt: 'A student writes this code to count word frequencies in a list `words`: ```python freq = {} for w in words: freq[w] = freq.get(w, 0) + 1 ``` They then want.', answer: 'The approach is **incorrect**',
                  options: ['The approach is **incorrect**', 'I\'m iterating over `.items()`, not the dict directly, so it\'s safe', 'a dictionary is a collection of pairs', '"I\'m iterating over `'],
                  hint: 'If stuck, review the difference between `d.keys()` (keys only), `d.values()` (values only), and.',
                  misconception: 'Students believe that `for k, v in d:` works because "a dictionary is a collection of pairs".' }
          ],
            remediations: { 'for-k': { steps: ['Revisit node `c12_cs_cbse_11_005` (Dictionaries: Creation and Accessing Values) to reinforce that `d[key]` returns.', 'Revisit node `c12_cs_cbse_11_006` (Dictionary Methods) to practice `.keys()`, `.values()`, `.items()` in isolation.', 'Write a 5-line script: create a 3-item dict, loop with `.items()`, print key and value, then deliberately try `for k,.', 'Re-attempt Diagnostic Question 1 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_008', difficulty: 'standard',
          question: 'A set in Python is an unordered, mutable collection of unique, hashable.',
          hint: 'Revisit Class 11 Math node `c11_math_cbse_01_001` (set definition) and Class 12 CS node.',
          misconception: 'Students often believe that `{}` creates an empty set because curly braces are used for set literals like `{1,2,3}`.',
          parts: [
                { id: 'a', prompt: 'What is the correct way to create an empty set in Python, and why does `{}` not work?', answer: 'The correct way is `empty_set = set()`',
                  options: ['The correct way is `empty_set = set()`', '`{}` creates an empty set'],
                  hint: 'Revisit Class 11 Math node `c11_math_cbse_01_001` (set definition) and Class 12 CS node.',
                  misconception: 'Students often believe that `{}` creates an empty set because curly braces are used for set literals like `{1,2,3}`.' },
                { id: 'b', prompt: 'Given `s = {1, 2, 2, 3, 3, 3}`, what is `len(s)` and what does `s` contain? Explain why.', answer: '`len(s)` is 3 and `s` contains `{1, 2, 3}`',
                  options: ['`len(s)` is 3 and `s` contains `{1, 2, 3}`', '`{}` creates an empty set'],
                  hint: 'Revisit Class 11 Math node `c11_math_cbse_01_001` (set definition) and Class 12 CS node.',
                  misconception: 'Students often believe that `{}` creates an empty set because curly braces are used for set literals like `{1,2,3}`.' },
                { id: 'c', prompt: 'You have `attendees = {101, 102, 103}`. Write code to add student 104, then add students 105 and 106 in a single call, then remove 102 safely (no error.', answer: 'Step-by-step: 1',
                  options: ['Step-by-step: 1', '`{}` creates an empty set'],
                  hint: 'Revisit Class 11 Math node `c11_math_cbse_01_001` (set definition) and Class 12 CS node.',
                  misconception: 'Students often believe that `{}` creates an empty set because curly braces are used for set literals like `{1,2,3}`.' },
                { id: 'd', prompt: 'Compare `remove()` and `discard()` when the element is not in the set. Then explain why `pop()` on an empty set raises `KeyError` while `clear()` does not.', answer: '`remove(x)` raises `KeyError` if `x` is absent',
                  options: ['`remove(x)` raises `KeyError` if `x` is absent', '`{}` creates an empty set'],
                  hint: 'Revisit Class 11 Math node `c11_math_cbse_01_001` (set definition) and Class 12 CS node.',
                  misconception: 'Students often believe that `{}` creates an empty set because curly braces are used for set literals like `{1,2,3}`.' }
          ],
            remediations: { 'creates-an-empty-set-because': { steps: ['If a student confuses `{}` with empty set: (1) Have them type `type({})` and `type(set())` in the REPL to see `<class.', '(2) Ask them to write a one-line function `empty_set()` that returns an empty set.', '(3) Give a mini-exercise: “Create a set `s`, add 5, then remove 5 using `discard`, then `remove` — observe the error.”.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_009', difficulty: 'standard',
          question: 'Set operations in Python allow combining, comparing, and extracting elements.',
          hint: 'Revisit c12_cs_cbse_11_008 to practice set creation, membership testing (`in`), and basic.',
          misconception: 'Students often think **difference is commutative** (`A - B == B - A`) because union and intersection are commutative.',
          parts: [
                { id: 'a', prompt: 'What is the result of the following Python code? ```python A = {1, 2, 3, 4} B = {3, 4, 5, 6} print(A ^ B) ```', answer: 'The output is `{1, 2, 5, 6}`',
                  options: ['The output is `{1, 2, 5, 6}`', 'elements in either set but not both'],
                  hint: 'Revisit c12_cs_cbse_11_008 to practice set creation, membership testing (`in`), and basic methods.',
                  misconception: 'Students often think **difference is commutative** (`A - B == B - A`) because union and intersection are commutative.' },
                { id: 'b', prompt: 'Given sets `X = {1, 2, 3}`, `Y = {2, 3, 4}`, `Z = {3, 4, 5}`, evaluate `(X | Y) & Z` and `X | (Y & Z)`. Are they equal? Show each step.', answer: 'Step 1: `X | Y` = `{1, 2, 3, 4}`',
                  options: ['Step 1: `X | Y` = `{1, 2, 3, 4}`', 'elements in either set but not both'],
                  hint: 'Revisit c12_cs_cbse_11_008 to practice set creation, membership testing (`in`), and basic methods.',
                  misconception: 'Students often think **difference is commutative** (`A - B == B - A`) because union and intersection are commutative.' }
          ],
            remediations: { 'difference-is-commutative-a-b': { steps: ['Draw Venn diagrams for all four operations with concrete labels (e.g., Cricket/Football).', 'Revisit **c12_cs_cbse_11_008** (Sets creation) to ensure understanding of set uniqueness and mutability.', 'Practice the "directional" language: "A minus B" means "in A, not in B".', 'Write a mini-quiz: given two sets, predict results of all four operations, then run code to verify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_010', difficulty: 'standard',
          question: 'A list of dictionaries is a nested data structure where each element of the.',
          hint: 'If stuck, revisit c12_cs_cbse_11_002 for list methods and c12_cs_cbse_11_006 for.',
          misconception: 'Students often write `data[0][\'name\'] = \'New\'` to update the first record\'s name, which is correct, but then they try.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to create a list containing two dictionaries, where each dictionary has keys \'id\' and \'score\' for two students?', answer: 'Correct answer: `students = [{\'id\': 1, \'score\': 85}, {\'id\': 2, \'score\': 92}]`',
                  options: ['Correct answer: `students = [{\'id\': 1, \'score\': 85}, {\'id\': 2, \'score\': 92}]`', 'a tuple of dictionaries is a list, or they confuse list and tuple syntax'],
                  hint: 'If stuck, revisit c12_cs_cbse_11_002 for list methods and c12_cs_cbse_11_006 for dictionary.',
                  misconception: 'Students often write `data[0][\'name\'] = \'New\'` to update the first record\'s name, which is correct, but then they try `data[\'name\'].' },
                { id: 'b', prompt: 'Given `data = [{\'name\': \'Priya\', \'marks\': [80, 90]}, {\'name\': \'Rohan\', \'marks\': [75, 85]}]`, what does `data[1][\'marks\'][0]` return and why?', answer: 'Correct answer: `75`',
                  options: ['Correct answer: `75`', 'dictionary keys have an order that affects the outer list'],
                  hint: 'If stuck, revisit c12_cs_cbse_11_002 for list methods and c12_cs_cbse_11_006 for dictionary.',
                  misconception: 'Students often write `data[0][\'name\'] = \'New\'` to update the first record\'s name, which is correct, but then they try `data[\'name\'].' }
          ],
            remediations: { 'students-often-write-data-0': { steps: ['Revisit c12_cs_cbse_11_001 (list creation) and c12_cs_cbse_11_005 (dictionary creation) to solidify base syntax.', 'Practice the "list index then dict key" pattern with a physical analogy: a filing cabinet (list) with folders (dicts).', 'Do 5 targeted exercises: create, access, update, delete, and loop.', 'Re-attempt Diagnostic Question 3 and 4; if still wrong, trace each step with `print` statements to see the intermediate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_011', difficulty: 'standard',
          question: 'Converting between data structures in Python refers to transforming data from.',
          hint: 'If stuck, revisit the constructor behavior of `list()`, `tuple()`, `set()`, `dict()`.',
          misconception: 'Students often believe that converting a list to a dictionary using `dict(my_list)` works directly if the list contains.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Converting between data structures in Python refers to transforming data from one',
                  options: ['Converting between data structures in Python refers to transforming data from one', 'A list in Python is an ordered, mutable sequence of heterogeneous elements enclosed in', 'List methods in Python are built-in functions that modify a list in-place or return', 'List comprehension is a concise syntactic construct in Python for creating new lists by'],
                  hint: 'If stuck, revisit the constructor behavior of `list()`, `tuple()`, `set()`, `dict()` by writing.',
                  misconception: 'Students often believe that converting a list to a dictionary using `dict(my_list)` works directly if the list contains alternating keys.' }
          ],
            remediations: { 'converting-a-list-to-a': { steps: ['Revisit **c12_cs_cbse_11_001** (Lists) and **c12_cs_cbse_11_004** (Tuples) to reinforce that `list()` and `tuple()`.', 'Revisit **c12_cs_cbse_11_005** (Dictionaries) and **c12_cs_cbse_11_006** (Dictionary Methods) to practice creating.', 'Write a 5-line script that converts a flat list `[\'a\',1,\'b\',2]` to a dictionary using `zip` and slicing, then prints.', 'Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_012', difficulty: 'standard',
          question: 'Searching is the algorithmic process of locating a target element within a data.',
          hint: 'If stuck on loop indices or swapping, revisit **c12_cs_cbse_11_001** (list indexing) and.',
          misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think.',
          parts: [
                { id: 'a', prompt: 'What is the worst-case time complexity of linear search on a list of size n, and what does it mean in practical terms for a list of 10,000 elements?', answer: 'Worst-case time complexity is O(n)',
                  options: ['Worst-case time complexity is O(n)', 'binary search is always faster than linear search', '**`list'],
                  hint: 'If stuck on loop indices or swapping, revisit **c12_cs_cbse_11_001** (list indexing) and.',
                  misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think **`list.sort()`.' },
                { id: 'b', prompt: 'Compare selection sort and insertion sort on a nearly sorted list of 1000 elements (only 5 elements out of place). Which is more efficient and why?', answer: 'Insertion sort is far more efficient on nearly sorted data',
                  options: ['Insertion sort is far more efficient on nearly sorted data', 'both are O(n²)', 'time complexity', 'best/average/worst'],
                  hint: 'If stuck on loop indices or swapping, revisit **c12_cs_cbse_11_001** (list indexing) and.',
                  misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think **`list.sort()`.' }
          ],
            remediations: { 'binary-search-is-always-faster': { steps: ['Revisit **c12_cs_cbse_11_001** (list indexing) and **c12_cs_cbse_11_003** (slicing) — trace `arr[low:high+1]` on paper.', 'For binary search, draw the list with `low`, `mid`, `high` pointers on a whiteboard; physically move them for 3.', 'For `sort()` vs `sorted()`, write two 3-line snippets in IDLE: `a=[3,1,2]; print(a.sort())` and `b=[3,1,2].', 'Re-diagnostic: Give an unsorted list of 8 elements; ask student to (a) linear search for a value, (b) sort then binary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
