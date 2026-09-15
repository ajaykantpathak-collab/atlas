import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch10_p2: SimDef = {
    id: 'v3_c11_cs_ch10_p2',
    title: 'Data Structures: Stack and Queue · Part 2/3',
    subtitle: 'Choose between stack and queue by asking who gets served first.',
    classLevel: 11, subject: 'computer_science', topic: 'Data Structures: Stack and Queue · Part 2/3',
    chapters: ['c11_cs_ch10'],
    nodeIds: ['c11_cs_cbse_10_007', 'c11_cs_cbse_10_008', 'c11_cs_cbse_10_009', 'c11_cs_cbse_10_010', 'c11_cs_cbse_10_011', 'c11_cs_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer choosing structures for a playlist app', intro: 'Newest song first or first-come first-served? The access pattern picks the structure, not the other way round.', goal: 'Model LIFO and FIFO behaviour and justify why restricted access is an advantage.' },
    discovery: {
        question: 'You implement a stack as a Python list: push with insert(0, x), pop with pop(0). It behaves correctly — so is it a real stack?',
        options: ['Only in behaviour — front operations shift every element, breaking the stack\'s O(1) contract', 'Yes — any list automatically qualifies as a stack', 'No — stacks are impossible to build in Python', 'Yes — because pop(0) removes the correct element'],
        answer: 'Only in behaviour — front operations shift every element, breaking the stack\'s O(1) contract',
        hook: 'A data structure is a contract, not just a container — stacks promise constant-time ends, and a list\'s front can\'t keep that promise.',
    },
    teaching: [
        { title: 'Applications of Stack: Balancing Parentheses', text: 'Balancing parentheses is a classic stack application that verifies whether an arithmetic or logical expression has correctly matched and properly nested opening and closing brackets (parentheses.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace push(10), push(20), push(30), pop(), push(40), pop(), pop() step by step, then pick the right structure for the principal\'s waiting line.',
        labels: ['Applications of Stack: Balancing', 'Applications of Stack: Infix', 'Queue: Definition and FIFO', 'Queue Operations: Enqueue', 'Implementation of Queue Using'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_007', title: 'Applications of Stack: Balancing Parentheses',
          caseStudy: { intro: 'Imagine you are debugging a Python program and the interpreter reports a `SyntaxError: unmatched \')\'`.',
            decisions: [{ prompt: 'What is the primary condition that the stack-based algorithm checks when it encounters a closing bracket in an expression?', options: [
                { text: 'The algorithm checks two conditions: (1) the stack is not empty (otherwise there is no', outcome: 'The algorithm checks two conditions: (1) the stack is not empty (otherwise there is no matching.' },
                { text: 'check if stack is full', outcome: 'Not quite — Students often believe that checking only the final stack emptiness is sufficient.', reveals: 'checking-only-the-final-stack' },
                { text: 'checking only the final stack emptiness is sufficient', outcome: 'Not quite — Students often believe that checking only the final stack emptiness is sufficient.', reveals: 'checking-only-the-final-stack' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_009', title: 'Queue: Definition and FIFO Principle',
          caseStudy: { intro: 'Imagine you are standing in a queue at a railway ticket counter: the person who arrived first gets served first, and new people join at the back.',
            decisions: [{ prompt: 'What is the defining characteristic of a queue that distinguishes it from a stack?', options: [
                { text: 'A queue follows the First-In-First-Out (FIFO) principle: the first element inserted is', outcome: 'A queue follows the First-In-First-Out (FIFO) principle: the first element inserted is the first.' },
                { text: 'queue removes the last inserted element', outcome: 'Not quite — Students often think a queue allows insertion or deletion at both ends because they confuse it with.', reveals: 'a-queue-allows-insertion-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_010', title: 'Queue Operations: Enqueue and Dequeue with Examples',
          caseStudy: { intro: 'Imagine you are standing in a queue at a railway ticket counter in Mumbai.',
            decisions: [{ prompt: 'What is the exact position where a new element is inserted during an enqueue operation in a linear queue, and what happens to the rear.', options: [
                { text: 'The new element is inserted at the rear end (the position currently pointed to by the', outcome: 'The new element is inserted at the rear end (the position currently pointed to by the rear.' },
                { text: 'insert at front', outcome: 'Not quite — Students often believe that in a queue, \'front\' is where you insert and \'rear\' is where you delete.', reveals: 'in-a-queue' },
                { text: 'rear moves left', outcome: 'Not quite — Students often believe that in a queue, \'front\' is where you insert and \'rear\' is where you delete.', reveals: 'in-a-queue' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_011', title: 'Implementation of Queue Using List in Python',
          caseStudy: { intro: 'Imagine you\'re managing a print queue in a school computer lab where students send print jobs. The first document sent should print first — that\'s a queue!',
            decisions: [{ prompt: 'What is the correct Python list method to implement the enqueue operation (adding an element to the rear of the queue)?', options: [
                { text: 'The correct method is `list.append(element)`', outcome: 'The correct method is `list.append(element)`. A wrong answer like `list.insert(0, element)`.' },
                { text: 'it\'s just removing the first element', outcome: 'Not quite — Students believe `list.pop(0)` is O(1) because "it\'s just removing the first element." They don\'t.', reveals: 'list' },
                { text: '`list.pop(0)` is O(1)', outcome: 'Not quite — Students believe `list.pop(0)` is O(1) because "it\'s just removing the first element." They don\'t.', reveals: 'list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_012', title: 'Implementation of Queue Using Collections.deque',
          caseStudy: { intro: 'Imagine you\'re managing a customer service line at a bank where 500 customers arrive hourly.',
            decisions: [{ prompt: 'What is the time complexity of `deque.popleft()` and why is it more efficient than `list.pop(0)` for queue dequeue operations?', options: [
                { text: '`deque.popleft()` operates in O(1) time', outcome: '`deque.popleft()` operates in O(1) time because deque is implemented as a doubly-linked list.' },
                { text: 'faster list', outcome: 'Not quite — Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for.', reveals: 'deque-is-just-a-faster' },
                { text: '`deque` is just a "faster list" and use `q', outcome: 'Not quite — Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for.', reveals: 'deque-is-just-a-faster' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For the editor you\'re building for the school\'s writing club, you implement undo with a Python list: `stack.insert(0, action)` for push and `stack.pop(0)` for undo. With 100,000 logged actions the feature crawls. A teammate says: \'A list IS a stack — Python lists are universal; the slowdown must be the laptop.\'',
            decisions: [{ prompt: 'Why is it slow, and what\'s the fix?', options: [
                { text: 'insert(0)/pop(0) shift every element — O(n) per operation, so 100k actions means quadratic pain. Use append()/pop() at the END: O(1) and still LIFO. Better yet, wrap the list in a Stack class exposing only push/pop/peek/is_empty — a stack is a behavioural contract (LIFO + O(1) ends), not just \'a list used differently\'.', outcome: 'The ADT promises fast end-operations; the list is one implementation — using its slow end silently breaks the contract.' },
                { text: 'The teammate is right — list and stack are the same thing, so any list method implements a stack equally well.', outcome: 'Data structure = interface + performance guarantee; insert(0) satisfies the interface but violates the O(1) promise — that\'s a broken stack.', reveals: 'list-is-universal-structure' },
                { text: 'Switch to storing the whole document snapshot per action — memory is cheap, speed is what matters.', outcome: 'Snapshots trade the time problem for a space blow-up and don\'t fix the misunderstanding; the right fix is O(1) push/pop at the list\'s end.', reveals: 'snapshots-solve-undo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'LIFO for undo and calls, FIFO for waiting lines — the restriction is the feature.',
            decisions: [{ prompt: 'What comes next? Data Structures: Stack and Queue · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Structures: Stack and Queue · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_007', difficulty: 'standard',
          question: 'Balancing parentheses is a classic stack application that verifies whether.',
          hint: 'Review the implementation of stack using list (c11_cs_cbse_10_004) and practice tracing.',
          misconception: 'Students often believe that checking only the final stack emptiness is sufficient.',
          parts: [
                { id: 'a', prompt: 'Given the expression `{[()]}{}`, trace the stack contents (show the stack after each character) and state whether it is balanced.', answer: 'Trace: `{` → stack: `[\'{\']`',
                  options: ['Trace: `{` → stack: `[\'{\']`', 'checking only the final stack emptiness is sufficient'],
                  hint: 'Review the implementation of stack using list (c11_cs_cbse_10_004) and practice tracing push/pop.',
                  misconception: 'Students often believe that checking only the final stack emptiness is sufficient.' },
                { id: 'b', prompt: 'Compare the expressions `([])` and `([)]`. Using the stack algorithm, identify the exact step where the second expression fails and explain why the first.', answer: 'For `([)]`: push `(` → `[\'(\']`',
                  options: ['For `([)]`: push `(` → `[\'(\']`', 'both fail', 'both pass', 'checking only the final stack emptiness is sufficient'],
                  hint: 'Review the implementation of stack using list (c11_cs_cbse_10_004) and practice tracing push/pop.',
                  misconception: 'Students often believe that checking only the final stack emptiness is sufficient.' }
          ],
            remediations: { 'checking-only-the-final-stack': { steps: ['Have the student manually trace `([)]` with two columns: "Character Read" and "Stack Content".', 'At the `)` step, ask: "What is on top of the stack?', 'Force them to write the matching rule as a dictionary: `pairs = {\')\':\'(\', \']\':\'[\', \'}\':\'{\'}`.', 'Modify their code to check `if not stack or stack.pop() != pairs[ch]: return False`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that checking only the final stack emptiness is sufficient.',
          parts: [
                { id: 'a', prompt: 'A student writes a balancing function that only checks if the stack is empty at the end, ignoring mismatches during traversal.', answer: 'Expression `([)]` would be incorrectly reported balanced',
                  options: ['Expression `([)]` would be incorrectly reported balanced', 'checking only the final stack emptiness is sufficient'],
                  hint: 'Review the implementation of stack using list (c11_cs_cbse_10_004) and practice tracing push/pop.',
                  misconception: 'Students often believe that checking only the final stack emptiness is sufficient.' },
                { id: 'b', prompt: 'Design a new expression containing at least three different bracket types that is balanced, and another that is unbalanced due to a *missing* opening bracket.', answer: 'Balanced: `{[(])}`?',
                  options: ['Balanced: `{[(])}`?', 'checking only the final stack emptiness is sufficient'],
                  hint: 'Review the implementation of stack using list (c11_cs_cbse_10_004) and practice tracing push/pop.',
                  misconception: 'Students often believe that checking only the final stack emptiness is sufficient.' }
          ],
            remediations: { 'checking-only-the-final-stack': { steps: ['Have the student manually trace `([)]` with two columns: "Character Read" and "Stack Content".', 'At the `)` step, ask: "What is on top of the stack?', 'Force them to write the matching rule as a dictionary: `pairs = {\')\':\'(\', \']\':\'[\', \'}\':\'{\'}`.', 'Modify their code to check `if not stack or stack.pop() != pairs[ch]: return False`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_008', difficulty: 'standard',
          question: 'Infix to Postfix conversion is a stack-based algorithm that transforms.',
          hint: 'If stuck, review Class 7 "Evaluating Arithmetic Expressions: Order of Operations".',
          misconception: 'Students treat all operators as left-associative and pop on equal precedence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Infix to Postfix conversion is a stack-based algorithm that transforms an arithmetic',
                  options: ['Infix to Postfix conversion is a stack-based algorithm that transforms an arithmetic', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion'],
                  hint: 'If stuck, review Class 7 "Evaluating Arithmetic Expressions: Order of Operations".',
                  misconception: 'Students treat all operators as left-associative and pop on equal precedence.' }
          ],
            remediations: { 'students-treat-all-operators-as': { steps: ['Re-teach precedence table with associativity column.', 'Use a physical stack (cards) to trace "2 ^ 3 ^ 2": show that right-associative means evaluate rightmost first.', 'Practice "parentheses as stack markers": \'(\' pushes a barrier; \')\' pops until barrier.', 'Give drills: only expressions with ^ and parentheses until stack trace matches expected.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_009', difficulty: 'standard',
          question: 'A queue is a linear data structure that follows the First-In-First-Out (FIFO).',
          hint: 'Revisit the stack definition and LIFO principle (c11_cs_cbse_10_002) and trace a stack.',
          misconception: 'Students often think a queue allows insertion or deletion at both ends because they confuse it with a deque.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle,',
                  options: ['A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle,', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'Stack operations **Push** and **Pop** are the fundamental insertion and deletion'],
                  hint: 'Revisit the stack definition and LIFO principle (c11_cs_cbse_10_002) and trace a stack operation.',
                  misconception: 'Students often think a queue allows insertion or deletion at both ends because they confuse it with a deque (double-ended queue).' }
          ],
            remediations: { 'a-queue-allows-insertion-or': { steps: ['Draw a horizontal line with arrows: label left end "FRONT (deletion)" and right end "REAR (insertion)".', 'Use a physical analogy: a pipe where balls enter at the right (rear) and exit at the left (front).', 'Have the student trace insertion of A, B, C step by step, writing the queue state after each step: [A] → [A, B] → [A.', 'Then trace deletion: remove A → [B, C]; remove B → [C].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_010', difficulty: 'standard',
          question: 'Enqueue is the operation of inserting an element at the rear end of a queue.',
          hint: 'Revisit the physical analogy of a queue at a bank or bus stop: the person who arrives.',
          misconception: 'Students often believe that in a queue, \'front\' is where you insert and \'rear\' is where you delete, because they.',
          parts: [
                { id: 'a', prompt: 'If a queue currently contains [10, 20, 30] with front at index 0 and rear at index 3 (size 5), what will be the queue contents and front/rear positions after.', answer: 'After dequeue(): queue becomes [20, 30], front moves to index 1, rear stays at 3',
                  options: ['After dequeue(): queue becomes [20, 30], front moves to index 1, rear stays at 3', 'dequeue removes from rear or enqueue inserts at front, violating FIFO', 'the first element should be added at the front'],
                  hint: 'Revisit the physical analogy of a queue at a bank or bus stop: the person who arrives first stands.',
                  misconception: 'Students often believe that in a queue, \'front\' is where you insert and \'rear\' is where you delete, because they associate \'front\' with.' },
                { id: 'b', prompt: 'Compare the time complexity of enqueue and dequeue in a linear queue implemented with an array where dequeue shifts all elements left versus one where front.', answer: 'Shifting elements makes dequeue O(n)',
                  options: ['Shifting elements makes dequeue O(n)', 'the first element should be added at the front'],
                  hint: 'Revisit the physical analogy of a queue at a bank or bus stop: the person who arrives first stands.',
                  misconception: 'Students often believe that in a queue, \'front\' is where you insert and \'rear\' is where you delete, because they associate \'front\' with.' }
          ],
            remediations: { 'in-a-queue': { steps: ['Draw a 5-slot array with indices 0-4. Mark front=0, rear=0 (empty).', 'Enqueue 10 — write 10 at index 0, move rear to 1. Say aloud: "rear points to WHERE the next element WILL go."', 'Enqueue 20 — write at index 1, rear=2.', 'Dequeue — read index 0 (value 10), move front to 1. Say: "front points to the OLDEST element."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_011', difficulty: 'standard',
          question: 'A queue implemented using a Python list uses the list\'s `append()` method.',
          hint: 'Revisit c11_cs_cbse_10_010 (Queue Operations) for FIFO tracing practice and.',
          misconception: 'Students believe `list.pop(0)` is O(1) because "it\'s just removing the first element." They don\'t visualize that Python.',
          parts: [
                { id: 'a', prompt: 'What is the correct Python list method to implement the enqueue operation (adding an element to the rear of the queue)?', answer: 'The correct method is `list.append(element)`',
                  options: ['The correct method is `list.append(element)`', 'it\'s just removing the first element', '`list.pop(0)` is O(1)'],
                  hint: 'Revisit c11_cs_cbse_10_010 (Queue Operations) for FIFO tracing practice and c11_cs_cbse_10_004.',
                  misconception: 'Students believe `list.pop(0)` is O(1) because "it\'s just removing the first element." They don\'t visualize that Python lists are dynamic.' },
                { id: 'b', prompt: 'In a queue implemented using a Python list where `enqueue` uses `append()`, which list method correctly implements `dequeue` (removing from the front), and.', answer: 'The correct method is `list.pop(0)` with O(n) time complexity',
                  options: ['The correct method is `list.pop(0)` with O(n) time complexity', 'it\'s just removing the first element', '`list.pop(0)` is O(1)'],
                  hint: 'Revisit c11_cs_cbse_10_010 (Queue Operations) for FIFO tracing practice and c11_cs_cbse_10_004.',
                  misconception: 'Students believe `list.pop(0)` is O(1) because "it\'s just removing the first element." They don\'t visualize that Python lists are dynamic.' },
                { id: 'c', prompt: 'Compare the time complexities of enqueue and dequeue operations when a queue is implemented using a Python list.', answer: 'Enqueue (`append()`) is O(1) amortized',
                  options: ['Enqueue (`append()`) is O(1) amortized', 'it\'s just removing the first element', '`list.pop(0)` is O(1)'],
                  hint: 'Revisit c11_cs_cbse_10_010 (Queue Operations) for FIFO tracing practice and c11_cs_cbse_10_004.',
                  misconception: 'Students believe `list.pop(0)` is O(1) because "it\'s just removing the first element." They don\'t visualize that Python lists are dynamic.' }
          ],
            remediations: { 'list': { steps: ['Draw a memory diagram: show a list `[10, 20, 30, 40]` as contiguous boxes with indices 0,1,2,3.', 'Demonstrate `pop(0)`: remove box 0, then show 20→index 0, 30→index 1, 40→index 2 — every element moved.', 'Have the student time `pop(0)` vs `pop()` on a 100,000-element list using `timeit` — they\'ll see 1000x difference.', 'Explain that `append()` is O(1) because it uses reserved space at the end; no shifting needed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_012', difficulty: 'standard',
          question: 'A queue implemented using `collections.deque` leverages a double-ended queue.',
          hint: 'Revisit c11_cs_cbse_10_011 (list-based queue) and manually trace `pop(0)` on a list of 5.',
          misconception: 'Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for dequeue (treating.',
          parts: [
                { id: 'a', prompt: 'What is the time complexity of `deque.popleft()` and why is it more efficient than `list.pop(0)` for queue dequeue operations?', answer: '`deque.popleft()` operates in O(1) time',
                  options: ['`deque.popleft()` operates in O(1) time', 'faster list', '`deque` is just a "faster list" and use `q'],
                  hint: 'Revisit c11_cs_cbse_10_011 (list-based queue) and manually trace `pop(0)` on a list of 5 elements.',
                  misconception: 'Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for dequeue (treating it like a stack),.' },
                { id: 'b', prompt: 'Given `from collections import deque; q = deque([10, 20, 30])`, what does `q.append(40)` followed by `q.popleft()` return, and what is the final state of `q`?', answer: '`q.append(40)` adds 40 to the rear, making deque `[10, 20, 30, 40]`',
                  options: ['`q.append(40)` adds 40 to the rear, making deque `[10, 20, 30, 40]`', 'faster list', '`deque` is just a "faster list" and use `q'],
                  hint: 'Revisit c11_cs_cbse_10_011 (list-based queue) and manually trace `pop(0)` on a list of 5 elements.',
                  misconception: 'Students believe `deque` is just a "faster list" and use `q.append()` for enqueue and `q.pop()` for dequeue (treating it like a stack),.' }
          ],
            remediations: { 'deque-is-just-a-faster': { steps: ['Draw a horizontal line labeled "TIME" with arrows →.', 'Mark "FRONT (oldest)" on left, "REAR (newest)" on right.', 'Show `deque` as a box with `popleft()` arrow exiting LEFT, `append()` arrow entering RIGHT.', 'Trace 3 operations physically: ENQUEUE A → `append(A)` adds to right; ENQUEUE B → `append(B)` adds to right of.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
