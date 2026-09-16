import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch06_p1: SimDef = {
    id: 'v3_c6_biology_ch06_p1',
    title: 'Adolescence -- A Stage of Growth · Part 1/2',
    subtitle: 'Why do classmates your age look so different from each other?',
    classLevel: 6, subject: 'biology', topic: 'Adolescence -- A Stage of Growth · Part 1/2',
    chapters: ['c6_biology_ch06'],
    nodeIds: ['c6_biology_ch06_001', 'c6_biology_ch06_002', 'c6_biology_ch06_003', 'c6_biology_ch06_004', 'c6_biology_ch06_005', 'c6_biology_ch06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a growth detective puzzling over a class photo', intro: 'Three friends, all 12, look like they belong in three different grades. Somewhere between birthday candles and shoe sizes, adolescence is running on personal clocks.', goal: 'Explain why growth spurts hit different people at different times — and stop worrying that your body is \'late\'.' },
    discovery: {
        question: 'In your class photo, three friends who all turned 12 this year look wildly different — one looks 15, one looks 12, one still looks 10. A visiting aunt whispers, \'Someone must be lying about their age!\' What\'s really going on?',
        options: ['Nothing is wrong — bodies grow in \'spurts\' on their own schedules during adolescence', 'The tall one is secretly older — everyone grows the same amount each year', 'The shorter ones are sick — equal ages should mean equal heights', 'They look different only because they eat different brands of food'],
        answer: 'Nothing is wrong — bodies grow in \'spurts\' on their own schedules during adolescence',
        hook: 'Same age does not mean same stage. Adolescence has no school-wide timetable — each body starts and finishes on a schedule as unique as a fingerprint.',
    },
    teaching: [
        { title: 'Growing With Age: What Happens During Teenage Years', text: 'Adolescence is a transformative stage of human development occurring between childhood and adulthood, typically spanning from age eleven or twelve to nineteen, characterized by rapid physical and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch06_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Follow one student\'s body through a growth spurt — track the changes inside and out — and figure out why their best friend is still waiting for theirs.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch06_003', title: 'Changes Indicating Reproductive Maturity',
          caseStudy: { intro: 'Have you ever noticed how your older siblings or cousins suddenly seem to change, not just in height, but in how their bodies look and function?',
            decisions: [{ prompt: 'What is the primary indicator of reproductive maturity in females mentioned in the chapter?', options: [
                { text: 'The primary indicator is the onset of menstruation', outcome: 'The primary indicator is the onset of menstruation. A wrong answer (like "getting taller") suggests.' },
                { text: 'getting taller', outcome: 'Not quite — Students often believe that reproductive maturity happens instantly at a specific age for everyone.', reveals: 'reproductive-maturity-happens-instantly-at' },
                { text: 'reproductive maturity happens instantly at a specific age for everyone', outcome: 'Not quite — Students often believe that reproductive maturity happens instantly at a specific age for everyone.', reveals: 'reproductive-maturity-happens-instantly-at' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_004', title: 'Emotional and Behavioural Changes During Adolescence',
          caseStudy: { intro: 'Have you ever felt like you were super happy one minute and then suddenly annoyed or sad the next, without any big reason?',
            decisions: [{ prompt: 'What happens to the brain during adolescence that contributes to changes in how we feel?', options: [
                { text: 'The brain is reorganizing its connections and maturing', outcome: 'The brain is reorganizing its connections and maturing. A wrong answer here suggests the student.' },
                { text: 'just happening', outcome: 'Not quite — Students often believe that mood swings are a sign of "being difficult" or "bad behavior." They.', reveals: 'mood-swings-are-a-sign' },
                { text: 'being difficult', outcome: 'Not quite — Students often believe that mood swings are a sign of "being difficult" or "bad behavior." They.', reveals: 'mood-swings-are-a-sign' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_005', title: 'Making Adolescence a Joyful Experience: Coping Strategies',
          caseStudy: { intro: 'Have you ever felt like a small problem in your day—like a disagreement with a friend or a worry about school—felt much bigger just because you kept thinking.',
            decisions: [{ prompt: 'What is the most effective initial step mentioned for managing worries during adolescence?', options: [
                { text: 'The most effective step is open communication by sharing worries with a trusted adult,', outcome: 'The most effective step is open communication by sharing worries with a trusted adult, sibling,.' },
                { text: 'less grown-up', outcome: 'Not quite — Students often believe that independence means handling every emotional problem alone.', reveals: 'independence-means-handling-every-emotional' },
                { text: 'independence means handling every emotional problem alone', outcome: 'Not quite — Students often believe that independence means handling every emotional problem alone.', reveals: 'independence-means-handling-every-emotional' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_006', title: 'The \'Why\' Question: Hormones Behind the Changes',
          caseStudy: { intro: 'Have you ever wondered why your voice changes or why you suddenly start growing taller during your teenage years?',
            decisions: [{ prompt: 'What is the primary role of hormones in the human body?', options: [
                { text: 'Hormones act as chemical messengers that travel through the bloodstream to give', outcome: 'Hormones act as chemical messengers that travel through the bloodstream to give instructions.' },
                { text: 'hormones are food for growth', outcome: 'Not quite — Students often think hormones are a type of "fuel" or "vitamin" that provides energy for growth.', reveals: 'hormones-are-a-type-of' },
                { text: 'vitamin', outcome: 'Not quite — Students often think hormones are a type of "fuel" or "vitamin" that provides energy for growth.', reveals: 'hormones-are-a-type-of' }
            ] }] } },
        { type: 'dissect', nodeId: 'c6_biology_ch06_002', title: 'Identify each idea',
          dissect: { specimen: 'Adolescence -- A Stage of Growth · Part 1/2', spots: [
            { id: 's1', label: 'Growing With Age What Happens During Teenage Years', prompt: 'Which idea is this? — Adolescence is a transformative stage of human development occurring between childhood.', answer: 'Growing With Age What Happens During Teenage Years', options: ['Growing With Age What Happens During Teenage Years', 'Physical Changes in Adolescence Height Weight Body Shape', 'Changes Indicating Reproductive Maturity', 'Emotional and Behavioural Changes During Adolescence'] },
            { id: 's2', label: 'Physical Changes in Adolescence Height Weight Body Shape', prompt: 'Which idea is this? — Physical changes in adolescence refer to the rapid, visible growth and transformation.', answer: 'Physical Changes in Adolescence Height Weight Body Shape', options: ['Physical Changes in Adolescence Height Weight Body Shape', 'Growing With Age What Happens During Teenage Years', 'Changes Indicating Reproductive Maturity', 'Emotional and Behavioural Changes During Adolescence'] },
            { id: 's3', label: 'Changes Indicating Reproductive Maturity', prompt: 'Which idea is this? — Reproductive maturity is the stage during adolescence when an individual\'s body develops.', answer: 'Changes Indicating Reproductive Maturity', options: ['Changes Indicating Reproductive Maturity', 'Growing With Age What Happens During Teenage Years', 'Physical Changes in Adolescence Height Weight Body Shape', 'Emotional and Behavioural Changes During Adolescence'] },
            { id: 's4', label: 'Emotional and Behavioural Changes During Adolescence', prompt: 'Which idea is this? — Adolescence is a transitional stage of growth between childhood and adulthood where the.', answer: 'Emotional and Behavioural Changes During Adolescence', options: ['Emotional and Behavioural Changes During Adolescence', 'Growing With Age What Happens During Teenage Years', 'Physical Changes in Adolescence Height Weight Body Shape', 'Changes Indicating Reproductive Maturity'] },
            { id: 's5', label: 'Making Adolescence a Joyful Experience Coping Strategies', prompt: 'Which idea is this? — Coping strategies in adolescence are healthy, proactive ways to manage the new emotional.', answer: 'Making Adolescence a Joyful Experience Coping Strategies', options: ['Making Adolescence a Joyful Experience Coping Strategies', 'Growing With Age What Happens During Teenage Years', 'Physical Changes in Adolescence Height Weight Body Shape', 'Changes Indicating Reproductive Maturity'] },
            { id: 's6', label: 'The Why Question Hormones Behind the Changes', prompt: 'Which idea is this? — Hormones are invisible chemical messengers produced by glands in the body that travel.', answer: 'The Why Question Hormones Behind the Changes', options: ['The Why Question Hormones Behind the Changes', 'Growing With Age What Happens During Teenage Years', 'Physical Changes in Adolescence Height Weight Body Shape', 'Changes Indicating Reproductive Maturity'] }
          ] } },
        { type: 'case', nodeId: 'c6_biology_ch06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In the Class 6 photo, three friends who all turned twelve this year look wildly different — one looks fifteen, one looks twelve, one still looks ten. A visiting relative whispers that somebody must be lying about their age.',
            decisions: [{ prompt: 'What is really going on?', options: [
                { text: 'Nothing is wrong — adolescence and its growth spurt start on each body\'s own schedule, somewhere in the early teens, so same-age classmates can look years apart. Bodies are not products off an assembly line with a fixed finish date; each has its own timetable.', outcome: 'The chapter\'s key idea: adolescence is a window, not a birthday — entering it at eleven or thirteen are both normal, and the height differences even out over time.' },
                { text: 'The relative is right — children of the same age should look the same, so someone is lying.', outcome: 'Same age does not mean same stage — growth spurts begin at different ages for different children, which is exactly what the photo shows.', reveals: 'same-age-same-growth' },
                { text: 'The shorter children must be sick or underfed, since healthy children always grow at the same rate.', outcome: 'A later growth spurt is not illness — healthy children simply enter adolescence at different ages within the normal window.', reveals: 'short-means-sick' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Adolescence isn\'t a race with a single start line. Your body is quietly rebuilding you for adulthood — on a schedule that\'s entirely your own.',
            decisions: [{ prompt: 'What comes next? Adolescence -- A Stage of Growth · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Adolescence -- A Stage of Growth · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch06_001', difficulty: 'standard',
          question: 'Adolescence is a transformative stage of human development occurring between.',
          hint: 'Review the section on "Growth" in Chapter 10 of the NCERT text to confirm that all living.',
          misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical growth.',
          parts: [
                { id: 'a', prompt: 'If your friend starts their growth spurt at age eleven and you start yours at age thirteen, does this mean one of you is developing incorrectly?', answer: 'No, it is normal',
                  options: ['No, it is normal', 'human development must follow a rigid, identical schedule for everyone'],
                  hint: 'Review the section on "Growth" in Chapter 10 of the NCERT text to confirm that all living things.',
                  misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical growth.' }
          ],
            remediations: { 'because-they-are-in-the': { steps: ['First, explain that human development is like a race where everyone has a different starting block.', 'Ask them to look at a variety of trees in a garden—some are tall, some are short, and some are just sprouting, yet all.', 'Emphasize that "normal" has a wide range, and their body\'s timing is specific to their own genetic blueprint.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_002', difficulty: 'standard',
          question: 'Physical changes in adolescence refer to the rapid, visible growth and.',
          hint: 'Review the chapter on "Living Creatures: Exploring their Characteristics" specifically.',
          misconception: 'Students often believe that physical growth during adolescence is solely the result of diet or physical activity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical changes in adolescence refer to the rapid, visible growth and transformation of',
                  options: ['Physical changes in adolescence refer to the rapid, visible growth and transformation of', 'Adolescence is a transformative stage of human development occurring between childhood', 'Reproductive maturity is the stage during adolescence when an individual\'s body develops', 'Adolescence is a transitional stage of growth between childhood and adulthood where the'],
                  hint: 'Review the chapter on "Living Creatures: Exploring their Characteristics" specifically the section.',
                  misconception: 'Students often believe that physical growth during adolescence is solely the result of diet or physical activity levels.' }
          ],
            remediations: { 'physical-growth-during-adolescence-is': { steps: ['If a student thinks diet is the only factor, ask them: "If you eat the exact same amount of food as a 5-year-old, will.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_003', difficulty: 'standard',
          question: 'Reproductive maturity is the stage during adolescence when an individual\'s body.',
          hint: 'Review the section on the life cycle of a bean plant to understand that maturity involves.',
          misconception: 'Students often believe that reproductive maturity happens instantly at a specific age for everyone.',
          parts: [
                { id: 'a', prompt: 'What is the primary indicator of reproductive maturity in females mentioned in the chapter?', answer: 'The primary indicator is the onset of menstruation',
                  options: ['The primary indicator is the onset of menstruation', 'getting taller', 'reproductive maturity happens instantly at a specific age for everyone'],
                  hint: 'Review the section on the life cycle of a bean plant to understand that maturity involves reaching.',
                  misconception: 'Students often believe that reproductive maturity happens instantly at a specific age for everyone.' },
                { id: 'b', prompt: 'If a student thinks that reproductive maturity is the same as "growing tall," what specific biological change are they ignoring?', answer: 'They are ignoring the maturation of the reproductive system',
                  options: ['They are ignoring the maturation of the reproductive system', 'reproductive maturity happens instantly at a specific age for everyone'],
                  hint: 'Review the section on the life cycle of a bean plant to understand that maturity involves reaching.',
                  misconception: 'Students often believe that reproductive maturity happens instantly at a specific age for everyone.' },
                { id: 'c', prompt: 'How does the body\'s reaction to the absence of fertilisation demonstrate the "cyclical" nature of reproductive maturity?', answer: 'The body prepares the uterus lining for a potential pregnancy',
                  options: ['The body prepares the uterus lining for a potential pregnancy', 'reproductive maturity happens instantly at a specific age for everyone'],
                  hint: 'Review the section on the life cycle of a bean plant to understand that maturity involves reaching.',
                  misconception: 'Students often believe that reproductive maturity happens instantly at a specific age for everyone.' }
          ],
            remediations: { 'reproductive-maturity-happens-instantly-at': { steps: ['First, explain that human growth is not a race; individual bodies follow unique timelines based on genetics and health.', 'Second, ask the student to look at the "Life Cycle of a Plant" section to see how different plants reach maturity.', 'Third, reassure them that reaching this stage is a natural, gradual transition, not a sudden event that happens on.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that reproductive maturity happens instantly at a specific age for everyone.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say that reproductive maturity is the final stage of human growth? Why or why not?', answer: 'No, it is a milestone within the growth stage, not the end',
                  options: ['No, it is a milestone within the growth stage, not the end', 'reproductive maturity happens instantly at a specific age for everyone'],
                  hint: 'Review the section on the life cycle of a bean plant to understand that maturity involves reaching.',
                  misconception: 'Students often believe that reproductive maturity happens instantly at a specific age for everyone.' }
          ],
            remediations: { 'reproductive-maturity-happens-instantly-at': { steps: ['First, explain that human growth is not a race; individual bodies follow unique timelines based on genetics and health.', 'Second, ask the student to look at the "Life Cycle of a Plant" section to see how different plants reach maturity.', 'Third, reassure them that reaching this stage is a natural, gradual transition, not a sudden event that happens on.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_004', difficulty: 'standard',
          question: 'Adolescence is a transitional stage of growth between childhood and adulthood.',
          hint: 'Review the concept of "growth and development" in Chapter 10 regarding life cycles.',
          misconception: 'Students often believe that mood swings are a sign of "being difficult" or "bad behavior." They make this mistake.',
          parts: [
                { id: 'a', prompt: 'What happens to the brain during adolescence that contributes to changes in how we feel?', answer: 'The brain is reorganizing its connections and maturing',
                  options: ['The brain is reorganizing its connections and maturing', 'just happening', 'being difficult', 'bad behavior'],
                  hint: 'Review the concept of "growth and development" in Chapter 10 regarding life cycles.',
                  misconception: 'Students often believe that mood swings are a sign of "being difficult" or "bad behavior." They make this mistake because they view their.' },
                { id: 'b', prompt: 'If a student suddenly feels irritable after being excited, is this a sign of a mental health disorder?', answer: 'No, it is a common behavior reflecting normal maturation',
                  options: ['No, it is a common behavior reflecting normal maturation', 'being difficult', 'bad behavior', 'mood swings are a sign of "being difficult" or "bad behavior'],
                  hint: 'Review the concept of "growth and development" in Chapter 10 regarding life cycles.',
                  misconception: 'Students often believe that mood swings are a sign of "being difficult" or "bad behavior." They make this mistake because they view their.' },
                { id: 'c', prompt: 'How does the intensity of emotional experience change from childhood to adolescence?', answer: 'It increases, with emotions feeling more intense and sometimes longer-lasting',
                  options: ['It increases, with emotions feeling more intense and sometimes longer-lasting', 'being difficult', 'bad behavior', 'mood swings are a sign of "being difficult" or "bad behavior'],
                  hint: 'Review the concept of "growth and development" in Chapter 10 regarding life cycles.',
                  misconception: 'Students often believe that mood swings are a sign of "being difficult" or "bad behavior." They make this mistake because they view their.' }
          ],
            remediations: { 'mood-swings-are-a-sign': { steps: ['Ask the student to compare their body growth (like growing taller) to their brain growth.', 'Say, "Just as your bones grow and your voice changes, your brain is also changing to handle more complex feelings.', 'It\'s not a choice; it\'s a phase of development."'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_005', difficulty: 'standard',
          question: 'Coping strategies in adolescence are healthy, proactive ways to manage the new.',
          hint: 'Review the section on how plants and animals respond to stimuli in the chapter "Living.',
          misconception: 'Students often believe that independence means handling every emotional problem alone.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Coping strategies in adolescence are healthy, proactive ways to manage the new emotional',
                  options: ['Coping strategies in adolescence are healthy, proactive ways to manage the new emotional', 'Adolescence is a transformative stage of human development occurring between childhood', 'Physical changes in adolescence refer to the rapid, visible growth and transformation of', 'Reproductive maturity is the stage during adolescence when an individual\'s body develops'],
                  hint: 'Review the section on how plants and animals respond to stimuli in the chapter "Living Creatures.',
                  misconception: 'Students often believe that independence means handling every emotional problem alone.' }
          ],
            remediations: { 'independence-means-handling-every-emotional': { steps: ['Direct the student to think of a time they struggled with a physical task—like learning a sport.', 'Ask: "Did you learn faster by watching others and asking for tips, or by trying alone?" Then explain that emotional.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch06_006', difficulty: 'standard',
          question: 'Hormones are invisible chemical messengers produced by glands in the body that.',
          hint: 'Review Chapter 10 regarding the characteristics of living beings and how they grow.',
          misconception: 'Students often think hormones are a type of "fuel" or "vitamin" that provides energy for growth.',
          parts: [
                { id: 'a', prompt: 'What is the primary role of hormones in the human body?', answer: 'Hormones act as chemical messengers that travel through the bloodstream to give',
                  options: ['Hormones act as chemical messengers that travel through the bloodstream to give', 'hormones are food for growth', 'vitamin', 'hormones are a type of "fuel" or "vitamin" that provides energy for growth'],
                  hint: 'Review Chapter 10 regarding the characteristics of living beings and how they grow.',
                  misconception: 'Students often think hormones are a type of "fuel" or "vitamin" that provides energy for growth.' },
                { id: 'b', prompt: 'If hormones are produced in one part of the body, how do they reach the part of the body that needs to grow?', answer: 'They travel through the bloodstream',
                  options: ['They travel through the bloodstream', 'vitamin', 'hormones are a type of "fuel" or "vitamin" that provides energy for growth'],
                  hint: 'Review Chapter 10 regarding the characteristics of living beings and how they grow.',
                  misconception: 'Students often think hormones are a type of "fuel" or "vitamin" that provides energy for growth.' }
          ],
            remediations: { 'hormones-are-a-type-of': { steps: ['First, ask the student: "If you have a blueprint for a house, does the blueprint itself build the walls, or does.', 'Clarify that the body\'s food (nutrition) provides the energy, while hormones provide the "go ahead" signal to use that.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
