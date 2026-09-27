import type { SimDef } from '../../engine/types';
import C9_EconomicsBasicEconomicTermsSim from '../../../simulations/c6_12/C9_EconomicsBasicEconomicTermsSim';

/** v3 wrapped master — C9_EconomicsBasicEconomicTermsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_economicsbasiceconomictermssim: SimDef = {
    id: 'v3w_c9_economicsbasiceconomictermssim',
    title: 'Basic Economic Terms',
    subtitle: 'Covers the definition and two core characteristics of public goods (non-excludability,.',
    classLevel: 9, subject: 'economics', topic: 'Public Goods: Characteristics and Government Provision',
    chapters: [],
    nodeIds: ['c9_eco_ch1_10', 'c9_eco_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are walking home at 8 PM in your neighbourhood in Bengaluru.', goal: 'Master Basic Economic Terms.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Public goods are goods characterized by.', text: 'Public goods are goods characterized by **non-excludability** (impossible or extremely costly to prevent anyone from using them) and **non-rivalry** (one person\'s consumption does not reduce.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_eco_ch1_10', title: 'Public goods are goods characterized by.',
          scaffold: { problem: 'The Government of Karnataka plans to install 50,000 LED streetlights across Bengaluru at a total capital cost of ₹200 crore.',
            steps: [
            { text: 'Identify the given data—capital cost ₹200 crore, annual O&M ₹12 crore, population 1.3 crore.' },
            { text: 'Calculate average capital cost per resident = Total capital cost / Population = ₹200 crore / 1.3 crore = ₹153.85 per.' },
            { text: 'Explain marginal cost: Streetlights are non-rivalrous. The 1.3 crore-th resident uses the *existing* light; no new.' },
            { text: 'Analyze private firm failure: The firm cannot exclude non-payers (non-excludable).' },
            { text: 'Conclude: Government must fund via taxes (compulsory, non-excludable payment) because voluntary payment fails.', faded: true, blankAnswer: '(a) ₹153.85 per resident (capital); (b) Marginal cost = ₹0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_3', title: 'Opportunity cost is the value of the.',
          scaffold: { problem: 'Meena has ₹10,000 saved. She can either (a) buy a second-hand scooter for ₹10,000 that saves her ₹500/month in auto-rickshaw fares for 3.',
            steps: [
            { text: 'Identify the two mutually exclusive alternatives: scooter vs fixed deposit.' },
            { text: 'Calculate total benefit of scooter over 3 years: ₹500/month × 12 months × 3 years = ₹18,000 savings.' },
            { text: 'Calculate fixed deposit maturity: Principal ₹10,000 at 7% compounded annually for 3 years = ₹10,000 × (1.07)^3 =.' },
            { text: 'Compare net benefits: Scooter gives ₹12,000 net benefit; FD gives ₹2,250.43 interest.' },
            { text: 'Interpret: The opportunity cost of buying the scooter is the ₹12,250.43 the FD would have grown to.', faded: true, blankAnswer: 'Opportunity cost of buying the scooter = ₹12,250.43 (the.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_eco_ch1_3', title: 'Identify each idea',
          dissect: { specimen: 'Basic Economic Terms', spots: [
            { id: 's1', label: 'Public goods are goods characterized', prompt: 'Which idea is this? — Public goods are goods characterized by **non-excludability** (impossible or extremely.', answer: 'Public goods are goods characterized', options: ['Public goods are goods characterized', 'Opportunity cost is the value'] },
            { id: 's2', label: 'Opportunity cost is the value', prompt: 'Which idea is this? — Opportunity cost is the value of the next best alternative forgone when a choice is made,.', answer: 'Opportunity cost is the value', options: ['Opportunity cost is the value', 'Public goods are goods characterized'] }
          ] } }
    ],
    explore: { component: C9_EconomicsBasicEconomicTermsSim, prompt: 'Explore the interactive — Basic Economic Terms' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch1_10', difficulty: 'standard',
          question: 'Public goods are goods characterized by **non-excludability** (impossible or.',
          hint: 'Revisit **c9_eco_ch1_4 (What to Produce)** and **c9_eco_ch1_8 (Planned vs Market.',
          misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate.',
          parts: [
                { id: 'a', prompt: 'Define a public good using the two essential economic characteristics. Give one example of a public good provided by the Indian government.', answer: 'A public good is **non-excludable** (no one can be prevented from using it) and',
                  options: ['A public good is **non-excludable** (no one can be prevented from using it) and', 'a good provided by the government'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate *zero-price provision*.' },
                { id: 'b', prompt: 'Compare **national defense** and **a toll highway**. Both are provided by the government.', answer: '| Characteristic | National Defense | Toll Highway |',
                  options: ['| Characteristic | National Defense | Toll Highway |', 'both are public goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate *zero-price provision*.' }
          ],
            remediations: { 'misconception-any-good-provided-free': { steps: ['Draw a 2×2 matrix on paper: rows = Excludable / Non-excludable; columns = Rivalrous / Non-rivalrous.', 'Place these goods in correct cells: **National defense, Streetlight, Clean air, Toll road, Mid-Day Meal, Ujjwala LPG,.', 'Label each cell: Public Good / Club Good / Common Resource / Private Good.', 'For each, write *one sentence* explaining *why* it fits that cell using the two characteristics.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate.',
          parts: [
                { id: 'a', prompt: 'The Government of India is deciding whether to fund a new **missile defense system** (cost: ₹50,000 crore) or a **nationwide free Wi-Fi network** (cost:.', answer: '**Missile defense is the stronger case.** Reasoning: 1',
                  options: ['**Missile defense is the stronger case.** Reasoning: 1', 'it\'s modern'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate *zero-price provision*.' },
                { id: 'b', prompt: 'Compare **national defense** and **a toll highway**. Both are provided by the government.', answer: '| Characteristic | National Defense | Toll Highway |',
                  options: ['| Characteristic | National Defense | Toll Highway |', 'both are public goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate *zero-price provision*.' }
          ],
            remediations: { 'misconception-any-good-provided-free': { steps: ['Draw a 2×2 matrix on paper: rows = Excludable / Non-excludable; columns = Rivalrous / Non-rivalrous.', 'Place these goods in correct cells: **National defense, Streetlight, Clean air, Toll road, Mid-Day Meal, Ujjwala LPG,.', 'Label each cell: Public Good / Club Good / Common Resource / Private Good.', 'For each, write *one sentence* explaining *why* it fits that cell using the two characteristics.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_3', difficulty: 'standard',
          question: 'Opportunity cost is the value of the next best alternative forgone when a.',
          hint: 'Revisit c9_eco_ch1_1 (Scarcity) and c8_eco_ch1_2 (Factors of Production) to see how.',
          misconception: 'Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary expense of the chosen.',
          parts: [
                { id: 'a', prompt: 'Compare two students: Priya spends 3 hours daily on tuition earning ₹500/hour as a tutor; Rohan spends 3 hours daily studying for exams, expecting a.', answer: 'Priya\'s opportunity cost is the study time forgone',
                  options: ['Correct answer: Priya\'s opportunity cost is the study time forgone', 'Priya\'s opportunity cost is higher'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary expense of the chosen option.' }
          ],
            remediations: { 'opportunity-cost-is-the-sum': { steps: ['Use a two-column table: "Chosen Option" and "Next Best Alternative". List only ONE alternative in the second column.', 'Value the next best alternative in monetary terms if possible (e.g., resale value, wage), otherwise describe.', 'Practice with three scenarios: (a) spending pocket money, (b) allocating study time, (c) farmer\'s crop choice.', 'Emphasize that the chosen option\'s cost is irrelevant; only the forgone alternative\'s value matters.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary expense of the chosen.',
          parts: [
                { id: 'a', prompt: 'Compare two students: Priya spends 3 hours daily on tuition earning ₹500/hour as a tutor; Rohan spends 3 hours daily studying for exams, expecting a.', answer: 'Priya\'s opportunity cost is the study time forgone',
                  options: ['Correct answer: Priya\'s opportunity cost is the study time forgone', 'Priya\'s opportunity cost is higher'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary expense of the chosen option.' }
          ],
            remediations: { 'opportunity-cost-is-the-sum': { steps: ['Use a two-column table: "Chosen Option" and "Next Best Alternative". List only ONE alternative in the second column.', 'Value the next best alternative in monetary terms if possible (e.g., resale value, wage), otherwise describe.', 'Practice with three scenarios: (a) spending pocket money, (b) allocating study time, (c) farmer\'s crop choice.', 'Emphasize that the chosen option\'s cost is irrelevant; only the forgone alternative\'s value matters.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
