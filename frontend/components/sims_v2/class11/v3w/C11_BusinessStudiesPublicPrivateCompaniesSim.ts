import type { SimDef } from '../../engine/types';
import C11_BusinessStudiesPublicPrivateCompaniesSim from '../../../simulations/c6_12/C11_BusinessStudiesPublicPrivateCompaniesSim';

/** v3 wrapped master — C11_BusinessStudiesPublicPrivateCompaniesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_businessstudiespublicprivatecompaniessim: SimDef = {
    id: 'v3w_c11_businessstudiespublicprivatecompaniessim',
    title: 'Documents for Incorporation: Memorandum of Association (MoA)',
    subtitle: 'This node covers the definition, five clauses, prescribed forms (Tables A–E), signing.',
    classLevel: 11, subject: 'business_studies', topic: 'Documents for Incorporation: Memorandum of Association (MoA)',
    chapters: [],
    nodeIds: ['c11_bs_cbse_07_004', 'c11_bs_cbse_07_007', 'c11_bs_cbse_07_008', 'c11_bs_cbse_03_001', 'c11_bs_cbse_03_005', 'c11_bs_cbse_03_006', 'c11_bs_cbse_03_010', 'c11_bs_cbse_03_007', 'c11_bs_cbse_02_008', 'c11_bs_cbse_02_009', 'c11_bs_cbse_02_011', 'c11_bs_cbse_03_002', 'c11_bs_cbse_03_003', 'c11_bs_cbse_03_004', 'c11_bs_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a promoter, Avtar, who has invented a fuel-efficient carburettor and wants to incorporate.', goal: 'Master Documents for Incorporation: Memorandum of Association (MoA).' },
    discovery: {
        question: 'A public company files a prospectus and receives applications for 85% of the issue size.',
        options: ['The 90% minimum subscription rule is a statutory protection for investors', 'the company can allot proportionately', 'minimum subscription achieved = automatic allotment'],
        answer: 'The 90% minimum subscription rule is a statutory protection for investors',
        hook: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing.',
    },
    teaching: [
        { title: 'The Memorandum of Association (MoA) is the.', text: 'The Memorandum of Association (MoA) is the charter document of a company that defines its constitution, objectives, and the scope of its operations.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_07_004', title: 'The Memorandum of Association (MoA) is.',
          scaffold: { problem: '"Avtar Auto Components Ltd." is a proposed public company. Its MoA states: Authorised Capital ₹25,00,000 divided into 2,50,000 equity.',
            steps: [
            { text: 'Identify Authorised Capital from Capital Clause = ₹25,00,000 (2,50,000 shares × ₹10).' },
            { text: 'Calculate Issued Capital = 1,50,000 shares × ₹10 = ₹15,00,000.' },
            { text: 'Calculate Subscribed Capital = 1,20,000 shares × ₹10 = ₹12,00,000.' },
            { text: 'Calculate Called-up Capital = Subscribed Capital (since fully paid) = ₹12,00,000.' },
            { text: 'Unissued Capital = Authorised Capital − Issued Capital = ₹25,00,000 − ₹15,00,000 = ₹10,00,000.' },
            { text: 'Unsubscribed Capital = Issued Capital − Subscribed Capital = ₹15,00,000 − ₹12,00,000 = ₹3,00,000.' },
            { text: 'Uncalled Capital = Subscribed Capital − Called-up Capital = ₹12,00,000 − ₹12,00,000 = ₹0.', faded: true, blankAnswer: '(a) Unissued Capital = ₹10,00,000; (b) Unsubscribed Capital.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_07_007', title: 'Capital subscription is the third stage.',
          scaffold: { problem: '"SolarPower Ltd." is a newly incorporated public company. It issues a prospectus for 50 lakh equity shares of ₹10 each at a premium of ₹5.',
            steps: [
            { text: 'Calculate issue size = Number of shares offered × Issue price per share.' },
            { text: 'Calculate minimum subscription = 90% of issue size = 0.90 × ₹7,50,00,000 = ₹6,75,00,000.' },
            { text: 'Calculate application money received = Shares applied × Issue price = 48,00,000 × ₹15 = ₹7,20,00,000.' },
            { text: 'Compare application money (₹7,20,00,000) with minimum subscription (₹6,75,00,000).' },
            { text: 'Since minimum subscription is met and assuming listing permission is obtained, allotment can proceed.', faded: true, blankAnswer: '(a) ₹7,50,00,000 (b) ₹6,75,00,000 (c) Yes, allotment can.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_07_008', title: 'The Certificate of Commencement of.',
          scaffold: { problem: 'XYZ Ltd, a public company, was incorporated on 1st April 2024. It issued a prospectus for 20 lakh equity shares of ₹10 each.',
            steps: [
            { text: 'Calculate minimum subscription required: 90% of 20 lakh shares = 18 lakh shares (SEBI guideline).' },
            { text: 'Compare with applications received: 19 lakh shares > 18 lakh shares → Minimum subscription ACHIEVED.' },
            { text: 'Verify all four conditions: (i) Directors paid qualification shares? Yes (5 × 2000 = 10,000 shares).' },
            { text: 'Calculate 180-day deadline: 180 days from 1st April = 27th September 2024.' },
            { text: 'Determine business start date: Certificate is issued AFTER ROC verifies declaration (filed 10th June).', faded: true, blankAnswer: '(a) Yes, minimum subscription achieved (19 lakh > 18 lakh)..' }
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
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_005', title: 'Comparative analysis of public sector.',
          scaffold: { problem: 'The Central Government proposes to establish a new enterprise for providing affordable generic medicines across India through a chain of.',
            steps: [
            { text: 'Identify the three candidate forms: Departmental Undertaking (DU), Statutory Corporation (SC), Government Company (GC).' },
            { text: 'Select comparison parameters relevant to the case: (i) Commercial Autonomy (pricing, outlet decisions), (ii) Financial.' },
            { text: 'Evaluate each form on parameters using NCERT features: DU – low autonomy (ministry approval), budget finance (no.' },
            { text: 'Match case requirements: Commercial operation & flexibility → GC best; Public accountability → all satisfy but DU/SC.' },
            { text: 'Conclude: Government Company is most suitable because it balances commercial autonomy (Companies Act) with sufficient.', faded: true, blankAnswer: 'Government Company (e.g., on the lines of HLL Lifecare Ltd.)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_006', title: 'The changing role of the public sector.',
          scaffold: { problem: 'The Government of India holds 80% equity in a non-strategic PSU (a government company) valued at ₹10,000 crore.',
            steps: [
            { text: 'Identify current holding (80%) and target holding (51%) => stake to be sold = 29%.' },
            { text: 'Calculate proceeds = 29% of enterprise value = 0.29 × ₹10,000 crore = ₹2,900 crore.' },
            { text: 'Determine if control transfers: post-disinvestment government holds 51% (>50%), so management control remains with.' },
            { text: 'Classify: Since government retains majority stake and control, this is minority disinvestment, NOT privatisation.' },
            { text: 'Link to 1991 policy: "Bring down government equity in non-strategic PSUs to 26% or lower" — this step moves towards.', faded: true, blankAnswer: 'Disinvestment proceeds = ₹2,900 crore. This is NOT.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_07_007', title: 'Identify each idea',
          dissect: { specimen: 'Documents for Incorporation: Memorandum of Association (MoA)', spots: [
            { id: 's1', label: 'The Memorandum of Association MoA', prompt: 'Which idea is this? — The Memorandum of Association (MoA) is the charter document of a company that defines its.', answer: 'The Memorandum of Association MoA', options: ['The Memorandum of Association MoA', 'Capital subscription is the third', 'The Certificate of Commencement of', 'The private sector comprises business'] },
            { id: 's2', label: 'Capital subscription is the third', prompt: 'Which idea is this? — Capital subscription is the third stage in the formation of a public company where it.', answer: 'Capital subscription is the third', options: ['Capital subscription is the third', 'The Memorandum of Association MoA', 'The Certificate of Commencement of', 'The private sector comprises business'] },
            { id: 's3', label: 'The Certificate of Commencement of', prompt: 'Which idea is this? — The Certificate of Commencement of Business is a legal document issued by the Registrar.', answer: 'The Certificate of Commencement of', options: ['The Certificate of Commencement of', 'The Memorandum of Association MoA', 'Capital subscription is the third', 'The private sector comprises business'] },
            { id: 's4', label: 'The private sector comprises business', prompt: 'Which idea is this? — The private sector comprises business enterprises owned, controlled, and managed by.', answer: 'The private sector comprises business', options: ['The private sector comprises business', 'The Memorandum of Association MoA', 'Capital subscription is the third', 'The Certificate of Commencement of'] },
            { id: 's5', label: 'Comparative analysis of public sector', prompt: 'Which idea is this? — Comparative analysis of public sector enterprises involves systematically evaluating.', answer: 'Comparative analysis of public sector', options: ['Comparative analysis of public sector', 'The Memorandum of Association MoA', 'Capital subscription is the third', 'The Certificate of Commencement of'] },
            { id: 's6', label: 'The changing role of the', prompt: 'Which idea is this? — The changing role of the public sector refers to the strategic shift in government policy.', answer: 'The changing role of the', options: ['The changing role of the', 'The Memorandum of Association MoA', 'Capital subscription is the third', 'The Certificate of Commencement of'] }
          ] } }
    ],
    explore: { component: C11_BusinessStudiesPublicPrivateCompaniesSim, prompt: 'Explore the interactive — Documents for Incorporation: Memorandum of Association (MoA)' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_004', difficulty: 'standard',
          question: 'The Memorandum of Association (MoA) is the charter document of a company that.',
          hint: 'If stuck, revisit the "Documents Required to be Submitted" section in c11_bs_cbse_07_003.',
          misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution.',
          parts: [
                { id: 'a', prompt: '"GreenEnergy Ltd." is a public company with an Objects Clause stating: "To manufacture and sell solar panels." The Board of Directors, without altering the.', answer: 'Step 1: Identify the main object from the Objects Clause',
                  options: ['Step 1: Identify the main object from the Objects Clause', 'essential or incidental'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution only) and that acts.' },
                { id: 'b', prompt: 'Compare the MoA requirements for a public company versus a private company with respect to: (a) minimum number of signatories, (b) wording of the Name Clause,.', answer: '| Aspect | Public Company | Private Company |',
                  options: ['| Aspect | Public Company | Private Company |', 'Private Limited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution only) and that acts.' }
          ],
            remediations: { 'the-moa-can-be-altered': { steps: ['If the student exhibits the above misconceptions: (1) Have them re-read the Objects Clause and ultra vires doctrine in.', '(2) Use the analogy of a municipal corporation\'s charter: a city cannot start a banking business even if all citizens.', '(3) Give a mini-exercise: "Company X\'s MoA authorises ₹1 cr capital.', 'It issues ₹60 lakh shares.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution.',
          parts: [
                { id: 'a', prompt: 'Compare the MoA requirements for a public company versus a private company with respect to: (a) minimum number of signatories, (b) wording of the Name Clause,.', answer: '| Aspect | Public Company | Private Company |',
                  options: ['| Aspect | Public Company | Private Company |', 'Private Limited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution only) and that acts.' }
          ],
            remediations: { 'the-moa-can-be-altered': { steps: ['If the student exhibits the above misconceptions: (1) Have them re-read the Objects Clause and ultra vires doctrine in.', '(2) Use the analogy of a municipal corporation\'s charter: a city cannot start a banking business even if all citizens.', '(3) Give a mini-exercise: "Company X\'s MoA authorises ₹1 cr capital.', 'It issues ₹60 lakh shares.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_007', difficulty: 'standard',
          question: 'Capital subscription is the third stage in the formation of a public company.',
          hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal.',
          misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing.',
          parts: [
                { id: 'a', prompt: 'What is the minimum subscription requirement for a public issue as per SEBI guidelines, and what happens if it is not achieved?', answer: 'The minimum subscription is 90% of the issue size',
                  options: ['The minimum subscription is 90% of the issue size', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' },
                { id: 'b', prompt: 'A public company files a prospectus and receives applications for 85% of the issue size.', answer: 'The 90% minimum subscription rule is a statutory protection for investors',
                  options: ['The 90% minimum subscription rule is a statutory protection for investors', 'the company can allot proportionately', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' },
                { id: 'c', prompt: '"GreenTech Ltd." issues a prospectus for 10 lakh equity shares of ₹10 each at par. Applications are received for 9.2 lakh shares.', answer: 'Issue size = 10,00,000 shares × ₹10 = ₹1,00,00,000',
                  options: ['Issue size = 10,00,000 shares × ₹10 = ₹1,00,00,000', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' }
          ],
            remediations: { 'minimum-subscription-achieved-automatic-allotmen': { steps: ['If a student conflates minimum subscription with listing approval, draw a two-column table: "Condition" vs "Consequence.', 'Row 1: Minimum subscription < 90% → no allotment, full refund.', 'Row 2: Listing permission not obtained in 10 weeks → allotment void, full refund.', 'Emphasise that both are independent "gatekeepers".'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing.',
          parts: [
                { id: 'a', prompt: 'A company receives applications for 95% of its issue size but fails to obtain stock exchange listing permission within 10 weeks of closure of the subscription.', answer: 'The argument is invalid',
                  options: ['The argument is invalid', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' },
                { id: 'b', prompt: 'Design a compliance checklist for the Board of Directors of a newly incorporated public company planning a ₹200 crore IPO.', answer: 'A good checklist includes: (1) SEBI approval under ICDR Regulations',
                  options: ['A good checklist includes: (1) SEBI approval under ICDR Regulations', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' }
          ],
            remediations: { 'minimum-subscription-achieved-automatic-allotmen': { steps: ['If a student conflates minimum subscription with listing approval, draw a two-column table: "Condition" vs "Consequence.', 'Row 1: Minimum subscription < 90% → no allotment, full refund.', 'Row 2: Listing permission not obtained in 10 weeks → allotment void, full refund.', 'Emphasise that both are independent "gatekeepers".'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_008', difficulty: 'standard',
          question: 'The Certificate of Commencement of Business is a legal document issued by the.',
          hint: 'If stuck, revisit c11_bs_cbse_07_006 (Effect of Incorporation) for the legal personality.',
          misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses.',
          parts: [
                { id: 'a', prompt: 'A public company was incorporated on March 1, 2024. By what date must it obtain the Certificate of Commencement of Business to comply with the Companies Act.', answer: 'The deadline is August 28, 2024 (180 days from March 1)',
                  options: ['The deadline is August 28, 2024 (180 days from March 1)', 'within 1 year', 'no deadline'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses on public company.' },
                { id: 'b', prompt: 'Compare the legal position of a contract signed by a company: (a) after Certificate of Incorporation but before Certificate of Commencement, (b) after.', answer: 'after Certificate of Incorporation but before Certificate of Commencement, (',
                  options: ['after Certificate of Incorporation but before Certificate of Commencement, (', 'both are void', 'both are valid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses on public company.' }
          ],
            remediations: { 'the-certificate-of-commencement-of': { steps: ['If a student answers "No, private companies don\'t need it," do NOT just say "read the textbook." Instead: (1) Ask them.', '(3) Assign a 2-mark question: "State any two conditions a private company must fulfill to obtain Certificate of.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses.',
          parts: [
                { id: 'a', prompt: 'A private company argues: "We don\'t invite public subscription, so we don\'t need minimum subscription.', answer: 'Invalid argument',
                  options: ['Invalid argument', 'both public and private', 'private companies are exempt – a common error from misreading the scope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses on public company.' },
                { id: 'b', prompt: 'Compare the legal position of a contract signed by a company: (a) after Certificate of Incorporation but before Certificate of Commencement, (b) after.', answer: 'after Certificate of Incorporation but before Certificate of Commencement, (',
                  options: ['after Certificate of Incorporation but before Certificate of Commencement, (', 'both are void', 'both are valid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses on public company.' }
          ],
            remediations: { 'the-certificate-of-commencement-of': { steps: ['If a student answers "No, private companies don\'t need it," do NOT just say "read the textbook." Instead: (1) Ask them.', '(3) Assign a 2-mark question: "State any two conditions a private company must fulfill to obtain Certificate of.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_001', difficulty: 'standard',
          question: 'The private sector comprises business enterprises owned, controlled, and.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
          misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The private sector comprises business enterprises owned, controlled, and managed by',
                  options: ['The private sector comprises business enterprises owned, controlled, and managed by', 'The Memorandum of Association (MoA) is the charter document of a company that defines its', 'Capital subscription is the third stage in the formation of a public company where it', 'The Certificate of Commencement of Business is a legal document issued by the Registrar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.' }
          ],
            remediations: { 'students-consistently-confuse-public-sector': { steps: ['Ask the student to write the legal definition of \'Government Company\' (Sec 2(45) Companies Act, 2013) and \'Public.', 'Highlight the words "held by the Central Government/State Government" vs "minimum seven members".', 'Give a concrete example: "Indian Oil Corporation Ltd. (IOCL) – 51.5% govt holding → Public Sector Government Company.', 'Drill with 5 rapid-fire names (ONGC, TCS, FCI, SBI, Infosys) requiring the student to state: "Public/Private + Form +.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_005', difficulty: 'standard',
          question: 'Comparative analysis of public sector enterprises involves systematically.',
          hint: 'If stuck, revisit the "Features", "Merits", and "Limitations" sub-sections of nodes 002,.',
          misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that.',
          parts: [
                { id: 'a', prompt: 'Explain why a Statutory Corporation is considered a \'body corporate\' while a Departmental Undertaking is not, and state one practical consequence of this.', answer: 'A Statutory Corporation is a body corporate',
                  options: ['A Statutory Corporation is a body corporate', 'Government Company', 'Statutory Corporation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that ≥51% government.' },
                { id: 'b', prompt: 'The Government wants to set up an enterprise for strategic defence production (missiles) where secrecy and direct parliamentary control are paramount.', answer: 'Departmental Undertaking is most suitable',
                  options: ['Departmental Undertaking is most suitable', 'Government Company', 'Statutory Corporation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that ≥51% government.' },
                { id: 'c', prompt: 'Compare the financing mechanisms of the three forms and analyse how each mechanism impacts the enterprise\'s ability to respond to market opportunities.', answer: 'Departmental Undertaking: Financed by budgetary appropriation',
                  options: ['Departmental Undertaking: Financed by budgetary appropriation', 'Government Company', 'Statutory Corporation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that ≥51% government.' }
          ],
            remediations: { 'government-company-implies-a-private': { steps: ['Re-read the "Features" section of each form in nodes 002, 003, 004 and highlight every phrase describing "control",.', 'Create a 3×3 matrix: rows = forms, columns = Source of Power, Appointment of Top Management, Scope of Operations.', 'For each column, ask: "Who ultimately decides—the Minister, the Board, or the Act?" 4.', 'Write one sentence per form explaining how that decision-flow affects autonomy.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_006', difficulty: 'standard',
          question: 'The changing role of the public sector refers to the strategic shift in.',
          hint: 'Revisit node c11_bs_cbse_03_005 (Comparative Analysis of Public Enterprise Forms) to.',
          misconception: 'Students often equate "disinvestment" with "privatisation" and assume the government always sells 100% stake and loses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The changing role of the public sector refers to the strategic shift in government policy',
                  options: ['The changing role of the public sector refers to the strategic shift in government policy', 'The Memorandum of Association (MoA) is the charter document of a company that defines its', 'Capital subscription is the third stage in the formation of a public company where it', 'The Certificate of Commencement of Business is a legal document issued by the Registrar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "disinvestment" with "privatisation" and assume the government always sells 100% stake and loses control.' }
          ],
            remediations: { 'students-often-equate-disinvestment-with': { steps: ['Draw a spectrum line: "Minority Stake Sale (OFS/ETF) → Majority Stake Sale (Strategic Sale) → 100% Sale.', 'Place three real examples on it: LIC IPO (2022) at minority, Air India (2022) at strategic, and a hypothetical 100%.', 'Ask the student to label each point with "% stake sold" and "Control transferred?', 'Have them re-read the 1991 policy line: "Bring down government equity in all non-strategic PSUs to 26% or lower, if.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
