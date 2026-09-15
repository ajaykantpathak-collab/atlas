import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch06_p1: SimDef = {
    id: 'v3_c11_soc_ch06_p1',
    title: 'Social Structure, Stratification and Social Processes in Society · Part 1/2',
    subtitle: 'See hierarchy as many ladders crossing, not one economic ladder.',
    classLevel: 11, subject: 'sociology', topic: 'Social Structure, Stratification and Social Processes in Society · Part 1/2',
    chapters: ['c11_soc_ch06'],
    nodeIds: ['c11_soc_cbse_06_001', 'c11_soc_cbse_06_002', 'c11_soc_cbse_06_003', 'c11_soc_cbse_06_004', 'c11_soc_cbse_06_005', 'c11_soc_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist redrawing a school as positions, not rules', intro: 'Uniform codes aren\'t the school\'s structure — student, teacher, principal and the expectations between them are.', goal: 'Define social structure relationally and stratification as multi-dimensional.' },
    discovery: {
        question: 'Fix poverty and caste and gender inequality will fade automatically — is stratification really just economics?',
        options: ['No — stratification runs on several axes at once; gender cuts across every caste and class, so money alone can\'t level it', 'Yes — class is the master key', 'Yes — poverty causes all hierarchy', 'No — because caste no longer exists'],
        answer: 'No — stratification runs on several axes at once; gender cuts across every caste and class, so money alone can\'t level it',
        hook: 'And \'competition is human nature\' is a naturalistic fallacy — cooperation and competition are both socially organised; no society runs on instinct.',
    },
    teaching: [
        { title: 'Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction', text: 'Social structure is the patterned, relatively stable arrangement of social institutions, statuses, roles, and norms that organises human interaction into predictable regularities across time and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Draw a school\'s structure as statuses and roles (not rules), then test whether \'socialism failed because it fought human nature\' survives sociology.',
        labels: ['Social Structure as', 'Social Stratification: Structured Inequalities', 'Three Forms of Social', 'Individual Agency and Social', 'Functionalist Perspective on Social', 'Conflict Perspective on Social'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_001', title: 'Social Structure as a Conceptual Framework: Patterned Arrangements of Human Interaction',
          caseStudy: { intro: 'Imagine you walk into your school every morning — you know exactly where to sit, when to speak, how to address teachers, and what happens if you break these.',
            decisions: [{ prompt: 'Define social structure in your own words, distinguishing it from (a) a physical building, (b) a single social interaction, and (c) culture.', options: [
                { text: 'Social structure refers to the enduring, patterned arrangements of statuses, roles,', outcome: 'Social structure refers to the enduring, patterned arrangements of statuses, roles, institutions.' },
                { text: 'architectural metaphor', outcome: 'Not quite — Students conflate social structure with "social rules" or "customs" — treating it as a list of dos.', reveals: 'students-conflate-social-structure-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_002', title: 'Social Stratification: Structured Inequalities of Class, Caste and Gender',
          caseStudy: { intro: 'Imagine two Class 11 students: Rohan from an upper-caste, affluent urban family with college-educated parents, and Priya from a Dalit, landless rural family.',
            decisions: [{ prompt: 'Define social stratification in your own words, and explain why the statement "inequality exists because some people work harder than.', options: [
                { text: 'Social stratification refers to a system where society ranks categories of people in a', outcome: 'Social stratification refers to a system where society ranks categories of people in a hierarchy.' },
                { text: 'work hard', outcome: 'Not quite — **Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and.', reveals: 'misconception-stratification-is-just-about' },
                { text: 'differences in income', outcome: 'Not quite — **Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and.', reveals: 'misconception-stratification-is-just-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_003', title: 'Three Forms of Social Advantage: Life Chances, Status and Political Influence',
          caseStudy: { intro: 'Imagine two Class 11 students: Rohan, whose father is a senior bureaucrat living in Lutyens\' Delhi, and Amit, whose father is a daily-wage construction worker.',
            decisions: [{ prompt: 'Define \'life chances\' as used in sociology, and give two examples beyond wealth and income.', options: [
                { text: 'Life chances are all material advantages improving quality of life, including health', outcome: 'Life chances are all material advantages improving quality of life, including health access, job.' },
                { text: 'wealth', outcome: 'Not quite — Students treat the three forms as interchangeable synonyms for "privilege" or "power." They write.', reveals: 'students-treat-the-three-forms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_004', title: 'Individual Agency and Social Structure: Constraint and Action (Marx)',
          caseStudy: { intro: 'Imagine a food-delivery rider in Bengaluru: she chooses which orders to accept (agency), yet the algorithm, fuel costs, and platform penalties (structure).',
            decisions: [{ prompt: 'State Marx\'s famous formulation about the relationship between human agency and historical conditions in a single sentence.', options: [
                { text: 'Correct answer: "Men make their own history, but they do not make it as they please', outcome: 'Correct answer: "Men make their own history, but they do not make it as they please; they do not.' },
                { text: 'A wrong answer that says', outcome: 'Not quite — Students read "not under circumstances of their own choosing" and conclude Marx is a hard.', reveals: 'students-read-not-under-circumstances' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_005', title: 'Functionalist Perspective on Social Processes: System Maintenance and Solidarity',
          caseStudy: { intro: 'Imagine your school suddenly cancels all exams, timetables, and rules — would learning still happen?',
            decisions: [{ prompt: 'Define mechanical solidarity and organic solidarity in one sentence each, using Durkheim\'s terminology.', options: [
                { text: 'Mechanical solidarity: social cohesion based on similarity of beliefs, values, and', outcome: 'Mechanical solidarity: social cohesion based on similarity of beliefs, values, and routines.' },
                { text: 'mechanical solidarity means people work like machines', outcome: 'Not quite — Students often think "functionalist perspective = everything in society is good/functional." They.', reveals: 'functionalist-perspective-everything-in-society' },
                { text: 'mechanical', outcome: 'Not quite — Students often think "functionalist perspective = everything in society is good/functional." They.', reveals: 'functionalist-perspective-everything-in-society' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_006', title: 'Conflict Perspective on Social Processes: Inequality and Dominant-Subordinate Relations',
          caseStudy: { intro: 'Imagine a domestic worker in Delhi who "cooperates" with her employer by working 12-hour days without overtime pay.',
            decisions: [{ prompt: 'State the one-sentence core assumption that distinguishes the conflict perspective from the functionalist perspective regarding social.', options: [
                { text: 'Correct: The conflict perspective assumes social order is maintained by dominant groups', outcome: 'Correct: The conflict perspective assumes social order is maintained by dominant groups imposing.' },
                { text: 'conflict perspective says society is always fighting', outcome: 'Not quite — Students equate "conflict perspective" with "society is always in open battle" and miss that its.', reveals: 'students-equate-conflict-perspective-with' },
                { text: 'conflict as inherent', outcome: 'Not quite — Students equate "conflict perspective" with "society is always in open battle" and miss that its.', reveals: 'students-equate-conflict-perspective-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_001', title: 'A real-world call',
          caseStudy: { intro: 'An entrepreneur can make a product cheaper using a supplier with poor labour practices — winning on price — or a fair supplier whose higher costs may sink the business before it starts.',
            decisions: [{ prompt: 'Does \'just starting out\' excuse the cheap choice?', options: [
                { text: 'Yes — survive first, fix ethics at scale', outcome: 'The survival argument; but \'later\' rarely arrives — the supply chain you start with tends to be the one you keep.' },
                { text: 'No — ethics aren\'t a premium feature', outcome: 'The integrity argument; risks the business never existing to be ethical at all.' },
                { text: 'Choose fair AND compete on something besides price', outcome: 'The differentiation answer — \'ethically made\' is itself a market; harder, but it makes the choice sustainable.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Asked \'what is a school\'s social structure?\', a student lists \'uniform rules, attendance, homework deadlines.\' On stratification he adds: \'fix income inequality and caste and gender gaps disappear — reservations should be income-based only.\'',
            decisions: [{ prompt: 'What do structure and stratification actually describe?', options: [
                { text: 'Move from rules to relations: structure is the patterned arrangement of statuses (student, teacher, principal), attached roles, institutions (exams, houses) and resource distribution (lab access, counsellors) — the rules are just the normative surface. And stratification isn\'t economics alone: caste operates through exclusion, stigma and ritual hierarchy — a rich Dalit still faces temple-entry denial; class, caste and gender are autonomous though intersecting axes.', outcome: 'He redescribes the school structurally — positions and resources, not wall-posted rules — and sees why income-only policy can\'t reach status hierarchies.' },
                { text: 'Keep the rules list — structure is the system\'s dos and don\'ts.', outcome: 'Rules are what people should do; structure is how positions are arranged and resources flow — the \'building metaphor\' confuses the sign for the edifice.', reveals: 'structure-is-rules' },
                { text: 'Support income-only reservation — economic fix cures all inequality.', outcome: 'Stratification has independent bases: wealth doesn\'t buy out stigma — a poor Brahmin keeps ritual status a rich Dalit is denied; the axes intersect but don\'t collapse.', reveals: 'stratification-is-only-economic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Structure isn\'t the rulebook — it\'s the arrangement of positions that the rules merely serve.',
            decisions: [{ prompt: 'What comes next? Social Structure, Stratification and Social Processes in Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Structure, Stratification and Social Processes in Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_001', difficulty: 'standard',
          question: 'Social structure is the patterned, relatively stable arrangement of social.',
          hint: 'Revisit "Social Stratification" in Introducing Sociology (Class XI), specifically the.',
          misconception: 'Students conflate social structure with "social rules" or "customs" — treating it as a list of dos and don\'ts rather.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Social structure doesn\'t constrain me — I chose my stream (Science), my friends, my hobbies.', answer: 'The student confuses absence of coercion with absence of structure',
                  options: ['The student confuses absence of coercion with absence of structure', 'accepts the student\'s claim confuses voluntariness with structural neutrality'],
                  hint: 'Revisit "Social Stratification" in Introducing Sociology (Class XI), specifically the distinction.',
                  misconception: 'Students conflate social structure with "social rules" or "customs" — treating it as a list of dos and don\'ts rather than a relational.' }
          ],
            remediations: { 'students-conflate-social-structure-with': { steps: ['Have the student map their own school using only positions and resources — no rules.', 'Ask: "If all written rules vanished tomorrow, which arrows would still exist? Why?"', 'Reveal that those persistent arrows — the authority, resource, and dependency relations — are the structure.', 'Apply to family: map positions (father, mother, elder brother, younger sister) and resource flows (income, care.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate social structure with "social rules" or "customs" — treating it as a list of dos and don\'ts rather.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Competition is a natural human instinct; socialism failed because it went against human nature." Use sociological evidence from the.', answer: 'The claim commits the naturalistic fallacy sociology explicitly rejects',
                  options: ['The claim commits the naturalistic fallacy sociology explicitly rejects', 'agrees with the claim accepts common sense over sociological analysis'],
                  hint: 'Revisit "Social Stratification" in Introducing Sociology (Class XI), specifically the distinction.',
                  misconception: 'Students conflate social structure with "social rules" or "customs" — treating it as a list of dos and don\'ts rather than a relational.' }
          ],
            remediations: { 'students-conflate-social-structure-with': { steps: ['Have the student map their own school using only positions and resources — no rules.', 'Ask: "If all written rules vanished tomorrow, which arrows would still exist? Why?"', 'Reveal that those persistent arrows — the authority, resource, and dependency relations — are the structure.', 'Apply to family: map positions (father, mother, elder brother, younger sister) and resource flows (income, care.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_002', difficulty: 'standard',
          question: 'Social stratification is a system of structured, persistent inequalities.',
          hint: 'If stuck, revisit **c11_soc_cbse_06_001 (Social Structure as a Conceptual Framework)**.',
          misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Caste discrimination is illegal now, so caste stratification no longer exists in India." Using the concept of *life chances*, explain why.', answer: 'The argument confuses *legal equality* with *substantive equality*',
                  options: ['The argument confuses *legal equality* with *substantive equality*', 'caste doesn\'t matter anymore', 'stratification', 'economic layers'],
                  hint: 'If stuck, revisit **c11_soc_cbse_06_001 (Social Structure as a Conceptual Framework)**.',
                  misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality will automatically.' },
                { id: 'b', prompt: 'Compare and contrast how *class stratification* and *caste stratification* operate as systems of inequality.', answer: '| Dimension | Class Stratification | Caste Stratification |',
                  options: ['| Dimension | Class Stratification | Caste Stratification |', 'caste is just traditional class', 'stratification', 'economic layers'],
                  hint: 'If stuck, revisit **c11_soc_cbse_06_001 (Social Structure as a Conceptual Framework)**.',
                  misconception: '**Misconception**: "Stratification is just about economic inequality — if we fix poverty, caste and gender inequality will automatically.' }
          ],
            remediations: { 'misconception-stratification-is-just-about': { steps: ['**Step-by-step remediation**: 1.', '**Confront the conflation**: Ask student to list *non-economic* disadvantages a wealthy Dalit faces (temple entry.', 'Ask: "Can money buy temple entry in a village that bars Dalits?" → No.', 'Money cannot buy *ritual status*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_003', difficulty: 'standard',
          question: 'Life chances refer to material advantages (wealth, income, health, job.',
          hint: 'Revisit node c11_soc_cbse_06_002 (Social Stratification: Structured Inequalities) and the.',
          misconception: 'Students treat the three forms as interchangeable synonyms for "privilege" or "power." They write "life chances means.',
          parts: [
                { id: 'a', prompt: 'In a village, the Sarpanch belongs to a dominant caste. Villagers seek his help for ration cards, police complaints, and school admissions.', answer: 'Political influence',
                  options: ['Political influence', 'status', 'life chances'],
                  hint: 'Revisit node c11_soc_cbse_06_002 (Social Stratification: Structured Inequalities) and the "Social.',
                  misconception: 'Students treat the three forms as interchangeable synonyms for "privilege" or "power." They write "life chances means political power".' }
          ],
            remediations: { 'students-treat-the-three-forms': { steps: ['Make a three-column table with headers "Life Chances (Material)", "Status (Symbolic)", "Political Influence (Decision.', 'Take 10 concrete examples (private jet, family name, MLA ticket, hospital suite, PhD degree, police protection, luxury.', 'For each, write one sentence justifying why it belongs there using textbook definitions.', 'Identify 3 examples that could fit multiple columns and explain the overlap (e.g., factory owner: life chances via.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_004', difficulty: 'standard',
          question: 'In Marx\'s dialectical framework, individual agency refers to the capacity.',
          hint: 'Revisit c11_soc_cbse_06_001 (definition of social structure as "repeated patterns.',
          misconception: 'Students read "not under circumstances of their own choosing" and conclude Marx is a hard determinist: structure.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Marx argues that cooperation under capitalism is "enforced" rather than voluntary, using the factory worker vs.', answer: 'Correct answer: The artisan controls the labour process and product',
                  options: ['Correct answer: The artisan controls the labour process and product', 'low wages'],
                  hint: 'Revisit c11_soc_cbse_06_001 (definition of social structure as "repeated patterns of behaviour").',
                  misconception: 'Students read "not under circumstances of their own choosing" and conclude Marx is a hard determinist: structure determines everything.' }
          ],
            remediations: { 'students-read-not-under-circumstances': { steps: ['Have the student locate the exact sentence in the textbook ("Men can be distinguished from animals by consciousness...', 'Ask: "Who is the subject of the verb \'produce\'?" (Humans).', 'Ask: "Does the text say they produce *freely* or *under conditions*?" (Under conditions).', 'Together, rephrase: "Humans actively produce their life, but the *conditions* of that production are inherited."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_005', difficulty: 'standard',
          question: 'The functionalist perspective views society as a self-regulating system where.',
          hint: 'Revisit c11_soc_cbse_06_001 (Social Structure as Conceptual Framework) and.',
          misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional.',
          parts: [
                { id: 'a', prompt: 'A tribal community practices shifting cultivation with minimal specialization; a metropolitan city runs on IT, finance, healthcare, and logistics sectors.', answer: 'Tribal community: mechanical solidarity (shared routines, collective conscience)',
                  options: ['Tribal community: mechanical solidarity (shared routines, collective conscience)', 'functionalist perspective = everything in society is good/functional', '"functionalist perspective = everything in society is good/functional'],
                  hint: 'Revisit c11_soc_cbse_06_001 (Social Structure as Conceptual Framework) and c11_soc_cbse_06_002.',
                  misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional for the system* with.' },
                { id: 'b', prompt: 'Compare how a functionalist and a conflict theorist would interpret the same phenomenon: "Women in a patriarchal household cooperate by not claiming natal.', answer: 'Functionalist: interprets this as *accommodation*',
                  options: ['Functionalist: interprets this as *accommodation*', 'functionalists see it as good, conflict theorists see it as bad', 'functionalist perspective = everything in society is good/functional', '"functionalist perspective = everything in society is good/functional'],
                  hint: 'Revisit c11_soc_cbse_06_001 (Social Structure as Conceptual Framework) and c11_soc_cbse_06_002.',
                  misconception: 'Students often think "functionalist perspective = everything in society is good/functional." They confuse *functional for the system* with.' }
          ],
            remediations: { 'functionalist-perspective-everything-in-society': { steps: ['If a student equates "functional" with "good," do this 3-step remediation: (1) Write on board: "Function = consequence.', 'Dysfunction = consequence threatening system survival." (2) Use the textbook\'s crime example: "When a brutal crime.', 'Does that mean crime is \'good\'?', 'It means the *system responds* in a way that maintains solidarity." (3) Have student re-read the textbook line: "The.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_06_006', difficulty: 'standard',
          question: 'The conflict perspective views social processes (cooperation, competition.',
          hint: 'Revisit c11_soc_cbse_06_002 (stratification definition and persistence) and.',
          misconception: 'Students equate "conflict perspective" with "society is always in open battle" and miss that its core insight.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The conflict perspective views social processes (cooperation, competition, conflict) as',
                  options: ['The conflict perspective views social processes (cooperation, competition, conflict) as', 'Social structure is the patterned, relatively stable arrangement of social institutions,', 'Social stratification is a system of structured, persistent inequalities between social', 'Life chances refer to material advantages (wealth, income, health, job security,'],
                  hint: 'Revisit c11_soc_cbse_06_002 (stratification definition and persistence) and c11_soc_cbse_06_005.',
                  misconception: 'Students equate "conflict perspective" with "society is always in open battle" and miss that its core insight is **structural coercion.' }
          ],
            remediations: { 'students-equate-conflict-perspective-with': { steps: ['Re-read the Marx quote in NCERT (p.11): "cooperation is not voluntary...', 'appears as an alien force." 2.', 'Draw a 2-column table: Left column "Functionalist sees" (voluntary cooperation, shared norms), Right column "Conflict.', 'Fill it with the domestic worker, landless laborer, and daughter-in-law examples from text.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
