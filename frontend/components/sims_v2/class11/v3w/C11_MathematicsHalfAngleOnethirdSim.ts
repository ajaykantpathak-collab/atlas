import type { SimDef } from '../../engine/types';
import C11_MathematicsHalfAngleOnethirdSim from '../../../simulations/c6_12/C11_MathematicsHalfAngleOnethirdSim';

/** v3 wrapped master — C11_MathematicsHalfAngleOnethirdSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicshalfangleonethirdsim: SimDef = {
    id: 'v3w_c11_mathematicshalfangleonethirdsim',
    title: 'Half Angle Onethird',
    subtitle: 'Covers derivation from sum/difference formulas, the three equivalent forms of \\(\\cos.',
    classLevel: 11, subject: 'mathematics', topic: 'Trigonometric Identities: Double Angle',
    chapters: [],
    nodeIds: ['c11_math_cbse_03_010', 'c11_math_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are designing a skateboard ramp for your school\'s sports fest.', goal: 'Master Half Angle Onethird.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Double angle formulas express trigonometric.', text: 'Double angle formulas express trigonometric functions of angle \\(2x\\) in terms of functions of angle \\(x\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_010', title: 'Double angle formulas express.',
          scaffold: { problem: 'A civil engineer is designing a wheelchair ramp. The initial design has an angle of inclination \\(\\theta\\) where \\(\\tan \\theta =.',
            steps: [
            { text: 'Identify given: \\(\\tan \\theta = \\frac{5}{12}\\). Since \\(\\theta\\) is an acute ramp angle, \\(\\sin \\theta > 0, \\cos \\theta.' },
            { text: 'Choose formulas: \\(\\tan 2\\theta = \\frac{2\\tan \\theta}{1 - \\tan^2 \\theta}\\), \\(\\sin 2\\theta = 2\\sin \\theta \\cos.' },
            { text: 'Compute \\(\\tan 2\\theta\\): Numerator \\(= 2 \\times \\frac{5}{12} = \\frac{5}{6}\\).' },
            { text: 'Compute \\(\\sin 2\\theta = 2 \\times \\frac{5}{13} \\times \\frac{12}{13} = \\frac{120}{169}\\).' },
            { text: 'For a ramp length (hypotenuse) of 13 m, vertical rise \\(= 13 \\sin 2\\theta = 13 \\times \\frac{120}{169} = \\frac{120}{13}.', faded: true, blankAnswer: '\\(\\tan 2\\theta = \\frac{120}{119}, \\sin 2\\theta =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_011', title: 'The triple angle identities express.',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a tower as θ from point A. Moving 50 m closer to the tower, the angle becomes 3θ.',
            steps: [
            { text: 'Identify given: tan θ = 1/√3, distance moved = 50 m, angles are θ and 3θ. We need tower height h.' },
            { text: 'From tan θ = 1/√3, deduce θ = 30° (since θ is acute, angle of elevation). Then 3θ = 90°.' },
            { text: 'Use triple-angle formula for tangent: tan 3θ = (3 tan θ − tan³ θ) / (1 − 3 tan² θ). Substitute tan θ = 1/√3.' },
            { text: 'Numerator = 3(1/√3) − 1/(3√3) = 3/√3 − 1/(3√3) = (9−1)/(3√3) = 8/(3√3). Denominator = 1 − 3(1/3) = 1 − 1 = 0.' },
            { text: 'Since 3θ = 90°, the second observation point is directly under the tower top?', faded: true, blankAnswer: 'Height = 50/√3 m ≈ 28.87 m.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_03_011', title: 'Identify each idea',
          dissect: { specimen: 'Half Angle Onethird', spots: [
            { id: 's1', label: 'Double angle formulas express trigonometric', prompt: 'Which idea is this? — Double angle formulas express trigonometric functions of angle \\(2x\\) in terms of.', answer: 'Double angle formulas express trigonometric', options: ['Double angle formulas express trigonometric', 'The triple angle identities express'] },
            { id: 's2', label: 'The triple angle identities express', prompt: 'Which idea is this? — The triple angle identities express trigonometric functions of 3θ in terms of powers of.', answer: 'The triple angle identities express', options: ['The triple angle identities express', 'Double angle formulas express trigonometric'] }
          ] } }
    ],
    explore: { component: C11_MathematicsHalfAngleOnethirdSim, prompt: 'Explore the interactive — Half Angle Onethird' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_03_010', difficulty: 'standard',
          question: 'Double angle formulas express trigonometric functions of angle \\(2x\\) in terms.',
          hint: 'Review sum/difference formulas (c11_math_cbse_03_009) and Pythagorean identities.',
          misconception: 'Students often write \\(\\cos 2x = 2\\cos x - 1\\) (forgetting the square on \\(\\cos x\\)) or \\(\\sin 2x = 2\\sin x\\).',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(1 - 2\\sin^2 x\\) and \\(2\\cos^2 x - 1\\). For what values of \\(x\\) are they equal? Prove your answer using a fundamental identity.', answer: 'They are equal for **all real \\(x\\)**',
                  options: ['They are equal for **all real \\(x\\)**', 'only when \\(\\sin x = \\cos x\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(\\cos 2x = 2\\cos x - 1\\) (forgetting the square on \\(\\cos x\\)) or \\(\\sin 2x = 2\\sin x\\) (forgetting \\(\\cos x\\)).' }
          ],
            remediations: { 'students-often-write-cos-2x': { steps: ['Re-derive each formula from the sum identities: write \\(\\sin(x+x)\\), \\(\\cos(x+x)\\), \\(\\tan(x+x)\\) and simplify.', 'For \\(\\cos 2x\\), practice converting between the three forms using \\(\\sin^2 x + \\cos^2 x = 1\\) until it becomes.', 'When solving equations like \\(\\sin 2x = k\\), always write the interval for \\(2x\\) first (multiply the given interval by.', 'For quadrant problems, determine the quadrant of \\(2x\\) from the quadrant of \\(x\\) (e.g., if \\(x \\in (\\frac{\\pi}{2},.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write \\(\\cos 2x = 2\\cos x - 1\\) (forgetting the square on \\(\\cos x\\)) or \\(\\sin 2x = 2\\sin x\\).',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(1 - 2\\sin^2 x\\) and \\(2\\cos^2 x - 1\\). For what values of \\(x\\) are they equal? Prove your answer using a fundamental identity.', answer: 'They are equal for **all real \\(x\\)**',
                  options: ['They are equal for **all real \\(x\\)**', 'only when \\(\\sin x = \\cos x\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(\\cos 2x = 2\\cos x - 1\\) (forgetting the square on \\(\\cos x\\)) or \\(\\sin 2x = 2\\sin x\\) (forgetting \\(\\cos x\\)).' }
          ],
            remediations: { 'students-often-write-cos-2x': { steps: ['Re-derive each formula from the sum identities: write \\(\\sin(x+x)\\), \\(\\cos(x+x)\\), \\(\\tan(x+x)\\) and simplify.', 'For \\(\\cos 2x\\), practice converting between the three forms using \\(\\sin^2 x + \\cos^2 x = 1\\) until it becomes.', 'When solving equations like \\(\\sin 2x = k\\), always write the interval for \\(2x\\) first (multiply the given interval by.', 'For quadrant problems, determine the quadrant of \\(2x\\) from the quadrant of \\(x\\) (e.g., if \\(x \\in (\\frac{\\pi}{2},.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
