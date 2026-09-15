import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch02_p2: SimDef = {
    id: 'v3_c11_bio_ch02_p2',
    title: 'Biological Classification · Part 2/2',
    subtitle: 'Rebuild the five-kingdom system from the three criteria that forced it into existence.',
    classLevel: 11, subject: 'biology', topic: 'Biological Classification · Part 2/2',
    chapters: ['c11_bio_ch02'],
    nodeIds: ['c11_bio_cbse_02_007', 'c11_bio_cbse_02_008', 'c11_bio_cbse_02_009', 'c11_bio_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a taxonomist re-sorting a museum\'s \'unclassified\' drawer', intro: 'The two-kingdom system crammed everything into plant or animal — and it broke the moment microscopes improved. You\'re rebuilding the drawer correctly.', goal: 'Use Whittaker\'s criteria — cell structure, body organisation, mode of nutrition — to place ambiguous organisms and explain why the two-kingdom system failed.' },
    discovery: {
        question: 'For centuries mushrooms sat in Kingdom Plantae — they have cell walls, don\'t move, and grow from the ground. Whittaker threw them out. Which fact made fungi impossible to keep with plants?',
        options: ['Their walls are made of chitin and they feed by absorbing dead matter, not by photosynthesis', 'They are too small to be plants', 'They reproduce by spores instead of seeds', 'They grow in the dark, unlike plants'],
        answer: 'Their walls are made of chitin and they feed by absorbing dead matter, not by photosynthesis',
        hook: 'Classification follows deep structure and nutrition, not lifestyle resemblance — a chitin wall and absorptive feeding outweigh \'it grows in soil\'.',
    },
    teaching: [
        { title: 'Kingdom Plantae: Overview', text: 'Kingdom Plantae comprises eukaryotic, chlorophyll-containing organisms that are primarily autotrophic (photosynthetic) with cell walls composed of cellulose; it includes algae, bryophytes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_02_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Sort a tray of misfit organisms — cyanobacteria, Euglena, a slime mould, a mushroom — into Whittaker\'s five kingdoms using cell type, body organisation, and mode of nutrition.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_007', title: 'Kingdom Plantae: Overview',
          caseStudy: { intro: 'Observe a moss patch on a damp wall and a mango tree in your neighbourhood — both are green, but one lacks true roots, stems, or leaves while the other flowers.',
            decisions: [{ prompt: 'State the two main phases in the life cycle of a plant and name the ploidy level of each phase.', options: [
                { text: 'The two phases are the diploid (2n) sporophyte', outcome: 'The two phases are the diploid (2n) sporophyte, which produces spores by meiosis, and the haploid.' },
                { text: 'alternation of generations', outcome: 'Not quite — Students often think "alternation of generations" means a plant alternates between being.', reveals: 'alternation-of-generations-means-a' },
                { text: 'both phases are diploid or confusing sporophyte with gametophyte', outcome: 'Not quite — Students often think "alternation of generations" means a plant alternates between being.', reveals: 'alternation-of-generations-means-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_008', title: 'Kingdom Animalia: Overview',
          caseStudy: { intro: 'Observe a live earthworm in moist soil after rain: it moves actively, responds to touch, and ingests organic matter.',
            decisions: [{ prompt: 'List the five criteria Whittaker used for his five-kingdom classification and state the specific character state for Kingdom Animalia for.', options: [
                { text: 'The five criteria are: (1) Cell structure – Animalia: Eukaryotic', outcome: 'The five criteria are: (1) Cell structure – Animalia: Eukaryotic; (2) Cell wall – Animalia: Absent.' },
                { text: 'cell wall present', outcome: 'Not quite — Students often think "heterotrophic nutrition" alone defines Animalia, leading them to misclassify.', reveals: 'heterotrophic-nutrition-alone-defines-animalia' },
                { text: 'autotrophic', outcome: 'Not quite — Students often think "heterotrophic nutrition" alone defines Animalia, leading them to misclassify.', reveals: 'heterotrophic-nutrition-alone-defines-animalia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_009', title: 'Viruses and Viroids',
          caseStudy: { intro: 'Think about the last time you had a common cold or flu — you felt sick, but the doctor said antibiotics won\'t work.',
            decisions: [{ prompt: 'Define a virus and state the two types of nucleic acid it can contain.', options: [
                { text: 'A virus is a non-cellular, obligate intracellular parasite consisting of a nucleic acid', outcome: 'A virus is a non-cellular, obligate intracellular parasite consisting of a nucleic acid core.' },
                { text: 'viruses contain both DNA and RNA', outcome: 'Not quite — Students often think viruses are "alive" because they replicate and evolve, ignoring that.', reveals: 'viruses-are-alive-because-they' },
                { text: 'viruses are cellular', outcome: 'Not quite — Students often think viruses are "alive" because they replicate and evolve, ignoring that.', reveals: 'viruses-are-alive-because-they' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_010', title: 'Prions and Lichens',
          caseStudy: { intro: 'Observe a crusty gray-green patch on a tree bark or rock during a morning walk in your neighborhood — that is a lichen, a living partnership between a fungus.',
            decisions: [{ prompt: 'What is the chemical composition of a prion and which host protein does it convert to propagate?', options: [
                { text: 'A prion is composed solely of an abnormally folded isoform of the host-encoded prion', outcome: 'A prion is composed solely of an abnormally folded isoform of the host-encoded prion protein.' },
                { text: 'prions contain RNA', outcome: 'Not quite — Students often think prions are "living microorganisms" like bacteria or viruses because they cause.', reveals: 'prions-are-living-microorganisms-like' },
                { text: 'prions are viral particles', outcome: 'Not quite — Students often think prions are "living microorganisms" like bacteria or viruses because they cause.', reveals: 'prions-are-living-microorganisms-like' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Biological Classification · Part 2/2', spots: [
            { id: 's1', label: 'Kingdom Plantae Overview', prompt: 'Which idea is this? — Kingdom Plantae comprises eukaryotic, chlorophyll-containing organisms that are primarily.', answer: 'Kingdom Plantae Overview', options: ['Kingdom Plantae Overview', 'Kingdom Animalia Overview', 'Viruses and Viroids', 'Prions and Lichens'] },
            { id: 's2', label: 'Kingdom Animalia Overview', prompt: 'Which idea is this? — Kingdom Animalia comprises multicellular, eukaryotic, heterotrophic organisms that lack.', answer: 'Kingdom Animalia Overview', options: ['Kingdom Animalia Overview', 'Kingdom Plantae Overview', 'Viruses and Viroids', 'Prions and Lichens'] },
            { id: 's3', label: 'Viruses and Viroids', prompt: 'Which idea is this? — Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid.', answer: 'Viruses and Viroids', options: ['Viruses and Viroids', 'Kingdom Plantae Overview', 'Kingdom Animalia Overview', 'Prions and Lichens'] },
            { id: 's4', label: 'Prions and Lichens', prompt: 'Which idea is this? — Prions are infectious proteinaceous particles devoid of nucleic acid that propagate.', answer: 'Prions and Lichens', options: ['Prions and Lichens', 'Kingdom Plantae Overview', 'Kingdom Animalia Overview', 'Viruses and Viroids'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field trip your class collects pond water and finds three organisms: a bacterium with no nucleus, a green Euglena that photosynthesises but also ingests food and swims with a flagellum, and a slime mould that creeps over the log like an animal but fruits like a fungus. A classmate wants to force each into \'plant\' or \'animal\'.',
            decisions: [{ prompt: 'Where do the three actually belong in Whittaker\'s system?', options: [
                { text: 'Bacterium → Monera (prokaryotic); Euglena and slime mould → Protista (unicellular eukaryotes). Whittaker\'s criteria — cell type, body organisation, nutrition mode — exist precisely because plant/animal can\'t absorb organisms like Euglena; and even Protista\'s boundaries are admittedly loose.', outcome: 'The five-kingdom system was invented for organisms that break the plant/animal binary; \'motile = animal\' or \'green = plant\' is the collapsed two-kingdom thinking.' },
                { text: 'Euglena is a plant because it\'s green and photosynthesises; the slime mould is an animal because it moves.', outcome: 'Single traits mislead — Euglena is also heterotrophic and motile, and slime moulds form spore-bearing fruiting bodies; Whittaker weighs cell type, organisation and nutrition together.', reveals: 'green-means-plant' },
                { text: 'Protista is a natural kingdom of close relatives, so both Euglena and slime mould belong there permanently and comfortably.', outcome: 'NCERT itself warns Protista\'s boundaries are not well defined — it\'s a convenience grouping of single-celled eukaryotes, not a monophyletic clade.', reveals: 'protista-is-natural-group' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'You classified by evolutionary criteria, not by looks. That\'s why a pond-water green dot can be a protist while its photosynthesising bacterial neighbour is a moneran.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_007', difficulty: 'standard',
          question: 'Kingdom Plantae comprises eukaryotic, chlorophyll-containing organisms that are.',
          hint: 'Revisit the eukaryotic plant cell structure (chloroplast, cell wall) from Class 9 Cell.',
          misconception: 'Students often think "alternation of generations" means a plant alternates between being a sporophyte and a gametophyte.',
          parts: [
                { id: 'a', prompt: 'State the two main phases in the life cycle of a plant and name the ploidy level of each phase.', answer: 'The two phases are the diploid (2n) sporophyte',
                  options: ['The two phases are the diploid (2n) sporophyte', 'alternation of generations', 'both phases are diploid or confusing sporophyte with gametophyte'],
                  hint: 'Revisit the eukaryotic plant cell structure (chloroplast, cell wall) from Class 9 Cell chapter and.',
                  misconception: 'Students often think "alternation of generations" means a plant alternates between being a sporophyte and a gametophyte in its lifetime.' },
                { id: 'b', prompt: 'A student argues that Cuscuta (dodder) and Venus flytrap should be moved out of Kingdom Plantae because they obtain nutrients from other organisms.', answer: 'Cuscuta and Venus flytrap remain in Plantae',
                  options: ['Cuscuta and Venus flytrap remain in Plantae', 'alternation of generations'],
                  hint: 'Revisit the eukaryotic plant cell structure (chloroplast, cell wall) from Class 9 Cell chapter and.',
                  misconception: 'Students often think "alternation of generations" means a plant alternates between being a sporophyte and a gametophyte in its lifetime.' },
                { id: 'c', prompt: 'Given an unknown green, eukaryotic, cellulose-walled organism that produces spores in a capsule atop a stalk and has a dominant, free-living gametophyte.', answer: 'The organism is a bryophyte (moss)',
                  options: ['The organism is a bryophyte (moss)', 'alternation of generations'],
                  hint: 'Revisit the eukaryotic plant cell structure (chloroplast, cell wall) from Class 9 Cell chapter and.',
                  misconception: 'Students often think "alternation of generations" means a plant alternates between being a sporophyte and a gametophyte in its lifetime.' }
          ],
            remediations: { 'alternation-of-generations-means-a': { steps: ['If the student confuses the two phases as sequential stages of one organism: (1) Draw a two-circle diagram labelled.', '(2) Use a moss sample: point out the green carpet (gametophyte) and the brown stalks with capsules (sporophyte).', '(3) Ask: "Does the moss carpet produce spores or gametes?" (gametes).', '"Does the capsule produce spores or gametes?" (spores).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "alternation of generations" means a plant alternates between being a sporophyte and a gametophyte.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All members of Kingdom Plantae are strictly autotrophic." Provide a counterexample and explain why the counterexample does not violate.', answer: 'The statement is false',
                  options: ['The statement is false', 'alternation of generations'],
                  hint: 'Revisit the eukaryotic plant cell structure (chloroplast, cell wall) from Class 9 Cell chapter and.',
                  misconception: 'Students often think "alternation of generations" means a plant alternates between being a sporophyte and a gametophyte in its lifetime.' }
          ],
            remediations: { 'alternation-of-generations-means-a': { steps: ['If the student confuses the two phases as sequential stages of one organism: (1) Draw a two-circle diagram labelled.', '(2) Use a moss sample: point out the green carpet (gametophyte) and the brown stalks with capsules (sporophyte).', '(3) Ask: "Does the moss carpet produce spores or gametes?" (gametes).', '"Does the capsule produce spores or gametes?" (spores).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_008', difficulty: 'standard',
          question: 'Kingdom Animalia comprises multicellular, eukaryotic, heterotrophic organisms.',
          hint: 'Revisit c11_bio_cbse_02_001 (Five Kingdom Criteria) and c9_bio_ch2_5-8 (Animal Tissues).',
          misconception: 'Students often think "heterotrophic nutrition" alone defines Animalia, leading them to misclassify fungi (absorptive.',
          parts: [
                { id: 'a', prompt: 'List the five criteria Whittaker used for his five-kingdom classification and state the specific character state for Kingdom Animalia for each criterion.', answer: 'The five criteria are: (1) Cell structure – Animalia: Eukaryotic',
                  options: ['The five criteria are: (1) Cell structure – Animalia: Eukaryotic', 'cell wall present', 'autotrophic', 'heterotrophic nutrition'],
                  hint: 'Revisit c11_bio_cbse_02_001 (Five Kingdom Criteria) and c9_bio_ch2_5-8 (Animal Tissues) to rebuild.',
                  misconception: 'Students often think "heterotrophic nutrition" alone defines Animalia, leading them to misclassify fungi (absorptive heterotrophs) and.' },
                { id: 'b', prompt: '*Parasitic flatworms (Platyhelminthes) lack a true body cavity (acoelomate) and a complete digestive tract.', answer: 'Flatworms are placed in Animalia',
                  options: ['Flatworms are placed in Animalia', 'they move', 'they are parasites', 'heterotrophic nutrition'],
                  hint: 'Revisit c11_bio_cbse_02_001 (Five Kingdom Criteria) and c9_bio_ch2_5-8 (Animal Tissues) to rebuild.',
                  misconception: 'Students often think "heterotrophic nutrition" alone defines Animalia, leading them to misclassify fungi (absorptive heterotrophs) and.' },
                { id: 'c', prompt: 'Compare the nutritional strategy of an insectivorous plant (e.g., *Drosera*) with that of a carnivorous animal (e.g., frog).', answer: '*Drosera* is primarily photosynthetic (autotrophic)',
                  options: ['*Drosera* is primarily photosynthetic (autotrophic)', 'both eat insects so both are animals', 'heterotrophic nutrition'],
                  hint: 'Revisit c11_bio_cbse_02_001 (Five Kingdom Criteria) and c9_bio_ch2_5-8 (Animal Tissues) to rebuild.',
                  misconception: 'Students often think "heterotrophic nutrition" alone defines Animalia, leading them to misclassify fungi (absorptive heterotrophs) and.' }
          ],
            remediations: { 'heterotrophic-nutrition-alone-defines-animalia': { steps: ['Create a three-column table (Fungi, Parasitic Plant, Animal) with rows for: Cell Wall Composition, Nutrient Acquisition.', 'Fill using textbook definitions (chitin/absorptive/glycogen/hyphae; cellulose/haustorial/starch/tissue.', 'Verbally explain *why* absorptive/haustorial mechanisms are structurally different from holozoic (external enzyme.', 'Apply to a new case (e.g., *Rhizopus* vs. *Ascaris*) without notes.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_009', difficulty: 'standard',
          question: 'Viruses are non-cellular, obligate intracellular parasites consisting of.',
          hint: 'Revisit c8_bio_ch1_3 (Cell: Basic Unit of Life) for cell theory and c9_bio_ch1_5.',
          misconception: 'Students often think viruses are "alive" because they replicate and evolve, ignoring that replication is entirely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid',
                  options: ['Viruses are non-cellular, obligate intracellular parasites consisting of a nucleic acid', 'Whittaker\'s Five Kingdom Classification (1969) is a phylogenetic system that categorizes', 'Kingdom Monera comprises exclusively prokaryotic organisms (bacteria and archaea) that', 'Bacteria are prokaryotic, unicellular microorganisms lacking a true nucleus and'],
                  hint: 'Revisit c8_bio_ch1_3 (Cell: Basic Unit of Life) for cell theory and c9_bio_ch1_5 (Nucleus.',
                  misconception: 'Students often think viruses are "alive" because they replicate and evolve, ignoring that replication is entirely host-dependent and they.' }
          ],
            remediations: { 'viruses-are-alive-because-they': { steps: ['Review cell theory (c8_bio_ch1_3) — list 3 things cells have that viruses lack (ribosomes, metabolism, cell membrane).', 'Draw TMV and bacteriophage side-by-side; label capsid, nucleic acid, tail fibres.', 'Make a table: Virus vs Viroid vs Bacterium across 5 criteria (cell structure, genetic material, protein coat, size.', 'Explain aloud why antibiotics (target cell wall/ribosomes) fail on viruses.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_010', difficulty: 'standard',
          question: 'Prions are infectious proteinaceous particles devoid of nucleic acid that.',
          hint: 'Revisit c11_bio_cbse_02_009 (Viruses and Viroids) for acellular agents comparison and.',
          misconception: 'Students often think prions are "living microorganisms" like bacteria or viruses because they cause disease and.',
          parts: [
                { id: 'a', prompt: 'A farmer reports cattle showing progressive neurological symptoms: ataxia, tremors, and aggression. Brain biopsy reveals spongiform vacuolation.', answer: 'The agent is a prion (PrP^Sc) causing bovine spongiform encephalopathy (BSE)',
                  options: ['The agent is a prion (PrP^Sc) causing bovine spongiform encephalopathy (BSE)', 'living microorganisms', 'enslaves', 'the fungal partner "enslaves" the alga rather than a mutualistic symbiosis'],
                  hint: 'Revisit c11_bio_cbse_02_009 (Viruses and Viroids) for acellular agents comparison and.',
                  misconception: 'Students often think prions are "living microorganisms" like bacteria or viruses because they cause disease and replicate.' }
          ],
            remediations: { 'prions-are-living-microorganisms-like': { steps: ['Create a three-column table comparing viruses, viroids, and prions across: nucleic acid type, protein coat, replication.', 'Collect a crustose lichen from a wall and a foliose lichen from a tree; examine under hand lens to identify upper.', 'Watch a 5-minute animation of prion conversion (PrP^C α-helix → PrP^Sc β-sheet) to visualize conformational change.', 'Read the NCERT summary box on prions and lichens, then write a 100-word explanation of why prions are not "alive" and.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
