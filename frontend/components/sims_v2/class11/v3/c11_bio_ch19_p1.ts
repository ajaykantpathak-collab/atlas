import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch19_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch19_p1: SimDef = {
    id: 'v3_c11_bio_ch19_p1',
    title: 'Chemical Coordination and Integration · Part 1/2',
    subtitle: 'Trace the two roads — one vascular, one neural — by which the brain runs the endocrine system.',
    classLevel: 11, subject: 'biology', topic: 'Chemical Coordination and Integration · Part 1/2',
    chapters: ['c11_bio_ch19'],
    nodeIds: ['c11_bio_cbse_19_001', 'c11_bio_cbse_19_002', 'c11_bio_cbse_19_003', 'c11_bio_cbse_19_004', 'c11_bio_cbse_19_005', 'c11_bio_cbse_19_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an endocrinologist localising a patient\'s hormone defect', intro: 'A patient is drowning in thirst and dilute urine. Is the fault in the hypothalamus, the posterior lobe, or the kidney? The hormone\'s birthplace decides.', goal: 'Distinguish hypothalamic releasing/inhibiting hormones from pituitary tropic and direct hormones, and the portal versus neural delivery routes.' },
    discovery: {
        question: 'The anterior pituitary is called the \'master gland\' — yet it takes orders from the hypothalamus through a private capillary network. What travels through that portal blood that lets a brain region remote-control six hormones?',
        options: ['Releasing and inhibiting hormones that switch each anterior pituitary hormone\'s secretion up or down', 'Antibodies that tag which pituitary cells may fire', 'Nerve impulses — the portal vessels are actually neurons', 'Finished thyroid and adrenal hormones being recycled'],
        answer: 'Releasing and inhibiting hormones that switch each anterior pituitary hormone\'s secretion up or down',
        hook: 'The \'master gland\' is really middle management — the hypothalamus writes the orders, the portal vein delivers them, and the pituitary just issues commands downstream.',
    },
    teaching: [
        { title: 'Endocrine Glands: Hypothalamus and Pituitary', text: 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes releasing and inhibiting hormones to regulate the anterior pituitary via a hypophyseal portal system, while the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_19_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Sort the hypothalamus–pituitary partnership: which hormones are born in hypothalamic neurons and merely stored in the posterior lobe, which the anterior lobe truly makes, and why a diabetes insipidus patient\'s flood of dilute urine points to the neural side.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_001', title: 'Endocrine Glands: Hypothalamus and Pituitary',
          caseStudy: { intro: 'Imagine you are standing up quickly after sitting for a long time and feel dizzy for a moment — your body instantly adjusts blood pressure and heart rate.',
            decisions: [{ prompt: 'Name the two types of hormones produced by the hypothalamus and state their effect on anterior pituitary hormone secretion.', options: [
                { text: 'The hypothalamus produces releasing hormones (e.g., GnRH, TRH, CRH) that stimulate', outcome: 'The hypothalamus produces releasing hormones (e.g., GnRH, TRH, CRH) that stimulate anterior.' },
                { text: 'stimulating hormones', outcome: 'Not quite — Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.', reveals: 'oxytocin-and-adh-are-synthesized' },
                { text: 'pituitary gland defect', outcome: 'Not quite — Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.', reveals: 'oxytocin-and-adh-are-synthesized' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_002', title: 'Thyroid and Parathyroid Glands',
          caseStudy: { intro: 'Observe a person in your neighborhood with a visible swelling at the base of the neck – this is a goitre, often caused by iodine deficiency in the diet, common.',
            decisions: [{ prompt: 'Name the two iodinated hormones secreted by the thyroid follicular cells and state the essential dietary element required for their.', options: [
                { text: 'The thyroid follicular cells secrete thyroxine (T4) and triiodothyronine (T3)', outcome: 'The thyroid follicular cells secrete thyroxine (T4) and triiodothyronine (T3); iodine is the.' },
                { text: 'calcitonin as an iodinated hormone or stating iron is needed', outcome: 'Not quite — Students often think calcitonin is the major hormone regulating blood calcium in humans, and that.', reveals: 'calcitonin-is-the-major-hormone' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_003', title: 'Pancreas: Insulin and Glucagon',
          caseStudy: { intro: 'Imagine a student eating a plate of rajma-chawal for lunch — within minutes, blood glucose rises, yet the body maintains it within a narrow 70-110 mg/dL range.',
            decisions: [{ prompt: 'Name the two principal cell types in the Islets of Langerhans and the hormone each secretes.', options: [
                { text: 'α-cells secrete glucagon', outcome: 'α-cells secrete glucagon; β-cells secrete insulin. A wrong answer (e.g., "α-cells secrete insulin".' },
                { text: 'α-cells secrete insulin', outcome: 'Not quite — Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like.', reveals: 'glucagon-acts-on-muscle-glycogen' },
                { text: 'pancreas secretes insulin', outcome: 'Not quite — Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like.', reveals: 'glucagon-acts-on-muscle-glycogen' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_005', title: 'Gonads: Testis and Ovary Hormones',
          caseStudy: { intro: 'Observe how a teenage boy\'s voice deepens and facial hair appears, while a teenage girl develops breast tissue and starts menstruating—these visible changes.',
            decisions: [{ prompt: 'Name the specific cell type in the testis that synthesizes androgens and the primary androgen produced.', options: [
                { text: 'Leydig cells (interstitial cells) produce testosterone', outcome: 'Leydig cells (interstitial cells) produce testosterone. A wrong answer (e.g., "Sertoli cells.' },
                { text: 'Sertoli cells produce testosterone', outcome: 'Not quite — Students often believe that LH directly stimulates estrogen secretion from the ovarian follicle.', reveals: 'lh-directly-stimulates-estrogen-secretion' },
                { text: 'LH directly stimulates estrogen secretion from the ovarian follicle', outcome: 'Not quite — Students often believe that LH directly stimulates estrogen secretion from the ovarian follicle.', reveals: 'lh-directly-stimulates-estrogen-secretion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_006', title: 'Hormones of Heart, Kidney and Gastrointestinal Tract',
          caseStudy: { intro: 'Notice how your heart beats faster and you feel thirsty after eating a very salty meal of papad and pickle - your body is detecting increased blood volume and.',
            decisions: [{ prompt: 'Name the hormone secreted by the atrial wall of the heart and state its primary effect on blood pressure.', options: [
                { text: 'Atrial natriuretic factor (ANF) is secreted by the atrial wall', outcome: 'Atrial natriuretic factor (ANF) is secreted by the atrial wall; it decreases blood pressure.' },
                { text: 'adrenaline increases blood pressure', outcome: 'Not quite — Students believe that only classic endocrine glands (pituitary, thyroid, adrenal, etc.) secrete.', reveals: 'only-classic-endocrine-glands-pituitary' },
                { text: 'ANF increases blood pressure', outcome: 'Not quite — Students believe that only classic endocrine glands (pituitary, thyroid, adrenal, etc.) secrete.', reveals: 'only-classic-endocrine-glands-pituitary' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_19_002', title: 'Identify each idea',
          dissect: { specimen: 'Chemical Coordination and Integration · Part 1/2', spots: [
            { id: 's1', label: 'Endocrine Glands Hypothalamus and Pituitary', prompt: 'Which idea is this? — The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes.', answer: 'Endocrine Glands Hypothalamus and Pituitary', options: ['Endocrine Glands Hypothalamus and Pituitary', 'Thyroid and Parathyroid Glands', 'Pancreas Insulin and Glucagon', 'Adrenal Gland Cortex and Medulla'] },
            { id: 's2', label: 'Thyroid and Parathyroid Glands', prompt: 'Which idea is this? — The thyroid gland is a bilobed endocrine gland located anterior to the trachea that.', answer: 'Thyroid and Parathyroid Glands', options: ['Thyroid and Parathyroid Glands', 'Endocrine Glands Hypothalamus and Pituitary', 'Pancreas Insulin and Glucagon', 'Adrenal Gland Cortex and Medulla'] },
            { id: 's3', label: 'Pancreas Insulin and Glucagon', prompt: 'Which idea is this? — The pancreas is a composite gland functioning as both an exocrine and endocrine organ.', answer: 'Pancreas Insulin and Glucagon', options: ['Pancreas Insulin and Glucagon', 'Endocrine Glands Hypothalamus and Pituitary', 'Thyroid and Parathyroid Glands', 'Adrenal Gland Cortex and Medulla'] },
            { id: 's4', label: 'Adrenal Gland Cortex and Medulla', prompt: 'Which idea is this? — The adrenal glands are a pair of endocrine glands situated superior to each kidney, each.', answer: 'Adrenal Gland Cortex and Medulla', options: ['Adrenal Gland Cortex and Medulla', 'Endocrine Glands Hypothalamus and Pituitary', 'Thyroid and Parathyroid Glands', 'Pancreas Insulin and Glucagon'] },
            { id: 's5', label: 'Gonads Testis and Ovary Hormones', prompt: 'Which idea is this? — Gonads are dual-function organs (testis in males, ovary in females) that produce gametes.', answer: 'Gonads Testis and Ovary Hormones', options: ['Gonads Testis and Ovary Hormones', 'Endocrine Glands Hypothalamus and Pituitary', 'Thyroid and Parathyroid Glands', 'Pancreas Insulin and Glucagon'] },
            { id: 's6', label: 'Hormones of Heart Kidney and Gastrointestinal Tract', prompt: 'Which idea is this? — Hormones of the heart, kidney, and gastrointestinal tract are peptide hormones secreted.', answer: 'Hormones of Heart Kidney and Gastrointestinal Tract', options: ['Hormones of Heart Kidney and Gastrointestinal Tract', 'Endocrine Glands Hypothalamus and Pituitary', 'Thyroid and Parathyroid Glands', 'Pancreas Insulin and Glucagon'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a hospital\'s endocrine clinic you hear a doctor explain a patient\'s diabetes insipidus: \'His posterior pituitary isn\'t making enough ADH.\' A medical intern corrects her notes, saying the posterior pituitary manufactures oxytocin and ADH just as the anterior lobe makes growth hormone.',
            decisions: [{ prompt: 'Is the intern\'s correction accurate?', options: [
                { text: 'No — ADH and oxytocin are synthesised in hypothalamic neuron cell bodies (supraoptic and paraventricular nuclei), travel down axons in the stalk, and are merely stored and released by the posterior pituitary. The anterior pituitary, in contrast, truly manufactures its tropic hormones under hypothalamic releasing/inhibiting hormone control via the portal blood.', outcome: 'Posterior pituitary = neural depot (stores hypothalamic hormones); anterior pituitary = true gland (makes its own under portal-vessel control).' },
                { text: 'Yes — whatever a gland releases, it must have synthesised; storage without synthesis isn\'t a gland\'s job.', outcome: 'The posterior pituitary is neural tissue, not glandular epithelium — a storage-and-release terminal for hypothalamic neurons.', reveals: 'posterior-pituitary-makes-adh' },
                { text: 'Partly — the posterior pituitary makes ADH but the hypothalamus makes only the releasing hormones for the anterior lobe.', outcome: 'Hypothalamic neurons make BOTH the releasing/inhibiting factors for the anterior lobe and the finished ADH/oxytocin stored behind; splitting it that way misplaces the synthesis site.', reveals: 'adh-made-in-pituitary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_19_006', title: 'The bigger picture',
          caseStudy: { intro: 'You cracked the hierarchy — hypothalamus to anterior pituitary by blood, to posterior pituitary by nerve — and \'master gland\' now means output, not autonomy.',
            decisions: [{ prompt: 'What comes next? Chemical Coordination and Integration · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chemical Coordination and Integration · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_001', difficulty: 'standard',
          question: 'The hypothalamus is a neuroendocrine region of the diencephalon that.',
          hint: 'Revisit Class 10 "Human Brain: Forebrain, Midbrain and Hindbrain Functions".',
          misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.',
          parts: [
                { id: 'a', prompt: 'Explain why the anterior pituitary is called the "master gland" even though it is itself controlled by the hypothalamus.', answer: 'The anterior pituitary is called the master gland',
                  options: ['The anterior pituitary is called the master gland', 'it controls everything independently', 'hypothalamus is the real master', 'master gland'],
                  hint: 'Revisit Class 10 "Human Brain: Forebrain, Midbrain and Hindbrain Functions" (c10_bio_cbse_02_004).',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' },
                { id: 'b', prompt: 'A patient presents with excessive thirst, polyuria (large volume of dilute urine), and dehydration despite adequate water intake.', answer: 'The symptoms indicate diabetes insipidus due to deficiency of vasopressin (ADH)',
                  options: ['The symptoms indicate diabetes insipidus due to deficiency of vasopressin (ADH)', 'anterior pituitary', 'GH deficiency', 'pituitary gland defect'],
                  hint: 'Revisit Class 10 "Human Brain: Forebrain, Midbrain and Hindbrain Functions" (c10_bio_cbse_02_004).',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' }
          ],
            remediations: { 'oxytocin-and-adh-are-synthesized': { steps: ['Draw the hypothalamo-hypophyseal tract showing neuronal cell bodies in hypothalamus, axons in stalk, and nerve endings.', 'Label "synthesis in cell body", "axonal transport", "storage in Herring bodies", "release into capillaries".', 'Contrast with anterior pituitary: draw portal capillaries, label "hypothalamic neuron releases RH/IH into primary.', 'Verbally explain: "Posterior pituitary is a storage depot; anterior pituitary is a target gland for hypothalamic.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.',
          parts: [
                { id: 'a', prompt: 'A 25-year-old male develops coarse facial features, enlarged hands and feet, and jaw protrusion over two years.', answer: 'This is acromegaly, not gigantism',
                  options: ['This is acromegaly, not gigantism', 'pituitary gland defect', 'oxytocin and ADH are synthesized in the posterior pituitary'],
                  hint: 'Revisit Class 10 "Human Brain: Forebrain, Midbrain and Hindbrain Functions" (c10_bio_cbse_02_004).',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' },
                { id: 'b', prompt: 'Design a simple flowchart experiment to demonstrate that the anterior pituitary requires hypothalamic factors for hormone secretion, using the concept of the.', answer: 'A good answer: 1) Remove pituitary from an animal and place in culture medium',
                  options: ['A good answer: 1) Remove pituitary from an animal and place in culture medium', 'pituitary gland defect', 'oxytocin and ADH are synthesized in the posterior pituitary'],
                  hint: 'Revisit Class 10 "Human Brain: Forebrain, Midbrain and Hindbrain Functions" (c10_bio_cbse_02_004).',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' }
          ],
            remediations: { 'oxytocin-and-adh-are-synthesized': { steps: ['Draw the hypothalamo-hypophyseal tract showing neuronal cell bodies in hypothalamus, axons in stalk, and nerve endings.', 'Label "synthesis in cell body", "axonal transport", "storage in Herring bodies", "release into capillaries".', 'Contrast with anterior pituitary: draw portal capillaries, label "hypothalamic neuron releases RH/IH into primary.', 'Verbally explain: "Posterior pituitary is a storage depot; anterior pituitary is a target gland for hypothalamic.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_002', difficulty: 'standard',
          question: 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea.',
          hint: 'Review the hypothalamus and pituitary node (c11_bio_cbse_19_001) focusing.',
          misconception: 'Students often think calcitonin is the major hormone regulating blood calcium in humans, and that PTH is secreted.',
          parts: [
                { id: 'a', prompt: 'Name the two iodinated hormones secreted by the thyroid follicular cells and state the essential dietary element required for their synthesis.', answer: 'The thyroid follicular cells secrete thyroxine (T4) and triiodothyronine (T3)',
                  options: ['The thyroid follicular cells secrete thyroxine (T4) and triiodothyronine (T3)', 'calcitonin as an iodinated hormone or stating iron is needed'],
                  hint: 'Review the hypothalamus and pituitary node (c11_bio_cbse_19_001) focusing on releasing/inhibiting.',
                  misconception: 'Students often think calcitonin is the major hormone regulating blood calcium in humans, and that PTH is secreted by the thyroid.' }
          ],
            remediations: { 'calcitonin-is-the-major-hormone': { steps: ['Draw a two-column table comparing thyroid vs parathyroid: location, cell types, hormones, stimuli, target organs.', 'Sketch the HPT axis feedback loop with arrows showing stimulation (TRH→TSH→T3/T4) and inhibition (T3/T4 ─| TRH, TSH).', 'Use a flowchart to trace calcium homeostasis: low Ca²⁺ → parathyroid → PTH → bone/kidney/intestine → high Ca²⁺ →.', 'Practice writing one-sentence definitions for cretinism, myxoedema, Graves\' disease, and goitre linking cause to effect.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_003', difficulty: 'standard',
          question: 'The pancreas is a composite gland functioning as both an exocrine and endocrine.',
          hint: 'Revisit Class 10 "Pancreas: Insulin and Blood Sugar Regulation" and Class 11 "Cellular.',
          misconception: 'Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like it acts on liver.',
          parts: [
                { id: 'a', prompt: 'Name the two principal cell types in the Islets of Langerhans and the hormone each secretes.', answer: 'α-cells secrete glucagon',
                  options: ['α-cells secrete glucagon', 'α-cells secrete insulin', 'pancreas secretes insulin'],
                  hint: 'Revisit Class 10 "Pancreas: Insulin and Blood Sugar Regulation" and Class 11 "Cellular Respiration".',
                  misconception: 'Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like it acts on liver glycogen.' },
                { id: 'b', prompt: 'A patient has a blood glucose of 320 mg/dL and urine tests positive for ketone bodies.', answer: 'Type 1 diabetes mellitus',
                  options: ['Type 1 diabetes mellitus', 'diabetes = high sugar'],
                  hint: 'Revisit Class 10 "Pancreas: Insulin and Blood Sugar Regulation" and Class 11 "Cellular Respiration".',
                  misconception: 'Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like it acts on liver glycogen.' }
          ],
            remediations: { 'glucagon-acts-on-muscle-glycogen': { steps: ['Draw a hepatocyte and a myocyte side by side; list enzymes: both have glycogen phosphorylase, but only hepatocyte has.', 'Trace glucagon → cAMP → PKA → phosphorylase kinase → glycogen phosphorylase (active) in both cells.', 'In hepatocyte, G6P → glucose (via G6Pase) → blood; in myocyte, G6P → glycolysis (no G6Pase).', 'Verify with clinical fact: glucagon treats hypoglycemia in insulin overdose — if muscle contributed, dose would.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_004', difficulty: 'standard',
          question: 'The adrenal glands are a pair of endocrine glands situated superior to each.',
          hint: 'Revisit c11_bio_cbse_19_001 for ACTH regulation and c10_bio_cbse_01_009 for kidney\'s role.',
          misconception: 'Students often believe the adrenal medulla and cortex are both controlled by ACTH because they are part of the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The adrenal glands are a pair of endocrine glands situated superior to each kidney, each',
                  options: ['The adrenal glands are a pair of endocrine glands situated superior to each kidney, each', 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes', 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea that', 'The pancreas is a composite gland functioning as both an exocrine and endocrine organ'],
                  hint: 'Revisit c11_bio_cbse_19_001 for ACTH regulation and c10_bio_cbse_01_009 for kidney\'s role in renin.',
                  misconception: 'Students often believe the adrenal medulla and cortex are both controlled by ACTH because they are part of the same gland.' }
          ],
            remediations: { 'the-adrenal-medulla-and-cortex': { steps: ['Draw a two-column table—left column "Adrenal Medulla", right column "Adrenal Cortex".', 'Fill rows for embryonic origin (neural crest vs mesoderm), innervation (splanchnic nerves vs none), primary regulator.', 'Use the table to answer: "Which layer responds to a sudden scare?" (medulla) and "Which layer responds.', 'Re-attempt Diagnostic Questions 2 and 4 using this framework.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_005', difficulty: 'standard',
          question: 'Gonads are dual-function organs (testis in males, ovary in females) that.',
          hint: 'Review the hypothalamic-pituitary-gonadal axis and the distinction between peptide and.',
          misconception: 'Students often believe that LH directly stimulates estrogen secretion from the ovarian follicle.',
          parts: [
                { id: 'a', prompt: 'Name the specific cell type in the testis that synthesizes androgens and the primary androgen produced.', answer: 'Leydig cells (interstitial cells) produce testosterone',
                  options: ['Leydig cells (interstitial cells) produce testosterone', 'Sertoli cells produce testosterone', 'LH directly stimulates estrogen secretion from the ovarian follicle'],
                  hint: 'Review the hypothalamic-pituitary-gonadal axis and the distinction between peptide and steroid.',
                  misconception: 'Students often believe that LH directly stimulates estrogen secretion from the ovarian follicle.' },
                { id: 'b', prompt: 'A 25-year-old woman has a mature Graafian follicle. Predict which hormone(s) will rise sharply just before ovulation and describe the immediate effect on the.', answer: 'LH surge triggers ovulation',
                  options: ['LH surge triggers ovulation', 'FSH surge causes ovulation', 'LH directly stimulates estrogen secretion from the ovarian follicle'],
                  hint: 'Review the hypothalamic-pituitary-gonadal axis and the distinction between peptide and steroid.',
                  misconception: 'Students often believe that LH directly stimulates estrogen secretion from the ovarian follicle.' }
          ],
            remediations: { 'lh-directly-stimulates-estrogen-secretion': { steps: ['Draw the two-cell model: label theca cells (LH receptor → androgen synthesis) and granulosa cells (FSH receptor →.', 'Trace the path of cholesterol → androstenedione → estrone/estradiol, noting which enzyme (aromatase) and which.', 'Explain why a patient with an aromatase deficiency would have high androgens but low estrogens despite normal LH levels.', 'Re-read NCERT 19.2.10 lines on "estrogen is synthesised mainly by the growing ovarian follicles" and connect.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_006', difficulty: 'standard',
          question: 'Hormones of the heart, kidney, and gastrointestinal tract are peptide hormones.',
          hint: 'Review Class 10 Chapter 7 (Control and Coordination) for hormone definition and endocrine.',
          misconception: 'Students believe that only classic endocrine glands (pituitary, thyroid, adrenal, etc.) secrete hormones, and that the.',
          parts: [
                { id: 'a', prompt: 'Name the hormone secreted by the atrial wall of the heart and state its primary effect on blood pressure.', answer: 'Atrial natriuretic factor (ANF) is secreted by the atrial wall',
                  options: ['Atrial natriuretic factor (ANF) is secreted by the atrial wall', 'adrenaline increases blood pressure', 'ANF increases blood pressure', 'only classic endocrine glands (pituitary, thyroid, adrenal, etc'],
                  hint: 'Review Class 10 Chapter 7 (Control and Coordination) for hormone definition and endocrine.',
                  misconception: 'Students believe that only classic endocrine glands (pituitary, thyroid, adrenal, etc.) secrete hormones, and that the heart, kidney, and.' },
                { id: 'b', prompt: 'A patient has chronic kidney disease with significantly reduced functional nephrons. Predict the hematological consequence and explain the hormonal mechanism.', answer: 'The patient will develop anemia (low RBC count)',
                  options: ['The patient will develop anemia (low RBC count)', 'iron deficiency', 'blood loss', 'only classic endocrine glands (pituitary, thyroid, adrenal, etc'],
                  hint: 'Review Class 10 Chapter 7 (Control and Coordination) for hormone definition and endocrine.',
                  misconception: 'Students believe that only classic endocrine glands (pituitary, thyroid, adrenal, etc.) secrete hormones, and that the heart, kidney, and.' }
          ],
            remediations: { 'only-classic-endocrine-glands-pituitary': { steps: ['Revisit the NCERT definition of hormone (non-nutrient chemical, intercellular messenger, trace amounts, produced.', 'Create a three-column table: Tissue | Hormone | Target | Effect - fill for heart, kidney, stomach, duodenum.', 'For each, identify the stimulus (stretch, hypoxia, peptides, acid, fat) and trace the feedback loop.', 'Practice explaining to a peer why "filtering blood" and "secreting erythropoietin" are two distinct kidney functions.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
