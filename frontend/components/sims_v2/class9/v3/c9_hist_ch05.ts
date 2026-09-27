import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch05 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch05: SimDef = {
    id: 'v3_c9_hist_ch05',
    title: 'India and the World-I: 1900 BCE to 1200 CE',
    subtitle: 'This node covers the archaeological and textual evidence of trade between the Harappan.',
    classLevel: 9, subject: 'history', topic: 'India and the World-I: 1900 BCE to 1200 CE',
    chapters: ['c9_hist_ch05'],
    nodeIds: ['c9_hist_ch5_1', 'c9_hist_ch5_2', 'c9_hist_ch5_3', 'c9_hist_ch5_4', 'c9_hist_ch5_5', 'c9_hist_ch5_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Have you ever seen the Great Bath at Mohenjo-daro in pictures or visited a museum with Harappan artefacts?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Compare the **political vulnerability** of the Uttarapatha (land) vs.',
        options: ['**Land (Uttarapatha):** High vulnerability', 'sea was safer', 'Silk Road'],
        answer: '**Land (Uttarapatha):** High vulnerability',
        hook: 'Students believe the **"Silk Road" was a single, continuous, well-maintained highway** connecting China to Rome.',
    },
    teaching: [
        { title: 'Harappan Contacts with Mesopotamia', text: 'Harappan Contacts with Mesopotamia refers to the trade and cultural exchange between the Indus Valley Civilisation (Harappan) and Mesopotamian civilisations (Sumer, Akkad, Babylon) during the Bronze.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch5_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['Harappan Contacts with Mesopotamia', 'Ancient Trade Routes: Land', 'The Silk Road', 'Indian Ocean Trade', 'Spread of Indian Culture', 'Knowledge Exchange: Astronomy, Mathematics'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch5_2', title: 'Ancient Trade Routes: Land and Sea',
          caseStudy: { intro: 'Start by asking: "Have you seen the ancient port ruins at Lothal (Gujarat) or the caravan sarais near Taxila in textbooks or on a school trip?',
            decisions: [{ prompt: 'Name the two principal *overland* arterial routes in ancient India mentioned in texts like the Arthashastra and Buddhist Jatakas that.', options: [
                { text: 'The two principal overland arterial routes are the **Uttarapatha** (Northern Highway:', outcome: 'The two principal overland arterial routes are the **Uttarapatha** (Northern Highway: Taxila →.' },
                { text: 'Silk Road', outcome: 'Not quite — Students believe the **"Silk Road" was a single, continuous, well-maintained highway** connecting.', reveals: 'the-silk-road-was-a' },
                { text: 'Grand Trunk Road', outcome: 'Not quite — Students believe the **"Silk Road" was a single, continuous, well-maintained highway** connecting.', reveals: 'the-silk-road-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch5_3', title: 'The Silk Road and Cultural Exchange',
          caseStudy: { intro: 'Think about the last time you ate a samosa or saw a Buddha statue—how did these come to be part of Indian life?',
            decisions: [{ prompt: 'What is the approximate time period when the Silk Road was most active for Indian cultural exchange?', options: [
                { text: 'The Silk Road was most active for Indian cultural exchange from around 200 BCE to 1200 CE', outcome: 'The Silk Road was most active for Indian cultural exchange from around 200 BCE to 1200 CE.' },
                { text: 'only during the Gupta Empire', outcome: 'Not quite — Students often think the Silk Road was primarily a route for Chinese silk to reach Rome.', reveals: 'the-silk-road-was-primarily' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch5_4', title: 'Indian Ocean Trade and Roman Contacts',
          caseStudy: { intro: 'Have you seen pictures of ancient Roman gold coins found in South Indian archaeological sites like Arikamedu?',
            decisions: [{ prompt: 'What time period saw the peak of direct maritime trade between India and the Roman Empire?', options: [
                { text: 'The peak of direct maritime trade between India and the Roman Empire occurred from the', outcome: 'The peak of direct maritime trade between India and the Roman Empire occurred from the 1st century.' },
                { text: 'during the Mughal period', outcome: 'Not quite — Students often think that Roman trade with India was conducted through intermediaries like Arab.', reveals: 'roman-trade-with-india-was' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch5_5', title: 'Spread of Indian Culture to Southeast Asia',
          caseStudy: { intro: 'Think about the Borobudur temple in Indonesia, which many students might have seen in pictures or studied - it looks like an Indian Buddhist monument but.',
            decisions: [{ prompt: 'What is the approximate time period during which Indian culture spread to Southeast Asia through peaceful means?', options: [
                { text: 'Approximately 200 BCE to 1200 CE', outcome: 'Approximately 200 BCE to 1200 CE. A wrong answer like "during the Mughal period" reveals the.' },
                { text: 'during the Mughal period', outcome: 'Not quite — Students often believe that Indian kings like the Cholas or Pallavas militarily conquered Southeast.', reveals: 'indian-kings-like-the-cholas' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch5_6', title: 'Knowledge Exchange: Astronomy, Mathematics and Medicine',
          caseStudy: { intro: 'Think about the iron pillar near Qutub Minar in Delhi—it hasn’t rusted in 1600 years. How did ancient Indians know such metallurgy?',
            decisions: [{ prompt: 'What mathematical concept, originating in India, was transmitted to the Arab world and later to Europe, revolutionizing calculation.', options: [
                { text: 'B) Zero and the decimal system', outcome: 'B) Zero and the decimal system. If a student chooses A) Geometry, they confuse Indian contributions.' },
                { text: 'knowledge exchange in ancient India was primarily religious (e', outcome: 'Not quite — Students often believe that knowledge exchange in ancient India was primarily religious (e.g.', reveals: 'knowledge-exchange-in-ancient-india' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch5_6', title: 'You made it',
          caseStudy: { intro: 'You finished India and the World-I: 1900 BCE to 1200 CE — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch5_1', difficulty: 'standard',
          question: 'Harappan Contacts with Mesopotamia refers to the trade and cultural exchange.',
          hint: 'If stuck, revisit the Harappan chapter on \'Harappan Life: Food, Crafts, Trade\'.',
          misconception: 'Students often think that Harappan-Mesopotamian contact was primarily driven by Harappan rulers sending gifts or envoys.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Harappan Contacts with Mesopotamia refers to the trade and cultural exchange between the',
                  options: ['Harappan Contacts with Mesopotamia refers to the trade and cultural exchange between the', 'Ancient Trade Routes (Land and Sea) refers to the interconnected network of overland', 'The Silk Road was a network of overland trade routes connecting China to the', 'Indian Ocean Trade and Roman Contacts refers to the maritime exchange network between'],
                  hint: 'If stuck, revisit the Harappan chapter on \'Harappan Life: Food, Crafts, Trade\'.',
                  misconception: 'Students often think that Harappan-Mesopotamian contact was primarily driven by Harappan rulers sending gifts or envoys on diplomatic.' }
          ],
            remediations: { 'harappan-mesopotamian-contact-was-primarily': { steps: ['To correct this, examine the nature of the goods traded: carnelian beads were mass-produced in Harappan workshops.', 'Compare this to later diplomatic exchanges (e.g., Ashoka’s edicts mentioning gifts to Hellenic kings) where luxury and.', 'Use a map showing Harappan coastal sites like Lothal and Mesopotamian ports like Ur to discuss how sea routes enabled.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch5_2', difficulty: 'standard',
          question: 'Ancient Trade Routes (Land and Sea) refers to the interconnected network.',
          hint: 'Revisit **c7_hist_ch01_009 (Mahajanapada Trade)** for the land route political economy.',
          misconception: 'Students believe the **"Silk Road" was a single, continuous, well-maintained highway** connecting China to Rome.',
          parts: [
                { id: 'a', prompt: 'Compare the **political vulnerability** of the Uttarapatha (land) vs.', answer: '**Land (Uttarapatha):** High vulnerability',
                  options: ['**Land (Uttarapatha):** High vulnerability', 'sea was safer', 'Silk Road'],
                  hint: 'Revisit **c7_hist_ch01_009 (Mahajanapada Trade)** for the land route political economy and.',
                  misconception: 'Students believe the **"Silk Road" was a single, continuous, well-maintained highway** connecting China to Rome throughout this period, and.' }
          ],
            remediations: { 'the-silk-road-was-a': { steps: ['** Have the student draw a **map from memory** showing the Silk Road as *one line* vs.', '** Use the **Periplus of the Erythraean Sea (1st c. CE)** — a primary source — to list *actual cargoes* at Indian ports.', '** Compare **transport costs**: calculate rough cost to move 1 ton of pepper 3,000 km by camel (camels, feed, guards, 6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch5_3', difficulty: 'standard',
          question: 'The Silk Road was a network of overland trade routes connecting China to the.',
          hint: 'If stuck, revisit the Mauryan period and Ashoka’s role in sending Buddhist missionaries.',
          misconception: 'Students often think the Silk Road was primarily a route for Chinese silk to reach Rome, overlooking India’s role.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Silk Road was a network of overland trade routes connecting China to the',
                  options: ['The Silk Road was a network of overland trade routes connecting China to the', 'Harappan Contacts with Mesopotamia refers to the trade and cultural exchange between the', 'Ancient Trade Routes (Land and Sea) refers to the interconnected network of overland', 'Indian Ocean Trade and Roman Contacts refers to the maritime exchange network between'],
                  hint: 'If stuck, revisit the Mauryan period and Ashoka’s role in sending Buddhist missionaries to Sri.',
                  misconception: 'Students often think the Silk Road was primarily a route for Chinese silk to reach Rome, overlooking India’s role as both a major exporter.' }
          ],
            remediations: { 'the-silk-road-was-primarily': { steps: ['To fix this, map out archaeological evidence: show students coins of Kushana kings found in China bearing Buddhist.', 'Have them trace Bodhidharma’s journey from Kanchipuram to China on a map, emphasizing that ideas flowed both ways—this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch5_4', difficulty: 'standard',
          question: 'Indian Ocean Trade and Roman Contacts refers to the maritime exchange network.',
          hint: 'If stuck, revisit the Silk Road node (c9_hist_ch5_3) which explains how monsoon winds.',
          misconception: 'Students often think that Roman trade with India was conducted through intermediaries like Arab traders who controlled.',
          parts: [
                { id: 'a', prompt: 'Why did Indian traders benefit from knowing the monsoon wind patterns for their trade with Rome?', answer: 'Indian traders benefited from monsoon knowledge',
                  options: ['Indian traders benefited from monsoon knowledge', 'to avoid pirates'],
                  hint: 'If stuck, revisit the Silk Road node (c9_hist_ch5_3) which explains how monsoon winds were used for.',
                  misconception: 'Students often think that Roman trade with India was conducted through intermediaries like Arab traders who controlled the sea routes.' }
          ],
            remediations: { 'roman-trade-with-india-was': { steps: ['To fix this misconception, examine a map showing monsoon wind patterns and overlay it with known Roman and Indian port.', 'Then, read an excerpt from the Periplus of the Erythraean Sea describing an Indian sailor guiding a Roman trader from.', 'Finally, compare this with the absence of any mention of Arab-controlled chokepoints in the Red Sea or Indian Ocean.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch5_5', difficulty: 'standard',
          question: 'The Spread of Indian Culture to Southeast Asia refers to the transmission.',
          hint: 'Review the Indian Ocean trade routes node (c9_hist_ch5_4) to understand the geographical.',
          misconception: 'Students often believe that Indian kings like the Cholas or Pallavas militarily conquered Southeast Asian territories.',
          parts: [
                { id: 'a', prompt: 'What is the approximate time period during which Indian culture spread to Southeast Asia through peaceful means?', answer: 'Approximately 200 BCE to 1200 CE',
                  options: ['Approximately 200 BCE to 1200 CE', 'during the Mughal period'],
                  hint: 'Review the Indian Ocean trade routes node (c9_hist_ch5_4) to understand the geographical and.',
                  misconception: 'Students often believe that Indian kings like the Cholas or Pallavas militarily conquered Southeast Asian territories to spread culture.' }
          ],
            remediations: { 'indian-kings-like-the-cholas': { steps: ['To fix this misconception, students should examine the Kudamuku inscription from Bali (9th century) which describes.', 'Comparing a map of Chola naval raids (showing brief coastal attacks) with the widespread distribution of Indian-style.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch5_6', difficulty: 'standard',
          question: 'Knowledge Exchange: Astronomy, Mathematics and Medicine refers to the.',
          hint: 'If stuck, revisit the Gupta Empire’s contributions (c7_hist_ch04_006) to recall what.',
          misconception: 'Students often believe that knowledge exchange in ancient India was primarily religious (e.g., Buddhism spreading) and.',
          parts: [
                { id: 'a', prompt: 'What mathematical concept, originating in India, was transmitted to the Arab world and later to Europe, revolutionizing calculation methods?', answer: 'B) Zero and the decimal system',
                  options: ['B) Zero and the decimal system', 'knowledge exchange in ancient India was primarily religious (e'],
                  hint: 'If stuck, revisit the Gupta Empire’s contributions (c7_hist_ch04_006) to recall what Indian.',
                  misconception: 'Students often believe that knowledge exchange in ancient India was primarily religious (e.g., Buddhism spreading) and that scientific.' },
                { id: 'b', prompt: 'Why did Indian astronomers like Aryabhata reject the prevailing geocentric model of Greek astronomy, despite knowing about it through exchanges?', answer: 'B) Their own observations of planetary motion supported a heliocentric idea',
                  options: ['B) Their own observations of planetary motion supported a heliocentric idea', 'knowledge exchange in ancient India was primarily religious (e'],
                  hint: 'If stuck, revisit the Gupta Empire’s contributions (c7_hist_ch04_006) to recall what Indian.',
                  misconception: 'Students often believe that knowledge exchange in ancient India was primarily religious (e.g., Buddhism spreading) and that scientific.' }
          ],
            remediations: { 'knowledge-exchange-in-ancient-india': { steps: ['To fix this, have students compare two passages: one from Aryabhata’s Aryabhatiya (describing trigonometric.', 'Ask: “What does each scholar credit the other for?” Then, use a map showing Baghdad, Nalanda, and Ujjain as nodes in.', 'This shows concrete inflow (Greek/Persian → India) alongside outflow (India → Arab world), breaking the one-way myth.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that knowledge exchange in ancient India was primarily religious (e.g., Buddhism spreading) and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: “The spread of Ayurveda to Southeast Asia was primarily due to Indian merchants, not scholars or monks.” Is this claim justified?', answer: 'C) Partly yes—merchants introduced basics, but monks adapted it locally',
                  options: ['C) Partly yes—merchants introduced basics, but monks adapted it locally', 'knowledge exchange in ancient India was primarily religious (e'],
                  hint: 'If stuck, revisit the Gupta Empire’s contributions (c7_hist_ch04_006) to recall what Indian.',
                  misconception: 'Students often believe that knowledge exchange in ancient India was primarily religious (e.g., Buddhism spreading) and that scientific.' }
          ],
            remediations: { 'knowledge-exchange-in-ancient-india': { steps: ['To fix this, have students compare two passages: one from Aryabhata’s Aryabhatiya (describing trigonometric.', 'Ask: “What does each scholar credit the other for?” Then, use a map showing Baghdad, Nalanda, and Ujjain as nodes in.', 'This shows concrete inflow (Greek/Persian → India) alongside outflow (India → Arab world), breaking the one-way myth.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
