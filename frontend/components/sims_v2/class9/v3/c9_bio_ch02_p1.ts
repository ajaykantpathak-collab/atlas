import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch02_p1: SimDef = {
    id: 'v3_c9_bio_ch02_p1',
    title: 'Tissues: Plant and Animal · Part 1/2',
    subtitle: 'The cells that never stopped dividing',
    classLevel: 9, subject: 'biology', topic: 'Tissues: Plant and Animal · Part 1/2',
    chapters: ['c9_bio_ch02'],
    nodeIds: ['c9_bio_ch2_1', 'c9_bio_ch2_10', 'c9_bio_ch2_11', 'c9_bio_ch2_2', 'c9_bio_ch2_3', 'c9_bio_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant-tissue microscopist', intro: 'A sapling shoots up, a trunk thickens, grass regrows after mowing — but growth isn\'t everywhere. Find the tiny zones where cells still split nonstop, and see what the rest of the plant is busy doing.', goal: 'Distinguish meristematic tissue (undifferentiated, dividing) from permanent tissue (specialised, non-dividing) and connect each to how plants grow taller, thicker and regrow.' },
    discovery: {
        question: 'Cattle graze off a wheat crop\'s tip — the plant never grows taller, yet the stem keeps getting thicker. How can one kind of growth stop while another continues?',
        options: ['The tip\'s apical meristem was eaten (no more height), but the lateral meristem still divides — adding girth', 'The plant is dead — thickening is an illusion', 'All growth happens only at the tip, always', 'The roots push the stem wider in revenge'],
        answer: 'The tip\'s apical meristem was eaten (no more height), but the lateral meristem still divides — adding girth',
        hook: 'Plants don\'t grow everywhere — only in meristem zones packed with thin-walled, nucleus-heavy, constantly dividing cells. Every other tissue (the \'permanent\' ones) are ex-meristem cells that settled into a job and quit dividing.',
    },
    teaching: [
        { title: 'Plant Tissues: Meristematic vs Permanent Tissues', text: 'Meristematic tissue consists of undifferentiated, actively dividing cells with dense cytoplasm, thin cell walls, and prominent nuclei that retain the capacity for continuous division, while permanent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch2_1', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Map a plant\'s growth zones: compare the jam-packed dividing cells at a root tip with the big vacuolated cells of a mature stem, and explain why mowing the lawn works but beheading a sapling doesn\'t.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch2_1', title: 'Plant Tissues: Meristematic vs Permanent Tissues',
          caseStudy: { intro: 'Observe a young mango sapling growing taller each month and a mature banyan tree trunk thickening over years — both show growth but in different regions.',
            decisions: [{ prompt: 'Define meristematic tissue and state two cellular features that distinguish it from permanent tissue.', options: [
                { text: 'Meristematic tissue is a group of undifferentiated plant cells capable of continuous', outcome: 'Meristematic tissue is a group of undifferentiated plant cells capable of continuous division.' },
                { text: 'thick lignified walls', outcome: 'Not quite — Students believe meristematic tissue exists only at root and shoot tips (apical), forgetting that.', reveals: 'meristematic-tissue-exists-only-at' },
                { text: 'large central vacuole', outcome: 'Not quite — Students believe meristematic tissue exists only at root and shoot tips (apical), forgetting that.', reveals: 'meristematic-tissue-exists-only-at' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_10', title: 'Joints: Types and Functions in the Skeleton',
          caseStudy: { intro: 'Observe your own fingers: bend them, rotate your thumb, notice how the wrist moves in circles but the elbow only hinges.',
            decisions: [{ prompt: 'Name the three structural classifications of joints based on the connective tissue binding the bones, and give one example of each from the.', options: [
                { text: 'The three structural classes are: (1) Fibrous joints', outcome: 'The three structural classes are: (1) Fibrous joints — bones united by dense fibrous connective.' },
                { text: 'hinge, ball-and-socket, pivot', outcome: 'Not quite — Students often believe that "ball-and-socket joints allow movement in all directions equally" and.', reveals: 'ball-and-socket-joints-allow' },
                { text: 'ball-and-socket joints allow movement in all directions equally', outcome: 'Not quite — Students often believe that "ball-and-socket joints allow movement in all directions equally" and.', reveals: 'ball-and-socket-joints-allow' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_11', title: 'Human Skeleton: Axial and Appendicular',
          caseStudy: { intro: 'Stand up and gently twist your torso side-to-side while keeping your hips still — you feel your rib cage and spine (axial skeleton) rotating.',
            decisions: [{ prompt: 'Name the two major divisions of the human skeleton and state the total number of bones in each division for an adult human.', options: [
                { text: 'The two divisions are the axial skeleton (80 bones) and the appendicular skeleton (126', outcome: 'The two divisions are the axial skeleton (80 bones) and the appendicular skeleton (126 bones).' },
                { text: 'axial has 126 bones', outcome: 'Not quite — Students often think the shoulder joint (glenohumeral) directly connects the humerus to the axial.', reveals: 'the-shoulder-joint-glenohumeral-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_2', title: 'Meristematic Tissues: Apical, Lateral and Intercalary',
          caseStudy: { intro: 'Observe a freshly cut grass lawn in an Indian garden: within days, the grass regrows from the base, not the tips.',
            decisions: [{ prompt: 'Name the three types of meristematic tissues classified on the basis of their location in the plant body.', options: [
                { text: 'The three types are apical meristem, lateral meristem, and intercalary meristem', outcome: 'The three types are apical meristem, lateral meristem, and intercalary meristem.' },
                { text: 'permanent tissues like parenchyma or xylem', outcome: 'Not quite — Students believe that intercalary meristems are a subtype of apical meristems because both cause.', reveals: 'intercalary-meristems-are-a-subtype' },
                { text: 'grasses grow tall only from their tips like trees', outcome: 'Not quite — Students believe that intercalary meristems are a subtype of apical meristems because both cause.', reveals: 'intercalary-meristems-are-a-subtype' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_3', title: 'Simple Permanent Tissues: Parenchyma, Collenchyma, Sclerenchyma',
          caseStudy: { intro: 'Imagine biting into a crisp apple—your teeth encounter crunchy flesh (parenchyma), tough skin (collenchyma), and hard seed coats (sclerenchyma).',
            decisions: [{ prompt: 'Name the three types of simple permanent tissues in plants and state one distinguishing structural feature of each.', options: [
                { text: 'The three types are parenchyma (thin primary walls, living, isodiametric), collenchyma', outcome: 'The three types are parenchyma (thin primary walls, living, isodiametric), collenchyma (unevenly.' },
                { text: 'epidermis', outcome: 'Not quite — Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead.', reveals: 'all-thick-walled-plant-cells' },
                { text: 'thick wall = dead cell', outcome: 'Not quite — Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead.', reveals: 'all-thick-walled-plant-cells' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_4', title: 'Complex Permanent Tissues: Xylem and Phloem',
          caseStudy: { intro: 'Observe a freshly cut mango tree stem in your garden - you see water dripping from the cut surface even without roots attached.',
            decisions: [{ prompt: 'Name the four types of cells that constitute xylem tissue in flowering plants and state which two are primarily responsible for water.', options: [
                { text: 'The four xylem elements are tracheids, vessels (vessel elements), xylem parenchyma, and', outcome: 'The four xylem elements are tracheids, vessels (vessel elements), xylem parenchyma, and xylem.' },
                { text: 'sieve tubes', outcome: 'Not quite — Students believe phloem transports food "downward only" from leaves to roots.', reveals: 'phloem-transports-food-downward-only' },
                { text: 'companion cells', outcome: 'Not quite — Students believe phloem transports food "downward only" from leaves to roots.', reveals: 'phloem-transports-food-downward-only' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch2_10', title: 'Identify each idea',
          dissect: { specimen: 'Tissues: Plant and Animal · Part 1/2', spots: [
            { id: 's1', label: 'Plant Tissues Meristematic vs Permanent Tissues', prompt: 'Which idea is this? — Meristematic tissue consists of undifferentiated, actively dividing cells with dense.', answer: 'Plant Tissues Meristematic vs Permanent Tissues', options: ['Plant Tissues Meristematic vs Permanent Tissues', 'Joints Types and Functions in the Skeleton', 'Human Skeleton Axial and Appendicular', 'Meristematic Tissues Apical Lateral and Intercalary'] },
            { id: 's2', label: 'Joints Types and Functions in the Skeleton', prompt: 'Which idea is this? — A joint (articulation) is a point where two or more bones meet, enabling movement and.', answer: 'Joints Types and Functions in the Skeleton', options: ['Joints Types and Functions in the Skeleton', 'Plant Tissues Meristematic vs Permanent Tissues', 'Human Skeleton Axial and Appendicular', 'Meristematic Tissues Apical Lateral and Intercalary'] },
            { id: 's3', label: 'Human Skeleton Axial and Appendicular', prompt: 'Which idea is this? — The human skeleton is divided into two major parts: the axial skeleton (80 bones) forming.', answer: 'Human Skeleton Axial and Appendicular', options: ['Human Skeleton Axial and Appendicular', 'Plant Tissues Meristematic vs Permanent Tissues', 'Joints Types and Functions in the Skeleton', 'Meristematic Tissues Apical Lateral and Intercalary'] },
            { id: 's4', label: 'Meristematic Tissues Apical Lateral and Intercalary', prompt: 'Which idea is this? — Meristematic tissues are groups of immature, undifferentiated plant cells that retain the.', answer: 'Meristematic Tissues Apical Lateral and Intercalary', options: ['Meristematic Tissues Apical Lateral and Intercalary', 'Plant Tissues Meristematic vs Permanent Tissues', 'Joints Types and Functions in the Skeleton', 'Human Skeleton Axial and Appendicular'] },
            { id: 's5', label: 'Simple Permanent Tissues Parenchyma Collenchyma Sclerenchyma', prompt: 'Which idea is this? — Simple permanent tissues are groups of structurally similar, non-dividing cells derived.', answer: 'Simple Permanent Tissues Parenchyma Collenchyma Sclerenchyma', options: ['Simple Permanent Tissues Parenchyma Collenchyma Sclerenchyma', 'Plant Tissues Meristematic vs Permanent Tissues', 'Joints Types and Functions in the Skeleton', 'Human Skeleton Axial and Appendicular'] },
            { id: 's6', label: 'Complex Permanent Tissues Xylem and Phloem', prompt: 'Which idea is this? — Complex permanent tissues are heterogeneous tissues composed of multiple cell types.', answer: 'Complex Permanent Tissues Xylem and Phloem', options: ['Complex Permanent Tissues Xylem and Phloem', 'Plant Tissues Meristematic vs Permanent Tissues', 'Joints Types and Functions in the Skeleton', 'Human Skeleton Axial and Appendicular'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Cattle graze the tip off a young wheat plant. Watching it later, a farmer\'s son predicts: \'Height growth is over, but it may still thicken at the stem — not every growing cell lives at the tip.\'',
            decisions: [{ prompt: 'Does his tissue-level reasoning hold up?', options: [
                { text: 'Yes — the grazed tip was the apical meristem that drives lengthening, but meristems are not only apical: the lateral meristem (cambium) keeps dividing to add girth. Meristematic cells are the thin-walled, densely cytoplasmic dividers; the thick-walled storage and transport cells are permanent tissue.', outcome: 'This applies the meristem-versus-permanent split and correctly locates which growing zone survives the grazing.' },
                { text: 'No — meristem means the tip, so losing the tip ends all growth everywhere in the plant.', outcome: 'Meristematic tissue also sits at grass nodes and in the woody cambium; \'dividing cells\' is a tissue type, not a single spot.', reveals: 'meristem-means-tip' },
                { text: 'It will regrow from the tip anyway, because all plant cells can divide whenever needed.', outcome: 'Permanent cells have differentiated past division — thick walls and big vacuoles are for their jobs, not for splitting; only meristems divide.', reveals: 'all-cells-divide' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'Meristem = the forever-dividing youth; permanent tissue = the specialists they become. A plant only grows where its meristems live — tips for length, sides for thickness, nodes for grass regrowth.',
            decisions: [{ prompt: 'What comes next? Tissues: Plant and Animal · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tissues: Plant and Animal · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch2_1', difficulty: 'standard',
          question: 'Meristematic tissue consists of undifferentiated, actively dividing cells with.',
          hint: 'Review c8_bio_ch1_3 (plant cell structure) and c8_bio_ch1_8 (levels of organisation).',
          misconception: 'Students believe meristematic tissue exists only at root and shoot tips (apical), forgetting that intercalary meristems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Meristematic tissue consists of undifferentiated, actively dividing cells with dense',
                  options: ['Meristematic tissue consists of undifferentiated, actively dividing cells with dense', 'A joint (articulation) is a point where two or more bones meet, enabling movement and', 'The human skeleton is divided into two major parts: the axial skeleton (80 bones) forming', 'Meristematic tissues are groups of immature, undifferentiated plant cells that retain the'],
                  hint: 'Review c8_bio_ch1_3 (plant cell structure) and c8_bio_ch1_8 (levels of organisation) — focus.',
                  misconception: 'Students believe meristematic tissue exists only at root and shoot tips (apical), forgetting that intercalary meristems at grass nodes and.' }
          ],
            remediations: { 'meristematic-tissue-exists-only-at': { steps: ['Show time-lapse video of grass regrowth after cutting — highlight node region.', 'Provide cross-sections of maize stem (monocot, intercalary) and sunflower stem (dicot, lateral) for microscopy.', 'Guide student to label meristematic zones in each and predict regrowth capacity.', 'Connect to farming practice: why lawn grass survives mowing but saplings die if tip is removed.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_10', difficulty: 'standard',
          question: 'A joint (articulation) is a point where two or more bones meet, enabling.',
          hint: 'If stuck, revisit c9_bio_ch2_9 (bone structure, articular cartilage, types of cartilage).',
          misconception: 'Students often believe that "ball-and-socket joints allow movement in all directions equally" and therefore think the.',
          parts: [
                { id: 'a', prompt: 'Name the three structural classifications of joints based on the connective tissue binding the bones, and give one example of each from the human body.', answer: 'The three structural classes are: (1) Fibrous joints',
                  options: ['The three structural classes are: (1) Fibrous joints', 'hinge, ball-and-socket, pivot', 'ball-and-socket joints allow movement in all directions equally', 'hinge, ball-and-socket, pivot" as structural classes'],
                  hint: 'If stuck, revisit c9_bio_ch2_9 (bone structure, articular cartilage, types of cartilage) and.',
                  misconception: 'Students often believe that "ball-and-socket joints allow movement in all directions equally" and therefore think the hip and shoulder have.' },
                { id: 'b', prompt: 'A student injures their knee during a football match. The doctor suspects a torn anterior cruciate ligament (ACL).', answer: 'Step 1: The knee is a synovial joint (fluid-filled cavity)',
                  options: ['Step 1: The knee is a synovial joint (fluid-filled cavity)', 'ball-and-socket joints allow movement in all directions equally', 'the hip and shoulder have identical ranges of motion'],
                  hint: 'If stuck, revisit c9_bio_ch2_9 (bone structure, articular cartilage, types of cartilage) and.',
                  misconception: 'Students often believe that "ball-and-socket joints allow movement in all directions equally" and therefore think the hip and shoulder have.' }
          ],
            remediations: { 'ball-and-socket-joints-allow': { steps: ['Have the student actively compare shoulder vs. hip motion — abduct, circumduct, rotate each joint fully.', 'Ask them to feel the "end-point" resistance in each direction.', 'Show a diagram of the acetabulum (deep, with labrum) vs. glenoid cavity (shallow, small).', 'Connect depth of socket + ligament tightness = stability trade-off.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "ball-and-socket joints allow movement in all directions equally" and therefore think the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All synovial joints are freely movable (diarthroses), therefore the sutures of the skull cannot be synovial joints." Is the reasoning.', answer: 'Yes, the reasoning is valid',
                  options: ['Yes, the reasoning is valid', 'sutures are immovable so they are not synovial', 'ball-and-socket joints allow movement in all directions equally', 'the hip and shoulder have identical ranges of motion'],
                  hint: 'If stuck, revisit c9_bio_ch2_9 (bone structure, articular cartilage, types of cartilage) and.',
                  misconception: 'Students often believe that "ball-and-socket joints allow movement in all directions equally" and therefore think the hip and shoulder have.' },
                { id: 'b', prompt: 'Design a simple classroom activity using only your own body (no models) to demonstrate the six types of synovial joints.', answer: 'A good answer lists: (1) Ball-and-socket',
                  options: ['A good answer lists: (1) Ball-and-socket', 'ball-and-socket joints allow movement in all directions equally', 'the hip and shoulder have identical ranges of motion'],
                  hint: 'If stuck, revisit c9_bio_ch2_9 (bone structure, articular cartilage, types of cartilage) and.',
                  misconception: 'Students often believe that "ball-and-socket joints allow movement in all directions equally" and therefore think the hip and shoulder have.' }
          ],
            remediations: { 'ball-and-socket-joints-allow': { steps: ['Have the student actively compare shoulder vs. hip motion — abduct, circumduct, rotate each joint fully.', 'Ask them to feel the "end-point" resistance in each direction.', 'Show a diagram of the acetabulum (deep, with labrum) vs. glenoid cavity (shallow, small).', 'Connect depth of socket + ligament tightness = stability trade-off.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_11', difficulty: 'standard',
          question: 'The human skeleton is divided into two major parts: the axial skeleton (80.',
          hint: 'Revisit c9_bio_ch2_9 (bone structure/functions) and c9_bio_ch2_10 (joint types).',
          misconception: 'Students often think the shoulder joint (glenohumeral) directly connects the humerus to the axial skeleton.',
          parts: [
                { id: 'a', prompt: 'A student claims the clavicle (collar bone) is part of the axial skeleton because it lies horizontally across the upper chest near the sternum.', answer: 'The clavicle is part of the appendicular skeleton',
                  options: ['The clavicle is part of the appendicular skeleton', 'it\'s near the sternum so it\'s axial'],
                  hint: 'Revisit c9_bio_ch2_9 (bone structure/functions) and c9_bio_ch2_10 (joint types) — specifically the.',
                  misconception: 'Students often think the shoulder joint (glenohumeral) directly connects the humerus to the axial skeleton (sternum/ribs).' },
                { id: 'b', prompt: 'During a football match, a player fractures their right femur.', answer: 'The femur is an appendicular bone (lower limb)',
                  options: ['The femur is an appendicular bone (lower limb)', 'both affect walking equally'],
                  hint: 'Revisit c9_bio_ch2_9 (bone structure/functions) and c9_bio_ch2_10 (joint types) — specifically the.',
                  misconception: 'Students often think the shoulder joint (glenohumeral) directly connects the humerus to the axial skeleton (sternum/ribs).' }
          ],
            remediations: { 'the-shoulder-joint-glenohumeral-directly': { steps: ['Have the student place their hand on their sternum, then raise their arm overhead.', 'They will feel the clavicle rotate at the sternoclavicular joint (the only bony axial-appendicular link) and the.', 'Next, have them try to raise their arm while pressing their clavicle down — they cannot fully elevate.', 'This demonstrates the clavicle acts as a strut (appendicular) bracing the limb away from the axial skeleton.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_2', difficulty: 'standard',
          question: 'Meristematic tissues are groups of immature, undifferentiated plant cells that.',
          hint: 'If stuck, revisit c9_bio_ch2_1 to review the definition and features of meristematic.',
          misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they.',
          parts: [
                { id: 'a', prompt: 'Name the three types of meristematic tissues classified on the basis of their location in the plant body.', answer: 'The three types are apical meristem, lateral meristem, and intercalary meristem',
                  options: ['The three types are apical meristem, lateral meristem, and intercalary meristem', 'permanent tissues like parenchyma or xylem', 'grasses grow tall only from their tips like trees'],
                  hint: 'If stuck, revisit c9_bio_ch2_1 to review the definition and features of meristematic vs permanent.',
                  misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they think grasses grow.' },
                { id: 'b', prompt: 'A farmer cuts the top of a young maize plant (apical meristem removed) but leaves the lower nodes intact.', answer: 'The maize plant will not grow taller from the cut tip',
                  options: ['The maize plant will not grow taller from the cut tip', 'grasses grow tall only from their tips like trees'],
                  hint: 'If stuck, revisit c9_bio_ch2_1 to review the definition and features of meristematic vs permanent.',
                  misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they think grasses grow.' }
          ],
            remediations: { 'intercalary-meristems-are-a-subtype': { steps: ['Show a time-lapse video (or series of photos) of grass regrowing after cutting vs a tree branch not regrowing from the.', 'Have students mark nodes on a grass stem with a pen, cut above a node, and measure daily growth at each node for a week.', 'Compare with onion root tip observation under microscope.', 'Explicitly contrast: "Apical = tip only; Intercalary = nodes/internodes; Lateral = sides."'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_3', difficulty: 'standard',
          question: 'Simple permanent tissues are groups of structurally similar, non-dividing cells.',
          hint: 'Revisit c9_bio_ch2_2 (meristematic differentiation) and c8_bio_ch1_7 (cell.',
          misconception: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see.',
          parts: [
                { id: 'a', prompt: 'A student examines a transverse section of a maize stem and sees thick-walled, lignified, dead cells with narrow lumens surrounding the vascular bundles.', answer: 'This is sclerenchyma (specifically fibers)',
                  options: ['This is sclerenchyma (specifically fibers)', 'parenchyma', 'no change', 'thick wall = dead cell'],
                  hint: 'Revisit c9_bio_ch2_2 (meristematic differentiation) and c8_bio_ch1_7 (cell shape-function) to see.',
                  misconception: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see collenchyma\'s corner.' }
          ],
            remediations: { 'all-thick-walled-plant-cells': { steps: ['Prepare fresh transverse sections of pumpkin petiole (collenchyma ridges) and pear fruit (stone cells/sclereids).', 'Stain with phloroglucinol-HCl: collenchyma stays unstained (no lignin), sclereids turn red (lignin present).', 'Observe under low power: collenchyma cells have living cytoplasm, intact nucleus; sclereids are empty, thick-walled.', 'Ask: "Which tissue can still divide if wounded?" (Parenchyma/collenchyma can dedifferentiate; sclerenchyma cannot).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_4', difficulty: 'standard',
          question: 'Complex permanent tissues are heterogeneous tissues composed of multiple cell.',
          hint: 'If stuck, review c9_bio_ch2_3 (simple permanent tissues) to see how parenchyma and.',
          misconception: 'Students believe phloem transports food "downward only" from leaves to roots.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Complex permanent tissues are heterogeneous tissues composed of multiple cell types',
                  options: ['Complex permanent tissues are heterogeneous tissues composed of multiple cell types', 'Meristematic tissue consists of undifferentiated, actively dividing cells with dense', 'A joint (articulation) is a point where two or more bones meet, enabling movement and', 'The human skeleton is divided into two major parts: the axial skeleton (80 bones) forming'],
                  hint: 'If stuck, review c9_bio_ch2_3 (simple permanent tissues) to see how parenchyma and sclerenchyma.',
                  misconception: 'Students believe phloem transports food "downward only" from leaves to roots.' }
          ],
            remediations: { 'phloem-transports-food-downward-only': { steps: ['Show a time-lapse video of radioactive carbon-14 labeling in a plant - students see label move both up and down from.', 'Use the "source-sink" card game: give cards labeled "mature leaf (source)", "young leaf (sink)", "root (storage)".', 'Have them dissect a germinating bean seed - observe food moving from cotyledons (source) upward to plumule (sink) via.', 'Assign a writing task: "Explain why a gardener removes lower leaves on tomato plants" - connects source-sink.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
