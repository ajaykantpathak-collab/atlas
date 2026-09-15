import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch06 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch06: SimDef = {
    id: 'v3_c6_history_ch06',
    title: 'New Beginnings',
    subtitle: 'Covers the general timeframe and definition of the Indian medieval period.',
    classLevel: 6, subject: 'history', topic: 'New Beginnings',
    chapters: ['c6_history_ch06'],
    nodeIds: ['c6_history_ch06_015', 'c6_history_ch06_016', 'c6_history_ch06_017', 'c6_history_ch06_018', 'c6_history_ch06_019', 'c6_history_ch06_020'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about how your school looks different now compared to when your grandparents went to school—new.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Your school today looks nothing like the one your grandparents attended. Historians say all of India changed the same way around 700 CE — but what actually changed enough to start a whole new period?',
        options: ['Old empires collapsed and regional kingdoms, new faiths, new art, and new ways of ruling took their place', 'A comet hit India and restarted the calendar', 'Everyone simply agreed to rename the era', 'Nothing changed — historians just needed a label'],
        answer: 'Old empires collapsed and regional kingdoms, new faiths, new art, and new ways of ruling took their place',
        hook: 'Medieval does not mean primitive stone-age times. The period from about 700 to 1700 CE is a bridge — the era when the culture, language, and art we recognize today began to form.',
    },
    teaching: [
        { title: 'Introduction to the Medieval Period', text: 'The medieval period in Indian history is a distinct era of transformation occurring roughly between 700 CE and 1700 CE, following the decline of ancient empires.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch06_015', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Act as a historian deciding whether a new period has begun — check if rulers, religions, buildings, and daily life all shifted, then stamp 700 CE as your starting line.',
        labels: ['Introduction to the Medieval', 'The Bhakti Movement: Devotion', 'The Sufi Movement: Mystical', 'Arrival of Islam', 'New Kingdoms and Dynasties', 'Cultural Developments in'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch06_015', title: 'Introduction to the Medieval Period',
          caseStudy: { intro: 'Think about how your school looks different now compared to when your grandparents went to school—new subjects, different rules, and new technology.',
            decisions: [{ prompt: 'What is the general timeframe used to define the medieval period in India?', options: [
                { text: 'The medieval period is generally dated from about 700 CE to 1700 CE', outcome: 'The medieval period is generally dated from about 700 CE to 1700 CE.' },
                { text: 'Medieval', outcome: 'Not quite — Students often believe that "Medieval" means the time before humans had technology or settled life.', reveals: 'medieval-means-the-time-before' },
                { text: 'Stone Age', outcome: 'Not quite — Students often believe that "Medieval" means the time before humans had technology or settled life.', reveals: 'medieval-means-the-time-before' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_016', title: 'The Bhakti Movement: Devotion to God',
          caseStudy: { intro: 'Have you ever felt that trying to talk to someone through a messenger or by following 10 different rules is much harder than just walking up to them and.',
            decisions: [{ prompt: 'What is the main meaning of the word "Bhakti"?', options: [
                { text: 'Bhakti means "devotion" or an intense, loving surrender to God', outcome: 'Bhakti means "devotion" or an intense, loving surrender to God.' },
                { text: 'Bhakti', outcome: 'Not quite — Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it.', reveals: 'bhakti-is-just-a-new' },
                { text: '"Bhakti" is just a new type of ritual', outcome: 'Not quite — Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it.', reveals: 'bhakti-is-just-a-new' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_017', title: 'The Sufi Movement: Mystical Islam',
          caseStudy: { intro: 'Think about a time you felt really close to someone special just by talking to them or thinking about them, rather than following a set of strict house rules.',
            decisions: [{ prompt: 'What is the primary way a Sufi saint (pir) sought to connect with God?', options: [
                { text: 'Sufis sought to connect with God through love, devotion, and meditation', outcome: 'Sufis sought to connect with God through love, devotion, and meditation.' },
                { text: 'by following strict laws', outcome: 'Not quite — Students often think Sufis were just "hermits" who lived alone in caves.', reveals: 'sufis-were-just-hermits-who' },
                { text: 'hermits', outcome: 'Not quite — Students often think Sufis were just "hermits" who lived alone in caves.', reveals: 'sufis-were-just-hermits-who' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_018', title: 'Arrival of Islam in the Subcontinent',
          caseStudy: { intro: 'Have you ever wondered how people from different parts of the world first met and shared their ideas?',
            decisions: [{ prompt: 'What were the two main ways that Islam first arrived in the Indian subcontinent?', options: [
                { text: 'The two main ways were through trade and through political conquest', outcome: 'The two main ways were through trade and through political conquest.' },
                { text: 'conquest', outcome: 'Not quite — Students often assume that Islam spread only through "conquest" because they conflate the arrival.', reveals: 'islam-spread-only-through-conquest' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_019', title: 'New Kingdoms and Dynasties',
          caseStudy: { intro: 'Think about your school\'s house system; each house has its own leaders and colors, even though they are all part of the same school.',
            decisions: [{ prompt: 'Name two Rajput dynasties mentioned as powerful between the 8th and 12th centuries.', options: [
                { text: 'The Chauhans and the Tomars', outcome: 'The Chauhans and the Tomars. A wrong answer here suggests the student is confusing these medieval.' },
                { text: 'Rajput', outcome: 'Not quite — Students often think "Rajput" refers to a single family or a single king who ruled all of India.', reveals: 'rajput-refers-to-a-single' },
                { text: '"Rajput" refers to a single family or a single king who ruled all of India', outcome: 'Not quite — Students often think "Rajput" refers to a single family or a single king who ruled all of India.', reveals: 'rajput-refers-to-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_020', title: 'Cultural Developments in the Medieval Period',
          caseStudy: { intro: 'Have you ever noticed how the style of buildings in your city looks different from the ancient forts or ruins you see in movies?',
            decisions: [{ prompt: 'Name one Sanskrit literary work and one regional language literary source mentioned in this period.', options: [
                { text: 'Kalhana’s *Rajatarangini* (Sanskrit) and the Tamil works of the Chola period or Hindi', outcome: 'Kalhana’s *Rajatarangini* (Sanskrit) and the Tamil works of the Chola period or Hindi works of the.' },
                { text: 'medieval', outcome: 'Not quite — Students often think "medieval" means "primitive" or "without progress." In reality, this period.', reveals: 'medieval-means-primitive-or-without' },
                { text: 'primitive', outcome: 'Not quite — Students often think "medieval" means "primitive" or "without progress." In reality, this period.', reveals: 'medieval-means-primitive-or-without' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_015', title: 'Use it in the wild',
          caseStudy: { intro: 'A student cataloguing a museum coin argues with the curator. The coin is dated around 1000 CE, and the student wants a verdict: \'Ancient or medieval — pick one. There must be an exact year the ancient period ended.\'',
            decisions: [{ prompt: 'Is there a precise border between the ancient and medieval periods?', options: [
                { text: 'No — the labels are rough shelves historians built after the fact, not real walls. Change happened gradually: ancient empires faded and new regional kingdoms, languages and building styles grew over centuries. The coin can be called early-medieval because of its era\'s features, but nobody woke up one January morning in a \'new period.\'', outcome: 'Periods are tools for organising slow change — what makes an artifact \'medieval\' is the world around it, not a date ticking over.' },
                { text: 'The student is right — historians must have fixed an exact day when ancient ended and medieval began.', outcome: 'No such day exists — period boundaries mark gradual transitions; pretending 700 CE flipped a switch misreads how history changes.', reveals: 'periods-have-exact-dates' },
                { text: 'The coin is unclassifiable — without an exact boundary, no artifact can ever be assigned a period.', outcome: 'Approximate labels still work — \'medieval\' usefully describes the era of regional kingdoms even though its edges are fuzzy.', reveals: 'fuzzy-means-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch06_020', title: 'You made it',
          caseStudy: { intro: 'Periods are not random labels on a timeline. When power, prayer, and painting all transform together, history turns a page.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch06_015', difficulty: 'standard',
          question: 'The medieval period in Indian history is a distinct era of transformation.',
          hint: 'Review the basic concept of "Time Periods" in history.',
          misconception: 'Students often believe that "Medieval" means the time before humans had technology or settled life.',
          parts: [
                { id: 'a', prompt: 'What is the general timeframe used to define the medieval period in India?', answer: 'The medieval period is generally dated from about 700 CE to 1700 CE',
                  options: ['The medieval period is generally dated from about 700 CE to 1700 CE', 'Medieval', 'Stone Age', 'Ancient'],
                  hint: 'Review the basic concept of "Time Periods" in history.',
                  misconception: 'Students often believe that "Medieval" means the time before humans had technology or settled life.' },
                { id: 'b', prompt: 'Why do historians call the medieval period a time of "transformation"?', answer: 'It is called a time of transformation',
                  options: ['It is called a time of transformation', 'static', 'Medieval', 'Stone Age'],
                  hint: 'Review the basic concept of "Time Periods" in history.',
                  misconception: 'Students often believe that "Medieval" means the time before humans had technology or settled life.' }
          ],
            remediations: { 'medieval-means-the-time-before': { steps: ['Ask the student to look at a timeline and point out the Harappan civilization (ancient) vs.', 'the Mughal Empire (medieval).', 'Explain that "Ancient" is like the foundation of a building, while "Medieval" is the structure built on top of it.', 'Have them list three things (like food, language, or buildings) that exist today but started in the medieval period.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_016', difficulty: 'standard',
          question: 'The Bhakti Movement was a religious and social shift in India where people.',
          hint: 'Review the concept of social hierarchy in early Indian society.',
          misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the.',
          parts: [
                { id: 'a', prompt: 'What is the main meaning of the word "Bhakti"?', answer: 'Bhakti means "devotion" or an intense, loving surrender to God',
                  options: ['Bhakti means "devotion" or an intense, loving surrender to God', 'Bhakti', '"Bhakti" is just a new type of ritual'],
                  hint: 'Review the concept of social hierarchy in early Indian society.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' },
                { id: 'b', prompt: 'How does the Bhakti movement change the role of the "priest" in society?', answer: 'It reduces the priest\'s authority',
                  options: ['It reduces the priest\'s authority', 'Bhakti', 'the movement was about fighting people rather than changing ideas', '"Bhakti" is just a new type of ritual'],
                  hint: 'Review the concept of social hierarchy in early Indian society.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' }
          ],
            remediations: { 'bhakti-is-just-a-new': { steps: ['First, ask the student to describe a rule they follow at home and why they follow it (e.g., "I wash my hands before.', 'Then, ask them what happens if they eat with love and joy versus eating while just following the rule.', 'Explain that Bhakti is like the "love" part—it is the feeling behind the act that matters more than the act itself.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the.',
          parts: [
                { id: 'a', prompt: 'Is the Bhakti movement more about what you do (rituals) or how you feel (love)? Defend your answer.', answer: 'It is about how you feel',
                  options: ['It is about how you feel', 'external show', 'internal faith', 'Bhakti'],
                  hint: 'Review the concept of social hierarchy in early Indian society.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' }
          ],
            remediations: { 'bhakti-is-just-a-new': { steps: ['First, ask the student to describe a rule they follow at home and why they follow it (e.g., "I wash my hands before.', 'Then, ask them what happens if they eat with love and joy versus eating while just following the rule.', 'Explain that Bhakti is like the "love" part—it is the feeling behind the act that matters more than the act itself.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_017', difficulty: 'standard',
          question: 'The Sufi movement was a mystical path within Islam that focused on finding.',
          hint: 'Review the definition of "mysticism"—the search for a direct, personal experience of the.',
          misconception: 'Students often think Sufis were just "hermits" who lived alone in caves.',
          parts: [
                { id: 'a', prompt: 'What is the primary way a Sufi saint (pir) sought to connect with God?', answer: 'Sufis sought to connect with God through love, devotion, and meditation',
                  options: ['Sufis sought to connect with God through love, devotion, and meditation', 'by following strict laws', 'hermits', 'Sufis were just "hermits" who lived alone in caves'],
                  hint: 'Review the definition of "mysticism"—the search for a direct, personal experience of the divine.',
                  misconception: 'Students often think Sufis were just "hermits" who lived alone in caves.' }
          ],
            remediations: { 'sufis-were-just-hermits-who': { steps: ['Explain that "hermit" implies complete isolation.', 'Point out that the khanqah was a "hospice" or a place of welcome for visitors.', 'Ask the student to identify one way the saint would help a visitor (e.g., listening, praying, giving advice).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_018', difficulty: 'standard',
          question: 'The arrival of Islam in the Indian subcontinent refers to the process by which.',
          hint: 'Review basic map locations of Kerala and Sindh.',
          misconception: 'Students often assume that Islam spread only through "conquest" because they conflate the arrival of the faith with the.',
          parts: [
                { id: 'a', prompt: 'What were the two main ways that Islam first arrived in the Indian subcontinent?', answer: 'The two main ways were through trade and through political conquest',
                  options: ['The two main ways were through trade and through political conquest', 'conquest'],
                  hint: 'Review basic map locations of Kerala and Sindh.',
                  misconception: 'Students often assume that Islam spread only through "conquest" because they conflate the arrival of the faith with the later establishment.' },
                { id: 'b', prompt: 'Why did Arab traders have such a strong influence on the coastal regions of India like Kerala?', answer: 'They influenced these regions',
                  options: ['They influenced these regions', 'conquest'],
                  hint: 'Review basic map locations of Kerala and Sindh.',
                  misconception: 'Students often assume that Islam spread only through "conquest" because they conflate the arrival of the faith with the later establishment.' }
          ],
            remediations: { 'islam-spread-only-through-conquest': { steps: ['Ask the student to visualize a map of the Indian Ocean.', 'Explain that ships carrying goods move slowly and stop at many ports, which is very different from an army moving.', 'Ask them to list three items an Arab trader might want to buy in Kerala (like pepper or cinnamon) to help them see the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_019', difficulty: 'standard',
          question: 'The medieval period was an era of transition in Indian history (approx.',
          hint: 'Review the concept of "territory" and "dynasty" from previous chapters.',
          misconception: 'Students often think "Rajput" refers to a single family or a single king who ruled all of India.',
          parts: [
                { id: 'a', prompt: 'Name two Rajput dynasties mentioned as powerful between the 8th and 12th centuries.', answer: 'The Chauhans and the Tomars',
                  options: ['The Chauhans and the Tomars', 'Rajput', '"Rajput" refers to a single family or a single king who ruled all of India'],
                  hint: 'Review the concept of "territory" and "dynasty" from previous chapters.',
                  misconception: 'Students often think "Rajput" refers to a single family or a single king who ruled all of India.' },
                { id: 'b', prompt: 'Why do we classify the Cholas, Cheras, and Pandyas as "Southern" powers in this period?', answer: 'They held power in the southern part of the Indian peninsula',
                  options: ['They held power in the southern part of the Indian peninsula', 'Rajput', '"Rajput" refers to a single family or a single king who ruled all of India'],
                  hint: 'Review the concept of "territory" and "dynasty" from previous chapters.',
                  misconception: 'Students often think "Rajput" refers to a single family or a single king who ruled all of India.' },
                { id: 'c', prompt: 'If a warrior clan in the 10th century followed a strict code of honour and resisted outside invasions in the Northern plains, which group would they most.', answer: 'The Rajputs',
                  options: ['The Rajputs', 'Rajput', '"Rajput" refers to a single family or a single king who ruled all of India'],
                  hint: 'Review the concept of "territory" and "dynasty" from previous chapters.',
                  misconception: 'Students often think "Rajput" refers to a single family or a single king who ruled all of India.' }
          ],
            remediations: { 'rajput-refers-to-a-single': { steps: ['Ask the student to draw a family tree with "Rajput" at the top and branches for "Chauhans," "Tomars," and "Rathores.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_020', difficulty: 'standard',
          question: 'Cultural developments in the medieval period refer to the growth of new.',
          hint: 'Review the definition of "civilization" in the Harappan chapter to understand why.',
          misconception: 'Students often think "medieval" means "primitive" or "without progress." In reality, this period saw massive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cultural developments in the medieval period refer to the growth of new literary styles,',
                  options: ['Cultural developments in the medieval period refer to the growth of new literary styles,', 'The medieval period in Indian history is a distinct era of transformation occurring', 'The Bhakti Movement was a religious and social shift in India where people moved away', 'The Sufi movement was a mystical path within Islam that focused on finding a direct,'],
                  hint: 'Review the definition of "civilization" in the Harappan chapter to understand why cultural.',
                  misconception: 'Students often think "medieval" means "primitive" or "without progress." In reality, this period saw massive advancements in how people.' }
          ],
            remediations: { 'medieval-means-primitive-or-without': { steps: ['Explain that "medieval" simply refers to a time middle-ground between ancient and modern history.', 'Ask the student to compare a simple mud house with a massive temple to visualize the complexity of the period.', 'Show them that writing in a local language is a sign of high development, not a lack of it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
