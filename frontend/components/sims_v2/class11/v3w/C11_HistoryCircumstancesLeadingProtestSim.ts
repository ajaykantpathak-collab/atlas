import type { SimDef } from '../../engine/types';
import C11_HistoryCircumstancesLeadingProtestSim from '../../../simulations/c6_12/C11_HistoryCircumstancesLeadingProtestSim';

/** v3 wrapped master — C11_HistoryCircumstancesLeadingProtestSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historycircumstancesleadingprotestsim: SimDef = {
    id: 'v3w_c11_historycircumstancesleadingprotestsim',
    title: 'Circumstances Leading Protest',
    subtitle: 'Covers the historical circumstances of Quranic revelation (wahy), the transition from.',
    classLevel: 11, subject: 'history', topic: 'The Quran and the Hadith: Sacred Texts and Their Compilation',
    chapters: [],
    nodeIds: ['c11_hist_cbse_04_004', 'c11_hist_cbse_04_008', 'c11_hist_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are visiting the National Museum in New Delhi and see a 7th-century Quranic manuscript on.', goal: 'Master Circumstances Leading Protest.' },
    discovery: {
        question: 'A historian finds a 9th-century Hadith collection claiming: "The Prophet said: \'Seek knowledge even unto China.\'" The isnad includes three trustworthy.',
        options: ['The scholar would classify the Hadith as da\'if (weak)', 'accept it because most narrators are trustworthy', 'reject it because China didn\'t exist then'],
        answer: 'The scholar would classify the Hadith as da\'if (weak)',
        hook: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are.',
    },
    teaching: [
        { title: 'The Quran is the central religious text of.', text: 'The Quran is the central religious text of Islam, believed by Muslims to be the verbatim word of God (Allah) revealed to the Prophet Muhammad over 23 years (610–632 CE) in Mecca and Medina, compiled.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_04_004', title: 'The Quran is the central religious text.',
          scaffold: { problem: 'Explain why the Quran was compiled into a single codex within two years of the Prophet\'s death, while the canonical Hadith collections were.',
            steps: [
            { text: 'Identify the nature of each source — Quran is wahy (verbatim divine speech), Hadith are human reports of the Prophet\'s.' },
            { text: 'Analyze the preservation method during the Prophet\'s life — Quran: mass memorization (huffaz) + written fragments on.' },
            { text: 'Determine the triggering crisis for each — Quran: Battle of Yamama (633 CE) killed many memorizers, creating urgency.' },
            { text: 'Compare the authority behind compilation — Quran: state-sponsored (Caliphs Abu Bakr, Uthman) with community consensus;.' },
            { text: 'Evaluate the epistemic outcome — Quran achieved textual fixity (rasm) and closure (no new verses); Hadith remained open.', faded: true, blankAnswer: 'The Quran\'s early compilation was driven by the fear of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_04_008', title: 'The Shia-Sunni split is the primary.',
          scaffold: { problem: 'Explain how the dispute over Fadak (a property gifted by the Prophet to Fatima) became a theological marker distinguishing Shia and Sunni.',
            steps: [
            { text: 'Identify the historical incident — Fatima claimed Fadak as her inheritance; Abu Bakr rejected it citing a hadith:.' },
            { text: 'Analyze the *political implication* — accepting Fatima\'s claim would imply the Prophet\'s family has hereditary rights,.' },
            { text: 'Trace the *theological divergence* — Shias view Fadak as proof that the Prophet\'s household (Ahl al-Bayt) holds unique.' },
            { text: 'Connect to later doctrine — Shia Imams claimed *khums* (one-fifth tax) as their right (derived from Fadak logic); Sunni.' },
            { text: 'Evaluate significance — Fadak became a *synekdoche*: a small land dispute representing the macro-question: "Does.', faded: true, blankAnswer: 'Fadak was not just about land; it was the first test case.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_04_010', title: 'The Crusades (1095–1291) were a series.',
          scaffold: { problem: 'Explain the causes of the First Crusade using a multi-causal framework that distinguishes between long-term structural factors and.',
            steps: [
            { text: 'Identify the long-term structural factors: (a) 11th-century European population growth creating a surplus of landless.' },
            { text: 'Identify the medium-term geopolitical shifts: (a) Seljuk conquest of Anatolia after Manzikert (1071) threatening.' },
            { text: 'Identify the immediate trigger: Byzantine Emperor Alexios I\'s appeal to Pope Urban II (1095) for mercenaries, which.' },
            { text: 'Analyze the papal agenda: Urban sought to assert papal leadership over Latin Christendom, heal the Schism by aiding.' },
            { text: 'Synthesize: The Crusade emerged from the convergence of European internal pressures (demographic, social, religious).' },
            { text: 'Evaluate significance: This multi-causal model explains why the First Crusade succeeded (Muslim disunity) while later.', faded: true, blankAnswer: 'The First Crusade resulted from the interplay of European.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Circumstances Leading Protest', spots: [
            { id: 's1', label: 'The Quran is the central', prompt: 'Which idea is this? — The Quran is the central religious text of Islam, believed by Muslims to be the verbatim.', answer: 'The Quran is the central', options: ['The Quran is the central', 'The Shia-Sunni split is the', 'The Crusades 10951291 were a'] },
            { id: 's2', label: 'The Shia-Sunni split is the', prompt: 'Which idea is this? — The Shia-Sunni split is the primary sectarian division within Islam originating from a.', answer: 'The Shia-Sunni split is the', options: ['The Shia-Sunni split is the', 'The Quran is the central', 'The Crusades 10951291 were a'] },
            { id: 's3', label: 'The Crusades 10951291 were a', prompt: 'Which idea is this? — The Crusades (1095–1291) were a series of religiously sanctioned military campaigns.', answer: 'The Crusades 10951291 were a', options: ['The Crusades 10951291 were a', 'The Quran is the central', 'The Shia-Sunni split is the'] }
          ] } }
    ],
    explore: { component: C11_HistoryCircumstancesLeadingProtestSim, prompt: 'Explore the interactive — Circumstances Leading Protest' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_004', difficulty: 'standard',
          question: 'The Quran is the central religious text of Islam, believed by Muslims to be the.',
          hint: 'If stuck, revisit c11_hist_cbse_04_002 (Life of the Prophet) for the revelation timeline.',
          misconception: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are.',
          parts: [
                { id: 'a', prompt: 'A historian finds a 9th-century Hadith collection claiming: "The Prophet said: \'Seek knowledge even unto China.\'" The isnad includes three trustworthy.', answer: 'The scholar would classify the Hadith as da\'if (weak)',
                  options: ['The scholar would classify the Hadith as da\'if (weak)', 'accept it because most narrators are trustworthy', 'reject it because China didn\'t exist then'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are simply "part of the.' }
          ],
            remediations: { 'the-quran-was-written-as': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Use a primary source excerpt:.', 'upon Us is its collection [jam\'u] and its recitation [qur\'anu]") to see the Quran\'s own self-description as a recited,.', '(2) Show a diagram of an isnad chain (e.g., Bukhari → Malik → Nafi\' → Ibn Umar → Prophet) and explain how each link was.', '(3) Assign a comparative exercise: list three legal rulings (e.g., prayer times, zakat rate, hajj rituals) and identify.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Six Books (Kutub al-Sittah) of Hadith were officially canonized by the Abbasid caliphs in the 9th century, just as the Uthmanic.', answer: 'The statement is false',
                  options: ['The statement is false', 'part of the Quran'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Quran was written as a complete book during the Prophet\'s lifetime, or that the Hadith are simply "part of the.' }
          ],
            remediations: { 'the-quran-was-written-as': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Use a primary source excerpt:.', 'upon Us is its collection [jam\'u] and its recitation [qur\'anu]") to see the Quran\'s own self-description as a recited,.', '(2) Show a diagram of an isnad chain (e.g., Bukhari → Malik → Nafi\' → Ibn Umar → Prophet) and explain how each link was.', '(3) Assign a comparative exercise: list three legal rulings (e.g., prayer times, zakat rate, hajj rituals) and identify.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_008', difficulty: 'standard',
          question: 'The Shia-Sunni split is the primary sectarian division within Islam originating.',
          hint: 'If stuck, re-read c11_hist_cbse_04_005 focusing on *why* Ali\'s supporters refused to.',
          misconception: 'Students believe the Shia-Sunni split is *primarily about religious rituals* (prayer posture, temporary marriage,.',
          parts: [
                { id: 'a', prompt: 'A historian finds two 9th-century Hadith collections: one accepts narrations from Abu Hurairah (a companion close to Abu Bakr), the other rejects them as.', answer: 'The collection accepting Abu Hurairah is Sunni',
                  options: ['The collection accepting Abu Hurairah is Sunni', 'both accept all companions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Shia-Sunni split is *primarily about religious rituals* (prayer posture, temporary marriage, mourning practices).' }
          ],
            remediations: { 'the-shia-sunni-split-is': { steps: ['Revisit c11_hist_cbse_04_005 (The Caliphate: Rashidun and Question of Succession) — map the *exact sequence*: Saqifah →.', 'Use a two-column table: "Event" vs. "What each side concluded about authority."', 'Trace one theological doctrine (e.g., *Ismah* / infallibility) from its *political root* (Ali\'s legitimacy) to its.', 'Explain to a peer: "The split wasn\'t about *how* to pray, but *who has the right to define* how to pray."'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_010', difficulty: 'standard',
          question: 'The Crusades (1095–1291) were a series of religiously sanctioned military.',
          hint: 'If stuck, review the Battle of Manzikert (1071) and the Great Schism (1054) using the.',
          misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a.',
          parts: [
                { id: 'a', prompt: 'In which year and at which council did Pope Urban II deliver the sermon that launched the First Crusade?', answer: '1095, Council of Clermont',
                  options: ['1095, Council of Clermont', 'Christendom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam." In.' },
                { id: 'b', prompt: 'Compare the outcomes of the Third Crusade (1189–1192) and the Fourth Crusade (1202–1204) in terms of their impact on Muslim unity and Byzantine survival.', answer: 'Third Crusade: Failed to retake Jerusalem but secured coastal access',
                  options: ['Third Crusade: Failed to retake Jerusalem but secured coastal access', 'failures to take Jerusalem', 'Christendom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam." In.' }
          ],
            remediations: { 'the-crusades-were-a-single': { steps: ['Provide a political map of the Levant c. 1140 showing Crusader states, Zengid, Artuqid, Fatimid, and Byzantine.', 'Have students trace the shifting alliances of Raymond of Poitiers (Antioch) using primary source excerpts from William.', 'Assign a comparative table: "Crusader-Muslim Alliances vs. Internal Conflicts (1100–1187)" to visualize that.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a.',
          parts: [
                { id: 'a', prompt: 'Compare the outcomes of the Third Crusade (1189–1192) and the Fourth Crusade (1202–1204) in terms of their impact on Muslim unity and Byzantine survival.', answer: 'Third Crusade: Failed to retake Jerusalem but secured coastal access',
                  options: ['Third Crusade: Failed to retake Jerusalem but secured coastal access', 'failures to take Jerusalem', 'Christendom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Crusades were a single, continuous 200-year war between a monolithic "Christendom" and a united "Islam." In.' }
          ],
            remediations: { 'the-crusades-were-a-single': { steps: ['Provide a political map of the Levant c. 1140 showing Crusader states, Zengid, Artuqid, Fatimid, and Byzantine.', 'Have students trace the shifting alliances of Raymond of Poitiers (Antioch) using primary source excerpts from William.', 'Assign a comparative table: "Crusader-Muslim Alliances vs. Internal Conflicts (1100–1187)" to visualize that.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
