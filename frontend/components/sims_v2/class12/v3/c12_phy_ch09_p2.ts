import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch09_p2: SimDef = {
    id: 'v3_c12_phy_ch09_p2',
    title: 'Ray Optics and Optical Instruments · Part 2/2',
    subtitle: 'One flipped sign flipped the image\'s nature',
    classLevel: 12, subject: 'physics', topic: 'Ray Optics and Optical Instruments · Part 2/2',
    chapters: ['c12_phy_ch09'],
    nodeIds: ['c12_phy_cbse_09_007', 'c12_phy_cbse_09_008', 'c12_phy_cbse_09_009', 'c12_phy_cbse_09_010', 'c12_phy_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Optics sign-keeper', intro: 'The car\'s side mirror shrinks the world for a reason — and the sign convention is the language that says it.', goal: 'Master the laws of reflection and Cartesian sign convention — including why f = R/2 carries a sign.' },
    discovery: {
        question: 'A concave mirror\'s focal length is written +15 cm — and the mirror equation now predicts a virtual image where a real one should be. What went wrong?',
        options: ['The sign convention — f and R are negative for concave because focus and centre sit against the incident light; one flipped sign flips the image\'s nature', 'Rounding error', 'Mirror is convex', 'Focus is behind'],
        answer: 'The sign convention — f and R are negative for concave because focus and centre sit against the incident light; one flipped sign flips the image\'s nature',
        hook: 'The mirror\'s normal isn\'t drawn at random — it always runs through the centre of curvature, which is why a parallel ray bounces through focus and why f = R/2 exists at all. And the sign convention isn\'t bookkeeping: it encodes whether the focus is real or virtual.',
    },
    teaching: [
        { title: 'Combination of Thin Lenses in Contact', text: 'The combination of thin lenses in contact refers to an optical system where two or more thin lenses are placed coaxially with their optical centres coincident (or so close that the separation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_09_007', title: 'Your mission',
          mission: { widget: 'lens', validate: 'lens:focal=50',
            instruction: 'On the lab: set the focal length mid-range — where does the image form?.',
        context: 'Apply the Cartesian rules without mercy: assign signs to u, v, f, R for both mirror types, verify f = R/2 with a sun-and-screen measurement, and trace how one wrong sign corrupts the whole equation.',
            observePrompt: 'What did the lens interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_007', title: 'Combination of Thin Lenses in Contact',
          scaffold: { problem: 'A convex lens of focal length 25 cm is placed in contact with a concave lens of focal length 50 cm.',
            steps: [
            { text: 'Identify given quantities with signs and units. \\(f_1 = +25\\,\\text{cm} = +0.25\\,\\text{m}\\) (convex), \\(f_2.' },
            { text: 'Write the combination formula for focal length: \\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2}\\).' },
            { text: 'Substitute values: \\(\\frac{1}{F} = \\frac{1}{0.25} + \\frac{1}{-0.50} = 4 - 2 = 2\\,\\text{m}^{-1}\\).' },
            { text: 'Compute \\(F = \\frac{1}{2} = 0.50\\,\\text{m} = 50\\,\\text{cm}\\). Power \\(P = \\frac{1}{F} = 2\\,\\text{D}\\) (or directly \\(P.' },
            { text: 'Since \\(P = +2\\,\\text{D} > 0\\), the combination is converging.', faded: true, blankAnswer: 'Effective focal length \\(F = +50\\,\\text{cm}\\) (or +0.50 m).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_008', title: 'Prism: Refraction Through Prism and Dispersion',
          scaffold: { problem: 'A ray of light is incident at an angle of 40° on one face of a prism of refracting angle 60°.',
            steps: [
            { text: 'Identify given quantities: i = 40°, e = 50°, A = 60°, n = 1.5. Find: δ, r1, r2, check symmetry.' },
            { text: 'Use deviation formula δ = i + e - A. Substitute: δ = 40° + 50° - 60° = 30°.' },
            { text: 'Apply Snell\'s law at first face: sin i = n sin r1 → sin 40° = 1.5 sin r1 → 0.6428 = 1.5 sin r1 → sin r1 = 0.4285 → r1.' },
            { text: 'Use geometry r1 + r2 = A → r2 = 60° - 25.4° = 34.6°.' },
            { text: 'Verify Snell\'s law at second face: n sin r2 = 1.5 × sin 34.6° = 1.5 × 0.5678 = 0.8517. sin e = sin 50° = 0.7660.' },
            { text: 'Check symmetry: i = 40°, e = 50° → i ≠ e. r1 = 25.4°, r2 = 34.6° → r1 ≠ r2. Ray does NOT pass symmetrically.' },
            { text: 'Physical reasonableness: δ = 30° is positive and less than (i+e) = 90°.', faded: true, blankAnswer: '(a) δ = 30°. (b) r1 ≈ 25.4°, r2 ≈ 34.6°. (c) No, the ray.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_009', title: 'Optical Instruments: Simple Microscope (Magnifying Glass)',
          scaffold: { problem: 'A watchmaker uses a magnifying glass (convex lens) of focal length 6 cm to examine a tiny gear.',
            steps: [
            { text: 'Identify given: f = 6 cm = 0.06 m, D = 25 cm = 0.25 m. Need m for two cases and object distance u.' },
            { text: 'For (a) image at near point: use m = 1 + D/f. For (b) image at infinity: use m = D/f.' },
            { text: 'Compute (a): m = 1 + 0.25/0.06 = 1 + 4.1667 = 5.17 ≈ 5.2. (b): m = 0.25/0.06 = 4.17 ≈ 4.2.' },
            { text: 'Find object distance u for each case using lens formula 1/v - 1/u = 1/f.' },
            { text: 'Verify: object distances are less than focal length (6 cm) as required for virtual image.', faded: true, blankAnswer: '(a) m = 5.2, u = 4.84 cm; (b) m = 4.2, u = 6 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_010', title: 'Optical Instruments: Compound Microscope',
          scaffold: { problem: 'A compound microscope has an objective of focal length 1.0 cm and an eyepiece of focal length 2.5 cm. The tube length is 16 cm.',
            steps: [
            { text: 'Given fo = 1.0 cm, fe = 2.5 cm, L = 16 cm, D = 25 cm.' },
            { text: 'For (a) final image at near point: magnifying power m = (L/fo) × (1 + D/fe) = (16/1) × (1 + 25/2.5) = 16 × (1 + 10).' },
            { text: 'For (b) final image at infinity: m = (L/fo) × (D/fe) = 16 × (25/2.5) = 16 × 10 = 160.' },
            { text: 'To find object distance u_o for each case, we use the fact that the intermediate image is formed at the first focal.' },
            { text: 'The object distances are approximately –1.06 cm in both cases (very close to fo).', faded: true, blankAnswer: '(a) m = 176, u_o ≈ –1.06 cm; (b) m = 160, u_o ≈ –1.06 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_011', title: 'Optical Instruments: Astronomical Telescope',
          scaffold: { problem: 'An astronomical telescope uses an objective lens of focal length 120 cm and an eyepiece of focal length 4 cm.',
            steps: [
            { text: 'Identify given quantities: \\( f_o = 120 \\) cm, \\( f_e = 4 \\) cm, \\( D = 25 \\) cm.' },
            { text: 'For normal adjustment: Magnifying power \\( m_\\infty = -f_o/f_e = -120/4 = -30 \\).' },
            { text: 'For final image at D = 25 cm: Use formula \\( m_D = m_\\infty \\left(1 + \\frac{f_e}{D}\\right) = -30 \\times \\left(1.' },
            { text: 'Tube length for near point: The intermediate image must be at distance \\( u_e \\) from eyepiece such that \\( v_e = -25.' },
            { text: 'Verify: Magnification increased from 30 to 34.8 (as expected), tube length decreased slightly from 124 cm to 123.45.', faded: true, blankAnswer: '(a) \\( m = -30 \\), (b) \\( L = 124 \\) cm, (c) \\( m = -34.8.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A driving-school instructor teaches that the convex side mirror \'warns: objects are closer than they appear\' is just legal boilerplate — \'the mirror is smaller, that\'s all.\'',
            decisions: [{ prompt: 'What does the mirror formula say the convex mirror is actually doing?', options: [
                { text: 'It\'s optically shrinking distances — a convex mirror always forms a virtual, erect, diminished image behind it (v positive, |m| < 1), so the car genuinely looks smaller and farther than it is; the warning is the physics, not the packaging.', outcome: 'The chapter\'s map of the formula: f positive, u negative forces v small and positive, so magnification stays under one — wider field, but everything in it is compressed.' },
                { text: 'He\'s right — the mirror just shows a wider area; distances are true.', outcome: 'The wider field is bought with diminution — every object lands closer to the focus than the pole-side distance it actually occupies, which is exactly why the warning exists.', reveals: 'wide-field-is-free' },
                { text: 'The mirror makes cars look farther only at long range — nearby cars appear true-size.', outcome: 'Diminution holds at every object distance for a convex mirror — |m| rises as the car approaches but stays under 1; there\'s no true-size zone in the formula.', reveals: 'close-up-is-true-size' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'You can now run mirror math on convention, not memory — where every sign is a statement about real versus virtual.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'lens', prompt: 'Explore the lens interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'lens', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_007', difficulty: 'standard',
          question: 'The combination of thin lenses in contact refers to an optical system where two.',
          hint: 'If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens.',
          misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm).',
          parts: [
                { id: 'a', prompt: 'State the formula for the effective focal length \\(F\\) of three thin lenses of focal lengths \\(f_1, f_2, f_3\\) placed in contact.', answer: '\\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}\\)',
                  options: ['\\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}\\)', 'does nothing', 'behaves like a plane glass plate', 'no net power'],
                  hint: 'If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens problems.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' },
                { id: 'b', prompt: 'A convex lens of power +4.0 D and a concave lens of power –2.5 D are placed in contact.', answer: 'The net power is \\(P = +4.0 + (-2.5) = +1.5\\,\\text{D}\\)',
                  options: ['The net power is \\(P = +4.0 + (-2.5) = +1.5\\,\\text{D}\\)', 'does nothing', 'behaves like a plane glass plate', 'no net power'],
                  hint: 'If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens problems.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' },
                { id: 'c', prompt: 'Two thin lenses of focal lengths +20 cm and –30 cm are placed in contact. An object is placed 40 cm from the combination.', answer: '\\(f_1 = +20\\,\\text{cm}, f_2 = -30\\,\\text{cm}\\)',
                  options: ['\\(f_1 = +20\\,\\text{cm}, f_2 = -30\\,\\text{cm}\\)', 'does nothing', 'behaves like a plane glass plate', 'no net power'],
                  hint: 'If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens problems.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' }
          ],
            remediations: { 'when-a-convex-and-a': { steps: ['If the student cannot apply the power-addition formula correctly: (1) Revisit node c12_phy_cbse_09_006 to practice sign.', '(2) Review node c10_phy_cbse_04_011 (Class 10 Power of a Lens) for the definition \\(P = 1/f\\) and the sign rule.', '(3) Do a quick physical check: hold a convex and concave lens together from a spectacle kit, look at a distant object.', '(4) Re-attempt Diagnostic Questions 2 and 5 with explicit sign annotation.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm).',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "Two lenses of powers +3 D and –1 D are in contact.', answer: 'The student added the magnitudes instead of the signed powers',
                  options: ['The student added the magnitudes instead of the signed powers', 'does nothing', 'behaves like a plane glass plate', 'no net power'],
                  hint: 'If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens problems.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' }
          ],
            remediations: { 'when-a-convex-and-a': { steps: ['If the student cannot apply the power-addition formula correctly: (1) Revisit node c12_phy_cbse_09_006 to practice sign.', '(2) Review node c10_phy_cbse_04_011 (Class 10 Power of a Lens) for the definition \\(P = 1/f\\) and the sign rule.', '(3) Do a quick physical check: hold a convex and concave lens together from a spectacle kit, look at a distant object.', '(4) Re-attempt Diagnostic Questions 2 and 5 with explicit sign annotation.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_008', difficulty: 'standard',
          question: 'A prism is a transparent optical medium bounded by two plane refracting.',
          hint: 'If stuck, revisit c12_phy_cbse_09_003 (Snell\'s law) for refraction at plane surfaces, and.',
          misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the.',
          parts: [
                { id: 'a', prompt: 'A ray of light is incident on one face of a prism of refracting angle A = 60° at an angle of incidence i = 45°.', answer: 'δ = i + e - A = 45° + 55° - 60° = 40°',
                  options: ['δ = i + e - A = 45° + 55° - 60° = 40°', 'minimum deviation occurs when the ray passes through the prism symmetrically', 'symmetric passage', 'normal incidence'],
                  hint: 'If stuck, revisit c12_phy_cbse_09_003 (Snell\'s law) for refraction at plane surfaces, and.',
                  misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the ray is perpendicular.' },
                { id: 'b', prompt: 'A prism of refracting angle A = 60° and refractive index n = 1.5 is placed in air. Calculate the angle of minimum deviation Dm.', answer: 'Given: A = 60°, n = 1.5',
                  options: ['Given: A = 60°, n = 1.5', 'minimum deviation occurs when the ray passes through the prism symmetrically', 'symmetric passage', 'normal incidence'],
                  hint: 'If stuck, revisit c12_phy_cbse_09_003 (Snell\'s law) for refraction at plane surfaces, and.',
                  misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the ray is perpendicular.' }
          ],
            remediations: { 'minimum-deviation-occurs-when-the': { steps: ['If the student confuses symmetric passage with normal incidence: (1) Draw a 60° prism.', '(2) Trace rays for i = 0°, 30°, 48.6°, 60° using Snell\'s law at each face (r1 = sin⁻¹(sin i/n), r2 = A - r1, check.', '(3) Plot δ vs i — observe the minimum at i ≈ 48.6°.', '(4) Verify that at this i, r1 = r2 = 30° = A/2, and the ray inside is parallel to the base.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_009', difficulty: 'standard',
          question: 'A simple microscope (magnifying glass) is a single converging lens of short.',
          hint: 'Revisit the thin lens formula and sign convention (c12_phy_cbse_09_006) and practice with.',
          misconception: 'Students confuse linear magnification (v/u) with angular magnification (magnifying power).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A simple microscope (magnifying glass) is a single converging lens of short focal length',
                  options: ['A simple microscope (magnifying glass) is a single converging lens of short focal length', 'Reflection of light is the phenomenon where a light ray, incident on a smooth surface,', 'The mirror formula relates the object distance (u), image distance (v), and focal length', 'Refraction is the bending of a light ray when it passes obliquely from one transparent'],
                  hint: 'Revisit the thin lens formula and sign convention (c12_phy_cbse_09_006) and practice with virtual.',
                  misconception: 'Students confuse linear magnification (v/u) with angular magnification (magnifying power).' }
          ],
            remediations: { 'students-confuse-linear-magnification-v': { steps: ['If the student confuses linear and angular magnification, have them revisit the definition of magnifying power in NCERT.', 'Perform a hands-on activity: hold a magnifying glass over a ruler, measure the apparent size of the image by comparing.', 'Then compute linear magnification from lens formula for the same setup.', 'The difference will be clear.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_010', difficulty: 'standard',
          question: 'A compound microscope is an optical instrument consisting of two converging.',
          hint: 'If stuck, revisit the thin lens formula derivation (c12_phy_cbse_09_006) and the simple.',
          misconception: 'Students often think the magnifying power of a compound microscope is simply the product of the linear magnifications.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A compound microscope is an optical instrument consisting of two converging lenses',
                  options: ['A compound microscope is an optical instrument consisting of two converging lenses', 'Reflection of light is the phenomenon where a light ray, incident on a smooth surface,', 'The mirror formula relates the object distance (u), image distance (v), and focal length', 'Refraction is the bending of a light ray when it passes obliquely from one transparent'],
                  hint: 'If stuck, revisit the thin lens formula derivation (c12_phy_cbse_09_006) and the simple microscope.',
                  misconception: 'Students often think the magnifying power of a compound microscope is simply the product of the linear magnifications of the two lenses.' }
          ],
            remediations: { 'the-magnifying-power-of-a': { steps: ['If the student cannot derive or apply the magnifying power formula, first revisit the thin lens formula.', 'Then, draw the ray diagram for the compound microscope step by step: (1) Object at u_o = –(fo + δ) where δ is small.', '(2) Use lens formula to find v_o.', '(3) This image is at distance u_e from eyepiece.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_011', difficulty: 'standard',
          question: 'An astronomical telescope is an optical instrument designed to provide angular.',
          hint: 'If stuck on sign convention or lens formula, revisit c12_phy_cbse_09_006 (Thin Lens.',
          misconception: 'Students often confuse the magnifying power of a telescope (angular magnification) with linear magnification.',
          parts: [
                { id: 'a', prompt: 'A telescope has an objective of focal length 140 cm and an eyepiece of focal length 5.0 cm.', answer: 'the final image is at infinity, and (',
                  options: ['the final image is at infinity, and (', 'tube length is always \\( f_o + f_e \\), not adjusting for near-point viewing'],
                  hint: 'If stuck on sign convention or lens formula, revisit c12_phy_cbse_09_006 (Thin Lens Formula) and.',
                  misconception: 'Students often confuse the magnifying power of a telescope (angular magnification) with linear magnification.' },
                { id: 'b', prompt: 'An astronomical telescope in normal adjustment has a magnifying power of 50 and a tube length of 102 cm. Find the focal lengths of the objective and eyepiece.', answer: 'Given \\( m = -f_o/f_e = -50 \\) → \\( f_o = 50 f_e \\)',
                  options: ['Given \\( m = -f_o/f_e = -50 \\) → \\( f_o = 50 f_e \\)', 'magnifying power does not change'],
                  hint: 'If stuck on sign convention or lens formula, revisit c12_phy_cbse_09_006 (Thin Lens Formula) and.',
                  misconception: 'Students often confuse the magnifying power of a telescope (angular magnification) with linear magnification.' }
          ],
            remediations: { 'students-often-confuse-the-magnifying': { steps: ['If the student cannot derive the magnifying power formulas, first revisit the thin lens formula (node.', 'Do a quick ray diagram exercise: draw parallel rays from a distant object entering the objective, forming an image.', 'Then draw that image as object for the eyepiece at its focal point (normal adjustment) and within its focal point (near.', 'Use the lens formula for the eyepiece to find the required object distance \\( u_e \\) for \\( v_e = -D \\).'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
