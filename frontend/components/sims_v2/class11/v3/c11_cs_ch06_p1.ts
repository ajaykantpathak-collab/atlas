import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch06_p1: SimDef = {
    id: 'v3_c11_cs_ch06_p1',
    title: 'Strings and Lists in Python · Part 1/3',
    subtitle: 'Index from zero, slice out substrings, and learn why strings refuse in-place edits.',
    classLevel: 11, subject: 'computer_science', topic: 'Strings and Lists in Python · Part 1/3',
    chapters: ['c11_cs_ch06'],
    nodeIds: ['c11_cs_cbse_06_001', 'c11_cs_cbse_06_002', 'c11_cs_cbse_06_003', 'c11_cs_cbse_06_004', 'c11_cs_cbse_06_005', 'c11_cs_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a data clerk carving fields out of text records', intro: 'Forms want pieces of an ID card — board here, year there. Your scalpel is the index.', goal: 'Use zero-based indexing and slicing on strings and explain string immutability.' },
    discovery: {
        question: 'name = "Aarav" works, and name[0] reads \'A\' fine — but name[0] = "K" to make \'Karav\' throws TypeError. What rule did the assignment break?',
        options: ['Strings are immutable — \'edits\' must build a new string, never rewrite in place', 'Index 0 is reserved and cannot be assigned to', 'Single characters can\'t be stored in variables', 'The string was created with double quotes, which lock it'],
        answer: 'Strings are immutable — \'edits\' must build a new string, never rewrite in place',
        hook: 'Indexing reads fine — writing is what\'s banned. Immutability means every \'change\' is actually a fresh string.',
    },
    teaching: [
        { title: 'Introduction to Strings in Python', text: 'A string in Python is an immutable sequence of Unicode characters enclosed within single quotes (\' \'), double quotes (" "), or triple quotes (\'\'\' \'\'\' or """ """) used to represent textual data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Extract \'CBSE\' and \'2025\' from the ID \'CBSE2025\', grab the last character without hardcoding an index, and store a sentence containing both quote types.',
        labels: ['Introduction to Strings', 'Creating and Accessing Strings', 'String Slicing and Negative', 'String Operations: Concatenation', 'String Methods: upper, lower,', 'Traversing a String Using'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_003', title: 'String Slicing and Negative Indexing',
          caseStudy: { intro: 'Imagine you have a PAN card number `"ABCDE1234F"` and need to extract just the year of birth encoded as the 4 digits in the middle (positions 5 to 8).',
            decisions: [{ prompt: 'What is the output of `text = "PYTHON"; print(text[1:4])`?', options: [
                { text: 'The output is `YTH`', outcome: 'The output is `YTH`. Slicing `text[1:4]` starts at index 1 (`Y`), includes indices 2 (`T`) and 3.' },
                { text: 'the stop index is inclusive', outcome: 'Not quite — Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and.', reveals: 'the-stop-index-in-slicing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_004', title: 'String Operations: Concatenation and Repetition',
          caseStudy: { intro: 'Imagine you are building a greeting message for a school event: you have the string "Welcome" and the string "Students".',
            decisions: [{ prompt: 'What is the result of the expression `"Hello" + "World"` in Python?', options: [
                { text: 'The result is `"HelloWorld"` (without a space)', outcome: 'The result is `"HelloWorld"` (without a space). A wrong answer like `"Hello World"` reveals the.' },
                { text: 'Hello World', outcome: 'Not quite — Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how.', reveals: 's-s-x-modifies-the' },
                { text: '`s = s + "x"` modifies the original string `s` in place, similar to how `list', outcome: 'Not quite — Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how.', reveals: 's-s-x-modifies-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_005', title: 'String Methods: upper, lower, find, replace',
          caseStudy: { intro: 'Imagine you are building a login system for a school library where usernames are case-insensitive but passwords are case-sensitive.',
            decisions: [{ prompt: 'What is the return value of `\'Hello World\'.find(\'world\')` and why does it return that value?', options: [
                { text: 'The return value is `-1`', outcome: 'The return value is `-1` because `find()` is case-sensitive and the substring `\'world\'` (lowercase.' },
                { text: '`find()` is case-insensitive', outcome: 'Not quite — Students believe that string methods like `upper()`, `lower()`, and `replace()` modify the original.', reveals: 'string-methods-like-upper' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re storing data for the school magazine app. A teammate writes: `grade = \'A\'` and claims it\'s a char (like in Java), and for the three-line event invitation he writes three separate strings joined by `+`. He says triple-quoted strings are \'just for comments\'.',
            decisions: [{ prompt: 'What does Python actually do with these?', options: [
                { text: 'Python has no char type — \'A\' is a one-character string; single and double quotes are interchangeable. And triple quotes create multi-line string literals: the invitation can be one `\'\'\'Dear Parents, ... three lines ...\'\'\'` object — not a comment.', outcome: 'Strings are immutable sequences of characters in any quote style; triple quotes exist precisely for multi-line text (docstrings are just that convention applied).' },
                { text: '\'A\' is a char — single quotes make characters, double quotes make strings.', outcome: 'Both make `str` objects — `type(\'a\')` and `type("a")` are identical; the char/string split is a C/Java habit Python doesn\'t share.', reveals: 'single-quotes-make-char' },
                { text: 'Triple quotes are only for docstrings and comments, so joining with + is the correct approach for multi-line text.', outcome: 'Docstrings are triple-quoted strings used as comments by position, but the literal itself is a real multi-line string — made exactly for cases like the invitation.', reveals: 'triple-quotes-are-comments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'A string is an ordered row of characters you can read from either end — but never rewrite in place.',
            decisions: [{ prompt: 'What comes next? Strings and Lists in Python · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Strings and Lists in Python · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_001', difficulty: 'standard',
          question: 'A string in Python is an immutable sequence of Unicode characters enclosed.',
          hint: 'Review variable assignment and print statements from Python basics (Chapter 2-3 of NCERT.',
          misconception: 'Students believe **single quotes are for characters and double quotes are for strings** (like in C/Java).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A string in Python is an immutable sequence of Unicode characters enclosed within single',
                  options: ['A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring', 'String concatenation is the operation of joining two or more strings end-to-end to form a'],
                  hint: 'Review variable assignment and print statements from Python basics (Chapter 2-3 of NCERT Class 11.',
                  misconception: 'Students believe **single quotes are for characters and double quotes are for strings** (like in C/Java).' }
          ],
            remediations: { 'single-quotes-are-for-characters': { steps: ['Show `type(\'a\')` and `type("a")` both return `<class \'str\'>`.', 'Demonstrate `len(\'a\')` returns 1, proving it\'s a string.', 'Have them write a multi-line poem using triple quotes and print it — verify line breaks are preserved.', 'Contrast with C/Java char vs string to unlearn the prior notion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_002', difficulty: 'standard',
          question: 'A string in Python is an immutable ordered sequence of Unicode characters.',
          hint: 'Revisit c11_cs_cbse_06_001 (Introduction to Strings) and practice writing string literals.',
          misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first".',
          parts: [
                { id: 'a', prompt: 'Explain why `word = "EXAM"; print(word[4])` raises an `IndexError` but `print(word[3])` prints `M`. Use the term "valid index range" in your explanation.', answer: '`len("EXAM")` is 4, so valid indices are 0,1,2,3',
                  options: ['`len("EXAM")` is 4, so valid indices are 0,1,2,3', 'index 4 is the 4th character', 'strings are 1-indexed in Python'],
                  hint: 'Revisit c11_cs_cbse_06_001 (Introduction to Strings) and practice writing string literals with.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' },
                { id: 'b', prompt: 'Compare the two string creations: `s1 = \'It\\\'s Python\'` and `s2 = "It\'s Python"`. Are they identical?', answer: 'Yes, both represent the identical string `It\'s Python` (length 10)',
                  options: ['Yes, both represent the identical string `It\'s Python` (length 10)', 'one uses escape sequence'],
                  hint: 'Revisit c11_cs_cbse_06_001 (Introduction to Strings) and practice writing string literals with.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' }
          ],
            remediations: { 'students-consistently-treat-the-first': { steps: ['**Concrete mapping**: Write a string on paper: `A B C D E`.', 'Below each, write index: `0 1 2 3 4`.', 'Have student physically point: "Index 0 → A, Index 1 → B".', '**Boundary drill**: For string of length 5, list all valid indices (0-4) and invalid ones (-1, 5).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first".',
          parts: [
                { id: 'a', prompt: 'A student writes `msg = "Hello"; msg[0] = "J"` to change the first character to `J`. Python raises `TypeError: \'str\' object does not support item assignment`.', answer: 'The error is due to **string immutability**, not indexing syntax',
                  options: ['The error is due to **string immutability**, not indexing syntax', 'indexing doesn\'t work for assignment'],
                  hint: 'Revisit c11_cs_cbse_06_001 (Introduction to Strings) and practice writing string literals with.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' }
          ],
            remediations: { 'students-consistently-treat-the-first': { steps: ['**Concrete mapping**: Write a string on paper: `A B C D E`.', 'Below each, write index: `0 1 2 3 4`.', 'Have student physically point: "Index 0 → A, Index 1 → B".', '**Boundary drill**: For string of length 5, list all valid indices (0-4) and invalid ones (-1, 5).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_003', difficulty: 'standard',
          question: 'String slicing in Python uses the syntax `str[start:stop:step]` to extract.',
          hint: 'Revisit "Creating and Accessing Strings: Indexing" (c11_cs_cbse_06_002) and practice.',
          misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices.',
          parts: [
                { id: 'a', prompt: 'What is the output of `text = "PYTHON"; print(text[1:4])`?', answer: 'The output is `YTH`',
                  options: ['The output is `YTH`', 'the stop index is inclusive'],
                  hint: 'Revisit "Creating and Accessing Strings: Indexing" (c11_cs_cbse_06_002) and practice index diagrams.',
                  misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices reverse the.' },
                { id: 'b', prompt: 'Compare the results of `s[::2]` and `s[1::2]` for `s = "ABCDEFG"`. What pattern do they together represent?', answer: '`s[::2]` → `ACEG` (even indices: 0,2,4,6)',
                  options: ['`s[::2]` → `ACEG` (even indices: 0,2,4,6)', 'first half and second half'],
                  hint: 'Revisit "Creating and Accessing Strings: Indexing" (c11_cs_cbse_06_002) and practice index diagrams.',
                  misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices reverse the.' }
          ],
            remediations: { 'the-stop-index-in-slicing': { steps: ['Write a string on paper with both positive (0,1,2...) and negative (-1,-2,-3...) indices labeled above/below each.', 'Trace `s[1:4]` by placing a finger on index 1 and moving right, stopping **before** index 4; count characters touched.', 'Trace `s[-1:-4]` with default step: finger on -1, try to move right → cannot reach -4 → empty.', 'Trace `s[-1:-4:-1]`: finger on -1, move left (step -1) touching -1, -2, -3, stop before -4 → `NOH`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_004', difficulty: 'standard',
          question: 'String concatenation is the operation of joining two or more strings end-to-end.',
          hint: 'If stuck, revisit creating strings (c11_cs_cbse_06_001) and indexing (c11_cs_cbse_06_002).',
          misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()`.',
          parts: [
                { id: 'a', prompt: 'What is the result of the expression `"Hello" + "World"` in Python?', answer: 'The result is `"HelloWorld"` (without a space)',
                  options: ['The result is `"HelloWorld"` (without a space)', 'Hello World', '`s = s + "x"` modifies the original string `s` in place, similar to how `list'],
                  hint: 'If stuck, revisit creating strings (c11_cs_cbse_06_001) and indexing (c11_cs_cbse_06_002) to ensure.',
                  misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()` modifies a list.' },
                { id: 'b', prompt: 'Explain in your own words what the expression `"Ab" * 3` evaluates to and why.', answer: 'It evaluates to `"AbAbAb"`',
                  options: ['It evaluates to `"AbAbAb"`', '` or `', '`s = s + "x"` modifies the original string `s` in place, similar to how `list'],
                  hint: 'If stuck, revisit creating strings (c11_cs_cbse_06_001) and indexing (c11_cs_cbse_06_002) to ensure.',
                  misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()` modifies a list.' },
                { id: 'c', prompt: 'Given `s1 = "Py"` and `s2 = "thon"`, write a Python statement that creates the string `"Python"` using concatenation, and then write a statement that creates.', answer: 'Concatenation: `s1 + s2` gives `"Python"`',
                  options: ['Concatenation: `s1 + s2` gives `"Python"`', '`s = s + "x"` modifies the original string `s` in place, similar to how `list'],
                  hint: 'If stuck, revisit creating strings (c11_cs_cbse_06_001) and indexing (c11_cs_cbse_06_002) to ensure.',
                  misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()` modifies a list.' }
          ],
            remediations: { 's-s-x-modifies-the': { steps: ['To fix this, have the student trace memory references: draw a box for the original string, then show that `s + "x"`.', 'Then demonstrate with `id(s)` before and after to prove the object identity changes.', 'Contrast with a list where `lst.append(\'x\')` keeps the same `id`.', 'Repeat with a loop that does `s = s + \'x\'` vs `s += \'x\'` (which is the same) to reinforce that reassignment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_005', difficulty: 'standard',
          question: 'String methods `upper()`, `lower()`, `find()`, and `replace()` are built-in.',
          hint: 'Review string creation and indexing (nodes c11_cs_cbse_06_001 and c11_cs_cbse_06_002) and.',
          misconception: 'Students believe that string methods like `upper()`, `lower()`, and `replace()` modify the original string in place.',
          parts: [
                { id: 'a', prompt: 'What is the return value of `\'Hello World\'.find(\'world\')` and why does it return that value?', answer: 'The return value is `-1`',
                  options: ['The return value is `-1`', '`find()` is case-insensitive'],
                  hint: 'Review string creation and indexing (nodes c11_cs_cbse_06_001 and c11_cs_cbse_06_002) and the.',
                  misconception: 'Students believe that string methods like `upper()`, `lower()`, and `replace()` modify the original string in place.' },
                { id: 'b', prompt: 'Compare the outputs of `\'Banana\'.find(\'na\')` and `\'Banana\'.find(\'na\', 3)`. What does the second argument do, and how does it affect the search?', answer: '`\'Banana\'.find(\'na\')` returns `2` (first occurrence at index 2), while',
                  options: ['`\'Banana\'.find(\'na\')` returns `2` (first occurrence at index 2), while', '`start` is the length to search'],
                  hint: 'Review string creation and indexing (nodes c11_cs_cbse_06_001 and c11_cs_cbse_06_002) and the.',
                  misconception: 'Students believe that string methods like `upper()`, `lower()`, and `replace()` modify the original string in place.' }
          ],
            remediations: { 'string-methods-like-upper': { steps: ['Remind the student that strings are immutable (covered in node c11_cs_cbse_06_007).', 'Show a memory diagram: original string object remains, method creates a new string object.', 'Have them trace code with `id()` to see the object identity change: `s = \'hi\'; print(id(s)); s2 = s.upper().', 'Practice writing `s = s.upper()` pattern until it becomes automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_006', difficulty: 'standard',
          question: 'Traversing a string using loops is the process of accessing each character of.',
          hint: 'Revisit indexing and length: write a string, count characters on fingers starting from 0.',
          misconception: 'Students believe that `for i in s:` gives them the index `i` (like in `range(len(s))`), so they write `for i in "TEXT".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Traversing a string using loops is the process of accessing each character of a string',
                  options: ['Traversing a string using loops is the process of accessing each character of a string', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Revisit indexing and length: write a string, count characters on fingers starting from 0, verify.',
                  misconception: 'Students believe that `for i in s:` gives them the index `i` (like in `range(len(s))`), so they write `for i in "TEXT": print(s[i])`.' }
          ],
            remediations: { 'for-i-in-s-gives': { steps: ['Write two loops side by side on paper: `for i in range(4): print(i)` → outputs 0,1,2,3 `for i in "TEXT": print(i)` →.', 'Ask: "What does `i` represent in each?" Emphasize: in `range`, `i` is a *number* (index); in string, `i` is.', 'Have student trace `for ch in "AM": print(ch, ch*2)` to reinforce that the variable holds the character, not position.', 'Then introduce `for i in range(len(s)):` as the "index version" and `for ch in s:` as the "value version" — never mix.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
