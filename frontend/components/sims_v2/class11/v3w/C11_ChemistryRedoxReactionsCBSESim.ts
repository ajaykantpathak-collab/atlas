import type { SimDef } from '../../engine/types';
import C11_ChemistryRedoxReactionsCBSESim from '../../../simulations/c6_12/C11_ChemistryRedoxReactionsCBSESim';

/** v3 wrapped master — C11_ChemistryRedoxReactionsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryredoxreactionscbsesim: SimDef = {
    id: 'v3w_c11_chemistryredoxreactionscbsesim',
    title: 'Oxidation and Reduction: Classical Concept',
    subtitle: 'Covers classical definitions of oxidation and reduction in terms of oxygen, hydrogen,.',
    classLevel: 11, subject: 'chemistry', topic: 'Oxidation and Reduction: Classical Concept',
    chapters: [],
    nodeIds: ['c11_chem_cbse_08_001', 'c11_chem_cbse_08_002', 'c11_chem_cbse_08_003', 'c11_chem_cbse_08_004', 'c11_chem_cbse_08_005', 'c11_chem_cbse_08_006', 'c11_chem_cbse_08_007', 'c11_chem_cbse_08_008', 'c11_chem_cbse_09_007', 'c11_chem_cbse_09_011', 'c11_chem_cbse_01_011', 'c11_chem_cbse_09_002', 'c11_chem_cbse_09_003', 'c11_chem_cbse_09_004', 'c11_chem_cbse_09_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe an iron nail left in monsoon rain — it develops a reddish-brown flaky coating (rust).', goal: 'Master Oxidation and Reduction: Classical Concept.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Classical oxidation is defined as a chemical.', text: 'Classical oxidation is defined as a chemical process involving addition of oxygen or an electronegative element, removal of hydrogen or an electropositive element, or loss of electrons.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_001', title: 'Classical oxidation is defined as a.',
          scaffold: { problem: 'In the extraction of iron, haematite (Fe2O3) is reduced by carbon monoxide: Fe2O3 + 3CO → 2Fe + 3CO2.',
            steps: [
            { text: 'Identify reactants: Fe2O3 (iron(III) oxide) and CO (carbon monoxide).' },
            { text: 'Apply classical definition: Oxidation = gain of oxygen / loss of hydrogen / loss of electropositive element / gain of.' },
            { text: 'Analyze Fe2O3: Iron is combined with oxygen (electronegative).' },
            { text: 'Analyze CO: Carbon is combined with oxygen. In product CO2, carbon gains an additional oxygen atom → CO gains oxygen →.' },
            { text: 'Verify: Simultaneous oxidation (CO → CO2) and reduction (Fe2O3 → Fe) occurs.', faded: true, blankAnswer: 'Fe2O3 is reduced (loses oxygen); CO is oxidized (gains.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_002', title: 'Oxidation number (oxidation state) is a.',
          scaffold: { problem: 'Determine the oxidation state of chromium in K₂Cr₂O₇ and the oxidation state change when it reacts with Fe²⁺ in acidic medium to form Cr³⁺.',
            steps: [
            { text: 'Identify known oxidation numbers: K = +1 (Group 1), O = -2 (oxide, not peroxide). The compound is neutral (Σ ON = 0).' },
            { text: 'Set up equation: 2(+1) + 2(Cr) + 7(-2) = 0 → 2 + 2Cr - 14 = 0 → 2Cr = 12 → Cr = +6.' },
            { text: 'Write the half-reaction for reduction: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.' },
            { text: 'Write oxidation half-reaction: Fe²⁺ → Fe³⁺ + e⁻. Each Fe loses 1 electron.' },
            { text: 'Balance electrons: 6 Fe²⁺ provide 6e⁻ for 1 Cr₂O₇²⁻. Overall: Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O.', faded: true, blankAnswer: 'Cr in K₂Cr₂O₇ = +6; Change: +6 → +3 (gain 3e⁻ per Cr);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_003', title: 'The half-reaction method (ion-electron.',
          scaffold: { problem: 'Balance the redox reaction in acidic medium: MnO₄⁻(aq) + H₂S(aq) → Mn²⁺(aq) + S(s) (purple KMnO₄ decolourises when passed through H₂S gas.',
            steps: [
            { text: 'Assign oxidation numbers. Mn in MnO₄⁻ is +7 → Mn²⁺ is +2 (gain 5e⁻, reduction).' },
            { text: 'Write half-reactions. Reduction: MnO₄⁻ → Mn²⁺. Oxidation: H₂S → S.' },
            { text: 'Balance atoms other than H/O. Both have 1 Mn and 1 S respectively – already balanced.' },
            { text: 'Balance O with H₂O. Reduction: MnO₄⁻ → Mn²⁺ + 4H₂O. Oxidation: no O.' },
            { text: 'Balance H with H⁺. Reduction: MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O. Oxidation: H₂S → S + 2H⁺.' },
            { text: 'Balance charge with e⁻. Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (charge: -1+8-5=+2 both sides).' },
            { text: 'Equalize electrons (LCM of 5 and 2 = 10). Multiply reduction by 2, oxidation by 5.' },
            { text: 'Add half-reactions and cancel common species: 2MnO₄⁻ + 16H⁺ + 10e⁻ + 5H₂S → 2Mn²⁺ + 8H₂O + 5S + 10H⁺ + 10e⁻.', faded: true, blankAnswer: '2MnO₄⁻(aq) + 5H₂S(aq) + 6H⁺(aq) → 2Mn²⁺(aq) + 5S(s) +.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_004', title: 'The oxidation number method is a.',
          scaffold: { problem: 'Balance the redox reaction for the reaction of potassium permanganate with hydrogen sulfide in acidic medium: KMnO₄ + H₂S → MnSO₄ + K₂SO₄ +.',
            steps: [
            { text: 'Write ionic form and assign oxidation numbers. Reactants: Mn in MnO₄⁻ = +7 (O = -2, charge -1); S in H₂S = -2 (H = +1).' },
            { text: 'Identify oxidation and reduction. Mn: +7 → +2 (gain 5 e⁻ per Mn).' },
            { text: 'Set up electron balance. Let a moles MnO₄⁻, b moles H₂S → x moles S + y moles SO₄²⁻. Total S atoms: b = x + y.' },
            { text: 'Use additional constraints. In acidic medium, typical reaction: 2MnO₄⁻ + 5H₂S + 6H⁺ → 2Mn²⁺ + 5S + 8H₂O (if only S.' },
            { text: 'Write full equation with spectators. 12MnO₄⁻ + 15H₂S → 12Mn²⁺ + 10S + 5SO₄²⁻.' },
            { text: 'Add K⁺ to form K₂SO₄ and MnSO₄. 12 KMnO₄ + 15 H₂S + 26 H⁺ → 12 Mn²⁺ + 10 S + 5 SO₄²⁻ + 28 H₂O.', faded: true, blankAnswer: '12KMnO₄ + 15H₂S + 14H₂SO₄ → 6K₂SO₄ + 12MnSO₄ + 10S + 28H₂O' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_005', title: 'Redox titration is a volumetric.',
          scaffold: { problem: '1.25 g of a commercial FeSO₄·(NH₄)₂SO₄·6H₂O (Mohr\'s salt) sample is dissolved in dilute H₂SO₄ and titrated with 0.0200 M KMnO₄.',
            steps: [
            { text: 'Write balanced net ionic equation: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Identify n-factor: KMnO₄ = 5, Fe²⁺ = 1.' },
            { text: 'Calculate moles of KMnO₄ used = Molarity × Volume(L) = 0.0200 mol/L × 0.0224 L = 4.48 × 10⁻⁴ mol.' },
            { text: 'Use mole ratio from equation: 1 mol MnO₄⁻ ≡ 5 mol Fe²⁺. Moles of Fe²⁺ = 5 × 4.48 × 10⁻⁴ = 2.24 × 10⁻³ mol.' },
            { text: 'Each mole of Mohr\'s salt provides 1 mole Fe²⁺. Moles of pure Mohr\'s salt = 2.24 × 10⁻³ mol.' },
            { text: 'Mass of pure Mohr\'s salt = moles × molar mass = 2.24 × 10⁻³ mol × 392 g/mol = 0.878 g.' },
            { text: '% purity = (mass pure / mass sample) × 100 = (0.878 g / 1.25 g) × 100 = 70.2%.', faded: true, blankAnswer: '70.2% purity' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_006', title: 'Corrosion is an electrochemical redox.',
          scaffold: { problem: 'An iron pipeline (mass 500 kg) is buried in moist soil with 0.1 M NaCl. After 2 years, it loses 1.2 kg to rusting.',
            steps: [
            { text: 'Identify the redox process — Fe oxidises to Fe²⁺ (2e⁻ loss), O₂ reduces to OH⁻.' },
            { text: 'Calculate moles of Fe lost = mass loss / molar mass = 1200 g / 56 g/mol = 21.43 mol Fe.' },
            { text: 'Moles of electrons transferred = 2 × 21.43 = 42.86 mol e⁻. Total charge = 42.86 × 96500 = 4.136×10⁶ C.' },
            { text: 'Time = 2 years = 2 × 365 × 24 × 3600 = 6.307×10⁷ s. Average current I = Q/t = 4.136×10⁶ / 6.307×10⁷ = 0.0656 A = 65.6.' },
            { text: 'Corrosion rate: Volume of Fe lost = mass/density = 1200/7.87 = 152.5 cm³.', faded: true, blankAnswer: '(a) 65.6 mA, (b) 0.00305 mm/year' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Oxidation and Reduction: Classical Concept', spots: [
            { id: 's1', label: 'Classical oxidation is defined as', prompt: 'Which idea is this? — Classical oxidation is defined as a chemical process involving addition of oxygen or an.', answer: 'Classical oxidation is defined as', options: ['Classical oxidation is defined as', 'Oxidation number oxidation state is', 'The half-reaction method ion-electron method', 'The oxidation number method is'] },
            { id: 's2', label: 'Oxidation number oxidation state is', prompt: 'Which idea is this? — Oxidation number (oxidation state) is a signed integer assigned to an atom in a chemical.', answer: 'Oxidation number oxidation state is', options: ['Oxidation number oxidation state is', 'Classical oxidation is defined as', 'The half-reaction method ion-electron method', 'The oxidation number method is'] },
            { id: 's3', label: 'The half-reaction method ion-electron method', prompt: 'Which idea is this? — The half-reaction method (ion-electron method) balances redox reactions by separating the.', answer: 'The half-reaction method ion-electron method', options: ['The half-reaction method ion-electron method', 'Classical oxidation is defined as', 'Oxidation number oxidation state is', 'The oxidation number method is'] },
            { id: 's4', label: 'The oxidation number method is', prompt: 'Which idea is this? — The oxidation number method is a systematic technique for balancing redox equations by.', answer: 'The oxidation number method is', options: ['The oxidation number method is', 'Classical oxidation is defined as', 'Oxidation number oxidation state is', 'The half-reaction method ion-electron method'] },
            { id: 's5', label: 'Redox titration is a volumetric', prompt: 'Which idea is this? — Redox titration is a volumetric analysis technique where a standardized oxidizing agent.', answer: 'Redox titration is a volumetric', options: ['Redox titration is a volumetric', 'Classical oxidation is defined as', 'Oxidation number oxidation state is', 'The half-reaction method ion-electron method'] },
            { id: 's6', label: 'Corrosion is an electrochemical redox', prompt: 'Which idea is this? — Corrosion is an electrochemical redox process where a metal spontaneously oxidises in the.', answer: 'Corrosion is an electrochemical redox', options: ['Corrosion is an electrochemical redox', 'Classical oxidation is defined as', 'Oxidation number oxidation state is', 'The half-reaction method ion-electron method'] }
          ] } }
    ],
    explore: { component: C11_ChemistryRedoxReactionsCBSESim, prompt: 'Explore the interactive — Oxidation and Reduction: Classical Concept' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_001', difficulty: 'standard',
          question: 'Classical oxidation is defined as a chemical process involving addition of.',
          hint: 'If stuck, revisit Class 10 Chapter 1: "Oxidation and Reduction Reactions: Definitions and.',
          misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.',
          parts: [
                { id: 'a', prompt: 'Define oxidation and reduction according to the classical concept using oxygen and hydrogen transfer. Give one example of each.', answer: 'Oxidation: gain of oxygen or loss of hydrogen',
                  options: ['Oxidation: gain of oxygen or loss of hydrogen', 'oxidation always requires oxygen gas (O2) as a reactant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.' },
                { id: 'b', prompt: 'Compare the classical and electronic concepts of oxidation and reduction. Why does the classical concept fail for the reaction: 2CO + O2 → 2CO2?', answer: 'Classical: CO gains oxygen (oxidation), O2 loses oxygen (reduction)',
                  options: ['Classical: CO gains oxygen (oxidation), O2 loses oxygen (reduction)', 'oxidation always requires oxygen gas (O2) as a reactant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.' }
          ],
            remediations: { 'oxidation-always-requires-oxygen-gas': { steps: ['Show three reactions: (a) 2Cu + O2 → 2CuO, (b) H2 + Cl2 → 2HCl, (c) CH4 + 2O2 → CO2 + 2H2O.', 'Ask student to identify oxidation in each using only "gain of oxygen". They will fail for (b).', 'Introduce classical definition: oxidation = gain of O / loss of H / loss of electropositive / gain of electronegative.', 'Re-analyze (b): H2 loses H (electropositive) → oxidized.', 'Practice with 5 more reactions until student applies all four classical criteria without defaulting to oxygen.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "In the reaction MnO2 + 4HCl → MnCl2 + Cl2 + 2H2O, HCl is oxidized and MnO2 is reduced." Is this correct according to classical and.', answer: 'Correct',
                  options: ['Correct', 'oxidation always requires oxygen gas (O2) as a reactant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.' },
                { id: 'b', prompt: 'Design a simple laboratory experiment using common chemicals (available in a school lab) to demonstrate a redox reaction where the classical oxygen-transfer.', answer: 'Oxygen-transfer: Heat CuO with H2 gas (or carbon)',
                  options: ['Oxygen-transfer: Heat CuO with H2 gas (or carbon)', 'oxidation always requires oxygen gas (O2) as a reactant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.' },
                { id: 'c', prompt: 'Compare the classical and electronic concepts of oxidation and reduction. Why does the classical concept fail for the reaction: 2CO + O2 → 2CO2?', answer: 'Classical: CO gains oxygen (oxidation), O2 loses oxygen (reduction)',
                  options: ['Classical: CO gains oxygen (oxidation), O2 loses oxygen (reduction)', 'oxidation always requires oxygen gas (O2) as a reactant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think oxidation always requires oxygen gas (O2) as a reactant.' }
          ],
            remediations: { 'oxidation-always-requires-oxygen-gas': { steps: ['Show three reactions: (a) 2Cu + O2 → 2CuO, (b) H2 + Cl2 → 2HCl, (c) CH4 + 2O2 → CO2 + 2H2O.', 'Ask student to identify oxidation in each using only "gain of oxygen". They will fail for (b).', 'Introduce classical definition: oxidation = gain of O / loss of H / loss of electropositive / gain of electronegative.', 'Re-analyze (b): H2 loses H (electropositive) → oxidized.', 'Practice with 5 more reactions until student applies all four classical criteria without defaulting to oxygen.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_002', difficulty: 'standard',
          question: 'Oxidation number (oxidation state) is a signed integer assigned to an atom in a.',
          hint: 'If stuck, revisit Class 9 electron distribution (c9_chem_ch2_6) and Class 11.',
          misconception: 'Students treat oxidation number as the actual ionic charge on an atom in a covalent compound.',
          parts: [
                { id: 'a', prompt: 'State the oxidation number of each element in the following species: (a) MnO₄⁻ (b) Cr₂O₇²⁻ (c) H₂O₂ (d) NaH', answer: 'MnO₄⁻ (',
                  options: ['MnO₄⁻ (', 'SO₂ should conduct electricity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat oxidation number as the actual ionic charge on an atom in a covalent compound.' },
                { id: 'b', prompt: 'Calculate the oxidation number of sulfur in each: (a) SO₂ (b) SO₃ (c) H₂SO₄ (d) S₂O₃²⁻ (e) S₄O₆²⁻. Show your working for (d) and (e).', answer: 'SO₂ (',
                  options: ['SO₂ (', 'SO₂ should conduct electricity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat oxidation number as the actual ionic charge on an atom in a covalent compound.' },
                { id: 'c', prompt: 'In the reaction: 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O, identify which element is oxidized and which is reduced.', answer: 'Mn in MnO₄⁻: +7 → Mn²⁺: +2 (gain 5e⁻ per Mn, reduced)',
                  options: ['Mn in MnO₄⁻: +7 → Mn²⁺: +2 (gain 5e⁻ per Mn, reduced)', 'SO₂ should conduct electricity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat oxidation number as the actual ionic charge on an atom in a covalent compound.' }
          ],
            remediations: { 'students-treat-oxidation-number-as': { steps: ['Draw the Lewis structure of the species (e.g., SO₂, Cr₂O₇²⁻).', 'For each bond, assign both electrons to the more electronegative atom (use EN values: F=3.98, O=3.44, Cl=3.16, N=3.04,.', 'Count electrons "owned" by each atom vs its valence electrons.', 'Oxidation number = valence electrons - assigned electrons.', 'Verify sum matches species charge. Do this for 5 compounds including one peroxide and one metal hydride.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat oxidation number as the actual ionic charge on an atom in a covalent compound.',
          parts: [
                { id: 'a', prompt: 'A student writes the oxidation numbers in NH₄NO₃ as: N = -3, H = +1, N = +5, O = -2. Is this correct?', answer: 'Correct',
                  options: ['Correct', 'SO₂ should conduct electricity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat oxidation number as the actual ionic charge on an atom in a covalent compound.' }
          ],
            remediations: { 'students-treat-oxidation-number-as': { steps: ['Draw the Lewis structure of the species (e.g., SO₂, Cr₂O₇²⁻).', 'For each bond, assign both electrons to the more electronegative atom (use EN values: F=3.98, O=3.44, Cl=3.16, N=3.04,.', 'Count electrons "owned" by each atom vs its valence electrons.', 'Oxidation number = valence electrons - assigned electrons.', 'Verify sum matches species charge. Do this for 5 compounds including one peroxide and one metal hydride.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_003', difficulty: 'standard',
          question: 'The half-reaction method (ion-electron method) balances redox reactions by.',
          hint: 'If stuck, review oxidation number rules (c11_chem_cbse_08_002) and practice identifying.',
          misconception: 'Students frequently balance atoms in half-reactions but forget to balance charge with electrons, or they add electrons.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The half-reaction method (ion-electron method) balances redox reactions by separating the',
                  options: ['The half-reaction method (ion-electron method) balances redox reactions by separating the', 'Classical oxidation is defined as a chemical process involving addition of oxygen or an', 'Oxidation number (oxidation state) is a signed integer assigned to an atom in a chemical', 'The oxidation number method is a systematic technique for balancing redox equations by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently balance atoms in half-reactions but forget to balance charge with electrons, or they add electrons to the wrong side.' }
          ],
            remediations: { 'students-frequently-balance-atoms-in': { steps: ['Revisit oxidation number assignment (c11_chem_cbse_08_002) to correctly identify oxidation/reduction half-reactions.', 'Practice the 5-step half-reaction balancing protocol on simple reactions (e.g., Cu + Ag⁺ → Cu²⁺ + Ag) without H/O first.', 'Use a checklist: (a) Split, (b) Balance main atoms, (c) Balance O with H₂O, (d) Balance H with H⁺, (e) Balance charge.', 'Verify each half-reaction has equal atoms and charge on both sides before equalizing electrons.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_004', difficulty: 'standard',
          question: 'The oxidation number method is a systematic technique for balancing redox.',
          hint: 'If stuck, review c11_chem_cbse_08_002 oxidation number rules — especially for peroxides,.',
          misconception: 'Students incorrectly assign oxidation numbers in polyatomic ions by ignoring the overall charge: e.g., in Cr₂O₇²⁻, they.',
          parts: [
                { id: 'a', prompt: 'Compare the oxidation number method and half-reaction method for balancing: MnO₄⁻ + C₂O₄²⁻ → Mn²⁺ + CO₂ (acidic).', answer: 'Oxidation number method: Assign ON changes (Mn +7→+2, gain 5e⁻',
                  options: ['Oxidation number method: Assign ON changes (Mn +7→+2, gain 5e⁻', 'both are equally good'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly assign oxidation numbers in polyatomic ions by ignoring the overall charge: e.g., in Cr₂O₇²⁻, they calculate Cr as +7.' }
          ],
            remediations: { 'students-incorrectly-assign-oxidation-numbers': { steps: ['Revisit c11_chem_cbse_08_002 (Oxidation Number Rules) and practice assigning ON in 10 polyatomic ions (MnO₄⁻, Cr₂O₇²⁻,.', 'For electron counting: write "Total e⁻ gained = (ON change per atom) × (number of atoms)" for each species.', 'Use a table: Species | Atom | Initial ON | Final ON | Change per atom | No.', 'Balance 5 reactions from NCERT Exemplar using this table method, verifying charge balance at each step before adding.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly assign oxidation numbers in polyatomic ions by ignoring the overall charge: e.g., in Cr₂O₇²⁻, they.',
          parts: [
                { id: 'a', prompt: 'Compare the oxidation number method and half-reaction method for balancing: MnO₄⁻ + C₂O₄²⁻ → Mn²⁺ + CO₂ (acidic).', answer: 'Oxidation number method: Assign ON changes (Mn +7→+2, gain 5e⁻',
                  options: ['Oxidation number method: Assign ON changes (Mn +7→+2, gain 5e⁻', 'both are equally good'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly assign oxidation numbers in polyatomic ions by ignoring the overall charge: e.g., in Cr₂O₇²⁻, they calculate Cr as +7.' }
          ],
            remediations: { 'students-incorrectly-assign-oxidation-numbers': { steps: ['Revisit c11_chem_cbse_08_002 (Oxidation Number Rules) and practice assigning ON in 10 polyatomic ions (MnO₄⁻, Cr₂O₇²⁻,.', 'For electron counting: write "Total e⁻ gained = (ON change per atom) × (number of atoms)" for each species.', 'Use a table: Species | Atom | Initial ON | Final ON | Change per atom | No.', 'Balance 5 reactions from NCERT Exemplar using this table method, verifying charge balance at each step before adding.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_005', difficulty: 'standard',
          question: 'Redox titration is a volumetric analysis technique where a standardized.',
          hint: 'If stuck on balancing, revisit c11_chem_cbse_08_003 (Half-Reaction Method) and practice.',
          misconception: 'Students write the KMnO₄ + Fe²⁺ equation as MnO₄⁻ + Fe²⁺ + 4H⁺ → Mn²⁺ + Fe³⁺ + 2H₂O (1:1 ratio) because they balance.',
          parts: [
                { id: 'a', prompt: 'Compare the titration of KMnO₄ vs K₂Cr₂O₇ with the same Fe²⁺ solution.', answer: 'K₂Cr₂O₇ requires more volume',
                  options: ['K₂Cr₂O₇ requires more volume', 'it has 2 Cr atoms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the KMnO₄ + Fe²⁺ equation as MnO₄⁻ + Fe²⁺ + 4H⁺ → Mn²⁺ + Fe³⁺ + 2H₂O (1:1 ratio) because they balance atoms but forget.' }
          ],
            remediations: { 'students-write-the-kmno-fe': { steps: ['Write half-reactions separately: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O and Fe²⁺ → Fe³⁺ + e⁻.', 'Multiply Fe half-reaction by 5 to equalize electrons.', 'Add and cancel electrons.', 'Verify charge balance: LHS: -1 + 5(+2) + 8(+1) = +17; RHS: +2 + 5(+3) = +17.', 'Practice with C₂O₄²⁻ → 2CO₂ + 2e⁻ (n=2) to see different n-factors.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the KMnO₄ + Fe²⁺ equation as MnO₄⁻ + Fe²⁺ + 4H⁺ → Mn²⁺ + Fe³⁺ + 2H₂O (1:1 ratio) because they balance.',
          parts: [
                { id: 'a', prompt: 'Compare the titration of KMnO₄ vs K₂Cr₂O₇ with the same Fe²⁺ solution.', answer: 'K₂Cr₂O₇ requires more volume',
                  options: ['K₂Cr₂O₇ requires more volume', 'it has 2 Cr atoms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the KMnO₄ + Fe²⁺ equation as MnO₄⁻ + Fe²⁺ + 4H⁺ → Mn²⁺ + Fe³⁺ + 2H₂O (1:1 ratio) because they balance atoms but forget.' }
          ],
            remediations: { 'students-write-the-kmno-fe': { steps: ['Write half-reactions separately: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O and Fe²⁺ → Fe³⁺ + e⁻.', 'Multiply Fe half-reaction by 5 to equalize electrons.', 'Add and cancel electrons.', 'Verify charge balance: LHS: -1 + 5(+2) + 8(+1) = +17; RHS: +2 + 5(+3) = +17.', 'Practice with C₂O₄²⁻ → 2CO₂ + 2e⁻ (n=2) to see different n-factors.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_006', difficulty: 'standard',
          question: 'Corrosion is an electrochemical redox process where a metal spontaneously.',
          hint: 'If stuck on half-reactions, revisit c11_chem_cbse_08_003 Step 4 (balance O with H₂O, H.',
          misconception: 'Students write the overall rusting reaction as 4Fe + 3O₂ → 2Fe₂O₃, ignoring water\'s role and the Fe(OH)₃ intermediate.',
          parts: [
                { id: 'a', prompt: 'Compare the initiation step of rancidity in linoleic acid (C18:2) vs oleic acid (C18:1). Why does linoleic acid oxidise faster? Use bond dissociation energies.', answer: 'Linoleic has −CH=CH−CH₂−CH=CH− (bis-allylic) with C−H BDE ≈ 335 kJ/mol',
                  options: ['Linoleic has −CH=CH−CH₂−CH=CH− (bis-allylic) with C−H BDE ≈ 335 kJ/mol', 'more double bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the overall rusting reaction as 4Fe + 3O₂ → 2Fe₂O₃, ignoring water\'s role and the Fe(OH)₃ intermediate.' }
          ],
            remediations: { 'students-write-the-overall-rusting': { steps: ['Revisit c11_chem_cbse_08_002 (oxidation numbers) — assign O.N.', 'Re-do c11_chem_cbse_08_003 half-reaction balancing for O₂ reduction in neutral vs acidic medium.', 'For rancidity, draw the resonance-stabilised pentadienyl radical from linoleic acid to visualise why bis-allylic H is.', 'Watch a 2-min video of ferroxyl indicator experiment (blue/pink spots) to see anodic/cathodic separation.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the overall rusting reaction as 4Fe + 3O₂ → 2Fe₂O₃, ignoring water\'s role and the Fe(OH)₃ intermediate.',
          parts: [
                { id: 'a', prompt: 'Compare the initiation step of rancidity in linoleic acid (C18:2) vs oleic acid (C18:1). Why does linoleic acid oxidise faster? Use bond dissociation energies.', answer: 'Linoleic has −CH=CH−CH₂−CH=CH− (bis-allylic) with C−H BDE ≈ 335 kJ/mol',
                  options: ['Linoleic has −CH=CH−CH₂−CH=CH− (bis-allylic) with C−H BDE ≈ 335 kJ/mol', 'more double bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the overall rusting reaction as 4Fe + 3O₂ → 2Fe₂O₃, ignoring water\'s role and the Fe(OH)₃ intermediate.' }
          ],
            remediations: { 'students-write-the-overall-rusting': { steps: ['Revisit c11_chem_cbse_08_002 (oxidation numbers) — assign O.N.', 'Re-do c11_chem_cbse_08_003 half-reaction balancing for O₂ reduction in neutral vs acidic medium.', 'For rancidity, draw the resonance-stabilised pentadienyl radical from linoleic acid to visualise why bis-allylic H is.', 'Watch a 2-min video of ferroxyl indicator experiment (blue/pink spots) to see anodic/cathodic separation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
