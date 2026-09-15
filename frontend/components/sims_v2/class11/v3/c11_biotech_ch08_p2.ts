import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch08_p2: SimDef = {
    id: 'v3_c11_biotech_ch08_p2',
    title: 'Chromosomal Abnormalities and Genetic Disorders · Part 2/2',
    subtitle: 'Read karyotypes; distinguish aneuploidy, polyploidy and structural aberrations.',
    classLevel: 11, subject: 'biotechnology', topic: 'Chromosomal Abnormalities and Genetic Disorders · Part 2/2',
    chapters: ['c11_biotech_ch08'],
    nodeIds: ['c11_biotech_cbse_08_007', 'c11_biotech_cbse_08_008', 'c11_biotech_cbse_08_009', 'c11_biotech_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cytogeneticist reading karyotypes in a diagnostics lab', intro: 'Three cases, three unusual karyotypes — count, compare, diagnose.', goal: 'Identify numerical and structural chromosomal abnormalities and link them to classic syndromes.' },
    discovery: {
        question: 'A child has an extra copy of chromosome 21 — a whole chromosome, not a broken gene. Yet the effects reach every organ system. Why does one extra chromosome cause a syndrome rather than one symptom?',
        options: ['A chromosome carries hundreds of genes, so a triple dose unbalances the entire network', 'Chromosome 21 contains the body\'s master control gene', 'Extra chromosomes only affect appearance, not organs', 'The syndrome comes from the mother\'s diet during pregnancy'],
        answer: 'A chromosome carries hundreds of genes, so a triple dose unbalances the entire network',
        hook: 'Genes work in dosage — an extra chromosome is like an orchestra handed a third copy of one section\'s sheet music.',
    },
    teaching: [
        { title: 'Turner Syndrome and Klinefelter Syndrome', text: 'Turner syndrome is a monosomy X condition (45,X) in females resulting from the absence of one X chromosome, while Klinefelter syndrome is a trisomy condition (47,XXY) in males caused by an extra.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_08_007', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Karyotype virtual patients and classify abnormalities by chromosome number versus structure.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_007', title: 'Turner Syndrome and Klinefelter Syndrome',
          caseStudy: { intro: 'Imagine a 14-year-old girl who hasn\'t started menstruation and has a webbed neck, and a tall teenage boy with reduced facial hair and enlarged breasts – both.',
            decisions: [{ prompt: 'Write the standard karyotype notation for a female with Turner syndrome and a male with Klinefelter syndrome.', options: [
                { text: 'Turner syndrome: 45,X', outcome: 'Turner syndrome: 45,X; Klinefelter syndrome: 47,XXY. A wrong answer (e.g., 45,XO or 47,XYY) reveals.' },
                { text: 'sex chromosomes determine sex', outcome: 'Not quite — Students often believe Turner syndrome is inherited from the mother because the missing X.', reveals: 'turner-syndrome-is-inherited-from' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_008', title: 'Single Gene Disorders: Autosomal Recessive and Dominant',
          caseStudy: { intro: 'Imagine a young couple in Maharashtra consulting a genetic counsellor because the husband\'s sister has sickle cell anaemia, but neither parent shows symptoms.',
            decisions: [{ prompt: 'Define autosomal recessive disorder and state the genotype of an affected individual, a carrier, and an unaffected non-carrier using allele.', options: [
                { text: 'Autosomal recessive disorder: a condition expressed only in homozygous recessive (aa)', outcome: 'Autosomal recessive disorder: a condition expressed only in homozygous recessive (aa) individuals.' },
                { text: 'carrier shows mild symptoms', outcome: 'Not quite — Students believe "dominant means more common in population" and "recessive means rare." They.', reveals: 'dominant-means-more-common-in' },
                { text: 'affected can be heterozygous', outcome: 'Not quite — Students believe "dominant means more common in population" and "recessive means rare." They.', reveals: 'dominant-means-more-common-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_009', title: 'X-linked Disorders: Haemophilia and Colour Blindness',
          caseStudy: { intro: 'Imagine a family where a grandfather has haemophilia, his daughter is phenotypically normal, but her son (the grandson) also has haemophilia.',
            decisions: [{ prompt: 'State the chromosomal basis for why X-linked recessive disorders predominantly affect males, using the terms \'hemizygous\' and.', options: [
                { text: 'Males (XY) are hemizygous for X-linked genes', outcome: 'Males (XY) are hemizygous for X-linked genes because they possess only one X chromosome; a single.' },
                { text: 'males have two X chromosomes', outcome: 'Not quite — Students often believe that a carrier female (heterozygous for X-linked recessive) can never show.', reveals: 'a-carrier-female-heterozygous-for' },
                { text: 'females are hemizygous', outcome: 'Not quite — Students often believe that a carrier female (heterozygous for X-linked recessive) can never show.', reveals: 'a-carrier-female-heterozygous-for' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_010', title: 'Sickle Cell Anaemia and Cystic Fibrosis: Molecular Basis',
          caseStudy: { intro: 'Imagine a Class 11 student from Chhattisgarh\'s tribal belt where sickle cell trait affects 1 in 4 individuals — why does this "harmful" mutation persist.',
            decisions: [{ prompt: 'What is the exact nucleotide change and resulting amino acid substitution in the β-globin gene that causes sickle cell anaemia?', options: [
                { text: 'The mutation is a single base substitution A→T at the sixth codon of the HBB gene (GAG →', outcome: 'The mutation is a single base substitution A→T at the sixth codon of the HBB gene (GAG → GTG).' },
                { text: 'mutation in alpha globin', outcome: 'Not quite — Students believe sickle cell anaemia is caused by the sickle *shape* of red blood cells (thinking.', reveals: 'sickle-cell-anaemia-is-caused' },
                { text: 'deletion of bases', outcome: 'Not quite — Students believe sickle cell anaemia is caused by the sickle *shape* of red blood cells (thinking.', reveals: 'sickle-cell-anaemia-is-caused' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Chromosomal Abnormalities and Genetic Disorders · Part 2/2', spots: [
            { id: 's1', label: 'Turner Syndrome and Klinefelter Syndrome', prompt: 'Which idea is this? — Turner syndrome is a monosomy X condition (45,X) in females resulting from the absence.', answer: 'Turner Syndrome and Klinefelter Syndrome', options: ['Turner Syndrome and Klinefelter Syndrome', 'Single Gene Disorders Autosomal Recessive and Dominant', 'X-linked Disorders Haemophilia and Colour Blindness', 'Sickle Cell Anaemia and Cystic Fibrosis Molecular Basis'] },
            { id: 's2', label: 'Single Gene Disorders Autosomal Recessive and Dominant', prompt: 'Which idea is this? — Autosomal recessive disorders require homozygous recessive genotype (two mutant alleles).', answer: 'Single Gene Disorders Autosomal Recessive and Dominant', options: ['Single Gene Disorders Autosomal Recessive and Dominant', 'Turner Syndrome and Klinefelter Syndrome', 'X-linked Disorders Haemophilia and Colour Blindness', 'Sickle Cell Anaemia and Cystic Fibrosis Molecular Basis'] },
            { id: 's3', label: 'X-linked Disorders Haemophilia and Colour Blindness', prompt: 'Which idea is this? — X-linked recessive disorders are genetic conditions caused by mutations in genes located.', answer: 'X-linked Disorders Haemophilia and Colour Blindness', options: ['X-linked Disorders Haemophilia and Colour Blindness', 'Turner Syndrome and Klinefelter Syndrome', 'Single Gene Disorders Autosomal Recessive and Dominant', 'Sickle Cell Anaemia and Cystic Fibrosis Molecular Basis'] },
            { id: 's4', label: 'Sickle Cell Anaemia and Cystic Fibrosis Molecular Basis', prompt: 'Which idea is this? — Sickle cell anaemia is an autosomal recessive monogenic disorder caused by a single.', answer: 'Sickle Cell Anaemia and Cystic Fibrosis Molecular Basis', options: ['Sickle Cell Anaemia and Cystic Fibrosis Molecular Basis', 'Turner Syndrome and Klinefelter Syndrome', 'Single Gene Disorders Autosomal Recessive and Dominant', 'X-linked Disorders Haemophilia and Colour Blindness'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_007', title: 'A real-world call',
          caseStudy: { intro: 'Prenatal screening can detect chromosomal disorders early. Families get information to prepare — or to make choices. The same technology that helps some families grieve prepares others to never begin.',
            decisions: [{ prompt: 'Does knowing early help or harm?', options: [
                { text: 'It helps — preparation is love', outcome: 'For many families it is — knowing early changes outcomes. The technology itself is neutral; the choice it enables is not.' },
                { text: 'It harms when \'screening\' becomes \'selecting\'', outcome: 'The disability-rights worry: screening normalizes the idea that some lives shouldn\'t start. Both things can be true.' },
                { text: 'It depends entirely on the counselling around it', outcome: 'Most genetic counsellors\' actual position — the test is a tool; the conversation around it decides whether it\'s care or eugenics.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'As a summer helper in a cytogenetics lab, you\'re asked to sort metaphase chromosome images. One chromosome shows a centromere at the very tip with a single visible arm. Your supervisor says: \'Good catch — check whether that\'s a human chromosome at all.\'',
            decisions: [{ prompt: 'What\'s the correct call?', options: [
                { text: 'Flag it as non-human or abnormal — no normal human chromosome is truly telocentric; even the smallest acrocentrics (13, 14, 15, 21, 22, Y) keep a tiny short arm with stalk and satellite. Measure the centromere index: CI = 0% means telocentric, which doesn\'t occur in a normal human karyotype.', outcome: 'Centromere position is the fixed landmark for classification; human acrocentrics are sub-terminal, never terminal.' },
                { text: 'Classify it as a normal telocentric human chromosome — the smallest chromosomes have their centromeres at the end.', outcome: 'That imports rodent/plant cytogenetics into humans; human chromosomes always retain a short p-arm, however small.', reveals: 'humans-have-telocentrics' },
                { text: 'Classify by total length instead — the shortest chromosome must be chromosome 21.', outcome: 'Length alone doesn\'t fix identity; centromere position (metacentric/submetacentric/acrocentric) and arm ratio are the diagnostic features.', reveals: 'classify-by-total-length' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'Chromosomal disorders teach the deepest lesson of genetics: the genome is a dosage system, not a parts list.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_007', difficulty: 'standard',
          question: 'Turner syndrome is a monosomy X condition (45,X) in females resulting from the.',
          hint: 'Revisit numerical chromosomal abnormalities (aneuploidy) and karyotyping from nodes.',
          misconception: 'Students often believe Turner syndrome is inherited from the mother because the missing X is maternal in origin, and.',
          parts: [
                { id: 'a', prompt: 'Write the standard karyotype notation for a female with Turner syndrome and a male with Klinefelter syndrome.', answer: 'Turner syndrome: 45,X',
                  options: ['Turner syndrome: 45,X', 'sex chromosomes determine sex'],
                  hint: 'Revisit numerical chromosomal abnormalities (aneuploidy) and karyotyping from nodes.',
                  misconception: 'Students often believe Turner syndrome is inherited from the mother because the missing X is maternal in origin, and that Klinefelter.' },
                { id: 'b', prompt: 'Explain why a Barr body test on buccal smear shows zero inactive X chromosomes in Turner syndrome but one in Klinefelter syndrome.', answer: 'Number of inactive X = number of X chromosomes - 1 (if >0)',
                  options: ['Number of inactive X = number of X chromosomes - 1 (if >0)', 'sex chromosomes determine sex', 'Klinefelter has zero Barr bodies', 'only females undergo X-inactivation'],
                  hint: 'Revisit numerical chromosomal abnormalities (aneuploidy) and karyotyping from nodes.',
                  misconception: 'Students often believe Turner syndrome is inherited from the mother because the missing X is maternal in origin, and that Klinefelter.' },
                { id: 'c', prompt: 'A couple has a son diagnosed with Klinefelter syndrome (47,XXY). The father’s karyotype is 46,XY and the mother’s is 46,XX.', answer: 'The extra X must come from the mother',
                  options: ['The extra X must come from the mother', 'sex chromosomes determine sex'],
                  hint: 'Revisit numerical chromosomal abnormalities (aneuploidy) and karyotyping from nodes.',
                  misconception: 'Students often believe Turner syndrome is inherited from the mother because the missing X is maternal in origin, and that Klinefelter.' }
          ],
            remediations: { 'turner-syndrome-is-inherited-from': { steps: ['Re-teach non-disjunction using a diagram of meiosis I vs.', 'II for sex chromosomes, highlighting that the father can produce nullisomic (no sex chromosome) or disomic (XY) sperm.', 'Practice Barr body calculation: number of inactive X = max(0, number of X - 1).', 'Have students write karyotypes for all possible zygotes from combinations of normal and abnormal gametes.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Turner syndrome is inherited from the mother because the missing X is maternal in origin, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Turner syndrome is more severe than Klinefelter syndrome because monosomy is always more harmful than trisomy." Use evidence from the.', answer: 'The statement is false',
                  options: ['The statement is false', 'sex chromosomes determine sex', 'agrees without nuance shows lack of critical evaluation of phenotypic outcomes'],
                  hint: 'Revisit numerical chromosomal abnormalities (aneuploidy) and karyotyping from nodes.',
                  misconception: 'Students often believe Turner syndrome is inherited from the mother because the missing X is maternal in origin, and that Klinefelter.' }
          ],
            remediations: { 'turner-syndrome-is-inherited-from': { steps: ['Re-teach non-disjunction using a diagram of meiosis I vs.', 'II for sex chromosomes, highlighting that the father can produce nullisomic (no sex chromosome) or disomic (XY) sperm.', 'Practice Barr body calculation: number of inactive X = max(0, number of X - 1).', 'Have students write karyotypes for all possible zygotes from combinations of normal and abnormal gametes.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_008', difficulty: 'standard',
          question: 'Autosomal recessive disorders require homozygous recessive genotype (two mutant.',
          hint: 'Revisit Class 10 Biology Chapter 4 (Heredity and Evolution), specifically Mendel\'s.',
          misconception: 'Students believe "dominant means more common in population" and "recessive means rare." They confuse allele frequency.',
          parts: [
                { id: 'a', prompt: 'Compare the pedigree patterns of autosomal recessive vs autosomal dominant disorders across three generations.', answer: 'Feature 1: Autosomal recessive shows "horizontal" pattern',
                  options: ['Feature 1: Autosomal recessive shows "horizontal" pattern', 'equal male/female ratio', 'dominant means more common in population', 'recessive means rare'],
                  hint: 'Revisit Class 10 Biology Chapter 4 (Heredity and Evolution), specifically Mendel\'s monohybrid cross.',
                  misconception: 'Students believe "dominant means more common in population" and "recessive means rare." They confuse allele frequency with dominance.' }
          ],
            remediations: { 'dominant-means-more-common-in': { steps: ['Explicitly separate "dominance/recessiveness" (relationship between alleles in a heterozygote) from "allele frequency".', 'Show Hardy-Weinberg calculation: if dominant allele frequency = 0.001, affected frequency ≈ 2pq ≈ 0.002 (since p≈1);.', 'Assign practice: "Find a real-world example where recessive disorder has higher prevalence than a dominant one; explain.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_009', difficulty: 'standard',
          question: 'X-linked recessive disorders are genetic conditions caused by mutations.',
          hint: 'Review c10_bio_cbse_04_005 (Sex Determination) and c10_bio_cbse_04_004 (Mendel\'s Laws).',
          misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive) can never show any symptoms.',
          parts: [
                { id: 'a', prompt: 'State the chromosomal basis for why X-linked recessive disorders predominantly affect males, using the terms \'hemizygous\' and \'heterozygous\' correctly.', answer: 'Males (XY) are hemizygous for X-linked genes',
                  options: ['Males (XY) are hemizygous for X-linked genes', 'males have two X chromosomes', 'females are hemizygous', 'carrier'],
                  hint: 'Review c10_bio_cbse_04_005 (Sex Determination) and c10_bio_cbse_04_004 (Mendel\'s Laws) to reinforce.',
                  misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive) can never show any symptoms.' },
                { id: 'b', prompt: 'A woman with normal blood clotting has a father with Haemophilia A. She marries a man with normal blood clotting.', answer: 'The woman is an obligate carrier (XᴴXʰ)',
                  options: ['The woman is an obligate carrier (XᴴXʰ)', 'carrier', 'affected'],
                  hint: 'Review c10_bio_cbse_04_005 (Sex Determination) and c10_bio_cbse_04_004 (Mendel\'s Laws) to reinforce.',
                  misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive) can never show any symptoms.' },
                { id: 'c', prompt: 'A colour-blind man marries a woman with normal vision whose father was colour-blind.', answer: 'Step 1: Assign alleles: Xᴺ = normal vision, Xⁿ = colour-blind',
                  options: ['Step 1: Assign alleles: Xᴺ = normal vision, Xⁿ = colour-blind', 'carrier', 'affected'],
                  hint: 'Review c10_bio_cbse_04_005 (Sex Determination) and c10_bio_cbse_04_004 (Mendel\'s Laws) to reinforce.',
                  misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive) can never show any symptoms.' },
                { id: 'd', prompt: 'Compare the inheritance pattern of Haemophilia A (X-linked recessive) with that of an autosomal recessive disorder like sickle cell anaemia.', answer: 'Difference 1: Sex bias',
                  options: ['Difference 1: Sex bias', 'dominance difference', 'mutation rate difference', 'carrier'],
                  hint: 'Review c10_bio_cbse_04_005 (Sex Determination) and c10_bio_cbse_04_004 (Mendel\'s Laws) to reinforce.',
                  misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive) can never show any symptoms.' }
          ],
            remediations: { 'a-carrier-female-heterozygous-for': { steps: ['Re-teach X-inactivation using the calico cat analogy (one X inactivated randomly in each cell early in development).', 'Show that a heterozygous female is a mosaic: some cells express normal allele, some express mutant allele.', 'Have student re-draw the pedigree from Diagnostic Question 2, adding phenotype labels "carrier (asymptomatic)".', 'Practice a pedigree where a carrier female has mildly low factor VIII and ask: "Is she affected?" Answer: No, she is.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_08_010', difficulty: 'standard',
          question: 'Sickle cell anaemia is an autosomal recessive monogenic disorder caused by.',
          hint: 'If stuck, revisit c11_biotech_cbse_08_008 (autosomal recessive pedigree analysis) and.',
          misconception: 'Students believe sickle cell anaemia is caused by the sickle *shape* of red blood cells (thinking the mutation directly.',
          parts: [
                { id: 'a', prompt: 'A couple, both phenotypically normal, have a child with sickle cell anaemia.', answer: 'Both parents must be carriers (HbA/HbS)',
                  options: ['Both parents must be carriers (HbA/HbS)', 'mucus protein', 'thick mucus is produced'],
                  hint: 'If stuck, revisit c11_biotech_cbse_08_008 (autosomal recessive pedigree analysis) and.',
                  misconception: 'Students believe sickle cell anaemia is caused by the sickle *shape* of red blood cells (thinking the mutation directly makes cells.' },
                { id: 'b', prompt: 'Compare the molecular mechanism of sickle cell anaemia and cystic fibrosis: both are autosomal recessive, but one involves a "toxic gain-of-function" while the.', answer: 'Sickle cell: toxic gain-of-function',
                  options: ['Sickle cell: toxic gain-of-function', 'mucus protein', 'thick mucus is produced'],
                  hint: 'If stuck, revisit c11_biotech_cbse_08_008 (autosomal recessive pedigree analysis) and.',
                  misconception: 'Students believe sickle cell anaemia is caused by the sickle *shape* of red blood cells (thinking the mutation directly makes cells.' }
          ],
            remediations: { 'sickle-cell-anaemia-is-caused': { steps: ['If a student exhibits this misconception: (1) Use a physical analogy: "HbA is like smooth ropes; HbS is like ropes with.', 'The sickle shape is the *result* of twisted ropes pulling the cell membrane, not the cause." (2) Show the hemoglobin.', '(3) For CF, contrast: "CFTR is a gate (channel), not a brick (structural protein).', 'The mutation jams the gate shut — no chloride exits → water follows osmotically → mucus dehydrates." (4) Have them draw.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
