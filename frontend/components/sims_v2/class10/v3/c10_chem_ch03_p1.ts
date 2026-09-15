import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch03_p1: SimDef = {
    id: 'v3_c10_chem_ch03_p1',
    title: 'Metals and Non-metals · Part 1/2',
    subtitle: 'Sort metals from non-metals — including the ones that break the rules',
    classLevel: 10, subject: 'chemistry', topic: 'Metals and Non-metals · Part 1/2',
    chapters: ['c10_chem_ch03'],
    nodeIds: ['c10_chem_cbse_03_001', 'c10_chem_cbse_03_002', 'c10_chem_cbse_03_003', 'c10_chem_cbse_03_004', 'c10_chem_cbse_03_005', 'c10_chem_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials engineer picking metals for real jobs', intro: 'A goldsmith hammers a sheet thinner than paper, an electrician pulls copper wire, and a pencil somehow lights an LED. One property at a time, the periodic table starts making sense.', goal: 'Link metallic properties to electron behaviour and handle the classic exceptions — graphite, mercury, diamond — without flinching.' },
    discovery: {
        question: 'A pencil \'lead\' completes a circuit and the LED glows. A classmate declares: \'It conducts, so graphite must be a metal.\' Your move?',
        options: ['Graphite is a non-metal that conducts — its delocalised electrons are a famous exception', 'He\'s right — anything that conducts electricity is a metal', 'It\'s neither — pencil lead isn\'t really carbon', 'Graphite conducts only because of clay mixed into the pencil'],
        answer: 'Graphite is a non-metal that conducts — its delocalised electrons are a famous exception',
        hook: 'One property never defines a class. Mercury is a liquid metal; graphite is a conducting non-metal; diamond is a non-metal harder than any steel. Check the whole profile.',
    },
    teaching: [
        { title: 'Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility', text: 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection of light by free electrons), hardness (resistance to deformation, generally high except for alkali metals).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_03_001', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Given three mystery samples — a slippery black conductor, a brittle yellow powder, a shiny grey liquid — identify each and justify the call with properties, not guesses.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_001', title: 'Physical Properties of Metals: Lustre, Hardness, Malleability, Ductility',
          caseStudy: { intro: 'Begin with a real-world observation: a student sees a gold ornament shining (lustre), a blacksmith hammering hot iron into a sheet (malleability),.',
            decisions: [{ prompt: 'Define metallic lustre and state the atomic-level reason for it in one sentence.', options: [
                { text: 'Metallic lustre is the shiny appearance of metals due to the reflection of incident light', outcome: 'Metallic lustre is the shiny appearance of metals due to the reflection of incident light by the.' },
                { text: 'metals are shiny', outcome: 'Not quite — Students often write "metals are malleable because they are soft" — confusing malleability (ability.', reveals: 'students-often-write-metals-are' },
                { text: 'metals are malleable', outcome: 'Not quite — Students often write "metals are malleable because they are soft" — confusing malleability (ability.', reveals: 'students-often-write-metals-are' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_002', title: 'Physical Properties of Non-Metals and Exceptions (Graphite, Mercury)',
          caseStudy: { intro: 'Observe a pencil lead (graphite) completing an electrical circuit in a simple LED tester — it glows, yet pencil lead is made of carbon, a non-metal.',
            decisions: [{ prompt: 'State the general physical properties of non-metals with respect to: (a) lustre, (b) hardness, (c) electrical conductivity, (d) melting and.', options: [
                { text: 'Non-metals are generally non-lustrous (dull), brittle (not malleable/ductile), poor', outcome: 'Non-metals are generally non-lustrous (dull), brittle (not malleable/ductile), poor conductors.' },
                { text: 'non-metals are lustrous or good conductors', outcome: 'Not quite — Students often write "graphite is a metal because it conducts electricity" or "mercury is.', reveals: 'students-often-write-graphite-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_003', title: 'Chemical Properties of Metals: Reaction with Oxygen',
          scaffold: { problem: '** A strip of magnesium ribbon (mass 3.0 g) is burnt in a crucible. After cooling, the mass of the white ash is found to be 5.0 g.',
            steps: [
            { text: 'Identify reactants — magnesium (Mg) and oxygen (O₂) from air. Product — magnesium oxide (MgO).' },
            { text: 'Write unbalanced equation: Mg + O₂ → MgO. Balance: 2Mg + O₂ → 2MgO.' },
            { text: 'Mass of oxygen combined = mass of product – mass of Mg = 5.0 g – 3.0 g = 2.0 g.' },
            { text: 'Verify conservation: Total reactants = 3.0 g Mg + 2.0 g O₂ = 5.0 g = mass of product. Law holds.' },
            { text: 'Product is MgO (magnesium oxide). It is a basic oxide (reacts with water to form Mg(OH)₂, turns red litmus blue).', faded: true, blankAnswer: '** (a) 2Mg(s) + O₂(g) → 2MgO(s) (b) 2.0 g (c) Verified: 3.0.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_006', title: 'Chemical Properties: Reaction with Solutions of Other Metal Salts',
          caseStudy: { intro: 'Observe an iron nail dipped in blue copper sulphate solution — the blue colour fades to light green and a reddish-brown coating appears on the nail.',
            decisions: [{ prompt: 'What is the general condition for a metal to displace another metal from its salt solution?', options: [
                { text: 'The displacing metal must be more reactive (higher in the reactivity series) than the', outcome: 'The displacing metal must be more reactive (higher in the reactivity series) than the metal in the.' },
                { text: 'any metal can displace any other', outcome: 'Not quite — Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺).', reveals: 'students-often-write-the-displaced' },
                { text: 'the metal with higher atomic mass displaces', outcome: 'Not quite — Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺).', reveals: 'students-often-write-the-displaced' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a jewellery shop, a family is choosing bangles. The salesman offers 24-carat pure gold at a higher price and 22-carat gold — gold mixed with copper — for everyday wear. A cousin insists pure gold must be better for everything because \'purer means stronger.\'',
            decisions: [{ prompt: 'Why does the jeweller actually recommend 22-carat for bangles worn daily?', options: [
                { text: 'Pure gold is extremely malleable but very soft — daily wear would bend and scratch it. Mixing in copper makes the alloy harder and more durable while keeping enough malleability to shape into ornaments.', outcome: 'Alloying deliberately trades a little purity for hardness — the foreign atoms disturb the metal\'s crystal layers so they do not slide as easily, which is exactly why 22-carat survives daily wear.' },
                { text: 'The cousin is right — 24-carat is best for bangles because the purest metal is always the strongest.', outcome: 'In metals, purity often means softness — pure gold\'s uniform atomic layers slide over each other easily, which is why it can be beaten thin but also dents easily.', reveals: 'purity-equals-strength' },
                { text: '22-carat gold is recommended only because it is cheaper and the jeweller wants a quicker sale.', outcome: 'The price difference is real, but the functional reason is hardness — the copper alloy resists scratches and keeps its shape far better than soft pure gold.', reveals: 'alloying-is-only-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Metals shine, bend and conduct because of how their electrons pool; non-metals break the pattern wherever bonding allows it. Learn the reasons and the exceptions stop being exceptions.',
            decisions: [{ prompt: 'What comes next? Metals and Non-metals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Metals and Non-metals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_001', difficulty: 'standard',
          question: 'Physical properties of metals such as metallic lustre (shiny appearance due.',
          hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron.',
          misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under.',
          parts: [
                { id: 'a', prompt: 'Why are metals generally malleable and ductile while ionic compounds like NaCl are brittle? Explain using the nature of bonding.', answer: 'In metals, the metallic bond is non-directional',
                  options: ['In metals, the metallic bond is non-directional', 'metals are soft', 'ionic bonds are weak', 'metals are malleable'],
                  hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron distribution.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' },
                { id: 'b', prompt: 'A student has four metal samples: sodium (Na), magnesium (Mg), tungsten (W), and mercury (Hg).', answer: ', magnesium (Mg), tungsten (W), and mercury (Hg)',
                  options: [', magnesium (Mg), tungsten (W), and mercury (Hg)', 'metals are malleable'],
                  hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron distribution.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' },
                { id: 'c', prompt: 'Compare the malleability of gold and iron at room temperature. Which is more malleable and why? How does heating affect the malleability of iron?', answer: 'Gold is more malleable than iron at room temperature',
                  options: ['Gold is more malleable than iron at room temperature', 'gold is softer so more malleable', 'metals are malleable'],
                  hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron distribution.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' }
          ],
            remediations: { 'students-often-write-metals-are': { steps: ['Revisit the electron sea model from Class 9 (c9_chem_ch2_6, c9_chem_ch3_5) — draw diagrams showing positive ions in.', 'Use layered diagrams to show how ions slide in metals vs. like-charge repulsion in ionic solids.', 'Memorize the exception table: Group 1 metals (soft, low mp), Mercury (liquid), Tungsten (hard, high mp), Gold (most.', 'Practice writing the exact phrase "non-directional metallic bonding allows layers of cations to slide over each other".'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All metals are hard, so they cannot be cut with a knife." Identify the error and give two counterexamples with reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'mercury', 'cut with a knife', 'metals are malleable'],
                  hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron distribution.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' },
                { id: 'b', prompt: 'Design a simple experiment using only a hammer, a battery, a bulb, wires, and samples of iron, copper, sulfur, and graphite to distinguish metals from.', answer: 'Procedure: (1) Try to flatten each sample with a hammer',
                  options: ['Procedure: (1) Try to flatten each sample with a hammer', 'metals are malleable'],
                  hint: 'If stuck, review Class 9 ionic vs metallic bonding (c9_chem_ch3_5) and electron distribution.',
                  misconception: 'Students often write "metals are malleable because they are soft" — confusing malleability (ability to deform under compressive stress).' }
          ],
            remediations: { 'students-often-write-metals-are': { steps: ['Revisit the electron sea model from Class 9 (c9_chem_ch2_6, c9_chem_ch3_5) — draw diagrams showing positive ions in.', 'Use layered diagrams to show how ions slide in metals vs. like-charge repulsion in ionic solids.', 'Memorize the exception table: Group 1 metals (soft, low mp), Mercury (liquid), Tungsten (hard, high mp), Gold (most.', 'Practice writing the exact phrase "non-directional metallic bonding allows layers of cations to slide over each other".'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_002', difficulty: 'standard',
          question: 'Non-metals are elements that generally lack metallic lustre, are brittle.',
          hint: 'If stuck, review Class 9 node c9_chem_ch3_4 (Covalent Bonding) and Class 8 nodes.',
          misconception: 'Students often write "graphite is a metal because it conducts electricity" or "mercury is a non-metal because it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Non-metals are elements that generally lack metallic lustre, are brittle in solid state,',
                  options: ['Non-metals are elements that generally lack metallic lustre, are brittle in solid state,', 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection', 'When metals react with oxygen (from air or pure oxygen), they form metal oxides through a', 'The reaction of metals with water (cold, hot, or steam) is a redox process where the'],
                  hint: 'If stuck, review Class 9 node c9_chem_ch3_4 (Covalent Bonding) and Class 8 nodes c8_chem_ch2_6.',
                  misconception: 'Students often write "graphite is a metal because it conducts electricity" or "mercury is a non-metal because it is liquid".' }
          ],
            remediations: { 'students-often-write-graphite-is': { steps: ['Revisit the definition of metals vs non-metals based on electron loss/gain tendency (Class 9, c9_chem_ch3_5).', 'Draw the structures of diamond and graphite side-by-side; highlight the delocalised electron in graphite.', 'Test conductivity of pencil lead vs sulphur vs copper wire in a lab activity.', 'Write a comparison table: Property | Metal | Non-metal | Exception (Graphite) | Exception (Mercury) to cement the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_003', difficulty: 'standard',
          question: 'When metals react with oxygen (from air or pure oxygen), they form metal oxides.',
          hint: 'If stuck on formula writing, revisit **c9_chem_ch3_6: Writing Chemical Formulae: Rules.',
          misconception: 'Students think **all metal oxides are basic** and write "metal oxide + water → base" for every metal.',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the reaction of magnesium with oxygen. State the physical state of the product formed.', answer: '**Answer:** 2Mg(s) + O₂(g) → 2MgO(s)',
                  options: ['**Answer:** 2Mg(s) + O₂(g) → 2MgO(s)', 'metal oxide + water → base'],
                  hint: 'If stuck on formula writing, revisit **c9_chem_ch3_6: Writing Chemical Formulae: Rules and Valency.',
                  misconception: 'Students think **all metal oxides are basic** and write "metal oxide + water → base" for every metal.' },
                { id: 'b', prompt: 'A student heats 12 g of magnesium ribbon in a crucible. After reaction, the mass of the product is 20 g. Calculate the mass of oxygen that combined.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'metal oxide + water → base'],
                  hint: 'If stuck on formula writing, revisit **c9_chem_ch3_6: Writing Chemical Formulae: Rules and Valency.',
                  misconception: 'Students think **all metal oxides are basic** and write "metal oxide + water → base" for every metal.' },
                { id: 'c', prompt: 'Compare the oxides formed by sodium (Na₂O), aluminium (Al₂O₃), and copper (CuO) in terms of: (a) reaction condition with oxygen, (b) nature of oxide.', answer: '**Answer:** (a) Na: reacts vigorously at room temperature (catches fire)',
                  options: ['**Answer:** (a) Na: reacts vigorously at room temperature (catches fire)', 'metal oxide + water → base'],
                  hint: 'If stuck on formula writing, revisit **c9_chem_ch3_6: Writing Chemical Formulae: Rules and Valency.',
                  misconception: 'Students think **all metal oxides are basic** and write "metal oxide + water → base" for every metal.' }
          ],
            remediations: { 'all-metal-oxides-are-basic': { steps: ['Make a table of 10 metals (Na, Mg, Al, Zn, Fe, Cu, etc.) with columns: Reaction condition, Oxide formula, Nature.', 'For each amphoteric oxide (Al₂O₃, ZnO), write **two** equations: one with HCl, one with NaOH.', 'Do a quick litmus test: dissolve MgO ash in water → test (basic); try dissolving Al₂O₃ in water → doesn\'t dissolve →.', 'Memorize the phrase: **"Al, Zn, Sn, Pb oxides are amphoteric — they swing both ways."**'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_004', difficulty: 'standard',
          question: 'The reaction of metals with water (cold, hot, or steam) is a redox process.',
          hint: 'If stuck, revisit writing chemical formulae using valency (c9_chem_ch3_6) and the concept.',
          misconception: 'Students often write the product of iron with steam as FeO (iron(II) oxide) instead of Fe₃O₄ (iron(II,III) oxide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The reaction of metals with water (cold, hot, or steam) is a redox process where the',
                  options: ['The reaction of metals with water (cold, hot, or steam) is a redox process where the', 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection', 'Non-metals are elements that generally lack metallic lustre, are brittle in solid state,', 'When metals react with oxygen (from air or pure oxygen), they form metal oxides through a'],
                  hint: 'If stuck, revisit writing chemical formulae using valency (c9_chem_ch3_6) and the concept.',
                  misconception: 'Students often write the product of iron with steam as FeO (iron(II) oxide) instead of Fe₃O₄ (iron(II,III) oxide, magnetic oxide).' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['Show the student a video of iron + steam producing a black magnetic solid; ask them to test the solid with a magnet.', 'Demonstrate magnesium ribbon in cold water (no visible bubbles) vs.', 'Have them write the three balanced equations (Na + cold water, Mg + hot water, Fe + steam) side by side and highlight.', 'Assign a 3-mark board-style question: "Write the reaction of iron with steam. Name the product and state its colour."'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_005', difficulty: 'standard',
          question: 'Aqua regia is a highly corrosive, fuming yellow-orange liquid mixture.',
          hint: 'Revisit c9_chem_ch3_6 (writing formulae) and c10_chem_cbse_03_003 (nitric acid.',
          misconception: 'Students write the reaction as **Au + 3HCl → AuCl₃ + 3/2 H₂↑** (treating aqua regia as just HCl) or **Au + 3HNO₃ →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Aqua regia is a highly corrosive, fuming yellow-orange liquid mixture of concentrated',
                  options: ['Aqua regia is a highly corrosive, fuming yellow-orange liquid mixture of concentrated', 'Physical properties of metals such as metallic lustre (shiny appearance due to reflection', 'Non-metals are elements that generally lack metallic lustre, are brittle in solid state,', 'When metals react with oxygen (from air or pure oxygen), they form metal oxides through a'],
                  hint: 'Revisit c9_chem_ch3_6 (writing formulae) and c10_chem_cbse_03_003 (nitric acid as oxidizer).',
                  misconception: 'Students write the reaction as **Au + 3HCl → AuCl₃ + 3/2 H₂↑** (treating aqua regia as just HCl) or **Au + 3HNO₃ → Au(NO₃)₃ + 3/2 H₂↑**.' }
          ],
            remediations: { 'students-write-the-reaction-as': { steps: ['Show the student two test tubes — one with conc. HNO₃ + gold foil, one with conc.', 'Mix the two acids (1:3) in a third tube, add gold foil, and observe dissolution with brown fumes (NO/NO₂).', 'Write the in situ generation reaction: HNO₃ + 3HCl → NOCl + Cl₂ + 2H₂O on the board.', 'Have the student balance the overall gold reaction using oxidation numbers (Au⁰ → Au³⁺, N⁺⁵ → N⁺²).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_006', difficulty: 'standard',
          question: 'A displacement reaction occurs when a more reactive metal displaces a less.',
          hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) and c9_chem_ch3_5 (Ionic.',
          misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral.',
          parts: [
                { id: 'a', prompt: 'An iron nail is placed in a solution of zinc sulphate. Will a reaction occur? Explain why or why not using the reactivity series.', answer: 'No reaction occurs',
                  options: ['No reaction occurs', 'yes, iron will displace zinc'],
                  hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) and c9_chem_ch3_5 (Ionic Bonding).',
                  misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral metal atoms (Cu(s)).' },
                { id: 'b', prompt: 'Compare the reactions: (i) Cu(s) + FeSO₄(aq) → ? and (ii) Fe(s) + CuSO₄(aq) → ?.', answer: 'Reaction (ii) occurs',
                  options: ['Reaction (ii) occurs', 'both occur', 'neither occurs'],
                  hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) and c9_chem_ch3_5 (Ionic Bonding).',
                  misconception: 'Students often write the displaced metal as an ion in the product (e.g., Fe + CuSO₄ → FeSO₄ + Cu²⁺) instead of neutral metal atoms (Cu(s)).' }
          ],
            remediations: { 'students-often-write-the-displaced': { steps: ['Revisit Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae) to practice valency cross-method for metal salts.', 'Use a reactivity series chart (from upcoming node c10_chem_cbse_03_007) and physically arrange metal-salt pairs —.', 'For each predicted reaction, write the equation on paper, then check: (a) correct formulae using valency, (b) balanced.', 'Do the iron nail in CuSO₄ experiment at home (with adult supervision) — observe the reddish-brown Cu(s) coating and.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
