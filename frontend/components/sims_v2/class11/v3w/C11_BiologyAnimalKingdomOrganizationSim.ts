import type { SimDef } from '../../engine/types';
import C11_BiologyAnimalKingdomOrganizationSim from '../../../simulations/c6_12/C11_BiologyAnimalKingdomOrganizationSim';

/** v3 wrapped master — C11_BiologyAnimalKingdomOrganizationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyanimalkingdomorganizationsim: SimDef = {
    id: 'v3w_c11_biologyanimalkingdomorganizationsim',
    title: 'Cellular Organisation and Consciousness',
    subtitle: 'Covers cellular organisation as a defining characteristic of life (cell theory, levels of.',
    classLevel: 11, subject: 'biology', topic: 'Cellular Organisation and Consciousness',
    chapters: [],
    nodeIds: ['c11_bio_cbse_01_003', 'c11_bio_cbse_04_005', 'c11_bio_cbse_01_005', 'c11_bio_cbse_04_001', 'c11_bio_cbse_04_002', 'c11_bio_cbse_04_007', 'c11_bio_cbse_04_008', 'c11_bio_cbse_04_009', 'c11_bio_cbse_04_010', 'c11_bio_cbse_04_011', 'c11_bio_cbse_04_013', 'c11_bio_cbse_02_001', 'c11_bio_cbse_02_008', 'c11_bio_cbse_03_004', 'c11_bio_cbse_04_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a drop of stagnant pond water under a microscope — you see Paramecium, a single cell performing.', goal: 'Master Cellular Organisation and Consciousness.' },
    discovery: {
        question: 'Evaluate this claim: "Viruses show cellular organisation because they contain genetic material (DNA/RNA) enclosed in a protein coat, and they respond to host.',
        options: ['Incorrect', 'having genetic material', 'being cellularly organised'],
        answer: 'Incorrect',
        hook: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means.',
    },
    teaching: [
        { title: 'Cellular organisation is the defining.', text: 'Cellular organisation is the defining structural hierarchy of life where cells (the basic unit) are arranged into tissues, organs, and organ systems enabling division of labour; consciousness is the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_01_003', title: 'Cellular organisation is the defining.',
          scaffold: { problem: 'A Class 11 student observes a drop of pond water and sees Paramecium moving away from an obstacle.',
            steps: [
            { text: 'Identify the organism type — Paramecium is unicellular (single cell performs all functions); earthworm is multicellular.' },
            { text: 'Recall cellular organisation principle — In unicellular organisms, the cell membrane and organelles directly detect and.' },
            { text: 'Analyze Paramecium\'s response — Obstacle contact → mechanosensitive channels in cell membrane → Ca²⁺ influx → ciliary.' },
            { text: 'Analyze earthworm\'s response — Soil vibration → sensory neurons in body wall → ventral nerve cord (CNS) → motor neurons.' },
            { text: 'Conclude — Unicellular consciousness is cell-autonomous (single cell does everything); multicellular consciousness.', faded: true, blankAnswer: 'Paramecium (unicellular): Single cell detects stimulus via.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_005', title: 'Phylum Ctenophora comprises exclusively.',
          scaffold: { problem: 'A Class 11 student finds a gelatinous, transparent, spherical marine organism ~3 cm diameter on Puri beach, Odisha.',
            steps: [
            { text: 'Observe radial symmetry — any plane through the central axis divides the organism into similar halves; this matches.' },
            { text: 'Note diploblastic organisation — the body wall is two-layered (ectoderm and endoderm) with thick mesoglea; no.' },
            { text: 'Identify tissue-level organisation — cells are organised into tissues (epidermis, gastrodermis, nerve net, muscle-like.' },
            { text: 'Detect eight meridional rows of ciliated comb plates (ctenes) — this is the defining synapomorphy of Phylum Ctenophora.' },
            { text: 'Confirm prey capture via colloblasts — the sticky tentacles lack nematocysts (no stinging observed); they adhere to.' },
            { text: 'Verify absence of alternation of generations — no polyp stage observed; reproduction would be sexual with external.' },
            { text: 'Conclude phylum — all observed features (radial symmetry, diploblasty, tissue level, eight comb plates, colloblasts, no.', faded: true, blankAnswer: 'Phylum Ctenophora. Justification: Radially symmetrical,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_01_005', title: 'Taxonomic hierarchy is the systematic.',
          scaffold: { problem: 'A botanist discovers a new flowering plant in the Eastern Himalayas.',
            steps: [
            { text: 'Kingdom — Plantae. Justification: Multicellular, eukaryotic, photosynthetic, cell wall of cellulose (fundamental plant.' },
            { text: 'Division — Angiospermae. Justification: Seeds enclosed in ovary (angiosperm synapomorphy), flowering plant.' },
            { text: 'Class — Dicotyledonae. Justification: Two cotyledons, reticulate venation (implied), pentamerous flowers.' },
            { text: 'Order — Solanales (example). Justification: Sympetalous corolla, superior ovary, capsule fruit — aggregate floral.' },
            { text: 'Family — Solanaceae. Justification: Pentamerous flowers, sympetalous corolla, superior ovary, capsule/berry fruit —.' },
            { text: 'Genus — *Solanum* (hypothetical). Justification: Specific combination of anther dehiscence (poricidal), calyx.' },
            { text: 'Species — *Solanum novum* (new species). Justification: Unique morphological traits (e.g., leaf shape, flower colour,.', faded: true, blankAnswer: 'Kingdom Plantae → Division Angiospermae → Class.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_001', title: 'Symmetry refers to the geometric.',
          scaffold: { problem: 'A student observes a live specimen in a biology lab: it is cylindrical, bilaterally symmetrical, has a complete digestive tract with mouth.',
            steps: [
            { text: 'Observe key features — bilateral symmetry + complete digestive tract + fluid-filled cavity.' },
            { text: 'Note the cavity lining — "shiny and continuous on both body wall and gut surface" indicates mesoderm-derived peritoneum.' },
            { text: 'Recall definition — a cavity fully lined by mesoderm (parietal + visceral peritoneum) is a true coelom (schizocoelom or.' },
            { text: 'Identify membranous sheets — these are mesenteries (double layers of peritoneum) that suspend the gut and allow organ.' },
            { text: 'Compare with pseudocoelomate (Ascaris) — in Ascaris, mesoderm forms only scattered pouches; no visceral peritoneum, no.' },
            { text: 'Explain advantage — mesenteries enable organ differentiation, independent movement, and efficient hydrostatic skeleton;.', faded: true, blankAnswer: 'True coelom (coelomate); membranous sheets are mesenteries;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_002', title: 'Levels of organisation in animals.',
          scaffold: { problem: 'A biology student observes two unknown specimens under a dissecting microscope.',
            steps: [
            { text: 'Identify Specimen A\'s key features - flattened body (dorso-ventral), unsegmented, single opening (mouth+anus combined),.' },
            { text: 'Recall that single opening = incomplete digestive system; flattened body + no coelom (implied by no segmental.' },
            { text: 'Match to phylum Platyhelminthes characteristics: triploblastic, acoelomate, bilateral, organ level, incomplete gut.' },
            { text: 'Identify Specimen B\'s key features - metameric segmentation (visible rings), dorsal vessel (closed circulation), paired.' },
            { text: 'Recall that segmentation + closed circulation + complete gut + coelom (implied by segmental coelomic compartments) =.' },
            { text: 'Conclude Specimen A = Organ level (Platyhelminthes); Specimen B = Organ-system level (Annelida).', faded: true, blankAnswer: 'Specimen A - Organ level (Platyhelminthes). Specimen B -.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_007', title: 'Phylum Aschelminthes (Nemathelminthes).',
          scaffold: { problem: 'A student observes a worm under a microscope: cylindrical body, tapering ends, thrashing movement, complete digestive tract visible, no.',
            steps: [
            { text: 'Note the body shape – cylindrical (round in cross-section) → suggests "roundworm" (Aschelminthes).' },
            { text: 'Observe locomotion – thrashing/whipping → indicates hydrostatic skeleton from fluid-filled cavity (pseudocoelom).' },
            { text: 'Check digestive tract – mouth and anus both present → complete alimentary canal, unlike Platyhelminthes.' },
            { text: 'Check segmentation – absent → rules out Annelida and Arthropoda.' },
            { text: 'Combine: pseudocoelomate + complete gut + unsegmented + bilateral + triploblastic = Phylum Aschelminthes.', faded: true, blankAnswer: 'Phylum Aschelminthes. Justification: (1) Pseudocoelomate.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_04_005', title: 'Identify each idea',
          dissect: { specimen: 'Cellular Organisation and Consciousness', spots: [
            { id: 's1', label: 'Cellular organisation is the defining', prompt: 'Which idea is this? — Cellular organisation is the defining structural hierarchy of life where cells (the basic.', answer: 'Cellular organisation is the defining', options: ['Cellular organisation is the defining', 'Phylum Ctenophora comprises exclusively marine', 'Taxonomic hierarchy is the systematic', 'Symmetry refers to the geometric'] },
            { id: 's2', label: 'Phylum Ctenophora comprises exclusively marine', prompt: 'Which idea is this? — Phylum Ctenophora comprises exclusively marine, radially symmetrical, diploblastic.', answer: 'Phylum Ctenophora comprises exclusively marine', options: ['Phylum Ctenophora comprises exclusively marine', 'Cellular organisation is the defining', 'Taxonomic hierarchy is the systematic', 'Symmetry refers to the geometric'] },
            { id: 's3', label: 'Taxonomic hierarchy is the systematic', prompt: 'Which idea is this? — Taxonomic hierarchy is the systematic arrangement of organisms into a ranked series of.', answer: 'Taxonomic hierarchy is the systematic', options: ['Taxonomic hierarchy is the systematic', 'Cellular organisation is the defining', 'Phylum Ctenophora comprises exclusively marine', 'Symmetry refers to the geometric'] },
            { id: 's4', label: 'Symmetry refers to the geometric', prompt: 'Which idea is this? — Symmetry refers to the geometric arrangement of body parts around a central axis,.', answer: 'Symmetry refers to the geometric', options: ['Symmetry refers to the geometric', 'Cellular organisation is the defining', 'Phylum Ctenophora comprises exclusively marine', 'Taxonomic hierarchy is the systematic'] },
            { id: 's5', label: 'Levels of organisation in animals', prompt: 'Which idea is this? — Levels of organisation in animals describe the hierarchical complexity of structural and.', answer: 'Levels of organisation in animals', options: ['Levels of organisation in animals', 'Cellular organisation is the defining', 'Phylum Ctenophora comprises exclusively marine', 'Taxonomic hierarchy is the systematic'] },
            { id: 's6', label: 'Phylum Aschelminthes Nemathelminthes comprises bilaterally', prompt: 'Which idea is this? — Phylum Aschelminthes (Nemathelminthes) comprises bilaterally symmetrical, triploblastic,.', answer: 'Phylum Aschelminthes Nemathelminthes comprises bilaterally', options: ['Phylum Aschelminthes Nemathelminthes comprises bilaterally', 'Cellular organisation is the defining', 'Phylum Ctenophora comprises exclusively marine', 'Taxonomic hierarchy is the systematic'] }
          ] } }
    ],
    explore: { component: C11_BiologyAnimalKingdomOrganizationSim, prompt: 'Explore the interactive — Cellular Organisation and Consciousness' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_003', difficulty: 'standard',
          question: 'Cellular organisation is the defining structural hierarchy of life where cells.',
          hint: 'Revisit Class 9 Cell Theory (c9_bio_ch1_2) and Levels of Organisation (c8_bio_ch1_8) —.',
          misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means.',
          parts: [
                { id: 'a', prompt: 'A student says: "Amoeba and human both show cellular organisation because both are made of cells." Explain why this statement is incomplete.', answer: 'The statement misses division of labour and hierarchical organisation',
                  options: ['The statement misses division of labour and hierarchical organisation', 'both have cell membrane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means HIERARCHICAL organisation.' }
          ],
            remediations: { 'students-equate-cellular-organisation-with': { steps: ['Revisit Class 9 Cell Theory (c9_bio_ch1_2): Write the 3 postulates and identify which applies to unicellular vs.', 'Draw a 5-level hierarchy diagram for a mango tree (cell: parenchyma → tissue: xylem → organ: root → system: root system.', 'Perform the Mimosa pudica touch test (Diagnostic Q6) and simultaneously test your knee-jerk reflex (Class 10,.', 'Complete the comparison table: Stimulus | Receptor | Signal Type | Effector | Speed for both.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Viruses show cellular organisation because they contain genetic material (DNA/RNA) enclosed in a protein coat, and they respond to host.', answer: 'Incorrect',
                  options: ['Incorrect', 'having genetic material', 'being cellularly organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means HIERARCHICAL organisation.' },
                { id: 'b', prompt: 'Design a simple classroom experiment to demonstrate that plants exhibit consciousness (response to stimuli) without a nervous system.', answer: 'plant material, (',
                  options: ['plant material, (', 'water the plant and see if it grows'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means HIERARCHICAL organisation.' }
          ],
            remediations: { 'students-equate-cellular-organisation-with': { steps: ['Revisit Class 9 Cell Theory (c9_bio_ch1_2): Write the 3 postulates and identify which applies to unicellular vs.', 'Draw a 5-level hierarchy diagram for a mango tree (cell: parenchyma → tissue: xylem → organ: root → system: root system.', 'Perform the Mimosa pudica touch test (Diagnostic Q6) and simultaneously test your knee-jerk reflex (Class 10,.', 'Complete the comparison table: Stimulus | Receptor | Signal Type | Effector | Speed for both.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_005', difficulty: 'standard',
          question: 'Phylum Ctenophora comprises exclusively marine, radially symmetrical,.',
          hint: 'If stuck, review c11_bio_cbse_04_001 (Basis of Classification) focusing on Table 4.1.',
          misconception: 'Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish" in common language and share.',
          parts: [
                { id: 'a', prompt: 'A student observes a transparent, gelatinous, oval marine animal about 2 cm long with eight shimmering rows of cilia running along its body.', answer: 'The animal belongs to Phylum Ctenophora, not Cnidaria',
                  options: ['The animal belongs to Phylum Ctenophora, not Cnidaria', 'jellyfish'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish" in common language and share radial symmetry,.' }
          ],
            remediations: { 'students-consistently-confuse-ctenophora-with': { steps: ['Create a side-by-side comparison table with columns for Comb plates (present/absent), Prey-capture cells.', 'Use labelled diagrams of Pleurobrachia (ctenophore) and Aurelia (cnidarian) to visually identify the eight comb rows vs.', 'Practice NCERT Exercise Q14 matching: "Comb plates → (i) Ctenophora" and "Cnidoblasts → (ii) Coelenterata" until.', 'Write a one-sentence definition of Ctenophora that includes "comb plates" and "colloblasts" but excludes "nematocysts".'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish" in common language and share.',
          parts: [
                { id: 'a', prompt: 'Design a simple dichotomous key using only observable features (no internal anatomy) that a marine biology student could use on a beach at night to distinguish.', answer: 'A good key: 1a',
                  options: ['A good key: 1a', 'presence of bioluminescence', 'jellyfish'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish" in common language and share radial symmetry,.' }
          ],
            remediations: { 'students-consistently-confuse-ctenophora-with': { steps: ['Create a side-by-side comparison table with columns for Comb plates (present/absent), Prey-capture cells.', 'Use labelled diagrams of Pleurobrachia (ctenophore) and Aurelia (cnidarian) to visually identify the eight comb rows vs.', 'Practice NCERT Exercise Q14 matching: "Comb plates → (i) Ctenophora" and "Cnidoblasts → (ii) Coelenterata" until.', 'Write a one-sentence definition of Ctenophora that includes "comb plates" and "colloblasts" but excludes "nematocysts".'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_005', difficulty: 'standard',
          question: 'Taxonomic hierarchy is the systematic arrangement of organisms into a ranked.',
          hint: 'Review c9_bio_ch4_7 (Hierarchy of Classification) and c9_bio_ch4_8 (Binomial.',
          misconception: 'Students believe that \'Species\' is defined solely by morphological similarity and that members of a species cannot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Taxonomic hierarchy is the systematic arrangement of organisms into a ranked series of',
                  options: ['Taxonomic hierarchy is the systematic arrangement of organisms into a ranked series of', 'Cellular organisation is the defining structural hierarchy of life where cells (the basic', 'Phylum Ctenophora comprises exclusively marine, radially symmetrical, diploblastic', 'Symmetry refers to the geometric arrangement of body parts around a central axis,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that \'Species\' is defined solely by morphological similarity and that members of a species cannot interbreed with other.' }
          ],
            remediations: { 'species-is-defined-solely-by': { steps: ['Revisit c9_bio_ch4_7 (Hierarchy of Classification) and c9_bio_ch4_8 (Binomial Nomenclature) — specifically the.', 'Use Table 1.1 (NCERT) to trace *Homo sapiens* and *Mangifera indica* through all seven categories, writing one.', 'Practice with three new organisms (e.g., *Azadirachta indica* neem, *Pavo cristatus* peacock, *Escherichia coli*) using.', 'Explain aloud why \'Phylum\' is used for animals but \'Division\' for plants — this terminology difference is a frequent.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_001', difficulty: 'standard',
          question: 'Symmetry refers to the geometric arrangement of body parts around a central.',
          hint: 'Revisit c9_bio_ch1_12 (Cell Division: Meiosis and significance in sexual reproduction).',
          misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid.',
          parts: [
                { id: 'a', prompt: 'A newly discovered marine worm is triploblastic, bilaterally symmetrical, and possesses a fluid-filled cavity between its body wall and gut that is lined by.', answer: 'Step 1: Identify cavity condition',
                  options: ['Step 1: Identify cavity condition', 'radial symmetry = diploblastic', 'bilateral symmetry = triploblastic = coelomate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid one-to-one mappings.' }
          ],
            remediations: { 'radial-symmetry-diploblastic-and-bilateral': { steps: ['Draw a 3-column table (Symmetry, Germ Layers, Coelom) with rows for Porifera, Cnidaria, Platyhelminthes, Aschelminthes,.', 'Fill using NCERT Table 4.2 — note where patterns break (Echinodermata radial but triploblastic/coelomate;.', 'Trace the evolutionary arrows in Figure 4.4: radial diploblastic acoelomate (Cnidaria) → bilateral triploblastic.', 'Verbally explain each transition: "Mesoderm appears → acoelomate; mesoderm forms pouches → pseudocoelom; mesoderm.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All bilaterally symmetrical animals are triploblastic and coelomate." Provide a counterexample for each false claim and explain why.', answer: 'The statement is false on two counts',
                  options: ['The statement is false on two counts', 'radial symmetry = diploblastic', 'bilateral symmetry = triploblastic = coelomate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid one-to-one mappings.' },
                { id: 'b', prompt: 'Design a dichotomous key using only symmetry, germ layers, and coelom type to distinguish these five phyla: Porifera, Cnidaria, Platyhelminthes, Aschelminthes,.', answer: 'Couplet 1: (a) Body asymmetrical, cellular level of organisation → Porifera',
                  options: ['Couplet 1: (a) Body asymmetrical, cellular level of organisation → Porifera', 'radial symmetry = diploblastic', 'bilateral symmetry = triploblastic = coelomate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid one-to-one mappings.' }
          ],
            remediations: { 'radial-symmetry-diploblastic-and-bilateral': { steps: ['Draw a 3-column table (Symmetry, Germ Layers, Coelom) with rows for Porifera, Cnidaria, Platyhelminthes, Aschelminthes,.', 'Fill using NCERT Table 4.2 — note where patterns break (Echinodermata radial but triploblastic/coelomate;.', 'Trace the evolutionary arrows in Figure 4.4: radial diploblastic acoelomate (Cnidaria) → bilateral triploblastic.', 'Verbally explain each transition: "Mesoderm appears → acoelomate; mesoderm forms pouches → pseudocoelom; mesoderm.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_002', difficulty: 'standard',
          question: 'Levels of organisation in animals describe the hierarchical complexity of.',
          hint: 'Review Class 9 Animal Tissues (c9_bio_ch2_5 to c9_bio_ch2_8) focusing on tissue.',
          misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Cnidaria and Ctenophora both show tissue level of organisation, so they must have identical digestive system complexity." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'level of organisation', 'identical system complexity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' },
                { id: 'b', prompt: 'Given an unknown triploblastic animal with organ-level organisation, bilateral symmetry, and an incomplete digestive system (single opening), identify its.', answer: 'Phylum Platyhelminthes',
                  options: ['Phylum Platyhelminthes', 'organ level of organisation', 'organ system level of organisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' },
                { id: 'c', prompt: 'Compare the circulatory system organisation in Annelida (earthworm) and Arthropoda (cockroach) at the organ-system level.', answer: 'Both achieve organ-system level',
                  options: ['Both achieve organ-system level', 'open circulation means lower organisation level', 'organ level of organisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' }
          ],
            remediations: { 'organ-level-of-organisation-and': { steps: ['Draw two flowcharts side-by-side. Left: "Organ Level (Platyhelminthes)" - list organs as isolated boxes (Brain,.', 'Ask "Which diagram shows organs working as a coordinated unit for a physiological function?"', 'Have student write one-sentence definition: "Organ system level = organs linked by common physiological function and.', 'Apply to new example - leech (Hirudinaria) has segmented nephridia connected by longitudinal excretory canals → organ.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of.',
          parts: [
                { id: 'a', prompt: 'A researcher discovers a new marine worm with these features: triploblastic, bilateral symmetry, true coelom, metameric segmentation, complete digestive.', answer: 'Organ-system level',
                  options: ['Organ-system level', 'segmentation', 'complete gut', 'organ level of organisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' }
          ],
            remediations: { 'organ-level-of-organisation-and': { steps: ['Draw two flowcharts side-by-side. Left: "Organ Level (Platyhelminthes)" - list organs as isolated boxes (Brain,.', 'Ask "Which diagram shows organs working as a coordinated unit for a physiological function?"', 'Have student write one-sentence definition: "Organ system level = organs linked by common physiological function and.', 'Apply to new example - leech (Hirudinaria) has segmented nephridia connected by longitudinal excretory canals → organ.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_007', difficulty: 'standard',
          question: 'Phylum Aschelminthes (Nemathelminthes) comprises bilaterally symmetrical,.',
          hint: 'Review the coelom types in node c11_bio_cbse_04_001 and the flatworm features in node.',
          misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait,.',
          parts: [
                { id: 'a', prompt: 'State the three germ layers present in Aschelminthes and name the body cavity type they possess.', answer: 'Ectoderm, mesoderm, endoderm (triploblastic)',
                  options: ['Correct answer: Ectoderm, mesoderm, endoderm (triploblastic)', 'diploblastic', 'acoelomate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' },
                { id: 'b', prompt: 'A cylindrical worm is found in a soil sample. It has a complete digestive system with a muscular pharynx, an excretory pore, and separate sexes.', answer: 'Phylum Aschelminthes',
                  options: ['Correct answer: Phylum Aschelminthes', 'Annelida because it has a body cavity', 'pseudocoelom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' }
          ],
            remediations: { 'pseudocoelom-means-false-coelom-in': { steps: ['Draw three cross-sections side-by-side: Platyhelminthes (solid mesoderm), Aschelminthes (mesoderm only on body wall and.', 'Label each cavity type.', 'For each, ask: "Can organs be suspended? Is there a hydrostatic skeleton? Can the gut be long and coiled?"', 'Relate answers to the phylum\'s typical body size and complexity.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait,.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All Aschelminthes are parasitic worms causing human disease." Provide two counter-examples from the phylum.', answer: 'The statement is false',
                  options: ['Correct answer: The statement is false', 'true, all are parasites', 'pseudocoelom', 'false coelom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' },
                { id: 'b', prompt: 'Design a simple dichotomous key using only body cavity type, digestive tract completeness, and segmentation to separate Platyhelminthes, Aschelminthes, and.', answer: 'Expected answer: 1a',
                  options: ['Expected answer: 1a', 'pseudocoelom', 'false coelom', 'less evolved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' }
          ],
            remediations: { 'pseudocoelom-means-false-coelom-in': { steps: ['Draw three cross-sections side-by-side: Platyhelminthes (solid mesoderm), Aschelminthes (mesoderm only on body wall and.', 'Label each cavity type.', 'For each, ask: "Can organs be suspended? Is there a hydrostatic skeleton? Can the gut be long and coiled?"', 'Relate answers to the phylum\'s typical body size and complexity.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
