import type { SimDef } from '../../engine/types';
import C12_HomeSciencePrinciplesMethodsCookingSim from '../../../simulations/c6_12/C12_HomeSciencePrinciplesMethodsCookingSim';

/** v3 wrapped master — C12_HomeSciencePrinciplesMethodsCookingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_homescienceprinciplesmethodscookingsim: SimDef = {
    id: 'v3w_c12_homescienceprinciplesmethodscookingsim',
    title: 'Food Processing: Objectives, Methods and Preservation Techniques',
    subtitle: 'This node covers objectives of food processing (safety, shelf-life extension, nutrient.',
    classLevel: 12, subject: 'science', topic: 'Food Processing: Objectives, Methods and Preservation Techniques',
    chapters: [],
    nodeIds: ['c12_hs_cbse_02_010', 'c12_hs_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you buy fresh tomatoes from the market — within 3 days they turn mushy and mouldy, but a bottle of.', goal: 'Master Food Processing: Objectives, Methods and Preservation Techniques.' },
    discovery: {
        question: 'List the three main objectives of food processing and give one example of a product for each objective where that objective is the PRIMARY driver.',
        options: ['The three main objectives are: (1) Safety', 'nutrient retention', 'processed food = unhealthy'],
        answer: 'The three main objectives are: (1) Safety',
        hook: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with.',
    },
    teaching: [
        { title: 'Food processing is the transformation of raw.', text: 'Food processing is the transformation of raw agricultural produce into safe, palatable, and shelf-stable food products through physical, chemical, or biological methods, while preservation techniques.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_hs_cbse_02_010', title: 'Food processing is the transformation.',
          caseStudy: { intro: 'Imagine you buy fresh tomatoes from the market — within 3 days they turn mushy and mouldy, but a bottle of tomato ketchup lasts 12 months in your pantry.',
            decisions: [{ prompt: 'List the three main objectives of food processing and give one example of a product for each objective where that objective is the PRIMARY.', options: [
                { text: 'The three main objectives are: (1) Safety', outcome: 'The three main objectives are: (1) Safety — e.g., pasteurised milk (pathogen elimination is.' },
                { text: 'nutrient retention', outcome: 'Not quite — Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate.', reveals: 'processed-food-unhealthy-and-preservatives' },
                { text: 'processed food = unhealthy', outcome: 'Not quite — Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate.', reveals: 'processed-food-unhealthy-and-preservatives' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_09_011', title: 'Therapeutic diets for cardiovascular.',
          scaffold: { problem: 'A 55-year-old male (70 kg, sedentary) with hypertension and LDL-C 170 mg/dL is prescribed an 1800 kcal therapeutic diet.',
            steps: [
            { text: 'Determine total fat target: 20-25% of 1800 kcal = 360-450 kcal from fat → 40-50 g total fat/day. Use midpoint 45 g.' },
            { text: 'Saturated fat target: <7% of 1800 kcal = <126 kcal → <14 g/day. Per meal (5 eating occasions): <2.8 g/meal.' },
            { text: 'Cholesterol target: <200 mg/day → <40 mg/meal.' },
            { text: 'Calculate breakfast saturated fat: Butter 5 g × 2 parathas = 10 g butter. Butter is ~50% SFA → 5 g SFA.' },
            { text: 'Compare: 7.7 g > 2.8 g allowance. Breakfast alone exceeds daily SFA limit.', faded: true, blankAnswer: 'Total fat target 45 g/day, SFA <14 g/day (<2.8 g/meal),.' }
            ] } }
    ],
    explore: { component: C12_HomeSciencePrinciplesMethodsCookingSim, prompt: 'Explore the interactive — Food Processing: Objectives, Methods and Preservation Techniques' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_010', difficulty: 'standard',
          question: 'Food processing is the transformation of raw agricultural produce into safe,.',
          hint: 'Revisit c12_hs_cbse_02_009 (Water and Dietary Fibre) section on water activity and.',
          misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with.',
          parts: [
                { id: 'a', prompt: 'List the three main objectives of food processing and give one example of a product for each objective where that objective is the PRIMARY driver.', answer: 'The three main objectives are: (1) Safety',
                  options: ['The three main objectives are: (1) Safety', 'nutrient retention', 'processed food = unhealthy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' },
                { id: 'b', prompt: 'A food technologist wants to produce shelf-stable mango pulp (pH 3.8, water activity 0.98) without refrigeration.', answer: 'Option A: Hot-fill at 90°C kills vegetative microbes and creates vacuum seal',
                  options: ['Option A: Hot-fill at 90°C kills vegetative microbes and creates vacuum seal', 'hurdle technology', 'processed food = unhealthy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' },
                { id: 'c', prompt: 'Compare and contrast primary, secondary, and tertiary food processing using wheat as the raw material.', answer: 'Primary: Wheat cleaning & milling → physical separation of bran/germ/endosperm →',
                  options: ['Primary: Wheat cleaning & milling → physical separation of bran/germ/endosperm →', 'processed food = unhealthy', 'preservatives = harmful chemicals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' }
          ],
            remediations: { 'processed-food-unhealthy-and-preservatives': { steps: ['Have the student list 5 foods they ate yesterday and classify each as unprocessed, primary, secondary, or tertiary.', 'For each, identify the preservation method used (heat, cold, drying, acid, salt, sugar, packaging, fermentation).', 'Ask them to calculate the benzoate exposure from a 250 mL drink with 150 ppm benzoate for a 50 kg person, compare to.', 'Re-attempt Diagnostic Question 5 — if they still claim "preservatives are poison," assign reading of FSSAI regulation.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Irradiation is the ideal preservation method because it kills all microorganisms without heating the food, so nutrients are perfectly.', answer: 'Three flaws: (1) "Kills all microorganisms"',
                  options: ['Three flaws: (1) "Kills all microorganisms"', 'non-thermal', 'non-damaging', 'processed food = unhealthy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' },
                { id: 'b', prompt: 'Design a preservation protocol for fresh coconut water (pH 5.0, aw 0.99, high potassium, heat-sensitive flavour) targeting 6-month shelf-life at room.', answer: 'Protocol: (1) Harvest young coconuts (9-10 months) under hygienic conditions',
                  options: ['Protocol: (1) Harvest young coconuts (9-10 months) under hygienic conditions', 'processed food = unhealthy', 'preservatives = harmful chemicals', '"processed food = unhealthy" and "preservatives = harmful chemicals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' }
          ],
            remediations: { 'processed-food-unhealthy-and-preservatives': { steps: ['Have the student list 5 foods they ate yesterday and classify each as unprocessed, primary, secondary, or tertiary.', 'For each, identify the preservation method used (heat, cold, drying, acid, salt, sugar, packaging, fermentation).', 'Ask them to calculate the benzoate exposure from a 250 mL drink with 150 ppm benzoate for a 50 kg person, compare to.', 'Re-attempt Diagnostic Question 5 — if they still claim "preservatives are poison," assign reading of FSSAI regulation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
