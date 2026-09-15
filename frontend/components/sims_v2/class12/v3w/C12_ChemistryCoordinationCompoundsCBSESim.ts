import type { SimDef } from '../../engine/types';
import C12_ChemistryCoordinationCompoundsCBSESim from '../../../simulations/c6_12/C12_ChemistryCoordinationCompoundsCBSESim';

/** v3 wrapped master — C12_ChemistryCoordinationCompoundsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrycoordinationcompoundscbsesim: SimDef = {
    id: 'v3w_c12_chemistrycoordinationcompoundscbsesim',
    title: 'Coordination Compounds CBSE',
    subtitle: 'Covers Werner\'s four postulates, primary/secondary valence distinction, coordination.',
    classLevel: 12, subject: 'chemistry', topic: 'Werner\'s Theory of Coordination Compounds',
    chapters: [],
    nodeIds: ['c12_chem_cbse_05_001', 'c12_chem_cbse_05_002', 'c12_chem_cbse_05_003', 'c12_chem_cbse_05_004', 'c12_chem_cbse_05_005', 'c12_chem_cbse_05_009', 'c12_chem_cbse_05_008', 'c12_chem_cbse_04_007', 'c12_chem_cbse_04_002', 'c12_chem_cbse_04_004', 'c12_chem_cbse_04_006', 'c12_chem_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe what happens when you add concentrated ammonia to a pink solution of cobalt(II) chloride — it turns.', goal: 'Master Coordination Compounds CBSE.' },
    discovery: {
        question: 'Compare the behaviour in aqueous solution of Mohr\'s salt FeSO₄·(NH₄)₂SO₄·6H₂O (a double salt) and K₄[Fe(CN)₆] (a coordination compound).',
        options: ['Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻', 'both give Fe²⁺ test', 'K₄[Fe(CN)₆] gives Fe²⁺'],
        answer: 'Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻',
        hook: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃.',
    },
    teaching: [
        { title: 'Werner\'s theory proposes that in.', text: 'Werner\'s theory proposes that in coordination compounds, a central metal atom/ion exhibits two distinct types of valence: (i) **primary valence** (ionizable, equals oxidation state, satisfied only by.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_001', title: 'Werner\'s theory proposes that in.',
          scaffold: { problem: 'A coordination compound of chromium has empirical formula CrCl₃·6H₂O.',
            steps: [
            { text: 'Identify total Cl atoms = 3. AgCl precipitated = 3 mol → all 3 Cl⁻ are ionizable (outside coordination sphere).' },
            { text: 'Since compound is neutral, charge on coordination entity = +3 (balanced by 3 Cl⁻).' },
            { text: 'Secondary valence = number of donor atoms bonded to Cr = 6 (from 6 H₂O). Coordination number = 6.' },
            { text: 'Formulation: [Cr(H₂O)₆]Cl₃. Coordination sphere = [Cr(H₂O)₆]³⁺; counter ions = 3 Cl⁻.' },
            { text: 'Coordination polyhedron = octahedral (CN=6). Verify: 1:3 electrolyte matches [Cr(H₂O)₆]³⁺ + 3Cl⁻ → 4 ions total.', faded: true, blankAnswer: 'Formulation: [Cr(H₂O)₆]Cl₃; Oxidation state: +3;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_002', title: 'IUPAC nomenclature of coordination.',
          scaffold: { problem: 'Write the IUPAC name of the complex [Cr(NH₃)₃(H₂O)₃]Cl₃. This complex is used in chromium electroplating baths.',
            steps: [
            { text: 'Identify the coordination sphere and counter ions. The square brackets enclose [Cr(NH₃)₃(H₂O)₃]³⁺; three Cl⁻ are.' },
            { text: 'List ligands with their IUPAC names. NH₃ = ammine (neutral), H₂O = aqua (neutral). There are three of each.' },
            { text: 'Order ligands alphabetically by name: "ammine" (a) comes before "aqua" (a) — but "ammine" vs "aqua": \'m\' vs \'q\', so.' },
            { text: 'Determine oxidation state of Cr. Let x = oxidation state. Ligands are neutral, so x = charge on complex ion = +3.' },
            { text: 'Assemble name: ligands alphabetically + metal name + oxidation state + counter anion name.', faded: true, blankAnswer: 'triamminetriaquachromium(III) chloride' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_003', title: 'Structural isomerism in coordination.',
          scaffold: { problem: 'A coordination compound has the empirical formula CrCl₃·6H₂O. Three isomers A, B, C are known.',
            steps: [
            { text: 'Recognise that all three have the same empirical formula (Cr, 3 Cl, 6 H₂O) but different AgCl precipitation → different.' },
            { text: 'For A (3 AgCl): all 3 Cl⁻ are counter ions → coordination sphere has 6 H₂O ligands → formula: [Cr(H₂O)₆]Cl₃.' },
            { text: 'For B (2 AgCl): 2 Cl⁻ are counter ions, 1 Cl⁻ is a ligand → coordination sphere has 5 H₂O + 1 Cl → formula:.' },
            { text: 'For C (1 AgCl): 1 Cl⁻ is counter ion, 2 Cl⁻ are ligands → coordination sphere has 4 H₂O + 2 Cl → formula:.' },
            { text: 'Identify isomerism type: hydrate (solvate) isomerism because water molecules exchange between coordination sphere and.' },
            { text: 'Colour differences arise because ligand field strength changes: H₂O is weaker field than Cl⁻?', faded: true, blankAnswer: 'A = [Cr(H₂O)₆]Cl₃ (violet); B = [Cr(H₂O)₅Cl]Cl₂·H₂O.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_004', title: 'Geometrical isomerism in coordination.',
          scaffold: { problem: 'A pharmaceutical company synthesizes a square planar platinum(II) complex [Pt(NH₃)(NO₂)(Cl)(Br)] for potential anticancer activity.',
            steps: [
            { text: 'Identify the geometry: Pt(II) with coordination number 4 is typically square planar (dsp² hybridisation).' },
            { text: 'For square planar MA₂B₂ type, there are 2 isomers (cis/trans). But here all four ligands are different (MABXL type).' },
            { text: 'Draw the three isomers by placing NH₃ at top, then arranging NO₂, Cl, Br at remaining three positions (right, bottom,.' },
            { text: 'Check each isomer for plane of symmetry. In square planar MABXL, each isomer has a plane of symmetry passing through.' },
            { text: 'Conclusion: Three geometrical isomers, zero optical isomers. This matches NCERT statement: "Other square planar complex.', faded: true, blankAnswer: 'Three geometrical isomers (no optical isomers). Structures:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_005', title: 'Valence Bond Theory (VBT) for.',
          scaffold: { problem: 'Determine the hybridisation, geometry, and magnetic moment of [Co(NH₃)₆]Cl₃. (Atomic number of Co = 27)',
            steps: [
            { text: 'Identify the central metal ion and its oxidation state. The complex is [Co(NH₃)₆]³⁺ (since 3 Cl⁻ counter ions).' },
            { text: 'Write the electronic configuration of Co³⁺. Co (Z=27): [Ar] 3d⁷ 4s².' },
            { text: 'Determine ligand field strength. NH₃ is a strong field ligand (from spectrochemical series).' },
            { text: 'Show pairing and hybridisation. 3d⁶: initially 4 unpaired (↑↓ ↑ ↑ ↑).' },
            { text: 'Geometry = octahedral. Unpaired electrons = 0. Magnetic moment μ = √[0(2)] = 0 BM (diamagnetic).', faded: true, blankAnswer: 'Hybridisation = d²sp³, Geometry = octahedral, Magnetic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_009', title: 'Coordination compounds are complex.',
          scaffold: { problem: 'In the cyanide process for gold extraction, 4Au(s) + 8NaCN(aq) + O₂(g) + 2H₂O(l) → 4Na[Au(CN)₂](aq) + 4NaOH(aq).',
            steps: [
            { text: 'Calculate moles of Au = mass / molar mass = 19.7 g / 197 g/mol = 0.100 mol.' },
            { text: 'From stoichiometry, 4 mol Au requires 8 mol CN⁻ → 2 mol CN⁻ per mol Au. Moles CN⁻ needed = 2 × 0.100 = 0.200 mol.' },
            { text: 'Volume of 0.5 M NaCN = moles / M = 0.200 mol / 0.5 mol/L = 0.400 L = 400 mL.' },
            { text: '4 mol Au requires 1 mol O₂ → moles O₂ = 0.100 / 4 = 0.0250 mol.' },
            { text: '4 mol Au produces 4 mol NaOH → moles NaOH = 0.100 mol. Mass = 0.100 × 40 = 4.00 g.', faded: true, blankAnswer: '(a) 400 mL of 0.5 M NaCN, (b) 560 mL O₂ at STP, (c) 4.00 g.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Coordination Compounds CBSE', spots: [
            { id: 's1', label: 'Werners theory proposes that in', prompt: 'Which idea is this? — Werner\'s theory proposes that in coordination compounds, a central metal atom/ion.', answer: 'Werners theory proposes that in', options: ['Werners theory proposes that in', 'IUPAC nomenclature of coordination compounds', 'Structural isomerism in coordination compounds', 'Geometrical isomerism in coordination compounds'] },
            { id: 's2', label: 'IUPAC nomenclature of coordination compounds', prompt: 'Which idea is this? — IUPAC nomenclature of coordination compounds provides a systematic set of rules to name.', answer: 'IUPAC nomenclature of coordination compounds', options: ['IUPAC nomenclature of coordination compounds', 'Werners theory proposes that in', 'Structural isomerism in coordination compounds', 'Geometrical isomerism in coordination compounds'] },
            { id: 's3', label: 'Structural isomerism in coordination compounds', prompt: 'Which idea is this? — Structural isomerism in coordination compounds occurs when two or more compounds have the.', answer: 'Structural isomerism in coordination compounds', options: ['Structural isomerism in coordination compounds', 'Werners theory proposes that in', 'IUPAC nomenclature of coordination compounds', 'Geometrical isomerism in coordination compounds'] },
            { id: 's4', label: 'Geometrical isomerism in coordination compounds', prompt: 'Which idea is this? — Geometrical isomerism in coordination compounds arises due to different spatial.', answer: 'Geometrical isomerism in coordination compounds', options: ['Geometrical isomerism in coordination compounds', 'Werners theory proposes that in', 'IUPAC nomenclature of coordination compounds', 'Structural isomerism in coordination compounds'] },
            { id: 's5', label: 'Valence Bond Theory VBT for', prompt: 'Which idea is this? — Valence Bond Theory (VBT) for coordination compounds describes the bonding between a.', answer: 'Valence Bond Theory VBT for', options: ['Valence Bond Theory VBT for', 'Werners theory proposes that in', 'IUPAC nomenclature of coordination compounds', 'Structural isomerism in coordination compounds'] },
            { id: 's6', label: 'Coordination compounds are complex entities', prompt: 'Which idea is this? — Coordination compounds are complex entities where a central metal atom/ion is bonded to.', answer: 'Coordination compounds are complex entities', options: ['Coordination compounds are complex entities', 'Werners theory proposes that in', 'IUPAC nomenclature of coordination compounds', 'Structural isomerism in coordination compounds'] }
          ] } }
    ],
    explore: { component: C12_ChemistryCoordinationCompoundsCBSESim, prompt: 'Explore the interactive — Coordination Compounds CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_001', difficulty: 'standard',
          question: 'Werner\'s theory proposes that in coordination compounds, a central metal.',
          hint: 'If stuck, review oxidation number rules (c11_chem_cbse_08_002) and VSEPR shapes for.',
          misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃.',
          parts: [
                { id: 'a', prompt: 'For the compound PtCl₄·2HCl (zero moles AgCl precipitated), determine: (a) oxidation state of Pt, (b) coordination number of Pt, (c) the correct Werner.', answer: 'oxidation state of Pt, (',
                  options: ['oxidation state of Pt, (', 'zero precipitation = all anions coordinated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃ (keeping 3 Cl⁻.' },
                { id: 'b', prompt: 'Compare the behaviour in aqueous solution of Mohr\'s salt FeSO₄·(NH₄)₂SO₄·6H₂O (a double salt) and K₄[Fe(CN)₆] (a coordination compound).', answer: 'Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻',
                  options: ['Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻', 'both give Fe²⁺ test', 'K₄[Fe(CN)₆] gives Fe²⁺'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃ (keeping 3 Cl⁻.' }
          ],
            remediations: { 'students-write-the-formulation-of': { steps: ['Revisit c11_chem_cbse_08_002 (oxidation number rules) — calculate oxidation state of metal in [Co(NH₃)₆]Cl₃,.', 'For each, count total ligands (NH₃ + Cl) directly bonded to Co — verify it\'s always 6.', 'Practice the "AgCl precipitation = primary valence chloride count" rule: given precipitation data, work backward to.', 'Redo diagnostic questions 2 and 5, explicitly writing: "Total Cl = 3. Precipitated Cl = x.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃.',
          parts: [
                { id: 'a', prompt: 'Compare the behaviour in aqueous solution of Mohr\'s salt FeSO₄·(NH₄)₂SO₄·6H₂O (a double salt) and K₄[Fe(CN)₆] (a coordination compound).', answer: 'Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻',
                  options: ['Mohr\'s salt dissociates completely into simple ions: Fe²⁺, 2NH₄⁺, 2SO₄²⁻', 'both give Fe²⁺ test', 'K₄[Fe(CN)₆] gives Fe²⁺'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the formulation of CoCl₃·6NH₃ as [Co(NH₃)₆]Cl₃ correctly, but for CoCl₃·5NH₃ they write [Co(NH₃)₅]Cl₃ (keeping 3 Cl⁻.' }
          ],
            remediations: { 'students-write-the-formulation-of': { steps: ['Revisit c11_chem_cbse_08_002 (oxidation number rules) — calculate oxidation state of metal in [Co(NH₃)₆]Cl₃,.', 'For each, count total ligands (NH₃ + Cl) directly bonded to Co — verify it\'s always 6.', 'Practice the "AgCl precipitation = primary valence chloride count" rule: given precipitation data, work backward to.', 'Redo diagnostic questions 2 and 5, explicitly writing: "Total Cl = 3. Precipitated Cl = x.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_002', difficulty: 'standard',
          question: 'IUPAC nomenclature of coordination compounds provides a systematic set of rules.',
          hint: 'Revisit c12_chem_cbse_05_001 (Werner\'s Theory) to practice identifying coordination.',
          misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name for [Co(NH₃)₅Cl]Cl₂. Show all steps: identify coordination sphere, ligand names, alphabetical order, oxidation state of Co, and final name.', answer: '**Steps**: (1) Coordination sphere: [Co(NH₃)₅Cl]²⁺ (two Cl⁻ counter ions)',
                  options: ['**Steps**: (1) Coordination sphere: [Co(NH₃)₅Cl]²⁺ (two Cl⁻ counter ions)', 'chloridopentaamminecobalt(III) chloride'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.' },
                { id: 'b', prompt: 'Compare the names of [Ni(CO)₄] and [Ni(CN)₄]²⁻. Why does nickel become *nickelate* in the second but not the first? What prefix is used for four CO ligands?', answer: '[Ni(CO)₄] is **neutral** → metal name = nickel(0) → *tetracarbonylnickel(0)*',
                  options: ['[Ni(CO)₄] is **neutral** → metal name = nickel(0) → *tetracarbonylnickel(0)*', 'tetracarbonylnickelate(0)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.' }
          ],
            remediations: { 'students-alphabetize-ligand-formulas-e': { steps: ['Make flashcards: ligand formula → IUPAC ligand name (e.g., Cl⁻ → chlorido, CN⁻ → cyanido, NH₃ → ammine, H₂O → aqua, en.', 'Practice alphabetical sorting of *names* (not formulas) for 10 mixed-ligand complexes.', 'Revisit **c12_chem_cbse_05_001** to re-learn coordination sphere identification and oxidation state calculation.', 'Do the intext Example 5.2 and 5.3 from NCERT line-by-line, writing the reasoning for each step.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.',
          parts: [
                { id: 'a', prompt: 'Compare the names of [Ni(CO)₄] and [Ni(CN)₄]²⁻. Why does nickel become *nickelate* in the second but not the first? What prefix is used for four CO ligands?', answer: '[Ni(CO)₄] is **neutral** → metal name = nickel(0) → *tetracarbonylnickel(0)*',
                  options: ['[Ni(CO)₄] is **neutral** → metal name = nickel(0) → *tetracarbonylnickel(0)*', 'tetracarbonylnickelate(0)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students **alphabetize ligand *formulas* (e.g., Cl before NH₃) instead of ligand *names* (ammine before chlorido)**.' }
          ],
            remediations: { 'students-alphabetize-ligand-formulas-e': { steps: ['Make flashcards: ligand formula → IUPAC ligand name (e.g., Cl⁻ → chlorido, CN⁻ → cyanido, NH₃ → ammine, H₂O → aqua, en.', 'Practice alphabetical sorting of *names* (not formulas) for 10 mixed-ligand complexes.', 'Revisit **c12_chem_cbse_05_001** to re-learn coordination sphere identification and oxidation state calculation.', 'Do the intext Example 5.2 and 5.3 from NCERT line-by-line, writing the reasoning for each step.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_003', difficulty: 'standard',
          question: 'Structural isomerism in coordination compounds occurs when two or more.',
          hint: 'If stuck, review c12_chem_cbse_05_002 (Nomenclature) Example 5.2 and 5.3, focusing on the.',
          misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄.',
          parts: [
                { id: 'a', prompt: 'Explain why [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are ionisation isomers. What experimental test would distinguish them?', answer: 'They are ionisation isomers',
                  options: ['They are ionisation isomers', 'water is involved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are hydrate isomers.' },
                { id: 'b', prompt: 'A compound with empirical formula Pt(NH₃)₂Cl₂ exists in two forms. One form precipitates 2 mol AgCl per mol with AgNO₃; the other precipitates N/A.', answer: 'No, these are NOT structural isomers',
                  options: ['No, these are NOT structural isomers', 'yes, ionisation isomerism', 'water is involved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are hydrate isomers.' },
                { id: 'c', prompt: 'Compare the coordination isomers [Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]. Do they have the same overall chemical formula?', answer: 'Yes, same overall formula (Co, Cr, 6 NH₃, 6 CN)',
                  options: ['Yes, same overall formula (Co, Cr, 6 NH₃, 6 CN)', 'water is involved', 'only the overall formula matters, not the local coordination environment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse ionisation isomerism with hydrate isomerism, writing that [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ are hydrate isomers.' }
          ],
            remediations: { 'students-often-confuse-ionisation-isomerism': { steps: ['Revisit c12_chem_cbse_05_001 (Werner\'s theory) to recall the distinction between coordination sphere (non-ionisable).', 'Revisit c12_chem_cbse_05_002 (Nomenclature) to practice writing formulas from names — this forces you to place ligands.', 'Draw the two isomers for each type side-by-side, labelling the coordination sphere with square brackets.', 'For each pair, write the ions produced in aqueous solution and predict AgNO₃ / BaCl₂ test results.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_004', difficulty: 'standard',
          question: 'Geometrical isomerism in coordination compounds arises due to different spatial.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR shapes) and practice drawing.',
          misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.',
          parts: [
                { id: 'a', prompt: '[REMEMBER] Write the IUPAC names of the two geometrical isomers of [Pt(NH₃)₂Cl₂] and state which one is used as an anticancer drug.', answer: 'cis-diamminedichloridoplatinum(II) and trans-diamminedichloridoplatinum(II)',
                  options: ['cis-diamminedichloridoplatinum(II) and trans-diamminedichloridoplatinum(II)', 'diamminedichloridoplatinum(II)', 'ANY complex with didentate ligands shows optical isomerism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.' }
          ],
            remediations: { 'any-complex-with-didentate-ligands': { steps: ['If a student cannot distinguish geometrical vs optical or misidentifies chirality: 1.', 'Revisit c12_chem_cbse_05_003 (structural isomerism) to reinforce "same formula, different arrangement" concept.', 'Use physical 3D models (or online Jmol) for [Co(en)₃]³⁺ and cis/trans-[Co(en)₂Cl₂]⁺.', 'Rotate them to find planes of symmetry.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.',
          parts: [
                { id: 'a', prompt: '[EVALUATE] A student claims: "[Cr(C₂O₄)₃]³⁻ shows geometrical isomerism because oxalate is a didentate ligand." Is this statement correct? Justify.', answer: 'Incorrect',
                  options: ['Incorrect', 'presence of didentate ligand', 'possibility of geometrical isomerism', 'ANY complex with didentate ligands shows optical isomerism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.' },
                { id: 'b', prompt: '[CREATE] Design a coordination complex of cobalt(III) with coordination number 6 that exhibits exactly three stereoisomers (including optical isomers).', answer: 'Example: [CoCl₂(en)₂]⁺',
                  options: ['Example: [CoCl₂(en)₂]⁺', 'ANY complex with didentate ligands shows optical isomerism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that ANY complex with didentate ligands shows optical isomerism.' }
          ],
            remediations: { 'any-complex-with-didentate-ligands': { steps: ['If a student cannot distinguish geometrical vs optical or misidentifies chirality: 1.', 'Revisit c12_chem_cbse_05_003 (structural isomerism) to reinforce "same formula, different arrangement" concept.', 'Use physical 3D models (or online Jmol) for [Co(en)₃]³⁺ and cis/trans-[Co(en)₂Cl₂]⁺.', 'Rotate them to find planes of symmetry.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_005', difficulty: 'standard',
          question: 'Valence Bond Theory (VBT) for coordination compounds describes the bonding.',
          hint: 'Revisit Class 11 nodes c11_chem_cbse_02_015 (Aufbau Principle and Electronic.',
          misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so.',
          parts: [
                { id: 'a', prompt: 'What is the hybridization and geometry of the complex [Ni(CN)₄]²⁻ according to VBT? State the oxidation state of Ni and the number of unpaired electrons.', answer: 'Oxidation state of Ni = +2 (d⁸)',
                  options: ['Oxidation state of Ni = +2 (d⁸)', 'All octahedral complexes are sp³d² hybridized', 'inner orbital = low spin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so I just pair.' },
                { id: 'b', prompt: 'Predict the hybridization, geometry, and spin-only magnetic moment (in BM) for [Fe(CN)₆]⁴⁻. Show the d-orbital splitting and electron distribution.', answer: 'Fe²⁺ is d⁶',
                  options: ['Fe²⁺ is d⁶', 'All octahedral complexes are sp³d² hybridized', 'inner orbital = low spin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so I just pair.' }
          ],
            remediations: { 'all-octahedral-complexes-are-sp': { steps: ['If a student cannot predict hybridization/magnetism: (1) Revisit Class 11 hybridisation (c11_chem_cbse_04_007) and.', '(2) Practice writing electronic configurations of transition metal ions in various oxidation states.', '(3) Memorize the spectrochemical series order (I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO) to classify.', '(4) For a given complex, follow the 5-step algorithm: Oxidation state → dⁿ → Ligand field (strong/weak) → Pairing?'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so.',
          parts: [
                { id: 'a', prompt: 'A student writes: "[Co(NH₃)₆]³⁺ uses sp³d² hybridization because it is octahedral." Evaluate this statement and correct it.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'All octahedral complexes are sp³d² hybridized', 'inner orbital = low spin', 'outer orbital = high spin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "All octahedral complexes are sp³d² hybridized" or "Strong field ligand always means low spin, so I just pair.' }
          ],
            remediations: { 'all-octahedral-complexes-are-sp': { steps: ['If a student cannot predict hybridization/magnetism: (1) Revisit Class 11 hybridisation (c11_chem_cbse_04_007) and.', '(2) Practice writing electronic configurations of transition metal ions in various oxidation states.', '(3) Memorize the spectrochemical series order (I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO) to classify.', '(4) For a given complex, follow the 5-step algorithm: Oxidation state → dⁿ → Ligand field (strong/weak) → Pairing?'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_009', difficulty: 'standard',
          question: 'Coordination compounds are complex entities where a central metal atom/ion is.',
          hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11.',
          misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket.',
          parts: [
                { id: 'a', prompt: 'A student writes: "EDTA is used in water hardness titration because it forms a stable complex with Ca²⁺ and Mg²⁺." Is this statement complete?', answer: 'No, the statement is incomplete',
                  options: ['No, the statement is incomplete', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'b', prompt: 'In the cyanide process for gold extraction: 4Au + 8CN⁻ + O₂ + 2H₂O → 4[Au(CN)₂]⁻ + 4OH⁻. Why is oxygen (O₂) essential?', answer: 'O₂ acts as the oxidant: Au(0) → Au(I) in [Au(CN)₂]⁻ requires electron loss',
                  options: ['O₂ acts as the oxidant: Au(0) → Au(I) in [Au(CN)₂]⁻ requires electron loss', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'c', prompt: 'A water sample contains 0.01 M Ca²⁺ and 0.01 M Mg²⁺. You titrate with 0.01 M EDTA at pH 10 using Eriochrome Black T indicator.', answer: 'Step 1: Moles of Ca²⁺ = 0.01 mol/L × 0.050 L = 5.0×10⁻⁴ mol',
                  options: ['Step 1: Moles of Ca²⁺ = 0.01 mol/L × 0.050 L = 5.0×10⁻⁴ mol', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' }
          ],
            remediations: { 'chelate-effect-only-means-multidentate': { steps: ['If the student cannot explain the entropy origin of the chelate effect: (1) Revisit Class 11 thermodynamics.', '(2) Write the two reactions: Co³⁺ + 6NH₃ ⇌ [Co(NH₃)₆]³⁺ (7 particles → 1) and Co³⁺ + EDTA⁴⁻ ⇌ [Co(EDTA)]⁻ (2 particles.', '(3) Calculate Δn_gas (not applicable) but Δn_solution: first reaction decreases particle count by 6, second by 1.', '(4) Realize entropy *decrease* is smaller for EDTA → less negative ΔS → more positive TΔS → more negative ΔG.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "cis-Platin [Pt(NH₃)₂Cl₂] is an anticancer drug because it is a square planar Pt(II) complex that binds to DNA.', answer: 'The claim is false',
                  options: ['The claim is false', 'chelate effect', 'multidentate ligands form more stable complexes', 'chelate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' }
          ],
            remediations: { 'chelate-effect-only-means-multidentate': { steps: ['If the student cannot explain the entropy origin of the chelate effect: (1) Revisit Class 11 thermodynamics.', '(2) Write the two reactions: Co³⁺ + 6NH₃ ⇌ [Co(NH₃)₆]³⁺ (7 particles → 1) and Co³⁺ + EDTA⁴⁻ ⇌ [Co(EDTA)]⁻ (2 particles.', '(3) Calculate Δn_gas (not applicable) but Δn_solution: first reaction decreases particle count by 6, second by 1.', '(4) Realize entropy *decrease* is smaller for EDTA → less negative ΔS → more positive TΔS → more negative ΔG.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
