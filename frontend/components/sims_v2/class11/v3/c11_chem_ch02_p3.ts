import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch02_p3 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch02_p3: SimDef = {
    id: 'v3_c11_chem_ch02_p3',
    title: 'Structure of Atom · Part 3/3',
    subtitle: 'See how crossed fields proved cathode rays are particles and pinned down e/m.',
    classLevel: 11, subject: 'chemistry', topic: 'Structure of Atom · Part 3/3',
    chapters: ['c11_chem_ch02'],
    nodeIds: ['c11_chem_cbse_02_013', 'c11_chem_cbse_02_014', 'c11_chem_cbse_02_015', 'c11_chem_cbse_02_016', 'c11_chem_cbse_02_017'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physicist reproducing Thomson\'s cathode-ray measurements', intro: 'A glowing beam in a vacuum tube — light or matter? Your fields will decide.', goal: 'Explain why field deflection proves particle nature and how crossed fields yield the charge-to-mass ratio.' },
    discovery: {
        question: 'Atoms are mostly empty space — so why can\'t you walk through a wall?',
        options: ['Electron clouds repel each other electromagnetically', 'Nuclei collide head-on', 'Atoms are actually solid', 'Walls are quantum-locked'],
        answer: 'Electron clouds repel each other electromagnetically',
        hook: 'Solidity is an illusion of repulsion. Rutherford\'s gold foil proved it a century ago.',
    },
    teaching: [
        { title: 'Quantum Numbers: n, l, m, s', text: 'Quantum numbers are a set of four numerical values (n, l, mₗ, mₛ) that uniquely specify the quantum state of an electron in an atom, defining its energy, orbital shape, spatial orientation, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_02_013', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Place 4 electrons in the atom — which shell fills first?',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_013', title: 'Quantum Numbers: n, l, m, s',
          scaffold: { problem: 'A potassium atom (Z=19) in its ground state has its outermost electron in the 4s orbital.',
            steps: [
            { text: 'Identify the orbital for the outermost electron. Potassium (Z=19) electron configuration: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹.' },
            { text: 'For 4s orbital, principal quantum number n = 4.' },
            { text: 'For s orbital, azimuthal quantum number l = 0 (since s corresponds to l=0).' },
            { text: 'For l = 0, magnetic quantum number mₗ can only be 0 (since mₗ ranges from -l to +l).' },
            { text: 'Spin quantum number mₛ can be either +½ or -½. For the single electron in 4s, assign mₛ = +½ (arbitrary choice, could.' },
            { text: 'Complete set: (n=4, l=0, mₗ=0, mₛ=+½).' },
            { text: 'Determine other electrons with same n=4, l=0. The 4s subshell has only one orbital (2l+1 = 1), which can hold maximum 2.', faded: true, blankAnswer: 'Outermost electron: (4, 0, 0, +½). One other electron can.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_014', title: 'Shapes of Atomic Orbitals: s, p, d',
          scaffold: { problem: 'For a 4p orbital in a hydrogen atom, determine: (a) the number of radial nodes, (b) the number of angular nodes, (c) the total number.',
            steps: [
            { text: 'Identify the quantum numbers for a 4p orbital: n = 4, l = 1 (since p corresponds to l=1).' },
            { text: 'Calculate radial nodes using formula: radial nodes = n - l - 1 = 4 - 1 - 1 = 2.' },
            { text: 'Calculate angular nodes: angular nodes = l = 1.' },
            { text: 'Calculate total nodes: total nodes = n - 1 = 3 (or radial + angular = 2 + 1 = 3).' },
            { text: 'Determine mₗ values: for l=1, mₗ = -1, 0, +1. These correspond to 4pₓ, 4pᵧ, 4p_z (or 4p₋₁, 4p₀, 4p₊₁).' },
            { text: 'Verify: The 4p orbital has 2 spherical radial nodes (where radial probability is zero) and 1 planar angular node (the.', faded: true, blankAnswer: '(a) 2 radial nodes, (b) 1 angular node, (c) 3 total nodes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_015', title: 'Aufbau Principle and Electronic Configuration',
          scaffold: { problem: 'Write the complete ground state electronic configuration of iron (Fe, Z=26) in spectroscopic notation and orbital box notation for the.',
            steps: [
            { text: 'Determine total electrons = atomic number = 26. Recall the filling order using (n + l) rule: 1s, 2s, 2p, 3s, 3p, 4s.' },
            { text: 'Fill orbitals sequentially with maximum capacity: 1s² (2e⁻), 2s² (4e⁻), 2p⁶ (10e⁻), 3s² (12e⁻), 3p⁶ (18e⁻), 4s² (20e⁻).' },
            { text: 'Write spectroscopic notation: 1s²2s²2p⁶3s²3p⁶4s²3d⁶ or condensed [Ar]4s²3d⁶.' },
            { text: 'For orbital box notation of valence subshells: 4s subshell has 1 orbital → ↑↓ (paired).' },
            { text: 'Count unpaired electrons: 4s has 0, 3d has 4 → total 4 unpaired electrons.' },
            { text: 'Interpret: Paramagnetic with 4 unpaired electrons; magnetic moment μ = √[n(n+2)] BM = √24 ≈ 4.90 BM.', faded: true, blankAnswer: 'Spectroscopic: 1s²2s²2p⁶3s²3p⁶4s²3d⁶ or [Ar]4s²3d⁶. Orbital.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_016', title: 'Pauli\'s Exclusion Principle',
          scaffold: { problem: 'A student is asked to determine the maximum number of electrons that can be accommodated in the n=4 shell of an atom and to list the.',
            steps: [
            { text: 'Recall the formula for maximum electrons in a shell: 2n². For n=4, maximum electrons = 2 × (4)² = 2 × 16 = 32 electrons.' },
            { text: 'Identify the subshells in n=4: l = 0 (4s), 1 (4p), 2 (4d), 3 (4f).' },
            { text: 'Focus on the 4p subshell. For 4p: n=4, l=1. The magnetic quantum number mₗ takes values –1, 0, +1 (three orbitals: 4pₓ.' },
            { text: 'Apply Pauli\'s principle: each orbital (fixed n, l, mₗ) holds max 2 electrons with opposite spins.' },
            { text: 'List all six sets systematically in a table:' },
            { text: 'Verify no two sets are identical. Total = 6 = 2(2l+1) = 2(3) = 6. This matches the known capacity of a p subshell.', faded: true, blankAnswer: 'Maximum electrons in n=4 shell = 32. The six electrons.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_017', title: 'Hund\'s Rule of Maximum Multiplicity',
          caseStudy: { intro: 'Observe a magnetic stirrer in the chemistry lab: the stir bar (iron) is strongly attracted to the rotating magnet beneath the beaker, while a ceramic stir bar.',
            decisions: [{ prompt: 'State Hund\'s rule of maximum multiplicity in your own words.', options: [
                { text: 'Correct answer: When filling degenerate orbitals (same subshell), electrons occupy', outcome: 'Correct answer: When filling degenerate orbitals (same subshell), electrons occupy separate.' },
                { text: 'electrons pair up as soon as possible', outcome: 'Not quite — Students often confuse Hund\'s rule with the Aufbau principle, thinking Hund\'s rule governs the.', reveals: 'students-often-confuse-hund-s' },
                { text: 'electrons fill orbitals in order of increasing energy', outcome: 'Not quite — Students often confuse Hund\'s rule with the Aufbau principle, thinking Hund\'s rule governs the.', reveals: 'students-often-confuse-hund-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In the physics-chemistry lab your teacher brings a discharge tube and a bar magnet. The glowing beam bends when the magnet approaches and drifts toward the positive plate of an electric field. A student objects: \'It\'s just a ray like light — it travels straight and makes things glow, so it\'s an electromagnetic wave, not particles.\'',
            decisions: [{ prompt: 'Which observation settles the debate?', options: [
                { text: 'Deflection by electric and magnetic fields — EM waves are electrically neutral and can\'t be bent by a field; only a stream of charged particles (electrons, negative) responds, curving toward the positive plate. Straight-line travel and fluorescence are shared with light, but field deflection is exclusively particle behaviour.', outcome: 'Same shadow-casting, opposite physics: the beam\'s response to fields was the decisive evidence that cathode rays are charged matter, not radiation.' },
                { text: 'The straight-line travel and sharp shadows — only waves can do that, so it must be light-like.', outcome: 'Particles moving fast also travel straight and cast shadows; the test that separates waves from particles is field deflection, which this beam fails the \'wave\' prediction on.', reveals: 'straight-line-means-wave' },
                { text: 'Neither — you can\'t tell particles from waves in a school lab at all.', outcome: 'A magnet and a charged plate are exactly the apparatus that settled it historically; school-lab deflection reproduces Thomson\'s evidence directly.', reveals: 'particle-vs-wave-untestable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_017', title: 'You made it',
          caseStudy: { intro: 'Protons, neutrons, electron clouds, orbitals — the atom stopped being a billiard ball the day you finished this.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_013', difficulty: 'standard',
          question: 'Quantum numbers are a set of four numerical values (n, l, mₗ, mₛ) that uniquely.',
          hint: 'If stuck, revisit c11_chem_cbse_02_012 (Quantum Mechanical Model: Orbitals) to understand.',
          misconception: 'Students treat magnetic quantum number mₗ values (-1, 0, +1 for p orbitals) as fixed labels for specific spatial axes.',
          parts: [
                { id: 'a', prompt: 'An electron in a hydrogen atom has quantum numbers n=4, l=2, mₗ=+1, mₛ=-½.', answer: 'Orbital designation: 4d (since n=4, l=2 → d subshell)',
                  options: ['Orbital designation: 4d (since n=4, l=2 → d subshell)', '4 orbitals or 8 electrons'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_012 (Quantum Mechanical Model: Orbitals) to understand what.',
                  misconception: 'Students treat magnetic quantum number mₗ values (-1, 0, +1 for p orbitals) as fixed labels for specific spatial axes (pₓ, pᵧ, p_z).' }
          ],
            remediations: { 'students-treat-magnetic-quantum-number': { steps: ['Show that the Schrödinger equation for p orbitals gives complex wavefunctions ψ ∝ Y₁ᵐ(θ,φ) with m = -1, 0, +1.', 'Demonstrate that real orbitals pₓ = (Y₁⁻¹ - Y₁¹)/√2, pᵧ = i(Y₁⁻¹ + Y₁¹)/√2, p_z = Y₁⁰.', 'Emphasize that mₗ labels eigenstates of L_z operator, not fixed spatial directions.', 'Practice: "For a p subshell in a magnetic field along z-axis, which mₗ states are affected?" Answer: All three, but.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_014', difficulty: 'standard',
          question: 'Atomic orbitals are three-dimensional regions around the nucleus where the.',
          hint: 'If stuck, review c11_chem_cbse_02_013 (Quantum Numbers) and the "Orbit, orbital and its.',
          misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis.',
          parts: [
                { id: 'a', prompt: 'State the shape of a 3s orbital and the number of radial nodes it possesses. How does its boundary surface diagram differ from that of a 1s orbital?', answer: 'The 3s orbital is spherically symmetric with 2 radial nodes (n-l-1 = 3-0-1 = 2)',
                  options: ['The 3s orbital is spherically symmetric with 2 radial nodes (n-l-1 = 3-0-1 = 2)', '3s has no nodes', '3s is dumb-bell shaped', 'dumb-bell'],
                  hint: 'If stuck, review c11_chem_cbse_02_013 (Quantum Numbers) and the "Orbit, orbital and its importance".',
                  misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis like a pendulum.' },
                { id: 'b', prompt: 'A 3d orbital has n=3, l=2. Calculate its total number of nodes, radial nodes, and angular nodes.', answer: 'Total nodes = n-1 = 2',
                  options: ['Total nodes = n-1 = 2', 'dumb-bell', 'the electron is confined inside that surface, whereas |ψ|² extends to infinity'],
                  hint: 'If stuck, review c11_chem_cbse_02_013 (Quantum Numbers) and the "Orbit, orbital and its importance".',
                  misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis like a pendulum.' }
          ],
            remediations: { 'the-dumb-bell-shape-of': { steps: ['Revisit the physical meaning of ψ and |ψ|²: ψ is a mathematical function; |ψ|²dV is the probability of finding the.', 'Use the "electron cloud" analogy: dots represent probability density — more dots near nucleus for s, zero dots on nodal.', 'Practice node counting: for any orbital, write n and l, then compute radial nodes = n-l-1, angular nodes = l.', 'Build a physical model: use wire frames for angular nodes (planes) and concentric spheres for radial nodes.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment or visualization using a 3D plotting tool (e.g., Python with Mayavi, or a physical model with balloons) to demonstrate the.', answer: 'A good answer: Plot |ψ|² for 3pz in 3D',
                  options: ['A good answer: Plot |ψ|² for 3pz in 3D', 'dumb-bell', 'the electron is confined inside that surface, whereas |ψ|² extends to infinity'],
                  hint: 'If stuck, review c11_chem_cbse_02_013 (Quantum Numbers) and the "Orbit, orbital and its importance".',
                  misconception: 'Students often think that the "dumb-bell" shape of p-orbitals means the electron moves back and forth along the axis like a pendulum.' }
          ],
            remediations: { 'the-dumb-bell-shape-of': { steps: ['Revisit the physical meaning of ψ and |ψ|²: ψ is a mathematical function; |ψ|²dV is the probability of finding the.', 'Use the "electron cloud" analogy: dots represent probability density — more dots near nucleus for s, zero dots on nodal.', 'Practice node counting: for any orbital, write n and l, then compute radial nodes = n-l-1, angular nodes = l.', 'Build a physical model: use wire frames for angular nodes (planes) and concentric spheres for radial nodes.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_015', difficulty: 'standard',
          question: 'The Aufbau principle states that in the ground state of an atom, electrons.',
          hint: 'If stuck, revisit c11_chem_cbse_02_013 (Quantum Numbers) to practice generating orbital.',
          misconception: 'Students believe the 3d subshell fills before 4s because n=3 < n=4, ignoring the (n + l) rule.',
          parts: [
                { id: 'a', prompt: 'Explain why the 4s orbital fills before the 3d orbital, even though n=4 > n=3. Use the (n + l) rule in your explanation.', answer: 'For 4s: n=4, l=0 → n+l=4',
                  options: ['For 4s: n=4, l=0 → n+l=4', '4s is farther from nucleus so higher energy', 'the 3d subshell fills before 4s'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_013 (Quantum Numbers) to practice generating orbital labels, and.',
                  misconception: 'Students believe the 3d subshell fills before 4s because n=3 < n=4, ignoring the (n + l) rule.' },
                { id: 'b', prompt: 'Write the ground state electronic configuration of manganese (Z=25) in both spectroscopic notation and orbital box notation for the 3d and 4s subshells.', answer: 'Spectroscopic: 1s²2s²2p⁶3s²3p⁶4s²3d⁵ or [Ar]4s²3d⁵',
                  options: ['Spectroscopic: 1s²2s²2p⁶3s²3p⁶4s²3d⁵ or [Ar]4s²3d⁵', 'the 3d subshell fills before 4s'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_013 (Quantum Numbers) to practice generating orbital labels, and.',
                  misconception: 'Students believe the 3d subshell fills before 4s because n=3 < n=4, ignoring the (n + l) rule.' }
          ],
            remediations: { 'the-3d-subshell-fills-before': { steps: ['Draw the (n + l) table for n=1 to 4, l=0 to n-1. Calculate n+l for each orbital.', 'Sort by n+l, then by n. Observe 4s (4+0=4) comes before 3d (3+2=5).', 'For ionization, use the "onion layer" analogy — 4s is the outermost layer (higher n), so it peels off first.', 'Practice 5 neutral atom configurations and 5 ion configurations, explicitly stating "removing from highest n first".'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_016', difficulty: 'standard',
          question: 'Pauli\'s Exclusion Principle states that no two electrons in an atom can have.',
          hint: 'If stuck, revisit node c11_chem_cbse_02_013 (Quantum Numbers) to review allowed values.',
          misconception: 'The most pervasive Class 11 error: Students believe Pauli\'s Exclusion Principle requires electrons in *different*.',
          parts: [
                { id: 'a', prompt: 'Two electrons occupy the same 3p orbital. Electron A has quantum numbers n=3, l=1, mₗ=–1, mₛ=+½. What are the allowed quantum numbers for Electron B?', answer: 'Correct answer: Electron B must have n=3, l=1, mₗ=–1, mₛ=–½',
                  options: ['Correct answer: Electron B must have n=3, l=1, mₗ=–1, mₛ=–½', 'opposite spins'],
                  hint: 'If stuck, revisit node c11_chem_cbse_02_013 (Quantum Numbers) to review allowed values of n, l, mₗ.',
                  misconception: 'The most pervasive Class 11 error: Students believe Pauli\'s Exclusion Principle requires electrons in *different* orbitals of the same.' },
                { id: 'b', prompt: 'A student writes the following quantum number sets for three electrons in a 2p subshell: Electron 1: n=2, l=1, mₗ=0, mₛ=+½ Electron 2: n=2, l=1, mₗ=0, mₛ=–½.', answer: 'Correct answer: Electrons 1 and 3 have identical quantum numbers (2, 1, 0, +½)',
                  options: ['Correct answer: Electrons 1 and 3 have identical quantum numbers (2, 1, 0, +½)', '6 electrons', 'opposite spins'],
                  hint: 'If stuck, revisit node c11_chem_cbse_02_013 (Quantum Numbers) to review allowed values of n, l, mₗ.',
                  misconception: 'The most pervasive Class 11 error: Students believe Pauli\'s Exclusion Principle requires electrons in *different* orbitals of the same.' },
                { id: 'c', prompt: 'Compare the following two statements and identify which is a direct consequence of Pauli\'s Exclusion Principle and which describes Hund\'s Rule: (A) "Electrons.', answer: 'Correct answer: Statement (B) is Pauli\'s Exclusion Principle',
                  options: ['Correct answer: Statement (B) is Pauli\'s Exclusion Principle', 'opposite spins'],
                  hint: 'If stuck, revisit node c11_chem_cbse_02_013 (Quantum Numbers) to review allowed values of n, l, mₗ.',
                  misconception: 'The most pervasive Class 11 error: Students believe Pauli\'s Exclusion Principle requires electrons in *different* orbitals of the same.' }
          ],
            remediations: { 'the-most-pervasive-class-11': { steps: ['Revisit node c11_chem_cbse_02_013 and write the allowed mₗ values for p (–1, 0, +1) and d (–2, –1, 0, +1, +2) subshells.', 'Draw three empty boxes for 2p, five for 3d.', 'Place electrons one by one following Hund\'s rule first (fill each box singly with ↑ before any ↓).', 'Only when all boxes in the subshell have one ↑, add the second electron as ↓ in each box.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_017', difficulty: 'standard',
          question: 'Hund\'s Rule of Maximum Multiplicity states that when electrons occupy.',
          hint: 'Revisit quantum numbers (c11_chem_cbse_02_013) and Pauli\'s exclusion principle.',
          misconception: 'Students often confuse Hund\'s rule with the Aufbau principle, thinking Hund\'s rule governs the order of subshell.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hund\'s Rule of Maximum Multiplicity states that when electrons occupy degenerate orbitals',
                  options: ['Hund\'s Rule of Maximum Multiplicity states that when electrons occupy degenerate orbitals', 'The electron is a fundamental subatomic particle carrying a unit negative charge (-1.602', 'The charge-to-mass ratio (e/m) of an electron is the quotient of the electron\'s', 'Rutherford\'s nuclear model of atom proposes that an atom consists of a tiny, dense,'],
                  hint: 'Revisit quantum numbers (c11_chem_cbse_02_013) and Pauli\'s exclusion principle.',
                  misconception: 'Students often confuse Hund\'s rule with the Aufbau principle, thinking Hund\'s rule governs the order of subshell filling (e.g., 4s before.' }
          ],
            remediations: { 'students-often-confuse-hund-s': { steps: ['Revisit quantum numbers (c11_chem_cbse_02_013) to confirm: p subshell has ml = -1, 0, +1 → exactly 3 orbitals; d has 5.', 'Review Pauli exclusion (c11_chem_cbse_02_016): max 2 electrons per orbital, opposite spins.', 'Use the "bus seat analogy": Orbitals are seats.', 'They sit alone first (all facing forward = parallel spins) before sharing a seat.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
