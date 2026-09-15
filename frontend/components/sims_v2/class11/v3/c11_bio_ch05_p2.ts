import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch05_p2: SimDef = {
    id: 'v3_c11_bio_ch05_p2',
    title: 'Morphology of Flowering Plants · Part 2/2',
    subtitle: 'Tell stems posing as roots from roots doing strange jobs — by origin, not by location.',
    classLevel: 11, subject: 'biology', topic: 'Morphology of Flowering Plants · Part 2/2',
    chapters: ['c11_bio_ch05'],
    nodeIds: ['c11_bio_cbse_05_007', 'c11_bio_cbse_05_008', 'c11_bio_cbse_05_009', 'c11_bio_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a field botanist solving plant identity puzzles in a market garden', intro: 'Half the vegetables in this basket are lying about what organ they are. Your job: interrogate them with morphology.', goal: 'Classify root systems by origin, map root-tip regions, and match modifications — pneumatophores, prop roots, napiform roots — to the problems they solve.' },
    discovery: {
        question: 'A potato, a ginger rhizome, and an onion bulb all sit underground storing food — so a student lists all three as \'modified roots\'. Which single feature proves they\'re stems in disguise?',
        options: ['They bear nodes with axillary buds — \'eyes\' that can sprout shoots, something no root ever has', 'They are too large to be roots', 'They store starch, which roots cannot do', 'They grow horizontally rather than vertically'],
        answer: 'They bear nodes with axillary buds — \'eyes\' that can sprout shoots, something no root ever has',
        hook: '\'Underground\' is an address, not an identity — nodes and buds betray a stem whatever the soil hides.',
    },
    teaching: [
        { title: 'Fruit: Types and Development', text: 'A fruit is the mature, ripened ovary of a flowering plant that develops after fertilization (or without fertilization in parthenocarpy), consisting of a pericarp (fruit wall) derived from the ovary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_05_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Pull up a mustard and a wheat seedling, map the four zones of a root tip, then identify whether carrot, sweet potato, banyan props, and mangrove \'breathing pencils\' are tap or adventitious roots modified for what.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_007', title: 'Fruit: Types and Development',
          caseStudy: { intro: 'When you bite into a mango, the sweet yellow flesh you eat is the mesocarp, while the hard stone protecting the seed is the endocarp — both developed from the.',
            decisions: [{ prompt: 'Define parthenocarpic fruit and give one example. How does it differ from a normal fruit in terms of seed formation?', options: [
                { text: 'A parthenocarpic fruit develops without fertilization of the ovary, so it lacks viable', outcome: 'A parthenocarpic fruit develops without fertilization of the ovary, so it lacks viable seeds (e.g.' },
                { text: 'fruit = anything sweet and edible', outcome: 'Not quite — Students think "fruit = anything sweet and edible" and classify strawberry as a berry, coconut as.', reveals: 'fruit-anything-sweet-and-edible' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_008', title: 'Seed: Structure of Dicot and Monocot Seeds',
          caseStudy: { intro: 'Begin by asking students to soak a few chickpeas (chana) and maize grains overnight.',
            decisions: [{ prompt: 'What are the two layers of the seed coat in a typical dicotyledonous seed, and from which integuments do they originate?', options: [
                { text: 'The two layers are the outer testa (from outer integument) and inner tegmen (from inner', outcome: 'The two layers are the outer testa (from outer integument) and inner tegmen (from inner.' },
                { text: 'testa and endosperm', outcome: 'Not quite — Students often think the "seed coat" in maize is derived from the ovule integuments like in dicots.', reveals: 'the-seed-coat-in-maize' },
                { text: 'pericarp and testa', outcome: 'Not quite — Students often think the "seed coat" in maize is derived from the ovule integuments like in dicots.', reveals: 'the-seed-coat-in-maize' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_009', title: 'Floral Formula and Floral Diagram',
          caseStudy: { intro: 'Imagine you are a botanist examining a hibiscus flower in your school garden.',
            decisions: [{ prompt: 'Write the floral formula for a bisexual, actinomorphic flower with 5 free sepals, 5 free petals, 6 stamens (4 long + 2 short), and.', options: [
                { text: '⊕ ⚥ K5 C5 A4+2 G(2)', outcome: '⊕ ⚥ K5 C5 A4+2 G(2) A wrong answer like "K5 C5 A6 G2" reveals the student does not understand: (1).' },
                { text: 'K5 C5 A6 G2', outcome: 'Not quite — Students often treat floral formula as a mere counting exercise, writing "K5 C5 A5 G5" for any.', reveals: 'students-often-treat-floral-formula' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Morphology of Flowering Plants · Part 2/2', spots: [
            { id: 's1', label: 'Fruit Types and Development', prompt: 'Which idea is this? — A fruit is the mature, ripened ovary of a flowering plant that develops after.', answer: 'Fruit Types and Development', options: ['Fruit Types and Development', 'Seed Structure of Dicot and Monocot Seeds', 'Floral Formula and Floral Diagram', 'Semi-Technical Description of Flowering Plants'] },
            { id: 's2', label: 'Seed Structure of Dicot and Monocot Seeds', prompt: 'Which idea is this? — A seed is a mature, fertilized ovule consisting of a protective seed coat (testa and.', answer: 'Seed Structure of Dicot and Monocot Seeds', options: ['Seed Structure of Dicot and Monocot Seeds', 'Fruit Types and Development', 'Floral Formula and Floral Diagram', 'Semi-Technical Description of Flowering Plants'] },
            { id: 's3', label: 'Floral Formula and Floral Diagram', prompt: 'Which idea is this? — A floral formula is a concise symbolic representation of the structure of a flower using.', answer: 'Floral Formula and Floral Diagram', options: ['Floral Formula and Floral Diagram', 'Fruit Types and Development', 'Seed Structure of Dicot and Monocot Seeds', 'Semi-Technical Description of Flowering Plants'] },
            { id: 's4', label: 'Semi-Technical Description of Flowering Plants', prompt: 'Which idea is this? — A semi-technical description is a standardized, systematic method of describing.', answer: 'Semi-Technical Description of Flowering Plants', options: ['Semi-Technical Description of Flowering Plants', 'Fruit Types and Development', 'Seed Structure of Dicot and Monocot Seeds', 'Floral Formula and Floral Diagram'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping your grandmother sort vegetables for a school exhibition, you must label \'root vegetables\' vs \'stem vegetables\'. In the basket: carrot, radish, potato, ginger, onion. Your cousin sweeps all five into \'roots\' — \'they all grow underground, case closed.\'',
            decisions: [{ prompt: 'Which ones are actually stems, and how do you prove it?', options: [
                { text: 'Potato, ginger and onion are stems: potato \'eyes\' are nodes with axillary buds, ginger\'s rhizome has nodes, internodes and scale leaves, onion\'s bulb has a compressed stem base — roots never bear nodes or buds. Carrot and radish are true roots (from the radicle, no nodes, no buds).', outcome: 'Underground position is not a criterion; morphology — nodes, internodes, buds, scale leaves — and developmental origin decide root vs stem.' },
                { text: 'All five are roots — whatever grows below ground and stores food is by definition a root.', outcome: 'That rule misclassifies stem tubers, rhizomes and bulbs; a potato can sprout shoots from its nodes, something no root can do.', reveals: 'underground-means-root' },
                { text: 'Potato is a root because it\'s tuberous like sweet potato — same shape, same organ.', outcome: 'Similar shape hides different origins: sweet potato is a modified root, potato a stem tuber — check for nodes (\'eyes\') to tell them apart.', reveals: 'same-shape-same-organ' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You learned to ask \'where did it originate and does it bear nodes?\' — the two questions that unmask every underground impostor.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_007', difficulty: 'standard',
          question: 'A fruit is the mature, ripened ovary of a flowering plant that develops after.',
          hint: 'Review c11_bio_cbse_05_006 (Gynoecium) for carpel types and c11_bio_cbse_05_005 (Flower).',
          misconception: 'Students think "fruit = anything sweet and edible" and classify strawberry as a berry, coconut as a nut, and apple as.',
          parts: [
                { id: 'a', prompt: 'A student claims that an apple is a true fruit because it develops from the ovary.', answer: 'Apple is a false fruit (pome)',
                  options: ['Apple is a false fruit (pome)', 'apple is a true fruit', 'fruit = anything sweet and edible'],
                  hint: 'Review c11_bio_cbse_05_006 (Gynoecium) for carpel types and c11_bio_cbse_05_005 (Flower) for.',
                  misconception: 'Students think "fruit = anything sweet and edible" and classify strawberry as a berry, coconut as a nut, and apple as a true fruit.' },
                { id: 'b', prompt: 'Classify the following fruits and justify each classification: (a) Mango, (b) Strawberry, (c) Pineapple, (d) Coconut.', answer: 'Mango, (',
                  options: ['Mango, (', 'fruit = anything sweet and edible'],
                  hint: 'Review c11_bio_cbse_05_006 (Gynoecium) for carpel types and c11_bio_cbse_05_005 (Flower) for.',
                  misconception: 'Students think "fruit = anything sweet and edible" and classify strawberry as a berry, coconut as a nut, and apple as a true fruit.' }
          ],
            remediations: { 'fruit-anything-sweet-and-edible': { steps: ['Revisit c11_bio_cbse_05_006 — identify ovary position (superior/inferior) and carpel condition (apocarpous/syncarpous).', 'Trace each fruit tissue to its floral origin: pericarp ← ovary wall, seeds ← ovules, fleshy accessory ← thalamus/calyx.', 'Use a razor blade to section mango (drupe), guava (berry), apple (pome), strawberry (aggregate) — physically separate.', 'Make a table: Fruit | Ovary Position | Carpel Type | True Fruit Part | Accessory Tissue.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "fruit = anything sweet and edible" and classify strawberry as a berry, coconut as a nut, and apple as.',
          parts: [
                { id: 'a', prompt: 'Design a simple observation-based activity to distinguish between a true fruit and a false fruit using locally available fruits (e.g., mango, apple, guava.', answer: 'Steps: (1) Collect mango, apple, guava, pear',
                  options: ['Steps: (1) Collect mango, apple, guava, pear', 'fruit = anything sweet and edible'],
                  hint: 'Review c11_bio_cbse_05_006 (Gynoecium) for carpel types and c11_bio_cbse_05_005 (Flower) for.',
                  misconception: 'Students think "fruit = anything sweet and edible" and classify strawberry as a berry, coconut as a nut, and apple as a true fruit.' }
          ],
            remediations: { 'fruit-anything-sweet-and-edible': { steps: ['Revisit c11_bio_cbse_05_006 — identify ovary position (superior/inferior) and carpel condition (apocarpous/syncarpous).', 'Trace each fruit tissue to its floral origin: pericarp ← ovary wall, seeds ← ovules, fleshy accessory ← thalamus/calyx.', 'Use a razor blade to section mango (drupe), guava (berry), apple (pome), strawberry (aggregate) — physically separate.', 'Make a table: Fruit | Ovary Position | Carpel Type | True Fruit Part | Accessory Tissue.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_008', difficulty: 'standard',
          question: 'A seed is a mature, fertilized ovule consisting of a protective seed coat.',
          hint: 'Revisit "Fertilisation in Plants: Double Fertilisation and Seed Formation".',
          misconception: 'Students often think the "seed coat" in maize is derived from the ovule integuments like in dicots.',
          parts: [
                { id: 'a', prompt: 'A student observes a seed with a membranous seed coat fused to the fruit wall, a large starchy endosperm separated from the embryo by an aleurone layer, and.', answer: 'This is a monocotyledonous endospermic seed (e.g., maize)',
                  options: ['This is a monocotyledonous endospermic seed (e.g., maize)', 'seed coat', 'the "seed coat" in maize is derived from the ovule integuments like in dicots'],
                  hint: 'Revisit "Fertilisation in Plants: Double Fertilisation and Seed Formation" (c10_bio_cbse_03_007).',
                  misconception: 'Students often think the "seed coat" in maize is derived from the ovule integuments like in dicots.' },
                { id: 'b', prompt: 'Compare the protective sheaths of the plumule and radicle in maize and gram seeds.', answer: 'Maize has coleoptile (protects plumule) and coleorhiza (protects radicle)',
                  options: ['Maize has coleoptile (protects plumule) and coleorhiza (protects radicle)', 'gram also has coleoptile', 'sheaths are for water absorption', 'seed coat'],
                  hint: 'Revisit "Fertilisation in Plants: Double Fertilisation and Seed Formation" (c10_bio_cbse_03_007).',
                  misconception: 'Students often think the "seed coat" in maize is derived from the ovule integuments like in dicots.' }
          ],
            remediations: { 'the-seed-coat-in-maize': { steps: ['Re-examine Figure 5.15 in NCERT – note the label "Seed coat & fruit-wall" as a single line.', 'Compare with Figure 5.14 where testa and tegmen are clearly separate from the fruit (pod).', 'Recall that maize grain is a caryopsis (fruit = seed) from Fruit Types (c11_bio_cbse_05_007).', 'Practice drawing V.S. of maize grain labeling "Pericarp fused with testa" as one layer, then "Aleurone layer", then.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_009', difficulty: 'standard',
          question: 'A floral formula is a concise symbolic representation of the structure of.',
          hint: 'Revisit c11_bio_cbse_05_005 (Flower Structure) and c11_bio_cbse_05_006.',
          misconception: 'Students often treat floral formula as a mere counting exercise, writing "K5 C5 A5 G5" for any pentamerous flower.',
          parts: [
                { id: 'a', prompt: 'Write the floral formula for a bisexual, actinomorphic flower with 5 free sepals, 5 free petals, 6 stamens (4 long + 2 short), and a syncarpous superior ovary.', answer: '⊕ ⚥ K5 C5 A4+2 G(2)',
                  options: ['⊕ ⚥ K5 C5 A4+2 G(2)', 'K5 C5 A6 G2'],
                  hint: 'Revisit c11_bio_cbse_05_005 (Flower Structure) and c11_bio_cbse_05_006 (Androecium/Gynoecium).',
                  misconception: 'Students often treat floral formula as a mere counting exercise, writing "K5 C5 A5 G5" for any pentamerous flower.' }
          ],
            remediations: { 'students-often-treat-floral-formula': { steps: ['Take a fresh china rose flower. Dissect and count: 5 sepals fused at base → write K(5). 5 petals fused at base → C(5).', 'Write formula with symbols in order: ⊕ ⚥ K(5) C(5) A(∞) G̅(5).', 'Draw diagram: 5 sepals touching edges (valvate), 5 petals overlapping (twisted), staminal tube as ring, 5 carpels.', 'Compare with NCERT Fig 5.16. Repeat for mustard (K2+2 C4 A2+4 G(2)) to master polysepalous, tetradynamous, and parietal.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_010', difficulty: 'standard',
          question: 'A semi-technical description is a standardized, systematic method of describing.',
          hint: 'Review floral formula symbols and cohesion/adhesion notation from node.',
          misconception: 'Students confuse cohesion (fusion of parts within the same whorl) and adhesion (fusion of parts between different.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A semi-technical description is a standardized, systematic method of describing a',
                  options: ['A semi-technical description is a standardized, systematic method of describing a', 'The root is the non-green, descending, cylindrical axis of a flowering plant that', 'The stem is the ascending aerial axis of a flowering plant that develops from the', 'A leaf is a lateral, dorsiventrally flattened appendage of the stem borne at a node,'],
                  hint: 'Review floral formula symbols and cohesion/adhesion notation from node c11_bio_cbse_05_009, and.',
                  misconception: 'Students confuse cohesion (fusion of parts within the same whorl) and adhesion (fusion of parts between different whorls) in floral formula.' }
          ],
            remediations: { 'students-confuse-cohesion-fusion-of': { steps: ['Review the distinction between cohesion and adhesion using Figure 5.11 (aestivation) and Figure 5.16 (floral formula).', 'Practice writing formulas for three flowers: (a) Datura (Solanaceae) – has both cohesion (K(5), C(5)) and adhesion (A-C.', 'Verify each against NCERT Figure 5.16 conventions.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
