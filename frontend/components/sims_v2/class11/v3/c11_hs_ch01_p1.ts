import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch01_p1: SimDef = {
    id: 'v3_c11_hs_ch01_p1',
    title: 'Introduction to Human Ecology and Family Sciences · Part 1/2',
    subtitle: 'Discover the science hiding behind a misnamed subject.',
    classLevel: 11, subject: 'home_science', topic: 'Introduction to Human Ecology and Family Sciences · Part 1/2',
    chapters: ['c11_hs_ch01'],
    nodeIds: ['c11_hs_cbse_01_001', 'c11_hs_cbse_01_002', 'c11_hs_cbse_01_003', 'c11_hs_cbse_01_004', 'c11_hs_cbse_01_005', 'c11_hs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a student decoding what HEFS actually studies', intro: 'Choosing dinner isn\'t just appetite — season, budget, festival and stress all vote. That negotiation is the subject.', goal: 'Define human ecology\'s multi-dimensional environment and dispel the domestic-skills stereotype.' },
    discovery: {
        question: 'A Class 11 boy skips Human Ecology and Family Sciences: \'it\'s cooking and stitching for girls.\' Is he describing the subject correctly?',
        options: ['No — it\'s an interdisciplinary science of humans-in-environments, explicitly renamed to shed the gendered \'home science\' tag', 'Yes — it\'s the old home science with a new label', 'Yes — the content never changed', 'No — it\'s only about nutrition now'],
        answer: 'No — it\'s an interdisciplinary science of humans-in-environments, explicitly renamed to shed the gendered \'home science\' tag',
        hook: 'Lady Irwin College\'s founders — Naidu, Amrit Kaur, Chattopadhyay — built it in 1932 for service to home AND society; the stereotype came later.',
    },
    teaching: [
        { title: 'Defining Human Ecology and Family Sciences (HEFS): Meaning and Scope', text: 'Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that studies the dynamic, reciprocal relationships between human beings (as individuals and family units) and their.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take an everyday dinner decision and split it into the four environments — physical, economic, social, psychological — that silently shaped it.',
        labels: ['Defining Human Ecology', 'The Concept of Ecology', 'Scope of Human Ecology', 'Family as a Central', 'Synergistic Relationships: Humans, Families,', 'Adolescence as a Turning'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_001', title: 'Defining Human Ecology and Family Sciences (HEFS): Meaning and Scope',
          caseStudy: { intro: 'Imagine you are choosing a Class 11 subject and see "Human Ecology and Family Sciences" on the list—what does that actually mean?',
            decisions: [{ prompt: 'Define the term \'Human Ecology\' as used in the HEFS discipline, distinguishing it from the biological definition of ecology.', options: [
                { text: 'Human Ecology in HEFS refers to the study of the complex relationships between human', outcome: 'Human Ecology in HEFS refers to the study of the complex relationships between human beings (as.' },
                { text: 'study of organisms and environment', outcome: 'Not quite — Students believe HEFS is simply the old Home Science with a new name, and that it only teaches.', reveals: 'hefs-is-simply-the-old' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_002', title: 'The Concept of Ecology: Biological Origin and Human Application',
          caseStudy: { intro: 'Imagine you are choosing what to eat for dinner. Your decision is not just about hunger (biology) — it depends on what vegetables are in season at the local.',
            decisions: [{ prompt: 'Define the term "ecology" as used in biological science.', options: [
                { text: 'Correct answer: Ecology is the branch of biology that studies the interactions between', outcome: 'Correct answer: Ecology is the branch of biology that studies the interactions between living.' },
                { text: 'ecology is the study of nature', outcome: 'Not quite — Students often equate "Human Ecology" with "environmental science" or "nature conservation,".', reveals: 'students-often-equate-human-ecology' },
                { text: 'ecology is about saving trees', outcome: 'Not quite — Students often equate "Human Ecology" with "environmental science" or "nature conservation,".', reveals: 'students-often-equate-human-ecology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_003', title: 'Scope of Human Ecology: Physical, Economic, Social and Psychological Domains',
          caseStudy: { intro: 'Imagine a 16-year-old girl in a rural Uttar Pradesh household who drops out of school after Class 10.',
            decisions: [{ prompt: 'List the four domains of Human Ecology as defined in the NCERT Class 11 HEFS framework and give one concrete example of a factor belonging.', options: [
                { text: 'Correct answer: Physical (e.g., overcrowded housing, lack of clean water), Economic', outcome: 'Correct answer: Physical (e.g., overcrowded housing, lack of clean water), Economic (e.g., family’s.' },
                { text: 'education', outcome: 'Not quite — Students treat the four domains as *independent checklists* — e.g., "Physical = housing, Economic.', reveals: 'students-treat-the-four-domains' },
                { text: 'nutrition', outcome: 'Not quite — Students treat the four domains as *independent checklists* — e.g., "Physical = housing, Economic.', reveals: 'students-treat-the-four-domains' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_006', title: 'Adolescence as a Turning Point in Human Development',
          caseStudy: { intro: 'Imagine a 14-year-old who suddenly refuses family meals, spends hours choosing clothes, argues with parents about phone usage, and experiences mood swings that.',
            decisions: [{ prompt: 'State the age range defined by WHO for adolescence and explain why HEFS specifically identifies this period as a "turning point" in human.', options: [
                { text: 'WHO defines adolescence as 10-19 years', outcome: 'WHO defines adolescence as 10-19 years. HEFS identifies it as a turning point because it is the.' },
                { text: 'puberty', outcome: 'Not quite — Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height.', reveals: 'students-equate-adolescence-as-a' },
                { text: 'teenage years', outcome: 'Not quite — Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height.', reveals: 'students-equate-adolescence-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At subject-selection counselling, a boy likes the look of \'Human Ecology and Family Sciences\' but his friend scoffs: \'That\'s just Home Science renamed — cooking, stitching and childcare. A subject for girls.\'',
            decisions: [{ prompt: 'What is the field actually about?', options: [
                { text: 'Explain the rename as a signal of real change: HEFS studies the reciprocal relationships between people/families and their environments — physical, economic, social, psychological, cultural — to improve quality of life across the lifespan. Managing resources, nutrition, development and communication is rigorous multidisciplinary science, and the gender-typing that excluded boys is exactly what the new name was meant to retire.', outcome: 'The counselling reframes: not domestic skills but a science of human-environment interaction — open to anyone who eats, budgets, lives in a family.' },
                { text: 'Concede the friend\'s point — a rose by any name; it\'s still home economics for girls.', outcome: 'That freezes the discipline at an outdated image: the renaming marked a decades-old university-level shift to a scientific, gender-neutral field.', reveals: 'hefs-is-just-home-science' },
                { text: 'Sell it instead as environmental science — studying how humans affect forests and rivers.', outcome: 'That swaps one error for another: human ecology centres humans and their multi-dimensional environments — economic, social, psychological — not just nature conservation.', reveals: 'human-ecology-is-environmental-science' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every choice you make is ecology: hunger is biology, but what\'s on the plate is economics, custom and mood negotiating.',
            decisions: [{ prompt: 'What comes next? Introduction to Human Ecology and Family Sciences · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Human Ecology and Family Sciences · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_001', difficulty: 'standard',
          question: 'Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that.',
          hint: 'Revisit Class 7 Biology "Adolescence: Definition and Age Range" (c7_bio_ch01_002) and.',
          misconception: 'Students believe HEFS is simply the old Home Science with a new name, and that it only teaches domestic skills.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that studies the',
                  options: ['Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that studies the', 'Human Ecology is the interdisciplinary study of the dynamic, reciprocal relationships', 'The scope of Human Ecology encompasses the dynamic interplay between humans and their', 'Family is the primary social institution that provides the immediate ecological context'],
                  hint: 'Revisit Class 7 Biology "Adolescence: Definition and Age Range" (c7_bio_ch01_002) and Class 10.',
                  misconception: 'Students believe HEFS is simply the old Home Science with a new name, and that it only teaches domestic skills (cooking, stitching.' }
          ],
            remediations: { 'hefs-is-simply-the-old': { steps: ['If a student holds this misconception, do NOT just say "read the textbook." Instead: (1) Show the 1932 Lady Irwin.', 'current HEFS syllabus side-by-side to visualize the expansion from 3 areas to 5 multidisciplinary fields.', '(2) Assign a mini-research task: interview one university Home Science/HEFS professor and one layperson about the.', '(3) Use the \'Exercise A\' from the textbook (listing 5 terms associated with Home Science) as a pre-test, then repeat.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_002', difficulty: 'standard',
          question: 'Human Ecology is the interdisciplinary study of the dynamic, reciprocal.',
          hint: 'Review the concept of food chains and energy flow (c6_biology_ch09_006) and natural.',
          misconception: 'Students often equate "Human Ecology" with "environmental science" or "nature conservation," thinking it is only about.',
          parts: [
                { id: 'a', prompt: 'A family in a coastal village decides to rebuild their house on stilts after repeated flooding.', answer: 'Correct answer: Physical',
                  options: ['Correct answer: Physical', 'floods, water level, wind', 'lists only physical factors (e'],
                  hint: 'Review the concept of food chains and energy flow (c6_biology_ch09_006) and natural selection.',
                  misconception: 'Students often equate "Human Ecology" with "environmental science" or "nature conservation," thinking it is only about how humans affect.' }
          ],
            remediations: { 'students-often-equate-human-ecology': { steps: ['Ask the student to list five factors that influenced their choice of stream (Science/Commerce/Arts) in Class 11.', 'Have them label each factor as Physical (P), Economic (E), Social (S), or Psychological (Ps).', 'If they cannot generate factors for all four categories, prompt: "Did the distance to school matter?', '(P) Did coaching fees matter?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_003', difficulty: 'standard',
          question: 'The scope of Human Ecology encompasses the dynamic interplay between humans and.',
          hint: 'Revisit c11_hs_cbse_01_002\'s "biological origin of ecology" section and practice.',
          misconception: 'Students treat the four domains as *independent checklists* — e.g., "Physical = housing, Economic = income, Social.',
          parts: [
                { id: 'a', prompt: 'Case: A family in Bhopal loses their home in a flood (Physical domain shock).', answer: 'Correct trace: Economic → loss of assets & livelihood (mechanism: destruction of',
                  options: ['Correct trace: Economic → loss of assets & livelihood (mechanism: destruction of', 'they become poor', 'stops at "they become poor" fails to identify *mechanisms* (e'],
                  hint: 'Revisit c11_hs_cbse_01_002\'s "biological origin of ecology" section and practice converting.',
                  misconception: 'Students treat the four domains as *independent checklists* — e.g., "Physical = housing, Economic = income, Social = family, Psychological.' }
          ],
            remediations: { 'students-treat-the-four-domains': { steps: ['Show a 2-minute video of a real family (e.g., from *People’s Archive of Rural India*) and pause every 30 seconds.', 'Give a "domain mapping" template with four quadrants and *mandatory* arrow-drawing between quadrants for three case.', 'Ask student to re-narrate the Bhopal flood case (Diagnostic Q3) *backwards* — start from Psychological distress and.', 'Assign: "Interview one adult about a major life change; map the four domains in their story with arrows."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_004', difficulty: 'standard',
          question: 'Family is the primary social institution that provides the immediate ecological.',
          hint: 'Revisit the \'Scope of Human Ecology\' node (c11_hs_cbse_01_003) and create a 2x2 matrix.',
          misconception: 'Students often conflate \'family structure\' (who lives together) with \'family functioning\' (how they interact), assuming.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Family is the primary social institution that provides the immediate ecological context',
                  options: ['Family is the primary social institution that provides the immediate ecological context', 'Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that studies the', 'Human Ecology is the interdisciplinary study of the dynamic, reciprocal relationships', 'The scope of Human Ecology encompasses the dynamic interplay between humans and their'],
                  hint: 'Revisit the \'Scope of Human Ecology\' node (c11_hs_cbse_01_003) and create a 2x2 matrix mapping.',
                  misconception: 'Students often conflate \'family structure\' (who lives together) with \'family functioning\' (how they interact), assuming that a particular.' }
          ],
            remediations: { 'students-often-conflate-family-structure': { steps: ['If a student equates structure with functioning: 1) Present two contrasting case studies: a joint family with high.', 'a single-parent family with high warmth/clear routines.', '2) Ask the student to rate each on \'adolescent well-being\' using the Family Assessment Device dimensions.', '3) Guide them to see that the single-parent family scores higher on functioning dimensions despite \'deficit\' structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_005', difficulty: 'standard',
          question: 'Synergistic relationships in Human Ecology and Family Sciences refer to the.',
          hint: 'Revisit c11_hs_cbse_01_002 (biological origin of ecology) and c11_hs_cbse_01_004 (family.',
          misconception: 'Students often equate \'synergistic relationship\' with \'mutual benefit\' or \'cooperation\', assuming all interactions are.',
          parts: [
                { id: 'a', prompt: 'A rural family decides to sell their agricultural land to a factory and move to an urban slum.', answer: 'the family\'s internal resource management, (',
                  options: ['the family\'s internal resource management, (', 'family gets money'],
                  hint: 'Revisit c11_hs_cbse_01_002 (biological origin of ecology) and c11_hs_cbse_01_004 (family as central.',
                  misconception: 'Students often equate \'synergistic relationship\' with \'mutual benefit\' or \'cooperation\', assuming all interactions are positive and.' }
          ],
            remediations: { 'students-often-equate-synergistic-relationship': { steps: ['If a student describes only positive interactions, ask: "When a family burns crop residue for quick field clearing, the.', 'Is this still synergy?" Guide them to redefine synergy as *any* reciprocal interaction where the whole system\'s.', 'Have them re-draw the concept map for Diagnostic Question 6, explicitly labeling two arrows as "trade-off" or "negative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_006', difficulty: 'standard',
          question: 'Adolescence is a critical transitional developmental stage (approximately 10-19.',
          hint: 'Revisit c11_hs_cbse_01_002 (Concept of Ecology: Biological Origin and Human Application).',
          misconception: 'Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height, weight, secondary.',
          parts: [
                { id: 'a', prompt: 'State the age range defined by WHO for adolescence and explain why HEFS specifically identifies this period as a "turning point" in human development rather.', answer: 'WHO defines adolescence as 10-19 years',
                  options: ['WHO defines adolescence as 10-19 years', 'puberty', 'teenage years'],
                  hint: 'Revisit c11_hs_cbse_01_002 (Concept of Ecology: Biological Origin and Human Application) to rebuild.',
                  misconception: 'Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height, weight, secondary sexual characteristics).' }
          ],
            remediations: { 'students-equate-adolescence-as-a': { steps: ['Ask the student to draw a concept map with "Adolescence" at centre and four branches: Biological, Cognitive, Emotional.', 'Use coloured pens to draw lines connecting changes across branches (e.g., growth spurt → body image → clothing choices.', 'Ask: "If we only addressed the biological branch, which connections would be broken?"', 'Introduce the HEFS definition: "Turning point = simultaneous multi-domain reorganisation requiring integrated support."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
