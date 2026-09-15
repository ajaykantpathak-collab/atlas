import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch06_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch06_p3: SimDef = {
    id: 'v3_c11_cs_ch06_p3',
    title: 'Strings and Lists in Python · Part 3/3',
    subtitle: 'Index from zero, slice out substrings, and learn why strings refuse in-place edits.',
    classLevel: 11, subject: 'computer_science', topic: 'Strings and Lists in Python · Part 3/3',
    chapters: ['c11_cs_ch06'],
    nodeIds: ['c11_cs_cbse_06_013', 'c11_cs_cbse_06_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data clerk carving fields out of text records', intro: 'Forms want pieces of an ID card — board here, year there. Your scalpel is the index.', goal: 'Use zero-based indexing and slicing on strings and explain string immutability.' },
    discovery: {
        question: 'name = "Aarav" works, and name[0] reads \'A\' fine — but name[0] = "K" to make \'Karav\' throws TypeError. What rule did the assignment break?',
        options: ['Strings are immutable — \'edits\' must build a new string, never rewrite in place', 'Index 0 is reserved and cannot be assigned to', 'Single characters can\'t be stored in variables', 'The string was created with double quotes, which lock it'],
        answer: 'Strings are immutable — \'edits\' must build a new string, never rewrite in place',
        hook: 'Indexing reads fine — writing is what\'s banned. Immutability means every \'change\' is actually a fresh string.',
    },
    teaching: [
        { title: 'List Comprehensions in Python', text: 'A list comprehension in Python is a concise syntactic construct that creates a new list by applying an expression to each element of an iterable, optionally filtering elements with a conditional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Extract \'CBSE\' and \'2025\' from the ID \'CBSE2025\', grab the last character without hardcoding an index, and store a sentence containing both quote types.',
        labels: ['List Comprehensions in Python', 'Copying Lists: Shallow Copy'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_014', title: 'Copying Lists: Shallow Copy and Aliasing',
          caseStudy: { intro: 'Imagine you and a friend are sharing a single Google Doc (aliasing): if you edit a paragraph, your friend sees the change instantly because you are editing the.',
            decisions: [{ prompt: 'What is the output of the following code and why? ```python list1 = [10, 20, 30] list2 = list1 list2[0] = 99 print(list1) ```', options: [
                { text: 'Output: `[99, 20, 30]`', outcome: 'Output: `[99, 20, 30]`. Reason: `list2 = list1` creates an alias; both variables point to the same.' },
                { text: 'assignment creates a new independent list, confusing it with shallow copy', outcome: 'Not quite — Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates.', reveals: 'any-copy-operation-slicing' },
                { text: '**any** copy operation (slicing, `list()`, `copy', outcome: 'Not quite — Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates.', reveals: 'any-copy-operation-slicing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re storing data for the school magazine app. A teammate writes: `grade = \'A\'` and claims it\'s a char (like in Java), and for the three-line event invitation he writes three separate strings joined by `+`. He says triple-quoted strings are \'just for comments\'.',
            decisions: [{ prompt: 'What does Python actually do with these?', options: [
                { text: 'Python has no char type — \'A\' is a one-character string; single and double quotes are interchangeable. And triple quotes create multi-line string literals: the invitation can be one `\'\'\'Dear Parents, ... three lines ...\'\'\'` object — not a comment.', outcome: 'Strings are immutable sequences of characters in any quote style; triple quotes exist precisely for multi-line text (docstrings are just that convention applied).' },
                { text: '\'A\' is a char — single quotes make characters, double quotes make strings.', outcome: 'Both make `str` objects — `type(\'a\')` and `type("a")` are identical; the char/string split is a C/Java habit Python doesn\'t share.', reveals: 'single-quotes-make-char' },
                { text: 'Triple quotes are only for docstrings and comments, so joining with + is the correct approach for multi-line text.', outcome: 'Docstrings are triple-quoted strings used as comments by position, but the literal itself is a real multi-line string — made exactly for cases like the invitation.', reveals: 'triple-quotes-are-comments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_014', title: 'You made it',
          caseStudy: { intro: 'A string is an ordered row of characters you can read from either end — but never rewrite in place.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_013', difficulty: 'standard',
          question: 'A list comprehension in Python is a concise syntactic construct that creates.',
          hint: 'If stuck, revisit c11_cs_cbse_06_011 (List Methods: append) and practice writing 3-4.',
          misconception: 'Students believe the `if` clause in a list comprehension filters the **output values** (the result of the expression).',
          parts: [
                { id: 'a', prompt: 'Compare the memory and time efficiency of these two approaches for creating a list of squares of first 10,000 natural numbers. Which is preferred and why?', answer: 'Both approaches have **O(n)** time complexity and produce identical lists',
                  options: ['Both approaches have **O(n)** time complexity and produce identical lists', 'for-loops are faster'],
                  hint: 'If stuck, revisit c11_cs_cbse_06_011 (List Methods: append) and practice writing 3-4 list-building.',
                  misconception: 'Students believe the `if` clause in a list comprehension filters the **output values** (the result of the expression) rather than the.' }
          ],
            remediations: { 'the-if-clause-in-a': { steps: ['Write a comprehension and its equivalent for-loop side-by-side on paper.', 'Trace both with a 3-element list, writing the loop variable value, whether the `if` passes, and the expression result.', 'Highlight that the `for` clause appears **before** the `if` in execution order, even though it\'s written after the.', 'Give the student a "broken" comprehension like `[x*2 for x in [1,2,3] if x*2 > 4]` and ask them to predict output, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the `if` clause in a list comprehension filters the **output values** (the result of the expression).',
          parts: [
                { id: 'a', prompt: 'A student argues: "List comprehensions are always better than for-loops because they\'re shorter and faster.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'comprehension everywhere'],
                  hint: 'If stuck, revisit c11_cs_cbse_06_011 (List Methods: append) and practice writing 3-4 list-building.',
                  misconception: 'Students believe the `if` clause in a list comprehension filters the **output values** (the result of the expression) rather than the.' }
          ],
            remediations: { 'the-if-clause-in-a': { steps: ['Write a comprehension and its equivalent for-loop side-by-side on paper.', 'Trace both with a 3-element list, writing the loop variable value, whether the `if` passes, and the expression result.', 'Highlight that the `for` clause appears **before** the `if` in execution order, even though it\'s written after the.', 'Give the student a "broken" comprehension like `[x*2 for x in [1,2,3] if x*2 > 4]` and ask them to predict output, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_014', difficulty: 'standard',
          question: 'In Python, **aliasing** occurs when two or more variables refer to the exact.',
          hint: 'If stuck, revisit **c11_cs_cbse_06_010 (List Slicing)** to master the `[:]` syntax and.',
          misconception: 'Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates a fully independent.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code and why? ```python list1 = [10, 20, 30] list2 = list1 list2[0] = 99 print(list1) ```', answer: 'Output: `[99, 20, 30]`',
                  options: ['Output: `[99, 20, 30]`', 'assignment creates a new independent list, confusing it with shallow copy', '**any** copy operation (slicing, `list()`, `copy'],
                  hint: 'If stuck, revisit **c11_cs_cbse_06_010 (List Slicing)** to master the `[:]` syntax and.',
                  misconception: 'Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates a fully independent duplicate of the entire.' },
                { id: 'b', prompt: 'Explain in your own words the difference between `list2 = list1` and `list2 = list1[:]` when `list1 = [1, 2, 3]`.', answer: '`list2 = list1` makes `list2` store the exact same memory address as `list1`',
                  options: ['`list2 = list1` makes `list2` store the exact same memory address as `list1`', '**any** copy operation (slicing, `list()`, `copy'],
                  hint: 'If stuck, revisit **c11_cs_cbse_06_010 (List Slicing)** to master the `[:]` syntax and.',
                  misconception: 'Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates a fully independent duplicate of the entire.' },
                { id: 'c', prompt: 'Given `original = [[1, 2], [3, 4]]`, write code to create a shallow copy named `copy_list`. Then execute `copy_list[0].append(99)`. What is `original` now?', answer: 'Code: `copy_list = original[:]` (or `list(original)`)',
                  options: ['Code: `copy_list = original[:]` (or `list(original)`)', '**any** copy operation (slicing, `list()`, `copy'],
                  hint: 'If stuck, revisit **c11_cs_cbse_06_010 (List Slicing)** to master the `[:]` syntax and.',
                  misconception: 'Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates a fully independent duplicate of the entire.' },
                { id: 'd', prompt: 'Compare the following three snippets. Which ones create a shallow copy and which create an alias? Justify each. ```python', answer: 'A creates an alias (same id)',
                  options: ['A creates an alias (same id)', '**any** copy operation (slicing, `list()`, `copy'],
                  hint: 'If stuck, revisit **c11_cs_cbse_06_010 (List Slicing)** to master the `[:]` syntax and.',
                  misconception: 'Students often believe that **any** copy operation (slicing, `list()`, `copy.copy()`) creates a fully independent duplicate of the entire.' }
          ],
            remediations: { 'any-copy-operation-slicing': { steps: ['**Visualize memory**: Draw two boxes labeled `list1` and `list2` with arrows pointing to the *same* list object.', 'Then draw two separate outer boxes with arrows pointing to the *same* inner integer objects for shallow copy.', '**Use `id()`**: Have the student run `id(list1)`, `id(list2)`, `id(list1[0])`, `id(list2[0])` for both aliasing and.', 'Seeing identical ids for the outer list in aliasing but different outer ids (same inner ids) in shallow copy makes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
