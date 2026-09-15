import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch02_p1: SimDef = {
    id: 'v3_c10_geo_ch02_p1',
    title: 'Forest and Wildlife Resources · Part 1/2',
    subtitle: 'Defend species you\'ve never heard of before they vanish',
    classLevel: 10, subject: 'geography', topic: 'Forest and Wildlife Resources · Part 1/2',
    chapters: ['c10_geo_ch02'],
    nodeIds: ['c10_geo_cbse_02_001', 'c10_geo_cbse_02_002', 'c10_geo_cbse_02_003', 'c10_geo_cbse_02_004', 'c10_geo_cbse_02_005', 'c10_geo_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wildlife conservation officer', intro: 'India is one of only 17 mega-diverse countries on Earth. Your job: decide where the next highway, dam or mine goes — knowing every \'empty\' patch of forest is full of lives.', goal: 'Connect India\'s relief, climate and soil to its biodiversity, weigh depletion causes, and evaluate conservation from Project Tiger to sacred groves.' },
    discovery: {
        question: 'India holds over 47,000 plant and 89,000 animal species, yet a single town\'s new highway can erase species that took millions of years to evolve. Conservationists argue even \'useless\' insects deserve protection. What\'s the strongest reason?',
        options: ['Every species is a link in an ecological web — losing unknown ones can collapse services like pollination and soil renewal that we depend on', 'Rare species are always worth money as tourist attractions', 'Laws require it, so the debate is already settled', 'Insects pollinate every single crop humans eat'],
        answer: 'Every species is a link in an ecological web — losing unknown ones can collapse services like pollination and soil renewal that we depend on',
        hook: 'You can\'t pull threads out of a web and promise it will hold. We protect species we\'ve never named because ecosystems don\'t publish their load-bearing walls.',
    },
    teaching: [
        { title: 'Biodiversity: Flora and Fauna in India', text: 'Biodiversity refers to the variety of plant (flora) and animal (fauna) species in a given geographical area, shaped by the interplay of climate, topography, soil, and evolutionary history.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map India\'s wild wealth — from Himalayan rhododendrons to Western Ghats frogs — rank the threats pushing species toward extinction, and choose which conservation strategies actually work.',
        labels: ['Biodiversity: Flora and Fauna', 'Classification of Species: Normal,', 'Causes of Depletion', 'Conservation of Forest', 'Project Tiger and Other', 'Types of Forests'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_001', title: 'Biodiversity: Flora and Fauna in India',
          caseStudy: { intro: 'Begin by asking the student to observe the trees, birds, and insects in their immediate neighbourhood — a neem tree in Delhi, coconut palms in Kerala,.',
            decisions: [{ prompt: 'Name the four internationally recognised biodiversity hotspots that lie partly or wholly within India\'s political boundaries.', options: [
                { text: 'The four biodiversity hotspots are: (1) The Himalaya, (2) The Western Ghats (and Sri', outcome: 'The four biodiversity hotspots are: (1) The Himalaya, (2) The Western Ghats (and Sri Lanka), (3).' },
                { text: 'Thar Desert', outcome: 'Not quite — Students often believe "biodiversity hotspot" simply means "area with many species." They write.', reveals: 'biodiversity-hotspot-simply-means-area' },
                { text: 'Deccan Plateau', outcome: 'Not quite — Students often believe "biodiversity hotspot" simply means "area with many species." They write.', reveals: 'biodiversity-hotspot-simply-means-area' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_002', title: 'Classification of Species: Normal, Endangered, Vulnerable, Rare, Endemic',
          caseStudy: { intro: 'Start by observing the wildlife around your school or neighbourhood — you might see common birds like house sparrows (Normal) but never spot a Great Indian.',
            decisions: [{ prompt: 'Name the category for a species that is found only in the Western Ghats and nowhere else in the world, but has a stable population.', options: [
                { text: 'Correct answer: Endemic', outcome: 'Correct answer: Endemic. A wrong answer of "Normal" reveals the student thinks classification.' },
                { text: 'Normal', outcome: 'Not quite — Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered →.', reveals: 'the-categories-form-a-linear' },
                { text: 'special', outcome: 'Not quite — Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered →.', reveals: 'the-categories-form-a-linear' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_004', title: 'Conservation of Forest and Wildlife: Protected Areas',
          caseStudy: { intro: 'Imagine you are on a school trip to Jim Corbett National Park and see a signboard saying "No grazing, no hunting, no collection of forest produce." Contrast.',
            decisions: [{ prompt: 'Name the three main categories of protected areas in India and state the primary legislation under which they are established.', options: [
                { text: 'The three main categories are National Parks, Wildlife Sanctuaries, and Biosphere', outcome: 'The three main categories are National Parks, Wildlife Sanctuaries, and Biosphere Reserves.' },
                { text: 'Reserved Forests', outcome: 'Not quite — Students consistently confuse **Reserved/Protected Forests** (administrative categories under the.', reveals: 'students-consistently-confuse-reserved-protected' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_005', title: 'Project Tiger and Other Wildlife Conservation Programmes',
          caseStudy: { intro: 'Start by asking students if they have seen a tiger in a zoo or on a safari video, and then show a map of India\'s tiger reserves.',
            decisions: [{ prompt: 'What is the primary objective of Project Tiger, and in which year was it launched?', options: [
                { text: 'The primary objective of Project Tiger is to ensure the maintenance of a viable', outcome: 'The primary objective of Project Tiger is to ensure the maintenance of a viable population.' },
                { text: 'it was launched in 1992 or aims to protect all wildlife equally', outcome: 'Not quite — Students often think Project Tiger only protects tigers and ignores other species, but in reality.', reveals: 'project-tiger-only-protects-tigers' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_006', title: 'Types of Forests in India: Reserved, Protected and Unclassed Forests',
          caseStudy: { intro: 'Imagine you are trekking in a forest in Madhya Pradesh and see a signboard: "Reserved Forest — Entry Prohibited Without Permit." A few kilometres later.',
            decisions: [{ prompt: 'What is the legal basis for classifying forests into Reserved, Protected, and Unclassed categories in India?', options: [
                { text: 'The Indian Forest Act, 1927 provides the legal framework for this three-fold', outcome: 'The Indian Forest Act, 1927 provides the legal framework for this three-fold classification.' },
                { text: 'Wildlife Protection Act', outcome: 'Not quite — Students conflate **Protected Forests** (Indian Forest Act, 1927 category) with **Protected Areas**.', reveals: 'students-conflate-protected-forests-indian' },
                { text: 'Forest Conservation Act', outcome: 'Not quite — Students conflate **Protected Forests** (Indian Forest Act, 1927 category) with **Protected Areas**.', reveals: 'students-conflate-protected-forests-indian' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_001', title: 'A real-world call',
          caseStudy: { intro: 'A forest houses both a tiger reserve and villages that have grazed cattle there for generations. Conservationists want the villages moved; the villagers say the forest was theirs before it was a reserve.',
            decisions: [{ prompt: 'Whose forest is it?', options: [
                { text: 'The tigers\' — ecosystems can\'t vote', outcome: 'Protects a species that has no other voice; the cost falls entirely on people who can least afford it.' },
                { text: 'The villagers\' — they conserved it first', outcome: 'Honors generational stewardship; but grazing pressure on a shrinking forest is real, whoever owns it.' },
                { text: 'Both — make villagers paid guardians', outcome: 'The model some reserves actually use — turns the conflict into employment, but only if the payments are real and permanent.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school eco-club spots a rare migratory bird at the local pond and excitedly proposes declaring it a \'biodiversity hotspot\' in their annual report. Their teacher asks them to check what the term actually requires before printing it.',
            decisions: [{ prompt: 'What should the eco-club\'s checklist look like?', options: [
                { text: 'A hotspot is defined by exceptional species richness — especially species found nowhere else — combined with serious threat or habitat loss. One rare bird sighting, however exciting, proves neither richness nor endemism, so the pond cannot claim the label — the same reason even the famous Sundarbans are not a separate hotspot just because tigers live there.', outcome: 'The criteria are about how many unique species a place holds and how endangered the habitat is — fame or a single charismatic animal is not on the list.' },
                { text: 'One rare species is enough — any place hosting something endangered qualifies as a hotspot automatically.', outcome: 'That would make every zoo and park a hotspot; the term is reserved for regions with extraordinary overall diversity and endemism under threat.', reveals: 'one-species-makes-hotspot' },
                { text: 'Any green area counts as a biodiversity hotspot as long as students formally declare it one.', outcome: 'Hotspot status is a scientific designation based on measured diversity and threat, not a title a school club can confer.', reveals: 'hotspot-is-a-title' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Forests aren\'t just timber and tigers aren\'t just mascots. Biodiversity is the country\'s insurance policy — and we keep cancelling it.',
            decisions: [{ prompt: 'What comes next? Forest and Wildlife Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Forest and Wildlife Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_001', difficulty: 'standard',
          question: 'Biodiversity refers to the variety of plant (flora) and animal (fauna) species.',
          hint: 'If stuck, revisit Class 7 node c7_geo_ch03_007 (Factors affecting India\'s climate) and.',
          misconception: 'Students often believe "biodiversity hotspot" simply means "area with many species." They write: "Western Ghats is.',
          parts: [
                { id: 'a', prompt: 'Using the concept of altitudinal zonation, predict the sequence of natural vegetation types a trekker would encounter while ascending from the foothills (300.', answer: 'Step 1: Identify the base zone',
                  options: ['Step 1: Identify the base zone', 'biodiversity hotspot', 'area with many species', 'Western Ghats is a hotspot'],
                  hint: 'If stuck, revisit Class 7 node c7_geo_ch03_007 (Factors affecting India\'s climate) and Class 6 node.',
                  misconception: 'Students often believe "biodiversity hotspot" simply means "area with many species." They write: "Western Ghats is a hotspot because it has.' }
          ],
            remediations: { 'biodiversity-hotspot-simply-means-area': { steps: ['Show the student the Conservation International hotspot criteria card (two bullet points).', 'Give a table with three regions — Western Ghats, Sundarbans, Thar Desert — and ask them to tick which meet BOTH.', 'Have them write a 30-word definition of "hotspot" using the two criteria.', 'Practice locating the four hotspots on a blank political map of India daily for one week.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_002', difficulty: 'standard',
          question: 'Classification of species is the systematic categorization of plants and.',
          hint: 'If stuck, revisit c10_geo_cbse_02_001 (Biodiversity in India) to recall examples.',
          misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with.',
          parts: [
                { id: 'a', prompt: 'Name the category for a species that is found only in the Western Ghats and nowhere else in the world, but has a stable population of 50,000 individuals.', answer: 'Correct answer: Endemic',
                  options: ['Correct answer: Endemic', 'Normal', 'special', 'classification depends only on population size, ignoring geographic restriction'],
                  hint: 'If stuck, revisit c10_geo_cbse_02_001 (Biodiversity in India) to recall examples of Indian.',
                  misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with Endemic as a separate.' },
                { id: 'b', prompt: 'Explain why the Asiatic Lion (Panthera leo persica) is classified as Endemic while the Indian Elephant (Elephas maximus indicus) is classified as Endangered.', answer: 'Correct answer: Asiatic Lion is endemic',
                  options: ['Correct answer: Asiatic Lion is endemic', 'Endangered', 'special'],
                  hint: 'If stuck, revisit c10_geo_cbse_02_001 (Biodiversity in India) to recall examples of Indian.',
                  misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with Endemic as a separate.' },
                { id: 'c', prompt: 'Given the data below, classify each species into the correct category. Show your reasoning.', answer: 'Correct classification with reasoning: - Species A: Endangered',
                  options: ['Correct classification with reasoning: - Species A: Endangered', 'special'],
                  hint: 'If stuck, revisit c10_geo_cbse_02_001 (Biodiversity in India) to recall examples of Indian.',
                  misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with Endemic as a separate.' }
          ],
            remediations: { 'the-categories-form-a-linear': { steps: ['Draw a 2×2 matrix on paper — axes: "Population Size" (Large/Small) and "Geographic Range" (Wide/Restricted).', 'Take 5 Indian species (Tiger, Lion, Snow Leopard, Nilgiri Tahr, Olive Ridley Turtle) and plot them using IUCN data.', 'Explain aloud why Snow Leopard is Vulnerable (declining, wide but fragmented) while Nilgiri Tahr is Endemic (restricted.', 'Re-read the NCERT box "Categories of Species" and match each definition to your matrix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If we protect all Endangered species, we automatically protect all Endemic species." Is this true for India? Justify with examples.', answer: 'Correct evaluation: False',
                  options: ['Correct evaluation: False', 'special'],
                  hint: 'If stuck, revisit c10_geo_cbse_02_001 (Biodiversity in India) to recall examples of Indian.',
                  misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with Endemic as a separate.' },
                { id: 'b', prompt: 'Design a one-page "Species Alert Card" for a hypothetical species discovered in the Andaman Islands.', answer: 'Expected answer: A well-structured card for e.g., "Andaman Banded Gecko"',
                  options: ['Expected answer: A well-structured card for e.g., "Andaman Banded Gecko"', 'special'],
                  hint: 'If stuck, revisit c10_geo_cbse_02_001 (Biodiversity in India) to recall examples of Indian.',
                  misconception: 'Students believe the categories form a linear hierarchy: Normal → Rare → Vulnerable → Endangered → Extinct, with Endemic as a separate.' }
          ],
            remediations: { 'the-categories-form-a-linear': { steps: ['Draw a 2×2 matrix on paper — axes: "Population Size" (Large/Small) and "Geographic Range" (Wide/Restricted).', 'Take 5 Indian species (Tiger, Lion, Snow Leopard, Nilgiri Tahr, Olive Ridley Turtle) and plot them using IUCN data.', 'Explain aloud why Snow Leopard is Vulnerable (declining, wide but fragmented) while Nilgiri Tahr is Endemic (restricted.', 'Re-read the NCERT box "Categories of Species" and match each definition to your matrix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_003', difficulty: 'standard',
          question: 'The depletion of forest and wildlife resources refers to the reduction.',
          hint: 'Revisit c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_8 (over-exploitation.',
          misconception: 'Students believe forest depletion is mainly caused by \'illegal logging\' or \'timber mafia\', overlooking that legal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The depletion of forest and wildlife resources refers to the reduction in forest cover,',
                  options: ['The depletion of forest and wildlife resources refers to the reduction in forest cover,', 'Biodiversity refers to the variety of plant (flora) and animal (fauna) species in a given', 'Classification of species is the systematic categorization of plants and animals based on', 'Protected Areas are geographically defined spaces legally designated and managed to'],
                  hint: 'Revisit c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_8 (over-exploitation consequences).',
                  misconception: 'Students believe forest depletion is mainly caused by \'illegal logging\' or \'timber mafia\', overlooking that legal, government-approved.' }
          ],
            remediations: { 'forest-depletion-is-mainly-caused': { steps: ['Show the student the MoEFCC\'s \'Forest Land Diversion\' dashboard (parivesh.nic.in) — filter by \'mining\' and.', 'Use the Wasteland Atlas of India to locate shifting cultivation areas; compare fallow period data from ICAR reports.', 'Have them re-answer Diagnostic Q2 and Q4 using this data.', 'Practice writing cause-effect chains in the format: "Driver → Mechanism → Species Impact" for three species from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_004', difficulty: 'standard',
          question: 'Protected Areas are geographically defined spaces legally designated and.',
          hint: 'If stuck, revisit **c10_geo_cbse_02_003 (Causes of Depletion)** to recall the specific.',
          misconception: 'Students consistently confuse **Reserved/Protected Forests** (administrative categories under the Indian Forest Act.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Protected Areas are geographically defined spaces legally designated and managed to',
                  options: ['Protected Areas are geographically defined spaces legally designated and managed to', 'Biodiversity refers to the variety of plant (flora) and animal (fauna) species in a given', 'Classification of species is the systematic categorization of plants and animals based on', 'The depletion of forest and wildlife resources refers to the reduction in forest cover,'],
                  hint: 'If stuck, revisit **c10_geo_cbse_02_003 (Causes of Depletion)** to recall the specific threats.',
                  misconception: 'Students consistently confuse **Reserved/Protected Forests** (administrative categories under the Indian Forest Act, 1927, managed for.' }
          ],
            remediations: { 'students-consistently-confuse-reserved-protected': { steps: ['Create a two-column table: Column A = Forest Act Categories (Reserved Forest, Protected Forest, Village Forest); Column.', 'Map each category to its *primary objective* (timber/revenue vs biodiversity) and *governing law*.', 'Take a specific landscape (e.g., Kanha) and trace its legal history: Reserved Forest (1879) → Sanctuary (1933) →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_005', difficulty: 'standard',
          question: 'Project Tiger is a centrally sponsored scheme launched in 1973 for in-situ.',
          hint: 'If stuck, revisit the classification of species (c10_geo_cbse_02_002) and the causes.',
          misconception: 'Students often think Project Tiger only protects tigers and ignores other species, but in reality, the tiger is.',
          parts: [
                { id: 'a', prompt: 'What is the primary objective of Project Tiger, and in which year was it launched?', answer: 'The primary objective of Project Tiger is to ensure the maintenance of a viable',
                  options: ['The primary objective of Project Tiger is to ensure the maintenance of a viable', 'it was launched in 1992 or aims to protect all wildlife equally'],
                  hint: 'If stuck, revisit the classification of species (c10_geo_cbse_02_002) and the causes of depletion.',
                  misconception: 'Students often think Project Tiger only protects tigers and ignores other species, but in reality, the tiger is an umbrella species.' },
                { id: 'b', prompt: 'Given a map of India showing the locations of Project Tiger reserves, identify which reserve was the first to be established under Project Tiger and name the.', answer: 'The first reserve established under Project Tiger was Jim Corbett National Park',
                  options: ['The first reserve established under Project Tiger was Jim Corbett National Park', 'Bandhavgarh or Sundarbans'],
                  hint: 'If stuck, revisit the classification of species (c10_geo_cbse_02_002) and the causes of depletion.',
                  misconception: 'Students often think Project Tiger only protects tigers and ignores other species, but in reality, the tiger is an umbrella species.' }
          ],
            remediations: { 'project-tiger-only-protects-tigers': { steps: ['To fix this, use a diagram of a tiger reserve food web showing tiger at the top and many herbivores, birds, plants.', 'Ask the student: \'If we protect the tiger\'s territory, what else gets protected?\' Then show a map of a tiger reserve.', 'Have the student list five other species that benefit.', 'This concrete visualisation replaces the narrow \'single-species\' mental model with the correct \'umbrella species\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_006', difficulty: 'standard',
          question: 'Reserved Forests are forest areas constituted under the Indian Forest Act.',
          hint: 'Revisit Class 8 "Sustainable Use of Natural Resources" (c8_geo_ch1_7) to recall how legal.',
          misconception: 'Students conflate **Protected Forests** (Indian Forest Act, 1927 category) with **Protected Areas** (National.',
          parts: [
                { id: 'a', prompt: 'What is the legal basis for classifying forests into Reserved, Protected, and Unclassed categories in India?', answer: 'The Indian Forest Act, 1927 provides the legal framework for this three-fold',
                  options: ['The Indian Forest Act, 1927 provides the legal framework for this three-fold', 'Wildlife Protection Act', 'Forest Conservation Act', 'distinguish between'],
                  hint: 'Revisit Class 8 "Sustainable Use of Natural Resources" (c8_geo_ch1_7) to recall how legal.',
                  misconception: 'Students conflate **Protected Forests** (Indian Forest Act, 1927 category) with **Protected Areas** (National Parks/Wildlife Sanctuaries.' },
                { id: 'b', prompt: 'A village in Odisha lies adjacent to a forest notified as \'Protected Forest\'. The villagers want to collect tendu leaves (for beedi making) and graze cattle.', answer: '**Step 1:** Recall definition',
                  options: ['**Step 1:** Recall definition', 'Protected Forests always allow free access', 'unless prohibited by notification', 'distinguish between'],
                  hint: 'Revisit Class 8 "Sustainable Use of Natural Resources" (c8_geo_ch1_7) to recall how legal.',
                  misconception: 'Students conflate **Protected Forests** (Indian Forest Act, 1927 category) with **Protected Areas** (National Parks/Wildlife Sanctuaries.' },
                { id: 'c', prompt: 'Compare the percentage of Reserved Forests in Madhya Pradesh (approx. 60% of state\'s forest area) and Kerala (approx. 30%).', answer: 'Madhya Pradesh has large contiguous central Indian teak/sal forests historically',
                  options: ['Madhya Pradesh has large contiguous central Indian teak/sal forests historically', 'rainfall', 'distinguish between'],
                  hint: 'Revisit Class 8 "Sustainable Use of Natural Resources" (c8_geo_ch1_7) to recall how legal.',
                  misconception: 'Students conflate **Protected Forests** (Indian Forest Act, 1927 category) with **Protected Areas** (National Parks/Wildlife Sanctuaries.' }
          ],
            remediations: { 'students-conflate-protected-forests-indian': { steps: ['** Draw a two-column table: Left column = Indian Forest Act, 1927 categories (Reserved, Protected, Unclassed); Right.', '** Map your state\'s forest department website to find one example of each IFA category. **', '** Use the mnemonic: **R**eserved = **R**estricted (default no); **P**rotected = **P**ermitted (default yes).', '** Practice a past board question: "Distinguish between Reserved Forest and Protected Area" — write three points with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
