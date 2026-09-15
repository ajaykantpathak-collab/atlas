import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch04_p1: SimDef = {
    id: 'v3_c11_biotech_ch04_p1',
    title: 'Enzymes and Proteins · Part 1/2',
    subtitle: 'Probe enzyme kinetics — activation energy, specificity, and the conditions that break them.',
    classLevel: 11, subject: 'biotechnology', topic: 'Enzymes and Proteins · Part 1/2',
    chapters: ['c11_biotech_ch04'],
    nodeIds: ['c11_biotech_cbse_04_001', 'c11_biotech_cbse_04_002', 'c11_biotech_cbse_04_003', 'c11_biotech_cbse_04_004', 'c11_biotech_cbse_04_005', 'c11_biotech_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an industrial biochemist optimising an enzyme for a detergent company', intro: 'A vat of enzyme, a spec sheet of conditions, and a product deadline — find the sweet spot.', goal: 'Explain enzyme action (lock-and-key/induced fit), factors affecting rate, and protein structure levels.' },
    discovery: {
        question: 'Laundry detergent digests curry stains at 40°C but the enzymes inside your own cells would die at that heat. Yet both are \'enzymes\'. What reconciles this?',
        options: ['Enzymes are tuned to their source organism — the detergent uses enzymes from heat-loving microbes', 'Detergent enzymes aren\'t real enzymes, just chemicals', 'All enzymes work identically at any temperature', 'Curry stains weaken the fabric so less heat is needed'],
        answer: 'Enzymes are tuned to their source organism — the detergent uses enzymes from heat-loving microbes',
        hook: 'An enzyme is a lock shaped for one key and one climate — source organism decides its working range.',
    },
    teaching: [
        { title: 'Enzymes: Nature and Classification', text: 'Enzymes are biological macromolecules, predominantly globular proteins (with the exception of catalytic RNA molecules called ribozymes), that function as highly specific biocatalysts to accelerate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_04_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Run virtual assays to map how temperature, pH and substrate concentration push an enzyme\'s rate up — and shut it down.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_001', title: 'Enzymes: Nature and Classification',
          caseStudy: { intro: 'Imagine you are a forensic biotechnologist analyzing a crime scene sample.',
            decisions: [{ prompt: 'State the precise IUB class number and name for an enzyme that catalyzes the following reaction: ATP + glucose → ADP + glucose-6-phosphate.', options: [
                { text: 'Class 2: Transferases', outcome: 'Class 2: Transferases. The enzyme transfers a phosphoryl group (PO₃²⁻) from ATP (donor) to glucose.' },
                { text: 'kinase', outcome: 'Not quite — Students frequently believe that "enzyme classification is based on the substrate name" (e.g.', reveals: 'students-frequently-believe-that-enzyme' },
                { text: 'Class 1 Oxidoreductase', outcome: 'Not quite — Students frequently believe that "enzyme classification is based on the substrate name" (e.g.', reveals: 'students-frequently-believe-that-enzyme' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_002', title: 'Active Site and Enzyme-Substrate Complex: Lock and Key Model',
          caseStudy: { intro: 'Imagine you have a bunch of keys on a keyring but only one opens your front door. Why does that one key work while others don\'t, even if they look similar?',
            decisions: [{ prompt: 'Define the term \'active site\' of an enzyme and state its approximate size relative to the whole enzyme molecule.', options: [
                { text: 'The active site is a three-dimensional pocket or cleft formed by specific amino acid', outcome: 'The active site is a three-dimensional pocket or cleft formed by specific amino acid residues.' },
                { text: 'the whole enzyme surface', outcome: 'Not quite — Students believe the Lock and Key Model implies the enzyme-substrate complex is static and.', reveals: 'the-lock-and-key-model' },
                { text: 'a flat binding surface', outcome: 'Not quite — Students believe the Lock and Key Model implies the enzyme-substrate complex is static and.', reveals: 'the-lock-and-key-model' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_003', title: 'Induced Fit Model of Enzyme Action',
          caseStudy: { intro: 'Imagine you are trying to put on a tight rubber glove — your hand (substrate) doesn\'t just slide into a pre-shaped cavity; the glove (enzyme) stretches and.',
            decisions: [{ prompt: 'State the fundamental difference between the lock-and-key model and the induced fit model regarding the conformation of the enzyme\'s active.', options: [
                { text: 'Correct answer: In the lock-and-key model, the active site is pre-shaped and rigid,', outcome: 'Correct answer: In the lock-and-key model, the active site is pre-shaped and rigid, complementary.' },
                { text: 'both models say the active site changes shape', outcome: 'Not quite — Students often think "induced fit" means the enzyme is like a floppy bag that wobbles randomly.', reveals: 'induced-fit-means-the-enzyme' },
                { text: 'induced fit', outcome: 'Not quite — Students often think "induced fit" means the enzyme is like a floppy bag that wobbles randomly.', reveals: 'induced-fit-means-the-enzyme' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_04_004', title: 'Enzyme Kinetics: Michaelis-Menten Equation',
          scaffold: { problem: 'In a lab assay, 0.5 mL of 2 μM enzyme solution is mixed with 2.5 mL of substrate solution.',
            steps: [
            { text: 'Identify knowns: v₀ = 40 μM min⁻¹, Vₘₐₓ = 100 μM min⁻¹, [S] = 8 mM = 8000 μM.' },
            { text: 'Write Michaelis-Menten equation: v₀ = (Vₘₐₓ[S])/(Kₘ + [S]).' },
            { text: 'Rearrange to solve for Kₘ: Kₘ = (Vₘₐₓ[S]/v₀) - [S].' },
            { text: 'Substitute values: Kₘ = (100 × 8000 / 40) - 8000 = (800000/40) - 8000 = 20000 - 8000 = 12000 μM = 12 mM.' },
            { text: 'Verify: At [S] = 8 mM, [S]/Kₘ = 8/12 = 0.67, so v₀/Vₘₐₓ = 0.67/(1+0.67) = 0.4 → v₀ = 0.4 × 100 = 40 μM min⁻¹.', faded: true, blankAnswer: 'Kₘ = 12 mM' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_005', title: 'Factors Affecting Enzyme Activity: Temperature and pH',
          caseStudy: { intro: 'Imagine you are a biotechnologist in a dairy plant in Gujarat trying to maximize the yield of lactose-free milk using the enzyme lactase.',
            decisions: [{ prompt: 'Define the term "optimum temperature" for an enzyme and state the typical optimum temperature range for most human enzymes.', options: [
                { text: 'Optimum temperature is the specific temperature at', outcome: 'Optimum temperature is the specific temperature at which an enzyme exhibits its maximum catalytic.' },
                { text: 'optimum temperature is the highest temperature an enzyme can withstand', outcome: 'Not quite — Students often believe that the descending limb of the temperature-activity curve is due to the.', reveals: 'the-descending-limb-of-the' },
                { text: 'human enzymes work best at 100°C', outcome: 'Not quite — Students often believe that the descending limb of the temperature-activity curve is due to the.', reveals: 'the-descending-limb-of-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_04_006', title: 'Factors Affecting Enzyme Activity: Substrate Concentration',
          scaffold: { problem: 'In a lab assay, the enzyme urease catalyzes urea hydrolysis. At a fixed enzyme concentration, the following initial rates are observed:.',
            steps: [
            { text: 'Write the Michaelis‑Menten equation for each data point: v₀ = (Vmax × [S]) / (Km + [S]).' },
            { text: 'Substitute the two data pairs to get two equations: 25 = (Vmax × 5) / (Km + 5) and 40 = (Vmax × 20) / (Km + 20).' },
            { text: 'Rearrange each equation to express Vmax: Vmax = 25(Km + 5)/5 = 5(Km + 5); Vmax = 40(Km + 20)/20 = 2(Km + 20).' },
            { text: 'Equate the two expressions for Vmax: 5(Km + 5) = 2(Km + 20) → 5Km + 25 = 2Km + 40 → 3Km = 15 → Km = 5 mM.' },
            { text: 'Substitute Km back to find Vmax: Vmax = 5(5 + 5) = 50 µmol·min⁻¹.' },
            { text: 'Verify with the second data point: v₀ = (50 × 20) / (5 + 20) = 1000/25 = 40 µmol·min⁻¹ (matches).', faded: true, blankAnswer: 'Vmax = 50 µmol·min⁻¹, Km = 5 mM.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Enzymes and Proteins · Part 1/2', spots: [
            { id: 's1', label: 'Enzymes Nature and Classification', prompt: 'Which idea is this? — Enzymes are biological macromolecules, predominantly globular proteins (with the.', answer: 'Enzymes Nature and Classification', options: ['Enzymes Nature and Classification', 'Active Site and Enzyme-Substrate Complex Lock and Key Model', 'Induced Fit Model of Enzyme Action', 'Enzyme Kinetics Michaelis-Menten Equation'] },
            { id: 's2', label: 'Active Site and Enzyme-Substrate Complex Lock and Key Model', prompt: 'Which idea is this? — The active site is a three-dimensional pocket or cleft on the enzyme surface formed.', answer: 'Active Site and Enzyme-Substrate Complex Lock and Key Model', options: ['Active Site and Enzyme-Substrate Complex Lock and Key Model', 'Enzymes Nature and Classification', 'Induced Fit Model of Enzyme Action', 'Enzyme Kinetics Michaelis-Menten Equation'] },
            { id: 's3', label: 'Induced Fit Model of Enzyme Action', prompt: 'Which idea is this? — The induced fit model proposes that the enzyme\'s active site is not a rigid pre-formed.', answer: 'Induced Fit Model of Enzyme Action', options: ['Induced Fit Model of Enzyme Action', 'Enzymes Nature and Classification', 'Active Site and Enzyme-Substrate Complex Lock and Key Model', 'Enzyme Kinetics Michaelis-Menten Equation'] },
            { id: 's4', label: 'Enzyme Kinetics Michaelis-Menten Equation', prompt: 'Which idea is this? — The Michaelis-Menten equation describes the initial velocity (v₀) of a single-substrate.', answer: 'Enzyme Kinetics Michaelis-Menten Equation', options: ['Enzyme Kinetics Michaelis-Menten Equation', 'Enzymes Nature and Classification', 'Active Site and Enzyme-Substrate Complex Lock and Key Model', 'Induced Fit Model of Enzyme Action'] },
            { id: 's5', label: 'Factors Affecting Enzyme Activity Temperature and pH', prompt: 'Which idea is this? — The effect of temperature on enzyme activity follows a bell-shaped curve where reaction.', answer: 'Factors Affecting Enzyme Activity Temperature and pH', options: ['Factors Affecting Enzyme Activity Temperature and pH', 'Enzymes Nature and Classification', 'Active Site and Enzyme-Substrate Complex Lock and Key Model', 'Induced Fit Model of Enzyme Action'] },
            { id: 's6', label: 'Factors Affecting Enzyme Activity Substrate Concentration', prompt: 'Which idea is this? — The effect of substrate concentration on enzyme activity describes how the initial.', answer: 'Factors Affecting Enzyme Activity Substrate Concentration', options: ['Factors Affecting Enzyme Activity Substrate Concentration', 'Enzymes Nature and Classification', 'Active Site and Enzyme-Substrate Complex Lock and Key Model', 'Induced Fit Model of Enzyme Action'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a diagnostics company internship, your mentor asks you to file three newly characterised enzymes into IUB classes. One is named \'citrate synthase\' (joins acetyl-CoA to oxaloacetate by transferring the acetyl group), another \'ATP citrate lyase\' (a transferase despite its name), and a third needs EDTA-chelation testing because it dies without its Mg²⁺ cofactor. Your batchmate says: \'Just file by the name — synthase is a ligase, lyase is a lyase.\'',
            decisions: [{ prompt: 'What\'s the correct way to classify them?', options: [
                { text: 'Classify by reaction chemistry, not the trivial name: citrate synthase is a transferase (acetyl group transfer), and any \'lyase\' that moves groups is a transferase too. Separately, test cofactor dependence — without Mg²⁺ the apoenzyme is inactive; only apoenzyme + cofactor = catalytically active holoenzyme.', outcome: 'IUB classes are defined by the bond/group changes in the reaction; names routinely mislead (citrate synthase is EC 2.x, a transferase).' },
                { text: 'File by the name — the nomenclature exists precisely so the name tells you the class.', outcome: 'Trivial names encode history, not mechanism; \'synthase\' and \'lyase\' in names have trapped students into wrong classes — only the balanced reaction reveals the truth.', reveals: 'name-determines-ec-class' },
                { text: 'Skip the cofactor test — an enzyme is a protein catalyst, so the protein part alone defines its activity.', outcome: 'Many enzymes need metal ions or coenzymes; the apoenzyme without its cofactor is catalytically dead, so holoenzyme status is part of characterising it.', reveals: 'cofactors-are-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Enzymes are biology\'s catalysts: specific, fragile, and the reason metabolism runs at body temperature instead of furnace heat.',
            decisions: [{ prompt: 'What comes next? Enzymes and Proteins · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Enzymes and Proteins · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_001', difficulty: 'standard',
          question: 'Enzymes are biological macromolecules, predominantly globular proteins (with.',
          hint: 'If unable to explain how a change in primary structure (mutation) can alter enzyme.',
          misconception: 'Students frequently believe that "enzyme classification is based on the substrate name" (e.g., "kinase" = transferase.',
          parts: [
                { id: 'a', prompt: 'State the precise IUB class number and name for an enzyme that catalyzes the following reaction: ATP + glucose → ADP + glucose-6-phosphate.', answer: 'Class 2: Transferases',
                  options: ['Class 2: Transferases', 'kinase', 'Class 1 Oxidoreductase'],
                  hint: 'If unable to explain how a change in primary structure (mutation) can alter enzyme specificity.',
                  misconception: 'Students frequently believe that "enzyme classification is based on the substrate name" (e.g., "kinase" = transferase, "dehydrogenase".' }
          ],
            remediations: { 'students-frequently-believe-that-enzyme': { steps: ['Have the student write the balanced chemical equation for 5 enzymes with misleading trivial names (e.g., pyruvate.', 'For each, identify: (a) the bond broken, (b) the bond formed, (c) the group transferred (if any), (d) whether ATP/GTP.', 'Map each to the IUB class definition table (Table 4.3) using ONLY the reaction chemistry, ignoring the name.', 'Create a 2-column flashcard set: Column A = trivial name, Column B = EC class + one-sentence reaction chemistry.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_002', difficulty: 'standard',
          question: 'The active site is a three-dimensional pocket or cleft on the enzyme surface.',
          hint: 'Review Class 9 Chemistry Chapter 3 (Covalent and Ionic Bonding) and Class 8 Chemistry.',
          misconception: 'Students believe the Lock and Key Model implies the enzyme-substrate complex is static and unchanging until product.',
          parts: [
                { id: 'a', prompt: 'Lysozyme hydrolyzes the β(1→4) glycosidic bond between N-acetylglucosamine (NAG) and N-acetylmuramic acid (NAM) in bacterial peptidoglycan.', answer: 'An ES complex will likely form but with lower binding affinity',
                  options: ['An ES complex will likely form but with lower binding affinity', 'no binding occurs'],
                  hint: 'Review Class 9 Chemistry Chapter 3 (Covalent and Ionic Bonding) and Class 8 Chemistry Chapter 2.',
                  misconception: 'Students believe the Lock and Key Model implies the enzyme-substrate complex is static and unchanging until product release.' }
          ],
            remediations: { 'the-lock-and-key-model': { steps: ['If a student holds this misconception: (1) Show them the lysozyme-NAG₃ crystal structure (PDB: 1LZ1) where the D-ring.', '(3) Have them draw the chair vs.', 'half-chair conformation of a pyranose ring and identify which bonds are strained.', '(4) Connect to the next node: "This limitation—ignoring substrate distortion—is exactly why Koshland proposed Induced.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_003', difficulty: 'standard',
          question: 'The induced fit model proposes that the enzyme\'s active site is not a rigid.',
          hint: 'Revisit the lock-and-key model (c11_biotech_cbse_04_002) and the role of non-covalent.',
          misconception: 'Students often think "induced fit" means the enzyme is like a floppy bag that wobbles randomly until the substrate.',
          parts: [
                { id: 'a', prompt: 'Compare the induced fit model and the lock-and-key model in their ability to explain: (a) why some enzymes show broad substrate specificity (group.', answer: 'Correct answer: (a) Induced fit explains group specificity',
                  options: ['Correct answer: (a) Induced fit explains group specificity', 'induced fit'],
                  hint: 'Revisit the lock-and-key model (c11_biotech_cbse_04_002) and the role of non-covalent interactions.',
                  misconception: 'Students often think "induced fit" means the enzyme is like a floppy bag that wobbles randomly until the substrate falls in.' }
          ],
            remediations: { 'induced-fit-means-the-enzyme': { steps: ['If a student holds this misconception: (1) Show the energy landscape diagram: free enzyme has a low-population.', '(2) Use the "hand in glove" analogy — the glove has a defined shape but is *flexible*, not formless.', '(3) Give a concrete counterexample: lysozyme\'s active site cleft is pre-formed but the catalytic residues (Glu35.', '(4) Ask: "If the enzyme were truly unstructured, why would denaturation destroy activity?" This forces reconciliation.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "induced fit" means the enzyme is like a floppy bag that wobbles randomly until the substrate.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The induced fit model proves that enzymes are not specific because they change shape for different substrates." Provide a biochemical.', answer: 'Correct answer: The statement confuses *flexibility* with *lack of specificity*',
                  options: ['Correct answer: The statement confuses *flexibility* with *lack of specificity*', 'induced fit'],
                  hint: 'Revisit the lock-and-key model (c11_biotech_cbse_04_002) and the role of non-covalent interactions.',
                  misconception: 'Students often think "induced fit" means the enzyme is like a floppy bag that wobbles randomly until the substrate falls in.' }
          ],
            remediations: { 'induced-fit-means-the-enzyme': { steps: ['If a student holds this misconception: (1) Show the energy landscape diagram: free enzyme has a low-population.', '(2) Use the "hand in glove" analogy — the glove has a defined shape but is *flexible*, not formless.', '(3) Give a concrete counterexample: lysozyme\'s active site cleft is pre-formed but the catalytic residues (Glu35.', '(4) Ask: "If the enzyme were truly unstructured, why would denaturation destroy activity?" This forces reconciliation.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_004', difficulty: 'standard',
          question: 'The Michaelis-Menten equation describes the initial velocity (v₀) of.',
          hint: 'Revisit c11_biotech_cbse_04_003 (Induced Fit Model) to visualize ES complex formation and.',
          misconception: 'Students often treat Kₘ as the dissociation constant K_d of the ES complex (Kₘ = K_d only when k_cat << k₋₁).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Michaelis-Menten equation describes the initial velocity (v₀) of a single-substrate',
                  options: ['The Michaelis-Menten equation describes the initial velocity (v₀) of a single-substrate', 'Enzymes are biological macromolecules, predominantly globular proteins (with the', 'The active site is a three-dimensional pocket or cleft on the enzyme surface formed by', 'The induced fit model proposes that the enzyme\'s active site is not a rigid pre-formed'],
                  hint: 'Revisit c11_biotech_cbse_04_003 (Induced Fit Model) to visualize ES complex formation and.',
                  misconception: 'Students often treat Kₘ as the dissociation constant K_d of the ES complex (Kₘ = K_d only when k_cat << k₋₁).' }
          ],
            remediations: { 'students-often-treat-k-as': { steps: ['Re-derive the steady-state expression: d[ES]/dt = k₁[E][S] - (k₋₁ + k_cat)[ES] = 0 → [ES] = [E]_total[S]/(Kₘ + [S]).', 'Explicitly compare Kₘ and K_d = k₋₁/k₁; note they differ by k_cat/k₁.', 'Calculate k_cat/Kₘ for both enzymes in the misconception example to prove efficiency ranking.', 'Practice graphing v₀ vs [S] for both enzymes on the same axes to visualize that the "higher Kₘ" enzyme can have steeper.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_005', difficulty: 'standard',
          question: 'The effect of temperature on enzyme activity follows a bell-shaped curve where.',
          hint: 'If stuck, review **protein denaturation** in Class 11 Chemistry (Biomolecules chapter).',
          misconception: 'Students often believe that the descending limb of the temperature-activity curve is due to the reaction becoming *less.',
          parts: [
                { id: 'a', prompt: 'Define the term "optimum temperature" for an enzyme and state the typical optimum temperature range for most human enzymes.', answer: 'Optimum temperature is the specific temperature at',
                  options: ['Optimum temperature is the specific temperature at', 'optimum temperature is the highest temperature an enzyme can withstand', 'human enzymes work best at 100°C', 'running out of energy'],
                  hint: 'If stuck, review **protein denaturation** in Class 11 Chemistry (Biomolecules chapter) focusing.',
                  misconception: 'Students often believe that the descending limb of the temperature-activity curve is due to the reaction becoming *less exothermic* or the.' },
                { id: 'b', prompt: 'Explain why enzyme activity decreases sharply when the temperature rises above the optimum, even though higher temperature increases molecular motion and.', answer: 'Above the optimum temperature, the increased kinetic energy disrupts the weak',
                  options: ['Above the optimum temperature, the increased kinetic energy disrupts the weak', 'enzyme gets destroyed', 'running out of energy'],
                  hint: 'If stuck, review **protein denaturation** in Class 11 Chemistry (Biomolecules chapter) focusing.',
                  misconception: 'Students often believe that the descending limb of the temperature-activity curve is due to the reaction becoming *less exothermic* or the.' },
                { id: 'c', prompt: 'A student measures the activity of salivary amylase at pH 4, 7, and 9. The results show high activity at pH 7, low at pH 4, and moderate at pH 9.', answer: 'The curve peaks at pH 7 (optimum)',
                  options: ['The curve peaks at pH 7 (optimum)', 'running out of energy'],
                  hint: 'If stuck, review **protein denaturation** in Class 11 Chemistry (Biomolecules chapter) focusing.',
                  misconception: 'Students often believe that the descending limb of the temperature-activity curve is due to the reaction becoming *less exothermic* or the.' },
                { id: 'd', prompt: 'Compare the temperature-activity profiles of a typical human metabolic enzyme (e.g., hexokinase) and Taq DNA polymerase from *Thermus aquaticus*.', answer: 'Human hexokinase shows a sharp peak at ~37°C and is denatured above 45°C',
                  options: ['Human hexokinase shows a sharp peak at ~37°C and is denatured above 45°C', 'different amino acids', 'running out of energy'],
                  hint: 'If stuck, review **protein denaturation** in Class 11 Chemistry (Biomolecules chapter) focusing.',
                  misconception: 'Students often believe that the descending limb of the temperature-activity curve is due to the reaction becoming *less exothermic* or the.' }
          ],
            remediations: { 'the-descending-limb-of-the': { steps: ['Revisit the **Induced Fit Model (c11_biotech_cbse_04_003)** and explicitly list the weak bonds (H-bonds, hydrophobic.', 'Perform a **thought experiment**: "If you boil an egg white (protein), it turns opaque and solid.', 'Can you un-boil it by cooling?', 'Heat broke weak bonds and caused aggregation.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_006', difficulty: 'standard',
          question: 'The effect of substrate concentration on enzyme activity describes how the.',
          hint: 'If the hyperbola shape or the meaning of Km is unclear, revisit the derivation in node.',
          misconception: 'Students often believe that Km equals the substrate concentration required to reach Vmax, or that the reaction rate.',
          parts: [
                { id: 'a', prompt: 'State the shape of the graph obtained when initial velocity (v₀) is plotted against substrate concentration [S] for an enzyme following Michaelis‑Menten.', answer: 'The graph is a rectangular hyperbola',
                  options: ['The graph is a rectangular hyperbola', 'straight line', 'sigmoid curve'],
                  hint: 'If the hyperbola shape or the meaning of Km is unclear, revisit the derivation in node.',
                  misconception: 'Students often believe that Km equals the substrate concentration required to reach Vmax, or that the reaction rate increases linearly with.' }
          ],
            remediations: { 'km-equals-the-substrate-concentration': { steps: ['Re‑derive the Michaelis‑Menten equation from the steady‑state assumption (ES formation = ES breakdown) to see exactly.', 'Plot v₀ vs [S] by hand for Vmax = 100, Km = 10 using [S] = 1, 2, 5, 10, 20, 50, 100; mark the point where v₀ = 50 (half.', 'Practice converting between the hyperbolic plot and the Lineweaver‑Burk double‑reciprocal plot until the intercepts.', 'Explicitly contrast Km with Kd using a numerical example: if k₁ = 10⁶ M⁻¹s⁻¹, k₋₁ = 100 s⁻¹, kcat = 50 s⁻¹, then.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
