import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch04_p1: SimDef = {
    id: 'v3_c12_ps_ch04_p1',
    title: 'Alternative Centres of Power · Part 1/2',
    subtitle: 'The trade deal designed to make war impossible',
    classLevel: 12, subject: 'political_science', topic: 'Alternative Centres of Power · Part 1/2',
    chapters: ['c12_ps_ch04'],
    nodeIds: ['c12_ps_cbse_04_001', 'c12_ps_cbse_04_002', 'c12_ps_cbse_04_003', 'c12_ps_cbse_04_004', 'c12_ps_cbse_04_005', 'c12_ps_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'European institutions analyst', intro: 'Twenty-seven countries now make binding laws together — because in 1950 someone decided to make war materially impossible instead of just forbidden.', goal: 'Sequence the EU\'s treaty-by-treaty evolution and distinguish supranational community method from intergovernmental pillars.' },
    discovery: {
        question: 'In 1950, France offered to hand control of its coal and steel — the very materials armies run on — to a shared authority with Germany, its enemy of three wars. Why would a victor volunteer to disarm itself?',
        options: ['Pooling war-critical resources made war \'materially impossible\' — neither side could re-arm secretly', 'France was too weak to refuse American pressure', 'It was purely a trade deal with no security motive', 'Germany demanded it as a condition of occupation ending'],
        answer: 'Pooling war-critical resources made war \'materially impossible\' — neither side could re-arm secretly',
        hook: 'Students assume the EU began with the Maastricht Treaty in 1992 — actually it was built stepwise from the 1951 coal-steel pool through the 1957 common market to a union that kept economics supranational but foreign policy intergovernmental.',
    },
    teaching: [
        { title: 'The European Union: Evolution from ECSC to Maastricht Treaty', text: 'The European Union (EU) is a supranational political and economic union of European states that evolved through a series of binding treaties, beginning with the European Coal and Steel Community.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace each treaty from coal and steel to Maastricht, and decide at every step which slice of sovereignty states pooled — and why they refused to pool foreign policy the same way.',
        labels: ['The European Union: Evolution', 'European Union as', 'ASEAN: Origins, Objectives', 'Rise of China as', 'China\'s Open Door Policy,', 'China\'s Role in International'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_001', title: 'The European Union: Evolution from ECSC to Maastricht Treaty',
          caseStudy: { intro: 'Imagine you see a news headline: "EU agrees on new climate law after marathon talks." You wonder: how did 27 sovereign countries get to a point where they make.',
            decisions: [{ prompt: 'What was the primary objective of the European Coal and Steel Community (ECSC) established by the Treaty of Paris in 1951?', options: [
                { text: 'The ECSC aimed to place French and German coal and steel production under a common High', outcome: 'The ECSC aimed to place French and German coal and steel production under a common High Authority.' },
                { text: 'not merely unthinkable, but materially impossible', outcome: 'Not quite — Students often think the EU began in 1992 with the Maastricht Treaty, or that the ECSC/EEC/EU are.', reveals: 'the-eu-began-in-1992' },
                { text: 'to create a common market for all goods', outcome: 'Not quite — Students often think the EU began in 1992 with the Maastricht Treaty, or that the ECSC/EEC/EU are.', reveals: 'the-eu-began-in-1992' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_002', title: 'European Union as an Economic and Political Power',
          caseStudy: { intro: 'Imagine you are reading a news headline: “EU imposes new carbon border tax on steel imports from India.” Ask: *Why can the EU unilaterally set a rule that.',
            decisions: [{ prompt: 'What is the name of the EU’s common currency, and how many member states currently use it?', options: [
                { text: 'The common currency is the euro, used by 20 of the 27 EU member states (the “eurozone”)', outcome: 'The common currency is the euro, used by 20 of the 27 EU member states (the “eurozone”).' },
                { text: 'all 27 use the euro', outcome: 'Not quite — Students often think the EU has a single “President” who runs the union like a national head.', reveals: 'the-eu-has-a-single' },
                { text: 'the currency is the pound', outcome: 'Not quite — Students often think the EU has a single “President” who runs the union like a national head.', reveals: 'the-eu-has-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_003', title: 'ASEAN: Origins, Objectives and Regional Integration in Southeast Asia',
          caseStudy: { intro: 'Begin with a real-world scenario: "Imagine you are an Indian diplomat preparing a briefing for the ASEAN-India Summit.',
            decisions: [{ prompt: 'What is the foundational document that established ASEAN and in which year was it signed?', options: [
                { text: 'The Bangkok Declaration, signed on 8 August 1967, established ASEAN', outcome: 'The Bangkok Declaration, signed on 8 August 1967, established ASEAN.' },
                { text: 'Treaty of Amity and Cooperation 1976', outcome: 'Not quite — Students often conflate ASEAN with the EU, assuming ASEAN has a supranational commission.', reveals: 'students-often-conflate-asean-with' },
                { text: 'ASEAN Charter 2008', outcome: 'Not quite — Students often conflate ASEAN with the EU, assuming ASEAN has a supranational commission.', reveals: 'students-often-conflate-asean-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_004', title: 'Rise of China as an Economic Power after 1978 Reforms',
          caseStudy: { intro: 'Imagine a Class 12 student reading a news headline: "China\'s GDP surpasses Japan\'s to become world\'s second-largest economy." Ask: "How did a country poorer.',
            decisions: [{ prompt: 'What was the "Household Responsibility System" introduced in Chinese agriculture after 1978, and how did it differ from the earlier commune.', options: [
                { text: 'The Household Responsibility System allowed peasant families to contract land from', outcome: 'The Household Responsibility System allowed peasant families to contract land from collectives.' },
                { text: 'it privatised land ownership', outcome: 'Not quite — Students often think "China abandoned communism in 1978 and became capitalist." In reality, the CCP.', reveals: 'china-abandoned-communism-in-1978' },
                { text: 'China abandoned communism in 1978 and became capitalist', outcome: 'Not quite — Students often think "China abandoned communism in 1978 and became capitalist." In reality, the CCP.', reveals: 'china-abandoned-communism-in-1978' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_005', title: 'China\'s Open Door Policy, SEZs and Market Socialism',
          caseStudy: { intro: 'Imagine a Class 12 student reading a news headline: "China\'s GDP grows 5.2% — but youth unemployment hits 21%." They wonder: how did a communist country become.',
            decisions: [{ prompt: 'What were the four original Special Economic Zones (SEZs) established in 1980, and what specific policy privilege distinguished them from.', options: [
                { text: 'The four original SEZs were Shenzhen, Zhuhai, Shantou (Guangdong), and Xiamen (Fujian)', outcome: 'The four original SEZs were Shenzhen, Zhuhai, Shantou (Guangdong), and Xiamen (Fujian).' },
                { text: 'Open Coastal Cities', outcome: 'Not quite — Students think "Market Socialism" means China became a *mixed economy* like India (private + public.', reveals: 'market-socialism-means-china-became' },
                { text: 'Market Socialism', outcome: 'Not quite — Students think "Market Socialism" means China became a *mixed economy* like India (private + public.', reveals: 'market-socialism-means-china-became' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_006', title: 'China\'s Role in International Relations and India-China Relations',
          caseStudy: { intro: 'Begin with a news headline: "Indian and Chinese troops disengage at Patrolling Point 15 in Gogra-Hot Springs after 16th round of Corps Commander talks." Ask.',
            decisions: [{ prompt: 'Which of the following agreements established the principle of \'mutual and equal security\' for India-China border management?', options: [
                { text: 'Correct: b) 1996 Agreement on Confidence-Building Measures', outcome: 'Correct: b) 1996 Agreement on Confidence-Building Measures. This agreement explicitly states.' },
                { text: 'India-China trade dependence prevents conflict', outcome: 'Not quite — Students often believe "India-China trade dependence prevents conflict" — citing $135B trade (2022).', reveals: 'india-china-trade-dependence-prevents' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An export intern asks who decides the tariff her firm\'s textiles face in the EU and who could negotiate it down — \'probably the European Parliament, since it\'s elected.\'',
            decisions: [{ prompt: 'How does EU competence actually map?', options: [
                { text: 'The Council sets the common external tariff on a Commission proposal, and the Commission negotiates the trade deal — Parliament only approves or rejects the final text; pooled sovereignty put economics under qualified-majority supranational rule while foreign policy still needs all members\' yes.', outcome: 'The chapter\'s institutional map: the EU acts like a state in trade and a club in war — knowing which competence governs your issue is the whole skill.' },
                { text: 'She\'s right — the directly elected Parliament legislates tariffs like a national parliament does.', outcome: 'Election doesn\'t equal competence — the Parliament\'s trade role is a veto on finished deals; proposing and negotiating sit with the Commission, and the tariff itself is the Council\'s call.', reveals: 'elected-equals-empowered' },
                { text: 'Each member state sets its own tariff — Germany and France can differ.', outcome: 'The single market exists precisely because members pooled commercial policy — a common external tariff is what makes the bloc negotiate with one weight; national tariffs would dissolve it.', reveals: 'states-keep-tariffs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why Europe integrated economics by majority vote but kept war-and-peace decisions unanimous — and why that makes the EU a union of states, not a federal superstate.',
            decisions: [{ prompt: 'What comes next? Alternative Centres of Power · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Alternative Centres of Power · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_001', difficulty: 'standard',
          question: 'The European Union (EU) is a supranational political and economic union.',
          hint: 'If stuck on "why start with coal and steel?", revisit the Schuman Declaration (1950) and.',
          misconception: 'Students often think the EU began in 1992 with the Maastricht Treaty, or that the ECSC/EEC/EU are just name changes for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The European Union (EU) is a supranational political and economic union of European',
                  options: ['The European Union (EU) is a supranational political and economic union of European', 'The European Union (EU) is a supranational political and economic union of 27 European', 'ASEAN (Association of Southeast Asian Nations) is a regional intergovernmental', 'The "Rise of China as an Economic Power after 1978 Reforms" refers to the transformative'],
                  hint: 'If stuck on "why start with coal and steel?", revisit the Schuman Declaration (1950) and the.',
                  misconception: 'Students often think the EU began in 1992 with the Maastricht Treaty, or that the ECSC/EEC/EU are just name changes for the same entity.' }
          ],
            remediations: { 'the-eu-began-in-1992': { steps: ['Re-read the Schuman Declaration (1950) and Treaty of Paris (1951) — identify the exact phrase "materially impossible.".', 'Make a 3-column table: Treaty | Year | Method (Community/Intergovernmental) | Key Innovation.', 'Watch the 5-min EU history video on the official EU website (europa.eu) focusing on 1951–1992.', 'Re-attempt Diagnostic Q3 and Q4 — they test the Community/intergovernmental distinction directly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_002', difficulty: 'standard',
          question: 'The European Union (EU) is a supranational political and economic union of 27.',
          hint: 'If confused about “supranational vs intergovernmental”, revisit c11_ps_cbse_16_001.',
          misconception: 'Students often think the EU has a single “President” who runs the union like a national head of state.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The European Union (EU) is a supranational political and economic union of 27 European',
                  options: ['The European Union (EU) is a supranational political and economic union of 27 European', 'The European Union (EU) is a supranational political and economic union of European', 'ASEAN (Association of Southeast Asian Nations) is a regional intergovernmental', 'The "Rise of China as an Economic Power after 1978 Reforms" refers to the transformative'],
                  hint: 'If confused about “supranational vs intergovernmental”, revisit c11_ps_cbse_16_001 (federalism.',
                  misconception: 'Students often think the EU has a single “President” who runs the union like a national head of state.' }
          ],
            remediations: { 'the-eu-has-a-single': { steps: ['Re‑read the “Institutions of the EU” table in NCERT Class 12 (Chapter 4) and create a three‑column chart: Institution |.', 'Watch a 5‑minute video (e.g., EU’s official “How the EU works”) focusing on the three presidents.', 'Take a blank diagram of the EU legislative triangle (Commission → Council & Parliament) and label each arrow with the.', 'Re‑attempt Diagnostic Questions 2 and 4; if still wrong, revisit c12_ps_cbse_04_001 for the historical reason why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the EU has a single “President” who runs the union like a national head of state.',
          parts: [
                { id: 'a', prompt: 'Assess the claim: “The EU is a global economic giant but a political dwarf.” Use two pieces of evidence from the last decade to support or refute it.', answer: 'The claim is partially valid but outdated',
                  options: ['The claim is partially valid but outdated', 'President', 'only cites economic data or only cites failures (e', 'the EU has a single “President” who runs the union like a national head of state'],
                  hint: 'If confused about “supranational vs intergovernmental”, revisit c11_ps_cbse_16_001 (federalism.',
                  misconception: 'Students often think the EU has a single “President” who runs the union like a national head of state.' }
          ],
            remediations: { 'the-eu-has-a-single': { steps: ['Re‑read the “Institutions of the EU” table in NCERT Class 12 (Chapter 4) and create a three‑column chart: Institution |.', 'Watch a 5‑minute video (e.g., EU’s official “How the EU works”) focusing on the three presidents.', 'Take a blank diagram of the EU legislative triangle (Commission → Council & Parliament) and label each arrow with the.', 'Re‑attempt Diagnostic Questions 2 and 4; if still wrong, revisit c12_ps_cbse_04_001 for the historical reason why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_003', difficulty: 'standard',
          question: 'ASEAN (Association of Southeast Asian Nations) is a regional intergovernmental.',
          hint: 'Revisit c12_ps_cbse_04_001 (EU evolution) to relearn supranational vs intergovernmental.',
          misconception: 'Students often conflate ASEAN with the EU, assuming ASEAN has a supranational commission, parliament, and court with.',
          parts: [
                { id: 'a', prompt: 'What is the foundational document that established ASEAN and in which year was it signed?', answer: 'The Bangkok Declaration, signed on 8 August 1967, established ASEAN',
                  options: ['The Bangkok Declaration, signed on 8 August 1967, established ASEAN', 'Treaty of Amity and Cooperation 1976', 'ASEAN Charter 2008'],
                  hint: 'Revisit c12_ps_cbse_04_001 (EU evolution) to relearn supranational vs intergovernmental.',
                  misconception: 'Students often conflate ASEAN with the EU, assuming ASEAN has a supranational commission, parliament, and court with binding authority.' },
                { id: 'b', prompt: 'Apply the ASEAN Way to analyze why ASEAN has been unable to issue a strong collective statement on the Myanmar coup (2021) despite its Political-Security.', answer: 'Consensus decision-making requires all 10 members to agree',
                  options: ['Consensus decision-making requires all 10 members to agree', 'ASEAN\'s weakness'],
                  hint: 'Revisit c12_ps_cbse_04_001 (EU evolution) to relearn supranational vs intergovernmental.',
                  misconception: 'Students often conflate ASEAN with the EU, assuming ASEAN has a supranational commission, parliament, and court with binding authority.' }
          ],
            remediations: { 'students-often-conflate-asean-with': { steps: ['If a student exhibits the EU-ASEAN conflation, assign this 3-step remediation: (1) Re-read the "ASEAN Way" section.', '(2) Watch the 10-minute MEA video "ASEAN-India Partnership: A Journey of 30 Years" and note every instance where.', '(3) Re-attempt Diagnostic Question 4 with a structured comparison table.', 'If errors persist, revisit c12_ps_cbse_04_001 (EU evolution) to re-ground the EU model before re-comparing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_004', difficulty: 'standard',
          question: 'The "Rise of China as an Economic Power after 1978 Reforms" refers to the.',
          hint: 'Revisit Class 11 Political Theory node c11_ps_cbse_04_008 (Amartya Sen\'s capabilities.',
          misconception: 'Students often think "China abandoned communism in 1978 and became capitalist." In reality, the CCP retained monopoly.',
          parts: [
                { id: 'a', prompt: 'A student argues: "China\'s post-1978 growth proves that authoritarianism is better for development than democracy." Using the concept of "state capacity" and.', answer: 'The claim oversimplifies',
                  options: ['The claim oversimplifies', 'China abandoned communism in 1978 and became capitalist', 'primary stage of socialism', '"China abandoned communism in 1978 and became capitalist'],
                  hint: 'Revisit Class 11 Political Theory node c11_ps_cbse_04_008 (Amartya Sen\'s capabilities approach).',
                  misconception: 'Students often think "China abandoned communism in 1978 and became capitalist." In reality, the CCP retained monopoly political power.' }
          ],
            remediations: { 'china-abandoned-communism-in-1978': { steps: ['If the student conflates reform with regime change, have them: (1) Read the 1982 Chinese Constitution\'s Preamble.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_005', difficulty: 'standard',
          question: 'China\'s Open Door Policy (1978) refers to Deng Xiaoping\'s strategic decision.',
          hint: 'Revisit c11_ps_cbse_03_006 (reservations debate) — the "quota vs.',
          misconception: 'Students think "Market Socialism" means China became a *mixed economy* like India (private + public sectors coexisting.',
          parts: [
                { id: 'a', prompt: 'A foreign firm wants to set up an electronics assembly plant in 1985 China.', answer: 'Shenzhen SEZ, (',
                  options: ['Shenzhen SEZ, (', 'Market Socialism'],
                  hint: 'Revisit c11_ps_cbse_03_006 (reservations debate) — the "quota vs.',
                  misconception: 'Students think "Market Socialism" means China became a *mixed economy* like India (private + public sectors coexisting equally).' }
          ],
            remediations: { 'market-socialism-means-china-became': { steps: ['Re-read c12_ps_cbse_04_004 (Rise of China post-1978) focusing on the *agricultural* reform (HRS) timeline — 1978-84.', 'Draw a table: Column A = Soviet 1991 shock therapy (price liberalization, mass privatization, hard budget constraints).', 'For each row, ask "Who owns the asset? Who bears the loss?"', 'Re-attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_4. If still stuck, review c11_ps_cbse_03_006 (Affirmative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_006', difficulty: 'standard',
          question: 'China\'s role in international relations refers to its emergence as a major.',
          hint: 'Revisit c12_ps_cbse_04_004 (China\'s GDP growth, export model, WTO entry) and.',
          misconception: 'Students often believe "India-China trade dependence prevents conflict" — citing $135B trade (2022) as a stabilizer.',
          parts: [
                { id: 'a', prompt: 'Which of the following agreements established the principle of \'mutual and equal security\' for India-China border management?', answer: 'Correct: b) 1996 Agreement on Confidence-Building Measures',
                  options: ['Correct: b) 1996 Agreement on Confidence-Building Measures', 'India-China trade dependence prevents conflict'],
                  hint: 'Revisit c12_ps_cbse_04_004 (China\'s GDP growth, export model, WTO entry) and c12_ps_cbse_04_005.',
                  misconception: 'Students often believe "India-China trade dependence prevents conflict" — citing $135B trade (2022) as a stabilizer.' },
                { id: 'b', prompt: 'Why did India refuse to join China\'s Belt and Road Initiative (BRI) despite being a founding member of the AIIB?', answer: 'Correct: b) CPEC passes through Gilgit-Baltistan',
                  options: ['Correct: b) CPEC passes through Gilgit-Baltistan', 'India-China trade dependence prevents conflict'],
                  hint: 'Revisit c12_ps_cbse_04_004 (China\'s GDP growth, export model, WTO entry) and c12_ps_cbse_04_005.',
                  misconception: 'Students often believe "India-China trade dependence prevents conflict" — citing $135B trade (2022) as a stabilizer.' }
          ],
            remediations: { 'india-china-trade-dependence-prevents': { steps: ['If student holds the trade-prevents-conflict view: Step 1 — Re-read c12_ps_cbse_04_005 (China\'s market socialism).', 'Step 2 — Compare 2017 Doklam timeline: trade grew 20% YoY while border crisis escalated.', 'Step 3 — Attempt Diagnostic Question 5 again, this time using the \'asymmetric interdependence\' framework.', 'Step 4 — Write a 100-word answer: "Why did $135B trade not deter Galwan?" using terms: leverage, coercion, strategic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
