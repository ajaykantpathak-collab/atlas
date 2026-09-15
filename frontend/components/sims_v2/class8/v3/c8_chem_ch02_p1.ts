import type { SimDef } from '../../engine/types';

/** v3 generated — c8_chem_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_chem_ch02_p1: SimDef = {
    id: 'v3_c8_chem_ch02_p1',
    title: 'Particulate Nature of Matter · Part 1/2',
    subtitle: 'Prove everything is made of invisible moving particles',
    classLevel: 8, subject: 'chemistry', topic: 'Particulate Nature of Matter · Part 1/2',
    chapters: ['c8_chem_ch02'],
    nodeIds: ['c8_chem_ch2_1', 'c8_chem_ch2_10', 'c8_chem_ch2_11', 'c8_chem_ch2_12', 'c8_chem_ch2_2', 'c8_chem_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a particle detective', intro: 'A spoonful of sugar disappears into a glass of water and incense smell crosses a closed room. Your job: explain both with one invisible idea — matter is made of moving particles.', goal: 'Establish the particulate nature of matter and use it to explain dissolving, diffusion and the states of matter.' },
    discovery: {
        question: 'Drop sugar into water and stir — it vanishes, yet the water tastes sweet and nothing is left at the bottom. No microscope shows the sugar. Where did it physically GO?',
        options: ['It broke into particles too small to see, slipping into the empty spaces between water particles — matter is grainy, not continuous', 'It chemically reacted with water and ceased to exist', 'It evaporated into the air above the glass', 'It turned into heat energy and disappeared'],
        answer: 'It broke into particles too small to see, slipping into the empty spaces between water particles — matter is grainy, not continuous',
        hook: 'Water looks continuous but it\'s full of gaps — sugar particles park in them. The disappearance is proof that everything around you is made of tiny, separate, moving pieces.',
    },
    teaching: [
        { title: 'What is Matter Composed of? Breaking Down Substances', text: 'Matter is composed of extremely small, discrete particles called atoms and molecules that cannot be seen with the naked eye.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_chem_ch2_1', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Prove the invisible: show particles exist through diffusion, dissolving and motion; then sort solids, liquids and gases by how tightly their particles hold hands.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c8_chem_ch2_10', title: 'Inter-particle Attraction: Strong, Moderate, Weak',
          caseStudy: { intro: 'When you try to push your finger through a solid wooden desk in your classroom, your finger cannot pass through because the particles inside the desk are held.',
            decisions: [{ prompt: 'Which state of matter possesses the strongest inter-particle attractive forces, and how does this affect its shape?', options: [
                { text: 'Solids possess the strongest inter-particle attractive forces', outcome: 'Solids possess the strongest inter-particle attractive forces, which lock particles into fixed.' },
                { text: 'more space means stronger attraction', outcome: 'Not quite — Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical.', reveals: 'inter-particle-attraction-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_11', title: 'Changes of State: Melting, Freezing, Boiling, Condensation',
          caseStudy: { intro: 'When you take ice cubes straight out of the freezer and leave them in a steel tumbler on a warm summer afternoon in Delhi, you notice they turn into water, and.',
            decisions: [{ prompt: 'What happens to the movement and kinetic energy of water molecules when liquid water freezes into ice inside a refrigerator tray?', options: [
                { text: 'The kinetic energy of the water molecules decreases, and their movement slows down until', outcome: 'The kinetic energy of the water molecules decreases, and their movement slows down until they are.' },
                { text: 'that molecules move faster or gain energy during freezing', outcome: 'Not quite — Students frequently believe that substances change their actual chemical composition during melting.', reveals: 'students-frequently-believe-that-substances' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_12', title: 'Sublimation: Direct Change from Solid to Gas',
          caseStudy: { intro: 'Imagine placing a piece of camphor in your winter wardrobe to keep insects away, and noticing weeks later that it has completely vanished without leaving any.',
            decisions: [{ prompt: 'What term describes the direct phase change of a substance from a solid directly into a gas without forming a liquid?', options: [
                { text: 'sublimation', outcome: 'The correct answer is sublimation. A student who answers "melting" fails to recognize that melting.' },
                { text: 'melting', outcome: 'Not quite — Students often confuse sublimation with evaporation, assuming that because a solid disappears into.', reveals: 'students-often-confuse-sublimation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_2', title: 'Constituent Particles: Basic Building Blocks of Matter',
          caseStudy: { intro: 'When you dissolve a spoonful of sugar in a glass of water for nimbu pani, the sugar seems to disappear completely, yet the water becomes sweet throughout.',
            decisions: [{ prompt: 'What term is used to describe the fundamental building blocks that make up all matter around us?', options: [
                { text: 'The fundamental building blocks of matter are called constituent particles', outcome: 'The fundamental building blocks of matter are called constituent particles, which include atoms.' },
                { text: 'atoms only', outcome: 'Not quite — Students often believe that constituent particles of a substance possess the exact same macroscopic.', reveals: 'constituent-particles-of-a-substance' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_3', title: 'Atoms: Smallest Unit of an Element',
          caseStudy: { intro: 'When you look at a pure iron rod used in construction, or a piece of pure copper wire, you see a solid mass of metal.',
            decisions: [{ prompt: 'What is the term for the smallest unit of an element that retains the chemical properties of that element?', options: [
                { text: 'an atom', outcome: 'The correct answer is an atom. A student who answers "molecule" has confused the smallest unit.' },
                { text: 'molecule', outcome: 'Not quite — Students often confuse atoms with molecules, thinking that an element like oxygen always exists.', reveals: 'students-often-confuse-atoms-with' },
                { text: 'atoms can be easily seen with a standard school microscope', outcome: 'Not quite — Students often confuse atoms with molecules, thinking that an element like oxygen always exists.', reveals: 'students-often-confuse-atoms-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'At lunch, Diya stirs two spoons of salt into a full glass of water. The salt disappears and the water level barely rises. Her brother concludes, \'The salt is gone — it merged into the water.\'',
            decisions: [{ prompt: 'What really happened to the salt?', options: [
                { text: 'It broke into countless invisible particles that slipped into the empty spaces between water particles — which is why the level hardly rose and the water tastes uniformly salty. The salt is still there, just dispersed.', outcome: 'This uses the particulate model correctly: matter is made of discrete particles with gaps between them, so dissolving spreads rather than destroys.' },
                { text: 'The brother is right — once it disappears from sight, the salt has fused into water as a single continuous material.', outcome: 'Matter is not a continuous sheet; the salt\'s particles are intact and recoverable by evaporation — disappearance is dispersion, not fusion.', reveals: 'dissolved-means-gone' },
                { text: 'The salt turned into water molecules, which is why the volume did not increase.', outcome: 'No chemical change happened — the particles are still salt, sitting in the gaps between water particles; boiling water does not even break H2O into atoms, let alone salt.', reveals: 'salt-became-water' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'You can\'t see particles — but you can see their effects: smells travelling, sugar dissolving, gases filling rooms. Matter is a crowd of invisible movers.',
            decisions: [{ prompt: 'What comes next? Particulate Nature of Matter · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Particulate Nature of Matter · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_chem_ch2_1', difficulty: 'standard',
          question: 'Matter is composed of extremely small, discrete particles called atoms and.',
          hint: 'Review basic material properties and physical changes in c7_chem_ch02_002 before studying.',
          misconception: 'Students often think that when a solid dissolves in a liquid (like salt in water), the solid matter vanishes or turns.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matter is composed of extremely small, discrete particles called atoms and molecules that',
                  options: ['Matter is composed of extremely small, discrete particles called atoms and molecules that', 'Inter-particle attraction refers to the attractive forces acting between the constituent', 'Changes of state are physical processes in', 'Sublimation is the direct phase transition of a substance from its solid state to its'],
                  hint: 'Review basic material properties and physical changes in c7_chem_ch02_002 before studying particle.',
                  misconception: 'Students often think that when a solid dissolves in a liquid (like salt in water), the solid matter vanishes or turns completely into.' }
          ],
            remediations: { 'when-a-solid-dissolves-in': { steps: ['To correct this, take a glass of water, weigh it on a kitchen scale, dissolve two spoons of salt in it, and weigh.', 'Point out that the total weight remains the sum of both, proving the solid substance is still present in the form.', 'Then, taste the water to prove the salt\'s properties are retained.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_10', difficulty: 'standard',
          question: 'Inter-particle attraction refers to the attractive forces acting between the.',
          hint: 'Review node c8_chem_ch2_9 to understand how empty space varies between particles before.',
          misconception: 'Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical barrier, or they.',
          parts: [
                { id: 'a', prompt: 'Which state of matter possesses the strongest inter-particle attractive forces, and how does this affect its shape?', answer: 'Solids possess the strongest inter-particle attractive forces',
                  options: ['Solids possess the strongest inter-particle attractive forces', 'more space means stronger attraction'],
                  hint: 'Review node c8_chem_ch2_9 to understand how empty space varies between particles before studying.',
                  misconception: 'Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical barrier, or they confuse inter-particle.' },
                { id: 'b', prompt: 'Why do liquid particles have the ability to flow and take the shape of their container, unlike solid particles?', answer: 'Liquid particles experience moderate inter-particle attraction',
                  options: ['Liquid particles experience moderate inter-particle attraction', 'more space means stronger attraction', 'liquids have zero attraction, confusing them with gases'],
                  hint: 'Review node c8_chem_ch2_9 to understand how empty space varies between particles before studying.',
                  misconception: 'Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical barrier, or they confuse inter-particle.' },
                { id: 'c', prompt: 'Analyze what happens to the inter-particle attraction of a solid substance when it melts into a liquid. Does the attraction completely disappear?', answer: 'When a solid melts, thermal energy increases particle movement',
                  options: ['When a solid melts, thermal energy increases particle movement', 'more space means stronger attraction'],
                  hint: 'Review node c8_chem_ch2_9 to understand how empty space varies between particles before studying.',
                  misconception: 'Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical barrier, or they confuse inter-particle.' }
          ],
            remediations: { 'inter-particle-attraction-is-a': { steps: ['To correct this, have the student visualize magnets: when magnets are close together, their attraction is strong; when.', 'Relate this directly to matter: gas particles are far apart (weak attraction), while solid particles are tightly packed.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical barrier, or they.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Gas particles exert zero inter-particle attraction on each other because they fly around freely in all directions." Is this statement.', answer: 'The statement is scientifically inaccurate',
                  options: ['The statement is scientifically inaccurate', 'more space means stronger attraction'],
                  hint: 'Review node c8_chem_ch2_9 to understand how empty space varies between particles before studying.',
                  misconception: 'Students often believe that inter-particle attraction is a physical physical "glue" or a mechanical barrier, or they confuse inter-particle.' }
          ],
            remediations: { 'inter-particle-attraction-is-a': { steps: ['To correct this, have the student visualize magnets: when magnets are close together, their attraction is strong; when.', 'Relate this directly to matter: gas particles are far apart (weak attraction), while solid particles are tightly packed.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_11', difficulty: 'standard',
          question: 'Changes of state are physical processes in which matter transitions between.',
          hint: 'Review particle arrangement and inter-particle forces in solids and liquids before.',
          misconception: 'Students frequently believe that substances change their actual chemical composition during melting or boiling (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Changes of state are physical processes in',
                  options: ['Changes of state are physical processes in', 'Matter is composed of extremely small, discrete particles called atoms and molecules that', 'Inter-particle attraction refers to the attractive forces acting between the constituent', 'Sublimation is the direct phase transition of a substance from its solid state to its'],
                  hint: 'Review particle arrangement and inter-particle forces in solids and liquids before attempting state.',
                  misconception: 'Students frequently believe that substances change their actual chemical composition during melting or boiling (e.g., thinking ice melts.' }
          ],
            remediations: { 'students-frequently-believe-that-substances': { steps: ['To correct this, take water in its three states (ice, liquid water, steam) and write down the chemical formula $H_2O$.', 'Remind the student that the same building blocks are present, but like people in a crowded room sitting down (solid).', 'Have the student sketch particle diagrams showing that individual particle circles remain the exact same size while the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_12', difficulty: 'standard',
          question: 'Sublimation is the direct phase transition of a substance from its solid state.',
          hint: 'Review particle arrangement and melting points in c8_chem_ch2_5 and c8_chem_ch2_11.',
          misconception: 'Students often confuse sublimation with evaporation, assuming that because a solid disappears into the air (like.',
          parts: [
                { id: 'a', prompt: 'What term describes the direct phase change of a substance from a solid directly into a gas without forming a liquid?', answer: 'sublimation',
                  options: ['sublimation', 'melting'],
                  hint: 'Review particle arrangement and melting points in c8_chem_ch2_5 and c8_chem_ch2_11.',
                  misconception: 'Students often confuse sublimation with evaporation, assuming that because a solid disappears into the air (like camphor or naphthalene.' }
          ],
            remediations: { 'students-often-confuse-sublimation-with': { steps: ['To fix this misconception, guide the student to observe a piece of iodine or camphor crystals in a sealed glass jar.', 'Ask them to look closely at the surface of the solid: point out the complete absence of any wetness or liquid puddle.', 'Emphasize that the particles leap straight from a tightly packed solid array into freely moving gas particles.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_2', difficulty: 'standard',
          question: 'Constituent particles are the fundamental, indivisible building blocks—such.',
          hint: 'Review Class 6 material classification and observe how mixing salt in water demonstrates.',
          misconception: 'Students often believe that constituent particles of a substance possess the exact same macroscopic properties as the.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe the fundamental building blocks that make up all matter around us?', answer: 'The fundamental building blocks of matter are called constituent particles',
                  options: ['The fundamental building blocks of matter are called constituent particles', 'atoms only'],
                  hint: 'Review Class 6 material classification and observe how mixing salt in water demonstrates space.',
                  misconception: 'Students often believe that constituent particles of a substance possess the exact same macroscopic properties as the bulk substance—for.' },
                { id: 'b', prompt: 'When a solid dissolves in a liquid, why does the volume of the liquid not increase significantly, even though matter has been added?', answer: 'The volume does not increase significantly',
                  options: ['The volume does not increase significantly', 'the solid vanishes into nothing'],
                  hint: 'Review Class 6 material classification and observe how mixing salt in water demonstrates space.',
                  misconception: 'Students often believe that constituent particles of a substance possess the exact same macroscopic properties as the bulk substance—for.' }
          ],
            remediations: { 'constituent-particles-of-a-substance': { steps: ['To correct this, guide the student through a scaling analogy: a single brick is not a house, and a single thread.', 'Remind them that microscopic constituent particles behave according to physical forces and spacing, whereas macroscopic.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_3', difficulty: 'standard',
          question: 'An atom is the smallest unit of an element that retains all the chemical.',
          hint: 'Review c8_chem_ch2_2 to reinforce how constituent particles make up everyday materials.',
          misconception: 'Students often confuse atoms with molecules, thinking that an element like oxygen always exists as individual isolated.',
          parts: [
                { id: 'a', prompt: 'What is the term for the smallest unit of an element that retains the chemical properties of that element?', answer: 'an atom',
                  options: ['an atom', 'molecule', 'atoms can be easily seen with a standard school microscope'],
                  hint: 'Review c8_chem_ch2_2 to reinforce how constituent particles make up everyday materials before.',
                  misconception: 'Students often confuse atoms with molecules, thinking that an element like oxygen always exists as individual isolated atoms (O) rather.' },
                { id: 'b', prompt: 'If you have a pure sample of copper wire weighing 10 grams, what fundamental particles make up this element?', answer: 'copper atoms (Cu)',
                  options: ['copper atoms (Cu)', 'copper molecules', 'compounds', 'atoms can be easily seen with a standard school microscope'],
                  hint: 'Review c8_chem_ch2_2 to reinforce how constituent particles make up everyday materials before.',
                  misconception: 'Students often confuse atoms with molecules, thinking that an element like oxygen always exists as individual isolated atoms (O) rather.' }
          ],
            remediations: { 'students-often-confuse-atoms-with': { steps: ['To fix this, guide the student to examine the chemical symbols on the periodic table (e.g., Cu, Fe, Na) representing.', 'Explain that macroscopic properties like "shininess" or "hardness" arise from how millions of atoms interact together.', 'Use the brick wall analogy: one brick doesn\'t have a "doorway," but many bricks arranged correctly do.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
