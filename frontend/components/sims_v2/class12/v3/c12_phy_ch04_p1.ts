import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch04_p1: SimDef = {
    id: 'v3_c12_phy_ch04_p1',
    title: 'Moving Charges and Magnetism · Part 1/2',
    subtitle: 'The force is real — the work is zero',
    classLevel: 12, subject: 'physics', topic: 'Moving Charges and Magnetism · Part 1/2',
    chapters: ['c12_phy_ch04'],
    nodeIds: ['c12_phy_cbse_04_001', 'c12_phy_cbse_04_002', 'c12_phy_cbse_04_003', 'c12_phy_cbse_04_004', 'c12_phy_cbse_04_005', 'c12_phy_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field-forces analyst', intro: 'A bar magnet bends a beam of electrons — the first sign that magnetism only steers, never pushes.', goal: 'Apply the magnetic Lorentz force — magnitude, right-hand direction, and the zero-work consequence.' },
    discovery: {
        question: 'A magnet bends the electron beam in an old TV tube — yet the electrons never speed up or slow down. How can a force leave speed untouched?',
        options: ['It\'s perpendicular to velocity — F = qv×B steers without pushing; zero work, direction changed, kinetic energy conserved', 'It cancels gravity', 'Electrons resist', 'The field is weak'],
        answer: 'It\'s perpendicular to velocity — F = qv×B steers without pushing; zero work, direction changed, kinetic energy conserved',
        hook: 'Same field, same speed: proton and electron feel equal force in opposite directions — but the electron accelerates ~1836 times harder because F = ma divides by mass. And the right-hand rule belongs to positive charge; flip it for electrons.',
    },
    teaching: [
        { title: 'Magnetic Force on a Moving Charge: Lorentz Force', text: 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving with velocity \\(\\vec{v}\\) in the presence of both an electric field \\(\\vec{E}\\) and a magnetic field.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_04_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Cross the vectors yourself: compute F = qvB sin θ for a proton at 30°, run the right-hand rule for both charge signs, and explain to a sceptic why magnetic force can never do work.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_001', title: 'Magnetic Force on a Moving Charge: Lorentz Force',
          scaffold: { problem: '** In a cathode-ray tube (like an old TV picture tube), an electron moves horizontally from south to north with a speed of \\(3.0 \\times.',
            steps: [
            { text: 'Identify given quantities with units. \\(q = -1.6 \\times 10^{-19} \\, \\text{C}\\), \\(v = 3.0 \\times 10^7 \\, \\text{m/s}\\).' },
            { text: 'Choose formula. Magnitude: \\(F = |q| v B \\sin\\theta\\). Direction: right-hand rule for \\(\\vec{v} \\times \\vec{B}\\), then.' },
            { text: 'Substitute values. \\(F = (1.6 \\times 10^{-19}) \\times (3.0 \\times 10^7) \\times 0.02 \\times \\sin 90^\\circ\\).' },
            { text: 'Compute with unit tracking. \\(\\sin 90^\\circ = 1\\). \\(F = 1.6 \\times 10^{-19} \\times 3.0 \\times 10^7 \\times 0.02 = 1.6.' },
            { text: 'Verify reasonableness. Force is tiny (\\(\\sim 10^{-13} \\, \\text{N}\\)), typical for single electron.', faded: true, blankAnswer: '** Magnitude \\(9.6 \\times 10^{-14} \\, \\text{N}\\), direction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_002', title: 'Magnetic Force on a Current-Carrying Conductor',
          scaffold: { problem: 'A horizontal straight wire of length 1.2 m and mass 30 g carries a current of 5.0 A from west to east.',
            steps: [
            { text: 'Identify given quantities: \\(l = 1.2\\ \\text{m}\\), \\(m = 30\\ \\text{g} = 0.030\\ \\text{kg}\\), \\(I = 5.0\\ \\text{A}\\), \\(B.' },
            { text: 'Formula: \\(F = I l B \\sin\\theta\\). Direction by right-hand rule: fingers from east to north, thumb points vertically.' },
            { text: 'Substitute: \\(F = 5.0 \\times 1.2 \\times 0.60 \\times \\sin 90^\\circ = 3.6\\ \\text{N}\\). Direction: vertically upward.' },
            { text: 'Weight \\(mg = 0.030 \\times 9.8 = 0.294\\ \\text{N}\\). Magnetic force (3.6 N) > weight (0.294 N), so net upward force.' },
            { text: 'For minimum current to just lift, set \\(I_{\\min} l B = mg\\) → \\(I_{\\min} = \\frac{mg}{l B} = \\frac{0.294}{1.2 \\times.', faded: true, blankAnswer: '(a) 3.6 N, vertically upward. (b) Yes, wire lifts off. (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_003', title: 'Motion of Charge in Uniform Magnetic Field: Circular Path',
          scaffold: { problem: 'An alpha particle (charge \\( +2e \\), mass \\( 6.64 \\times 10^{-27} \\) kg) is accelerated from rest through a potential difference of 500.',
            steps: [
            { text: 'Identify given quantities: \\( q = 2 \\times 1.6 \\times 10^{-19} = 3.2 \\times 10^{-19} \\) C, \\( m = 6.64 \\times 10^{-27}.' },
            { text: 'The kinetic energy gained \\( K = qV = \\frac{1}{2}mv^2 \\). So \\( v = \\sqrt{\\frac{2qV}{m}} \\).' },
            { text: 'Compute \\( v = \\sqrt{\\frac{2 \\times 3.2 \\times 10^{-19} \\times 500}{6.64 \\times 10^{-27}}} = \\sqrt{\\frac{3.2 \\times.' },
            { text: 'Use \\( r = \\frac{mv}{qB} = \\frac{(6.64 \\times 10^{-27})(2.195 \\times 10^5)}{(3.2 \\times 10^{-19})(0.1)} = \\frac{1.457.' },
            { text: 'Verify: alpha particle in 0.1 T field with ~200 keV energy gives cm-scale radius, which is physically reasonable for.', faded: true, blankAnswer: '4.55 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_004', title: 'Biot-Savart Law: Statement and Applications',
          scaffold: { problem: 'A wire carrying a current of 8.0 A is bent into a quarter-circle arc of radius 10 cm.',
            steps: [
            { text: 'Identify contributions. The two straight sections are along radial lines through O, so for each element dl, the vector.' },
            { text: 'For the arc, every element dl is perpendicular to r (radius), so sinθ = 1.' },
            { text: 'Integrate dl over the arc length. Arc length = (1/4) × 2πR = πR/2.' },
            { text: 'B = (µ₀/4π) I (πR/2) / R² = (µ₀ I) / (8 R).' },
            { text: 'Substitute values: µ₀ = 4π × 10⁻⁷, I = 8.0 A, R = 0.10 m. B = (4π × 10⁻⁷ × 8.0) / (8 × 0.10) = (4π × 10⁻⁷) / 0.10 = 4π.', faded: true, blankAnswer: '1.26 × 10⁻⁵ T into the plane of the arc.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_005', title: 'Magnetic Field Due to a Circular Loop',
          scaffold: { problem: 'A circular coil of 200 turns and mean radius 15 cm is connected to a 12 V battery. The total resistance of the circuit is 6.0 Ω.',
            steps: [
            { text: 'Identify given quantities: \\( N = 200 \\), \\( R = 0.15 \\, \\text{m} \\), \\( V = 12 \\, \\text{V} \\), \\( R_{\\text{circuit}}.' },
            { text: 'Find current using Ohm’s law: \\( I = V/R = 12/6.0 = 2.0 \\, \\text{A} \\).' },
            { text: 'Use centre field formula: \\( B = \\frac{\\mu_0 N I}{2R} \\). \\( \\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T·m/A} \\).' },
            { text: 'Substitute: \\( B = \\frac{(4\\pi \\times 10^{-7}) \\times 200 \\times 2.0}{2 \\times 0.15} = \\frac{4\\pi \\times 10^{-7} \\times.' },
            { text: 'Check units: \\( \\frac{\\text{T·m/A} \\times \\text{A}}{\\text{m}} = \\text{T} \\).', faded: true, blankAnswer: '\\( 1.68 \\times 10^{-3} \\, \\text{T} \\) (or 1.68 mT) directed.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_006', title: 'Ampere\'s Circuital Law: Statement and Applications',
          scaffold: { problem: '** A long straight copper wire of radius 2.5 mm in a household wiring carries a steady current of 15 A.',
            steps: [
            { text: 'Identify given quantities: wire radius **a** = 2.5 mm = 2.5 × 10⁻³ m, total current **I** = 15 A.' },
            { text: 'Choose the formula. For a long straight wire with uniform current density, use Ampere\'s law in simplified form **B**.' },
            { text: 'Substitute values for (a): **Iₑₙc** = 15 × (1.0/2.5)² = 15 × 0.16 = 2.4 A.' },
            { text: 'Substitute for (b): **Iₑₙc** = 15 A. **B** = (4π×10⁻⁷ × 15) / (2π × 5.0×10⁻³) = (60π×10⁻⁷) / (10π×10⁻³) = 6.0 × 10⁻⁴ T.' },
            { text: 'Check continuity at surface **r** = **a** = 2.5 mm: **B** = μ₀**I**/(2π**a**) = (4π×10⁻⁷×15)/(2π×2.5×10⁻³) = 1.2 × 10⁻³.', faded: true, blankAnswer: '** (a) 4.8 × 10⁻⁴ T (0.48 mT) directed tangentially.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A demo wire hangs between magnet poles and won\'t budge. A junior keeps cranking the supply — \'more current, more force, it\'ll move eventually.\'',
            decisions: [{ prompt: 'What should he check before touching the current?', options: [
                { text: 'The angle — F = IlB sinθ is zero when the wire runs parallel to the field; if current and B are aligned, no current on Earth produces force — rotate the wire or the magnet, don\'t amplify a zero.', outcome: 'The chapter\'s geometry: the cross product kills force at θ = 0° or 180° — scaling I multiplies a sinθ that\'s already zero.' },
                { text: 'He\'s right — force is proportional to current, so persistence pays.', outcome: 'Proportional means I multiplies the sinθ term, not replaces it — ten times the current on a parallel wire is still ten times zero.', reveals: 'more-current-overcomes-angle' },
                { text: 'Reverse the battery — opposite current must push instead of pull.', outcome: 'Reversal flips the force\'s direction, not its existence — at parallel alignment both directions give zero; the fix is geometric, not electrical.', reveals: 'reverse-current-creates-force' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now predict a charge\'s deflection — and defend the strange truth that a real force can do zero work.',
            decisions: [{ prompt: 'What comes next? Moving Charges and Magnetism · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Moving Charges and Magnetism · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_001', difficulty: 'standard',
          question: 'The Lorentz force is the total electromagnetic force experienced by a charge.',
          hint: 'If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008).',
          misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle".',
          parts: [
                { id: 'a', prompt: 'State the formula for the magnetic force on a charge \\(q\\) moving with velocity \\(\\vec{v}\\) in a magnetic field \\(\\vec{B}\\). What is its SI unit?', answer: '**Correct answer:** \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)',
                  options: ['**Correct answer:** \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
                  hint: 'If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008) by practicing with.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' },
                { id: 'b', prompt: 'A proton (\\(q = +1.6 \\times 10^{-19} \\, \\text{C}\\)) moves with speed \\(5 \\times 10^5 \\, \\text{m/s}\\) at an angle of \\(30^\\circ\\) to a uniform magnetic field.', answer: '**Correct answer with steps:** 1',
                  options: ['**Correct answer with steps:** 1', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
                  hint: 'If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008) by practicing with.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' },
                { id: 'c', prompt: 'Compare the magnetic force on a proton and an electron moving with the **same velocity** in the **same magnetic field**.', answer: '**Correct answer:** Magnitudes are equal: \\(|q|\\) is same (\\(e\\)), \\(v\\), \\(B\\),',
                  options: ['**Correct answer:** Magnitudes are equal: \\(|q|\\) is same (\\(e\\)), \\(v\\), \\(B\\),', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
                  hint: 'If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008) by practicing with.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-step remediation:** 1.', '**Revisit vector cross product** (c11_phy_cbse_03_008): Practice \\(\\vec{a} \\times \\vec{b}\\) with simple vectors (e.g.', 'Use the right-hand rule physically: fingers from first vector to second, thumb gives direction.', '**Drill the sign rule**: For 5 different \\((\\vec{v}, \\vec{B})\\) pairs, compute \\(\\vec{v} \\times \\vec{B}\\) direction.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle".',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a charged particle moves parallel to a uniform magnetic field, it experiences the maximum magnetic force because the field lines are.', answer: '**Correct answer:** The statement is **false**',
                  options: ['**Correct answer:** The statement is **false**', 'parallel', 'perpendicular', 'magnetic force can increase or decrease the speed of a charged particle'],
                  hint: 'If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008) by practicing with.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-step remediation:** 1.', '**Revisit vector cross product** (c11_phy_cbse_03_008): Practice \\(\\vec{a} \\times \\vec{b}\\) with simple vectors (e.g.', 'Use the right-hand rule physically: fingers from first vector to second, thumb gives direction.', '**Drill the sign rule**: For 5 different \\((\\vec{v}, \\vec{B})\\) pairs, compute \\(\\vec{v} \\times \\vec{B}\\) direction.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_002', difficulty: 'standard',
          question: 'The magnetic force on a straight current-carrying conductor placed in a uniform.',
          hint: 'If stuck on direction, practice c11_phy_cbse_03_008 (Vector Cross Product) with 10 simple.',
          misconception: 'Students often think the magnetic force on a current-carrying wire is along the magnetic field lines (like iron filings.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The magnetic force on a straight current-carrying conductor placed in a uniform magnetic',
                  options: ['The magnetic force on a straight current-carrying conductor placed in a uniform magnetic', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'When a charged particle moves in a uniform magnetic field with its velocity perpendicular', 'The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal'],
                  hint: 'If stuck on direction, practice c11_phy_cbse_03_008 (Vector Cross Product) with 10 simple vector.',
                  misconception: 'Students often think the magnetic force on a current-carrying wire is along the magnetic field lines (like iron filings align) or along the.' }
          ],
            remediations: { 'the-magnetic-force-on-a': { steps: ['Revisit c12_phy_cbse_04_001 (Lorentz force on a moving charge) and practice the right-hand rule for \\(\\vec{v} \\times.', 'Use a physical right-hand model: hold your right hand flat, fingers pointing in current direction, then curl them.', 'Do this for 6 combinations of current (E/W/N/S) and field (E/W/N/S/Up/Down).', 'Solve 5 numerical problems from NCERT Exercise 4.5 and 4.6, explicitly writing the angle \\(\\theta\\) and checking.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_003', difficulty: 'standard',
          question: 'When a charged particle moves in a uniform magnetic field with its velocity.',
          hint: 'If stuck, revisit uniform circular motion (c11_phy_cbse_03_014) and Lorentz force.',
          misconception: 'Students often think that because the magnetic force causes circular motion, it must be doing work and increasing the.',
          parts: [
                { id: 'a', prompt: 'A charged particle moves in a uniform magnetic field along a circular path of radius R.', answer: 'Original \\( r = \\frac{mv}{qB} \\)',
                  options: ['Original \\( r = \\frac{mv}{qB} \\)', 'radius halves', 'unchanged'],
                  hint: 'If stuck, revisit uniform circular motion (c11_phy_cbse_03_014) and Lorentz force direction.',
                  misconception: 'Students often think that because the magnetic force causes circular motion, it must be doing work and increasing the particle’s kinetic.' }
          ],
            remediations: { 'because-the-magnetic-force-causes': { steps: ['Revisit the Lorentz force node (c12_phy_cbse_04_001) to reinforce that magnetic force is perpendicular to velocity and.', 'Review Class 11 uniform circular motion (c11_phy_cbse_03_014) to recall that centripetal force does not change speed.', 'Practice the algebra: \\( qvB = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{qB} \\) step by step, cancelling one v.', 'Use a right-hand rule drill with a physical model (e.g., pencil as velocity, fingers as B, thumb as force) for both.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_004', difficulty: 'standard',
          question: 'The Biot-Savart law gives the magnetic field dB produced at a point P by.',
          hint: 'Review cross product (c11_phy_cbse_03_008) and integration of variable forces.',
          misconception: 'Students often think the Biot-Savart law gives the total magnetic field of a wire directly, forgetting that it only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal',
                  options: ['The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic force on a straight current-carrying conductor placed in a uniform magnetic', 'When a charged particle moves in a uniform magnetic field with its velocity perpendicular'],
                  hint: 'Review cross product (c11_phy_cbse_03_008) and integration of variable forces (c11_phy_cbse_05_002).',
                  misconception: 'Students often think the Biot-Savart law gives the total magnetic field of a wire directly, forgetting that it only gives the contribution.' }
          ],
            remediations: { 'the-biot-savart-law-gives': { steps: ['Revisit the cross product rule: practice finding direction of A × B for various vector pairs using the right-hand screw.', 'Review the concept of superposition and integration for continuous distributions (c11_phy_cbse_05_002).', 'Work through the derivation of B on the axis of a circular loop step by step, explicitly showing how perpendicular.', 'Re-attempt Diagnostic Questions 2 and 5.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_005', difficulty: 'standard',
          question: 'The magnetic field on the axis of a circular current loop is the vector sum.',
          hint: 'If stuck, revisit the Biot–Savart law derivation for a straight wire.',
          misconception: 'Students often apply the right‑hand thumb rule for a straight wire (thumb along current, fingers curl around wire) to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The magnetic field on the axis of a circular current loop is the vector sum of',
                  options: ['The magnetic field on the axis of a circular current loop is the vector sum of', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic force on a straight current-carrying conductor placed in a uniform magnetic', 'When a charged particle moves in a uniform magnetic field with its velocity perpendicular'],
                  hint: 'If stuck, revisit the Biot–Savart law derivation for a straight wire (c12_phy_cbse_04_004) and.',
                  misconception: 'Students often apply the right‑hand thumb rule for a straight wire (thumb along current, fingers curl around wire) to a circular loop.' }
          ],
            remediations: { 'students-often-apply-the-right': { steps: ['Re‑watch the right‑hand thumb rule demonstration for a circular loop (Class 10 video or teacher demo).', 'Practice the rule with a physical loop: hold a circular wire, point fingers along current, observe thumb direction.', 'Re‑derive the axial field from Biot–Savart law step‑by‑step (node c12_phy_cbse_04_004) focusing on the cross product \\.', 'Solve three numerical problems: one at centre, one on axis, one with multiple turns, checking units at each step.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_006', difficulty: 'standard',
          question: 'Ampere\'s circuital law states that for any closed loop (called an Amperian.',
          hint: 'If stuck, review the Biot-Savart law derivation for an infinite straight wire (node.',
          misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a',
                  options: ['Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic force on a straight current-carrying conductor placed in a uniform magnetic', 'When a charged particle moves in a uniform magnetic field with its velocity perpendicular'],
                  hint: 'If stuck, review the Biot-Savart law derivation for an infinite straight wire (node.',
                  misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless of whether it passes through.' }
          ],
            remediations: { 'the-current-i-in-ampere': { steps: ['If the student makes the enclosed-current error: (1) Revisit the definition of **Iₑₙc** in the NCERT text (Section 4.6.', '(2) Draw a cross-section of the wire, shade the area enclosed by the Amperian loop, and compute the fraction of total.', '(3) Practice with a diagnostic: "A wire of radius 6 mm carries 10 A uniformly.', 'Find B at r = 3 mm." The correct **Iₑₙc** = 10 × (3/6)² = 2.5 A.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
