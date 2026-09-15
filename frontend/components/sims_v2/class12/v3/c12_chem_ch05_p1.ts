import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch05_p1: SimDef = {
    id: 'v3_c12_chem_ch05_p1',
    title: 'Coordination Compounds · Part 1/2',
    subtitle: 'Same formula, different colour — the secret life inside the square brackets',
    classLevel: 12, subject: 'chemistry', topic: 'Coordination Compounds · Part 1/2',
    chapters: ['c12_chem_ch05'],
    nodeIds: ['c12_chem_cbse_05_001', 'c12_chem_cbse_05_002', 'c12_chem_cbse_05_003', 'c12_chem_cbse_05_004', 'c12_chem_cbse_05_005', 'c12_chem_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coordination chemist', intro: 'A century ago, coloured cobalt salts made no sense. Werner\'s two-valence idea cracked them open — and invented modern inorganic chemistry.', goal: 'Apply Werner\'s theory — primary vs secondary valence — to write formulations, predict ionisation and classify isomerism in complexes.' },
    discovery: {
        question: 'Two compounds share the exact formula CoCl₃·4NH₃ — one is green, one is violet, and each throws down only 1 mole of AgCl with AgNO₃. How can identical recipes give different compounds?',
        options: ['Two chlorides sit inside the coordination sphere bound to cobalt — the pair differ only in geometry (cis vs trans), and only the one chloride outside can precipitate', 'One sample must be impure — same formula can\'t give different colours', 'The ammonia count differs inside each batch', 'AgNO₃ always precipitates every chloride in a compound'],
        answer: 'Two chlorides sit inside the coordination sphere bound to cobalt — the pair differ only in geometry (cis vs trans), and only the one chloride outside can precipitate',
        hook: 'Students read CoCl₃·4NH₃ as \'3 loose chlorides.\' Werner\'s insight: ligands split between an inner sphere (non-ionizable, fixed coordination number 6) and outer counter-ions. Precipitation data is the detective tool that reveals which atoms live inside the brackets.',
    },
    teaching: [
        { title: 'Werner\'s Theory of Coordination Compounds', text: 'Werner\'s theory proposes that in coordination compounds, a central metal atom/ion exhibits two distinct types of valence: (i) **primary valence** (ionizable, equals oxidation state, satisfied only.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_05_001', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Play Werner: use AgNO₃ precipitation and conductivity to write the true bracketed formula of cobalt-ammine chlorides, then name complexes by IUPAC rules and sort their isomers.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_001', title: 'Werner\'s Theory of Coordination Compounds',
          caseStudy: { intro: 'Observe what happens when you add concentrated ammonia to a pink solution of cobalt(II) chloride — it turns blue, then on standing in air forms various.',
            decisions: [{ prompt: 'Define primary valence and secondary valence according to Werner\'s theory. Give one example of a ligand that satisfies each type of valence.', options: [
                { text: 'Primary valence = ionizable valence = oxidation state of central metal, satisfied only by', outcome: 'Primary valence = ionizable valence = oxidation state of central metal, satisfied only by anions.' },
                { text: 'primary valence is coordination number', outcome: 'Not quite — Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they.', reveals: 'students-write-the-formulation-of' },
                { text: 'both valences can be satisfied by neutral molecules', outcome: 'Not quite — Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they.', reveals: 'students-write-the-formulation-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_002', title: 'Nomenclature of Coordination Compounds: IUPAC Rules',
          caseStudy: { intro: 'Observe a blister pack of the anticancer drug cisplatin — its generic name is *cis-diamminedichloridoplatinum(II)*, yet the trans isomer *transplatin*.',
            decisions: [{ prompt: 'State the exact IUPAC rule for the order in which ligands are listed in the name of a coordination compound, and give the correct ligand.', options: [
                { text: 'Ligands are listed in **alphabetical order** of their names (ignoring multiplicative', outcome: 'Ligands are listed in **alphabetical order** of their names (ignoring multiplicative prefixes like.' },
                { text: 'alphabetical order of formulas', outcome: 'Not quite — Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine.', reveals: 'students-alphabetize-ligand-formulas-e' },
                { text: 'ammonia/water', outcome: 'Not quite — Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine.', reveals: 'students-alphabetize-ligand-formulas-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_003', title: 'Isomerism in Coordination Compounds: Structural',
          caseStudy: { intro: 'Imagine you have two bottles of a violet crystalline solid, both labelled "CrCl₃·6H₂O".',
            decisions: [{ prompt: 'Write the formulas of the two linkage isomers formed when the ambidentate ligand SCN⁻ binds to a metal centre M.', options: [
                { text: 'The two linkage isomers are M–SCN (thiocyanato, S-donor) and M–NCS (isothiocyanato,', outcome: 'The two linkage isomers are M–SCN (thiocyanato, S-donor) and M–NCS (isothiocyanato, N-donor).' },
                { text: 'water is involved', outcome: 'Not quite — Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br.', reveals: 'students-often-confuse-ionisation-isomerism' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_004', title: 'Isomerism: Geometrical and Optical',
          caseStudy: { intro: 'Begin with a real-world observation: a student notices that two samples of [Co(NH₃)₄Cl₂]Cl have different colours (violet vs green) and different chemical.',
            decisions: [{ prompt: '[REMEMBER] Write the IUPAC names of the two geometrical isomers of [Pt(NH₃)₂Cl₂] and state which one is used as an anticancer drug.', options: [
                { text: 'cis-diamminedichloridoplatinum(II) and trans-diamminedichloridoplatinum(II)', outcome: 'cis-diamminedichloridoplatinum(II) and trans-diamminedichloridoplatinum(II).' },
                { text: 'diamminedichloridoplatinum(II)', outcome: 'Not quite — Students often think that ANY complex with didentate ligands shows optical isomerism.', reveals: 'any-complex-with-didentate-ligands' },
                { text: 'both as "diamminedichloridoplatinum(II', outcome: 'Not quite — Students often think that ANY complex with didentate ligands shows optical isomerism.', reveals: 'any-complex-with-didentate-ligands' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_005', title: 'Bonding in Coordination Compounds: VBT',
          scaffold: { problem: 'Determine the hybridisation, geometry, and magnetic moment of [Co(NH₃)₆]Cl₃. (Atomic number of Co = 27)',
            steps: [
            { text: 'Identify the central metal ion and its oxidation state. The complex is [Co(NH₃)₆]³⁺ (since 3 Cl⁻ counter ions).' },
            { text: 'Write the electronic configuration of Co³⁺. Co (Z=27): [Ar] 3d⁷ 4s².' },
            { text: 'Determine ligand field strength. NH₃ is a strong field ligand (from spectrochemical series).' },
            { text: 'Show pairing and hybridisation. 3d⁶: initially 4 unpaired (↑↓ ↑ ↑ ↑).' },
            { text: 'Geometry = octahedral. Unpaired electrons = 0. Magnetic moment μ = √[0(2)] = 0 BM (diamagnetic).', faded: true, blankAnswer: 'Hybridisation = d²sp³, Geometry = octahedral, Magnetic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_006', title: 'Crystal Field Theory: Octahedral and Tetrahedral Fields',
          scaffold: { problem: 'The octahedral complex [Fe(H₂O)₆]²⁺ (Fe²⁺, d⁶) is high-spin with Δo = 10,400 cm⁻¹. The pairing energy P for Fe²⁺ is 12,000 cm⁻¹.',
            steps: [
            { text: 'Identify metal oxidation state and d-electron count. Fe²⁺ is d⁶ (Fe atomic number 26, [Ar] 3d⁶ 4s² → Fe²⁺ loses 4s².' },
            { text: 'Compare Δo and P. Given Δo = 10,400 cm⁻¹, P = 12,000 cm⁻¹ → Δo < P → weak field → high-spin configuration.' },
            { text: 'Fill orbitals for high-spin d⁶: t₂g⁴ e_g² (first 3 electrons singly in t₂g, 4th pairs in t₂g, 5th and 6th go to e_g.' },
            { text: 'Calculate CFSE = [(-0.4 × n_t₂g) + (0.6 × n_e_g)] Δo = [(-0.4 × 4) + (0.6 × 2)] × 10,400 = [-1.6 + 1.2] × 10,400 = -0.4.' },
            { text: 'Unpaired electrons = 4 (t₂g has one paired + two unpaired; e_g has two unpaired).', faded: true, blankAnswer: '(a) t₂g⁴ e_g² (high-spin); (b) CFSE = –4,160 cm⁻¹; (c) 4.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab report says a cobalt compound of formula CoCl₃·5NH₃ precipitates only 2 mol of AgCl per mol with excess AgNO₃. The student writes its structure as [Co(NH₃)₅]Cl₃, keeping all three chlorides outside the brackets.',
            decisions: [{ prompt: 'Does that formulation fit the data?', options: [
                { text: 'No — 2 mol AgCl means only 2 Cl⁻ are ionisable counter-ions; the third Cl⁻ is bound inside the sphere, giving [CoCl(NH₃)₅]Cl₂ with coordination number 6.', outcome: 'Precipitation counts only the primary-valence (ionisable) chlorides; coordinated Cl⁻ stays locked to the metal and never reaches Ag⁺.' },
                { text: 'Yes — \'Cl₃\' in the formula means all three chlorides sit outside the brackets.', outcome: 'That would precipitate 3 mol AgCl and leave coordination number 5 — contradicting both the data and the fixed secondary valence of Co³⁺.', reveals: 'cl3-means-three-outside' },
                { text: 'The AgNO₃ test itself is suspect — complexes like K₄[Fe(CN)₆] release Fe²⁺ freely anyway.', outcome: 'K₄[Fe(CN)₆] fails the Fe²⁺ test precisely because the metal stays inside the sphere — the test is exactly how sphere vs counter-ion is told apart.', reveals: 'complex-releases-metal-ion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now look at a dotted empirical formula and see the hidden architecture inside it. Coordination chemistry is the backbone of board inorganic questions — and of drugs like cisplatin.',
            decisions: [{ prompt: 'What comes next? Coordination Compounds · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Coordination Compounds · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_001', difficulty: 'standard',
          question: 'Werner\'s theory proposes that in coordination compounds, a central metal.',
          hint: 'If stuck, review oxidation number rules (c11_chem_cbse_08_002) and VSEPR shapes for.',
          misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃.',
          parts: [
                { id: 'a', prompt: 'For the compound PtCl₄·2HCl (zero moles AgCl precipitated), determine: (a) oxidation state of Pt, (b) coordination number of Pt, (c) the correct Werner.', answer: 'oxidation state of Pt, (',
                  options: ['oxidation state of Pt, (', 'zero precipitation = all anions coordinated'],
                  hint: 'If stuck, review oxidation number rules (c11_chem_cbse_08_002) and VSEPR shapes for steric number 6.',
                  misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃ (keeping 3 Cl⁻.' },
                { id: 'b', prompt: 'Compare the behaviour in aqueous solution of Mohr\'s salt FeSO₄·(NH₄)₂SO₄·6H₂O (a double salt) and K₄[Fe(CN)₆] (a coordination compound).', answer: 'Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻',
                  options: ['Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻', 'both give Fe²⁺ test', 'K₄[Fe(CN)₆] gives Fe²⁺'],
                  hint: 'If stuck, review oxidation number rules (c11_chem_cbse_08_002) and VSEPR shapes for steric number 6.',
                  misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃ (keeping 3 Cl⁻.' }
          ],
            remediations: { 'students-write-the-formulation-of': { steps: ['Revisit c11_chem_cbse_08_002 (oxidation number rules) — calculate oxidation state of metal in [Co(NH₃)₆]Cl₃.', 'For each, count total ligands (NH₃ + Cl) directly bonded to Co — verify it\'s always 6.', 'Practice the "AgCl precipitation = primary valence chloride count" rule: given precipitation data, work backward.', 'Redo diagnostic questions 2 and 5, explicitly writing: "Total Cl = 3. Precipitated Cl = x.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_002', difficulty: 'standard',
          question: 'IUPAC nomenclature of coordination compounds provides a systematic set of rules.',
          hint: 'Revisit c12_chem_cbse_05_001 (Werner\'s Theory) to practice identifying coordination.',
          misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name for [Co(NH₃)₅Cl]Cl₂. Show all steps: identify coordination sphere, ligand names, alphabetical order, oxidation state of Co, and final name.', answer: '**Steps**: (1) Coordination sphere: [Co(NH₃)₅Cl]²⁺ (two Cl⁻ counter ions)',
                  options: ['**Steps**: (1) Coordination sphere: [Co(NH₃)₅Cl]²⁺ (two Cl⁻ counter ions)', 'chloridopentaamminecobalt(III) chloride'],
                  hint: 'Revisit c12_chem_cbse_05_001 (Werner\'s Theory) to practice identifying coordination sphere, ligand.',
                  misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.' },
                { id: 'b', prompt: 'Compare the names of [Ni(CO)₄] and [Ni(CN)₄]²⁻. Why does nickel become *nickelate* in the second but not the first? What prefix is used for four CO ligands?', answer: '[Ni(CO)₄] is **neutral** → metal name = nickel(0) → *tetracarbonylnickel(0)*',
                  options: ['[Ni(CO)₄] is **neutral** → metal name = nickel(0) → *tetracarbonylnickel(0)*', 'tetracarbonylnickelate(0)'],
                  hint: 'Revisit c12_chem_cbse_05_001 (Werner\'s Theory) to practice identifying coordination sphere, ligand.',
                  misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.' }
          ],
            remediations: { 'students-alphabetize-ligand-formulas-e': { steps: ['Make flashcards: ligand formula → IUPAC ligand name (e.g., Cl⁻ → chlorido, CN⁻ → cyanido, NH₃ → ammine, H₂O → aqua,.', 'Practice alphabetical sorting of *names* (not formulas) for 10 mixed-ligand complexes.', 'Revisit **c12_chem_cbse_05_001** to re-learn coordination sphere identification and oxidation state calculation.', 'Do the intext Example 5.2 and 5.3 from NCERT line-by-line, writing the reasoning for each step.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_003', difficulty: 'standard',
          question: 'Structural isomerism in coordination compounds occurs when two or more.',
          hint: 'If stuck, review c12_chem_cbse_05_002 (Nomenclature) Example 5.2 and 5.3, focusing on the.',
          misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄.',
          parts: [
                { id: 'a', prompt: 'Explain why [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are ionisation isomers. What experimental test would distinguish them?', answer: 'They are ionisation isomers',
                  options: ['They are ionisation isomers', 'water is involved'],
                  hint: 'If stuck, review c12_chem_cbse_05_002 (Nomenclature) Example 5.2 and 5.3, focusing on the step.',
                  misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are hydrate isomers.' },
                { id: 'b', prompt: 'A compound with empirical formula Pt(NH₃)₂Cl₂ exists in two forms. One form precipitates 2 mol AgCl per mol with AgNO₃; the other precipitates N/A.', answer: 'No, these are NOT structural isomers',
                  options: ['No, these are NOT structural isomers', 'yes, ionisation isomerism', 'water is involved'],
                  hint: 'If stuck, review c12_chem_cbse_05_002 (Nomenclature) Example 5.2 and 5.3, focusing on the step.',
                  misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are hydrate isomers.' },
                { id: 'c', prompt: 'Compare the coordination isomers [Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]. Do they have the same overall chemical formula?', answer: 'Yes, same overall formula (Co, Cr, 6 NH₃, 6 CN)',
                  options: ['Yes, same overall formula (Co, Cr, 6 NH₃, 6 CN)', 'water is involved', 'only the overall formula matters, not the local coordination environment'],
                  hint: 'If stuck, review c12_chem_cbse_05_002 (Nomenclature) Example 5.2 and 5.3, focusing on the step.',
                  misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are hydrate isomers.' }
          ],
            remediations: { 'students-often-confuse-ionisation-isomerism': { steps: ['Revisit c12_chem_cbse_05_001 (Werner\'s theory) to recall the distinction between coordination sphere (non-ionisable).', 'Revisit c12_chem_cbse_05_002 (Nomenclature) to practice writing formulas from names — this forces you to place ligands.', 'Draw the two isomers for each type side-by-side, labelling the coordination sphere with square brackets.', 'For each pair, write the ions produced in aqueous solution and predict AgNO₃ / BaCl₂ test results.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_004', difficulty: 'standard',
          question: 'Geometrical isomerism in coordination compounds arises due to different spatial.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR shapes) and practice drawing.',
          misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.',
          parts: [
                { id: 'a', prompt: '[REMEMBER] Write the IUPAC names of the two geometrical isomers of [Pt(NH₃)₂Cl₂] and state which one is used as an anticancer drug.', answer: 'cis-diamminedichloridoplatinum(II) and trans-diamminedichloridoplatinum(II)',
                  options: ['cis-diamminedichloridoplatinum(II) and trans-diamminedichloridoplatinum(II)', 'diamminedichloridoplatinum(II)', 'both as "diamminedichloridoplatinum(II', 'ANY complex with didentate ligands shows optical isomerism'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR shapes) and practice drawing octahedral/square planar.',
                  misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.' }
          ],
            remediations: { 'any-complex-with-didentate-ligands': { steps: ['If a student cannot distinguish geometrical vs optical or misidentifies chirality: 1.', 'Revisit c12_chem_cbse_05_003 (structural isomerism) to reinforce "same formula, different arrangement" concept.', 'Use physical 3D models (or online Jmol) for [Co(en)₃]³⁺ and cis/trans-[Co(en)₂Cl₂]⁺.', 'Rotate them to find planes of symmetry.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.',
          parts: [
                { id: 'a', prompt: '[EVALUATE] A student claims: "[Cr(C₂O₄)₃]³⁻ shows geometrical isomerism because oxalate is a didentate ligand." Is this statement correct? Justify.', answer: 'Incorrect',
                  options: ['Incorrect', 'presence of didentate ligand', 'possibility of geometrical isomerism', 'ANY complex with didentate ligands shows optical isomerism'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR shapes) and practice drawing octahedral/square planar.',
                  misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.' },
                { id: 'b', prompt: '[CREATE] Design a coordination complex of cobalt(III) with coordination number 6 that exhibits exactly three stereoisomers (including optical isomers).', answer: 'Example: [CoCl₂(en)₂]⁺',
                  options: ['Example: [CoCl₂(en)₂]⁺', 'ANY complex with didentate ligands shows optical isomerism'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR shapes) and practice drawing octahedral/square planar.',
                  misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.' }
          ],
            remediations: { 'any-complex-with-didentate-ligands': { steps: ['If a student cannot distinguish geometrical vs optical or misidentifies chirality: 1.', 'Revisit c12_chem_cbse_05_003 (structural isomerism) to reinforce "same formula, different arrangement" concept.', 'Use physical 3D models (or online Jmol) for [Co(en)₃]³⁺ and cis/trans-[Co(en)₂Cl₂]⁺.', 'Rotate them to find planes of symmetry.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_005', difficulty: 'standard',
          question: 'Valence Bond Theory (VBT) for coordination compounds describes the bonding.',
          hint: 'Revisit Class 11 nodes c11_chem_cbse_02_015 (Aufbau Principle and Electronic.',
          misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin,.',
          parts: [
                { id: 'a', prompt: 'What is the hybridization and geometry of the complex [Ni(CN)₄]²⁻ according to VBT? State the oxidation state of Ni and the number of unpaired electrons.', answer: 'Oxidation state of Ni = +2 (d⁸)',
                  options: ['Oxidation state of Ni = +2 (d⁸)', 'All octahedral complexes are sp³d² hybridized', 'inner orbital = low spin', 'outer orbital = high spin'],
                  hint: 'Revisit Class 11 nodes c11_chem_cbse_02_015 (Aufbau Principle and Electronic Configuration) and.',
                  misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so I just pair.' },
                { id: 'b', prompt: 'Predict the hybridization, geometry, and spin-only magnetic moment (in BM) for [Fe(CN)₆]⁴⁻. Show the d-orbital splitting and electron distribution.', answer: 'Fe²⁺ is d⁶',
                  options: ['Fe²⁺ is d⁶', 'All octahedral complexes are sp³d² hybridized', 'inner orbital = low spin', 'outer orbital = high spin'],
                  hint: 'Revisit Class 11 nodes c11_chem_cbse_02_015 (Aufbau Principle and Electronic Configuration) and.',
                  misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so I just pair.' }
          ],
            remediations: { 'all-octahedral-complexes-are-sp': { steps: ['If a student cannot predict hybridization/magnetism: (1) Revisit Class 11 hybridisation (c11_chem_cbse_04_007) and.', '(2) Practice writing electronic configurations of transition metal ions in various oxidation states.', '(3) Memorize the spectrochemical series order (I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO) to classify.', '(4) For a given complex, follow the 5-step algorithm: Oxidation state → dⁿ → Ligand field (strong/weak) → Pairing?'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_006', difficulty: 'standard',
          question: 'Crystal Field Theory (CFT) is an electrostatic model that explains the.',
          hint: 'If stuck on orbital shapes or symmetry labels, revisit c11_chem_cbse_02_014 (Shapes.',
          misconception: 'Students often write the tetrahedral splitting as "t₂g and e_g" (copying octahedral labels) and state Δt = 9/4 Δo.',
          parts: [
                { id: 'a', prompt: 'In an octahedral crystal field, which set of d-orbitals is raised in energy and by how much relative to the barycenter (average energy)?', answer: 'The e_g set (dₓ²₋ᵧ² and d_z²) is raised by +3/5 Δo',
                  options: ['The e_g set (dₓ²₋ᵧ² and d_z²) is raised by +3/5 Δo', 't₂g is raised', 'raised by 2/5 Δo'],
                  hint: 'If stuck on orbital shapes or symmetry labels, revisit c11_chem_cbse_02_014 (Shapes of Atomic.',
                  misconception: 'Students often write the tetrahedral splitting as "t₂g and e_g" (copying octahedral labels) and state Δt = 9/4 Δo (inverting the fraction).' }
          ],
            remediations: { 'students-often-write-the-tetrahedral': { steps: ['Revisit c11_chem_cbse_02_014 (Shapes of Atomic Orbitals) — physically sketch the five d-orbitals and mark which point.', 'Place 6 point charges on ±x, ±y, ±z (octahedral) and 4 at alternate cube corners (tetrahedral).', 'For each geometry, identify which orbitals point toward ligands (more repulsion → higher energy).', 'Derive the 3:2 energy ratio by requiring the barycenter to stay fixed.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
