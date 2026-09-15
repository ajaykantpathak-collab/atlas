import type { SimDef } from '../../engine/types';
import C12_EconomicsMoneyMeaningKindsSim from '../../../simulations/c6_12/C12_EconomicsMoneyMeaningKindsSim';

/** v3 wrapped master — C12_EconomicsMoneyMeaningKindsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicsmoneymeaningkindssim: SimDef = {
    id: 'v3w_c12_economicsmoneymeaningkindssim',
    title: 'Money Meaning Kinds',
    subtitle: 'This node covers the meaning of money, its four functions (medium of exchange, unit of.',
    classLevel: 12, subject: 'economics', topic: 'Money: Meaning and Functions (Medium of Exchange, Unit of Account)',
    chapters: [],
    nodeIds: ['c12_eco_cbse_09_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are at a local mandi in Maharashtra wanting to buy 5 kg of tomatoes.', goal: 'Master Money Meaning Kinds.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Money is a universally accepted medium of.', text: 'Money is a universally accepted medium of exchange that serves as a unit of account, a store of value, and a standard of deferred payment, enabling the valuation and exchange of goods and services.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_001', title: 'Money is a universally accepted medium.',
          scaffold: { problem: 'In a rural haat in Bihar, a potter wants to exchange 10 earthen pots for 5 kg of rice. The rice farmer wants a cotton dhoti, not pots.',
            steps: [
            { text: 'Identify the barter deadlock — Potter has pots, wants rice; Farmer has rice, wants dhoti; Weaver has dhoti, wants pots.' },
            { text: 'Introduce money as medium of exchange. Potter sells 10 pots to Weaver for ₹500.' },
            { text: 'Potter uses ₹500 to buy 5 kg rice from Farmer at ₹100/kg. (Function: Medium of exchange + Unit of account — price.' },
            { text: 'Farmer uses ₹500 to buy dhoti from Weaver. (Function: Medium of exchange.)' },
            { text: 'All three are satisfied. Money circulated as a medium; prices (₹100/kg, ₹500/dhoti) served as unit of account; if.', faded: true, blankAnswer: 'Money resolves the deadlock by performing medium of.' }
            ] } }
    ],
    explore: { component: C12_EconomicsMoneyMeaningKindsSim, prompt: 'Explore the interactive — Money Meaning Kinds' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_001', difficulty: 'standard',
          question: 'Money is a universally accepted medium of exchange that serves as a unit of.',
          hint: 'If stuck, re-read c6_economics_ch11_002 (double coincidence) and c6_economics_ch11_004.',
          misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes).',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab sells 100 kg of wheat at ₹2,200 per quintal and receives payment via a cheque. He deposits the cheque in his savings account.', answer: 'the cheque, (',
                  options: ['the cheque, (', 'fiat currency (₹ notes) is \'not real money\''],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes) is \'not real money\'.' }
          ],
            remediations: { 'money-must-have-intrinsic-value': { steps: ['If the student cannot correctly match functions to scenarios or misclassifies instruments: (1) Revisit.', '(2) Do a \'Function Audit\' on 5 daily transactions (cash purchase, UPI transfer, saving pocket money, paying school fees.', '(3) Re-attempt Diagnostic Questions 3 and 5.', 'If still stuck, review the distinction between \'money\' (asset) and \'credit\' (liability) using the balance sheet.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: \'A credit card is money because it allows you to buy goods without cash.\' Consider all four functions of money in your evaluation.', answer: 'A credit card is NOT money',
                  options: ['A credit card is NOT money', 'fiat currency (₹ notes) is \'not real money\''],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes) is \'not real money\'.' }
          ],
            remediations: { 'money-must-have-intrinsic-value': { steps: ['If the student cannot correctly match functions to scenarios or misclassifies instruments: (1) Revisit.', '(2) Do a \'Function Audit\' on 5 daily transactions (cash purchase, UPI transfer, saving pocket money, paying school fees.', '(3) Re-attempt Diagnostic Questions 3 and 5.', 'If still stuck, review the distinction between \'money\' (asset) and \'credit\' (liability) using the balance sheet.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
