import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch13_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch13_p2: SimDef = {
    id: 'v3_c12_bio_ch13_p2',
    title: 'Organisms and Populations · Part 2/2',
    subtitle: 'Habitat is the address. Niche is the job description. Never confuse them.',
    classLevel: 12, subject: 'biology', topic: 'Organisms and Populations · Part 2/2',
    chapters: ['c12_bio_ch13'],
    nodeIds: ['c12_bio_cbse_13_007', 'c12_bio_cbse_13_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field ecologist', intro: 'Ecology starts with two questions: where does it live, and what does it do there? They\'re not the same.', goal: 'Distinguish habitat from niche and explain how abiotic factors limit organism distribution.' },
    discovery: {
        question: 'An Indian roller bird perches on a banyan tree. Its habitat is the tree — but what is its niche?',
        options: ['Its functional role — hunting insects from that perch, nesting in cavities, interacting with other species', 'The same as its habitat — the two terms are interchangeable', 'The geographic range of all banyan trees across India', 'Its physical address — the exact branch it sits on'],
        answer: 'Its functional role — hunting insects from that perch, nesting in cavities, interacting with other species',
        hook: 'Habitat is the address; niche is the profession. Students merge the two — but an organism\'s niche is everything it *does*: what it eats, when it breeds, whom it competes with.',
    },
    teaching: [
        { title: 'Population Interactions: Predation, Competition', text: 'Predation is a population interaction where one organism (predator) kills and consumes another organism (prey) for food, directly affecting the population dynamics of both species.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_13_007', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Take a field trip in your mind: define habitat and niche for organisms you observe, then test how temperature, water and light set the limits on where each species can survive at all.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_007', title: 'Population Interactions: Predation, Competition',
          caseStudy: { intro: 'Imagine you are watching a nature documentary: a tiger stalks a deer (predation) while nearby, two deer graze on the same patch of grass (competition).',
            decisions: [{ prompt: 'Define predation and give one example each of a predator and its prey from an Indian ecosystem.', options: [
                { text: 'Predation is an interaction where a predator kills and eats a prey', outcome: 'Predation is an interaction where a predator kills and eats a prey.' },
                { text: 'lion eats grass', outcome: 'Not quite — Students often think "competition means fighting" — they picture animals physically attacking each.', reveals: 'competition-means-fighting-they-picture' },
                { text: 'parasite is a predator', outcome: 'Not quite — Students often think "competition means fighting" — they picture animals physically attacking each.', reveals: 'competition-means-fighting-they-picture' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_008', title: 'Population Interactions: Mutualism, Parasitism, Commensalism',
          caseStudy: { intro: 'Imagine you are walking through a mango orchard in summer: you see bees buzzing around mango flowers (mutualism — bee gets nectar, flower gets pollinated),.',
            decisions: [{ prompt: 'Define mutualism and give one classic example from the Indian subcontinent.', options: [
                { text: 'Mutualism is a +/+ interaction where both species benefit', outcome: 'Mutualism is a +/+ interaction where both species benefit. Example: fig–fig wasp pollination.' },
                { text: 'mutualism is any symbiotic relationship', outcome: 'Not quite — Students equate "symbiosis" with "mutualism" and think all close, long-term associations are.', reveals: 'students-equate-symbiosis-with-mutualism' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_13_008', title: 'Identify each idea',
          dissect: { specimen: 'Organisms and Populations · Part 2/2', spots: [
            { id: 's1', label: 'Population Interactions Predation Competition', prompt: 'Which idea is this? — Predation is a population interaction where one organism (predator) kills and consumes.', answer: 'Population Interactions Predation Competition', options: ['Population Interactions Predation Competition', 'Population Interactions Mutualism Parasitism Commensalism'] },
            { id: 's2', label: 'Population Interactions Mutualism Parasitism Commensalism', prompt: 'Which idea is this? — Mutualism is an interspecific interaction where both participating species derive a net.', answer: 'Population Interactions Mutualism Parasitism Commensalism', options: ['Population Interactions Mutualism Parasitism Commensalism', 'Population Interactions Predation Competition'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_007', title: 'A real-world call',
          caseStudy: { intro: 'Reproductive-health education reduces disease and unsafe practices, but some communities worry it conflicts with their values or rushes children into adult topics.',
            decisions: [{ prompt: 'Should schools teach it regardless?', options: [
                { text: 'Yes — health literacy is a right, not a preference', outcome: 'Public health\'s position — information withheld is a harm; but taught without cultural care, it can alienate the families who need it most.' },
                { text: 'Yes, but shaped with community input', outcome: 'The pragmatic middle — content stays accurate, delivery respects context; slower, but it actually reaches people.' },
                { text: 'No — families should decide the timing', outcome: 'Respects family authority; the risk is that the students who most need the information are exactly those whose families don\'t provide it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school biodiversity assignment on the tiger, a student submits: \'Niche — the forest; it eats deer.\' His teacher returns it marked incomplete.',
            decisions: [{ prompt: 'What\'s missing from that \'niche\'?', options: [
                { text: 'The forest is only the habitat — the address; the niche is the profession: solitary territorial ambush predator, largely nocturnal, needing a large home range and specific prey interactions.', outcome: 'Niche spans diet, activity timing, social structure, reproduction and interactions — not just where the animal lives and one thing it eats.' },
                { text: 'Nothing — niche means habitat plus diet, and \'forest plus deer\' covers both.', outcome: 'That strips out behaviour, temporal activity and trophic interactions; \'address plus one meal\' is exactly the truncated definition exams penalise.', reveals: 'niche-is-address-plus-food' },
                { text: 'Nothing — and since a niche is genetically fixed, the tiger\'s role can\'t differ between the Sundarbans and central India.', outcome: 'The fundamental niche is constrained, but the realised niche shifts with context — Sundarbans tigers swim, drink saline water and hunt fish.', reveals: 'niche-is-genetically-fixed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_008', title: 'You made it',
          caseStudy: { intro: 'You now separate where an organism lives from what it does there — the first real skill of ecology. Niche vs habitat is a classic board trap and the foundation of environmental science careers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_007', difficulty: 'standard',
          question: 'Predation is a population interaction where one organism (predator) kills and.',
          hint: 'Revisit c12_bio_cbse_13_005: practice sketching N vs t curves for different r and K, and.',
          misconception: 'Students often think "competition means fighting" — they picture animals physically attacking each other.',
          parts: [
                { id: 'a', prompt: 'Define predation and give one example each of a predator and its prey from an Indian ecosystem.', answer: 'Predation is an interaction where a predator kills and eats a prey',
                  options: ['Predation is an interaction where a predator kills and eats a prey', 'lion eats grass', 'parasite is a predator', 'competition means fighting'],
                  hint: 'Revisit c12_bio_cbse_13_005: practice sketching N vs t curves for different r and K, and explain.',
                  misconception: 'Students often think "competition means fighting" — they picture animals physically attacking each other.' },
                { id: 'b', prompt: 'A farmer notices that after introducing a new insecticide, the pest population initially crashes but later rebounds to even higher numbers.', answer: 'The insecticide likely killed both the pest and its natural predators',
                  options: ['The insecticide likely killed both the pest and its natural predators', 'competition means fighting', 'lions and hyenas compete by stealing kills', '"competition means fighting"'],
                  hint: 'Revisit c12_bio_cbse_13_005: practice sketching N vs t curves for different r and K, and explain.',
                  misconception: 'Students often think "competition means fighting" — they picture animals physically attacking each other.' },
                { id: 'c', prompt: 'Compare intraspecific and interspecific competition. Which is generally more intense? Justify with an example from plants.', answer: 'Intraspecific competition (same species) is more intense',
                  options: ['Intraspecific competition (same species) is more intense', 'competition means fighting', 'lions and hyenas compete by stealing kills', '"competition means fighting"'],
                  hint: 'Revisit c12_bio_cbse_13_005: practice sketching N vs t curves for different r and K, and explain.',
                  misconception: 'Students often think "competition means fighting" — they picture animals physically attacking each other.' }
          ],
            remediations: { 'competition-means-fighting-they-picture': { steps: ['If the student holds the "fighting" misconception: (1) Show a time-lapse video of seedlings growing crowded vs.', 'spaced — measure height and leaf number, not aggression.', '(2) Have them calculate per-plant biomass in high vs.', 'low density pots (data from c12_bio_cbse_13_005).'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "competition means fighting" — they picture animals physically attacking each other.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Predators always control prey populations and prevent them from exceeding carrying capacity." Is this always true?', answer: 'Not always',
                  options: ['Not always', 'competition means fighting', 'lions and hyenas compete by stealing kills', '"competition means fighting"'],
                  hint: 'Revisit c12_bio_cbse_13_005: practice sketching N vs t curves for different r and K, and explain.',
                  misconception: 'Students often think "competition means fighting" — they picture animals physically attacking each other.' }
          ],
            remediations: { 'competition-means-fighting-they-picture': { steps: ['If the student holds the "fighting" misconception: (1) Show a time-lapse video of seedlings growing crowded vs.', 'spaced — measure height and leaf number, not aggression.', '(2) Have them calculate per-plant biomass in high vs.', 'low density pots (data from c12_bio_cbse_13_005).'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_008', difficulty: 'standard',
          question: 'Mutualism is an interspecific interaction where both participating species.',
          hint: 'Review c12_bio_cbse_13_001 (Habitat and Niche) for niche overlap logic and.',
          misconception: 'Students equate "symbiosis" with "mutualism" and think all close, long-term associations are mutually beneficial.',
          parts: [
                { id: 'a', prompt: 'Define mutualism and give one classic example from the Indian subcontinent.', answer: 'Mutualism is a +/+ interaction where both species benefit',
                  options: ['Mutualism is a +/+ interaction where both species benefit', 'mutualism is any symbiotic relationship'],
                  hint: 'Review c12_bio_cbse_13_001 (Habitat and Niche) for niche overlap logic and c12_bio_cbse_13_007.',
                  misconception: 'Students equate "symbiosis" with "mutualism" and think all close, long-term associations are mutually beneficial.' },
                { id: 'b', prompt: 'A farmer plants marigold (Tagetes erecta) around a tomato field. Marigold roots release thiophenes that repel root-knot nematodes.', answer: 'Marigold–tomato: mutualism (+/+)',
                  options: ['Marigold–tomato: mutualism (+/+)', 'marigold–nematode is parasitism'],
                  hint: 'Review c12_bio_cbse_13_001 (Habitat and Niche) for niche overlap logic and c12_bio_cbse_13_007.',
                  misconception: 'Students equate "symbiosis" with "mutualism" and think all close, long-term associations are mutually beneficial.' },
                { id: 'c', prompt: 'Compare the population-level consequences of a highly virulent parasite (kills host quickly) versus a mutualism where both species are obligate (cannot survive.', answer: 'A highly virulent parasite drives host density down',
                  options: ['A highly virulent parasite drives host density down', 'both show negative density dependence'],
                  hint: 'Review c12_bio_cbse_13_001 (Habitat and Niche) for niche overlap logic and c12_bio_cbse_13_007.',
                  misconception: 'Students equate "symbiosis" with "mutualism" and think all close, long-term associations are mutually beneficial.' }
          ],
            remediations: { 'students-equate-symbiosis-with-mutualism': { steps: ['Revisit c11_bio_cbse_02_006 (Symbiotic Associations: Lichens and Mycorrhiza) to clarify the symbiosis umbrella and see.', 'Create a three-column table (+/+, +/-, +/0) and populate with 5 local examples each (e.g., +/+ : Rhizobium–legume.', 'Watch a 5-min video of cattle egrets foraging behind a tractor — note whether the tractor (non-living) is affected.', 'Re-attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_4.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
