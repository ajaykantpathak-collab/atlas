import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch04 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch04: SimDef = {
    id: 'v3_c6_history_ch04',
    title: 'Early Cities',
    subtitle: 'This node covers the emergence of early cities as a consequence of agricultural.',
    classLevel: 6, subject: 'history', topic: 'Early Cities',
    chapters: ['c6_history_ch04'],
    nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about your home: why do you live in a house in a specific town instead of moving to a new forest every.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A group that follows herds and picks wild berries moves camp every season. Why could they never build a city — while a farming village slowly could?',
        options: ['Farming produced surplus food, so people could stay put, grow in number, and free some hands for pottery and tools', 'Wanderers were too lazy to build walls', 'Cities only appear where gold is found', 'Herds of animals knocked down every building'],
        answer: 'Farming produced surplus food, so people could stay put, grow in number, and free some hands for pottery and tools',
        hook: 'Nobody woke up one morning and decided to build a city. Small farming villages swelled over thousands of years as surplus food let some people stop farming and start specializing.',
    },
    teaching: [
        { title: 'Introduction to Early Cities in the Subcontinent', text: 'Early cities were large, organized settlements that emerged after humans transitioned from hunting and gathering to farming, allowing populations to grow and develop complex social structures.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace a seed of grain into a stored surplus, then show how that surplus turns a quiet village into a bustling early city with potters, traders, and builders.',
        labels: ['Introduction to Early Cities', 'The Harappan Civilisation: Discovery', 'Harappan Cities: Town Planning', 'Harappan Life: Food, Crafts,', 'The Great Bath', 'The Decline of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch04_001', title: 'Introduction to Early Cities in the Subcontinent',
          caseStudy: { intro: 'Think about your home: why do you live in a house in a specific town instead of moving to a new forest every week?',
            decisions: [{ prompt: 'What was the primary way humans gathered food before they started farming?', options: [
                { text: 'Early humans survived by hunting animals and gathering wild plants and fruits', outcome: 'Early humans survived by hunting animals and gathering wild plants and fruits.' },
                { text: 'hunter-gatherer', outcome: 'Not quite — Students often assume early humans "decided" to build cities overnight.', reveals: 'early-humans-decided-to-build' },
                { text: 'farming', outcome: 'Not quite — Students often assume early humans "decided" to build cities overnight.', reveals: 'early-humans-decided-to-build' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_002', title: 'The Harappan Civilisation: Discovery and Extent',
          caseStudy: { intro: 'If you were exploring a dusty site in Pakistan and found ancient bricks and city walls, how would you know how old they are?',
            decisions: [{ prompt: 'In which decade did archaeologists begin the discovery of the major sites of the Harappan Civilisation?', options: [
                { text: 'The discovery began in the 1920s', outcome: 'The discovery began in the 1920s. A wrong answer here suggests the student has not distinguished.' },
                { text: 'discovered', outcome: 'Not quite — Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the.', reveals: 'students-often-confuse-the-discovery' },
                { text: 'discovery', outcome: 'Not quite — Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the.', reveals: 'students-often-confuse-the-discovery' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_003', title: 'Harappan Cities: Town Planning and Architecture',
          caseStudy: { intro: 'Imagine you are walking through a busy market in your town; are the lanes straight and organized, or do they twist and turn in every direction?',
            decisions: [{ prompt: 'What geometric pattern did Harappan streets follow?', options: [
                { text: 'The streets followed a grid pattern, crossing each other at right angles', outcome: 'The streets followed a grid pattern, crossing each other at right angles.' },
                { text: 'because they think', outcome: 'Not quite — Students often assume that all ancient cities were disorganized or "messy" because they think "old".', reveals: 'all-ancient-cities-were-disorganized' },
                { text: 'equals', outcome: 'Not quite — Students often assume that all ancient cities were disorganized or "messy" because they think "old".', reveals: 'all-ancient-cities-were-disorganized' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_004', title: 'Harappan Life: Food, Crafts, Trade',
          caseStudy: { intro: 'Think about the lunchbox you bring to school today—does it have grains, vegetables, or perhaps something made of cotton?',
            decisions: [{ prompt: 'Name two crops that the Harappan people grew for food.', options: [
                { text: 'The Harappan people grew wheat and barley', outcome: 'The Harappan people grew wheat and barley. A wrong answer here shows the student has not yet.' },
                { text: 'farmers', outcome: 'Not quite — Students often think Harappans were just "farmers" like the earlier Neolithic people.', reveals: 'harappans-were-just-farmers-like' },
                { text: 'Harappans were just "farmers" like the earlier Neolithic people', outcome: 'Not quite — Students often think Harappans were just "farmers" like the earlier Neolithic people.', reveals: 'harappans-were-just-farmers-like' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_005', title: 'The Great Bath and Public Buildings of Mohenjo-daro',
          caseStudy: { intro: 'Think about your school\'s swimming pool or a local community water tank; how is it kept from leaking, and how do people get in and out?',
            decisions: [{ prompt: 'What were the two main materials used to make the Great Bath at Mohenjo-daro waterproof and durable?', options: [
                { text: 'The two main materials were baked bricks and bitumen', outcome: 'The two main materials were baked bricks and bitumen. A wrong answer (like "cement" or "tiles").' },
                { text: 'cement', outcome: 'Not quite — Students often assume the Great Bath was an Olympic-style swimming pool for sports.', reveals: 'the-great-bath-was-an' },
                { text: 'the Great Bath was an Olympic-style swimming pool for sports', outcome: 'Not quite — Students often assume the Great Bath was an Olympic-style swimming pool for sports.', reveals: 'the-great-bath-was-an' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_006', title: 'The Decline of the Harappan Civilisation',
          caseStudy: { intro: 'Have you ever seen a house left empty because the well dried up or the roof collapsed?',
            decisions: [{ prompt: 'In what year (approximately) did the Harappan Civilisation begin its decline?', options: [
                { text: 'The decline began around 1900 BCE', outcome: 'The decline began around 1900 BCE. A student who says "5000 years ago" or "recently" shows they are.' },
                { text: '5000 years ago', outcome: 'Not quite — Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war.', reveals: 'the-harappan-civilisation-was-destroyed' },
                { text: 'recently', outcome: 'Not quite — Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war.', reveals: 'the-harappan-civilisation-was-destroyed' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a classroom simulation, a team runs a village that produces exactly as much grain as it eats. \'Let\'s grow into a city,\' they decide, \'we\'ll just build bigger houses.\'',
            decisions: [{ prompt: 'What is missing before any village can become a city?', options: [
                { text: 'A food surplus — a city means people who do not farm: potters, tool-makers, builders, rulers. They can exist only if farmers grow more than the farmers themselves need. A village producing exactly its own needs has nothing to feed specialists with — no surplus, no city, however big the houses get.', outcome: 'This is why the first cities grew on fertile river land — extra grain freed part of the population for crafts, trade and government.' },
                { text: 'The team is right — a city is just a village with bigger buildings and more people.', outcome: 'More people still need feeding — without surplus food, a bigger settlement just means more hungry mouths, not a city.', reveals: 'city-is-big-village' },
                { text: 'What is missing is walls — early settlements became cities the moment they built walls around themselves.', outcome: 'Walls are a feature, not the cause — the food surplus that pays for wall-builders has to come first.', reveals: 'walls-make-cities' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch04_006', title: 'You made it',
          caseStudy: { intro: 'A city is a village that stopped wandering. Feed more people than can farm, and the rest will build the future.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch04_001', difficulty: 'standard',
          question: 'Early cities were large, organized settlements that emerged after humans.',
          hint: 'Review the shift from gathering to farming in the early history section of the chapter.',
          misconception: 'Students often assume early humans "decided" to build cities overnight.',
          parts: [
                { id: 'a', prompt: 'What was the primary way humans gathered food before they started farming?', answer: 'Early humans survived by hunting animals and gathering wild plants and fruits',
                  options: ['Early humans survived by hunting animals and gathering wild plants and fruits', 'hunter-gatherer', 'farming', 'decided'],
                  hint: 'Review the shift from gathering to farming in the early history section of the chapter.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' },
                { id: 'b', prompt: 'How does a city differ from a small, temporary camp in terms of how people spend their time?', answer: 'In a temporary camp, everyone\'s energy is spent finding food',
                  options: ['In a temporary camp, everyone\'s energy is spent finding food', 'specialization', 'decided', 'early humans "decided" to build cities overnight'],
                  hint: 'Review the shift from gathering to farming in the early history section of the chapter.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' }
          ],
            remediations: { 'early-humans-decided-to-build': { steps: ['First, ask the student to draw a line representing 10,000 years.', 'Explain that the transition from a single hut to a city took thousands of years, not a few days.', 'Use the analogy of a "seed growing into a tree"—it needs time, stability, and nourishment (food surplus) to become.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_002', difficulty: 'standard',
          question: 'The Harappan Civilisation was one of the world\'s first major urban societies.',
          hint: 'Review the definitions of BCE and the role of an archaeologist from Chapter 4.',
          misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).',
          parts: [
                { id: 'a', prompt: 'In which decade did archaeologists begin the discovery of the major sites of the Harappan Civilisation?', answer: 'The discovery began in the 1920s',
                  options: ['The discovery began in the 1920s', 'discovered', 'discovery', 'existence'],
                  hint: 'Review the definitions of BCE and the role of an archaeologist from Chapter 4.',
                  misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).' },
                { id: 'b', prompt: 'Why do historians classify the Harappan Civilisation as an "urban" civilisation?', answer: 'It is called urban',
                  options: ['It is called urban', 'discovery', 'existence'],
                  hint: 'Review the definitions of BCE and the role of an archaeologist from Chapter 4.',
                  misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).' }
          ],
            remediations: { 'students-often-confuse-the-discovery': { steps: ['Clarify that history is like a puzzle: the "event" happened thousands of years ago, but the "discovery" is the moment.', 'Use the analogy of finding a lost diary in your attic; the diary was written years ago (existence), but you only just.', 'Emphasize that "1920s" is the date the researchers started the excavation, not the date the cities were built.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).',
          parts: [
                { id: 'a', prompt: 'Could we call the Harappan Civilisation "modern" because it had cities? Justify your stance.', answer: 'No, we call it "early urban,"',
                  options: ['No, we call it "early urban,"', 'discovery', 'existence'],
                  hint: 'Review the definitions of BCE and the role of an archaeologist from Chapter 4.',
                  misconception: 'Students often confuse the "discovery" of the civilisation (1920s) with the "existence" of the civilisation (2600 BCE).' }
          ],
            remediations: { 'students-often-confuse-the-discovery': { steps: ['Clarify that history is like a puzzle: the "event" happened thousands of years ago, but the "discovery" is the moment.', 'Use the analogy of finding a lost diary in your attic; the diary was written years ago (existence), but you only just.', 'Emphasize that "1920s" is the date the researchers started the excavation, not the date the cities were built.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_003', difficulty: 'standard',
          question: 'Harappan town planning refers to the highly organized, systematic layout.',
          hint: 'Review the transition from nomadic life to permanent settlements in the previous chapter.',
          misconception: 'Students often assume that all ancient cities were disorganized or "messy" because they think "old" equals "primitive.".',
          parts: [
                { id: 'a', prompt: 'What geometric pattern did Harappan streets follow?', answer: 'The streets followed a grid pattern, crossing each other at right angles',
                  options: ['The streets followed a grid pattern, crossing each other at right angles', 'because they think', 'equals', 'all ancient cities were disorganized or "messy"'],
                  hint: 'Review the transition from nomadic life to permanent settlements in the previous chapter.',
                  misconception: 'Students often assume that all ancient cities were disorganized or "messy" because they think "old" equals "primitive." They may struggle.' },
                { id: 'b', prompt: 'Why do historians believe Harappan cities were planned before they were built?', answer: 'Because the city was divided into orderly rectangular blocks by straight streets',
                  options: ['Because the city was divided into orderly rectangular blocks by straight streets', 'because they think', 'equals', 'all ancient cities were disorganized or "messy"'],
                  hint: 'Review the transition from nomadic life to permanent settlements in the previous chapter.',
                  misconception: 'Students often assume that all ancient cities were disorganized or "messy" because they think "old" equals "primitive." They may struggle.' }
          ],
            remediations: { 'all-ancient-cities-were-disorganized': { steps: ['Ask the student to draw a square on a piece of paper and divide it into four smaller squares using only straight lines.', 'Explain that if they can do this, they have created a "grid." Tell them to imagine an entire city built on that same.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_004', difficulty: 'standard',
          question: 'The Harappan economy was a thriving system based on agriculture, animal.',
          hint: 'Review the section on "The First Crops" to see how climate changes led to farming.',
          misconception: 'Students often think Harappans were just "farmers" like the earlier Neolithic people.',
          parts: [
                { id: 'a', prompt: 'Name two crops that the Harappan people grew for food.', answer: 'The Harappan people grew wheat and barley',
                  options: ['The Harappan people grew wheat and barley', 'farmers', 'Harappans were just "farmers" like the earlier Neolithic people'],
                  hint: 'Review the section on "The First Crops" to see how climate changes led to farming.',
                  misconception: 'Students often think Harappans were just "farmers" like the earlier Neolithic people.' },
                { id: 'b', prompt: 'Why was the development of cotton cultivation significant for the Harappan people?', answer: 'It was significant',
                  options: ['It was significant', 'farmers', 'of the Harappans only as farmers and misses their role as innovators in textiles', 'Harappans were just "farmers" like the earlier Neolithic people'],
                  hint: 'Review the section on "The First Crops" to see how climate changes led to farming.',
                  misconception: 'Students often think Harappans were just "farmers" like the earlier Neolithic people.' }
          ],
            remediations: { 'harappans-were-just-farmers-like': { steps: ['If the student persists in thinking they were just simple farmers, ask them to compare a small village (which only.', 'Ask: "If everyone was just farming, who would make the beautiful pots and cotton clothes?" Guide them to see that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_005', difficulty: 'standard',
          question: 'The Great Bath of Mohenjo-daro was a large, rectangular public tank constructed.',
          hint: 'Review the definitions of "archaeology" and "excavation" from Chapter 4.',
          misconception: 'Students often assume the Great Bath was an Olympic-style swimming pool for sports.',
          parts: [
                { id: 'a', prompt: 'What were the two main materials used to make the Great Bath at Mohenjo-daro waterproof and durable?', answer: 'The two main materials were baked bricks and bitumen',
                  options: ['The two main materials were baked bricks and bitumen', 'cement', 'the Great Bath was an Olympic-style swimming pool for sports'],
                  hint: 'Review the definitions of "archaeology" and "excavation" from Chapter 4.',
                  misconception: 'Students often assume the Great Bath was an Olympic-style swimming pool for sports.' },
                { id: 'b', prompt: 'Why do archaeologists think the Great Bath was a significant part of the city of Mohenjo-daro?', answer: 'It was significant',
                  options: ['It was significant', 'public', 'the Great Bath was an Olympic-style swimming pool for sports', 'it was just a regular house tank, missing the "public" scale of the building'],
                  hint: 'Review the definitions of "archaeology" and "excavation" from Chapter 4.',
                  misconception: 'Students often assume the Great Bath was an Olympic-style swimming pool for sports.' }
          ],
            remediations: { 'the-great-bath-was-an': { steps: ['Ask the student: "If the city had no pipes or taps like we do today, why would they build a massive tank in the center.', 'Explain that big public structures usually serve a community purpose rather than personal exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_006', difficulty: 'standard',
          question: 'The decline of the Harappan Civilisation refers to the period around 1900 BCE.',
          hint: 'Review the concept of "settlement" and "agriculture" in early human history.',
          misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate.',
          parts: [
                { id: 'a', prompt: 'In what year (approximately) did the Harappan Civilisation begin its decline?', answer: 'The decline began around 1900 BCE',
                  options: ['The decline began around 1900 BCE', '5000 years ago', 'recently', 'destroyed'],
                  hint: 'Review the concept of "settlement" and "agriculture" in early human history.',
                  misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate "decline" with "being.' },
                { id: 'b', prompt: 'Why do historians use the word "theory" when discussing the decline of the Harappan cities?', answer: 'They use "theory"',
                  options: ['They use "theory"', 'destroyed', 'conquered', 'decline'],
                  hint: 'Review the concept of "settlement" and "agriculture" in early human history.',
                  misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate "decline" with "being.' },
                { id: 'c', prompt: 'If a river near a city changes its course, how does that impact the people living there?', answer: 'Identify the river as a source of water',
                  options: ['Identify the river as a source of water', 'destroyed', 'conquered', 'decline'],
                  hint: 'Review the concept of "settlement" and "agriculture" in early human history.',
                  misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate "decline" with "being.' }
          ],
            remediations: { 'the-harappan-civilisation-was-destroyed': { steps: ['Ask the student to draw a picture of a river and a farm.', 'Ask them to erase the river and draw it somewhere else.', 'Ask them: "What happens to the crops now?" 4.', 'Explain that this represents a \'decline\' rather than a \'war.\''], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
