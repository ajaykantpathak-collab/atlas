import type { SimDef } from '../../engine/types';
import C11_ChemistryHybridizationOrbitalsSim from '../../../simulations/three/C11_ChemistryHybridizationOrbitalsSim';

/** v3 wrapped master — C11_ChemistryHybridizationOrbitalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryhybridizationorbitalssim: SimDef = {
    id: 'v3w_c11_chemistryhybridizationorbitalssim',
    title: 'Shapes of Atomic Orbitals: s, p, d',
    subtitle: 'Covers: shapes of s, p, d orbitals via boundary surface diagrams (constant |ψ|².',
    classLevel: 11, subject: 'chemistry', topic: 'Shapes of Atomic Orbitals: s, p, d',
    chapters: [],
    nodeIds: ['c11_chem_cbse_02_014', 'c11_chem_cbse_11_004', 'c11_chem_cbse_04_006', 'c11_chem_cbse_04_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe how a magnet attracts iron filings into a specific 3D pattern — the filings align along magnetic.', goal: 'Master Shapes of Atomic Orbitals: s, p, d.' },
    discovery: {
        question: 'State the shape of a 3s orbital and the number of radial nodes it possesses. How does its boundary surface diagram differ from that of a 1s orbital?',
        options: ['The 3s orbital is spherically symmetric with 2 radial nodes (n-l-1 = 3-0-1 = 2)', '3s has no nodes', '3s is dumb-bell shaped'],
        answer: 'The 3s orbital is spherically symmetric with 2 radial nodes (n-l-1 = 3-0-1 = 2)',
        hook: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis.',
    },
    teaching: [
        { title: 'Atomic orbitals are three-dimensional.', text: 'Atomic orbitals are three-dimensional regions around the nucleus where the probability of finding an electron is maximum (typically >90%), characterized by distinct shapes: s-orbitals are spherically.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_014', title: 'Atomic orbitals are three-dimensional.',
          scaffold: { problem: 'For a 4p orbital in a hydrogen atom, determine: (a) the number of radial nodes, (b) the number of angular nodes, (c) the total number of.',
            steps: [
            { text: 'Identify the quantum numbers for a 4p orbital: n = 4, l = 1 (since p corresponds to l=1).' },
            { text: 'Calculate radial nodes using formula: radial nodes = n - l - 1 = 4 - 1 - 1 = 2.' },
            { text: 'Calculate angular nodes: angular nodes = l = 1.' },
            { text: 'Calculate total nodes: total nodes = n - 1 = 3 (or radial + angular = 2 + 1 = 3).' },
            { text: 'Determine mₗ values: for l=1, mₗ = -1, 0, +1. These correspond to 4pₓ, 4pᵧ, 4p_z (or 4p₋₁, 4p₀, 4p₊₁).' },
            { text: 'Verify: The 4p orbital has 2 spherical radial nodes (where radial probability is zero) and 1 planar angular node (the.', faded: true, blankAnswer: '(a) 2 radial nodes, (b) 1 angular node, (c) 3 total nodes,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_11_004', title: 'Benzene (C₆H₆) is a planar, cyclic,.',
          scaffold: { problem: 'In the nitration of benzene using conc. HNO₃ and conc. H₂SO₄ at 323–333 K, 7.8 g of benzene yields 9.8 g of nitrobenzene.',
            steps: [
            { text: 'Identify the reaction: C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O (H₂SO₄ catalyst). Electrophile is NO₂⁺ generated in situ.' },
            { text: 'Calculate moles of benzene used: n(C₆H₆) = mass / Mᵣ = 7.8 g / 78 g/mol = 0.10 mol.' },
            { text: 'From stoichiometry, 1 mol benzene → 1 mol nitrobenzene. Theoretical moles of nitrobenzene = 0.10 mol.' },
            { text: 'Calculate theoretical mass of nitrobenzene: m_theoretical = n × Mᵣ = 0.10 mol × 123 g/mol = 12.3 g.' },
            { text: 'Percentage yield = (actual yield / theoretical yield) × 100 = (9.8 g / 12.3 g) × 100 = 79.7%.', faded: true, blankAnswer: '79.7%' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_006', title: 'Valence Bond Theory explains covalent.',
          scaffold: { problem: 'The hydrogen molecule ion H₂⁺ has one electron in the σ1s bonding molecular orbital.',
            steps: [
            { text: 'Identify the system - two protons (H⁺ nuclei) and one electron. In VB terms, one H atom (1s¹) and one H⁺ ion (empty 1s).' },
            { text: 'Apply orbital overlap concept - the half-filled 1s orbital of H overlaps with empty 1s of H⁺.' },
            { text: 'Determine bond type - axial overlap of s orbitals forms a σ bond.' },
            { text: 'Calculate bond order - one electron in bonding region, zero in antibonding → bond order = ½(1-0) = 0.5.' },
            { text: 'Predict bond length - weaker bond (lower bond order) → less electron density between nuclei → less attraction → longer.', faded: true, blankAnswer: 'H₂⁺ is stable with bond order 0.5; bond length ≈ 106 pm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_007', title: 'Hybridisation is the concept of mixing.',
          scaffold: { problem: 'In the industrial production of acrylonitrile (CH₂=CH–CN), a key intermediate is the vinyl radical (•CH=CH₂).',
            steps: [
            { text: 'Draw the Lewis structure of the vinyl radical. Carbon 1 (CH) has one H, one C (double bond), and one unpaired electron.' },
            { text: 'Count steric number for each carbon. For C1: three electron domains (one σ to H, one σ to C2, one unpaired electron in.' },
            { text: 'Assign hybridisation. SN=3 → sp² for both carbons. Each carbon has three sp² hybrids and one unhybridised p orbital.' },
            { text: 'Describe sigma framework. C1 uses two sp² hybrids for C1–H and C1–C2 σ bonds; the third sp² hybrid holds the unpaired.' },
            { text: 'Describe pi bond. The unhybridised p orbitals on C1 and C2 overlap sidewise to form the π bond of the double bond.' },
            { text: 'Predict geometry. Both carbons are trigonal planar (~120°). The unpaired electron on C1 resides in an sp² hybrid.' },
            { text: 'Verify with experimental data. ESR spectroscopy of vinyl radical shows the unpaired electron has ~33% s-character,.', faded: true, blankAnswer: 'Both carbons are sp² hybridised. Geometry: trigonal planar.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_11_004', title: 'Identify each idea',
          dissect: { specimen: 'Shapes of Atomic Orbitals: s, p, d', spots: [
            { id: 's1', label: 'Atomic orbitals are three-dimensional regions', prompt: 'Which idea is this? — Atomic orbitals are three-dimensional regions around the nucleus where the probability of.', answer: 'Atomic orbitals are three-dimensional regions', options: ['Atomic orbitals are three-dimensional regions', 'Benzene CH is a planar', 'Valence Bond Theory explains covalent', 'Hybridisation is the concept of'] },
            { id: 's2', label: 'Benzene CH is a planar', prompt: 'Which idea is this? — Benzene (C₆H₆) is a planar, cyclic, fully conjugated hydrocarbon with 6 π-electrons.', answer: 'Benzene CH is a planar', options: ['Benzene CH is a planar', 'Atomic orbitals are three-dimensional regions', 'Valence Bond Theory explains covalent', 'Hybridisation is the concept of'] },
            { id: 's3', label: 'Valence Bond Theory explains covalent', prompt: 'Which idea is this? — Valence Bond Theory explains covalent bond formation through the overlap of half-filled.', answer: 'Valence Bond Theory explains covalent', options: ['Valence Bond Theory explains covalent', 'Atomic orbitals are three-dimensional regions', 'Benzene CH is a planar', 'Hybridisation is the concept of'] },
            { id: 's4', label: 'Hybridisation is the concept of', prompt: 'Which idea is this? — Hybridisation is the concept of mixing atomic orbitals of slightly different energies on.', answer: 'Hybridisation is the concept of', options: ['Hybridisation is the concept of', 'Atomic orbitals are three-dimensional regions', 'Benzene CH is a planar', 'Valence Bond Theory explains covalent'] }
          ] } }
    ],
    explore: { component: C11_ChemistryHybridizationOrbitalsSim, prompt: 'Explore the interactive — Shapes of Atomic Orbitals: s, p, d' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_014', difficulty: 'standard',
          question: 'Atomic orbitals are three-dimensional regions around the nucleus where the.',
          hint: 'If stuck, review c11_chem_cbse_02_013 (Quantum Numbers) and the "Orbit, orbital and its.',
          misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis.',
          parts: [
                { id: 'a', prompt: 'State the shape of a 3s orbital and the number of radial nodes it possesses. How does its boundary surface diagram differ from that of a 1s orbital?', answer: 'The 3s orbital is spherically symmetric with 2 radial nodes (n-l-1 = 3-0-1 = 2)',
                  options: ['The 3s orbital is spherically symmetric with 2 radial nodes (n-l-1 = 3-0-1 = 2)', '3s has no nodes', '3s is dumb-bell shaped'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis like a pendulum.' },
                { id: 'b', prompt: 'A 3d orbital has n=3, l=2. Calculate its total number of nodes, radial nodes, and angular nodes.', answer: 'Total nodes = n-1 = 2',
                  options: ['Total nodes = n-1 = 2', 'dumb-bell', 'the electron is confined inside that surface, whereas |ψ|² extends to infinity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis like a pendulum.' }
          ],
            remediations: { 'the-dumb-bell-shape-of': { steps: ['Revisit the physical meaning of ψ and |ψ|²: ψ is a mathematical function; |ψ|²dV is the probability of finding the.', 'Use the "electron cloud" analogy: dots represent probability density — more dots near nucleus for s, zero dots on nodal.', 'Practice node counting: for any orbital, write n and l, then compute radial nodes = n-l-1, angular nodes = l.', 'Build a physical model: use wire frames for angular nodes (planes) and concentric spheres for radial nodes.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment or visualization using a 3D plotting tool (e.g., Python with Mayavi, or a physical model with balloons) to demonstrate the.', answer: 'A good answer: Plot |ψ|² for 3pz in 3D',
                  options: ['A good answer: Plot |ψ|² for 3pz in 3D', 'dumb-bell', 'the electron is confined inside that surface, whereas |ψ|² extends to infinity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis like a pendulum.' }
          ],
            remediations: { 'the-dumb-bell-shape-of': { steps: ['Revisit the physical meaning of ψ and |ψ|²: ψ is a mathematical function; |ψ|²dV is the probability of finding the.', 'Use the "electron cloud" analogy: dots represent probability density — more dots near nucleus for s, zero dots on nodal.', 'Practice node counting: for any orbital, write n and l, then compute radial nodes = n-l-1, angular nodes = l.', 'Build a physical model: use wire frames for angular nodes (planes) and concentric spheres for radial nodes.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_004', difficulty: 'standard',
          question: 'Benzene (C₆H₆) is a planar, cyclic, fully conjugated hydrocarbon with 6.',
          hint: 'If stuck, revisit Class 11 Unit 4 (Chemical Bonding) for hybridisation and resonance, and.',
          misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of.',
          parts: [
                { id: 'a', prompt: 'State the molecular formula of benzene and the Hückel rule condition for aromaticity. How many π-electrons does benzene have, and what is the value of n?', answer: 'Benzene: C₆H₆',
                  options: ['Benzene: C₆H₆', '4 π-electrons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of benzene, and that the.' },
                { id: 'b', prompt: 'Explain why benzene does not undergo addition reactions (like with Br₂/CHCl₃ or cold dilute KMnO₄) under normal conditions, whereas ethene does readily.', answer: 'Benzene\'s π-electrons are fully delocalised over six carbons, giving a',
                  options: ['Benzene\'s π-electrons are fully delocalised over six carbons, giving a', 'benzene has no double bonds', 'benzene is saturated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of benzene, and that the.' }
          ],
            remediations: { 'the-kekul-structures-alternating-double': { steps: ['Revisit the orbital picture: draw six sp² carbons in a hexagon, show p-orbitals perpendicular to plane, and shade the.', 'Use a physical model (or animation) to show that X-ray diffraction gives one C–C distance, not two.', 'Practice drawing the resonance hybrid (circle in hexagon) and the two major Kekulé contributors with double-headed.', 'For mechanism errors: always start by generating the electrophile (NO₂⁺, Cl⁺, R⁺, RCO⁺), then show attack on the.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of.',
          parts: [
                { id: 'a', prompt: 'A student performs Friedel–Crafts alkylation of benzene with 1-chloropropane (CH₃CH₂CH₂Cl) and anhydrous AlCl₃.', answer: 'Yes, expected',
                  options: ['Yes, expected', 'n-propylbenzene should form'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of benzene, and that the.' }
          ],
            remediations: { 'the-kekul-structures-alternating-double': { steps: ['Revisit the orbital picture: draw six sp² carbons in a hexagon, show p-orbitals perpendicular to plane, and shade the.', 'Use a physical model (or animation) to show that X-ray diffraction gives one C–C distance, not two.', 'Practice drawing the resonance hybrid (circle in hexagon) and the two major Kekulé contributors with double-headed.', 'For mechanism errors: always start by generating the electrophile (NO₂⁺, Cl⁺, R⁺, RCO⁺), then show attack on the.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_006', difficulty: 'standard',
          question: 'Valence Bond Theory explains covalent bond formation through the overlap of.',
          hint: 'Review Class 11 Unit 2 (Structure of Atom) - orbital shapes, quantum numbers, and.',
          misconception: 'Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than single bonds" and π.',
          parts: [
                { id: 'a', prompt: 'In the formation of HCl molecule, the half-filled 1s orbital of H overlaps with the half-filled 3p_z orbital of Cl along the internuclear axis (taken as.', answer: 'The bond formed is a sigma (σ) bond (s-p axial overlap)',
                  options: ['The bond formed is a sigma (σ) bond (s-p axial overlap)', 'π bond', 'negative overlap'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than single bonds" and π bonds appear in.' }
          ],
            remediations: { 'bonds-are-stronger-than-bonds': { steps: ['Show overlap diagrams - axial (σ) has larger overlapping region than lateral (π).', 'Give bond energy data: C-C σ ≈ 347 kJ/mol, C=C π ≈ 265 kJ/mol (total C=C ≈ 614 kJ/mol).', 'Demonstrate ethane (C₂H₆) free rotation around C-C σ bond vs ethene (C₂H₄) restricted rotation around C=C.', 'Have student explain why σ forms first in multiple bonds using "maximum overlap" principle.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than single bonds" and π.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A double bond consists of two π bonds because π bonds are formed by sidewise overlap which allows more electron sharing." Is it.', answer: 'Incorrect',
                  options: ['Incorrect', 'double bonds are stronger than single bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than single bonds" and π bonds appear in.' }
          ],
            remediations: { 'bonds-are-stronger-than-bonds': { steps: ['Show overlap diagrams - axial (σ) has larger overlapping region than lateral (π).', 'Give bond energy data: C-C σ ≈ 347 kJ/mol, C=C π ≈ 265 kJ/mol (total C=C ≈ 614 kJ/mol).', 'Demonstrate ethane (C₂H₆) free rotation around C-C σ bond vs ethene (C₂H₄) restricted rotation around C=C.', 'Have student explain why σ forms first in multiple bonds using "maximum overlap" principle.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_007', difficulty: 'standard',
          question: 'Hybridisation is the concept of mixing atomic orbitals of slightly different.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR) to practice assigning steric numbers and.',
          misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation,.',
          parts: [
                { id: 'a', prompt: 'Both NH₃ and H₂O have sp³ hybridised central atoms, yet the H–N–H bond angle (107°) is larger than the H–O–H bond angle (104.5°).', answer: 'NH₃ has one lone pair and three bond pairs',
                  options: ['NH₃ has one lone pair and three bond pairs', 'oxygen is more electronegative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation, and they confuse it.' }
          ],
            remediations: { 'hybridisation-is-a-real-physical': { steps: ['If a student cannot determine hybridisation from a Lewis structure: (1) Have them draw the Lewis structure with formal.', '(2) Count steric number = number of atoms bonded to central atom (sigma bonds) + number of lone pairs on central atom.', '(3) Map steric number to hybridisation: SN=2 → sp, SN=3 → sp², SN=4 → sp³.', '(4) Practice with ions: NO₃⁻ (SN=3, sp²), NH₄⁺ (SN=4, sp³), ClO₂⁻ (SN=4, sp³).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In the reaction BF₃ + NH₃ → F₃B←NH₃, the boron atom changes hybridisation from sp² to sp³, but the nitrogen atom remains sp³ hybridised.".', answer: 'The statement is correct',
                  options: ['The statement is correct', 'nitrogen becomes sp²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation, and they confuse it.' }
          ],
            remediations: { 'hybridisation-is-a-real-physical': { steps: ['If a student cannot determine hybridisation from a Lewis structure: (1) Have them draw the Lewis structure with formal.', '(2) Count steric number = number of atoms bonded to central atom (sigma bonds) + number of lone pairs on central atom.', '(3) Map steric number to hybridisation: SN=2 → sp, SN=3 → sp², SN=4 → sp³.', '(4) Practice with ions: NO₃⁻ (SN=3, sp²), NH₄⁺ (SN=4, sp³), ClO₂⁻ (SN=4, sp³).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
