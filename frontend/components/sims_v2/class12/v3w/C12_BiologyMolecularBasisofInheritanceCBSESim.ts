import type { SimDef } from '../../engine/types';
import C12_BiologyMolecularBasisofInheritanceCBSESim from '../../../simulations/c6_12_new/C12_BiologyMolecularBasisofInheritanceCBSESim';

/** v3 wrapped master — C12_BiologyMolecularBasisofInheritanceCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologymolecularbasisofinheritancecbsesim: SimDef = {
    id: 'v3w_c12_biologymolecularbasisofinheritancecbsesim',
    title: 'Incomplete Dominance and Codominance',
    subtitle: 'This node covers incomplete dominance and codominance as exceptions to Mendel\'s law of.',
    classLevel: 12, subject: 'biology', topic: 'Incomplete Dominance and Codominance',
    chapters: [],
    nodeIds: ['c12_bio_cbse_05_004', 'c12_bio_cbse_05_006', 'c12_bio_cbse_05_008', 'c12_bio_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a garden with red, white, and pink snapdragon flowers growing side by side.', goal: 'Master Incomplete Dominance and Codominance.' },
    discovery: {
        question: 'A cross between two pink-flowered snapdragons produces 240 offspring. How many red, pink, and white flowers are expected?',
        options: ['Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)', 'incomplete dominance = blending inheritance', 'pink is dominant or misapplies the 3:1 ratio'],
        answer: 'Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)',
        hook: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material.',
    },
    teaching: [
        { title: 'Incomplete dominance is a genetic.', text: 'Incomplete dominance is a genetic inheritance pattern where neither allele is completely dominant over the other, resulting in a heterozygous phenotype that is a distinct intermediate blend of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_004', title: 'Incomplete dominance is a genetic.',
          scaffold: { problem: 'In Mirabilis jalapa (four o\'clock plant), red flower color (R) is incompletely dominant over white (r).',
            steps: [
            { text: 'Identify the genotypes of the parents. Red = RR (homozygous dominant). Pink = Rr (heterozygous, intermediate).' },
            { text: 'Determine gametes. RR produces only R gametes. Rr produces R and r gametes in 1:1 ratio.' },
            { text: 'Construct Punnett square: R (from red) × R/r (from pink) → offspring genotypes: RR and Rr in 1:1 ratio.' },
            { text: 'Map genotypes to phenotypes. RR = red, Rr = pink. So phenotypic ratio = 1 red : 1 pink.' },
            { text: 'Calculate expected numbers for 160 offspring. Red = 80, Pink = 80, White = 0.', faded: true, blankAnswer: 'Genotypic ratio 1 RR : 1 Rr. Phenotypic ratio 1 red : 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_006', title: 'Sex determination in humans is the.',
          scaffold: { problem: 'A phenotypically normal couple has a son with Klinefelter syndrome (47,XXY). The father\'s karyotype is 46,XY.',
            steps: [
            { text: 'Identify the zygote constitution — 47,XXY means two X chromosomes and one Y chromosome.' },
            { text: 'Determine gamete contributions — The Y must come from the father (only males have Y).' },
            { text: 'Test paternal origin — If non-disjunction occurred in father during Meiosis I, X and Y fail to separate → sperm with.' },
            { text: 'Test maternal origin — If non-disjunction in mother during Meiosis I, homologous X chromosomes fail to separate → ovum.' },
            { text: 'Conclusion — Non-disjunction could be paternal Meiosis I (XY sperm), paternal Meiosis II (XX sperm), maternal Meiosis I.', faded: true, blankAnswer: 'The non-disjunction could have occurred in the father.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_008', title: 'Sex-linked inheritance refers to the.',
          scaffold: { problem: 'A woman with normal colour vision has a colour-blind father. She marries a man with normal colour vision.',
            steps: [
            { text: 'Determine the genotype of the woman. Since her father is colour blind (XᶜY), he must have passed his Xᶜ chromosome to.' },
            { text: 'Determine the genotype of the man. He has normal colour vision, so his genotype is XᶜY.' },
            { text: 'Set up the Punnett square for the cross: Female gametes (Xᶜ, Xᶜ) × Male gametes (Xᶜ, Y).' },
            { text: 'List offspring genotypes and phenotypes:' },
            { text: 'Calculate probability. Total 4 equally likely outcomes. Only 1 is a colour-blind daughter (XᶜXᶜ). Probability = 1/4.', faded: true, blankAnswer: '1/4 or 25%' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_010', title: 'A gene mutation is a permanent.',
          scaffold: { problem: 'A gene segment has the coding strand sequence: 5\'-ATG TTT GAA TAC-3\'. (i) Write the mRNA sequence. (ii) Translate it to amino acids.',
            steps: [
            { text: 'Identify the coding strand and write the mRNA sequence by replacing T with U: 5\'-AUG UUU GAA UAC-3\'.' },
            { text: 'Translate mRNA in triplets from start codon AUG: Met (AUG), Phe (UUU), Glu (GAA), Tyr (UAC).' },
            { text: 'The mutation changes the 6th nucleotide of coding strand from T to C. The coding strand becomes 5\'-ATG TTC GAA TAC-3\'.' },
            { text: 'Re-translate: Met (AUG), Phe (UUC), Glu (GAA), Tyr (UAC). The second codon changed from UUU to UUC, both code for Phe.' },
            { text: 'Conclude: The mutation is a point mutation (substitution) that is silent due to degeneracy of the genetic code; the.', faded: true, blankAnswer: 'Silent point mutation; protein sequence remains.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_05_006', title: 'Identify each idea',
          dissect: { specimen: 'Incomplete Dominance and Codominance', spots: [
            { id: 's1', label: 'Incomplete dominance is a genetic', prompt: 'Which idea is this? — Incomplete dominance is a genetic inheritance pattern where neither allele is completely.', answer: 'Incomplete dominance is a genetic', options: ['Incomplete dominance is a genetic', 'Sex determination in humans is', 'Sex-linked inheritance refers to the', 'A gene mutation is a'] },
            { id: 's2', label: 'Sex determination in humans is', prompt: 'Which idea is this? — Sex determination in humans is the biological mechanism where the XX/XY chromosomal.', answer: 'Sex determination in humans is', options: ['Sex determination in humans is', 'Incomplete dominance is a genetic', 'Sex-linked inheritance refers to the', 'A gene mutation is a'] },
            { id: 's3', label: 'Sex-linked inheritance refers to the', prompt: 'Which idea is this? — Sex-linked inheritance refers to the transmission of traits governed by genes located on.', answer: 'Sex-linked inheritance refers to the', options: ['Sex-linked inheritance refers to the', 'Incomplete dominance is a genetic', 'Sex determination in humans is', 'A gene mutation is a'] },
            { id: 's4', label: 'A gene mutation is a', prompt: 'Which idea is this? — A gene mutation is a permanent alteration in the DNA sequence of a gene, involving.', answer: 'A gene mutation is a', options: ['A gene mutation is a', 'Incomplete dominance is a genetic', 'Sex determination in humans is', 'Sex-linked inheritance refers to the'] }
          ] } }
    ],
    explore: { component: C12_BiologyMolecularBasisofInheritanceCBSESim, prompt: 'Explore the interactive — Incomplete Dominance and Codominance' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_004', difficulty: 'standard',
          question: 'Incomplete dominance is a genetic inheritance pattern where neither allele is.',
          hint: 'If stuck, review c12_bio_cbse_05_002: practice drawing Punnett squares for Mendelian.',
          misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material.',
          parts: [
                { id: 'a', prompt: 'A cross between two pink-flowered snapdragons produces 240 offspring. How many red, pink, and white flowers are expected?', answer: 'Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)',
                  options: ['Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)', 'incomplete dominance = blending inheritance', 'pink is dominant or misapplies the 3:1 ratio'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'b', prompt: 'Compare the F₂ phenotypic ratios of a monohybrid cross showing incomplete dominance versus one showing codominance. Are they the same or different?', answer: 'Both give a 1:2:1 phenotypic ratio in F₂',
                  options: ['Both give a 1:2:1 phenotypic ratio in F₂', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' }
          ],
            remediations: { 'incomplete-dominance-blending-inheritance-in': { steps: ['If the student holds the blending-inheritance misconception: (1) Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to.', '(2) Draw a diagram showing DNA sequences of R and r alleles — emphasize they do not change.', '(3) Use the snapdragon Punnett square to track alleles: F₁ pink has genotype Rr, produces R and r gametes separately.', '(4) Re-diagnostic: Ask the student to explain how a pink-flowered plant can produce red-flowered offspring.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In codominance, the heterozygote phenotype is exactly halfway between the two homozygotes, just like incomplete dominance." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'both alleles expressed', 'blended expression', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'b', prompt: 'Design a simple cross experiment using snapdragons to prove that the pink flower color is due to incomplete dominance and not a separate genetic factor.', answer: 'Cross 1: True-breeding red (RR) × true-breeding white (rr) → all pink F₁',
                  options: ['Cross 1: True-breeding red (RR) × true-breeding white (rr) → all pink F₁', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'c', prompt: 'Compare the F₂ phenotypic ratios of a monohybrid cross showing incomplete dominance versus one showing codominance. Are they the same or different?', answer: 'Both give a 1:2:1 phenotypic ratio in F₂',
                  options: ['Both give a 1:2:1 phenotypic ratio in F₂', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' }
          ],
            remediations: { 'incomplete-dominance-blending-inheritance-in': { steps: ['If the student holds the blending-inheritance misconception: (1) Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to.', '(2) Draw a diagram showing DNA sequences of R and r alleles — emphasize they do not change.', '(3) Use the snapdragon Punnett square to track alleles: F₁ pink has genotype Rr, produces R and r gametes separately.', '(4) Re-diagnostic: Ask the student to explain how a pink-flowered plant can produce red-flowered offspring.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_006', difficulty: 'standard',
          question: 'Sex determination in humans is the biological mechanism where the XX/XY.',
          hint: 'If stuck on X-Y pairing, review c11_bio_cbse_10_006 (Meiosis I) — focus on.',
          misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the mechanism of sex determination in humans (XX/XY) with that in birds (ZZ/ZW).', answer: 'In humans, males are heterogametic (XY) and females homogametic (XX)',
                  options: ['In humans, males are heterogametic (XY) and females homogametic (XX)', 'birds also have XY', 'the larger chromosome determines sex'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive marker.' }
          ],
            remediations: { 'the-y-chromosome-determines-maleness': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to visualise X-Y segregation at.', 'Draw a flowchart: Fertilisation → Zygote (XX or XY) → SRY present?', 'Practice Punnett squares for sex chromosome crosses including non-disjunction scenarios.', 'Re-attempt Diagnostic Questions 3 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In human females, one X chromosome is completely inactivated in every cell, so females effectively have only one functional X.', answer: 'The statement is partially correct but misleading',
                  options: ['The statement is partially correct but misleading', 'the Y chromosome determines maleness simply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive marker.' },
                { id: 'b', prompt: 'Compare and contrast the mechanism of sex determination in humans (XX/XY) with that in birds (ZZ/ZW).', answer: 'In humans, males are heterogametic (XY) and females homogametic (XX)',
                  options: ['In humans, males are heterogametic (XY) and females homogametic (XX)', 'birds also have XY', 'the larger chromosome determines sex', 'the Y chromosome determines maleness simply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive marker.' }
          ],
            remediations: { 'the-y-chromosome-determines-maleness': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to visualise X-Y segregation at.', 'Draw a flowchart: Fertilisation → Zygote (XX or XY) → SRY present?', 'Practice Punnett squares for sex chromosome crosses including non-disjunction scenarios.', 'Re-attempt Diagnostic Questions 3 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_008', difficulty: 'standard',
          question: 'Sex-linked inheritance refers to the transmission of traits governed by genes.',
          hint: 'If stuck, review sex determination (c12_bio_cbse_05_006) and practice writing genotypes.',
          misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive allele) can never show any symptoms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sex-linked inheritance refers to the transmission of traits governed by genes located on',
                  options: ['Sex-linked inheritance refers to the transmission of traits governed by genes located on', 'Incomplete dominance is a genetic inheritance pattern where neither allele is completely', 'Sex determination in humans is the biological mechanism where the XX/XY chromosomal', 'A gene mutation is a permanent alteration in the DNA sequence of a gene, involving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive allele) can never show any symptoms.' }
          ],
            remediations: { 'a-carrier-female-heterozygous-for': { steps: ['If the student cannot deduce carrier status from pedigrees or misassigns genotypes in crosses: 1.', 'Revisit c12_bio_cbse_05_006 (Sex Determination) to reinforce XX/XY chromosome inheritance.', 'Practice monohybrid crosses with X/Y notation using c12_bio_cbse_05_002 (Monohybrid Cross) but replace autosomal.', 'Draw a 3-generation pedigree on paper: mark affected males, carrier females (half-shaded), normal individuals.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_010', difficulty: 'standard',
          question: 'A gene mutation is a permanent alteration in the DNA sequence of a gene,.',
          hint: 'Review the genetic code table (c11_biotech_cbse_07_006) and practice translating short.',
          misconception: 'Students often think that a point mutation always changes the amino acid sequence, not realizing that the degeneracy of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A gene mutation is a permanent alteration in the DNA sequence of a gene, involving',
                  options: ['A gene mutation is a permanent alteration in the DNA sequence of a gene, involving', 'Incomplete dominance is a genetic inheritance pattern where neither allele is completely', 'Sex determination in humans is the biological mechanism where the XX/XY chromosomal', 'Sex-linked inheritance refers to the transmission of traits governed by genes located on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a point mutation always changes the amino acid sequence, not realizing that the degeneracy of the genetic code.' }
          ],
            remediations: { 'a-point-mutation-always-changes': { steps: ['If a student cannot distinguish point vs frameshift mutations, have them revisit the genetic code table.', 'Use the "RAM HAS RED CAP" analogy from NCERT: write the sentence in triplets, then insert/delete letters and observe.', 'Then ask them to classify mutations in sickle cell anemia (point mutation) vs a hypothetical frameshift in the same.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
