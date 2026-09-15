import type { SimDef } from '../../engine/types';
import C12_ChemistryBatteriesandfuelcellsSim from '../../../simulations/c6_12/C12_ChemistryBatteriesandfuelcellsSim';

/** v3 wrapped master — C12_ChemistryBatteriesandfuelcellsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrybatteriesandfuelcellssim: SimDef = {
    id: 'v3w_c12_chemistrybatteriesandfuelcellssim',
    title: 'Batteriesandfuelcells',
    subtitle: 'Covers: construction and working of galvanic cells (Daniell cell as primary example),.',
    classLevel: 12, subject: 'chemistry', topic: 'Electrochemical Cells: Galvanic and Electrolytic',
    chapters: [],
    nodeIds: ['c12_chem_cbse_02_001', 'c12_chem_cbse_02_007', 'c12_chem_cbse_02_008', 'c12_chem_cbse_02_009', 'c12_chem_cbse_02_002', 'c12_chem_cbse_02_003', 'c12_chem_cbse_02_004', 'c12_chem_cbse_02_005', 'c12_chem_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a simple Daniell cell in the lab: a zinc rod in ZnSO₄ solution and a copper rod in CuSO₄ solution.', goal: 'Master Batteriesandfuelcells.' },
    discovery: {
        question: 'Explain why the voltage of a mercury cell remains constant throughout its life while a dry cell voltage decreases gradually.',
        options: ['Mercury cell overall reaction: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)', 'mercury cell has no electrolyte', 'dry cell has no concentration change'],
        answer: 'Mercury cell overall reaction: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)',
        hook: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the.',
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
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_007', title: 'Faraday\'s laws of electrolysis.',
          scaffold: { problem: 'A jeweller wants to silver-plate a copper bracelet. The bracelet is made the cathode in an AgNO₃ bath.',
            steps: [
            { text: 'Identify the cathode half-reaction: Ag⁺(aq) + e⁻ → Ag(s). Thus n = 1.' },
            { text: 'Calculate total charge: Q = I × t = 1.2 A × (25 × 60) s = 1.2 × 1500 = 1800 C.' },
            { text: 'Find moles of electrons: n_e = Q / F = 1800 / 96500 = 0.01865 mol.' },
            { text: 'Moles of Ag = n_e / n = 0.01865 / 1 = 0.01865 mol.' },
            { text: 'Mass of Ag = moles × M = 0.01865 × 108 = 2.01 g.', faded: true, blankAnswer: '2.01 g of silver deposited.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_008', title: 'A battery is a galvanic cell (or series.',
          scaffold: { problem: 'A mercury cell (used in hearing aids) has the overall reaction Zn(Hg) + HgO(s) → ZnO(s) + Hg(l).',
            steps: [
            { text: 'Identify cathode and anode. Reduction occurs at cathode: HgO + H₂O + 2e⁻ → Hg + 2OH⁻ (E° = +0.098 V).' },
            { text: 'Calculate E°cell = E°cathode (reduction) - E°anode (reduction) = 0.098 - (-1.25) = 1.348 V ≈ 1.35 V.' },
            { text: 'Write overall reaction by adding half-reactions: Zn + HgO → ZnO + Hg. Note H₂O and OH⁻ cancel.' },
            { text: 'Analyze Nernst equation: E = E° - (RT/2F) ln([OH⁻]²/[OH⁻]²) = E° - (RT/2F) ln(1) = E°.' },
            { text: 'Conclude voltage constant at 1.35 V throughout discharge.', faded: true, blankAnswer: 'E°cell = 1.35 V. Voltage constant because reaction quotient.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_009', title: 'A hydrogen-oxygen fuel cell is a.',
          scaffold: { problem: 'A hydrogen-oxygen fuel cell uses concentrated KOH electrolyte.',
            steps: [
            { text: 'Identify anode (oxidation) and cathode (reduction). H₂ is oxidized, O₂ is reduced.' },
            { text: 'Write reduction half-reactions as given: Cathode (reduction): O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq), E° = +0.40 V.' },
            { text: 'Balance electrons. Multiply anode reaction by 2: 2H₂(g) + 4OH⁻(aq) → 4H₂O(l) + 4e⁻.' },
            { text: 'Add half-reactions: 2H₂(g) + 4OH⁻ + O₂(g) + 2H₂O(l) + 4e⁻ → 4H₂O(l) + 4e⁻ + 4OH⁻.' },
            { text: 'Calculate E°_cell = E°_cathode - E°_anode = 0.40 V - (-0.83 V) = 1.23 V.', faded: true, blankAnswer: 'Anode: 2H₂(g) + 4OH⁻(aq) → 4H₂O(l) + 4e⁻; Cathode: O₂(g) +.' }
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
        { type: 'dissect', nodeId: 'c12_chem_cbse_02_007', title: 'Identify each idea',
          dissect: { specimen: 'Batteriesandfuelcells', spots: [
            { id: 's1', label: 'An electrochemical cell is a', prompt: 'Which idea is this? — An electrochemical cell is a device that interconverts chemical energy and electrical.', answer: 'An electrochemical cell is a', options: ['An electrochemical cell is a', 'Faradays laws of electrolysis establish', 'A battery is a galvanic', 'A hydrogen-oxygen fuel cell is'] },
            { id: 's2', label: 'Faradays laws of electrolysis establish', prompt: 'Which idea is this? — Faraday\'s laws of electrolysis establish the quantitative relationship between the amount.', answer: 'Faradays laws of electrolysis establish', options: ['Faradays laws of electrolysis establish', 'An electrochemical cell is a', 'A battery is a galvanic', 'A hydrogen-oxygen fuel cell is'] },
            { id: 's3', label: 'A battery is a galvanic', prompt: 'Which idea is this? — A battery is a galvanic cell (or series of galvanic cells) that converts chemical energy.', answer: 'A battery is a galvanic', options: ['A battery is a galvanic', 'An electrochemical cell is a', 'Faradays laws of electrolysis establish', 'A hydrogen-oxygen fuel cell is'] },
            { id: 's4', label: 'A hydrogen-oxygen fuel cell is', prompt: 'Which idea is this? — A hydrogen-oxygen fuel cell is a galvanic cell that directly converts the chemical energy.', answer: 'A hydrogen-oxygen fuel cell is', options: ['A hydrogen-oxygen fuel cell is', 'An electrochemical cell is a', 'Faradays laws of electrolysis establish', 'A battery is a galvanic'] },
            { id: 's5', label: 'Standard electrode potential E is', prompt: 'Which idea is this? — Standard electrode potential (E°) is the potential difference developed between a metal.', answer: 'Standard electrode potential E is', options: ['Standard electrode potential E is', 'An electrochemical cell is a', 'Faradays laws of electrolysis establish', 'A battery is a galvanic'] },
            { id: 's6', label: 'The Nernst equation quantitatively relates', prompt: 'Which idea is this? — The Nernst equation quantitatively relates the electrode potential of a half-cell (or the.', answer: 'The Nernst equation quantitatively relates', options: ['The Nernst equation quantitatively relates', 'An electrochemical cell is a', 'Faradays laws of electrolysis establish', 'A battery is a galvanic'] }
          ] } }
    ],
    explore: { component: C12_ChemistryBatteriesandfuelcellsSim, prompt: 'Explore the interactive — Batteriesandfuelcells' },
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
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_007', difficulty: 'standard',
          question: 'Faraday\'s laws of electrolysis establish the quantitative relationship between.',
          hint: 'Review balancing half-reactions (Class 11 Redox Reactions) and mole concept (Class 11.',
          misconception: 'Students routinely write the wrong half-reaction for the electrode process, leading to an incorrect \'n\'.',
          parts: [
                { id: 'a', prompt: 'Explain why 96500 C of electricity liberates 108 g of silver from Ag⁺ but only 31.75 g of copper from Cu²⁺, even though the charge is the same.', answer: 'The same charge (1 F) provides 1 mole of electrons',
                  options: ['The same charge (1 F) provides 1 mole of electrons', 'different molar masses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely write the wrong half-reaction for the electrode process, leading to an incorrect \'n\'.' }
          ],
            remediations: { 'students-routinely-write-the-wrong': { steps: ['If a student consistently gets the wrong \'n\', they must immediately revisit Class 11 node c11_chem_cbse_08_003.', 'Practice writing reduction half-reactions for common cations: Ag⁺, Cu²⁺, Zn²⁺, Al³⁺, Na⁺, Mg²⁺, Cr₂O₇²⁻, MnO₄⁻.', 'For each, balance atoms, then charge with electrons.', 'Only after confidently writing 10 correct half-reactions should they return to Faraday calculations.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_008', difficulty: 'standard',
          question: 'A battery is a galvanic cell (or series of galvanic cells) that converts.',
          hint: 'Revisit c12_chem_cbse_02_001 for galvanic cell basics and c12_chem_cbse_02_003 for Nernst.',
          misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the.',
          parts: [
                { id: 'a', prompt: 'Explain why the voltage of a mercury cell remains constant throughout its life while a dry cell voltage decreases gradually.', answer: 'Mercury cell overall reaction: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)',
                  options: ['Mercury cell overall reaction: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)', 'mercury cell has no electrolyte', 'dry cell has no concentration change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the correct MnO₂ + NH₄⁺.' },
                { id: 'b', prompt: 'A nickel-cadmium cell is being charged. Write the half-reactions at each electrode during charging and state the overall charging reaction.', answer: 'During charging (reverse of discharge): Anode (oxidation): 2Ni(OH)₂(s) + 2OH⁻ →',
                  options: ['During charging (reverse of discharge): Anode (oxidation): 2Ni(OH)₂(s) + 2OH⁻ →', 'charging'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the correct MnO₂ + NH₄⁺.' }
          ],
            remediations: { 'students-write-the-dry-cell': { steps: ['Revisit c12_chem_cbse_02_001 (Galvanic vs Electrolytic Cells) to reinforce anode/cathode identification.', 'Review c11_chem_cbse_08_003 (Half-Reaction Method) to practice balancing in neutral/ammonium media.', 'Write the dry cell half-reactions from memory, then check against NCERT Fig 2.8.', 'Complete Intext Question 2.13 (lead battery recharging) to practice reverse reactions.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the.',
          parts: [
                { id: 'a', prompt: 'A nickel-cadmium cell is being charged. Write the half-reactions at each electrode during charging and state the overall charging reaction.', answer: 'During charging (reverse of discharge): Anode (oxidation): 2Ni(OH)₂(s) + 2OH⁻ →',
                  options: ['During charging (reverse of discharge): Anode (oxidation): 2Ni(OH)₂(s) + 2OH⁻ →', 'charging'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the correct MnO₂ + NH₄⁺.' }
          ],
            remediations: { 'students-write-the-dry-cell': { steps: ['Revisit c12_chem_cbse_02_001 (Galvanic vs Electrolytic Cells) to reinforce anode/cathode identification.', 'Review c11_chem_cbse_08_003 (Half-Reaction Method) to practice balancing in neutral/ammonium media.', 'Write the dry cell half-reactions from memory, then check against NCERT Fig 2.8.', 'Complete Intext Question 2.13 (lead battery recharging) to practice reverse reactions.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_009', difficulty: 'standard',
          question: 'A hydrogen-oxygen fuel cell is a galvanic cell that directly converts the.',
          hint: 'If stuck, practice balancing: H₂ + 2OH⁻ → 2H₂O + 2e⁻ (oxidation) and O₂ + 2H₂O + 4e⁻ →.',
          misconception: 'Students often write the half-reactions in acidic medium: Anode: H₂ → 2H⁺ + 2e⁻; Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O.',
          parts: [
                { id: 'a', prompt: 'Why are porous carbon electrodes impregnated with platinum or palladium used in a hydrogen-oxygen fuel cell instead of solid metal plates?', answer: 'Porous carbon provides high surface area for gas diffusion (H₂ and O₂) into the',
                  options: ['Porous carbon provides high surface area for gas diffusion (H₂ and O₂) into the', 'to conduct electricity better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the half-reactions in acidic medium: Anode: H₂ → 2H⁺ + 2e⁻; Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O.' }
          ],
            remediations: { 'students-often-write-the-half': { steps: ['Revisit c11_chem_cbse_08_003 (Balancing Redox Reactions: Half-Reaction Method) — practice balancing in basic medium.', 'Review c12_chem_cbse_02_001 (Galvanic Cells) — distinguish closed system (battery) vs open system (fuel cell).', 'Re-read NCERT Section 2.7: note "concentrated aqueous sodium hydroxide solution" and the given half-reactions.', 'Re-diagnostic: Write both acidic and alkaline half-reactions for H₂/O₂ fuel cell and explain why alkaline version is.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_002', difficulty: 'standard',
          question: 'Standard electrode potential (E°) is the potential difference developed between.',
          hint: 'If stuck, review c11_chem_cbse_08_003 (Balancing Redox Reactions: Half-Reaction Method).',
          misconception: 'Students often think the standard electrode potential of a half-cell can be measured directly by connecting a voltmeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Standard electrode potential (E°) is the potential difference developed between a metal',
                  options: ['Standard electrode potential (E°) is the potential difference developed between a metal', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'Faraday\'s laws of electrolysis establish the quantitative relationship between the amount', 'A battery is a galvanic cell (or series of galvanic cells) that converts chemical energy'],
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
                  options: ['The Nernst equation quantitatively relates the electrode potential of a half-cell (or the', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'Faraday\'s laws of electrolysis establish the quantitative relationship between the amount', 'A battery is a galvanic cell (or series of galvanic cells) that converts chemical energy'],
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
            remediations: { 'students-often-write-the-nernst': { steps: ['Revisit c11_chem_cbse_06_010 (ΔG° = -RT ln K) and c11_chem_cbse_07_005 (Reaction Quotient Q) to rebuild the.', 'Practice writing Q for 5 different full cell reactions (e.g., from c12_chem_cbse_02_002) until stoichiometric.', 'Re-derive the Nernst equation from ΔG = ΔG° + RT ln Q and ΔG = -nFE step-by-step on paper, checking sign at each step.', 'Solve 3 numerical problems where n > 2 (e.g., MnO₄⁻/Mn²⁺, Cr₂O₇²⁻/Cr³⁺) to master multi-electron transfers.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
