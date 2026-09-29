import type { SimDef } from '../../engine/types';
import C12_SociologyGlobalisationSim from '../../../simulations/c6_12/C12_SociologyGlobalisationSim';

/** v3 wrapped master — C12_SociologyGlobalisationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologyglobalisationsim: SimDef = {
    id: 'v3w_c12_sociologyglobalisationsim',
    title: 'Globalisation: Definition, Dimensions and the Interconnected World',
    subtitle: 'This node covers the sociological definition of globalisation, its three core dimensions.',
    classLevel: 12, subject: 'sociology', topic: 'Globalisation: Definition, Dimensions and the Interconnected World',
    chapters: [],
    nodeIds: ['c12_soc_cbse_13_001', 'c12_soc_cbse_13_002', 'c12_soc_cbse_13_003', 'c12_soc_cbse_13_004', 'c12_soc_cbse_13_006', 'c12_soc_cbse_13_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a Class 12 student in a small town in Uttar Pradesh.', goal: 'Master Globalisation: Definition, Dimensions and the Interconnected World.' },
    discovery: {
        question: 'Read this scenario: *"Ramesh, a silk weaver in Varanasi, loses orders because Chinese power-loom silk floods the market.',
        options: ['Ramesh', 'economic', 'Globalisation means McDonald\'s and Hollywood taking over Indian culture'],
        answer: 'Ramesh',
        hook: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students.',
    },
    teaching: [
        { title: 'Globalisation refers to the growing.', text: 'Globalisation refers to the growing interdependence between different people, regions, and countries worldwide as social and economic relationships stretch across the globe, driven primarily by.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_13_001', title: 'Globalisation refers to the growing.',
          scaffold: { problem: 'A Class 12 student in Jaipur orders a smartphone online. The phone is designed in the USA, uses a processor from Taiwan, screen from South.',
            steps: [
            { text: 'Identify the economic dimension — cross-border flow of capital (US/Japanese investment in Flipkart), goods (components,.' },
            { text: 'Identify the political dimension — WTO\'s Information Technology Agreement (ITA) mandating zero tariffs on tech.' },
            { text: 'Identify the cultural dimension — global design aesthetics (Apple/Samsung UI), English-language interface, aspirational.' },
            { text: 'Name two global institutions/rules — (a) **WTO / ITA** (tariff elimination on ICT goods), (b) **Bilateral Investment.' },
            { text: 'Synthesise — The purchase is not just "buying a phone"; it is a node where global production networks, trade rules,.', faded: true, blankAnswer: 'Economic: Global value chain (design USA, parts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_13_002', title: 'The history of globalisation refers to.',
          scaffold: { problem: 'A Class 12 student writes in a board exam: "Globalisation began in 1991 when India adopted LPG policies." Using the NCERT historical.',
            steps: [
            { text: 'Identify the error — the statement conflates *liberalisation* (a policy shift) with *globalisation* (a long-term.' },
            { text: 'Cite NCERT evidence for pre-colonial global interconnections (Silk Route, Panini, Yi Jing, kupamanduka parable).' },
            { text: 'Cite NCERT evidence for colonial globalisation (capitalist integration, indentured labour, slave trade, raw material.' },
            { text: 'Cite NCERT evidence for post-independence global engagement (Non-Aligned Movement, technology import, foreign firms).' },
            { text: 'Conclude: 1991 marks a *new phase* (neo-liberal, ICT-driven, financialised), not the *origin*.', faded: true, blankAnswer: 'Correction: (1) Globalisation ≠ LPG; LPG is India\'s entry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_13_003', title: 'The LPG (Liberalisation, Privatisation,.',
          scaffold: { problem: 'A Class 12 student is asked: "Explain how the 1991 LPG reforms restructured the relationship between the Indian state, domestic capital,.',
            steps: [
            { text: 'Identify the three actors — Indian state (policy maker), domestic capital (pre-1991 protected industries, post-1991.' },
            { text: 'Trace the pre-1991 relation — state *controlled* domestic capital via licensing (Industrial Development and Regulation.' },
            { text: 'Trace the 1991 shift — state *retreated* from direct control (delicensing, MRTP dilution), *facilitated* domestic.' },
            { text: 'Apply Nike example — Nike (global capital) never manufactured in US; it sourced from Japan → Korea → Thailand → India.' },
            { text: 'Conclude the new triadic relation — state shifted from *controller* to *facilitator* of capital (both domestic and.', faded: true, blankAnswer: 'The 1991 LPG reforms transformed the Indian state from a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_13_004', title: 'Multinational Corporations (MNCs) or.',
          scaffold: { problem: 'A sociologist wants to study the impact of an MNC\'s entry on a traditional craft cluster (e.g., handloom weaving in Varanasi).',
            steps: [
            { text: 'Map the existing local commodity chain — identify raw material suppliers (cotton/silk farmers), spinners, dyers,.' },
            { text: 'Identify the MNC\'s entry point — does it buy directly from weavers (bypassing master weavers), contract through a local.' },
            { text: 'Trace value capture — calculate the final retail price of an MNC-branded handloom product (e.g., a scarf sold globally.' },
            { text: 'Analyse autonomy loss — under the old system, weavers had some bargaining power within local networks.' },
            { text: 'Document social consequences — interview weavers who shifted to MNC contract work versus those who stayed independent.', faded: true, blankAnswer: 'A five-step commodity chain analysis linking local craft.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_13_006', title: 'Globalisation and the Indian Economy:.',
          scaffold: { problem: 'A student reads: \'FDI in India crossed $80 billion in 2021-22.\' They assume this means 80 billion dollars worth of *factories* were built.',
            steps: [
            { text: 'Identify the student\'s implicit model — they equate FDI with Greenfield manufacturing investment (land, machinery,.' },
            { text: 'Recall NCERT\'s sectoral data — post-1991 FDI flowed disproportionately into services: computer software/hardware.' },
            { text: 'Apply \'weightless economy\' concept — software/services FDI creates *office-based, graduate-level, English-requiring*.' },
            { text: 'Connect to employment elasticity — services FDI has lower employment multiplier per dollar than manufacturing.' },
            { text: 'Conclude — the $80B figure signals *financial integration* and *service-sector deepening*, not industrialisation; it.', faded: true, blankAnswer: 'The inference is flawed because post-1991 FDI is.' }
            ] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_007', title: 'Contract farming under globalisation is.',
          caseStudy: { intro: 'Imagine a farmer in Punjab who once grew wheat and paddy under assured MSP procurement.',
            decisions: [{ prompt: 'Define contract farming and distinguish it from tenant farming and cooperative farming in terms of who bears production risk and who.', options: [
                { text: 'Contract farming: a buyer (corporation/processor) contracts a farmer to produce a', outcome: 'Contract farming: a buyer (corporation/processor) contracts a farmer to produce a specific crop.' },
                { text: 'contract farming reduces farmer risk', outcome: 'Not quite — Students equate "contract farming" with "corporate farming" and assume the crisis is only about.', reveals: 'students-equate-contract-farming-with' }
            ] }] } }
    ],
    explore: { component: C12_SociologyGlobalisationSim, prompt: 'Explore the interactive — Globalisation: Definition, Dimensions and the Interconnected World' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_001', difficulty: 'standard',
          question: 'Globalisation refers to the growing interdependence between different people,.',
          hint: 'If stuck, re-do the "personal trouble ↔ public issue" exercise from c11_soc_cbse_01_002.',
          misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students.',
          parts: [
                { id: 'a', prompt: 'Read this scenario: *"Ramesh, a silk weaver in Varanasi, loses orders because Chinese power-loom silk floods the market.', answer: 'Ramesh',
                  options: ['Correct answer: Ramesh', 'economic', 'Globalisation means McDonald\'s and Hollywood taking over Indian culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students make this error:**.' }
          ],
            remediations: { 'misconception-globalisation-westernisation-ameri': { steps: ['** Revisit **c11_soc_cbse_01_002 (Sociological Imagination)** — practice the "personal trouble ↔ public issue" mapping.', '** Re-read **c11_soc_cbse_07_003 (Five Sources of Social Change)** — identify which sources (technological, economic,.', '** Do **Activity 6.1** from textbook: Track "globalisation" mentions in a newspaper for 3 days.', '** Re-diagnostic: Answer Diagnostic Question 2 again. If still incomplete, schedule 1:1 concept-mapping session with.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: *"Globalisation benefits everyone — it brings cheaper goods, new jobs, and modern culture to India."* Use the NCERT concept of **uneven.', answer: 'The claim is false',
                  options: ['Correct answer: The claim is false', 'Globalisation means McDonald\'s and Hollywood taking over Indian culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students make this error:**.' }
          ],
            remediations: { 'misconception-globalisation-westernisation-ameri': { steps: ['** Revisit **c11_soc_cbse_01_002 (Sociological Imagination)** — practice the "personal trouble ↔ public issue" mapping.', '** Re-read **c11_soc_cbse_07_003 (Five Sources of Social Change)** — identify which sources (technological, economic,.', '** Do **Activity 6.1** from textbook: Track "globalisation" mentions in a newspaper for 3 days.', '** Re-diagnostic: Answer Diagnostic Question 2 again. If still incomplete, schedule 1:1 concept-mapping session with.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_002', difficulty: 'standard',
          question: 'The history of globalisation refers to the long-term, phased evolution of.',
          hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c8_hist_ch3_8 (Impact of.',
          misconception: 'Students often treat "globalisation" as a *single, uniform process* that began in 1991, ignoring the deep historical.',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT textbook uses the *kupamanduka* (well-frog) parable when discussing India\'s historical global outlook.', answer: 'The parable warns against isolationism',
                  options: ['The parable warns against isolationism', 'it shows Indians were frogs', 'it criticises traditional culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "globalisation" as a *single, uniform process* that began in 1991, ignoring the deep historical layers.' }
          ],
            remediations: { 'students-often-treat-globalisation-as': { steps: ['If a student cannot distinguish the four phases, do this 3-step remediation: (1) Re-read NCERT Box 6.1 (kupamanduka).', '(2) Watch the 10-min video "History of Globalisation in 4 Phases" (search YouTube for CBSE Class 12 Sociology Chapter.', '(3) Re-attempt Diagnostic Questions 1 and 4 verbally — if they can articulate the *coercive* vs *voluntary* and.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_003', difficulty: 'standard',
          question: 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to.',
          hint: 'If stuck, revisit Class 11 Node c11_soc_cbse_07_001 (Social Change definition) and.',
          misconception: 'Students often equate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms or a single undifferentiated.',
          parts: [
                { id: 'a', prompt: 'What were the three specific policy components of the LPG reforms launched in India in July 1991, and what is one concrete policy measure for each?', answer: '(1) Liberalisation',
                  options: ['Correct answer: (1) Liberalisation', 'selling PSUs is liberalisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms or a single undifferentiated process called \'LPG\'.' }
          ],
            remediations: { 'students-often-equate-liberalisation': { steps: ['If the student conflates the three terms: Step 1 — Make a three-column table: Column 1 = "What the state STOPS doing",.', 'Fill for each: Liberalisation (stops: issuing industrial licenses, controlling prices; starts: allowing market entry,.', 'Privatisation (stops: running hotels, telecom, airlines; starts: selling equity, strategic disinvestment; example: VSNL.', 'Globalisation (stops: restricting foreign capital/goods; starts: signing WTO agreements, allowing FDI; example: FDI in.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_004', difficulty: 'standard',
          question: 'Multinational Corporations (MNCs) or Transnational Corporations (TNCs) are.',
          hint: 'Revisit c12_soc_cbse_13_001 (globalisation dimensions) and c12_soc_cbse_13_003 (LPG.',
          misconception: 'Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions (WTO/IMF)*, treating.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of MNC-driven globalisation on two groups: (a) urban middle-class youth in India and (b) traditional weavers in Sircilla/Dubakka (Andhra.', answer: 'urban middle-class youth in India and (',
                  options: ['urban middle-class youth in India and (', 'globalisation benefits everyone', 'only harms the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions (WTO/IMF)*, treating them as synonyms for.' }
          ],
            remediations: { 'students-often-equate-mncs-with': { steps: ['If the student conflates MNCs with international institutions or FDI policies: (1) Have them re-read the NCERT.', 'institutions) and *actions* (production/investment vs.', '(2) Ask them to classify these entities: Coca Cola, WTO, IMF, Tata Motors, Infosys, World Bank — into "MNC/TNC" or.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions (WTO/IMF)*, treating.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of MNC-driven globalisation on two groups: (a) urban middle-class youth in India and (b) traditional weavers in Sircilla/Dubakka (Andhra.', answer: 'urban middle-class youth in India and (',
                  options: ['urban middle-class youth in India and (', 'globalisation benefits everyone', 'only harms the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions (WTO/IMF)*, treating them as synonyms for.' }
          ],
            remediations: { 'students-often-equate-mncs-with': { steps: ['If the student conflates MNCs with international institutions or FDI policies: (1) Have them re-read the NCERT.', 'institutions) and *actions* (production/investment vs.', '(2) Ask them to classify these entities: Coca Cola, WTO, IMF, Tata Motors, Infosys, World Bank — into "MNC/TNC" or.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_006', difficulty: 'standard',
          question: 'Globalisation and the Indian Economy: FDI, Outsourcing and the IT Boom refers.',
          hint: 'If stuck on FDI vs FII distinction: revisit Class 12 Economics (Macroeconomics) Chapter 6.',
          misconception: 'Students equate \'FDI\' *only* with \'foreign companies setting up factories in India\' (manufacturing FDI), ignoring that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Globalisation and the Indian Economy: FDI, Outsourcing and the IT Boom refers to the',
                  options: ['Globalisation and the Indian Economy: FDI, Outsourcing and the IT Boom refers to the', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'FDI\' *only* with \'foreign companies setting up factories in India\' (manufacturing FDI), ignoring that post-1991 India\'s.' }
          ],
            remediations: { 'students-equate-fdi-only-with': { steps: ['Re-read NCERT Box 6.4 (Nike) and Box 6.5 (ILO jobless growth) — identify *three* differences between Nike\'s.', 'Pull RBI\'s \'Sectoral Deployment of FDI\' data (last 5 years) — calculate % share of \'Computer Software & Hardware\' vs.', 'Write a 100-word note: \'Why India\'s FDI-led growth did not create a manufacturing working class.\'', 'Re-attempt Diagnostic Q3 — if you still list only \'cheap labour\', revisit Class 11 node c11_soc_cbse_03_007 (Work and.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_007', difficulty: 'standard',
          question: 'Contract farming under globalisation is a production arrangement where.',
          hint: 'If stuck on WTO AoA pillars → re-read c12_soc_cbse_13_005 section on "WTO and.',
          misconception: 'Students equate "contract farming" with "corporate farming" and assume the crisis is only about *corporate entry*.',
          parts: [
                { id: 'a', prompt: 'Compare the "cost-price squeeze" in Indian agriculture pre-1991 (Green Revolution era) and post-1991 (liberalisation era).', answer: 'Pre-1991: Squeeze driven by state procurement prices lagging input costs',
                  options: ['Pre-1991: Squeeze driven by state procurement prices lagging input costs', 'both eras had cost-price squeeze so nothing new'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "contract farming" with "corporate farming" and assume the crisis is only about *corporate entry*.' }
          ],
            remediations: { 'students-equate-contract-farming-with': { steps: ['Revisit c11_soc_cbse_07_008 (Rural Society: Agrarian Relations) — re-learn the *class structure* of Indian countryside.', 'Re-read c12_soc_cbse_13_003 (LPG Policies) — specifically the *sequence*: devaluation → import liberalisation → subsidy.', 'Do a focused re-diagnostic: "Explain why a 2-hectare cotton farmer in Vidarbha *cannot* simply \'opt out\' of Bt cotton.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "contract farming" with "corporate farming" and assume the crisis is only about *corporate entry*.',
          parts: [
                { id: 'a', prompt: 'Compare the "cost-price squeeze" in Indian agriculture pre-1991 (Green Revolution era) and post-1991 (liberalisation era).', answer: 'Pre-1991: Squeeze driven by state procurement prices lagging input costs',
                  options: ['Pre-1991: Squeeze driven by state procurement prices lagging input costs', 'both eras had cost-price squeeze so nothing new'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "contract farming" with "corporate farming" and assume the crisis is only about *corporate entry*.' }
          ],
            remediations: { 'students-equate-contract-farming-with': { steps: ['Revisit c11_soc_cbse_07_008 (Rural Society: Agrarian Relations) — re-learn the *class structure* of Indian countryside.', 'Re-read c12_soc_cbse_13_003 (LPG Policies) — specifically the *sequence*: devaluation → import liberalisation → subsidy.', 'Do a focused re-diagnostic: "Explain why a 2-hectare cotton farmer in Vidarbha *cannot* simply \'opt out\' of Bt cotton.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
