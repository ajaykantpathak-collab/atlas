import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch07_p1: SimDef = {
    id: 'v3_c12_psy_ch07_p1',
    title: 'Social Influence and Group Processes · Part 1/2',
    subtitle: 'Same stadium, same scream — still not a group',
    classLevel: 12, subject: 'psychology', topic: 'Social Influence and Group Processes · Part 1/2',
    chapters: ['c12_psy_ch07'],
    nodeIds: ['c12_psy_cbse_07_001', 'c12_psy_cbse_07_002', 'c12_psy_cbse_07_003', 'c12_psy_cbse_07_004', 'c12_psy_cbse_07_005', 'c12_psy_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Group psychologist', intro: 'A project team where one member\'s silence stalls everyone is a group; a concert audience isn\'t. The difference is structure.', goal: 'Apply the five criteria of a group — and distinguish it from crowd, team and audience.' },
    discovery: {
        question: 'Thousands scream for the same band at a concert — and if your neighbour leaves, nothing changes for you. Why isn\'t that a group?',
        options: ['No interdependence or roles — a crowd shares a moment, not a fate; a group needs mutual dependence, roles, norms and a felt \'we\'', 'Too many people', 'They came alone', 'Noise isn\'t shared'],
        answer: 'No interdependence or roles — a crowd shares a moment, not a fate; a group needs mutual dependence, roles, norms and a felt \'we\'',
        hook: '\'All teams are groups, but not all groups are teams\' — a family is a group without complementary skills or mutual accountability; a project where the leader does everything is a group failing to be a team. Structure and interdependence, not proximity, make the group.',
    },
    teaching: [
        { title: 'Nature of Groups: Definition, Characteristics and Distinction from Crowds, Teams and Audiences', text: 'A group is an organised system of two or more individuals who interact and are interdependent, share common motives and goals, have a set of defined role relationships among members, and adhere.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort real collections by the five criteria: label a metro queue, a student council, spectators and a cricket XI — then design the minimal-group experiment that creates bias from nothing.',
        labels: ['Nature of Groups: Definition,', 'Why People Join Groups', 'Group Formation: Proximity, Similarity', 'Tuckman\'s Stages of Group', 'Group Structure: Roles, Norms,', 'Groupthink (Janis): Causes, Consequences'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_001', title: 'Nature of Groups: Definition, Characteristics and Distinction from Crowds, Teams and Audiences',
          caseStudy: { intro: 'Imagine you\'re at a rock concert: thousands of people scream for the same band, yet if the person next to you leaves, your experience barely changes — that\'s.',
            decisions: [{ prompt: 'List the five salient characteristics of a group as defined in the NCERT Class 12 Psychology textbook.', options: [
                { text: 'The five characteristics are: (1) A social unit of two or more individuals who perceive', outcome: 'The five characteristics are: (1) A social unit of two or more individuals who perceive themselves.' },
                { text: 'common goals', outcome: 'Not quite — Students equate "group" with any physical gathering and use "team" and "group" interchangeably.', reveals: 'students-equate-group-with-any' },
                { text: 'interaction', outcome: 'Not quite — Students equate "group" with any physical gathering and use "team" and "group" interchangeably.', reveals: 'students-equate-group-with-any' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_002', title: 'Why People Join Groups: Security, Status, Self-esteem and Goal Achievement',
          caseStudy: { intro: 'Imagine you\'re deciding whether to join your school\'s debate team, a neighbourhood cricket group, or a study circle for board exams.',
            decisions: [{ prompt: 'List the six reasons people join groups according to NCERT Class 12 Psychology Chapter 7.', options: [
                { text: 'The six reasons are: (1) Security, (2) Status, (3) Self-esteem, (4) Satisfaction of', outcome: 'The six reasons are: (1) Security, (2) Status, (3) Self-esteem, (4) Satisfaction of psychological.' },
                { text: 'knowledge and information', outcome: 'Not quite — Students conflate "Status" and "Self-esteem" as the same thing because both involve "feeling good.', reveals: 'students-conflate-status-and-self' },
                { text: 'status', outcome: 'Not quite — Students conflate "Status" and "Self-esteem" as the same thing because both involve "feeling good.', reveals: 'students-conflate-status-and-self' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_003', title: 'Group Formation: Proximity, Similarity and Common Motives and Goals',
          caseStudy: { intro: 'Imagine you start at a new coaching centre in Delhi for JEE preparation.',
            decisions: [{ prompt: 'Define group formation and name the three factors that facilitate it according to NCERT Class 12 Psychology.', options: [
                { text: 'Group formation is the process by', outcome: 'Group formation is the process by which individuals become an organised, interdependent system with.' },
                { text: 'shared norms', outcome: 'Not quite — Students often believe that **similarity alone is sufficient for group formation** and write.', reveals: 'similarity-alone-is-sufficient-for' },
                { text: 'People with similar interests form groups', outcome: 'Not quite — Students often believe that **similarity alone is sufficient for group formation** and write.', reveals: 'similarity-alone-is-sufficient-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_004', title: 'Tuckman\'s Stages of Group Development: Forming, Storming, Norming, Performing and Adjourning',
          caseStudy: { intro: 'Imagine you are selected for a 5-member committee to organize your school’s annual fest.',
            decisions: [{ prompt: 'A student writes: “Forming is when the group starts working on the task.” Is this statement accurate? Explain in one sentence.', options: [
                { text: 'No', outcome: 'No. Forming is characterized by orientation, testing, and dependence — members focus on “Who are.' },
                { text: 'forming the group', outcome: 'Not quite — Students often believe Tuckman’s stages are a **strict, invariant sequence** that every group.', reveals: 'tuckman-s-stages-are-a' },
                { text: 'forming the work', outcome: 'Not quite — Students often believe Tuckman’s stages are a **strict, invariant sequence** that every group.', reveals: 'tuckman-s-stages-are-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_005', title: 'Group Structure: Roles, Norms, Status and Cohesiveness',
          caseStudy: { intro: 'Imagine you just joined your school\'s newly formed debate team.',
            decisions: [{ prompt: 'Define \'norms\' in the context of group structure and give one example of an explicit norm and one example of an implicit norm from.', options: [
                { text: 'Norms are expected standards of behaviour and beliefs established, agreed upon, and', outcome: 'Norms are expected standards of behaviour and beliefs established, agreed upon, and enforced.' },
                { text: 'rules made by the leader', outcome: 'Not quite — Students conflate \'roles\' and \'norms\' — writing "the norm of the class monitor is to maintain.', reveals: 'students-conflate-roles-and-norms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_006', title: 'Groupthink (Janis): Causes, Consequences and Prevention Strategies',
          caseStudy: { intro: 'Imagine your school\'s student council unanimously decides to cancel the annual cultural festival because "everyone agrees it\'s too risky" — but no one actually.',
            decisions: [{ prompt: 'Define groupthink in one sentence using Janis\'s core idea about the override of realistic appraisal.', options: [
                { text: 'Groupthink is a mode of thinking in', outcome: 'Groupthink is a mode of thinking in which a cohesive group\'s desire for unanimity overrides its.' },
                { text: 'groupthink is when a group agrees on everything', outcome: 'Not quite — Students often believe groupthink is simply "when a group makes a bad decision" or "when everyone.', reveals: 'groupthink-is-simply-when-a' },
                { text: 'when a group makes a bad decision', outcome: 'Not quite — Students often believe groupthink is simply "when a group makes a bad decision" or "when everyone.', reveals: 'groupthink-is-simply-when-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Same coding club, two new members: Asha joins because \'nobody messes with the club\'s members,\' while Dev joins because \'the seniors here can teach me real projects.\'',
            decisions: [{ prompt: 'Which distinct group-joining motives are operating?', options: [
                { text: 'Security for Asha — the group buffers threat — and knowledge/information for Dev — the group grants access he\'d lack alone; same membership, different needs, which is why one group can recruit on several motives at once.', outcome: 'The chapter\'s six-need framework: identical joining behaviour can be powered by different needs, so reading motives from the group instead of the member mislabels both.' },
                { text: 'Both joined for goal achievement — the club helps both get what they want.', outcome: 'That flattens two distinct needs into one — protection from threat and access to knowledge are separate motives in the framework; \'wanting something\' is too loose to do the analysis.', reveals: 'all-motives-are-goals' },
                { text: 'Both joined for status — club membership elevates them socially.', outcome: 'Neither described prestige — Asha described safety, Dev described learning; status is external recognition, and assuming every join is about looking good misses the six-way map.', reveals: 'every-join-is-status' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell a gathering from a group — and see that \'we\' is built from interdependence, not headcount.',
            decisions: [{ prompt: 'What comes next? Social Influence and Group Processes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Influence and Group Processes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_001', difficulty: 'standard',
          question: 'A group is an organised system of two or more individuals who interact and are.',
          hint: 'Revisit Class 11 Sociology Chapter 2 "Social Groups" (node c11_soc_cbse_02_002) — focus.',
          misconception: 'Students equate "group" with any physical gathering and use "team" and "group" interchangeably.',
          parts: [
                { id: 'a', prompt: 'Explain why a crowd gathered at a roadside accident is NOT a group, using at least three specific criteria from the group definition.', answer: 'A roadside crowd fails three criteria: (1) No interdependence',
                  options: ['A roadside crowd fails three criteria: (1) No interdependence', 'they are just watching'],
                  hint: 'Revisit Class 11 Sociology Chapter 2 "Social Groups" (node c11_soc_cbse_02_002) — focus on the.',
                  misconception: 'Students equate "group" with any physical gathering and use "team" and "group" interchangeably.' },
                { id: 'b', prompt: 'Compare and contrast a **group** and a **team** on the dimensions of: (a) performance dependence, (b) leadership responsibility, and (c) synergy.', answer: 'performance dependence, (',
                  options: ['performance dependence, (', 'teams have leaders, groups don\'t'],
                  hint: 'Revisit Class 11 Sociology Chapter 2 "Social Groups" (node c11_soc_cbse_02_002) — focus on the.',
                  misconception: 'Students equate "group" with any physical gathering and use "team" and "group" interchangeably.' }
          ],
            remediations: { 'students-equate-group-with-any': { steps: ['**Re-read the definition as a 5-item checklist** — write each criterion on a flashcard with a one-word cue: Identity.', '**Build a 4-column comparison table** (Group, Crowd, Team, Audience) with rows for each criterion; fill it using NCERT.', '**Self-test with 5 daily scenes**: family dinner, metro queue, cricket match players, match spectators, WhatsApp study.', 'For each, tick the checklist and name the category.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_002', difficulty: 'standard',
          question: 'People join groups to fulfill fundamental psychological and social needs.',
          hint: 'Revisit c11_psy_cbse_08_003 (Types of Motives: Psychosocial and Personal Motives) — focus.',
          misconception: 'Students conflate "Status" and "Self-esteem" as the same thing because both involve "feeling good about the group.".',
          parts: [
                { id: 'a', prompt: 'A student joins the school\'s environmental club primarily because "everyone respects members of that club and it looks good on college applications." Which TWO.', answer: 'The student is fulfilling Status and Self-esteem',
                  options: ['The student is fulfilling Status and Self-esteem', 'status', 'self-esteem', 'differentiate'],
                  hint: 'Revisit c11_psy_cbse_08_003 (Types of Motives: Psychosocial and Personal Motives) — focus on the.',
                  misconception: 'Students conflate "Status" and "Self-esteem" as the same thing because both involve "feeling good about the group." They write: "Joining.' },
                { id: 'b', prompt: 'Riya lives in a high-crime neighbourhood. She joins a resident welfare association (RWA) that organises night patrols.', answer: 'Riya\'s primary motivation is Security',
                  options: ['Riya\'s primary motivation is Security', 'security', 'goal achievement'],
                  hint: 'Revisit c11_psy_cbse_08_003 (Types of Motives: Psychosocial and Personal Motives) — focus on the.',
                  misconception: 'Students conflate "Status" and "Self-esteem" as the same thing because both involve "feeling good about the group." They write: "Joining.' },
                { id: 'c', prompt: 'Compare and contrast "Satisfaction of psychological and social needs" with "Self-esteem" as reasons for joining groups.', answer: '"Psychological and social needs" encompasses belongingness (need to affiliate,',
                  options: ['"Psychological and social needs" encompasses belongingness (need to affiliate,', 'I am not alone', 'I am valuable because I belong to THIS group', 'differentiate'],
                  hint: 'Revisit c11_psy_cbse_08_003 (Types of Motives: Psychosocial and Personal Motives) — focus on the.',
                  misconception: 'Students conflate "Status" and "Self-esteem" as the same thing because both involve "feeling good about the group." They write: "Joining.' }
          ],
            remediations: { 'students-conflate-status-and-self': { steps: ['Have the student create a two-column table: Column A = "What OTHERS think of my group" (Status), Column B = "What.', 'Give 5 concrete group examples (IIT alumni association, local gym, religious congregation, gaming clan, NSS unit).', 'For each, student writes one entry in Column A and one in Column B.', 'Teacher checks for distinct entries — if Column A and B are identical for any group, student re-reads the textbook\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_003', difficulty: 'standard',
          question: 'Group formation is the process through which individuals come together.',
          hint: 'Revisit node c12_psy_cbse_07_001 (Nature of Groups) and create a comparison table.',
          misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with.',
          parts: [
                { id: 'a', prompt: 'Define group formation and name the three factors that facilitate it according to NCERT Class 12 Psychology.', answer: 'Group formation is the process by',
                  options: ['Group formation is the process by', 'shared norms', 'People with similar interests form groups', 'shared norms" or "roles" as formation factors'],
                  hint: 'Revisit node c12_psy_cbse_07_001 (Nature of Groups) and create a comparison table: "Collection.',
                  misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with similar interests.' },
                { id: 'b', prompt: 'Explain in your own words why similarity leads to liking and group formation, using both psychological explanations given in the textbook.', answer: 'Similarity leads to liking through two mechanisms: (1) Cognitive consistency',
                  options: ['Similarity leads to liking through two mechanisms: (1) Cognitive consistency', 'birds of a feather flock together', 'People with similar interests form groups'],
                  hint: 'Revisit node c12_psy_cbse_07_001 (Nature of Groups) and create a comparison table: "Collection.',
                  misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with similar interests.' },
                { id: 'c', prompt: 'A group of five Class 12 students from different schools meet at a weekend robotics workshop in Bangalore.', answer: 'Proximity (shared workstation) was necessary for initial contact',
                  options: ['Proximity (shared workstation) was necessary for initial contact', 'People with similar interests form groups', 'common goals caused initial contact', 'swaps these roles (e'],
                  hint: 'Revisit node c12_psy_cbse_07_001 (Nature of Groups) and create a comparison table: "Collection.',
                  misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with similar interests.' }
          ],
            remediations: { 'similarity-alone-is-sufficient-for': { steps: ['If a student makes this error: (1) Have them re-read the NCERT definition of a group (mutual interdependence, roles.', '(2) Give them three micro-scenarios: (a) two cricket fans chatting at a match, (b) neighbours forming a WhatsApp group.', 'Ask them to tick which characteristics are present in each.', '(3) Explicitly contrast: "Attraction ≠ Group." (4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — if they still misattribute.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Common motives and goals are the most important factor for group formation because without them, proximity and similarity only create.', answer: 'The claim is largely correct',
                  options: ['The claim is largely correct', 'People with similar interests form groups'],
                  hint: 'Revisit node c12_psy_cbse_07_001 (Nature of Groups) and create a comparison table: "Collection.',
                  misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with similar interests.' },
                { id: 'b', prompt: 'Create a realistic scenario (Indian context, 150-200 words) where all three formation factors operate sequentially to form a group that later exhibits.', answer: 'A good answer will describe: (1) Proximity',
                  options: ['A good answer will describe: (1) Proximity', 'People with similar interests form groups'],
                  hint: 'Revisit node c12_psy_cbse_07_001 (Nature of Groups) and create a comparison table: "Collection.',
                  misconception: 'Students often believe that **similarity alone is sufficient for group formation** and write answers like "People with similar interests.' }
          ],
            remediations: { 'similarity-alone-is-sufficient-for': { steps: ['If a student makes this error: (1) Have them re-read the NCERT definition of a group (mutual interdependence, roles.', '(2) Give them three micro-scenarios: (a) two cricket fans chatting at a match, (b) neighbours forming a WhatsApp group.', 'Ask them to tick which characteristics are present in each.', '(3) Explicitly contrast: "Attraction ≠ Group." (4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — if they still misattribute.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_004', difficulty: 'standard',
          question: 'Tuckman\'s Stages of Group Development is a five-stage model (Forming, Storming.',
          hint: 'Revisit c12_psy_cbse_07_001 (Nature of Groups) and c12_psy_cbse_07_003 (Group Formation).',
          misconception: 'Students often believe Tuckman’s stages are a **strict, invariant sequence** that every group follows in lockstep.',
          parts: [
                { id: 'a', prompt: 'A project team of six Class 12 students has been working together for three months. They have clear roles, shared norms, and high output.', answer: 'The group has re-entered **Forming**',
                  options: ['The group has re-entered **Forming**', 'may go back and forth through the various stages', 'still Performing'],
                  hint: 'Revisit c12_psy_cbse_07_001 (Nature of Groups) and c12_psy_cbse_07_003 (Group Formation) to clarify.',
                  misconception: 'Students often believe Tuckman’s stages are a **strict, invariant sequence** that every group follows in lockstep (Forming → Storming →.' }
          ],
            remediations: { 'tuckman-s-stages-are-a': { steps: ['Re-read the NCERT paragraph on “Stages of Group Formation” (page 124-125) and highlight the two sentences that.', 'Create a 2×2 table: rows = “Linear assumption” vs.', '“NCERT reality”; columns = “What student writes” vs.', 'Practice with the Activity 7.1 scenario: simulate a 5-minute planning committee with 4 peers, record the sequence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_005', difficulty: 'standard',
          question: 'Group structure refers to the relatively stable pattern of relationships among.',
          hint: 'Revisit c12_psy_cbse_07_001 — specifically the bullet points under "Groups have the.',
          misconception: 'Students conflate \'roles\' and \'norms\' — writing "the norm of the class monitor is to maintain silence" instead of "the.',
          parts: [
                { id: 'a', prompt: 'A student says: "Status in a group is always earned through hard work and talent." Using the concepts of ascribed and achieved status, explain why this.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'unfair privilege'],
                  hint: 'Revisit c12_psy_cbse_07_001 — specifically the bullet points under "Groups have the following.',
                  misconception: 'Students conflate \'roles\' and \'norms\' — writing "the norm of the class monitor is to maintain silence" instead of "the ROLE of class.' },
                { id: 'b', prompt: 'In a 6-member project group, three members consistently do 80% of the work while three others contribute minimally.', answer: 'Weak/missing elements: (1) NORMS',
                  options: ['Weak/missing elements: (1) NORMS', 'low cohesiveness', 'social loafing'],
                  hint: 'Revisit c12_psy_cbse_07_001 — specifically the bullet points under "Groups have the following.',
                  misconception: 'Students conflate \'roles\' and \'norms\' — writing "the norm of the class monitor is to maintain silence" instead of "the ROLE of class.' }
          ],
            remediations: { 'students-conflate-roles-and-norms': { steps: ['Have student create a 2×2 table with columns "Role vs Norm" and "Ascribed vs Achieved Status", rows "Definition".', 'Use the \'Community Service Club\' diagnostic (Q6) as re-teaching — student must redo Week 1-4 plan but this time.', 'Give a 3-min oral quiz: "A group has high cohesiveness but makes terrible decisions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_006', difficulty: 'standard',
          question: 'Groupthink is a psychological phenomenon identified by Irving Janis in which.',
          hint: 'If stuck, revisit c12_psy_cbse_07_005 (Group Structure) focusing on the "Cohesiveness".',
          misconception: 'Students often believe groupthink is simply "when a group makes a bad decision" or "when everyone agrees." The specific.',
          parts: [
                { id: 'a', prompt: 'Define groupthink in one sentence using Janis\'s core idea about the override of realistic appraisal.', answer: 'Groupthink is a mode of thinking in',
                  options: ['Groupthink is a mode of thinking in', 'groupthink is when a group agrees on everything', 'when a group makes a bad decision', 'when everyone agrees'],
                  hint: 'If stuck, revisit c12_psy_cbse_07_005 (Group Structure) focusing on the "Cohesiveness" subsection.',
                  misconception: 'Students often believe groupthink is simply "when a group makes a bad decision" or "when everyone agrees." The specific error is conflating.' },
                { id: 'b', prompt: 'A student says, "Groupthink is just another word for teamwork — when a team works well together, they think alike." Explain why this statement is incorrect.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'when a group makes a bad decision', 'when everyone agrees'],
                  hint: 'If stuck, revisit c12_psy_cbse_07_005 (Group Structure) focusing on the "Cohesiveness" subsection.',
                  misconception: 'Students often believe groupthink is simply "when a group makes a bad decision" or "when everyone agrees." The specific error is conflating.' },
                { id: 'c', prompt: 'Compare and contrast groupthink with group polarization (covered in c12_psy_cbse_07_011).', answer: 'Groupthink is driven by **social motivation to maintain cohesion**',
                  options: ['Groupthink is driven by **social motivation to maintain cohesion**', 'when a group makes a bad decision', 'when everyone agrees'],
                  hint: 'If stuck, revisit c12_psy_cbse_07_005 (Group Structure) focusing on the "Cohesiveness" subsection.',
                  misconception: 'Students often believe groupthink is simply "when a group makes a bad decision" or "when everyone agrees." The specific error is conflating.' }
          ],
            remediations: { 'groupthink-is-simply-when-a': { steps: ['Re-read NCERT Box 7.1 and create a two-column table: left column = "Antecedent Condition / Symptom", right column.', 'Watch a 10-minute video on the Bay of Pigs invasion (classic Janis case) and map each of the 8 symptoms to specific.', 'Complete a practice exercise: given three short vignettes (one groupthink, one group polarization, one healthy debate).', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4 with a peer, explaining your reasoning aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
