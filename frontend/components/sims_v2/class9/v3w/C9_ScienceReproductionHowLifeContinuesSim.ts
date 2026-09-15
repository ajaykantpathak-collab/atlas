import type { SimDef } from '../../engine/types';
import C9_ScienceReproductionHowLifeContinuesSim from '../../../simulations/c6_12/C9_ScienceReproductionHowLifeContinuesSim';

/** v3 wrapped master — C9_ScienceReproductionHowLifeContinuesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_sciencereproductionhowlifecontinuessim: SimDef = {
    id: 'v3w_c9_sciencereproductionhowlifecontinuessim',
    title: 'Reproduction How Life Continues',
    subtitle: 'Covers human pregnancy from fertilization through the three trimesters including.',
    classLevel: 9, subject: 'science', topic: 'Pregnancy and Embryonic Development',
    chapters: [],
    nodeIds: ['c9_bio_ch3_10', 'c9_bio_ch3_4', 'c9_bio_ch3_8', 'c9_bio_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine a pregnant woman in your neighborhood visiting the clinic for her monthly check-up — the doctor.', goal: 'Master Reproduction How Life Continues.' },
    discovery: {
        question: 'A student claims: "The embryo receives oxygen and nutrients directly from the mother\'s blood because their blood mixes in the placenta." Evaluate this.',
        options: ['The statement is false', 'breathes', 'the embryo "breathes" and "eats" like a newborn'],
        answer: 'The statement is false',
        hook: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange.',
    },
    teaching: [
        { title: 'Pregnancy is the physiological state in a.', text: 'Pregnancy is the physiological state in a female mammal beginning from the implantation of a blastocyst in the uterine wall and continuing through embryonic and fetal development until parturition,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_bio_ch3_10', title: 'Pregnancy is the physiological state in.',
          scaffold: { problem: 'A 28-year-old woman has a regular 28-day menstrual cycle. She ovulates on Day 14.',
            steps: [
            { text: 'Identify the starting point — fertilization occurs in the ampulla of the fallopian tube within 24 hours of ovulation.' },
            { text: 'Recall cleavage — the zygote undergoes mitotic divisions without growth: 2-cell (Day 1.5), 4-cell (Day 2), 8-cell (Day.' },
            { text: 'Apply compaction and blastulation — by Day 4-5, the morula compacts, forms a blastocoel cavity, and becomes a.' },
            { text: 'Trace implantation — the blastocyst reaches the uterus ~Day 4-5, hatches from zona pellucida ~Day 5-6, and the.' },
            { text: 'Verify with hormonal context — corpus luteum progesterone maintains endometrium; trophoblast hCG rescues corpus luteum.', faded: true, blankAnswer: 'Fertilization (Day 14, fallopian tube) → zygote →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch3_4', title: 'Meiosis is a specialized type of cell.',
          scaffold: { problem: 'In a flowering plant, the diploid chromosome number (2n) is 24. A pollen mother cell in the anther undergoes meiosis.',
            steps: [
            { text: 'Identify the starting cell: Pollen mother cell (microsporocyte) is diploid (2n = 24 chromosomes, each replicated → 24.' },
            { text: 'Recall Meiosis I (Reduction Division): Homologous chromosomes pair (synapsis), crossing over occurs, then homologs.' },
            { text: 'Recall Meiosis II (Equational Division): No DNA replication. Sister chromatids separate.' },
            { text: 'Trace the cause-effect: One round of DNA replication followed by two divisions reduces chromosome number by half while.' },
            { text: 'Verify and conclude: 24 → (Meiosis I) → 12 → (Meiosis II) → 12. Each microspore is haploid (n=12).', faded: true, blankAnswer: 'Each microspore (pollen grain) will have 12 chromosomes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch3_8', title: 'Sexual reproduction in animals is a.',
          scaffold: { problem: 'A farmer notices his prize bull is mounting cows normally but no pregnancies occur after 6 months.',
            steps: [
            { text: 'Identify that normal testosterone and libido indicate functional Leydig cells (endocrine) and intact.' },
            { text: 'Note that accessory gland secretions (seminal vesicles, prostate) are normal - these glands are stimulated by.' },
            { text: 'Zero sperm count (azoospermia) with normal hormonal profile points to a defect in spermatogenesis itself (germinal.' },
            { text: 'Since the bull mounts and ejaculates (emission/ejaculation reflexes intact), the vas deferens and ejaculatory ducts are.' },
            { text: 'Conclude the defect is likely in the seminiferous tubules (Sertoli cell dysfunction, germ cell arrest) or in the.', faded: true, blankAnswer: 'The defect is most likely in the seminiferous tubules.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch3_9', title: 'The human reproductive system is a.',
          scaffold: { problem: 'A 25-year-old man has normal testosterone levels but zero sperm count (azoospermia). His vas deferens are patent (open).',
            steps: [
            { text: 'Identify that testosterone is normal → Leydig cells (interstitial cells) are functioning → LH stimulation is intact.' },
            { text: 'Identify that sperm count is zero but vas deferens open → problem is in sperm production or maturation, not transport.' },
            { text: 'Recall spermatogenesis occurs in seminiferous tubules supported by Sertoli cells (stimulated by FSH).' },
            { text: 'Since testosterone is normal but sperm absent, the defect is likely in Sertoli cell function or germ cell meiosis (FSH.' },
            { text: 'Conclude: Seminiferous tubule dysfunction (e.g., Sertoli cell-only syndrome, genetic meiotic arrest) is the probable.', faded: true, blankAnswer: 'Dysfunction in seminiferous tubules (Sertoli cells or germ.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_bio_ch3_4', title: 'Identify each idea',
          dissect: { specimen: 'Reproduction How Life Continues', spots: [
            { id: 's1', label: 'Pregnancy is the physiological state', prompt: 'Which idea is this? — Pregnancy is the physiological state in a female mammal beginning from the implantation.', answer: 'Pregnancy is the physiological state', options: ['Pregnancy is the physiological state', 'Meiosis is a specialized type', 'Sexual reproduction in animals is', 'The human reproductive system is'] },
            { id: 's2', label: 'Meiosis is a specialized type', prompt: 'Which idea is this? — Meiosis is a specialized type of cell division that reduces the chromosome number by.', answer: 'Meiosis is a specialized type', options: ['Meiosis is a specialized type', 'Pregnancy is the physiological state', 'Sexual reproduction in animals is', 'The human reproductive system is'] },
            { id: 's3', label: 'Sexual reproduction in animals is', prompt: 'Which idea is this? — Sexual reproduction in animals is a biological process where two parents contribute.', answer: 'Sexual reproduction in animals is', options: ['Sexual reproduction in animals is', 'Pregnancy is the physiological state', 'Meiosis is a specialized type', 'The human reproductive system is'] },
            { id: 's4', label: 'The human reproductive system is', prompt: 'Which idea is this? — The human reproductive system is a collection of specialized organs and structures in.', answer: 'The human reproductive system is', options: ['The human reproductive system is', 'Pregnancy is the physiological state', 'Meiosis is a specialized type', 'Sexual reproduction in animals is'] }
          ] } }
    ],
    explore: { component: C9_ScienceReproductionHowLifeContinuesSim, prompt: 'Explore the interactive — Reproduction How Life Continues' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch3_10', difficulty: 'standard',
          question: 'Pregnancy is the physiological state in a female mammal beginning from the.',
          hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System) for uterine structure and.',
          misconception: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pregnancy is the physiological state in a female mammal beginning from the implantation',
                  options: ['Pregnancy is the physiological state in a female mammal beginning from the implantation', 'Meiosis is a specialized type of cell division that reduces the chromosome number by', 'Sexual reproduction in animals is a biological process where two parents contribute', 'The human reproductive system is a collection of specialized organs and structures in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange and its gut for.' }
          ],
            remediations: { 'the-embryo-breathes-and-eats': { steps: ['Show a diagram of fetal circulation highlighting the foramen ovale, ductus arteriosus, and umbilical vessels — ask:.', 'Trace the path: umbilical vein → ductus venosus → IVC → right atrium → foramen ovale → left atrium → left ventricle →.', 'Contrast with adult circulation.', 'Have the student explain in their own words why the placenta, not the lungs, is the respiratory organ during pregnancy.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The embryo receives oxygen and nutrients directly from the mother\'s blood because their blood mixes in the placenta." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'breathes', 'the embryo "breathes" and "eats" like a newborn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange and its gut for.' }
          ],
            remediations: { 'the-embryo-breathes-and-eats': { steps: ['Show a diagram of fetal circulation highlighting the foramen ovale, ductus arteriosus, and umbilical vessels — ask:.', 'Trace the path: umbilical vein → ductus venosus → IVC → right atrium → foramen ovale → left atrium → left ventricle →.', 'Contrast with adult circulation.', 'Have the student explain in their own words why the placenta, not the lungs, is the respiratory organ during pregnancy.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_4', difficulty: 'standard',
          question: 'Meiosis is a specialized type of cell division that reduces the chromosome.',
          hint: 'Revisit "homologous chromosomes vs sister chromatids" using the pipe-cleaner model from.',
          misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).',
          parts: [
                { id: 'a', prompt: 'Why is meiosis referred to as "reduction division"? Explain what would happen to the chromosome number in successive generations if meiosis did not occur.', answer: 'Meiosis is called reduction division',
                  options: ['Meiosis is called reduction division', 'haploid', 'half the DNA content'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' },
                { id: 'b', prompt: 'A human somatic cell contains 46 chromosomes. How many chromosomes will be present in a human sperm cell and in a zygote immediately after fertilization?', answer: 'Sperm cell = 23 chromosomes (haploid, n)',
                  options: ['Sperm cell = 23 chromosomes (haploid, n)', 'haploid', 'half the DNA content'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' },
                { id: 'c', prompt: 'Compare meiosis and mitosis on three parameters: (a) number of daughter cells produced, (b) chromosome number in daughter cells relative to parent, (c) genetic.', answer: 'number of daughter cells produced, (',
                  options: ['number of daughter cells produced, (', 'haploid', 'half the DNA content'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' }
          ],
            remediations: { 'meiosis-produces-two-cells-like': { steps: ['Use a pipe-cleaner chromosome model (two colors for maternal/paternal).', 'Simulate Meiosis I: pair homologs, show crossing over, separate homologs → two cells, each with replicated chromosomes.', 'Simulate Meiosis II: separate sister chromatids → four cells, each with single chromatids (now chromosomes).', 'Count chromosomes at each stage.', 'Emphasize: DNA replicates *once* (pre-Meiosis I), divisions happen *twice*.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).',
          parts: [
                { id: 'a', prompt: 'A student claims: "Meiosis occurs in all body cells of an organism to replace worn-out cells." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'haploid', 'half the DNA content', 'half the chromosome *sets*'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' }
          ],
            remediations: { 'meiosis-produces-two-cells-like': { steps: ['Use a pipe-cleaner chromosome model (two colors for maternal/paternal).', 'Simulate Meiosis I: pair homologs, show crossing over, separate homologs → two cells, each with replicated chromosomes.', 'Simulate Meiosis II: separate sister chromatids → four cells, each with single chromatids (now chromosomes).', 'Count chromosomes at each stage.', 'Emphasize: DNA replicates *once* (pre-Meiosis I), divisions happen *twice*.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_8', difficulty: 'standard',
          question: 'Sexual reproduction in animals is a biological process where two parents.',
          hint: 'Review c9_bio_ch3_4 (meiosis steps and significance) and c6_biology_ch06_006 (hormonal.',
          misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that.',
          parts: [
                { id: 'a', prompt: 'Name the primary sex organs (gonads) in male and female vertebrates and state the type of gamete each produces.', answer: 'Male gonad: testis (produces sperm/male gamete)',
                  options: ['Male gonad: testis (produces sperm/male gamete)', 'testis produces testosterone', 'ovary produces estrogen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' },
                { id: 'b', prompt: 'Explain why sperm are produced continuously in large numbers throughout adult life in males, while ova are produced in limited numbers with a fixed reserve.', answer: 'Spermatogenesis is continuous from puberty',
                  options: ['Spermatogenesis is continuous from puberty', 'males produce more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' },
                { id: 'c', prompt: 'A male mammal has a blockage in both vas deferentia (sperm ducts).', answer: 'Absent: sperm (produced in testes, transported via vas deferens)',
                  options: ['Absent: sperm (produced in testes, transported via vas deferens)', 'no semen at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' }
          ],
            remediations: { 'in-all-animals': { steps: ['Show comparative diagrams of reproductive tracts of human, dog, bird, frog side-by-side (use NCERT Class 9 textbook.', 'Trace sperm path in each using different colored pens - highlight where sperm is deposited (vagina vs cloaca vs water).', 'Trace ovum path - highlight fertilization site (ampulla of fallopian tube vs infundibulum vs water).', 'Create a table: Animal | Copulatory organ | Sperm deposition site | Fertilization site | Egg laying/giving birth.', 'Ask student to explain why "vagina" is not a universal term for sperm deposition site.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_9', difficulty: 'standard',
          question: 'The human reproductive system is a collection of specialized organs and.',
          hint: 'Review the HPG axis feedback loops (negative feedback of testosterone/estrogen on.',
          misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically.',
          parts: [
                { id: 'a', prompt: 'Explain why the testes are located outside the abdominal cavity in the scrotum, and what would happen if they remained inside the body.', answer: 'The testes are located in the scrotum',
                  options: ['The testes are located in the scrotum', 'for protection', 'to make space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' }
          ],
            remediations: { 'the-ovary-is-directly-connected': { steps: ['Show a labeled diagram of the ovarian-fimbrial region highlighting the gap between ovary and tube.', 'Demonstrate with a simple model - a balloon (ovary) releasing a marble (ovum) near a fringed tube (fimbriae) - showing.', 'Have student trace the path of ovum on a diagram, labeling "fimbriae capture" as a distinct step.', 'Ask: "If fimbriae are scarred by PID, what happens to the ovum?'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The uterus is where the baby grows, so it must be the most important organ in the female reproductive system." Evaluate this statement using.', answer: 'The statement is biologically incomplete',
                  options: ['The statement is biologically incomplete', 'most important', 'justify'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' }
          ],
            remediations: { 'the-ovary-is-directly-connected': { steps: ['Show a labeled diagram of the ovarian-fimbrial region highlighting the gap between ovary and tube.', 'Demonstrate with a simple model - a balloon (ovary) releasing a marble (ovum) near a fringed tube (fimbriae) - showing.', 'Have student trace the path of ovum on a diagram, labeling "fimbriae capture" as a distinct step.', 'Ask: "If fimbriae are scarred by PID, what happens to the ovum?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
