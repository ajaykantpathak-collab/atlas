import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch02_p1: SimDef = {
    id: 'v3_c11_cs_ch02_p1',
    title: 'Boolean Logic and Logic Gates · Part 1/3',
    subtitle: 'Map real-world and/or decisions onto Boolean variables that only know 0 and 1.',
    classLevel: 11, subject: 'computer_science', topic: 'Boolean Logic and Logic Gates · Part 1/3',
    chapters: ['c11_cs_ch02'],
    nodeIds: ['c11_cs_cbse_02_001', 'c11_cs_cbse_02_002', 'c11_cs_cbse_02_003', 'c11_cs_cbse_02_004', 'c11_cs_cbse_02_005', 'c11_cs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logic designer wiring a home security rule', intro: 'An alarm should fire only if the door opens AND the system is armed — turn that sentence into algebra.', goal: 'Represent two-state conditions as Boolean variables and combine them with AND, OR and NOT.' },
    discovery: {
        question: 'A logic expression reads 1 + 1. Arithmetic says 2, binary says 10 — what does a digital circuit say, and why?',
        options: ['1 — in Boolean algebra \'+\' means OR, and true-OR-true is true', '10 — circuits work in binary so it must carry', '2 — the symbol keeps its arithmetic meaning everywhere', '0 — two identical inputs cancel out'],
        answer: '1 — in Boolean algebra \'+\' means OR, and true-OR-true is true',
        hook: 'Same symbol, different algebra — in logic, \'+\' is a doorway (OR), not a sum.',
    },
    teaching: [
        { title: 'Introduction to Boolean Algebra', text: 'Boolean algebra is a mathematical system that deals with binary variables (having only two values: True/1 or False/0) and logical operations (AND, OR, NOT) to analyze, simplify, and design digital.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build truth tables for a smart light that needs motion AND night, and a phone that unlocks with fingerprint OR PIN.',
        labels: ['Introduction to Boolean Algebra', 'Boolean Variables and Truth', 'Basic Boolean Operations: AND,', 'Truth Tables for Basic', 'Boolean Expressions and Logic', 'Laws of Boolean Algebra'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_001', title: 'Introduction to Boolean Algebra',
          caseStudy: { intro: 'Imagine you are designing a simple security system for a room: the alarm should trigger ONLY if the door is opened AND the system is armed.',
            decisions: [{ prompt: 'What is the fundamental difference between Boolean algebra and the arithmetic algebra you studied in earlier classes?', options: [
                { text: 'Boolean algebra operates on binary variables (only two values: 0/1 or True/False) and', outcome: 'Boolean algebra operates on binary variables (only two values: 0/1 or True/False) and logical.' },
                { text: 'Boolean algebra uses only 0 and 1 but same operations', outcome: 'Not quite — Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they.', reveals: 'the-symbol-in-boolean-algebra' },
                { text: 'multiplication by zero', outcome: 'Not quite — Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they.', reveals: 'the-symbol-in-boolean-algebra' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_002', title: 'Boolean Variables and Truth Values',
          caseStudy: { intro: 'Imagine you are designing a smart home system: the light turns on ONLY if motion is detected AND it is nighttime.',
            decisions: [{ prompt: 'What are the only two possible truth values a Boolean variable can take, and what do they represent in a digital circuit?', options: [
                { text: 'The only two truth values are TRUE (1) and FALSE (0)', outcome: 'The only two truth values are TRUE (1) and FALSE (0). In a digital circuit, 1 represents a high.' },
                { text: 'TRUE, FALSE, and UNKNOWN', outcome: 'Not quite — Students often treat Boolean variables as numeric variables that can be added, subtracted,.', reveals: 'students-often-treat-boolean-variables' },
                { text: '1, 2, 3', outcome: 'Not quite — Students often treat Boolean variables as numeric variables that can be added, subtracted,.', reveals: 'students-often-treat-boolean-variables' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_003', title: 'Basic Boolean Operations: AND, OR, NOT',
          caseStudy: { intro: 'Imagine you are designing a security system for a locker that opens only when two conditions are met: a correct keycard is presented AND a valid PIN.',
            decisions: [{ prompt: 'What is the output of the Boolean expression (1 AND 0) OR (NOT 1)?', options: [
                { text: '0', outcome: 'The correct answer is 0. Step-by-step: 1 AND 0 = 0; NOT 1 = 0; 0 OR 0 = 0.' },
                { text: 'one or the other but not both', outcome: 'Not quite — Students often treat NOT as having lower precedence than AND/OR, evaluating expressions.', reveals: 'students-often-treat-not-as' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_02_006', title: 'Laws of Boolean Algebra: Commutative and Associative',
          scaffold: { problem: 'A security system uses three sensors A, B, C. The alarm triggers if (A OR B) OR C is true.',
            steps: [
            { text: 'Write the original expression: (A + B) + C.' },
            { text: 'Identify the law: Associative law for OR states (A + B) + C = A + (B + C).' },
            { text: 'Apply the law to regroup: A + (B + C).' },
            { text: 'Construct a truth table with columns A, B, C, (A+B), (A+B)+C, (B+C), A+(B+C).' },
            { text: 'Fill all 8 rows; observe that columns (A+B)+C and A+(B+C) are identical.' },
            { text: 'Conclude the two wiring schemes produce the same alarm output for every sensor combination.', faded: true, blankAnswer: 'The expressions are equivalent; both yield 1 if at least.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re designing the school lab\'s entry alarm: it should sound only when the door opens AND the alarm is armed. A teammate writes the rule as \'open + armed\', then computes \'if door open (1) and armed (1), output = 1+1 = 2 — wait, that can\'t be right, there\'s no 2 in a circuit.\'',
            decisions: [{ prompt: 'What\'s the correct reading of \'1 + 1\' here?', options: [
                { text: 'In Boolean algebra \'+\' means logical OR, not arithmetic addition: 1+1 = 1 (\'TRUE OR TRUE is TRUE\'). The alarm rule actually needs AND: Sound = Open · Armed. Variables are two-state truth values, not quantities — digital circuits are built from exactly these logical decisions.', outcome: 'Same symbols, different algebra: \'+\' is OR and \'·\' is AND; reading them as arithmetic breaks the whole circuit logic.' },
                { text: '1+1 = 10 in binary, so the output should just be read as binary 2.', outcome: 'That mixes binary arithmetic with Boolean logic; a Boolean variable holds only 0 or 1 — \'2\' is a category error, not an answer.', reveals: 'boolean-plus-is-addition' },
                { text: 'Write the alarm as Open OR Armed — any activity should trip it to be safe.', outcome: 'OR fires when the door opens while disarmed too — false alarms all day; the spec said BOTH conditions, which is AND.', reveals: 'and-or-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every decision a computer makes — from alarms to unlock screens — is just two-state variables and three little operations.',
            decisions: [{ prompt: 'What comes next? Boolean Logic and Logic Gates · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Boolean Logic and Logic Gates · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_001', difficulty: 'standard',
          question: 'Boolean algebra is a mathematical system that deals with binary variables.',
          hint: 'Revisit Class 7 algebra (variables/constants) and Class 8 exponents (powers of 2).',
          misconception: 'Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they write 1+1=10 (binary).',
          parts: [
                { id: 'a', prompt: 'Identify the binary (two-state) conditions in this scenario: "A smartphone unlocks if the fingerprint matches OR the correct PIN is entered." Assign Boolean.', answer: 'Conditions: Fingerprint match (F): 1=match, 0=no match',
                  options: ['Conditions: Fingerprint match (F): 1=match, 0=no match', 'incorrect', 'multiplication by zero', 'FALSE AND TRUE = FALSE'],
                  hint: 'Revisit Class 7 algebra (variables/constants) and Class 8 exponents (powers of 2) to reinforce.',
                  misconception: 'Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they write 1+1=10 (binary) or 1+1=2 (decimal).' },
                { id: 'b', prompt: 'Compare the role of Boolean algebra in digital circuit design with the role of calculus in mechanical engineering.', answer: 'Calculus models continuous change (voltage, velocity)',
                  options: ['Calculus models continuous change (voltage, velocity)', 'multiplication by zero', 'FALSE AND TRUE = FALSE'],
                  hint: 'Revisit Class 7 algebra (variables/constants) and Class 8 exponents (powers of 2) to reinforce.',
                  misconception: 'Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they write 1+1=10 (binary) or 1+1=2 (decimal).' }
          ],
            remediations: { 'the-symbol-in-boolean-algebra': { steps: ['Explicitly contrast the symbol table: Boolean \'+\' = OR, Boolean \'·\' = AND, Boolean \'¬\' or \'̅\' = NOT.', 'Use a truth table for OR (0+0=0, 0+1=1, 1+0=1, 1+1=1) and ask the student to explain each row in words ("FALSE OR FALSE.', 'Give a mixed exercise: "In which system does 1+1=10? In which does 1+1=1? In which does 1+1=2?"', 'Reinforce that Boolean algebra is about *truth values*, not *quantities*—so "1+1=1" means "TRUE OR TRUE = TRUE", which.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they write 1+1=10 (binary).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since modern computers use 64-bit processors, Boolean algebra is outdated and we should use 64-valued logic instead." Defend your.', answer: 'The claim is false',
                  options: ['The claim is false', '64-bit', 'multiplication by zero', 'FALSE AND TRUE = FALSE'],
                  hint: 'Revisit Class 7 algebra (variables/constants) and Class 8 exponents (powers of 2) to reinforce.',
                  misconception: 'Students often believe that the \'+\' symbol in Boolean algebra means arithmetic addition, so they write 1+1=10 (binary) or 1+1=2 (decimal).' }
          ],
            remediations: { 'the-symbol-in-boolean-algebra': { steps: ['Explicitly contrast the symbol table: Boolean \'+\' = OR, Boolean \'·\' = AND, Boolean \'¬\' or \'̅\' = NOT.', 'Use a truth table for OR (0+0=0, 0+1=1, 1+0=1, 1+1=1) and ask the student to explain each row in words ("FALSE OR FALSE.', 'Give a mixed exercise: "In which system does 1+1=10? In which does 1+1=1? In which does 1+1=2?"', 'Reinforce that Boolean algebra is about *truth values*, not *quantities*—so "1+1=1" means "TRUE OR TRUE = TRUE", which.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_002', difficulty: 'standard',
          question: 'A Boolean variable is a symbolic representation of a logical quantity that can.',
          hint: 'Revisit c11_cs_cbse_02_001 and practice identifying 5 real-world statements that are.',
          misconception: 'Students often treat Boolean variables as numeric variables that can be added, subtracted, or compared arithmetically.',
          parts: [
                { id: 'a', prompt: 'What are the only two possible truth values a Boolean variable can take, and what do they represent in a digital circuit?', answer: 'The only two truth values are TRUE (1) and FALSE (0)',
                  options: ['The only two truth values are TRUE (1) and FALSE (0)', 'TRUE, FALSE, and UNKNOWN', '1, 2, 3'],
                  hint: 'Revisit c11_cs_cbse_02_001 and practice identifying 5 real-world statements that are propositions.',
                  misconception: 'Students often treat Boolean variables as numeric variables that can be added, subtracted, or compared arithmetically (e.g., "A > B" or "A.' }
          ],
            remediations: { 'students-often-treat-boolean-variables': { steps: ['Explicitly contrast arithmetic vs. Boolean: write "1+1=2 (arithmetic)" and "1+1=1 (Boolean OR)" side by side.', 'Use a physical analogy — a light switch: flipping it on twice doesn\'t make it "more on."', 'Have the student define 3 daily-life yes/no decisions (e.g., "rained today?", "homework done?") and assign 0/1 for.', 'Ask: "If both are 1, is the sum 2?" Guide them to see that "both true" is still just "true" — the concept of \'degree.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_003', difficulty: 'standard',
          question: 'The three fundamental Boolean operations are AND (logical conjunction),.',
          hint: 'Review Boolean Variables and Truth Values (c11_cs_cbse_02_002) to reinforce the binary.',
          misconception: 'Students often treat NOT as having lower precedence than AND/OR, evaluating expressions left-to-right.',
          parts: [
                { id: 'a', prompt: 'A safety system for a machine requires two sensors (A and B) to both detect an obstacle (value 1) to stop the machine.', answer: 'The stop condition is A AND B',
                  options: ['The stop condition is A AND B', 'one or the other but not both'],
                  hint: 'Review Boolean Variables and Truth Values (c11_cs_cbse_02_002) to reinforce the binary nature.',
                  misconception: 'Students often treat NOT as having lower precedence than AND/OR, evaluating expressions left-to-right.' }
          ],
            remediations: { 'students-often-treat-not-as': { steps: ['If a student shows precedence confusion, have them rewrite the expression with explicit parentheses: NOT A AND.', 'Then evaluate step by step using a truth table for each sub-expression.', 'For XOR confusion, present a truth table for OR and XOR side by side, and ask them to identify the row where they.', 'Emphasize that Boolean OR is inclusive unless specified otherwise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_004', difficulty: 'standard',
          question: 'A truth table is a tabular representation that lists all possible combinations.',
          hint: 'Review the definitions and single-case evaluations of AND, OR, NOT in node.',
          misconception: 'Students often write the input combinations in **random order** (e.g., 00, 11, 01, 10) instead of the standard binary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A truth table is a tabular representation that lists all possible combinations of truth',
                  options: ['A truth table is a tabular representation that lists all possible combinations of truth', 'Boolean algebra is a mathematical system that deals with binary variables (having only', 'A Boolean variable is a symbolic representation of a logical quantity that can take', 'The three fundamental Boolean operations are AND (logical conjunction), OR (logical'],
                  hint: 'Review the definitions and single-case evaluations of AND, OR, NOT in node c11_cs_cbse_02_003.',
                  misconception: 'Students often write the input combinations in **random order** (e.g., 00, 11, 01, 10) instead of the standard binary counting order (00.' }
          ],
            remediations: { 'students-often-write-the-input': { steps: ['If a student writes rows in random order or misses combinations: 1.', '**Demonstrate the binary counting method**: "Write 0,1 in the rightmost column (B), alternating every row.', 'In the next column left (A), write 0,0,1,1 (alternating every two rows).', 'This guarantees all 2ⁿ combinations exactly once." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_005', difficulty: 'standard',
          question: 'A Boolean expression is a logical statement composed of Boolean variables.',
          hint: 'Revisit c11_cs_cbse_02_003 (Basic Boolean Operations) and c11_cs_cbse_02_004 (Truth.',
          misconception: 'Students believe that the order of gates in a circuit diagram (left-to-right) must match the written order of variables.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Boolean expression is a logical statement composed of Boolean variables (0/1),',
                  options: ['A Boolean expression is a logical statement composed of Boolean variables (0/1),', 'Boolean algebra is a mathematical system that deals with binary variables (having only', 'A Boolean variable is a symbolic representation of a logical quantity that can take', 'The three fundamental Boolean operations are AND (logical conjunction), OR (logical'],
                  hint: 'Revisit c11_cs_cbse_02_003 (Basic Boolean Operations) and c11_cs_cbse_02_004 (Truth Tables).',
                  misconception: 'Students believe that the order of gates in a circuit diagram (left-to-right) must match the written order of variables in the Boolean.' }
          ],
            remediations: { 'the-order-of-gates-in': { steps: ['Have the student write the expression with explicit parentheses showing precedence: A + (B·C).', 'Identify the "last operation" (outermost operator) — here, OR.', 'Draw that gate LAST (rightmost), with its output as circuit output.', 'For each input to that gate, recursively draw the sub-circuit that produces it — here, A is a direct input (wire), but.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_02_006', difficulty: 'standard',
          question: 'The Commutative Law states that the order of Boolean variables does not affect.',
          hint: 'Review truth tables for AND and OR (node c11_cs_cbse_02_004) and practice writing all 8.',
          misconception: 'Students often believe the Commutative and Associative laws apply to the NOT operation or to mixed expressions like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Commutative Law states that the order of Boolean variables does not affect the result',
                  options: ['The Commutative Law states that the order of Boolean variables does not affect the result', 'Boolean algebra is a mathematical system that deals with binary variables (having only', 'A Boolean variable is a symbolic representation of a logical quantity that can take', 'The three fundamental Boolean operations are AND (logical conjunction), OR (logical'],
                  hint: 'Review truth tables for AND and OR (node c11_cs_cbse_02_004) and practice writing all 8 rows for.',
                  misconception: 'Students often believe the Commutative and Associative laws apply to the NOT operation or to mixed expressions like A + (B · C).' }
          ],
            remediations: { 'the-commutative-and-associative-laws': { steps: ['Have the student build truth tables for NOT A and NOT B side by side and ask: "Where are the two operands to swap?".', 'Give a mixed expression A + (B · C) and ask them to test regrouping by evaluating all 8 rows; they will see (A + B) ·.', 'Drill: "Same operator, same level" – only when all operators are identical (all + or all ·) can you freely regroup.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
