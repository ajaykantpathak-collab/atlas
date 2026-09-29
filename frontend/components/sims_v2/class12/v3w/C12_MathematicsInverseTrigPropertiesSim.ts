import type { SimDef } from '../../engine/types';
import C12_MathematicsInverseTrigPropertiesSim from '../../../simulations/c6_12/C12_MathematicsInverseTrigPropertiesSim';

/** v3 wrapped master — C12_MathematicsInverseTrigPropertiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsinversetrigpropertiessim: SimDef = {
    id: 'v3w_c12_mathematicsinversetrigpropertiessim',
    title: 'Word Problems: Applications of Inverse Trigonometric Functions',
    subtitle: 'This node covers word problems solvable using basic inverse trigonometric functions.',
    classLevel: 12, subject: 'mathematics', topic: 'Word Problems: Applications of Inverse Trigonometric Functions',
    chapters: [],
    nodeIds: ['c12_math_cbse_02_008', 'c12_math_cbse_05_008', 'c12_math_cbse_02_001', 'c12_math_cbse_02_002', 'c12_math_cbse_02_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are standing 30 metres away from the base of a historic minar in Delhi and measure the angle of.', goal: 'Master Word Problems: Applications of Inverse Trigonometric Functions.' },
    discovery: {
        question: 'Why is the domain of \\( \\sec^{-1} x \\) given as \\( \\mathbb{R} \\setminus (-1, 1) \\) (i.e., \\( x \\le -1 \\) or \\( x \\ge 1 \\))?',
        options: ['The secant function is \\( \\sec y = 1/\\cos y \\)', 'domain is all real numbers', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
        answer: 'The secant function is \\( \\sec y = 1/\\cos y \\)',
        hook: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} =.',
    },
    teaching: [
        { title: 'Word problems involving inverse.', text: 'Word problems involving inverse trigonometric functions require translating real-world scenarios (such as heights, distances, angles of elevation/depression, or geometric configurations) into.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_008', title: 'Word problems involving inverse.',
          scaffold: { problem: 'A 15 m long ladder leans against a vertical wall. The foot of the ladder is 9 m away from the wall.',
            steps: [
            { text: 'Draw a right triangle. The ladder is the hypotenuse (15 m). The distance from the wall is the adjacent side (9 m).' },
            { text: 'Identify the known sides relative to θ: adjacent = 9, hypotenuse = 15.' },
            { text: 'Apply inverse cosine: θ = cos⁻¹(3/5). Since θ is an angle of elevation (ladder with ground), it must be in [0, π/2].' },
            { text: 'Find height h using sine or Pythagoras. sin θ = h/15 → h = 15 sin θ.' },
            { text: 'Verify: cos θ = 9/15 = 0.6, θ ≈ 53.13° is acute, height 12 m is positive and less than ladder length.', faded: true, blankAnswer: 'Angle with ground = cos⁻¹(3/5) ≈ 53.13° (or 0.927 rad);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_008', title: 'The derivative of an inverse.',
          scaffold: { problem: 'A camera is mounted on a pole 10 metres high. A car moves away from the pole at 20 m/s.',
            steps: [
            { text: 'Identify given and unknown. Given: pole height = 10 m, dx/dt = 20 m/s (car moving away), x = 15 m at the instant of.' },
            { text: 'Write the relationship. tan θ = 10/x ⇒ θ = tan⁻¹(10/x). This is an inverse trigonometric function of x.' },
            { text: 'Differentiate with respect to time t using chain rule. dθ/dt = dθ/dx · dx/dt. First find dθ/dx = d/dx[tan⁻¹(10/x)].' },
            { text: 'Apply chain rule to tan⁻¹(10/x). Let u = 10/x. d/dx[tan⁻¹u] = (1/(1+u²)) · du/dx. Here du/dx = -10/x².' },
            { text: 'Substitute x = 15 m and dx/dt = 20 m/s. dθ/dt = (-10/(15²+100)) × 20 = (-10/325) × 20 = -200/325 = -8/13 rad/s.', faded: true, blankAnswer: '-8/13 rad/s (angle of depression decreasing at 8/13 rad/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_001', title: 'The inverse trigonometric functions are.',
          scaffold: { problem: 'A ladder 10 m long leans against a vertical wall. The foot of the ladder is 6 m away from the wall.',
            steps: [
            { text: 'Identify the given data. Ladder length = hypotenuse = 10 m. Distance from wall = adjacent side = 6 m.' },
            { text: 'Choose the trigonometric ratio that involves adjacent and hypotenuse: cosine. cos θ = adjacent/hypotenuse = 6/10 = 3/5.' },
            { text: 'The angle θ = cos⁻¹(3/5). The principal value branch of cos⁻¹ has range [0, π].' },
            { text: '3/5 is not a standard angle; we leave the answer as cos⁻¹(3/5) or approximate using a calculator.' },
            { text: 'Verify that 3/5 ∈ [-1, 1] (domain of cos⁻¹) and the resulting angle will be in [0, π].', faded: true, blankAnswer: 'θ = cos⁻¹(3/5) radians (≈ 0.927 rad).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_002', title: 'The principal value branch of an.',
          scaffold: { problem: 'A surveyor in Jaipur measures the angle of elevation to the top of a historical minaret. The sine of the angle is found to be 1/2.',
            steps: [
            { text: 'Identify the given information: sin θ = 1/2, and we need θ in the principal range of sin⁻¹ which is [–π/2, π/2].' },
            { text: 'Recall standard angles: sin(π/6) = 1/2, sin(5π/6) = 1/2, sin(–7π/6) = 1/2, etc.' },
            { text: 'Check which of these angles lies in the principal range [–π/2, π/2]. π/6 ≈ 0.52 rad is in [–π/2, π/2].' },
            { text: 'Therefore, the principal value is sin⁻¹(1/2) = π/6.' },
            { text: 'Convert to degrees for the clinometer display: π/6 rad = 30°. The clinometer shows 30°.', faded: true, blankAnswer: 'π/6 radians or 30°' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_003', title: 'The properties of inverse trigonometric.',
          scaffold: { problem: 'Find the principal value of \\( \\tan^{-1}(\\tan \\frac{7\\pi}{6}) \\).',
            steps: [
            { text: 'Identify the given angle \\( \\frac{7\\pi}{6} \\) and the principal range of \\( \\tan^{-1} \\), which is \\( (-\\frac{\\pi}{2},.' },
            { text: 'Check if \\( \\frac{7\\pi}{6} \\) lies in \\( (-\\frac{\\pi}{2}, \\frac{\\pi}{2}) \\).' },
            { text: 'Use the periodicity of tangent: \\( \\tan(\\pi + \\theta) = \\tan\\theta \\).' },
            { text: 'Now \\( \\frac{\\pi}{6} \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2}) \\), so \\( \\tan^{-1}(\\tan \\frac{7\\pi}{6}) = \\tan^{-1}(\\tan.' },
            { text: 'Verify: \\( \\frac{\\pi}{6} \\) is in the principal range, and \\( \\tan \\frac{\\pi}{6} = \\frac{1}{\\sqrt{3}} = \\tan.', faded: true, blankAnswer: '\\( \\frac{\\pi}{6} \\)' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Word Problems: Applications of Inverse Trigonometric Functions', spots: [
            { id: 's1', label: 'Word problems involving inverse trigonometric', prompt: 'Which idea is this? — Word problems involving inverse trigonometric functions require translating real-world.', answer: 'Word problems involving inverse trigonometric', options: ['Word problems involving inverse trigonometric', 'The derivative of an inverse', 'The inverse trigonometric functions are', 'The principal value branch of'] },
            { id: 's2', label: 'The derivative of an inverse', prompt: 'Which idea is this? — The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x.', answer: 'The derivative of an inverse', options: ['The derivative of an inverse', 'Word problems involving inverse trigonometric', 'The inverse trigonometric functions are', 'The principal value branch of'] },
            { id: 's3', label: 'The inverse trigonometric functions are', prompt: 'Which idea is this? — The inverse trigonometric functions are defined by restricting the domains of the.', answer: 'The inverse trigonometric functions are', options: ['The inverse trigonometric functions are', 'Word problems involving inverse trigonometric', 'The derivative of an inverse', 'The principal value branch of'] },
            { id: 's4', label: 'The principal value branch of', prompt: 'Which idea is this? — The principal value branch of an inverse trigonometric function is the specific interval.', answer: 'The principal value branch of', options: ['The principal value branch of', 'Word problems involving inverse trigonometric', 'The derivative of an inverse', 'The inverse trigonometric functions are'] },
            { id: 's5', label: 'The properties of inverse trigonometric', prompt: 'Which idea is this? — The properties of inverse trigonometric functions are a set of identities that relate.', answer: 'The properties of inverse trigonometric', options: ['The properties of inverse trigonometric', 'Word problems involving inverse trigonometric', 'The derivative of an inverse', 'The inverse trigonometric functions are'] }
          ] } }
    ],
    explore: { component: C12_MathematicsInverseTrigPropertiesSim, prompt: 'Explore the interactive — Word Problems: Applications of Inverse Trigonometric Functions' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_02_008', difficulty: 'standard',
          question: 'Word problems involving inverse trigonometric functions require translating.',
          hint: 'If stuck, immediately review c12_math_cbse_02_001 (domain/range table) and.',
          misconception: 'Students often treat inverse trigonometric functions as multi-valued (e.g., writing sin⁻¹(1/2) = 30°, 150°, 390°, …).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems involving inverse trigonometric functions require translating real-world',
                  options: ['Word problems involving inverse trigonometric functions require translating real-world', 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The principal value branch of an inverse trigonometric function is the specific interval'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat inverse trigonometric functions as multi-valued (e.g., writing sin⁻¹(1/2) = 30°, 150°, 390°, …) instead of.' }
          ],
            remediations: { 'students-often-treat-inverse-trigonometric': { steps: ['If a student makes the above errors: (1) Have them revisit c12_math_cbse_02_001 (Domain and Range) and.', '(2) Practice drawing and labelling right triangles for 10 word problems, explicitly writing "opposite", "adjacent",.', '(3) Solve 5 problems where the computed ratio is deliberately >1 to recognize impossible triangles.', '(4) Re-attempt a diagnostic question like Q4 or Q5 and explain in words why the principal value is the only valid.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_008', difficulty: 'standard',
          question: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\(.',
          hint: 'Review implicit differentiation (c12_math_cbse_05_007) and the principal value branch.',
          misconception: 'Students write \\( \\frac{d}{dx}(\\sin^{-1}(2x)) = \\frac{1}{\\sqrt{1-(2x)^2}} \\) forgetting the chain rule factor of 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x',
                  options: ['The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'Word problems involving inverse trigonometric functions require translating real-world', 'The inverse trigonometric functions are defined by restricting the domains of the', 'The principal value branch of an inverse trigonometric function is the specific interval'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write \\( \\frac{d}{dx}(\\sin^{-1}(2x)) = \\frac{1}{\\sqrt{1-(2x)^2}} \\) forgetting the chain rule factor of 2.' }
          ],
            remediations: { 'students-write-frac-d-dx': { steps: ['If a student makes the chain rule error, have them redo c12_math_cbse_05_006 (Chain Rule) with 5 practice problems of.', 'If they confuse \\( \\sin^{-1} \\) with \\( \\csc \\), revisit c11_math_cbse_03_003 (Trigonometric Functions Definition) and.', 'For sign errors in radicals, make them explicitly write the principal value range for each inverse trig function and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_001', difficulty: 'standard',
          question: 'The inverse trigonometric functions are defined by restricting the domains of.',
          hint: 'Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and.',
          misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} =.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the principal value branch of \\( \\cos^{-1} x \\).', answer: 'Domain: \\([-1, 1]\\)',
                  options: ['Domain: \\([-1, 1]\\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' },
                { id: 'b', prompt: 'Why is the domain of \\( \\sec^{-1} x \\) given as \\( \\mathbb{R} \\setminus (-1, 1) \\) (i.e., \\( x \\le -1 \\) or \\( x \\ge 1 \\))?', answer: 'The secant function is \\( \\sec y = 1/\\cos y \\)',
                  options: ['The secant function is \\( \\sec y = 1/\\cos y \\)', 'domain is all real numbers', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' },
                { id: 'c', prompt: 'Find the principal value of \\( \\tan^{-1}(-\\sqrt{3}) \\).', answer: 'We need \\( \\theta \\in (-\\pi/2, \\pi/2) \\) such that \\( \\tan \\theta = -\\sqrt{3} \\)',
                  options: ['We need \\( \\theta \\in (-\\pi/2, \\pi/2) \\) such that \\( \\tan \\theta = -\\sqrt{3} \\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' }
          ],
            remediations: { 'notation-confusion-many-students-write': { steps: ['Re‑visit the definition of inverse functions from Class 11 (node `c11_math_cbse_02_005`): if \\( f \\) is bijective, \\(.', 'Emphasise that \\( f^{-1} \\) is a function, not a reciprocal.', 'Contrast \\( \\sin^{-1} x \\) and \\( (\\sin x)^{-1} \\) with a concrete example: \\( \\sin^{-1}(0.5) = \\pi/6 \\approx 0.524 \\),.', 'They are different numbers.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} =.',
          parts: [
                { id: 'a', prompt: 'A student writes: “The principal value of \\( \\cosec^{-1}(-2) \\) is \\( -\\pi/6 \\).” Evaluate this statement and correct it if necessary.', answer: 'The range of \\( \\cosec^{-1} \\) is \\( [-\\pi/2, \\pi/2] \\setminus \\{0\\} \\)',
                  options: ['The range of \\( \\cosec^{-1} \\) is \\( [-\\pi/2, \\pi/2] \\setminus \\{0\\} \\)', 'range of cosec inverse is \\( [0, \\pi] \\)', 'it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Notation confusion:** Many students write \\( \\sin^{-1} x \\) and think it means \\( (\\sin x)^{-1} = \\frac{1}{\\sin x} = \\cosec x \\).' }
          ],
            remediations: { 'notation-confusion-many-students-write': { steps: ['Re‑visit the definition of inverse functions from Class 11 (node `c11_math_cbse_02_005`): if \\( f \\) is bijective, \\(.', 'Emphasise that \\( f^{-1} \\) is a function, not a reciprocal.', 'Contrast \\( \\sin^{-1} x \\) and \\( (\\sin x)^{-1} \\) with a concrete example: \\( \\sin^{-1}(0.5) = \\pi/6 \\approx 0.524 \\),.', 'They are different numbers.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_002', difficulty: 'standard',
          question: 'The principal value branch of an inverse trigonometric function is the specific.',
          hint: 'If stuck, immediately revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in.',
          misconception: 'Students consistently treat sin⁻¹(sin x) = x as universally true, ignoring the condition that x must lie in [–π/2,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The principal value branch of an inverse trigonometric function is the specific interval',
                  options: ['The principal value branch of an inverse trigonometric function is the specific interval', 'Word problems involving inverse trigonometric functions require translating real-world', 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The inverse trigonometric functions are defined by restricting the domains of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat sin⁻¹(sin x) = x as universally true, ignoring the condition that x must lie in [–π/2, π/2].' }
          ],
            remediations: { 'students-consistently-treat-sin-sin': { steps: ['If a student cannot correctly identify principal value ranges or apply the cancellation property with domain.', '(2) Practice 5 problems of the type sin⁻¹(sin x) where x is outside [–π/2, π/2], forcing them to: (a) state the.', 'to find equivalent angle in range, (d) evaluate.', '(3) Revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants) to reinforce which quadrants correspond.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_003', difficulty: 'standard',
          question: 'The properties of inverse trigonometric functions are a set of identities that.',
          hint: 'If stuck, immediately revisit c12_math_cbse_02_001 and c12_math_cbse_02_002 and write the.',
          misconception: '**Misconception:** "\\( \\sin^{-1}(\\sin x) = x \\) for all real \\( x \\)." **Exact wrong step:** A student evaluates \\(.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The properties of inverse trigonometric functions are a set of identities that relate',
                  options: ['The properties of inverse trigonometric functions are a set of identities that relate', 'Word problems involving inverse trigonometric functions require translating real-world', 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The inverse trigonometric functions are defined by restricting the domains of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "\\( \\sin^{-1}(\\sin x) = x \\) for all real \\( x \\)." **Exact wrong step:** A student evaluates \\( \\sin^{-1}(\\sin.' }
          ],
            remediations: { 'misconception-sin-1-sin-x': { steps: ['Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value Branches).', 'Write down the domain and range of all six inverse functions from memory.', 'For each property (e.g., \\( \\sin^{-1}(\\sin x) = x \\)), write the **exact condition** on \\( x \\) (e.g., \\( x \\in.', 'Do a re-diagnostic: Evaluate \\( \\cos^{-1}(\\cos \\frac{4\\pi}{3}) \\) and \\( \\tan^{-1}(\\tan \\frac{5\\pi}{6}) \\) correctly by.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
