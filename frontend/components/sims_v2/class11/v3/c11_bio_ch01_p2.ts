import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch01_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch01_p2: SimDef = {
    id: 'v3_c11_bio_ch01_p2',
    title: 'The Living World · Part 2/2',
    subtitle: 'Decide what actually counts as \'living\' when growth and movement can be faked.',
    classLevel: 11, subject: 'biology', topic: 'The Living World · Part 2/2',
    chapters: ['c11_bio_ch01'],
    nodeIds: ['c11_bio_cbse_01_007', 'c11_bio_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher vetting a strange entity found in a hydrothermal vent', intro: 'Your Mars-rover-style probe just flagged something that grows and metabolises but can\'t reproduce alone. Before you announce \'life\', you\'d better define it.', goal: 'Apply the defining characteristics of life — cellular organisation, metabolism, growth, reproduction, response, adaptation — to classify ambiguous cases.' },
    discovery: {
        question: 'A dried raisin swells when dropped in water, a salt crystal grows in a saturated solution, and fire spreads while consuming oxygen. A classmate argues all three are \'alive\' because they grow and respond. Which single criterion separates the sprouting moong seed from all three impostors?',
        options: ['Its size increase comes from new protoplasm made by metabolism inside cells, not passive addition from outside', 'It is green, and only green things are alive', 'It moves faster than a crystal or a flame', 'It is larger than the other three'],
        answer: 'Its size increase comes from new protoplasm made by metabolism inside cells, not passive addition from outside',
        hook: 'Life isn\'t one visible property — it\'s a package of cellular organisation, metabolism, and self-driven growth that must all be present together.',
    },
    teaching: [
        { title: 'Binomial Nomenclature: Rules and Significance', text: 'Binomial nomenclature is the universally accepted scientific system of naming organisms using a two-part Latinised name, where the first part (genus) is capitalised and the second part (specific.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_01_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Given a lineup of borderline cases — a virus, a frozen bacterium, a prion, a flame, a germinating seed — sort each as living, non-living, or borderline by checking all the defining characteristics, not just the obvious one.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_007', title: 'Binomial Nomenclature: Rules and Significance',
          caseStudy: { intro: 'Imagine you\'re at a market in Kerala asking for "chemmeen" (prawns), but in Chennai they call it "eraal" and in Kolkata "chingri" – the same organism has three.',
            decisions: [{ prompt: 'Write the correctly formatted scientific name for the tiger, given its genus is Panthera and specific epithet is tigris, and it was.', options: [
                { text: '*Panthera tigris* Linn', outcome: '*Panthera tigris* Linn. (or *Panthera tigris* Linnaeus, 1758).' },
                { text: 'Panthera Tigris', outcome: 'Not quite — Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g.,.', reveals: 'the-specific-epithet-must-be' },
                { text: 'Panthera tigris linn', outcome: 'Not quite — Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g.,.', reveals: 'the-specific-epithet-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_008', title: 'Zoological Parks and Keys for Identification',
          caseStudy: { intro: 'Imagine visiting the National Zoological Park in Delhi and seeing a white tiger, a gharial, and a lion-tailed macaque — each in enclosures mimicking their.',
            decisions: [{ prompt: 'What is the fundamental structural difference between a dichotomous key and a polytomous key in taxonomic identification?', options: [
                { text: 'A dichotomous key presents exactly two contrasting alternatives (a couplet) at each step,', outcome: 'A dichotomous key presents exactly two contrasting alternatives (a couplet) at each step, forcing.' },
                { text: 'dichotomous keys are for plants, polytomous for animals', outcome: 'Not quite — Students believe taxonomic keys identify organisms by "matching pictures" or overall similarity.', reveals: 'taxonomic-keys-identify-organisms-by' },
                { text: 'matching pictures', outcome: 'Not quite — Students believe taxonomic keys identify organisms by "matching pictures" or overall similarity.', reveals: 'taxonomic-keys-identify-organisms-by' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'The Living World · Part 2/2', spots: [
            { id: 's1', label: 'Binomial Nomenclature Rules and Significance', prompt: 'Which idea is this? — Binomial nomenclature is the universally accepted scientific system of naming organisms.', answer: 'Binomial Nomenclature Rules and Significance', options: ['Binomial Nomenclature Rules and Significance', 'Zoological Parks and Keys for Identification'] },
            { id: 's2', label: 'Zoological Parks and Keys for Identification', prompt: 'Which idea is this? — Zoological parks are controlled environments where wild animals are maintained.', answer: 'Zoological Parks and Keys for Identification', options: ['Zoological Parks and Keys for Identification', 'Binomial Nomenclature Rules and Significance'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school debate on \'What is life?\', your opponent argues fire is alive: it moves, grows by spreading, consumes oxygen, and produces \'offspring\' sparks. She challenges you: \'Name one living characteristic fire lacks.\'',
            decisions: [{ prompt: 'What\'s the winning counterargument?', options: [
                { text: 'Fire only mimics life at the surface: its \'respiration\' is uncontrolled oxidation with no enzymes or ATP coupling, its \'growth\' is thermal diffusion not cellular accretion, and its \'reproduction\' is fragmentation with no genetic inheritance. Life is a syndrome — cellular organisation, metabolism, homeostasis, heredity — where each process runs through molecular machinery fire doesn\'t have.', outcome: 'Analogical resemblance is not homological equivalence: what matters is the mechanism underneath each characteristic.' },
                { text: 'Concede — fire shows movement, growth, energy use and reproduction, so by the checklist it\'s alive.', outcome: 'The checklist tests mechanism, not resemblance; fire fails every criterion once you ask how each process is carried out.', reveals: 'surface-traits-equal-life' },
                { text: 'Fire isn\'t alive only because it can\'t move from place to place on its own — movement is the decisive test.', outcome: 'Movement alone is a weak criterion (streams move, rooted plants don\'t); the full syndrome of cellular, metabolic, hereditary traits is what defines life.', reveals: 'movement-defines-life' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_008', title: 'You made it',
          caseStudy: { intro: 'You stopped judging life by surface resemblance and started checking mechanism. That shift — process versus mechanism — is the whole first lesson of Class 11 biology.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_007', difficulty: 'standard',
          question: 'Binomial nomenclature is the universally accepted scientific system of naming.',
          hint: 'Revisit c11_bio_cbse_01_005 (Taxonomic Hierarchy) – focus on the genus-species.',
          misconception: 'Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g., a person\'s name.',
          parts: [
                { id: 'a', prompt: 'Write the correctly formatted scientific name for the tiger, given its genus is Panthera and specific epithet is tigris, and it was described by Linnaeus.', answer: '*Panthera tigris* Linn',
                  options: ['*Panthera tigris* Linn', 'Panthera Tigris', 'Panthera tigris linn', 'the specific epithet must be capitalised if it derives from a proper noun (e'],
                  hint: 'Revisit c11_bio_cbse_01_005 (Taxonomic Hierarchy) – focus on the genus-species relationship and the.',
                  misconception: 'Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g., a person\'s name or place name), writing.' },
                { id: 'b', prompt: 'A student writes the scientific name of wheat as *Triticum Aestivum*.', answer: 'The specific epithet "Aestivum" is incorrectly capitalised',
                  options: ['The specific epithet "Aestivum" is incorrectly capitalised', 'the specific epithet must be capitalised if it derives from a proper noun (e'],
                  hint: 'Revisit c11_bio_cbse_01_005 (Taxonomic Hierarchy) – focus on the genus-species relationship and the.',
                  misconception: 'Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g., a person\'s name or place name), writing.' },
                { id: 'c', prompt: 'In a herbarium specimen label, you see "Mangifera indica Linn." and "Mangifera Indica Linn." on two different sheets for the same species.', answer: 'The first label "*Mangifera indica* Linn." is correct',
                  options: ['The first label "*Mangifera indica* Linn." is correct', 'the specific epithet must be capitalised if it derives from a proper noun (e'],
                  hint: 'Revisit c11_bio_cbse_01_005 (Taxonomic Hierarchy) – focus on the genus-species relationship and the.',
                  misconception: 'Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g., a person\'s name or place name), writing.' }
          ],
            remediations: { 'the-specific-epithet-must-be': { steps: ['Show the student three examples where specific epithets derive from proper nouns but remain lowercase: *Azadirachta.', 'Have them underline the genus and circle the species in 10 names from their textbook, verbalising "genus = noun.', 'Give a "spot the error" worksheet with 5 incorrectly capitalised names – they must correct each and cite the rule.', 'Connect to ICBN Article 23.1: "The specific epithet... is written with a lowercase initial letter" – no exceptions.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g., a person\'s name.',
          parts: [
                { id: 'a', prompt: 'Design a classroom activity where students use only binomial nomenclature (no common names) to create a "biodiversity menu" for a hypothetical restaurant.', answer: 'Example menu: 1',
                  options: ['Example menu: 1', 'the specific epithet must be capitalised if it derives from a proper noun (e'],
                  hint: 'Revisit c11_bio_cbse_01_005 (Taxonomic Hierarchy) – focus on the genus-species relationship and the.',
                  misconception: 'Students believe the specific epithet must be capitalised if it derives from a proper noun (e.g., a person\'s name or place name), writing.' }
          ],
            remediations: { 'the-specific-epithet-must-be': { steps: ['Show the student three examples where specific epithets derive from proper nouns but remain lowercase: *Azadirachta.', 'Have them underline the genus and circle the species in 10 names from their textbook, verbalising "genus = noun.', 'Give a "spot the error" worksheet with 5 incorrectly capitalised names – they must correct each and cite the rule.', 'Connect to ICBN Article 23.1: "The specific epithet... is written with a lowercase initial letter" – no exceptions.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_008', difficulty: 'standard',
          question: 'Zoological parks are controlled environments where wild animals are maintained.',
          hint: 'Revisit node c11_bio_cbse_01_005 (Taxonomic Hierarchy) and practice writing the full.',
          misconception: 'Students believe taxonomic keys identify organisms by "matching pictures" or overall similarity (gestalt), rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Zoological parks are controlled environments where wild animals are maintained in',
                  options: ['Zoological parks are controlled environments where wild animals are maintained in', 'Living organisms are self-sustaining, thermodynamically open systems characterized by', 'Growth in living organisms is an irreversible increase in mass and number of cells', 'Cellular organisation is the defining structural hierarchy of life where cells (the basic'],
                  hint: 'Revisit node c11_bio_cbse_01_005 (Taxonomic Hierarchy) and practice writing the full hierarchy for.',
                  misconception: 'Students believe taxonomic keys identify organisms by "matching pictures" or overall similarity (gestalt), rather than by logically.' }
          ],
            remediations: { 'taxonomic-keys-identify-organisms-by': { steps: ['Have the student physically use a dichotomous key (e.g., from NCERT lab manual) to identify 5 common insects — force.', 'Visit a zoo (virtually or physically) with a worksheet: record enclosure design, species name, IUCN status, and one.', 'Compare a museum specimen (photo) and a zoo animal (video) of the same species — list three research questions.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
