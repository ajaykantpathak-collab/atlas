import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch01_p1: SimDef = {
    id: 'v3_c12_bs_ch01_p1',
    title: 'Nature and Significance of Management · Part 1/2',
    subtitle: '5,000 candles, 15 days, 20 workers — effectiveness vs efficiency, live.',
    classLevel: 12, subject: 'business_studies', topic: 'Nature and Significance of Management · Part 1/2',
    chapters: ['c12_bs_ch01'],
    nodeIds: ['c12_bs_cbse_01_001', 'c12_bs_cbse_01_002', 'c12_bs_cbse_01_003', 'c12_bs_cbse_01_004', 'c12_bs_cbse_01_005', 'c12_bs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Operations head, Namchi Designer Candles', intro: 'Management isn\'t a title — it\'s the invisible machinery that turns a deadline into a delivery.', goal: 'Define management\'s features and evaluate it as science, art and profession.' },
    discovery: {
        question: 'Smita\'s candle unit must deliver 5,000 customised candles in 15 days with 20 workers and delayed raw material. \'Management\' here means achieving the order — but what twin tests define doing it well?',
        options: ['Effectiveness and efficiency — finishing the right task on time while using minimum resources at optimal cost', 'Speed and volume — produce the maximum candles as fast as possible', 'Discipline and control — keep workers under strict supervision throughout', 'Profit and growth — only financial outcomes measure good management'],
        answer: 'Effectiveness and efficiency — finishing the right task on time while using minimum resources at optimal cost',
        hook: 'Students treat management as \'getting things done\' — but doing the wrong thing fast is failure twice. Effectiveness picks the right goal; efficiency reaches it with least waste, and both are tested separately.',
    },
    teaching: [
        { title: 'Management: Meaning, Definition and Characteristics', text: 'Management is the process of planning, organising, staffing, directing, and controlling organisational resources (human, financial, physical, and informational) to achieve predetermined goals.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Manage the Diwali crunch: hit the 5,000-candle deadline while minimising overtime and waste, then argue whether what you did counts as science, art, or profession.',
        labels: ['Management: Meaning, Definition', 'Management as a Science,', 'Levels of Management: Top,', 'Functions of Management: Planning,', 'Objectives of Management: Organisational,', 'Importance of Management'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_002', title: 'Management as a Science, Art and Profession',
          caseStudy: { intro: 'Imagine you\'re Smita from Namchi Designer Candles — you\'ve learned management principles from books (science), but when a sudden Diwali order doubles and your.',
            decisions: [{ prompt: 'State the three basic features of science as per NCERT and identify which ONE feature management does NOT fully satisfy.', options: [
                { text: 'The three features: (1) Systematised body of knowledge, (2) Principles based on', outcome: 'The three features: (1) Systematised body of knowledge, (2) Principles based on experimentation.' },
                { text: 'inexact science', outcome: 'Not quite — Students equate "management is a profession" with "managers are professionals" — they think because.', reveals: 'students-equate-management-is-a' },
                { text: 'having a knowledge base', outcome: 'Not quite — Students equate "management is a profession" with "managers are professionals" — they think because.', reveals: 'students-equate-management-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_003', title: 'Levels of Management: Top, Middle and Lower Level',
          caseStudy: { intro: 'Imagine you\'re appointed CEO of a mid-sized Indian textile company with 500 employees.',
            decisions: [{ prompt: 'Name the three levels of management in an organisation and give one typical designation for each level.', options: [
                { text: 'The three levels are: (1) Top Management', outcome: 'The three levels are: (1) Top Management — e.g., Chief Executive Officer (CEO) / Chairman; (2).' },
                { text: 'HR Manager', outcome: 'Not quite — Students often believe that "Top Management = Owners" and "Lower Management = Workers".', reveals: 'top-management-owners-and-lower' },
                { text: 'Top Management = Owners', outcome: 'Not quite — Students often believe that "Top Management = Owners" and "Lower Management = Workers".', reveals: 'top-management-owners-and-lower' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_004', title: 'Functions of Management: Planning, Organising, Staffing, Directing, Controlling',
          caseStudy: { intro: 'Imagine you are Smita Rai from the NCERT case study, running Namchi Designer Candles. It is June, and Diwali is four months away.',
            decisions: [{ prompt: 'State the five functions of management in the order they appear in the NCERT textbook. Do not explain — just list them.', options: [
                { text: 'Planning, Organising, Staffing, Directing, Controlling', outcome: 'Planning, Organising, Staffing, Directing, Controlling. A wrong answer (e.g., listing.' },
                { text: 'Coordination', outcome: 'Not quite — Students treat the five functions as a rigid linear sequence: "First we finish Planning, then.', reveals: 'students-treat-the-five-functions' },
                { text: 'Organising, Planning', outcome: 'Not quite — Students treat the five functions as a rigid linear sequence: "First we finish Planning, then.', reveals: 'students-treat-the-five-functions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_005', title: 'Objectives of Management: Organisational, Social and Personal Objectives',
          caseStudy: { intro: 'Imagine you are the manager of a start-up that makes eco-friendly packaging.',
            decisions: [{ prompt: 'State the three broad categories of management objectives as per NCERT Class 12 Business Studies.', options: [
                { text: 'The three categories are: (1) Organisational Objectives, (2) Social Objectives, and (3)', outcome: 'The three categories are: (1) Organisational Objectives, (2) Social Objectives, and (3) Personal.' },
                { text: 'profit, sales, marketing', outcome: 'Not quite — Students often treat the three objectives as isolated silos and write answers like "Organisational.', reveals: 'students-often-treat-the-three' },
                { text: 'planning, organising, controlling', outcome: 'Not quite — Students often treat the three objectives as isolated silos and write answers like "Organisational.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_006', title: 'Importance of Management in Modern Organisations',
          caseStudy: { intro: 'Imagine a food delivery startup that has great chefs and delivery bikes but constantly misses orders, wastes ingredients, and loses customers.',
            decisions: [{ prompt: 'State any two points highlighting the importance of management in an organisation.', options: [
                { text: 'Correct answer: Any two of: (1) Management helps in achieving group goals, (2) Management', outcome: 'Correct answer: Any two of: (1) Management helps in achieving group goals, (2) Management increases.' },
                { text: 'management helps in planning', outcome: 'Not quite — Students often write "management is important because it plans, organises, staffs, directs.', reveals: 'students-often-write-management-is' },
                { text: 'management is important', outcome: 'Not quite — Students often write "management is important because it plans, organises, staffs, directs.', reveals: 'students-often-write-management-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A bakery owner reviews the month: the team baked all 2,000 loaves ordered, but burned through 10% extra flour and 20% extra labour hours versus standard. Her assistant calls it \'a perfectly managed month\'.',
            decisions: [{ prompt: 'Is that verdict right?', options: [
                { text: 'Only half — the bakery was effective (goal achieved) but not efficient (inputs exceeded standard); good management means hitting the target at minimum cost.', outcome: 'Effectiveness is doing the right task; efficiency is doing it with least resources — meeting output while overspending inputs is exactly the \'effective but inefficient\' case.' },
                { text: 'Yes — the target was met, so management was both effective and efficient.', outcome: 'Target-hit proves effectiveness only; efficiency is judged on the input side, where flour and labour both overshot.', reveals: 'effective-equals-efficient' },
                { text: 'No — because efficiency was poor, the month counts as ineffective too.', outcome: 'The goal was achieved, so effectiveness held; the two dimensions are independent and both must be judged.', reveals: 'inefficient-means-ineffective' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define management the way examiners want — goal-oriented, pervasive, twin-tested. The effectiveness-efficiency and science-art-profession debates are guaranteed board marks.',
            decisions: [{ prompt: 'What comes next? Nature and Significance of Management · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nature and Significance of Management · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_001', difficulty: 'standard',
          question: 'Management is the process of planning, organising, staffing, directing, and.',
          hint: 'Revisit c11_bs_cbse_01_003 (Business Characteristics) and c11_bs_cbse_01_009 (Objectives.',
          misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management.',
          parts: [
                { id: 'a', prompt: 'A factory manager achieves the annual production target of 10,000 units but uses 20% more raw material and 30% more labour hours than the industry standard.', answer: 'The manager is **effective but not efficient**',
                  options: ['The manager is **effective but not efficient**', 'A student who says', 'confuses goal attainment with resource optimisation'],
                  hint: 'Revisit c11_bs_cbse_01_003 (Business Characteristics) and c11_bs_cbse_01_009 (Objectives.',
                  misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is efficient." They treat the.' },
                { id: 'b', prompt: 'Smita at Namchi Designer Candles plans a Diwali collection, organises funds and workers, communicates with suppliers, and takes customer feedback — all in one.', answer: 'This illustrates **management is a continuous process**',
                  options: ['This illustrates **management is a continuous process**', 'multidimensional', 'group activity'],
                  hint: 'Revisit c11_bs_cbse_01_003 (Business Characteristics) and c11_bs_cbse_01_009 (Objectives.',
                  misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is efficient." They treat the.' }
          ],
            remediations: { 'students-conflate-efficiency-with-effectiveness': { steps: ['Re-read the NCERT "Effectiveness versus Efficiency" box (page 4-5) and the Smita Rai case.', 'Draw a 2×2 matrix: Effective+Efficient (ideal), Effective+Not Efficient (high cost), Not Effective+Efficient (low cost.', 'Place the power-failure example in the correct quadrant.', 'Create your own 2-sentence scenario for each quadrant.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management.',
          parts: [
                { id: 'a', prompt: '"Management is an intangible force." Evaluate this statement: Can something intangible be measured?', answer: 'Yes, intangible forces are measured by their *effects*',
                  options: ['Yes, intangible forces are measured by their *effects*', 'management cannot be measured'],
                  hint: 'Revisit c11_bs_cbse_01_003 (Business Characteristics) and c11_bs_cbse_01_009 (Objectives.',
                  misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is efficient." They treat the.' }
          ],
            remediations: { 'students-conflate-efficiency-with-effectiveness': { steps: ['Re-read the NCERT "Effectiveness versus Efficiency" box (page 4-5) and the Smita Rai case.', 'Draw a 2×2 matrix: Effective+Efficient (ideal), Effective+Not Efficient (high cost), Not Effective+Efficient (low cost.', 'Place the power-failure example in the correct quadrant.', 'Create your own 2-sentence scenario for each quadrant.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_002', difficulty: 'standard',
          question: 'Management as a science refers to its systematised body of knowledge based.',
          hint: 'Revisit c11_bs_cbse_01_002 — focus on the profession criteria table and the CA/Doctor.',
          misconception: 'Students equate "management is a profession" with "managers are professionals" — they think because managers act.',
          parts: [
                { id: 'a', prompt: 'State the three basic features of science as per NCERT and identify which ONE feature management does NOT fully satisfy. Explain why in one sentence.', answer: 'The three features: (1) Systematised body of knowledge, (2) Principles based on',
                  options: ['The three features: (1) Systematised body of knowledge, (2) Principles based on', 'inexact science', 'having a knowledge base', 'universal applicability of that knowledge'],
                  hint: 'Revisit c11_bs_cbse_01_002 — focus on the profession criteria table and the CA/Doctor examples.',
                  misconception: 'Students equate "management is a profession" with "managers are professionals" — they think because managers act professionally (punctual.' }
          ],
            remediations: { 'students-equate-management-is-a': { steps: ['Re-read NCERT pages 12-17 (Science, Art, Profession sections) and highlight the 3/3/5 criteria in three colours.', 'Create a "Criteria vs Management" table for each — tick/cross each criterion with one-line evidence.', 'Practice the "inexact science" and "restricted entry" distinctions by explaining them aloud to a peer using the.', 'Re-attempt Diagnostic Questions 3 and 4 — if still stuck, revisit c11_bs_cbse_01_002 (Concepts of Business, Profession.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_003', difficulty: 'standard',
          question: 'Levels of Management refer to the hierarchical arrangement of managerial.',
          hint: 'If unclear on functions or effectiveness/efficiency, revisit c12_bs_cbse_01_001 and.',
          misconception: 'Students often believe that "Top Management = Owners" and "Lower Management = Workers". This is incorrect.',
          parts: [
                { id: 'a', prompt: 'Name the three levels of management in an organisation and give one typical designation for each level.', answer: 'The three levels are: (1) Top Management',
                  options: ['The three levels are: (1) Top Management', 'HR Manager', 'Top Management = Owners', 'Lower Management = Workers'],
                  hint: 'If unclear on functions or effectiveness/efficiency, revisit c12_bs_cbse_01_001 and create a 2x2.',
                  misconception: 'Students often believe that "Top Management = Owners" and "Lower Management = Workers". This is incorrect.' },
                { id: 'b', prompt: '"Middle management is just a post office passing messages between top and lower levels." Do you agree?', answer: 'Disagree',
                  options: ['Disagree', 'Top Management = Owners', 'Lower Management = Workers', '"Top Management = Owners" and "Lower Management = Workers"'],
                  hint: 'If unclear on functions or effectiveness/efficiency, revisit c12_bs_cbse_01_001 and create a 2x2.',
                  misconception: 'Students often believe that "Top Management = Owners" and "Lower Management = Workers". This is incorrect.' },
                { id: 'c', prompt: 'Compare the time horizon of planning at top, middle, and lower levels of management in a manufacturing company.', answer: 'Top level: Strategic planning, 3-5 years',
                  options: ['Top level: Strategic planning, 3-5 years', 'Top Management = Owners', 'Lower Management = Workers', '"Top Management = Owners" and "Lower Management = Workers"'],
                  hint: 'If unclear on functions or effectiveness/efficiency, revisit c12_bs_cbse_01_001 and create a 2x2.',
                  misconception: 'Students often believe that "Top Management = Owners" and "Lower Management = Workers". This is incorrect.' }
          ],
            remediations: { 'top-management-owners-and-lower': { steps: ['If the student confuses ownership with management level or worker with supervisor: (1) Revisit c12_bs_cbse_01_001.', '(2) Use a 3-column table: Column 1 = Designation, Column 2 = Level, Column 3 = "Authority over whom?" — fill for 10.', '(3) Re-diagnostic: Give a case — "Mr.', 'Shah owns 60% of a pharma company but hires a professional CEO.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_004', difficulty: 'standard',
          question: 'Functions of Management are the five interrelated and simultaneous core.',
          hint: 'Revisit c12_bs_cbse_01_001 (characteristics of management) and c12_bs_cbse_01_003 (levels.',
          misconception: 'Students treat the five functions as a rigid linear sequence: "First we finish Planning, then we start Organising, then.',
          parts: [
                { id: 'a', prompt: 'State the five functions of management in the order they appear in the NCERT textbook. Do not explain — just list them.', answer: 'Planning, Organising, Staffing, Directing, Controlling',
                  options: ['Planning, Organising, Staffing, Directing, Controlling', 'Coordination', 'Organising, Planning', 'Coordination" as a function, or changing the order to "Organising, Planning'],
                  hint: 'Revisit c12_bs_cbse_01_001 (characteristics of management) and c12_bs_cbse_01_003 (levels.',
                  misconception: 'Students treat the five functions as a rigid linear sequence: "First we finish Planning, then we start Organising, then Staffing..." and.' },
                { id: 'b', prompt: 'Compare the role of "Staffing" in a labour-intensive handicraft unit (like Namchi Designer Candles) versus a capital-intensive automated bottling plant.', answer: 'Handicraft unit: Staffing focuses on recruiting artisans with tacit skills, long',
                  options: ['Handicraft unit: Staffing focuses on recruiting artisans with tacit skills, long', 'both need skilled workers'],
                  hint: 'Revisit c12_bs_cbse_01_001 (characteristics of management) and c12_bs_cbse_01_003 (levels.',
                  misconception: 'Students treat the five functions as a rigid linear sequence: "First we finish Planning, then we start Organising, then Staffing..." and.' }
          ],
            remediations: { 'students-treat-the-five-functions': { steps: ['Ask the student to pick any one day in their life (e.g., organising a birthday party) and write a 5-minute timeline.', 'For each 10-minute block, label which management function(s) they were performing — they will see multiple functions.', 'Re-read NCERT page 20: "In reality, managers are rarely able to carry out these functions in isolation."', 'Practice one CBSE case-study question (e.g., 2023 Sample Paper Q12) where the answer requires identifying overlapping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_005', difficulty: 'standard',
          question: 'Objectives of Management are the specific, desired end results that management.',
          hint: 'Revisit c12_bs_cbse_01_001 (characteristic: goal-oriented process) and c11_bs_cbse_01_009.',
          misconception: 'Students often treat the three objectives as isolated silos and write answers like "Organisational objective is profit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Objectives of Management are the specific, desired end results that management strives to',
                  options: ['Objectives of Management are the specific, desired end results that management strives to', 'Management is the process of planning, organising, staffing, directing, and controlling', 'Management as a science refers to its systematised body of knowledge based on', 'Levels of Management refer to the hierarchical arrangement of managerial positions in an'],
                  hint: 'Revisit c12_bs_cbse_01_001 (characteristic: goal-oriented process) and c11_bs_cbse_01_009 (economic.',
                  misconception: 'Students often treat the three objectives as isolated silos and write answers like "Organisational objective is profit, social objective.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Re-read the NCERT paragraph "Objectives of Management" (page 10-11) and highlight every verb that shows interaction.', 'Take the Tata Steel case from the chapter opener and explicitly map each mentioned activity (gratuity, Jamshedpur city.', 'Write a 50-word explanation of why "reconcile" is used instead of "prioritise."', 'Re-attempt Diagnostic Questions 3 and 6. If still stuck, revisit c12_bs_cbse_01_001 (characteristics: goal-oriented.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_006', difficulty: 'standard',
          question: 'Management importance refers to the critical role management plays in enabling.',
          hint: 'If stuck, revisit c12_bs_cbse_01_001 (definition) and c12_bs_cbse_01_004 (functions) and.',
          misconception: 'Students often write "management is important because it plans, organises, staffs, directs, controls" — they confuse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Management importance refers to the critical role management plays in enabling',
                  options: ['Management importance refers to the critical role management plays in enabling', 'Management is the process of planning, organising, staffing, directing, and controlling', 'Management as a science refers to its systematised body of knowledge based on', 'Levels of Management refer to the hierarchical arrangement of managerial positions in an'],
                  hint: 'If stuck, revisit c12_bs_cbse_01_001 (definition) and c12_bs_cbse_01_004 (functions) and practice.',
                  misconception: 'Students often write "management is important because it plans, organises, staffs, directs, controls" — they confuse management FUNCTIONS.' }
          ],
            remediations: { 'students-often-write-management-is': { steps: ['If a student lists functions instead of importance, do NOT re-teach functions.', 'Instead: (1) Show two side-by-side columns: "Functions (What)" vs "Importance (Why)".', '(2) Give a one-sentence scenario: "A factory produces 1000 units/day." Ask: "Which column explains HOW they do it?', 'Which explains WHY they need management?" (3) Have the student re-write the five importance points in their own words.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
