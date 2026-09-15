import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch17_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch17_p2: SimDef = {
    id: 'v3_c11_bio_ch17_p2',
    title: 'Locomotion and Movement · Part 2/2',
    subtitle: 'Match three engines of cellular movement to the jobs only each can do.',
    classLevel: 11, subject: 'biology', topic: 'Locomotion and Movement · Part 2/2',
    chapters: ['c11_bio_ch17'],
    nodeIds: ['c11_bio_cbse_17_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cell biologist diagnosing a motility disorder from symptoms', intro: 'The patient\'s mucus isn\'t clearing and the doctors are guessing. The defect is in one motor protein — figure out which systems that protein runs.', goal: 'Distinguish amoeboid, ciliary, and muscular movement by mechanism, location, and cytoskeletal basis.' },
    discovery: {
        question: 'A patient is born with cilia whose dynein arms don\'t work. Which two of these will fail: macrophage migration to a wound, mucus clearance from the trachea, ovum transport in the fallopian tube, biceps contraction, intestinal peristalsis?',
        options: ['Tracheal mucus clearance and ovum transport — both ride on beating cilia, while the others use entirely different machinery', 'Macrophage migration and peristalsis — dynein powers all cell crawling', 'Biceps contraction and ovum transport — both are forms of propulsion', 'All five — dynein is the universal motor of the body'],
        answer: 'Tracheal mucus clearance and ovum transport — both ride on beating cilia, while the others use entirely different machinery',
        hook: 'Three different engines move your cells — microfilament crawling, ciliary sweeping, actin-myosin sliding — and swapping one for another is the classic mix-up.',
    },
    teaching: [
        { title: 'Disorders: Myasthenia Gravis, Arthritis, Osteoporosis', text: 'Myasthenia gravis is an autoimmune disorder where antibodies block acetylcholine receptors at the neuromuscular junction, impairing signal transmission and causing progressive skeletal muscle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_17_007', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Assign the right movement type — amoeboid, ciliary, or muscular — to a sneeze\'s cleanup crew, a white blood cell chasing bacteria, and an arm catching a ball, naming the cytoskeletal machinery behind each.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_007', title: 'Disorders: Myasthenia Gravis, Arthritis, Osteoporosis',
          caseStudy: { intro: 'Imagine your grandmother complaining of knee pain that worsens after climbing stairs, your neighbor experiencing drooping eyelids and difficulty chewing.',
            decisions: [{ prompt: 'A patient presents with muscle weakness that worsens with repeated activity and improves after rest.', options: [
                { text: 'The autoantibodies target nicotinic acetylcholine receptors (nAChRs) on the motor end', outcome: 'The autoantibodies target nicotinic acetylcholine receptors (nAChRs) on the motor end plate.' },
                { text: 'antibodies block acetylcholine release from presynaptic terminal', outcome: 'Not quite — Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements.', reveals: 'osteoporosis-is-simply-calcium-deficiency' },
                { text: 'antibodies destroy voltage-gated calcium channels', outcome: 'Not quite — Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements.', reveals: 'osteoporosis-is-simply-calcium-deficiency' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a physiology demo your teacher adds two drugs to separate cultures: cytochalasin D (blocks actin filaments) and colchicine (blocks microtubules). Your task: predict which stops (a) macrophages crawling to engulf debris, (b) tracheal cilia sweeping mucus, (c) a muscle fibre contracting. A classmate says all three involve \'beating or squeezing\', so both drugs should stop everything.',
            decisions: [{ prompt: 'Map drug to movement correctly.', options: [
                { text: 'Cytochalasin stops amoeboid crawling and muscle contraction (both actin/microfilament-based) but not cilia. Colchicine stops ciliary beating (9+2 microtubule axoneme powered by dynein) but not the actin systems. \'Beating\' cilia and \'contracting\' muscle run on entirely different molecular motors.', outcome: 'Matching movement to cytoskeleton — microfilaments for amoeboid/muscular, microtubules for ciliary — predicts the inhibitor correctly.' },
                { text: 'Both drugs stop all three — beating cilia are tiny muscles working by sliding filaments.', outcome: 'Cilia are microtubule-based with dynein motors, not actin-myosin; treating them as mini-muscles wrongly predicts they\'ll respond to actin blockers.', reveals: 'cilia-are-tiny-muscles' },
                { text: 'Colchicine stops everything because all movement needs ATP and microtubules.', outcome: 'All three use ATP, but macrophage pseudopodia and sarcomeres are actin-based; only cilia depend on microtubules.', reveals: 'all-movement-needs-microtubules' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_17_007', title: 'You made it',
          caseStudy: { intro: 'You now read any movement by its mechanism: pseudopodia mean actin, fluid currents mean cilia, force and posture mean the sliding filament.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_007', difficulty: 'standard',
          question: 'Myasthenia gravis is an autoimmune disorder where antibodies block.',
          hint: 'If unable to sequence neuromuscular junction events, revisit c11_bio_cbse_17_004.',
          misconception: 'Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements alone can reverse it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Myasthenia gravis is an autoimmune disorder where antibodies block acetylcholine',
                  options: ['Myasthenia gravis is an autoimmune disorder where antibodies block acetylcholine', 'Amoeboid, ciliary, and muscular movements are the three fundamental types of cellular', 'Muscles are specialised mesodermal tissues constituting 40–50% of adult human body mass,', 'The sliding filament theory explains skeletal muscle contraction as the process where'],
                  hint: 'If unable to sequence neuromuscular junction events, revisit c11_bio_cbse_17_004.',
                  misconception: 'Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements alone can reverse it.' }
          ],
            remediations: { 'osteoporosis-is-simply-calcium-deficiency': { steps: ['Revisit bone remodeling cycle (c11_bio_cbse_17_005) - identify the four phases (activation, resorption, reversal.', 'Trace estrogen\'s molecular action: estrogen binds ERα on osteoblasts → increases OPG, decreases RANKL → inhibits.', 'Contrast with vitamin D/calcium deficiency: low Ca²⁺ → high PTH → high 1,25-(OH)₂D → increased intestinal absorption.', 'Create a comparison table: Osteoporosis vs Osteomalacia - serum Ca²⁺, PO₄³⁻, ALP, PTH, bone histology, treatment.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_17_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements alone can reverse it.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Myasthenia gravis and tetany both cause muscle weakness, so they can be distinguished only by electromyography (EMG)." Provide.', answer: 'The statement is false',
                  options: ['The statement is false', 'calcium deficiency'],
                  hint: 'If unable to sequence neuromuscular junction events, revisit c11_bio_cbse_17_004.',
                  misconception: 'Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements alone can reverse it.' },
                { id: 'b', prompt: 'Design a simple bedside clinical test protocol to differentiate between osteoarthritis and rheumatoid arthritis of the knee in a 55-year-old patient, using.', answer: 'Step 1: History - morning stiffness duration: >1 hour suggests RA (inflammatory',
                  options: ['Step 1: History - morning stiffness duration: >1 hour suggests RA (inflammatory', 'calcium deficiency'],
                  hint: 'If unable to sequence neuromuscular junction events, revisit c11_bio_cbse_17_004.',
                  misconception: 'Students often believe osteoporosis is simply "calcium deficiency" and that calcium supplements alone can reverse it.' }
          ],
            remediations: { 'osteoporosis-is-simply-calcium-deficiency': { steps: ['Revisit bone remodeling cycle (c11_bio_cbse_17_005) - identify the four phases (activation, resorption, reversal.', 'Trace estrogen\'s molecular action: estrogen binds ERα on osteoblasts → increases OPG, decreases RANKL → inhibits.', 'Contrast with vitamin D/calcium deficiency: low Ca²⁺ → high PTH → high 1,25-(OH)₂D → increased intestinal absorption.', 'Create a comparison table: Osteoporosis vs Osteomalacia - serum Ca²⁺, PO₄³⁻, ALP, PTH, bone histology, treatment.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
