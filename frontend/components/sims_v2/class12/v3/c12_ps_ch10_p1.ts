import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch10_p1: SimDef = {
    id: 'v3_c12_ps_ch10_p1',
    title: 'Politics of Planned Development · Part 1/2',
    subtitle: 'The powerful institution the Constitution never mentions',
    classLevel: 12, subject: 'political_science', topic: 'Politics of Planned Development · Part 1/2',
    chapters: ['c12_ps_ch10'],
    nodeIds: ['c12_ps_cbse_10_001', 'c12_ps_cbse_10_002', 'c12_ps_cbse_10_003', 'c12_ps_cbse_10_004', 'c12_ps_cbse_10_005', 'c12_ps_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Development policy analyst', intro: 'Industrialists asking for a planned economy — in 1950s India, even capital agreed the market alone couldn\'t build a nation.', goal: 'Explain the Planning Commission\'s mandate, constitutional status and the Directive Principles logic behind India\'s planned development.' },
    discovery: {
        question: 'In 1944, eight of India\'s biggest industrialists signed a plan demanding the government run heavy industry — capitalists begging for state control. What were they thinking?',
        options: ['They lacked the capital and technology for heavy industry themselves, so they wanted the state to bear the risk — planning was a cross-ideological consensus, not a leftist imposition', 'The British forced them to endorse planning', 'They were secret socialists', 'It was a publicity stunt with no real intent'],
        answer: 'They lacked the capital and technology for heavy industry themselves, so they wanted the state to bear the risk — planning was a cross-ideological consensus, not a leftist imposition',
        hook: 'The Planning Commission appears nowhere in the Constitution — it was created by an executive resolution and was only \'advisory\', yet its control over plan funds made it arguably the most powerful extra-constitutional body in India for six decades.',
    },
    teaching: [
        { title: 'Planning Commission and the Five Year Plans: Framework and Goals', text: 'The Planning Commission was a non-constitutional, advisory body established by a Government of India resolution in March 1950 to formulate Five Year Plans for India\'s economic development, guided.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct why a poor, newly free country chose five-year plans — and how a merely advisory body ended up steering where the money went.',
        labels: ['Planning Commission and', 'First Five Year Plan', 'Second Five Year Plan', 'Agriculture vs Industry', 'The Green Revolution', 'Public Sector, Private Sector'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_001', title: 'Planning Commission and the Five Year Plans: Framework and Goals',
          caseStudy: { intro: 'Imagine reading a 2024 news headline: "NITI Aayog releases new strategy for Viksit Bharat @2047." Ask: "Why did India replace the Planning Commission with NITI.',
            decisions: [{ prompt: 'By what legal instrument was the Planning Commission established in March 1950, and what was its formal constitutional status?', options: [
                { text: 'The Planning Commission was established by a **Government of India resolution**', outcome: 'The Planning Commission was established by a **Government of India resolution** (executive order).' },
                { text: 'Article 50', outcome: 'Not quite — **Misconception:** "The Planning Commission was a constitutional body like the Election Commission.', reveals: 'misconception-the-planning-commission-was' },
                { text: 'Constitution', outcome: 'Not quite — **Misconception:** "The Planning Commission was a constitutional body like the Election Commission.', reveals: 'misconception-the-planning-commission-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_002', title: 'First Five Year Plan (1951-56): Agriculture and Priorities',
          caseStudy: { intro: 'Imagine you are a policy advisor in 1951: India has just suffered Partition, food grains are scarce, millions of refugees need livelihoods, and the colonial.',
            decisions: [{ prompt: 'What was the principal obstacle to agricultural growth identified by the First Five Year Plan, and what policy instrument was proposed.', options: [
                { text: 'The Plan identified the pattern of land distribution (highly unequal, zamindari system)', outcome: 'The Plan identified the pattern of land distribution (highly unequal, zamindari system) as the.' },
                { text: 'lack of fertilizers', outcome: 'Not quite — Students often think the First Plan "neglected industry" or was "anti-industrial" because.', reveals: 'the-first-plan-neglected-industry' },
                { text: 'need for tractors', outcome: 'Not quite — Students often think the First Plan "neglected industry" or was "anti-industrial" because.', reveals: 'the-first-plan-neglected-industry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_003', title: 'Second Five Year Plan and the Mahalanobis Model of Industrialisation',
          caseStudy: { intro: 'Imagine you are a young economist in 1956 advising the Planning Commission: India has just finished a First Plan focused on irrigation and agriculture, but.',
            decisions: [{ prompt: 'What was the core sectoral priority of the Second Five Year Plan as distinct from the First Plan?', options: [
                { text: 'The Second Plan prioritised heavy industries (capital goods sector: steel, machinery,', outcome: 'The Second Plan prioritised heavy industries (capital goods sector: steel, machinery, machine.' },
                { text: 'the Mahalanobis model was a direct copy of the Soviet Feldman model', outcome: 'Not quite — Students often believe the Mahalanobis model was a direct copy of the Soviet Feldman model.', reveals: 'the-mahalanobis-model-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_004', title: 'Agriculture vs Industry: The Debate on Development Strategy',
          caseStudy: { intro: 'Imagine you\'re a policymaker in 1956: India has limited savings, widespread poverty, and food imports draining foreign exchange.',
            decisions: [{ prompt: 'What was the principal obstacle to agricultural growth identified by the First Five Year Plan, and what key policy did it propose.', options: [
                { text: 'The First Plan identified the pattern of land distribution (feudal landlordism, tenant', outcome: 'The First Plan identified the pattern of land distribution (feudal landlordism, tenant insecurity).' },
                { text: 'lack of fertilizer', outcome: 'Not quite — Students think the agriculture-industry debate was simply "Nehru vs Gandhians" or "socialists.', reveals: 'the-agriculture-industry-debate-was' },
                { text: 'need for mechanization', outcome: 'Not quite — Students think the agriculture-industry debate was simply "Nehru vs Gandhians" or "socialists.', reveals: 'the-agriculture-industry-debate-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_005', title: 'The Green Revolution and Its Impact on Indian Agriculture',
          caseStudy: { intro: 'Imagine you\'re reading a news report about Punjab farmers protesting for legal guarantee of MSP in 2024, while a farmer in Vidarbha faces debt due to failed.',
            decisions: [{ prompt: 'What were the three core components of the Green Revolution technology package introduced in India in the mid-1960s, and which two crops.', options: [
                { text: 'The three core components were: (1) High-Yielding Variety (HYV) seeds (dwarf wheat', outcome: 'The three core components were: (1) High-Yielding Variety (HYV) seeds (dwarf wheat varieties like.' },
                { text: 'mechanisation', outcome: 'Not quite — Students often think the Green Revolution was simply "new seeds" that spread naturally because they.', reveals: 'the-green-revolution-was-simply' },
                { text: 'cotton', outcome: 'Not quite — Students often think the Green Revolution was simply "new seeds" that spread naturally because they.', reveals: 'the-green-revolution-was-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_006', title: 'Public Sector, Private Sector and the Mixed Economy Model',
          caseStudy: { intro: 'Imagine you are a policy advisor in 1950: India has just become independent, with extreme poverty, minimal industry, and a colonial economy geared toward raw.',
            decisions: [{ prompt: 'What were the three categories of industries established by the Industrial Policy Resolution of 1956, and which schedule listed industries.', options: [
                { text: 'The IPR 1956 classified industries into: Schedule A (17 industries exclusively public', outcome: 'The IPR 1956 classified industries into: Schedule A (17 industries exclusively public sector: arms.' },
                { text: 'strategic industries only', outcome: 'Not quite — Students often think "mixed economy" means a 50-50 split between public and private sectors,.', reveals: 'mixed-economy-means-a-50' },
                { text: 'mixed economy', outcome: 'Not quite — Students often think "mixed economy" means a 50-50 split between public and private sectors,.', reveals: 'mixed-economy-means-a-50' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A policy-club debate: \'Independent India should have led with heavy industry in 1951 — the First Plan wasted a decade on dams and land ceilings.\'',
            decisions: [{ prompt: 'What was the First Plan\'s actual reasoning?', options: [
                { text: 'Start where the constraint was — a Partition-hit, food-short agrarian economy needed irrigation (Bhakra Nangal replacing canal headworks lost to Pakistan) and land reform against unequal holdings, and K.N. Raj\'s \'hasten slowly\' kept the pace inside what democracy could survive.', outcome: 'The chapter\'s logic chain: identify the binding constraint (land, water, food), design the institutional fix, and pace it politically — industry-first skips the subsistence reality the plan was answering.' },
                { text: 'The debater is right — industry compounds faster, so agriculture-first was timidity.', outcome: 'Faster compounding needs fed people and functioning markets — with consumption already at subsistence and Partition\'s irrigation rupture, industrial lead would have meant coercion, which is precisely what \'hasten slowly\' refused.', reveals: 'industry-first-always' },
                { text: 'The real reason was just lack of capital — nothing ideological about it.', outcome: 'Capital was a symptom, not the diagnosis — the plan named unequal land distribution the principal obstacle and chose democracy-compatible pacing; \'no money\' can\'t explain why land reform, not inputs, came first.', reveals: 'only-capital-mattered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain the plan budget vs non-plan budget split, and why \'advisory\' on paper meant decisive in practice.',
            decisions: [{ prompt: 'What comes next? Politics of Planned Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Politics of Planned Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_001', difficulty: 'standard',
          question: 'The Planning Commission was a non-constitutional, advisory body established.',
          hint: 'Revisit Class 11 Political Science Chapter 2 (c11_ps_cbse_11_011) on "Relationship.',
          misconception: '**Misconception:** "The Planning Commission was a constitutional body like the Election Commission, and it had the.',
          parts: [
                { id: 'a', prompt: 'By what legal instrument was the Planning Commission established in March 1950, and what was its formal constitutional status?', answer: 'The Planning Commission was established by a **Government of India resolution**',
                  options: ['The Planning Commission was established by a **Government of India resolution**', 'Article 50', 'Constitution', 'Act of Parliament'],
                  hint: 'Revisit Class 11 Political Science Chapter 2 (c11_ps_cbse_11_011) on "Relationship between.',
                  misconception: '**Misconception:** "The Planning Commission was a constitutional body like the Election Commission, and it had the power to implement plans.' }
          ],
            remediations: { 'misconception-the-planning-commission-was': { steps: ['If the student holds this misconception: 1.', '**Re-read the NCERT box** on p.48: "Planning Commission is not one of the many commissions...', 'set up by the Constitution...', 'set up in March 1950 by a simple resolution...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_002', difficulty: 'standard',
          question: 'The First Five Year Plan (1951–1956) was India\'s inaugural planned development.',
          hint: 'Revisit c11_ps_cbse_11_008 (Directive Principles, especially Article 39(b)-(c)) and.',
          misconception: 'Students often think the First Plan "neglected industry" or was "anti-industrial" because it focused on agriculture.',
          parts: [
                { id: 'a', prompt: 'The First Plan allocated huge resources to the Bhakra Nangal Dam.', answer: 'Partition left the fertile Punjab plains in India but the headworks of the canal',
                  options: ['Partition left the fertile Punjab plains in India but the headworks of the canal', 'flood control', 'industrial power', 'development needs'],
                  hint: 'Revisit c11_ps_cbse_11_008 (Directive Principles, especially Article 39(b)-(c)) and.',
                  misconception: 'Students often think the First Plan "neglected industry" or was "anti-industrial" because it focused on agriculture.' }
          ],
            remediations: { 'the-first-plan-neglected-industry': { steps: ['If the student holds this misconception: (1) Have them read the First Plan\'s own statement: "The first plan gave the.', 'because the agricultural sector was hit hardest by partition and needed urgent attention" (NCERT, p.51).', '(2) Ask them to trace the causal chain: no land reform → low peasant surplus → no domestic market for textiles →.', '(3) Assign a mini-case: compare Punjab\'s post-Bhakra agricultural surplus (1960s) with Bihar\'s stagnant agriculture.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the First Plan "neglected industry" or was "anti-industrial" because it focused on agriculture.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The First Five Year Plan\'s focus on agriculture was a pragmatic necessity, not an ideological choice." Use evidence from the Plan\'s.', answer: 'The claim is largely correct: agriculture was prioritised',
                  options: ['The claim is largely correct: agriculture was prioritised', 'neglected industry', 'anti-industrial'],
                  hint: 'Revisit c11_ps_cbse_11_008 (Directive Principles, especially Article 39(b)-(c)) and.',
                  misconception: 'Students often think the First Plan "neglected industry" or was "anti-industrial" because it focused on agriculture.' }
          ],
            remediations: { 'the-first-plan-neglected-industry': { steps: ['If the student holds this misconception: (1) Have them read the First Plan\'s own statement: "The first plan gave the.', 'because the agricultural sector was hit hardest by partition and needed urgent attention" (NCERT, p.51).', '(2) Ask them to trace the causal chain: no land reform → low peasant surplus → no domestic market for textiles →.', '(3) Assign a mini-case: compare Punjab\'s post-Bhakra agricultural surplus (1960s) with Bihar\'s stagnant agriculture.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_003', difficulty: 'standard',
          question: 'The Mahalanobis Model, formulated by statistician P.C. Mahalanobis for India\'s.',
          hint: 'If the difference between \'capital goods\' and \'consumer goods\' sectors is unclear.',
          misconception: 'Students often believe the Mahalanobis model was a direct copy of the Soviet Feldman model.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mahalanobis Model, formulated by statistician P.C',
                  options: ['The Mahalanobis Model, formulated by statistician P.C', 'The Planning Commission was a non-constitutional, advisory body established by a', 'The First Five Year Plan (1951–1956) was India\'s inaugural planned development strategy,', 'The Agriculture vs Industry debate refers to the fundamental policy conflict in India\'s'],
                  hint: 'If the difference between \'capital goods\' and \'consumer goods\' sectors is unclear, revisit the.',
                  misconception: 'Students often believe the Mahalanobis model was a direct copy of the Soviet Feldman model.' }
          ],
            remediations: { 'the-mahalanobis-model-was-a': { steps: ['Re-read the \'Rapid Industrialisation\' section in NCERT (pages 51–52) and identify the three explicit assumptions of the.', 'Watch the 10-minute video \'Mahalanobis Model Explained\' (search on DIKSHA/YouTube) to visualise the two-sector diagram.', 'Re-attempt Diagnostic Questions 2 and 4.', 'If still stuck, revisit c12_ps_cbse_10_002 (First Plan) to contrast the two strategies.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_004', difficulty: 'standard',
          question: 'The Agriculture vs Industry debate refers to the fundamental policy conflict.',
          hint: 'Revisit c12_ps_cbse_10_002 (First Plan\'s savings-investment logic) and c12_ps_cbse_10_003.',
          misconception: 'Students think the agriculture-industry debate was simply "Nehru vs Gandhians" or "socialists vs capitalists.".',
          parts: [
                { id: 'a', prompt: 'Compare the First Plan\'s "hasten slowly" (K.N. Raj) and the Second Plan\'s "rapid structural transformation" (Mahalanobis) on three dimensions: (a).', answer: 'savings-investment logic, (',
                  options: ['savings-investment logic, (', 'different speeds', 'Nehru vs Gandhians', 'socialists vs capitalists'],
                  hint: 'Revisit c12_ps_cbse_10_002 (First Plan\'s savings-investment logic) and c12_ps_cbse_10_003.',
                  misconception: 'Students think the agriculture-industry debate was simply "Nehru vs Gandhians" or "socialists vs capitalists." In reality, the *Congress.' }
          ],
            remediations: { 'the-agriculture-industry-debate-was': { steps: ['If stuck on the misconception: (1) Re-read the Avadi Resolution text (NCERT p.51) — note it was a *Congress*.', '(2) Compare the Bombay Plan (1944) signatories (Tata, Birla, etc.) with the First Plan\'s land reform focus — both were.', '(3) Trace Charan Singh\'s trajectory: Congress CM of UP (1960s) implementing land ceilings, later forming Bharatiya Lok.', 'Use the worked example 3 structure to map actors to arguments, not labels.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_005', difficulty: 'standard',
          question: 'The Green Revolution refers to the technological transformation of Indian.',
          hint: 'If stuck, revisit the "Agriculture vs Industry" debate (c12_ps_cbse_10_004) and the First.',
          misconception: 'Students often think the Green Revolution was simply "new seeds" that spread naturally because they were better.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab in 1975 adopts HYV wheat, uses subsidised fertiliser, sells to FCI at MSP, and gets a tubewell loan from a nationalised bank.', answer: 'The divergence was created by: (1) **Procurement policy**',
                  options: ['The divergence was created by: (1) **Procurement policy**', 'farmer backwardness', 'new seeds', 'the Green Revolution was simply "new seeds" that spread naturally'],
                  hint: 'If stuck, revisit the "Agriculture vs Industry" debate (c12_ps_cbse_10_004) and the First Plan\'s.',
                  misconception: 'Students often think the Green Revolution was simply "new seeds" that spread naturally because they were better.' },
                { id: 'b', prompt: 'Compare the Green Revolution\'s impact on (a) large landowners vs. landless labourers in Punjab, and (b) the ecological footprint in Punjab vs. Eastern India.', answer: 'large landowners vs',
                  options: ['large landowners vs', 'new seeds', 'the Green Revolution was simply "new seeds" that spread naturally'],
                  hint: 'If stuck, revisit the "Agriculture vs Industry" debate (c12_ps_cbse_10_004) and the First Plan\'s.',
                  misconception: 'Students often think the Green Revolution was simply "new seeds" that spread naturally because they were better.' }
          ],
            remediations: { 'the-green-revolution-was-simply': { steps: ['If the student holds the "natural diffusion" misconception: Step 1 — Re-read the First Five Year Plan node.', 'Step 2 — Study the Agriculture vs Industry debate (c12_ps_cbse_10_004) to understand why food self-sufficiency became.', 'Step 3 — Map the policy chain: Drought → PL-480 humiliation → Political decision for self-sufficiency → Selection.', 'Step 4 — Re-attempt Diagnostic Question 3 with this policy-chain lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_10_006', difficulty: 'standard',
          question: 'The mixed economy model adopted by India after Independence is a system where.',
          hint: 'If stuck, revisit the Mahalanobis Model\'s core equation: growth rate depends on share.',
          misconception: 'Students often think "mixed economy" means a 50-50 split between public and private sectors, or that the private sector.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mixed economy model adopted by India after Independence is a system where both the',
                  options: ['The mixed economy model adopted by India after Independence is a system where both the', 'The Planning Commission was a non-constitutional, advisory body established by a', 'The First Five Year Plan (1951–1956) was India\'s inaugural planned development strategy,', 'The Mahalanobis Model, formulated by statistician P.C'],
                  hint: 'If stuck, revisit the Mahalanobis Model\'s core equation: growth rate depends on share of investment.',
                  misconception: 'Students often think "mixed economy" means a 50-50 split between public and private sectors, or that the private sector was marginalized.' }
          ],
            remediations: { 'mixed-economy-means-a-50': { steps: ['If the student holds the 50-50 or "private sector crushed" misconception: 1) Revisit c12_ps_cbse_10_003 (Mahalanobis.', '2) Examine the 1956 IPR Schedule C list (textbook Appendix) — note industries like textiles, sugar, paper, cement were.', '3) Re-do Diagnostic Q3 with data: private sector investment grew 8% annually in Second Plan.', '4) Write one paragraph: "The mixed economy was a division of labour, not a battle."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
