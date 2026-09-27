import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch11_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch11_p2',
    title: 'बाज़ार दर्शन · Part 2/3',
    subtitle: 'The blind man saw the truth; the sighted chose the well',
    classLevel: 12, subject: 'hin_ar', topic: 'बाज़ार दर्शन · Part 2/3',
    chapters: ['c12_hin_ar_ch11'],
    nodeIds: ['c12_hin_ar_cbse_11_007', 'c12_hin_ar_cbse_11_008', 'c12_hin_ar_cbse_11_009', 'c12_hin_ar_cbse_11_010', 'c12_hin_ar_cbse_11_011', 'c12_hin_ar_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Psychoanalytic fiction reader', intro: 'A beggar who cannot see meets a society that refuses to. The story asks whose blindness is real.', goal: 'Read Bazar Darshan through psychoanalytic realism — blindness as epistemological and political condition.' },
    discovery: {
        question: 'A blind beggar is cheated because he can\'t see — but the story insists the real blindness belongs to everyone else. Blindness as what, then?',
        options: ['Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces', 'Poor eyesight only', 'Fate\'s cruelty', 'A medical condition'],
        answer: 'Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces',
        hook: 'This is the psychoanalytic turn in Hindi fiction — after Premchand\'s social realism came Jainendra\'s probe of the unconscious, where blindness is imposed by power and kept by utilitarian logic. The beggar isn\'t a pitiable character; he\'s the site where ideology does its violence.',
    },
    teaching: [
        { title: 'बाज़ार दर्शन — गौण विषय', text: 'गौण विषय (Sub-theme) कथा/उपन्यास में वह द्वितीयक केंद्रीय विचार या प्रसंग है जो मुख्य विषय के समानांतर चलता हुआ उसे विस्तार, गहराई, विरोधाभास या पूरकता प्रदान करता है तथा कथानक को बहु-आयामी बनाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['बाज़ार दर्शन — गौण', 'बाज़ार दर्शन — साहित्यिक', 'बाज़ार दर्शन — पदावली', 'बाज़ार दर्शन — व्याकरण', 'बाज़ार दर्शन — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_ar_cbse_11_010', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['तीनों प्रसंग चिह्नित करें जहाँ \'ग्राहक\' आया है — संबोधन.', 'प्रत्येक प्रसंग का **वक्ता (speaker)**, **श्रोता.', 'प्रसंग 1 में \'ग्राहक\' = **व्यावसायिक भूमिका (commercial.', 'प्रसंग 2 में \'ग्राहक\' = **अस्वीकृत पहचान (rejected.', 'प्रसंग 3 में \'ग्राहक\' = **अपमानजनक लेबल (derogatory.'], answer: 'तीनों प्रसंग चिह्नित करें जहाँ \'ग्राहक\' आया है — संबोधन. प्रत्येक प्रसंग का **वक्ता (speaker)**, **श्रोता. प्रसंग 1 में \'ग्राहक\' = **व्यावसायिक भूमिका (commercial. प्रसंग 2 में \'ग्राहक\' = **अस्वीकृत पहचान (rejected. प्रसंग 3 में \'ग्राहक\' = **अपमानजनक लेबल (derogatory.' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate pays a \'career guru\' who diagnoses his low marks as a family curse and prescribes an absurd regime — copying his ancestors\' names 500 times. He complied for a month, then quietly stopped going. He\'s still failing.',
            decisions: [{ prompt: 'What does Nirala\'s \'खुजली उखाड़ जासा\' read in this episode?', options: [
                { text: 'The story ends where it began — the patient flees still itching; walking away from a bogus authority returns you to the problem untouched. The satire is that individual escape doesn\'t cure a systemic absurdity — question the prescription, don\'t just flee the clinic.', outcome: 'The circular structure — opening and closing on the itch — exists to show the quest was futile; his problem survives the guru because it was never the itch being treated.' },
                { text: 'At least he escaped before worse harm — quietly quitting was the smart move.', outcome: 'Escape isn\'t the story\'s victory — the patient who runs is still scratching on the last page; leaving the fraud unexamined leaves both the itch and the marketplace of absurd cures intact.', reveals: 'escape-equals-solution' },
                { text: 'The guru\'s method was sound in principle — he just needed to persist longer for results.', outcome: 'That\'s the blind faith in authority the story skewers: the diagnosis was theatrical nonsense from the start, and more obedience only deepens the farce.', reveals: 'persist-with-absurdity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read blindness as a social instrument — and catch the moment a story stops being about a beggar and starts being about us.',
            decisions: [{ prompt: 'What comes next? बाज़ार दर्शन · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बाज़ार दर्शन · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथा/उपन्यास में वह द्वितीयक केंद्रीय विचार या प्रसंग है जो.',
          hint: 'यदि \'गौण विषय की पहचान\' में अटके — कक्षा 11 के किसी भी \'गौण विषय\' नोड (जैसे.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है **\'कम शब्दों में निपटा दिया गया विषय\'** या **\'कहानी के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथा/उपन्यास में वह द्वितीयक केंद्रीय विचार या प्रसंग है जो मुख्य',
                  options: ['गौण विषय (Sub-theme) कथा/उपन्यास में वह द्वितीयक केंद्रीय विचार या प्रसंग है जो मुख्य', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि \'गौण विषय की पहचान\' में अटके — कक्षा 11 के किसी भी \'गौण विषय\' नोड (जैसे c11_hin_ar_cbse_11_007).',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है **\'कम शब्दों में निपटा दिया गया विषय\'** या **\'कहानी के किनारे का प्रसंग\'**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** छात्र को उपन्यास के **अध्याय 4, 7, 12, 15** (या शिक्षक द्वारा चिह्नित प्रसंग) दें जहां गौण विषय.', '**मैपिंग अभ्यास:** एक शीट पर बीच में **\'बाज़ारवाद\'** लिखें, चारों ओर गौण विषयों के बुलबुले बनाएं। **तीर खींचकर** लिखें.', '**उत्तर-लेखन अभ्यास:** एक प्रश्न दें: "ग्रामीण विघटन गौण विषय है — सिद्ध करें।" छात्र लिखे, फिर **स्व-मूल्यांकन** करे.', '**पुनः निदान:** उपरोक्त **DIAGNOSTIC_QUESTION_3** जैसा एक नया अंश देकर विश्लेषण करवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_008', difficulty: 'standard',
          question: 'बिंब वह प्रत्यक्ष संवेदनात्मक विवरण है जो पाठ में दृष्टि, श्रवण, स्पर्श आदि.',
          hint: 'यदि बिंब और रूपक के अंतर में भ्रम हो तो कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और रूपक.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई वाक्य में "जैसे" या "तो" शब्द मौजूद है तो वह अवश्य रूपक है, और यदि इन शब्दों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह प्रत्यक्ष संवेदनात्मक विवरण है जो पाठ में दृष्टि, श्रवण, स्पर्श आदि द्वारा अनुभव',
                  options: ['बिंब वह प्रत्यक्ष संवेदनात्मक विवरण है जो पाठ में दृष्टि, श्रवण, स्पर्श आदि द्वारा अनुभव', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि बिंब और रूपक के अंतर में भ्रम हो तो कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और रूपक.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई वाक्य में "जैसे" या "तो" शब्द मौजूद है तो वह अवश्य रूपक है, और यदि इन शब्दों की अनुपस्थिति है तो वह अवश्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले पाठ से दो वाक्य दीजिए — एक स्पष्ट बिंब ("बाज़ार में हरी मिर्च की तलवारें लटक रही थीं") और एक स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_009', difficulty: 'standard',
          question: '**विरोधाभास** (Paradox) वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी प्रतीत.',
          hint: 'यदि फँसें तो **c11_hin_ar_cbse_11_009** (कक्षा 11, पाठ 11, साहित्यिक युक्तियाँ: विरोधाभास.',
          misconception: '**सबसे घातक भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी पदयुग्म (Oxymoron)** समझ लेते हैं — जैसे "मधुर कड़वाहट" — और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** (Paradox) वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी प्रतीत होने वाले',
                  options: ['**विरोधाभास** (Paradox) वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी प्रतीत होने वाले', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि फँसें तो **c11_hin_ar_cbse_11_009** (कक्षा 11, पाठ 11, साहित्यिक युक्तियाँ: विरोधाभास और.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी पदयुग्म (Oxymoron)** समझ लेते हैं — जैसे "मधुर कड़वाहट" — और समझते हैं कि बस दो.' }
          ],
            remediations: { 'oxymoron-statement-situational': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का वह अंश खोलो जहाँ \'स्वदेशी बोर्ड पर विदेशी माल\' आए। केवल दो वाक्य लिखो: (क) यहाँ क्या.', '(ख) यह विरोध *क्या सत्य खोलता है*?" — यदि (ख) न दे पाए, तो विरोधाभास की **सत्योद्घाटन भूमिका** स्पष्ट करें। **चरण 2:**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द refers to the curated list of significant, context-specific.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_11_010** (कक्षा 11 आरोह पाठ 11 की पदावली) के "संदर्भ-आधारित.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पदावली: मुख्य शब्द" का अर्थ है — कहानी में आए **कठिन/अनजाने शब्दों की सूची**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द refers to the curated list of significant, context-specific, and often',
                  options: ['पदावली: मुख्य शब्द refers to the curated list of significant, context-specific, and often', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_11_010** (कक्षा 11 आरोह पाठ 11 की पदावली) के "संदर्भ-आधारित.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पदावली: मुख्य शब्द" का अर्थ है — कहानी में आए **कठिन/अनजाने शब्दों की सूची** बनाना और उनके.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्निदान (Re-diagnose):** छात्र से कहें — "कहानी के किसी भी पृष्ठ से 3 ऐसे शब्द छाँटो जो \'आसान\' लगते हैं लेकिन.', '**लक्षित पुनर्शिक्षण (Targeted reteaching):** उसे **c11_hin_ar_cbse_11_010** (कक्षा 11 की इसी पाठ की पदावली) पर लौटाएँ.', '**अभ्यास कार्य:** उसे एक पैराग्राफ दें जहाँ \'संस्कृति\' शब्द 3 बार अलग-अलग अर्थों में आया हो — उसे प्रत्येक प्रसंग में.', '**पुनर्मूल्यांकन:** अगले सप्ताह DIAGNOSTIC_QUESTION_2 जैसा एक नया प्रश्न दें — यदि वह \'मूल्य\' के दो अर्थ सही अलग करता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग refers to the systematic analysis of an author\'s linguistic choices.',
          hint: 'If classification is shaky, revisit c11_hin_ar_cbse_01_011 (Class 11 grammar basics) and.',
          misconception: 'Students treat "भाषा-प्रयोग" as a vocabulary-listing exercise: they highlight difficult words, label them तत्सम/तद्भव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग refers to the systematic analysis of an author\'s linguistic choices',
                  options: ['भाषा-प्रयोग refers to the systematic analysis of an author\'s linguistic choices', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'If classification is shaky, revisit c11_hin_ar_cbse_01_011 (Class 11 grammar basics) and practice.',
                  misconception: 'Students treat "भाषा-प्रयोग" as a vocabulary-listing exercise: they highlight difficult words, label them तत्सम/तद्भव, and stop.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['If a student cannot move beyond word-listing: (1) Give them a 3-sentence micro-passage from the text.', '(2) Ask: "Change ONLY the तत्सम words to तद्भव synonyms.', 'satire?" (3) Repeat with sentence structure: "Convert the mixed sentence to two simple sentences.', 'What logic is lost?" (4) Finally: "Now write 3 lines explaining how the ORIGINAL choices serve the author\'s purpose.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं.',
          hint: 'यदि आशय-सूचक प्रश्न बनाने/हल करने में अटकें, तो c12_hin_ar_cbse_11_006 (मुख्य विषय) और.',
          misconception: 'छात्र समझते हैं कि \'आशय-सूचक\' प्रश्नों का उत्तर पाठ में कहीं \'छिपा\' होता है जिसे ढूंढकर निकालना है — जैसे खजाने की खोज।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective questions) पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं, पात्रों या',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective questions) पाठ में दिए गए स्पष्ट तथ्यों, घटनाओं, पात्रों या', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि आशय-सूचक प्रश्न बनाने/हल करने में अटकें, तो c12_hin_ar_cbse_11_006 (मुख्य विषय) और.',
                  misconception: 'छात्र समझते हैं कि \'आशय-सूचक\' प्रश्नों का उत्तर पाठ में कहीं \'छिपा\' होता है जिसे ढूंढकर निकालना है — जैसे खजाने की खोज। वास्तव में, आशय पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 5 वस्तुनिष्ठ और 5 आशय-सूचक प्रश्नों की मिश्रित सूची दें; उसे 🎯/🧩 लेबल लगाने को कहें। गलती होने पर, प्रत्येक.', 'एक आशय-सूचक प्रश्न लें; छात्र से कहें: "पाठ से **तीन** अलग-अलग वाक्य/वाक्यांश ढूंढो जो तुम्हारे उत्तर का आधार बनते.', 'पुनः निदान: c12_hin_ar_cbse_11_012 के DIAGNOSTIC_QUESTION_3 जैसा नया अंश देकर दावा-साक्ष्य-तर्क लिखने को कहें। सफलता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
