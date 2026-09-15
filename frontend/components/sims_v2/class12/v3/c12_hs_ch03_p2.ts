import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch03_p2: SimDef = {
    id: 'v3_c12_hs_ch03_p2',
    title: 'Human Development and Family Studies · Part 2/2',
    subtitle: 'Head before sitting, palm before pinch — the order is law',
    classLevel: 12, subject: 'home_science', topic: 'Human Development and Family Studies · Part 2/2',
    chapters: ['c12_hs_ch03'],
    nodeIds: ['c12_hs_cbse_03_007', 'c12_hs_cbse_03_008', 'c12_hs_cbse_03_009', 'c12_hs_cbse_03_010', 'c12_hs_cbse_03_011', 'c12_hs_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Development tracker', intro: 'Every child climbs the same staircase of abilities — just at their own speed. Learn to read the staircase.', goal: 'Distinguish growth from development and apply the directional principles behind milestone sequences.' },
    discovery: {
        question: 'A baby steadies her head months before she can sit, and grasps with her whole palm long before a pincer grip. Why is the order never reversed?',
        options: ['Lawful direction — development runs head-to-tail and centre-to-fingertip; the sequence is universal even though each child\'s pace differs', 'Babies just learn slowly', 'Practice builds it', 'It\'s random timing'],
        answer: 'Lawful direction — development runs head-to-tail and centre-to-fingertip; the sequence is universal even though each child\'s pace differs',
        hook: 'Growth is what you can measure; development is what emerges. And a child who skips crawling hasn\'t broken the rule — the direction (head before trunk before legs) still held; the pathway varied. Sequence is law; timing is personal.',
    },
    teaching: [
        { title: 'Parenthood: Roles, Responsibilities and Parenting Styles', text: 'Parenthood refers to the state of being a parent, encompassing the roles, responsibilities, and practices involved in raising and nurturing a child from infancy to adulthood, while parenting styles.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch milestones like a scientist: separate measurable growth from emerging skill, predict which ability must come before which, and calm a parent whose \'late\' crawler is right on time.',
        labels: ['Parenthood: Roles, Responsibilities', 'Early Childhood Development: Physical,', 'Adolescence: Developmental Changes', 'Adulthood and Ageing: Physical,', 'Children with Special Needs', 'Family Welfare Programmes'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_008', title: 'Early Childhood Development: Physical, Cognitive and Social Milestones',
          caseStudy: { intro: 'Imagine you are a Child Development Project Officer visiting an Anganwadi.',
            decisions: [{ prompt: 'Define the term ‘developmental milestone’ in the context of early childhood (2–6 years) and give one example each from the physical.', options: [
                { text: 'A developmental milestone is an observable skill or behaviour that most children achieve', outcome: 'A developmental milestone is an observable skill or behaviour that most children achieve within.' },
                { text: 'a child must walk by 12 months', outcome: 'Not quite — Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and.', reveals: 'milestones-are-fixed-deadlines-e' },
                { text: 'lists only one domain or gives infant milestones (e', outcome: 'Not quite — Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and.', reveals: 'milestones-are-fixed-deadlines-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_009', title: 'Adolescence: Developmental Changes and Challenges',
          caseStudy: { intro: 'Imagine a 14-year-old who suddenly refuses to eat meals with family, spends hours on social media, and snaps at parents when asked about homework.',
            decisions: [{ prompt: 'Define "adolescence" according to the World Health Organization and state the age range.', options: [
                { text: 'WHO defines adolescence as the period between 10 and 19 years of age, encompassing both', outcome: 'WHO defines adolescence as the period between 10 and 19 years of age, encompassing both puberty.' },
                { text: 'adolescent rebellion', outcome: 'Not quite — Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm.', reveals: 'adolescent-rebellion-is-universal-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_010', title: 'Adulthood and Ageing: Physical, Cognitive and Socio-Emotional Changes',
          caseStudy: { intro: 'Imagine a 45-year-old software engineer who notices she needs reading glasses, finds it harder to multitask, and is simultaneously caring for aging parents.',
            decisions: [{ prompt: 'List the three substages of adulthood with their approximate age ranges and name the primary psychosocial crisis (per Erikson) for each.', options: [
                { text: 'Early adulthood (≈20–40): Intimacy vs', outcome: 'Early adulthood (≈20–40): Intimacy vs. Isolation; Middle adulthood (≈40–65): Generativity vs.' },
                { text: 'successful ageing', outcome: 'Not quite — Students often believe that ageing is synonymous with universal, inevitable decline in all domains.', reveals: 'ageing-is-synonymous-with-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_011', title: 'Children with Special Needs: Types of Disabilities and Inclusion',
          caseStudy: { intro: 'Imagine you are a Class 12 student volunteering at a local Anganwadi and you notice a 4-year-old who doesn\'t respond when called by name, avoids eye contact.',
            decisions: [{ prompt: 'A REMEMBER level question: List the three models of disability (medical, social, and bio-psycho-social) and state the core belief of each.', options: [
                { text: 'Correct answer: Medical model', outcome: 'Correct answer: Medical model — disability is a problem within the individual that needs to.' },
                { text: 'fixing the person', outcome: 'Not quite — Students often believe "inclusion = admission" — that enrolling a child with disability in.', reveals: 'inclusion-admission-that-enrolling-a' },
                { text: 'removing barriers', outcome: 'Not quite — Students often believe "inclusion = admission" — that enrolling a child with disability in.', reveals: 'inclusion-admission-that-enrolling-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_012', title: 'Family Welfare Programmes and Policies in India',
          caseStudy: { intro: 'Imagine you visit an Anganwadi centre in your neighbourhood and see young children eating a hot meal, a pregnant woman receiving iron tablets, and a worker.',
            decisions: [{ prompt: 'What is the full form of ICDS and which age group of children does it primarily cover?', options: [
                { text: 'ICDS stands for Integrated Child Development Services', outcome: 'ICDS stands for Integrated Child Development Services. It primarily covers children in the age.' },
                { text: 'ICDS covers school-age children 6-14 years', outcome: 'Not quite — Students often believe that "food fortification" and "food supplementation" are the same thing.', reveals: 'food-fortification-and-food-supplementation' },
                { text: 'ICDS is only a feeding programme', outcome: 'Not quite — Students often believe that "food fortification" and "food supplementation" are the same thing.', reveals: 'food-fortification-and-food-supplementation' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'Human Development and Family Studies · Part 2/2', spots: [
            { id: 's1', label: 'Parenthood Roles Responsibilities and Parenting Styles', prompt: 'Which idea is this? — Parenthood refers to the state of being a parent, encompassing the roles.', answer: 'Parenthood Roles Responsibilities and Parenting Styles', options: ['Parenthood Roles Responsibilities and Parenting Styles', 'Adolescence Developmental Changes and Challenges', 'Family Welfare Programmes and Policies in India'] },
            { id: 's2', label: 'Adolescence Developmental Changes and Challenges', prompt: 'Which idea is this? — Adolescence is the transitional developmental stage between childhood and adulthood.', answer: 'Adolescence Developmental Changes and Challenges', options: ['Adolescence Developmental Changes and Challenges', 'Parenthood Roles Responsibilities and Parenting Styles', 'Family Welfare Programmes and Policies in India'] },
            { id: 's3', label: 'Family Welfare Programmes and Policies in India', prompt: 'Which idea is this? — Family Welfare Programmes and Policies in India refer to the organized, government-led.', answer: 'Family Welfare Programmes and Policies in India', options: ['Family Welfare Programmes and Policies in India', 'Parenthood Roles Responsibilities and Parenting Styles', 'Adolescence Developmental Changes and Challenges'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbour is in a panic because a milestone-checklist app flagged her three-year-old for \'not yet speaking in full sentences\', while her own mother shrugs that \'children bloom differently.\'',
            decisions: [{ prompt: 'How do the eight development stages advise her?', options: [
                { text: 'Stages are signposts, not stopwatches — early childhood spans two to six years and its milestones mark the typical range; development is plastic and rates vary, so a range flag invites observation and if needed guidance — not a verdict that the child is \'behind.\'', outcome: 'The chapter frames milestones as anchors within wide stages, not rigid deadlines — multidimensional, modifiable development means an app flag is a reason to watch, not to panic.' },
                { text: 'Trust the app — milestones exist precisely because there\'s a correct schedule.', outcome: 'That reads stages as rigid rules, which the chapter rejects: the eight stages describe sequence with varying rate; a single flag is a screening prompt, not a diagnosis.', reveals: 'milestones-are-deadlines' },
                { text: 'Dismiss the flag entirely — all children catch up, so there\'s nothing to look at.', outcome: 'Plasticity cuts both ways — development varies AND responds to support; ignoring the flag throws away the early-help window the stages exist to open.', reveals: 'variation-means-ignore' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'You can now read a child\'s progress as patterned law — universal in order, individual in pace.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_007', difficulty: 'standard',
          question: 'Parenthood refers to the state of being a parent, encompassing the roles.',
          hint: 'If stuck, revisit the 2×2 grid in Class 11 Psychology (c11_psy_cbse_03_006) and Class 12.',
          misconception: 'Students often equate **“authoritative” with “authoritarian”** because both sound “strict” and both involve high.',
          parts: [
                { id: 'a', prompt: 'Case: Mr. and Mrs. Sharma enforce a strict 8 p.m. bedtime for their 12‑year‑old son, Arjun, with no negotiation.', answer: 'Style: **authoritarian** (high demandingness, low responsiveness)',
                  options: ['Style: **authoritarian** (high demandingness, low responsiveness)', 'high achievement and obedience'],
                  hint: 'If stuck, revisit the 2×2 grid in Class 11 Psychology (c11_psy_cbse_03_006) and Class 12 node.',
                  misconception: 'Students often equate **“authoritative” with “authoritarian”** because both sound “strict” and both involve high expectations.' }
          ],
            remediations: { 'students-often-equate-authoritative-with': { steps: ['**Re‑draw the 2×2 grid** (responsiveness × demandingness) on paper; label each quadrant with style name, one key.', '**Watch a 5‑minute video** (e.g., “Baumrind’s Parenting Styles” by CrashCourse Psychology) and pause to classify each.', '**Re‑visit Class 11 Psychology node c11_psy_cbse_03_006 (Erikson’s Psychosocial Stages)** — link each parenting style.', 'shame/doubt; authoritative → initiative vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_008', difficulty: 'standard',
          question: 'Early Childhood Development (ages 2–6 years) refers to the period of rapid and.',
          hint: 'If stuck, review Piaget’s preoperational characteristics (symbolic thought, egocentrism.',
          misconception: 'Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and treat any variation.',
          parts: [
                { id: 'a', prompt: 'Design a simple 5‑item observation checklist for a preschool teacher to monitor physical, cognitive, and social milestones of 4‑year‑olds during free play.', answer: 'Checklist: (1) Physical – hops on one foot for 2 seconds',
                  options: ['Checklist: (1) Physical – hops on one foot for 2 seconds', 'writes name', 'shares willingly always', 'a child must walk by 12 months'],
                  hint: 'If stuck, review Piaget’s preoperational characteristics (symbolic thought, egocentrism.',
                  misconception: 'Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and treat any variation as pathology.' }
          ],
            remediations: { 'milestones-are-fixed-deadlines-e': { steps: ['Revisit c12_hs_cbse_03_002 (Stages of Human Development) to review the age‑range concept and the principle.', 'Re‑read c11_psy_cbse_03_005 (Piaget’s Stages) and c11_psy_cbse_03_006 (Erikson’s Stages) focusing on preoperational.', 'Practice: Take a milestone chart and mark each item as “emerging,” “typical,” or “mastered” for a hypothetical child.', 'Re‑attempt Diagnostic Question 2 and 4, explicitly linking theory to observable behaviour.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and treat any variation.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “If a 5‑year‑old cannot read simple words, they are cognitively delayed.” Use concepts of developmental appropriateness, domain.', answer: 'Reading simple words is not a universal milestone for age 5',
                  options: ['Reading simple words is not a universal milestone for age 5', 'a child must walk by 12 months', 'milestones are fixed deadlines (e'],
                  hint: 'If stuck, review Piaget’s preoperational characteristics (symbolic thought, egocentrism.',
                  misconception: 'Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and treat any variation as pathology.' },
                { id: 'b', prompt: 'Create a one‑page parent handout (outline only) titled “What to Expect at Ages 2–6” that integrates physical, cognitive, and social milestones into three.', answer: 'Outline: Band 1 (2–3 yrs): Physical – runs, kicks ball',
                  options: ['Outline: Band 1 (2–3 yrs): Physical – runs, kicks ball', 'a child must walk by 12 months', 'milestones are fixed deadlines (e'],
                  hint: 'If stuck, review Piaget’s preoperational characteristics (symbolic thought, egocentrism.',
                  misconception: 'Students often think milestones are fixed deadlines (e.g., “a child must walk by 12 months”) and treat any variation as pathology.' }
          ],
            remediations: { 'milestones-are-fixed-deadlines-e': { steps: ['Revisit c12_hs_cbse_03_002 (Stages of Human Development) to review the age‑range concept and the principle.', 'Re‑read c11_psy_cbse_03_005 (Piaget’s Stages) and c11_psy_cbse_03_006 (Erikson’s Stages) focusing on preoperational.', 'Practice: Take a milestone chart and mark each item as “emerging,” “typical,” or “mastered” for a hypothetical child.', 'Re‑attempt Diagnostic Question 2 and 4, explicitly linking theory to observable behaviour.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_009', difficulty: 'standard',
          question: 'Adolescence is the transitional developmental stage between childhood and.',
          hint: 'Revisit c11_hs_cbse_02_006 (identity development), c11_hs_cbse_02_008 (pubertal changes).',
          misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model.',
          parts: [
                { id: 'a', prompt: 'A 13-year-old girl shows sudden mood swings, argues with parents about clothing choices, and insists on privacy.', answer: 'Erikson\'s stage "identity vs',
                  options: ['Erikson\'s stage "identity vs', 'adolescent rebellion'],
                  hint: 'Revisit c11_hs_cbse_02_006 (identity development), c11_hs_cbse_02_008 (pubertal changes), and.',
                  misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by G. Stanley Hall).' },
                { id: 'b', prompt: 'Design a 4-session school-based module to reduce risky sexual behavior among 15-year-olds in an urban Indian school.', answer: 'Session 1: "My Brain on Risk"',
                  options: ['Session 1: "My Brain on Risk"', 'adolescent rebellion'],
                  hint: 'Revisit c11_hs_cbse_02_006 (identity development), c11_hs_cbse_02_008 (pubertal changes), and.',
                  misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by G. Stanley Hall).' }
          ],
            remediations: { 'adolescent-rebellion-is-universal-and': { steps: ['If a student equates adolescence with inevitable rebellion, assign: (1) Read c11_psy_cbse_03_010 (Adolescence.', '(2) Analyze the "Parent-Adolescent Conflict" dataset from NCERT\'s Class 12 Practical Manual — calculate percentage.', '(3) Interview two adolescents from different family types (authoritative vs.', 'authoritarian) and compare conflict narratives.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_010', difficulty: 'standard',
          question: 'Adulthood and ageing encompass the continuous developmental processes from.',
          hint: 'If stuck, review Erikson\'s stages (c12_hs_cbse_03_004) and the lifespan perspective.',
          misconception: 'Students often believe that ageing is synonymous with universal, inevitable decline in all domains, and that.',
          parts: [
                { id: 'a', prompt: 'List the three substages of adulthood with their approximate age ranges and name the primary psychosocial crisis (per Erikson) for each substage.', answer: 'Early adulthood (≈20–40): Intimacy vs',
                  options: ['Early adulthood (≈20–40): Intimacy vs', 'successful ageing'],
                  hint: 'If stuck, review Erikson\'s stages (c12_hs_cbse_03_004) and the lifespan perspective.',
                  misconception: 'Students often believe that ageing is synonymous with universal, inevitable decline in all domains, and that "successful ageing" means.' },
                { id: 'b', prompt: 'Explain why "crystallised intelligence" tends to remain stable or increase with age while "fluid intelligence" typically declines, and give one real-life.', answer: 'Crystallised intelligence relies on accumulated knowledge and experience (e.g.,',
                  options: ['Crystallised intelligence relies on accumulated knowledge and experience (e.g.,', 'successful ageing'],
                  hint: 'If stuck, review Erikson\'s stages (c12_hs_cbse_03_004) and the lifespan perspective.',
                  misconception: 'Students often believe that ageing is synonymous with universal, inevitable decline in all domains, and that "successful ageing" means.' },
                { id: 'c', prompt: 'A 52-year-old woman reports reduced bone density, occasional hot flashes, and increased LDL cholesterol.', answer: 'She is experiencing menopause (perimenopause/menopause)',
                  options: ['She is experiencing menopause (perimenopause/menopause)', 'successful ageing'],
                  hint: 'If stuck, review Erikson\'s stages (c12_hs_cbse_03_004) and the lifespan perspective.',
                  misconception: 'Students often believe that ageing is synonymous with universal, inevitable decline in all domains, and that "successful ageing" means.' }
          ],
            remediations: { 'ageing-is-synonymous-with-universal': { steps: ['Revisit Erikson\'s stages (c12_hs_cbse_03_004) and create a timeline mapping each crisis to adulthood substages.', 'Watch a 10-minute video on the HAROLD model and Baltes\' SOC model; then write a one-paragraph explanation of how.', 'Complete a table contrasting "typical ageing" vs.', '"pathological ageing" for physical, cognitive, and socio-emotional domains using the NCERT Class 12 textbook (Chapter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_011', difficulty: 'standard',
          question: 'Children with Special Needs (CWSN) refers to children who have a disability.',
          hint: 'If stuck, revisit c12_hs_cbse_03_002 (Stages of Human Development) and.',
          misconception: 'Students often believe "inclusion = admission" — that enrolling a child with disability in a regular school constitutes.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the three models of disability (medical, social, and bio-psycho-social) and state the core belief of each in one sentence.', answer: 'Correct answer: Medical model',
                  options: ['Correct answer: Medical model', 'fixing the person', 'removing barriers', 'inclusion = admission'],
                  hint: 'If stuck, revisit c12_hs_cbse_03_002 (Stages of Human Development) and c11_psy_cbse_03_004 (Neonate.',
                  misconception: 'Students often believe "inclusion = admission" — that enrolling a child with disability in a regular school constitutes inclusion.' }
          ],
            remediations: { 'inclusion-admission-that-enrolling-a': { steps: ['If a student cannot distinguish integration from inclusion or defaults to child-deficit explanations: Step 1 — Have.', 'Step 3 — Give a case study of a child with cerebral palsy; have them list 3 barriers in each domain (physical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_012', difficulty: 'standard',
          question: 'Family Welfare Programmes and Policies in India refer to the organized.',
          hint: 'If stuck, revisit the sibling nodes on Early Childhood Development (c12_hs_cbse_03_008).',
          misconception: 'Students often believe that "food fortification" and "food supplementation" are the same thing.',
          parts: [
                { id: 'a', prompt: 'What is the full form of ICDS and which age group of children does it primarily cover?', answer: 'ICDS stands for Integrated Child Development Services',
                  options: ['ICDS stands for Integrated Child Development Services', 'ICDS covers school-age children 6-14 years', 'ICDS is only a feeding programme', 'food fortification'],
                  hint: 'If stuck, revisit the sibling nodes on Early Childhood Development (c12_hs_cbse_03_008) and.',
                  misconception: 'Students often believe that "food fortification" and "food supplementation" are the same thing.' }
          ],
            remediations: { 'food-fortification-and-food-supplementation': { steps: ['If the student confuses fortification and supplementation: (1) Ask them to re-read Table 3.1 in the textbook and.', '(2) Give two concrete examples: "Salt with iodine = fortification; Iron tablet given to pregnant woman.', '(4) Re-test with a diagnostic question: "Why is fortification considered more sustainable than supplementation for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
