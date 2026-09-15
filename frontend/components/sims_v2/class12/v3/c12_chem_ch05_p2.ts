import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch05_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch05_p2: SimDef = {
    id: 'v3_c12_chem_ch05_p2',
    title: 'Coordination Compounds · Part 2/2',
    subtitle: 'Same formula, different colour — the secret life inside the square brackets',
    classLevel: 12, subject: 'chemistry', topic: 'Coordination Compounds · Part 2/2',
    chapters: ['c12_chem_ch05'],
    nodeIds: ['c12_chem_cbse_05_007', 'c12_chem_cbse_05_008', 'c12_chem_cbse_05_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coordination chemist', intro: 'A century ago, coloured cobalt salts made no sense. Werner\'s two-valence idea cracked them open — and invented modern inorganic chemistry.', goal: 'Apply Werner\'s theory — primary vs secondary valence — to write formulations, predict ionisation and classify isomerism in complexes.' },
    discovery: {
        question: 'Two compounds share the exact formula CoCl₃·4NH₃ — one is green, one is violet, and each throws down only 1 mole of AgCl with AgNO₃. How can identical recipes give different compounds?',
        options: ['Two chlorides sit inside the coordination sphere bound to cobalt — the pair differ only in geometry (cis vs trans), and only the one chloride outside can precipitate', 'One sample must be impure — same formula can\'t give different colours', 'The ammonia count differs inside each batch', 'AgNO₃ always precipitates every chloride in a compound'],
        answer: 'Two chlorides sit inside the coordination sphere bound to cobalt — the pair differ only in geometry (cis vs trans), and only the one chloride outside can precipitate',
        hook: 'Students read CoCl₃·4NH₃ as \'3 loose chlorides.\' Werner\'s insight: ligands split between an inner sphere (non-ionizable, fixed coordination number 6) and outer counter-ions. Precipitation data is the detective tool that reveals which atoms live inside the brackets.',
    },
    teaching: [
        { title: 'Crystal Field Splitting: Spectrochemical Series', text: 'The spectrochemical series is an experimentally determined ordering of ligands based on their crystal field splitting strength (Δo) in octahedral complexes, ranging from weak field ligands (small Δo.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_05_007', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Play Werner: use AgNO₃ precipitation and conductivity to write the true bracketed formula of cobalt-ammine chlorides, then name complexes by IUPAC rules and sort their isomers.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_007', title: 'Crystal Field Splitting: Spectrochemical Series',
          scaffold: { problem: 'The complex [Fe(CN)₆]⁴⁻ is diamagnetic while [Fe(H₂O)₆]²⁺ is paramagnetic with μ = 5.1 BM. Both contain Fe²⁺ (d⁶).',
            steps: [
            { text: 'Identify metal ion and d-electron count: Fe²⁺ is d⁶ (Fe atomic number 26, [Ar] 3d⁶ 4s² → Fe²⁺ loses 4s² electrons).' },
            { text: 'Determine ligand field strength from spectrochemical series: CN⁻ is strong field (large Δo), H₂O is weak field (small.' },
            { text: 'Compare Δo with pairing energy P for each ligand: For CN⁻, Δo = 33,500 cm⁻¹ > P = 17,600 cm⁻¹ → low-spin; for H₂O, Δo.' },
            { text: 'Write electron configurations: Low-spin d⁶ → t2g⁶ eg⁰ (all paired, diamagnetic); High-spin d⁶ → t2g⁴ eg² (4 unpaired.' },
            { text: 'Calculate CFSE for [Fe(CN)₆]⁴⁻ (low-spin): n_t2g = 6, n_eg = 0, m = 3 (three pairs in t2g beyond first) → CFSE.' },
            { text: 'Calculate CFSE for [Fe(H₂O)₆]²⁺ (high-spin): n_t2g = 4, n_eg = 2, m = 1 (one pair in t2g) → CFSE = [(-0.4×4).' },
            { text: 'Interpret: Low-spin complex has large negative CFSE (stabilised), high-spin has positive CFSE (destabilised relative.' },
            { text: 'Verify magnetic moments: Low-spin → 0 unpaired → μ = 0 BM (diamagnetic); High-spin → 4 unpaired → μ = √[4(4+2)] = √24.', faded: true, blankAnswer: '[Fe(CN)₆]⁴⁻: low-spin t2g⁶ eg⁰, diamagnetic, CFSE = -27,600.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_008', title: 'Colour and Magnetic Properties of Complexes',
          scaffold: { problem: 'A coordination compound [Cr(NH₃)₆]Cl₃ is violet in colour. The complex absorbs light at 575 nm (yellow).',
            steps: [
            { text: 'Identify the metal ion and its oxidation state. The complex is [Cr(NH₃)₆]³⁺ (3 Cl⁻ counter ions).' },
            { text: 'Calculate Δ₀ from absorption wavelength. λ = 575 nm = 575 × 10⁻⁹ m.' },
            { text: 'Determine electron configuration in octahedral field. NH₃ is a strong-field ligand (spectrochemical series).' },
            { text: 'Count unpaired electrons and compute μ. n = 3 unpaired electrons. μ = √[3(5)] = √15 ≈ 3.87 BM.' },
            { text: 'Explain colour. Absorbed λ = 575 nm (yellow). Complementary colour of yellow is violet.', faded: true, blankAnswer: '(a) Δ₀ = 208 kJ/mol (or 17391 cm⁻¹). (b) 3 unpaired.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_009', title: 'Importance and Applications of Coordination Compounds',
          caseStudy: { intro: 'Start with a real-world observation: When you get a blood test, the red color comes from hemoglobin — an iron coordination complex that carries O₂.',
            decisions: [{ prompt: 'A student writes: "EDTA is used in water hardness titration because it forms a stable complex with Ca²⁺ and Mg²⁺." Is this statement.', options: [
                { text: 'No, the statement is incomplete', outcome: 'No, the statement is incomplete. While EDTA forms stable complexes with both Ca²⁺ and Mg²⁺.' },
                { text: 'chelate effect', outcome: 'Not quite — Students think "chelate effect" only means "multidentate ligands form more stable complexes" and.', reveals: 'chelate-effect-only-means-multidentate' },
                { text: 'multidentate ligands form more stable complexes', outcome: 'Not quite — Students think "chelate effect" only means "multidentate ligands form more stable complexes" and.', reveals: 'chelate-effect-only-means-multidentate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab report says a cobalt compound of formula CoCl₃·5NH₃ precipitates only 2 mol of AgCl per mol with excess AgNO₃. The student writes its structure as [Co(NH₃)₅]Cl₃, keeping all three chlorides outside the brackets.',
            decisions: [{ prompt: 'Does that formulation fit the data?', options: [
                { text: 'No — 2 mol AgCl means only 2 Cl⁻ are ionisable counter-ions; the third Cl⁻ is bound inside the sphere, giving [CoCl(NH₃)₅]Cl₂ with coordination number 6.', outcome: 'Precipitation counts only the primary-valence (ionisable) chlorides; coordinated Cl⁻ stays locked to the metal and never reaches Ag⁺.' },
                { text: 'Yes — \'Cl₃\' in the formula means all three chlorides sit outside the brackets.', outcome: 'That would precipitate 3 mol AgCl and leave coordination number 5 — contradicting both the data and the fixed secondary valence of Co³⁺.', reveals: 'cl3-means-three-outside' },
                { text: 'The AgNO₃ test itself is suspect — complexes like K₄[Fe(CN)₆] release Fe²⁺ freely anyway.', outcome: 'K₄[Fe(CN)₆] fails the Fe²⁺ test precisely because the metal stays inside the sphere — the test is exactly how sphere vs counter-ion is told apart.', reveals: 'complex-releases-metal-ion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_009', title: 'You made it',
          caseStudy: { intro: 'You can now look at a dotted empirical formula and see the hidden architecture inside it. Coordination chemistry is the backbone of board inorganic questions — and of drugs like cisplatin.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_007', difficulty: 'standard',
          question: 'The spectrochemical series is an experimentally determined ordering of ligands.',
          hint: 'If stuck, revisit c12_chem_cbse_05_006 for splitting diagram and c11_chem_cbse_02_017 for.',
          misconception: 'Students believe "all strong field ligands cause low-spin complexes" and "all weak field ligands cause high-spin.',
          parts: [
                { id: 'a', prompt: 'Write the spectrochemical series for the following ligands in order of increasing field strength: Cl⁻, CN⁻, NH₃, H₂O, CO, F⁻.', answer: 'Correct order: F⁻ < Cl⁻ < H₂O < NH₃ < CN⁻ < CO',
                  options: ['Correct order: F⁻ < Cl⁻ < H₂O < NH₃ < CN⁻ < CO', 'all strong field ligands cause low-spin complexes', 'all weak field ligands cause high-spin complexes'],
                  hint: 'If stuck, revisit c12_chem_cbse_05_006 for splitting diagram and c11_chem_cbse_02_017 for Hund\'s.',
                  misconception: 'Students believe "all strong field ligands cause low-spin complexes" and "all weak field ligands cause high-spin complexes" regardless.' },
                { id: 'b', prompt: 'For an octahedral d⁶ metal ion, the pairing energy P = 20,000 cm⁻¹.', answer: 'Ligand A: Δo (18,000) < P (20,000) → high-spin → t2g⁴ eg² → 4 unpaired electrons',
                  options: ['Ligand A: Δo (18,000) < P (20,000) → high-spin → t2g⁴ eg² → 4 unpaired electrons', 'strong/weak', 'all strong field ligands cause low-spin complexes', 'all weak field ligands cause high-spin complexes'],
                  hint: 'If stuck, revisit c12_chem_cbse_05_006 for splitting diagram and c11_chem_cbse_02_017 for Hund\'s.',
                  misconception: 'Students believe "all strong field ligands cause low-spin complexes" and "all weak field ligands cause high-spin complexes" regardless.' }
          ],
            remediations: { 'all-strong-field-ligands-cause': { steps: ['Revisit c12_chem_cbse_05_006 (Crystal Field Theory: Octahedral and Tetrahedral F) — re-derive the d-orbital splitting.', 'Revisit c11_chem_cbse_02_017 (Hund\'s Rule) — practice filling t2g/eg orbitals for d¹–d¹⁰ with physical coins/arrows.', 'Make a 3×5 card for each common ligand with its position in spectrochemical series and σ/π character; sort them daily.', 'Solve 5 JEE-style problems where metal oxidation state changes (e.g., Fe²⁺ vs Fe³⁺ with same ligand) to internalise.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "all strong field ligands cause low-spin complexes" and "all weak field ligands cause high-spin.',
          parts: [
                { id: 'a', prompt: 'Design a thought experiment: You have two unknown octahedral Co³⁺ (d⁶) complexes, one with ligand X, one with ligand Y.', answer: 'Complex 1 diamagnetic → low-spin d⁶ (t2g⁶) → Δo > P → strong field ligand',
                  options: ['Complex 1 diamagnetic → low-spin d⁶ (t2g⁶) → Δo > P → strong field ligand', 'all strong field ligands cause low-spin complexes', 'all weak field ligands cause high-spin complexes'],
                  hint: 'If stuck, revisit c12_chem_cbse_05_006 for splitting diagram and c11_chem_cbse_02_017 for Hund\'s.',
                  misconception: 'Students believe "all strong field ligands cause low-spin complexes" and "all weak field ligands cause high-spin complexes" regardless.' }
          ],
            remediations: { 'all-strong-field-ligands-cause': { steps: ['Revisit c12_chem_cbse_05_006 (Crystal Field Theory: Octahedral and Tetrahedral F) — re-derive the d-orbital splitting.', 'Revisit c11_chem_cbse_02_017 (Hund\'s Rule) — practice filling t2g/eg orbitals for d¹–d¹⁰ with physical coins/arrows.', 'Make a 3×5 card for each common ligand with its position in spectrochemical series and σ/π character; sort them daily.', 'Solve 5 JEE-style problems where metal oxidation state changes (e.g., Fe²⁺ vs Fe³⁺ with same ligand) to internalise.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_008', difficulty: 'standard',
          question: 'The colour of a coordination complex arises from d-d electronic transitions.',
          hint: 'Revisit c12_chem_cbse_05_006 for splitting diagrams and c12_chem_cbse_05_007 for.',
          misconception: 'Students often think that "strong-field ligands cause electrons to jump to higher orbitals" — they confuse the.',
          parts: [
                { id: 'a', prompt: 'A student writes the spin-only magnetic moment formula as μ = √[n(n+1)] BM. Is this correct?', answer: 'The correct formula is μ = √[n(n+2)] BM, not √[n(n+1)]',
                  options: ['The correct formula is μ = √[n(n+2)] BM, not √[n(n+1)]', 'strong-field ligands cause electrons to jump to higher orbitals'],
                  hint: 'Revisit c12_chem_cbse_05_006 for splitting diagrams and c12_chem_cbse_05_007 for spectrochemical.',
                  misconception: 'Students often think that "strong-field ligands cause electrons to jump to higher orbitals" — they confuse the ground-state electron.' },
                { id: 'b', prompt: 'Calculate the spin-only magnetic moment (in BM) for [CoF₆]³⁻ and [Co(NH₃)₆]³⁺. Both are octahedral Co(III) d⁶ complexes.', answer: 'Spectrochemical series: F⁻ < H₂O < NH₃ < CN⁻',
                  options: ['Spectrochemical series: F⁻ < H₂O < NH₃ < CN⁻', 'strong-field ligands cause electrons to jump to higher orbitals'],
                  hint: 'Revisit c12_chem_cbse_05_006 for splitting diagrams and c12_chem_cbse_05_007 for spectrochemical.',
                  misconception: 'Students often think that "strong-field ligands cause electrons to jump to higher orbitals" — they confuse the ground-state electron.' }
          ],
            remediations: { 'strong-field-ligands-cause-electrons': { steps: ['If the student confuses ground-state filling with d-d transitions: (1) Revisit c11_chem_cbse_02_017 (Hund\'s Rule) and.', '(2) Draw the octahedral splitting diagram for d⁴–d⁷; explicitly label Δ₀ and P.', '(3) Practice: for each ligand in the spectrochemical series (c12_chem_cbse_05_007), decide high/low spin for d⁶ Co(III).', '(4) Re-do Diagnostic Q3 and Q5, writing the electron distribution (t₂gˣ e_gʸ) before calculating μ.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_009', difficulty: 'standard',
          question: 'Coordination compounds are complex entities where a central metal atom/ion.',
          hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11.',
          misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket.',
          parts: [
                { id: 'a', prompt: 'A student writes: "EDTA is used in water hardness titration because it forms a stable complex with Ca²⁺ and Mg²⁺." Is this statement complete?', answer: 'No, the statement is incomplete',
                  options: ['No, the statement is incomplete', 'chelate effect', 'multidentate ligands form more stable complexes', 'chelate'],
                  hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11 Equilibrium.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'b', prompt: 'In the cyanide process for gold extraction: 4Au + 8CN⁻ + O₂ + 2H₂O → 4[Au(CN)₂]⁻ + 4OH⁻. Why is oxygen (O₂) essential?', answer: 'O₂ acts as the oxidant: Au(0) → Au(I) in [Au(CN)₂]⁻ requires electron loss',
                  options: ['O₂ acts as the oxidant: Au(0) → Au(I) in [Au(CN)₂]⁻ requires electron loss', 'chelate effect', 'multidentate ligands form more stable complexes', 'chelate'],
                  hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11 Equilibrium.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'c', prompt: 'A water sample contains 0.01 M Ca²⁺ and 0.01 M Mg²⁺. You titrate with 0.01 M EDTA at pH 10 using Eriochrome Black T indicator.', answer: 'Step 1: Moles of Ca²⁺ = 0.01 mol/L × 0.050 L = 5.0×10⁻⁴ mol',
                  options: ['Step 1: Moles of Ca²⁺ = 0.01 mol/L × 0.050 L = 5.0×10⁻⁴ mol', 'chelate effect', 'multidentate ligands form more stable complexes', 'chelate'],
                  hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11 Equilibrium.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'd', prompt: 'Compare the role of coordination compounds in hemoglobin (O₂ transport) and chlorophyll (photosynthesis). Both are porphyrin complexes.', answer: 'Hemoglobin: Fe²⁺ (d⁶) in porphyrin (strong field) → low-spin t₂g⁶ eg⁰',
                  options: ['Hemoglobin: Fe²⁺ (d⁶) in porphyrin (strong field) → low-spin t₂g⁶ eg⁰', 'Mg²⁺ binds O₂', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11 Equilibrium.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' }
          ],
            remediations: { 'chelate-effect-only-means-multidentate': { steps: ['If the student cannot explain the entropy origin of the chelate effect: (1) Revisit Class 11 thermodynamics.', '(2) Write the two reactions: Co³⁺ + 6NH₃ ⇌ [Co(NH₃)₆]³⁺ (7 particles → 1) and Co³⁺ + EDTA⁴⁻ ⇌ [Co(EDTA)]⁻ (2 particles.', '(3) Calculate Δn_gas (not applicable) but Δn_solution: first reaction decreases particle count by 6, second by 1.', '(4) Realize entropy *decrease* is smaller for EDTA → less negative ΔS → more positive TΔS → more negative ΔG.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
