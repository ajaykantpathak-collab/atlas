import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch02_p2: SimDef = {
    id: 'v3_c7_hist_ch02_p2',
    title: 'The Rise of Empires · Part 2/2',
    subtitle: 'Covers the physical characteristics, geographical distribution, and administrative.',
    classLevel: 7, subject: 'history', topic: 'The Rise of Empires · Part 2/2',
    chapters: ['c7_hist_ch02'],
    nodeIds: ['c7_hist_ch02_007', 'c7_hist_ch02_008', 'c7_hist_ch02_009', 'c7_hist_ch02_010', 'c7_hist_ch02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine traveling along an ancient Indian trade route thousands of years ago and suddenly encountering.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What really turns a small mahajanapada into a vast empire — one glorious battle, or something much quieter happening in the fields first?',
        options: ['Agricultural surplus paid as taxes funds a standing army and royal officials — empires are built on grain before swords', 'One brave king and one huge victory are all it takes', 'Empires appear when maps get bigger', 'Crowns — whoever forges the largest crown rules the most land'],
        answer: 'Agricultural surplus paid as taxes funds a standing army and royal officials — empires are built on grain before swords',
        hook: 'An empire is not just a kingdom that won extra battles — it needs centralised tax collection, permanent officials, and uniform law across many regions. Magadha had the winning combination: fertile soil and iron mines beneath it.',
    },
    teaching: [
        { title: 'Ashoka\'s Edicts and Inscriptions: Rock and Pillar Edicts', text: 'Ashoka\'s edicts and inscriptions are official royal decrees, moral instructions, and public announcements carved onto massive stone pillars and natural rock faces across the Indian subcontinent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit Magadha like a royal advisor — count the iron ore, the river-fed fields, and the tax channels — and explain why this kingdom, above its rivals, was built to become an empire.',
        labels: ['Ashoka\'s Edicts and Inscriptions', 'Administration of the Maurya', 'Economy and Society Under', 'Art and Architecture', 'Decline of the Maurya'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch02_007', title: 'Ashoka\'s Edicts and Inscriptions: Rock and Pillar Edicts',
          caseStudy: { intro: 'Imagine traveling along an ancient Indian trade route thousands of years ago and suddenly encountering a towering, polished stone pillar with words carved into.',
            decisions: [{ prompt: 'What script was primarily used to write Ashoka\'s edicts found in the northwestern part of the Indian subcontinent (modern-day Pakistan and.', options: [
                { text: 'Kharosthi script (written from right to left)', outcome: 'The correct answer is Kharosthi script (written from right to left).' },
                { text: 'Brahmi', outcome: 'Not quite — Students often think that Ashoka\'s edicts were written in a single language and script throughout.', reveals: 'ashoka-s-edicts-were-written' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch02_008', title: 'Administration of the Maurya Empire',
          caseStudy: { intro: 'Imagine visiting a massive modern amusement park or a large school with thousands of students where everything—from the security gates to the cafeteria.',
            decisions: [{ prompt: 'What was the title of the capital city from which the Mauryan emperors ruled their vast empire?', options: [
                { text: 'The capital city of the Mauryan Empire was Pataliputra', outcome: 'The capital city of the Mauryan Empire was Pataliputra. A student who answers "Taxila" or "Ujjain".' },
                { text: 'Taxila', outcome: 'Not quite — Students often assume that the Mauryan Empire was ruled uniformly across all regions using the.', reveals: 'the-mauryan-empire-was-ruled' },
                { text: 'Ujjain', outcome: 'Not quite — Students often assume that the Mauryan Empire was ruled uniformly across all regions using the.', reveals: 'the-mauryan-empire-was-ruled' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch02_011', title: 'Decline of the Maurya Empire',
          caseStudy: { intro: 'Imagine visiting a massive historical fort where the main gate is locked, the walls are crumbling, and local chieftains have started building their own smaller.',
            decisions: [{ prompt: 'Who was the last ruler of the Maurya Empire, and when was he overthrown?', options: [
                { text: 'The last ruler of the Maurya Empire was Brihadratha, who was overthrown around 185 BCE by', outcome: 'The last ruler of the Maurya Empire was Brihadratha, who was overthrown around 185 BCE by his.' },
                { text: 'Ashoka', outcome: 'Not quite — Students often believe that the Maurya Empire fell overnight because of a single foreign invasion.', reveals: 'the-maurya-empire-fell-overnight' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a class debate, Arjun argues that an empire is \'just a kingdom whose army won a few extra battles — nothing else changes.\' His opponent needs to show what really separates a mahajanapada from an empire.',
            decisions: [{ prompt: 'What is the strongest counter to Arjun\'s claim?', options: [
                { text: 'Winning battles gives only temporary dominance; an empire needs a permanent standing army, centralised tax collection through royal officials, uniform administration and control over distant, diverse regions — all funded by agricultural surplus and trade revenue, not just bravery.', outcome: 'This distinguishes short-term conquest from imperial structure: institutions and economic foundations are what turn a kingdom into an empire.' },
                { text: 'Arjun is right — once you defeat neighbouring kings, the bigger territory automatically runs itself the same way a small kingdom did.', outcome: 'Larger, diverse territories cannot be run by personal rule and local chiefs alone; without bureaucracy and standing forces, conquered lands break away.', reveals: 'empire-is-just-bigger' },
                { text: 'The real difference is that emperors had better titles — the actual administration stayed identical to a small janapada.', outcome: 'Titles signalled sovereignty, but the substance changed too: salaried officials, centralised revenue and permanent armies replaced direct local collection.', reveals: 'only-titles-changed' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch02_011', title: 'You made it',
          caseStudy: { intro: 'Swords win battles; harvests win empires. The army marches on grain collected long before the war began.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch02_007', difficulty: 'standard',
          question: 'Ashoka\'s edicts and inscriptions are official royal decrees, moral.',
          hint: 'Review node c7_hist_ch02_006 to recall the exact moral rules and duties promoted.',
          misconception: 'Students often think that Ashoka\'s edicts were written in a single language and script throughout the entire Indian.',
          parts: [
                { id: 'a', prompt: 'What script was primarily used to write Ashoka\'s edicts found in the northwestern part of the Indian subcontinent (modern-day Pakistan and Afghanistan)?', answer: 'Kharosthi script (written from right to left)',
                  options: ['Kharosthi script (written from right to left)', 'Brahmi'],
                  hint: 'Review node c7_hist_ch02_006 to recall the exact moral rules and duties promoted by Ashoka under.',
                  misconception: 'Students often think that Ashoka\'s edicts were written in a single language and script throughout the entire Indian subcontinent.' }
          ],
            remediations: { 'ashoka-s-edicts-were-written': { steps: ['To fix this misconception, show students a linguistic map of Ashoka\'s edicts comparing the Brahmi script found.', 'Ask them to explain why a Greek-speaking community in the northwest would never be able to read a text written.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_008', difficulty: 'standard',
          question: 'The administration of the Maurya Empire refers to the highly centralized and.',
          hint: 'Review the node c7_hist_ch02_003 to recall how Chandragupta Maurya united different.',
          misconception: 'Students often assume that the Mauryan Empire was ruled uniformly across all regions using the exact same laws and tax.',
          parts: [
                { id: 'a', prompt: 'What was the title of the capital city from which the Mauryan emperors ruled their vast empire?', answer: 'The capital city of the Mauryan Empire was Pataliputra',
                  options: ['The capital city of the Mauryan Empire was Pataliputra', 'Taxila', 'Ujjain'],
                  hint: 'Review the node c7_hist_ch02_003 to recall how Chandragupta Maurya united different Janapadas into.',
                  misconception: 'Students often assume that the Mauryan Empire was ruled uniformly across all regions using the exact same laws and tax systems.' }
          ],
            remediations: { 'the-mauryan-empire-was-ruled': { steps: ['To correct this misconception, have students compare a map of the core Mauryan territory with peripheral regions like.', 'Explain that just as a school principal directly runs the main classroom but gives more independence to clubs, the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_009', difficulty: 'standard',
          question: 'This topic explores how the Mauryan Empire organized its vast agricultural.',
          hint: 'Review c7_hist_ch02_008 to recall how Mauryan provinces and officials functioned before.',
          misconception: 'Students often think that the Mauryan economy was entirely socialist, with the state owning all land, trade, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores how the Mauryan Empire organized its vast agricultural production,',
                  options: ['This topic explores how the Mauryan Empire organized its vast agricultural production,', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda'],
                  hint: 'Review c7_hist_ch02_008 to recall how Mauryan provinces and officials functioned before studying.',
                  misconception: 'Students often think that the Mauryan economy was entirely socialist, with the state owning all land, trade, and workshops.' }
          ],
            remediations: { 'the-mauryan-economy-was-entirely': { steps: ['To fix this misconception, compare the Mauryan economy to a modern mixed economy rather than a command economy.', 'Show students that while the *Arthashastra* outlines state-run departments (like agriculture and mining), it also.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_010', difficulty: 'standard',
          question: 'This topic explores the monumental art and architecture developed during the.',
          hint: 'Review c7_hist_ch02_008 (Administration of the Maurya Empire) to understand how the.',
          misconception: 'Students often believe that the Lion Capital of Ashoka and all Mauryan stone sculptures were made by carving soft clay.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the monumental art and architecture developed during the Maurya',
                  options: ['This topic explores the monumental art and architecture developed during the Maurya', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda'],
                  hint: 'Review c7_hist_ch02_008 (Administration of the Maurya Empire) to understand how the emperor.',
                  misconception: 'Students often believe that the Lion Capital of Ashoka and all Mauryan stone sculptures were made by carving soft clay or wood that later.' }
          ],
            remediations: { 'the-lion-capital-of-ashoka': { steps: ['To fix this, guide the student to examine the geological source of Mauryan pillars (Chunar quarries near Varanasi) and.', 'Explain step-by-step how artisans used chisels and abrasive sand mixtures to achieve the characteristic mirror-like.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch02_011', difficulty: 'standard',
          question: 'The decline of the Maurya Empire refers to the gradual weakening and eventual.',
          hint: 'Review c7_hist_ch02_008 to understand how the Mauryan administration was structured.',
          misconception: 'Students often believe that the Maurya Empire fell overnight because of a single foreign invasion or because Ashoka\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The decline of the Maurya Empire refers to the gradual weakening and eventual collapse of',
                  options: ['The decline of the Maurya Empire refers to the gradual weakening and eventual collapse of', 'The transition from kingdoms (*janapadas* and *mahajanapadas*) to empires in ancient', 'The Magadha Empire was one of the most powerful Mahajanapadas in ancient India, located', 'This topic covers how Chandragupta Maurya, guided by Chanakya, overthrew the Nanda'],
                  hint: 'Review c7_hist_ch02_008 to understand how the Mauryan administration was structured before.',
                  misconception: 'Students often believe that the Maurya Empire fell overnight because of a single foreign invasion or because Ashoka\'s conversion.' }
          ],
            remediations: { 'the-maurya-empire-fell-overnight': { steps: ['To fix this, trace a timeline from Ashoka\'s death in 232 BCE to Brihadratha\'s assassination in 185 BCE.', 'Compare the strength of Chandragupta Maurya\'s governance with the weak rule of later emperors, highlighting how distant.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
