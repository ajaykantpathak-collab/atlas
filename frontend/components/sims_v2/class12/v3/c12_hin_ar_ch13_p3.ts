import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p3',
    title: 'पहलवान की ढोलक · Part 3/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'पहलवान की ढोलक · Part 3/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_013', 'c12_hin_ar_cbse_13_014', 'c12_hin_ar_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'पहलवान की ढोलक — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-2 — पाठ 13\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['पहलवान की ढोलक —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_ar_cbse_13_013', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Identify all occurrences of the syllables in the text.', 'Formulate an arguable Point: The syllables function as.', 'Select Evidence for each occurrence: (a) "gaon ke log mil.', 'Explain each: (a) establishes baseline — art belongs.', 'Link to thesis: The syllables\' persistence across regimes.'], answer: 'Identify all occurrences of the syllables in the text. Formulate an arguable Point: The syllables function as. Select Evidence for each occurrence: (a) "gaon ke log mil. Explain each: (a) establishes baseline — art belongs. Link to thesis: The syllables\' persistence across regimes.' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_013', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, return to c12_hin_ar_cbse_13_012 (Comprehension) and c12_hin_ar_cbse_13_008-009.',
          misconception: '**"Analysis means finding hidden symbols" — students hunt for "secret meanings" (e.g., "the fire represents passion").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, return to c12_hin_ar_cbse_13_012 (Comprehension) and c12_hin_ar_cbse_13_008-009 (Literary.',
                  misconception: '**"Analysis means finding hidden symbols" — students hunt for "secret meanings" (e.g., "the fire represents passion") instead of analyzing.' }
          ],
            remediations: { 'analysis-means-finding-hidden-symbols': { steps: ['If a student cannot move beyond plot summary or device-spotting: 1.', '**Return to node 012 (Comprehension):** Have them list 5 *specific* textual moments (with page/line refs) where the.', 'No interpretation — just evidence collection.', '**Return to nodes 008-009 (Literary Devices):** For each moment, name *one* device at work (motif, parallelism.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_014', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL संरचना लागू करने में अटके → **c11_hin_ar_cbse_13_014** (कक्षा 11 का समान नोड) पर.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ की बातें अपने शब्दों में दोहराना (paraphrasing)।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि PEEL संरचना लागू करने में अटके → **c11_hin_ar_cbse_13_014** (कक्षा 11 का समान नोड) पर लौटें.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ की बातें अपने शब्दों में दोहराना (paraphrasing)।"* **वास्तविकता:** बोर्ड/प्रतियोगी.' }
          ],
            remediations: { 'paraphrasing-1-2': { steps: ['**चरणबद्ध उपचार (यदि छात्र उपरोक्त भ्रांति में फँसा है):** 1.', '**पुनः पाठ पढ़ें — पर इस बार "पेंसिल से"**: हर उस वाक्य/शब्द को **अंडरलाइन/हाइलाइट** करें जो — (क) चरित्र-परिवर्तन.', '**एक प्रश्न चुनें** (जैसे: "शीर्षक की सार्थकता") और **केवल 3 साक्ष्य** ढूंढें — पूरा उत्तर न लिखें, केवल **साक्ष्य.', '**PEEL का केवल Point और Evidence लिखें** — Explanation और Link बाद में। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_015', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, return to c12_hin_ar_cbse_13_013 and re-do the "Theme Tracking Table" exercise.',
          misconception: 'Students treat "discussion points" as a list of opinions to memorize ("Yagyu is brave," "King is cruel") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, return to c12_hin_ar_cbse_13_013 and re-do the "Theme Tracking Table" exercise — map each.',
                  misconception: 'Students treat "discussion points" as a list of opinions to memorize ("Yagyu is brave," "King is cruel") rather than a framework for.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['If a student cannot move beyond opinion-sharing: Step 1 — Give them a "Claim-Evidence-Reasoning" template card.', 'Step 2 — Practice with a non-literary topic first (e.g., "Should street vendors need licenses?") to isolate the skill.', 'Step 3 — Return to the text: assign *one* claim ("Yagyu\'s art is political") and require three distinct textual.', 'Step 4 — Record their 2-minute response; playback and self-score using the CBSE speaking rubric (fluency, coherence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
