import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch02_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch02_p2: SimDef = {
    id: 'v3_c10_geo_ch02_p2',
    title: 'Forest and Wildlife Resources · Part 2/2',
    subtitle: 'Defend species you\'ve never heard of before they vanish',
    classLevel: 10, subject: 'geography', topic: 'Forest and Wildlife Resources · Part 2/2',
    chapters: ['c10_geo_ch02'],
    nodeIds: ['c10_geo_cbse_02_007', 'c10_geo_cbse_02_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wildlife conservation officer', intro: 'India is one of only 17 mega-diverse countries on Earth. Your job: decide where the next highway, dam or mine goes — knowing every \'empty\' patch of forest is full of lives.', goal: 'Connect India\'s relief, climate and soil to its biodiversity, weigh depletion causes, and evaluate conservation from Project Tiger to sacred groves.' },
    discovery: {
        question: 'India holds over 47,000 plant and 89,000 animal species, yet a single town\'s new highway can erase species that took millions of years to evolve. Conservationists argue even \'useless\' insects deserve protection. What\'s the strongest reason?',
        options: ['Every species is a link in an ecological web — losing unknown ones can collapse services like pollination and soil renewal that we depend on', 'Rare species are always worth money as tourist attractions', 'Laws require it, so the debate is already settled', 'Insects pollinate every single crop humans eat'],
        answer: 'Every species is a link in an ecological web — losing unknown ones can collapse services like pollination and soil renewal that we depend on',
        hook: 'You can\'t pull threads out of a web and promise it will hold. We protect species we\'ve never named because ecosystems don\'t publish their load-bearing walls.',
    },
    teaching: [
        { title: 'Community Conservation: Sacred Groves and People\'s Participation', text: 'Community conservation refers to the protection and management of forests and wildlife by local communities through traditional practices, cultural beliefs, and participatory governance, with sacred.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map India\'s wild wealth — from Himalayan rhododendrons to Western Ghats frogs — rank the threats pushing species toward extinction, and choose which conservation strategies actually work.',
        labels: ['Community Conservation: Sacred Groves', 'Role of Local Communities'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_007', title: 'Community Conservation: Sacred Groves and People\'s Participation',
          caseStudy: { intro: 'Begin with a real-world observation: ask students if they have seen a small, dense patch of trees near a village temple or dargah where no one cuts wood.',
            decisions: [{ prompt: 'What is a sacred grove, and name one Indian state where they are prominently found?', options: [
                { text: 'A sacred grove is a patch of forest protected by local communities due to religious', outcome: 'A sacred grove is a patch of forest protected by local communities due to religious beliefs that.' },
                { text: 'a government-declared national park', outcome: 'Not quite — Students think sacred groves are "just religious sites" with no ecological significance, and that.', reveals: 'sacred-groves-are-just-religious' },
                { text: 'a plantation', outcome: 'Not quite — Students think sacred groves are "just religious sites" with no ecological significance, and that.', reveals: 'sacred-groves-are-just-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_008', title: 'Role of Local Communities in Forest Conservation (Bishnois, Chipko)',
          caseStudy: { intro: 'Imagine you are in a village near Jodhpur where a Khejri tree stands — a family refuses to let it be cut even if offered money, because their faith says the.',
            decisions: [{ prompt: 'Name the two major community-led forest conservation movements in India studied in Class 10 Geography and the state each is primarily.', options: [
                { text: 'The Bishnoi community in Rajasthan (since 15th century) and the Chipko Movement in', outcome: 'The Bishnoi community in Rajasthan (since 15th century) and the Chipko Movement in Uttarakhand.' },
                { text: 'Joint Forest Management', outcome: 'Not quite — Students think the Bishnoi movement and Chipko Movement are the same type of "environmental.', reveals: 'the-bishnoi-movement-and-chipko' },
                { text: 'Sacred Groves', outcome: 'Not quite — Students think the Bishnoi movement and Chipko Movement are the same type of "environmental.', reveals: 'the-bishnoi-movement-and-chipko' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_007', title: 'A real-world call',
          caseStudy: { intro: 'A forest houses both a tiger reserve and villages that have grazed cattle there for generations. Conservationists want the villages moved; the villagers say the forest was theirs before it was a reserve.',
            decisions: [{ prompt: 'Whose forest is it?', options: [
                { text: 'The tigers\' — ecosystems can\'t vote', outcome: 'Protects a species that has no other voice; the cost falls entirely on people who can least afford it.' },
                { text: 'The villagers\' — they conserved it first', outcome: 'Honors generational stewardship; but grazing pressure on a shrinking forest is real, whoever owns it.' },
                { text: 'Both — make villagers paid guardians', outcome: 'The model some reserves actually use — turns the conflict into employment, but only if the payments are real and permanent.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school eco-club spots a rare migratory bird at the local pond and excitedly proposes declaring it a \'biodiversity hotspot\' in their annual report. Their teacher asks them to check what the term actually requires before printing it.',
            decisions: [{ prompt: 'What should the eco-club\'s checklist look like?', options: [
                { text: 'A hotspot is defined by exceptional species richness — especially species found nowhere else — combined with serious threat or habitat loss. One rare bird sighting, however exciting, proves neither richness nor endemism, so the pond cannot claim the label — the same reason even the famous Sundarbans are not a separate hotspot just because tigers live there.', outcome: 'The criteria are about how many unique species a place holds and how endangered the habitat is — fame or a single charismatic animal is not on the list.' },
                { text: 'One rare species is enough — any place hosting something endangered qualifies as a hotspot automatically.', outcome: 'That would make every zoo and park a hotspot; the term is reserved for regions with extraordinary overall diversity and endemism under threat.', reveals: 'one-species-makes-hotspot' },
                { text: 'Any green area counts as a biodiversity hotspot as long as students formally declare it one.', outcome: 'Hotspot status is a scientific designation based on measured diversity and threat, not a title a school club can confer.', reveals: 'hotspot-is-a-title' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_02_008', title: 'You made it',
          caseStudy: { intro: 'Forests aren\'t just timber and tigers aren\'t just mascots. Biodiversity is the country\'s insurance policy — and we keep cancelling it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_007', difficulty: 'standard',
          question: 'Community conservation refers to the protection and management of forests and.',
          hint: 'Revisit c10_geo_cbse_02_004 (Protected Areas) and c10_geo_cbse_02_006 (Forest Types).',
          misconception: 'Students think sacred groves are "just religious sites" with no ecological significance, and that Joint Forest.',
          parts: [
                { id: 'a', prompt: 'Why do sacred groves often harbor higher biodiversity than surrounding managed forests, even without formal legal protection?', answer: 'Sacred groves retain native species',
                  options: ['Sacred groves retain native species', 'religious fear', 'just religious sites'],
                  hint: 'Revisit c10_geo_cbse_02_004 (Protected Areas) and c10_geo_cbse_02_006 (Forest Types) to clarify the.',
                  misconception: 'Students think sacred groves are "just religious sites" with no ecological significance, and that Joint Forest Management (JFM) gives full.' },
                { id: 'b', prompt: 'Compare the Chipko Movement (1973) and Joint Forest Management (JFM, 1990 onwards) on: (a) who initiated it, (b) the role of the Forest Department, and (c) the.', answer: 'who initiated it, (',
                  options: ['who initiated it, (', 'people\'s movements', 'just religious sites'],
                  hint: 'Revisit c10_geo_cbse_02_004 (Protected Areas) and c10_geo_cbse_02_006 (Forest Types) to clarify the.',
                  misconception: 'Students think sacred groves are "just religious sites" with no ecological significance, and that Joint Forest Management (JFM) gives full.' }
          ],
            remediations: { 'sacred-groves-are-just-religious': { steps: ['Show a satellite image comparison (Google Earth) of a sacred grove vs.', 'Use a JFM resolution document (simplified) to highlight the clause: "The Village Forest Committee shall prepare.', 'Ask the student to list what the community *can* and *cannot* do in a JFM area vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_008', difficulty: 'standard',
          question: 'Community-based forest conservation refers to the protection and sustainable.',
          hint: 'Revisit c8_geo_ch1_7 (sustainable use) and c10_geo_cbse_02_007 (sacred groves) to see how.',
          misconception: 'Students think the Bishnoi movement and Chipko Movement are the same type of "environmental movement" — both modern.',
          parts: [
                { id: 'a', prompt: 'Compare the long-term outcomes of the Bishnoi tradition and the Chipko Movement in terms of (a) legal/policy impact and (b) continuity of practice.', answer: 'legal/policy impact and (',
                  options: ['legal/policy impact and (', 'both led to laws', 'both are movements', 'compare'],
                  hint: 'Revisit c8_geo_ch1_7 (sustainable use) and c10_geo_cbse_02_007 (sacred groves) to see how cultural.',
                  misconception: 'Students think the Bishnoi movement and Chipko Movement are the same type of "environmental movement" — both modern, both protest-based.' }
          ],
            remediations: { 'the-bishnoi-movement-and-chipko': { steps: ['Draw a two-column table — left: Bishnoi (Religion, 1485, Rajasthan, Khejri/Blackbuck, Guru Jambheshwar, 363 martyrs.', 'On an outline map of India, mark Jodhpur and Chamoli with different colours.', 'Write one sentence for each: "Bishnois conserve because their *faith says so*; Chipko protested because *their survival.', 'Attempt a past board question: "Differentiate between Bishnoi and Chipko movements with two points each." Check against.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the Bishnoi movement and Chipko Movement are the same type of "environmental movement" — both modern.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Community conservation works only where people are poor and depend on forests for survival." Use the Bishnoi and Chipko examples.', answer: 'The statement is false',
                  options: ['The statement is false', 'evaluate', 'environmental movement', 'Bishnois started Chipko'],
                  hint: 'Revisit c8_geo_ch1_7 (sustainable use) and c10_geo_cbse_02_007 (sacred groves) to see how cultural.',
                  misconception: 'Students think the Bishnoi movement and Chipko Movement are the same type of "environmental movement" — both modern, both protest-based.' },
                { id: 'b', prompt: 'Design a one-page poster for a Class 10 exhibition titled "Roots of Resistance: How Communities Save Forests." It must include: (1) a map locating both.', answer: '**Layout:** Top centre: Title',
                  options: ['**Layout:** Top centre: Title', 'environmental movement', 'Bishnois started Chipko', 'both were against British'],
                  hint: 'Revisit c8_geo_ch1_7 (sustainable use) and c10_geo_cbse_02_007 (sacred groves) to see how cultural.',
                  misconception: 'Students think the Bishnoi movement and Chipko Movement are the same type of "environmental movement" — both modern, both protest-based.' }
          ],
            remediations: { 'the-bishnoi-movement-and-chipko': { steps: ['Draw a two-column table — left: Bishnoi (Religion, 1485, Rajasthan, Khejri/Blackbuck, Guru Jambheshwar, 363 martyrs.', 'On an outline map of India, mark Jodhpur and Chamoli with different colours.', 'Write one sentence for each: "Bishnois conserve because their *faith says so*; Chipko protested because *their survival.', 'Attempt a past board question: "Differentiate between Bishnoi and Chipko movements with two points each." Check against.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
