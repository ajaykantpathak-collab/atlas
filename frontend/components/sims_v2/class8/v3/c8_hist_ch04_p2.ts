import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch04_p2: SimDef = {
    id: 'v3_c8_hist_ch04_p2',
    title: 'India\'s Long Road to Independence · Part 2/2',
    subtitle: 'The hundred years of revolt before 1857',
    classLevel: 8, subject: 'history', topic: 'India\'s Long Road to Independence · Part 2/2',
    chapters: ['c8_hist_ch04'],
    nodeIds: ['c8_hist_ch4_5', 'c8_hist_ch4_6', 'c8_hist_ch4_7', 'c8_hist_ch4_8', 'c8_hist_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler of forgotten uprisings', intro: 'British reports called them \'turbulent\' and \'bandits.\' Dig into what the Sanyasis, Paikas and Santhals were actually fighting for — and why colonial records can\'t be taken at face value.', goal: 'Understand the pre-1857 resistance movements — Sanyasi, Paika, Vellore, Kol, Santhal — their local economic and cultural causes, and why their isolation kept them from succeeding.' },
    discovery: {
        question: 'In 1817, a temple priest near Puri led armed farmer-soldiers against the East India Company — forty years before 1857. What pushed a priest to rebellion?',
        options: ['The Company seized the Paiks\' rent-free lands and grabbed the salt monopoly — destroying the livelihood of Odisha\'s hereditary militia-farmers', 'He was just a bandit causing trouble', 'He wanted the British throne for himself', 'It was a misunderstanding over parade uniforms'],
        answer: 'The Company seized the Paiks\' rent-free lands and grabbed the salt monopoly — destroying the livelihood of Odisha\'s hereditary militia-farmers',
        hook: 'Not every uprising was a \'sepoy mutiny.\' Most pre-1857 revolts were peasants and tribals — Sanyasis after the Bengal famine, Kols and Santhals losing their land — fighting economic strangling, not greased cartridges.',
    },
    teaching: [
        { title: 'Partition of Bengal (1905) and the Swadeshi Movement', text: 'The Partition of Bengal (1905) was a British administrative decision by Viceroy Lord Curzon to divide the Bengal Presidency into two provinces—Eastern Bengal and Assam (Muslim-majority) and Western.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch4_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map a hundred years of resistance: Sanyasi raiders in famine-hit Bengal, sepoys at Vellore, Paikas in Odisha, Kols in Chotanagpur, Santhals in 1855. For each, find the specific grievance — and why none could link up with the others.',
        labels: ['Partition of Bengal (1905)', 'Bal Gangadhar Tilak', 'Revolutionary Movements: Anushilan Samiti', 'Non-Cooperation Movement (1920-22): Gandhi\'s', 'Civil Disobedience Movement'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch4_5', title: 'Partition of Bengal (1905) and the Swadeshi Movement',
          caseStudy: { intro: 'Imagine you walk into a Kolkata market today and see a sign saying "Buy Indian"—that idea started in 1905 when British officials drew a line through Bengal.',
            decisions: [{ prompt: 'In which year was the Partition of Bengal announced by Lord Curzon, and what were the two new provinces created?', options: [
                { text: 'The Partition was announced in 1905, creating Eastern Bengal and Assam (capital Dhaka)', outcome: 'The Partition was announced in 1905, creating Eastern Bengal and Assam (capital Dhaka) and Western.' },
                { text: 'Vande Mataram', outcome: 'Not quite — Students often think the Swadeshi Movement was only about burning foreign cloth and singing "Vande.', reveals: 'the-swadeshi-movement-was-only' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_6', title: 'Bal Gangadhar Tilak and the Call for Swaraj',
          caseStudy: { intro: 'Imagine you are at a loud, joyous Ganesh Chaturthi procession in Pune today — huge idols, drums, crowds blocking the streets.',
            decisions: [{ prompt: 'What was the exact slogan coined by Bal Gangadhar Tilak in 1916, and which organization did he found that same year to demand it?', options: [
                { text: 'The slogan was "Swaraj is my birthright and I shall have it," and the organization was', outcome: 'The slogan was "Swaraj is my birthright and I shall have it," and the organization was the Home.' },
                { text: 'Vande Mataram', outcome: 'Not quite — Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan.', reveals: 'tilak-advocated-violent-revolution-like' },
                { text: 'Do or Die', outcome: 'Not quite — Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan.', reveals: 'tilak-advocated-violent-revolution-like' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_8', title: 'Non-Cooperation Movement (1920-22): Gandhi\'s First Mass Movement',
          caseStudy: { intro: 'Imagine you are a student in 1921: your older brother has left his government college, your mother spins khadi on a charkha every evening, and the.',
            decisions: [{ prompt: 'In which year was the Non-Cooperation Movement formally launched at the Calcutta session of the Congress, and what immediate event.', options: [
                { text: 'The movement was launched in September 1920 at the Calcutta session', outcome: 'The movement was launched in September 1920 at the Calcutta session.' },
                { text: '1919 or the Partition of Bengal', outcome: 'Not quite — Students often think the Non-Cooperation Movement failed because the British suppressed.', reveals: 'the-non-cooperation-movement-failed' },
                { text: 'the Non-Cooperation Movement failed', outcome: 'Not quite — Students often think the Non-Cooperation Movement failed because the British suppressed.', reveals: 'the-non-cooperation-movement-failed' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A museum caption reads: \'Before 1857, India slept — the only sparks were a few sepoy mutinies over religious insults.\' A student who has read about the Sanyasi, Paika, Kol and Santhal risings challenges the caption.',
            decisions: [{ prompt: 'What does the record actually show about early resistance?', options: [
                { text: 'The caption is wrong on both counts: dozens of uprisings flared between 1757 and 1857, and most were peasant and tribal movements driven by land revenue, lost customary rights and exploitation — led by local chiefs and figures like Jayi Rajguru, not soldiers. They failed mainly because each stayed local, restoring its own grievances rather than joining a shared cause.', outcome: 'This corrects the \'sepoys only\' picture and gives the structural reason the risings were crushed one at a time.' },
                { text: 'The caption is fair — the countryside stayed quiet because only sepoys had grievances worth fighting over.', outcome: 'The archive says otherwise: famines, resumed jagirs, doubled taxes and moneylender seizure pushed peasants and tribals into repeated armed revolts decades before 1857.', reveals: 'villages-stayed-quiet' },
                { text: 'The uprisings were real but failed simply because Indians lacked muskets and drill — weapons were the whole story.', outcome: 'Technology mattered, but the deeper cause was fragmentation: isolated risings defending local privileges could be suppressed piecemeal regardless of weaponry.', reveals: 'weapons-were-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_9', title: 'You made it',
          caseStudy: { intro: '1857 wasn\'t the beginning — it was the boiling point. A century of local revolts, each crushed alone, shows both how deep the anger ran and why scattered resistance kept failing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch4_5', difficulty: 'standard',
          question: 'The Partition of Bengal (1905) was a British administrative decision by Viceroy.',
          hint: 'Revisit c8_hist_ch4_3 (Birth of INC) to recall Moderate methods, and c6_history_ch10_044.',
          misconception: 'Students often think the Swadeshi Movement was only about burning foreign cloth and singing "Vande Mataram," missing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Partition of Bengal (1905) was a British administrative decision by Viceroy Lord',
                  options: ['The Partition of Bengal (1905) was a British administrative decision by Viceroy Lord', 'Early Resistance to British Rule refers to the series of localized, diverse uprisings', 'The Quit India Movement (August 1942) was a mass civil disobedience campaign launched by', 'Partition and Independence (1947) refers to the British Parliament\'s Indian Independence'],
                  hint: 'Revisit c8_hist_ch4_3 (Birth of INC) to recall Moderate methods, and c6_history_ch10_044 (Impact.',
                  misconception: 'Students often think the Swadeshi Movement was only about burning foreign cloth and singing "Vande Mataram," missing its deepest.' }
          ],
            remediations: { 'the-swadeshi-movement-was-only': { steps: ['Show the 1905 map of Bengal before/after Partition—ask the student to trace the Bengali-speaking zone and see how the.', 'Read aloud Tagore\'s "Amar Shonar Bangla" (written 1905) and discuss how it celebrates unified Bengal, not religion.', 'Compare a 1906 Swadeshi advertisement with a 1921 Khadi poster—identify the continuity (economic nationalism) and.', 'Have the student list three Swadeshi institutions (school, bank, mill) and explain how each was a "mini-government."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_6', difficulty: 'standard',
          question: 'Bal Gangadhar Tilak (1856–1920) was a Indian nationalist, teacher, and.',
          hint: 'Revisit c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Swadeshi Movement).',
          misconception: 'Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti.',
          parts: [
                { id: 'a', prompt: 'Compare Tilak\'s method of mobilizing peasants and workers during the Swadeshi Movement (1905–08) with the Moderate leaders\' method of petitioning the British.', answer: '**Audience:** Tilak targeted peasants, artisans, and students (the masses)',
                  options: ['**Audience:** Tilak targeted peasants, artisans, and students (the masses)', 'protests', 'Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti'],
                  hint: 'Revisit c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Swadeshi Movement) — focus.',
                  misconception: 'Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti.' }
          ],
            remediations: { 'tilak-advocated-violent-revolution-like': { steps: ['If a student conflates Tilak with revolutionaries, do this 3-step fix: (1) Show them Tilak\'s 1908 court statement: "I.', 'I have always advocated constitutional agitation." (2) Contrast Tilak\'s *public* festivals and *open* newspapers with.', '(3) Ask: "If Tilak wanted violence, why did he start the Home Rule League in 1916 — a legal, open organization.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Tilak\'s insistence on Hindu religious symbols (Ganesh, Shivaji) strengthened the national movement by mobilizing millions, but fatally.', answer: '**Evidence for strengthening:** The 1905–08 Swadeshi Movement saw unprecedented',
                  options: ['**Evidence for strengthening:** The 1905–08 Swadeshi Movement saw unprecedented', 'Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti'],
                  hint: 'Revisit c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Swadeshi Movement) — focus.',
                  misconception: 'Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti.' },
                { id: 'b', prompt: 'Create a 6-event annotated timeline (1890–1920) showing the *turning points* in Tilak\'s political strategy — not just dates, but *why* each event marked.', answer: 'A strong timeline includes: (1) 1890: Buys *Kesari*/*Mahratta*',
                  options: ['A strong timeline includes: (1) 1890: Buys *Kesari*/*Mahratta*', 'Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti'],
                  hint: 'Revisit c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Swadeshi Movement) — focus.',
                  misconception: 'Students often believe Tilak advocated *violent revolution* like Bhagat Singh or the Anushilan Samiti.' }
          ],
            remediations: { 'tilak-advocated-violent-revolution-like': { steps: ['If a student conflates Tilak with revolutionaries, do this 3-step fix: (1) Show them Tilak\'s 1908 court statement: "I.', 'I have always advocated constitutional agitation." (2) Contrast Tilak\'s *public* festivals and *open* newspapers with.', '(3) Ask: "If Tilak wanted violence, why did he start the Home Rule League in 1916 — a legal, open organization.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_7', difficulty: 'standard',
          question: 'Revolutionary movements led by Anushilan Samiti (founded 1902 in Bengal) and.',
          hint: 'If stuck, revisit c8_hist_ch4_5 (Partition of Bengal and Swadeshi Movement) and.',
          misconception: 'Students often think Anushilan Samiti and Abhinav Bharat were a single all-India organisation with coordinated actions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Revolutionary movements led by Anushilan Samiti (founded 1902 in Bengal) and Abhinav',
                  options: ['Revolutionary movements led by Anushilan Samiti (founded 1902 in Bengal) and Abhinav', 'Early Resistance to British Rule refers to the series of localized, diverse uprisings', 'The Quit India Movement (August 1942) was a mass civil disobedience campaign launched by', 'Partition and Independence (1947) refers to the British Parliament\'s Indian Independence'],
                  hint: 'If stuck, revisit c8_hist_ch4_5 (Partition of Bengal and Swadeshi Movement) and c8_hist_ch4_6.',
                  misconception: 'Students often think Anushilan Samiti and Abhinav Bharat were a single all-India organisation with coordinated actions.' }
          ],
            remediations: { 'anushilan-samiti-and-abhinav-bharat': { steps: ['Draw a two-column table — left for Anushilan Samiti (Bengal), right for Abhinav Bharat (Maharashtra).', 'Fill in founders, year, ideology, key actions, British response for each using textbook/index.', 'Identify overlaps (e.g., both used bombs, both targeted officials) and differences (structure, ideology, geography).', 'Write one paragraph explaining why they remained separate despite similar goals — this builds the habit of comparative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_8', difficulty: 'standard',
          question: 'The Non-Cooperation Movement (1920–22) was Mahatma Gandhi\'s first nationwide.',
          hint: 'Revisit the Swadeshi Movement (c8_hist_ch4_5) to see how boycott worked at regional scale.',
          misconception: 'Students often think the Non-Cooperation Movement failed because the British suppressed it violently.',
          parts: [
                { id: 'a', prompt: 'In which year was the Non-Cooperation Movement formally launched at the Calcutta session of the Congress, and what immediate event triggered Gandhi\'s call for.', answer: 'The movement was launched in September 1920 at the Calcutta session',
                  options: ['The movement was launched in September 1920 at the Calcutta session', '1919 or the Partition of Bengal', 'the Non-Cooperation Movement failed'],
                  hint: 'Revisit the Swadeshi Movement (c8_hist_ch4_5) to see how boycott worked at regional scale before.',
                  misconception: 'Students often think the Non-Cooperation Movement failed because the British suppressed it violently.' },
                { id: 'b', prompt: 'A peasant in Awadh stops paying rent to his taluqdar (landlord) in 1921, claiming "Gandhi said we need not pay." The taluqdar complains to the British.', answer: 'Gandhi insisted on strict non-violence and adherence to the Congress programme',
                  options: ['Gandhi insisted on strict non-violence and adherence to the Congress programme', 'following Gandhi', 'the Non-Cooperation Movement failed'],
                  hint: 'Revisit the Swadeshi Movement (c8_hist_ch4_5) to see how boycott worked at regional scale before.',
                  misconception: 'Students often think the Non-Cooperation Movement failed because the British suppressed it violently.' }
          ],
            remediations: { 'the-non-cooperation-movement-failed': { steps: ['Show a map of India marking Chauri Chaura (Gorakhpur district) and ask: "Why would an incident in one village make.', 'Read Gandhi\'s own words from *Young India* (Feb 1922): "God has been kind enough to give me a warning...', 'Compare with the Civil Disobedience Movement (c8_hist_ch4_9) where Gandhi *did not* withdraw after violence — discuss.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_9', difficulty: 'standard',
          question: 'The Civil Disobedience Movement (1930–34) was a nationwide mass campaign.',
          hint: 'Revisit the Chauri Chaura incident (c8_hist_ch4_8) and Gandhi\'s subsequent fast and.',
          misconception: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of non-violent',
                  options: ['The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of non-violent', 'Early Resistance to British Rule refers to the series of localized, diverse uprisings', 'The Quit India Movement (August 1942) was a mass civil disobedience campaign launched by', 'Partition and Independence (1947) refers to the British Parliament\'s Indian Independence'],
                  hint: 'Revisit the Chauri Chaura incident (c8_hist_ch4_8) and Gandhi\'s subsequent fast and withdrawal.',
                  misconception: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the Gandhi-Irwin Pact.' }
          ],
            remediations: { 'the-salt-march-was-the': { steps: ['On a map of India, mark Dandi, Dharasana, Vedaranyam (Rajaji\'s march), Peshawar, and Manipur — see the geographic.', 'Read Gandhi\'s 11 demands in the 2 March 1930 letter; tick which were met in the Gandhi-Irwin Pact.', 'Compare a 1930 British ordinance (e.g., Press Ordinance) with the Rowlatt Act (1919) — note the escalation.', 'Write one paragraph: "The Salt March was the spark; the prairie fire was..."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
