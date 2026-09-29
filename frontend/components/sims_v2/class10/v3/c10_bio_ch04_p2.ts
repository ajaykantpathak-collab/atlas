import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch04_p2: SimDef = {
    id: 'v3_c10_bio_ch04_p2',
    title: 'Heredity and Evolution',
    subtitle: 'Why you have your grandmother\'s eyes — and how small changes over millennia built every species alive.',
    classLevel: 10, subject: 'biology', topic: 'Heredity and Evolution',
    chapters: ['c10_bio_ch04'],
    nodeIds: ['c10_bio_cbse_04_007', 'c10_bio_cbse_04_008', 'c10_bio_cbse_04_009', 'c10_bio_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a genetic counsellor explaining a family trait', intro: 'A couple asks why their child has a trait neither parent shows. Your job: trace the recessive allele that hid for a generation.', goal: 'Predict trait inheritance with Punnett logic and explain how selection turns small variations into new species.' },
    discovery: {
        question: 'Two brown-eyed parents have a blue-eyed child. Neither parent\'s eyes are blue — so whose eyes did the child inherit?',
        options: ['Both parents carried a hidden blue-eye gene', 'A grandparent\'s gene skipped generations', 'The mutation happened at birth', 'Eye colour isn\'t inherited'],
        answer: 'Both parents carried a hidden blue-eye gene',
        hook: 'Recessive traits don\'t vanish — they hide. Two carriers can both look one way while silently carrying the other.',
    },
    teaching: [
        { title: 'Charles Darwin\'s Theory of Evolution by Natural Selection', text: 'Charles Darwin\'s Theory of Evolution by Natural Selection states that populations of organisms change over generations through the differential survival and reproduction of individuals due.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_04_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'On the heredity lab: cross two heterozygous parents and watch the 3:1 ratio emerge from hundreds of offspring.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_007', title: 'Charles Darwin\'s Theory of Evolution by Natural Selection',
          caseStudy: { intro: 'Begin with a familiar observation: the rapid spread of pesticide resistance in mosquitoes in Indian villages or antibiotic resistance in bacteria causing.',
            decisions: [{ prompt: 'State the four postulates of Darwin\'s theory of natural selection in the correct logical sequence.', options: [
                { text: 'The four postulates in sequence are: (1) Individuals within a population show variation', outcome: 'The four postulates in sequence are: (1) Individuals within a population show variation in traits.' },
                { text: 'survival of fittest', outcome: 'Not quite — Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive.', reveals: 'survival-of-the-fittest-means' },
                { text: 'survival of the fittest', outcome: 'Not quite — Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive.', reveals: 'survival-of-the-fittest-means' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_008', title: 'Speciation: Natural Selection, Isolation and Origin of Species',
          caseStudy: { intro: 'Observe how the common Indian bullfrog (Hoplobatrachus tigerinus) and the Indian cricket frog (Fejervarya limnocharis) live in the same pond but never.',
            decisions: [{ prompt: 'Define speciation and state the two essential conditions required for it to occur.', options: [
                { text: 'Speciation is the formation of new and distinct species in the course of evolution', outcome: 'Speciation is the formation of new and distinct species in the course of evolution.' },
                { text: 'evolution', outcome: 'Not quite — Students think speciation is an event that happens to an individual organism (e.g., "a mutant frog.', reveals: 'speciation-is-an-event-that' },
                { text: 'variation', outcome: 'Not quite — Students think speciation is an event that happens to an individual organism (e.g., "a mutant frog.', reveals: 'speciation-is-an-event-that' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_009', title: 'Evolution and Fossils: Evidence of Evolution and Dating',
          scaffold: { problem: 'A paleontologist discovers a fossilized femur in a sandstone layer sandwiched between two volcanic ash layers.',
            steps: [
            { text: 'Identify the dating method — volcanic ash contains potassium feldspar suitable for K-Ar dating (half-life 1.25 billion.' },
            { text: 'Apply the law of superposition — the fossil layer is younger than the lower ash (2.1 Ma) and older than the upper ash.' },
            { text: 'State the fossil\'s age constraint — it must be between 2.1 and 1.8 million years old (a 300,000-year window).' },
            { text: 'Connect morphology to evolution — *Homo erectus* fossils dated 1.9–1.8 Ma in East Africa show larger brain cases; this.' },
            { text: 'Conclude — bracketing by datable volcanic layers provides a precise relative+absolute age, allowing placement in the.', faded: true, blankAnswer: 'The fossil is 1.8–2.1 million years old. Its mix.' }
            ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_010', title: 'Evolution vs Progress: Why Evolution Is Not Directional',
          caseStudy: { intro: 'Observe a bacterium and a human being — both are alive today, both have survived 3.5 billion years of evolutionary history.',
            decisions: [{ prompt: 'State the precise scientific definition of "evolution" as used in modern biology, and explain why the phrase "evolution is progress toward.', options: [
                { text: 'Evolution is the change in allele frequencies in a population over generations due to', outcome: 'Evolution is the change in allele frequencies in a population over generations due to natural.' },
                { text: 'evolution means improvement', outcome: 'Not quite — Students believe evolution is a linear ladder from "lower" to "higher" forms, with humans at the.', reveals: 'evolution-is-a-linear-ladder' },
                { text: 'humans are the peak of evolution', outcome: 'Not quite — Students believe evolution is a linear ladder from "lower" to "higher" forms, with humans at the.', reveals: 'evolution-is-a-linear-ladder' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Heredity and Evolution · Part 2/2', spots: [
            { id: 's1', label: 'Charles Darwins Theory of Evolution by Natural Selection', prompt: 'Which idea is this? — Charles Darwin\'s Theory of Evolution by Natural Selection states that populations.', answer: 'Charles Darwins Theory of Evolution by Natural Selection', options: ['Charles Darwins Theory of Evolution by Natural Selection', 'Speciation Natural Selection Isolation and Origin of Species', 'Evolution and Fossils Evidence of Evolution and Dating', 'Evolution vs Progress Why Evolution Is Not Directional'] },
            { id: 's2', label: 'Speciation Natural Selection Isolation and Origin of Species', prompt: 'Which idea is this? — Speciation is the evolutionary process by which populations evolve to become distinct.', answer: 'Speciation Natural Selection Isolation and Origin of Species', options: ['Speciation Natural Selection Isolation and Origin of Species', 'Charles Darwins Theory of Evolution by Natural Selection', 'Evolution and Fossils Evidence of Evolution and Dating', 'Evolution vs Progress Why Evolution Is Not Directional'] },
            { id: 's3', label: 'Evolution and Fossils Evidence of Evolution and Dating', prompt: 'Which idea is this? — Fossils are preserved remains or traces of organisms that lived in the past, providing.', answer: 'Evolution and Fossils Evidence of Evolution and Dating', options: ['Evolution and Fossils Evidence of Evolution and Dating', 'Charles Darwins Theory of Evolution by Natural Selection', 'Speciation Natural Selection Isolation and Origin of Species', 'Evolution vs Progress Why Evolution Is Not Directional'] },
            { id: 's4', label: 'Evolution vs Progress Why Evolution Is Not Directional', prompt: 'Which idea is this? — Evolution is a non-directional process of change in heritable characteristics.', answer: 'Evolution vs Progress Why Evolution Is Not Directional', options: ['Evolution vs Progress Why Evolution Is Not Directional', 'Charles Darwins Theory of Evolution by Natural Selection', 'Speciation Natural Selection Isolation and Origin of Species', 'Evolution and Fossils Evidence of Evolution and Dating'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'Scientists can now edit genes in crops to make them drought-resistant — feeding more people on less water. Critics worry about unknown long-term effects on ecosystems and who owns the seeds.',
            decisions: [{ prompt: 'Should India bet big on gene-edited crops?', options: [
                { text: 'Yes — climate change won\'t wait for perfect certainty', outcome: 'This bets on scientific evidence and urgent need; the risk is accepting unknowns that only time reveals.' },
                { text: 'Yes, but with public seed ownership', outcome: 'This accepts the science while protecting farmers from corporate control — harder to fund, fairer to share.' },
                { text: 'No — protect existing ecosystems first', outcome: 'This chooses caution, but caution has a cost: farmers facing failed monsoons don\'t get the option of certainty either.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family dinner, an uncle learns that a child has blood group O while the parents are A and B. He jokes that the hospital must have mixed up the babies, since \'blood group always comes from the parents.\'',
            decisions: [{ prompt: 'Is the uncle right to be suspicious?', options: [
                { text: 'No mix-up is needed. If the mother is I-A-i and the father is I-B-i, each can pass the recessive i allele, and a child getting i from both is group O. Gametes carry only one allele each, so A and B parents can have an O child.', outcome: 'This is ordinary Mendelian inheritance — recessive alleles can hide in parents and reappear in children. ABO involves three alleles with codominance, so many combinations are possible.' },
                { text: 'He is right — a child\'s blood group must always match one of the parents, so an O child from A and B parents is impossible.', outcome: 'That ignores recessive alleles. Parents who each carry a hidden i allele produce an O child one time in four on average.', reveals: 'blood-group-must-match-parent' },
                { text: 'The child\'s group is just a blend of A and B, and O is what the blend looks like.', outcome: 'Blending inheritance is wrong — alleles stay discrete and separate into gametes; O is not a mixture but the result of inheriting two i alleles.', reveals: 'blending-inheritance' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You are the running total of every inheritance since life began — heredity explains your eyes, and evolution explains why eyes exist at all.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_007', difficulty: 'standard',
          question: 'Charles Darwin\'s Theory of Evolution by Natural Selection states that.',
          hint: 'Revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and c10_bio_cbse_04_001.',
          misconception: 'Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive individuals survive.',
          parts: [
                { id: 'a', prompt: 'In a hospital, a patient is treated with antibiotic X for a bacterial infection. After 3 days, symptoms return.', answer: 'Step 1: Bacterial population has random mutations',
                  options: ['Step 1: Bacterial population has random mutations', 'bacteria mutate because they need to resist the antibiotic', 'survival of the fittest', 'strongest'],
                  hint: 'Revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive individuals survive.' },
                { id: 'b', prompt: 'Compare and contrast Darwin\'s natural selection and Lamarck\'s inheritance of acquired characters using the example of giraffe neck length.', answer: 'Darwin: (i) Random genetic variation exists in neck length',
                  options: ['Darwin: (i) Random genetic variation exists in neck length', 'Darwin says stretching causes longer necks', 'survival of the fittest', 'strongest'],
                  hint: 'Revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive individuals survive.' }
          ],
            remediations: { 'survival-of-the-fittest-means': { steps: ['Ask the student to define "fitness" in their own words.', 'If they mention strength/size, give the frog counterexample.', 'Show a CBSE sample question: "In a drought, finches with larger beaks survive better.', 'Have them rewrite the answer using "reproductive success" instead of "strength".'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive individuals survive.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Natural selection creates new traits that help organisms survive." Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'explain', 'survival of the fittest', 'strongest'],
                  hint: 'Revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive individuals survive.' },
                { id: 'b', prompt: 'Design a simple thought experiment (no lab needed) to demonstrate that natural selection requires heritable variation.', answer: 'Thought experiment: Population of 100 imaginary insects on grey bark',
                  options: ['Thought experiment: Population of 100 imaginary insects on grey bark', 'survival of the fittest', 'strongest'],
                  hint: 'Revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students believe that "survival of the fittest" means the strongest, biggest, or most aggressive individuals survive.' }
          ],
            remediations: { 'survival-of-the-fittest-means': { steps: ['Ask the student to define "fitness" in their own words.', 'If they mention strength/size, give the frog counterexample.', 'Show a CBSE sample question: "In a drought, finches with larger beaks survive better.', 'Have them rewrite the answer using "reproductive success" instead of "strength".'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_008', difficulty: 'standard',
          question: 'Speciation is the evolutionary process by which populations evolve to become.',
          hint: 'Revisit c10_bio_cbse_04_001 (variation accumulation) and c10_bio_cbse_04_007 (natural.',
          misconception: 'Students think speciation is an event that happens to an individual organism (e.g., "a mutant frog gives birth to a new.',
          parts: [
                { id: 'a', prompt: 'A population of beetles lives on a mountain range. A river changes course and splits the population into two groups that cannot cross.', answer: 'This is allopatric speciation',
                  options: ['This is allopatric speciation', 'they became different species', 'a mutant frog gives birth to a new species', 'acquired traits'],
                  hint: 'Revisit c10_bio_cbse_04_001 (variation accumulation) and c10_bio_cbse_04_007 (natural selection).',
                  misconception: 'Students think speciation is an event that happens to an individual organism (e.g., "a mutant frog gives birth to a new species").' },
                { id: 'b', prompt: 'In a population of flowering plants, some individuals flower in March and others in May due to a genetic mutation. They are pollinated by the same bee species.', answer: 'This is temporal isolation (a pre-zygotic barrier)',
                  options: ['This is temporal isolation (a pre-zygotic barrier)', 'a mutant frog gives birth to a new species', 'acquired traits', 'speciation is an event that happens to an individual organism (e'],
                  hint: 'Revisit c10_bio_cbse_04_001 (variation accumulation) and c10_bio_cbse_04_007 (natural selection).',
                  misconception: 'Students think speciation is an event that happens to an individual organism (e.g., "a mutant frog gives birth to a new species").' }
          ],
            remediations: { 'speciation-is-an-event-that': { steps: ['Revisit c10_bio_cbse_04_001 (variation accumulation) and c10_bio_cbse_04_007 (natural selection) to reinforce that.', 'Use a physical analogy — show a video of a single population splitting (e.g., by a river model in a tray) and track how.', 'Have the student write a 3-sentence explanation of why a single mutated butterfly does not constitute a new species.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_009', difficulty: 'standard',
          question: 'Fossils are preserved remains or traces of organisms that lived in the past.',
          hint: 'If stuck on half-life calculations, revisit Class 9 chemistry (c9_chemistry_ch1_2) decay.',
          misconception: 'Students often think "fossil dating gives an exact birthday" — they treat radiometric dates as precise calendar years.',
          parts: [
                { id: 'a', prompt: 'A fossilized bone contains 12.5% of its original carbon-14. Given carbon-14 half-life is 5730 years, calculate the fossil\'s approximate age.', answer: '12.5% remaining means 3 half-lives passed (100% → 50% → 25% → 12.5%)',
                  options: ['12.5% remaining means 3 half-lives passed (100% → 50% → 25% → 12.5%)', 'dinosaur bones are too old', 'fossil dating gives an exact birthday', 'this fossil is 1,234,567 years old'],
                  hint: 'If stuck on half-life calculations, revisit Class 9 chemistry (c9_chemistry_ch1_2) decay.',
                  misconception: 'Students often think "fossil dating gives an exact birthday" — they treat radiometric dates as precise calendar years (e.g., "this fossil.' },
                { id: 'b', prompt: 'The forelimb bones of a bat, whale, and human show similar arrangement (humerus, radius, ulna, carpals, metacarpals, phalanges) but different functions.', answer: 'The claim is partially correct but misleading',
                  options: ['The claim is partially correct but misleading', 'yes, they are closely related', 'fossil dating gives an exact birthday', 'this fossil is 1,234,567 years old'],
                  hint: 'If stuck on half-life calculations, revisit Class 9 chemistry (c9_chemistry_ch1_2) decay.',
                  misconception: 'Students often think "fossil dating gives an exact birthday" — they treat radiometric dates as precise calendar years (e.g., "this fossil.' }
          ],
            remediations: { 'fossil-dating-gives-an-exact': { steps: ['Use a decay simulation (e.g., 100 pennies = parent atoms; shake, remove heads = decayed; repeat) to visualize half-life.', 'Show a stratigraphic column diagram with an unconformity (erosion gap) — ask "how many years are missing?" to highlight.', 'Practice calculating age ranges: if C-14 date = 12,000 ± 150 BP, write "11,850 – 12,150 years ago".', 'Revisit Class 9 fossil formation (c9_bio_ch4_9) — emphasize mineralization replaces original material, so dating the.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_010', difficulty: 'standard',
          question: 'Evolution is a non-directional process of change in heritable characteristics.',
          hint: 'If stuck, revisit c10_bio_cbse_04_007 (Darwin\'s natural selection mechanism) and practice.',
          misconception: 'Students believe evolution is a linear ladder from "lower" to "higher" forms, with humans at the top.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Bacteria are primitive and simple, while humans are advanced and complex.', answer: 'Error 1: "Primitive" and "simple" are value-laden terms',
                  options: ['Error 1: "Primitive" and "simple" are value-laden terms', 'Primitive', 'simple', 'more evolved'],
                  hint: 'If stuck, revisit c10_bio_cbse_04_007 (Darwin\'s natural selection mechanism) and practice.',
                  misconception: 'Students believe evolution is a linear ladder from "lower" to "higher" forms, with humans at the top.' }
          ],
            remediations: { 'evolution-is-a-linear-ladder': { steps: ['Have the student list 5 living organisms (e.g., E. coli, mushroom, fern, earthworm, crow).', 'For each, research *one* specific adaptation that makes it supremely fit for its niche (e.g., E.', 'Ask: "Which adaptation is \'better\'?" — the answer is *none*; each is fit for *its* environment.', 'Show a branching phylogenetic tree (not a ladder) and trace lineages — all living tips are equidistant from the root.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
