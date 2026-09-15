import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch15_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch15_p2: SimDef = {
    id: 'v3_c12_soc_ch15_p2',
    title: 'Social Movements · Part 2/2',
    subtitle: 'A riot burns out; a movement keeps minutes',
    classLevel: 12, subject: 'sociology', topic: 'Social Movements · Part 2/2',
    chapters: ['c12_soc_ch15'],
    nodeIds: ['c12_soc_cbse_15_007', 'c12_soc_cbse_15_008', 'c12_soc_cbse_15_009', 'c12_soc_cbse_15_010', 'c12_soc_cbse_15_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Movement analyst', intro: 'The eight-hour day and the vote weren\'t granted — they were organised for, signature by signature.', goal: 'Distinguish social movements from collective behaviour and social change using organisation, ideology and sustained action.' },
    discovery: {
        question: 'In 1838, over a million workers signed a charter demanding the vote — meeting, organising, campaigning for years. A century later a hungry crowd can riot over bread prices and disperse by evening. Both are \'people acting together\' — so what makes only one a movement?',
        options: ['Sustained organisation, shared ideology and a goal beyond the moment — a riot has a grievance; a movement has a charter, leaders and a strategy', 'Size — a million signatures beats a street crowd', 'Violence — riots don\'t count as movements', 'Age — movements must be historical'],
        answer: 'Sustained organisation, shared ideology and a goal beyond the moment — a riot has a grievance; a movement has a charter, leaders and a strategy',
        hook: 'Big crowds don\'t make movements — 1857 lacked unified organisation and shared ideology across centres, so it\'s a rebellion, not a movement. And Chipko wasn\'t \'just environmental\': its villagers fused survival economics, ecology and anger at a distant state into one fight.',
    },
    teaching: [
        { title: 'The Backward Classes Movement: Mandal Commission and the Politics of Reservation', text: 'The Backward Classes Movement refers to the collective political mobilisation of socially and educationally backward castes (OBCs) in India, culminating in the Mandal Commission (1979) which.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_15_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run real cases through the movement checklist — sanskritisation, a station protest, the anti-sati campaign, Chipko — and defend what qualifies and what\'s merely collective heat.',
        labels: ['The Backward Classes Movement', 'The Women\'s Movement', 'The Environmental Movement: Chipko,', 'The Workers\' Movement: Trade', 'New Social Movements: Identity,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_007', title: 'The Backward Classes Movement: Mandal Commission and the Politics of Reservation',
          caseStudy: { intro: 'Imagine you\'re at a family dinner and your uncle says, "Reservations for OBCs destroyed merit — my nephew scored 95% but didn\'t get a seat while someone with.',
            decisions: [{ prompt: 'What were the three categories of indicators (social, educational, economic) used by the Mandal Commission to identify "Socially and.', options: [
                { text: 'The Mandal Commission used 11 indicators grouped into three categories: Social (3', outcome: 'The Mandal Commission used 11 indicators grouped into three categories: Social (3 indicators.' },
                { text: 'only caste names', outcome: 'Not quite — Students often believe the Mandal Commission *invented* OBC reservation.', reveals: 'the-mandal-commission-invented-obc' },
                { text: 'income alone', outcome: 'Not quite — Students often believe the Mandal Commission *invented* OBC reservation.', reveals: 'the-mandal-commission-invented-obc' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_009', title: 'The Environmental Movement: Chipko, Narmada Bachao Andolan and the Adivasi-Environment Linkage',
          caseStudy: { intro: 'Imagine you live in a Himalayan village where the forest provides your firewood, fodder, and water — but a contractor arrives to cut trees for timber revenue.',
            decisions: [{ prompt: 'What was the immediate trigger for the Chipko Movement in 1973, and which group of villagers played the most visible role in the.', options: [
                { text: 'The immediate trigger was the government’s auction of the Reni forest to commercial', outcome: 'The immediate trigger was the government’s auction of the Reni forest to commercial contractors.' },
                { text: 'men led the protests', outcome: 'Not quite — Students often think Chipko was “only about saving trees” and NBA was “only against dams,” missing.', reveals: 'chipko-was-only-about-saving' },
                { text: 'it started against a dam', outcome: 'Not quite — Students often think Chipko was “only about saving trees” and NBA was “only against dams,” missing.', reveals: 'chipko-was-only-about-saving' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_010', title: 'The Workers\' Movement: Trade Unionism, the Bombay Textile Strike and New Labour Struggles',
          caseStudy: { intro: 'Imagine you are a textile mill worker in Bombay in 1982: you haven\'t been paid for months, your union leaders are negotiating behind closed doors, and 2.5 lakh.',
            decisions: [{ prompt: 'What was the first trade union established in India, who founded it, and in which year?', options: [
                { text: 'The first trade union in India was established in April 1918 in Madras by B.P', outcome: 'The first trade union in India was established in April 1918 in Madras by B.P.' },
                { text: 'worker disunity', outcome: 'Not quite — Students often think the Bombay Textile Strike failed *only* because of "worker disunity" or "bad.', reveals: 'the-bombay-textile-strike-failed' },
                { text: 'bad leadership', outcome: 'Not quite — Students often think the Bombay Textile Strike failed *only* because of "worker disunity" or "bad.', reveals: 'the-bombay-textile-strike-failed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A headline calls a tribal movement blocking a mining lease \'a revolutionary uprising\'; a classmate counters \'it\'s reformist — they cite the Forest Rights Act.\'',
            decisions: [{ prompt: 'Where does the typology place it?', options: [
                { text: 'Primarily resistance — the core aim is defensive: stop dispossession, protect customary land and identity; the legal demands are reformist instruments in service of survival, but neither headline\'s \'revolutionary\' (no new order sought) nor a pure \'reform\' label captures the dominant defence-of-rights orientation.', outcome: 'The chapter\'s test is goal and scope, not tactics or outcomes — defending what exists isn\'t overthrowing what exists, even when the tools are legal ones.' },
                { text: 'The headline is right — confrontation with the state makes it revolutionary.', outcome: 'Confrontation isn\'t revolution — revolutionary movements seek to transform the structure of power itself; resisting a lease to keep existing rights is the textbook resistance case, however forceful the stand.', reveals: 'confrontation-equals-revolution' },
                { text: 'The classmate is right — using a statute makes it purely reformist.', outcome: 'Method doesn\'t settle type — a movement can invoke a law while its driving aim is survival-level defence of land; intent outweighs instruments, and here the intent is holding ground, not tweaking policy.', reveals: 'legal-means-reformist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_011', title: 'You made it',
          caseStudy: { intro: 'You can now tell social change (a tide), collective behaviour (a spark) and a social movement (an engine) apart — and explain why your weekends exist because someone organised.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_007', difficulty: 'standard',
          question: 'The Backward Classes Movement refers to the collective political mobilisation.',
          hint: 'Revisit c11_soc_cbse_10_010 (Srinivas on dominant caste and horizontal stretch) and.',
          misconception: 'Students often believe the Mandal Commission *invented* OBC reservation.',
          parts: [
                { id: 'a', prompt: 'Compare the "horizontal stretch" of caste (M.N. Srinivas) in the Backward Classes Movement with the Dalit Movement\'s vertical challenge to caste hierarchy.', answer: 'The Backward Classes Movement used "horizontal stretch"',
                  options: ['The Backward Classes Movement used "horizontal stretch"', 'both caste-based', 'the Mandal Commission *invented* OBC reservation'],
                  hint: 'Revisit c11_soc_cbse_10_010 (Srinivas on dominant caste and horizontal stretch) and.',
                  misconception: 'Students often believe the Mandal Commission *invented* OBC reservation.' }
          ],
            remediations: { 'the-mandal-commission-invented-obc': { steps: ['If the student holds this misconception: (1) Assign the "Miller Committee Report (1918, Mysore)" and "First Backward.', 'Singh\'s political calculus).', 'Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Mandal Commission *invented* OBC reservation.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the argument: "The creamy layer exclusion for OBCs (introduced in Indra Sawhney) should be applied identically to SC/ST reservations.', answer: 'This argument is flawed',
                  options: ['This argument is flawed', 'the Mandal Commission *invented* OBC reservation'],
                  hint: 'Revisit c11_soc_cbse_10_010 (Srinivas on dominant caste and horizontal stretch) and.',
                  misconception: 'Students often believe the Mandal Commission *invented* OBC reservation.' }
          ],
            remediations: { 'the-mandal-commission-invented-obc': { steps: ['If the student holds this misconception: (1) Assign the "Miller Committee Report (1918, Mysore)" and "First Backward.', 'Singh\'s political calculus).', 'Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_008', difficulty: 'standard',
          question: 'The Women\'s Movement in India refers to the sustained, organised collective.',
          hint: 'Revisit c12_soc_cbse_15_001 (Features) and c12_soc_cbse_15_002 (Types) — specifically the.',
          misconception: 'Students commonly believe the Indian women\'s movement is a single, unified movement led by elite urban women that only.',
          parts: [
                { id: 'a', prompt: 'The textbook states AIWC initially believed \'women\'s welfare\' and \'politics\' were mutually exclusive.', answer: 'The shift occurred',
                  options: ['The shift occurred', 'AIWC always wanted political rights', 'Gandhi forced them'],
                  hint: 'Revisit c12_soc_cbse_15_001 (Features) and c12_soc_cbse_15_002 (Types) — specifically the.',
                  misconception: 'Students commonly believe the Indian women\'s movement is a single, unified movement led by elite urban women that only addresses \'women\'s.' }
          ],
            remediations: { 'students-commonly-believe-the-indian': { steps: ['If the student holds this misconception: Step 1 — Have them create a three-column timeline: Column A = Phase (19th.', 'Fill using textbook pp.124–126.', 'Step 2 — Assign the \'Shah Bano Role-Play\': Student argues *for* the 1986 Act from the perspective of (a) AIMPLB, (b).', 'They must cite specific constitutional articles (14, 25, 44) and the \'principled distance\' concept (c11_ps_cbse_08_005).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_009', difficulty: 'standard',
          question: 'The Environmental Movement in India refers to collective actions.',
          hint: 'If stuck, revisit c11_soc_cbse_08_002 (two-way environment–society relationship) and.',
          misconception: 'Students often think Chipko was “only about saving trees” and NBA was “only against dams,” missing that both movements.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Environmental Movement in India refers to collective actions by communities,',
                  options: ['The Environmental Movement in India refers to collective actions by communities,', 'A social movement is a sustained, organised collective action with shared objectives and', 'Social movements are classified by their goals and methods: **reformist** movements seek', 'Theories of social movements provide analytical frameworks to explain why movements'],
                  hint: 'If stuck, revisit c11_soc_cbse_08_002 (two-way environment–society relationship) and.',
                  misconception: 'Students often think Chipko was “only about saving trees” and NBA was “only against dams,” missing that both movements explicitly framed.' }
          ],
            remediations: { 'chipko-was-only-about-saving': { steps: ['If a student cannot articulate the red-green linkage, have them re-read NCERT Box 8.3 and the Chipko narrative (pages.', 'List three harms caused by cutting it.', 'Who benefited from cutting?', 'Who suffered?” Then ask them to draw a two-column table: “Subsistence Economy” vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_010', difficulty: 'standard',
          question: 'The Workers\' Movement in India refers to the organized collective struggles.',
          hint: 'Revisit c12_soc_cbse_15_003 (Theories of Social Movements) — specifically the \'political.',
          misconception: 'Students often think the Bombay Textile Strike failed *only* because of "worker disunity" or "bad leadership." The.',
          parts: [
                { id: 'a', prompt: 'What was the first trade union established in India, who founded it, and in which year?', answer: 'The first trade union in India was established in April 1918 in Madras by B.P',
                  options: ['The first trade union in India was established in April 1918 in Madras by B.P', 'worker disunity', 'bad leadership', 'AITUC as the first union, or attributing it to Gandhi'],
                  hint: 'Revisit c12_soc_cbse_15_003 (Theories of Social Movements) — specifically the \'political process.',
                  misconception: 'Students often think the Bombay Textile Strike failed *only* because of "worker disunity" or "bad leadership." The deeper error is missing.' },
                { id: 'b', prompt: 'Explain why the All India Trade Union Congress (AITUC) split in 1947 and what new organisation was formed as a result.', answer: 'The AITUC split in 1947',
                  options: ['The AITUC split in 1947', 'worker disunity', 'bad leadership', 'the Bombay Textile Strike failed *only*'],
                  hint: 'Revisit c12_soc_cbse_15_003 (Theories of Social Movements) — specifically the \'political process.',
                  misconception: 'Students often think the Bombay Textile Strike failed *only* because of "worker disunity" or "bad leadership." The deeper error is missing.' },
                { id: 'c', prompt: 'Compare the colonial-era worker protests (pre-1920) with the post-1947 institutionalised trade union phase on THREE dimensions: organisation, ideology, and.', answer: '| Dimension | Colonial-era (pre-1920) | Post-1947 Institutionalised Phase |',
                  options: ['| Dimension | Colonial-era (pre-1920) | Post-1947 Institutionalised Phase |', 'same but bigger', 'worker disunity', 'bad leadership'],
                  hint: 'Revisit c12_soc_cbse_15_003 (Theories of Social Movements) — specifically the \'political process.',
                  misconception: 'Students often think the Bombay Textile Strike failed *only* because of "worker disunity" or "bad leadership." The deeper error is missing.' }
          ],
            remediations: { 'the-bombay-textile-strike-failed': { steps: ['If the student reduces the strike to "disunity," do this 3-step remediation: (1) Show the 1982 *Economic & Political.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_011', difficulty: 'standard',
          question: 'New Social Movements (NSMs) are collective actions that emerged post-1960s.',
          hint: 'Revisit c12_soc_cbse_15_001 (definition/features) and c11_soc_cbse_02_009 (identity.',
          misconception: 'Students equate \'New Social Movement\' with \'recent movement\' — they classify any post-1990 protest (anti-CAA, farmers\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised',
                  options: ['New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised', 'A social movement is a sustained, organised collective action with shared objectives and', 'Social movements are classified by their goals and methods: **reformist** movements seek', 'Theories of social movements provide analytical frameworks to explain why movements'],
                  hint: 'Revisit c12_soc_cbse_15_001 (definition/features) and c11_soc_cbse_02_009 (identity construction).',
                  misconception: 'Students equate \'New Social Movement\' with \'recent movement\' — they classify any post-1990 protest (anti-CAA, farmers\' protest, JNU 2016).' }
          ],
            remediations: { 'students-equate-new-social-movement': { steps: ['Re-read NCERT pages 114-115 (Distinguishing the new social movement from the old social movements) — underline the four.', 'Create a 4-column table with these dimensions as headers; fill rows for Chipko, Dalit movement, Women\'s movement.', 'For each Indian movement, write one sentence explaining why it blurs the binary.', 'Re-attempt Diagnostic Questions 2 and 3. If still stuck, revisit c11_soc_cbse_02_009 (Identity) and c11_soc_cbse_06_002.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
