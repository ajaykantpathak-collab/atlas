import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch05_p1: SimDef = {
    id: 'v3_c8_physics_ch05_p1',
    title: 'The Amazing World of Solutes, Solvents, and Solutions · Part 1/2',
    subtitle: 'The invisible mixing that makes salt \'disappear\'',
    classLevel: 8, subject: 'physics', topic: 'The Amazing World of Solutes, Solvents, and Solutions · Part 1/2',
    chapters: ['c8_physics_ch05'],
    nodeIds: ['c8_physics_ch5_1', 'c8_physics_ch5_10', 'c8_physics_ch5_2', 'c8_physics_ch5_3', 'c8_physics_ch5_4', 'c8_physics_ch5_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a kitchen chemist', intro: 'Sugar vanishes in water, alloys hide inside metals, and the air you breathe is secretly a solution. Learn to spot who\'s dissolving whom — by amount, not by state.', goal: 'Understand solutions as homogeneous mixtures — identify solute and solvent by relative amount across solid, liquid and gas examples.' },
    discovery: {
        question: 'Air is a solution too — so which gas is the \'solvent\' of the atmosphere?',
        options: ['Nitrogen — the solvent is simply the component present in the largest amount (~78%), not the most important one', 'Oxygen — because we breathe it', 'Carbon dioxide — because it\'s the most reactive', 'Air can\'t be a solution — solutions must be liquid'],
        answer: 'Nitrogen — the solvent is simply the component present in the largest amount (~78%), not the most important one',
        hook: 'Solute vs solvent isn\'t about solid vs liquid — it\'s about quantity. Brass is a solid solution of zinc in copper; air is a gas solution. And true solutions never scatter light — if you can see a beam through it, it\'s not a solution.',
    },
    teaching: [
        { title: 'Solution: Definition and Components (Solute + Solvent)', text: 'A solution is a homogeneous mixture of two or more substances where the particles are uniformly distributed at the molecular level and do not settle out.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch5_1', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Interrogate everyday mixtures: nimbu pani, iodine tincture, brass, the air itself. Name the solute and solvent in each, and prove a solution is homogeneous by splitting it in half and testing both glasses.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch5_1', title: 'Solution: Definition and Components (Solute + Solvent)',
          caseStudy: { intro: 'Observe a glass of nimbu pani (lemonade) being made at home: sugar crystals disappear when stirred into water, and the liquid remains clear.',
            decisions: [{ prompt: 'Define a solution and state the difference between a solute and a solvent.', options: [
                { text: 'A solution is a homogeneous mixture where solute particles are uniformly distributed at', outcome: 'A solution is a homogeneous mixture where solute particles are uniformly distributed at the.' },
                { text: 'solute is the liquid', outcome: 'Not quite — Students often believe "the solute is always the solid and the solvent is always the liquid".', reveals: 'the-solute-is-always-the' },
                { text: 'solvent is the solid', outcome: 'Not quite — Students often believe "the solute is always the solid and the solvent is always the liquid".', reveals: 'the-solute-is-always-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch5_10', title: 'Solubility of Gases in Liquids: Effect of Temperature and Pressure',
          scaffold: { problem: 'A 1.5 L bottle of carbonated water is sealed under 3.0 atm CO₂ pressure at 20°C.',
            steps: [
            { text: 'Identify given quantities: P = 3.0 atm, kₕ = 3.7 × 10⁻² mol·L⁻¹·atm⁻¹, V = 1.5 L. Find: n (moles of CO₂).' },
            { text: 'Use Henry\'s law to find concentration: C = kₕP. Check units: (mol·L⁻¹·atm⁻¹) × atm = mol/L — correct.' },
            { text: 'Substitute: C = (3.7 × 10⁻² mol·L⁻¹·atm⁻¹) × (3.0 atm) = 1.11 × 10⁻¹ mol/L = 0.111 M.' },
            { text: 'Convert concentration to moles: n = C × V = (0.111 mol/L) × (1.5 L) = 0.1665 mol. Track units: L cancels, leaving mol.' },
            { text: 'Verify reasonableness: 0.1665 mol CO₂ ≈ 7.3 g — plausible for a soda bottle.', faded: true, blankAnswer: '0.167 mol CO₂' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch5_3', title: 'Uniform vs Non-Uniform Mixtures: Solutions and Suspensions',
          caseStudy: { intro: 'Observe a glass of nimbu pani (lemonade) and a glass of muddy water from a monsoon puddle.',
            decisions: [{ prompt: 'Define a solution and a suspension in terms of particle size, uniformity, and whether they show the Tyndall effect.', options: [
                { text: 'Solution: particle size <1 nm, homogeneous (uniform throughout), does NOT show Tyndall', outcome: 'Solution: particle size <1 nm, homogeneous (uniform throughout), does NOT show Tyndall effect.' },
                { text: 'if it looks uniform and passes through filter paper, it\'s a solution', outcome: 'Not quite — Students believe "if it looks uniform and passes through filter paper, it\'s a solution." They.', reveals: 'if-it-looks-uniform-and' },
                { text: 'solutions scatter light', outcome: 'Not quite — Students believe "if it looks uniform and passes through filter paper, it\'s a solution." They.', reveals: 'if-it-looks-uniform-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch5_4', title: 'Solubility: How Much Solute Dissolves in a Fixed Amount of Solvent',
          scaffold: { problem: 'In a science lab, a student finds that at 30°C, 18 g of sodium chloride (NaCl) dissolves completely in 50 g of water, but 20 g leaves 2.',
            steps: [
            { text: 'Identify given: Mass of water (solvent) = 50 g. Mass of NaCl added in saturated trial = 18 g (since 20g left 2g.' },
            { text: 'Recall formula: Solubility = (Mass of solute dissolved / Mass of solvent) × 100 g solvent.' },
            { text: 'Substitute values: Solubility = (18 g NaCl / 50 g water) × 100 g water.' },
            { text: 'Compute: (18/50) × 100 = 0.36 × 100 = 36. Unit: g NaCl per 100 g water.' },
            { text: 'Verify: 36 g/100g water is a known literature value for NaCl at ~30°C. Reasonable.', faded: true, blankAnswer: '36 g/100g water' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch5_5', title: 'Factors Affecting Solubility: Temperature and Stirring',
          caseStudy: { intro: 'Observe how quickly sugar dissolves in a glass of cold lassi versus hot chai — the hot tea dissolves much more sugar before becoming saturated.',
            decisions: [{ prompt: 'What happens to the solubility of common salt (NaCl) in water when the temperature of the water is increased from 20°C to 80°C?', options: [
                { text: 'The solubility of NaCl increases slightly with temperature (from about 36 g/100 g water', outcome: 'The solubility of NaCl increases slightly with temperature (from about 36 g/100 g water at 20°C.' },
                { text: 'solubility decreases', outcome: 'Not quite — Students often believe that stirring increases the amount of solute that can dissolve (the.', reveals: 'stirring-increases-the-amount-of' },
                { text: 'stays exactly the same', outcome: 'Not quite — Students often believe that stirring increases the amount of solute that can dissolve (the.', reveals: 'stirring-increases-the-amount-of' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Mixing nimbu pani for guests, Tara dissolves 20 g of sugar in 100 g of water. Her cousin labels the diagram: \'Sugar is the solvent because it is the solid; water is the solute because it is the liquid.\'',
            decisions: [{ prompt: 'Is the labelling correct?', options: [
                { text: 'No — solvent and solute are decided by amount, not state: water at 100 g is the larger component, so water is the solvent and sugar the solute. The mixture is a true solution because the sugar particles are uniformly spread at molecular level and never settle out.', outcome: 'This uses the amount-based definition and the homogeneity test rather than judging by which ingredient started solid.' },
                { text: 'The cousin is right — the solid ingredient is always the solvent and the liquid always the solute.', outcome: 'State does not assign the roles; quantity does — the bigger share is always the solvent, whatever phase it is.', reveals: 'solid-is-solvent' },
                { text: 'Neither is right — nimbu pani is not a solution at all because you can still taste the sugar.', outcome: 'Taste proves the sugar\'s properties survived, which is normal for mixtures; a solution is defined by uniform molecular distribution, which this clear liquid has.', reveals: 'tasteable-not-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch5_5', title: 'The bigger picture',
          caseStudy: { intro: 'A solution is a mixture so uniform that particles never settle and light passes clean through. Whatever\'s there in the largest amount is the solvent — everything else just dissolves into its crowd.',
            decisions: [{ prompt: 'What comes next? The Amazing World of Solutes, Solvents, and Solutions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Amazing World of Solutes, Solvents, and Solutions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch5_1', difficulty: 'standard',
          question: 'A solution is a homogeneous mixture of two or more substances where the.',
          hint: 'Revisit Class 6 "Testing Substances with Natural Indicators" (c6_physics_ch02_008) and.',
          misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom.',
          parts: [
                { id: 'a', prompt: 'Air is a solution of gases. Which gas is the solvent and which are solutes? Explain why air qualifies as a solution even though all components are gases.', answer: 'In air, nitrogen (~78%) is the solvent',
                  options: ['In air, nitrogen (~78%) is the solvent', 'oxygen is the solvent', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Revisit Class 6 "Testing Substances with Natural Indicators" (c6_physics_ch02_008) and observe how.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' },
                { id: 'b', prompt: 'Compare brass (an alloy of copper and zinc) and salt water. Both are solutions.', answer: 'Similarities: Both are homogeneous at molecular level',
                  options: ['Similarities: Both are homogeneous at molecular level', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Revisit Class 6 "Testing Substances with Natural Indicators" (c6_physics_ch02_008) and observe how.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' }
          ],
            remediations: { 'the-solute-is-always-the': { steps: ['Show three solutions — salt water (solid-liquid), vinegar (liquid-liquid: acetic acid in water), and air (gas-gas).', 'Ask: "Which is the solvent in each?" Guide them to compare amounts, not states.', 'Have them read labels on household products (e.g., hand sanitizer: 70% alcohol, 30% water — alcohol is solvent).', 'Practice with 5 varied examples until they consistently apply "larger amount = solvent."'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom.',
          parts: [
                { id: 'a', prompt: 'A classmate claims: "In a solution of 20 g sugar in 100 g water, sugar is the solvent because it is the solid." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the solid is always the solute', 'the liquid is always the solvent', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Revisit Class 6 "Testing Substances with Natural Indicators" (c6_physics_ch02_008) and observe how.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' },
                { id: 'b', prompt: 'Design a simple kitchen experiment to demonstrate that a solution is homogeneous.', answer: 'Materials: Salt, water, two transparent glasses, spoon, food colour (optional)',
                  options: ['Materials: Salt, water, two transparent glasses, spoon, food colour (optional)', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Revisit Class 6 "Testing Substances with Natural Indicators" (c6_physics_ch02_008) and observe how.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' }
          ],
            remediations: { 'the-solute-is-always-the': { steps: ['Show three solutions — salt water (solid-liquid), vinegar (liquid-liquid: acetic acid in water), and air (gas-gas).', 'Ask: "Which is the solvent in each?" Guide them to compare amounts, not states.', 'Have them read labels on household products (e.g., hand sanitizer: 70% alcohol, 30% water — alcohol is solvent).', 'Practice with 5 varied examples until they consistently apply "larger amount = solvent."'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_10', difficulty: 'standard',
          question: 'The solubility of a gas in a liquid is the maximum amount of gas (in moles.',
          hint: 'Revisit c8_physics_ch5_4 (solubility definition) and c6_physics_ch07_024 (heat.',
          misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility.',
          parts: [
                { id: 'a', prompt: 'A soda bottle is sealed at 2.5 atm CO₂ partial pressure at 25°C. Henry\'s law constant for CO₂ in water at 25°C is 3.3 × 10⁻² mol·L⁻¹·atm⁻¹.', answer: 'Step 1: Identify given: P = 2.5 atm, kₕ = 3.3 × 10⁻² mol·L⁻¹·atm⁻¹',
                  options: ['Step 1: Identify given: P = 2.5 atm, kₕ = 3.3 × 10⁻² mol·L⁻¹·atm⁻¹', 'heating always increases solubility'],
                  hint: 'Revisit c8_physics_ch5_4 (solubility definition) and c6_physics_ch07_024 (heat vs temperature).',
                  misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility rises with.' },
                { id: 'b', prompt: 'Two identical sealed bottles contain water equilibrated with air at 1 atm total pressure. Bottle A is at 10°C, Bottle B at 30°C.', answer: 'Bottle A (10°C) has higher dissolved O₂ concentration',
                  options: ['Bottle A (10°C) has higher dissolved O₂ concentration', 'heating always increases solubility'],
                  hint: 'Revisit c8_physics_ch5_4 (solubility definition) and c6_physics_ch07_024 (heat vs temperature).',
                  misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility rises with.' }
          ],
            remediations: { 'heating-always-increases-solubility-because': { steps: ['Demonstrate exothermic dissolution: Feel a CO₂ cartridge get cold when gas expands — reverse process (dissolving).', 'Use a syringe with water and air: Pull plunger to lower pressure, see bubbles form (degassing); push plunger.', 'temperature for O₂ in water (data table provided) — student sees downward curve.', 'Explicitly contrast with solid solubility curve (upward) on same axes.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_2', difficulty: 'standard',
          question: 'A solution is a homogeneous mixture where one substance (the solute) disperses.',
          hint: 'Revisit the definition of solution and the distinction between solute and solvent.',
          misconception: 'Students often believe the solute is always the component added in smaller quantity and the solvent is always the.',
          parts: [
                { id: 'a', prompt: 'In tincture of iodine (iodine crystals dissolved in alcohol), which is the solute and which is the solvent?', answer: 'Iodine (solid) is the solute',
                  options: ['Iodine (solid) is the solute', 'active'],
                  hint: 'Revisit the definition of solution and the distinction between solute and solvent.',
                  misconception: 'Students often believe the solute is always the component added in smaller quantity and the solvent is always the liquid.' },
                { id: 'b', prompt: 'A student makes a solution by dissolving 10 g of salt in 150 mL of water. Then they add 20 mL of ethanol (which mixes completely with water).', answer: 'Initially: solute = salt, solvent = water',
                  options: ['Initially: solute = salt, solvent = water', 'any liquid component is automatically a solvent'],
                  hint: 'Revisit the definition of solution and the distinction between solute and solvent.',
                  misconception: 'Students often believe the solute is always the component added in smaller quantity and the solvent is always the liquid.' },
                { id: 'c', prompt: 'Compare these three solutions: (a) carbon dioxide in water (soda), (b) brass (copper-zinc alloy), (c) ethanol in water (vodka).', answer: 'carbon dioxide in water (sod',
                  options: ['carbon dioxide in water (sod', 'soda is a gas solution', 'the solute\'s state determines the solution\'s state'],
                  hint: 'Revisit the definition of solution and the distinction between solute and solvent.',
                  misconception: 'Students often believe the solute is always the component added in smaller quantity and the solvent is always the liquid.' }
          ],
            remediations: { 'the-solute-is-always-the': { steps: ['Show a video of soda water being opened – bubbles of CO₂ escape.', 'Ask: "Which substance is leaving the liquid?', 'Which stays behind?" (CO₂ leaves, water stays → CO₂ was solute, water solvent).', 'Provide a card-sort activity with 6 solution examples (air, brass, salt water, ammonia in water, ethanol in water.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_3', difficulty: 'standard',
          question: 'A uniform mixture (solution) is a homogeneous mixture where solute particles.',
          hint: 'Review the particle-level diagrams of solutions in c8_physics_ch5_1 and the.',
          misconception: 'Students believe "if it looks uniform and passes through filter paper, it\'s a solution." They classify milk, starch.',
          parts: [
                { id: 'a', prompt: 'You have three beakers: A) sugar dissolved in water, B) sand stirred in water, C) milk. For each, predict: (i) Will a filter paper retain residue?', answer: 'A (sugar solution): (i) No residue, (ii) No settling, (iii) No Tyndall',
                  options: ['A (sugar solution): (i) No residue, (ii) No settling, (iii) No Tyndall', 'no Tyndall because it looks uniform', 'if it looks uniform and passes through filter paper, it\'s a solution', '"if it looks uniform and passes through filter paper, it\'s a solution'],
                  hint: 'Review the particle-level diagrams of solutions in c8_physics_ch5_1 and the.',
                  misconception: 'Students believe "if it looks uniform and passes through filter paper, it\'s a solution." They classify milk, starch solution, or ink.' },
                { id: 'b', prompt: 'A student shines a laser pointer through four liquids: (1) tap water, (2) copper sulfate solution, (3) flour in water, (4) blood.', answer: '(1) Tap water – pure substance (or solution of minerals), no beam → solution',
                  options: ['(1) Tap water – pure substance (or solution of minerals), no beam → solution', 'if it looks uniform and passes through filter paper, it\'s a solution', 'any Tyndall-positive mixture is a suspension', '"if it looks uniform and passes through filter paper, it\'s a solution'],
                  hint: 'Review the particle-level diagrams of solutions in c8_physics_ch5_1 and the.',
                  misconception: 'Students believe "if it looks uniform and passes through filter paper, it\'s a solution." They classify milk, starch solution, or ink.' }
          ],
            remediations: { 'if-it-looks-uniform-and': { steps: ['Perform the "laser Tyndall test" in a dark room: shine a laser pointer through (a) salt solution, (b) milk, (c) muddy.', 'Student observes beam only in milk and muddy water.', 'Then filter all three: salt and milk pass through, muddy water leaves residue.', 'Finally, let stand 10 min: muddy water settles, milk and salt do not.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_4', difficulty: 'standard',
          question: 'Solubility is the maximum mass of a solute (in grams) that can dissolve in 100.',
          hint: 'Review node c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and practice ratio.',
          misconception: 'Students often confuse **solubility** (the maximum equilibrium amount that can dissolve) with **rate of dissolving**.',
          parts: [
                { id: 'a', prompt: 'Why is temperature always specified when reporting a solubility value (e.g., "solubility of NaCl in water is 36 g/100g water at 20°C")?', answer: 'Temperature is specified',
                  options: ['Temperature is specified', 'temperature doesn\'t matter', 'it\'s just a standard condition'],
                  hint: 'Review node c8_physics_ch5_6 (Saturated and Unsaturated Solutions) and practice ratio problems like.',
                  misconception: 'Students often confuse **solubility** (the maximum equilibrium amount that can dissolve) with **rate of dissolving** (how fast.' }
          ],
            remediations: { 'students-often-confuse-solubility-the': { steps: ['Demonstrate the difference: Take two beakers with 100mL cold water.', 'Stir one vigorously, leave the other unstirred.', 'Both end with same undissolved sugar – stirring didn\'t change solubility.', 'Practice the definition template: "Solubility of ___ in ___ at ___°C is ___ g/100g solvent." 3.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_5', difficulty: 'standard',
          question: 'Solubility of a solid solute in a liquid solvent generally increases with.',
          hint: 'Revisit c8_physics_ch5_4 for solubility definition and c6_physics_ch07_024 for heat.',
          misconception: 'Students often believe that stirring increases the amount of solute that can dissolve (the solubility limit) because.',
          parts: [
                { id: 'a', prompt: 'Riya stirs a spoonful of sugar in a cup of cold water until no more dissolves. She then heats the same saturated solution. Will more sugar dissolve?', answer: 'Yes, more sugar will dissolve',
                  options: ['Yes, more sugar will dissolve', 'no, it\'s already saturated'],
                  hint: 'Revisit c8_physics_ch5_4 for solubility definition and c6_physics_ch07_024 for heat vs temperature.',
                  misconception: 'Students often believe that stirring increases the amount of solute that can dissolve (the solubility limit) because they see the solid.' },
                { id: 'b', prompt: 'A student has 100 g of water at 30°C. The solubility of potassium nitrate (KNO₃) at 30°C is 46 g/100 g water.', answer: 'At 30°C, maximum KNO₃ that can dissolve in 100 g water = 46 g',
                  options: ['At 30°C, maximum KNO₃ that can dissolve in 100 g water = 46 g', 'stirring increases the solubility limit'],
                  hint: 'Revisit c8_physics_ch5_4 for solubility definition and c6_physics_ch07_024 for heat vs temperature.',
                  misconception: 'Students often believe that stirring increases the amount of solute that can dissolve (the solubility limit) because they see the solid.' }
          ],
            remediations: { 'stirring-increases-the-amount-of': { steps: ['Perform a side-by-side demo: two identical beakers with 100 mL cold water and 50 g salt (solubility ~36 g).', 'Stir one continuously, leave the other unstirred.', 'After 5 minutes, filter both and evaporate the filtrates to dryness.', 'Weigh the dissolved salt recovered from each.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
