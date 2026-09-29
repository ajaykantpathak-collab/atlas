import type { SimDef } from '../../engine/types';
import C11_BusinessStudiesMeaningFeaturesBusinessSim from '../../../simulations/c6_12/C11_BusinessStudiesMeaningFeaturesBusinessSim';

/** v3 wrapped master — C11_BusinessStudiesMeaningFeaturesBusinessSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_businessstudiesmeaningfeaturesbusinesssim: SimDef = {
    id: 'v3w_c11_businessstudiesmeaningfeaturesbusinesssim',
    title: 'Private Sector and Public Sector: Meaning and Distinction',
    subtitle: 'This node covers the fundamental meaning, distinguishing features, and classification of.',
    classLevel: 11, subject: 'business_studies', topic: 'Private Sector and Public Sector: Meaning and Distinction',
    chapters: [],
    nodeIds: ['c11_bs_cbse_03_001', 'c11_bs_cbse_08_001', 'c11_bs_cbse_08_006', 'c11_bs_cbse_10_003', 'c11_bs_cbse_02_003', 'c11_bs_cbse_05_006', 'c11_bs_cbse_05_007', 'c11_bs_cbse_03_007', 'c11_bs_cbse_08_007', 'c11_bs_cbse_10_001', 'c11_bs_cbse_11_001', 'c11_bs_cbse_11_004', 'c11_bs_cbse_11_005', 'c11_bs_cbse_11_006', 'c11_bs_cbse_05_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are reading a news headline: "Government to sell 51% stake in BPCL to private players." You.', goal: 'Master Private Sector and Public Sector: Meaning and Distinction.' },
    discovery: {
        question: 'Compare and contrast "Owner\'s funds" and "Borrowed funds" on the following dimensions: (a) Claim on assets during liquidation, (b) Cost to the business, (c).',
        options: ['| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds', 'owner\'s funds have no cost', 'borrowed funds always dilute control'],
        answer: '| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds',
        hook: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a.',
    },
    teaching: [
        { title: 'The private sector comprises business.', text: 'The private sector comprises business enterprises owned, controlled, and managed by private individuals or groups (sole proprietorship, partnership, Joint Hindu Family, cooperative, company) with the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c11_bs_cbse_08_001', title: 'Business finance refers to the monetary.',
          scaffold: { problem: '"Sharma Textiles" (a partnership firm in Surat) needs ₹75 lakh: ₹50 lakh for new looms (fixed asset, 10-year life) and ₹25 lakh for cotton.',
            steps: [
            { text: 'Calculate the funding gap: Total need ₹75L - Partner savings ₹15L = ₹60L gap.' },
            { text: 'Classify the *needs*: Looms (₹40L gap) → Fixed capital requirement → Long-term need (>5 years).' },
            { text: 'Classify Source A (7-year bank loan): Period → Long-term (>5 years); Ownership → Borrowed funds; Generation → External.' },
            { text: 'Classify Source B (90-day trade credit): Period → Short-term (≤1 year); Ownership → Borrowed funds; Generation →.' },
            { text: 'Classify Source C (new partner ₹20L): Period → Long-term (permanent capital, no repayment); Ownership → Owner\'s funds;.' },
            { text: 'Match sources to needs: Source A (long-term borrowed) suits fixed capital (looms).', faded: true, blankAnswer: '| Need / Source | Amount | Need Classification | Source:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_08_006', title: 'A debenture is a written instrument.',
          scaffold: { problem: 'XYZ Ltd. issues 5,000 secured, non-convertible debentures of ₹100 each at 10% per annum, redeemable after 5 years.',
            steps: [
            { text: 'Identify the given data: Number of debentures = 5,000, Face value = ₹100, Coupon rate = 10%, Tax rate = 30%.' },
            { text: 'Calculate total face value = 5,000 × ₹100 = ₹5,00,000.' },
            { text: 'Compute annual interest payment = Total face value × Coupon rate = ₹5,00,000 × 10% = ₹50,000.' },
            { text: 'Compute tax shield = Annual interest × Tax rate = ₹50,000 × 30% = ₹15,000.' },
            { text: 'Compute after-tax cost of debentures = Annual interest - Tax shield = ₹50,000 - ₹15,000 = ₹35,000.', faded: true, blankAnswer: '(a) Annual interest payment = ₹50,000; (b) Tax shield =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_10_003', title: 'Retail trade refers to the business.',
          scaffold: { problem: 'A consumer cooperative store purchases 500 kg of wheat flour from a miller at Rs 28/kg and sells it to 200 member-families in 1 kg packs at.',
            steps: [
            { text: 'Identify the retailer type — consumer cooperative store (fixed-shop large retailer, owned by consumers).' },
            { text: 'Calculate total revenue — 200 families × 1 kg × Rs 32/kg = Rs 6,400.' },
            { text: 'Calculate cost of goods sold — 500 kg × Rs 28/kg = Rs 14,000. Wait, only 200 kg sold!' },
            { text: 'Calculate total expenses — Packaging Rs 1,500 + Transport Rs 2,000 + Rent Rs 3,000 = Rs 6,500.' },
            { text: 'Calculate profit/loss — Revenue Rs 6,400 - COGS Rs 5,600 - Expenses Rs 6,500 = Loss of Rs 5,700.' },
            { text: 'Identify services demonstrated — (i) Regular availability (members get flour monthly), (ii) Lower prices (Rs 32 vs.', faded: true, blankAnswer: 'Monthly loss of Rs 5,700. Services demonstrated: regular.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_02_003', title: 'Partnership is a form of business.',
          scaffold: { problem: 'Rahul and Simran want to start a food truck business. Rahul contributes ₹8 lakh capital and will handle cooking.',
            steps: [
            { text: 'Check essential features — agreement (oral implied), profit sharing (70:30), lawful business (food truck), mutual.' },
            { text: 'Apply joint and several liability — in a general partnership, every partner is liable for the full debt regardless of.' },
            { text: 'Identify disabilities of non-registration under Section 69 — the firm cannot sue the supplier (or any third party) for.' },
            { text: 'Synthesise — the supplier can recover from Simran\'s personal assets; the firm cannot counter-sue the supplier for.' },
            { text: 'Verify — all conclusions flow directly from Indian Partnership Act, 1932 provisions on formation, liability, and.', faded: true, blankAnswer: '(a) Yes, valid partnership — all five essential features.' }
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
        { type: 'dissect', nodeId: 'c11_bs_cbse_08_001', title: 'Identify each idea',
          dissect: { specimen: 'Private Sector and Public Sector: Meaning and Distinction', spots: [
            { id: 's1', label: 'The private sector comprises business', prompt: 'Which idea is this? — The private sector comprises business enterprises owned, controlled, and managed by.', answer: 'The private sector comprises business', options: ['The private sector comprises business', 'Business finance refers to the', 'A debenture is a written', 'Retail trade refers to the'] },
            { id: 's2', label: 'Business finance refers to the', prompt: 'Which idea is this? — Business finance refers to the monetary resources required by a business enterprise to.', answer: 'Business finance refers to the', options: ['Business finance refers to the', 'The private sector comprises business', 'A debenture is a written', 'Retail trade refers to the'] },
            { id: 's3', label: 'A debenture is a written', prompt: 'Which idea is this? — A debenture is a written instrument acknowledging a debt issued by a company under its.', answer: 'A debenture is a written', options: ['A debenture is a written', 'The private sector comprises business', 'Business finance refers to the', 'Retail trade refers to the'] },
            { id: 's4', label: 'Retail trade refers to the', prompt: 'Which idea is this? — Retail trade refers to the business activity of purchasing goods in relatively large.', answer: 'Retail trade refers to the', options: ['Retail trade refers to the', 'The private sector comprises business', 'Business finance refers to the', 'A debenture is a written'] },
            { id: 's5', label: 'Partnership is a form of', prompt: 'Which idea is this? — Partnership is a form of business organisation defined under the Indian Partnership Act,.', answer: 'Partnership is a form of', options: ['Partnership is a form of', 'The private sector comprises business', 'Business finance refers to the', 'A debenture is a written'] },
            { id: 's6', label: 'Outsourcing is the strategic business', prompt: 'Which idea is this? — Outsourcing is the strategic business practice of contracting out non-core or routine.', answer: 'Outsourcing is the strategic business', options: ['Outsourcing is the strategic business', 'The private sector comprises business', 'Business finance refers to the', 'A debenture is a written'] }
          ] } }
    ],
    explore: { component: C11_BusinessStudiesMeaningFeaturesBusinessSim, prompt: 'Explore the interactive — Private Sector and Public Sector: Meaning and Distinction' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_001', difficulty: 'standard',
          question: 'The private sector comprises business enterprises owned, controlled, and.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
          misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The private sector comprises business enterprises owned, controlled, and managed by',
                  options: ['The private sector comprises business enterprises owned, controlled, and managed by', 'Business finance refers to the monetary resources required by a business enterprise to', 'A debenture is a written instrument acknowledging a debt issued by a company under its', 'Retail trade refers to the business activity of purchasing goods in relatively large'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.' }
          ],
            remediations: { 'students-consistently-confuse-public-sector': { steps: ['Ask the student to write the legal definition of \'Government Company\' (Sec 2(45) Companies Act, 2013) and \'Public.', 'Highlight the words "held by the Central Government/State Government" vs "minimum seven members".', 'Give a concrete example: "Indian Oil Corporation Ltd. (IOCL) – 51.5% govt holding → Public Sector Government Company.', 'Drill with 5 rapid-fire names (ONGC, TCS, FCI, SBI, Infosys) requiring the student to state: "Public/Private + Form +.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_001', difficulty: 'standard',
          question: 'Business finance refers to the monetary resources required by a business.',
          hint: 'Revisit Class 10 Economics Chapter 3 "Money and Credit" (c10_eco_cbse_03_003,.',
          misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "Owner\'s funds" and "Borrowed funds" on the following dimensions: (a) Claim on assets during liquidation, (b) Cost to the business, (c).', answer: '| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds',
                  options: ['| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds', 'owner\'s funds have no cost', 'borrowed funds always dilute control'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a list of loan types.' }
          ],
            remediations: { 'business-finance-only-means-borrowing': { steps: ['Draw a 2×3 matrix on paper—rows = Fixed Capital Need / Working Capital Need; columns = Period / Ownership / Generation.', 'Place each source from the chapter (equity, preference, debenture, retained earnings, trade credit, bank loan, public.', 'For each cell, write *one reason* why that source fits (e.g., Debenture → Period: Long-term (>5 yrs); Ownership:.', 'Verify with teacher/peer that no source is placed in only one column.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a.',
          parts: [
                { id: 'a', prompt: '"Retained earnings is a cost-free source of finance because the company pays no interest or dividend on it." Evaluate this statement.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'partially true', 'business finance', 'sources of finance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a list of loan types.' },
                { id: 'b', prompt: 'Compare and contrast "Owner\'s funds" and "Borrowed funds" on the following dimensions: (a) Claim on assets during liquidation, (b) Cost to the business, (c).', answer: '| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds',
                  options: ['| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds', 'owner\'s funds have no cost', 'borrowed funds always dilute control', 'business finance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a list of loan types.' }
          ],
            remediations: { 'business-finance-only-means-borrowing': { steps: ['Draw a 2×3 matrix on paper—rows = Fixed Capital Need / Working Capital Need; columns = Period / Ownership / Generation.', 'Place each source from the chapter (equity, preference, debenture, retained earnings, trade credit, bank loan, public.', 'For each cell, write *one reason* why that source fits (e.g., Debenture → Period: Long-term (>5 yrs); Ownership:.', 'Verify with teacher/peer that no source is placed in only one column.'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_006', difficulty: 'standard',
          question: 'A debenture is a written instrument acknowledging a debt issued by a company.',
          hint: 'Revisit node c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and focus on the table.',
          misconception: 'Students often think "debentures are just like long-term bank loans" and therefore assume they always require.',
          parts: [
                { id: 'a', prompt: 'A company issues 1,000 secured, convertible debentures of ₹1,000 each at 9% interest per annum.', answer: 'Annual interest obligation = 1,000 debentures × ₹1,000 × 9% = ₹90,000',
                  options: ['Annual interest obligation = 1,000 debentures × ₹1,000 × 9% = ₹90,000', 'debentures are just like long-term bank loans', 'they always require collateral (security) and cannot be converted into shares'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "debentures are just like long-term bank loans" and therefore assume they always require collateral (security) and.' }
          ],
            remediations: { 'debentures-are-just-like-long': { steps: ['Ask the student to list the four classification pairs from Box C (Secured/Unsecured, Registered/Bearer,.', 'For each pair, have them write one sentence describing the **difference in the holder\'s right** (e.g., "Secured: charge.', 'Then give two mini-cases: (a) A company with no fixed assets wants to borrow — which type?', '(b) An investor wants to exit early by selling in the market — which type?'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "debentures are just like long-term bank loans" and therefore assume they always require.',
          parts: [
                { id: 'a', prompt: '"Debentures are always a cheaper source of finance than equity shares." Evaluate this statement considering tax deductibility, flotation costs, and financial.', answer: 'The statement is not universally true',
                  options: ['The statement is not universally true', 'when sales and earnings are relatively stable', 'debentures are just like long-term bank loans', 'they always require collateral (security) and cannot be converted into shares'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "debentures are just like long-term bank loans" and therefore assume they always require collateral (security) and.' }
          ],
            remediations: { 'debentures-are-just-like-long': { steps: ['Ask the student to list the four classification pairs from Box C (Secured/Unsecured, Registered/Bearer,.', 'For each pair, have them write one sentence describing the **difference in the holder\'s right** (e.g., "Secured: charge.', 'Then give two mini-cases: (a) A company with no fixed assets wants to borrow — which type?', '(b) An investor wants to exit early by selling in the market — which type?'] } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_003', difficulty: 'standard',
          question: 'Retail trade refers to the business activity of purchasing goods in relatively.',
          hint: 'If stuck, revisit c11_bs_cbse_10_002 (Wholesale Trade) and explicitly list the three.',
          misconception: 'Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".',
          parts: [
                { id: 'a', prompt: 'A manufacturer sells 500 units of a product to a trader who sells 50 units each to 10 different buyers.', answer: 'No, the second trader is NOT a retailer',
                  options: ['Correct answer: No, the second trader is NOT a retailer', 'yes, because they sold in small quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly believe that "retailer = small shop" and "wholesaler = big shop/warehouse".' }
          ],
            remediations: { 'students-incorrectly-believe-that-retailer': { steps: ['Give the student three transactions: (a) Big Bazaar sells 1 kg rice to a family; (b) A roadside vendor sells 50 kg.', 'Ask them to classify each as retail/wholesale using ONLY the two NCERT criteria (quantity + buyer purpose).', 'When they misclassify (b) or (c) as retail due to small shop size, explicitly contrast: "The samosa maker buys for.', 'Have them re-write the definition highlighting "ultimate consumer" and "personal non-business use" in different colours.', 'Practice 5 more mixed scenarios until they consistently apply buyer-purpose over shop-size.'] } } },
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
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_006', difficulty: 'standard',
          question: 'Outsourcing is the strategic business practice of contracting out non-core or.',
          hint: 'Revisit Class 8 Economics "Entrepreneurship: Organising Factors of Production".',
          misconception: 'Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call centres, coding).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Outsourcing is the strategic business practice of contracting out non-core or routine',
                  options: ['Outsourcing is the strategic business practice of contracting out non-core or routine', 'The private sector comprises business enterprises owned, controlled, and managed by', 'Business finance refers to the monetary resources required by a business enterprise to', 'A debenture is a written instrument acknowledging a debt issued by a company under its'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate outsourcing exclusively with *offshoring* (sending work overseas) or *IT/BPO* (call centres, coding).' }
          ],
            remediations: { 'students-equate-outsourcing-exclusively-with': { steps: ['Show the hospital-laundry example and ask "Is this outsourcing?" — student says no.', 'Re-read the definition together highlighting three words: "non-core," "external," "agency" — no mention of country or.', 'Have the student list 5 services a neighbourhood café could outsource locally (pest control, accounting, waste.', 'Ask them to redefine outsourcing in their own words without using "foreign" or "IT."', 'Give a mini-quiz with 3 domestic non-IT outsourcing scenarios to cement the corrected mental model.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
