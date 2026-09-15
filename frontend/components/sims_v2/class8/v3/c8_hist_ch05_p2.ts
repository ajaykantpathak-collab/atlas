import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch05_p2: SimDef = {
    id: 'v3_c8_hist_ch05_p2',
    title: 'A Journey through Indian Architecture · Part 2/2',
    subtitle: 'Stones that tell you what people believed',
    classLevel: 8, subject: 'history', topic: 'A Journey through Indian Architecture · Part 2/2',
    chapters: ['c8_hist_ch05'],
    nodeIds: ['c8_hist_ch5_4', 'c8_hist_ch5_5', 'c8_hist_ch5_6', 'c8_hist_ch5_7', 'c8_hist_ch5_8', 'c8_hist_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an apprentice to India\'s master builders', intro: 'Stand before the Qutub Minar or Brihadiswara temple and ask the real question: how did they make it beautiful AND keep it standing? The answer is five thousand years long.', goal: 'Understand Indian architecture as a blend of artistic symbolism and engineering — how climate, materials, patronage and belief shaped forms from stupas to stepwells to domes.' },
    discovery: {
        question: 'Indian builders knew about arches and domes for centuries — yet temples kept using flat beams on pillars. Were they just behind the times?',
        options: ['No — the post-and-lintel style carried sacred meaning: the beam stood for the cosmic axis, so keeping it was a choice, not ignorance', 'Yes — they simply hadn\'t invented arches yet', 'Arches were banned by law', 'Stone was too weak for arches in India'],
        answer: 'No — the post-and-lintel style carried sacred meaning: the beam stood for the cosmic axis, so keeping it was a choice, not ignorance',
        hook: 'Architecture here never split art from engineering. Stepwells dive down because desert water hides deep; temple tanks spread wide because monsoon rain floods the surface. Every building answers its climate AND its beliefs.',
    },
    teaching: [
        { title: 'Buddhist Architecture: Sanchi Stupa and Bharhut', text: 'Buddhist Architecture at Sanchi and Bharhut refers to the stupa complexes built between the 3rd century BCE and 1st century CE in central India (Madhya Pradesh), featuring hemispherical domes (andas).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch5_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Travel five millennia of building: Mohenjo-daro\'s drains, Sanchi\'s stupa, Pattadakal\'s temple towers, Rani ki Vav\'s inverted stepwell, Humayun\'s double dome. For each, find the problem the builders solved — and the idea they carved into stone.',
        labels: ['Buddhist Architecture: Sanchi Stupa', 'Temple Architecture: Nagara', 'Brihadiswara Temple: Chola Architecture', 'Islamic Architecture: Delhi Sultanate', 'Qutub Minar and Jama', 'Stepwells: Rani ki Vav'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch5_5', title: 'Temple Architecture: Nagara and Dravida Styles',
          caseStudy: { intro: 'Imagine you\'re visiting the Khajuraho temples in Madhya Pradesh and later the Brihadiswara Temple in Thanjavur, Tamil Nadu - both are Hindu temples but look.',
            decisions: [{ prompt: 'Name the two main classical styles of Hindu temple architecture in India and the broad geographical region associated with each style.', options: [
                { text: 'The two main styles are Nagara (North India) and Dravida (South India)', outcome: 'The two main styles are Nagara (North India) and Dravida (South India).' },
                { text: 'Indo-Islamic and Rajput', outcome: 'Not quite — Students believe Nagara and Dravida are rigid, unchanging "styles" like modern architectural.', reveals: 'nagara-and-dravida-are-rigid' },
                { text: 'styles', outcome: 'Not quite — Students believe Nagara and Dravida are rigid, unchanging "styles" like modern architectural.', reveals: 'nagara-and-dravida-are-rigid' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_6', title: 'Brihadiswara Temple: Chola Architecture',
          caseStudy: { intro: 'Imagine you are standing at the entrance of the Brihadiswara Temple in Thanjavur — the towering vimana rises like a mountain before you, and the giant Nandi.',
            decisions: [{ prompt: 'Who commissioned the Brihadiswara Temple at Thanjavur, and during which approximate period was it completed?', options: [
                { text: 'The Brihadiswara Temple was commissioned by Chola emperor Rajaraja I (reigned 985–1014', outcome: 'The Brihadiswara Temple was commissioned by Chola emperor Rajaraja I (reigned 985–1014 CE) and.' },
                { text: 'larger version', outcome: 'Not quite — Students often believe the Brihadiswara Temple is simply a "larger version" of earlier Dravida.', reveals: 'the-brihadiswara-temple-is-simply' },
                { text: 'Rajendra Chola, the Pallavas, or the Vijayanagara rulers', outcome: 'Not quite — Students often believe the Brihadiswara Temple is simply a "larger version" of earlier Dravida.', reveals: 'the-brihadiswara-temple-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_7', title: 'Islamic Architecture: Delhi Sultanate and Mughal Period',
          caseStudy: { intro: 'Imagine you are standing at the Qutub Minar in Delhi — its fluted sandstone tower has stood for over 800 years.',
            decisions: [{ prompt: 'What structural element, absent in pre-Islamic Indian architecture, was introduced by the Delhi Sultanate builders and became the defining.', options: [
                { text: 'The true arch (voussoir arch with keystone)', outcome: 'The true arch (voussoir arch with keystone), which transfers weight sideways to piers, unlike the.' },
                { text: 'minaret', outcome: 'Not quite — Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style".', reveals: 'delhi-sultanate-and-mughal-architecture' },
                { text: 'Islamic style', outcome: 'Not quite — Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style".', reveals: 'delhi-sultanate-and-mughal-architecture' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_8', title: 'Qutub Minar and Jama Masjid: Indo-Islamic Architecture',
          caseStudy: { intro: 'Imagine standing at the base of the Qutub Minar in Delhi — you see Hindu temple columns with bells and chains reused in a mosque courtyard, right next.',
            decisions: [{ prompt: 'What is the approximate height of the Qutub Minar, and which three rulers contributed to its construction across different periods?', options: [
                { text: 'The Qutub Minar stands approximately 73 meters (240 feet) tall', outcome: 'The Qutub Minar stands approximately 73 meters (240 feet) tall.' },
                { text: 'mixing', outcome: 'Not quite — Students believe Indo-Islamic architecture is a simple "mixing" of Hindu and Muslim styles — like.', reveals: 'indo-islamic-architecture-is-a' },
                { text: 'only Aibak, or attributing it entirely to the Mughals', outcome: 'Not quite — Students believe Indo-Islamic architecture is a simple "mixing" of Hindu and Muslim styles — like.', reveals: 'indo-islamic-architecture-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_9', title: 'Stepwells: Rani ki Vav and Water Architecture',
          caseStudy: { intro: 'Imagine walking down into the earth on a scorching Gujarat summer day — the air grows cooler, the light filters through carved pillars, and you reach water 27.',
            decisions: [{ prompt: 'In which present-day Indian state is Rani ki Vav located, and which dynasty commissioned its construction in the 11th century?', options: [
                { text: 'Rani ki Vav is located in Patan, Gujarat, and was commissioned by Queen Udayamati of the', outcome: 'Rani ki Vav is located in Patan, Gujarat, and was commissioned by Queen Udayamati of the Solanki.' },
                { text: 'just fancy wells', outcome: 'Not quite — Students often think stepwells are "just fancy wells" or "underground temples" — missing that they.', reveals: 'stepwells-are-just-fancy-wells' },
                { text: 'underground temples', outcome: 'Not quite — Students often think stepwells are "just fancy wells" or "underground temples" — missing that they.', reveals: 'stepwells-are-just-fancy-wells' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_4', title: 'Use it in the wild',
          caseStudy: { intro: 'On a heritage walk, a guide claims: \'Temple builders kept using post-and-lintel beams even after arches arrived because they simply did not know the new technique — Indian engineering only started when outsiders brought the arch.\'',
            decisions: [{ prompt: 'How should a student of Indian architecture respond?', options: [
                { text: 'Push back — the lintel choice was deliberate: the horizontal beam carried ritual meaning as the threshold between worlds, and arches were meanwhile being used in secular and water structures. Indian masons had centuries of stone innovation (corbelling, interlocking, polished Mauryan shafts) — the arch was absorbed, not the beginning.', outcome: 'This separates technological ignorance from cultural choice and recognises India\'s continuous engineering tradition.' },
                { text: 'The guide is right — a technique unused must be a technique unknown.', outcome: 'Builders used arches where they wanted them; temple form followed symbolic grammar, so choosing not to arch a shrine was a decision, not a gap in skill.', reveals: 'unused-means-unknown' },
                { text: 'Both are wrong — architecture is pure art, so debating construction technique misses the point of the monuments.', outcome: 'The tradition never split art from engineering; every carvings-and-load decision was both aesthetic and structural at once.', reveals: 'art-not-engineering' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch5_9', title: 'You made it',
          caseStudy: { intro: 'Indian architecture is a conversation between faith and physics. From the sacred mountain to the stepwell, form follows both ritual and rainfall — and \'new\' styles were usually old skills wearing new shapes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch5_4', difficulty: 'standard',
          question: 'Buddhist Architecture at Sanchi and Bharhut refers to the stupa complexes built.',
          hint: 'Review c7_hist_ch03_011 (Art and Architecture of the Reorganisation Period) focusing.',
          misconception: 'Students often think the Buddha\'s *life events* (birth, enlightenment, first sermon, mahaparinirvana) are carved.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Buddhist Architecture at Sanchi and Bharhut refers to the stupa complexes built between',
                  options: ['Buddhist Architecture at Sanchi and Bharhut refers to the stupa complexes built between', 'Indian architecture is a continuous tradition from the 3rd millennium BCE to the present', 'Colonial architecture in India (16th–20th century) refers to the forts, churches, and', 'Regional architecture in India (17th–19th centuries) refers to distinct building'],
                  hint: 'Review c7_hist_ch03_011 (Art and Architecture of the Reorganisation Period) focusing on the Bharhut.',
                  misconception: 'Students often think the Buddha\'s *life events* (birth, enlightenment, first sermon, mahaparinirvana) are carved at Sanchi.' }
          ],
            remediations: { 'the-buddha-s-life-events': { steps: ['Give the student a printed sheet with 6 Sanchi torana panels labeled A–F (e.g., Chhadanta Jataka, Vessantara Jataka.', 'Ask them to sort into "Jataka tale," "Miracle," "Symbolic Event."', 'Have them check against a key; discuss why the Buddha\'s *birth* (Maya dreaming of elephant) is absent while his.', 'Re-read the aniconic rule from Class 7 (c7_hist_ch03_011) to reinforce the doctrinal boundary.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_5', difficulty: 'standard',
          question: 'Nagara and Dravida are the two major classical styles of Hindu temple.',
          hint: 'If stuck, revisit c7_hist_ch06_007 (Temple Architecture: Nagara and Dravida Styles) and.',
          misconception: 'Students believe Nagara and Dravida are rigid, unchanging "styles" like modern architectural categories, rather than.',
          parts: [
                { id: 'a', prompt: 'Name the two main classical styles of Hindu temple architecture in India and the broad geographical region associated with each style.', answer: 'The two main styles are Nagara (North India) and Dravida (South India)',
                  options: ['The two main styles are Nagara (North India) and Dravida (South India)', 'Indo-Islamic and Rajput', 'styles'],
                  hint: 'If stuck, revisit c7_hist_ch06_007 (Temple Architecture: Nagara and Dravida Styles) and.',
                  misconception: 'Students believe Nagara and Dravida are rigid, unchanging "styles" like modern architectural categories, rather than evolving regional.' },
                { id: 'b', prompt: 'Given a photograph of an unidentified temple showing a curvilinear tower with an amalaka (ribbed disc) and kalasha (pot finial) at the top, a cruciform plan.', answer: 'This is a Nagara style temple',
                  options: ['This is a Nagara style temple', 'it has a tower', 'styles'],
                  hint: 'If stuck, revisit c7_hist_ch06_007 (Temple Architecture: Nagara and Dravida Styles) and.',
                  misconception: 'Students believe Nagara and Dravida are rigid, unchanging "styles" like modern architectural categories, rather than evolving regional.' }
          ],
            remediations: { 'nagara-and-dravida-are-rigid': { steps: ['Revisit c7_hist_ch06_007 (Class 7 Temple Architecture) and c7_hist_ch04_007 (Gupta Art and Architecture) to see the.', 'Use a map to locate Deogarh (Gupta), Khajuraho (Nagara), Mamallapuram (early Dravida), and Pattadakal (Vesara).', 'Compare photographs of Kandariya Mahadeva (Nagara) and Shore Temple (early Dravida) side-by-side, labeling.', 'Write one paragraph explaining why "style" is a historian\'s analytical tool, not a builder\'s rulebook.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_6', difficulty: 'standard',
          question: 'The Brihadiswara Temple at Thanjavur, built by Chola emperor Rajaraja.',
          hint: 'Revisit c8_hist_ch5_5 for Dravida terms and c7_hist_ch06_003 for Chola political history.',
          misconception: 'Students often believe the Brihadiswara Temple is simply a "larger version" of earlier Dravida temples like the Shore.',
          parts: [
                { id: 'a', prompt: 'Why is the use of granite at the Brihadiswara Temple considered an engineering achievement, given the geology of the Thanjavur region?', answer: 'Thanjavur lies on alluvial soil with no local granite quarries',
                  options: ['Thanjavur lies on alluvial soil with no local granite quarries', 'granite was locally available', 'they used simple carts', 'larger version'],
                  hint: 'Revisit c8_hist_ch5_5 for Dravida terms and c7_hist_ch06_003 for Chola political history.',
                  misconception: 'Students often believe the Brihadiswara Temple is simply a "larger version" of earlier Dravida temples like the Shore Temple, differing.' },
                { id: 'b', prompt: 'Compare the sculptural programme of the Brihadiswara Temple with that of the Shore Temple at Mamallapuram (c7_hist_ch06_011).', answer: 'The Shore Temple (c',
                  options: ['The Shore Temple (c', 'both have lots of carvings', 'larger version'],
                  hint: 'Revisit c8_hist_ch5_5 for Dravida terms and c7_hist_ch06_003 for Chola political history.',
                  misconception: 'Students often believe the Brihadiswara Temple is simply a "larger version" of earlier Dravida temples like the Shore Temple, differing.' }
          ],
            remediations: { 'the-brihadiswara-temple-is-simply': { steps: ['If the student holds the "just bigger" misconception, guide them through this comparison: (1) Look at the Shore Temple.', '(2) Look at the Brihadiswara plan — note the single massive shrine, double prakara, two storeyed gopurams, axial.', '(3) Read the Thanjavur inscription translation (available in class resources) listing the ramp length for the capstone.', '(4) Ask: "Could the Shore Temple builders have built the hollow vimana core?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_7', difficulty: 'standard',
          question: 'Islamic Architecture in India refers to the distinct building tradition that.',
          hint: 'If stuck, revisit the corbelled arch vs. true arch comparison in c8_hist_ch5_1.',
          misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and.',
          parts: [
                { id: 'a', prompt: 'What structural element, absent in pre-Islamic Indian architecture, was introduced by the Delhi Sultanate builders and became the defining feature.', answer: 'The true arch (voussoir arch with keystone)',
                  options: ['The true arch (voussoir arch with keystone)', 'minaret', 'Islamic style'],
                  hint: 'If stuck, revisit the corbelled arch vs. true arch comparison in c8_hist_ch5_1 (Architecture as Art.',
                  misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and prettier under the.' },
                { id: 'b', prompt: 'Why did early Delhi Sultanate buildings like the Quwwat-ul-Islam Mosque reuse columns and carved stones from demolished Hindu and Jain temples?', answer: 'Because the new rulers lacked skilled craftsmen familiar with stone construction',
                  options: ['Because the new rulers lacked skilled craftsmen familiar with stone construction', 'to humiliate Hindus', 'purely economic', 'Islamic style'],
                  hint: 'If stuck, revisit the corbelled arch vs. true arch comparison in c8_hist_ch5_1 (Architecture as Art.',
                  misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and prettier under the.' },
                { id: 'c', prompt: 'A historian argues that the shift from the Tughlaq period\'s austere, sloping-walled buildings to the Mughal period\'s white marble and pietra dura reflects only.', answer: 'The claim is incomplete',
                  options: ['The claim is incomplete', 'beauty', 'Islamic style'],
                  hint: 'If stuck, revisit the corbelled arch vs. true arch comparison in c8_hist_ch5_1 (Architecture as Art.',
                  misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and prettier under the.' }
          ],
            remediations: { 'delhi-sultanate-and-mughal-architecture': { steps: ['Revisit c8_hist_ch5_5 (Nagara/Dravida temple architecture) to recall how corbelling works — then physically model.', 'Study the Alai Darwaza plan (c8_hist_ch5_8) and identify squinches — compare with a pendentive diagram.', 'List three materials used in Sultanate vs. Mughal buildings (quartzite, grey sandstone, rubble vs.', 'Explain in your own words why the double dome is an *engineering* solution, not just decoration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and.',
          parts: [
                { id: 'a', prompt: 'Some scholars say Mughal architecture is "more Persian" than Sultanate architecture. Assess this view using evidence from building techniques and ornamentation.', answer: 'The view is misleading',
                  options: ['The view is misleading', 'Islamic style'],
                  hint: 'If stuck, revisit the corbelled arch vs. true arch comparison in c8_hist_ch5_1 (Architecture as Art.',
                  misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and prettier under the.' },
                { id: 'b', prompt: 'Design a comparative timeline showing three turning points in Indo-Islamic structural innovation from 1200 to 1650.', answer: 'A strong answer includes: (1) c',
                  options: ['A strong answer includes: (1) c', 'Islamic style'],
                  hint: 'If stuck, revisit the corbelled arch vs. true arch comparison in c8_hist_ch5_1 (Architecture as Art.',
                  misconception: 'Students believe Delhi Sultanate and Mughal architecture are essentially the same "Islamic style" — just bigger and prettier under the.' }
          ],
            remediations: { 'delhi-sultanate-and-mughal-architecture': { steps: ['Revisit c8_hist_ch5_5 (Nagara/Dravida temple architecture) to recall how corbelling works — then physically model.', 'Study the Alai Darwaza plan (c8_hist_ch5_8) and identify squinches — compare with a pendentive diagram.', 'List three materials used in Sultanate vs. Mughal buildings (quartzite, grey sandstone, rubble vs.', 'Explain in your own words why the double dome is an *engineering* solution, not just decoration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_8', difficulty: 'standard',
          question: 'Indo-Islamic architecture (12th-17th centuries) is a synthesis.',
          hint: 'Revisit c7_hist_ch07_008 "Art and Architecture: Indo-Islamic Synthesis" — specifically.',
          misconception: 'Students believe Indo-Islamic architecture is a simple "mixing" of Hindu and Muslim styles — like adding domes.',
          parts: [
                { id: 'a', prompt: 'What is the approximate height of the Qutub Minar, and which three rulers contributed to its construction across different periods?', answer: 'The Qutub Minar stands approximately 73 meters (240 feet) tall',
                  options: ['The Qutub Minar stands approximately 73 meters (240 feet) tall', 'mixing', 'only Aibak, or attributing it entirely to the Mughals'],
                  hint: 'Revisit c7_hist_ch07_008 "Art and Architecture: Indo-Islamic Synthesis" — specifically the section.',
                  misconception: 'Students believe Indo-Islamic architecture is a simple "mixing" of Hindu and Muslim styles — like adding domes to temples.' }
          ],
            remediations: { 'indo-islamic-architecture-is-a': { steps: ['Revisit c7_hist_ch07_008 (Indo-Islamic Synthesis) and identify the three structural elements that define the synthesis.', 'Use a side-by-side diagram of corbelled vs true arch — trace load paths with arrows to see why the true arch allows.', 'At the Qutub complex, locate the Iron Pillar (Gupta, 4th c. CE), the corbelled arches of Quwwat-ul-Islam, and the true.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_9', difficulty: 'standard',
          question: 'Stepwells (vavs in Gujarat, baoris in Rajasthan) are multi-storeyed.',
          hint: 'Revisit c7_hist_ch06_003 (Chalukya/Solanki kingdom) and c7_hist_ch06_007 (Nagara temple.',
          misconception: 'Students often think stepwells are "just fancy wells" or "underground temples" — missing that they are a distinct.',
          parts: [
                { id: 'a', prompt: 'Why did rulers in arid western India invest in elaborate stepwells rather than simple open wells or tanks?', answer: 'Stepwells provided year-round access to receding groundwater through descending',
                  options: ['Stepwells provided year-round access to receding groundwater through descending', 'water storage', 'just fancy wells', 'underground temples'],
                  hint: 'Revisit c7_hist_ch06_003 (Chalukya/Solanki kingdom) and c7_hist_ch06_007 (Nagara temple.',
                  misconception: 'Students often think stepwells are "just fancy wells" or "underground temples" — missing that they are a distinct architectural category.' }
          ],
            remediations: { 'stepwells-are-just-fancy-wells': { steps: ['Show a cross-section diagram of Rani ki Vav (available on UNESCO/ASI websites) — have students label: water table.', 'Compare with a simple open well diagram — list what the stepwell adds (cooling, storage, ritual space, social space).', 'Read a 12th-century Sanskrit inscription from Patan (translated) describing Udayamati\'s merit-making — discuss why.', 'Map stepwell locations against rainfall zones — students see the correlation between aridity and stepwell density.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
