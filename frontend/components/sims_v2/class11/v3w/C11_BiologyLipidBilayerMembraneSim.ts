import type { SimDef } from '../../engine/types';
import C11_BiologyLipidBilayerMembraneSim from '../../../simulations/three/C11_BiologyLipidBilayerMembraneSim';

/** v3 wrapped master — C11_BiologyLipidBilayerMembraneSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologylipidbilayermembranesim: SimDef = {
    id: 'v3w_c11_biologylipidbilayermembranesim',
    title: 'Lipid Bilayer Membrane',
    subtitle: 'This node covers the structural organization of the plasma membrane according to the.',
    classLevel: 11, subject: 'biology', topic: 'Cell Membrane: Fluid Mosaic Model',
    chapters: [],
    nodeIds: ['c11_bio_cbse_08_003', 'c11_bio_cbse_08_005', 'c11_bio_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a drop of blood under a microscope — red blood cells maintain their biconcave shape while squeezing.', goal: 'Master Lipid Bilayer Membrane.' },
    discovery: {
        question: 'List the four major molecular components of the plasma membrane in the Fluid Mosaic Model and state the orientation of phospholipids in the bilayer.',
        options: ['The four components are: (1) Phospholipids', 'proteins form a layer on both sides', 'sandwich model'],
        answer: 'The four components are: (1) Phospholipids',
        hook: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like.',
    },
    teaching: [
        { title: 'The Fluid Mosaic Model describes the plasma.', text: 'The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid phospholipid bilayer in which protein molecules (integral and peripheral) are embedded or attached, capable of lateral.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_08_003', title: 'The Fluid Mosaic Model describes the.',
          scaffold: { problem: 'A student observes that red blood cells (RBCs) stored in a refrigerator (4°C) become brittle and fragment easily, while those at 37°C.',
            steps: [
            { text: 'Identify the key structural feature — the phospholipid bilayer\'s physical state (fluid vs.' },
            { text: 'Recall that RBC membranes contain cholesterol and unsaturated phospholipids.' },
            { text: 'At 4°C, thermal energy decreases — phospholipid tails lose kinetic energy and pack tightly into a gel phase (ordered,.' },
            { text: 'In gel phase, lateral diffusion of proteins (e.g., Band 3, spectrin anchors) stops; membrane loses flexibility needed.' },
            { text: 'Conclude: Cold-induced gel phase transition makes membrane brittle; this is why blood banks store RBCs at 4°C but.', faded: true, blankAnswer: 'At 4°C, the RBC membrane undergoes a fluid-to-gel phase.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_08_005', title: 'The endomembrane system is a.',
          scaffold: { problem: 'A pancreatic beta cell synthesizes proinsulin. Trace its journey from the ribosome to secretion as mature insulin, naming each organelle,.',
            steps: [
            { text: 'Identify the starting point – proinsulin mRNA is translated by ribosomes attached to the cytosolic surface of the rough.' },
            { text: 'Inside the ER lumen – proinsulin folds with the help of chaperones (BiP) and forms disulfide bonds.' },
            { text: 'Transport to Golgi – correctly folded proinsulin is packaged into COPII-coated vesicles that bud from ER exit sites and.' },
            { text: 'Golgi processing – in the Golgi cisternae, proinsulin undergoes further folding and is sorted into secretory granules.' },
            { text: 'Secretion – mature insulin is stored in dense-core secretory granules.' },
            { text: 'Verify – the pathway follows the canonical secretory route: RER → Golgi → secretory vesicles → extracellular space.', faded: true, blankAnswer: 'Proinsulin is synthesized on RER ribosomes → translocated.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_08_010', title: 'Microbodies are small,.',
          scaffold: { problem: 'A researcher isolates two fractions from homogenized spinach leaves: Fraction A shows high catalase and glycolate oxidase activity;.',
            steps: [
            { text: 'Recognize catalase + glycolate oxidase as signature peroxisomal enzymes (photorespiration/H₂O₂ detox).' },
            { text: 'Recognize acid hydrolases (phosphatase, protease) at low pH as signature lysosomal enzymes (degradation).' },
            { text: 'Assign Fraction A = peroxisomes, Fraction B = lysosomes.' },
            { text: 'Link peroxisomal enzymes to photorespiratory C₂ cycle: glycolate oxidase converts glycolate to glycine (producing.' },
            { text: 'High O₂/low CO₂ increases Rubisco oxygenase activity → more glycolate produced → higher flux through peroxisomes →.' },
            { text: 'Lysosomal activity (Fraction B) is unaffected by gas conditions as it handles turnover, not photorespiration.', faded: true, blankAnswer: 'Fraction A = peroxisomes (photorespiration, H₂O₂ detox);.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_08_005', title: 'Identify each idea',
          dissect: { specimen: 'Lipid Bilayer Membrane', spots: [
            { id: 's1', label: 'The Fluid Mosaic Model describes', prompt: 'Which idea is this? — The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid.', answer: 'The Fluid Mosaic Model describes', options: ['The Fluid Mosaic Model describes', 'The endomembrane system is a', 'Microbodies are small single-membrane-bound organelles'] },
            { id: 's2', label: 'The endomembrane system is a', prompt: 'Which idea is this? — The endomembrane system is a coordinated network of membrane-bound organelles—endoplasmic.', answer: 'The endomembrane system is a', options: ['The endomembrane system is a', 'The Fluid Mosaic Model describes', 'Microbodies are small single-membrane-bound organelles'] },
            { id: 's3', label: 'Microbodies are small single-membrane-bound organelles', prompt: 'Which idea is this? — Microbodies are small, single-membrane-bound organelles (e.g., peroxisomes, glyoxysomes).', answer: 'Microbodies are small single-membrane-bound organelles', options: ['Microbodies are small single-membrane-bound organelles', 'The Fluid Mosaic Model describes', 'The endomembrane system is a'] }
          ] } }
    ],
    explore: { component: C11_BiologyLipidBilayerMembraneSim, prompt: 'Explore the interactive — Lipid Bilayer Membrane' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_003', difficulty: 'standard',
          question: 'The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid.',
          hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and.',
          misconception: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like.',
          parts: [
                { id: 'a', prompt: 'List the four major molecular components of the plasma membrane in the Fluid Mosaic Model and state the orientation of phospholipids in the bilayer.', answer: 'The four components are: (1) Phospholipids',
                  options: ['The four components are: (1) Phospholipids', 'proteins form a layer on both sides', 'sandwich model'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like molecules in water.' },
                { id: 'b', prompt: 'A researcher treats human red blood cells with an enzyme that cleaves carbohydrate moieties from membrane glycoproteins.', answer: 'cell-cell recognition and (',
                  options: ['cell-cell recognition and (', 'fluid mosaic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like molecules in water.' }
          ],
            remediations: { 'fluid-mosaic-means-the-membrane': { steps: ['Revisit the FRAP experiment concept — watch a 2-minute animation of fluorescence recovery (search "FRAP membrane.', 'Draw a membrane cross-section showing three barriers to free diffusion: (a) lipid raft (cholesterol-rich), (b).', 'For each barrier, name one protein whose movement it restricts (e.g., GPI-anchored protein in raft; Band 3 in RBC.', 'Explain to a peer why "fluid" ≠ "homogeneous" using the analogy of a crowded dance floor with VIP sections and barriers.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_005', difficulty: 'standard',
          question: 'The endomembrane system is a coordinated network of membrane-bound.',
          hint: 'If stuck, review Class 9 nodes c9_bio_ch1_7 (ER) and c9_bio_ch1_8 (Golgi) for basic.',
          misconception: 'Students often believe the smooth ER and rough ER are physically separate organelles, or that the Golgi apparatus.',
          parts: [
                { id: 'a', prompt: 'A researcher treats a secretory cell with a drug that prevents vesicle budding from the ER.', answer: 'lysosomal enzyme activity inside lysosomes, (',
                  options: ['lysosomal enzyme activity inside lysosomes, (', 'all ER functions depend on vesicular transport'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the smooth ER and rough ER are physically separate organelles, or that the Golgi apparatus *creates* lysosomal.' }
          ],
            remediations: { 'the-smooth-er-and-rough': { steps: ['Revisit the **vesicular transport pathway**: Draw a flowchart: DNA → mRNA → Ribosome on RER → ER lumen → Transport.', 'Use a physical analogy: ER = factory floor (synthesis), Golgi = packaging & labeling department, Lysosomes = recycling.', 'Watch an animation of GFP-tagged protein trafficking (e.g., from NCERT e-content).', 'Practice labeling a diagram of the secretory pathway with arrows showing directionality.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_010', difficulty: 'standard',
          question: 'Microbodies are small, single-membrane-bound organelles (e.g., peroxisomes,.',
          hint: 'Review c11_bio_cbse_08_005 (Endomembrane System) for organelle biogenesis pathways and.',
          misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.',
          parts: [
                { id: 'a', prompt: 'A student observes two types of granules in a plant cell under the microscope: one stains blue-black with iodine, the other dissolves in ethanol and stains red.', answer: 'Blue-black iodine stain → starch grains (polysaccharide storage)',
                  options: ['Blue-black iodine stain → starch grains (polysaccharide storage)', 'starch granules are plastids', 'lipid droplets are microbodies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.' }
          ],
            remediations: { 'microbodies-are-small-lysosomes-because': { steps: ['Create a comparison table (Peroxisome vs Lysosome) with columns: Membrane origin, Enzyme type (oxidase/catalase vs.', 'Perform catalase test on potato tuber (peroxisome-rich) vs. liver (lysosome-rich) – only potato shows rapid O₂ bubbles.', 'Trace the pathway: Glycolate (from chloroplast) → Peroxisome (glycine) → Mitochondria (NH₃/CO₂) → Peroxisome (serine) →.', 'Re-attempt labelling with functional annotations.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Glyoxysomes are present only in germinating oil-rich seeds and disappear once the seedling becomes photosynthetic." Is it entirely.', answer: 'Partially correct',
                  options: ['Partially correct', 'they stay forever', 'they become mitochondria', 'small lysosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.' },
                { id: 'b', prompt: 'Design a simple histochemical experiment using a germinating groundnut seed to demonstrate the transition from glyoxysomes to peroxisomes over a 7-day period.', answer: 'Day 0 (dry seed), Day 2, Day 4, Day 7',
                  options: ['Day 0 (dry seed), Day 2, Day 4, Day 7', 'small lysosomes', 'microbodies are "small lysosomes"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.' }
          ],
            remediations: { 'microbodies-are-small-lysosomes-because': { steps: ['Create a comparison table (Peroxisome vs Lysosome) with columns: Membrane origin, Enzyme type (oxidase/catalase vs.', 'Perform catalase test on potato tuber (peroxisome-rich) vs. liver (lysosome-rich) – only potato shows rapid O₂ bubbles.', 'Trace the pathway: Glycolate (from chloroplast) → Peroxisome (glycine) → Mitochondria (NH₃/CO₂) → Peroxisome (serine) →.', 'Re-attempt labelling with functional annotations.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
