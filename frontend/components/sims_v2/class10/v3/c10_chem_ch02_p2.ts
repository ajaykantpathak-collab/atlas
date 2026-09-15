import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch02_p2: SimDef = {
    id: 'v3_c10_chem_ch02_p2',
    title: 'Acids, Bases and Salts · Part 2/2',
    subtitle: 'Unmask mystery solutions with indicators and decode acid strength',
    classLevel: 10, subject: 'chemistry', topic: 'Acids, Bases and Salts · Part 2/2',
    chapters: ['c10_chem_ch02'],
    nodeIds: ['c10_chem_cbse_02_007', 'c10_chem_cbse_02_008', 'c10_chem_cbse_02_009', 'c10_chem_cbse_02_010', 'c10_chem_cbse_02_011', 'c10_chem_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a quality-control chemist in a food-testing lab', intro: 'Lemon on a cut stings; baking soda calms heartburn. Behind both is the same quiet tug-of-war between hydrogen ions and hydroxide ions.', goal: 'Use indicators correctly — including the ones that trick students — and explain acid strength as degree of ionisation.' },
    discovery: {
        question: 'Ant bites burn — then soap stops the pain. What just happened on your skin?',
        options: ['A base neutralised the ant\'s acid', 'The soap cooled the skin', 'Ant venom evaporated', 'Soap blocked the nerves'],
        answer: 'A base neutralised the ant\'s acid',
        hook: 'Acid + base → salt + water. One reaction explains ant bites, stomach acid, and soil treatment.',
    },
    teaching: [
        { title: 'Reaction of Acids with Metal Oxides and Bases with Non-Metal Oxides', text: 'Acids react with metal oxides (basic oxides) to form a salt and water, while bases react with non-metal oxides (acidic oxides) to form a salt and water; both are neutralisation reactions where the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_02_007', title: 'Your mission',
          mission: { widget: 'ph', validate: 'ph:probe=25',
            instruction: 'On the lab: probe a pH below 4 — acid or base?.',
        context: 'Probe a pH below 4 — acid or base?',
            observePrompt: 'What did the ph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_008', title: 'pH Scale: Measurement of Acid-Base Strength (0-14)',
          scaffold: { problem: 'A farmer tests his soil and finds it requires pH 6.5 for optimal wheat growth. He has a stock solution of HCl with pH = 1.0.',
            steps: [
            { text: 'Identify what is given: initial pH = 1.0, target pH = 6.5. We need dilution factor.' },
            { text: 'Convert pH to [H⁺] using [H⁺] = 10⁻ᵖᴴ. Initial [H⁺] = 10⁻¹ = 0.1 M. Target [H⁺] = 10⁻⁶·⁵ = 3.16 × 10⁻⁷ M.' },
            { text: 'Dilution factor = initial concentration / final concentration = 0.1 / (3.16 × 10⁻⁷) = 3.16 × 10⁵.' },
            { text: 'Since each 10× dilution increases pH by 1 unit, from pH 1 to 6.5 is 5.5 units, so dilution factor = 10⁵·⁵ = 3.16 × 10⁵.' },
            { text: 'Interpret: The stock must be diluted about 316,000 times. For example, 1 mL stock made up to 316 L.', faded: true, blankAnswer: 'Dilution factor ≈ 3.16 × 10⁵ (or about 316,000 times).' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_009', title: 'Importance of pH in Everyday Life (Digestion, Soil, Tooth Decay)',
          caseStudy: { intro: 'Observe a farmer testing soil with pH paper before sowing wheat, a student reaching for an antacid after spicy food, and a dentist warning about fizzy drinks.',
            decisions: [{ prompt: 'State the typical pH range of the human stomach and the critical pH value below which tooth enamel (hydroxyapatite) begins to demineralize.', options: [
                { text: 'Stomach pH: 1.5–3.5', outcome: 'Stomach pH: 1.5–3.5; Critical pH for enamel demineralization: 5.5.' },
                { text: 'sugar rots teeth', outcome: 'Not quite — Students believe tooth decay is caused directly by sugar, writing "sugar rots teeth" in exams.', reveals: 'tooth-decay-is-caused-directly' },
                { text: 'antacid reduces acid production', outcome: 'Not quite — Students believe tooth decay is caused directly by sugar, writing "sugar rots teeth" in exams.', reveals: 'tooth-decay-is-caused-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_010', title: 'Salts: Family of Salts and pH of Salt Solutions',
          caseStudy: { intro: 'Observe that table salt (NaCl) solution feels neutral on skin, but washing soda (Na₂CO₃) solution feels soapy and turns red litmus blue, while ammonium.',
            decisions: [{ prompt: 'Name the family of salts to which Na₂SO₄, NaNO₃, and NaCl belong. What is the common ion?', options: [
                { text: 'These salts belong to the sodium salt family (common cation Na⁺)', outcome: 'These salts belong to the sodium salt family (common cation Na⁺).' },
                { text: 'chloride family', outcome: 'Not quite — Students often think that the pH of a salt solution depends on the salt\'s own "acidity".', reveals: 'the-ph-of-a-salt' },
                { text: 'sulphate family', outcome: 'Not quite — Students often think that the pH of a salt solution depends on the salt\'s own "acidity".', reveals: 'the-ph-of-a-salt' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_011', title: 'Chemicals from Common Salt: Sodium Hydroxide (Chlor-Alkali Process)',
          caseStudy: { intro: 'Start with a real-world observation: when you sprinkle common salt (NaCl) on a cut lemon, nothing dramatic happens, but pass electricity through its.',
            decisions: [{ prompt: 'What is the name of the industrial process used to produce sodium hydroxide from common salt, and what are the three main products formed?', options: [
                { text: 'The process is called the chlor-alkali process', outcome: 'The process is called the chlor-alkali process. The three main products are sodium hydroxide.' },
                { text: 'electrolysis of water', outcome: 'Not quite — Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and.', reveals: 'students-often-write-the-anode' },
                { text: 'electrolysis of water" or listing oxygen as a product', outcome: 'Not quite — Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and.', reveals: 'students-often-write-the-anode' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_012', title: 'Bleaching Powder, Baking Soda, Washing Soda and Plaster of Paris',
          scaffold: { problem: 'A sample of bleaching powder is suspected to be contaminated with calcium chloride.',
            steps: [
            { text: 'Identify the reaction: CaOCl₂ + H₂SO₄ → CaSO₄ + H₂O + Cl₂↑. Only CaOCl₂ liberates Cl₂; CaCl₂ does not react to give Cl₂.' },
            { text: 'Calculate moles of Cl₂ collected: Volume = 2.24 L at STP → moles = 2.24 / 22.4 = 0.1 mol.' },
            { text: 'From stoichiometry, 1 mol CaOCl₂ gives 1 mol Cl₂. So 0.1 mol Cl₂ comes from 0.1 mol CaOCl₂.' },
            { text: 'Mass of pure CaOCl₂ in sample = moles × molar mass. Molar mass CaOCl₂ = 40 + 16 + 71 = 127 g/mol.' },
            { text: 'Mass of Cl₂ liberated = 0.1 mol × 71 g/mol = 7.1 g. This 7.1 g Cl₂ comes from 10 g sample.' },
            { text: 'Commercial bleaching powder has 35-40% available chlorine. 71% is impossibly high — indicates calculation error.', faded: true, blankAnswer: '% available chlorine = 71% (theoretically impossible.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A home garden\'s soil tests too acidic, and the rose plants are yellowing despite good watering. Grandfather suggests mixing in slaked lime. The neighbour instead recommends pouring vinegar into the beds, \'because sour things feed sour soil.\'',
            decisions: [{ prompt: 'Whose advice will actually fix the soil, and why?', options: [
                { text: 'Slaked lime, calcium hydroxide, is a base — it neutralises the excess acid in the soil and raises the pH back toward a level plants tolerate. Vinegar is acetic acid; adding it would push the pH even lower.', outcome: 'Neutralisation is the point: a base cancels acid. Gardeners really do treat acidic soil with lime for exactly this reason.' },
                { text: 'Vinegar is the better choice because acid added to acidic soil will balance it the way like dissolves like.', outcome: 'Like does not neutralise like — adding acid to acid only makes the soil more acidic and the plants worse.', reveals: 'acid-fixes-acid-soil' },
                { text: 'Neither chemical is needed; the plants just need more water to dilute the acid away permanently.', outcome: 'Water dilutes temporarily but the acid remains in the soil and concentrates again as the soil dries; only a neutralising base removes it.', reveals: 'dilution-removes-acid' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'pH, indicators, neutralisation — you can now read any liquid\'s chemistry by colour alone.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'ph', prompt: 'Explore the ph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'ph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_007', difficulty: 'standard',
          question: 'Acids react with metal oxides (basic oxides) to form a salt and water, while.',
          hint: 'If stuck, revise c9_chem_ch3_6 (Writing Chemical Formulae) and c10_chem_cbse_02_006.',
          misconception: 'Students often write the salt formula incorrectly by using the wrong valency for the metal in the oxide (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids react with metal oxides (basic oxides) to form a salt and water, while bases react',
                  options: ['Acids react with metal oxides (basic oxides) to form a salt and water, while bases react', 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are', 'Acid-base indicators are weak organic acids or bases that undergo a reversible colour', 'Olfactory indicators are substances whose characteristic odour changes or disappears in'],
                  hint: 'If stuck, revise c9_chem_ch3_6 (Writing Chemical Formulae) and c10_chem_cbse_02_006 (Neutralisation.',
                  misconception: 'Students often write the salt formula incorrectly by using the wrong valency for the metal in the oxide (e.g., writing FeO instead of Fe₂O₃.' }
          ],
            remediations: { 'students-often-write-the-salt': { steps: ['Revisit valency cross-method using c9_chem_ch3_6 — write formulae of metal oxides and resulting salts for Fe, Cu,.', 'Make a two-column table: "Metal Oxides (Basic)" vs "Non-metal Oxides (Acidic)" with examples from Class 10 textbook.', 'Practice 5 balanced equations for each type, checking atom counts aloud.', 'Use the "acid + base → salt + water" template to predict products before balancing.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the salt formula incorrectly by using the wrong valency for the metal in the oxide (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment to prove that zinc oxide behaves as a basic oxide. List the materials, procedure, observation, and conclusion.', answer: 'Materials: ZnO powder, dilute HCl, test tube, dropper',
                  options: ['Materials: ZnO powder, dilute HCl, test tube, dropper', 'uses NaOH instead of acid, or expects gas evolution'],
                  hint: 'If stuck, revise c9_chem_ch3_6 (Writing Chemical Formulae) and c10_chem_cbse_02_006 (Neutralisation.',
                  misconception: 'Students often write the salt formula incorrectly by using the wrong valency for the metal in the oxide (e.g., writing FeO instead of Fe₂O₃.' }
          ],
            remediations: { 'students-often-write-the-salt': { steps: ['Revisit valency cross-method using c9_chem_ch3_6 — write formulae of metal oxides and resulting salts for Fe, Cu,.', 'Make a two-column table: "Metal Oxides (Basic)" vs "Non-metal Oxides (Acidic)" with examples from Class 10 textbook.', 'Practice 5 balanced equations for each type, checking atom counts aloud.', 'Use the "acid + base → salt + water" template to predict products before balancing.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_008', difficulty: 'standard',
          question: 'pH is the negative logarithm (base 10) of the hydrogen ion concentration in.',
          hint: 'If stuck, review Class 9 Solutions (c9_chem_ch1_2) for molarity calculations and Class 9.',
          misconception: 'Students often think pH 0 is the most acidic possible and pH 14 the most basic, but concentrated acids can have.',
          parts: [
                { id: 'a', prompt: 'Define pH and state the pH range for acidic, neutral, and basic solutions at 25°C.', answer: 'pH = -log₁₀[H⁺]; acidic: pH < 7, neutral: pH = 7, basic: pH > 7',
                  options: ['pH = -log₁₀[H⁺]; acidic: pH < 7, neutral: pH = 7, basic: pH > 7', 'pH 7 is always neutral', 'acidic pH > 7'],
                  hint: 'If stuck, review Class 9 Solutions (c9_chem_ch1_2) for molarity calculations and Class 9 Atomic.',
                  misconception: 'Students often think pH 0 is the most acidic possible and pH 14 the most basic, but concentrated acids can have negative pH (e.g., 10 M HCl.' },
                { id: 'b', prompt: 'Solution A has pH = 3 and Solution B has pH = 5. Which solution is more acidic and by how many times?', answer: 'Solution A is more acidic',
                  options: ['Solution A is more acidic', 'pH becomes 3.1', 'acidity increases 10 times'],
                  hint: 'If stuck, review Class 9 Solutions (c9_chem_ch1_2) for molarity calculations and Class 9 Atomic.',
                  misconception: 'Students often think pH 0 is the most acidic possible and pH 14 the most basic, but concentrated acids can have negative pH (e.g., 10 M HCl.' }
          ],
            remediations: { 'ph-0-is-the-most': { steps: ['Revisit the definition of logarithm: if 10ˣ = y, then log y = x.', 'Practice converting 10⁻³, 10⁻⁵, 2×10⁻³ to pH mentally.', 'Use a pH simulation (e.g., PhET) to see how [H⁺] changes with dilution and how pH changes by 1 unit for 10× dilution.', 'Solve 5 numerical problems: two monoprotic, two diprotic, one very dilute acid (10⁻⁸ M) to confront the water.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_009', difficulty: 'standard',
          question: 'pH is a critical factor in biological and environmental systems: in digestion.',
          hint: 'Review c10_chem_cbse_02_006 (neutralization equations) and c10_chem_cbse_02_008 (pH scale.',
          misconception: 'Students believe tooth decay is caused directly by sugar, writing "sugar rots teeth" in exams.',
          parts: [
                { id: 'a', prompt: 'State the typical pH range of the human stomach and the critical pH value below which tooth enamel (hydroxyapatite) begins to demineralize.', answer: 'Stomach pH: 1.5–3.5',
                  options: ['Stomach pH: 1.5–3.5', 'sugar rots teeth', 'antacid reduces acid production', 'antacid neutralizes existing HCl via acid-base reaction'],
                  hint: 'Review c10_chem_cbse_02_006 (neutralization equations) and c10_chem_cbse_02_008 (pH scale numerical.',
                  misconception: 'Students believe tooth decay is caused directly by sugar, writing "sugar rots teeth" in exams.' },
                { id: 'b', prompt: 'Compare the pH optima of pepsin (stomach enzyme) and trypsin (pancreatic enzyme).', answer: 'Pepsin optimum pH: 1.5–2.5 (acidic)',
                  options: ['Pepsin optimum pH: 1.5–2.5 (acidic)', 'explain', 'sugar rots teeth', 'antacid reduces acid production'],
                  hint: 'Review c10_chem_cbse_02_006 (neutralization equations) and c10_chem_cbse_02_008 (pH scale numerical.',
                  misconception: 'Students believe tooth decay is caused directly by sugar, writing "sugar rots teeth" in exams.' }
          ],
            remediations: { 'tooth-decay-is-caused-directly': { steps: ['Revisit neutralization reaction (c10_chem_cbse_02_006): practice writing HCl + CaCO₃ → CaCl₂ + H₂O + CO₂ and HCl.', 'Use pH paper to test vinegar (pH ~3), saliva (pH ~6.8), soap solution (pH ~9), and soil slurry.', 'Record values and link each to the concept (acid erosion, remineralization, soil amendment).', 'Draw a flowchart: Sugar → Bacteria → Acid → pH<5.5 → Demineralization → Cavity.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_010', difficulty: 'standard',
          question: 'A family of salts is a group of salts sharing either the same cation (e.g.',
          hint: 'If stuck, review the list of strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH).',
          misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound.',
          parts: [
                { id: 'a', prompt: 'Name the family of salts to which Na₂SO₄, NaNO₃, and NaCl belong. What is the common ion?', answer: 'These salts belong to the sodium salt family (common cation Na⁺)',
                  options: ['These salts belong to the sodium salt family (common cation Na⁺)', 'chloride family', 'sulphate family', 'acidity'],
                  hint: 'If stuck, review the list of strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH) from.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' },
                { id: 'b', prompt: 'A student tests the pH of three salt solutions: potassium nitrate (KNO₃), ammonium acetate (CH₃COONH₄), and sodium carbonate (Na₂CO₃).', answer: 'KNO₃ → neutral (strong acid HNO₃ + strong base KOH)',
                  options: ['KNO₃ → neutral (strong acid HNO₃ + strong base KOH)', 'acidity', 'basicity', 'chloride family'],
                  hint: 'If stuck, review the list of strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH) from.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' },
                { id: 'c', prompt: 'Write the hydrolysis reaction for the acetate ion (CH₃COO⁻) in water and use it to explain why a solution of sodium acetate (CH₃COONa) has pH > 7.', answer: 'CH₃COO⁻(aq) + H₂O(l) ⇌ CH₃COOH(aq) + OH⁻(aq)',
                  options: ['CH₃COO⁻(aq) + H₂O(l) ⇌ CH₃COOH(aq) + OH⁻(aq)', 'acidity', 'basicity', 'chloride family'],
                  hint: 'If stuck, review the list of strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH) from.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' },
                { id: 'd', prompt: 'Compare the pH of 0.1 M solutions of NaCl, NH₄Cl, and NaCN. Rank them from lowest to highest pH.', answer: 'Lowest pH: NH₄Cl (acidic, pH < 7) → strong acid HCl + weak base NH₄OH',
                  options: ['Lowest pH: NH₄Cl (acidic, pH < 7) → strong acid HCl + weak base NH₄OH', 'acidity', 'basicity', 'chloride family'],
                  hint: 'If stuck, review the list of strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH) from.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' }
          ],
            remediations: { 'the-ph-of-a-salt': { steps: ['Revisit the neutralisation reaction (c10_chem_cbse_02_006) and write the parent acid and base for 5 salts (NaCl.', 'For each, label the acid/base as strong or weak using the known list (strong: HCl, HNO₃, H₂SO₄, NaOH, KOH; weak.', 'Apply the rule: strong+strong=neutral, strong+weak=acidic, weak+strong=basic.', 'Write the hydrolysis equation for the ion from the weak parent only.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_011', difficulty: 'standard',
          question: 'The chlor-alkali process is the industrial electrolysis of concentrated aqueous.',
          hint: 'If stuck, revisit the electrolysis of water (Class 10 Physics) and the reactivity series.',
          misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation.',
          parts: [
                { id: 'a', prompt: 'What is the name of the industrial process used to produce sodium hydroxide from common salt, and what are the three main products formed?', answer: 'The process is called the chlor-alkali process',
                  options: ['The process is called the chlor-alkali process', 'electrolysis of water', 'electrolysis of water" or listing oxygen as a product'],
                  hint: 'If stuck, revisit the electrolysis of water (Class 10 Physics) and the reactivity series (Class 9.',
                  misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation as 2NaCl + 2H₂O →.' },
                { id: 'b', prompt: 'Compare the chlor-alkali process with the electrolysis of dilute sulfuric acid.', answer: 'Similarities: (1) Both use inert electrodes (graphite/platinum)',
                  options: ['Similarities: (1) Both use inert electrodes (graphite/platinum)', 'both produce O₂ at anode'],
                  hint: 'If stuck, revisit the electrolysis of water (Class 10 Physics) and the reactivity series (Class 9.',
                  misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation as 2NaCl + 2H₂O →.' }
          ],
            remediations: { 'students-often-write-the-anode': { steps: ['Revisit the reactivity series (Class 9, c9_chem_ch3_5) — Na⁺ is very low, so it cannot be reduced by water; H₂O reduces.', 'Review competitive electrode discharge (Class 10, this chapter\'s electrolysis concept) — compare concentration and.', 'Write the two half-reactions side by side on paper: Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻; Anode: 2Cl⁻ → Cl₂ + 2e⁻.', 'Add them, cancel electrons, and verify atoms/charge balance.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_012', difficulty: 'standard',
          question: 'Bleaching powder (CaOCl₂), baking soda (NaHCO₃), washing soda (Na₂CO₃·10H₂O).',
          hint: 'If stuck on formulas, review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules.',
          misconception: 'Students write the formula of plaster of Paris as CaSO₄·2H₂O (gypsum) or CaSO₄ (anhydrite) instead of CaSO₄·½H₂O.',
          parts: [
                { id: 'a', prompt: 'Write the chemical formula of bleaching powder and state the two raw materials used in its industrial preparation.', answer: 'Correct answer: Bleaching powder is CaOCl₂ (calcium oxychloride)',
                  options: ['Correct answer: Bleaching powder is CaOCl₂ (calcium oxychloride)', 'Ca(OCl)₂'],
                  hint: 'If stuck on formulas, review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and.',
                  misconception: 'Students write the formula of plaster of Paris as CaSO₄·2H₂O (gypsum) or CaSO₄ (anhydrite) instead of CaSO₄·½H₂O.' },
                { id: 'b', prompt: 'Why does baking soda (NaHCO₃) release CO₂ when heated, while washing soda (Na₂CO₃·10H₂O) does not? Explain using the concept of thermal decomposition.', answer: 'Correct answer: Baking soda is a hydrogen carbonate (HCO₃⁻)',
                  options: ['Correct answer: Baking soda is a hydrogen carbonate (HCO₃⁻)', 'both give CO₂', 'washing soda gives CO₂'],
                  hint: 'If stuck on formulas, review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and.',
                  misconception: 'Students write the formula of plaster of Paris as CaSO₄·2H₂O (gypsum) or CaSO₄ (anhydrite) instead of CaSO₄·½H₂O.' }
          ],
            remediations: { 'students-write-the-formula-of': { steps: ['Revisit the chlor-alkali process (node c10_chem_cbse_02_011) to see how Cl₂ and NaOH are produced from NaCl.', 'Practice writing formulas using the valency cross-method (Class 9 node c9_chem_ch3_6) for Ca²⁺, OCl⁻, Cl⁻, Na⁺, HCO₃⁻.', 'Do a hands-on activity: heat a pinch of baking soda and washing soda separately in test tubes; pass gas through lime.', 'Observe which gives CO₂ on heating.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
