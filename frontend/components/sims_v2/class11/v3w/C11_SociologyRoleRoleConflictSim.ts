import type { SimDef } from '../../engine/types';
import C11_SociologyRoleRoleConflictSim from '../../../simulations/c6_12/C11_SociologyRoleRoleConflictSim';

/** v3 wrapped master — C11_SociologyRoleRoleConflictSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologyroleroleconflictsim: SimDef = {
    id: 'v3w_c11_sociologyroleroleconflictsim',
    title: 'Functionalist Perspective on Social Processes: System Maintenance and Solidarity',
    subtitle: 'This node covers Durkheim\'s functionalist theory of solidarity, system requirements, and.',
    classLevel: 11, subject: 'sociology', topic: 'Functionalist Perspective on Social Processes: System Maintenance and Solidarity',
    chapters: [],
    nodeIds: ['c11_soc_cbse_06_005', 'c11_soc_cbse_02_004', 'c11_soc_cbse_02_005', 'c11_soc_cbse_02_009', 'c11_soc_cbse_02_010', 'c11_soc_cbse_03_001', 'c11_soc_cbse_03_006', 'c11_soc_cbse_09_005', 'c11_soc_cbse_08_009', 'c11_soc_cbse_06_001', 'c11_soc_cbse_02_002', 'c11_soc_cbse_03_003', 'c11_soc_cbse_06_002', 'c11_soc_cbse_06_003', 'c11_soc_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine your school suddenly cancels all exams, timetables, and rules — would learning still happen?', goal: 'Master Functionalist Perspective on Social Processes: System Maintenance and Solidarity.' },
    discovery: {
        question: 'A tribal community practices shifting cultivation with minimal specialization; a metropolitan city runs on IT, finance, healthcare, and logistics sectors.',
        options: ['Tribal community: mechanical solidarity (shared routines, collective conscience)', 'functionalist perspective = everything in society is good/functional', '"functionalist perspective = everything in society is good/functional'],
        answer: 'Tribal community: mechanical solidarity (shared routines, collective conscience)',
        hook: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional.',
    },
    teaching: [
        { title: 'The functionalist perspective views society.', text: 'The functionalist perspective views society as a self-regulating system where social processes (cooperation, competition, conflict) serve essential functions for system maintenance and solidarity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_06_005', title: 'The functionalist perspective views.',
          scaffold: { problem: 'A village panchayat resolves a land dispute between two families by imposing a compromise: both families keep current plots but agree to a.',
            steps: [
            { text: 'Identify the social context — a village with kinship-based relationships, low division of labour, shared traditions →.' },
            { text: 'Identify the system requirement — the dispute threatens social order; the panchayat\'s compromise restores harmony and.' },
            { text: 'Classify the cooperation — the losing family cooperates *not* voluntarily but due to fear of ostracism (sanction) →.' },
            { text: 'Identify latent function — beyond resolving the dispute, the panchayat\'s authority is reinforced, collective norms are.' },
            { text: 'Verify against functionalist criteria — does this explanation focus on system-level consequences (solidarity, order).', faded: true, blankAnswer: '(a) Mechanical solidarity; (b) Social integration/conflict.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_02_004', title: 'Status is a socially defined position.',
          scaffold: { problem: 'Priya, 28, was born into a Brahmin family in Varanasi. She completed a B.Tech, works as a data scientist in Bengaluru, is married to a.',
            steps: [
            { text: 'Identify all positions Priya currently occupies (simultaneous statuses).' },
            { text: 'Classify each as ascribed (birth/involuntary) or achieved (voluntary/effort).' },
            { text: 'Order the statuses chronologically from birth to now to form the sequence.' },
            { text: 'Analyse interaction: Brahmin family provided cultural capital (emphasis on education, English medium) that facilitated.' },
            { text: 'Verify that the sequence reflects life-course logic (child before student before professional before wife/mother).', faded: true, blankAnswer: '(a) Status set: daughter (A), sister (A), Brahmin (A),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_02_005', title: 'A role is the dynamic, behavioural.',
          scaffold: { problem: 'Analyse the role set of a "Class Monitor" in a CBSE school. Identify at least four distinct roles in this set.',
            steps: [
            { text: 'Identify the status: "Class Monitor" (an achieved status in most schools).' },
            { text: 'List the normative expectations attached to this status from the school\'s perspective: (a) maintain discipline, (b).' },
            { text: 'Recognize each expectation as a distinct role: (a) Disciplinarian, (b) Messenger, (c) Student Representative, (d) Event.' },
            { text: 'Construct intra-role conflict: The teacher asks the monitor to report names of students talking during self-study.' },
            { text: 'Explain why this is intra-role conflict: both roles belong to the SAME status (Class Monitor), not different statuses.' },
            { text: 'Suggest resolution: The monitor might negotiate a "warning first" system with the teacher, showing role.', faded: true, blankAnswer: 'Role set = {Disciplinarian, Messenger, Student.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_02_009', title: 'Identity refers to the distinctive.',
          scaffold: { problem: 'A 17-year-old girl from a rural OBC family in Tamil Nadu moves to Chennai for nursing college.',
            steps: [
            { text: 'Identify all identity sources operating — gender (woman), caste (OBC), class (rural/urban transition), religion.' },
            { text: 'Classify each as ascribed (gender, caste, language, nationality) or achieved (profession, political allegiance, urban.' },
            { text: 'Map reference groups — family/village (traditional norms), college peers/teachers (modern professional norms), Dalit.' },
            { text: 'Analyze status set — daughter, student, activist, granddaughter, future nurse.' },
            { text: 'Show social construction — her "Tamil identity" shifts from caste-marked dialect at home to standardized campus Tamil;.', faded: true, blankAnswer: 'The student navigates a hybrid identity by code-switching.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_02_010', title: 'Functionalism views society as a system.',
          scaffold: { problem: 'Analyse the Indian joint family system from both functionalist and conflict perspectives.',
            steps: [
            { text: 'Identify the social phenomenon — joint family (multi-generational, patrilineal, shared residence/kitchen/property) and.' },
            { text: 'List functionalist core concepts applicable: (a) collective conscience (shared values/rituals), (b) socialisation.' },
            { text: 'Generate functionalist explanation: Joint family integrates members through collective conscience, provides economic.' },
            { text: 'List conflict core concepts applicable: (a) patriarchal control (male head controls property/labour), (b) property.' },
            { text: 'Generate conflict explanation: Joint family concentrates power in senior male (karta), exploits women\'s labour,.' },
            { text: 'Synthesise: Functionalism explains *adaptation* (family loses functions, becomes specialised in emotional support);.', faded: true, blankAnswer: 'Functionalist: Joint family maintains solidarity via.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_03_001', title: 'A social institution is a stable,.',
          scaffold: { problem: 'A village panchayat in Rajasthan historically resolved water disputes through caste elders\' oral verdicts (informal institution).',
            steps: [
            { text: 'The societal need is *conflict resolution over scarce water* — a universal requirement for agrarian survival.' },
            { text: 'Caste elders used *informal sanctions* (social boycott, loss of ritual status, ostracism from community feasts).' },
            { text: 'Functionalist reads the shift as *differentiation* — specialised legal roles replace diffuse kinship roles, increasing.' },
            { text: 'Conflict theorist reads the shift as *centralisation of coercive power* — the state displaces local authority to.' },
            { text: 'Latent dysfunction: Villagers stop maintaining traditional water-harvesting structures (johads) because "the court will.', faded: true, blankAnswer: 'The transition replaces informal, particularistic,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_02_004', title: 'Identify each idea',
          dissect: { specimen: 'Functionalist Perspective on Social Processes: System Maintenance and Solidarity', spots: [
            { id: 's1', label: 'The functionalist perspective views society', prompt: 'Which idea is this? — The functionalist perspective views society as a self-regulating system where social.', answer: 'The functionalist perspective views society', options: ['The functionalist perspective views society', 'Status is a socially defined', 'A role is the dynamic', 'Identity refers to the distinctive'] },
            { id: 's2', label: 'Status is a socially defined', prompt: 'Which idea is this? — Status is a socially defined position in a group or society that carries specific rights,.', answer: 'Status is a socially defined', options: ['Status is a socially defined', 'The functionalist perspective views society', 'A role is the dynamic', 'Identity refers to the distinctive'] },
            { id: 's3', label: 'A role is the dynamic', prompt: 'Which idea is this? — A role is the dynamic, behavioural aspect of a status, consisting of the expected rights,.', answer: 'A role is the dynamic', options: ['A role is the dynamic', 'The functionalist perspective views society', 'Status is a socially defined', 'Identity refers to the distinctive'] },
            { id: 's4', label: 'Identity refers to the distinctive', prompt: 'Which idea is this? — Identity refers to the distinctive characteristics of a person or group that define who.', answer: 'Identity refers to the distinctive', options: ['Identity refers to the distinctive', 'The functionalist perspective views society', 'Status is a socially defined', 'A role is the dynamic'] },
            { id: 's5', label: 'Functionalism views society as a', prompt: 'Which idea is this? — Functionalism views society as a system of interrelated parts (institutions, norms,.', answer: 'Functionalism views society as a', options: ['Functionalism views society as a', 'The functionalist perspective views society', 'Status is a socially defined', 'A role is the dynamic'] },
            { id: 's6', label: 'A social institution is a', prompt: 'Which idea is this? — A social institution is a stable, structured pattern of norms, roles, values, and.', answer: 'A social institution is a', options: ['A social institution is a', 'The functionalist perspective views society', 'Status is a socially defined', 'A role is the dynamic'] }
          ] } }
    ],
    explore: { component: C11_SociologyRoleRoleConflictSim, prompt: 'Explore the interactive — Functionalist Perspective on Social Processes: System Maintenance and Solidarity' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_005', difficulty: 'standard',
          question: 'The functionalist perspective views society as a self-regulating system where.',
          hint: 'Revisit c11_soc_cbse_06_001 (Social Structure as Conceptual Framework) and.',
          misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional.',
          parts: [
                { id: 'a', prompt: 'A tribal community practices shifting cultivation with minimal specialization; a metropolitan city runs on IT, finance, healthcare, and logistics sectors.', answer: 'Tribal community: mechanical solidarity (shared routines, collective conscience)',
                  options: ['Tribal community: mechanical solidarity (shared routines, collective conscience)', 'functionalist perspective = everything in society is good/functional', '"functionalist perspective = everything in society is good/functional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional for the system* with.' },
                { id: 'b', prompt: 'Compare how a functionalist and a conflict theorist would interpret the same phenomenon: "Women in a patriarchal household cooperate by not claiming natal.', answer: 'Functionalist: interprets this as *accommodation*',
                  options: ['Functionalist: interprets this as *accommodation*', 'functionalists see it as good, conflict theorists see it as bad', 'functionalist perspective = everything in society is good/functional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional for the system* with.' }
          ],
            remediations: { 'functionalist-perspective-everything-in-society': { steps: ['If a student equates "functional" with "good," do this 3-step remediation: (1) Write on board: "Function = consequence.', 'Dysfunction = consequence threatening system survival." (2) Use the textbook\'s crime example: "When a brutal crime.', 'Does that mean crime is \'good\'?', 'It means the *system responds* in a way that maintains solidarity." (3) Have student re-read the textbook line: "The.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The functionalist perspective is conservative because it treats existing social arrangements as necessary for system survival." Use the.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'yes, it justifies status quo', 'no, it\'s scientific', 'functionalist perspective = everything in society is good/functional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional for the system* with.' },
                { id: 'b', prompt: 'Compare how a functionalist and a conflict theorist would interpret the same phenomenon: "Women in a patriarchal household cooperate by not claiming natal.', answer: 'Functionalist: interprets this as *accommodation*',
                  options: ['Functionalist: interprets this as *accommodation*', 'functionalists see it as good, conflict theorists see it as bad', 'functionalist perspective = everything in society is good/functional', '"functionalist perspective = everything in society is good/functional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional for the system* with.' }
          ],
            remediations: { 'functionalist-perspective-everything-in-society': { steps: ['If a student equates "functional" with "good," do this 3-step remediation: (1) Write on board: "Function = consequence.', 'Dysfunction = consequence threatening system survival." (2) Use the textbook\'s crime example: "When a brutal crime.', 'Does that mean crime is \'good\'?', 'It means the *system responds* in a way that maintains solidarity." (3) Have student re-read the textbook line: "The.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_004', difficulty: 'standard',
          question: 'Status is a socially defined position in a group or society that carries.',
          hint: 'Revisit c11_soc_cbse_02_001 (Need for Special Sociological Terminology) and the Berger.',
          misconception: 'Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is an achieved-status.',
          parts: [
                { id: 'a', prompt: 'Compare the prestige of a "government school teacher" and a "private corporate lawyer" in contemporary urban India.', answer: 'Prestige is the social evaluation of a position',
                  options: ['Prestige is the social evaluation of a position', 'the teacher is a better person', 'prestige is the same everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is an achieved-status person") rather than to.' }
          ],
            remediations: { 'students-often-treat-ascribed-vs': { steps: ['If the student conflates set and sequence, have them draw a timeline of their own life from birth to now, marking each.', 'If they think ascribed/achieved describes a person, give them a grid: rows = statuses (student, daughter, Hindu,.', 'For prestige, assign a mini-ethnography: ask three adults from different generations/regions "Which job has more.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is an achieved-status.',
          parts: [
                { id: 'a', prompt: 'Compare the prestige of a "government school teacher" and a "private corporate lawyer" in contemporary urban India.', answer: 'Prestige is the social evaluation of a position',
                  options: ['Prestige is the social evaluation of a position', 'the teacher is a better person', 'prestige is the same everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "ascribed vs. achieved" as a binary that applies to whole persons ("She is an achieved-status person") rather than to.' }
          ],
            remediations: { 'students-often-treat-ascribed-vs': { steps: ['If the student conflates set and sequence, have them draw a timeline of their own life from birth to now, marking each.', 'If they think ascribed/achieved describes a person, give them a grid: rows = statuses (student, daughter, Hindu,.', 'For prestige, assign a mini-ethnography: ask three adults from different generations/regions "Which job has more.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_005', difficulty: 'standard',
          question: 'A role is the dynamic, behavioural aspect of a status, consisting of the.',
          hint: 'Revisit c11_soc_cbse_02_004: practice writing your own status set and status sequence;.',
          misconception: 'Students often think "role conflict" means a person feels stressed or busy.',
          parts: [
                { id: 'a', prompt: 'Define "role set" and give one example from a school context.', answer: 'A role set is the array of roles attached to a single status',
                  options: ['A role set is the array of roles attached to a single status', 'teacher, parent, voter', 'role conflict'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "role conflict" means a person feels stressed or busy.' },
                { id: 'b', prompt: 'A male nurse in a government hospital is expected to be "compassionate and gentle" (stereotypically feminine traits) by patients, but "decisive and.', answer: 'This is inter-role conflict (conflict between roles of different statuses)',
                  options: ['This is inter-role conflict (conflict between roles of different statuses)', 'role conflict', '"role conflict" means a person feels stressed or busy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "role conflict" means a person feels stressed or busy.' }
          ],
            remediations: { 'role-conflict-means-a-person': { steps: ['Ask the student to draw a two-column table: left column "Status A expectations", right column "Status B expectations".', 'Have them list three specific, normative expectations for each status from the scenario (e.g., "Employer expects.', 'Ask: "Can both be satisfied simultaneously? If not, why is that a *sociological* problem, not a personal one?"', 'Re-read the Khasi matriliny example in the textbook; identify the two statuses and the incompatible expectations.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "role conflict" means a person feels stressed or busy.',
          parts: [
                { id: 'a', prompt: 'Create a original scenario involving a 22-year-old gig worker (food delivery) who is also a first-generation college student and the eldest son in a rural.', answer: 'Status set: gig worker, college student, eldest son, migrant family member',
                  options: ['Status set: gig worker, college student, eldest son, migrant family member', 'role conflict', '"role conflict" means a person feels stressed or busy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "role conflict" means a person feels stressed or busy.' }
          ],
            remediations: { 'role-conflict-means-a-person': { steps: ['Ask the student to draw a two-column table: left column "Status A expectations", right column "Status B expectations".', 'Have them list three specific, normative expectations for each status from the scenario (e.g., "Employer expects.', 'Ask: "Can both be satisfied simultaneously? If not, why is that a *sociological* problem, not a personal one?"', 'Re-read the Khasi matriliny example in the textbook; identify the two statuses and the incompatible expectations.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_009', difficulty: 'standard',
          question: 'Identity refers to the distinctive characteristics of a person or group that.',
          hint: 'Revisit c11_soc_cbse_02_002 (Social Groups) to clarify how collectivities form, and.',
          misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement.',
          parts: [
                { id: 'a', prompt: 'A student says: "My identity as a \'Brahmin\' is fixed by birth and biology, so it cannot be socially constructed." Using the distinction between ascribed status.', answer: 'While caste is an ascribed status assigned at birth, its meaning, hierarchy, and',
                  options: ['While caste is an ascribed status assigned at birth, its meaning, hierarchy, and', 'ascribed at birth', 'biologically determined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than a.' },
                { id: 'b', prompt: 'Compare how "national identity" and "caste identity" function as sources of identity in modern India.', answer: 'the role of the state in constructing each, (',
                  options: ['the role of the state in constructing each, (', 'What are the sources of your identity?', 'I am hardworking, honest, and shy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than a.' }
          ],
            remediations: { 'students-conflate-identity-with-personality': { steps: ['Ask the student to list five "labels" others use for them (e.g., "son," "Muslim," "Tamil," "poor," "student").', 'For each, identify: Who assigns this label?', 'What group does it connect you to?', 'What expectations come with it?'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Globalization weakens all traditional identities (caste, religion, tribe) and replaces them with a universal consumer identity." Use the.', answer: 'The claim is partially true but sociologically incomplete',
                  options: ['The claim is partially true but sociologically incomplete', 'What are the sources of your identity?', 'I am hardworking, honest, and shy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than a.' },
                { id: 'b', prompt: 'Compare how "national identity" and "caste identity" function as sources of identity in modern India.', answer: 'the role of the state in constructing each, (',
                  options: ['the role of the state in constructing each, (', 'What are the sources of your identity?', 'I am hardworking, honest, and shy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "identity" with "personality" or "self-concept," treating it as an internal, individual achievement rather than a.' }
          ],
            remediations: { 'students-conflate-identity-with-personality': { steps: ['Ask the student to list five "labels" others use for them (e.g., "son," "Muslim," "Tamil," "poor," "student").', 'For each, identify: Who assigns this label?', 'What group does it connect you to?', 'What expectations come with it?'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_02_010', difficulty: 'standard',
          question: 'Functionalism views society as a system of interrelated parts (institutions,.',
          hint: 'Revisit nodes c11_soc_cbse_02_003 (stratification), c11_soc_cbse_02_004 (status),.',
          misconception: 'Students treat functionalism and conflict theory as *opinions* ("optimistic vs.',
          parts: [
                { id: 'a', prompt: 'Apply both perspectives to explain the persistence of khap panchayats (caste councils) in Haryana.', answer: 'Functionalist: (a) What positive functions do khap panchayats perform for social',
                  options: ['Functionalist: (a) What positive functions do khap panchayats perform for social', 'functions', 'conflicts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat functionalism and conflict theory as *opinions* ("optimistic vs.' }
          ],
            remediations: { 'students-treat-functionalism-and-conflict': { steps: ['Ask the student to state the *ontological assumption* of each perspective in one sentence (Functionalism: "Society is a.', 'Give a single social fact (e.g., "Dowry persists despite legal ban").', 'Require the student to generate *two distinct research questions* — one from each assumption — without using "good/bad".', 'Have them identify which *specific concepts* (collective conscience, anomie, surplus value, false consciousness) each.', 'Only then ask for explanations. This forces the shift from moral stance to theoretical lens.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_03_001', difficulty: 'standard',
          question: 'A social institution is a stable, structured pattern of norms, roles, values,.',
          hint: 'Revisit the Class 10 Civics distinction between "rules" (explicit, written) and "norms".',
          misconception: 'Students routinely equate "social institution" with "organisation" (e.g., "My school is an institution" instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A social institution is a stable, structured pattern of norms, roles, values, and',
                  options: ['A social institution is a stable, structured pattern of norms, roles, values, and', 'The functionalist perspective views society as a self-regulating system where social', 'Status is a socially defined position in a group or society that carries specific rights,', 'A role is the dynamic, behavioural aspect of a status, consisting of the expected rights,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely equate "social institution" with "organisation" (e.g., "My school is an institution" instead of "Education is an.' }
          ],
            remediations: { 'students-routinely-equate-social-institution': { steps: ['Ask the student to list five "institutions" they interacted with today (school, bus, family, temple, bank).', 'For each, ask: "If this building/organisation disappeared tomorrow, would the *rules, roles, and expectations*.', 'Guide them to see that the *pattern* (e.g., "teacher teaches, student learns") persists across buildings — *that*.', 'Have them rewrite the definition replacing "institution" with "normative pattern" to break the reification habit.', 'Assign a 100-word paragraph distinguishing "The Indian Parliament" (organisation) from "The Legislature" (institution).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
