import type { SimDef } from '../../engine/types';
import C11_BiologyEndocrineGlandsTheirSim from '../../../simulations/c6_12/C11_BiologyEndocrineGlandsTheirSim';

/** v3 wrapped master — C11_BiologyEndocrineGlandsTheirSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyendocrineglandstheirsim: SimDef = {
    id: 'v3w_c11_biologyendocrineglandstheirsim',
    title: 'Endocrine Glands: Hypothalamus and Pituitary',
    subtitle: 'This node covers the structural organization of the hypothalamus and pituitary, the.',
    classLevel: 11, subject: 'biology', topic: 'Endocrine Glands: Hypothalamus and Pituitary',
    chapters: [],
    nodeIds: ['c11_bio_cbse_19_001', 'c11_bio_cbse_19_002', 'c11_bio_cbse_19_003', 'c11_bio_cbse_19_004', 'c11_bio_cbse_19_007', 'c11_bio_cbse_19_008', 'c11_bio_cbse_19_005', 'c11_bio_cbse_19_006', 'c11_bio_cbse_18_004', 'c11_bio_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing up quickly after sitting for a long time and feel dizzy for a moment — your body.', goal: 'Master Endocrine Glands: Hypothalamus and Pituitary.' },
    discovery: {
        question: 'Explain why the anterior pituitary is called the "master gland" even though it is itself controlled by the hypothalamus.',
        options: ['The anterior pituitary is called the master gland', 'it controls everything independently', 'hypothalamus is the real master'],
        answer: 'The anterior pituitary is called the master gland',
        hook: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.',
    },
    teaching: [
        { title: 'The hypothalamus is a neuroendocrine region.', text: 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes releasing and inhibiting hormones to regulate the anterior pituitary via a hypophyseal portal system, while the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_19_001', title: 'The hypothalamus is a neuroendocrine.',
          scaffold: { problem: 'A researcher isolates blood from the hypophyseal portal veins of a mammal and finds high concentrations of TRH (thyrotropin-releasing.',
            steps: [
            { text: 'Identify the source of TRH — hypothalamic neurons (paraventricular nucleus) release TRH into the primary capillary.' },
            { text: 'Recognize that portal blood carries TRH directly to the anterior pituitary sinusoids before it enters general.' },
            { text: 'Note that TSH is secreted by anterior pituitary thyrotrophs in response to TRH; it enters the systemic circulation via.' },
            { text: 'Predict that cutting the stalk severs portal vessels, stopping TRH delivery → anterior pituitary TSH secretion falls →.' },
            { text: 'Confirm that posterior pituitary function (ADH/oxytocin release) may persist if hypothalamic neuron cell bodies are.', faded: true, blankAnswer: 'Portal blood carries hypothalamic releasing hormones (TRH).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_19_002', title: 'The thyroid gland is a bilobed.',
          scaffold: { problem: 'A 32-year-old woman from a coastal region presents with weight loss despite increased appetite, heat intolerance, palpitations, and a.',
            steps: [
            { text: 'Recognize the clinical picture – weight loss, heat intolerance, tachycardia, goitre with exophthalmos – as classic.' },
            { text: 'Recall the normal HPT axis: hypothalamus releases TRH → anterior pituitary releases TSH → thyroid releases T3/T4.' },
            { text: 'In Graves\' disease, thyroid-stimulating immunoglobulins (TSI) bind to TSH receptors on follicular cells and mimic TSH.' },
            { text: 'The elevated T3/T4 exert strong negative feedback on pituitary thyrotrophs, suppressing TSH secretion to very low.' },
            { text: 'Conclude: Condition is Graves\' disease; low TSH is due to negative feedback from excess T3/T4; the stimulating antibody.', faded: true, blankAnswer: 'Graves\' disease (exophthalmic goitre). Low TSH results from.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_19_003', title: 'The pancreas is a composite gland.',
          scaffold: { problem: 'A 25-year-old male presents with polyuria, polydipsia, weight loss, and blood glucose of 480 mg/dL. Urine dipstick shows +++ ketones.',
            steps: [
            { text: 'Identify the primary defect — absolute insulin deficiency (β-cell destruction) → no insulin signaling in hepatocytes,.' },
            { text: 'Trace adipocyte effect — absent insulin → hormone-sensitive lipase (HSL) not phosphorylated/inhibited → uncontrolled.' },
            { text: 'Trace hepatocyte effect — low insulin + high glucagon (no paracrine suppression) → glycogenolysis + gluconeogenesis.' },
            { text: 'Link β-oxidation to ketogenesis — acetyl-CoA from β-oxidation exceeds TCA cycle capacity (oxaloacetate diverted to.' },
            { text: 'Explain acidosis — ketone bodies are weak acids (pKa ~4.5) → dissociate → H⁺ + anion → H⁺ buffered by HCO₃⁻ → metabolic.' },
            { text: 'Connect to symptoms — hyperglycemia > renal threshold (180 mg/dL) → glycosuria → osmotic diuresis → polyuria →.', faded: true, blankAnswer: 'Insulin deficiency → uncontrolled adipocyte lipolysis.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_19_004', title: 'The adrenal glands are a pair of.',
          scaffold: { problem: 'A 45-year-old male construction worker collapses at a worksite in peak summer (42°C).',
            steps: [
            { text: 'Identify the stressors—heat exposure → volume depletion (sweating), hypoglycaemia, and physical exertion—all potent.' },
            { text: 'Recall medulla response—splanchnic nerve firing → acetylcholine on chromaffin cells → epinephrine/norepinephrine.' },
            { text: 'Recall cortex response—hypotension → renal hypoperfusion → renin release → angiotensin II → zona glomerulosa →.' },
            { text: 'Analyse the failure pattern—persistent hypotension + hyponatraemia + hyperkalaemia + hypoglycaemia despite maximal.' },
            { text: 'Conclude—adrenal crisis in undiagnosed Addison\'s disease; immediate treatment requires IV hydrocortisone.', faded: true, blankAnswer: 'The patient is in adrenal crisis due to primary adrenal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_19_007', title: 'The mechanism of hormone action refers.',
          scaffold: { problem: 'A Class 11 student is asked: "Adrenaline stimulates glycogenolysis in liver cells via cAMP.',
            steps: [
            { text: 'Identify the pathway — adrenaline (peptide) → β-adrenergic receptor (GPCR) → Gs protein → adenylate cyclase → cAMP →.' },
            { text: 'Analyze (a) phosphodiesterase inhibitor — phosphodiesterase degrades cAMP; inhibiting it increases cAMP half-life,.' },
            { text: 'Analyze (b) PKA inhibitor — PKA is the direct effector of cAMP; blocking it prevents phosphorylation of downstream.' },
            { text: 'Analyze (c) 8-Br-cAMP — this analog bypasses the receptor and G-protein, directly activating PKA → glycogenolysis.' },
            { text: 'Synthesize — the order of action is receptor → G-protein → cAMP → PKA → effect; interventions downstream of cAMP (PKA.', faded: true, blankAnswer: '(a) Enhanced/prolonged glycogenolysis. (b) Complete.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_19_008', title: 'Endocrine disorders are pathological.',
          scaffold: { problem: 'A 28-year-old woman from Kerala presents with 6 months of weight gain (12 kg), irregular menses, hirsutism (facial hair), and acne.',
            steps: [
            { text: 'Identify hormone pattern — cortisol HIGH, ACTH HIGH → ACTH-dependent Cushing\'s syndrome (not adrenal tumor which would.' },
            { text: 'Localize ACTH source — high dose dexamethasone suppresses cortisol → pituitary source (Cushing\'s disease) because.' },
            { text: 'Explain pathophysiology — pituitary corticotroph adenoma autonomously secretes ACTH → bilateral adrenal hyperplasia →.' },
            { text: 'Connect symptoms to hormone actions — cortisol → gluconeogenesis (hyperglycemia), mineralocorticoid effect.' },
            { text: 'Verify feedback logic — low dose dexamethasone (physiological replacement) fails to suppress because tumor has reduced.', faded: true, blankAnswer: 'Cushing\'s disease (pituitary ACTH-secreting adenoma)..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_19_002', title: 'Identify each idea',
          dissect: { specimen: 'Endocrine Glands: Hypothalamus and Pituitary', spots: [
            { id: 's1', label: 'The hypothalamus is a neuroendocrine', prompt: 'Which idea is this? — The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes.', answer: 'The hypothalamus is a neuroendocrine', options: ['The hypothalamus is a neuroendocrine', 'The thyroid gland is a', 'The pancreas is a composite', 'The adrenal glands are a'] },
            { id: 's2', label: 'The thyroid gland is a', prompt: 'Which idea is this? — The thyroid gland is a bilobed endocrine gland located anterior to the trachea that.', answer: 'The thyroid gland is a', options: ['The thyroid gland is a', 'The hypothalamus is a neuroendocrine', 'The pancreas is a composite', 'The adrenal glands are a'] },
            { id: 's3', label: 'The pancreas is a composite', prompt: 'Which idea is this? — The pancreas is a composite gland functioning as both an exocrine and endocrine organ;.', answer: 'The pancreas is a composite', options: ['The pancreas is a composite', 'The hypothalamus is a neuroendocrine', 'The thyroid gland is a', 'The adrenal glands are a'] },
            { id: 's4', label: 'The adrenal glands are a', prompt: 'Which idea is this? — The adrenal glands are a pair of endocrine glands situated superior to each kidney, each.', answer: 'The adrenal glands are a', options: ['The adrenal glands are a', 'The hypothalamus is a neuroendocrine', 'The thyroid gland is a', 'The pancreas is a composite'] },
            { id: 's5', label: 'The mechanism of hormone action', prompt: 'Which idea is this? — The mechanism of hormone action refers to the specific sequence of molecular events by.', answer: 'The mechanism of hormone action', options: ['The mechanism of hormone action', 'The hypothalamus is a neuroendocrine', 'The thyroid gland is a', 'The pancreas is a composite'] },
            { id: 's6', label: 'Endocrine disorders are pathological conditions', prompt: 'Which idea is this? — Endocrine disorders are pathological conditions arising from abnormal hormone synthesis,.', answer: 'Endocrine disorders are pathological conditions', options: ['Endocrine disorders are pathological conditions', 'The hypothalamus is a neuroendocrine', 'The thyroid gland is a', 'The pancreas is a composite'] }
          ] } }
    ],
    explore: { component: C11_BiologyEndocrineGlandsTheirSim, prompt: 'Explore the interactive — Endocrine Glands: Hypothalamus and Pituitary' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_001', difficulty: 'standard',
          question: 'The hypothalamus is a neuroendocrine region of the diencephalon that.',
          hint: 'Revisit Class 10 "Human Brain: Forebrain, Midbrain and Hindbrain Functions".',
          misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.',
          parts: [
                { id: 'a', prompt: 'Explain why the anterior pituitary is called the "master gland" even though it is itself controlled by the hypothalamus.', answer: 'The anterior pituitary is called the master gland',
                  options: ['The anterior pituitary is called the master gland', 'it controls everything independently', 'hypothalamus is the real master'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' },
                { id: 'b', prompt: 'A patient presents with excessive thirst, polyuria (large volume of dilute urine), and dehydration despite adequate water intake.', answer: 'The symptoms indicate diabetes insipidus due to deficiency of vasopressin (ADH)',
                  options: ['The symptoms indicate diabetes insipidus due to deficiency of vasopressin (ADH)', 'anterior pituitary', 'GH deficiency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' }
          ],
            remediations: { 'oxytocin-and-adh-are-synthesized': { steps: ['Draw the hypothalamo-hypophyseal tract showing neuronal cell bodies in hypothalamus, axons in stalk, and nerve endings.', 'Label "synthesis in cell body", "axonal transport", "storage in Herring bodies", "release into capillaries".', 'Contrast with anterior pituitary: draw portal capillaries, label "hypothalamic neuron releases RH/IH into primary.', 'Verbally explain: "Posterior pituitary is a storage depot; anterior pituitary is a target gland for hypothalamic.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.',
          parts: [
                { id: 'a', prompt: 'A 25-year-old male develops coarse facial features, enlarged hands and feet, and jaw protrusion over two years.', answer: 'This is acromegaly, not gigantism',
                  options: ['This is acromegaly, not gigantism', 'pituitary gland defect', 'oxytocin and ADH are synthesized in the posterior pituitary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' },
                { id: 'b', prompt: 'Design a simple flowchart experiment to demonstrate that the anterior pituitary requires hypothalamic factors for hormone secretion, using the concept of the.', answer: 'A good answer: 1) Remove pituitary from an animal and place in culture medium',
                  options: ['A good answer: 1) Remove pituitary from an animal and place in culture medium', 'pituitary gland defect', 'oxytocin and ADH are synthesized in the posterior pituitary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that oxytocin and ADH are synthesized in the posterior pituitary.' }
          ],
            remediations: { 'oxytocin-and-adh-are-synthesized': { steps: ['Draw the hypothalamo-hypophyseal tract showing neuronal cell bodies in hypothalamus, axons in stalk, and nerve endings.', 'Label "synthesis in cell body", "axonal transport", "storage in Herring bodies", "release into capillaries".', 'Contrast with anterior pituitary: draw portal capillaries, label "hypothalamic neuron releases RH/IH into primary.', 'Verbally explain: "Posterior pituitary is a storage depot; anterior pituitary is a target gland for hypothalamic.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_002', difficulty: 'standard',
          question: 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea.',
          hint: 'Review the hypothalamus and pituitary node (c11_bio_cbse_19_001) focusing on.',
          misconception: 'Students often think calcitonin is the major hormone regulating blood calcium in humans, and that PTH is secreted by.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea that',
                  options: ['The thyroid gland is a bilobed endocrine gland located anterior to the trachea that', 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes', 'The pancreas is a composite gland functioning as both an exocrine and endocrine organ', 'The adrenal glands are a pair of endocrine glands situated superior to each kidney, each'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think calcitonin is the major hormone regulating blood calcium in humans, and that PTH is secreted by the thyroid.' }
          ],
            remediations: { 'calcitonin-is-the-major-hormone': { steps: ['Draw a two-column table comparing thyroid vs parathyroid: location, cell types, hormones, stimuli, target organs,.', 'Sketch the HPT axis feedback loop with arrows showing stimulation (TRH→TSH→T3/T4) and inhibition (T3/T4 ─| TRH, TSH).', 'Use a flowchart to trace calcium homeostasis: low Ca²⁺ → parathyroid → PTH → bone/kidney/intestine → high Ca²⁺ →.', 'Practice writing one-sentence definitions for cretinism, myxoedema, Graves\' disease, and goitre linking cause to effect.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_003', difficulty: 'standard',
          question: 'The pancreas is a composite gland functioning as both an exocrine and endocrine.',
          hint: 'Revisit Class 10 "Pancreas: Insulin and Blood Sugar Regulation" and Class 11 "Cellular.',
          misconception: 'Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like it acts on liver.',
          parts: [
                { id: 'a', prompt: 'Name the two principal cell types in the Islets of Langerhans and the hormone each secretes.', answer: 'α-cells secrete glucagon',
                  options: ['α-cells secrete glucagon', 'α-cells secrete insulin', 'pancreas secretes insulin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like it acts on liver glycogen.' },
                { id: 'b', prompt: 'A patient has a blood glucose of 320 mg/dL and urine tests positive for ketone bodies.', answer: 'Type 1 diabetes mellitus',
                  options: ['Type 1 diabetes mellitus', 'diabetes = high sugar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe glucagon acts on muscle glycogen to raise blood glucose during fasting, just like it acts on liver glycogen.' }
          ],
            remediations: { 'glucagon-acts-on-muscle-glycogen': { steps: ['Draw a hepatocyte and a myocyte side by side; list enzymes: both have glycogen phosphorylase, but only hepatocyte has.', 'Trace glucagon → cAMP → PKA → phosphorylase kinase → glycogen phosphorylase (active) in both cells.', 'In hepatocyte, G6P → glucose (via G6Pase) → blood; in myocyte, G6P → glycolysis (no G6Pase).', 'Verify with clinical fact: glucagon treats hypoglycemia in insulin overdose — if muscle contributed, dose would be.', 'Re-read NCERT line: "Glucagon acts mainly on the liver cells (hepatocytes)" — the word "mainly" is the textbook\'s hint.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_004', difficulty: 'standard',
          question: 'The adrenal glands are a pair of endocrine glands situated superior to each.',
          hint: 'Revisit c11_bio_cbse_19_001 for ACTH regulation and c10_bio_cbse_01_009 for kidney\'s role.',
          misconception: 'Students often believe the adrenal medulla and cortex are both controlled by ACTH because they are part of the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The adrenal glands are a pair of endocrine glands situated superior to each kidney, each',
                  options: ['The adrenal glands are a pair of endocrine glands situated superior to each kidney, each', 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes', 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea that', 'The pancreas is a composite gland functioning as both an exocrine and endocrine organ'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the adrenal medulla and cortex are both controlled by ACTH because they are part of the same gland.' }
          ],
            remediations: { 'the-adrenal-medulla-and-cortex': { steps: ['Draw a two-column table—left column "Adrenal Medulla", right column "Adrenal Cortex".', 'Fill rows for embryonic origin (neural crest vs mesoderm), innervation (splanchnic nerves vs none), primary regulator.', 'Use the table to answer: "Which layer responds to a sudden scare?" (medulla) and "Which layer responds to.', 'Re-attempt Diagnostic Questions 2 and 4 using this framework.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_007', difficulty: 'standard',
          question: 'The mechanism of hormone action refers to the specific sequence of molecular.',
          hint: 'Revisit Class 9 Cell Membrane (c9_bio_ch1_3) for membrane permeability and Class 9.',
          misconception: 'Students often believe that "steroid hormones act only by changing gene expression and therefore always take hours to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mechanism of hormone action refers to the specific sequence of molecular events by',
                  options: ['The mechanism of hormone action refers to the specific sequence of molecular events by', 'The hypothalamus is a neuroendocrine region of the diencephalon that synthesizes', 'The thyroid gland is a bilobed endocrine gland located anterior to the trachea that', 'The pancreas is a composite gland functioning as both an exocrine and endocrine organ'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "steroid hormones act only by changing gene expression and therefore always take hours to show effects." They.' }
          ],
            remediations: { 'steroid-hormones-act-only-by': { steps: ['If the student holds this binary misconception, have them: (1) List the classical steps for adrenaline (peptide) and.', '(2) Research "non-genomic steroid action" and "peptide hormone genomic effects" using NCERT exemplar or trusted sources.', '(3) Create a Venn diagram showing overlapping features (both can ultimately affect transcription, both use.', '(4) Re-attempt Diagnostic Question 5, now considering that a Gs mutation might indirectly affect steroid hormone.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_008', difficulty: 'standard',
          question: 'Endocrine disorders are pathological conditions arising from abnormal hormone.',
          hint: 'If stuck, revisit c11_bio_cbse_19_001 (hypothalamus-pituitary) and c11_bio_cbse_19_007.',
          misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.',
          parts: [
                { id: 'a', prompt: 'Why does iodine deficiency cause goitre (thyroid enlargement) despite LOW thyroid hormone levels? Explain the feedback mechanism involved.', answer: 'Low iodine → low T3/T4 synthesis → reduced negative feedback on',
                  options: ['Correct answer: Low iodine → low T3/T4 synthesis → reduced negative feedback on', 'TSH decreases', 'thyroid atrophies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.' },
                { id: 'b', prompt: 'A 12-year-old boy shows accelerated growth, coarse facial features, and enlarged hands/feet. His GH levels are high, but IGF-1 (somatomedin) is normal.', answer: 'Liver (post-receptor defect / GH resistance / Laron syndrome)',
                  options: ['Correct answer: Liver (post-receptor defect / GH resistance / Laron syndrome)', 'pituitary tumor', 'goitre always means hypothyroidism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.' }
          ],
            remediations: { 'goitre-always-means-hypothyroidism-they': { steps: ['Draw the hypothalamic-pituitary-thyroid axis with arrows showing stimulation (+) and inhibition (−).', 'For each goitre type, trace the signal: Iodine deficiency → low T3/T4 → less (−) feedback → high TSH → thyroid growth.', 'Make a 3-column table: Condition | TSH | T3/T4 | Goitre? | Cause of growth.', 'Practice with 5 case vignettes — identify the goitre mechanism in each.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_19_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In Type 2 Diabetes Mellitus, insulin therapy is never required because the problem is insulin resistance, not insulin deficiency." Is.', answer: 'FALSE',
                  options: ['Correct answer: FALSE', 'goitre always means hypothyroidism', 'low function'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "goitre always means hypothyroidism" — they see thyroid enlargement and assume low function.' }
          ],
            remediations: { 'goitre-always-means-hypothyroidism-they': { steps: ['Draw the hypothalamic-pituitary-thyroid axis with arrows showing stimulation (+) and inhibition (−).', 'For each goitre type, trace the signal: Iodine deficiency → low T3/T4 → less (−) feedback → high TSH → thyroid growth.', 'Make a 3-column table: Condition | TSH | T3/T4 | Goitre? | Cause of growth.', 'Practice with 5 case vignettes — identify the goitre mechanism in each.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
