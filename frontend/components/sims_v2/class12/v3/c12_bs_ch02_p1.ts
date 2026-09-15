import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch02_p1: SimDef = {
    id: 'v3_c12_bs_ch02_p1',
    title: 'Principles of Management · Part 1/2',
    subtitle: 'Every carpenter has a method — Taylor asked which one is actually best.',
    classLevel: 12, subject: 'business_studies', topic: 'Principles of Management · Part 1/2',
    chapters: ['c12_bs_ch02'],
    nodeIds: ['c12_bs_cbse_02_001', 'c12_bs_cbse_02_002', 'c12_bs_cbse_02_003', 'c12_bs_cbse_02_004', 'c12_bs_cbse_02_005', 'c12_bs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Management consultant', intro: 'Principles of management are the closest thing business has to physics — flexible, universal, and earned through practice.', goal: 'Describe the nature of management principles and apply Taylor\'s scientific management techniques.' },
    discovery: {
        question: 'In a Delhi furniture workshop, every carpenter cuts joints differently — output varies wildly and new hires can\'t be trained. What is Taylor\'s fix?',
        options: ['Replace rule-of-thumb with the scientifically determined \'one best way\' found through observation and measurement', 'Hire only experienced carpenters who already know the best method', 'Pay piece-rate wages so workers discover faster methods themselves', 'Rotate workers through all tasks until each finds a personal style'],
        answer: 'Replace rule-of-thumb with the scientifically determined \'one best way\' found through observation and measurement',
        hook: 'Tradition feels efficient because it\'s familiar — Taylor proved it\'s often just unmeasured. Scientific management studies the task itself; the \'one best way\' is discovered, not inherited.',
    },
    teaching: [
        { title: 'Principles of Management: Meaning, Nature and Significance', text: 'Principles of management are broad, general guidelines derived from practice and experimentation that help managers make decisions and take actions in organisational settings; they are flexible.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rescue a struggling Surat textile unit: apply flexible management principles to its conflicts, then run Taylor\'s method on one chaotic task — measure, standardise, and find the one best way.',
        labels: ['Principles of Management: Meaning,', 'Taylor\'s Scientific Management: Principles', 'Taylor\'s Techniques: Time Study,', 'Fayol\'s Principles of Management', 'Fayol\'s Principles: Unity', 'Fayol\'s Principles: Subordination'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_001', title: 'Principles of Management: Meaning, Nature and Significance',
          caseStudy: { intro: 'Imagine you are the new manager of a struggling family-owned textile unit in Surat with 50 workers, frequent conflicts, and declining output.',
            decisions: [{ prompt: 'State the exact NCERT definition of \'principles of management\' and give one example of a managerial decision where two different principles.', options: [
                { text: 'Correct answer: "A managerial principle is a broad and general guideline for', outcome: 'Correct answer: "A managerial principle is a broad and general guideline for decision-making and.' },
                { text: 'principles are rigid rules like laws of physics', outcome: 'Not quite — Students often memorise the 7 nature points and 6 significance points as isolated lists, but.', reveals: 'students-often-memorise-the-7' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_002', title: 'Taylor\'s Scientific Management: Principles and Techniques',
          caseStudy: { intro: 'Imagine you are the manager of a small furniture workshop in Delhi.',
            decisions: [{ prompt: 'State Taylor\'s definition of Scientific Management as "knowing exactly what you want men to do and seeing that they do it in the best and.', options: [
                { text: 'The two key elements are: (1) **Standardization of work**', outcome: 'The two key elements are: (1) **Standardization of work** — "knowing exactly what you want men.' },
                { text: 'telling workers what to do', outcome: 'Not quite — Students often equate "Scientific Management" with **only** time-and-motion studies or the.', reveals: 'students-often-equate-scientific-management' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_003', title: 'Taylor\'s Techniques: Time Study, Motion Study and Functional Foremanship',
          caseStudy: { intro: 'Imagine you are the production manager of a bicycle factory in Ludhiana where workers assemble 50 frames per shift but frequently complain of back pain, argue.',
            decisions: [{ prompt: 'What is the primary objective of Time Study according to Taylor?', options: [
                { text: 'The primary objective of Time Study is to determine the standard time required for a', outcome: 'The primary objective of Time Study is to determine the standard time required for a qualified.' },
                { text: 'to monitor workers continuously', outcome: 'Not quite — Students often treat each technique as a standalone "tool" — e.g., "Time Study means using.', reveals: 'students-often-treat-each-technique' },
                { text: 'to speed up production at any cost', outcome: 'Not quite — Students often treat each technique as a standalone "tool" — e.g., "Time Study means using.', reveals: 'students-often-treat-each-technique' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_004', title: 'Fayol\'s Principles of Management: Division of Work and Unity of Command',
          caseStudy: { intro: 'Imagine you are the manager of a busy hospital emergency ward.',
            decisions: [{ prompt: 'State Fayol\'s definition of Division of Work and the exact phrase he uses to describe its intent.', options: [
                { text: 'Correct answer: "Work is divided into small tasks/jobs', outcome: 'Correct answer: "Work is divided into small tasks/jobs. A trained specialist who is competent.' },
                { text: 'A wrong answer that omits', outcome: 'Not quite — Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one.', reveals: 'students-confuse-unity-of-command' },
                { text: 'more and better work for the same effort', outcome: 'Not quite — Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one.', reveals: 'students-confuse-unity-of-command' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_005', title: 'Fayol\'s Principles: Unity of Direction, Order and Equity',
          caseStudy: { intro: 'Imagine you are the newly appointed manager of a mid-sized Indian textile firm with three separate units: spinning, weaving, and dyeing.',
            decisions: [{ prompt: 'State the exact wording of Fayol’s principle of Unity of Direction as given in the NCERT textbook.', options: [
                { text: 'Correct answer: "All the units of an organisation should be moving towards the same', outcome: 'Correct answer: "All the units of an organisation should be moving towards the same objectives.' },
                { text: 'A wrong answer that mentions', outcome: 'Not quite — Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means.', reveals: 'students-often-confuse-unity-of' },
                { text: 'Unity of Direction means each employee should have only one boss', outcome: 'Not quite — Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means.', reveals: 'students-often-confuse-unity-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_006', title: 'Fayol\'s Principles: Subordination of Individual Interest, Remuneration and Stability',
          caseStudy: { intro: 'Imagine you are the HR manager of a mid-sized Indian tech startup where a senior developer demands a 40% salary hike threatening to quit, while the company.',
            decisions: [{ prompt: 'State Fayol\'s principle of \'Subordination of Individual Interest to General Interest\' in your own words.', options: [
                { text: 'Correct answer: The principle states that the interests of the organization as a whole', outcome: 'Correct answer: The principle states that the interests of the organization as a whole must take.' },
                { text: 'employees should always sacrifice their personal goals for the company', outcome: 'Not quite — Students often think "Subordination of Individual Interest" means employees must blindly obey and.', reveals: 'subordination-of-individual-interest-means' },
                { text: 'Subordination of Individual Interest', outcome: 'Not quite — Students often think "Subordination of Individual Interest" means employees must blindly obey and.', reveals: 'subordination-of-individual-interest-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A marketing executive keeps getting campaign orders from the Marketing Head and conflicting budget orders from the Finance Head. Deadlines slip, and nobody is sure whose instruction wins.',
            decisions: [{ prompt: 'Which principle is broken and what follows?', options: [
                { text: 'Unity of Command — one subordinate should receive orders from only one superior; dual subordination creates confusion, delay and divided loyalty for the individual.', outcome: 'Distinct from Unity of Direction (one head, one plan for the whole organisation) — here the fix is a single reporting line, not a merged plan.' },
                { text: 'Unity of Direction — two heads means two plans, and that principle targets the individual employee.', outcome: 'That swaps the pair: Unity of Direction guards against overlapping plans at organisational level; the individual\'s double-boss problem is Unity of Command.', reveals: 'command-direction-swapped' },
                { text: 'Equity — the real violation is that the executive isn\'t being treated fairly.', outcome: 'Fairness isn\'t the structural issue; even two equally kind bosses producing contradictory orders still violate Unity of Command.', reveals: 'equity-fixes-dual-bosses' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now know principles are guidelines, not laws — and that Taylor turned management into measurement. Fayol vs Taylor framing and technique identification are core board marks.',
            decisions: [{ prompt: 'What comes next? Principles of Management · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Principles of Management · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_001', difficulty: 'standard',
          question: 'Principles of management are broad, general guidelines derived from practice.',
          hint: 'If stuck, revisit Class 11 Chapter 1 \'Nature and Significance of Management\'.',
          misconception: 'Students often memorise the 7 nature points and 6 significance points as isolated lists, but in board exams they fail.',
          parts: [
                { id: 'a', prompt: 'State the exact NCERT definition of \'principles of management\' and give one example of a managerial decision where two different principles could lead.', answer: 'Correct answer: "A managerial principle is a broad and general guideline for',
                  options: ['Correct answer: "A managerial principle is a broad and general guideline for', 'principles are rigid rules like laws of physics'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 \'Nature and Significance of Management\' (specifically the.',
                  misconception: 'Students often memorise the 7 nature points and 6 significance points as isolated lists, but in board exams they fail to apply them to.' }
          ],
            remediations: { 'students-often-memorise-the-7': { steps: ['Re-read the NCERT \'Nature\' and \'Significance\' subsections aloud, highlighting the verbs: \'apply\', \'guide\', \'establish\'.', 'For each of the 7 nature points, write a one-line *application* in a school club context (e.g., \'Flexible: Club.', 'Take the Bhasin Ltd case (NCERT p.66) and map each problem to a violated principle + its nature/significance link.', 'Re-attempt Diagnostic Questions 2, 4, 5 with this case-mapping lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_002', difficulty: 'standard',
          question: 'Taylor\'s Scientific Management is a systematic approach to improving industrial.',
          hint: 'Revisit c12_bs_cbse_02_001 sections "Nature of Principles of Management" (points i–vii).',
          misconception: 'Students often equate "Scientific Management" with **only** time-and-motion studies or the differential piece-rate.',
          parts: [
                { id: 'a', prompt: 'State Taylor\'s definition of Scientific Management as "knowing exactly what you want men to do and seeing that they do it in the best and cheapest way." What.', answer: 'The two key elements are: (1) **Standardization of work**',
                  options: ['The two key elements are: (1) **Standardization of work**', 'telling workers what to do'],
                  hint: 'Revisit c12_bs_cbse_02_001 sections "Nature of Principles of Management" (points i–vii) and.',
                  misconception: 'Students often equate "Scientific Management" with **only** time-and-motion studies or the differential piece-rate system, treating Taylor.' },
                { id: 'b', prompt: 'In a textile mill, workers resist a new scientifically determined weaving method because they fear it will lead to job losses.', answer: 'The violated principles are: (1) **Harmony, Not Discord**',
                  options: ['The violated principles are: (1) **Harmony, Not Discord**', 'Science not Rule of Thumb'],
                  hint: 'Revisit c12_bs_cbse_02_001 sections "Nature of Principles of Management" (points i–vii) and.',
                  misconception: 'Students often equate "Scientific Management" with **only** time-and-motion studies or the differential piece-rate system, treating Taylor.' }
          ],
            remediations: { 'students-often-equate-scientific-management': { steps: ['If a student conflates principles with techniques or views Taylor as purely mechanistic: 1.', '**Re-read** the NCERT sections "Principles of Scientific Management" (pp.', '43–47) and "Mental Revolution" (p.', '51) — highlight every phrase about *mutual* prosperity, *cooperation*, and *development*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_003', difficulty: 'standard',
          question: 'Taylor\'s Techniques of Scientific Management are specific, standardized.',
          hint: 'Revisit node c12_bs_cbse_02_002 and focus on the "Science not Rule of Thumb" principle.',
          misconception: 'Students often treat each technique as a standalone "tool" — e.g., "Time Study means using a stopwatch" or "Functional.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Taylor\'s Techniques of Scientific Management are specific, standardized procedures',
                  options: ['Taylor\'s Techniques of Scientific Management are specific, standardized procedures', 'Principles of management are broad, general guidelines derived from practice and', 'Taylor\'s Scientific Management is a systematic approach to improving industrial', 'Division of Work states that work should be divided into small, specialised tasks, each'],
                  hint: 'Revisit node c12_bs_cbse_02_002 and focus on the "Science not Rule of Thumb" principle — understand.',
                  misconception: 'Students often treat each technique as a standalone "tool" — e.g., "Time Study means using a stopwatch" or "Functional Foremanship means.' }
          ],
            remediations: { 'students-often-treat-each-technique': { steps: ['Re-read the NCERT paragraphs on Motion Study and Time Study side by side.', 'Draw a flowchart: Method Study → Motion Study → Time Study → Fatigue Study → Standardisation → Functional Foremanship →.', 'For each arrow, write one sentence on what passes forward (e.g., "Motion Study passes the *reduced motion sequence*.', 'Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_004', difficulty: 'standard',
          question: 'Division of Work states that work should be divided into small, specialised.',
          hint: 'If stuck on Unity of Command vs Unity of Direction: revisit c12_bs_cbse_02_001 (Nature.',
          misconception: 'Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one head, one plan per group.',
          parts: [
                { id: 'a', prompt: 'State Fayol\'s definition of Division of Work and the exact phrase he uses to describe its intent.', answer: 'Correct answer: "Work is divided into small tasks/jobs',
                  options: ['Correct answer: "Work is divided into small tasks/jobs', 'A wrong answer that omits', 'more and better work for the same effort', 'work is divided'],
                  hint: 'If stuck on Unity of Command vs Unity of Direction: revisit c12_bs_cbse_02_001 (Nature.',
                  misconception: 'Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one head, one plan per group of activities).' },
                { id: 'b', prompt: 'A software company assigns each developer to handle front-end, back-end, database, and testing for a single feature.', answer: 'Correct answer: This violates Division of Work',
                  options: ['Correct answer: This violates Division of Work', 'jack-of-all-trades', 'more and better work for the same effort', 'work is divided among developers'],
                  hint: 'If stuck on Unity of Command vs Unity of Direction: revisit c12_bs_cbse_02_001 (Nature.',
                  misconception: 'Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one head, one plan per group of activities).' },
                { id: 'c', prompt: 'In a manufacturing firm, the Production Manager instructs a machine operator to increase output speed, while the Quality Control Manager (same hierarchical.', answer: 'Correct answer: 1',
                  options: ['Correct answer: 1', 'better communication between the two managers'],
                  hint: 'If stuck on Unity of Command vs Unity of Direction: revisit c12_bs_cbse_02_001 (Nature.',
                  misconception: 'Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one head, one plan per group of activities).' }
          ],
            remediations: { 'students-confuse-unity-of-command': { steps: ['Have the student draw two side-by-side org charts: one with Unity of Command violated (employee with two arrows from.', 'Ask: "Which principle fixes which chart?" 3.', 'For Division of Work: Give a list of 10 bakery tasks (kneading, baking, icing, packaging, cashiering, cleaning.', 'Ask student to group into 4 specialised roles.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one head, one plan per group.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Unity of Command is outdated in modern matrix organisations where employees report to both a functional manager and a project.', answer: 'Correct answer: The statement is flawed',
                  options: ['Correct answer: The statement is flawed', 'one boss total', 'one boss per accountability dimension', 'Fayol is old, matrix is new, so discard'],
                  hint: 'If stuck on Unity of Command vs Unity of Direction: revisit c12_bs_cbse_02_001 (Nature.',
                  misconception: 'Students confuse **Unity of Command** (one boss per employee) with **Unity of Direction** (one head, one plan per group of activities).' }
          ],
            remediations: { 'students-confuse-unity-of-command': { steps: ['Have the student draw two side-by-side org charts: one with Unity of Command violated (employee with two arrows from.', 'Ask: "Which principle fixes which chart?" 3.', 'For Division of Work: Give a list of 10 bakery tasks (kneading, baking, icing, packaging, cashiering, cleaning.', 'Ask student to group into 4 specialised roles.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_005', difficulty: 'standard',
          question: 'Unity of Direction states that each group of activities having the same.',
          hint: 'Revisit c12_bs_cbse_02_001 (Nature of Principles of Management) and c12_bs_cbse_02_004.',
          misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should.',
          parts: [
                { id: 'a', prompt: 'A company has two divisions — one manufacturing electric scooters and another manufacturing electric bicycles.', answer: 'Correct answer: This illustrates Unity of Direction',
                  options: ['Correct answer: This illustrates Unity of Direction', 'it shows Unity of Command', 'Unity of Direction means each employee should have only one boss'],
                  hint: 'Revisit c12_bs_cbse_02_001 (Nature of Principles of Management) and c12_bs_cbse_02_004 (Division.',
                  misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should have only one boss".' },
                { id: 'b', prompt: 'In a hospital, the radiology department stores X-ray films in three different cabinets across two floors without a labelling system.', answer: 'Correct answer (4-step plan): 1',
                  options: ['Correct answer (4-step plan): 1', 'put all films in one room', 'Unity of Direction means each employee should have only one boss'],
                  hint: 'Revisit c12_bs_cbse_02_001 (Nature of Principles of Management) and c12_bs_cbse_02_004 (Division.',
                  misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should have only one boss".' }
          ],
            remediations: { 'students-often-confuse-unity-of': { steps: ['If a student confuses Unity of Direction with Unity of Command, have them draw two side-by-side diagrams: (1) an org.', 'Ask them to label the "head" and "plan" in each.', 'For Order, give them a messy warehouse sketch and ask them to design a grid-based zoning plan with coordinates for each.', 'For Equity, present a mini-case with three employees of different genders/regions but identical output receiving.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_006', difficulty: 'standard',
          question: 'Fayol\'s principles of Subordination of Individual Interest to General Interest.',
          hint: 'Revisit c12_bs_cbse_02_001, specifically the "Nature of Principles of Management" section.',
          misconception: 'Students often think "Subordination of Individual Interest" means employees must blindly obey and never voice personal.',
          parts: [
                { id: 'a', prompt: 'A company pays its workers the minimum legal wage while the CEO takes a large bonus. The workers argue this violates Fayol\'s principle of remuneration.', answer: 'Correct answer: Yes, the argument is valid',
                  options: ['Correct answer: Yes, the argument is valid', 'it\'s legal so it\'s fine', 'Subordination of Individual Interest'],
                  hint: 'Revisit c12_bs_cbse_02_001, specifically the "Nature of Principles of Management" section (points.',
                  misconception: 'Students often think "Subordination of Individual Interest" means employees must blindly obey and never voice personal needs.' }
          ],
            remediations: { 'subordination-of-individual-interest-means': { steps: ['If a student exhibits this misconception, do NOT simply re-read the definition.', 'Instead: 1) Have them read the NCERT box on "Shri Mahila Griha Udyog Lijjat Papad" (page 41) and identify how the.', '2) Ask them to rewrite the principle as: "Organizational goals take priority WHEN they conflict with individual goals.', 'Which principle is violated and why?" — expect answer: Subordination of Individual Interest, because the manager placed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
