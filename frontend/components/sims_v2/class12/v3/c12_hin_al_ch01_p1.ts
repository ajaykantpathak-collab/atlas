import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch01_p1: SimDef = {
    id: 'v3_c12_hin_al_ch01_p1',
    title: 'lwjnkl dh >ksaiM+h · Part 1/3',
    subtitle: 'In this village, even the dead owed the landlord',
    classLevel: 12, subject: 'hin_al', topic: 'lwjnkl dh >ksaiM+h · Part 1/3',
    chapters: ['c12_hin_al_ch01'],
    nodeIds: ['c12_hin_al_cbse_01_001', 'c12_hin_al_cbse_01_002', 'c12_hin_al_cbse_01_003', 'c12_hin_al_cbse_01_004', 'c12_hin_al_cbse_01_005', 'c12_hin_al_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi regional-literature reader', intro: 'A custom where the dead were auctioned for debt sounds invented — it wasn\'t. Renu documented it from life.', goal: 'Read Laknak ki Saai through zamindari exploitation, informal credit and the custom of साईँ.' },
    discovery: {
        question: 'In 1950s Bihar, a landlord auctions a peasant family\'s dead to recover a debt — the custom called \'साईँ.\' Why did the corpse become collateral?',
        options: ['No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself', 'It was a religious ritual', 'Villages had no money at all', 'The dead were community property'],
        answer: 'No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself',
        hook: 'This isn\'t a funeral rite — it\'s feudal economics with the corpse as collateral, turning even death into a transaction. Renu was a Quit India fighter and rural journalist: the आंचलिक dialect and documented detail make it an indictment, not a village sketch.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is the preparatory phase where students investigate the author\'s biography, the historical period, the cultural setting (rural Bihar, 1950s), and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Renu\'s Bihar as a documentarian: decode the custom that auctions the dead, weigh the zamindar-peasant power imbalance, and read dialect as resistance.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a film set in a 1950s Bihar village where a poor family’s dead relative is being auctioned to pay a landlord’s debt.',
            decisions: [{ prompt: 'Who is the author of "लड़कनक की साईँ" and what is the literal meaning of the word \'साईँ\' in the title?', options: [
                { text: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), a prominent आंचलिक कथाकार from Bihar', outcome: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), a prominent आंचलिक कथाकार from Bihar.' },
                { text: 'Premchand or defining \'साईँ\' as a funeral ritual', outcome: 'Not quite — Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a room where the air feels heavy, the walls are damp, and a single flickering bulb casts long shadows — you instantly feel uneasy without.',
            decisions: [{ prompt: 'What are the three components of setting in a narrative, and which component is most prominent in the opening scene of "ल्वज्नकल ध >कसईम+h"?', options: [
                { text: 'The three components are time, place, and social environment', outcome: 'The three components are time, place, and social environment. In the opening scene, the physical.' },
                { text: 'village', outcome: 'Not quite — Students often treat setting as a static backdrop — just "where and when" — and atmosphere as.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are asked to describe your grandfather\'s personality to a friend who never met him.',
            decisions: [{ prompt: 'Who is the protagonist of "ल्वज्न्कल ध >कसैम+ह" and what is the central conflict he faces?', options: [
                { text: 'The protagonist is ल्वज्न्कल, an elderly man whose son and daughter-in-law force him out', outcome: 'The protagonist is ल्वज्न्कल, an elderly man whose son and daughter-in-law force him out of his own.' },
                { text: 'the son txèkj as protagonist', outcome: 'Not quite — Students often treat character analysis as a trait-listing exercise: "ल्वज्न्कल is old, poor, sad.', reveals: 'students-often-treat-character-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a family argument where everyone has an opinion about your career choice — some support you, some mock you, some stay silent.',
            decisions: [{ prompt: 'Name three supporting characters in the chapter and state one defining trait for each, based solely on the text.', options: [
                { text: 'Correct answer: ह्क्स्ज्का (पत्नी)', outcome: 'Correct answer: ह्क्स्ज्का (पत्नी) — व्यावहारिक और सुरक्षात्मक; त्एक्ज्क (मित्र) — संवेदनशील और.' },
                { text: 'assigns traits not supported by dialogue (e', outcome: 'Not quite — Students often treat supporting characters as mere "helpers" or "obstacles" to the protagonist.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On an NGO internship in a village, you watch a moneylender stall a poor family\'s funeral until they \'settle his dues\' — the crowd shrugs that debt must be honoured. Your field note reads: \'cruel individual.\'',
            decisions: [{ prompt: 'What does the context of Renu\'s \'साईँ\' add to that diagnosis?', options: [
                { text: 'Rewrite the note as a systemic failure — \'साईँ\' treated even a corpse as loan collateral because peasants had no formal credit; the moneylender blocking the rites isn\'t just a cruel man, he\'s the visible edge of a system where the borrower\'s dignity is the last asset on the books.', outcome: 'Renu\'s story is an indictment of the credit vacuum and landlord power that made bodies payable — \'poverty\' alone doesn\'t explain it; the absence of institutional alternatives does.' },
                { text: 'Keep the note as written — one cruel man harassing a grieving family is the whole story.', outcome: 'That flattens Renu\'s critique into a villain sketch: the custom persisted because the village economy had no other way to secure a loan, so removing one lender leaves the machinery intact.', reveals: 'cruelty-is-individual' },
                { text: 'Side with the crowd — a debt is a debt, and rituals shouldn\'t shield borrowers from repayment.', outcome: 'That naturalises exactly what the story exposes: when a corpse can be collateral, \'honouring debt\' has already swallowed human dignity — the crowd\'s shrug is the system\'s success, not its excuse.', reveals: 'debt-before-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a regional story as evidence of a system — where even grief was mortgaged to the landlord.',
            decisions: [{ prompt: 'What comes next? lwjnkl dh >ksaiM+h · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — lwjnkl dh >ksaiM+h · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is the preparatory phase where.',
          hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
          misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the custom of \'साईँ\' emerged in rural Bihar and what it tells us about the relationship between peasants and landlords.', answer: '\'साईँ\' emerged because peasants had no access to formal credit',
                  options: ['\'साईँ\' emerged because peasants had no access to formal credit', 'poverty'],
                  hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.' },
                { id: 'b', prompt: 'Phanishwar Nath Renu participated in the 1942 Quit India Movement and worked as a journalist in rural Bihar.', answer: 'His involvement in the freedom struggle exposed him to the gap between political',
                  options: ['His involvement in the freedom struggle exposed him to the gap between political', 'he wrote realistically'],
                  hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['Re‑read the "पाठ परिचय" (Text Introduction) in the NCERT textbook and underline every proper noun (author, region.', 'Watch a 5‑minute video on "जमींदारी प्रथा और ग्रामीण ऋण" (e.g., from NCERT’s official YouTube channel) to visualize the.', 'Discuss with the teacher: "If the landlord already owns the land, why does he need the body?" — this question forces.', 'Re‑attempt Diagnostic Questions 2 and 4; if answers improve, move forward.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "A reader can fully appreciate \'लड़कनक की साईँ\' without any knowledge of the historical context or the custom of \'साईँ\' because the story’s.', answer: 'The claim is false',
                  options: ['The claim is false', 'universalist'],
                  hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['Re‑read the "पाठ परिचय" (Text Introduction) in the NCERT textbook and underline every proper noun (author, region.', 'Watch a 5‑minute video on "जमींदारी प्रथा और ग्रामीण ऋण" (e.g., from NCERT’s official YouTube channel) to visualize the.', 'Discuss with the teacher: "If the landlord already owns the land, why does he need the body?" — this question forces.', 'Re‑attempt Diagnostic Questions 2 and 4; if answers improve, move forward.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the organized sequence of events in.',
          hint: 'If unable to map reading vs. chronological order, practice with a familiar film (e.g.',
          misconception: 'Students equate "plot" with "what happens" and "structure" with "beginning-middle-end", treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and Narrative Structure refers to the organized sequence of events in a story and',
                  options: ['Plot and Narrative Structure refers to the organized sequence of events in a story and', '"Before You Read: Context and Background" is the preparatory phase where students', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves systematically examining the main'],
                  hint: 'If unable to map reading vs. chronological order, practice with a familiar film (e.g., "Baghban".',
                  misconception: 'Students equate "plot" with "what happens" and "structure" with "beginning-middle-end", treating them as synonyms.' }
          ],
            remediations: { 'students-equate-plot-with-what': { steps: ['Have the student take ANY short story (even a fable) and create a two-column table: Column A = events in reading order.', 'For every row where A ≠ B, write one sentence: "The author places [event] here instead of chronologically to achieve.', 'Practice with the NCERT story — map the ledger scene (reading order: late; chronological: middle) and articulate its.', 'Re-attempt Diagnostic Question 3. If still stuck, revisit c11_hin_ar_cbse_01_002 (Class 11 Plot basics) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck, review the "Setting Analysis Template" from c11_hin_ar_cbse_01_003: list.',
          misconception: 'Students often treat setting as a static backdrop — just "where and when" — and atmosphere as a synonym for "weather.',
          parts: [
                { id: 'a', prompt: 'What are the three components of setting in a narrative, and which component is most prominent in the opening scene of "ल्वज्नकल ध >कसईम+h"?', answer: 'The three components are time, place, and social environment',
                  options: ['The three components are time, place, and social environment', 'village'],
                  hint: 'If stuck, review the "Setting Analysis Template" from c11_hin_ar_cbse_01_003: list physical details.',
                  misconception: 'Students often treat setting as a static backdrop — just "where and when" — and atmosphere as a synonym for "weather description".' },
                { id: 'b', prompt: 'The story describes the roof leaking onto ल्वज्नकल during a critical conversation.', answer: 'Pathetic fallacy is the attribution of human emotions to nature',
                  options: ['Pathetic fallacy is the attribution of human emotions to nature', 'it shows the house is old'],
                  hint: 'If stuck, review the "Setting Analysis Template" from c11_hin_ar_cbse_01_003: list physical details.',
                  misconception: 'Students often treat setting as a static backdrop — just "where and when" — and atmosphere as a synonym for "weather description".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student reread only the descriptive passages (skip dialogues) and highlight every noun-adjective pair related.', 'For each highlighted phrase, ask: "What does this make the reader feel?', 'What does it tell us about the character\'s state?" 3.', 'Create a two-column table: Column A = Physical Detail, Column B = Emotional Effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'If stuck, re-read the story marking every paragraph where ल्वज्न्कल speaks or acts; then.',
          misconception: 'Students often treat character analysis as a trait-listing exercise: "ल्वज्न्कल is old, poor, sad, and lonely." They.',
          parts: [
                { id: 'a', prompt: 'Using the PEEL structure, write a 4-sentence paragraph analyzing ल्वज्न्कल\'s dignity in the final scene where he builds a new house.', answer: '**Point:** ल्वज्न्कल\'s act of building a new house reclaims his agency',
                  options: ['**Point:** ल्वज्न्कल\'s act of building a new house reclaims his agency', 'he built a house'],
                  hint: 'If stuck, re-read the story marking every paragraph where ल्वज्न्कल speaks or acts; then list those.',
                  misconception: 'Students often treat character analysis as a trait-listing exercise: "ल्वज्न्कल is old, poor, sad, and lonely." They hunt for adjectives.' }
          ],
            remediations: { 'students-often-treat-character-analysis': { steps: ['If the student cannot move beyond trait-listing, do this 3-step remediation: (1) Have them re-read only the three.', '3-4), the dialogue about the house papers (pp.', '5-6), and the final building scene (pp.', '(2) For each scene, ask them to complete a table: **Action/Dialogue** | **What it shows** | **Why the author includes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'If stuck, review the "Character Analysis: Supporting Characters" nodes from Class 11.',
          misconception: 'Students often treat supporting characters as mere "helpers" or "obstacles" to the protagonist, labeling them simply.',
          parts: [
                { id: 'a', prompt: 'Name three supporting characters in the chapter and state one defining trait for each, based solely on the text.', answer: 'Correct answer: ह्क्स्ज्का (पत्नी)',
                  options: ['Correct answer: ह्क्स्ज्का (पत्नी)', 'assigns traits not supported by dialogue (e'],
                  hint: 'If stuck, review the "Character Analysis: Supporting Characters" nodes from Class 11 (e.g.',
                  misconception: 'Students often treat supporting characters as mere "helpers" or "obstacles" to the protagonist, labeling them simply as "good" or "bad.".' },
                { id: 'b', prompt: 'Using the PEEL structure (Point, Evidence, Explanation, Link), write a short paragraph analyzing how त्एक्ज्क\'s dialogue in the scene where he confronts.', answer: 'Correct answer: Point',
                  options: ['Correct answer: Point', 'angry at ह्क्स्ज्का', 'claims त्एक्ज्क is "angry at ह्क्स्ज्का" misses the nuance of his motivation'],
                  hint: 'If stuck, review the "Character Analysis: Supporting Characters" nodes from Class 11 (e.g.',
                  misconception: 'Students often treat supporting characters as mere "helpers" or "obstacles" to the protagonist, labeling them simply as "good" or "bad.".' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Have the student re-read only the dialogue scenes involving ह्क्स्ज्का and त्एक्ज्क (pages 3-5 in the reference text).', 'Ask: "What does each character explicitly say they fear?" List the exact words.', 'Then ask: "What would happen to their family if they acted differently?" 4.', 'Finally, guide them to rewrite their character notes using the sentence frame: "Character X says ___ because they fear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review the \'Theme Statement Frame\' from Class 11: "The author uses.',
          misconception: 'Students equate the primary theme with the *most repeated topic* (e.g., "old age homes") rather than the *author\'s.',
          parts: [
                { id: 'a', prompt: 'Apply the \'theme-tracking\' method to Lvajnakl\'s dialogue with the manager (when he says, "रक्स ge lkS yk[k ckj cuk,¡xs").', answer: 'The dialogue reveals the theme of *reciprocal justice*',
                  options: ['The dialogue reveals the theme of *reciprocal justice*', 'he promises to build more homes'],
                  hint: 'If stuck, review the \'Theme Statement Frame\' from Class 11: "The author uses [character/conflict].',
                  misconception: 'Students equate the primary theme with the *most repeated topic* (e.g., "old age homes") rather than the *author\'s perspective on that.' }
          ],
            remediations: { 'students-equate-the-primary-theme': { steps: ['If a student cannot distinguish topic from theme, do this 3-step remediation: (1) Give them two one-sentence summaries.', '(2) Have them complete this frame for Lvajnakl: "The author shows [topic] to prove that [universal truth about human.', 'If they still write plot events, revisit node c12_hin_al_cbse_01_002 (Plot and Narrative Structure) to separate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
