import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch10_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch10_p3: SimDef = {
    id: 'v3_c11_cs_ch10_p3',
    title: 'Data Structures: Stack and Queue · Part 3/3',
    subtitle: 'Choose between stack and queue by asking who gets served first.',
    classLevel: 11, subject: 'computer_science', topic: 'Data Structures: Stack and Queue · Part 3/3',
    chapters: ['c11_cs_ch10'],
    nodeIds: ['c11_cs_cbse_10_013', 'c11_cs_cbse_10_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer choosing structures for a playlist app', intro: 'Newest song first or first-come first-served? The access pattern picks the structure, not the other way round.', goal: 'Model LIFO and FIFO behaviour and justify why restricted access is an advantage.' },
    discovery: {
        question: 'You implement a stack as a Python list: push with insert(0, x), pop with pop(0). It behaves correctly — so is it a real stack?',
        options: ['Only in behaviour — front operations shift every element, breaking the stack\'s O(1) contract', 'Yes — any list automatically qualifies as a stack', 'No — stacks are impossible to build in Python', 'Yes — because pop(0) removes the correct element'],
        answer: 'Only in behaviour — front operations shift every element, breaking the stack\'s O(1) contract',
        hook: 'A data structure is a contract, not just a container — stacks promise constant-time ends, and a list\'s front can\'t keep that promise.',
    },
    teaching: [
        { title: 'Circular Queue: Concept and Implementation', text: 'A circular queue is a linear data structure that follows FIFO principle where the last position is connected back to the first position to form a circle, allowing efficient reuse of memory.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace push(10), push(20), push(30), pop(), push(40), pop(), pop() step by step, then pick the right structure for the principal\'s waiting line.',
        labels: ['Circular Queue: Concept', 'Applications of Queue: Simulations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_013', title: 'Circular Queue: Concept and Implementation',
          scaffold: { problem: 'Implement a CircularQueue class in Python with capacity 5 using the sacrifice-one-slot method.',
            steps: [
            { text: 'Initialize array of size 5 with None, front=0, rear=0 (empty condition: front==rear)' },
            { text: 'enqueue(10): check full? (0+1)%5=1 != front(0) → rear=1, arr[1]=10 → front=0, rear=1, arr=[None,10,None,None,None]' },
            { text: 'enqueue(20): (1+1)%5=2 !=0 → rear=2, arr[2]=20 → front=0, rear=2, arr=[None,10,20,None,None]' },
            { text: 'enqueue(30): (2+1)%5=3 !=0 → rear=3, arr[3]=30 → front=0, rear=3, arr=[None,10,20,30,None]' },
            { text: 'dequeue(): front!=rear → item=arr[0]=None? Wait! First element is at front?', faded: true, blankAnswer: 'Final state: front=3, rear=1, array=[50, 80, 20, 30, 40].' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_014', title: 'Applications of Queue: Simulations and Scheduling',
          caseStudy: { intro: 'Imagine you are managing a popular coffee shop during morning rush.',
            decisions: [{ prompt: 'What is the fundamental principle that makes a queue suitable for modeling a real-world waiting line, and how does it differ from a stack.', options: [
                { text: 'A queue follows FIFO (First-In-First-Out), meaning the first person to join the line is', outcome: 'A queue follows FIFO (First-In-First-Out), meaning the first person to join the line is the first.' },
                { text: 'both work', outcome: 'Not quite — Students often believe that "queue simulation" requires a priority queue to handle "simultaneous".', reveals: 'queue-simulation-requires-a-priority' },
                { text: 'queue simulation', outcome: 'Not quite — Students often believe that "queue simulation" requires a priority queue to handle "simultaneous".', reveals: 'queue-simulation-requires-a-priority' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For the editor you\'re building for the school\'s writing club, you implement undo with a Python list: `stack.insert(0, action)` for push and `stack.pop(0)` for undo. With 100,000 logged actions the feature crawls. A teammate says: \'A list IS a stack — Python lists are universal; the slowdown must be the laptop.\'',
            decisions: [{ prompt: 'Why is it slow, and what\'s the fix?', options: [
                { text: 'insert(0)/pop(0) shift every element — O(n) per operation, so 100k actions means quadratic pain. Use append()/pop() at the END: O(1) and still LIFO. Better yet, wrap the list in a Stack class exposing only push/pop/peek/is_empty — a stack is a behavioural contract (LIFO + O(1) ends), not just \'a list used differently\'.', outcome: 'The ADT promises fast end-operations; the list is one implementation — using its slow end silently breaks the contract.' },
                { text: 'The teammate is right — list and stack are the same thing, so any list method implements a stack equally well.', outcome: 'Data structure = interface + performance guarantee; insert(0) satisfies the interface but violates the O(1) promise — that\'s a broken stack.', reveals: 'list-is-universal-structure' },
                { text: 'Switch to storing the whole document snapshot per action — memory is cheap, speed is what matters.', outcome: 'Snapshots trade the time problem for a space blow-up and don\'t fix the misunderstanding; the right fix is O(1) push/pop at the list\'s end.', reveals: 'snapshots-solve-undo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_10_014', title: 'You made it',
          caseStudy: { intro: 'LIFO for undo and calls, FIFO for waiting lines — the restriction is the feature.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_013', difficulty: 'standard',
          question: 'A circular queue is a linear data structure that follows FIFO principle where.',
          hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic.',
          misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.',
          parts: [
                { id: 'a', prompt: 'In a circular queue of capacity 5 implemented with array indices 0-4, if front=3 and rear=1, how many elements are currently in the queue?', answer: '4 elements',
                  options: ['4 elements', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic with.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' },
                { id: 'b', prompt: 'Trace the following operations on a circular queue of capacity 4 (indices 0-3) initially empty with front=0, rear=-1, using the "sacrifice one slot" method.', answer: 'Step-by-step: 1',
                  options: ['Step-by-step: 1', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic with.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' },
                { id: 'c', prompt: 'Compare the two methods for distinguishing full vs empty in circular queue: (a) using a count variable, (b) sacrificing one slot.', answer: 'using a count variable, (',
                  options: ['using a count variable, (', 'both use same memory', 'sacrifice method is always better', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic with.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' }
          ],
            remediations: { 'in-a-circular-queue-with': { steps: ['Draw a 4-element array on paper.', 'Simulate enqueue/dequeue with physical tokens.', 'Explicitly trace front and rear after each operation using `(index + 1) % 4`.', 'When front==rear, ask: "Is this empty or full?" Lead student to realize ambiguity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.',
          parts: [
                { id: 'a', prompt: 'A student implements circular queue enqueue as: ``` def enqueue(self, item): if self.rear == self.capacity - 1: self.rear = 0 else: self.rear += 1.', answer: 'The code completely ignores the full condition and front pointer!',
                  options: ['The code completely ignores the full condition and front pointer!', 'it works for first few insertions', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic with.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' },
                { id: 'b', prompt: 'Design a circular queue variation that supports O(1) time for getFront(), getRear(), and getSize() operations while maintaining standard enqueue/dequeue.', answer: 'Add: size variable (initialized 0)',
                  options: ['Add: size variable (initialized 0)', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic with.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' }
          ],
            remediations: { 'in-a-circular-queue-with': { steps: ['Draw a 4-element array on paper.', 'Simulate enqueue/dequeue with physical tokens.', 'Explicitly trace front and rear after each operation using `(index + 1) % 4`.', 'When front==rear, ask: "Is this empty or full?" Lead student to realize ambiguity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_014', difficulty: 'standard',
          question: 'A queue is a linear data structure following the First-In-First-Out (FIFO).',
          hint: 'Revisit `c11_cs_cbse_10_012` (deque implementation) and manually trace a 3-customer.',
          misconception: 'Students often believe that "queue simulation" requires a priority queue to handle "simultaneous" events.',
          parts: [
                { id: 'a', prompt: 'In a discrete-event simulation of a single-server queue, the event list contains (time=5, type=arrival) and (time=7, type=departure).', answer: 'At time=5, an arrival occurs',
                  options: ['At time=5, an arrival occurs', 'customer is served immediately', 'queue simulation', 'simultaneous'],
                  hint: 'Revisit `c11_cs_cbse_10_012` (deque implementation) and manually trace a 3-customer arrival/service.',
                  misconception: 'Students often believe that "queue simulation" requires a priority queue to handle "simultaneous" events.' },
                { id: 'b', prompt: 'Write a Python function `simulate_single_server(arrivals, service_times)` that takes two lists of equal length (arrival times and service durations for each.', answer: '```python from collections import deque def simulate_single_server(arrivals,',
                  options: ['```python from collections import deque def simulate_single_server(arrivals,', 'queue simulation', 'simultaneous', '"queue simulation" requires a priority queue to handle "simultaneous" events'],
                  hint: 'Revisit `c11_cs_cbse_10_012` (deque implementation) and manually trace a 3-customer arrival/service.',
                  misconception: 'Students often believe that "queue simulation" requires a priority queue to handle "simultaneous" events.' }
          ],
            remediations: { 'queue-simulation-requires-a-priority': { steps: ['Draw a timeline: mark arrival events (A1, A2, A3) and departure events (D1, D2).', 'Show that the waiting line is just the set of arrivals whose departure hasn\'t occurred, in arrival order.', 'Ask: "If A1 arrives at 0, A2 at 2, service takes 5.', 'What data structure holds A2 while waiting?" Guide them to see the waiting line is a FIFO buffer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
