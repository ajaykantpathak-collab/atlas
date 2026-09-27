import type { SimDef } from '../../engine/types';
import C10_EconApplicationsDemandMeaningTypesSim from '../../../simulations/c6_12/C10_EconApplicationsDemandMeaningTypesSim';

/** v3 wrapped master — C10_EconApplicationsDemandMeaningTypesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_econapplicationsdemandmeaningtypessim: SimDef = {
    id: 'v3w_c10_econapplicationsdemandmeaningtypessim',
    title: 'Demand: Meaning and Types',
    subtitle: 'Covers government employment generation measures discussed in NCERT Class 10 Chapter 2:.',
    classLevel: 10, subject: 'economics', topic: 'How to Create More Employment: Government Initiatives',
    chapters: [],
    nodeIds: ['c10_eco_cbse_02_006', 'c10_eco_cbse_05_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine a village in Maharashtra where farmers grow only one rain-fed crop per year, leaving them jobless for.', goal: 'Master n Applications Demand Meaning Types.' },
    discovery: {
        question: 'Compare the employment impact of (a) building a new highway versus (b) waiving farm loans. Which creates more sustainable employment?',
        options: ['Correct answer: Highway construction creates more sustainable employment', 'it helps farmers immediately', 'how does a dam create jobs?'],
        answer: 'Highway construction creates more sustainable employment',
        hook: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.',
    },
    teaching: [
        { title: 'Government employment generation initiatives.', text: 'Government employment generation initiatives refer to policies and programs designed to create job opportunities across primary, secondary, and tertiary sectors by addressing structural bottlenecks.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_006', title: 'Government employment generation.',
          scaffold: { problem: 'In a drought-prone district of Rajasthan, 80% of 50,000 rural workers face 4 months of seasonal unemployment annually.',
            steps: [
            { text: 'Identify the two initiatives: check dams (infrastructure) and KCC loans (cheap credit for irrigation/second crop).' },
            { text: 'Calculate check dam employment: 20 dams × 50 workers × 6 months = 6,000 person-months (secondary sector: construction).' },
            { text: 'Calculate KCC employment: 5,000 farmers × 2 hectares × 3 workers/hectare × 4 months (Rabi season) = 120,000.' },
            { text: 'Total direct employment = 6,000 + 120,000 = 126,000 person-months.' },
            { text: 'Classify: Check dams = secondary (construction), KCC-enabled farming = primary (agriculture).', faded: true, blankAnswer: '126,000 person-months (6,000 in secondary sector.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_05_002', title: 'The four fundamental consumer rights —.',
          scaffold: { problem: 'Priya buys a 2-litre painted water bottle for ₹300 from a Mumbai street vendor. The bottle has no label, no brand name, no ISI mark.',
            steps: [
            { text: 'Identify the consumer and transaction — Priya, personal use, durable good (water bottle), ₹300.' },
            { text: 'Check Right to Safety — paint chipping into drinking water is a health hazard; no safety certification (ISI) → violated.' },
            { text: 'Check Right to Information — no label, no brand, no material composition, no manufacturer details → violated.' },
            { text: 'Check Right to Choice — only unbranded bottles sold; no alternative safe options displayed → violated.' },
            { text: 'Check Right to Redressal — vendor refuses refund/replacement for defective good → violated.' },
            { text: 'Legal remedy — File complaint at District Consumer Disputes Redressal Commission (jurisdiction: value < ₹1 crore) under.', faded: true, blankAnswer: 'All four rights violated. Remedy: Full refund of ₹300 +.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_eco_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Demand: Meaning and Types', spots: [
            { id: 's1', label: 'Government employment generation initiatives refer', prompt: 'Which idea is this? — Government employment generation initiatives refer to policies and programs designed to.', answer: 'Government employment generation initiatives refer', options: ['Government employment generation initiatives refer', 'The four fundamental consumer rights'] },
            { id: 's2', label: 'The four fundamental consumer rights', prompt: 'Which idea is this? — The four fundamental consumer rights — Safety, Information, Choice, and Redressal — are.', answer: 'The four fundamental consumer rights', options: ['The four fundamental consumer rights', 'Government employment generation initiatives refer'] }
          ] } }
    ],
    explore: { component: C10_EconApplicationsDemandMeaningTypesSim, prompt: 'Explore the interactive — n Applications Demand Meaning Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_006', difficulty: 'standard',
          question: 'Government employment generation initiatives refer to policies and programs.',
          hint: 'If stuck, revisit c10_eco_cbse_02_005 (Problems of Unemployment) and c10_eco_cbse_02_001.',
          misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.',
          parts: [
                { id: 'a', prompt: 'A district has 60% workforce in agriculture but contributes only 18% to district GDP.', answer: 'Step 1: Direct jobs = 2,000 (secondary sector: food processing, packaging)',
                  options: ['Step 1: Direct jobs = 2,000 (secondary sector: food processing, packaging)', 'how does a dam create jobs?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.' },
                { id: 'b', prompt: 'Compare the employment impact of (a) building a new highway versus (b) waiving farm loans. Which creates more sustainable employment?', answer: 'Highway construction creates more sustainable employment',
                  options: ['Correct answer: Highway construction creates more sustainable employment', 'it helps farmers immediately', 'how does a dam create jobs?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.' }
          ],
            remediations: { 'government-creates-employment-only-by': { steps: ['Draw a 3-column table: Initiative (e.g., Road) → Direct Jobs (construction) → Indirect Jobs (transport, trade,.', 'Take the textbook example of a cold storage: list 5 specific jobs created (operator, loader, truck driver, commission.', 'Contrast with MGNREGA: "MGNREGA = direct wage employment for 100 days; Cold storage = permanent jobs for 10+ people +.', 'Practice one case-based question from CBSE sample paper where you classify each job as primary/secondary/tertiary.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Promoting tourism and regional crafts creates mostly low-skilled, seasonal jobs, so the government should focus only on IT and.', answer: 'Correct evaluation: The statement is flawed',
                  options: ['Correct evaluation: The statement is flawed', 'modern sector bias', 'how does a dam create jobs?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.' },
                { id: 'b', prompt: 'Compare the employment impact of (a) building a new highway versus (b) waiving farm loans. Which creates more sustainable employment?', answer: 'Highway construction creates more sustainable employment',
                  options: ['Correct answer: Highway construction creates more sustainable employment', 'it helps farmers immediately', 'how does a dam create jobs?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe government creates employment only by directly hiring workers (like MGNREGA) or giving cash transfers.' }
          ],
            remediations: { 'government-creates-employment-only-by': { steps: ['Draw a 3-column table: Initiative (e.g., Road) → Direct Jobs (construction) → Indirect Jobs (transport, trade,.', 'Take the textbook example of a cold storage: list 5 specific jobs created (operator, loader, truck driver, commission.', 'Contrast with MGNREGA: "MGNREGA = direct wage employment for 100 days; Cold storage = permanent jobs for 10+ people +.', 'Practice one case-based question from CBSE sample paper where you classify each job as primary/secondary/tertiary.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_002', difficulty: 'standard',
          question: 'The four fundamental consumer rights — Safety, Information, Choice, and.',
          hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and.',
          misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics,.',
          parts: [
                { id: 'a', prompt: 'A consumer buys a packet of biscuits but the packet does not mention the date of manufacture, expiry date, or ingredients. Which consumer right is violated?', answer: 'The Right to Information is violated',
                  options: ['The Right to Information is violated', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'b', prompt: 'In a village fair, a shopkeeper sells only one brand of toothpaste at ₹50 per tube, claiming "no other stock".', answer: 'Right to Choice is violated',
                  options: ['Right to Choice is violated', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'c', prompt: 'Compare two situations: (A) A mobile phone battery explodes while charging, injuring the user.', answer: '(A) Right to Safety violated',
                  options: ['(A) Right to Safety violated', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' }
          ],
            remediations: { 'right-to-safety-only-applies': { steps: ['List 5 non-food items you use daily (e.g., phone charger, LPG stove, school bus, elevator, mosquito coil).', 'For each, write one safety hazard if defective.', 'Check if each has ISI/BIS/Hallmark — if not, Right to Safety is at risk.', 'Read Section 2(9) of Consumer Protection Act 2019 definition of "defect" — note it includes "any fault...', 'Re-attempt Diagnostic Q4 distinguishing Safety vs Redressal.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics,.',
          parts: [
                { id: 'a', prompt: '"Right to Choice means a consumer can demand any product at any price they want." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'b', prompt: 'Create a 4-panel comic strip storyboard (describe each panel in 1-2 sentences) showing a consumer experiencing violation of all four rights while buying a.', answer: 'Panel 1: Ramesh buys a ceiling fan from "Bharat Electronics"',
                  options: ['Panel 1: Ramesh buys a ceiling fan from "Bharat Electronics"', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' }
          ],
            remediations: { 'right-to-safety-only-applies': { steps: ['List 5 non-food items you use daily (e.g., phone charger, LPG stove, school bus, elevator, mosquito coil).', 'For each, write one safety hazard if defective.', 'Check if each has ISI/BIS/Hallmark — if not, Right to Safety is at risk.', 'Read Section 2(9) of Consumer Protection Act 2019 definition of "defect" — note it includes "any fault...', 'Re-attempt Diagnostic Q4 distinguishing Safety vs Redressal.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
