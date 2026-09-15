import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch06_p2: SimDef = {
    id: 'v3_c12_hist_ch06_p2',
    title: 'Bhakti-Sufi Traditions (Religious Ferment) · Part 2/2',
    subtitle: 'The artisans\' saints the kings couldn\'t afford',
    classLevel: 12, subject: 'history', topic: 'Bhakti-Sufi Traditions (Religious Ferment) · Part 2/2',
    chapters: ['c12_hist_ch06'],
    nodeIds: ['c12_hist_cbse_06_007', 'c12_hist_cbse_06_008', 'c12_hist_cbse_06_009', 'c12_hist_cbse_06_010', 'c12_hist_cbse_06_011', 'c12_hist_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Religious-history analyst', intro: 'Before Bhakti swept the land, the weavers and potters were already listening to teachers the courts wouldn\'t touch.', goal: 'Map the 8th-century ferment — Tantra, declining Buddhism/Jainism, and the artisanal rise of Naths and Siddhas.' },
    discovery: {
        question: 'Naths, Jogis and Siddhas packed artisan crowds in 8th-century towns — yet never won a king\'s patronage. What kept them at the margins?',
        options: ['Rajput states ran on Brahmana legitimacy — groups questioning Vedic authority and caste were popular with weavers but politically radioactive to courts', 'They were unpopular', 'They had no teachers', 'Buddhism blocked them'],
        answer: 'Rajput states ran on Brahmana legitimacy — groups questioning Vedic authority and caste were popular with weavers but politically radioactive to courts',
        hook: 'The religious map wasn\'t one Hinduism — \'great\' Puranic tradition beside \'little\' Tantric cults open to women and lower castes. And the equilibrium had a fuse: the 13th-century Sultanate would crack the Rajput-Brahmana order and open space for Bhakti and Sufi voices.',
    },
    teaching: [
        { title: 'Kabir: Bijak, Ulatbansi (Upside-Down Sayings) and the Oral Tradition', text: 'Kabir (c. 14th–15th century CE) was a nirguna bhakti poet-saint from the Awadh region (present-day Uttar Pradesh) whose verses — composed in sant bhasha and preserved orally before compilation in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Survey the ferment: map Tantric, Buddhist, Jain and Puranic streams on one landscape, weigh why artisans flocked to the heterodox teachers, and follow the patronage that decided who lasted.',
        labels: ['Kabir: Bijak, Ulatbansi (Upside-Down', 'The Nath Tradition, Jogis', 'Sufism in India: Chishti,', 'The Chishti Silsila: Khwaja', 'Ziyarat, Qawwali and', 'Dara Shukoh and'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_007', title: 'Kabir: Bijak, Ulatbansi (Upside-Down Sayings) and the Oral Tradition',
          caseStudy: { intro: 'Imagine you hear a street singer in Varanasi singing: "The lotus blooms without a flower / Fire rages in the ocean." You\'d think it\'s nonsense — but that\'s.',
            decisions: [{ prompt: 'What is the literal meaning of the term "ulatbansi" and which poet-saint\'s compositions are most famously associated with this genre?', options: [
                { text: 'Ulatbansi literally means "upside-down sayings" (ulta = inverted, bansi = saying/flute)', outcome: 'Ulatbansi literally means "upside-down sayings" (ulta = inverted, bansi = saying/flute) and is most.' },
                { text: 'paradoxical verses', outcome: 'Not quite — Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who.', reveals: 'kabir-was-a-hindu-reformer' },
                { text: 'Hindu reformer who criticized Islam', outcome: 'Not quite — Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who.', reveals: 'kabir-was-a-hindu-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_008', title: 'The Nath Tradition, Jogis and the Syncretic Sant Parampara',
          caseStudy: { intro: 'Imagine you visit the Gorakhnath Temple in Gorakhpur or see a Jogi with split ears (kanphata) at a village fair — what makes them different from a Brahmin.',
            decisions: [{ prompt: 'Name the two legendary founders of the Nath Panth and the approximate century when the tradition became prominent in North India.', options: [
                { text: 'Matsyendranath and Gorakhnath (c', outcome: 'Matsyendranath and Gorakhnath (c. 11th–12th century); the Nath tradition gained prominence in North.' },
                { text: 'Kabir or Nanak as founders, or placing it in the 15th century', outcome: 'Not quite — Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.', reveals: 'students-often-equate-jogi-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_010', title: 'The Chishti Silsila: Khwaja Muinuddin, Nizamuddin Auliya and Khanqahs',
          caseStudy: { intro: 'Imagine you visit the dargah of Khwaja Muinuddin Chishti in Ajmer today: you see people of all faiths tying threads, offering chadar, and listening to qawwali.',
            decisions: [{ prompt: 'In which year did Khwaja Muinuddin Chishti die, and where is his dargah located?', options: [
                { text: 'Khwaja Muinuddin Chishti died in 1235 CE, and his dargah is located in Ajmer, Rajasthan', outcome: 'Khwaja Muinuddin Chishti died in 1235 CE, and his dargah is located in Ajmer, Rajasthan.' },
                { text: 'the Chishti Silsila was a monolithic, unchanging institution from its inception', outcome: 'Not quite — Students often think the Chishti Silsila was a monolithic, unchanging institution from its.', reveals: 'the-chishti-silsila-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_012', title: 'Dara Shukoh and the Sufi-Mughal Dialogue: Majmua-ul-Bahrain',
          caseStudy: { intro: 'Imagine you are visiting the Dara Shikoh Library in Delhi (now part of the Ambedkar University campus) and see a manuscript of *Majmua-ul-Bahrain*.',
            decisions: [{ prompt: 'In which year did Dara Shukoh complete *Majmua-ul-Bahrain*, and which two "oceans" does the title refer to?', options: [
                { text: '*Majmua-ul-Bahrain* was completed around 1655 CE', outcome: '*Majmua-ul-Bahrain* was completed around 1655 CE. The "two oceans" are *Sufism* (Islamic mysticism).' },
                { text: 'Bhakti and Sufism', outcome: 'Not quite — Students often think *Majmua-ul-Bahrain* is a translation of the Upanishads (confusing it with.', reveals: 'majmua-ul-bahrain-is-a' },
                { text: 'Quran and Vedas', outcome: 'Not quite — Students often think *Majmua-ul-Bahrain* is a translation of the Upanishads (confusing it with.', reveals: 'majmua-ul-bahrain-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A district administration announces lavish funding for a folk-singers\' festival, canonising local saint-poets on official banners. A teammate calls it \'pure cultural generosity with no politics.\'',
            decisions: [{ prompt: 'What did the Chola patronage of the Nayanars and Alvars teach about such generosity?', options: [
                { text: 'Read it as legitimation, not charity — the Cholas built grand temples, inscribed the saints\' hymns into ritual and cast Appar, Sambandar and Sundarar in bronze, welding royal power to saintly authority; the state doesn\'t just honour bhakti, it becomes its protector.', outcome: 'The chapter\'s insight: patronage is political technology — rulers gain from embedding themselves inside popular devotion, so \'no politics\' funding should always be read for what the funder gains.' },
                { text: 'Agree — funding folk art is the state\'s cultural duty, end of analysis.', outcome: 'The Chola case shows the mechanism behind such duty: minor chiefs became emperors partly by consecrating saints; generosity and legitimation are the same act seen from two sides.', reveals: 'patronage-is-apolitical' },
                { text: 'Oppose the festival — any state touch corrupts the tradition it funds.', outcome: 'The bhakti case cuts both ways: Chola patronage preserved the Tevaram and spread it — the distortion is real but so is the institutionalisation that kept the hymns alive; purity narratives miss the trade.', reveals: 'patronage-always-corrupts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'You can now read 8th-century religion as an ecology of competing audiences — and see why patronage, not doctrine, often decides which faith survives.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_007', difficulty: 'standard',
          question: 'Kabir (c. 14th–15th century CE) was a nirguna bhakti poet-saint from the Awadh.',
          hint: 'Revisit the "Two broad categories: saguna and nirguna" section in NCERT Chapter 6 (p.',
          misconception: 'Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who used Hindu terms".',
          parts: [
                { id: 'a', prompt: 'Compare the theological vocabulary Kabir draws from Islamic, Vedantic, and yogic traditions.', answer: 'Kabir uses Allah, Khuda, Hazrat, Pir (Islamic)',
                  options: ['Kabir uses Allah, Khuda, Hazrat, Pir (Islamic)', 'Hindu reformer who criticized Islam', 'Muslim saint who used Hindu terms', 'terms without analyzing what their coexistence implies'],
                  hint: 'Revisit the "Two broad categories: saguna and nirguna" section in NCERT Chapter 6 (p.',
                  misconception: 'Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who used Hindu terms" — i.e., they assign him.' }
          ],
            remediations: { 'kabir-was-a-hindu-reformer': { steps: ['If the student cannot articulate why Kabir\'s syncretism is not "borrowing" but a third position: (1) Re-read Source 10.', '(2) Revisit node c12_hist_cbse_06_006 (Saguna vs Nirguna) to recall that nirguna bhakti *by definition* rejects.', '(3) Compare with Baba Guru Nanak (next node) who similarly refuses Hindu/Muslim labels.', '(4) Re-attempt Diagnostic Question 4 with this framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_008', difficulty: 'standard',
          question: 'The Nath Tradition (Nath Panth), Jogis, and Siddhas were interconnected yogic.',
          hint: 'If stuck, re-read NCERT p. 148 (Naths/Jogis/Siddhas as artisanal, vernacular, anti-Vedic).',
          misconception: 'Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.',
          parts: [
                { id: 'a', prompt: 'Name the two legendary founders of the Nath Panth and the approximate century when the tradition became prominent in North India.', answer: 'Matsyendranath and Gorakhnath (c',
                  options: ['Matsyendranath and Gorakhnath (c', 'Kabir or Nanak as founders, or placing it in the 15th century'],
                  hint: 'If stuck, re-read NCERT p. 148 (Naths/Jogis/Siddhas as artisanal, vernacular, anti-Vedic) and p.',
                  misconception: 'Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.' },
                { id: 'b', prompt: 'Why did the Nath-Jogi-Siddha leaders, despite their popularity among artisans and peasants, fail to secure sustained patronage from Rajput ruling elites before.', answer: 'Rajput states relied on Brahmanas for ritual and administrative legitimacy',
                  options: ['Rajput states relied on Brahmanas for ritual and administrative legitimacy', 'lack of temples', 'foreign origin'],
                  hint: 'If stuck, re-read NCERT p. 148 (Naths/Jogis/Siddhas as artisanal, vernacular, anti-Vedic) and p.',
                  misconception: 'Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.' }
          ],
            remediations: { 'students-often-equate-jogi-with': { steps: ['148–149 (Religious Ferment in North India) and pp.', '161–163 (Kabir\'s vocabulary).', 'Revisit c12_hist_cbse_06_001 (Religious Ferment: Tantrism, Jainism) for the "great/little tradition" framework.', 'Revisit c12_hist_cbse_06_007 (Kabir: Bijak, Ulatbansi) and map each Kabir term (alakh, nirakar, shabda, shunya) to its.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_009', difficulty: 'standard',
          question: 'Sufism in India refers to the institutionalisation of Islamic mysticism.',
          hint: 'If the silsila concept is unclear, revisit c6_history_ch06_017 (Class 6) "The Sufi.',
          misconception: 'Students treat "Sufism" as a monolith and assume all silsilas practiced sama\', used Hindavi, and rejected state power.',
          parts: [
                { id: 'a', prompt: 'Explain why the Chishti silsila deliberately maintained distance from political power while the Suhrawardi and Naqshbandi silsilas accepted courtly positions.', answer: 'The Chishtis viewed political proximity as a threat to spiritual autonomy',
                  options: ['The Chishtis viewed political proximity as a threat to spiritual autonomy', 'apolitical'],
                  hint: 'If the silsila concept is unclear, revisit c6_history_ch06_017 (Class 6) "The Sufi Movement.',
                  misconception: 'Students treat "Sufism" as a monolith and assume all silsilas practiced sama\', used Hindavi, and rejected state power.' }
          ],
            remediations: { 'students-treat-sufism-as-a': { steps: ['Re-read NCERT pp.153–160, highlighting every sentence that names a specific silsila.', 'Create a 4×5 matrix (4 silsilas × 5 attributes: origin, centre, language, state link, practice) using ONLY highlighted.', 'For each empty cell, locate the missing detail in the chapter (e.g., Qadiri centres → "Bijapur, Karnataka" p.158.', 'Re-attempt Diagnostic Question 6. If still stuck, revisit c6_history_ch06_017 (Class 6 Sufi basics) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_010', difficulty: 'standard',
          question: 'The Chishti Silsila is a Sufi order that migrated to the Indian subcontinent.',
          hint: 'If stuck, revisit the definition of "khanqah" and "silsila" in c12_hist_cbse_06_009 and.',
          misconception: 'Students often think the Chishti Silsila was a monolithic, unchanging institution from its inception.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Chishti Silsila is a Sufi order that migrated to the Indian subcontinent in the late',
                  options: ['The Chishti Silsila is a Sufi order that migrated to the Indian subcontinent in the late', 'Religious ferment in North India (c', 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to', 'The Nayanars were Tamil Shaivite poet-saints (6th–9th centuries CE) who composed'],
                  hint: 'If stuck, revisit the definition of "khanqah" and "silsila" in c12_hist_cbse_06_009 and the account.',
                  misconception: 'Students often think the Chishti Silsila was a monolithic, unchanging institution from its inception.' }
          ],
            remediations: { 'the-chishti-silsila-was-a': { steps: ['If the student conflates the early and mature phases of the Chishti order: (1) Re-read the NCERT section "Life in the.', '154–155) and create a two-column table comparing Muinuddin\'s khanqah (based on later hagiographies) with Nizamuddin\'s.', '(2) Watch a 10-minute documentary clip on the Ajmer dargah\'s architecture to see how the physical complex expanded over.', '(3) Re-attempt Diagnostic Question 4 focusing on the evolution of sama.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Chishti Silsila was a monolithic, unchanging institution from its inception.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Mughal emperor Akbar\'s fourteen visits to Ajmer dargah were purely acts of personal piety with no political calculation."', answer: 'The statement is false',
                  options: ['The statement is false', 'the Chishti Silsila was a monolithic, unchanging institution from its inception'],
                  hint: 'If stuck, revisit the definition of "khanqah" and "silsila" in c12_hist_cbse_06_009 and the account.',
                  misconception: 'Students often think the Chishti Silsila was a monolithic, unchanging institution from its inception.' },
                { id: 'b', prompt: 'Construct a timeline showing the transmission of Chishti spiritual authority from Khwaja Muinuddin to Nasiruddin Chiragh-i-Dehli, including the key mechanism.', answer: 'A correct timeline: (1) Khwaja Muinuddin (d',
                  options: ['A correct timeline: (1) Khwaja Muinuddin (d', 'the Chishti Silsila was a monolithic, unchanging institution from its inception'],
                  hint: 'If stuck, revisit the definition of "khanqah" and "silsila" in c12_hist_cbse_06_009 and the account.',
                  misconception: 'Students often think the Chishti Silsila was a monolithic, unchanging institution from its inception.' }
          ],
            remediations: { 'the-chishti-silsila-was-a': { steps: ['If the student conflates the early and mature phases of the Chishti order: (1) Re-read the NCERT section "Life in the.', '154–155) and create a two-column table comparing Muinuddin\'s khanqah (based on later hagiographies) with Nizamuddin\'s.', '(2) Watch a 10-minute documentary clip on the Ajmer dargah\'s architecture to see how the physical complex expanded over.', '(3) Re-attempt Diagnostic Question 4 focusing on the evolution of sama.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_011', difficulty: 'standard',
          question: 'Ziyarat, qawwali, and the dargah represent the core devotional practices of the.',
          hint: 'Revisit c12_hist_cbse_06_010 (The Chishti Silsila) and the table of Major Teachers.',
          misconception: 'Students often believe that ziyarat at Sufi dargahs is \'idol worship\' or \'grave worship\' prohibited in Islam, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ziyarat, qawwali, and the dargah represent the core devotional practices of the Chishti',
                  options: ['Ziyarat, qawwali, and the dargah represent the core devotional practices of the Chishti', 'Religious ferment in North India (c', 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to', 'The Nayanars were Tamil Shaivite poet-saints (6th–9th centuries CE) who composed'],
                  hint: 'Revisit c12_hist_cbse_06_010 (The Chishti Silsila) and the table of Major Teachers on p.154.',
                  misconception: 'Students often believe that ziyarat at Sufi dargahs is \'idol worship\' or \'grave worship\' prohibited in Islam, and therefore see it as.' }
          ],
            remediations: { 'ziyarat-at-sufi-dargahs-is': { steps: ['If the student holds the above misconception: (1) Re-read NCERT Section 6.2 \'Outside the khanqah\' on be-shari\'a.', '(2) Compare with Source 7 (Dargah Quli Khan\'s account) showing Muslims and Hindus visiting Nasiruddin Chiragh-i Dehli\'s.', '(3) Re-attempt Diagnostic Question 5 with this framework: evaluate whether qawwali/ziyarat are \'syncretic\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_012', difficulty: 'standard',
          question: 'Dara Shukoh (1615–1659), the eldest son of Mughal Emperor Shah Jahan, was.',
          hint: 'Revisit c6_history_ch09_037 (Shah Jahan and Aurangzeb) for the succession war, and.',
          misconception: 'Students often think *Majmua-ul-Bahrain* is a translation of the Upanishads (confusing it with *Sirr-i-Akbar*, 1656–57).',
          parts: [
                { id: 'a', prompt: 'In which year did Dara Shukoh complete *Majmua-ul-Bahrain*, and which two "oceans" does the title refer to?', answer: '*Majmua-ul-Bahrain* was completed around 1655 CE',
                  options: ['*Majmua-ul-Bahrain* was completed around 1655 CE', 'Bhakti and Sufism', 'Quran and Vedas', 'syncretic religion'],
                  hint: 'Revisit c6_history_ch09_037 (Shah Jahan and Aurangzeb) for the succession war, and.',
                  misconception: 'Students often think *Majmua-ul-Bahrain* is a translation of the Upanishads (confusing it with *Sirr-i-Akbar*, 1656–57) or that it created.' },
                { id: 'b', prompt: 'Analyze the following equivalence from *Majmua-ul-Bahrain*: Sufi *qalb* (heart) = Vedantic *hridaya* (heart) as the locus of divine knowledge.', answer: 'This represents *semantic mapping*: identifying a shared technical term in both',
                  options: ['This represents *semantic mapping*: identifying a shared technical term in both', 'syncretism', 'syncretic religion'],
                  hint: 'Revisit c6_history_ch09_037 (Shah Jahan and Aurangzeb) for the succession war, and.',
                  misconception: 'Students often think *Majmua-ul-Bahrain* is a translation of the Upanishads (confusing it with *Sirr-i-Akbar*, 1656–57) or that it created.' }
          ],
            remediations: { 'majmua-ul-bahrain-is-a': { steps: ['If the student confuses *Majmua-ul-Bahrain* with *Sirr-i-Akbar*, re-read the distinction: *Sirr-i-Akbar* = translation.', 'If they think it was a mass movement, review c12_hist_cbse_06_011 (Chishti *sama* as popular practice) vs.', 'Dara\'s elite intellectual circle.', 'If they attribute its failure only to ulama opposition, revisit c12_hist_cbse_06_009 (Naqshbandi Sirhindi\'s critique).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
