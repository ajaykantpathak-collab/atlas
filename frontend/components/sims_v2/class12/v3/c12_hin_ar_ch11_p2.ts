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
        { title: 'बाज़ार दर्शन — गौण विषय', text: '\'करुणा का नायक\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['बाज़ार दर्शन — गौण', 'बाज़ार दर्शन — साहित्यिक', 'बाज़ार दर्शन — पदावली', 'बाज़ार दर्शन — व्याकरण', 'बाज़ार दर्शन — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_009', title: 'बाज़ार दर्शन — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'करुणा का नायक\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define verbal irony and give one example from "cktkj n\'kZu" where a character says something but means the opposite.', options: [
                { text: 'Verbal irony occurs when a speaker\'s intended meaning is the opposite of the literal', outcome: 'Verbal irony occurs when a speaker\'s intended meaning is the opposite of the literal words spoken.' },
                { text: 'unexpected outcome', outcome: 'Not quite — Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this.', reveals: 'irony-is-just-unexpected-outcome' },
                { text: 'object = idea', outcome: 'Not quite — Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this.', reveals: 'irony-is-just-unexpected-outcome' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_012', title: 'बाज़ार दर्शन — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'करुणा का नायक\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'करुणा का नायक\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: 'Identify the two main characters in the dialogue of "cktkj n\'kZu" and state the central topic of their conversation.', options: [
                { text: 'The two main characters are माँ (mother) and बेटा (son)', outcome: 'The two main characters are माँ (mother) and बेटा (son). The central topic is debt (ck”kkज) — its.' },
                { text: '\'Hkkxr th\' as a character', outcome: 'Not quite — Students treat inferential questions as \'guessing games\' and write personal opinions without.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
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
          question: '\'करुणा का नायक\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि \'गौण विषय की पहचान\' में अटके — कक्षा 11 के किसी भी \'गौण विषय\' नोड (जैसे.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है **\'कम शब्दों में निपटा दिया गया विषय\'** या **\'कहानी के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' के गौण विषय',
                  options: ['\'करुणा का नायक\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि \'गौण विषय की पहचान\' में अटके — कक्षा 11 के किसी भी \'गौण विषय\' नोड (जैसे c11_hin_ar_cbse_11_007).',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है **\'कम शब्दों में निपटा दिया गया विषय\'** या **\'कहानी के किनारे का प्रसंग\'**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** छात्र को उपन्यास के **अध्याय 4, 7, 12, 15** (या शिक्षक द्वारा चिह्नित प्रसंग) दें जहां गौण विषय.', '**मैपिंग अभ्यास:** एक शीट पर बीच में **\'बाज़ारवाद\'** लिखें, चारों ओर गौण विषयों के बुलबुले बनाएं। **तीर खींचकर** लिखें.', '**उत्तर-लेखन अभ्यास:** एक प्रश्न दें: "ग्रामीण विघटन गौण विषय है — सिद्ध करें।" छात्र लिखे, फिर **स्व-मूल्यांकन** करे.', '**पुनः निदान:** उपरोक्त **DIAGNOSTIC_QUESTION_3** जैसा एक नया अंश देकर विश्लेषण करवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_008', difficulty: 'standard',
          question: '\'करुणा का नायक\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि बिंब और रूपक के अंतर में भ्रम हो तो कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और रूपक.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई वाक्य में "जैसे" या "तो" शब्द मौजूद है तो वह अवश्य रूपक है, और यदि इन शब्दों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' में बिंब (imagery)',
                  options: ['\'करुणा का नायक\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि बिंब और रूपक के अंतर में भ्रम हो तो कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और रूपक.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई वाक्य में "जैसे" या "तो" शब्द मौजूद है तो वह अवश्य रूपक है, और यदि इन शब्दों की अनुपस्थिति है तो वह अवश्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले पाठ से दो वाक्य दीजिए — एक स्पष्ट बिंब ("बाज़ार में हरी मिर्च की तलवारें लटक रही थीं") और एक स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_009', difficulty: 'standard',
          question: '\'करुणा का नायक\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If unable to spot irony, review the definition of situational irony.',
          misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' में विरोधाभास',
                  options: ['\'करुणा का नायक\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If unable to spot irony, review the definition of situational irony in c11_hin_ar_cbse_11_009 and.',
                  misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that Hkxr th\'s verbal.' }
          ],
            remediations: { 'irony-is-just-unexpected-outcome': { steps: ['Re-read the climax scene (fair episode) aloud, marking every statement Hkxr th makes about his nose — label each.', 'List three things the nose could symbolize (pride, identity, social mask) and find one textual moment for each.', 'Write a 3-sentence explanation of how the irony in the climax *enacts* the symbolism.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The story uses irony only for humor; its symbolism is heavy-handed." Defend or refute with two specific textual reasons.', answer: 'Refute',
                  options: ['Refute', 'unexpected outcome', 'object = idea', 'irony is just "unexpected outcome" and symbolism is "object = idea'],
                  hint: 'If unable to spot irony, review the definition of situational irony in c11_hin_ar_cbse_11_009 and.',
                  misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that Hkxr th\'s verbal.' },
                { id: 'b', prompt: 'Write a 4-line paragraph continuing the story after Hkxr th loses his nose, using one ironic statement and one new symbol to show his changed perspective.', answer: 'A strong response might have Hkxr th say, "Now I truly have the perfect nose',
                  options: ['A strong response might have Hkxr th say, "Now I truly have the perfect nose', 'unexpected outcome', 'object = idea', 'irony is just "unexpected outcome" and symbolism is "object = idea'],
                  hint: 'If unable to spot irony, review the definition of situational irony in c11_hin_ar_cbse_11_009 and.',
                  misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that Hkxr th\'s verbal.' }
          ],
            remediations: { 'irony-is-just-unexpected-outcome': { steps: ['Re-read the climax scene (fair episode) aloud, marking every statement Hkxr th makes about his nose — label each.', 'List three things the nose could symbolize (pride, identity, social mask) and find one textual moment for each.', 'Write a 3-sentence explanation of how the irony in the climax *enacts* the symbolism.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_010', difficulty: 'standard',
          question: '\'करुणा का नायक\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_11_010** (कक्षा 11 आरोह पाठ 11 की पदावली) के "संदर्भ-आधारित.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पदावली: मुख्य शब्द" का अर्थ है — कहानी में आए **कठिन/अनजाने शब्दों की सूची**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' की पदावली',
                  options: ['\'करुणा का नायक\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_11_010** (कक्षा 11 आरोह पाठ 11 की पदावली) के "संदर्भ-आधारित.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पदावली: मुख्य शब्द" का अर्थ है — कहानी में आए **कठिन/अनजाने शब्दों की सूची** बनाना और उनके.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्निदान (Re-diagnose):** छात्र से कहें — "कहानी के किसी भी पृष्ठ से 3 ऐसे शब्द छाँटो जो \'आसान\' लगते हैं लेकिन.', '**लक्षित पुनर्शिक्षण (Targeted reteaching):** उसे **c11_hin_ar_cbse_11_010** (कक्षा 11 की इसी पाठ की पदावली) पर लौटाएँ.', '**अभ्यास कार्य:** उसे एक पैराग्राफ दें जहाँ \'संस्कृति\' शब्द 3 बार अलग-अलग अर्थों में आया हो — उसे प्रत्येक प्रसंग में.', '**पुनर्मूल्यांकन:** अगले सप्ताह DIAGNOSTIC_QUESTION_2 जैसा एक नया प्रश्न दें — यदि वह \'मूल्य\' के दो अर्थ सही अलग करता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_011', difficulty: 'standard',
          question: '\'करुणा का नायक\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'If stuck, review Class 11 Aroh Chapter 11 Grammar node (c11_hin_ar_cbse_11_011).',
          misconception: 'Students treat "language usage" as identifying isolated grammatical terms (e.g., "this is a compound sentence") without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' में भाषा-प्रयोग',
                  options: ['\'करुणा का नायक\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 11 Grammar node (c11_hin_ar_cbse_11_011) — specifically the.',
                  misconception: 'Students treat "language usage" as identifying isolated grammatical terms (e.g., "this is a compound sentence") without linking form.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['Re-read only the mother\'s dialogues aloud, marking every sentence-final particle (घ, ही, तो, ना).', 'For each, ask "What would be lost if this particle were removed?" — write the answer in one phrase (e.g., "finality".', 'Compare three narrator sentences with three mother sentences — tabulate: avg.', 'Re-attempt Diagnostic Q2 with this data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_012', difficulty: 'standard',
          question: '\'करुणा का नायक\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, revisit the \'vH;kl\' (exercise) questions at the end of the chapter — Questions.',
          misconception: 'Students treat inferential questions as \'guessing games\' and write personal opinions without textual anchoring.',
          parts: [
                { id: 'a', prompt: 'Identify the two main characters in the dialogue of "cktkj n\'kZu" and state the central topic of their conversation.', answer: 'The two main characters are माँ (mother) and बेटा (son)',
                  options: ['The two main characters are माँ (mother) and बेटा (son)', '\'Hkkxr th\' as a character'],
                  hint: 'If stuck, revisit the \'vH;kl\' (exercise) questions at the end of the chapter — Questions 1 and 3.',
                  misconception: 'Students treat inferential questions as \'guessing games\' and write personal opinions without textual anchoring.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Have the student re-read only the dialogue sections (marked by "eSaus dgkµ", "cksysµ") and highlight every explicit.', 'For each highlight, ask: "What is the speaker NOT saying directly but implying?" 3.', 'Practice converting 3 literal questions from the textbook (vH;kl section) into inferential ones by adding "What does.', 'Re-attempt Diagnostic Question 3 with the PEEL template provided in Worked Example 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
