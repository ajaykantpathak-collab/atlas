import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch10 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch10: SimDef = {
    id: 'v3_c6_history_ch10',
    title: 'Colonialism and the British Raj',
    subtitle: 'This node covers the arrival of European powers in India (Portuguese, Dutch, English) and.',
    classLevel: 6, subject: 'history', topic: 'Colonialism and the British Raj',
    chapters: ['c6_history_ch10'],
    nodeIds: ['c6_history_ch10_039', 'c6_history_ch10_040', 'c6_history_ch10_041', 'c6_history_ch10_042', 'c6_history_ch10_043', 'c6_history_ch10_044'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are at a crowded train station where new travelers arrive from different cities every day.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In the 1600s the English built a factory at Surat — but there were no machines, no chimneys, no workers on assembly lines. So what exactly was this factory?',
        options: ['A warehouse and trading post where merchants stored goods before shipping them home', 'A secret school for training sailors', 'A fortress built to invade the Mughal capital', 'A workshop that wove cloth for local markets'],
        answer: 'A warehouse and trading post where merchants stored goods before shipping them home',
        hook: 'The British were not the first or the only Europeans in India. Vasco da Gama reached India by sea in 1498, the Portuguese claimed Goa, and the Dutch came too — a factory then meant storage and trade, not industry.',
    },
    teaching: [
        { title: 'The Coming of the Europeans', text: 'The "Coming of the Europeans" refers to the period starting in 1498 when sea-faring nations from Europe, such as the Portuguese, Dutch, and English, began arriving in India to establish contact and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch10_039', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the arrivals — place Vasco da Gama in 1498, the Portuguese base at Goa, and the English post at Surat — and order who anchored on the coast of India first.',
        labels: ['The Coming of', 'The East India Company', 'Expansion of British Rule', 'The Revolt of 1857', 'British Rule After 1858', 'Impact of British Rule'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch10_039', title: 'The Coming of the Europeans',
          caseStudy: { intro: 'Imagine you are at a crowded train station where new travelers arrive from different cities every day.',
            decisions: [{ prompt: 'Who was the first European explorer to reach India by sailing around the Cape of Good Hope?', options: [
                { text: 'Vasco da Gama', outcome: 'Vasco da Gama. If a student says "Columbus," they are confusing the discovery of America with the.' },
                { text: 'Columbus', outcome: 'Not quite — Students often think "factory" meant a modern building with machines.', reveals: 'factory-meant-a-modern-building' },
                { text: 'factory', outcome: 'Not quite — Students often think "factory" meant a modern building with machines.', reveals: 'factory-meant-a-modern-building' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_040', title: 'The East India Company and the Battle of Plassey',
          caseStudy: { intro: 'Imagine you are playing a team game, and instead of winning by playing better, someone on your team secretly agrees to help the other side win in exchange for.',
            decisions: [{ prompt: 'Who were the two main leaders facing each other during the Battle of Plassey in 1757?', options: [
                { text: 'The leaders were Robert Clive (for the Company) and Siraj-ud-Daulah (the Nawab of Bengal)', outcome: 'The leaders were Robert Clive (for the Company) and Siraj-ud-Daulah (the Nawab of Bengal).' },
                { text: 'more modern', outcome: 'Not quite — Students often think the British won because they were "more modern" or "smarter" than the Indians.', reveals: 'the-british-won-because-they' },
                { text: 'smarter', outcome: 'Not quite — Students often think the British won because they were "more modern" or "smarter" than the Indians.', reveals: 'the-british-won-because-they' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_041', title: 'Expansion of British Rule in India',
          caseStudy: { intro: 'Imagine you are playing a game of territory capture on a large map where your goal is to grow your influence from one small corner to the entire board.',
            decisions: [{ prompt: 'Name two major powers that the British East India Company fought to expand their control in India.', options: [
                { text: 'The Mysore Kingdom (led by Tipu Sultan) and the Marathas', outcome: 'The Mysore Kingdom (led by Tipu Sultan) and the Marathas. A wrong answer suggests the student.' },
                { text: 'the British took over India purely', outcome: 'Not quite — Students often think the British took over India purely because they were \'stronger\' in every way.', reveals: 'the-british-took-over-india' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_042', title: 'The Revolt of 1857',
          caseStudy: { intro: 'Have you ever felt so frustrated by a rule that you decided to stand up against it with your friends?',
            decisions: [{ prompt: 'On what date and in which city did the Revolt of 1857 begin?', options: [
                { text: 'The revolt began on May 10, 1857, in Meerut', outcome: 'The revolt began on May 10, 1857, in Meerut. A wrong answer suggests the student has not memorized.' },
                { text: 'military mutiny', outcome: 'Not quite — Students often think the revolt was purely a "military mutiny" about gun parts.', reveals: 'the-revolt-was-purely-a' },
                { text: 'the revolt was purely a "military mutiny" about gun parts', outcome: 'Not quite — Students often think the revolt was purely a "military mutiny" about gun parts.', reveals: 'the-revolt-was-purely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_043', title: 'British Rule After 1858: Crown Rule',
          caseStudy: { intro: 'Imagine if your school was run by a private club that suddenly caused a huge argument among the students, leading the Education Board to step in and take.',
            decisions: [{ prompt: 'Who officially became the head of India after the Government of India Act of 1858?', options: [
                { text: 'Queen Victoria became the Empress of India', outcome: 'Queen Victoria became the Empress of India. A wrong answer suggests the student is still confusing.' },
                { text: 'East India Company', outcome: 'Not quite — Students often think the East India Company and the British Government were the same entity from.', reveals: 'the-east-india-company-and' },
                { text: 'British Government', outcome: 'Not quite — Students often think the East India Company and the British Government were the same entity from.', reveals: 'the-east-india-company-and' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_044', title: 'Impact of British Rule on India',
          caseStudy: { intro: 'Imagine your family makes beautiful handmade sweaters that are famous in the whole city.',
            decisions: [{ prompt: 'What happened to the Indian textile industry when cheap British cloth arrived?', options: [
                { text: 'The Indian textile industry, once one of the most advanced, was destroyed', outcome: 'The Indian textile industry, once one of the most advanced, was destroyed.' },
                { text: 'competition', outcome: 'Not quite — Students often assume that "cheap cloth" was a "good deal" for Indians without realizing that the.', reveals: 'cheap-cloth-was-a-good' },
                { text: 'cheap cloth', outcome: 'Not quite — Students often assume that "cheap cloth" was a "good deal" for Indians without realizing that the.', reveals: 'cheap-cloth-was-a-good' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_039', title: 'Use it in the wild',
          caseStudy: { intro: 'A class timeline project on Europeans in India hits an argument: \'All the Europeans arrived at once and immediately started ruling.\' A student who has read about trading \'factories\' at Surat disagrees.',
            decisions: [{ prompt: 'What does the timeline of arrivals and \'factories\' actually show?', options: [
                { text: 'That rule came slowly and trade came first — the Portuguese reached India in 1498 by sea, and the English came later, building trading posts called factories at ports like Surat. A factory\'s founding date marks when a European company got a foothold to trade — decades before any of them ruled territory. Conquest was the last chapter of a story that began with commerce.', outcome: 'Reading the dates in order dissolves the myth: arrivals were staggered over a century, and each power spent generations as a trader before it became a ruler.' },
                { text: 'The first claim is right — European powers arrived together and began governing immediately.', outcome: 'The timeline contradicts it — arrivals were decades apart, and trading posts preceded political control by generations.', reveals: 'all-arrived-together' },
                { text: 'A \'factory\' was a manufacturing plant, so the English industrialised India before ruling it.', outcome: 'These factories were trading warehouses, not mills — the word marks a commercial base, which is why their dates track trade, not industry.', reveals: 'factory-means-mill' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch10_044', title: 'You made it',
          caseStudy: { intro: 'First a warehouse on a coast, then an empire. The Europeans did not just visit India — they unpacked and stayed.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch10_039', difficulty: 'standard',
          question: 'The "Coming of the Europeans" refers to the period starting in 1498 when.',
          hint: 'Review c6_history_timeline_and_sources regarding the use of CE/BCE and timelines.',
          misconception: 'Students often think "factory" meant a modern building with machines.',
          parts: [
                { id: 'a', prompt: 'Who was the first European explorer to reach India by sailing around the Cape of Good Hope?', answer: 'Vasco da Gama',
                  options: ['Vasco da Gama', 'Columbus', 'factory', '"factory" meant a modern building with machines'],
                  hint: 'Review c6_history_timeline_and_sources regarding the use of CE/BCE and timelines.',
                  misconception: 'Students often think "factory" meant a modern building with machines.' },
                { id: 'b', prompt: 'If the Portuguese arrived in 1498 and the East India Company was founded in 1600, which group arrived in India first?', answer: 'The Portuguese',
                  options: ['The Portuguese', 'factory', '"factory" meant a modern building with machines'],
                  hint: 'Review c6_history_timeline_and_sources regarding the use of CE/BCE and timelines.',
                  misconception: 'Students often think "factory" meant a modern building with machines.' }
          ],
            remediations: { 'factory-meant-a-modern-building': { steps: ['First, clarify that "factory" comes from "factor" (a merchant).', 'Ask the student to look at a picture of a 17th-century port storehouse.', 'Explain: "Think of it as a big secure garage for goods, not a place with assembly lines."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch10_040', difficulty: 'standard',
          question: 'The Battle of Plassey (1757) was a pivotal event where the East India Company.',
          hint: 'Review the earlier chapters on why Europeans came to India for trade.',
          misconception: 'Students often think the British won because they were "more modern" or "smarter" than the Indians.',
          parts: [
                { id: 'a', prompt: 'Was the Battle of Plassey won primarily because of the Company’s superior weapons and training?', answer: 'No, it was won through treachery, specifically the bribery of Mir Jafar',
                  options: ['No, it was won through treachery, specifically the bribery of Mir Jafar', 'more modern', 'smarter', 'the British won because they were "more modern" or "smarter" than the Indians'],
                  hint: 'Review the earlier chapters on why Europeans came to India for trade.',
                  misconception: 'Students often think the British won because they were "more modern" or "smarter" than the Indians.' },
                { id: 'b', prompt: 'If you were a historian, why would you say Mir Jafar’s decision to switch sides was the most important moment of the battle?', answer: 'Acknowledge Mir Jafar was the Nawab\'s general',
                  options: ['Acknowledge Mir Jafar was the Nawab\'s general', 'more modern', 'smarter', 'battles are only about who has more soldiers'],
                  hint: 'Review the earlier chapters on why Europeans came to India for trade.',
                  misconception: 'Students often think the British won because they were "more modern" or "smarter" than the Indians.' }
          ],
            remediations: { 'the-british-won-because-they': { steps: ['Ask the student: "If I bribe your goalie to let the ball in, did I win because I’m a better football player?" 2.', 'Explain that the Company acted like the person who bribed the goalie.', 'Clarify that in 1757, the Company was small and needed local allies to gain power.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch10_041', difficulty: 'standard',
          question: 'The expansion of British rule in India refers to the process by which the East.',
          hint: 'Review the initial establishment of the East India Company in Bengal.',
          misconception: 'Students often think the British took over India purely because they were \'stronger\' in every way.',
          parts: [
                { id: 'a', prompt: 'Name two major powers that the British East India Company fought to expand their control in India.', answer: 'The Mysore Kingdom (led by Tipu Sultan) and the Marathas',
                  options: ['The Mysore Kingdom (led by Tipu Sultan) and the Marathas', 'the British took over India purely'],
                  hint: 'Review the initial establishment of the East India Company in Bengal.',
                  misconception: 'Students often think the British took over India purely because they were \'stronger\' in every way.' }
          ],
            remediations: { 'the-british-took-over-india': { steps: ['First, show the student a map of India with different regional kingdoms marked.', 'Ask them to identify two rival kingdoms near each other.', 'Explain that the British often promised to \'protect\' one kingdom to help them fight the other, ensuring the British.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch10_041', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the British took over India purely because they were \'stronger\' in every way.',
          parts: [
                { id: 'a', prompt: 'If you were a historian, how would you classify the \'Tiger of Mysore\'—as a victim of British diplomacy or a casualty of military conquest?', answer: 'A student should argue for \'military conquest\'',
                  options: ['A student should argue for \'military conquest\'', 'the British took over India purely'],
                  hint: 'Review the initial establishment of the East India Company in Bengal.',
                  misconception: 'Students often think the British took over India purely because they were \'stronger\' in every way.' }
          ],
            remediations: { 'the-british-took-over-india': { steps: ['First, show the student a map of India with different regional kingdoms marked.', 'Ask them to identify two rival kingdoms near each other.', 'Explain that the British often promised to \'protect\' one kingdom to help them fight the other, ensuring the British.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch10_042', difficulty: 'standard',
          question: 'The Revolt of 1857 was a major, widespread uprising by Indian soldiers (sepoys).',
          hint: 'Review the timeline of British expansion in India (Chapter 10 introduction).',
          misconception: 'Students often think the revolt was purely a "military mutiny" about gun parts.',
          parts: [
                { id: 'a', prompt: 'On what date and in which city did the Revolt of 1857 begin?', answer: 'The revolt began on May 10, 1857, in Meerut',
                  options: ['The revolt began on May 10, 1857, in Meerut', 'military mutiny', 'the revolt was purely a "military mutiny" about gun parts'],
                  hint: 'Review the timeline of British expansion in India (Chapter 10 introduction).',
                  misconception: 'Students often think the revolt was purely a "military mutiny" about gun parts.' },
                { id: 'b', prompt: 'When the sepoys reached Delhi, who did they declare as their leader?', answer: 'They declared the Mughal emperor Bahadur Shah Zafar as the leader',
                  options: ['They declared the Mughal emperor Bahadur Shah Zafar as the leader', 'military mutiny', 'the revolt was purely a "military mutiny" about gun parts'],
                  hint: 'Review the timeline of British expansion in India (Chapter 10 introduction).',
                  misconception: 'Students often think the revolt was purely a "military mutiny" about gun parts.' },
                { id: 'c', prompt: 'Why is the Revolt of 1857 sometimes called the "First War of Independence"?', answer: 'It is called this',
                  options: ['It is called this', 'military mutiny', 'the revolt was purely a "military mutiny" about gun parts'],
                  hint: 'Review the timeline of British expansion in India (Chapter 10 introduction).',
                  misconception: 'Students often think the revolt was purely a "military mutiny" about gun parts.' }
          ],
            remediations: { 'the-revolt-was-purely-a': { steps: ['First, ask the student to list three things that might make a soldier angry.', 'Then, explain that the cartridges were the "spark" that lit a fire that was already waiting to burn.', 'Ask them to look for other reasons (like loss of power) in their textbook chapters to see the bigger picture.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch10_043', difficulty: 'standard',
          question: 'Crown Rule (or the British Raj) was the period starting in 1858 when the.',
          hint: 'Review the events leading up to the 1857 Revolt to see why the Company lost its.',
          misconception: 'Students often think the East India Company and the British Government were the same entity from the beginning.',
          parts: [
                { id: 'a', prompt: 'Who officially became the head of India after the Government of India Act of 1858?', answer: 'Queen Victoria became the Empress of India',
                  options: ['Queen Victoria became the Empress of India', 'East India Company', 'British Government'],
                  hint: 'Review the events leading up to the 1857 Revolt to see why the Company lost its legitimacy.',
                  misconception: 'Students often think the East India Company and the British Government were the same entity from the beginning.' }
          ],
            remediations: { 'the-east-india-company-and': { steps: ['First, explain that the East India Company was a group of merchants, not the government itself.', 'Draw two circles: one labeled "Company" (for profit) and one labeled "Crown" (the state).', 'Show that after 1858, the "Company" circle disappears and the "Crown" takes over direct control.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch10_044', difficulty: 'standard',
          question: 'The British Raj refers to the period of direct rule by the British Crown over.',
          hint: 'Review the definition of "raw material" versus "manufactured good."',
          misconception: 'Students often assume that "cheap cloth" was a "good deal" for Indians without realizing that the destruction of the.',
          parts: [
                { id: 'a', prompt: 'What happened to the Indian textile industry when cheap British cloth arrived?', answer: 'The Indian textile industry, once one of the most advanced, was destroyed',
                  options: ['The Indian textile industry, once one of the most advanced, was destroyed', 'competition', 'cheap cloth', 'good deal'],
                  hint: 'Review the definition of "raw material" versus "manufactured good."',
                  misconception: 'Students often assume that "cheap cloth" was a "good deal" for Indians without realizing that the destruction of the local textile industry.' }
          ],
            remediations: { 'cheap-cloth-was-a-good': { steps: ['Ask the student: "If you buy a cheap shirt but lose your job because the factory that made it put your workshop out.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
