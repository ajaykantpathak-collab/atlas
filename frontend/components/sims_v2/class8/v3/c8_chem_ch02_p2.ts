import type { SimDef } from '../../engine/types';

/** v3 generated — c8_chem_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_chem_ch02_p2: SimDef = {
    id: 'v3_c8_chem_ch02_p2',
    title: 'Particulate Nature of Matter · Part 2/2',
    subtitle: 'Prove everything is made of invisible moving particles',
    classLevel: 8, subject: 'chemistry', topic: 'Particulate Nature of Matter · Part 2/2',
    chapters: ['c8_chem_ch02'],
    nodeIds: ['c8_chem_ch2_4', 'c8_chem_ch2_5', 'c8_chem_ch2_6', 'c8_chem_ch2_7', 'c8_chem_ch2_8', 'c8_chem_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a particle detective', intro: 'A spoonful of sugar disappears into a glass of water and incense smell crosses a closed room. Your job: explain both with one invisible idea — matter is made of moving particles.', goal: 'Establish the particulate nature of matter and use it to explain dissolving, diffusion and the states of matter.' },
    discovery: {
        question: 'Drop sugar into water and stir — it vanishes, yet the water tastes sweet and nothing is left at the bottom. No microscope shows the sugar. Where did it physically GO?',
        options: ['It broke into particles too small to see, slipping into the empty spaces between water particles — matter is grainy, not continuous', 'It chemically reacted with water and ceased to exist', 'It evaporated into the air above the glass', 'It turned into heat energy and disappeared'],
        answer: 'It broke into particles too small to see, slipping into the empty spaces between water particles — matter is grainy, not continuous',
        hook: 'Water looks continuous but it\'s full of gaps — sugar particles park in them. The disappearance is proof that everything around you is made of tiny, separate, moving pieces.',
    },
    teaching: [
        { title: 'Molecules: Combination of Atoms (H2O, O2, CO2)', text: 'A molecule is a group of two or more atoms chemically combined together in a fixed ratio, representing the smallest unit of a pure substance that can exist independently and retain its chemical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_chem_ch2_4', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Prove the invisible: show particles exist through diffusion, dissolving and motion; then sort solids, liquids and gases by how tightly their particles hold hands.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c8_chem_ch2_5', title: 'States of Matter: Solid, Liquid, Gas - Particle Arrangement',
          caseStudy: { intro: 'When you open a bottle of perfume in a corner of your living room, the fragrance eventually spreads throughout the entire room, whereas the glass bottle itself.',
            decisions: [{ prompt: 'Which of the following best describes the arrangement and movement of particles in a solid substance, such as an iron nail?', options: [
                { text: 'Particles are closely packed in a fixed, regular pattern and can only vibrate about their', outcome: 'Particles are closely packed in a fixed, regular pattern and can only vibrate about their mean.' },
                { text: 'particles are far apart and move randomly', outcome: 'Not quite — Students often believe that individual particles (molecules or atoms) expand when a substance.', reveals: 'individual-particles-molecules-or-atoms' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_7', title: 'Particle Arrangement and Movement in Liquids',
          caseStudy: { intro: 'Pouring water from a jug into a glass in your kitchen shows how liquids flow and take the shape of any container they are placed into, unlike a solid spoon.',
            decisions: [{ prompt: 'Why do liquids take the shape of the container they are poured into, unlike solids?', options: [
                { text: 'Liquids take the container\'s shape', outcome: 'Liquids take the container\'s shape because their particles are not held in fixed positions and can.' },
                { text: 'liquids are easily compressible or that they will expand to fill any size room', outcome: 'Not quite — Students often believe that liquid particles are spaced as far apart as gas particles, leading them.', reveals: 'liquid-particles-are-spaced-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_9', title: 'Inter-particle Space: Varies Across States of Matter',
          caseStudy: { intro: 'When you compress a bicycle pump with its nozzle blocked, you notice that the air inside can be pushed down easily, whereas trying to compress a solid block.',
            decisions: [{ prompt: 'Which state of matter possesses the largest inter-particle space among solids, liquids, and gases?', options: [
                { text: 'Gases possess the largest inter-particle space', outcome: 'Gases possess the largest inter-particle space. If a student answers "solids" or "liquids,".' },
                { text: 'solids', outcome: 'Not quite — Students often believe that inter-particle space within liquids and gases is filled with air.', reveals: 'inter-particle-space-within-liquids' },
                { text: 'liquids', outcome: 'Not quite — Students often believe that inter-particle space within liquids and gases is filled with air.', reveals: 'inter-particle-space-within-liquids' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'At lunch, Diya stirs two spoons of salt into a full glass of water. The salt disappears and the water level barely rises. Her brother concludes, \'The salt is gone — it merged into the water.\'',
            decisions: [{ prompt: 'What really happened to the salt?', options: [
                { text: 'It broke into countless invisible particles that slipped into the empty spaces between water particles — which is why the level hardly rose and the water tastes uniformly salty. The salt is still there, just dispersed.', outcome: 'This uses the particulate model correctly: matter is made of discrete particles with gaps between them, so dissolving spreads rather than destroys.' },
                { text: 'The brother is right — once it disappears from sight, the salt has fused into water as a single continuous material.', outcome: 'Matter is not a continuous sheet; the salt\'s particles are intact and recoverable by evaporation — disappearance is dispersion, not fusion.', reveals: 'dissolved-means-gone' },
                { text: 'The salt turned into water molecules, which is why the volume did not increase.', outcome: 'No chemical change happened — the particles are still salt, sitting in the gaps between water particles; boiling water does not even break H2O into atoms, let alone salt.', reveals: 'salt-became-water' }
            ] }] } },
        { type: 'case', nodeId: 'c8_chem_ch2_9', title: 'You made it',
          caseStudy: { intro: 'You can\'t see particles — but you can see their effects: smells travelling, sugar dissolving, gases filling rooms. Matter is a crowd of invisible movers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_chem_ch2_4', difficulty: 'standard',
          question: 'A molecule is a group of two or more atoms chemically combined together in.',
          hint: 'Review node c8_chem_ch2_3 to reinforce what an individual atom is before attempting.',
          misconception: 'Students often confuse the subscript number in a chemical formula with the number of molecules, thinking that $2H_2O$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A molecule is a group of two or more atoms chemically combined together in a fixed ratio,',
                  options: ['A molecule is a group of two or more atoms chemically combined together in a fixed ratio,', 'Matter is composed of extremely small, discrete particles called atoms and molecules that', 'Inter-particle attraction refers to the attractive forces acting between the constituent', 'Changes of state are physical processes in'],
                  hint: 'Review node c8_chem_ch2_3 to reinforce what an individual atom is before attempting to combine them.',
                  misconception: 'Students often confuse the subscript number in a chemical formula with the number of molecules, thinking that $2H_2O$ means two separate.' }
          ],
            remediations: { 'students-often-confuse-the-subscript': { steps: ['To fix this error, use visual particle cards: draw one large oxygen circle bonded to two small hydrogen circles.', 'Next, compare $H_2O$ (water) with $H_2O_2$ (hydrogen peroxide) to demonstrate how changing the subscript completely.', 'Have the student physically count the atoms in diagrams for $O_2$, $H_2O$, and $CO_2$ multiple times until the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_5', difficulty: 'standard',
          question: 'Matter exists in three primary states—solid, liquid, and gas—which are.',
          hint: 'Review c8_chem_ch2_4 to understand what molecules are before studying how they arrange.',
          misconception: 'Students often believe that individual particles (molecules or atoms) expand when a substance is heated or change their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matter exists in three primary states—solid, liquid, and gas—which are determined by how',
                  options: ['Matter exists in three primary states—solid, liquid, and gas—which are determined by how', 'Matter is composed of extremely small, discrete particles called atoms and molecules that', 'Inter-particle attraction refers to the attractive forces acting between the constituent', 'Changes of state are physical processes in'],
                  hint: 'Review c8_chem_ch2_4 to understand what molecules are before studying how they arrange themselves.',
                  misconception: 'Students often believe that individual particles (molecules or atoms) expand when a substance is heated or change their state (e.g.' }
          ],
            remediations: { 'individual-particles-molecules-or-atoms': { steps: ['To fix this misconception, guide the student through a visual comparison: draw individual circles representing water.', 'Emphasize that the drawn circles do not change in size across any of the three drawings—only the empty space between.', 'Reinforce this by showing that melting or boiling is a physical change where spacing changes, not the particle.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_6', difficulty: 'standard',
          question: 'In solids, particles are tightly packed in a fixed, regular pattern with very.',
          hint: 'Review c8_chem_ch2_5 to refresh memory on how particle arrangement generally differs.',
          misconception: 'Students often think that particles inside a solid object (such as a wooden block or a piece of copper wire) are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In solids, particles are tightly packed in a fixed, regular pattern with very little',
                  options: ['In solids, particles are tightly packed in a fixed, regular pattern with very little', 'Matter is composed of extremely small, discrete particles called atoms and molecules that', 'Inter-particle attraction refers to the attractive forces acting between the constituent', 'Changes of state are physical processes in'],
                  hint: 'Review c8_chem_ch2_5 to refresh memory on how particle arrangement generally differs among the.',
                  misconception: 'Students often think that particles inside a solid object (such as a wooden block or a piece of copper wire) are completely stationary and.' }
          ],
            remediations: { 'particles-inside-a-solid-object': { steps: ['To fix this misconception, have the student hold their hands tightly against their neighbors\' shoulders in a packed.', 'Emphasize that while walking around is forbidden (no flow), the wiggling motion represents continuous thermal vibration.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_7', difficulty: 'standard',
          question: 'In liquids, constituent particles (atoms or molecules) are closely packed.',
          hint: 'Review c8_chem_ch2_6 to contrast rigid solid structures with mobile liquid structures.',
          misconception: 'Students often believe that liquid particles are spaced as far apart as gas particles, leading them to think that.',
          parts: [
                { id: 'a', prompt: 'Why do liquids take the shape of the container they are poured into, unlike solids?', answer: 'Liquids take the container\'s shape',
                  options: ['Liquids take the container\'s shape', 'liquids are easily compressible or that they will expand to fill any size room'],
                  hint: 'Review c8_chem_ch2_6 to contrast rigid solid structures with mobile liquid structures.',
                  misconception: 'Students often believe that liquid particles are spaced as far apart as gas particles, leading them to think that liquids are easily.' }
          ],
            remediations: { 'liquid-particles-are-spaced-as': { steps: ['Remind the student of everyday kitchen observations: when you spill water, it spreads on the floor as a puddle.', 'Have them press a plunger into a water-filled syringe versus an air-filled syringe to physically feel the difference.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that liquid particles are spaced as far apart as gas particles, leading them to think that.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Liquid water has a definite volume because its particles are completely stationary and locked in place." Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'liquids are easily compressible or that they will expand to fill any size room'],
                  hint: 'Review c8_chem_ch2_6 to contrast rigid solid structures with mobile liquid structures.',
                  misconception: 'Students often believe that liquid particles are spaced as far apart as gas particles, leading them to think that liquids are easily.' }
          ],
            remediations: { 'liquid-particles-are-spaced-as': { steps: ['Remind the student of everyday kitchen observations: when you spill water, it spreads on the floor as a puddle.', 'Have them press a plunger into a water-filled syringe versus an air-filled syringe to physically feel the difference.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_8', difficulty: 'standard',
          question: 'In gases, particles are arranged with very large empty spaces between them and.',
          hint: 'Review c8_chem_ch2_5 to reinforce how particle spacing and movement differ fundamentally.',
          misconception: 'Students often think that individual gas particles expand or swell up in size when a gas is heated or when its volume.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In gases, particles are arranged with very large empty spaces between them and move about',
                  options: ['In gases, particles are arranged with very large empty spaces between them and move about', 'Matter is composed of extremely small, discrete particles called atoms and molecules that', 'Inter-particle attraction refers to the attractive forces acting between the constituent', 'Changes of state are physical processes in'],
                  hint: 'Review c8_chem_ch2_5 to reinforce how particle spacing and movement differ fundamentally across.',
                  misconception: 'Students often think that individual gas particles expand or swell up in size when a gas is heated or when its volume increases, rather.' }
          ],
            remediations: { 'individual-gas-particles-expand-or': { steps: ['To fix this, remind students with an analogy: marbles in a large box.', 'If you shake the box faster (heating), the marbles move around more wildly and spread out to take up more room, but.', 'Emphasize that matter particles (atoms and molecules) have fixed dimensions and only the distance between them changes.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_chem_ch2_9', difficulty: 'standard',
          question: 'Inter-particle space refers to the empty microscopic gaps that exist between.',
          hint: 'Review node c8_chem_ch2_5 to reinforce the basic model of particle arrangement in the.',
          misconception: 'Students often believe that inter-particle space within liquids and gases is filled with air or another medium, rather.',
          parts: [
                { id: 'a', prompt: 'Which state of matter possesses the largest inter-particle space among solids, liquids, and gases?', answer: 'Gases possess the largest inter-particle space',
                  options: ['Gases possess the largest inter-particle space', 'solids', 'liquids'],
                  hint: 'Review node c8_chem_ch2_5 to reinforce the basic model of particle arrangement in the three states.',
                  misconception: 'Students often believe that inter-particle space within liquids and gases is filled with air or another medium, rather than being a true.' }
          ],
            remediations: { 'inter-particle-space-within-liquids': { steps: ['To correct this, remind students that particles of matter are the fundamental building blocks, and the region between.', 'Use the analogy of stars in the night sky: stars represent particles, and the dark space between them is empty space.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
