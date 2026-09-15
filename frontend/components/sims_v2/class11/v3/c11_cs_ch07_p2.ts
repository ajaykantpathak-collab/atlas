import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch07_p2: SimDef = {
    id: 'v3_c11_cs_ch07_p2',
    title: 'Tuples and Dictionaries · Part 2/3',
    subtitle: 'Use tuples for data that must not move — and learn that it\'s the comma, not the bracket, that seals it.',
    classLevel: 11, subject: 'computer_science', topic: 'Tuples and Dictionaries · Part 2/3',
    chapters: ['c11_cs_ch07'],
    nodeIds: ['c11_cs_cbse_07_007', 'c11_cs_cbse_07_008', 'c11_cs_cbse_07_009', 'c11_cs_cbse_07_010', 'c11_cs_cbse_07_011', 'c11_cs_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer guarding data that must stay constant', intro: 'Twelve sales targets, fixed all year. Choose a container that makes \'unchangeable\' a feature, not a hope.', goal: 'Create, index and slice tuples and justify immutability as a design choice.' },
    discovery: {
        question: 'You write t = (5) expecting a one-item tuple — but type(t) says int. What actually makes a tuple?',
        options: ['The comma — (5,) is a tuple; parentheses only group', 'The parentheses — but only with two or more items', 'The tuple() constructor — nothing else counts', 'Square brackets are required for single items'],
        answer: 'The comma — (5,) is a tuple; parentheses only group',
        hook: 'Parentheses are decoration; the comma is the signature. Even t = 1, 2, 3 is a tuple.',
    },
    teaching: [
        { title: 'Introduction to Dictionaries in Python', text: 'A dictionary in Python is an unordered, mutable collection of key-value pairs where each unique key maps to exactly one value, enabling fast lookup, insertion, and deletion based on keys rather than.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Store the RGB triple (255, 153, 51), slice out (30, 40) using negative indices, then argue tuple over list for twelve fixed monthly targets.',
        labels: ['Introduction to Dictionaries', 'Creating Dictionaries and Accessing', 'Dictionary Operations: Adding, Modifying,', 'Dictionary Methods: keys, values,', 'Traversing a Dictionary Using', 'Nested Dictionaries with Examples'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_007', title: 'Introduction to Dictionaries in Python',
          caseStudy: { intro: 'Imagine you need to store the contact numbers of 50 students. Using a list, you\'d have to remember that index 0 is Amit, index 1 is Priya — but what if you.',
            decisions: [{ prompt: 'What are the two mandatory characteristics of a valid dictionary key in Python, and why is a list not allowed as a key?', options: [
                { text: 'A valid key must be **hashable** and **immutable** (e.g., str, int, float, tuple of', outcome: 'A valid key must be **hashable** and **immutable** (e.g., str, int, float, tuple of immutables).' },
                { text: 'they\'re just containers', outcome: 'Not quite — Students often think **dictionary keys can be any data type**, especially lists or dictionaries.', reveals: 'dictionary-keys-can-be-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_008', title: 'Creating Dictionaries and Accessing Values',
          caseStudy: { intro: 'Imagine you are building a contact list for your phone where each friend\'s name maps to their phone number.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python d = {"Physics": 85, "Chemistry": 90, "Math": 95} print(d["Physics"]).', options: [
                { text: 'Output: ``` 85 None Not Found ```', outcome: 'Output: ``` 85 None Not Found ``` A wrong answer (e.g., thinking `d.get("Biology")` raises an error.' },
                { text: 'Biology', outcome: 'Not quite — Students believe dictionary keys maintain insertion order and can be accessed by integer index like.', reveals: 'dictionary-keys-maintain-insertion-order' },
                { text: 'Not Found', outcome: 'Not quite — Students believe dictionary keys maintain insertion order and can be accessed by integer index like.', reveals: 'dictionary-keys-maintain-insertion-order' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_009', title: 'Dictionary Operations: Adding, Modifying, Deleting',
          caseStudy: { intro: 'Imagine you are building a contact book app for your phone. You start with an empty dictionary. First, you need to **add** a new friend\'s name and number.',
            decisions: [{ prompt: 'What is the output of the following code? ```python d = {\'a\': 1, \'b\': 2} d[\'c\'] = 3 d[\'a\'] = 10 del d[\'b\'] print(d) ```', options: [
                { text: 'Correct answer: `{\'a\': 10, \'c\': 3}`', outcome: 'Correct answer: `{\'a\': 10, \'c\': 3}`. A wrong answer like `{\'a\': 1, \'b\': 2, \'c\': 3}` reveals the.' },
                { text: 'assignment only adds and never modifies', outcome: 'Not quite — Students believe that `dict[key] = value` **always adds** a new key-value pair.', reveals: 'dict-key-value-always-adds' },
                { text: '`dict[key] = value` **always adds** a new key-value pair', outcome: 'Not quite — Students believe that `dict[key] = value` **always adds** a new key-value pair.', reveals: 'dict-key-value-always-adds' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_010', title: 'Dictionary Methods: keys, values, items, get, update',
          caseStudy: { intro: 'Imagine you\'re building a student grade tracker for your class: you have a dictionary `grades = {"Aarav": 85, "Meera": 92, "Rohan": 78}` and need to (a) print.',
            decisions: [{ prompt: 'What is the return type of `d.keys()` for a dictionary `d` in Python 3, and how does it behave when a new key-value pair is added to `d`.', options: [
                { text: '`d.keys()` returns a `dict_keys` view object (not a list)', outcome: '`d.keys()` returns a `dict_keys` view object (not a list). This view is dynamic: if a new key.' },
                { text: 'it returns a list', outcome: 'Not quite — Students believe `d.keys()`, `d.values()`, `d.items()` return **lists** (like in Python 2), so they.', reveals: 'd' },
                { text: 'it doesn\'t update', outcome: 'Not quite — Students believe `d.keys()`, `d.values()`, `d.items()` return **lists** (like in Python 2), so they.', reveals: 'd' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_012', title: 'Nested Dictionaries with Examples',
          caseStudy: { intro: 'Imagine your school wants to store each student\'s marks for multiple subjects, where each subject has both theory and practical scores.',
            decisions: [{ prompt: 'What is the correct syntax to access the practical marks of \'Chemistry\' for student with roll number 102 in a nested dictionary `marks`.', options: [
                { text: 'The correct syntax is `marks[102][\'Chemistry\'][\'practical\']`', outcome: 'The correct syntax is `marks[102][\'Chemistry\'][\'practical\']`. A wrong answer like.' },
                { text: 'the inner-most key comes first', outcome: 'Not quite — Students believe that `outer_dict[key]` automatically creates an inner dictionary if it doesn\'t.', reveals: 'outer-dict-key-automatically-creates' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a robotics-club tracker you store each fixed coordinate as a tuple `point = (x, y, tags_list)` — coordinates immutable, but the third slot holds a list of tags. A teammate warns: \'Tuples are immutable, so `point[2].append("obstacle")` will crash — the whole object graph is frozen.\'',
            decisions: [{ prompt: 'Will that append work?', options: [
                { text: 'Yes — it works. Tuple immutability freezes the container\'s references (you can\'t reassign point[2] to a different list), but the list object inside stays mutable and can be appended to. Container immutability ≠ content immutability.', outcome: 'The tuple guarantees \'always the same three slots\', not \'frozen contents\' — a mutable object inside a tuple can still change.' },
                { text: 'It crashes — immutable means nothing reachable through the tuple can change.', outcome: 'That over-reads immutability: only the tuple\'s own slots are locked; the objects they point to keep their own mutability rules.', reveals: 'tuple-freezes-everything' },
                { text: 'It works because tuples aren\'t really immutable — that\'s just a convention.', outcome: 'Wrong reason: try `point[0] = 5` and TypeError fires — the tuple IS immutable; the append succeeds only because the inner list is separately mutable.', reveals: 'tuples-arent-really-immutable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'A tuple is a sealed envelope — read anything inside, change nothing, and let the seal itself signal \'fixed.\'',
            decisions: [{ prompt: 'What comes next? Tuples and Dictionaries · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tuples and Dictionaries · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_007', difficulty: 'standard',
          question: 'A dictionary in Python is an unordered, mutable collection of key-value pairs.',
          hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability and its Implications) — focus on the "why".',
          misconception: 'Students often think **dictionary keys can be any data type**, especially lists or dictionaries, because "they\'re just.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why dictionaries are called "mappings" and how this differs from sequences like lists and tuples.', answer: 'Dictionaries map **arbitrary keys** to values (key → value), while sequences map',
                  options: ['Dictionaries map **arbitrary keys** to values (key → value), while sequences map', 'they\'re just containers'],
                  hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability and its Implications) — focus on the "why" behind.',
                  misconception: 'Students often think **dictionary keys can be any data type**, especially lists or dictionaries, because "they\'re just containers." They.' }
          ],
            remediations: { 'dictionary-keys-can-be-any': { steps: ['Show the error: `d = {[1,2]: "test"}` → `TypeError`.', 'Ask: "What happens if we modify the list after using it as a key?" → `key.append(3)`.', 'Explain: "The dictionary stored the key\'s **hash** at insertion.', 'If the list changes, its hash changes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **dictionary keys can be any data type**, especially lists or dictionaries, because "they\'re just.',
          parts: [
                { id: 'a', prompt: 'A student writes `marks = {["math", "science"]: 95}` and gets a `TypeError`.', answer: 'The argument is **invalid**',
                  options: ['The argument is **invalid**', 'similar structure', 'same semantic guarantees', 'they\'re just containers'],
                  hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability and its Implications) — focus on the "why" behind.',
                  misconception: 'Students often think **dictionary keys can be any data type**, especially lists or dictionaries, because "they\'re just containers." They.' }
          ],
            remediations: { 'dictionary-keys-can-be-any': { steps: ['Show the error: `d = {[1,2]: "test"}` → `TypeError`.', 'Ask: "What happens if we modify the list after using it as a key?" → `key.append(3)`.', 'Explain: "The dictionary stored the key\'s **hash** at insertion.', 'If the list changes, its hash changes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_008', difficulty: 'standard',
          question: 'A dictionary in Python is an unordered, mutable collection of key-value pairs.',
          hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability) to understand hashability, and.',
          misconception: 'Students believe dictionary keys maintain insertion order and can be accessed by integer index like lists (e.g., `d[0]`.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python d = {"Physics": 85, "Chemistry": 90, "Math": 95} print(d["Physics"]) print(d.get("Biology")).', answer: 'Output: ``` 85 None Not Found ```',
                  options: ['Output: ``` 85 None Not Found ```', 'Biology', 'Not Found', '`d.get("Biology'],
                  hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability) to understand hashability, and c11_cs_cbse_07_007.',
                  misconception: 'Students believe dictionary keys maintain insertion order and can be accessed by integer index like lists (e.g., `d[0]` to get the first.' },
                { id: 'b', prompt: 'Explain why the following dictionary creation raises a TypeError, and how to fix it: ```python d = {["name", "age"]: "student"} ```', answer: 'Lists are mutable and unhashable, so they cannot be used as dictionary keys',
                  options: ['Lists are mutable and unhashable, so they cannot be used as dictionary keys', 'keys must be strings'],
                  hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability) to understand hashability, and c11_cs_cbse_07_007.',
                  misconception: 'Students believe dictionary keys maintain insertion order and can be accessed by integer index like lists (e.g., `d[0]` to get the first.' },
                { id: 'c', prompt: 'Given the dictionary `marks = {"English": 78, "Hindi": 82, "Science": 88}`, write code to safely print the marks for "Social" without raising an error, and.', answer: '```python print(marks.get("Social", "Subject not enrolled")) ```',
                  options: ['```python print(marks.get("Social", "Subject not enrolled")) ```', 'Social', 'Subject not enrolled'],
                  hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability) to understand hashability, and c11_cs_cbse_07_007.',
                  misconception: 'Students believe dictionary keys maintain insertion order and can be accessed by integer index like lists (e.g., `d[0]` to get the first.' },
                { id: 'd', prompt: 'Compare the three dictionary creation methods below. Which creates an empty dictionary?', answer: '- `d1 = {}` creates an empty dictionary',
                  options: ['- `d1 = {}` creates an empty dictionary', '`fromkeys` requires a tuple of tuples'],
                  hint: 'Revisit c11_cs_cbse_07_005 (Tuple Immutability) to understand hashability, and c11_cs_cbse_07_007.',
                  misconception: 'Students believe dictionary keys maintain insertion order and can be accessed by integer index like lists (e.g., `d[0]` to get the first.' }
          ],
            remediations: { 'dictionary-keys-maintain-insertion-order': { steps: ['Show the student: `d = {"a": 1, "b": 2}; print(d[0])` → KeyError: 0.', 'Explain: "0 is a key, not an index." 2.', 'Have them run: `print(list(d.keys())[0])` and `print(next(iter(d)))` to see correct ways to get the first key.', 'Give a mini-exercise: "Create a dictionary with keys 0, 1, 2 and values \'zero\', \'one\', \'two\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_009', difficulty: 'standard',
          question: 'Dictionary operations for adding, modifying, and deleting refer to the mutator.',
          hint: 'Revisit c11_cs_cbse_07_008: practice creating dictionaries and accessing values with.',
          misconception: 'Students believe that `dict[key] = value` **always adds** a new key-value pair.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python d = {\'a\': 1, \'b\': 2} d[\'c\'] = 3 d[\'a\'] = 10 del d[\'b\'] print(d) ```', answer: 'Correct answer: `{\'a\': 10, \'c\': 3}`',
                  options: ['Correct answer: `{\'a\': 10, \'c\': 3}`', 'assignment only adds and never modifies', '`dict[key] = value` **always adds** a new key-value pair'],
                  hint: 'Revisit c11_cs_cbse_07_008: practice creating dictionaries and accessing values with square.',
                  misconception: 'Students believe that `dict[key] = value` **always adds** a new key-value pair.' },
                { id: 'b', prompt: 'Explain the difference between `del d[\'x\']` and `d.pop(\'x\')` when the key `\'x\'` exists in dictionary `d`. What happens in each case if `\'x\'` does **not** exist?', answer: 'Correct answer: Both remove the key-value pair',
                  options: ['Correct answer: Both remove the key-value pair', '`dict[key] = value` **always adds** a new key-value pair'],
                  hint: 'Revisit c11_cs_cbse_07_008: practice creating dictionaries and accessing values with square.',
                  misconception: 'Students believe that `dict[key] = value` **always adds** a new key-value pair.' },
                { id: 'c', prompt: 'Write a single line of code to add a key `\'score\'` with value `95` to dictionary `student` only if `\'score\'` is not already present. Do not use `if` statements.', answer: 'Correct answer: `student.setdefault(\'score\', 95)`',
                  options: ['Correct answer: `student.setdefault(\'score\', 95)`', '`dict[key] = value` **always adds** a new key-value pair'],
                  hint: 'Revisit c11_cs_cbse_07_008: practice creating dictionaries and accessing values with square.',
                  misconception: 'Students believe that `dict[key] = value` **always adds** a new key-value pair.' },
                { id: 'd', prompt: 'Given `d = {\'x\': 10, \'y\': 20}`, what is the result of `d.pop(\'z\', 0)`? What does the dictionary look like after?', answer: 'Correct answer: Returns `0` (the default)',
                  options: ['Correct answer: Returns `0` (the default)', '`dict[key] = value` **always adds** a new key-value pair'],
                  hint: 'Revisit c11_cs_cbse_07_008: practice creating dictionaries and accessing values with square.',
                  misconception: 'Students believe that `dict[key] = value` **always adds** a new key-value pair.' }
          ],
            remediations: { 'dict-key-value-always-adds': { steps: ['Ask the student to predict the output of `d = {\'a\':1}; d[\'a\']=2; print(d)` — they will likely say `{\'a\':1, \'a\':2}`.', 'Show them the actual output `{\'a\':2}` and explain keys are unique.', 'Have them run `d = {}; d[\'x\']=10; print(d.pop(\'x\'))` and `print(d.pop(\'y\', \'missing\'))` to see `pop()` returns the.', 'Give a trace table exercise: list each operation, the key, the action (add/modify/delete), and the resulting dictionary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_010', difficulty: 'standard',
          question: 'Dictionary methods `keys()`, `values()`, `items()`, `get()`, and `update()`.',
          hint: 'Revisit node c11_cs_cbse_07_008 (Creating Dictionaries and Accessing Values).',
          misconception: 'Students believe `d.keys()`, `d.values()`, `d.items()` return **lists** (like in Python 2), so they write `d.keys()[0]`.',
          parts: [
                { id: 'a', prompt: 'What is the return type of `d.keys()` for a dictionary `d` in Python 3, and how does it behave when a new key-value pair is added to `d` after the view.', answer: '`d.keys()` returns a `dict_keys` view object (not a list)',
                  options: ['`d.keys()` returns a `dict_keys` view object (not a list)', 'it returns a list', 'it doesn\'t update', '`d.keys()`, `d'],
                  hint: 'Revisit node c11_cs_cbse_07_008 (Creating Dictionaries and Accessing Values) — specifically.',
                  misconception: 'Students believe `d.keys()`, `d.values()`, `d.items()` return **lists** (like in Python 2), so they write `d.keys()[0]` (TypeError.' },
                { id: 'b', prompt: 'You have `inventory = {"apples": 50, "bananas": 30}`. You receive a shipment as a list of tuples: `shipment = [("apples", 20), ("oranges", 40), ("bananas".', answer: '`inventory.update(shipment)` merges the list of tuples',
                  options: ['`inventory.update(shipment)` merges the list of tuples', 'apples', '`d.keys()`, `d'],
                  hint: 'Revisit node c11_cs_cbse_07_008 (Creating Dictionaries and Accessing Values) — specifically.',
                  misconception: 'Students believe `d.keys()`, `d.values()`, `d.items()` return **lists** (like in Python 2), so they write `d.keys()[0]` (TypeError.' },
                { id: 'c', prompt: 'Consider this code: ```python d = {"x": 1, "y": 2} v = d.values() d["z"] = 3 print(list(v)) ``` What is printed?', answer: 'First snippet prints `[1, 2, 3]`',
                  options: ['First snippet prints `[1, 2, 3]`', '`d.keys()`, `d'],
                  hint: 'Revisit node c11_cs_cbse_07_008 (Creating Dictionaries and Accessing Values) — specifically.',
                  misconception: 'Students believe `d.keys()`, `d.values()`, `d.items()` return **lists** (like in Python 2), so they write `d.keys()[0]` (TypeError.' }
          ],
            remediations: { 'd': { steps: ['list confusion**: Open Python shell, run `d = {"a": 1}; k = d.keys(); print(type(k)); d["b"] = 2; print(k)` — observe.', 'Then run `lk = list(d.keys()); d["c"] = 3; print(lk)` — observe static list.', 'Have student articulate: "view = live window, list = frozen photo".', '**For `get()` misuse**: Give a trace exercise: `d = {}; print(d.get("x")); print(d.get("x", 0)); print(d["x"])`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_011', difficulty: 'standard',
          question: 'Traversing a dictionary using loops is the process of systematically accessing.',
          hint: 'If stuck, revisit dictionary methods `keys()`, `values()`, `items()` (node.',
          misconception: 'Students often believe that iterating over a dictionary with `for x in d:` yields key-value pairs, or that the loop.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between `for k in d.keys():` and `for k, v in d.items():` when `d = {"x": 10, "y": 20}`.', answer: 'In `for k in d.keys():`, `k` takes on each key (`"x"` then `"y"`)',
                  options: ['In `for k in d.keys():`, `k` takes on each key (`"x"` then `"y"`)', 'says both loops behave identically or that `d'],
                  hint: 'If stuck, revisit dictionary methods `keys()`, `values()`, `items()` (node c11_cs_cbse_07_010) and.',
                  misconception: 'Students often believe that iterating over a dictionary with `for x in d:` yields key-value pairs, or that the loop variable in `for v.' }
          ],
            remediations: { 'iterating-over-a-dictionary-with': { steps: ['Have the student write a tiny dictionary `d = {"a": 1}` and run `for x in d: print(x, type(x))` to see that `x` is.', 'Then run `for x in d.items(): print(x, type(x))` to see that `x` is a tuple.', 'Demonstrate the mutation error: `for k in d: d["new"] = 99` crashes; explain that you cannot change the dictionary\'s.', 'Show the correct pattern for updating values: `for k in d: d[k] *= 2` works because we are not adding/removing keys.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_012', difficulty: 'standard',
          question: 'A nested dictionary is a dictionary data structure where one or more values are.',
          hint: 'Revisit dictionary traversal (c11_cs_cbse_07_011) and practice writing loops that access.',
          misconception: 'Students believe that `outer_dict[key]` automatically creates an inner dictionary if it doesn\'t exist (like defaultdict.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to access the practical marks of \'Chemistry\' for student with roll number 102 in a nested dictionary `marks` where the structure.', answer: 'The correct syntax is `marks[102][\'Chemistry\'][\'practical\']`',
                  options: ['The correct syntax is `marks[102][\'Chemistry\'][\'practical\']`', 'the inner-most key comes first'],
                  hint: 'Revisit dictionary traversal (c11_cs_cbse_07_011) and practice writing loops that access both keys.',
                  misconception: 'Students believe that `outer_dict[key]` automatically creates an inner dictionary if it doesn\'t exist (like defaultdict behavior).' },
                { id: 'b', prompt: 'Explain why the following code raises a KeyError: `student_db = {}; student_db[101][\'Math\'] = 95`', answer: 'The code raises KeyError',
                  options: ['The code raises KeyError', '101 is not a valid key'],
                  hint: 'Revisit dictionary traversal (c11_cs_cbse_07_011) and practice writing loops that access both keys.',
                  misconception: 'Students believe that `outer_dict[key]` automatically creates an inner dictionary if it doesn\'t exist (like defaultdict behavior).' }
          ],
            remediations: { 'outer-dict-key-automatically-creates': { steps: ['Show the exact error: run `d = {}; d[1][\'a\'] = 5` and point to `KeyError: 1`.', 'Explain evaluation order: `d[1]` is evaluated FIRST — it must exist before we can index into it.', 'Demonstrate the fix: `d[1] = {}` then `d[1][\'a\'] = 5`, or `d.setdefault(1, {})[\'a\'] = 5`.', 'Practice with a 3-level example: `school = {}; school.setdefault(\'11A\', {}).setdefault(\'Physics\', {})[\'theory\'] = 85`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
