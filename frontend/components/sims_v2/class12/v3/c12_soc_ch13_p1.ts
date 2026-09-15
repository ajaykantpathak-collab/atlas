import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch13_p1: SimDef = {
    id: 'v3_c12_soc_ch13_p1',
    title: 'Globalisation and Social Change · Part 1/2',
    subtitle: 'The world in your pocket, the squeeze in the village',
    classLevel: 12, subject: 'sociology', topic: 'Globalisation and Social Change · Part 1/2',
    chapters: ['c12_soc_ch13'],
    nodeIds: ['c12_soc_cbse_13_001', 'c12_soc_cbse_13_002', 'c12_soc_cbse_13_003', 'c12_soc_cbse_13_004', 'c12_soc_cbse_13_005', 'c12_soc_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Globalisation analyst', intro: 'Five border-crossings before breakfast — the question is who arranged them, and who pays for them.', goal: 'Define globalisation\'s dimensions and drivers, and analyse its uneven impact and glocalisation in India.' },
    discovery: {
        question: 'Your morning: alarm on a Chinese phone, shirt stitched in Bangladesh, coffee from Brazil, a tutor in Bengaluru on a US-hosted app — all before 8 AM, while your farmer uncle watches imported oilseeds crash his prices. One process or many?',
        options: ['One process — globalisation stretching social and economic relationships worldwide, driven by the ICT revolution inside a neo-liberal policy frame, creating winners and losers in the same family', 'Just more Silk Route — trade is as old as history', 'Only economics — culture and politics aren\'t involved', 'Westernisation — the West remaking everyone else'],
        answer: 'One process — globalisation stretching social and economic relationships worldwide, driven by the ICT revolution inside a neo-liberal policy frame, creating winners and losers in the same family',
        hook: 'Globalisation isn\'t just Americanisation — Korean silk displaces Bihar spinners, Sudanese gum displaces Gujarat collectors. And McDonald\'s going vegetarian for Navaratri isn\'t fusion for culture\'s sake; it\'s a market strategy that keeps the global brand in charge.',
    },
    teaching: [
        { title: 'Globalisation: Definition, Dimensions and the Interconnected World', text: 'Globalisation refers to the growing interdependence between different people, regions, and countries worldwide as social and economic relationships stretch across the globe, driven primarily.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect one ordinary day into globalisation\'s economic, political and cultural threads — then trace why it lifts a Noida BPO worker while ending a Varanasi weaver\'s orders.',
        labels: ['Globalisation: Definition, Dimensions', 'The History of Globalisation', 'Liberalisation, Privatisation and Globalisation', 'The Role of Multinational', 'The Role of International', 'Globalisation and the Indian'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_001', title: 'Globalisation: Definition, Dimensions and the Interconnected World',
          caseStudy: { intro: 'Imagine you are a Class 12 student in a small town in Uttar Pradesh.',
            decisions: [{ prompt: 'Define globalisation as per the NCERT Class 12 textbook. Your answer must include the three key phrases: "growing interdependence", "social.', options: [
                { text: 'Correct answer: "Globalisation refers to the growing interdependence between different', outcome: 'Correct answer: "Globalisation refers to the growing interdependence between different people.' },
                { text: 'A wrong answer that only mentions', outcome: 'Not quite — **Misconception:** "Globalisation = Westernisation / Americanisation / only economic.', reveals: 'misconception-globalisation-westernisation-ameri' },
                { text: 'increase in international trade', outcome: 'Not quite — **Misconception:** "Globalisation = Westernisation / Americanisation / only economic.', reveals: 'misconception-globalisation-westernisation-ameri' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_003', title: 'Liberalisation, Privatisation and Globalisation: The LPG Reforms of 1991',
          caseStudy: { intro: 'Begin with a real-world anchor: "Why does your neighbourhood kirana store now stock imported apples from Washington and kiwis from New Zealand alongside local.',
            decisions: [{ prompt: 'What were the three specific policy components of the LPG reforms launched in India in July 1991, and what is one concrete policy measure.', options: [
                { text: 'Correct answer: (1) Liberalisation', outcome: 'Correct answer: (1) Liberalisation — abolition of industrial licensing for most sectors (except 18.' },
                { text: 'selling PSUs is liberalisation', outcome: 'Not quite — Students often equate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms or.', reveals: 'students-often-equate-liberalisation' },
                { text: 'conflates liberalisation and privatisation (e', outcome: 'Not quite — Students often equate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms or.', reveals: 'students-often-equate-liberalisation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_004', title: 'The Role of Multinational Corporations (MNCs) in the Globalised Economy',
          caseStudy: { intro: 'Imagine you are holding a smartphone: its chip is designed in the USA, screen made in South Korea, assembled in China or India, and sold globally.',
            decisions: [{ prompt: 'Define a Transnational Corporation (TNC) and give two examples from the NCERT text.', options: [
                { text: 'A TNC is a company that produces goods or markets services in more than one country, with', outcome: 'A TNC is a company that produces goods or markets services in more than one country, with a global.' },
                { text: 'any big Indian company', outcome: 'Not quite — Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions.', reveals: 'students-often-equate-mncs-with' },
                { text: 'a company that only exports', outcome: 'Not quite — Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions.', reveals: 'students-often-equate-mncs-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_005', title: 'The Role of International Institutions: WTO, IMF and the World Bank',
          caseStudy: { intro: 'Imagine you are a farmer in Punjab who hears that the government might reduce fertilizer subsidies because of an "IMF condition," while a software engineer.',
            decisions: [{ prompt: 'What is the primary function of the WTO\'s Dispute Settlement Body (DSB), and how does it differ from the IMF\'s conditionality mechanism?', options: [
                { text: 'The WTO\'s DSB adjudicates trade disputes between member states based on agreed rules', outcome: 'The WTO\'s DSB adjudicates trade disputes between member states based on agreed rules (e.g.' },
                { text: 'both impose conditions', outcome: 'Not quite — Students often treat WTO, IMF, and World Bank as a single entity called "global institutions" that.', reveals: 'students-often-treat-wto' },
                { text: 'global governance', outcome: 'Not quite — Students often treat WTO, IMF, and World Bank as a single entity called "global institutions" that.', reveals: 'students-often-treat-wto' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An essay claims \'globalisation is just the latest word for something eternal — Silk Road, empire, internet, all the same process.\'',
            decisions: [{ prompt: 'What does the phased history of globalisation say to that?', options: [
                { text: 'The phases differ in kind, not just degree — pre-colonial trade was voluntary exchange, colonial integration was coerced subordination built for extraction, post-war was state-gated import-substitution, and post-1991 is ICT-speed financial interconnection; calling them one process flattens who connected, on whose terms.', outcome: 'The chapter\'s timeline: each phase built different structures — the same word covers connection by caravan, conquest, container and fibre, and those are not the same phenomenon.' },
                { text: 'The essay is right — connection is connection, whatever the century.', outcome: 'Connection erases the coercion — colonial integration moved indentured labour and raw material under force for another economy\'s profit; equating that with Silk Road exchange confuses linkage with subordination.', reveals: 'all-connection-is-equal' },
                { text: 'The real break is only the internet — everything before 1991 was one phase.', outcome: 'That merges the colonial and post-war phases, which ran opposite designs — one forced open India\'s markets for extraction, the other gated them for self-development; ICT speed isn\'t the only axis that changed.', reveals: 'only-the-internet-mattered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hold both truths at once — new opportunity and lost livelihood — which is exactly what \'uneven impact\' means.',
            decisions: [{ prompt: 'What comes next? Globalisation and Social Change · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Globalisation and Social Change · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_001', difficulty: 'standard',
          question: 'Globalisation refers to the growing interdependence between different people.',
          hint: 'If stuck, re-do the "personal trouble ↔ public issue" exercise from c11_soc_cbse_01_002.',
          misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students.',
          parts: [
                { id: 'a', prompt: 'Read this scenario: *"Ramesh, a silk weaver in Varanasi, loses orders because Chinese power-loom silk floods the market.', answer: 'Correct answer: Ramesh',
                  options: ['Correct answer: Ramesh', 'economic', 'Globalisation means McDonald\'s and Hollywood taking over Indian culture'],
                  hint: 'If stuck, re-do the "personal trouble ↔ public issue" exercise from c11_soc_cbse_01_002 using.',
                  misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students make this error:**.' }
          ],
            remediations: { 'misconception-globalisation-westernisation-ameri': { steps: ['** Revisit **c11_soc_cbse_01_002 (Sociological Imagination)** — practice the "personal trouble ↔ public issue" mapping.', '** Re-read **c11_soc_cbse_07_003 (Five Sources of Social Change)** — identify which sources (technological, economic.', '** Do **Activity 6.1** from textbook: Track "globalisation" mentions in a newspaper for 3 days.', '** Re-diagnostic: Answer Diagnostic Question 2 again. If still incomplete, schedule 1:1 concept-mapping session with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: *"Globalisation benefits everyone — it brings cheaper goods, new jobs, and modern culture to India."* Use the NCERT concept of **uneven.', answer: 'Correct answer: The claim is false',
                  options: ['Correct answer: The claim is false', 'Globalisation means McDonald\'s and Hollywood taking over Indian culture'],
                  hint: 'If stuck, re-do the "personal trouble ↔ public issue" exercise from c11_soc_cbse_01_002 using.',
                  misconception: '**Misconception:** "Globalisation = Westernisation / Americanisation / only economic liberalisation." **Why students make this error:**.' }
          ],
            remediations: { 'misconception-globalisation-westernisation-ameri': { steps: ['** Revisit **c11_soc_cbse_01_002 (Sociological Imagination)** — practice the "personal trouble ↔ public issue" mapping.', '** Re-read **c11_soc_cbse_07_003 (Five Sources of Social Change)** — identify which sources (technological, economic.', '** Do **Activity 6.1** from textbook: Track "globalisation" mentions in a newspaper for 3 days.', '** Re-diagnostic: Answer Diagnostic Question 2 again. If still incomplete, schedule 1:1 concept-mapping session with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_002', difficulty: 'standard',
          question: 'The history of globalisation refers to the long-term, phased evolution.',
          hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c8_hist_ch3_8 (Impact.',
          misconception: 'Students often treat "globalisation" as a *single, uniform process* that began in 1991, ignoring the deep historical.',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT textbook uses the *kupamanduka* (well-frog) parable when discussing India\'s historical global outlook.', answer: 'The parable warns against isolationism',
                  options: ['The parable warns against isolationism', 'it shows Indians were frogs', 'it criticises traditional culture'],
                  hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c8_hist_ch3_8 (Impact of British Rule.',
                  misconception: 'Students often treat "globalisation" as a *single, uniform process* that began in 1991, ignoring the deep historical layers.' }
          ],
            remediations: { 'students-often-treat-globalisation-as': { steps: ['If a student cannot distinguish the four phases, do this 3-step remediation: (1) Re-read NCERT Box 6.1 (kupamanduka).', '(2) Watch the 10-min video "History of Globalisation in 4 Phases" (search YouTube for CBSE Class 12 Sociology Chapter.', '(3) Re-attempt Diagnostic Questions 1 and 4 verbally — if they can articulate the *coercive* vs *voluntary* and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_003', difficulty: 'standard',
          question: 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer.',
          hint: 'If stuck, revisit Class 11 Node c11_soc_cbse_07_001 (Social Change definition) and.',
          misconception: 'Students often equate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms or a single undifferentiated.',
          parts: [
                { id: 'a', prompt: 'What were the three specific policy components of the LPG reforms launched in India in July 1991, and what is one concrete policy measure for each?', answer: 'Correct answer: (1) Liberalisation',
                  options: ['Correct answer: (1) Liberalisation', 'selling PSUs is liberalisation', 'conflates liberalisation and privatisation (e'],
                  hint: 'If stuck, revisit Class 11 Node c11_soc_cbse_07_001 (Social Change definition) and.',
                  misconception: 'Students often equate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms or a single undifferentiated process called \'LPG\'.' }
          ],
            remediations: { 'students-often-equate-liberalisation': { steps: ['If the student conflates the three terms: Step 1 — Make a three-column table: Column 1 = "What the state STOPS doing".', 'Fill for each: Liberalisation (stops: issuing industrial licenses, controlling prices; starts: allowing market entry.', 'Privatisation (stops: running hotels, telecom, airlines; starts: selling equity, strategic disinvestment; example: VSNL.', 'Globalisation (stops: restricting foreign capital/goods; starts: signing WTO agreements, allowing FDI; example: FDI.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_004', difficulty: 'standard',
          question: 'Multinational Corporations (MNCs) or Transnational Corporations (TNCs) are.',
          hint: 'Revisit c12_soc_cbse_13_001 (globalisation dimensions) and c12_soc_cbse_13_003 (LPG.',
          misconception: 'Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions (WTO/IMF)*, treating.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of MNC-driven globalisation on two groups: (a) urban middle-class youth in India and (b) traditional weavers in Sircilla/Dubakka (Andhra.', answer: 'urban middle-class youth in India and (',
                  options: ['urban middle-class youth in India and (', 'globalisation benefits everyone', 'only harms the poor'],
                  hint: 'Revisit c12_soc_cbse_13_001 (globalisation dimensions) and c12_soc_cbse_13_003 (LPG reforms).',
                  misconception: 'Students often equate MNCs with *foreign direct investment (FDI)* or *international institutions (WTO/IMF)*, treating them as synonyms for.' }
          ],
            remediations: { 'students-often-equate-mncs-with': { steps: ['If the student conflates MNCs with international institutions or FDI policies: (1) Have them re-read the NCERT.', 'institutions) and *actions* (production/investment vs.', '(2) Ask them to classify these entities: Coca Cola, WTO, IMF, Tata Motors, Infosys, World Bank — into "MNC/TNC".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_005', difficulty: 'standard',
          question: 'International institutions like the World Trade Organization (WTO).',
          hint: 'If stuck, revisit c12_soc_cbse_13_003 (LPG reforms) to recall the 1991 crisis sequence.',
          misconception: 'Students often treat WTO, IMF, and World Bank as a single entity called "global institutions" that uniformly impose.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'International institutions like the World Trade Organization (WTO), International',
                  options: ['International institutions like the World Trade Organization (WTO), International', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'If stuck, revisit c12_soc_cbse_13_003 (LPG reforms) to recall the 1991 crisis sequence, and.',
                  misconception: 'Students often treat WTO, IMF, and World Bank as a single entity called "global institutions" that uniformly impose "neoliberal policies".' }
          ],
            remediations: { 'students-often-treat-wto': { steps: ['If the student conflates the institutions, do this 3-step remediation: (1) Create a three-column table: Column.', 'Fill it using NCERT Chapter 6 (Box 6.4, 6.5) and Class 10 History node c10_hist_cbse_03_005 (Bretton Woods).', '(2) Take the 1991 India case: Identify which institution did what — IMF gave standby loan with conditionality (fiscal.', '(3) Re-diagnose: Ask the student to explain why a WTO dispute on solar panels (India — Certain Measures Relating.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_006', difficulty: 'standard',
          question: 'Globalisation and the Indian Economy: FDI, Outsourcing and the IT Boom refers.',
          hint: 'If stuck on FDI vs FII distinction: revisit Class 12 Economics (Macroeconomics) Chapter 6.',
          misconception: 'Students equate \'FDI\' *only* with \'foreign companies setting up factories in India\' (manufacturing FDI), ignoring that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Globalisation and the Indian Economy: FDI, Outsourcing and the IT Boom refers to the',
                  options: ['Globalisation and the Indian Economy: FDI, Outsourcing and the IT Boom refers to the', 'Globalisation refers to the growing interdependence between different people, regions,', 'The history of globalisation refers to the long-term, phased evolution of worldwide', 'The LPG (Liberalisation, Privatisation, Globalisation) Reforms of 1991 refer to the'],
                  hint: 'If stuck on FDI vs FII distinction: revisit Class 12 Economics (Macroeconomics) Chapter 6 \'Open.',
                  misconception: 'Students equate \'FDI\' *only* with \'foreign companies setting up factories in India\' (manufacturing FDI), ignoring that post-1991 India\'s.' }
          ],
            remediations: { 'students-equate-fdi-only-with': { steps: ['Re-read NCERT Box 6.4 (Nike) and Box 6.5 (ILO jobless growth) — identify *three* differences between Nike\'s.', 'Pull RBI\'s \'Sectoral Deployment of FDI\' data (last 5 years) — calculate % share of \'Computer Software & Hardware\'.', 'Write a 100-word note: \'Why India\'s FDI-led growth did not create a manufacturing working class.\'', 'Re-attempt Diagnostic Q3 — if you still list only \'cheap labour\', revisit Class 11 node c11_soc_cbse_03_007 (Work and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
