import type { SimDef } from '../../engine/types';
import C12_HomeScienceSpecialDietsFeverSim from '../../../simulations/c6_12/C12_HomeScienceSpecialDietsFeverSim';

/** v3 wrapped master — C12_HomeScienceSpecialDietsFeverSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_homesciencespecialdietsfeversim: SimDef = {
    id: 'v3w_c12_homesciencespecialdietsfeversim',
    title: 'Nutritional Requirements During Fever and Infections',
    subtitle: 'Covers metabolic changes during fever/infection, calculation of increased RDA for energy.',
    classLevel: 12, subject: 'science', topic: 'Nutritional Requirements During Fever and Infections',
    chapters: [],
    nodeIds: ['c12_hs_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine your younger sibling has a high fever (39.5°C) for three days and refuses to eat — "I\'m not hungry,.', goal: 'Master Nutritional Requirements During Fever and Infections.' },
    discovery: {
        question: 'Explain why protein requirement increases disproportionately (50-100% above RDA) compared to energy (10-15%) during infection, and name two specific amino.',
        options: ['Protein increases more', 'protein builds muscle', 'starve a fever'],
        answer: 'Protein increases more',
        hook: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.',
    },
    teaching: [
        { title: 'Nutritional requirements during fever and.', text: 'Nutritional requirements during fever and infections refer to the increased and altered nutrient needs (energy, protein, fluids, electrolytes, vitamins, and minerals) that occur due to elevated.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hs_cbse_09_010', title: 'Nutritional requirements during fever.',
          scaffold: { problem: 'A 30-year-old male (weight 70 kg, height 170 cm) develops a fever of 39.5°C. His basal metabolic rate (BMR) is 1650 kcal/day.',
            steps: [
            { text: 'Calculate ΔT = 39.5 - 37 = 2.5°C. Energy increase = 7% per °C × 2.5 = 17.5%.' },
            { text: 'Apply activity factor for bed rest with fever = 1.2. Total energy = 1856 × 1.2 = 2227 kcal/day. Round to 2250 kcal/day.' },
            { text: 'Protein requirement = 1.5 g/kg (moderate fever) to 2.0 g/kg (severe). Use 1.75 g/kg. Protein = 70 × 1.75 = 122.5 g/day.' },
            { text: 'Fluid requirement = 35 mL/kg + 500 mL/°C above 37 = (35 × 70) + (500 × 2.5) = 2450 + 1250 = 3700 mL/day.' },
            { text: 'Verify: Energy 2250 kcal (vs normal ~2400 for sedentary male — slightly lower due to bed rest but fever compensates),.', faded: true, blankAnswer: 'Energy: 2250 kcal/day; Protein: 125 g/day; Fluid: 3700.' }
            ] } }
    ],
    explore: { component: C12_HomeScienceSpecialDietsFeverSim, prompt: 'Explore the interactive — Nutritional Requirements During Fever and Infections' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_010', difficulty: 'standard',
          question: 'Nutritional requirements during fever and infections refer to the increased and.',
          hint: 'Revisit c11_hs_cbse_03_007 for RDA table lookup and calculation steps, and.',
          misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.',
          parts: [
                { id: 'a', prompt: 'Explain why protein requirement increases disproportionately (50-100% above RDA) compared to energy (10-15%) during infection, and name two specific amino.', answer: 'Protein increases more',
                  options: ['Protein increases more', 'protein builds muscle', 'starve a fever'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.' }
          ],
            remediations: { 'starve-a-fever-or-that': { steps: ['If the student persists with "starve the fever" thinking: (1) Revisit c11_hs_cbse_03_007 (RDA concept) and.', '(2) Calculate nitrogen balance: show that 0 g protein intake + fever-induced urinary nitrogen loss = negative balance.', '(3) Re-do Diagnostic Question 3 with the constraint: "Must provide 1.5 g protein/kg/day." (4) Verify by checking if the.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.',
          parts: [
                { id: 'a', prompt: 'Critique this meal plan for a 40-year-old woman with dengue fever (platelets 80,000/μL, hematocrit rising): Breakfast: Tea + 2 toast; Lunch: Rice + rasam +.', answer: 'Deficiencies: (1) Protein: ~25 g/day vs',
                  options: ['Deficiencies: (1) Protein: ~25 g/day vs', 'looks light and digestible', 'starve a fever', 'Give only glucose water and clear soup for 3 days until fever breaks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.' },
                { id: 'b', prompt: 'Create a novel "fever recovery snack" recipe for an adolescent that delivers ≥200 kcal and ≥10 g protein per serving, uses only ingredients permitted in a soft.', answer: 'Recipe: "Curd-Nut Energy Bowl"',
                  options: ['Recipe: "Curd-Nut Energy Bowl"', 'starve a fever', 'Give only glucose water and clear soup for 3 days until fever breaks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.' }
          ],
            remediations: { 'starve-a-fever-or-that': { steps: ['If the student persists with "starve the fever" thinking: (1) Revisit c11_hs_cbse_03_007 (RDA concept) and.', '(2) Calculate nitrogen balance: show that 0 g protein intake + fever-induced urinary nitrogen loss = negative balance.', '(3) Re-do Diagnostic Question 3 with the constraint: "Must provide 1.5 g protein/kg/day." (4) Verify by checking if the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
