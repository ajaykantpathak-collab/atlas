import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch06_p1: SimDef = {
    id: 'v3_c11_bio_ch06_p1',
    title: 'Anatomy of Flowering Plants · Part 1/2',
    subtitle: 'Track where plants keep their dividing cells — and why location decides how they grow.',
    classLevel: 11, subject: 'biology', topic: 'Anatomy of Flowering Plants · Part 1/2',
    chapters: ['c11_bio_ch06'],
    nodeIds: ['c11_bio_cbse_06_001', 'c11_bio_cbse_06_002', 'c11_bio_cbse_06_003', 'c11_bio_cbse_06_004', 'c11_bio_cbse_06_005', 'c11_bio_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant anatomist explaining growth patterns to a plantation manager', intro: 'Why does one stem thicken for fifty years while a grass blade survives a goat? The answer is three kinds of meristem in three different places.', goal: 'Distinguish meristematic from permanent tissue, locate apical, lateral, and intercalary meristems, and connect each to a growth pattern.' },
    discovery: {
        question: 'Mow a lawn to the roots and it regrows in days; prune a mango\'s tip and that branch stops elongating. Same kingdom, opposite outcomes. Where does grass hide the meristem that the mango keeps exposed?',
        options: ['At the base of each internode — intercalary meristems sit below grazing height and keep dividing', 'In the roots — grass regrows entirely from underground buds', 'In the leaf tip — grass leaves grow from their ends', 'Inside the seed — every cut triggers new germination'],
        answer: 'At the base of each internode — intercalary meristems sit below grazing height and keep dividing',
        hook: 'Growth isn\'t located \'at the tips\' everywhere — position of the meristem dictates whether a plant survives being cut.',
    },
    teaching: [
        { title: 'Plant Tissues: Meristematic and Permanent', text: 'Plant tissues are groups of structurally and functionally similar cells that originate from a common meristematic origin; they are broadly classified into **meristematic tissues** (composed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_06_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Identify which meristem — apical, lateral, or intercalary — explains a thickening mango trunk, a regrowing lawn, and an elongating shoot tip, then separate the permanent tissues they produce.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_002', title: 'Simple Tissues: Parenchyma, Collenchyma, Sclerenchyma',
          caseStudy: { intro: 'Imagine biting into a crisp apple (parenchyma-rich cortex) versus chewing a tough sugarcane stem (sclerenchyma-rich vascular bundles and hypodermis).',
            decisions: [{ prompt: 'State the precise cell wall composition and living status that distinguishes parenchyma, collenchyma, and sclerenchyma from each other.', options: [
                { text: 'Parenchyma: thin primary wall (cellulose, hemicellulose, pectin), living at maturity', outcome: 'Parenchyma: thin primary wall (cellulose, hemicellulose, pectin), living at maturity.' },
                { text: 'collenchyma has lignin', outcome: 'Not quite — Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are.', reveals: 'collenchyma-and-sclerenchyma-are-both' },
                { text: 'sclerenchyma is living', outcome: 'Not quite — Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are.', reveals: 'collenchyma-and-sclerenchyma-are-both' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_003', title: 'Complex Tissues: Xylem and Phloem',
          caseStudy: { intro: 'Imagine cutting a transverse section of a young mango stem (dicot) and a maize stem (monocot) from your school garden.',
            decisions: [{ prompt: 'List the four components of xylem and identify which component is the principal water-conducting element in flowering plants (angiosperms).', options: [
                { text: 'The four components are tracheids, vessels, xylem parenchyma, and xylem fibres', outcome: 'The four components are tracheids, vessels, xylem parenchyma, and xylem fibres.' },
                { text: 'tracheids are the main conductors in angiosperms', outcome: 'Not quite — Students frequently believe **phloem transports water and minerals along with food** because "sap".', reveals: 'students-frequently-believe-phloem-transports' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_004', title: 'Anatomy of Dicot and Monocot Roots',
          caseStudy: { intro: 'Pull up a carrot (dicot) and a maize seedling (monocot) from your kitchen garden — wash the roots and observe the fine, white root hairs under a hand lens.',
            decisions: [{ prompt: 'Name the innermost layer of the cortex in roots and state the chemical nature of the thickenings on its radial and tangential walls.', options: [
                { text: 'The innermost layer of the cortex is the endodermis', outcome: 'The innermost layer of the cortex is the endodermis. Its radial and tangential walls have deposits.' },
                { text: 'epidermis', outcome: 'Not quite — Students often think that the "polyarch" condition in monocot roots means they have "more vascular.', reveals: 'the-polyarch-condition-in-monocot' },
                { text: 'lignin', outcome: 'Not quite — Students often think that the "polyarch" condition in monocot roots means they have "more vascular.', reveals: 'the-polyarch-condition-in-monocot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_005', title: 'Anatomy of Dicot and Monocot Stems',
          caseStudy: { intro: 'Imagine you are in your school garden and you cut a cross-section of a young sunflower stem and a maize stem.',
            decisions: [{ prompt: 'State the precise definition of an "open vascular bundle" and name the tissue responsible for this characteristic in dicot stems.', options: [
                { text: 'An open vascular bundle is one in', outcome: 'An open vascular bundle is one in which cambium is present between xylem and phloem, allowing the.' },
                { text: 'open means xylem and phloem are not together', outcome: 'Not quite — Students often believe that "closed vascular bundle" means xylem and phloem are physically.', reveals: 'closed-vascular-bundle-means-xylem' },
                { text: 'cambium is absent', outcome: 'Not quite — Students often believe that "closed vascular bundle" means xylem and phloem are physically.', reveals: 'closed-vascular-bundle-means-xylem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_006', title: 'Anatomy of Dicot and Monocot Leaves',
          caseStudy: { intro: 'Begin by asking students to pluck a mango (dicot) leaf and a grass (monocot) leaf from the school garden.',
            decisions: [{ prompt: 'Define stomatal apparatus and state the shape difference of guard cells in dicot versus monocot leaves.', options: [
                { text: 'Stomatal apparatus consists of the stomatal pore, two guard cells, and surrounding', outcome: 'Stomatal apparatus consists of the stomatal pore, two guard cells, and surrounding subsidiary.' },
                { text: 'guard cells are always bean-shaped', outcome: 'Not quite — Students often think "dorsiventral" means the leaf has two different *epidermises* (upper vs lower).', reveals: 'dorsiventral-means-the-leaf-has' },
                { text: 'dorsiventral', outcome: 'Not quite — Students often think "dorsiventral" means the leaf has two different *epidermises* (upper vs lower).', reveals: 'dorsiventral-means-the-leaf-has' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Anatomy of Flowering Plants · Part 1/2', spots: [
            { id: 's1', label: 'Plant Tissues Meristematic and Permanent', prompt: 'Which idea is this? — Plant tissues are groups of structurally and functionally similar cells that originate.', answer: 'Plant Tissues Meristematic and Permanent', options: ['Plant Tissues Meristematic and Permanent', 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', 'Complex Tissues Xylem and Phloem', 'Anatomy of Dicot and Monocot Roots'] },
            { id: 's2', label: 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', prompt: 'Which idea is this? — Simple permanent tissues are groups of structurally and functionally similar cells that.', answer: 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', options: ['Simple Tissues Parenchyma Collenchyma Sclerenchyma', 'Plant Tissues Meristematic and Permanent', 'Complex Tissues Xylem and Phloem', 'Anatomy of Dicot and Monocot Roots'] },
            { id: 's3', label: 'Complex Tissues Xylem and Phloem', prompt: 'Which idea is this? — Complex tissues are heterogeneous tissues composed of more than one type of cell that.', answer: 'Complex Tissues Xylem and Phloem', options: ['Complex Tissues Xylem and Phloem', 'Plant Tissues Meristematic and Permanent', 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', 'Anatomy of Dicot and Monocot Roots'] },
            { id: 's4', label: 'Anatomy of Dicot and Monocot Roots', prompt: 'Which idea is this? — The root anatomy of dicotyledonous and monocotyledonous plants refers to the internal.', answer: 'Anatomy of Dicot and Monocot Roots', options: ['Anatomy of Dicot and Monocot Roots', 'Plant Tissues Meristematic and Permanent', 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', 'Complex Tissues Xylem and Phloem'] },
            { id: 's5', label: 'Anatomy of Dicot and Monocot Stems', prompt: 'Which idea is this? — The anatomy of dicot and monocot stems refers to the internal structural organization.', answer: 'Anatomy of Dicot and Monocot Stems', options: ['Anatomy of Dicot and Monocot Stems', 'Plant Tissues Meristematic and Permanent', 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', 'Complex Tissues Xylem and Phloem'] },
            { id: 's6', label: 'Anatomy of Dicot and Monocot Leaves', prompt: 'Which idea is this? — Leaf anatomy in flowering plants refers to the internal structural organization of the.', answer: 'Anatomy of Dicot and Monocot Leaves', options: ['Anatomy of Dicot and Monocot Leaves', 'Plant Tissues Meristematic and Permanent', 'Simple Tissues Parenchyma Collenchyma Sclerenchyma', 'Complex Tissues Xylem and Phloem'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school gardener poses two puzzles to your biology group: \'My lawn gets mowed every week and regrows in days, but your desk-mate\'s rose bush, if cut to the ground, dies. Meanwhile my mango trunk gets fatter every year though no new tip forms.\' A junior answers: \'Growth only happens at root and shoot tips — the grass must be growing from its tips that survived mowing.\'',
            decisions: [{ prompt: 'Which meristems explain the lawn and the mango trunk?', options: [
                { text: 'Lawn: intercalary meristems at the base of grass nodes keep dividing after the blade tips are cut — regrowth comes from the base, not the tip. Mango trunk: the lateral meristem (vascular cambium) adds secondary xylem and phloem each year, thickening the stem without any new tip.', outcome: 'Meristems aren\'t only apical — intercalary (nodes) and lateral (cambium) divisions explain regrowth-after-mowing and trunk thickening.' },
                { text: 'The junior is right — all plant growth is apical, so the grass tip must have survived under the soil.', outcome: 'If growth were purely apical, mown grass and a girdled trunk couldn\'t grow; intercalary and lateral meristems exist precisely where apical growth can\'t help.', reveals: 'meristems-only-at-tips' },
                { text: 'The mango thickens because old cells keep dividing forever — permanent tissue can always revert to dividing.', outcome: 'Permanent tissues have lost division capacity; thickening comes from the vascular cambium, a dedicated lateral meristem — not from tired old cells reactivating.', reveals: 'permanent-tissue-redivides' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a plant\'s body plan as a map of where division still happens — meristems are the living engine, permanent tissues the finished product.',
            decisions: [{ prompt: 'What comes next? Anatomy of Flowering Plants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Anatomy of Flowering Plants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_001', difficulty: 'standard',
          question: 'Plant tissues are groups of structurally and functionally similar cells that.',
          hint: 'Review Class 9 mitosis (c9_bio_ch1_12) and the definition of tissue from Class 8.',
          misconception: 'Students believe that **meristematic tissue exists only at the root and shoot tips (apical meristem)** and are unaware.',
          parts: [
                { id: 'a', prompt: 'A student examines a transverse section of a young stem under a microscope and observes vascular bundles arranged in a distinct ring.', answer: 'The stem is **dicotyledonous**',
                  options: ['The stem is **dicotyledonous**', 'monocot'],
                  hint: 'Review Class 9 mitosis (c9_bio_ch1_12) and the definition of tissue from Class 8 (c8_bio_ch1_8).',
                  misconception: 'Students believe that **meristematic tissue exists only at the root and shoot tips (apical meristem)** and are unaware of lateral meristem.' }
          ],
            remediations: { 'meristematic-tissue-exists-only-at': { steps: ['Observe a cross-section of a young dicot stem (e.g., sunflower) and an older stem; identify the vascular cambium ring.', 'Grow wheat or grass in a tray, cut the shoots 2 cm above soil, and monitor regrowth from the basal nodes over a week.', 'Relate observations to the three meristem types: apical (tip), lateral (cambium ring), intercalary (base of nodes).', 'Re-read the definitions of each meristem type and write one functional sentence for each in your own words.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_002', difficulty: 'standard',
          question: 'Simple permanent tissues are groups of structurally and functionally similar.',
          hint: 'If stuck, review c9_bio_ch1_4 (Cell Wall) for wall layers and polymers, and c9_bio_ch2_1.',
          misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simple permanent tissues are groups of structurally and functionally similar cells that',
                  options: ['Simple permanent tissues are groups of structurally and functionally similar cells that', 'Plant tissues are groups of structurally and functionally similar cells that originate', 'Complex tissues are heterogeneous tissues composed of more than one type of cell that', 'The root anatomy of dicotyledonous and monocotyledonous plants refers to the internal'],
                  hint: 'If stuck, review c9_bio_ch1_4 (Cell Wall) for wall layers and polymers, and c9_bio_ch2_1.',
                  misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail to grasp that.' }
          ],
            remediations: { 'collenchyma-and-sclerenchyma-are-both': { steps: ['Revisit Class 9 distinction: primary vs.', 'secondary wall deposition (c9_bio_ch1_4).', 'Perform a hands-on activity: bend a fresh *Cucurbita* petiole (collenchyma snaps back) vs.', 'a dry *Luffa* fiber network (sclerenchyma fractures).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Since sclerenchyma fibers are dead, they are metabolically useless to the plant." Provide two counterarguments with specific examples.', answer: 'Claim is false',
                  options: ['Claim is false', 'metabolic activity', 'functional value'],
                  hint: 'If stuck, review c9_bio_ch1_4 (Cell Wall) for wall layers and polymers, and c9_bio_ch2_1.',
                  misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail to grasp that.' }
          ],
            remediations: { 'collenchyma-and-sclerenchyma-are-both': { steps: ['Revisit Class 9 distinction: primary vs.', 'secondary wall deposition (c9_bio_ch1_4).', 'Perform a hands-on activity: bend a fresh *Cucurbita* petiole (collenchyma snaps back) vs.', 'a dry *Luffa* fiber network (sclerenchyma fractures).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_003', difficulty: 'standard',
          question: 'Complex tissues are heterogeneous tissues composed of more than one type.',
          hint: 'If stuck, immediately review c11_bio_cbse_06_002 (Simple Tissues) focusing on: (a).',
          misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.',
          parts: [
                { id: 'a', prompt: 'List the four components of xylem and identify which component is the principal water-conducting element in flowering plants (angiosperms).', answer: 'The four components are tracheids, vessels, xylem parenchyma, and xylem fibres',
                  options: ['The four components are tracheids, vessels, xylem parenchyma, and xylem fibres', 'tracheids are the main conductors in angiosperms'],
                  hint: 'If stuck, immediately review c11_bio_cbse_06_002 (Simple Tissues) focusing on: (a) Sclerenchyma.',
                  misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.' },
                { id: 'b', prompt: 'Sieve tube elements are living at maturity but lack a nucleus, while companion cells have dense cytoplasm and a prominent nucleus.', answer: 'Sieve tube elements lose their nucleus and most organelles to form an open,',
                  options: ['Sieve tube elements lose their nucleus and most organelles to form an open,', 'both are dead like xylem vessels'],
                  hint: 'If stuck, immediately review c11_bio_cbse_06_002 (Simple Tissues) focusing on: (a) Sclerenchyma.',
                  misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.' }
          ],
            remediations: { 'students-frequently-believe-phloem-transports': { steps: ['**Revisit Simple Tissues (c11_bio_cbse_06_002)**: Make a 4x2 table comparing the four xylem components and four phloem.', '**Slide Observation**: Examine prepared T.S.', 'of sunflower (dicot) and maize (monocot) stems.', 'Physically point to xylem (stained red with safranin) and phloem (stained green with fast green) in each bundle.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_004', difficulty: 'standard',
          question: 'The root anatomy of dicotyledonous and monocotyledonous plants refers to the.',
          hint: 'Revisit c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) and practice identifying.',
          misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like.',
          parts: [
                { id: 'a', prompt: 'Name the innermost layer of the cortex in roots and state the chemical nature of the thickenings on its radial and tangential walls.', answer: 'The innermost layer of the cortex is the endodermis',
                  options: ['The innermost layer of the cortex is the endodermis', 'epidermis', 'lignin', 'polyarch'],
                  hint: 'Revisit c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) and practice identifying xylem (red.',
                  misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like monocot stems.' },
                { id: 'b', prompt: 'A transverse section of a root shows 12 xylem arms alternating with 12 phloem patches, a large central pith, and no cambium between xylem and phloem.', answer: 'This is a monocot root',
                  options: ['This is a monocot root', 'dicot root', 'polyarch', 'more vascular bundles'],
                  hint: 'Revisit c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) and practice identifying xylem (red.',
                  misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like monocot stems.' }
          ],
            remediations: { 'the-polyarch-condition-in-monocot': { steps: ['To fix this, have the student draw side-by-side: (1) T.S.', 'of monocot stem (maize) showing scattered conjoint closed bundles with sclerenchymatous bundle sheaths, (2) T.S.', 'of monocot root (maize) showing polyarch radial bundles without bundle sheaths.', 'Emphasize: roots = radial, stems = conjoint.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_005', difficulty: 'standard',
          question: 'The anatomy of dicot and monocot stems refers to the internal structural.',
          hint: 'If stuck, review node c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) for.',
          misconception: 'Students often believe that "closed vascular bundle" means xylem and phloem are physically separated or not in contact.',
          parts: [
                { id: 'a', prompt: 'State the precise definition of an "open vascular bundle" and name the tissue responsible for this characteristic in dicot stems.', answer: 'An open vascular bundle is one in',
                  options: ['An open vascular bundle is one in', 'open means xylem and phloem are not together', 'cambium is absent', 'open/closed'],
                  hint: 'If stuck, review node c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) for vascular bundle.',
                  misconception: 'Students often believe that "closed vascular bundle" means xylem and phloem are physically separated or not in contact, whereas it actually.' },
                { id: 'b', prompt: 'A student observes a transverse section of a young stem under a microscope and notes: (i) vascular bundles are conjoint and collateral, (ii) each bundle.', answer: 'This is a monocot stem (e.g., maize)',
                  options: ['This is a monocot stem (e.g., maize)', 'closed vascular bundle', 'bundle sheath'],
                  hint: 'If stuck, review node c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) for vascular bundle.',
                  misconception: 'Students often believe that "closed vascular bundle" means xylem and phloem are physically separated or not in contact, whereas it actually.' }
          ],
            remediations: { 'closed-vascular-bundle-means-xylem': { steps: ['Revisit node c11_bio_cbse_06_003 to clarify xylem/phloem arrangement terms (conjoint, collateral, radial).', 'Use prepared slides of sunflower and maize stem T.S.', 'side-by-side; trace each tissue layer from epidermis inward with a colored pencil on a printed diagram.', 'Make a comparison table: columns for Dicot/Monocot, rows for Hypodermis, Ground tissue differentiation, Endodermis.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_006', difficulty: 'standard',
          question: 'Leaf anatomy in flowering plants refers to the internal structural organization.',
          hint: 'If stuck, review c11_bio_cbse_06_002 (Simple Tissues) for parenchyma types and.',
          misconception: 'Students often think "dorsiventral" means the leaf has two different *epidermises* (upper vs lower) while.',
          parts: [
                { id: 'a', prompt: 'Explain why palisade parenchyma is located on the adaxial (upper) side in dorsiventral leaves but absent in isobilateral leaves.', answer: 'In dorsiventral leaves, the upper surface receives more direct sunlight',
                  options: ['In dorsiventral leaves, the upper surface receives more direct sunlight', 'palisade is always on top', 'dorsiventral', 'isobilateral'],
                  hint: 'If stuck, review c11_bio_cbse_06_002 (Simple Tissues) for parenchyma types and c7_bio_ch03_007 for.',
                  misconception: 'Students often think "dorsiventral" means the leaf has two different *epidermises* (upper vs lower) while "isobilateral" means the two.' },
                { id: 'b', prompt: 'A transverse section of a leaf shows vascular bundles of nearly equal size scattered in mesophyll, each surrounded by a sclerenchymatous bundle sheath, and.', answer: 'This is an isobilateral (monocot) leaf',
                  options: ['This is an isobilateral (monocot) leaf', 'dorsiventral', 'isobilateral'],
                  hint: 'If stuck, review c11_bio_cbse_06_002 (Simple Tissues) for parenchyma types and c7_bio_ch03_007 for.',
                  misconception: 'Students often think "dorsiventral" means the leaf has two different *epidermises* (upper vs lower) while "isobilateral" means the two.' }
          ],
            remediations: { 'dorsiventral-means-the-leaf-has': { steps: ['Revisit c11_bio_cbse_06_002 (Simple Tissues) to recall parenchyma types and their chloroplast content.', 'Use a razor blade to make vertical sections of 3 dicot and 3 monocot leaves from your surroundings.', 'Under microscope, *only* look at mesophyll: ask "Are there two distinct layers of parenchyma with different.', 'Then check epidermises for stomata distribution as a secondary confirmatory trait.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
