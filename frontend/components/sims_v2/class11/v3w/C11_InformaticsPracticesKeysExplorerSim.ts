import type { SimDef } from '../../engine/types';
import C11_InformaticsPracticesKeysExplorerSim from '../../../simulations/c6_12/C11_InformaticsPracticesKeysExplorerSim';

/** v3 wrapped master — C11_InformaticsPracticesKeysExplorerSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_informaticspracticeskeysexplorersim: SimDef = {
    id: 'v3w_c11_informaticspracticeskeysexplorersim',
    title: 'Introduction to Dictionaries: Key-Value Pairs',
    subtitle: 'This node covers dictionary concept, key-value pair structure, key constraints (unique,.',
    classLevel: 11, subject: 'science', topic: 'Introduction to Dictionaries: Key-Value Pairs',
    chapters: [],
    nodeIds: ['c11_ip_cbse_04_009', 'c11_ip_cbse_04_010', 'c11_ip_cbse_04_011', 'c11_ip_cbse_04_012', 'c11_ip_cbse_07_001', 'c11_ip_cbse_07_002', 'c11_ip_cbse_07_003', 'c11_ip_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you need to store contact information for your classmates: each name (unique) maps to a phone number.', goal: 'Master Introduction to Dictionaries: Key-Value Pairs.' },
    discovery: {
        question: 'Compare and contrast: How does dictionary key-based access fundamentally differ from list index-based access in terms of (a) lookup mechanism, (b) semantic.',
        options: ['lookup mechanism, (', 'both use indices', 'both raise the same error'],
        answer: 'lookup mechanism, (',
        hook: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can.',
    },
    teaching: [
        { title: 'A dictionary in Python is an ordered,.', text: 'A dictionary in Python is an ordered, mutable collection of key-value pairs where each unique immutable key maps to exactly one value, enabling direct access to values via their associated keys.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ip_cbse_04_009', title: 'A dictionary in Python is an ordered,.',
          scaffold: { problem: 'Create a dictionary `menu` for a café where keys are item names (strings) and values are prices in ₹ (integers).',
            steps: [
            { text: 'Identify the required dictionary structure—keys are strings (item names), values are integers (prices in ₹).' },
            { text: 'Create initial dictionary with three items using curly braces and colon-separated key-value pairs.' },
            { text: 'Modify existing value by accessing key "Filter Coffee" and adding 5 to its current value.' },
            { text: 'Add new key-value pair "Vada Pav": 30 using assignment syntax.' },
            { text: 'Retrieve and print value for key "Idli Sambar" using square bracket notation.' },
            { text: 'Print entire dictionary to verify all changes.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_04_010', title: 'A dictionary in Python is a mutable,.',
          scaffold: { problem: 'Create a dictionary to store the monthly rainfall (in mm) for 6 months: January (15), February (10), March (20), April (5), May (30), June.',
            steps: [
            { text: 'Create dictionary with curly braces, keys as month names (strings), values as integers: `rainfall = {\'January\': 15,.' },
            { text: 'Access April\'s value using square brackets: `april_rain = rainfall[\'April\']` → returns 5' },
            { text: 'Update March by assigning new value to existing key: `rainfall[\'March\'] = 25`' },
            { text: 'Add July by assigning to new key: `rainfall[\'July\'] = 60`' },
            { text: 'Check August safely using get(): `august_rain = rainfall.get(\'August\')` → returns None (no KeyError)' },
            { text: 'Verify final dictionary: `print(rainfall)` shows all 7 months with updated March and added July', faded: true, blankAnswer: '(a) 5, (b) March updated to 25, (c) July added with 60, (d).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_04_011', title: 'Dictionary methods in Python are.',
          scaffold: { problem: 'A school stores student roll numbers (keys) and names (values) in a dictionary `students = {101: \'Asha\', 102: \'Ravi\', 103: \'Meena\'}`.',
            steps: [
            { text: 'Identify the initial dictionary and the six required operations.' },
            { text: 'For (a), use `students.keys()` to get a view of all keys (roll numbers).' },
            { text: 'For (b), use `students.values()` to get a view of all values (names).' },
            { text: 'For (c), use `students.items()` to get a view of (key, value) tuples.' },
            { text: 'For (d), use `students.get(105, \'Not found\')` — returns `\'Not found\'` because 105 is absent.' },
            { text: 'For (e), call `students.update({104: \'Kiran\', 105: \'Leela\'})` — adds two new entries.' },
            { text: 'For (f), execute `del students[102]` — removes the key-value pair for roll 102.' },
            { text: 'Verify the final dictionary: `{101: \'Asha\', 103: \'Meena\', 104: \'Kiran\', 105: \'Leela\'}`.', faded: true, blankAnswer: '(a) `students.keys()` → `dict_keys([101, 102, 103])`' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_04_012', title: 'Traversing a dictionary using loops.',
          scaffold: { problem: 'A teacher has a dictionary `student_marks = {\'Rahul\': 78, \'Priya\': 92, \'Amit\': 65, \'Sneha\': 88}`.',
            steps: [
            { text: 'Identify the dictionary and the condition (marks < 80).' },
            { text: 'Since we are only updating values (not adding/removing keys), we can safely iterate directly over the dictionary keys.' },
            { text: 'Write a `for` loop: `for name in student_marks:` and inside check `if student_marks[name] < 80:`.' },
            { text: 'Update the value: `student_marks[name] += 5`.' },
            { text: 'Print the dictionary after the loop to verify changes.', faded: true, blankAnswer: 'Updated dictionary: `{\'Rahul\': 83, \'Priya\': 92, \'Amit\': 70,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_001', title: 'A Database Management System (DBMS) is.',
          scaffold: { problem: 'A coaching center maintains student records in three separate Excel files: STUDENT(RegNo, Name, Phone), BATCH(BatchCode, Time, Teacher),.',
            steps: [
            { text: 'List the three files and their columns. Note that RegNo appears in STUDENT and ENROLLMENT; BatchCode appears in BATCH.' },
            { text: 'Identify redundancy: Student Name and Phone are stored once per student in STUDENT, but if a student enrolls in.' },
            { text: 'Identify inconsistency risk: If a student changes phone number, it must be updated in STUDENT.' },
            { text: 'Identify dependence: If the owner adds a column "Email" to STUDENT, any Excel macro/VBA script reading STUDENT must be.' },
            { text: 'Design DBMS solution: Create three relations: Student(RegNo PK, Name, Phone), Batch(BatchCode PK, Time, Teacher),.' },
            { text: 'Show how DBMS resolves each: (a) Isolation → relations linked by FK; (b) Redundancy → Name/Phone stored once in.' },
            { text: 'Verify: Query "SELECT Name, Time, Teacher FROM Student JOIN Enrollment ON Student.RegNo=Enrollment.RegNo JOIN Batch ON.', faded: true, blankAnswer: 'Limitations exhibited: Data Isolation (separate files),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_07_002', title: 'In the Relational Data Model, a.',
          scaffold: { problem: 'A school\'s "FEE_RECEIPT" relation has attributes (ReceiptNo, StudentID, Date, Amount, Mode). The current instance has 850 tuples.',
            steps: [
            { text: 'Identify the relation name (FEE_RECEIPT) and list its attributes explicitly from the problem statement: ReceiptNo,.' },
            { text: 'Count the attributes to find degree: there are 5 attributes → degree = 5.' },
            { text: 'The problem states "current instance has 850 tuples" → cardinality = 850 (cardinality is instance-specific, changes.' },
            { text: 'Check domain violation: the declared domain of Mode is the set {\'Cash\',\'Card\',\'UPI\',\'Cheque\'}.' },
            { text: 'Projection (ReceiptNo, Amount) selects 2 attributes → each resulting tuple has 2 attribute values (degree of projected.', faded: true, blankAnswer: '(a) Degree = 5. (b) Cardinality = 850. (c) Yes, \'Wallet\' ∉.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_ip_cbse_04_010', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Dictionaries: Key-Value Pairs', spots: [
            { id: 's1', label: 'A dictionary in Python is', prompt: 'Which idea is this? — A dictionary in Python is an ordered, mutable collection of key-value pairs where each.', answer: 'A dictionary in Python is', options: ['A dictionary in Python is', 'Dictionary methods in Python are', 'Traversing a dictionary using loops', 'A Database Management System DBMS'] },
            { id: 's2', label: 'Dictionary methods in Python are', prompt: 'Which idea is this? — Dictionary methods in Python are built-in functions that allow manipulation and retrieval.', answer: 'Dictionary methods in Python are', options: ['Dictionary methods in Python are', 'A dictionary in Python is', 'Traversing a dictionary using loops', 'A Database Management System DBMS'] },
            { id: 's3', label: 'Traversing a dictionary using loops', prompt: 'Which idea is this? — Traversing a dictionary using loops means systematically visiting each key-value pair.', answer: 'Traversing a dictionary using loops', options: ['Traversing a dictionary using loops', 'A dictionary in Python is', 'Dictionary methods in Python are', 'A Database Management System DBMS'] },
            { id: 's4', label: 'A Database Management System DBMS', prompt: 'Which idea is this? — A Database Management System (DBMS) is a software system that enables users to define,.', answer: 'A Database Management System DBMS', options: ['A Database Management System DBMS', 'A dictionary in Python is', 'Dictionary methods in Python are', 'Traversing a dictionary using loops'] },
            { id: 's5', label: 'In the Relational Data Model', prompt: 'Which idea is this? — In the Relational Data Model, a **relation** (table) is a two-dimensional structure that.', answer: 'In the Relational Data Model', options: ['In the Relational Data Model', 'A dictionary in Python is', 'Dictionary methods in Python are', 'Traversing a dictionary using loops'] }
          ] } }
    ],
    explore: { component: C11_InformaticsPracticesKeysExplorerSim, prompt: 'Explore the interactive — Introduction to Dictionaries: Key-Value Pairs' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_009', difficulty: 'standard',
          question: 'A dictionary in Python is an ordered, mutable collection of key-value pairs.',
          hint: 'Revisit tuple immutability (c11_ip_cbse_04_006) and list indexing (c11_ip_cbse_04_002) to.',
          misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: How does dictionary key-based access fundamentally differ from list index-based access in terms of (a) lookup mechanism, (b) semantic.', answer: 'lookup mechanism, (',
                  options: ['lookup mechanism, (', 'both use indices', 'both raise the same error'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can be anything." They.' }
          ],
            remediations: { 'dictionary-keys-can-be-any': { steps: ['Show the TypeError with `d = {[]: "value"}` and ask: "What happens if the list inside the key changes later?" Guide.', 'Demonstrate `hash([1,2])` → TypeError vs `hash((1,2))` → integer.', 'Have them create a dictionary with tuple keys: `{(1,2): "pair", (3,4): "another"}`.', 'Contrast with `{"a": 1, "b": 1}` to prove duplicate values are allowed.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can.',
          parts: [
                { id: 'a', prompt: 'Design a dictionary to store a student\'s academic record where: (a) the student has a unique roll number, (b) multiple subjects with marks, (c) the structure.', answer: '```python student = { "roll_no": 101, "name": "Priya", "marks": {"Physics": 95,',
                  options: ['```python student = { "roll_no": 101, "name": "Priya", "marks": {"Physics": 95,', 'values can be anything', '}` or `d = {{}', '}` and are surprised by TypeError'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can be anything." They.' },
                { id: 'b', prompt: 'Compare and contrast: How does dictionary key-based access fundamentally differ from list index-based access in terms of (a) lookup mechanism, (b) semantic.', answer: 'lookup mechanism, (',
                  options: ['lookup mechanism, (', 'both use indices', 'both raise the same error', 'values can be anything'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys can be any data type including lists, sets, or other dictionaries because "values can be anything." They.' }
          ],
            remediations: { 'dictionary-keys-can-be-any': { steps: ['Show the TypeError with `d = {[]: "value"}` and ask: "What happens if the list inside the key changes later?" Guide.', 'Demonstrate `hash([1,2])` → TypeError vs `hash((1,2))` → integer.', 'Have them create a dictionary with tuple keys: `{(1,2): "pair", (3,4): "another"}`.', 'Contrast with `{"a": 1, "b": 1}` to prove duplicate values are allowed.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_010', difficulty: 'standard',
          question: 'A dictionary in Python is a mutable, ordered collection of key-value pairs.',
          hint: 'Review Class 9 Mathematics Chapter 1 (Coordinate Geometry) - specifically the concept of.',
          misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python student = {\'name\': \'Priya\', \'age\': 17, \'grade\': \'A\'} print(student[\'age\']).', answer: 'Output: 17, \'A\', None',
                  options: ['Output: 17, \'A\', None', 'dictionary keys must be strings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' },
                { id: 'b', prompt: 'Explain why the following code raises a TypeError, and how to fix it: ```python data = {[1, 2]: \'coordinates\', \'name\': \'point\'} ```', answer: 'Lists are mutable and unhashable, so they cannot be dictionary keys',
                  options: ['Lists are mutable and unhashable, so they cannot be dictionary keys', 'keys must be strings', 'dictionary keys must be strings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' },
                { id: 'c', prompt: 'Compare the behavior and use cases of `dict[key]` versus `dict.get(key)` versus `key in dict`. Provide a scenario where each is preferred.', answer: '`dict[key]`: raises KeyError if missing',
                  options: ['`dict[key]`: raises KeyError if missing', 'dictionary keys must be strings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' }
          ],
            remediations: { 'dictionary-keys-must-be-strings': { steps: ['Show the student: `d = {1: \'int key\', \'1\': \'str key\', (1,2): \'tuple key\'}; print(d[1], d[\'1\'], d[(1,2)])` - demonstrate.', 'Have them predict and test: `d = {}; d[[1,2]] = \'fail\'` → TypeError.', 'Explain: "Lists are mutable, so their hash can change, breaking dictionary lookup.', 'That\'s why only immutable objects can be keys." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.',
          parts: [
                { id: 'a', prompt: 'Design a dictionary-based solution for a library system where each book has a unique ISBN (string) mapping to a tuple (title, author, available_copies).', answer: '```python library = {}',
                  options: ['```python library = {}', 'dictionary keys must be strings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe dictionary keys must be strings because all NCERT examples use string keys.' }
          ],
            remediations: { 'dictionary-keys-must-be-strings': { steps: ['Show the student: `d = {1: \'int key\', \'1\': \'str key\', (1,2): \'tuple key\'}; print(d[1], d[\'1\'], d[(1,2)])` - demonstrate.', 'Have them predict and test: `d = {}; d[[1,2]] = \'fail\'` → TypeError.', 'Explain: "Lists are mutable, so their hash can change, breaking dictionary lookup.', 'That\'s why only immutable objects can be keys." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_011', difficulty: 'standard',
          question: 'Dictionary methods in Python are built-in functions that allow manipulation and.',
          hint: 'Revisit c11_ip_cbse_04_010 (Creating Dictionaries and Accessing Values by Key) and.',
          misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the.',
          parts: [
                { id: 'a', prompt: 'Explain why `d.get(\'missing_key\')` is safer than `d[\'missing_key\']` when the key might not exist in dictionary `d`.', answer: '`d[\'missing_key\']` raises a `KeyError` and stops the program, while',
                  options: ['`d[\'missing_key\']` raises a `KeyError` and stops the program, while', 'both return None', '`d.keys()`, `d'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' },
                { id: 'b', prompt: 'Given `d = {\'a\': 1, \'b\': 2}` and `e = {\'b\': 3, \'c\': 4}`, write the code to merge `e` into `d` so that `d` becomes `{\'a\': 1, \'b\': 3, \'c\': 4}`.', answer: '`d.update(e)` merges `e` into `d`',
                  options: ['`d.update(e)` merges `e` into `d`', 'd becomes {\'a\':1, \'b\':2, \'c\':4}', '`update` preserves existing keys instead of overwriting them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' },
                { id: 'c', prompt: 'Compare the output of `list(d.items())` and `list(d.keys())` for `d = {\'x\': 10, \'y\': 20}`. What data structure does each produce, and how are they related?', answer: '`d.items()` produces a list of tuples `[(\'x\', 10), (\'y\', 20)]`',
                  options: ['`d.items()` produces a list of tuples `[(\'x\', 10), (\'y\', 20)]`', 'both produce lists of keys', '`d.keys()`, `d'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' }
          ],
            remediations: { 'd': { steps: ['In the Python shell, create `d = {\'a\':1}` and assign `k = d.keys()`.', 'Print `k` and note the type (`dict_keys`).', 'Add `d[\'b\'] = 2` and print `k` again — observe `\'b\'` appears without re-calling `keys()`.', 'Explain: "The view is a live window into the dictionary, not a photograph." 5.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the.',
          parts: [
                { id: 'a', prompt: 'A student writes `del d[\'z\']` on a dictionary `d` that has no key `\'z\'`.', answer: 'A `KeyError` is raised',
                  options: ['A `KeyError` is raised', 'use d.get(\'z\')', '`d.keys()`, `d'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe `d.keys()`, `d.values()`, and `d.items()` return **lists** that are independent copies of the dictionary\'s data.' }
          ],
            remediations: { 'd': { steps: ['In the Python shell, create `d = {\'a\':1}` and assign `k = d.keys()`.', 'Print `k` and note the type (`dict_keys`).', 'Add `d[\'b\'] = 2` and print `k` again — observe `\'b\'` appears without re-calling `keys()`.', 'Explain: "The view is a live window into the dictionary, not a photograph." 5.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_012', difficulty: 'standard',
          question: 'Traversing a dictionary using loops means systematically visiting each.',
          hint: 'Revisit `c11_ip_cbse_04_011` Dictionary Methods to practice `keys()`, `values()`,.',
          misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the.',
          parts: [
                { id: 'a', prompt: 'What does the expression `for key in my_dict:` iterate over in Python 3.7+?', answer: 'It iterates over the keys of `my_dict` in insertion order',
                  options: ['It iterates over the keys of `my_dict` in insertion order', 'it iterates over values', 'it iterates over key-value pairs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' },
                { id: 'b', prompt: 'Given `marks = {\'Physics\': 85, \'Chemistry\': 92, \'Maths\': 78}`, write a loop that creates a new dictionary `high_marks` containing only subjects with marks ≥ 90.', answer: '```python high_marks = {} for subject, mark in marks.items(): if mark >= 90:',
                  options: ['```python high_marks = {} for subject, mark in marks.items(): if mark >= 90:', 'the loop just goes through the dictionary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' },
                { id: 'c', prompt: 'Compare the memory and performance implications of these two traversal methods for a dictionary with 10,000 items: Method A: `for k in d: print(d[k])` Method.', answer: 'Method B is more efficient',
                  options: ['Method B is more efficient', 'the loop just goes through the dictionary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' }
          ],
            remediations: { 'for-key-in-dict-allows': { steps: ['Show the exact `RuntimeError` by running the problematic code in the interpreter.', 'Explain that the iterator holds a reference to the dictionary\'s internal state; adding/removing keys reshuffles the.', 'Demonstrate the fix: `for k in list(d.keys()):` creates a static snapshot of keys, allowing safe deletion/insertion.', 'Have the student rewrite three buggy loops (one deletion, one insertion, one mixed) using the `list(keys())` pattern.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the.',
          parts: [
                { id: 'a', prompt: 'A student writes this code to double every value in `scores = {\'A\': 10, \'B\': 20}`: ```python for v in scores.values(): v = v * 2 ``` Evaluate whether this.', answer: 'No, it does not update the dictionary',
                  options: ['No, it does not update the dictionary', 'yes, values are doubled', 'the loop just goes through the dictionary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that `for key in dict:` allows them to freely add or delete keys inside the loop because "the loop just goes through.' }
          ],
            remediations: { 'for-key-in-dict-allows': { steps: ['Show the exact `RuntimeError` by running the problematic code in the interpreter.', 'Explain that the iterator holds a reference to the dictionary\'s internal state; adding/removing keys reshuffles the.', 'Demonstrate the fix: `for k in list(d.keys()):` creates a static snapshot of keys, allowing safe deletion/insertion.', 'Have the student rewrite three buggy loops (one deletion, one insertion, one mixed) using the `list(keys())` pattern.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_001', difficulty: 'standard',
          question: 'A Database Management System (DBMS) is a software system that enables users to.',
          hint: 'Revisit Class 6 Math "Introduction to Data" (c6_math_ch09_095) and practice converting 5.',
          misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are.',
          parts: [
                { id: 'a', prompt: 'Explain why "data inconsistency" is a more dangerous problem than "data redundancy" in a file system, using the example of a student\'s name correction across.', answer: 'Redundancy wastes storage',
                  options: ['Redundancy wastes storage', 'redundancy uses more disk space', 'Primary Key = Unique Identifier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions,.' },
                { id: 'b', prompt: 'In the STUDENTATTENDANCE database (Figure 7.1), the GUARDIAN table has GUID as primary key. The STUDENT table includes GUID as a foreign key.', answer: 'Yes, GUID in STUDENT can be NULL',
                  options: ['Yes, GUID in STUDENT can be NULL', 'guardian unknown', 'foreign keys can never be NULL'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions,.' }
          ],
            remediations: { 'primary-key-unique-identifier-and': { steps: ['Have the student list all candidate keys for GUARDIAN (GUID, GPhone).', 'Ask "Which one did the designer choose as primary key?" (GUID).', 'Show the schema diagram (Figure 7.2) where the foreign key arrow from STUDENT.GUID points to GUARDIAN.GUID—not to.', 'Give a counter-example: "If STUDENT had GPhone as foreign key and a guardian changes phone number, the link breaks."', 'Drill the rule: "Foreign key ALWAYS references the PRIMARY KEY of the parent table, not just any unique column."'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are.',
          parts: [
                { id: 'a', prompt: 'In the STUDENTATTENDANCE database (Figure 7.1), the GUARDIAN table has GUID as primary key. The STUDENT table includes GUID as a foreign key.', answer: 'Yes, GUID in STUDENT can be NULL',
                  options: ['Yes, GUID in STUDENT can be NULL', 'guardian unknown', 'foreign keys can never be NULL', 'Primary Key = Unique Identifier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Primary Key = Unique Identifier" and "Foreign Key = Primary Key of another table" are interchangeable definitions,.' }
          ],
            remediations: { 'primary-key-unique-identifier-and': { steps: ['Have the student list all candidate keys for GUARDIAN (GUID, GPhone).', 'Ask "Which one did the designer choose as primary key?" (GUID).', 'Show the schema diagram (Figure 7.2) where the foreign key arrow from STUDENT.GUID points to GUARDIAN.GUID—not to.', 'Give a counter-example: "If STUDENT had GPhone as foreign key and a guardian changes phone number, the link breaks."', 'Drill the rule: "Foreign key ALWAYS references the PRIMARY KEY of the parent table, not just any unique column."'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_002', difficulty: 'standard',
          question: 'In the Relational Data Model, a **relation** (table) is a two-dimensional.',
          hint: 'Revisit Class 9 Coordinate Geometry (c9_math_ch1_1) – the (x,y) ordered pair is the.',
          misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.',
          parts: [
                { id: 'a', prompt: 'The ATTENDANCE relation has attributes (AttendanceDate, RollNumber, AttendanceStatus). On 2018-09-01, RollNumber 3 (Taleem Shah) is marked \'A\'.', answer: 'Yes, they are distinct tuples',
                  options: ['Yes, they are distinct tuples', 'they are duplicates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' }
          ],
            remediations: { 'students-consistently-treat-attribute': { steps: ['Draw a three-column table on the board: left column "Concept", middle "Schema-level (design time)", right.', 'Fill rows: Attribute → "RollNumber (name + type INTEGER)" → "the column in every row"; Domain → "ℤ⁺ (all positive.', 'Give a concrete counter-example: "If domain = INTEGER, can RollNumber be -5?', 'Have the student redefine each term in their own words using this table.'] } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.',
          parts: [
                { id: 'a', prompt: 'Design a minimal relation schema for a "LIBRARY_BOOK" entity that captures: book identification, title, author, publication year, and current status.', answer: 'Relation: LIBRARY_BOOK(BookID, Title, Author, PubYear, Status)',
                  options: ['Relation: LIBRARY_BOOK(BookID, Title, Author, PubYear, Status)', 'available, issued, reserved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat "attribute", "column", "field", and "domain" as interchangeable synonyms.' }
          ],
            remediations: { 'students-consistently-treat-attribute': { steps: ['Draw a three-column table on the board: left column "Concept", middle "Schema-level (design time)", right.', 'Fill rows: Attribute → "RollNumber (name + type INTEGER)" → "the column in every row"; Domain → "ℤ⁺ (all positive.', 'Give a concrete counter-example: "If domain = INTEGER, can RollNumber be -5?', 'Have the student redefine each term in their own words using this table.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
