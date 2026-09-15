import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch08_p2: SimDef = {
    id: 'v3_c11_bs_ch08_p2',
    title: 'Sources of Business Finance · Part 2/2',
    subtitle: 'Two classifications, one decision: match the need to the right source.',
    classLevel: 11, subject: 'business_studies', topic: 'Sources of Business Finance · Part 2/2',
    chapters: ['c11_bs_ch08'],
    nodeIds: ['c11_bs_cbse_08_007', 'c11_bs_cbse_08_008', 'c11_bs_cbse_08_009', 'c11_bs_cbse_08_010', 'c11_bs_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a funding advisor structuring a first-time founder\'s capital plan', intro: 'Your client has ₹5 lakh and needs ₹18 lakh. Every rupee of the gap must be assigned a source — and some sources are dangerous for the job.', goal: 'Define business finance, separate fixed from working capital, and classify sources by period, ownership, and origin.' },
    discovery: {
        question: 'A student insists \'fixed capital and long-term sources are the same thing — both are about more than five years.\' A café owner\'s books prove otherwise. What\'s conflated?',
        options: ['A need with a source — fixed capital is what funds are needed FOR; long-term sources are instruments, and a risky overdraft can still fund machinery', 'Nothing — they are literally identical', 'Profit with revenue — fixed capital is just retained profit', 'Interest with principal — long-term sources have no duration'],
        answer: 'A need with a source — fixed capital is what funds are needed FOR; long-term sources are instruments, and a risky overdraft can still fund machinery',
        hook: 'Finance has two separate maps — what you need money for, and where money comes from — and every funding decision lives at their intersection.',
    },
    teaching: [
        { title: 'Retained Earnings: Meaning, Merits and Limitations', text: 'Retained earnings refer to the portion of a company\'s net profit after tax that is not distributed as dividends to shareholders but is reinvested in the business for future growth and expansion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split a café\'s ₹18 lakh requirement into fixed versus working capital, then tag every candidate source — savings, bank loan, retained profit, lease — by period, ownership, and internal-versus-external origin.',
        labels: ['Retained Earnings: Meaning, Merits', 'Trade Credit and Factoring', 'Commercial Banks and Financial', 'Lease Financing and Hire', 'Factors Affecting Choice'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_007', title: 'Retained Earnings: Meaning, Merits and Limitations',
          caseStudy: { intro: 'Imagine your friend\'s family runs a successful bakery in Delhi. They earned ₹15 lakh profit last year.',
            decisions: [{ prompt: 'Define retained earnings and state its classification under the three bases of classifying sources of finance (period, ownership, source.', options: [
                { text: 'Retained earnings = portion of net earnings not distributed as dividends, reinvested in', outcome: 'Retained earnings = portion of net earnings not distributed as dividends, reinvested in business.' },
                { text: 'retained earnings are free finance', outcome: 'Not quite — Students believe "retained earnings are free finance" because no interest/floatation cost is paid.', reveals: 'retained-earnings-are-free-finance' },
                { text: 'no explicit cash outflow', outcome: 'Not quite — Students believe "retained earnings are free finance" because no interest/floatation cost is paid.', reveals: 'retained-earnings-are-free-finance' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_008', title: 'Trade Credit and Factoring as Sources of Finance',
          caseStudy: { intro: 'Imagine you run a small garment manufacturing unit in Surat. You need ₹50 lakh worth of fabric for the festive season, but your cash is tied up in unpaid.',
            decisions: [{ prompt: 'Define trade credit and state how it appears in the buyer\'s books of accounts.', options: [
                { text: 'Trade credit is the credit extended by a supplier to a buyer for purchasing', outcome: 'Trade credit is the credit extended by a supplier to a buyer for purchasing goods/services.' },
                { text: 'appears as accounts receivable', outcome: 'Not quite — Students often think trade credit is \'free\' finance because no explicit interest is charged.', reveals: 'trade-credit-is-free-finance' },
                { text: 'recorded as a loan', outcome: 'Not quite — Students often think trade credit is \'free\' finance because no explicit interest is charged.', reveals: 'trade-credit-is-free-finance' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_009', title: 'Commercial Banks and Financial Institutions as Sources of Finance',
          caseStudy: { intro: 'Imagine you are advising Mr. Anil Singh from the chapter opener who wants to expand his restaurant chain.',
            decisions: [{ prompt: 'A student writes: "Commercial banks only give short-term loans for less than one year." Is this statement correct?', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. Commercial banks provide funds for short-term AND medium-term periods.' },
                { text: 'This error stems from viewing both as mere', outcome: 'Not quite — Students often believe that "Commercial banks and financial institutions are interchangeable.', reveals: 'commercial-banks-and-financial-institutions' },
                { text: 'term loan from bank', outcome: 'Not quite — Students often believe that "Commercial banks and financial institutions are interchangeable.', reveals: 'commercial-banks-and-financial-institutions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_011', title: 'Factors Affecting Choice of Source of Finance',
          caseStudy: { intro: 'Imagine you are advising Mr. Anil Singh (from the chapter opener) who wants to expand his restaurant chain.',
            decisions: [{ prompt: 'List the nine factors affecting the choice of source of finance as per NCERT Class 11 Business Studies Chapter 8.', options: [
                { text: 'The nine factors are: (1) Cost, (2) Financial strength and stability of operations, (3)', outcome: 'The nine factors are: (1) Cost, (2) Financial strength and stability of operations, (3) Form.' },
                { text: 'tax benefits', outcome: 'Not quite — Students often think "lowest cost source is always best." They pick the source with the lowest.', reveals: 'lowest-cost-source-is-always' },
                { text: 'market reputation', outcome: 'Not quite — Students often think "lowest cost source is always best." They pick the source with the lowest.', reveals: 'lowest-cost-source-is-always' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your entrepreneur club is budgeting a food-truck business: truck + kitchen fit-out ₹18 lakh, plus ₹4 lakh for fuel, ingredients and staff wages until revenue stabilises. A member proposes funding everything with a 90-day bank overdraft because \'finance is finance — just get the biggest loan you can\'.',
            decisions: [{ prompt: 'How should the ₹22 lakh actually be split and funded?', options: [
                { text: 'Match source to need: the ₹18 lakh is fixed capital (long-term, locked in the truck) best funded by long-term sources — owner\'s equity, long-term loan or lease; the ₹4 lakh is working capital (circulating, day-to-day) suited to short-term sources like overdraft or trade credit. A 90-day overdraft against an 8-year asset forces repayment long before the truck earns it back.', outcome: 'Every source sits on three axes at once — period, ownership, internal/external — and the funding horizon must match the asset\'s life.' },
                { text: 'One big overdraft is fine — a loan is a loan; you can always roll it over.', outcome: 'Short-term money funding a long-term asset creates a maturity mismatch: renewal risk, mounting interest and possible seizure mid-business.', reveals: 'any-loan-funds-anything' },
                { text: 'Fund it all from owner\'s capital and retained earnings — borrowed funds are always dangerous.', outcome: 'Owners\' funds and profits are legitimate internal sources, but ₹22 lakh from a student venture\'s own pocket is unrealistic — and retained earnings don\'t exist before the first profit.', reveals: 'internal-sources-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'You now classify money twice: by the job it must do, and by the route it arrives — and you never fund a long asset with a short leash.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_007', difficulty: 'standard',
          question: 'Retained earnings refer to the portion of a company\'s net profit after tax that.',
          hint: 'Revisit c11_bs_cbse_08_002 (classification table) and c11_bs_cbse_08_003 (owner\'s.',
          misconception: 'Students believe "retained earnings are free finance" because no interest/floatation cost is paid.',
          parts: [
                { id: 'a', prompt: '"Retained earnings have no cost because the company pays no interest or dividend on them." Explain why this statement is a dangerous misconception for.', answer: 'The statement ignores opportunity cost',
                  options: ['The statement ignores opportunity cost', 'retained earnings are free finance', 'no explicit cash outflow', 'zero cost'],
                  hint: 'Revisit c11_bs_cbse_08_002 (classification table) and c11_bs_cbse_08_003 (owner\'s vs borrowed funds.',
                  misconception: 'Students believe "retained earnings are free finance" because no interest/floatation cost is paid.' },
                { id: 'b', prompt: 'A company has net profit after tax of ₹50 lakh. It follows a 40% dividend payout policy. Calculate the retained earnings for the year.', answer: 'Step 1: Dividend = 40% of ₹50 lakh = ₹20 lakh',
                  options: ['Step 1: Dividend = 40% of ₹50 lakh = ₹20 lakh', 'retained earnings are free finance', 'no explicit cash outflow', 'zero cost'],
                  hint: 'Revisit c11_bs_cbse_08_002 (classification table) and c11_bs_cbse_08_003 (owner\'s vs borrowed funds.',
                  misconception: 'Students believe "retained earnings are free finance" because no interest/floatation cost is paid.' },
                { id: 'c', prompt: 'Compare retained earnings and equity shares as sources of long-term finance on: (a) control dilution, (b) floatation costs, (c) certainty of availability, (d).', answer: '| Basis | Retained Earnings | Equity Shares |',
                  options: ['| Basis | Retained Earnings | Equity Shares |', 'retained earnings are free finance', 'no explicit cash outflow', 'zero cost'],
                  hint: 'Revisit c11_bs_cbse_08_002 (classification table) and c11_bs_cbse_08_003 (owner\'s vs borrowed funds.',
                  misconception: 'Students believe "retained earnings are free finance" because no interest/floatation cost is paid.' }
          ],
            remediations: { 'retained-earnings-are-free-finance': { steps: ['Ask: "If you gave your friend ₹10,000 to invest, and he returned ₹10,500 after a year, did it cost you nothing?" Guide.', 'Show the formula: Cost of retained earnings (Kr) = Cost of equity (Ke) * (1 - tax rate on dividends) approximately.', 'Re-read NCERT limitation (iii): "The opportunity cost associated with these funds is not recognised by many firms.', 'This may lead to sub-optimal use." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "retained earnings are free finance" because no interest/floatation cost is paid.',
          parts: [
                { id: 'a', prompt: '"Retained earnings is the best source of finance for a mature company with stable profits but limited growth opportunities." Evaluate this statement with.', answer: 'The statement is FALSE for such a company',
                  options: ['The statement is FALSE for such a company', 'retained earnings are free finance', 'no explicit cash outflow', 'zero cost'],
                  hint: 'Revisit c11_bs_cbse_08_002 (classification table) and c11_bs_cbse_08_003 (owner\'s vs borrowed funds.',
                  misconception: 'Students believe "retained earnings are free finance" because no interest/floatation cost is paid.' }
          ],
            remediations: { 'retained-earnings-are-free-finance': { steps: ['Ask: "If you gave your friend ₹10,000 to invest, and he returned ₹10,500 after a year, did it cost you nothing?" Guide.', 'Show the formula: Cost of retained earnings (Kr) = Cost of equity (Ke) * (1 - tax rate on dividends) approximately.', 'Re-read NCERT limitation (iii): "The opportunity cost associated with these funds is not recognised by many firms.', 'This may lead to sub-optimal use." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_008', difficulty: 'standard',
          question: 'Trade credit is a short-term financing arrangement where a supplier allows.',
          hint: 'Revisit the accounting treatment of credit purchases (debit Purchases, credit Creditors).',
          misconception: 'Students often think trade credit is \'free\' finance because no explicit interest is charged.',
          parts: [
                { id: 'a', prompt: 'Define trade credit and state how it appears in the buyer\'s books of accounts.', answer: 'Trade credit is the credit extended by a supplier to a buyer for purchasing',
                  options: ['Trade credit is the credit extended by a supplier to a buyer for purchasing', 'appears as accounts receivable', 'recorded as a loan', 'trade credit is \'free\' finance'],
                  hint: 'Revisit the accounting treatment of credit purchases (debit Purchases, credit Creditors) and the.',
                  misconception: 'Students often think trade credit is \'free\' finance because no explicit interest is charged.' },
                { id: 'b', prompt: 'A firm purchases goods on terms \'2/15 net 45\'. Calculate the effective annual cost of forgoing the cash discount. Assume 360 days in a year.', answer: 'Step 1: Discount % = 2%, Discount period = 15 days, Net period = 45 days',
                  options: ['Step 1: Discount % = 2%, Discount period = 15 days, Net period = 45 days', 'trade credit is \'free\' finance'],
                  hint: 'Revisit the accounting treatment of credit purchases (debit Purchases, credit Creditors) and the.',
                  misconception: 'Students often think trade credit is \'free\' finance because no explicit interest is charged.' }
          ],
            remediations: { 'trade-credit-is-free-finance': { steps: ['If a student treats trade credit as free, have them calculate the effective annual rate for 3 different discount terms.', 'Then ask: "Would you borrow from a bank at this rate?" For factoring, give a numerical problem: Invoice ₹10 lakh.', 'Ask them to compute total cost for 60 days and compare with a bank overdraft at 12% p.a.', 'This forces confrontation with the true cost.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_009', difficulty: 'standard',
          question: 'Commercial banks are financial institutions that accept deposits from the.',
          hint: 'Revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and create a two-column.',
          misconception: 'Students often believe that "Commercial banks and financial institutions are interchangeable sources - you just.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Commercial banks only give short-term loans for less than one year." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'This error stems from viewing both as mere', 'term loan from bank', 'term loan from FI'],
                  hint: 'Revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds) and create a two-column comparison.',
                  misconception: 'Students often believe that "Commercial banks and financial institutions are interchangeable sources - you just go wherever gives the lower.' }
          ],
            remediations: { 'commercial-banks-and-financial-institutions': { steps: ['Ask the student to list the liabilities side of a commercial bank (deposits: savings, current, fixed - mostly.', 'Connect liability tenure to asset tenure: "Banks cannot lend long-term because their deposits can be withdrawn.', 'Use a timeline diagram: Show a 10-year project financed by a 3-year bank term loan → refinancing risk at year 3, 6, 9.', 'Have the student redo Diagnostic Question 6 with this maturity-matching lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_010', difficulty: 'standard',
          question: 'Lease financing is a contractual arrangement where the owner of an asset.',
          hint: 'Revisit c11_bs_cbse_08_002 (Classification of Sources: Period Basis) – specifically the.',
          misconception: 'Students treat \'lease financing\' and \'hire purchase\' as interchangeable terms for \'instalment buying\', missing that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Lease financing is a contractual arrangement where the owner of an asset (lessor) grants',
                  options: ['Lease financing is a contractual arrangement where the owner of an asset (lessor) grants', 'Business finance refers to the monetary resources required by a business enterprise to', 'Classification of sources of finance organizes funding options into categories based on', 'Owner\'s funds represent capital contributed by the proprietors/partners/shareholders plus'],
                  hint: 'Revisit c11_bs_cbse_08_002 (Classification of Sources: Period Basis) – specifically the 1-5 year.',
                  misconception: 'Students treat \'lease financing\' and \'hire purchase\' as interchangeable terms for \'instalment buying\', missing that ownership transfer.' }
          ],
            remediations: { 'students-treat-lease-financing-and': { steps: ['Ask student to define \'bailment\' and \'agreement to sell\' in one sentence each.', 'Give two 2-line scenarios – one where A gives car to B for monthly rent, another where A sells car to B on EMI.', 'Show NCERT Merit vi (lease) vs hire purchase ownership transfer.', 'Practice writing the distinction table from Diagnostic Q4 until they can reproduce it from memory with correct.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_08_011', difficulty: 'standard',
          question: 'Factors affecting choice of source of finance refer to the criteria a business.',
          hint: 'If stuck, revisit c11_bs_cbse_08_004 to c11_bs_cbse_08_010 and create a one-page.',
          misconception: 'Students often think "lowest cost source is always best." They pick the source with the lowest explicit interest rate.',
          parts: [
                { id: 'a', prompt: 'A startup tech company with high growth potential but volatile earnings needs ₹5 crore for R&D. It wants to avoid fixed obligations and retain control.', answer: 'Equity shares are best',
                  options: ['Equity shares are best', 'lowest cost source is always best', '"lowest cost source is always best'],
                  hint: 'If stuck, revisit c11_bs_cbse_08_004 to c11_bs_cbse_08_010 and create a one-page comparison table.',
                  misconception: 'Students often think "lowest cost source is always best." They pick the source with the lowest explicit interest rate (e.g., retained.' },
                { id: 'b', prompt: 'Compare the impact on "control" when a company raises funds through (a) equity shares, (b) debentures, (c) loan from a financial institution.', answer: 'Equity shares dilute control the most',
                  options: ['Equity shares dilute control the most', 'debentures dilute control', 'lowest cost source is always best', '"lowest cost source is always best'],
                  hint: 'If stuck, revisit c11_bs_cbse_08_004 to c11_bs_cbse_08_010 and create a one-page comparison table.',
                  misconception: 'Students often think "lowest cost source is always best." They pick the source with the lowest explicit interest rate (e.g., retained.' }
          ],
            remediations: { 'lowest-cost-source-is-always': { steps: ['Ask the student to list explicit and implicit costs for each source in a given scenario.', 'Have them calculate the effective annual cost of trade credit when a cash discount is foregone (e.g., 2/10 net 30).', 'Then revisit the decision matrix (Diagnostic Q6) and adjust weights to reflect risk and flexibility.', 'This forces them to see cost as multi-dimensional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
