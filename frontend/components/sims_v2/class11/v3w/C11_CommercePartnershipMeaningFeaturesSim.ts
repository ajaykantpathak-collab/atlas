import type { SimDef } from '../../engine/types';
import C11_CommercePartnershipMeaningFeaturesSim from '../../../simulations/c6_12/C11_CommercePartnershipMeaningFeaturesSim';

/** v3 wrapped master — C11_CommercePartnershipMeaningFeaturesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_commercepartnershipmeaningfeaturessim: SimDef = {
    id: 'v3w_c11_commercepartnershipmeaningfeaturessim',
    title: 'Partnership: Meaning, Features and Types',
    subtitle: 'This node covers the meaning, essential features, and classification of partnerships (by.',
    classLevel: 11, subject: 'business_studies', topic: 'Partnership: Meaning, Features and Types',
    chapters: [],
    nodeIds: ['c11_bs_cbse_02_003', 'c11_bs_cbse_03_001', 'c11_bs_cbse_03_007', 'c11_bs_cbse_02_002', 'c11_bs_cbse_02_008', 'c11_bs_cbse_02_011', 'c11_bs_cbse_02_004', 'c11_bs_cbse_02_005', 'c11_bs_cbse_02_006', 'c11_bs_cbse_02_010', 'c11_bs_cbse_03_005', 'c11_bs_cbse_08_001', 'c11_bs_cbse_08_006', 'c11_bs_cbse_10_003', 'c11_bs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine two friends, Priya and Rohan, want to start a bakery together.', goal: 'Master Partnership: Meaning, Features and Types.' },
    discovery: {
        question: 'Two classmates, Aisha and Vikram, agree to buy and sell used textbooks online. They split profits equally but have no written agreement.',
        options: ['Yes, Aisha is liable for the full debt', 'Aisha isn\'t liable', 'registration creates a partnership'],
        answer: 'Yes, Aisha is liable for the full debt',
        hook: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.',
    },
    teaching: [
        { title: 'Partnership is a form of business.', text: 'Partnership is a form of business organisation defined under the Indian Partnership Act, 1932 as the relation between two or more persons who have agreed to share the profits of a lawful business.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bs_cbse_02_003', title: 'Partnership is a form of business.',
          scaffold: { problem: 'Rahul and Simran want to start a food truck business. Rahul contributes ₹8 lakh capital and will handle cooking.',
            steps: [
            { text: 'Check essential features — agreement (oral implied), profit sharing (70:30), lawful business (food truck), mutual.' },
            { text: 'Apply joint and several liability — in a general partnership, every partner is liable for the full debt regardless of.' },
            { text: 'Identify disabilities of non-registration under Section 69 — the firm cannot sue the supplier (or any third party) for.' },
            { text: 'Synthesise — the supplier can recover from Simran\'s personal assets; the firm cannot counter-sue the supplier for.' },
            { text: 'Verify — all conclusions flow directly from Indian Partnership Act, 1932 provisions on formation, liability, and.', faded: true, blankAnswer: '(a) Yes, valid partnership — all five essential features.' }
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
        { type: 'scaffold', nodeId: 'c11_bs_cbse_03_007', title: 'A joint venture is a strategic alliance.',
          scaffold: { problem: '"SolarTech India Pvt Ltd (Indian), a rooftop solar EPC contractor, wants to bid for a 500 MW government solar park tender requiring.',
            steps: [
            { text: 'Identify the need for a new legal entity – the tender requires a single bidding entity with consolidated net worth, the.' },
            { text: 'Map SolarTech\'s benefits: (ii) Access to new markets/tech (SunTrack\'s trackers), (iii) Access to technology (tracker.' },
            { text: 'Map SunTrack\'s benefits: (v) Low cost of production (Indian EPC execution, labor, structural materials), (ii) Access to.' },
            { text: 'Identify critical JV Agreement clauses: (A) **Deadlock Resolution Mechanism** (e.g., Texas Shootout or Chairman\'s.' },
            { text: 'Verify alignment – EJV structure supports all 6 benefits; clauses address project-specific risks (deadlock in 2-party.', faded: true, blankAnswer: '(a) EJV required for asset-holding, limited liability,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_02_002', title: 'Joint Hindu Family Business is a.',
          scaffold: { problem: 'The Sharmas are a Hindu Undivided Family in Delhi. The family consists of: Grandfather (72, Karta), Father (48), Mother (45), Elder Son.',
            steps: [
            { text: 'Identify coparceners under Hindu Succession Act, 1956 (as amended 2005).' },
            { text: 'Determine liability structure. Karta (Grandfather) has UNLIMITED liability.' },
            { text: 'Calculate shortfall. Debt = ₹1.5 crore, Business assets = ₹80 lakh. Shortfall = ₹70 lakh.' },
            { text: 'Apply liability rules. Bank can recover full ₹70 lakh from Karta\'s personal assets (unlimited liability).' },
            { text: 'Succession on Karta\'s death. Next eldest coparcener = Father (48) becomes Karta automatically by survivorship.' },
            { text: 'Verify with Hindu Law principles. Survivorship ensures continuity; partition would be needed to end the firm.', faded: true, blankAnswer: '(a) Coparceners: Grandfather, Father, Elder Son, Younger.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_02_008', title: 'A Joint Stock Company is an artificial.',
          scaffold: { problem: '"GreenEnergy Pvt Ltd" is incorporated with authorised capital of ₹10 crore divided into 1 crore equity shares of ₹10 each.',
            steps: [
            { text: 'Identify share capital structure — authorised 1 cr shares × ₹10 = ₹10 cr; issued 60 lakh shares × ₹10 = ₹6 cr.' },
            { text: 'Application money received — 80 lakh applications × ₹3 = ₹2.4 cr.' },
            { text: 'Allotment money due — 60 lakh shares × ₹4 = ₹2.4 cr. Less excess application adjusted ₹60 lakh = ₹1.8 cr due on.' },
            { text: 'Call money — 60 lakh shares × ₹3 = ₹1.8 cr due on call.' },
            { text: 'Shareholder liability — 500 shares × ₹3 unpaid call = ₹1,500 maximum (limited to unpaid amount on shares held).' },
            { text: 'Verify total — Application ₹1.8 cr + Allotment ₹1.8 cr + Call ₹1.8 cr = ₹5.4 cr received (if fully paid), matching 60.', faded: true, blankAnswer: '(a) ₹1.8 crore retained on application (after.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_02_011', title: 'Distinction between Forms of Business.',
          scaffold: { problem: 'Meena runs a successful home-based bakery (Sole Proprietorship). She wants to expand to a retail outlet needing ₹15 lakh.',
            steps: [
            { text: 'Identify Meena\'s requirements: Retain control, raise ₹10 lakh, limit friend\'s liability, friend wants passive role and.' },
            { text: 'Analyze Partnership option: Friend becomes partner → Unlimited joint & several liability (violates req 1).' },
            { text: 'Analyze Private Company option: Incorporate company, Meena 60%, friend 40%.' },
            { text: 'Compare formation cost: Partnership = simple agreement. Private Company = registration, MOA/AOA, fees (~₹10k-15k),.' },
            { text: 'Conclude: Private Limited Company better meets all stated requirements despite higher initial formality.', faded: true, blankAnswer: 'Private Limited Company is the better option. It satisfies.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bs_cbse_03_001', title: 'Identify each idea',
          dissect: { specimen: 'Partnership: Meaning, Features and Types', spots: [
            { id: 's1', label: 'Partnership is a form of', prompt: 'Which idea is this? — Partnership is a form of business organisation defined under the Indian Partnership Act,.', answer: 'Partnership is a form of', options: ['Partnership is a form of', 'The private sector comprises business', 'A joint venture is a', 'Joint Hindu Family Business is'] },
            { id: 's2', label: 'The private sector comprises business', prompt: 'Which idea is this? — The private sector comprises business enterprises owned, controlled, and managed by.', answer: 'The private sector comprises business', options: ['The private sector comprises business', 'Partnership is a form of', 'A joint venture is a', 'Joint Hindu Family Business is'] },
            { id: 's3', label: 'A joint venture is a', prompt: 'Which idea is this? — A joint venture is a strategic alliance where two or more independent business entities.', answer: 'A joint venture is a', options: ['A joint venture is a', 'Partnership is a form of', 'The private sector comprises business', 'Joint Hindu Family Business is'] },
            { id: 's4', label: 'Joint Hindu Family Business is', prompt: 'Which idea is this? — Joint Hindu Family Business is a distinct form of business organisation unique to India,.', answer: 'Joint Hindu Family Business is', options: ['Joint Hindu Family Business is', 'Partnership is a form of', 'The private sector comprises business', 'A joint venture is a'] },
            { id: 's5', label: 'A Joint Stock Company is', prompt: 'Which idea is this? — A Joint Stock Company is an artificial legal person created by law, having a separate.', answer: 'A Joint Stock Company is', options: ['A Joint Stock Company is', 'Partnership is a form of', 'The private sector comprises business', 'A joint venture is a'] },
            { id: 's6', label: 'Distinction between Forms of Business', prompt: 'Which idea is this? — Distinction between Forms of Business Organisation refers to the systematic comparison of.', answer: 'Distinction between Forms of Business', options: ['Distinction between Forms of Business', 'Partnership is a form of', 'The private sector comprises business', 'A joint venture is a'] }
          ] } }
    ],
    explore: { component: C11_CommercePartnershipMeaningFeaturesSim, prompt: 'Explore the interactive — Partnership: Meaning, Features and Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_003', difficulty: 'standard',
          question: 'Partnership is a form of business organisation defined under the Indian.',
          hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship) — specifically the "Limited resources".',
          misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.',
          parts: [
                { id: 'a', prompt: 'Two classmates, Aisha and Vikram, agree to buy and sell used textbooks online. They split profits equally but have no written agreement.', answer: 'Yes, Aisha is liable for the full debt',
                  options: ['Yes, Aisha is liable for the full debt', 'Aisha isn\'t liable', 'registration creates a partnership'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' },
                { id: 'b', prompt: 'A partnership firm has three partners: Meena (active), Karim (sleeping), and Leila (nominal). The firm takes a loan of ₹10 lakh from a bank. The firm defaults.', answer: 'The bank can demand the full ₹6 lakh from Leila alone',
                  options: ['The bank can demand the full ₹6 lakh from Leila alone', 'Leila pays only her profit-sharing ratio', 'Leila pays nothing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' },
                { id: 'c', prompt: 'Compare "Partnership at Will" and "Particular Partnership" on the basis of: (a) duration, (b) mode of dissolution, (c) suitability for a construction project.', answer: '| Basis | Partnership at Will | Particular Partnership |',
                  options: ['| Basis | Partnership at Will | Particular Partnership |', 'particular partnership ends only by notice', 'which type for a 2-year software project?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' }
          ],
            remediations: { 'registration-creates-a-partnership': { steps: ['Show the exact Section 4 definition — highlight "relation between persons... agreed to share profits."', 'Contrast "formation" (agreement) vs. "registration" (entry in Register of Firms).', 'Use a concrete example: "Ravi and Sita start a café with a handshake deal. They are partners from Day 1.', 'Assign a 2-minute write: "List 3 disabilities of an unregistered firm." This separates the concept from the procedural.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.',
          parts: [
                { id: 'a', prompt: '"Limited Partnership is superior to General Partnership because it protects all partners with limited liability." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'limited partnership protects everyone', 'limited', 'registration creates a partnership'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' }
          ],
            remediations: { 'registration-creates-a-partnership': { steps: ['Show the exact Section 4 definition — highlight "relation between persons... agreed to share profits."', 'Contrast "formation" (agreement) vs. "registration" (entry in Register of Firms).', 'Use a concrete example: "Ravi and Sita start a café with a handshake deal. They are partners from Day 1.', 'Assign a 2-minute write: "List 3 disabilities of an unregistered firm." This separates the concept from the procedural.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_001', difficulty: 'standard',
          question: 'The private sector comprises business enterprises owned, controlled, and.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
          misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The private sector comprises business enterprises owned, controlled, and managed by',
                  options: ['The private sector comprises business enterprises owned, controlled, and managed by', 'Partnership is a form of business organisation defined under the Indian Partnership Act,', 'A joint venture is a strategic alliance where two or more independent business entities', 'Joint Hindu Family Business is a distinct form of business organisation unique to India,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.' }
          ],
            remediations: { 'students-consistently-confuse-public-sector': { steps: ['Ask the student to write the legal definition of \'Government Company\' (Sec 2(45) Companies Act, 2013) and \'Public.', 'Highlight the words "held by the Central Government/State Government" vs "minimum seven members".', 'Give a concrete example: "Indian Oil Corporation Ltd. (IOCL) – 51.5% govt holding → Public Sector Government Company.', 'Drill with 5 rapid-fire names (ONGC, TCS, FCI, SBI, Infosys) requiring the student to state: "Public/Private + Form +.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_007', difficulty: 'standard',
          question: 'A joint venture is a strategic alliance where two or more independent business.',
          hint: 'If stuck, revisit **c11_bs_cbse_03_001** (Private/Public/Global classification) to.',
          misconception: 'Students frequently confuse **Joint Venture (JV)** with **Partnership Firm** or **Merger/Amalgamation**. 1.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the risk exposure of the partners in a Contractual JV (CJV) vs. an Equity JV (EJV) when the venture incurs massive unexpected losses.', answer: 'In an EJV, a new separate legal entity (company/LLP) is formed',
                  options: ['In an EJV, a new separate legal entity (company/LLP) is formed', 'both have limited liability', 'CJV has less risk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse **Joint Venture (JV)** with **Partnership Firm** or **Merger/Amalgamation**. 1.' }
          ],
            remediations: { 'students-frequently-confuse-joint-venture': { steps: ['** Draw a 2x2 matrix on paper: Rows = "New Entity Created?" (Yes/No), Columns = "Shared Ownership?" (Yes/No).', '** For each quadrant, write *one* Indian example (e.g., EJV: Maruti Suzuki (historical); CJV: Franchise like McDonald\'s.', '** Re-read NCERT 3.6.1 key phrases: "new jointly-owned entity is *not* created" (CJV) vs "separate business entity...', '** Verbally explain to a peer: "In a CJV, if the venture fails, my main company isn\'t automatically liable for the.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse **Joint Venture (JV)** with **Partnership Firm** or **Merger/Amalgamation**. 1.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the risk exposure of the partners in a Contractual JV (CJV) vs. an Equity JV (EJV) when the venture incurs massive unexpected losses.', answer: 'In an EJV, a new separate legal entity (company/LLP) is formed',
                  options: ['In an EJV, a new separate legal entity (company/LLP) is formed', 'both have limited liability', 'CJV has less risk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse **Joint Venture (JV)** with **Partnership Firm** or **Merger/Amalgamation**. 1.' }
          ],
            remediations: { 'students-frequently-confuse-joint-venture': { steps: ['** Draw a 2x2 matrix on paper: Rows = "New Entity Created?" (Yes/No), Columns = "Shared Ownership?" (Yes/No).', '** For each quadrant, write *one* Indian example (e.g., EJV: Maruti Suzuki (historical); CJV: Franchise like McDonald\'s.', '** Re-read NCERT 3.6.1 key phrases: "new jointly-owned entity is *not* created" (CJV) vs "separate business entity...', '** Verbally explain to a peer: "In a CJV, if the venture fails, my main company isn\'t automatically liable for the.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_002', difficulty: 'standard',
          question: 'Joint Hindu Family Business is a distinct form of business organisation unique.',
          hint: 'Revisit c11_bs_cbse_02_001 "Sole Proprietorship: Features and Limitations" - specifically.',
          misconception: 'Students often believe that "Karta is like a Managing Partner in a Partnership firm" because both manage the business.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Joint Hindu Family Business is a distinct form of business organisation unique to India,',
                  options: ['Joint Hindu Family Business is a distinct form of business organisation unique to India,', 'Partnership is a form of business organisation defined under the Indian Partnership Act,', 'The private sector comprises business enterprises owned, controlled, and managed by', 'A joint venture is a strategic alliance where two or more independent business entities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Karta is like a Managing Partner in a Partnership firm" because both manage the business.' }
          ],
            remediations: { 'karta-is-like-a-managing': { steps: ['Ask them to list 3 ways Karta becomes Karta (birth, seniority, no agreement) vs Managing Partner (agreement, consent,.', 'Show a case where Karta takes a loan for family marriage (personal purpose) - firm is bound because Karta\'s implied.', 'Contrast removal: Karta continues until death/partition; Managing Partner can be ousted by majority.', 'Have them write a table: "Karta vs Managing Partner" on 5 parameters: Source of authority, Liability, Removal,.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_008', difficulty: 'standard',
          question: 'A Joint Stock Company is an artificial legal person created by law, having a.',
          hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship liability) and c11_bs_cbse_02_003.',
          misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay.',
          parts: [
                { id: 'a', prompt: 'Explain why the \'veil of incorporation\' (separate legal entity) is considered both a shield and a sword for shareholders, using the Salomon v. Salomon & Co.', answer: 'The veil acts as a shield',
                  options: ['The veil acts as a shield', 'shareholders are protected from everything'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay more." This is wrong.' },
                { id: 'b', prompt: 'Compare the \'transferability of shares\' feature in a Public Company vs. Private Company vs. Partnership.', answer: 'Public Company: Freely transferable on stock exchanges',
                  options: ['Public Company: Freely transferable on stock exchanges', 'private company shares cannot be transferred'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay more." This is wrong.' }
          ],
            remediations: { 'limited-liability-means-shareholders-lose': { steps: ['Ask the student to read the NCERT example on page 45 (Akshay, 2,000 shares, ₹7 paid, ₹3 unpaid).', 'Have them calculate liability for three cases: (a) fully paid shares, (b) partly paid shares, (c) shares with premium.', 'Show a 2020 CBSE question where a shareholder was held liable for unpaid calls after winding up.', 'Clarify: "Limited liability = limited to unpaid share capital, not limited to invested amount."', 'Give a practice question: "Priya holds 500 shares of ₹100 each, ₹80 paid. Company fails.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay.',
          parts: [
                { id: 'a', prompt: 'Compare the \'transferability of shares\' feature in a Public Company vs. Private Company vs. Partnership.', answer: 'Public Company: Freely transferable on stock exchanges',
                  options: ['Public Company: Freely transferable on stock exchanges', 'private company shares cannot be transferred'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay more." This is wrong.' }
          ],
            remediations: { 'limited-liability-means-shareholders-lose': { steps: ['Ask the student to read the NCERT example on page 45 (Akshay, 2,000 shares, ₹7 paid, ₹3 unpaid).', 'Have them calculate liability for three cases: (a) fully paid shares, (b) partly paid shares, (c) shares with premium.', 'Show a 2020 CBSE question where a shareholder was held liable for unpaid calls after winding up.', 'Clarify: "Limited liability = limited to unpaid share capital, not limited to invested amount."', 'Give a practice question: "Priya holds 500 shares of ₹100 each, ₹80 paid. Company fails.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_011', difficulty: 'standard',
          question: 'Distinction between Forms of Business Organisation refers to the systematic.',
          hint: 'Revisit the "Features" and "Limitations" subsections of nodes 001 (Sole Proprietorship),.',
          misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a.',
          parts: [
                { id: 'a', prompt: 'Explain why "liability" is considered the most critical basis for distinguishing between forms of business organisation from an investor\'s perspective.', answer: 'Liability determines the maximum financial risk an owner bears',
                  options: ['Liability determines the maximum financial risk an owner bears', 'liability is about who manages the business', 'Partnership has limited liability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' },
                { id: 'b', prompt: 'Rahul wants to start a business with his two friends. They have ₹10 lakh combined savings, want to avoid complex legal formalities, but insist that their.', answer: 'They should choose a **Private Limited Company**',
                  options: ['They should choose a **Private Limited Company**', 'personal assets at risk', 'Partnership has limited liability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' },
                { id: 'c', prompt: 'Compare Partnership and Joint Stock Company on the bases of (a) Continuity of Existence and (b) Transferability of Ownership.', answer: 'Continuity of Existence and (',
                  options: ['Continuity of Existence and (', 'Private Company shares are freely transferable', 'Partnership has limited liability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' }
          ],
            remediations: { 'partnership-has-limited-liability-because': { steps: ['**For Liability Misconception**: Draw a two-column table: "Internal Loss Sharing" (Partner A 60%, Partner B 40%) vs.', 'Use a numerical example: Firm debt ₹10 lakh, assets ₹2 lakh.', 'Creditor demands ₹8 lakh from Partner A (rich).', 'A pays ₹8 lakh, then sues B for ₹3.2 lakh (40%).'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "A Cooperative Society is always a better choice than a Private Company for a group of 20 artisans wanting to pool resources, because.', answer: 'The statement is **flawed**',
                  options: ['The statement is **flawed**', 'Partnership has limited liability', 'Private Company can invite public subscription', '**"Partnership has limited liability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' }
          ],
            remediations: { 'partnership-has-limited-liability-because': { steps: ['**For Liability Misconception**: Draw a two-column table: "Internal Loss Sharing" (Partner A 60%, Partner B 40%) vs.', 'Use a numerical example: Firm debt ₹10 lakh, assets ₹2 lakh.', 'Creditor demands ₹8 lakh from Partner A (rich).', 'A pays ₹8 lakh, then sues B for ₹3.2 lakh (40%).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
