import type { SimDef } from '../../engine/types';
import C12_ChemistryElectrochemistryCBSESim from '../../../simulations/c6_12/C12_ChemistryElectrochemistryCBSESim';

/** v3 wrapped master — C12_ChemistryElectrochemistryCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistryelectrochemistrycbsesim: SimDef = {
    id: 'v3w_c12_chemistryelectrochemistrycbsesim',
    title: 'Electrochemical Cells: Galvanic and Electrolytic',
    subtitle: 'Covers: construction and working of galvanic cells (Daniell cell as primary example),.',
    classLevel: 12, subject: 'chemistry', topic: 'Electrochemical Cells: Galvanic and Electrolytic',
    chapters: [],
    nodeIds: ['c12_chem_cbse_02_001', 'c12_chem_cbse_02_002', 'c12_chem_cbse_02_003', 'c12_chem_cbse_02_004', 'c12_chem_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a simple Daniell cell in the lab: a zinc rod in ZnSO₄ solution and a copper rod in CuSO₄ solution.', goal: 'Master Electrochemical Cells: Galvanic and Electrolytic.' },
    discovery: {
        question: 'A student calculates K for a reaction with E°_cell = 0.46 V and n = 2 at 298 K and gets K = 3.92 × 10¹⁵.',
        options: ['The statement is false', 'thermodynamically favorable', 'goes to completion'],
        answer: 'The statement is false',
        hook: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has.',
    },
    teaching: [
        { title: 'An electrochemical cell is a device that.', text: 'An electrochemical cell is a device that interconverts chemical energy and electrical energy through spontaneous (galvanic cell) or non-spontaneous (electrolytic cell) redox reactions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_001', title: 'An electrochemical cell is a device.',
          scaffold: { problem: 'A student constructs a galvanic cell using a zinc electrode in 1 M ZnSO₄ and a copper electrode in 1 M CuSO₄ at 298 K.',
            steps: [
            { text: 'Identify the two half-cells. Zinc electrode is in Zn²⁺ solution, copper in Cu²⁺ solution.' },
            { text: 'Write oxidation half-reaction at anode: Zn(s) → Zn²⁺(aq) + 2e⁻.' },
            { text: 'Add half-reactions (electrons cancel) to get overall reaction: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).' },
            { text: 'Calculate E°cell = E°cathode - E°anode = 0.34 V - (-0.76 V) = 1.10 V.' },
            { text: 'Draw cell diagram: Zn(s) | Zn²⁺(aq, 1 M) || Cu²⁺(aq, 1 M) | Cu(s). Show anode (Zn) negative, cathode (Cu) positive.', faded: true, blankAnswer: '(a) Anode: Zn(s) → Zn²⁺(aq) + 2e⁻; Cathode: Cu²⁺(aq) + 2e⁻.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_002', title: 'Standard electrode potential (E°) is.',
          scaffold: { problem: 'A galvanic cell is constructed using a standard Fe³⁺/Fe²⁺ half-cell (Pt electrode in 1 M Fe³⁺ and 1 M Fe²⁺) and a standard Cu²⁺/Cu.',
            steps: [
            { text: 'Compare the standard reduction potentials. The half-cell with the higher reduction potential (+0.77 V) will undergo.' },
            { text: 'Write the half-reactions. Cathode (reduction): Fe³⁺(aq) + e⁻ → Fe²⁺(aq). Anode (oxidation): Cu(s) → Cu²⁺(aq) + 2e⁻.' },
            { text: 'Balance electrons. Multiply the cathode reaction by 2: 2Fe³⁺(aq) + 2e⁻ → 2Fe²⁺(aq).' },
            { text: 'Add half-reactions to get overall reaction: Cu(s) + 2Fe³⁺(aq) → Cu²⁺(aq) + 2Fe²⁺(aq).' },
            { text: 'Write cell notation (anode left, cathode right): Cu(s)|Cu²⁺(aq, 1 M)||Fe³⁺(aq, 1 M), Fe²⁺(aq, 1 M)|Pt(s).' },
            { text: 'Calculate E°cell = E°cathode – E°anode = 0.77 V – 0.34 V = +0.43 V.', faded: true, blankAnswer: 'Cell notation: Cu(s)|Cu²⁺(aq, 1 M)||Fe³⁺(aq, 1 M), Fe²⁺(aq,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_003', title: 'The Nernst equation quantitatively.',
          scaffold: { problem: 'Calculate the EMF of the cell Ni(s)|Ni²⁺(0.160 M)||Ag⁺(0.002 M)|Ag(s) at 298 K. Given E°(Ni²⁺/Ni) = -0.25 V, E°(Ag⁺/Ag) = 0.80 V.',
            steps: [
            { text: 'Identify anode and cathode. Ni has lower reduction potential (-0.25 V) than Ag (0.80 V), so Ni is anode (oxidation), Ag.' },
            { text: 'Write half-reactions and balance electrons. Anode: Ni → Ni²⁺ + 2e⁻. Cathode: 2Ag⁺ + 2e⁻ → 2Ag.' },
            { text: 'Calculate E°cell = E°cathode - E°anode = 0.80 - (-0.25) = 1.05 V.' },
            { text: 'Write reaction quotient Q = [Ni²⁺]/[Ag⁺]² = 0.160 / (0.002)² = 0.160 / 0.000004 = 40000.' },
            { text: 'Apply Nernst equation at 298 K: Ecell = E°cell - (0.059/n) log Q = 1.05 - (0.059/2) log(40000).', faded: true, blankAnswer: 'Ecell = 0.91 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_004', title: 'The equilibrium constant (K) of a redox.',
          scaffold: { problem: 'The standard cell potential for the reaction Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s) is 0.46 V at 298 K.',
            steps: [
            { text: 'Write the balanced cell reaction and identify n. Oxidation: Cu(s) → Cu²⁺(aq) + 2e⁻; Reduction: 2Ag⁺(aq) + 2e⁻ → 2Ag(s).' },
            { text: 'Write the formula at 298 K: E°_cell = (0.059/n) log₁₀ K.' },
            { text: 'Substitute known values: 0.46 V = (0.059/2) log₁₀ K.' },
            { text: 'Solve for log₁₀ K: log₁₀ K = (0.46 × 2) / 0.059 = 0.92 / 0.059 ≈ 15.5932.' },
            { text: 'Calculate K: K = 10¹⁵·⁵⁹³² ≈ 3.92 × 10¹⁵. (Dimensionless, no units.)', faded: true, blankAnswer: 'K ≈ 3.92 × 10¹⁵ (dimensionless)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_010', title: 'Corrosion is an electrochemical process.',
          scaffold: { problem: 'An iron pipeline is buried in soil with [Fe²⁺] = 1.0 × 10⁻⁶ M, pH = 5.0, and pO₂ = 0.2 bar.',
            steps: [
            { text: 'Write the overall corrosion reaction: 2Fe(s) + O₂(g) + 4H⁺(aq) → 2Fe²⁺(aq) + 2H₂O(l).' },
            { text: 'Calculate standard cell potential: E°cell = E°cathode – E°anode = 1.23 V – (–0.44 V) = 1.67 V.' },
            { text: 'Write the reaction quotient Q = [Fe²⁺]² / (pO₂ [H⁺]⁴). Note solid Fe and liquid H₂O have unit activity.' },
            { text: 'Substitute values: [Fe²⁺] = 1.0 × 10⁻⁶ M, [H⁺] = 10⁻⁵ M (pH 5), pO₂ = 0.2 bar.' },
            { text: 'Apply Nernst equation at 298 K: Ecell = E°cell – (0.0591/4) log Q = 1.67 – (0.014775) log(5 × 10⁸) = 1.67 – 0.014775 ×.', faded: true, blankAnswer: 'Ecell = 1.54 V (approx). Corrosion is spontaneous.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Electrochemical Cells: Galvanic and Electrolytic', spots: [
            { id: 's1', label: 'An electrochemical cell is a', prompt: 'Which idea is this? — An electrochemical cell is a device that interconverts chemical energy and electrical.', answer: 'An electrochemical cell is a', options: ['An electrochemical cell is a', 'Standard electrode potential E is', 'The Nernst equation quantitatively relates', 'The equilibrium constant K of'] },
            { id: 's2', label: 'Standard electrode potential E is', prompt: 'Which idea is this? — Standard electrode potential (E°) is the potential difference developed between a metal.', answer: 'Standard electrode potential E is', options: ['Standard electrode potential E is', 'An electrochemical cell is a', 'The Nernst equation quantitatively relates', 'The equilibrium constant K of'] },
            { id: 's3', label: 'The Nernst equation quantitatively relates', prompt: 'Which idea is this? — The Nernst equation quantitatively relates the electrode potential of a half-cell (or the.', answer: 'The Nernst equation quantitatively relates', options: ['The Nernst equation quantitatively relates', 'An electrochemical cell is a', 'Standard electrode potential E is', 'The equilibrium constant K of'] },
            { id: 's4', label: 'The equilibrium constant K of', prompt: 'Which idea is this? — The equilibrium constant (K) of a redox reaction occurring in an electrochemical cell is.', answer: 'The equilibrium constant K of', options: ['The equilibrium constant K of', 'An electrochemical cell is a', 'Standard electrode potential E is', 'The Nernst equation quantitatively relates'] },
            { id: 's5', label: 'Corrosion is an electrochemical process', prompt: 'Which idea is this? — Corrosion is an electrochemical process where a metal deteriorates due to oxidation by.', answer: 'Corrosion is an electrochemical process', options: ['Corrosion is an electrochemical process', 'An electrochemical cell is a', 'Standard electrode potential E is', 'The Nernst equation quantitatively relates'] }
          ] } }
    ],
    explore: { component: C12_ChemistryElectrochemistryCBSESim, prompt: 'Explore the interactive — Electrochemical Cells: Galvanic and Electrolytic' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_001', difficulty: 'standard',
          question: 'An electrochemical cell is a device that interconverts chemical energy and.',
          hint: 'If stuck, review c11_chem_cbse_08_003 (Half-Reaction Method) and c11_chem_cbse_08_002.',
          misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in.',
          parts: [
                { id: 'a', prompt: 'For the galvanic cell: Mg(s) | Mg²⁺(aq) || Ag⁺(aq) | Ag(s), write the half-reactions at anode and cathode, the overall cell reaction, and the cell notation.', answer: 'Anode (oxidation): Mg(s) → Mg²⁺(aq) + 2e⁻',
                  options: ['Anode (oxidation): Mg(s) → Mg²⁺(aq) + 2e⁻', 'attracts anions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' },
                { id: 'b', prompt: 'Compare the Daniell cell (galvanic) and the electrolysis of aqueous CuSO₄ using copper electrodes (electrolytic) in terms of: (a) spontaneity, (b) electrode.', answer: 'spontaneity, (',
                  options: ['spontaneity, (', 'attracts anions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' }
          ],
            remediations: { 'in-a-galvanic-cell': { steps: ['Revisit the concept of electrode polarity by comparing a galvanic cell (battery) and an electrolytic cell (charging a.', 'Use a simple activity: connect a Daniell cell to a voltmeter, note positive reading; then connect an external DC source.', 'Review Class 11 redox (node c11_chem_cbse_08_003: Balancing Redox Reactions: Half-Reaction Method) to reinforce.', 'Then practice writing cell notation for 5 different redox couples, explicitly labeling anode/cathode and electron flow.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in.',
          parts: [
                { id: 'a', prompt: 'A student sets up a cell with Fe(s) | Fe²⁺(aq) || Cu²⁺(aq) | Cu(s) and claims the cell potential is -0.78 V because E°(Fe²⁺/Fe) = -0.44 V and E°(Cu²⁺/Cu) =.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'attracts anions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' },
                { id: 'b', prompt: 'Compare the Daniell cell (galvanic) and the electrolysis of aqueous CuSO₄ using copper electrodes (electrolytic) in terms of: (a) spontaneity, (b) electrode.', answer: 'spontaneity, (',
                  options: ['spontaneity, (', 'attracts anions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in a galvanic cell, the anode is positive because it "attracts anions" (like in electrolysis).' }
          ],
            remediations: { 'in-a-galvanic-cell': { steps: ['Revisit the concept of electrode polarity by comparing a galvanic cell (battery) and an electrolytic cell (charging a.', 'Use a simple activity: connect a Daniell cell to a voltmeter, note positive reading; then connect an external DC source.', 'Review Class 11 redox (node c11_chem_cbse_08_003: Balancing Redox Reactions: Half-Reaction Method) to reinforce.', 'Then practice writing cell notation for 5 different redox couples, explicitly labeling anode/cathode and electron flow.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_002', difficulty: 'standard',
          question: 'Standard electrode potential (E°) is the potential difference developed between.',
          hint: 'If stuck, review c11_chem_cbse_08_003 (Balancing Redox Reactions: Half-Reaction Method).',
          misconception: 'Students often think the standard electrode potential of a half-cell can be measured directly by connecting a voltmeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Standard electrode potential (E°) is the potential difference developed between a metal',
                  options: ['Standard electrode potential (E°) is the potential difference developed between a metal', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'The Nernst equation quantitatively relates the electrode potential of a half-cell (or the', 'The equilibrium constant (K) of a redox reaction occurring in an electrochemical cell is'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the standard electrode potential of a half-cell can be measured directly by connecting a voltmeter to the half-cell.' }
          ],
            remediations: { 'the-standard-electrode-potential-of': { steps: ['If the student cannot calculate E°cell correctly: (1) Revisit c11_chem_cbse_08_001 (Oxidation and Reduction: Classical.', '(2) Revisit c11_chem_cbse_08_002 (Oxidation Number) to identify oxidation states.', '(3) Practice: Given a table of reduction potentials, pick the higher one as cathode, lower as anode.', 'Compute E°cell = E°cathode – E°anode.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_003', difficulty: 'standard',
          question: 'The Nernst equation quantitatively relates the electrode potential of a.',
          hint: 'If stuck on Q construction, revisit c11_chem_cbse_07_005 (Reaction Quotient) and practice.',
          misconception: 'Students often write the Nernst equation for a full cell as Ecell = E°cell - (0.059/n) log([products]/[reactants]) but.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Nernst equation quantitatively relates the electrode potential of a half-cell (or the',
                  options: ['The Nernst equation quantitatively relates the electrode potential of a half-cell (or the', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'Standard electrode potential (E°) is the potential difference developed between a metal', 'The equilibrium constant (K) of a redox reaction occurring in an electrochemical cell is'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Nernst equation for a full cell as Ecell = E°cell - (0.059/n) log([products]/[reactants]) but incorrectly identify.' }
          ],
            remediations: { 'students-often-write-the-nernst': { steps: ['Revisit c11_chem_cbse_06_010 (ΔG° = -RT ln K) and c11_chem_cbse_07_005 (Reaction Quotient Q) to rebuild the.', 'Practice writing Q for 5 different full cell reactions (e.g., from c12_chem_cbse_02_002) until stoichiometric.', 'Re-derive the Nernst equation from ΔG = ΔG° + RT ln Q and ΔG = -nFE step-by-step on paper, checking sign at each step.', 'Solve 3 numerical problems where n > 2 (e.g., MnO₄⁻/Mn²⁺, Cr₂O₇²⁻/Cr³⁺) to master multi-electron transfers.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the Nernst equation for a full cell as Ecell = E°cell - (0.059/n) log([products]/[reactants]) but.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For the cell Zn|Zn²⁺(c₁)||Cu²⁺(c₂)|Cu, if I double both concentrations c₁ and c₂, the cell EMF remains unchanged." Evaluate this statement.', answer: 'The statement is TRUE',
                  options: ['The statement is TRUE', 'false, EMF changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Nernst equation for a full cell as Ecell = E°cell - (0.059/n) log([products]/[reactants]) but incorrectly identify.' }
          ],
            remediations: { 'students-often-write-the-nernst': { steps: ['Revisit c11_chem_cbse_06_010 (ΔG° = -RT ln K) and c11_chem_cbse_07_005 (Reaction Quotient Q) to rebuild the.', 'Practice writing Q for 5 different full cell reactions (e.g., from c12_chem_cbse_02_002) until stoichiometric.', 'Re-derive the Nernst equation from ΔG = ΔG° + RT ln Q and ΔG = -nFE step-by-step on paper, checking sign at each step.', 'Solve 3 numerical problems where n > 2 (e.g., MnO₄⁻/Mn²⁺, Cr₂O₇²⁻/Cr³⁺) to master multi-electron transfers.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_004', difficulty: 'standard',
          question: 'The equilibrium constant (K) of a redox reaction occurring in an.',
          hint: 'If stuck, review the derivation of the Nernst equation in c12_chem_cbse_02_003 and the.',
          misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has.',
          parts: [
                { id: 'a', prompt: 'Two cells have standard potentials: Cell A: E° = +0.50 V (n=2), Cell B: E° = -0.25 V (n=1).', answer: 'Cell A: E° > 0 ⇒ log K > 0 ⇒ K > 1 (product-favored)',
                  options: ['Cell A: E° > 0 ⇒ log K > 0 ⇒ K > 1 (product-favored)', 'Cell B has larger K'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has units of.' }
          ],
            remediations: { 'misconception-the-equilibrium-constant-k': { steps: ['If a student cannot correctly calculate K from E°_cell or vice versa: 1.', 'Revisit **c12_chem_cbse_02_003 (Nernst Equation)** and re-derive the equilibrium condition (E_cell = 0, Q = K) step by.', 'Practice identifying **n** by writing balanced half-reactions for 5 different redox couples (e.g., MnO₄⁻/Mn²⁺,.', 'Solve 3 numericals where T ≠ 298 K (use the general form 2.303RT/nF) to avoid over-reliance on the 0.059 shortcut.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has.',
          parts: [
                { id: 'a', prompt: 'A student calculates K for a reaction with E°_cell = 0.46 V and n = 2 at 298 K and gets K = 3.92 × 10¹⁵.', answer: 'The statement is false',
                  options: ['The statement is false', 'thermodynamically favorable', 'goes to completion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has units of.' },
                { id: 'b', prompt: 'Two cells have standard potentials: Cell A: E° = +0.50 V (n=2), Cell B: E° = -0.25 V (n=1).', answer: 'Cell A: E° > 0 ⇒ log K > 0 ⇒ K > 1 (product-favored)',
                  options: ['Cell A: E° > 0 ⇒ log K > 0 ⇒ K > 1 (product-favored)', 'Cell B has larger K'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The equilibrium constant K calculated from E°_cell using the formula E°_cell = (0.059/n) log K has units of.' }
          ],
            remediations: { 'misconception-the-equilibrium-constant-k': { steps: ['If a student cannot correctly calculate K from E°_cell or vice versa: 1.', 'Revisit **c12_chem_cbse_02_003 (Nernst Equation)** and re-derive the equilibrium condition (E_cell = 0, Q = K) step by.', 'Practice identifying **n** by writing balanced half-reactions for 5 different redox couples (e.g., MnO₄⁻/Mn²⁺,.', 'Solve 3 numericals where T ≠ 298 K (use the general form 2.303RT/nF) to avoid over-reliance on the 0.059 shortcut.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_010', difficulty: 'standard',
          question: 'Corrosion is an electrochemical process where a metal deteriorates due to.',
          hint: 'If unable to write the rusting half-reactions or calculate E°cell, review the Daniell.',
          misconception: 'Students often write the rusting reaction as simply 4Fe + 3O₂ → 2Fe₂O₃, treating it as a direct chemical oxidation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Corrosion is an electrochemical process where a metal deteriorates due to oxidation by',
                  options: ['Corrosion is an electrochemical process where a metal deteriorates due to oxidation by', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'Standard electrode potential (E°) is the potential difference developed between a metal', 'The Nernst equation quantitatively relates the electrode potential of a half-cell (or the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the rusting reaction as simply 4Fe + 3O₂ → 2Fe₂O₃, treating it as a direct chemical oxidation.' }
          ],
            remediations: { 'students-often-write-the-rusting': { steps: ['Revisit c12_chem_cbse_02_001 (Electrochemical Cells) to recall galvanic cell components: anode, cathode, salt bridge,.', 'Review c12_chem_cbse_02_002 (Standard Electrode Potential) to practice calculating E°cell from half-cell potentials.', 'Re-read the rusting mechanism in NCERT Section 2.8, drawing the corrosion cell diagram with labelled anode/cathode.', 'Re-attempt Diagnostic Question 2 and 4, focusing on the role of each component (O₂, H₂O, H⁺, electrolyte).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
