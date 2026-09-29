import type { SimDef } from '../../engine/types';
import C11_BusinessStudiesInsuranceMeaningFeaturesSim from '../../../simulations/c6_12/C11_BusinessStudiesInsuranceMeaningFeaturesSim';

/** v3 wrapped master — C11_BusinessStudiesInsuranceMeaningFeaturesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_businessstudiesinsurancemeaningfeaturessim: SimDef = {
    id: 'v3w_c11_businessstudiesinsurancemeaningfeaturessim',
    title: 'Business Process Outsourcing (BPO): Features and Scope',
    subtitle: 'This node covers the meaning, features (non-core focus, cost arbitrage, process.',
    classLevel: 11, subject: 'business_studies', topic: 'Business Process Outsourcing (BPO): Features and Scope',
    chapters: [],
    nodeIds: ['c11_bs_cbse_05_007', 'c11_bs_cbse_04_004', 'c11_bs_cbse_04_007', 'c11_bs_cbse_01_007', 'c11_bs_cbse_05_006', 'c11_bs_cbse_03_001', 'c11_bs_cbse_08_001', 'c11_bs_cbse_08_006', 'c11_bs_cbse_10_003', 'c11_bs_cbse_02_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you run a fast-growing Indian startup selling handmade organic skincare products online.', goal: 'Master Business Process Outsourcing (BPO): Features and Scope.' },
    discovery: {
        question: 'What is the fundamental distinction between \'horizontal\' and \'vertical\' BPO services? Give one Indian industry example of each.',
        options: ['Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll', 'horizontal means domestic, vertical means international', 'captive BPO'],
        answer: 'Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll',
        hook: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal.',
    },
    teaching: [
        { title: 'Business Process Outsourcing (BPO) is the.', text: 'Business Process Outsourcing (BPO) is the practice of contracting specific non-core business processes or operations (such as customer support, payroll, data entry, or technical support) to an.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_007', title: 'Business Process Outsourcing (BPO) is.',
          scaffold: { problem: 'A US-based mid-sized insurance company (annual premium $200M) currently processes 120,000 claims/year in-house at $28/claim (staff,.',
            steps: [
            { text: 'Calculate current annual in-house cost = 120,000 claims × $28/claim = $3,360,000' },
            { text: 'Calculate proposed annual outsourced cost = 120,000 claims × $9/claim = $1,080,000' },
            { text: 'Calculate annual gross savings = $3,360,000 - $1,080,000 = $2,280,000' },
            { text: 'Calculate 3-year gross savings = $2,280,000 × 3 = $6,840,000; subtract one-time transition cost $1,200,000 = Net 3-year.' },
            { text: 'Calculate break-even: Transition cost / Monthly savings = $1,200,000 / ($2,280,000/12) = $1,200,000 / $190,000 = 6.32.', faded: true, blankAnswer: '3-year net savings = $5.64 million; Break-even = 7 months' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_04_004', title: 'Utmost Good Faith (Uberrimae Fidei) is.',
          scaffold: { problem: 'Mrs. Gupta (age 45) applies for a ₹50 lakh term life insurance policy. She discloses her age, occupation (teacher), and non-smoker status.',
            steps: [
            { text: 'Identify the principle at stake - Utmost Good Faith (Uberrimae Fidei) requiring voluntary disclosure of all material.' },
            { text: 'Determine if the undisclosed facts are "material" - apply the test: "Would a prudent insurer have changed the decision.' },
            { text: 'Evaluate family history of breast cancer (mother and sister died before 50) - this indicates genetic predisposition,.' },
            { text: 'Evaluate prior benign lump removal - while benign, it indicates breast tissue abnormality requiring monitoring.' },
            { text: 'Conclude materiality - both facts are material as they directly affect mortality risk assessment for a 45-year-old.' },
            { text: 'Apply legal consequence - non-disclosure of material facts makes the contract voidable at the insurer\'s option.' },
            { text: 'Final judgement - Yes, the insurer can reject the claim based on breach of utmost good faith.', faded: true, blankAnswer: 'Yes, the insurer can reject the claim. The undisclosed.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_04_007', title: 'Health, theft, and other general.',
          scaffold: { problem: 'Mr. Sharma purchases a comprehensive motor insurance policy for his car valued at ₹8 lakh.',
            steps: [
            { text: 'Identify the subject matter insured — the motor car (own damage cover).' },
            { text: 'Determine the applicable principle — this is a contract of indemnity, so the insurer pays actual financial loss up to.' },
            { text: 'Establish proximate cause — the loss is due to theft, which is a covered peril under the policy; no other intervening.' },
            { text: 'Apply the deductible — the policy terms require the insured to bear the first ₹1,000 of any own-damage claim.' },
            { text: 'Compute claim payable: IDV (₹6.5 lakh) minus compulsory deductible (₹1,000) = ₹6,49,000.' },
            { text: 'Verify — the claim does not exceed the sum insured (IDV), satisfies indemnity (actual loss compensated), and the.', faded: true, blankAnswer: '₹6,49,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_01_007', title: 'Trade is the branch of commerce.',
          scaffold: { problem: 'A business firm \'Alpha Traders\' in Chennai purchases 2000 units of readymade garments from a manufacturer in Tiruppur (Tamil Nadu) and.',
            steps: [
            { text: 'Identify the parties and their locations for each transaction.' },
            { text: 'Determine the role of the buyer in each transaction to classify as wholesale or retail.' },
            { text: 'Note that "wholesale" does not depend on quantity but on buyer\'s intent.' },
            { text: 'Compile final classification. Transaction 1: Internal wholesale trade. Transaction 2: Internal wholesale trade.' },
            { text: 'Verify against definition: Trade = transfer of ownership; Internal = within national boundaries; Wholesale = to.', faded: true, blankAnswer: 'Transaction 1: Internal wholesale trade. Transaction 2:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_05_006', title: 'Outsourcing is the strategic business.',
          scaffold: { problem: 'GreenLeaf Organics, a Pune-based startup selling organic skincare, currently handles order fulfilment (picking, packing, shipping).',
            steps: [
            { text: 'Calculate current total monthly in-house fulfilment cost. Fixed: warehouse ₹20,000 + 3 packers ₹45,000 = ₹65,000.' },
            { text: 'Compare with vendor quote: ₹120/order × 6,000 = ₹720,000/month. At given ₹150, in-house = ₹900,000/month.' },
            { text: 'Assess expertise: Vender specialises in cold-chain for organic products, has ISO 9001, real-time tracking API.' },
            { text: 'Assess focus: Founders spend 15 hrs/week on fulfilment issues.' },
            { text: 'Check strategic risk: 6-month contract allows exit; SLA includes 99% on-time delivery penalty clause.', faded: true, blankAnswer: 'Yes, outsource. Monthly saving ₹180,000; gains cold-chain.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_001', title: 'The private sector comprises business.',
          scaffold: { problem: 'An entrepreneur wants to start a business manufacturing solar panels.',
            steps: [
            { text: 'Identify the legal form for Option A – Private Limited Company under Companies Act, 2013 (minimum 2 members, no.' },
            { text: 'Identify the legal form for Option B – Government Company under Section 2(45) Companies Act, 2013 (requires government.' },
            { text: 'Compare Ease of Formation – Option A: Simple ROC registration (~15-30 days).' },
            { text: 'Compare Decision-making Autonomy – Option A: Board of Directors (promoter-controlled) has full operational freedom.' },
            { text: 'Compare Accountability Burden – Option A: Statutory audit, ROC filings, income tax.' },
            { text: 'Compare Access to Capital – Option A: Limited to promoter funds, bank loans, VC/PE (dilutes ownership).' },
            { text: 'Synthesise for profit-maximising entrepreneur valuing speed/control – Option A is superior: full control, fast setup,.', faded: true, blankAnswer: 'Option A (Private Limited Company) is recommended. While.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_04_004', title: 'Identify each idea',
          dissect: { specimen: 'Business Process Outsourcing (BPO): Features and Scope', spots: [
            { id: 's1', label: 'Business Process Outsourcing BPO is', prompt: 'Which idea is this? — Business Process Outsourcing (BPO) is the practice of contracting specific non-core.', answer: 'Business Process Outsourcing BPO is', options: ['Business Process Outsourcing BPO is', 'Utmost Good Faith Uberrimae Fidei', 'Health theft and other general', 'Trade is the branch of'] },
            { id: 's2', label: 'Utmost Good Faith Uberrimae Fidei', prompt: 'Which idea is this? — Utmost Good Faith (Uberrimae Fidei) is the fundamental principle requiring both insurer.', answer: 'Utmost Good Faith Uberrimae Fidei', options: ['Utmost Good Faith Uberrimae Fidei', 'Business Process Outsourcing BPO is', 'Health theft and other general', 'Trade is the branch of'] },
            { id: 's3', label: 'Health theft and other general', prompt: 'Which idea is this? — Health, theft, and other general insurance policies are non-life insurance contracts that.', answer: 'Health theft and other general', options: ['Health theft and other general', 'Business Process Outsourcing BPO is', 'Utmost Good Faith Uberrimae Fidei', 'Trade is the branch of'] },
            { id: 's4', label: 'Trade is the branch of', prompt: 'Which idea is this? — Trade is the branch of commerce concerned with the buying, selling, and exchange of goods.', answer: 'Trade is the branch of', options: ['Trade is the branch of', 'Business Process Outsourcing BPO is', 'Utmost Good Faith Uberrimae Fidei', 'Health theft and other general'] },
            { id: 's5', label: 'Outsourcing is the strategic business', prompt: 'Which idea is this? — Outsourcing is the strategic business practice of contracting out non-core or routine.', answer: 'Outsourcing is the strategic business', options: ['Outsourcing is the strategic business', 'Business Process Outsourcing BPO is', 'Utmost Good Faith Uberrimae Fidei', 'Health theft and other general'] },
            { id: 's6', label: 'The private sector comprises business', prompt: 'Which idea is this? — The private sector comprises business enterprises owned, controlled, and managed by.', answer: 'The private sector comprises business', options: ['The private sector comprises business', 'Business Process Outsourcing BPO is', 'Utmost Good Faith Uberrimae Fidei', 'Health theft and other general'] }
          ] } }
    ],
    explore: { component: C11_BusinessStudiesInsuranceMeaningFeaturesSim, prompt: 'Explore the interactive — Business Process Outsourcing (BPO): Features and Scope' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_007', difficulty: 'standard',
          question: 'Business Process Outsourcing (BPO) is the practice of contracting specific.',
          hint: 'If unclear on core competency vs core activity, revisit the Zomato example: Food delivery.',
          misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental distinction between \'horizontal\' and \'vertical\' BPO services? Give one Indian industry example of each.', answer: 'Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll',
                  options: ['Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll', 'horizontal means domestic, vertical means international', 'captive BPO'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal (generic).' },
                { id: 'b', prompt: 'A US healthcare provider wants to outsource medical transcription (converting doctor voice notes to electronic records).', answer: 'Medical transcription is a *vertical* BPO service',
                  options: ['Medical transcription is a *vertical* BPO service', 'cheaper labour', 'captive BPO'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal (generic).' }
          ],
            remediations: { 'students-often-equate-bpo-with': { steps: ['If the student conflates BPO with call centres: (1) Show the NASSCOM BPM industry revenue split: Voice ~25%, Non-voice.', '(2) Map 5 BPO job roles to required qualifications: Medical Coder (CPC certification), Legal Process Analyst (Law.', '(3) Use the "Core Competency Matrix" exercise: List 10 processes of a chosen company (e.g., Zomato), classify each as.', 'This shifts focus from "type of work" to "strategic role of work."'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal.',
          parts: [
                { id: 'a', prompt: 'Design a BPO engagement model for an Indian ed-tech company (like BYJU\'S or Unacademy) that wants to outsource its *student doubt-resolution* process (students.', answer: 'Horizontal or vertical classification with justification, (',
                  options: ['Horizontal or vertical classification with justification, (', 'captive BPO', 'third-party BPO', 'insourcing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal (generic).' }
          ],
            remediations: { 'students-often-equate-bpo-with': { steps: ['If the student conflates BPO with call centres: (1) Show the NASSCOM BPM industry revenue split: Voice ~25%, Non-voice.', '(2) Map 5 BPO job roles to required qualifications: Medical Coder (CPC certification), Legal Process Analyst (Law.', '(3) Use the "Core Competency Matrix" exercise: List 10 processes of a chosen company (e.g., Zomato), classify each as.', 'This shifts focus from "type of work" to "strategic role of work."'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_004', difficulty: 'standard',
          question: 'Utmost Good Faith (Uberrimae Fidei) is the fundamental principle requiring both.',
          hint: 'Revisit c10_eco_cbse_03_004 (good credit vs bad credit) and c9_math_ch7_007 (probability.',
          misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a.',
          parts: [
                { id: 'a', prompt: 'Explain why the timing requirement for Insurable Interest differs across Life, Fire, and Marine insurance. Use the underlying economic rationale in your answer.', answer: 'Life insurance: Insurable interest must exist at policy inception',
                  options: ['Life insurance: Insurable interest must exist at policy inception', 'all require interest at inception', 'Utmost Good Faith means the insurer must also disclose everything to the insured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a symmetric duty.' },
                { id: 'b', prompt: 'Mr. Sharma takes a fire insurance policy on his factory worth ₹50 lakh. Six months later, he sells the factory to Mr. Verma but forgets to assign the policy.', answer: 'No, the insurer will not pay',
                  options: ['No, the insurer will not pay', 'yes, he paid premium', 'Utmost Good Faith means the insurer must also disclose everything to the insured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a symmetric duty.' }
          ],
            remediations: { 'utmost-good-faith-means-the': { steps: ['Ask the student to list 5 facts about themselves they would disclose if buying life insurance.', 'For each, ask "Would a prudent insurer change the premium or reject based on this?" - this isolates material facts.', 'Present a fire insurance case where ownership changes hands before loss - ask "Who suffers financial loss?" to ground.', 'Use a Venn diagram: Left circle = facts proposer knows, Right circle = facts insurer knows.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A creditor has insurable interest in the life of a debtor only up to the amount of the debt." Is this correct? Explain with reasoning.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'creditor can insure for any amount', 'Utmost Good Faith means the insurer must also disclose everything to the insured', 'it\'s a symmetric duty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a symmetric duty.' },
                { id: 'b', prompt: 'Create a realistic scenario where BOTH Utmost Good Faith and Insurable Interest are simultaneously violated.', answer: 'Scenario: Mr',
                  options: ['Scenario: Mr', 'Utmost Good Faith means the insurer must also disclose everything to the insured', 'it\'s a symmetric duty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a symmetric duty.' }
          ],
            remediations: { 'utmost-good-faith-means-the': { steps: ['Ask the student to list 5 facts about themselves they would disclose if buying life insurance.', 'For each, ask "Would a prudent insurer change the premium or reject based on this?" - this isolates material facts.', 'Present a fire insurance case where ownership changes hands before loss - ask "Who suffers financial loss?" to ground.', 'Use a Venn diagram: Left circle = facts proposer knows, Right circle = facts insurer knows.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_007', difficulty: 'standard',
          question: 'Health, theft, and other general insurance policies are non-life insurance.',
          hint: 'Revisit c11_bs_cbse_04_004 and c11_bs_cbse_04_005 to review the principles of indemnity,.',
          misconception: 'Students often think "theft insurance" is a single standalone policy.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a life insurance contract and a health insurance contract regarding the principle of indemnity?', answer: 'Life insurance is not a contract of indemnity',
                  options: ['Life insurance is not a contract of indemnity', 'theft insurance', '"theft insurance" is a single standalone policy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "theft insurance" is a single standalone policy.' },
                { id: 'b', prompt: 'A farmer insures his wheat crop under a crop insurance policy for ₹2 lakh.', answer: 'The principle of indemnity is applied',
                  options: ['The principle of indemnity is applied', 'theft insurance', '"theft insurance" is a single standalone policy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "theft insurance" is a single standalone policy.' },
                { id: 'c', prompt: 'Compare Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) and Pradhan Mantri Suraksha Bima Yojana (PMSBY) on three parameters: (a) risk covered, (b) premium per.', answer: 'PMJJBY: life cover (death any cause), ₹330/year, ₹2 lakh sum assured',
                  options: ['PMJJBY: life cover (death any cause), ₹330/year, ₹2 lakh sum assured', 'theft insurance', '"theft insurance" is a single standalone policy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "theft insurance" is a single standalone policy.' }
          ],
            remediations: { 'theft-insurance-is-a-single': { steps: ['If a student conflates theft covers, ask them to list the subject matter in each case: "What is being insured in.', 'In motor policy?" Then have them read the policy wordings: burglary requires forcible entry into premises; motor theft.', 'For indemnity confusion, give a numerical example: sum insured ₹5 lakh, actual loss ₹3 lakh — ask "How much will the.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_007', difficulty: 'standard',
          question: 'Trade is the branch of commerce concerned with the buying, selling, and.',
          hint: 'Revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) — specifically the.',
          misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in.',
          parts: [
                { id: 'a', prompt: 'A trader in Kolkata purchases 500 kg of tea from a plantation in Assam and sells it to a retailer in Mumbai.', answer: 'This is internal wholesale trade',
                  options: ['This is internal wholesale trade', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'b', prompt: '"All trade is internal trade because goods ultimately reach consumers within a country." Evaluate this statement and explain the conceptual error it contains.', answer: 'The statement is false',
                  options: ['The statement is false', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'c', prompt: 'An Indian company buys raw cotton from farmers in Gujarat, processes it into yarn, and sells the yarn to a textile mill in Bangladesh.', answer: 'Transaction 1 (farmers to company): Internal trade',
                  options: ['Transaction 1 (farmers to company): Internal trade', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' }
          ],
            remediations: { 'wholesale-trade-means-selling-in': { steps: ['Ask the student to define "final consumer" vs "trader" in their own words.', 'Present two scenarios: (a) A bakery buys 50 kg flour from a mill; (b) A household buys 50 kg flour from a wholesale.', 'Guide them to see that (a) is wholesale because the bakery uses flour for business (resale as bread), while (b) is.', 'Have them re-state the definition using "intended use" not "quantity."'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in.',
          parts: [
                { id: 'a', prompt: '"A country with a large entrepôt trade sector does not need a strong manufacturing base." Critically evaluate this claim with reference to the nature of.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' },
                { id: 'b', prompt: 'Design a flowchart that traces a single product (e.g., coffee beans) from an Ethiopian farmer to a consumer in Jaipur, labeling each trade transaction as.', answer: 'A valid flowchart: 1',
                  options: ['A valid flowchart: 1', 'wholesale trade means selling in large quantities', 'retail trade means selling in small quantities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "wholesale trade means selling in large quantities" and "retail trade means selling in small quantities,".' }
          ],
            remediations: { 'wholesale-trade-means-selling-in': { steps: ['Ask the student to define "final consumer" vs "trader" in their own words.', 'Present two scenarios: (a) A bakery buys 50 kg flour from a mill; (b) A household buys 50 kg flour from a wholesale.', 'Guide them to see that (a) is wholesale because the bakery uses flour for business (resale as bread), while (b) is.', 'Have them re-state the definition using "intended use" not "quantity."'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_006', difficulty: 'standard',
          question: 'Outsourcing is the strategic business practice of contracting out non-core or.',
          hint: 'Revisit Class 8 Economics "Entrepreneurship: Organising Factors of Production".',
          misconception: 'Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call centres, coding).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Outsourcing is the strategic business practice of contracting out non-core or routine',
                  options: ['Outsourcing is the strategic business practice of contracting out non-core or routine', 'Business Process Outsourcing (BPO) is the practice of contracting specific non-core', 'Utmost Good Faith (Uberrimae Fidei) is the fundamental principle requiring both insurer', 'Health, theft, and other general insurance policies are non-life insurance contracts that'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call centres, coding).' }
          ],
            remediations: { 'students-equate-outsourcing-exclusively-with': { steps: ['Show the hospital-laundry example and ask "Is this outsourcing?" — student says no.', 'Re-read the definition together highlighting three words: "non-core," "external," "agency" — no mention of country or.', 'Have the student list 5 services a neighbourhood café could outsource locally (pest control, accounting, waste.', 'Ask them to redefine outsourcing in their own words without using "foreign" or "IT."', 'Give a mini-quiz with 3 domestic non-IT outsourcing scenarios to cement the corrected mental model.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_001', difficulty: 'standard',
          question: 'The private sector comprises business enterprises owned, controlled, and.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
          misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The private sector comprises business enterprises owned, controlled, and managed by',
                  options: ['The private sector comprises business enterprises owned, controlled, and managed by', 'Business Process Outsourcing (BPO) is the practice of contracting specific non-core', 'Utmost Good Faith (Uberrimae Fidei) is the fundamental principle requiring both insurer', 'Health, theft, and other general insurance policies are non-life insurance contracts that'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.' }
          ],
            remediations: { 'students-consistently-confuse-public-sector': { steps: ['Ask the student to write the legal definition of \'Government Company\' (Sec 2(45) Companies Act, 2013) and \'Public.', 'Highlight the words "held by the Central Government/State Government" vs "minimum seven members".', 'Give a concrete example: "Indian Oil Corporation Ltd. (IOCL) – 51.5% govt holding → Public Sector Government Company.', 'Drill with 5 rapid-fire names (ONGC, TCS, FCI, SBI, Infosys) requiring the student to state: "Public/Private + Form +.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
