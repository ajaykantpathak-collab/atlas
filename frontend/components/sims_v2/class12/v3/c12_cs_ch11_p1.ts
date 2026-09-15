import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch11_p1: SimDef = {
    id: 'v3_c12_cs_ch11_p1',
    title: 'Python Data Structures · Part 1/2',
    subtitle: 'scores * 3 didn\'t multiply anything — sequence algebra strikes',
    classLevel: 12, subject: 'computer_science', topic: 'Python Data Structures · Part 1/2',
    chapters: ['c12_cs_ch11'],
    nodeIds: ['c12_cs_cbse_11_001', 'c12_cs_cbse_11_002', 'c12_cs_cbse_11_003', 'c12_cs_cbse_11_004', 'c12_cs_cbse_11_005', 'c12_cs_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Python developer', intro: 'Lists, tuples, sets, dicts — Python\'s containers each keep order, safety or speed. Learn which does what.', goal: 'Master Python\'s built-in data structures: indexing, slicing, mutability and the operations that trip up beginners.' },
    discovery: {
        question: 'A student writes total = scores * 3 expecting 759 from [85, 90, 78]. Python happily returns something — but not a number. What did it build?',
        options: ['[85, 90, 78, 85, 90, 78, 85, 90, 78] — * on a list repeats the sequence, it doesn\'t multiply the values', '759 anyway', '[255, 270, 234] — it multiplies each element', 'An error — you can\'t multiply a list'],
        answer: '[85, 90, 78, 85, 90, 78, 85, 90, 78] — * on a list repeats the sequence, it doesn\'t multiply the values',
        hook: 'Lists obey sequence algebra, not arithmetic: + concatenates into a new list while extend() mutates in place, and * repeats. Add mutable vs immutable — my_list[1]=99 works but my_str[1]=\'x\' raises TypeError — and you have the chapter\'s three classic traps.',
    },
    teaching: [
        { title: 'Lists as Data Structures: Creation and Operations', text: 'A list in Python is an ordered, mutable sequence of heterogeneous elements enclosed in square brackets, where each element is accessed by its zero-based index and the list can dynamically grow.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Command the workhorse of Python: slice with negative indices and steps, predict every output of +, * and in, then wield tuples, sets and dicts where each earns its place.',
        labels: ['Lists as Data Structures', 'List Methods: append, insert,', 'List Comprehensions and Slicing', 'Tuples: Creation, Immutability', 'Dictionaries: Creation and Accessing', 'Dictionary Methods: keys, values,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_001', title: 'Lists as Data Structures: Creation and Operations',
          caseStudy: { intro: 'Imagine you are building a contact manager app for your phone — you need to store names in a sequence where you can add, remove, or reorder contacts anytime.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python data = [10, 20, 30, 40, 50] print(data[-3]) ```', options: [
                { text: 'Correct answer: 30', outcome: 'Correct answer: 30. Negative indexing starts from -1 for the last element, so -3 refers to the.' },
                { text: 'slicing a list (e', outcome: 'Not quite — Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy**.', reveals: 'slicing-a-list-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_002', title: 'List Methods: append, insert, remove, pop, sort',
          caseStudy: { intro: 'Imagine you are building a program for a school canteen that tracks the prices of snacks in a list.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python prices = [20, 15, 30] prices.append(25) prices.insert(1, 10) print(prices) ```', options: [
                { text: 'The output is `[20, 10, 15, 30, 25]`', outcome: 'The output is `[20, 10, 15, 30, 25]`. A wrong answer like `[20, 15, 30, 25, 10]` reveals the.' },
                { text: '`insert(1, 10)` adds at the end or confuses the index parameter', outcome: 'Not quite — Students often believe that `list.sort()` returns a new sorted list and write `sorted_list.', reveals: 'list' },
                { text: '`insert` shifts existing elements incorrectly', outcome: 'Not quite — Students often believe that `list.sort()` returns a new sorted list and write `sorted_list.', reveals: 'list' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_003', title: 'List Comprehensions and Slicing',
          caseStudy: { intro: 'Imagine you need to create a list of squares of even numbers from 1 to 20 for a physics simulation of projectile motion at discrete time steps.',
            decisions: [{ prompt: 'What is the output of `lst = [10, 20, 30, 40, 50]; print(lst[1:4])`?', options: [
                { text: 'The output is `[20, 30, 40]`', outcome: 'The output is `[20, 30, 40]`. Slicing `lst[1:4]` starts at index 1 (inclusive) and stops before.' },
                { text: 'stop means the last index to include', outcome: 'Not quite — Students often believe that slicing with a negative step, e.g., `lst[5:2:-1]`, includes the element.', reveals: 'slicing-with-a-negative-step' },
                { text: 'slicing is 1-based or includes the stop index', outcome: 'Not quite — Students often believe that slicing with a negative step, e.g., `lst[5:2:-1]`, includes the element.', reveals: 'slicing-with-a-negative-step' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_004', title: 'Tuples: Creation, Immutability and Methods',
          caseStudy: { intro: 'Imagine you\'re building a student record system for your school\'s annual day.',
            decisions: [{ prompt: 'Create a tuple containing a single integer `42` using parentheses. What is the type of the result?', options: [
                { text: 'The result is `<class \'int\'>`, not a tuple', outcome: 'The result is `<class \'int\'>`, not a tuple. Writing `(42)` creates an integer because parentheses.' },
                { text: 'tuples are completely immutable', outcome: 'Not quite — Students believe "tuples are completely immutable" — they think if a tuple contains a list, the.', reveals: 'tuples-are-completely-immutable-they' },
                { text: 'parentheses alone define a tuple, missing the comma rule', outcome: 'Not quite — Students believe "tuples are completely immutable" — they think if a tuple contains a list, the.', reveals: 'tuples-are-completely-immutable-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_005', title: 'Dictionaries: Creation and Accessing Values',
          caseStudy: { intro: 'Imagine you are building a contact list app where you need to store phone numbers against names.',
            decisions: [{ prompt: 'What is the syntax to create an empty dictionary in Python? Provide two ways.', options: [
                { text: 'Correct answer: Empty dictionary can be created using `{}` or `dict()`', outcome: 'Correct answer: Empty dictionary can be created using `{}` or `dict()`.' },
                { text: 'dictionary keys can be any data type, including lists or other dictionaries', outcome: 'Not quite — Students often think dictionary keys can be any data type, including lists or other dictionaries.', reveals: 'dictionary-keys-can-be-any' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a quiz app, a student needs triple the total of [85, 90, 78] and writes total = scores * 3. The printed \'total\' is a nine-element list, not a number.',
            decisions: [{ prompt: 'What did `* 3` actually do?', options: [
                { text: 'List repetition — it built [85,90,78,85,90,78,85,90,78]; what she wanted was sum(scores) * 3, since * on a sequence repeats rather than multiplies elements.', outcome: 'Operators are overloaded by type: * on a list means \'repeat the sequence\', so reading it as arithmetic multiplication silently produces a longer list.' },
                { text: 'It multiplied every element by 3 — Python must have a display bug.', outcome: 'Element-wise multiplication isn\'t what * does on lists — that\'s why nine values appeared instead of [255,270,234].', reveals: 'star-multiplies-elements' },
                { text: 'It summed and tripled correctly — the printed list is just a formatting quirk.', outcome: 'The output literally shows repetition; a genuine 759 would print as an integer, not a bracketed sequence.', reveals: 'ignoring-actual-output' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now read list code and know the output before it runs — mutability, slicing and operator traps included. These are the most-asked output questions in the paper.',
            decisions: [{ prompt: 'What comes next? Python Data Structures · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Python Data Structures · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_001', difficulty: 'standard',
          question: 'A list in Python is an ordered, mutable sequence of heterogeneous elements.',
          hint: 'Revisit Class 11 concept of mutable vs immutable objects and variable assignment.',
          misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements,.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python data = [10, 20, 30, 40, 50] print(data[-3]) ```', answer: 'Correct answer: 30',
                  options: ['Correct answer: 30', 'slicing a list (e'],
                  hint: 'Revisit Class 11 concept of mutable vs immutable objects and variable assignment as reference.',
                  misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements, so modifying an element.' },
                { id: 'b', prompt: 'Explain in your own words what happens when you execute `my_list = [1, 2, 3]; my_list[1] = 99`. How is this different from doing the same with a string?', answer: 'Correct answer: The list becomes [1, 99, 3]',
                  options: ['Correct answer: The list becomes [1, 99, 3]', 'list creates a new list', 'slicing a list (e'],
                  hint: 'Revisit Class 11 concept of mutable vs immutable objects and variable assignment as reference.',
                  misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements, so modifying an element.' },
                { id: 'c', prompt: 'Compare the results of `list1 = [1, 2]; list2 = [3, 4]; result = list1 + list2` versus `list1.extend(list2)`.', answer: 'Correct answer: With `+`, `list1` remains [1, 2]',
                  options: ['Correct answer: With `+`, `list1` remains [1, 2]', 'slicing a list (e'],
                  hint: 'Revisit Class 11 concept of mutable vs immutable objects and variable assignment as reference.',
                  misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements, so modifying an element.' }
          ],
            remediations: { 'slicing-a-list-e': { steps: ['If the student cannot distinguish between shallow copy (slice) and deep copy for nested lists: (1) Have them draw.', '(2) Execute `a = [[1,2], [3,4]]; b = a[:]; b[0].append(99); print(a)` in the Python shell and trace why `a` changes.', '(3) Revisit Class 11 concept of mutable vs immutable objects (node c11_cs_cbse_05_003 if available) and the `copy`.', '(4) Re-diagnose with: "Given `x = [[1], [2]]; y = x[0:1]; y[0][0] = 9`, what is `x`?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements,.',
          parts: [
                { id: 'a', prompt: 'A student writes `scores = [85, 90, 78]; total = scores * 3` expecting `total` to be the sum of scores multiplied by 3 (i.e., 759).', answer: 'Correct evaluation: The code does NOT achieve the intended result',
                  options: ['Correct evaluation: The code does NOT achieve the intended result', 'slicing a list (e'],
                  hint: 'Revisit Class 11 concept of mutable vs immutable objects and variable assignment as reference.',
                  misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements, so modifying an element.' },
                { id: 'b', prompt: 'Design a list creation expression using `list()` constructor that produces the list [0, 2, 4, 6, 8] without writing any literal numbers except 0 and 5.', answer: 'Expected answer: `list(range(0, 10, 2))` or `list(range(0, 5*2, 2))`',
                  options: ['Expected answer: `list(range(0, 10, 2))` or `list(range(0, 5*2, 2))`', 'slicing a list (e'],
                  hint: 'Revisit Class 11 concept of mutable vs immutable objects and variable assignment as reference.',
                  misconception: 'Students believe that slicing a list (e.g., `new_list = old_list[1:4]`) creates a **deep copy** of the elements, so modifying an element.' }
          ],
            remediations: { 'slicing-a-list-e': { steps: ['If the student cannot distinguish between shallow copy (slice) and deep copy for nested lists: (1) Have them draw.', '(2) Execute `a = [[1,2], [3,4]]; b = a[:]; b[0].append(99); print(a)` in the Python shell and trace why `a` changes.', '(3) Revisit Class 11 concept of mutable vs immutable objects (node c11_cs_cbse_05_003 if available) and the `copy`.', '(4) Re-diagnose with: "Given `x = [[1], [2]]; y = x[0:1]; y[0][0] = 9`, what is `x`?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_002', difficulty: 'standard',
          question: 'List methods in Python are built-in functions that modify a list in-place.',
          hint: 'If stuck, revisit list creation and indexing from node c12_cs_cbse_11_001, focusing.',
          misconception: 'Students often believe that `list.sort()` returns a new sorted list and write `sorted_list = my_list.sort()`.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python prices = [20, 15, 30] prices.append(25) prices.insert(1, 10) print(prices) ```', answer: 'The output is `[20, 10, 15, 30, 25]`',
                  options: ['The output is `[20, 10, 15, 30, 25]`', '`insert(1, 10)` adds at the end or confuses the index parameter', '`insert` shifts existing elements incorrectly', '`list.sort()` returns a new sorted list and write `sorted_list = my_list'],
                  hint: 'If stuck, revisit list creation and indexing from node c12_cs_cbse_11_001, focusing on how index.',
                  misconception: 'Students often believe that `list.sort()` returns a new sorted list and write `sorted_list = my_list.sort()`.' }
          ],
            remediations: { 'list': { steps: ['If a student confuses `sort()` with `sorted()`, have them: 1.', 'Create a list `a = [3,1,2]`.', 'Run `b = a.sort()` and print `a` and `b` → observe `a` is `[1,2,3]` and `b` is `N/A`.', 'Run `c = sorted(a)` and print `a` and `c` → observe `a` unchanged, `c` is new sorted list.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_003', difficulty: 'standard',
          question: 'List comprehension is a concise syntactic construct in Python for creating new.',
          hint: 'If stuck on indexing or iterables, revisit `c12_cs_cbse_11_001` (list creation and.',
          misconception: 'Students often believe that slicing with a negative step, e.g., `lst[5:2:-1]`, includes the element at the stop index.',
          parts: [
                { id: 'a', prompt: 'What is the output of `lst = [10, 20, 30, 40, 50]; print(lst[1:4])`?', answer: 'The output is `[20, 30, 40]`',
                  options: ['The output is `[20, 30, 40]`', 'stop means the last index to include', 'slicing is 1-based or includes the stop index', 'slicing with a negative step, e'],
                  hint: 'If stuck on indexing or iterables, revisit `c12_cs_cbse_11_001` (list creation and indexing) and.',
                  misconception: 'Students often believe that slicing with a negative step, e.g., `lst[5:2:-1]`, includes the element at the stop index (2) because they.' },
                { id: 'b', prompt: 'Compare the memory behavior of `lst = [1,2,3]; new = lst[::]` versus `new = lst`. Which creates a copy? How can you verify this experimentally?', answer: '`lst[::]` creates a shallow copy (new list object with same elements)',
                  options: ['`lst[::]` creates a shallow copy (new list object with same elements)', 'stop means the last index to include', 'slicing with a negative step, e', '"stop means the last index to include"'],
                  hint: 'If stuck on indexing or iterables, revisit `c12_cs_cbse_11_001` (list creation and indexing) and.',
                  misconception: 'Students often believe that slicing with a negative step, e.g., `lst[5:2:-1]`, includes the element at the stop index (2) because they.' }
          ],
            remediations: { 'slicing-with-a-negative-step': { steps: ['Have the student write out indices above a sample list: `lst = [\'a\',\'b\',\'c\',\'d\',\'e\']` with indices `0 1 2 3 4` and.', 'Ask them to trace `lst[3:0:-1]` manually: start at index 3 (\'d\'), step -1 → index 2 (\'c\'), step -1 → index 1 (\'b\').', 'Repeat with `lst[4:1:-2]` to reinforce step magnitude.', 'Then revisit Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_004', difficulty: 'standard',
          question: 'A tuple is an ordered, immutable sequence of heterogeneous elements in Python.',
          hint: 'If stuck on immutability, revisit `c12_cs_cbse_11_001` (list mutability) and.',
          misconception: 'Students believe "tuples are completely immutable" — they think if a tuple contains a list, the list cannot.',
          parts: [
                { id: 'a', prompt: 'Create a tuple containing a single integer `42` using parentheses. What is the type of the result?', answer: 'The result is `<class \'int\'>`, not a tuple',
                  options: ['The result is `<class \'int\'>`, not a tuple', 'tuples are completely immutable', 'parentheses alone define a tuple, missing the comma rule', 'if a tuple contains a list, the list cannot be modified'],
                  hint: 'If stuck on immutability, revisit `c12_cs_cbse_11_001` (list mutability) and `c11_math_cbse_01_001`.',
                  misconception: 'Students believe "tuples are completely immutable" — they think if a tuple contains a list, the list cannot be modified.' },
                { id: 'b', prompt: 'Explain why `t = (1, 2, [3, 4])` followed by `t[2].append(5)` succeeds, but `t[2] = [3, 4, 5]` fails. What does this reveal about tuple immutability?', answer: '`t[2].append(5)` mutates the *list object* referenced by `t[2]`',
                  options: ['`t[2].append(5)` mutates the *list object* referenced by `t[2]`', 'both fail', 'both succeed', 'tuples are completely immutable'],
                  hint: 'If stuck on immutability, revisit `c12_cs_cbse_11_001` (list mutability) and `c11_math_cbse_01_001`.',
                  misconception: 'Students believe "tuples are completely immutable" — they think if a tuple contains a list, the list cannot be modified.' },
                { id: 'c', prompt: 'Given `data = (10, 20, 30, 20, 40)`, write code to: (a) find how many times 20 appears, (b) find the index of the first 20, (c) find the index of the second 20.', answer: 'find how many times 20 appears, (',
                  options: ['find how many times 20 appears, (', 'tuples are completely immutable', 'if a tuple contains a list, the list cannot be modified'],
                  hint: 'If stuck on immutability, revisit `c12_cs_cbse_11_001` (list mutability) and `c11_math_cbse_01_001`.',
                  misconception: 'Students believe "tuples are completely immutable" — they think if a tuple contains a list, the list cannot be modified.' }
          ],
            remediations: { 'tuples-are-completely-immutable-they': { steps: ['Revisit the distinction between *container mutability* (can the container\'s slots change?) and *object mutability* (can.', 'Run this in Python shell: `t = (1, [2]); print(id(t[1])); t[1].append(3); print(id(t[1])); print(t)` — observe the.', 'Create a tuple with a list, use it as a dict key, then mutate the list: `d = {([1],): "value"}` fails (unhashable), but.', 'Actually demonstrate: `t = ([1],); d = {t: "ok"}; t[0].append(2); print(d[t])` — KeyError because hash changed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_005', difficulty: 'standard',
          question: 'A dictionary in Python is an unordered, mutable collection of key-value pairs.',
          hint: 'Review the mutability of Python data types (especially list vs tuple) from Class 11.',
          misconception: 'Students often think dictionary keys can be any data type, including lists or other dictionaries.',
          parts: [
                { id: 'a', prompt: 'What is the syntax to create an empty dictionary in Python? Provide two ways.', answer: 'Correct answer: Empty dictionary can be created using `{}` or `dict()`',
                  options: ['Correct answer: Empty dictionary can be created using `{}` or `dict()`', 'dictionary keys can be any data type, including lists or other dictionaries'],
                  hint: 'Review the mutability of Python data types (especially list vs tuple) from Class 11 Python.',
                  misconception: 'Students often think dictionary keys can be any data type, including lists or other dictionaries.' }
          ],
            remediations: { 'dictionary-keys-can-be-any': { steps: ['If a student struggles, first revisit the concept of mutable vs immutable types (covered in Class 11 Python basics).', 'Have them list immutable types (int, float, str, tuple, frozenset) and mutable types (list, dict, set).', 'Then practice creating dictionaries with valid keys (strings, numbers, tuples) and invalid keys (lists, dicts) to see.', 'Next, practice accessing values with square brackets and get() on a small dictionary, deliberately causing KeyError and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_006', difficulty: 'standard',
          question: 'Dictionary methods `keys()`, `values()`, `items()`, `get()`, and `update()`.',
          hint: 'If stuck, revisit dictionary creation and key-based access (node c12_cs_cbse_11_005) and.',
          misconception: 'Students often think `keys()`, `values()`, and `items()` return static lists (like in Python 2) and are surprised when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dictionary methods `keys()`, `values()`, `items()`, `get()`, and `update()` provide ways',
                  options: ['Dictionary methods `keys()`, `values()`, `items()`, `get()`, and `update()` provide ways', 'A list in Python is an ordered, mutable sequence of heterogeneous elements enclosed in', 'List methods in Python are built-in functions that modify a list in-place or return', 'List comprehension is a concise syntactic construct in Python for creating new lists by'],
                  hint: 'If stuck, revisit dictionary creation and key-based access (node c12_cs_cbse_11_005) and practice.',
                  misconception: 'Students often think `keys()`, `values()`, and `items()` return static lists (like in Python 2) and are surprised when the view changes.' }
          ],
            remediations: { 'keys': { steps: ['If a student exhibits the above misconceptions, first demonstrate in the Python shell: create `d = {\'a\':1}`, assign `k.', 'Next, show `d.get(\'c\', [])` twice and print the results to prove they are different list objects.', 'Finally, show `result = d.update({\'c\':3})` and print `result` to confirm it returns `N/A`.', 'Ask the student to predict each outcome before running.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
