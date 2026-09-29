import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch07_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch07_p3: SimDef = {
    id: 'v3_c11_cs_ch07_p3',
    title: 'Tuples and Dictionaries · Part 3/3',
    subtitle: 'Use tuples for data that must not move — and learn that it\'s the comma, not the bracket, that seals it.',
    classLevel: 11, subject: 'computer_science', topic: 'Tuples and Dictionaries · Part 3/3',
    chapters: ['c11_cs_ch07'],
    nodeIds: ['c11_cs_cbse_07_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developer guarding data that must stay constant', intro: 'Twelve sales targets, fixed all year. Choose a container that makes \'unchangeable\' a feature, not a hope.', goal: 'Create, index and slice tuples and justify immutability as a design choice.' },
    discovery: {
        question: 'You write t = (5) expecting a one-item tuple — but type(t) says int. What actually makes a tuple?',
        options: ['The comma — (5,) is a tuple; parentheses only group', 'The parentheses — but only with two or more items', 'The tuple() constructor — nothing else counts', 'Square brackets are required for single items'],
        answer: 'The comma — (5,) is a tuple; parentheses only group',
        hook: 'Parentheses are decoration; the comma is the signature. Even t = 1, 2, 3 is a tuple.',
    },
    teaching: [
        { title: 'Converting Between Lists, Tuples and Dictionaries', text: 'Converting between lists, tuples, and dictionaries in Python refers to the process of transforming data from one collection type to another using built-in constructors (list(), tuple(), dict()) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Store the RGB triple (255, 153, 51), slice out (30, 40) using negative indices, then argue tuple over list for twelve fixed monthly targets.',
        labels: ['Converting Between Lists, Tuples'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c11_cs_cbse_07_013', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Convert dictionary to list of tuples using items().', 'Verify the result: print(sorted_list) should show [(\'Diya\'.', 'Identify the two lists: names = [\'Aarav\', \'Diya\', \'Karan\'].', 'Sort the list of tuples by the second element (score).', 'Use zip() to pair corresponding elements: zip(names.', 'Pass the zipped pairs to dict() to create the dictionary.'], answer: 'Identify the two lists: names = [\'Aarav\', \'Diya\', \'Karan\']. Use zip() to pair corresponding elements: zip(names. Pass the zipped pairs to dict() to create the dictionary. Convert dictionary to list of tuples using items(). Sort the list of tuples by the second element (score). Verify the result: print(sorted_list) should show [(\'Diya\'.' } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a robotics-club tracker you store each fixed coordinate as a tuple `point = (x, y, tags_list)` — coordinates immutable, but the third slot holds a list of tags. A teammate warns: \'Tuples are immutable, so `point[2].append("obstacle")` will crash — the whole object graph is frozen.\'',
            decisions: [{ prompt: 'Will that append work?', options: [
                { text: 'Yes — it works. Tuple immutability freezes the container\'s references (you can\'t reassign point[2] to a different list), but the list object inside stays mutable and can be appended to. Container immutability ≠ content immutability.', outcome: 'The tuple guarantees \'always the same three slots\', not \'frozen contents\' — a mutable object inside a tuple can still change.' },
                { text: 'It crashes — immutable means nothing reachable through the tuple can change.', outcome: 'That over-reads immutability: only the tuple\'s own slots are locked; the objects they point to keep their own mutability rules.', reveals: 'tuple-freezes-everything' },
                { text: 'It works because tuples aren\'t really immutable — that\'s just a convention.', outcome: 'Wrong reason: try `point[0] = 5` and TypeError fires — the tuple IS immutable; the append succeeds only because the inner list is separately mutable.', reveals: 'tuples-arent-really-immutable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_07_013', title: 'You made it',
          caseStudy: { intro: 'A tuple is a sealed envelope — read anything inside, change nothing, and let the seal itself signal \'fixed.\'',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_013', difficulty: 'standard',
          question: 'Converting between lists, tuples, and dictionaries in Python refers to the.',
          hint: 'Revisit the dictionary methods .items(), .keys(), .values() and the tuple() and list().',
          misconception: 'Students often believe that dict() can directly convert any sequence (list/tuple) into a dictionary by automatically.',
          parts: [
                { id: 'a', prompt: 'Compare the mutability and memory implications of converting a large list to a tuple versus keeping it as a list.', answer: 'Converting to tuple creates an immutable object',
                  options: ['Converting to tuple creates an immutable object', 'tuple is always faster', 'list is immutable'],
                  hint: 'Revisit the dictionary methods .items(), .keys(), .values() and the tuple() and list() constructors.',
                  misconception: 'Students often believe that dict() can directly convert any sequence (list/tuple) into a dictionary by automatically pairing consecutive.' }
          ],
            remediations: { 'dict-can-directly-convert-any': { steps: ['Show the exact error by running dict([1,2,3]) in the interpreter.', 'Demonstrate the correct structure: dict([(1,2), (3,4)]) works.', 'Explain that dict() iterates over the outer iterable, and each item must be a key-value pair (length-2 iterable).', 'Practice with zip(): dict(zip(keys, values)) to build dictionaries from two parallel lists.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_07_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that dict() can directly convert any sequence (list/tuple) into a dictionary by automatically.',
          parts: [
                { id: 'a', prompt: 'A student writes `dict([1,2,3])` to create a dictionary with keys 1,2,3 and values None.', answer: 'The code raises ValueError',
                  options: ['The code raises ValueError', 'it works and gives {1:None, 2:None, 3:None}', 'dict() pairs consecutive elements'],
                  hint: 'Revisit the dictionary methods .items(), .keys(), .values() and the tuple() and list() constructors.',
                  misconception: 'Students often believe that dict() can directly convert any sequence (list/tuple) into a dictionary by automatically pairing consecutive.' }
          ],
            remediations: { 'dict-can-directly-convert-any': { steps: ['Show the exact error by running dict([1,2,3]) in the interpreter.', 'Demonstrate the correct structure: dict([(1,2), (3,4)]) works.', 'Explain that dict() iterates over the outer iterable, and each item must be a key-value pair (length-2 iterable).', 'Practice with zip(): dict(zip(keys, values)) to build dictionaries from two parallel lists.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
