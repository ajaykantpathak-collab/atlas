import type { SimDef } from '../../engine/types';
import C11_SociologyToolsDataCollectionSim from '../../../simulations/c6_12/C11_SociologyToolsDataCollectionSim';

/** v3 wrapped master — C11_SociologyToolsDataCollectionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologytoolsdatacollectionsim: SimDef = {
    id: 'v3w_c11_sociologytoolsdatacollectionsim',
    title: 'Objectivity and Subjectivity in Social Research',
    subtitle: 'This node covers the philosophical problem of objectivity vs. subjectivity in sociology,.',
    classLevel: 11, subject: 'sociology', topic: 'Objectivity and Subjectivity in Social Research',
    chapters: [],
    nodeIds: ['c11_soc_cbse_05_002', 'c11_soc_cbse_05_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a sociologist studying the impact of a new metro rail project on street vendors in your city.', goal: 'Master Objectivity and Subjectivity in Social Research.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Objectivity in social research refers to the.', text: 'Objectivity in social research refers to the ideal of producing knowledge that is unbiased, neutral, and based solely on verifiable facts, independent of the researcher\'s personal values, beliefs, or.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_05_002', title: 'Objectivity in social research refers.',
          scaffold: { problem: 'A researcher wants to study "conflict between mothers-in-law and daughters-in-law in joint families in Delhi".',
            steps: [
            { text: 'Identify the researcher\'s social markers: age (25), marital status (unmarried), family structure (nuclear), regional.' },
            { text: 'Map each marker to a specific interpretive risk: (a) Unmarried status → may romanticize or demonize the mother-in-law.' },
            { text: 'Design a reflexive strategy for each risk: (a) Keep a \'role-expectation diary\' recording assumptions about MIL/DIL.' },
            { text: 'Formalize into a positionality statement for the thesis: "As an unmarried, nuclear-family researcher from Mumbai, I.' },
            { text: 'Verify adequacy: The strategies are specific, documented, and allow reader audit.' },
            { text: 'Conclude: This demonstrates objectivity-as-process — not neutrality, but transparent bias management.', faded: true, blankAnswer: 'Four sources: (1) unmarried status → risk of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_05_007', title: 'Bronislaw Malinowski (1884–1942) was a.',
          scaffold: { problem: 'A Class 11 student reads that Malinowski \'invented fieldwork\' in their guidebook.',
            steps: [
            { text: 'Identify the claim to be evaluated — \'Malinowski invented fieldwork\' — and distinguish two meanings: \'first person to.' },
            { text: 'Cite pre-Malinowskian fieldwork instances from the textbook: Rivers (Torres Strait 1898), Boas (Native American.' },
            { text: 'Identify Malinowski\'s specific innovations from the textbook: (a) mandatory vernacular fluency without interpreters,.' },
            { text: 'Trace the institutional mechanism: Malinowski\'s LSE professorship (1927–1938) gave him control over anthropology.' },
            { text: 'Explain the sociological significance: the \'invention\' narrative functions as a *founding myth* that legitimates.' },
            { text: 'Conclude that the claim is factually false (he didn\'t invent the practices) but analytically true (he invented the.', faded: true, blankAnswer: 'The claim is historically inaccurate (fieldwork practices.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_05_007', title: 'Identify each idea',
          dissect: { specimen: 'Objectivity and Subjectivity in Social Research', spots: [
            { id: 's1', label: 'Objectivity in social research refers', prompt: 'Which idea is this? — Objectivity in social research refers to the ideal of producing knowledge that is.', answer: 'Objectivity in social research refers', options: ['Objectivity in social research refers', 'Bronislaw Malinowski 18841942 was a'] },
            { id: 's2', label: 'Bronislaw Malinowski 18841942 was a', prompt: 'Which idea is this? — Bronislaw Malinowski (1884–1942) was a Polish-British anthropologist who transformed.', answer: 'Bronislaw Malinowski 18841942 was a', options: ['Bronislaw Malinowski 18841942 was a', 'Objectivity in social research refers'] }
          ] } }
    ],
    explore: { component: C11_SociologyToolsDataCollectionSim, prompt: 'Explore the interactive — Objectivity and Subjectivity in Social Research' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_007', difficulty: 'standard',
          question: 'Bronislaw Malinowski (1884–1942) was a Polish-British anthropologist who.',
          hint: 'Revisit c11_soc_cbse_05_006\'s section on \'what the sociologist actually does during.',
          misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.',
          parts: [
                { id: 'a', prompt: 'A sociology student plans to study a migrant worker community in Mumbai for six weeks, using Hindi and Marathi (which they speak fluently), living in a rented.', answer: 'Alignments: (1) vernacular language use without interpreters',
                  options: ['Alignments: (1) vernacular language use without interpreters', 'Malinowski \'invented\' participant observation ex nihilo'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.' },
                { id: 'b', prompt: 'Compare Malinowski\'s \'genealogical method\' (constructing detailed family trees to map kinship systems) with the census operation he conducted at the start of.', answer: 'The census provided a *synchronic structural snapshot*: demographic composition,',
                  options: ['The census provided a *synchronic structural snapshot*: demographic composition,', 'Malinowski \'invented\' participant observation ex nihilo'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.' }
          ],
            remediations: { 'malinowski-invented-participant-observation-ex': { steps: ['If a student conflates Malinowski with \'first fieldworker\', assign this 3-step corrective: (1) Read the 1898 Torres.', '(2) Compare Boas\'s 1901 \'Instructions for Fieldwork\' with Malinowski\'s 1922 *Argonauts* appendix on method — identify.', '(3) Write a 150-word paragraph explaining why LSE\'s position in the British imperial university system (not.', 'Debrief by discussing how disciplinary histories are written by institutional winners.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.',
          parts: [
                { id: 'a', prompt: 'Compare Malinowski\'s \'genealogical method\' (constructing detailed family trees to map kinship systems) with the census operation he conducted at the start of.', answer: 'The census provided a *synchronic structural snapshot*: demographic composition,',
                  options: ['The census provided a *synchronic structural snapshot*: demographic composition,', 'Malinowski \'invented\' participant observation ex nihilo'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.' }
          ],
            remediations: { 'malinowski-invented-participant-observation-ex': { steps: ['If a student conflates Malinowski with \'first fieldworker\', assign this 3-step corrective: (1) Read the 1898 Torres.', '(2) Compare Boas\'s 1901 \'Instructions for Fieldwork\' with Malinowski\'s 1922 *Argonauts* appendix on method — identify.', '(3) Write a 150-word paragraph explaining why LSE\'s position in the British imperial university system (not.', 'Debrief by discussing how disciplinary histories are written by institutional winners.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
