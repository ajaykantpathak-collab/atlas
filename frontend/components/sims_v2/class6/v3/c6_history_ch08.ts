import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch08 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch08: SimDef = {
    id: 'v3_c6_history_ch08',
    title: 'Regional Kingdoms',
    subtitle: 'This node covers the origins, the timeline, the capital (Hampi), and the peak leadership.',
    classLevel: 6, subject: 'history', topic: 'Regional Kingdoms',
    chapters: ['c6_history_ch08'],
    nodeIds: ['c6_history_ch08_027', 'c6_history_ch08_028', 'c6_history_ch08_029', 'c6_history_ch08_030', 'c6_history_ch08_031', 'c6_history_ch08_032'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered how a massive team project in class starts with just two friends coming up with.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two brothers in 1336 name their brand-new capital Vijayanagara — city of victory — and today its stone chariot still stands at Hampi. What were Harihara and Bukka really announcing?',
        options: ['A kingdom built to stand strong against challenges — a statement of victory carved into a city name', 'That they had already conquered the whole world', 'That the city was a gift from a neighbouring king', 'That victory parades would be held every week'],
        answer: 'A kingdom built to stand strong against challenges — a statement of victory carved into a city name',
        hook: 'Vijayanagara was not the only kingdom in India then. Many regional powers existed side by side — the empire, peaking under Krishnadevaraya, was one brilliant piece of a diverse medieval map.',
    },
    teaching: [
        { title: 'The Vijayanagara Empire', text: 'The Vijayanagara Empire was a powerful medieval Indian kingdom that controlled southern India between 1336 and 1646, with its capital city, Vijayanagara, serving as a symbol of victory.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch08_027', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the ruins of Hampi — from the Virupaksha temple to the stone chariot — and rebuild the story of two brothers whose city of victory ruled the south for three centuries.',
        labels: ['The Vijayanagara Empire', 'The Bahmani and Deccan', 'The Rajput Kingdoms', 'The Maratha Kingdom', 'The Sikh Kingdom', 'Regional Kingdoms and Cultural'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch08_029', title: 'The Rajput Kingdoms',
          caseStudy: { intro: 'Think of the last time you saw a sports team wear a special uniform or follow a strict set of rules to prove their dedication to their school.',
            decisions: [{ prompt: 'Who was the most well-known ruler of the Chauhan dynasty mentioned in the text?', options: [
                { text: 'The most famous ruler was Prithviraj Chauhan', outcome: 'The most famous ruler was Prithviraj Chauhan. A wrong answer here suggests the student has not yet.' },
                { text: 'all Rajputs belonged to one single ruling family or dynasty', outcome: 'Not quite — Students often assume that all Rajputs belonged to one single ruling family or dynasty.', reveals: 'all-rajputs-belonged-to-one' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch08_030', title: 'The Maratha Kingdom',
          caseStudy: { intro: 'Imagine you are building a fort out of blocks in your backyard, but other children try to tell you how to play. How would you start your own game instead?',
            decisions: [{ prompt: 'Who was the founder of the Maratha Kingdom?', options: [
                { text: 'Shivaji was the founder of the Maratha Kingdom', outcome: 'Shivaji was the founder of the Maratha Kingdom. A wrong answer here suggests the student has not.' },
                { text: 'Shivaji', outcome: 'Not quite — Students often think the Maratha Kingdom appeared instantly as a large empire.', reveals: 'the-maratha-kingdom-appeared-instantly' },
                { text: 'the Maratha Kingdom appeared instantly as a large empire', outcome: 'Not quite — Students often think the Maratha Kingdom appeared instantly as a large empire.', reveals: 'the-maratha-kingdom-appeared-instantly' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch08_031', title: 'The Sikh Kingdom',
          caseStudy: { intro: 'Imagine if your school was divided into ten different sports teams, each playing by its own rules and controlling different corners of the playground.',
            decisions: [{ prompt: 'What was the name given to the military bands that controlled different parts of Punjab before they were unified?', options: [
                { text: 'They were called *misls*', outcome: 'They were called *misls*. A student who answers "armies" or "kingdoms" is confusing the specific.' },
                { text: 'armies', outcome: 'Not quite — Students often confuse the Sikh Gurus with the political rulers like Ranjit Singh.', reveals: 'students-often-confuse-the-sikh' },
                { text: 'kingdoms', outcome: 'Not quite — Students often confuse the Sikh Gurus with the political rulers like Ranjit Singh.', reveals: 'students-often-confuse-the-sikh' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch08_032', title: 'Regional Kingdoms and Cultural Diversity',
          caseStudy: { intro: 'Have you ever noticed that the temples in Southern India look very different from the buildings in the northern or central parts of the country?',
            decisions: [{ prompt: 'Name two examples of regional kingdoms mentioned in the study material.', options: [
                { text: 'The Vijayanagara Empire and the Deccan Sultanates', outcome: 'The Vijayanagara Empire and the Deccan Sultanates. A wrong answer suggests the student is confusing.' },
                { text: 'regional', outcome: 'Not quite — Students often think that "regional" means "unimportant" or "divided." They assume that because.', reveals: 'regional-means-unimportant-or-divided' },
                { text: 'unimportant', outcome: 'Not quite — Students often think that "regional" means "unimportant" or "divided." They assume that because.', reveals: 'regional-means-unimportant-or-divided' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch08_027', title: 'Use it in the wild',
          caseStudy: { intro: 'On a family trip to Hampi, a child kicks at the broken stones and asks why anyone flies across the country to look at \'a pile of ruins\' when the empire is long gone.',
            decisions: [{ prompt: 'What do ruins like Hampi\'s actually give historians?', options: [
                { text: 'Evidence books cannot — the layout, temples, tanks and bazaars of the ruined city let historians reconstruct the empire\'s size, wealth, planning and daily life. When texts are lost or silent, stones speak: Hampi\'s remains are how we know the \'City of Victory\' — a name reflecting its founders\' ambitions — was real and grand.', outcome: 'A ruin is a primary source in stone — it tells us what was built, how people lived and what the kingdom valued, long after the writers are gone.' },
                { text: 'The child is right — once an empire ends, its ruins are just old rocks with nothing to say.', outcome: 'Ruins are evidence, not rubble — archaeologists read city plans, water systems and art from them that no chronicle preserved.', reveals: 'ruins-are-rubble' },
                { text: 'Hampi matters only because it is pretty — historians study it for the architecture\'s beauty, not its history.', outcome: 'Beauty is a bonus — historians read the ruins for information about the empire\'s scale, economy and life, not for decoration.', reveals: 'ruins-are-just-pretty' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch08_032', title: 'You made it',
          caseStudy: { intro: 'Name a city victory and you set its destiny. For over 300 years, Vijayanagara lived up to its name.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch08_027', difficulty: 'standard',
          question: 'The Vijayanagara Empire was a powerful medieval Indian kingdom that controlled.',
          hint: 'Review the "Unity in Diversity" opening section to understand that the empire is one.',
          misconception: 'Students often mistakenly think that the Vijayanagara Empire was the only kingdom in India at the time.',
          parts: [
                { id: 'a', prompt: 'What does the name "Vijayanagara" mean, and why is it significant?', answer: 'It means "city of victory."',
                  options: ['It means "city of victory."', 'city of victory'],
                  hint: 'Review the "Unity in Diversity" opening section to understand that the empire is one of many.',
                  misconception: 'Students often mistakenly think that the Vijayanagara Empire was the only kingdom in India at the time.' }
          ],
            remediations: { 'students-often-mistakenly-think-that': { steps: ['Review the chapter introduction about "Unity in Diversity." Explain that just as India has many languages and foods,.', 'Point out that Vijayanagara was one of the "many" pieces that made up the "one" historical story of India.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch08_027', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often mistakenly think that the Vijayanagara Empire was the only kingdom in India at the time.',
          parts: [
                { id: 'a', prompt: 'Why is the period of Krishnadevaraya (1509–1529) considered the "peak" of the empire?', answer: 'It represents the time of greatest expansion and stability under his leadership',
                  options: ['It represents the time of greatest expansion and stability under his leadership', 'golden age'],
                  hint: 'Review the "Unity in Diversity" opening section to understand that the empire is one of many.',
                  misconception: 'Students often mistakenly think that the Vijayanagara Empire was the only kingdom in India at the time.' }
          ],
            remediations: { 'students-often-mistakenly-think-that': { steps: ['Review the chapter introduction about "Unity in Diversity." Explain that just as India has many languages and foods,.', 'Point out that Vijayanagara was one of the "many" pieces that made up the "one" historical story of India.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch08_028', difficulty: 'standard',
          question: 'The Bahmani Kingdom was an independent state established in the Deccan in 1347.',
          hint: 'Review the definition of a "kingdom" vs. "sultanate" in the context of regional history.',
          misconception: 'Students often think the Bahmani Kingdom and the Deccan Sultanates existed at the same time as separate competing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Bahmani Kingdom was an independent state established in the Deccan in 1347',
                  options: ['The Bahmani Kingdom was an independent state established in the Deccan in 1347', 'The Vijayanagara Empire was a powerful medieval Indian kingdom that controlled southern', 'The Rajput kingdoms were a collection of independent warrior-led Hindu states that', 'The Maratha Kingdom was a regional power founded in the 17th century by Shivaji in the'],
                  hint: 'Review the definition of a "kingdom" vs. "sultanate" in the context of regional history.',
                  misconception: 'Students often think the Bahmani Kingdom and the Deccan Sultanates existed at the same time as separate competing countries.' }
          ],
            remediations: { 'the-bahmani-kingdom-and-the': { steps: ['First, draw a single circle on a piece of paper and label it "Bahmani Kingdom (1347-1527)." Then, draw an arrow.', 'Explain that because the big circle "broke," the five small circles appeared, meaning they could not have existed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch08_029', difficulty: 'standard',
          question: 'The Rajput kingdoms were a collection of independent warrior-led Hindu states.',
          hint: 'Review the definition of a "Kingdom" as a territory ruled by a single king or family.',
          misconception: 'Students often assume that all Rajputs belonged to one single ruling family or dynasty.',
          parts: [
                { id: 'a', prompt: 'Who was the most well-known ruler of the Chauhan dynasty mentioned in the text?', answer: 'The most famous ruler was Prithviraj Chauhan',
                  options: ['The most famous ruler was Prithviraj Chauhan', 'all Rajputs belonged to one single ruling family or dynasty'],
                  hint: 'Review the definition of a "Kingdom" as a territory ruled by a single king or family.',
                  misconception: 'Students often assume that all Rajputs belonged to one single ruling family or dynasty.' }
          ],
            remediations: { 'all-rajputs-belonged-to-one': { steps: ['Explain that "Rajput" is like the word "student"—it describes a group that shares a role or status, but individual.', 'Ask them to name two different clans from the text to prove they understand these are distinct groups.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch08_030', difficulty: 'standard',
          question: 'The Maratha Kingdom was a regional power founded in the 17th century by Shivaji.',
          hint: 'Review the map of the Deccan region during the 17th century.',
          misconception: 'Students often think the Maratha Kingdom appeared instantly as a large empire.',
          parts: [
                { id: 'a', prompt: 'Who was the founder of the Maratha Kingdom?', answer: 'Shivaji was the founder of the Maratha Kingdom',
                  options: ['Shivaji was the founder of the Maratha Kingdom', 'Shivaji', 'the Maratha Kingdom appeared instantly as a large empire'],
                  hint: 'Review the map of the Deccan region during the 17th century.',
                  misconception: 'Students often think the Maratha Kingdom appeared instantly as a large empire.' }
          ],
            remediations: { 'the-maratha-kingdom-appeared-instantly': { steps: ['Review the timeline of Shivaji’s life.', 'First, point out his service to the Sultanates on a map.', 'Next, highlight the specific forts he captured one by one.', 'Finally, explain that "Chhatrapati" was a title earned after years of building his kingdom, not his first job.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch08_031', difficulty: 'standard',
          question: 'The Sikh Kingdom was a powerful regional state in Punjab established by Ranjit.',
          hint: 'Review the concept of regional kingdoms versus centralized empires.',
          misconception: 'Students often confuse the Sikh Gurus with the political rulers like Ranjit Singh.',
          parts: [
                { id: 'a', prompt: 'What was the name given to the military bands that controlled different parts of Punjab before they were unified?', answer: 'They were called *misls*',
                  options: ['They were called *misls*', 'armies', 'kingdoms'],
                  hint: 'Review the concept of regional kingdoms versus centralized empires.',
                  misconception: 'Students often confuse the Sikh Gurus with the political rulers like Ranjit Singh.' },
                { id: 'b', prompt: 'How did Ranjit Singh change the way the Sikh community was organized in the late 18th century?', answer: 'He unified the independent *misls* into a single, centralized Sikh Empire',
                  options: ['He unified the independent *misls* into a single, centralized Sikh Empire', 'he became a Guru'],
                  hint: 'Review the concept of regional kingdoms versus centralized empires.',
                  misconception: 'Students often confuse the Sikh Gurus with the political rulers like Ranjit Singh.' }
          ],
            remediations: { 'students-often-confuse-the-sikh': { steps: ['First, ask the student to draw a line down a page: label one side "Religious Gurus" and the other "Political Leaders.".', 'Then, explain that Ranjit Singh was a secular ruler who focused on geography and governance, not on religious doctrine.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch08_032', difficulty: 'standard',
          question: 'Regional kingdoms were independent political entities that flourished across.',
          hint: 'Review the section on "Unity in Diversity" in the introductory chapter of the textbook.',
          misconception: 'Students often think that "regional" means "unimportant" or "divided." They assume that because kingdoms were separate.',
          parts: [
                { id: 'a', prompt: 'Name two examples of regional kingdoms mentioned in the study material.', answer: 'The Vijayanagara Empire and the Deccan Sultanates',
                  options: ['The Vijayanagara Empire and the Deccan Sultanates', 'regional', 'unimportant', 'divided'],
                  hint: 'Review the section on "Unity in Diversity" in the introductory chapter of the textbook.',
                  misconception: 'Students often think that "regional" means "unimportant" or "divided." They assume that because kingdoms were separate, they had.' },
                { id: 'b', prompt: 'Why is the diversity of these regional kingdoms considered a strength rather than a weakness?', answer: 'It is a strength',
                  options: ['It is a strength', 'it made them fight more', 'regional', 'unimportant'],
                  hint: 'Review the section on "Unity in Diversity" in the introductory chapter of the textbook.',
                  misconception: 'Students often think that "regional" means "unimportant" or "divided." They assume that because kingdoms were separate, they had.' }
          ],
            remediations: { 'regional-means-unimportant-or-divided': { steps: ['If a student thinks regional equals unimportant, ask them: "Does having different types of food like Dosa, Idli, and.', 'Have them map out two kingdoms and list one unique thing from each to see that "different" equals "valuable."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
