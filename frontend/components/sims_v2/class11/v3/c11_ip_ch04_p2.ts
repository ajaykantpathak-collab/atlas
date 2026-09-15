import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch04_p2: SimDef = {
    id: 'v3_c11_ip_ch04_p2',
    title: 'Lists, Tuples and Dictionaries · Part 2/2',
    subtitle: 'Pick the container that can actually change its contents.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Lists, Tuples and Dictionaries · Part 2/2',
    chapters: ['c11_ip_ch04'],
    nodeIds: ['c11_ip_cbse_04_007', 'c11_ip_cbse_04_008', 'c11_ip_cbse_04_009', 'c11_ip_cbse_04_010', 'c11_ip_cbse_04_011', 'c11_ip_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data wrangler choosing the right container', intro: 'Name, roll number, five subject marks, a percentage — one variable, four types. Only one built-in holds all that.', goal: 'Use lists\' mutability, indexing and slicing — and know when a string can\'t do the job.' },
    discovery: {
        question: 'You must store \'ATCGATCG\' and later swap the third base for \'G\' — string or list?',
        options: ['List — strings are immutable so `dna[2] = \'G\'` fails; a list mutates in place', 'String — DNA is text, so text type is correct', 'Either — both mutate the same way', 'String — lists can\'t hold characters'],
        answer: 'List — strings are immutable so `dna[2] = \'G\'` fails; a list mutates in place',
        hook: 'And `list1 = list2` doesn\'t copy — it gives one list two names, so \'fixing\' list1 silently vandalises list2.',
    },
    teaching: [
        { title: 'Creating Tuples, Accessing Elements and Tuple Operations', text: 'A tuple is an ordered, immutable sequence of elements enclosed in parentheses () where elements are separated by commas; unlike lists, tuples cannot be modified after creation but support indexing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build a record list mixing name, ID and a nested marks list, change one field by index, then slice positions 2 to 5 cleanly.',
        labels: ['Creating Tuples, Accessing Elements', 'Tuple Methods: count', 'Introduction to Dictionaries: Key-Value', 'Creating Dictionaries and Accessing', 'Dictionary Methods: keys, values,', 'Traversing and Modifying Dictionaries'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_007', title: 'Creating Tuples, Accessing Elements and Tuple Operations',
          caseStudy: { intro: 'Imagine you\'re building a school timetable system where each period has a fixed subject-teacher-room combination that should never change accidentally — this.',
            decisions: [{ prompt: 'What is the correct syntax to create a single-element tuple containing only the integer 42, and why does the alternative without the comma.', options: [
                { text: 'The correct syntax is `(42,)`', outcome: 'The correct syntax is `(42,)` — the trailing comma is mandatory.' },
                { text: 'parentheses create tuples', outcome: 'Not quite — Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not.', reveals: 'parentheses-create-tuples-and-write' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_008', title: 'Tuple Methods: count and index with Examples',
          caseStudy: { intro: 'Imagine you have a tuple storing the daily temperatures (in °C) of a week: `temps = (32, 35, 32, 30, 28, 32, 29)`.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python t = (10, 20, 30, 20, 40) print(t.count(20), t.index(20)) ```', options: [
                { text: 'The output is `2 1`', outcome: 'The output is `2 1`. `count(20)` returns 2 because 20 appears twice.' },
                { text: 'find all', outcome: 'Not quite — Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because.', reveals: 'index-returns-the-last-occurrence' },
                { text: 'indexing starts at 1', outcome: 'Not quite — Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because.', reveals: 'index-returns-the-last-occurrence' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_009', title: 'Introduction to Dictionaries: Key-Value Pairs',
          caseStudy: { intro: 'Imagine you need to store contact information for your classmates: each name (unique) maps to a phone number.',
            decisions: [{ prompt: 'What are the two mandatory requirements for a valid dictionary key in Python, and why does Python enforce these requirements?', options: [
                { text: 'A dictionary key must be (1) immutable (int, float, string, tuple) and (2) unique within', outcome: 'A dictionary key must be (1) immutable (int, float, string, tuple) and (2) unique within that.' },
                { text: 'keys can be lists', outcome: 'Not quite — Students believe dictionary keys can be any data type including lists, sets, or other dictionaries.', reveals: 'dictionary-keys-can-be-any' },
                { text: 'duplicate keys are allowed', outcome: 'Not quite — Students believe dictionary keys can be any data type including lists, sets, or other dictionaries.', reveals: 'dictionary-keys-can-be-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_010', title: 'Creating Dictionaries and Accessing Values by Key',
          caseStudy: { intro: 'Imagine you\'re building a contact app for your phone - you need to store names and phone numbers so you can instantly look up a number by typing the name.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python student = {\'name\': \'Priya\', \'age\': 17, \'grade\': \'A\'} print(student[\'age\']).', options: [
                { text: 'Output: 17, \'A\', None', outcome: 'Output: 17, \'A\', None. The first two access existing keys directly and via get().' },
                { text: 'dictionary keys must be strings', outcome: 'Not quite — Students believe dictionary keys must be strings because all NCERT examples use string keys.', reveals: 'dictionary-keys-must-be-strings' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_011', title: 'Dictionary Methods: keys, values, items, get, update and del',
          caseStudy: { intro: 'Imagine you are building a contact book for your phone: each contact\'s name is a key and their phone number is the value.',
            decisions: [{ prompt: 'What does the expression `d.keys()` return for a dictionary `d`, and how does it behave if you later add a new key to `d`?', options: [
                { text: 'It returns a `dict_keys` view object that dynamically reflects the dictionary\'s keys', outcome: 'It returns a `dict_keys` view object that dynamically reflects the dictionary\'s keys.' },
                { text: 'it returns a static list', outcome: 'Not quite — Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are.', reveals: 'd' },
                { text: 'the method creates a snapshot rather than a live view', outcome: 'Not quite — Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are.', reveals: 'd' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_012', title: 'Traversing and Modifying Dictionaries Using Loops',
          caseStudy: { intro: 'Imagine you have a dictionary storing the prices of fruits in a grocery store: `{\'apple\': 120, \'banana\': 40, \'mango\': 80}`.',
            decisions: [{ prompt: 'What does the expression `for key in my_dict:` iterate over in Python 3.7+?', options: [
                { text: 'It iterates over the keys of `my_dict` in insertion order', outcome: 'It iterates over the keys of `my_dict` in insertion order. A wrong answer (e.g., "it iterates over.' },
                { text: 'it iterates over values', outcome: 'Not quite — Students often believe that `for key in dict:` allows them to freely add or delete keys inside the.', reveals: 'for-key-in-dict-allows' },
                { text: 'it iterates over key-value pairs', outcome: 'Not quite — Students often believe that `for key in dict:` allows them to freely add or delete keys inside the.', reveals: 'for-key-in-dict-allows' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a student record, a friend insists: \'Python lists are like arrays — one data type only, so [name, roll, marks] won\'t work.\' Later, `record2 = record1` \'copies\' the list, and `record1[5]` on a 5-element list surprises him with an error while `record1[0:100]` doesn\'t.',
            decisions: [{ prompt: 'What are the actual list rules?', options: [
                { text: 'Set him straight: lists are ordered, mutable AND heterogeneous — `[\'Raman\', 101, [85,90,78], 86.6]` is valid, with a nested list inside. `record2 = record1` binds a second name to the SAME list, not a copy — mutations appear in both. And indexing vs slicing differ: `record1[5]` crashes (valid indices 0–4), but slicing clips out-of-range bounds silently and returns a new list.', outcome: 'He can now store real mixed records safely: copies need slicing or .copy(), and slices forgive what indexes punish.' },
                { text: 'Agree on one-type lists — mixing types in one container must throw an error.', outcome: 'That\'s C/Java thinking: Python lists accept heterogeneous elements — a string, int, list and float can share one container.', reveals: 'lists-are-single-type' },
                { text: 'Expect `record1[0:100]` to crash like `record1[5]` — out of range is out of range.', outcome: 'Slicing is a range operation with automatic bounds clipping, not multiple indexing — it quietly returns what\'s available.', reveals: 'slicing-crashes-out-of-range' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'Ordered, mutable, heterogeneous — the list is Python\'s general-purpose record; learn where it ends and the string begins.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_007', difficulty: 'standard',
          question: 'A tuple is an ordered, immutable sequence of elements enclosed in parentheses.',
          hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with.',
          misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to create a single-element tuple containing only the integer 42, and why does the alternative without the comma fail?', answer: 'The correct syntax is `(42,)`',
                  options: ['The correct syntax is `(42,)`', 'parentheses create tuples'],
                  hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with `type()`.',
                  misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the actual constructor.' },
                { id: 'b', prompt: 'Given `t = (10, 20, 30, 40, 50)`, predict the output of `t[1:4]` and `t[-4:-1]` and explain whether they produce the same result.', answer: 'Both `t[1:4]` and `t[-4:-1]` produce `(20, 30, 40)`',
                  options: ['Both `t[1:4]` and `t[-4:-1]` produce `(20, 30, 40)`', 'parentheses create tuples'],
                  hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with `type()`.',
                  misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the actual constructor.' },
                { id: 'c', prompt: 'Write Python code to concatenate two tuples `coordinates = (10, 20)` and `dimensions = (100, 200)` into a new tuple `rect`, then repeat `rect` three times.', answer: '`rect = coordinates + dimensions` creates `(10, 20, 100, 200)` (length 4)',
                  options: ['`rect = coordinates + dimensions` creates `(10, 20, 100, 200)` (length 4)', 'parentheses create tuples'],
                  hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with `type()`.',
                  misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the actual constructor.' },
                { id: 'd', prompt: 'A student writes `t = (1, 2, 3); t[0] = 99` and gets a TypeError. They then try `t = t + (99,)` and it works.', answer: 'The first fails because tuples are immutable',
                  options: ['The first fails because tuples are immutable', 'tuples can\'t be changed at all', 'parentheses create tuples'],
                  hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with `type()`.',
                  misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the actual constructor.' }
          ],
            remediations: { 'parentheses-create-tuples-and-write': { steps: ['Have student type `(5)` and `(5,)` in shell, check `type()` of each — they\'ll see `<class \'int\'>` vs `<class \'tuple\'>`.', 'Demonstrate `t = (1,2); u = t; t += (3,); print(t, u)` — `t` becomes `(1,2,3)` but `u` remains `(1,2)`, proving new.', 'Contrast with `L = [1,2]; M = L; L.append(3); print(L, M)` — both show `[1,2,3]`, proving in-place mutation.', 'Make them write the "comma rule" on a sticky note: "One element? Add a comma. No comma? Not a tuple."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since tuples are immutable, they are always more memory-efficient than lists for storing the same data." Defend or refute with technical.', answer: 'The claim is generally true but not absolute',
                  options: ['The claim is generally true but not absolute', 'always', 'generally yes because', 'parentheses create tuples'],
                  hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with `type()`.',
                  misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the actual constructor.' },
                { id: 'b', prompt: 'Create a real-world scenario where using a tuple instead of a list prevents a logical bug, and write the tuple creation code with at least 3 elements of mixed.', answer: 'Scenario: Storing database connection config `(host, port, database)`',
                  options: ['Scenario: Storing database connection config `(host, port, database)`', 'parentheses create tuples'],
                  hint: 'Revisit c11_ip_cbse_04_006 and practice creating tuples of length 0, 1, 2, 3 with `type()`.',
                  misconception: 'Students believe "parentheses create tuples" and write `(x)` for single-element tuples, not realizing the comma is the actual constructor.' }
          ],
            remediations: { 'parentheses-create-tuples-and-write': { steps: ['Have student type `(5)` and `(5,)` in shell, check `type()` of each — they\'ll see `<class \'int\'>` vs `<class \'tuple\'>`.', 'Demonstrate `t = (1,2); u = t; t += (3,); print(t, u)` — `t` becomes `(1,2,3)` but `u` remains `(1,2)`, proving new.', 'Contrast with `L = [1,2]; M = L; L.append(3); print(L, M)` — both show `[1,2,3]`, proving in-place mutation.', 'Make them write the "comma rule" on a sticky note: "One element? Add a comma. No comma? Not a tuple."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_008', difficulty: 'standard',
          question: 'Tuple methods `count()` and `index()` are built-in operations that allow.',
          hint: 'Revisit c11_ip_cbse_04_007 (Creating Tuples, Accessing Elements and Tuple Operations) and.',
          misconception: 'Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because they confuse.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python t = (10, 20, 30, 20, 40) print(t.count(20), t.index(20)) ```', answer: 'The output is `2 1`',
                  options: ['The output is `2 1`', 'find all', 'indexing starts at 1', '`count` returns the index of the first occurrence'],
                  hint: 'Revisit c11_ip_cbse_04_007 (Creating Tuples, Accessing Elements and Tuple Operations) and practice.',
                  misconception: 'Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because they confuse it with "find all".' },
                { id: 'b', prompt: 'Explain in your own words what happens when `index()` is called with an element that does not exist in the tuple, and why this behaviour is different from.', answer: '`index()` raises a `ValueError` exception, halting the program unless caught',
                  options: ['`index()` raises a `ValueError` exception, halting the program unless caught', 'find all'],
                  hint: 'Revisit c11_ip_cbse_04_007 (Creating Tuples, Accessing Elements and Tuple Operations) and practice.',
                  misconception: 'Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because they confuse it with "find all".' },
                { id: 'c', prompt: 'Given `data = (\'a\', \'b\', \'a\', \'c\', \'a\')`, write a single statement that prints the index of the *second* occurrence of `\'a\'` without using a loop.', answer: '`print(data.index(\'a\', data.index(\'a\') + 1))` → outputs `2`',
                  options: ['`print(data.index(\'a\', data.index(\'a\') + 1))` → outputs `2`', 'find all'],
                  hint: 'Revisit c11_ip_cbse_04_007 (Creating Tuples, Accessing Elements and Tuple Operations) and practice.',
                  misconception: 'Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because they confuse it with "find all".' },
                { id: 'd', prompt: 'Compare the time complexity of `count(x)` and `index(x)` on a tuple of length *n* where *x* is not present. Which is faster in practice and why?', answer: 'Both are O(*n*) worst-case',
                  options: ['Both are O(*n*) worst-case', 'find all'],
                  hint: 'Revisit c11_ip_cbse_04_007 (Creating Tuples, Accessing Elements and Tuple Operations) and practice.',
                  misconception: 'Students believe `index()` returns the *last* occurrence or *all* occurrences of an element because they confuse it with "find all".' }
          ],
            remediations: { 'index-returns-the-last-occurrence': { steps: ['Show the student the exact error: run `t = (5, 5, 5); print(t.index(5))` and point out the single integer 0.', 'Contrast with `t.count(5)` returning 3 to highlight "frequency vs.', 'Ask them to write a one-liner using a list comprehension to get *all* indices: `[i for i, v in enumerate(t) if v == 5]`.', 'Emphasise that `index()` is a scalar search, not a collection builder, and the `ValueError` on missing elements proves.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_009', difficulty: 'standard',
          question: 'A dictionary in Python is an ordered, mutable collection of key-value pairs.',
          hint: 'Revisit tuple immutability (c11_ip_cbse_04_006) and list indexing (c11_ip_cbse_04_002).',
          misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: How does dictionary key-based access fundamentally differ from list index-based access in terms of (a) lookup mechanism, (b) semantic.', answer: 'lookup mechanism, (',
                  options: ['lookup mechanism, (', 'both use indices', 'both raise the same error', 'values can be anything'],
                  hint: 'Revisit tuple immutability (c11_ip_cbse_04_006) and list indexing (c11_ip_cbse_04_002) to contrast.',
                  misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can be anything." They.' }
          ],
            remediations: { 'dictionary-keys-can-be-any': { steps: ['Show the TypeError with `d = {[]: "value"}` and ask: "What happens if the list inside the key changes later?" Guide.', 'Demonstrate `hash([1,2])` → TypeError vs `hash((1,2))` → integer.', 'Have them create a dictionary with tuple keys: `{(1,2): "pair", (3,4): "another"}`.', 'Contrast with `{"a": 1, "b": 1}` to prove duplicate values are allowed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_010', difficulty: 'standard',
          question: 'A dictionary in Python is a mutable, ordered collection of key-value pairs.',
          hint: 'Review Class 9 Mathematics Chapter 1 (Coordinate Geometry) - specifically the concept.',
          misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python student = {\'name\': \'Priya\', \'age\': 17, \'grade\': \'A\'} print(student[\'age\']).', answer: 'Output: 17, \'A\', None',
                  options: ['Output: 17, \'A\', None', 'dictionary keys must be strings'],
                  hint: 'Review Class 9 Mathematics Chapter 1 (Coordinate Geometry) - specifically the concept of ordered.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' },
                { id: 'b', prompt: 'Explain why the following code raises a TypeError, and how to fix it: ```python data = {[1, 2]: \'coordinates\', \'name\': \'point\'} ```', answer: 'Lists are mutable and unhashable, so they cannot be dictionary keys',
                  options: ['Lists are mutable and unhashable, so they cannot be dictionary keys', 'keys must be strings', 'dictionary keys must be strings'],
                  hint: 'Review Class 9 Mathematics Chapter 1 (Coordinate Geometry) - specifically the concept of ordered.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' },
                { id: 'c', prompt: 'Compare the behavior and use cases of `dict[key]` versus `dict.get(key)` versus `key in dict`. Provide a scenario where each is preferred.', answer: '`dict[key]`: raises KeyError if missing',
                  options: ['`dict[key]`: raises KeyError if missing', 'dictionary keys must be strings'],
                  hint: 'Review Class 9 Mathematics Chapter 1 (Coordinate Geometry) - specifically the concept of ordered.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' }
          ],
            remediations: { 'dictionary-keys-must-be-strings': { steps: ['Show the student: `d = {1: \'int key\', \'1\': \'str key\', (1,2): \'tuple key\'}; print(d[1], d[\'1\'], d[(1,2)])` - demonstrate.', 'Have them predict and test: `d = {}; d[[1,2]] = \'fail\'` → TypeError.', 'Explain: "Lists are mutable, so their hash can change, breaking dictionary lookup.', 'That\'s why only immutable objects can be keys." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_011', difficulty: 'standard',
          question: 'Dictionary methods in Python are built-in functions that allow manipulation and.',
          hint: 'Revisit c11_ip_cbse_04_010 (Creating Dictionaries and Accessing Values by Key) and.',
          misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the.',
          parts: [
                { id: 'a', prompt: 'Explain why `d.get(\'missing_key\')` is safer than `d[\'missing_key\']` when the key might not exist in dictionary `d`.', answer: '`d[\'missing_key\']` raises a `KeyError` and stops the program, while',
                  options: ['`d[\'missing_key\']` raises a `KeyError` and stops the program, while', 'both return None', '`d.keys()`, `d'],
                  hint: 'Revisit c11_ip_cbse_04_010 (Creating Dictionaries and Accessing Values by Key) and practice.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' },
                { id: 'b', prompt: 'Given `d = {\'a\': 1, \'b\': 2}` and `e = {\'b\': 3, \'c\': 4}`, write the code to merge `e` into `d` so that `d` becomes `{\'a\': 1, \'b\': 3, \'c\': 4}`.', answer: '`d.update(e)` merges `e` into `d`',
                  options: ['`d.update(e)` merges `e` into `d`', 'd becomes {\'a\':1, \'b\':2, \'c\':4}', '`update` preserves existing keys instead of overwriting them', '`d.keys()`, `d'],
                  hint: 'Revisit c11_ip_cbse_04_010 (Creating Dictionaries and Accessing Values by Key) and practice.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' },
                { id: 'c', prompt: 'Compare the output of `list(d.items())` and `list(d.keys())` for `d = {\'x\': 10, \'y\': 20}`. What data structure does each produce, and how are they related?', answer: '`d.items()` produces a list of tuples `[(\'x\', 10), (\'y\', 20)]`',
                  options: ['`d.items()` produces a list of tuples `[(\'x\', 10), (\'y\', 20)]`', 'both produce lists of keys', '`d.keys()`, `d'],
                  hint: 'Revisit c11_ip_cbse_04_010 (Creating Dictionaries and Accessing Values by Key) and practice.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' }
          ],
            remediations: { 'd': { steps: ['In the Python shell, create `d = {\'a\':1}` and assign `k = d.keys()`.', 'Print `k` and note the type (`dict_keys`).', 'Add `d[\'b\'] = 2` and print `k` again — observe `\'b\'` appears without re-calling `keys()`.', 'Explain: "The view is a live window into the dictionary, not a photograph." 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_012', difficulty: 'standard',
          question: 'Traversing a dictionary using loops means systematically visiting each.',
          hint: 'Revisit `c11_ip_cbse_04_011` Dictionary Methods to practice `keys()`, `values()`.',
          misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the.',
          parts: [
                { id: 'a', prompt: 'What does the expression `for key in my_dict:` iterate over in Python 3.7+?', answer: 'It iterates over the keys of `my_dict` in insertion order',
                  options: ['It iterates over the keys of `my_dict` in insertion order', 'it iterates over values', 'it iterates over key-value pairs', 'the loop just goes through the dictionary'],
                  hint: 'Revisit `c11_ip_cbse_04_011` Dictionary Methods to practice `keys()`, `values()`, `items()` and.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' },
                { id: 'b', prompt: 'Given `marks = {\'Physics\': 85, \'Chemistry\': 92, \'Maths\': 78}`, write a loop that creates a new dictionary `high_marks` containing only subjects with marks ≥ 90.', answer: '```python high_marks = {} for subject, mark in marks.items(): if mark >= 90:',
                  options: ['```python high_marks = {} for subject, mark in marks.items(): if mark >= 90:', 'the loop just goes through the dictionary'],
                  hint: 'Revisit `c11_ip_cbse_04_011` Dictionary Methods to practice `keys()`, `values()`, `items()` and.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' },
                { id: 'c', prompt: 'Compare the memory and performance implications of these two traversal methods for a dictionary with 10,000 items: Method A: `for k in d: print(d[k])` Method.', answer: 'Method B is more efficient',
                  options: ['Method B is more efficient', 'the loop just goes through the dictionary'],
                  hint: 'Revisit `c11_ip_cbse_04_011` Dictionary Methods to practice `keys()`, `values()`, `items()` and.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' }
          ],
            remediations: { 'for-key-in-dict-allows': { steps: ['Show the exact `RuntimeError` by running the problematic code in the interpreter.', 'Explain that the iterator holds a reference to the dictionary\'s internal state; adding/removing keys reshuffles the.', 'Demonstrate the fix: `for k in list(d.keys()):` creates a static snapshot of keys, allowing safe deletion/insertion.', 'Have the student rewrite three buggy loops (one deletion, one insertion, one mixed) using the `list(keys())` pattern.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
