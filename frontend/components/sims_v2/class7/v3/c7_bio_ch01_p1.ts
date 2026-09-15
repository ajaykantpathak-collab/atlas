import type { SimDef } from '../../engine/types';

/** v3 generated — c7_bio_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_bio_ch01_p1: SimDef = {
    id: 'v3_c7_bio_ch01_p1',
    title: 'Adolescence: A Stage of Growth and Change · Part 1/2',
    subtitle: 'Covers the broad overview of all human life stages from infancy to old age, focusing.',
    classLevel: 7, subject: 'biology', topic: 'Adolescence: A Stage of Growth and Change · Part 1/2',
    chapters: ['c7_bio_ch01'],
    nodeIds: ['c7_bio_ch01_001', 'c7_bio_ch01_002', 'c7_bio_ch01_003', 'c7_bio_ch01_004', 'c7_bio_ch01_005', 'c7_bio_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Look at a family photo album: you see a tiny newborn baby, a toddler taking first steps, a school-going.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In one family album: a baby, a schoolchild, a teenager who shot up centimetres in a year, a parent, and a grandparent whose body is slowly slowing down. What invisible programme flips each person from one chapter to the next?',
        options: ['Chemical messengers called hormones, working with the genetic blueprint, drive the body through predictable stages', 'Birthdays alone — age numbers force the body to change', 'Food quantity — eating more makes you enter the next stage', 'Random chance — nobody really knows why bodies change'],
        answer: 'Chemical messengers called hormones, working with the genetic blueprint, drive the body through predictable stages',
        hook: 'Adolescence is a bridge, not an island — it carries the body from childhood to adulthood through one of the fastest growth phases after infancy. And a missing signal matters: too little growth hormone from the pituitary can stunt the journey.',
    },
    teaching: [
        { title: 'Life Stages of Humans: Infancy to Old Age', text: 'The life stages of humans refer to the continuous, progressive biological phases of growth, development, maturation, and aging that an individual passes through from birth to death—specifically.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_bio_ch01_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Line up the five human life stages in order, then trace how hormones carry a body across the bridge of adolescence into adulthood.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c7_bio_ch01_002', title: 'Adolescence: Definition and Age Range (10-19 years)',
          caseStudy: { intro: 'When you look at your older cousins or students in higher classes, you might notice they are suddenly growing taller, their voices are changing, or they have.',
            decisions: [{ prompt: 'What is the standard age range defined for the period of adolescence in humans?', options: [
                { text: 'The standard age range for adolescence is 10 to 19 years', outcome: 'The standard age range for adolescence is 10 to 19 years. A student who answers with a narrower.' },
                { text: 'adolescence', outcome: 'Not quite — Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same.', reveals: 'students-often-confuse-the-term' },
                { text: 'puberty', outcome: 'Not quite — Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same.', reveals: 'students-often-confuse-the-term' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch01_004', title: 'Changes Indicating Reproductive Maturity',
          caseStudy: { intro: 'When teenagers look in the mirror, they notice changes beyond just growing taller or gaining weight, such as deeper voices or changes in body shape.',
            decisions: [{ prompt: 'What biological substance acts as the chemical messenger that triggers the changes indicating reproductive maturity in adolescents?', options: [
                { text: 'Hormones are the chemical messengers secreted by endocrine glands that travel through the', outcome: 'Hormones are the chemical messengers secreted by endocrine glands that travel through the blood.' },
                { text: 'vitamins', outcome: 'Not quite — Students often believe that the outward physical changes of adolescence—such as growing taller.', reveals: 'the-outward-physical-changes-of' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch01_005', title: 'Secondary Sexual Characteristics in Boys and Girls',
          caseStudy: { intro: 'When looking at older cousins or teenagers around us, we notice sudden changes in their appearance, such as boys developing facial hair or a deeper voice, and.',
            decisions: [{ prompt: 'What are secondary sexual characteristics?', options: [
                { text: 'Secondary sexual characteristics are physical traits that develop during adolescence,', outcome: 'Secondary sexual characteristics are physical traits that develop during adolescence, helping.' },
                { text: 'they are present at birth is confusing them with primary sex organs', outcome: 'Not quite — Students often confuse primary sex organs with secondary sexual characteristics, assuming that any.', reveals: 'students-often-confuse-primary-sex' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch01_006', title: 'Emotional and Behavioural Changes in Adolescence',
          caseStudy: { intro: 'Observe how a teenager in your family might feel thrilled one minute about a new hobby and overwhelmed the next by a minor comment from a teacher.',
            decisions: [{ prompt: 'What is the primary biological driver behind the emotional and behavioural changes observed during adolescence?', options: [
                { text: 'Hormonal fluctuations acting on the developing brain, particularly the limbic system,', outcome: 'Hormonal fluctuations acting on the developing brain, particularly the limbic system, cause.' },
                { text: 'bad behavior', outcome: 'Not quite — Students often believe that adolescent mood swings are a sign of a mental illness or intentional.', reveals: 'adolescent-mood-swings-are-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c7_bio_ch01_002', title: 'Identify each idea',
          dissect: { specimen: 'Adolescence: A Stage of Growth and Change · Part 1/2', spots: [
            { id: 's1', label: 'Life Stages of Humans Infancy to Old Age', prompt: 'Which idea is this? — The life stages of humans refer to the continuous, progressive biological phases.', answer: 'Life Stages of Humans Infancy to Old Age', options: ['Life Stages of Humans Infancy to Old Age', 'Adolescence Definition and Age Range 10-19 years', 'Physical Changes in Adolescence Height and Weight', 'Changes Indicating Reproductive Maturity'] },
            { id: 's2', label: 'Adolescence Definition and Age Range 10-19 years', prompt: 'Which idea is this? — Adolescence is the transitional period of physical, psychological, and social development.', answer: 'Adolescence Definition and Age Range 10-19 years', options: ['Adolescence Definition and Age Range 10-19 years', 'Life Stages of Humans Infancy to Old Age', 'Physical Changes in Adolescence Height and Weight', 'Changes Indicating Reproductive Maturity'] },
            { id: 's3', label: 'Physical Changes in Adolescence Height and Weight', prompt: 'Which idea is this? — The rapid and marked increase in height and weight during adolescence, driven by the.', answer: 'Physical Changes in Adolescence Height and Weight', options: ['Physical Changes in Adolescence Height and Weight', 'Life Stages of Humans Infancy to Old Age', 'Adolescence Definition and Age Range 10-19 years', 'Changes Indicating Reproductive Maturity'] },
            { id: 's4', label: 'Changes Indicating Reproductive Maturity', prompt: 'Which idea is this? — Changes indicating reproductive maturity refer to the biological developments.', answer: 'Changes Indicating Reproductive Maturity', options: ['Changes Indicating Reproductive Maturity', 'Life Stages of Humans Infancy to Old Age', 'Adolescence Definition and Age Range 10-19 years', 'Physical Changes in Adolescence Height and Weight'] },
            { id: 's5', label: 'Secondary Sexual Characteristics in Boys and Girls', prompt: 'Which idea is this? — Secondary sexual characteristics are the distinct physical features that develop during.', answer: 'Secondary Sexual Characteristics in Boys and Girls', options: ['Secondary Sexual Characteristics in Boys and Girls', 'Life Stages of Humans Infancy to Old Age', 'Adolescence Definition and Age Range 10-19 years', 'Physical Changes in Adolescence Height and Weight'] },
            { id: 's6', label: 'Emotional and Behavioural Changes in Adolescence', prompt: 'Which idea is this? — The psychological and physiological shift during puberty characterized by mood swings.', answer: 'Emotional and Behavioural Changes in Adolescence', options: ['Emotional and Behavioural Changes in Adolescence', 'Life Stages of Humans Infancy to Old Age', 'Adolescence Definition and Age Range 10-19 years', 'Physical Changes in Adolescence Height and Weight'] }
          ] } },
        { type: 'case', nodeId: 'c7_bio_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At home, a teenager recovers from a sprained ankle in days while her grandfather\'s similar strain lingers for weeks. Meanwhile a growth chart shows she shot up fastest in her first year of life and again just now at thirteen — with slow years in between.',
            decisions: [{ prompt: 'Why doesn\'t the body grow and repair at one steady rate?', options: [
                { text: 'Because life runs in stages, not on one fixed dial — growth surges in infancy and again at adolescence, while repair slows with age, so the teenager heals faster than the grandfather. Metabolic rate, nutrition needs and physical capability all shift across stages — infancy, childhood, adolescence, adulthood, old age each run the body differently.', outcome: 'The two growth peaks and the slow grandparent recovery are the same principle: each life stage has its own biological settings for building and mending tissue.' },
                { text: 'The differences are just luck — the body grows and repairs at one steady pace, and the peaks on the chart are measurement errors.', outcome: 'The double peak is real biology — infancy and adolescence are programmed growth windows, and declining repair rate in old age is a life-stage effect, not noise.', reveals: 'growth-is-steady' },
                { text: 'The grandfather\'s slow healing means he is seriously ill — recovery speed should not vary with age at all.', outcome: 'Slower tissue repair is normal ageing, not necessarily disease — life stages change recovery rates as surely as they change growth rates.', reveals: 'slow-healing-means-illness' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every body walks the same road — infancy to old age — but hormones decide the speed of each step. Growing up is chemistry on a schedule.',
            decisions: [{ prompt: 'What comes next? Adolescence: A Stage of Growth and Change · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Adolescence: A Stage of Growth and Change · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch01_001', difficulty: 'standard',
          question: 'The life stages of humans refer to the continuous, progressive biological.',
          hint: 'Review Class 6 concepts on teenage growth and body changes before attempting the full.',
          misconception: 'Students often think that human growth and development occur at a steady, unchanging rate throughout every single year.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The life stages of humans refer to the continuous, progressive biological phases of',
                  options: ['The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the', 'Changes indicating reproductive maturity refer to the biological developments in'],
                  hint: 'Review Class 6 concepts on teenage growth and body changes before attempting the full multi-stage.',
                  misconception: 'Students often think that human growth and development occur at a steady, unchanging rate throughout every single year of life from birth.' }
          ],
            remediations: { 'human-growth-and-development-occur': { steps: ['To correct this misconception, ask the student to look at their own clothing sizes over the years or compare.', 'Explain that human life is divided into distinct biological phases (stages) governed by shifting hormone levels and.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_002', difficulty: 'standard',
          question: 'Adolescence is the transitional period of physical, psychological, and social.',
          hint: 'Review human life stages in c7_bio_ch01_001 to understand how childhood precedes.',
          misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over.',
          parts: [
                { id: 'a', prompt: 'What is the standard age range defined for the period of adolescence in humans?', answer: 'The standard age range for adolescence is 10 to 19 years',
                  options: ['The standard age range for adolescence is 10 to 19 years', 'adolescence', 'puberty'],
                  hint: 'Review human life stages in c7_bio_ch01_001 to understand how childhood precedes adolescence.',
                  misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over the exact same short.' },
                { id: 'b', prompt: 'Why is adolescence considered a "transitional stage" rather than a permanent life stage like adulthood?', answer: 'Adolescence is a transitional stage',
                  options: ['Adolescence is a transitional stage', 'adolescence', 'puberty'],
                  hint: 'Review human life stages in c7_bio_ch01_001 to understand how childhood precedes adolescence.',
                  misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over the exact same short.' }
          ],
            remediations: { 'students-often-confuse-the-term': { steps: ['To fix this misconception, guide the student to compare a 10-year-old child with a 19-year-old young adult.', 'Point out that while puberty refers to the specific physical years where reproductive maturity happens, adolescence.', 'Use a timeline drawing to show puberty as a chapter inside the larger book of adolescence.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over.',
          parts: [
                { id: 'a', prompt: 'A health pamphlet states that "all children enter adolescence at exactly age 10 and finish all physical changes by age 15." Evaluate this statement.', answer: 'This statement is partially incorrect',
                  options: ['This statement is partially incorrect', 'adolescence', 'puberty'],
                  hint: 'Review human life stages in c7_bio_ch01_001 to understand how childhood precedes adolescence.',
                  misconception: 'Students often confuse the term "adolescence" with "puberty," thinking they mean the exact same thing and occur over the exact same short.' }
          ],
            remediations: { 'students-often-confuse-the-term': { steps: ['To fix this misconception, guide the student to compare a 10-year-old child with a 19-year-old young adult.', 'Point out that while puberty refers to the specific physical years where reproductive maturity happens, adolescence.', 'Use a timeline drawing to show puberty as a chapter inside the larger book of adolescence.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_003', difficulty: 'standard',
          question: 'The rapid and marked increase in height and weight during adolescence, driven.',
          hint: 'Review c7_bio_ch01_002 to refresh understanding of when adolescence begins and ends.',
          misconception: 'Students often believe that an adolescent\'s body grows uniformly and at a constant steady rate every single month.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rapid and marked increase in height and weight during adolescence, driven by the',
                  options: ['The rapid and marked increase in height and weight during adolescence, driven by the', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'Changes indicating reproductive maturity refer to the biological developments in'],
                  hint: 'Review c7_bio_ch01_002 to refresh understanding of when adolescence begins and ends.',
                  misconception: 'Students often believe that an adolescent\'s body grows uniformly and at a constant steady rate every single month, similar to how a machine.' }
          ],
            remediations: { 'an-adolescent-s-body-grows': { steps: ['To correct this, have the student look at growth records or shoe size changes over the past three years.', 'Point out that a teenager might grow four centimeters in three months and then experience a long pause.', 'Show them that hands and feet grow before the torso, explaining why temporary clumsiness is a normal part of biological.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_004', difficulty: 'standard',
          question: 'Changes indicating reproductive maturity refer to the biological developments.',
          hint: 'Review c7_bio_ch01_003 to reinforce how the skeletal and muscular systems grow during.',
          misconception: 'Students often believe that the outward physical changes of adolescence—such as growing taller, gaining weight,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Changes indicating reproductive maturity refer to the biological developments in',
                  options: ['Changes indicating reproductive maturity refer to the biological developments in', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Review c7_bio_ch01_003 to reinforce how the skeletal and muscular systems grow during early.',
                  misconception: 'Students often believe that the outward physical changes of adolescence—such as growing taller, gaining weight, or developing acne—are the.' }
          ],
            remediations: { 'the-outward-physical-changes-of': { steps: ['To correct this, guide the student to compare plant growth with plant flowering: a mango tree grows taller and adds.', 'Apply this to humans by listing traits in two columns: Column A (Height, weight, muscle strength) and Column.', 'Emphasize that Column A represents general body growth, while Column B represents the specific readiness for.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_005', difficulty: 'standard',
          question: 'Secondary sexual characteristics are the distinct physical features that.',
          hint: 'Review general growth patterns and body proportions from node c7_bio_ch01_003 before.',
          misconception: 'Students often confuse primary sex organs with secondary sexual characteristics, assuming that any body part.',
          parts: [
                { id: 'a', prompt: 'Why do secondary sexual characteristics appear during adolescence rather than early childhood?', answer: 'They appear in adolescence',
                  options: ['They appear in adolescence', 'the body is fully mature from birth and just enlarges uniformly'],
                  hint: 'Review general growth patterns and body proportions from node c7_bio_ch01_003 before attempting.',
                  misconception: 'Students often confuse primary sex organs with secondary sexual characteristics, assuming that any body part or physical change appearing.' }
          ],
            remediations: { 'students-often-confuse-primary-sex': { steps: ['To fix this, guide the student to categorize body features into two piles: "Organs that make reproductive cells".', 'Emphasize that a voice box or a beard does not produce gametes, thus classifying them strictly as secondary sexual.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_006', difficulty: 'standard',
          question: 'The psychological and physiological shift during puberty characterized by mood.',
          hint: 'Review c7_bio_ch01_002 and c7_bio_ch01_003 to reconnect physical changes with internal.',
          misconception: 'Students often believe that adolescent mood swings are a sign of a mental illness or intentional disobedience, rather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The psychological and physiological shift during puberty characterized by mood swings,',
                  options: ['The psychological and physiological shift during puberty characterized by mood swings,', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Review c7_bio_ch01_002 and c7_bio_ch01_003 to reconnect physical changes with internal.',
                  misconception: 'Students often believe that adolescent mood swings are a sign of a mental illness or intentional disobedience, rather than recognizing them.' }
          ],
            remediations: { 'adolescent-mood-swings-are-a': { steps: ['Review the connection between endocrine glands (hormones) and brain development.', 'Explain to the student that just as bones grow longer and muscles strengthen, brain networks responsible for processing.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
