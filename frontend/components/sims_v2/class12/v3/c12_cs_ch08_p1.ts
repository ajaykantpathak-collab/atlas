import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch08_p1: SimDef = {
    id: 'v3_c12_cs_ch08_p1',
    title: 'Data Structures · Part 1/2',
    subtitle: 'Undo your newest mistake first — that\'s a stack, not a queue',
    classLevel: 12, subject: 'computer_science', topic: 'Data Structures · Part 1/2',
    chapters: ['c12_cs_ch08'],
    nodeIds: ['c12_cs_cbse_08_001', 'c12_cs_cbse_08_002', 'c12_cs_cbse_08_003', 'c12_cs_cbse_08_004', 'c12_cs_cbse_08_005', 'c12_cs_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Software engineer', intro: 'Data isn\'t just stored — it\'s arranged for a purpose. Pick the right arrangement and slow programs become instant.', goal: 'Classify data structures and match each to the access pattern it was built for.' },
    discovery: {
        question: 'Your text editor\'s Undo must reverse the LAST thing you did first. A teammate suggests a queue — \'first come, first served.\' Why does that pick the wrong action?',
        options: ['A queue is FIFO — it would undo your oldest action; undo needs LIFO order, so it\'s a stack', 'Nothing — a queue works fine', 'Undo needs a tree, not a stack or queue', 'Any structure works if you sort it first'],
        answer: 'A queue is FIFO — it would undo your oldest action; undo needs LIFO order, so it\'s a stack',
        hook: 'Data structure ≠ data type — \'int\' holds a value; a stack organises many values with rules. The right structure follows the access pattern: print spool = queue, undo = stack, family tree = tree. Choose by behaviour, not by name.',
    },
    teaching: [
        { title: 'Introduction to Data Structures and their Types', text: 'A data structure is a specialized format for organizing, processing, retrieving, and storing data in a computer\'s memory so that it can be accessed and modified efficiently.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match structures to life: assign stack, queue, linked list, tree or graph to browser history, print jobs and a social network — then argue static vs dynamic for each.',
        labels: ['Introduction to Data Structures', 'Stack: Definition and LIFO', 'Stack Operations: Push', 'Applications of Stack: Infix', 'Queue: Definition and FIFO', 'Queue Operations: Enqueue'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_001', title: 'Introduction to Data Structures and their Types',
          caseStudy: { intro: 'Imagine you are building a contact list app for your phone. You need to store names and numbers, but you also need to quickly search for a contact, add new.',
            decisions: [{ prompt: 'What is the fundamental difference between a linear data structure and a non-linear data structure? Give one example of each.', options: [
                { text: 'Linear data structures arrange elements in a sequential order where each element has a', outcome: 'Linear data structures arrange elements in a sequential order where each element has a unique.' },
                { text: 'linear means sorted, non-linear means unsorted', outcome: 'Not quite — Students often believe that "data structure" and "data type" are synonyms.', reveals: 'data-structure-and-data-type' },
                { text: 'data structure', outcome: 'Not quite — Students often believe that "data structure" and "data type" are synonyms.', reveals: 'data-structure-and-data-type' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_002', title: 'Stack: Definition and LIFO Principle',
          caseStudy: { intro: 'Imagine you are stacking plates in a cafeteria: you place a clean plate on top of the pile, and when someone needs a plate, they take the one from the very.',
            decisions: [{ prompt: 'State the full form of LIFO and write the one-line definition of a stack as per the NCERT Class 12 Computer Science textbook.', options: [
                { text: 'LIFO stands for Last-In-First-Out', outcome: 'LIFO stands for Last-In-First-Out. A stack is a linear data structure in which insertion and.' },
                { text: 'First-In-First-Out', outcome: 'Not quite — Students often think a stack is "just a list where we only use append and pop" and therefore.', reveals: 'a-stack-is-just-a' },
                { text: 'insertion at rear, deletion at front', outcome: 'Not quite — Students often think a stack is "just a list where we only use append and pop" and therefore.', reveals: 'a-stack-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_003', title: 'Stack Operations: Push and Pop with Implementation',
          caseStudy: { intro: 'Imagine you\'re building a browser\'s "Back" button: each visited URL is stacked, and clicking Back pops the most recent one.',
            decisions: [{ prompt: 'Define the push operation on a stack and state the condition that must be checked before pushing when the stack has a fixed maximum size.', options: [
                { text: 'Push adds an element to the top of the stack', outcome: 'Push adds an element to the top of the stack. Before pushing, we must check for **overflow**: `if.' },
                { text: 'check if stack is empty', outcome: 'Not quite — Students often believe that **Python list\'s `append` and `pop` automatically handle stack overflow.', reveals: 'python-list-s-append-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_08_004', title: 'Applications of Stack: Infix to Postfix Conversion',
          scaffold: { problem: 'Convert the infix expression (A + B) * C - D ^ E / F to postfix. Show stack and output after each token scan.',
            steps: [
            { text: 'Initialize empty stack, empty output. Scan \'(\' → push \'(\'.' },
            { text: 'Scan A → operand, output A. Scan + → stack top \'(\', push +. Scan B → output B.' },
            { text: 'Scan \')\' → pop until \'(\': pop + → output +, pop \'(\' discard. Output so far: AB+.' },
            { text: 'Scan * → stack empty, push *. Scan C → output C. Output: AB+C.' },
            { text: 'Scan - → top is *, - has lower precedence than *, so pop * → output *, push -. Output: AB+C*.' },
            { text: 'Scan D → output D. Scan ^ → top is -, ^ higher precedence, push ^. Scan E → output E.' },
            { text: 'Scan / → top is ^, / lower than ^, pop ^ → output ^. Top now -, / higher than -, push /. Scan F → output F.' },
            { text: 'End of input → pop remaining: pop / → output /, pop - → output -. Final postfix: AB+C*DE^F/-.', faded: true, blankAnswer: 'AB+C*DE^F/-' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_005', title: 'Queue: Definition and FIFO Principle',
          caseStudy: { intro: 'Imagine you are standing in line at a railway ticket counter. The person who arrived first gets the ticket first — that\'s a queue.',
            decisions: [{ prompt: 'What is the fundamental principle that governs the order of removal in a queue?', options: [
                { text: 'The fundamental principle is First-In-First-Out (FIFO): the element that has been in the', outcome: 'The fundamental principle is First-In-First-Out (FIFO): the element that has been in the queue the.' },
                { text: 'Last-In-First-Out', outcome: 'Not quite — Students often think "front" is where you insert because the word "front" suggests the beginning.', reveals: 'front-is-where-you-insert' },
                { text: 'is where you insert', outcome: 'Not quite — Students often think "front" is where you insert because the word "front" suggests the beginning.', reveals: 'front-is-where-you-insert' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_006', title: 'Queue Operations: Enqueue and Dequeue with Implementation',
          caseStudy: { intro: 'Imagine you\'re managing a ticket counter at a railway station — passengers join the line at the back (enqueue) and get served from the front (dequeue).',
            decisions: [{ prompt: 'What are the initial values of front and rear pointers in an empty linear queue implemented using an array, and why are they set to these.', options: [
                { text: 'In an empty linear queue, both front and rear are initialised to -1', outcome: 'In an empty linear queue, both front and rear are initialised to -1.' },
                { text: 'empty queue', outcome: 'Not quite — **Misconception**: "After dequeue(), the removed element\'s memory slot is automatically.', reveals: 'misconception-after-dequeue' },
                { text: 'queue with one element at index 0', outcome: 'Not quite — **Misconception**: "After dequeue(), the removed element\'s memory slot is automatically.', reveals: 'misconception-after-dequeue' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A team is building \'undo\' for a text editor. One developer proposes a queue \'because it stores things in order\'; the code review has to pick the right structure before they build.',
            decisions: [{ prompt: 'Queue or something else?', options: [
                { text: 'A stack — undo must reverse the most recent action first, which is LIFO; a queue would undo the oldest action first and corrupt the document\'s history order.', outcome: 'Match the structure to the access pattern: undo, reshelving trolleys and call stacks all pop from the top.' },
                { text: 'A queue is fine — \'in order\' is \'in order\' whether it\'s FIFO or LIFO.', outcome: 'FIFO serves the earliest arrival first — the opposite of what undo needs; order of access, not storage, is the deciding feature.', reveals: 'queue-for-undo' },
                { text: 'Either works — data structures are just named lists and the choice is cosmetic.', outcome: 'Each structure encodes a different legal sequence of access; picking wrong changes program behaviour, not just style.', reveals: 'structure-choice-is-cosmetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a problem and name the structure it needs — the single most asked reasoning skill in this subject.',
            decisions: [{ prompt: 'What comes next? Data Structures · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Structures · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_001', difficulty: 'standard',
          question: 'A data structure is a specialized format for organizing, processing.',
          hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list.',
          misconception: 'Students often believe that "data structure" and "data type" are synonyms.',
          parts: [
                { id: 'a', prompt: 'A student says: "An array is a dynamic data structure because we can add elements to it by writing code like `arr.append(5)` in Python." Is this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'data structure', 'data type', '"data structure" and "data type" are synonyms'],
                  hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list methods and.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' },
                { id: 'b', prompt: 'You are designing a system to manage the "Undo" functionality in a text editor. Which data structure would you choose and why? Explain the principle it follows.', answer: 'A **stack** is the appropriate data structure',
                  options: ['A **stack** is the appropriate data structure', 'data structure', 'data type', '"data structure" and "data type" are synonyms'],
                  hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list methods and.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' },
                { id: 'c', prompt: 'Compare and contrast the memory representation of a static array and a linked list. How does this difference affect insertion at the beginning?', answer: 'A static array uses contiguous memory locations',
                  options: ['A static array uses contiguous memory locations', 'both are O(1)', 'linked list is always faster', 'data structure'],
                  hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list methods and.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['If the student conflates data types and data structures: (1) Show a C++ `int x;` vs `struct Node { int data; Node*.', '(2) Ask: "How many values does `x` hold?', 'How many does a `Node` hold?', 'Can a `Node` point to another `Node`?" (3) Have them classify: `float`, `array[10]`, `stack`, `binary tree` into.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "data structure" and "data type" are synonyms.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A tree is just a special case of a graph." Is this true? Justify your answer with reference to the definitions of both data structures.', answer: 'Yes, it is true',
                  options: ['Yes, it is true', 'no, they are completely different', 'data structure', 'data type'],
                  hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list methods and.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' },
                { id: 'b', prompt: 'Create a real-world scenario (not from the textbook) that requires a **queue** data structure.', answer: 'Example: A hospital emergency room triage system',
                  options: ['Example: A hospital emergency room triage system', 'data structure', 'data type', '"data structure" and "data type" are synonyms'],
                  hint: 'If stuck, revisit Class 11 Python lists (Chapter 3: Data Handling) — specifically list methods and.',
                  misconception: 'Students often believe that "data structure" and "data type" are synonyms.' }
          ],
            remediations: { 'data-structure-and-data-type': { steps: ['If the student conflates data types and data structures: (1) Show a C++ `int x;` vs `struct Node { int data; Node*.', '(2) Ask: "How many values does `x` hold?', 'How many does a `Node` hold?', 'Can a `Node` point to another `Node`?" (3) Have them classify: `float`, `array[10]`, `stack`, `binary tree` into.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_002', difficulty: 'standard',
          question: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO).',
          hint: 'If unclear about ADT vs implementation, revisit c12_cs_cbse_08_001 and list three.',
          misconception: 'Students often think a stack is "just a list where we only use append and pop" and therefore believe they can still.',
          parts: [
                { id: 'a', prompt: 'State the full form of LIFO and write the one-line definition of a stack as per the NCERT Class 12 Computer Science textbook.', answer: 'LIFO stands for Last-In-First-Out',
                  options: ['LIFO stands for Last-In-First-Out', 'First-In-First-Out', 'insertion at rear, deletion at front', 'just a list where we only use append and pop'],
                  hint: 'If unclear about ADT vs implementation, revisit c12_cs_cbse_08_001 and list three examples where.',
                  misconception: 'Students often think a stack is "just a list where we only use append and pop" and therefore believe they can still access middle elements.' },
                { id: 'b', prompt: 'A student says: "In a stack, I can remove the third element from the top if I really want to, because it\'s just a list in memory." Explain why this statement.', answer: 'The stack ADT only permits access to the element at the top',
                  options: ['The stack ADT only permits access to the element at the top', 'just a list where we only use append and pop', 'they can still access middle elements via indexing (e'],
                  hint: 'If unclear about ADT vs implementation, revisit c12_cs_cbse_08_001 and list three examples where.',
                  misconception: 'Students often think a stack is "just a list where we only use append and pop" and therefore believe they can still access middle elements.' },
                { id: 'c', prompt: 'Draw the state of an initially empty stack after the following sequence of operations: push(10), push(20), pop(), push(30), push(40), pop(), pop().', answer: 'Step-by-step: 1',
                  options: ['Step-by-step: 1', 'just a list where we only use append and pop', 'they can still access middle elements via indexing (e'],
                  hint: 'If unclear about ADT vs implementation, revisit c12_cs_cbse_08_001 and list three examples where.',
                  misconception: 'Students often think a stack is "just a list where we only use append and pop" and therefore believe they can still access middle elements.' },
                { id: 'd', prompt: 'Compare the behaviour of a stack and a queue when the same input sequence 5, 10, 15 is inserted and then all elements are removed.', answer: 'Stack (LIFO): push 5, push 10, push 15 → pop gives 15, 10, 5',
                  options: ['Stack (LIFO): push 5, push 10, push 15 → pop gives 15, 10, 5', 'just a list where we only use append and pop', 'they can still access middle elements via indexing (e'],
                  hint: 'If unclear about ADT vs implementation, revisit c12_cs_cbse_08_001 and list three examples where.',
                  misconception: 'Students often think a stack is "just a list where we only use append and pop" and therefore believe they can still access middle elements.' }
          ],
            remediations: { 'a-stack-is-just-a': { steps: ['Revisit the plate-stacking analogy: physically stack 5 books, then try to remove the third from top without touching.', 'Write the stack ADT rules on a card: "Only top accessible.', 'No other operations allowed." 3.', 'Re-do Diagnostic Question 3 step-by-step on paper, drawing the top pointer each time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_003', difficulty: 'standard',
          question: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO).',
          hint: 'If stuck, revisit the "stack of plates" analogy from c12_cs_cbse_08_002 and physically.',
          misconception: 'Students often believe that **Python list\'s `append` and `pop` automatically handle stack overflow and underflow**,.',
          parts: [
                { id: 'a', prompt: 'Define the push operation on a stack and state the condition that must be checked before pushing when the stack has a fixed maximum size.', answer: 'Push adds an element to the top of the stack',
                  options: ['Push adds an element to the top of the stack', 'check if stack is empty'],
                  hint: 'If stuck, revisit the "stack of plates" analogy from c12_cs_cbse_08_002 and physically simulate.',
                  misconception: 'Students often believe that **Python list\'s `append` and `pop` automatically handle stack overflow and underflow**, so they omit explicit.' }
          ],
            remediations: { 'python-list-s-append-and': { steps: ['Revisit **c12_cs_cbse_08_002** (Stack: Definition and LIFO Principle) to reinforce that push/pop occur only at top and.', 'Practice writing the **overflow check** (`if top == MAX-1`) and **underflow check** (`if top == -1`) as separate `if`.', 'Trace 5-step sequences on paper with MAX=3, deliberately causing overflow/underflow, and verify your code prints the.', 'Re-attempt Diagnostic Questions 3 and 5 — if you still miss boundary checks, redo step 2 with a checklist: "Before.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_004', difficulty: 'standard',
          question: 'Infix to Postfix conversion is a stack-based algorithm that transforms.',
          hint: 'If stuck on conversion, first write the precedence table (^ > * / > + -) with.',
          misconception: 'Students consistently treat ^ (exponentiation) as left-associative like * and /, writing A ^ B ^ C → AB^C^ instead.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the algorithm pushes \'(\' onto the stack but never outputs it, and what happens when \')\' is encountered.', answer: '\'(\' is pushed to mark a subexpression boundary',
                  options: ['\'(\' is pushed to mark a subexpression boundary', 'parentheses are ignored'],
                  hint: 'If stuck on conversion, first write the precedence table (^ > * / > + -) with associativity, then.',
                  misconception: 'Students consistently treat ^ (exponentiation) as left-associative like * and /, writing A ^ B ^ C → AB^C^ instead of ABC^^.' }
          ],
            remediations: { 'students-consistently-treat-exponentiation-as': { steps: ['Revisit c12_cs_cbse_08_003 (Stack Operations) — trace push/pop on paper for 5 random operator sequences until stack.', 'Review operator precedence table: ^ (highest, right-assoc) > * / (left-assoc) > + - (left-assoc).', 'Write it on a sticky note.', 'Re-do Diagnostic Questions 3 and 4 from this node, verbalizing "precedence check → associativity check → push/pop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_005', difficulty: 'standard',
          question: 'A queue is a linear data structure that follows the First-In-First-Out (FIFO).',
          hint: 'If stuck, revisit the definition of linear data structures (c12_cs_cbse_08_001) and.',
          misconception: 'Students often think "front" is where you insert because the word "front" suggests the beginning of a line.',
          parts: [
                { id: 'a', prompt: 'In a queue, if you insert elements A, B, C in that order, which element will be at the front and which at the rear? Explain why.', answer: 'After inserting A, B, C: front = A, rear = C',
                  options: ['After inserting A, B, C: front = A, rear = C', 'is the removal end, not the insertion end', 'is where you insert', 'I\'m at the front of the queue'],
                  hint: 'If stuck, revisit the definition of linear data structures (c12_cs_cbse_08_001) and stack\'s LIFO.',
                  misconception: 'Students often think "front" is where you insert because the word "front" suggests the beginning of a line.' },
                { id: 'b', prompt: 'A printer receives three print jobs: Job1, Job2, Job3, in that order. The printer uses a queue to manage jobs.', answer: 'Job1 prints first',
                  options: ['Job1 prints first', 'is where you insert', 'I\'m at the front of the queue', '"front" is where you insert'],
                  hint: 'If stuck, revisit the definition of linear data structures (c12_cs_cbse_08_001) and stack\'s LIFO.',
                  misconception: 'Students often think "front" is where you insert because the word "front" suggests the beginning of a line.' },
                { id: 'c', prompt: 'Compare the behavior of a stack and a queue when the sequence of operations is: push/enqueue 10, push/enqueue 20, push/enqueue 30, then pop/dequeue once.', answer: 'Stack pop removes 30 (LIFO',
                  options: ['Stack pop removes 30 (LIFO', 'first in first out', 'is where you insert', 'I\'m at the front of the queue'],
                  hint: 'If stuck, revisit the definition of linear data structures (c12_cs_cbse_08_001) and stack\'s LIFO.',
                  misconception: 'Students often think "front" is where you insert because the word "front" suggests the beginning of a line.' }
          ],
            remediations: { 'front-is-where-you-insert': { steps: ['Revisit the real-life line analogy: physically act out a queue with three students.', 'Label one end "front (service)" and the other "rear (joining)".', 'Review the stack node (c12_cs_cbse_08_002) and explicitly list: Stack = one end (top) for both push/pop; Queue = two.', 'Draw a diagram: boxes with arrows showing insertion at rear, removal at front.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_006', difficulty: 'standard',
          question: 'A queue is a linear data structure following the FIFO (First-In-First-Out).',
          hint: 'Revisit c12_cs_cbse_08_005: draw a queue with 3 people, label front/back, simulate 2.',
          misconception: '**Misconception**: "After dequeue(), the removed element\'s memory slot is automatically cleared/zeroed, and front moves.',
          parts: [
                { id: 'a', prompt: 'What are the initial values of front and rear pointers in an empty linear queue implemented using an array, and why are they set to these values?', answer: 'In an empty linear queue, both front and rear are initialised to -1',
                  options: ['In an empty linear queue, both front and rear are initialised to -1', 'empty queue', 'queue with one element at index 0'],
                  hint: 'Revisit c12_cs_cbse_08_005: draw a queue with 3 people, label front/back, simulate 2 arrivals and 1.',
                  misconception: '**Misconception**: "After dequeue(), the removed element\'s memory slot is automatically cleared/zeroed, and front moves to the next index.".' },
                { id: 'b', prompt: 'Explain in your own words why a linear queue implemented with an array eventually shows "Queue Overflow" even when there are empty slots at the beginning.', answer: 'In a linear queue, rear only increments and never wraps around',
                  options: ['In a linear queue, rear only increments and never wraps around', 'the array is full'],
                  hint: 'Revisit c12_cs_cbse_08_005: draw a queue with 3 people, label front/back, simulate 2 arrivals and 1.',
                  misconception: '**Misconception**: "After dequeue(), the removed element\'s memory slot is automatically cleared/zeroed, and front moves to the next index.".' }
          ],
            remediations: { 'misconception-after-dequeue': { steps: ['If the student confuses logical vs physical removal: (1) Have them draw a 5-element array, perform enqueue(10).', '(2) Show the memory diagram: front=1, rear=1, arr=[10,20,_,_,_].', '(3) Ask: "If we enqueue(30) now, where does it go?', 'arr[0] remains 10 forever." (4) Re-do diagnostic Q3 with this insight.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
