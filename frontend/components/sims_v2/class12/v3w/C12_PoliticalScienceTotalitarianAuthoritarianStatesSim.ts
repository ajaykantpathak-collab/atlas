import type { SimDef } from '../../engine/types';
import C12_PoliticalScienceTotalitarianAuthoritarianStatesSim from '../../../simulations/c6_12/C12_PoliticalScienceTotalitarianAuthoritarianStatesSim';

/** v3 wrapped master — C12_PoliticalScienceTotalitarianAuthoritarianStatesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_politicalsciencetotalitarianauthoritarianstatessim: SimDef = {
    id: 'v3w_c12_politicalsciencetotalitarianauthoritarianstatessim',
    title: 'Congress as the Dominant Party: Organisation and Social Coalition',
    subtitle: 'This node covers: (1) Congress\'s organisational evolution from 1885 to 1952, (2) its.',
    classLevel: 12, subject: 'political_science', topic: 'Congress as the Dominant Party: Organisation and Social Coalition',
    chapters: [],
    nodeIds: ['c12_ps_cbse_09_001', 'c12_ps_cbse_09_002', 'c12_ps_cbse_12_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are watching a news debate where a political analyst says, "The Congress party ruled India for.', goal: 'Master Congress as the Dominant Party: Organisation and Social Coalition.' },
    discovery: {
        question: 'A political analyst argues: "The Congress System was essentially a faction-ridden party that survived only because the opposition was too weak to capitalize on.',
        options: ['The claim is partially true but incomplete', 'weakness', 'Congress dominance = absence of real democracy'],
        answer: 'The claim is partially true but incomplete',
        hook: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were.',
    },
    teaching: [
        { title: 'The Indian National Congress emerged as the.', text: 'The Indian National Congress emerged as the dominant political party in the first three general elections (1952, 1957, 1962) due to its unique organisational structure as a broad-based social and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_ps_cbse_09_001', title: 'The Indian National Congress emerged as.',
          scaffold: { problem: 'In the 1952 Lok Sabha elections, Congress won 364 out of 489 seats (74.4%) with 45% of the popular vote.',
            steps: [
            { text: 'Identify the electoral system — India uses First-Past-The-Post (FPTP) where the candidate with the highest votes in.' },
            { text: 'Analyse Congress\'s vote distribution — Congress\'s social coalition (peasants, workers, middle class, diverse.' },
            { text: 'Analyse opposition vote distribution — Non-Congress votes (55% combined) were fragmented among Socialist Party,.' },
            { text: 'Apply FPTP mechanics — In a constituency with Congress 40%, Socialist 20%, Communist 15%, Jana Sangh 10%, Independents.' },
            { text: 'Aggregate across constituencies — This pattern repeated in ~360 constituencies gave Congress 74% seats; opposition.', faded: true, blankAnswer: 'The disparity arises because FPTP rewards concentrated.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_09_002', title: 'The "Congress System" refers to the.',
          scaffold: { problem: 'In a hypothetical state with 100 constituencies, the Congress gets 48% of the total vote, Party X gets 22%, Party Y gets 18%, Party Z gets.',
            steps: [
            { text: 'Recognize that FPTP awards each constituency to the candidate with the highest vote, regardless of absolute majority.' },
            { text: 'Assume opposition votes (X+Y+Z = 52%) are split roughly equally in each constituency (e.g., X 22%, Y 18%, Z 12%).' },
            { text: 'In a typical constituency, Congress candidate gets ~48%, while the strongest opposition candidate gets ~22%.' },
            { text: 'Congress wins that constituency because 48% > 22%. This repeats across most constituencies.' },
            { text: 'Congress could win 80-90 seats out of 100 despite securing less than half the total votes.', faded: true, blankAnswer: 'Congress wins ~85 seats (85%) with 48% vote share. The seat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_12_009', title: 'The restoration of the Congress in 1980.',
          scaffold: { problem: 'Analyse the 1980 Lok Sabha election result: Congress (I) won 353 seats (42.7% vote share), Janata Party 31 seats (18.9%), Charan Singh\'s.',
            steps: [
            { text: 'Recall FPTP mechanics — winner takes all in each constituency, no proportional allocation.' },
            { text: 'Note that opposition votes were split among Janata, Charan Singh\'s Lok Dal, Congress (U), CPI(M), and others in most.' },
            { text: 'Calculate the effective threshold: Congress (I) needed only a plurality (not majority) in each seat; with opposition.' },
            { text: 'Compare with 1977: Janata\'s 41.3% vote gave 295 seats (55%) because opposition (Congress) was united; in 1980,.' },
            { text: 'Conclude that FPTP magnifies the largest party\'s seat share when opposition is fragmented, even if its vote share is.', faded: true, blankAnswer: 'The FPTP system converted Congress (I)\'s 42.7% vote into a.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_ps_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Congress as the Dominant Party: Organisation and Social Coalition', spots: [
            { id: 's1', label: 'The Indian National Congress emerged', prompt: 'Which idea is this? — The Indian National Congress emerged as the dominant political party in the first three.', answer: 'The Indian National Congress emerged', options: ['The Indian National Congress emerged', 'The Congress System refers to', 'The restoration of the Congress'] },
            { id: 's2', label: 'The Congress System refers to', prompt: 'Which idea is this? — The "Congress System" refers to the unique pattern of one-party dominance in India.', answer: 'The Congress System refers to', options: ['The Congress System refers to', 'The Indian National Congress emerged', 'The restoration of the Congress'] },
            { id: 's3', label: 'The restoration of the Congress', prompt: 'Which idea is this? — The restoration of the Congress in 1980 refers to the return of Indira Gandhi\'s Congress.', answer: 'The restoration of the Congress', options: ['The restoration of the Congress', 'The Indian National Congress emerged', 'The Congress System refers to'] }
          ] } }
    ],
    explore: { component: C12_PoliticalScienceTotalitarianAuthoritarianStatesSim, prompt: 'Explore the interactive — Congress as the Dominant Party: Organisation and Social Coalition' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_001', difficulty: 'standard',
          question: 'The Indian National Congress emerged as the dominant political party in the.',
          hint: 'If stuck, review Class 10 Political Parties chapter (c10_civ_cbse_04_001 to.',
          misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian National Congress emerged as the dominant political party in the first three',
                  options: ['The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress System" refers to the unique pattern of one-party dominance in India', 'The restoration of the Congress in 1980 refers to the return of Indira Gandhi\'s Congress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that opposition parties were.' }
          ],
            remediations: { 'congress-dominance-meant-india-was': { steps: ['If the student holds this misconception: (1) Re-read NCERT pages 35-36 "Nature of Congress dominance" comparing India.', '(2) Review Class 10 node c10_civ_cbse_04_003 (Party System: One-Party, Two-Party and Multi-Party Systems) to.', '(3) Check election data: 1952 Lok Sabha had 14 parties represented; Congress got 45% votes, not 100%.', '(4) Re-attempt Diagnostic Question 3 with the corrected framework.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: "The Congress party\'s inclusive coalition strategy made it impossible for opposition parties to offer a distinct alternative." Is this a.', answer: 'Partially valid but incomplete',
                  options: ['Partially valid but incomplete', 'copying'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that opposition parties were.' }
          ],
            remediations: { 'congress-dominance-meant-india-was': { steps: ['If the student holds this misconception: (1) Re-read NCERT pages 35-36 "Nature of Congress dominance" comparing India.', '(2) Review Class 10 node c10_civ_cbse_04_003 (Party System: One-Party, Two-Party and Multi-Party Systems) to.', '(3) Check election data: 1952 Lok Sabha had 14 parties represented; Congress got 45% votes, not 100%.', '(4) Re-attempt Diagnostic Question 3 with the corrected framework.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_002', difficulty: 'standard',
          question: 'The "Congress System" refers to the unique pattern of one-party dominance in.',
          hint: 'Revisit c11_ps_cbse_12_004 (FPTP system) and work through a 3-candidate numerical.',
          misconception: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were.',
          parts: [
                { id: 'a', prompt: 'A political analyst argues: "The Congress System was essentially a faction-ridden party that survived only because the opposition was too weak to capitalize on.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'weakness', 'Congress dominance = absence of real democracy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were banned." In reality,.' }
          ],
            remediations: { 'congress-dominance-absence-of-real': { steps: ['If the student conflates Congress dominance with authoritarian one-party rule, have them re-read the NCERT paragraphs.', 'Then ask them to explain how FPTP works using a 3-candidate constituency example (c11_ps_cbse_12_004).', 'Finally, have them write a 100-word note: "Why factions were a strength, not a weakness, for the Congress System."'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: "The Congress System proved that a dominant party can coexist with a vibrant democracy only if the electoral system is.', answer: 'FPTP was a facilitating (sufficient-ish) condition but not necessary',
                  options: ['FPTP was a facilitating (sufficient-ish) condition but not necessary', 'necessary', 'Congress dominance = absence of real democracy', 'Congress won because opposition parties were banned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were banned." In reality,.' }
          ],
            remediations: { 'congress-dominance-absence-of-real': { steps: ['If the student conflates Congress dominance with authoritarian one-party rule, have them re-read the NCERT paragraphs.', 'Then ask them to explain how FPTP works using a 3-candidate constituency example (c11_ps_cbse_12_004).', 'Finally, have them write a 100-word note: "Why factions were a strength, not a weakness, for the Congress System."'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_009', difficulty: 'standard',
          question: 'The restoration of the Congress in 1980 refers to the return of Indira Gandhi\'s.',
          hint: 'Review the table of 42nd Amendment changes in c12_ps_cbse_12_007 and the coalition.',
          misconception: 'Students often believe the 44th Amendment was passed by the Congress government after 1980 to "fix" the Constitution.',
          parts: [
                { id: 'a', prompt: 'Explain why the Janata Party government, despite winning a historic mandate in 1977, lost power within two and a half years.', answer: 'The Janata Party collapsed due to: (1) ideological incoherence',
                  options: ['The Janata Party collapsed due to: (1) ideological incoherence', 'Indira Gandhi\'s popularity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 44th Amendment was passed by the Congress government after 1980 to "fix" the Constitution.' }
          ],
            remediations: { 'the-44th-amendment-was-passed': { steps: ['If the student conflates the 42nd and 44th Amendments, have them create a two‑column table: Column A = 42nd Amendment.', 'Use the NCERT text boxes on Articles 352, 356, 19, 22, 31, 300A.', 'Then re‑attempt Diagnostic Questions 3 and 4.', 'If the student cannot explain Janata\'s collapse, revisit c12_ps_cbse_12_008 (Janata formation) and list the coalition.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
