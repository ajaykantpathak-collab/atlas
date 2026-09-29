import type { SimDef } from '../../engine/types';
import C10_EVSRoleIndustriesInstitutionsSim from '../../../simulations/c6_12/C10_EVSRoleIndustriesInstitutionsSim';

/** v3 wrapped master — C10_EVSRoleIndustriesInstitutionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_evsroleindustriesinstitutionssim: SimDef = {
    id: 'v3w_c10_evsroleindustriesinstitutionssim',
    title: 'Manufacturing: Importance and Industrial Location Factors',
    subtitle: 'Covers the definition and economic importance of manufacturing in the Indian context and.',
    classLevel: 10, subject: 'evs', topic: 'Manufacturing: Importance and Industrial Location Factors',
    chapters: [],
    nodeIds: ['c10_geo_cbse_06_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a factory near your city — perhaps a sugar mill in Uttar Pradesh or a textile unit in Tamil Nadu —.', goal: 'Master Manufacturing: Importance and Industrial Location Factors.' },
    discovery: {
        question: 'Why do sugar mills in India concentrate in the sugarcane-growing belts of Uttar Pradesh, Maharashtra, and Karnataka, even though sugar can be transported.',
        options: ['Sugarcane is a weight-losing, perishable raw material', 'raw material availability', 'weight-losing'],
        answer: 'Sugarcane is a weight-losing, perishable raw material',
        hook: 'Students believe "industries locate where raw materials are found" as a universal rule.',
    },
    teaching: [
        { title: 'Manufacturing is the process of transforming.', text: 'Manufacturing is the process of transforming raw materials into finished goods on a large scale using machinery, labour, and capital; industrial location factors are the geographical and economic.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_geo_cbse_06_001', title: 'Manufacturing is the process of.',
          scaffold: { problem: 'A sugar mill in Muzaffarnagar (western UP) processes 5,000 tonnes of sugarcane daily during the 180-day crushing season.',
            steps: [
            { text: 'Identify the raw material and its key property — sugarcane is perishable and weight-losing (only 12% becomes sugar; 88%.' },
            { text: 'Calculate daily sugar output — 5,000 tonnes cane × 12% = 600 tonnes sugar per day.' },
            { text: 'Compute material index — input weight (cane) = 5,000 tonnes; output weight (sugar) = 600 tonnes; MI = 5000/600 ≈ 8.33.' },
            { text: 'Analyse transport cost implication — moving 5,000 tonnes of bulky, perishable cane 120 km daily requires ~250 truck.' },
            { text: 'Compare with moving sugar — 600 tonnes sugar needs only 30 trucks; lower freight, no perishability.', faded: true, blankAnswer: 'Daily sugar output = 600 tonnes. Relocation to Delhi is.' }
            ] } }
    ],
    explore: { component: C10_EVSRoleIndustriesInstitutionsSim, prompt: 'Explore the interactive — Manufacturing: Importance and Industrial Location Factors' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_001', difficulty: 'standard',
          question: 'Manufacturing is the process of transforming raw materials into finished goods.',
          hint: 'Revisit Class 8 "Classification by Exhaustibility" (c8_geo_ch1_3) and Class 6 "Major.',
          misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.',
          parts: [
                { id: 'a', prompt: 'Why do sugar mills in India concentrate in the sugarcane-growing belts of Uttar Pradesh, Maharashtra, and Karnataka, even though sugar can be transported.', answer: 'Sugarcane is a weight-losing, perishable raw material',
                  options: ['Sugarcane is a weight-losing, perishable raw material', 'raw material availability', 'weight-losing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' },
                { id: 'b', prompt: 'A new integrated steel plant is proposed in Jharkhand. Using the concept of \'weight-losing raw material\', explain why proximity to iron ore and coal mines is.', answer: 'Step 1: Identify raw materials',
                  options: ['Step 1: Identify raw materials', 'market is important', 'industries locate where raw materials are found'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' }
          ],
            remediations: { 'industries-locate-where-raw-materials': { steps: ['Draw a two-column table on paper — Column A: "Weight-losing raw material industries" (iron & steel, sugar, cement);.', 'For each industry in your textbook (c10_geo_cbse_06_002 to 004), place it in the correct column and write the *material.', 'On an outline map of India, mark one cluster for each column (e.g., Jamshedpur for A, Bengaluru for B) and annotate the.', 'Re-attempt Diagnostic Questions 2, 3, 4 using this table — you will see the pattern.'] } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Government policy is the most decisive factor for industrial location in modern India." Support your judgment with two contrasting.', answer: 'Judgment: Partially true',
                  options: ['Judgment: Partially true', 'policy is always decisive', 'industries locate where raw materials are found', '"industries locate where raw materials are found" as a universal rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' },
                { id: 'b', prompt: 'Design a location decision matrix for a hypothetical agro-based food processing unit (tomato ketchup) in Maharashtra.', answer: 'Matrix: (1) Raw material proximity (tomato farms)',
                  options: ['Matrix: (1) Raw material proximity (tomato farms)', 'industries locate where raw materials are found', '"industries locate where raw materials are found" as a universal rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "industries locate where raw materials are found" as a universal rule.' }
          ],
            remediations: { 'industries-locate-where-raw-materials': { steps: ['Draw a two-column table on paper — Column A: "Weight-losing raw material industries" (iron & steel, sugar, cement);.', 'For each industry in your textbook (c10_geo_cbse_06_002 to 004), place it in the correct column and write the *material.', 'On an outline map of India, mark one cluster for each column (e.g., Jamshedpur for A, Bengaluru for B) and annotate the.', 'Re-attempt Diagnostic Questions 2, 3, 4 using this table — you will see the pattern.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
