import type { SimDef } from '../../engine/types';
import C12_PoliticalScienceSalientFeaturesIndianSim from '../../../simulations/c6_12/C12_PoliticalScienceSalientFeaturesIndianSim';

/** v3 wrapped master — C12_PoliticalScienceSalientFeaturesIndianSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_politicalsciencesalientfeaturesindiansim: SimDef = {
    id: 'v3w_c12_politicalsciencesalientfeaturesindiansim',
    title: 'Salient Features Indian',
    subtitle: 'This node covers: (1) Congress\'s organisational evolution from 1885 to 1952, (2) its.',
    classLevel: 12, subject: 'political_science', topic: 'Congress as the Dominant Party: Organisation and Social Coalition',
    chapters: [],
    nodeIds: ['c12_ps_cbse_09_001', 'c12_ps_cbse_15_001', 'c12_ps_cbse_13_001', 'c12_ps_cbse_02_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are watching a news debate where a political analyst says, "The Congress party ruled India for.', goal: 'Master Salient Features Indian.' },
    discovery: {
        question: 'Evaluate the statement: "The end of the Congress system weakened Indian democracy because coalition governments are inherently unstable and ineffective." Use.',
        options: ['The statement is **refutable**', 'accommodation within one party', '**"the Congress system ended'],
        answer: 'The statement is **refutable**',
        hook: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In.',
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
        { type: 'scaffold', nodeId: 'c12_ps_cbse_15_001', title: 'The "Congress system" refers to the.',
          scaffold: { problem: 'In the 1989 Lok Sabha election, Congress got 40% votes and 197 seats; Janata Dal got 17% votes and 143 seats; BJP got 11% votes and 85.',
            steps: [
            { text: 'Recall FPTP principle — each constituency elects one MP by plurality; votes for losing candidates are "wasted".' },
            { text: 'Congress votes were spread thinly across many constituencies (second/third place finishes), while Janata Dal votes were.' },
            { text: 'BJP\'s 11% votes were even more concentrated (Hindi belt, Gujarat, Maharashtra), yielding high seat-to-vote conversion.' },
            { text: 'Calculate approximate "seats per 1% vote": Congress 197/40 = 4.9; Janata Dal 143/17 = 8.4; BJP 85/11 = 7.7.' },
            { text: 'Conclude that the Congress system relied on national vote spread; when its vote share dropped just 8%, its seat share.', faded: true, blankAnswer: 'Janata Dal\'s high seat-to-vote ratio (8.4 vs Congress\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_13_001', title: 'Popular movements are collective.',
          scaffold: { problem: 'The Chipko Movement (1973) began when villagers in Uttarakhand hugged trees to stop commercial logging.',
            steps: [
            { text: 'Identify leadership — Bhatt and Bahuguna were not party functionaries; they headed voluntary organizations (DGSM,.' },
            { text: 'Check organizational affiliation — The movement used village councils (van panchayats) and NGO networks, not party.' },
            { text: 'Assess accountability — Leaders answered to villagers and ecological ethics, not a party high command.' },
            { text: 'Note party interaction — Parties (Congress, Communists) offered support later, but movement retained autonomy to.' },
            { text: 'Conclusion — Non-party movement. NCERT explicitly cites Chipko as a pioneering non-party movement.', faded: true, blankAnswer: 'Non-party movement. Led by NGOs/Gandhian activists,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_02_001', title: 'The Soviet System refers to the.',
          scaffold: { problem: 'A newspaper editorial claims: “The Soviet Union collapsed because central planning *cannot* work — it’s mathematically impossible to.',
            steps: [
            { text: 'Identify the claim’s core — it attributes collapse *solely* to economic calculation problem (Mises/Hayek).' },
            { text: 'Recall Political Science perspective — institutions (party monopoly, nomenklatura, lack of feedback loops) shape *how*.' },
            { text: 'List three political-institutional factors from the Soviet system that worsened economic performance: (a) **No.' },
            { text: 'Contrast with **China post-1978** — similar planned economy *initially*, but *political* decentralization.' },
            { text: 'Conclude — the editorial’s “mathematical impossibility” is a **necessary but not sufficient** explanation; the.', faded: true, blankAnswer: 'The claim is **reductionist**. While the economic.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_ps_cbse_15_001', title: 'Identify each idea',
          dissect: { specimen: 'Salient Features Indian', spots: [
            { id: 's1', label: 'The Indian National Congress emerged', prompt: 'Which idea is this? — The Indian National Congress emerged as the dominant political party in the first three.', answer: 'The Indian National Congress emerged', options: ['The Indian National Congress emerged', 'The Congress system refers to', 'Popular movements are collective actions', 'The Soviet System refers to'] },
            { id: 's2', label: 'The Congress system refers to', prompt: 'Which idea is this? — The "Congress system" refers to the period (1947–1989) when the Indian National Congress.', answer: 'The Congress system refers to', options: ['The Congress system refers to', 'The Indian National Congress emerged', 'Popular movements are collective actions', 'The Soviet System refers to'] },
            { id: 's3', label: 'Popular movements are collective actions', prompt: 'Which idea is this? — Popular movements are collective actions by citizens to address public issues, demand.', answer: 'Popular movements are collective actions', options: ['Popular movements are collective actions', 'The Indian National Congress emerged', 'The Congress system refers to', 'The Soviet System refers to'] },
            { id: 's4', label: 'The Soviet System refers to', prompt: 'Which idea is this? — The Soviet System refers to the political and economic structure of the Union of Soviet.', answer: 'The Soviet System refers to', options: ['The Soviet System refers to', 'The Indian National Congress emerged', 'The Congress system refers to', 'Popular movements are collective actions'] }
          ] } }
    ],
    explore: { component: C12_PoliticalScienceSalientFeaturesIndianSim, prompt: 'Explore the interactive — Salient Features Indian' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_001', difficulty: 'standard',
          question: 'The Indian National Congress emerged as the dominant political party in the.',
          hint: 'If stuck, review Class 10 Political Parties chapter (c10_civ_cbse_04_001 to.',
          misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian National Congress emerged as the dominant political party in the first three',
                  options: ['The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress system" refers to the period (1947–1989) when the Indian National Congress', 'Popular movements are collective actions by citizens to address public issues, demand', 'The Soviet System refers to the political and economic structure of the Union of Soviet'],
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
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_001', difficulty: 'standard',
          question: 'The "Congress system" refers to the period (1947–1989) when the Indian National.',
          hint: 'If stuck, revisit **c11_ps_cbse_12_004** (FPTP mechanics) and **c11_ps_cbse_12_006** (Why.',
          misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In.',
          parts: [
                { id: 'a', prompt: 'In which year did the Congress party lose its majority in the Lok Sabha for the first time, marking the end of the "Congress system" as defined by political.', answer: '1989',
                  options: ['1989', '**"the Congress system ended'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In reality, Congress remained.' }
          ],
            remediations: { 'the-congress-system-ended-because': { steps: ['If the student holds this misconception: 1.', 'Revisit **c11_ps_cbse_12_006** (Why India chose FPTP) to see how FPTP exaggerates seat shares for the largest party.', 'Study the 1989 seat-vote table in NCERT (p.', '140): Congress 40% votes → 197 seats; Janata Dal 17% votes → 143 seats.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The end of the Congress system weakened Indian democracy because coalition governments are inherently unstable and ineffective." Use.', answer: 'The statement is **refutable**',
                  options: ['The statement is **refutable**', 'accommodation within one party', '**"the Congress system ended'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In reality, Congress remained.' }
          ],
            remediations: { 'the-congress-system-ended-because': { steps: ['If the student holds this misconception: 1.', 'Revisit **c11_ps_cbse_12_006** (Why India chose FPTP) to see how FPTP exaggerates seat shares for the largest party.', 'Study the 1989 seat-vote table in NCERT (p.', '140): Congress 40% votes → 197 seats; Janata Dal 17% votes → 143 seats.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_001', difficulty: 'standard',
          question: 'Popular movements are collective actions by citizens to address public issues,.',
          hint: 'Revisit Class 10 Political Parties (c10_civ_cbse_04_001) and Class 11 Citizenship.',
          misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.',
          parts: [
                { id: 'a', prompt: 'Why did non-party movements gain prominence in India during the 1970s and 1980s? Explain using the concept of "party system failure."', answer: 'Non-party movements emerged',
                  options: ['Non-party movements emerged', 'Non-party movements are anti-democratic', 'non-party'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' },
                { id: 'b', prompt: 'Scenario: A statewide farmers\' protest is led by a union whose president is also a member of a regional political party\'s state executive.', answer: 'This is a party-based movement',
                  options: ['This is a party-based movement', 'apolitical', 'anti-political'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' },
                { id: 'c', prompt: 'Compare the accountability mechanisms of party-based movements versus non-party movements. How does this affect their longevity and policy impact?', answer: 'Party-based movements are accountable to party leadership and electoral cycles',
                  options: ['Party-based movements are accountable to party leadership and electoral cycles', 'Both are equally accountable to the public', 'apolitical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' }
          ],
            remediations: { 'non-party-movements-are-apolitical': { steps: ['If the student conflates non-party with apolitical, assign this 3-step remediation: (1) Re-read NCERT Class 12 Chapter.', '(3) Write a 100-word paragraph: "How NBA\'s refusal to join any party strengthened its moral authority to question all.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Non-party movements weaken political parties and fragment the party system, harming democratic stability." Use evidence from Indian.', answer: 'This argument is flawed',
                  options: ['This argument is flawed', 'apolitical', 'anti-political'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe non-party movements are "apolitical" or "anti-political" because they don\'t contest elections.' }
          ],
            remediations: { 'non-party-movements-are-apolitical': { steps: ['If the student conflates non-party with apolitical, assign this 3-step remediation: (1) Re-read NCERT Class 12 Chapter.', '(3) Write a 100-word paragraph: "How NBA\'s refusal to join any party strengthened its moral authority to question all.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_001', difficulty: 'standard',
          question: 'The Soviet System refers to the political and economic structure of the Union.',
          hint: 'If stuck, revisit **c11_hist_cbse_09_003** (Marx’s base-superstructure) and.',
          misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.”.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Soviet System refers to the political and economic structure of the Union of Soviet',
                  options: ['The Soviet System refers to the political and economic structure of the Union of Soviet', 'The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress system" refers to the period (1947–1989) when the Indian National Congress', 'Popular movements are collective actions by citizens to address public issues, demand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' }
          ],
            remediations: { 'misconception-the-soviet-union-had': { steps: ['**Re-read** the NCERT Class 12 *Contemporary World Politics* Chapter 1 (“The End of Bipolarity”), Section **“The Soviet.', 'Focus on the **bulleted list of features** and the **“Why did the Soviet system become stagnant?”** box.', '**Watch** the 10-min video “How the Soviet Union Worked” (CaspianReport or similar) — pause at **nomenklatura**,.', '**Re-attempt** Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.”.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** “The Soviet planned economy was a complete failure because it could not produce consumer goods.” Assess this claim using **three specific pieces.', answer: '**Correct answer:** The claim is **overstated**',
                  options: ['**Correct answer:** The claim is **overstated**', 'it was a total disaster', 'no constitution/elections'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' },
                { id: 'b', prompt: '**CREATE:** Draft a **tweet (≤ 280 characters)** that a Soviet citizen in 1980 might have written (samizdat style) to criticize the *gap between constitutional.', answer: '**Expected answer (criteria):** A good tweet will: - Mention **Article 6 (CPSU',
                  options: ['**Expected answer (criteria):** A good tweet will: - Mention **Article 6 (CPSU', 'no constitution/elections'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' }
          ],
            remediations: { 'misconception-the-soviet-union-had': { steps: ['**Re-read** the NCERT Class 12 *Contemporary World Politics* Chapter 1 (“The End of Bipolarity”), Section **“The Soviet.', 'Focus on the **bulleted list of features** and the **“Why did the Soviet system become stagnant?”** box.', '**Watch** the 10-min video “How the Soviet Union Worked” (CaspianReport or similar) — pause at **nomenklatura**,.', '**Re-attempt** Diagnostic Questions 2 and 4.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
