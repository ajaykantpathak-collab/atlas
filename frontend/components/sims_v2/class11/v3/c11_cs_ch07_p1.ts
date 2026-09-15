import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch07_p1: SimDef = {
    id: 'v3_c11_cs_ch07_p1',
    title: 'Tuples and Dictionaries · Part 1/3',
    subtitle: 'Use tuples for data that must not move — and learn that it\'s the comma, not the bracket, that seals it.',
    classLevel: 11, subject: 'computer_science', topic: 'Tuples and Dictionaries · Part 1/3',
    chapters: ['c11_cs_ch07'],
    nodeIds: ['c11_cs_cbse_07_001', 'c11_cs_cbse_07_002', 'c11_cs_cbse_07_003', 'c11_cs_cbse_07_004', 'c11_cs_cbse_07_005', 'c11_cs_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer guarding data that must stay constant', intro: 'Twelve sales targets, fixed all year. Choose a container that makes \'unchangeable\' a feature, not a hope.', goal: 'Create, index and slice tuples and justify immutability as a design choice.' },
    discovery: {
        question: 'You write t = (5) expecting a one-item tuple — but type(t) says int. What actually makes a tuple?',
        options: ['The comma — (5,) is a tuple; parentheses only group', 'The parentheses — but only with two or more items', 'The tuple() constructor — nothing else counts', 'Square brackets are required for single items'],
        answer: 'The comma — (5,) is a tuple; parentheses only group',
        hook: 'Parentheses are decoration; the comma is the signature. Even t = 1, 2, 3 is a tuple.',
    },
    teaching: [
        { title: 'Introduction to Tuples in Python', text: 'A tuple in Python is an ordered, immutable collection of elements that can store heterogeneous data types and allows duplicate values.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Store the RGB triple (255, 153, 51), slice out (30, 40) using negative indices, then argue tuple over list for twelve fixed monthly targets.',
        labels: ['Introduction to Tuples', 'Creating Tuples and Accessing', 'Tuple Operations: Concatenation, Repetition,', 'Tuple Methods: count', 'Tuple Immutability and its', 'Tuple Assignment and Unpacking'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_001', title: 'Introduction to Tuples in Python',
          caseStudy: { intro: 'Imagine you are writing a program to store the fixed dimensions of a rectangular box — length, width, and height — that should never change during the.',
            decisions: [{ prompt: 'What is the correct definition of a tuple in Python? Choose the most accurate statement: A) A mutable ordered collection that allows.', options: [
                { text: '**B**', outcome: 'The correct answer is **B**. A tuple is an immutable ordered collection that allows duplicates and.' },
                { text: '**tuple immutability means the entire object graph is frozen**', outcome: 'Not quite — Students often believe that **tuple immutability means the entire object graph is frozen** — i.e.', reveals: 'tuple-immutability-means-the-entire' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_002', title: 'Creating Tuples and Accessing Elements',
          caseStudy: { intro: 'Imagine you\'re storing the RGB color code for "Indian Saffron" as (255, 153, 51) — three values that must stay together in fixed order.',
            decisions: [{ prompt: 'What is the output of the following code and why? ```python t = (10,) print(type(t)) print(t[0]) ```', options: [
                { text: 'Output: ``` <class \'tuple\'> 10 ``` The trailing comma in `(10,)` makes it a tuple', outcome: 'Output: ``` <class \'tuple\'> 10 ``` The trailing comma in `(10,)` makes it a tuple; without the.' },
                { text: 'type is `int`', outcome: 'Not quite — Students believe parentheses `()` define a tuple. Actually, **commas** define a tuple; parentheses.', reveals: 'parentheses-define-a-tuple' },
                { text: 'parentheses `()` define a tuple', outcome: 'Not quite — Students believe parentheses `()` define a tuple. Actually, **commas** define a tuple; parentheses.', reveals: 'parentheses-define-a-tuple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_004', title: 'Tuple Methods: count and index',
          caseStudy: { intro: 'Imagine you have a tuple storing the daily sales (in ₹) of a small shop for a week: `sales = (1200, 1500, 1200, 1800, 1200, 2000, 1500)`.',
            decisions: [{ prompt: 'What is the output of the following code? ```python t = (10, 20, 30, 20, 40, 20) print(t.count(20)) print(t.index(20)) ```', options: [
                { text: 'Output: ``` 3 1 ``` `count(20)` returns 3', outcome: 'Output: ``` 3 1 ``` `count(20)` returns 3 because 20 appears three times.' },
                { text: '`tuple', outcome: 'Not quite — Students often believe that `tuple.index(value, start, end)` searches for the *value* within the.', reveals: 'tuple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_005', title: 'Tuple Immutability and its Implications',
          caseStudy: { intro: 'Imagine you\'re building a student database where each student\'s roll number and name must never change once assigned — like an official record.',
            decisions: [{ prompt: 'What error does Python raise when you execute the following code, and why? ```python t = (10, 20, 30) t[1] = 25 ```', options: [
                { text: 'Python raises `TypeError: \'tuple\' object does not support item assignment`', outcome: 'Python raises `TypeError: \'tuple\' object does not support item assignment`.' },
                { text: 'it changes the value to 25', outcome: 'Not quite — Students believe "tuple immutability means the tuple object can never change at all" — but they.', reveals: 'tuple-immutability-means-the-tuple' },
                { text: 'IndexError', outcome: 'Not quite — Students believe "tuple immutability means the tuple object can never change at all" — but they.', reveals: 'tuple-immutability-means-the-tuple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_006', title: 'Tuple Assignment and Unpacking',
          caseStudy: { intro: 'Imagine you are writing a program for a sweet shop that sells gift boxes containing two items: a box of rasgullas and a box of gulab jamuns.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python def get_dimensions(): return (10, 20) length, breadth = get_dimensions().', options: [
                { text: 'The output is `10 20`', outcome: 'The output is `10 20`. The function returns a tuple `(10, 20)`.' },
                { text: 'the left side creates a tuple or does not understand positional matching', outcome: 'Not quite — Students often believe that the parentheses on the left side of `a, b = (1, 2)` create a tuple.', reveals: 'the-parentheses-on-the-left' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a robotics-club tracker you store each fixed coordinate as a tuple `point = (x, y, tags_list)` — coordinates immutable, but the third slot holds a list of tags. A teammate warns: \'Tuples are immutable, so `point[2].append("obstacle")` will crash — the whole object graph is frozen.\'',
            decisions: [{ prompt: 'Will that append work?', options: [
                { text: 'Yes — it works. Tuple immutability freezes the container\'s references (you can\'t reassign point[2] to a different list), but the list object inside stays mutable and can be appended to. Container immutability ≠ content immutability.', outcome: 'The tuple guarantees \'always the same three slots\', not \'frozen contents\' — a mutable object inside a tuple can still change.' },
                { text: 'It crashes — immutable means nothing reachable through the tuple can change.', outcome: 'That over-reads immutability: only the tuple\'s own slots are locked; the objects they point to keep their own mutability rules.', reveals: 'tuple-freezes-everything' },
                { text: 'It works because tuples aren\'t really immutable — that\'s just a convention.', outcome: 'Wrong reason: try `point[0] = 5` and TypeError fires — the tuple IS immutable; the append succeeds only because the inner list is separately mutable.', reveals: 'tuples-arent-really-immutable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'A tuple is a sealed envelope — read anything inside, change nothing, and let the seal itself signal \'fixed.\'',
            decisions: [{ prompt: 'What comes next? Tuples and Dictionaries · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tuples and Dictionaries · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_001', difficulty: 'standard',
          question: 'A tuple in Python is an ordered, immutable collection of elements that can.',
          hint: 'Review list creation, indexing, and mutability from Chapter 9 (Lists) — specifically how.',
          misconception: 'Students often believe that **tuple immutability means the entire object graph is frozen** — i.e., if a tuple contains.',
          parts: [
                { id: 'a', prompt: 'What is the correct definition of a tuple in Python? Choose the most accurate statement: A) A mutable ordered collection that allows duplicates.', answer: '**B**',
                  options: ['**B**', '**tuple immutability means the entire object graph is frozen**'],
                  hint: 'Review list creation, indexing, and mutability from Chapter 9 (Lists) — specifically how.',
                  misconception: 'Students often believe that **tuple immutability means the entire object graph is frozen** — i.e., if a tuple contains a list, the list.' },
                { id: 'b', prompt: 'Explain in your own words why a tuple is more suitable than a list for storing the RGB values of a color (e.g., red = (255, 0, 0)) in a graphics program.', answer: 'A tuple is more suitable',
                  options: ['A tuple is more suitable', '**tuple immutability means the entire object graph is frozen**'],
                  hint: 'Review list creation, indexing, and mutability from Chapter 9 (Lists) — specifically how.',
                  misconception: 'Students often believe that **tuple immutability means the entire object graph is frozen** — i.e., if a tuple contains a list, the list.' }
          ],
            remediations: { 'tuple-immutability-means-the-entire': { steps: ['To fix this, do the following: 1.', '**Demonstrate live:** Create `t = (1, [2, 3])`, show `id(t[1])`, then `t[1].append(4)`, show `id(t[1])` again — same.', '**Contrast with:** `t[1] = [5, 6]` — this *does* raise `TypeError` because it tries to change the tuple\'s reference.', '**Explain:** "The tuple holds *references* (addresses).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **tuple immutability means the entire object graph is frozen** — i.e., if a tuple contains.',
          parts: [
                { id: 'a', prompt: 'A programmer wants to store the monthly sales targets for a year (12 fixed values) and says: "I\'ll use a list because I might need to sort them later.".', answer: 'A **tuple** is more appropriate',
                  options: ['A **tuple** is more appropriate', '**tuple immutability means the entire object graph is frozen**'],
                  hint: 'Review list creation, indexing, and mutability from Chapter 9 (Lists) — specifically how.',
                  misconception: 'Students often believe that **tuple immutability means the entire object graph is frozen** — i.e., if a tuple contains a list, the list.' }
          ],
            remediations: { 'tuple-immutability-means-the-entire': { steps: ['To fix this, do the following: 1.', '**Demonstrate live:** Create `t = (1, [2, 3])`, show `id(t[1])`, then `t[1].append(4)`, show `id(t[1])` again — same.', '**Contrast with:** `t[1] = [5, 6]` — this *does* raise `TypeError` because it tries to change the tuple\'s reference.', '**Explain:** "The tuple holds *references* (addresses).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_002', difficulty: 'standard',
          question: 'A tuple in Python is an ordered, immutable sequence of heterogeneous elements.',
          hint: 'Revisit c11_cs_cbse_07_001: practice identifying valid/invalid tuples and stating their.',
          misconception: 'Students believe parentheses `()` define a tuple. Actually, **commas** define a tuple; parentheses are only for.',
          parts: [
                { id: 'a', prompt: 'Explain why `t = tuple("HELLO")` creates a 5-element tuple `(\'H\',\'E\',\'L\',\'L\',\'O\')` while `t = ("HELLO",)` creates a 1-element tuple.', answer: '`tuple("HELLO")` iterates over the string, treating each character as an element',
                  options: ['`tuple("HELLO")` iterates over the string, treating each character as an element', 'both produce same result', 'parentheses `()` define a tuple'],
                  hint: 'Revisit c11_cs_cbse_07_001: practice identifying valid/invalid tuples and stating their properties.',
                  misconception: 'Students believe parentheses `()` define a tuple. Actually, **commas** define a tuple; parentheses are only for grouping/precedence (except.' },
                { id: 'b', prompt: 'Compare `t1 = (1, 2, 3)` and `t2 = tuple([1, 2, 3])`. Are they identical? What about `t3 = 1, 2, 3` (no parentheses)?', answer: 'All three create identical tuples: `(1, 2, 3)`',
                  options: ['All three create identical tuples: `(1, 2, 3)`', '`t3` is not a tuple', 'parentheses are mandatory, missing Python\'s packing mechanism', 'parentheses `()` define a tuple'],
                  hint: 'Revisit c11_cs_cbse_07_001: practice identifying valid/invalid tuples and stating their properties.',
                  misconception: 'Students believe parentheses `()` define a tuple. Actually, **commas** define a tuple; parentheses are only for grouping/precedence (except.' }
          ],
            remediations: { 'parentheses-define-a-tuple': { steps: ['Have the student type `type((5))` vs `type((5,))` vs `type(5,)` in shell — observe outputs.', 'Write three creation methods side-by-side: `a = (1,2)`, `b = tuple([1,2])`, `c = 1,2` — ask "which are tuples?" (all.', 'Demonstrate `id()` before/after `t = t + (3,)` to prove new object creation.', 'Give practice: "Create a tuple with one element \'X\'" until they consistently write `(\'X\',)`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_003', difficulty: 'standard',
          question: 'Tuple operations in Python include concatenation (joining two tuples using `+`.',
          hint: 'Revisit c11_cs_cbse_07_002: practice creating tuples with mixed types, indexing with.',
          misconception: 'Students often believe that `t1 + t2` modifies `t1` or `t2` in place (like list `extend`), or that `t * 3` repeats the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the statement `t = (1, 2, 3); t[1:3] = (9, 9)` raises a TypeError, while `t = [1, 2, 3]; t[1:3] = [9, 9]` works.', answer: 'Tuples are immutable, so slice assignment is not allowed',
                  options: ['Tuples are immutable, so slice assignment is not allowed', 'both work', 'both fail'],
                  hint: 'Revisit c11_cs_cbse_07_002: practice creating tuples with mixed types, indexing with negatives, and.',
                  misconception: 'Students often believe that `t1 + t2` modifies `t1` or `t2` in place (like list `extend`), or that `t * 3` repeats the tuple object.' }
          ],
            remediations: { 't1-t2-modifies-t1-or': { steps: ['Show the student `id(t)` before and after `t += (3, 4)` to prove the object identity changes.', 'Contrast with list: `l = [1, 2]; id(l); l += [3, 4]; id(l)` — same id.', 'Have them trace memory diagrams for `t1 = (1, 2); t2 = t1 * 2; t3 = t1 + t2` showing three distinct tuple objects.', 'Assign a micro-task: "Predict output of `t = (1,); t = t * 3; t[0] = 99` and explain the error."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_004', difficulty: 'standard',
          question: 'The `count()` method returns the number of occurrences of a specified value.',
          hint: 'Review tuple indexing and slicing from nodes c11_cs_cbse_07_002 and c11_cs_cbse_07_003.',
          misconception: 'Students often believe that `tuple.index(value, start, end)` searches for the *value* within the slice.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code? ```python t = (10, 20, 30, 20, 40, 20) print(t.count(20)) print(t.index(20)) ```', answer: 'Output: ``` 3 1 ``` `count(20)` returns 3',
                  options: ['Output: ``` 3 1 ``` `count(20)` returns 3', '`tuple'],
                  hint: 'Review tuple indexing and slicing from nodes c11_cs_cbse_07_002 and c11_cs_cbse_07_003; practice.',
                  misconception: 'Students often believe that `tuple.index(value, start, end)` searches for the *value* within the slice `tuple[start:end]` and returns the.' },
                { id: 'b', prompt: 'Explain why the following code raises a `ValueError` and how to prevent it without using `try-except`.', answer: 'The code raises `ValueError`',
                  options: ['The code raises `ValueError`', '`tuple'],
                  hint: 'Review tuple indexing and slicing from nodes c11_cs_cbse_07_002 and c11_cs_cbse_07_003; practice.',
                  misconception: 'Students often believe that `tuple.index(value, start, end)` searches for the *value* within the slice `tuple[start:end]` and returns the.' },
                { id: 'c', prompt: 'Compare the time complexity of `tuple.count(x)` and `tuple.index(x)` for a tuple of length *n*. Are they the same? Justify.', answer: 'Both are O(n) in the worst case',
                  options: ['Both are O(n) in the worst case', 'simpler', '`tuple'],
                  hint: 'Review tuple indexing and slicing from nodes c11_cs_cbse_07_002 and c11_cs_cbse_07_003; practice.',
                  misconception: 'Students often believe that `tuple.index(value, start, end)` searches for the *value* within the slice `tuple[start:end]` and returns the.' }
          ],
            remediations: { 'tuple': { steps: ['Show the student the exact signature: `tuple.index(value, start, end)` and emphasize that `start` and `end` are *bounds.', 'Write a concrete example: `t = (\'a\',\'b\',\'c\',\'b\',\'d\'); print(t.index(\'b\', 2))` outputs 3.', 'Ask: "If it returned relative index, what would it be?" (1).', 'Then show that `t[3]` is \'b\', confirming the returned index is absolute.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_005', difficulty: 'standard',
          question: 'Tuple immutability means that once a tuple object is created in Python, its.',
          hint: 'Revisit `id()` behavior with lists vs. tuples (node c11_cs_cbse_07_003) — specifically.',
          misconception: 'Students believe "tuple immutability means the tuple object can never change at all" — but they confuse *rebinding the.',
          parts: [
                { id: 'a', prompt: 'What error does Python raise when you execute the following code, and why? ```python t = (10, 20, 30) t[1] = 25 ```', answer: 'Python raises `TypeError: \'tuple\' object does not support item assignment`',
                  options: ['Python raises `TypeError: \'tuple\' object does not support item assignment`', 'it changes the value to 25', 'IndexError', 'tuple immutability means the tuple object can never change at all'],
                  hint: 'Revisit `id()` behavior with lists vs. tuples (node c11_cs_cbse_07_003) — specifically, run `l.',
                  misconception: 'Students believe "tuple immutability means the tuple object can never change at all" — but they confuse *rebinding the variable* (`t =.' },
                { id: 'b', prompt: 'Explain why the following code produces a different `id()` for `t` after the operation, and what this implies about tuple immutability: ```python t = (1, 2, 3).', answer: 'The `id()` changes',
                  options: ['The `id()` changes', 'id stays the same', 'tuple immutability means the tuple object can never change at all'],
                  hint: 'Revisit `id()` behavior with lists vs. tuples (node c11_cs_cbse_07_003) — specifically, run `l.',
                  misconception: 'Students believe "tuple immutability means the tuple object can never change at all" — but they confuse *rebinding the variable* (`t =.' },
                { id: 'c', prompt: 'Given `t = (1, 2, [3, 4])`, which of the following operations will succeed and which will fail? Explain why. (a) `t[2].append(5)` (b) `t[2] = [3, 4, 5]`', answer: '(a) **Succeeds**',
                  options: ['(a) **Succeeds**', 'tuple immutability means the tuple object can never change at all'],
                  hint: 'Revisit `id()` behavior with lists vs. tuples (node c11_cs_cbse_07_003) — specifically, run `l.',
                  misconception: 'Students believe "tuple immutability means the tuple object can never change at all" — but they confuse *rebinding the variable* (`t =.' }
          ],
            remediations: { 'tuple-immutability-means-the-tuple': { steps: ['**Show memory diagrams**: Draw two boxes — one for `t = (1,2,3)` (id=100), then `t = t + (4,)` (new box id=200, old box.', 'Ask: "Did the first box change?" 2.', '**Contrast with list**: Run `l = [1,2,3]; id_before = id(l); l.append(4); id_after = id(l)` — show same id.', 'Then do tuple concatenation — show different id.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_006', difficulty: 'standard',
          question: 'Tuple assignment (also called tuple unpacking) is a Python feature that allows.',
          hint: 'If stuck, revisit "Creating Tuples and Accessing Elements" (c11_cs_cbse_07_002) and.',
          misconception: 'Students often believe that the parentheses on the left side of `a, b = (1, 2)` create a tuple, writing `(a, b) = (1.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python def get_dimensions(): return (10, 20) length, breadth = get_dimensions() print(length, breadth) ```', answer: 'The output is `10 20`',
                  options: ['The output is `10 20`', 'the left side creates a tuple or does not understand positional matching'],
                  hint: 'If stuck, revisit "Creating Tuples and Accessing Elements" (c11_cs_cbse_07_002) and practice.',
                  misconception: 'Students often believe that the parentheses on the left side of `a, b = (1, 2)` create a tuple, writing `(a, b) = (1, 2)` and thinking the.' },
                { id: 'b', prompt: 'Explain why the following code raises a `ValueError`: ```python coordinates = (5, 10, 15) x, y = coordinates ```', answer: 'The code raises `ValueError: too many values to unpack (expected 2)`',
                  options: ['The code raises `ValueError: too many values to unpack (expected 2)`', 'it will assign 5 to x and 10 to y, ignoring 15'],
                  hint: 'If stuck, revisit "Creating Tuples and Accessing Elements" (c11_cs_cbse_07_002) and practice.',
                  misconception: 'Students often believe that the parentheses on the left side of `a, b = (1, 2)` create a tuple, writing `(a, b) = (1, 2)` and thinking the.' }
          ],
            remediations: { 'the-parentheses-on-the-left': { steps: ['Draw two parallel rows on paper: left row with variable names `a, b`, right row with tuple elements `1, 2`.', 'Draw arrows from each right element to its left target.', 'Emphasize: "No parentheses on left — those are just commas separating targets." 2.', 'Have the student manually trace `a, b = b, a` with `a=5, b=10` by first evaluating the right side as a tuple `(10, 5)`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
