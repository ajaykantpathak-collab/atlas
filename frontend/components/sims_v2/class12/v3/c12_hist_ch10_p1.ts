import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch10_p1: SimDef = {
    id: 'v3_c12_hist_ch10_p1',
    title: 'Rebels and the Raj (1857 Revolt) · Part 1/2',
    subtitle: 'The cartridge was the proof; the grievance was older',
    classLevel: 12, subject: 'history', topic: 'Rebels and the Raj (1857 Revolt) · Part 1/2',
    chapters: ['c12_hist_ch10'],
    nodeIds: ['c12_hist_cbse_10_001', 'c12_hist_cbse_10_002', 'c12_hist_cbse_10_003', 'c12_hist_cbse_10_004', 'c12_hist_cbse_10_005', 'c12_hist_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Rebellion historian', intro: '85 sepoys shackled at dawn; by nightfall the army was marching on Delhi. The fuse had been laid for years.', goal: 'Analyse the 1857 outbreak — rumour\'s power, the cantonment pattern, and leadership thrust onto reluctant thrones.' },
    discovery: {
        question: 'A rumour about greased cartridges survived every British denial and detonated an empire\'s army. Why did one cartridge carry so much?',
        options: ['It confirmed a decade of lived suspicion — annexations, missionary schools, \'reform\' had already convinced people their world was under attack; the cartridge was the tangible proof', 'Sepoys were superstitious', 'Officers were rude', 'It was a foreign plot'],
        answer: 'It confirmed a decade of lived suspicion — annexations, missionary schools, \'reform\' had already convinced people their world was under attack; the cartridge was the tangible proof',
        hook: '1857 ran on networks — regimental lines, chapati chains, fakirs\' prophecies — and the pattern repeated: seize the bell of arms, cut the telegraph, march to the nearest throne. Leaders didn\'t plan it; sepoys thrust legitimacy onto Bahadur Shah, Nana Sahib and the Rani.',
    },
    teaching: [
        { title: 'The Mutiny at Meerut: Mangal Pandey, the Greased Cartridges and the Spark', text: 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army sepoys in Meerut cantonment triggered by the refusal to use Enfield rifle cartridges rumoured to be greased with cow and pig.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the uprising\'s machinery: trace the rumour through three networks, map the cantonment-by-cantonment pattern, and weigh whether the proclamations promised revolution or restoration.',
        labels: ['The Mutiny at Meerut', 'The Spread of', 'Bahadur Shah Zafar', 'Rani Lakshmibai of Jhansi,', 'The Awadh Revolt: Taluqdars,', 'The Annexation of Awadh'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_001', title: 'The Mutiny at Meerut: Mangal Pandey, the Greased Cartridges and the Spark',
          caseStudy: { intro: 'Imagine you are a sepoy in the 3rd Light Cavalry at Meerut on 9 May 1857, watching 85 comrades sentenced to 10 years\' hard labour for refusing the new.',
            decisions: [{ prompt: 'On what date did the sepoys at Meerut break into open mutiny, and what was the immediate trigger that afternoon?', options: [
                { text: 'The mutiny began on 10 May 1857', outcome: 'The mutiny began on 10 May 1857. The immediate trigger was the harsh sentencing of 85 sowars of the.' },
                { text: '31 March 1857 — Mangal Pandey\'s execution', outcome: 'Not quite — Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut.', reveals: 'mangal-pandey-s-action-at' },
                { text: 'the cartridge issue alone', outcome: 'Not quite — Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut.', reveals: 'mangal-pandey-s-action-at' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_002', title: 'The Spread of the Revolt: Delhi, Kanpur, Lucknow and the North Indian Plains',
          caseStudy: { intro: 'Imagine standing at the Red Fort in Delhi on 11 May 1857: a dusty column of sepoys from Meerut arrives at the gates, demanding the Mughal emperor’s blessing.',
            decisions: [{ prompt: 'On what date did the Meerut sepoys reach the Red Fort in Delhi, and what immediate action did they demand from Bahadur Shah Zafar?', options: [
                { text: 'The Meerut sepoys reached the Red Fort on the morning of 11 May 1857', outcome: 'The Meerut sepoys reached the Red Fort on the morning of 11 May 1857.' },
                { text: '10 May', outcome: 'Not quite — Students often believe the revolt spread *only* because sepoys imitated each other spontaneously.', reveals: 'the-revolt-spread-only-because' },
                { text: 'they demanded money', outcome: 'Not quite — Students often believe the revolt spread *only* because sepoys imitated each other spontaneously.', reveals: 'the-revolt-spread-only-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_004', title: 'Rani Lakshmibai of Jhansi, Nana Saheb and Tantia Tope: Regional Leaders',
          caseStudy: { intro: 'Imagine you are standing at the Jhansi Fort looking at the cannon "Kadak Bijli" — a tourist guide tells you the Rani "planned the revolt." But the NCERT text.',
            decisions: [{ prompt: 'In which year was the state of Jhansi annexed by the British under the Doctrine of Lapse, and who was the ruler at that time?', options: [
                { text: 'Jhansi was annexed in 1854 after the death of Raja Gangadhar Rao', outcome: 'Jhansi was annexed in 1854 after the death of Raja Gangadhar Rao; his widow Rani Lakshmibai\'s.' },
                { text: 'Nana Saheb', outcome: 'Not quite — Students believe Rani Lakshmibai, Nana Saheb, and Tantia Tope *planned* the 1857 Revolt together.', reveals: 'rani-lakshmibai' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_006', title: 'The Annexation of Awadh (1856): Subsidiary Alliance and the Grievances of Taluqdars',
          caseStudy: { intro: 'Imagine you are visiting the ruins of the Residency in Lucknow and see the bullet marks from 1857.',
            decisions: [{ prompt: 'What was the immediate pretext Lord Dalhousie used to annex Awadh in 1856?', options: [
                { text: 'Lord Dalhousie annexed Awadh in 1856 on the pretext of "misgovernment" by Nawab Wajid Ali', outcome: 'Lord Dalhousie annexed Awadh in 1856 on the pretext of "misgovernment" by Nawab Wajid Ali Shah.' },
                { text: 'Doctrine of Lapse', outcome: 'Not quite — Students often think the annexation of Awadh was done under the Doctrine of Lapse (like Satara.', reveals: 'the-annexation-of-awadh-was' },
                { text: 'failure to pay subsidy', outcome: 'Not quite — Students often think the annexation of Awadh was done under the Doctrine of Lapse (like Satara.', reveals: 'the-annexation-of-awadh-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After identical flash protests erupt at a dozen colleges in one week — same signal, same slogans, same sequence — a dean insists \'it was clearly all spontaneous imitation, so there\'s no organiser to talk to.\'',
            decisions: [{ prompt: 'What does the 1857 spread tell you about \'spontaneous\' identical patterns?', options: [
                { text: 'The pattern is the coordination — cantonments repeated signal → arms → treasury → proclamations because regiments wrote to each other, emissaries moved, and nightly panchayats decided; identical steps across distance are a network\'s fingerprint, not proof of no one talking.', outcome: 'The chapter\'s evidence: sepoy letters and panchayats are documented — \'spontaneous\' is how coordination looks from outside when the channels are informal.' },
                { text: 'Agree — if there\'s no single mastermind, it was spontaneous.', outcome: '1857 had no mastermind either — Bahadur Shah and Nana Sahib were pushed into leadership by the sepoys; distributed coordination through networks still leaves a structure to read.', reveals: 'no-leader-equals-no-plan' },
                { text: 'Conclude the opposite — an identical pattern must mean a single central command.', outcome: 'That over-corrects: the revolt\'s channels were lateral — regiment to regiment, panchayat to panchayat — coordination without a commander; \'one pattern\' doesn\'t require \'one hand.\'', reveals: 'pattern-equals-command' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read 1857 as structure, not spark — grievance, network and symbol converging into rebellion.',
            decisions: [{ prompt: 'What comes next? Rebels and the Raj (1857 Revolt) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Rebels and the Raj (1857 Revolt) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_001', difficulty: 'standard',
          question: 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army.',
          hint: 'Revisit the Subsidiary Alliance in Awadh (c12_hist_cbse_10_006) and the Class 8 summary.',
          misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.',
          parts: [
                { id: 'a', prompt: 'On what date did the sepoys at Meerut break into open mutiny, and what was the immediate trigger that afternoon?', answer: 'The mutiny began on 10 May 1857',
                  options: ['The mutiny began on 10 May 1857', '31 March 1857 — Mangal Pandey\'s execution', 'the cartridge issue alone'],
                  hint: 'Revisit the Subsidiary Alliance in Awadh (c12_hist_cbse_10_006) and the Class 8 summary of 1857.',
                  misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.' },
                { id: 'b', prompt: 'Why did the rumour about greased cartridges spread so rapidly and resist all British reassurances, despite the British issuing official denials?', answer: 'The rumour resonated',
                  options: ['The rumour resonated', 'sepoys were superstitious', 'British officers were insensitive'],
                  hint: 'Revisit the Subsidiary Alliance in Awadh (c12_hist_cbse_10_006) and the Class 8 summary of 1857.',
                  misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.' }
          ],
            remediations: { 'mangal-pandey-s-action-at': { steps: ['If the student conflates Mangal Pandey and Meerut: (1) Re-read NCERT pp.', '264–265 on the Dum Dum khalasi incident and the Barrackpore/Meerut distinction.', '(2) Create a two-column table: "Barrackpore (March 1857)" vs "Meerut (May 1857)" — columns: regiment, trigger, scale.', '(3) Watch the 5-minute clip "1857: The Sepoy Mutiny Begins" (NCERT official) and note the narrator\'s phrasing: "the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.',
          parts: [
                { id: 'a', prompt: 'The Azamgarh Proclamation (25 August 1857) promises "light Jumas," "dignity of zemindars," and "trade opened to native merchants." Evaluate whether this.', answer: 'It is primarily a conservative restoration: it appeals to Mughal-era hierarchies',
                  options: ['It is primarily a conservative restoration: it appeals to Mughal-era hierarchies', 'revolutionary', 'purely feudal'],
                  hint: 'Revisit the Subsidiary Alliance in Awadh (c12_hist_cbse_10_006) and the Class 8 summary of 1857.',
                  misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.' }
          ],
            remediations: { 'mangal-pandey-s-action-at': { steps: ['If the student conflates Mangal Pandey and Meerut: (1) Re-read NCERT pp.', '264–265 on the Dum Dum khalasi incident and the Barrackpore/Meerut distinction.', '(2) Create a two-column table: "Barrackpore (March 1857)" vs "Meerut (May 1857)" — columns: regiment, trigger, scale.', '(3) Watch the 5-minute clip "1857: The Sepoy Mutiny Begins" (NCERT official) and note the narrator\'s phrasing: "the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_002', difficulty: 'standard',
          question: 'The Spread of the Revolt refers to the rapid cascade of mutinies and civilian.',
          hint: 'If stuck, re-read the “Pattern of the Uprising” section (NCERT pp.',
          misconception: 'Students often believe the revolt spread *only* because sepoys imitated each other spontaneously, ignoring the.',
          parts: [
                { id: 'a', prompt: 'On what date did the Meerut sepoys reach the Red Fort in Delhi, and what immediate action did they demand from Bahadur Shah Zafar?', answer: 'The Meerut sepoys reached the Red Fort on the morning of 11 May 1857',
                  options: ['The Meerut sepoys reached the Red Fort on the morning of 11 May 1857', '10 May', 'they demanded money'],
                  hint: 'If stuck, re-read the “Pattern of the Uprising” section (NCERT pp.',
                  misconception: 'Students often believe the revolt spread *only* because sepoys imitated each other spontaneously, ignoring the documentary evidence.' }
          ],
            remediations: { 'the-revolt-spread-only-because': { steps: ['Re-read the “Lines of communication” subsection (NCERT pp.', '260–261) and list every piece of evidence for planning (letters, emissaries, panchayats).', 'Revisit c12_hist_cbse_10_001 to confirm the Meerut trigger and the sepoys’ march to Delhi.', '267) to trace the geographical spread and annotate each centre with its date and leader.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_003', difficulty: 'standard',
          question: 'Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic.',
          hint: 'Revisit the 1803 Treaty of Surji-Anjangaon (Class 8, c8_hist_ch1_9) and the 1856.',
          misconception: 'Students often think Bahadur Shah Zafar *initiated* or *planned* the revolt, picturing him as an active conspirator.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic and nominal',
                  options: ['Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic and nominal', 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army sepoys in', 'The Spread of the Revolt refers to the rapid cascade of mutinies and civilian uprisings', 'This topic examines the emergence and roles of three prominent regional leaders—Rani'],
                  hint: 'Revisit the 1803 Treaty of Surji-Anjangaon (Class 8, c8_hist_ch1_9) and the 1856 annexation.',
                  misconception: 'Students often think Bahadur Shah Zafar *initiated* or *planned* the revolt, picturing him as an active conspirator.' }
          ],
            remediations: { 'bahadur-shah-zafar-initiated-or': { steps: ['If the student holds this misconception, have them re-read the NCERT paragraph on page 262 ("Leaders and followers").', 'Then ask: "Who approached whom?', 'Who set the terms?" Next, compare with Nana Saheb at Kanpur and Rani Lakshmibai at Jhansi (c12_hist_cbse_10_004) — all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_004', difficulty: 'standard',
          question: 'This topic examines the emergence and roles of three prominent regional.',
          hint: 'If stuck, revisit the "Spread of the Revolt" node (c12_hist_cbse_10_002) and map the.',
          misconception: 'Students believe Rani Lakshmibai, Nana Saheb, and Tantia Tope *planned* the 1857 Revolt together in advance.',
          parts: [
                { id: 'a', prompt: 'In which year was the state of Jhansi annexed by the British under the Doctrine of Lapse, and who was the ruler at that time?', answer: 'Jhansi was annexed in 1854 after the death of Raja Gangadhar Rao',
                  options: ['Jhansi was annexed in 1854 after the death of Raja Gangadhar Rao', 'Nana Saheb'],
                  hint: 'If stuck, revisit the "Spread of the Revolt" node (c12_hist_cbse_10_002) and map the dates: Meerut.',
                  misconception: 'Students believe Rani Lakshmibai, Nana Saheb, and Tantia Tope *planned* the 1857 Revolt together in advance.' }
          ],
            remediations: { 'rani-lakshmibai': { steps: ['262–263 ("Leaders and followers") and highlight every phrase showing reluctance ("no choice," "forced by popular.', 'Make a three-column table: Leader | Pre-revolt status | Event that forced leadership | Source of legitimacy.', 'Watch the 5-min clip from Shyam Benegal\'s *Bharat Ek Khoj* (Episode 38) showing Nana Saheb\'s hesitation.', 'Re-attempt Diagnostic Question 2 — if still wrong, revisit c12_hist_cbse_10_002 (Spread of Revolt) to see how.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_005', difficulty: 'standard',
          question: 'The Awadh Revolt (1857-1858) refers to the widespread popular uprising in the.',
          hint: 'Revisit c12_hist_cbse_10_006 (Annexation of Awadh) for the Subsidiary Alliance mechanics.',
          misconception: 'Students often think the Awadh Revolt was *only* about the taluqdars trying to regain their lost estates, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Why did the removal of the Nawab in 1856 lead to the dissolution of the court culture and loss of livelihood for musicians, poets, artisans, and retainers?', answer: 'The Nawab\'s court was the central patron of Awadh\'s cultural economy',
                  options: ['The Nawab\'s court was the central patron of Awadh\'s cultural economy', 'the British banned cultural activities'],
                  hint: 'Revisit c12_hist_cbse_10_006 (Annexation of Awadh) for the Subsidiary Alliance mechanics and the.',
                  misconception: 'Students often think the Awadh Revolt was *only* about the taluqdars trying to regain their lost estates, ignoring the peasant dimension.' }
          ],
            remediations: { 'the-awadh-revolt-was-only': { steps: ['266-269 (Section 2.2-2.3) focusing on the phrases "ties of loyalty and patronage," "generous father figures," and.', 'Compare Source 3 (Hanwant Singh) and Source 6 (sepoy arzi) — note both mention "faith/religion" AND "land/revenue." 3.', 'Re-do Diagnostic Question 3 with a two-column table: Taluqdar Grievances vs.', 'Peasant Grievances → Shared Grievances.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_006', difficulty: 'standard',
          question: 'The Annexation of Awadh (1856) refers to the British East India Company\'s.',
          hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule) and c8_hist_ch3_7 (Treaty.',
          misconception: 'Students often think the annexation of Awadh was done under the Doctrine of Lapse (like Satara or Jhansi) because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Annexation of Awadh (1856) refers to the British East India Company\'s takeover of the',
                  options: ['The Annexation of Awadh (1856) refers to the British East India Company\'s takeover of the', 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army sepoys in', 'The Spread of the Revolt refers to the rapid cascade of mutinies and civilian uprisings', 'Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic and nominal'],
                  hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule) and c8_hist_ch3_7 (Treaty.',
                  misconception: 'Students often think the annexation of Awadh was done under the Doctrine of Lapse (like Satara or Jhansi) because Dalhousie used that.' }
          ],
            remediations: { 'the-annexation-of-awadh-was': { steps: ['If the student confuses Doctrine of Lapse with misgovernment annexation: (1) Re-read NCERT pp.', '266-267, highlighting Dalhousie\'s "cherry" quote and the explicit phrase "on the plea that the region was being.', '"Misgovernment annexation (Awadh)." (3) Re-attempt Diagnostic Question 1 and 4, focusing on the legal pretext.', '(4) If still stuck, revisit c8_hist_ch3_8 (British revenue policies) and c6_history_ch10_041 (Subsidiary Alliance).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
