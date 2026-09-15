import type { SimDef } from '../../engine/types';
import C11_ComputerScienceJavaArraysAdvancedSim from '../../../simulations/c6_12/C11_ComputerScienceJavaArraysAdvancedSim';

/** v3 wrapped master — C11_ComputerScienceJavaArraysAdvancedSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencejavaarraysadvancedsim: SimDef = {
    id: 'v3w_c11_computersciencejavaarraysadvancedsim',
    title: 'Java Arrays',
    subtitle: 'Covers: peek/top operation definition, isEmpty predicate, Python implementation using.',
    classLevel: 11, subject: 'computer_science', topic: 'Peek and isEmpty Operations on Stack',
    chapters: [],
    nodeIds: ['c11_cs_cbse_10_006', 'c11_cs_cbse_10_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re building a "Undo" feature for a text editor. Every keystroke is pushed onto a stack.', goal: 'Master Java Arrays.' },
    discovery: {
        question: 'What is the exact output of the following Python snippet? ```python stack = [] stack.append(10) stack.append(20) print(stack[-1]) stack.pop() print(stack[-1].',
        options: ['Output: ``` 20 10 ```', 'access the top', '`peek()` and `pop()` are interchangeable'],
        answer: 'Output: ``` 20 10 ```',
        hook: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".',
    },
    teaching: [
        { title: '**Peek** (or **top**) is a stack operation.', text: '**Peek** (or **top**) is a stack operation that returns the value of the topmost element without removing it from the stack.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_006', title: '**Peek** (or **top**) is a stack.',
          scaffold: { problem: 'Implement a `Stack` class using Python list with methods `push`, `pop`, `peek`, `isEmpty`, and `size`.',
            steps: [
            { text: 'Define class with `self._data = []` in `__init__`.' },
            { text: 'Implement `push(x)` as `self._data.append(x)`.' },
            { text: 'Implement `pop()` with `if self.isEmpty(): return None` guard, else `return self._data.pop()`.' },
            { text: 'Implement `peek()` with same guard, returning `self._data[-1]`.' },
            { text: 'Implement `isEmpty()` as `return len(self._data) == 0` (or `not self._data`).' },
            { text: 'Trace: after pushes, stack=[5,10]; peek->10; pop->10, stack=[5]; peek->5; pop->5, stack=[]; isEmpty->True; final.', faded: true, blankAnswer: 'Output:' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_10_013', title: 'A circular queue is a linear data.',
          scaffold: { problem: 'Implement a CircularQueue class in Python with capacity 5 using the sacrifice-one-slot method.',
            steps: [
            { text: 'Initialize array of size 5 with None, front=0, rear=0 (empty condition: front==rear)' },
            { text: 'enqueue(10): check full? (0+1)%5=1 != front(0) → rear=1, arr[1]=10 → front=0, rear=1, arr=[None,10,None,None,None]' },
            { text: 'enqueue(20): (1+1)%5=2 !=0 → rear=2, arr[2]=20 → front=0, rear=2, arr=[None,10,20,None,None]' },
            { text: 'enqueue(30): (2+1)%5=3 !=0 → rear=3, arr[3]=30 → front=0, rear=3, arr=[None,10,20,30,None]' },
            { text: 'dequeue(): front!=rear → item=arr[0]=None? Wait! First element is at front?', faded: true, blankAnswer: 'Final state: front=3, rear=1, array=[50, 80, 20, 30, 40],.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_cs_cbse_10_013', title: 'Identify each idea',
          dissect: { specimen: 'Java Arrays', spots: [
            { id: 's1', label: 'Peek or top is a', prompt: 'Which idea is this? — **Peek** (or **top**) is a stack operation that returns the value of the topmost element.', answer: 'Peek or top is a', options: ['Peek or top is a', 'A circular queue is a'] },
            { id: 's2', label: 'A circular queue is a', prompt: 'Which idea is this? — A circular queue is a linear data structure that follows FIFO principle where the last.', answer: 'A circular queue is a', options: ['A circular queue is a', 'Peek or top is a'] }
          ] } }
    ],
    explore: { component: C11_ComputerScienceJavaArraysAdvancedSim, prompt: 'Explore the interactive — Java Arrays' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_006', difficulty: 'standard',
          question: '**Peek** (or **top**) is a stack operation that returns the value of the.',
          hint: 'Revisit c11_cs_cbse_10_004 (list implementation) and practice tracing `stack[-1]` and.',
          misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".',
          parts: [
                { id: 'a', prompt: 'What is the exact output of the following Python snippet? ```python stack = [] stack.append(10) stack.append(20) print(stack[-1]) stack.pop() print(stack[-1].', answer: 'Output: ``` 20 10 ```',
                  options: ['Output: ``` 20 10 ```', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' },
                { id: 'b', prompt: 'A student writes this peek function: ```python def peek(s): return s[len(s)] # Line X ``` Explain why Line X is incorrect and how to fix it.', answer: 'Line X uses `len(s)` as index, but valid indices are `0` to `len(s)-1`',
                  options: ['Line X uses `len(s)` as index, but valid indices are `0` to `len(s)-1`', 'length gives the last position', 'access the top'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' },
                { id: 'c', prompt: 'Write a function `safe_pop(stack)` that pops and returns the top element if the stack is non-empty, otherwise returns `None` without raising an exception.', answer: '```python def safe_pop(stack): if not stack: # isEmpty check return None return',
                  options: ['```python def safe_pop(stack): if not stack: # isEmpty check return None return', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' }
          ],
            remediations: { 'peek-and-pop-are-interchangeable': { steps: ['Show a physical stack of plates: "Peek = look at top plate\'s color.', 'Pop = take it away." Ask: "If you only need to know the color, which do you do?" 2.', 'Trace code side-by-side: `x = stack[-1]; print(stack)` vs `x = stack.pop(); print(stack)`.', 'Give a buggy parentheses balancer that uses pop instead of peek; have student run on `"([])"` and observe failure.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".',
          parts: [
                { id: 'a', prompt: 'In a parentheses balancing algorithm, you push opening brackets and pop on closing brackets.', answer: 'First check (before pop): catches **extra closing brackets**',
                  options: ['First check (before pop): catches **extra closing brackets**', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' },
                { id: 'b', prompt: 'Design a `MinStack` class (using a list) that supports `push`, `pop`, `peek`, `isEmpty`, and `get_min()` — all in O(1) time.', answer: 'Use auxiliary stack `min_stack` tracking minimums',
                  options: ['Use auxiliary stack `min_stack` tracking minimums', 'access the top', '`peek()` and `pop()` are interchangeable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `peek()` and `pop()` are interchangeable because both "access the top".' }
          ],
            remediations: { 'peek-and-pop-are-interchangeable': { steps: ['Show a physical stack of plates: "Peek = look at top plate\'s color.', 'Pop = take it away." Ask: "If you only need to know the color, which do you do?" 2.', 'Trace code side-by-side: `x = stack[-1]; print(stack)` vs `x = stack.pop(); print(stack)`.', 'Give a buggy parentheses balancer that uses pop instead of peek; have student run on `"([])"` and observe failure.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_013', difficulty: 'standard',
          question: 'A circular queue is a linear data structure that follows FIFO principle where.',
          hint: 'Review linear queue implementation (c11_cs_cbse_10_011) and practice modulo arithmetic.',
          misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.',
          parts: [
                { id: 'a', prompt: 'In a circular queue of capacity 5 implemented with array indices 0-4, if front=3 and rear=1, how many elements are currently in the queue?', answer: '4 elements',
                  options: ['4 elements', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' },
                { id: 'b', prompt: 'Trace the following operations on a circular queue of capacity 4 (indices 0-3) initially empty with front=0, rear=-1, using the "sacrifice one slot" method.', answer: 'Step-by-step: 1',
                  options: ['Step-by-step: 1', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' },
                { id: 'c', prompt: 'Compare the two methods for distinguishing full vs empty in circular queue: (a) using a count variable, (b) sacrificing one slot.', answer: 'using a count variable, (',
                  options: ['using a count variable, (', 'both use same memory', 'sacrifice method is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' }
          ],
            remediations: { 'in-a-circular-queue-with': { steps: ['Draw a 4-element array on paper.', 'Simulate enqueue/dequeue with physical tokens.', 'Explicitly trace front and rear after each operation using `(index + 1) % 4`.', 'When front==rear, ask: "Is this empty or full?" Lead student to realize ambiguity.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.',
          parts: [
                { id: 'a', prompt: 'A student implements circular queue enqueue as: ``` def enqueue(self, item): if self.rear == self.capacity - 1: self.rear = 0 else: self.rear += 1.', answer: 'The code completely ignores the full condition and front pointer!',
                  options: ['The code completely ignores the full condition and front pointer!', 'it works for first few insertions', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' },
                { id: 'b', prompt: 'Design a circular queue variation that supports O(1) time for getFront(), getRear(), and getSize() operations while maintaining standard enqueue/dequeue.', answer: 'Add: size variable (initialized 0)',
                  options: ['Add: size variable (initialized 0)', 'in a circular queue with capacity N, the maximum number of elements is always N'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a circular queue with capacity N, the maximum number of elements is always N.' }
          ],
            remediations: { 'in-a-circular-queue-with': { steps: ['Draw a 4-element array on paper.', 'Simulate enqueue/dequeue with physical tokens.', 'Explicitly trace front and rear after each operation using `(index + 1) % 4`.', 'When front==rear, ask: "Is this empty or full?" Lead student to realize ambiguity.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
