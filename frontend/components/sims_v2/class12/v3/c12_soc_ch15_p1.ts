import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch15_p1: SimDef = {
    id: 'v3_c12_soc_ch15_p1',
    title: 'Social Movements · Part 1/2',
    subtitle: 'A riot burns out; a movement keeps minutes',
    classLevel: 12, subject: 'sociology', topic: 'Social Movements · Part 1/2',
    chapters: ['c12_soc_ch15'],
    nodeIds: ['c12_soc_cbse_15_001', 'c12_soc_cbse_15_002', 'c12_soc_cbse_15_003', 'c12_soc_cbse_15_004', 'c12_soc_cbse_15_005', 'c12_soc_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Movement analyst', intro: 'The eight-hour day and the vote weren\'t granted — they were organised for, signature by signature.', goal: 'Distinguish social movements from collective behaviour and social change using organisation, ideology and sustained action.' },
    discovery: {
        question: 'In 1838, over a million workers signed a charter demanding the vote — meeting, organising, campaigning for years. A century later a hungry crowd can riot over bread prices and disperse by evening. Both are \'people acting together\' — so what makes only one a movement?',
        options: ['Sustained organisation, shared ideology and a goal beyond the moment — a riot has a grievance; a movement has a charter, leaders and a strategy', 'Size — a million signatures beats a street crowd', 'Violence — riots don\'t count as movements', 'Age — movements must be historical'],
        answer: 'Sustained organisation, shared ideology and a goal beyond the moment — a riot has a grievance; a movement has a charter, leaders and a strategy',
        hook: 'Big crowds don\'t make movements — 1857 lacked unified organisation and shared ideology across centres, so it\'s a rebellion, not a movement. And Chipko wasn\'t \'just environmental\': its villagers fused survival economics, ecology and anger at a distant state into one fight.',
    },
    teaching: [
        { title: 'Social Movements: Definition, Features and the Difference from Collective Behaviour', text: 'A social movement is a sustained, organised collective action with shared objectives and ideology that aims to bring about or prevent change in society, often by challenging state policies.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run real cases through the movement checklist — sanskritisation, a station protest, the anti-sati campaign, Chipko — and defend what qualifies and what\'s merely collective heat.',
        labels: ['Social Movements: Definition, Features', 'Types of Social Movements', 'Theories of Social Movements', 'The Peasant Movement', 'The Tribal Movement: Santhal', 'The Dalit Movement: Ambedkar,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_001', title: 'Social Movements: Definition, Features and the Difference from Collective Behaviour',
          caseStudy: { intro: 'Begin by asking students: "You enjoy an 8-hour workday, weekends off, and the right to vote — did these just appear, or were they won?" Use the NCERT opening.',
            decisions: [{ prompt: 'A student writes: "The 1857 Revolt was a social movement because large numbers of people collectively rose up against British rule.".', options: [
                { text: 'The 1857 Revolt, while a massive collective uprising, lacked the sustained organisation,', outcome: 'The 1857 Revolt, while a massive collective uprising, lacked the sustained organisation, unified.' },
                { text: 'Spontaneous, disorganised protest cannot be called a social movement either', outcome: 'Not quite — Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the.', reveals: 'students-equate-large-numbers-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_002', title: 'Types of Social Movements: Reform, Revolutionary, Resistance and Reactionary',
          caseStudy: { intro: 'Imagine you read about two protests: one demands that the government increase the minimum wage by 10%, while the other demands the abolition of private.',
            decisions: [{ prompt: '**REMEMBER**: List the five types of social movements in the NCERT typology and give one Indian example for each.', options: [
                { text: '**Correct answer**: 1) Reformist – Right to Information campaign', outcome: '**Correct answer**: 1) Reformist – Right to Information campaign; 2) Revolutionary – Naxalite.' },
                { text: 'redemptive', outcome: 'Not quite — **“Reformist = slow, Revolutionary = violent, Resistance = protest, Reactionary = backward.”**.', reveals: 'reformist-slow' },
                { text: 'reactionary', outcome: 'Not quite — **“Reformist = slow, Revolutionary = violent, Resistance = protest, Reactionary = backward.”**.', reveals: 'reformist-slow' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_003', title: 'Theories of Social Movements: Relative Deprivation, Resource Mobilisation and New Social Movement Theory',
          caseStudy: { intro: 'Imagine a group of villagers in the Himalayas hugging trees to stop logging — why did they choose that tactic?',
            decisions: [{ prompt: 'Define Relative Deprivation Theory in one sentence and name one sociologist associated with it.', options: [
                { text: 'Relative Deprivation Theory posits that social movements arise when a group feels a', outcome: 'Relative Deprivation Theory posits that social movements arise when a group feels a discrepancy.' },
                { text: 'movements happen', outcome: 'Not quite — Students often think the three theories are competing explanations where only one is "correct" for.', reveals: 'the-three-theories-are-competing' },
                { text: 'correct', outcome: 'Not quite — Students often think the three theories are competing explanations where only one is "correct" for.', reveals: 'the-three-theories-are-competing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_004', title: 'The Peasant Movement in India: Tebhaga, Telangana and the Farmers\' Movements',
          caseStudy: { intro: 'Start with a relatable scenario: "Imagine you are a sharecropper in 1946 Bengal — you till the land, sow the seeds, and harvest the crop, but the jotedar.',
            decisions: [{ prompt: 'Name the two most "classical" peasant movements at the time of Independence as identified in the NCERT textbook, and state the region and.', options: [
                { text: 'Correct answer: (1) Tebhaga movement', outcome: 'Correct answer: (1) Tebhaga movement — Bengal (North Bihar region), 1946–47; (2) Telangana movement.' },
                { text: 'classical', outcome: 'Not quite — Students often conflate "peasant" and "farmer" as synonyms and assume all agrarian movements are.', reveals: 'students-often-conflate-peasant-and' },
                { text: 'Bardoli or Champaran', outcome: 'Not quite — Students often conflate "peasant" and "farmer" as synonyms and assume all agrarian movements are.', reveals: 'students-often-conflate-peasant-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_005', title: 'The Tribal Movement: Santhal Rebellion, Birsa Munda and the Jharkhand Movement',
          caseStudy: { intro: 'Imagine you are a Santhal farmer in 1855: your ancestral land has been declared "government forest," a moneylender (dikus) has tricked you into debt bondage.',
            decisions: [{ prompt: 'Name the three major historical phases of the tribal movement in the "tribal belt" of middle India as discussed in the NCERT textbook, and.', options: [
                { text: 'The three phases are: (1) Santhal Rebellion (1855–56), (2) Birsa Munda\'s Ulgulan', outcome: 'The three phases are: (1) Santhal Rebellion (1855–56), (2) Birsa Munda\'s Ulgulan (1899–1900), and.' },
                { text: 'the Naxalite movement or the Chipko movement —', outcome: 'Not quite — Students often treat the Santhal Rebellion, Birsa Munda\'s Ulgulan, and the Jharkhand Movement.', reveals: 'students-often-treat-the-santhal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_006', title: 'The Dalit Movement: Ambedkar, the Mahar Movement and the Dalit Panthers',
          caseStudy: { intro: 'Imagine a young Dalit student in 1970s Mumbai reading a poem that describes their lived reality of humiliation in a way no mainstream textbook ever did — that.',
            decisions: [{ prompt: 'What is the meaning of the term "Dalit" as used by neo-Buddhist activists in the early 1970s, and how does it inherently challenge the.', options: [
                { text: '"Dalit" means "the poor and oppressed persons" or "those who have been broken, ground', outcome: '"Dalit" means "the poor and oppressed persons" or "those who have been broken, ground down by those.' },
                { text: 'Dalit means Scheduled Caste', outcome: 'Not quite — Students often think the Dalit Movement is a single, unified movement led only by Ambedkar that.', reveals: 'the-dalit-movement-is-a' },
                { text: 'Dalit refers to economic poverty only', outcome: 'Not quite — Students often think the Dalit Movement is a single, unified movement led only by Ambedkar that.', reveals: 'the-dalit-movement-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A headline calls a tribal movement blocking a mining lease \'a revolutionary uprising\'; a classmate counters \'it\'s reformist — they cite the Forest Rights Act.\'',
            decisions: [{ prompt: 'Where does the typology place it?', options: [
                { text: 'Primarily resistance — the core aim is defensive: stop dispossession, protect customary land and identity; the legal demands are reformist instruments in service of survival, but neither headline\'s \'revolutionary\' (no new order sought) nor a pure \'reform\' label captures the dominant defence-of-rights orientation.', outcome: 'The chapter\'s test is goal and scope, not tactics or outcomes — defending what exists isn\'t overthrowing what exists, even when the tools are legal ones.' },
                { text: 'The headline is right — confrontation with the state makes it revolutionary.', outcome: 'Confrontation isn\'t revolution — revolutionary movements seek to transform the structure of power itself; resisting a lease to keep existing rights is the textbook resistance case, however forceful the stand.', reveals: 'confrontation-equals-revolution' },
                { text: 'The classmate is right — using a statute makes it purely reformist.', outcome: 'Method doesn\'t settle type — a movement can invoke a law while its driving aim is survival-level defence of land; intent outweighs instruments, and here the intent is holding ground, not tweaking policy.', reveals: 'legal-means-reformist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell social change (a tide), collective behaviour (a spark) and a social movement (an engine) apart — and explain why your weekends exist because someone organised.',
            decisions: [{ prompt: 'What comes next? Social Movements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Movements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_001', difficulty: 'standard',
          question: 'A social movement is a sustained, organised collective action with shared.',
          hint: 'Revisit c11_soc_cbse_06_004 (Individual Agency and Social Structure) and.',
          misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence.',
          parts: [
                { id: 'a', prompt: 'A spontaneous crowd gathers at a railway station after a train accident, blocks tracks, and demands compensation.', answer: 'This is collective behaviour, not a social movement',
                  options: ['This is collective behaviour, not a social movement', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Revisit c11_soc_cbse_06_004 (Individual Agency and Social Structure) and c11_soc_cbse_07_001.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation.' },
                { id: 'b', prompt: 'Compare Durkheim\'s and Marx\'s (via E.P. Thompson) perspectives on collective action.', answer: 'Durkheim, writing amid industrial upheaval, feared anomie',
                  options: ['Durkheim, writing amid industrial upheaval, feared anomie', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Revisit c11_soc_cbse_06_004 (Individual Agency and Social Structure) and c11_soc_cbse_07_001.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation.' }
          ],
            remediations: { 'students-equate-large-numbers-of': { steps: ['Have the student re-read NCERT Section 8.1 (Features of a Social Movement) and Section \'Distinguishing Social Change.', 'Give them three 50-word caselets — (a) 1857 Revolt, (b) 2011 Anna Hazare anti-corruption protests, (c) a spontaneous.', 'Discuss why (a) is a rebellion, (b) is a social movement, (c) is collective behaviour.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Chipko movement was primarily an environmental movement; its economic and political dimensions were secondary." Use the NCERT\'s.', answer: 'The claim is incorrect per NCERT',
                  options: ['The claim is incorrect per NCERT', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Revisit c11_soc_cbse_06_004 (Individual Agency and Social Structure) and c11_soc_cbse_07_001.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation.' },
                { id: 'b', prompt: 'Create a novel example of a social movement that meets all five NCERT defining features.', answer: 'Example: The \'Right to Pension for Informal Workers Movement\' (hypothetical)',
                  options: ['Example: The \'Right to Pension for Informal Workers Movement\' (hypothetical)', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Revisit c11_soc_cbse_06_004 (Individual Agency and Social Structure) and c11_soc_cbse_07_001.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation.' }
          ],
            remediations: { 'students-equate-large-numbers-of': { steps: ['Have the student re-read NCERT Section 8.1 (Features of a Social Movement) and Section \'Distinguishing Social Change.', 'Give them three 50-word caselets — (a) 1857 Revolt, (b) 2011 Anna Hazare anti-corruption protests, (c) a spontaneous.', 'Discuss why (a) is a rebellion, (b) is a social movement, (c) is collective behaviour.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_002', difficulty: 'standard',
          question: 'Social movements are classified by their goals and methods: **reformist**.',
          hint: 'Revisit **c12_soc_cbse_15_001** and write the four features in your own words with one.',
          misconception: '**“Reformist = slow, Revolutionary = violent, Resistance = protest, Reactionary = backward.”** Students reduce each.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: List the five types of social movements in the NCERT typology and give one Indian example for each.', answer: '**Correct answer**: 1) Reformist – Right to Information campaign',
                  options: ['**Correct answer**: 1) Reformist – Right to Information campaign', 'redemptive', 'reactionary'],
                  hint: 'Revisit **c12_soc_cbse_15_001** and write the four features in your own words with one Indian.',
                  misconception: '**“Reformist = slow, Revolutionary = violent, Resistance = protest, Reactionary = backward.”** Students reduce each type to a single.' }
          ],
            remediations: { 'reformist-slow': { steps: ['**Re‑read the NCERT typology table** (Section 8.3) and create a 5‑column comparison chart: Goal | Method | Scope |.', '**Practice classification** with 10 movements from the textbook (Chipko, Naxalite, Ezhava, Dharma Sabha, RTI, Bardoli.', 'For each, write *one sentence* justifying the primary type using two criteria.', '**Re‑diagnose**: Attempt Diagnostic Questions 2, 3, 4 again.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_003', difficulty: 'standard',
          question: 'Theories of social movements provide analytical frameworks to explain why.',
          hint: 'Revisit c12_soc_cbse_15_001 (definition/features) and c11_soc_cbse_06_006 (conflict.',
          misconception: 'Students often think the three theories are competing explanations where only one is "correct" for a given movement.',
          parts: [
                { id: 'a', prompt: 'Apply Resource Mobilisation Theory to explain why the Chipko Movement (1973) was able to sustain its protests despite limited financial resources.', answer: 'Step 1: Identify resources',
                  options: ['Step 1: Identify resources', 'lack of funds', 'correct'],
                  hint: 'Revisit c12_soc_cbse_15_001 (definition/features) and c11_soc_cbse_06_006 (conflict perspective).',
                  misconception: 'Students often think the three theories are competing explanations where only one is "correct" for a given movement.' },
                { id: 'b', prompt: 'Compare and contrast the focus of "old social movements" (e.g., workers\' movement) and "new social movements" (e.g., environmental movement) using New Social.', answer: 'Old movements: class-based, economic redistribution, hierarchical organisation,',
                  options: ['Old movements: class-based, economic redistribution, hierarchical organisation,', 'correct'],
                  hint: 'Revisit c12_soc_cbse_15_001 (definition/features) and c11_soc_cbse_06_006 (conflict perspective).',
                  misconception: 'Students often think the three theories are competing explanations where only one is "correct" for a given movement.' }
          ],
            remediations: { 'the-three-theories-are-competing': { steps: ['If a student conflates the theories, do this 3-step remediation: (1) Create a three-column table with headers "Core.', '(2) Fill it: Relative Deprivation → "Why do they feel aggrieved?" → "Perceived gap" → Dalit conversion; Resource.', '(3) Ask the student to re-analyse one movement using all three columns.', 'Re-diagnose with Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_004', difficulty: 'standard',
          question: 'The peasant movements in India refer to collective agrarian struggles.',
          hint: 'If stuck, revisit c12_soc_cbse_15_001 (features of social movement) and.',
          misconception: 'Students often conflate "peasant" and "farmer" as synonyms and assume all agrarian movements are the same.',
          parts: [
                { id: 'a', prompt: 'Name the two most "classical" peasant movements at the time of Independence as identified in the NCERT textbook, and state the region and year for each.', answer: 'Correct answer: (1) Tebhaga movement',
                  options: ['Correct answer: (1) Tebhaga movement', 'classical', 'Bardoli or Champaran'],
                  hint: 'If stuck, revisit c12_soc_cbse_15_001 (features of social movement) and c12_soc_cbse_15_002 (types.',
                  misconception: 'Students often conflate "peasant" and "farmer" as synonyms and assume all agrarian movements are the same.' }
          ],
            remediations: { 'students-often-conflate-peasant-and': { steps: ['If the student cannot distinguish peasant vs farmer or misattributes demands: 1.', 'Have them re-read the NCERT paragraph: "New farmer\'s movements began in the 1970s...', 'involved farmers rather than peasants (farmers are said to be market-involved as both commodity producers and.', 'Ask them to write one-sentence definitions: "A peasant is...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_005', difficulty: 'standard',
          question: 'The Tribal Movement in India refers to sustained collective action by Adivasi.',
          hint: 'If stuck, revisit Node 002\'s worked examples on classifying the Naxalite movement.',
          misconception: 'Students often treat the Santhal Rebellion, Birsa Munda\'s Ulgulan, and the Jharkhand Movement as *three separate.',
          parts: [
                { id: 'a', prompt: 'Name the three major historical phases of the tribal movement in the "tribal belt" of middle India as discussed in the NCERT textbook, and state the.', answer: 'The three phases are: (1) Santhal Rebellion (1855–56), (2) Birsa Munda\'s Ulgulan',
                  options: ['The three phases are: (1) Santhal Rebellion (1855–56), (2) Birsa Munda\'s Ulgulan', 'the Naxalite movement or the Chipko movement —'],
                  hint: 'If stuck, revisit Node 002\'s worked examples on classifying the Naxalite movement (revolutionary).',
                  misconception: 'Students often treat the Santhal Rebellion, Birsa Munda\'s Ulgulan, and the Jharkhand Movement as *three separate, unrelated uprisings*.' },
                { id: 'b', prompt: 'Compare the Santhal Rebellion (1855–56) and the Jharkhand Movement (20th century) on *two* dimensions: (a) leadership structure, and (b) mode of protest.', answer: 'leadership structure, and (',
                  options: ['leadership structure, and (', 'violence vs non-violence'],
                  hint: 'If stuck, revisit Node 002\'s worked examples on classifying the Naxalite movement (revolutionary).',
                  misconception: 'Students often treat the Santhal Rebellion, Birsa Munda\'s Ulgulan, and the Jharkhand Movement as *three separate, unrelated uprisings*.' }
          ],
            remediations: { 'students-often-treat-the-santhal': { steps: ['If a student cannot link the three phases, do this 3-step remediation: (1) Re-read NCERT pp.', '122–124 and highlight every phrase that connects past to present (e.g., "memory of Birsa\'s struggle was kept alive,".', '(2) Create a two-column table: Column A = Santhal/Birsa grievances (land, forest, dikus, cultural suppression); Column.', 'Draw arrows showing continuity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_006', difficulty: 'standard',
          question: 'The Dalit Movement is a collective struggle by Dalits (formerly "untouchables").',
          hint: 'Revisit Class 11 Sociology Chapter 2 (Social Stratification: Caste, Class, Gender) and.',
          misconception: 'Students often think the Dalit Movement is a single, unified movement led only by Ambedkar that ended with his death.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Dalit Panthers were just a violent offshoot of the Mahar Movement; both wanted the same things but the Panthers used force." Apply the.', answer: 'The claim is partially correct but reductionist',
                  options: ['The claim is partially correct but reductionist', 'parliamentary democracy'],
                  hint: 'Revisit Class 11 Sociology Chapter 2 (Social Stratification: Caste, Class, Gender) and Chapter 6.',
                  misconception: 'Students often think the Dalit Movement is a single, unified movement led only by Ambedkar that ended with his death or with the 1956.' }
          ],
            remediations: { 'the-dalit-movement-is-a': { steps: ['If the student holds this misconception: Step 1 — Have them re-read NCERT page 121-122 (Box 8.7) and list every named.', 'Step 2 — Ask: "Which of these was led by Ambedkar?" (Only Mahar).', 'Step 3 — Create a timeline: 1873 (Phule\'s Satyashodhak) → 1920s (Mahar) → 1956 (Conversion) → 1972 (Panthers) → 1984.', 'Step 4 — For each, identify: Who led?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
