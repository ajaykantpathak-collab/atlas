import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch05_p1: SimDef = {
    id: 'v3_c7_hist_ch05_p1',
    title: 'How the Land Becomes Sacred · Part 1/2',
    subtitle: 'Covers the conceptual meaning and cultural significance of sacredness in the Indian.',
    classLevel: 7, subject: 'history', topic: 'How the Land Becomes Sacred · Part 1/2',
    chapters: ['c7_hist_ch05'],
    nodeIds: ['c7_hist_ch05_001', 'c7_hist_ch05_002', 'c7_hist_ch05_003', 'c7_hist_ch05_004', 'c7_hist_ch05_005', 'c7_hist_ch05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever visited a massive river like the Ganga or looked up at the snow-capped Himalayas and wondered.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Millions revere the Ganga as a living goddess, yet the village well down the lane stays just a well. How does a river — water and silt — become sacred?',
        options: ['Communities depended on it for water, fertile soil, and travel — and generations of gratitude, stories, and rituals turned that dependence into reverence', 'A king once declared it holy and everyone obeyed', 'It is the biggest river, and biggest is always sacred', 'Priests invented the idea for donations'],
        answer: 'Communities depended on it for water, fertile soil, and travel — and generations of gratitude, stories, and rituals turned that dependence into reverence',
        hook: 'Sacredness was not decreed from above — it grew from daily survival. And shared pilgrimage routes did quiet political work: people from rival kingdoms walked to the same holy sites, stitching a divided land into one cultural fabric.',
    },
    teaching: [
        { title: 'Sacredness: Meaning and Significance', text: 'Sacredness is the cultural and spiritual quality attributed to certain landscapes, rivers, mountains, and sites that societies regard as holy, life-giving, or connected to the divine.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how a life-giving river becomes a goddess — list what it gives a village, then follow the pilgrims whose shared journeys wove separate kingdoms into a common sacred map.',
        labels: ['Sacredness: Meaning and Significance', 'Sacred Geography of India', 'Pilgrimage Networks and Their', 'Sacred Sites: Temples, Shrines', 'Tirthas: Crossing Points', 'Role of Sacred Geography'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch05_001', title: 'Sacredness: Meaning and Significance',
          caseStudy: { intro: 'Have you ever visited a massive river like the Ganga or looked up at the snow-capped Himalayas and wondered why millions of people view them not just as water.',
            decisions: [{ prompt: 'What term is used to describe physical places like rivers, mountains, and forests that societies regard as holy or spiritually significant?', options: [
                { text: 'The correct term is sacred sites or sacred geography', outcome: 'The correct term is sacred sites or sacred geography. A student who answers incorrectly or confuses.' },
                { text: 'sacredness', outcome: 'Not quite — Students often think that "sacredness" is a purely religious rule imposed by priests or kings from.', reveals: 'sacredness-is-a-purely-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_002', title: 'Sacred Geography of India: Rivers, Mountains, Forests',
          caseStudy: { intro: 'Have you ever wondered why people travel hundreds of miles to bathe in the Ganga at Haridwar or why mountains like the Himalayas are considered the abodes.',
            decisions: [{ prompt: 'What role did major rivers like the Ganga and Yamuna play in the conceptualization of India\'s sacred geography during the ancient and.', options: [
                { text: 'Major rivers were viewed not merely as water sources for irrigation, but as living', outcome: 'Major rivers were viewed not merely as water sources for irrigation, but as living goddesses and.' },
                { text: 'sacred geography', outcome: 'Not quite — Students often think that "sacred geography" is a modern religious invention or that ancient people.', reveals: 'sacred-geography-is-a-modern' },
                { text: 'they were only used for ancient trade routes', outcome: 'Not quite — Students often think that "sacred geography" is a modern religious invention or that ancient people.', reveals: 'sacred-geography-is-a-modern' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_003', title: 'Pilgrimage Networks and Their Cultural Significance',
          caseStudy: { intro: 'Have you ever wondered why people from different parts of India travel thousands of miles to visit the same rivers, temples, or mountains during specific.',
            decisions: [{ prompt: 'What is a pilgrimage network in the context of the historical Indian subcontinent?', options: [
                { text: 'A pilgrimage network is a system of interconnected sacred sites, rivers, and shrines', outcome: 'A pilgrimage network is a system of interconnected sacred sites, rivers, and shrines linked.' },
                { text: 'a network of modern railway stations built for tourists', outcome: 'Not quite — Students often think that pilgrimage networks were created entirely by royal decrees or single.', reveals: 'pilgrimage-networks-were-created-entirely' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_004', title: 'Sacred Sites: Temples, Shrines and Holy Places',
          caseStudy: { intro: 'Have you ever visited an ancient stone temple like the Shore Temple at Mahabalipuram or the Brihadisvara Temple at Thanjavur and wondered why kings spent.',
            decisions: [{ prompt: 'What was the primary political motivation for medieval Indian kings to commission the construction of large stone temples?', options: [
                { text: 'Kings built large stone temples primarily to demonstrate their power, wealth, and', outcome: 'Kings built large stone temples primarily to demonstrate their power, wealth, and devotion.' },
                { text: 'kings built temples solely for personal prayer or charity', outcome: 'Not quite — Students often assume that medieval temples were isolated spiritual retreats where priests.', reveals: 'medieval-temples-were-isolated-spiritual' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_006', title: 'Role of Sacred Geography in Cultural Integration',
          caseStudy: { intro: 'Have you ever wondered why people from Kanyakumari in the extreme south travel all the way to Varanasi or Haridwar in the north for holy rituals, or why.',
            decisions: [{ prompt: 'What term is used to describe crossing points, holy rivers, or sacred centres where pilgrims gather for ritual cleansing and spiritual.', options: [
                { text: '*Tirthas*', outcome: 'The correct answer is *Tirthas*. A student who answers "temple" or "capital" has confused.' },
                { text: 'temple', outcome: 'Not quite — Students often assume that cultural unity in the Indian subcontinent was solely created by powerful.', reveals: 'cultural-unity-in-the-indian' },
                { text: 'capital', outcome: 'Not quite — Students often assume that cultural unity in the Indian subcontinent was solely created by powerful.', reveals: 'cultural-unity-in-the-indian' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a trip to Haridwar, Kavya watches thousands gather at the Ganga for aarti. Her cousin shrugs: \'The river is only called holy because some priest wrote it in a book long ago — otherwise it is just water.\'',
            decisions: [{ prompt: 'How should Kavya explain why the river became sacred?', options: [
                { text: 'Communities depended on the river for water, fertile silt and travel; gratitude and awe produced rituals and stories over generations, turning a physical lifeline into shared sacred geography that now binds distant pilgrims together.', outcome: 'This traces sacredness from everyday survival dependence to cultural tradition — it grew from people\'s lives, not from a single decree or text.' },
                { text: 'The cousin is right — sacredness is just a rule imposed from above, so the crowd is only following an old instruction.', outcome: 'Reverence for life-giving rivers existed among ordinary farming communities long before texts codified it; the rituals express dependence, not obedience.', reveals: 'sacredness-is-imposed' },
                { text: 'The river matters purely as a water supply — calling it sacred adds nothing to understanding its history.', outcome: 'Sacred status created pilgrimage networks that linked people across rival kingdoms into a shared cultural identity — far more than a water utility.', reveals: 'sacred-is-just-water' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_006', title: 'The bigger picture',
          caseStudy: { intro: 'A river that keeps you alive is easy to love and easy to worship. Sacred geography is gratitude written onto the land.',
            decisions: [{ prompt: 'What comes next? How the Land Becomes Sacred · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — How the Land Becomes Sacred · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch05_001', difficulty: 'standard',
          question: 'Sacredness is the cultural and spiritual quality attributed to certain.',
          hint: 'Review c6_history_ch04_001 to remember how early cities depended on river basins for.',
          misconception: 'Students often think that "sacredness" is a purely religious rule imposed by priests or kings from above, rather than.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe physical places like rivers, mountains, and forests that societies regard as holy or spiritually significant?', answer: 'The correct term is sacred sites or sacred geography',
                  options: ['The correct term is sacred sites or sacred geography', 'sacredness'],
                  hint: 'Review c6_history_ch04_001 to remember how early cities depended on river basins for agriculture.',
                  misconception: 'Students often think that "sacredness" is a purely religious rule imposed by priests or kings from above, rather than a gradual cultural.' }
          ],
            remediations: { 'sacredness-is-a-purely-religious': { steps: ['To fix this misconception, guide the student to examine how early human settlements relied on river valleys for.', 'Ask them to imagine living without taps or electricity, where a flooding river could either destroy their crops.', 'Explain that communities naturally expressed their gratitude and awe through stories and rituals, which over.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "sacredness" is a purely religious rule imposed by priests or kings from above, rather than.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The sacredness of the Indian landscape is entirely a fixed, unchanging concept created in ancient times with no connection to changing.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'sacredness'],
                  hint: 'Review c6_history_ch04_001 to remember how early cities depended on river basins for agriculture.',
                  misconception: 'Students often think that "sacredness" is a purely religious rule imposed by priests or kings from above, rather than a gradual cultural.' }
          ],
            remediations: { 'sacredness-is-a-purely-religious': { steps: ['To fix this misconception, guide the student to examine how early human settlements relied on river valleys for.', 'Ask them to imagine living without taps or electricity, where a flooding river could either destroy their crops.', 'Explain that communities naturally expressed their gratitude and awe through stories and rituals, which over.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_002', difficulty: 'standard',
          question: 'The sacred geography of India refers to the cultural and spiritual landscape.',
          hint: 'Review c7_hist_ch05_001 to solidify the basic definition of sacredness before attempting.',
          misconception: 'Students often think that "sacred geography" is a modern religious invention or that ancient people worshipped rivers.',
          parts: [
                { id: 'a', prompt: 'If a medieval pilgrim traveled from a southern kingdom like Vijayanagara to the northern river shrines of Prayaga, how did this journey reinforce the concept.', answer: 'The journey bridged regional divides',
                  options: ['The journey bridged regional divides', 'sacred geography'],
                  hint: 'Review c7_hist_ch05_001 to solidify the basic definition of sacredness before attempting to map.',
                  misconception: 'Students often think that "sacred geography" is a modern religious invention or that ancient people worshipped rivers and mountains simply.' }
          ],
            remediations: { 'sacred-geography-is-a-modern': { steps: ['To fix this misconception, compare a modern political map of India with a traditional conceptual map of tirthas and.', 'Guide the student to examine how classical texts list rivers from all corners of the subcontinent in daily prayers.', 'Explain that reverence arose from gratitude, philosophical worldview, and poetic tradition, not just fear of floods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_003', difficulty: 'standard',
          question: 'Pilgrimage networks are historical and cultural systems of interconnected.',
          hint: 'Review c7_hist_ch05_002 to reinforce how rivers and mountains formed the basic map.',
          misconception: 'Students often think that pilgrimage networks were created entirely by royal decrees or single religious leaders.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pilgrimage networks are historical and cultural systems of interconnected sacred sites,',
                  options: ['Pilgrimage networks are historical and cultural systems of interconnected sacred sites,', 'Sacredness is the cultural and spiritual quality attributed to certain landscapes,', 'The sacred geography of India refers to the cultural and spiritual landscape wherein', 'Temples, shrines, and holy places are sacred architectural structures and consecrated'],
                  hint: 'Review c7_hist_ch05_002 to reinforce how rivers and mountains formed the basic map of sacred.',
                  misconception: 'Students often think that pilgrimage networks were created entirely by royal decrees or single religious leaders overnight, failing.' }
          ],
            remediations: { 'pilgrimage-networks-were-created-entirely': { steps: ['To fix this misconception, have the student trace the gradual evolution of a local riverbank shrine into a pan-Indian.', 'Compare a local market village with a major pilgrimage center to show how economic exchange and cultural storytelling.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_004', difficulty: 'standard',
          question: 'Temples, shrines, and holy places are sacred architectural structures and.',
          hint: 'Review the political structures of regional kingdoms in medieval India and how rulers.',
          misconception: 'Students often assume that medieval temples were isolated spiritual retreats where priests meditated in solitude.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Temples, shrines, and holy places are sacred architectural structures and consecrated',
                  options: ['Temples, shrines, and holy places are sacred architectural structures and consecrated', 'Sacredness is the cultural and spiritual quality attributed to certain landscapes,', 'The sacred geography of India refers to the cultural and spiritual landscape wherein', 'Pilgrimage networks are historical and cultural systems of interconnected sacred sites,'],
                  hint: 'Review the political structures of regional kingdoms in medieval India and how rulers legitimized.',
                  misconception: 'Students often assume that medieval temples were isolated spiritual retreats where priests meditated in solitude, completely separate from.' }
          ],
            remediations: { 'medieval-temples-were-isolated-spiritual': { steps: ['To correct this misconception, examine an inscription from a medieval temple detailing land donations or grain storage.', 'Ask the student to trace who paid taxes to the temple and how the temple distributed food or employed artisans.', 'This demonstrates that temples operated as major economic corporations of their time.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_005', difficulty: 'standard',
          question: 'A tirtha is a sacred crossing point—traditionally a river confluence, ford,.',
          hint: 'Review c7_hist_ch05_002 to understand how rivers and mountains formed the sacred.',
          misconception: 'Students often think tirthas were always grand urban temple complexes built by royal decree overnight, ignoring their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A tirtha is a sacred crossing point—traditionally a river confluence, ford, or ghat—where',
                  options: ['A tirtha is a sacred crossing point—traditionally a river confluence, ford, or ghat—where', 'Sacredness is the cultural and spiritual quality attributed to certain landscapes,', 'The sacred geography of India refers to the cultural and spiritual landscape wherein', 'Pilgrimage networks are historical and cultural systems of interconnected sacred sites,'],
                  hint: 'Review c7_hist_ch05_002 to understand how rivers and mountains formed the sacred geography of India.',
                  misconception: 'Students often think tirthas were always grand urban temple complexes built by royal decree overnight, ignoring their humble origins.' }
          ],
            remediations: { 'tirthas-were-always-grand-urban': { steps: ['To fix this misconception, guide the student to trace a tirtha backwards from a grand temple town to its natural.', 'Show them that spiritual significance almost always began with a natural landmark (a river bend or mountain spring).', 'Use a comparative map showing natural river confluences versus later architectural expansions to separate geography.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_006', difficulty: 'standard',
          question: 'The process by which shared sacred geographies—such as rivers, mountains, and.',
          hint: 'Review c7_hist_ch05_003 to understand how pilgrimage networks functioned before studying.',
          misconception: 'Students often assume that cultural unity in the Indian subcontinent was solely created by powerful central empires.',
          parts: [
                { id: 'a', prompt: 'What term is used to describe crossing points, holy rivers, or sacred centres where pilgrims gather for ritual cleansing and spiritual merit?', answer: '*Tirthas*',
                  options: ['*Tirthas*', 'temple', 'capital'],
                  hint: 'Review c7_hist_ch05_003 to understand how pilgrimage networks functioned before studying their role.',
                  misconception: 'Students often assume that cultural unity in the Indian subcontinent was solely created by powerful central empires like the Mauryas or the.' }
          ],
            remediations: { 'cultural-unity-in-the-indian': { steps: ['To fix this misconception, compare a political map of the medieval period (showing fragmented regional kingdoms) with.', 'Ask the student to trace how a pilgrim could travel across hostile political borders simply by virtue of moving along.', 'Emphasize that cultural integration through shared beliefs and geography operated independently of political.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
