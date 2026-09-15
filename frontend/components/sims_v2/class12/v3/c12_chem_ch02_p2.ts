import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch02_p2: SimDef = {
    id: 'v3_c12_chem_ch02_p2',
    title: 'Electrochemistry · Part 2/2',
    subtitle: 'A lemon, a coin and a nail — the cell hiding in your kitchen',
    classLevel: 12, subject: 'chemistry', topic: 'Electrochemistry · Part 2/2',
    chapters: ['c12_chem_ch02'],
    nodeIds: ['c12_chem_cbse_02_007', 'c12_chem_cbse_02_008', 'c12_chem_cbse_02_009', 'c12_chem_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Electrochemist', intro: 'Every battery is a redox reaction forced to send its electrons the long way round — through your device.', goal: 'Explain galvanic and electrolytic cells, electrode polarity, salt-bridge function and cell-potential calculations.' },
    discovery: {
        question: 'A lemon, two coins, an LED — a battery from fruit. Where does the electricity come from?',
        options: ['Electrons flow from the reactive metal through the circuit', 'The lemon produces electrons', 'The LED pushes current back', 'Acid stores static charge'],
        answer: 'Electrons flow from the reactive metal through the circuit',
        hook: 'Every battery is a tug-of-war between two metals. The loser gives up electrons.',
    },
    teaching: [
        { title: 'Electrolysis: Faraday\'s Laws', text: 'Faraday\'s laws of electrolysis establish the quantitative relationship between the amount of substance chemically transformed at an electrode and the quantity of electricity passed through the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_02_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Build a working cell from a lemon, a coin and a nail — then go pro: assign anode and cathode by the sign conventions, write IUPAC cell notation, and calculate E°cell for any pair of half-cells.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_007', title: 'Electrolysis: Faraday\'s Laws',
          scaffold: { problem: 'A jeweller wants to silver-plate a copper bracelet. The bracelet is made the cathode in an AgNO₃ bath.',
            steps: [
            { text: 'Identify the cathode half-reaction: Ag⁺(aq) + e⁻ → Ag(s). Thus n = 1.' },
            { text: 'Calculate total charge: Q = I × t = 1.2 A × (25 × 60) s = 1.2 × 1500 = 1800 C.' },
            { text: 'Find moles of electrons: n_e = Q / F = 1800 / 96500 = 0.01865 mol.' },
            { text: 'Moles of Ag = n_e / n = 0.01865 / 1 = 0.01865 mol.' },
            { text: 'Mass of Ag = moles × M = 0.01865 × 108 = 2.01 g.', faded: true, blankAnswer: '2.01 g of silver deposited.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_008', title: 'Batteries: Primary and Secondary Cells',
          scaffold: { problem: 'A mercury cell (used in hearing aids) has the overall reaction Zn(Hg) + HgO(s) → ZnO(s) + Hg(l).',
            steps: [
            { text: 'Identify cathode and anode. Reduction occurs at cathode: HgO + H₂O + 2e⁻ → Hg + 2OH⁻ (E° = +0.098 V).' },
            { text: 'Calculate E°cell = E°cathode (reduction) - E°anode (reduction) = 0.098 - (-1.25) = 1.348 V ≈ 1.35 V.' },
            { text: 'Write overall reaction by adding half-reactions: Zn + HgO → ZnO + Hg. Note H₂O and OH⁻ cancel.' },
            { text: 'Analyze Nernst equation: E = E° - (RT/2F) ln([OH⁻]²/[OH⁻]²) = E° - (RT/2F) ln(1) = E°.' },
            { text: 'Conclude voltage constant at 1.35 V throughout discharge.', faded: true, blankAnswer: 'E°cell = 1.35 V. Voltage constant because reaction quotient.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_009', title: 'Fuel Cells: Hydrogen-Oxygen Fuel Cell',
          scaffold: { problem: 'A hydrogen-oxygen fuel cell uses concentrated KOH electrolyte.',
            steps: [
            { text: 'Identify anode (oxidation) and cathode (reduction). H₂ is oxidized, O₂ is reduced.' },
            { text: 'Write reduction half-reactions as given: Cathode (reduction): O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq), E° = +0.40 V.' },
            { text: 'Balance electrons. Multiply anode reaction by 2: 2H₂(g) + 4OH⁻(aq) → 4H₂O(l) + 4e⁻.' },
            { text: 'Add half-reactions: 2H₂(g) + 4OH⁻ + O₂(g) + 2H₂O(l) + 4e⁻ → 4H₂O(l) + 4e⁻ + 4OH⁻.' },
            { text: 'Calculate E°_cell = E°_cathode - E°_anode = 0.40 V - (-0.83 V) = 1.23 V.', faded: true, blankAnswer: 'Anode: 2H₂(g) + 4OH⁻(aq) → 4H₂O(l) + 4e⁻; Cathode: O₂(g).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_02_010', title: 'Corrosion: Causes and Prevention',
          scaffold: { problem: 'An iron pipeline is buried in soil with [Fe²⁺] = 1.0 × 10⁻⁶ M, pH = 5.0, and pO₂ = 0.2 bar.',
            steps: [
            { text: 'Write the overall corrosion reaction: 2Fe(s) + O₂(g) + 4H⁺(aq) → 2Fe²⁺(aq) + 2H₂O(l).' },
            { text: 'Calculate standard cell potential: E°cell = E°cathode – E°anode = 1.23 V – (–0.44 V) = 1.67 V.' },
            { text: 'Write the reaction quotient Q = [Fe²⁺]² / (pO₂ [H⁺]⁴). Note solid Fe and liquid H₂O have unit activity.' },
            { text: 'Substitute values: [Fe²⁺] = 1.0 × 10⁻⁶ M, [H⁺] = 10⁻⁵ M (pH 5), pO₂ = 0.2 bar.' },
            { text: 'Apply Nernst equation at 298 K: Ecell = E°cell – (0.0591/4) log Q = 1.67 – (0.014775) log(5 × 10⁸) = 1.67 – 0.014775.', faded: true, blankAnswer: 'Ecell = 1.54 V (approx). Corrosion is spontaneous.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Building a Daniell cell to light an LED, a student saves effort by dipping both the zinc and copper strips into a single beaker holding a CuSO₄–ZnSO₄ mixture. The LED stays dark.',
            decisions: [{ prompt: 'Why did the shortcut fail?', options: [
                { text: 'With both electrodes in one solution, Cu²⁺ is reduced directly on the metal surfaces — no electron is pushed through the wire; the half-cells must be separated and joined by a salt bridge that carries ions to keep neutrality.', outcome: 'Separating the half-reactions is what forces electrons through the external circuit; the bridge completes the loop with ions, not electrons.' },
                { text: 'The salt bridge is missing, and that\'s the problem because the bridge is what carries electrons between the two electrodes.', outcome: 'Close on the diagnosis, wrong on the mechanism — electrons travel the wire; the bridge migrates ions to prevent charge build-up.', reveals: 'bridge-carries-electrons' },
                { text: 'The LED is fine — it just won\'t glow because in a galvanic cell the anode is positive, so he wired the polarity backwards.', outcome: 'In a galvanic cell the anode is the negative terminal (electrons leave there); reversed polarity labels are the electrolytic convention.', reveals: 'galvanic-anode-positive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'Galvanic cells, electrode potentials, the Nernst equation — you now know why your phone charges and why iron rusts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_007', difficulty: 'standard',
          question: 'Faraday\'s laws of electrolysis establish the quantitative relationship between.',
          hint: 'Review balancing half-reactions (Class 11 Redox Reactions) and mole concept (Class 11.',
          misconception: 'Students routinely write the wrong half-reaction for the electrode process, leading to an incorrect \'n\'.',
          parts: [
                { id: 'a', prompt: 'Explain why 96500 C of electricity liberates 108 g of silver from Ag⁺ but only 31.75 g of copper from Cu²⁺, even though the charge is the same.', answer: 'The same charge (1 F) provides 1 mole of electrons',
                  options: ['The same charge (1 F) provides 1 mole of electrons', 'different molar masses'],
                  hint: 'Review balancing half-reactions (Class 11 Redox Reactions) and mole concept (Class 11 Some Basic.',
                  misconception: 'Students routinely write the wrong half-reaction for the electrode process, leading to an incorrect \'n\'.' }
          ],
            remediations: { 'students-routinely-write-the-wrong': { steps: ['If a student consistently gets the wrong \'n\', they must immediately revisit Class 11 node c11_chem_cbse_08_003.', 'Practice writing reduction half-reactions for common cations: Ag⁺, Cu²⁺, Zn²⁺, Al³⁺, Na⁺, Mg²⁺, Cr₂O₇²⁻, MnO₄⁻.', 'For each, balance atoms, then charge with electrons.', 'Only after confidently writing 10 correct half-reactions should they return to Faraday calculations.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_008', difficulty: 'standard',
          question: 'A battery is a galvanic cell (or series of galvanic cells) that converts.',
          hint: 'Revisit c12_chem_cbse_02_001 for galvanic cell basics and c12_chem_cbse_02_003 for Nernst.',
          misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the.',
          parts: [
                { id: 'a', prompt: 'State the anode, cathode, electrolyte, and approximate cell potential of a commercial dry cell (Leclanche cell).', answer: 'Anode: Zinc container (Zn), Cathode: Graphite rod surrounded by MnO₂ and carbon,',
                  options: ['Anode: Zinc container (Zn), Cathode: Graphite rod surrounded by MnO₂ and carbon,', 'carbon as anode or KOH as electrolyte'],
                  hint: 'Revisit c12_chem_cbse_02_001 for galvanic cell basics and c12_chem_cbse_02_003 for Nernst equation.',
                  misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the correct MnO₂ + NH₄⁺.' },
                { id: 'b', prompt: 'Explain why the voltage of a mercury cell remains constant throughout its life while a dry cell voltage decreases gradually.', answer: 'Mercury cell overall reaction: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)',
                  options: ['Mercury cell overall reaction: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)', 'mercury cell has no electrolyte', 'dry cell has no concentration change'],
                  hint: 'Revisit c12_chem_cbse_02_001 for galvanic cell basics and c12_chem_cbse_02_003 for Nernst equation.',
                  misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the correct MnO₂ + NH₄⁺.' },
                { id: 'c', prompt: 'A nickel-cadmium cell is being charged. Write the half-reactions at each electrode during charging and state the overall charging reaction.', answer: 'During charging (reverse of discharge): Anode (oxidation): 2Ni(OH)₂(s) + 2OH⁻ →',
                  options: ['During charging (reverse of discharge): Anode (oxidation): 2Ni(OH)₂(s) + 2OH⁻ →', 'charging'],
                  hint: 'Revisit c12_chem_cbse_02_001 for galvanic cell basics and c12_chem_cbse_02_003 for Nernst equation.',
                  misconception: 'Students write the dry cell cathode reaction as MnO₂ + 4H⁺ + 4e⁻ → Mn²⁺ + 2H₂O (acidic medium reduction) instead of the correct MnO₂ + NH₄⁺.' }
          ],
            remediations: { 'students-write-the-dry-cell': { steps: ['Revisit c12_chem_cbse_02_001 (Galvanic vs Electrolytic Cells) to reinforce anode/cathode identification.', 'Review c11_chem_cbse_08_003 (Half-Reaction Method) to practice balancing in neutral/ammonium media.', 'Write the dry cell half-reactions from memory, then check against NCERT Fig 2.8.', 'Complete Intext Question 2.13 (lead battery recharging) to practice reverse reactions.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_009', difficulty: 'standard',
          question: 'A hydrogen-oxygen fuel cell is a galvanic cell that directly converts the.',
          hint: 'If stuck, practice balancing: H₂ + 2OH⁻ → 2H₂O + 2e⁻ (oxidation) and O₂ + 2H₂O + 4e⁻ →.',
          misconception: 'Students often write the half-reactions in acidic medium: Anode: H₂ → 2H⁺ + 2e⁻; Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O.',
          parts: [
                { id: 'a', prompt: 'Why are porous carbon electrodes impregnated with platinum or palladium used in a hydrogen-oxygen fuel cell instead of solid metal plates?', answer: 'Porous carbon provides high surface area for gas diffusion (H₂ and O₂) into the',
                  options: ['Porous carbon provides high surface area for gas diffusion (H₂ and O₂) into the', 'to conduct electricity better'],
                  hint: 'If stuck, practice balancing: H₂ + 2OH⁻ → 2H₂O + 2e⁻ (oxidation) and O₂ + 2H₂O + 4e⁻ → 4OH⁻.',
                  misconception: 'Students often write the half-reactions in acidic medium: Anode: H₂ → 2H⁺ + 2e⁻; Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O.' }
          ],
            remediations: { 'students-often-write-the-half': { steps: ['Revisit c11_chem_cbse_08_003 (Balancing Redox Reactions: Half-Reaction Method) — practice balancing in basic medium.', 'Review c12_chem_cbse_02_001 (Galvanic Cells) — distinguish closed system (battery) vs open system (fuel cell).', 'Re-read NCERT Section 2.7: note "concentrated aqueous sodium hydroxide solution" and the given half-reactions.', 'Re-diagnostic: Write both acidic and alkaline half-reactions for H₂/O₂ fuel cell and explain why alkaline version.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_02_010', difficulty: 'standard',
          question: 'Corrosion is an electrochemical process where a metal deteriorates due.',
          hint: 'If unable to write the rusting half-reactions or calculate E°cell, review the Daniell.',
          misconception: 'Students often write the rusting reaction as simply 4Fe + 3O₂ → 2Fe₂O₃, treating it as a direct chemical oxidation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Corrosion is an electrochemical process where a metal deteriorates due to oxidation by',
                  options: ['Corrosion is an electrochemical process where a metal deteriorates due to oxidation by', 'An electrochemical cell is a device that interconverts chemical energy and electrical', 'Standard electrode potential (E°) is the potential difference developed between a metal', 'The Nernst equation quantitatively relates the electrode potential of a half-cell (or the'],
                  hint: 'If unable to write the rusting half-reactions or calculate E°cell, review the Daniell cell example.',
                  misconception: 'Students often write the rusting reaction as simply 4Fe + 3O₂ → 2Fe₂O₃, treating it as a direct chemical oxidation.' }
          ],
            remediations: { 'students-often-write-the-rusting': { steps: ['Revisit c12_chem_cbse_02_001 (Electrochemical Cells) to recall galvanic cell components: anode, cathode, salt bridge.', 'Review c12_chem_cbse_02_002 (Standard Electrode Potential) to practice calculating E°cell from half-cell potentials.', 'Re-read the rusting mechanism in NCERT Section 2.8, drawing the corrosion cell diagram with labelled anode/cathode.', 'Re-attempt Diagnostic Question 2 and 4, focusing on the role of each component (O₂, H₂O, H⁺, electrolyte).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
