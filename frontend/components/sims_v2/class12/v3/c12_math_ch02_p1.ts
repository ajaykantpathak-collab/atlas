import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch02_p1: SimDef = {
    id: 'v3_c12_math_ch02_p1',
    title: 'Inverse Trigonometric Functions · Part 1/2',
    subtitle: 'Infinitely many angles — the branch picks one',
    classLevel: 12, subject: 'mathematics', topic: 'Inverse Trigonometric Functions · Part 1/2',
    chapters: ['c12_math_ch02'],
    nodeIds: ['c12_math_cbse_02_001', 'c12_math_cbse_02_002', 'c12_math_cbse_02_003', 'c12_math_cbse_02_004', 'c12_math_cbse_02_005', 'c12_math_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Function restrictor', intro: 'Every trig ratio hides infinitely many angles; the principal branch is the rule that chooses exactly one.', goal: 'Master principal value branches — why restriction creates inverses and where each function\'s answer must live.' },
    discovery: {
        question: '\'The angle whose tangent is 1/12\' has infinitely many answers — yet the ramp engineer needs exactly one. How do we force uniqueness?',
        options: ['Restrict the domain — chop sine, cosine, tangent to intervals where they\'re one-to-one, so each ratio maps to a single principal-value angle', 'Round the answer — take whichever decimal fits the drawing', 'Convert to degrees — one fixed unit system removes the ambiguity', 'Take the smallest positive angle — the principal value is just convention'],
        answer: 'Restrict the domain — chop sine, cosine, tangent to intervals where they\'re one-to-one, so each ratio maps to a single principal-value angle',
        hook: 'The inverse\'s domain is the original\'s range and vice versa — that\'s why sec⁻¹ refuses |x|<1: sec never lands there. And tan⁻¹(−√3) is −π/3, not 2π/3: the answer must live inside the branch, not just satisfy the equation.',
    },
    teaching: [
        { title: 'Inverse Trigonometric Functions: Domain and Range', text: 'The inverse trigonometric functions are defined by restricting the domains of the standard trigonometric functions to intervals where they become bijective (one‑one and onto).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_02_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Lock each inverse to its branch: state all six domain-range pairs, compute principal values by asking which in-branch angle fits, and explain why sine and cosine picked different windows.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'case', nodeId: 'c12_math_cbse_02_001', title: 'Inverse Trigonometric Functions: Domain and Range',
          caseStudy: { intro: 'Imagine a civil engineer designing a wheelchair ramp: the slope ratio (rise/run) is fixed at 1:12 for safety.',
            decisions: [{ prompt: 'State the domain and range of the principal value branch of \\( \\cos^{-1} x \\).', options: [
                { text: 'Domain: \\([-1, 1]\\)', outcome: 'Domain: \\([-1, 1]\\); Range: \\([0, \\pi]\\). A wrong answer (e.g., range \\( [-\\pi/2, \\pi/2] \\).' },
                { text: 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)', outcome: 'Not quite — **Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1}.', reveals: 'notation-confusion-many-students-write' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_002', title: 'Principal Value Branches of Inverse Functions',
          scaffold: { problem: 'A surveyor in Jaipur measures the angle of elevation to the top of a historical minaret. The sine of the angle is found to be 1/2.',
            steps: [
            { text: 'Identify the given information: sin θ = 1/2, and we need θ in the principal range of sin⁻¹ which is [–π/2, π/2].' },
            { text: 'Recall standard angles: sin(π/6) = 1/2, sin(5π/6) = 1/2, sin(–7π/6) = 1/2, etc.' },
            { text: 'Check which of these angles lies in the principal range [–π/2, π/2]. π/6 ≈ 0.52 rad is in [–π/2, π/2].' },
            { text: 'Therefore, the principal value is sin⁻¹(1/2) = π/6.' },
            { text: 'Convert to degrees for the clinometer display: π/6 rad = 30°. The clinometer shows 30°.', faded: true, blankAnswer: 'π/6 radians or 30°' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_003', title: 'Properties of Inverse Trigonometric Functions',
          scaffold: { problem: 'Find the principal value of \\( \\tan^{-1}(\\tan \\frac{7\\pi}{6}) \\).',
            steps: [
            { text: 'Identify the given angle \\( \\frac{7\\pi}{6} \\) and the principal range of \\( \\tan^{-1} \\), which is \\( (-\\frac{\\pi}{2}.' },
            { text: 'Check if \\( \\frac{7\\pi}{6} \\) lies in \\( (-\\frac{\\pi}{2}, \\frac{\\pi}{2}) \\).' },
            { text: 'Use the periodicity of tangent: \\( \\tan(\\pi + \\theta) = \\tan\\theta \\).' },
            { text: 'Now \\( \\frac{\\pi}{6} \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2}) \\), so \\( \\tan^{-1}(\\tan \\frac{7\\pi}{6}) = \\tan^{-1}(\\tan.' },
            { text: 'Verify: \\( \\frac{\\pi}{6} \\) is in the principal range, and \\( \\tan \\frac{\\pi}{6} = \\frac{1}{\\sqrt{3}} = \\tan.', faded: true, blankAnswer: '\\( \\frac{\\pi}{6} \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_004', title: 'sin^-1 + cos^-1 = pi/2 Identity',
          scaffold: { problem: '** Prove that $\\sin^{-1}\\left(\\frac{3}{5}\\right) + \\cos^{-1}\\left(\\frac{3}{5}\\right) = \\frac{\\pi}{2}$ by explicitly computing each term.',
            steps: [
            { text: 'Check domain: $x = \\frac{3}{5} \\in [-1, 1]$, so both $\\sin^{-1}\\frac{3}{5}$ and $\\cos^{-1}\\frac{3}{5}$ are defined.' },
            { text: 'Let $\\alpha = \\sin^{-1}\\frac{3}{5}$. By definition, $\\sin\\alpha = \\frac{3}{5}$ and $\\alpha \\in [-\\frac{\\pi}{2}.' },
            { text: 'Construct a right triangle with opposite side 3, hypotenuse 5. Adjacent side $= \\sqrt{5^2 - 3^2} = 4$.' },
            { text: 'Now $\\cos^{-1}\\frac{3}{5}$ is an angle $\\beta \\in [0, \\pi]$ such that $\\cos\\beta = \\frac{3}{5}$.' },
            { text: 'In the same triangle, $\\sin\\beta = \\frac{4}{5}$. Notice $\\alpha + \\beta = \\frac{\\pi}{2}$ because they are the two acute.', faded: true, blankAnswer: '** $\\frac{\\pi}{2}$ (verified)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_005', title: 'tan^-1 + tan^-1 Addition Formula',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a tower from two points A and B on the ground, 20 m apart in a straight line.',
            steps: [
            { text: 'Let the height of the tower be h metres, and distance from B to tower base be d metres.' },
            { text: 'From point A (20 m further back): distance = d + 20 = 2h + 20. tan(tan⁻¹(1/3)) = h/(2h+20) ⇒ 1/3 = h/(2h+20).' },
            { text: 'Solve for h: 2h + 20 = 3h ⇒ h = 20 m. (Direct solution without addition formula)' },
            { text: 'Alternative method using addition formula: Total angle from A to top via B is tan⁻¹(1/3) + tan⁻¹(1/2).' },
            { text: 'So combined angle = π/4. Then tan(π/4) = h/(d+20) = h/(2h+20) = 1 ⇒ h = 2h+20? Wait — this gives h = -20, impossible.' },
            { text: 'The addition formula is actually used when we have angles from the SAME point, e.g., if a person at A sees the top.', faded: true, blankAnswer: 'Height = 20 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_006', title: '2tan^-1 x = sin^-1(2x/(1+x^2)) Identity',
          scaffold: { problem: 'A surveyor standing at point $A$ measures the angle of elevation to the top of a tower as $\\tan^{-1}\\frac{3}{4}$.',
            steps: [
            { text: 'Let the original angle of elevation be $\\theta = \\tan^{-1}\\frac{3}{4}$. Then $\\tan\\theta = \\frac{3}{4}$.' },
            { text: 'The new angle of elevation is $2\\theta$. We need to find the horizontal distance $d$ from point $B$ to the tower foot.' },
            { text: 'Instead of computing $\\tan(2\\theta)$ directly, use the given identity: $2\\theta = 2\\tan^{-1}\\frac{3}{4}.' },
            { text: 'Simplify the argument: $\\frac{2 \\times \\frac{3}{4}}{1 + \\frac{9}{16}} = \\frac{\\frac{3}{2}}{\\frac{25}{16}} = \\frac{3}{2}.' },
            { text: 'In the right triangle at $B$, $\\sin(2\\theta) = \\frac{30}{\\sqrt{30^2 + d^2}}$. But $\\sin(2\\theta) = \\frac{24}{25}$.' },
            { text: 'Cross-multiply: $30 \\times 25 = 24 \\sqrt{900 + d^2} \\implies 750 = 24 \\sqrt{900 + d^2} \\implies \\sqrt{900 + d^2}.' },
            { text: 'Square both sides: $900 + d^2 = \\frac{15625}{16} \\implies d^2 = \\frac{15625}{16} - \\frac{14400}{16} = \\frac{1225}{16}.', faded: true, blankAnswer: '8.75 m' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_02_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A robotics intern feeds a motor the command \'rotate to arcsin(0.5)\' — the sensor measured sin θ = 0.5 at 150°, and the code returns the angle straight from the arcsin library. The panel stops at 30°, not 150°.',
            decisions: [{ prompt: 'Did the library malfunction?', options: [
                { text: 'No — arcsin only ever answers inside its principal branch [−π/2, π/2]; infinitely many angles share sine 0.5 and the function returns the one in-branch, 30°; if the mount needs 150°, the code must add the quadrant logic itself.', outcome: 'The chapter\'s rule: the inverse isn\'t \'cancel sine\' — it\'s \'give the standard angle\'; outside the branch, sin⁻¹(sin x) returns a different angle than x.' },
                { text: 'Yes — arcsin(sin 150°) must return 150°, so the library has a rounding bug.', outcome: 'That\'s the classic cancellation error: sin⁻¹(sin x) = x only holds when x already sits in the principal range; 150° doesn\'t, so 30° is the specified-correct output.', reveals: 'inverse-always-cancels' },
                { text: 'Switch to arccos — it covers 0°–180° and will return 150° for this measurement.', outcome: 'Changing the function changes the question: arccos answers for cosine input, and feeding it a sine value hands back an angle for a different measurement; the fix is quadrant logic on arcsin\'s branch, not a different inverse.', reveals: 'swap-function-equals-fix' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see inverse trig as engineered uniqueness — where the branch interval is the whole point.',
            decisions: [{ prompt: 'What comes next? Inverse Trigonometric Functions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Inverse Trigonometric Functions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_02_001', difficulty: 'standard',
          question: 'The inverse trigonometric functions are defined by restricting the domains.',
          hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and.',
          misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x}.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the principal value branch of \\( \\cos^{-1} x \\).', answer: 'Domain: \\([-1, 1]\\)',
                  options: ['Domain: \\([-1, 1]\\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and the.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' },
                { id: 'b', prompt: 'Why is the domain of \\( \\sec^{-1} x \\) given as \\( \\mathbb{R} \\setminus (-1, 1) \\) (i.e., \\( x \\le -1 \\) or \\( x \\ge 1 \\))?', answer: 'The secant function is \\( \\sec y = 1/\\cos y \\)',
                  options: ['The secant function is \\( \\sec y = 1/\\cos y \\)', 'domain is all real numbers', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and the.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' },
                { id: 'c', prompt: 'Find the principal value of \\( \\tan^{-1}(-\\sqrt{3}) \\).', answer: 'We need \\( \\theta \\in (-\\pi/2, \\pi/2) \\) such that \\( \\tan \\theta = -\\sqrt{3} \\)',
                  options: ['We need \\( \\theta \\in (-\\pi/2, \\pi/2) \\) such that \\( \\tan \\theta = -\\sqrt{3} \\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and the.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' },
                { id: 'd', prompt: 'Compare the ranges of \\( \\sin^{-1} x \\) and \\( \\cos^{-1} x \\). Why are they different even though both have the same domain \\([-1, 1]\\)?', answer: '\\( \\sin^{-1} x \\) has range \\( [-\\pi/2, \\pi/2] \\)',
                  options: ['\\( \\sin^{-1} x \\) has range \\( [-\\pi/2, \\pi/2] \\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and the.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' }
          ],
            remediations: { 'notation-confusion-many-students-write': { steps: ['Re‑visit the definition of inverse functions from Class 11 (node `c11_math_cbse_02_005`): if \\( f \\) is bijective, \\.', 'Emphasise that \\( f^{-1} \\) is a function, not a reciprocal.', 'Contrast \\( \\sin^{-1} x \\) and \\( (\\sin x)^{-1} \\) with a concrete example: \\( \\sin^{-1}(0.5) = \\pi/6 \\approx 0.524 \\).', 'They are different numbers.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x}.',
          parts: [
                { id: 'a', prompt: 'A student writes: “The principal value of \\( \\cosec^{-1}(-2) \\) is \\( -\\pi/6 \\).” Evaluate this statement and correct it if necessary.', answer: 'The range of \\( \\cosec^{-1} \\) is \\( [-\\pi/2, \\pi/2] \\setminus \\{0\\} \\)',
                  options: ['The range of \\( \\cosec^{-1} \\) is \\( [-\\pi/2, \\pi/2] \\setminus \\{0\\} \\)', 'range of cosec inverse is \\( [0, \\pi] \\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and the.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' }
          ],
            remediations: { 'notation-confusion-many-students-write': { steps: ['Re‑visit the definition of inverse functions from Class 11 (node `c11_math_cbse_02_005`): if \\( f \\) is bijective, \\.', 'Emphasise that \\( f^{-1} \\) is a function, not a reciprocal.', 'Contrast \\( \\sin^{-1} x \\) and \\( (\\sin x)^{-1} \\) with a concrete example: \\( \\sin^{-1}(0.5) = \\pi/6 \\approx 0.524 \\).', 'They are different numbers.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_002', difficulty: 'standard',
          question: 'The principal value branch of an inverse trigonometric function is the specific.',
          hint: 'If stuck, immediately revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions.',
          misconception: 'Students consistently treat sin⁻¹(sin x) = x as universally true, ignoring the condition that x must lie in [–π/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The principal value branch of an inverse trigonometric function is the specific interval',
                  options: ['The principal value branch of an inverse trigonometric function is the specific interval', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The properties of inverse trigonometric functions are a set of identities that relate', 'The identity $\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ holds for every $x$ in the common'],
                  hint: 'If stuck, immediately revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants).',
                  misconception: 'Students consistently treat sin⁻¹(sin x) = x as universally true, ignoring the condition that x must lie in [–π/2, π/2].' }
          ],
            remediations: { 'students-consistently-treat-sin-sin': { steps: ['If a student cannot correctly identify principal value ranges or apply the cancellation property with domain.', '(2) Practice 5 problems of the type sin⁻¹(sin x) where x is outside [–π/2, π/2], forcing them to: (a) state the.', 'to find equivalent angle in range, (d) evaluate.', '(3) Revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants) to reinforce which quadrants correspond.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_003', difficulty: 'standard',
          question: 'The properties of inverse trigonometric functions are a set of identities that.',
          hint: 'If stuck, immediately revisit c12_math_cbse_02_001 and c12_math_cbse_02_002 and write the.',
          misconception: '**Misconception:** "\\( \\sin^{-1}(\\sin x) = x \\) for all real \\( x \\)." **Exact wrong step:** A student evaluates \\.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The properties of inverse trigonometric functions are a set of identities that relate',
                  options: ['The properties of inverse trigonometric functions are a set of identities that relate', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The principal value branch of an inverse trigonometric function is the specific interval', 'The identity $\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ holds for every $x$ in the common'],
                  hint: 'If stuck, immediately revisit c12_math_cbse_02_001 and c12_math_cbse_02_002 and write the.',
                  misconception: '**Misconception:** "\\( \\sin^{-1}(\\sin x) = x \\) for all real \\( x \\)." **Exact wrong step:** A student evaluates \\( \\sin^{-1}(\\sin.' }
          ],
            remediations: { 'misconception-sin-1-sin-x': { steps: ['Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value Branches).', 'Write down the domain and range of all six inverse functions from memory.', 'For each property (e.g., \\( \\sin^{-1}(\\sin x) = x \\)), write the **exact condition** on \\( x \\) (e.g., \\( x \\in.', 'Do a re-diagnostic: Evaluate \\( \\cos^{-1}(\\cos \\frac{4\\pi}{3}) \\) and \\( \\tan^{-1}(\\tan \\frac{5\\pi}{6}) \\) correctly.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_004', difficulty: 'standard',
          question: 'The identity $\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ holds for every $x$.',
          hint: 'If stuck, immediately revisit **c12_math_cbse_02_002** (Principal Value Branches) and.',
          misconception: '**Misconception:** "$\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ for all real $x$ because $\\sin$ and $\\cos$ are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The identity $\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ holds for every $x$ in the common',
                  options: ['The identity $\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ holds for every $x$ in the common', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The principal value branch of an inverse trigonometric function is the specific interval', 'The properties of inverse trigonometric functions are a set of identities that relate'],
                  hint: 'If stuck, immediately revisit **c12_math_cbse_02_002** (Principal Value Branches) and draw the.',
                  misconception: '**Misconception:** "$\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ for all real $x$ because $\\sin$ and $\\cos$ are co-functions." **Exact wrong.' }
          ],
            remediations: { 'misconception-sin-1-x-cos': { steps: ['Revisit **c12_math_cbse_02_001** (Domain and Range) — confirm that $\\sin^{-1}x$ and $\\cos^{-1}x$ exist **only** for $x.', 'Write the domain in bold on a flashcard.', 'Revisit **c10_math_cbse_08_009** (Complementary Angle Relations) — re-prove $\\sin(90^\\circ - \\theta) = \\cos\\theta$.', 'Then do: "If $\\sin\\theta = x$, then $\\theta = \\sin^{-1}x$.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_005', difficulty: 'standard',
          question: 'The addition formula for inverse tangent states that for real numbers x and.',
          hint: 'Revisit c11_math_cbse_03_009 (Sum and Difference Formulas) to re-derive tan(A+B), and.',
          misconception: 'Students blindly apply tan⁻¹x + tan⁻¹y = tan⁻¹((x+y)/(1-xy)) for ALL x,y without checking the condition xy < 1.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The addition formula for inverse tangent states that for real numbers x and y, tan⁻¹x +',
                  options: ['The addition formula for inverse tangent states that for real numbers x and y, tan⁻¹x +', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The principal value branch of an inverse trigonometric function is the specific interval', 'The properties of inverse trigonometric functions are a set of identities that relate'],
                  hint: 'Revisit c11_math_cbse_03_009 (Sum and Difference Formulas) to re-derive tan(A+B), and.',
                  misconception: 'Students blindly apply tan⁻¹x + tan⁻¹y = tan⁻¹((x+y)/(1-xy)) for ALL x,y without checking the condition xy < 1.' }
          ],
            remediations: { 'students-blindly-apply-tan-x': { steps: ['If a student makes this error, immediately have them: (1) Draw the graph of y = tan⁻¹x and mark points for x=2, y=3 and.', '(2) Calculate approximate angles: tan⁻¹2 ≈ 63.4°, tan⁻¹3 ≈ 71.6°, sum ≈ 135° = 3π/4.', '(3) Compute formula without adjustment: tan⁻¹(-1) = -45°.', '(4) Ask: "How do we get from -45° to 135°?" (Add 180° = π).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_006', difficulty: 'standard',
          question: 'The identity $2\\tan^{-1}x = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right)$ holds for.',
          hint: 'Revisit Class 11 node c11_math_cbse_03_010 (double-angle formulas) and Class 12 node.',
          misconception: 'Students believe the identity $2\\tan^{-1}x = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right)$ holds for all real $x$ because the.',
          parts: [
                { id: 'a', prompt: 'State the exact domain of $x$ for which the identity $2\\tan^{-1}x = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right)$ is valid, and write the principal value range.', answer: 'The identity holds for $x \\in [-1, 1]$',
                  options: ['The identity holds for $x \\in [-1, 1]$', 'domain as $\\mathbb{R}$ or range as $[-\\pi, \\pi]$'],
                  hint: 'Revisit Class 11 node c11_math_cbse_03_010 (double-angle formulas) and Class 12 node.',
                  misconception: 'Students believe the identity $2\\tan^{-1}x = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right)$ holds for all real $x$ because the algebraic.' }
          ],
            remediations: { 'the-identity-2-tan-1': { steps: ['If a student cannot correctly state the domain restriction or applies the identity outside $[-1, 1]$: 1.', 'Make them compute $\\tan^{-1}2$ and $\\tan^{-1}(-2)$ on a calculator, then multiply by 2, and compare with.', 'Have them plot $y = 2\\tan^{-1}x$ and $y = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right)$ on the same axes for $x \\in [-3, 3]$.', 'Ask them to identify the exact $x$-intervals where the graphs coincide and where they diverge.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
