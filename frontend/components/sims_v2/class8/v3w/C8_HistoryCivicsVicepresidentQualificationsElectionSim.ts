import type { SimDef } from '../../engine/types';
import C8_HistoryCivicsVicepresidentQualificationsElectionSim from '../../../simulations/c6_12/C8_HistoryCivicsVicepresidentQualificationsElectionSim';

/** v3 wrapped master — C8_HistoryCivicsVicepresidentQualificationsElectionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_historycivicsvicepresidentqualificationselectionsim: SimDef = {
    id: 'v3w_c8_historycivicsvicepresidentqualificationselectionsim',
    title: 'Vicepresident Qualifications Election',
    subtitle: 'Covers the constitutional powers, structure, and functions of the Election Commission of.',
    classLevel: 8, subject: 'history', topic: 'Election Commission of India: Role and Functions',
    chapters: [],
    nodeIds: ['c8_civ_ch1_7', 'c8_civ_ch2_4', 'c8_civ_ch1_6', 'c8_civ_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine watching a school sports day where the teacher who makes the rules also happens to coach one of the.', goal: 'Master Vicepresident Qualifications Election.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The Election Commission of India (ECI) is an.', text: 'The Election Commission of India (ECI) is an autonomous constitutional body established under Article 324 of the Indian Constitution, responsible for administering and overseeing all electoral.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_civ_ch1_7', title: 'The Election Commission of India (ECI).',
          scaffold: { problem: 'A minister running for re-election uses official government helicopters and security personnel to visit campaign sites and distribute party.',
            steps: [
            { text: 'Identify the actors and actions involved—a sitting minister using state resources (helicopters, security, public.' },
            { text: 'Recall the constitutional and statutory mandate of the Election Commission under Article 324, specifically regarding.' },
            { text: 'Apply the civic principle that public funds, government machinery, and official transport cannot be used to advantage.' },
            { text: 'Analyze the powers of the ECI: it can issue notice, order the seizure of misused official items, or bar the individual.' },
            { text: 'Conclude that the ECI will rule the action a violation of the Model Code of Conduct and penalize the candidate to.', faded: true, blankAnswer: 'The ECI finds the minister in violation of the Model Code.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch2_4', title: 'The Lok Sabha is the lower house of the.',
          scaffold: { problem: 'A parliamentary constituency in a state has a population of 20 lakh people, while a neighboring constituency has 5 lakh people.',
            steps: [
            { text: 'Identify the principle of Lok Sabha constituencies, which is to divide the country into roughly equal population.' },
            { text: 'Recognize that large population disparities between constituencies violate the democratic principle of "one vote, one.' },
            { text: 'Recall that the Delimitation Commission periodically readjusts and redraws constituency boundaries based on census data.' },
            { text: 'Conclude that boundaries must be redrawn so that each MP represents a more balanced and equitable number of citizens.', faded: true, blankAnswer: 'Yes, it violates proportional representation; the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch1_6', title: 'The Indian electoral system operates.',
          scaffold: { problem: 'Priya lives in a suburban area where the local municipality has failed to repair streetlights, and she wonders which election she should.',
            steps: [
            { text: 'Identify the specific civic issue—broken streetlights and municipal infrastructure maintenance in a town/suburb.' },
            { text: 'Determine which level of government holds constitutional responsibility for municipal services and urban civic.' },
            { text: 'Match the level of government to its corresponding governance body—urban local bodies (Municipalities or Municipal.' },
            { text: 'Identify the corresponding election type used to choose representatives for urban local bodies.' },
            { text: 'Conclude that Priya must participate in Local Body elections (Municipal elections) to elect ward councillors who.', faded: true, blankAnswer: 'Priya needs to participate in Local Body (Municipal).' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch2_9', title: 'The President of India is the.',
          scaffold: { problem: 'A bill to amend consumer protection rules has successfully passed through both Lok Sabha and Rajya Sabha.',
            steps: [
            { text: 'Identify the institution holding the file (the President as constitutional head).' },
            { text: 'Recall the constitutional provision regarding presidential assent to ordinary bills under Article 111.' },
            { text: 'Apply the principle of ministerial advice (Article 74) which dictates that the President acts on cabinet advice.' },
            { text: 'Analyze whether the President has absolute veto power over ordinary legislation in a parliamentary democracy.' },
            { text: 'Conclude that while the President can suggest reconsideration once, if Parliament passes it again, the President must.', faded: true, blankAnswer: 'The President cannot reject an ordinary bill indefinitely.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_civ_ch2_4', title: 'Identify each idea',
          dissect: { specimen: 'Vicepresident Qualifications Election', spots: [
            { id: 's1', label: 'The Election Commission of India', prompt: 'Which idea is this? — The Election Commission of India (ECI) is an autonomous constitutional body established.', answer: 'The Election Commission of India', options: ['The Election Commission of India', 'The Lok Sabha is the', 'The Indian electoral system operates', 'The President of India is'] },
            { id: 's2', label: 'The Lok Sabha is the', prompt: 'Which idea is this? — The Lok Sabha is the lower house of the Parliament of India, composed of representatives.', answer: 'The Lok Sabha is the', options: ['The Lok Sabha is the', 'The Election Commission of India', 'The Indian electoral system operates', 'The President of India is'] },
            { id: 's3', label: 'The Indian electoral system operates', prompt: 'Which idea is this? — The Indian electoral system operates across three distinct tiers of governance—national,.', answer: 'The Indian electoral system operates', options: ['The Indian electoral system operates', 'The Election Commission of India', 'The Lok Sabha is the', 'The President of India is'] },
            { id: 's4', label: 'The President of India is', prompt: 'Which idea is this? — The President of India is the constitutional head of state and the first citizen of the.', answer: 'The President of India is', options: ['The President of India is', 'The Election Commission of India', 'The Lok Sabha is the', 'The Indian electoral system operates'] }
          ] } }
    ],
    explore: { component: C8_HistoryCivicsVicepresidentQualificationsElectionSim, prompt: 'Explore the interactive — Vicepresident Qualifications Election' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch1_7', difficulty: 'standard',
          question: 'The Election Commission of India (ECI) is an autonomous constitutional body.',
          hint: 'Review c7_civ_ch03_002: Three Organs of Government: Legislature, Executive, Judiciary to.',
          misconception: 'Students often believe that the Election Commission of India creates election laws and passes bills regarding how.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Election Commission of India (ECI) is an autonomous constitutional body established',
                  options: ['The Election Commission of India (ECI) is an autonomous constitutional body established', 'The Lok Sabha is the lower house of the Parliament of India, composed of representatives', 'The Indian electoral system operates across three distinct tiers of governance—national,', 'The President of India is the constitutional head of state and the first citizen of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Election Commission of India creates election laws and passes bills regarding how voting should take place.' }
          ],
            remediations: { 'the-election-commission-of-india': { steps: ['To correct this misconception, ask the student: "Who debates and votes on passing a new law in Parliament—the MPs or.', 'Use a football analogy: the game rules are made by the sports board, but the referee enforces them during the match.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_4', difficulty: 'standard',
          question: 'The Lok Sabha is the lower house of the Parliament of India, composed of.',
          hint: 'Review Class 6 topic c6_civics_ch11_012 on how elections work and universal adult.',
          misconception: 'Students often confuse the Lok Sabha with the Rajya Sabha, believing that members of both houses are directly elected.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Lok Sabha is the lower house of the Parliament of India, composed of representatives',
                  options: ['The Lok Sabha is the lower house of the Parliament of India, composed of representatives', 'The Election Commission of India (ECI) is an autonomous constitutional body established', 'The Indian electoral system operates across three distinct tiers of governance—national,', 'The President of India is the constitutional head of state and the first citizen of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Lok Sabha with the Rajya Sabha, believing that members of both houses are directly elected by citizens in.' }
          ],
            remediations: { 'students-often-confuse-the-lok': { steps: ['To fix this, review the voting process: ask students who votes in their local panchayat election vs.', 'who selects representatives for higher bodies.', 'Explain that for the Lok Sabha, you walk into a booth and vote for an MP, whereas for the Rajya Sabha, MLAs vote on.', 'Contrast direct public voting with indirect legislative voting using a simple two-step diagram.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_6', difficulty: 'standard',
          question: 'The Indian electoral system operates across three distinct tiers of.',
          hint: 'Review c6_civics_ch11_013 (Levels of Government: National, State, Local) and.',
          misconception: 'Students often confuse the three tiers of elections, believing that voting in a Lok Sabha election also automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian electoral system operates across three distinct tiers of governance—national,',
                  options: ['The Indian electoral system operates across three distinct tiers of governance—national,', 'The Election Commission of India (ECI) is an autonomous constitutional body established', 'The Lok Sabha is the lower house of the Parliament of India, composed of representatives', 'The President of India is the constitutional head of state and the first citizen of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the three tiers of elections, believing that voting in a Lok Sabha election also automatically elects the state.' }
          ],
            remediations: { 'students-often-confuse-the-three': { steps: ['To fix this misconception, use a nested-circle diagram showing three levels: National (outermost circle - Lok Sabha,.', 'Explain that just as a school has monitors for individual classrooms, sports captains for the whole school, and a.', 'Walk through a local newspaper clipping showing simultaneous or staggered election dates for local municipal polls.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_9', difficulty: 'standard',
          question: 'The President of India is the constitutional head of state and the first.',
          hint: 'Review c8_civ_ch2_7 to clarify the distinction between the President\'s nominal powers and.',
          misconception: 'Students frequently confuse the roles of the President and the Prime Minister, assuming the President runs the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The President of India is the constitutional head of state and the first citizen of the',
                  options: ['The President of India is the constitutional head of state and the first citizen of the', 'The Election Commission of India (ECI) is an autonomous constitutional body established', 'The Lok Sabha is the lower house of the Parliament of India, composed of representatives', 'The Indian electoral system operates across three distinct tiers of governance—national,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the roles of the President and the Prime Minister, assuming the President runs the government ministries,.' }
          ],
            remediations: { 'students-frequently-confuse-the-roles': { steps: ['Remind students of the daily news where the Prime Minister announces economic policies while the President gives formal.', 'Read Article 74, which states there shall be a Council of Ministers with the Prime Minister at the head to aid and.', 'Clarify that the President signs documents because the Constitution requires it, but the decisions originate from the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
