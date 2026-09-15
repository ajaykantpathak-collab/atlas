import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch02_p2: SimDef = {
    id: 'v3_c10_bio_ch02_p2',
    title: 'Control and Coordination · Part 2/2',
    subtitle: 'Chase a signal through neurons, hormones and a folding mimosa leaf',
    classLevel: 10, subject: 'biology', topic: 'Control and Coordination · Part 2/2',
    chapters: ['c10_bio_ch02'],
    nodeIds: ['c10_bio_cbse_02_007', 'c10_bio_cbse_02_008', 'c10_bio_cbse_02_009', 'c10_bio_cbse_02_010', 'c10_bio_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emergency-response coordinator inside a living body', intro: 'A finger meets a hot pan; a mimosa leaf snaps shut at a touch. Both are responses to a stimulus — but the machinery underneath could not be more different.', goal: 'Map the full stimulus-to-response pathway and explain how plants coordinate without a nervous system.' },
    discovery: {
        question: 'Touch a hot pan — your hand pulls back before you even feel pain. How is that possible?',
        options: ['The spinal cord fires the response without waiting for the brain', 'Your hand is faster than your nerves', 'Pain signals travel slowly', 'The brain predicted the heat'],
        answer: 'The spinal cord fires the response without waiting for the brain',
        hook: 'Reflexes skip the queue — that shortcut saves your hand before your brain knows why.',
    },
    teaching: [
        { title: 'Plant Hormones: Auxin, Gibberellin, Cytokinin, Abscisic Acid', text: 'Plant hormones (phytohormones) are naturally occurring organic substances synthesized in minute quantities in one part of the plant and translocated to other parts, where they regulate growth.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_02_007', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Speed up the signal — how fast does the reflex fire?',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_008', title: 'Hormones in Animals: Endocrine Glands and Their Secretions',
          caseStudy: { intro: 'Begin with a relatable observation: "When you suddenly see a stray dog barking at you on your way to school, your heart races, palms sweat, and you feel.',
            decisions: [{ prompt: 'Name the endocrine gland located at the base of the brain that is often called the \'master gland\' and state one hormone it secretes that.', options: [
                { text: 'The pituitary gland (hypophysis) located at the base of the brain is the master gland; it', outcome: 'The pituitary gland (hypophysis) located at the base of the brain is the master gland; it secretes.' },
                { text: 'Pituitary controls pancreas and adrenal medulla', outcome: 'Not quite — Students often think that the pituitary gland directly controls *all* hormonal activities in the.', reveals: 'the-pituitary-gland-directly-controls' },
                { text: 'thyroid as master gland or stating growth hormone controls another gland', outcome: 'Not quite — Students often think that the pituitary gland directly controls *all* hormonal activities in the.', reveals: 'the-pituitary-gland-directly-controls' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_009', title: 'Thyroid Gland: Thyroxine and Its Role in Metabolism',
          caseStudy: { intro: 'Start by asking students to observe a person with a visible swelling in the front of the neck (goitre) — a common sight in iodine-deficient regions like the.',
            decisions: [{ prompt: 'Name the hormone secreted by the thyroid gland that regulates basal metabolic rate and state the mineral element essential for its.', options: [
                { text: 'The hormone is thyroxine (T4) or triiodothyronine (T3)', outcome: 'The hormone is thyroxine (T4) or triiodothyronine (T3); the essential mineral is iodine.' },
                { text: 'insulin', outcome: 'Not quite — Students believe that thyroxine *only* increases metabolic rate and therefore think hyperthyroidism.', reveals: 'thyroxine-only-increases-metabolic-rate' },
                { text: 'high energy', outcome: 'Not quite — Students believe that thyroxine *only* increases metabolic rate and therefore think hyperthyroidism.', reveals: 'thyroxine-only-increases-metabolic-rate' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_010', title: 'Adrenal Gland: Adrenaline and the Fight-or-Flight Response',
          caseStudy: { intro: 'Imagine you are crossing a busy Delhi road and suddenly a speeding motorcycle appears inches from you — your heart pounds, breathing quickens, and you jump.',
            decisions: [{ prompt: 'What is the specific part of the adrenal gland that secretes adrenaline, and what type of cells are responsible for this secretion?', options: [
                { text: 'The adrenal medulla (inner region) secretes adrenaline; the responsible cells are', outcome: 'The adrenal medulla (inner region) secretes adrenaline; the responsible cells are chromaffin cells.' },
                { text: 'adrenal cortex', outcome: 'Not quite — Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like.', reveals: 'the-adrenal-medulla-is-stimulated' },
                { text: 'cortical cells', outcome: 'Not quite — Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like.', reveals: 'the-adrenal-medulla-is-stimulated' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_011', title: 'Pancreas: Insulin and Blood Sugar Regulation (Diabetes)',
          caseStudy: { intro: 'Imagine you eat a plate of rice and roti — your blood glucose rises sharply.',
            decisions: [{ prompt: 'What are the two main hormones secreted by the pancreatic islets that regulate blood glucose, and which cell type secretes each?', options: [
                { text: 'Insulin is secreted by beta (β) cells and lowers blood glucose', outcome: 'Insulin is secreted by beta (β) cells and lowers blood glucose; glucagon is secreted by alpha (α).' },
                { text: 'destroys', outcome: 'Not quite — Students often think insulin "destroys" glucose or "converts glucose into energy" directly.', reveals: 'insulin-destroys-glucose-or-converts' },
                { text: 'converts glucose into energy', outcome: 'Not quite — Students often think insulin "destroys" glucose or "converts glucose into energy" directly.', reveals: 'insulin-destroys-glucose-or-converts' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Control and Coordination · Part 2/2', spots: [
            { id: 's1', label: 'Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', prompt: 'Which idea is this? — Plant hormones (phytohormones) are naturally occurring organic substances synthesized.', answer: 'Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', options: ['Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', 'Hormones in Animals Endocrine Glands and Their Secretions', 'Thyroid Gland Thyroxine and Its Role in Metabolism', 'Adrenal Gland Adrenaline and the Fight-or-Flight Response'] },
            { id: 's2', label: 'Hormones in Animals Endocrine Glands and Their Secretions', prompt: 'Which idea is this? — Endocrine glands are ductless glands that secrete chemical messengers called hormones.', answer: 'Hormones in Animals Endocrine Glands and Their Secretions', options: ['Hormones in Animals Endocrine Glands and Their Secretions', 'Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', 'Thyroid Gland Thyroxine and Its Role in Metabolism', 'Adrenal Gland Adrenaline and the Fight-or-Flight Response'] },
            { id: 's3', label: 'Thyroid Gland Thyroxine and Its Role in Metabolism', prompt: 'Which idea is this? — The thyroid gland is a bilobed endocrine gland located in the neck that secretes.', answer: 'Thyroid Gland Thyroxine and Its Role in Metabolism', options: ['Thyroid Gland Thyroxine and Its Role in Metabolism', 'Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', 'Hormones in Animals Endocrine Glands and Their Secretions', 'Adrenal Gland Adrenaline and the Fight-or-Flight Response'] },
            { id: 's4', label: 'Adrenal Gland Adrenaline and the Fight-or-Flight Response', prompt: 'Which idea is this? — The adrenal glands are a pair of endocrine glands located on top of each kidney.', answer: 'Adrenal Gland Adrenaline and the Fight-or-Flight Response', options: ['Adrenal Gland Adrenaline and the Fight-or-Flight Response', 'Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', 'Hormones in Animals Endocrine Glands and Their Secretions', 'Thyroid Gland Thyroxine and Its Role in Metabolism'] },
            { id: 's5', label: 'Pancreas Insulin and Blood Sugar Regulation Diabetes', prompt: 'Which idea is this? — The pancreas is a mixed gland that acts as an endocrine organ through its Islets.', answer: 'Pancreas Insulin and Blood Sugar Regulation Diabetes', options: ['Pancreas Insulin and Blood Sugar Regulation Diabetes', 'Plant Hormones Auxin Gibberellin Cytokinin Abscisic Acid', 'Hormones in Animals Endocrine Glands and Their Secretions', 'Thyroid Gland Thyroxine and Its Role in Metabolism'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_007', title: 'A real-world call',
          caseStudy: { intro: 'Understanding the nervous system lets us build better prosthetics and brain-computer interfaces — and raises the question of who owns the neural data a device records.',
            decisions: [{ prompt: 'Should your brain\'s data have special protection?', options: [
                { text: 'Yes — neural data is the last private frontier', outcome: 'The privacy-maximalist answer; the risk is regulation that slows devices that could restore movement to the paralyzed.' },
                { text: 'No — data is data, protect it like everything else', outcome: 'The uniform-privacy answer; it underestimates that neural data reveals intent, not just behaviour.' },
                { text: 'Yes — but only for data that reveals thought, not function', outcome: 'The surgical answer — protect what the device infers, not what it measures; the hard part is telling them apart.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Meera snatches her hand back from a hot iron before she even feels the burn. A week later she notices her windowsill money plant has leaned sideways toward the light. She wonders how both \'knew\' what to do.',
            decisions: [{ prompt: 'How are these two responses coordinated differently?', options: [
                { text: 'Her hand used a nervous reflex arc — receptors in the skin fired a sensory neuron to the spinal cord, which fired a motor neuron to the muscle, all in a split second. The plant has no nerves; auxin hormone redistributed to the shaded side, making those cells elongate and slowly bend the stem toward light.', outcome: 'Both are real coordination: animals use fast electrochemical nerve impulses with receptor and effector, plants use slower chemical signals (hormones) that redirect growth.' },
                { text: 'The plant bent because sunlight physically pushed the stem over, the same way the heat pushed her hand away.', outcome: 'Nothing pushed either one — both are living responses to a stimulus, one through nerves and one through differential growth driven by a hormone.', reveals: 'tropism-is-physical-push' },
                { text: 'Plants must have tiny nerves like ours, just slower ones, since both responses move a body part.', outcome: 'Plants coordinate without a nervous system — through hormones such as auxin and through electrical-chemical waves in cells, not neurons.', reveals: 'plants-have-nerves' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'Stimulus to response in milliseconds — you traced the fastest circuit your body owns.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_007', difficulty: 'standard',
          question: 'Plant hormones (phytohormones) are naturally occurring organic substances.',
          hint: 'If stuck, revisit the mechanism of phototropism in c10_bio_cbse_02_005 (unequal auxin.',
          misconception: 'Students often think that abscisic acid (ABA) is named because it causes abscission (leaf fall) and therefore it is the.',
          parts: [
                { id: 'a', prompt: 'Explain why a seed fails to germinate even when water, oxygen, and suitable temperature are provided, and name the hormone whose application can break this.', answer: 'The seed may be dormant due to high levels of abscisic acid (ABA)',
                  options: ['The seed may be dormant due to high levels of abscisic acid (ABA)', 'auxin breaks dormancy'],
                  hint: 'If stuck, revisit the mechanism of phototropism in c10_bio_cbse_02_005 (unequal auxin distribution).',
                  misconception: 'Students often think that abscisic acid (ABA) is named because it causes abscission (leaf fall) and therefore it is the primary hormone for.' }
          ],
            remediations: { 'abscisic-acid-aba-is-named': { steps: ['To correct this, first show a time-lapse video of a plant under drought: stomata close rapidly (ABA response) before.', 'Then, compare with ethylene-induced abscission in a separate experiment (e.g., placing a ripe banana near a plant).', 'Have the student write a two-column table: "ABA functions" vs "Ethylene functions" with examples.', 'Finally, practice a board-style question: "Which hormone is primarily responsible for stomatal closure during water.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_008', difficulty: 'standard',
          question: 'Endocrine glands are ductless glands that secrete chemical messengers called.',
          hint: 'If stuck, revisit c6_biology_ch06_006 (hormones behind adolescent changes) and.',
          misconception: 'Students often think that the pituitary gland directly controls *all* hormonal activities in the body, including.',
          parts: [
                { id: 'a', prompt: 'Explain why insulin is not secreted by the pituitary gland even though the pituitary is called the \'master gland\'.', answer: 'The pituitary is called \'master\'',
                  options: ['The pituitary is called \'master\'', 'pituitary controls everything so it must secrete insulin', 'Pituitary controls pancreas and adrenal medulla'],
                  hint: 'If stuck, revisit c6_biology_ch06_006 (hormones behind adolescent changes) and c7_bio_ch01_011.',
                  misconception: 'Students often think that the pituitary gland directly controls *all* hormonal activities in the body, including insulin secretion and.' }
          ],
            remediations: { 'the-pituitary-gland-directly-controls': { steps: ['Revisit the definition of \'tropic hormone\' using the mnemonic "Tropic = Targets other glands" (TSH→Thyroid.', 'Create a two-column table: Column A "Gland controlled by pituitary tropic hormone" (Thyroid, Adrenal cortex, Gonads).', 'For each gland in Column B, write the primary stimulus (blood glucose for pancreas, sympathetic nerve for adrenal.', 'Practice drawing the negative feedback loop for thyroxine until you can label every arrow correctly without notes.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the pituitary gland directly controls *all* hormonal activities in the body, including.',
          parts: [
                { id: 'a', prompt: 'A classmate claims: "If the pituitary gland is removed, all other endocrine glands will stop working immediately." Evaluate this statement and justify your.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'Pituitary controls pancreas and adrenal medulla'],
                  hint: 'If stuck, revisit c6_biology_ch06_006 (hormones behind adolescent changes) and c7_bio_ch01_011.',
                  misconception: 'Students often think that the pituitary gland directly controls *all* hormonal activities in the body, including insulin secretion and.' }
          ],
            remediations: { 'the-pituitary-gland-directly-controls': { steps: ['Revisit the definition of \'tropic hormone\' using the mnemonic "Tropic = Targets other glands" (TSH→Thyroid.', 'Create a two-column table: Column A "Gland controlled by pituitary tropic hormone" (Thyroid, Adrenal cortex, Gonads).', 'For each gland in Column B, write the primary stimulus (blood glucose for pancreas, sympathetic nerve for adrenal.', 'Practice drawing the negative feedback loop for thyroxine until you can label every arrow correctly without notes.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_009', difficulty: 'standard',
          question: 'The thyroid gland is a bilobed endocrine gland located in the neck that.',
          hint: 'If stuck on feedback loop, revisit c10_bio_cbse_02_008 "Hormones in Animals: Endocrine.',
          misconception: 'Students believe that thyroxine *only* increases metabolic rate and therefore think hyperthyroidism always causes "high.',
          parts: [
                { id: 'a', prompt: 'Name the hormone secreted by the thyroid gland that regulates basal metabolic rate and state the mineral element essential for its synthesis.', answer: 'The hormone is thyroxine (T4) or triiodothyronine (T3)',
                  options: ['The hormone is thyroxine (T4) or triiodothyronine (T3)', 'insulin', 'high energy', 'laziness'],
                  hint: 'If stuck on feedback loop, revisit c10_bio_cbse_02_008 "Hormones in Animals: Endocrine Glands and.',
                  misconception: 'Students believe that thyroxine *only* increases metabolic rate and therefore think hyperthyroidism always causes "high energy" and.' },
                { id: 'b', prompt: 'A 10-year-old child shows stunted growth, mental retardation, and a puffy face. The doctor suspects a thyroid disorder.', answer: 'Hypothyroidism; condition is cretinism',
                  options: ['Hypothyroidism; condition is cretinism', 'hyperthyroidism', 'goitre', 'Physical Changes in Adolescence: Height, Weight, Body Shape'],
                  hint: 'If stuck on feedback loop, revisit c10_bio_cbse_02_008 "Hormones in Animals: Endocrine Glands and.',
                  misconception: 'Students believe that thyroxine *only* increases metabolic rate and therefore think hyperthyroidism always causes "high energy" and.' }
          ],
            remediations: { 'thyroxine-only-increases-metabolic-rate': { steps: ['Revisit the definition of BMR — it is the energy spent at rest for vital functions, not "energy level".', 'Use a car analogy: thyroxine sets the *idling speed* of the engine.', 'Complete a comparison table: Parameter | Hyperthyroidism | Hypothyroidism — fill BMR, Weight, Heart Rate, Heat.', 'Practice 2 case-based questions from CBSE sample papers where symptoms seem contradictory (e.g., hyperthyroid patient.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_010', difficulty: 'standard',
          question: 'The adrenal glands are a pair of endocrine glands located on top of each.',
          hint: 'If stuck, review c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex.',
          misconception: 'Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like ACTH stimulates the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The adrenal glands are a pair of endocrine glands located on top of each kidney,',
                  options: ['The adrenal glands are a pair of endocrine glands located on top of each kidney,', 'Control and coordination is the biological process by', 'A neuron is the structural and functional unit of the nervous system, specialized for', 'A reflex action is an involuntary, rapid, and stereotyped response to a specific stimulus'],
                  hint: 'If stuck, review c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex arc).',
                  misconception: 'Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like ACTH stimulates the cortex) and.' }
          ],
            remediations: { 'the-adrenal-medulla-is-stimulated': { steps: ['Revisit c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex arc) to recall that sympathetic.', 'Draw a simple diagram: Spinal cord → sympathetic preganglionic fiber → adrenal medulla chromaffin cell (label.', 'Compare with pituitary-adrenal cortex axis: Hypothalamus → CRH → Pituitary → ACTH → Adrenal cortex (cortisol).', 'Time the two pathways: neural = milliseconds to seconds; hormonal cascade = minutes.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_011', difficulty: 'standard',
          question: 'The pancreas is a mixed gland that acts as an endocrine organ through its.',
          hint: 'Review "Hormones in Animals: Endocrine Glands and Their Secretion" (c10_bio_cbse_02_008).',
          misconception: 'Students often think insulin "destroys" glucose or "converts glucose into energy" directly.',
          parts: [
                { id: 'a', prompt: 'What are the two main hormones secreted by the pancreatic islets that regulate blood glucose, and which cell type secretes each?', answer: 'Insulin is secreted by beta (β) cells and lowers blood glucose',
                  options: ['Insulin is secreted by beta (β) cells and lowers blood glucose', 'destroys', 'converts glucose into energy', 'insulin "destroys" glucose or "converts glucose into energy" directly'],
                  hint: 'Review "Hormones in Animals: Endocrine Glands and Their Secretion" (c10_bio_cbse_02_008) focusing.',
                  misconception: 'Students often think insulin "destroys" glucose or "converts glucose into energy" directly.' },
                { id: 'b', prompt: 'A student eats a carbohydrate-rich meal. Trace the sequence of events from glucose absorption to insulin secretion and its effect on a muscle cell, naming the.', answer: 'Glucose absorbed in small intestine → enters bloodstream → blood glucose rises →',
                  options: ['Glucose absorbed in small intestine → enters bloodstream → blood glucose rises →', 'destroys', 'converts glucose into energy', 'insulin "destroys" glucose or "converts glucose into energy" directly'],
                  hint: 'Review "Hormones in Animals: Endocrine Glands and Their Secretion" (c10_bio_cbse_02_008) focusing.',
                  misconception: 'Students often think insulin "destroys" glucose or "converts glucose into energy" directly.' }
          ],
            remediations: { 'insulin-destroys-glucose-or-converts': { steps: ['Revisit the lock-and-key model of hormone-receptor binding (from c10_bio_cbse_02_008).', 'Watch a 2-minute animation of GLUT4 translocation (search "GLUT4 insulin animation").', 'Write the sequence: "Insulin binds receptor → signal cascade → GLUT4 vesicles fuse → glucose enters → glycolysis.', 'Explain aloud why insulin injection works but eating insulin would not, linking to protein digestion.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
