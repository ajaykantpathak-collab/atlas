import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch11 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch11: SimDef = {
    id: 'v3_c11_chem_ch11',
    title: 'Hydrocarbons',
    subtitle: 'This node covers: IUPAC nomenclature of alkanes (including complex branching), isomerism.',
    classLevel: 11, subject: 'chemistry', topic: 'Hydrocarbons',
    chapters: ['c11_chem_ch11'],
    nodeIds: ['c11_chem_cbse_11_001', 'c11_chem_cbse_11_002', 'c11_chem_cbse_11_003', 'c11_chem_cbse_11_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by observing a **LPG cylinder** in an Indian kitchen — the fuel is primarily **n-butane and isobutane.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Write the IUPAC name and draw the line-bond structure for the alkane with molecular formula C₆H₁₄ that has **only primary and quaternary carbon atoms** (no.',
        options: ['**Answer:** 2,2-Dimethylbutane (Neohexane)', 'hexane', '3-methylpentane'],
        answer: '**Answer:** 2,2-Dimethylbutane (Neohexane)',
        hook: '**Misconception:** "In Newman projections, the **eclipsed conformation** has the **front and back hydrogens perfectly.',
    },
    teaching: [
        { title: 'Alkanes — Preparation, Properties and Conformations', text: 'Alkanes are acyclic (open-chain) saturated hydrocarbons with the general formula **CₙH₂ₙ₊₂**, containing only carbon–carbon single (σ) bonds and carbon–hydrogen single (σ) bonds.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_chem_cbse_11_001', title: 'Alkanes — Preparation, Properties and Conformations',
          caseStudy: { intro: 'Start by observing a **LPG cylinder** in an Indian kitchen — the fuel is primarily **n-butane and isobutane (2-methylpropane)**, both alkanes with formula.',
            decisions: [{ prompt: 'Write the IUPAC name and draw the line-bond structure for the alkane with molecular formula C₆H₁₄ that has **only primary and quaternary.', options: [
                { text: '**Answer:** 2,2-Dimethylbutane (Neohexane)', outcome: '**Answer:** 2,2-Dimethylbutane (Neohexane). Structure: CH₃–C(CH₃)₂–CH₂–CH₃ (central C bonded to 3.' },
                { text: 'hexane', outcome: 'Not quite — **Misconception:** "In Newman projections, the **eclipsed conformation** has the **front and back.', reveals: 'misconception-in-newman-projections' },
                { text: '3-methylpentane', outcome: 'Not quite — **Misconception:** "In Newman projections, the **eclipsed conformation** has the **front and back.', reveals: 'misconception-in-newman-projections' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_11_002', title: 'Alkenes — Geometrical Isomerism and Reactions',
          scaffold: { problem: 'A hydrocarbon with molecular formula C₅H₁₀ decolorises bromine water and on ozonolysis followed by Zn/H₂O workup gives a single product.',
            steps: [
            { text: 'Decolorisation of Br₂ water indicates unsaturation (C=C). Molecular formula C₅H₁₀ matches general formula CₙH₂ₙ →.' },
            { text: 'Ozonolysis cleaves C=C to give carbonyl compounds. Single product (propanone) in two moles implies a symmetrical alkene.' },
            { text: 'Propanone is CH₃COCH₃ (3 carbons). The original alkene must have 5 carbons total.' },
            { text: 'Correct approach: Ozonolysis of an alkene gives two fragments.' },
            { text: 'Re-read problem: "gives a single product: propanone". Could it be that the *other* product is volatile/formaldehyde and.' },
            { text: 'Wait — molecular formula C₅H₁₀ with one double bond *and* a ring?', faded: true, blankAnswer: 'Hydrocarbon is 2-methylbut-2-ene, (CH₃)₂C=CHCH₃. It does.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_11_003', title: 'Alkynes — Preparation and Reactions',
          scaffold: { problem: 'An organic compound \'X\' (C₄H₆) decolorises bromine water and reacts with ammoniacal AgNO₃ to give a white precipitate.',
            steps: [
            { text: 'Analyse clues — C₄H₆ fits alkyne (CₙH₂ₙ₋₂, n=4). Decolorises Br₂ water → unsaturation (C≡C).' },
            { text: 'Reaction with NaNH₂ deprotonates terminal H → sodium acetylide (CH₃CH₂C≡C⁻Na⁺).' },
            { text: 'Ozonolysis of Y cleaves C≡C. For internal alkyne R-C≡C-R\', gives 2 ketones: R-COOH?' },
            { text: 'Re-evaluate: If Y gives only acetone on ozonolysis, Y must be 2-butyne? But Y is C₅H₈.' },
            { text: 'Revised consistent problem: X = But-1-yne (C₄H₆). NaNH₂/CH₃I → Y = Pent-2-yne (C₅H₈).', faded: true, blankAnswer: 'X = But-1-yne (CH₃CH₂C≡CH); Y = Pent-2-yne (CH₃CH₂C≡CCH₃).' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_11_004', title: 'Aromatic Hydrocarbons — Benzene and Electrophilic Substitution',
          caseStudy: { intro: 'Start with the familiar smell of mothballs (naphthalene) or the sweet odour of petrol (benzene/toluene) — students recognise these as "aromatic" in the.',
            decisions: [{ prompt: 'State the molecular formula of benzene and the Hückel rule condition for aromaticity.', options: [
                { text: 'Benzene: C₆H₆', outcome: 'Benzene: C₆H₆. Hückel rule: (4n+2) π-electrons, n = 0, 1, 2… Benzene has 6 π-electrons (3 π-bonds.' },
                { text: '4 π-electrons', outcome: 'Not quite — Students often believe that the Kekulé structures (alternating double/single bonds) are the actual.', reveals: 'the-kekul-structures-alternating-double' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_11_004', title: 'You made it',
          caseStudy: { intro: 'You finished Hydrocarbons — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_001', difficulty: 'standard',
          question: 'Alkanes are acyclic (open-chain) saturated hydrocarbons with the general.',
          hint: 'If stuck, revisit **c10_chem_cbse_04_008 (IUPAC Nomenclature)** for naming rules and.',
          misconception: '**Misconception:** "In Newman projections, the **eclipsed conformation** has the **front and back hydrogens perfectly.',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name and draw the line-bond structure for the alkane with molecular formula C₆H₁₄ that has **only primary and quaternary carbon atoms** (no.', answer: '**Answer:** 2,2-Dimethylbutane (Neohexane)',
                  options: ['**Answer:** 2,2-Dimethylbutane (Neohexane)', 'hexane', '3-methylpentane', 'primary/quaternary only'],
                  hint: 'If stuck, revisit **c10_chem_cbse_04_008 (IUPAC Nomenclature)** for naming rules and.',
                  misconception: '**Misconception:** "In Newman projections, the **eclipsed conformation** has the **front and back hydrogens perfectly overlapping**.' }
          ],
            remediations: { 'misconception-in-newman-projections': { steps: ['**Physical model:** Use two **cardboard circles** (front/back C) with **three matchsticks** (H) each at 120°.', 'Rotate to show 0° (eclipsed) and 60° (staggered).', 'Measure H···H distance with ruler — it\'s never zero.', '**Energy diagram:** Plot **Potential Energy vs Dihedral Angle (0°→360°)**.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_002', difficulty: 'standard',
          question: 'Geometrical isomerism in alkenes is a form of stereoisomerism arising from.',
          hint: 'If stuck, revisit c10_chem_cbse_04_004 (alkene structure/unsaturation) and.',
          misconception: 'Students often believe that *any* alkene with a double bond shows geometrical isomerism, and they incorrectly apply the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geometrical isomerism in alkenes is a form of stereoisomerism arising from restricted',
                  options: ['Geometrical isomerism in alkenes is a form of stereoisomerism arising from restricted', 'Alkanes are acyclic (open-chain) saturated hydrocarbons with the general formula', 'Alkynes are unsaturated hydrocarbons containing at least one carbon-carbon triple bond', 'Benzene (C₆H₆) is a planar, cyclic, fully conjugated hydrocarbon with 6 π-electrons'],
                  hint: 'If stuck, revisit c10_chem_cbse_04_004 (alkene structure/unsaturation) and c10_chem_cbse_04_008.',
                  misconception: 'Students often believe that *any* alkene with a double bond shows geometrical isomerism, and they incorrectly apply the rule by counting.' }
          ],
            remediations: { 'any-alkene-with-a-double': { steps: ['Draw the alkene with explicit H atoms on each sp² carbon.', 'Circle the two substituents on *each* doubly bonded carbon.', 'Ask: "Are the two groups on the left carbon different? Are the two groups on the right carbon different?" If *both*.', 'For *E/Z*, assign CIP priority on each carbon separately (higher atomic number = higher priority).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_003', difficulty: 'standard',
          question: 'Alkynes are unsaturated hydrocarbons containing at least one carbon-carbon.',
          hint: 'Revisit c11_chem_cbse_11_002 (Alkenes) for addition mechanisms and Markovnikov rule.',
          misconception: 'Students write the hydration product of propyne (CH₃-C≡CH) as CH₃-CH₂-CHO (propanal) by blindly applying "terminal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alkynes are unsaturated hydrocarbons containing at least one carbon-carbon triple bond',
                  options: ['Alkynes are unsaturated hydrocarbons containing at least one carbon-carbon triple bond', 'Alkanes are acyclic (open-chain) saturated hydrocarbons with the general formula', 'Geometrical isomerism in alkenes is a form of stereoisomerism arising from restricted', 'Benzene (C₆H₆) is a planar, cyclic, fully conjugated hydrocarbon with 6 π-electrons'],
                  hint: 'Revisit c11_chem_cbse_11_002 (Alkenes) for addition mechanisms and Markovnikov rule; revisit.',
                  misconception: 'Students write the hydration product of propyne (CH₃-C≡CH) as CH₃-CH₂-CHO (propanal) by blindly applying "terminal alkyne → aldehyde" rule.' }
          ],
            remediations: { 'students-write-the-hydration-product': { steps: ['Draw the mechanism — H⁺ adds to triple bond forming more stable carbocation (secondary > primary for propyne).', 'Water attacks carbocation → enol.', 'Show keto-enol tautomerisation (H shift, π bond shift).', 'Practice with 3 terminal alkynes (1-butyne, 2-methyl-1-butyne) and 2 internal alkynes (2-butyne, 3-hexyne) — predict.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the hydration product of propyne (CH₃-C≡CH) as CH₃-CH₂-CHO (propanal) by blindly applying "terminal.',
          parts: [
                { id: 'a', prompt: 'A student writes the reaction: CH₃-C≡CH + H₂ (1 mol, Lindlar\'s catalyst) → CH₃-CH=CH₂ (propene). Evaluate if this is correct.', answer: 'Incorrect',
                  options: ['Incorrect', 'Lindlar\'s gives cis-alkene'],
                  hint: 'Revisit c11_chem_cbse_11_002 (Alkenes) for addition mechanisms and Markovnikov rule; revisit.',
                  misconception: 'Students write the hydration product of propyne (CH₃-C≡CH) as CH₃-CH₂-CHO (propanal) by blindly applying "terminal alkyne → aldehyde" rule.' }
          ],
            remediations: { 'students-write-the-hydration-product': { steps: ['Draw the mechanism — H⁺ adds to triple bond forming more stable carbocation (secondary > primary for propyne).', 'Water attacks carbocation → enol.', 'Show keto-enol tautomerisation (H shift, π bond shift).', 'Practice with 3 terminal alkynes (1-butyne, 2-methyl-1-butyne) and 2 internal alkynes (2-butyne, 3-hexyne) — predict.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_11_004', difficulty: 'standard',
          question: 'Benzene (C₆H₆) is a planar, cyclic, fully conjugated hydrocarbon with 6.',
          hint: 'If stuck, revisit Class 11 Unit 4 (Chemical Bonding) for hybridisation and resonance, and.',
          misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure.',
          parts: [
                { id: 'a', prompt: 'State the molecular formula of benzene and the Hückel rule condition for aromaticity. How many π-electrons does benzene have, and what is the value of n?', answer: 'Benzene: C₆H₆',
                  options: ['Benzene: C₆H₆', '4 π-electrons'],
                  hint: 'If stuck, revisit Class 11 Unit 4 (Chemical Bonding) for hybridisation and resonance, and Class 11.',
                  misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of benzene, and that the.' },
                { id: 'b', prompt: 'Explain why benzene does not undergo addition reactions (like with Br₂/CHCl₃ or cold dilute KMnO₄) under normal conditions, whereas ethene does readily.', answer: 'Benzene\'s π-electrons are fully delocalised over six carbons, giving a',
                  options: ['Benzene\'s π-electrons are fully delocalised over six carbons, giving a', 'benzene has no double bonds', 'benzene is saturated'],
                  hint: 'If stuck, revisit Class 11 Unit 4 (Chemical Bonding) for hybridisation and resonance, and Class 11.',
                  misconception: 'Students often believe that the Kekulé structures (alternating double/single bonds) are the actual structure of benzene, and that the.' }
          ],
            remediations: { 'the-kekul-structures-alternating-double': { steps: ['Revisit the orbital picture: draw six sp² carbons in a hexagon, show p-orbitals perpendicular to plane, and shade the.', 'Use a physical model (or animation) to show that X-ray diffraction gives one C–C distance, not two.', 'Practice drawing the resonance hybrid (circle in hexagon) and the two major Kekulé contributors with double-headed.', 'For mechanism errors: always start by generating the electrophile (NO₂⁺, Cl⁺, R⁺, RCO⁺), then show attack on the.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
