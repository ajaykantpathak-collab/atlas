import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch17_p1: SimDef = {
    id: 'v3_c11_bio_ch17_p1',
    title: 'Locomotion and Movement · Part 1/2',
    subtitle: 'Match three engines of cellular movement to the jobs only each can do.',
    classLevel: 11, subject: 'biology', topic: 'Locomotion and Movement · Part 1/2',
    chapters: ['c11_bio_ch17'],
    nodeIds: ['c11_bio_cbse_17_001', 'c11_bio_cbse_17_002', 'c11_bio_cbse_17_003', 'c11_bio_cbse_17_004', 'c11_bio_cbse_17_005', 'c11_bio_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cell biologist diagnosing a motility disorder from symptoms', intro: 'The patient\'s mucus isn\'t clearing and the doctors are guessing. The defect is in one motor protein — figure out which systems that protein runs.', goal: 'Distinguish amoeboid, ciliary, and muscular movement by mechanism, location, and cytoskeletal basis.' },
    discovery: {
        question: 'A patient is born with cilia whose dynein arms don\'t work. Which two of these will fail: macrophage migration to a wound, mucus clearance from the trachea, ovum transport in the fallopian tube, biceps contraction, intestinal peristalsis?',
        options: ['Tracheal mucus clearance and ovum transport — both ride on beating cilia, while the others use entirely different machinery', 'Macrophage migration and peristalsis — dynein powers all cell crawling', 'Biceps contraction and ovum transport — both are forms of propulsion', 'All five — dynein is the universal motor of the body'],
        answer: 'Tracheal mucus clearance and ovum transport — both ride on beating cilia, while the others use entirely different machinery',
        hook: 'Three different engines move your cells — microfilament crawling, ciliary sweeping, actin-myosin sliding — and swapping one for another is the classic mix-up.',
    },
    teaching: [
        { title: 'Types of Movement: Amoeboid, Ciliary, Muscular', text: 'Amoeboid, ciliary, and muscular movements are the three fundamental types of cellular movements exhibited by specialized cells in the human body: amoeboid movement involves pseudopodia formation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_17_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Assign the right movement type — amoeboid, ciliary, or muscular — to a sneeze\'s cleanup crew, a white blood cell chasing bacteria, and an arm catching a ball, naming the cytoskeletal machinery behind each.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_001', title: 'Types of Movement: Amoeboid, Ciliary, Muscular',
          caseStudy: { intro: 'When you sneeze, dust particles trapped in your trachea are expelled - this is ciliary movement at work.',
            decisions: [{ prompt: 'Name the type of movement exhibited by human leucocytes and macrophages, and identify the cytoskeletal element primarily responsible for it.', options: [
                { text: 'Amoeboid movement', outcome: 'Amoeboid movement; microfilaments (actin filaments). A wrong answer (e.g., "ciliary movement".' },
                { text: 'ciliary movement', outcome: 'Not quite — Students believe ciliary movement and muscular movement are similar because both involve "beating".', reveals: 'ciliary-movement-and-muscular-movement' },
                { text: 'muscular movement', outcome: 'Not quite — Students believe ciliary movement and muscular movement are similar because both involve "beating".', reveals: 'ciliary-movement-and-muscular-movement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_002', title: 'Types of Muscles: Skeletal, Smooth, Cardiac',
          caseStudy: { intro: 'Observe your forearm while you deliberately make a fist — you see and feel the skeletal muscles bulge under voluntary control.',
            decisions: [{ prompt: 'Name the muscle type that is both striated and involuntary, and state its exclusive location in the human body.', options: [
                { text: 'Cardiac muscle; found only in the heart wall (myocardium)', outcome: 'Cardiac muscle; found only in the heart wall (myocardium). A wrong answer (e.g., "smooth muscle".' },
                { text: 'smooth muscle', outcome: 'Not quite — Students often think "striated = voluntary" and "non-striated = involuntary" as absolute rules.', reveals: 'striated-voluntary-and-non-striated' },
                { text: 'skeletal muscle', outcome: 'Not quite — Students often think "striated = voluntary" and "non-striated = involuntary" as absolute rules.', reveals: 'striated-voluntary-and-non-striated' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_003', title: 'Structure of Skeletal Muscle: Sliding Filament Theory',
          caseStudy: { intro: 'When you flex your arm to lift a bucket of water, your biceps muscle shortens visibly.',
            decisions: [{ prompt: 'Define a sarcomere and state which bands change width during muscle contraction.', options: [
                { text: 'A sarcomere is the functional unit of contraction, defined as the segment of a myofibril', outcome: 'A sarcomere is the functional unit of contraction, defined as the segment of a myofibril between.' },
                { text: 'A-band shortens', outcome: 'Not quite — Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments.', reveals: 'during-muscle-contraction' },
                { text: 'the filaments got shorter, not that they moved', outcome: 'Not quite — Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments.', reveals: 'during-muscle-contraction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_004', title: 'Muscle Contraction: Excitation-Contraction Coupling',
          caseStudy: { intro: 'Imagine you decide to pick up your biology textbook. Your brain sends a signal, but how does that "decision" actually pull your forearm bones closer?',
            decisions: [{ prompt: 'Name the specific protein complex on the thin filament that binds calcium ions during excitation-contraction coupling, and state the.', options: [
                { text: 'The troponin complex (specifically the troponin-C subunit) binds Ca²⁺', outcome: 'The troponin complex (specifically the troponin-C subunit) binds Ca²⁺.' },
                { text: 'tropomyosin binds calcium', outcome: 'Not quite — **Misconception:** "Calcium binds directly to actin to expose myosin-binding sites." **Exact Wrong.', reveals: 'misconception-calcium-binds-directly-to' },
                { text: 'myosin binds calcium', outcome: 'Not quite — **Misconception:** "Calcium binds directly to actin to expose myosin-binding sites." **Exact Wrong.', reveals: 'misconception-calcium-binds-directly-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_005', title: 'Skeletal System: Axial and Appendicular',
          caseStudy: { intro: 'Observe a human skeleton model or diagram: notice the central vertical column (axial) versus the paired limbs hanging from it (appendicular).',
            decisions: [{ prompt: 'Name the two occipital condyles and state their articulation. How many cervical vertebrae are present in humans, and which two are uniquely.', options: [
                { text: 'The two occipital condyles articulate with the superior articular facets of the atlas', outcome: 'The two occipital condyles articulate with the superior articular facets of the atlas (C1), forming.' },
                { text: 'single condyle', outcome: 'Not quite — Students often believe the "sternum is a single long bone" and that "all ribs attach directly.', reveals: 'the-sternum-is-a-single' },
                { text: 'monocondylic', outcome: 'Not quite — Students often believe the "sternum is a single long bone" and that "all ribs attach directly.', reveals: 'the-sternum-is-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_006', title: 'Joints: Types and Structure',
          caseStudy: { intro: 'Observe your own hand: make a fist, then spread your fingers wide. Now rotate your thumb in a circle — notice how it moves differently from your fingers.',
            decisions: [{ prompt: 'Name the three structural classes of joints and state the type of connecting tissue that defines each class.', options: [
                { text: 'The three structural classes are: (1) Fibrous joints', outcome: 'The three structural classes are: (1) Fibrous joints — bones connected by dense fibrous connective.' },
                { text: 'hinge, ball-and-socket', outcome: 'Not quite — Students often believe "hinge joint" and "pivot joint" are separate structural classes like.', reveals: 'hinge-joint-and-pivot-joint' },
                { text: 'hinge joint', outcome: 'Not quite — Students often believe "hinge joint" and "pivot joint" are separate structural classes like.', reveals: 'hinge-joint-and-pivot-joint' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_17_002', title: 'Identify each idea',
          dissect: { specimen: 'Locomotion and Movement · Part 1/2', spots: [
            { id: 's1', label: 'Types of Movement Amoeboid Ciliary Muscular', prompt: 'Which idea is this? — Amoeboid, ciliary, and muscular movements are the three fundamental types of cellular.', answer: 'Types of Movement Amoeboid Ciliary Muscular', options: ['Types of Movement Amoeboid Ciliary Muscular', 'Types of Muscles Skeletal Smooth Cardiac', 'Structure of Skeletal Muscle Sliding Filament Theory', 'Muscle Contraction Excitation-Contraction Coupling'] },
            { id: 's2', label: 'Types of Muscles Skeletal Smooth Cardiac', prompt: 'Which idea is this? — Muscles are specialised mesodermal tissues constituting 40–50% of adult human body mass.', answer: 'Types of Muscles Skeletal Smooth Cardiac', options: ['Types of Muscles Skeletal Smooth Cardiac', 'Types of Movement Amoeboid Ciliary Muscular', 'Structure of Skeletal Muscle Sliding Filament Theory', 'Muscle Contraction Excitation-Contraction Coupling'] },
            { id: 's3', label: 'Structure of Skeletal Muscle Sliding Filament Theory', prompt: 'Which idea is this? — The sliding filament theory explains skeletal muscle contraction as the process where.', answer: 'Structure of Skeletal Muscle Sliding Filament Theory', options: ['Structure of Skeletal Muscle Sliding Filament Theory', 'Types of Movement Amoeboid Ciliary Muscular', 'Types of Muscles Skeletal Smooth Cardiac', 'Muscle Contraction Excitation-Contraction Coupling'] },
            { id: 's4', label: 'Muscle Contraction Excitation-Contraction Coupling', prompt: 'Which idea is this? — Excitation-contraction coupling is the physiological process by which an electrical.', answer: 'Muscle Contraction Excitation-Contraction Coupling', options: ['Muscle Contraction Excitation-Contraction Coupling', 'Types of Movement Amoeboid Ciliary Muscular', 'Types of Muscles Skeletal Smooth Cardiac', 'Structure of Skeletal Muscle Sliding Filament Theory'] },
            { id: 's5', label: 'Skeletal System Axial and Appendicular', prompt: 'Which idea is this? — The human skeletal system is a framework of 206 bones and associated cartilages divided.', answer: 'Skeletal System Axial and Appendicular', options: ['Skeletal System Axial and Appendicular', 'Types of Movement Amoeboid Ciliary Muscular', 'Types of Muscles Skeletal Smooth Cardiac', 'Structure of Skeletal Muscle Sliding Filament Theory'] },
            { id: 's6', label: 'Joints Types and Structure', prompt: 'Which idea is this? — A joint (articulation) is a point of contact between two or more bones, or between bone.', answer: 'Joints Types and Structure', options: ['Joints Types and Structure', 'Types of Movement Amoeboid Ciliary Muscular', 'Types of Muscles Skeletal Smooth Cardiac', 'Structure of Skeletal Muscle Sliding Filament Theory'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a physiology demo your teacher adds two drugs to separate cultures: cytochalasin D (blocks actin filaments) and colchicine (blocks microtubules). Your task: predict which stops (a) macrophages crawling to engulf debris, (b) tracheal cilia sweeping mucus, (c) a muscle fibre contracting. A classmate says all three involve \'beating or squeezing\', so both drugs should stop everything.',
            decisions: [{ prompt: 'Map drug to movement correctly.', options: [
                { text: 'Cytochalasin stops amoeboid crawling and muscle contraction (both actin/microfilament-based) but not cilia. Colchicine stops ciliary beating (9+2 microtubule axoneme powered by dynein) but not the actin systems. \'Beating\' cilia and \'contracting\' muscle run on entirely different molecular motors.', outcome: 'Matching movement to cytoskeleton — microfilaments for amoeboid/muscular, microtubules for ciliary — predicts the inhibitor correctly.' },
                { text: 'Both drugs stop all three — beating cilia are tiny muscles working by sliding filaments.', outcome: 'Cilia are microtubule-based with dynein motors, not actin-myosin; treating them as mini-muscles wrongly predicts they\'ll respond to actin blockers.', reveals: 'cilia-are-tiny-muscles' },
                { text: 'Colchicine stops everything because all movement needs ATP and microtubules.', outcome: 'All three use ATP, but macrophage pseudopodia and sarcomeres are actin-based; only cilia depend on microtubules.', reveals: 'all-movement-needs-microtubules' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now read any movement by its mechanism: pseudopodia mean actin, fluid currents mean cilia, force and posture mean the sliding filament.',
            decisions: [{ prompt: 'What comes next? Locomotion and Movement · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Locomotion and Movement · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_001', difficulty: 'standard',
          question: 'Amoeboid, ciliary, and muscular movements are the three fundamental types.',
          hint: 'Review Class 9 Cell Structure (c9_bio_ch1_6) for cytoskeleton overview, and Class 11 Cell.',
          misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction".',
          parts: [
                { id: 'a', prompt: 'Name the type of movement exhibited by human leucocytes and macrophages, and identify the cytoskeletal element primarily responsible for it.', answer: 'Amoeboid movement',
                  options: ['Amoeboid movement', 'ciliary movement', 'muscular movement', 'microtubules'],
                  hint: 'Review Class 9 Cell Structure (c9_bio_ch1_6) for cytoskeleton overview, and Class 11 Cell Biology.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' },
                { id: 'b', prompt: 'Compare the energy requirement and speed of response for amoeboid movement versus muscular movement. Which would be faster for a rapid escape response, and why?', answer: 'Muscular movement is faster for rapid escape',
                  options: ['Muscular movement is faster for rapid escape', 'amoeboid is faster', 'beating', 'contraction'],
                  hint: 'Review Class 9 Cell Structure (c9_bio_ch1_6) for cytoskeleton overview, and Class 11 Cell Biology.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' }
          ],
            remediations: { 'ciliary-movement-and-muscular-movement': { steps: ['Show side-by-side videos of ciliary beating (Paramecium/ tracheal epithelium) and muscle contraction (frog.', 'Provide TEM cross-section diagrams of cilium (9+2 microtubules) and sarcomere (actin-myosin) - have students label.', 'Use chemical inhibitors: cytochalasin D (blocks actin) stops amoeboid/muscular but not ciliary; colchicine (blocks.', 'Have students complete a comparison table: cytoskeletal basis, motor protein, ATP usage, speed, Ca²⁺ dependence.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction".',
          parts: [
                { id: 'a', prompt: 'A student claims: "All three movement types - amoeboid, ciliary, and muscular - ultimately depend on actin filaments." Evaluate this claim.', answer: 'Partially correct',
                  options: ['Partially correct', 'beating', 'contraction', 'cilia are tiny muscles'],
                  hint: 'Review Class 9 Cell Structure (c9_bio_ch1_6) for cytoskeleton overview, and Class 11 Cell Biology.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' },
                { id: 'b', prompt: 'Design a simple microscopy-based experiment to distinguish between amoeboid and ciliary movement in a mixed cell sample containing macrophages and ciliated.', answer: 'Place sample on a slide, observe under phase-contrast microscopy at 400x',
                  options: ['Place sample on a slide, observe under phase-contrast microscopy at 400x', 'beating', 'contraction', 'cilia are tiny muscles'],
                  hint: 'Review Class 9 Cell Structure (c9_bio_ch1_6) for cytoskeleton overview, and Class 11 Cell Biology.',
                  misconception: 'Students believe ciliary movement and muscular movement are similar because both involve "beating" or "contraction" - they think cilia are.' }
          ],
            remediations: { 'ciliary-movement-and-muscular-movement': { steps: ['Show side-by-side videos of ciliary beating (Paramecium/ tracheal epithelium) and muscle contraction (frog.', 'Provide TEM cross-section diagrams of cilium (9+2 microtubules) and sarcomere (actin-myosin) - have students label.', 'Use chemical inhibitors: cytochalasin D (blocks actin) stops amoeboid/muscular but not ciliary; colchicine (blocks.', 'Have students complete a comparison table: cytoskeletal basis, motor protein, ATP usage, speed, Ca²⁺ dependence.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_002', difficulty: 'standard',
          question: 'Muscles are specialised mesodermal tissues constituting 40–50% of adult human.',
          hint: 'Revise Class 10 "Respiration: Aerobic vs Anaerobic and Energy Release".',
          misconception: 'Students often think "striated = voluntary" and "non-striated = involuntary" as absolute rules, leading them.',
          parts: [
                { id: 'a', prompt: 'Name the muscle type that is both striated and involuntary, and state its exclusive location in the human body.', answer: 'Cardiac muscle; found only in the heart wall (myocardium)',
                  options: ['Cardiac muscle; found only in the heart wall (myocardium)', 'smooth muscle', 'skeletal muscle', 'striated = voluntary'],
                  hint: 'Revise Class 10 "Respiration: Aerobic vs Anaerobic and Energy Release" (c10_bio_cbse_01_007) and.',
                  misconception: 'Students often think "striated = voluntary" and "non-striated = involuntary" as absolute rules, leading them to misclassify cardiac muscle.' },
                { id: 'b', prompt: 'Compare the nuclear arrangement in skeletal, smooth, and cardiac muscle fibres. How does this structural difference reflect their mode of growth and repair?', answer: 'Skeletal: multinucleate (syncytium from fusion of myoblasts)',
                  options: ['Skeletal: multinucleate (syncytium from fusion of myoblasts)', 'striated = voluntary', 'non-striated = involuntary', 'visceral muscle'],
                  hint: 'Revise Class 10 "Respiration: Aerobic vs Anaerobic and Energy Release" (c10_bio_cbse_01_007) and.',
                  misconception: 'Students often think "striated = voluntary" and "non-striated = involuntary" as absolute rules, leading them to misclassify cardiac muscle.' }
          ],
            remediations: { 'striated-voluntary-and-non-striated': { steps: ['Draw a 3×3 matrix (rows: skeletal, smooth, cardiac; columns: striation, control, location).', 'Fill each cell from NCERT text, highlighting the cardiac row as the exception.', 'Practice with five micrograph images (provide or find online) — identify each and justify using all three criteria.', 'Write one sentence explaining why "striated ≠ voluntary" using cardiac muscle as the counter-example.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_003', difficulty: 'standard',
          question: 'The sliding filament theory explains skeletal muscle contraction as the process.',
          hint: 'If stuck, review c9_bio_ch2_7 (Muscular Tissue) for striated muscle ultrastructure and.',
          misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments themselves shorten.',
          parts: [
                { id: 'a', prompt: 'Explain why the H-zone disappears when a sarcomere is fully contracted, but the A-band does not.', answer: 'The H-zone represents the region where only thick (myosin) filaments are present',
                  options: ['The H-zone represents the region where only thick (myosin) filaments are present', 'the filaments got shorter, not that they moved'],
                  hint: 'If stuck, review c9_bio_ch2_7 (Muscular Tissue) for striated muscle ultrastructure and.',
                  misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments themselves shorten or compress like springs.' },
                { id: 'b', prompt: 'A muscle fibre is stimulated but contains no ATP. Predict the state of cross-bridges and sarcomere length, and justify your answer.', answer: 'Without ATP, myosin heads cannot detach from actin after the power stroke',
                  options: ['Without ATP, myosin heads cannot detach from actin after the power stroke', 'muscle relaxes', 'the filaments got shorter, not that they moved'],
                  hint: 'If stuck, review c9_bio_ch2_7 (Muscular Tissue) for striated muscle ultrastructure and.',
                  misconception: 'Students believe that during muscle contraction, the thick (myosin) and thin (actin) filaments themselves shorten or compress like springs.' }
          ],
            remediations: { 'during-muscle-contraction': { steps: ['Show a live video or animation of sliding filaments (e.g., from NCERT e-content) where filament lengths are marked and.', 'Have the student measure A-band length in diagrams of relaxed vs. contracted sarcomeres — it is identical.', 'Use a physical model: two interlocking combs (actin) sliding into a fixed comb (myosin) — the teeth don\'t shorten, they.', 'Ask the student to explain rigor mortis: if filaments shortened, why would locked cross-bridges prevent stretching?'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_004', difficulty: 'standard',
          question: 'Excitation-contraction coupling is the physiological process by which.',
          hint: 'If stuck, immediately revisit **Node c11_bio_cbse_17_003 (Structure of Skeletal Muscle.',
          misconception: '**Misconception:** "Calcium binds directly to actin to expose myosin-binding sites." **Exact Wrong Reasoning:**.',
          parts: [
                { id: 'a', prompt: 'Name the specific protein complex on the thin filament that binds calcium ions during excitation-contraction coupling, and state the immediate conformational.', answer: 'The troponin complex (specifically the troponin-C subunit) binds Ca²⁺',
                  options: ['The troponin complex (specifically the troponin-C subunit) binds Ca²⁺', 'tropomyosin binds calcium', 'myosin binds calcium', 'Calcium binds directly to actin to expose myosin-binding sites'],
                  hint: 'If stuck, immediately revisit **Node c11_bio_cbse_17_003 (Structure of Skeletal Muscle: Sliding.',
                  misconception: '**Misconception:** "Calcium binds directly to actin to expose myosin-binding sites." **Exact Wrong Reasoning:** Students memorize "calcium.' },
                { id: 'b', prompt: 'Explain why the A-band length remains constant while the I-band and H-zone shorten during skeletal muscle contraction, according to the sliding filament theory.', answer: 'The A-band corresponds to the length of the thick (myosin) filaments',
                  options: ['The A-band corresponds to the length of the thick (myosin) filaments', 'filaments shorten', 'contracting filament', 'Calcium binds directly to actin to expose myosin-binding sites'],
                  hint: 'If stuck, immediately revisit **Node c11_bio_cbse_17_003 (Structure of Skeletal Muscle: Sliding.',
                  misconception: '**Misconception:** "Calcium binds directly to actin to expose myosin-binding sites." **Exact Wrong Reasoning:** Students memorize "calcium.' }
          ],
            remediations: { 'misconception-calcium-binds-directly-to': { steps: ['** Have the student build a physical model (pipe cleaners for actin, beads for troponin/tropomyosin, clay for myosin.', '** Explicitly trace the "Calcium Path": SR → Cytosol → **Troponin-C** → Conformational change → Tropomyosin shift →.', '** Contrast with smooth muscle: "In your gut muscles (smooth), there is NO troponin.', '** Practice a past board question: "Explain the role of troponin and tropomyosin in muscle contraction." (NCERT.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_005', difficulty: 'standard',
          question: 'The human skeletal system is a framework of 206 bones and associated cartilages.',
          hint: 'Revisit Class 9 node c9_bio_ch2_11 (Human Skeleton: Axial and Appendicular) and.',
          misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Why are the 8th, 9th, and 10th rib pairs called vertebrochondral (false) ribs, while the 11th and 12th are floating ribs?', answer: 'Vertebrochondral ribs (8th–10th) do not attach directly to the sternum',
                  options: ['Vertebrochondral ribs (8th–10th) do not attach directly to the sternum', 'false ribs attach to sternum directly', 'indirect attachment', 'no attachment'],
                  hint: 'Revisit Class 9 node c9_bio_ch2_11 (Human Skeleton: Axial and Appendicular) and c9_bio_ch2_9.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' },
                { id: 'b', prompt: 'Compare the pectoral and pelvic girdles in terms of (a) bone composition, (b) socket depth and mobility, (c) weight-bearing adaptation, and (d) sexual.', answer: 'bone composition, (',
                  options: ['bone composition, (', 'both have deep sockets', 'sternum is a single long bone'],
                  hint: 'Revisit Class 9 node c9_bio_ch2_11 (Human Skeleton: Axial and Appendicular) and c9_bio_ch2_9.',
                  misconception: 'Students often believe the "sternum is a single long bone" and that "all ribs attach directly to it." In reality, the sternum has three.' }
          ],
            remediations: { 'the-sternum-is-a-single': { steps: ['Hold a physical or 3D model of the sternum — feel the manubrial angle (sternal angle/angle of Louis) where manubrium.', 'Take a rib cage model; detach ribs one by one. Observe the direct costal cartilage of ribs 1–7 inserting into sternal.', 'Draw a labelled diagram of the sternum in three parts and the rib attachment pattern.', 'Explain aloud: "True ribs = direct; False ribs = indirect; Floating ribs = none." This kinesthetic + visual + verbal.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_006', difficulty: 'standard',
          question: 'A joint (articulation) is a point of contact between two or more bones,.',
          hint: 'If stuck on bone names or locations, revisit c11_bio_cbse_17_005 (Skeletal System) and.',
          misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like.',
          parts: [
                { id: 'a', prompt: 'Name the three structural classes of joints and state the type of connecting tissue that defines each class.', answer: 'The three structural classes are: (1) Fibrous joints',
                  options: ['The three structural classes are: (1) Fibrous joints', 'hinge, ball-and-socket', 'hinge joint', 'pivot joint'],
                  hint: 'If stuck on bone names or locations, revisit c11_bio_cbse_17_005 (Skeletal System) and.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' },
                { id: 'b', prompt: 'Why are sutures between cranial bones classified as fibrous joints even though they permit no movement in adults?', answer: 'Sutures are fibrous joints',
                  options: ['Sutures are fibrous joints', 'because they are immovable they are fibrous', 'hinge joint', 'pivot joint'],
                  hint: 'If stuck on bone names or locations, revisit c11_bio_cbse_17_005 (Skeletal System) and.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' },
                { id: 'c', prompt: 'A patient cannot rotate their forearm to turn a doorknob (supination/pronation) but can flex and extend the elbow normally.', answer: 'The proximal radioulnar joint (a pivot joint) is impaired',
                  options: ['The proximal radioulnar joint (a pivot joint) is impaired', 'ball-and-socket joint of elbow', 'hinge joint', 'pivot joint'],
                  hint: 'If stuck on bone names or locations, revisit c11_bio_cbse_17_005 (Skeletal System) and.',
                  misconception: 'Students often believe "hinge joint" and "pivot joint" are separate structural classes like fibrous/cartilaginous/synovial, rather than.' }
          ],
            remediations: { 'hinge-joint-and-pivot-joint': { steps: ['Draw a three-column table with headers "Fibrous", "Cartilaginous", "Synovial".', 'In each column, list the connecting tissue, presence/absence of cavity, and movement capacity.', 'Under Synovial, create six sub-rows for the subtypes; for each, write the bony elements (ball/socket, cylinder/ring.', 'Cover the examples and quiz yourself: "Which joint uses a fibrocartilage pad?" → Pubic symphysis (cartilaginous).'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
