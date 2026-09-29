import type { SimDef } from '../../engine/types';
import C12_CommerceDirectingMeaningImportanceSim from '../../../simulations/c6_12/C12_CommerceDirectingMeaningImportanceSim';

/** v3 wrapped master — C12_CommerceDirectingMeaningImportanceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_commercedirectingmeaningimportancesim: SimDef = {
    id: 'v3w_c12_commercedirectingmeaningimportancesim',
    title: 'Directing: Meaning, Nature and Importance',
    subtitle: 'This node covers the meaning, characteristics, importance, and principles of directing as.',
    classLevel: 12, subject: 'business_studies', topic: 'Directing: Meaning, Nature and Importance',
    chapters: [],
    nodeIds: ['c12_bs_cbse_07_001', 'c12_bs_cbse_07_003', 'c12_bs_cbse_07_007', 'c12_bs_cbse_01_001', 'c12_bs_cbse_01_008', 'c12_bs_cbse_05_009', 'c12_bs_cbse_07_006', 'c12_bs_cbse_07_008', 'c12_bs_cbse_01_004', 'c12_bs_cbse_05_001', 'c12_bs_cbse_05_010', 'c12_bs_cbse_06_001', 'c12_bs_cbse_06_007', 'c12_bs_cbse_09_006', 'c12_bs_cbse_05_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the captain of a cricket team: you have a game plan (planning), assigned fielding positions.', goal: 'Master Directing: Meaning, Nature and Importance.' },
    discovery: {
        question: 'Design a mini-case (3-4 sentences) showing a manager applying the principle "Appropriateness of direction technique" for two employees with different.',
        options: ['Example: "Rohan, a junior analyst, is driven by money', 'give both a bonus', 'Directing = Communication'],
        answer: 'Example: "Rohan, a junior analyst, is driven by money',
        hook: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.',
    },
    teaching: [
        { title: 'Directing is the managerial function of.', text: 'Directing is the managerial function of instructing, guiding, counselling, motivating, and leading people in an organisation to achieve its objectives; it initiates action, flows top-down through the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_07_001', title: 'Directing is the managerial function of.',
          scaffold: { problem: 'A production manager at a textile mill in Surat plans to increase output by 20%.',
            steps: [
            { text: 'Identify the missing function — the manager did planning, organising, staffing, but no one is *guiding, instructing, or.' },
            { text: 'Map characteristic "Directing initiates action" to the problem: Supervisors must give clear start-of-shift instructions.' },
            { text: 'Map "Directing takes place at every level" to the problem: The production manager directs shift-in-charges, who direct.' },
            { text: 'Map "Directing is continuous" to the problem: Supervisors must monitor the floor *throughout the shift*, not just at.' },
            { text: 'Map "Directing flows top-down" to the problem: The manager\'s output target must be translated into specific daily.', faded: true, blankAnswer: 'The missing function is directing. Its four characteristics.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_07_003', title: 'Supervision is the process of.',
          scaffold: { problem: 'At "Precision Tools Pvt. Ltd." (Pune), a supervisor manages 18 CNC machine operators across two shifts.',
            steps: [
            { text: 'Identify the root causes — skipped protocol (performance standard), absent tool-setter (resource gap), perception of.' },
            { text: 'Map each cause to NCERT importance points: scrap rate → point (iv) ensures performance; skipped protocol → point (v).' },
            { text: 'Design interventions: (a) Assign a senior operator as "night tool-setter buddy" with 10% allowance — addresses (iv),.' },
            { text: 'Set measurable checkpoints: daily scrap % tracking, weekly night-shift feedback huddle, monthly tool-setter hiring.' },
            { text: 'Verify alignment — every intervention maps to at least one importance point; no point is left unaddressed; plan is.', faded: true, blankAnswer: '4-step plan: (1) Diagnose root causes across technical,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_07_007', title: 'Motivation is the process of.',
          scaffold: { problem: 'Ravi, a factory worker, has been with the company for 5 years.',
            steps: [
            { text: 'Identify the needs involved: higher salary addresses physiological and safety needs; staying with friends/community.' },
            { text: 'Recall Maslow\'s hierarchy order: physiological → safety → affiliation → esteem → self-actualization.' },
            { text: 'Note that Ravi already has his physiological and safety needs met (he has a stable job for 5 years).' },
            { text: 'According to Maslow, once lower needs are reasonably satisfied, higher needs become the motivators.' },
            { text: 'Conclude that affiliation/belonging needs (level 3) are the dominant motivator here, overriding the incremental gain in.' },
            { text: 'Explain that this illustrates Maslow\'s assumption that a satisfied lower need no longer motivates as strongly as an.', faded: true, blankAnswer: 'Affiliation/belonging needs (Level 3) are the primary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_01_001', title: 'Management is the process of planning,.',
          scaffold: { problem: 'Ravi runs a small bakery in Pune. Last month he baked 2,000 loaves of bread (target: 2,000) but used 550 kg of flour against a standard of.',
            steps: [
            { text: 'Recall NCERT definitions — Effectiveness = achieving goals (target met?); Efficiency = minimum resource use for given.' },
            { text: 'Analyse Month 1 — Output: 2,000 loaves = target met → **Effective**.' },
            { text: 'Analyse Month 2 — Output: 1,800 loaves < 2,000 target → **Not Effective**.' },
            { text: 'Compare — Month 1: Effective, Not Efficient (like NCERT\'s power-failure example).' },
            { text: 'Conclusion — Neither month is ideal. Better management = Month 1 *if* efficiency improves next month (since.', faded: true, blankAnswer: 'Month 1 — Effective, Not Efficient. Month 2 — Not.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_01_008', title: 'Coordination is the process of.',
          scaffold: { problem: '"GreenFields Agro Ltd." produces organic fertilizers. The Production department plans to manufacture 10,000 bags in October.',
            steps: [
            { text: 'Identify each department\'s action and its basis (Production: plan; Purchase: outdated data; Sales: market demand;.' },
            { text: 'Map each failure to a coordination characteristic. Purchase vs Production → violates "integrates group efforts".' },
            { text: 'Explain consequence: raw material shortage halts production at 8,000 bags; 4,000 bags of confirmed orders unfulfilled →.' },
            { text: 'Propose a coordination mechanism: Monthly Sales & Operations Planning (S&OP) meeting where all four departments.' },
            { text: 'Verify mechanism addresses all four characteristics: integrates efforts (joint plan), unity of action (single target),.', faded: true, blankAnswer: 'Coordination failures: (i) Purchase-Production: lacks.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_05_009', title: 'Delegation is the process by which a.',
          scaffold: { problem: 'In a mid-sized textile firm in Surat, the General Manager (GM) delegates the task of "negotiating raw cotton purchase contracts up to ₹50.',
            steps: [
            { text: 'Identify the delegation act: GM delegated authority to negotiate contracts up to ₹50 lakh (authority limit defined).' },
            { text: 'Check parity: Responsibility (negotiate contracts) was matched with authority (up to ₹50 lakh) — parity exists within.' },
            { text: 'Identify violation: PM exceeded delegated authority (₹60 lakh > ₹50 lakh). This is ultra vires (beyond authority).' },
            { text: 'Determine accountability: GM remains accountable to the company for the PM\'s actions because accountability cannot be.' },
            { text: 'Conclude: GM cannot escape accountability by blaming PM. The contract may be voidable due to excess authority, but GM.', faded: true, blankAnswer: 'The GM is accountable to the company; the PM acted beyond.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_07_003', title: 'Identify each idea',
          dissect: { specimen: 'Directing: Meaning, Nature and Importance', spots: [
            { id: 's1', label: 'Directing is the managerial function', prompt: 'Which idea is this? — Directing is the managerial function of instructing, guiding, counselling, motivating,.', answer: 'Directing is the managerial function', options: ['Directing is the managerial function', 'Supervision is the process of', 'Motivation is the process of', 'Management is the process of'] },
            { id: 's2', label: 'Supervision is the process of', prompt: 'Which idea is this? — Supervision is the process of overseeing, guiding, and directing the efforts of employees.', answer: 'Supervision is the process of', options: ['Supervision is the process of', 'Directing is the managerial function', 'Motivation is the process of', 'Management is the process of'] },
            { id: 's3', label: 'Motivation is the process of', prompt: 'Which idea is this? — Motivation is the process of stimulating people to action to accomplish desired.', answer: 'Motivation is the process of', options: ['Motivation is the process of', 'Directing is the managerial function', 'Supervision is the process of', 'Management is the process of'] },
            { id: 's4', label: 'Management is the process of', prompt: 'Which idea is this? — Management is the process of planning, organising, staffing, directing, and controlling.', answer: 'Management is the process of', options: ['Management is the process of', 'Directing is the managerial function', 'Supervision is the process of', 'Motivation is the process of'] },
            { id: 's5', label: 'Coordination is the process of', prompt: 'Which idea is this? — Coordination is the process of synchronizing the activities of different departments,.', answer: 'Coordination is the process of', options: ['Coordination is the process of', 'Directing is the managerial function', 'Supervision is the process of', 'Motivation is the process of'] },
            { id: 's6', label: 'Delegation is the process by', prompt: 'Which idea is this? — Delegation is the process by which a manager (superior) transfers authority to a.', answer: 'Delegation is the process by', options: ['Delegation is the process by', 'Directing is the managerial function', 'Supervision is the process of', 'Motivation is the process of'] }
          ] } }
    ],
    explore: { component: C12_CommerceDirectingMeaningImportanceSim, prompt: 'Explore the interactive — Directing: Meaning, Nature and Importance' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_001', difficulty: 'standard',
          question: 'Directing is the managerial function of instructing, guiding, counselling,.',
          hint: 'If stuck, revisit the "Functions of Management" concept from Class 11 (not in provided.',
          misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.',
          parts: [
                { id: 'a', prompt: '"Directing is just another word for giving orders." Explain why this statement is incomplete using two characteristics of directing.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'Directing = Communication'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.' }
          ],
            remediations: { 'directing-communication-because-the-textbook': { steps: ['Re-read the "Meaning" and "Characteristics" paragraphs in NCERT (pages 170-171).', 'Make a two-column table: Column A = "What directing IS" (initiates action, continuous, top-down, every level), Column B.', 'For each characteristic, write a 1-line workplace example.', 'Re-attempt Diagnostic Questions 2 and 5 verbally to check if the distinction is clear.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since directing flows top-down, lower-level managers have no role in initiating direction; they only pass orders down."', answer: 'The statement is false',
                  options: ['The statement is false', 'Directing = Communication'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.' },
                { id: 'b', prompt: 'Design a mini-case (3-4 sentences) showing a manager applying the principle "Appropriateness of direction technique" for two employees with different.', answer: 'Example: "Rohan, a junior analyst, is driven by money',
                  options: ['Example: "Rohan, a junior analyst, is driven by money', 'give both a bonus', 'Directing = Communication', 'directing is one-size-fits-all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.' }
          ],
            remediations: { 'directing-communication-because-the-textbook': { steps: ['Re-read the "Meaning" and "Characteristics" paragraphs in NCERT (pages 170-171).', 'Make a two-column table: Column A = "What directing IS" (initiates action, continuous, top-down, every level), Column B.', 'For each characteristic, write a 1-line workplace example.', 'Re-attempt Diagnostic Questions 2 and 5 verbally to check if the distinction is clear.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_003', difficulty: 'standard',
          question: 'Supervision is the process of overseeing, guiding, and directing the efforts of.',
          hint: 'Revisit c12_bs_cbse_07_001 "Directing: Meaning, Nature and Importance" — specifically the.',
          misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch.',
          parts: [
                { id: 'a', prompt: 'Compare the supervisor\'s role as a "link between workers and management" (importance point ii) with the communication function (node c12_bs_cbse_07_004).', answer: 'They are distinct',
                  options: ['They are distinct', 'supervision', 'inspection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch mistakes and enforce.' }
          ],
            remediations: { 'students-often-confuse-supervision-with': { steps: ['Re-read the NCERT "Importance of Supervision" section (7 bullet points) and convert each into an active verb phrase:.', 'For each verb, write one concrete workplace action a supervisor in a ₹500 crore auto components factory would do TODAY.', 'Take the diagnostic question 3 scenario and re-solve it by explicitly tagging each action with the corresponding verb.', 'Re-attempt diagnostic question 6 — if you cannot isolate a single failed point, repeat Step 2 with a different industry.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If a supervisor ensures all seven importance points are met, leadership (c12_bs_cbse_07_006) and motivation (c12_bs_cbse_07_007).', answer: 'Refute',
                  options: ['Refute', 'supervision', 'inspection', 'policing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch mistakes and enforce.' },
                { id: 'b', prompt: 'Compare the supervisor\'s role as a "link between workers and management" (importance point ii) with the communication function (node c12_bs_cbse_07_004).', answer: 'They are distinct',
                  options: ['They are distinct', 'supervision', 'inspection', 'policing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch mistakes and enforce.' }
          ],
            remediations: { 'students-often-confuse-supervision-with': { steps: ['Re-read the NCERT "Importance of Supervision" section (7 bullet points) and convert each into an active verb phrase:.', 'For each verb, write one concrete workplace action a supervisor in a ₹500 crore auto components factory would do TODAY.', 'Take the diagnostic question 3 scenario and re-solve it by explicitly tagging each action with the corresponding verb.', 'Re-attempt diagnostic question 6 — if you cannot isolate a single failed point, repeat Step 2 with a different industry.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_007', difficulty: 'standard',
          question: 'Motivation is the process of stimulating people to action to accomplish desired.',
          hint: 'Revisit the \'Elements of Direction\' section in node c12_bs_cbse_07_002 to see where.',
          misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.',
          parts: [
                { id: 'a', prompt: 'A senior accountant rejects a 20% raise to stay in her current role because "I mentor juniors and feel valued here." Using Maslow\'s hierarchy, identify the.', answer: 'The dominant need is *Esteem* (Level 4: recognition, respect, feeling valued)',
                  options: ['The dominant need is *Esteem* (Level 4: recognition, respect, feeling valued)', 'Safety needs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.' },
                { id: 'b', prompt: 'The NCERT motivation process shows: Unsatisfied Need → Tension → Drive → Search Behaviour → Satisfied Need → Tension Reduction.', answer: 'The breakdown occurred at *Satisfied Need → Tension Reduction*',
                  options: ['The breakdown occurred at *Satisfied Need → Tension Reduction*', 'the process ended at satisfaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.' }
          ],
            remediations: { 'students-treat-maslow-s-hierarchy': { steps: ['Re-read the NCERT box "Definitions on Motivation" (Motive vs Motivation vs Motivators) and write your own one-sentence.', 'Draw the motivation process cycle from memory; label each arrow with the *psychological state* (not just the term).', 'Take a recent personal decision (e.g., choosing a college) and map it to Maslow\'s five levels — identify which level.', 'Re-attempt Diagnostic Question 3 and 4; if still stuck, watch a 5-minute video on "Maslow hierarchy regression" to see.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.',
          parts: [
                { id: 'a', prompt: 'The NCERT motivation process shows: Unsatisfied Need → Tension → Drive → Search Behaviour → Satisfied Need → Tension Reduction.', answer: 'The breakdown occurred at *Satisfied Need → Tension Reduction*',
                  options: ['The breakdown occurred at *Satisfied Need → Tension Reduction*', 'the process ended at satisfaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.' }
          ],
            remediations: { 'students-treat-maslow-s-hierarchy': { steps: ['Re-read the NCERT box "Definitions on Motivation" (Motive vs Motivation vs Motivators) and write your own one-sentence.', 'Draw the motivation process cycle from memory; label each arrow with the *psychological state* (not just the term).', 'Take a recent personal decision (e.g., choosing a college) and map it to Maslow\'s five levels — identify which level.', 'Re-attempt Diagnostic Question 3 and 4; if still stuck, watch a 5-minute video on "Maslow hierarchy regression" to see.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_001', difficulty: 'standard',
          question: 'Management is the process of planning, organising, staffing, directing, and.',
          hint: 'Revisit c11_bs_cbse_01_003 (Business Characteristics) and c11_bs_cbse_01_009 (Objectives.',
          misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is.',
          parts: [
                { id: 'a', prompt: 'A factory manager achieves the annual production target of 10,000 units but uses 20% more raw material and 30% more labour hours than the industry standard.', answer: 'The manager is **effective but not efficient**',
                  options: ['The manager is **effective but not efficient**', 'A student who says', 'confuses goal attainment with resource optimisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is efficient." They treat the.' },
                { id: 'b', prompt: 'Smita at Namchi Designer Candles plans a Diwali collection, organises funds and workers, communicates with suppliers, and takes customer feedback — all in one.', answer: 'This illustrates **management is a continuous process**',
                  options: ['This illustrates **management is a continuous process**', 'multidimensional', 'group activity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is efficient." They treat the.' }
          ],
            remediations: { 'students-conflate-efficiency-with-effectiveness': { steps: ['Re-read the NCERT "Effectiveness versus Efficiency" box (page 4-5) and the Smita Rai case.', 'Draw a 2×2 matrix: Effective+Efficient (ideal), Effective+Not Efficient (high cost), Not Effective+Efficient (low cost,.', 'Place the power-failure example in the correct quadrant.', 'Create your own 2-sentence scenario for each quadrant.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is.',
          parts: [
                { id: 'a', prompt: '"Management is an intangible force." Evaluate this statement: Can something intangible be measured?', answer: 'Yes, intangible forces are measured by their *effects*',
                  options: ['Yes, intangible forces are measured by their *effects*', 'management cannot be measured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is efficient." They treat the.' }
          ],
            remediations: { 'students-conflate-efficiency-with-effectiveness': { steps: ['Re-read the NCERT "Effectiveness versus Efficiency" box (page 4-5) and the Smita Rai case.', 'Draw a 2×2 matrix: Effective+Efficient (ideal), Effective+Not Efficient (high cost), Not Effective+Efficient (low cost,.', 'Place the power-failure example in the correct quadrant.', 'Create your own 2-sentence scenario for each quadrant.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_008', difficulty: 'standard',
          question: 'Coordination is the process of synchronizing the activities of different.',
          hint: 'If stuck, revisit c12_bs_cbse_01_004 (Functions of Management) and c12_bs_cbse_01_003.',
          misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together.',
          parts: [
                { id: 'a', prompt: 'Define coordination according to Theo Haimann and explain how it differs from mere cooperation.', answer: 'Theo Haimann defines coordination as "the orderly synchronizing of efforts of',
                  options: ['Theo Haimann defines coordination as "the orderly synchronizing of efforts of', 'coordination means working together willingly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' },
                { id: 'b', prompt: '"Coordination is the essence of management." Explain this statement by linking it to any three managerial functions.', answer: 'Coordination is the essence',
                  options: ['Coordination is the essence', 'coordination means working together willingly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' },
                { id: 'c', prompt: 'A manufacturing company has separate Purchase, Production, and Sales departments.', answer: 'First case violates "Coordination integrates group efforts"',
                  options: ['First case violates "Coordination integrates group efforts"', 'coordination means working together willingly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' }
          ],
            remediations: { 'coordination-is-the-same-as': { steps: ['If the student confuses coordination with cooperation, have them: (1) Re-read the NCERT definitions by Brech,.', '(3) Re-attempt Diagnostic Question 1 and 5.', 'If they still equate the two, revisit c12_bs_cbse_01_004 (Functions of Management) to see how coordination is embedded.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together.',
          parts: [
                { id: 'a', prompt: 'Design a coordination mechanism for a hospital\'s Emergency Department, Radiology, and Pharmacy to reduce patient wait times.', answer: 'Mechanism: (1) Integrates group efforts',
                  options: ['Mechanism: (1) Integrates group efforts', 'coordination means working together willingly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe coordination is the same as cooperation — they write "coordination means working together willingly" in exams.' }
          ],
            remediations: { 'coordination-is-the-same-as': { steps: ['If the student confuses coordination with cooperation, have them: (1) Re-read the NCERT definitions by Brech,.', '(3) Re-attempt Diagnostic Question 1 and 5.', 'If they still equate the two, revisit c12_bs_cbse_01_004 (Functions of Management) to see how coordination is embedded.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_009', difficulty: 'standard',
          question: 'Delegation is the process by which a manager (superior) transfers authority to.',
          hint: 'If stuck, revisit c12_bs_cbse_05_002 (Organising Process) to see how delegation fits into.',
          misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the.',
          parts: [
                { id: 'a', prompt: 'A Production Manager delegates the target of 200 units/day to a Foreman but does not give authority to requisition tools/materials from Stores.', answer: 'No, the Production Manager cannot blame the Foreman',
                  options: ['No, the Production Manager cannot blame the Foreman', 'yes, the Foreman should have asked for authority', 'delegation means the manager is no longer responsible'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the subordinate is.' },
                { id: 'b', prompt: 'Compare and contrast the flow of authority, responsibility, and accountability in delegation.', answer: 'Authority flows downward (superior → subordinate), responsibility flows upward',
                  options: ['Authority flows downward (superior → subordinate), responsibility flows upward', 'accountability flows downward like authority', 'delegation means the manager is no longer responsible'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the subordinate is.' }
          ],
            remediations: { 'delegation-means-the-manager-is': { steps: ['Re-read the NCERT paragraph: "However, delegation does not mean abdication.', 'Draw the delegation triangle: Authority (down) → Responsibility (up) → Accountability (up, non-delegable).', 'Re-attempt Diagnostic Q3 and Q5, forcing yourself to state "Manager retains accountability" in every answer.', 'If still stuck, revisit node c12_bs_cbse_05_008 (Span of Management) to see how delegation creates hierarchy levels,.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Delegation is the basis of management hierarchy." Use the elements of delegation to support your evaluation.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'delegation means the manager is no longer responsible', 'After delegation, the subordinate is accountable', 'the manager shall still be accountable for the performance of the assigned tasks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the subordinate is.' },
                { id: 'b', prompt: 'Compare and contrast the flow of authority, responsibility, and accountability in delegation.', answer: 'Authority flows downward (superior → subordinate), responsibility flows upward',
                  options: ['Authority flows downward (superior → subordinate), responsibility flows upward', 'accountability flows downward like authority', 'delegation means the manager is no longer responsible', 'After delegation, the subordinate is accountable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the subordinate is.' }
          ],
            remediations: { 'delegation-means-the-manager-is': { steps: ['Re-read the NCERT paragraph: "However, delegation does not mean abdication.', 'Draw the delegation triangle: Authority (down) → Responsibility (up) → Accountability (up, non-delegable).', 'Re-attempt Diagnostic Q3 and Q5, forcing yourself to state "Manager retains accountability" in every answer.', 'If still stuck, revisit node c12_bs_cbse_05_008 (Span of Management) to see how delegation creates hierarchy levels,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
