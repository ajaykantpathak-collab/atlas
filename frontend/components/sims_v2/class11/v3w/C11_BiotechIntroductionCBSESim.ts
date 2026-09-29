import type { SimDef } from '../../engine/types';
import C11_BiotechIntroductionCBSESim from '../../../simulations/c6_12_new/C11_BiotechIntroductionCBSESim';

/** v3 wrapped master — C11_BiotechIntroductionCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechintroductioncbsesim: SimDef = {
    id: 'v3w_c11_biotechintroductioncbsesim',
    title: 'Ethical Issues in Biotechnology: Bioethics',
    subtitle: 'This node covers the four core bioethical principles, their application to GM crops, gene.',
    classLevel: 11, subject: 'biotechnology', topic: 'Ethical Issues in Biotechnology: Bioethics',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_01_009', 'c11_biotech_cbse_01_010', 'c11_biotech_cbse_01_011', 'c11_biotech_cbse_07_003', 'c11_biotech_cbse_01_001', 'c11_biotech_cbse_01_002', 'c11_biotech_cbse_01_003', 'c11_biotech_cbse_01_004', 'c11_biotech_cbse_01_006', 'c11_biotech_cbse_01_007', 'c11_biotech_cbse_01_008', 'c11_biotech_cbse_07_001', 'c11_biotech_cbse_07_002', 'c11_biotech_cbse_07_006', 'c11_biotech_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a 17-year-old student in Punjab reads about "Golden Rice" engineered to produce beta-carotene to.', goal: 'Master Ethical Issues in Biotechnology: Bioethics.' },
    discovery: {
        question: 'A student claims: "Since *E. coli* K-12 is a Risk Group 1 organism, any recombinant DNA experiment using this host can be performed at BSL-1 without IBSC.',
        options: ['The statement is incorrect', 'rDNA technology use', 'Biosafety Level'],
        answer: 'The statement is incorrect',
        hook: 'Students believe "Biosafety Level" is determined *solely* by the pathogenicity of the *wild-type host organism* (e.g.,.',
    },
    teaching: [
        { title: 'Bioethics in biotechnology is the systematic.', text: 'Bioethics in biotechnology is the systematic study of ethical principles—autonomy, beneficence, non-maleficence, and justice—applied to evaluate the moral permissibility of manipulating living.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_009', title: 'Bioethics in biotechnology is the.',
          scaffold: { problem: 'A state agricultural university proposes releasing a GM mustard variety (DMH-11) engineered for hybrid vigor using barnase/barstar system.',
            steps: [
            { text: 'Identify all stakeholders—smallholder farmers (majority), seed company (public sector here), consumers, agricultural.' },
            { text: 'Map each stakeholder\'s interests to the four principles: Farmers\' seed-saving = Autonomy/Justice; Yield increase =.' },
            { text: 'Assess evidence quality for each claim: Independent yield trials? Long-term ecotoxicity data?' },
            { text: 'Identify principle conflicts: Autonomy (farmer choice) vs. Beneficence (national food security); Non-maleficence.' },
            { text: 'Apply proportionality and precaution: Are there less risky alternatives (marker-assisted breeding, agroecology)?' },
            { text: 'Formulate a conditional position: "Conditional approval with mandatory post-release monitoring, liability fund for.', faded: true, blankAnswer: 'Structured ethical analysis concluding that conditional.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_010', title: 'Biosafety refers to the principles,.',
          scaffold: { problem: 'A university lab plans to clone the gene for Green Fluorescent Protein (GFP) from jellyfish into a plasmid vector and transform it into *E.',
            steps: [
            { text: 'Identify the activity: This is recombinant DNA (rDNA) work (gene cloning, vector propagation in host).' },
            { text: 'Consult DBT Recombinant DNA Safety Guidelines (1990), Section 4.2: "All rDNA work shall be conducted at Biosafety Level.' },
            { text: 'Determine the Biosafety Level: Minimum **BSL-2** is mandatory for all rDNA work in India.' },
            { text: 'Identify regulatory approval: **IBSC (Institutional Biosafety Committee)** approval is mandatory *before* initiation of.' },
            { text: 'Assess the specific procedure (plasmid prep with vacuum manifold): Vacuum manifolds generate aerosols.' },
            { text: 'Verify administrative controls: Lab must have restricted access, biohazard signage, autoclave for waste, and personnel.', faded: true, blankAnswer: 'Minimum BSL-2; Mandatory IBSC approval before start; Class.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_011', title: 'Intellectual Property Rights (IPR) in.',
          scaffold: { problem: 'A research team at an Indian university has developed a novel thermostable xylanase enzyme from a genetically modified *Aspergillus niger*.',
            steps: [
            { text: 'Invention disclosure and prior art search—The team submits an invention disclosure form to the university\'s IP cell.' },
            { text: 'Assess patentability—Verify the invention meets all three criteria: Novelty (no identical enzyme sequence or production.' },
            { text: 'Draft provisional specification—Prepare a provisional application (Form 1, Form 2) describing the enzyme, gene.' },
            { text: 'File complete specification within 12 months—Within 12 months of provisional filing (by 15 March 2025 if provisional.' },
            { text: 'Publication and request for examination—Application publishes automatically at 18 months from priority date (or earlier.' },
            { text: 'First Examination Report (FER) and response—IPO examines for patentability, formalities, and Section 3 compliance.' },
            { text: 'Hearing and grant—If objections persist, hearing scheduled. On compliance, patent granted (Form 7), published in Patent.' },
            { text: 'Post-grant—Maintain patent by paying renewal fees; enforce against infringers; consider PCT filing within 12 months for.', faded: true, blankAnswer: 'Complete patent filing procedure with 8 steps, statutory.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_07_003', title: 'RNA polymerase is a DNA-dependent RNA.',
          scaffold: { problem: 'A geneticist isolates a temperature-sensitive mutant of E. coli that fails to transcribe heat-shock genes at 42°C but transcribes.',
            steps: [
            { text: 'Identify the key players: σ⁷⁰ (housekeeping sigma factor) recognizes consensus -35/-10 promoters; σ³² (heat-shock sigma.' },
            { text: 'Recognize that sigma factors confer promoter specificity to the same core RNA polymerase (α₂ββ\').' },
            { text: 'Analyze the mutation: A temperature-sensitive substitution in σ³² likely destabilizes its domain 2 (recognizes -10.' },
            { text: 'Predict the outcome: At 42°C, mutant σ³² cannot bind heat-shock promoters → no heat-shock transcription → cell dies.' },
            { text: 'Verify with experimental logic: This matches classic σ³² mutants (e.g., rpoH mutants) that are viable at 30°C but.', faded: true, blankAnswer: 'The mutation disrupts σ³²\'s promoter recognition domain at.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_001', title: 'Biotechnology is the interdisciplinary.',
          scaffold: { problem: 'A Class 11 student visits a dairy farm in Anand, Gujarat. They observe: (1) Cows selectively bred for high milk yield over 20 generations.',
            steps: [
            { text: 'Identify the core technological action in each practice. Practice 1: Selecting parents with desired trait (high milk).' },
            { text: 'Map each action to the historical phase definition. Ancient = domestication/selective breeding without knowledge of.' },
            { text: 'Classify. Practice 1 → Ancient (selective breeding of cattle, Paleolithic-era technology).' },
            { text: 'Verify against textbook criteria. Textbook: "Ancient: domestication of sheep/cattle...' },
            { text: 'Articulate the key differentiator. The differentiator is **genetic knowledge and control**: Ancient (phenotype.' },
            { text: 'Formulate final answer with terminology. Use precise terms: "Selective breeding," "Microbial fermentation,".', faded: true, blankAnswer: '(1) Selective breeding of cows → **Ancient Biotechnology**.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_002', title: 'Historical Development of Biotechnology.',
          scaffold: { problem: 'A Class 11 student is asked: "Arrange these events in chronological order and calculate the time gap between each consecutive pair: (a).',
            steps: [
            { text: 'List events with years: Ereky (1917), Hershey-Chase (1952), Watson-Crick (1953), Cohen-Boyer (1973), Humulin (1982).' },
            { text: 'Sort chronologically: 1917, 1952, 1953, 1973, 1982.' },
            { text: 'Calculate gaps: 1952-1917=35 years; 1953-1952=1 year; 1973-1953=20 years; 1982-1973=9 years.' },
            { text: 'Analyze gap (c)→(d): 1953-1973 = 20 years. Reason: DNA structure known, but tools to cut/paste DNA (restriction.' },
            { text: 'Analyze gap (d)→(e): 1973-1982 = 9 years. Reason: rDNA technique invented (1973) → first human protein expressed in.' },
            { text: 'Synthesize: History shows "long gestation of fundamental knowledge, rapid deployment once enabling technology matures."', faded: true, blankAnswer: 'Chronological order: (a) 1917, (b) 1952, (c) 1953, (d).' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_01_010', title: 'Identify each idea',
          dissect: { specimen: 'Ethical Issues in Biotechnology: Bioethics', spots: [
            { id: 's1', label: 'Bioethics in biotechnology is the', prompt: 'Which idea is this? — Bioethics in biotechnology is the systematic study of ethical principles—autonomy,.', answer: 'Bioethics in biotechnology is the', options: ['Bioethics in biotechnology is the', 'Biosafety refers to the principles', 'Intellectual Property Rights IPR in', 'RNA polymerase is a DNA-dependent'] },
            { id: 's2', label: 'Biosafety refers to the principles', prompt: 'Which idea is this? — Biosafety refers to the principles, practices, and containment measures applied to.', answer: 'Biosafety refers to the principles', options: ['Biosafety refers to the principles', 'Bioethics in biotechnology is the', 'Intellectual Property Rights IPR in', 'RNA polymerase is a DNA-dependent'] },
            { id: 's3', label: 'Intellectual Property Rights IPR in', prompt: 'Which idea is this? — Intellectual Property Rights (IPR) in biotechnology are legal rights that protect.', answer: 'Intellectual Property Rights IPR in', options: ['Intellectual Property Rights IPR in', 'Bioethics in biotechnology is the', 'Biosafety refers to the principles', 'RNA polymerase is a DNA-dependent'] },
            { id: 's4', label: 'RNA polymerase is a DNA-dependent', prompt: 'Which idea is this? — RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA molecules.', answer: 'RNA polymerase is a DNA-dependent', options: ['RNA polymerase is a DNA-dependent', 'Bioethics in biotechnology is the', 'Biosafety refers to the principles', 'Intellectual Property Rights IPR in'] },
            { id: 's5', label: 'Biotechnology is the interdisciplinary application', prompt: 'Which idea is this? — Biotechnology is the interdisciplinary application of scientific and engineering.', answer: 'Biotechnology is the interdisciplinary application', options: ['Biotechnology is the interdisciplinary application', 'Bioethics in biotechnology is the', 'Biosafety refers to the principles', 'Intellectual Property Rights IPR in'] },
            { id: 's6', label: 'Historical Development of Biotechnology is', prompt: 'Which idea is this? — Historical Development of Biotechnology is the chronological progression from ancient.', answer: 'Historical Development of Biotechnology is', options: ['Historical Development of Biotechnology is', 'Bioethics in biotechnology is the', 'Biosafety refers to the principles', 'Intellectual Property Rights IPR in'] }
          ] } }
    ],
    explore: { component: C11_BiotechIntroductionCBSESim, prompt: 'Explore the interactive — Ethical Issues in Biotechnology: Bioethics' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_009', difficulty: 'standard',
          question: 'Bioethics in biotechnology is the systematic study of ethical.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_005 (Bt cotton mechanism) and.',
          misconception: 'Students equate "bioethics" with "personal moral opinion" or "religious belief," leading them to argue "I feel GMOs are.',
          parts: [
                { id: 'a', prompt: 'A biotech company develops a drought-tolerant GM maize variety and patents the seed. Farmers must sign contracts prohibiting seed saving.', answer: 'Justice requires fair distribution of benefits and burdens',
                  options: ['Justice requires fair distribution of benefits and burdens', 'farmers can choose not to buy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "bioethics" with "personal moral opinion" or "religious belief," leading them to argue "I feel GMOs are wrong" or "My.' }
          ],
            remediations: { 'students-equate-bioethics-with-personal': { steps: ['Give the student a 2×2 matrix with the four principles as rows and a concrete case (e.g., gene-drive mosquitoes to.', 'Ask them to fill one specific concern per cell—e.g., Autonomy: "Communities cannot opt out of gene drive spread";.', 'Have them identify which two principles conflict most sharply and write one sentence justifying which should prevail.', 'Repeat with a second case (e.g., GM mustard) to reinforce that the framework is portable, not case-specific.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_010', difficulty: 'standard',
          question: 'Biosafety refers to the principles, practices, and containment measures applied.',
          hint: 'If stuck, revisit the rDNA technology workflow (Fig 1.1 in NCERT) in node.',
          misconception: 'Students believe "Biosafety Level" is determined *solely* by the pathogenicity of the *wild-type host organism* (e.g.,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since *E. coli* K-12 is a Risk Group 1 organism, any recombinant DNA experiment using this host can be performed at BSL-1 without IBSC.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'rDNA technology use', 'Biosafety Level'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Biosafety Level" is determined *solely* by the pathogenicity of the *wild-type host organism* (e.g., "*E.' }
          ],
            remediations: { 'biosafety-level-is-determined-solely': { steps: ['If a student exhibits this misconception: 1.', '**Show the regulatory text**: Quote DBT Recombinant DNA Safety Guidelines (1990), Section 4.2: "All rDNA work shall be.', '**Walk through a counter-example**: "You clone the gene for *Botulinum toxin* into *E.', 'No, it produces a lethal neurotoxin.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_011', difficulty: 'standard',
          question: 'Intellectual Property Rights (IPR) in biotechnology are legal rights that.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_005 (GM crops) and c11_biotech_cbse_01_006.',
          misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Intellectual Property Rights (IPR) in biotechnology are legal rights that protect',
                  options: ['Intellectual Property Rights (IPR) in biotechnology are legal rights that protect', 'Bioethics in biotechnology is the systematic study of ethical principles—autonomy,', 'Biosafety refers to the principles, practices, and containment measures applied to', 'RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA molecules'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false because: (a) Section.' }
          ],
            remediations: { 'any-genetically-modified-organism-is': { steps: ['If a student holds this misconception, guide them through a three-step correction: (1) Read Section 3(j) of the Patents.', 'a transgenic plant (not patentable under Patents Act)—and identify the statutory basis for each outcome; (3) Work.', 'Union of India* (2013) Supreme Court judgment on Section 3(d) to see how "enhanced efficacy" is interpreted for biotech.', 'Emphasize that patentability is claim-specific: the *method* of making a GM crop may be patented even if the crop.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "India\'s Patents Act allows patenting of genetically modified crops but not the genes inserted into them." Justify your.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'any genetically modified organism is automatically patentable in India', '"any genetically modified organism is automatically patentable in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false because: (a) Section.' },
                { id: 'b', prompt: 'Design a prior art search strategy for a patent application claiming a novel CRISPR-Cas9 guide RNA sequence targeting a specific mutation in the *HBB* gene for.', answer: 'Strategy: (1) Databases—Indian Patent Office (IPO), WIPO Patentscope, USPTO, EPO',
                  options: ['Strategy: (1) Databases—Indian Patent Office (IPO), WIPO Patentscope, USPTO, EPO', 'any genetically modified organism is automatically patentable in India', '"any genetically modified organism is automatically patentable in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false because: (a) Section.' }
          ],
            remediations: { 'any-genetically-modified-organism-is': { steps: ['If a student holds this misconception, guide them through a three-step correction: (1) Read Section 3(j) of the Patents.', 'a transgenic plant (not patentable under Patents Act)—and identify the statutory basis for each outcome; (3) Work.', 'Union of India* (2013) Supreme Court judgment on Section 3(d) to see how "enhanced efficacy" is interpreted for biotech.', 'Emphasize that patentability is claim-specific: the *method* of making a GM crop may be patented even if the crop.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_003', difficulty: 'standard',
          question: 'RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA.',
          hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) to reinforce DNA→RNA→Protein flow, and.',
          misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\'.',
          parts: [
                { id: 'a', prompt: 'Name the three eukaryotic nuclear RNA polymerases and state the major class of RNA each transcribes.', answer: 'RNA Polymerase I transcribes 28S, 18S, and 5.8S rRNA',
                  options: ['RNA Polymerase I transcribes 28S, 18S, and 5.8S rRNA', 'RNA Polymerase II transcribes all mRNAs', 'it also transcribes the 5\' cap and poly-A tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' },
                { id: 'b', prompt: 'Explain why RNA polymerase can initiate RNA synthesis de novo (without a primer) whereas DNA polymerase absolutely requires a primer with a free 3\'-OH group.', answer: 'RNA polymerase uses ribonucleoside triphosphates (rNTPs) as substrates',
                  options: ['RNA polymerase uses ribonucleoside triphosphates (rNTPs) as substrates', 'has a built-in primer', 'RNA Polymerase II transcribes all mRNAs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' },
                { id: 'c', prompt: 'A researcher treats a prokaryotic cell extract with an antibody that specifically binds and inactivates the sigma (σ) factor of RNA polymerase.', answer: 'a housekeeping gene with a strong consensus promoter, and (',
                  options: ['a housekeeping gene with a strong consensus promoter, and (', 'transcription continues normally', 'RNA Polymerase II transcribes all mRNAs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' }
          ],
            remediations: { 'rna-polymerase-ii-transcribes-all': { steps: ['If a student makes this error: (1) Have them draw a timeline: "DNA template → Pol II elongation → 3\' end cleavage at.', '(2) Use the analogy: Pol II is the "scribe writing the letter"; capping/polyadenylation enzymes are the "editor adding.', 'This forces separation of synthesis from processing.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\'.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The evolutionary conservation of RNA polymerase core subunits (β, β\' in prokaryotes; RPB1, RPB2 in eukaryotes) across all domains of.', answer: 'Refute',
                  options: ['Refute', 'sequence conservation equals functional identity', 'RNA Polymerase II transcribes all mRNAs', 'it also transcribes the 5\' cap and poly-A tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' }
          ],
            remediations: { 'rna-polymerase-ii-transcribes-all': { steps: ['If a student makes this error: (1) Have them draw a timeline: "DNA template → Pol II elongation → 3\' end cleavage at.', '(2) Use the analogy: Pol II is the "scribe writing the letter"; capping/polyadenylation enzymes are the "editor adding.', 'This forces separation of synthesis from processing.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_001', difficulty: 'standard',
          question: 'Biotechnology is the interdisciplinary application of scientific and.',
          hint: 'Revisit **c10_bio_cbse_04_001** (DNA as genetic material) and **c10_bio_cbse_01_007**.',
          misconception: '**Misconception:** "Biotechnology = Genetic Engineering (rDNA technology)." Students equate the *entire field* with its.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Making dahi (curd) at home is modern biotechnology because we use a specific starter culture (Lactobacillus) to transform milk." Explain why.', answer: 'Correct explanation: Dahi production is **classical biotechnology**',
                  options: ['Correct explanation: Dahi production is **classical biotechnology**', 'modern', 'known culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Biotechnology = Genetic Engineering (rDNA technology)." Students equate the *entire field* with its *modern subset*.' }
          ],
            remediations: { 'misconception-biotechnology-genetic-engineering-': { steps: ['** Draw a 3-column table on paper: **Ancient | Classical | Modern**. **', '** In each column, write the **defining technology** (not the product): *Ancient: Selective breeding/domestication (no.', '** Take 5 products (dahi, wine, penicillin, Humulin, Bt cotton) and place each in the correct column by asking: *"Was.', '** Verbalize the rule: **"If no recombinant DNA was constructed → Not Modern Biotechnology."** Repeat until automatic.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_002', difficulty: 'standard',
          question: 'Historical Development of Biotechnology is the chronological progression from.',
          hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s.',
          misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Biotechnology began in 1917 when Karl Ereky coined the term." What critical historical error does this statement contain?', answer: 'The error is conflating the *term* with the *practice*',
                  options: ['The error is conflating the *term* with the *practice*', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' },
                { id: 'b', prompt: 'Explain why Louis Pasteur\'s work (1850s-1860s) represents a fundamental epistemological break from all prior fermentation practices, using the phrase "black.', answer: 'Prior to Pasteur, fermentation was a "black box"',
                  options: ['Prior to Pasteur, fermentation was a "black box"', 'Pasteur invented pasteurization', 'march of progress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' },
                { id: 'c', prompt: 'A textbook claims: "Eduard Buchner\'s 1896 cell-free fermentation extract proved that life is not necessary for biochemical reactions." Design a 3-step.', answer: 'Step 1: Prepare yeast extract by grinding yeast with sand and pressing',
                  options: ['Step 1: Prepare yeast extract by grinding yeast with sand and pressing', 'use PCR to check for DNA', 'march of progress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' }
          ],
            remediations: { 'the-historical-development-is-a': { steps: ['If a student cannot sequence milestones or explain conceptual shifts: 1) Give them 10 index cards with one milestone.', '2) Ask them to physically arrange cards on a timeline *without dates visible*, using only logical dependency (e.g.,.', '3) For each adjacent pair, demand: "What did the earlier one make possible for the later one?" 4) Finally, reveal dates.', 'This forces causal reasoning over rote memorization.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Modern biotechnology is just faster, more precise traditional biotechnology." Use the distinction between *selective breeding* and.', answer: 'The claim is false',
                  options: ['The claim is false', 'both change genes', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' },
                { id: 'b', prompt: 'Create a 6-panel storyboard illustrating the conceptual evolution from "fermentation as divine gift" (ancient) to "fermentation as enzyme catalysis" (Buchner).', answer: 'Panel 1: "Mystery: Gods make wine" (ancient)',
                  options: ['Panel 1: "Mystery: Gods make wine" (ancient)', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' }
          ],
            remediations: { 'the-historical-development-is-a': { steps: ['If a student cannot sequence milestones or explain conceptual shifts: 1) Give them 10 index cards with one milestone.', '2) Ask them to physically arrange cards on a timeline *without dates visible*, using only logical dependency (e.g.,.', '3) For each adjacent pair, demand: "What did the earlier one make possible for the later one?" 4) Finally, reveal dates.', 'This forces causal reasoning over rote memorization.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
