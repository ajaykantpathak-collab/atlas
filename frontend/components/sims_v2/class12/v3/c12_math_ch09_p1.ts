import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch09_p1: SimDef = {
    id: 'v3_c12_math_ch09_p1',
    title: 'Differential Equations · Part 1/2',
    subtitle: 'The exponent said 4 — the highest derivative said 2',
    classLevel: 12, subject: 'mathematics', topic: 'Differential Equations · Part 1/2',
    chapters: ['c12_math_ch09'],
    nodeIds: ['c12_math_cbse_09_001', 'c12_math_cbse_09_002', 'c12_math_cbse_09_003', 'c12_math_cbse_09_004', 'c12_math_cbse_09_005', 'c12_math_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Equation classifier', intro: 'Any law that says \'rate depends on the quantity\' becomes a differential equation — first learn to read its skeleton.', goal: 'Identify differential equations and their order — highest derivative rules, exponents don\'t.' },
    discovery: {
        question: '\'d²y/dx² cubed, plus (dy/dx) to the fourth\' — a student calls this order 4 because of the exponent. What\'s the actual order?',
        options: ['2 — order is the highest derivative present, not the power it\'s raised to; exponents belong to degree, a different question entirely', '4', '3', '1'],
        answer: '2 — order is the highest derivative present, not the power it\'s raised to; exponents belong to degree, a different question entirely',
        hook: 'A differential equation needs a derivative to be one — \'x² − 5x + 6 = 0\' is just algebra. Cooling chai wrote the first one you\'ll meet: dT/dt = −k(T − T_room), order 1, because the rate of cooling depends on the temperature itself.',
    },
    teaching: [
        { title: 'Differential Equation: Definition and Order', text: 'A differential equation is an equation that involves an independent variable, a dependent variable, and derivatives of the dependent variable with respect to the independent variable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_09_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Interrogate any equation: decide if it\'s a differential equation, name the highest derivative for the order, and keep order versus degree separate in your head.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_002', title: 'Degree of a Differential Equation',
          scaffold: { problem: 'Find the order and degree (if defined) of the differential equation: (d²y/dx²)² + 3(dy/dx)³ + 2y = sin x.',
            steps: [
            { text: 'Identify all derivative terms: (d²y/dx²)², (dy/dx)³. The term sin x does not contain derivatives.' },
            { text: 'Determine the highest order derivative: d²y/dx² (second derivative). So order = 2.' },
            { text: 'Check if the equation is a polynomial in derivatives: (d²y/dx²)² is (y\'\')² — polynomial (power 2).' },
            { text: 'Since it is a polynomial in derivatives, degree is defined. The highest order derivative is d²y/dx².' },
            { text: 'Verify: Order = 2 (positive integer), Degree = 2 (positive integer). Both satisfy NCERT note.', faded: true, blankAnswer: 'Order = 2, Degree = 2' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_003', title: 'General and Particular Solutions',
          scaffold: { problem: 'Verify that y = c₁ e^{3x} + c₂ e^{-2x} is the general solution of the differential equation d²y/dx² - dy/dx - 6y = 0.',
            steps: [
            { text: 'Write the given function: y = c₁ e^{3x} + c₂ e^{-2x}. Note it contains two arbitrary constants c₁, c₂, and the DE.' },
            { text: 'Compute first derivative: dy/dx = 3c₁ e^{3x} - 2c₂ e^{-2x}.' },
            { text: 'Compute second derivative: d²y/dx² = 9c₁ e^{3x} + 4c₂ e^{-2x}.' },
            { text: 'Substitute y, dy/dx, d²y/dx² into LHS of DE: (9c₁ e^{3x} + 4c₂ e^{-2x}) - (3c₁ e^{3x} - 2c₂ e^{-2x}) - 6(c₁ e^{3x} + c₂.' },
            { text: 'Simplify: 9c₁ - 3c₁ - 6c₁ = 0 for e^{3x} term; 4c₂ + 2c₂ - 6c₂ = 0 for e^{-2x} term. LHS = 0 = RHS. Verified.', faded: true, blankAnswer: 'Verified. y = c₁ e^{3x} + c₂ e^{-2x} satisfies the DE for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_004', title: 'Formation of Differential Equation from General Solution',
          scaffold: { problem: 'Form the differential equation representing the family of curves \\(y = A e^{2x} + B e^{-3x}\\), where \\(A\\) and \\(B\\) are arbitrary.',
            steps: [
            { text: 'Identify the number of essential arbitrary constants: 2 (\\(A\\) and \\(B\\)).' },
            { text: 'Write the given general solution: \\(y = A e^{2x} + B e^{-3x}\\).' },
            { text: 'Differentiate once with respect to \\(x\\): \\(y\' = 2A e^{2x} - 3B e^{-3x}\\).' },
            { text: 'Differentiate again: \\(y\'\' = 4A e^{2x} + 9B e^{-3x}\\).' },
            { text: 'Eliminate \\(A\\) and \\(B\\). We have three equations:' },
            { text: 'Rearrange to standard form: \\(y\'\' + y\' - 6y = 0\\).', faded: true, blankAnswer: '\\(y\'\' + y\' - 6y = 0\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_006', title: 'Homogeneous Differential Equations: Solution',
          scaffold: { problem: '** A curve passes through the point \\((1, 2)\\). At any point \\((x, y)\\) on the curve, the slope of the tangent is given by \\(\\frac{x^2.',
            steps: [
            { text: 'Write the differential equation: \\(\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}\\).' },
            { text: 'Substitute \\(y = vx\\) ⇒ \\(\\frac{dy}{dx} = v + x\\frac{dv}{dx}\\).' },
            { text: 'Equate: \\(v + x\\frac{dv}{dx} = \\frac{1+v^2}{2v}\\). Subtract \\(v\\): \\(x\\frac{dv}{dx} = \\frac{1+v^2}{2v} -.' },
            { text: 'Separate variables: \\(\\frac{2v}{1 - v^2} dv = \\frac{dx}{x}\\).' },
            { text: 'Integrate both sides: \\(\\int \\frac{2v}{1 - v^2} dv = \\int \\frac{dx}{x}\\).' },
            { text: 'Substitute back \\(v = y/x\\): \\(x\\left(1 - \\frac{y^2}{x^2}\\right) = C_1\\) ⇒ \\(x \\cdot \\frac{x^2 - y^2}{x^2} = C_1\\) ⇒.' },
            { text: 'Use initial condition \\((1, 2)\\): \\(1^2 - 2^2 = C_1 \\cdot 1\\) ⇒ \\(1 - 4 = C_1\\) ⇒ \\(C_1 = -3\\).' },
            { text: 'Particular solution: \\(x^2 - y^2 = -3x\\) or \\(x^2 + 3x - y^2 = 0\\).', faded: true, blankAnswer: '** \\(x^2 + 3x - y^2 = 0\\) (or \\(y^2 = x^2 + 3x\\))' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_09_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate modelling a pendulum writes √(d²θ/dt²) + (dθ/dt)² = 0 and files it as \'order 2, degree 1 — the second derivative is to the first power.\'',
            decisions: [{ prompt: 'Is the degree call correct?', options: [
                { text: 'No — order 2 is right, but the degree isn\'t defined: the equation isn\'t a polynomial in its derivatives while √(θ″) is a fractional power; degree only exists when every derivative appears to whole-number powers.', outcome: 'The chapter\'s rule: degree is judged on the equation\'s given form — a radical on the highest derivative disqualifies it, even if squaring would later tidy it.' },
                { text: 'He\'s right — under the radical the second derivative has power one.', outcome: 'The radical wraps the derivative, so its actual exponent is ½, not 1; \'inside the root it\'s power one\' is exactly the misread the definition blocks.', reveals: 'under-radical-counts' },
                { text: 'Square the equation first, then read the degree — it becomes degree 1.', outcome: 'Degree is defined for the equation as given, not the polynomial you\'d get after manipulation; rewriting changes the object being classified.', reveals: 'manipulate-then-classify' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a differential equation\'s skeleton — derivative present, order named, ordinary versus partial sorted.',
            decisions: [{ prompt: 'What comes next? Differential Equations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Differential Equations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_09_001', difficulty: 'standard',
          question: 'A differential equation is an equation that involves an independent variable,.',
          hint: 'If stuck, revisit Class 11 Limits and Derivatives (nodes c11_math_cbse_13_006 through.',
          misconception: '**Misconception:** "The order of a differential equation is the highest power (exponent) of the derivative that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A differential equation is an equation that involves an independent variable, a dependent',
                  options: ['A differential equation is an equation that involves an independent variable, a dependent', 'The degree of a differential equation is the highest positive integral power of the', 'A **general solution** of an nth order ordinary differential equation is a relation', 'A differential equation is formed from a given general solution by differentiating the'],
                  hint: 'If stuck, revisit Class 11 Limits and Derivatives (nodes c11_math_cbse_13_006 through.',
                  misconception: '**Misconception:** "The order of a differential equation is the highest power (exponent) of the derivative that appears." **Exact wrong.' }
          ],
            remediations: { 'misconception-the-order-of-a': { steps: ['If a student confuses order with degree/exponent: 1.', 'Revisit **c11_math_cbse_13_006** (Derivatives: Intuitive Idea) and **c11_math_cbse_13_007** (Derivative of Polynomial.', 'Practice with a table: list each derivative in the equation, write its order (1, 2, 3...), then pick the maximum.', 'Do this for 5–10 equations until the distinction is automatic.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_002', difficulty: 'standard',
          question: 'The degree of a differential equation is the highest positive integral power.',
          hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order.',
          misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative.".',
          parts: [
                { id: 'a', prompt: 'State the degree of the differential equation: (d²y/dx²)³ + 2(dy/dx)² + 3y = 0. Is the degree defined? Justify in one sentence.', answer: 'The degree is 3',
                  options: ['The degree is 3', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example,.' },
                { id: 'b', prompt: 'Consider the differential equation: sin(dy/dx) + y = 0. A student claims the degree is 1 because dy/dx appears to the first power.', answer: 'The degree is NOT DEFINED',
                  options: ['The degree is NOT DEFINED', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example,.' },
                { id: 'c', prompt: 'Find the order and degree (if defined) of: (d³y/dx³)² + (d²y/dx²)³ + (dy/dx)⁴ + y⁵ = 0.', answer: 'Order = 3 (highest derivative is d³y/dx³)',
                  options: ['Order = 3 (highest derivative is d³y/dx³)', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example,.' },
                { id: 'd', prompt: 'Compare the degree of these two equations: (A) (d²y/dx²) + (dy/dx)² = 0 and (B) √(d²y/dx²) + (dy/dx)² = 0. Are they the same? Why or why not?', answer: 'Equation (A) has degree 1 (polynomial in y\'\')',
                  options: ['Equation (A) has degree 1 (polynomial in y\'\')', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example,.' }
          ],
            remediations: { 'students-consistently-confuse-highest-power': { steps: ['If a student cannot correctly identify degree: (1) Revisit c12_math_cbse_09_001 to ensure order identification is solid.', '(2) Practice the "Polynomial Check" algorithm: List every derivative term; ask: "Is this term a constant times.', '(3) Do 5 targeted exercises from Exercise 9.1 (Q1, Q4, Q6, Q9, Q11) writing the justification for each.', '(4) Re-diagnostic: Give the equation (d³y/dx³)² + sin(d²y/dx²) + y = 0 and ask for order and degree with justification.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative.".',
          parts: [
                { id: 'a', prompt: 'A student solves Exercise 9.1 Q11: "The degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0 is (A) 3 (B) 2 (C) 1 (D) not defined.".', answer: 'not defined." They choose (',
                  options: ['not defined." They choose (', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example,.' },
                { id: 'b', prompt: 'Construct a differential equation of order 2 and degree 3 that is a polynomial in derivatives.', answer: 'Example of order 2, degree 3: (d²y/dx²)³ + x(dy/dx) + y = 0',
                  options: ['Example of order 2, degree 3: (d²y/dx²)³ + x(dy/dx) + y = 0', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order of.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example,.' }
          ],
            remediations: { 'students-consistently-confuse-highest-power': { steps: ['If a student cannot correctly identify degree: (1) Revisit c12_math_cbse_09_001 to ensure order identification is solid.', '(2) Practice the "Polynomial Check" algorithm: List every derivative term; ask: "Is this term a constant times.', '(3) Do 5 targeted exercises from Exercise 9.1 (Q1, Q4, Q6, Q9, Q11) writing the justification for each.', '(4) Re-diagnostic: Give the equation (d³y/dx³)² + sin(d²y/dx²) + y = 0 and ask for order and degree with justification.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_003', difficulty: 'standard',
          question: 'A **general solution** of an nth order ordinary differential equation is.',
          hint: 'If stuck on differentiation during verification, immediately review Class 11 derivative.',
          misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:**.',
          parts: [
                { id: 'a', prompt: 'A student claims that y = x² + 5 is the general solution of dy/dx = 2x because it satisfies the equation. Is the student correct? Explain why or why not.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'a solution that works'],
                  hint: 'If stuck on differentiation during verification, immediately review Class 11 derivative rules.',
                  misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:** Students often verify.' },
                { id: 'b', prompt: 'Consider the differential equation d²y/dx² + y = 0. Two students propose solutions: Student A: y = 3 cos x + 4 sin x Student B: y = 5 cos(x + π/6) Are both.', answer: 'Both are **solutions** (substitution verifies each)',
                  options: ['Both are **solutions** (substitution verifies each)', 'a solution', 'the general solution'],
                  hint: 'If stuck on differentiation during verification, immediately review Class 11 derivative rules.',
                  misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:** Students often verify.' }
          ],
            remediations: { 'misconception-any-function-that-satisfies': { steps: ['If a student cannot distinguish general vs particular solutions: 1.', 'Revisit **c12_math_cbse_09_001** (Order of a DE) — confirm they can identify the order correctly.', 'Revisit **c11_math_cbse_13_007** (Derivative of Polynomial Functions) and **c11_math_cbse_13_009** (Algebra.', 'Do a focused re-diagnostic: Give the DE d²y/dx² = 0 and ask: "Write the general solution.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_004', difficulty: 'standard',
          question: 'A differential equation is formed from a given general solution.',
          hint: 'If stuck, revisit Class 11 differentiation rules (c11_math_cbse_13_007.',
          misconception: 'Students often treat **all** constants appearing in the general solution as essential.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A differential equation is formed from a given general solution by differentiating the',
                  options: ['A differential equation is formed from a given general solution by differentiating the', 'A differential equation is an equation that involves an independent variable, a dependent', 'The degree of a differential equation is the highest positive integral power of the', 'A **general solution** of an nth order ordinary differential equation is a relation'],
                  hint: 'If stuck, revisit Class 11 differentiation rules (c11_math_cbse_13_007, c11_math_cbse_13_009) and.',
                  misconception: 'Students often treat **all** constants appearing in the general solution as essential.' }
          ],
            remediations: { 'students-often-treat-all-constants': { steps: ['If a student cannot form the differential equation: 1.', '**Check constant count:** Ask "How many *independent* parameters does this family have?', 'Can any be combined or removed?" (Revisit c12_math_cbse_09_003: General and Particular Solutions).', '**Review differentiation rules:** Ensure they can differentiate products, chains, and implicit forms (Revisit.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_005', difficulty: 'standard',
          question: 'A first-order first-degree differential equation is said to be of **variable.',
          hint: 'If stuck, revisit Class 12 Indefinite Integrals (integration by substitution, partial.',
          misconception: '**Misconception**: “When separating variables, I can always cross-multiply \\(dy\\) and \\(dx\\) as if they are numbers,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A first-order first-degree differential equation is said to be of **variable separable',
                  options: ['A first-order first-degree differential equation is said to be of **variable separable', 'A differential equation is an equation that involves an independent variable, a dependent', 'The degree of a differential equation is the highest positive integral power of the', 'A **general solution** of an nth order ordinary differential equation is a relation'],
                  hint: 'If stuck, revisit Class 12 Indefinite Integrals (integration by substitution, partial fractions).',
                  misconception: '**Misconception**: “When separating variables, I can always cross-multiply \\(dy\\) and \\(dx\\) as if they are numbers, so \\(\\frac{dy}{dx}.' }
          ],
            remediations: { 'misconception-when-separating-variables': { steps: ['If a student consistently mis-separates variables (e.g., puts \\(y\\)-terms in the wrong side, drops \\(dy/dx\\),.', '**Revisit the chain rule justification**: Show that \\(\\int \\frac{1}{h(y)} \\frac{dy}{dx} dx = \\int \\frac{1}{h(y)} dy\\).', 'Use a simple example: \\(\\frac{dy}{dx} = 2x y\\).', 'Write \\(\\frac{1}{y} \\frac{dy}{dx} = 2x\\), then integrate both sides w.r.t \\(x\\): \\(\\int \\frac{1}{y} \\frac{dy}{dx}.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_006', difficulty: 'standard',
          question: 'A first-order, first-degree differential equation of the form \\(\\frac{dy}{dx}.',
          hint: 'If stuck on the substitution step, immediately review **c11_math_cbse_13_009** (Product.',
          misconception: '**Misconception:** "After substituting \\(y = vx\\), the derivative is \\(\\frac{dy}{dx} = v\\) (forgetting the product rule.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** The differential equation \\(\\frac{dy}{dx} = \\frac{x^2 + y^2}{xy}\\) is homogeneous.', answer: 'Because \\(F(x, y) = \\frac{x^2 + y^2}{xy}\\) satisfies \\(F(\\lambda x, \\lambda y) =',
                  options: ['Because \\(F(x, y) = \\frac{x^2 + y^2}{xy}\\) satisfies \\(F(\\lambda x, \\lambda y) =', 'we substitute to make it linear', 'we substitute to remove \\(y\\)'],
                  hint: 'If stuck on the substitution step, immediately review **c11_math_cbse_13_009** (Product Rule) and.',
                  misconception: '**Misconception:** "After substituting \\(y = vx\\), the derivative is \\(\\frac{dy}{dx} = v\\) (forgetting the product rule term.' }
          ],
            remediations: { 'misconception-after-substituting-y-vx': { steps: ['**Revisit product rule differentiation:** Go to **c11_math_cbse_13_009** (Algebra of Derivatives: Sum, Difference.', '**Re-do the substitution step slowly:** For a simple homogeneous DE (e.g., \\(\\frac{dy}{dx} = \\frac{y}{x}\\)), write \\(y.', 'Say aloud: "\\(v\\) is a function of \\(x\\), so I must use the product rule." 3.', '**Re-diagnostic:** Solve \\(\\frac{dy}{dx} = \\frac{x+y}{x-y}\\) from scratch, showing the product rule step.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
