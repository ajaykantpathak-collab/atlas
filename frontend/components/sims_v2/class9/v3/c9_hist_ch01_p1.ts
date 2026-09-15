import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch01_p1: SimDef = {
    id: 'v3_c9_hist_ch01_p1',
    title: 'Understanding Social Science · Part 1/2',
    subtitle: 'Four lenses, one human story',
    classLevel: 9, subject: 'history', topic: 'Understanding Social Science · Part 1/2',
    chapters: ['c9_hist_ch01'],
    nodeIds: ['c9_hist_ch1_1', 'c9_hist_ch1_10', 'c9_hist_ch1_2', 'c9_hist_ch1_3', 'c9_hist_ch1_4', 'c9_hist_ch1_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior social scientist', intro: 'Standing before the Qutub Minar, \'how do we know?\' is a harder question than \'what happened?\' Meet the four disciplines that dissect society — and why none of them owns a test tube.', goal: 'Understand Social Science as the systematic, interpretive study of society through four disciplines — History, Geography, Political Science, Economics — each with a distinct lens.' },
    discovery: {
        question: 'A chemist can rerun an experiment a hundred times — but a historian can\'t rerun the Battle of Panipat. So is history still a science?',
        options: ['Yes — a different kind: it works systematically from fragmentary evidence and interpretation instead of controlled experiments', 'No — only labs produce science', 'Yes — historians secretly test battles in simulators', 'No — history is just storytelling'],
        answer: 'Yes — a different kind: it works systematically from fragmentary evidence and interpretation instead of controlled experiments',
        hook: 'Social Science isn\'t four unrelated subjects — it\'s four lenses on the same reality. The 1857 Revolt is simultaneously a history question (why then?), a geography question (why there?), a political question (who held power?) and an economics question (what resources were at stake?).',
    },
    teaching: [
        { title: 'Social Science: Definition and Disciplinary Scope', text: 'Social Science is the systematic study of human society, social relationships, and institutions through disciplined inquiry using evidence, interpretation, and theoretical frameworks; it encompasses.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch1_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Put one event — the Permanent Settlement of 1793 — under all four lenses: what an economist asks (incentives, revenue) versus what a historian asks (ideology, experience). Then argue why humans who can change behaviour when studied can\'t be predicted like particles.',
        labels: ['Social Science: Definition', 'Bias and Perspective', 'Relationship Between Geography, History', 'Economics as a Social', 'Historical Sources: Primary', 'Archaeological Sources: Artefacts'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch1_1', title: 'Social Science: Definition and Disciplinary Scope',
          caseStudy: { intro: 'Imagine you visit the Qutub Minar and wonder: "How do we really know who built this, why they built it, and what life was like then?" Your history textbook.',
            decisions: [{ prompt: 'What are the four core disciplines of Social Science as taught in the Class 9 curriculum, and what is the distinct focus of each?', options: [
                { text: 'The four core disciplines are: History (study of human societies in time/change over', outcome: 'The four core disciplines are: History (study of human societies in time/change over time).' },
                { text: 'Civics', outcome: 'Not quite — Students often think "Social Science = History + Geography + Civics + Economics" as four *separate.', reveals: 'social-science-history-geography-civics' },
                { text: 'Sociology', outcome: 'Not quite — Students often think "Social Science = History + Geography + Civics + Economics" as four *separate.', reveals: 'social-science-history-geography-civics' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_10', title: 'Bias and Perspective in Historical Interpretation',
          caseStudy: { intro: 'Imagine two students describing the same school fight. Student A (the winner\'s friend) says: "He defended himself bravely." Student B (the loser\'s friend).',
            decisions: [{ prompt: 'Define "authorial bias" and give one example from a historical source.', options: [
                { text: 'Authorial bias is the distortion in a historical account caused by the author\'s own', outcome: 'Authorial bias is the distortion in a historical account caused by the author\'s own position.' },
                { text: 'bias means lying', outcome: 'Not quite — Students think "biased" means "false" and therefore discard biased sources.', reveals: 'biased-means-false-and-therefore' },
                { text: 'biased', outcome: 'Not quite — Students think "biased" means "false" and therefore discard biased sources.', reveals: 'biased-means-false-and-therefore' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_2', title: 'Relationship Between Geography, History and Political Science',
          caseStudy: { intro: 'Imagine you are standing at the Qutub Minar in Delhi. Ask: "Why did so many rulers choose this exact spot for their capital?" Begin by identifying the.',
            decisions: [{ prompt: 'Name one major geographical feature of the Indian subcontinent that acted as a natural barrier against invasions from the northwest, and.', options: [
                { text: 'The Hindu Kush and Himalayan mountain ranges acted as natural barriers', outcome: 'The Hindu Kush and Himalayan mountain ranges acted as natural barriers; the Mauryan Empire.' },
                { text: 'geography determines history', outcome: 'Not quite — Students often believe "geography determines history" (geographical determinism), thinking that.', reveals: 'geography-determines-history-geographical-determ' },
                { text: 'the Thar Desert or the Indian Ocean', outcome: 'Not quite — Students often believe "geography determines history" (geographical determinism), thinking that.', reveals: 'geography-determines-history-geographical-determ' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_3', title: 'Economics as a Social Science Discipline',
          caseStudy: { intro: 'Imagine you are standing at the ruins of the Harappan granary at Mohenjo-daro (c6_history_ch04_005) — why did a civilisation 4,500 years ago build massive.',
            decisions: [{ prompt: 'What is the central problem that gives rise to the discipline of economics, and how is it different from a problem studied in physics.', options: [
                { text: 'The central problem is scarcity', outcome: 'The central problem is scarcity — unlimited human wants versus limited resources — which forces.' },
                { text: 'economics studies money', outcome: 'Not quite — Students think "Economics is only about money, markets, and modern capitalism" and therefore.', reveals: 'economics-is-only-about-money' },
                { text: 'economics is about profits', outcome: 'Not quite — Students think "Economics is only about money, markets, and modern capitalism" and therefore.', reveals: 'economics-is-only-about-money' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_4', title: 'Historical Sources: Primary and Secondary',
          caseStudy: { intro: 'Imagine you visit the Qutub Minar in Delhi and see the iron pillar standing rust-free for 1,600 years.',
            decisions: [{ prompt: 'A student finds a copper-plate grant issued by a Chola king in 1010 CE recording a land donation to a temple.', options: [
                { text: 'The copper-plate grant (1010 CE) is the primary source', outcome: 'The copper-plate grant (1010 CE) is the primary source because it was created during the Chola.' },
                { text: 'new research', outcome: 'Not quite — Students believe "primary source = old document" and "secondary source = new book," so they.', reveals: 'primary-source-old-document-and' },
                { text: 'primary', outcome: 'Not quite — Students believe "primary source = old document" and "secondary source = new book," so they.', reveals: 'primary-source-old-document-and' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_5', title: 'Archaeological Sources: Artefacts and Inscriptions',
          caseStudy: { intro: 'Imagine you\'re visiting the National Museum in Delhi and see a Harappan seal with a unicorn motif and an undeciphered script — you might wonder: how.',
            decisions: [{ prompt: 'A student finds a terracotta figurine at a site. Which of the following can be *directly observed* without inference: (a) the figurine.', options: [
                { text: 'Correct answer: (b) the figurine was made using a mould', outcome: 'Correct answer: (b) the figurine was made using a mould. This can be directly observed through.' },
                { text: 'more reliable', outcome: 'Not quite — Students believe inscriptions are "more reliable" than artefacts because they "speak directly".', reveals: 'inscriptions-are-more-reliable-than' },
                { text: 'speak directly', outcome: 'Not quite — Students believe inscriptions are "more reliable" than artefacts because they "speak directly".', reveals: 'inscriptions-are-more-reliable-than' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Debating whether history counts as a real science, a student argues: \'A chemist can rerun an experiment, but nobody can rerun the Battle of Panipat — so history is just storytelling, not science.\'',
            decisions: [{ prompt: 'Is the experiment test the right yardstick?', options: [
                { text: 'No — social sciences are systematic but interpretive: the past cannot be rerun, so historians build explanations from surviving traces — documents, artefacts, revenue records — tested by logic and critique. Science means disciplined use of evidence, not necessarily repeatable experiments.', outcome: 'This defends the right criterion — rigour with fragmentary evidence — rather than letting the laboratory define all science.' },
                { text: 'The student is right — no lab, no science; history is opinion dressed up as fact.', outcome: 'Interpretive is not arbitrary: claims about the past are still constrained by evidence and open to falsification — different method, not less rigour.', reveals: 'no-lab-no-science' },
                { text: 'History would be a science if historians simply made predictions, like physicists do.', outcome: 'Human agents react to being studied, so deterministic prediction is impossible — social science explains patterns instead of forecasting dates.', reveals: 'science-means-prediction' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch1_5', title: 'The bigger picture',
          caseStudy: { intro: 'Social Science studies people — and people talk back, change their minds, and can\'t be locked in a lab. Its rigour is interpretive: systematic evidence, logical inference, patterned understanding instead of exact prediction.',
            decisions: [{ prompt: 'What comes next? Understanding Social Science · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding Social Science · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch1_1', difficulty: 'standard',
          question: 'Social Science is the systematic study of human society, social relationships.',
          hint: 'If stuck, revisit the Harappan Civilisation (c6_history_ch04_001 to c6_history_ch04_006).',
          misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with.',
          parts: [
                { id: 'a', prompt: 'Why can a historian not use the laboratory experimental method the way a chemist does? Explain using the nature of historical evidence.', answer: 'Historical events are unique, non-repeatable, and already completed',
                  options: ['Historical events are unique, non-repeatable, and already completed', 'history has no evidence', 'history is just stories', 'Social Science = History + Geography + Civics + Economics'],
                  hint: 'If stuck, revisit the Harappan Civilisation (c6_history_ch04_001 to c6_history_ch04_006) and ask.',
                  misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with no connection, missing.' }
          ],
            remediations: { 'social-science-history-geography-civics': { steps: ['Pick one event you know well (e.g., 1857 Revolt from Class 8).', 'Write four "Why?" questions — one each from History (why then?), Geography (why there?), Political Science (who held.', 'Use your Class 8 notes to find evidence for each.', 'Write a 3-sentence synthesis showing how the four lenses *together* explain the event better than any one alone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Social Science is less scientific than Physics because it cannot make precise predictions." Use the concepts of complexity, human agency.', answer: 'The claim confuses *predictive precision* with *scientific validity*',
                  options: ['The claim confuses *predictive precision* with *scientific validity*', 'Social Science is not really science', 'Social Science = History + Geography + Civics + Economics'],
                  hint: 'If stuck, revisit the Harappan Civilisation (c6_history_ch04_001 to c6_history_ch04_006) and ask.',
                  misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with no connection, missing.' }
          ],
            remediations: { 'social-science-history-geography-civics': { steps: ['Pick one event you know well (e.g., 1857 Revolt from Class 8).', 'Write four "Why?" questions — one each from History (why then?), Geography (why there?), Political Science (who held.', 'Use your Class 8 notes to find evidence for each.', 'Write a 3-sentence synthesis showing how the four lenses *together* explain the event better than any one alone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_10', difficulty: 'standard',
          question: 'Bias and perspective in historical interpretation refer to the systematic.',
          hint: 'Revisit c9_hist_ch1_1 (What is Social Science?) to understand that history is disciplined.',
          misconception: 'Students think "biased" means "false" and therefore discard biased sources.',
          parts: [
                { id: 'a', prompt: 'A British colonial historian writes in 1850: "The Mughal Empire was a period of Oriental despotism and stagnation." Identify two biases in this statement.', answer: 'Bias 1 — Cultural bias: "Oriental despotism" judges Mughal governance by British',
                  options: ['Bias 1 — Cultural bias: "Oriental despotism" judges Mughal governance by British', 'biased', '"biased" means "false" and therefore discard biased sources'],
                  hint: 'Revisit c9_hist_ch1_1 (What is Social Science?) to understand that history is disciplined inquiry.',
                  misconception: 'Students think "biased" means "false" and therefore discard biased sources.' }
          ],
            remediations: { 'biased-means-false-and-therefore': { steps: ['Give the student two accounts of the same event (e.g., a school dispute) written from different perspectives.', 'Ask: "Which is true?" (Neither is fully true — both are biased.) 3.', 'Have them identify what each account includes and omits.', 'Introduce the four types of bias (authorial, source, cultural, temporal) with examples.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_2', difficulty: 'standard',
          question: 'The interdisciplinary relationship where geography provides the physical.',
          hint: 'If stuck, revisit the physical map of India (Class 6 Geography) and the timeline chart.',
          misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the.',
          parts: [
                { id: 'a', prompt: 'Name one major geographical feature of the Indian subcontinent that acted as a natural barrier against invasions from the northwest, and state one historical.', answer: 'The Hindu Kush and Himalayan mountain ranges acted as natural barriers',
                  options: ['The Hindu Kush and Himalayan mountain ranges acted as natural barriers', 'geography determines history', 'the Thar Desert or the Indian Ocean'],
                  hint: 'If stuck, revisit the physical map of India (Class 6 Geography) and the timeline chart of Indian.',
                  misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the Himalayas, it was.' }
          ],
            remediations: { 'geography-determines-history-geographical-determ': { steps: ['Have the student draw a physical map of India marking the Himalayas, Gangetic plains, Deccan Plateau, Thar Desert, and.', 'For each region, list one historical event where geography helped a ruler and one where it hindered (e.g., Himalayas.', 'Ask the student to rewrite a previous board-style answer (e.g., "Why did the British win?") replacing "because.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_3', difficulty: 'standard',
          question: 'Economics as a social science discipline is the systematic study of how.',
          hint: 'Revisit the Harappan granary (c6_history_ch04_005) and the Mauryan tax on agriculture.',
          misconception: 'Students think "Economics is only about money, markets, and modern capitalism" and therefore believe it has.',
          parts: [
                { id: 'a', prompt: 'What is the central problem that gives rise to the discipline of economics, and how is it different from a problem studied in physics or chemistry?', answer: 'The central problem is scarcity',
                  options: ['The central problem is scarcity', 'economics studies money', 'economics is about profits', 'Economics is only about money, markets, and modern capitalism'],
                  hint: 'Revisit the Harappan granary (c6_history_ch04_005) and the Mauryan tax on agriculture.',
                  misconception: 'Students think "Economics is only about money, markets, and modern capitalism" and therefore believe it has no relevance to pre-colonial.' },
                { id: 'b', prompt: 'A village in the Mughal period (c6_history_ch09_038) produces wheat and cotton. The zamindar demands revenue in cash.', answer: 'The \'what\' shifts from subsistence crops to cash crops (cotton over wheat)',
                  options: ['The \'what\' shifts from subsistence crops to cash crops (cotton over wheat)', 'Economics is only about money, markets, and modern capitalism'],
                  hint: 'Revisit the Harappan granary (c6_history_ch04_005) and the Mauryan tax on agriculture.',
                  misconception: 'Students think "Economics is only about money, markets, and modern capitalism" and therefore believe it has no relevance to pre-colonial.' }
          ],
            remediations: { 'economics-is-only-about-money': { steps: ['Revisit the Harappan bead-making workshop (c6_history_ch04_004) — ask: "Why did artisans specialise in carnelian beads.', 'Map the answer to *comparative advantage* and *exchange* — no money needed.', 'Apply the same logic to the Mauryan state monopoly on mining (c6_history_ch05_010) — the state allocated labour.', 'Write one paragraph defining economics without using the word "money".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_4', difficulty: 'standard',
          question: 'Primary sources are original, first-hand evidence created during the historical.',
          hint: 'Revisit c9_hist_ch1_1 (Social Science: Definition and Disciplinary Scope) and recall how.',
          misconception: 'Students believe "primary source = old document" and "secondary source = new book," so they classify a 1900 history.',
          parts: [
                { id: 'a', prompt: 'A student finds a copper-plate grant issued by a Chola king in 1010 CE recording a land donation to a temple.', answer: 'The copper-plate grant (1010 CE) is the primary source',
                  options: ['The copper-plate grant (1010 CE) is the primary source', 'new research', 'primary', 'most recent authoritative work'],
                  hint: 'Revisit c9_hist_ch1_1 (Social Science: Definition and Disciplinary Scope) and recall how Ashoka\'s.',
                  misconception: 'Students believe "primary source = old document" and "secondary source = new book," so they classify a 1900 history of the Mauryas.' },
                { id: 'b', prompt: 'You are researching the economic impact of the Battle of Plassey (1757).', answer: '(A) Primary—created by the administration immediately after the battle',
                  options: ['(A) Primary—created by the administration immediately after the battle', 'uses data', 'primary source = old document', 'secondary source = new book'],
                  hint: 'Revisit c9_hist_ch1_1 (Social Science: Definition and Disciplinary Scope) and recall how Ashoka\'s.',
                  misconception: 'Students believe "primary source = old document" and "secondary source = new book," so they classify a 1900 history of the Mauryas.' }
          ],
            remediations: { 'primary-source-old-document-and': { steps: ['Give the student two sources on the same event—a 1910 British official\'s memoir of the 1857 Revolt and a 2022.', 'Ask: "Which source was created *during* 1857?" (Neither—both are later.)', 'Ask: "Which source gives you *new physical evidence* from 1857?" (The 2022 excavation report—it presents artefacts.', 'Explain: "Primary means \'from the time,\' not \'old book.\' The excavation report is a secondary *publication* but.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_5', difficulty: 'standard',
          question: 'Archaeological sources are material remains from past human activity.',
          hint: 'Revisit c9_hist_ch1_4 (primary vs secondary sources) and c6_history_ch05_009 (Ashoka\'s.',
          misconception: 'Students believe inscriptions are "more reliable" than artefacts because they "speak directly" — but inscriptions are.',
          parts: [
                { id: 'a', prompt: 'A student finds a terracotta figurine at a site. Which of the following can be *directly observed* without inference: (a) the figurine represents a mother.', answer: 'Correct answer: (b) the figurine was made using a mould',
                  options: ['Correct answer: (b) the figurine was made using a mould', 'more reliable', 'speak directly', 'less historical'],
                  hint: 'Revisit c9_hist_ch1_4 (primary vs secondary sources) and c6_history_ch05_009 (Ashoka\'s edicts.',
                  misconception: 'Students believe inscriptions are "more reliable" than artefacts because they "speak directly" — but inscriptions are *commissioned texts*.' },
                { id: 'b', prompt: 'Why do archaeologists prefer *stratigraphic context* (the layer where an artefact is found) over the artefact\'s style alone for dating?', answer: 'Stratigraphy provides a *relative chronological sequence* based on the law of',
                  options: ['Stratigraphy provides a *relative chronological sequence* based on the law of', 'more reliable', 'speak directly', 'less historical'],
                  hint: 'Revisit c9_hist_ch1_4 (primary vs secondary sources) and c6_history_ch05_009 (Ashoka\'s edicts.',
                  misconception: 'Students believe inscriptions are "more reliable" than artefacts because they "speak directly" — but inscriptions are *commissioned texts*.' }
          ],
            remediations: { 'inscriptions-are-more-reliable-than': { steps: ['Give the student two sources — Ashoka\'s Rock Edict II (claims medical care for humans/animals) and archaeological.', 'Ask: "If the edict is \'true,\' where are the hospitals?"', 'Guide them to distinguish *prescriptive* texts (what rulers *wanted*) from *descriptive* material traces (what.', 'Have them list three artefact types that would *confirm* the edict\'s claims (surgical tools, medicine vials, animal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
