import type { SimDef } from '../../engine/types';
import C11_BiotechnologyNutrientMediaWhiteSim from '../../../simulations/c6_12/C11_BiotechnologyNutrientMediaWhiteSim';

/** v3 wrapped master — C11_BiotechnologyNutrientMediaWhiteSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechnologynutrientmediawhitesim: SimDef = {
    id: 'v3w_c11_biotechnologynutrientmediawhitesim',
    title: 'Cell Culture: Animal and Plant Cell Culture Techniques',
    subtitle: 'This node covers: (1) Animal cell culture — primary culture vs cell lines, culture media.',
    classLevel: 11, subject: 'biotechnology', topic: 'Cell Culture: Animal and Plant Cell Culture Techniques',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_12_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you need to produce a life-saving monoclonal antibody for cancer treatment — you cannot extract it.', goal: 'Master Cell Culture: Animal and Plant Cell Culture Techniques.' },
    discovery: {
        question: 'A student prepares MS medium for plant tissue culture but forgets to add agar. The medium remains liquid after autoclaving.',
        options: ['Without agar, the medium lacks a solid support matrix', 'nutrients not absorbed', 'animal cells need serum, plant cells need hormones'],
        answer: 'Without agar, the medium lacks a solid support matrix',
        hook: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
    },
    teaching: [
        { title: 'Cell culture is the laboratory technique of.', text: 'Cell culture is the laboratory technique of growing and maintaining animal or plant cells, tissues, or organs under controlled artificial conditions (aseptic environment, defined nutrient media,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_011', title: 'Cell culture is the laboratory.',
          scaffold: { problem: 'A researcher needs to prepare 500 mL of complete DMEM for CHO cell culture.',
            steps: [
            { text: 'Calculate basal DMEM mass = 13.4 g/L × 0.5 L = 6.7 g. Dissolve in ~400 mL water (80% final volume) with stirring.' },
            { text: 'Glucose mass = 4.5 g/L × 0.5 L = 2.25 g. Add to solution.' },
            { text: 'NaHCO₃ mass = 3.7 g/L × 0.5 L = 1.85 g. Add now — it provides CO₂ buffering capacity; adding after FBS risks.' },
            { text: 'Adjust volume to 450 mL with water (90% of 500 mL). Check pH ~7.0-7.2 (pre-CO₂).' },
            { text: 'Add 50 mL heat-inactivated FBS (10% of 500 mL). Add 5 mL pen-strep (1% of 500 mL).' },
            { text: 'Bring to final 500 mL with water. Sterile filter (0.22 μm). Store at 4°C, warm to 37°C before use.', faded: true, blankAnswer: '6.7 g DMEM powder, 2.25 g glucose, 1.85 g NaHCO₃, 50 mL.' }
            ] } }
    ],
    explore: { component: C11_BiotechnologyNutrientMediaWhiteSim, prompt: 'Explore the interactive — Cell Culture: Animal and Plant Cell Culture Techniques' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_011', difficulty: 'standard',
          question: 'Cell culture is the laboratory technique of growing and maintaining animal or.',
          hint: 'If stuck, revisit c9_bio_ch1_4 (cell wall vs membrane) and c10_bio_cbse_02_007 (plant.',
          misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
          parts: [
                { id: 'a', prompt: 'A student prepares MS medium for plant tissue culture but forgets to add agar. The medium remains liquid after autoclaving.', answer: 'Without agar, the medium lacks a solid support matrix',
                  options: ['Without agar, the medium lacks a solid support matrix', 'nutrients not absorbed', 'animal cells need serum, plant cells need hormones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1) Assuming serum-free.' }
          ],
            remediations: { 'animal-cells-need-serum': { steps: ['Have student list all components of complete DMEM (glucose, amino acids, vitamins, salts, pyruvate) and ask "which can.', 'Show a time-lapse video of plant callus on auxin-rich vs cytokinin-rich media — visually demonstrate that the SAME.', 'Give a case study: "HEK293 cells adapted to serum-free media still require 8 recombinant supplements — identify which.', 'Assign a mini-review: compare somatic embryogenesis pathway (LEC1, LEC2, FUS3, ABI3 transcription factors) vs.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
          parts: [
                { id: 'a', prompt: 'Design a minimal experiment to test whether a newly isolated plant species exhibits somatic embryogenesis or organogenesis as its primary regeneration pathway.', answer: 'Explant: young leaf segments (high regeneration competence)',
                  options: ['Explant: young leaf segments (high regeneration competence)', 'animal cells need serum, plant cells need hormones', 'subculture', 'subculturing for differentiation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1) Assuming serum-free.' }
          ],
            remediations: { 'animal-cells-need-serum': { steps: ['Have student list all components of complete DMEM (glucose, amino acids, vitamins, salts, pyruvate) and ask "which can.', 'Show a time-lapse video of plant callus on auxin-rich vs cytokinin-rich media — visually demonstrate that the SAME.', 'Give a case study: "HEK293 cells adapted to serum-free media still require 8 recombinant supplements — identify which.', 'Assign a mini-review: compare somatic embryogenesis pathway (LEC1, LEC2, FUS3, ABI3 transcription factors) vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
