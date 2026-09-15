import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch10_p2: SimDef = {
    id: 'v3_c12_soc_ch10_p2',
    title: 'The Story of Indian Democracy · Part 2/2',
    subtitle: 'Elections are the floor, not the ceiling',
    classLevel: 12, subject: 'sociology', topic: 'The Story of Indian Democracy · Part 2/2',
    chapters: ['c12_soc_ch10'],
    nodeIds: ['c12_soc_cbse_10_007', 'c12_soc_cbse_10_008', 'c12_soc_cbse_10_009', 'c12_soc_cbse_10_010', 'c12_soc_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Democratic institutions analyst', intro: '\'We, the people\' is a claim that has to be re-proven between elections — courts, media and street all get a say.', goal: 'Distinguish procedural from substantive democracy and classify democratic forms by constitutional design.' },
    discovery: {
        question: 'A country holds regular elections with universal suffrage — but the ruling party owns the media, the courts and the election commission, and rivals keep getting arrested. Democracy or not?',
        options: ['Only procedurally — it has the voting machinery but fails accountability and rule of law, the substantive core that makes power genuinely answerable', 'Yes — elections alone define democracy', 'No — it\'s a plain dictatorship', 'Yes — until proven otherwise in court'],
        answer: 'Only procedurally — it has the voting machinery but fails accountability and rule of law, the substantive core that makes power genuinely answerable',
        hook: 'Democracy isn\'t binary — a village gram sabha and the Lok Sabha both count, differently. And reserved seats for women are a procedural guarantee; where \'sarpanch-patis\' pull the strings, substance hasn\'t arrived.',
    },
    teaching: [
        { title: 'The Municipality System: 74th Amendment and Urban Local Self-Government', text: 'The 74th Constitutional Amendment Act (1992) granted constitutional status to Urban Local Bodies (ULBs) — Municipal Corporations, Municipal Councils, and Nagar Panchayats — establishing a three-tier.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify regimes along the procedural-subjective axis — then defend India\'s parliamentary, representative design against the direct and presidential alternatives.',
        labels: ['The Municipality System: 74th', 'Political Parties in India', 'Pressure Groups and Interest', 'Civil Society and Social', 'The Challenges to Indian'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_007', title: 'The Municipality System: 74th Amendment and Urban Local Self-Government',
          caseStudy: { intro: 'Imagine you live in a rapidly growing city like Bengaluru or Pune where garbage isn\'t collected for days, streetlights don\'t work, and water supply is erratic.',
            decisions: [{ prompt: 'What are the three types of Urban Local Bodies created under the 74th Amendment, and what is the primary demographic criterion used.', options: [
                { text: 'The three types are: (1) Municipal Corporation (for large urban areas, typically', outcome: 'The three types are: (1) Municipal Corporation (for large urban areas, typically population > 10.' },
                { text: 'Municipality, Corporation, Panchayat', outcome: 'Not quite — Students often conflate the 73rd and 74th Amendments as "identical but for rural/urban." They.', reveals: 'students-often-conflate-the-73rd' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_008', title: 'Political Parties in India: National, Regional and the Party System',
          caseStudy: { intro: 'Imagine you open a newspaper and see headlines: "BJP wins in Gujarat," "DMK sweeps Tamil Nadu," "AAP forms government in Punjab," "JD(U) switches alliance.',
            decisions: [{ prompt: 'Define a political party in one sentence and state the two constitutional means it uses to achieve its goal.', options: [
                { text: 'A political party is an organised group of citizens sharing a common ideology/programme', outcome: 'A political party is an organised group of citizens sharing a common ideology/programme that seeks.' },
                { text: 'a group that protests on streets', outcome: 'Not quite — **"Regional parties are just caste parties in disguise."** Students write this because textbooks.', reveals: 'regional-parties-are-just-caste' },
                { text: 'any NGO', outcome: 'Not quite — **"Regional parties are just caste parties in disguise."** Students write this because textbooks.', reveals: 'regional-parties-are-just-caste' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_009', title: 'Pressure Groups and Interest Groups in Indian Politics',
          caseStudy: { intro: 'Imagine you read in the newspaper that "Farmers\' unions threaten nationwide protests if MSP guarantee law is not passed" and "Industry body FICCI submits.',
            decisions: [{ prompt: 'A student writes: "Pressure groups and interest groups are the same thing — both try to influence government." Is this statement correct?', options: [
                { text: 'No, the statement is incorrect', outcome: 'No, the statement is incorrect. Pressure groups is a broader category that includes any organized.' },
                { text: 'operate primarily by lobbying the members of legislative bodies', outcome: 'Not quite — Students often equate "pressure group" with "protest group" and assume all pressure groups use.', reveals: 'students-often-equate-pressure-group' },
                { text: 'pressure group', outcome: 'Not quite — Students often equate "pressure group" with "protest group" and assume all pressure groups use.', reveals: 'students-often-equate-pressure-group' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_010', title: 'Civil Society and Social Movements in Indian Democracy',
          caseStudy: { intro: 'Imagine you see a group of villagers in Uttarakhand hugging trees to stop contractors from cutting them down — this is the Chipko movement, a classic social.',
            decisions: [{ prompt: 'Define civil society and distinguish it from the state and the market in two sentences.', options: [
                { text: 'Civil society is the realm of voluntary associations (NGOs, trade unions, community', outcome: 'Civil society is the realm of voluntary associations (NGOs, trade unions, community groups) formed.' },
                { text: 'all non-government organisations', outcome: 'Not quite — Students often think "civil society = NGOs" and "social movement = any large protest." This error.', reveals: 'civil-society-ngos-and-social' },
                { text: 'civil society = NGOs', outcome: 'Not quite — Students often think "civil society = NGOs" and "social movement = any large protest." This error.', reveals: 'civil-society-ngos-and-social' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_011', title: 'The Challenges to Indian Democracy: Casteism, Communalism, Criminalisation and Corruption',
          caseStudy: { intro: 'Imagine you open a newspaper and see three headlines on the same day: "MP with 12 criminal cases wins by record margin", "Panchayat funds for SC/ST hostels.',
            decisions: [{ prompt: 'Define \'criminalisation of politics\' in the Indian context and cite the Supreme Court judgment that mandated disclosure of criminal.', options: [
                { text: 'Correct answer: Criminalisation of politics refers to the increasing participation of', outcome: 'Correct answer: Criminalisation of politics refers to the increasing participation of individuals.' },
                { text: 'criminals becoming politicians', outcome: 'Not quite — Students often treat the four challenges as *independent* phenomena: "casteism = rural, communalism.', reveals: 'students-often-treat-the-four' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mock parliament, a member moves an amendment abolishing judicial review, arguing \'Article 368 lets Parliament amend anything — majority rules the Constitution.\'',
            decisions: [{ prompt: 'Does the Basic Structure Doctrine allow that?', options: [
                { text: 'No — Kesavananda Bharati capped Article 368: core features — judicial review, democracy, secularism, separation of powers, federalism — sit beyond amendment; a temporary majority can rewrite clauses but not the Constitution\'s soul, and abolishing review attacks the core directly.', outcome: 'The chapter\'s safeguard: amending power is wide but not sovereign — the doctrine exists precisely to stop a numerical majority from rewriting the architecture it governs within.' },
                { text: 'Yes — Article 368\'s text gives Parliament unlimited amending power.', outcome: 'That was the pre-1973 reading — Kesavananda established that the power to amend is not the power to destroy; \'anything\' was judicially fenced at the basic features.', reveals: 'article-368-is-unlimited' },
                { text: 'It\'s valid if two-thirds plus state ratification agree — procedure cures substance.', outcome: 'The doctrine limits substance regardless of procedure — even a perfect special majority can\'t remove a basic feature; the threshold governs amendments, not the unamendable core.', reveals: 'big-majority-beats-doctrine' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue that democracy is a continuous negotiation between state and society — which is why one constitutional amendment can empower a village while another can merely decorate it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_007', difficulty: 'standard',
          question: 'The 74th Constitutional Amendment Act (1992) granted constitutional status.',
          hint: 'If stuck, revisit c12_soc_cbse_10_004 (Panchayati Raj System) and c11_ps_cbse_17_006.',
          misconception: 'Students often conflate the 73rd and 74th Amendments as "identical but for rural/urban." They write: "Both have three.',
          parts: [
                { id: 'a', prompt: 'What are the three types of Urban Local Bodies created under the 74th Amendment, and what is the primary demographic criterion used to classify them?', answer: 'The three types are: (1) Municipal Corporation (for large urban areas, typically',
                  options: ['The three types are: (1) Municipal Corporation (for large urban areas, typically', 'Municipality, Corporation, Panchayat'],
                  hint: 'If stuck, revisit c12_soc_cbse_10_004 (Panchayati Raj System) and c11_ps_cbse_17_006 (74th.',
                  misconception: 'Students often conflate the 73rd and 74th Amendments as "identical but for rural/urban." They write: "Both have three tiers, both have.' },
                { id: 'b', prompt: 'A Municipal Corporation in a metropolitan city wants to implement a new solid waste management policy.', answer: 'No, the Corporation cannot legally implement it as a mandatory function',
                  options: ['No, the Corporation cannot legally implement it as a mandatory function', 'Twelfth Schedule makes it mandatory'],
                  hint: 'If stuck, revisit c12_soc_cbse_10_004 (Panchayati Raj System) and c11_ps_cbse_17_006 (74th.',
                  misconception: 'Students often conflate the 73rd and 74th Amendments as "identical but for rural/urban." They write: "Both have three tiers, both have.' }
          ],
            remediations: { 'students-often-conflate-the-73rd': { steps: ['Have the student draw two side-by-side flowcharts — one for 73rd Amendment tier structure (showing indirect elections.', 'Give them the Twelfth Schedule (18 items) and Eleventh Schedule (29 items) — ask them to circle 5 functions unique.', 'Assign a 150-word answer: "Why does the Constitution not create a \'Nagar Panchayat Samiti\' between Municipal Council.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_008', difficulty: 'standard',
          question: 'A political party is an organised group of citizens who share a common ideology.',
          hint: 'Revisit c10_civ_cbse_04_004 (EC criteria) and c11_ps_cbse_12_004 (FPTP mechanics) — these.',
          misconception: '**"Regional parties are just caste parties in disguise."** Students write this because textbooks list parties like RJD.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A political party is an organised group of citizens who share a common ideology or',
                  options: ['A political party is an organised group of citizens who share a common ideology or', 'Democracy is a form of government in', 'The Indian Constitution is the supreme legal document that establishes the framework of', 'Fundamental Rights (Part III, Articles 12-35) are justiciable, legally enforceable'],
                  hint: 'Revisit c10_civ_cbse_04_004 (EC criteria) and c11_ps_cbse_12_004 (FPTP mechanics) — these are the.',
                  misconception: '**"Regional parties are just caste parties in disguise."** Students write this because textbooks list parties like RJD (Yadav), SP (Yadav).' }
          ],
            remediations: { 'regional-parties-are-just-caste': { steps: ['If the student holds the "regional = caste party" misconception: Step 1 — Ask them to list **three regional parties.', 'Step 2 — Show 2019/2024 election data: **vote share of RJD/SP/BSP among non-core castes** (e.g., RJD got ~15% upper.', 'Step 3 — Assign a mini-case: "Compare BSP\'s 2007 UP win (Brahmin-Dalit alliance) vs 2022 loss (alliance collapsed).', 'What changed sociologically?" Step 4 — Re-test with Diagnostic Question 4 — require explicit mention of *ideology*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_009', difficulty: 'standard',
          question: 'Pressure groups are organized associations that seek to influence government.',
          hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
          misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Pressure groups and interest groups are the same thing — both try to influence government." Is this statement correct?', answer: 'No, the statement is incorrect',
                  options: ['No, the statement is incorrect', 'operate primarily by lobbying the members of legislative bodies', 'pressure group', 'political party wing'],
                  hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
                  misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.' },
                { id: 'b', prompt: 'The NCERT text states: "It is obvious that all groups will not have the same access or the same ability to pressurise the government." Give one concrete Indian.', answer: 'High access: Federation of Indian Chambers of Commerce and Industry (FICCI)',
                  options: ['High access: Federation of Indian Chambers of Commerce and Industry (FICCI)', 'corruption', 'pressure group', 'political party wing'],
                  hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
                  misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.' },
                { id: 'c', prompt: 'Read the scenario: "A group of software engineers in Bengaluru forms \'Tech Workers Collective\' to demand data protection laws.', answer: 'This is an *interest group* (a type of pressure group)',
                  options: ['This is an *interest group* (a type of pressure group)', 'organised to pursue specific interests in the political arena', 'operating primarily by lobbying the members of legislative bodies', 'political party'],
                  hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
                  misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.' },
                { id: 'd', prompt: 'Compare the 73rd Amendment\'s impact on Panchayati Raj (from c12_soc_cbse_10_004-007) with the role of pressure groups in Indian democracy.', answer: 'Institutionalized representation (Panchayat reservations) guarantees *structural',
                  options: ['Institutionalized representation (Panchayat reservations) guarantees *structural', 'pressure group', 'political party wing'],
                  hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
                  misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.' }
          ],
            remediations: { 'students-often-equate-pressure-group': { steps: ['If the student conflates pressure groups with protests or party wings: Step 1 — Have them create a 3-column table.', 'Power) | Primary Method (Lobbying/Protest/Litigation/Electoral) | Accountability (Members/Voters/Leadership).', 'Step 2 — Populate with 6 Indian examples: FICCI, BKU, Narmada Bachao Andolan, BMS, AIPWA, All India Students\'.', 'Step 3 — Ask: "Which rows have \'Power\' as goal?" (only party affiliates) — "Which use \'Electoral\' method?" (only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Pressure groups strengthen democracy by giving every group a voice." Use the NCERT\'s own caveat about "dominant social groups such.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'pressure group', 'political party wing'],
                  hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
                  misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.' },
                { id: 'b', prompt: 'Design a hypothetical pressure group for *urban sanitation workers* in Mumbai that could effectively counter the structural disadvantages the NCERT identifies.', answer: 'organizational form, (',
                  options: ['organizational form, (', 'pressure group', 'political party wing'],
                  hint: 'Revisit c12_soc_cbse_10_008 for party definition and c11_soc_cbse_06_003 for.',
                  misconception: 'Students often equate "pressure group" with "protest group" and assume all pressure groups use street demonstrations.' }
          ],
            remediations: { 'students-often-equate-pressure-group': { steps: ['If the student conflates pressure groups with protests or party wings: Step 1 — Have them create a 3-column table.', 'Power) | Primary Method (Lobbying/Protest/Litigation/Electoral) | Accountability (Members/Voters/Leadership).', 'Step 2 — Populate with 6 Indian examples: FICCI, BKU, Narmada Bachao Andolan, BMS, AIPWA, All India Students\'.', 'Step 3 — Ask: "Which rows have \'Power\' as goal?" (only party affiliates) — "Which use \'Electoral\' method?" (only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_010', difficulty: 'standard',
          question: 'Civil society refers to the sphere of voluntary associations, organisations.',
          hint: 'Revisit c12_soc_cbse_10_003 (Fundamental Rights vs Directive Principles) and.',
          misconception: 'Students often think "civil society = NGOs" and "social movement = any large protest." This error arises because media.',
          parts: [
                { id: 'a', prompt: 'Apply the distinction between reformist, revolutionary, and reactionary social movements to classify: (a) Narmada Bachao Andolan, (b) RSS-led Ram Janmabhoomi.', answer: 'Narmada Bachao Andolan, (',
                  options: ['Narmada Bachao Andolan, (', 'reformist', 'revolutionary', 'civil society = NGOs'],
                  hint: 'Revisit c12_soc_cbse_10_003 (Fundamental Rights vs Directive Principles) and c12_soc_cbse_10_009.',
                  misconception: 'Students often think "civil society = NGOs" and "social movement = any large protest." This error arises because media and policy discourse.' }
          ],
            remediations: { 'civil-society-ngos-and-social': { steps: ['Re-read the NCERT Box 3.6 (Max Weber on Parties) and Box 3.7 (pressure groups vs movements) to see how sociology.', 'Make a three-column table: Column A = 5 civil society groups you know (e.g., RWAs, trade union, mahila mandal, caste.', 'For each "Yes," identify the sustained collective identity and extra-institutional tactic.', 'Re-attempt Diagnostic Questions 2 and 3 using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_011', difficulty: 'standard',
          question: 'Casteism, communalism, criminalisation, and corruption are four interlinked.',
          hint: 'Revisit c11_soc_cbse_02_003 (Social Stratification: Caste, Class, Gender) for the.',
          misconception: 'Students often treat the four challenges as *independent* phenomena: "casteism = rural, communalism = urban.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Casteism, communalism, criminalisation, and corruption are four interlinked structural',
                  options: ['Casteism, communalism, criminalisation, and corruption are four interlinked structural', 'Democracy is a form of government in', 'The Indian Constitution is the supreme legal document that establishes the framework of', 'Fundamental Rights (Part III, Articles 12-35) are justiciable, legally enforceable'],
                  hint: 'Revisit c11_soc_cbse_02_003 (Social Stratification: Caste, Class, Gender) for the structural.',
                  misconception: 'Students often treat the four challenges as *independent* phenomena: "casteism = rural, communalism = urban, criminalisation = MPs.' }
          ],
            remediations: { 'students-often-treat-the-four': { steps: ['If a student cannot articulate the interlocking nexus, do this 3-step remediation: (1) Re-read NCERT Chapter 10.', '(2) Create a 2×2 matrix: rows = challenges, columns = mechanisms (identity, coercion, patronage, rent-seeking).', 'Fill each cell with one Indian example.', '(3) Attempt Diagnostic Question 3 again — if still stuck, watch the 12-minute *PRS Legislative Research* video.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
