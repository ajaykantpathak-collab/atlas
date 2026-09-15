import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch02_p1: SimDef = {
    id: 'v3_c11_soc_ch02_p1',
    title: 'Terms, Concepts and Their Use in Sociology · Part 1/2',
    subtitle: 'Learn why a shared label is not a shared life.',
    classLevel: 11, subject: 'sociology', topic: 'Terms, Concepts and Their Use in Sociology · Part 1/2',
    chapters: ['c11_soc_ch02'],
    nodeIds: ['c11_soc_cbse_02_001', 'c11_soc_cbse_02_002', 'c11_soc_cbse_02_003', 'c11_soc_cbse_02_004', 'c11_soc_cbse_02_005', 'c11_soc_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist auditing which collections deserve the name \'group\'', intro: 'A thousand strangers share the label \'Delhiite\' — they also share nothing else; the group begins where interaction begins.', goal: 'Distinguish social groups from categories and use status, role and institution precisely.' },
    discovery: {
        question: 'Teenagers share an age and a world of problems — so they\'re a social group?',
        options: ['No — it\'s a statistical category; a group needs interaction, roles and a sense of \'we\', not just a common label', 'Yes — a shared label makes a group', 'Yes — they\'re even a primary group', 'No — only families count as groups'],
        answer: 'No — it\'s a statistical category; a group needs interaction, roles and a sense of \'we\', not just a common label',
        hook: 'A status outlives its holder — the principal\'s chair carries rights and duties no matter who sits in it; the concept is a slot, not a person.',
    },
    teaching: [
        { title: 'Need for Special Sociological Terminology and Concepts as Analytical Tools', text: 'Sociological terminology refers to the precise, technical vocabulary developed by sociologists to analytically dissect familiar social phenomena—such as family, caste, or status—by stripping away.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate quasi-groups from real ones, then test whether contested concepts like \'caste\' are too unstable for scientific study.',
        labels: ['Need for Special Sociological', 'Social Groups: Definition, Characteristics', 'Social Stratification: Caste, Class', 'Status: Ascribed Versus Achieved', 'Role: Definition, Role Set,', 'Social Control: Formal'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_001', title: 'Need for Special Sociological Terminology and Concepts as Analytical Tools',
          caseStudy: { intro: 'Imagine you overhear two Class 11 students arguing: "Everyone knows what \'family\' means—why do sociologists need a special definition?" Begin by asking: "If.',
            decisions: [{ prompt: 'A student says: "Sociology studies society, which we all live in, so we already know the words.', options: [
                { text: 'The flaw is equating *familiarity with social life* with *analytical understanding of', outcome: 'The flaw is equating *familiarity with social life* with *analytical understanding of social.' },
                { text: 'sociological concepts are just fancy academic words for things we already know', outcome: 'Not quite — Students believe "sociological concepts are just fancy academic words for things we already know.".', reveals: 'sociological-concepts-are-just-fancy' },
                { text: 'Define status', outcome: 'Not quite — Students believe "sociological concepts are just fancy academic words for things we already know.".', reveals: 'sociological-concepts-are-just-fancy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_002', title: 'Social Groups: Definition, Characteristics and Types (Primary, Secondary, Reference, In/Out-Groups)',
          caseStudy: { intro: 'Imagine you are standing at a busy Metro station during rush hour — hundreds of people around you, but do they form a *social group*?',
            decisions: [{ prompt: 'Define a quasi-group and give two examples from everyday life that are NOT mentioned in the textbook.', options: [
                { text: 'A quasi-group is an aggregate of people who share a physical or social space but lack', outcome: 'A quasi-group is an aggregate of people who share a physical or social space but lack persistent.' },
                { text: 'a crowd at a concert is a social group', outcome: 'Not quite — Students often think **any collection of people with a common label is a social group** — e.g.', reveals: 'any-collection-of-people-with' },
                { text: 'teenagers', outcome: 'Not quite — Students often think **any collection of people with a common label is a social group** — e.g.', reveals: 'any-collection-of-people-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_003', title: 'Social Stratification: Caste, Class and Gender as Systems of Inequality',
          caseStudy: { intro: 'Imagine two 17-year-olds in Delhi: Rohan, born to a Dalit sanitation-worker family in a resettlement colony, and Priya, born to an upper-caste corporate lawyer.',
            decisions: [{ prompt: 'Define social stratification in one sentence and name the four historical systems of stratification mentioned in the textbook.', options: [
                { text: 'Social stratification refers to the existence of structured inequalities between groups', outcome: 'Social stratification refers to the existence of structured inequalities between groups in society.' },
                { text: 'rich and poor', outcome: 'Not quite — Students often think "caste is only a rural/traditional phenomenon" and "class is only about.', reveals: 'caste-is-only-a-rural' },
                { text: 'upper and lower class', outcome: 'Not quite — Students often think "caste is only a rural/traditional phenomenon" and "class is only about.', reveals: 'caste-is-only-a-rural' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_004', title: 'Status: Ascribed Versus Achieved Status, Status Set and Status Sequence',
          caseStudy: { intro: 'Imagine a newborn baby in a village in Rajasthan: the child is instantly a daughter, a Rajput, a granddaughter, and a citizen — none of which she chose.',
            decisions: [{ prompt: 'Define ascribed status and give two examples from Indian society that are not caste or gender.', options: [
                { text: 'Ascribed status is a social position assigned at birth or received involuntarily,', outcome: 'Ascribed status is a social position assigned at birth or received involuntarily, independent.' },
                { text: 'doctor', outcome: 'Not quite — Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is.', reveals: 'students-often-treat-ascribed-vs' },
                { text: 'graduate', outcome: 'Not quite — Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is.', reveals: 'students-often-treat-ascribed-vs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_005', title: 'Role: Definition, Role Set, Role Taking and Role Conflict',
          caseStudy: { intro: 'Imagine a 17-year-old Class 11 student named Priya who is a daughter, a student, a captain of the school debate team, and a part-time tutor for her younger.',
            decisions: [{ prompt: 'Define "role set" and give one example from a school context.', options: [
                { text: 'A role set is the array of roles attached to a single status', outcome: 'A role set is the array of roles attached to a single status. Example: A teacher\'s status has.' },
                { text: 'teacher, parent, voter', outcome: 'Not quite — Students often think "role conflict" means a person feels stressed or busy.', reveals: 'role-conflict-means-a-person' },
                { text: 'role conflict', outcome: 'Not quite — Students often think "role conflict" means a person feels stressed or busy.', reveals: 'role-conflict-means-a-person' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_006', title: 'Social Control: Formal and Informal Mechanisms and Agencies',
          caseStudy: { intro: 'Imagine you\'re at a family wedding where your cousin announces they\'re marrying someone from a different caste.',
            decisions: [{ prompt: 'Define social control in your own words and list two agencies each of formal and informal social control.', options: [
                { text: 'Social control is the process by', outcome: 'Social control is the process by which society regulates behaviour to maintain order, using formal.' },
                { text: 'police and family', outcome: 'Not quite — Students believe formal social control always involves the police/courts and informal control only.', reveals: 'formal-social-control-always-involves' },
                { text: 'only lists "police and family" without distinguishing the codified vs', outcome: 'Not quite — Students believe formal social control always involves the police/courts and informal control only.', reveals: 'formal-social-control-always-involves' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing sociology exam answers, a student defines status as \'your position in society\' and calls \'teenagers\' a primary social group \'because they share an age and problems.\'',
            decisions: [{ prompt: 'What does sociological precision demand instead?', options: [
                { text: 'Upgrade both concepts: status isn\'t a loose \'position\' — it\'s a structurally defined slot carrying normative rights and duties, existing independently of who fills it, forming status sets. And a social group needs persistent patterned interaction, shared belonging and structure — \'teenagers\' is a statistical category (quasi-group) lacking mutual awareness until organised into something like a youth club.', outcome: 'His answers gain analytical teeth: sociological terms do theoretical work that everyday labels don\'t — a category isn\'t a group until interaction and structure exist.' },
                { text: 'Keep the everyday senses — sociology\'s terms are just formal names for familiar things.', outcome: 'The point of the terminology is rupture from common sense: memorising the label without the structural content misses what the concept explains.', reveals: 'fancy-words-for-familiar-things' },
                { text: 'Accept \'teenagers\' as a group — shared age creates shared identity.', outcome: 'A label isn\'t a bond: without patterned interaction, norms and collective consciousness, an age bracket stays a category — group formation is something extra.', reveals: 'category-equals-group' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'A status is a position with normative rights and duties; the person occupying it is replaceable — that\'s what makes it structural.',
            decisions: [{ prompt: 'What comes next? Terms, Concepts and Their Use in Sociology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Terms, Concepts and Their Use in Sociology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_001', difficulty: 'standard',
          question: 'Sociological terminology refers to the precise, technical vocabulary developed.',
          hint: 'Revisit Chapter 1\'s "Sociology and Common Sense" section (c11_soc_cbse_01_001) and redo.',
          misconception: 'Students believe "sociological concepts are just fancy academic words for things we already know." They answer exam.',
          parts: [
                { id: 'a', prompt: 'In the NCERT text, Berger (1976) writes: "We are so well acquainted with the social institutions that surround us that we cannot see them clearly and.', answer: 'The paradox is that intimate familiarity creates *invisibility of structure*',
                  options: ['The paradox is that intimate familiarity creates *invisibility of structure*', 'we take things for granted', 'sociological concepts are just fancy academic words for things we already know', 'Define status'],
                  hint: 'Revisit Chapter 1\'s "Sociology and Common Sense" section (c11_soc_cbse_01_001) and redo Activity 1.',
                  misconception: 'Students believe "sociological concepts are just fancy academic words for things we already know." They answer exam questions like "Define.' }
          ],
            remediations: { 'sociological-concepts-are-just-fancy': { steps: ['Give the student two descriptions of the same scenario—a middle-class Delhi family hiring a domestic worker.', 'Ask: "Which description helps you *explain* why the worker has no paid leave, cannot unionise, and is called \'didi\' not.', 'Demonstrate that Description B\'s concepts (class, caste, gender, emotional labour, fictive kinship) *generate* the.', 'Assign: rewrite three everyday statements (e.g., "Our school has good discipline") into sociological language using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "sociological concepts are just fancy academic words for things we already know." They answer exam.',
          parts: [
                { id: 'a', prompt: 'Create a new sociological concept (neologism or recombination) to analyse a contemporary Indian phenomenon not fully captured by existing terms in Chapter 2.', answer: 'Example: **"Digital Caste Capital"**',
                  options: ['Example: **"Digital Caste Capital"**', 'sociological concepts are just fancy academic words for things we already know', 'Define status', 'Status is your position in society'],
                  hint: 'Revisit Chapter 1\'s "Sociology and Common Sense" section (c11_soc_cbse_01_001) and redo Activity 1.',
                  misconception: 'Students believe "sociological concepts are just fancy academic words for things we already know." They answer exam questions like "Define.' }
          ],
            remediations: { 'sociological-concepts-are-just-fancy': { steps: ['Give the student two descriptions of the same scenario—a middle-class Delhi family hiring a domestic worker.', 'Ask: "Which description helps you *explain* why the worker has no paid leave, cannot unionise, and is called \'didi\' not.', 'Demonstrate that Description B\'s concepts (class, caste, gender, emotional labour, fictive kinship) *generate* the.', 'Assign: rewrite three everyday statements (e.g., "Our school has good discipline") into sociological language using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_002', difficulty: 'standard',
          question: 'A social group is a collection of individuals who engage in persistent.',
          hint: 'Revisit Chapter 1 (Sociology and Society) and node c11_soc_cbse_02_001 — focus.',
          misconception: 'Students often think **any collection of people with a common label is a social group** — e.g., "teenagers".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a classroom of 40 students is a secondary group while a close-knit circle of four friends within that classroom is a primary.', answer: 'The classroom is secondary because: (i) interaction is formal/impersonal',
                  options: ['The classroom is secondary because: (i) interaction is formal/impersonal', 'classroom is large, friend circle is small', 'teenagers', 'Delhiites'],
                  hint: 'Revisit Chapter 1 (Sociology and Society) and node c11_soc_cbse_02_001 — focus on Berger\'s quote.',
                  misconception: 'Students often think **any collection of people with a common label is a social group** — e.g., "teenagers", "Delhiites", "Hindus".' },
                { id: 'b', prompt: 'A village panchayat introduces a new rule: "All households must segregate waste; non-compliance attracts a fine." Identify whether the panchayat is functioning.', answer: 'The panchayat acts as a **secondary group** here',
                  options: ['The panchayat acts as a **secondary group** here', 'villagers know each other', 'teenagers', 'Delhiites'],
                  hint: 'Revisit Chapter 1 (Sociology and Society) and node c11_soc_cbse_02_001 — focus on Berger\'s quote.',
                  misconception: 'Students often think **any collection of people with a common label is a social group** — e.g., "teenagers", "Delhiites", "Hindus".' },
                { id: 'c', prompt: 'Compare and contrast "in-group/out-group" dynamics with "reference group" dynamics.', answer: 'In-group/out-group is about **membership and boundary** ("us vs',
                  options: ['In-group/out-group is about **membership and boundary** ("us vs', 'groups we like', 'teenagers', 'Delhiites'],
                  hint: 'Revisit Chapter 1 (Sociology and Society) and node c11_soc_cbse_02_001 — focus on Berger\'s quote.',
                  misconception: 'Students often think **any collection of people with a common label is a social group** — e.g., "teenagers", "Delhiites", "Hindus".' }
          ],
            remediations: { 'any-collection-of-people-with': { steps: ['**Confront the label trap**: Ask the student to list 5 "groups" they belong to.', 'For each, demand evidence of the six characteristics — if missing, re-label as quasi-group.', '**Use the "WhatsApp test"**: A social group has a group chat with history, norms, admins, and "we-feeling";.', '**Map their own life**: Have them draw a diagram with three circles — Primary, Secondary, Quasi — and place 10.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_003', difficulty: 'standard',
          question: 'Social stratification is the systematic ranking of social groups into.',
          hint: 'Revisit c11_soc_cbse_02_002 Activity 2 (identifying caste/class/women/tribe/villager.',
          misconception: 'Students often think "caste is only a rural/traditional phenomenon" and "class is only about money." They miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social stratification is the systematic ranking of social groups into a hierarchy based',
                  options: ['Social stratification is the systematic ranking of social groups into a hierarchy based', 'Sociological terminology refers to the precise, technical vocabulary developed by', 'A social group is a collection of individuals who engage in persistent, patterned', 'Status is a socially defined position in a group or society that carries specific rights,'],
                  hint: 'Revisit c11_soc_cbse_02_002 Activity 2 (identifying caste/class/women/tribe/villager groups and.',
                  misconception: 'Students often think "caste is only a rural/traditional phenomenon" and "class is only about money." They miss that caste operates in urban.' }
          ],
            remediations: { 'caste-is-only-a-rural': { steps: ['Ask the student to list three urban, middle-class settings where caste still matters (e.g., matrimonial ads, rental.', 'Have them read the A.R. Desai quote in the textbook about urbanization challenging but not erasing caste.', 'Use the "life-chances" concept: compare two professionals with same income but different castes — trace differences.', 'Assign a mini-ethnography: interview one person about how their caste/class/gender affected their career choice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_004', difficulty: 'standard',
          question: 'Status is a socially defined position in a group or society that carries.',
          hint: 'Revisit c11_soc_cbse_02_001 (Need for Special Sociological Terminology) and the Berger.',
          misconception: 'Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is an achieved-status.',
          parts: [
                { id: 'a', prompt: 'Compare the prestige of a "government school teacher" and a "private corporate lawyer" in contemporary urban India.', answer: 'Prestige is the social evaluation of a position',
                  options: ['Prestige is the social evaluation of a position', 'the teacher is a better person', 'prestige is the same everywhere', 'says "the teacher is a better person" confuses prestige with personal virtue'],
                  hint: 'Revisit c11_soc_cbse_02_001 (Need for Special Sociological Terminology) and the Berger quote: "We.',
                  misconception: 'Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is an achieved-status person") rather than.' }
          ],
            remediations: { 'students-often-treat-ascribed-vs': { steps: ['If the student conflates set and sequence, have them draw a timeline of their own life from birth to now, marking each.', 'If they think ascribed/achieved describes a person, give them a grid: rows = statuses (student, daughter, Hindu.', 'For prestige, assign a mini-ethnography: ask three adults from different generations/regions "Which job has more.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_005', difficulty: 'standard',
          question: 'A role is the dynamic, behavioural aspect of a status, consisting of the.',
          hint: 'Revisit c11_soc_cbse_02_004: practice writing your own status set and status sequence.',
          misconception: 'Students often think "role conflict" means a person feels stressed or busy.',
          parts: [
                { id: 'a', prompt: 'Define "role set" and give one example from a school context.', answer: 'A role set is the array of roles attached to a single status',
                  options: ['A role set is the array of roles attached to a single status', 'teacher, parent, voter', 'role conflict', 'roles from different statuses like "teacher, parent, voter'],
                  hint: 'Revisit c11_soc_cbse_02_004: practice writing your own status set and status sequence; then.',
                  misconception: 'Students often think "role conflict" means a person feels stressed or busy.' },
                { id: 'b', prompt: 'A male nurse in a government hospital is expected to be "compassionate and gentle" (stereotypically feminine traits) by patients, but "decisive and.', answer: 'This is inter-role conflict (conflict between roles of different statuses)',
                  options: ['This is inter-role conflict (conflict between roles of different statuses)', 'role conflict', '"role conflict" means a person feels stressed or busy'],
                  hint: 'Revisit c11_soc_cbse_02_004: practice writing your own status set and status sequence; then.',
                  misconception: 'Students often think "role conflict" means a person feels stressed or busy.' }
          ],
            remediations: { 'role-conflict-means-a-person': { steps: ['Ask the student to draw a two-column table: left column "Status A expectations", right column "Status B expectations".', 'Have them list three specific, normative expectations for each status from the scenario (e.g., "Employer expects.', 'Ask: "Can both be satisfied simultaneously? If not, why is that a *sociological* problem, not a personal one?"', 'Re-read the Khasi matriliny example in the textbook; identify the two statuses and the incompatible expectations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_006', difficulty: 'standard',
          question: 'Social control refers to the social processes, techniques, and strategies.',
          hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify primary vs.',
          misconception: 'Students believe formal social control always involves the police/courts and informal control only happens in villages.',
          parts: [
                { id: 'a', prompt: 'Define social control in your own words and list two agencies each of formal and informal social control.', answer: 'Social control is the process by',
                  options: ['Social control is the process by', 'police and family', 'only lists "police and family" without distinguishing the codified vs'],
                  hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify primary vs.',
                  misconception: 'Students believe formal social control always involves the police/courts and informal control only happens in villages or families.' }
          ],
            remediations: { 'formal-social-control-always-involves': { steps: ['Ask the student to list 5 rules they followed today (e.g., wore uniform, submitted assignment, stopped at red light.', 'For each, identify: Was the rule written in a handbook/law? Who enforces it? What happens if violated?', 'Classify each as formal (written, institutional enforcer, prescribed penalty) or informal (unwritten, interpersonal.', 'Have them find one example where formal and informal control overlap (e.g., ragging: banned by UGC regulation [formal].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
