import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch03_p2: SimDef = {
    id: 'v3_c11_chem_ch03_p2',
    title: 'Classification of Elements and Periodicity · Part 2/3',
    subtitle: 'Test why properties outrank mass, and how atomic number fixed the table\'s anomalies.',
    classLevel: 11, subject: 'chemistry', topic: 'Classification of Elements and Periodicity · Part 2/3',
    chapters: ['c11_chem_ch03'],
    nodeIds: ['c11_chem_cbse_03_007', 'c11_chem_cbse_03_008', 'c11_chem_cbse_03_009', 'c11_chem_cbse_03_010', 'c11_chem_cbse_03_011', 'c11_chem_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chemist stress-testing the periodic table\'s logic', intro: 'A drawer of unlabelled reagent bottles and a table with gaps — your job is to make order defend itself.', goal: 'Distinguish atomic-weight ordering from the modern atomic-number law and use both to place elements.' },
    discovery: {
        question: 'Mendeleev placed tellurium (heavier) before iodine (lighter), breaking his own atomic-weight rule. What justified the swap?',
        options: ['Their chemical properties demanded those group positions', 'He made a measurement error that was quietly corrected later', 'Tellurium had originally been assigned the wrong symbol', 'Heavier elements were always placed later no matter what'],
        answer: 'Their chemical properties demanded those group positions',
        hook: 'Mendeleev trusted properties over his own rule — Moseley\'s X-rays later proved atomic number was the real ordering all along.',
    },
    teaching: [
        { title: 'Trends: Ionic Radius', text: 'Ionic radius is the effective distance from the nucleus of an ion to the outermost electron cloud, estimated from internuclear distances in ionic crystals; it decreases for cations (loss of electrons.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_03_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Slot four unknown elements into a Mendeleev-style group, predict a missing element\'s chloride formula, then place element 35 in the modern table.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_007', title: 'Trends: Ionic Radius',
          scaffold: { problem: 'The internuclear distance in NaCl crystal is 282 pm. In KCl, it is 314 pm.',
            steps: [
            { text: 'In NaCl, d(Na⁺-Cl⁻) = r(Na⁺) + r(Cl⁻) = 282 pm. Substitute r(Cl⁻) = 181 pm → r(Na⁺) = 282 - 181 = 101 pm.' },
            { text: 'In KCl, d(K⁺-Cl⁻) = r(K⁺) + r(Cl⁻) = 314 pm. Substitute r(Cl⁻) = 181 pm → r(K⁺) = 314 - 181 = 133 pm.' },
            { text: 'Verify trend: Na⁺ (Period 3) < K⁺ (Period 4) — radius increases down Group 1, consistent with new shell addition.' },
            { text: 'For KBr, d(K⁺-Br⁻) = r(K⁺) + r(Br⁻) = 133 pm + 196 pm = 329 pm.' },
            { text: 'Check consistency: KBr distance (329 pm) > KCl (314 pm) because Br⁻ > Cl⁻, as expected down Group 17.', faded: true, blankAnswer: 'r(Na⁺) = 101 pm, r(K⁺) = 133 pm, d(KBr) = 329 pm' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_008', title: 'Trends: Ionisation Enthalpy',
          scaffold: { problem: 'The first ionisation enthalpies of Period 3 elements are: Na (496), Mg (737), Al (577), Si (786), P (1012), S (1000), Cl (1251), Ar (1520).',
            steps: [
            { text: 'Plot ΔiH vs atomic number for Z=11-18 to visualise the general increasing trend with two dips.' },
            { text: 'Identify the dips: Al (577) < Mg (737) and S (1000) < P (1012).' },
            { text: 'Write valence configurations: Mg [Ne]3s², Al [Ne]3s²3p¹, P [Ne]3s²3p³, S [Ne]3s²3p⁴.' },
            { text: 'For Al vs Mg: Electron removed from Al is 3p¹ (shielded by 3s², higher n_eff), from Mg is 3s² (better penetration.' },
            { text: 'For S vs P: P has 3p³ with three unpaired electrons (Hund\'s rule, exchange energy stability).', faded: true, blankAnswer: 'Anomaly 1: Al < Mg due to 3p electron removal vs 3s.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_009', title: 'Trends: Electron Gain Enthalpy',
          caseStudy: { intro: 'Observe a sodium vapour lamp glowing yellow-orange — that light comes from excited Na atoms losing energy, not gaining electrons.',
            decisions: [{ prompt: 'State the precise IUPAC definition of first electron gain enthalpy, including the physical states of all species and the standard.', options: [
                { text: 'First electron gain enthalpy (ΔegH) is the enthalpy change when one mole of electrons is', outcome: 'First electron gain enthalpy (ΔegH) is the enthalpy change when one mole of electrons is added.' },
                { text: 'gaseous', outcome: 'Not quite — Students believe "more negative electron gain enthalpy always means higher electronegativity" and.', reveals: 'more-negative-electron-gain-enthalpy' },
                { text: 'ground state', outcome: 'Not quite — Students believe "more negative electron gain enthalpy always means higher electronegativity" and.', reveals: 'more-negative-electron-gain-enthalpy' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_010', title: 'Trends: Electronegativity',
          scaffold: { problem: 'In the industrial production of hydrogen fluoride (HF) from calcium fluoride (CaF₂) and concentrated H₂SO₄, the HF gas is dissolved.',
            steps: [
            { text: 'Identify the bonded atoms and their Pauling EN values from the given data.' },
            { text: 'Calculate ΔEN for H–F = |4.0 - 2.1| = 1.9; ΔEN for H–Cl = |3.0 - 2.1| = 0.9.' },
            { text: 'Based on ΔEN alone, H–F has larger polarity → expect easier H⁺ release → stronger acid.' },
            { text: 'Recall actual behaviour: HF is weak acid (Ka ≈ 6.6×10⁻⁴), HCl is strong acid (fully dissociated).' },
            { text: 'Explain anomaly: H–F bond is very short (high bond dissociation energy 565 kJ/mol) and F⁻ is heavily hydrated, but the.', faded: true, blankAnswer: 'ΔEN(H–F)=1.9, ΔEN(H–Cl)=0.9; polarity prediction fails for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_011', title: 'Periodic Trends in Chemical Properties: Valency',
          scaffold: { problem: 'Predict the formula of the binary compound formed between gallium (Ga, Z=31) and selenium (Se, Z=34) using the valency cross-rule.',
            steps: [
            { text: 'Locate Ga and Se in the periodic table. Ga is in Group 13, Period 4 (p-block). Se is in Group 16, Period 4 (p-block).' },
            { text: 'Assign valencies. For p-block metals (Groups 13–14), valency = group number → Ga valency = 3.' },
            { text: 'Apply cross-multiplication rule. Write symbols with valencies as superscripts: Ga³ Se². Cross valencies: Ga₂ Se₃.' },
            { text: 'Check if subscripts can be simplified. HCF of 2 and 3 is 1 → formula is Ga₂Se₃.' },
            { text: 'Verify using oxidation states. Electronegativity: Se (2.55) > Ga (1.81).' },
            { text: 'Final answer with chemical reasoning.', faded: true, blankAnswer: 'Ga₂Se₃ (gallium(III) selenide); oxidation states: Ga = +3.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_012', title: 'Periodic Trends: Metallic and Non-Metallic Character',
          caseStudy: { intro: 'Observe a piece of aluminium foil (metallic, shiny, malleable) and a piece of sulphur powder (non-metallic, yellow, brittle) from your kitchen/lab.',
            decisions: [{ prompt: 'State the trend in metallic character across a period (left to right) and down a group in the modern periodic table.', options: [
                { text: 'Metallic character decreases across a period (left to right) and increases down a group', outcome: 'Metallic character decreases across a period (left to right) and increases down a group.' },
                { text: 'increases across period', outcome: 'Not quite — Students often think metallic character and electropositivity are identical and both simply.', reveals: 'metallic-character-and-electropositivity-are' },
                { text: 'increase down, decrease across', outcome: 'Not quite — Students often think metallic character and electropositivity are identical and both simply.', reveals: 'metallic-character-and-electropositivity-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a chemistry-day exhibit your team rebuilds Mendeleev\'s card-sorting method: each card carries an element\'s atomic weight plus its oxide and hydride formulae. Sorting by weight puts tellurium (127.6) before iodine (126.9) — but Te\'s compounds look like sulphur\'s family while iodine\'s look like chlorine\'s. A member insists: \'Atomic weight is the law; never swap the order.\'',
            decisions: [{ prompt: 'What did Mendeleev actually do here?', options: [
                { text: 'He inverted them — placing Te in Group VI with S/Se and iodine in Group VII with Cl/Br — because chemical behaviour (valency, compound formulae) was his primary classifier and atomic weight only the ordering aid. The same inversions (Ar/K, Co/Ni) exposed the limit of weight-based ordering and pointed toward atomic number.', outcome: 'Mendeleev\'s genius was trusting chemistry over arithmetic; the \'anomalous pairs\' later became evidence that atomic number, not weight, is the real ordering parameter.' },
                { text: 'The member is right — periodic law means strict weight order, so Te stays before I even if properties mismatch.', outcome: 'That misreads the law: Mendeleev broke weight order whenever chemistry demanded it — properties were the function, weight just the rough index.', reveals: 'weight-order-is-absolute' },
                { text: 'Leave both out of the table — elements that don\'t fit the order get discarded.', outcome: 'Mendeleev did the opposite: he left deliberate gaps for unknown elements (eka-aluminium, eka-silicon) but never dropped a known one for misbehaving.', reveals: 'misfits-get-discarded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The periodic table works because electron configurations repeat — atomic number just made the pattern honest.',
            decisions: [{ prompt: 'What comes next? Classification of Elements and Periodicity · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Classification of Elements and Periodicity · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_007', difficulty: 'standard',
          question: 'Ionic radius is the effective distance from the nucleus of an ion to the.',
          hint: 'If stuck, revisit c11_chem_cbse_03_004 (electronic configuration) to practice writing.',
          misconception: 'Students often apply neutral-atom periodic trends to ions: they think "Na⁺ is in Period 3, so it\'s larger than F⁻.',
          parts: [
                { id: 'a', prompt: 'Explain why the Na⁺ ion (95 pm) is smaller than the Na atom (186 pm) while the Cl⁻ ion (181 pm) is larger than the Cl atom (99 pm), using the concepts.', answer: 'Na⁺ has 10 electrons vs Na\'s 11, but the same nuclear charge (+11)',
                  options: ['Na⁺ has 10 electrons vs Na\'s 11, but the same nuclear charge (+11)', 'Na⁺ is smaller because it lost mass'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (electronic configuration) to practice writing.',
                  misconception: 'Students often apply neutral-atom periodic trends to ions: they think "Na⁺ is in Period 3, so it\'s larger than F⁻ in Period 2" or "Mg²⁺.' }
          ],
            remediations: { 'students-often-apply-neutral-atom': { steps: ['Write the electron configuration of each ion (e.g., Na⁺: 1s²2s²2p⁶; F⁻: 1s²2s²2p⁶).', 'Count total electrons — confirm they are isoelectronic.', 'List nuclear charges (Z): Na⁺=11, F⁻=9.', 'Higher Z pulls same electron cloud tighter → smaller radius.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_008', difficulty: 'standard',
          question: 'Ionisation Enthalpy (ΔiH) is the minimum amount of energy required to remove.',
          hint: 'If stuck, revisit c11_chem_cbse_03_004 (Electronic Configuration and Periodic Table) and.',
          misconception: 'Students believe "ionisation enthalpy always increases across a period" and apply this blindly, failing to identify.',
          parts: [
                { id: 'a', prompt: 'Explain why the first ionisation enthalpy of boron (Z=5) is lower than beryllium (Z=4) despite boron having a higher nuclear charge.', answer: 'In Be (1s²2s²), the electron removed is a 2s-electron',
                  options: ['In Be (1s²2s²), the electron removed is a 2s-electron', 'ionisation enthalpy always increases across a period'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (Electronic Configuration and Periodic Table) and practice.',
                  misconception: 'Students believe "ionisation enthalpy always increases across a period" and apply this blindly, failing to identify that Group 13 (B,.' },
                { id: 'b', prompt: 'Given: ΔiH₁(Na) = 496 kJ mol⁻¹, ΔiH₁(Mg) = 737 kJ mol⁻¹, ΔiH₁(Al) = 577 kJ mol⁻¹.', answer: 'ΔiH₁(Si) ≈ 786 kJ mol⁻¹ (closer to 760)',
                  options: ['ΔiH₁(Si) ≈ 786 kJ mol⁻¹ (closer to 760)', 'ionisation enthalpy always increases across a period'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (Electronic Configuration and Periodic Table) and practice.',
                  misconception: 'Students believe "ionisation enthalpy always increases across a period" and apply this blindly, failing to identify that Group 13 (B,.' },
                { id: 'c', prompt: 'Compare the first ionisation enthalpies of nitrogen (1402 kJ mol⁻¹) and oxygen (1314 kJ mol⁻¹).', answer: 'N: 1s²2s²2p³ (three unpaired electrons in separate 2p orbitals, Hund\'s rule)',
                  options: ['N: 1s²2s²2p³ (three unpaired electrons in separate 2p orbitals, Hund\'s rule)', 'ionisation enthalpy always increases across a period'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (Electronic Configuration and Periodic Table) and practice.',
                  misconception: 'Students believe "ionisation enthalpy always increases across a period" and apply this blindly, failing to identify that Group 13 (B,.' }
          ],
            remediations: { 'ionisation-enthalpy-always-increases-across': { steps: ['Draw the orbital filling diagram for Be (1s²2s²) and B (1s²2s²2p¹) side by side.', 'Identify which electron is removed in each case (2s vs 2p).', 'Use the "penetration order" s > p > d > f to explain why 2s electron feels more nuclear attraction.', 'Repeat for N (2p³, all unpaired) vs O (2p⁴, one paired) - draw the orbital boxes showing paired electrons in O.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "ionisation enthalpy always increases across a period" and apply this blindly, failing to identify.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The second ionisation enthalpy of sodium is higher than the first ionisation enthalpy of magnesium because Na⁺ has a higher nuclear.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'nuclear charge', 'principal quantum level of electron removed', 'ionisation enthalpy always increases across a period'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (Electronic Configuration and Periodic Table) and practice.',
                  misconception: 'Students believe "ionisation enthalpy always increases across a period" and apply this blindly, failing to identify that Group 13 (B,.' }
          ],
            remediations: { 'ionisation-enthalpy-always-increases-across': { steps: ['Draw the orbital filling diagram for Be (1s²2s²) and B (1s²2s²2p¹) side by side.', 'Identify which electron is removed in each case (2s vs 2p).', 'Use the "penetration order" s > p > d > f to explain why 2s electron feels more nuclear attraction.', 'Repeat for N (2p³, all unpaired) vs O (2p⁴, one paired) - draw the orbital boxes showing paired electrons in O.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_009', difficulty: 'standard',
          question: 'Electron Gain Enthalpy (ΔegH) is the enthalpy change when one mole of electrons.',
          hint: 'Review "c11_chem_cbse_03_004: Electronic Configuration and Periodic Table" for orbital.',
          misconception: 'Students believe "more negative electron gain enthalpy always means higher electronegativity" and use the terms.',
          parts: [
                { id: 'a', prompt: 'Explain why the first electron gain enthalpy of fluorine (-328 kJ mol⁻¹) is less negative than that of chlorine (-349 kJ mol⁻¹) despite fluorine having higher.', answer: 'Fluorine\'s 2p subshell is compact (n=2)',
                  options: ['Fluorine\'s 2p subshell is compact (n=2)', 'more negative electron gain enthalpy always means higher electronegativity'],
                  hint: 'Review "c11_chem_cbse_03_004: Electronic Configuration and Periodic Table" for orbital filling.',
                  misconception: 'Students believe "more negative electron gain enthalpy always means higher electronegativity" and use the terms interchangeably.' }
          ],
            remediations: { 'more-negative-electron-gain-enthalpy': { steps: ['Revisit the definition of ΔegH — write the thermochemical equation with states (g) and conditions (298 K, 1 bar).', 'Draw the 2p and 3p orbital diagrams for O/F vs S/Cl showing electron pairing.', 'Calculate Coulombic repulsion energy qualitatively: E ∝ q₁q₂/r; for 2p, r is smaller → larger repulsion.', 'Construct a table contrasting ΔegH (gas-phase, measurable, kJ mol⁻¹) vs electronegativity (bonded-atom, relative.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_010', difficulty: 'standard',
          question: 'Electronegativity is a qualitative measure of the ability of an atom in.',
          hint: 'If stuck, review "Trends: Atomic Radius" (c11_chem_cbse_03_006) and "Trends: Ionisation.',
          misconception: 'Students think electronegativity is a fixed atomic property like atomic number, and that "fluorine is 4.0" means.',
          parts: [
                { id: 'a', prompt: 'Given Pauling EN values: H=2.1, Cl=3.0, Br=2.8, I=2.5. Calculate the electronegativity difference (ΔEN) for H–Cl, H–Br, and H–I bonds.', answer: 'ΔEN(H–Cl)=0.9, ΔEN(H–Br)=0.7, ΔEN(H–I)=0.6',
                  options: ['ΔEN(H–Cl)=0.9, ΔEN(H–Br)=0.7, ΔEN(H–I)=0.6', 'fluorine is 4.0', 'chlorine has highest electron affinity, so it must have highest EN'],
                  hint: 'If stuck, review "Trends: Atomic Radius" (c11_chem_cbse_03_006) and "Trends: Ionisation Enthalpy".',
                  misconception: 'Students think electronegativity is a fixed atomic property like atomic number, and that "fluorine is 4.0" means it always attracts.' },
                { id: 'b', prompt: 'Compare the electronegativity trends of Period 3 elements (Na to Cl) with their first ionisation enthalpy trends. Are there any anomalies?', answer: 'Both generally increase left-to-right',
                  options: ['Both generally increase left-to-right', 'no anomalies', 'fluorine is 4.0', 'chlorine has highest electron affinity, so it must have highest EN'],
                  hint: 'If stuck, review "Trends: Atomic Radius" (c11_chem_cbse_03_006) and "Trends: Ionisation Enthalpy".',
                  misconception: 'Students think electronegativity is a fixed atomic property like atomic number, and that "fluorine is 4.0" means it always attracts.' }
          ],
            remediations: { 'electronegativity-is-a-fixed-atomic': { steps: ['Revisit atomic radius (c11_chem_cbse_03_006) and effective nuclear charge (c11_chem_cbse_03_008).', 'Use a tangible analogy – two people (nuclei) pulling a rope (shared electrons); the stronger, closer person wins.', 'Plot EN vs atomic radius for Period 2 and Group 1 on graph paper to visualise inverse relationship.', 'Compare EN values of carbon in CH₄ (sp³, 2.5) vs HC≡CH (sp, 3.3) from a data table to see variation.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_011', difficulty: 'standard',
          question: 'Valency is the combining capacity of an element, numerically equal to the.',
          hint: 'If stuck, review c11_chem_cbse_03_004 (electronic configuration → group/period/block) and.',
          misconception: 'Students treat valency and oxidation state as interchangeable fixed numbers for an element.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Valency is the combining capacity of an element, numerically equal to the number of',
                  options: ['Valency is the combining capacity of an element, numerically equal to the number of', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'The Modern Periodic Law states that the physical and chemical properties of elements are', 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)'],
                  hint: 'If stuck, review c11_chem_cbse_03_004 (electronic configuration → group/period/block) and.',
                  misconception: 'Students treat valency and oxidation state as interchangeable fixed numbers for an element.' }
          ],
            remediations: { 'students-treat-valency-and-oxidation': { steps: ['Revisit electronegativity trend (c11_chem_cbse_03_010) — list EN values: F (4.0) > O (3.5) > Cl (3.0) > N (3.0) >.', 'For any binary compound, identify the more electronegative element — it takes the negative oxidation state equal to its.', 'Assign the positive oxidation state to the less electronegative element by charge balance.', 'Practise with 5 compounds: NaCl, MgO, AlCl₃, Cl₂O₇, PCl₅ — write oxidation states, not just valencies.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_012', difficulty: 'standard',
          question: 'Metallic character is the tendency of an element to lose electrons and form.',
          hint: 'Review c11_chem_cbse_03_008 (Ionization Enthalpy trends) focusing on effective nuclear.',
          misconception: 'Students often think metallic character and electropositivity are identical and both simply "increase down, decrease.',
          parts: [
                { id: 'a', prompt: 'Explain why the metallic character of elements increases down Group 1 but decreases across Period 3, using the concepts of atomic radius and effective nuclear.', answer: 'Down Group 1, atomic radius increases significantly as a new shell is added',
                  options: ['Down Group 1, atomic radius increases significantly as a new shell is added', 'increase down, decrease across', 'most negative electron gain enthalpy', 'most non-metallic'],
                  hint: 'Review c11_chem_cbse_03_008 (Ionization Enthalpy trends) focusing on effective nuclear charge.',
                  misconception: 'Students often think metallic character and electropositivity are identical and both simply "increase down, decrease across" without.' },
                { id: 'b', prompt: 'Given the first ionization enthalpies (kJ mol⁻¹): Na = 496, Mg = 737, Al = 577, Si = 786, P = 1012, S = 1000, Cl = 1251, Ar = 1520.', answer: 'Increasing metallic character: Cl < S < P < Si < Al < Mg < Na',
                  options: ['Increasing metallic character: Cl < S < P < Si < Al < Mg < Na', 'increase down, decrease across', 'most negative electron gain enthalpy', 'most non-metallic'],
                  hint: 'Review c11_chem_cbse_03_008 (Ionization Enthalpy trends) focusing on effective nuclear charge.',
                  misconception: 'Students often think metallic character and electropositivity are identical and both simply "increase down, decrease across" without.' }
          ],
            remediations: { 'metallic-character-and-electropositivity-are': { steps: ['If a student cannot explain the Al vs Mg anomaly: Step 1 — Write electronic configurations: Mg [Ne]3s², Al [Ne]3s²3p¹.', 'Step 2 — Recall penetration order: s > p.', 'Step 3 — Explain that Al\'s 3p¹ electron is shielded by 3s² electrons and experiences lower Zeff than Mg\'s 3s² electrons.', 'Step 4 — Conclude IE(Al) < IE(Mg) → Al more metallic.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
