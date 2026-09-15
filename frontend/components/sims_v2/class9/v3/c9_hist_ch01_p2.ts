import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch01_p2: SimDef = {
    id: 'v3_c9_hist_ch01_p2',
    title: 'Understanding Social Science · Part 2/2',
    subtitle: 'Four lenses, one human story',
    classLevel: 9, subject: 'history', topic: 'Understanding Social Science · Part 2/2',
    chapters: ['c9_hist_ch01'],
    nodeIds: ['c9_hist_ch1_6', 'c9_hist_ch1_7', 'c9_hist_ch1_8', 'c9_hist_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior social scientist', intro: 'Standing before the Qutub Minar, \'how do we know?\' is a harder question than \'what happened?\' Meet the four disciplines that dissect society — and why none of them owns a test tube.', goal: 'Understand Social Science as the systematic, interpretive study of society through four disciplines — History, Geography, Political Science, Economics — each with a distinct lens.' },
    discovery: {
        question: 'A chemist can rerun an experiment a hundred times — but a historian can\'t rerun the Battle of Panipat. So is history still a science?',
        options: ['Yes — a different kind: it works systematically from fragmentary evidence and interpretation instead of controlled experiments', 'No — only labs produce science', 'Yes — historians secretly test battles in simulators', 'No — history is just storytelling'],
        answer: 'Yes — a different kind: it works systematically from fragmentary evidence and interpretation instead of controlled experiments',
        hook: 'Social Science isn\'t four unrelated subjects — it\'s four lenses on the same reality. The 1857 Revolt is simultaneously a history question (why then?), a geography question (why there?), a political question (who held power?) and an economics question (what resources were at stake?).',
    },
    teaching: [
        { title: 'Evidence in History: How Historians Interpret the Past', text: 'Historical interpretation is the process by which historians critically examine, corroborate, and contextualise diverse sources—archaeological, textual, oral, and visual—to construct evidence-based.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch1_6', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Put one event — the Permanent Settlement of 1793 — under all four lenses: what an economist asks (incentives, revenue) versus what a historian asks (ideology, experience). Then argue why humans who can change behaviour when studied can\'t be predicted like particles.',
        labels: ['Evidence in History: How', 'Oral Traditions and Literary', 'Governance and Society: Interconnection', 'Timeline and Chronology'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch1_6', title: 'Evidence in History: How Historians Interpret the Past',
          caseStudy: { intro: 'Imagine you visit the Qutub Minar complex in Delhi and see the Iron Pillar standing rust-free for 1600 years.',
            decisions: [{ prompt: 'What is the first step a historian takes when confronted with a new archaeological artefact, such as an undeciphered seal from the Harappan.', options: [
                { text: 'The first step is **source identification and classification**: determining the object\'s', outcome: 'The first step is **source identification and classification**: determining the object\'s material.' },
                { text: 'translating the script immediately', outcome: 'Not quite — Students believe **"primary sources are always true and secondary sources are always.', reveals: 'primary-sources-are-always-true' },
                { text: 'guessing the king\'s name', outcome: 'Not quite — Students believe **"primary sources are always true and secondary sources are always.', reveals: 'primary-sources-are-always-true' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_7', title: 'Oral Traditions and Literary Sources',
          caseStudy: { intro: 'Imagine you hear your grandmother narrate a family story about an ancestor who "fought in a great war" — but the details change each time she tells it.',
            decisions: [{ prompt: 'Name the two broad categories of literary sources for ancient Indian history and give one example of each with its approximate period.', options: [
                { text: 'Religious texts (e.g., Rigveda, c', outcome: 'Religious texts (e.g., Rigveda, c. 1500–1000 BCE) and secular texts (e.g., Arthashastra, c.' },
                { text: 'Vedas and Puranas', outcome: 'Not quite — Students believe "oral tradition" means "unreliable folklore" and "literary source" means "written.', reveals: 'oral-tradition-means-unreliable-folklore' },
                { text: 'religious', outcome: 'Not quite — Students believe "oral tradition" means "unreliable folklore" and "literary source" means "written.', reveals: 'oral-tradition-means-unreliable-folklore' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_8', title: 'Governance and Society: Interconnection of Politics and People',
          caseStudy: { intro: 'Imagine you are visiting the Qutb Minar complex in Delhi. You see the Iron Pillar (Gupta period), the Quwwat-ul-Islam mosque built from dismantled temples.',
            decisions: [{ prompt: 'Name one major administrative measure from the Mauryan, Sultanate, Mughal, or British period that directly altered the social hierarchy.', options: [
                { text: 'Correct answer: Mauryan state monopoly on mines and crafts (Arthashastra) tied artisans', outcome: 'Correct answer: Mauryan state monopoly on mines and crafts (Arthashastra) tied artisans to state.' },
                { text: 'Ashoka\'s Dhamma', outcome: 'Not quite — Students often think "governance affects society" is a one-way top-down process: the state makes.', reveals: 'governance-affects-society-is-a' },
                { text: 'governance affects society', outcome: 'Not quite — Students often think "governance affects society" is a one-way top-down process: the state makes.', reveals: 'governance-affects-society-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Debating whether history counts as a real science, a student argues: \'A chemist can rerun an experiment, but nobody can rerun the Battle of Panipat — so history is just storytelling, not science.\'',
            decisions: [{ prompt: 'Is the experiment test the right yardstick?', options: [
                { text: 'No — social sciences are systematic but interpretive: the past cannot be rerun, so historians build explanations from surviving traces — documents, artefacts, revenue records — tested by logic and critique. Science means disciplined use of evidence, not necessarily repeatable experiments.', outcome: 'This defends the right criterion — rigour with fragmentary evidence — rather than letting the laboratory define all science.' },
                { text: 'The student is right — no lab, no science; history is opinion dressed up as fact.', outcome: 'Interpretive is not arbitrary: claims about the past are still constrained by evidence and open to falsification — different method, not less rigour.', reveals: 'no-lab-no-science' },
                { text: 'History would be a science if historians simply made predictions, like physicists do.', outcome: 'Human agents react to being studied, so deterministic prediction is impossible — social science explains patterns instead of forecasting dates.', reveals: 'science-means-prediction' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Social Science studies people — and people talk back, change their minds, and can\'t be locked in a lab. Its rigour is interpretive: systematic evidence, logical inference, patterned understanding instead of exact prediction.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch1_6', difficulty: 'standard',
          question: 'Historical interpretation is the process by which historians critically.',
          hint: 'Return to c9_hist_ch1_4 and re-do the "OPVL analysis" exercise on any two sources from.',
          misconception: 'Students believe **"primary sources are always true and secondary sources are always biased"**—e.g., they treat.',
          parts: [
                { id: 'a', prompt: 'A textbook claims "The Mauryan empire had a highly centralised bureaucracy" based on the Arthashastra.', answer: 'Seek (1) **Ashokan inscriptions** (rock/pillar edicts)',
                  options: ['Seek (1) **Ashokan inscriptions** (rock/pillar edicts)', 'primary sources are always true and secondary sources are always biased', 'just opinion', '**"primary sources are always true and secondary sources are always biased"**—e'],
                  hint: 'Return to c9_hist_ch1_4 and re-do the "OPVL analysis" exercise on any two sources from your Class 8.',
                  misconception: 'Students believe **"primary sources are always true and secondary sources are always biased"**—e.g., they treat Megasthenes\' *Indica*.' }
          ],
            remediations: { 'primary-sources-are-always-true': { steps: ['**Revisit c9_hist_ch1_4** (Historical Sources: Primary and Secondary): Create a two-column table for *Megasthenes\'.', '*Thapar\'s "Asoka and the Decline of the Mauryas"* listing: (a) author\'s position, (b) access to evidence, (c) purpose.', '**Apply the "triangulation test"** to a familiar event (e.g., 1857 Revolt): compare a British officer\'s diary.', '**Practice source criticism** using the "OPVL" framework (Origin, Purpose, Value, Limitation) on any three sources from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"primary sources are always true and secondary sources are always biased"**—e.g., they treat.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Oral traditions are unreliable for writing history because they change over time." Use the example of the *Vedas* or *Sangam literature*.', answer: 'The claim is **partially true but misleading**',
                  options: ['The claim is **partially true but misleading**', 'primary sources are always true and secondary sources are always biased', 'just opinion', '**"primary sources are always true and secondary sources are always biased"**—e'],
                  hint: 'Return to c9_hist_ch1_4 and re-do the "OPVL analysis" exercise on any two sources from your Class 8.',
                  misconception: 'Students believe **"primary sources are always true and secondary sources are always biased"**—e.g., they treat Megasthenes\' *Indica*.' }
          ],
            remediations: { 'primary-sources-are-always-true': { steps: ['**Revisit c9_hist_ch1_4** (Historical Sources: Primary and Secondary): Create a two-column table for *Megasthenes\'.', '*Thapar\'s "Asoka and the Decline of the Mauryas"* listing: (a) author\'s position, (b) access to evidence, (c) purpose.', '**Apply the "triangulation test"** to a familiar event (e.g., 1857 Revolt): compare a British officer\'s diary.', '**Practice source criticism** using the "OPVL" framework (Origin, Purpose, Value, Limitation) on any three sources from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_7', difficulty: 'standard',
          question: 'Oral traditions are unwritten historical narratives, myths, legends, and.',
          hint: 'Revisit c9_hist_ch1_4 (Historical Sources: Primary and Secondary) and c9_hist_ch1_6.',
          misconception: 'Students believe "oral tradition" means "unreliable folklore" and "literary source" means "written fact," leading them.',
          parts: [
                { id: 'a', prompt: 'Name the two broad categories of literary sources for ancient Indian history and give one example of each with its approximate period of composition.', answer: 'Religious texts (e.g., Rigveda, c',
                  options: ['Religious texts (e.g., Rigveda, c', 'Vedas and Puranas', 'religious', 'oral tradition'],
                  hint: 'Revisit c9_hist_ch1_4 (Historical Sources: Primary and Secondary) and c9_hist_ch1_6 (Evidence.',
                  misconception: 'Students believe "oral tradition" means "unreliable folklore" and "literary source" means "written fact," leading them to dismiss the.' },
                { id: 'b', prompt: 'Why do historians not accept the Puranic genealogical lists (vamshanucharita) as accurate chronological records for the early Vedic period?', answer: 'Puranas were compiled centuries after the events they describe (final form c',
                  options: ['Puranas were compiled centuries after the events they describe (final form c', 'Puranas are religious so they are biased', 'oral tradition', 'unreliable folklore'],
                  hint: 'Revisit c9_hist_ch1_4 (Historical Sources: Primary and Secondary) and c9_hist_ch1_6 (Evidence.',
                  misconception: 'Students believe "oral tradition" means "unreliable folklore" and "literary source" means "written fact," leading them to dismiss the.' }
          ],
            remediations: { 'oral-tradition-means-unreliable-folklore': { steps: ['Take the Rigveda and Arthashastra as a paired case study.', 'List three features of Vedic oral transmission (patha, svara, anuvaka) that ensure fidelity.', 'List three features of Arthashastra transmission (Kautilya attribution, multiple commentaries, rediscovery in 1905).', 'Write one paragraph explaining why "written ≠ more reliable" using this comparison.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_8', difficulty: 'standard',
          question: 'Governance and society represent a dialectical relationship where political.',
          hint: 'If stuck, revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) for the.',
          misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.',
          parts: [
                { id: 'a', prompt: 'Why did Alauddin Khalji\'s market control regulations (fixing grain prices, regulating merchants) provoke resistance not only from traders but also from rural.', answer: 'Correct answer: Price ceilings forced peasants to sell at below-market rates to',
                  options: ['Correct answer: Price ceilings forced peasants to sell at below-market rates to', 'trader greed', 'governance affects society'],
                  hint: 'If stuck, revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) for the *Arthashastra*.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' },
                { id: 'b', prompt: 'Analyse how the Bhakti and Sufi movements (studied in Classes 6–7) simultaneously challenged and accommodated existing political authority.', answer: 'Correct answer: Challenge',
                  options: ['Correct answer: Challenge', 'religious reform', 'governance affects society'],
                  hint: 'If stuck, revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) for the *Arthashastra*.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' }
          ],
            remediations: { 'governance-affects-society-is-a': { steps: ['Revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) and Class 8 node c8_hist_ch1_4 (Khilji Reforms).', 'Read the *Ain-i-Akbari* excerpt on village panchayats (Class 7) noting their judicial and revenue roles independent.', 'Compare with Class 8 node c8_hist_ch3_8 (British Economic Exploitation) — list three ways the Permanent Settlement.', 'Write a 100-word paragraph: "Society as a brake on state power: two pre-colonial and one colonial example."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_9', difficulty: 'standard',
          question: 'Timeline and chronology in historical study refers to the systematic.',
          hint: 'If stuck, revisit c6_history_ch05_009 (Ashoka\'s edicts and regnal years) and practice.',
          misconception: 'Students treat a timeline as a mere *list* of dates to memorize, not as an *analytical instrument*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Timeline and chronology in historical study refers to the systematic arrangement of past',
                  options: ['Timeline and chronology in historical study refers to the systematic arrangement of past', 'Social Science is the systematic study of human society, social relationships, and', 'Bias and perspective in historical interpretation refer to the systematic distortions,', 'The interdisciplinary relationship where geography provides the physical setting'],
                  hint: 'If stuck, revisit c6_history_ch05_009 (Ashoka\'s edicts and regnal years) and practice: "If Ashoka\'s.',
                  misconception: 'Students treat a timeline as a mere *list* of dates to memorize, not as an *analytical instrument*.' }
          ],
            remediations: { 'students-treat-a-timeline-as': { steps: ['Give the student a blank "multi-track timeline" template with four parallel rows labeled Political, Economic, Social.', 'Ask them to plot 10 events from 1700–1760 (e.g., Aurangzeb\'s death, Maratha expansion, Bengal famine 1770, East India.', 'Have them draw vertical lines connecting simultaneous events across tracks.', 'Ask: "Which track changes fastest? Which shows continuity? What does this tell you about \'decline\'?" This forces visual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
