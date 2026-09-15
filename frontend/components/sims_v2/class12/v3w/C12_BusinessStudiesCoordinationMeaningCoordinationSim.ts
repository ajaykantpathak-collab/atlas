import type { SimDef } from '../../engine/types';
import C12_BusinessStudiesCoordinationMeaningCoordinationSim from '../../../simulations/c6_12/C12_BusinessStudiesCoordinationMeaningCoordinationSim';

/** v3 wrapped master — C12_BusinessStudiesCoordinationMeaningCoordinationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_businessstudiescoordinationmeaningcoordinationsim: SimDef = {
    id: 'v3w_c12_businessstudiescoordinationmeaningcoordinationsim',
    title: 'Coordination Meaning Coordination',
    subtitle: 'This node covers the meaning, definitions (Koontz & Weihrich, Trewelly & Newport,.',
    classLevel: 12, subject: 'business_studies', topic: 'Management: Meaning, Definition and Characteristics',
    chapters: [],
    nodeIds: ['c12_bs_cbse_01_001', 'c12_bs_cbse_01_008', 'c12_bs_cbse_05_003', 'c12_bs_cbse_05_005', 'c12_bs_cbse_05_006', 'c12_bs_cbse_05_010', 'c12_bs_cbse_08_001', 'c12_bs_cbse_01_002', 'c12_bs_cbse_01_003', 'c12_bs_cbse_01_004', 'c12_bs_cbse_01_005', 'c12_bs_cbse_01_006', 'c12_bs_cbse_01_007', 'c12_bs_cbse_05_004', 'c12_bs_cbse_02_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are Smita Rai from Namchi Designer Candles — you have 20 women workers, limited funds, a Diwali.', goal: 'Master Coordination Meaning Coordination.' },
    discovery: {
        question: 'A factory manager achieves the annual production target of 10,000 units but uses 20% more raw material and 30% more labour hours than the industry standard.',
        options: ['The manager is **effective but not efficient**', 'A student who says', 'confuses goal attainment with resource optimisation'],
        answer: 'The manager is **effective but not efficient**',
        hook: 'Students conflate **efficiency** with **effectiveness** and write: "If the target is achieved, management is.',
    },
    teaching: [
        { title: 'Management is the process of planning,.', text: 'Management is the process of planning, organising, staffing, directing, and controlling organisational resources (human, financial, physical, and informational) to achieve predetermined goals.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_bs_cbse_05_003', title: 'Organisational structure is the.',
          scaffold: { problem: '"GreenFields Agro Ltd." manufactures fertilizers, seeds, and farm equipment.',
            steps: [
            { text: 'Identify the current structure — functional (departments by function: Production, Marketing, Finance, HR).' },
            { text: 'Identify the pain points — (a) Marketing pushes uniform strategy for diverse products, (b) Production faces conflicting.' },
            { text: 'Map pain points to NCERT disadvantages of functional structure — (a) Functional empires (Marketing dominates), (b).' },
            { text: 'Evaluate divisional structure suitability — (a) Formation: three distinct product lines (fertilizers, seeds,.' },
            { text: 'Recommend divisional structure with three product divisions, each having its own functional units.', faded: true, blankAnswer: 'Switch to divisional structure with three divisions.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_05_005', title: 'Divisional structure is an.',
          scaffold: { problem: '"GreenFields Ltd." started as a single-product company (organic wheat flour) with a functional structure.',
            steps: [
            { text: 'Map each problem to divisional structure advantages — Problem (i) marketing expertise: Divisional structure gives each.' },
            { text: 'Verify against NCERT advantages — All three map directly: "product specialisation", "easy coordination because all.' },
            { text: 'Identify new problem from NCERT disadvantages — "Duplication of activities across products increases expenditure" —.' },
            { text: 'Check for inter-divisional conflict — "Conflict may arise among divisions with reference to allocation of funds" — the.' },
            { text: 'Conclude — Divisional structure solves the three operational problems but introduces higher costs and potential.', faded: true, blankAnswer: 'Yes, divisional structure will solve all three problems via.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_05_006', title: 'Formal organisation is the deliberately.',
          scaffold: { problem: 'A mid-size textile company in Surat has a formal functional structure (Production, Marketing, Finance, HR).',
            steps: [
            { text: 'Identify the formal communication path — it follows the scalar chain through 5 hierarchical levels (Sales Exec →.' },
            { text: 'Identify the informal communication path — it bypasses hierarchy directly between Sales Executives and Floor.' },
            { text: 'Apply "Flow of Communication" basis — formal follows planned route (scalar chain); informal has no planned route, can.' },
            { text: 'Apply "Nature" basis — formal is rigid (fixed hierarchy, prescribed channels); informal is flexible (adapts to personal.' },
            { text: 'Conclude — the informal network here compensates for formal rigidity, but relies on cricket friendships (unstable).', faded: true, blankAnswer: 'Formal communication: 5-level scalar chain, rigid, slow (5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_05_010', title: 'Decentralisation is the systematic.',
          scaffold: { problem: '"GreenFields Agro Ltd." has a centralised structure: the Managing Director approves every fertilizer purchase order above ₹50,000.',
            steps: [
            { text: 'Identify decisions that are strategic (annual budget, vendor empanelment, capital equipment) and keep them at corporate.' },
            { text: 'Identify operational decisions that are time-sensitive and local (routine raw-material orders, emergency pest-control.' },
            { text: 'Define clear financial limits: Regional heads can approve purchase orders up to ₹2,00,000 per transaction without.' },
            { text: 'Establish a reporting mechanism: Regional heads submit weekly purchase dashboards (volume, value, variance) to CFO for.' },
            { text: 'Communicate the policy, train regional heads on vendor evaluation, and set a review date after two quarters to adjust.', faded: true, blankAnswer: 'New policy: Corporate retains vendor empanelment, annual.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Coordination Meaning Coordination', spots: [
            { id: 's1', label: 'Management is the process of', prompt: 'Which idea is this? — Management is the process of planning, organising, staffing, directing, and controlling.', answer: 'Management is the process of', options: ['Management is the process of', 'Coordination is the process of', 'Organisational structure is the framework', 'Divisional structure is an organisational'] },
            { id: 's2', label: 'Coordination is the process of', prompt: 'Which idea is this? — Coordination is the process of synchronizing the activities of different departments,.', answer: 'Coordination is the process of', options: ['Coordination is the process of', 'Management is the process of', 'Organisational structure is the framework', 'Divisional structure is an organisational'] },
            { id: 's3', label: 'Organisational structure is the framework', prompt: 'Which idea is this? — Organisational structure is the framework that defines how activities such as task.', answer: 'Organisational structure is the framework', options: ['Organisational structure is the framework', 'Management is the process of', 'Coordination is the process of', 'Divisional structure is an organisational'] },
            { id: 's4', label: 'Divisional structure is an organisational', prompt: 'Which idea is this? — Divisional structure is an organisational design where the enterprise is divided into.', answer: 'Divisional structure is an organisational', options: ['Divisional structure is an organisational', 'Management is the process of', 'Coordination is the process of', 'Organisational structure is the framework'] },
            { id: 's5', label: 'Formal organisation is the deliberately', prompt: 'Which idea is this? — Formal organisation is the deliberately designed structure of authority-responsibility.', answer: 'Formal organisation is the deliberately', options: ['Formal organisation is the deliberately', 'Management is the process of', 'Coordination is the process of', 'Organisational structure is the framework'] },
            { id: 's6', label: 'Decentralisation is the systematic delegation', prompt: 'Which idea is this? — Decentralisation is the systematic delegation of decision-making authority to the lowest.', answer: 'Decentralisation is the systematic delegation', options: ['Decentralisation is the systematic delegation', 'Management is the process of', 'Coordination is the process of', 'Organisational structure is the framework'] }
          ] } }
    ],
    explore: { component: C12_BusinessStudiesCoordinationMeaningCoordinationSim, prompt: 'Explore the interactive — Coordination Meaning Coordination' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_003', difficulty: 'standard',
          question: 'Organisational structure is the framework that defines how activities such as.',
          hint: 'Revisit c12_bs_cbse_05_002 Step 2 (Departmentalisation) and the example of the school.',
          misconception: 'Students memorise the NCERT comparison table as a list of "functional = good for X, divisional = good for Y" without.',
          parts: [
                { id: 'a', prompt: 'Define organisational structure and state the two broad types of organisational structures discussed in NCERT Class 12 Business Studies Chapter 5.', answer: 'Organisational structure is the framework within',
                  options: ['Organisational structure is the framework within', 'formal and informal', 'centralised and decentralised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the NCERT comparison table as a list of "functional = good for X, divisional = good for Y" without understanding the.' },
                { id: 'b', prompt: 'A company manufactures three product lines: cosmetics, garments, and footwear.', answer: 'Yes, it should switch to divisional structure',
                  options: ['Yes, it should switch to divisional structure', 'divisional is better for large companies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the NCERT comparison table as a list of "functional = good for X, divisional = good for Y" without understanding the.' }
          ],
            remediations: { 'students-memorise-the-ncert-comparison': { steps: ['If a student cannot apply the comparison table to a case, do NOT re-read the table.', 'Instead: (1) Draw two org charts on paper — one functional (MD → Marketing, Finance, Production, HR) and one divisional.', '(2) Pick a decision: "Launch a new shampoo variant." Trace the decision path in both charts — who decides, who.', '(3) Map each step to the NCERT bases: formation, specialisation, responsibility, coordination, cost, managerial.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_005', difficulty: 'standard',
          question: 'Divisional structure is an organisational design where the enterprise is.',
          hint: 'Revisit c12_bs_cbse_05_004 (Functional Structure: Advantages and Disadvantages) —.',
          misconception: 'Students confuse "divisional structure" with "decentralisation" — they think divisional structure IS decentralisation.',
          parts: [
                { id: 'a', prompt: '"In a divisional structure, each division has its own marketing, finance, and production departments." Explain why this statement describes BOTH an advantage.', answer: 'It is an advantage',
                  options: ['It is an advantage', 'divisional structure', 'decentralisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "divisional structure" with "decentralisation" — they think divisional structure IS decentralisation.' },
                { id: 'b', prompt: '"StyleCraft Ltd." manufactures three product lines: ethnic wear, western wear, and accessories. It currently uses a functional structure.', answer: 'Advantages: (1) Product specialisation',
                  options: ['Advantages: (1) Product specialisation', 'divisional structure', 'decentralisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "divisional structure" with "decentralisation" — they think divisional structure IS decentralisation.' }
          ],
            remediations: { 'students-confuse-divisional-structure-with': { steps: ['Re-read NCERT page 117-119 — note the heading "Divisional Structure" describes structural grouping, while page 130-133.', 'Create a 2x2 matrix: rows = Structure (Functional vs Divisional), columns = Decision Authority (Centralised vs.', 'Practice writing the distinction: "Divisional structure groups activities by product; decentralisation disperses.', 'Re-attempt Diagnostic Question 5 — the CFO proposal is about centralising a function WITHIN a divisional structure,.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_006', difficulty: 'standard',
          question: 'Formal organisation is the deliberately designed structure of.',
          hint: 'If unclear on how formal structure gets created, revisit c12_bs_cbse_05_002 (Steps in.',
          misconception: 'Students often believe formal and informal organisation are mutually exclusive — that an employee operates in ONE at a.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Informal organisation has no structure because it has no rules." Explain why this statement is partially correct but misleading, using the.', answer: 'Correct explanation: The statement is misleading',
                  options: ['Correct explanation: The statement is misleading', 'it has no structure at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe formal and informal organisation are mutually exclusive — that an employee operates in ONE at a time.' }
          ],
            remediations: { 'formal-and-informal-organisation-are': { steps: ['If the student cannot distinguish the two on all seven bases, do this 3-step remediation: 1) Re-read the NCERT.', '2) For each base, write ONE real workplace example (e.g., for "Flow of Communication": formal = email chain through.', '3) Take the Diagnostic Questions 3 and 4 again — if still wrong, revisit c12_bs_cbse_05_001 (Organising Meaning) to.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_010', difficulty: 'standard',
          question: 'Decentralisation is the systematic delegation of decision-making authority to.',
          hint: 'Revisit node c12_bs_cbse_05_009 and practice the "Overview of the elements of delegation".',
          misconception: 'Students write "Decentralisation means no central control" or "Decentralisation and delegation are the same thing." The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decentralisation is the systematic delegation of decision-making authority to the lowest',
                  options: ['Decentralisation is the systematic delegation of decision-making authority to the lowest', 'Management is the process of planning, organising, staffing, directing, and controlling', 'Coordination is the process of synchronizing the activities of different departments,', 'Organisational structure is the framework that defines how activities such as task'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "Decentralisation means no central control" or "Decentralisation and delegation are the same thing." The error stems from.' }
          ],
            remediations: { 'students-write-decentralisation-means-no': { steps: ['Re-read the NCERT "Delegation and Decentralisation: A Comparative view" table (page 134).', 'For each row (Nature, Freedom, Status, Scope, Purpose), create a flashcard with a one-sentence differentiator and a.', 'Take the diagnostic questions 3 and 4 again; if still wrong, revisit node c12_bs_cbse_05_009 (Delegation) to relearn.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write "Decentralisation means no central control" or "Decentralisation and delegation are the same thing." The.',
          parts: [
                { id: 'a', prompt: '"Decentralisation always leads to better control because each division becomes a profit centre." Evaluate this statement.', answer: 'Correct answer: Partially true',
                  options: ['Correct answer: Partially true', 'fully true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "Decentralisation means no central control" or "Decentralisation and delegation are the same thing." The error stems from.' }
          ],
            remediations: { 'students-write-decentralisation-means-no': { steps: ['Re-read the NCERT "Delegation and Decentralisation: A Comparative view" table (page 134).', 'For each row (Nature, Freedom, Status, Scope, Purpose), create a flashcard with a one-sentence differentiator and a.', 'Take the diagnostic questions 3 and 4 again; if still wrong, revisit node c12_bs_cbse_05_009 (Delegation) to relearn.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
