import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch05_p1: SimDef = {
    id: 'v3_c12_hist_ch05_p1',
    title: 'Through the Eyes of Travellers (Al-Biruni, Ibn Battuta, Bernier) · Part 1/2',
    subtitle: 'A hostage wrote the most rigorous book on India',
    classLevel: 12, subject: 'history', topic: 'Through the Eyes of Travellers (Al-Biruni, Ibn Battuta, Bernier) · Part 1/2',
    chapters: ['c12_hist_ch05'],
    nodeIds: ['c12_hist_cbse_05_001', 'c12_hist_cbse_05_002', 'c12_hist_cbse_05_003', 'c12_hist_cbse_05_004', 'c12_hist_cbse_05_005', 'c12_hist_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Comparative-civilisation analyst', intro: 'A polymath arrived in chains and left a proof — India described like a geometry problem.', goal: 'Assess Al-Biruni\'s Kitab-ul-Hind — its structure, its barriers, its Brahmanical lens.' },
    discovery: {
        question: 'Brought to Ghazni as a captive scholar in 1017, Al-Biruni wrote an 80-chapter treatise on India — in Arabic, with a mathematician\'s structure. What made his India different?',
        options: ['Question → Sanskrit sources → cross-cultural comparison, built like a proof; written for frontier peoples who knew Arabic, not Sanskrit', 'A travelogue of wonders', 'Court propaganda', 'Memoir of captivity'],
        answer: 'Question → Sanskrit sources → cross-cultural comparison, built like a proof; written for frontier peoples who knew Arabic, not Sanskrit',
        hook: 'He named his own barriers — Sanskrit\'s vastness, religious difference, local insularity — and read Brahmanical normative texts, which describe ideals, not streets. Knowing the text skews elite is what makes the Kitab-ul-Hind usable, not unusable.',
    },
    teaching: [
        { title: 'Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind', text: 'Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day Uzbekistan) who accompanied Mahmud of Ghazni to India in 1017 CE and authored the *Kitab-ul-Hind*, a comprehensive 80-chapter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Work like a frontier scholar: weigh captivity\'s scholarship, run the three-part chapter structure, and test how far a text-based traveller can be trusted.',
        labels: ['Al-Biruni: Background, Arrival', 'Al-Biruni\'s Method: Sanskrit Learning', 'Al-Biruni on the Caste', 'Al-Biruni\'s Critique of Indian', 'Ibn Battuta: The Rihla', 'Ibn Battuta\'s Observations'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_001', title: 'Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind',
          caseStudy: { intro: 'Imagine you are a Class 12 student visiting the Qutb Minar complex in Delhi and noticing the Iron Pillar — a Gupta-era metallurgical marvel that attracted.',
            decisions: [{ prompt: 'In which year did Sultan Mahmud invade Khwarizm and take Al-Biruni to Ghazni, and what was Al-Biruni’s status upon arrival?', options: [
                { text: '1017 CE; Al-Biruni arrived as a hostage/scholar taken captive along with other poets and', outcome: '1017 CE; Al-Biruni arrived as a hostage/scholar taken captive along with other poets and scholars.' },
                { text: 'he came voluntarily as a courtier', outcome: 'Not quite — Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote.', reveals: 'al-biruni-travelled-widely-across' },
                { text: '1025 CE', outcome: 'Not quite — Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote.', reveals: 'al-biruni-travelled-widely-across' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_002', title: 'Al-Biruni\'s Method: Sanskrit Learning and the Comparative Approach',
          caseStudy: { intro: 'Imagine you are a Class 12 student trying to understand a completely unfamiliar community in a remote village — you cannot just observe; you must learn their.',
            decisions: [{ prompt: 'What were the three "barriers" Al-Biruni explicitly identified as obstructing his understanding of India, and which one did he consider the.', options: [
                { text: 'The three barriers were: (1) language', outcome: 'The three barriers were: (1) language — Sanskrit being vastly different from Arabic/Persian, making.' },
                { text: 'political hostility', outcome: 'Not quite — Students often believe Al-Biruni "learned Sanskrit quickly" or "translated Indian texts directly.', reveals: 'al-biruni-learned-sanskrit-quickly' },
                { text: 'lack of texts', outcome: 'Not quite — Students often believe Al-Biruni "learned Sanskrit quickly" or "translated Indian texts directly.', reveals: 'al-biruni-learned-sanskrit-quickly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_004', title: 'Al-Biruni\'s Critique of Indian Sciences and Panchatantra Translations',
          caseStudy: { intro: 'Imagine you find a 1000-year-old Arabic manuscript in a library that describes Indian astronomy using Greek geometric proofs — how would you know if the.',
            decisions: [{ prompt: 'What were the three specific "barriers" Al-Biruni identified that obstructed understanding of Indian sciences in the *Kitab-ul-Hind*?', options: [
                { text: 'The three barriers Al-Biruni identified were: (1) language', outcome: 'The three barriers Al-Biruni identified were: (1) language — Sanskrit\'s enormous range and.' },
                { text: 'lack of books', outcome: 'Not quite — Students often think Al-Biruni "criticized Indian sciences as backward" — but his critique was.', reveals: 'al-biruni-criticized-indian-sciences' },
                { text: 'political instability', outcome: 'Not quite — Students often think Al-Biruni "criticized Indian sciences as backward" — but his critique was.', reveals: 'al-biruni-criticized-indian-sciences' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_005', title: 'Ibn Battuta: The Rihla and Travels Across the Delhi Sultanate',
          caseStudy: { intro: 'Imagine you are a 14th-century traveller arriving at the gates of Delhi after a 40-day journey from Multan — what would strike you as most extraordinary?',
            decisions: [{ prompt: 'In what year did Ibn Battuta set out from Tangier, and what was his primary motivation for travelling initially?', options: [
                { text: 'Ibn Battuta left Tangier in 1325 CE at age 22, primarily to perform the Hajj (pilgrimage', outcome: 'Ibn Battuta left Tangier in 1325 CE at age 22, primarily to perform the Hajj (pilgrimage to Mecca).' },
                { text: 'he came to India first', outcome: 'Not quite — Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.', reveals: 'ibn-battuta-wrote-the-rihla' },
                { text: 'he was a merchant', outcome: 'Not quite — Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.', reveals: 'ibn-battuta-wrote-the-rihla' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_006', title: 'Ibn Battuta\'s Observations of Delhi Under Muhammad bin Tughlaq',
          caseStudy: { intro: 'Imagine standing at the Badaun Darwaza of 14th-century Delhi — a gate so wide that Ibn Battuta calls it "the greatest" among twenty-eight.',
            decisions: [{ prompt: 'According to Ibn Battuta, how many gates (darwazas) did the city of Delhi have, and which one did he identify as the greatest?', options: [
                { text: 'Delhi had twenty-eight gates', outcome: 'Delhi had twenty-eight gates; the Badaun Darwaza was the greatest.' },
                { text: 'twelve gates', outcome: 'Not quite — Students conflate Ibn Battuta\'s Delhi with Shah Jahan\'s Shahjahanabad (Red Fort, Chandni Chowk.', reveals: 'students-conflate-ibn-battuta-s' },
                { text: 'Lahori Gate', outcome: 'Not quite — Students conflate Ibn Battuta\'s Delhi with Shah Jahan\'s Shahjahanabad (Red Fort, Chandni Chowk.', reveals: 'students-conflate-ibn-battuta-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A journalism intern spends a month documenting an old city quarter — learning the local dialect, living with the community\'s senior priests, and reading only their authorised texts. She submits the piece as \'the definitive inside account.\'',
            decisions: [{ prompt: 'What does Al-Biruni\'s method warn about her account?', options: [
                { text: 'Her access is real but filtered — like Al-Biruni\'s years of Sanskrit with Brahmana scholars, learning the language and texts wins insider categories yet delivers the normative, elite view; the Kitab-ul-Hind maps what the texts prescribe, not what everyone lives.', outcome: 'The chapter\'s double-edged lesson: methodical immersion buys unprecedented access AND builds a bias — dependence on a tradition\'s custodians shows you its rules, not its dissidents, women or variants.' },
                { text: 'Publish it — a month of language and living with insiders makes it the most authentic account possible.', outcome: 'That\'s the confidence Al-Biruni\'s own barriers warn against — he named language, belief and insularity as walls and still only reached what his Brahmana informants could show; depth of access isn\'t breadth of coverage.', reveals: 'insider-access-equals-truth' },
                { text: 'Reject it — an outsider can never say anything true about a community.', outcome: 'Al-Biruni is the counter-example to that despair: his Sanskrit labour produced genuinely insider description; the problem isn\'t being outside but mistaking the gatekeepers\' map for the territory.', reveals: 'outsiders-always-fail' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a medieval treatise as method — and weigh a captive\'s precision against the elite sources he could reach.',
            decisions: [{ prompt: 'What comes next? Through the Eyes of Travellers (Al-Biruni, Ibn Battuta, Bernier) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Through the Eyes of Travellers (Al-Biruni, Ibn Battuta, Bernier) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_001', difficulty: 'standard',
          question: 'Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day.',
          hint: 'Revisit Class 11 node c11_hist_cbse_04_009 (Islamic Contributions to Science, Philosophy.',
          misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.',
          parts: [
                { id: 'a', prompt: 'Why did Al-Biruni choose to write the *Kitab-ul-Hind* in Arabic rather than Persian or Sanskrit, and for whom did he intend it?', answer: 'Arabic was the lingua franca of scholarship across the Islamic world',
                  options: ['Arabic was the lingua franca of scholarship across the Islamic world', 'for the Mughal emperor', 'in Persian because it was the court language', 'travelled widely across India like Ibn Battuta'],
                  hint: 'Revisit Class 11 node c11_hist_cbse_04_009 (Islamic Contributions to Science, Philosophy and.',
                  misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.' }
          ],
            remediations: { 'al-biruni-travelled-widely-across': { steps: ['If the student conflates Al-Biruni’s method with travelogue writing: (1) Re-read NCERT pp.', '115–117, highlighting “Al-Biruni spent years in the company of Brahmana priests… learning Sanskrit” vs.', 'Ibn Battuta’s “travelling overland… reached Sind in 1333.” (2) Create a two-column table: *Textual/scholarly methods*.', '*Observational/itinerant methods* (Ibn Battuta, Bernier).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: “Al-Biruni’s dependence on Brahmanical texts makes the *Kitab-ul-Hind* an unreliable source for understanding actual social practices.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'travelled widely across India like Ibn Battuta', 'travellers'],
                  hint: 'Revisit Class 11 node c11_hist_cbse_04_009 (Islamic Contributions to Science, Philosophy and.',
                  misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.' },
                { id: 'b', prompt: 'Construct a comparative timeline entry for Al-Biruni, Ibn Battuta, and Bernier showing: (a) century of travel, (b) place of origin, (c) language of writing.', answer: '| Traveller | Century | Origin | Language | Motive | Structural Feature |',
                  options: ['| Traveller | Century | Origin | Language | Motive | Structural Feature |', 'travelled widely across India like Ibn Battuta', 'travellers'],
                  hint: 'Revisit Class 11 node c11_hist_cbse_04_009 (Islamic Contributions to Science, Philosophy and.',
                  misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.' }
          ],
            remediations: { 'al-biruni-travelled-widely-across': { steps: ['If the student conflates Al-Biruni’s method with travelogue writing: (1) Re-read NCERT pp.', '115–117, highlighting “Al-Biruni spent years in the company of Brahmana priests… learning Sanskrit” vs.', 'Ibn Battuta’s “travelling overland… reached Sind in 1333.” (2) Create a two-column table: *Textual/scholarly methods*.', '*Observational/itinerant methods* (Ibn Battuta, Bernier).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_002', difficulty: 'standard',
          question: 'Al-Biruni\'s method refers to his systematic approach in the *Kitab-ul-Hind* (c.',
          hint: 'If unclear on Brahmanical textual authority, revisit **c7_hist_ch06_010** (Literature and.',
          misconception: 'Students often believe Al-Biruni "learned Sanskrit quickly" or "translated Indian texts directly into Arabic for Indian.',
          parts: [
                { id: 'a', prompt: 'What were the three "barriers" Al-Biruni explicitly identified as obstructing his understanding of India, and which one did he consider the first?', answer: 'The three barriers were: (1) language',
                  options: ['The three barriers were: (1) language', 'political hostility', 'lack of texts', 'learned Sanskrit quickly'],
                  hint: 'If unclear on Brahmanical textual authority, revisit **c7_hist_ch06_010** (Literature and Learning.',
                  misconception: 'Students often believe Al-Biruni "learned Sanskrit quickly" or "translated Indian texts directly into Arabic for Indian readers.".' },
                { id: 'b', prompt: 'Why did Al-Biruni choose to depend almost exclusively on Brahmana scholars and Brahmanical texts (Vedas, Puranas, Manusmriti) despite being aware of the.', answer: 'Al-Biruni relied on Brahmanas',
                  options: ['Al-Biruni relied on Brahmanas', 'he was biased against Buddhists', 'he didn\'t know other groups existed', 'learned Sanskrit quickly'],
                  hint: 'If unclear on Brahmanical textual authority, revisit **c7_hist_ch06_010** (Literature and Learning.',
                  misconception: 'Students often believe Al-Biruni "learned Sanskrit quickly" or "translated Indian texts directly into Arabic for Indian readers.".' }
          ],
            remediations: { 'al-biruni-learned-sanskrit-quickly': { steps: ['If the student cannot distinguish Al-Biruni’s barriers from his methods, or conflates his comparative parallels with.', '124–125) and list the three barriers with one-line explanations.', '(2) Create a two-column table: Column A = Al-Biruni’s Sanskritic description (e.g., varna origin from Brahman’s body).', '(3) Ask: *Does the comparison explain the Indian phenomenon or translate it for a foreign audience?* (4) Re-attempt.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_003', difficulty: 'standard',
          question: 'Al-Biruni\'s analysis of the caste system in *Kitab-ul-Hind* (c.',
          hint: 'If unclear on varna vs jati or Purusha Sukta, revisit c9_hist_ch3_9 (Class 9 Social.',
          misconception: 'Students frequently believe Al-Biruni "described the caste system as it actually worked in 11th-century villages.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Al-Biruni\'s analysis of the caste system in *Kitab-ul-Hind* (c',
                  options: ['Al-Biruni\'s analysis of the caste system in *Kitab-ul-Hind* (c', 'Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day Uzbekistan) who', 'Al-Biruni\'s method refers to his systematic approach in the *Kitab-ul-Hind* (c', 'Al-Biruni\'s critique of Indian sciences refers to his 11th-century evaluation of Sanskrit'],
                  hint: 'If unclear on varna vs jati or Purusha Sukta, revisit c9_hist_ch3_9 (Class 9 Social Categories.',
                  misconception: 'Students frequently believe Al-Biruni "described the caste system as it actually worked in 11th-century villages." In reality,.' }
          ],
            remediations: { 'students-frequently-believe-al-biruni': { steps: ['If the student conflates textual prescription with social reality: (1) Re-read Source 5 in NCERT (Al-Biruni\'s varna.', '(2) Compare with the NCERT\'s own commentary: "in real life the system was not quite as rigid." (3) Practice writing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_004', difficulty: 'standard',
          question: 'Al-Biruni\'s critique of Indian sciences refers to his 11th-century evaluation.',
          hint: 'Revisit c12_hist_cbse_05_002 and map one chapter of the *Kitab-ul-Hind* (e.g., astronomy).',
          misconception: 'Students often think Al-Biruni "criticized Indian sciences as backward" — but his critique was *specific and.',
          parts: [
                { id: 'a', prompt: 'What were the three specific "barriers" Al-Biruni identified that obstructed understanding of Indian sciences in the *Kitab-ul-Hind*?', answer: 'The three barriers Al-Biruni identified were: (1) language',
                  options: ['The three barriers Al-Biruni identified were: (1) language', 'lack of books', 'political instability', 'criticized Indian sciences as backward'],
                  hint: 'Revisit c12_hist_cbse_05_002 and map one chapter of the *Kitab-ul-Hind* (e.g., astronomy) through.',
                  misconception: 'Students often think Al-Biruni "criticized Indian sciences as backward" — but his critique was *specific and technical*: he faulted Indian.' }
          ],
            remediations: { 'al-biruni-criticized-indian-sciences': { steps: ['If the student holds the "Al-Biruni dismissed Indian science" misconception: (1) Re-read NCERT Source 1 (Al-Biruni\'s.', '(2) Compare his translation of Patanjali (linguistic respect) with his skepticism of the wooden idol (empirical test).', '(3) Complete a two-column table: "Al-Biruni\'s Criticisms" vs "Al-Biruni\'s Admirations" using the *Kitab-ul-Hind*.', '(4) Re-attempt Diagnostic Question 4 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_005', difficulty: 'standard',
          question: 'Ibn Battuta (1304–1377) was a Moroccan scholar and explorer whose travelogue.',
          hint: 'Revisit c6_history_ch07_023 (Administration Under the Delhi Sultanate) and.',
          misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.',
          parts: [
                { id: 'a', prompt: 'Why did Muhammad bin Tughlaq appoint Ibn Battuta as *qazi* of Delhi, and what does this reveal about the Sultan’s court?', answer: 'The Sultan was impressed by Ibn Battuta’s scholarly credentials in Islamic law',
                  options: ['The Sultan was impressed by Ibn Battuta’s scholarly credentials in Islamic law', 'because he was a spy', 'he bought the post', 'Ibn Battuta wrote the *Rihla* himself as a daily diary'],
                  hint: 'Revisit c6_history_ch07_023 (Administration Under the Delhi Sultanate) and c7_hist_ch07_007.',
                  misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.' },
                { id: 'b', prompt: 'Ibn Battuta describes the *dawa* (foot-post) system as having runners stationed every one-third of a mile (*dawa*) with bells on their rods.', answer: '1,100 km = 1,100,000 m',
                  options: ['1,100 km = 1,100,000 m', 'Ibn Battuta wrote the *Rihla* himself as a daily diary'],
                  hint: 'Revisit c6_history_ch07_023 (Administration Under the Delhi Sultanate) and c7_hist_ch07_007.',
                  misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.' }
          ],
            remediations: { 'ibn-battuta-wrote-the-rihla': { steps: ['Re-read the NCERT excerpt "Education and entertainment" (Source 3, p.', '121) where Ibn Juzayy explains the ruler’s command to record "cities seen, interesting events, rulers, scholars.', 'Then watch the 5-minute video "How the Rihla was written" (search: *Ibn Juzayy Rihla compilation*).', 'Finally, attempt Diagnostic Question 5 again, explicitly framing the answer around "dictated memory vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_006', difficulty: 'standard',
          question: 'Ibn Battuta\'s observations of Delhi under Muhammad bin Tughlaq (c.',
          hint: 'If unclear on Tughlaq\'s experiments, revisit c8_hist_ch1_5 (Class 8 Tughlaq node) and.',
          misconception: 'Students conflate Ibn Battuta\'s Delhi with Shah Jahan\'s Shahjahanabad (Red Fort, Chandni Chowk, Jama Masjid), assuming.',
          parts: [
                { id: 'a', prompt: 'According to Ibn Battuta, how many gates (darwazas) did the city of Delhi have, and which one did he identify as the greatest?', answer: 'Delhi had twenty-eight gates',
                  options: ['Delhi had twenty-eight gates', 'twelve gates', 'Lahori Gate'],
                  hint: 'If unclear on Tughlaq\'s experiments, revisit c8_hist_ch1_5 (Class 8 Tughlaq node) and.',
                  misconception: 'Students conflate Ibn Battuta\'s Delhi with Shah Jahan\'s Shahjahanabad (Red Fort, Chandni Chowk, Jama Masjid), assuming the 14th-century.' }
          ],
            remediations: { 'students-conflate-ibn-battuta-s': { steps: ['Re-read Source 8 (Delhi description) and Source 9 (Daulatabad bazaar) in NCERT, marking every architectural term.', 'Revisit c8_hist_ch1_5 (Tughlaq experiments) to map Ibn Battuta\'s observations onto Muhammad bin Tughlaq\'s known.', 'Complete a two-column table: "What Ibn Battuta SEES" vs "What he INFERS" — this separates observation from.', 'Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
