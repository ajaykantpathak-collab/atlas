import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch01_p2: SimDef = {
    id: 'v3_c11_hs_ch01_p2',
    title: 'Introduction to Human Ecology and Family Sciences · Part 2/2',
    subtitle: 'Discover the science hiding behind a misnamed subject.',
    classLevel: 11, subject: 'home_science', topic: 'Introduction to Human Ecology and Family Sciences · Part 2/2',
    chapters: ['c11_hs_ch01'],
    nodeIds: ['c11_hs_cbse_01_007', 'c11_hs_cbse_01_008', 'c11_hs_cbse_01_009', 'c11_hs_cbse_01_010', 'c11_hs_cbse_01_011', 'c11_hs_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a student decoding what HEFS actually studies', intro: 'Choosing dinner isn\'t just appetite — season, budget, festival and stress all vote. That negotiation is the subject.', goal: 'Define human ecology\'s multi-dimensional environment and dispel the domestic-skills stereotype.' },
    discovery: {
        question: 'A Class 11 boy skips Human Ecology and Family Sciences: \'it\'s cooking and stitching for girls.\' Is he describing the subject correctly?',
        options: ['No — it\'s an interdisciplinary science of humans-in-environments, explicitly renamed to shed the gendered \'home science\' tag', 'Yes — it\'s the old home science with a new label', 'Yes — the content never changed', 'No — it\'s only about nutrition now'],
        answer: 'No — it\'s an interdisciplinary science of humans-in-environments, explicitly renamed to shed the gendered \'home science\' tag',
        hook: 'Lady Irwin College\'s founders — Naidu, Amrit Kaur, Chattopadhyay — built it in 1932 for service to home AND society; the stereotype came later.',
    },
    teaching: [
        { title: 'Historical Evolution of Home Science: From Separate Disciplines to Unified Field', text: 'The historical evolution of Home Science in India refers to the process beginning in the early 20th century where distinct disciplines like Foods and Nutrition, Clothing and Textiles, and Extension.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take an everyday dinner decision and split it into the four environments — physical, economic, social, psychological — that silently shaped it.',
        labels: ['Historical Evolution of Home', 'Gender-Typing of Home Science', 'Renaming Home Science', 'Multidisciplinary Nature of HEFS', 'Quality of Life as', 'Key Historical Figures'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_007', title: 'Historical Evolution of Home Science: From Separate Disciplines to Unified Field',
          caseStudy: { intro: 'Imagine you are explaining to a friend why your Class 11 textbook is titled "Human Ecology and Family Sciences" instead of "Home Science." Start by asking.',
            decisions: [{ prompt: 'In which year were the separate disciplines of Foods and Nutrition, Clothing and Textiles, and Extension Education brought together under.', options: [
                { text: 'The unification occurred in 1932 with the establishment of Lady Irwin College in Delhi', outcome: 'The unification occurred in 1932 with the establishment of Lady Irwin College in Delhi.' },
                { text: 'after Independence', outcome: 'Not quite — Students often believe Home Science was *originally* designed as a "housewife training" subject for.', reveals: 'home-science-was-originally-designed' },
                { text: 'housewife training', outcome: 'Not quite — Students often believe Home Science was *originally* designed as a "housewife training" subject for.', reveals: 'home-science-was-originally-designed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_008', title: 'Gender-Typing of Home Science and Its Impact on Participation',
          caseStudy: { intro: 'Imagine a Class 11 boy, Arjun, who loves nutrition science and wants to become a sports dietitian.',
            decisions: [{ prompt: 'Define \'gender-typing\' in the specific context of Home Science education in India as described in the NCERT textbook.', options: [
                { text: 'Gender-typing in Home Science is the historical process where the discipline became', outcome: 'Gender-typing in Home Science is the historical process where the discipline became mentally and.' },
                { text: 'girls take Home Science, boys don\'t', outcome: 'Not quite — Students believe gender-typing is simply "girls take Home Science, boys don\'t" — a static.', reveals: 'gender-typing-is-simply-girls' },
                { text: 'gender-typing is simply "girls take Home Science, boys don\'t"', outcome: 'Not quite — Students believe gender-typing is simply "girls take Home Science, boys don\'t" — a static.', reveals: 'gender-typing-is-simply-girls' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_009', title: 'Renaming Home Science to HEFS: Rationale and Significance',
          caseStudy: { intro: 'Imagine a Class 11 boy telling his friends he has opted for "Home Science" and they laugh, asking if he will learn to make rotis.',
            decisions: [{ prompt: 'What was the primary historical event that institutionalised Home Science as a formal discipline in India, and in what year did it occur?', options: [
                { text: 'The establishment of Lady Irwin College in Delhi in 1932 institutionalised Home Science', outcome: 'The establishment of Lady Irwin College in Delhi in 1932 institutionalised Home Science by bringing.' },
                { text: 'after Independence', outcome: 'Not quite — Students believe the renaming was merely a cosmetic rebranding to make the subject "sound modern".', reveals: 'the-renaming-was-merely-a' },
                { text: 'sound modern', outcome: 'Not quite — Students believe the renaming was merely a cosmetic rebranding to make the subject "sound modern".', reveals: 'the-renaming-was-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_010', title: 'Multidisciplinary Nature of HEFS: Five Integrated Sub-Fields',
          caseStudy: { intro: 'Imagine a 16-year-old student, Priya, who feels tired during exams, has outgrown her uniforms, and struggles to manage her study time and pocket money.',
            decisions: [{ prompt: 'Name the five integrated sub-fields of HEFS as per the NCERT Class 11 curriculum.', options: [
                { text: 'The five sub-fields are: Human Development, Food and Nutrition, Fabric and Apparel,', outcome: 'The five sub-fields are: Human Development, Food and Nutrition, Fabric and Apparel, Communication.' },
                { text: 'Cooking', outcome: 'Not quite — Students often believe the five sub-fields are just new names for the old "Home Science".', reveals: 'the-five-sub-fields-are' },
                { text: 'Stitching', outcome: 'Not quite — Students often believe the five sub-fields are just new names for the old "Home Science".', reveals: 'the-five-sub-fields-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_011', title: 'Quality of Life as the Central Goal of HEFS',
          caseStudy: { intro: 'Imagine two Class 11 students: Arjun, who believes HEFS is "cooking and stitching for girls," and Priya, who sees it as "managing resources for a better life.".',
            decisions: [{ prompt: 'State the NCERT definition of \'Human Ecology\' and explain why \'Quality of Life\' is positioned as the central goal of HEFS rather than \'Home.', options: [
                { text: 'Human Ecology studies the dynamic relationships between human beings (the organism) and', outcome: 'Human Ecology studies the dynamic relationships between human beings (the organism) and their.' },
                { text: 'QoL means happiness', outcome: 'Not quite — Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house.', reveals: 'students-equate-quality-of-life' },
                { text: 'Home Management is the goal', outcome: 'Not quite — Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house.', reveals: 'students-equate-quality-of-life' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_012', title: 'Key Historical Figures in Establishing Home Science Education in India',
          caseStudy: { intro: 'Imagine you are a girl in 1930s Delhi: schools for girls are rare, college is nearly unheard of, and "home science" sounds like cooking lessons.',
            decisions: [{ prompt: 'Name the four eminent women associated with the founding of Lady Irwin College in 1932 as stated in the NCERT textbook.', options: [
                { text: 'Sarojini Naidu, Rajkumari Amrit Kaur, Kamaladevi Chattopadhyay, and Lady Dorothy Irwin', outcome: 'Sarojini Naidu, Rajkumari Amrit Kaur, Kamaladevi Chattopadhyay, and Lady Dorothy Irwin.' },
                { text: 'only three names, or substituting Annie Besant or Vijaya Lakshmi Pandit', outcome: 'Not quite — Students often conflate Lady Dorothy Irwin (the Viceroy\'s wife) with the Indian nationalist.', reveals: 'students-often-conflate-lady-dorothy' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Human Ecology and Family Sciences · Part 2/2', spots: [
            { id: 's1', label: 'Renaming Home Science to HEFS Rationale and Significance', prompt: 'Which idea is this? — The renaming of Home Science to Human Ecology and Family Sciences (HEFS) is a deliberate.', answer: 'Renaming Home Science to HEFS Rationale and Significance', options: ['Renaming Home Science to HEFS Rationale and Significance', 'Multidisciplinary Nature of HEFS Five Integrated Sub-Fields', 'Quality of Life as the Central Goal of HEFS'] },
            { id: 's2', label: 'Multidisciplinary Nature of HEFS Five Integrated Sub-Fields', prompt: 'Which idea is this? — The multidisciplinary nature of Human Ecology and Family Sciences (HEFS) refers to its.', answer: 'Multidisciplinary Nature of HEFS Five Integrated Sub-Fields', options: ['Multidisciplinary Nature of HEFS Five Integrated Sub-Fields', 'Renaming Home Science to HEFS Rationale and Significance', 'Quality of Life as the Central Goal of HEFS'] },
            { id: 's3', label: 'Quality of Life as the Central Goal of HEFS', prompt: 'Which idea is this? — Quality of Life (QoL) in HEFS is the multidimensional state of well-being achieved when.', answer: 'Quality of Life as the Central Goal of HEFS', options: ['Quality of Life as the Central Goal of HEFS', 'Renaming Home Science to HEFS Rationale and Significance', 'Multidisciplinary Nature of HEFS Five Integrated Sub-Fields'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At subject-selection counselling, a boy likes the look of \'Human Ecology and Family Sciences\' but his friend scoffs: \'That\'s just Home Science renamed — cooking, stitching and childcare. A subject for girls.\'',
            decisions: [{ prompt: 'What is the field actually about?', options: [
                { text: 'Explain the rename as a signal of real change: HEFS studies the reciprocal relationships between people/families and their environments — physical, economic, social, psychological, cultural — to improve quality of life across the lifespan. Managing resources, nutrition, development and communication is rigorous multidisciplinary science, and the gender-typing that excluded boys is exactly what the new name was meant to retire.', outcome: 'The counselling reframes: not domestic skills but a science of human-environment interaction — open to anyone who eats, budgets, lives in a family.' },
                { text: 'Concede the friend\'s point — a rose by any name; it\'s still home economics for girls.', outcome: 'That freezes the discipline at an outdated image: the renaming marked a decades-old university-level shift to a scientific, gender-neutral field.', reveals: 'hefs-is-just-home-science' },
                { text: 'Sell it instead as environmental science — studying how humans affect forests and rivers.', outcome: 'That swaps one error for another: human ecology centres humans and their multi-dimensional environments — economic, social, psychological — not just nature conservation.', reveals: 'human-ecology-is-environmental-science' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Every choice you make is ecology: hunger is biology, but what\'s on the plate is economics, custom and mood negotiating.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_007', difficulty: 'standard',
          question: 'The historical evolution of Home Science in India refers to the process.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) — specifically the.',
          misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the.',
          parts: [
                { id: 'a', prompt: 'The NCERT text states Home Science was "not intended to be a subject only about the \'home\'." Explain in your own words what the *original* interdisciplinary.', answer: 'The original goal was to create an interdisciplinary field empowering students',
                  options: ['The original goal was to create an interdisciplinary field empowering students', 'it was always about teaching girls housework', 'housewife training'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) — specifically the concepts.',
                  misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the renaming to HEFS is just.' }
          ],
            remediations: { 'home-science-was-originally-designed': { steps: ['If a student holds this misconception, do NOT simply re-read the timeline.', 'Instead: (1) Show them the 1932 Lady Irwin College prospectus excerpt (or a reconstructed version): "Courses in Food.', 'Ask: "Why would *these* women create a \'cooking college\'?" (3) Have the student map the *causal chain*: Colonial lack.', 'The fix is replacing the *static label* with the *dynamic historical struggle*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Renaming Home Science to Human Ecology and Family Sciences was primarily a marketing exercise to make the subject sound more modern.".', answer: '**Position:** The statement is false',
                  options: ['**Position:** The statement is false', 'marketing', 'housewife training'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) — specifically the concepts.',
                  misconception: 'Students often believe Home Science was *originally* designed as a "housewife training" subject for girls, and the renaming to HEFS is just.' }
          ],
            remediations: { 'home-science-was-originally-designed': { steps: ['If a student holds this misconception, do NOT simply re-read the timeline.', 'Instead: (1) Show them the 1932 Lady Irwin College prospectus excerpt (or a reconstructed version): "Courses in Food.', 'Ask: "Why would *these* women create a \'cooking college\'?" (3) Have the student map the *causal chain*: Colonial lack.', 'The fix is replacing the *static label* with the *dynamic historical struggle*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_008', difficulty: 'standard',
          question: 'Gender-typing of Home Science refers to the socio-cultural process by which the.',
          hint: 'Revisit Class 10 Civics Chapter 3 "Gender and Politics" (node c10_civ_cbse_03_001).',
          misconception: 'Students believe gender-typing is simply "girls take Home Science, boys don\'t" — a static enrollment fact.',
          parts: [
                { id: 'a', prompt: 'The textbook states: "boys were either not admitted to this area by the schools, or they themselves shied away from studying it." Explain the difference.', answer: 'The first mechanism (not admitted) is *structural/institutional exclusion*',
                  options: ['The first mechanism (not admitted) is *structural/institutional exclusion*', 'lack of interest', 'girls take Home Science, boys don\'t', 'gender-typing is simply "girls take Home Science, boys don\'t"'],
                  hint: 'Revisit Class 10 Civics Chapter 3 "Gender and Politics" (node c10_civ_cbse_03_001), specifically.',
                  misconception: 'Students believe gender-typing is simply "girls take Home Science, boys don\'t" — a static enrollment fact.' }
          ],
            remediations: { 'gender-typing-is-simply-girls': { steps: ['**Deconstruct the label:** Write "Home Science" on board.', 'What images does \'Home\' evoke?', 'What does \'Science\' promise?', 'Why is the combination jarring?" 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_009', difficulty: 'standard',
          question: 'The renaming of Home Science to Human Ecology and Family Sciences (HEFS) is.',
          hint: 'Revisit c11_hs_cbse_01_007 (Historical Evolution) and c11_hs_cbse_01_008 (Gender-Typing).',
          misconception: 'Students believe the renaming was merely a cosmetic rebranding to make the subject "sound modern" or "less feminine,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The renaming of Home Science to Human Ecology and Family Sciences (HEFS) is a deliberate',
                  options: ['The renaming of Home Science to Human Ecology and Family Sciences (HEFS) is a deliberate', 'Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that studies the', 'Human Ecology is the interdisciplinary study of the dynamic, reciprocal relationships', 'The scope of Human Ecology encompasses the dynamic interplay between humans and their'],
                  hint: 'Revisit c11_hs_cbse_01_007 (Historical Evolution) and c11_hs_cbse_01_008 (Gender-Typing) to rebuild.',
                  misconception: 'Students believe the renaming was merely a cosmetic rebranding to make the subject "sound modern" or "less feminine," and that the syllabus.' }
          ],
            remediations: { 'the-renaming-was-merely-a': { steps: ['Have the student read the NCERT "Introduction" section (pages 1-3) and highlight every phrase that describes *what.', 'Ask them to map each of the five HEFS domains (Human Development, Food & Nutrition, Fabric & Apparel, Communication &.', 'Show the 1932 Lady Irwin College prospectus excerpt (if available) alongside the current CBSE syllabus index; have them.', 'Debrief: "The name changed because the *intellectual project* changed — from training women for domesticity to studying.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_010', difficulty: 'standard',
          question: 'The multidisciplinary nature of Human Ecology and Family Sciences (HEFS) refers.',
          hint: 'Revisit the definition of HEFS (c11_hs_cbse_01_001) and the rationale for renaming.',
          misconception: 'Students often believe the five sub-fields are just new names for the old "Home Science" compartments: "Human.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why HEFS is described as "multidisciplinary" rather than just a collection of five separate subjects.', answer: 'HEFS is multidisciplinary',
                  options: ['HEFS is multidisciplinary', 'they are different topics covered in one syllabus', 'Home Science', 'Human Development = Childcare'],
                  hint: 'Revisit the definition of HEFS (c11_hs_cbse_01_001) and the rationale for renaming.',
                  misconception: 'Students often believe the five sub-fields are just new names for the old "Home Science" compartments: "Human Development = Childcare".' }
          ],
            remediations: { 'the-five-sub-fields-are': { steps: ['Ask the student to pick any daily activity (e.g., getting ready for school) and trace how *all five* sub-fields are.', 'Have them read the NCERT paragraph: "It contains within it fields such as Human Development, Food and Nutrition, Fabric.', 'Knowledge in these areas is essential to sustain and augment one\'s quality of life..." and underline "essential.', 'Assign a mini-case: "An adolescent athlete preparing for a competition" — student must write one sentence per sub-field.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_011', difficulty: 'standard',
          question: 'Quality of Life (QoL) in HEFS is the multidimensional state of well-being.',
          hint: 'Revisit c11_hs_cbse_01_003 (Scope of Human Ecology) and c11_hs_cbse_01_005 (Synergistic.',
          misconception: 'Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house size) and therefore.',
          parts: [
                { id: 'a', prompt: 'Compare the \'Home Science\' goal (as historically perceived) with the \'HEFS\' goal (Quality of Life) across three axes: (a) Target population, (b) Scope.', answer: 'Target population, (',
                  options: ['Target population, (', 'both are same', 'HEFS adds more topics'],
                  hint: 'Revisit c11_hs_cbse_01_003 (Scope of Human Ecology) and c11_hs_cbse_01_005 (Synergistic.',
                  misconception: 'Students equate "Quality of Life" with "Standard of Living" (material possessions, income, house size) and therefore think HEFS is about.' }
          ],
            remediations: { 'students-equate-quality-of-life': { steps: ['Ask the student to list five things they did yesterday that made their day "good." 2.', 'Categorise each into: Physical (ate, slept), Economic (spent/saved), Social (talked, helped), Psychological (felt.', 'Highlight any missing dimension — that gap *is* a QoL vulnerability.', 'Re-read the NCERT paragraph: "Knowledge in these areas is essential to sustain and augment one\'s quality of life.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_012', difficulty: 'standard',
          question: 'Key historical figures in establishing Home Science education in India refer.',
          hint: 'Review the AIWC\'s role in the 1920s-30s women\'s movement (Class 10 Civics: Women\'s.',
          misconception: 'Students often conflate Lady Dorothy Irwin (the Viceroy\'s wife) with the Indian nationalist founders, assuming the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key historical figures in establishing Home Science education in India refer to the',
                  options: ['Key historical figures in establishing Home Science education in India refer to the', 'Human Ecology and Family Sciences (HEFS) is an interdisciplinary field that studies the', 'Human Ecology is the interdisciplinary study of the dynamic, reciprocal relationships', 'The scope of Human Ecology encompasses the dynamic interplay between humans and their'],
                  hint: 'Review the AIWC\'s role in the 1920s-30s women\'s movement (Class 10 Civics: Women\'s Political.',
                  misconception: 'Students often conflate Lady Dorothy Irwin (the Viceroy\'s wife) with the Indian nationalist founders, assuming the college was a British.' }
          ],
            remediations: { 'students-often-conflate-lady-dorothy': { steps: ['Have the student re-read the textbook paragraph beginning "A few eminent women were in the vanguard..." and underline.', 'Ask the student to list what Lady Irwin *did* versus what the three Indian women *did*; the asymmetry (patronage vs.', 'Assign a 100-word writing task: "Explain why the AIWC needed a British patron in 1932 but did not need a British.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
