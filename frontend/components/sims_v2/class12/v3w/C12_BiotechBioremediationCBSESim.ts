import type { SimDef } from '../../engine/types';
import C12_BiotechBioremediationCBSESim from '../../../simulations/c6_12_new/C12_BiotechBioremediationCBSESim';

/** v3 wrapped master — C12_BiotechBioremediationCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechbioremediationcbsesim: SimDef = {
    id: 'v3w_c12_biotechbioremediationcbsesim',
    title: 'Bioremediation CBSE',
    subtitle: 'This node covers the **scope and classification of major biotechnology sectors** as.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology Industry: Scope and Major Sectors',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_12_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a Class 12 student asked: "Biotechnology is everywhere — from the insulin a diabetic relative.', goal: 'Master Bioremediation CBSE.' },
    discovery: {
        question: 'Compare and contrast **organoids** and **spheroids** as 3D culture models for drug screening.',
        options: ['the cellular origin of each, (', 'both need Matrigel', 'both come from stem cells'],
        answer: 'the cellular origin of each, (',
        hook: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
    },
    teaching: [
        { title: 'The biotechnology industry encompasses the.', text: 'The biotechnology industry encompasses the commercial application of biological systems, living organisms, or their derivatives to develop products and processes across five major innovation sectors:.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_12_001', title: 'The biotechnology industry encompasses.',
          scaffold: { problem: 'A biotech company in Punjab plans to set up a biodiesel plant using waste cooking oil (WCO) collected from restaurants.',
            steps: [
            { text: 'Identify the key constraint — high FFA (15%) in waste cooking oil.' },
            { text: 'Recall the trans-esterification reaction: triglyceride + 3 methanol → 3 fatty acid methyl esters (FAME/biodiesel) +.' },
            { text: 'Write the molecular formula for tripalmitin (C₅₁H₉₈O₆, three palmitic acid C₁₆ chains on glycerol backbone) and.' },
            { text: 'Balance the equation: C₅₁H₉₈O₆ + 3 CH₃OH → 3 C₁₇H₃₄O₂ (methyl palmitate) + C₃H₈O₃ (glycerol).' },
            { text: 'Interpret — the 3:1 methanol:oil molar ratio is stoichiometric; industrially 6:1 (2x excess) is used to drive.', faded: true, blankAnswer: 'Acid-catalysed (H₂SO₄) trans-esterification is suitable for.' }
            ] } }
    ],
    explore: { component: C12_BiotechBioremediationCBSESim, prompt: 'Explore the interactive — Bioremediation CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_001', difficulty: 'standard',
          question: 'The biotechnology industry encompasses the commercial application of biological.',
          hint: 'If stuck on biofuel processes: revisit Class 11 Biology Chapter 12 (Respiration) nodes.',
          misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast **organoids** and **spheroids** as 3D culture models for drug screening.', answer: 'the cellular origin of each, (',
                  options: ['the cellular origin of each, (', 'both need Matrigel', 'both come from stem cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' }
          ],
            remediations: { 'misconception-environmental-biotechnology-biorem': { steps: ['**Re-read NCERT 12.1.1 (Biofuel) and 12.1.2 (Biodegradation)** — make a two-column table: left column = "Remediation.', 'Fill with: biodiesel, bioalcohol, biogas, biomass, PHB, biopulping, biobleaching, microbial EOR.', '**Create flashcards** for each biofuel type: raw material → process name → key advantage → key limitation (e.g.,.', '**Re-diagnostic**: Ask a peer to quiz you: "Name the process for biodiesel.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Gold nanoparticles of 10 nm diameter are always ruby red, so colour can be used as a reliable quality-control metric for nanoparticle.', answer: 'The claim is **partially true but dangerous as a sole QC metric**',
                  options: ['The claim is **partially true but dangerous as a sole QC metric**', 'yes, colour is reliable', 'properties depend on size, shape, surface charge, and composition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' },
                { id: 'b', prompt: 'Compare and contrast **organoids** and **spheroids** as 3D culture models for drug screening.', answer: 'the cellular origin of each, (',
                  options: ['the cellular origin of each, (', 'both need Matrigel', 'both come from stem cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' }
          ],
            remediations: { 'misconception-environmental-biotechnology-biorem': { steps: ['**Re-read NCERT 12.1.1 (Biofuel) and 12.1.2 (Biodegradation)** — make a two-column table: left column = "Remediation.', 'Fill with: biodiesel, bioalcohol, biogas, biomass, PHB, biopulping, biobleaching, microbial EOR.', '**Create flashcards** for each biofuel type: raw material → process name → key advantage → key limitation (e.g.,.', '**Re-diagnostic**: Ask a peer to quiz you: "Name the process for biodiesel.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
