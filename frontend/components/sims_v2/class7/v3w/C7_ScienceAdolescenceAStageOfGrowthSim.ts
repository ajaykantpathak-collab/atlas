import type { SimDef } from '../../engine/types';
import C7_ScienceAdolescenceAStageOfGrowthSim from '../../../simulations/c6_12/C7_ScienceAdolescenceAStageOfGrowthSim';

/** v3 wrapped master — C7_ScienceAdolescenceAStageOfGrowthSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_scienceadolescenceastageofgrowthsim: SimDef = {
    id: 'v3w_c7_scienceadolescenceastageofgrowthsim',
    title: 'Life Stages of Humans: Infancy to Old Age',
    subtitle: 'Covers the broad overview of all human life stages from infancy to old age, focusing on.',
    classLevel: 7, subject: 'science', topic: 'Life Stages of Humans: Infancy to Old Age',
    chapters: [],
    nodeIds: ['c7_bio_ch01_001', 'c7_bio_ch01_002', 'c7_bio_ch01_003', 'c7_bio_ch01_004', 'c7_bio_ch01_005', 'c7_bio_ch01_007', 'c7_bio_ch01_008', 'c7_bio_ch01_009', 'c7_bio_ch01_012', 'c7_bio_ch01_006', 'c7_bio_ch01_010', 'c7_bio_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Look at a family photo album: you see a tiny newborn baby, a toddler taking first steps, a school-going.', goal: 'Master Life Stages of Humans: Infancy to Old Age.' },
    discovery: {
        question: 'What is the standard age range defined for the period of adolescence in humans?',
        options: ['The standard age range for adolescence is 10 to 19 years', 'adolescence', 'puberty'],
        answer: 'The standard age range for adolescence is 10 to 19 years',
        hook: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over.',
    },
    teaching: [
        { title: 'The life stages of humans refer to the.', text: 'The life stages of humans refer to the continuous, progressive biological phases of growth, development, maturation, and aging that an individual passes through from birth to death—specifically.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_bio_ch01_001', title: 'The life stages of humans refer to the.',
          scaffold: { problem: 'A 12-year-old student in a Delhi school notices that their younger sibling (aged 2) and older cousin (aged 22) have entirely different body.',
            steps: [
            { text: 'Identify the life stage of each individual (sibling is a toddler/early childhood, student is an adolescent, cousin is.' },
            { text: 'Recall the biological characteristics of early childhood (rapid neural development, reliance on care, proportional.' },
            { text: 'Recall the biological characteristics of adolescence (hormone-driven growth spurt, development of secondary sexual.' },
            { text: 'Recall the biological characteristics of adulthood (stable homeostasis, peak muscular and skeletal maturity, fully.' },
            { text: 'Conclude that differences in physical proportions and capabilities stem directly from the physiological priorities and.', faded: true, blankAnswer: 'The toddler is in childhood (rapid brain and motor.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_002', title: 'Adolescence is the transitional period.',
          scaffold: { problem: 'Priya is a 11-year-old student living in Mumbai. Her younger brother is 8 years old, and her older sister is 17 years old.',
            steps: [
            { text: 'Identify the exact chronological age range for adolescence (10 to 19 years).' },
            { text: 'Check the age of the younger brother (8 years old) against the range; 8 is less than 10, so he is in late childhood,.' },
            { text: 'Check Priya\'s age (11 years old) against the range; 11 falls between 10 and 19, so she has entered early adolescence.' },
            { text: 'Check the older sister\'s age (17 years old) against the range; 17 falls between 10 and 19, so she is in mid-to-late.' },
            { text: 'Verify that both Priya and her older sister fit the criteria while the younger brother does not.', faded: true, blankAnswer: 'Priya (11 years) and her older sister (17 years) are both.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_003', title: 'The rapid and marked increase in height.',
          scaffold: { problem: 'A 12-year-old student notices that their height increased by 8 cm in one year, but their favorite jacket from last year is tight across the.',
            steps: [
            { text: 'Identify the biological structures involved in height increase (long bones of arms and legs, clavicle, and shoulder.' },
            { text: 'Recall that adolescent growth is characterized by bone elongation and expansion of the skeletal frame.' },
            { text: 'Analyze why the jacket sleeves are too short: the radius, ulna, and humerus bones in the arms have lengthened rapidly.' },
            { text: 'Analyze why the shoulders feel tight: the shoulder girdle and chest bones are widening to accommodate lung and heart.' },
            { text: 'Conclude that the jacket no longer fits because multiple skeletal elements are expanding simultaneously at rapid rates.', faded: true, blankAnswer: 'The tight jacket is direct evidence of rapid skeletal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_004', title: 'Changes indicating reproductive.',
          scaffold: { problem: 'During a health discussion, Rohit (age 13) notices he has grown 10 cm in a year and his shoulders are broader.',
            steps: [
            { text: 'Identify the traits mentioned in Rohit\'s scenario (increase in height, broadening shoulders).' },
            { text: 'Classify these traits as either general physical (somatic) growth or reproductive maturity.' },
            { text: 'Recall that skeletal growth and muscle development are driven by general growth hormones and somatic development.' },
            { text: 'Recognize that reproductive maturity specifically requires the maturation of gonads (testes/ovaries) and the production.' },
            { text: 'Conclude that physical height and shoulder width do not confirm functional reproductive maturity, as internal gamete.', faded: true, blankAnswer: 'Rohit\'s height and shoulder width indicate general somatic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_005', title: 'Secondary sexual characteristics are.',
          scaffold: { problem: 'Rohit, a 13-year-old boy in Delhi, notices that hair has started growing under his armpits and on his face, and his shoulders are looking.',
            steps: [
            { text: 'Identify the observed physical changes in Rohit (armpit hair, facial hair, broad shoulders).' },
            { text: 'Classify these specific changes as secondary sexual characteristics that appear during adolescence.' },
            { text: 'Differentiate these external, supportive body features from primary sex organs (testes), which are responsible for.' },
            { text: 'Evaluate the friend\'s claim by recognizing that while these traits signal the onset of puberty, they do not.' },
            { text: 'Conclude that Rohit is showing classic secondary sexual characteristics of adolescence, but his friend\'s sweeping claim.', faded: true, blankAnswer: 'Rohit\'s traits are secondary sexual characteristics.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_bio_ch01_007', title: 'A balanced diet during adolescence is a.',
          scaffold: { problem: '15-year-old Priya is growing taller very quickly and complains of frequent muscle cramps and joint stiffness during her sports practice.',
            steps: [
            { text: 'Identify the biological symptoms (muscle cramps, joint stiffness during rapid height increase).' },
            { text: 'Relate these symptoms to the skeletal and muscular systems undergoing rapid elongation in adolescence.' },
            { text: 'Identify the missing minerals responsible for bone mineralization and muscle contraction (Calcium and Vitamin D).' },
            { text: 'Map these minerals to specific food sources in an Indian diet (milk, curd, paneer, ragi, green leafy vegetables).' },
            { text: 'Conclude that Priya\'s balanced diet must incorporate dairy and calcium-rich foods to support bone elongation and.', faded: true, blankAnswer: 'Priya needs to include calcium-rich foods like milk, curd,.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_bio_ch01_002', title: 'Identify each idea',
          dissect: { specimen: 'Life Stages of Humans: Infancy to Old Age', spots: [
            { id: 's1', label: 'The life stages of humans', prompt: 'Which idea is this? — The life stages of humans refer to the continuous, progressive biological phases of.', answer: 'The life stages of humans', options: ['The life stages of humans', 'Adolescence is the transitional period', 'The rapid and marked increase', 'Changes indicating reproductive maturity refer'] },
            { id: 's2', label: 'Adolescence is the transitional period', prompt: 'Which idea is this? — Adolescence is the transitional period of physical, psychological, and social development.', answer: 'Adolescence is the transitional period', options: ['Adolescence is the transitional period', 'The life stages of humans', 'The rapid and marked increase', 'Changes indicating reproductive maturity refer'] },
            { id: 's3', label: 'The rapid and marked increase', prompt: 'Which idea is this? — The rapid and marked increase in height and weight during adolescence, driven by the.', answer: 'The rapid and marked increase', options: ['The rapid and marked increase', 'The life stages of humans', 'Adolescence is the transitional period', 'Changes indicating reproductive maturity refer'] },
            { id: 's4', label: 'Changes indicating reproductive maturity refer', prompt: 'Which idea is this? — Changes indicating reproductive maturity refer to the biological developments in.', answer: 'Changes indicating reproductive maturity refer', options: ['Changes indicating reproductive maturity refer', 'The life stages of humans', 'Adolescence is the transitional period', 'The rapid and marked increase'] },
            { id: 's5', label: 'Secondary sexual characteristics are the', prompt: 'Which idea is this? — Secondary sexual characteristics are the distinct physical features that develop during.', answer: 'Secondary sexual characteristics are the', options: ['Secondary sexual characteristics are the', 'The life stages of humans', 'Adolescence is the transitional period', 'The rapid and marked increase'] },
            { id: 's6', label: 'A balanced diet during adolescence', prompt: 'Which idea is this? — A balanced diet during adolescence is a daily food intake containing appropriate.', answer: 'A balanced diet during adolescence', options: ['A balanced diet during adolescence', 'The life stages of humans', 'Adolescence is the transitional period', 'The rapid and marked increase'] }
          ] } }
    ],
    explore: { component: C7_ScienceAdolescenceAStageOfGrowthSim, prompt: 'Explore the interactive — Life Stages of Humans: Infancy to Old Age' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch01_001', difficulty: 'standard',
          question: 'The life stages of humans refer to the continuous, progressive biological.',
          hint: 'Review Class 6 concepts on teenage growth and body changes before attempting the full.',
          misconception: 'Students often think that human growth and development occur at a steady, unchanging rate throughout every single year.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The life stages of humans refer to the continuous, progressive biological phases of',
                  options: ['The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the', 'Changes indicating reproductive maturity refer to the biological developments in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that human growth and development occur at a steady, unchanging rate throughout every single year of life from birth.' }
          ],
            remediations: { 'human-growth-and-development-occur': { steps: ['To correct this misconception, ask the student to look at their own clothing sizes over the years or compare.', 'Explain that human life is divided into distinct biological phases (stages) governed by shifting hormone levels and.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_002', difficulty: 'standard',
          question: 'Adolescence is the transitional period of physical, psychological, and social.',
          hint: 'Review human life stages in c7_bio_ch01_001 to understand how childhood precedes.',
          misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over.',
          parts: [
                { id: 'a', prompt: 'What is the standard age range defined for the period of adolescence in humans?', answer: 'The standard age range for adolescence is 10 to 19 years',
                  options: ['The standard age range for adolescence is 10 to 19 years', 'adolescence', 'puberty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over the exact same short.' },
                { id: 'b', prompt: 'Why is adolescence considered a "transitional stage" rather than a permanent life stage like adulthood?', answer: 'Adolescence is a transitional stage',
                  options: ['Adolescence is a transitional stage', 'adolescence', 'puberty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over the exact same short.' }
          ],
            remediations: { 'students-often-confuse-the-term': { steps: ['To fix this misconception, guide the student to compare a 10-year-old child with a 19-year-old young adult.', 'Point out that while puberty refers to the specific physical years where reproductive maturity happens, adolescence is.', 'Use a timeline drawing to show puberty as a chapter inside the larger book of adolescence.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over.',
          parts: [
                { id: 'a', prompt: 'A health pamphlet states that "all children enter adolescence at exactly age 10 and finish all physical changes by age 15." Evaluate this statement.', answer: 'This statement is partially incorrect',
                  options: ['This statement is partially incorrect', 'adolescence', 'puberty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over the exact same short.' }
          ],
            remediations: { 'students-often-confuse-the-term': { steps: ['To fix this misconception, guide the student to compare a 10-year-old child with a 19-year-old young adult.', 'Point out that while puberty refers to the specific physical years where reproductive maturity happens, adolescence is.', 'Use a timeline drawing to show puberty as a chapter inside the larger book of adolescence.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_003', difficulty: 'standard',
          question: 'The rapid and marked increase in height and weight during adolescence, driven.',
          hint: 'Review c7_bio_ch01_002 to refresh understanding of when adolescence begins and ends.',
          misconception: 'Students often believe that an adolescent\'s body grows uniformly and at a constant steady rate every single month,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rapid and marked increase in height and weight during adolescence, driven by the',
                  options: ['The rapid and marked increase in height and weight during adolescence, driven by the', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'Changes indicating reproductive maturity refer to the biological developments in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that an adolescent\'s body grows uniformly and at a constant steady rate every single month, similar to how a machine.' }
          ],
            remediations: { 'an-adolescent-s-body-grows': { steps: ['To correct this, have the student look at growth records or shoe size changes over the past three years.', 'Point out that a teenager might grow four centimeters in three months and then experience a long pause.', 'Show them that hands and feet grow before the torso, explaining why temporary clumsiness is a normal part of biological.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_004', difficulty: 'standard',
          question: 'Changes indicating reproductive maturity refer to the biological developments.',
          hint: 'Review c7_bio_ch01_003 to reinforce how the skeletal and muscular systems grow during.',
          misconception: 'Students often believe that the outward physical changes of adolescence—such as growing taller, gaining weight, or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Changes indicating reproductive maturity refer to the biological developments in',
                  options: ['Changes indicating reproductive maturity refer to the biological developments in', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the outward physical changes of adolescence—such as growing taller, gaining weight, or developing acne—are the.' }
          ],
            remediations: { 'the-outward-physical-changes-of': { steps: ['To correct this, guide the student to compare plant growth with plant flowering: a mango tree grows taller and adds.', 'Apply this to humans by listing traits in two columns: Column A (Height, weight, muscle strength) and Column B.', 'Emphasize that Column A represents general body growth, while Column B represents the specific readiness for.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_005', difficulty: 'standard',
          question: 'Secondary sexual characteristics are the distinct physical features that.',
          hint: 'Review general growth patterns and body proportions from node c7_bio_ch01_003 before.',
          misconception: 'Students often confuse primary sex organs with secondary sexual characteristics, assuming that any body part or.',
          parts: [
                { id: 'a', prompt: 'Why do secondary sexual characteristics appear during adolescence rather than early childhood?', answer: 'They appear in adolescence',
                  options: ['They appear in adolescence', 'the body is fully mature from birth and just enlarges uniformly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse primary sex organs with secondary sexual characteristics, assuming that any body part or physical change appearing.' }
          ],
            remediations: { 'students-often-confuse-primary-sex': { steps: ['To fix this, guide the student to categorize body features into two piles: "Organs that make reproductive cells".', 'Emphasize that a voice box or a beard does not produce gametes, thus classifying them strictly as secondary sexual.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_007', difficulty: 'standard',
          question: 'A balanced diet during adolescence is a daily food intake containing.',
          hint: 'Review Class 6 nutrition concepts regarding food components, digestion, and the basic.',
          misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat.',
          parts: [
                { id: 'a', prompt: 'Why do adolescents need a larger quantity of proteins in their balanced diet compared to younger children?', answer: 'Adolescents need more protein',
                  options: ['Adolescents need more protein', 'eating a lot of food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat large portions of their.' }
          ],
            remediations: { 'eating-a-lot-of-food': { steps: ['To fix this, guide the student to examine food labels or look at a food pyramid chart.', 'Have them list what is inside an instant noodle packet (mostly refined carbohydrates and fats) versus a balanced thali.', 'Ask them: "If your body is building new bones and muscles today, can cement and bricks build a house if you only supply.'] } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat.',
          parts: [
                { id: 'a', prompt: 'A health pamphlet claims that teenagers should completely eliminate all fats from their diet to prevent weight gain during puberty.', answer: 'The claim is false',
                  options: ['The claim is false', 'eating a lot of food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat large portions of their.' }
          ],
            remediations: { 'eating-a-lot-of-food': { steps: ['To fix this, guide the student to examine food labels or look at a food pyramid chart.', 'Have them list what is inside an instant noodle packet (mostly refined carbohydrates and fats) versus a balanced thali.', 'Ask them: "If your body is building new bones and muscles today, can cement and bricks build a house if you only supply.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
