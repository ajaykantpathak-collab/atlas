import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch04_p1: SimDef = {
    id: 'v3_c11_hist_ch04_p1',
    title: 'The Central Islamic Lands · Part 1/2',
    subtitle: 'Find the trade junction hiding inside a desert sanctuary.',
    classLevel: 11, subject: 'history', topic: 'The Central Islamic Lands · Part 1/2',
    chapters: ['c11_hist_ch04'],
    nodeIds: ['c11_hist_cbse_04_001', 'c11_hist_cbse_04_002', 'c11_hist_cbse_04_003', 'c11_hist_cbse_04_004', 'c11_hist_cbse_04_005', 'c11_hist_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Quraysh merchant pricing sanctuary and water rights', intro: 'At Ajmer\'s Urs, pilgrimage and market blend — now strip away the Islam and you have seventh-century Mecca\'s whole business model.', goal: 'Explain Mecca\'s commercial-religious leverage and the tribal structure of pre-Islamic Arabia.' },
    discovery: {
        question: 'Pre-Islamic Arabia: an isolated backwater waiting for history to begin?',
        options: ['No — Mecca sat on the incense-spice routes linking the Indian Ocean to the Mediterranean, and its sanctuary made a truce zone for trade', 'Yes — deserts can\'t support trade', 'Yes — only the Prophet\'s arrival connected it', 'No — because Arabia was never a desert'],
        answer: 'No — Mecca sat on the incense-spice routes linking the Indian Ocean to the Mediterranean, and its sanctuary made a truce zone for trade',
        hook: 'The haram solved an economic problem religiously — a sanctuary where feuding tribes could safely do business, with Quraysh collecting the toll.',
    },
    teaching: [
        { title: 'Arabia Before Islam: Tribal Society and the Role of Mecca', text: 'Arabia before Islam (6th-7th century CE) was a tribal society organized around kinship groups (qabila) in the Arabian Peninsula, where Mecca emerged as a pivotal commercial and religious center due.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace a frankincense caravan from Yemen to Gaza through Mecca\'s oases, then judge whether the mala\' made Mecca a merchant republic.',
        labels: ['Arabia Before Islam: Tribal', 'The Life of', 'The Five Pillars', 'The Quran and', 'The Caliphate: The Rashidun', 'The Umayyad Caliphate: Damascus'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_001', title: 'Arabia Before Islam: Tribal Society and the Role of Mecca',
          caseStudy: { intro: 'Imagine you\'re visiting the Ajmer Sharif Dargah during Urs — thousands gather at a sacred site that\'s also a bustling market.',
            decisions: [{ prompt: 'What were the two primary ecological zones of the Arabian Peninsula that determined whether a group lived as pastoral nomads (Bedouins).', options: [
                { text: 'The two zones were: (1) the desert interior (Najd) supporting pastoral nomadism', outcome: 'The two zones were: (1) the desert interior (Najd) supporting pastoral nomadism — major group.' },
                { text: 'Mecca was nomadic', outcome: 'Not quite — Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.', reveals: 'pre-islamic-arabia-was-backward' },
                { text: 'Yemen was desert', outcome: 'Not quite — Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.', reveals: 'pre-islamic-arabia-was-backward' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_002', title: 'The Life of the Prophet Muhammad and the Founding of Islam',
          caseStudy: { intro: 'Imagine you are visiting the Qutb Minar complex in Delhi and notice the Iron Pillar and the Quwwat-ul-Islam Mosque built from dismantled temples.',
            decisions: [{ prompt: 'In which year did the Hijra (migration of the Prophet and his followers from Mecca to Medina) occur, and why does this date mark the.', options: [
                { text: 'The Hijra occurred in 622 CE', outcome: 'The Hijra occurred in 622 CE. This date marks the Islamic calendar\'s beginning (1 AH) because.' },
                { text: 'by the sword', outcome: 'Not quite — Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam.', reveals: 'the-prophet-s-success-was' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_003', title: 'The Five Pillars of Islam: Core Beliefs and Practices',
          caseStudy: { intro: 'Imagine you\'re visiting the Jama Masjid in Delhi during Ramadan — you hear the adhan (call to prayer) echoing, see worshippers breaking fast with dates, and.',
            decisions: [{ prompt: 'What is the exact Arabic term for the declaration of faith that constitutes the first pillar of Islam, and what are its two essential.', options: [
                { text: 'The Arabic term is **Shahada** (الشهادة)', outcome: 'The Arabic term is **Shahada** (الشهادة). Its two components are: (1) *La ilaha illa Allah*.' },
                { text: 'Kalima', outcome: 'Not quite — Students often believe the Five Pillars were **fully codified in the Quran as a fixed list.', reveals: 'the-five-pillars-were-fully' },
                { text: 'Kalima" without the two parts, or confusing it with the adhan', outcome: 'Not quite — Students often believe the Five Pillars were **fully codified in the Quran as a fixed list.', reveals: 'the-five-pillars-were-fully' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_004', title: 'The Quran and the Hadith: Sacred Texts and Their Compilation',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in New Delhi and see a 7th-century Quranic manuscript on parchment with Kufic script.',
            decisions: [{ prompt: 'In which caliph\'s reign was the Quran first compiled into a single manuscript (mushaf), and what event prompted it?', options: [
                { text: 'The first compilation was undertaken during the caliphate of Abu Bakr (632–634 CE) on the', outcome: 'The first compilation was undertaken during the caliphate of Abu Bakr (632–634 CE) on the urging.' },
                { text: 'part of the Quran', outcome: 'Not quite — Students often believe the Quran was written as a complete book during the Prophet\'s lifetime,.', reveals: 'the-quran-was-written-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_005', title: 'The Caliphate: The Rashidun and the Question of Succession',
          caseStudy: { intro: 'Imagine you\'re standing at the Qutb Minar complex in Delhi, reading the Arabic inscriptions that mention "Amir al-Mu\'minin" (Commander of the Faithful)—a title.',
            decisions: [{ prompt: 'Name the four Rashidun caliphs in chronological order and state the distinct method by which each assumed office.', options: [
                { text: 'Abu Bakr (632–634): chosen by shura (consultation) of prominent companions at Saqifah', outcome: 'Abu Bakr (632–634): chosen by shura (consultation) of prominent companions at Saqifah.' },
                { text: 'them as hereditary or all elected identically', outcome: 'Not quite — Students believe the Sunni-Shia split originated solely from a family dispute over Ali\'s cousinhood.', reveals: 'the-sunni-shia-split-originated' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_006', title: 'The Umayyad Caliphate: Damascus and Imperial Expansion',
          caseStudy: { intro: 'Imagine you are visiting the Qutb Minar complex in Delhi and notice the Arabic inscriptions on the Iron Pillar and the mosque walls.',
            decisions: [{ prompt: 'Name the first Umayyad caliph, the year he assumed power, and the capital city he established.', options: [
                { text: 'Mu\'awiya I became caliph in 661 CE and made Damascus the capital', outcome: 'Mu\'awiya I became caliph in 661 CE and made Damascus the capital.' },
                { text: 'secular', outcome: 'Not quite — Students often think the Umayyads were "secular" or "un-Islamic" rulers who ignored religion.', reveals: 'the-umayyads-were-secular-or' },
                { text: 'un-Islamic', outcome: 'Not quite — Students often think the Umayyads were "secular" or "un-Islamic" rulers who ignored religion.', reveals: 'the-umayyads-were-secular-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on Islam\'s origins, one side argues: \'Pre-Islamic Arabia was a backward, isolated desert until Islam arrived — then the Prophet conquered it by the sword.\'',
            decisions: [{ prompt: 'What does the historical record show?', options: [
                { text: 'Correct the baseline and the mechanism: Arabia was deeply connected — Mecca\'s caravan trade linked Indian Ocean goods to Mediterranean markets, and \'jahiliyya\' is a theological label, not a description of material life. And the Prophet\'s success ran on non-violent preaching for 12 years, then statecraft — the Hijra as calculated migration, the Constitution of Medina, alliances and the nearly bloodless taking of Mecca in 630 — not the sword.', outcome: 'The debate reframes: a sanctuary-truce economy met a religio-political blueprint — assimilation and treaty, more than battle, built the order.' },
                { text: 'Accept \'backward desert\' — that\'s why Arabia needed Islam to civilise it.', outcome: 'Reading jahiliyya as historical description retrojects a religious judgment: the poetry, trade networks and Jewish-Christian communities show a connected, sophisticated world.', reveals: 'pre-islamic-arabia-backward' },
                { text: 'Concede the conquest point — battles like Badr prove force founded the faith.', outcome: 'Battles were episodes, not the foundation: Medina was built by treaties, and Mecca surrendered when its alliance system collapsed — expansion by Caliphate armies came later and is a different era.', reveals: 'islam-spread-by-sword-in-arabia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Tribal feuds plus caravan profits needed one invention: a sacred zone where war paused and trade could happen.',
            decisions: [{ prompt: 'What comes next? The Central Islamic Lands · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Central Islamic Lands · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_001', difficulty: 'standard',
          question: 'Arabia before Islam (6th-7th century CE) was a tribal society organized around.',
          hint: 'Revisit Class 9 janapada/mahajanapada transition (c9_hist_ch3_3) — contrast tribal.',
          misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.',
          parts: [
                { id: 'a', prompt: 'What were the two primary ecological zones of the Arabian Peninsula that determined whether a group lived as pastoral nomads (Bedouins) or settled.', answer: 'The two zones were: (1) the desert interior (Najd) supporting pastoral nomadism',
                  options: ['The two zones were: (1) the desert interior (Najd) supporting pastoral nomadism', 'Mecca was nomadic', 'Yemen was desert', 'backward'],
                  hint: 'Revisit Class 9 janapada/mahajanapada transition (c9_hist_ch3_3) — contrast tribal *gana-sangha*.',
                  misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.' },
                { id: 'b', prompt: 'A merchant from Yemen wants to transport frankincense to Gaza (Mediterranean) in 580 CE.', answer: 'Route: Yemen (Sana\'a) → Najran → Mecca → Yathrib (Medina) → Dedan → Gaza',
                  options: ['Route: Yemen (Sana\'a) → Najran → Mecca → Yathrib (Medina) → Dedan → Gaza', 'backward', 'isolated', 'pre-Islamic Arabia was "backward" or "isolated" before Islam'],
                  hint: 'Revisit Class 9 janapada/mahajanapada transition (c9_hist_ch3_3) — contrast tribal *gana-sangha*.',
                  misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.' },
                { id: 'c', prompt: 'Compare the social cohesion mechanism of pre-Islamic tribal Arabia (asabiyya / group solidarity) with the varna-jati system in early India (Class 9).', answer: 'Asabiyya: cohesion through blood kinship and mutual defense',
                  options: ['Asabiyya: cohesion through blood kinship and mutual defense', 'caste-like', 'backward', 'isolated'],
                  hint: 'Revisit Class 9 janapada/mahajanapada transition (c9_hist_ch3_3) — contrast tribal *gana-sangha*.',
                  misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.' }
          ],
            remediations: { 'pre-islamic-arabia-was-backward': { steps: ['Map the Indian Ocean trade network (Class 10, c10_hist_cbse_03_001) — locate Aden, Hormuz, Cambay.', 'Trace overland routes from Yemen to Gaza/Palmyra — identify Mecca as the critical node.', 'Read Ibn Ishaq\'s *Sira* (translated) on the Fijar Wars and Hilf al-Fudul — these are intra-Quraysh commercial disputes.', 'Compare with Sangam literature (Class 6) — both show complex pre-imperial societies with trade, poetry, and kinship.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Pre-Islamic Mecca was a merchant republic governed by a council of clan elders (mala\'), making it politically distinct from the monarchies.', answer: 'Refute',
                  options: ['Refute', 'republic', 'backward', 'isolated'],
                  hint: 'Revisit Class 9 janapada/mahajanapada transition (c9_hist_ch3_3) — contrast tribal *gana-sangha*.',
                  misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.' },
                { id: 'b', prompt: 'Construct a 5-event timeline (570-610 CE) showing how Mecca\'s commercial prosperity created the very social tensions (wealth disparity, tribal factionalism.', answer: 'Sample timeline: (1) 570',
                  options: ['Sample timeline: (1) 570', 'backward', 'isolated', 'pre-Islamic Arabia was "backward" or "isolated" before Islam'],
                  hint: 'Revisit Class 9 janapada/mahajanapada transition (c9_hist_ch3_3) — contrast tribal *gana-sangha*.',
                  misconception: 'Students think pre-Islamic Arabia was "backward" or "isolated" before Islam.' }
          ],
            remediations: { 'pre-islamic-arabia-was-backward': { steps: ['Map the Indian Ocean trade network (Class 10, c10_hist_cbse_03_001) — locate Aden, Hormuz, Cambay.', 'Trace overland routes from Yemen to Gaza/Palmyra — identify Mecca as the critical node.', 'Read Ibn Ishaq\'s *Sira* (translated) on the Fijar Wars and Hilf al-Fudul — these are intra-Quraysh commercial disputes.', 'Compare with Sangam literature (Class 6) — both show complex pre-imperial societies with trade, poetry, and kinship.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_002', difficulty: 'standard',
          question: 'The Life of the Prophet Muhammad and the Founding of Islam refers to the.',
          hint: 'If stuck, revisit c11_hist_cbse_04_001 and map the *contradictions* in pre-Islamic Mecca.',
          misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the.',
          parts: [
                { id: 'a', prompt: 'In which year did the Hijra (migration of the Prophet and his followers from Mecca to Medina) occur, and why does this date mark the beginning of the Islamic.', answer: 'The Hijra occurred in 622 CE',
                  options: ['The Hijra occurred in 622 CE', 'by the sword'],
                  hint: 'If stuck, revisit c11_hist_cbse_04_001 and map the *contradictions* in pre-Islamic Mecca: wealth.',
                  misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the sword" in Arabia.' },
                { id: 'b', prompt: 'The Prophet Muhammad\'s early preaching in Mecca (610–622 CE) focused on Tawhid (monotheism) and social justice.', answer: 'The Quraysh elite opposed the Prophet',
                  options: ['The Quraysh elite opposed the Prophet', 'religious intolerance', 'polytheism vs monotheism', 'by the sword'],
                  hint: 'If stuck, revisit c11_hist_cbse_04_001 and map the *contradictions* in pre-Islamic Mecca: wealth.',
                  misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the sword" in Arabia.' }
          ],
            remediations: { 'the-prophet-s-success-was': { steps: ['Re-read c11_hist_cbse_04_001 (Arabia Before Islam) to reconstruct the *tribal balance of power* — the Prophet navigated.', 'Create a two-column table: "Meccan Period (610–622)" vs "Medinan Period (622–632)" — list events in each and label.', 'Compare the Constitution of Medina (c11_hist_cbse_04_002) with the later *Caliphate\'s* governance.', 'Ask: "If Islam spread by the sword in the Prophet\'s time, why did he grant amnesty to his fiercest Meccan enemies (Abu.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_003', difficulty: 'standard',
          question: 'The Five Pillars of Islam (Arkan al-Islam) are the five obligatory acts.',
          hint: 'Revisit c11_hist_cbse_04_002 — specifically the timeline: Salah mandated 621.',
          misconception: 'Students often believe the Five Pillars were **fully codified in the Quran as a fixed list of five**.',
          parts: [
                { id: 'a', prompt: 'What is the exact Arabic term for the declaration of faith that constitutes the first pillar of Islam, and what are its two essential components?', answer: 'The Arabic term is **Shahada** (الشهادة)',
                  options: ['The Arabic term is **Shahada** (الشهادة)', 'Kalima', 'Kalima" without the two parts, or confusing it with the adhan', 'the Five Pillars were **fully codified in the Quran as a fixed list of five**'],
                  hint: 'Revisit c11_hist_cbse_04_002 — specifically the timeline: Salah mandated 621 CE (Isra/Miraj), Zakat.',
                  misconception: 'Students often believe the Five Pillars were **fully codified in the Quran as a fixed list of five**.' },
                { id: 'b', prompt: 'A merchant in 8th century Baghdad calculates his zakat obligation.', answer: '**Step 1:** Convert all assets to a common standard (silver dirhams)',
                  options: ['**Step 1:** Convert all assets to a common standard (silver dirhams)', 'the Five Pillars were **fully codified in the Quran as a fixed list of five**'],
                  hint: 'Revisit c11_hist_cbse_04_002 — specifically the timeline: Salah mandated 621 CE (Isra/Miraj), Zakat.',
                  misconception: 'Students often believe the Five Pillars were **fully codified in the Quran as a fixed list of five**.' },
                { id: 'c', prompt: 'Compare the social function of Sawm (Ramadan fasting) in early Medinan society with the function of the Christian Lenten fast in medieval Europe.', answer: '**Similarities:** (1) Both synchronize the community\'s biological rhythms',
                  options: ['**Similarities:** (1) Both synchronize the community\'s biological rhythms', 'both are fasting', 'the Five Pillars were **fully codified in the Quran as a fixed list of five**'],
                  hint: 'Revisit c11_hist_cbse_04_002 — specifically the timeline: Salah mandated 621 CE (Isra/Miraj), Zakat.',
                  misconception: 'Students often believe the Five Pillars were **fully codified in the Quran as a fixed list of five**.' }
          ],
            remediations: { 'the-five-pillars-were-fully': { steps: ['If the student holds this misconception: 1.', '**Compare texts:** Give them Quran 2:177 (righteousness verse listing belief, prayer, charity, fasting, pilgrimage).', '**Map the timeline:** Plot Quranic revelation periods (Meccan vs.', 'Medinan) for each pillar\'s verses — show how obligations emerged *incrementally* (e.g., fasting mandated 2 AH, Hajj 9.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_004', difficulty: 'standard',
          question: 'The Quran is the central religious text of Islam, believed by Muslims to be the.',
          hint: 'If stuck, revisit c11_hist_cbse_04_002 (Life of the Prophet) for the revelation timeline.',
          misconception: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are.',
          parts: [
                { id: 'a', prompt: 'A historian finds a 9th-century Hadith collection claiming: "The Prophet said: \'Seek knowledge even unto China.\'" The isnad includes three trustworthy.', answer: 'The scholar would classify the Hadith as da\'if (weak)',
                  options: ['The scholar would classify the Hadith as da\'if (weak)', 'accept it because most narrators are trustworthy', 'reject it because China didn\'t exist then', 'part of the Quran'],
                  hint: 'If stuck, revisit c11_hist_cbse_04_002 (Life of the Prophet) for the revelation timeline and.',
                  misconception: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are simply "part of the.' }
          ],
            remediations: { 'the-quran-was-written-as': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Use a primary source excerpt.', 'upon Us is its collection [jam\'u] and its recitation [qur\'anu]") to see the Quran\'s own self-description as a recited.', '(2) Show a diagram of an isnad chain (e.g., Bukhari → Malik → Nafi\' → Ibn Umar → Prophet) and explain how each link was.', '(3) Assign a comparative exercise: list three legal rulings (e.g., prayer times, zakat rate, hajj rituals) and identify.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_005', difficulty: 'standard',
          question: 'The Rashidun Caliphate (632–661 CE) was the first Islamic state led by four.',
          hint: 'Revisit the Saqifah debate in c11_hist_cbse_04_002: focus on Umar\'s argument that "Arabs.',
          misconception: 'Students believe the Sunni-Shia split originated solely from a family dispute over Ali\'s cousinhood to the Prophet.',
          parts: [
                { id: 'a', prompt: 'Compare the administrative innovations of Umar ibn al-Khattab (diwan, garrison cities, judicial qadis) with the Mauryan administration (as studied in Class 6).', answer: 'Similarities: Both created centralized revenue systems (diwan vs',
                  options: ['Similarities: Both created centralized revenue systems (diwan vs', 'bureaucracy'],
                  hint: 'Revisit the Saqifah debate in c11_hist_cbse_04_002: focus on Umar\'s argument that "Arabs will not.',
                  misconception: 'Students believe the Sunni-Shia split originated solely from a family dispute over Ali\'s cousinhood to the Prophet.' }
          ],
            remediations: { 'the-sunni-shia-split-originated': { steps: ['Re-read the Saqifah episode (c11_hist_cbse_04_002) noting the Ansar\'s proposal for dual leadership (amir from Ansar.', 'Map the three legitimacy theories—tribal (Quraysh), religious (Prophet\'s family), communal (shura)—on a Venn diagram.', 'Trace how each caliph\'s selection leaned on one theory while ignoring others, creating the fault lines.', 'Write a 100-word answer to: "Was the Rashidun caliphate a republican or monarchical institution?" using the three.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_006', difficulty: 'standard',
          question: 'The Umayyad Caliphate (661–750 CE) was the first hereditary Islamic dynasty.',
          hint: 'Revisit the Battle of Siffin (657 CE) and the Kharijite secession.',
          misconception: 'Students often think the Umayyads were "secular" or "un-Islamic" rulers who ignored religion, citing their hereditary.',
          parts: [
                { id: 'a', prompt: 'Name the first Umayyad caliph, the year he assumed power, and the capital city he established.', answer: 'Mu\'awiya I became caliph in 661 CE and made Damascus the capital',
                  options: ['Mu\'awiya I became caliph in 661 CE and made Damascus the capital', 'secular', 'un-Islamic', 'Yazid I or selecting Medina'],
                  hint: 'Revisit the Battle of Siffin (657 CE) and the Kharijite secession in c11_hist_cbse_04_005; these.',
                  misconception: 'Students often think the Umayyads were "secular" or "un-Islamic" rulers who ignored religion, citing their hereditary rule and palace.' },
                { id: 'b', prompt: 'Explain why the Umayyads retained the Byzantine and Sasanian administrative frameworks in conquered provinces instead of imposing a uniform Islamic system.', answer: 'The Umayyads lacked a developed bureaucracy',
                  options: ['The Umayyads lacked a developed bureaucracy', 'religious tolerance', 'secular', 'un-Islamic'],
                  hint: 'Revisit the Battle of Siffin (657 CE) and the Kharijite secession in c11_hist_cbse_04_005; these.',
                  misconception: 'Students often think the Umayyads were "secular" or "un-Islamic" rulers who ignored religion, citing their hereditary rule and palace.' },
                { id: 'c', prompt: 'Compare the fiscal status of a mawali (non-Arab Muslim convert) in Khorasan under the Umayyads with that of a free peasant in the Mauryan empire (c. 300 BCE).', answer: 'Similarities: both paid land tax (kharaj / bali) to a central authority',
                  options: ['Similarities: both paid land tax (kharaj / bali) to a central authority', 'taxpayer', 'secular', 'un-Islamic'],
                  hint: 'Revisit the Battle of Siffin (657 CE) and the Kharijite secession in c11_hist_cbse_04_005; these.',
                  misconception: 'Students often think the Umayyads were "secular" or "un-Islamic" rulers who ignored religion, citing their hereditary rule and palace.' }
          ],
            remediations: { 'the-umayyads-were-secular-or': { steps: ['If the student holds this misconception, have them compare the Dome of the Rock inscriptions (Quranic verses 17:1.', 'Ask: "Which caliph removed the Shahada from coins?" (Answer: none; both used it).', 'Then analyse the Pact of Umar (attributed to Umar II) regulating non-Muslims.', 'This shows Umayyads actively shaped Islamic public symbolism while maintaining Arab privilege.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
