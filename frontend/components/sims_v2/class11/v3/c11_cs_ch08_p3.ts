import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch08_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch08_p3: SimDef = {
    id: 'v3_c11_cs_ch08_p3',
    title: 'Functions in Python · Part 3/3',
    subtitle: 'Package logic into named, reusable blocks — and learn why defining runs nothing.',
    classLevel: 11, subject: 'computer_science', topic: 'Functions in Python · Part 3/3',
    chapters: ['c11_cs_ch08'],
    nodeIds: ['c11_cs_cbse_08_013', 'c11_cs_cbse_08_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a programmer modularising a library system', intro: 'Three teammates, three features, one duplicated check. Refactor it into a function they can all call.', goal: 'Define and call functions with parameters, and explain reusability and maintainability.' },
    discovery: {
        question: 'A module loads, reaching a def block that contains a print — yet nothing appears on screen. Is the code broken?',
        options: ['No — def only stores the recipe; nothing inside runs until the function is called', 'Yes — print inside a function always runs at load', 'No — but only because print is ignored inside functions', 'Yes — the colon after the parameter list was missing'],
        answer: 'No — def only stores the recipe; nothing inside runs until the function is called',
        hook: 'Definition is a stored recipe, not a cooked meal — Python reads the def, shelves it, and waits for a call.',
    },
    teaching: [
        { title: 'Modules in Python: import and from-import', text: 'A module in Python is a file containing Python definitions and statements (functions, variables, classes) that can be reused in other programs; the `import` statement loads the entire module into its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write calculate_fine(days_late, rate) for a library, then give two teammates a shared book_exists() helper instead of duplicated checks.',
        labels: ['Modules in Python: import', 'Creating and Using User-Defined'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_013', title: 'Modules in Python: import and from-import',
          caseStudy: { intro: 'Imagine you are building a GST calculator for a shopkeeper and need to compute square roots for distance calculations and random numbers for generating OTPs.',
            decisions: [{ prompt: 'What is the output of the following code snippet? ```python import math print(math.pi) from math import pi print(pi) ```', options: [
                { text: 'The code prints `3.141592653589793` twice', outcome: 'The code prints `3.141592653589793` twice. The first `import math` loads the module; `math.pi`.' },
                { text: 'importing names from a module', outcome: 'Not quite — Students believe `from math import *` imports the module `math` so they can later write.', reveals: 'from-math-import-imports-the' },
                { text: 'importing the module', outcome: 'Not quite — Students believe `from math import *` imports the module `math` so they can later write.', reveals: 'from-math-import-imports-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_014', title: 'Creating and Using User-Defined Modules',
          caseStudy: { intro: 'Imagine you have written a set of functions to calculate GST, discounts, and final prices for a shop billing system.',
            decisions: [{ prompt: 'What is the file extension required for a Python user-defined module, and what statement is used to make its contents available in another.', options: [
                { text: 'The file must have a `.py` extension, and the `import` statement (or `from', outcome: 'The file must have a `.py` extension, and the `import` statement (or `from ...' },
                { text: '`.txt` or `.ipynb`, or suggesting `include` or `require`', outcome: 'Not quite — Students often believe that importing a module multiple times re-executes the module\'s top-level.', reveals: 'importing-a-module-multiple-times' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You inherit a 90-line Python program for the school library — it reads a member\'s details, validates the card ID format, computes the fine, and prints a receipt, all in one flat sequence. Nothing is duplicated, so a teammate says: \'No point adding functions — functions are only for avoiding copy-paste.\'',
            decisions: [{ prompt: 'Is he right that functions would add nothing here?', options: [
                { text: 'No — functions package meaning, not just repetition: validate_card(), compute_fine() and print_receipt() each become named, testable units even if called once. The 90-line blob becomes a readable pipeline, bugs get isolated to one unit, and a rule change (new fine rate) edits one function.', outcome: 'Abstraction and maintainability are the primary wins of functions; deduplication is only the most visible one.' },
                { text: 'He\'s right — with no repeated code, functions would just add boilerplate.', outcome: 'That equates functions with copy-paste avoidance; a flat sequence that does five jobs still hides intent, resists testing, and makes every change risky.', reveals: 'functions-only-for-duplication' },
                { text: 'Split it — but only into functions that get called at least twice.', outcome: 'Call count isn\'t the criterion; a conceptual unit (validation, computation, output) deserves its own function even at one call site.', reveals: 'single-use-functions-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_08_014', title: 'You made it',
          caseStudy: { intro: 'Functions aren\'t just copy-paste insurance — they\'re named decisions you can call, test and fix in one place.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_013', difficulty: 'standard',
          question: 'A module in Python is a file containing Python definitions and statements.',
          hint: 'Revisit c11_cs_cbse_08_003 (Calling a Function) and c11_cs_cbse_08_008 (Scope.',
          misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.',
          parts: [
                { id: 'a', prompt: 'What is the output of the following code snippet? ```python import math print(math.pi) from math import pi print(pi) ```', answer: 'The code prints `3.141592653589793` twice',
                  options: ['The code prints `3.141592653589793` twice', 'importing names from a module', 'importing the module', '`from-import` does not actually bind the name or that the two imports conflict'],
                  hint: 'Revisit c11_cs_cbse_08_003 (Calling a Function) and c11_cs_cbse_08_008 (Scope of Variables).',
                  misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.' },
                { id: 'b', prompt: 'You are writing a program that uses `sqrt` from `math` and a user-defined function also named `sqrt` in the same file.', answer: 'Use `import math` and call `math.sqrt()`',
                  options: ['Use `import math` and call `math.sqrt()`', 'importing names from a module', 'importing the module', 'convenience outweighs namespace safety'],
                  hint: 'Revisit c11_cs_cbse_08_003 (Calling a Function) and c11_cs_cbse_08_008 (Scope of Variables).',
                  misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.' },
                { id: 'c', prompt: 'Compare the memory and startup-time implications of `import math` versus `from math import *` in a long-running server process that only uses `math.sqrt` and.', answer: '`import math` is preferable',
                  options: ['`import math` is preferable', 'it only loads what you need', 'importing names from a module', 'importing the module'],
                  hint: 'Revisit c11_cs_cbse_08_003 (Calling a Function) and c11_cs_cbse_08_008 (Scope of Variables).',
                  misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.' }
          ],
            remediations: { 'from-math-import-imports-the': { steps: ['Ask the student to run `import math; print(dir())` and `from math import *; print(dir())` side-by-side in a fresh.', 'Point out that the first adds `\'math\'` to the global names list, the second adds `\'sqrt\'`, `\'pi\'`, etc.', 'Have them write a 3-line rule card: "`import X` → brings X; `from X import Y` → brings Y only; `from X import *` →.', 'Practice: give them 5 code snippets where they must predict `NameError` vs success before running.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.',
          parts: [
                { id: 'a', prompt: 'A student writes: ```python import random as r from random import randint print(r.randint(1, 6)) print(randint(1, 6)) ``` Critique this code: is it redundant.', answer: 'It is redundant but not erroneous',
                  options: ['It is redundant but not erroneous', 'erroneous', 'importing names from a module', 'importing the module'],
                  hint: 'Revisit c11_cs_cbse_08_003 (Calling a Function) and c11_cs_cbse_08_008 (Scope of Variables).',
                  misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.' },
                { id: 'b', prompt: 'Design a tiny "module demo" script that proves to a classmate that `from module import name` does NOT import the module object itself.', answer: '```python',
                  options: ['```python', 'importing names from a module', 'importing the module', '`from math import *` imports the module `math` so they can later write `math'],
                  hint: 'Revisit c11_cs_cbse_08_003 (Calling a Function) and c11_cs_cbse_08_008 (Scope of Variables).',
                  misconception: 'Students believe `from math import *` imports the module `math` so they can later write `math.sqrt()`.' }
          ],
            remediations: { 'from-math-import-imports-the': { steps: ['Ask the student to run `import math; print(dir())` and `from math import *; print(dir())` side-by-side in a fresh.', 'Point out that the first adds `\'math\'` to the global names list, the second adds `\'sqrt\'`, `\'pi\'`, etc.', 'Have them write a 3-line rule card: "`import X` → brings X; `from X import Y` → brings Y only; `from X import *` →.', 'Practice: give them 5 code snippets where they must predict `NameError` vs success before running.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_08_014', difficulty: 'standard',
          question: 'A user-defined module is a Python file (with a .py extension) containing.',
          hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and the import statement.',
          misconception: 'Students often believe that importing a module multiple times re-executes the module\'s top-level code each time.',
          parts: [
                { id: 'a', prompt: 'What is the file extension required for a Python user-defined module, and what statement is used to make its contents available in another script?', answer: 'The file must have a `.py` extension, and the `import` statement (or `from',
                  options: ['The file must have a `.py` extension, and the `import` statement (or `from', '`.txt` or `.ipynb`, or suggesting `include` or `require`'],
                  hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and the import statement.',
                  misconception: 'Students often believe that importing a module multiple times re-executes the module\'s top-level code each time.' },
                { id: 'b', prompt: 'Compare the namespace behavior of `import math_utils` versus `from math_utils import *`.', answer: '`import math_utils` keeps functions in the `math_utils` namespace (accessed as',
                  options: ['`import math_utils` keeps functions in the `math_utils` namespace (accessed as', 'both keep separate namespaces'],
                  hint: 'If stuck, revisit function definition (c11_cs_cbse_08_002) and the import statement.',
                  misconception: 'Students often believe that importing a module multiple times re-executes the module\'s top-level code each time.' }
          ],
            remediations: { 'importing-a-module-multiple-times': { steps: ['Show the student `import sys; print(sys.modules.keys())` before and after importing their module twice to prove the.', 'Have them add a top-level `print("Module loaded")` in their module, then import it twice in a script; they will see the.', 'Demonstrate that `from mymod import func` and `import mymod; func = mymod.func` both refer to the same function object.', 'Explain that to reset state, they must explicitly reload with `importlib.reload(mymod)` or redesign to use.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
