import type { SimDef } from '../../engine/types';
import C11_BiotechEnzymesBioenergeticsCBSESim from '../../../simulations/c6_12_new/C11_BiotechEnzymesBioenergeticsCBSESim';

/** v3 wrapped master — C11_BiotechEnzymesBioenergeticsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechenzymesbioenergeticscbsesim: SimDef = {
    id: 'v3w_c11_biotechenzymesbioenergeticscbsesim',
    title: 'Mitochondria: Structure and ATP Synthesis',
    subtitle: 'Covers mitochondrial ultrastructure, compartmentalisation of TCA cycle (matrix) vs.',
    classLevel: 11, subject: 'biotechnology', topic: 'Mitochondria: Structure and ATP Synthesis',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_02_007', 'c11_biotech_cbse_02_008', 'c11_biotech_cbse_02_003', 'c11_biotech_cbse_02_006', 'c11_biotech_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a long-distance runner collapsing at the 35 km mark — their muscle cells have exhausted glycolytic.', goal: 'Master Mitochondria: Structure and ATP Synthesis.' },
    discovery: {
        question: 'State the two mitochondrial compartments where the TCA cycle enzymes and the electron transport chain complexes are respectively located, and name the membrane.',
        options: ['TCA cycle enzymes are in the mitochondrial matrix', 'mitochondria = ATP', 'ATP is synthesised in the mitochondrial matrix'],
        answer: 'TCA cycle enzymes are in the mitochondrial matrix',
        hook: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.',
    },
    teaching: [
        { title: 'Mitochondria are double membrane-bound.', text: 'Mitochondria are double membrane-bound organelles in eukaryotic cells where the inner membrane forms cristae to increase surface area for oxidative phosphorylation; the matrix houses the TCA cycle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_02_007', title: 'Mitochondria are double membrane-bound.',
          scaffold: { problem: 'A hepatocyte contains approximately 2000 mitochondria, each with an average inner membrane surface area of 12 μm² (including cristae).',
            steps: [
            { text: 'Convert inner membrane area per mitochondrion to nm²: 12 μm² = 12 × 10⁶ nm² (since 1 μm = 10³ nm, 1 μm² = 10⁶ nm²).' },
            { text: 'Calculate number of ATP synthase complexes per mitochondrion: (12 × 10⁶ nm²) / (30 nm²/complex) = 4 × 10⁵ complexes.' },
            { text: 'Calculate ATP production rate per mitochondrion: (4 × 10⁵ complexes) × (100 ATP/s) = 4 × 10⁷ ATP/s.' },
            { text: 'Scale to 2000 mitochondria: (4 × 10⁷ ATP/s) × 2000 = 8 × 10¹⁰ ATP/s.' },
            { text: 'Convert to per minute: (8 × 10¹⁰ ATP/s) × 60 s/min = 4.8 × 10¹² ATP/min.' },
            { text: 'Convert to moles: (4.8 × 10¹² ATP/min) / (6.022 × 10²³ ATP/mol) ≈ 7.97 × 10⁻¹² mol ATP/min.', faded: true, blankAnswer: '~8.0 × 10⁻¹² mol ATP/min' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_02_008', title: 'A chloroplast is a.',
          scaffold: { problem: 'A researcher isolates intact chloroplasts from spinach and suspends them in a buffered medium (pH 7.0) containing ADP, Pi, and a.',
            steps: [
            { text: 'Identify the system — isolated chloroplasts, thylakoid lumen initially at pH 7.0 (same as medium), illumination drives.' },
            { text: 'Interpret fluorescence decrease — dye quenches when medium becomes acidic, meaning protons are *leaving* the medium.' },
            { text: 'Correct topology — Illumination drives PSII → plastoquinone → cyt b6f → pumps 2H⁺/e⁻ from stroma into lumen.' },
            { text: 'Calculate protons pumped from pH change. Lumen volume = 2 μL/mg Chl = 2 × 10⁻⁶ L/mg.' },
            { text: 'ATP synthesized = 120 nmol/mg Chl = 120,000 pmol/mg Chl.' },
            { text: 'H⁺/ATP ratio = 19.8 pmol H⁺ / 120,000 pmol ATP = 1.65 × 10⁻⁴. This is impossibly low.', faded: true, blankAnswer: 'Illumination drives electron transport → plastoquinone.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_02_003', title: 'The cell wall is a rigid, dynamic.',
          scaffold: { problem: 'A microbiologist isolates a soil bacterium that stains Gram-positive. The culture is grown with radioactive N-acetylglucosamine (NAG).',
            steps: [
            { text: 'Recognize that peptidoglycan consists of alternating NAG and NAM residues linked by β(1→4) bonds; a 1:1 ratio of.' },
            { text: 'The presence of labeled alanine and lysine indicates these amino acids are incorporated into the peptide stems attached.' },
            { text: 'Recall that bacterial peptidoglycan cross-links contain D-amino acids (D-alanine, D-glutamate, meso-diaminopimelate or.' },
            { text: 'Conclude that the labeling pattern matches the known structure: glycan chains of (NAG-NAM)n with peptide stems on NAM,.' },
            { text: 'Verify that this explains why lysozyme (cleaves NAG-NAM) and penicillin (blocks transpeptidase forming D-Ala-D-Ala.', faded: true, blankAnswer: 'The 1:1 NAG:NAM ratio confirms the disaccharide repeating.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_02_006', title: 'Lysosomes are single-membrane-bound.',
          scaffold: { problem: 'A researcher treats cultured fibroblasts with a drug that inhibits V‑type H⁺‑ATPase.',
            steps: [
            { text: 'Identify the normal pathway – EGF binds receptor → endocytosis → early endosome → late endosome → lysosome →.' },
            { text: 'Recognize that V‑ATPase inhibition prevents acidification of endosomal/lysosomal compartments.' },
            { text: 'Without low pH, acid hydrolases remain inactive (they require pH 4.5–5.0 for conformational activation).' },
            { text: 'EGF‑receptor complex will not be degraded; it will accumulate in late endosomes/lysosomes or recycle back to the.' },
            { text: 'Fluorescent EGF will show punctate perinuclear staining (late endosomes) but no loss of fluorescence over time (no.' },
            { text: 'Lysosomal enzymes (if immunostained) will still be present in the same compartments but enzymatically inactive.', faded: true, blankAnswer: 'EGF accumulates in late endosomes/lysosomes without.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_02_012', title: 'Vacuoles are membrane-bound organelles.',
          scaffold: { problem: 'A mature maize mesophyll cell is spherical with diameter 100 µm. The central vacuole occupies 90% of the cell volume.',
            steps: [
            { text: 'Calculate cell volume: V_cell = (4/3)πr³ = (4/3)π(50 µm)³ = 523,600 µm³.' },
            { text: 'Calculate vacuole volume: 90% of V_cell = 0.9 × 523,600 = 471,240 µm³.' },
            { text: 'Convert KCl concentration to mol/L: 0.5 M = 0.5 mol/L.' },
            { text: 'Compute osmotic pressure: π = iCRT = 2 × 0.5 mol/L × 0.0821 L·atm·mol⁻¹·K⁻¹ × 298 K = 24.46 atm.' },
            { text: 'Convert to MPa: 24.46 atm × 0.1013 MPa/atm ≈ 2.48 MPa.' },
            { text: 'Interpret: This osmotic pressure draws water into the vacuole, pushing the plasma membrane against the rigid cell wall,.', faded: true, blankAnswer: 'Vacuole volume = 471,240 µm³; Osmotic pressure ≈ 2.48 MPa.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Mitochondria: Structure and ATP Synthesis', spots: [
            { id: 's1', label: 'Mitochondria are double membrane-bound organelles', prompt: 'Which idea is this? — Mitochondria are double membrane-bound organelles in eukaryotic cells where the inner.', answer: 'Mitochondria are double membrane-bound organelles', options: ['Mitochondria are double membrane-bound organelles', 'A chloroplast is a double-membrane-bound', 'The cell wall is a', 'Lysosomes are single-membrane-bound spherical organelles'] },
            { id: 's2', label: 'A chloroplast is a double-membrane-bound', prompt: 'Which idea is this? — A chloroplast is a double-membrane-bound plastid containing chlorophyll pigments.', answer: 'A chloroplast is a double-membrane-bound', options: ['A chloroplast is a double-membrane-bound', 'Mitochondria are double membrane-bound organelles', 'The cell wall is a', 'Lysosomes are single-membrane-bound spherical organelles'] },
            { id: 's3', label: 'The cell wall is a', prompt: 'Which idea is this? — The cell wall is a rigid, dynamic extracellular matrix surrounding the plasma membrane of.', answer: 'The cell wall is a', options: ['The cell wall is a', 'Mitochondria are double membrane-bound organelles', 'A chloroplast is a double-membrane-bound', 'Lysosomes are single-membrane-bound spherical organelles'] },
            { id: 's4', label: 'Lysosomes are single-membrane-bound spherical organelles', prompt: 'Which idea is this? — Lysosomes are single-membrane-bound spherical organelles (0.2–0.5 µm in diameter) formed.', answer: 'Lysosomes are single-membrane-bound spherical organelles', options: ['Lysosomes are single-membrane-bound spherical organelles', 'Mitochondria are double membrane-bound organelles', 'A chloroplast is a double-membrane-bound', 'The cell wall is a'] },
            { id: 's5', label: 'Vacuoles are membrane-bound organelles tonoplast', prompt: 'Which idea is this? — Vacuoles are membrane-bound organelles (tonoplast) in plant, fungal, and some animal.', answer: 'Vacuoles are membrane-bound organelles tonoplast', options: ['Vacuoles are membrane-bound organelles tonoplast', 'Mitochondria are double membrane-bound organelles', 'A chloroplast is a double-membrane-bound', 'The cell wall is a'] }
          ] } }
    ],
    explore: { component: C11_BiotechEnzymesBioenergeticsCBSESim, prompt: 'Explore the interactive — Mitochondria: Structure and ATP Synthesis' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_007', difficulty: 'standard',
          question: 'Mitochondria are double membrane-bound organelles in eukaryotic cells where the.',
          hint: 'Revisit Class 10 node c10_bio_cbse_01_007 (Respiration: Aerobic vs Anaerobic and Energy.',
          misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.',
          parts: [
                { id: 'a', prompt: 'State the two mitochondrial compartments where the TCA cycle enzymes and the electron transport chain complexes are respectively located, and name the membrane.', answer: 'TCA cycle enzymes are in the mitochondrial matrix',
                  options: ['Correct answer: TCA cycle enzymes are in the mitochondrial matrix', 'mitochondria = ATP', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' },
                { id: 'b', prompt: 'In a transmission electron micrograph, you observe mitochondria with densely packed cristae in cardiac muscle cells and sparse cristae in adipocytes.', answer: 'Correct prediction: Cardiac muscle mitochondria have higher VO2 max',
                  options: ['Correct prediction: Cardiac muscle mitochondria have higher VO2 max', 'more mitochondria', 'cristae density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' }
          ],
            remediations: { 'atp-is-synthesised-in-the': { steps: ['Draw a side-by-side diagram of a bacterium and a mitochondrion, labeling DNA, ribosomes, and membrane respiratory.', 'Use a physical analogy — a hydroelectric dam: matrix = reservoir (high potential), intermembrane space = downstream.', 'Give a micrograph tracing exercise: outline cristae, calculate approximate surface area increase vs smooth membrane.', 'Assign a 3-minute write: "Explain why COX1 (mtDNA-encoded) cannot be imported from the cytosol like citrate synthase."'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.',
          parts: [
                { id: 'a', prompt: 'Critique this textbook statement: "Mitochondria are the powerhouse of the cell because they produce ATP." Evaluate its adequacy for a Class 11 biotechnology.', answer: 'Critique: The statement is functionally true but mechanistically empty',
                  options: ['Critique: The statement is functionally true but mechanistically empty', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' },
                { id: 'b', prompt: 'Design a thought experiment: If you could engineer a mitochondrion without cristae (smooth inner membrane) but with the same total inner membrane surface area.', answer: 'Good answer: Efficiency would decrease',
                  options: ['Good answer: Efficiency would decrease', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' }
          ],
            remediations: { 'atp-is-synthesised-in-the': { steps: ['Draw a side-by-side diagram of a bacterium and a mitochondrion, labeling DNA, ribosomes, and membrane respiratory.', 'Use a physical analogy — a hydroelectric dam: matrix = reservoir (high potential), intermembrane space = downstream.', 'Give a micrograph tracing exercise: outline cristae, calculate approximate surface area increase vs smooth membrane.', 'Assign a 3-minute write: "Explain why COX1 (mtDNA-encoded) cannot be imported from the cytosol like citrate synthase."'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_008', difficulty: 'standard',
          question: 'A chloroplast is a double-membrane-bound plastid containing chlorophyll.',
          hint: 'Revisit c11_biotech_cbse_02_007 (Mitochondria) — specifically the cristae topology,.',
          misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally.',
          parts: [
                { id: 'a', prompt: 'Compare the proton gradient topology in chloroplasts versus mitochondria. Specifically: (a) Which compartment becomes acidic in each organelle?', answer: 'Which compartment becomes acidic in each organelle?',
                  options: ['Which compartment becomes acidic in each organelle?', 'chlorophyll is a single green pigment', 'all thylakoids in a chloroplast are functionally identical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally identical." This leads.' }
          ],
            remediations: { 'chlorophyll-is-a-single-green': { steps: ['Have the student perform paper chromatography of spinach extract — they will see 4-5 distinct bands (chlorophyll a.', 'Use a fluorescence microscope with 440 nm excitation to show grana (PSII-rich) emit red fluorescence at 685 nm, while.', 'Demonstrate state transitions: expose chloroplasts to high light (PSII-favoring) → LHCII phosphorylates → moves to.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The presence of 70S ribosomes and circular DNA in chloroplasts proves they originated from cyanobacteria via endosymbiosis, but the same.', answer: 'Refute',
                  options: ['Refute', 'chlorophyll is a single green pigment', 'all thylakoids in a chloroplast are functionally identical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally identical." This leads.' },
                { id: 'b', prompt: 'Design a hypothetical experiment using isolated chloroplasts to demonstrate that the thylakoid lumen becomes acidic during illumination.', answer: 'the measurable parameter, (',
                  options: ['the measurable parameter, (', 'chlorophyll is a single green pigment', 'all thylakoids in a chloroplast are functionally identical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally identical." This leads.' },
                { id: 'c', prompt: 'Compare the proton gradient topology in chloroplasts versus mitochondria. Specifically: (a) Which compartment becomes acidic in each organelle?', answer: 'Which compartment becomes acidic in each organelle?',
                  options: ['Which compartment becomes acidic in each organelle?', 'chlorophyll is a single green pigment', 'all thylakoids in a chloroplast are functionally identical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally identical." This leads.' }
          ],
            remediations: { 'chlorophyll-is-a-single-green': { steps: ['Have the student perform paper chromatography of spinach extract — they will see 4-5 distinct bands (chlorophyll a.', 'Use a fluorescence microscope with 440 nm excitation to show grana (PSII-rich) emit red fluorescence at 685 nm, while.', 'Demonstrate state transitions: expose chloroplasts to high light (PSII-favoring) → LHCII phosphorylates → moves to.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_003', difficulty: 'standard',
          question: 'The cell wall is a rigid, dynamic extracellular matrix surrounding the plasma.',
          hint: 'If stuck, revisit Class 9 Biology node c9_bio_ch1_4 (Cell Wall: Structure and Function in.',
          misconception: 'Students often treat the cell wall as a static, uniform "brick wall" and assume all plant cells have identical walls.',
          parts: [
                { id: 'a', prompt: 'State the primary structural polysaccharide in the cell wall of (a) higher plants, (b) fungi, and (c) Gram-positive bacteria.', answer: 'higher plants, (',
                  options: ['higher plants, (', 'chitin for plants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the cell wall as a static, uniform "brick wall" and assume all plant cells have identical walls.' }
          ],
            remediations: { 'students-often-treat-the-cell': { steps: ['If the student holds this misconception: (1) Show a time-lapse of pollen tube tip growth where wall composition shifts.', '(2) Have them stain onion epidermis sequentially with Calcofluor White (cellulose) and Ruthenium Red (pectin) to.', '(3) Ask: "If the wall were static, how could a pollen tube elongate at 1 µm/sec?" (4) Guide them to construct a concept.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_006', difficulty: 'standard',
          question: 'Lysosomes are single-membrane-bound spherical organelles (0.2–0.5 µm in.',
          hint: 'Revisit the Golgi apparatus node (c11_biotech_cbse_02_005) and focus on the "cis‑face to.',
          misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Lysosomes are formed directly by budding from the rough endoplasmic reticulum." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'suicide bags', 'lysosomes are "suicide bags" that randomly rupture and kill the cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.' },
                { id: 'b', prompt: 'Compare and contrast heterophagy and autophagy in terms of (a) origin of material digested, (b) membrane dynamics, and (c) physiological trigger.', answer: 'origin of material digested, (',
                  options: ['origin of material digested, (', 'suicide bags', 'lysosomes are "suicide bags" that randomly rupture and kill the cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.' }
          ],
            remediations: { 'lysosomes-are-suicide-bags-that': { steps: ['Show an electron micrograph of a lysosome with intact membrane alongside a cytosol‑filled area; ask "What protects the.', 'Demonstrate with a simple graph: enzyme activity vs.', 'pH – peak at 4.5, near zero at 7.2.', 'Have the student list three features of the lysosomal membrane (glycocalyx, V‑ATPase, specific transporters) and.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast heterophagy and autophagy in terms of (a) origin of material digested, (b) membrane dynamics, and (c) physiological trigger.', answer: 'origin of material digested, (',
                  options: ['origin of material digested, (', 'suicide bags', 'lysosomes are "suicide bags" that randomly rupture and kill the cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.' }
          ],
            remediations: { 'lysosomes-are-suicide-bags-that': { steps: ['Show an electron micrograph of a lysosome with intact membrane alongside a cytosol‑filled area; ask "What protects the.', 'Demonstrate with a simple graph: enzyme activity vs.', 'pH – peak at 4.5, near zero at 7.2.', 'Have the student list three features of the lysosomal membrane (glycocalyx, V‑ATPase, specific transporters) and.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_012', difficulty: 'standard',
          question: 'Vacuoles are membrane-bound organelles (tonoplast) in plant, fungal, and some.',
          hint: 'Revisit ER-derived vesicle formation (c11_biotech_cbse_02_004) and the endomembrane.',
          misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer:.',
          parts: [
                { id: 'a', prompt: 'Name the membrane bounding the central vacuole in a mature plant cell and state its primary function in maintaining turgor pressure.', answer: 'The membrane is the tonoplast',
                  options: ['The membrane is the tonoplast', 'plasma membrane', 'cell wall'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' },
                { id: 'b', prompt: 'A student claims: "Peroxisomes are like mitochondria because both produce ATP from oxidative reactions." Explain why this is incorrect using two specific.', answer: 'Peroxisomes do not produce ATP',
                  options: ['Peroxisomes do not produce ATP', 'oxidative reactions', 'ATP synthesis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' },
                { id: 'c', prompt: 'In a germinating oil-rich seed (e.g., castor), glyoxysomes convert stored triglycerides to glucose.', answer: 'Glyoxysomes: fatty acids → acetyl-CoA → glyoxylate cycle → succinate',
                  options: ['Glyoxysomes: fatty acids → acetyl-CoA → glyoxylate cycle → succinate', 'vesicles with enzymes', 'Peroxisomes digest waste like lysosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' }
          ],
            remediations: { 'peroxisomes-and-lysosomes-are-the': { steps: ['Draw a two-column table: left column "Peroxisome", right column "Lysosome".', 'Fill rows: Enzyme type (oxidases/catalase vs.', 'acid hydrolases), pH optimum (neutral vs.', 'acidic ~4.5), Function (metabolism/detoxification vs.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer:.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Peroxisomes are unnecessary in plant leaves because chloroplasts perform photorespiration." Defend or refute with specific metabolic.', answer: 'Refute',
                  options: ['Refute', 'vesicles with enzymes', 'Peroxisomes digest waste like lysosomes', 'peroxisomes and lysosomes are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' },
                { id: 'b', prompt: 'Design a fluorescence microscopy experiment to distinguish protein storage vacuoles (PSV) from lytic vacuoles in the same plant cell.', answer: 'Use GFP-tagged storage protein (e.g., phaseolin) → accumulates in PSV',
                  options: ['Use GFP-tagged storage protein (e.g., phaseolin) → accumulates in PSV', 'vesicles with enzymes', 'Peroxisomes digest waste like lysosomes', 'peroxisomes and lysosomes are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' }
          ],
            remediations: { 'peroxisomes-and-lysosomes-are-the': { steps: ['Draw a two-column table: left column "Peroxisome", right column "Lysosome".', 'Fill rows: Enzyme type (oxidases/catalase vs.', 'acid hydrolases), pH optimum (neutral vs.', 'acidic ~4.5), Function (metabolism/detoxification vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
