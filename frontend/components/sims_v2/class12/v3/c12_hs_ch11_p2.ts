import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch11_p2: SimDef = {
    id: 'v3_c12_hs_ch11_p2',
    title: 'Resource Management · Part 2/2',
    subtitle: 'Her degree is hers; the salary is the family\'s',
    classLevel: 12, subject: 'home_science', topic: 'Resource Management · Part 2/2',
    chapters: ['c12_hs_ch11'],
    nodeIds: ['c12_hs_cbse_11_007', 'c12_hs_cbse_11_008', 'c12_hs_cbse_11_009', 'c12_hs_cbse_11_010', 'c12_hs_cbse_11_011', 'c12_hs_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Resource analyst', intro: 'A family\'s real wealth isn\'t in the bank — it\'s in skills, time, energy and shared things nobody itemised.', goal: 'Classify family resources and run the five-step management cycle on a concrete household goal.' },
    discovery: {
        question: 'A mother\'s nursing degree and a family\'s car are both \'resources\' — but which can the family actually share, and which lives only in one person?',
        options: ['The skill is individual, the car shared — the qualification stays in her body though its salary becomes family money; the resource and its output aren\'t the same thing', 'Both are shared', 'The car is individual', 'Degrees transfer'],
        answer: 'The skill is individual, the car shared — the qualification stays in her body though its salary becomes family money; the resource and its output aren\'t the same thing',
        hook: 'Resources aren\'t just money and time — skills, energy, a community park all count. Interchangeable doesn\'t mean manageable: a park substitutes for a garden but nobody controls its hours; money can buy time, but time can\'t store itself.',
    },
    teaching: [
        { title: 'Savings and Investment: Avenues and Principles of Sound Investment', text: 'Savings refer to the portion of income not spent on current consumption, set aside for future use, typically held in low-risk, liquid instruments.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map a household\'s true wealth: classify resources across human/non-human and individual/shared/natural/community, then run a 20% electricity cut through all five management steps.',
        labels: ['Savings and Investment: Avenues', 'Energy Management: Work Simplification', 'Housing: Selection of House', 'Furniture and Furnishings: Selection', 'Management of Family Crises', 'Role of Homemaker: Changing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_007', title: 'Savings and Investment: Avenues and Principles of Sound Investment',
          caseStudy: { intro: 'Imagine your family has ₹50,000 left after monthly expenses and wants to grow this money for your younger sibling\'s college education in 5 years.',
            decisions: [{ prompt: 'What is the fundamental difference between savings and investment in terms of risk and purpose?', options: [
                { text: 'Savings are low-risk funds set aside for short-term needs or emergencies, typically kept', outcome: 'Savings are low-risk funds set aside for short-term needs or emergencies, typically kept in highly.' },
                { text: 'savings and investment are the same thing', outcome: 'Not quite — Students often think "savings and investment are the same thing" or "investment is only for the.', reveals: 'savings-and-investment-are-the' },
                { text: 'investment is only for the rich', outcome: 'Not quite — Students often think "savings and investment are the same thing" or "investment is only for the.', reveals: 'savings-and-investment-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_008', title: 'Energy Management: Work Simplification and Ergonomic Principles',
          caseStudy: { intro: 'Imagine you spend 45 minutes every morning preparing breakfast and packing lunches — standing continuously, stretching to top shelves, walking back-and-forth.',
            decisions: [{ prompt: 'Define "work simplification" and name the three levels of change through which it can be achieved, as classified in Home Science.', options: [
                { text: 'Work simplification is the deliberate reduction of effort, time, and motions needed to', outcome: 'Work simplification is the deliberate reduction of effort, time, and motions needed to complete.' },
                { text: 'doing work faster', outcome: 'Not quite — Students believe "work simplification = doing less work or being lazy" and "ergonomics = buying.', reveals: 'work-simplification-doing-less-work' },
                { text: 'work simplification = doing less work or being lazy', outcome: 'Not quite — Students believe "work simplification = doing less work or being lazy" and "ergonomics = buying.', reveals: 'work-simplification-doing-less-work' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_009', title: 'Housing: Selection of House and Space Planning Principles',
          caseStudy: { intro: 'Imagine your family is visiting a housing exhibition where three very different flats are on display: one faces west with large windows but.',
            decisions: [{ prompt: 'List four site-related factors that must be checked before finalising a house purchase.', options: [
                { text: 'Correct answer: (1) Soil bearing capacity and drainage, (2) Orientation relative to sun', outcome: 'Correct answer: (1) Soil bearing capacity and drainage, (2) Orientation relative to sun path and.' },
                { text: 'location, price, size, neighbours', outcome: 'Not quite — Students often believe "space planning = furniture arrangement".', reveals: 'space-planning-furniture-arrangement' },
                { text: 'space planning = furniture arrangement', outcome: 'Not quite — Students often believe "space planning = furniture arrangement".', reveals: 'space-planning-furniture-arrangement' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_010', title: 'Furniture and Furnishings: Selection Criteria and Arrangement',
          caseStudy: { intro: 'Imagine you are helping a family furnish their new 2BHK apartment on a modest budget.',
            decisions: [{ prompt: 'List four essential criteria for selecting a sofa for a family with young children and a pet dog.', options: [
                { text: 'Correct answer: 1) Durable, stain-resistant fabric (e.g., microfiber, leatherette) that', outcome: 'Correct answer: 1) Durable, stain-resistant fabric (e.g., microfiber, leatherette) that withstands.' },
                { text: 'color matching the curtains', outcome: 'Not quite — Students often treat furniture selection as a purely aesthetic exercise — choosing pieces that.', reveals: 'students-often-treat-furniture-selection' },
                { text: 'low price', outcome: 'Not quite — Students often treat furniture selection as a purely aesthetic exercise — choosing pieces that.', reveals: 'students-often-treat-furniture-selection' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_011', title: 'Management of Family Crises: Types and Coping Strategies',
          caseStudy: { intro: 'Imagine you check into a hotel after a long train journey: the doorman greets you, the receptionist checks you in quickly, your room is spotless with fresh.',
            decisions: [{ prompt: 'List the four stages of the guest cycle in correct sequential order.', options: [
                { text: 'Correct sequence: 1) Pre-arrival, 2) Arrival, 3) Occupancy, 4) Departure', outcome: 'Correct sequence: 1) Pre-arrival, 2) Arrival, 3) Occupancy, 4) Departure.' },
                { text: 'Housekeeping only cleans rooms', outcome: 'Not quite — Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.”.', reveals: 'housekeeping-only-cleans-rooms-and' },
                { text: 'housekeeping provides food to customers', outcome: 'Not quite — Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.”.', reveals: 'housekeeping-only-cleans-rooms-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_012', title: 'Role of Homemaker: Changing Perspectives and Shared Responsibility',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, observing her mother manage the household while working full-time — cooking, budgeting, coordinating repairs, caring for.',
            decisions: [{ prompt: 'Define "non-SNA production work" in the context of household management and give two examples from a typical Indian household.', options: [
                { text: 'Non-SNA production work refers to unpaid activities that produce goods or services for', outcome: 'Non-SNA production work refers to unpaid activities that produce goods or services for.' },
                { text: 'work done by a maid', outcome: 'Not quite — Students equate "shared responsibility" with "men doing half the cooking/cleaning" — a task-level.', reveals: 'students-equate-shared-responsibility-with' },
                { text: 'paid tutoring', outcome: 'Not quite — Students equate "shared responsibility" with "men doing half the cooking/cleaning" — a task-level.', reveals: 'students-equate-shared-responsibility-with' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Resource Management · Part 2/2', spots: [
            { id: 's1', label: 'Housing Selection of House and Space Planning Principles', prompt: 'Which idea is this? — Housing selection involves evaluating a residential property based on site.', answer: 'Housing Selection of House and Space Planning Principles', options: ['Housing Selection of House and Space Planning Principles', 'Furniture and Furnishings Selection Criteria and Arrangement', 'Management of Family Crises Types and Coping Strategies'] },
            { id: 's2', label: 'Furniture and Furnishings Selection Criteria and Arrangement', prompt: 'Which idea is this? — Furniture and furnishings selection criteria and arrangement refers to the systematic.', answer: 'Furniture and Furnishings Selection Criteria and Arrangement', options: ['Furniture and Furnishings Selection Criteria and Arrangement', 'Housing Selection of House and Space Planning Principles', 'Management of Family Crises Types and Coping Strategies'] },
            { id: 's3', label: 'Management of Family Crises Types and Coping Strategies', prompt: 'Which idea is this? — Hospitality Management is the professional practice of overseeing the operational.', answer: 'Management of Family Crises Types and Coping Strategies', options: ['Management of Family Crises Types and Coping Strategies', 'Housing Selection of House and Space Planning Principles', 'Furniture and Furnishings Selection Criteria and Arrangement'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At your internship in a 40-room guesthouse, a corporate client checks in at noon and finds the room still uncleaned — the previous guest left at 8 AM. The supervisor shrugs: \'housekeeping cleans when they notice a room is empty.\'',
            decisions: [{ prompt: 'What mechanism was missing?', options: [
                { text: 'The control-desk relay — front office should push departure info to housekeeping\'s desk control, which assigns an attendant, then the floor supervisor inspects and hands the room back for resale; \'cleaning when noticed\' skips the information system entirely.', outcome: 'The chapter\'s point: housekeeping isn\'t reactive labour — it\'s a coordinated loop keyed to the guest cycle; the uncleaned room is a communication failure, not a cleaning failure.' },
                { text: 'The room attendant slacked — a stricter supervisor on rounds would fix it.', outcome: 'The chain broke upstream: the attendant was never told the room was vacant; supervision polices work that\'s been assigned, it can\'t replace the front-office-to-desk-control handoff that assigns it.', reveals: 'supervision-replaces-system' },
                { text: 'Just hire more cleaners — idle staff would have caught it.', outcome: 'Adding labour to a broken relay adds cost, not signal; the chapter\'s staffing math assumes work flows through the desk — headcount can\'t substitute for the missing information.', reveals: 'more-staff-equals-coverage' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_012', title: 'You made it',
          caseStudy: { intro: 'You can now inventory a family\'s real assets — and see why the scarcest resource is often the one nobody counted.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_007', difficulty: 'standard',
          question: 'Savings refer to the portion of income not spent on current consumption, set.',
          hint: 'If stuck, review c11_hs_cbse_10_010 (Investment definition and principles) and.',
          misconception: 'Students often think "savings and investment are the same thing" or "investment is only for the rich." They also.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Savings refer to the portion of income not spent on current consumption, set aside for',
                  options: ['Savings refer to the portion of income not spent on current consumption, set aside for', 'Family Resource Management is the systematic process of planning, organizing,', 'Hospitality management is the systematic coordination of human resources (staff across', 'The management process in family resource management is a systematic, cyclic sequence of'],
                  hint: 'If stuck, review c11_hs_cbse_10_010 (Investment definition and principles) and c11_hs_cbse_10_011.',
                  misconception: 'Students often think "savings and investment are the same thing" or "investment is only for the rich." They also believe "higher return.' }
          ],
            remediations: { 'savings-and-investment-are-the': { steps: ['If the student confuses savings with investment or chases returns without considering risk, follow these steps: 1).', '2) Create a two-column table: "Savings" vs "Investment" with parameters: purpose, risk, liquidity, return, examples.', '3) Take a family scenario (e.g., ₹10,000 monthly surplus) and ask the student to allocate for 3 goals: emergency (1.', '4) For each goal, have them pick one avenue and justify using safety, liquidity, return, time horizon.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "savings and investment are the same thing" or "investment is only for the rich." They also.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The best investment is the one with the highest return." Use principles of sound investment to justify your answer.', answer: 'The statement ignores safety, liquidity, time horizon, and tax efficiency',
                  options: ['The statement ignores safety, liquidity, time horizon, and tax efficiency', 'savings and investment are the same thing', 'investment is only for the rich', 'higher return always means better investment'],
                  hint: 'If stuck, review c11_hs_cbse_10_010 (Investment definition and principles) and c11_hs_cbse_10_011.',
                  misconception: 'Students often think "savings and investment are the same thing" or "investment is only for the rich." They also believe "higher return.' }
          ],
            remediations: { 'savings-and-investment-are-the': { steps: ['If the student confuses savings with investment or chases returns without considering risk, follow these steps: 1).', '2) Create a two-column table: "Savings" vs "Investment" with parameters: purpose, risk, liquidity, return, examples.', '3) Take a family scenario (e.g., ₹10,000 monthly surplus) and ask the student to allocate for 3 goals: emergency (1.', '4) For each goal, have them pick one avenue and justify using safety, liquidity, return, time horizon.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_008', difficulty: 'standard',
          question: 'Energy Management in Home Science refers to the systematic planning and control.',
          hint: 'Re-read the "Work Simplification: Three Levels of Change" section in Class 11 Chapter 4.',
          misconception: 'Students believe "work simplification = doing less work or being lazy" and "ergonomics = buying fancy equipment".',
          parts: [
                { id: 'a', prompt: 'A student says: "Ergonomics just means buying an expensive chair with lumbar support." Explain why this statement is incomplete and give two specific ergonomic.', answer: 'Ergonomics is the holistic fit between person, task, tool, and environment',
                  options: ['Ergonomics is the holistic fit between person, task, tool, and environment', 'equipment-only', 'work simplification = doing less work or being lazy', 'ergonomics = buying fancy equipment'],
                  hint: 'Re-read the "Work Simplification: Three Levels of Change" section in Class 11 Chapter 4 (Resource.',
                  misconception: 'Students believe "work simplification = doing less work or being lazy" and "ergonomics = buying fancy equipment".' }
          ],
            remediations: { 'work-simplification-doing-less-work': { steps: ['If the student holds the above misconception: (1) Have them perform a 5-minute "micro-study": time themselves making.', '(2) Revisit c11_hs_cbse_07_011 (Three Levels of Change) and c11_hs_cbse_04_012 (Energy Conservation) — specifically the.', '(3) Re-do Diagnostic Question 3 with the sandwich task as context, forcing identification of all three levels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_009', difficulty: 'standard',
          question: 'Housing selection involves evaluating a residential property based on site.',
          hint: 'If unable to zone a plan, revisit c11_hs_cbse_07_010 and practice colour-coding.',
          misconception: 'Students often believe "space planning = furniture arrangement".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the orientation of a house matters for natural lighting and ventilation in the Indian context.', answer: 'Correct answer: In India, the sun traverses the southern sky',
                  options: ['Correct answer: In India, the sun traverses the southern sky', 'orientation doesn\'t matter', 'space planning = furniture arrangement', '"space planning = furniture arrangement"'],
                  hint: 'If unable to zone a plan, revisit c11_hs_cbse_07_010 and practice colour-coding activities.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' },
                { id: 'b', prompt: 'Compare two house plans for a family of four: Plan A has a long central corridor connecting all rooms; Plan B uses a central living area as the circulation hub.', answer: 'Correct answer: Plan B is superior',
                  options: ['Correct answer: Plan B is superior', 'corridors provide privacy', 'space planning = furniture arrangement', '"space planning = furniture arrangement"'],
                  hint: 'If unable to zone a plan, revisit c11_hs_cbse_07_010 and practice colour-coding activities.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' }
          ],
            remediations: { 'space-planning-furniture-arrangement': { steps: ['Revisit c11_hs_cbse_07_010 (Space Management: Principles of Space Planning for Homes) — re-read the definitions.', 'Take a simple floor plan (e.g., your own home) and colour-code the four zones (social, private, service, transition).', 'Trace daily movement paths (wake up → bathroom → kitchen → dining → work) with a red pen; identify bottlenecks or zone.', 'Re-attempt Diagnostic Question 3 and 4, this time explicitly naming the principle violated in each step.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_010', difficulty: 'standard',
          question: 'Furniture and furnishings selection criteria and arrangement refers to the.',
          hint: 'If stuck, go back to c12_hs_cbse_11_009 and practice drawing a furniture layout to scale.',
          misconception: 'Students often treat furniture selection as a purely aesthetic exercise — choosing pieces that "look nice" or "match.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Furniture and furnishings selection criteria and arrangement refers to the systematic',
                  options: ['Furniture and furnishings selection criteria and arrangement refers to the systematic', 'Family Resource Management is the systematic process of planning, organizing,', 'Hospitality management is the systematic coordination of human resources (staff across', 'The management process in family resource management is a systematic, cyclic sequence of'],
                  hint: 'If stuck, go back to c12_hs_cbse_11_009 and practice drawing a furniture layout to scale for a 3.',
                  misconception: 'Students often treat furniture selection as a purely aesthetic exercise — choosing pieces that "look nice" or "match the curtains" — while.' }
          ],
            remediations: { 'students-often-treat-furniture-selection': { steps: ['Revisit c12_hs_cbse_11_009 (Space Planning) and practice drawing three different scaled layouts for the same room, each.', 'Review c12_hs_cbse_11_008 (Ergonomics) and measure your own chair/desk dimensions; compare with standard anthropometric.', 'Use a checklist for every furniture decision: Function?', 'If any criterion is unanswered, the selection is incomplete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_011', difficulty: 'standard',
          question: 'Hospitality Management is the professional practice of overseeing the.',
          hint: 'Revisit c12_hs_cbse_11_003 (Management Process) and write out the.',
          misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality.',
          parts: [
                { id: 'a', prompt: 'List the four stages of the guest cycle in correct sequential order.', answer: 'Correct sequence: 1) Pre-arrival, 2) Arrival, 3) Occupancy, 4) Departure',
                  options: ['Correct sequence: 1) Pre-arrival, 2) Arrival, 3) Occupancy, 4) Departure', 'Housekeeping only cleans rooms', 'housekeeping provides food to customers'],
                  hint: 'Revisit c12_hs_cbse_11_003 (Management Process) and write out the.',
                  misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality, housekeeping maintains public.' },
                { id: 'b', prompt: 'A guest calls the front desk at 2 AM requesting a room change due to a noisy air conditioner.', answer: 'Bellboys (uniformed services under front office) move luggage',
                  options: ['Bellboys (uniformed services under front office) move luggage', 'housekeeping moves luggage', 'front office does everything', 'Housekeeping only cleans rooms'],
                  hint: 'Revisit c12_hs_cbse_11_003 (Management Process) and write out the.',
                  misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality, housekeeping maintains public.' },
                { id: 'c', prompt: 'Compare the organisational hierarchy of the front office (Fig. 17.3) and housekeeping (Fig. 17.6).', answer: 'Front office: Front Office Supervisor (shift-level) coordinates 24/7',
                  options: ['Front office: Front Office Supervisor (shift-level) coordinates 24/7', 'Front Office Manager', 'Executive Housekeeper', 'Housekeeping only cleans rooms'],
                  hint: 'Revisit c12_hs_cbse_11_003 (Management Process) and write out the.',
                  misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality, housekeeping maintains public.' }
          ],
            remediations: { 'housekeeping-only-cleans-rooms-and': { steps: ['If a student cannot distinguish departmental functions, have them create a 3-column table: Department | Primary.', 'Then give them 5 mini-scenarios (e.g., “Guest finds hair on pillow,” “Guest needs taxi at 4 AM,” “Guest wants to book.', 'After they complete this, ask them to explain why the control desk must be 24-hour — if they hesitate, re-read the.', 'This concrete mapping + scenario practice replaces vague memorisation with operational clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_012', difficulty: 'standard',
          question: 'The role of homemaker refers to the multifaceted responsibility of managing.',
          hint: 'If stuck on valuation or time-use analysis, revisit c11_hs_cbse_04_003 (Time and Energy.',
          misconception: 'Students equate "shared responsibility" with "men doing half the cooking/cleaning" — a task-level, gender-swap view.',
          parts: [
                { id: 'a', prompt: 'A family of four (two working parents, two school-going children) decides to redistribute household tasks.', answer: 'Mother\'s current: 4 hrs',
                  options: ['Mother\'s current: 4 hrs', 'father cooks dinner'],
                  hint: 'If stuck on valuation or time-use analysis, revisit c11_hs_cbse_04_003 (Time and Energy.',
                  misconception: 'Students equate "shared responsibility" with "men doing half the cooking/cleaning" — a task-level, gender-swap view.' }
          ],
            remediations: { 'students-equate-shared-responsibility-with': { steps: ['Revisit c11_hs_cbse_04_002 (Human Resources: Knowledge, Motivation, Skills, Aptitude) and c11_hs_cbse_04_003 (Time and.', 'Re-do Diagnostic Question 3 with a 3-day time-use diary for your own family; code each activity using the ICATUS.', 'Watch the 15-min video "Who Does the Dishes?', 'The Mental Load" (The Swaddle) and map its concepts to the management functions (planning, organising, controlling).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
