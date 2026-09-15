import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch05_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch05_p3: SimDef = {
    id: 'v3_c11_cs_ch05_p3',
    title: 'Conditional and Iterative Statements · Part 3/3',
    subtitle: 'Control the flow: conditions that decide and loops that repeat, without lying about when they check.',
    classLevel: 11, subject: 'computer_science', topic: 'Conditional and Iterative Statements · Part 3/3',
    chapters: ['c11_cs_ch05'],
    nodeIds: ['c11_cs_cbse_05_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer automating a rickshaw fare table', intro: 'One fixed distance, one formula — useless. Real riders go 2 km or 20 km, and your code must bend.', goal: 'Use if/elif/else, while and for to make programs decide and repeat correctly.' },
    discovery: {
        question: 'Halfway through a while loop\'s body, a variable makes the condition false. Does the loop bail out instantly?',
        options: ['No — the condition is only checked at the top; the current iteration finishes first', 'Yes — Python watches the condition like a sensor', 'Yes — but only for numeric conditions', 'No — a while loop never stops once started'],
        answer: 'No — the condition is only checked at the top; the current iteration finishes first',
        hook: 'The condition is a gate at the top of the loop, not a tripwire inside it — mid-body changes wait their turn.',
    },
    teaching: [
        { title: 'Infinite Loops and Common Loop Errors', text: 'An infinite loop is a loop whose termination condition never evaluates to False, causing the loop body to execute indefinitely.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write a countdown loop from 10 to 2, build the even-number sum two ways, then predict what Python does with "10" > 2.',
        labels: ['Infinite Loops and Common'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_013', title: 'Infinite Loops and Common Loop Errors',
          caseStudy: { intro: 'Imagine you write a while loop to sum numbers from 1 to 10, but the program just hangs — the cursor blinks forever.',
            decisions: [{ prompt: 'What is an infinite loop in Python? Give a one-line definition.', options: [
                { text: 'An infinite loop is a loop whose condition never evaluates to False, causing it to', outcome: 'An infinite loop is a loop whose condition never evaluates to False, causing it to execute.' },
                { text: 'a loop that runs many times', outcome: 'Not quite — Students often think that a `for` loop cannot be infinite because it iterates over a finite.', reveals: 'a-for-loop-cannot-be' },
                { text: 'a `for` loop cannot be infinite', outcome: 'Not quite — Students often think that a `for` loop cannot be infinite because it iterates over a finite.', reveals: 'a-for-loop-cannot-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You code a metro-card simulator: `while balance > 0: deduct ₹40; print \'Ride OK\'; if balance hits 0 mid-ride... `. A friend claims: \'The while loop watches the balance like a sensor — the moment balance becomes 0 inside the loop body, it stops instantly, so the last printed ride can\'t happen.\'',
            decisions: [{ prompt: 'When does a while loop actually re-check its condition?', options: [
                { text: 'Only at the start of each iteration — the body always finishes once entered. If `balance` hits 0 mid-body, the remaining statements still run; the loop exits only when control returns to the top and re-evaluates `balance > 0`. To stop mid-iteration you need an explicit `break`.', outcome: 'A while loop is a gate at the loop\'s head, not a live sensor; conditions are sampled once per iteration, not continuously.' },
                { text: 'The friend is right — while conditions are evaluated continuously, so the body halts the instant balance reaches 0.', outcome: 'That mental model predicts the wrong output: Python checks once before each pass; a mid-body change can\'t abort the current pass.', reveals: 'while-is-a-live-sensor' },
                { text: 'The loop exits mid-body only if the condition involves `input()` — external triggers interrupt execution.', outcome: 'Nothing inside the body interrupts it — not input, not value changes; only finishing the body (or break/return) yields control back to the condition check.', reveals: 'input-interrupts-loop' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_05_013', title: 'You made it',
          caseStudy: { intro: 'Selection chooses a path once; iteration walks it again and again — and only ever checks at the door.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_013', difficulty: 'standard',
          question: 'An infinite loop is a loop whose termination condition never evaluates.',
          hint: 'Review the while loop node (c11_cs_cbse_05_008) and for loop node (c11_cs_cbse_05_009).',
          misconception: 'Students often think that a `for` loop cannot be infinite because it iterates over a finite sequence.',
          parts: [
                { id: 'a', prompt: 'Fix the infinite loop in this code so it prints numbers 1 to 5: ```python count = 1 while count <= 5: print(count) ```', answer: 'Add `count += 1` inside the loop',
                  options: ['Add `count += 1` inside the loop', 'a `for` loop cannot be infinite'],
                  hint: 'Review the while loop node (c11_cs_cbse_05_008) and for loop node (c11_cs_cbse_05_009), focusing.',
                  misconception: 'Students often think that a `for` loop cannot be infinite because it iterates over a finite sequence.' },
                { id: 'b', prompt: 'Compare these two loops. Which has an off-by-one error? Explain.', answer: 'Loop A prints 1 to 9 (off-by-one: stops at 9 instead of 10)',
                  options: ['Loop A prints 1 to 9 (off-by-one: stops at 9 instead of 10)', 'both are correct', 'a `for` loop cannot be infinite'],
                  hint: 'Review the while loop node (c11_cs_cbse_05_008) and for loop node (c11_cs_cbse_05_009), focusing.',
                  misconception: 'Students often think that a `for` loop cannot be infinite because it iterates over a finite sequence.' }
          ],
            remediations: { 'a-for-loop-cannot-be': { steps: ['If the student holds this misconception, demonstrate with a live coding example: create a list, iterate over it while.', 'Then explain that `for` loops in Python use an iterator that reflects changes to the underlying sequence.', 'Contrast with `while` loops where the condition is re-evaluated each iteration.', 'Have the student trace the iterator behavior step by step, writing down the list state and iterator position at each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a `for` loop cannot be infinite because it iterates over a finite sequence.',
          parts: [
                { id: 'a', prompt: 'Write a Python `while` loop that intentionally becomes infinite, then modify it to terminate after 3 iterations using a counter. Provide both versions.', answer: 'Infinite version: `while True: print("Hello")`',
                  options: ['Infinite version: `while True: print("Hello")`', 'a `for` loop cannot be infinite'],
                  hint: 'Review the while loop node (c11_cs_cbse_05_008) and for loop node (c11_cs_cbse_05_009), focusing.',
                  misconception: 'Students often think that a `for` loop cannot be infinite because it iterates over a finite sequence.' }
          ],
            remediations: { 'a-for-loop-cannot-be': { steps: ['If the student holds this misconception, demonstrate with a live coding example: create a list, iterate over it while.', 'Then explain that `for` loops in Python use an iterator that reflects changes to the underlying sequence.', 'Contrast with `while` loops where the condition is re-evaluated each iteration.', 'Have the student trace the iterator behavior step by step, writing down the list state and iterator position at each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
