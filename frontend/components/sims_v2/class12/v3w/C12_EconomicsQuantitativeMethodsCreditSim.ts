import type { SimDef } from '../../engine/types';
import C12_EconomicsQuantitativeMethodsCreditSim from '../../../simulations/c6_12/C12_EconomicsQuantitativeMethodsCreditSim';

/** v3 wrapped master — C12_EconomicsQuantitativeMethodsCreditSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicsquantitativemethodscreditsim: SimDef = {
    id: 'v3w_c12_economicsquantitativemethodscreditsim',
    title: 'Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR)',
    subtitle: 'This node covers the definitions, legal basis, computation, and macroeconomic effects of.',
    classLevel: 12, subject: 'economics', topic: 'Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR)',
    chapters: [],
    nodeIds: ['c12_eco_cbse_09_006', 'c12_eco_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you deposit ₹10,000 in your savings account at a commercial bank.', goal: 'Master Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR).' },
    discovery: {
        question: 'If a bank\'s NDTL is ₹500 crore, CRR is 4.5%, and SLR is 18%, calculate the amount the bank must hold as CRR reserves with RBI and as SLR assets.',
        options: ['CRR reserve = 4.5% of ₹500 crore = ₹22.5 crore (held with RBI, interest-free)', 'idle money', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
        answer: 'CRR reserve = 4.5% of ₹500 crore = ₹22.5 crore (held with RBI, interest-free)',
        hook: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.',
    },
    teaching: [
        { title: 'Cash Reserve Ratio (CRR) is the fraction of.', text: 'Cash Reserve Ratio (CRR) is the fraction of a commercial bank\'s net demand and time liabilities (NDTL) that must be maintained as interest-free reserves with the Reserve Bank of India (RBI).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_006', title: 'Cash Reserve Ratio (CRR) is the.',
          scaffold: { problem: 'A commercial bank has NDTL of ₹2,000 crore. Current CRR = 4.5%, SLR = 18%.',
            steps: [
            { text: 'Compute initial required reserves: CRR reserve = 4.5% × 2000 = ₹90 cr (with RBI, 0% interest).' },
            { text: 'Compute new required reserves: CRR reserve = 4.0% × 2000 = ₹80 cr. SLR holding = 18.5% × 2000 = ₹370 cr.' },
            { text: 'Observe net change in lendable funds = ₹0 cr (CRR cut releases ₹10 cr, SLR hike absorbs ₹10 cr).' },
            { text: 'Compute interest income change: Released CRR funds (₹10 cr) can now be lent at 9% → +₹0.9 cr income.' },
            { text: 'Interpret: The policy mix is neutral on liquidity but improves bank profitability marginally because the released.', faded: true, blankAnswer: 'Net change in lendable funds = ₹0 crore; Net change in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_010', title: 'Real GDP per Capita is the.',
          scaffold: { problem: 'India\'s Real GDP (at 2011-12 prices) was ₹87.36 lakh crore in 2011-12 and ₹145.69 lakh crore in 2022-23 (advance estimates).',
            steps: [
            { text: 'Identify the formula: Real GDP per Capita = Real GDP / Population.' },
            { text: 'Compute 2011-12 per capita: ₹87.36 lakh crore / 121 crore = ₹72,198 per person (approx).' },
            { text: 'Compute 2022-23 per capita: ₹145.69 lakh crore / 140 crore = ₹1,04,064 per person (approx).' },
            { text: 'Calculate total growth factor: (1,04,064 / 72,198) = 1.441. Total growth = 44.1% over 11 years.' },
            { text: 'Annualized growth rate: (1.441)^(1/11) - 1 = 1.034 - 1 = 3.4% per annum (using compound annual growth rate formula).', faded: true, blankAnswer: '2011-12: ₹72,198; 2022-23: ₹1,04,064; Annualized growth:.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_08_010', title: 'Identify each idea',
          dissect: { specimen: 'Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR)', spots: [
            { id: 's1', label: 'Cash Reserve Ratio CRR is', prompt: 'Which idea is this? — Cash Reserve Ratio (CRR) is the fraction of a commercial bank\'s net demand and time.', answer: 'Cash Reserve Ratio CRR is', options: ['Cash Reserve Ratio CRR is', 'Real GDP per Capita is'] },
            { id: 's2', label: 'Real GDP per Capita is', prompt: 'Which idea is this? — Real GDP per Capita is the inflation-adjusted total value of all final goods and services.', answer: 'Real GDP per Capita is', options: ['Real GDP per Capita is', 'Cash Reserve Ratio CRR is'] }
          ] } }
    ],
    explore: { component: C12_EconomicsQuantitativeMethodsCreditSim, prompt: 'Explore the interactive — Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR)' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_006', difficulty: 'standard',
          question: 'Cash Reserve Ratio (CRR) is the fraction of a commercial bank\'s net demand and.',
          hint: 'If NDTL is unclear, revisit c12_eco_cbse_09_002 (Money Supply Measures) and practice.',
          misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.',
          parts: [
                { id: 'a', prompt: 'If a bank\'s NDTL is ₹500 crore, CRR is 4.5%, and SLR is 18%, calculate the amount the bank must hold as CRR reserves with RBI and as SLR assets.', answer: 'CRR reserve = 4.5% of ₹500 crore = ₹22.5 crore (held with RBI, interest-free)',
                  options: ['CRR reserve = 4.5% of ₹500 crore = ₹22.5 crore (held with RBI, interest-free)', 'idle money', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' },
                { id: 'b', prompt: 'The RBI reduces CRR from 4.5% to 4.0% while keeping SLR unchanged at 18%.', answer: 'Old rr = 0.045 + 0.18 = 0.225 → Old multiplier = 1/0.225 = 4.44',
                  options: ['Old rr = 0.045 + 0.18 = 0.225 → Old multiplier = 1/0.225 = 4.44', 'frozen', 'idle money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' },
                { id: 'c', prompt: 'Compare the impact of a 1% increase in CRR versus a 1% increase in SLR on: (a) bank profitability, (b) government borrowing cost, and (c) transmission to.', answer: 'bank profitability, (',
                  options: ['bank profitability, (', 'idle money', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' }
          ],
            remediations: { 'crr-and-slr-reserves-are': { steps: ['If the student conflates CRR/SLR with the repo/reverse repo rates (c12_eco_cbse_09_007) or cannot compute the money.', '(2) Use a balance sheet template: Assets = Reserves (CRR + SLR) + Loans; Liabilities = Deposits (NDTL).', '(3) Practice numerical: "If NDTL = ₹1000 cr, CRR=4%, SLR=18%, show the balance sheet before/after a 1% CRR hike." (4).'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.',
          parts: [
                { id: 'a', prompt: '"RBI can use CRR and SLR simultaneously to achieve both price stability and financial stability." Evaluate this statement with reference to the trade-offs.', answer: 'Raising both ratios contracts money supply, curbing inflation (price stability)',
                  options: ['Raising both ratios contracts money supply, curbing inflation (price stability)', 'idle money', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' },
                { id: 'b', prompt: 'Design a hypothetical scenario where the RBI keeps CRR constant but raises SLR by 2 percentage points to manage a sudden surge in capital inflows.', answer: 'Scenario: Large FII inflows appreciate the rupee, hurting exports',
                  options: ['Scenario: Large FII inflows appreciate the rupee, hurting exports', 'idle money', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' }
          ],
            remediations: { 'crr-and-slr-reserves-are': { steps: ['If the student conflates CRR/SLR with the repo/reverse repo rates (c12_eco_cbse_09_007) or cannot compute the money.', '(2) Use a balance sheet template: Assets = Reserves (CRR + SLR) + Loans; Liabilities = Deposits (NDTL).', '(3) Practice numerical: "If NDTL = ₹1000 cr, CRR=4%, SLR=18%, show the balance sheet before/after a 1% CRR hike." (4).'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_010', difficulty: 'standard',
          question: 'Real GDP per Capita is the inflation-adjusted total value of all final goods.',
          hint: 'If stuck on the division or growth decomposition, revisit c8_math_ch7_6 (Unitary Method).',
          misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in.',
          parts: [
                { id: 'a', prompt: 'Define Real GDP per Capita and state its unit of measurement.', answer: 'Real GDP per Capita = Real GDP (at constant prices) / Mid-year Population',
                  options: ['Real GDP per Capita = Real GDP (at constant prices) / Mid-year Population', 'Rupees', 'standard of living'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' },
                { id: 'b', prompt: 'Country A has Real GDP of ₹200 lakh crore and population 100 crore. Country B has Real GDP of ₹150 lakh crore and population 50 crore.', answer: 'Country A: ₹200 lakh crore / 100 crore = ₹2,00,000 per person',
                  options: ['Country A: ₹200 lakh crore / 100 crore = ₹2,00,000 per person', 'aggregate fallacy', 'standard of living'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' },
                { id: 'c', prompt: '"Real GDP per Capita in India doubled between 2004-05 and 2022-23.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'it\'s not perfect', 'standard of living'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' }
          ],
            remediations: { 'real-gdp-per-capita-is': { steps: ['If the student cannot articulate the three core limitations with Indian examples, do: (1) Revisit c12_eco_cbse_08_009.', '(2) Revisit c8_eco_ch2_3 (Population Size) and c8_eco_ch2_9 (Demographic Dividend) to reinforce population dynamics.', '(3) Work through the Worked Example 3 below step-by-step with actual Indian data (Real GDP 2011-12 series, Census 2011.', '(4) Re-attempt Diagnostic Question 4 and 6, writing full structured answers with headings: "Limitation 1:.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in.',
          parts: [
                { id: 'a', prompt: 'The government is deciding between two policies: Policy X raises Real GDP by 3% with no population change.', answer: 'Current per capita growth ≈ 6% – 1% = 5%',
                  options: ['Current per capita growth ≈ 6% – 1% = 5%', 'population control helps', 'standard of living', 'happiness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' }
          ],
            remediations: { 'real-gdp-per-capita-is': { steps: ['If the student cannot articulate the three core limitations with Indian examples, do: (1) Revisit c12_eco_cbse_08_009.', '(2) Revisit c8_eco_ch2_3 (Population Size) and c8_eco_ch2_9 (Demographic Dividend) to reinforce population dynamics.', '(3) Work through the Worked Example 3 below step-by-step with actual Indian data (Real GDP 2011-12 series, Census 2011.', '(4) Re-attempt Diagnostic Question 4 and 6, writing full structured answers with headings: "Limitation 1:.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
