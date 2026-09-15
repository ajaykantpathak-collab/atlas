import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch08_p1: SimDef = {
    id: 'v3_c11_biotech_ch08_p1',
    title: 'Chromosomal Abnormalities and Genetic Disorders · Part 1/2',
    subtitle: 'Read karyotypes; distinguish aneuploidy, polyploidy and structural aberrations.',
    classLevel: 11, subject: 'biotechnology', topic: 'Chromosomal Abnormalities and Genetic Disorders · Part 1/2',
    chapters: ['c11_biotech_ch08'],
    nodeIds: ['c11_biotech_cbse_08_001', 'c11_biotech_cbse_08_002', 'c11_biotech_cbse_08_003', 'c11_biotech_cbse_08_004', 'c11_biotech_cbse_08_005', 'c11_biotech_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cytogeneticist reading karyotypes in a diagnostics lab', intro: 'Three cases, three unusual karyotypes — count, compare, diagnose.', goal: 'Identify numerical and structural chromosomal abnormalities and link them to classic syndromes.' },
    discovery: {
        question: 'A child has an extra copy of chromosome 21 — a whole chromosome, not a broken gene. Yet the effects reach every organ system. Why does one extra chromosome cause a syndrome rather than one symptom?',
        options: ['A chromosome carries hundreds of genes, so a triple dose unbalances the entire network', 'Chromosome 21 contains the body\'s master control gene', 'Extra chromosomes only affect appearance, not organs', 'The syndrome comes from the mother\'s diet during pregnancy'],
        answer: 'A chromosome carries hundreds of genes, so a triple dose unbalances the entire network',
        hook: 'Genes work in dosage — an extra chromosome is like an orchestra handed a third copy of one section\'s sheet music.',
    },
    teaching: [
        { title: 'Chromosome Structure: Centromere, Telomere and Types', text: 'A chromosome is a condensed, thread-like structure of DNA and histone proteins that becomes visible during cell division; its functional architecture comprises a constricted **centromere** (primary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_08_001', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Karyotype virtual patients and classify abnormalities by chromosome number versus structure.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_08_001', title: 'Chromosome Structure: Centromere, Telomere and Types',
          scaffold: { problem: 'A cytogeneticist measures a metaphase chromosome from a lymphocyte culture: total length = 7.2 µm, short arm = 3.4 µm.',
            steps: [
            { text: 'Identify given values — total length L = 7.2 µm, short arm p = 3.4 µm.' },
            { text: 'Recall the centromere index formula: CI = (p / L) × 100.' },
            { text: 'Substitute values: CI = (3.4 / 7.2) × 100 = 47.22%.' },
            { text: 'Apply classification thresholds: CI ≈ 50% → metacentric (range 37–50% for practical human karyotyping).' },
            { text: 'Map morphology to Denver system groups: Metacentric chromosomes in humans belong to Groups A (1–3), D (13–15),.' },
            { text: 'Interpret — this chromosome could be any of the large metacentrics (e.g., chr 1, 2, 3, 13, 14, 15, 16, 17, 18, 19, 20).', faded: true, blankAnswer: 'CI = 47.2% → Metacentric → Groups A, D, E, F.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_002', title: 'Karyotyping: Preparation and Analysis',
          caseStudy: { intro: 'Imagine a genetic counselor receives a referral: "Couple with three first-trimester miscarriages.',
            decisions: [{ prompt: 'What is the standard banding technique used for routine clinical karyotyping, and what specific chromosomal feature does it exploit.', options: [
                { text: 'GTG-banding (Giemsa-Trypsin-Giemsa) is the standard', outcome: 'GTG-banding (Giemsa-Trypsin-Giemsa) is the standard. It exploits differential chromatin.' },
                { text: 'Q-banding uses quinacrine fluorescence', outcome: 'Not quite — Students believe karyotyping detects all genetic disorders, including single-gene diseases like.', reveals: 'karyotyping-detects-all-genetic-disorders' },
                { text: 'bands correspond to genes', outcome: 'Not quite — Students believe karyotyping detects all genetic disorders, including single-gene diseases like.', reveals: 'karyotyping-detects-all-genetic-disorders' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_003', title: 'Numerical Chromosomal Abnormalities: Aneuploidy and Polyploidy',
          caseStudy: { intro: 'Imagine a farmer notices that his wheat plants have unusually large grains and vigorous growth compared to wild varieties.',
            decisions: [{ prompt: 'A human somatic cell normally contains 46 chromosomes. If non-disjunction of chromosome 21 occurs during meiosis I in the mother, what.', options: [
                { text: 'The egg will have 24 chromosomes: two copies of chromosome 21 (n+1 = 24) instead of one', outcome: 'The egg will have 24 chromosomes: two copies of chromosome 21 (n+1 = 24) instead of one.' },
                { text: '23 chromosomes with an extra chromosome 21', outcome: 'Not quite — Students frequently confuse the chromosome number notation: they write "2n+1=47" for Down syndrome.', reveals: 'students-frequently-confuse-the-chromosome' },
                { text: '22 chromosomes', outcome: 'Not quite — Students frequently confuse the chromosome number notation: they write "2n+1=47" for Down syndrome.', reveals: 'students-frequently-confuse-the-chromosome' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_004', title: 'Structural Chromosomal Abnormalities: Deletion, Duplication, Inversion',
          caseStudy: { intro: 'Imagine a geneticist examining a child with developmental delay and a distinctive facial appearance.',
            decisions: [{ prompt: 'Define deletion, duplication, and inversion in one sentence each, stating the change in chromosome length and gene order for each.', options: [
                { text: 'Deletion: loss of a chromosome segment → shorter chromosome, gene order unchanged but', outcome: 'Deletion: loss of a chromosome segment → shorter chromosome, gene order unchanged but genes.' },
                { text: 'no DNA is lost', outcome: 'Not quite — Students often think inversion is phenotypically silent because "no DNA is lost." They overlook two.', reveals: 'inversion-is-phenotypically-silent-because' },
                { text: 'inversion shortens the chromosome', outcome: 'Not quite — Students often think inversion is phenotypically silent because "no DNA is lost." They overlook two.', reveals: 'inversion-is-phenotypically-silent-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_005', title: 'Translocation: Reciprocal and Robertsonian',
          caseStudy: { intro: 'Imagine a patient with recurrent miscarriages whose karyotype shows 45 chromosomes instead of 46, yet they appear phenotypically normal.',
            decisions: [{ prompt: 'A student writes the karyotype of a Robertsonian translocation carrier as "46,XX,rob(14;21)".', options: [
                { text: 'The correct karyotype is **45,XX,der(14;21)(q10;q10)** or **45,XX,rob(14;21)(q10;q10)**', outcome: 'The correct karyotype is **45,XX,der(14;21)(q10;q10)** or **45,XX,rob(14;21)(q10;q10)**.' },
                { text: 'deletes', outcome: 'Not quite — Students believe Robertsonian translocation "deletes" the short arms (p-arms) of acrocentric.', reveals: 'robertsonian-translocation-deletes-the-short' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_006', title: 'Down Syndrome: Trisomy 21',
          caseStudy: { intro: 'Imagine you are a genetic counselor meeting a 38-year-old expectant mother whose ultrasound shows a thickened nuchal fold.',
            decisions: [{ prompt: 'What is the karyotype notation for a male with Down syndrome caused by free trisomy 21?', options: [
                { text: 'The correct karyotype is 47,XY,+21', outcome: 'The correct karyotype is 47,XY,+21. A wrong answer like 46,XY,+21 reveals the student thinks the.' },
                { text: 'inherited from parents', outcome: 'Not quite — Students believe Down syndrome is "inherited from parents" like a Mendelian trait.', reveals: 'down-syndrome-is-inherited-from' },
                { text: 'Down syndrome is "inherited from parents" like a Mendelian trait', outcome: 'Not quite — Students believe Down syndrome is "inherited from parents" like a Mendelian trait.', reveals: 'down-syndrome-is-inherited-from' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Chromosomal Abnormalities and Genetic Disorders · Part 1/2', spots: [
            { id: 's1', label: 'Chromosome Structure Centromere Telomere and Types', prompt: 'Which idea is this? — A chromosome is a condensed, thread-like structure of DNA and histone proteins that.', answer: 'Chromosome Structure Centromere Telomere and Types', options: ['Chromosome Structure Centromere Telomere and Types', 'Karyotyping Preparation and Analysis', 'Translocation Reciprocal and Robertsonian', 'Down Syndrome Trisomy 21'] },
            { id: 's2', label: 'Karyotyping Preparation and Analysis', prompt: 'Which idea is this? — Karyotyping is the standardized laboratory process of arresting dividing cells.', answer: 'Karyotyping Preparation and Analysis', options: ['Karyotyping Preparation and Analysis', 'Chromosome Structure Centromere Telomere and Types', 'Translocation Reciprocal and Robertsonian', 'Down Syndrome Trisomy 21'] },
            { id: 's3', label: 'Translocation Reciprocal and Robertsonian', prompt: 'Which idea is this? — Translocation is a structural chromosomal abnormality where a segment of one chromosome.', answer: 'Translocation Reciprocal and Robertsonian', options: ['Translocation Reciprocal and Robertsonian', 'Chromosome Structure Centromere Telomere and Types', 'Karyotyping Preparation and Analysis', 'Down Syndrome Trisomy 21'] },
            { id: 's4', label: 'Down Syndrome Trisomy 21', prompt: 'Which idea is this? — Down syndrome (Trisomy 21) is a genetic disorder caused by the presence of an extra copy.', answer: 'Down Syndrome Trisomy 21', options: ['Down Syndrome Trisomy 21', 'Chromosome Structure Centromere Telomere and Types', 'Karyotyping Preparation and Analysis', 'Translocation Reciprocal and Robertsonian'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_001', title: 'A real-world call',
          caseStudy: { intro: 'Prenatal screening can detect chromosomal disorders early. Families get information to prepare — or to make choices. The same technology that helps some families grieve prepares others to never begin.',
            decisions: [{ prompt: 'Does knowing early help or harm?', options: [
                { text: 'It helps — preparation is love', outcome: 'For many families it is — knowing early changes outcomes. The technology itself is neutral; the choice it enables is not.' },
                { text: 'It harms when \'screening\' becomes \'selecting\'', outcome: 'The disability-rights worry: screening normalizes the idea that some lives shouldn\'t start. Both things can be true.' },
                { text: 'It depends entirely on the counselling around it', outcome: 'Most genetic counsellors\' actual position — the test is a tool; the conversation around it decides whether it\'s care or eugenics.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'As a summer helper in a cytogenetics lab, you\'re asked to sort metaphase chromosome images. One chromosome shows a centromere at the very tip with a single visible arm. Your supervisor says: \'Good catch — check whether that\'s a human chromosome at all.\'',
            decisions: [{ prompt: 'What\'s the correct call?', options: [
                { text: 'Flag it as non-human or abnormal — no normal human chromosome is truly telocentric; even the smallest acrocentrics (13, 14, 15, 21, 22, Y) keep a tiny short arm with stalk and satellite. Measure the centromere index: CI = 0% means telocentric, which doesn\'t occur in a normal human karyotype.', outcome: 'Centromere position is the fixed landmark for classification; human acrocentrics are sub-terminal, never terminal.' },
                { text: 'Classify it as a normal telocentric human chromosome — the smallest chromosomes have their centromeres at the end.', outcome: 'That imports rodent/plant cytogenetics into humans; human chromosomes always retain a short p-arm, however small.', reveals: 'humans-have-telocentrics' },
                { text: 'Classify by total length instead — the shortest chromosome must be chromosome 21.', outcome: 'Length alone doesn\'t fix identity; centromere position (metacentric/submetacentric/acrocentric) and arm ratio are the diagnostic features.', reveals: 'classify-by-total-length' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Chromosomal disorders teach the deepest lesson of genetics: the genome is a dosage system, not a parts list.',
            decisions: [{ prompt: 'What comes next? Chromosomal Abnormalities and Genetic Disorders · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chromosomal Abnormalities and Genetic Disorders · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_001', difficulty: 'standard',
          question: 'A chromosome is a condensed, thread-like structure of DNA and histone proteins.',
          hint: 'Revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on the metaphase.',
          misconception: 'Students believe human chromosomes include telocentric types (centromere at absolute terminus, single arm) because.',
          parts: [
                { id: 'a', prompt: 'What is the centromere index (CI) of a human chromosome whose short arm measures 2.1 µm and long arm measures 5.9 µm, and what morphology class does it belong.', answer: 'CI = (2.1 / (2.1 + 5.9)) × 100 = 26.25% → submetacentric (CI 25–37)',
                  options: ['CI = (2.1 / (2.1 + 5.9)) × 100 = 26.25% → submetacentric (CI 25–37)', 'metacentric', 'acrocentric'],
                  hint: 'Revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on the metaphase chromosome.',
                  misconception: 'Students believe human chromosomes include telocentric types (centromere at absolute terminus, single arm) because textbook diagrams.' },
                { id: 'b', prompt: 'A metaphase chromosome shows a centromere so close to one end that the short arm appears as a mere stalk with a satellite.', answer: 'CI = (0.9 / 6.0) × 100 = 15% → acrocentric (CI < 25%)',
                  options: ['CI = (0.9 / 6.0) × 100 = 15% → acrocentric (CI < 25%)', 'telocentric'],
                  hint: 'Revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on the metaphase chromosome.',
                  misconception: 'Students believe human chromosomes include telocentric types (centromere at absolute terminus, single arm) because textbook diagrams.' }
          ],
            remediations: { 'human-chromosomes-include-telocentric-types': { steps: ['Show the student a high-resolution human karyotype image (e.g., 550-band level) and ask them to locate the short arm.', 'Contrast with a mouse karyotype where chromosomes 19, X, Y are truly telocentric (no short arm).', 'Have them calculate CI for human chr 21 (p ≈ 0.5 µm, q ≈ 5 µm → CI ≈ 9%) and mouse chr 19 (p = 0, q = total → CI = 0%).', 'Explicitly state the rule: "Human acrocentric CI > 0% but < 25%; telocentric CI = 0% — absent in normal human.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_002', difficulty: 'standard',
          question: 'Karyotyping is the standardized laboratory process of arresting dividing cells.',
          hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) focusing on metaphase.',
          misconception: 'Students believe karyotyping detects all genetic disorders, including single-gene diseases like sickle cell anemia.',
          parts: [
                { id: 'a', prompt: 'What is the standard banding technique used for routine clinical karyotyping, and what specific chromosomal feature does it exploit to produce the banding.', answer: 'GTG-banding (Giemsa-Trypsin-Giemsa) is the standard',
                  options: ['GTG-banding (Giemsa-Trypsin-Giemsa) is the standard', 'Q-banding uses quinacrine fluorescence', 'bands correspond to genes', 'Karyotyping can diagnose sickle cell anemia'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) focusing on metaphase chromosome.',
                  misconception: 'Students believe karyotyping detects all genetic disorders, including single-gene diseases like sickle cell anemia or cystic fibrosis.' },
                { id: 'b', prompt: 'A karyogram from a 2-year-old female with developmental delay shows 46 chromosomes. Chromosome 5 has a terminal deletion on the short arm at band p15.2.', answer: '46,XX,del(5)(p15.2)',
                  options: ['46,XX,del(5)(p15.2)', '46,XX,5p-', 'Karyotyping can diagnose sickle cell anemia'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) focusing on metaphase chromosome.',
                  misconception: 'Students believe karyotyping detects all genetic disorders, including single-gene diseases like sickle cell anemia or cystic fibrosis.' }
          ],
            remediations: { 'karyotyping-detects-all-genetic-disorders': { steps: ['Calculate resolution: 3,000 Mb genome ÷ 400 bands = 7.5 Mb/band.', 'Compare to gene size: average human gene = 27 kb (0.027 Mb).', 'Analogy: Karyotype = seeing chapter titles in a 46-chapter book; gene sequencing = reading every word.', 'Practice classification exercise: Given 10 disorders (Down syndrome, sickle cell, Cri-du-chat, Huntington\'s, etc.).'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe karyotyping detects all genetic disorders, including single-gene diseases like sickle cell anemia.',
          parts: [
                { id: 'a', prompt: 'A prenatal karyotype reports 47,XX,+21. The mother is 38 years old. The lab concludes "maternal meiosis I non-disjunction." Evaluate this conclusion.', answer: 'The conclusion is presumptive, not proven',
                  options: ['The conclusion is presumptive, not proven', 'karyotype shows it\'s meiosis I', 'Karyotyping can diagnose sickle cell anemia'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) focusing on metaphase chromosome.',
                  misconception: 'Students believe karyotyping detects all genetic disorders, including single-gene diseases like sickle cell anemia or cystic fibrosis.' },
                { id: 'b', prompt: 'Design a quality-controlled karyotyping workflow for a new diagnostic lab.', answer: 'minimum metaphases to analyze for constitutional vs mosaic detection, (',
                  options: ['minimum metaphases to analyze for constitutional vs mosaic detection, (', 'Karyotyping can diagnose sickle cell anemia'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) focusing on metaphase chromosome.',
                  misconception: 'Students believe karyotyping detects all genetic disorders, including single-gene diseases like sickle cell anemia or cystic fibrosis.' }
          ],
            remediations: { 'karyotyping-detects-all-genetic-disorders': { steps: ['Calculate resolution: 3,000 Mb genome ÷ 400 bands = 7.5 Mb/band.', 'Compare to gene size: average human gene = 27 kb (0.027 Mb).', 'Analogy: Karyotype = seeing chapter titles in a 46-chapter book; gene sequencing = reading every word.', 'Practice classification exercise: Given 10 disorders (Down syndrome, sickle cell, Cri-du-chat, Huntington\'s, etc.).'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_003', difficulty: 'standard',
          question: 'Numerical chromosomal abnormalities are deviations from the normal diploid.',
          hint: 'Review meiosis stages in c9_bio_ch1_12 and c11_biology_ch03_001, focusing on anaphase.',
          misconception: 'Students frequently confuse the chromosome number notation: they write "2n+1=47" for Down syndrome but fail.',
          parts: [
                { id: 'a', prompt: 'A cytogeneticist analyses a skin cell from a male patient and finds 47 chromosomes. The karyotype shows two X chromosomes and one Y chromosome.', answer: 'Karyotype: 47,XXY (Klinefelter syndrome)',
                  options: ['Karyotype: 47,XXY (Klinefelter syndrome)', '47,XYY', '2n+1=47', '46+1=47 chromosomes plus the normal set'],
                  hint: 'Review meiosis stages in c9_bio_ch1_12 and c11_biology_ch03_001, focusing on anaphase I (homologue.',
                  misconception: 'Students frequently confuse the chromosome number notation: they write "2n+1=47" for Down syndrome but fail to understand that 2n=46 is the.' }
          ],
            remediations: { 'students-frequently-confuse-the-chromosome': { steps: ['If a student confuses aneuploidy and polyploidy notation: (1) Have them write out the full karyotype for a normal human.', '(2) Ask: "How many chromosomes total?', 'How many SETS?" (Answer: 46 total, 2 sets).', '(3) For trisomy 21: "Add ONE chromosome 21.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_004', difficulty: 'standard',
          question: 'Structural chromosomal abnormalities are permanent alterations in chromosome.',
          hint: 'If stuck, revisit c11_biotech_cbse_08_001 (chromosome structure) and c9_bio_ch1_12.',
          misconception: 'Students often think inversion is phenotypically silent because "no DNA is lost." They overlook two critical.',
          parts: [
                { id: 'a', prompt: 'A karyotype reveals a chromosome with two identical bands in the same order (e.g., band pattern: p11-p12-p12-p13).', answer: 'The pattern indicates a tandem duplication (p12 repeated)',
                  options: ['The pattern indicates a tandem duplication (p12 repeated)', 'inversion', 'translocation', 'no DNA is lost'],
                  hint: 'If stuck, revisit c11_biotech_cbse_08_001 (chromosome structure) and c9_bio_ch1_12 (meiosis stages.',
                  misconception: 'Students often think inversion is phenotypically silent because "no DNA is lost." They overlook two critical mechanisms: (1) breakpoint.' }
          ],
            remediations: { 'inversion-is-phenotypically-silent-because': { steps: ['If a student insists inversion is harmless, guide them through this 3-step remediation: (1) Draw a linear chromosome.', '(2) Cite the *SOX9* enhancer-adoption example from literature (RCAD syndrome) where inversion 500 kb upstream causes.', '(3) Ask them to predict the phenotype of an inversion that places a proto-oncogene next to a strong immunoglobulin.', 'This forces confrontation with position effect and breakpoint disruption as distinct from dosage change.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_005', difficulty: 'standard',
          question: 'Translocation is a structural chromosomal abnormality where a segment of one.',
          hint: 'Revisit c11_biotech_cbse_08_001 centromere classification and c9_bio_ch1_12 meiosis.',
          misconception: 'Students believe Robertsonian translocation "deletes" the short arms (p-arms) of acrocentric chromosomes, causing.',
          parts: [
                { id: 'a', prompt: 'Explain why a carrier of a balanced reciprocal translocation between chromosomes 8 and 14 [t(8;14)(q24;q32)] is phenotypically normal but has a high risk.', answer: 'The carrier has all genetic material present (balanced)',
                  options: ['The carrier has all genetic material present (balanced)', 'no gene loss', 'deletes'],
                  hint: 'Revisit c11_biotech_cbse_08_001 centromere classification and c9_bio_ch1_12 meiosis stages.',
                  misconception: 'Students believe Robertsonian translocation "deletes" the short arms (p-arms) of acrocentric chromosomes, causing genetic loss.' },
                { id: 'b', prompt: 'A couple has a child with Down syndrome. Karyotyping reveals the child has 46 chromosomes (not 47) but three copies of chromosome 21 material.', answer: 'Mother\'s germ cell has: normal 14, normal 21, and der(14;21)',
                  options: ['Mother\'s germ cell has: normal 14, normal 21, and der(14;21)', 'deletes'],
                  hint: 'Revisit c11_biotech_cbse_08_001 centromere classification and c9_bio_ch1_12 meiosis stages.',
                  misconception: 'Students believe Robertsonian translocation "deletes" the short arms (p-arms) of acrocentric chromosomes, causing genetic loss.' }
          ],
            remediations: { 'robertsonian-translocation-deletes-the-short': { steps: ['Show student a diagram of acrocentric chromosome structure highlighting NORs (nucleolar organizer regions) on p-arms.', 'Explain that humans have ~300-400 rRNA gene copies distributed across 5 acrocentric pairs — losing 1/10th (one p-arm.', 'Contrast with reciprocal translocation where breakpoints can disrupt **unique** genes (e.g., MYC at 8q24).', 'Have student write: "Robertsonian = fusion of redundant regions; Reciprocal = exchange of unique regions." 5.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_006', difficulty: 'standard',
          question: 'Down syndrome (Trisomy 21) is a genetic disorder caused by the presence of.',
          hint: 'Revisit c9_bio_ch1_12 (Meiosis) and c11_biotech_cbse_08_003 (Numerical Abnormalities).',
          misconception: 'Students believe Down syndrome is "inherited from parents" like a Mendelian trait.',
          parts: [
                { id: 'a', prompt: 'What is the karyotype notation for a male with Down syndrome caused by free trisomy 21?', answer: 'The correct karyotype is 47,XY,+21',
                  options: ['The correct karyotype is 47,XY,+21', 'inherited from parents', 'Down syndrome is "inherited from parents" like a Mendelian trait'],
                  hint: 'Revisit c9_bio_ch1_12 (Meiosis) and c11_biotech_cbse_08_003 (Numerical Abnormalities) to solidify.',
                  misconception: 'Students believe Down syndrome is "inherited from parents" like a Mendelian trait.' },
                { id: 'b', prompt: 'Explain why maternal age over 35 years is a risk factor for Down syndrome, but paternal age is not significantly associated.', answer: 'Oocytes arrest in prophase I from fetal life until ovulation',
                  options: ['Oocytes arrest in prophase I from fetal life until ovulation', 'older eggs have more mutations', 'inherited from parents', 'Down syndrome is "inherited from parents" like a Mendelian trait'],
                  hint: 'Revisit c9_bio_ch1_12 (Meiosis) and c11_biotech_cbse_08_003 (Numerical Abnormalities) to solidify.',
                  misconception: 'Students believe Down syndrome is "inherited from parents" like a Mendelian trait.' },
                { id: 'c', prompt: 'A couple has a child with Down syndrome. The mother is 28 years old.', answer: 'Mother\'s karyotype: 45,XX,rob(14;21)(q10;q10)',
                  options: ['Mother\'s karyotype: 45,XX,rob(14;21)(q10;q10)', '1 in 800', 'inherited from parents', 'Down syndrome is "inherited from parents" like a Mendelian trait'],
                  hint: 'Revisit c9_bio_ch1_12 (Meiosis) and c11_biotech_cbse_08_003 (Numerical Abnormalities) to solidify.',
                  misconception: 'Students believe Down syndrome is "inherited from parents" like a Mendelian trait.' }
          ],
            remediations: { 'down-syndrome-is-inherited-from': { steps: ['Ask the student to draw meiosis I and II for chromosome 21 in a 40-year-old oocyte, labeling where non-disjunction.', 'Have them write the karyotype of the resulting gamete and the zygote after fertilization with a normal sperm.', 'Contrast this with a pedigree of an autosomal dominant disorder (e.g., Huntington\'s) to highlight absence of vertical.', 'Give a case: "Mother 45,XX,rob(14;21); father normal. List possible gametes from mother and zygotes." This forces.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
