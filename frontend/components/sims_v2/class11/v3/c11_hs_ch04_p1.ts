import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch04_p1: SimDef = {
    id: 'v3_c11_hs_ch04_p1',
    title: 'Resource Management · Part 1/2',
    subtitle: 'Learn when a thing becomes a resource — and why money isn\'t one of them by itself.',
    classLevel: 11, subject: 'home_science', topic: 'Resource Management · Part 1/2',
    chapters: ['c11_hs_ch04'],
    nodeIds: ['c11_hs_cbse_04_001', 'c11_hs_cbse_04_002', 'c11_hs_cbse_04_003', 'c11_hs_cbse_04_004', 'c11_hs_cbse_04_005', 'c11_hs_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planner auditing what a family can actually use', intro: '₹2,000, three days, a cousin\'s car and your mother\'s recipes — which of these count as resources? It depends on the party.', goal: 'Apply utility, accessibility and interchangeability to classify resources and evaluate money\'s limits.' },
    discovery: {
        question: '\'Money is the most powerful resource — it substitutes for almost everything else.\' Where does this break?',
        options: ['Money can\'t cook the meal or motivate the child itself — no intrinsic utility, and managing it is a skill in itself', 'Nowhere — money substitutes for all resources', 'Only when the bank is closed', 'Only in villages without ATMs'],
        answer: 'Money can\'t cook the meal or motivate the child itself — no intrinsic utility, and managing it is a skill in itself',
        hook: 'A dusty bicycle isn\'t a resource until a goal turns it into one — resources are defined by intentional use, not by possession.',
    },
    teaching: [
        { title: 'Concept of a Resource: Definition and Classification', text: 'A resource is any asset, attribute, or means—human or non-human—that an individual or group can utilise to achieve a specific goal; it must possess utility for the given situation, be accessible.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a skill, a metro system and a rainwater tank across human/non-human, individual/shared and natural/community — then let the categories shift with the goal.',
        labels: ['Concept of a Resource', 'Human Resources: Knowledge, Motivation,', 'Human Resources: Time', 'Non-Human Resources: Money', 'Classification of Resources: Individual,', 'Characteristics of Resources: Utility'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_001', title: 'Concept of a Resource: Definition and Classification',
          caseStudy: { intro: 'Imagine you\'re planning a surprise birthday party for your best friend with a budget of ₹2,000 and only three days to prepare.',
            decisions: [{ prompt: 'Define \'resource\' as per the NCERT Class 11 Home Science textbook, and state the two-word phrase that captures when something becomes.', options: [
                { text: 'A resource is anything', outcome: 'A resource is anything which we make use of while carrying out any activity to accomplish our.' },
                { text: 'resources are things we own', outcome: 'Not quite — Students believe classification categories are mutually exclusive and fixed—e.g., "money is only.', reveals: 'classification-categories-are-mutually-exclusive' },
                { text: 'money is only non-human', outcome: 'Not quite — Students believe classification categories are mutually exclusive and fixed—e.g., "money is only.', reveals: 'classification-categories-are-mutually-exclusive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_002', title: 'Human Resources: Knowledge, Motivation, Skills and Aptitude',
          caseStudy: { intro: 'Imagine you are the captain of your school\'s debate team preparing for a national competition.',
            decisions: [{ prompt: 'Define \'aptitude\' as a human resource and give one example of how it differs from \'skill\' in the context of learning a musical instrument.', options: [
                { text: 'Aptitude is the innate potential or natural inclination to acquire proficiency in a', outcome: 'Aptitude is the innate potential or natural inclination to acquire proficiency in a specific.' },
                { text: 'if they lack immediate proficiency, they lack aptitude and cannot improve', outcome: 'Not quite — Students often believe that \'aptitude\' and \'skill\' are interchangeable terms for \'being good.', reveals: 'aptitude-and-skill-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_003', title: 'Human Resources: Time and Energy as Manageable Resources',
          caseStudy: { intro: 'Imagine you have a major project due Friday, two exams next week, and you\'re constantly exhausted by 4 PM — yet your friend with the same workload seems.',
            decisions: [{ prompt: 'Define Time and Energy as human resources, stating two key characteristics that distinguish each from non-human resources like money.', options: [
                { text: 'Time is a human resource characterised by universal equality (24 hours/day for everyone)', outcome: 'Time is a human resource characterised by universal equality (24 hours/day for everyone) and.' },
                { text: 'Time can be saved for later', outcome: 'Not quite — Students believe "Time Management" means squeezing more tasks into 24 hours (packing the.', reveals: 'time-management-means-squeezing-more' },
                { text: 'Energy is same for everyone', outcome: 'Not quite — Students believe "Time Management" means squeezing more tasks into 24 hours (packing the.', reveals: 'time-management-means-squeezing-more' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_004', title: 'Non-Human Resources: Money and Material Goods',
          caseStudy: { intro: 'Imagine your family has ₹5,000 saved for Diwali celebrations, but the cylinder runs out, the geyser leaks, and your sibling needs new school shoes — all in the.',
            decisions: [{ prompt: 'Define \'non-human resources\' as per NCERT Class 11 Home Science, and give two examples each of money and material goods.', options: [
                { text: 'Non-human resources are tangible, external assets comprising money (medium of exchange)', outcome: 'Non-human resources are tangible, external assets comprising money (medium of exchange) and.' },
                { text: 'skills', outcome: 'Not quite — Students believe that "money can buy anything, so material goods are just a subset of money".', reveals: 'money-can-buy-anything' },
                { text: 'money can buy anything, so material goods are just a subset of money', outcome: 'Not quite — Students believe that "money can buy anything, so material goods are just a subset of money".', reveals: 'money-can-buy-anything' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_005', title: 'Classification of Resources: Individual, Shared, Natural and Community',
          caseStudy: { intro: 'Imagine your family decides to install a rooftop rainwater harvesting system.',
            decisions: [{ prompt: 'Define "community resource" and give two examples from the NCERT textbook.', options: [
                { text: 'Community resources are resources available to an individual as a member of', outcome: 'Community resources are resources available to an individual as a member of community/society.' },
                { text: 'resources shared by family members', outcome: 'Not quite — Students believe "shared" and "community" are interchangeable because both involve multiple users.', reveals: 'shared-and-community-are-interchangeable' },
                { text: 'natural resources like air', outcome: 'Not quite — Students believe "shared" and "community" are interchangeable because both involve multiple users.', reveals: 'shared-and-community-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_006', title: 'Characteristics of Resources: Utility and Accessibility',
          caseStudy: { intro: 'Imagine you have a brand-new smartphone but no internet connection at home—does the phone have utility for your online class goal?',
            decisions: [{ prompt: 'Define \'utility\' of a resource as per the NCERT Class 11 Home Science textbook.', options: [
                { text: 'Utility is the importance or usefulness of a resource in helping one achieve a goal', outcome: 'Utility is the importance or usefulness of a resource in helping one achieve a goal; it depends.' },
                { text: 'utility means the resource is valuable/expensive', outcome: 'Not quite — Students conflate "utility" with "usefulness in general" and "accessibility" with "physical.', reveals: 'students-conflate-utility-with-usefulness' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Resource Management · Part 1/2', spots: [
            { id: 's1', label: 'Concept of a Resource Definition and Classification', prompt: 'Which idea is this? — A resource is any asset, attribute, or means—human or non-human—that an individual.', answer: 'Concept of a Resource Definition and Classification', options: ['Concept of a Resource Definition and Classification', 'Human Resources Knowledge Motivation Skills and Aptitude', 'Human Resources Time and Energy as Manageable Resources', 'Non-Human Resources Money and Material Goods'] },
            { id: 's2', label: 'Human Resources Knowledge Motivation Skills and Aptitude', prompt: 'Which idea is this? — Human resources are the inherent and developed personal attributes—knowledge (acquired.', answer: 'Human Resources Knowledge Motivation Skills and Aptitude', options: ['Human Resources Knowledge Motivation Skills and Aptitude', 'Concept of a Resource Definition and Classification', 'Human Resources Time and Energy as Manageable Resources', 'Non-Human Resources Money and Material Goods'] },
            { id: 's3', label: 'Human Resources Time and Energy as Manageable Resources', prompt: 'Which idea is this? — Time and Energy are finite, non-transferable human resources that every individual.', answer: 'Human Resources Time and Energy as Manageable Resources', options: ['Human Resources Time and Energy as Manageable Resources', 'Concept of a Resource Definition and Classification', 'Human Resources Knowledge Motivation Skills and Aptitude', 'Non-Human Resources Money and Material Goods'] },
            { id: 's4', label: 'Non-Human Resources Money and Material Goods', prompt: 'Which idea is this? — Non-human resources are tangible, external assets that individuals or families possess.', answer: 'Non-Human Resources Money and Material Goods', options: ['Non-Human Resources Money and Material Goods', 'Concept of a Resource Definition and Classification', 'Human Resources Knowledge Motivation Skills and Aptitude', 'Human Resources Time and Energy as Manageable Resources'] },
            { id: 's5', label: 'Characteristics of Resources Utility and Accessibility', prompt: 'Which idea is this? — Utility is the capacity of a resource to satisfy a specific human want or achieve.', answer: 'Characteristics of Resources Utility and Accessibility', options: ['Characteristics of Resources Utility and Accessibility', 'Concept of a Resource Definition and Classification', 'Human Resources Knowledge Motivation Skills and Aptitude', 'Human Resources Time and Energy as Manageable Resources'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Organising a college fest, your teammate audits resources and declares: \'The dusty college bicycle isn\'t a resource — it just exists. And Rohan has no aptitude for anchoring — he froze at auditions, so he lacks the talent.\'',
            decisions: [{ prompt: 'What\'s wrong with both judgments?', options: [
                { text: 'Redefine both: a resource is defined by purposeful use toward a goal — the bicycle becomes a resource the moment someone deploys it for ferrying supplies; existence alone isn\'t enough, and the same item shifts categories with user and goal. And aptitude is natural potential, not demonstrated proficiency — one frozen audition shows an undeveloped skill, not absent aptitude; skills are built by deliberate practice.', outcome: 'The audit becomes real: resources appear when recognised and deployed, and \'no aptitude\' is retired — you can\'t see potential until practice develops the skill.' },
                { text: 'Agree the bicycle isn\'t a resource — if it\'s not being used, it doesn\'t count.', outcome: 'That misses the relational definition: resources are identified by utility, accessibility and manageability for a goal — the unused bicycle is a potential resource awaiting deployment.', reveals: 'unused-means-not-resource' },
                { text: 'Agree on Rohan — aptitude and skill are the same thing, and he showed neither.', outcome: 'Conflating the two kills development: aptitude is the seed you can\'t observe directly; skill is the visible plant grown through practice — one bad audition reveals nothing about the seed.', reveals: 'aptitude-equals-skill' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Aptitude isn\'t skill and skill isn\'t motivation — four human resources, and the weakest one caps the rest.',
            decisions: [{ prompt: 'What comes next? Resource Management · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Resource Management · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_001', difficulty: 'standard',
          question: 'A resource is any asset, attribute, or means—human or non-human—that.',
          hint: 'If stuck, revisit the concept of "goal-oriented action" from daily life—pick any routine.',
          misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time.',
          parts: [
                { id: 'a', prompt: 'Define \'resource\' as per the NCERT Class 11 Home Science textbook, and state the two-word phrase that captures when something becomes a resource.', answer: 'A resource is anything',
                  options: ['A resource is anything', 'resources are things we own', 'money is only non-human', 'time is only individual'],
                  hint: 'If stuck, revisit the concept of "goal-oriented action" from daily life—pick any routine (making.',
                  misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time is only individual.".' },
                { id: 'b', prompt: 'Classify each of the following into human/non-human, individual/shared, and natural/community categories.', answer: 'Your ability to speak fluent English, (',
                  options: ['Your ability to speak fluent English, (', 'money is only non-human', 'time is only individual', 'classification categories are mutually exclusive and fixed—e'],
                  hint: 'If stuck, revisit the concept of "goal-oriented action" from daily life—pick any routine (making.',
                  misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time is only individual.".' },
                { id: 'c', prompt: 'Analyse the statement: "Time is the most democratic resource because everyone has exactly 24 hours a day." Using the four characteristics of resources.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'money is only non-human', 'time is only individual', 'classification categories are mutually exclusive and fixed—e'],
                  hint: 'If stuck, revisit the concept of "goal-oriented action" from daily life—pick any routine (making.',
                  misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time is only individual.".' }
          ],
            remediations: { 'classification-categories-are-mutually-exclusive': { steps: ['Ask the student to pick one object (e.g., a laptop) and write three distinct scenarios where it functions as (a).', 'For each scenario, identify who the user is, what the goal is, and who else can access it.', 'Explicitly map each scenario to the three classification dimensions.', 'Have the student create their own "shape-shifting resource" example with three context shifts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Money is the most powerful resource because it can substitute for almost all other resources." Use the concept of interchangeability and.', answer: 'The claim is overstated',
                  options: ['The claim is overstated', 'money is only non-human', 'time is only individual', 'classification categories are mutually exclusive and fixed—e'],
                  hint: 'If stuck, revisit the concept of "goal-oriented action" from daily life—pick any routine (making.',
                  misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time is only individual.".' },
                { id: 'b', prompt: 'Create a new, original example of a resource that fits ALL three classification systems simultaneously (i.e., can be viewed as human/non-human.', answer: 'Example: A home garden with vegetables',
                  options: ['Example: A home garden with vegetables', 'money is only non-human', 'time is only individual', 'classification categories are mutually exclusive and fixed—e'],
                  hint: 'If stuck, revisit the concept of "goal-oriented action" from daily life—pick any routine (making.',
                  misconception: 'Students believe classification categories are mutually exclusive and fixed—e.g., "money is only non-human" or "time is only individual.".' }
          ],
            remediations: { 'classification-categories-are-mutually-exclusive': { steps: ['Ask the student to pick one object (e.g., a laptop) and write three distinct scenarios where it functions as (a).', 'For each scenario, identify who the user is, what the goal is, and who else can access it.', 'Explicitly map each scenario to the three classification dimensions.', 'Have the student create their own "shape-shifting resource" example with three context shifts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_002', difficulty: 'standard',
          question: 'Human resources are the inherent and developed personal attributes—knowledge.',
          hint: 'Revisit c11_hs_cbse_04_001 for resource classification and c7_bio_ch01_006 for adolescent.',
          misconception: 'Students often believe that \'aptitude\' and \'skill\' are interchangeable terms for \'being good at something,\' leading.',
          parts: [
                { id: 'a', prompt: 'A student says, "I have no motivation to study chemistry, so I cannot develop the skill for it." Explain why this statement reflects a misunderstanding of the.', answer: 'Motivation is not a binary prerequisite',
                  options: ['Motivation is not a binary prerequisite', 'if they lack immediate proficiency, they lack aptitude and cannot improve'],
                  hint: 'Revisit c11_hs_cbse_04_001 for resource classification and c7_bio_ch01_006 for adolescent.',
                  misconception: 'Students often believe that \'aptitude\' and \'skill\' are interchangeable terms for \'being good at something,\' leading them to think that.' },
                { id: 'b', prompt: 'Compare the role of \'knowledge\' and \'aptitude\' in the initial stage versus the mastery stage of learning a complex skill like coding.', answer: 'Initially, knowledge (syntax, logic) is the primary driver',
                  options: ['Initially, knowledge (syntax, logic) is the primary driver', 'if they lack immediate proficiency, they lack aptitude and cannot improve'],
                  hint: 'Revisit c11_hs_cbse_04_001 for resource classification and c7_bio_ch01_006 for adolescent.',
                  misconception: 'Students often believe that \'aptitude\' and \'skill\' are interchangeable terms for \'being good at something,\' leading them to think that.' }
          ],
            remediations: { 'aptitude-and-skill-are-interchangeable': { steps: ['Ask the student to list three skills they have now (e.g., cycling, typing, cooking) that they once couldn\'t do.', 'For each, trace back: What was the first attempt like? How many hours of practice occurred?', 'Explicitly label the initial poor performance as \'low skill, unknown aptitude\' and the current proficiency.', 'Introduce the term \'aptitude\' as the slope of the learning curve, not the starting point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_003', difficulty: 'standard',
          question: 'Time and Energy are finite, non-transferable human resources that every.',
          hint: 'Revisit c11_hs_cbse_04_001 Activity 1 (list your human resources) and the.',
          misconception: 'Students believe "Time Management" means squeezing more tasks into 24 hours (packing the container), ignoring that.',
          parts: [
                { id: 'a', prompt: 'Riya (16) and her father (45) both have 2 hours to prepare a complex presentation. Riya schedules it 10 PM-midnight; her father schedules it 6-8 AM.', answer: 'Adolescents (16) have delayed circadian phase',
                  options: ['Adolescents (16) have delayed circadian phase', 'both same', 'Riya should do morning', 'Time Management'],
                  hint: 'Revisit c11_hs_cbse_04_001 Activity 1 (list your human resources) and the "Characteristics.',
                  misconception: 'Students believe "Time Management" means squeezing more tasks into 24 hours (packing the container), ignoring that Energy is the actual.' }
          ],
            remediations: { 'time-management-means-squeezing-more': { steps: ['Have the student complete a 3-day Energy Audit (as in Diagnostic Q6) — this makes the invisible visible.', 'Together, identify ONE "Energy-Time Mismatch" — a high-cognitive task scheduled during their personal trough (e.g.', 'Swap that task with a low-cognitive task from their peak window (e.g., move Math to 6:30 AM, move Instagram scrolling.', 'Run the swap for 3 days; track only two metrics: (a) perceived focus during the task (1-5), (b) sleep onset latency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_004', difficulty: 'standard',
          question: 'Non-human resources are tangible, external assets that individuals or families.',
          hint: 'Revisit c11_hs_cbse_04_001\'s Activity 1 (listing resources for an activity) and.',
          misconception: 'Students believe that "money can buy anything, so material goods are just a subset of money" — treating material goods.',
          parts: [
                { id: 'a', prompt: 'Explain why money is described as a \'limited resource\' in the textbook, and how this differs from the limitation of time as a human resource.', answer: 'Money is limited',
                  options: ['Money is limited', 'both are limited so they are the same', 'money can buy anything, so material goods are just a subset of money'],
                  hint: 'Revisit c11_hs_cbse_04_001\'s Activity 1 (listing resources for an activity) and re-classify each.',
                  misconception: 'Students believe that "money can buy anything, so material goods are just a subset of money" — treating material goods as irrelevant once.' },
                { id: 'b', prompt: 'A family has ₹10,000 in savings, a functioning washing machine, and 50 sq. ft. of unused balcony space.', answer: 'Option 1: Use the washing machine (material good) for washing; use balcony space',
                  options: ['Option 1: Use the washing machine (material good) for washing; use balcony space', 'use the washing machine', 'money can buy anything, so material goods are just a subset of money'],
                  hint: 'Revisit c11_hs_cbse_04_001\'s Activity 1 (listing resources for an activity) and re-classify each.',
                  misconception: 'Students believe that "money can buy anything, so material goods are just a subset of money" — treating material goods as irrelevant once.' }
          ],
            remediations: { 'money-can-buy-anything': { steps: ['Ask the student to list 5 material goods in their school bag right now (e.g., pen, scale, water bottle, tiffin box.', 'For each, ask: "If you lost this tomorrow and had ₹0, how would you still perform its function?" — forcing them.', 'Connect each substitute to the textbook\'s interchangeability definition.', 'Have them re-read the cow dung example (waste → fuel → manure) to see how the same object\'s utility changes with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_005', difficulty: 'standard',
          question: 'Resources are classified based on ownership and accessibility into four.',
          hint: 'Revisit c11_hs_cbse_04_001 (Concept of a Resource) and practice classifying 15 everyday.',
          misconception: 'Students believe "shared" and "community" are interchangeable because both involve multiple users.',
          parts: [
                { id: 'a', prompt: 'Define "community resource" and give two examples from the NCERT textbook.', answer: 'Community resources are resources available to an individual as a member of',
                  options: ['Community resources are resources available to an individual as a member of', 'resources shared by family members', 'natural resources like air', 'shared'],
                  hint: 'Revisit c11_hs_cbse_04_001 (Concept of a Resource) and practice classifying 15 everyday items.',
                  misconception: 'Students believe "shared" and "community" are interchangeable because both involve multiple users.' },
                { id: 'b', prompt: 'Explain why the same physical resource — water — can be classified as natural, individual, shared, AND community resource in different situations.', answer: 'Water in a river is natural (nature-provided, universally accessible)',
                  options: ['Water in a river is natural (nature-provided, universally accessible)', 'shared', 'community', '"shared" and "community" are interchangeable'],
                  hint: 'Revisit c11_hs_cbse_04_001 (Concept of a Resource) and practice classifying 15 everyday items.',
                  misconception: 'Students believe "shared" and "community" are interchangeable because both involve multiple users.' }
          ],
            remediations: { 'shared-and-community-are-interchangeable': { steps: ['Ask student to list 5 resources used by their family.', 'For each, ask "Who paid for it? Who decides who uses it? Who repairs it?"', 'Contrast family car (parents paid, parents decide, parents repair → shared) vs.', 'Have student re-classify 10 resources using the three-question test (Who provides? Who manages? Who sets access rules?).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_006', difficulty: 'standard',
          question: 'Utility is the capacity of a resource to satisfy a specific human want.',
          hint: 'Revisit the "Concept of a Resource" (node c11_hs_cbse_04_001) and re-read the NCERT.',
          misconception: 'Students conflate "utility" with "usefulness in general" and "accessibility" with "physical availability." They.',
          parts: [
                { id: 'a', prompt: 'A rural family owns a biogas plant that converts cow dung into cooking fuel. The plant is functional, but the family continues to buy LPG cylinders.', answer: 'Utility requires alignment between resource capability and user goal',
                  options: ['Utility requires alignment between resource capability and user goal', 'the plant has utility'],
                  hint: 'Revisit the "Concept of a Resource" (node c11_hs_cbse_04_001) and re-read the NCERT paragraph.',
                  misconception: 'Students conflate "utility" with "usefulness in general" and "accessibility" with "physical availability." They incorrectly believe: (1).' }
          ],
            remediations: { 'students-conflate-utility-with-usefulness': { steps: ['Ask the student to pick any object in the room (e.g., a chair) and state a goal for which it has ZERO utility (e.g.', 'Have them list 5 barriers that could prevent a Class 11 student from using the school library despite it being "open.', 'Explicitly contrast the two concepts using a 2x2 matrix: High Utility/Low Accessibility (life-saving drug, expensive).', 'Assign a micro-case: "A family has a car (resource). Goal: reach hospital 50km away in 30 minutes. Car has utility?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
