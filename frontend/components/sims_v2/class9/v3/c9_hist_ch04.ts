import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch04 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch04: SimDef = {
    id: 'v3_c9_hist_ch04',
    title: 'Resistance and Resilience: 1000 CE to 1700 CE',
    subtitle: 'Covers the Ghaznavid raids (Mahmud of Ghazni, 1000–1027 CE) and Ghurid conquests.',
    classLevel: 9, subject: 'history', topic: 'Resistance and Resilience: 1000 CE to 1700 CE',
    chapters: ['c9_hist_ch04'],
    nodeIds: ['c9_hist_ch4_1', 'c9_hist_ch4_2', 'c9_hist_ch4_3', 'c9_hist_ch4_4', 'c9_hist_ch4_5', 'c9_hist_ch4_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Start by asking: "Have you visited the Qutub Minar or seen pictures of the Iron Pillar in Delhi?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Why did Mahmud of Ghazni target temples like Somnath during his raids, and what does this reveal about his primary objective?',
        options: ['Mahmud targeted temples', 'to spread Islam', 'to destroy Hindu culture'],
        answer: 'Mahmud targeted temples',
        hook: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste".',
    },
    teaching: [
        { title: 'Invasions and Regional Powers: 1000-1200 CE', text: 'The period 1000–1200 CE marks the transition from early medieval regional kingdoms to the establishment of Turkic rule in North India, characterized by repeated invasions from Central Asia (Ghaznavid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch4_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['Invasions and Regional Powers', 'The Delhi Sultanate: Conquest', 'Regional Resistance: Vijayanagara', 'The Mughal Empire: Expansion', 'Bhakti and Sufi Movements', 'Maratha and Rajput Resistance'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch4_1', title: 'Invasions and Regional Powers: 1000-1200 CE',
          caseStudy: { intro: 'Start by asking: "Have you visited the Qutub Minar or seen pictures of the Iron Pillar in Delhi?',
            decisions: [{ prompt: 'In which year did the Second Battle of Tarain take place, and which two rulers were the main opponents?', options: [
                { text: 'The Second Battle of Tarain was fought in 1192 CE between Prithviraj Chauhan (Chahamana', outcome: 'The Second Battle of Tarain was fought in 1192 CE between Prithviraj Chauhan (Chahamana ruler.' },
                { text: 'divided by caste', outcome: 'Not quite — Students believe the Turkic invasions succeeded because Indian armies were militarily backward.', reveals: 'the-turkic-invasions-succeeded-because' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch4_2', title: 'The Delhi Sultanate: Conquest and Consolidation',
          caseStudy: { intro: 'Start by asking: "You’ve visited the Qutub Minar — who built it and why does it still stand after 800 years?" Connect this to the Mamluk dynasty’s need.',
            decisions: [{ prompt: 'Name the five dynasties of the Delhi Sultanate in correct chronological order.', options: [
                { text: 'Mamluk (Slave) → Khalji → Tughlaq → Sayyid → Lodi', outcome: 'Mamluk (Slave) → Khalji → Tughlaq → Sayyid → Lodi. A wrong sequence (e.g., placing Khalji before.' },
                { text: 'pro-poor welfare measures', outcome: 'Not quite — Students believe Alauddin Khalji’s market reforms were "pro-poor welfare measures" because prices.', reveals: 'alauddin-khalji-s-market-reforms' },
                { text: 'price control', outcome: 'Not quite — Students believe Alauddin Khalji’s market reforms were "pro-poor welfare measures" because prices.', reveals: 'alauddin-khalji-s-market-reforms' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch4_3', title: 'Regional Resistance: Vijayanagara and the Deccan',
          caseStudy: { intro: 'Have you seen pictures of the stone chariot at Hampi or heard stories about grand temples with musical pillars?',
            decisions: [{ prompt: 'In which year was the Vijayanagara Empire founded, and by whom?', options: [
                { text: 'The Vijayanagara Empire was founded in 1336 CE by Harihara I and Bukka Raya I', outcome: 'The Vijayanagara Empire was founded in 1336 CE by Harihara I and Bukka Raya I.' },
                { text: '1326 CE', outcome: 'Not quite — Students often think the Vijayanagara Empire collapsed immediately after the Battle of Talikota.', reveals: 'the-vijayanagara-empire-collapsed-immediately' },
                { text: 'founded by Krishnadevaraya', outcome: 'Not quite — Students often think the Vijayanagara Empire collapsed immediately after the Battle of Talikota.', reveals: 'the-vijayanagara-empire-collapsed-immediately' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch4_4', title: 'The Mughal Empire: Expansion and Administration',
          caseStudy: { intro: 'Think about the Qutub Minar—you’ve likely seen it or heard of it as a tall tower in Delhi.',
            decisions: [{ prompt: 'What was the primary administrative innovation introduced by Akbar to integrate regional rulers like the Rajputs into the Mughal Empire?', options: [
                { text: 'Akbar introduced the mansabdari system', outcome: 'Akbar introduced the mansabdari system, which assigned ranks (zat and sawar) to officials and.' },
                { text: 'Akbar forced Rajputs to convert to Islam', outcome: 'Not quite — Students often believe the Mughal Empire expanded solely through military conquest and that.', reveals: 'the-mughal-empire-expanded-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch4_5', title: 'Bhakti and Sufi Movements as Social Resistance',
          caseStudy: { intro: 'Imagine you\'ve visited a dargah like Nizamuddin Auliya\'s in Delhi where people of all religions tie threads for wishes, or heard a bhajan sung by a low-caste.',
            decisions: [{ prompt: 'What language did Bhakti and Sufi saints primarily use to reach common people, and why was this significant for social resistance?', options: [
                { text: 'Bhakti and Sufi saints used local vernacular languages like Hindi, Punjabi, Bengali, and', outcome: 'Bhakti and Sufi saints used local vernacular languages like Hindi, Punjabi, Bengali, and Urdu.' },
                { text: 'they used Sanskrit to preserve tradition', outcome: 'Not quite — Students often think Bhakti and Sufi movements were primarily religious reforms aimed at purifying.', reveals: 'bhakti-and-sufi-movements-were' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch4_6', title: 'You made it',
          caseStudy: { intro: 'You finished Resistance and Resilience: 1000 CE to 1700 CE — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch4_1', difficulty: 'standard',
          question: 'The period 1000–1200 CE marks the transition from early medieval regional.',
          hint: 'Revisit c7_hist_ch07_003 — focus on the "Rajput polity" section: draw a diagram showing.',
          misconception: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste".',
          parts: [
                { id: 'a', prompt: 'Why did Mahmud of Ghazni target temples like Somnath during his raids, and what does this reveal about his primary objective?', answer: 'Mahmud targeted temples',
                  options: ['Mahmud targeted temples', 'to spread Islam', 'to destroy Hindu culture', 'divided by caste'],
                  hint: 'Revisit c7_hist_ch07_003 — focus on the "Rajput polity" section: draw a diagram showing a paramount.',
                  misconception: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste" — but the Rajputs had.' },
                { id: 'b', prompt: 'Compare the military organization of the Ghurid army under Muhammad Ghori with that of a typical Rajput confederacy.', answer: 'The Ghurid army had a centralized command with a standing professional core',
                  options: ['The Ghurid army had a centralized command with a standing professional core', 'Rajputs had better weapons', 'divided by caste'],
                  hint: 'Revisit c7_hist_ch07_003 — focus on the "Rajput polity" section: draw a diagram showing a paramount.',
                  misconception: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste" — but the Rajputs had.' }
          ],
            remediations: { 'the-turkic-invasions-succeeded-because': { steps: ['Revisit c7_hist_ch07_003 (Rajput Kingdoms) and map the major Rajput clans c.', 'Compare with c7_hist_ch07_002 (Turkic Invasions) — plot Mahmud’s raid routes vs.', 'Write a 3-sentence explanation: "The Rajputs fought each other for ___; the Ghurids exploited this by ___."', 'Attempt Diagnostic Question 4 again.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch4_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The establishment of the Delhi Sultanate was inevitable after Mahmud of Ghazni’s raids." Support your judgment with two pieces.', answer: 'The statement is **not fully supported**',
                  options: ['The statement is **not fully supported**', 'divided by caste'],
                  hint: 'Revisit c7_hist_ch07_003 — focus on the "Rajput polity" section: draw a diagram showing a paramount.',
                  misconception: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste" — but the Rajputs had.' },
                { id: 'b', prompt: 'Construct a 5-event annotated timeline (with years and significance) showing the transition from Ghaznavid raids to the foundation of the Delhi Sultanate.', answer: 'A strong answer includes: (1) 1001 – First raid of Mahmud',
                  options: ['A strong answer includes: (1) 1001 – First raid of Mahmud', 'divided by caste'],
                  hint: 'Revisit c7_hist_ch07_003 — focus on the "Rajput polity" section: draw a diagram showing a paramount.',
                  misconception: 'Students believe the Turkic invasions succeeded because Indian armies were militarily backward or "divided by caste" — but the Rajputs had.' }
          ],
            remediations: { 'the-turkic-invasions-succeeded-because': { steps: ['Revisit c7_hist_ch07_003 (Rajput Kingdoms) and map the major Rajput clans c.', 'Compare with c7_hist_ch07_002 (Turkic Invasions) — plot Mahmud’s raid routes vs.', 'Write a 3-sentence explanation: "The Rajputs fought each other for ___; the Ghurids exploited this by ___."', 'Attempt Diagnostic Question 4 again.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch4_2', difficulty: 'standard',
          question: 'The Delhi Sultanate (1206–1526 CE) refers to the sequence of five Turkish and.',
          hint: 'Revisit c6_history_ch07_023 (Administration Under the Delhi Sultanate) and c8_hist_ch1_3.',
          misconception: 'Students believe Alauddin Khalji’s market reforms were "pro-poor welfare measures" because prices were fixed low.',
          parts: [
                { id: 'a', prompt: 'Name the five dynasties of the Delhi Sultanate in correct chronological order.', answer: 'Mamluk (Slave) → Khalji → Tughlaq → Sayyid → Lodi',
                  options: ['Mamluk (Slave) → Khalji → Tughlaq → Sayyid → Lodi', 'pro-poor welfare measures', 'price control'],
                  hint: 'Revisit c6_history_ch07_023 (Administration Under the Delhi Sultanate) and c8_hist_ch1_3 (Mamluk.',
                  misconception: 'Students believe Alauddin Khalji’s market reforms were "pro-poor welfare measures" because prices were fixed low.' }
          ],
            remediations: { 'alauddin-khalji-s-market-reforms': { steps: ['Show Alauddin’s revenue demand (kharaj at 50%) alongside the fixed grain prices — calculate the real income loss for.', 'Read Barani’s Tarikh-i-Firuz Shahi excerpt describing village headmen selling wives/children to pay revenue.', 'Compare with British land revenue later (Ryotwari) to see the same logic: state fixes revenue, not prices, to extract.', 'Rewrite the misconception as: "Alauddin fixed prices to subsidise his army, not to help peasants."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch4_3', difficulty: 'standard',
          question: 'The Vijayanagara Empire (1336–1646 CE) was a Hindu kingdom founded by Harihara.',
          hint: 'If stuck, revisit c9_hist_ch4_2 (The Delhi Sultanate: Conquest and Consolidation).',
          misconception: 'Students often think the Vijayanagara Empire collapsed immediately after the Battle of Talikota in 1565 due to total.',
          parts: [
                { id: 'a', prompt: 'In which year was the Vijayanagara Empire founded, and by whom?', answer: 'The Vijayanagara Empire was founded in 1336 CE by Harihara I and Bukka Raya I',
                  options: ['The Vijayanagara Empire was founded in 1336 CE by Harihara I and Bukka Raya I', '1326 CE', 'founded by Krishnadevaraya'],
                  hint: 'If stuck, revisit c9_hist_ch4_2 (The Delhi Sultanate: Conquest and Consolidation) to review how.',
                  misconception: 'Students often think the Vijayanagara Empire collapsed immediately after the Battle of Talikota in 1565 due to total military defeat.' }
          ],
            remediations: { 'the-vijayanagara-empire-collapsed-immediately': { steps: ['To fix this, show students a map of Vijayanagara’s shifting capitals (Hampi → Penukonda → Chandragiri) and have them.', 'Then, contrast this with the abrupt end of Tughlaq rule in the Deccan after 1347 to highlight how Vijayanagara’s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch4_4', difficulty: 'standard',
          question: 'The Mughal Empire’s expansion and administration (1526–1707) refers to the.',
          hint: 'If stuck, review the mansabdari system’s zat and sawar ranks and how jagir assignments.',
          misconception: 'Students often believe the Mughal Empire expanded solely through military conquest and that administration was.',
          parts: [
                { id: 'a', prompt: 'What was the primary administrative innovation introduced by Akbar to integrate regional rulers like the Rajputs into the Mughal Empire?', answer: 'Akbar introduced the mansabdari system',
                  options: ['Akbar introduced the mansabdari system', 'Akbar forced Rajputs to convert to Islam'],
                  hint: 'If stuck, review the mansabdari system’s zat and sawar ranks and how jagir assignments were.',
                  misconception: 'Students often believe the Mughal Empire expanded solely through military conquest and that administration was a secondary concern.' },
                { id: 'b', prompt: 'Compare the Mughal and Delhi Sultanate approaches to governing conquered territories.', answer: 'The Delhi Sultanate often left local rulers in place as tributaries with minimal',
                  options: ['The Delhi Sultanate often left local rulers in place as tributaries with minimal', 'Both systems used tax farming equally'],
                  hint: 'If stuck, review the mansabdari system’s zat and sawar ranks and how jagir assignments were.',
                  misconception: 'Students often believe the Mughal Empire expanded solely through military conquest and that administration was a secondary concern.' }
          ],
            remediations: { 'the-mughal-empire-expanded-solely': { steps: ['To fix this, use a map of Aurangzeb’s Deccan campaigns (1680–1705) alongside a table showing mansabdar appointments and.', 'Ask: “If Aurangzeb only relied on conquest, why did he keep transferring mansabdars like Raja Jai Singh and sending.', 'This contrast shows that Mughal durability came from bureaucratic follow-through, not just battlefield success.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch4_5', difficulty: 'standard',
          question: 'The Bhakti and Sufi movements were social resistance movements from the 14th.',
          hint: 'If stuck, review the Class 6 nodes on Bhakti and Sufi movements (c6_history_ch06_016 and.',
          misconception: 'Students often think Bhakti and Sufi movements were primarily religious reforms aimed at purifying Hinduism or Islam.',
          parts: [
                { id: 'a', prompt: 'Why did orthodox religious authorities often oppose Bhakti and Sufi saints, despite their focus on devotion to God?', answer: 'Orthodox authorities opposed Bhakti and Sufi saints',
                  options: ['Orthodox authorities opposed Bhakti and Sufi saints', 'being too mystical'],
                  hint: 'If stuck, review the Class 6 nodes on Bhakti and Sufi movements (c6_history_ch06_016 and.',
                  misconception: 'Students often think Bhakti and Sufi movements were primarily religious reforms aimed at purifying Hinduism or Islam, missing that their.' }
          ],
            remediations: { 'bhakti-and-sufi-movements-were': { steps: ['To fix this, analyze Ravidas\'s poem "Begin Begumpura" where he describes a city without caste or sorrow—have students.', 'Compare it to orthodox texts like Manusmriti that fix caste by birth.', 'Then, examine a painting of Guru Nanak sharing langar with Hindus and Muslims, asking: What social rule is being broken.', 'This shifts focus from "what they believed" to "what they did to resist hierarchy," using textual and visual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch4_6', difficulty: 'standard',
          question: 'Maratha and Rajput resistance under Shivaji refers to the military and.',
          hint: 'Review the Mughal administration and Deccan policies from c9_hist_ch4_4, focusing.',
          misconception: 'Students often believe Shivaji’s resistance was primarily driven by religious zeal to establish a Hindu kingdom against.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maratha and Rajput resistance under Shivaji refers to the military and administrative',
                  options: ['Maratha and Rajput resistance under Shivaji refers to the military and administrative', 'The period 1000–1200 CE marks the transition from early medieval regional kingdoms to the', 'The Delhi Sultanate (1206–1526 CE) refers to the sequence of five Turkish and Afghan', 'The Vijayanagara Empire (1336–1646 CE) was a Hindu kingdom founded by Harihara I and'],
                  hint: 'Review the Mughal administration and Deccan policies from c9_hist_ch4_4, focusing on Aurangzeb’s.',
                  misconception: 'Students often believe Shivaji’s resistance was primarily driven by religious zeal to establish a Hindu kingdom against Muslim Mughals.' }
          ],
            remediations: { 'shivaji-s-resistance-was-primarily': { steps: ['To fix this, compare Shivaji’s seal (which used Sanskrit but respected all faiths) with Aurangzeb’s reimposition.', 'Use a primary source like the Rajvyavaharakosh to show administrative terms were Sanskritized for clarity, not.', 'Then map his alliances—like with Muslim Adilshahi generals early on—to prove resistance was anti-hegemony, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
