import type { SimDef } from '../../engine/types';
import C12_ComputerScienceBinarySearchTreeSim from '../../../simulations/c6_12/C12_ComputerScienceBinarySearchTreeSim';

/** v3 wrapped master — C12_ComputerScienceBinarySearchTreeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencebinarysearchtreesim: SimDef = {
    id: 'v3w_c12_computersciencebinarysearchtreesim',
    title: 'Recursive Functions: Concept and Examples',
    subtitle: 'This node covers the concept of recursion, structure of a recursive function (base case,.',
    classLevel: 12, subject: 'computer_science', topic: 'Recursive Functions: Concept and Examples',
    chapters: [],
    nodeIds: ['c12_cs_cbse_09_008', 'c12_cs_cbse_11_012', 'c12_cs_cbse_08_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are standing in a queue and want to know your position from the front.', goal: 'Master Recursive Functions: Concept and Examples.' },
    discovery: {
        question: 'Explain in your own words why a recursive function must have a base case and why each recursive call must progress toward that base case.',
        options: ['The base case provides the stopping condition', 'efficiency', 'zero times anything is zero'],
        answer: 'The base case provides the stopping condition',
        hook: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves.',
    },
    teaching: [
        { title: 'A recursive function in Python is a function.', text: 'A recursive function in Python is a function that calls itself during its execution to solve a problem by breaking it down into smaller instances of the same problem, with a mandatory base case that.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_09_008', title: 'A recursive function in Python is a.',
          scaffold: { problem: 'Write a recursive function `factorial(n)` that computes the factorial of a non‑negative integer `n`.',
            steps: [
            { text: 'Identify the base case. For factorial, 0! = 1, so when `n == 0` return 1.' },
            { text: 'Identify the recursive step. For n > 0, n! = n * (n-1)!. So return `n * factorial(n-1)`.' },
            { text: 'Write the function with proper indentation and a docstring.' },
            { text: 'Trace the calls for `factorial(5)` by expanding each call until the base case is reached, then substitute back.' },
            { text: 'Verify the final result matches the known value 120.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_11_012', title: 'Searching is the algorithmic process of.',
          scaffold: { problem: 'A school library has a sorted list of 20 book IDs (integers). Write a binary search function to find if book ID 1450 exists.',
            steps: [
            { text: 'Initialize `low = 0`, `high = 19` (last index). Target = 1450.' },
            { text: 'Iteration 1: `mid = (0+19)//2 = 9`, `arr[9] = 1100`. Since 1450 > 1100, set `low = mid + 1 = 10`.' },
            { text: 'Iteration 2: `mid = (10+19)//2 = 14`, `arr[14] = 1670`. Since 1450 < 1670, set `high = mid - 1 = 13`.' },
            { text: 'Iteration 3: `mid = (10+13)//2 = 11`, `arr[11] = 1320`. Since 1450 > 1320, set `low = mid + 1 = 12`.' },
            { text: 'Iteration 4: `mid = (12+13)//2 = 12`, `arr[12] = 1450`. Match found — return index 12.', faded: true, blankAnswer: 'Book ID 1450 found at index 12 (0-based) in 4 iterations.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_08_001', title: 'A data structure is a specialized.',
          scaffold: { problem: 'A school library wants to digitize its book issue/return system. Each book has a unique ID.',
            steps: [
            { text: 'Identify the real-world behavior — books are added to the top and removed from the top.' },
            { text: 'Recognize the access pattern — the last book placed is the first one taken out (Last In, First Out).' },
            { text: 'Map LIFO behavior to the standard data structure — this is a Stack.' },
            { text: 'Name the operations — adding a book is `push`, removing a book is `pop`.' },
            { text: 'Verify — if the trolley were a queue (FIFO), the first returned book would be reshelved first, which is not what the.', faded: true, blankAnswer: 'Data structure: Stack. Principle: LIFO (Last In, First.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_11_012', title: 'Identify each idea',
          dissect: { specimen: 'Recursive Functions: Concept and Examples', spots: [
            { id: 's1', label: 'A recursive function in Python', prompt: 'Which idea is this? — A recursive function in Python is a function that calls itself during its execution to.', answer: 'A recursive function in Python', options: ['A recursive function in Python', 'Searching is the algorithmic process', 'A data structure is a'] },
            { id: 's2', label: 'Searching is the algorithmic process', prompt: 'Which idea is this? — Searching is the algorithmic process of locating a target element within a data structure.', answer: 'Searching is the algorithmic process', options: ['Searching is the algorithmic process', 'A recursive function in Python', 'A data structure is a'] },
            { id: 's3', label: 'A data structure is a', prompt: 'Which idea is this? — A data structure is a specialized format for organizing, processing, retrieving, and.', answer: 'A data structure is a', options: ['A data structure is a', 'A recursive function in Python', 'Searching is the algorithmic process'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceBinarySearchTreeSim, prompt: 'Explore the interactive — Recursive Functions: Concept and Examples' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_008', difficulty: 'standard',
          question: 'A recursive function in Python is a function that calls itself during its.',
          hint: 'Review function definition and return statements (nodes c12_cs_cbse_09_002 and.',
          misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a recursive function must have a base case and why each recursive call must progress toward that base case.', answer: 'The base case provides the stopping condition',
                  options: ['The base case provides the stopping condition', 'efficiency', 'zero times anything is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves toward the base case.' },
                { id: 'b', prompt: 'Compare the recursive and iterative implementations of factorial for `n = 5` in terms of (a) number of function calls, (b) memory usage (call stack), and (c).', answer: 'number of function calls, (',
                  options: ['number of function calls, (', 'zero times anything is zero', '"zero times anything is zero"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves toward the base case.' }
          ],
            remediations: { 'students-often-treat-recursion-as': { steps: ['Revisit the concept of a base case using a non‑programming analogy: Russian nesting dolls — the smallest doll that.', 'Write a simple countdown function `countdown(n)` that prints `n` and calls `countdown(n-1)` with base case `n==0`.', 'Trace it for `n=3` on paper, drawing each stack frame.', 'Practice converting a simple `for` loop (e.g., sum of 1..n) into recursion: identify what changes each iteration (the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following recursive function. Is it correct? If not, explain the error and fix it.', answer: 'The function is correct for non‑negative integers',
                  options: ['The function is correct for non‑negative integers', 'zero times anything is zero', '"zero times anything is zero"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves toward the base case.' },
                { id: 'b', prompt: 'Compare the recursive and iterative implementations of factorial for `n = 5` in terms of (a) number of function calls, (b) memory usage (call stack), and (c).', answer: 'number of function calls, (',
                  options: ['number of function calls, (', 'zero times anything is zero', '"zero times anything is zero"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat recursion as a magical loop and write the recursive call without ensuring the argument moves toward the base case.' }
          ],
            remediations: { 'students-often-treat-recursion-as': { steps: ['Revisit the concept of a base case using a non‑programming analogy: Russian nesting dolls — the smallest doll that.', 'Write a simple countdown function `countdown(n)` that prints `n` and calls `countdown(n-1)` with base case `n==0`.', 'Trace it for `n=3` on paper, drawing each stack frame.', 'Practice converting a simple `for` loop (e.g., sum of 1..n) into recursion: identify what changes each iteration (the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_012', difficulty: 'standard',
          question: 'Searching is the algorithmic process of locating a target element within a data.',
          hint: 'If stuck on loop indices or swapping, revisit **c12_cs_cbse_11_001** (list indexing) and.',
          misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think.',
          parts: [
                { id: 'a', prompt: 'What is the worst-case time complexity of linear search on a list of size n, and what does it mean in practical terms for a list of 10,000 elements?', answer: 'Worst-case time complexity is O(n)',
                  options: ['Worst-case time complexity is O(n)', 'binary search is always faster than linear search', '**`list'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think **`list.sort()`.' },
                { id: 'b', prompt: 'Compare selection sort and insertion sort on a nearly sorted list of 1000 elements (only 5 elements out of place). Which is more efficient and why?', answer: 'Insertion sort is far more efficient on nearly sorted data',
                  options: ['Insertion sort is far more efficient on nearly sorted data', 'both are O(n²)', 'time complexity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think **`list.sort()`.' }
          ],
            remediations: { 'binary-search-is-always-faster': { steps: ['Revisit **c12_cs_cbse_11_001** (list indexing) and **c12_cs_cbse_11_003** (slicing) — trace `arr[low:high+1]` on paper.', 'For binary search, draw the list with `low`, `mid`, `high` pointers on a whiteboard; physically move them for 3.', 'For `sort()` vs `sorted()`, write two 3-line snippets in IDLE: `a=[3,1,2]; print(a.sort())` and `b=[3,1,2];.', 'Re-diagnostic: Give an unsorted list of 8 elements; ask student to (a) linear search for a value, (b) sort then binary.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_11_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think.',
          parts: [
                { id: 'a', prompt: 'Compare selection sort and insertion sort on a nearly sorted list of 1000 elements (only 5 elements out of place). Which is more efficient and why?', answer: 'Insertion sort is far more efficient on nearly sorted data',
                  options: ['Insertion sort is far more efficient on nearly sorted data', 'both are O(n²)', 'time complexity', 'best/average/worst'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"binary search is always faster than linear search"** and apply it to unsorted lists, or they think **`list.sort()`.' }
          ],
            remediations: { 'binary-search-is-always-faster': { steps: ['Revisit **c12_cs_cbse_11_001** (list indexing) and **c12_cs_cbse_11_003** (slicing) — trace `arr[low:high+1]` on paper.', 'For binary search, draw the list with `low`, `mid`, `high` pointers on a whiteboard; physically move them for 3.', 'For `sort()` vs `sorted()`, write two 3-line snippets in IDLE: `a=[3,1,2]; print(a.sort())` and `b=[3,1,2];.', 'Re-diagnostic: Give an unsorted list of 8 elements; ask student to (a) linear search for a value, (b) sort then binary.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_001', difficulty: 'standard',
          question: 'A data structure is a specialized format for organizing, processing,.',
          hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list.',
          misconception: 'Students often believe that "data structure" and "data type" are synonyms.',
          parts: [
                { id: 'a', prompt: 'A student says: "An array is a dynamic data structure because we can add elements to it by writing code like `arr.append(5)` in Python." Is this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'data structure', 'data type'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' },
                { id: 'b', prompt: 'You are designing a system to manage the "Undo" functionality in a text editor. Which data structure would you choose and why? Explain the principle it follows.', answer: 'A **stack** is the appropriate data structure',
                  options: ['A **stack** is the appropriate data structure', 'data structure', 'data type'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' },
                { id: 'c', prompt: 'Compare and contrast the memory representation of a static array and a linked list. How does this difference affect insertion at the beginning?', answer: 'A static array uses contiguous memory locations',
                  options: ['A static array uses contiguous memory locations', 'both are O(1)', 'linked list is always faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['If the student conflates data types and data structures: (1) Show a C++ `int x;` vs `struct Node { int data; Node*.', '(2) Ask: "How many values does `x` hold?', 'How many does a `Node` hold?', 'Can a `Node` point to another `Node`?" (3) Have them classify: `float`, `array[10]`, `stack`, `binary tree` into.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "data structure" and "data type" are synonyms.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A tree is just a special case of a graph." Is this true? Justify your answer with reference to the definitions of both data structures.', answer: 'Yes, it is true',
                  options: ['Yes, it is true', 'no, they are completely different', 'data structure', 'data type'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' },
                { id: 'b', prompt: 'Create a real-world scenario (not from the textbook) that requires a **queue** data structure.', answer: 'Example: A hospital emergency room triage system',
                  options: ['Example: A hospital emergency room triage system', 'data structure', 'data type', '"data structure" and "data type" are synonyms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['If the student conflates data types and data structures: (1) Show a C++ `int x;` vs `struct Node { int data; Node*.', '(2) Ask: "How many values does `x` hold?', 'How many does a `Node` hold?', 'Can a `Node` point to another `Node`?" (3) Have them classify: `float`, `array[10]`, `stack`, `binary tree` into.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
