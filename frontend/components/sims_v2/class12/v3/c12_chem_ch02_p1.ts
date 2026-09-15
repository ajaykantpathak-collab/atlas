import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch02_p1: SimDef = {
    id: 'v3_c12_chem_ch02_p1',
    title: 'Electrochemistry · Part 1/2',
    subtitle: 'A lemon, a coin and a nail — the cell hiding in your kitchen',
    classLevel: 12, subject: 'chemistry', topic: 'Electrochemistry · Part 1/2',
    chapters: ['c12_chem_ch02'],
    nodeIds: ['c12_chem_cbse_02_001', 'c12_chem_cbse_02_002', 'c12_chem_cbse_02_003', 'c12_chem_cbse_02_004', 'c12_chem_cbse_02_005', 'c12_chem_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Electrochemist', intro: 'Every battery is a redox reaction forced to send its electrons the long way round — through your device.', goal: 'Explain galvanic and electrolytic cells, electrode polarity, salt-bridge function and cell-potential calculations.' },
    discovery: {
        question: 'A lemon, two coins, an LED — a battery from fruit. Where does the electricity come from?',
        options: ['Electrons flow from the reactive metal through the circuit', 'The lemon produces electrons', 'The LED pushes current back', 'Acid stores static charge'],
        answer: 'Electrons flow from the reactive metal through the circuit',
        hook: 'Every battery is a tug-of-war between two metals. The loser gives up electrons.',
    },
    teaching: [
        { title: 'Electrochemical Cells: Galvanic and Electrolytic', text: 'An electrochemical cell is a device that interconverts chemical energy and electrical energy through spontaneous (galvanic cell) or non-spontaneous (electrolytic cell) redox reactions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_02_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Build a working cell from a lemon, a coin and a nail — then go pro: assign anode and cathode by the sign conventions, write IUPAC cell notation, and calculate E°cell for any pair of half-cells.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_001', title: 'Electrochemical Cells: Galvanic and Electrolytic',
          scaffold: { problem: 'A student constructs a galvanic cell using a zinc electrode in 1 M ZnSO₄ and a copper electrode in 1 M CuSO₄ at 298 K.',
            steps: [
            { text: 'Identify the two half-cells. Zinc electrode is in Zn²⁺ solution, copper in Cu²⁺ solution.' },
            { text: 'Write oxidation half-reaction at anode: Zn(s) → Zn²⁺(aq) + 2e⁻.' },
            { text: 'Add half-reactions (electrons cancel) to get overall reaction: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).' },
            { text: 'Calculate E°cell = E°cathode - E°anode = 0.34 V - (-0.76 V) = 1.10 V.' },
            { text: 'Draw cell diagram: Zn(s) | Zn²⁺(aq, 1 M) || Cu²⁺(aq, 1 M) | Cu(s). Show anode (Zn) negative, cathode (Cu) positive.', faded: true, blankAnswer: '(a) Anode: Zn(s) → Zn²⁺(aq) + 2e⁻; Cathode: Cu²⁺(aq) + 2e⁻.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_002', title: 'Standard Electrode Potential and EMF of a Cell',
          scaffold: { problem: 'A galvanic cell is constructed using a standard Fe³⁺/Fe²⁺ half-cell (Pt electrode in 1 M Fe³⁺ and 1 M Fe²⁺) and a standard Cu²⁺/Cu.',
            steps: [
            { text: 'Compare the standard reduction potentials. The half-cell with the higher reduction potential (+0.77 V) will undergo.' },
            { text: 'Write the half-reactions. Cathode (reduction): Fe³⁺(aq) + e⁻ → Fe²⁺(aq). Anode (oxidation): Cu(s) → Cu²⁺(aq) + 2e⁻.' },
            { text: 'Balance electrons. Multiply the cathode reaction by 2: 2Fe³⁺(aq) + 2e⁻ → 2Fe²⁺(aq).' },
            { text: 'Add half-reactions to get overall reaction: Cu(s) + 2Fe³⁺(aq) → Cu²⁺(aq) + 2Fe²⁺(aq).' },
            { text: 'Write cell notation (anode left, cathode right): Cu(s)|Cu²⁺(aq, 1 M)||Fe³⁺(aq, 1 M), Fe²⁺(aq, 1 M)|Pt(s).' },
            { text: 'Calculate E°cell = E°cathode – E°anode = 0.77 V – 0.34 V = +0.43 V.', faded: true, blankAnswer: 'Cell notation: Cu(s)|Cu²⁺(aq, 1 M)||Fe³⁺(aq, 1 M), Fe²⁺(aq.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_003', title: 'Nernst Equation: Derivation and Applications',
          scaffold: { problem: 'Calculate the EMF of the cell Ni(s)|Ni²⁺(0.160 M)||Ag⁺(0.002 M)|Ag(s) at 298 K. Given E°(Ni²⁺/Ni) = -0.25 V, E°(Ag⁺/Ag) = 0.80 V.',
            steps: [
            { text: 'Identify anode and cathode. Ni has lower reduction potential (-0.25 V) than Ag (0.80 V), so Ni is anode (oxidation),.' },
            { text: 'Write half-reactions and balance electrons. Anode: Ni → Ni²⁺ + 2e⁻. Cathode: 2Ag⁺ + 2e⁻ → 2Ag.' },
            { text: 'Calculate E°cell = E°cathode - E°anode = 0.80 - (-0.25) = 1.05 V.' },
            { text: 'Write reaction quotient Q = [Ni²⁺]/[Ag⁺]² = 0.160 / (0.002)² = 0.160 / 0.000004 = 40000.' },
            { text: 'Apply Nernst equation at 298 K: Ecell = E°cell - (0.059/n) log Q = 1.05 - (0.059/2) log(40000).', faded: true, blankAnswer: 'Ecell = 0.91 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_004', title: 'Equilibrium Constant from Nernst Equation',
          scaffold: { problem: 'The standard cell potential for the reaction Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s) is 0.46 V at 298 K.',
            steps: [
            { text: 'Write the balanced cell reaction and identify n. Oxidation: Cu(s) → Cu²⁺(aq) + 2e⁻; Reduction: 2Ag⁺(aq) + 2e⁻ → 2Ag(s).' },
            { text: 'Write the formula at 298 K: E°_cell = (0.059/n) log₁₀ K.' },
            { text: 'Substitute known values: 0.46 V = (0.059/2) log₁₀ K.' },
            { text: 'Solve for log₁₀ K: log₁₀ K = (0.46 × 2) / 0.059 = 0.92 / 0.059 ≈ 15.5932.' },
            { text: 'Calculate K: K = 10¹⁵·⁵⁹³² ≈ 3.92 × 10¹⁵. (Dimensionless, no units.)', faded: true, blankAnswer: 'K ≈ 3.92 × 10¹⁵ (dimensionless)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_005', title: 'Conductance of Electrolytic Solutions: Molar Conductivity',
          scaffold: { problem: 'A conductivity cell has electrodes of area 1.5 cm² separated by 0.8 cm.',
            steps: [
            { text: 'Calculate the cell constant G* = l/A = 0.8 cm / 1.5 cm² = 0.533 cm⁻¹.' },
            { text: 'Verify cell constant using the standard KCl solution: G* = κ × R = (6.67 × 10⁻³ S cm⁻¹) × (320 Ω) = 2.134 cm⁻¹.' },
            { text: 'Calculate molar conductivity of KCl: Λₘ(KCl) = (κ × 1000) / M = (6.67 × 10⁻³ × 1000) / 0.05 = 133.4 S cm² mol⁻¹.' },
            { text: 'For CH₃COOH, use the experimental cell constant: κ(HAc) = 5.20 × 10⁻⁵ S cm⁻¹.' },
            { text: 'Molar conductivity of CH₃COOH: Λₘ(HAc) = (5.20 × 10⁻⁵ × 1000) / 0.05 = 1.04 S cm² mol⁻¹.', faded: true, blankAnswer: '(a) Cell constant = 2.13 cm⁻¹ (experimental) [geometric.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_006', title: 'Kohlrausch\'s Law: Applications',
          scaffold: { problem: 'The conductivity of 0.00241 M acetic acid (CH₃COOH) is 7.896 × 10⁻⁵ S cm⁻¹ at 298 K.',
            steps: [
            { text: 'Identify given data: κ = 7.896 × 10⁻⁵ S cm⁻¹, c = 0.00241 mol L⁻¹, λ°(H⁺) = 349.6 S cm² mol⁻¹, λ°(CH₃COO⁻) = 40.9 S cm².' },
            { text: 'Calculate Λm using Λm = (κ × 1000) / c (since κ in S cm⁻¹, c in mol L⁻¹, Λm in S cm² mol⁻¹).' },
            { text: 'Calculate Λ°m(CH₃COOH) using Kohlrausch\'s law: Λ°m = λ°(H⁺) + λ°(CH₃COO⁻) = 349.6 + 40.9 = 390.5 S cm² mol⁻¹.' },
            { text: 'Calculate α = Λm / Λ°m = 32.76 / 390.5 = 0.0839.' },
            { text: 'Calculate Ka using Ostwald\'s dilution law: Ka = cα² / (1-α) = 0.00241 × (0.0839)² / (1 - 0.0839) = 0.00241 × 0.00704.', faded: true, blankAnswer: '(a) Λm = 32.76 S cm² mol⁻¹, (b) α = 0.0839, (c) Ka = 1.85.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a Daniell cell to light an LED, a student saves effort by dipping both the zinc and copper strips into a single beaker holding a CuSO₄–ZnSO₄ mixture. The LED stays dark.',
            decisions: [{ prompt: 'Why did the shortcut fail?', options: [
                { text: 'With both electrodes in one solution, Cu²⁺ is reduced directly on the metal surfaces — no electron is pushed through the wire; the half-cells must be separated and joined by a salt bridge that carries ions to keep neutrality.', outcome: 'Separating the half-reactions is what forces electrons through the external circuit; the bridge completes the loop with ions, not electrons.' },
                { text: 'The salt bridge is missing, and that\'s the problem because the bridge is what carries electrons between the two electrodes.', outcome: 'Close on the diagnosis, wrong on the mechanism — electrons travel the wire; the bridge migrates ions to prevent charge build-up.', reveals: 'bridge-carries-electrons' },
                { text: 'The LED is fine — it just won\'t glow because in a galvanic cell the anode is positive, so he wired the polarity backwards.', outcome: 'In a galvanic cell the anode is the negative terminal (electrons leave there); reversed polarity labels are the electrolytic convention.', reveals: 'galvanic-anode-positive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Galvanic cells, electrode potentials, the Nernst equation — you now know why your phone charges and why iron rusts.',
            decisions: [{ prompt: 'What comes next? Electrochemistry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electrochemistry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_001', difficulty: 'standard',
          question: 'An electrochemical cell is a device that interconverts chemical energy and.',
          hint: 'If stuck, review c11_chem_cbse_08_003 (Half-Reaction Method) and c11_chem_cbse_08_002.',
          misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like.',
          parts: [
                { id: 'a', prompt: 'For the galvanic cell: Mg(s) | Mg²⁺(aq) || Ag⁺(aq) | Ag(s), write the half-reactions at anode and cathode, the overall cell reaction, and the cell notation.', answer: 'Anode (oxidation): Mg(s) → Mg²⁺(aq) + 2e⁻',
                  options: ['Anode (oxidation): Mg(s) → Mg²⁺(aq) + 2e⁻', 'attracts anions'],
                  hint: 'If stuck, review c11_chem_cbse_08_003 (Half-Reaction Method) and c11_chem_cbse_08_002 (Oxidation.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' },
                { id: 'b', prompt: 'Compare the Daniell cell (galvanic) and the electrolysis of aqueous CuSO₄ using copper electrodes (electrolytic) in terms of: (a) spontaneity, (b) electrode.', answer: 'spontaneity, (',
                  options: ['spontaneity, (', 'attracts anions'],
                  hint: 'If stuck, review c11_chem_cbse_08_003 (Half-Reaction Method) and c11_chem_cbse_08_002 (Oxidation.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' }
          ],
            remediations: { 'in-a-galvanic-cell': { steps: ['Revisit the concept of electrode polarity by comparing a galvanic cell (battery) and an electrolytic cell (charging.', 'Use a simple activity: connect a Daniell cell to a voltmeter, note positive reading; then connect an external DC source.', 'Review Class 11 redox (node c11_chem_cbse_08_003: Balancing Redox Reactions: Half-Reaction Method) to reinforce.', 'Then practice writing cell notation for 5 different redox couples, explicitly labeling anode/cathode and electron flow.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like.',
          parts: [
                { id: 'a', prompt: 'A student sets up a cell with Fe(s) | Fe²⁺(aq) || Cu²⁺(aq) | Cu(s) and claims the cell potential is -0.78 V because E°(Fe²⁺/Fe) = -0.44 V and E°(Cu²⁺/Cu).', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'attracts anions'],
                  hint: 'If stuck, review c11_chem_cbse_08_003 (Half-Reaction Method) and c11_chem_cbse_08_002 (Oxidation.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' }
          ],
            remediations: { 'in-a-galvanic-cell': { steps: ['Revisit the concept of electrode polarity by comparing a galvanic cell (battery) and an electrolytic cell (charging.', 'Use a simple activity: connect a Daniell cell to a voltmeter, note positive reading; then connect an external DC source.', 'Review Class 11 redox (node c11_chem_cbse_08_003: Balancing Redox Reactions: Half-Reaction Method) to reinforce.', 'Then practice writing cell notation for 5 different redox couples, explicitly labeling anode/cathode and electron flow.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_002', difficulty: 'standard',
          question: 'Standard electrode potential (E°) is the potential difference developed between.',
          hint: 'If stuck, review c11_chem_cbse_08_003 (Balancing Redox Reactions: Half-Reaction Method).',
          misconception: 'Students often think the standard electrode potential of a half-cell can be measured directly by connecting a voltmeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Standard electrode potential (E°) is the potential difference developed between a metal',
                  options: ['Standard electrode potential (E°) is the potential difference developed between a metal', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'The Nernst equation quantitatively relates the electrode potential of a half-cell (or the', 'The equilibrium constant (K) of a redox reaction occurring in an electrochemical cell is'],
                  hint: 'If stuck, review c11_chem_cbse_08_003 (Balancing Redox Reactions: Half-Reaction Method) and.',
                  misconception: 'Students often think the standard electrode potential of a half-cell can be measured directly by connecting a voltmeter to the half-cell.' }
          ],
            remediations: { 'the-standard-electrode-potential-of': { steps: ['If the student cannot calculate E°cell correctly: (1) Revisit c11_chem_cbse_08_001 (Oxidation and Reduction: Classical.', '(2) Revisit c11_chem_cbse_08_002 (Oxidation Number) to identify oxidation states.', '(3) Practice: Given a table of reduction potentials, pick the higher one as cathode, lower as anode.', 'Compute E°cell = E°cathode – E°anode.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_003', difficulty: 'standard',
          question: 'The Nernst equation quantitatively relates the electrode potential of.',
          hint: 'If stuck on Q construction, revisit c11_chem_cbse_07_005 (Reaction Quotient) and practice.',
          misconception: 'Students often write the Nernst equation for a full cell as Ecell = E°cell - (0.059/n) log([products]/[reactants]) but.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Nernst equation quantitatively relates the electrode potential of a half-cell (or the',
                  options: ['The Nernst equation quantitatively relates the electrode potential of a half-cell (or the', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'Standard electrode potential (E°) is the potential difference developed between a metal', 'The equilibrium constant (K) of a redox reaction occurring in an electrochemical cell is'],
                  hint: 'If stuck on Q construction, revisit c11_chem_cbse_07_005 (Reaction Quotient) and practice with 5.',
                  misconception: 'Students often write the Nernst equation for a full cell as Ecell = E°cell - (0.059/n) log([products]/[reactants]) but incorrectly identify.' }
          ],
            remediations: { 'students-often-write-the-nernst': { steps: ['Revisit c11_chem_cbse_06_010 (ΔG° = -RT ln K) and c11_chem_cbse_07_005 (Reaction Quotient Q) to rebuild the.', 'Practice writing Q for 5 different full cell reactions (e.g., from c12_chem_cbse_02_002) until stoichiometric.', 'Re-derive the Nernst equation from ΔG = ΔG° + RT ln Q and ΔG = -nFE step-by-step on paper, checking sign at each step.', 'Solve 3 numerical problems where n > 2 (e.g., MnO₄⁻/Mn²⁺, Cr₂O₇²⁻/Cr³⁺) to master multi-electron transfers.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_004', difficulty: 'standard',
          question: 'The equilibrium constant (K) of a redox reaction occurring in.',
          hint: 'If stuck, review the derivation of the Nernst equation in c12_chem_cbse_02_003 and the.',
          misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has.',
          parts: [
                { id: 'a', prompt: 'Two cells have standard potentials: Cell A: E° = +0.50 V (n=2), Cell B: E° = -0.25 V (n=1).', answer: 'Cell A: E° > 0 ⇒ log K > 0 ⇒ K > 1 (product-favored)',
                  options: ['Cell A: E° > 0 ⇒ log K > 0 ⇒ K > 1 (product-favored)', 'Cell B has larger K'],
                  hint: 'If stuck, review the derivation of the Nernst equation in c12_chem_cbse_02_003 and the equilibrium.',
                  misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has units.' }
          ],
            remediations: { 'misconception-the-equilibrium-constant-k': { steps: ['If a student cannot correctly calculate K from E°_cell or vice versa: 1.', 'Revisit **c12_chem_cbse_02_003 (Nernst Equation)** and re-derive the equilibrium condition (E_cell = 0, Q = K) step.', 'Practice identifying **n** by writing balanced half-reactions for 5 different redox couples (e.g., MnO₄⁻/Mn²⁺.', 'Solve 3 numericals where T ≠ 298 K (use the general form 2.303RT/nF) to avoid over-reliance on the 0.059 shortcut.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_005', difficulty: 'standard',
          question: 'Molar conductivity (Λₘ) of an electrolytic solution is the conductance of.',
          hint: 'If stuck on unit conversions, review c11_chem_cbse_01_013 (Molarity) and.',
          misconception: 'Students believe that "molar conductivity decreases with dilution because the solution becomes less conductive." They.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of molar conductivity Λₘ, and how is it related to the commonly used unit S cm² mol⁻¹?', answer: 'The SI unit of Λₘ is S m² mol⁻¹',
                  options: ['The SI unit of Λₘ is S m² mol⁻¹', '"molar conductivity decreases with dilution'],
                  hint: 'If stuck on unit conversions, review c11_chem_cbse_01_013 (Molarity) and c11_math_cbse_13_001.',
                  misconception: 'Students believe that "molar conductivity decreases with dilution because the solution becomes less conductive." They confuse conductivity.' },
                { id: 'b', prompt: 'A student measures the resistance of 0.01 M KCl as 100 Ω using a cell with constant 1.29 cm⁻¹.', answer: 'The calculation is incorrect',
                  options: ['The calculation is incorrect', '"molar conductivity decreases with dilution'],
                  hint: 'If stuck on unit conversions, review c11_chem_cbse_01_013 (Molarity) and c11_math_cbse_13_001.',
                  misconception: 'Students believe that "molar conductivity decreases with dilution because the solution becomes less conductive." They confuse conductivity.' },
                { id: 'c', prompt: 'The conductivity of 0.1 M NaCl solution is 1.06 × 10⁻² S cm⁻¹. Calculate its molar conductivity.', answer: 'For 0.1 M: Λₘ = (1.06 × 10⁻² × 1000) / 0.1 = 106 S cm² mol⁻¹',
                  options: ['For 0.1 M: Λₘ = (1.06 × 10⁻² × 1000) / 0.1 = 106 S cm² mol⁻¹', 'Λₘ should decrease', '"molar conductivity decreases with dilution'],
                  hint: 'If stuck on unit conversions, review c11_chem_cbse_01_013 (Molarity) and c11_math_cbse_13_001.',
                  misconception: 'Students believe that "molar conductivity decreases with dilution because the solution becomes less conductive." They confuse conductivity.' }
          ],
            remediations: { 'molar-conductivity-decreases-with-dilution': { steps: ['Revisit the definition: Λₘ = κ/c.', 'Write it as Λₘ = κ × (1000/M) with M in mol L⁻¹.', 'Take a concrete example: 0.1 M KCl (κ = 1.29 S m⁻¹, Λₘ = 129 S cm² mol⁻¹) vs 0.01 M KCl (κ = 0.141 S m⁻¹, Λₘ = 141.', 'Plot κ vs c and Λₘ vs √c for KCl using NCERT Table 2.3 data.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_006', difficulty: 'standard',
          question: 'Kohlrausch\'s law of independent migration of ions states that the limiting.',
          hint: 'If stuck on unit conversion or the Λ°m additivity logic, revisit c12_chem_cbse_02_005.',
          misconception: 'Students often write Λ°m(CH₃COOH) = Λ°m(HCl) + Λ°m(NaAc) - Λ°m(NaCl) but then use the resulting Λ°m to calculate α.',
          parts: [
                { id: 'a', prompt: 'Why can Λ°m for a weak electrolyte like CH₃COOH not be obtained by extrapolating a plot of Λm vs √c to zero concentration, unlike strong electrolytes?', answer: 'For weak electrolytes, Λm increases steeply near infinite dilution',
                  options: ['For weak electrolytes, Λm increases steeply near infinite dilution', 'weak electrolytes don\'t follow Kohlrausch\'s law', 'the plot is linear but with a different slope'],
                  hint: 'If stuck on unit conversion or the Λ°m additivity logic, revisit c12_chem_cbse_02_005 Example 2.4.',
                  misconception: 'Students often write Λ°m(CH₃COOH) = Λ°m(HCl) + Λ°m(NaAc) - Λ°m(NaCl) but then use the resulting Λ°m to calculate α = Λm/Λ°m *without.' }
          ],
            remediations: { 'students-often-write-m-ch': { steps: ['If a student gets α > 1 or negative Ka: (1) Revisit c12_chem_cbse_02_005 — verify unit conversion: Λm(S m² mol⁻¹) = κ(S.', '(2) Recalculate Λ°m in the SAME units as Λm.', '(3) Check if the electrolyte is actually weak — for strong electrolytes, use Λm = Λ°m - A√c instead.', '(4) Re-do Example 2.8 from NCERT step-by-step with units written at every step.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
