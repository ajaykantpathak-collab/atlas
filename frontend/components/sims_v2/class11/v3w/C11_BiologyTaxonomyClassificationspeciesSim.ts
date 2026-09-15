import type { SimDef } from '../../engine/types';
import C11_BiologyTaxonomyClassificationspeciesSim from '../../../simulations/c6_12/C11_BiologyTaxonomyClassificationspeciesSim';

/** v3 wrapped master — C11_BiologyTaxonomyClassificationspeciesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologytaxonomyclassificationspeciessim: SimDef = {
    id: 'v3w_c11_biologytaxonomyclassificationspeciessim',
    title: 'Taxonomy Classificationspecies',
    subtitle: 'Covers structure, genetic material types, and classification status of viruses and.',
    classLevel: 11, subject: 'biology', topic: 'Viruses and Viroids',
    chapters: [],
    nodeIds: ['c11_bio_cbse_02_009', 'c11_bio_cbse_01_004', 'c11_bio_cbse_03_007', 'c11_bio_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Think about the last time you had a common cold or flu — you felt sick, but the doctor said antibiotics won\'t.', goal: 'Master Taxonomy Classificationspecies.' },
    discovery: {
        question: 'You discover a new flowering plant in the Western Ghats with these traits: vascular tissue present, seeds enclosed in ovary, two cotyledons, reticulate leaf.',
        options: ['Lowest confident rank: Class Dicotyledonae (or Eudicots)', 'it\'s a Lamiaceae', 'arranging organisms into neat boxes'],
        answer: 'Lowest confident rank: Class Dicotyledonae (or Eudicots)',
        hook: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity.',
    },
    teaching: [
        { title: 'Viruses are non-cellular, obligate.', text: 'Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid core (either DNA or RNA, never both) enclosed in a protein coat called a capsid made of capsomeres; they are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_02_009', title: 'Viruses are non-cellular, obligate.',
          scaffold: { problem: 'A researcher isolates an infectious agent from a diseased tomato plant.',
            steps: [
            { text: 'Filterability through bacteria-proof filter indicates size smaller than bacteria — consistent with both viruses and.' },
            { text: 'Inactivation by RNase (ribonuclease) proves RNA is essential for infectivity; resistance to protease proves protein is.' },
            { text: 'Absence of protein band on gel electrophoresis confirms no capsid protein is present.' },
            { text: 'Combine evidence: infectious RNA without protein coat = viroid (by definition).' },
            { text: 'Conclude it is a viroid, not a virus, because viruses always have a protein capsid.' },
            { text: 'Relate to known example: Potato spindle tuber viroid (PSTVd) shows identical properties.', faded: true, blankAnswer: 'The agent is a viroid. Evidence: (1) Sub-bacterial size,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_01_004', title: 'Classification is the scientific.',
          scaffold: { problem: 'A research team in Arunachal Pradesh discovers a new primate species.',
            steps: [
            { text: 'Identify the taxonomic level each trait diagnoses — opposable thumbs + stereoscopic vision = Order Primates (shared.' },
            { text: 'No tail + Y-5 molar pattern = Superfamily Hominoidea (apes), excluding monkeys (which have tails) and strepsirrhines.' },
            { text: '98.7% cytochrome b similarity to humans places it in Family Hominidae (great apes: humans, chimps, gorillas,.' },
            { text: 'Genus assignment requires distinguishing from *Homo* (bipedalism, brain size >1300cc), *Pan* (knuckle-walking, 99% DNA.' },
            { text: 'Species designation requires evidence of reproductive isolation from closest relatives — impossible without observing.' },
            { text: 'Conclusion — provisionally assign to Family Hominidae, genus incertae sedis; species status pending integrative.', faded: true, blankAnswer: 'Family Hominidae (great apes); genus uncertain without.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_03_007', title: 'Angiosperms are flowering plants.',
          scaffold: { problem: 'A botanist collects seeds from three plants: (A) Castor (Ricinus communis), (B) Pea (Pisum sativum), and (C) Maize (Zea mays).',
            steps: [
            { text: 'Identify the class — Castor and Pea are dicots (two cotyledons); Maize is a monocot (one cotyledon = scutellum).' },
            { text: 'Recall endosperm fate — In castor, endosperm persists as oily tissue (albuminous); in pea, endosperm is consumed by.' },
            { text: 'Determine ploidy of nutritive tissue — All three are angiosperms, so double fertilization occurs: nutritive tissue is.' },
            { text: 'Trace developmental origin — Endosperm originates from triple fusion (2n polar nuclei + n male gamete = 3n PEN);.' },
            { text: 'Classify seed type — Castor: albuminous, dicot, 3n endosperm; Pea: exalbuminous, dicot, 2n cotyledons; Maize:.' },
            { text: 'Verify with NCERT examples — Castor and maize are classic albuminous; pea is classic exalbuminous.', faded: true, blankAnswer: '(A) Castor: 2 cotyledons, albuminous, 3n endosperm; (B).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_02_010', title: 'Prions are infectious proteinaceous.',
          scaffold: { problem: 'A medical student reads that kuru, a prion disease, was transmitted among the Fore people of Papua New Guinea through ritualistic.',
            steps: [
            { text: 'Identify the infectious agent as prion (PrP^Sc) based on disease (kuru = transmissible spongiform encephalopathy) and.' },
            { text: 'Recall prion replication mechanism: PrP^Sc enters host, contacts normal PrP^C on cell membranes, and catalyzes its.' },
            { text: 'Explain long incubation (years to decades): conversion is stochastic and slow initially; threshold of PrP^Sc.' },
            { text: 'Analyze cooking failure: PrP^Sc is extremely heat-stable (β-sheet aggregates); normal cooking (100°C) does not denature.' },
            { text: 'Conclude: Transmission via consumption of PrP^Sc-rich brain tissue; incubation reflects slow conformational conversion.', faded: true, blankAnswer: 'Kuru was transmitted by ingesting PrP^Sc in brain tissue.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_01_004', title: 'Identify each idea',
          dissect: { specimen: 'Taxonomy Classificationspecies', spots: [
            { id: 's1', label: 'Viruses are non-cellular obligate intracellular', prompt: 'Which idea is this? — Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid.', answer: 'Viruses are non-cellular obligate intracellular', options: ['Viruses are non-cellular obligate intracellular', 'Classification is the scientific process', 'Angiosperms are flowering plants characterized', 'Prions are infectious proteinaceous particles'] },
            { id: 's2', label: 'Classification is the scientific process', prompt: 'Which idea is this? — Classification is the scientific process of grouping organisms into hierarchical.', answer: 'Classification is the scientific process', options: ['Classification is the scientific process', 'Viruses are non-cellular obligate intracellular', 'Angiosperms are flowering plants characterized', 'Prions are infectious proteinaceous particles'] },
            { id: 's3', label: 'Angiosperms are flowering plants characterized', prompt: 'Which idea is this? — Angiosperms are flowering plants characterized by the presence of ovules enclosed within.', answer: 'Angiosperms are flowering plants characterized', options: ['Angiosperms are flowering plants characterized', 'Viruses are non-cellular obligate intracellular', 'Classification is the scientific process', 'Prions are infectious proteinaceous particles'] },
            { id: 's4', label: 'Prions are infectious proteinaceous particles', prompt: 'Which idea is this? — Prions are infectious proteinaceous particles devoid of nucleic acid that propagate by.', answer: 'Prions are infectious proteinaceous particles', options: ['Prions are infectious proteinaceous particles', 'Viruses are non-cellular obligate intracellular', 'Classification is the scientific process', 'Angiosperms are flowering plants characterized'] }
          ] } }
    ],
    explore: { component: C11_BiologyTaxonomyClassificationspeciesSim, prompt: 'Explore the interactive — Taxonomy Classificationspecies' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_009', difficulty: 'standard',
          question: 'Viruses are non-cellular, obligate intracellular parasites consisting of a.',
          hint: 'Revisit c8_bio_ch1_3 (Cell: Basic Unit of Life) for cell theory and c9_bio_ch1_5.',
          misconception: 'Students often think viruses are "alive" because they replicate and evolve, ignoring that replication is entirely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid',
                  options: ['Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid', 'Classification is the scientific process of grouping organisms into hierarchical', 'Angiosperms are flowering plants characterized by the presence of ovules enclosed within', 'Prions are infectious proteinaceous particles devoid of nucleic acid that propagate by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think viruses are "alive" because they replicate and evolve, ignoring that replication is entirely host-dependent and they.' }
          ],
            remediations: { 'viruses-are-alive-because-they': { steps: ['Review cell theory (c8_bio_ch1_3) — list 3 things cells have that viruses lack (ribosomes, metabolism, cell membrane).', 'Draw TMV and bacteriophage side-by-side; label capsid, nucleic acid, tail fibres.', 'Make a table: Virus vs Viroid vs Bacterium across 5 criteria (cell structure, genetic material, protein coat, size,.', 'Explain aloud why antibiotics (target cell wall/ribosomes) fail on viruses.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_004', difficulty: 'standard',
          question: 'Classification is the scientific process of grouping organisms into.',
          hint: 'Revisit Class 9 "Need for Classification" (c9_bio_ch4_3) and "Biodiversity: Definition.',
          misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since DNA sequencing can now determine evolutionary relationships directly, the traditional taxonomic hierarchy (kingdom, phylum, class...).', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'arranging organisms into neat boxes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity (phenetics).' },
                { id: 'b', prompt: 'You discover a new flowering plant in the Western Ghats with these traits: vascular tissue present, seeds enclosed in ovary, two cotyledons, reticulate leaf.', answer: 'Lowest confident rank: Class Dicotyledonae (or Eudicots)',
                  options: ['Lowest confident rank: Class Dicotyledonae (or Eudicots)', 'it\'s a Lamiaceae', 'arranging organisms into neat boxes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity (phenetics).' },
                { id: 'c', prompt: 'Compare the taxonomic resolution achieved by: (a) morphological classification used by Linnaeus, (b) five-kingdom classification (Whittaker, 1969), and (c).', answer: 'morphological classification used by Linnaeus, (',
                  options: ['morphological classification used by Linnaeus, (', 'better/worse', 'arranging organisms into neat boxes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity (phenetics).' }
          ],
            remediations: { 'classification-is-primarily-about-arranging': { steps: ['Show a cladogram of vertebrates highlighting that "fish" is paraphyletic (excludes tetrapods).', 'Ask: "If classification grouped by swimming, where do penguins, ichthyosaurs, and dolphins go?"', 'Contrast with "mammary glands + three ear bones" — a synapomorphy uniting whales, bats, humans.', 'Assign reading: NCERT Box 1.1 (Ernst Mayr) — he defined species as "groups of actually or potentially interbreeding.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_007', difficulty: 'standard',
          question: 'Angiosperms are flowering plants characterized by the presence of ovules.',
          hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed.',
          misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.',
          parts: [
                { id: 'a', prompt: 'Name the two classes of angiosperms and state one fundamental difference in their seed structure that is used as a primary classification criterion.', answer: 'The two classes are Dicotyledonae (dicots) and Monocotyledonae (monocots)',
                  options: ['The two classes are Dicotyledonae (dicots) and Monocotyledonae (monocots)', 'dicots have tap roots, monocots have fibrous roots', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' },
                { id: 'b', prompt: 'A student observes a plant with parallel leaf venation, floral parts in multiples of three, and a fibrous root system.', answer: 'The plant is a monocot (parallel venation, trimerous flowers, fibrous roots)',
                  options: ['The plant is a monocot (parallel venation, trimerous flowers, fibrous roots)', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' },
                { id: 'c', prompt: 'Compare the post-fertilization development of the ovule in a gymnosperm (e.g., Pinus) and an angiosperm (e.g., Pisum sativum).', answer: 'In Pinus (gymnosperm): ovule is naked on megasporophyll',
                  options: ['In Pinus (gymnosperm): ovule is naked on megasporophyll', 'both have endosperm', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' }
          ],
            remediations: { 'double-fertilization-means-two-sperm': { steps: ['Draw the mature embryo sac (Polygonum type) labeling all 7 cells and 8 nuclei with ploidy (n).', 'Simulate pollen tube entry — trace path of two male gametes: one to egg apparatus, one to central cell.', 'Write fusion equations: n (male) + n (egg) = 2n (zygote); n (male) + n (polar nucleus 1) + n (polar nucleus 2) = 3n.', 'Compare with gymnosperm: only n + n = 2n (zygote); female gametophyte remains haploid nutritive tissue.', 'Practice NCERT Exercise Q2 for liverwort, moss, fern, gymnosperm, angiosperm — tabulate where reduction division occurs.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All monocots have scattered vascular bundles in the stem and all dicots have vascular bundles in a ring." Identify the error and.', answer: 'The statement is an overgeneralization',
                  options: ['The statement is an overgeneralization', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' },
                { id: 'b', prompt: 'Design a simple field observation protocol to distinguish between a dicot and monocot seedling at the 2-leaf stage without uprooting the plant, using only.', answer: 'Protocol: (1) Observe cotyledon number',
                  options: ['Protocol: (1) Observe cotyledon number', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' }
          ],
            remediations: { 'double-fertilization-means-two-sperm': { steps: ['Draw the mature embryo sac (Polygonum type) labeling all 7 cells and 8 nuclei with ploidy (n).', 'Simulate pollen tube entry — trace path of two male gametes: one to egg apparatus, one to central cell.', 'Write fusion equations: n (male) + n (egg) = 2n (zygote); n (male) + n (polar nucleus 1) + n (polar nucleus 2) = 3n.', 'Compare with gymnosperm: only n + n = 2n (zygote); female gametophyte remains haploid nutritive tissue.', 'Practice NCERT Exercise Q2 for liverwort, moss, fern, gymnosperm, angiosperm — tabulate where reduction division occurs.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_010', difficulty: 'standard',
          question: 'Prions are infectious proteinaceous particles devoid of nucleic acid that.',
          hint: 'Revisit c11_bio_cbse_02_009 (Viruses and Viroids) for acellular agents comparison and.',
          misconception: 'Students often think prions are "living microorganisms" like bacteria or viruses because they cause disease and.',
          parts: [
                { id: 'a', prompt: 'A farmer reports cattle showing progressive neurological symptoms: ataxia, tremors, and aggression. Brain biopsy reveals spongiform vacuolation.', answer: 'The agent is a prion (PrP^Sc) causing bovine spongiform encephalopathy (BSE)',
                  options: ['The agent is a prion (PrP^Sc) causing bovine spongiform encephalopathy (BSE)', 'living microorganisms', 'enslaves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think prions are "living microorganisms" like bacteria or viruses because they cause disease and replicate.' }
          ],
            remediations: { 'prions-are-living-microorganisms-like': { steps: ['Create a three-column table comparing viruses, viroids, and prions across: nucleic acid type, protein coat, replication.', 'Collect a crustose lichen from a wall and a foliose lichen from a tree; examine under hand lens to identify upper.', 'Watch a 5-minute animation of prion conversion (PrP^C α-helix → PrP^Sc β-sheet) to visualize conformational change.', 'Read the NCERT summary box on prions and lichens, then write a 100-word explanation of why prions are not "alive" and.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think prions are "living microorganisms" like bacteria or viruses because they cause disease and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Prions violate the central dogma of molecular biology because information flows from protein to protein."', answer: 'The statement is misleading',
                  options: ['The statement is misleading', 'living microorganisms', 'enslaves', 'the fungal partner "enslaves" the alga rather than a mutualistic symbiosis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think prions are "living microorganisms" like bacteria or viruses because they cause disease and replicate.' }
          ],
            remediations: { 'prions-are-living-microorganisms-like': { steps: ['Create a three-column table comparing viruses, viroids, and prions across: nucleic acid type, protein coat, replication.', 'Collect a crustose lichen from a wall and a foliose lichen from a tree; examine under hand lens to identify upper.', 'Watch a 5-minute animation of prion conversion (PrP^C α-helix → PrP^Sc β-sheet) to visualize conformational change.', 'Read the NCERT summary box on prions and lichens, then write a 100-word explanation of why prions are not "alive" and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
