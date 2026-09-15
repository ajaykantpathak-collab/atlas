import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch02_p1: SimDef = {
    id: 'v3_c11_hin_v_ch02_p1',
    title: 'ikB\'kkyk tkus osQ fy, · Part 1/3',
    subtitle: 'See a pond as a village\'s constitution, not its engineering.',
    classLevel: 11, subject: 'hin_v', topic: 'ikB\'kkyk tkus osQ fy, · Part 1/3',
    chapters: ['c11_hin_v_ch02'],
    nodeIds: ['c11_hin_v_cbse_02_001', 'c11_hin_v_cbse_02_002', 'c11_hin_v_cbse_02_003', 'c11_hin_v_cbse_02_004', 'c11_hin_v_cbse_02_005', 'c11_hin_v_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village deciding who owns the rain', intro: 'Tankers queue at the municipal tap while the old johad sits dry — the difference between them was never concrete, it was cooperation.', goal: 'Read the johad system as social institution and analyse the chapter\'s inductive structure.' },
    discovery: {
        question: 'Alwar\'s johads brought dead wells back to life — so is water revival basically an engineering project?',
        options: ['No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard', 'Yes — dig the right pond and the water follows', 'Yes — runoff math is the whole problem', 'No — because johads are religious structures'],
        answer: 'No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard',
        hook: 'The pond is the easy part — historically the dominant castes controlled the water; revival worked only when women\'s jal sabhas rewrote the sharing rules.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Before You Read: Context and Background is a pre-reading strategy that equips students with the historical, geographical, cultural, and thematic knowledge necessary to comprehend a text deeply.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are a Class 11 student in Jaipur during peak summer, watching tankers queue up at a municipal tap while your grandmother recalls how the village.',
            decisions: [{ prompt: 'What is the literal meaning of the term *johad* as used in the context of traditional water management in Rajasthan, and which geographical.', options: [
                { text: 'A *johad* is a crescent-shaped earthen check-dam built across a slope to capture and', outcome: 'A *johad* is a crescent-shaped earthen check-dam built across a slope to capture and store monsoon.' },
                { text: 'rainwater harvesting techniques', outcome: 'Not quite — Students often believe the chapter is primarily about "rainwater harvesting techniques" and.', reveals: 'the-chapter-is-primarily-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re given a 10-page government report on interstate water disputes—dense, factual, no dialogue, no "story." How would you find the "plot"?',
            decisions: [{ prompt: 'Identify the three distinct structural phases in the opening section (pages 9-11) where the author moves from immediate sensory observation.', options: [
                { text: 'Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2)', outcome: 'Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2).' },
                { text: 'introduction, body, conclusion', outcome: 'Not quite — Students treat "plot" in non-fiction as a chronological timeline of events described in the text.', reveals: 'students-treat-plot-in-non' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are an engineer standing in the Thar Desert, watching a canal take shape against impossible odds — what would you notice, feel, and record?',
            decisions: [{ prompt: 'Who is the protagonist of the chapter "जक्तलुक्कू ध जत्र च्वनस" and what is his primary role in the narrative?', options: [
                { text: 'The protagonist is the first-person narrator, an engineer/official overseeing the canal', outcome: 'The protagonist is the first-person narrator, an engineer/official overseeing the canal.' },
                { text: 'villager', outcome: 'Not quite — Students often think the protagonist is merely a "reporter" listing facts about canal building.', reveals: 'the-protagonist-is-merely-a' },
                { text: 'reporter', outcome: 'Not quite — Students often think the protagonist is merely a "reporter" listing facts about canal building.', reveals: 'the-protagonist-is-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are standing on a Rajasthan hillside watching villagers build a check dam with bare hands—no engineers, no blueprints, just songs and shared.',
            decisions: [{ prompt: 'पाठ में पस्तकाथ (श्रमिक समूह) की पहचान किन तीन विशिष्ट क्रियाओं से होती है जो उनके पारंपरिक ज्ञान को दर्शाती हैं?', options: [
                { text: 'Correct: (1) ओकाकब्ज निर्माण की लयबद्ध खुदाई-गान, (2) मिट्टी की नमी जांचने की', outcome: 'Correct: (1) ओकाकब्ज निर्माण की लयबद्ध खुदाई-गान, (2) मिट्टी की नमी जांचने की स्पर्श-आधारित तकनीक.' },
                { text: 'workers', outcome: 'Not quite — Students treat supporting characters as "background helpers" who merely execute the protagonist\'s.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you pass a construction site and see workers carrying bricks in the scorching heat — you might wonder who they are and why their labour builds cities.',
            decisions: [{ prompt: 'What is the difference between a \'topic\' (subject) and a \'theme\' in a literary text?', options: [
                { text: 'A topic is the surface-level subject (e.g., "brick kilns" or "migrant labour"), stated in', outcome: 'A topic is the surface-level subject (e.g., "brick kilns" or "migrant labour"), stated in a word.' },
                { text: 'The theme is brick-making', outcome: 'Not quite — Students often equate the primary theme with the *most repeated topic* (e.g., "brick-making.', reveals: 'students-often-equate-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a project on water scarcity, a student presents Anupam Mishra\'s johad chapter as \'a DIY guide to building check-dams — shapes, sizes, materials.\' A classmate asks why the chapter spends so long on village meetings and voluntary labour.',
            decisions: [{ prompt: 'What is the chapter really about?', options: [
                { text: 'Read the johad as a social contract, not a technique: the chapter documents a decentralised water democracy — shramdaan and gram sabha decisions, shared labour across caste and gender, the three water categories managed as a common-pool resource. The engineering details serve the argument that community governance, marginalized by modern administration, is what kept wells alive.', outcome: 'The project reframes: the question isn\'t \'how to build a pond\' but \'how a community sustains its water democracy\' — the meetings are the technology.' },
                { text: 'Keep the technical reading — the social passages are human-interest padding around the engineering.', outcome: 'That inverts the essay: the technique is the lens; the analysis of common-pool governance is the subject.', reveals: 'johad-is-engineering-guide' },
                { text: 'Summarise it chronologically — first canals, then johads, then borewells — as a history of water tech.', outcome: 'The text\'s plot is an architecture of persuasion, not a timeline: it deliberately places traditional johads after modern canals to create rhetorical tension.', reveals: 'nonfiction-plot-is-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The text ends not with a policy memo but trickling streams merging into sweet water — small flows self-organising into abundance is the whole argument.',
            decisions: [{ prompt: 'What comes next? ikB\'kkyk tkus osQ fy, · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — ikB\'kkyk tkus osQ fy, · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_001', difficulty: 'standard',
          question: 'Before You Read: Context and Background is a pre-reading strategy that equips.',
          hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management.',
          misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the.',
          parts: [
                { id: 'a', prompt: 'A village in Alwar district receives 600 mm annual rainfall. Using the concept of *johad* catchment-to-command ratio described in the background, calculate the.', answer: 'Step 1: Crop water need = 10 ha × 500 mm = 50,000 m³',
                  options: ['Step 1: Crop water need = 10 ha × 500 mm = 50,000 m³', 'rainwater harvesting techniques'],
                  hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management section) and.',
                  misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the engineering.' }
          ],
            remediations: { 'the-chapter-is-primarily-about': { steps: ['If a student cannot articulate the socio-ecological frame, conduct a 3-step remediation: (1) Show two 2-minute clips.', '(2) Give a one-paragraph excerpt from the chapter where the author describes a *gram sabha* conflict over water.', '(3) Assign a mini-inquiry: "Interview one elder in your neighborhood about how water decisions were made 30 years ago.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Reviving *johads* is only a technical fix for water scarcity; it does not require social restructuring." Use evidence from the.', answer: 'The statement is invalid',
                  options: ['The statement is invalid', 'rainwater harvesting techniques'],
                  hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management section) and.',
                  misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the engineering.' },
                { id: 'b', prompt: 'Design a 3-minute podcast script for Class 11 students that introduces the chapter\'s context using a "Then vs Now" narrative structure.', answer: 'A strong script opens with the sound of a dry hand-pump vs',
                  options: ['A strong script opens with the sound of a dry hand-pump vs', 'rainwater harvesting techniques'],
                  hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management section) and.',
                  misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the engineering.' }
          ],
            remediations: { 'the-chapter-is-primarily-about': { steps: ['If a student cannot articulate the socio-ecological frame, conduct a 3-step remediation: (1) Show two 2-minute clips.', '(2) Give a one-paragraph excerpt from the chapter where the author describes a *gram sabha* conflict over water.', '(3) Assign a mini-inquiry: "Interview one elder in your neighborhood about how water decisions were made 30 years ago.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure in non-fiction expository texts refers to the.',
          hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and.',
          misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals.',
          parts: [
                { id: 'a', prompt: 'Identify the three distinct structural phases in the opening section (pages 9-11) where the author moves from immediate sensory observation to systemic.', answer: 'Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2)',
                  options: ['Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2)', 'introduction, body, conclusion'],
                  hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and practice labeling.',
                  misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals were built, then.' },
                { id: 'b', prompt: 'The author inserts a detailed description of the \'johad\' (traditional check-dam) construction process on pages 14-15.', answer: 'Correct answer: The sequencing follows a "failure-before-alternative" rhetorical',
                  options: ['Correct answer: The sequencing follows a "failure-before-alternative" rhetorical', 'chronological order', 'traditional comes first historically'],
                  hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and practice labeling.',
                  misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals were built, then.' },
                { id: 'c', prompt: 'On page 16, the author describes how laborers\' payment shifted from "annual grain share" to "cash wages" to "contract-based piece rates." Map this progression.', answer: 'Correct answer: Escalation (specifically, escalating alienation)',
                  options: ['Correct answer: Escalation (specifically, escalating alienation)', 'contrast', 'parallelism', 'framing'],
                  hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and practice labeling.',
                  misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals were built, then.' }
          ],
            remediations: { 'students-treat-plot-in-non': { steps: ['Give the student a 3-paragraph op-ed on a familiar topic (e.g., "Why Delhi\'s odd-even scheme fails").', 'Have them physically cut and reorder the paragraphs—ask "Does the argument still work? Why/why not?"', 'Map this to the textbook: identify the "hook" paragraph (page 9 canal scene), the "evidence" section (pages 10-13.', 'Explicitly name the principle: "Non-fiction plot = the minimum number of pieces that must stay in this order for the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the physical, temporal, and social environment in which.',
          hint: 'Review c11_hin_v_cbse_02_001 (Context and Background) for the geographical and cultural.',
          misconception: 'Students often treat "setting" as static backdrop (desert = hot, dry) and "atmosphere" as mere adjective-labeling (mood.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the physical, temporal, and social environment in',
                  options: ['Setting refers to the physical, temporal, and social environment in', 'Before You Read: Context and Background is a pre-reading strategy that equips students', 'Plot and Narrative Structure in non-fiction expository texts refers to the logical', 'Character analysis of the protagonist involves examining the narrator\'s personality,'],
                  hint: 'Review c11_hin_v_cbse_02_001 (Context and Background) for the geographical and cultural framework.',
                  misconception: 'Students often treat "setting" as static backdrop (desert = hot, dry) and "atmosphere" as mere adjective-labeling (mood = sad/hopeful).' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student conflates setting with atmosphere or treats them as static: (1) Have them draw a two-column map: left.', '(2) Ask: "If the impermeable layer were absent, how would the *feeling* of the village change?" forcing causal linking.', '(3) Assign a micro-write: "Describe the same johad site in two seasons—pre-monsoon desperation vs.', 'post-monsoon abundance—using only details from the text." This makes the dynamic interplay visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the narrator\'s.',
          hint: 'Review "First-person narrative" and "Characterization techniques" from Class 10 Hindi.',
          misconception: 'Students often think the protagonist is merely a "reporter" listing facts about canal building.',
          parts: [
                { id: 'a', prompt: 'The protagonist says: "oqaQbZ dks] mlosQ ikuh dks lkI+kQ j[kus osQ fy, mls <¡ddj j[kuk ”k:jh gSA" (The canal must be covered to preserve its water.) Identify.', answer: 'The statement reveals his practical problem-solving and foresight',
                  options: ['The statement reveals his practical problem-solving and foresight', 'hardworking', 'reporter', 'the protagonist is merely a "reporter" listing facts about canal building'],
                  hint: 'Review "First-person narrative" and "Characterization techniques" from Class 10 Hindi.',
                  misconception: 'Students often think the protagonist is merely a "reporter" listing facts about canal building.' }
          ],
            remediations: { 'the-protagonist-is-merely-a': { steps: ['Ask the student to highlight every sentence where the narrator uses "I" (मैं) or expresses an opinion.', 'Have them categorize these into: technical observation, emotional response, philosophical reflection.', 'Discuss how each category builds the character.', 'Then re-read a key passage (e.g., the description of the canal at night) and identify the narrator\'s implicit attitude.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters in "जक्तLFkku dh jtr cw¡nas" are the collective.',
          hint: 'Review "नायक की शिष्य-दृष्टि" (protagonist\'s disciple-gaze) in node 004—specifically how.',
          misconception: 'Students treat supporting characters as "background helpers" who merely execute the protagonist\'s vision.',
          parts: [
                { id: 'a', prompt: 'पाठ में पस्तकाथ (श्रमिक समूह) की पहचान किन तीन विशिष्ट क्रियाओं से होती है जो उनके पारंपरिक ज्ञान को दर्शाती हैं?', answer: 'Correct: (1) ओकाकब्ज निर्माण की लयबद्ध खुदाई-गान, (2) मिट्टी की नमी जांचने की',
                  options: ['Correct: (1) ओकाकब्ज निर्माण की लयबद्ध खुदाई-गान, (2) मिट्टी की नमी जांचने की', 'workers'],
                  hint: 'Review "नायक की शिष्य-दृष्टि" (protagonist\'s disciple-gaze) in node 004—specifically how the author.',
                  misconception: 'Students treat supporting characters as "background helpers" who merely execute the protagonist\'s vision.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Have student re-read paragraphs 9-11 marking every sentence where a villager *teaches* or *decides* vs.', 'where the author *observes*.', 'Create a two-column table: "Villager Agency" (active verbs: सिखाते, तय करते, पूजते) vs.', '"Author Position" (passive/reflexive verbs: देखता, सीखता, समझता).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme is the central, unifying idea or insight about human.',
          hint: 'If stuck, review **c11_hin_v_cbse_02_004 (Character Analysis: Protagonist)** focusing.',
          misconception: 'Students often equate the primary theme with the *most repeated topic* (e.g., "brick-making process" or "hard work.',
          parts: [
                { id: 'a', prompt: 'Compare the depiction of the state (*jktLFkku*) in the title and the final paragraphs.', answer: 'The title promises state power/protection',
                  options: ['The title promises state power/protection', 'labour exploitation', 'state-sanctioned exploitation', 'the chapter is about state kilns'],
                  hint: 'If stuck, review **c11_hin_v_cbse_02_004 (Character Analysis: Protagonist)** focusing on Harkhu’s.',
                  misconception: 'Students often equate the primary theme with the *most repeated topic* (e.g., "brick-making process" or "hard work of labourers") because.' }
          ],
            remediations: { 'students-often-equate-the-primary': { steps: ['**Re-anchor**: Give the student three sentence stems: "The text shows that brick kilns run on ______," "The state\'s.', '**Contrast**: Provide two thematic statements — one topical ("Brick kilns employ migrants"), one analytical ("Migrant.', '**Visual Map**: Draw a 3-circle Venn: Plot Events, Character Choices, Setting Constraints.', 'Place 5 textual details in overlaps.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
