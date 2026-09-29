import type { SimDef } from '../../engine/types';
import C11_ComputerScienceJavaIteratorsListiteratorSim from '../../../simulations/c6_12/C11_ComputerScienceJavaIteratorsListiteratorSim';

/** v3 wrapped master — C11_ComputerScienceJavaIteratorsListiteratorSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencejavaiteratorslistiteratorsim: SimDef = {
    id: 'v3w_c11_computersciencejavaiteratorslistiteratorsim',
    title: 'for Loop and the range() Function',
    subtitle: 'This node covers the syntax and semantics of the `for` loop, the `range()` function with.',
    classLevel: 11, subject: 'computer_science', topic: 'for Loop and the range() Function',
    chapters: [],
    nodeIds: ['c11_cs_cbse_05_009', 'c11_cs_cbse_07_011', 'c11_cs_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you need to print "Happy Birthday" 5 times for a classmate\'s card.', goal: 'Master for Loop and the range() Function.' },
    discovery: {
        question: 'What is the exact output of the following code snippet? ```python for val in range(2, 10, 3): print(val, end=\' \') ```',
        options: ['Correct output: `2 5 8 ` (with a trailing space)', 'the stop value is inclusive', 'start defaults to 0 even when two arguments are given'],
        answer: 'Correct output: `2 5 8 ` (with a trailing space)',
        hook: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()`.',
    },
    teaching: [
        { title: 'A `for` loop in Python is a definite.', text: 'A `for` loop in Python is a definite iteration construct that executes a block of code once for each item in a sequence (like `range()`, list, string, tuple).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_05_009', title: 'A `for` loop in Python is a definite.',
          scaffold: { problem: 'A school assembly requires students to stand in rows. Row 1 has 1 student, Row 2 has 2 students, ..., Row 10 has 10 students.',
            steps: [
            { text: 'Identify the problem needs summation of integers from 1 to 10 inclusive.' },
            { text: 'Choose `range(1, 11)` because start=1 (first row), stop=11 (exclusive, so 10 is last), step=1 (default, consecutive.' },
            { text: 'Initialize accumulator `total_students = 0` before the loop.' },
            { text: 'Write the loop: `for row in range(1, 11): total_students += row`' },
            { text: 'After loop, print `total_students`. Verify: sum = 10*11/2 = 55.', faded: true, blankAnswer: 'Total students = 55' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_07_011', title: 'Traversing a dictionary using loops is.',
          scaffold: { problem: 'A shop stores the price per kg of vegetables in a dictionary `veg_prices = {"potato": 20, "tomato": 40, "onion": 30, "carrot": 50}`.',
            steps: [
            { text: 'Initialize the dictionary `veg_prices` with the given data.' },
            { text: 'Initialize a variable `total = 0` to accumulate the sum of prices.' },
            { text: 'Use a `for` loop with `.items()` to iterate over key-value pairs: `for veg, price in veg_prices.items():`.' },
            { text: 'Inside the loop, print the formatted string using f-string: `print(f"{veg}: ₹{price}/kg")` and add `price` to `total`.' },
            { text: 'After the loop, compute the average by dividing `total` by the number of items `len(veg_prices)` and print it.', faded: true, blankAnswer: '```' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_05_012', title: 'In Python, the `else` clause attached.',
          scaffold: { problem: 'A teacher has a list of roll numbers of students who submitted an assignment: `[101, 105, 110, 115, 120]`.',
            steps: [
            { text: 'Store the list of submitted roll numbers in a variable `submitted`.' },
            { text: 'Read the target roll number from the user using `input()` and convert to `int`.' },
            { text: 'Start a `for` loop iterating over each `roll` in `submitted`.' },
            { text: 'Inside the loop, check `if roll == target:` — if true, print "Assignment submitted" and `break`.' },
            { text: 'Attach an `else` clause to the `for` loop (same indentation as `for`). Inside it, print "Assignment NOT submitted".' },
            { text: 'Test with roll `110` (exists) and roll `999` (does not exist). Verify that the `else` block runs only for `999`.', faded: true, blankAnswer: 'For input 110 → "Assignment submitted". For input 999 →.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_cs_cbse_07_011', title: 'Identify each idea',
          dissect: { specimen: 'for Loop and the range() Function', spots: [
            { id: 's1', label: 'A for loop in Python', prompt: 'Which idea is this? — A `for` loop in Python is a definite iteration construct that executes a block of code.', answer: 'A for loop in Python', options: ['A for loop in Python', 'Traversing a dictionary using loops', 'In Python the else clause'] },
            { id: 's2', label: 'Traversing a dictionary using loops', prompt: 'Which idea is this? — Traversing a dictionary using loops is the process of systematically accessing each.', answer: 'Traversing a dictionary using loops', options: ['Traversing a dictionary using loops', 'A for loop in Python', 'In Python the else clause'] },
            { id: 's3', label: 'In Python the else clause', prompt: 'Which idea is this? — In Python, the `else` clause attached to a `for` or `while` loop executes exactly once.', answer: 'In Python the else clause', options: ['In Python the else clause', 'A for loop in Python', 'Traversing a dictionary using loops'] }
          ] } }
    ],
    explore: { component: C11_ComputerScienceJavaIteratorsListiteratorSim, prompt: 'Explore the interactive — for Loop and the range() Function' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_009', difficulty: 'standard',
          question: 'A `for` loop in Python is a definite iteration construct that executes a block.',
          hint: 'Revisit the `while` loop pattern for counting (c11_cs_cbse_05_008).',
          misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()`.',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following code snippet? ```python for val in range(2, 10, 3): print(val, end=\' \') ```', answer: 'Correct output: `2 5 8 ` (with a trailing space)',
                  options: ['Correct output: `2 5 8 ` (with a trailing space)', 'the stop value is inclusive', 'start defaults to 0 even when two arguments are given'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' },
                { id: 'b', prompt: 'Explain in your own words why `list(range(5))` produces `[0, 1, 2, 3, 4]` but `list(range(1, 5))` produces `[1, 2, 3, 4]`.', answer: 'The `stop` parameter is **exclusive**',
                  options: ['The `stop` parameter is **exclusive**', 'it stops at 5', 'the last number is 5'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' },
                { id: 'c', prompt: 'Write a `for` loop using `range()` to calculate the sum of the first 10 even natural numbers (2 + 4 + ... + 20).', answer: '```python total = 0 for num in range(2, 21, 2): # 2, 4, ..., 20 total += num',
                  options: ['```python total = 0 for num in range(2, 21, 2): # 2, 4, ..., 20 total += num', '`range` allocates a huge list for large `lst`'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' }
          ],
            remediations: { 'misconception-range-n-creates-a': { steps: ['**Clarify Python 3 behavior:** Explicitly state: "In Python 3 (CBSE syllabus), `range` is a *sequence type* (like.', 'It stores only `start`, `stop`, `step` and computes values on demand." 2.', '**Demonstrate memory efficiency:** Show `import sys; r = range(10**9); print(sys.getsizeof(r))` (outputs ~48 bytes) vs.', '**Practice indexing:** Have students run `r = range(10, 20); print(r[5])` (outputs 15) and explain `range` supports.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()`.',
          parts: [
                { id: 'a', prompt: 'A student writes `for k in range(10, 0, -1): print(k)` intending to print 10 down to 1. They claim `range(10, 0, -1)` includes 0 because "stop is 0".', answer: 'The claim is **false**',
                  options: ['The claim is **false**', '`range` allocates a huge list for large `lst`'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "`range(n)` creates a list of n integers in memory." **Why it happens:** In Python 2, `range()` returned a list.' }
          ],
            remediations: { 'misconception-range-n-creates-a': { steps: ['**Clarify Python 3 behavior:** Explicitly state: "In Python 3 (CBSE syllabus), `range` is a *sequence type* (like.', 'It stores only `start`, `stop`, `step` and computes values on demand." 2.', '**Demonstrate memory efficiency:** Show `import sys; r = range(10**9); print(sys.getsizeof(r))` (outputs ~48 bytes) vs.', '**Practice indexing:** Have students run `r = range(10, 20); print(r[5])` (outputs 15) and explain `range` supports.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_011', difficulty: 'standard',
          question: 'Traversing a dictionary using loops is the process of systematically accessing.',
          hint: 'If stuck, revisit dictionary methods `keys()`, `values()`, `items()` (node.',
          misconception: 'Students often believe that iterating over a dictionary with `for x in d:` yields key-value pairs, or that the loop.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Traversing a dictionary using loops is the process of systematically accessing each',
                  options: ['Traversing a dictionary using loops is the process of systematically accessing each', 'A `for` loop in Python is a definite iteration construct that executes a block of code', 'In Python, the `else` clause attached to a `for` or `while` loop executes exactly once'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that iterating over a dictionary with `for x in d:` yields key-value pairs, or that the loop variable in `for v in.' }
          ],
            remediations: { 'iterating-over-a-dictionary-with': { steps: ['Have the student write a tiny dictionary `d = {"a": 1}` and run `for x in d: print(x, type(x))` to see that `x` is a.', 'Then run `for x in d.items(): print(x, type(x))` to see that `x` is a tuple.', 'Demonstrate the mutation error: `for k in d: d["new"] = 99` crashes; explain that you cannot change the dictionary\'s.', 'Show the correct pattern for updating values: `for k in d: d[k] *= 2` works because we are not adding/removing keys.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_012', difficulty: 'standard',
          question: 'In Python, the `else` clause attached to a `for` or `while` loop executes.',
          hint: 'If confused, revisit `break` and `continue` (node c11_cs_cbse_05_011) and trace a loop.',
          misconception: 'Students often believe the `else` block executes when the loop condition is **initially false** (i.e., zero.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python for i in range(3): print(i) else: print("Loop ended") ```', answer: 'Output: ``` 0 1 2 Loop ended ``` The `else` block executes',
                  options: ['Output: ``` 0 1 2 Loop ended ``` The `else` block executes', '`else` runs when the loop is not terminated by `break`', 'not terminated by `break`'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the `else` block executes when the loop condition is **initially false** (i.e., zero iterations).' }
          ],
            remediations: { 'the-else-block-executes-when': { steps: ['**Concrete tracing**: Have the student manually trace three cases on paper: (a) loop runs zero times, (b) loop runs and.', 'Use a table with columns: Iteration, Condition, Break?, Else executes?.', '**Indentation drill**: Give them 5 snippets where `else` is mis‑indented (aligned with `if` vs `for`).', 'Ask them to predict output, then run.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the `else` block executes when the loop condition is **initially false** (i.e., zero.',
          parts: [
                { id: 'a', prompt: 'A student claims: “Putting `else` after a loop is just syntactic sugar; you can always replace it with a flag variable and an `if` after the loop.” Evaluate.', answer: 'The claim is **false** in practice',
                  options: ['The claim is **false** in practice', '`else` runs when the loop is not terminated by `break`', 'not terminated by `break`', 'the `else` block executes when the loop condition is **initially false** (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the `else` block executes when the loop condition is **initially false** (i.e., zero iterations).' }
          ],
            remediations: { 'the-else-block-executes-when': { steps: ['**Concrete tracing**: Have the student manually trace three cases on paper: (a) loop runs zero times, (b) loop runs and.', 'Use a table with columns: Iteration, Condition, Break?, Else executes?.', '**Indentation drill**: Give them 5 snippets where `else` is mis‑indented (aligned with `if` vs `for`).', 'Ask them to predict output, then run.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
