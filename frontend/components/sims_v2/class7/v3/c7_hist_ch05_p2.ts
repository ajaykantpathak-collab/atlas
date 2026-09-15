import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch05_p2: SimDef = {
    id: 'v3_c7_hist_ch05_p2',
    title: 'How the Land Becomes Sacred · Part 2/2',
    subtitle: 'Covers the historical development and cultural significance of trans-peninsular.',
    classLevel: 7, subject: 'history', topic: 'How the Land Becomes Sacred · Part 2/2',
    chapters: ['c7_hist_ch05'],
    nodeIds: ['c7_hist_ch05_007', 'c7_hist_ch05_008', 'c7_hist_ch05_009', 'c7_hist_ch05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever wondered how people from Tamil Nadu in the far south traveled all the way to Varanasi.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Millions revere the Ganga as a living goddess, yet the village well down the lane stays just a well. How does a river — water and silt — become sacred?',
        options: ['Communities depended on it for water, fertile soil, and travel — and generations of gratitude, stories, and rituals turned that dependence into reverence', 'A king once declared it holy and everyone obeyed', 'It is the biggest river, and biggest is always sacred', 'Priests invented the idea for donations'],
        answer: 'Communities depended on it for water, fertile soil, and travel — and generations of gratitude, stories, and rituals turned that dependence into reverence',
        hook: 'Sacredness was not decreed from above — it grew from daily survival. And shared pilgrimage routes did quiet political work: people from rival kingdoms walked to the same holy sites, stitching a divided land into one cultural fabric.',
    },
    teaching: [
        { title: 'Pilgrimage Routes Connecting North and South India', text: 'The extensive networks of ancient and medieval pilgrimage routes that spanned across the Indian subcontinent, physically and culturally connecting North India to South India through holy riverbanks.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how a life-giving river becomes a goddess — list what it gives a village, then follow the pilgrims whose shared journeys wove separate kingdoms into a common sacred map.',
        labels: ['Pilgrimage Routes Connecting North', 'Sacred Rivers: Ganga, Yamuna,', 'Sacred Mountains and Their', 'Impact of Sacred Geography'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch05_007', title: 'Pilgrimage Routes Connecting North and South India',
          caseStudy: { intro: 'Have you ever wondered how people from Tamil Nadu in the far south traveled all the way to Varanasi or Badrinath in the north centuries ago, long before trains.',
            decisions: [{ prompt: 'What term describes the sacred crossing points or holy centers located along rivers and mountains that pilgrims travelled to visit across.', options: [
                { text: 'Tirthas (or pilgrimage centers)', outcome: 'The correct answer is Tirthas (or pilgrimage centers). If a student answers with "capitals".' },
                { text: 'capitals', outcome: 'Not quite — Students often think that ancient and medieval India was completely fragmented into isolated.', reveals: 'ancient-and-medieval-india-was' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a trip to Haridwar, Kavya watches thousands gather at the Ganga for aarti. Her cousin shrugs: \'The river is only called holy because some priest wrote it in a book long ago — otherwise it is just water.\'',
            decisions: [{ prompt: 'How should Kavya explain why the river became sacred?', options: [
                { text: 'Communities depended on the river for water, fertile silt and travel; gratitude and awe produced rituals and stories over generations, turning a physical lifeline into shared sacred geography that now binds distant pilgrims together.', outcome: 'This traces sacredness from everyday survival dependence to cultural tradition — it grew from people\'s lives, not from a single decree or text.' },
                { text: 'The cousin is right — sacredness is just a rule imposed from above, so the crowd is only following an old instruction.', outcome: 'Reverence for life-giving rivers existed among ordinary farming communities long before texts codified it; the rituals express dependence, not obedience.', reveals: 'sacredness-is-imposed' },
                { text: 'The river matters purely as a water supply — calling it sacred adds nothing to understanding its history.', outcome: 'Sacred status created pilgrimage networks that linked people across rival kingdoms into a shared cultural identity — far more than a water utility.', reveals: 'sacred-is-just-water' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch05_010', title: 'You made it',
          caseStudy: { intro: 'A river that keeps you alive is easy to love and easy to worship. Sacred geography is gratitude written onto the land.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch05_007', difficulty: 'standard',
          question: 'The extensive networks of ancient and medieval pilgrimage routes that spanned.',
          hint: 'Review c7_hist_ch05_001 and c7_hist_ch05_003 to reinforce how sacred spaces were.',
          misconception: 'Students often think that ancient and medieval India was completely fragmented into isolated kingdoms that had little.',
          parts: [
                { id: 'a', prompt: 'What term describes the sacred crossing points or holy centers located along rivers and mountains that pilgrims travelled to visit across the subcontinent?', answer: 'Tirthas (or pilgrimage centers)',
                  options: ['Tirthas (or pilgrimage centers)', 'capitals'],
                  hint: 'Review c7_hist_ch05_001 and c7_hist_ch05_003 to reinforce how sacred spaces were conceptualized.',
                  misconception: 'Students often think that ancient and medieval India was completely fragmented into isolated kingdoms that had little to no contact with.' }
          ],
            remediations: { 'ancient-and-medieval-india-was': { steps: ['To fix this misconception, have the student examine the architecture and inscriptions of South Indian temples (such.', 'Point out how architectural styles, Sanskrit literature, and ritual practices flowed freely across the Vindhya.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_008', difficulty: 'standard',
          question: 'This topic explores the cultural, religious, and historical significance.',
          hint: 'Review how early civilizations settled along river basins in Class 6 history before.',
          misconception: 'Students often think that the sacred status of rivers like the Ganga and Yamuna appeared overnight purely through.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the cultural, religious, and historical significance of India\'s major',
                  options: ['This topic explores the cultural, religious, and historical significance of India\'s major', 'Sacredness is the cultural and spiritual quality attributed to certain landscapes,', 'The sacred geography of India refers to the cultural and spiritual landscape wherein', 'Pilgrimage networks are historical and cultural systems of interconnected sacred sites,'],
                  hint: 'Review how early civilizations settled along river basins in Class 6 history before connecting.',
                  misconception: 'Students often think that the sacred status of rivers like the Ganga and Yamuna appeared overnight purely through mythology, completely.' }
          ],
            remediations: { 'the-sacred-status-of-rivers': { steps: ['To fix this misconception, guide the student to trace two parallel lines on a historical map: one showing ancient trade.', 'Ask the student to compare the two maps and notice how trade junctions and sacred sites overlap.', 'Explain that physical utility, economic survival, and spiritual reverence grew together hand in hand over centuries.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_009', difficulty: 'standard',
          question: 'This topic explores how mountains across the Indian subcontinent—such as the.',
          hint: 'Review node c7_hist_ch05_002 on the Sacred Geography of India to refresh how rivers.',
          misconception: 'Students often think that mountains were viewed solely as dangerous, uninhabitable physical barriers that isolated.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores how mountains across the Indian subcontinent—such as the Himalayas,',
                  options: ['This topic explores how mountains across the Indian subcontinent—such as the Himalayas,', 'Sacredness is the cultural and spiritual quality attributed to certain landscapes,', 'The sacred geography of India refers to the cultural and spiritual landscape wherein', 'Pilgrimage networks are historical and cultural systems of interconnected sacred sites,'],
                  hint: 'Review node c7_hist_ch05_002 on the Sacred Geography of India to refresh how rivers, forests, and.',
                  misconception: 'Students often think that mountains were viewed solely as dangerous, uninhabitable physical barriers that isolated different kingdoms from.' }
          ],
            remediations: { 'mountains-were-viewed-solely-as': { steps: ['To fix this, guide the student to examine a historical map of major pilgrimage routes crossing mountain ranges like the.', 'Point out how saints, traders, and pilgrims regularly traversed mountain passes, and compare this with how Ashoka\'s.', 'Have the student trace one ancient pilgrimage path across a mountain range to see its unifying role firsthand.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch05_010', difficulty: 'standard',
          question: 'The deep integration of sacred geography—rivers, mountains, forests, and.',
          hint: 'Review c7_hist_ch05_003 and c7_hist_ch05_006 to understand how travel and sacred sites.',
          misconception: 'Students often think sacred geography was just a set of religious beliefs held by priests, ignoring how ordinary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The deep integration of sacred geography—rivers, mountains, forests, and pilgrimage',
                  options: ['The deep integration of sacred geography—rivers, mountains, forests, and pilgrimage', 'Sacredness is the cultural and spiritual quality attributed to certain landscapes,', 'The sacred geography of India refers to the cultural and spiritual landscape wherein', 'Pilgrimage networks are historical and cultural systems of interconnected sacred sites,'],
                  hint: 'Review c7_hist_ch05_003 and c7_hist_ch05_006 to understand how travel and sacred sites fostered.',
                  misconception: 'Students often think sacred geography was just a set of religious beliefs held by priests, ignoring how ordinary peasants, artisans, and.' }
          ],
            remediations: { 'sacred-geography-was-just-a': { steps: ['To fix this misconception, examine historical sources like traveler accounts or temple inscriptions that show.', 'Compare how local village festivals linked agricultural cycles with sacred rivers, proving that sacred geography was.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
