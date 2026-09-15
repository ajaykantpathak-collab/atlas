import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch10_p1: SimDef = {
    id: 'v3_c11_cs_ch10_p1',
    title: 'Data Structures: Stack and Queue · Part 1/3',
    subtitle: 'Choose between stack and queue by asking who gets served first.',
    classLevel: 11, subject: 'computer_science', topic: 'Data Structures: Stack and Queue · Part 1/3',
    chapters: ['c11_cs_ch10'],
    nodeIds: ['c11_cs_cbse_10_001', 'c11_cs_cbse_10_002', 'c11_cs_cbse_10_003', 'c11_cs_cbse_10_004', 'c11_cs_cbse_10_005', 'c11_cs_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer choosing structures for a playlist app', intro: 'Newest song first or first-come first-served? The access pattern picks the structure, not the other way round.', goal: 'Model LIFO and FIFO behaviour and justify why restricted access is an advantage.' },
    discovery: {
        question: 'You implement a stack as a Python list: push with insert(0, x), pop with pop(0). It behaves correctly — so is it a real stack?',
        options: ['Only in behaviour — front operations shift every element, breaking the stack\'s O(1) contract', 'Yes — any list automatically qualifies as a stack', 'No — stacks are impossible to build in Python', 'Yes — because pop(0) removes the correct element'],
        answer: 'Only in behaviour — front operations shift every element, breaking the stack\'s O(1) contract',
        hook: 'A data structure is a contract, not just a container — stacks promise constant-time ends, and a list\'s front can\'t keep that promise.',
    },
    teaching: [
        { title: 'Introduction to Data Structures', text: 'A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory so that it can be accessed and modified efficiently; it defines the logical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace push(10), push(20), push(30), pop(), push(40), pop(), pop() step by step, then pick the right structure for the principal\'s waiting line.',
        labels: ['Introduction to Data Structures', 'Stack: Definition and LIFO', 'Stack Operations: Push', 'Implementation of Stack Using', 'Peek and isEmpty Operations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_001', title: 'Introduction to Data Structures',
          caseStudy: { intro: 'Imagine you are building a music playlist app: you need to add songs, play the most recently added song first (like a stack), or play songs in the order they.',
            decisions: [{ prompt: 'Define "data structure" in your own words and give one example of a linear and one example of a non-linear data structure.', options: [
                { text: 'A data structure is a way of organizing data in memory so that specific operations', outcome: 'A data structure is a way of organizing data in memory so that specific operations (insert, delete.' },
                { text: 'it stores data', outcome: 'Not quite — Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is.', reveals: 'data-structure-and-data-type' },
                { text: 'data structure', outcome: 'Not quite — Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is.', reveals: 'data-structure-and-data-type' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_002', title: 'Stack: Definition and LIFO Principle',
          caseStudy: { intro: 'Imagine you are packing a suitcase for a trip: you place items one on top of another, and when you need something urgently at the airport, you can only access.',
            decisions: [{ prompt: 'Define a stack data structure and state the principle it follows.', options: [
                { text: 'A stack is a linear data structure where insertion and deletion of elements occur only at', outcome: 'A stack is a linear data structure where insertion and deletion of elements occur only at one end.' },
                { text: 'restricted access', outcome: 'Not quite — Students believe that "stack is just a Python list with append and pop" and therefore the.', reveals: 'stack-is-just-a-python' },
                { text: 'stack is just a Python list with append and pop', outcome: 'Not quite — Students believe that "stack is just a Python list with append and pop" and therefore the.', reveals: 'stack-is-just-a-python' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_004', title: 'Implementation of Stack Using List in Python',
          caseStudy: { intro: 'Imagine you are building a simple undo feature for a text editor: every time the user types a character, you save the previous state.',
            decisions: [{ prompt: 'What is the time complexity of `list.append()` and `list.pop()` when used to implement push and pop operations on a stack where the top.', options: [
                { text: 'Both `list.append()` and `list.pop()` (without an index) run in O(1) amortized time', outcome: 'Both `list.append()` and `list.pop()` (without an index) run in O(1) amortized time because they.' },
                { text: 'list is a stack', outcome: 'Not quite — Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their.', reveals: 'list-is-a-stack-and' },
                { text: '"list is a stack" and directly use `list', outcome: 'Not quite — Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their.', reveals: 'list-is-a-stack-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_005', title: 'Implementation of Stack Using Collections.deque',
          caseStudy: { intro: 'Imagine you are building a browser\'s back button feature: each visited URL is pushed onto a stack, and clicking back pops the most recent URL.',
            decisions: [{ prompt: 'What is the time complexity of `append()` and `pop()` operations on a `deque` when used as a stack, and why is it more efficient than using.', options: [
                { text: 'Both `append()` and `pop()` on a `deque` are O(1) operations', outcome: 'Both `append()` and `pop()` on a `deque` are O(1) operations because `deque` is implemented as.' },
                { text: 'double-ended queue', outcome: 'Not quite — Students often think that `deque` is only for queues (FIFO) because the name stands for.', reveals: 'deque-is-only-for-queues' },
                { text: '`deque` is only for queues (FIFO)', outcome: 'Not quite — Students often think that `deque` is only for queues (FIFO) because the name stands for.', reveals: 'deque-is-only-for-queues' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_006', title: 'Peek and isEmpty Operations on Stack',
          caseStudy: { intro: 'Imagine you\'re building a "Undo" feature for a text editor. Every keystroke is pushed onto a stack.',
            decisions: [{ prompt: 'What is the exact output of the following Python snippet? ```python stack = [] stack.append(10) stack.append(20) print(stack[-1]).', options: [
                { text: 'Output: ``` 20 10 ```', outcome: 'Output: ``` 20 10 ``` A wrong answer (e.g., printing 10 then EMPTY, or raising IndexError) reveals.' },
                { text: 'access the top', outcome: 'Not quite — Students believe `peek()` and `pop()` are interchangeable because both "access the top".', reveals: 'peek-and-pop-are-interchangeable' },
                { text: '`peek()` and `pop()` are interchangeable', outcome: 'Not quite — Students believe `peek()` and `pop()` are interchangeable because both "access the top".', reveals: 'peek-and-pop-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the editor you\'re building for the school\'s writing club, you implement undo with a Python list: `stack.insert(0, action)` for push and `stack.pop(0)` for undo. With 100,000 logged actions the feature crawls. A teammate says: \'A list IS a stack — Python lists are universal; the slowdown must be the laptop.\'',
            decisions: [{ prompt: 'Why is it slow, and what\'s the fix?', options: [
                { text: 'insert(0)/pop(0) shift every element — O(n) per operation, so 100k actions means quadratic pain. Use append()/pop() at the END: O(1) and still LIFO. Better yet, wrap the list in a Stack class exposing only push/pop/peek/is_empty — a stack is a behavioural contract (LIFO + O(1) ends), not just \'a list used differently\'.', outcome: 'The ADT promises fast end-operations; the list is one implementation — using its slow end silently breaks the contract.' },
                { text: 'The teammate is right — list and stack are the same thing, so any list method implements a stack equally well.', outcome: 'Data structure = interface + performance guarantee; insert(0) satisfies the interface but violates the O(1) promise — that\'s a broken stack.', reveals: 'list-is-universal-structure' },
                { text: 'Switch to storing the whole document snapshot per action — memory is cheap, speed is what matters.', outcome: 'Snapshots trade the time problem for a space blow-up and don\'t fix the misunderstanding; the right fix is O(1) push/pop at the list\'s end.', reveals: 'snapshots-solve-undo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'LIFO for undo and calls, FIFO for waiting lines — the restriction is the feature.',
            decisions: [{ prompt: 'What comes next? Data Structures: Stack and Queue · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Structures: Stack and Queue · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_001', difficulty: 'standard',
          question: 'A data structure is a specialized format for organizing, processing.',
          hint: 'Revise Class 9 Mathematics Chapter 8: Sequences (explicit and recursive rules, nth term.',
          misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure.',
          parts: [
                { id: 'a', prompt: 'A school wants to maintain a record of students waiting to see the principal. Students join the line at the end and are called from the front.', answer: 'Queue models this situation',
                  options: ['Queue models this situation', 'last added served first', 'push/pop', 'enqueue/dequeue'],
                  hint: 'Revise Class 9 Mathematics Chapter 8: Sequences (explicit and recursive rules, nth term formula).',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' },
                { id: 'b', prompt: 'Compare the time complexity of searching for an element in an unsorted array versus a binary search tree (BST) in the average case.', answer: 'Unsorted array: O(n) linear search',
                  options: ['Unsorted array: O(n) linear search', 'BST is always faster', 'data structure', 'data type'],
                  hint: 'Revise Class 9 Mathematics Chapter 8: Sequences (explicit and recursive rules, nth term formula).',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['Show the student a timing experiment—run `push`/`pop` at end of list (O(1)) vs `insert(0)`/`pop(0)` at front (O(n)) for.', 'Ask them to implement a function `is_balanced(parentheses_string)` using only `append` and `pop` (end of list).', 'Have them write a `Stack` class that wraps a list but *only* exposes `push`, `pop`, `peek`, `is_empty`—hide the.', 'Explain that the *interface* (what operations exist) and *complexity promise* (how fast they are) together define the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure.',
          parts: [
                { id: 'a', prompt: 'Design a minimal data structure to implement an "undo" feature in a text editor that supports only two operations: type(character) and undo().', answer: 'ADT: Stack (LIFO)',
                  options: ['ADT: Stack (LIFO)', 'data structure', 'data type', 'universal'],
                  hint: 'Revise Class 9 Mathematics Chapter 8: Sequences (explicit and recursive rules, nth term formula).',
                  misconception: 'Students often believe "data structure" and "data type" are synonyms, and that Python\'s list is a "universal" structure eliminating the.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['Show the student a timing experiment—run `push`/`pop` at end of list (O(1)) vs `insert(0)`/`pop(0)` at front (O(n)) for.', 'Ask them to implement a function `is_balanced(parentheses_string)` using only `append` and `pop` (end of list).', 'Have them write a `Stack` class that wraps a list but *only* exposes `push`, `pop`, `peek`, `is_empty`—hide the.', 'Explain that the *interface* (what operations exist) and *complexity promise* (how fast they are) together define the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_002', difficulty: 'standard',
          question: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO).',
          hint: 'Revisit c11_cs_cbse_10_001 and focus on the distinction between "what a data structure.',
          misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s.',
          parts: [
                { id: 'a', prompt: 'Trace the state of a stack after the following sequence of operations on an initially empty stack: push(10), push(20), push(30), pop(), push(40), pop(), pop().', answer: 'Step-by-step trace: 1',
                  options: ['Step-by-step trace: 1', 'stack is just a Python list with append and pop', 'pop removes from bottom (FIFO) or doesn\'t update the top pointer'],
                  hint: 'Revisit c11_cs_cbse_10_001 and focus on the distinction between "what a data structure does" (ADT).',
                  misconception: 'Students believe that "stack is just a Python list with append and pop" and therefore the underlying list\'s capabilities (indexing.' }
          ],
            remediations: { 'stack-is-just-a-python': { steps: ['If the student exhibits this misconception: 1.', '**Draw a clear boundary**: On paper, draw a box labeled "Stack ADT" with only two arrows: push → (into top) and pop ←.', 'Label the box "No other operations allowed".', '**Contrast with list**: Draw another box "Python List" with arrows for append, pop, insert, index, slice, reverse.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_003', difficulty: 'standard',
          question: 'Stack operations **Push** and **Pop** are the fundamental insertion and.',
          hint: 'Revisit c11_cs_cbse_10_002: draw a stack diagram, label `top`, and explain why you cannot.',
          misconception: 'Students often believe that **pop() only reads the top value without removing it**, confusing it with the peek.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion',
                  options: ['Stack operations **Push** and **Pop** are the fundamental insertion and deletion', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Implementation of Stack Using List in Python refers to using Python\'s built-in mutable'],
                  hint: 'Revisit c11_cs_cbse_10_002: draw a stack diagram, label `top`, and explain why you cannot access.',
                  misconception: 'Students often believe that **pop() only reads the top value without removing it**, confusing it with the peek operation.' }
          ],
            remediations: { 'pop-only-reads-the-top': { steps: ['**Re-anchor the pointer convention**: Draw the array with indices 0..4.', 'Write `top = -1` beside it.', 'Ask: "Where does the *first* element go?', 'So what must we do to `top` before storing?" → Increment to 0.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_004', difficulty: 'standard',
          question: 'Implementation of Stack Using List in Python refers to using Python\'s built-in.',
          hint: 'Revisit c11_cs_cbse_10_003 (Stack Operations) and practice tracing push/pop on paper with.',
          misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Implementation of Stack Using List in Python refers to using Python\'s built-in mutable',
                  options: ['Implementation of Stack Using List in Python refers to using Python\'s built-in mutable', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion'],
                  hint: 'Revisit c11_cs_cbse_10_003 (Stack Operations) and practice tracing push/pop on paper with a diagram.',
                  misconception: 'Students often think "list is a stack" and directly use `list.append()` and `list.pop()` in their main code without wrapping them in.' }
          ],
            remediations: { 'list-is-a-stack-and': { steps: ['Show the student a list `s = [1,2,3]` and ask: "If this is a stack with top at end, what does `s.insert(0, 99)` do.', 'Ask them to write a function `reverse_string(s)` using only stack operations (push/pop) on a list.', 'If they use `s[::-1]` or `reversed()`, stop them: "You used list features, not stack operations." 3.', 'Have them implement the `Stack` class from scratch, forcing all access through methods.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_005', difficulty: 'standard',
          question: 'A stack implemented using `collections.deque` uses a double-ended queue where.',
          hint: 'Review the list implementation of stack (c11_cs_cbse_10_004) and the definition of LIFO.',
          misconception: 'Students often think that `deque` is only for queues (FIFO) because the name stands for "double-ended queue".',
          parts: [
                { id: 'a', prompt: 'What is the time complexity of `append()` and `pop()` operations on a `deque` when used as a stack, and why is it more efficient than using a list for the same.', answer: 'Both `append()` and `pop()` on a `deque` are O(1) operations',
                  options: ['Both `append()` and `pop()` on a `deque` are O(1) operations', 'double-ended queue', '`deque` is only for queues (FIFO)'],
                  hint: 'Review the list implementation of stack (c11_cs_cbse_10_004) and the definition of LIFO.',
                  misconception: 'Students often think that `deque` is only for queues (FIFO) because the name stands for "double-ended queue".' },
                { id: 'b', prompt: 'Compare the memory overhead of a `deque` versus a list when implementing a stack of 10,000 integers. Which uses more memory and why?', answer: 'A `deque` typically uses more memory than a list for the same number of elements',
                  options: ['A `deque` typically uses more memory than a list for the same number of elements', 'double-ended queue', '`deque` is only for queues (FIFO)'],
                  hint: 'Review the list implementation of stack (c11_cs_cbse_10_004) and the definition of LIFO.',
                  misconception: 'Students often think that `deque` is only for queues (FIFO) because the name stands for "double-ended queue".' }
          ],
            remediations: { 'deque-is-only-for-queues': { steps: ['If a student confuses `deque` methods, have them write a small program that pushes 1,2,3 and then pops, printing the.', 'Ask them to predict the output using `append`/`pop` vs `appendleft`/`popleft`.', 'Then run the code to see that both give LIFO if used consistently, but the standard is `append`/`pop`.', 'Emphasize that `deque` is a generalization: using the right end for stack aligns with the typical mental model of.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_006', difficulty: 'standard',
          question: '**Peek** (or **top**) is a stack operation that returns the value of the.',
          hint: 'Revisit c11_cs_cbse_10_004 (list implementation) and practice tracing `stack[-1]` and.',
          misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following Python snippet? ```python stack = [] stack.append(10) stack.append(20) print(stack[-1]) stack.pop() print(stack[-1].', answer: 'Output: ``` 20 10 ```',
                  options: ['Output: ``` 20 10 ```', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Revisit c11_cs_cbse_10_004 (list implementation) and practice tracing `stack[-1]` and `len(stack)`.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' },
                { id: 'b', prompt: 'A student writes this peek function: ```python def peek(s): return s[len(s)] # Line X ``` Explain why Line X is incorrect and how to fix it.', answer: 'Line X uses `len(s)` as index, but valid indices are `0` to `len(s)-1`',
                  options: ['Line X uses `len(s)` as index, but valid indices are `0` to `len(s)-1`', 'length gives the last position', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Revisit c11_cs_cbse_10_004 (list implementation) and practice tracing `stack[-1]` and `len(stack)`.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' },
                { id: 'c', prompt: 'Write a function `safe_pop(stack)` that pops and returns the top element if the stack is non-empty, otherwise returns `None` without raising an exception.', answer: '```python def safe_pop(stack): if not stack: # isEmpty check return None return',
                  options: ['```python def safe_pop(stack): if not stack: # isEmpty check return None return', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Revisit c11_cs_cbse_10_004 (list implementation) and practice tracing `stack[-1]` and `len(stack)`.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' },
                { id: 'd', prompt: 'Compare the time complexity of `peek()` implemented as `stack[-1]` vs `stack[len(stack)-1]` for Python list and `collections.deque`. Are they both O(1)?', answer: 'Yes, both are O(1)',
                  options: ['Yes, both are O(1)', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Revisit c11_cs_cbse_10_004 (list implementation) and practice tracing `stack[-1]` and `len(stack)`.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' }
          ],
            remediations: { 'peek-and-pop-are-interchangeable': { steps: ['Show a physical stack of plates: "Peek = look at top plate\'s color.', 'Pop = take it away." Ask: "If you only need to know the color, which do you do?" 2.', 'Trace code side-by-side: `x = stack[-1]; print(stack)` vs `x = stack.pop(); print(stack)`.', 'Give a buggy parentheses balancer that uses pop instead of peek; have student run on `"([])"` and observe failure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
