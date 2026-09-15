import type { SimDef } from '../../engine/types';
import C9_BiologyAnimalKingdomClassificationSim from '../../../simulations/c6_12/C9_BiologyAnimalKingdomClassificationSim';

/** v3 wrapped master — C9_BiologyAnimalKingdomClassificationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_biologyanimalkingdomclassificationsim: SimDef = {
    id: 'v3w_c9_biologyanimalkingdomclassificationsim',
    title: 'Animal Kingdom Classification',
    subtitle: 'This node covers the *reasons* and *necessity* for classification systems (organization,.',
    classLevel: 9, subject: 'biology', topic: 'Need for Classification of Living Organisms',
    chapters: [],
    nodeIds: ['c9_bio_ch4_3', 'c9_bio_ch4_4', 'c9_bio_ch4_5', 'c9_bio_ch4_7', 'c9_bio_ch4_8', 'c9_bio_ch2_6', 'c9_bio_ch2_7', 'c9_bio_ch4_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine walking into a massive library in Delhi where millions of books are piled randomly on the floor with.', goal: 'Master Animal Kingdom Classification.' },
    discovery: {
        question: 'A farmer in Punjab discovers an unknown insect damaging wheat crops.',
        options: ['Correct answer: Classification groups organisms with shared characteristics', 'the scientist knew the name', 'naming things'],
        answer: 'Correct answer: Classification groups organisms with shared characteristics',
        hook: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static.',
    },
    teaching: [
        { title: 'Classification is the scientific process of.', text: 'Classification is the scientific process of grouping living organisms into hierarchical categories based on shared characteristics and evolutionary relationships, enabling systematic study,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_bio_ch4_3', title: 'Classification is the scientific.',
          scaffold: { problem: 'A team of researchers in the Andaman Islands discovers a new species of mangrove tree.',
            steps: [
            { text: 'Identify the core problem — multiple audiences with different languages and purposes need precise, unambiguous.' },
            { text: 'Recall that classification provides a universal hierarchical framework (Kingdom → Species) with standardized Latin.' },
            { text: 'Apply to audience (a): Local rangers use the *species* binomial (*e.g., Rhizophora andamanensis*) as a universal ID.' },
            { text: 'Apply to audience (b): International experts use the *genus* (Rhizophora) and *family* (Rhizophoraceae) to instantly.' },
            { text: 'Apply to audience (c): The pharmaceutical company uses the *family* and *order* (Malpighiales) to predict chemical.' },
            { text: 'Conclude that a single classification system simultaneously serves identification, ecological inference, and.', faded: true, blankAnswer: 'Classification meets all three needs through its hierarchy:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch4_4', title: 'Classification criteria are the.',
          scaffold: { problem: 'A student finds a small, green, filamentous organism in a freshwater pond.',
            steps: [
            { text: 'List observed characteristics — eukaryotic cells (nucleus present), cell wall present, chloroplasts present.' },
            { text: 'Apply Criterion 1 (Cell Type) — Eukaryotic → excludes Monera (prokaryotic).' },
            { text: 'Apply Criterion 2 (Cellular Organization) — Multicellular but *thalloid* (no true tissues/organs) → not fully organized.' },
            { text: 'Apply Criterion 3 (Mode of Nutrition) — Autotrophic (photosynthetic) → matches Plantae, but also matches some Protista.' },
            { text: 'Apply Criterion 4 (Body Organization) — Thallophyta level (no vascular tissue, no embryo stage) → key differentiator:.' },
            { text: 'Conclusion — Kingdom Protista (specifically, green algae like Spirogyra).', faded: true, blankAnswer: 'Kingdom Protista. Reason: Although eukaryotic,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch4_5', title: 'The Five Kingdom Classification is a.',
          scaffold: { problem: 'A farmer in Punjab finds a white, cottony growth on stored wheat grains.',
            steps: [
            { text: 'Identify cell structure—hyphae have cross-walls (septa) and multiple nuclei per cell; each cell has a true nucleus and.' },
            { text: 'Identify body organization—branching hyphae form a mycelium; this is multicellular (though coenocytic) → excludes.' },
            { text: 'Identify nutrition mode—grows on stored wheat (dead organic matter), secretes enzymes, absorbs nutrients → absorptive.' },
            { text: 'Check cell wall composition—fungal cell walls are made of chitin (nitrogen-containing polysaccharide), not cellulose →.' },
            { text: 'Check motility—non-motile (spores disperse passively) → consistent with Fungi; Animalia are typically motile and.', faded: true, blankAnswer: 'Kingdom Fungi. The organism is a mold (likely Aspergillus.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch4_7', title: 'The hierarchical classification system.',
          scaffold: { problem: 'A Class 9 student observes a small, green, filamentous organism growing on damp bark of a neem tree in their backyard.',
            steps: [
            { text: 'Identify the basic cellular features observed - rectangular cells, cell walls, chloroplasts, no distinct nucleus.' },
            { text: 'Recall classification criteria from c9_bio_ch4_4: Prokaryotic cell type → Kingdom Monera (now Bacteria).' },
            { text: 'Filamentous colonial form with heterocysts (nitrogen-fixing cells) visible → Class Cyanophyceae.' },
            { text: 'Filaments with akinetes (thick-walled resting spores) and heterocysts terminal/intercalary → Family Nostocaceae.' },
            { text: 'Species identification requires detailed morphological and genetic analysis; student can only reach Genus level with.', faded: true, blankAnswer: 'Kingdom Bacteria (Monera), Phylum Cyanobacteria, Class.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch4_8', title: 'Binomial nomenclature is the.',
          scaffold: { problem: 'A Class 9 student finds a butterfly in their garden in Pune. They want to report it on a citizen-science app that requires the scientific.',
            steps: [
            { text: 'Recognize that common names are unreliable for scientific reporting because "Common Mormon" might refer to different.' },
            { text: 'Consult a reliable field guide or database (e.g., Butterflies of India website) for the scientific name corresponding.' },
            { text: 'Find the binomial: *Papilio polytes* (genus *Papilio*, species epithet *polytes*).' },
            { text: 'Apply formatting rules: capitalize genus (*Papilio*), lowercase species epithet (*polytes*), italicize both.' },
            { text: 'Write the full name *Papilio polytes* in the app; if mentioning again in the same report, abbreviate as *P. polytes*.', faded: true, blankAnswer: 'The correct scientific name to enter is *Papilio polytes*.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch2_6', title: 'Connective tissue is a type of animal.',
          scaffold: { problem: 'A 12-year-old boy falls while playing cricket and fractures his forearm.',
            steps: [
            { text: 'Identify the injury — bone fracture damages bone tissue (specialized connective tissue) and periosteum (dense irregular.' },
            { text: 'Recall healing stages — hematoma forms (blood connective tissue), then granulation tissue (areolar connective tissue.' },
            { text: 'Soft callus formation — fibroblasts and chondroblasts produce fibrocartilage (a type of dense connective tissue with.' },
            { text: 'Hard callus formation — osteoblasts replace fibrocartilage with woven bone (immature bone connective tissue) via.' },
            { text: 'Remodeling — osteoclasts and osteoblasts reshape the bone to original architecture; the sequence ensures initial.', faded: true, blankAnswer: 'The stages involve blood (hematoma), areolar tissue.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_bio_ch4_4', title: 'Identify each idea',
          dissect: { specimen: 'Animal Kingdom Classification', spots: [
            { id: 's1', label: 'Classification is the scientific process', prompt: 'Which idea is this? — Classification is the scientific process of grouping living organisms into hierarchical.', answer: 'Classification is the scientific process', options: ['Classification is the scientific process', 'Classification criteria are the fundamental', 'The Five Kingdom Classification is', 'The hierarchical classification system organizes'] },
            { id: 's2', label: 'Classification criteria are the fundamental', prompt: 'Which idea is this? — Classification criteria are the fundamental, heritable characteristics — such as cell.', answer: 'Classification criteria are the fundamental', options: ['Classification criteria are the fundamental', 'Classification is the scientific process', 'The Five Kingdom Classification is', 'The hierarchical classification system organizes'] },
            { id: 's3', label: 'The Five Kingdom Classification is', prompt: 'Which idea is this? — The Five Kingdom Classification is a phylogenetic system proposed by R.H.', answer: 'The Five Kingdom Classification is', options: ['The Five Kingdom Classification is', 'Classification is the scientific process', 'Classification criteria are the fundamental', 'The hierarchical classification system organizes'] },
            { id: 's4', label: 'The hierarchical classification system organizes', prompt: 'Which idea is this? — The hierarchical classification system organizes living organisms into a nested series of.', answer: 'The hierarchical classification system organizes', options: ['The hierarchical classification system organizes', 'Classification is the scientific process', 'Classification criteria are the fundamental', 'The Five Kingdom Classification is'] },
            { id: 's5', label: 'Binomial nomenclature is the internationally', prompt: 'Which idea is this? — Binomial nomenclature is the internationally standardized system of naming each species.', answer: 'Binomial nomenclature is the internationally', options: ['Binomial nomenclature is the internationally', 'Classification is the scientific process', 'Classification criteria are the fundamental', 'The Five Kingdom Classification is'] },
            { id: 's6', label: 'Connective tissue is a type', prompt: 'Which idea is this? — Connective tissue is a type of animal tissue characterized by widely spaced cells.', answer: 'Connective tissue is a type', options: ['Connective tissue is a type', 'Classification is the scientific process', 'Classification criteria are the fundamental', 'The Five Kingdom Classification is'] }
          ] } }
    ],
    explore: { component: C9_BiologyAnimalKingdomClassificationSim, prompt: 'Explore the interactive — Animal Kingdom Classification' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch4_3', difficulty: 'standard',
          question: 'Classification is the scientific process of grouping living organisms into.',
          hint: 'Revisit c9_bio_ch4_1 (Biodiversity: Definition and Importance) and c8_bio_ch1_9.',
          misconception: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab discovers an unknown insect damaging wheat crops.', answer: 'Correct answer: Classification groups organisms with shared characteristics',
                  options: ['Correct answer: Classification groups organisms with shared characteristics', 'the scientist knew the name', 'naming things'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static filing system.' }
          ],
            remediations: { 'classification-is-primarily-about-naming': { steps: ['Give the student 15 diverse leaves (neem, mango, peepal, banyan, tulsi, mint, coriander, curry leaf, spinach, grass).', 'Ask them to sort into groups *without* using names — only observable traits (venation, margin, texture, smell).', 'Have them explain their grouping logic.', 'Reveal the botanical families (e.g., neem & bakain = Meliaceae; mint, tulsi, basil = Lamiaceae — all have square stems,.', 'Discuss: "Your groups based on *structure* matched evolutionary families.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Modern DNA sequencing has made traditional classification based on physical characteristics obsolete." Provide two biological.', answer: 'Correct evaluation: The statement is *false*',
                  options: ['Correct evaluation: The statement is *false*', 'naming things', 'putting labels on organisms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static filing system.' }
          ],
            remediations: { 'classification-is-primarily-about-naming': { steps: ['Give the student 15 diverse leaves (neem, mango, peepal, banyan, tulsi, mint, coriander, curry leaf, spinach, grass).', 'Ask them to sort into groups *without* using names — only observable traits (venation, margin, texture, smell).', 'Have them explain their grouping logic.', 'Reveal the botanical families (e.g., neem & bakain = Meliaceae; mint, tulsi, basil = Lamiaceae — all have square stems,.', 'Discuss: "Your groups based on *structure* matched evolutionary families.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_4', difficulty: 'standard',
          question: 'Classification criteria are the fundamental, heritable characteristics — such.',
          hint: 'If stuck, revisit **c8_bio_ch1_3 (Cell: Basic Unit of Life)** for cell types and.',
          misconception: 'Students believe that **visible, external morphological similarities (like wings, fins, green colour, or habitat) are.',
          parts: [
                { id: 'a', prompt: 'State the five fundamental characteristics used as the basis for classifying organisms in the modern five-kingdom system.', answer: 'The five fundamental characteristics are: (1) Cell type',
                  options: ['The five fundamental characteristics are: (1) Cell type', 'habitat (water/land)', 'body colour'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that **visible, external morphological similarities (like wings, fins, green colour, or habitat) are the primary basis for.' },
                { id: 'b', prompt: 'A student observes a green, slimy growth on a damp wall. It is unicellular, has a cell wall, and performs photosynthesis.', answer: 'Step 1: Identify observed traits',
                  options: ['Step 1: Identify observed traits', 'it\'s green and makes food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that **visible, external morphological similarities (like wings, fins, green colour, or habitat) are the primary basis for.' }
          ],
            remediations: { 'visible': { steps: ['**Concrete observation** — Give the student three pictures: a bat skeleton, a bird skeleton, a butterfly wing.', '**Connect to criteria** — Explain that *bone structure* (internal morphology) reflects common ancestry (tetrapod.', '**Apply hierarchy** — List the five criteria on cards. Have the student sort the cards from "most fundamental" to.', '**Verbalize rule** — "Classification uses traits that are *hard to change* (cell type, body plan) over traits that.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_5', difficulty: 'standard',
          question: 'The Five Kingdom Classification is a phylogenetic system proposed by R.H.',
          hint: 'Revisit c8_bio_ch1_3 (cell structure) and c9_bio_ch4_4 (classification criteria) with.',
          misconception: 'Students think "Protista is a kingdom for \'leftovers\' that don\'t fit anywhere else, so it has no defining features.".',
          parts: [
                { id: 'a', prompt: 'Name the five kingdoms in Whittaker\'s classification and state the primary criterion used to separate Monera from the other four kingdoms.', answer: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia',
                  options: ['The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia', 'Bacteria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Protista is a kingdom for \'leftovers\' that don\'t fit anywhere else, so it has no defining features." They memorize examples.' }
          ],
            remediations: { 'protista-is-a-kingdom-for': { steps: ['Have the student make a three-column table with headers "Cell Structure", "Body Organization", "Nutrition Mode" and.', 'Give 5 unnamed organism descriptions (e.g., "unicellular, eukaryotic, photosynthetic, flagellated") and ask the student.', 'Discuss why "leftovers" is wrong—Protista shares the positive trait of lacking tissue-level organization, which is a.', 'Re-test with Sargassum (multicellular, eukaryotic, photosynthetic, no tissues) → Plantae, not Protista.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_7', difficulty: 'standard',
          question: 'The hierarchical classification system organizes living organisms into a nested.',
          hint: 'If stuck, revisit c9_bio_ch4_4 (Classification Criteria) and practice grouping 5 familiar.',
          misconception: 'Students believe that organisms in the same Kingdom (e.g., all animals) are "basically the same" and that the hierarchy.',
          parts: [
                { id: 'a', prompt: 'Two organisms belong to the same Genus but different Species. Another pair belongs to the same Family but different Genera.', answer: 'The pair in the same Genus shares more characteristics',
                  options: ['The pair in the same Genus shares more characteristics', 'basically the same', 'organisms in the same Kingdom (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that organisms in the same Kingdom (e.g., all animals) are "basically the same" and that the hierarchy is just a naming.' }
          ],
            remediations: { 'organisms-in-the-same-kingdom': { steps: ['Have the student list 5 traits of a sponge and 5 traits of a tiger; count shared traits (only: eukaryotic,.', 'List 5 traits of tiger and 5 of lion; count shared traits (mammary glands, hair, four-chambered heart, placental.', 'Explicitly map each shared trait to its taxonomic rank (e.g., mammary glands → Class Mammalia; similar skeletal.', 'Conclude: more shared ranks = more shared traits = closer relationship.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_8', difficulty: 'standard',
          question: 'Binomial nomenclature is the internationally standardized system of naming each.',
          hint: 'Review the taxonomic hierarchy from node c9_bio_ch4_7, focusing on the definition of.',
          misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Binomial nomenclature is the internationally standardized system of naming each species',
                  options: ['Binomial nomenclature is the internationally standardized system of naming each species', 'Classification is the scientific process of grouping living organisms into hierarchical', 'Classification criteria are the fundamental, heritable characteristics', 'The Five Kingdom Classification is a phylogenetic system proposed by R.H'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The species name of.' }
          ],
            remediations: { 'the-specific-epithet-alone-e': { steps: ['Show the student a list: *Mangifera indica*, *Azadirachta indica*, *Tamarix indica*. Ask: "Which one is mango?"', 'Point out that \'indica\' appears in all three, so \'indica\' alone cannot identify mango.', 'Reinforce that the *species* is the combination *Mangifera indica*.', 'Practice writing five full binomials and circling the genus and specific epithet in different colors to visually.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The.',
          parts: [
                { id: 'a', prompt: 'A textbook states: "The scientific name of the house crow is *Corvus splendens*. In a list of Indian birds, it can be abbreviated as *C.', answer: 'Yes, the statement is correct',
                  options: ['Yes, the statement is correct', 'never abbreviate', 'abbreviate both words', 'The species name of mango is *indica*'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The species name of.' }
          ],
            remediations: { 'the-specific-epithet-alone-e': { steps: ['Show the student a list: *Mangifera indica*, *Azadirachta indica*, *Tamarix indica*. Ask: "Which one is mango?"', 'Point out that \'indica\' appears in all three, so \'indica\' alone cannot identify mango.', 'Reinforce that the *species* is the combination *Mangifera indica*.', 'Practice writing five full binomials and circling the genus and specific epithet in different colors to visually.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_6', difficulty: 'standard',
          question: 'Connective tissue is a type of animal tissue characterized by widely spaced.',
          hint: 'Review c8_bio_ch1_8 (Levels of Organisation) and c9_bio_ch2_5 (Epithelial Tissue) to.',
          misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining.',
          parts: [
                { id: 'a', prompt: 'Name the three main components of the extracellular matrix in connective tissue and state one function of each.', answer: 'The three main components are: (1) Collagen fibers',
                  options: ['The three main components are: (1) Collagen fibers', 'connective tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' },
                { id: 'b', prompt: 'Why is blood classified as a connective tissue even though it flows and does not "connect" things like bone or cartilage?', answer: 'Blood is classified as connective tissue',
                  options: ['Blood is classified as connective tissue', 'because it is red', 'because it flows'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' },
                { id: 'c', prompt: 'A patient has a deep cut that heals with a scar. Which type of connective tissue forms the scar, and why does it lack the flexibility of the original skin?', answer: 'Dense regular connective tissue (collagen-rich) forms the scar',
                  options: ['Dense regular connective tissue (collagen-rich) forms the scar', 'areolar tissue', 'adipose tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' }
          ],
            remediations: { 'connective-tissue-only-means-tissues': { steps: ['Revisit the definition of tissue from c8_bio_ch1_8 — emphasize that classification is based on cell-matrix relationship.', 'Create a table with columns: Tissue Name, Matrix Type, Fiber Types, Main Cells, Primary Function.', 'Use the table to answer "Why is X a connective tissue?" for each type.', 'Practice with a micrograph identification worksheet (label matrix, fibers, cells) to reinforce visual recognition.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Adipose tissue is just loose connective tissue with fat cells; therefore it cannot have a specialized function like insulation or.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'connective tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' }
          ],
            remediations: { 'connective-tissue-only-means-tissues': { steps: ['Revisit the definition of tissue from c8_bio_ch1_8 — emphasize that classification is based on cell-matrix relationship.', 'Create a table with columns: Tissue Name, Matrix Type, Fiber Types, Main Cells, Primary Function.', 'Use the table to answer "Why is X a connective tissue?" for each type.', 'Practice with a micrograph identification worksheet (label matrix, fibers, cells) to reinforce visual recognition.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
