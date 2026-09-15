import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch02_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch02_p2: SimDef = {
    id: 'v3_c12_bs_ch02_p2',
    title: 'Principles of Management · Part 2/2',
    subtitle: 'Every carpenter has a method — Taylor asked which one is actually best.',
    classLevel: 12, subject: 'business_studies', topic: 'Principles of Management · Part 2/2',
    chapters: ['c12_bs_ch02'],
    nodeIds: ['c12_bs_cbse_02_007', 'c12_bs_cbse_02_008', 'c12_bs_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Management consultant', intro: 'Principles of management are the closest thing business has to physics — flexible, universal, and earned through practice.', goal: 'Describe the nature of management principles and apply Taylor\'s scientific management techniques.' },
    discovery: {
        question: 'In a Delhi furniture workshop, every carpenter cuts joints differently — output varies wildly and new hires can\'t be trained. What is Taylor\'s fix?',
        options: ['Replace rule-of-thumb with the scientifically determined \'one best way\' found through observation and measurement', 'Hire only experienced carpenters who already know the best method', 'Pay piece-rate wages so workers discover faster methods themselves', 'Rotate workers through all tasks until each finds a personal style'],
        answer: 'Replace rule-of-thumb with the scientifically determined \'one best way\' found through observation and measurement',
        hook: 'Tradition feels efficient because it\'s familiar — Taylor proved it\'s often just unmeasured. Scientific management studies the task itself; the \'one best way\' is discovered, not inherited.',
    },
    teaching: [
        { title: 'Fayol vs Taylor: Comparison of Contributions', text: 'Fayol vs Taylor comparison is the systematic analysis of differences between Henri Fayol\'s General Administrative Theory (top-level management perspective, 14 universal principles, experience-based).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rescue a struggling Surat textile unit: apply flexible management principles to its conflicts, then run Taylor\'s method on one chaotic task — measure, standardise, and find the one best way.',
        labels: ['Fayol vs Taylor: Comparison', 'Principles of Management: Significance', 'Fayol\'s Principles: Initiative, Esprit'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_007', title: 'Fayol vs Taylor: Comparison of Contributions',
          caseStudy: { intro: 'Imagine you\'re a consultant hired by a family-owned manufacturing firm in Gujarat that\'s struggling with both inefficient shop-floor operations AND poor.',
            decisions: [{ prompt: 'State the seven bases of difference between Fayol and Taylor as listed in the NCERT textbook, without looking at your notes.', options: [
                { text: 'The seven bases are: (1) Perspective', outcome: 'The seven bases are: (1) Perspective — Fayol: top-level management; Taylor: shop-floor level.' },
                { text: 'Unity of Command', outcome: 'Not quite — Students treat Fayol and Taylor as COMPETING alternatives ("choose one") rather than COMPLEMENTARY.', reveals: 'students-treat-fayol-and-taylor' },
                { text: 'Perspective', outcome: 'Not quite — Students treat Fayol and Taylor as COMPETING alternatives ("choose one") rather than COMPLEMENTARY.', reveals: 'students-treat-fayol-and-taylor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_008', title: 'Principles of Management: Significance and Limitations',
          caseStudy: { intro: 'Imagine you are appointed manager of a 50-person software startup where decisions are made on gut feeling — projects overrun, developers duplicate work, and.',
            decisions: [{ prompt: 'List the six significance points of principles of management as per NCERT.', options: [
                { text: 'The six significance points are: (1) Providing managers with useful insights into', outcome: 'The six significance points are: (1) Providing managers with useful insights into reality, (2).' },
                { text: 'Principles ensure optimum utilisation', outcome: 'Not quite — Students memorise the six significance points as a list but believe principles *guarantee* those.', reveals: 'students-memorise-the-six-significance' },
                { text: 'This error stems from ignoring NCERT\'s explicit statements', outcome: 'Not quite — Students memorise the six significance points as a list but believe principles *guarantee* those.', reveals: 'students-memorise-the-six-significance' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_009', title: 'Fayol\'s Principles: Initiative, Esprit de Corps and Centralisation-Decentralisation',
          caseStudy: { intro: 'Imagine you are the newly appointed manager of a mid-sized textile manufacturing unit in Surat employing 200 workers.',
            decisions: [{ prompt: 'State the exact meaning of \'Initiative\' as defined by Fayol, and give one example of an employee action that qualifies as initiative versus.', options: [
                { text: 'Correct answer: Initiative means "thinking out and executing a plan" with self-motivation', outcome: 'Correct answer: Initiative means "thinking out and executing a plan" with self-motivation within.' },
                { text: 'Initiative means employees can take decisions on their own', outcome: 'Not quite — Students consistently confuse \'Initiative\' with \'doing whatever you want\' and \'Esprit de Corps\'.', reveals: 'students-consistently-confuse-initiative-with' },
                { text: 'within the framework of organisational policies', outcome: 'Not quite — Students consistently confuse \'Initiative\' with \'doing whatever you want\' and \'Esprit de Corps\'.', reveals: 'students-consistently-confuse-initiative-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A marketing executive keeps getting campaign orders from the Marketing Head and conflicting budget orders from the Finance Head. Deadlines slip, and nobody is sure whose instruction wins.',
            decisions: [{ prompt: 'Which principle is broken and what follows?', options: [
                { text: 'Unity of Command — one subordinate should receive orders from only one superior; dual subordination creates confusion, delay and divided loyalty for the individual.', outcome: 'Distinct from Unity of Direction (one head, one plan for the whole organisation) — here the fix is a single reporting line, not a merged plan.' },
                { text: 'Unity of Direction — two heads means two plans, and that principle targets the individual employee.', outcome: 'That swaps the pair: Unity of Direction guards against overlapping plans at organisational level; the individual\'s double-boss problem is Unity of Command.', reveals: 'command-direction-swapped' },
                { text: 'Equity — the real violation is that the executive isn\'t being treated fairly.', outcome: 'Fairness isn\'t the structural issue; even two equally kind bosses producing contradictory orders still violate Unity of Command.', reveals: 'equity-fixes-dual-bosses' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_009', title: 'You made it',
          caseStudy: { intro: 'You now know principles are guidelines, not laws — and that Taylor turned management into measurement. Fayol vs Taylor framing and technique identification are core board marks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_007', difficulty: 'standard',
          question: 'Fayol vs Taylor comparison is the systematic analysis of differences between.',
          hint: 'If stuck, revisit c12_bs_cbse_02_002 and c12_bs_cbse_02_004 for Taylor/Fayol core.',
          misconception: 'Students treat Fayol and Taylor as COMPETING alternatives ("choose one") rather than COMPLEMENTARY layers (Taylor.',
          parts: [
                { id: 'a', prompt: 'State the seven bases of difference between Fayol and Taylor as listed in the NCERT textbook, without looking at your notes.', answer: 'The seven bases are: (1) Perspective',
                  options: ['The seven bases are: (1) Perspective', 'Unity of Command', 'Perspective'],
                  hint: 'If stuck, revisit c12_bs_cbse_02_002 and c12_bs_cbse_02_004 for Taylor/Fayol core principles, then.',
                  misconception: 'Students treat Fayol and Taylor as COMPETING alternatives ("choose one") rather than COMPLEMENTARY layers (Taylor = operational engine.' }
          ],
            remediations: { 'students-treat-fayol-and-taylor': { steps: ['If the student cannot articulate complementarity: Step 1 — Re-read the Bhasin Ltd case (NCERT p.66-68) where Part 6.', 'Step 2 — Map each Fayol violation (Unity of Command, Unity of Direction, Discipline, Initiative, Esprit de Corps).', 'Step 3 — Write one paragraph explaining HOW Taylor\'s shop-floor fixes ENABLE Fayol\'s administrative principles.', 'Step 4 — Re-attempt Diagnostic Q3 and Q6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_008', difficulty: 'standard',
          question: 'Principles of management are broad, general guidelines derived from managerial.',
          hint: 'Revisit c12_bs_cbse_02_001 sections on "Flexible" and "Contingent" — write two sentences.',
          misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.',
          parts: [
                { id: 'a', prompt: 'Why does NCERT describe principles of management as "general guidelines" rather than "ready-made solutions"? Give a concrete business example.', answer: 'Principles are general guidelines',
                  options: ['Principles are general guidelines', 'principles give exact solutions', 'Principles ensure optimum utilisation', 'This error stems from ignoring NCERT\'s explicit statements'],
                  hint: 'Revisit c12_bs_cbse_02_001 sections on "Flexible" and "Contingent" — write two sentences.',
                  misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.' },
                { id: 'b', prompt: 'A mid-sized textile firm gives the same annual bonus to all 200 workers regardless of individual or department performance.', answer: '"Scientific decisions" is violated',
                  options: ['"Scientific decisions" is violated', 'optimum utilisation', 'social responsibility', 'Principles ensure optimum utilisation'],
                  hint: 'Revisit c12_bs_cbse_02_001 sections on "Flexible" and "Contingent" — write two sentences.',
                  misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.' }
          ],
            remediations: { 'students-memorise-the-six-significance': { steps: ['Re-read node **c12_bs_cbse_02_001** (Nature of Principles) focusing on points (iv) Flexible, (vi) Cause-effect.', 'Take the Bhasin Limited case (NCERT Exercise Q6): identify which *nature* point explains each violation (e.g.', 'Write one paragraph: "Principles are a compass, not a map — they show direction but you must navigate the terrain.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.',
          parts: [
                { id: 'a', prompt: 'Critique: "Principles of management are less than perfect because they deal with human behaviour." Provide two arguments supporting and two challenging this.', answer: 'Supporting: (1) Human behaviour is unpredictable',
                  options: ['Supporting: (1) Human behaviour is unpredictable', 'Principles ensure optimum utilisation', 'This error stems from ignoring NCERT\'s explicit statements', 'accurate cause-effect relationships may be difficult to establish'],
                  hint: 'Revisit c12_bs_cbse_02_001 sections on "Flexible" and "Contingent" — write two sentences.',
                  misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.' }
          ],
            remediations: { 'students-memorise-the-six-significance': { steps: ['Re-read node **c12_bs_cbse_02_001** (Nature of Principles) focusing on points (iv) Flexible, (vi) Cause-effect.', 'Take the Bhasin Limited case (NCERT Exercise Q6): identify which *nature* point explains each violation (e.g.', 'Write one paragraph: "Principles are a compass, not a map — they show direction but you must navigate the terrain.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_009', difficulty: 'standard',
          question: 'Fayol\'s Principle of Initiative states that employees at all levels should.',
          hint: 'Revisit c12_bs_cbse_02_007 (Fayol vs Taylor comparison) to clarify the administrative vs.',
          misconception: 'Students consistently confuse \'Initiative\' with \'doing whatever you want\' and \'Esprit de Corps\' with \'being friendly.\'.',
          parts: [
                { id: 'a', prompt: 'A startup with 15 employees has the founder making all decisions: hiring, vendor selection, pricing, leave approvals.', answer: 'Correct answer: Fayol states "The degree of centralisation will depend upon the',
                  options: ['Correct answer: Fayol states "The degree of centralisation will depend upon the', 'Initiative means employees can take decisions on their own', 'within the framework of organisational policies', 'Esprit de Corps means good relations among employees'],
                  hint: 'Revisit c12_bs_cbse_02_007 (Fayol vs Taylor comparison) to clarify the administrative vs.',
                  misconception: 'Students consistently confuse \'Initiative\' with \'doing whatever you want\' and \'Esprit de Corps\' with \'being friendly.\' They write in exams.' }
          ],
            remediations: { 'students-consistently-confuse-initiative-with': { steps: ['If a student exhibits the above misconceptions: (1) Have them re-read the NCERT text on Initiative (page 60-61) and.', 'It is one of the traits of an intelligent person.', 'Initiative should be encouraged.', 'But it does not mean going against the established practices of the company for the sake of being different." (2) For.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
