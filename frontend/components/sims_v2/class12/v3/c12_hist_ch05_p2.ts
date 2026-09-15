import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch05_p2: SimDef = {
    id: 'v3_c12_hist_ch05_p2',
    title: 'Through the Eyes of Travellers (Al-Biruni, Ibn Battuta, Bernier) · Part 2/2',
    subtitle: 'A hostage wrote the most rigorous book on India',
    classLevel: 12, subject: 'history', topic: 'Through the Eyes of Travellers (Al-Biruni, Ibn Battuta, Bernier) · Part 2/2',
    chapters: ['c12_hist_ch05'],
    nodeIds: ['c12_hist_cbse_05_007', 'c12_hist_cbse_05_008', 'c12_hist_cbse_05_009', 'c12_hist_cbse_05_010', 'c12_hist_cbse_05_011', 'c12_hist_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Comparative-civilisation analyst', intro: 'A polymath arrived in chains and left a proof — India described like a geometry problem.', goal: 'Assess Al-Biruni\'s Kitab-ul-Hind — its structure, its barriers, its Brahmanical lens.' },
    discovery: {
        question: 'Brought to Ghazni as a captive scholar in 1017, Al-Biruni wrote an 80-chapter treatise on India — in Arabic, with a mathematician\'s structure. What made his India different?',
        options: ['Question → Sanskrit sources → cross-cultural comparison, built like a proof; written for frontier peoples who knew Arabic, not Sanskrit', 'A travelogue of wonders', 'Court propaganda', 'Memoir of captivity'],
        answer: 'Question → Sanskrit sources → cross-cultural comparison, built like a proof; written for frontier peoples who knew Arabic, not Sanskrit',
        hook: 'He named his own barriers — Sanskrit\'s vastness, religious difference, local insularity — and read Brahmanical normative texts, which describe ideals, not streets. Knowing the text skews elite is what makes the Kitab-ul-Hind usable, not unusable.',
    },
    teaching: [
        { title: 'Ibn Battuta on Indian Towns, Bazaars and the Coconut Economy', text: 'Ibn Battuta\'s account of 14th-century Indian towns, bazaars, and the coconut economy refers to the Moroccan traveller\'s detailed observations in his *Rihla* (1333-1347 CE) of urban life under the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Work like a frontier scholar: weigh captivity\'s scholarship, run the three-part chapter structure, and test how far a text-based traveller can be trusted.',
        labels: ['Ibn Battuta on Indian', 'Ibn Battuta on', 'Francois Bernier: Travels', 'Bernier\'s Critique: Property Rights', 'Bernier on the Decline', 'Comparing the Three Travellers'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_007', title: 'Ibn Battuta on Indian Towns, Bazaars and the Coconut Economy',
          caseStudy: { intro: 'Imagine you\'re visiting a bustling Indian market today — the smells of spices, the sounds of bargaining, the mix of languages.',
            decisions: [{ prompt: 'What were the two plant products Ibn Battuta described in greatest detail because they were unfamiliar to his West Asian audience, and what.', options: [
                { text: 'The two plant products were the coconut and paan (betel leaf)', outcome: 'The two plant products were the coconut and paan (betel leaf).' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students think Ibn Battuta\'s descriptions of the coconut and paan are merely "interesting trivia".', reveals: 'ibn-battuta-s-descriptions-of' },
                { text: 'he compared it to a melon', outcome: 'Not quite — Students think Ibn Battuta\'s descriptions of the coconut and paan are merely "interesting trivia".', reveals: 'ibn-battuta-s-descriptions-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_008', title: 'Ibn Battuta on the Postal System (Uluq) and Roads in the Sultanate',
          caseStudy: { intro: 'Imagine you are a merchant in 1340 Delhi needing to send a hundi (credit note) to Multan — 500 miles away — in under a week.',
            decisions: [{ prompt: 'What were the two distinct types of postal systems Ibn Battuta described in India, and what were their local names?', options: [
                { text: 'The two systems were the horse-post called **uluq** (horses every 4 miles) and the', outcome: 'The two systems were the horse-post called **uluq** (horses every 4 miles) and the foot-post called.' },
                { text: 'only horse-post', outcome: 'Not quite — **Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster.', reveals: 'misconception-the-horse-post-uluq' },
                { text: 'Which was faster?', outcome: 'Not quite — **Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster.', reveals: 'misconception-the-horse-post-uluq' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_009', title: 'Francois Bernier: Travels in Mughal India Under Aurangzeb',
          caseStudy: { intro: 'Imagine you are a Class 12 student visiting the Red Fort in Delhi and noticing a European-style portrait among Mughal miniatures — that portrait could be.',
            decisions: [{ prompt: 'In which years did François Bernier reside in the Mughal Empire, and under which emperor\'s reign did his stay primarily fall?', options: [
                { text: 'Bernier resided in the Mughal Empire from 1656 to 1668 (12 years), primarily under', outcome: 'Bernier resided in the Mughal Empire from 1656 to 1668 (12 years), primarily under Emperor.' },
                { text: 'under Akbar', outcome: 'Not quite — Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist.', reveals: 'bernier-was-an-objective-eyewitness' },
                { text: '1600–1610', outcome: 'Not quite — Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist.', reveals: 'bernier-was-an-objective-eyewitness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_010', title: 'Bernier\'s Critique: Property Rights and the Tyranny of Mughal Kingship',
          caseStudy: { intro: 'Imagine you read a travel blog where a visitor from a wealthy country calls your city "chaotic" because "nobody owns their house — the government owns.',
            decisions: [{ prompt: 'In which work did François Bernier articulate his critique of Mughal land ownership, and to whom was it dedicated?', options: [
                { text: 'Bernier articulated his critique in *Travels in the Mughal Empire* (published 1670–71),', outcome: 'Bernier articulated his critique in *Travels in the Mughal Empire* (published 1670–71), dedicated.' },
                { text: 'crown ownership', outcome: 'Not quite — Students often believe Bernier\'s "crown ownership" claim is a factual description of Mughal law.', reveals: 'bernier-s-crown-ownership-claim' },
                { text: 'saw it with his own eyes', outcome: 'Not quite — Students often believe Bernier\'s "crown ownership" claim is a factual description of Mughal law.', reveals: 'bernier-s-crown-ownership-claim' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_011', title: 'Bernier on the Decline of Artisans and the Mughal Towns Debate',
          caseStudy: { intro: 'Imagine you\'re walking through the narrow lanes of Old Delhi\'s Chandni Chowk today — you see centuries-old shops selling silver jewellery, embroidered fabrics.',
            decisions: [{ prompt: 'What term did Bernier use to describe Mughal cities, and what did he imply by it?', options: [
                { text: 'Bernier called Mughal cities "camp towns" (villes de camp), implying they owed their', outcome: 'Bernier called Mughal cities "camp towns" (villes de camp), implying they owed their existence.' },
                { text: 'manufacturing towns', outcome: 'Not quite — Students often believe Bernier\'s "camp towns" description applies uniformly to ALL Mughal urban.', reveals: 'bernier-s-camp-towns-description' },
                { text: 'port towns', outcome: 'Not quite — Students often believe Bernier\'s "camp towns" description applies uniformly to ALL Mughal urban.', reveals: 'bernier-s-camp-towns-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_012', title: 'Comparing the Three Travellers: Motives, Methods and Orientalism',
          caseStudy: { intro: 'Imagine you find three different travel blogs about your city written by visitors from three different centuries — one a linguist who learned the local.',
            decisions: [{ prompt: 'Name the three travellers compared in this chapter and identify the century each belonged to.', options: [
                { text: 'Al-Biruni (11th century, Uzbekistan), Ibn Battuta (14th century, Morocco), François', outcome: 'Al-Biruni (11th century, Uzbekistan), Ibn Battuta (14th century, Morocco), François Bernier (17th.' },
                { text: 'Orientalism', outcome: 'Not quite — Students often think "Orientalism" begins only with 19th-century British colonial scholars (e.g.', reveals: 'orientalism-begins-only-with-19th' },
                { text: '"Orientalism" begins only with 19th-century British colonial scholars (e', outcome: 'Not quite — Students often think "Orientalism" begins only with 19th-century British colonial scholars (e.g.', reveals: 'orientalism-begins-only-with-19th' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A journalism intern spends a month documenting an old city quarter — learning the local dialect, living with the community\'s senior priests, and reading only their authorised texts. She submits the piece as \'the definitive inside account.\'',
            decisions: [{ prompt: 'What does Al-Biruni\'s method warn about her account?', options: [
                { text: 'Her access is real but filtered — like Al-Biruni\'s years of Sanskrit with Brahmana scholars, learning the language and texts wins insider categories yet delivers the normative, elite view; the Kitab-ul-Hind maps what the texts prescribe, not what everyone lives.', outcome: 'The chapter\'s double-edged lesson: methodical immersion buys unprecedented access AND builds a bias — dependence on a tradition\'s custodians shows you its rules, not its dissidents, women or variants.' },
                { text: 'Publish it — a month of language and living with insiders makes it the most authentic account possible.', outcome: 'That\'s the confidence Al-Biruni\'s own barriers warn against — he named language, belief and insularity as walls and still only reached what his Brahmana informants could show; depth of access isn\'t breadth of coverage.', reveals: 'insider-access-equals-truth' },
                { text: 'Reject it — an outsider can never say anything true about a community.', outcome: 'Al-Biruni is the counter-example to that despair: his Sanskrit labour produced genuinely insider description; the problem isn\'t being outside but mistaking the gatekeepers\' map for the territory.', reveals: 'outsiders-always-fail' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'You can now read a medieval treatise as method — and weigh a captive\'s precision against the elite sources he could reach.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_007', difficulty: 'standard',
          question: 'Ibn Battuta\'s account of 14th-century Indian towns, bazaars, and the coconut.',
          hint: 'Revisit c12_hist_cbse_05_005 (Ibn Battuta\'s background) and c12_hist_cbse_05_006 (Delhi.',
          misconception: 'Students think Ibn Battuta\'s descriptions of the coconut and paan are merely "interesting trivia" or "botanical.',
          parts: [
                { id: 'a', prompt: 'What were the two plant products Ibn Battuta described in greatest detail because they were unfamiliar to his West Asian audience, and what specific analogy.', answer: 'The two plant products were the coconut and paan (betel leaf)',
                  options: ['The two plant products were the coconut and paan (betel leaf)', 'A wrong answer (e.g', 'he compared it to a melon', 'interesting trivia'],
                  hint: 'Revisit c12_hist_cbse_05_005 (Ibn Battuta\'s background) and c12_hist_cbse_05_006 (Delhi.',
                  misconception: 'Students think Ibn Battuta\'s descriptions of the coconut and paan are merely "interesting trivia" or "botanical observations." In reality.' },
                { id: 'b', prompt: 'Why did Ibn Battuta describe the bazaar of Daulatabad (Tarababad) with its female singers and musicians in such detail, when his main focus was supposedly.', answer: 'Ibn Battuta highlighted Tarababad',
                  options: ['Ibn Battuta highlighted Tarababad', 'he liked music', 'it was the biggest market', 'marvellous things'],
                  hint: 'Revisit c12_hist_cbse_05_005 (Ibn Battuta\'s background) and c12_hist_cbse_05_006 (Delhi.',
                  misconception: 'Students think Ibn Battuta\'s descriptions of the coconut and paan are merely "interesting trivia" or "botanical observations." In reality.' },
                { id: 'c', prompt: 'Using Ibn Battuta\'s observation that Indian agriculture allowed two crops a year and that Indian textiles (cotton, muslin, silk) were in high demand in West.', answer: 'The two-crop cycle (enabled by soil fertility) generated agricultural surplus',
                  options: ['The two-crop cycle (enabled by soil fertility) generated agricultural surplus', 'agriculture was good and textiles were popular', 'interesting trivia', 'botanical observations'],
                  hint: 'Revisit c12_hist_cbse_05_005 (Ibn Battuta\'s background) and c12_hist_cbse_05_006 (Delhi.',
                  misconception: 'Students think Ibn Battuta\'s descriptions of the coconut and paan are merely "interesting trivia" or "botanical observations." In reality.' }
          ],
            remediations: { 'ibn-battuta-s-descriptions-of': { steps: ['Re-read Source 6 and Source 7 in the NCERT text side-by-side with the "Education and entertainment" box (Source 3).', 'Identify every comparison Ibn Battuta makes (date-palm, human head, grape-vine, nutmeg).', 'Ask: "Would a 14th-century Moroccan reader know what a date-palm looks like?', 'Write one paragraph explaining how each analogy serves as a cognitive bridge.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_008', difficulty: 'standard',
          question: 'The postal system (uluq and dawa) described by Ibn Battuta in the 14th century.',
          hint: 'If stuck, re-read **c6_history_ch07_023** section on "Communication and Intelligence".',
          misconception: '**Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster than runners.".',
          parts: [
                { id: 'a', prompt: 'Why did Ibn Battuta explicitly state that the foot-post (dawa) was quicker than the horse-post (uluq), despite horses being faster than humans over short.', answer: 'The dawa used **fresh runners at every 1/3 mile** sprinting at top speed with a',
                  options: ['The dawa used **fresh runners at every 1/3 mile** sprinting at top speed with a', 'horses are always faster', '**Reality:** Ibn Battuta explicitly states: *'],
                  hint: 'If stuck, re-read **c6_history_ch07_023** section on "Communication and Intelligence".',
                  misconception: '**Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster than runners." **Reality:** Ibn Battuta.' },
                { id: 'b', prompt: 'A merchant in Delhi wants to send a consignment of Khurasani grapes (highly perishable) to the Sultan in Daulatabad (approx. 40 days by caravan).', answer: 'The **foot-post (dawa)**',
                  options: ['The **foot-post (dawa)**', '**Reality:** Ibn Battuta explicitly states: *'],
                  hint: 'If stuck, re-read **c6_history_ch07_023** section on "Communication and Intelligence".',
                  misconception: '**Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster than runners." **Reality:** Ibn Battuta.' },
                { id: 'c', prompt: 'Compare the Sultanate\'s postal infrastructure (uluq/dawa) with the Mauryan *dhamma-mahamatta* and royal road system (Class 6, c6_history_ch05_010).', answer: '**Similarities:** (1) State-funded relay stations at fixed intervals',
                  options: ['**Similarities:** (1) State-funded relay stations at fixed intervals', 'both only for spies', '**Reality:** Ibn Battuta explicitly states: *'],
                  hint: 'If stuck, re-read **c6_history_ch07_023** section on "Communication and Intelligence".',
                  misconception: '**Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster than runners." **Reality:** Ibn Battuta.' }
          ],
            remediations: { 'misconception-the-horse-post-uluq': { steps: ['Re-read **NCERT Source 10** (p.129) line-by-line; underline *every operational detail* (distance, personnel, equipment.', 'Draw a **side-by-side comparison table**: uluq vs dawa — columns: interval, transport, speed, primary use, Ibn.', 'Revisit **c6_history_ch07_023** (Administration Under Delhi Sultanate) — locate *barid* and *dak chowki* precursors.', 'Re-attempt **Diagnostic Q2 & Q3** — if still wrong, watch the 6-min video "Ibn Battuta\'s Postal System" on *e-PG.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster than runners.".',
          parts: [
                { id: 'a', prompt: 'Construct a flowchart showing the complete dawa relay cycle from departure at Delhi\'s city gate to arrival at the next dawa station (1/3 mile away).', answer: '**Flowchart:** 1',
                  options: ['**Flowchart:** 1', '**Reality:** Ibn Battuta explicitly states: *'],
                  hint: 'If stuck, re-read **c6_history_ch07_023** section on "Communication and Intelligence".',
                  misconception: '**Misconception:** "The horse-post (uluq) was the primary/faster system because horses are faster than runners." **Reality:** Ibn Battuta.' }
          ],
            remediations: { 'misconception-the-horse-post-uluq': { steps: ['Re-read **NCERT Source 10** (p.129) line-by-line; underline *every operational detail* (distance, personnel, equipment.', 'Draw a **side-by-side comparison table**: uluq vs dawa — columns: interval, transport, speed, primary use, Ibn.', 'Revisit **c6_history_ch07_023** (Administration Under Delhi Sultanate) — locate *barid* and *dak chowki* precursors.', 'Re-attempt **Diagnostic Q2 & Q3** — if still wrong, watch the 6-min video "Ibn Battuta\'s Postal System" on *e-PG.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_009', difficulty: 'standard',
          question: 'François Bernier (1620–1688) was a French physician, political philosopher, and.',
          hint: 'Revisit c6_history_ch09_037 (Shah Jahan and Aurangzeb) for political context, and.',
          misconception: 'Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist who lived at court.',
          parts: [
                { id: 'a', prompt: 'Why did Bernier initially come to the Mughal Empire, and how did his role change during his stay?', answer: 'Bernier came "in search of opportunities" like many Europeans after 1600',
                  options: ['Bernier came "in search of opportunities" like many Europeans after 1600', 'he came as an ambassador', 'he stayed with Dara Shukoh throughout', 'objective eyewitness'],
                  hint: 'Revisit c6_history_ch09_037 (Shah Jahan and Aurangzeb) for political context, and c9_hist_ch1_010.',
                  misconception: 'Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist who lived at court for 12 years.' }
          ],
            remediations: { 'bernier-was-an-objective-eyewitness': { steps: ['If the student holds the "objective eyewitness" misconception: (1) Re-read Source 12 in the textbook — Bernier\'s.', '(2) Compare with Abu\'l Fazl\'s definition of land revenue in *Ain-i-Akbari* (Class 6 node c6_history_ch09_035).', '(3) Complete the "Discuss" box on p.', '134: "Why do you think scholars like Bernier chose to compare India with Europe?" (4) Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_010', difficulty: 'standard',
          question: 'Bernier\'s Critique refers to the 17th-century French physician-traveller.',
          hint: 'If stuck, revisit **c6_history_ch09_035** and trace the flow: *peasant cultivates →.',
          misconception: 'Students often believe Bernier\'s "crown ownership" claim is a factual description of Mughal law because he was.',
          parts: [
                { id: 'a', prompt: 'Bernier claimed the Mughal emperor "owned all the land." How did Abu\'l Fazl, Akbar\'s chronicler, characterize the land revenue demand, and why does that.', answer: 'Abu\'l Fazl described land revenue as "remunerations of sovereignty"',
                  options: ['Abu\'l Fazl described land revenue as "remunerations of sovereignty"', 'crown ownership', 'saw it with his own eyes'],
                  hint: 'If stuck, revisit **c6_history_ch09_035** and trace the flow: *peasant cultivates → harvest.',
                  misconception: 'Students often believe Bernier\'s "crown ownership" claim is a factual description of Mughal law because he was an eyewitness who "saw.' }
          ],
            remediations: { 'bernier-s-crown-ownership-claim': { steps: ['Re-read the "Question of Landownership" section in NCERT (Theme 5, Section 6.1) and highlight every phrase where.', 'Open the Class 6 node **c6_history_ch09_035** (Mughal Administration) and list the terms *zabt*, *jagir*, *zamindar*.', 'Write a 3-sentence correction: "Bernier mistook revenue assignment (jagir) for land ownership.', 'Mughal cultivators (khudkasht) had hereditary occupancy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_011', difficulty: 'standard',
          question: 'Bernier\'s account of the decline of artisans and the Mughal towns debate refers.',
          hint: 'If stuck, revisit c12_hist_cbse_05_010 and identify the exact logical link Bernier makes.',
          misconception: 'Students often believe Bernier\'s "camp towns" description applies uniformly to ALL Mughal urban centres, and that his.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bernier\'s account of the decline of artisans and the Mughal towns debate refers to French',
                  options: ['Bernier\'s account of the decline of artisans and the Mughal towns debate refers to French', 'Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day Uzbekistan) who', 'Al-Biruni\'s method refers to his systematic approach in the *Kitab-ul-Hind* (c', 'Al-Biruni\'s analysis of the caste system in *Kitab-ul-Hind* (c'],
                  hint: 'If stuck, revisit c12_hist_cbse_05_010 and identify the exact logical link Bernier makes: crown.',
                  misconception: 'Students often believe Bernier\'s "camp towns" description applies uniformly to ALL Mughal urban centres, and that his claim of artisan.' }
          ],
            remediations: { 'bernier-s-camp-towns-description': { steps: ['Re-read c12_hist_cbse_05_010 (Bernier\'s property rights critique) to see how his land ownership theory shapes his urban.', 'Compare with c12_hist_cbse_05_007 (Ibn Battuta on towns) — note Ibn Battuta describes Delhi and Daulatabad as densely.', 'Review c6_history_ch09_038 (Mughal economy) for evidence of non-imperial urban bases: merchant networks, textile.', 'Do a two-column table: "Bernier\'s claims" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_012', difficulty: 'standard',
          question: 'This node synthesizes the accounts of three medieval travellers — Al-Biruni.',
          hint: 'If unable to compare across travellers, return to c12_hist_cbse_05_002 (Al-Biruni\'s.',
          misconception: 'Students often think "Orientalism" begins only with 19th-century British colonial scholars (e.g., James Mill).',
          parts: [
                { id: 'a', prompt: 'A historian finds two descriptions of the caste system: one explains it through Purusha Sukta varna theory and compares it to Persian social categories; the.', answer: 'First: Al-Biruni (textual, comparative, attempts emic understanding but accepts',
                  options: ['First: Al-Biruni (textual, comparative, attempts emic understanding but accepts', 'Orientalism', '"Orientalism" begins only with 19th-century British colonial scholars (e'],
                  hint: 'If unable to compare across travellers, return to c12_hist_cbse_05_002 (Al-Biruni\'s method).',
                  misconception: 'Students often think "Orientalism" begins only with 19th-century British colonial scholars (e.g., James Mill).' }
          ],
            remediations: { 'orientalism-begins-only-with-19th': { steps: ['If the student conflates Orientalism with only colonial-era writing: Re-read Source 12 (Bernier\'s "warning for Europe").', 'If the student sees Al-Biruni as uncritically Brahmanical: Revisit c12_hist_cbse_05_003 (Al-Biruni on Caste) and.', 'If the student treats Ibn Battuta as objective: Compare his coconut/paan descriptions (Sources 6, 7) with Abdur.', '"admired temple" (Source 10) — both use *rhetorical strategies*, not neutral recording.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
