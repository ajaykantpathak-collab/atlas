import type { SimDef } from '../../engine/types';
import C12_CommerceDigitalMarketingSocialSim from '../../../simulations/c6_12/C12_CommerceDigitalMarketingSocialSim';

/** v3 wrapped master — C12_CommerceDigitalMarketingSocialSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_commercedigitalmarketingsocialsim: SimDef = {
    id: 'v3w_c12_commercedigitalmarketingsocialsim',
    title: 'Technological Environment: Impact on Business Operations',
    subtitle: 'This node covers the technological environment as a dimension of the general business.',
    classLevel: 12, subject: 'business_studies', topic: 'Technological Environment: Impact on Business Operations',
    chapters: [],
    nodeIds: ['c12_bs_cbse_03_005', 'c12_bs_cbse_10_008', 'c12_bs_cbse_11_008', 'c12_bs_cbse_03_004', 'c12_bs_cbse_03_008', 'c12_bs_cbse_11_001', 'c12_bs_cbse_11_011', 'c12_bs_cbse_03_001', 'c12_bs_cbse_03_002', 'c12_bs_cbse_03_003', 'c12_bs_cbse_03_006', 'c12_bs_cbse_03_010', 'c12_bs_cbse_03_007', 'c12_bs_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you own a small neighbourhood bookstore. A new app-based platform starts delivering books within two.', goal: 'Master Technological Environment: Impact on Business Operations.' },
    discovery: {
        question: 'Compare and contrast: Demat account vs. Trading account vs. Bank account. Which account is debited/credited when you buy shares on the NSE?',
        options: ['- Demat account: holds securities (electronic storage)', 'trading account holds shares', 'bank account receives shares'],
        answer: '- Demat account: holds securities (electronic storage)',
        hook: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or.',
    },
    teaching: [
        { title: 'The technological environment comprises.', text: 'The technological environment comprises forces relating to scientific improvements and innovations that provide new methods of producing goods, delivering services, and operating a business,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_005', title: 'The technological environment comprises.',
          scaffold: { problem: 'A mid-sized auto-component manufacturer in Pune currently uses conventional CNC machines.',
            steps: [
            { text: 'Identify the current cost structure — high variable costs (labor, rework, downtime) and moderate fixed costs (CNC.' },
            { text: 'Map workforce changes — need fewer machine operators, more data analysts, mechatronics technicians, and IT support.' },
            { text: 'Evaluate quality impact — digital twin allows virtual testing of process parameters; AI vision systems detect.' },
            { text: 'Assess competitive positioning — larger rivals already adopt Industry 4.0; this upgrade is a \'catch-up\' necessity.' },
            { text: 'Synthesize — The technological environment forces a strategic choice: invest now to survive long-term, or risk.', faded: true, blankAnswer: '(i) Fixed costs increase 30-40%, variable costs decrease.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_008', title: 'A depository system is an electronic.',
          scaffold: { problem: 'Mr. Sharma holds 200 physical equity shares of Infosys Ltd. (face value ₹5) in certificate numbers INF12345 to INF12544.',
            steps: [
            { text: 'Mr. Sharma opens a Demat account with a DP (e.g., his bank) if he doesn\'t have one.' },
            { text: 'He fills a Dematerialisation Request Form (DRF) in triplicate, surrenders the physical certificates (with "Surrendered.' },
            { text: 'The DP verifies the certificates and DRF, assigns a Dematerialisation Request Number (DRN), and forwards the physical.' },
            { text: 'The RTA verifies the certificates against the company\'s register of members.' },
            { text: 'The depository credits 200 electronic shares to Mr. Sharma\'s Demat account (via the DP). The DP informs Mr. Sharma.' },
            { text: 'Timeline: Typically 15-21 days from DRF submission to credit. Once credited, shares are available for trading on T day,.', faded: true, blankAnswer: 'Process completed in 6 steps over 15-21 days; shares.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_008', title: 'Promotion refers to the communication.',
          scaffold: { problem: 'A company manufacturing high-end water purifiers (price ₹25,000) wants to enter the urban middle-class market.',
            steps: [
            { text: 'Analyze product characteristics – high unit value, complex technology, need for demonstration, after-sales service.' },
            { text: 'Identify target audience – urban middle-class families, health-conscious, research online before buying.' },
            { text: 'Select promotion tools – Personal selling (direct sales force for home demos) is primary; Advertising (digital ads, TV).' },
            { text: 'Allocate budget – 50% personal selling, 30% advertising, 10% sales promotion, 10% PR.' },
            { text: 'Justify mix – High involvement product needs personal interaction; urban audience reachable via digital ads; PR builds.', faded: true, blankAnswer: 'Primary: Personal selling (home demos). Support: Digital.' }
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
        { type: 'scaffold', nodeId: 'c12_bs_cbse_03_008', title: 'Demonetisation is a monetary policy.',
          scaffold: { problem: 'A vegetable vendor in Mumbai used to hold ₹50,000 in cash (₹500/₹1000 notes) for daily wholesale purchases.',
            steps: [
            { text: 'Identify the initial state — vendor holds high-denomination cash (part of 86% invalidated currency), operates.' },
            { text: 'Apply the demonetisation rule — cash ceases to be legal tender; must be deposited in bank within window (Nov 10 – Dec.' },
            { text: 'Track the deposit — ₹50,000 enters the formal banking system as a Jan Dhan deposit, increasing aggregate bank deposits.' },
            { text: 'Observe the withdrawal constraint — weekly limits force the vendor to seek non-cash payment methods; he adopts UPI for.' },
            { text: 'Link to tax footprint — the ₹50,000 deposit creates a verifiable financial trail; if his declared income was lower, the.' },
            { text: 'Synthesize — the vendor moves from cash-intensive informal operation to digitally traceable formal operation,.', faded: true, blankAnswer: '(a) Cash holding dropped from ₹50,000 to near-zero,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_001', title: 'Marketing is a social and managerial.',
          scaffold: { problem: 'A startup founder says, "We have built a great app for learning Indian classical music.',
            steps: [
            { text: 'Recall Kotler definition — marketing starts with "individuals and groups obtain what they need and want" — so first.' },
            { text: 'Map to marketing process: (a) Need identification — did they research what music learners actually struggle with?' },
            { text: 'Apply scope of marketing — the app is a \'service\' + \'information\' + \'idea\' (preserving tradition); each entity requires.' },
            { text: 'List the four overlooked activities: (1) Market research on learner pain points (need identification), (2) Feature.' },
            { text: 'Conclude — advertising (promotion) is only the 5th step; doing it first wastes budget on an unvalidated offering.', faded: true, blankAnswer: '(1) Market research on learner pain points, (2) Feature.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Technological Environment: Impact on Business Operations', spots: [
            { id: 's1', label: 'The technological environment comprises forces', prompt: 'Which idea is this? — The technological environment comprises forces relating to scientific improvements and.', answer: 'The technological environment comprises forces', options: ['The technological environment comprises forces', 'A depository system is an', 'Promotion refers to the communication', 'Social Environment refers to the'] },
            { id: 's2', label: 'A depository system is an', prompt: 'Which idea is this? — A depository system is an electronic infrastructure that holds securities (shares, bonds,.', answer: 'A depository system is an', options: ['A depository system is an', 'The technological environment comprises forces', 'Promotion refers to the communication', 'Social Environment refers to the'] },
            { id: 's3', label: 'Promotion refers to the communication', prompt: 'Which idea is this? — Promotion refers to the communication process used by marketers to inform, persuade, and.', answer: 'Promotion refers to the communication', options: ['Promotion refers to the communication', 'The technological environment comprises forces', 'A depository system is an', 'Social Environment refers to the'] },
            { id: 's4', label: 'Social Environment refers to the', prompt: 'Which idea is this? — Social Environment refers to the aggregate of societal forces — customs, traditions,.', answer: 'Social Environment refers to the', options: ['Social Environment refers to the', 'The technological environment comprises forces', 'A depository system is an', 'Promotion refers to the communication'] },
            { id: 's5', label: 'Demonetisation is a monetary policy', prompt: 'Which idea is this? — Demonetisation is a monetary policy measure where a government strips specific currency.', answer: 'Demonetisation is a monetary policy', options: ['Demonetisation is a monetary policy', 'The technological environment comprises forces', 'A depository system is an', 'Promotion refers to the communication'] },
            { id: 's6', label: 'Marketing is a social and', prompt: 'Which idea is this? — Marketing is a social and managerial process by which individuals and groups obtain what.', answer: 'Marketing is a social and', options: ['Marketing is a social and', 'The technological environment comprises forces', 'A depository system is an', 'Promotion refers to the communication'] }
          ] } }
    ],
    explore: { component: C12_CommerceDigitalMarketingSocialSim, prompt: 'Explore the interactive — Technological Environment: Impact on Business Operations' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_005', difficulty: 'standard',
          question: 'The technological environment comprises forces relating to scientific.',
          hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and focus on the.',
          misconception: 'Students often equate \'technological environment\' with \'digital presence\' (having a website, using email).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The technological environment comprises forces relating to scientific improvements and',
                  options: ['The technological environment comprises forces relating to scientific improvements and', 'A depository system is an electronic infrastructure that holds securities (shares, bonds,', 'Promotion refers to the communication process used by marketers to inform, persuade, and', 'Social Environment refers to the aggregate of societal forces'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'technological environment\' with \'digital presence\' (having a website, using email).' }
          ],
            remediations: { 'students-often-equate-technological-environment': { steps: ['Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and re-read the \'Technological Environment\' subsection —.', 'Watch a 10-minute case study on \'How Jio disrupted Indian telecom\' (available on YouTube) and map each disruption to.', 'Re-attempt Diagnostic Question 4 with this broader lens.', 'If confusion persists, discuss with teacher using the \'inter-relatedness\' feature of business environment.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_008', difficulty: 'standard',
          question: 'A depository system is an electronic infrastructure that holds securities.',
          hint: 'Revisit c12_bs_cbse_10_006 (trading procedure) and c12_bs_cbse_10_007 (SEBI\'s role) to.',
          misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: Demat account vs. Trading account vs. Bank account. Which account is debited/credited when you buy shares on the NSE?', answer: '- Demat account: holds securities (electronic storage)',
                  options: ['- Demat account: holds securities (electronic storage)', 'trading account holds shares', 'bank account receives shares'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' }
          ],
            remediations: { 'a-demat-account-and-a': { steps: ['If the student conflates Demat and trading accounts: (1) Have them list three transactions that happen *only* in the.', '(2) Ask them to trace a buy order: "Where is the money deducted?', 'Where do shares appear?" (3) Re-diagnose with DIAGNOSTIC_QUESTION_4.', 'If they confuse DP with depository: (1) Show the NSDL/CDSL website list of registered DPs.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Dematerialisation has eliminated all risks associated with holding securities." Support your answer with two specific risks that.', answer: 'The statement is false',
                  options: ['The statement is false', '2-in-1', '3-in-1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' },
                { id: 'b', prompt: 'Compare and contrast: Demat account vs. Trading account vs. Bank account. Which account is debited/credited when you buy shares on the NSE?', answer: '- Demat account: holds securities (electronic storage)',
                  options: ['- Demat account: holds securities (electronic storage)', 'trading account holds shares', 'bank account receives shares', '2-in-1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' }
          ],
            remediations: { 'a-demat-account-and-a': { steps: ['If the student conflates Demat and trading accounts: (1) Have them list three transactions that happen *only* in the.', '(2) Ask them to trace a buy order: "Where is the money deducted?', 'Where do shares appear?" (3) Re-diagnose with DIAGNOSTIC_QUESTION_4.', 'If they confuse DP with depository: (1) Show the NSDL/CDSL website list of registered DPs.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_008', difficulty: 'standard',
          question: 'Promotion refers to the communication process used by marketers to inform,.',
          hint: 'Revisit node c12_bs_cbse_11_004 (Marketing Mix: 4 Ps) and practice classifying products.',
          misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).',
          parts: [
                { id: 'a', prompt: 'Explain why personal selling is more effective than advertising for selling complex, high-value industrial machinery.', answer: 'Personal selling allows two-way communication, demonstration, negotiation, and',
                  options: ['Personal selling allows two-way communication, demonstration, negotiation, and', 'advertising is cheaper', 'promotion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' },
                { id: 'b', prompt: 'A company selling affordable daily-use shampoo wants to quickly increase trial among price-sensitive rural consumers.', answer: 'Sales promotion (e.g., free sachets, discounts, coupons) should be primary',
                  options: ['Sales promotion (e.g., free sachets, discounts, coupons) should be primary', 'promotion', 'advertising'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' },
                { id: 'c', prompt: 'Compare the cost per contact and feedback immediacy of advertising vs personal selling.', answer: 'Advertising has low cost per contact but delayed/indirect feedback',
                  options: ['Advertising has low cost per contact but delayed/indirect feedback', 'promotion', 'advertising'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' }
          ],
            remediations: { 'promotion-means-only-advertising-or': { steps: ['If the student confuses promotion with only discounts/ads, first revisit the definition of promotion mix from node.', 'Then, create a comparison table of the four tools on parameters: nature of communication, cost per contact, feedback,.', 'Use concrete examples: toothpaste (advertising + sales promotion), industrial robots (personal selling), new restaurant.', 'Ask the student to explain why each tool fits.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Public relations is free advertising because you don\'t pay for media space." Is this accurate? Why or why not?', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'no media buying cost', 'zero cost', 'promotion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' }
          ],
            remediations: { 'promotion-means-only-advertising-or': { steps: ['If the student confuses promotion with only discounts/ads, first revisit the definition of promotion mix from node.', 'Then, create a comparison table of the four tools on parameters: nature of communication, cost per contact, feedback,.', 'Use concrete examples: toothpaste (advertising + sales promotion), industrial robots (personal selling), new restaurant.', 'Ask the student to explain why each tool fits.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_004', difficulty: 'standard',
          question: 'Social Environment refers to the aggregate of societal forces — customs,.',
          hint: 'Revisit Class 8 Economics nodes c8_eco_ch2_1 to c8_eco_ch2_9 for demography basics, and.',
          misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social Environment refers to the aggregate of societal forces',
                  options: ['Social Environment refers to the aggregate of societal forces', 'The technological environment comprises forces relating to scientific improvements and', 'A depository system is an electronic infrastructure that holds securities (shares, bonds,', 'Promotion refers to the communication process used by marketers to inform, persuade, and'],
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
            remediations: { 'students-often-treat-social-environment': { steps: ['Re‑read the "Major Elements of Social Environment" box in NCERT (page 76) and convert each of the 10 bullet points into.', 'Take the worked examples below and, for each, highlight which specific bullet point(s) drive the business decision.', 'Attempt Diagnostic Question 3 again, this time explicitly naming the NCERT bullet point for each factor identified.', 'If still stuck, revisit Class 8 Economics node c8_eco_ch2_1 (Demography: Study of Human Population) and c8_eco_ch2_9.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_008', difficulty: 'standard',
          question: 'Demonetisation is a monetary policy measure where a government strips specific.',
          hint: 'Revisit Class 10 Economics Chapter 3 (Money and Credit) nodes c10_eco_cbse_03_001 and.',
          misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.',
          parts: [
                { id: 'a', prompt: 'What were the two specific denominations demonetised on November 8, 2016, and what percentage of currency in circulation by value did they constitute?', answer: 'The demonetised denominations were ₹500 and ₹1,000 notes',
                  options: ['The demonetised denominations were ₹500 and ₹1,000 notes', 'removed 86% of money supply', 'currency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' },
                { id: 'b', prompt: 'A small manufacturing firm used to pay daily wages in cash. After demonetisation, it opened bank accounts for all workers and switched to NEFT transfers.', answer: 'The change illustrates (1) Digitisation',
                  options: ['The change illustrates (1) Digitisation', 'Private wealth', 'Real estate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' },
                { id: 'c', prompt: 'Compare the impact of demonetisation on "Private wealth" versus "Public sector wealth" as per the Economic Survey 2016–17 summary. Why did they diverge?', answer: 'Private wealth declined',
                  options: ['Private wealth declined', 'public sector wealth increased', 'removed 86% of money supply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' }
          ],
            remediations: { 'demonetisation-removed-86-of-money': { steps: ['If a student conflates currency with money supply, walk them through the RBI balance sheet step-by-step: (1).', '(2) Deposit window: Liability shifts to "Deposits with RBI" (bank reserves).', '(3) New notes issued: Liability shifts to "New ₹500/₹2000 notes".', '(4) Unreturned notes: Liability extinguished → RBI gains seigniorage → transferred to government.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Demonetisation successfully eliminated black money in India." Use at least two NCERT impact dimensions to support your evaluation.', answer: 'The statement is overstated',
                  options: ['The statement is overstated', 'removed 86% of money supply', 'currency', 'money supply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' },
                { id: 'b', prompt: 'Design a hypothetical 5-question survey for a local market association to assess the *lasting* behavioural changes in digital payment adoption three years.', answer: 'Example mapping: (1) Money/Interest rates',
                  options: ['Example mapping: (1) Money/Interest rates', 'removed 86% of money supply', 'currency', 'money supply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe demonetisation "removed 86% of money supply" permanently.' }
          ],
            remediations: { 'demonetisation-removed-86-of-money': { steps: ['If a student conflates currency with money supply, walk them through the RBI balance sheet step-by-step: (1).', '(2) Deposit window: Liability shifts to "Deposits with RBI" (bank reserves).', '(3) New notes issued: Liability shifts to "New ₹500/₹2000 notes".', '(4) Unreturned notes: Liability extinguished → RBI gains seigniorage → transferred to government.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_001', difficulty: 'standard',
          question: 'Marketing is a social and managerial process by which individuals and groups.',
          hint: 'If stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) and.',
          misconception: 'Students consistently equate marketing with only advertising or selling.',
          parts: [
                { id: 'a', prompt: 'Define marketing in one sentence using the Philip Kotler definition. Include the phrases "social process" and "freely exchanging."', answer: 'Marketing is a social process by',
                  options: ['Correct answer: Marketing is a social process by', 'marketing is selling products', 'marketing is advertising'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' },
                { id: 'b', prompt: 'A local bakery wants to expand its business. The owner currently only sells walk-in cakes.', answer: 'Correct answer (any three with valid examples): Services',
                  options: ['Correct answer (any three with valid examples): Services', 'cakes, pastries, bread'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' },
                { id: 'c', prompt: 'Compare the AMA (2017) definition of marketing with the Kotler definition. Identify ONE key similarity and ONE key difference in their emphasis.', answer: 'Similarity',
                  options: ['Correct answer: Similarity', 'both are same', 'AMA includes stakeholders'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' }
          ],
            remediations: { 'students-consistently-equate-marketing-with': { steps: ['If the student equates marketing with advertising/selling: Step 1 — Have them re-read the Kotler definition and.', 'Does selling identify the need?" Step 3 — Use the smartphone walkthrough: list 5 marketing activities that happened.', 'Step 4 — Re-attempt Diagnostic Question 2 and 3.', 'If still stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) to see where marketing fits in.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
