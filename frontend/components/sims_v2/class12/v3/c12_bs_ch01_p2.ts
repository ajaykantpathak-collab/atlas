import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch01_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch01_p2: SimDef = {
    id: 'v3_c12_bs_ch01_p2',
    title: 'Nature and Significance of Management · Part 2/2',
    subtitle: '5,000 candles, 15 days, 20 workers — effectiveness vs efficiency, live.',
    classLevel: 12, subject: 'business_studies', topic: 'Nature and Significance of Management · Part 2/2',
    chapters: ['c12_bs_ch01'],
    nodeIds: ['c12_bs_cbse_01_007', 'c12_bs_cbse_01_008', 'c12_bs_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Operations head, Namchi Designer Candles', intro: 'Management isn\'t a title — it\'s the invisible machinery that turns a deadline into a delivery.', goal: 'Define management\'s features and evaluate it as science, art and profession.' },
    discovery: {
        question: 'Smita\'s candle unit must deliver 5,000 customised candles in 15 days with 20 workers and delayed raw material. \'Management\' here means achieving the order — but what twin tests define doing it well?',
        options: ['Effectiveness and efficiency — finishing the right task on time while using minimum resources at optimal cost', 'Speed and volume — produce the maximum candles as fast as possible', 'Discipline and control — keep workers under strict supervision throughout', 'Profit and growth — only financial outcomes measure good management'],
        answer: 'Effectiveness and efficiency — finishing the right task on time while using minimum resources at optimal cost',
        hook: 'Students treat management as \'getting things done\' — but doing the wrong thing fast is failure twice. Effectiveness picks the right goal; efficiency reaches it with least waste, and both are tested separately.',
    },
    teaching: [
        { title: 'Management vs Administration: Distinction', text: 'Management is the process of planning, organising, staffing, directing, and controlling organisational resources to achieve goals efficiently and effectively; Administration is the higher-level.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Manage the Diwali crunch: hit the 5,000-candle deadline while minimising overtime and waste, then argue whether what you did counts as science, art, or profession.',
        labels: ['Management vs Administration: Distinction', 'Coordination: Meaning, Characteristics', 'Efficiency vs Effectiveness'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_007', title: 'Management vs Administration: Distinction',
          caseStudy: { intro: 'Imagine you are the Principal of a school (top-level administrator) and also the Head of the Science Department (middle-level manager).',
            decisions: [{ prompt: 'State the primary difference between administration and management according to the American view (Oliver Sheldon, Florence, Tead).', options: [
                { text: 'Correct: Administration is the higher-level function of determining objectives and', outcome: 'Correct: Administration is the higher-level function of determining objectives and policies (top.' },
                { text: 'management is top, administration is lower', outcome: 'Not quite — Students often memorise the American view as "the correct answer" and treat the British view.', reveals: 'students-often-memorise-the-american' },
                { text: 'swaps the levels (e', outcome: 'Not quite — Students often memorise the American view as "the correct answer" and treat the British view.', reveals: 'students-often-memorise-the-american' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_008', title: 'Coordination: Meaning, Characteristics and Importance as the Essence of Management',
          caseStudy: { intro: 'Imagine you are the captain of your school\'s annual fest organizing committee. You have teams for sponsorship, logistics, publicity, and cultural events.',
            decisions: [{ prompt: 'Define coordination according to Theo Haimann and explain how it differs from mere cooperation.', options: [
                { text: 'Theo Haimann defines coordination as "the orderly synchronizing of efforts of', outcome: 'Theo Haimann defines coordination as "the orderly synchronizing of efforts of subordinates.' },
                { text: 'coordination means working together willingly', outcome: 'Not quite — Students often believe coordination is the same as cooperation — they write "coordination means.', reveals: 'coordination-is-the-same-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_009', title: 'Efficiency vs Effectiveness in Management: Meaning and Distinction',
          caseStudy: { intro: 'Imagine you are the manager of a small bakery that must deliver 500 custom cakes for a wedding tomorrow.',
            decisions: [{ prompt: 'Define efficiency and effectiveness in management as per NCERT. Use the terms "inputs", "outputs", and "goals" in your answer.', options: [
                { text: 'Effectiveness is the degree to', outcome: 'Effectiveness is the degree to which an organisation achieves its stated goals (outputs match.' },
                { text: 'efficiency is achieving goals', outcome: 'Not quite — Students often believe that efficiency and effectiveness are synonyms or that achieving the target.', reveals: 'efficiency-and-effectiveness-are-synonyms' },
                { text: 'swaps the definitions (e', outcome: 'Not quite — Students often believe that efficiency and effectiveness are synonyms or that achieving the target.', reveals: 'efficiency-and-effectiveness-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A bakery owner reviews the month: the team baked all 2,000 loaves ordered, but burned through 10% extra flour and 20% extra labour hours versus standard. Her assistant calls it \'a perfectly managed month\'.',
            decisions: [{ prompt: 'Is that verdict right?', options: [
                { text: 'Only half — the bakery was effective (goal achieved) but not efficient (inputs exceeded standard); good management means hitting the target at minimum cost.', outcome: 'Effectiveness is doing the right task; efficiency is doing it with least resources — meeting output while overspending inputs is exactly the \'effective but inefficient\' case.' },
                { text: 'Yes — the target was met, so management was both effective and efficient.', outcome: 'Target-hit proves effectiveness only; efficiency is judged on the input side, where flour and labour both overshot.', reveals: 'effective-equals-efficient' },
                { text: 'No — because efficiency was poor, the month counts as ineffective too.', outcome: 'The goal was achieved, so effectiveness held; the two dimensions are independent and both must be judged.', reveals: 'inefficient-means-ineffective' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_009', title: 'You made it',
          caseStudy: { intro: 'You can now define management the way examiners want — goal-oriented, pervasive, twin-tested. The effectiveness-efficiency and science-art-profession debates are guaranteed board marks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_007', difficulty: 'standard',
          question: 'Management is the process of planning, organising, staffing, directing, and.',
          hint: 'If stuck, revisit c12_bs_cbse_01_003 (Levels of Management) and draw the pyramid with.',
          misconception: 'Students often memorise the American view as "the correct answer" and treat the British view as "wrong".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Management is the process of planning, organising, staffing, directing, and controlling',
                  options: ['Management is the process of planning, organising, staffing, directing, and controlling', 'Management as a science refers to its systematised body of knowledge based on', 'Levels of Management refer to the hierarchical arrangement of managerial positions in an', 'Functions of Management are the five interrelated and simultaneous core activities'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_003 (Levels of Management) and draw the pyramid with.',
                  misconception: 'Students often memorise the American view as "the correct answer" and treat the British view as "wrong".' }
          ],
            remediations: { 'students-often-memorise-the-american': { steps: ['If the student conflates the views: Step 1 — Revisit c12_bs_cbse_01_003 (Levels of Management) to reinforce that.', 'Step 2 — Make a three-column table: Basis | American View | British View.', 'Fill it from memory, then check against textbook.', 'Step 3 — Practice two CUET-style MCQs that explicitly name the thinker (Sheldon vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_008', difficulty: 'standard',
          question: 'Coordination is the process of synchronizing the activities of different.',
          hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003.',
          misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together.',
          parts: [
                { id: 'a', prompt: 'Define coordination according to Theo Haimann and explain how it differs from mere cooperation.', answer: 'Theo Haimann defines coordination as "the orderly synchronizing of efforts of',
                  options: ['Theo Haimann defines coordination as "the orderly synchronizing of efforts of', 'coordination means working together willingly'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003 (Levels.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' },
                { id: 'b', prompt: '"Coordination is the essence of management." Explain this statement by linking it to any three managerial functions.', answer: 'Coordination is the essence',
                  options: ['Coordination is the essence', 'coordination means working together willingly'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003 (Levels.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' },
                { id: 'c', prompt: 'A manufacturing company has separate Purchase, Production, and Sales departments.', answer: 'First case violates "Coordination integrates group efforts"',
                  options: ['First case violates "Coordination integrates group efforts"', 'coordination means working together willingly'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003 (Levels.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' },
                { id: 'd', prompt: 'Compare the role of coordination in a small startup (10 employees) versus a large multinational corporation (50,000 employees).', answer: 'In a startup, coordination is often informal, direct, and personal',
                  options: ['In a startup, coordination is often informal, direct, and personal', 'coordination is more important in large firms', 'coordination means working together willingly'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003 (Levels.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' }
          ],
            remediations: { 'coordination-is-the-same-as': { steps: ['If the student confuses coordination with cooperation, have them: (1) Re-read the NCERT definitions by Brech.', '(3) Re-attempt Diagnostic Question 1 and 5.', 'If they still equate the two, revisit c12_bs_cbse_01_004 (Functions of Management) to see how coordination is embedded.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together.',
          parts: [
                { id: 'a', prompt: 'Design a coordination mechanism for a hospital\'s Emergency Department, Radiology, and Pharmacy to reduce patient wait times.', answer: 'Mechanism: (1) Integrates group efforts',
                  options: ['Mechanism: (1) Integrates group efforts', 'coordination means working together willingly'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003 (Levels.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' }
          ],
            remediations: { 'coordination-is-the-same-as': { steps: ['If the student confuses coordination with cooperation, have them: (1) Re-read the NCERT definitions by Brech.', '(3) Re-attempt Diagnostic Question 1 and 5.', 'If they still equate the two, revisit c12_bs_cbse_01_004 (Functions of Management) to see how coordination is embedded.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_009', difficulty: 'standard',
          question: 'Effectiveness in management means achieving organisational goals by completing.',
          hint: 'Revisit the "Concept" section of NCERT Chapter 1 (pages 3‑4) where management is defined.',
          misconception: 'Students often believe that efficiency and effectiveness are synonyms or that achieving the target (effectiveness).',
          parts: [
                { id: 'a', prompt: 'Define efficiency and effectiveness in management as per NCERT. Use the terms "inputs", "outputs", and "goals" in your answer.', answer: 'Effectiveness is the degree to',
                  options: ['Effectiveness is the degree to', 'efficiency is achieving goals', 'swaps the definitions (e'],
                  hint: 'Revisit the "Concept" section of NCERT Chapter 1 (pages 3‑4) where management is defined.',
                  misconception: 'Students often believe that efficiency and effectiveness are synonyms or that achieving the target (effectiveness) automatically implies.' },
                { id: 'b', prompt: 'A factory supervisor is told to produce 10,000 units this month.', answer: 'She is effective',
                  options: ['She is effective', 'she is both effective and efficient', 'effectiveness equals efficiency'],
                  hint: 'Revisit the "Concept" section of NCERT Chapter 1 (pages 3‑4) where management is defined.',
                  misconception: 'Students often believe that efficiency and effectiveness are synonyms or that achieving the target (effectiveness) automatically implies.' },
                { id: 'c', prompt: 'A startup founder has ₹50 lakh funding. She spends ₹45 lakh developing a product that exactly meets the specifications agreed with investors, but the product.', answer: 'Effectiveness: Low',
                  options: ['Effectiveness: Low', 'efficient because she saved money'],
                  hint: 'Revisit the "Concept" section of NCERT Chapter 1 (pages 3‑4) where management is defined.',
                  misconception: 'Students often believe that efficiency and effectiveness are synonyms or that achieving the target (effectiveness) automatically implies.' },
                { id: 'd', prompt: 'Compare the following two managers in a garment export house: - Manager A: Consistently meets monthly shipment targets but frequently uses air freight (costly).', answer: 'Manager A is effective but inefficient (high logistics cost erodes margins)',
                  options: ['Manager A is effective but inefficient (high logistics cost erodes margins)', 'better'],
                  hint: 'Revisit the "Concept" section of NCERT Chapter 1 (pages 3‑4) where management is defined.',
                  misconception: 'Students often believe that efficiency and effectiveness are synonyms or that achieving the target (effectiveness) automatically implies.' }
          ],
            remediations: { 'efficiency-and-effectiveness-are-synonyms': { steps: ['If a student confuses the two concepts, take these steps: (1) Re‑read the NCERT paragraph "Effectiveness versus.', '(2) Draw a 2×2 matrix on paper: rows = Effective/Not Effective, columns = Efficient/Not Efficient.', 'Place the NCERT double‑shift example in the "Effective, Not Efficient" cell.', '(3) Create your own example for each of the other three cells.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
