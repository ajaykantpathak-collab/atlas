import type { SimDef } from '../../engine/types';
import C11_ComputerScienceDataStructuresIntroductionSim from '../../../simulations/c6_12/C11_ComputerScienceDataStructuresIntroductionSim';

/** v3 wrapped master — C11_ComputerScienceDataStructuresIntroductionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencedatastructuresintroductionsim: SimDef = {
    id: 'v3w_c11_computersciencedatastructuresintroductionsim',
    title: 'Data Structures Introduction',
    subtitle: 'This node covers the conceptual foundation of data structures: definition, need,.',
    classLevel: 11, subject: 'computer_science', topic: 'Introduction to Data Structures',
    chapters: [],
    nodeIds: ['c11_cs_cbse_10_001', 'c11_cs_cbse_10_002', 'c11_cs_cbse_10_003', 'c11_cs_cbse_10_004', 'c11_cs_cbse_10_009', 'c11_cs_cbse_10_012', 'c11_cs_cbse_10_013', 'c11_cs_cbse_10_014', 'c11_cs_cbse_01_002', 'c11_cs_cbse_01_005', 'c11_cs_cbse_03_001', 'c11_cs_cbse_03_004', 'c11_cs_cbse_11_003', 'c11_cs_cbse_11_009', 'c11_cs_cbse_09_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are building a music playlist app: you need to add songs, play the most recently added song first.', goal: 'Master Data Structures Introduction.' },
    discovery: {
        question: 'A school wants to maintain a record of students waiting to see the principal. Students join the line at the end and are called from the front.',
        options: ['Queue models this situation', 'last added served first', 'push/pop'],
        answer: 'Queue models this situation',
        hook: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure.',
    },
    teaching: [
        { title: 'A data structure is a specialized format for.', text: 'A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory so that it can be accessed and modified efficiently; it defines the logical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_001', title: 'A data structure is a specialized.',
          scaffold: { problem: 'A library stores book records in a system. Each record has: Accession Number (unique integer), Title (string), Author (string), Status.',
            steps: [
            { text: 'Identify the access patterns: (a) is exact-key lookup, (b) is search by non-key attribute, (c) and (d) are dynamic.' },
            { text: 'Compare linear structures (array/list): lookup by accession requires O(n) linear search unless sorted (then O(log n).' },
            { text: 'Compare non-linear structures: Hash table (dictionary) on accession gives O(1) average lookup; secondary index (author.' },
            { text: 'Evaluate trade-offs: Hash table best for primary key ops; author search needs auxiliary structure.' },
            { text: 'Conclude: Non-linear (hash table/dictionary) is recommended for O(1) accession lookup and O(1) insert/delete; maintain.', faded: true, blankAnswer: 'Non-linear data structure (Hash Table / Dictionary) keyed.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_002', title: 'A stack is a linear data structure that.',
          scaffold: { problem: 'A web browser\'s back button uses a stack to store visited URLs. Initially the stack is empty.',
            steps: [
            { text: 'Identify the initial state — empty stack, no current page.' },
            { text: 'Visit "google.com" → push onto stack. Stack: ["google.com"] (top). Current page: google.com.' },
            { text: 'Visit "wikipedia.org" → push onto stack. Stack: ["google.com", "wikipedia.org"] (top). Current page: wikipedia.org.' },
            { text: 'Visit "github.com" → push onto stack. Stack: ["google.com", "wikipedia.org", "github.com"] (top).' },
            { text: 'Click back → pop top URL ("github.com"), new top is "wikipedia.org". Current page: wikipedia.org.' },
            { text: 'Click back again → pop top URL ("wikipedia.org"), new top is "google.com". Current page: google.com.' },
            { text: 'Visit "stackoverflow.com" → push onto stack. Stack: ["google.com", "stackoverflow.com"] (top).' },
            { text: 'Verify final state — stack has 2 URLs, top is stackoverflow.com, which is the displayed page.', faded: true, blankAnswer: 'Final stack (bottom to top): ["google.com",.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_003', title: 'Stack operations **Push** and **Pop**.',
          scaffold: { problem: 'A stack of maximum size 6 is initially empty. Perform the following operations in sequence and show the stack contents (top to bottom) and.',
            steps: [
            { text: 'Initialize stack array of size 6, top = -1. Empty stack: [].' },
            { text: 'push(12): Check overflow (top= -1 ≠ 5) → OK. Increment top to 0. Store 12 at index 0. Stack: [12], top=0.' },
            { text: 'push(24): Check overflow (top=0 ≠5) → OK. Increment top to 1. Store 24 at index 1. Stack: [24,12], top=1.' },
            { text: 'push(36): Check overflow (top=1 ≠5) → OK. Increment top to 2. Store 36 at index 2. Stack: [36,24,12], top=2.' },
            { text: 'pop(): Check underflow (top=2 ≠ -1) → OK. Retrieve stack[2]=36. Decrement top to 1. Return 36. Stack: [24,12], top=1.' },
            { text: 'push(48): Check overflow (top=1 ≠5) → OK. Increment top to 2. Store 48 at index 2. Stack: [48,24,12], top=2.' },
            { text: 'pop(): Check underflow (top=2 ≠ -1) → OK. Retrieve 48. Decrement top to 1. Return 48. Stack: [24,12], top=1.' },
            { text: 'pop(): Check underflow (top=1 ≠ -1) → OK. Retrieve 24. Decrement top to 0. Return 24. Stack: [12], top=0.' },
            { text: 'push(60): Check overflow (top=0 ≠5) → OK. Increment top to 1. Store 60 at index 1. Stack: [60,12], top=1.' },
            { text: 'pop(): Check underflow (top=1 ≠ -1) → OK. Retrieve 60. Decrement top to 0. Return 60. Stack: [12], top=0.' },
            { text: 'pop(): Check underflow (top=0 ≠ -1) → OK. Retrieve 12. Decrement top to -1. Return 12. Stack: [], top=-1.' },
            { text: 'pop(): Check underflow (top=-1) → UNDERFLOW ERROR. Stack empty, cannot pop.', faded: true, blankAnswer: 'Final stack empty (top=-1). Operations returned: 36, 48,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_004', title: 'Implementation of Stack Using List in.',
          scaffold: { problem: 'Implement a Stack class using Python list with methods `push`, `pop`, `peek`, `is_empty`, and `size`.',
            steps: [
            { text: 'Define class Stack with __init__ initializing an empty list `self._items = []` (underscore indicates internal use).' },
            { text: 'Implement push(item) using `self._items.append(item)` — adds to end (top).' },
            { text: 'Implement pop() — check if empty using `if not self._items:` then raise IndexError("Stack underflow"); else return.' },
            { text: 'Implement peek() — check empty, raise error if so; else return `self._items[-1]` (last element) without removing.' },
            { text: 'Implement is_empty() returning `len(self._items) == 0` and size() returning `len(self._items)`.' },
            { text: 'Create instance, call push(5), push(10), push(15), pop() → returns 15, peek() → returns 10, size() → returns 2.', faded: true, blankAnswer: 'After operations: pop returns 15, peek returns 10, size.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_009', title: 'A queue is a linear data structure that.',
          scaffold: { problem: 'At a bank\'s single teller counter, customers arrive in this order: Rahul (10:00), Priya (10:05), Amit (10:10).',
            steps: [
            { text: 'Identify the real-world entities: customers are elements, arrival = enqueue at rear, service = dequeue from front.' },
            { text: 'Initialize empty queue: front = rear = None.' },
            { text: 'Rahul arrives at 10:00 → enqueue(Rahul). Queue: [Rahul] (front=Rahul, rear=Rahul).' },
            { text: 'Priya arrives at 10:05 → enqueue(Priya). Queue: [Rahul, Priya] (front=Rahul, rear=Priya).' },
            { text: 'Amit arrives at 10:10 → enqueue(Amit). Queue: [Rahul, Priya, Amit] (front=Rahul, rear=Amit).' },
            { text: 'Teller becomes free → dequeue() → serves Rahul. Queue: [Priya, Amit] (front=Priya, rear=Amit).' },
            { text: 'Teller free again → dequeue() → serves Priya. Queue: [Amit] (front=Amit, rear=Amit).' },
            { text: 'Teller free again → dequeue() → serves Amit. Queue: empty.', faded: true, blankAnswer: 'Served order: 1st Rahul, 2nd Priya, 3rd Amit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_012', title: 'A queue implemented using.',
          scaffold: { problem: 'Implement a queue for a railway ticket counter using `collections.deque`. The counter serves passengers in FIFO order.',
            steps: [
            { text: 'Import deque from collections and define TicketQueue class with __init__ initializing empty deque' },
            { text: 'Implement add_passenger using self._queue.append(name) — adds to rear (right) in O(1)' },
            { text: 'Implement serve_passenger using self._queue.popleft() — removes from front (left) in O(1), raise exception if empty' },
            { text: 'Implement next_passenger returning self._queue[0] (peek front) without removal, raise exception if empty' },
            { text: 'Implement waiting_count returning len(self._queue) and is_empty returning len(self._queue) == 0' },
            { text: 'Test trace: add "Rahul" → deque([\'Rahul\']); add "Priya" → deque([\'Rahul\', \'Priya\']); add "Amit" → deque([\'Rahul\',.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'dissect', nodeId: 'c11_cs_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Data Structures Introduction', spots: [
            { id: 's1', label: 'A data structure is a', prompt: 'Which idea is this? — A data structure is a specialized format for organizing, processing, retrieving, and.', answer: 'A data structure is a', options: ['A data structure is a', 'A stack is a linear', 'Stack operations Push and Pop', 'Implementation of Stack Using List'] },
            { id: 's2', label: 'A stack is a linear', prompt: 'Which idea is this? — A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,.', answer: 'A stack is a linear', options: ['A stack is a linear', 'A data structure is a', 'Stack operations Push and Pop', 'Implementation of Stack Using List'] },
            { id: 's3', label: 'Stack operations Push and Pop', prompt: 'Which idea is this? — Stack operations **Push** and **Pop** are the fundamental insertion and deletion.', answer: 'Stack operations Push and Pop', options: ['Stack operations Push and Pop', 'A data structure is a', 'A stack is a linear', 'Implementation of Stack Using List'] },
            { id: 's4', label: 'Implementation of Stack Using List', prompt: 'Which idea is this? — Implementation of Stack Using List in Python refers to using Python\'s built-in mutable.', answer: 'Implementation of Stack Using List', options: ['Implementation of Stack Using List', 'A data structure is a', 'A stack is a linear', 'Stack operations Push and Pop'] },
            { id: 's5', label: 'A queue is a linear', prompt: 'Which idea is this? — A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle,.', answer: 'A queue is a linear', options: ['A queue is a linear', 'A data structure is a', 'A stack is a linear', 'Stack operations Push and Pop'] },
            { id: 's6', label: 'A queue implemented using collectionsdeque', prompt: 'Which idea is this? — A queue implemented using `collections.deque` leverages a double-ended queue data.', answer: 'A queue implemented using collectionsdeque', options: ['A queue implemented using collectionsdeque', 'A data structure is a', 'A stack is a linear', 'Stack operations Push and Pop'] }
          ] } }
    ],
    explore: { component: C11_ComputerScienceDataStructuresIntroductionSim, prompt: 'Explore the interactive — Data Structures Introduction' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_001', difficulty: 'standard',
          question: 'A data structure is a specialized format for organizing, processing,.',
          hint: 'Revise Class 9 Mathematics Chapter 8: Sequences (explicit and recursive rules, nth term.',
          misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure.',
          parts: [
                { id: 'a', prompt: 'A school wants to maintain a record of students waiting to see the principal. Students join the line at the end and are called from the front.', answer: 'Queue models this situation',
                  options: ['Queue models this situation', 'last added served first', 'push/pop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' },
                { id: 'b', prompt: 'Compare the time complexity of searching for an element in an unsorted array versus a binary search tree (BST) in the average case.', answer: 'Unsorted array: O(n) linear search',
                  options: ['Unsorted array: O(n) linear search', 'BST is always faster', 'data structure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['Show the student a timing experiment—run `push`/`pop` at end of list (O(1)) vs `insert(0)`/`pop(0)` at front (O(n)) for.', 'Ask them to implement a function `is_balanced(parentheses_string)` using only `append` and `pop` (end of list) to.', 'Have them write a `Stack` class that wraps a list but *only* exposes `push`, `pop`, `peek`, `is_empty`—hide the.', 'Explain that the *interface* (what operations exist) and *complexity promise* (how fast they are) together define the.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure.',
          parts: [
                { id: 'a', prompt: 'Design a minimal data structure to implement an "undo" feature in a text editor that supports only two operations: type(character) and undo().', answer: 'ADT: Stack (LIFO)',
                  options: ['ADT: Stack (LIFO)', 'data structure', 'data type', 'universal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' },
                { id: 'b', prompt: 'Compare the time complexity of searching for an element in an unsorted array versus a binary search tree (BST) in the average case.', answer: 'Unsorted array: O(n) linear search',
                  options: ['Unsorted array: O(n) linear search', 'BST is always faster', 'data structure', 'data type'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['Show the student a timing experiment—run `push`/`pop` at end of list (O(1)) vs `insert(0)`/`pop(0)` at front (O(n)) for.', 'Ask them to implement a function `is_balanced(parentheses_string)` using only `append` and `pop` (end of list) to.', 'Have them write a `Stack` class that wraps a list but *only* exposes `push`, `pop`, `peek`, `is_empty`—hide the.', 'Explain that the *interface* (what operations exist) and *complexity promise* (how fast they are) together define the.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_002', difficulty: 'standard',
          question: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO).',
          hint: 'Revisit c11_cs_cbse_10_001 and focus on the distinction between "what a data structure.',
          misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s.',
          parts: [
                { id: 'a', prompt: 'Trace the state of a stack after the following sequence of operations on an initially empty stack: push(10), push(20), push(30), pop(), push(40), pop(), pop().', answer: 'Step-by-step trace: 1',
                  options: ['Step-by-step trace: 1', 'stack is just a Python list with append and pop', 'pop removes from bottom (FIFO) or doesn\'t update the top pointer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s capabilities (indexing,.' }
          ],
            remediations: { 'stack-is-just-a-python': { steps: ['If the student exhibits this misconception: 1.', '**Draw a clear boundary**: On paper, draw a box labeled "Stack ADT" with only two arrows: push → (into top) and pop ←.', 'Label the box "No other operations allowed".', '**Contrast with list**: Draw another box "Python List" with arrows for append, pop, insert, index, slice, reverse.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since a stack only allows access at the top, it is less useful than a list which allows access anywhere.', answer: 'The claim is false',
                  options: ['The claim is false', 'stack is just a Python list with append and pop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s capabilities (indexing,.' }
          ],
            remediations: { 'stack-is-just-a-python': { steps: ['If the student exhibits this misconception: 1.', '**Draw a clear boundary**: On paper, draw a box labeled "Stack ADT" with only two arrows: push → (into top) and pop ←.', 'Label the box "No other operations allowed".', '**Contrast with list**: Draw another box "Python List" with arrows for append, pop, insert, index, slice, reverse.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_003', difficulty: 'standard',
          question: 'Stack operations **Push** and **Pop** are the fundamental insertion and.',
          hint: 'Revisit c11_cs_cbse_10_002: draw a stack diagram, label `top`, and explain why you cannot.',
          misconception: 'Students often believe that **pop() only reads the top value without removing it**, confusing it with the peek.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion',
                  options: ['Stack operations **Push** and **Pop** are the fundamental insertion and deletion', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Implementation of Stack Using List in Python refers to using Python\'s built-in mutable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **pop() only reads the top value without removing it**, confusing it with the peek operation.' }
          ],
            remediations: { 'pop-only-reads-the-top': { steps: ['**Re-anchor the pointer convention**: Draw the array with indices 0..4.', 'Write `top = -1` beside it.', 'Ask: "Where does the *first* element go?', 'So what must we do to `top` before storing?" → Increment to 0.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_004', difficulty: 'standard',
          question: 'Implementation of Stack Using List in Python refers to using Python\'s built-in.',
          hint: 'Revisit c11_cs_cbse_10_003 (Stack Operations) and practice tracing push/pop on paper with.',
          misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Implementation of Stack Using List in Python refers to using Python\'s built-in mutable',
                  options: ['Implementation of Stack Using List in Python refers to using Python\'s built-in mutable', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without wrapping them in a.' }
          ],
            remediations: { 'list-is-a-stack-and': { steps: ['Show the student a list `s = [1,2,3]` and ask: "If this is a stack with top at end, what does `s.insert(0, 99)` do to.', 'Ask them to write a function `reverse_string(s)` using only stack operations (push/pop) on a list.', 'If they use `s[::-1]` or `reversed()`, stop them: "You used list features, not stack operations." 3.', 'Have them implement the `Stack` class from scratch, forcing all access through methods.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without.',
          parts: [
                { id: 'a', prompt: 'Critique this Stack class implementation. Identify two design flaws: ```python class Stack: def __init__(self): self.items = [] def push(self, item):.', answer: 'Flaw 1: Uses `insert(0, item)` and `pop(0)` making push/pop O(n) instead of O(1)',
                  options: ['Flaw 1: Uses `insert(0, item)` and `pop(0)` making push/pop O(n) instead of O(1)', 'list is a stack', '"list is a stack" and directly use `list'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without wrapping them in a.' },
                { id: 'b', prompt: 'Design a `Stack` class that supports a `get_min()` method returning the minimum element in O(1) time, using only a single auxiliary list (no extra data.', answer: 'Maintain a parallel `min_stack` list',
                  options: ['Maintain a parallel `min_stack` list', 'list is a stack', '"list is a stack" and directly use `list'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without wrapping them in a.' }
          ],
            remediations: { 'list-is-a-stack-and': { steps: ['Show the student a list `s = [1,2,3]` and ask: "If this is a stack with top at end, what does `s.insert(0, 99)` do to.', 'Ask them to write a function `reverse_string(s)` using only stack operations (push/pop) on a list.', 'If they use `s[::-1]` or `reversed()`, stop them: "You used list features, not stack operations." 3.', 'Have them implement the `Stack` class from scratch, forcing all access through methods.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_009', difficulty: 'standard',
          question: 'A queue is a linear data structure that follows the First-In-First-Out (FIFO).',
          hint: 'Revisit the stack definition and LIFO principle (c11_cs_cbse_10_002) and trace a stack.',
          misconception: 'Students often think a queue allows insertion or deletion at both ends because they confuse it with a deque.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle,',
                  options: ['A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle,', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a queue allows insertion or deletion at both ends because they confuse it with a deque (double-ended queue).' }
          ],
            remediations: { 'a-queue-allows-insertion-or': { steps: ['Draw a horizontal line with arrows: label left end "FRONT (deletion)" and right end "REAR (insertion)".', 'Use a physical analogy: a pipe where balls enter at the right (rear) and exit at the left (front).', 'Have the student trace insertion of A, B, C step by step, writing the queue state after each step: [A] → [A, B] → [A,.', 'Then trace deletion: remove A → [B, C]; remove B → [C].'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_012', difficulty: 'standard',
          question: 'A queue implemented using `collections.deque` leverages a double-ended queue.',
          hint: 'Revisit c11_cs_cbse_10_011 (list-based queue) and manually trace `pop(0)` on a list of 5.',
          misconception: 'Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for dequeue (treating.',
          parts: [
                { id: 'a', prompt: 'What is the time complexity of `deque.popleft()` and why is it more efficient than `list.pop(0)` for queue dequeue operations?', answer: '`deque.popleft()` operates in O(1) time',
                  options: ['`deque.popleft()` operates in O(1) time', 'faster list', '`deque` is just a "faster list" and use `q'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for dequeue (treating it like a stack), or.' },
                { id: 'b', prompt: 'Given `from collections import deque; q = deque([10, 20, 30])`, what does `q.append(40)` followed by `q.popleft()` return, and what is the final state of `q`?', answer: '`q.append(40)` adds 40 to the rear, making deque `[10, 20, 30, 40]`',
                  options: ['`q.append(40)` adds 40 to the rear, making deque `[10, 20, 30, 40]`', 'faster list', '`deque` is just a "faster list" and use `q'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for dequeue (treating it like a stack), or.' }
          ],
            remediations: { 'deque-is-just-a-faster': { steps: ['Draw a horizontal line labeled "TIME" with arrows →.', 'Mark "FRONT (oldest)" on left, "REAR (newest)" on right.', 'Show `deque` as a box with `popleft()` arrow exiting LEFT, `append()` arrow entering RIGHT.', 'Trace 3 operations physically: ENQUEUE A → `append(A)` adds to right; ENQUEUE B → `append(B)` adds to right of A;.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
