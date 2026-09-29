import type { SimDef } from '../../engine/types';
import C9_EconApplicationsEconomicEntitiesConsumerSim from '../../../simulations/c6_12/C9_EconApplicationsEconomicEntitiesConsumerSim';

/** v3 wrapped master — C9_EconApplicationsEconomicEntitiesConsumerSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_econapplicationseconomicentitiesconsumersim: SimDef = {
    id: 'v3w_c9_econapplicationseconomicentitiesconsumersim',
    title: 'What to Produce: Economic Decision Making',
    subtitle: 'Covers the "What to Produce" central problem, the role of the Production Possibility.',
    classLevel: 9, subject: 'economics', topic: 'What to Produce: Economic Decision Making',
    chapters: [],
    nodeIds: ['c9_eco_ch1_4', 'c9_eco_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine a farmer in Punjab with 10 hectares of land who must decide whether to grow wheat, rice, or sugarcane.', goal: 'Master n Applications Economic Entities Consumer.' },
    discovery: {
        question: 'Define the "What to Produce" problem in economics and state the two main factors that influence this decision in a market economy.',
        options: ['The "What to Produce" problem is the decision of', 'government decides', 'producers decide arbitrarily'],
        answer: 'The "What to Produce" problem is the decision of',
        hook: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want*.',
    },
    teaching: [
        { title: 'The "What to Produce" problem refers to the.', text: 'The "What to Produce" problem refers to the fundamental economic decision of allocating scarce resources among alternative goods and services to maximize societal welfare, determined by the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_eco_ch1_4', title: 'The "What to Produce" problem refers to.',
          scaffold: { problem: 'A small manufacturing unit in Gujarat has 200 machine-hours and 150 labor-hours per week.',
            steps: [
            { text: 'Identify the two scarce resources (machine-hours, labor-hours) and the resource requirements per unit for each product.' },
            { text: 'Calculate maximum utensils if only utensils are produced: Machine constraint = 200/4 = 50 units; Labor constraint =.' },
            { text: 'Calculate maximum frames if only frames are produced: Machine constraint = 200/2 = 100 units; Labor constraint = 150/3.' },
            { text: 'Test combination (30 utensils, 20 frames): Machine-hours used = 30×4 + 20×2 = 120 + 40 = 160 ≤ 200 ✓.' },
            { text: 'Interpret: The combination is feasible and lies inside the PPC (resources not fully utilized — 40 machine-hours and 30.', faded: true, blankAnswer: 'Max utensils = 50, Max frames = 50. Combination (30, 20) is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_3', title: 'The demand curve is a graphical.',
          scaffold: { problem: 'Riya buys notebooks for school. The table shows her demand schedule:',
            steps: [
            { text: 'Identify the economic concept — this is an individual demand schedule obeying the law of demand; plot price (Y-axis) vs.' },
            { text: 'Plot the five points: (2,60), (3,50), (5,40), (8,30), (12,20).' },
            { text: 'Locate the price change: at ₹50, quantity is 3 (point A); at ₹30, quantity is 8 (point B).' },
            { text: 'Name the change correctly: "change in quantity demanded" (movement along the curve), NOT "change in demand" (shift of.' },
            { text: 'Explain the increase: Income effect — at ₹30, Riya\'s pocket money buys more notebooks (real income rises).', faded: true, blankAnswer: '(a) Downward-sloping curve through the five plotted points..' }
            ] } },
        { type: 'dissect', nodeId: 'c9_eco_ch2_3', title: 'Identify each idea',
          dissect: { specimen: 'What to Produce: Economic Decision Making', spots: [
            { id: 's1', label: 'The What to Produce problem', prompt: 'Which idea is this? — The "What to Produce" problem refers to the fundamental economic decision of allocating.', answer: 'The What to Produce problem', options: ['The What to Produce problem', 'The demand curve is a'] },
            { id: 's2', label: 'The demand curve is a', prompt: 'Which idea is this? — The demand curve is a graphical representation of the law of demand, showing the inverse.', answer: 'The demand curve is a', options: ['The demand curve is a', 'The What to Produce problem'] }
          ] } }
    ],
    explore: { component: C9_EconApplicationsEconomicEntitiesConsumerSim, prompt: 'Explore the interactive — n Applications Economic Entities Consumer' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch1_4', difficulty: 'standard',
          question: 'The "What to Produce" problem refers to the fundamental economic decision of.',
          hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) — practice calculating opportunity.',
          misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want*.',
          parts: [
                { id: 'a', prompt: 'Define the "What to Produce" problem in economics and state the two main factors that influence this decision in a market economy.', answer: 'The "What to Produce" problem is the decision of',
                  options: ['The "What to Produce" problem is the decision of', 'government decides', 'producers decide arbitrarily'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want* to make, ignoring.' },
                { id: 'b', prompt: 'Why does the Production Possibility Curve (PPC) slope downward from left to right? Explain the economic reasoning behind this shape.', answer: 'The PPC slopes downward',
                  options: ['The PPC slopes downward', 'it slopes downward', 'because of diminishing returns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want* to make, ignoring.' }
          ],
            remediations: { 'the-what-to-produce-decision': { steps: ['Draw a PPC for a two-good economy (e.g., smartphones vs. grain) on graph paper.', 'Pick a point outside the curve — ask "Can we produce here today?" No — resources insufficient.', 'Pick a point inside — "Are resources fully used?" No — unemployment.', 'Pick a point on the curve — "To get 10 more smartphones, what happens to grain?" Must fall.', 'Relate to India: 2023 budget allocated ₹5.94 lakh crore to defense and ₹1.12 lakh crore to education.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "In a market economy, the \'What to Produce\' problem is solved efficiently because prices reflect both consumer preferences and resource.', answer: 'The statement is partially correct but overgeneralized',
                  options: ['The statement is partially correct but overgeneralized', 'What to Produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want* to make, ignoring.' },
                { id: 'b', prompt: 'Construct a simple Production Possibility Curve for a hypothetical village economy that produces only two goods: milk (litres) and wheat (kg).', answer: 'Max milk: Land constraint: 100/0.5 = 200 litres',
                  options: ['Max milk: Land constraint: 100/0.5 = 200 litres', 'What to Produce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want* to make, ignoring.' }
          ],
            remediations: { 'the-what-to-produce-decision': { steps: ['Draw a PPC for a two-good economy (e.g., smartphones vs. grain) on graph paper.', 'Pick a point outside the curve — ask "Can we produce here today?" No — resources insufficient.', 'Pick a point inside — "Are resources fully used?" No — unemployment.', 'Pick a point on the curve — "To get 10 more smartphones, what happens to grain?" Must fall.', 'Relate to India: 2023 budget allocated ₹5.94 lakh crore to defense and ₹1.12 lakh crore to education.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_3', difficulty: 'standard',
          question: 'The demand curve is a graphical representation of the law of demand, showing.',
          hint: 'Revisit the law of demand (c9_eco_ch2_1) and the individual vs market demand distinction.',
          misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This.',
          parts: [
                { id: 'a', prompt: 'Explain why the demand curve slopes downward. Use the concepts of income effect and substitution effect in your answer, and give a concrete example using a.', answer: 'The downward slope occurs',
                  options: ['The downward slope occurs', 'people buy more when price is low'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This is the single most.' },
                { id: 'b', prompt: 'The table below shows the demand schedule for wheat flour (atta) in a Kolkata household: | Price (₹/kg) | Quantity Demanded (kg/month) |.', answer: 'Plot the demand curve on graph paper',
                  options: ['Plot the demand curve on graph paper', 'shift of the demand curve'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This is the single most.' }
          ],
            remediations: { 'students-routinely-use-demand-and': { steps: ['Draw a demand curve on the board. Label it D₁. Pick a point A (P=₹50, Q=10).', 'Show a price drop to ₹40 — move along D₁ to point B (Q=14). Say: "Only price changed. Curve D₁ stays put.', 'Now announce "Consumer income rises." Draw a new curve D₂ to the right of D₁.', 'Give three rapid-fire scenarios (price of substitute falls, own price rises, population grows) — student must say.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This.',
          parts: [
                { id: 'a', prompt: 'A newspaper headline reads: "As onion prices crashed from ₹60 to ₹20 per kg, demand for onions increased sharply." Evaluate this statement using correct.', answer: 'The headline is economically inaccurate',
                  options: ['The headline is economically inaccurate', 'demand', 'quantity demanded'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This is the single most.' }
          ],
            remediations: { 'students-routinely-use-demand-and': { steps: ['Draw a demand curve on the board. Label it D₁. Pick a point A (P=₹50, Q=10).', 'Show a price drop to ₹40 — move along D₁ to point B (Q=14). Say: "Only price changed. Curve D₁ stays put.', 'Now announce "Consumer income rises." Draw a new curve D₂ to the right of D₁.', 'Give three rapid-fire scenarios (price of substitute falls, own price rises, population grows) — student must say.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
