import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch08_p1: SimDef = {
    id: 'v3_c12_biotech_ch08_p1',
    title: 'Animal Cell Culture · Part 1/2',
    subtitle: 'Fresh donor cells or an immortal line? Every drug test pays for one with the other.',
    classLevel: 12, subject: 'biotechnology', topic: 'Animal Cell Culture · Part 1/2',
    chapters: ['c12_biotech_ch08'],
    nodeIds: ['c12_biotech_cbse_08_001', 'c12_biotech_cbse_08_002', 'c12_biotech_cbse_08_003', 'c12_biotech_cbse_08_004', 'c12_biotech_cbse_08_005', 'c12_biotech_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cell-culture researcher', intro: 'The polio vaccine was scaled in flasks, not animals — animal cell culture is how modern medicine tests everything.', goal: 'Describe the conditions for animal cell culture and compare primary cultures with established cell lines.' },
    discovery: {
        question: 'You must test a liver drug: choose between fresh primary hepatocytes from a donor and the immortal HepG2 cell line. What does each option really buy you?',
        options: ['Primary cells give realistic drug metabolism; HepG2 gives unlimited identical replicates — realism vs reproducibility', 'Primary cells are cheaper; cell lines are only used when tissue is unavailable', 'HepG2 is always superior because immortal cells are genetically normal', 'There is no difference — any liver cell behaves identically in a flask'],
        answer: 'Primary cells give realistic drug metabolism; HepG2 gives unlimited identical replicates — realism vs reproducibility',
        hook: 'The \'better\' cell doesn\'t exist — primary culture keeps the tissue\'s true character but dies; established lines are immortal and uniform but drift from normal. Every experiment pays for one with the other.',
    },
    teaching: [
        { title: 'Animal Cell Culture: History and Advantages Over Whole Organisms', text: 'Animal cell culture is the in vitro maintenance and proliferation of animal cells under controlled physico-chemical conditions (temperature, pH, osmolality, gas exchange) using a defined nutrient.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_08_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Set up an animal cell culture lab: recreate the physico-chemical conditions cells demand outside the body, and choose between primary culture and established cell lines for a drug-toxicity study.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_001', title: 'Animal Cell Culture: History and Advantages Over Whole Organisms',
          caseStudy: { intro: 'Imagine you are a scientist in 1950 trying to produce enough polio vaccine for millions of children.',
            decisions: [{ prompt: 'Define animal cell culture in one sentence using the terms “in vitro”, “nutrient medium”, and “physico-chemical conditions”.', options: [
                { text: 'Animal cell culture is the in vitro maintenance and proliferation of animal cells in a', outcome: 'Animal cell culture is the in vitro maintenance and proliferation of animal cells in a nutrient.' },
                { text: 'in vitro', outcome: 'Not quite — Students often believe that because animal cell culture uses “the same cells” as in the body, the.', reveals: 'because-animal-cell-culture-uses' },
                { text: 'controlled conditions', outcome: 'Not quite — Students often believe that because animal cell culture uses “the same cells” as in the body, the.', reveals: 'because-animal-cell-culture-uses' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_002', title: 'Primary Culture vs Established Cell Lines',
          caseStudy: { intro: 'Imagine you are testing a new hepatotoxicity drug. You have two options: (1) primary human hepatocytes freshly isolated from a donor liver, or (2) the.',
            decisions: [{ prompt: 'A researcher isolates cells from a mouse liver using collagenase digestion and cultures them for the first time.', options: [
                { text: 'This is a primary cell culture', outcome: 'This is a primary cell culture. It is heterogeneous because the enzymatic dissociation releases all.' },
                { text: 'established cell line', outcome: 'Not quite — Students often believe "primary culture" means a pure population of one cell type (e.g., "primary.', reveals: 'primary-culture-means-a-pure' },
                { text: 'clonal population', outcome: 'Not quite — Students often believe "primary culture" means a pure population of one cell type (e.g., "primary.', reveals: 'primary-culture-means-a-pure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_003', title: 'Types of Cell Lines: Finite and Continuous (Immortalized)',
          caseStudy: { intro: 'Imagine you are a researcher trying to decide which cell line to use for a long-term drug screening project: would you choose primary human fibroblasts that.',
            decisions: [{ prompt: 'What is the fundamental difference between a finite cell line and a continuous cell line in terms of their proliferative lifespan?', options: [
                { text: 'A finite cell line has a limited number of population doublings (typically 20–50) before', outcome: 'A finite cell line has a limited number of population doublings (typically 20–50) before entering.' },
                { text: 'finite lines are from cancer, continuous from normal tissue', outcome: 'Not quite — Students often think "continuous cell line" means the cells are cancer cells from a patient, while.', reveals: 'continuous-cell-line-means-the' },
                { text: 'continuous cell line', outcome: 'Not quite — Students often think "continuous cell line" means the cells are cancer cells from a patient, while.', reveals: 'continuous-cell-line-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_004', title: 'Culture Media: Defined, Complex, and Serum-Free Formulations',
          caseStudy: { intro: 'Imagine you are a bioprocess engineer at a Pune-based biotech startup tasked with producing a recombinant monoclonal antibody for cancer therapy using CHO.',
            decisions: [{ prompt: 'A researcher is culturing primary human fibroblasts for a wound-healing study.', options: [
                { text: 'Correct answer: Synthetic medium, serum-containing sub-category', outcome: 'Correct answer: Synthetic medium, serum-containing sub-category.' },
                { text: 'natural medium because serum is natural', outcome: 'Not quite — Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them.', reveals: 'students-conflate-serum-free-with' },
                { text: 'basal medium with supplements such as hormones, growth factors, serum', outcome: 'Not quite — Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them.', reveals: 'students-conflate-serum-free-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_005', title: 'Serum in Media: Role and Reasons for Serum-Free Media',
          caseStudy: { intro: 'Imagine you are a process development scientist at a biotech company in Pune producing a recombinant monoclonal antibody in CHO cells for clinical trials.',
            decisions: [{ prompt: 'List three distinct categories of biomolecules provided by fetal bovine serum that are critical for animal cell culture, and give one.', options: [
                { text: 'Correct answer: (1) Growth factors', outcome: 'Correct answer: (1) Growth factors — e.g., FGF, EGF, IGF, PDGF, TGF-β; (2) Binding/transport.' },
                { text: 'nutrients like amino acids and glucose', outcome: 'Not quite — Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing.', reveals: 'students-often-equate-serum-free' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_006', title: 'Anchorage Dependence and Contact Inhibition',
          caseStudy: { intro: 'Imagine you are seeding fibroblasts from a mouse embryo into a T-25 flask with serum-containing medium.',
            decisions: [{ prompt: 'Define anchorage dependence and name one cell type that exhibits it and one that does not.', options: [
                { text: 'Anchorage dependence is the requirement for cells to adhere to a solid substrate via', outcome: 'Anchorage dependence is the requirement for cells to adhere to a solid substrate via ECM-integrin.' },
                { text: 'all animal cells are anchorage-dependent', outcome: 'Not quite — Students often think "contact inhibition" means cells physically cannot divide because there is.', reveals: 'contact-inhibition-means-cells-physically' },
                { text: 'contact inhibition', outcome: 'Not quite — Students often think "contact inhibition" means cells physically cannot divide because there is.', reveals: 'contact-inhibition-means-cells-physically' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Animal Cell Culture · Part 1/2', spots: [
            { id: 's1', label: 'Primary Culture vs Established Cell Lines', prompt: 'Which idea is this? — Primary cell culture is the initial heterogeneous population of cells isolated directly.', answer: 'Primary Culture vs Established Cell Lines', options: ['Primary Culture vs Established Cell Lines', 'Types of Cell Lines Finite and Continuous Immortalized', 'Culture Media Defined Complex and Serum-Free Formulations', 'Serum in Media Role and Reasons for Serum-Free Media'] },
            { id: 's2', label: 'Types of Cell Lines Finite and Continuous Immortalized', prompt: 'Which idea is this? — Finite cell lines are cell populations derived from normal tissues that undergo a limited.', answer: 'Types of Cell Lines Finite and Continuous Immortalized', options: ['Types of Cell Lines Finite and Continuous Immortalized', 'Primary Culture vs Established Cell Lines', 'Culture Media Defined Complex and Serum-Free Formulations', 'Serum in Media Role and Reasons for Serum-Free Media'] },
            { id: 's3', label: 'Culture Media Defined Complex and Serum-Free Formulations', prompt: 'Which idea is this? — Culture media for animal cell culture are artificially prepared nutrient solutions that.', answer: 'Culture Media Defined Complex and Serum-Free Formulations', options: ['Culture Media Defined Complex and Serum-Free Formulations', 'Primary Culture vs Established Cell Lines', 'Types of Cell Lines Finite and Continuous Immortalized', 'Serum in Media Role and Reasons for Serum-Free Media'] },
            { id: 's4', label: 'Serum in Media Role and Reasons for Serum-Free Media', prompt: 'Which idea is this? — Serum is the liquid fraction of clotted blood that provides a complex mixture of growth.', answer: 'Serum in Media Role and Reasons for Serum-Free Media', options: ['Serum in Media Role and Reasons for Serum-Free Media', 'Primary Culture vs Established Cell Lines', 'Types of Cell Lines Finite and Continuous Immortalized', 'Culture Media Defined Complex and Serum-Free Formulations'] },
            { id: 's5', label: 'Anchorage Dependence and Contact Inhibition', prompt: 'Which idea is this? — Anchorage dependence is the requirement of most normal animal cells to attach to a solid.', answer: 'Anchorage Dependence and Contact Inhibition', options: ['Anchorage Dependence and Contact Inhibition', 'Primary Culture vs Established Cell Lines', 'Types of Cell Lines Finite and Continuous Immortalized', 'Culture Media Defined Complex and Serum-Free Formulations'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a pharma-lab internship, a student watches a liver-cell line clear a new drug in a toxicity screen. She proposes the company skip animal studies entirely: \'it\'s the same cells — the dish tells us everything.\'',
            decisions: [{ prompt: 'Can cell-culture data alone clear the drug?', options: [
                { text: 'No — culture gives controlled, reproducible screening on a homogeneous population, but it can\'t reproduce whole-body pharmacokinetics, immune responses or inter-organ metabolism, so regulators still need in vivo data.', outcome: 'Cell culture is a reductionist model, not a replica: great for ranking compounds early, blind to effects that need a whole organism.' },
                { text: 'Yes — the same cells behave identically in a flask as in the organism, so a clean screen means a safe drug.', outcome: 'In vitro cells lose systemic regulation — hormones, circulation, immune cells — and can miss a drug that\'s only toxic after the body metabolises it.', reveals: 'in-vitro-equals-in-vivo' },
                { text: 'No — cultured cells are too artificial to be useful at all; go straight to animal testing.', outcome: 'That throws away real advantages: no ethical clearance, reproducible dose-response curves and scalable screening make culture the right first filter.', reveals: 'cell-culture-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now weigh realism against reproducibility — the core trade-off of all biomedical research. Culture types are crisp board content and the daily decision of every pharma research lab.',
            decisions: [{ prompt: 'What comes next? Animal Cell Culture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Animal Cell Culture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_001', difficulty: 'standard',
          question: 'Animal cell culture is the in vitro maintenance and proliferation of animal.',
          hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_12_011 (Cell Culture.',
          misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave.',
          parts: [
                { id: 'a', prompt: 'Compare the “controlled physico-chemical environment” advantage of animal cell culture with the “may not be a holistic representation of in vivo.', answer: 'In vitro, hepatocytes can be exposed to a drug at precise concentrations without',
                  options: ['In vitro, hepatocytes can be exposed to a drug at precise concentrations without', 'cell culture is always better for toxicity', 'the same cells'],
                  hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_12_011 (Cell Culture: Animal and.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish.' }
          ],
            remediations: { 'because-animal-cell-culture-uses': { steps: ['If a student exhibits this misconception: (1) Have them list five physiological factors present in a living animal but.', '(2) Assign a 5-minute writing exercise: “Describe one drug effect that would be missed in cell culture because.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Because animal cell culture avoids ethical clearance, it should completely replace animal testing in drug development.” Use at least.', answer: 'The statement overgeneralizes',
                  options: ['The statement overgeneralizes', 'the same cells'],
                  hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_12_011 (Cell Culture: Animal and.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish.' },
                { id: 'b', prompt: 'Design a 5-event timeline (with years) that captures the evolution from “cells survive briefly” to “industrial-scale biopharmaceutical production”.', answer: 'Example timeline: 1907 Harrison',
                  options: ['Example timeline: 1907 Harrison', 'the same cells'],
                  hint: 'If stuck, revisit Class 11 Biotechnology node c11_biotech_cbse_12_011 (Cell Culture: Animal and.',
                  misconception: 'Students often believe that because animal cell culture uses “the same cells” as in the body, the cells behave identically in a dish.' }
          ],
            remediations: { 'because-animal-cell-culture-uses': { steps: ['If a student exhibits this misconception: (1) Have them list five physiological factors present in a living animal but.', '(2) Assign a 5-minute writing exercise: “Describe one drug effect that would be missed in cell culture because.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_002', difficulty: 'standard',
          question: 'Primary cell culture is the initial heterogeneous population of cells isolated.',
          hint: 'Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) for dissociation methods and.',
          misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100%.',
          parts: [
                { id: 'a', prompt: 'A researcher isolates cells from a mouse liver using collagenase digestion and cultures them for the first time.', answer: 'This is a primary cell culture',
                  options: ['This is a primary cell culture', 'established cell line', 'clonal population', 'primary culture'],
                  hint: 'Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) for dissociation methods and.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' },
                { id: 'b', prompt: 'You need to study the effect of a cytokine on the differentiation of human osteoblasts.', answer: 'studying physiological differentiation markers, and (',
                  options: ['studying physiological differentiation markers, and (', 'primary culture', 'primary hepatocytes = 100% hepatocytes', '"primary culture" means a pure population of one cell type (e'],
                  hint: 'Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) for dissociation methods and.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' },
                { id: 'c', prompt: 'A lab reports that their "primary neuronal culture" from rat cortex has been passaged 5 times over 2 months and shows uniform morphology.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'primary culture', 'primary hepatocytes = 100% hepatocytes', '"primary culture" means a pure population of one cell type (e'],
                  hint: 'Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) for dissociation methods and.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' }
          ],
            remediations: { 'primary-culture-means-a-pure': { steps: ['If the student conflates primary culture with pure cell type: (1) Show a phase-contrast image of primary rat liver.', '(2) Have them calculate the theoretical purity after one passage if hepatocytes divide every 24h but contaminating.', '(3) Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) to reinforce that enzymatic dissociation releases all.', 'Re-diagnostic: Ask them to explain why primary keratinocyte cultures require feeder layers or selective media.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_003', difficulty: 'standard',
          question: 'Finite cell lines are cell populations derived from normal tissues that undergo.',
          hint: 'If stuck, review the Hayflick limit and the role of telomeres in cellular aging (Class 11.',
          misconception: 'Students often think "continuous cell line" means the cells are cancer cells from a patient, while "finite cell line".',
          parts: [
                { id: 'a', prompt: 'A student claims: "HeLa cells are a finite cell line because they were derived from a human cervical tumor." Explain why this statement is incorrect.', answer: 'HeLa cells are a continuous (immortalized) cell line',
                  options: ['HeLa cells are a continuous (immortalized) cell line', 'continuous cell line', 'finite cell line'],
                  hint: 'If stuck, review the Hayflick limit and the role of telomeres in cellular aging (Class 11 Biology.',
                  misconception: 'Students often think "continuous cell line" means the cells are cancer cells from a patient, while "finite cell line" means normal cells.' }
          ],
            remediations: { 'continuous-cell-line-means-the': { steps: ['If the student cannot differentiate finite vs.', 'continuous lines, first revisit **c12_biotech_cbse_08_002** (Primary Culture vs Established Cell Lines) to reinforce.', 'Then review **c11_biotech_cbse_05_008** (Apoptosis) and **c11_biotech_cbse_05_010** (Regulation of Cell Cycle: Cyclins.', 'Finally, re-attempt Diagnostic Question 3 with a side-by-side comparison table.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_004', difficulty: 'standard',
          question: 'Culture media for animal cell culture are artificially prepared nutrient.',
          hint: 'Revisit c11_biotech_cbse_03_010 (minerals/vitamins roles), c11_chem_cbse_07_013 (buffer.',
          misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'A researcher is culturing primary human fibroblasts for a wound-healing study. She uses DMEM supplemented with 10% fetal bovine serum (FBS).', answer: 'Correct answer: Synthetic medium, serum-containing sub-category',
                  options: ['Correct answer: Synthetic medium, serum-containing sub-category', 'natural medium because serum is natural', 'basal medium with supplements such as hormones, growth factors, serum', 'Serum-free media are chemically defined'],
                  hint: 'Revisit c11_biotech_cbse_03_010 (minerals/vitamins roles), c11_chem_cbse_07_013 (buffer.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' },
                { id: 'b', prompt: 'Two media formulations are compared: Medium A = RPMI-1640 + 10% FBS + 1% penicillin-streptomycin; Medium B = Chemically defined, protein-free, serum-free.', answer: 'Correct evaluation: Partially correct',
                  options: ['Correct evaluation: Partially correct', 'Serum-free media are chemically defined'],
                  hint: 'Revisit c11_biotech_cbse_03_010 (minerals/vitamins roles), c11_chem_cbse_07_013 (buffer.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' },
                { id: 'c', prompt: 'Compare the osmolality contribution of glucose vs inorganic salts in a typical commercial medium (e.g., DMEM: 4.5 g/L glucose, ~6.8 g/L NaCl).', answer: 'Correct calculation: Glucose = 4.5 g/L ÷ 180 g/mol = 25 mmol/L = 25 mOsmol/L',
                  options: ['Correct calculation: Glucose = 4.5 g/L ÷ 180 g/mol = 25 mmol/L = 25 mOsmol/L', 'Serum-free media are chemically defined'],
                  hint: 'Revisit c11_biotech_cbse_03_010 (minerals/vitamins roles), c11_chem_cbse_07_013 (buffer.',
                  misconception: 'Students conflate "serum-free" with "chemically defined" and "protein-free" — treating them as synonyms.' }
          ],
            remediations: { 'students-conflate-serum-free-with': { steps: ['Have the student draw a Venn diagram with three circles: Serum-Free, Chemically Defined, Protein-Free.', 'Ask them to write the NCERT definition for each from Box 3 verbatim, then paraphrase in their own words.', 'Give a case: "You need a medium for a clinical-grade mAb process requiring EMA/USP <1043> compliance — which region.', 'Re-diagnose with a new MCQ: "Which medium is chemically defined but NOT protein-free?" Options: A) DMEM + 10% FBS, B).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_005', difficulty: 'standard',
          question: 'Serum is the liquid fraction of clotted blood that provides a complex mixture.',
          hint: 'Revisit c12_biotech_cbse_08_004 (Culture Media types) and create a comparison table.',
          misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media.',
          parts: [
                { id: 'a', prompt: 'List three distinct categories of biomolecules provided by fetal bovine serum that are critical for animal cell culture, and give one specific example for each.', answer: 'Correct answer: (1) Growth factors',
                  options: ['Correct answer: (1) Growth factors', 'nutrients like amino acids and glucose'],
                  hint: 'Revisit c12_biotech_cbse_08_004 (Culture Media types) and create a comparison table: Basal Medium.',
                  misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media frequently contain bovine.' },
                { id: 'b', prompt: 'Explain why serum is described as an "undefined" supplement and how this creates two specific problems for pharmaceutical manufacturing under Good.', answer: 'Correct answer: Serum is undefined',
                  options: ['Correct answer: Serum is undefined', 'ethical concerns'],
                  hint: 'Revisit c12_biotech_cbse_08_004 (Culture Media types) and create a comparison table: Basal Medium.',
                  misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media frequently contain bovine.' },
                { id: 'c', prompt: 'A researcher switches a fibroblast cell line from 10% FBS to a serum-free medium supplemented only with insulin, transferrin, and selenium (ITS).', answer: 'Correct answer: Missing factors: (1) Adhesion factors (fibronectin, vitronectin)',
                  options: ['Correct answer: Missing factors: (1) Adhesion factors (fibronectin, vitronectin)', 'add more amino acids'],
                  hint: 'Revisit c12_biotech_cbse_08_004 (Culture Media types) and create a comparison table: Basal Medium.',
                  misconception: 'Students often equate "serum-free" with "protein-free" or "chemically defined", not realizing serum-free media frequently contain bovine.' }
          ],
            remediations: { 'students-often-equate-serum-free': { steps: ['If the student cannot distinguish serum functions from basal medium components: 1) Revisit c12_biotech_cbse_08_004.', '2) Review c11_bio_cbse_09_002 (Proteins) and c11_bio_cbse_19_007 (Hormone action) to connect growth factor signaling.', '3) Re-attempt Diagnostic Question 1 with a two-column table: "Basal medium provides..." vs.', '"Serum uniquely provides...".'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_006', difficulty: 'standard',
          question: 'Anchorage dependence is the requirement of most normal animal cells to attach.',
          hint: 'Revisit c11_biotech_cbse_02_011 (cytoskeleton/adhesion) and c11_biotech_cbse_05_010.',
          misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive.',
          parts: [
                { id: 'a', prompt: 'A student observes that a primary fibroblast culture stops growing when the flask bottom is fully covered, but a HeLa culture continues to pile up into.', answer: 'Normal fibroblasts exhibit contact inhibition: cell-cell contact (via cadherins)',
                  options: ['Normal fibroblasts exhibit contact inhibition: cell-cell contact (via cadherins)', 'nutrient depletion', 'space limitation', 'contact inhibition'],
                  hint: 'Revisit c11_biotech_cbse_02_011 (cytoskeleton/adhesion) and c11_biotech_cbse_05_010.',
                  misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive crowding effect.' },
                { id: 'b', prompt: 'You are given a new cell line "X". Design a simple two-step experiment to test whether it is anchorage-dependent and whether it shows contact inhibition.', answer: 'Step 1 (anchorage): Seed cells in parallel on (a) tissue-culture treated plastic',
                  options: ['Step 1 (anchorage): Seed cells in parallel on (a) tissue-culture treated plastic', 'contact inhibition', 'adding more serum overcomes contact inhibition'],
                  hint: 'Revisit c11_biotech_cbse_02_011 (cytoskeleton/adhesion) and c11_biotech_cbse_05_010.',
                  misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive crowding effect.' },
                { id: 'c', prompt: 'Compare the roles of serum and the culture vessel surface in supporting anchorage-dependent growth.', answer: 'Serum provides adhesion factors (fibronectin, vitronectin) that adsorb onto the',
                  options: ['Serum provides adhesion factors (fibronectin, vitronectin) that adsorb onto the', 'serum contains nutrients so cells grow anywhere', 'contact inhibition', 'adding more serum overcomes contact inhibition'],
                  hint: 'Revisit c11_biotech_cbse_02_011 (cytoskeleton/adhesion) and c11_biotech_cbse_05_010.',
                  misconception: 'Students often think "contact inhibition" means cells physically cannot divide because there is no space — a passive crowding effect.' }
          ],
            remediations: { 'contact-inhibition-means-cells-physically': { steps: ['If a student confuses contact inhibition with nutrient depletion: (1) Revisit c11_biotech_cbse_05_010 (Cyclins/CDKs).', '(2) Watch a time-lapse video of fibroblasts reaching confluence — they stop dividing abruptly at monolayer completion.', '(3) Do a thought experiment: if you split a confluent culture 1:2 into fresh medium, they resume dividing immediately.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
