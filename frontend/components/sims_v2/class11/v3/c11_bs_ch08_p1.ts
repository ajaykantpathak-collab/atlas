import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch08_p1: SimDef = {
    id: 'v3_c11_bs_ch08_p1',
    title: 'Sources of Business Finance · Part 1/2',
    subtitle: 'Two classifications, one decision: match the need to the right source.',
    classLevel: 11, subject: 'business_studies', topic: 'Sources of Business Finance · Part 1/2',
    chapters: ['c11_bs_ch08'],
    nodeIds: ['c11_bs_cbse_08_001', 'c11_bs_cbse_08_002', 'c11_bs_cbse_08_003', 'c11_bs_cbse_08_004', 'c11_bs_cbse_08_005', 'c11_bs_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a funding advisor structuring a first-time founder\'s capital plan', intro: 'Your client has ₹5 lakh and needs ₹18 lakh. Every rupee of the gap must be assigned a source — and some sources are dangerous for the job.', goal: 'Define business finance, separate fixed from working capital, and classify sources by period, ownership, and origin.' },
    discovery: {
        question: 'A student insists \'fixed capital and long-term sources are the same thing — both are about more than five years.\' A café owner\'s books prove otherwise. What\'s conflated?',
        options: ['A need with a source — fixed capital is what funds are needed FOR; long-term sources are instruments, and a risky overdraft can still fund machinery', 'Nothing — they are literally identical', 'Profit with revenue — fixed capital is just retained profit', 'Interest with principal — long-term sources have no duration'],
        answer: 'A need with a source — fixed capital is what funds are needed FOR; long-term sources are instruments, and a risky overdraft can still fund machinery',
        hook: 'Finance has two separate maps — what you need money for, and where money comes from — and every funding decision lives at their intersection.',
    },
    teaching: [
        { title: 'Business Finance: Meaning, Nature and Significance', text: 'Business finance refers to the monetary resources required by a business enterprise to establish, operate, and expand its activities, encompassing both fixed capital (for long-term assets) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split a café\'s ₹18 lakh requirement into fixed versus working capital, then tag every candidate source — savings, bank loan, retained profit, lease — by period, ownership, and internal-versus-external origin.',
        labels: ['Business Finance: Meaning, Nature', 'Classification of Sources', 'Owners\' Funds vs Borrowed', 'Equity Shares: Features, Merits', 'Preference Shares: Features, Types', 'Debentures: Meaning, Types'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_001', title: 'Business Finance: Meaning, Nature and Significance',
          caseStudy: { intro: 'Imagine you want to open a café in your neighbourhood—you need ₹15 lakh for equipment and furniture (fixed capital) and ₹3 lakh for initial rent, salaries, and.',
            decisions: [{ prompt: 'State the meaning of business finance as per NCERT and explain why it is referred to as the "lifeblood of business" in exactly two.', options: [
                { text: 'Business finance is the requirement of funds by a business to carry out its various', outcome: 'Business finance is the requirement of funds by a business to carry out its various activities.' },
                { text: 'capital', outcome: 'Not quite — Students believe "business finance" only means *borrowing money from banks* and that "sources.', reveals: 'business-finance-only-means-borrowing' },
                { text: 'business finance', outcome: 'Not quite — Students believe "business finance" only means *borrowing money from banks* and that "sources.', reveals: 'business-finance-only-means-borrowing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_002', title: 'Classification of Sources of Finance: Period Basis and Ownership Basis',
          caseStudy: { intro: 'Imagine you are advising Mr. Anil Singh (from the textbook) who needs ₹50 lakh to open two new restaurant branches.',
            decisions: [{ prompt: 'Define \'long-term sources of finance\' as per NCERT classification and give two examples.', options: [
                { text: 'Long-term sources provide funds for a period exceeding 5 years', outcome: 'Long-term sources provide funds for a period exceeding 5 years.' },
                { text: 'public deposits', outcome: 'Not quite — Students treat **period basis** and **ownership basis** as interchangeable labels rather than.', reveals: 'students-treat-period-basis-and' },
                { text: 'trade credit', outcome: 'Not quite — Students treat **period basis** and **ownership basis** as interchangeable labels rather than.', reveals: 'students-treat-period-basis-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_003', title: 'Owners\' Funds vs Borrowed Funds: Distinction',
          caseStudy: { intro: 'Imagine you are advising Mr. Anil Singh from the textbook case: his restaurant chain expansion needs ₹2 crore.',
            decisions: [{ prompt: 'Define \'owner\'s funds\' and \'borrowed funds\' in one sentence each, using the precise terminology of claim type and repayment obligation.', options: [
                { text: 'Owner\'s funds: Capital provided by owners (shareholders/partners/proprietor) plus', outcome: 'Owner\'s funds: Capital provided by owners (shareholders/partners/proprietor) plus retained.' },
                { text: 'owner\'s funds don\'t need repayment but borrowed funds do', outcome: 'Not quite — Students often believe preference shares are borrowed funds because they carry fixed dividend and.', reveals: 'preference-shares-are-borrowed-funds' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_004', title: 'Equity Shares: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you are advising a successful family-owned restaurant chain (like the one in the NCERT case study) that wants to expand nationally but the owners fear.',
            decisions: [{ prompt: 'Define \'residual ownership\' in the context of equity shareholders and state the exact order of claims on company assets during liquidation.', options: [
                { text: 'Residual ownership means equity shareholders receive what remains after all external', outcome: 'Residual ownership means equity shareholders receive what remains after all external liabilities.' },
                { text: 'equity shareholders get paid first', outcome: 'Not quite — Students believe "equity shares are free money for the company because dividends are not compulsory.', reveals: 'equity-shares-are-free-money' },
                { text: 'they get fixed amount', outcome: 'Not quite — Students believe "equity shares are free money for the company because dividends are not compulsory.', reveals: 'equity-shares-are-free-money' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_006', title: 'Debentures: Meaning, Types and Merits',
          caseStudy: { intro: 'Imagine you want to start a food truck business but need ₹10 lakh for the truck and equipment.',
            decisions: [{ prompt: 'Define a debenture and state the status of a debenture holder in a company.', options: [
                { text: 'A debenture is a written acknowledgment of debt issued by a company under its common', outcome: 'A debenture is a written acknowledgment of debt issued by a company under its common seal, carrying.' },
                { text: 'shareholder', outcome: 'Not quite — Students often think "debentures are just like long-term bank loans" and therefore assume they.', reveals: 'debentures-are-just-like-long' },
                { text: 'debentures are just like long-term bank loans', outcome: 'Not quite — Students often think "debentures are just like long-term bank loans" and therefore assume they.', reveals: 'debentures-are-just-like-long' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your entrepreneur club is budgeting a food-truck business: truck + kitchen fit-out ₹18 lakh, plus ₹4 lakh for fuel, ingredients and staff wages until revenue stabilises. A member proposes funding everything with a 90-day bank overdraft because \'finance is finance — just get the biggest loan you can\'.',
            decisions: [{ prompt: 'How should the ₹22 lakh actually be split and funded?', options: [
                { text: 'Match source to need: the ₹18 lakh is fixed capital (long-term, locked in the truck) best funded by long-term sources — owner\'s equity, long-term loan or lease; the ₹4 lakh is working capital (circulating, day-to-day) suited to short-term sources like overdraft or trade credit. A 90-day overdraft against an 8-year asset forces repayment long before the truck earns it back.', outcome: 'Every source sits on three axes at once — period, ownership, internal/external — and the funding horizon must match the asset\'s life.' },
                { text: 'One big overdraft is fine — a loan is a loan; you can always roll it over.', outcome: 'Short-term money funding a long-term asset creates a maturity mismatch: renewal risk, mounting interest and possible seizure mid-business.', reveals: 'any-loan-funds-anything' },
                { text: 'Fund it all from owner\'s capital and retained earnings — borrowed funds are always dangerous.', outcome: 'Owners\' funds and profits are legitimate internal sources, but ₹22 lakh from a student venture\'s own pocket is unrealistic — and retained earnings don\'t exist before the first profit.', reveals: 'internal-sources-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now classify money twice: by the job it must do, and by the route it arrives — and you never fund a long asset with a short leash.',
            decisions: [{ prompt: 'What comes next? Sources of Business Finance · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sources of Business Finance · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_001', difficulty: 'standard',
          question: 'Business finance refers to the monetary resources required by a business.',
          hint: 'Revisit Class 10 Economics Chapter 3 "Money and Credit" (c10_eco_cbse_03_003.',
          misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "Owner\'s funds" and "Borrowed funds" on the following dimensions: (a) Claim on assets during liquidation, (b) Cost to the business, (c).', answer: '| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds',
                  options: ['| Dimension | Owner\'s Funds (Equity/Retained Earnings) | Borrowed Funds', 'owner\'s funds have no cost', 'borrowed funds always dilute control', 'business finance'],
                  hint: 'Revisit Class 10 Economics Chapter 3 "Money and Credit" (c10_eco_cbse_03_003, c10_eco_cbse_03_006).',
                  misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a list of loan types.' }
          ],
            remediations: { 'business-finance-only-means-borrowing': { steps: ['Draw a 2×3 matrix on paper—rows = Fixed Capital Need / Working Capital Need; columns = Period / Ownership / Generation.', 'Place each source from the chapter (equity, preference, debenture, retained earnings, trade credit, bank loan, public.', 'For each cell, write *one reason* why that source fits (e.g., Debenture → Period: Long-term (>5 yrs); Ownership.', 'Verify with teacher/peer that no source is placed in only one column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just.',
          parts: [
                { id: 'a', prompt: '"Retained earnings is a cost-free source of finance because the company pays no interest or dividend on it." Evaluate this statement.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'partially true', 'business finance', 'sources of finance'],
                  hint: 'Revisit Class 10 Economics Chapter 3 "Money and Credit" (c10_eco_cbse_03_003, c10_eco_cbse_03_006).',
                  misconception: 'Students believe "business finance" only means *borrowing money from banks* and that "sources of finance" is just a list of loan types.' }
          ],
            remediations: { 'business-finance-only-means-borrowing': { steps: ['Draw a 2×3 matrix on paper—rows = Fixed Capital Need / Working Capital Need; columns = Period / Ownership / Generation.', 'Place each source from the chapter (equity, preference, debenture, retained earnings, trade credit, bank loan, public.', 'For each cell, write *one reason* why that source fits (e.g., Debenture → Period: Long-term (>5 yrs); Ownership.', 'Verify with teacher/peer that no source is placed in only one column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_002', difficulty: 'standard',
          question: 'Classification of sources of finance organizes funding options into categories.',
          hint: 'Revisit c11_bs_cbse_08_001 section 8.2 "Financial needs of a business" (fixed vs.',
          misconception: 'Students treat **period basis** and **ownership basis** as interchangeable labels rather than independent dimensions.',
          parts: [
                { id: 'a', prompt: 'Define \'long-term sources of finance\' as per NCERT classification and give two examples.', answer: 'Long-term sources provide funds for a period exceeding 5 years',
                  options: ['Long-term sources provide funds for a period exceeding 5 years', 'public deposits', 'trade credit', 'internal, therefore not owner\'s funds'],
                  hint: 'Revisit c11_bs_cbse_08_001 section 8.2 "Financial needs of a business" (fixed vs.',
                  misconception: 'Students treat **period basis** and **ownership basis** as interchangeable labels rather than independent dimensions.' },
                { id: 'b', prompt: 'Explain in your own words why retained earnings are classified as \'owner\'s funds\' but not as \'borrowed funds\', even though both are internal to the company.', answer: 'Retained earnings are owner\'s funds',
                  options: ['Retained earnings are owner\'s funds', 'internal source', 'internal, therefore not owner\'s funds', 'Classify debentures by period and ownership'],
                  hint: 'Revisit c11_bs_cbse_08_001 section 8.2 "Financial needs of a business" (fixed vs.',
                  misconception: 'Students treat **period basis** and **ownership basis** as interchangeable labels rather than independent dimensions.' },
                { id: 'c', prompt: 'Classify the following sources into the 2×3 matrix (Period: Long/Medium/Short × Ownership: Owner\'s/Borrowed): (a) Commercial Paper, (b) Preference Shares, (c).', answer: 'Commercial Paper, (',
                  options: ['Commercial Paper, (', 'internal, therefore not owner\'s funds', 'Classify debentures by period and ownership', 'Long-term, Owner\'s funds'],
                  hint: 'Revisit c11_bs_cbse_08_001 section 8.2 "Financial needs of a business" (fixed vs.',
                  misconception: 'Students treat **period basis** and **ownership basis** as interchangeable labels rather than independent dimensions.' },
                { id: 'd', prompt: 'A company needs ₹10 crore for machinery (useful life 10 years) and ₹2 crore for seasonal inventory (cycle 4 months).', answer: 'Machinery requires long-term funds (>5 years)',
                  options: ['Machinery requires long-term funds (>5 years)', 'internal, therefore not owner\'s funds', 'Classify debentures by period and ownership', 'Long-term, Owner\'s funds'],
                  hint: 'Revisit c11_bs_cbse_08_001 section 8.2 "Financial needs of a business" (fixed vs.',
                  misconception: 'Students treat **period basis** and **ownership basis** as interchangeable labels rather than independent dimensions.' }
          ],
            remediations: { 'students-treat-period-basis-and': { steps: ['Draw a 2×3 grid on paper (Period rows: Long/Medium/Short; Ownership columns: Owner\'s/Borrowed).', 'Take 10 sources from the textbook (Table 8.1) and physically place each in one cell.', 'For each placement, say aloud: "This is [Long/Medium/Short] because maturity is [>5y/1-5y/≤1y].', 'Identify the empty cells (e.g., Short-term Owner\'s funds — rare) and discuss why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_003', difficulty: 'standard',
          question: 'Owner\'s funds represent capital contributed by the.',
          hint: 'Revisit c11_bs_cbse_08_002 (Classification of Sources of Finance: Period Basis) and NCERT.',
          misconception: 'Students often believe preference shares are borrowed funds because they carry fixed dividend and priority repayment.',
          parts: [
                { id: 'a', prompt: 'Compare the impact on (i) financial risk, (ii) control, and (iii) tax position when a firm raises ₹50 lakh via equity shares vs 12% debentures.', answer: 'Equity shares: (i) Lowers financial risk',
                  options: ['Equity shares: (i) Lowers financial risk', 'debentures are cheaper'],
                  hint: 'Revisit c11_bs_cbse_08_002 (Classification of Sources of Finance: Period Basis) and NCERT Table 8.1.',
                  misconception: 'Students often believe preference shares are borrowed funds because they carry fixed dividend and priority repayment — they confuse.' }
          ],
            remediations: { 'preference-shares-are-borrowed-funds': { steps: ['Ask the student to write the legal definition of \'share\' vs \'debenture\' from the Companies Act perspective — shares.', 'Show NCERT Table 8.1 (Classification on Ownership Basis) where preference shares appear under Owner\'s Funds.', 'Contrast three features: (a) Claim type — preference shareholders are residual claimants after debenture holders; (b).', 'Give a mini-case: "A company issues 9% preference shares and 9% debentures.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_004', difficulty: 'standard',
          question: 'Equity shares represent the ownership capital of a company, where each share.',
          hint: 'If stuck, revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and focus on the.',
          misconception: 'Students believe "equity shares are free money for the company because dividends are not compulsory and principal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equity shares represent the ownership capital of a company, where each share signifies a',
                  options: ['Equity shares represent the ownership capital of a company, where each share signifies a', 'Business finance refers to the monetary resources required by a business enterprise to', 'Classification of sources of finance organizes funding options into categories based on', 'Owner\'s funds represent capital contributed by the proprietors/partners/shareholders plus'],
                  hint: 'If stuck, revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and focus on the comparison.',
                  misconception: 'Students believe "equity shares are free money for the company because dividends are not compulsory and principal is never repaid." They.' }
          ],
            remediations: { 'equity-shares-are-free-money': { steps: ['Ask the student to calculate the explicit cost of a 10% debenture (after 30% tax = 7%) vs.', 'Show that even with zero dividends, the share price drops if expected returns aren\'t met — proving equity has a cost.', 'Have them re-read NCERT limitation (ii) "cost of equity shares is generally more" and link it to the risk-return.', 'Assign a mini-case: "Company X issues equity at ₹100, pays no dividend for 3 years, share price falls to ₹60.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_005', difficulty: 'standard',
          question: 'Preference shares are a class of shares that carry a fixed rate of dividend and.',
          hint: 'Revisit equity shares (c11_bs_cbse_08_004) and focus on the distinction between ownership.',
          misconception: 'Students often think preference shareholders are creditors like debenture holders because both get fixed returns.',
          parts: [
                { id: 'a', prompt: 'Explain why preference shares are considered a hybrid security, sharing characteristics of both equity shares and debentures.', answer: 'Preference shares resemble debentures',
                  options: ['Preference shares resemble debentures', 'says they are exactly like debentures ignores the discretionary dividend aspect'],
                  hint: 'Revisit equity shares (c11_bs_cbse_08_004) and focus on the distinction between ownership capital.',
                  misconception: 'Students often think preference shareholders are creditors like debenture holders because both get fixed returns.' },
                { id: 'b', prompt: 'Compare the impact on equity shareholders\' control and earnings when a company raises Rs.', answer: 'Equity shares dilute voting control',
                  options: ['Equity shares dilute voting control', 'says equity shares preserve control confuses ownership with control'],
                  hint: 'Revisit equity shares (c11_bs_cbse_08_004) and focus on the distinction between ownership capital.',
                  misconception: 'Students often think preference shareholders are creditors like debenture holders because both get fixed returns.' }
          ],
            remediations: { 'preference-shareholders-are-creditors-like': { steps: ['If a student confuses preference shares with debentures, ask: "Can the company skip preference dividend without legal.', '"Can it skip debenture interest?" (No, it\'s a contractual obligation).', 'Then have them list three differences in a table: (1) Nature of return (dividend vs interest), (2) Obligation.', 'Finally, give a scenario: "Company has Rs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_006', difficulty: 'standard',
          question: 'A debenture is a written instrument acknowledging a debt issued by a company.',
          hint: 'Revisit node c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and focus on the table.',
          misconception: 'Students often think "debentures are just like long-term bank loans" and therefore assume they always require.',
          parts: [
                { id: 'a', prompt: 'A company issues 1,000 secured, convertible debentures of ₹1,000 each at 9% interest per annum.', answer: 'Annual interest obligation = 1,000 debentures × ₹1,000 × 9% = ₹90,000',
                  options: ['Annual interest obligation = 1,000 debentures × ₹1,000 × 9% = ₹90,000', 'debentures are just like long-term bank loans', 'they always require collateral (security) and cannot be converted into shares'],
                  hint: 'Revisit node c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and focus on the table comparing.',
                  misconception: 'Students often think "debentures are just like long-term bank loans" and therefore assume they always require collateral (security) and.' }
          ],
            remediations: { 'debentures-are-just-like-long': { steps: ['Ask the student to list the four classification pairs from Box C (Secured/Unsecured, Registered/Bearer.', 'For each pair, have them write one sentence describing the **difference in the holder\'s right** (e.g., "Secured: charge.', 'Then give two mini-cases: (a) A company with no fixed assets wants to borrow — which type?', '(b) An investor wants to exit early by selling in the market — which type?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
