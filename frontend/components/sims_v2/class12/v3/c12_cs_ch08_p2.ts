import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch08_p2: SimDef = {
    id: 'v3_c12_cs_ch08_p2',
    title: 'Data Structures · Part 2/2',
    subtitle: 'Undo your newest mistake first — that\'s a stack, not a queue',
    classLevel: 12, subject: 'computer_science', topic: 'Data Structures · Part 2/2',
    chapters: ['c12_cs_ch08'],
    nodeIds: ['c12_cs_cbse_08_007', 'c12_cs_cbse_08_008', 'c12_cs_cbse_08_009', 'c12_cs_cbse_08_010', 'c12_cs_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Software engineer', intro: 'Data isn\'t just stored — it\'s arranged for a purpose. Pick the right arrangement and slow programs become instant.', goal: 'Classify data structures and match each to the access pattern it was built for.' },
    discovery: {
        question: 'Your text editor\'s Undo must reverse the LAST thing you did first. A teammate suggests a queue — \'first come, first served.\' Why does that pick the wrong action?',
        options: ['A queue is FIFO — it would undo your oldest action; undo needs LIFO order, so it\'s a stack', 'Nothing — a queue works fine', 'Undo needs a tree, not a stack or queue', 'Any structure works if you sort it first'],
        answer: 'A queue is FIFO — it would undo your oldest action; undo needs LIFO order, so it\'s a stack',
        hook: 'Data structure ≠ data type — \'int\' holds a value; a stack organises many values with rules. The right structure follows the access pattern: print spool = queue, undo = stack, family tree = tree. Choose by behaviour, not by name.',
    },
    teaching: [
        { title: 'Implementation of Queue Using List in Python', text: 'A queue implemented using a Python list follows the FIFO (First-In-First-Out) principle where `enqueue` (insertion) is performed at the rear using `append()` and `dequeue` (deletion) is performed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match structures to life: assign stack, queue, linked list, tree or graph to browser history, print jobs and a social network — then argue static vs dynamic for each.',
        labels: ['Implementation of Queue Using', 'Linked List: Concept', 'Linked List Operations: Insertion', 'Traversing a Linked List', 'Stack vs Queue: Comparison'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_007', title: 'Implementation of Queue Using List in Python',
          caseStudy: { intro: 'Imagine you are managing a ticket counter at a railway station: passengers join the line at the back (enqueue) and are served from the front (dequeue).',
            decisions: [{ prompt: 'What is the time complexity of `dequeue` operation when a queue is implemented using a Python list with `pop(0)`, and why?', options: [
                { text: 'The time complexity is O(n) where n is the number of elements in the queue', outcome: 'The time complexity is O(n) where n is the number of elements in the queue.' },
                { text: 'because `list', outcome: 'Not quite — Students often believe that because `list.append()` is O(1), the entire queue implementation.', reveals: 'because-list' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_008', title: 'Linked List: Concept and Node Structure',
          caseStudy: { intro: 'Imagine you are organizing a treasure hunt where each clue card contains the riddle and the location of the next card.',
            decisions: [{ prompt: 'What are the two essential components of a node in a singly linked list?', options: [
                { text: 'A node in a singly linked list contains (1) a data field to store the value and (2) a', outcome: 'A node in a singly linked list contains (1) a data field to store the value and (2) a next.' },
                { text: 'data and previous pointer', outcome: 'Not quite — Students often think that `head` is a special node that stores data.', reveals: 'head-is-a-special-node' },
                { text: 'head pointer', outcome: 'Not quite — Students often think that `head` is a special node that stores data.', reveals: 'head-is-a-special-node' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_009', title: 'Linked List Operations: Insertion and Deletion',
          caseStudy: { intro: 'Imagine you\'re building a music playlist manager where songs can be added or removed anywhere — not just at the ends like a stack or queue.',
            decisions: [{ prompt: 'What is the time complexity of inserting a node at the beginning of a singly linked list, and why does it not depend on the list length?', options: [
                { text: 'O(1) — insertion at head only requires creating a new node, pointing its `next` to the', outcome: 'O(1) — insertion at head only requires creating a new node, pointing its `next` to the current.' },
                { text: 'deleting a node', outcome: 'Not quite — Students believe that "deleting a node" in Python means explicitly calling `del node` or `node.', reveals: 'deleting-a-node-in-python' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_010', title: 'Traversing a Linked List',
          caseStudy: { intro: 'Imagine you are given a treasure hunt where each clue (node) contains the location of the next clue.',
            decisions: [{ prompt: 'What is the definition of traversing a linked list, and what condition terminates the traversal loop?', options: [
                { text: 'Traversing a linked list means visiting each node once in order from head to tail by', outcome: 'Traversing a linked list means visiting each node once in order from head to tail by following.' },
                { text: 'traversal stops at the last node\'s data', outcome: 'Not quite — Students believe that after a traversal loop, the `head` pointer automatically points to the last.', reveals: 'after-a-traversal-loop' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A team is building \'undo\' for a text editor. One developer proposes a queue \'because it stores things in order\'; the code review has to pick the right structure before they build.',
            decisions: [{ prompt: 'Queue or something else?', options: [
                { text: 'A stack — undo must reverse the most recent action first, which is LIFO; a queue would undo the oldest action first and corrupt the document\'s history order.', outcome: 'Match the structure to the access pattern: undo, reshelving trolleys and call stacks all pop from the top.' },
                { text: 'A queue is fine — \'in order\' is \'in order\' whether it\'s FIFO or LIFO.', outcome: 'FIFO serves the earliest arrival first — the opposite of what undo needs; order of access, not storage, is the deciding feature.', reveals: 'queue-for-undo' },
                { text: 'Either works — data structures are just named lists and the choice is cosmetic.', outcome: 'Each structure encodes a different legal sequence of access; picking wrong changes program behaviour, not just style.', reveals: 'structure-choice-is-cosmetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'You can now hear a problem and name the structure it needs — the single most asked reasoning skill in this subject.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_007', difficulty: 'standard',
          question: 'A queue implemented using a Python list follows the FIFO (First-In-First-Out).',
          hint: 'If stuck on why `pop(0)` is slow, review Class 11 `c11_cs_cbse_06_001` (Lists in Python).',
          misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).',
          parts: [
                { id: 'a', prompt: 'What is the time complexity of `dequeue` operation when a queue is implemented using a Python list with `pop(0)`, and why?', answer: 'The time complexity is O(n) where n is the number of elements in the queue',
                  options: ['The time complexity is O(n) where n is the number of elements in the queue', 'because `list'],
                  hint: 'If stuck on why `pop(0)` is slow, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) focusing.',
                  misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).' },
                { id: 'b', prompt: 'Given the following sequence of operations on an initially empty queue implemented with a list: `enqueue(10)`, `enqueue(20)`, `dequeue()`, `enqueue(30)`.', answer: 'Outputs: first `dequeue()` returns 10, second returns 20, third returns 30',
                  options: ['Outputs: first `dequeue()` returns 10, second returns 20, third returns 30', 'because `list'],
                  hint: 'If stuck on why `pop(0)` is slow, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) focusing.',
                  misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).' },
                { id: 'c', prompt: 'Compare the memory layout and mutability effects when a queue is implemented with a Python list versus a linked list (conceptually).', answer: 'A Python list is a dynamic array: elements are stored contiguously',
                  options: ['A Python list is a dynamic array: elements are stored contiguously', 'both are O(1)', 'because `list'],
                  hint: 'If stuck on why `pop(0)` is slow, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) focusing.',
                  misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).' }
          ],
            remediations: { 'because-list': { steps: ['Revisit `c12_cs_cbse_08_006` (Queue Operations: Enqueue and Dequeue) to reinforce the logical FIFO behaviour.', 'Run a micro-benchmark: create a list of 100,000 integers, time `pop(0)` in a loop vs `deque.popleft()`; plot the.', 'Re-read the NCERT sidebar on "Time Complexity of Queue Operations" (if present) or the standard textbook explanation.', 'Re-attempt Diagnostic Question 1 and 4; if still wrong, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).',
          parts: [
                { id: 'a', prompt: 'Evaluate the following implementation of `front()` method for a list-based queue: ```python def front(self): return self.items[0] if self.items else N/A ```.', answer: 'The method returns `N/A` for an empty queue',
                  options: ['The method returns `N/A` for an empty queue', 'it\'s fine', 'because `list'],
                  hint: 'If stuck on why `pop(0)` is slow, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) focusing.',
                  misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).' },
                { id: 'b', prompt: 'Design a scenario where a list-based queue with `pop(0)` would cause a noticeable performance bottleneck in a real-time system (e.g., network packet.', answer: 'Scenario: A router processes 10,000 packets/second',
                  options: ['Scenario: A router processes 10,000 packets/second', 'because `list'],
                  hint: 'If stuck on why `pop(0)` is slow, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) focusing.',
                  misconception: 'Students often believe that because `list.append()` is O(1), the entire queue implementation is O(1).' }
          ],
            remediations: { 'because-list': { steps: ['Revisit `c12_cs_cbse_08_006` (Queue Operations: Enqueue and Dequeue) to reinforce the logical FIFO behaviour.', 'Run a micro-benchmark: create a list of 100,000 integers, time `pop(0)` in a loop vs `deque.popleft()`; plot the.', 'Re-read the NCERT sidebar on "Time Complexity of Queue Operations" (if present) or the standard textbook explanation.', 'Re-attempt Diagnostic Question 1 and 4; if still wrong, review Class 11 `c11_cs_cbse_06_001` (Lists in Python) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_008', difficulty: 'standard',
          question: 'A linked list is a linear data structure where elements (nodes) are stored.',
          hint: 'Review Python class syntax and object reference assignment (e.g., `a = Node(10); b = a`.',
          misconception: 'Students often think that `head` is a special node that stores data.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linked list is a linear data structure where elements (nodes) are stored',
                  options: ['A linked list is a linear data structure where elements (nodes) are stored', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,'],
                  hint: 'Review Python class syntax and object reference assignment (e.g., `a = Node(10); b = a` makes both.',
                  misconception: 'Students often think that `head` is a special node that stores data.' }
          ],
            remediations: { 'head-is-a-special-node': { steps: ['If the student confuses head pointer with a node: (1) Draw a box labeled `head` with an arrow pointing to a node box.', 'Emphasize `head` holds an address, not data.', '(2) Show code: `head = N/A` (empty list) vs `head = Node(10)`.', '(3) Ask: "What is `head.data` when `head = N/A`?" to trigger the error realization.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_009', difficulty: 'standard',
          question: 'Linked List insertion and deletion are fundamental dynamic memory operations.',
          hint: 'Revisit `c12_cs_cbse_08_008` and practice drawing pointer diagrams for a 4-node list.',
          misconception: 'Students believe that "deleting a node" in Python means explicitly calling `del node` or `node = N/A` to free memory.',
          parts: [
                { id: 'a', prompt: 'In a singly linked list with nodes A → B → C, you want to insert node X between A and B.', answer: 'If you set X.next = A.next first, X points to B',
                  options: ['If you set X.next = A.next first, X points to B', 'deleting a node'],
                  hint: 'Revisit `c12_cs_cbse_08_008` and practice drawing pointer diagrams for a 4-node list, labelling.',
                  misconception: 'Students believe that "deleting a node" in Python means explicitly calling `del node` or `node = N/A` to free memory.' },
                { id: 'b', prompt: 'Compare the pointer changes when deleting the *last* node versus deleting the *first* node in a singly linked list of length ≥ 2.', answer: 'Head deletion: only `head = head.next`',
                  options: ['Head deletion: only `head = head.next`', 'deleting a node', 'a `tail` pointer exists or that backward traversal is possible'],
                  hint: 'Revisit `c12_cs_cbse_08_008` and practice drawing pointer diagrams for a 4-node list, labelling.',
                  misconception: 'Students believe that "deleting a node" in Python means explicitly calling `del node` or `node = N/A` to free memory.' }
          ],
            remediations: { 'deleting-a-node-in-python': { steps: ['If a student confuses variable reassignment with pointer manipulation: (1) Draw a 3-node list on paper with boxes and.', '(2) Ask: "If I want to remove the middle node, which arrow must change?" (3) Have them physically erase and redraw.', '(4) Translate: "That arrow is `prev.next` in code.', 'Writing `curr = N/A` erases the label on the box, not the arrow." (5) Re-attempt Diagnostic Question 3 with this visual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_010', difficulty: 'standard',
          question: 'Traversing a linked list is the process of visiting each node exactly once.',
          hint: 'Review the Node class definition and manual linking of nodes from **c12_cs_cbse_08_008**.',
          misconception: 'Students believe that after a traversal loop, the `head` pointer automatically points to the last node or becomes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Traversing a linked list is the process of visiting each node exactly once in sequential',
                  options: ['Traversing a linked list is the process of visiting each node exactly once in sequential', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,'],
                  hint: 'Review the Node class definition and manual linking of nodes from **c12_cs_cbse_08_008**.',
                  misconception: 'Students believe that after a traversal loop, the `head` pointer automatically points to the last node or becomes `N/A`.' }
          ],
            remediations: { 'after-a-traversal-loop': { steps: ['Revisit **c12_cs_cbse_08_008** (Node structure) and draw a linked list on paper with boxes and arrows.', 'Physically simulate traversal: place a finger on the head box (this is `head`), use a pencil as `current` to hop from.', 'Write the iterative loop on paper with comments: `# current moves, head stays`.', 'Run a tiny Python script that prints `id(head)` before and after traversal to prove `head` is unchanged.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_08_011', difficulty: 'standard',
          question: 'A **stack** is a linear data structure that follows the **Last-In-First-Out.',
          hint: 'If stuck, immediately revisit **c12_cs_cbse_08_002** (Stack LIFO) and.',
          misconception: '**Misconception**: “Stack and queue are interchangeable; you can simulate a queue with two stacks, so there’s no real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A **stack** is a linear data structure that follows the **Last-In-First-Out (LIFO)**',
                  options: ['A **stack** is a linear data structure that follows the **Last-In-First-Out (LIFO)**', 'A data structure is a specialized format for organizing, processing, retrieving, and', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,', 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle,'],
                  hint: 'If stuck, immediately revisit **c12_cs_cbse_08_002** (Stack LIFO) and **c12_cs_cbse_08_005** (Queue.',
                  misconception: '**Misconception**: “Stack and queue are interchangeable; you can simulate a queue with two stacks, so there’s no real difference.” **Why.' }
          ],
            remediations: { 'misconception-stack-and-queue-are': { steps: ['**Revisit the physical analogies**: Stack = pile of plates (add/remove from top); Queue = line at a ration shop (join.', '**Re-trace Diagnostic Question 3** step-by-step on paper, labelling “top” and “front” explicitly.', '**Solve two board-style questions**: (a) Convert infix `A+B*C` to postfix using a stack (show each push/pop).', '(b) Simulate a circular queue of size 4 with enqueue/dequeue sequence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
