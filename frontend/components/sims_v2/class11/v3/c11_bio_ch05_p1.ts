import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch05_p1: SimDef = {
    id: 'v3_c11_bio_ch05_p1',
    title: 'Morphology of Flowering Plants · Part 1/2',
    subtitle: 'Tell stems posing as roots from roots doing strange jobs — by origin, not by location.',
    classLevel: 11, subject: 'biology', topic: 'Morphology of Flowering Plants · Part 1/2',
    chapters: ['c11_bio_ch05'],
    nodeIds: ['c11_bio_cbse_05_001', 'c11_bio_cbse_05_002', 'c11_bio_cbse_05_003', 'c11_bio_cbse_05_004', 'c11_bio_cbse_05_005', 'c11_bio_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a field botanist solving plant identity puzzles in a market garden', intro: 'Half the vegetables in this basket are lying about what organ they are. Your job: interrogate them with morphology.', goal: 'Classify root systems by origin, map root-tip regions, and match modifications — pneumatophores, prop roots, napiform roots — to the problems they solve.' },
    discovery: {
        question: 'A potato, a ginger rhizome, and an onion bulb all sit underground storing food — so a student lists all three as \'modified roots\'. Which single feature proves they\'re stems in disguise?',
        options: ['They bear nodes with axillary buds — \'eyes\' that can sprout shoots, something no root ever has', 'They are too large to be roots', 'They store starch, which roots cannot do', 'They grow horizontally rather than vertically'],
        answer: 'They bear nodes with axillary buds — \'eyes\' that can sprout shoots, something no root ever has',
        hook: '\'Underground\' is an address, not an identity — nodes and buds betray a stem whatever the soil hides.',
    },
    teaching: [
        { title: 'Root: Types and Modifications', text: 'The root is the non-green, descending, cylindrical axis of a flowering plant that develops from the radicle of the embryo, lacks nodes and internodes, bears unicellular root hairs for absorption, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_05_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Pull up a mustard and a wheat seedling, map the four zones of a root tip, then identify whether carrot, sweet potato, banyan props, and mangrove \'breathing pencils\' are tap or adventitious roots modified for what.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_001', title: 'Root: Types and Modifications',
          caseStudy: { intro: 'Start by pulling a mustard seedling and a wheat seedling from moist soil — notice the single thick main root in mustard versus the bunch of thin roots.',
            decisions: [{ prompt: 'Name the four regions of a root tip in correct acropetal order and state the one unique cellular feature that distinguishes the region.', options: [
                { text: 'Root cap → Region of meristematic activity → Region of elongation → Region of maturation', outcome: 'Root cap → Region of meristematic activity → Region of elongation → Region of maturation.' },
                { text: 'vacuole size', outcome: 'Not quite — Students believe "all underground parts are roots" and therefore classify potato tubers, ginger.', reveals: 'all-underground-parts-are-roots' },
                { text: 'all underground parts are roots', outcome: 'Not quite — Students believe "all underground parts are roots" and therefore classify potato tubers, ginger.', reveals: 'all-underground-parts-are-roots' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_002', title: 'Stem: Types and Modifications',
          caseStudy: { intro: 'Observe a young mango sapling and a potato plant growing in your kitchen garden: the mango shows a clear main trunk with branches arising at distinct joints.',
            decisions: [{ prompt: 'A student pulls out a grass plant and a young neem sapling. She says, "Both have roots underground and stems above ground." Identify the.', options: [
                { text: 'Error: Grass (a monocot) has a highly reduced, often underground stem (rhizome or stolon)', outcome: 'Error: Grass (a monocot) has a highly reduced, often underground stem (rhizome or stolon) — the.' },
                { text: 'green photosynthetic structure', outcome: 'Not quite — Students often think **"underground stem = root"** because both are below soil and store food.', reveals: 'underground-stem-root-because-both' },
                { text: 'underground stem = root', outcome: 'Not quite — Students often think **"underground stem = root"** because both are below soil and store food.', reveals: 'underground-stem-root-because-both' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_003', title: 'Leaf: Structure and Modifications',
          caseStudy: { intro: 'Begin by asking the student to pluck three leaves from their kitchen garden or nearby park — a mango leaf, a coriander sprig, and a grass blade — and observe.',
            decisions: [{ prompt: 'A student observes a leaf with a swollen leaf base (pulvinus) and reticulate venation.', options: [
                { text: 'The conclusion is incorrect', outcome: 'The conclusion is incorrect. A swollen leaf base (pulvinus) is characteristic of leguminous plants.' },
                { text: 'alternate venation', outcome: 'Not quite — Students consistently confuse **phyllotaxy** (arrangement of leaves on stem) with **venation**.', reveals: 'students-consistently-confuse-phyllotaxy-arrange' },
                { text: 'reticulate phyllotaxy', outcome: 'Not quite — Students consistently confuse **phyllotaxy** (arrangement of leaves on stem) with **venation**.', reveals: 'students-consistently-confuse-phyllotaxy-arrange' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_004', title: 'Inflorescence: Types',
          caseStudy: { intro: 'Observe a mustard plant (racemose) and a jasmine plant (cymose) in your school garden or a nearby park.',
            decisions: [{ prompt: 'Define inflorescence and state the two major types based on the behaviour of the apical meristem.', options: [
                { text: 'Inflorescence is the arrangement of flowers on the floral axis', outcome: 'Inflorescence is the arrangement of flowers on the floral axis.' },
                { text: 'racemose = indefinite growth', outcome: 'Not quite — Students often think "racemose = indefinite growth" means the plant grows forever, and "cymose.', reveals: 'racemose-indefinite-growth-means-the' },
                { text: 'cymose = definite growth', outcome: 'Not quite — Students often think "racemose = indefinite growth" means the plant grows forever, and "cymose.', reveals: 'racemose-indefinite-growth-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_005', title: 'Flower: Structure and Parts',
          caseStudy: { intro: 'Begin by asking the student to pluck a fresh Hibiscus rosa-sinensis (china rose) flower from a garden or roadside hedge—something they see daily in Indian.',
            decisions: [{ prompt: 'Name the four floral whorls in their correct acropetal sequence (from outermost to innermost) and state the technical term for the.', options: [
                { text: 'The four whorls in acropetal order are: (1) Calyx – individual members called sepals', outcome: 'The four whorls in acropetal order are: (1) Calyx – individual members called sepals; (2) Corolla.' },
                { text: 'pistil', outcome: 'Not quite — Students consistently confuse **aestivation** (arrangement of sepals/petals *in bud* relative.', reveals: 'students-consistently-confuse-aestivation-arrang' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_006', title: 'Androecium and Gynoecium',
          caseStudy: { intro: 'Observe a hibiscus (china rose) flower in your garden: peel back the petals to see numerous stamens fused into a tube around the central pistil — this.',
            decisions: [{ prompt: 'Define the term \'staminode\' and give one example of a plant where it occurs.', options: [
                { text: 'A staminode is a sterile stamen that does not produce functional pollen grains', outcome: 'A staminode is a sterile stamen that does not produce functional pollen grains; it may be reduced.' },
                { text: 'staminode is a type of pistil', outcome: 'Not quite — Students often think "syncarpous" means only one carpel is present because the ovary appears.', reveals: 'syncarpous-means-only-one-carpel' },
                { text: 'syncarpous', outcome: 'Not quite — Students often think "syncarpous" means only one carpel is present because the ovary appears.', reveals: 'syncarpous-means-only-one-carpel' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Morphology of Flowering Plants · Part 1/2', spots: [
            { id: 's1', label: 'Root Types and Modifications', prompt: 'Which idea is this? — The root is the non-green, descending, cylindrical axis of a flowering plant that.', answer: 'Root Types and Modifications', options: ['Root Types and Modifications', 'Stem Types and Modifications', 'Leaf Structure and Modifications', 'Inflorescence Types'] },
            { id: 's2', label: 'Stem Types and Modifications', prompt: 'Which idea is this? — The stem is the ascending aerial axis of a flowering plant that develops from the.', answer: 'Stem Types and Modifications', options: ['Stem Types and Modifications', 'Root Types and Modifications', 'Leaf Structure and Modifications', 'Inflorescence Types'] },
            { id: 's3', label: 'Leaf Structure and Modifications', prompt: 'Which idea is this? — A leaf is a lateral, dorsiventrally flattened appendage of the stem borne at a node.', answer: 'Leaf Structure and Modifications', options: ['Leaf Structure and Modifications', 'Root Types and Modifications', 'Stem Types and Modifications', 'Inflorescence Types'] },
            { id: 's4', label: 'Inflorescence Types', prompt: 'Which idea is this? — Inflorescence is the mode of development and arrangement of flowers on the floral axis.', answer: 'Inflorescence Types', options: ['Inflorescence Types', 'Root Types and Modifications', 'Stem Types and Modifications', 'Leaf Structure and Modifications'] },
            { id: 's5', label: 'Flower Structure and Parts', prompt: 'Which idea is this? — A flower is the reproductive unit of angiosperms, defined as a modified shoot with.', answer: 'Flower Structure and Parts', options: ['Flower Structure and Parts', 'Root Types and Modifications', 'Stem Types and Modifications', 'Leaf Structure and Modifications'] },
            { id: 's6', label: 'Androecium and Gynoecium', prompt: 'Which idea is this? — Androecium is the male reproductive whorl of a flower composed of stamens, each.', answer: 'Androecium and Gynoecium', options: ['Androecium and Gynoecium', 'Root Types and Modifications', 'Stem Types and Modifications', 'Leaf Structure and Modifications'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping your grandmother sort vegetables for a school exhibition, you must label \'root vegetables\' vs \'stem vegetables\'. In the basket: carrot, radish, potato, ginger, onion. Your cousin sweeps all five into \'roots\' — \'they all grow underground, case closed.\'',
            decisions: [{ prompt: 'Which ones are actually stems, and how do you prove it?', options: [
                { text: 'Potato, ginger and onion are stems: potato \'eyes\' are nodes with axillary buds, ginger\'s rhizome has nodes, internodes and scale leaves, onion\'s bulb has a compressed stem base — roots never bear nodes or buds. Carrot and radish are true roots (from the radicle, no nodes, no buds).', outcome: 'Underground position is not a criterion; morphology — nodes, internodes, buds, scale leaves — and developmental origin decide root vs stem.' },
                { text: 'All five are roots — whatever grows below ground and stores food is by definition a root.', outcome: 'That rule misclassifies stem tubers, rhizomes and bulbs; a potato can sprout shoots from its nodes, something no root can do.', reveals: 'underground-means-root' },
                { text: 'Potato is a root because it\'s tuberous like sweet potato — same shape, same organ.', outcome: 'Similar shape hides different origins: sweet potato is a modified root, potato a stem tuber — check for nodes (\'eyes\') to tell them apart.', reveals: 'same-shape-same-organ' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You learned to ask \'where did it originate and does it bear nodes?\' — the two questions that unmask every underground impostor.',
            decisions: [{ prompt: 'What comes next? Morphology of Flowering Plants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Morphology of Flowering Plants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_001', difficulty: 'standard',
          question: 'The root is the non-green, descending, cylindrical axis of a flowering plant.',
          hint: 'Revisit Class 9 meristematic tissue types (c9_bio_ch2_2) and Class 10 plant transport.',
          misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Maize has a tap root system because its primary root grows deep into the soil." Explain why this statement is incorrect using the.', answer: 'In monocots like maize, the primary root from the radicle is short-lived',
                  options: ['In monocots like maize, the primary root from the radicle is short-lived', 'primary root persistence', 'deep growth', 'all underground parts are roots'],
                  hint: 'Revisit Class 9 meristematic tissue types (c9_bio_ch2_2) and Class 10 plant transport.',
                  misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion bulbs as root.' },
                { id: 'b', prompt: 'You observe a plant growing in waterlogged mangrove mud with pencil-like roots sticking vertically out of the soil.', answer: 'Pneumatophores (respiratory roots) of Avicennia/Sonneratia',
                  options: ['Pneumatophores (respiratory roots) of Avicennia/Sonneratia', 'all underground parts are roots'],
                  hint: 'Revisit Class 9 meristematic tissue types (c9_bio_ch2_2) and Class 10 plant transport.',
                  misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion bulbs as root.' },
                { id: 'c', prompt: 'Compare the storage root modifications of carrot (Daucus carota), radish (Raphanus sativus), and turnip (Brassica rapa) in terms of: (a) which part of the root.', answer: 'All three are modified primary tap roots (not adventitious)',
                  options: ['All three are modified primary tap roots (not adventitious)', 'radicle-origin', 'all underground parts are roots'],
                  hint: 'Revisit Class 9 meristematic tissue types (c9_bio_ch2_2) and Class 10 plant transport.',
                  misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion bulbs as root.' }
          ],
            remediations: { 'all-underground-parts-are-roots': { steps: ['Give the student a fresh potato tuber and a carrot root.', 'Ask them to locate nodes, internodes, scale leaves, and buds on each using a hand lens.', 'Have them trace the origin — potato arises from a stolon (stem branch), carrot from the radicle.', 'Make a table: "Root criteria" (no nodes, no buds, root cap, root hairs) vs.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Adventitious roots are always modifications for support, never for storage." Provide two counter-examples with their botanical names and.', answer: 'The claim is false',
                  options: ['The claim is false', 'all underground parts are roots'],
                  hint: 'Revisit Class 9 meristematic tissue types (c9_bio_ch2_2) and Class 10 plant transport.',
                  misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion bulbs as root.' },
                { id: 'b', prompt: 'Design a simple pot experiment to test whether root hairs are essential for water absorption in a dicot seedling.', answer: 'Use two sets of mustard seedlings in identical soil',
                  options: ['Use two sets of mustard seedlings in identical soil', 'growth', 'all underground parts are roots'],
                  hint: 'Revisit Class 9 meristematic tissue types (c9_bio_ch2_2) and Class 10 plant transport.',
                  misconception: 'Students believe "all underground parts are roots" and therefore classify potato tubers, ginger rhizomes, and onion bulbs as root.' }
          ],
            remediations: { 'all-underground-parts-are-roots': { steps: ['Give the student a fresh potato tuber and a carrot root.', 'Ask them to locate nodes, internodes, scale leaves, and buds on each using a hand lens.', 'Have them trace the origin — potato arises from a stolon (stem branch), carrot from the radicle.', 'Make a table: "Root criteria" (no nodes, no buds, root cap, root hairs) vs.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_002', difficulty: 'standard',
          question: 'The stem is the ascending aerial axis of a flowering plant that develops from.',
          hint: 'If stuck, revisit c9_bio_ch2_2 (meristematic tissues) to recall how shoot apical meristem.',
          misconception: 'Students often think **"underground stem = root"** because both are below soil and store food.',
          parts: [
                { id: 'a', prompt: 'A plant in your school garden has weak, long stems that run horizontally on the soil surface.', answer: 'This is a **stolon** (a subaerial stem modification)',
                  options: ['This is a **stolon** (a subaerial stem modification)', 'runner', 'offset', 'underground stem = root'],
                  hint: 'If stuck, revisit c9_bio_ch2_2 (meristematic tissues) to recall how shoot apical meristem produces.',
                  misconception: 'Students often think **"underground stem = root"** because both are below soil and store food.' },
                { id: 'b', prompt: 'Compare the adaptive significance of phylloclade in *Opuntia* and cladode in *Asparagus*.', answer: '**Phylloclade** (*Opuntia*): The entire stem is flattened and fleshy, performing',
                  options: ['**Phylloclade** (*Opuntia*): The entire stem is flattened and fleshy, performing', 'underground stem = root', '**"underground stem = root"**'],
                  hint: 'If stuck, revisit c9_bio_ch2_2 (meristematic tissues) to recall how shoot apical meristem produces.',
                  misconception: 'Students often think **"underground stem = root"** because both are below soil and store food.' }
          ],
            remediations: { 'underground-stem-root-because-both': { steps: ['Take a potato tuber and a carrot taproot.', 'Under a hand lens, locate **eyes (nodes with buds)** on potato and **absence of nodes, presence of root hairs**.', 'Slice each longitudinally: potato shows **concentric vascular rings** (stem) vs.', 'carrot shows **central xylem core with peripheral phloem** (root).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_003', difficulty: 'standard',
          question: 'A leaf is a lateral, dorsiventrally flattened appendage of the stem borne at.',
          hint: 'Revisit c9_bio_ch2_4 (xylem/phloem structure-function) and c10_bio_cbse_01_011 (plant.',
          misconception: 'Students consistently confuse **phyllotaxy** (arrangement of leaves on stem) with **venation** (arrangement of veins.',
          parts: [
                { id: 'a', prompt: 'A student observes a leaf with a swollen leaf base (pulvinus) and reticulate venation.', answer: 'The conclusion is incorrect',
                  options: ['The conclusion is incorrect', 'alternate venation', 'reticulate phyllotaxy', 'patterns'],
                  hint: 'Revisit c9_bio_ch2_4 (xylem/phloem structure-function) and c10_bio_cbse_01_011 (plant transport).',
                  misconception: 'Students consistently confuse **phyllotaxy** (arrangement of leaves on stem) with **venation** (arrangement of veins in lamina), often.' },
                { id: 'b', prompt: 'In a compound leaf, a student counts 15 "leaves" along the rachis and records the phyllotaxy as "alternate" because the leaflets appear staggered.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'alternate venation', 'reticulate phyllotaxy', 'patterns'],
                  hint: 'Revisit c9_bio_ch2_4 (xylem/phloem structure-function) and c10_bio_cbse_01_011 (plant transport).',
                  misconception: 'Students consistently confuse **phyllotaxy** (arrangement of leaves on stem) with **venation** (arrangement of veins in lamina), often.' },
                { id: 'c', prompt: 'A xerophytic plant has leaves modified into sharp spines. The stem is green, flattened, and performs photosynthesis.', answer: 'The ancestral leaf would most likely show **reticulate venation**',
                  options: ['The ancestral leaf would most likely show **reticulate venation**', 'parallel venation', 'alternate venation', 'reticulate phyllotaxy'],
                  hint: 'Revisit c9_bio_ch2_4 (xylem/phloem structure-function) and c10_bio_cbse_01_011 (plant transport).',
                  misconception: 'Students consistently confuse **phyllotaxy** (arrangement of leaves on stem) with **venation** (arrangement of veins in lamina), often.' }
          ],
            remediations: { 'students-consistently-confuse-phyllotaxy-arrange': { steps: ['Have the student draw a **stem cross-section** showing a node with two leaves (opposite phyllotaxy) and label the.', 'Have them draw a **single leaf lamina** with veins branching from midrib — this anchors venation to the leaf.', 'Use a **Venn diagram** with circles "Shoot System" (phyllotaxy, nodes, internodes, axillary buds) and "Leaf Organ".', 'Give 5 specimens; for each, the student must write two sentences: "Phyllotaxy is ___ because I see ___ on the stem.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_004', difficulty: 'standard',
          question: 'Inflorescence is the mode of development and arrangement of flowers on the.',
          hint: 'Review meristem types and apical dominance in c9_bio_ch2_2 and stem modifications.',
          misconception: 'Students often think "racemose = indefinite growth" means the plant grows forever, and "cymose = definite growth" means.',
          parts: [
                { id: 'a', prompt: 'Define inflorescence and state the two major types based on the behaviour of the apical meristem.', answer: 'Inflorescence is the arrangement of flowers on the floral axis',
                  options: ['Inflorescence is the arrangement of flowers on the floral axis', 'racemose = indefinite growth', 'cymose = definite growth', 'racemose terminates in a flower'],
                  hint: 'Review meristem types and apical dominance in c9_bio_ch2_2 and stem modifications.',
                  misconception: 'Students often think "racemose = indefinite growth" means the plant grows forever, and "cymose = definite growth" means the plant stops.' },
                { id: 'b', prompt: 'A student observes an inflorescence where the main axis is elongated and bears pedicellate flowers laterally in acropetal succession.', answer: 'Type: Racemose (main axis grows indefinitely, acropetal succession)',
                  options: ['Type: Racemose (main axis grows indefinitely, acropetal succession)', 'racemose = indefinite growth', 'cymose = definite growth'],
                  hint: 'Review meristem types and apical dominance in c9_bio_ch2_2 and stem modifications.',
                  misconception: 'Students often think "racemose = indefinite growth" means the plant grows forever, and "cymose = definite growth" means the plant stops.' }
          ],
            remediations: { 'racemose-indefinite-growth-means-the': { steps: ['Revisit the definition of determinate vs. indeterminate growth in meristems (Class 9, c9_bio_ch2_2).', 'Using a potted plant (e.g., marigold for cymose, radish for racemose), mark the terminal bud with a thread and observe.', 'Draw the branching sequence for both, labelling the order of flower opening (1,2,3...).', 'Relate the observation to the terms "acropetal" and "basipetal" by writing them on the diagram.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_005', difficulty: 'standard',
          question: 'A flower is the reproductive unit of angiosperms, defined as a modified shoot.',
          hint: 'Revisit Class 10 node c10_bio_cbse_03_005 "Sexual Reproduction in Flowering Plants.',
          misconception: 'Students consistently confuse **aestivation** (arrangement of sepals/petals *in bud* relative to each other within.',
          parts: [
                { id: 'a', prompt: 'A student observes that in lily, the calyx and corolla are indistinguishable and appear as six similar tepals in two whorls of three.', answer: 'In lily, the perianth is undifferentiated into distinct calyx and corolla',
                  options: ['In lily, the perianth is undifferentiated into distinct calyx and corolla', 'four whorls'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_03_005 "Sexual Reproduction in Flowering Plants: Flower.',
                  misconception: 'Students consistently confuse **aestivation** (arrangement of sepals/petals *in bud* relative to each other within a whorl) with.' }
          ],
            remediations: { 'students-consistently-confuse-aestivation-arrang': { steps: ['Have the student draw two separate diagrams side-by-side: (A) a floral bud in longitudinal section showing only the.', 'Give them 5 flashcards with terms (valvate, twisted, imbricate, vexillary, marginal, axile, parietal, free central.', 'Use a single flower (e.g., Hibiscus) to demonstrate both: peel bud for aestivation (twisted), cut ovary T.S.', 'Practice writing "Aestivation = ______ (calyx/corolla)" and "Placentation = ______ (ovary)" as sentence stems until.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_05_006', difficulty: 'standard',
          question: 'Androecium is the male reproductive whorl of a flower composed of stamens, each.',
          hint: 'Review c11_bio_cbse_05_005 (Flower: Structure and Parts) focusing on Figure 5.9 (thalamus.',
          misconception: 'Students often think "syncarpous" means only one carpel is present because the ovary appears unilocular (e.g.,.',
          parts: [
                { id: 'a', prompt: 'Define the term \'staminode\' and give one example of a plant where it occurs.', answer: 'A staminode is a sterile stamen that does not produce functional pollen grains',
                  options: ['A staminode is a sterile stamen that does not produce functional pollen grains', 'staminode is a type of pistil', 'syncarpous', 'epipetalous'],
                  hint: 'Review c11_bio_cbse_05_005 (Flower: Structure and Parts) focusing on Figure 5.9 (thalamus.',
                  misconception: 'Students often think "syncarpous" means only one carpel is present because the ovary appears unilocular (e.g., in parietal placentation.' },
                { id: 'b', prompt: 'A flower has 5 stamens: filaments of 4 are fused into two bundles of two each, the fifth is free. The anthers are attached to the petals.', answer: 'Cohesion: diadelphous (two bundles)',
                  options: ['Cohesion: diadelphous (two bundles)', 'monadelphous', 'epiphyllous', 'syncarpous'],
                  hint: 'Review c11_bio_cbse_05_005 (Flower: Structure and Parts) focusing on Figure 5.9 (thalamus.',
                  misconception: 'Students often think "syncarpous" means only one carpel is present because the ovary appears unilocular (e.g., in parietal placentation.' },
                { id: 'c', prompt: 'Compare the gynoecium of lotus (apocarpous) and mustard (syncarpous) with respect to: (a) number of carpels, (b) fruit type after fertilization, (c).', answer: 'number of carpels, (',
                  options: ['number of carpels, (', 'both give capsule', 'syncarpous', 'epipetalous'],
                  hint: 'Review c11_bio_cbse_05_005 (Flower: Structure and Parts) focusing on Figure 5.9 (thalamus.',
                  misconception: 'Students often think "syncarpous" means only one carpel is present because the ovary appears unilocular (e.g., in parietal placentation.' }
          ],
            remediations: { 'syncarpous-means-only-one-carpel': { steps: ['Revisit the distinction between carpel number (apocarpous vs syncarpous) and locule number — use longitudinal sections.', 'Create a table: Flower | Perianth type | Stamen adhesion (epipetalous/epiphyllous/free) | Example.', 'Practice drawing floral diagrams for Brassicaceae (mustard) and Solanaceae (brinjal) focusing on bracket placement for.', 'Use the mnemonic "MARGINAL = single carpel ridge; AXILE = central axis; PARIETAL = wall; FREE CENTRAL = central column.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
