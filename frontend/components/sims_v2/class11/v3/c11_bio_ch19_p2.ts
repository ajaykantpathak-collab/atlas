import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch19_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch19_p2: SimDef = {
    id: 'v3_c11_bio_ch19_p2',
    title: 'Chemical Coordination and Integration · Part 2/2',
    subtitle: 'Trace the two roads — one vascular, one neural — by which the brain runs the endocrine system.',
    classLevel: 11, subject: 'biology', topic: 'Chemical Coordination and Integration · Part 2/2',
    chapters: ['c11_bio_ch19'],
    nodeIds: ['c11_bio_cbse_19_007', 'c11_bio_cbse_19_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an endocrinologist localising a patient\'s hormone defect', intro: 'A patient is drowning in thirst and dilute urine. Is the fault in the hypothalamus, the posterior lobe, or the kidney? The hormone\'s birthplace decides.', goal: 'Distinguish hypothalamic releasing/inhibiting hormones from pituitary tropic and direct hormones, and the portal versus neural delivery routes.' },
    discovery: {
        question: 'The anterior pituitary is called the \'master gland\' — yet it takes orders from the hypothalamus through a private capillary network. What travels through that portal blood that lets a brain region remote-control six hormones?',
        options: ['Releasing and inhibiting hormones that switch each anterior pituitary hormone\'s secretion up or down', 'Antibodies that tag which pituitary cells may fire', 'Nerve impulses — the portal vessels are actually neurons', 'Finished thyroid and adrenal hormones being recycled'],
        answer: 'Releasing and inhibiting hormones that switch each anterior pituitary hormone\'s secretion up or down',
        hook: 'The \'master gland\' is really middle management — the hypothalamus writes the orders, the portal vein delivers them, and the pituitary just issues commands downstream.',
    },
    teaching: [
        { title: 'Mechanism of Hormone Action: Peptide and Steroid', text: 'The mechanism of hormone action refers to the specific sequence of molecular events by which a hormone binds to its cognate receptor on or in a target cell, initiating a signal transduction cascade.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_19_007', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Sort the hypothalamus–pituitary partnership: which hormones are born in hypothalamic neurons and merely stored in the posterior lobe, which the anterior lobe truly makes, and why a diabetes insipidus patient\'s flood of dilute urine points to the neural side.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_008', title: 'Disorders of Endocrine System',
          caseStudy: { intro: 'Imagine a 35-year-old woman from Punjab visiting a clinic with unexplained weight gain, moon face, purple stretch marks on her abdomen, and high blood pressure.',
            decisions: [{ prompt: 'A patient presents with polyuria (excessive urine output), polydipsia (excessive thirst), and dehydration despite normal blood glucose.', options: [
                { text: 'Correct answer: ADH (vasopressin) deficiency from posterior pituitary (neurohypophysis)', outcome: 'Correct answer: ADH (vasopressin) deficiency from posterior pituitary (neurohypophysis).' },
                { text: 'diabetes', outcome: 'Not quite — Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low.', reveals: 'goitre-always-means-hypothyroidism-they' },
                { text: 'goitre always means hypothyroidism', outcome: 'Not quite — Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low.', reveals: 'goitre-always-means-hypothyroidism-they' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_19_008', title: 'Identify each idea',
          dissect: { specimen: 'Chemical Coordination and Integration · Part 2/2', spots: [
            { id: 's1', label: 'Mechanism of Hormone Action Peptide and Steroid', prompt: 'Which idea is this? — The mechanism of hormone action refers to the specific sequence of molecular events.', answer: 'Mechanism of Hormone Action Peptide and Steroid', options: ['Mechanism of Hormone Action Peptide and Steroid', 'Disorders of Endocrine System'] },
            { id: 's2', label: 'Disorders of Endocrine System', prompt: 'Which idea is this? — Endocrine disorders are pathological conditions arising from abnormal hormone synthesis.', answer: 'Disorders of Endocrine System', options: ['Disorders of Endocrine System', 'Mechanism of Hormone Action Peptide and Steroid'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a hospital\'s endocrine clinic you hear a doctor explain a patient\'s diabetes insipidus: \'His posterior pituitary isn\'t making enough ADH.\' A medical intern corrects her notes, saying the posterior pituitary manufactures oxytocin and ADH just as the anterior lobe makes growth hormone.',
            decisions: [{ prompt: 'Is the intern\'s correction accurate?', options: [
                { text: 'No — ADH and oxytocin are synthesised in hypothalamic neuron cell bodies (supraoptic and paraventricular nuclei), travel down axons in the stalk, and are merely stored and released by the posterior pituitary. The anterior pituitary, in contrast, truly manufactures its tropic hormones under hypothalamic releasing/inhibiting hormone control via the portal blood.', outcome: 'Posterior pituitary = neural depot (stores hypothalamic hormones); anterior pituitary = true gland (makes its own under portal-vessel control).' },
                { text: 'Yes — whatever a gland releases, it must have synthesised; storage without synthesis isn\'t a gland\'s job.', outcome: 'The posterior pituitary is neural tissue, not glandular epithelium — a storage-and-release terminal for hypothalamic neurons.', reveals: 'posterior-pituitary-makes-adh' },
                { text: 'Partly — the posterior pituitary makes ADH but the hypothalamus makes only the releasing hormones for the anterior lobe.', outcome: 'Hypothalamic neurons make BOTH the releasing/inhibiting factors for the anterior lobe and the finished ADH/oxytocin stored behind; splitting it that way misplaces the synthesis site.', reveals: 'adh-made-in-pituitary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_008', title: 'You made it',
          caseStudy: { intro: 'You cracked the hierarchy — hypothalamus to anterior pituitary by blood, to posterior pituitary by nerve — and \'master gland\' now means output, not autonomy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_007', difficulty: 'standard',
          question: 'The mechanism of hormone action refers to the specific sequence of molecular.',
          hint: 'Revisit Class 9 Cell Membrane (c9_bio_ch1_3) for membrane permeability and Class 9.',
          misconception: 'Students often believe that "steroid hormones act only by changing gene expression and therefore always take hours.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mechanism of hormone action refers to the specific sequence of molecular events by',
                  options: ['The mechanism of hormone action refers to the specific sequence of molecular events by', 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes', 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea that', 'The pancreas is a composite gland functioning as both an exocrine and endocrine organ'],
                  hint: 'Revisit Class 9 Cell Membrane (c9_bio_ch1_3) for membrane permeability and Class 9 Nucleus.',
                  misconception: 'Students often believe that "steroid hormones act only by changing gene expression and therefore always take hours to show effects." They.' }
          ],
            remediations: { 'steroid-hormones-act-only-by': { steps: ['If the student holds this binary misconception, have them: (1) List the classical steps for adrenaline (peptide) and.', '(2) Research "non-genomic steroid action" and "peptide hormone genomic effects" using NCERT exemplar or trusted sources.', '(3) Create a Venn diagram showing overlapping features (both can ultimately affect transcription, both use.', '(4) Re-attempt Diagnostic Question 5, now considering that a Gs mutation might indirectly affect steroid hormone.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_008', difficulty: 'standard',
          question: 'Endocrine disorders are pathological conditions arising from abnormal hormone.',
          hint: 'If stuck, revisit c11_bio_cbse_19_001 (hypothalamus-pituitary) and c11_bio_cbse_19_007.',
          misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.',
          parts: [
                { id: 'a', prompt: 'Why does iodine deficiency cause goitre (thyroid enlargement) despite LOW thyroid hormone levels? Explain the feedback mechanism involved.', answer: 'Correct answer: Low iodine → low T3/T4 synthesis → reduced negative feedback on',
                  options: ['Correct answer: Low iodine → low T3/T4 synthesis → reduced negative feedback on', 'TSH decreases', 'thyroid atrophies', 'goitre always means hypothyroidism'],
                  hint: 'If stuck, revisit c11_bio_cbse_19_001 (hypothalamus-pituitary) and c11_bio_cbse_19_007 (mechanism.',
                  misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.' },
                { id: 'b', prompt: 'A 12-year-old boy shows accelerated growth, coarse facial features, and enlarged hands/feet. His GH levels are high, but IGF-1 (somatomedin) is normal.', answer: 'Correct answer: Liver (post-receptor defect / GH resistance / Laron syndrome)',
                  options: ['Correct answer: Liver (post-receptor defect / GH resistance / Laron syndrome)', 'pituitary tumor', 'goitre always means hypothyroidism', 'low function'],
                  hint: 'If stuck, revisit c11_bio_cbse_19_001 (hypothalamus-pituitary) and c11_bio_cbse_19_007 (mechanism.',
                  misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.' }
          ],
            remediations: { 'goitre-always-means-hypothyroidism-they': { steps: ['Draw the hypothalamic-pituitary-thyroid axis with arrows showing stimulation (+) and inhibition (−).', 'For each goitre type, trace the signal: Iodine deficiency → low T3/T4 → less (−) feedback → high TSH → thyroid growth.', 'Make a 3-column table: Condition | TSH | T3/T4 | Goitre? | Cause of growth.', 'Practice with 5 case vignettes — identify the goitre mechanism in each.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In Type 2 Diabetes Mellitus, insulin therapy is never required because the problem is insulin resistance, not insulin deficiency.".', answer: 'Correct answer: FALSE',
                  options: ['Correct answer: FALSE', 'goitre always means hypothyroidism', 'low function'],
                  hint: 'If stuck, revisit c11_bio_cbse_19_001 (hypothalamus-pituitary) and c11_bio_cbse_19_007 (mechanism.',
                  misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.' }
          ],
            remediations: { 'goitre-always-means-hypothyroidism-they': { steps: ['Draw the hypothalamic-pituitary-thyroid axis with arrows showing stimulation (+) and inhibition (−).', 'For each goitre type, trace the signal: Iodine deficiency → low T3/T4 → less (−) feedback → high TSH → thyroid growth.', 'Make a 3-column table: Condition | TSH | T3/T4 | Goitre? | Cause of growth.', 'Practice with 5 case vignettes — identify the goitre mechanism in each.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
