import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch10_p2: SimDef = {
    id: 'v3_c12_ps_ch10_p2',
    title: 'Politics of Planned Development · Part 2/2',
    subtitle: 'The powerful institution the Constitution never mentions',
    classLevel: 12, subject: 'political_science', topic: 'Politics of Planned Development · Part 2/2',
    chapters: ['c12_ps_ch10'],
    nodeIds: ['c12_ps_cbse_10_007', 'c12_ps_cbse_10_008', 'c12_ps_cbse_10_009', 'c12_ps_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Development policy analyst', intro: 'Industrialists asking for a planned economy — in 1950s India, even capital agreed the market alone couldn\'t build a nation.', goal: 'Explain the Planning Commission\'s mandate, constitutional status and the Directive Principles logic behind India\'s planned development.' },
    discovery: {
        question: 'In 1944, eight of India\'s biggest industrialists signed a plan demanding the government run heavy industry — capitalists begging for state control. What were they thinking?',
        options: ['They lacked the capital and technology for heavy industry themselves, so they wanted the state to bear the risk — planning was a cross-ideological consensus, not a leftist imposition', 'The British forced them to endorse planning', 'They were secret socialists', 'It was a publicity stunt with no real intent'],
        answer: 'They lacked the capital and technology for heavy industry themselves, so they wanted the state to bear the risk — planning was a cross-ideological consensus, not a leftist imposition',
        hook: 'The Planning Commission appears nowhere in the Constitution — it was created by an executive resolution and was only \'advisory\', yet its control over plan funds made it arguably the most powerful extra-constitutional body in India for six decades.',
    },
    teaching: [
        { title: 'Land Reforms: Objectives, Implementation and Limitations', text: 'Land reforms in India refer to the comprehensive set of legislative and policy measures undertaken by state governments (guided by central planning priorities) from the 1950s onward to restructure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct why a poor, newly free country chose five-year plans — and how a merely advisory body ended up steering where the money went.',
        labels: ['Land Reforms: Objectives, Implementation', 'Debates on Planning', 'Rise of the Public', 'White Revolution (Operation Flood)'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_007', title: 'Land Reforms: Objectives, Implementation and Limitations',
          caseStudy: { intro: 'Imagine reading a news report about a farmer protest in 2024 demanding "land to the tiller" — a slogan echoing from the 1950s.',
            decisions: [{ prompt: 'What were the three main legislative components of land reforms initiated during the First Five Year Plan period?', options: [
                { text: 'The three main components were: (1) **Abolition of intermediaries** (zamindars,', outcome: 'The three main components were: (1) **Abolition of intermediaries** (zamindars, jagirdars.' },
                { text: 'redistribution of land', outcome: 'Not quite — Students often believe **land reforms were a single, uniform Central law applied equally across.', reveals: 'land-reforms-were-a-single' },
                { text: 'giving land to the poor', outcome: 'Not quite — Students often believe **land reforms were a single, uniform Central law applied equally across.', reveals: 'land-reforms-were-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_008', title: 'Debates on Planning: The Bombay Plan and Critics of Planning',
          caseStudy: { intro: 'Imagine you read a news report about a new steel plant in Odisha: tribal villagers protest displacement, environmentalists warn of pollution, the state.',
            decisions: [{ prompt: '**REMEMBER**: Who drafted the Bombay Plan (1944) and what was its central demand regarding the state’s role in the economy?', options: [
                { text: '**Answer**: A group of leading Indian industrialists (J.R.D', outcome: '**Answer**: A group of leading Indian industrialists (J.R.D. Tata, G.D.' },
                { text: 'the Planning Commission', outcome: 'Not quite — **Misconception**: “The Bombay Plan was a *government* plan, and all industrialists opposed.', reveals: 'misconception-the-bombay-plan-was' },
                { text: 'capitalists = anti-planning', outcome: 'Not quite — **Misconception**: “The Bombay Plan was a *government* plan, and all industrialists opposed.', reveals: 'misconception-the-bombay-plan-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_009', title: 'Rise of the Public Sector and the Commanding Heights Argument',
          caseStudy: { intro: 'Imagine you are reading a 2024 news report: "Government to sell stake in Steel Authority of India (SAIL) — a company set up in 1959 as a \'temple of modern.',
            decisions: [{ prompt: 'What does the phrase "commanding heights of the economy" specifically refer to in the context of India\'s Second Five Year Plan?', options: [
                { text: 'It refers to the strategic sectors', outcome: 'It refers to the strategic sectors — iron and steel, heavy machinery, machine tools, heavy.' },
                { text: 'all large industries', outcome: 'Not quite — Students often believe the "commanding heights" phrase comes from Lenin and was blindly copied.', reveals: 'the-commanding-heights-phrase-comes' },
                { text: 'only steel', outcome: 'Not quite — Students often believe the "commanding heights" phrase comes from Lenin and was blindly copied.', reveals: 'the-commanding-heights-phrase-comes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_010', title: 'White Revolution (Operation Flood) and Rural Development',
          caseStudy: { intro: 'Imagine you\'re a Class 12 student reading a news headline: "India becomes world\'s largest milk producer — but small farmers still struggle." You wonder: how.',
            decisions: [{ prompt: 'What was the core institutional innovation of Operation Flood that distinguished it from the Green Revolution\'s delivery model?', options: [
                { text: 'Operation Flood built a three-tier cooperative structure (village society → district', outcome: 'Operation Flood built a three-tier cooperative structure (village society → district union → state.' },
                { text: 'both used cooperatives', outcome: 'Not quite — Students often think Operation Flood was "just another government scheme like the Green Revolution".', reveals: 'operation-flood-was-just-another' },
                { text: 'both were state-run', outcome: 'Not quite — Students often think Operation Flood was "just another government scheme like the Green Revolution".', reveals: 'operation-flood-was-just-another' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A policy-club debate: \'Independent India should have led with heavy industry in 1951 — the First Plan wasted a decade on dams and land ceilings.\'',
            decisions: [{ prompt: 'What was the First Plan\'s actual reasoning?', options: [
                { text: 'Start where the constraint was — a Partition-hit, food-short agrarian economy needed irrigation (Bhakra Nangal replacing canal headworks lost to Pakistan) and land reform against unequal holdings, and K.N. Raj\'s \'hasten slowly\' kept the pace inside what democracy could survive.', outcome: 'The chapter\'s logic chain: identify the binding constraint (land, water, food), design the institutional fix, and pace it politically — industry-first skips the subsistence reality the plan was answering.' },
                { text: 'The debater is right — industry compounds faster, so agriculture-first was timidity.', outcome: 'Faster compounding needs fed people and functioning markets — with consumption already at subsistence and Partition\'s irrigation rupture, industrial lead would have meant coercion, which is precisely what \'hasten slowly\' refused.', reveals: 'industry-first-always' },
                { text: 'The real reason was just lack of capital — nothing ideological about it.', outcome: 'Capital was a symptom, not the diagnosis — the plan named unequal land distribution the principal obstacle and chose democracy-compatible pacing; \'no money\' can\'t explain why land reform, not inputs, came first.', reveals: 'only-capital-mattered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain the plan budget vs non-plan budget split, and why \'advisory\' on paper meant decisive in practice.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_007', difficulty: 'standard',
          question: 'Land reforms in India refer to the comprehensive set of legislative and policy.',
          hint: 'Revisit **c11_ps_cbse_16_006** (Union/State/Concurrent Lists — land in State List) and.',
          misconception: 'Students often believe **land reforms were a single, uniform Central law applied equally across India**.',
          parts: [
                { id: 'a', prompt: 'What were the three main legislative components of land reforms initiated during the First Five Year Plan period?', answer: 'The three main components were: (1) **Abolition of intermediaries** (zamindars,',
                  options: ['The three main components were: (1) **Abolition of intermediaries** (zamindars,', 'redistribution of land', 'giving land to the poor', 'land reforms'],
                  hint: 'Revisit **c11_ps_cbse_16_006** (Union/State/Concurrent Lists — land in State List) and.',
                  misconception: 'Students often believe **land reforms were a single, uniform Central law applied equally across India**.' },
                { id: 'b', prompt: 'Compare the implementation of land reforms in West Bengal (Operation Barga, 1978 onward) and Bihar (post-1950s zamindari abolition).', answer: 'The divergence stems from **political sociology of state power**, not legal text',
                  options: ['The divergence stems from **political sociology of state power**, not legal text', 'corruption', 'illiteracy', 'land reforms'],
                  hint: 'Revisit **c11_ps_cbse_16_006** (Union/State/Concurrent Lists — land in State List) and.',
                  misconception: 'Students often believe **land reforms were a single, uniform Central law applied equally across India**.' }
          ],
            remediations: { 'land-reforms-were-a-single': { steps: ['** Have them create a **comparison table** for *three states* (e.g., Kerala, West Bengal, Bihar) with columns: Year.', '** Ask: *"Why does Kerala show 60% surplus redistribution while Bihar shows <1%?"* Guide them to link: **Kerala**.', '** Revisit **c11_ps_cbse_16_006** (State List) and **c12_ps_cbse_10_002** (First Plan\'s reliance on state.', '** Re-diagnostic: *"Explain why the same Directive Principle (Art. 39) produced such different outcomes in two states."*'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **land reforms were a single, uniform Central law applied equally across India**.',
          parts: [
                { id: 'a', prompt: '"Land reforms in India failed because they were designed by the elite for the elite." Evaluate this statement with specific reference to the design of ceiling.', answer: 'The statement is **partially valid but analytically incomplete**',
                  options: ['The statement is **partially valid but analytically incomplete**', 'total failure', 'land reforms', 'land redistribution'],
                  hint: 'Revisit **c11_ps_cbse_16_006** (Union/State/Concurrent Lists — land in State List) and.',
                  misconception: 'Students often believe **land reforms were a single, uniform Central law applied equally across India**.' },
                { id: 'b', prompt: 'Draft a concise proposal (4–5 bullet points) for a "Second Generation Land Reform" addressing three specific gaps of the first generation: (a) gender-blind.', answer: 'A strong proposal would include: 1',
                  options: ['A strong proposal would include: 1', 'land reforms', 'land redistribution', '**land reforms were a single, uniform Central law applied equally across India**'],
                  hint: 'Revisit **c11_ps_cbse_16_006** (Union/State/Concurrent Lists — land in State List) and.',
                  misconception: 'Students often believe **land reforms were a single, uniform Central law applied equally across India**.' }
          ],
            remediations: { 'land-reforms-were-a-single': { steps: ['** Have them create a **comparison table** for *three states* (e.g., Kerala, West Bengal, Bihar) with columns: Year.', '** Ask: *"Why does Kerala show 60% surplus redistribution while Bihar shows <1%?"* Guide them to link: **Kerala**.', '** Revisit **c11_ps_cbse_16_006** (State List) and **c12_ps_cbse_10_002** (First Plan\'s reliance on state.', '** Re-diagnostic: *"Explain why the same Directive Principle (Art. 39) produced such different outcomes in two states."*'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_008', difficulty: 'standard',
          question: 'The Bombay Plan (1944) was a proposal by leading Indian industrialists.',
          hint: 'If stuck, revisit **Class 11 Political Science node c11_ps_cbse_11_011** (Relationship.',
          misconception: '**Misconception**: “The Bombay Plan was a *government* plan, and all industrialists opposed planning.” **Reality**: The.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: Who drafted the Bombay Plan (1944) and what was its central demand regarding the state’s role in the economy?', answer: '**Answer**: A group of leading Indian industrialists (J.R.D',
                  options: ['**Answer**: A group of leading Indian industrialists (J.R.D', 'the Planning Commission', 'capitalists = anti-planning', '“capitalists = anti-planning”'],
                  hint: 'If stuck, revisit **Class 11 Political Science node c11_ps_cbse_11_011** (Relationship between.',
                  misconception: '**Misconception**: “The Bombay Plan was a *government* plan, and all industrialists opposed planning.” **Reality**: The Bombay Plan was.' },
                { id: 'b', prompt: '**ANALYSE**: Compare the **Gandhian critique** (J.C. Kumarappa), the **liberal critique** (B.R. Shenoy), and the **leftist critique** (C.N. Vakil/P.R.', answer: '**Answer** (sample table): | Critique | Core Argument | Plan Feature Attacked |',
                  options: ['**Answer** (sample table): | Critique | Core Argument | Plan Feature Attacked |', 'capitalists = anti-planning', '“capitalists = anti-planning”'],
                  hint: 'If stuck, revisit **Class 11 Political Science node c11_ps_cbse_11_011** (Relationship between.',
                  misconception: '**Misconception**: “The Bombay Plan was a *government* plan, and all industrialists opposed planning.” **Reality**: The Bombay Plan was.' }
          ],
            remediations: { 'misconception-the-bombay-plan-was': { steps: ['Re-read the **NCERT textbox “What is Left and what is Right?”** (p.', '47) to clarify the ideological spectrum.', 'Watch the 10-minute video **“Bombay Plan 1944 – Why Capitalists Wanted Planning”** (search YouTube/NCERT official).', 'Complete the **table in Diagnostic 4** again, this time speaking each critique aloud in your own words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_009', difficulty: 'standard',
          question: 'The "Commanding Heights" argument refers to the strategic decision in India\'s.',
          hint: 'Revisit c12_ps_cbse_10_003 (Second Five Year Plan and the Mahalanobis Model) and trace.',
          misconception: 'Students often believe the "commanding heights" phrase comes from Lenin and was blindly copied by Nehru.',
          parts: [
                { id: 'a', prompt: 'What does the phrase "commanding heights of the economy" specifically refer to in the context of India\'s Second Five Year Plan?', answer: 'It refers to the strategic sectors',
                  options: ['It refers to the strategic sectors', 'all large industries', 'only steel', 'commanding heights'],
                  hint: 'Revisit c12_ps_cbse_10_003 (Second Five Year Plan and the Mahalanobis Model) and trace the.',
                  misconception: 'Students often believe the "commanding heights" phrase comes from Lenin and was blindly copied by Nehru.' },
                { id: 'b', prompt: 'Compare the First and Second Five Year Plans on: (a) priority sector, (b) role of public sector, (c) financing strategy.', answer: 'priority sector, (',
                  options: ['priority sector, (', 'commanding heights', 'the "commanding heights" phrase comes from Lenin and was blindly copied by Nehru'],
                  hint: 'Revisit c12_ps_cbse_10_003 (Second Five Year Plan and the Mahalanobis Model) and trace the.',
                  misconception: 'Students often believe the "commanding heights" phrase comes from Lenin and was blindly copied by Nehru.' }
          ],
            remediations: { 'the-commanding-heights-phrase-comes': { steps: ['If the student conflates the Indian and Soviet lists: (1) Re-read the Industrial Policy Resolution 1956 Schedule.', '(2) Compare with a standard list of Soviet commanding heights (banking, foreign trade, all large industry, transport.', '(3) Identify three sectors in the Soviet list absent from the Indian list (banking, foreign trade, all large industry).', '(4) Write one sentence explaining why India kept banking private until 1969 (to mobilise household savings through.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_010', difficulty: 'standard',
          question: 'The White Revolution (Operation Flood) was a landmark dairy development.',
          hint: 'Revisit c11_ps_cbse_16_005 (Indian federalism: cooperative federalism) and.',
          misconception: 'Students often think Operation Flood was "just another government scheme like the Green Revolution" — i.e., a top-down.',
          parts: [
                { id: 'a', prompt: 'A village in Gujarat has 200 households. 60 are landless, 80 own <2 hectares, 40 own 2–5 hectares, 20 own >5 hectares.', answer: 'The landless and smallholders (<2 ha) gained most',
                  options: ['The landless and smallholders (<2 ha) gained most', 'just another government scheme like the Green Revolution', 'government subsidies', 'cooperative governance'],
                  hint: 'Revisit c11_ps_cbse_16_005 (Indian federalism: cooperative federalism) and c11_ps_cbse_17_005 (Gram.',
                  misconception: 'Students often think Operation Flood was "just another government scheme like the Green Revolution" — i.e., a top-down programme where the.' }
          ],
            remediations: { 'operation-flood-was-just-another': { steps: ['If the student conflates Operation Flood with state-run schemes: Step 1 — Read the NDDB Act, 1987 (Section 3: "body.', 'Step 2 — Trace the money flow: in Green Revolution, state → FCI → farmer; in Operation Flood, consumer → federation →.', 'Step 3 — Re-do Diagnostic Q3 with this flow in mind.', 'Step 4 — Watch the 12-minute NDDB film "The White Revolution" (YouTube) — note every decision made by a *cooperative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
