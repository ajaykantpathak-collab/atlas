import type { SimDef } from '../../engine/types';
import C11_BiologyLocomotionAndMovementSim from '../../../simulations/c6_12/C11_BiologyLocomotionAndMovementSim';

/** v3 wrapped master — C11_BiologyLocomotionAndMovementSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologylocomotionandmovementsim: SimDef = {
    id: 'v3w_c11_biologylocomotionandmovementsim',
    title: 'Types of Movement: Amoeboid, Ciliary, Muscular',
    subtitle: 'This node covers the classification, cellular mechanism, and physiological examples of.',
    classLevel: 11, subject: 'biology', topic: 'Types of Movement: Amoeboid, Ciliary, Muscular',
    chapters: [],
    nodeIds: ['c11_bio_cbse_17_001', 'c11_bio_cbse_17_006', 'c11_bio_cbse_17_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'When you sneeze, dust particles trapped in your trachea are expelled - this is ciliary movement at work.', goal: 'Master Types of Movement: Amoeboid, Ciliary, Muscular.' },
    discovery: {
        question: 'Name the type of movement exhibited by human leucocytes and macrophages, and identify the cytoskeletal element primarily responsible for it.',
        options: ['Amoeboid movement', 'ciliary movement', 'muscular movement'],
        answer: 'Amoeboid movement',
        hook: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" -.',
    },
    teaching: [
        { title: 'Amoeboid, ciliary, and muscular movements.', text: 'Amoeboid, ciliary, and muscular movements are the three fundamental types of cellular movements exhibited by specialized cells in the human body: amoeboid movement involves pseudopodia formation.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_17_001', title: 'Amoeboid, ciliary, and muscular.',
          scaffold: { problem: 'A researcher observes two cell types under a microscope. Cell A extends blunt, finger-like projections that pull the cell body forward at.',
            steps: [
            { text: 'Analyze Cell A motion - slow, shape-changing projections (pseudopodia) pulling cell body = amoeboid movement.' },
            { text: 'Recall amoeboid movement mechanism - cytoplasmic streaming driven by actin microfilament.' },
            { text: 'Identify human cells showing this - macrophages (tissue), leucocytes (blood) during immune response and diapedesis.' },
            { text: 'Analyze Cell B motion - fixed cell, rapid coordinated beating of surface cilia moving fluid = ciliary movement.' },
            { text: 'Recall ciliary mechanism - microtubule-based 9+2 axoneme with dynein arms causing sliding.' },
            { text: 'Identify human locations - trachea/bronchi (mucus clearance), fallopian tubes (ovum transport), ependymal lining of.', faded: true, blankAnswer: 'Cell A = Amoeboid movement (actin microfilaments) - occurs.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_17_006', title: 'A joint (articulation) is a point of.',
          scaffold: { problem: 'A 16-year-old cricket bowler complains of shoulder pain during overarm bowling.',
            steps: [
            { text: 'Identify the joint in question — glenohumeral (shoulder) joint, a ball-and-socket synovial joint.' },
            { text: 'Recall the structural features of a synovial ball-and-socket joint: ball (humeral head), socket (glenoid cavity),.' },
            { text: 'Compare shoulder vs hip socket depth — shoulder has a shallow glenoid cavity deepened only slightly by the glenoid.' },
            { text: 'Compare capsular laxity — shoulder capsule is loose and redundant to allow wide circumduction; hip capsule is thick,.' },
            { text: 'Conclude that the shallow socket and loose capsule sacrifice stability for mobility, making the shoulder prone to.', faded: true, blankAnswer: 'The shoulder joint\'s shallow glenoid cavity and loose.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_17_005', title: 'The human skeletal system is a.',
          scaffold: { problem: 'A forensic anthropologist finds an isolated bone: it is long, slightly curved, has a prominent deltoid tuberosity on the lateral shaft, a.',
            steps: [
            { text: 'Recognize "long bone with deltoid tuberosity" → characteristic of humerus (upper arm bone).' },
            { text: 'Note "radial groove" (spiral groove) for radial nerve — unique to humerus shaft.' },
            { text: 'Distal end: capitulum (articulates with radius head) and trochlea (articulates with ulna trochlear notch) — confirms.' },
            { text: 'Determine side: Hold bone with capitulum/trochlea down (distal), olecranon fossa posterior.' },
            { text: 'Classification: Humerus is a forelimb bone → appendicular skeleton.', faded: true, blankAnswer: 'Right humerus, appendicular skeleton.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_17_006', title: 'Identify each idea',
          dissect: { specimen: 'Types of Movement: Amoeboid, Ciliary, Muscular', spots: [
            { id: 's1', label: 'Amoeboid ciliary and muscular movements', prompt: 'Which idea is this? — Amoeboid, ciliary, and muscular movements are the three fundamental types of cellular.', answer: 'Amoeboid ciliary and muscular movements', options: ['Amoeboid ciliary and muscular movements', 'A joint articulation is a', 'The human skeletal system is'] },
            { id: 's2', label: 'A joint articulation is a', prompt: 'Which idea is this? — A joint (articulation) is a point of contact between two or more bones, or between bone.', answer: 'A joint articulation is a', options: ['A joint articulation is a', 'Amoeboid ciliary and muscular movements', 'The human skeletal system is'] },
            { id: 's3', label: 'The human skeletal system is', prompt: 'Which idea is this? — The human skeletal system is a framework of 206 bones and associated cartilages divided.', answer: 'The human skeletal system is', options: ['The human skeletal system is', 'Amoeboid ciliary and muscular movements', 'A joint articulation is a'] }
          ] } }
    ],
    explore: { component: C11_BiologyLocomotionAndMovementSim, prompt: 'Explore the interactive — Types of Movement: Amoeboid, Ciliary, Muscular' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_001', difficulty: 'standard',
          question: 'Amoeboid, ciliary, and muscular movements are the three fundamental types of.',
          hint: 'Review Class 9 Cell Structure (c9_bio_ch1_6) for cytoskeleton overview, and Class 11 Cell.',
          misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" -.',
          parts: [
                { id: 'a', prompt: 'Name the type of movement exhibited by human leucocytes and macrophages, and identify the cytoskeletal element primarily responsible for it.', answer: 'Amoeboid movement',
                  options: ['Amoeboid movement', 'ciliary movement', 'muscular movement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' },
                { id: 'b', prompt: 'Compare the energy requirement and speed of response for amoeboid movement versus muscular movement. Which would be faster for a rapid escape response, and why?', answer: 'Muscular movement is faster for rapid escape',
                  options: ['Muscular movement is faster for rapid escape', 'amoeboid is faster', 'beating'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' }
          ],
            remediations: { 'ciliary-movement-and-muscular-movement': { steps: ['Show side-by-side videos of ciliary beating (Paramecium/ tracheal epithelium) and muscle contraction (frog.', 'Provide TEM cross-section diagrams of cilium (9+2 microtubules) and sarcomere (actin-myosin) - have students label.', 'Use chemical inhibitors: cytochalasin D (blocks actin) stops amoeboid/muscular but not ciliary; colchicine (blocks.', 'Have students complete a comparison table: cytoskeletal basis, motor protein, ATP usage, speed, Ca²⁺ dependence.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" -.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All three movement types - amoeboid, ciliary, and muscular - ultimately depend on actin filaments." Evaluate this claim.', answer: 'Partially correct',
                  options: ['Partially correct', 'beating', 'contraction', 'cilia are tiny muscles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' },
                { id: 'b', prompt: 'Design a simple microscopy-based experiment to distinguish between amoeboid and ciliary movement in a mixed cell sample containing macrophages and ciliated.', answer: 'Place sample on a slide, observe under phase-contrast microscopy at 400x',
                  options: ['Place sample on a slide, observe under phase-contrast microscopy at 400x', 'beating', 'contraction', 'cilia are tiny muscles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' },
                { id: 'c', prompt: 'Compare the energy requirement and speed of response for amoeboid movement versus muscular movement. Which would be faster for a rapid escape response, and why?', answer: 'Muscular movement is faster for rapid escape',
                  options: ['Muscular movement is faster for rapid escape', 'amoeboid is faster', 'beating', 'contraction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' }
          ],
            remediations: { 'ciliary-movement-and-muscular-movement': { steps: ['Show side-by-side videos of ciliary beating (Paramecium/ tracheal epithelium) and muscle contraction (frog.', 'Provide TEM cross-section diagrams of cilium (9+2 microtubules) and sarcomere (actin-myosin) - have students label.', 'Use chemical inhibitors: cytochalasin D (blocks actin) stops amoeboid/muscular but not ciliary; colchicine (blocks.', 'Have students complete a comparison table: cytoskeletal basis, motor protein, ATP usage, speed, Ca²⁺ dependence.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_006', difficulty: 'standard',
          question: 'A joint (articulation) is a point of contact between two or more bones, or.',
          hint: 'If stuck on bone names or locations, revisit c11_bio_cbse_17_005 (Skeletal System) and.',
          misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like.',
          parts: [
                { id: 'a', prompt: 'Name the three structural classes of joints and state the type of connecting tissue that defines each class.', answer: 'The three structural classes are: (1) Fibrous joints',
                  options: ['The three structural classes are: (1) Fibrous joints', 'hinge, ball-and-socket', 'hinge joint'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' },
                { id: 'b', prompt: 'Why are sutures between cranial bones classified as fibrous joints even though they permit no movement in adults?', answer: 'Sutures are fibrous joints',
                  options: ['Sutures are fibrous joints', 'because they are immovable they are fibrous', 'hinge joint'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' },
                { id: 'c', prompt: 'A patient cannot rotate their forearm to turn a doorknob (supination/pronation) but can flex and extend the elbow normally.', answer: 'The proximal radioulnar joint (a pivot joint) is impaired',
                  options: ['The proximal radioulnar joint (a pivot joint) is impaired', 'ball-and-socket joint of elbow', 'hinge joint'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' }
          ],
            remediations: { 'hinge-joint-and-pivot-joint': { steps: ['Draw a three-column table with headers "Fibrous", "Cartilaginous", "Synovial".', 'In each column, list the connecting tissue, presence/absence of cavity, and movement capacity.', 'Under Synovial, create six sub-rows for the subtypes; for each, write the bony elements (ball/socket, cylinder/ring,.', 'Cover the examples and quiz yourself: "Which joint uses a fibrocartilage pad?" → Pubic symphysis (cartilaginous).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All cartilaginous joints are slightly movable because cartilage is flexible." Is it correct? Justify.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'hinge joint', 'pivot joint'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' },
                { id: 'b', prompt: 'Design a simple classification key (dichotomous or flowchart) that a Class 11 student could use to identify any human joint as fibrous, cartilaginous, or.', answer: 'A good key: 1',
                  options: ['A good key: 1', 'hinge joint', 'pivot joint'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' }
          ],
            remediations: { 'hinge-joint-and-pivot-joint': { steps: ['Draw a three-column table with headers "Fibrous", "Cartilaginous", "Synovial".', 'In each column, list the connecting tissue, presence/absence of cavity, and movement capacity.', 'Under Synovial, create six sub-rows for the subtypes; for each, write the bony elements (ball/socket, cylinder/ring,.', 'Cover the examples and quiz yourself: "Which joint uses a fibrocartilage pad?" → Pubic symphysis (cartilaginous).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_005', difficulty: 'standard',
          question: 'The human skeletal system is a framework of 206 bones and associated cartilages.',
          hint: 'Revisit Class 9 node c9_bio_ch2_11 (Human Skeleton: Axial and Appendicular) and.',
          misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Why are the 8th, 9th, and 10th rib pairs called vertebrochondral (false) ribs, while the 11th and 12th are floating ribs?', answer: 'Vertebrochondral ribs (8th–10th) do not attach directly to the sternum',
                  options: ['Vertebrochondral ribs (8th–10th) do not attach directly to the sternum', 'false ribs attach to sternum directly', 'indirect attachment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' },
                { id: 'b', prompt: 'Compare the pectoral and pelvic girdles in terms of (a) bone composition, (b) socket depth and mobility, (c) weight-bearing adaptation, and (d) sexual.', answer: 'bone composition, (',
                  options: ['bone composition, (', 'both have deep sockets', 'sternum is a single long bone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' }
          ],
            remediations: { 'the-sternum-is-a-single': { steps: ['Hold a physical or 3D model of the sternum — feel the manubrial angle (sternal angle/angle of Louis) where manubrium.', 'Take a rib cage model; detach ribs one by one. Observe the direct costal cartilage of ribs 1–7 inserting into sternal.', 'Draw a labelled diagram of the sternum in three parts and the rib attachment pattern.', 'Explain aloud: "True ribs = direct; False ribs = indirect; Floating ribs = none." This kinesthetic + visual + verbal.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The human vertebral column has 33 vertebrae, but we say 26 in adults.', answer: 'The statement is false',
                  options: ['The statement is false', 'contradiction', 'bones are lost', 'sternum is a single long bone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' },
                { id: 'b', prompt: 'Design a simple identification key (dichotomous or tabular) that allows a student to distinguish an isolated human bone as belonging to: (i) axial vs.', answer: '**Key:** 1',
                  options: ['**Key:** 1', 'sternum is a single long bone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' },
                { id: 'c', prompt: 'Compare the pectoral and pelvic girdles in terms of (a) bone composition, (b) socket depth and mobility, (c) weight-bearing adaptation, and (d) sexual.', answer: 'bone composition, (',
                  options: ['bone composition, (', 'both have deep sockets', 'sternum is a single long bone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' }
          ],
            remediations: { 'the-sternum-is-a-single': { steps: ['Hold a physical or 3D model of the sternum — feel the manubrial angle (sternal angle/angle of Louis) where manubrium.', 'Take a rib cage model; detach ribs one by one. Observe the direct costal cartilage of ribs 1–7 inserting into sternal.', 'Draw a labelled diagram of the sternum in three parts and the rib attachment pattern.', 'Explain aloud: "True ribs = direct; False ribs = indirect; Floating ribs = none." This kinesthetic + visual + verbal.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
