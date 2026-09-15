import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch06_p2: SimDef = {
    id: 'v3_c12_bs_ch06_p2',
    title: 'Staffing · Part 2/2',
    subtitle: '260 hires in 90 days — and posting ads isn\'t even step one.',
    classLevel: 12, subject: 'business_studies', topic: 'Staffing · Part 2/2',
    chapters: ['c12_bs_ch06'],
    nodeIds: ['c12_bs_cbse_06_007', 'c12_bs_cbse_06_008', 'c12_bs_cbse_06_009', 'c12_bs_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'HR head of a scaling startup', intro: 'Staffing is the function that fills every other function — get the people wrong and the plan is paper.', goal: 'Define staffing and execute its eight-step process in correct order.' },
    discovery: {
        question: 'A funded startup needs 200 delivery executives, 50 developers and 10 managers in three months. The HR head doesn\'t post job ads first — what is step one?',
        options: ['Estimating manpower requirements — analyse the structure and workload before recruiting anyone', 'Recruitment — flood job portals to build the largest applicant pool', 'Selection — design the interview rounds first', 'Compensation — fix salary bands before knowing the roles'],
        answer: 'Estimating manpower requirements — analyse the structure and workload before recruiting anyone',
        hook: 'Hiring feels like it starts with ads — it starts with arithmetic. The eight-step staffing process fails at the end when you skip the beginning: wrong headcount and wrong roles poison every later step.',
    },
    teaching: [
        { title: 'Training and Development: Meaning and Importance', text: 'Training is a systematic process of increasing the knowledge, skills, and attitudes of employees to perform specific jobs effectively, while development refers to the overall growth of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Staff the startup properly: walk the full pipeline from manpower estimation through recruitment, selection, placement, training, appraisal, promotion and compensation — and justify why the order matters.',
        labels: ['Training and Development: Meaning', 'Training Methods: On-the-Job Training', 'Training Methods: Off-the-Job Training', 'Performance Appraisal: Meaning'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_008', title: 'Training Methods: On-the-Job Training (Apprenticeship, Internship, Job Rotation)',
          caseStudy: { intro: 'Imagine you have just been hired as a trainee in a manufacturing firm. You cannot run the machines on day one — you need to learn.',
            decisions: [{ prompt: 'What is the fundamental difference between apprenticeship training and internship training in terms of the parties involved and the primary.', options: [
                { text: 'Apprenticeship involves a trainee and a master worker within the organisation, aiming to', outcome: 'Apprenticeship involves a trainee and a master worker within the organisation, aiming to acquire.' },
                { text: 'just working while learning', outcome: 'Not quite — Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based.', reveals: 'apprenticeship-and-internship-are-interchangeabl' },
                { text: 'apprenticeship', outcome: 'Not quite — Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based.', reveals: 'apprenticeship-and-internship-are-interchangeabl' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_009', title: 'Training Methods: Off-the-Job Training (Vestibule, Lectures, Films, Case Study)',
          caseStudy: { intro: 'Imagine you\'re the HR Manager at a nuclear power plant hiring 50 new technicians.',
            decisions: [{ prompt: 'A manufacturing company installs a new CNC machine costing ₹2 crores.', options: [
                { text: 'Vestibule Training is most appropriate', outcome: 'Vestibule Training is most appropriate. It creates a replica of the actual work environment with.' },
                { text: 'Classroom Lectures', outcome: 'Not quite — Students believe "Off-the-job training = Classroom lectures only" and treat all six methods.', reveals: 'off-the-job-training-classroom' },
                { text: 'Case Study', outcome: 'Not quite — Students believe "Off-the-job training = Classroom lectures only" and treat all six methods.', reveals: 'off-the-job-training-classroom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_010', title: 'Performance Appraisal: Meaning and Methods',
          caseStudy: { intro: 'Imagine you are the HR manager of a growing Indian e-commerce startup. Your team of 50 has just completed a hectic festival sale season.',
            decisions: [{ prompt: 'Define performance appraisal in one sentence as per the CBSE Class 12 Business Studies textbook.', options: [
                { text: 'Performance appraisal means evaluating an employee\'s current and/or past performance', outcome: 'Performance appraisal means evaluating an employee\'s current and/or past performance against.' },
                { text: 'it is just giving a salary hike', outcome: 'Not quite — Students often believe performance appraisal is synonymous with "annual confidential report".', reveals: 'performance-appraisal-is-synonymous-with' },
                { text: 'annual confidential report', outcome: 'Not quite — Students often believe performance appraisal is synonymous with "annual confidential report".', reveals: 'performance-appraisal-is-synonymous-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A machine-parts firm loses a fifth of its skilled CNC operators in a year and production keeps slipping. The CEO\'s fix: \'just hire more operators — that\'s staffing.\'',
            decisions: [{ prompt: 'Will fresh hiring alone stop the bleeding?', options: [
                { text: 'No — staffing is a continuous cycle: the attrition signals gaps in appraisal, career growth and compensation, so diagnose why people leave and build development and promotion paths alongside recruitment.', outcome: 'Filling positions without keeping them filled creates a revolving door; recruitment is only one of eight steps.' },
                { text: 'Yes — staffing literally means hiring, so more recruitment solves it.', outcome: 'That shrinks staffing to its second step; the NCERT process runs estimation through compensation — retention lives in the later steps.', reveals: 'staffing-is-hiring' },
                { text: 'Yes — and anyway staffing is the HR department\'s job, so line managers are off the hook.', outcome: 'Staffing is a line function too: the production manager must appraise and develop his own operators; HR only supports with systems.', reveals: 'hr-owns-staffing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You can now run the entire people pipeline end-to-end. Staffing\'s eight steps are a sequence-heavy board favourite — and the literal job description of every HR professional.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_007', difficulty: 'standard',
          question: 'Training is a systematic process of increasing the knowledge, skills, and.',
          hint: 'Revisit c12_bs_cbse_06_002 (Staffing Process) and c12_bs_cbse_06_003 (HRM) to see where.',
          misconception: 'Students often think \'training\' and \'development\' are synonyms, or that development is just \'advanced training\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Training is a systematic process of increasing the knowledge, skills, and attitudes of',
                  options: ['Training is a systematic process of increasing the knowledge, skills, and attitudes of', 'Staffing is the managerial function of filling and keeping filled the positions in an', 'Staffing process is the systematic sequence of eight interdependent steps', 'Human Resource Management (HRM) is the strategic and specialized function of managing an'],
                  hint: 'Revisit c12_bs_cbse_06_002 (Staffing Process) and c12_bs_cbse_06_003 (HRM) to see where training.',
                  misconception: 'Students often think \'training\' and \'development\' are synonyms, or that development is just \'advanced training\'.' }
          ],
            remediations: { 'training-and-development-are-synonyms': { steps: ['If a student conflates training and development, have them: (1) Re-read the NCERT \'Difference between Training and.', '(2) Create a two-column list for a real employee (e.g., a bank teller): column A = skills needed today (cash handling.', '(3) Explain aloud why a one-week teller workshop is training but a two-year mentorship is development.', '(4) Re-attempt Diagnostic Question 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_008', difficulty: 'standard',
          question: 'On-the-Job Training (OJT) refers to methods where employees learn by actually.',
          hint: 'If stuck, re-read the "Training and Development" section in node c12_bs_cbse_06_007.',
          misconception: 'Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based learning.',
          parts: [
                { id: 'a', prompt: 'A company wants to prepare a group of management trainees for future general manager roles.', answer: 'This is Job Rotation',
                  options: ['This is Job Rotation', 'coaching', 'apprenticeship', 'internship'],
                  hint: 'If stuck, re-read the "Training and Development" section in node c12_bs_cbse_06_007, focusing.',
                  misconception: 'Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based learning.' },
                { id: 'b', prompt: 'A small printing press hires a 19-year-old who has completed a vocational course in graphic design. The owner wants him to become a skilled press operator.', answer: 'Method: Apprenticeship Programme',
                  options: ['Method: Apprenticeship Programme', 'internship', 'job rotation', 'apprenticeship'],
                  hint: 'If stuck, re-read the "Training and Development" section in node c12_bs_cbse_06_007, focusing.',
                  misconception: 'Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based learning.' }
          ],
            remediations: { 'apprenticeship-and-internship-are-interchangeabl': { steps: ['Re-read the NCERT definitions of each method (pages 161–162) and write one distinguishing keyword for each.', 'Create a 2×2 matrix: rows = methods, columns = "Target Group" and "Primary Objective".', 'Fill it from the textbook.', 'Attempt Diagnostic Questions 1 and 2 again.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based learning.',
          parts: [
                { id: 'a', prompt: '"On-the-job training methods are always cheaper than off-the-job methods because they use existing equipment and supervisors." Evaluate this statement with two.', answer: 'For: (1) No separate training infrastructure or faculty costs',
                  options: ['For: (1) No separate training infrastructure or faculty costs', 'apprenticeship', 'internship'],
                  hint: 'If stuck, re-read the "Training and Development" section in node c12_bs_cbse_06_007, focusing.',
                  misconception: 'Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based learning.' },
                { id: 'b', prompt: 'Create a realistic scenario (3–4 sentences) where a company would use BOTH apprenticeship and job rotation simultaneously for different employee groups.', answer: 'Example: "An automobile plant hires 20 ITI-fitters as apprentices under master',
                  options: ['Example: "An automobile plant hires 20 ITI-fitters as apprentices under master', 'apprenticeship', 'internship'],
                  hint: 'If stuck, re-read the "Training and Development" section in node c12_bs_cbse_06_007, focusing.',
                  misconception: 'Students often think "apprenticeship" and "internship" are interchangeable terms for any work-based learning.' }
          ],
            remediations: { 'apprenticeship-and-internship-are-interchangeabl': { steps: ['Re-read the NCERT definitions of each method (pages 161–162) and write one distinguishing keyword for each.', 'Create a 2×2 matrix: rows = methods, columns = "Target Group" and "Primary Objective".', 'Fill it from the textbook.', 'Attempt Diagnostic Questions 1 and 2 again.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_009', difficulty: 'standard',
          question: 'Off-the-Job Training refers to training methods where employees learn away from.',
          hint: 'Revisit c12_bs_cbse_06_008 — specifically the definition of "On-the-Job methods refer.',
          misconception: 'Students believe "Off-the-job training = Classroom lectures only" and treat all six methods as variations of passive.',
          parts: [
                { id: 'a', prompt: 'A manufacturing company installs a new CNC machine costing ₹2 crores. They want to train 10 operators before the machine goes into production.', answer: 'Vestibule Training is most appropriate',
                  options: ['Vestibule Training is most appropriate', 'Classroom Lectures', 'Case Study', 'Off-the-job training = Classroom lectures only'],
                  hint: 'Revisit c12_bs_cbse_06_008 — specifically the definition of "On-the-Job methods refer to the.',
                  misconception: 'Students believe "Off-the-job training = Classroom lectures only" and treat all six methods as variations of passive listening.' },
                { id: 'b', prompt: 'A bank wants to train 200 new customer service representatives on: (a) new banking software, (b) complaint handling procedures, and (c) regulatory compliance.', answer: 'new banking software, (',
                  options: ['new banking software, (', 'Films for software training', 'Off-the-job training = Classroom lectures only'],
                  hint: 'Revisit c12_bs_cbse_06_008 — specifically the definition of "On-the-Job methods refer to the.',
                  misconception: 'Students believe "Off-the-job training = Classroom lectures only" and treat all six methods as variations of passive listening.' },
                { id: 'c', prompt: 'Compare Vestibule Training and Computer Modelling on these dimensions: (i) Physical fidelity to real workplace, (ii) Cost of setup, (iii) Types of skills best.', answer: '| Dimension | Vestibule Training | Computer Modelling |',
                  options: ['| Dimension | Vestibule Training | Computer Modelling |', 'Computer Modelling has higher fidelity', 'Vestibule has zero risk', 'Off-the-job training = Classroom lectures only'],
                  hint: 'Revisit c12_bs_cbse_06_008 — specifically the definition of "On-the-Job methods refer to the.',
                  misconception: 'Students believe "Off-the-job training = Classroom lectures only" and treat all six methods as variations of passive listening.' }
          ],
            remediations: { 'off-the-job-training-classroom': { steps: ['If the student cannot match methods to scenarios: 1.', 'Have them create a 6×3 matrix: Methods (rows) × Learning Domains — Psychomotor, Cognitive-Knowledge.', 'Fill each cell with "High/Medium/Low suitability" using NCERT descriptions.', 'Give 5 micro-scenarios (2 lines each), ask: "Which ONE method is BEST?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_010', difficulty: 'standard',
          question: 'Performance appraisal is the systematic and periodic evaluation of.',
          hint: 'Revisit the staffing process (node c12_bs_cbse_06_002) and the training methods nodes.',
          misconception: 'Students often believe performance appraisal is synonymous with "annual confidential report" or "salary review.',
          parts: [
                { id: 'a', prompt: 'A manufacturing supervisor uses a Graphic Rating Scale to rate a machine operator on five traits (Quality, Speed, Safety, Attendance, Teamwork) each on a 1–5.', answer: 'Total = 19, Average = 3.8',
                  options: ['Total = 19, Average = 3.8', 'annual confidential report', 'salary review meeting'],
                  hint: 'Revisit the staffing process (node c12_bs_cbse_06_002) and the training methods nodes.',
                  misconception: 'Students often believe performance appraisal is synonymous with "annual confidential report" or "salary review meeting".' }
          ],
            remediations: { 'performance-appraisal-is-synonymous-with': { steps: ['If the student holds this misconception: (1) Ask them to read the NCERT lines: "The employee is expected to know what.', '(2) Show a 2-minute video of a modern appraisal conversation (e.g., from a reputable HR channel).', '(3) Have them role-play an appraisal where the employee sets one goal for the next quarter.', '(4) Revisit node c12_bs_cbse_06_002 (Staffing Process) to see appraisal as step (vi) after training, not as an isolated.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
