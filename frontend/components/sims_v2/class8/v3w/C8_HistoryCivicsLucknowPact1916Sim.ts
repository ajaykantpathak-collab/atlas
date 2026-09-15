import type { SimDef } from '../../engine/types';
import C8_HistoryCivicsLucknowPact1916Sim from '../../../simulations/c6_12/C8_HistoryCivicsLucknowPact1916Sim';

/** v3 wrapped master — C8_HistoryCivicsLucknowPact1916Sim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_historycivicslucknowpact1916sim: SimDef = {
    id: 'v3w_c8_historycivicslucknowpact1916sim',
    title: 'Lucknow Pact1916',
    subtitle: 'Covers the ideological differences, key leaders, methods, and the 1907 Surat Split.',
    classLevel: 8, subject: 'history', topic: 'Moderates vs Extremists in the Congress',
    chapters: [],
    nodeIds: ['c8_hist_ch4_4', 'c8_hist_ch4_2', 'c8_hist_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you and your friends want to change a school rule — some want to write a polite letter to the.', goal: 'Master Lucknow Pact1916.' },
    discovery: {
        question: 'Was the Gandhi-Irwin Pact (March 1931) a victory for the Civil Disobedience Movement? Defend your position with *two* specific pieces of evidence.',
        options: ['It was a *partial* victory', 'total victory', 'total betrayal'],
        answer: 'It was a *partial* victory',
        hook: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the.',
    },
    teaching: [
        { title: 'The Moderates vs Extremists debate.', text: 'The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the Indian National Congress between Early Nationalists (Moderates) who sought constitutional reforms through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_hist_ch4_4', title: 'The Moderates vs Extremists debate.',
          scaffold: { problem: 'Explain why the Moderates\' method of \'prayer and petition\' failed to achieve significant concessions by 1905, using the Indian Councils.',
            steps: [
            { text: 'Identify the Moderate strategy — they believed British rulers would grant reforms if Indians proved their \'fitness\'.' },
            { text: 'Analyze the 1892 Indian Councils Act — it increased non-official members but kept them nominated, not elected; no.' },
            { text: 'Analyze the 1909 Morley-Minto Reforms (after Moderate decline) — introduced separate electorates for Muslims, dividing.' },
            { text: 'Connect British intent — both Acts aimed to co-opt elites without sharing real power; Moderates\' loyalty yielded only.' },
            { text: 'Conclude — by 1905, younger nationalists saw 20 years of petitions producing only \'crumbs\', making Extremist mass.', faded: true, blankAnswer: 'The Moderates failed because British concessions (1892,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch4_2', title: 'The Revolt of 1857 was a major,.',
          scaffold: { problem: 'Explain the causes of the 1857 Revolt by categorizing them into political, economic, social, religious, and military factors, using.',
            steps: [
            { text: 'Identify the time period (1857-58) and the main actors (Company vs. Indians).' },
            { text: 'List political causes: Doctrine of Lapse (annexation of Satara, Jhansi, Nagpur), annexation of Awadh (1856) on grounds.' },
            { text: 'List economic causes: Heavy land revenue (Permanent Settlement, Ryotwari), destruction of handicrafts by British goods,.' },
            { text: 'List social and religious causes: Social reforms (widow remarriage, abolition of sati) seen as interference; missionary.' },
            { text: 'List military causes: Low pay and status of sepoys; General Service Enlistment Act (1856) requiring overseas service;.' },
            { text: 'Synthesize: Show how these factors affected different groups (rulers, peasants, sepoys, zamindars) creating a.', faded: true, blankAnswer: 'The 1857 Revolt was caused by a combination of political.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch4_9', title: 'The Civil Disobedience Movement.',
          scaffold: { problem: 'Explain how the Salt March functioned as a "media event" that internationalised the Indian freedom struggle.',
            steps: [
            { text: 'Identify the pre-march publicity — Gandhi\'s advance notice to Irwin, the global press invited to Sabarmati.' },
            { text: 'Analyse the march\'s visual symbolism — 78 satyagrahis, white khadi, walking stick, 24 days, villages en route —.' },
            { text: 'Trace the media coverage — The New York Times, The Times (London), newsreel footage shown in cinemas worldwide; Webb.' },
            { text: 'Evaluate the impact — British legitimacy damaged in American and British public opinion; Indian diaspora mobilised; the.' },
            { text: 'Conclude — The march was choreographed *for* the camera, making colonial repression visible to a global audience for.', faded: true, blankAnswer: 'The Salt March was a calculated media spectacle: Gandhi.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_hist_ch4_2', title: 'Identify each idea',
          dissect: { specimen: 'Lucknow Pact1916', spots: [
            { id: 's1', label: 'The Moderates vs Extremists debate', prompt: 'Which idea is this? — The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the.', answer: 'The Moderates vs Extremists debate', options: ['The Moderates vs Extremists debate', 'The Revolt of 1857 was', 'The Civil Disobedience Movement 193034'] },
            { id: 's2', label: 'The Revolt of 1857 was', prompt: 'Which idea is this? — The Revolt of 1857 was a major, widespread uprising against British East India Company.', answer: 'The Revolt of 1857 was', options: ['The Revolt of 1857 was', 'The Moderates vs Extremists debate', 'The Civil Disobedience Movement 193034'] },
            { id: 's3', label: 'The Civil Disobedience Movement 193034', prompt: 'Which idea is this? — The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of non-violent.', answer: 'The Civil Disobedience Movement 193034', options: ['The Civil Disobedience Movement 193034', 'The Moderates vs Extremists debate', 'The Revolt of 1857 was'] }
          ] } }
    ],
    explore: { component: C8_HistoryCivicsLucknowPact1916Sim, prompt: 'Explore the interactive — Lucknow Pact1916' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch4_4', difficulty: 'standard',
          question: 'The Moderates vs Extremists debate (1885–1907) refers to the ideological split.',
          hint: 'Revisit c8_hist_ch4_3 (Birth of the Indian National Congress) and the \'Methods of.',
          misconception: 'Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the',
                  options: ['The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the', 'The Revolt of 1857 was a major, widespread uprising against British East India Company', 'The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of non-violent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.' }
          ],
            remediations: { 'the-moderates-were-pro-british': { steps: ['Show a 1906 Congress resolution (Calcutta) where Moderates *accepted* Swaraj as goal — prove they weren\'t.', 'Read Tilak\'s 1907 speech at Surat — he demands *control* over Congress machinery, not revolution.', 'Use a Venn diagram: center = \'Swaraj\', left = \'petitions/councils\', right = \'boycott/mass mobilization\'.', 'Ask: "If both wanted Swaraj, why did they split?" — force the student to articulate the tactical disagreement.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.',
          parts: [
                { id: 'a', prompt: 'Was the Surat Split (1907) inevitable? Judge using the Congress presidentships of 1905 (Gokhale), 1906 (Dadabhai Naoroji), and 1907 (Rash Behari Ghosh vs.', answer: 'Not inevitable but highly probable',
                  options: ['Not inevitable but highly probable', 'Tilak was arrogant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.' }
          ],
            remediations: { 'the-moderates-were-pro-british': { steps: ['Show a 1906 Congress resolution (Calcutta) where Moderates *accepted* Swaraj as goal — prove they weren\'t.', 'Read Tilak\'s 1907 speech at Surat — he demands *control* over Congress machinery, not revolution.', 'Use a Venn diagram: center = \'Swaraj\', left = \'petitions/councils\', right = \'boycott/mass mobilization\'.', 'Ask: "If both wanted Swaraj, why did they split?" — force the student to articulate the tactical disagreement.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_2', difficulty: 'standard',
          question: 'The Revolt of 1857 was a major, widespread uprising against British East India.',
          hint: 'Review c6_history_ch10_041 (Expansion of British Rule in India) focusing on Doctrine of.',
          misconception: 'Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased cartridges, ignoring the.',
          parts: [
                { id: 'a', prompt: 'In which month and year did the 1857 Revolt begin at Meerut, and what was the immediate trigger for the sepoys\' refusal to use the new cartridges?', answer: 'The revolt began in May 1857 at Meerut',
                  options: ['The revolt began in May 1857 at Meerut', 'sepoy mutiny'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased cartridges, ignoring the deep-seated.' }
          ],
            remediations: { 'the-1857-revolt-was-solely': { steps: ['If the student holds this misconception, have them create a five-column cause chart (Political, Economic, Social,.', 'Then, map the revolt\'s spread and mark the social composition at each center (e.g., Awadh: taluqdars + peasants;.', 'Finally, compare the 1857 leaders\' proclamations (which appeal to all Indians) with earlier revolt documents to see the.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased cartridges, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "The 1857 Revolt failed because it lacked a unified leadership and a modern nationalist ideology." Provide evidence for and against this.', answer: 'Evidence for: No central command',
                  options: ['Evidence for: No central command', 'sepoy mutiny'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased cartridges, ignoring the deep-seated.' }
          ],
            remediations: { 'the-1857-revolt-was-solely': { steps: ['If the student holds this misconception, have them create a five-column cause chart (Political, Economic, Social,.', 'Then, map the revolt\'s spread and mark the social composition at each center (e.g., Awadh: taluqdars + peasants;.', 'Finally, compare the 1857 leaders\' proclamations (which appeal to all Indians) with earlier revolt documents to see the.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_9', difficulty: 'standard',
          question: 'The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of.',
          hint: 'Revisit the Chauri Chaura incident (c8_hist_ch4_8) and Gandhi\'s subsequent fast and.',
          misconception: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of non-violent',
                  options: ['The Civil Disobedience Movement (1930–34) was a nationwide mass campaign of non-violent', 'The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the', 'The Revolt of 1857 was a major, widespread uprising against British East India Company'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the Gandhi-Irwin Pact.' }
          ],
            remediations: { 'the-salt-march-was-the': { steps: ['On a map of India, mark Dandi, Dharasana, Vedaranyam (Rajaji\'s march), Peshawar, and Manipur — see the geographic.', 'Read Gandhi\'s 11 demands in the 2 March 1930 letter; tick which were met in the Gandhi-Irwin Pact.', 'Compare a 1930 British ordinance (e.g., Press Ordinance) with the Rowlatt Act (1919) — note the escalation of.', 'Write one paragraph: "The Salt March was the spark; the prairie fire was..."'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the.',
          parts: [
                { id: 'a', prompt: 'Was the Gandhi-Irwin Pact (March 1931) a victory for the Civil Disobedience Movement? Defend your position with *two* specific pieces of evidence.', answer: 'It was a *partial* victory',
                  options: ['It was a *partial* victory', 'total victory', 'total betrayal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Salt March *was* the entire Civil Disobedience Movement, or that the movement ended with the Gandhi-Irwin Pact.' }
          ],
            remediations: { 'the-salt-march-was-the': { steps: ['On a map of India, mark Dandi, Dharasana, Vedaranyam (Rajaji\'s march), Peshawar, and Manipur — see the geographic.', 'Read Gandhi\'s 11 demands in the 2 March 1930 letter; tick which were met in the Gandhi-Irwin Pact.', 'Compare a 1930 British ordinance (e.g., Press Ordinance) with the Rowlatt Act (1919) — note the escalation of.', 'Write one paragraph: "The Salt March was the spark; the prairie fire was..."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
