import type { SimDef } from '../../engine/types';
import C11_HomeScienceUnderstandingFamilyCommunitySocietySim from '../../../simulations/c6_12/C11_HomeScienceUnderstandingFamilyCommunitySocietySim';

/** v3 wrapped master — C11_HomeScienceUnderstandingFamilyCommunitySocietySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_homescienceunderstandingfamilycommunitysocietysim: SimDef = {
    id: 'v3w_c11_homescienceunderstandingfamilycommunitysocietysim',
    title: 'Family as a Central Social Unit and Context for Individual Development',
    subtitle: 'This node covers the family as a central social unit in Human Ecology and Family.',
    classLevel: 11, subject: 'science', topic: 'Family as a Central Social Unit and Context for Individual Development',
    chapters: [],
    nodeIds: ['c11_hs_cbse_01_004', 'c11_hs_cbse_01_005', 'c11_hs_cbse_01_007', 'c11_hs_cbse_01_011', 'c11_hs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a 16-year-old student, Rohan, who excels in science but struggles with anxiety before board exams.', goal: 'Master Home Science Understanding Family Community..' },
    discovery: {
        question: 'The NCERT text states Home Science was "not intended to be a subject only about the \'home\'." Explain in your own words what the *original* interdisciplinary.',
        options: ['The original goal was to create an interdisciplinary field empowering students', 'it was always about teaching girls housework', 'housewife training'],
        answer: 'The original goal was to create an interdisciplinary field empowering students',
        hook: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the.',
    },
    teaching: [
        { title: 'Family is the primary social institution.', text: 'Family is the primary social institution that provides the immediate ecological context for human development, characterized by enduring emotional bonds, shared resources, intergenerational care, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hs_cbse_01_004', title: 'Family is the primary social.',
          scaffold: { problem: 'The Sharma family (father: software engineer, mother: teacher, two children aged 14 and 9, paternal grandmother) lives in Bengaluru.',
            steps: [
            { text: 'Identify the pre-transition family structure (3-generation joint family, dual-income) and post-transition structure.' },
            { text: 'Map resource flows: Economic - father\'s income increases but remittance costs appear; mother\'s salary becomes sole.' },
            { text: 'Analyze proximal processes for the 14-year-old: Loss of father\'s direct academic mentoring; gain of mother\'s.' },
            { text: 'Identify new mesosystem linkages: Mother-school communication increases (PTAs, homework monitoring).' },
            { text: 'Synthesize: This is a \'structural reorganization\' ecological transition.', faded: true, blankAnswer: '(a) Structure shifts from co-resident joint family to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_01_005', title: 'Synergistic relationships in Human.',
          scaffold: { problem: 'A tribal family in Central India collects minor forest produce (mahua, tendu leaves) for their livelihood.',
            steps: [
            { text: 'Identify the four components: Human (tribal collectors), Family (household economy, gender roles), Society (forest.' },
            { text: 'Map the pre-restriction synergies: Family labor + Forest resources = Income/Food; Community norms regulate sustainable.' },
            { text: 'Analyze the disruption: Restriction breaks the Family-Environment resource link → Income drops → Family migrates or.' },
            { text: 'Trace cascading effects: Migration weakens Village social cohesion (Society); reduced human presence may alter forest.' },
            { text: 'Synthesize the new emergent state: The \'synergy\' shifts from sustainable use to conflict—family impoverishment,.', faded: true, blankAnswer: 'The restriction triggers a cascade: (1) Family food.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_01_007', title: 'The historical evolution of Home.',
          scaffold: { problem: 'A Class 11 student argues: "Home Science was created in 1932 to teach Indian girls how to be good housewives.',
            steps: [
            { text: 'Identify the two claims in the student\'s argument: (a) 1932 purpose = housewife training; (b) Renaming reason =.' },
            { text: 'Retrieve counter-evidence for Claim (a) from the text: The founders (Sarojini Naidu, Rajkumari Amrit Kaur, Kamaladevi.' },
            { text: 'Retrieve counter-evidence for Claim (b) from the text: The renaming addressed a structural problem — "boys were either.' },
            { text: 'Synthesize: The student\'s argument confuses the *mid-century distortion* (gender-typing) with the *founding intent*.', faded: true, blankAnswer: 'The student\'s argument is historically inaccurate on both.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_01_011', title: 'Quality of Life (QoL) in HEFS is the.',
          scaffold: { problem: 'A rural adolescent girl, Meera (16), drops out of school to help with household chores and sibling care.',
            steps: [
            { text: 'Identify the five resource dimensions from the HEFS QoL definition: Physical, Economic, Social, Psychological,.' },
            { text: 'Map Meera\'s current situation to each dimension: Physical (heavy labour, possible malnutrition); Economic (no.' },
            { text: 'Contrast with potential QoL if she continued education + HEFS: Physical (nutrition knowledge, health management);.' },
            { text: 'Identify the synergy failure: The family\'s "Home Science" mental model captures only a narrow slice of Physical.' },
            { text: 'Design Intervention 1 (Communication & Extension + Human Development): Community workshop for parents showing.' },
            { text: 'Design Intervention 2 (Resource Management + Food & Nutrition): Meera joins a part-time "Nutrition Entrepreneurship".', faded: true, blankAnswer: 'Meera\'s QoL is severely constrained across all five.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_01_006', title: 'Adolescence is a critical transitional.',
          scaffold: { problem: 'Rohan, 13, lives in a peri-urban settlement. His father works double shifts, mother does piece-work embroidery.',
            steps: [
            { text: 'Identify biological ecology changes — growth spurt (10 cm/8 months), increased metabolic demand (constant hunger),.' },
            { text: 'Identify economic ecology constraints — family income instability, hand-me-down clothing (Fabric & Apparel resource.' },
            { text: 'Identify social ecology shifts — peer avoidance due to voice/body changes, reduced peer interaction, family role as.' },
            { text: 'Identify psychological ecology impacts — body discomfort, possible shame/stigma, identity confusion (student vs.' },
            { text: 'Map synergies — Growth spurt + tight clothing + voice change → social withdrawal → lost peer support → increased family.' },
            { text: 'HEFS intervention leverage points — Nutrition: school meal + nutrition education; Clothing: low-cost adaptive garments;.', faded: true, blankAnswer: 'Rohan\'s case shows a turning point where biological.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_01_005', title: 'Identify each idea',
          dissect: { specimen: 'Family as a Central Social Unit and Context for Individual Development', spots: [
            { id: 's1', label: 'Family is the primary social', prompt: 'Which idea is this? — Family is the primary social institution that provides the immediate ecological context.', answer: 'Family is the primary social', options: ['Family is the primary social', 'Synergistic relationships in Human Ecology', 'The historical evolution of Home', 'Quality of Life QoL in'] },
            { id: 's2', label: 'Synergistic relationships in Human Ecology', prompt: 'Which idea is this? — Synergistic relationships in Human Ecology and Family Sciences refer to the dynamic,.', answer: 'Synergistic relationships in Human Ecology', options: ['Synergistic relationships in Human Ecology', 'Family is the primary social', 'The historical evolution of Home', 'Quality of Life QoL in'] },
            { id: 's3', label: 'The historical evolution of Home', prompt: 'Which idea is this? — The historical evolution of Home Science in India refers to the process beginning in the.', answer: 'The historical evolution of Home', options: ['The historical evolution of Home', 'Family is the primary social', 'Synergistic relationships in Human Ecology', 'Quality of Life QoL in'] },
            { id: 's4', label: 'Quality of Life QoL in', prompt: 'Which idea is this? — Quality of Life (QoL) in HEFS is the multidimensional state of well-being achieved when.', answer: 'Quality of Life QoL in', options: ['Quality of Life QoL in', 'Family is the primary social', 'Synergistic relationships in Human Ecology', 'The historical evolution of Home'] },
            { id: 's5', label: 'Adolescence is a critical transitional', prompt: 'Which idea is this? — Adolescence is a critical transitional developmental stage (approximately 10-19 years).', answer: 'Adolescence is a critical transitional', options: ['Adolescence is a critical transitional', 'Family is the primary social', 'Synergistic relationships in Human Ecology', 'The historical evolution of Home'] }
          ] } }
    ],
    explore: { component: C11_HomeScienceUnderstandingFamilyCommunitySocietySim, prompt: 'Explore the interactive — Family as a Central Social Unit and Context for Individual Development' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_004', difficulty: 'standard',
          question: 'Family is the primary social institution that provides the immediate ecological.',
          hint: 'Revisit the \'Scope of Human Ecology\' node (c11_hs_cbse_01_003) and create a 2x2 matrix.',
          misconception: 'Students often conflate \'family structure\' (who lives together) with \'family functioning\' (how they interact), assuming.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Family is the primary social institution that provides the immediate ecological context',
                  options: ['Family is the primary social institution that provides the immediate ecological context', 'Synergistic relationships in Human Ecology and Family Sciences refer to the dynamic,', 'The historical evolution of Home Science in India refers to the process beginning in the', 'Quality of Life (QoL) in HEFS is the multidimensional state of well-being achieved when'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate \'family structure\' (who lives together) with \'family functioning\' (how they interact), assuming that a particular.' }
          ],
            remediations: { 'students-often-conflate-family-structure': { steps: ['If a student equates structure with functioning: 1) Present two contrasting case studies: a joint family with high.', 'a single-parent family with high warmth/clear routines.', '2) Ask the student to rate each on \'adolescent well-being\' using the Family Assessment Device dimensions.', '3) Guide them to see that the single-parent family scores higher on functioning dimensions despite \'deficit\' structure.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_005', difficulty: 'standard',
          question: 'Synergistic relationships in Human Ecology and Family Sciences refer to the.',
          hint: 'Revisit c11_hs_cbse_01_002 (biological origin of ecology) and c11_hs_cbse_01_004 (family.',
          misconception: 'Students often equate \'synergistic relationship\' with \'mutual benefit\' or \'cooperation\', assuming all interactions are.',
          parts: [
                { id: 'a', prompt: 'A rural family decides to sell their agricultural land to a factory and move to an urban slum.', answer: 'the family\'s internal resource management, (',
                  options: ['the family\'s internal resource management, (', 'family gets money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'synergistic relationship\' with \'mutual benefit\' or \'cooperation\', assuming all interactions are positive and.' }
          ],
            remediations: { 'students-often-equate-synergistic-relationship': { steps: ['If a student describes only positive interactions, ask: "When a family burns crop residue for quick field clearing, the.', 'Is this still synergy?" Guide them to redefine synergy as *any* reciprocal interaction where the whole system\'s.', 'Have them re-draw the concept map for Diagnostic Question 6, explicitly labeling two arrows as "trade-off" or "negative.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_007', difficulty: 'standard',
          question: 'The historical evolution of Home Science in India refers to the process.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) — specifically the.',
          misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the.',
          parts: [
                { id: 'a', prompt: 'The NCERT text states Home Science was "not intended to be a subject only about the \'home\'." Explain in your own words what the *original* interdisciplinary.', answer: 'The original goal was to create an interdisciplinary field empowering students',
                  options: ['The original goal was to create an interdisciplinary field empowering students', 'it was always about teaching girls housework', 'housewife training'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the renaming to HEFS is just.' }
          ],
            remediations: { 'home-science-was-originally-designed': { steps: ['If a student holds this misconception, do NOT simply re-read the timeline.', 'Instead: (1) Show them the 1932 Lady Irwin College prospectus excerpt (or a reconstructed version): "Courses in Food.', 'Ask: "Why would *these* women create a \'cooking college\'?" (3) Have the student map the *causal chain*: Colonial lack.', 'The fix is replacing the *static label* with the *dynamic historical struggle*.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Renaming Home Science to Human Ecology and Family Sciences was primarily a marketing exercise to make the subject sound more modern.".', answer: '**Position:** The statement is false',
                  options: ['**Position:** The statement is false', 'marketing', 'housewife training'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the renaming to HEFS is just.' }
          ],
            remediations: { 'home-science-was-originally-designed': { steps: ['If a student holds this misconception, do NOT simply re-read the timeline.', 'Instead: (1) Show them the 1932 Lady Irwin College prospectus excerpt (or a reconstructed version): "Courses in Food.', 'Ask: "Why would *these* women create a \'cooking college\'?" (3) Have the student map the *causal chain*: Colonial lack.', 'The fix is replacing the *static label* with the *dynamic historical struggle*.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_011', difficulty: 'standard',
          question: 'Quality of Life (QoL) in HEFS is the multidimensional state of well-being.',
          hint: 'Revisit c11_hs_cbse_01_003 (Scope of Human Ecology) and c11_hs_cbse_01_005 (Synergistic.',
          misconception: 'Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house size) and therefore.',
          parts: [
                { id: 'a', prompt: 'Compare the \'Home Science\' goal (as historically perceived) with the \'HEFS\' goal (Quality of Life) across three axes: (a) Target population, (b) Scope of.', answer: 'Target population, (',
                  options: ['Target population, (', 'both are same', 'HEFS adds more topics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house size) and therefore think HEFS is about.' }
          ],
            remediations: { 'students-equate-quality-of-life': { steps: ['Ask the student to list five things they did yesterday that made their day "good." 2.', 'Categorise each into: Physical (ate, slept), Economic (spent/saved), Social (talked, helped), Psychological (felt.', 'Highlight any missing dimension — that gap *is* a QoL vulnerability.', 'Re-read the NCERT paragraph: "Knowledge in these areas is essential to sustain and augment one\'s quality of life,.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house size) and therefore.',
          parts: [
                { id: 'a', prompt: 'Compare the \'Home Science\' goal (as historically perceived) with the \'HEFS\' goal (Quality of Life) across three axes: (a) Target population, (b) Scope of.', answer: 'Target population, (',
                  options: ['Target population, (', 'both are same', 'HEFS adds more topics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house size) and therefore think HEFS is about.' }
          ],
            remediations: { 'students-equate-quality-of-life': { steps: ['Ask the student to list five things they did yesterday that made their day "good." 2.', 'Categorise each into: Physical (ate, slept), Economic (spent/saved), Social (talked, helped), Psychological (felt.', 'Highlight any missing dimension — that gap *is* a QoL vulnerability.', 'Re-read the NCERT paragraph: "Knowledge in these areas is essential to sustain and augment one\'s quality of life,.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_006', difficulty: 'standard',
          question: 'Adolescence is a critical transitional developmental stage (approximately 10-19.',
          hint: 'Revisit c11_hs_cbse_01_002 (Concept of Ecology: Biological Origin and Human Application).',
          misconception: 'Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height, weight, secondary.',
          parts: [
                { id: 'a', prompt: 'State the age range defined by WHO for adolescence and explain why HEFS specifically identifies this period as a "turning point" in human development rather.', answer: 'WHO defines adolescence as 10-19 years',
                  options: ['WHO defines adolescence as 10-19 years', 'puberty', 'teenage years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height, weight, secondary sexual characteristics),.' }
          ],
            remediations: { 'students-equate-adolescence-as-a': { steps: ['Ask the student to draw a concept map with "Adolescence" at centre and four branches: Biological, Cognitive, Emotional,.', 'Use coloured pens to draw lines connecting changes across branches (e.g., growth spurt → body image → clothing choices.', 'Ask: "If we only addressed the biological branch, which connections would be broken?"', 'Introduce the HEFS definition: "Turning point = simultaneous multi-domain reorganisation requiring integrated support."', 'Assign a 24-hour observation of one adolescent (self or other) logging moments where two+ domains intersect.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
