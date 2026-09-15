import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch05_p1: SimDef = {
    id: 'v3_c8_hist_ch05_p1',
    title: 'A Journey through Indian Architecture · Part 1/2',
    subtitle: 'Stones that tell you what people believed',
    classLevel: 8, subject: 'history', topic: 'A Journey through Indian Architecture · Part 1/2',
    chapters: ['c8_hist_ch05'],
    nodeIds: ['c8_hist_ch5_1', 'c8_hist_ch5_10', 'c8_hist_ch5_11', 'c8_hist_ch5_12', 'c8_hist_ch5_2', 'c8_hist_ch5_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an apprentice to India\'s master builders', intro: 'Stand before the Qutub Minar or Brihadiswara temple and ask the real question: how did they make it beautiful AND keep it standing? The answer is five thousand years long.', goal: 'Understand Indian architecture as a blend of artistic symbolism and engineering — how climate, materials, patronage and belief shaped forms from stupas to stepwells to domes.' },
    discovery: {
        question: 'Indian builders knew about arches and domes for centuries — yet temples kept using flat beams on pillars. Were they just behind the times?',
        options: ['No — the post-and-lintel style carried sacred meaning: the beam stood for the cosmic axis, so keeping it was a choice, not ignorance', 'Yes — they simply hadn\'t invented arches yet', 'Arches were banned by law', 'Stone was too weak for arches in India'],
        answer: 'No — the post-and-lintel style carried sacred meaning: the beam stood for the cosmic axis, so keeping it was a choice, not ignorance',
        hook: 'Architecture here never split art from engineering. Stepwells dive down because desert water hides deep; temple tanks spread wide because monsoon rain floods the surface. Every building answers its climate AND its beliefs.',
    },
    teaching: [
        { title: 'Architecture as Art and Technology: Indian Tradition', text: 'Indian architecture is a continuous tradition from the 3rd millennium BCE to the present where buildings serve as both artistic expressions of religious, political, and cultural ideas and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch5_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Travel five millennia of building: Mohenjo-daro\'s drains, Sanchi\'s stupa, Pattadakal\'s temple towers, Rani ki Vav\'s inverted stepwell, Humayun\'s double dome. For each, find the problem the builders solved — and the idea they carved into stone.',
        labels: ['Architecture as Art', 'Colonial Architecture: Forts, Churches,', 'Regional Architecture: Bishnupur, Shekhawati', 'Conservation of Architectural Heritage', 'Harappan Civilisation: Urban Planning', 'Rock-Cut Architecture: Ellora'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch5_1', title: 'Architecture as Art and Technology: Indian Tradition',
          caseStudy: { intro: 'Imagine you are standing in front of the Qutub Minar in Delhi or the Brihadiswara Temple in Thanjavur.',
            decisions: [{ prompt: 'Name two distinct historical periods before the 12th century CE when Indian architecture made significant technological advances in stone.', options: [
                { text: 'Correct answer: Mauryan period (3rd century BCE)', outcome: 'Correct answer: Mauryan period (3rd century BCE) — polished sandstone pillars with monolithic.' },
                { text: 'technology', outcome: 'Not quite — Students often believe that "Indian architecture" is a single, unchanging style called "Hindu.', reveals: 'indian-architecture-is-a-single' },
                { text: 'Indian architecture', outcome: 'Not quite — Students often believe that "Indian architecture" is a single, unchanging style called "Hindu.', reveals: 'indian-architecture-is-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_10', title: 'Colonial Architecture: Forts, Churches, and Public Buildings',
          caseStudy: { intro: 'Imagine you are standing in front of Victoria Memorial in Kolkata or St.',
            decisions: [{ prompt: 'Which European power built the first European-style fort in India, and what was its name and location?', options: [
                { text: 'The Portuguese built Fort Manuel (later Fort Emmanuel) in Kochi (Cochin) in 1503, the', outcome: 'The Portuguese built Fort Manuel (later Fort Emmanuel) in Kochi (Cochin) in 1503, the first.' },
                { text: 'the British just built British buildings in India', outcome: 'Not quite — Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the.', reveals: 'colonial-architecture-in-india-was' },
                { text: 'Fort St', outcome: 'Not quite — Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the.', reveals: 'colonial-architecture-in-india-was' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_11', title: 'Regional Architecture: Bishnupur, Shekhawati Havelis, Chettinad',
          caseStudy: { intro: 'Imagine you are standing in a narrow lane of Fatehpur, Shekhawati, looking up at a haveli whose every wall — inside and out — is covered in frescoes of trains.',
            decisions: [{ prompt: 'Name the primary building material used in Bishnupur temples and explain why it was chosen over stone.', options: [
                { text: 'The primary material is terracotta (burnt clay bricks and tiles)', outcome: 'The primary material is terracotta (burnt clay bricks and tiles).' },
                { text: 'marble', outcome: 'Not quite — Students believe these three styles are "variations of the same Indian architecture" because they.', reveals: 'these-three-styles-are-variations' },
                { text: 'variations of the same Indian architecture', outcome: 'Not quite — Students believe these three styles are "variations of the same Indian architecture" because they.', reveals: 'these-three-styles-are-variations' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_12', title: 'Conservation of Architectural Heritage in Modern India',
          caseStudy: { intro: 'Imagine walking past the Qutub Minar or the Brihadiswara Temple — have you noticed scaffolding, fenced-off areas, or information boards?',
            decisions: [{ prompt: 'What is the name of the primary legislation enacted by the Parliament of India in 1958 for the protection of ancient monuments and.', options: [
                { text: 'The Ancient Monuments and Archaeological Sites and Remains Act, 1958 (AMASR Act)', outcome: 'The Ancient Monuments and Archaeological Sites and Remains Act, 1958 (AMASR Act).' },
                { text: 'Indian Antiquities Act', outcome: 'Not quite — Students believe "conservation" means only physical repair of old buildings by government.', reveals: 'conservation-means-only-physical-repair' },
                { text: 'Heritage Protection Act', outcome: 'Not quite — Students believe "conservation" means only physical repair of old buildings by government.', reveals: 'conservation-means-only-physical-repair' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_2', title: 'Harappan Civilisation: Urban Planning and Dholavira',
          caseStudy: { intro: 'Imagine you are visiting the Rann of Kutch during the monsoon: the salt flats turn into a shallow sea, but Dholavira\'s ancient reservoirs would have filled.',
            decisions: [{ prompt: 'Name the three distinct fortified divisions of Dholavira\'s city layout and state one unique public structure found there that is absent.', options: [
                { text: 'The three divisions are the Citadel (highest, westernmost), the Middle Town (north of', outcome: 'The three divisions are the Citadel (highest, westernmost), the Middle Town (north of citadel), and.' },
                { text: 'citadel and lower town', outcome: 'Not quite — Students believe all Harappan cities followed an identical "grid-plan + citadel + lower town.', reveals: 'all-harappan-cities-followed-an' },
                { text: 'grid-plan + citadel + lower town + Great Bath', outcome: 'Not quite — Students believe all Harappan cities followed an identical "grid-plan + citadel + lower town.', reveals: 'all-harappan-cities-followed-an' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_3', title: 'Rock-Cut Architecture: Ellora and Udayagiri Caves',
          caseStudy: { intro: 'Imagine you are standing at the Kailasa temple at Ellora — a massive temple carved *downward* from a single rock face, not built upward with bricks.',
            decisions: [{ prompt: 'Which dynasty is primarily associated with the excavation of the Kailasa temple (Cave 16) at Ellora, and during which century was it carved?', options: [
                { text: 'The Kailasa temple at Ellora was excavated under the Rashtrakuta king Krishna I in the', outcome: 'The Kailasa temple at Ellora was excavated under the Rashtrakuta king Krishna I in the 8th century.' },
                { text: 'tolerant', outcome: 'Not quite — Students believe Ellora\'s three religious groups were carved *at the same time* by a single.', reveals: 'ellora-s-three-religious-groups' },
                { text: 'caves = Buddhism', outcome: 'Not quite — Students believe Ellora\'s three religious groups were carved *at the same time* by a single.', reveals: 'ellora-s-three-religious-groups' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'On a heritage walk, a guide claims: \'Temple builders kept using post-and-lintel beams even after arches arrived because they simply did not know the new technique — Indian engineering only started when outsiders brought the arch.\'',
            decisions: [{ prompt: 'How should a student of Indian architecture respond?', options: [
                { text: 'Push back — the lintel choice was deliberate: the horizontal beam carried ritual meaning as the threshold between worlds, and arches were meanwhile being used in secular and water structures. Indian masons had centuries of stone innovation (corbelling, interlocking, polished Mauryan shafts) — the arch was absorbed, not the beginning.', outcome: 'This separates technological ignorance from cultural choice and recognises India\'s continuous engineering tradition.' },
                { text: 'The guide is right — a technique unused must be a technique unknown.', outcome: 'Builders used arches where they wanted them; temple form followed symbolic grammar, so choosing not to arch a shrine was a decision, not a gap in skill.', reveals: 'unused-means-unknown' },
                { text: 'Both are wrong — architecture is pure art, so debating construction technique misses the point of the monuments.', outcome: 'The tradition never split art from engineering; every carvings-and-load decision was both aesthetic and structural at once.', reveals: 'art-not-engineering' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_3', title: 'The bigger picture',
          caseStudy: { intro: 'Indian architecture is a conversation between faith and physics. From the sacred mountain to the stepwell, form follows both ritual and rainfall — and \'new\' styles were usually old skills wearing new shapes.',
            decisions: [{ prompt: 'What comes next? A Journey through Indian Architecture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Journey through Indian Architecture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch5_1', difficulty: 'standard',
          question: 'Indian architecture is a continuous tradition from the 3rd millennium BCE.',
          hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara.',
          misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until.',
          parts: [
                { id: 'a', prompt: 'Name two distinct historical periods before the 12th century CE when Indian architecture made significant technological advances in stone construction, and.', answer: 'Correct answer: Mauryan period (3rd century BCE)',
                  options: ['Correct answer: Mauryan period (3rd century BCE)', 'technology', 'Indian architecture', 'Hindu architecture'],
                  hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara Temple.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'b', prompt: 'Why did Indian builders continue using the post-and-lintel (trabeate) system for temples long after the arch and dome were known from the 12th century onwards?', answer: 'Correct answer: The trabeate system was deeply tied to Hindu temple symbolism',
                  options: ['Correct answer: The trabeate system was deeply tied to Hindu temple symbolism', 'they didn\'t know how to build arches', 'Indian architecture', 'Hindu architecture'],
                  hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara Temple.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'c', prompt: 'A historian argues that the shift from rock-cut to free-standing structural temples in the Deccan (e.g., Chalukya temples at Badami, Pattadakal) was driven.', answer: 'Correct reasoning: The claim is partially true but incomplete',
                  options: ['Correct reasoning: The claim is partially true but incomplete', 'Indian architecture', 'Hindu architecture', 'new technology'],
                  hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara Temple.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'd', prompt: 'Compare the technological response to water scarcity in two different regions: the stepwells of Gujarat/Rajasthan (e.g., Rani ki Vav) and the temple tanks.', answer: 'Correct answer: Stepwells are inverted architectures',
                  options: ['Correct answer: Stepwells are inverted architectures', 'Indian architecture', 'Hindu architecture', 'new technology'],
                  hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara Temple.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' }
          ],
            remediations: { 'indian-architecture-is-a-single': { steps: ['If the student holds this misconception, have them compare three images side-by-side: (1) a 7th-century Chalukya temple.', 'Ask: "Which building uses \'Islamic\' technology?" Guide them to see that all three use corbelling — the mosque screen.', 'Then introduce the true arch in the Alai Darwaza (1311 CE) as a *new* arrival, not the beginning of Indian stone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Indo-Islamic architecture is simply a mechanical mixing of Hindu and Islamic elements." Use the concepts of *syncretism* and.', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'Hindu motifs on Islamic buildings', 'Indian architecture', 'Hindu architecture'],
                  hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara Temple.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'b', prompt: 'Create a conceptual timeline (not just dates) showing how the *idea* of the "sacred mountain" (Meru/Kailasa) evolves in built form from the Buddhist stupa.', answer: 'Expected answer: 1) Stupa (3rd c',
                  options: ['Expected answer: 1) Stupa (3rd c', 'Indian architecture', 'Hindu architecture', 'new technology'],
                  hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara Temple.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' }
          ],
            remediations: { 'indian-architecture-is-a-single': { steps: ['If the student holds this misconception, have them compare three images side-by-side: (1) a 7th-century Chalukya temple.', 'Ask: "Which building uses \'Islamic\' technology?" Guide them to see that all three use corbelling — the mosque screen.', 'Then introduce the true arch in the Alai Darwaza (1311 CE) as a *new* arrival, not the beginning of Indian stone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_10', difficulty: 'standard',
          question: 'Colonial architecture in India (16th–20th century) refers to the forts.',
          hint: 'Revisit c6_history_ch10_039 (European arrival sequence) and c7_hist_ch07_008.',
          misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built.',
          parts: [
                { id: 'a', prompt: 'Why did the British shift from Neo-Classical to Indo-Saracenic style for major public buildings after 1857?', answer: 'After the 1857 Revolt, the British Crown sought to legitimize rule by visually',
                  options: ['After the 1857 Revolt, the British Crown sought to legitimize rule by visually', 'legitimate heirs to Indian empire', 'aesthetic preference', 'availability of craftsmen'],
                  hint: 'Revisit c6_history_ch10_039 (European arrival sequence) and c7_hist_ch07_008 (Indo-Islamic.',
                  misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built British buildings.' },
                { id: 'b', prompt: 'Compare the spatial layout of Fort St. George (Chennai) with the Red Fort (Delhi).', answer: 'Fort St',
                  options: ['Fort St', 'the British just built British buildings in India', 'colonial architecture in India was a one-way copy of European styles (e'],
                  hint: 'Revisit c6_history_ch10_039 (European arrival sequence) and c7_hist_ch07_008 (Indo-Islamic.',
                  misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built British buildings.' }
          ],
            remediations: { 'colonial-architecture-in-india-was': { steps: ['Show side-by-side images of the British Museum (London) and Victoria Memorial (Kolkata)—ask students to list 5.', 'Read a 1900 letter by architect William Emerson describing his study of "Indian Saracenic" buildings before designing.', 'Have students trace the origin of the chhatri (Rajput) and bangla roof (Bengal) in Indo-Saracenic buildings using the.', 'Rewrite the misconception as: "Colonial architecture was a dialogue—unequal, but a dialogue—between European imperial.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_11', difficulty: 'standard',
          question: 'Regional architecture in India (17th–19th centuries) refers to distinct.',
          hint: 'If stuck, revisit c8_hist_ch5_5’s worked example on temple typology and c8_hist_ch5_7’s.',
          misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards.',
          parts: [
                { id: 'a', prompt: 'Name the primary building material used in Bishnupur temples and explain why it was chosen over stone.', answer: 'The primary material is terracotta (burnt clay bricks and tiles)',
                  options: ['The primary material is terracotta (burnt clay bricks and tiles)', 'marble', 'variations of the same Indian architecture'],
                  hint: 'If stuck, revisit c8_hist_ch5_5’s worked example on temple typology and c8_hist_ch5_7’s comparison.',
                  misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards and ornamentation.' },
                { id: 'b', prompt: 'A Chettinad mansion has a central courtyard (mutram), thick lime-plastered walls, and Burma teak columns.', answer: 'The courtyard enables cross-ventilation in the hot, humid Tamil coast',
                  options: ['The courtyard enables cross-ventilation in the hot, humid Tamil coast', 'traditional', 'variations of the same Indian architecture'],
                  hint: 'If stuck, revisit c8_hist_ch5_5’s worked example on temple typology and c8_hist_ch5_7’s comparison.',
                  misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards and ornamentation.' }
          ],
            remediations: { 'these-three-styles-are-variations': { steps: ['Revisit c8_hist_ch5_5 (Temple Architecture) and c8_hist_ch5_7 (Islamic Architecture) to recall how imperial styles.', 'Use a map to trace the trade routes — Bengal silk to Mughal courts, Shekhawati caravans to Delhi/Sindh, Chettinad ships.', 'Create a three-column table: Patron | Building Type | Key Material | Climate Response. Fill it using textbook images.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_12', difficulty: 'standard',
          question: 'Conservation of architectural heritage in modern India refers to the post-1947.',
          hint: 'Revisit c8_hist_ch5_10 (Colonial Architecture) for ASI\'s origin, and c6_history_ch12_051.',
          misconception: 'Students believe "conservation" means only physical repair of old buildings by government archaeologists, and that once.',
          parts: [
                { id: 'a', prompt: 'What is the name of the primary legislation enacted by the Parliament of India in 1958 for the protection of ancient monuments and archaeological sites?', answer: 'The Ancient Monuments and Archaeological Sites and Remains Act, 1958 (AMASR Act)',
                  options: ['The Ancient Monuments and Archaeological Sites and Remains Act, 1958 (AMASR Act)', 'Indian Antiquities Act', 'Heritage Protection Act', 'conservation'],
                  hint: 'Revisit c8_hist_ch5_10 (Colonial Architecture) for ASI\'s origin, and c6_history_ch12_051 (Making.',
                  misconception: 'Students believe "conservation" means only physical repair of old buildings by government archaeologists, and that once a monument.' },
                { id: 'b', prompt: 'Why did the 1958 AMASR Act introduce the concept of "prohibited area" (100m) and "regulated area" (200m) around centrally protected monuments, which did not.', answer: 'The 1958 Act recognized that monuments cannot be preserved in isolation',
                  options: ['The 1958 Act recognized that monuments cannot be preserved in isolation', 'stricter rules', 'conservation'],
                  hint: 'Revisit c8_hist_ch5_10 (Colonial Architecture) for ASI\'s origin, and c6_history_ch12_051 (Making.',
                  misconception: 'Students believe "conservation" means only physical repair of old buildings by government archaeologists, and that once a monument.' }
          ],
            remediations: { 'conservation-means-only-physical-repair': { steps: ['Show the student the ASI\'s "List of Centrally Protected Monuments" (website) vs.', 'Use Google Earth to compare a protected monument\'s 100m buffer zone (e.g., Humayun\'s Tomb) with an unprotected one.', 'Read a 2-page excerpt from the 2010 AMASR Amendment debates (Parliament records) to see how MPs argued about.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_2', difficulty: 'standard',
          question: 'The Harappan Civilisation (c. 2600–1900 BCE) represents India\'s first.',
          hint: 'Review Class 6 notes on Harappan town planning (c6_history_ch04_003) and the Great Bath.',
          misconception: 'Students believe all Harappan cities followed an identical "grid-plan + citadel + lower town + Great Bath" template.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Harappan Civilisation (c',
                  options: ['The Harappan Civilisation (c', 'Indian architecture is a continuous tradition from the 3rd millennium BCE to the present', 'Colonial architecture in India (16th–20th century) refers to the forts, churches, and', 'Regional architecture in India (17th–19th centuries) refers to distinct building'],
                  hint: 'Review Class 6 notes on Harappan town planning (c6_history_ch04_003) and the Great Bath.',
                  misconception: 'Students believe all Harappan cities followed an identical "grid-plan + citadel + lower town + Great Bath" template.' }
          ],
            remediations: { 'all-harappan-cities-followed-an': { steps: ['Have the student construct a three-column comparison table: Feature | Mohenjo-daro (Indus floodplain) | Dholavira.', 'Fill rows: Perennial river?', '| Building material | Water source | Public water structure | City divisions | Unique public space.', 'Then annotate a Dholavira site map with arrows showing water flow from catchment → reservoir → channel → settling tank.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_3', difficulty: 'standard',
          question: 'Rock-cut architecture at Ellora (Maharashtra, 6th–10th century CE) and.',
          hint: 'If stuck, revisit Class 7 "Art and Architecture: Ajanta Caves and Temples".',
          misconception: 'Students believe Ellora\'s three religious groups were carved *at the same time* by a single "tolerant" ruler, and that.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ellora is unique because it has Buddhist, Hindu, and Jain caves side by side, proving religious tolerance." Using the *chronology* and.', answer: 'The claim oversimplifies',
                  options: ['The claim oversimplifies', 'side by side = tolerance', 'tolerant', 'caves = Buddhism'],
                  hint: 'If stuck, revisit Class 7 "Art and Architecture: Ajanta Caves and Temples" (c7_hist_ch04_007) and.',
                  misconception: 'Students believe Ellora\'s three religious groups were carved *at the same time* by a single "tolerant" ruler, and that Udayagiri is.' },
                { id: 'b', prompt: 'Compare the *excavation technique* at Udayagiri (Gupta period) and the Kailasa temple at Ellora (Rashtrakuta period).', answer: 'Udayagiri caves are *horizontal excavations* into a sandstone hill',
                  options: ['Udayagiri caves are *horizontal excavations* into a sandstone hill', 'tolerant', 'caves = Buddhism'],
                  hint: 'If stuck, revisit Class 7 "Art and Architecture: Ajanta Caves and Temples" (c7_hist_ch04_007) and.',
                  misconception: 'Students believe Ellora\'s three religious groups were carved *at the same time* by a single "tolerant" ruler, and that Udayagiri is.' }
          ],
            remediations: { 'ellora-s-three-religious-groups': { steps: ['Revisit the *timeline* — plot Udayagiri (c. 400 CE), Ajanta (c. 460–480 CE), Ellora Buddhist (c.', 'Use a *section drawing* of Kailasa (top-down excavation) vs. a *plan* of Udayagiri Cave 5 (horizontal) — trace the.', 'Compare the *Varaha panel* (Udayagiri) and *Ravana shaking Kailasa* (Ellora Cave 16) — both show royal power *through*.', 'Explain the sequence to a peer in 2 minutes; if you hesitate at the "why," return to Step 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
