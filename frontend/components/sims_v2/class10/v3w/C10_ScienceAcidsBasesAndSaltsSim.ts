import type { SimDef } from '../../engine/types';
import C10_ScienceAcidsBasesAndSaltsSim from '../../../simulations/c6_12/C10_ScienceAcidsBasesAndSaltsSim';

/** v3 wrapped master — C10_ScienceAcidsBasesAndSaltsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_scienceacidsbasesandsaltssim: SimDef = {
    id: 'v3w_c10_scienceacidsbasesandsaltssim',
    title: 'Acids and Bases: Introduction, Properties and Examples',
    subtitle: 'This node covers the Arrhenius definition of acids and bases, their physical and chemical.',
    classLevel: 10, subject: 'science', topic: 'Acids and Bases: Introduction, Properties and Examples',
    chapters: [],
    nodeIds: ['c10_chem_cbse_02_001', 'c10_chem_cbse_02_005', 'c10_chem_cbse_02_006', 'c10_chem_cbse_02_007', 'c10_chem_cbse_02_010', 'c10_chem_cbse_02_011', 'c10_chem_cbse_02_002', 'c10_chem_cbse_02_003', 'c10_chem_cbse_02_008', 'c10_chem_cbse_02_004', 'c10_chem_cbse_02_009', 'c10_chem_cbse_02_012', 'c10_chem_cbse_04_012', 'c10_chem_cbse_03_006', 'c10_chem_cbse_03_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Start with a real-world observation: When you squeeze lemon juice on a cut, it stings; when you use baking.', goal: 'Master Acids and Bases: Introduction, Properties and Examples.' },
    discovery: {
        question: 'A student adds dilute HCl to a white solid X. A colourless gas Y evolves which turns lime water milky.',
        options: ['X = CaCO₃ (calcium carbonate), Y = CO₂', 'white solid', 'limestone'],
        answer: 'X = CaCO₃ (calcium carbonate), Y = CO₂',
        hook: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly.',
    },
    teaching: [
        { title: 'Acids are substances that release hydrogen.', text: 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are substances that release hydroxide ions (OH⁻) in aqueous solution.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_001', title: 'Acids are substances that release.',
          scaffold: { problem: 'A student tests three unknown solutions A, B, C with blue and red litmus papers.',
            steps: [
            { text: 'Recall that acids turn blue litmus red, bases turn red litmus blue, neutral does not affect either.' },
            { text: 'Solution A turns blue litmus red → acid. Solution B turns red litmus blue → base.' },
            { text: 'Write the reaction of acid (HCl) with magnesium metal: Mg + 2HCl → MgCl₂ + H₂.' },
            { text: 'Balance the equation: Mg + 2HCl → MgCl₂ + H₂ (already balanced: Mg:1, H:2, Cl:2 on both sides).' },
            { text: 'Identify products: magnesium chloride (salt) and hydrogen gas.', faded: true, blankAnswer: 'A = acid (HCl), B = base, C = neutral. Reaction: Mg(s) +.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_005', title: 'When an acid reacts with a metal.',
          scaffold: { problem: 'When 5.0 g of impure limestone (calcium carbonate) is treated with excess dilute hydrochloric acid, 1.12 L of carbon dioxide gas is.',
            steps: [
            { text: 'Identify the reaction — CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g). Limestone is CaCO₃; impurity does not react.' },
            { text: 'Convert given CO₂ volume to moles — Volume at STP = 1.12 L; Molar volume = 22.4 L/mol; Moles of CO₂ = 1.12 / 22.4 =.' },
            { text: 'Use stoichiometry — From balanced equation, 1 mol CaCO₃ produces 1 mol CO₂. So moles of pure CaCO₃ = 0.05 mol.' },
            { text: 'Calculate mass of pure CaCO₃ — Mass = moles × molar mass = 0.05 mol × 100 g/mol = 5.0 g.' },
            { text: 'Calculate percentage purity — % purity = (mass of pure CaCO₃ / mass of sample) × 100 = (5.0 / 5.0) × 100 = 100%.' },
            { text: 'Interpret — The sample is pure CaCO₃; no inert impurity present. Verify: 5 g CaCO₃ → 0.05 mol CO₂ → 1.12 L at STP.', faded: true, blankAnswer: '100% pure (CaCO₃ = 5.0 g in 5.0 g sample)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_006', title: 'A neutralisation reaction is a chemical.',
          scaffold: { problem: 'A farmer adds slaked lime [Ca(OH)₂] to acidic soil to neutralise it. The soil contains mainly H₂SO₄ from acid rain.',
            steps: [
            { text: 'Identify reactants — acid is H₂SO₄ (diprotic), base is Ca(OH)₂ (dihydroxy base). Products: salt + water.' },
            { text: 'Write unbalanced equation: H₂SO₄ + Ca(OH)₂ → CaSO₄ + H₂O.' },
            { text: 'Balance the equation. H: 2 on left (from H₂SO₄) + 2 on left (from Ca(OH)₂) = 4 H total → need 2 H₂O on right.' },
            { text: 'Use stoichiometry. Mole ratio H₂SO₄ : Ca(OH)₂ = 1 : 1. Moles H₂SO₄ = 0.02 mol → moles Ca(OH)₂ needed = 0.02 mol.' },
            { text: 'Mass Ca(OH)₂ = moles × molar mass = 0.02 × 74 = 1.48 g. Verify: units correct (g), significant figures match (2 SF from.', faded: true, blankAnswer: 'H₂SO₄(aq) + Ca(OH)₂(aq) → CaSO₄(s) + 2H₂O(l); Mass of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_007', title: 'Acids react with metal oxides (basic.',
          scaffold: { problem: 'A student adds dilute hydrochloric acid to a small amount of iron(III) oxide powder.',
            steps: [
            { text: 'Identify reactants — acid is HCl, metal oxide is Fe₂O₃ (iron(III) oxide). This is an acid + basic oxide reaction.' },
            { text: 'Predict products — neutralisation gives salt + water. Cation from oxide: Fe³⁺; anion from acid: Cl⁻.' },
            { text: 'Write unbalanced equation: Fe₂O₃ + HCl → FeCl₃ + H₂O.' },
            { text: 'Balance atoms — Fe: 2 on left, so 2FeCl₃ on right. Cl: 6 on right, so 6HCl on left. H: 6 on left, so 3H₂O on right.' },
            { text: 'State observation — Fe₂O₃ is a reddish-brown solid; it dissolves in HCl to give a yellow-brown solution of FeCl₃.', faded: true, blankAnswer: 'Fe₂O₃(s) + 6HCl(aq) → 2FeCl₃(aq) + 3H₂O(l); Salt: Iron(III).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_010', title: 'A family of salts is a group of salts.',
          scaffold: { problem: 'A student has three unlabelled salt solutions: Solution A turns blue litmus red, Solution B turns red litmus blue, Solution C shows no.',
            steps: [
            { text: 'Recall litmus test interpretation: blue→red = acidic (pH<7); red→blue = basic (pH>7); no change = neutral (pH=7).' },
            { text: 'Identify parent acid and base for each salt: NH₄Cl from HCl (strong acid) + NH₄OH (weak base) → acidic salt.' },
            { text: 'Match observations: Solution A (acidic) = NH₄Cl; Solution B (basic) = Na₂CO₃; Solution C (neutral) = KNO₃.' },
            { text: 'Write hydrolysis for NH₄⁺ (cation of weak base): NH₄⁺(aq) + H₂O(l) ⇌ NH₃(aq) + H₃O⁺(aq).' },
            { text: 'Write hydrolysis for CO₃²⁻ (anion of weak acid): CO₃²⁻(aq) + H₂O(l) ⇌ HCO₃⁻(aq) + OH⁻(aq).' },
            { text: 'Verify: NH₄⁺ produces H₃O⁺ (acidic), CO₃²⁻ produces OH⁻ (basic), K⁺ and NO₃⁻ do not hydrolyse.', faded: true, blankAnswer: 'Solution A = NH₄Cl (hydrolysis: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_011', title: 'The chlor-alkali process is the.',
          scaffold: { problem: 'In a chlor-alkali cell, 585 g of NaCl is electrolyzed using concentrated brine.',
            steps: [
            { text: 'Identify the balanced overall equation: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂.' },
            { text: 'Calculate moles of NaCl used: mass / molar mass = 585 g / 58.5 g/mol = 10 mol.' },
            { text: 'Use stoichiometry from balanced equation: 2 mol NaCl produce 2 mol NaOH, 1 mol Cl₂, 1 mol H₂.' },
            { text: 'Calculate mass of NaOH = moles × molar mass = 10 mol × 40 g/mol = 400 g.' },
            { text: 'Calculate gas volumes at STP: Volume = moles × 22.4 L/mol. Cl₂ = 5 × 22.4 = 112 L. H₂ = 5 × 22.4 = 112 L.', faded: true, blankAnswer: 'NaOH = 400 g; Cl₂ = 112 L at STP; H₂ = 112 L at STP.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_chem_cbse_02_005', title: 'Identify each idea',
          dissect: { specimen: 'Acids and Bases: Introduction, Properties and Examples', spots: [
            { id: 's1', label: 'Acids are substances that release', prompt: 'Which idea is this? — Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are.', answer: 'Acids are substances that release', options: ['Acids are substances that release', 'When an acid reacts with', 'A neutralisation reaction is a', 'Acids react with metal oxides'] },
            { id: 's2', label: 'When an acid reacts with', prompt: 'Which idea is this? — When an acid reacts with a metal carbonate (CO₃²⁻) or metal hydrogencarbonate (HCO₃⁻), it.', answer: 'When an acid reacts with', options: ['When an acid reacts with', 'Acids are substances that release', 'A neutralisation reaction is a', 'Acids react with metal oxides'] },
            { id: 's3', label: 'A neutralisation reaction is a', prompt: 'Which idea is this? — A neutralisation reaction is a chemical reaction in which an acid reacts with a base to.', answer: 'A neutralisation reaction is a', options: ['A neutralisation reaction is a', 'Acids are substances that release', 'When an acid reacts with', 'Acids react with metal oxides'] },
            { id: 's4', label: 'Acids react with metal oxides', prompt: 'Which idea is this? — Acids react with metal oxides (basic oxides) to form a salt and water, while bases react.', answer: 'Acids react with metal oxides', options: ['Acids react with metal oxides', 'Acids are substances that release', 'When an acid reacts with', 'A neutralisation reaction is a'] },
            { id: 's5', label: 'A family of salts is', prompt: 'Which idea is this? — A family of salts is a group of salts sharing either the same cation (e.g., sodium salts:.', answer: 'A family of salts is', options: ['A family of salts is', 'Acids are substances that release', 'When an acid reacts with', 'A neutralisation reaction is a'] },
            { id: 's6', label: 'The chlor-alkali process is the', prompt: 'Which idea is this? — The chlor-alkali process is the industrial electrolysis of concentrated aqueous sodium.', answer: 'The chlor-alkali process is the', options: ['The chlor-alkali process is the', 'Acids are substances that release', 'When an acid reacts with', 'A neutralisation reaction is a'] }
          ] } }
    ],
    explore: { component: C10_ScienceAcidsBasesAndSaltsSim, prompt: 'Explore the interactive — Acids and Bases: Introduction, Properties and Examples' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_001', difficulty: 'standard',
          question: 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while.',
          hint: 'If stuck, review writing chemical formulae (c9_chem_ch3_6) and the difference between.',
          misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids.',
          parts: [
                { id: 'a', prompt: 'Why does dry HCl gas not turn blue litmus red, but aqueous HCl does? Explain using the Arrhenius concept.', answer: 'Dry HCl gas does not dissociate into H⁺ ions',
                  options: ['Correct answer: Dry HCl gas does not dissociate into H⁺ ions', 'acids burn skin but bases do not'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases do.' },
                { id: 'b', prompt: 'A student has three colorless solutions: dilute HCl, dilute NaOH, and water.', answer: 'Step 1: Dip blue litmus paper into each solution',
                  options: ['Correct answer: Step 1: Dip blue litmus paper into each solution', 'acids burn skin but bases do not'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases do.' }
          ],
            remediations: { 'all-acids-are-corrosive-and': { steps: ['If a student holds this misconception, do a quick demonstration: Place a drop of dilute NaOH on a piece of chicken skin.', 'Then compare with dilute HCl.', 'Emphasize that both strong acids and strong bases are corrosive.', 'For weak vs strong, test conductivity of 0.1 M HCl vs 0.1 M CH₃COOH using a simple circuit with LED; the LED glows.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids.',
          parts: [
                { id: 'a', prompt: 'A student writes: "All bases are alkalis, but all alkalis are not bases." Evaluate this statement and correct it if necessary.', answer: 'The statement is incorrect',
                  options: ['Correct answer: The statement is incorrect', 'acids burn skin but bases do not'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases do.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate that carbon dioxide gas produced from the reaction of an acid with a carbonate turns lime water.', answer: 'Expected answer: Materials: Vinegar (acetic acid), baking soda (sodium hydrogen',
                  options: ['Expected answer: Materials: Vinegar (acetic acid), baking soda (sodium hydrogen', 'acids burn skin but bases do not'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all acids are corrosive and all bases are safe, leading them to write in exams that "acids burn skin but bases do.' }
          ],
            remediations: { 'all-acids-are-corrosive-and': { steps: ['If a student holds this misconception, do a quick demonstration: Place a drop of dilute NaOH on a piece of chicken skin.', 'Then compare with dilute HCl.', 'Emphasize that both strong acids and strong bases are corrosive.', 'For weak vs strong, test conductivity of 0.1 M HCl vs 0.1 M CH₃COOH using a simple circuit with LED; the LED glows.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_005', difficulty: 'standard',
          question: 'When an acid reacts with a metal carbonate (CO₃²⁻) or metal hydrogencarbonate.',
          hint: 'Revise c9_chem_ch3_6 (writing chemical formulae) and c9_chem_ch3_1 (conservation of mass).',
          misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly.',
          parts: [
                { id: 'a', prompt: 'A student adds dilute HCl to a white solid X. A colourless gas Y evolves which turns lime water milky.', answer: 'X = CaCO₃ (calcium carbonate), Y = CO₂',
                  options: ['X = CaCO₃ (calcium carbonate), Y = CO₂', 'white solid', 'limestone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly becomes CO₂.' },
                { id: 'b', prompt: 'Compare the volume of CO₂ gas produced at STP when 10 g of Na₂CO₃ and 10 g of NaHCO₃ are reacted separately with excess dilute HCl.', answer: 'Na₂CO₃: 10 g = 0.0943 mol → produces 0.0943 mol CO₂ (1:1)',
                  options: ['Na₂CO₃: 10 g = 0.0943 mol → produces 0.0943 mol CO₂ (1:1)', 'it has 2 Na'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly becomes CO₂.' }
          ],
            remediations: { 'students-write-the-carbonate-reaction': { steps: ['Demonstrate the reaction in a test tube with CaCO₃ + HCl — collect gas in a delivery tube bubbling through lime water.', 'Write the three-step breakdown on board: (i) Acid dissociates to H⁺, (ii) Carbonate accepts H⁺ forming H₂CO₃, (iii).', 'Practice balancing 5 equations with state symbols, emphasising H₂O as product.', 'Use molecular model kit or drawing to show CO₃²⁻ + 2H⁺ → H₂O + CO₂ atom-by-atom.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly.',
          parts: [
                { id: 'a', prompt: 'Compare the volume of CO₂ gas produced at STP when 10 g of Na₂CO₃ and 10 g of NaHCO₃ are reacted separately with excess dilute HCl.', answer: 'Na₂CO₃: 10 g = 0.0943 mol → produces 0.0943 mol CO₂ (1:1)',
                  options: ['Na₂CO₃: 10 g = 0.0943 mol → produces 0.0943 mol CO₂ (1:1)', 'it has 2 Na'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the carbonate reaction as Na₂CO₃ + 2HCl → 2NaCl + CO₂ (omitting H₂O) because they think CO₃²⁻ directly becomes CO₂.' }
          ],
            remediations: { 'students-write-the-carbonate-reaction': { steps: ['Demonstrate the reaction in a test tube with CaCO₃ + HCl — collect gas in a delivery tube bubbling through lime water.', 'Write the three-step breakdown on board: (i) Acid dissociates to H⁺, (ii) Carbonate accepts H⁺ forming H₂CO₃, (iii).', 'Practice balancing 5 equations with state symbols, emphasising H₂O as product.', 'Use molecular model kit or drawing to show CO₃²⁻ + 2H⁺ → H₂O + CO₂ atom-by-atom.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_006', difficulty: 'standard',
          question: 'A neutralisation reaction is a chemical reaction in which an acid reacts with a.',
          hint: 'If stuck on salt formula, revisit c9_chem_ch3_6 (valency cross method) and c9_chem_ch3_7.',
          misconception: 'Students write the reaction of H₂SO₄ with NaOH as H₂SO₄ + NaOH → NaHSO₄ + H₂O (stopping at acidic salt) instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A neutralisation reaction is a chemical reaction in',
                  options: ['A neutralisation reaction is a chemical reaction in', 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are', 'When an acid reacts with a metal carbonate (CO₃²⁻) or metal hydrogencarbonate (HCO₃⁻), it', 'Acids react with metal oxides (basic oxides) to form a salt and water, while bases react'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the reaction of H₂SO₄ with NaOH as H₂SO₄ + NaOH → NaHSO₄ + H₂O (stopping at acidic salt) instead of H₂SO₄ + 2NaOH → Na₂SO₄ +.' }
          ],
            remediations: { 'students-write-the-reaction-of': { steps: ['Revisit valency cross-method (c9_chem_ch3_6) — write valencies: H=1, SO₄=2, Na=1.', 'For complete neutralisation, all H⁺ must be replaced by Na⁺. H₂SO₄ has 2 H⁺, so needs 2 Na⁺ → Na₂SO₄.', 'Practice 5 examples: H₂SO₄ + KOH, H₃PO₄ + NaOH, H₂CO₃ + Ca(OH)₂ — write balanced equations and name salts.', 'Use the rule: moles of H⁺ from acid = moles of OH⁻ from base for complete neutralisation. Verify with mole calculations.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_007', difficulty: 'standard',
          question: 'Acids react with metal oxides (basic oxides) to form a salt and water, while.',
          hint: 'If stuck, revise c9_chem_ch3_6 (Writing Chemical Formulae) and c10_chem_cbse_02_006.',
          misconception: 'Students often write the salt formula incorrectly by using the wrong valency for the metal in the oxide (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Acids react with metal oxides (basic oxides) to form a salt and water, while bases react',
                  options: ['Acids react with metal oxides (basic oxides) to form a salt and water, while bases react', 'Acids are substances that release hydrogen ions (H⁺) in aqueous solution, while bases are', 'When an acid reacts with a metal carbonate (CO₃²⁻) or metal hydrogencarbonate (HCO₃⁻), it', 'A neutralisation reaction is a chemical reaction in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the salt formula incorrectly by using the wrong valency for the metal in the oxide (e.g., writing FeO instead of Fe₂O₃.' }
          ],
            remediations: { 'students-often-write-the-salt': { steps: ['Revisit valency cross-method using c9_chem_ch3_6 — write formulae of metal oxides and resulting salts for Fe, Cu, Mg,.', 'Make a two-column table: "Metal Oxides (Basic)" vs "Non-metal Oxides (Acidic)" with examples from Class 10 textbook;.', 'Practice 5 balanced equations for each type, checking atom counts aloud.', 'Use the "acid + base → salt + water" template to predict products before balancing.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_010', difficulty: 'standard',
          question: 'A family of salts is a group of salts sharing either the same cation (e.g.,.',
          hint: 'If stuck, review the list of strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH).',
          misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound,.',
          parts: [
                { id: 'a', prompt: 'Name the family of salts to which Na₂SO₄, NaNO₃, and NaCl belong. What is the common ion?', answer: 'These salts belong to the sodium salt family (common cation Na⁺)',
                  options: ['These salts belong to the sodium salt family (common cation Na⁺)', 'chloride family', 'sulphate family'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' },
                { id: 'b', prompt: 'A student tests the pH of three salt solutions: potassium nitrate (KNO₃), ammonium acetate (CH₃COONH₄), and sodium carbonate (Na₂CO₃).', answer: 'KNO₃ → neutral (strong acid HNO₃ + strong base KOH)',
                  options: ['KNO₃ → neutral (strong acid HNO₃ + strong base KOH)', 'acidity', 'basicity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' },
                { id: 'c', prompt: 'Write the hydrolysis reaction for the acetate ion (CH₃COO⁻) in water and use it to explain why a solution of sodium acetate (CH₃COONa) has pH > 7.', answer: 'CH₃COO⁻(aq) + H₂O(l) ⇌ CH₃COOH(aq) + OH⁻(aq)',
                  options: ['CH₃COO⁻(aq) + H₂O(l) ⇌ CH₃COOH(aq) + OH⁻(aq)', 'acidity', 'basicity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' }
          ],
            remediations: { 'the-ph-of-a-salt': { steps: ['Revisit the neutralisation reaction (c10_chem_cbse_02_006) and write the parent acid and base for 5 salts (NaCl,.', 'For each, label the acid/base as strong or weak using the known list (strong: HCl, HNO₃, H₂SO₄, NaOH, KOH; weak:.', 'Apply the rule: strong+strong=neutral, strong+weak=acidic, weak+strong=basic.', 'Write the hydrolysis equation for the ion from the weak parent only.', 'Verify with litmus test observations from textbook Activity 2.10.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound,.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Ammonium chloride solution is acidic because NH₄⁺ donates OH⁻ to water." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'acidity', 'basicity', 'chloride family'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' },
                { id: 'b', prompt: 'Design a simple experiment using only red and blue litmus paper to distinguish between three unlabelled salt solutions: sodium chloride, sodium carbonate, and.', answer: 'Test each solution with both litmus papers',
                  options: ['Test each solution with both litmus papers', 'acidity', 'basicity', 'chloride family'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the pH of a salt solution depends on the salt\'s own "acidity" or "basicity" as a compound, rather than on the.' }
          ],
            remediations: { 'the-ph-of-a-salt': { steps: ['Revisit the neutralisation reaction (c10_chem_cbse_02_006) and write the parent acid and base for 5 salts (NaCl,.', 'For each, label the acid/base as strong or weak using the known list (strong: HCl, HNO₃, H₂SO₄, NaOH, KOH; weak:.', 'Apply the rule: strong+strong=neutral, strong+weak=acidic, weak+strong=basic.', 'Write the hydrolysis equation for the ion from the weak parent only.', 'Verify with litmus test observations from textbook Activity 2.10.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_011', difficulty: 'standard',
          question: 'The chlor-alkali process is the industrial electrolysis of concentrated aqueous.',
          hint: 'If stuck, revisit the electrolysis of water (Class 10 Physics) and the reactivity series.',
          misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation.',
          parts: [
                { id: 'a', prompt: 'What is the name of the industrial process used to produce sodium hydroxide from common salt, and what are the three main products formed?', answer: 'The process is called the chlor-alkali process',
                  options: ['The process is called the chlor-alkali process', 'electrolysis of water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation as 2NaCl + 2H₂O →.' }
          ],
            remediations: { 'students-often-write-the-anode': { steps: ['Revisit the reactivity series (Class 9, c9_chem_ch3_5) — Na⁺ is very low, so it cannot be reduced by water; H₂O reduces.', 'Review competitive electrode discharge (Class 10, this chapter\'s electrolysis concept) — compare concentration and.', 'Write the two half-reactions side by side on paper: Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻; Anode: 2Cl⁻ → Cl₂ + 2e⁻.', 'Add them, cancel electrons, and verify atoms/charge balance.', 'Say aloud: "Concentrated brine gives Cl₂, not O₂; water gives H₂, not Na." Repeat until automatic.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation.',
          parts: [
                { id: 'a', prompt: 'A student writes the overall equation for the chlor-alkali process as: NaCl(aq) + H₂O(l) → NaOH(aq) + HCl(aq). Evaluate this equation.', answer: 'The equation is incorrect for the industrial chlor-alkali process',
                  options: ['The equation is incorrect for the industrial chlor-alkali process', 'it\'s correct because NaCl and water react'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation as 2NaCl + 2H₂O →.' }
          ],
            remediations: { 'students-often-write-the-anode': { steps: ['Revisit the reactivity series (Class 9, c9_chem_ch3_5) — Na⁺ is very low, so it cannot be reduced by water; H₂O reduces.', 'Review competitive electrode discharge (Class 10, this chapter\'s electrolysis concept) — compare concentration and.', 'Write the two half-reactions side by side on paper: Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻; Anode: 2Cl⁻ → Cl₂ + 2e⁻.', 'Add them, cancel electrons, and verify atoms/charge balance.', 'Say aloud: "Concentrated brine gives Cl₂, not O₂; water gives H₂, not Na." Repeat until automatic.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
