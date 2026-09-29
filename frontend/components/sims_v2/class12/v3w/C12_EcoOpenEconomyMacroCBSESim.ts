import type { SimDef } from '../../engine/types';
import C12_EcoOpenEconomyMacroCBSESim from '../../../simulations/c6_12_new/C12_EcoOpenEconomyMacroCBSESim';

/** v3 wrapped master — C12_EcoOpenEconomyMacroCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_ecoopeneconomymacrocbsesim: SimDef = {
    id: 'v3w_c12_ecoopeneconomymacrocbsesim',
    title: 'Microeconomics and Macroeconomics: Distinction and Scope',
    subtitle: 'This node covers the fundamental distinction between microeconomics and macroeconomics,.',
    classLevel: 12, subject: 'economics', topic: 'Microeconomics and Macroeconomics: Distinction and Scope',
    chapters: [],
    nodeIds: ['c12_eco_cbse_01_006', 'c12_eco_cbse_09_005', 'c12_eco_cbse_09_007', 'c12_eco_cbse_09_010', 'c12_eco_cbse_01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are reading two headlines: "Onion prices in Delhi mandis hit ₹80/kg due to crop failure" and.', goal: 'Master Microeconomics and Macroeconomics: Distinction and Scope.' },
    discovery: {
        question: 'Explain why the Great Depression of 1929 led to the birth of macroeconomics as a separate branch of economics.',
        options: ['The Great Depression showed that the classical belief', 'because the stock market crashed', 'the distinction between micro and macro is merely about "small vs'],
        answer: 'The Great Depression showed that the classical belief',
        hook: 'Students often think the distinction between micro and macro is merely about "small vs.',
    },
    teaching: [
        { title: 'Microeconomics studies the behaviour of.', text: 'Microeconomics studies the behaviour of individual economic agents — households and firms — and the determination of prices and quantities in specific markets, taking aggregate variables as given.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_006', title: 'Microeconomics studies the behaviour of.',
          scaffold: { problem: 'An Indian newspaper headline reads: "RBI keeps repo rate unchanged at 6.5% to balance inflation and growth." Identify whether this is a.',
            steps: [
            { text: 'Identify the decision-maker: Reserve Bank of India (RBI), which is the central bank and a statutory body.' },
            { text: 'Identify the objective: "balance inflation and growth" – these are aggregate goals (price stability and output growth).' },
            { text: 'Recognise the policy tool: repo rate (the interest rate at which RBI lends to commercial banks) is a monetary policy.' },
            { text: 'Determine the sectors involved: Government (RBI acts on behalf of the state), Firms (borrowing costs change),.' },
            { text: 'Conclude: This is a macroeconomic issue because it involves a macroeconomic agent (RBI) using a policy tool to target.', faded: true, blankAnswer: 'Macroeconomic. Sectors: Government (RBI), Firms,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_005', title: 'Open Market Operations (OMO) refer to.',
          scaffold: { problem: 'The RBI conducts an outright OMO purchase of ₹20,000 crore of government securities from commercial banks.',
            steps: [
            { text: 'Identify the change in high-powered money (ΔH). OMO purchase injects reserves, so ΔH = +₹20,000 crore.' },
            { text: 'Compute the money multiplier m = (1 + cdr) / (cdr + rdr) = (1 + 0.2) / (0.2 + 0.1) = 1.2 / 0.3 = 4.' },
            { text: 'Calculate ΔM = m × ΔH = 4 × ₹20,000 crore = ₹80,000 crore.' },
            { text: 'Interpret: The initial ₹20,000 crore reserve injection enables banks to create up to ₹80,000 crore of additional.' },
            { text: 'Check consistency: The multiplier 4 means every ₹1 of reserves supports ₹4 of money supply. The result is plausible.', faded: true, blankAnswer: 'The maximum potential increase in money supply (M3) is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_007', title: 'Repo rate is the interest rate at which.',
          scaffold: { problem: 'On 8 June 2024, the RBI\'s Monetary Policy Committee raises the repo rate from 6.50% to 6.75% (a 25 basis point hike).',
            steps: [
            { text: 'Identify the change in repo rate: Δr = 6.75% - 6.50% = 0.25% = 0.0025 in decimal.' },
            { text: 'Recall the daily interest cost formula: Daily Interest = Principal × Annual Rate × (1/365).' },
            { text: 'Compute the additional daily interest = Principal × Δr × (1/365) = 1,200 crore × 0.0025 × (1/365).' },
            { text: 'Calculate: 1,200 × 0.0025 = 3 crore; 3 / 365 ≈ 0.008219 crore = ₹82.19 lakh.' },
            { text: 'Interpret: The bank\'s daily cost of borrowing from the RBI increases by about ₹82 lakh.', faded: true, blankAnswer: 'Additional daily interest cost = ₹82.19 lakh (approx).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_010', title: 'High-powered money (H), also called the.',
          scaffold: { problem: 'In an economy, the public holds ₹500 crore as currency, commercial banks hold ₹1,500 crore as reserves, and demand deposits are ₹10,000.',
            steps: [
            { text: 'Identify given values: C = ₹500 cr, R = ₹1,500 cr, D = ₹10,000 cr.' },
            { text: 'Compute H = C + R = 500 + 1,500 = ₹2,000 crore.' },
            { text: 'Compute M = C + D = 500 + 10,000 = ₹10,500 crore.' },
            { text: 'Compute c = C/D = 500/10,000 = 0.05. Compute r = R/D = 1,500/10,000 = 0.15.' },
            { text: 'Compute m = (1 + c)/(c + r) = (1 + 0.05)/(0.05 + 0.15) = 1.05/0.20 = 5.25.' },
            { text: 'Verify M = m × H = 5.25 × 2,000 = ₹10,500 crore (matches).' },
            { text: 'New H = 2,000 + 200 = ₹2,200 crore. New M = m × new H = 5.25 × 2,200 = ₹11,550 crore.', faded: true, blankAnswer: 'H = ₹2,000 cr, M = ₹10,500 cr, c = 0.05, r = 0.15, m =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_001', title: 'Scarcity is the fundamental economic.',
          scaffold: { problem: 'A small textile firm in Surat has 200 metres of cloth and 500 labour-hours per week.',
            steps: [
            { text: 'Verify current resource usage: Shirts 40 → 80m cloth, 160 hrs labour; Kurtas 20 → 60m cloth, 100 hrs labour.' },
            { text: 'To reach PPF, find binding constraint. Cloth constraint: 2S + 3K = 200. Labour constraint: 4S + 5K = 500.' },
            { text: 'Correct approach: Since cloth is scarcer per unit (2m vs 3m but labour 4 vs 5), find max output on cloth constraint: 2S.' },
            { text: 'Original kurtas = 20. New kurtas = 33.33. Wait — kurtas *increased*? That means original point was inside PPF.' },
            { text: 'On PPF, 2S + 3K = 200 → K = (200-2S)/3. MRT = dK/dS = -2/3. Opportunity cost of 1 shirt = 2/3 kurta.', faded: true, blankAnswer: 'Opportunity cost of 10 additional shirts = 6.67 kurtas (at.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_09_005', title: 'Identify each idea',
          dissect: { specimen: 'Microeconomics and Macroeconomics: Distinction and Scope', spots: [
            { id: 's1', label: 'Microeconomics studies the behaviour of', prompt: 'Which idea is this? — Microeconomics studies the behaviour of individual economic agents — households and firms.', answer: 'Microeconomics studies the behaviour of', options: ['Microeconomics studies the behaviour of', 'Open Market Operations OMO refer', 'Repo rate is the interest', 'High-powered money H also called'] },
            { id: 's2', label: 'Open Market Operations OMO refer', prompt: 'Which idea is this? — Open Market Operations (OMO) refer to the purchase and sale of government securities by.', answer: 'Open Market Operations OMO refer', options: ['Open Market Operations OMO refer', 'Microeconomics studies the behaviour of', 'Repo rate is the interest', 'High-powered money H also called'] },
            { id: 's3', label: 'Repo rate is the interest', prompt: 'Which idea is this? — Repo rate is the interest rate at which the Reserve Bank of India (RBI) lends short-term.', answer: 'Repo rate is the interest', options: ['Repo rate is the interest', 'Microeconomics studies the behaviour of', 'Open Market Operations OMO refer', 'High-powered money H also called'] },
            { id: 's4', label: 'High-powered money H also called', prompt: 'Which idea is this? — High-powered money (H), also called the monetary base, is the total liability of the.', answer: 'High-powered money H also called', options: ['High-powered money H also called', 'Microeconomics studies the behaviour of', 'Open Market Operations OMO refer', 'Repo rate is the interest'] },
            { id: 's5', label: 'Scarcity is the fundamental economic', prompt: 'Which idea is this? — Scarcity is the fundamental economic condition where unlimited human wants exceed the.', answer: 'Scarcity is the fundamental economic', options: ['Scarcity is the fundamental economic', 'Microeconomics studies the behaviour of', 'Open Market Operations OMO refer', 'Repo rate is the interest'] }
          ] } }
    ],
    explore: { component: C12_EcoOpenEconomyMacroCBSESim, prompt: 'Explore the interactive — Microeconomics and Macroeconomics: Distinction and Scope' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'standard',
          question: 'Microeconomics studies the behaviour of individual economic agents — households.',
          hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Explain why the Great Depression of 1929 led to the birth of macroeconomics as a separate branch of economics.', answer: 'The Great Depression showed that the classical belief',
                  options: ['The Great Depression showed that the classical belief', 'because the stock market crashed', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' },
                { id: 'b', prompt: 'Classify each of the following as a microeconomic or macroeconomic issue: (a) A farmer in Punjab deciding how much wheat to plant.', answer: 'A farmer in Punjab deciding how much wheat to plant',
                  options: ['A farmer in Punjab deciding how much wheat to plant', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example:.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Macroeconomics is just the sum of microeconomics; if we understand all individual markets, we don\'t need a separate.', answer: 'The statement is false',
                  options: ['The statement is false', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example:.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_005', difficulty: 'standard',
          question: 'Open Market Operations (OMO) refer to the purchase and sale of government.',
          hint: 'Review the money multiplier derivation in c12_eco_cbse_09_010 and the credit creation.',
          misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.',
          parts: [
                { id: 'a', prompt: 'What is the immediate effect on the monetary base (high-powered money) when the RBI conducts an outright purchase of government securities from commercial.', answer: 'The monetary base increases by the exact amount of the purchase',
                  options: ['The monetary base increases by the exact amount of the purchase', 'money supply increases by the same amount', 'OMO directly changes the money supply (M3) by the same amount as the transaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.' },
                { id: 'b', prompt: 'Suppose the RBI sells ₹5,000 crore of government securities to banks.', answer: 'Step 1: OMO sale reduces reserves (high-powered money) by ₹5,000 crore',
                  options: ['Step 1: OMO sale reduces reserves (high-powered money) by ₹5,000 crore', 'OMO directly changes the money supply (M3) by the same amount as the transaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.' }
          ],
            remediations: { 'omo-directly-changes-the-money': { steps: ['If the student confuses monetary base with money supply, have them revisit c12_eco_cbse_09_010 (High-Powered Money and.', 'Then re-attempt Diagnostic Question 3 with a focus on tracing the multiplier steps: ΔH → ΔReserves → ΔDeposits → ΔM3.', 'Use a simple balance sheet of a bank to show how an initial reserve injection allows multiple rounds of lending.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.',
          parts: [
                { id: 'a', prompt: 'The RBI wants to combat high inflation without causing a sharp spike in interest rates that could hurt investment.', answer: 'A series of small repo operations (reverse repo) is more appropriate',
                  options: ['A series of small repo operations (reverse repo) is more appropriate', 'OMO directly changes the money supply (M3) by the same amount as the transaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.' }
          ],
            remediations: { 'omo-directly-changes-the-money': { steps: ['If the student confuses monetary base with money supply, have them revisit c12_eco_cbse_09_010 (High-Powered Money and.', 'Then re-attempt Diagnostic Question 3 with a focus on tracing the multiplier steps: ΔH → ΔReserves → ΔDeposits → ΔM3.', 'Use a simple balance sheet of a bank to show how an initial reserve injection allows multiple rounds of lending.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_007', difficulty: 'standard',
          question: 'Repo rate is the interest rate at which the Reserve Bank of India (RBI) lends.',
          hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR and SLR) to recall reserve requirements, and.',
          misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the.',
          parts: [
                { id: 'a', prompt: 'What is the repo rate, and what collateral is required for a bank to borrow at this rate from the RBI?', answer: 'The repo rate is the rate at',
                  options: ['The repo rate is the rate at', 'no collateral', 'long-term loan'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the rate at which banks.' },
                { id: 'b', prompt: 'Why does an increase in the repo rate typically lead to a reduction in aggregate demand in the economy?', answer: 'When the repo rate rises, banks\' cost of borrowing from the RBI increases',
                  options: ['When the repo rate rises, banks\' cost of borrowing from the RBI increases', 'higher repo rate increases money supply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the rate at which banks.' }
          ],
            remediations: { 'the-repo-rate-and-bank': { steps: ['If the student confuses the two rates, have them create a two-column table: Column 1 = Repo Rate, Column 2 = Bank Rate.', 'Rows: Tenure, Collateral, Window (LAF vs.', 'traditional), Frequency of change, Current numerical value (check RBI website).', 'Then re-do Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_010', difficulty: 'standard',
          question: 'High-powered money (H), also called the monetary base, is the total liability.',
          hint: 'Review the deposit creation numerical example in node c12_eco_cbse_09_009 (Credit.',
          misconception: 'Students often confuse the simple deposit multiplier (1/r) with the actual money multiplier (1+c)/(c+r).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'High-powered money (H), also called the monetary base, is the total liability of the',
                  options: ['High-powered money (H), also called the monetary base, is the total liability of the', 'Microeconomics studies the behaviour of individual economic agents', 'Open Market Operations (OMO) refer to the purchase and sale of government securities by', 'Repo rate is the interest rate at'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the simple deposit multiplier (1/r) with the actual money multiplier (1+c)/(c+r).' }
          ],
            remediations: { 'students-often-confuse-the-simple': { steps: ['Revisit the definitions of c and r from the credit creation node (c12_eco_cbse_09_009).', 'Draw a T-account for a bank receiving a new deposit of ₹100 with r=0.1, c=0.2.', 'Track how much currency leaks out at each step.', 'Compute the deposit creation series: 100 → 80 → 64 → ...'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the simple deposit multiplier (1/r) with the actual money multiplier (1+c)/(c+r).',
          parts: [
                { id: 'a', prompt: '"An increase in the statutory liquidity ratio (SLR) reduces the money multiplier." Evaluate this statement. Is it always true?', answer: 'The statement is generally true',
                  options: ['The statement is generally true', 'always true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the simple deposit multiplier (1/r) with the actual money multiplier (1+c)/(c+r).' }
          ],
            remediations: { 'students-often-confuse-the-simple': { steps: ['Revisit the definitions of c and r from the credit creation node (c12_eco_cbse_09_009).', 'Draw a T-account for a bank receiving a new deposit of ₹100 with r=0.1, c=0.2.', 'Track how much currency leaks out at each step.', 'Compute the deposit creation series: 100 → 80 → 64 → ...'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_001', difficulty: 'standard',
          question: 'Scarcity is the fundamental economic condition where unlimited human wants.',
          hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6 (factors of production) and c9_eco_ch1_1 to.',
          misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality,.',
          parts: [
                { id: 'a', prompt: 'A factory has 100 machine-hours and 50 labour-hours daily. It produces two goods: A (requires 2 machine-hours, 1 labour-hour per unit) and B (requires 1.', answer: 'Current usage: A=20 → 40 machine-hrs, 20 labour-hrs',
                  options: ['Current usage: A=20 → 40 machine-hrs, 20 labour-hrs', '5 units of B', 'people or countries —'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' },
                { id: 'b', prompt: 'Compare how scarcity manifests for a household versus the Government of India. Use the concepts of budget constraint and fiscal deficit in your answer.', answer: 'A household faces a hard budget constraint: spending ≤ income + borrowing',
                  options: ['A household faces a hard budget constraint: spending ≤ income + borrowing', 'government has no scarcity', 'people or countries —'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' }
          ],
            remediations: { 'scarcity-only-applies-to-poor': { steps: ['If the student holds this misconception, assign: (1) Re-read c9_eco_ch1_1 and c9_eco_ch1_2 with focus on "universal".', '(2) Work through a time-allocation PPF: 24 hours → sleep/study/leisure; plot combinations; calculate MRT between study.', '(3) Analyse India\'s 2023-24 budget: identify three expenditure trade-offs (e.g., defence vs education vs subsidies) and.', '(4) Re-attempt Diagnostic Questions 4 and 5 with this lens.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality,.',
          parts: [
                { id: 'a', prompt: 'Construct a real-life scenario involving a Class 12 student choosing between three activities on a Sunday: (a) studying Economics for 4 hours, (b) working a.', answer: 'If the student chooses (a), opportunity cost = max(₹500, enjoyment of match)',
                  options: ['If the student chooses (a), opportunity cost = max(₹500, enjoyment of match)', 'people or countries —', 'government can just spend more', 'scarcity only applies to "poor" people or countries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' },
                { id: 'b', prompt: 'Compare how scarcity manifests for a household versus the Government of India. Use the concepts of budget constraint and fiscal deficit in your answer.', answer: 'A household faces a hard budget constraint: spending ≤ income + borrowing',
                  options: ['A household faces a hard budget constraint: spending ≤ income + borrowing', 'government has no scarcity', 'people or countries —', 'government can just spend more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity only applies to "poor" people or countries — "rich people don\'t face scarcity." In reality, even a billionaire.' }
          ],
            remediations: { 'scarcity-only-applies-to-poor': { steps: ['If the student holds this misconception, assign: (1) Re-read c9_eco_ch1_1 and c9_eco_ch1_2 with focus on "universal".', '(2) Work through a time-allocation PPF: 24 hours → sleep/study/leisure; plot combinations; calculate MRT between study.', '(3) Analyse India\'s 2023-24 budget: identify three expenditure trade-offs (e.g., defence vs education vs subsidies) and.', '(4) Re-attempt Diagnostic Questions 4 and 5 with this lens.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
