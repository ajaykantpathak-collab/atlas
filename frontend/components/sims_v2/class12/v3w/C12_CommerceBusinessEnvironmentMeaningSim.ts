import type { SimDef } from '../../engine/types';
import C12_CommerceBusinessEnvironmentMeaningSim from '../../../simulations/c6_12/C12_CommerceBusinessEnvironmentMeaningSim';

/** v3 wrapped master — C12_CommerceBusinessEnvironmentMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_commercebusinessenvironmentmeaningsim: SimDef = {
    id: 'v3w_c12_commercebusinessenvironmentmeaningsim',
    title: 'Business Environment: Meaning, Characteristics and Importance',
    subtitle: 'This node covers the meaning, seven characteristics (totality, specific/general forces,.',
    classLevel: 12, subject: 'business_studies', topic: 'Business Environment: Meaning, Characteristics and Importance',
    chapters: [],
    nodeIds: ['c12_bs_cbse_03_001', 'c12_bs_cbse_03_005', 'c12_bs_cbse_03_006', 'c12_bs_cbse_03_002', 'c12_bs_cbse_03_003', 'c12_bs_cbse_03_004', 'c12_bs_cbse_03_009', 'c12_bs_cbse_03_010', 'c12_bs_cbse_11_007', 'c12_bs_cbse_04_009', 'c12_bs_cbse_08_010', 'c12_bs_cbse_01_005', 'c12_bs_cbse_11_008', 'c12_bs_cbse_11_009', 'c12_bs_cbse_02_001'],
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
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_002', title: 'The elements of business environment.',
          scaffold: { problem: '"GreenWheels Ltd." manufactures electric scooters in Pune. In the last quarter, the following occurred: (i) Maharashtra government.',
            steps: [
            { text: 'List the five dimension labels as column headers: Economic, Social, Technological, Political, Legal.' },
            { text: 'Place each event (i)-(v) under its primary dimension. (i) Political, (ii) Legal/Economic (subsidy is a policy.' },
            { text: 'Identify cross-linkages. Example: FAME-II reduction (Legal/Economic) raises effective scooter price → may dampen the.' },
            { text: 'Trace a second linkage: Lithium price drop (Technological/Economic) lowers battery cost (40% of BOM) → improves margin.' },
            { text: 'Summarise: No single dimension tells the full story; strategic pricing must weigh all five simultaneously.', faded: true, blankAnswer: 'Primary mapping: (i) Political, (ii) Legal & Economic,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_003', title: 'The economic environment in India.',
          scaffold: { problem: 'A mid-sized auto ancillary firm in Pune (annual turnover ₹120 crore) is evaluating whether to invest ₹25 crore in a new CNC machining line.',
            steps: [
            { text: 'Identify the relevant liberalisation measure — Amendment of MRTP Act (1991) removed prior Central Government approval.' },
            { text: 'Identify the relevant globalisation measure — Industrial Policy 1991 raised foreign equity limit to 51% in priority.' },
            { text: 'Compare time-to-decision. Pre-1991: MRTP application → Ministry review → public hearing → approval (typical 12-18.' },
            { text: 'Compare regulatory approvals. Pre-1991: Industrial licence (if reserved), MRTP clearance, import licence for machinery,.' },
            { text: 'Compute competitive intensity index. Pre-1991: 3 domestic firms → Herfindahl-Hirschman Index (HHI) assuming equal share.' },
            { text: 'Synthesise net impact. Strategic freedom ↑↑ (speed, autonomy), but competitive pressure ↑ (price erosion, technology.', faded: true, blankAnswer: '(a) Time-to-decision reduced from 12-18 months to 1-2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_004', title: 'Social Environment refers to the.',
          scaffold: { problem: 'A packaged food company plans to launch a "traditional millet cookies" range in metropolitan India.',
            steps: [
            { text: 'Map each social factor to the NCERT list — health‑consciousness → "concern with quality of life" and "attitudes towards.' },
            { text: 'Derive product formulation implications — health‑consciousness demands clean‑label, low‑sugar, high‑fibre recipe;.' },
            { text: 'Determine pack size — nuclear families (smaller households) + working women (time‑poor) → single‑serve / 100‑150g packs.' },
            { text: 'Select distribution channels — working women shop via e‑commerce and modern retail; health‑conscious consumers seek.' },
            { text: 'Synthesize — the three factors reinforce each other: health trend validates millet, nuclear families shrink pack size,.', faded: true, blankAnswer: 'Product = millet‑based, low‑sugar, no‑preservative cookies;.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_03_005', title: 'Identify each idea',
          dissect: { specimen: 'Business Environment: Meaning, Characteristics and Importance', spots: [
            { id: 's1', label: 'Business environment refers to the', prompt: 'Which idea is this? — Business environment refers to the sum total of all external individuals, institutions,.', answer: 'Business environment refers to the', options: ['Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to', 'The elements of business environment'] },
            { id: 's2', label: 'The technological environment comprises forces', prompt: 'Which idea is this? — The technological environment comprises forces relating to scientific improvements and.', answer: 'The technological environment comprises forces', options: ['The technological environment comprises forces', 'Business environment refers to the', 'The political environment refers to', 'The elements of business environment'] },
            { id: 's3', label: 'The political environment refers to', prompt: 'Which idea is this? — The political environment refers to the political conditions such as the stability of the.', answer: 'The political environment refers to', options: ['The political environment refers to', 'Business environment refers to the', 'The technological environment comprises forces', 'The elements of business environment'] },
            { id: 's4', label: 'The elements of business environment', prompt: 'Which idea is this? — The elements of business environment refer to the five broad external.', answer: 'The elements of business environment', options: ['The elements of business environment', 'Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to'] },
            { id: 's5', label: 'The economic environment in India', prompt: 'Which idea is this? — The economic environment in India refers to the aggregate of macro-level factors —.', answer: 'The economic environment in India', options: ['The economic environment in India', 'Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to'] },
            { id: 's6', label: 'Social Environment refers to the', prompt: 'Which idea is this? — Social Environment refers to the aggregate of societal forces — customs, traditions,.', answer: 'Social Environment refers to the', options: ['Social Environment refers to the', 'Business environment refers to the', 'The technological environment comprises forces', 'The political environment refers to'] }
          ] } }
    ],
    explore: { component: C12_CommerceBusinessEnvironmentMeaningSim, prompt: 'Explore the interactive — Business Environment: Meaning, Characteristics and Importance' },
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
                  options: ['The technological environment comprises forces relating to scientific improvements and', 'Business environment refers to the sum total of all external individuals, institutions,', 'The political environment refers to the political conditions such as the stability of the', 'The elements of business environment refer to the five broad external'],
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
            remediations: { 'students-often-memorise-the-five': { steps: ['Re-read the NCERT paragraph on "Inter-relatedness" (page 71) and the "Dimensions" section (pages 74-78).', 'Take the demonetisation example from the textbook (pages 86-87) and explicitly map each bullet (interest rates, private.', 'Practice writing one 4-mark answer daily for a week using the template: "Event → Dimension 1 impact → Dimension 2.', 'Self-check: Does my answer show arrows between dimensions? If not, rewrite.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_003', difficulty: 'standard',
          question: 'The economic environment in India refers to the aggregate of macro-level.',
          hint: 'If unable to separate liberalisation/privatisation/globalisation measures, revisit.',
          misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the.',
          parts: [
                { id: 'a', prompt: 'Explain why the pre-1991 Indian economic model, despite achieving self-reliance in heavy industry, led to a balance of payments crisis by 1991.', answer: 'The pre-1991 model prioritised heavy industry under public sector via import',
                  options: ['The pre-1991 model prioritised heavy industry under public sector via import', 'corruption', 'population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' },
                { id: 'b', prompt: 'Compare the impact of privatisation via disinvestment (post-1991) versus the pre-1991 public sector dominance on: (a) budgetary support to public sector, (b).', answer: 'budgetary support to public sector, (',
                  options: ['budgetary support to public sector, (', 'privatisation solved all inefficiencies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' }
          ],
            remediations: { 'students-conflate-liberalisation': { steps: ['Have the student draw a three-column table with headers "Liberalisation", "Privatisation", "Globalisation".', 'For each, list exactly two specific policy actions from the 1991 Industrial Policy (e.g., Liberalisation: abolished.', 'For each action, write one direct business impact (e.g., "Firm can now expand capacity without government permission").', 'Re-attempt Diagnostic Question 3 and 4. If the student still merges columns, revisit c12_bs_cbse_03_001 (meaning of.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Demonetisation (November 2016) was primarily a monetary policy tool to curb black money, and its impact on business environment was.', answer: 'The statement is partially correct on intent but incorrect on uniform negativity',
                  options: ['The statement is partially correct on intent but incorrect on uniform negativity', 'complete failure', 'masterstroke'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' },
                { id: 'b', prompt: 'Compare the impact of privatisation via disinvestment (post-1991) versus the pre-1991 public sector dominance on: (a) budgetary support to public sector, (b).', answer: 'budgetary support to public sector, (',
                  options: ['budgetary support to public sector, (', 'privatisation solved all inefficiencies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' }
          ],
            remediations: { 'students-conflate-liberalisation': { steps: ['Have the student draw a three-column table with headers "Liberalisation", "Privatisation", "Globalisation".', 'For each, list exactly two specific policy actions from the 1991 Industrial Policy (e.g., Liberalisation: abolished.', 'For each action, write one direct business impact (e.g., "Firm can now expand capacity without government permission").', 'Re-attempt Diagnostic Question 3 and 4. If the student still merges columns, revisit c12_bs_cbse_03_001 (meaning of.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_004', difficulty: 'standard',
          question: 'Social Environment refers to the aggregate of societal forces — customs,.',
          hint: 'Revisit Class 8 Economics nodes c8_eco_ch2_1 to c8_eco_ch2_9 for demography basics, and.',
          misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social Environment refers to the aggregate of societal forces',
                  options: ['Social Environment refers to the aggregate of societal forces', 'Business environment refers to the sum total of all external individuals, institutions,', 'The technological environment comprises forces relating to scientific improvements and', 'The political environment refers to the political conditions such as the stability of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard demographic variables.' }
          ],
            remediations: { 'students-often-treat-social-environment': { steps: ['Re‑read the "Major Elements of Social Environment" box in NCERT (page 76) and convert each of the 10 bullet points into.', 'Take the worked examples below and, for each, highlight which specific bullet point(s) drive the business decision.', 'Attempt Diagnostic Question 3 again, this time explicitly naming the NCERT bullet point for each factor identified.', 'If still stuck, revisit Class 8 Economics node c8_eco_ch2_1 (Demography: Study of Human Population) and c8_eco_ch2_9.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Celebration of festivals like Diwali and Eid is only a short‑term sales spike; it does not require any strategic change in business.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'increased advertising'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard demographic variables.' }
          ],
            remediations: { 'students-often-treat-social-environment': { steps: ['Re‑read the "Major Elements of Social Environment" box in NCERT (page 76) and convert each of the 10 bullet points into.', 'Take the worked examples below and, for each, highlight which specific bullet point(s) drive the business decision.', 'Attempt Diagnostic Question 3 again, this time explicitly naming the NCERT bullet point for each factor identified.', 'If still stuck, revisit Class 8 Economics node c8_eco_ch2_1 (Demography: Study of Human Population) and c8_eco_ch2_9.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
