import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch01_p1: SimDef = {
    id: 'v3_c12_phy_ch01_p1',
    title: 'Electric Charges and Fields · Part 1/2',
    subtitle: 'Two charges were born — and zero charge was created',
    classLevel: 12, subject: 'physics', topic: 'Electric Charges and Fields · Part 1/2',
    chapters: ['c12_phy_ch01'],
    nodeIds: ['c12_phy_cbse_01_001', 'c12_phy_cbse_01_002', 'c12_phy_cbse_01_003', 'c12_phy_cbse_01_004', 'c12_phy_cbse_01_005', 'c12_phy_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Charge accountant', intro: 'Sparks from a winter sweater are a trillion-electron migration — and the ledger still balances to the last e.', goal: 'Apply additivity, conservation and quantization of charge to real transfers and decays.' },
    discovery: {
        question: 'You rub a balloon on your hair and it sticks to a wall. What actually happened?',
        options: ['Electrons moved from your hair to the balloon', 'The balloon became magnetic', 'Air pressure held it against the wall', 'Glue molecules formed on the balloon\'s surface'],
        answer: 'Electrons moved from your hair to the balloon',
        hook: 'Most students think rubbing \'creates\' charge — it only moves it. Watch what the charges actually do.',
    },
    teaching: [
        { title: 'Electric Charge: Properties and Quantization', text: 'Electric charge is a fundamental intrinsic property of matter that causes it to experience a force when placed in an electromagnetic field.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_01_001', title: 'Your mission',
          mission: { widget: 'efield', validate: 'efield:q1=80,q2=20',
            instruction: 'On the lab: make charge A positive and B negative — do the field lines connect?.',
        context: 'Make charge A positive and B negative — do the field lines reach across?',
            observePrompt: 'What did the efield interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_001', title: 'Electric Charge: Properties and Quantization',
          scaffold: { problem: 'A copper penny of mass 3.1 g is given a positive charge of 2.4 × 10⁻⁷ C by removing electrons. (a) How many electrons were removed?',
            steps: [
            { text: 'Identify given: q = +2.4 × 10⁻⁷ C, e = 1.602 × 10⁻¹⁹ C, mass = 3.1 g, M = 63.5 g/mol, Z = 29, N_A = 6.022 × 10²³ mol⁻¹.' },
            { text: 'Use quantization formula q = n e → n = q/e. Substitute: n = (2.4 × 10⁻⁷) / (1.602 × 10⁻¹⁹) = 1.498 × 10¹² ≈ 1.50 × 10¹².' },
            { text: 'Calculate total electrons in neutral penny. Moles of Cu = mass/M = 3.1/63.5 = 0.0488 mol.' },
            { text: 'Fraction f = n / total electrons = (1.50 × 10¹²) / (8.53 × 10²³) = 1.76 × 10⁻¹².' },
            { text: 'Verify: n is integer (1.50 × 10¹² ≈ integer), fraction is tiny (~10⁻¹²), consistent with macroscopic charge being.', faded: true, blankAnswer: '(a) 1.50 × 10¹² electrons removed. (b) Fraction = 1.76.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_002', title: 'Coulomb\'s Law: Statement and Formula',
          scaffold: { problem: 'A small sphere A carries charge \\(+2.0 \\ \\mu\\text{C}\\) and is fixed at the origin.',
            steps: [
            { text: 'Identify given quantities with units: \\(q_A = +2.0 \\times 10^{-6} \\ \\text{C}\\), \\(q_B = -3.0 \\times 10^{-6} \\.' },
            { text: 'Determine unit vector \\(\\hat{r}_{AB}\\) from A to B. Since A is at origin and B is at \\(+x\\), \\(\\hat{r}_{AB}.' },
            { text: 'Write vector Coulomb\'s Law: \\(\\vec{F}_{BA} = k \\frac{q_A q_B}{r^2} \\hat{r}_{AB}\\).' },
            { text: 'Substitute values with units: \\(\\vec{F}_{BA} = (9 \\times 10^9) \\frac{(2.0 \\times 10^{-6})(-3.0 \\times.' },
            { text: 'Compute stepwise: numerator \\(q_A q_B = -6.0 \\times 10^{-12} \\ \\text{C}^2\\); \\(r^2 = 1.6 \\times 10^{-3} \\ \\text{m}^2\\).' },
            { text: 'Verify: Negative sign means force on B is opposite to \\(\\hat{i}\\) (toward A) — correct for attraction.', faded: true, blankAnswer: '\\(\\vec{F}_{BA} = -33.8 \\ \\hat{i} \\ \\text{N}\\) (or \\(33.8 \\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_003', title: 'Superposition Principle for Electric Forces',
          scaffold: { problem: '** Three charges are placed at the vertices of a right triangle: \\(q_A = +5.0\\ \\mu\\text{C}\\) at \\((0,0)\\), \\(q_B = -3.0\\ \\mu\\text{C}\\).',
            steps: [
            { text: 'Identify given quantities with units. \\(q_A = +5.0 \\times 10^{-6}\\ \\text{C}\\), \\(q_B = -3.0 \\times 10^{-6}\\ \\text{C}\\).' },
            { text: 'Compute force on \\(q_A\\) due to \\(q_B\\). Distance \\(r_{AB} = 0.040\\ \\text{m}\\).' },
            { text: 'Compute force on \\(q_A\\) due to \\(q_C\\). Distance \\(r_{AC} = 0.030\\ \\text{m}\\).' },
            { text: 'Add components. \\(F_x = +84.375\\ \\text{N}\\), \\(F_y = -100\\ \\text{N}\\).' },
            { text: 'Verify reasonableness. Forces are large because charges are \\(\\mu\\text{C}\\) at cm distances — typical for lab-scale.', faded: true, blankAnswer: '** \\(\\vec{F}_{\\text{net}} = (84.4\\ \\hat{i} - 100\\ \\hat{j})\\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_004', title: 'Electric Field: Definition and Calculation',
          scaffold: { problem: 'A charge \\(q_1 = +2.0\\,\\mu\\text{C}\\) is placed at the origin, and a charge \\(q_2 = -3.0\\,\\mu\\text{C}\\) is placed at \\((0.10\\,\\text{m}, 0)\\).',
            steps: [
            { text: 'Identify given quantities: \\(q_1 = +2.0 \\times 10^{-6}\\,\\text{C}\\) at (0,0), \\(q_2 = -3.0 \\times 10^{-6}\\,\\text{C}\\).' },
            { text: 'Compute distances from each charge to P. For \\(q_1\\): \\(r_1 = 0.10\\,\\text{m}\\).' },
            { text: 'Determine unit vectors \\(\\hat{r}_1\\) and \\(\\hat{r}_2\\) from each charge to P.' },
            { text: 'Calculate field magnitudes: \\(E_1 = 9 \\times 10^9 \\times \\frac{2.0 \\times 10^{-6}}{(0.10)^2} = 1.8 \\times.' },
            { text: 'Compute vector fields: \\(\\vec{E}_1 = 1.8 \\times 10^6 (+\\hat{y}) = (0, 1.8 \\times 10^6)\\).' },
            { text: 'Add components: \\(\\vec{E}_{\\text{net}} = (-9.54 \\times 10^5, 1.8 \\times 10^6 + 9.54 \\times 10^5) = (-9.54 \\times 10^5.', faded: true, blankAnswer: '\\(\\vec{E}_{\\text{net}} = (-9.54 \\times 10^5\\,\\hat{x} + 2.75.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_005', title: 'Electric Field Due to a Point Charge',
          scaffold: { problem: 'A small sphere carrying a charge of \\( +5.0 \\mu C \\) is fixed at the origin.',
            steps: [
            { text: 'Identify given quantities: \\( q = +5.0 \\times 10^{-6} \\, \\text{C} \\), coordinates of P: \\( x = 0.030 \\, \\text{m},.' },
            { text: 'Calculate distance \\( r = \\sqrt{x^2 + y^2} = \\sqrt{(0.030)^2 + (0.040)^2} = \\sqrt{0.0009 + 0.0016} = \\sqrt{0.0025}.' },
            { text: 'Determine unit vector \\( \\hat{r} \\) from source to P: \\( \\hat{r} = \\frac{x\\hat{i} + y\\hat{j}}{r} = \\frac{0.030\\hat{i}.' },
            { text: 'Compute magnitude \\( E = k \\frac{|q|}{r^2} = (9 \\times 10^9) \\frac{5.0 \\times 10^{-6}}{(0.050)^2} = \\frac{45 \\times.' },
            { text: 'Multiply magnitude by unit vector: \\( \\vec{E} = (1.8 \\times 10^7)(0.6\\hat{i} + 0.8\\hat{j}) = 1.08 \\times 10^7 \\hat{i}.', faded: true, blankAnswer: '\\( \\vec{E} = (1.08 \\times 10^7 \\hat{i} + 1.44 \\times 10^7.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_01_006', title: 'Electric Field Lines: Properties and Representation',
          caseStudy: { intro: 'Observe a Van de Graaff generator in the school lab: when it runs, the metal dome becomes highly charged.',
            decisions: [{ prompt: 'What is the physical significance of the density of electric field lines in a region?', options: [
                { text: 'The density of electric field lines (number of lines per unit cross-sectional area', outcome: 'The density of electric field lines (number of lines per unit cross-sectional area perpendicular.' },
                { text: 'density represents total charge', outcome: 'Not quite — Students believe electric field lines are *physical* entities that "flow" from positive to negative.', reveals: 'electric-field-lines-are-physical' },
                { text: 'density is constant everywhere', outcome: 'Not quite — Students believe electric field lines are *physical* entities that "flow" from positive to negative.', reveals: 'electric-field-lines-are-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In the lab, a partner computes the force between +3 μC and −2 μC charges 10 cm apart as 5.4×10⁹ N — \'bigger than a rocket engine, something\'s off.\' He plugged 3, 2 and 10 straight into the formula.',
            decisions: [{ prompt: 'Where did the calculation derail?', options: [
                { text: 'At the units — μC must become coulombs (×10⁻⁶) and cm must become metres, then the separation gets squared; done in SI, the answer is a few newtons, attractive — not a nine-digit force.', outcome: 'The chapter\'s discipline: k ≈ 9×10⁹ only balances when the inputs are SI — μC and cm inflate the result by twelve orders before physics even gets a say.' },
                { text: 'At the formula — he forgot that opposite charges need a minus force, so use negative F.', outcome: 'The sign already lives in the product q₁q₂ — the formula reports attraction via the direction; the numeric blow-up came from unconverted units, not a missing minus.', reveals: 'sign-fixes-magnitude' },
                { text: 'At the distance — he should have used r, not r², since force weakens with separation.', outcome: 'The weakening is the r²: using plain r would overstate the force further — the inverse square is the law, not an error to relax.', reveals: 'r-not-r-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Charge is never created or destroyed — only moved. You now know why the balloon sticks, why lightning strikes, and what Coulomb\'s law is really measuring.',
            decisions: [{ prompt: 'What comes next? Electric Charges and Fields · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electric Charges and Fields · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'efield', prompt: 'Explore the efield interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'efield', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_001', difficulty: 'standard',
          question: 'Electric charge is a fundamental intrinsic property of matter that causes it.',
          hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation.',
          misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic.',
          parts: [
                { id: 'a', prompt: 'A glass rod rubbed with silk acquires a charge of +3.2 × 10⁻¹⁹ C. How many electrons were transferred from the rod to the silk? (e = 1.6 × 10⁻¹⁹ C)', answer: '2 electrons were transferred',
                  options: ['2 electrons were transferred', 'quantization of charge means charge cannot be divided', 'you cannot have half a coulomb'],
                  hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation (c6_math_ch01_005).',
                  misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic objects, saying "you.' },
                { id: 'b', prompt: 'Two identical metal spheres A and B have charges +6 μC and –2 μC respectively. They are brought into contact and then separated.', answer: 'Final charge on each sphere = +2 μC',
                  options: ['Final charge on each sphere = +2 μC', 'charge is lost', 'quantization of charge means charge cannot be divided', 'you cannot have half a coulomb'],
                  hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation (c6_math_ch01_005).',
                  misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic objects, saying "you.' },
                { id: 'c', prompt: 'A polythene piece rubbed with wool gains a negative charge of 4.8 × 10⁻⁷ C. (a) Estimate the number of electrons transferred.', answer: 'Estimate the number of electrons transferred',
                  options: ['Estimate the number of electrons transferred', 'quantization of charge means charge cannot be divided', 'you cannot have half a coulomb'],
                  hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation (c6_math_ch01_005).',
                  misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic objects, saying "you.' },
                { id: 'd', prompt: 'Compare the following two statements and identify which is correct and why: Statement X: "A body can have a charge of 1.5 × 10⁻¹⁹ C." Statement Y: "A body can.', answer: 'Statement Y is correct',
                  options: ['Statement Y is correct', 'quantization of charge means charge cannot be divided', 'you cannot have half a coulomb'],
                  hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation (c6_math_ch01_005).',
                  misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic objects, saying "you.' }
          ],
            remediations: { 'quantization-of-charge-means-charge': { steps: ['If the student cannot distinguish scales, do this remediation: (1) Revisit integer arithmetic from c6_math_ch02_016.', '(2) Perform a thought experiment: calculate n for 1 μC, 1 mC, 1 C.', '(3) Use the "dotted line" analogy from NCERT: from far, dots look continuous; up close, they\'re discrete.', '(4) Re-attempt Diagnostic Question 4 with emphasis on integer n.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic.',
          parts: [
                { id: 'a', prompt: 'In a closed system, a neutron decays into a proton and an electron. The proton has charge +e, electron has charge –e.', answer: 'The argument is wrong',
                  options: ['The argument is wrong', 'creation of charged particles', 'creation of net charge', 'quantization of charge means charge cannot be divided'],
                  hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation (c6_math_ch01_005).',
                  misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic objects, saying "you.' },
                { id: 'b', prompt: 'Design a simple experiment using a gold-leaf electroscope, a glass rod, silk cloth, and a plastic rod to demonstrate (a) additivity of charge, (b) conservation.', answer: 'additivity of charge, (',
                  options: ['additivity of charge, (', 'quantization of charge means charge cannot be divided', 'you cannot have half a coulomb'],
                  hint: 'Revisit integer addition with signs (c6_math_ch02_019) and scientific notation (c6_math_ch01_005).',
                  misconception: 'Students often think "quantization of charge means charge cannot be divided" and apply it incorrectly to macroscopic objects, saying "you.' }
          ],
            remediations: { 'quantization-of-charge-means-charge': { steps: ['If the student cannot distinguish scales, do this remediation: (1) Revisit integer arithmetic from c6_math_ch02_016.', '(2) Perform a thought experiment: calculate n for 1 μC, 1 mC, 1 C.', '(3) Use the "dotted line" analogy from NCERT: from far, dots look continuous; up close, they\'re discrete.', '(4) Re-attempt Diagnostic Question 4 with emphasis on integer n.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_002', difficulty: 'standard',
          question: 'Coulomb\'s Law states that the electrostatic force between two stationary point.',
          hint: 'If stuck on vector direction, revisit c11_phy_cbse_03_003 (analytical vector addition).',
          misconception: 'Students treat Coulomb\'s Law as a scalar magnitude formula \\(F = k q_1 q_2 / r^2\\) and then separately "decide".',
          parts: [
                { id: 'a', prompt: 'The force between two point charges is \\(F\\) when they are in vacuum.', answer: 'New force \\(F\' = F / \\varepsilon_r = F/4\\)',
                  options: ['New force \\(F\' = F / \\varepsilon_r = F/4\\)', 'permittivity of free space'],
                  hint: 'If stuck on vector direction, revisit c11_phy_cbse_03_003 (analytical vector addition) and practice.',
                  misconception: 'Students treat Coulomb\'s Law as a scalar magnitude formula \\(F = k q_1 q_2 / r^2\\) and then separately "decide" attraction or repulsion.' }
          ],
            remediations: { 'students-treat-coulomb-s-law': { steps: ['Revisit the vector form derivation in NCERT Section 1.5 — note how \\(\\hat{r}_{21} = -\\hat{r}_{12}\\) and \\(q_1 q_2\\).', 'Take three charge pairs: \\((+q, +q)\\), \\((+q, -q)\\), \\((-q, -q)\\) at fixed \\(r\\).', 'Verify that the sign of the result matches physical expectation without any "manual" decision.', 'Re-attempt Diagnostic Question 3. If sign error persists, review c11_phy_cbse_03_007 (Vector Addition Using Components).'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_003', difficulty: 'standard',
          question: 'The superposition principle for electric forces states that the net.',
          hint: 'Revisit vector components (c11_phy_cbse_03_003) and Coulomb\'s law direction rules.',
          misconception: 'Students often believe that the net force is the algebraic sum of the magnitudes of individual forces (scalar addition).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The superposition principle for electric forces states that the net electrostatic force',
                  options: ['The superposition principle for electric forces states that the net electrostatic force', 'Electric charge is a fundamental intrinsic property of matter that causes it to', 'Coulomb\'s Law states that the electrostatic force between two stationary point charges is', 'Electric field at a point in space is defined as the electrostatic force per unit'],
                  hint: 'Revisit vector components (c11_phy_cbse_03_003) and Coulomb\'s law direction rules.',
                  misconception: 'Students often believe that the net force is the algebraic sum of the magnitudes of individual forces (scalar addition) because they.' }
          ],
            remediations: { 'the-net-force-is-the': { steps: ['If the student cannot correctly add force vectors, they must revisit: (1) Class 11 vector addition by components.', '(2) Coulomb\'s law magnitude and direction rules (c12_phy_cbse_01_002) — drill 10 problems identifying.', '(3) Re-attempt Diagnostic Questions 2, 3, and 5 with a focus on drawing free-body diagrams and writing each force.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_004', difficulty: 'standard',
          question: 'Electric field at a point in space is defined as the electrostatic force per.',
          hint: 'If stuck, review Coulomb\'s law (c12_phy_cbse_01_002) and vector addition by components.',
          misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\).',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of electric field, and how is it derived from the definition \\(\\vec{E} = \\vec{F}/q\\)?', answer: 'The SI unit is newton per coulomb (N/C)',
                  options: ['The SI unit is newton per coulomb (N/C)', 'without realizing it is equivalent', 'which inverts the definition'],
                  hint: 'If stuck, review Coulomb\'s law (c12_phy_cbse_01_002) and vector addition by components.',
                  misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\) and then substituting.' },
                { id: 'b', prompt: 'Three identical point charges \\(+q\\) are placed at the vertices of an equilateral triangle of side \\(a\\).', answer: 'Yes, the claim is correct',
                  options: ['Yes, the claim is correct', 'non-zero because charges are positive'],
                  hint: 'If stuck, review Coulomb\'s law (c12_phy_cbse_01_002) and vector addition by components.',
                  misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\) and then substituting.' }
          ],
            remediations: { 'the-electric-field-at-a': { steps: ['If a student exhibits this misconception, have them revisit the definition: \\(\\vec{E} = \\lim_{q \\to 0} \\vec{F}/q\\).', 'Do a quick thought experiment: "Place a \\(+1\\,\\mu\\text{C}\\) test charge at point P and measure force \\(\\vec{F}\\).', 'Now replace it with \\(+2\\,\\mu\\text{C}\\) — the force doubles, but the ratio \\(\\vec{F}/q\\) stays the same.', 'The field is a property of the source charges and the point in space, not the test charge." Then ask them to compute.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_005', difficulty: 'standard',
          question: 'The electric field due to a point charge is the force per unit positive test.',
          hint: 'If stuck on vector direction, review c11_phy_cbse_03_003 (analytical vector addition) and.',
          misconception: 'Students often think the electric field at a point due to a positive charge points *toward* the charge because.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of electric field and write the formula for the magnitude of electric field due to a point charge \\( q \\) at distance \\( r \\).', answer: 'SI unit: N/C (or V/m)',
                  options: ['SI unit: N/C (or V/m)', 'positive attracts positive'],
                  hint: 'If stuck on vector direction, review c11_phy_cbse_03_003 (analytical vector addition) and.',
                  misconception: 'Students often think the electric field at a point due to a positive charge points *toward* the charge because "positive attracts.' },
                { id: 'b', prompt: 'A point charge \\( +Q \\) produces an electric field \\( \\vec{E} \\) at point P.', answer: 'Magnitude doubles (factor of 2)',
                  options: ['Magnitude doubles (factor of 2)', 'direction stays same', 'magnitude halves', 'positive attracts positive'],
                  hint: 'If stuck on vector direction, review c11_phy_cbse_03_003 (analytical vector addition) and.',
                  misconception: 'Students often think the electric field at a point due to a positive charge points *toward* the charge because "positive attracts.' }
          ],
            remediations: { 'the-electric-field-at-a': { steps: ['Revisit node c12_phy_cbse_01_004 (Electric Field Definition) to reinforce the operational definition: \\( \\vec{E}.', 'Draw a diagram: place a +Q at origin, a +q0 at (r,0).', 'Show Coulomb repulsion → force on q0 is +x direction → E is +x direction.', 'Repeat with -Q at origin: force on +q0 is -x direction → E is -x direction.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_006', difficulty: 'standard',
          question: 'Electric field lines are imaginary curves drawn in an electric field such that.',
          hint: 'If stuck, revisit node c12_phy_cbse_01_004 (Electric Field: Definition and Calculation).',
          misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in.',
          parts: [
                { id: 'a', prompt: 'Why can two electric field lines never cross each other? Explain using the definition of electric field at a point.', answer: 'If two field lines crossed, the tangent at the intersection point would have two',
                  options: ['If two field lines crossed, the tangent at the intersection point would have two', 'they repel each other', 'it\'s just a drawing rule', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'If stuck, revisit node c12_phy_cbse_01_004 (Electric Field: Definition and Calculation) and.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' },
                { id: 'b', prompt: 'A student draws electric field lines for a single positive point charge. They draw 8 lines radiating outward.', answer: 'At distance *r*, arc length = *rθ* (for a given angular spread θ)',
                  options: ['At distance *r*, arc length = *rθ* (for a given angular spread θ)', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'If stuck, revisit node c12_phy_cbse_01_004 (Electric Field: Definition and Calculation) and.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' },
                { id: 'c', prompt: 'Consider the electric field lines for an electric dipole (+q and -q separated by distance *2a*).', answer: 'For a point charge, field lines spread radially in 3D',
                  options: ['For a point charge, field lines spread radially in 3D', 'dipole field also falls as 1/*r²*', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'If stuck, revisit node c12_phy_cbse_01_004 (Electric Field: Definition and Calculation) and.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' }
          ],
            remediations: { 'electric-field-lines-are-physical': { steps: ['If the student holds the "physical lines" misconception: (1) Have them draw field lines for a +2 μC charge using 8.', 'Ask: "Did the field change?', 'So the absolute number is not physical." (2) Use a PhET simulation "Charges and Fields" — place a +1 nC charge, observe.', 'The field vectors don\'t change; only the drawing changes.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
