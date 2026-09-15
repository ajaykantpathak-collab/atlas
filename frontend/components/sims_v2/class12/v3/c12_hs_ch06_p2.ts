import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch06_p2: SimDef = {
    id: 'v3_c12_hs_ch06_p2',
    title: 'Communication and Extension · Part 2/2',
    subtitle: 'You can\'t order a farmer to change — you can let him see',
    classLevel: 12, subject: 'home_science', topic: 'Communication and Extension · Part 2/2',
    chapters: ['c12_hs_ch06'],
    nodeIds: ['c12_hs_cbse_06_007', 'c12_hs_cbse_06_008', 'c12_hs_cbse_06_009', 'c12_hs_cbse_06_010', 'c12_hs_cbse_06_011', 'c12_hs_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Extension educator', intro: 'Real change in a village doesn\'t arrive by circular — it grows from a demonstration plot and a community\'s own arithmetic.', goal: 'Grasp extension education\'s philosophy — voluntary, experiential, needs-based — versus top-down development.' },
    discovery: {
        question: 'An extension worker can\'t force farmers to stop burning stubble — so she runs a demo plot and lets them calculate the savings themselves. Why does that work better than orders?',
        options: ['Extension is facilitation, not instruction — participation is voluntary, learning happens by doing, and communities solve their own problems; the educator is a catalyst', 'Farmers are stubborn', 'Orders take longer', 'Demos are cheaper'],
        answer: 'Extension is facilitation, not instruction — participation is voluntary, learning happens by doing, and communities solve their own problems; the educator is a catalyst',
        hook: 'The deficit model is the trap — \'teaching illiterate women schemes\' treats people as empty vessels and subsidies as the goal. Extension starts where people are, trusts indigenous knowledge, and measures success in self-reliance, not adoption targets.',
    },
    teaching: [
        { title: 'Community: Definition, Characteristics and Community Development', text: 'A community is a group of people living in a defined geographical area who share common interests, values, norms, and social interactions, and who develop a sense of belonging and collective.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter a sceptical village the extension way: map resources with elders, find the community\'s own felt problem, build a demo plot together — and spot the violations in \'100% adoption\' targets.',
        labels: ['Community: Definition, Characteristics', 'Participatory Rural Appraisal (PRA)', 'Programme Planning in Extension', 'Monitoring and Evaluation', 'Extension Workers: Qualities, Roles', 'Application of Communication'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_007', title: 'Community: Definition, Characteristics and Community Development',
          caseStudy: { intro: 'Imagine you are an extension worker visiting a village where farmers struggle with water scarcity.',
            decisions: [{ prompt: 'A student writes: "A community is any group of people living in the same village." Identify the error in this definition and rewrite.', options: [
                { text: 'Error: The definition confuses "geographical proximity" with "community." A village is a', outcome: 'Error: The definition confuses "geographical proximity" with "community." A village is.' },
                { text: 'geographical proximity', outcome: 'Not quite — Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as.', reveals: 'students-equate-community-with-village' },
                { text: 'community', outcome: 'Not quite — Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as.', reveals: 'students-equate-community-with-village' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_008', title: 'Participatory Rural Appraisal (PRA) and Rapid Rural Appraisal (RRA) Techniques',
          caseStudy: { intro: 'Imagine you are an extension worker visiting a village where farmers are reluctant to adopt a new drought-resistant crop variety.',
            decisions: [{ prompt: 'State the full forms of PRA and RRA, and give one fundamental philosophical difference between them in terms of who owns the knowledge.', options: [
                { text: 'PRA = Participatory Rural Appraisal', outcome: 'PRA = Participatory Rural Appraisal; RRA = Rapid Rural Appraisal.' },
                { text: 'PRA is just faster RRA', outcome: 'Not quite — Students equate PRA with "using participatory tools like mapping and ranking." They miss that PRA.', reveals: 'students-equate-pra-with-using' },
                { text: 'We did PRA because we made a social map with villagers', outcome: 'Not quite — Students equate PRA with "using participatory tools like mapping and ranking." They miss that PRA.', reveals: 'students-equate-pra-with-using' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_009', title: 'Programme Planning in Extension: Steps and Principles',
          caseStudy: { intro: 'Imagine you are an extension worker assigned to a village where farmers are struggling with declining wheat yields due to soil degradation. Where do you begin?',
            decisions: [{ prompt: 'What is the FIRST step in the extension programme planning cycle, and why must it precede objective setting?', options: [
                { text: 'The first step is **situation analysis** (also called needs assessment or baseline survey)', outcome: 'The first step is **situation analysis** (also called needs assessment or baseline survey).' },
                { text: 'setting objectives', outcome: 'Not quite — **Misconception:** "Programme planning is writing a document (proposal/report) that gets approved.', reveals: 'misconception-programme-planning-is-writing' },
                { text: 'choosing teaching methods', outcome: 'Not quite — **Misconception:** "Programme planning is writing a document (proposal/report) that gets approved.', reveals: 'misconception-programme-planning-is-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_010', title: 'Monitoring and Evaluation of Extension Programmes',
          caseStudy: { intro: 'Imagine you are an extension worker who just completed a 6-month nutrition awareness programme for rural women.',
            decisions: [{ prompt: 'Define monitoring and evaluation in the context of extension programmes. State one key difference in their timing and purpose.', options: [
                { text: 'Monitoring is the continuous, routine tracking of programme activities and outputs during', outcome: 'Monitoring is the continuous, routine tracking of programme activities and outputs during.' },
                { text: 'monitoring happens at the end', outcome: 'Not quite — Students treat "monitoring" and "evaluation" as interchangeable synonyms, writing "M&E" as a single.', reveals: 'students-treat-monitoring-and-evaluation' },
                { text: 'swaps the timing (e', outcome: 'Not quite — Students treat "monitoring" and "evaluation" as interchangeable synonyms, writing "M&E" as a single.', reveals: 'students-treat-monitoring-and-evaluation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_011', title: 'Extension Workers: Qualities, Roles and Training',
          caseStudy: { intro: 'Imagine you are a newly appointed extension worker visiting a tribal village to promote kitchen gardening for nutritional security.',
            decisions: [{ prompt: 'What are the three broad categories of qualities an extension worker must possess, as per the NCERT framework?', options: [
                { text: 'The three broad categories are: (1) Personal qualities (e.g., empathy, honesty,', outcome: 'The three broad categories are: (1) Personal qualities (e.g., empathy, honesty, patience), (2).' },
                { text: 'knowledge of agriculture', outcome: 'Not quite — Students often write that an extension worker\'s primary quality is "deep technical knowledge of the.', reveals: 'students-often-write-that-an' },
                { text: 'lists only technical skills (e', outcome: 'Not quite — Students often write that an extension worker\'s primary quality is "deep technical knowledge of the.', reveals: 'students-often-write-that-an' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_012', title: 'Application of Communication and Extension in Home Science Programmes',
          caseStudy: { intro: 'Imagine you are a Home Science extension worker assigned to reduce anaemia among adolescent girls in a tribal block. Where do you begin?',
            decisions: [{ prompt: 'Define "Application of Communication and Extension in Home Science Programmes" in one sentence, naming at least three distinct components.', options: [
                { text: 'Correct answer: It is the systematic integration of communication models (e.g., SMCRE),', outcome: 'Correct answer: It is the systematic integration of communication models (e.g., SMCRE), extension.' },
                { text: 'teaching methods', outcome: 'Not quite — Students often believe that "application" means selecting *one* teaching method (e.g.', reveals: 'application-means-selecting-one-teaching' },
                { text: 'audio-visual aids', outcome: 'Not quite — Students often believe that "application" means selecting *one* teaching method (e.g.', reveals: 'application-means-selecting-one-teaching' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Communication and Extension · Part 2/2', spots: [
            { id: 's1', label: 'Programme Planning in Extension Steps and Principles', prompt: 'Which idea is this? — Programme planning in extension is a systematic, participatory process of identifying.', answer: 'Programme Planning in Extension Steps and Principles', options: ['Programme Planning in Extension Steps and Principles', 'Monitoring and Evaluation of Extension Programmes', 'Extension Workers Qualities Roles and Training'] },
            { id: 's2', label: 'Monitoring and Evaluation of Extension Programmes', prompt: 'Which idea is this? — Monitoring is the systematic, ongoing collection and analysis of information during.', answer: 'Monitoring and Evaluation of Extension Programmes', options: ['Monitoring and Evaluation of Extension Programmes', 'Programme Planning in Extension Steps and Principles', 'Extension Workers Qualities Roles and Training'] },
            { id: 's3', label: 'Extension Workers Qualities Roles and Training', prompt: 'Which idea is this? — Extension workers are trained professionals who act as a vital link between.', answer: 'Extension Workers Qualities Roles and Training', options: ['Extension Workers Qualities Roles and Training', 'Programme Planning in Extension Steps and Principles', 'Monitoring and Evaluation of Extension Programmes'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college NSS team plans a \'Scientific Goat Rearing\' camp in a tribal block: three days of PowerPoint lectures on breeds and feed charts. On day one the hall is half-empty and a village woman mutters that nobody asked what the goat-keepers actually need.',
            decisions: [{ prompt: 'What do the principles of extension education say went wrong?', options: [
                { text: 'Everything structural — the topic was officer-driven not need-driven, the classroom format ignored the oral, hands-on culture, and one-way slides violated participation; fix it with a needs assessment first, demonstrations in the local dialect, and experienced local keepers as co-trainers.', outcome: 'Extension is voluntary — learners can walk out, so the worker must earn relevance; the failure here is pedagogy contradicting the philosophy, not bad logistics.' },
                { text: 'The problem was scheduling — shift the lectures to evenings when villagers are free.', outcome: 'Timing treats a design failure as logistics: even a full hall of slide-watchers is one-way communication; participation and felt need are what make extension stick, not attendance hours.', reveals: 'logistics-was-the-problem' },
                { text: 'Make attendance mandatory through the panchayat so the information reaches everyone.', outcome: 'Extension is voluntary by definition — compelled attendance turns the facilitator into an authority figure and kills the trust that makes communities adopt change.', reveals: 'compulsion-equals-reach' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'You can now separate extension from command — and see why a well-built road nobody asked for fails where a facilitated choice succeeds.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_007', difficulty: 'standard',
          question: 'A community is a group of people living in a defined geographical area who.',
          hint: 'Revisit c12_hs_cbse_06_001 "Extension: Definition, Philosophy and Objectives" — focus.',
          misconception: 'Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as a *spatial* category.',
          parts: [
                { id: 'a', prompt: 'Explain why a WhatsApp group of 200 Class 12 students from different cities preparing for CUET is NOT a community in the sociological sense, even though they.', answer: 'A WhatsApp group lacks: (1) a defined geographical territory',
                  options: ['A WhatsApp group lacks: (1) a defined geographical territory', 'it is a community', 'geographical boundaries define the intervention area'],
                  hint: 'Revisit c12_hs_cbse_06_001 "Extension: Definition, Philosophy and Objectives" — focus on the.',
                  misconception: 'Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as a *spatial* category only.' },
                { id: 'b', prompt: 'An extension worker enters a tribal hamlet and immediately forms a "Women\'s Self-Help Group" without first understanding the existing kinship-based.', answer: 'Violated principle: "Start from where the people are" / "Respect existing social',
                  options: ['Violated principle: "Start from where the people are" / "Respect existing social', 'SHGs always empower women', 'geographical boundaries define the intervention area'],
                  hint: 'Revisit c12_hs_cbse_06_001 "Extension: Definition, Philosophy and Objectives" — focus on the.',
                  misconception: 'Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as a *spatial* category only.' },
                { id: 'c', prompt: 'Compare a "rural community" and an "urban slum community" on four characteristics: (a) territorial boundedness, (b) homogeneity of occupation, (c) nature.', answer: '| Characteristic | Rural Community | Urban Slum Community |',
                  options: ['| Characteristic | Rural Community | Urban Slum Community |', 'both are poor so same', 'geographical boundaries define the intervention area'],
                  hint: 'Revisit c12_hs_cbse_06_001 "Extension: Definition, Philosophy and Objectives" — focus on the.',
                  misconception: 'Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as a *spatial* category only.' }
          ],
            remediations: { 'students-equate-community-with-village': { steps: ['Ask the student to list three groups they belong to (family, school, sports team, online gaming clan).', 'For each, check: Do they share territory? Do they interact face-to-face? Do they have a "we-feeling"?', 'Show that "school" has territory + interaction + we-feeling = community; "online clan" has interaction + we-feeling but.', 'Re-read NCERT Class 12 Chapter 6 section "Characteristics of Community" — highlight the five characteristics and tick.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as a *spatial* category.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Community development is successful when the extension worker delivers the maximum number of government schemes to the village." Use.', answer: 'The statement reflects a "delivery/top-down" paradigm, not community development',
                  options: ['The statement reflects a "delivery/top-down" paradigm, not community development', 'more schemes = more development', 'geographical boundaries define the intervention area'],
                  hint: 'Revisit c12_hs_cbse_06_001 "Extension: Definition, Philosophy and Objectives" — focus on the.',
                  misconception: 'Students equate "community" with "village" or "neighbourhood" — i.e., they treat community as a *spatial* category only.' }
          ],
            remediations: { 'students-equate-community-with-village': { steps: ['Ask the student to list three groups they belong to (family, school, sports team, online gaming clan).', 'For each, check: Do they share territory? Do they interact face-to-face? Do they have a "we-feeling"?', 'Show that "school" has territory + interaction + we-feeling = community; "online clan" has interaction + we-feeling but.', 'Re-read NCERT Class 12 Chapter 6 section "Characteristics of Community" — highlight the five characteristics and tick.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_008', difficulty: 'standard',
          question: 'Participatory Rural Appraisal (PRA) is a family of approaches and methods that.',
          hint: 'Revisit c12_hs_cbse_06_007\'s section on "Community Dynamics: Power, Gender, and.',
          misconception: 'Students equate PRA with "using participatory tools like mapping and ranking." They miss that PRA is defined.',
          parts: [
                { id: 'a', prompt: 'State the full forms of PRA and RRA, and give one fundamental philosophical difference between them in terms of who owns the knowledge generated.', answer: 'PRA = Participatory Rural Appraisal',
                  options: ['PRA = Participatory Rural Appraisal', 'PRA is just faster RRA', 'We did PRA because we made a social map with villagers'],
                  hint: 'Revisit c12_hs_cbse_06_007\'s section on "Community Dynamics: Power, Gender, and Exclusion" and list.',
                  misconception: 'Students equate PRA with "using participatory tools like mapping and ranking." They miss that PRA is defined by *behavior and attitudes*.' },
                { id: 'b', prompt: 'A student says: "RRA and PRA are basically the same thing — both use tools like mapping and ranking to get information quickly from villages." Explain why this.', answer: 'The statement confuses *tools* with *paradigm*',
                  options: ['The statement confuses *tools* with *paradigm*', 'We did PRA because we made a social map with villagers'],
                  hint: 'Revisit c12_hs_cbse_06_007\'s section on "Community Dynamics: Power, Gender, and Exclusion" and list.',
                  misconception: 'Students equate PRA with "using participatory tools like mapping and ranking." They miss that PRA is defined by *behavior and attitudes*.' },
                { id: 'c', prompt: 'You are facilitating a social mapping exercise in a village. Women participants draw the anganwadi center but omit the liquor shop; men include the liquor shop.', answer: 'Do not merge maps',
                  options: ['Do not merge maps', 'combine into one accurate map', 'We did PRA because we made a social map with villagers'],
                  hint: 'Revisit c12_hs_cbse_06_007\'s section on "Community Dynamics: Power, Gender, and Exclusion" and list.',
                  misconception: 'Students equate PRA with "using participatory tools like mapping and ranking." They miss that PRA is defined by *behavior and attitudes*.' }
          ],
            remediations: { 'students-equate-pra-with-using': { steps: ['Revisit c12_hs_cbse_06_007 (Community: Definition, Characteristics and Community Dynamics) to recall how power, gender.', 'Watch a 10-minute video of a real PRA facilitation (e.g., "PRA in India: The MYRADA experience") and note every time.', 'Re-attempt Diagnostic Question 3 — if you still want to merge maps, repeat Step 2 with a focus on the facilitator\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_009', difficulty: 'standard',
          question: 'Programme planning in extension is a systematic, participatory process.',
          hint: 'If stuck on "why participation matters," revisit c12_hs_cbse_06_001 (Extension.',
          misconception: '**Misconception:** "Programme planning is writing a document (proposal/report) that gets approved, then implemented.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The principle of participation means the extension worker asks villagers what they want, then designs the programme alone." Explain why this.', answer: 'Participation means **shared decision-making at every stage**',
                  options: ['Participation means **shared decision-making at every stage**', 'informing/consulting', 'empowering/partnering'],
                  hint: 'If stuck on "why participation matters," revisit c12_hs_cbse_06_001 (Extension Philosophy).',
                  misconception: '**Misconception:** "Programme planning is writing a document (proposal/report) that gets approved, then implemented unchanged." **Why it\'s.' },
                { id: 'b', prompt: 'An extension worker plans a nutrition programme for tribal women.', answer: '**Inadequate steps:** (1) **Situation analysis**',
                  options: ['**Inadequate steps:** (1) **Situation analysis**', 'A wrong answer focusing only on', 'misses the structural planning failure'],
                  hint: 'If stuck on "why participation matters," revisit c12_hs_cbse_06_001 (Extension Philosophy).',
                  misconception: '**Misconception:** "Programme planning is writing a document (proposal/report) that gets approved, then implemented unchanged." **Why it\'s.' },
                { id: 'c', prompt: 'Compare the "Blueprint approach" (rigid, pre-determined plan) and "Learning process approach" (flexible, adaptive) in extension programme planning.', answer: 'The **learning process approach** aligns with flexibility',
                  options: ['The **learning process approach** aligns with flexibility', 'blueprint'],
                  hint: 'If stuck on "why participation matters," revisit c12_hs_cbse_06_001 (Extension Philosophy).',
                  misconception: '**Misconception:** "Programme planning is writing a document (proposal/report) that gets approved, then implemented unchanged." **Why it\'s.' }
          ],
            remediations: { 'misconception-programme-planning-is-writing': { steps: ['**Revisit c12_hs_cbse_06_008 (PRA/RRA):** Re-learn how participatory tools (transect walk, matrix ranking) generate.', '**Revisit c12_hs_cbse_06_001 (Extension Philosophy):** Re-read the "bottom-up, empowerment" philosophy — planning is.', '**Do this re-diagnostic:** Take a real village issue (e.g., stubble burning).', 'Write a 4-step plan *with* feedback loops (monitoring → replanning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_010', difficulty: 'standard',
          question: 'Monitoring is the systematic, ongoing collection and analysis of information.',
          hint: 'Revisit c12_hs_cbse_06_009 (Programme Planning in Extension) and practice writing SMART.',
          misconception: 'Students treat "monitoring" and "evaluation" as interchangeable synonyms, writing "M&E" as a single undifferentiated.',
          parts: [
                { id: 'a', prompt: 'A village-level extension programme distributes iron-folic acid tablets to pregnant women monthly.', answer: 'This is monitoring',
                  options: ['This is monitoring', 'evaluation', 'outcome'],
                  hint: 'Revisit c12_hs_cbse_06_009 (Programme Planning in Extension) and practice writing SMART objectives.',
                  misconception: 'Students treat "monitoring" and "evaluation" as interchangeable synonyms, writing "M&E" as a single undifferentiated activity.' }
          ],
            remediations: { 'students-treat-monitoring-and-evaluation': { steps: ['If a student confuses monitoring/evaluation: (1) Have them create a two-column table with headers "During.', '(2) Ask them to label each card as monitoring or evaluation and state the indicator type.', '(3) Re-diagnose with Diagnostic Question 2 — they must correctly identify the tablet distribution as monitoring/output.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_011', difficulty: 'standard',
          question: 'Extension workers are trained professionals who act as a vital link between.',
          hint: 'Revisit node c12_hs_cbse_06_001 (Extension: Definition, Philosophy and Objectives) and.',
          misconception: 'Students often write that an extension worker\'s primary quality is "deep technical knowledge of the subject (e.g.',
          parts: [
                { id: 'a', prompt: 'What are the three broad categories of qualities an extension worker must possess, as per the NCERT framework?', answer: 'The three broad categories are: (1) Personal qualities (e.g., empathy, honesty,',
                  options: ['The three broad categories are: (1) Personal qualities (e.g., empathy, honesty,', 'knowledge of agriculture', 'lists only technical skills (e'],
                  hint: 'Revisit node c12_hs_cbse_06_001 (Extension: Definition, Philosophy and Objectives) and node.',
                  misconception: 'Students often write that an extension worker\'s primary quality is "deep technical knowledge of the subject (e.g., agriculture, nutrition)".' }
          ],
            remediations: { 'students-often-write-that-an': { steps: ['If a student holds this misconception, assign them to re-read the "Qualities of an Extension Worker" section in the.', 'Then ask them to rewrite their definition of an extension worker incorporating this evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_012', difficulty: 'standard',
          question: 'Application of Communication and Extension in Home Science Programmes refers.',
          hint: 'If stuck, revisit the programme planning cycle (c12_hs_cbse_06_009) and practice writing.',
          misconception: 'Students often believe that "application" means selecting *one* teaching method (e.g., demonstration) and *one* aid.',
          parts: [
                { id: 'a', prompt: 'You are designing a Home Science extension programme on "Safe Drinking Water Practices" for a flood-prone village.', answer: 'Correct answer: 1',
                  options: ['Correct answer: 1', 'prepare pamphlets', 'arrange a meeting', 'application'],
                  hint: 'If stuck, revisit the programme planning cycle (c12_hs_cbse_06_009) and practice writing one SMART.',
                  misconception: 'Students often believe that "application" means selecting *one* teaching method (e.g., demonstration) and *one* aid (e.g., poster) for.' }
          ],
            remediations: { 'application-means-selecting-one-teaching': { steps: ['If the student cannot integrate components into a coherent programme plan: 1.', '**Revisit c12_hs_cbse_06_009 (Programme Planning)** – Re-do the 6-step planning cycle for a simple case (e.g.', '**Revisit c12_hs_cbse_06_003 (SMCRE Model)** – Map each element (Source, Message, Channel, Receiver, Effect) for that.', '**Revisit c12_hs_cbse_06_008 (PRA)** – Practice one PRA tool (e.g., seasonal calendar) with peers to internalize.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
