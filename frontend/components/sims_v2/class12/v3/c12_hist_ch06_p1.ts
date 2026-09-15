import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch06_p1: SimDef = {
    id: 'v3_c12_hist_ch06_p1',
    title: 'Bhakti-Sufi Traditions (Religious Ferment) · Part 1/2',
    subtitle: 'The artisans\' saints the kings couldn\'t afford',
    classLevel: 12, subject: 'history', topic: 'Bhakti-Sufi Traditions (Religious Ferment) · Part 1/2',
    chapters: ['c12_hist_ch06'],
    nodeIds: ['c12_hist_cbse_06_001', 'c12_hist_cbse_06_002', 'c12_hist_cbse_06_003', 'c12_hist_cbse_06_004', 'c12_hist_cbse_06_005', 'c12_hist_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Religious-history analyst', intro: 'Before Bhakti swept the land, the weavers and potters were already listening to teachers the courts wouldn\'t touch.', goal: 'Map the 8th-century ferment — Tantra, declining Buddhism/Jainism, and the artisanal rise of Naths and Siddhas.' },
    discovery: {
        question: 'Naths, Jogis and Siddhas packed artisan crowds in 8th-century towns — yet never won a king\'s patronage. What kept them at the margins?',
        options: ['Rajput states ran on Brahmana legitimacy — groups questioning Vedic authority and caste were popular with weavers but politically radioactive to courts', 'They were unpopular', 'They had no teachers', 'Buddhism blocked them'],
        answer: 'Rajput states ran on Brahmana legitimacy — groups questioning Vedic authority and caste were popular with weavers but politically radioactive to courts',
        hook: 'The religious map wasn\'t one Hinduism — \'great\' Puranic tradition beside \'little\' Tantric cults open to women and lower castes. And the equilibrium had a fuse: the 13th-century Sultanate would crack the Rajput-Brahmana order and open space for Bhakti and Sufi voices.',
    },
    teaching: [
        { title: 'Religious Ferment in North India: Tantrism, Jainism and Buddhism c. 8th Century', text: 'Religious ferment in North India (c. 8th century) refers to the dynamic interplay between Brahmanical Puranic traditions, Tantric practices (influencing Shaivism and Buddhism), and the persistent but.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Survey the ferment: map Tantric, Buddhist, Jain and Puranic streams on one landscape, weigh why artisans flocked to the heterodox teachers, and follow the patronage that decided who lasted.',
        labels: ['Religious Ferment in North', 'The Nayanars and Alvars', 'Nayanar Saints: Appar, Sambandar', 'Alvar Saints: Andal, Nammalvar', 'Women Bhakti Saints: Andal,', 'Saguna vs Nirguna Bhakti'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_002', title: 'The Nayanars and Alvars: Tamil Devotional Movements and Bhakti Origins',
          caseStudy: { intro: 'Imagine you visit the Brihadisvara Temple at Thanjavur and see bronze images of three saints — Appar, Sambandar, Sundarar — carried in festival processions.',
            decisions: [{ prompt: 'Name the two primary Tamil bhakti groups of the early medieval period, their chosen deities, and the language of their compositions.', options: [
                { text: 'The Nayanars (63 saints) devoted to Shiva and the Alvars (12 saints) devoted to Vishnu,', outcome: 'The Nayanars (63 saints) devoted to Shiva and the Alvars (12 saints) devoted to Vishnu, both.' },
                { text: 'they wrote in Sanskrit', outcome: 'Not quite — Students often believe the Nayanars and Alvars "rejected caste entirely" or "created a casteless.', reveals: 'the-nayanars-and-alvars-rejected' },
                { text: 'Nayanars worshipped Vishnu', outcome: 'Not quite — Students often believe the Nayanars and Alvars "rejected caste entirely" or "created a casteless.', reveals: 'the-nayanars-and-alvars-rejected' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_003', title: 'Nayanar Saints: Appar, Sambandar and Sundarar and Shiva Devotion',
          caseStudy: { intro: 'Imagine you visit the Brihadisvara Temple at Thanjavur and see bronze images of three saints carried in procession — who are they and why do they matter?',
            decisions: [{ prompt: 'Name the Tamil Shaiva canonical collection formed by the hymns of Appar, Sambandar, and Sundarar, and state the century in which it was.', options: [
                { text: 'The collection is the Tevaram, compiled in the 10th century CE', outcome: 'The collection is the Tevaram, compiled in the 10th century CE.' },
                { text: 'Nalayira Divyaprabandham', outcome: 'Not quite — Students often think the Nayanars were a single homogeneous group who all lived at the same time.', reveals: 'the-nayanars-were-a-single' },
                { text: 'Periya Puranam', outcome: 'Not quite — Students often think the Nayanars were a single homogeneous group who all lived at the same time.', reveals: 'the-nayanars-were-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_004', title: 'Alvar Saints: Andal, Nammalvar and Vaishnava Bhakti Poetry',
          caseStudy: { intro: 'Imagine you are standing in the Srirangam temple in Tamil Nadu during the *Margazhi* month (December–January) and hear priests chanting *Tiruppavai* in melodic.',
            decisions: [{ prompt: 'Who compiled the *Nalayira Divyaprabandham* and approximately when?', options: [
                { text: 'The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE', outcome: 'The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE.' },
                { text: 'compiled by Ramanuja in the 12th century', outcome: 'Not quite — Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal),.', reveals: '1-all-alvars-were-male' },
                { text: 'written by the Alvars themselves as a single book', outcome: 'Not quite — Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal),.', reveals: '1-all-alvars-were-male' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_005', title: 'Women Bhakti Saints: Andal, Karaikkal Ammaiyar and Mirabai',
          caseStudy: { intro: 'Imagine you are visiting the Meenakshi Temple in Madurai during the Aadi Pooram festival — you hear thousands singing Andal\'s Tiruppavai, a composition by.',
            decisions: [{ prompt: 'Name the specific Alvar saint who is the only woman among the twelve Alvars, and identify the two major Tamil compositions attributed.', options: [
                { text: 'Andal is the only woman among the twelve Alvars', outcome: 'Andal is the only woman among the twelve Alvars. Her two major compositions are Tiruppavai (30.' },
                { text: 'women\'s bhakti movement', outcome: 'Not quite — Students often assume these three women represent a unified "women\'s bhakti movement" with shared.', reveals: 'these-three-women-represent-a' },
                { text: 'Nammalvar or confusing her with Karaikkal Ammaiyar', outcome: 'Not quite — Students often assume these three women represent a unified "women\'s bhakti movement" with shared.', reveals: 'these-three-women-represent-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_006', title: 'Saguna vs Nirguna Bhakti: Tulsidas, Surdas vs Kabir and Nanak',
          caseStudy: { intro: 'Imagine you visit a Ramlila in Varanasi during Dussehra and hear Tulsidas’s *Ramcharitmanas* recited, then walk to a nearby Kabir *math* where a weaver sings.',
            decisions: [{ prompt: 'Name the vernacular language used by Tulsidas for the *Ramcharitmanas* and the language used by Guru Nanak for his hymns.', options: [
                { text: 'Tulsidas composed the *Ramcharitmanas* in Avadhi (Eastern Hindi)', outcome: 'Tulsidas composed the *Ramcharitmanas* in Avadhi (Eastern Hindi); Guru Nanak composed his hymns.' },
                { text: 'saguna = Hindu, nirguna = Muslim', outcome: 'Not quite — Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu.', reveals: 'saguna-hindu' },
                { text: 'half-Hindu, half-Muslim', outcome: 'Not quite — Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu.', reveals: 'saguna-hindu' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A district administration announces lavish funding for a folk-singers\' festival, canonising local saint-poets on official banners. A teammate calls it \'pure cultural generosity with no politics.\'',
            decisions: [{ prompt: 'What did the Chola patronage of the Nayanars and Alvars teach about such generosity?', options: [
                { text: 'Read it as legitimation, not charity — the Cholas built grand temples, inscribed the saints\' hymns into ritual and cast Appar, Sambandar and Sundarar in bronze, welding royal power to saintly authority; the state doesn\'t just honour bhakti, it becomes its protector.', outcome: 'The chapter\'s insight: patronage is political technology — rulers gain from embedding themselves inside popular devotion, so \'no politics\' funding should always be read for what the funder gains.' },
                { text: 'Agree — funding folk art is the state\'s cultural duty, end of analysis.', outcome: 'The Chola case shows the mechanism behind such duty: minor chiefs became emperors partly by consecrating saints; generosity and legitimation are the same act seen from two sides.', reveals: 'patronage-is-apolitical' },
                { text: 'Oppose the festival — any state touch corrupts the tradition it funds.', outcome: 'The bhakti case cuts both ways: Chola patronage preserved the Tevaram and spread it — the distortion is real but so is the institutionalisation that kept the hymns alive; purity narratives miss the trade.', reveals: 'patronage-always-corrupts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read 8th-century religion as an ecology of competing audiences — and see why patronage, not doctrine, often decides which faith survives.',
            decisions: [{ prompt: 'What comes next? Bhakti-Sufi Traditions (Religious Ferment) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bhakti-Sufi Traditions (Religious Ferment) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_001', difficulty: 'standard',
          question: 'Religious ferment in North India (c. 8th century) refers to the dynamic.',
          hint: 'If stuck, revisit the Gupta period (c6_history_ch05_013) and the post-Gupta political.',
          misconception: 'Students often believe Buddhism and Jainism had completely disappeared from North India by the 8th century because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Religious ferment in North India (c',
                  options: ['Religious ferment in North India (c', 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to', 'The Nayanars were Tamil Shaivite poet-saints (6th–9th centuries CE) who composed', 'The Alvar saints (c'],
                  hint: 'If stuck, revisit the Gupta period (c6_history_ch05_013) and the post-Gupta political fragmentation.',
                  misconception: 'Students often believe Buddhism and Jainism had completely disappeared from North India by the 8th century because they confuse the.' }
          ],
            remediations: { 'buddhism-and-jainism-had-completely': { steps: ['If the student holds this misconception, have them: (1) Re-read NCERT page 142 (Tantric practices influencing Buddhism.', '(2) Map the major Buddhist sites (Nalanda, Bodh Gaya) and Jain centres (Rajasthan, Gujarat) that remained active.', '(3) Re-attempt Diagnostic Question 4 with focus on *evidence of presence* vs *dominance*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_002', difficulty: 'standard',
          question: 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints.',
          hint: 'If unclear on the Vedic-to-Puranic transition, revisit c9_hist_ch3_11 ("Religion: Yajnas.',
          misconception: 'Students often believe the Nayanars and Alvars "rejected caste entirely" or "created a casteless society." In reality.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to',
                  options: ['The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to', 'Religious ferment in North India (c', 'The Nayanars were Tamil Shaivite poet-saints (6th–9th centuries CE) who composed', 'The Alvar saints (c'],
                  hint: 'If unclear on the Vedic-to-Puranic transition, revisit c9_hist_ch3_11 ("Religion: Yajnas, Nature.',
                  misconception: 'Students often believe the Nayanars and Alvars "rejected caste entirely" or "created a casteless society." In reality, they *critiqued*.' }
          ],
            remediations: { 'the-nayanars-and-alvars-rejected': { steps: ['If the student conflates "critique of caste hierarchy" with "abolition of caste," have them: (1) Re-read Source 1.', '(2) Compare with Basavanna\'s Virashaivas (next node, c12_hist_cbse_06_003) who *explicitly* rejected cremation rites.', '(3) Complete a table: "Nayanar/Alvar attitude" vs.', '"Modern constitutional abolition" to sharpen the historical distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_003', difficulty: 'standard',
          question: 'The Nayanars were Tamil Shaivite poet-saints (6th–9th centuries CE) who.',
          hint: 'If stuck, revisit the "Bhakti Movement: Devotion to God" (c6_history_ch06_016) and the.',
          misconception: 'Students often think the Nayanars were a single homogeneous group who all lived at the same time and wrote the Tevaram.',
          parts: [
                { id: 'a', prompt: 'Name the Tamil Shaiva canonical collection formed by the hymns of Appar, Sambandar, and Sundarar, and state the century in which it was compiled.', answer: 'The collection is the Tevaram, compiled in the 10th century CE',
                  options: ['The collection is the Tevaram, compiled in the 10th century CE', 'Nalayira Divyaprabandham', 'Periya Puranam'],
                  hint: 'If stuck, revisit the "Bhakti Movement: Devotion to God" (c6_history_ch06_016) and the "Nayanars.',
                  misconception: 'Students often think the Nayanars were a single homogeneous group who all lived at the same time and wrote the Tevaram together.' }
          ],
            remediations: { 'the-nayanars-were-a-single': { steps: ['If the student conflates the saints\' lives with the Tevaram compilation, have them: (1) Re-read the NCERT box.', '144) and note the 300-year gap.', '(2) Create a two-column table: "Saint\'s lifetime" vs "Textual compilation" with dates.', '(3) Re-attempt Diagnostic Question 6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_004', difficulty: 'standard',
          question: 'The Alvar saints (c. 6th–9th century CE) were Tamil poet-saints immersed.',
          hint: 'If stuck, revisit the bhakti movement overview in Class 6 (c6_history_ch06_016) and the.',
          misconception: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter.',
          parts: [
                { id: 'a', prompt: 'Who compiled the *Nalayira Divyaprabandham* and approximately when?', answer: 'The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE',
                  options: ['The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE', 'compiled by Ramanuja in the 12th century', 'written by the Alvars themselves as a single book'],
                  hint: 'If stuck, revisit the bhakti movement overview in Class 6 (c6_history_ch06_016) and the Tamil.',
                  misconception: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter (Tirupanalvar), and.' },
                { id: 'b', prompt: 'Why is Andal considered unique among the twelve Alvars?', answer: 'Andal is the only woman among the twelve Alvars',
                  options: ['Andal is the only woman among the twelve Alvars', 'she was a queen', 'she wrote in Sanskrit'],
                  hint: 'If stuck, revisit the bhakti movement overview in Class 6 (c6_history_ch06_016) and the Tamil.',
                  misconception: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter (Tirupanalvar), and.' }
          ],
            remediations: { '1-all-alvars-were-male': { steps: ['Revisit **c12_hist_cbse_06_002** (Nayanars and Alvars overview) to reset the Tamil bhakti landscape.', '143–145 (Alvar section) and make a two-column table: *Alvar name / Caste background / Key work / Social message*.', 'Watch a 5-minute clip of *Tiruppavai* recitation in a temple (YouTube: "Tiruppavai Margazhi Srirangam") to hear the.', 'Re-attempt Diagnostic Questions 2 and 3, writing answers in your own words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_005', difficulty: 'standard',
          question: 'This node examines three prominent women bhakti saints — Andal (9th century.',
          hint: 'If stuck on Alvar/Nayanar distinction: Revisit node c12_hist_cbse_06_002 (The Nayanars.',
          misconception: 'Students often assume these three women represent a unified "women\'s bhakti movement" with shared goals.',
          parts: [
                { id: 'a', prompt: 'Name the specific Alvar saint who is the only woman among the twelve Alvars, and identify the two major Tamil compositions attributed to her that are still.', answer: 'Andal is the only woman among the twelve Alvars',
                  options: ['Andal is the only woman among the twelve Alvars', 'women\'s bhakti movement', 'Nammalvar or confusing her with Karaikkal Ammaiyar'],
                  hint: 'If stuck on Alvar/Nayanar distinction: Revisit node c12_hist_cbse_06_002 (The Nayanars and Alvars).',
                  misconception: 'Students often assume these three women represent a unified "women\'s bhakti movement" with shared goals.' },
                { id: 'b', prompt: 'Karaikkal Ammaiyar describes herself in a poem as a "female Pey (demoness) with bulging veins, protruding eyes, white teeth and shrunken stomach." Explain WHY.', answer: 'Karaikkal Ammaiyar deliberately fashions herself as a demoness (pey) to reject',
                  options: ['Karaikkal Ammaiyar deliberately fashions herself as a demoness (pey) to reject', 'women\'s bhakti movement'],
                  hint: 'If stuck on Alvar/Nayanar distinction: Revisit node c12_hist_cbse_06_002 (The Nayanars and Alvars).',
                  misconception: 'Students often assume these three women represent a unified "women\'s bhakti movement" with shared goals.' }
          ],
            remediations: { 'these-three-women-represent-a': { steps: ['If the student conflates the three saints or misses the caste-gender intersection: 1) Re-read NCERT pp.', '143-145 (Andal, Karaikkal Ammaiyar) and pp.', '163-165 (Mirabai) with a three-column table: Social Background | Devotional Strategy | Consequence/Reception.', '2) Revisit node c12_hist_cbse_06_004 (Alvar Saints) for Andal\'s context and c12_hist_cbse_06_003 (Nayanar Saints) for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_006', difficulty: 'standard',
          question: 'Saguna and Nirguna Bhakti represent two major theological streams within the.',
          hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
          misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both*.',
          parts: [
                { id: 'a', prompt: 'Name the vernacular language used by Tulsidas for the *Ramcharitmanas* and the language used by Guru Nanak for his hymns.', answer: 'Tulsidas composed the *Ramcharitmanas* in Avadhi (Eastern Hindi)',
                  options: ['Tulsidas composed the *Ramcharitmanas* in Avadhi (Eastern Hindi)', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim', '“saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim'],
                  hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' },
                { id: 'b', prompt: 'Explain why Kabir’s *ulatbansi* (upside-down sayings) like “the lotus blooms without a flower” are a deliberate poetic strategy, not mere nonsense.', answer: '*Ulatbansi* inverts everyday logic to convey the ineffable nature of the nirguna',
                  options: ['*Ulatbansi* inverts everyday logic to convey the ineffable nature of the nirguna', 'riddles', 'confusing metaphors', 'saguna = Hindu, nirguna = Muslim'],
                  hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' },
                { id: 'c', prompt: 'Compare the social composition of the early followings of Tulsidas and Kabir.', answer: 'Tulsidas, a Brahmin, gained patronage from Rajput and Mughal elites',
                  options: ['Tulsidas, a Brahmin, gained patronage from Rajput and Mughal elites', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim', '“saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim'],
                  hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' }
          ],
            remediations: { 'saguna-hindu': { steps: ['Re-read NCERT Theme 6, Sections 2 and 8.1–8.2, marking every verse quoted.', 'Make a 2×2 table: rows = Saguna/Nirguna, columns = Deity Concept / Ritual / Language / Caste Attitude / Political.', 'Listen to one *bhajan* each of Surdas and Kabir (YouTube: “Surdas bhajan” / “Kabir bhajan”) and note the address terms.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both*.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Guru Nanak’s nirguna bhakti was simply a synthesis of Hindu Vedanta and Islamic Sufism.” Use evidence from his *shabads* and.', answer: 'The synthesis claim oversimplifies',
                  options: ['The synthesis claim oversimplifies', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim', '“saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim'],
                  hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' },
                { id: 'b', prompt: 'Construct a 4-entry timeline (1500–1650) placing Tulsidas, Surdas, Kabir, and Guru Nanak in their political contexts (Mughal emperors, regional rulers).', answer: 'Example timeline: - 1469–1539: Guru Nanak',
                  options: ['Example timeline: - 1469–1539: Guru Nanak', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim', '“saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim'],
                  hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' }
          ],
            remediations: { 'saguna-hindu': { steps: ['Re-read NCERT Theme 6, Sections 2 and 8.1–8.2, marking every verse quoted.', 'Make a 2×2 table: rows = Saguna/Nirguna, columns = Deity Concept / Ritual / Language / Caste Attitude / Political.', 'Listen to one *bhajan* each of Surdas and Kabir (YouTube: “Surdas bhajan” / “Kabir bhajan”) and note the address terms.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
