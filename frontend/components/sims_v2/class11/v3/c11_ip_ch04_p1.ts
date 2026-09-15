import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch04_p1: SimDef = {
    id: 'v3_c11_ip_ch04_p1',
    title: 'Lists, Tuples and Dictionaries · Part 1/2',
    subtitle: 'Pick the container that can actually change its contents.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Lists, Tuples and Dictionaries · Part 1/2',
    chapters: ['c11_ip_ch04'],
    nodeIds: ['c11_ip_cbse_04_001', 'c11_ip_cbse_04_002', 'c11_ip_cbse_04_003', 'c11_ip_cbse_04_004', 'c11_ip_cbse_04_005', 'c11_ip_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data wrangler choosing the right container', intro: 'Name, roll number, five subject marks, a percentage — one variable, four types. Only one built-in holds all that.', goal: 'Use lists\' mutability, indexing and slicing — and know when a string can\'t do the job.' },
    discovery: {
        question: 'You must store \'ATCGATCG\' and later swap the third base for \'G\' — string or list?',
        options: ['List — strings are immutable so `dna[2] = \'G\'` fails; a list mutates in place', 'String — DNA is text, so text type is correct', 'Either — both mutate the same way', 'String — lists can\'t hold characters'],
        answer: 'List — strings are immutable so `dna[2] = \'G\'` fails; a list mutates in place',
        hook: 'And `list1 = list2` doesn\'t copy — it gives one list two names, so \'fixing\' list1 silently vandalises list2.',
    },
    teaching: [
        { title: 'Introduction to Lists in Python and List Creation', text: 'A list in Python is an ordered, mutable sequence of elements enclosed in square brackets `[]` and separated by commas, where each element can be of any data type (integer, float, string, list, tuple.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build a record list mixing name, ID and a nested marks list, change one field by index, then slice positions 2 to 5 cleanly.',
        labels: ['Introduction to Lists', 'Accessing List Elements: Indexing', 'List Operations: Concatenation, Repetition', 'List Methods: append, insert,', 'Traversing a List Using', 'Introduction to Tuples'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_002', title: 'Accessing List Elements: Indexing and Slicing',
          caseStudy: { intro: 'Imagine you have a row of 10 lockers numbered 0 to 9 from left to right, and you want to pick specific lockers or a consecutive block of lockers.',
            decisions: [{ prompt: 'What is the output of `lst = [10, 20, 30, 40, 50]; print(lst[-3])`?', options: [
                { text: 'The output is `30`', outcome: 'The output is `30`. Negative indexing starts from -1 for the last element, so -3 refers to the.' },
                { text: 'slicing with an out-of-range index (e', outcome: 'Not quite — Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list).', reveals: 'slicing-with-an-out-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_003', title: 'List Operations: Concatenation, Repetition and Membership',
          caseStudy: { intro: 'Imagine you are organizing a school event and have two separate lists: one for morning volunteers and one for afternoon volunteers.',
            decisions: [{ prompt: 'What is the result of the expression `[1, 2] + [3, 4]` and what is the data type of the result?', options: [
                { text: 'The result is `[1, 2, 3, 4]` of type `list`', outcome: 'The result is `[1, 2, 3, 4]` of type `list`. A wrong answer like `[1, 2, [3, 4]]` reveals the.' },
                { text: 'concatenation nests lists (confusing with append)', outcome: 'Not quite — Students often believe `list1 + list2` modifies `list1` in-place (like `extend`) because the `+`.', reveals: 'list1-list2-modifies-list1-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_006', title: 'Introduction to Tuples and Tuple Immutability',
          caseStudy: { intro: 'Imagine you\'re building a student record system where each student\'s roll number, name, and date of birth must never change once entered — unlike a list.',
            decisions: [{ prompt: 'What is the correct syntax to create a tuple containing only the integer `42`?', options: [
                { text: 'The correct syntax is `(42,)`', outcome: 'The correct syntax is `(42,)` — note the trailing comma. Without the comma, `(42)` is just.' },
                { text: 'tuples are just lists with parentheses', outcome: 'Not quite — Students believe "tuples are just lists with parentheses" and try to use list methods like.', reveals: 'tuples-are-just-lists-with' },
                { text: '"tuples are just lists with parentheses" and try to use list methods like `', outcome: 'Not quite — Students believe "tuples are just lists with parentheses" and try to use list methods like.', reveals: 'tuples-are-just-lists-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a student record, a friend insists: \'Python lists are like arrays — one data type only, so [name, roll, marks] won\'t work.\' Later, `record2 = record1` \'copies\' the list, and `record1[5]` on a 5-element list surprises him with an error while `record1[0:100]` doesn\'t.',
            decisions: [{ prompt: 'What are the actual list rules?', options: [
                { text: 'Set him straight: lists are ordered, mutable AND heterogeneous — `[\'Raman\', 101, [85,90,78], 86.6]` is valid, with a nested list inside. `record2 = record1` binds a second name to the SAME list, not a copy — mutations appear in both. And indexing vs slicing differ: `record1[5]` crashes (valid indices 0–4), but slicing clips out-of-range bounds silently and returns a new list.', outcome: 'He can now store real mixed records safely: copies need slicing or .copy(), and slices forgive what indexes punish.' },
                { text: 'Agree on one-type lists — mixing types in one container must throw an error.', outcome: 'That\'s C/Java thinking: Python lists accept heterogeneous elements — a string, int, list and float can share one container.', reveals: 'lists-are-single-type' },
                { text: 'Expect `record1[0:100]` to crash like `record1[5]` — out of range is out of range.', outcome: 'Slicing is a range operation with automatic bounds clipping, not multiple indexing — it quietly returns what\'s available.', reveals: 'slicing-crashes-out-of-range' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ordered, mutable, heterogeneous — the list is Python\'s general-purpose record; learn where it ends and the string begins.',
            decisions: [{ prompt: 'What comes next? Lists, Tuples and Dictionaries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Lists, Tuples and Dictionaries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_001', difficulty: 'standard',
          question: 'A list in Python is an ordered, mutable sequence of elements enclosed in square.',
          hint: 'Review Python variables and basic data types (int, float, str) from the introductory.',
          misconception: 'Students believe lists can only store one data type (like arrays in C/Java) because early examples often show.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a list is called "mutable" and "heterogeneous". Give a one-line code example that proves each property.', answer: 'Mutable: contents can be changed after creation without creating a new object',
                  options: ['Mutable: contents can be changed after creation without creating a new object', 'mutable means you can add elements', 'heterogeneous means it can hold many elements'],
                  hint: 'Review Python variables and basic data types (int, float, str) from the introductory programming.',
                  misconception: 'Students believe lists can only store one data type (like arrays in C/Java) because early examples often show homogeneous lists.' }
          ],
            remediations: { 'lists-can-only-store-one': { steps: ['Show three lists side-by-side: homogeneous ints, homogeneous strings, heterogeneous mix.', 'Run `type()` on each element to prove Python allows mixing.', 'Demonstrate `list(\'abc\')` vs `[1,2,3]` vs `list([1,2,3])` to clarify `list()` constructor argument.', 'Use `id()` to show `a = [1,2]; b = a; b[0]=99` changes `a` too, then contrast with `c = a[:]` (slicing copy, taught.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_002', difficulty: 'standard',
          question: 'Indexing is the mechanism to access individual elements of a list using their.',
          hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different.',
          misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError.',
          parts: [
                { id: 'a', prompt: 'What is the output of `lst = [10, 20, 30, 40, 50]; print(lst[-3])`?', answer: 'The output is `30`',
                  options: ['The output is `30`', 'slicing with an out-of-range index (e'],
                  hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different lengths.',
                  misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError, just like indexing.' },
                { id: 'b', prompt: 'Explain why `lst = [1,2,3]; print(lst[5])` raises an IndexError but `print(lst[5:10])` returns an empty list `[]`.', answer: 'Indexing accesses a single specific position',
                  options: ['Indexing accesses a single specific position', 'both give error', 'both give empty', 'slicing with an out-of-range index (e'],
                  hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different lengths.',
                  misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError, just like indexing.' },
                { id: 'c', prompt: 'Given `data = [\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\']`, write the slicing expression to extract `[\'c\',\'e\',\'g\']` (every second element starting from \'c\').', answer: 'The expression is `data[2::2]`',
                  options: ['The expression is `data[2::2]`', 'slicing with an out-of-range index (e'],
                  hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different lengths.',
                  misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError, just like indexing.' },
                { id: 'd', prompt: 'Compare the results of `lst[::-1]` and `lst[::-2]` for `lst = [10, 20, 30, 40, 50]`. What does the step value -2 achieve that -1 does not?', answer: '`lst[::-1]` gives `[50, 40, 30, 20, 10]` (full reversal)',
                  options: ['`lst[::-1]` gives `[50, 40, 30, 20, 10]` (full reversal)', 'slicing with an out-of-range index (e'],
                  hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different lengths.',
                  misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError, just like indexing.' }
          ],
            remediations: { 'slicing-with-an-out-of': { steps: ['First, have the student physically trace indices on paper: write a 5-element list with both positive (0-4) and negative.', 'Then, for slicing, draw the "fencepost" model: indices mark boundaries BETWEEN elements, not the elements themselves.', 'Show that `lst[2:5]` means "start at fencepost 2, stop at fencepost 5".', 'Demonstrate in Python shell: `lst = [1,2,3]; print(lst[5])` (error) vs `print(lst[5:10])` (empty).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError.',
          parts: [
                { id: 'a', prompt: 'A student writes `marks = [85, 90, 78, 92, 88]; top_three = marks[-3:]` to get the last three marks. Another writes `top_three = marks[2:]`. Are both correct?', answer: 'Both are correct for this specific 5-element list',
                  options: ['Both are correct for this specific 5-element list', 'only first is correct', 'both always correct', 'slicing with an out-of-range index (e'],
                  hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different lengths.',
                  misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError, just like indexing.' },
                { id: 'b', prompt: 'Design a list `scores` of 8 integers and a single slicing expression that extracts the middle 4 elements (positions 2,3,4,5 in 0-based indexing) regardless.', answer: 'Example: `scores = [10,20,30,40,50,60,70,80]`',
                  options: ['Example: `scores = [10,20,30,40,50,60,70,80]`', 'slicing with an out-of-range index (e'],
                  hint: 'Revisit list creation (node c11_ip_cbse_04_001) and practice writing lists of different lengths.',
                  misconception: 'Students believe that slicing with an out-of-range index (e.g., `lst[2:100]` on a 5-element list) raises an IndexError, just like indexing.' }
          ],
            remediations: { 'slicing-with-an-out-of': { steps: ['First, have the student physically trace indices on paper: write a 5-element list with both positive (0-4) and negative.', 'Then, for slicing, draw the "fencepost" model: indices mark boundaries BETWEEN elements, not the elements themselves.', 'Show that `lst[2:5]` means "start at fencepost 2, stop at fencepost 5".', 'Demonstrate in Python shell: `lst = [1,2,3]; print(lst[5])` (error) vs `print(lst[5:10])` (empty).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_003', difficulty: 'standard',
          question: 'List operations in Python include concatenation (+) which joins two lists into.',
          hint: 'Revisit list creation (c11_ip_cbse_04_001) and indexing/slicing (c11_ip_cbse_04_002).',
          misconception: 'Students often believe `list1 + list2` modifies `list1` in-place (like `extend`) because the `+` symbol resembles.',
          parts: [
                { id: 'a', prompt: 'What is the result of the expression `[1, 2] + [3, 4]` and what is the data type of the result?', answer: 'The result is `[1, 2, 3, 4]` of type `list`',
                  options: ['The result is `[1, 2, 3, 4]` of type `list`', 'concatenation nests lists (confusing with append)'],
                  hint: 'Revisit list creation (c11_ip_cbse_04_001) and indexing/slicing (c11_ip_cbse_04_002) — practice.',
                  misconception: 'Students often believe `list1 + list2` modifies `list1` in-place (like `extend`) because the `+` symbol resembles addition assignment `+=`.' }
          ],
            remediations: { 'list1-list2-modifies-list1-in': { steps: ['Show the student a memory diagram: draw two boxes for `list1` and `list2`, then show `list1 + list2` creates a third.', 'Contrast with `list1.extend(list2)` where `list1` box grows.', 'Have them run `id(list1)` before and after `list1 + list2` to see the identity change.', 'Then run `id(list1)` before and after `list1 += list2` (which is in-place) to see the difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_004', difficulty: 'standard',
          question: 'List methods `append()`, `insert()`, `remove()`, `pop()`, `sort()`, and.',
          hint: 'Revisit list creation (c11_ip_cbse_04_001) and indexing/slicing (c11_ip_cbse_04_002) with.',
          misconception: '**Students treat `sort()` and `reverse()` as if they return the modified list.** They write `L = L.sort()` or `L.',
          parts: [
                { id: 'a', prompt: 'Trace the list `L = [10, 20, 30, 20, 40]` after these statements: ```python L.remove(20) L.pop(1) L.insert(1, 25) L.sort() ``` Write the final list.', answer: 'Step-by-step: 1',
                  options: ['Step-by-step: 1', '`sort()` returns a new list or forgets it mutates in-place'],
                  hint: 'Revisit list creation (c11_ip_cbse_04_001) and indexing/slicing (c11_ip_cbse_04_002) with emphasis.',
                  misconception: '**Students treat `sort()` and `reverse()` as if they return the modified list.** They write `L = L.sort()` or `L = L.reverse()`, which sets.' },
                { id: 'b', prompt: 'Compare the effects of `L.sort()` followed by `L.reverse()` versus `L.sort(reverse=True)` on a list `L = [3, 1, 4, 2]`. Are the final lists identical? Justify.', answer: 'Yes, both produce `[4, 3, 2, 1]`',
                  options: ['Yes, both produce `[4, 3, 2, 1]`', 'different'],
                  hint: 'Revisit list creation (c11_ip_cbse_04_001) and indexing/slicing (c11_ip_cbse_04_002) with emphasis.',
                  misconception: '**Students treat `sort()` and `reverse()` as if they return the modified list.** They write `L = L.sort()` or `L = L.reverse()`, which sets.' }
          ],
            remediations: { 'students-treat-sort-and-reverse': { steps: ['**Show the memory model**: Draw two variables `a = [3,1,2]` and `b = a`.', 'Execute `a.sort()` and ask "What is `b`?" — they see both change.', '**Contrast with `sorted()`**: Run `c = sorted(a)` and ask "Is `c` the same object as `a`?" — use `id()` to prove new.', '**Practice rule**: "If a list method **returns a value**, capture it; if it **returns `None`**, never assign it." Drill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_005', difficulty: 'standard',
          question: 'Traversing a list is the process of systematically accessing each element of.',
          hint: 'Revisit list indexing and `len()`: practice predicting `list1[len(list1)-1]` and.',
          misconception: 'Students believe `for item in my_list:` allows modification of the original list by assigning to `item` (e.g., `for.',
          parts: [
                { id: 'a', prompt: 'Explain why the following `while` loop causes an infinite loop and how to fix it: ```python data = [5, 10, 15] i = 0 while i < len(data): print(data[i]) #.', answer: 'The loop prints `5` endlessly',
                  options: ['The loop prints `5` endlessly', 'it prints all elements once'],
                  hint: 'Revisit list indexing and `len()`: practice predicting `list1[len(list1)-1]` and.',
                  misconception: 'Students believe `for item in my_list:` allows modification of the original list by assigning to `item` (e.g., `for x in L: x = x * 2`).' },
                { id: 'b', prompt: 'Compare the two traversals for a list `L = [\'a\', \'b\', \'c\']`: (A) `for x in L: print(x)` (B) `for i in range(len(L)): print(L[i])` When would (B) be necessary.', answer: '(B) is necessary when the index is needed, e.g., modifying elements (`L[i] =',
                  options: ['(B) is necessary when the index is needed, e.g., modifying elements (`L[i] =', 'they are the same'],
                  hint: 'Revisit list indexing and `len()`: practice predicting `list1[len(list1)-1]` and.',
                  misconception: 'Students believe `for item in my_list:` allows modification of the original list by assigning to `item` (e.g., `for x in L: x = x * 2`).' }
          ],
            remediations: { 'for-item-in-my-list': { steps: ['Show memory diagram: `L = [10, 20]`; `for x in L:` creates `x` as a new variable pointing to the same integer object.', 'Contrast with `L[i] = 30` which mutates the list container.', 'Practice exercise: "Predict output of `L=[1,2]; for x in L: x=99; print(L)`" then run it.', 'Emphasize: "To change the list, you must use the list name and index: `L[i] = new_value`."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_04_006', difficulty: 'standard',
          question: 'A tuple is an ordered, immutable sequence of elements enclosed in parentheses.',
          hint: 'Revisit c11_ip_cbse_04_002 (indexing/slicing) and c11_ip_cbse_04_004 (list methods).',
          misconception: 'Students believe "tuples are just lists with parentheses" and try to use list methods like `.append()`, `.remove()`,.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax to create a tuple containing only the integer `42`?', answer: 'The correct syntax is `(42,)`',
                  options: ['The correct syntax is `(42,)`', 'tuples are just lists with parentheses', '"tuples are just lists with parentheses" and try to use list methods like `'],
                  hint: 'Revisit c11_ip_cbse_04_002 (indexing/slicing) and c11_ip_cbse_04_004 (list methods) — practice.',
                  misconception: 'Students believe "tuples are just lists with parentheses" and try to use list methods like `.append()`, `.remove()`, or `.sort()`.' },
                { id: 'b', prompt: 'Explain in your own words why the following code raises an error: `t = (1, 2, 3); t[0] = 10`', answer: 'Tuples are immutable',
                  options: ['Tuples are immutable', 'tuples don\'t support indexing', 'tuples are just lists with parentheses', '"tuples are just lists with parentheses" and try to use list methods like `'],
                  hint: 'Revisit c11_ip_cbse_04_002 (indexing/slicing) and c11_ip_cbse_04_004 (list methods) — practice.',
                  misconception: 'Students believe "tuples are just lists with parentheses" and try to use list methods like `.append()`, `.remove()`, or `.sort()`.' },
                { id: 'c', prompt: 'Given `t1 = (1, 2)` and `t2 = (3, 4)`, write code to create a new tuple `t3` containing all elements of `t1` followed by all elements of `t2` without modifying.', answer: '`t3 = t1 + t2` creates a new tuple `(1, 2, 3, 4)`',
                  options: ['`t3 = t1 + t2` creates a new tuple `(1, 2, 3, 4)`', 'tuples are just lists with parentheses', '"tuples are just lists with parentheses" and try to use list methods like `'],
                  hint: 'Revisit c11_ip_cbse_04_002 (indexing/slicing) and c11_ip_cbse_04_004 (list methods) — practice.',
                  misconception: 'Students believe "tuples are just lists with parentheses" and try to use list methods like `.append()`, `.remove()`, or `.sort()`.' },
                { id: 'd', prompt: 'Compare the memory behavior of `l = [1, 2]; l[0] = 10` versus `t = (1, 2); t = (10, 2)`. Which modifies in-place and which creates a new object?', answer: 'The list operation modifies in-place (same `id(l)` before/after)',
                  options: ['The list operation modifies in-place (same `id(l)` before/after)', 'tuples are just lists with parentheses', '"tuples are just lists with parentheses" and try to use list methods like `'],
                  hint: 'Revisit c11_ip_cbse_04_002 (indexing/slicing) and c11_ip_cbse_04_004 (list methods) — practice.',
                  misconception: 'Students believe "tuples are just lists with parentheses" and try to use list methods like `.append()`, `.remove()`, or `.sort()`.' }
          ],
            remediations: { 'tuples-are-just-lists-with': { steps: ['Show the `TypeError` and `AttributeError` messages side-by-side with list equivalents that succeed.', 'Use `dir(list)` vs `dir(tuple)` to visually compare available methods — tuples lack all mutating methods.', 'Have student write a function `safe_first_element(seq)` that returns `seq[0]`; test with list and tuple to prove access.', 'Emphasize: "If you need to change it, use a list.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
