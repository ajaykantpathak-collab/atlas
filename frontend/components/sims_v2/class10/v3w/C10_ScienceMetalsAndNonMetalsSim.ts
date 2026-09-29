import type { SimDef } from '../../engine/types';
import C10_ScienceMetalsAndNonMetalsSim from '../../../simulations/c6_12/C10_ScienceMetalsAndNonMetalsSim';

/** v3 wrapped master — C10_ScienceMetalsAndNonMetalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_sciencemetalsandnonmetalssim: SimDef = {
    id: 'v3w_c10_sciencemetalsandnonmetalssim',
    title: 'Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility',
    subtitle: 'This node covers the four physical properties of metals (lustre, hardness, malleability,.',
    classLevel: 10, subject: 'science', topic: 'Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility',
    chapters: [],
    nodeIds: ['c10_chem_cbse_03_001', 'c10_chem_cbse_03_002', 'c10_chem_cbse_03_004', 'c10_chem_cbse_03_006', 'c10_chem_cbse_03_008', 'c10_chem_cbse_03_009', 'c10_chem_cbse_01_005', 'c10_chem_cbse_02_007', 'c10_chem_cbse_05_006', 'c10_chem_cbse_05_009', 'c10_chem_cbse_05_010', 'c10_chem_cbse_04_001', 'c10_chem_cbse_04_009', 'c10_chem_cbse_03_003', 'c10_chem_cbse_03_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Begin with a real-world observation: a student sees a gold ornament shining (lustre), a blacksmith hammering.', goal: 'Master Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility.' },
    discovery: {
        question: 'Why are metals generally malleable and ductile while ionic compounds like NaCl are brittle? Explain using the nature of bonding.',
        options: ['In metals, the metallic bond is non-directional', 'metals are soft', 'ionic bonds are weak'],
        answer: 'In metals, the metallic bond is non-directional',
        hook: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under.',
    },
    teaching: [
        { title: 'Physical properties of metals such as.', text: 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection of light by free electrons), hardness (resistance to deformation, generally high except for alkali metals),.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_001', title: 'Physical properties of metals such as.',
          scaffold: { problem: 'A jeweller wants to make intricate gold ornaments. He has pure gold (24 carat) and an alloy of gold with copper (22 carat).',
            steps: [
            { text: 'Identify the structure of pure gold — face-centered cubic (FCC) with all atoms identical, allowing easy slip of planes.' },
            { text: 'Recognize that copper atoms (similar atomic radius, also FCC) substitute randomly in the gold lattice forming a.' },
            { text: 'Explain that the size mismatch (Cu slightly smaller) and different electron density distort the lattice, hindering.' },
            { text: 'Note that the FCC structure is retained, so slip systems remain active → malleability is reduced but still high enough.' },
            { text: 'Conclude: 22 carat gold (91.6% Au, 8.4% Cu) balances hardness for durability and malleability for crafting — standard.', faded: true, blankAnswer: 'Copper atoms distort the gold FCC lattice, hindering.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_002', title: 'Non-metals are elements that generally.',
          scaffold: { problem: 'A student has three unlabelled samples: X (black, soft, slippery, conducts electricity), Y (yellow, brittle, powdery, does not conduct), Z.',
            steps: [
            { text: 'List the observed properties for each sample. X: black, soft, slippery, conducts.' },
            { text: 'Recall general properties: Non-metals are usually non-lustrous, brittle, poor conductors.' },
            { text: 'Match Sample Y: yellow, brittle, powdery, non-conducting matches sulphur (typical non-metal). No exception needed.' },
            { text: 'Match Sample X: black, soft, slippery, conducts. Carbon allotrope graphite is a non-metal that conducts due to.' },
            { text: 'Match Sample Z: shiny grey (lustrous), liquid at room temperature, conducts.' },
            { text: 'Verify: Graphite (non-metal exception), Sulphur (typical non-metal), Mercury (metal exception). All consistent.', faded: true, blankAnswer: 'X = Graphite (non-metal, conducts electricity, layered.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_004', title: 'The reaction of metals with water.',
          scaffold: { problem: 'A student adds a small piece of calcium metal to a beaker of cold water. The solution turns pink with phenolphthalein.',
            steps: [
            { text: 'Identify the reactants — calcium (Ca) and cold water (H₂O). Calcium is an alkaline earth metal (Group 2) known to react.' },
            { text: 'Predict products — Group 2 metals form metal hydroxides and hydrogen gas with cold water.' },
            { text: 'Write the word equation: Calcium + Water → Calcium hydroxide + Hydrogen.' },
            { text: 'Write the skeletal equation: Ca + H₂O → Ca(OH)₂ + H₂.' },
            { text: 'Balance the equation: Ca has 1 on left, 1 on right; O has 1 on left, 2 on right → put 2 before H₂O: Ca + 2H₂O → Ca(OH)₂.' },
            { text: 'Explain alkalinity: Ca(OH)₂ is a strong base that dissociates into Ca²⁺ and OH⁻ ions; OH⁻ turns phenolphthalein pink.', faded: true, blankAnswer: 'Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g); products: calcium.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_006', title: 'A displacement reaction occurs when a.',
          scaffold: { problem: 'An iron nail is dipped in a test tube containing copper sulphate solution (blue).',
            steps: [
            { text: 'Identify reactants — Iron (Fe) is a solid metal, copper sulphate (CuSO₄) is in aqueous solution (blue due to Cu²⁺ ions).' },
            { text: 'Determine reactivity — From prior knowledge (reactions with acid/oxygen), iron is more reactive than copper, so.' },
            { text: 'Predict products — Iron displaces copper: Fe forms FeSO₄ (iron(II) sulphate, light green), copper deposits as solid Cu.' },
            { text: 'Write skeletal equation — Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).' },
            { text: 'Balance and verify — Atoms: Fe:1, Cu:1, S:1, O:4 on both sides. Charges: neutral on both sides.' },
            { text: 'Explain observations — Blue colour fades as Cu²⁺(aq) is removed; light green appears due to Fe²⁺(aq) formation;.', faded: true, blankAnswer: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s); Type: Single.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_008', title: 'When a metal (typically from Groups 1,.',
          scaffold: { problem: 'Sodium (atomic number 11) reacts with chlorine gas to form sodium chloride.',
            steps: [
            { text: 'Write electronic configurations. Na (Z=11): 2,8,1 → 1 valence electron. Cl (Z=17): 2,8,7 → 7 valence electrons.' },
            { text: 'Draw electron-dot structures. Na: one dot. Cl: seven dots (three pairs + one single).' },
            { text: 'Show electron transfer. Na loses its 1 valence electron to achieve stable octet (2,8) → Na⁺.' },
            { text: 'Write ion structures. Na⁺: no dots, bracket with + charge. Cl⁻: eight dots (four pairs), bracket with - charge.' },
            { text: 'Write balanced equation. Chlorine is diatomic: Cl₂. Two Na atoms each lose 1 e⁻ (total 2 e⁻) to one Cl₂ molecule which.' },
            { text: 'Verify atom and charge balance. Left: 2 Na, 2 Cl. Right: 2 Na, 2 Cl. Charges: neutral on both sides.', faded: true, blankAnswer: 'Electron-dot: Na• + :Cl: → [Na]⁺ + [:Cl:]⁻ (with 8 dots on.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_009', title: 'Ionic compounds are crystalline solids.',
          scaffold: { problem: 'A student has three white crystalline solids: A (NaCl), B (MgO), C (sugar C₁₂H₂₂O₁₁).',
            steps: [
            { text: 'Identify the nature of each compound — NaCl and MgO are ionic; sugar is covalent molecular.' },
            { text: 'Recall conductivity rule: ionic compounds conduct only when ions are mobile (molten or aqueous), never in solid;.' },
            { text: 'Fill table: Solid state — all three: no conduction. Aqueous — NaCl: conducts; MgO: very low conduction (sparingly.' },
            { text: 'Explain MgO vs NaCl in molten state: Both conduct because both have mobile Mg²⁺/O²⁻ and Na⁺/Cl⁻ ions.' },
            { text: 'Verify with board exam expectation: answer must mention "mobile ions" for conduction, "lattice energy" for melting.', faded: true, blankAnswer: 'Table: Solid — none conduct. Aqueous — NaCl conducts, MgO.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_chem_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility', spots: [
            { id: 's1', label: 'Physical properties of metals such', prompt: 'Which idea is this? — Physical properties of metals such as metallic lustre (shiny appearance due to reflection.', answer: 'Physical properties of metals such', options: ['Physical properties of metals such', 'Non-metals are elements that generally', 'The reaction of metals with', 'A displacement reaction occurs when'] },
            { id: 's2', label: 'Non-metals are elements that generally', prompt: 'Which idea is this? — Non-metals are elements that generally lack metallic lustre, are brittle in solid state,.', answer: 'Non-metals are elements that generally', options: ['Non-metals are elements that generally', 'Physical properties of metals such', 'The reaction of metals with', 'A displacement reaction occurs when'] },
            { id: 's3', label: 'The reaction of metals with', prompt: 'Which idea is this? — The reaction of metals with water (cold, hot, or steam) is a redox process where the.', answer: 'The reaction of metals with', options: ['The reaction of metals with', 'Physical properties of metals such', 'Non-metals are elements that generally', 'A displacement reaction occurs when'] },
            { id: 's4', label: 'A displacement reaction occurs when', prompt: 'Which idea is this? — A displacement reaction occurs when a more reactive metal displaces a less reactive metal.', answer: 'A displacement reaction occurs when', options: ['A displacement reaction occurs when', 'Physical properties of metals such', 'Non-metals are elements that generally', 'The reaction of metals with'] },
            { id: 's5', label: 'When a metal typically from', prompt: 'Which idea is this? — When a metal (typically from Groups 1, 2, or 13) reacts with a non-metal (typically from.', answer: 'When a metal typically from', options: ['When a metal typically from', 'Physical properties of metals such', 'Non-metals are elements that generally', 'The reaction of metals with'] },
            { id: 's6', label: 'Ionic compounds are crystalline solids', prompt: 'Which idea is this? — Ionic compounds are crystalline solids composed of positively charged cations and.', answer: 'Ionic compounds are crystalline solids', options: ['Ionic compounds are crystalline solids', 'Physical properties of metals such', 'Non-metals are elements that generally', 'The reaction of metals with'] }
          ] } }
    ],
    explore: { component: C10_ScienceMetalsAndNonMetalsSim, prompt: 'Explore the interactive — Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_001', difficulty: 'standard',
          question: 'Physical properties of metals such as metallic lustre (shiny appearance due to.',
          hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron.',
          misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under.',
          parts: [
                { id: 'a', prompt: 'Why are metals generally malleable and ductile while ionic compounds like NaCl are brittle? Explain using the nature of bonding.', answer: 'In metals, the metallic bond is non-directional',
                  options: ['In metals, the metallic bond is non-directional', 'metals are soft', 'ionic bonds are weak'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' },
                { id: 'b', prompt: 'A student has four metal samples: sodium (Na), magnesium (Mg), tungsten (W), and mercury (Hg).', answer: ', magnesium (Mg), tungsten (W), and mercury (Hg)',
                  options: [', magnesium (Mg), tungsten (W), and mercury (Hg)', 'metals are malleable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' },
                { id: 'c', prompt: 'Compare the malleability of gold and iron at room temperature. Which is more malleable and why? How does heating affect the malleability of iron?', answer: 'Gold is more malleable than iron at room temperature',
                  options: ['Gold is more malleable than iron at room temperature', 'gold is softer so more malleable', 'metals are malleable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' }
          ],
            remediations: { 'students-often-write-metals-are': { steps: ['Revisit the electron sea model from Class 9 (c9_chem_ch2_6, c9_chem_ch3_5) — draw diagrams showing positive ions in a.', 'Use layered diagrams to show how ions slide in metals vs. like-charge repulsion in ionic solids.', 'Memorize the exception table: Group 1 metals (soft, low mp), Mercury (liquid), Tungsten (hard, high mp), Gold (most.', 'Practice writing the exact phrase "non-directional metallic bonding allows layers of cations to slide over each other".'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All metals are hard, so they cannot be cut with a knife." Identify the error and give two counterexamples with reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'mercury', 'cut with a knife', 'metals are malleable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' },
                { id: 'b', prompt: 'Design a simple experiment using only a hammer, a battery, a bulb, wires, and samples of iron, copper, sulfur, and graphite to distinguish metals from.', answer: 'Procedure: (1) Try to flatten each sample with a hammer',
                  options: ['Procedure: (1) Try to flatten each sample with a hammer', 'metals are malleable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' }
          ],
            remediations: { 'students-often-write-metals-are': { steps: ['Revisit the electron sea model from Class 9 (c9_chem_ch2_6, c9_chem_ch3_5) — draw diagrams showing positive ions in a.', 'Use layered diagrams to show how ions slide in metals vs. like-charge repulsion in ionic solids.', 'Memorize the exception table: Group 1 metals (soft, low mp), Mercury (liquid), Tungsten (hard, high mp), Gold (most.', 'Practice writing the exact phrase "non-directional metallic bonding allows layers of cations to slide over each other".'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_002', difficulty: 'standard',
          question: 'Non-metals are elements that generally lack metallic lustre, are brittle in.',
          hint: 'If stuck, review Class 9 node c9_chem_ch3_4 (Covalent Bonding) and Class 8 nodes.',
          misconception: 'Students often write "graphite is a metal because it conducts electricity" or "mercury is a non-metal because it is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Non-metals are elements that generally lack metallic lustre, are brittle in solid state,',
                  options: ['Non-metals are elements that generally lack metallic lustre, are brittle in solid state,', 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection', 'The reaction of metals with water (cold, hot, or steam) is a redox process where the', 'A displacement reaction occurs when a more reactive metal displaces a less reactive metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "graphite is a metal because it conducts electricity" or "mercury is a non-metal because it is liquid".' }
          ],
            remediations: { 'students-often-write-graphite-is': { steps: ['Revisit the definition of metals vs non-metals based on electron loss/gain tendency (Class 9, c9_chem_ch3_5).', 'Draw the structures of diamond and graphite side-by-side; highlight the delocalised electron in graphite.', 'Test conductivity of pencil lead vs sulphur vs copper wire in a lab activity.', 'Write a comparison table: Property | Metal | Non-metal | Exception (Graphite) | Exception (Mercury) to cement the.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "graphite is a metal because it conducts electricity" or "mercury is a non-metal because it is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All non-metals are gases or brittle solids at room temperature." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'no exception'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "graphite is a metal because it conducts electricity" or "mercury is a non-metal because it is liquid".' }
          ],
            remediations: { 'students-often-write-graphite-is': { steps: ['Revisit the definition of metals vs non-metals based on electron loss/gain tendency (Class 9, c9_chem_ch3_5).', 'Draw the structures of diamond and graphite side-by-side; highlight the delocalised electron in graphite.', 'Test conductivity of pencil lead vs sulphur vs copper wire in a lab activity.', 'Write a comparison table: Property | Metal | Non-metal | Exception (Graphite) | Exception (Mercury) to cement the.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_004', difficulty: 'standard',
          question: 'The reaction of metals with water (cold, hot, or steam) is a redox process.',
          hint: 'If stuck, revisit writing chemical formulae using valency (c9_chem_ch3_6) and the concept.',
          misconception: 'Students often write the product of iron with steam as FeO (iron(II) oxide) instead of Fe₃O₄ (iron(II,III) oxide,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The reaction of metals with water (cold, hot, or steam) is a redox process where the',
                  options: ['The reaction of metals with water (cold, hot, or steam) is a redox process where the', 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection', 'Non-metals are elements that generally lack metallic lustre, are brittle in solid state,', 'A displacement reaction occurs when a more reactive metal displaces a less reactive metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the product of iron with steam as FeO (iron(II) oxide) instead of Fe₃O₄ (iron(II,III) oxide, magnetic oxide).' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['Show the student a video of iron + steam producing a black magnetic solid; ask them to test the solid with a magnet.', 'Demonstrate magnesium ribbon in cold water (no visible bubbles) vs.', 'Have them write the three balanced equations (Na + cold water, Mg + hot water, Fe + steam) side by side and highlight.', 'Assign a 3-mark board-style question: "Write the reaction of iron with steam. Name the product and state its colour."'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_006', difficulty: 'standard',
          question: 'A displacement reaction occurs when a more reactive metal displaces a less.',
          hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) and c9_chem_ch3_5 (Ionic.',
          misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral.',
          parts: [
                { id: 'a', prompt: 'An iron nail is placed in a solution of zinc sulphate. Will a reaction occur? Explain why or why not using the reactivity series.', answer: 'No reaction occurs',
                  options: ['No reaction occurs', 'yes, iron will displace zinc'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral metal atoms (Cu(s)).' },
                { id: 'b', prompt: 'Compare the reactions: (i) Cu(s) + FeSO₄(aq) → ? and (ii) Fe(s) + CuSO₄(aq) → ?.', answer: 'Reaction (ii) occurs',
                  options: ['Reaction (ii) occurs', 'both occur', 'neither occurs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral metal atoms (Cu(s)).' }
          ],
            remediations: { 'students-often-write-the-displaced': { steps: ['Revisit Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) to practice valency cross-method for metal salts.', 'Use a reactivity series chart (from upcoming node c10_chem_cbse_03_007) and physically arrange metal-salt pairs — if.', 'For each predicted reaction, write the equation on paper, then check: (a) correct formulae using valency, (b) balanced.', 'Do the iron nail in CuSO₄ experiment at home (with adult supervision) — observe the reddish-brown Cu(s) coating and.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral.',
          parts: [
                { id: 'a', prompt: 'A student writes the equation for magnesium reacting with copper sulphate as: Mg + CuSO₄ → MgSO₄ + Cu. The teacher marks it incomplete.', answer: 'State symbols are missing: Mg(s) + CuSO₄(aq) → MgSO₄(aq) + Cu(s)',
                  options: ['State symbols are missing: Mg(s) + CuSO₄(aq) → MgSO₄(aq) + Cu(s)', 'nothing is missing', 'balancing is wrong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral metal atoms (Cu(s)).' },
                { id: 'b', prompt: 'Compare the reactions: (i) Cu(s) + FeSO₄(aq) → ? and (ii) Fe(s) + CuSO₄(aq) → ?.', answer: 'Reaction (ii) occurs',
                  options: ['Reaction (ii) occurs', 'both occur', 'neither occurs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral metal atoms (Cu(s)).' }
          ],
            remediations: { 'students-often-write-the-displaced': { steps: ['Revisit Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) to practice valency cross-method for metal salts.', 'Use a reactivity series chart (from upcoming node c10_chem_cbse_03_007) and physically arrange metal-salt pairs — if.', 'For each predicted reaction, write the equation on paper, then check: (a) correct formulae using valency, (b) balanced.', 'Do the iron nail in CuSO₄ experiment at home (with adult supervision) — observe the reddish-brown Cu(s) coating and.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_008', difficulty: 'standard',
          question: 'When a metal (typically from Groups 1, 2, or 13) reacts with a non-metal.',
          hint: 'Review Class 9 nodes c9_chem_ch2_6 (Electron Distribution) and c9_chem_ch2_7 (Valency) —.',
          misconception: 'Students often write the formula of ionic compounds by simply swapping valencies (criss-cross method) without.',
          parts: [
                { id: 'a', prompt: 'Why does calcium chloride have the formula CaCl₂ and not CaCl or CaCl₃? Explain using the concept of electron transfer and charge neutrality.', answer: 'Calcium (Group 2) loses 2 electrons to form Ca²⁺',
                  options: ['Calcium (Group 2) loses 2 electrons to form Ca²⁺', 'CaCl because both have valency 1', 'chlorine can accept 3 electrons, violating the octet rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the formula of ionic compounds by simply swapping valencies (criss-cross method) without understanding the electron.' }
          ],
            remediations: { 'students-often-write-the-formula': { steps: ['Revisit Class 9 node c9_chem_ch3_5 (Ionic Bonding: Transfer of Electrons) and c9_chem_ch3_6 (Writing Chemical.', 'Use the "charge balance" rule: total positive charge = total negative charge.', 'For diatomic non-metals, always write the balanced equation with O₂, N₂, Cl₂, etc.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_009', difficulty: 'standard',
          question: 'Ionic compounds are crystalline solids composed of positively charged cations.',
          hint: 'Revisit c10_chem_cbse_03_008 (formation of ionic compounds) and c9_chem_ch3_5 (ionic.',
          misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic.',
          parts: [
                { id: 'a', prompt: 'State the physical state of ionic compounds at room temperature and give one reason based on their structure.', answer: 'Ionic compounds are solids at room temperature',
                  options: ['Ionic compounds are solids at room temperature', 'they are gases', 'weak forces'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic conduction (mobile ions) with.' }
          ],
            remediations: { 'students-often-write-ionic-compounds': { steps: ['Show a video of molten NaCl electrolysis (chlorine at anode, sodium at cathode) — ask "what carries current?".', 'Use a conductivity tester with solid NaCl, then aqueous, then molten — student records bulb brightness.', 'Have student draw ion positions in solid vs molten lattice.', 'Practice writing "mobile ions" not "free electrons" in three board-style questions.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using school lab equipment to prove that an unknown white crystalline solid is ionic. List steps, observations, and conclusions.', answer: '(1) Test physical state',
                  options: ['(1) Test physical state', 'ionic compounds conduct electricity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic conduction (mobile ions) with.' }
          ],
            remediations: { 'students-often-write-ionic-compounds': { steps: ['Show a video of molten NaCl electrolysis (chlorine at anode, sodium at cathode) — ask "what carries current?".', 'Use a conductivity tester with solid NaCl, then aqueous, then molten — student records bulb brightness.', 'Have student draw ion positions in solid vs molten lattice.', 'Practice writing "mobile ions" not "free electrons" in three board-style questions.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
