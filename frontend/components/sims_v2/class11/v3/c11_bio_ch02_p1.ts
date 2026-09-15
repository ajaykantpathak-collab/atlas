import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch02_p1: SimDef = {
    id: 'v3_c11_bio_ch02_p1',
    title: 'Biological Classification · Part 1/2',
    subtitle: 'Rebuild the five-kingdom system from the three criteria that forced it into existence.',
    classLevel: 11, subject: 'biology', topic: 'Biological Classification · Part 1/2',
    chapters: ['c11_bio_ch02'],
    nodeIds: ['c11_bio_cbse_02_001', 'c11_bio_cbse_02_002', 'c11_bio_cbse_02_003', 'c11_bio_cbse_02_004', 'c11_bio_cbse_02_005', 'c11_bio_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a taxonomist re-sorting a museum\'s \'unclassified\' drawer', intro: 'The two-kingdom system crammed everything into plant or animal — and it broke the moment microscopes improved. You\'re rebuilding the drawer correctly.', goal: 'Use Whittaker\'s criteria — cell structure, body organisation, mode of nutrition — to place ambiguous organisms and explain why the two-kingdom system failed.' },
    discovery: {
        question: 'For centuries mushrooms sat in Kingdom Plantae — they have cell walls, don\'t move, and grow from the ground. Whittaker threw them out. Which fact made fungi impossible to keep with plants?',
        options: ['Their walls are made of chitin and they feed by absorbing dead matter, not by photosynthesis', 'They are too small to be plants', 'They reproduce by spores instead of seeds', 'They grow in the dark, unlike plants'],
        answer: 'Their walls are made of chitin and they feed by absorbing dead matter, not by photosynthesis',
        hook: 'Classification follows deep structure and nutrition, not lifestyle resemblance — a chitin wall and absorptive feeding outweigh \'it grows in soil\'.',
    },
    teaching: [
        { title: 'Five Kingdom Classification: Whittaker\'s System', text: 'Whittaker\'s Five Kingdom Classification (1969) is a phylogenetic system that categorizes all living organisms into five kingdoms—Monera, Protista, Fungi, Plantae, and Animalia—based on three primary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_02_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Sort a tray of misfit organisms — cyanobacteria, Euglena, a slime mould, a mushroom — into Whittaker\'s five kingdoms using cell type, body organisation, and mode of nutrition.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_001', title: 'Five Kingdom Classification: Whittaker\'s System',
          caseStudy: { intro: 'Observe a drop of pond water under a microscope: you see tiny moving dots (bacteria), green oval cells (Chlamydomonas), and larger shape-shifting blobs.',
            decisions: [{ prompt: 'State the five kingdoms in Whittaker\'s system and the three main criteria he used for classification.', options: [
                { text: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia', outcome: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia.' },
                { text: 'as a kingdom or citing', outcome: 'Not quite — Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom.', reveals: 'whittaker-s-system-is-the' },
                { text: 'final, correct', outcome: 'Not quite — Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom.', reveals: 'whittaker-s-system-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_002', title: 'Kingdom Monera: Bacteria and Archaea',
          caseStudy: { intro: 'Observe a bowl of curd set overnight in a typical Indian kitchen — the transformation of liquid milk into semi-solid curd is driven by millions.',
            decisions: [{ prompt: 'State the three criteria R.H. Whittaker used to place all prokaryotes into a single Kingdom Monera.', options: [
                { text: 'Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound', outcome: 'Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound organelles), (2).' },
                { text: 'unicellular body', outcome: 'Not quite — Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because.', reveals: 'blue-green-algae-cyanobacteria-are' },
                { text: 'absence of chlorophyll', outcome: 'Not quite — Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because.', reveals: 'blue-green-algae-cyanobacteria-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_003', title: 'Bacteria: Structure and Reproduction',
          caseStudy: { intro: 'Begin by recalling the prokaryotic cell from Class 9 (c9_bio_ch1_2): no nucleus, no membrane-bound organelles.',
            decisions: [{ prompt: 'Label the following structures on a bacterial cell diagram and state the function of each: cell wall, nucleoid, mesosome, ribosome.', options: [
                { text: 'Cell wall (peptidoglycan)', outcome: 'Cell wall (peptidoglycan) — provides structural support and shape, differs between Gram-positive.' },
                { text: 'nucleus', outcome: 'Not quite — Students believe endospore formation is a form of reproduction because "a new structure forms from.', reveals: 'endospore-formation-is-a-form' },
                { text: 'a new structure forms from the cell', outcome: 'Not quite — Students believe endospore formation is a form of reproduction because "a new structure forms from.', reveals: 'endospore-formation-is-a-form' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_004', title: 'Kingdom Protista: Unicellular Eukaryotes',
          caseStudy: { intro: 'Imagine you scoop a drop of water from a stagnant pond near your house and observe it under a microscope — you see tiny organisms swimming with whip-like.',
            decisions: [{ prompt: 'Name the five major groups of Kingdom Protista as per Whittaker\'s classification and give one distinguishing feature for each group.', options: [
                { text: 'The five groups are: (1) Chrysophytes', outcome: 'The five groups are: (1) Chrysophytes — cell walls with silica (diatoms) or cellulose (desmids).' },
                { text: 'bacteria or fungi, or missing mixotrophy in euglenoids', outcome: 'Not quite — Students often think all photosynthetic protists are \'algae\' and belong to Plantae, and all.', reveals: 'all-photosynthetic-protists-are-algae' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_005', title: 'Kingdom Fungi: Structure and Reproduction',
          caseStudy: { intro: 'Observe a piece of bread left on the kitchen counter during monsoon season – within days, a fuzzy grey-black patch appears. That is Rhizopus, a bread mould.',
            decisions: [{ prompt: 'Name the polysaccharide that forms the cell wall of fungi and state how it differs chemically from the cell wall polysaccharide of plants.', options: [
                { text: 'The fungal cell wall is composed of chitin, a nitrogen-containing polysaccharide (polymer', outcome: 'The fungal cell wall is composed of chitin, a nitrogen-containing polysaccharide (polymer.' },
                { text: 'cellulose', outcome: 'Not quite — Students believe that "dikaryotic" means "diploid" (2n) and that the two nuclei in a dikaryotic.', reveals: 'dikaryotic-means-diploid-2n-and' },
                { text: 'peptidoglycan', outcome: 'Not quite — Students believe that "dikaryotic" means "diploid" (2n) and that the two nuclei in a dikaryotic.', reveals: 'dikaryotic-means-diploid-2n-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_006', title: 'Symbiotic Associations: Lichens and Mycorrhiza',
          caseStudy: { intro: 'Look at the crusty grey-green patches on the bark of a mango tree or on rocks near your school during monsoon – those are lichens, not a single organism but.',
            decisions: [{ prompt: 'What are the specific terms for the fungal and algal partners in a lichen, and which partner is autotrophic versus heterotrophic?', options: [
                { text: 'The fungal partner is called the mycobiont (heterotrophic) and the algal/cyanobacterial', outcome: 'The fungal partner is called the mycobiont (heterotrophic) and the algal/cyanobacterial partner.' },
                { text: 'mycobiont is the alga', outcome: 'Not quite — Students think lichens are "algae covered by fungus" like a blanket, and mycorrhiza is "fungi.', reveals: 'lichens-are-algae-covered-by' },
                { text: 'both are autotrophic', outcome: 'Not quite — Students think lichens are "algae covered by fungus" like a blanket, and mycorrhiza is "fungi.', reveals: 'lichens-are-algae-covered-by' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Biological Classification · Part 1/2', spots: [
            { id: 's1', label: 'Five Kingdom Classification Whittakers System', prompt: 'Which idea is this? — Whittaker\'s Five Kingdom Classification (1969) is a phylogenetic system that categorizes.', answer: 'Five Kingdom Classification Whittakers System', options: ['Five Kingdom Classification Whittakers System', 'Kingdom Monera Bacteria and Archaea', 'Bacteria Structure and Reproduction', 'Kingdom Protista Unicellular Eukaryotes'] },
            { id: 's2', label: 'Kingdom Monera Bacteria and Archaea', prompt: 'Which idea is this? — Kingdom Monera comprises exclusively prokaryotic organisms (bacteria and archaea) that.', answer: 'Kingdom Monera Bacteria and Archaea', options: ['Kingdom Monera Bacteria and Archaea', 'Five Kingdom Classification Whittakers System', 'Bacteria Structure and Reproduction', 'Kingdom Protista Unicellular Eukaryotes'] },
            { id: 's3', label: 'Bacteria Structure and Reproduction', prompt: 'Which idea is this? — Bacteria are prokaryotic, unicellular microorganisms lacking a true nucleus and.', answer: 'Bacteria Structure and Reproduction', options: ['Bacteria Structure and Reproduction', 'Five Kingdom Classification Whittakers System', 'Kingdom Monera Bacteria and Archaea', 'Kingdom Protista Unicellular Eukaryotes'] },
            { id: 's4', label: 'Kingdom Protista Unicellular Eukaryotes', prompt: 'Which idea is this? — Kingdom Protista comprises unicellular eukaryotic organisms that are primarily aquatic.', answer: 'Kingdom Protista Unicellular Eukaryotes', options: ['Kingdom Protista Unicellular Eukaryotes', 'Five Kingdom Classification Whittakers System', 'Kingdom Monera Bacteria and Archaea', 'Bacteria Structure and Reproduction'] },
            { id: 's5', label: 'Kingdom Fungi Structure and Reproduction', prompt: 'Which idea is this? — Kingdom Fungi comprises eukaryotic, heterotrophic organisms with cell walls composed.', answer: 'Kingdom Fungi Structure and Reproduction', options: ['Kingdom Fungi Structure and Reproduction', 'Five Kingdom Classification Whittakers System', 'Kingdom Monera Bacteria and Archaea', 'Bacteria Structure and Reproduction'] },
            { id: 's6', label: 'Symbiotic Associations Lichens and Mycorrhiza', prompt: 'Which idea is this? — Lichens are obligate symbiotic associations between a fungal partner (mycobiont.', answer: 'Symbiotic Associations Lichens and Mycorrhiza', options: ['Symbiotic Associations Lichens and Mycorrhiza', 'Five Kingdom Classification Whittakers System', 'Kingdom Monera Bacteria and Archaea', 'Bacteria Structure and Reproduction'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field trip your class collects pond water and finds three organisms: a bacterium with no nucleus, a green Euglena that photosynthesises but also ingests food and swims with a flagellum, and a slime mould that creeps over the log like an animal but fruits like a fungus. A classmate wants to force each into \'plant\' or \'animal\'.',
            decisions: [{ prompt: 'Where do the three actually belong in Whittaker\'s system?', options: [
                { text: 'Bacterium → Monera (prokaryotic); Euglena and slime mould → Protista (unicellular eukaryotes). Whittaker\'s criteria — cell type, body organisation, nutrition mode — exist precisely because plant/animal can\'t absorb organisms like Euglena; and even Protista\'s boundaries are admittedly loose.', outcome: 'The five-kingdom system was invented for organisms that break the plant/animal binary; \'motile = animal\' or \'green = plant\' is the collapsed two-kingdom thinking.' },
                { text: 'Euglena is a plant because it\'s green and photosynthesises; the slime mould is an animal because it moves.', outcome: 'Single traits mislead — Euglena is also heterotrophic and motile, and slime moulds form spore-bearing fruiting bodies; Whittaker weighs cell type, organisation and nutrition together.', reveals: 'green-means-plant' },
                { text: 'Protista is a natural kingdom of close relatives, so both Euglena and slime mould belong there permanently and comfortably.', outcome: 'NCERT itself warns Protista\'s boundaries are not well defined — it\'s a convenience grouping of single-celled eukaryotes, not a monophyletic clade.', reveals: 'protista-is-natural-group' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You classified by evolutionary criteria, not by looks. That\'s why a pond-water green dot can be a protist while its photosynthesising bacterial neighbour is a moneran.',
            decisions: [{ prompt: 'What comes next? Biological Classification · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biological Classification · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_001', difficulty: 'standard',
          question: 'Whittaker\'s Five Kingdom Classification (1969) is a phylogenetic system that.',
          hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5.',
          misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural.',
          parts: [
                { id: 'a', prompt: 'State the five kingdoms in Whittaker\'s system and the three main criteria he used for classification.', answer: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia',
                  options: ['The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia', 'as a kingdom or citing', 'final, correct', 'Algae" as a kingdom or citing "habitat" as a main criterion'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5, c9_bio_ch1_10).',
                  misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural, monophyletic group.' },
                { id: 'b', prompt: 'Explain why fungi were separated from Plantae in Whittaker\'s system, even though both have cell walls and are non-motile.', answer: 'Fungi were separated',
                  options: ['Fungi were separated', 'fungi are not green', 'fungi are decomposers', 'final, correct'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5, c9_bio_ch1_10).',
                  misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural, monophyletic group.' },
                { id: 'c', prompt: 'A student observes a unicellular, eukaryotic, photosynthetic organism with a pellicle (protein-rich layer) instead of a cell wall, which becomes heterotrophic.', answer: 'The organism is Euglena, placed in Kingdom Protista',
                  options: ['The organism is Euglena, placed in Kingdom Protista', 'present in some', 'final, correct'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5, c9_bio_ch1_10).',
                  misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural, monophyletic group.' },
                { id: 'd', prompt: 'Compare and contrast the placement of cyanobacteria (blue-green algae) in the two-kingdom system vs Whittaker\'s five-kingdom system.', answer: 'In the two-kingdom system, cyanobacteria were placed in Plantae',
                  options: ['In the two-kingdom system, cyanobacteria were placed in Plantae', 'they are bacteria so they go to Monera', 'final, correct'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5, c9_bio_ch1_10).',
                  misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural, monophyletic group.' }
          ],
            remediations: { 'whittaker-s-system-is-the': { steps: ['Have the student read the NCERT paragraph: "All single-celled eukaryotes are placed under Protista, but the boundaries.', 'Ask them to list the five Protista subgroups (Chrysophytes, Dinoflagellates, Euglenoids, Slime moulds, Protozoans) and.', 'Show a phylogenetic tree diagram (from NCERT higher-class reference or teacher resource) where Protista appears.', 'Assign a 3-mark question: "Why is Kingdom Protista considered an artificial grouping?'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Whittaker\'s five-kingdom system perfectly reflects evolutionary relationships because it separates prokaryotes from eukaryotes.".', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'final, correct'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5, c9_bio_ch1_10).',
                  misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural, monophyletic group.' },
                { id: 'b', prompt: 'Design a dichotomous key using only Whittaker\'s five criteria (cell type, cell wall, nuclear membrane, body organization, nutrition) that distinguishes all.', answer: 'Step 1: Cell type → Prokaryotic (no nuclear membrane) → Kingdom Monera',
                  options: ['Step 1: Cell type → Prokaryotic (no nuclear membrane) → Kingdom Monera', 'final, correct'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_3, c9_bio_ch1_4, c9_bio_ch1_5, c9_bio_ch1_10).',
                  misconception: 'Students believe Whittaker\'s system is the "final, correct" classification and that Kingdom Protista is a natural, monophyletic group.' }
          ],
            remediations: { 'whittaker-s-system-is-the': { steps: ['Have the student read the NCERT paragraph: "All single-celled eukaryotes are placed under Protista, but the boundaries.', 'Ask them to list the five Protista subgroups (Chrysophytes, Dinoflagellates, Euglenoids, Slime moulds, Protozoans) and.', 'Show a phylogenetic tree diagram (from NCERT higher-class reference or teacher resource) where Protista appears.', 'Assign a 3-mark question: "Why is Kingdom Protista considered an artificial grouping?'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_002', difficulty: 'standard',
          question: 'Kingdom Monera comprises exclusively prokaryotic organisms (bacteria and.',
          hint: 'Revisit the prokaryotic vs eukaryotic cell comparison (Class 9 Cell chapter) and the.',
          misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are.',
          parts: [
                { id: 'a', prompt: 'State the three criteria R.H. Whittaker used to place all prokaryotes into a single Kingdom Monera.', answer: 'Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound',
                  options: ['Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound', 'unicellular body', 'absence of chlorophyll', 'blue-green algae'],
                  hint: 'Revisit the prokaryotic vs eukaryotic cell comparison (Class 9 Cell chapter) and the five-kingdom.',
                  misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are photosynthetic, filamentous, and.' },
                { id: 'b', prompt: 'A farmer notices yellowish-green scum on his flooded paddy field after applying nitrogen fertilizer.', answer: 'Organism: *Nostoc* (cyanobacterium/blue-green alga)',
                  options: ['Organism: *Nostoc* (cyanobacterium/blue-green alga)', 'blue-green algae'],
                  hint: 'Revisit the prokaryotic vs eukaryotic cell comparison (Class 9 Cell chapter) and the five-kingdom.',
                  misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are photosynthetic, filamentous, and.' }
          ],
            remediations: { 'blue-green-algae-cyanobacteria-are': { steps: ['Prepare a wet mount of *Nostoc* filament and a eukaryotic alga (*Spirogyra*) side by side on a microscope.', 'Observe under 400×: note absence of nucleus, absence of membrane-bound chloroplasts (thylakoids free in cytoplasm), and.', 'Add a drop of iodine solution — *Spirogyra* shows starch granules in chloroplasts; *Nostoc* shows glycogen granules.', 'Conclude that photosynthetic machinery is not confined to organelles in cyanobacteria, confirming prokaryotic.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_003', difficulty: 'standard',
          question: 'Bacteria are prokaryotic, unicellular microorganisms lacking a true nucleus and.',
          hint: 'Review c9_bio_ch1_2 (cell theory) and c8_bio_ch1_3 (cell structure) to establish the.',
          misconception: 'Students believe endospore formation is a form of reproduction because "a new structure forms from the cell." The error.',
          parts: [
                { id: 'a', prompt: 'Label the following structures on a bacterial cell diagram and state the function of each: cell wall, nucleoid, mesosome, ribosome, plasmid, flagellum, pilus.', answer: 'Cell wall (peptidoglycan)',
                  options: ['Cell wall (peptidoglycan)', 'nucleus', 'a new structure forms from the cell', 'endospore formation is a form of reproduction'],
                  hint: 'Review c9_bio_ch1_2 (cell theory) and c8_bio_ch1_3 (cell structure) to establish the.',
                  misconception: 'Students believe endospore formation is a form of reproduction because "a new structure forms from the cell." The error is conflating.' },
                { id: 'b', prompt: 'Describe the process of binary fission in bacteria, including the role of DNA replication, cell elongation, and septum formation.', answer: 'Binary fission: (1) Circular DNA replicates bidirectionally from the origin',
                  options: ['Binary fission: (1) Circular DNA replicates bidirectionally from the origin', 'a new structure forms from the cell', 'endospore formation is a form of reproduction'],
                  hint: 'Review c9_bio_ch1_2 (cell theory) and c8_bio_ch1_3 (cell structure) to establish the.',
                  misconception: 'Students believe endospore formation is a form of reproduction because "a new structure forms from the cell." The error is conflating.' }
          ],
            remediations: { 'endospore-formation-is-a-form': { steps: ['Show a time-lapse diagram of binary fission (1 cell -> 2 -> 4 -> 8...) and a separate diagram of sporulation (1.', 'Ask: "In which process does the number of cells increase? In which does it stay the same?"', 'Have the student write: "Binary fission = reproduction (cell number increases).', 'Revisit c9_bio_ch1_2 (cell theory) to reinforce that reproduction requires producing new individuals.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_004', difficulty: 'standard',
          question: 'Kingdom Protista comprises unicellular eukaryotic organisms that are primarily.',
          hint: 'Review Class 9 cell organelles (c9_bio_ch1_6, c9_bio_ch1_10) and Class 11 five-kingdom.',
          misconception: 'Students often think all photosynthetic protists are \'algae\' and belong to Plantae, and all heterotrophic protists are.',
          parts: [
                { id: 'a', prompt: 'Name the five major groups of Kingdom Protista as per Whittaker\'s classification and give one distinguishing feature for each group.', answer: 'The five groups are: (1) Chrysophytes',
                  options: ['The five groups are: (1) Chrysophytes', 'bacteria or fungi, or missing mixotrophy in euglenoids'],
                  hint: 'Review Class 9 cell organelles (c9_bio_ch1_6, c9_bio_ch1_10) and Class 11 five-kingdom criteria.',
                  misconception: 'Students often think all photosynthetic protists are \'algae\' and belong to Plantae, and all heterotrophic protists are \'protozoa\' and.' }
          ],
            remediations: { 'all-photosynthetic-protists-are-algae': { steps: ['Revisit the eukaryotic cell ultrastructure (nucleus, mitochondria, chloroplasts, pellicle, cilia, flagella.', 'Create a comparison table with columns: Group, Cell Covering, Locomotion, Nutrition, Habitat, Example.', 'For each group, write one sentence explaining why it is NOT a plant, fungus, or animal.', 'Practice classifying 5 unseen protist descriptions (e.g., \'unicellular, silica shell, photosynthetic, marine\' → diatom).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_005', difficulty: 'standard',
          question: 'Kingdom Fungi comprises eukaryotic, heterotrophic organisms with cell walls.',
          hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) for kingdom-defining criteria, and.',
          misconception: 'Students believe that "dikaryotic" means "diploid" (2n) and that the two nuclei in a dikaryotic cell have fused.',
          parts: [
                { id: 'a', prompt: 'Explain why aseptate, coenocytic hyphae are considered a primitive characteristic in fungi, and name the class where this feature is predominant.', answer: 'Aseptate coenocytic hyphae lack cross-walls (septa), resulting in a continuous',
                  options: ['Aseptate coenocytic hyphae lack cross-walls (septa), resulting in a continuous', 'Ascomycetes', 'septate hyphae are primitive', 'dikaryotic'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) for kingdom-defining criteria, and c9_bio_ch1_12.',
                  misconception: 'Students believe that "dikaryotic" means "diploid" (2n) and that the two nuclei in a dikaryotic cell have fused.' }
          ],
            remediations: { 'dikaryotic-means-diploid-2n-and': { steps: ['Draw a timeline of the fungal sexual cycle on paper – label three sequential events: plasmogamy (cytoplasm merges.', 'Use two different coloured pens to track the two parental nuclei through each stage.', 'Verbally explain to a peer why the dikaryotic cell is NOT diploid – it has two haploid nuclei, not one nucleus with.', 'Re-read NCERT Figure 2.5 legend noting "dikaryotic stage (n+n, i.e., two nuclei per cell)" and contrast with "diploid.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_006', difficulty: 'standard',
          question: 'Lichens are obligate symbiotic associations between a fungal partner.',
          hint: 'Revisit c11_bio_cbse_02_005 (fungal hyphae, coenocytic vs septate, absorptive nutrition).',
          misconception: 'Students think lichens are "algae covered by fungus" like a blanket, and mycorrhiza is "fungi growing on roots" like.',
          parts: [
                { id: 'a', prompt: 'A student collects a foliose lichen from a polluted industrial area and another from a pristine forest. The industrial specimen shows bleached, damaged thalli.', answer: 'SO₂ dissolves in the lichen\'s surface moisture forming sulfurous acid (H₂SO₃)',
                  options: ['SO₂ dissolves in the lichen\'s surface moisture forming sulfurous acid (H₂SO₃)', 'SO₂ kills the fungus directly', 'lichens have stomata that close', 'algae covered by fungus'],
                  hint: 'Revisit c11_bio_cbse_02_005 (fungal hyphae, coenocytic vs septate, absorptive nutrition) and.',
                  misconception: 'Students think lichens are "algae covered by fungus" like a blanket, and mycorrhiza is "fungi growing on roots" like a pathogen.' }
          ],
            remediations: { 'lichens-are-algae-covered-by': { steps: ['Draw a cross-section of a foliose lichen thallus labeling upper cortex, algal layer, medulla, lower cortex, rhizines.', 'Examine a prepared slide of arbuscular mycorrhiza root – trace a hypha from soil, through epidermis, into cortex.', 'Compare with ectomycorrhiza slide – note Hartig net BETWEEN cells, no penetration.', 'Place a dry lichen fragment on a slide, add water – watch it rehydrate and turn green in seconds (poikilohydry.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
