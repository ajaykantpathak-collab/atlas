import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch02_p1: SimDef = {
    id: 'v3_c11_geo_ch02_p1',
    title: 'The Origin and Evolution of the Earth · Part 1/2',
    subtitle: 'Separate the solar system\'s birth from the universe\'s — and the universe\'s expansion from an explosion.',
    classLevel: 11, subject: 'geography', topic: 'The Origin and Evolution of the Earth · Part 1/2',
    chapters: ['c11_geo_ch02'],
    nodeIds: ['c11_geo_cbse_02_001', 'c11_geo_cbse_02_002', 'c11_geo_cbse_02_003', 'c11_geo_cbse_02_004', 'c11_geo_cbse_02_005', 'c11_geo_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cosmologist correcting a museum exhibit', intro: 'A spinning cloud flattens into a disk; an expanding universe reddens every distant galaxy — two origins, endlessly confused.', goal: 'Distinguish the nebular hypothesis from Big Bang cosmology and interpret redshift correctly.' },
    discovery: {
        question: '\'The Big Bang was an explosion in space that threw matter outward from a central point.\' How many errors can you find in that sentence?',
        options: ['Three — it was an expansion OF space itself, there is no centre, and matter wasn\'t thrown through anything', 'One — only the \'central point\' part is wrong', 'None — that is what the theory says', 'Two — it was hot, not an explosion, and not centred'],
        answer: 'Three — it was an expansion OF space itself, there is no centre, and matter wasn\'t thrown through anything',
        hook: 'Raisins in rising dough — every galaxy sees the others recede, because space itself is stretching, not because anything flew outward.',
    },
    teaching: [
        { title: 'Early Theories of Earth Origin: Nebular Hypothesis', text: 'The Nebular Hypothesis is a cosmogonic model proposing that the Solar System formed from a large, cold, rotating cloud of gas and dust (solar nebula) which collapsed under its own gravity, conserved.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute how a collapsing nebula spins up as it flattens, then use redshift and Hubble\'s law to turn a galaxy\'s colour into a distance.',
        labels: ['Early Theories of Earth', 'Big Bang Theory: Origin', 'Formation of Stars', 'Origin of the Solar', 'Evolution of Earth: Formation', 'Evolution of the Atmosphere'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_001', title: 'Early Theories of Earth Origin: Nebular Hypothesis',
          scaffold: { problem: 'A molecular cloud core of mass 2×10³⁰ kg and radius 5000 AU rotates with period 10⁶ years. It collapses to form a protostar of radius 5 AU.',
            steps: [
            { text: 'Convert initial radius R₁ = 5000 AU = 7.48×10¹⁴ m; final radius R₂ = 5 AU = 7.48×10¹¹ m.' },
            { text: 'Compute initial angular velocity ω₁ = 2π/T₁; T₁ = 10⁶ years = 3.154×10¹³ s → ω₁ = 1.99×10⁻¹³ rad/s.' },
            { text: 'Moment of inertia ratio for sphere-to-sphere: I₁/I₂ = (2/5 MR₁²)/(2/5 MR₂²) = (R₁/R₂)² = (1000)² = 10⁶.' },
            { text: 'Angular momentum conservation: I₁ω₁ = I₂ω₂ → ω₂ = ω₁ × (I₁/I₂) = 1.99×10⁻¹³ × 10⁶ = 1.99×10⁻⁷ rad/s.' },
            { text: 'Final period T₂ = 2π/ω₂ = 3.16×10⁷ s = 1.0 year.' },
            { text: 'Interpretation — a 1-year rotation period for a 5 AU radius protostar implies equatorial velocity v = ω₂R₂ = 1.49×10⁵.', faded: true, blankAnswer: 'Protostar rotation period = 1.0 year (equatorial velocity.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_002', title: 'Big Bang Theory: Origin and Evolution of the Universe',
          scaffold: { problem: 'The H-alpha spectral line of hydrogen (rest wavelength 656.3 nm) is observed at 721.9 nm in a distant galaxy.',
            steps: [
            { text: 'Identify the rest wavelength λ₀ = 656.3 nm and observed wavelength λ = 721.9 nm from the problem statement.' },
            { text: 'Calculate redshift z = (λ - λ₀) / λ₀ = (721.9 - 656.3) / 656.3 = 65.6 / 656.3 = 0.100.' },
            { text: 'Calculate recession velocity v = z × c = 0.100 × 3 × 10⁵ km/s = 30,000 km/s (using non-relativistic approximation since.' },
            { text: 'Apply Hubble\'s Law: d = v / H₀ = 30,000 / 68 ≈ 441.2 Mpc.' },
            { text: 'Convert distance to lookback time: 1 Mpc = 3.26 × 10⁶ ly, so d = 441.2 × 3.26 × 10⁶ ≈ 1.44 × 10⁹ ly ≈ 1.44 billion.' },
            { text: 'Verify: z = 0.1 corresponds to ~1.3 Gyr lookback in standard cosmology; our Hubble-time approximation (1/H₀ ≈ 14.4 Gyr).', faded: true, blankAnswer: '(a) z = 0.100, (b) v = 30,000 km/s, (c) d = 441 Mpc, (d).' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_003', title: 'Formation of Stars and Galaxies',
          caseStudy: { intro: 'Look up at the night sky from a dark village in Ladakh or Rajasthan — you see the Milky Way as a hazy band. That band is our galaxy seen edge-on.',
            decisions: [{ prompt: 'State the two primary elements that constituted the primordial gas clouds from which the first stars formed.', options: [
                { text: 'The two primary elements were hydrogen (~75% by mass) and helium (~25% by mass), produced', outcome: 'The two primary elements were hydrogen (~75% by mass) and helium (~25% by mass), produced during.' },
                { text: 'oxygen and carbon', outcome: 'Not quite — Students often believe galaxies formed *before* stars (like pre-made containers), or that all stars.', reveals: 'galaxies-formed-before-stars-like' },
                { text: 'hydrogen only', outcome: 'Not quite — Students often believe galaxies formed *before* stars (like pre-made containers), or that all stars.', reveals: 'galaxies-formed-before-stars-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_004', title: 'Origin of the Solar System and the Sun',
          caseStudy: { intro: 'Look at a photograph of the Orion Nebula (M42) — a stellar nursery visible from India in winter evenings — where new stars and planetary systems are forming.',
            decisions: [{ prompt: 'State the approximate age of the solar system and name the two primary processes that caused the solar nebula to flatten into.', options: [
                { text: 'The solar system is ~4.6 billion years old', outcome: 'The solar system is ~4.6 billion years old. The nebula flattened due to (1) gravitational collapse.' },
                { text: 'centrifugal force flung material outward', outcome: 'Not quite — Students often believe the Sun formed first as a star, then planets formed from material ejected.', reveals: 'the-sun-formed-first-as' },
                { text: 'the Sun spit out the planets', outcome: 'Not quite — Students often believe the Sun formed first as a star, then planets formed from material ejected.', reveals: 'the-sun-formed-first-as' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_005', title: 'Evolution of Earth: Formation of the Lithosphere',
          scaffold: { problem: 'A 100 g sample of Hadean basaltic crust contains 2.5 ppm U (uranium) with a ²³⁸U/²³⁵U ratio of 137.88.',
            steps: [
            { text: 'Convert U concentration to kg/kg: 2.5 ppm = 2.5 × 10⁻⁶ kg U per kg rock.' },
            { text: 'Calculate mass of each isotope: ²³⁸U = (137.88/138.88) × 2.5e-6 = 2.482e-6 kg/kg; ²³⁵U = (1/138.88) × 2.5e-6 = 1.80e-8.' },
            { text: 'Convert to atoms/kg: N₂₃₈ = (2.482e-6 / 0.238) × 6.022e23 = 6.28e18 atoms/kg; N₂₃₅ = (1.80e-8 / 0.235) × 6.022e23.' },
            { text: 'Calculate decay rates: A₂₃₈ = λ₂₃₈N₂₃₈ = 1.55125e-10 × 6.28e18 = 9.74e8 decays/s/kg; A₂₃₅ = λ₂₃₅N₂₃₅ = 9.8485e-10.' },
            { text: 'Calculate heat power: H₂₃₈ = 9.74e8 × 51.7 × 1.602e-13 = 8.07e-3 W/kg = 8.07 μW/kg; H₂₃₅ = 4.54e7 × 46.4 × 1.602e-13.' },
            { text: 'Total H = 8.07 + 0.338 = 8.41 μW/kg.', faded: true, blankAnswer: '8.41 μW/kg from U decay alone (Th and K would add ~15 μW/kg.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_006', title: 'Evolution of the Atmosphere: Primordial vs Present Atmosphere',
          caseStudy: { intro: 'Observe the air around you right now — invisible, odourless, yet precisely 21% oxygen that allows you to breathe.',
            decisions: [{ prompt: 'State the three dominant gases in Earth\'s primordial atmosphere and their approximate combined percentage, contrasting with the two.', options: [
                { text: 'Primordial atmosphere: Hydrogen (H₂), Helium (He), Methane (CH₄), Ammonia (NH₃), and', outcome: 'Primordial atmosphere: Hydrogen (H₂), Helium (He), Methane (CH₄), Ammonia (NH₃), and Water Vapour.' },
                { text: 'O₂ was present primordially', outcome: 'Not quite — Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4.', reveals: 'oxygen-appeared-suddenly-and-uniformly' },
                { text: 'oxygen appeared suddenly and uniformly across the planet at the GOE (2', outcome: 'Not quite — Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4.', reveals: 'oxygen-appeared-suddenly-and-uniformly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a science exhibition, a junior\'s model is labelled \'The Big Bang: how a giant cloud of gas exploded to form our Sun and planets.\' As the geography mentor you have to correct the label before judges arrive.',
            decisions: [{ prompt: 'What\'s wrong with the label and what\'s the right pairing?', options: [
                { text: 'Split the two theories: the Big Bang describes the universe expanding from a hot, dense state ~13.8 billion years ago — evidence: galaxies show redshift increasing with distance. The solar system\'s origin is the Nebular Hypothesis: a cold rotating gas-dust cloud collapsed, angular momentum flattened it into a disk, and accretion built the Sun and planets — which is why orbits are coplanar and prograde.', outcome: 'The model gets relabelled \'Nebular Hypothesis — solar system formation\'; the Big Bang belongs to cosmic origins, a different scale and different evidence.' },
                { text: 'Leave it — the Big Bang and the nebula are basically the same explosion story at different times.', outcome: 'That\'s the classic conflation: the nebula wasn\'t the Big Bang; one models the universe\'s expansion, the other the solar system\'s collapse from a gas cloud.', reveals: 'nebula-is-big-bang' },
                { text: 'Fix it differently: write \'Big Bang created the universe from nothing\' and keep the nebula for planets.', outcome: 'The Big Bang describes evolution *from* a hot dense state where known physics breaks down — it doesn\'t explain what caused the singularity or create from \'nothing\'.', reveals: 'big-bang-explains-origin-cause' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The nebula explains a solar system; the Big Bang explains the universe — keep their scopes apart and half the misconceptions die.',
            decisions: [{ prompt: 'What comes next? The Origin and Evolution of the Earth · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Origin and Evolution of the Earth · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_001', difficulty: 'standard',
          question: 'The Nebular Hypothesis is a cosmogonic model proposing that the Solar System.',
          hint: 'Revise Class 11 Physics Chapter 7: "System of Particles and Rotational Motion".',
          misconception: 'Students often conflate the Nebular Hypothesis with the Big Bang Theory, thinking the nebula *was* the Big Bang or that.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Nebular Hypothesis explains why all planets orbit in the same direction and nearly the same plane." Using the concept of angular.', answer: 'As the nebula collapses, its moment of inertia decreases',
                  options: ['As the nebula collapses, its moment of inertia decreases', 'gravity pulls everything flat'],
                  hint: 'Revise Class 11 Physics Chapter 7: "System of Particles and Rotational Motion" — specifically the.',
                  misconception: 'Students often conflate the Nebular Hypothesis with the Big Bang Theory, thinking the nebula *was* the Big Bang or that the hypothesis.' }
          ],
            remediations: { 'students-often-conflate-the-nebular': { steps: ['Draw a two-column table on paper: LEFT = "Nebular Hypothesis (Solar System)", RIGHT = "Big Bang Theory (Universe)".', 'Fill rows: Scale (100 AU vs 93 billion ly), Time (4.6 Ga vs 13.8 Ga), Material (gas/dust vs energy/matter), Outcome.', 'Watch 3-min animation "From Big Bang to Solar System" (NASA/ESA) to visualise the sequence.', 'Write one sentence: "The Nebular Hypothesis operates *inside* a galaxy *after* the Big Bang." This isolates the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate the Nebular Hypothesis with the Big Bang Theory, thinking the nebula *was* the Big Bang or that.',
          parts: [
                { id: 'a', prompt: 'The Nebular Hypothesis struggled to explain the Sun\'s low angular momentum (0.5% of system total) vs. planets\' high angular momentum (99.5%).', answer: 'Magnetic braking is a *modern* modification (1940s onward, Alfvén, Weizsäcker)',
                  options: ['Magnetic braking is a *modern* modification (1940s onward, Alfvén, Weizsäcker)', 'solved it with rings'],
                  hint: 'Revise Class 11 Physics Chapter 7: "System of Particles and Rotational Motion" — specifically the.',
                  misconception: 'Students often conflate the Nebular Hypothesis with the Big Bang Theory, thinking the nebula *was* the Big Bang or that the hypothesis.' }
          ],
            remediations: { 'students-often-conflate-the-nebular': { steps: ['Draw a two-column table on paper: LEFT = "Nebular Hypothesis (Solar System)", RIGHT = "Big Bang Theory (Universe)".', 'Fill rows: Scale (100 AU vs 93 billion ly), Time (4.6 Ga vs 13.8 Ga), Material (gas/dust vs energy/matter), Outcome.', 'Watch 3-min animation "From Big Bang to Solar System" (NASA/ESA) to visualise the sequence.', 'Write one sentence: "The Nebular Hypothesis operates *inside* a galaxy *after* the Big Bang." This isolates the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_002', difficulty: 'standard',
          question: 'The Big Bang Theory is the prevailing cosmological model explaining the origin.',
          hint: 'Revisit c9_geo_ch2_4 (Doppler Effect) and practice: "If a galaxy\'s H-alpha line (656.3.',
          misconception: 'Students believe the Big Bang Theory explains the *origin* of the universe (what caused the singularity) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Big Bang Theory is the prevailing cosmological model explaining the origin and',
                  options: ['The Big Bang Theory is the prevailing cosmological model explaining the origin and', 'The Nebular Hypothesis is a cosmogonic model proposing that the Solar System formed from', 'Formation of stars and galaxies is the gravitational collapse of primordial', 'The solar system originated approximately 4.6 billion years ago from the gravitational'],
                  hint: 'Revisit c9_geo_ch2_4 (Doppler Effect) and practice: "If a galaxy\'s H-alpha line (656.3 nm).',
                  misconception: 'Students believe the Big Bang Theory explains the *origin* of the universe (what caused the singularity) rather than its *evolution from*.' }
          ],
            remediations: { 'the-big-bang-theory-explains': { steps: ['Use the "balloon analogy" — draw galaxies on an uninflated balloon, inflate it. No galaxy is the centre; all separate.', 'Plot Hubble\'s Law data (velocity vs distance) for 5 galaxies — the linear fit gives H₀.', 'Watch NASA\'s "Timeline of the Universe" animation (1 min) — pause at recombination to link CMBR.', 'Write one sentence distinguishing "origin of universe" (metaphysics) from "evolution of universe" (physics).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_003', difficulty: 'standard',
          question: 'Formation of stars and galaxies is the gravitational collapse of primordial.',
          hint: 'Revisit Newton\'s law of gravitation and ideal gas law (Physics Class 11) to recall how.',
          misconception: 'Students often believe galaxies formed *before* stars (like pre-made containers), or that all stars in a galaxy formed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Formation of stars and galaxies is the gravitational collapse of primordial',
                  options: ['Formation of stars and galaxies is the gravitational collapse of primordial', 'The Nebular Hypothesis is a cosmogonic model proposing that the Solar System formed from', 'The Big Bang Theory is the prevailing cosmological model explaining the origin and', 'The solar system originated approximately 4.6 billion years ago from the gravitational'],
                  hint: 'Revisit Newton\'s law of gravitation and ideal gas law (Physics Class 11) to recall how pressure and.',
                  misconception: 'Students often believe galaxies formed *before* stars (like pre-made containers), or that all stars in a galaxy formed simultaneously in.' }
          ],
            remediations: { 'galaxies-formed-before-stars-like': { steps: ['Use a timeline diagram — mark Big Bang (t=0), Recombination (380,000 yr), First Stars (200 Myr), First Galaxies (400.', 'Watch the NCERT-recommended simulation "Cosmic Web Formation" (available on DIKSHA) to visualize hierarchical merging.', 'Re-read the "Formation of Stars" subsection in NCERT Fundamentals of Physical Geography Ch.2, focusing on the phrase.', 'Explain aloud to a peer: "Gravity pulls gas together → core heats up → fusion starts → star shines.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_004', difficulty: 'standard',
          question: 'The solar system originated approximately 4.6 billion years ago from the.',
          hint: 'Revisit c11_phy_cbse_08_001 (Gravitation) — specifically the derivation of angular.',
          misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the.',
          parts: [
                { id: 'a', prompt: 'State the approximate age of the solar system and name the two primary processes that caused the solar nebula to flatten into a protoplanetary disk.', answer: 'The solar system is ~4.6 billion years old',
                  options: ['The solar system is ~4.6 billion years old', 'centrifugal force flung material outward', 'the Sun spit out the planets'],
                  hint: 'Revisit c11_phy_cbse_08_001 (Gravitation) — specifically the derivation of angular momentum.',
                  misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the Sun spit out the.' },
                { id: 'b', prompt: 'A protoplanetary disk has a surface density profile Σ(r) = 1700 (r/1 AU)⁻¹·⁵ kg/m².', answer: 'Step 1: Dust surface density Σ_dust = Σ_gas / 100 = 17 (r/1 AU)⁻¹·⁵ kg/m²',
                  options: ['Step 1: Dust surface density Σ_dust = Σ_gas / 100 = 17 (r/1 AU)⁻¹·⁵ kg/m²', 'the Sun spit out the planets'],
                  hint: 'Revisit c11_phy_cbse_08_001 (Gravitation) — specifically the derivation of angular momentum.',
                  misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the Sun spit out the.' },
                { id: 'c', prompt: 'Compare the angular momentum distribution in the solar system: the Sun has 99.8% of the mass but only ~0.5% of the angular momentum.', answer: 'Mechanism 1: Magnetic braking',
                  options: ['Mechanism 1: Magnetic braking', 'planets stole the angular momentum', 'the Sun spun down by itself', 'the Sun spit out the planets'],
                  hint: 'Revisit c11_phy_cbse_08_001 (Gravitation) — specifically the derivation of angular momentum.',
                  misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the Sun spit out the.' }
          ],
            remediations: { 'the-sun-formed-first-as': { steps: ['Show an ALMA radio image of HL Tauri\'s protoplanetary disk (concentric rings = planet formation in progress).', 'Use a rotating platform with a dripping wet sponge — as it spins faster, water flattens into a disk, mimicking angular.', 'Plot condensation temperatures of Fe, MgSiO₃, H₂O, CH₄, NH₃ against distance from a 1 L⊙ star; students mark where each.', 'Re-read NCERT Class 11 Fundamentals of Physical Geography Chapter 2 sections on "Origin of the Solar System" and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_005', difficulty: 'standard',
          question: 'The lithosphere is the rigid outer layer of the Earth comprising the crust and.',
          hint: 'If stuck on differentiation, review the "iron catastrophe" demo (density column) and the.',
          misconception: 'Students believe the lithosphere formed as a single cooling event — "Earth cooled and the crust solidified like a skin.',
          parts: [
                { id: 'a', prompt: 'State the approximate age of the Earth and the name of the process by which the core separated from the mantle during early Earth history.', answer: 'The Earth is approximately 4.6 billion years old (4.6 Ga)',
                  options: ['The Earth is approximately 4.6 billion years old (4.6 Ga)', 'Earth is 6 billion years old', 'core formed by cooling', 'Earth cooled and the crust solidified like a skin on hot milk'],
                  hint: 'If stuck on differentiation, review the "iron catastrophe" demo (density column) and the concept.',
                  misconception: 'Students believe the lithosphere formed as a single cooling event — "Earth cooled and the crust solidified like a skin on hot milk.".' },
                { id: 'b', prompt: 'Compare the thermal budget of the early Earth (Hadean) with the present Earth.', answer: 'Three more intense Hadean heat sources: (1) Accretional energy',
                  options: ['Three more intense Hadean heat sources: (1) Accretional energy', 'only radioactive decay was higher', 'Earth cooled and the crust solidified like a skin on hot milk'],
                  hint: 'If stuck on differentiation, review the "iron catastrophe" demo (density column) and the concept.',
                  misconception: 'Students believe the lithosphere formed as a single cooling event — "Earth cooled and the crust solidified like a skin on hot milk.".' }
          ],
            remediations: { 'the-lithosphere-formed-as-a': { steps: ['Revisit the "iron catastrophe" concept using a density column demo — layer honey (iron), dish soap (mantle), oil.', 'Plot a cooling curve for Earth with two reheating spikes — one at 4.5 Ga (core formation), one at 3.9 Ga (late heavy.', 'Compare a basalt sample (dense, dark) and a granite/TTG sample (light, buoyant) — calculate their densities (ρ.', 'Read the "Hadean zircon" case study (Jack Hills) to see direct evidence for liquid water and crust at 4.4 Ga.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_006', difficulty: 'standard',
          question: 'The evolution of Earth\'s atmosphere refers to the multi-stage process by which.',
          hint: 'Review the "Degassing and Formation of Secondary Atmosphere" subsection in NCERT Class 11.',
          misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).',
          parts: [
                { id: 'a', prompt: 'Explain why the primordial atmosphere\'s hydrogen and helium escaped to space, while nitrogen and carbon dioxide were retained, using the concepts of molecular.', answer: 'Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses',
                  options: ['Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses', 'gravity pulled heavier gases down', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Review the "Degassing and Formation of Secondary Atmosphere" subsection in NCERT Class 11 Chapter 2.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' },
                { id: 'b', prompt: 'Given that volcanic degassing releases H₂O (60%), CO₂ (20%), SO₂ (10%), N₂ (5%), and trace gases, calculate the approximate partial pressure of CO₂ in the.', answer: 'Step 1: Identify CO₂ fraction = 20% of total outgassed volatiles',
                  options: ['Step 1: Identify CO₂ fraction = 20% of total outgassed volatiles', 'Earth is farther from Sun', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Review the "Degassing and Formation of Secondary Atmosphere" subsection in NCERT Class 11 Chapter 2.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' },
                { id: 'c', prompt: 'Analyse the following statement: "The Great Oxidation Event (GOE) at 2.4 Ga was caused solely by the evolution of cyanobacteria." Identify two additional.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Review the "Degassing and Formation of Secondary Atmosphere" subsection in NCERT Class 11 Chapter 2.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' }
          ],
            remediations: { 'oxygen-appeared-suddenly-and-uniformly': { steps: ['Draw a two-column timeline: left column "Biological Events" (origin of photosynthesis, cyanobacteria, eukaryotes).', 'Mark the GOE at 2.4 Ga as the *crossover point* where O₂ sources exceeded sinks globally.', 'Use the "oxygen sink" analogy: imagine a bathtub (atmosphere) with the drain open (reduced minerals); only when the.', 'Re-read NCERT Class 11 Chapter 2 section "Evolution of the Atmosphere" focusing on the phrase "oxygen began.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
