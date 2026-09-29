import type { SimDef } from '../../engine/types';
import C12_HistoryBhaktiSufiTraditionsSim from '../../../simulations/c6_12/C12_HistoryBhaktiSufiTraditionsSim';

/** v3 wrapped master — C12_HistoryBhaktiSufiTraditionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historybhaktisufitraditionssim: SimDef = {
    id: 'v3w_c12_historybhaktisufitraditionssim',
    title: 'The Nayanars and Alvars: Tamil Devotional Movements and Bhakti Origins',
    subtitle: 'Covers the origins, literary output (Tevaram, Nalayira Divyaprabandham), social.',
    classLevel: 12, subject: 'history', topic: 'The Nayanars and Alvars: Tamil Devotional Movements and Bhakti Origins',
    chapters: [],
    nodeIds: ['c12_hist_cbse_06_002', 'c12_hist_cbse_06_004', 'c12_hist_cbse_06_006', 'c12_hist_cbse_06_001', 'c12_hist_cbse_06_005', 'c12_hist_cbse_06_007', 'c12_hist_cbse_06_008', 'c12_hist_cbse_06_012', 'c12_hist_cbse_06_010', 'c12_hist_cbse_06_011', 'c12_hist_cbse_06_003', 'c12_hist_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you visit the Brihadisvara Temple at Thanjavur and see bronze images of three saints — Appar,.', goal: 'Master The Nayanars and Alvars: Tamil Devotional Movements and Bhakti Origins.' },
    discovery: {
        question: 'Who compiled the *Nalayira Divyaprabandham* and approximately when?',
        options: ['The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE', 'compiled by Ramanuja in the 12th century', 'written by the Alvars themselves as a single book'],
        answer: 'The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE',
        hook: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter.',
    },
    teaching: [
        { title: 'The Nayanars (63 poet-saints devoted to.', text: 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to Vishnu) were Tamil devotional movements (c.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_002', title: 'The Nayanars (63 poet-saints devoted to.',
          scaffold: { problem: 'A CBSE board question asks: "Explain how the compositions of the Alvars and Nayanars contributed to the integration of local cults within.',
            steps: [
            { text: 'Define "integration of cults" using NCERT Section 1.1 — the dialogue between "great" Sanskritic Puranic traditions and.' },
            { text: 'Identify the Alvars/Nayanars as *agents* of this integration — they traveled to local shrines (often tribal/goddess.' },
            { text: 'Cite specific evidence: Andal (Alvar) merged with Vishnu at Srirangam; Karaikkal Ammaiyar (Nayanar) worshipped Shiva as.' },
            { text: 'Explain the mechanism: Hymns in *Tamil* made Puranic narratives accessible to non-Sanskrit speakers, while the.' },
            { text: 'Note the political dimension: Chola temple-building at these sites (Thanjavur, Gangaikondacholapuram) cemented the.', faded: true, blankAnswer: 'The Alvars and Nayanars integrated local cults by (1).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_004', title: 'The Alvar saints (c. 6th–9th century.',
          scaffold: { problem: 'Explain how the poetry of Andal reflects both personal devotion and social challenge in the Alvar tradition.',
            steps: [
            { text: 'Identify Andal as the only woman Alvar (c. 8th–9th century), author of *Tiruppavai* (30 verses) and *Nachiyar Tirumoli*.' },
            { text: 'Analyze her self-presentation as a *gopi* (cowherd girl) longing for Krishna — the bridal mysticism (*nayaki-nayaka.' },
            { text: 'Note her life story: found as an infant, raised by Periyalvar, refused human marriage, demanded to marry Ranganatha.' },
            { text: 'Examine how her verses were incorporated into daily temple ritual (recited in *Margazhi* month) and the.' },
            { text: 'Conclude that her poetry simultaneously expresses intense personal bhakti and implicitly critiques gender/caste.', faded: true, blankAnswer: 'Andal’s poetry uses bridal mysticism to express devotion,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_006', title: 'Saguna and Nirguna Bhakti represent two.',
          scaffold: { problem: 'Using only the NCERT textbook passages provided (Sources 10, 11, and the Kabir/Nanak sections), construct a 5-step argument showing how.',
            steps: [
            { text: 'Locate every occurrence of “Ram” in the Kabir verses (Source 10) and Nanak’s description (Section 8.2).' },
            { text: 'Identify the theological frame: Kabir’s *Ram* is a *nirguna* symbol — “Gold may be shaped into rings and bangles.' },
            { text: 'Contrast with Tulsidas’s *Ram* (implicit in Section 8.3 timeline, explicit in *Ramcharitmanas*): Rama is the.' },
            { text: 'Map the ritual consequence: Kabir rejects *murti puja* because the formless cannot be imaged; Nanak rejects *murti.' },
            { text: 'Conclude: “Ram” functions as (a) a nirguna cipher for the ineffable (Kabir), (b) the shabda-embodiment of the formless.', faded: true, blankAnswer: 'Kabir’s “Ram” = nirguna pointer; Nanak’s “Nam/Ram” =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_001', title: 'Religious ferment in North India (c..',
          scaffold: { problem: 'Using the NCERT\'s description of \'integration of cults\', explain how a local Tantric goddess worshipped as a stone smeared with ochre in.',
            steps: [
            { text: 'Identify the \'little tradition\' — the local goddess is aniconic (stone + ochre), worshipped by lower castes/women,.' },
            { text: 'Identify the \'great tradition\' — Puranic texts composed in simple Sanskrit, accessible to women/Shudras, prescribing.' },
            { text: 'Trace the mechanism — Brahmanas or local elites compose/recite a Puranic myth (sthala purana) linking the local goddess.' },
            { text: 'Note the two-way process — the goddess retains her local form (wood/stone, ochre) but gains a Puranic identity;.' },
            { text: 'Conclude — this integration explains the \'mosaic\' of beliefs: the same site serves both the local community\'s Tantric.', faded: true, blankAnswer: 'The local Tantric goddess is integrated by providing her a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_005', title: 'This node examines three prominent.',
          scaffold: { problem: 'Using the NCERT text, explain how Andal\'s Tiruppavai transforms the classical Tamil *akam* (love poetry) tradition into a vehicle for.',
            steps: [
            { text: 'Identify the *akam* convention — classical Tamil love poetry uses a heroine\'s voice (often spoken through her friend).' },
            { text: 'Locate Andal\'s innovation — Tiruppavai adopts the *akam* voice but redirects the beloved from a human lover to Vishnu.' },
            { text: 'Connect to ritual — The 30 verses map to the 30 days of Margali month; each verse is sung daily in temples and homes.' },
            { text: 'Analyze significance — This gives women *liturgical agency*: they lead the recitation, embody the saint, and claim the.' },
            { text: 'Evaluate limitation — The ritual domesticates her transgression: she becomes the "bride of god," a role that ultimately.', faded: true, blankAnswer: 'Andal\'s Tiruppavai repurposes the *akam* genre\'s female.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_007', title: 'Kabir (c. 14th–15th century CE) was a.',
          scaffold: { problem: 'A Board exam question asks: "Analyze how Kabir\'s use of ulatbansi reflects the nirguna conception of the Divine.',
            steps: [
            { text: 'Define nirguna — the Ultimate Reality (Brahman/Allah) is nirakar (formless), alakh (unseen), beyond gunas (attributes).' },
            { text: 'Define ulatbansi — sayings that invert everyday subject-predicate logic (e.g., "lotus blooms without flower" inverts.' },
            { text: 'Connect the two — conventional language assumes stable categories (fire burns, water cools).' },
            { text: 'Select two examples — (a) "Lotus blooms without flower" (bijak): lotus symbolizes purity/spiritual unfolding; "without.' },
            { text: 'Conclude — ulatbansi is not decorative but *necessary* for nirguna expression: any positive statement ("God is light").', faded: true, blankAnswer: 'Kabir\'s nirguna theology holds that the Divine is nirakar.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hist_cbse_06_004', title: 'Identify each idea',
          dissect: { specimen: 'The Nayanars and Alvars: Tamil Devotional Movements and Bhakti Origins', spots: [
            { id: 's1', label: 'The Nayanars 63 poet-saints devoted', prompt: 'Which idea is this? — The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to.', answer: 'The Nayanars 63 poet-saints devoted', options: ['The Nayanars 63 poet-saints devoted', 'The Alvar saints c 6th9th', 'Saguna and Nirguna Bhakti represent', 'Religious ferment in North India'] },
            { id: 's2', label: 'The Alvar saints c 6th9th', prompt: 'Which idea is this? — The Alvar saints (c. 6th–9th century CE) were Tamil poet-saints immersed in devotion to.', answer: 'The Alvar saints c 6th9th', options: ['The Alvar saints c 6th9th', 'The Nayanars 63 poet-saints devoted', 'Saguna and Nirguna Bhakti represent', 'Religious ferment in North India'] },
            { id: 's3', label: 'Saguna and Nirguna Bhakti represent', prompt: 'Which idea is this? — Saguna and Nirguna Bhakti represent two major theological streams within the medieval.', answer: 'Saguna and Nirguna Bhakti represent', options: ['Saguna and Nirguna Bhakti represent', 'The Nayanars 63 poet-saints devoted', 'The Alvar saints c 6th9th', 'Religious ferment in North India'] },
            { id: 's4', label: 'Religious ferment in North India', prompt: 'Which idea is this? — Religious ferment in North India (c. 8th century) refers to the dynamic interplay between.', answer: 'Religious ferment in North India', options: ['Religious ferment in North India', 'The Nayanars 63 poet-saints devoted', 'The Alvar saints c 6th9th', 'Saguna and Nirguna Bhakti represent'] },
            { id: 's5', label: 'This node examines three prominent', prompt: 'Which idea is this? — This node examines three prominent women bhakti saints — Andal (9th century, Tamil.', answer: 'This node examines three prominent', options: ['This node examines three prominent', 'The Nayanars 63 poet-saints devoted', 'The Alvar saints c 6th9th', 'Saguna and Nirguna Bhakti represent'] },
            { id: 's6', label: 'Kabir c 14th15th century CE', prompt: 'Which idea is this? — Kabir (c. 14th–15th century CE) was a nirguna bhakti poet-saint from the Awadh region.', answer: 'Kabir c 14th15th century CE', options: ['Kabir c 14th15th century CE', 'The Nayanars 63 poet-saints devoted', 'The Alvar saints c 6th9th', 'Saguna and Nirguna Bhakti represent'] }
          ] } }
    ],
    explore: { component: C12_HistoryBhaktiSufiTraditionsSim, prompt: 'Explore the interactive — The Nayanars and Alvars: Tamil Devotional Movements and Bhakti Origins' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_002', difficulty: 'standard',
          question: 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints.',
          hint: 'If unclear on the Vedic-to-Puranic transition, revisit c9_hist_ch3_11 ("Religion: Yajnas,.',
          misconception: 'Students often believe the Nayanars and Alvars "rejected caste entirely" or "created a casteless society." In reality,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to',
                  options: ['The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to', 'The Alvar saints (c', 'Saguna and Nirguna Bhakti represent two major theological streams within the medieval', 'Religious ferment in North India (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Nayanars and Alvars "rejected caste entirely" or "created a casteless society." In reality, they *critiqued*.' }
          ],
            remediations: { 'the-nayanars-and-alvars-rejected': { steps: ['If the student conflates "critique of caste hierarchy" with "abolition of caste," have them: (1) Re-read Source 1.', '(2) Compare with Basavanna\'s Virashaivas (next node, c12_hist_cbse_06_003) who *explicitly* rejected cremation rites.', '(3) Complete a table: "Nayanar/Alvar attitude" vs.', '"Modern constitutional abolition" to sharpen the historical distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_004', difficulty: 'standard',
          question: 'The Alvar saints (c. 6th–9th century CE) were Tamil poet-saints immersed in.',
          hint: 'If stuck, revisit the bhakti movement overview in Class 6 (c6_history_ch06_016) and the.',
          misconception: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter.',
          parts: [
                { id: 'a', prompt: 'Who compiled the *Nalayira Divyaprabandham* and approximately when?', answer: 'The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE',
                  options: ['The *Nalayira Divyaprabandham* was compiled by Nathamuni in the 10th century CE', 'compiled by Ramanuja in the 12th century', 'written by the Alvars themselves as a single book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter (Tirupanalvar), and a.' },
                { id: 'b', prompt: 'Why is Andal considered unique among the twelve Alvars?', answer: 'Andal is the only woman among the twelve Alvars',
                  options: ['Andal is the only woman among the twelve Alvars', 'she was a queen', 'she wrote in Sanskrit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: (1) All Alvars were male Brahmins — in fact, they included a woman (Andal), a tribal hunter (Tirupanalvar), and a.' }
          ],
            remediations: { '1-all-alvars-were-male': { steps: ['Revisit **c12_hist_cbse_06_002** (Nayanars and Alvars overview) to reset the Tamil bhakti landscape.', '143–145 (Alvar section) and make a two-column table: *Alvar name / Caste background / Key work / Social message*.', 'Watch a 5-minute clip of *Tiruppavai* recitation in a temple (YouTube: "Tiruppavai Margazhi Srirangam") to hear the.', 'Re-attempt Diagnostic Questions 2 and 3, writing answers in your own words.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_006', difficulty: 'standard',
          question: 'Saguna and Nirguna Bhakti represent two major theological streams within the.',
          hint: 'If the saguna/nirguna distinction feels abstract, revisit the Alvars/Nayanars.',
          misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both*.',
          parts: [
                { id: 'a', prompt: 'Name the vernacular language used by Tulsidas for the *Ramcharitmanas* and the language used by Guru Nanak for his hymns.', answer: 'Tulsidas composed the *Ramcharitmanas* in Avadhi (Eastern Hindi)',
                  options: ['Tulsidas composed the *Ramcharitmanas* in Avadhi (Eastern Hindi)', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' },
                { id: 'b', prompt: 'Explain why Kabir’s *ulatbansi* (upside-down sayings) like “the lotus blooms without a flower” are a deliberate poetic strategy, not mere nonsense.', answer: '*Ulatbansi* inverts everyday logic to convey the ineffable nature of the nirguna',
                  options: ['*Ulatbansi* inverts everyday logic to convey the ineffable nature of the nirguna', 'riddles', 'confusing metaphors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' },
                { id: 'c', prompt: 'Compare the social composition of the early followings of Tulsidas and Kabir.', answer: 'Tulsidas, a Brahmin, gained patronage from Rajput and Mughal elites',
                  options: ['Tulsidas, a Brahmin, gained patronage from Rajput and Mughal elites', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' }
          ],
            remediations: { 'saguna-hindu': { steps: ['Re-read NCERT Theme 6, Sections 2 and 8.1–8.2, marking every verse quoted.', 'Make a 2×2 table: rows = Saguna/Nirguna, columns = Deity Concept / Ritual / Language / Caste Attitude / Political.', 'Listen to one *bhajan* each of Surdas and Kabir (YouTube: “Surdas bhajan” / “Kabir bhajan”) and note the address terms.', 'Re-attempt Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both*.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Guru Nanak’s nirguna bhakti was simply a synthesis of Hindu Vedanta and Islamic Sufism.” Use evidence from his *shabads* and.', answer: 'The synthesis claim oversimplifies',
                  options: ['The synthesis claim oversimplifies', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim', '“saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' },
                { id: 'b', prompt: 'Construct a 4-entry timeline (1500–1650) placing Tulsidas, Surdas, Kabir, and Guru Nanak in their political contexts (Mughal emperors, regional rulers).', answer: 'Example timeline: - 1469–1539: Guru Nanak',
                  options: ['Example timeline: - 1469–1539: Guru Nanak', 'saguna = Hindu, nirguna = Muslim', 'half-Hindu, half-Muslim', '“saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “saguna = Hindu, nirguna = Muslim” or that Kabir was “half-Hindu, half-Muslim.” In reality, *both* streams are Hindu.' }
          ],
            remediations: { 'saguna-hindu': { steps: ['Re-read NCERT Theme 6, Sections 2 and 8.1–8.2, marking every verse quoted.', 'Make a 2×2 table: rows = Saguna/Nirguna, columns = Deity Concept / Ritual / Language / Caste Attitude / Political.', 'Listen to one *bhajan* each of Surdas and Kabir (YouTube: “Surdas bhajan” / “Kabir bhajan”) and note the address terms.', 'Re-attempt Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_001', difficulty: 'standard',
          question: 'Religious ferment in North India (c. 8th century) refers to the dynamic.',
          hint: 'If stuck, revisit the Gupta period (c6_history_ch05_013) and the post-Gupta political.',
          misconception: 'Students often believe Buddhism and Jainism had completely disappeared from North India by the 8th century because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Religious ferment in North India (c',
                  options: ['Religious ferment in North India (c', 'The Nayanars (63 poet-saints devoted to Shiva) and Alvars (12 poet-saints devoted to', 'The Alvar saints (c', 'Saguna and Nirguna Bhakti represent two major theological streams within the medieval'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Buddhism and Jainism had completely disappeared from North India by the 8th century because they confuse the.' }
          ],
            remediations: { 'buddhism-and-jainism-had-completely': { steps: ['If the student holds this misconception, have them: (1) Re-read NCERT page 142 (Tantric practices influencing Buddhism.', '(2) Map the major Buddhist sites (Nalanda, Bodh Gaya) and Jain centres (Rajasthan, Gujarat) that remained active.', '(3) Re-attempt Diagnostic Question 4 with focus on *evidence of presence* vs *dominance*.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_005', difficulty: 'standard',
          question: 'This node examines three prominent women bhakti saints — Andal (9th century,.',
          hint: 'If stuck on Alvar/Nayanar distinction: Revisit node c12_hist_cbse_06_002 (The Nayanars.',
          misconception: 'Students often assume these three women represent a unified "women\'s bhakti movement" with shared goals.',
          parts: [
                { id: 'a', prompt: 'Name the specific Alvar saint who is the only woman among the twelve Alvars, and identify the two major Tamil compositions attributed to her that are still.', answer: 'Andal is the only woman among the twelve Alvars',
                  options: ['Andal is the only woman among the twelve Alvars', 'women\'s bhakti movement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume these three women represent a unified "women\'s bhakti movement" with shared goals.' },
                { id: 'b', prompt: 'Karaikkal Ammaiyar describes herself in a poem as a "female Pey (demoness) with bulging veins, protruding eyes, white teeth and shrunken stomach." Explain WHY.', answer: 'Karaikkal Ammaiyar deliberately fashions herself as a demoness (pey) to reject',
                  options: ['Karaikkal Ammaiyar deliberately fashions herself as a demoness (pey) to reject', 'women\'s bhakti movement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume these three women represent a unified "women\'s bhakti movement" with shared goals.' }
          ],
            remediations: { 'these-three-women-represent-a': { steps: ['If the student conflates the three saints or misses the caste-gender intersection: 1) Re-read NCERT pp.', '143-145 (Andal, Karaikkal Ammaiyar) and pp.', '163-165 (Mirabai) with a three-column table: Social Background | Devotional Strategy | Consequence/Reception.', '2) Revisit node c12_hist_cbse_06_004 (Alvar Saints) for Andal\'s context and c12_hist_cbse_06_003 (Nayanar Saints) for.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_007', difficulty: 'standard',
          question: 'Kabir (c. 14th–15th century CE) was a nirguna bhakti poet-saint from the Awadh.',
          hint: 'Revisit the "Two broad categories: saguna and nirguna" section in NCERT Chapter 6 (p.',
          misconception: 'Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who used Hindu terms" —.',
          parts: [
                { id: 'a', prompt: 'Compare the theological vocabulary Kabir draws from Islamic, Vedantic, and yogic traditions.', answer: 'Kabir uses Allah, Khuda, Hazrat, Pir (Islamic)',
                  options: ['Kabir uses Allah, Khuda, Hazrat, Pir (Islamic)', 'Hindu reformer who criticized Islam', 'Muslim saint who used Hindu terms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who used Hindu terms" — i.e., they assign him a.' }
          ],
            remediations: { 'kabir-was-a-hindu-reformer': { steps: ['If the student cannot articulate why Kabir\'s syncretism is not "borrowing" but a third position: (1) Re-read Source 10.', '(2) Revisit node c12_hist_cbse_06_006 (Saguna vs Nirguna) to recall that nirguna bhakti *by definition* rejects.', '(3) Compare with Baba Guru Nanak (next node) who similarly refuses Hindu/Muslim labels.', '(4) Re-attempt Diagnostic Question 4 with this framework.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who used Hindu terms" —.',
          parts: [
                { id: 'a', prompt: 'Compare the theological vocabulary Kabir draws from Islamic, Vedantic, and yogic traditions.', answer: 'Kabir uses Allah, Khuda, Hazrat, Pir (Islamic)',
                  options: ['Kabir uses Allah, Khuda, Hazrat, Pir (Islamic)', 'Hindu reformer who criticized Islam', 'Muslim saint who used Hindu terms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Kabir was a "Hindu reformer who criticized Islam" or a "Muslim saint who used Hindu terms" — i.e., they assign him a.' }
          ],
            remediations: { 'kabir-was-a-hindu-reformer': { steps: ['If the student cannot articulate why Kabir\'s syncretism is not "borrowing" but a third position: (1) Re-read Source 10.', '(2) Revisit node c12_hist_cbse_06_006 (Saguna vs Nirguna) to recall that nirguna bhakti *by definition* rejects.', '(3) Compare with Baba Guru Nanak (next node) who similarly refuses Hindu/Muslim labels.', '(4) Re-attempt Diagnostic Question 4 with this framework.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
