import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch06_p1: SimDef = {
    id: 'v3_c12_bs_ch06_p1',
    title: 'Staffing · Part 1/2',
    subtitle: '260 hires in 90 days — and posting ads isn\'t even step one.',
    classLevel: 12, subject: 'business_studies', topic: 'Staffing · Part 1/2',
    chapters: ['c12_bs_ch06'],
    nodeIds: ['c12_bs_cbse_06_001', 'c12_bs_cbse_06_002', 'c12_bs_cbse_06_003', 'c12_bs_cbse_06_004', 'c12_bs_cbse_06_005', 'c12_bs_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'HR head of a scaling startup', intro: 'Staffing is the function that fills every other function — get the people wrong and the plan is paper.', goal: 'Define staffing and execute its eight-step process in correct order.' },
    discovery: {
        question: 'A funded startup needs 200 delivery executives, 50 developers and 10 managers in three months. The HR head doesn\'t post job ads first — what is step one?',
        options: ['Estimating manpower requirements — analyse the structure and workload before recruiting anyone', 'Recruitment — flood job portals to build the largest applicant pool', 'Selection — design the interview rounds first', 'Compensation — fix salary bands before knowing the roles'],
        answer: 'Estimating manpower requirements — analyse the structure and workload before recruiting anyone',
        hook: 'Hiring feels like it starts with ads — it starts with arithmetic. The eight-step staffing process fails at the end when you skip the beginning: wrong headcount and wrong roles poison every later step.',
    },
    teaching: [
        { title: 'Staffing: Meaning, Nature and Importance', text: 'Staffing is the managerial function of filling and keeping filled the positions in an organisation structure by identifying workforce requirements, recruiting, selecting, placing, training.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Staff the startup properly: walk the full pipeline from manpower estimation through recruitment, selection, placement, training, appraisal, promotion and compensation — and justify why the order matters.',
        labels: ['Staffing: Meaning, Nature', 'Staffing Process: Steps', 'Human Resource Management (HRM)', 'Recruitment: Meaning and Sources', 'Internal vs External Sources', 'Selection Process: Steps'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_001', title: 'Staffing: Meaning, Nature and Importance',
          caseStudy: { intro: 'Imagine you are the owner of a rapidly growing food-delivery startup in Bengaluru.',
            decisions: [{ prompt: 'Define staffing in one sentence using the exact NCERT phrasing for “filling and keeping filled.”', options: [
                { text: 'Correct answer: “Staffing has been described as the managerial function of filling and', outcome: 'Correct answer: “Staffing has been described as the managerial function of filling and keeping.' },
                { text: 'hiring people', outcome: 'Not quite — Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people”.', reveals: 'students-often-equate-staffing-with' },
                { text: 'keeping filled', outcome: 'Not quite — Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people”.', reveals: 'students-often-equate-staffing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_002', title: 'Staffing Process: Steps in Staffing',
          caseStudy: { intro: 'Imagine you\'re the HR manager of a fast-growing Indian food-delivery startup that just secured Series B funding.',
            decisions: [{ prompt: 'List the eight steps of the staffing process in the correct sequential order as per NCERT.', options: [
                { text: 'The correct sequence is: (1) Estimating Manpower Requirements, (2) Recruitment, (3)', outcome: 'The correct sequence is: (1) Estimating Manpower Requirements, (2) Recruitment, (3) Selection, (4).' },
                { text: 'What happens if placement is skipped?', outcome: 'Not quite — Students memorise the eight steps as a static list ("1. Estimation, 2. Recruitment, 3.', reveals: 'students-memorise-the-eight-steps' },
                { text: 'employees will be confused', outcome: 'Not quite — Students memorise the eight steps as a static list ("1. Estimation, 2. Recruitment, 3.', reveals: 'students-memorise-the-eight-steps' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_003', title: 'Human Resource Management (HRM): Concept and Functions',
          caseStudy: { intro: 'Imagine you are the HR Manager of a fast-growing Indian startup that just received funding.',
            decisions: [{ prompt: 'What is the primary difference between the traditional concept of \'personnel management\' and modern \'Human Resource Management\'?', options: [
                { text: 'Correct answer: Personnel management was limited to labour welfare, record-keeping, and', outcome: 'Correct answer: Personnel management was limited to labour welfare, record-keeping, and.' },
                { text: 'they are the same', outcome: 'Not quite — Students often think HRM is only about hiring and firing (recruitment and termination).', reveals: 'hrm-is-only-about-hiring' },
                { text: 'HRM is just a new name', outcome: 'Not quite — Students often think HRM is only about hiring and firing (recruitment and termination).', reveals: 'hrm-is-only-about-hiring' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_004', title: 'Recruitment: Meaning and Sources of Recruitment',
          caseStudy: { intro: 'Imagine you are the HR manager of a fast-growing Indian startup, "TechNova", which just secured Series A funding and needs to hire 50 engineers, 10 sales.',
            decisions: [{ prompt: 'Define recruitment as per NCERT Class 12 Business Studies. How does it differ from selection in terms of objective and sequence?', options: [
                { text: 'Recruitment is the process of searching for prospective employees and stimulating them to', outcome: 'Recruitment is the process of searching for prospective employees and stimulating them to apply for.' },
                { text: 'recruitment is hiring', outcome: 'Not quite — Students often think "recruitment = hiring" and use the terms recruitment, selection, and placement.', reveals: 'recruitment-hiring-and-use-the' },
                { text: 'recruitment and selection are the same', outcome: 'Not quite — Students often think "recruitment = hiring" and use the terms recruitment, selection, and placement.', reveals: 'recruitment-hiring-and-use-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_005', title: 'Internal vs External Sources of Recruitment: Merits and Limitations',
          caseStudy: { intro: 'Imagine you are the HR manager of a mid-sized Indian manufacturing company that suddenly gets a large export order requiring 50 additional workers for three.',
            decisions: [{ prompt: 'List the two internal sources of recruitment mentioned in the NCERT textbook for Class 12 Business Studies.', options: [
                { text: 'The two internal sources are transfers and promotions', outcome: 'The two internal sources are transfers and promotions. A wrong answer (e.g., "advertisement and.' },
                { text: 'advertisement and campus recruitment', outcome: 'Not quite — Students often believe that internal recruitment is always superior because it is cheaper and.', reveals: 'internal-recruitment-is-always-superior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_006', title: 'Selection Process: Steps in Employee Selection',
          caseStudy: { intro: 'Imagine you are the HR manager of a fast-growing Indian fintech startup that just received 500 applications for 5 software developer positions.',
            decisions: [{ prompt: 'What is the first step in the selection process after applications have been received?', options: [
                { text: 'Preliminary screening is the first step', outcome: 'Preliminary screening is the first step. It involves reviewing application forms to eliminate.' },
                { text: 'employment interview', outcome: 'Not quite — Students often believe the selection process ends when the interview is over.', reveals: 'the-selection-process-ends-when' },
                { text: 'selection tests', outcome: 'Not quite — Students often believe the selection process ends when the interview is over.', reveals: 'the-selection-process-ends-when' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A machine-parts firm loses a fifth of its skilled CNC operators in a year and production keeps slipping. The CEO\'s fix: \'just hire more operators — that\'s staffing.\'',
            decisions: [{ prompt: 'Will fresh hiring alone stop the bleeding?', options: [
                { text: 'No — staffing is a continuous cycle: the attrition signals gaps in appraisal, career growth and compensation, so diagnose why people leave and build development and promotion paths alongside recruitment.', outcome: 'Filling positions without keeping them filled creates a revolving door; recruitment is only one of eight steps.' },
                { text: 'Yes — staffing literally means hiring, so more recruitment solves it.', outcome: 'That shrinks staffing to its second step; the NCERT process runs estimation through compensation — retention lives in the later steps.', reveals: 'staffing-is-hiring' },
                { text: 'Yes — and anyway staffing is the HR department\'s job, so line managers are off the hook.', outcome: 'Staffing is a line function too: the production manager must appraise and develop his own operators; HR only supports with systems.', reveals: 'hr-owns-staffing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now run the entire people pipeline end-to-end. Staffing\'s eight steps are a sequence-heavy board favourite — and the literal job description of every HR professional.',
            decisions: [{ prompt: 'What comes next? Staffing · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Staffing · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_001', difficulty: 'standard',
          question: 'Staffing is the managerial function of filling and keeping filled the positions.',
          hint: 'Revisit Class 11 Business Studies Chapter 1 (Nature and Purpose of Business).',
          misconception: 'Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people” and ignore the.',
          parts: [
                { id: 'a', prompt: 'Explain why staffing is considered both a line function and a staff function. Use the terms “every manager” and “Human Resource Department” in your answer.', answer: 'Correct answer: Staffing is a line function',
                  options: ['Correct answer: Staffing is a line function', 'HR does staffing, managers don’t'],
                  hint: 'Revisit Class 11 Business Studies Chapter 1 (Nature and Purpose of Business) — specifically the.',
                  misconception: 'Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people” and ignore the seven subsequent steps.' },
                { id: 'b', prompt: 'A textile company in Surat has 200 workers. Due to a sudden export order, they need 50 more workers for three months.', answer: 'Step: Recruitment (external source',
                  options: ['Step: Recruitment (external source', 'Selection'],
                  hint: 'Revisit Class 11 Business Studies Chapter 1 (Nature and Purpose of Business) — specifically the.',
                  misconception: 'Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people” and ignore the seven subsequent steps.' }
          ],
            remediations: { 'students-often-equate-staffing-with': { steps: ['Re-read the NCERT paragraph starting “Staffing has been described as the managerial function of filling and keeping.', 'Create a flowchart with 8 boxes labeled with the eight steps from the text (Estimating Manpower Requirements →.', 'For each box, write a one-line purpose in your own words.', 'Attempt Diagnostic Question 3 again, this time explicitly naming the step before giving merit/limitation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people” and ignore the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Training is a waste of money because employees leave after getting trained.” Use two benefits of training to the organisation and one.', answer: 'The statement is short-sighted',
                  options: ['The statement is short-sighted', 'training is good', 'evaluate'],
                  hint: 'Revisit Class 11 Business Studies Chapter 1 (Nature and Purpose of Business) — specifically the.',
                  misconception: 'Students often equate “staffing” with “recruitment” only. They write “staffing means hiring people” and ignore the seven subsequent steps.' }
          ],
            remediations: { 'students-often-equate-staffing-with': { steps: ['Re-read the NCERT paragraph starting “Staffing has been described as the managerial function of filling and keeping.', 'Create a flowchart with 8 boxes labeled with the eight steps from the text (Estimating Manpower Requirements →.', 'For each box, write a one-line purpose in your own words.', 'Attempt Diagnostic Question 3 again, this time explicitly naming the step before giving merit/limitation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_002', difficulty: 'standard',
          question: 'Staffing process is the systematic sequence of eight interdependent steps.',
          hint: 'Revisit c12_bs_cbse_06_001 — specifically the "Meaning" and "Staffing as part of Human.',
          misconception: 'Students memorise the eight steps as a static list ("1. Estimation, 2. Recruitment, 3.',
          parts: [
                { id: 'a', prompt: 'A company hires 50 engineers through campus recruitment, gives them a 2-week technical training, assigns them to projects, and after 6 months conducts their.', answer: 'The missing step is Placement and Orientation (step 4)',
                  options: ['The missing step is Placement and Orientation (step 4)', 'Promotion', 'Compensation', 'What happens if placement is skipped?'],
                  hint: 'Revisit c12_bs_cbse_06_001 — specifically the "Meaning" and "Staffing as part of Human Resource.',
                  misconception: 'Students memorise the eight steps as a static list ("1. Estimation, 2. Recruitment, 3.' },
                { id: 'b', prompt: 'Scenario: A manufacturing firm estimates it needs 30 CNC machine operators (step 1). It advertises widely and receives 500 applications (step 2).', answer: 'The failure occurred at Step 4: Placement and Orientation',
                  options: ['The failure occurred at Step 4: Placement and Orientation', 'What happens if placement is skipped?', 'employees will be confused', 'In competitive exams (CUET/IPMAT), case-study questions ask'],
                  hint: 'Revisit c12_bs_cbse_06_001 — specifically the "Meaning" and "Staffing as part of Human Resource.',
                  misconception: 'Students memorise the eight steps as a static list ("1. Estimation, 2. Recruitment, 3.' }
          ],
            remediations: { 'students-memorise-the-eight-steps': { steps: ['If a student cannot trace input-output linkages between steps: (1) Have them draw a flowchart with 8 boxes and arrows.', '(2) Give them 3 mini-cases (like Diagnostic Q3) and ask: "Which step\'s output was missing/defective?" (3) Make them.', 'Because recruitment creates pool, selection can choose...', 'Because selection picks best-fit, placement can assign..." This forces active reconstruction of the logic, not rote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_003', difficulty: 'standard',
          question: 'Human Resource Management (HRM) is the strategic and specialized function.',
          hint: 'Revisit the staffing process steps (c12_bs_cbse_06_002) and identify which steps are.',
          misconception: 'Students often think HRM is only about hiring and firing (recruitment and termination).',
          parts: [
                { id: 'a', prompt: 'Explain why staffing is considered both a \'line function\' and a \'staff function\' in an organization.', answer: 'Correct answer: Staffing is a line function',
                  options: ['Correct answer: Staffing is a line function', 'only HR does staffing', 'only managers do staffing', 'says "only HR does staffing" ignores the line manager\'s direct responsibility'],
                  hint: 'Revisit the staffing process steps (c12_bs_cbse_06_002) and identify which steps are performed.',
                  misconception: 'Students often think HRM is only about hiring and firing (recruitment and termination).' }
          ],
            remediations: { 'hrm-is-only-about-hiring': { steps: ['Have the student list all eight HRM duties from the NCERT text (recruitment, job analysis, compensation, training.', 'For each duty, ask them to give a one-sentence example of what happens if that duty is neglected (e.g., no job analysis.', 'Ask them to explain how Infosys putting human resources on the balance sheet reflects the strategic shift from \'cost\'.', 'Re-test with Diagnostic Question 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_004', difficulty: 'standard',
          question: 'Recruitment is the process of identifying, attracting, and stimulating.',
          hint: 'If unsure about staffing process steps, revisit c12_bs_cbse_06_002 (Staffing Process.',
          misconception: 'Students often think "recruitment = hiring" and use the terms recruitment, selection, and placement interchangeably.',
          parts: [
                { id: 'a', prompt: 'A manufacturing company needs to fill 20 vacancies for unskilled loader positions urgently due to a sudden export order.', answer: 'This is Direct Recruitment (an external source)',
                  options: ['This is Direct Recruitment (an external source)', 'campus recruitment', 'employment exchange', 'recruitment = hiring'],
                  hint: 'If unsure about staffing process steps, revisit c12_bs_cbse_06_002 (Staffing Process: Steps.',
                  misconception: 'Students often think "recruitment = hiring" and use the terms recruitment, selection, and placement interchangeably.' },
                { id: 'b', prompt: '"Internal sources of recruitment are always better because they are cheaper and motivate employees." Critically evaluate this statement using at least three.', answer: 'The statement is false',
                  options: ['The statement is false', 'recruitment = hiring'],
                  hint: 'If unsure about staffing process steps, revisit c12_bs_cbse_06_002 (Staffing Process: Steps.',
                  misconception: 'Students often think "recruitment = hiring" and use the terms recruitment, selection, and placement interchangeably.' },
                { id: 'c', prompt: 'Compare campus recruitment and employment exchange as sources for hiring a Software Engineer vs a Machine Operator. Which source fits which role?', answer: 'Campus recruitment fits Software Engineer: NCERT states it is for "technical,',
                  options: ['Campus recruitment fits Software Engineer: NCERT states it is for "technical,', 'recruitment = hiring'],
                  hint: 'If unsure about staffing process steps, revisit c12_bs_cbse_06_002 (Staffing Process: Steps.',
                  misconception: 'Students often think "recruitment = hiring" and use the terms recruitment, selection, and placement interchangeably.' }
          ],
            remediations: { 'recruitment-hiring-and-use-the': { steps: ['If the student confuses recruitment with selection/placement: (1) Make a three-column table: Recruitment | Selection |.', '(2) In column 1, list NCERT recruitment activities: identifying sources, advertising, stimulating applications.', 'In column 2: screening, tests, interviews, medical exam, job offer.', 'In column 3: orientation, assigning specific post.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_005', difficulty: 'standard',
          question: 'Internal sources of recruitment refer to filling job vacancies from within the.',
          hint: 'If stuck, revisit c12_bs_cbse_06_004 (Recruitment: Meaning and Sources) and create a mind.',
          misconception: 'Students often believe that internal recruitment is always superior because it is cheaper and motivates employees.',
          parts: [
                { id: 'a', prompt: 'List the two internal sources of recruitment mentioned in the NCERT textbook for Class 12 Business Studies.', answer: 'The two internal sources are transfers and promotions',
                  options: ['The two internal sources are transfers and promotions', 'advertisement and campus recruitment'],
                  hint: 'If stuck, revisit c12_bs_cbse_06_004 (Recruitment: Meaning and Sources) and create a mind map.',
                  misconception: 'Students often believe that internal recruitment is always superior because it is cheaper and motivates employees, while external.' },
                { id: 'b', prompt: 'Explain in your own words why internal recruitment is considered more economical than external recruitment.', answer: 'Internal recruitment is more economical',
                  options: ['Internal recruitment is more economical', 'it is cheaper'],
                  hint: 'If stuck, revisit c12_bs_cbse_06_004 (Recruitment: Meaning and Sources) and create a mind map.',
                  misconception: 'Students often believe that internal recruitment is always superior because it is cheaper and motivates employees, while external.' },
                { id: 'c', prompt: 'A company has a surplus of 20 employees in its accounting department and a shortage of 15 employees in its payroll department.', answer: 'Transfers would be most suitable',
                  options: ['Transfers would be most suitable', 'promotions'],
                  hint: 'If stuck, revisit c12_bs_cbse_06_004 (Recruitment: Meaning and Sources) and create a mind map.',
                  misconception: 'Students often believe that internal recruitment is always superior because it is cheaper and motivates employees, while external.' }
          ],
            remediations: { 'internal-recruitment-is-always-superior': { steps: ['If the student exhibits the above misconception, do the following: (1) Ask them to re-read the "Limitations of Internal.', '(2) Have them create a 2x2 matrix: rows = Internal/External, columns = Merits/Limitations, filling each cell with.', '(3) Give them three mini-cases: (a) A new company hiring its first 5 employees; (b) A seasonal retailer needing 100.', 'For each, they must choose the best source and justify using the matrix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_06_006', difficulty: 'standard',
          question: 'Selection is the systematic process of evaluating and choosing the most.',
          hint: 'Revisit c12_bs_cbse_06_004 (Recruitment) and c12_bs_cbse_06_002 (Staffing Process).',
          misconception: 'Students often believe the selection process ends when the interview is over.',
          parts: [
                { id: 'a', prompt: 'What is the first step in the selection process after applications have been received?', answer: 'Preliminary screening is the first step',
                  options: ['Preliminary screening is the first step', 'employment interview', 'selection tests', 'you\'re hired!'],
                  hint: 'Revisit c12_bs_cbse_06_004 (Recruitment) and c12_bs_cbse_06_002 (Staffing Process) to clarify the.',
                  misconception: 'Students often believe the selection process ends when the interview is over.' },
                { id: 'b', prompt: 'Why is preliminary screening conducted before selection tests, even though tests provide more detailed information about candidates?', answer: 'Preliminary screening is a low-cost, high-volume filter that eliminates clearly',
                  options: ['Preliminary screening is a low-cost, high-volume filter that eliminates clearly', 'tests are more accurate so should come first', 'you\'re hired!', 'selection decision'],
                  hint: 'Revisit c12_bs_cbse_06_004 (Recruitment) and c12_bs_cbse_06_002 (Staffing Process) to clarify the.',
                  misconception: 'Students often believe the selection process ends when the interview is over.' },
                { id: 'c', prompt: 'A company hiring for a senior accountant position receives 200 applications. After preliminary screening, 40 candidates remain.', answer: 'Step: Selection Tests',
                  options: ['Step: Selection Tests', 'aptitude tests', 'you\'re hired!', 'selection decision'],
                  hint: 'Revisit c12_bs_cbse_06_004 (Recruitment) and c12_bs_cbse_06_002 (Staffing Process) to clarify the.',
                  misconception: 'Students often believe the selection process ends when the interview is over.' }
          ],
            remediations: { 'the-selection-process-ends-when': { steps: ['If the student cannot sequence the steps correctly: (1) Have them create a physical flowchart using sticky notes — one.', '(2) For each step, ask: "What specific information does this step generate that the previous step did not?" (3) If they.', '(4) Re-diagnose with Diagnostic Question 5 to check legal/sequence understanding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
