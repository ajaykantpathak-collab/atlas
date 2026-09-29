import type { SimDef } from '../../engine/types';
import C12_BusinessStudiesBusinessEnvironmentMeaningSim from '../../../simulations/c6_12/C12_BusinessStudiesBusinessEnvironmentMeaningSim';

/** v3 wrapped master — C12_BusinessStudiesBusinessEnvironmentMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_businessstudiesbusinessenvironmentmeaningsim: SimDef = {
    id: 'v3w_c12_businessstudiesbusinessenvironmentmeaningsim',
    title: 'Business Environment: Meaning, Characteristics and Importance',
    subtitle: 'This node covers the meaning, seven characteristics (totality, specific/general forces,.',
    classLevel: 12, subject: 'business_studies', topic: 'Business Environment: Meaning, Characteristics and Importance',
    chapters: [],
    nodeIds: ['c12_bs_cbse_03_001', 'c12_bs_cbse_03_005', 'c12_bs_cbse_03_006', 'c12_bs_cbse_11_007', 'c12_bs_cbse_02_001', 'c12_bs_cbse_03_002', 'c12_bs_cbse_03_003', 'c12_bs_cbse_03_004', 'c12_bs_cbse_03_009', 'c12_bs_cbse_03_010', 'c12_bs_cbse_06_008', 'c12_bs_cbse_01_005', 'c12_bs_cbse_02_008', 'c12_bs_cbse_04_009', 'c12_bs_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you run a small cloud-kitchen selling millet-based snacks.', goal: 'Master Business Environment: Meaning, Characteristics and Importance.' },
    discovery: {
        question: 'A student writes: "Specific forces affect all firms equally, while general forces affect only one firm." Explain why this statement is incorrect and give one.',
        options: ['The student has reversed the definitions', 'dimensions of business environment', 'characteristics of business environment'],
        answer: 'The student has reversed the definitions',
        hook: 'Students often confuse "dimensions of business environment" (economic, social, technological, political, legal) with.',
    },
    teaching: [
        { title: 'Business environment refers to the sum total.', text: 'Business environment refers to the sum total of all external individuals, institutions, and forces — such as economic, social, political, technological, and legal factors — that are outside the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_001', title: 'Business environment refers to the sum.',
          scaffold: { problem: '"FreshFarm", a cooperative selling organic vegetables directly to urban consumers via a mobile app, faces three simultaneous changes: (a).',
            steps: [
            { text: 'List the three changes and recall definitions — specific forces affect the firm directly (investors, customers,.' },
            { text: 'Change (a) is a government policy (subsidy) — it is a general force (political/legal dimension) because it applies to.' },
            { text: 'Change (b) is a new competitor — it is a specific force (competitor) affecting FreshFarm directly.' },
            { text: 'Change (c) is a social-media claim — it is a general force (social dimension) influencing consumer perception broadly.' },
            { text: 'Verify each classification against NCERT: specific = direct/immediate; general = indirect/broad.', faded: true, blankAnswer: '(a) General force, Political/Legal dimension → Apply for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_005', title: 'The technological environment comprises.',
          scaffold: { problem: 'A mid-sized auto-component manufacturer in Pune currently uses conventional CNC machines.',
            steps: [
            { text: 'Identify the current cost structure — high variable costs (labor, rework, downtime) and moderate fixed costs (CNC.' },
            { text: 'Map workforce changes — need fewer machine operators, more data analysts, mechatronics technicians, and IT support.' },
            { text: 'Evaluate quality impact — digital twin allows virtual testing of process parameters; AI vision systems detect.' },
            { text: 'Assess competitive positioning — larger rivals already adopt Industry 4.0; this upgrade is a \'catch-up\' necessity.' },
            { text: 'Synthesize — The technological environment forces a strategic choice: invest now to survive long-term, or risk.', faded: true, blankAnswer: '(i) Fixed costs increase 30-40%, variable costs decrease.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_006', title: 'The political environment refers to the.',
          scaffold: { problem: 'A European pharmaceutical company plans to enter India by forming a joint venture with a local firm.',
            steps: [
            { text: 'Identify political environment factors — (a) Government stability and continuity of PLI scheme across election cycles;.' },
            { text: 'Identify legal environment factors — (a) Drugs and Cosmetics Act provisions on compulsory licensing for the specific.' },
            { text: 'Map each factor to opportunity/threat — PLI scheme = opportunity (subsidy) if political commitment holds; compulsory.' },
            { text: 'Synthesize — The company must engage with political risk advisors for policy continuity, and legal counsel for.' },
            { text: 'Conclude — Political environment sets the incentive landscape; legal environment defines the compliance boundary.', faded: true, blankAnswer: 'Political factors: PLI policy continuity, foreign.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_007', title: 'Channels of distribution refer to the.',
          scaffold: { problem: 'A manufacturer of industrial robots (price ₹50 lakh each, highly technical, customized installation required, 20 potential buyers in India).',
            steps: [
            { text: 'Identify product characteristics — high unit value, technical complexity, customization, very few buyers (narrow.' },
            { text: 'Identify company factors — assume manufacturer has technical expertise but limited sales force; can afford to build.' },
            { text: 'Identify market factors — buyers are concentrated (industrial hubs), require pre-sale consultation and post-sale.' },
            { text: 'Identify middlemen factors — specialized industrial distributors exist but add cost; may lack deep technical knowledge.' },
            { text: 'Evaluate channel options — Direct (zero-level) allows manufacturer\'s engineers to sell, install, service; builds.' },
            { text: 'Recommend — Direct channel (zero-level) with company-employed sales engineers.', faded: true, blankAnswer: 'Direct channel (zero-level) with manufacturer\'s own sales.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_001', title: 'Principles of management are broad,.',
          scaffold: { problem: 'A hospital administrator notices that nurses frequently receive conflicting instructions from the Nursing Superintendent and the Resident.',
            steps: [
            { text: 'Identify the symptom — dual subordination (nurses getting orders from two superiors).' },
            { text: 'Map to Fayol\'s principle — Unity of Command is violated (one subordinate, one superior).' },
            { text: 'Link to nature — \'Cause and effect relationship\': violation → confusion → errors → low morale.' },
            { text: 'Apply significance — \'Scientific decisions\': redesign reporting based on objective assessment, not habit.' },
            { text: 'Propose solution — Establish a single protocol committee chaired by Nursing Superintendent with RMO as advisor; all.' },
            { text: 'Verify — Nurses now have one boss for daily work; coordination maintained via committee; morale and efficiency improve.', faded: true, blankAnswer: 'Core violation: Unity of Command. Solution: Unified.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_002', title: 'The elements of business environment.',
          scaffold: { problem: '"GreenWheels Ltd." manufactures electric scooters in Pune. In the last quarter, the following occurred: (i) Maharashtra government.',
            steps: [
            { text: 'List the five dimension labels as column headers: Economic, Social, Technological, Political, Legal.' },
            { text: 'Place each event (i)-(v) under its primary dimension. (i) Political, (ii) Legal/Economic (subsidy is a policy.' },
            { text: 'Identify cross-linkages. Example: FAME-II reduction (Legal/Economic) raises effective scooter price → may dampen the.' },
            { text: 'Trace a second linkage: Lithium price drop (Technological/Economic) lowers battery cost (40% of BOM) → improves margin.' },
            { text: 'Summarise: No single dimension tells the full story; strategic pricing must weigh all five simultaneously.', faded: true, blankAnswer: 'Primary mapping: (i) Political, (ii) Legal & Economic,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_03_005', title: 'Identify each idea',
          dissect: { specimen: 'Business Environment: Meaning, Characteristics and Importance', spots: [
            { id: 's1', label: 'Business environment refers to the', prompt: 'Which idea is this? — Business environment refers to the sum total of all external individuals, institutions,.', answer: 'Business environment refers to the', options: ['Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to', 'Channels of distribution refer to'] },
            { id: 's2', label: 'The technological environment comprises forces', prompt: 'Which idea is this? — The technological environment comprises forces relating to scientific improvements and.', answer: 'The technological environment comprises forces', options: ['The technological environment comprises forces', 'Business environment refers to the', 'The political environment refers to', 'Channels of distribution refer to'] },
            { id: 's3', label: 'The political environment refers to', prompt: 'Which idea is this? — The political environment refers to the political conditions such as the stability of the.', answer: 'The political environment refers to', options: ['The political environment refers to', 'Business environment refers to the', 'The technological environment comprises forces', 'Channels of distribution refer to'] },
            { id: 's4', label: 'Channels of distribution refer to', prompt: 'Which idea is this? — Channels of distribution refer to the path or route through which goods and services move.', answer: 'Channels of distribution refer to', options: ['Channels of distribution refer to', 'Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to'] },
            { id: 's5', label: 'Principles of management are broad', prompt: 'Which idea is this? — Principles of management are broad, general guidelines derived from practice and.', answer: 'Principles of management are broad', options: ['Principles of management are broad', 'Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to'] },
            { id: 's6', label: 'The elements of business environment', prompt: 'Which idea is this? — The elements of business environment refer to the five broad external.', answer: 'The elements of business environment', options: ['The elements of business environment', 'Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to'] }
          ] } }
    ],
    explore: { component: C12_BusinessStudiesBusinessEnvironmentMeaningSim, prompt: 'Explore the interactive — Business Environment: Meaning, Characteristics and Importance' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_001', difficulty: 'standard',
          question: 'Business environment refers to the sum total of all external individuals,.',
          hint: 'Revisit Class 11 Business Studies Chapter 1 (nodes c11_bs_cbse_01_003 and.',
          misconception: 'Students often confuse "dimensions of business environment" (economic, social, technological, political, legal) with.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Specific forces affect all firms equally, while general forces affect only one firm." Explain why this statement is incorrect and give one.', answer: 'The student has reversed the definitions',
                  options: ['The student has reversed the definitions', 'dimensions of business environment', 'characteristics of business environment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "dimensions of business environment" (economic, social, technological, political, legal) with "characteristics of.' }
          ],
            remediations: { 'students-often-confuse-dimensions-of': { steps: ['Have the student make two side-by-side columns — "Characteristics (7)" and "Dimensions (5)" — and write the NCERT.', 'Give three one-line scenarios (e.g., "GST rate changed", "Consumer preference shifted to vegan", "New competitor.', 'If they still mix them, re-read the NCERT paragraphs "On the basis of the foregoing discussion, it can be said business.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_005', difficulty: 'standard',
          question: 'The technological environment comprises forces relating to scientific.',
          hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and focus on the.',
          misconception: 'Students often equate \'technological environment\' with \'digital presence\' (having a website, using email).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The technological environment comprises forces relating to scientific improvements and',
                  options: ['The technological environment comprises forces relating to scientific improvements and', 'Business environment refers to the sum total of all external individuals, institutions,', 'The political environment refers to the political conditions such as the stability of the', 'Channels of distribution refer to the path or route through'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'technological environment\' with \'digital presence\' (having a website, using email).' }
          ],
            remediations: { 'students-often-equate-technological-environment': { steps: ['Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and re-read the \'Technological Environment\' subsection —.', 'Watch a 10-minute case study on \'How Jio disrupted Indian telecom\' (available on YouTube) and map each disruption to.', 'Re-attempt Diagnostic Question 4 with this broader lens.', 'If confusion persists, discuss with teacher using the \'inter-relatedness\' feature of business environment.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_006', difficulty: 'standard',
          question: 'The political environment refers to the political conditions such as the.',
          hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and the NCERT table.',
          misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The legal environment only consists of laws passed by Parliament." Explain why this statement is incomplete.', answer: 'The legal environment also includes administrative orders issued by government',
                  options: ['The legal environment also includes administrative orders issued by government', 'political environment = elections', 'legal environment = court cases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that political environment.' }
          ],
            remediations: { 'political-environment-elections-and-legal': { steps: ['If the student conflates political and legal dimensions, do this 3-step remediation: (1) Re-read the NCERT box "Major.', '(2) Take a recent business news item (e.g., "Govt proposes new data protection bill") and classify each sentence as.', '(3) Re-attempt Diagnostic Questions 2 and 4 — if still wrong, revisit Class 11 node c11_bs_cbse_06_007 (Social.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Since the legal environment is mandatory, a business should focus only on legal compliance and ignore the political.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'political environment = elections', 'legal environment = court cases', '"political environment = elections" and "legal environment = court cases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that political environment.' },
                { id: 'b', prompt: 'Design a one-page \'Political-Legal Radar\' template that a mid-sized Indian manufacturer could use quarterly to track changes.', answer: 'A good template includes: Political: (1) Ruling party\'s policy announcements',
                  options: ['A good template includes: Political: (1) Ruling party\'s policy announcements', 'political environment = elections', 'legal environment = court cases', '"political environment = elections" and "legal environment = court cases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that political environment.' }
          ],
            remediations: { 'political-environment-elections-and-legal': { steps: ['If the student conflates political and legal dimensions, do this 3-step remediation: (1) Re-read the NCERT box "Major.', '(2) Take a recent business news item (e.g., "Govt proposes new data protection bill") and classify each sentence as.', '(3) Re-attempt Diagnostic Questions 2 and 4 — if still wrong, revisit Class 11 node c11_bs_cbse_06_007 (Social.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'standard',
          question: 'Channels of distribution refer to the path or route through which goods and.',
          hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005).',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Eliminating all intermediaries (going direct) always increases the manufacturer\'s profit margin because the intermediary\'s markup is.', answer: 'For: (1) No markup paid to intermediaries → higher gross margin per unit',
                  options: ['For: (1) No markup paid to intermediaries → higher gross margin per unit', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'b', prompt: 'Create a novel distribution channel scenario for a new product: \'Smart Water Bottles\' (electronic sensor tracks hydration, syncs with phone, priced at ₹2,500).', answer: 'Good answer: Hybrid strategy',
                  options: ['Good answer: Hybrid strategy', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'c', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_001', difficulty: 'standard',
          question: 'Principles of management are broad, general guidelines derived from practice.',
          hint: 'If stuck, revisit Class 11 Chapter 1 \'Nature and Significance of Management\'.',
          misconception: 'Students often memorise the 7 nature points and 6 significance points as isolated lists, but in board exams they fail.',
          parts: [
                { id: 'a', prompt: 'State the exact NCERT definition of \'principles of management\' and give one example of a managerial decision where two different principles could lead to.', answer: '"A managerial principle is a broad and general guideline for',
                  options: ['Correct answer: "A managerial principle is a broad and general guideline for', 'principles are rigid rules like laws of physics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorise the 7 nature points and 6 significance points as isolated lists, but in board exams they fail to apply them to a.' }
          ],
            remediations: { 'students-often-memorise-the-7': { steps: ['Re-read the NCERT \'Nature\' and \'Significance\' subsections aloud, highlighting the verbs: \'apply\', \'guide\', \'establish\',.', 'For each of the 7 nature points, write a one-line *application* in a school club context (e.g., \'Flexible: Club.', 'Take the Bhasin Ltd case (NCERT p.66) and map each problem to a violated principle + its nature/significance link.', 'Re-attempt Diagnostic Questions 2, 4, 5 with this case-mapping lens.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_002', difficulty: 'standard',
          question: 'The elements of business environment refer to the five broad external.',
          hint: 'If unable to recall the seven features or six importance points, revisit node.',
          misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent.',
          parts: [
                { id: 'a', prompt: 'A small furniture manufacturer in Jodhpur reads that the RBI has reduced the repo rate by 75 bps.', answer: 'Dimension = Economic Environment (interest rate change)',
                  options: ['Correct answer: Dimension = Economic Environment (interest rate change)', 'it will increase profits directly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent checklists.' },
                { id: 'b', prompt: 'Compare the "Political Environment" and "Legal Environment" dimensions.', answer: 'Political environment refers to the broader political',
                  options: ['Correct answer: Political environment refers to the broader political', 'government policy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent checklists.' }
          ],
            remediations: { 'students-often-memorise-the-five': { steps: ['Re-read the NCERT paragraph on "Inter-relatedness" (page 71) and the "Dimensions" section (pages 74-78).', 'Take the demonetisation example from the textbook (pages 86-87) and explicitly map each bullet (interest rates, private.', 'Practice writing one 4-mark answer daily for a week using the template: "Event → Dimension 1 impact → Dimension 2.', 'Self-check: Does my answer show arrows between dimensions? If not, rewrite.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent.',
          parts: [
                { id: 'a', prompt: 'Compare the "Political Environment" and "Legal Environment" dimensions.', answer: 'Political environment refers to the broader political',
                  options: ['Correct answer: Political environment refers to the broader political', 'government policy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent checklists.' }
          ],
            remediations: { 'students-often-memorise-the-five': { steps: ['Re-read the NCERT paragraph on "Inter-relatedness" (page 71) and the "Dimensions" section (pages 74-78).', 'Take the demonetisation example from the textbook (pages 86-87) and explicitly map each bullet (interest rates, private.', 'Practice writing one 4-mark answer daily for a week using the template: "Event → Dimension 1 impact → Dimension 2.', 'Self-check: Does my answer show arrows between dimensions? If not, rewrite.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
