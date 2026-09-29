import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p3',
    title: 'आओ, मलिकर बचाएँ · Part 3/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'आओ, मलिकर बचाएँ · Part 3/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_013', 'c11_hin_ar_cbse_16_014', 'c11_hin_ar_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'आओ, मलिकर बचाएँ — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'वक्वक्स] फेद्ज च्प्क,¡\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['आओ, मलिकर बचाएँ —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_014', title: 'आओ, मलिकर बचाएँ — परीक्षा-उत्तर लेखन कौशल',
          caseStudy: { intro: '\'वक्वक्स] फेद्ज च्प्क,¡\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Conclusion', outcome: 'Not quite — Students believe that writing a good literature answer means paraphrasing the poem/story in their.', reveals: 'writing-a-good-literature-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_015', title: 'आओ, मलिकर बचाएँ — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: '\'वक्वक्स] फेद्ज च्प्क,¡\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What are the two main components of the \'Speaking and Listening\' activity for this poem as per the textbook exercise?', options: [
                { text: 'The two main components are: (1) answering the given questions (vH;kl)', outcome: 'The two main components are: (1) answering the given questions (vH;kl) which test comprehension and.' },
                { text: 'a discussion is just taking turns answering the textbook questions', outcome: 'Not quite — Students think a discussion is just taking turns answering the textbook questions.', reveals: 'a-discussion-is-just-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_013', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि अटके हों तो c11_hin_ar_cbse_16_006 और c11_hin_ar_cbse_16_007 के "युक्ति-पहचान अभ्यास".',
          misconception: 'छात्र प्रायः मानते हैं कि आशय-स्पष्टीकरण में **कठिन शब्दों का अर्थ लिखना** या **पंक्तियों का क्रमवार अनुवाद** करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' का आलोचनात्मक चिंतन',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके हों तो c11_hin_ar_cbse_16_006 और c11_hin_ar_cbse_16_007 के "युक्ति-पहचान अभ्यास" दोहराएँ.',
                  misconception: 'छात्र प्रायः मानते हैं कि आशय-स्पष्टीकरण में **कठिन शब्दों का अर्थ लिखना** या **पंक्तियों का क्रमवार अनुवाद** करना पर्याप्त है। वे "कवि.' }
          ],
            remediations: { 'content': { steps: ['**पृथक्करण अभ्यास:** छात्र से एक ही पंक्ति का पहले "भावार्थ" लिखवाएँ, फिर "आशय" — दोनों को आमने-सामने रखकर अंतर स्पष्ट.', '**उपकरण-प्रभाव श्रृंखला (Device→Effect→Meaning):** एक टेबल बनवाएँ: कॉलम 1 — युक्ति (रूपक/अनुप्रास/प्रतीक), कॉलम 2.', '**मॉडल उत्तर विश्लेषण:** बोर्ड के आदर्श उत्तर (model answer) देकर उसमें **तीन चालें** (contextualization, device-chain.', '**मौखिक रिहर्सल:** छात्र से कहें — "मानो तुम कवि हो, समझाओ तुमने यह रूपक *यहाँ* क्यों रखा?" — यह भूमिका-परिवर्तन (role.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_014', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" (008) and "Critical.',
          misconception: 'Students believe that writing a good literature answer means paraphrasing the poem/story in their own words and adding.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Conclusion'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" (008) and "Critical Thinking.',
                  misconception: 'Students believe that writing a good literature answer means paraphrasing the poem/story in their own words and adding a moral lesson.' }
          ],
            remediations: { 'writing-a-good-literature-answer': { steps: ['If a student produces summary instead of analysis: 1) Give them a 3-mark question and ask them to highlight every.', '2) They will see mostly yellow (summary) with little green/blue/pink.', '3) Have them rewrite ONLY the blue and pink sentences first, forcing analytical thinking.', '4) Then insert green evidence from the text to support each blue sentence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_015', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'Review the imagery and metaphor analysis (c11_hin_ar_cbse_16_008) and the critical.',
          misconception: 'Students think a discussion is just taking turns answering the textbook questions.',
          parts: [
                { id: 'a', prompt: 'What are the two main components of the \'Speaking and Listening\' activity for this poem as per the textbook exercise?', answer: 'The two main components are: (1) answering the given questions (vH;kl)',
                  options: ['The two main components are: (1) answering the given questions (vH;kl)', 'a discussion is just taking turns answering the textbook questions'],
                  hint: 'Review the imagery and metaphor analysis (c11_hin_ar_cbse_16_008) and the critical thinking.',
                  misconception: 'Students think a discussion is just taking turns answering the textbook questions.' },
                { id: 'b', prompt: 'Explain in your own words why the poet uses the metaphor of \'ekVh dk jax\' (color of the past) and what it suggests about memory.', answer: 'The metaphor suggests that memories are not neutral',
                  options: ['The metaphor suggests that memories are not neutral', 'a discussion is just taking turns answering the textbook questions'],
                  hint: 'Review the imagery and metaphor analysis (c11_hin_ar_cbse_16_008) and the critical thinking.',
                  misconception: 'Students think a discussion is just taking turns answering the textbook questions.' },
                { id: 'c', prompt: 'Using the PEEL structure (Point, Evidence, Explanation, Link), prepare a 1-minute oral response to Question 3: "Why is the poet compelled to accept both.', answer: 'Step 1: Point - The poet says we must accept pain and struggle along with joy',
                  options: ['Step 1: Point - The poet says we must accept pain and struggle along with joy', 'a discussion is just taking turns answering the textbook questions'],
                  hint: 'Review the imagery and metaphor analysis (c11_hin_ar_cbse_16_008) and the critical thinking.',
                  misconception: 'Students think a discussion is just taking turns answering the textbook questions.' }
          ],
            remediations: { 'a-discussion-is-just-taking': { steps: ['Model a fishbowl discussion: teacher and a student demonstrate responding to each other\'s points using "I agree with.', 'Give students sentence stems: "The line \'...\' supports your point because...", "I see it differently: the metaphor.', 'Practice with a low-stakes topic first (e.g., "Best memory of school") using the stems, then transfer to the poem.', 'Debrief: what made the discussion flow?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think a discussion is just taking turns answering the textbook questions.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The poem\'s discussion points are only relevant for students from joint families." Defend your view with textual evidence.', answer: 'The statement is false',
                  options: ['The statement is false', 'a discussion is just taking turns answering the textbook questions'],
                  hint: 'Review the imagery and metaphor analysis (c11_hin_ar_cbse_16_008) and the critical thinking.',
                  misconception: 'Students think a discussion is just taking turns answering the textbook questions.' },
                { id: 'b', prompt: 'Create a new discussion question for this poem that would encourage a debate between two students with opposing views.', answer: 'Question: "Does the poem suggest that we should actively seek pain (vD[kM+iu) to',
                  options: ['Question: "Does the poem suggest that we should actively seek pain (vD[kM+iu) to', 'a discussion is just taking turns answering the textbook questions'],
                  hint: 'Review the imagery and metaphor analysis (c11_hin_ar_cbse_16_008) and the critical thinking.',
                  misconception: 'Students think a discussion is just taking turns answering the textbook questions.' }
          ],
            remediations: { 'a-discussion-is-just-taking': { steps: ['Model a fishbowl discussion: teacher and a student demonstrate responding to each other\'s points using "I agree with.', 'Give students sentence stems: "The line \'...\' supports your point because...", "I see it differently: the metaphor.', 'Practice with a low-stakes topic first (e.g., "Best memory of school") using the stems, then transfer to the poem.', 'Debrief: what made the discussion flow?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
