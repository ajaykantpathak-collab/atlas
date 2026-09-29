import type { SimDef } from '../../engine/types';
import C11_ComputerScienceStringSlicingSim from '../../../simulations/c6_12/C11_ComputerScienceStringSlicingSim';

/** v3 wrapped master — C11_ComputerScienceStringSlicingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_computersciencestringslicingsim: SimDef = {
    id: 'v3w_c11_computersciencestringslicingsim',
    title: 'Introduction to Strings in Python',
    subtitle: 'Covers string definition, creation using single/double/triple quotes, escape sequences,.',
    classLevel: 11, subject: 'computer_science', topic: 'Introduction to Strings in Python',
    chapters: [],
    nodeIds: ['c11_cs_cbse_06_001', 'c11_cs_cbse_06_002', 'c11_cs_cbse_06_003', 'c11_cs_cbse_06_004', 'c11_cs_cbse_06_008', 'c11_cs_cbse_06_009', 'c11_cs_cbse_06_010', 'c11_cs_cbse_06_014', 'c11_cs_cbse_06_005', 'c11_cs_cbse_06_006', 'c11_cs_cbse_06_007', 'c11_cs_cbse_07_001', 'c11_cs_cbse_07_002', 'c11_cs_cbse_07_003', 'c11_cs_cbse_07_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are building a program to store student details for your school\'s annual day.', goal: 'Master Introduction to Strings in Python.' },
    discovery: {
        question: 'Explain why `word = "EXAM"; print(word[4])` raises an `IndexError` but `print(word[3])` prints `M`. Use the term "valid index range" in your explanation.',
        options: ['`len("EXAM")` is 4, so valid indices are 0,1,2,3', 'index 4 is the 4th character', 'strings are 1-indexed in Python'],
        answer: '`len("EXAM")` is 4, so valid indices are 0,1,2,3',
        hook: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first",.',
    },
    teaching: [
        { title: 'A string in Python is an immutable sequence.', text: 'A string in Python is an immutable sequence of Unicode characters enclosed within single quotes (\' \'), double quotes (" "), or triple quotes (\'\'\' \'\'\' or """ """) used to represent textual data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_cs_cbse_06_001', title: 'A string in Python is an immutable.',
          scaffold: { problem: 'A school library system needs to store a book\'s title, author, and a multi-line summary.',
            steps: [
            { text: 'Identify that title has no internal quotes → use double quotes for clarity: `title = "The White Tiger"`' },
            { text: 'Author has no quotes but we\'ll use single quotes to show variety: `author = \'Aravind Adiga\'`' },
            { text: 'Summary contains both single and double quotes AND multiple lines → must use triple quotes to avoid escaping: `summary.' },
            { text: 'Verify by printing all three: `print(title)`, `print(author)`, `print(summary)`' },
            { text: 'Confirm output preserves line breaks and quotes exactly as intended.', faded: true, blankAnswer: '```python' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_06_002', title: 'A string in Python is an immutable.',
          scaffold: { problem: 'A school\'s library system stores book codes as strings like `"SCI-FI-2024"`.',
            steps: [
            { text: 'Create the string variable `code = "SCI-FI-2024"` and determine its length using `len(code)` → 11 characters.' },
            { text: 'Identify indices for genre: characters at indices 0,1,2,3 → \'S\',\'C\',\'I\',\'-\'. But genre is "SCI-" including hyphen?' },
            { text: 'Separator is 5th character → human 5th = index 4 → `code[4]` which is \'F\'?' },
            { text: 'Extract using indexing: `genre = code[0] + code[1] + code[2] + code[3]`, `sep = code[4]`, `year = code[7] + code[8] +.' },
            { text: 'Print results. Verify: genre="SCI-", sep="F", year="2024".', faded: true, blankAnswer: 'Genre: SCI-, Separator: F, Year: 2024' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_06_003', title: 'String slicing in Python uses the.',
          scaffold: { problem: 'A student ID follows the format `YYYYBRANCHNNN` where `YYYY` is admission year (4 digits), `BRANCH` is a 3-letter code (e.g., `CSE`), and.',
            steps: [
            { text: 'Identify the structure: total length = 4 + 3 + 3 = 10. Branch occupies indices 4,5,6; roll occupies 7,8,9.' },
            { text: 'Convert to negative indices: index 4 = -6, index 5 = -5, index 6 = -4, index 7 = -3, index 8 = -2, index 9 = -1.' },
            { text: 'Branch slice: start at -6, stop before -3 (i.e., -3 exclusive) → `sid[-6:-3]`.' },
            { text: 'Roll slice: start at -3, go to end → `sid[-3:]`.' },
            { text: 'Verify: `sid[-6:-3]` → `CSE`; `sid[-3:]` → `056`.', faded: true, blankAnswer: 'Branch = `sid[-6:-3]` → `"CSE"`; Roll = `sid[-3:]` → `"056"`' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_06_004', title: 'String concatenation is the operation.',
          scaffold: { problem: 'A school wants to generate student IDs by concatenating the first three letters of the student\'s first name (in uppercase), the last two.',
            steps: [
            { text: 'Extract the first three letters of "Rahul" -> "Rah". Convert to uppercase -> "RAH".' },
            { text: 'Get the last two digits of 2023 -> "23". Since the year is an integer, convert to string: str(2023)[-2:] -> "23".' },
            { text: 'The class number is 11, repeat it twice using repetition: str(11) * 2 -> "1111".' },
            { text: 'Concatenate the three parts: "RAH" + "23" + "1111" -> "RAH231111".' },
            { text: 'Verify the output matches the required format.', faded: true, blankAnswer: '"RAH231111"' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_06_008', title: 'A list in Python is an ordered, mutable.',
          scaffold: { problem: 'A school canteen tracks the number of samosas sold each day for a week.',
            steps: [
            { text: 'Identify the requirement—data changes over time (corrections, updates) → need mutability.' },
            { text: 'Recognise the data is a sequence of integers (homogeneous but could later include "closed" for holidays) → list.' },
            { text: 'Create initial list: `sales = [45, 52, 38, 60, 55, 70, 40]` (Monday=index 0 ... Sunday=index 6).' },
            { text: 'Apply correction (a): `sales[2] = 42` (Wednesday is index 2).' },
            { text: 'Apply correction (b): `sales[5] = 68` (Saturday is index 5).' },
            { text: 'Verify final list: `[45, 52, 42, 60, 55, 68, 40]`.' },
            { text: 'Note that total can be computed with `sum(sales)` later—list enables this.', faded: true, blankAnswer: 'Final corrected list: `[45, 52, 42, 60, 55, 68, 40]`. List.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_06_009', title: 'A list in Python is an ordered, mutable.',
          scaffold: { problem: 'A school canteen tracks daily samosa sales for a week (Mon-Sun): 120, 150, 90, 200, 180, 250, 300. Create a list `sales`.',
            steps: [
            { text: 'Create list with given data in order: `sales = [120, 150, 90, 200, 180, 250, 300]`' },
            { text: 'Map days to indices: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6.' },
            { text: '(a) Wednesday → index 2 → `sales[2]` = 90. (b) Saturday → index 5 or -2 → `sales[-2]` = 250. (c) `len(sales)` = 7.' },
            { text: 'Verify: Wednesday is 3rd day → index 2 ✓. Saturday is 6th day → index 5 or -2 ✓. Length 7 matches 7 days ✓.' },
            { text: 'Interpret: Samosas sold least on Wednesday (90), most on Sunday (300). Friday sales dropped from Thursday.', faded: true, blankAnswer: '(a) 90, (b) 250, (c) 7, (d) False' }
            ] } },
        { type: 'dissect', nodeId: 'c11_cs_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Strings in Python', spots: [
            { id: 's1', label: 'A string in Python is', prompt: 'Which idea is this? — A string in Python is an immutable sequence of Unicode characters enclosed within single.', answer: 'A string in Python is', options: ['A string in Python is', 'String slicing in Python uses', 'String concatenation is the operation', 'A list in Python is'] },
            { id: 's2', label: 'String slicing in Python uses', prompt: 'Which idea is this? — String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring.', answer: 'String slicing in Python uses', options: ['String slicing in Python uses', 'A string in Python is', 'String concatenation is the operation', 'A list in Python is'] },
            { id: 's3', label: 'String concatenation is the operation', prompt: 'Which idea is this? — String concatenation is the operation of joining two or more strings end-to-end to form a.', answer: 'String concatenation is the operation', options: ['String concatenation is the operation', 'A string in Python is', 'String slicing in Python uses', 'A list in Python is'] },
            { id: 's4', label: 'A list in Python is', prompt: 'Which idea is this? — A list in Python is an ordered, mutable collection of elements enclosed in square.', answer: 'A list in Python is', options: ['A list in Python is', 'A string in Python is', 'String slicing in Python uses', 'String concatenation is the operation'] }
          ] } }
    ],
    explore: { component: C11_ComputerScienceStringSlicingSim, prompt: 'Explore the interactive — Introduction to Strings in Python' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_001', difficulty: 'standard',
          question: 'A string in Python is an immutable sequence of Unicode characters enclosed.',
          hint: 'Review variable assignment and print statements from Python basics (Chapter 2-3 of NCERT.',
          misconception: 'Students believe **single quotes are for characters and double quotes are for strings** (like in C/Java).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A string in Python is an immutable sequence of Unicode characters enclosed within single',
                  options: ['A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring', 'String concatenation is the operation of joining two or more strings end-to-end to form a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **single quotes are for characters and double quotes are for strings** (like in C/Java).' }
          ],
            remediations: { 'single-quotes-are-for-characters': { steps: ['Show `type(\'a\')` and `type("a")` both return `<class \'str\'>`.', 'Demonstrate `len(\'a\')` returns 1, proving it\'s a string.', 'Have them write a multi-line poem using triple quotes and print it — verify line breaks are preserved.', 'Contrast with C/Java char vs string to unlearn the prior notion.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_002', difficulty: 'standard',
          question: 'A string in Python is an immutable ordered sequence of Unicode characters.',
          hint: 'Revisit c11_cs_cbse_06_001 (Introduction to Strings) and practice writing string literals.',
          misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first",.',
          parts: [
                { id: 'a', prompt: 'Explain why `word = "EXAM"; print(word[4])` raises an `IndexError` but `print(word[3])` prints `M`. Use the term "valid index range" in your explanation.', answer: '`len("EXAM")` is 4, so valid indices are 0,1,2,3',
                  options: ['`len("EXAM")` is 4, so valid indices are 0,1,2,3', 'index 4 is the 4th character', 'strings are 1-indexed in Python'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' },
                { id: 'b', prompt: 'Compare the two string creations: `s1 = \'It\\\'s Python\'` and `s2 = "It\'s Python"`. Are they identical?', answer: 'Yes, both represent the identical string `It\'s Python` (length 10)',
                  options: ['Yes, both represent the identical string `It\'s Python` (length 10)', 'one uses escape sequence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' }
          ],
            remediations: { 'students-consistently-treat-the-first': { steps: ['**Concrete mapping**: Write a string on paper: `A B C D E`.', 'Below each, write index: `0 1 2 3 4`.', 'Have student physically point: "Index 0 → A, Index 1 → B".', '**Boundary drill**: For string of length 5, list all valid indices (0-4) and invalid ones (-1, 5).'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first",.',
          parts: [
                { id: 'a', prompt: 'A student writes `msg = "Hello"; msg[0] = "J"` to change the first character to `J`. Python raises `TypeError: \'str\' object does not support item assignment`.', answer: 'The error is due to **string immutability**, not indexing syntax',
                  options: ['The error is due to **string immutability**, not indexing syntax', 'indexing doesn\'t work for assignment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' },
                { id: 'b', prompt: 'Compare the two string creations: `s1 = \'It\\\'s Python\'` and `s2 = "It\'s Python"`. Are they identical?', answer: 'Yes, both represent the identical string `It\'s Python` (length 10)',
                  options: ['Yes, both represent the identical string `It\'s Python` (length 10)', 'one uses escape sequence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat the first character as index 1 (1-based) because that matches natural language ("first", "second").' }
          ],
            remediations: { 'students-consistently-treat-the-first': { steps: ['**Concrete mapping**: Write a string on paper: `A B C D E`.', 'Below each, write index: `0 1 2 3 4`.', 'Have student physically point: "Index 0 → A, Index 1 → B".', '**Boundary drill**: For string of length 5, list all valid indices (0-4) and invalid ones (-1, 5).'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_003', difficulty: 'standard',
          question: 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a.',
          hint: 'Revisit "Creating and Accessing Strings: Indexing" (c11_cs_cbse_06_002) and practice.',
          misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices.',
          parts: [
                { id: 'a', prompt: 'What is the output of `text = "PYTHON"; print(text[1:4])`?', answer: 'The output is `YTH`',
                  options: ['The output is `YTH`', 'the stop index is inclusive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices reverse the.' },
                { id: 'b', prompt: 'Compare the results of `s[::2]` and `s[1::2]` for `s = "ABCDEFG"`. What pattern do they together represent?', answer: '`s[::2]` → `ACEG` (even indices: 0,2,4,6)',
                  options: ['`s[::2]` → `ACEG` (even indices: 0,2,4,6)', 'first half and second half'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices reverse the.' }
          ],
            remediations: { 'the-stop-index-in-slicing': { steps: ['Write a string on paper with both positive (0,1,2...) and negative (-1,-2,-3...) indices labeled above/below each.', 'Trace `s[1:4]` by placing a finger on index 1 and moving right, stopping **before** index 4; count characters touched.', 'Trace `s[-1:-4]` with default step: finger on -1, try to move right → cannot reach -4 → empty.', 'Trace `s[-1:-4:-1]`: finger on -1, move left (step -1) touching -1, -2, -3, stop before -4 → `NOH`.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices.',
          parts: [
                { id: 'a', prompt: 'Compare the results of `s[::2]` and `s[1::2]` for `s = "ABCDEFG"`. What pattern do they together represent?', answer: '`s[::2]` → `ACEG` (even indices: 0,2,4,6)',
                  options: ['`s[::2]` → `ACEG` (even indices: 0,2,4,6)', 'first half and second half'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the stop index in slicing is **inclusive** (like range in mathematics) and that negative indices reverse the.' }
          ],
            remediations: { 'the-stop-index-in-slicing': { steps: ['Write a string on paper with both positive (0,1,2...) and negative (-1,-2,-3...) indices labeled above/below each.', 'Trace `s[1:4]` by placing a finger on index 1 and moving right, stopping **before** index 4; count characters touched.', 'Trace `s[-1:-4]` with default step: finger on -1, try to move right → cannot reach -4 → empty.', 'Trace `s[-1:-4:-1]`: finger on -1, move left (step -1) touching -1, -2, -3, stop before -4 → `NOH`.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_004', difficulty: 'standard',
          question: 'String concatenation is the operation of joining two or more strings end-to-end.',
          hint: 'If stuck, revisit creating strings (c11_cs_cbse_06_001) and indexing (c11_cs_cbse_06_002).',
          misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()`.',
          parts: [
                { id: 'a', prompt: 'What is the result of the expression `"Hello" + "World"` in Python?', answer: 'The result is `"HelloWorld"` (without a space)',
                  options: ['The result is `"HelloWorld"` (without a space)', 'Hello World', '`s = s + "x"` modifies the original string `s` in place, similar to how `list'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()` modifies a list.' },
                { id: 'b', prompt: 'Explain in your own words what the expression `"Ab" * 3` evaluates to and why.', answer: 'It evaluates to `"AbAbAb"`',
                  options: ['It evaluates to `"AbAbAb"`', '` or `', '`s = s + "x"` modifies the original string `s` in place, similar to how `list'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()` modifies a list.' },
                { id: 'c', prompt: 'Given `s1 = "Py"` and `s2 = "thon"`, write a Python statement that creates the string `"Python"` using concatenation, and then write a statement that creates.', answer: 'Concatenation: `s1 + s2` gives `"Python"`',
                  options: ['Concatenation: `s1 + s2` gives `"Python"`', '`s = s + "x"` modifies the original string `s` in place, similar to how `list'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that `s = s + "x"` modifies the original string `s` in place, similar to how `list.append()` modifies a list.' }
          ],
            remediations: { 's-s-x-modifies-the': { steps: ['To fix this, have the student trace memory references: draw a box for the original string, then show that `s + "x"`.', 'Then demonstrate with `id(s)` before and after to prove the object identity changes.', 'Contrast with a list where `lst.append(\'x\')` keeps the same `id`.', 'Repeat with a loop that does `s = s + \'x\'` vs `s += \'x\'` (which is the same) to reinforce that reassignment is.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_008', difficulty: 'standard',
          question: 'A list in Python is an ordered, mutable collection of elements enclosed in.',
          hint: 'Revisit c11_cs_cbse_06_007 (Mutable vs Immutable) and c11_cs_cbse_06_002 (String.',
          misconception: 'Students often believe that because lists are "like arrays" in other languages, they must store elements of the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A list in Python is an ordered, mutable collection of elements enclosed in square',
                  options: ['A list in Python is an ordered, mutable collection of elements enclosed in square', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because lists are "like arrays" in other languages, they must store elements of the same type.' }
          ],
            remediations: { 'because-lists-are-like-arrays': { steps: ['Show the student the Python memory model: draw a list as a row of boxes (references) pointing to separate object.', 'Emphasise the box holds an *address*, not the value itself.', 'Run `type(marks[0])`, `type(marks[2])` in the shell to prove each element carries its own type.', 'Contrast with `array.array(\'i\', [1,2,3])` from the `array` module which *does* enforce homogeneous signed integers—this.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because lists are "like arrays" in other languages, they must store elements of the same.',
          parts: [
                { id: 'a', prompt: 'A teammate argues: "Since lists allow duplicates, using a list to store unique student roll numbers is a bad design choice." Evaluate this claim and defend.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'allows', 'requires', 'like arrays'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because lists are "like arrays" in other languages, they must store elements of the same type.' }
          ],
            remediations: { 'because-lists-are-like-arrays': { steps: ['Show the student the Python memory model: draw a list as a row of boxes (references) pointing to separate object.', 'Emphasise the box holds an *address*, not the value itself.', 'Run `type(marks[0])`, `type(marks[2])` in the shell to prove each element carries its own type.', 'Contrast with `array.array(\'i\', [1,2,3])` from the `array` module which *does* enforce homogeneous signed integers—this.'] } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_06_009', difficulty: 'standard',
          question: 'A list in Python is an ordered, mutable collection of elements enclosed in.',
          hint: 'Revisit c11_cs_cbse_06_008 (Introduction to Lists) and practice writing 5 different lists.',
          misconception: 'Students believe list indices represent the *ordinal position* (1st, 2nd, 3rd) rather than *offset from start*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A list in Python is an ordered, mutable collection of elements enclosed in square',
                  options: ['A list in Python is an ordered, mutable collection of elements enclosed in square', 'A string in Python is an immutable sequence of Unicode characters enclosed within single', 'A string in Python is an immutable ordered sequence of Unicode characters created by', 'String slicing in Python uses the syntax `str[start:stop:step]` to extract a substring'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe list indices represent the *ordinal position* (1st, 2nd, 3rd) rather than *offset from start*.' }
          ],
            remediations: { 'list-indices-represent-the-ordinal': { steps: ['Draw a number line on paper: mark positions 0,1,2,3 under list elements.', 'Write `fruits = ["apple", "banana", "cherry"]`.', 'Physically point: "0 steps → apple, 1 step → banana".', 'For negative: draw same line right-to-left with -1,-2,-3.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
