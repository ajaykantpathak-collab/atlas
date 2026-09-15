import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch02_p1: SimDef = {
    id: 'v3_c10_chem_ch02_p1',
    title: 'Acids, Bases and Salts · Part 1/2',
    subtitle: 'Unmask mystery solutions with indicators and decode acid strength',
    classLevel: 10, subject: 'chemistry', topic: 'Acids, Bases and Salts · Part 1/2',
    chapters: ['c10_chem_ch02'],
    nodeIds: ['c10_chem_cbse_02_001', 'c10_chem_cbse_02_002', 'c10_chem_cbse_02_003', 'c10_chem_cbse_02_004', 'c10_chem_cbse_02_005', 'c10_chem_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a quality-control chemist in a food-testing lab', intro: 'Lemon on a cut stings; baking soda calms heartburn. Behind both is the same quiet tug-of-war between hydrogen ions and hydroxide ions.', goal: 'Use indicators correctly — including the ones that trick students — and explain acid strength as degree of ionisation.' },
    discovery: {
        question: 'Ant bites burn — then soap stops the pain. What just happened on your skin?',
        options: ['A base neutralised the ant\'s acid', 'The soap cooled the skin', 'Ant venom evaporated', 'Soap blocked the nerves'],
        answer: 'A base neutralised the ant\'s acid',
        hook: 'Acid + base → salt + water. One reaction explains ant bites, stomach acid, and soil treatment.',
    },
    teaching: [
        { title: 'Acids and Bases: Introduction, Properties and Examples', text: 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are substances that release hydroxide ions (OH⁻) in aqueous solution.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_02_001', title: 'Your mission',
          mission: { widget: 'ph', validate: 'ph:probe=25',
            instruction: 'On the lab: probe a pH below 4 — acid or base?.',
        context: 'Probe a pH below 4 — acid or base?',
            observePrompt: 'What did the ph interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_001', title: 'Acids and Bases: Introduction, Properties and Examples',
          caseStudy: { intro: 'Start with a real-world observation: When you squeeze lemon juice on a cut, it stings; when you use baking soda for heartburn, it gives relief.',
            decisions: [{ prompt: 'Define an acid and a base according to Arrhenius concept. Give one example of each with chemical formula.', options: [
                { text: 'Correct answer: Acid: substance that dissociates in water to give H⁺ ions (e.g., HCl → H⁺', outcome: 'Correct answer: Acid: substance that dissociates in water to give H⁺ ions (e.g., HCl → H⁺ + Cl⁻).' },
                { text: 'acids burn skin but bases do not', outcome: 'Not quite — Students often think that all acids are corrosive and all bases are safe, leading them to write.', reveals: 'all-acids-are-corrosive-and' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_002', title: 'Acid-Base Indicators: Litmus, Turmeric, China Rose, Phenolphthalein',
          caseStudy: { intro: 'Begin with a kitchen observation: when turmeric (haldi) stains a white kurta and you wash it with soap (basic), the yellow stain turns reddish-brown — this.',
            decisions: [{ prompt: 'A student dips a strip of blue litmus paper into a colourless solution. The paper turns red. What is the nature of the solution?', options: [
                { text: 'The solution is acidic', outcome: 'The solution is acidic. The hydrogen ion (H⁺) or hydronium ion (H₃O⁺) is responsible for turning.' },
                { text: 'neutral', outcome: 'Not quite — **Exact error:** Students write "Phenolphthalein turns pink in acid and colourless in base".', reveals: 'exact-error-students-write-phenolphthalein' },
                { text: 'OH⁻ ion', outcome: 'Not quite — **Exact error:** Students write "Phenolphthalein turns pink in acid and colourless in base".', reveals: 'exact-error-students-write-phenolphthalein' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_003', title: 'Olfactory Indicators: Onion, Vanilla, Clove Oil',
          caseStudy: { intro: 'Begin with a familiar kitchen observation: when you add baking soda (base) to chopped onions while cooking, the strong onion smell reduces noticeably, but.',
            decisions: [{ prompt: 'What is the defining characteristic of an olfactory indicator that distinguishes it from litmus or phenolphthalein?', options: [
                { text: 'An olfactory indicator detects acids and bases through a change in **smell/odour** rather', outcome: 'An olfactory indicator detects acids and bases through a change in **smell/odour** rather than.' },
                { text: 'it changes colour', outcome: 'Not quite — Students often believe that **olfactory indicators change colour** like litmus, or that **different.', reveals: 'olfactory-indicators-change-colour-like' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_004', title: 'Reaction of Acids with Metals: Producing Hydrogen Gas',
          scaffold: { problem: 'A student adds 5.0 g of zinc granules to excess dilute hydrochloric acid in a conical flask connected to a gas syringe.',
            steps: [
            { text: 'Identify reactants (Zn, HCl) and products (ZnCl₂, H₂). Zinc is above H in reactivity series, so reaction occurs.' },
            { text: 'Convert to chemical formulae using valency: Zn (valency 2), Cl (valency 1) → ZnCl₂; HCl is H⁺Cl⁻; H₂ is diatomic.' },
            { text: 'Balance atoms: Zn: 1 on both sides; H: 2 on left (2HCl), 2 on right (H₂); Cl: 2 on left, 2 on right.' },
            { text: 'Calculate moles of Zn = mass/molar mass = 5.0 g / 65 g/mol = 0.0769 mol.' },
            { text: 'Volume H₂ at STP = moles × molar volume = 0.0769 mol × 22.4 L/mol = 1.72 L.', faded: true, blankAnswer: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g); Volume of H₂ = 1.72.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_005', title: 'Reaction of Acids with Metal Carbonates and Hydrogencarbonates',
          scaffold: { problem: 'When 5.0 g of impure limestone (calcium carbonate) is treated with excess dilute hydrochloric acid, 1.12 L of carbon dioxide gas.',
            steps: [
            { text: 'Identify the reaction — CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g). Limestone is CaCO₃; impurity does not react.' },
            { text: 'Convert given CO₂ volume to moles — Volume at STP = 1.12 L; Molar volume = 22.4 L/mol; Moles of CO₂ = 1.12 / 22.4.' },
            { text: 'Use stoichiometry — From balanced equation, 1 mol CaCO₃ produces 1 mol CO₂. So moles of pure CaCO₃ = 0.05 mol.' },
            { text: 'Calculate mass of pure CaCO₃ — Mass = moles × molar mass = 0.05 mol × 100 g/mol = 5.0 g.' },
            { text: 'Calculate percentage purity — % purity = (mass of pure CaCO₃ / mass of sample) × 100 = (5.0 / 5.0) × 100 = 100%.' },
            { text: 'Interpret — The sample is pure CaCO₃; no inert impurity present. Verify: 5 g CaCO₃ → 0.05 mol CO₂ → 1.12 L at STP.', faded: true, blankAnswer: '100% pure (CaCO₃ = 5.0 g in 5.0 g sample)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_006', title: 'Neutralisation Reaction: Acid + Base -> Salt + Water',
          scaffold: { problem: 'A farmer adds slaked lime [Ca(OH)₂] to acidic soil to neutralise it. The soil contains mainly H₂SO₄ from acid rain.',
            steps: [
            { text: 'Identify reactants — acid is H₂SO₄ (diprotic), base is Ca(OH)₂ (dihydroxy base). Products: salt + water.' },
            { text: 'Write unbalanced equation: H₂SO₄ + Ca(OH)₂ → CaSO₄ + H₂O.' },
            { text: 'Balance the equation. H: 2 on left (from H₂SO₄) + 2 on left (from Ca(OH)₂) = 4 H total → need 2 H₂O on right.' },
            { text: 'Use stoichiometry. Mole ratio H₂SO₄ : Ca(OH)₂ = 1 : 1. Moles H₂SO₄ = 0.02 mol → moles Ca(OH)₂ needed = 0.02 mol.' },
            { text: 'Mass Ca(OH)₂ = moles × molar mass = 0.02 × 74 = 1.48 g. Verify: units correct (g), significant figures match (2 SF from.', faded: true, blankAnswer: 'H₂SO₄(aq) + Ca(OH)₂(aq) → CaSO₄(s) + 2H₂O(l); Mass.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A home garden\'s soil tests too acidic, and the rose plants are yellowing despite good watering. Grandfather suggests mixing in slaked lime. The neighbour instead recommends pouring vinegar into the beds, \'because sour things feed sour soil.\'',
            decisions: [{ prompt: 'Whose advice will actually fix the soil, and why?', options: [
                { text: 'Slaked lime, calcium hydroxide, is a base — it neutralises the excess acid in the soil and raises the pH back toward a level plants tolerate. Vinegar is acetic acid; adding it would push the pH even lower.', outcome: 'Neutralisation is the point: a base cancels acid. Gardeners really do treat acidic soil with lime for exactly this reason.' },
                { text: 'Vinegar is the better choice because acid added to acidic soil will balance it the way like dissolves like.', outcome: 'Like does not neutralise like — adding acid to acid only makes the soil more acidic and the plants worse.', reveals: 'acid-fixes-acid-soil' },
                { text: 'Neither chemical is needed; the plants just need more water to dilute the acid away permanently.', outcome: 'Water dilutes temporarily but the acid remains in the soil and concentrates again as the soil dries; only a neutralising base removes it.', reveals: 'dilution-removes-acid' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'pH, indicators, neutralisation — you can now read any liquid\'s chemistry by colour alone.',
            decisions: [{ prompt: 'What comes next? Acids, Bases and Salts · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Acids, Bases and Salts · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'ph', prompt: 'Explore the ph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'ph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_001', difficulty: 'standard',
          question: 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while.',
          hint: 'If stuck, review writing chemical formulae (c9_chem_ch3_6) and the difference between.',
          misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids.',
          parts: [
                { id: 'a', prompt: 'Why does dry HCl gas not turn blue litmus red, but aqueous HCl does? Explain using the Arrhenius concept.', answer: 'Correct answer: Dry HCl gas does not dissociate into H⁺ ions',
                  options: ['Correct answer: Dry HCl gas does not dissociate into H⁺ ions', 'acids burn skin but bases do not', 'dry HCl is not acidic'],
                  hint: 'If stuck, review writing chemical formulae (c9_chem_ch3_6) and the difference between ionic and.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases.' },
                { id: 'b', prompt: 'A student has three colorless solutions: dilute HCl, dilute NaOH, and water.', answer: 'Correct answer: Step 1: Dip blue litmus paper into each solution',
                  options: ['Correct answer: Step 1: Dip blue litmus paper into each solution', 'acids burn skin but bases do not'],
                  hint: 'If stuck, review writing chemical formulae (c9_chem_ch3_6) and the difference between ionic and.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases.' }
          ],
            remediations: { 'all-acids-are-corrosive-and': { steps: ['If a student holds this misconception, do a quick demonstration: Place a drop of dilute NaOH on a piece of chicken skin.', 'Then compare with dilute HCl.', 'Emphasize that both strong acids and strong bases are corrosive.', 'For weak vs strong, test conductivity of 0.1 M HCl vs 0.1 M CH₃COOH using a simple circuit with LED; the LED glows.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids.',
          parts: [
                { id: 'a', prompt: 'A student writes: "All bases are alkalis, but all alkalis are not bases." Evaluate this statement and correct it if necessary.', answer: 'Correct answer: The statement is incorrect',
                  options: ['Correct answer: The statement is incorrect', 'acids burn skin but bases do not'],
                  hint: 'If stuck, review writing chemical formulae (c9_chem_ch3_6) and the difference between ionic and.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate that carbon dioxide gas produced from the reaction of an acid with a carbonate turns lime water.', answer: 'Expected answer: Materials: Vinegar (acetic acid), baking soda (sodium hydrogen',
                  options: ['Expected answer: Materials: Vinegar (acetic acid), baking soda (sodium hydrogen', 'acids burn skin but bases do not'],
                  hint: 'If stuck, review writing chemical formulae (c9_chem_ch3_6) and the difference between ionic and.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases.' }
          ],
            remediations: { 'all-acids-are-corrosive-and': { steps: ['If a student holds this misconception, do a quick demonstration: Place a drop of dilute NaOH on a piece of chicken skin.', 'Then compare with dilute HCl.', 'Emphasize that both strong acids and strong bases are corrosive.', 'For weak vs strong, test conductivity of 0.1 M HCl vs 0.1 M CH₃COOH using a simple circuit with LED; the LED glows.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_002', difficulty: 'standard',
          question: 'Acid-base indicators are weak organic acids or bases that undergo a reversible.',
          hint: 'Revisit c10_chem_cbse_02_001 for acid/base definitions and c7_chem_ch02_012 for.',
          misconception: '**Exact error:** Students write "Phenolphthalein turns pink in acid and colourless in base" — reversing the colours.',
          parts: [
                { id: 'a', prompt: 'A student dips a strip of blue litmus paper into a colourless solution. The paper turns red. What is the nature of the solution?', answer: 'The solution is acidic',
                  options: ['The solution is acidic', 'neutral', 'OH⁻ ion', 'Turmeric turns red in acid'],
                  hint: 'Revisit c10_chem_cbse_02_001 for acid/base definitions and c7_chem_ch02_012 for.',
                  misconception: '**Exact error:** Students write "Phenolphthalein turns pink in acid and colourless in base" — reversing the colours.' },
                { id: 'b', prompt: 'Phenolphthalein is colourless in acidic solution but turns pink in basic solution.', answer: 'Phenolphthalein (HIn) is a weak acid',
                  options: ['Phenolphthalein (HIn) is a weak acid', 'phenolphthalein reacts with OH⁻ to form a pink compound', 'Turmeric turns red in acid'],
                  hint: 'Revisit c10_chem_cbse_02_001 for acid/base definitions and c7_chem_ch02_012 for.',
                  misconception: '**Exact error:** Students write "Phenolphthalein turns pink in acid and colourless in base" — reversing the colours.' },
                { id: 'c', prompt: 'You are given three unlabelled test tubes containing dilute HCl, dilute NaOH, and distilled water. You have only turmeric indicator solution.', answer: '**Procedure:** 1',
                  options: ['**Procedure:** 1', 'turmeric turns red in acid'],
                  hint: 'Revisit c10_chem_cbse_02_001 for acid/base definitions and c7_chem_ch02_012 for.',
                  misconception: '**Exact error:** Students write "Phenolphthalein turns pink in acid and colourless in base" — reversing the colours.' }
          ],
            remediations: { 'exact-error-students-write-phenolphthalein': { steps: ['**Colour-anchor activity:** Prepare three beakers with dilute HCl, NaOH, water.', 'Add 2 drops of each indicator to each beaker.', 'Student *must* verbally state the colour *before* writing it.', '**Mnemonic drill:** "PhENolphthalein → Pink in BasE (both have E)" and "Turmeric → Red in Base (think: turmeric stain.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_003', difficulty: 'standard',
          question: 'Olfactory indicators are substances whose characteristic odour changes.',
          hint: 'Revisit c10_chem_cbse_02_001 (acid/base definitions) and c10_chem_cbse_02_002 (indicator.',
          misconception: 'Students often believe that **olfactory indicators change colour** like litmus, or that **different olfactory.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Olfactory indicators are substances whose characteristic odour changes or disappears in',
                  options: ['Olfactory indicators are substances whose characteristic odour changes or disappears in', 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are', 'Acid-base indicators are weak organic acids or bases that undergo a reversible colour', 'When a dilute acid reacts with a reactive metal, a displacement reaction occurs where the'],
                  hint: 'Revisit c10_chem_cbse_02_001 (acid/base definitions) and c10_chem_cbse_02_002 (indicator concept.',
                  misconception: 'Students often believe that **olfactory indicators change colour** like litmus, or that **different olfactory indicators behave.' }
          ],
            remediations: { 'olfactory-indicators-change-colour-like': { steps: ['**Immediate hands-on demo:** Teacher prepares onion extract (boil 5g onion in 50mL water, filter).', '**Student performs:** Add 2mL extract to two test tubes.', 'Add 5 drops dilute HCl to tube A, 5 drops dilute NaOH to tube B.', '**Smell test:** Waft air from each tube to nose.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_004', difficulty: 'standard',
          question: 'When a dilute acid reacts with a reactive metal, a displacement reaction occurs.',
          hint: 'If stuck, revisit c9_chem_ch3_6 (writing chemical formulae) and c7_chem_ch01_012.',
          misconception: 'Students write the reaction of copper with dilute HCl as: Cu + 2HCl → CuCl₂ + H₂, assuming all metals react with acids.',
          parts: [
                { id: 'a', prompt: 'A student adds dilute HCl to four test tubes containing: (A) zinc granules, (B) copper turnings, (C) iron filings, (D) silver foil.', answer: 'Bubbles appear in test tubes A (Zn) and C (Fe)',
                  options: ['Bubbles appear in test tubes A (Zn) and C (Fe)', 'metals react with acids'],
                  hint: 'If stuck, revisit c9_chem_ch3_6 (writing chemical formulae) and c7_chem_ch01_012 (reactivity series.',
                  misconception: 'Students write the reaction of copper with dilute HCl as: Cu + 2HCl → CuCl₂ + H₂, assuming all metals react with acids.' }
          ],
            remediations: { 'students-write-the-reaction-of': { steps: ['Revisit the reactivity series (c7_chem_ch01_012) — make a table of metals above/below hydrogen.', 'Perform a micro-scale test: add 2 drops of 1M HCl to Mg, Zn, Fe, Cu, Ag on a spot plate; record bubbles/no bubbles.', 'Write word equations only for metals that reacted; convert to formulae using valency cross-method.', 'Practice the \'pop test\' description: "A burning splint produces a pop sound" — not "flame extinguishes" (that\'s CO₂).'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_005', difficulty: 'standard',
          question: 'When an acid reacts with a metal carbonate (CO₃²⁻) or metal hydrogencarbonate.',
          hint: 'Revise c9_chem_ch3_6 (writing chemical formulae) and c9_chem_ch3_1 (conservation of mass).',
          misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly.',
          parts: [
                { id: 'a', prompt: 'A student adds dilute HCl to a white solid X. A colourless gas Y evolves which turns lime water milky.', answer: 'X = CaCO₃ (calcium carbonate), Y = CO₂',
                  options: ['X = CaCO₃ (calcium carbonate), Y = CO₂', 'white solid', 'limestone'],
                  hint: 'Revise c9_chem_ch3_6 (writing chemical formulae) and c9_chem_ch3_1 (conservation of mass).',
                  misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly becomes CO₂.' },
                { id: 'b', prompt: 'Compare the volume of CO₂ gas produced at STP when 10 g of Na₂CO₃ and 10 g of NaHCO₃ are reacted separately with excess dilute HCl.', answer: 'Na₂CO₃: 10 g = 0.0943 mol → produces 0.0943 mol CO₂ (1:1)',
                  options: ['Na₂CO₃: 10 g = 0.0943 mol → produces 0.0943 mol CO₂ (1:1)', 'it has 2 Na'],
                  hint: 'Revise c9_chem_ch3_6 (writing chemical formulae) and c9_chem_ch3_1 (conservation of mass).',
                  misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly becomes CO₂.' }
          ],
            remediations: { 'students-write-the-carbonate-reaction': { steps: ['Demonstrate the reaction in a test tube with CaCO₃ + HCl — collect gas in a delivery tube bubbling through lime water.', 'Write the three-step breakdown on board: (i) Acid dissociates to H⁺, (ii) Carbonate accepts H⁺ forming H₂CO₃, (iii).', 'Practice balancing 5 equations with state symbols, emphasising H₂O as product.', 'Use molecular model kit or drawing to show CO₃²⁻ + 2H⁺ → H₂O + CO₂ atom-by-atom.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_006', difficulty: 'standard',
          question: 'A neutralisation reaction is a chemical reaction in which an acid reacts with.',
          hint: 'If stuck on salt formula, revisit c9_chem_ch3_6 (valency cross method) and c9_chem_ch3_7.',
          misconception: 'Students write the reaction of H₂SO₄ with NaOH as H₂SO₄ + NaOH → NaHSO₄ + H₂O (stopping at acidic salt) instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A neutralisation reaction is a chemical reaction in',
                  options: ['A neutralisation reaction is a chemical reaction in', 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are', 'Acid-base indicators are weak organic acids or bases that undergo a reversible colour', 'Olfactory indicators are substances whose characteristic odour changes or disappears in'],
                  hint: 'If stuck on salt formula, revisit c9_chem_ch3_6 (valency cross method) and c9_chem_ch3_7 (common.',
                  misconception: 'Students write the reaction of H₂SO₄ with NaOH as H₂SO₄ + NaOH → NaHSO₄ + H₂O (stopping at acidic salt) instead of H₂SO₄ + 2NaOH → Na₂SO₄.' }
          ],
            remediations: { 'students-write-the-reaction-of': { steps: ['Revisit valency cross-method (c9_chem_ch3_6) — write valencies: H=1, SO₄=2, Na=1.', 'For complete neutralisation, all H⁺ must be replaced by Na⁺. H₂SO₄ has 2 H⁺, so needs 2 Na⁺ → Na₂SO₄.', 'Practice 5 examples: H₂SO₄ + KOH, H₃PO₄ + NaOH, H₂CO₃ + Ca(OH)₂ — write balanced equations and name salts.', 'Use the rule: moles of H⁺ from acid = moles of OH⁻ from base for complete neutralisation. Verify with mole calculations.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
