import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch02_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch02_p2: SimDef = {
    id: 'v3_c11_geo_ch02_p2',
    title: 'The Origin and Evolution of the Earth · Part 2/2',
    subtitle: 'Separate the solar system\'s birth from the universe\'s — and the universe\'s expansion from an explosion.',
    classLevel: 11, subject: 'geography', topic: 'The Origin and Evolution of the Earth · Part 2/2',
    chapters: ['c11_geo_ch02'],
    nodeIds: ['c11_geo_cbse_02_007', 'c11_geo_cbse_02_008', 'c11_geo_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cosmologist correcting a museum exhibit', intro: 'A spinning cloud flattens into a disk; an expanding universe reddens every distant galaxy — two origins, endlessly confused.', goal: 'Distinguish the nebular hypothesis from Big Bang cosmology and interpret redshift correctly.' },
    discovery: {
        question: '\'The Big Bang was an explosion in space that threw matter outward from a central point.\' How many errors can you find in that sentence?',
        options: ['Three — it was an expansion OF space itself, there is no centre, and matter wasn\'t thrown through anything', 'One — only the \'central point\' part is wrong', 'None — that is what the theory says', 'Two — it was hot, not an explosion, and not centred'],
        answer: 'Three — it was an expansion OF space itself, there is no centre, and matter wasn\'t thrown through anything',
        hook: 'Raisins in rising dough — every galaxy sees the others recede, because space itself is stretching, not because anything flew outward.',
    },
    teaching: [
        { title: 'Evolution of the Hydrosphere and Formation of Oceans', text: 'The evolution of the hydrosphere refers to the geological process by which water vapor released through volcanic degassing and delivered by cometary impacts condensed into liquid water as Earth.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute how a collapsing nebula spins up as it flattens, then use redshift and Hubble\'s law to turn a galaxy\'s colour into a distance.',
        labels: ['Evolution of the Hydrosphere', 'Origin of Life', 'Geological Time Scale: Eons,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_007', title: 'Evolution of the Hydrosphere and Formation of Oceans',
          scaffold: { problem: 'Using the modern riverine sodium flux (6.2 × 10¹⁰ mol/yr) and the total ocean sodium inventory (5.0 × 10¹⁸ mol), calculate the residence.',
            steps: [
            { text: 'Identify the formula for residence time: τ = Inventory / Input Flux (assuming steady state where input ≈ output).' },
            { text: 'Substitute the given values: τ = (5.0 × 10¹⁸ mol) / (6.2 × 10¹⁰ mol/yr).' },
            { text: 'Perform the division: τ = 8.06 × 10⁷ yr ≈ 80.6 million years.' },
            { text: 'Compare this residence time (80 Myr) to Earth\'s age (4,600 Myr).' },
            { text: 'Conclude that if oceans were primordial with no input/output, sodium would accumulate indefinitely.', faded: true, blankAnswer: 'Residence time of Na⁺ ≈ 80.6 million years. This is <2%.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_008', title: 'Origin of Life on Earth: Biological Evolution',
          caseStudy: { intro: 'Imagine you are standing at the Stromatolite Fossil Park in Chitrakoot, Uttar Pradesh, looking at layered rocks formed by cyanobacteria 1.6 billion years ago.',
            decisions: [{ prompt: 'State the composition of the Earth\'s primordial atmosphere as proposed by the Oparin-Haldane hypothesis and identify the energy sources.', options: [
                { text: 'The primordial atmosphere was reducing, containing methane (CH₄), ammonia (NH₃), water', outcome: 'The primordial atmosphere was reducing, containing methane (CH₄), ammonia (NH₃), water vapour.' },
                { text: 'primordial soup', outcome: 'Not quite — Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.', reveals: 'the-primordial-soup-was-a' },
                { text: 'O₂ or omitting CH₄/NH₃', outcome: 'Not quite — Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.', reveals: 'the-primordial-soup-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_009', title: 'Geological Time Scale: Eons, Eras and Periods',
          caseStudy: { intro: 'Imagine standing at the Grand Canyon or a road-cut in the Aravallis where you see distinct horizontal layers of rock stacked like pages of a book.',
            decisions: [{ prompt: 'Name the four Eons of the Geological Time Scale in correct chronological order from oldest to youngest.', options: [
                { text: 'Correct answer: Hadean → Archean → Proterozoic → Phanerozoic', outcome: 'Correct answer: Hadean → Archean → Proterozoic → Phanerozoic. A wrong answer (e.g., placing Archean.' },
                { text: 'Archean', outcome: 'Not quite — Students memorize the *names* and *order* of Periods (e.g., "Cambrian, Ordovician, Silurian...").', reveals: 'students-memorize-the-names-and' },
                { text: 'oldest', outcome: 'Not quite — Students memorize the *names* and *order* of Periods (e.g., "Cambrian, Ordovician, Silurian...").', reveals: 'students-memorize-the-names-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a science exhibition, a junior\'s model is labelled \'The Big Bang: how a giant cloud of gas exploded to form our Sun and planets.\' As the geography mentor you have to correct the label before judges arrive.',
            decisions: [{ prompt: 'What\'s wrong with the label and what\'s the right pairing?', options: [
                { text: 'Split the two theories: the Big Bang describes the universe expanding from a hot, dense state ~13.8 billion years ago — evidence: galaxies show redshift increasing with distance. The solar system\'s origin is the Nebular Hypothesis: a cold rotating gas-dust cloud collapsed, angular momentum flattened it into a disk, and accretion built the Sun and planets — which is why orbits are coplanar and prograde.', outcome: 'The model gets relabelled \'Nebular Hypothesis — solar system formation\'; the Big Bang belongs to cosmic origins, a different scale and different evidence.' },
                { text: 'Leave it — the Big Bang and the nebula are basically the same explosion story at different times.', outcome: 'That\'s the classic conflation: the nebula wasn\'t the Big Bang; one models the universe\'s expansion, the other the solar system\'s collapse from a gas cloud.', reveals: 'nebula-is-big-bang' },
                { text: 'Fix it differently: write \'Big Bang created the universe from nothing\' and keep the nebula for planets.', outcome: 'The Big Bang describes evolution *from* a hot dense state where known physics breaks down — it doesn\'t explain what caused the singularity or create from \'nothing\'.', reveals: 'big-bang-explains-origin-cause' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_02_009', title: 'You made it',
          caseStudy: { intro: 'The nebula explains a solar system; the Big Bang explains the universe — keep their scopes apart and half the misconceptions die.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_007', difficulty: 'standard',
          question: 'The evolution of the hydrosphere refers to the geological process by which.',
          hint: 'If stuck, revisit "c11_geo_cbse_02_005: Evolution of Earth: Formation of the Lithosphere".',
          misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean.',
          parts: [
                { id: 'a', prompt: 'Explain why the early oceans were likely more acidic and less saline than modern oceans, linking this to the composition of the primordial atmosphere and the.', answer: 'The primordial atmosphere was rich in CO₂ (from volcanic outgassing)',
                  options: ['The primordial atmosphere was rich in CO₂ (from volcanic outgassing)', 'less evaporation', 'Earth\'s water came from space'],
                  hint: 'If stuck, revisit "c11_geo_cbse_02_005: Evolution of Earth: Formation of the Lithosphere".',
                  misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean salinity has been.' },
                { id: 'b', prompt: 'Compare the role of hydrothermal circulation at mid-ocean ridges in the Archean versus today in controlling ocean salinity and composition.', answer: 'In the Archean, higher mantle heat flow produced faster spreading rates and more',
                  options: ['In the Archean, higher mantle heat flow produced faster spreading rates and more', 'hydrothermal vents add salt', 'Earth\'s water came from space'],
                  hint: 'If stuck, revisit "c11_geo_cbse_02_005: Evolution of Earth: Formation of the Lithosphere".',
                  misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean salinity has been.' }
          ],
            remediations: { 'oceans-formed-primarily-from-comet': { steps: ['Use a two-column table to compare "Comet-only" vs. "Degassing + Comets" water budget estimates (cite Marty 2012.', 'Plot a timeline: 4.4 Ga (zircon evidence) → 4.0 Ga (oldest rocks) → 3.8 Ga (Isua sediments) → 2.5 Ga (Great Oxidation.', 'Calculate a simple mass balance: modern river input of Na⁺ = 6.2×10¹⁰ mol/yr; ocean Na⁺ inventory = 5.0×10¹⁸ mol.', 'Re-read NCERT Class 11 Fundamentals of Physical Geography, Chapter 2, sections on "Evolution of the Hydrosphere" and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_008', difficulty: 'standard',
          question: 'The origin of life on Earth refers to the natural process by which non-living.',
          hint: 'If stuck, immediately revisit c11_geo_cbse_02_006 (primordial atmosphere composition) and.',
          misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.',
          parts: [
                { id: 'a', prompt: 'Compare the evolutionary significance of the following two transitions: (a) prokaryote → eukaryote (endosymbiosis) and (b) anaerobic → aerobic metabolism.', answer: 'Transition (b) had greater geographical impact',
                  options: ['Transition (b) had greater geographical impact', 'primordial soup', 'the "primordial soup" was a uniform, dilute broth in the open ocean'],
                  hint: 'If stuck, immediately revisit c11_geo_cbse_02_006 (primordial atmosphere composition) and.',
                  misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.' }
          ],
            remediations: { 'the-primordial-soup-was-a': { steps: ['Re-read the "Evolution of the Hydrosphere" node (c11_geo_cbse_02_007) focusing on hydrothermal vents and tidal zones.', 'Watch a 5-min animation of the "alkaline hydrothermal vent" hypothesis (e.g., Lane & Martin 2012) showing how pore.', 'On an outline map of early Earth, mark three *specific* geographical settings where concentration could occur (volcanic.', 'Explain aloud to a peer why each setting solves the dilution problem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The ozone layer formed *before* photosynthetic life, protecting early organisms from UV radiation and allowing them to evolve on land."', answer: 'The statement is false',
                  options: ['The statement is false', 'primordial soup', 'the "primordial soup" was a uniform, dilute broth in the open ocean'],
                  hint: 'If stuck, immediately revisit c11_geo_cbse_02_006 (primordial atmosphere composition) and.',
                  misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.' }
          ],
            remediations: { 'the-primordial-soup-was-a': { steps: ['Re-read the "Evolution of the Hydrosphere" node (c11_geo_cbse_02_007) focusing on hydrothermal vents and tidal zones.', 'Watch a 5-min animation of the "alkaline hydrothermal vent" hypothesis (e.g., Lane & Martin 2012) showing how pore.', 'On an outline map of early Earth, mark three *specific* geographical settings where concentration could occur (volcanic.', 'Explain aloud to a peer why each setting solves the dilution problem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_009', difficulty: 'standard',
          question: 'The Geological Time Scale is a chronological framework that divides Earth\'s.',
          hint: 'If stuck, revisit the Law of Superposition and Index Fossils from Class 9 (c9_geo_ch1_7).',
          misconception: 'Students memorize the *names* and *order* of Periods (e.g., "Cambrian, Ordovician, Silurian...") as a list but treat.',
          parts: [
                { id: 'a', prompt: 'Name the four Eons of the Geological Time Scale in correct chronological order from oldest to youngest.', answer: 'Correct answer: Hadean → Archean → Proterozoic → Phanerozoic',
                  options: ['Correct answer: Hadean → Archean → Proterozoic → Phanerozoic', 'Archean', 'oldest', 'hellish'],
                  hint: 'If stuck, revisit the Law of Superposition and Index Fossils from Class 9 (c9_geo_ch1_7) and the.',
                  misconception: 'Students memorize the *names* and *order* of Periods (e.g., "Cambrian, Ordovician, Silurian...") as a list but treat the boundaries.' }
          ],
            remediations: { 'students-memorize-the-names-and': { steps: ['Take the student to a local geological exposure (road cut, river bank) or show high-res photos of a GSSP site (e.g.', 'Point out the physical "golden spike" marker and the distinct change in fossil assemblage across < 10 cm of rock.', 'Have them plot the *numerical age* (from radiometric dating of interbedded ash) vs.', '*stratigraphic height* for 3-4 GSSPs to see that time is not linear with thickness.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
