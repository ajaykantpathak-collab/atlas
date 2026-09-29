import type { SimDef } from '../../engine/types';

/** v3 generated — c7_bio_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_bio_ch01_p2: SimDef = {
    id: 'v3_c7_bio_ch01_p2',
    title: 'Adolescence: A Stage of Growth and Change · Part 2/2',
    subtitle: 'Covers human nutritional requirements, macronutrients, micronutrients, and balanced meal.',
    classLevel: 7, subject: 'biology', topic: 'Adolescence: A Stage of Growth and Change · Part 2/2',
    chapters: ['c7_bio_ch01'],
    nodeIds: ['c7_bio_ch01_007', 'c7_bio_ch01_008', 'c7_bio_ch01_009', 'c7_bio_ch01_010', 'c7_bio_ch01_011', 'c7_bio_ch01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Think about how rapidly you grow out of your school uniform or shoes during certain years, which requires.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In one family album: a baby, a schoolchild, a teenager who shot up centimetres in a year, a parent, and a grandparent whose body is slowly slowing down. What invisible programme flips each person from one chapter to the next?',
        options: ['Chemical messengers called hormones, working with the genetic blueprint, drive the body through predictable stages', 'Birthdays alone — age numbers force the body to change', 'Food quantity — eating more makes you enter the next stage', 'Random chance — nobody really knows why bodies change'],
        answer: 'Chemical messengers called hormones, working with the genetic blueprint, drive the body through predictable stages',
        hook: 'Adolescence is a bridge, not an island — it carries the body from childhood to adulthood through one of the fastest growth phases after infancy. And a missing signal matters: too little growth hormone from the pituitary can stunt the journey.',
    },
    teaching: [
        { title: 'Nutritional Needs During Adolescence: Balanced Diet', text: 'A balanced diet during adolescence is a daily food intake containing appropriate proportions of carbohydrates, proteins, fats, vitamins, minerals, and water to support the rapid skeletal growth.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_bio_ch01_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Line up the five human life stages in order, then trace how hormones carry a body across the bridge of adolescence into adulthood.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c7_bio_ch01_007', title: 'Nutritional Needs During Adolescence: Balanced Diet',
          caseStudy: { intro: 'Think about how rapidly you grow out of your school uniform or shoes during certain years, which requires your body to build new bones, muscles, and tissues.',
            decisions: [{ prompt: 'Why do adolescents need a larger quantity of proteins in their balanced diet compared to younger children?', options: [
                { text: 'Adolescents need more protein', outcome: 'Adolescents need more protein because they undergo a rapid growth spurt involving the formation.' },
                { text: 'eating a lot of food', outcome: 'Not quite — Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking.', reveals: 'eating-a-lot-of-food' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch01_011', title: 'Hormones and Their Role in Adolescent Changes',
          caseStudy: { intro: 'When a Class 7 student notices a sudden spurt in height, deepening of the voice, or the appearance of acne, they are observing visible physical changes.',
            decisions: [{ prompt: 'What is the general term for chemical substances secreted by endocrine glands that act as messengers in the human body?', options: [
                { text: 'hormones', outcome: 'The correct answer is hormones. A student who answers "enzymes" or "nutrients" is confusing.' },
                { text: 'enzymes', outcome: 'Not quite — Students often believe that hormones are produced by organs directly where the change happens.', reveals: 'hormones-are-produced-by-organs' },
                { text: 'nutrients', outcome: 'Not quite — Students often believe that hormones are produced by organs directly where the change happens.', reveals: 'hormones-are-produced-by-organs' }
            ] }] } },
        { type: 'dissect', nodeId: 'c7_bio_ch01_008', title: 'Identify each idea',
          dissect: { specimen: 'Adolescence: A Stage of Growth and Change · Part 2/2', spots: [
            { id: 's1', label: 'Nutritional Needs During Adolescence Balanced Diet', prompt: 'Which idea is this? — A balanced diet during adolescence is a daily food intake containing appropriate.', answer: 'Nutritional Needs During Adolescence Balanced Diet', options: ['Nutritional Needs During Adolescence Balanced Diet', 'Personal Hygiene During Adolescence', 'Physical Activities and Exercise for Adolescents', 'Balanced Social Life and Mental Well-being'] },
            { id: 's2', label: 'Personal Hygiene During Adolescence', prompt: 'Which idea is this? — Personal hygiene during adolescence involves daily cleanliness practices required.', answer: 'Personal Hygiene During Adolescence', options: ['Personal Hygiene During Adolescence', 'Nutritional Needs During Adolescence Balanced Diet', 'Physical Activities and Exercise for Adolescents', 'Balanced Social Life and Mental Well-being'] },
            { id: 's3', label: 'Physical Activities and Exercise for Adolescents', prompt: 'Which idea is this? — Physical activities and regular exercise during adolescence refer to planned, structured.', answer: 'Physical Activities and Exercise for Adolescents', options: ['Physical Activities and Exercise for Adolescents', 'Nutritional Needs During Adolescence Balanced Diet', 'Personal Hygiene During Adolescence', 'Balanced Social Life and Mental Well-being'] },
            { id: 's4', label: 'Balanced Social Life and Mental Well-being', prompt: 'Which idea is this? — A balanced social life and mental well-being refer to a state of emotional stability.', answer: 'Balanced Social Life and Mental Well-being', options: ['Balanced Social Life and Mental Well-being', 'Nutritional Needs During Adolescence Balanced Diet', 'Personal Hygiene During Adolescence', 'Physical Activities and Exercise for Adolescents'] },
            { id: 's5', label: 'Hormones and Their Role in Adolescent Changes', prompt: 'Which idea is this? — Hormones are chemical messengers secreted directly into the bloodstream by endocrine.', answer: 'Hormones and Their Role in Adolescent Changes', options: ['Hormones and Their Role in Adolescent Changes', 'Nutritional Needs During Adolescence Balanced Diet', 'Personal Hygiene During Adolescence', 'Physical Activities and Exercise for Adolescents'] },
            { id: 's6', label: 'Reproductive Health and Responsibility', prompt: 'Which idea is this? — Reproductive health during adolescence refers to the complete physical, mental, and.', answer: 'Reproductive Health and Responsibility', options: ['Reproductive Health and Responsibility', 'Nutritional Needs During Adolescence Balanced Diet', 'Personal Hygiene During Adolescence', 'Physical Activities and Exercise for Adolescents'] }
          ] } },
        { type: 'case', nodeId: 'c7_bio_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At home, a teenager recovers from a sprained ankle in days while her grandfather\'s similar strain lingers for weeks. Meanwhile a growth chart shows she shot up fastest in her first year of life and again just now at thirteen — with slow years in between.',
            decisions: [{ prompt: 'Why doesn\'t the body grow and repair at one steady rate?', options: [
                { text: 'Because life runs in stages, not on one fixed dial — growth surges in infancy and again at adolescence, while repair slows with age, so the teenager heals faster than the grandfather. Metabolic rate, nutrition needs and physical capability all shift across stages — infancy, childhood, adolescence, adulthood, old age each run the body differently.', outcome: 'The two growth peaks and the slow grandparent recovery are the same principle: each life stage has its own biological settings for building and mending tissue.' },
                { text: 'The differences are just luck — the body grows and repairs at one steady pace, and the peaks on the chart are measurement errors.', outcome: 'The double peak is real biology — infancy and adolescence are programmed growth windows, and declining repair rate in old age is a life-stage effect, not noise.', reveals: 'growth-is-steady' },
                { text: 'The grandfather\'s slow healing means he is seriously ill — recovery speed should not vary with age at all.', outcome: 'Slower tissue repair is normal ageing, not necessarily disease — life stages change recovery rates as surely as they change growth rates.', reveals: 'slow-healing-means-illness' }
            ] }] } },
        { type: 'case', nodeId: 'c7_bio_ch01_012', title: 'You made it',
          caseStudy: { intro: 'Every body walks the same road — infancy to old age — but hormones decide the speed of each step. Growing up is chemistry on a schedule.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_bio_ch01_007', difficulty: 'standard',
          question: 'A balanced diet during adolescence is a daily food intake containing.',
          hint: 'Review Class 6 nutrition concepts regarding food components, digestion, and the basic.',
          misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat.',
          parts: [
                { id: 'a', prompt: 'Why do adolescents need a larger quantity of proteins in their balanced diet compared to younger children?', answer: 'Adolescents need more protein',
                  options: ['Adolescents need more protein', 'eating a lot of food'],
                  hint: 'Review Class 6 nutrition concepts regarding food components, digestion, and the basic food pyramid.',
                  misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat large portions of their.' },
                { id: 'b', prompt: 'Rohan is a 13-year-old boy experiencing a sudden growth spurt in height.', answer: 'Identify Rohan\'s symptoms as fatigue and paleness',
                  options: ['Identify Rohan\'s symptoms as fatigue and paleness', 'eating a lot of food'],
                  hint: 'Review Class 6 nutrition concepts regarding food components, digestion, and the basic food pyramid.',
                  misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat large portions of their.' }
          ],
            remediations: { 'eating-a-lot-of-food': { steps: ['To fix this, guide the student to examine food labels or look at a food pyramid chart.', 'Have them list what is inside an instant noodle packet (mostly refined carbohydrates and fats) versus a balanced thali.', 'Ask them: "If your body is building new bones and muscles today, can cement and bricks build a house if you only supply.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat.',
          parts: [
                { id: 'a', prompt: 'A health pamphlet claims that teenagers should completely eliminate all fats from their diet to prevent weight gain during puberty.', answer: 'The claim is false',
                  options: ['The claim is false', 'eating a lot of food'],
                  hint: 'Review Class 6 nutrition concepts regarding food components, digestion, and the basic food pyramid.',
                  misconception: 'Students often believe that "eating a lot of food" automatically equals a balanced diet, thinking that if they eat large portions of their.' }
          ],
            remediations: { 'eating-a-lot-of-food': { steps: ['To fix this, guide the student to examine food labels or look at a food pyramid chart.', 'Have them list what is inside an instant noodle packet (mostly refined carbohydrates and fats) versus a balanced thali.', 'Ask them: "If your body is building new bones and muscles today, can cement and bricks build a house if you only supply.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_008', difficulty: 'standard',
          question: 'Personal hygiene during adolescence involves daily cleanliness practices.',
          hint: 'Review node c7_bio_ch01_004 to understand how hormonal changes trigger sweat and oil.',
          misconception: 'Students often believe that pimples and body odor are caused by eating oily food or chocolate, completely overlooking.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Personal hygiene during adolescence involves daily cleanliness practices required to',
                  options: ['Personal hygiene during adolescence involves daily cleanliness practices required to', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Review node c7_bio_ch01_004 to understand how hormonal changes trigger sweat and oil gland activity.',
                  misconception: 'Students often believe that pimples and body odor are caused by eating oily food or chocolate, completely overlooking the biological role.' }
          ],
            remediations: { 'pimples-and-body-odor-are': { steps: ['To fix this, guide the student to review how hormones activate sweat and oil glands directly beneath the skin.', 'Explain that while diet affects general health, skin oiliness (sebum) is produced internally by sebaceous glands under.', 'Emphasize that cleanliness removes the bacteria and excess secretions, which diet alone does not control.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_009', difficulty: 'standard',
          question: 'Physical activities and regular exercise during adolescence refer to planned.',
          hint: 'Review cellular respiration and circulation from Class 6 (c6_biology_ch09_008).',
          misconception: 'Students often believe that physical exercise is only necessary for people who want to lose weight or build bodybuilder.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical activities and regular exercise during adolescence refer to planned, structured',
                  options: ['Physical activities and regular exercise during adolescence refer to planned, structured', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Review cellular respiration and circulation from Class 6 (c6_biology_ch09_008) to understand how.',
                  misconception: 'Students often believe that physical exercise is only necessary for people who want to lose weight or build bodybuilder muscles, failing.' }
          ],
            remediations: { 'physical-exercise-is-only-necessary': { steps: ['To remediate this, guide the student to compare two internal systems: ask what happens to a rubber band left stretched.', 'Have them track their own resting heart rate before and after two weeks of simple daily brisk walking to observe direct.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_010', difficulty: 'standard',
          question: 'A balanced social life and mental well-being refer to a state of emotional.',
          hint: 'Review c7_bio_ch01_006 to understand why mood swings occur, and c7_bio_ch01_009 to see.',
          misconception: 'Students often believe that mental well-being means feeling happy all the time, and that experiencing sadness, anger.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A balanced social life and mental well-being refer to a state of emotional stability,',
                  options: ['A balanced social life and mental well-being refer to a state of emotional stability,', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Review c7_bio_ch01_006 to understand why mood swings occur, and c7_bio_ch01_009 to see how physical.',
                  misconception: 'Students often believe that mental well-being means feeling happy all the time, and that experiencing sadness, anger, or anxiety during.' }
          ],
            remediations: { 'mental-well-being-means-feeling': { steps: ['To correct this, explain to the student that emotions are like weather patterns—they constantly change, and rain.', 'Have the student list three recent strong emotions they felt, identify what triggered them (a test, a disagreement with.', 'Emphasize that feeling stressed is normal; the key is how we respond to and balance those feelings.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_011', difficulty: 'standard',
          question: 'Hormones are chemical messengers secreted directly into the bloodstream.',
          hint: 'Review node c7_bio_ch01_005 to list the exact physical differences before trying to learn.',
          misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair.',
          parts: [
                { id: 'a', prompt: 'What is the general term for chemical substances secreted by endocrine glands that act as messengers in the human body?', answer: 'hormones',
                  options: ['hormones', 'enzymes', 'nutrients', 'hormones are produced by organs directly where the change happens (e'],
                  hint: 'Review node c7_bio_ch01_005 to list the exact physical differences before trying to learn which.',
                  misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair follicles produce the.' },
                { id: 'b', prompt: 'How do hormones know which specific organ in the body to affect, given that they travel everywhere through the bloodstream?', answer: 'that hormones affect only specific target organs',
                  options: ['that hormones affect only specific target organs', 'hormones are produced by organs directly where the change happens (e'],
                  hint: 'Review node c7_bio_ch01_005 to list the exact physical differences before trying to learn which.',
                  misconception: 'Students often believe that hormones are produced by organs directly where the change happens (e.g., thinking hair follicles produce the.' }
          ],
            remediations: { 'hormones-are-produced-by-organs': { steps: ['To fix this, trace the path of a hormone using a physical map analogy: point out that the pituitary gland is located.', 'Emphasize that endocrine glands are ductless factories that ship their products through the blood highway to distant.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c7_bio_ch01_012', difficulty: 'standard',
          question: 'Reproductive health during adolescence refers to the complete physical, mental.',
          hint: 'Review c7_bio_ch01_004 and c7_bio_ch01_008 to reinforce how body changes require specific.',
          misconception: 'Students often think that reproductive health and personal hygiene only apply to adults, or that cleanliness is purely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reproductive health during adolescence refers to the complete physical, mental, and',
                  options: ['Reproductive health during adolescence refers to the complete physical, mental, and', 'The life stages of humans refer to the continuous, progressive biological phases of', 'Adolescence is the transitional period of physical, psychological, and social development', 'The rapid and marked increase in height and weight during adolescence, driven by the'],
                  hint: 'Review c7_bio_ch01_004 and c7_bio_ch01_008 to reinforce how body changes require specific hygiene.',
                  misconception: 'Students often think that reproductive health and personal hygiene only apply to adults, or that cleanliness is purely cosmetic (for.' }
          ],
            remediations: { 'reproductive-health-and-personal-hygiene': { steps: ['Remind the student that sweat glands (apocrine glands) become active during adolescence, producing nutrient-rich sweat.', 'Explain that bacteria feed on this sweat, multiplying rapidly in areas like underarms and the groin.', 'Demonstrate how unwashed bacteria can cause rashes, itching, and urinary or reproductive tract infections.', 'Emphasize that daily washing with soap and water is an essential biological defense mechanism, not just a cosmetic.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
