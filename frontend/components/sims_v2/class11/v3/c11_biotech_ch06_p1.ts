import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch06_p1: SimDef = {
    id: 'v3_c11_biotech_ch06_p1',
    title: 'Basic Principles of Inheritance · Part 1/2',
    subtitle: 'Work monohybrid and dihybrid crosses; decode dominance, segregation and independent assortment.',
    classLevel: 11, subject: 'biotechnology', topic: 'Basic Principles of Inheritance · Part 1/2',
    chapters: ['c11_biotech_ch06'],
    nodeIds: ['c11_biotech_cbse_06_001', 'c11_biotech_cbse_06_002', 'c11_biotech_cbse_06_003', 'c11_biotech_cbse_06_004', 'c11_biotech_cbse_06_005', 'c11_biotech_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a genetics researcher redoing Mendel\'s pea experiments', intro: 'A monastery garden in the 1850s cracked the logic of heredity with nothing but pea counts.', goal: 'State Mendel\'s laws, compute genotypic and phenotypic ratios, and define allele, genotype and phenotype.' },
    discovery: {
        question: 'Two tall pea plants are crossed and a quarter of the offspring come out dwarf. Nothing \'contaminated\' the cross. Where was the dwarfness hiding?',
        options: ['Both parents carried a recessive allele that only shows when two copies meet', 'Dwarfness is caused by soil nutrition, not genes', 'The tall gene mutated spontaneously in a quarter of seeds', 'Pea plants randomly revert to wild forms'],
        answer: 'Both parents carried a recessive allele that only shows when two copies meet',
        hook: 'Traits can skip a generation because alleles travel silently — phenotype never reveals the full genotype.',
    },
    teaching: [
        { title: 'Mendel\'s Experiments: Choice of Organism and Method', text: 'Mendel selected garden pea (*Pisum sativum*) as his model organism because it is an annual plant with perfect bisexual flowers, naturally self-pollinating, and exhibits several distinct, easily.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_06_001', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Run Mendel\'s crosses in a virtual garden and predict phenotypic ratios before the seeds sprout.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_001', title: 'Mendel\'s Experiments: Choice of Organism and Method',
          caseStudy: { intro: 'Imagine you are a plant breeder in 1850 trying to discover the rules of inheritance — you cannot see genes, DNA, or chromosomes.',
            decisions: [{ prompt: 'State any four characteristics of garden pea (*Pisum sativum*) that made it an ideal model organism for Mendel\'s inheritance experiments.', options: [
                { text: 'Correct answer: (1) Annual plant', outcome: 'Correct answer: (1) Annual plant — completes life cycle in one season, allowing multiple.' },
                { text: 'easy to grow', outcome: 'Not quite — Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow.', reveals: 'mendel-chose-pea-plants-simply' },
                { text: 'common plant', outcome: 'Not quite — Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow.', reveals: 'mendel-chose-pea-plants-simply' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_06_002', title: 'Law of Dominance: Monohybrid Cross',
          scaffold: { problem: 'A farmer in Haryana has a pure-breeding tall wheat variety (TT) and a pure-breeding dwarf wheat variety (tt).',
            steps: [
            { text: 'Identify parental genotypes. Pure tall = TT (homozygous dominant). Pure dwarf = tt (homozygous recessive).' },
            { text: 'Determine F1 genotype. Cross TT × tt. Each parent produces only one type of gamete: T from tall, t from dwarf.' },
            { text: 'Determine F1 gametes. F1 genotype Tt undergoes meiosis. Law of Segregation: alleles separate.' },
            { text: 'Construct Punnett square for F2 (Tt × Tt). Rows: male gametes (T, t). Columns: female gametes (T, t).' },
            { text: 'Count genotypes and phenotypes. Genotypes: 1 TT, 2 Tt, 1 tt → ratio 1:2:1.' },
            { text: 'Calculate expected numbers for 800 plants. Expected tall = (3/4) × 800 = 600. Expected dwarf = (1/4) × 800 = 200.', faded: true, blankAnswer: 'Expected 600 tall plants and 200 dwarf plants (3:1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_06_003', title: 'Law of Segregation: Monohybrid Ratio and Test Cross',
          scaffold: { problem: 'A farmer has a patch of black-seeded watermelons (black seed B dominant over white seed b).',
            steps: [
            { text: 'Identify that a test cross of a dominant phenotype (black) with recessive (bb) reveals genotype: if all offspring are.' },
            { text: 'Analyze each plant\'s offspring: Plants 1,2,4,6,8,10 show 0 white → all black → genotype BB (true-breeding).' },
            { text: 'For Plant 3 (Bb), self-pollination means Bb × Bb cross.' },
            { text: 'Construct Punnett square: gametes B and b from each parent → genotypes 1 BB : 2 Bb : 1 bb; phenotypes 3 black : 1 white.' },
            { text: 'Verify: The 1:1 test cross ratio for Plant 3 (11 black : 13 white, χ² = (11-12)²/12 + (13-12)²/12 = 0.167, p>0.05) fits.', faded: true, blankAnswer: 'True-breeding (BB) plants: 1, 2, 4, 6, 8, 10. Plant 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_06_004', title: 'Law of Independent Assortment: Dihybrid Cross',
          scaffold: { problem: 'In garden peas, round seed shape (R) is dominant over wrinkled (r), and yellow seed colour (Y) is dominant over green (y).',
            steps: [
            { text: 'Write parental genotypes: RRYY (round‑yellow) × rryy (wrinkled‑green).' },
            { text: 'Determine F₁ genotype: All offspring are RrYy (heterozygous for both traits). Phenotype: round‑yellow.' },
            { text: 'Find gametes produced by F₁ (RrYy). Using FOIL: RY, Ry, rY, ry (each 1/4 probability).' },
            { text: 'Construct a 4×4 Punnett square with these four gametes on both axes. Fill in the 16 genotype combinations.' },
            { text: 'Count phenotypes: 9 round‑yellow (R_Y_), 3 round‑green (R_yy), 3 wrinkled‑yellow (rrY_), 1 wrinkled‑green (rryy).' },
            { text: 'Count genotypes: 1 RRYY, 2 RRYy, 1 RRyy, 2 RrYY, 4 RrYy, 2 Rryy, 1 rrYY, 2 rrYy, 1 rryy.' },
            { text: 'Verify that the total is 16 and that the product of monohybrid ratios (3:1) × (3:1) gives 9:3:3:1.', faded: true, blankAnswer: 'Phenotypic ratio = 9 round‑yellow : 3 round‑green : 3.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_006', title: 'Multiple Alleles: ABO Blood Group System',
          caseStudy: { intro: 'Imagine you\'re at a blood donation camp in Delhi and the nurse asks your blood group.',
            decisions: [{ prompt: 'State the three alleles of the ABO blood group gene and specify the dominance relationship between each pair.', options: [
                { text: 'The three alleles are I<sup>A</sup>, I<sup>B</sup>, and i', outcome: 'The three alleles are I<sup>A</sup>, I<sup>B</sup>, and i. I<sup>A</sup> and I<sup>B</sup> are.' },
                { text: 'I<sup>A</sup> dominates I<sup>B</sup>', outcome: 'Not quite — Students believe "codominance in ABO means blending like pink flowers in snapdragons" – they think.', reveals: 'codominance-in-abo-means-blending' },
                { text: 'three alleles in one person', outcome: 'Not quite — Students believe "codominance in ABO means blending like pink flowers in snapdragons" – they think.', reveals: 'codominance-in-abo-means-blending' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Basic Principles of Inheritance · Part 1/2', spots: [
            { id: 's1', label: 'Mendels Experiments Choice of Organism and Method', prompt: 'Which idea is this? — Mendel selected garden pea (*Pisum sativum*) as his model organism because it is.', answer: 'Mendels Experiments Choice of Organism and Method', options: ['Mendels Experiments Choice of Organism and Method', 'Law of Dominance Monohybrid Cross', 'Law of Segregation Monohybrid Ratio and Test Cross', 'Law of Independent Assortment Dihybrid Cross'] },
            { id: 's2', label: 'Law of Dominance Monohybrid Cross', prompt: 'Which idea is this? — The Law of Dominance states that in a monohybrid cross between two homozygous parents.', answer: 'Law of Dominance Monohybrid Cross', options: ['Law of Dominance Monohybrid Cross', 'Mendels Experiments Choice of Organism and Method', 'Law of Segregation Monohybrid Ratio and Test Cross', 'Law of Independent Assortment Dihybrid Cross'] },
            { id: 's3', label: 'Law of Segregation Monohybrid Ratio and Test Cross', prompt: 'Which idea is this? — The Law of Segregation states that during gamete formation, the two alleles of a gene.', answer: 'Law of Segregation Monohybrid Ratio and Test Cross', options: ['Law of Segregation Monohybrid Ratio and Test Cross', 'Mendels Experiments Choice of Organism and Method', 'Law of Dominance Monohybrid Cross', 'Law of Independent Assortment Dihybrid Cross'] },
            { id: 's4', label: 'Law of Independent Assortment Dihybrid Cross', prompt: 'Which idea is this? — The Law of Independent Assortment states that alleles of two (or more) different genes.', answer: 'Law of Independent Assortment Dihybrid Cross', options: ['Law of Independent Assortment Dihybrid Cross', 'Mendels Experiments Choice of Organism and Method', 'Law of Dominance Monohybrid Cross', 'Law of Segregation Monohybrid Ratio and Test Cross'] },
            { id: 's5', label: 'Incomplete Dominance and Codominance', prompt: 'Which idea is this? — Incomplete dominance is an allelic interaction where the dominant allele in.', answer: 'Incomplete Dominance and Codominance', options: ['Incomplete Dominance and Codominance', 'Mendels Experiments Choice of Organism and Method', 'Law of Dominance Monohybrid Cross', 'Law of Segregation Monohybrid Ratio and Test Cross'] },
            { id: 's6', label: 'Multiple Alleles ABO Blood Group System', prompt: 'Which idea is this? — Multiple alleles refer to the existence of more than two alternative forms of a gene in.', answer: 'Multiple Alleles ABO Blood Group System', options: ['Multiple Alleles ABO Blood Group System', 'Mendels Experiments Choice of Organism and Method', 'Law of Dominance Monohybrid Cross', 'Law of Segregation Monohybrid Ratio and Test Cross'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your biology teacher wants the class to run a mini-Mendel project this year. Proposals on the table: ornamental roses, the school\'s mango tree, and fast-cycling Brassica (rapa) plants. A classmate votes for the mango tree \'because it\'s big and gives lots of fruit\' and roses \'because they\'re pretty and common\'.',
            decisions: [{ prompt: 'Which organism should the class pick, and on Mendel\'s actual criteria?', options: [
                { text: 'Fast-cycling Brassica: short generation time (weeks, not years), controllable pollination (bisexual flowers you can emasculate and hand-cross), discrete contrasting traits, many offspring per cross, and the ability to make true-breeding lines first — Mendel\'s real criteria were experimental control, not convenience or size.', outcome: 'Mendel chose peas because their biology kept the signal clean: pure lines, controlled crosses, countable discrete traits, big samples.' },
                { text: 'The mango tree — more seeds and fruit means more data, and that\'s all Mendel needed.', outcome: 'A mango takes years to flower and you can\'t control its pollination or get true-breeding lines in a school year; raw numbers without controlled parentage produce noise, not ratios.', reveals: 'bigger-plant-more-data' },
                { text: 'Roses — Mendel picked peas simply because they were common in his garden, so any common plant works.', outcome: 'Commonness wasn\'t the point: peas self-pollinate unless you intervene, show discrete non-overlapping traits, and breed true — roses\' hybridised, continuous traits would bury any 3:1 signal.', reveals: 'mendel-chose-what-was-handy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Mendel\'s insight: inheritance is particulate — traits come as discrete units that shuffle but never blend.',
            decisions: [{ prompt: 'What comes next? Basic Principles of Inheritance · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Basic Principles of Inheritance · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_001', difficulty: 'standard',
          question: 'Mendel selected garden pea (*Pisum sativum*) as his model organism because.',
          hint: 'If stuck, revisit the structure of a pea flower (cleistogamous, bisexual) and the steps.',
          misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery.',
          parts: [
                { id: 'a', prompt: 'State any four characteristics of garden pea (*Pisum sativum*) that made it an ideal model organism for Mendel\'s inheritance experiments.', answer: 'Correct answer: (1) Annual plant',
                  options: ['Correct answer: (1) Annual plant', 'easy to grow', 'common plant', 'pea plant'],
                  hint: 'If stuck, revisit the structure of a pea flower (cleistogamous, bisexual) and the steps.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' },
                { id: 'b', prompt: 'Compare Mendel\'s approach of counting progeny phenotypes and calculating ratios with the qualitative "like begets like" observations of earlier breeders.', answer: 'Correct answer: Qualitative observations only note that traits reappear',
                  options: ['Correct answer: Qualitative observations only note that traits reappear', 'Mendel used math', 'common', 'easy to grow in the monastery garden'],
                  hint: 'If stuck, revisit the structure of a pea flower (cleistogamous, bisexual) and the steps.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' }
          ],
            remediations: { 'mendel-chose-pea-plants-simply': { steps: ['If a student exhibits this misconception, do NOT re-read the textbook list.', 'Instead: (1) Ask them to imagine crossing two humans for height — they will immediately see continuous variation and.', '(2) Have them compare pea flowers (closed, self-pollinating) with maize (open, wind-pollinated) using diagrams — ask.', 'Another breeder crosses two tall maize plants from a field and gets a messy ratio.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Mendel could have used any flowering plant; he just got lucky with peas." Evaluate this claim by analyzing whether the same experimental.', answer: 'Correct evaluation: The claim is false',
                  options: ['Correct evaluation: The claim is false', 'common', 'easy to grow in the monastery garden'],
                  hint: 'If stuck, revisit the structure of a pea flower (cleistogamous, bisexual) and the steps.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' }
          ],
            remediations: { 'mendel-chose-pea-plants-simply': { steps: ['If a student exhibits this misconception, do NOT re-read the textbook list.', 'Instead: (1) Ask them to imagine crossing two humans for height — they will immediately see continuous variation and.', '(2) Have them compare pea flowers (closed, self-pollinating) with maize (open, wind-pollinated) using diagrams — ask.', 'Another breeder crosses two tall maize plants from a field and gets a messy ratio.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_002', difficulty: 'standard',
          question: 'The Law of Dominance states that in a monohybrid cross between two homozygous.',
          hint: 'If stuck, revisit c9_bio_ch1_12 (Meiosis) to visualize how homologous chromosomes.',
          misconception: 'Students often believe that "dominant" means the dominant allele physically suppresses, destroys, or prevents the.',
          parts: [
                { id: 'a', prompt: 'A pea plant breeder has a tall plant of unknown genotype. She performs a test cross with a pure dwarf plant and obtains 48 tall and 52 dwarf offspring in the.', answer: 'The unknown tall plant is heterozygous (Tt)',
                  options: ['The unknown tall plant is heterozygous (Tt)', 'dominant'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Meiosis) to visualize how homologous chromosomes separate, and.',
                  misconception: 'Students often believe that "dominant" means the dominant allele physically suppresses, destroys, or prevents the recessive allele from.' },
                { id: 'b', prompt: 'Compare the genetic composition of gametes produced by a homozygous dominant (TT), heterozygous (Tt), and homozygous recessive (tt) individual for a single.', answer: 'TT produces only T gametes',
                  options: ['TT produces only T gametes', 'dominant'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Meiosis) to visualize how homologous chromosomes separate, and.',
                  misconception: 'Students often believe that "dominant" means the dominant allele physically suppresses, destroys, or prevents the recessive allele from.' }
          ],
            remediations: { 'dominant-means-the-dominant-allele': { steps: ['If a student exhibits this misconception, do NOT simply re-state the definition.', 'Instead: (1) Use the biochemical example from peas: the tall allele (T) codes for a functional enzyme in gibberellin.', 'In Tt heterozygotes, one functional allele produces enough enzyme for normal growth — the t allele is not "destroyed,".', '(2) Have the student physically model meiosis with pipe cleaners or paper chromosomes: show one homologous chromosome.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_003', difficulty: 'standard',
          question: 'The Law of Segregation states that during gamete formation, the two alleles.',
          hint: 'Revisit c9_bio_ch1_12 (meiosis stages) and c11_biotech_cbse_06_001 (Mendel\'s pure lines).',
          misconception: 'Students believe that the Law of Segregation means "alleles separate during meiosis II" because they confuse sister.',
          parts: [
                { id: 'a', prompt: 'A student writes the genotypic ratio of a monohybrid cross F2 generation as 1:2:1 (TT:Tt:tt) and the phenotypic ratio as 3:1 (tall:dwarf).', answer: 'Correct answer: The phenotypic ratio is not a simplification; it arises',
                  options: ['Correct answer: The phenotypic ratio is not a simplification; it arises', 'and tt as', 'alleles separate during meiosis II', 'In a test cross of a tall plant with dwarf, you always get 1 tall : 1 dwarf'],
                  hint: 'Revisit c9_bio_ch1_12 (meiosis stages) and c11_biotech_cbse_06_001 (Mendel\'s pure lines) to connect.',
                  misconception: 'Students believe that the Law of Segregation means "alleles separate during meiosis II" because they confuse sister chromatid separation.' },
                { id: 'b', prompt: 'You have a pea plant with purple flowers (dominant, P) but unknown genotype.', answer: 'Step 1: Test cross is P_ × pp',
                  options: ['Step 1: Test cross is P_ × pp', 'alleles separate during meiosis II', 'In a test cross of a tall plant with dwarf, you always get 1 tall : 1 dwarf'],
                  hint: 'Revisit c9_bio_ch1_12 (meiosis stages) and c11_biotech_cbse_06_001 (Mendel\'s pure lines) to connect.',
                  misconception: 'Students believe that the Law of Segregation means "alleles separate during meiosis II" because they confuse sister chromatid separation.' },
                { id: 'c', prompt: 'Compare the gamete types produced by a homozygous dominant (TT), heterozygous (Tt), and homozygous recessive (tt) individual for a single gene.', answer: 'Gametes: TT produces only T',
                  options: ['Gametes: TT produces only T', 'alleles separate during meiosis II', 'In a test cross of a tall plant with dwarf, you always get 1 tall : 1 dwarf'],
                  hint: 'Revisit c9_bio_ch1_12 (meiosis stages) and c11_biotech_cbse_06_001 (Mendel\'s pure lines) to connect.',
                  misconception: 'Students believe that the Law of Segregation means "alleles separate during meiosis II" because they confuse sister chromatid separation.' }
          ],
            remediations: { 'the-law-of-segregation-means': { steps: ['Use a physical model — two pairs of homologous chromosomes (one long, one short) with allele labels.', 'Draw Punnett squares for TT × tt and Tt × tt side-by-side. Have student count phenotypes.', 'Give a worksheet with 5 unknown dominant plants, each test-crossed with recessive.', 'Connect to cytology — show micrograph of meiosis I anaphase with homologous chromosomes moving apart, labelled with.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_004', difficulty: 'standard',
          question: 'The Law of Independent Assortment states that alleles of two (or more).',
          hint: 'Review the law of segregation and monohybrid test cross in c11_biotech_cbse_06_003.',
          misconception: 'Students often believe the 9:3:3:1 ratio is a universal rule for all dihybrid crosses, ignoring that it only holds when.',
          parts: [
                { id: 'a', prompt: 'Compare the genotypic ratio of a monohybrid cross (1:2:1) with that of a dihybrid cross.', answer: 'Correct answer: A dihybrid cross yields 9 distinct genotypes in the ratio',
                  options: ['Correct answer: A dihybrid cross yields 9 distinct genotypes in the ratio', 'parental combinations (e'],
                  hint: 'Review the law of segregation and monohybrid test cross in c11_biotech_cbse_06_003, focusing on how.',
                  misconception: 'Students often believe the 9:3:3:1 ratio is a universal rule for all dihybrid crosses, ignoring that it only holds when the two genes are.' }
          ],
            remediations: { 'the-9-3-3-1': { steps: ['Have the student physically model meiosis with two pairs of homologous chromosomes (e.g., coloured beads) to see how.', 'Guide them through the FOIL method (First, Outer, Inner, Last) for writing gametes from a dihybrid genotype (RrYy →.', 'Construct a 4×4 Punnett square together, highlighting each of the 16 boxes and counting phenotypes.', 'Explicitly contrast this with a linked‑gene example (from the next node) to show how linkage skews the ratio.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_005', difficulty: 'standard',
          question: 'Incomplete dominance is an allelic interaction where the dominant allele in.',
          hint: 'If stuck, revisit the Punnett square for a Mendelian monohybrid cross.',
          misconception: 'Students often think incomplete dominance and codominance are the same because both give 1:2:1 phenotypic ratios in F2.',
          parts: [
                { id: 'a', prompt: 'A plant breeder crosses a homozygous red-flowered four-o\'clock plant (RR) with a homozygous white-flowered one (rr). The F1 are all pink.', answer: 'Parental cross: RR × rr → F1 all Rr (pink)',
                  options: ['Parental cross: RR × rr → F1 all Rr (pink)', 'in terms of dominant/recessive masking'],
                  hint: 'If stuck, revisit the Punnett square for a Mendelian monohybrid cross (c11_biotech_cbse_06_002) and.',
                  misconception: 'Students often think incomplete dominance and codominance are the same because both give 1:2:1 phenotypic ratios in F2.' },
                { id: 'b', prompt: 'Compare the F2 genotypic and phenotypic ratios for a monohybrid cross showing (a) complete dominance, (b) incomplete dominance, and (c) codominance.', answer: 'complete dominance, (',
                  options: ['complete dominance, (', 'all three have 3:1 phenotypic ratio'],
                  hint: 'If stuck, revisit the Punnett square for a Mendelian monohybrid cross (c11_biotech_cbse_06_002) and.',
                  misconception: 'Students often think incomplete dominance and codominance are the same because both give 1:2:1 phenotypic ratios in F2.' }
          ],
            remediations: { 'incomplete-dominance-and-codominance-are': { steps: ['If a student confuses the two, have them draw the biochemical pathway: for incomplete dominance, show one allele.', 'For codominance, show allele A making antigen A, allele B making antigen B, heterozygote making both.', 'Then ask: "Can you separate the two traits in the heterozygote?" In codominance, yes (e.g., separate red and white.', 'Use this to rebuild the distinction from mechanism, not ratio.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_006', difficulty: 'standard',
          question: 'Multiple alleles refer to the existence of more than two alternative forms of.',
          hint: 'Review c11_biotech_cbse_06_005 (Codominance) – specifically the MN blood group example.',
          misconception: 'Students believe "codominance in ABO means blending like pink flowers in snapdragons" – they think Type AB blood is.',
          parts: [
                { id: 'a', prompt: 'State the three alleles of the ABO blood group gene and specify the dominance relationship between each pair.', answer: 'The three alleles are I<sup>A</sup>, I<sup>B</sup>, and i',
                  options: ['The three alleles are I<sup>A</sup>, I<sup>B</sup>, and i', 'I<sup>A</sup> dominates I<sup>B</sup>', 'three alleles in one person', 'codominance in ABO means blending like pink flowers in snapdragons'],
                  hint: 'Review c11_biotech_cbse_06_005 (Codominance) – specifically the MN blood group example and roan.',
                  misconception: 'Students believe "codominance in ABO means blending like pink flowers in snapdragons" – they think Type AB blood is an intermediate blend.' },
                { id: 'b', prompt: 'A man with blood group A (genotype unknown) marries a woman with blood group B (genotype unknown). They have a child with blood group O.', answer: 'Child is ii (Type O), so must inherit i from each parent',
                  options: ['Child is ii (Type O), so must inherit i from each parent', 'codominance in ABO means blending like pink flowers in snapdragons', 'Type AB blood is an intermediate blend of A and B antigens'],
                  hint: 'Review c11_biotech_cbse_06_005 (Codominance) – specifically the MN blood group example and roan.',
                  misconception: 'Students believe "codominance in ABO means blending like pink flowers in snapdragons" – they think Type AB blood is an intermediate blend.' },
                { id: 'c', prompt: 'Compare and contrast the ABO blood group system with Mendel\'s monohybrid cross (tall/dwarf pea plants) in terms of: (a) number of alleles in population, (b).', answer: 'number of alleles in population, (',
                  options: ['number of alleles in population, (', 'codominance in ABO means blending like pink flowers in snapdragons', 'Type AB blood is an intermediate blend of A and B antigens'],
                  hint: 'Review c11_biotech_cbse_06_005 (Codominance) – specifically the MN blood group example and roan.',
                  misconception: 'Students believe "codominance in ABO means blending like pink flowers in snapdragons" – they think Type AB blood is an intermediate blend.' }
          ],
            remediations: { 'codominance-in-abo-means-blending': { steps: ['Show electron micrograph of RBC surface – Type A has only A antigens, Type B only B antigens, Type AB has BOTH distinct.', 'Contrast with snapdragon petals – pink is intermediate pigment (incomplete dominance); AB blood has two separate.', 'Have student write genotype-phenotype table: I<sup>A</sup>I<sup>A</sup>→A antigen only, I<sup>B</sup>I<sup>B</sup>→B.', 'Practice transfusion logic: "Can Type A receive from AB?" No – AB has B antigen foreign to A recipient.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
