import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch02_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch02_p2: SimDef = {
    id: 'v3_c12_math_ch02_p2',
    title: 'Inverse Trigonometric Functions · Part 2/2',
    subtitle: 'Infinitely many angles — the branch picks one',
    classLevel: 12, subject: 'mathematics', topic: 'Inverse Trigonometric Functions · Part 2/2',
    chapters: ['c12_math_ch02'],
    nodeIds: ['c12_math_cbse_02_007', 'c12_math_cbse_02_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Function restrictor', intro: 'Every trig ratio hides infinitely many angles; the principal branch is the rule that chooses exactly one.', goal: 'Master principal value branches — why restriction creates inverses and where each function\'s answer must live.' },
    discovery: {
        question: '\'The angle whose tangent is 1/12\' has infinitely many answers — yet the ramp engineer needs exactly one. How do we force uniqueness?',
        options: ['Restrict the domain — chop sine, cosine, tangent to intervals where they\'re one-to-one, so each ratio maps to a single principal-value angle', 'Round the answer', 'Use degrees', 'Pick the smallest'],
        answer: 'Restrict the domain — chop sine, cosine, tangent to intervals where they\'re one-to-one, so each ratio maps to a single principal-value angle',
        hook: 'The inverse\'s domain is the original\'s range and vice versa — that\'s why sec⁻¹ refuses |x|<1: sec never lands there. And tan⁻¹(−√3) is −π/3, not 2π/3: the answer must live inside the branch, not just satisfy the equation.',
    },
    teaching: [
        { title: 'Simplifying Expressions Using Inverse Trigonometric Identities', text: 'Simplifying expressions using inverse trigonometric identities means rewriting complex inverse trigonometric expressions (involving compositions like $\\tan^{-1}(\\sqrt{\\frac{1-x}{1+x}})$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_02_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Lock each inverse to its branch: state all six domain-range pairs, compute principal values by asking which in-branch angle fits, and explain why sine and cosine picked different windows.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_007', title: 'Simplifying Expressions Using Inverse Trigonometric Identities',
          scaffold: { problem: '** A satellite dish has a parabolic cross-section. The angle $\\theta$ between the axis and the line from focus to rim is given by $\\theta.',
            steps: [
            { text: 'Identify the algebraic form $\\sqrt{\\frac{f-D}{f+D}} = \\sqrt{\\frac{1 - \\frac{D}{f}}{1 + \\frac{D}{f}}}$.' },
            { text: 'Recognize the standard pattern $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$.' },
            { text: 'Then $\\sqrt{\\frac{1-x}{1+x}} = \\sqrt{\\frac{1-\\cos\\alpha}{1+\\cos\\alpha}}.' },
            { text: '$\\tan^{-1}\\left(\\tan\\frac{\\alpha}{2}\\right) = \\frac{\\alpha}{2}$ because $\\frac{\\alpha}{2} \\in [0, \\frac{\\pi}{2}).' },
            { text: 'Since $x = \\cos\\alpha = \\frac{5}{12}$, $\\alpha = \\cos^{-1}\\frac{5}{12}$.' },
            { text: 'Compute numerically: $\\cos^{-1}\\frac{5}{12} \\approx 1.148$ rad $\\approx 65.77^\\circ$. $\\theta \\approx 32.89^\\circ$.', faded: true, blankAnswer: '** $\\theta = \\frac{1}{2}\\cos^{-1}\\frac{5}{12} \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_008', title: 'Word Problems: Applications of Inverse Trigonometric Functions',
          scaffold: { problem: 'A 15 m long ladder leans against a vertical wall. The foot of the ladder is 9 m away from the wall.',
            steps: [
            { text: 'Draw a right triangle. The ladder is the hypotenuse (15 m). The distance from the wall is the adjacent side (9 m).' },
            { text: 'Identify the known sides relative to θ: adjacent = 9, hypotenuse = 15.' },
            { text: 'Apply inverse cosine: θ = cos⁻¹(3/5). Since θ is an angle of elevation (ladder with ground), it must be in [0, π/2].' },
            { text: 'Find height h using sine or Pythagoras. sin θ = h/15 → h = 15 sin θ.' },
            { text: 'Verify: cos θ = 9/15 = 0.6, θ ≈ 53.13° is acute, height 12 m is positive and less than ladder length.', faded: true, blankAnswer: 'Angle with ground = cos⁻¹(3/5) ≈ 53.13° (or 0.927 rad).' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_02_008', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A robotics intern feeds a motor the command \'rotate to arcsin(0.5)\' — the sensor measured sin θ = 0.5 at 150°, and the code returns the angle straight from the arcsin library. The panel stops at 30°, not 150°.',
            decisions: [{ prompt: 'Did the library malfunction?', options: [
                { text: 'No — arcsin only ever answers inside its principal branch [−π/2, π/2]; infinitely many angles share sine 0.5 and the function returns the one in-branch, 30°; if the mount needs 150°, the code must add the quadrant logic itself.', outcome: 'The chapter\'s rule: the inverse isn\'t \'cancel sine\' — it\'s \'give the standard angle\'; outside the branch, sin⁻¹(sin x) returns a different angle than x.' },
                { text: 'Yes — arcsin(sin 150°) must return 150°, so the library has a rounding bug.', outcome: 'That\'s the classic cancellation error: sin⁻¹(sin x) = x only holds when x already sits in the principal range; 150° doesn\'t, so 30° is the specified-correct output.', reveals: 'inverse-always-cancels' },
                { text: 'Switch to arccos — it covers 0°–180° and will return 150° for this measurement.', outcome: 'Changing the function changes the question: arccos answers for cosine input, and feeding it a sine value hands back an angle for a different measurement; the fix is quadrant logic on arcsin\'s branch, not a different inverse.', reveals: 'swap-function-equals-fix' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_02_008', title: 'You made it',
          caseStudy: { intro: 'You can now see inverse trig as engineered uniqueness — where the branch interval is the whole point.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_02_007', difficulty: 'standard',
          question: 'Simplifying expressions using inverse trigonometric identities means rewriting.',
          hint: 'If stuck, immediately revisit Class 11 trigonometric identities (c11_math_cbse_03_008.',
          misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta).',
          parts: [
                { id: 'a', prompt: 'A student simplifies $\\tan^{-1}\\left(\\sqrt{\\frac{1-\\cos x}{1+\\cos x}}\\right)$ directly to $\\frac{x}{2}$ without any condition on $x$.', answer: 'Correct explanation: $\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} =',
                  options: ['Correct explanation: $\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} =', 'it\'s always $\\frac{x}{2}$', 'domain of cos is all reals so it\'s fine'],
                  hint: 'If stuck, immediately revisit Class 11 trigonometric identities (c11_math_cbse_03_008.',
                  misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) = \\theta$.' },
                { id: 'b', prompt: 'Compare the two simplifications: (A) $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$ using $x = \\cos\\theta$ (B) $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$ using $x = \\sin\\theta$.', answer: 'Correct analysis: (A) With $x = \\cos\\theta$, $\\theta = \\cos^{-1}x \\in [0, \\pi]$',
                  options: ['Correct analysis: (A) With $x = \\cos\\theta$, $\\theta = \\cos^{-1}x \\in [0, \\pi]$', 'both are fine', 'sine is easier'],
                  hint: 'If stuck, immediately revisit Class 11 trigonometric identities (c11_math_cbse_03_008.',
                  misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) = \\theta$.' }
          ],
            remediations: { 'the-range-ignorance-error-students': { steps: ['**Targeted remediation for Range Ignorance:** 1.', '**Immediate review:** Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value.', 'Write out the principal range of each inverse function on a reference card: $\\sin^{-1}: [-\\frac{\\pi}{2}.', '**Drill 5 "trap" problems** where the simplified angle falls outside the principal range.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_008', difficulty: 'standard',
          question: 'Word problems involving inverse trigonometric functions require translating.',
          hint: 'If stuck, immediately review c12_math_cbse_02_001 (domain/range table) and.',
          misconception: 'Students often treat inverse trigonometric functions as multi-valued (e.g., writing sin⁻¹(1/2) = 30°, 150°, 390°, …).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems involving inverse trigonometric functions require translating real-world',
                  options: ['Word problems involving inverse trigonometric functions require translating real-world', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The principal value branch of an inverse trigonometric function is the specific interval', 'The properties of inverse trigonometric functions are a set of identities that relate'],
                  hint: 'If stuck, immediately review c12_math_cbse_02_001 (domain/range table) and c12_math_cbse_02_003.',
                  misconception: 'Students often treat inverse trigonometric functions as multi-valued (e.g., writing sin⁻¹(1/2) = 30°, 150°, 390°, …) instead.' }
          ],
            remediations: { 'students-often-treat-inverse-trigonometric': { steps: ['If a student makes the above errors: (1) Have them revisit c12_math_cbse_02_001 (Domain and Range) and.', '(2) Practice drawing and labelling right triangles for 10 word problems, explicitly writing "opposite", "adjacent".', '(3) Solve 5 problems where the computed ratio is deliberately >1 to recognize impossible triangles.', '(4) Re-attempt a diagnostic question like Q4 or Q5 and explain in words why the principal value is the only valid.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
