import type { SimDef } from '../../engine/types';

/** v3 generated — c8_bio_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_bio_ch02_p1: SimDef = {
    id: 'v3_c8_bio_ch02_p1',
    title: 'Health: The Ultimate Treasure · Part 1/2',
    subtitle: 'Protect a treasure that has three locks, not one',
    classLevel: 8, subject: 'biology', topic: 'Health: The Ultimate Treasure · Part 1/2',
    chapters: ['c8_bio_ch02'],
    nodeIds: ['c8_bio_ch2_1', 'c8_bio_ch2_10', 'c8_bio_ch2_11', 'c8_bio_ch2_12', 'c8_bio_ch2_2', 'c8_bio_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a health detective', intro: 'A school notices some students fall sick often while others struggle silently without a single symptom. Your job: figure out what \'healthy\' really means — and what actually protects it.', goal: 'Define health holistically, distinguish communicable from non-communicable diseases, and explain how immunity and prevention work.' },
    discovery: {
        question: 'Two students sit in the same class. One has a cold; the other is perfectly disease-free but anxious, friendless and can\'t sleep. A doctor says BOTH might be unhealthy. How can someone with zero disease still be unwell?',
        options: ['Health means complete physical, mental AND social well-being — not merely the absence of disease', 'The doctor is wrong — no symptoms means healthy', 'Only contagious diseases count as real illness', 'Mental states can\'t affect health, only germs can'],
        answer: 'Health means complete physical, mental AND social well-being — not merely the absence of disease',
        hook: 'Health isn\'t just \'no fever.\' A body can be disease-free while the mind struggles and friendships fail — the WHO definition counts all three, and they feed into each other.',
    },
    teaching: [
        { title: 'Health: Definition (Physical, Mental, and Social Well-Being)', text: 'Health is defined as a state of complete physical, mental, and social well-being, and not merely the absence of disease or infirmity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_bio_ch2_1', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Guard the treasure: separate infectious diseases from lifestyle diseases, trace how germs jump between people, and build a defence plan using immunity, vaccines and hygiene.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c8_bio_ch2_1', title: 'Health: Definition (Physical, Mental, and Social Well-Being)',
          caseStudy: { intro: 'Observe how a person who has no cough or fever (physical absence of disease) might still feel extremely anxious about exams or unable to talk to classmates.',
            decisions: [{ prompt: 'What are the three dimensions that make up the complete definition of health according to modern health standards?', options: [
                { text: 'The three dimensions are physical, mental, and social well-being', outcome: 'The three dimensions are physical, mental, and social well-being.' },
                { text: 'health', outcome: 'Not quite — Students often think that "health" is purely a biological or medical state where having no fever.', reveals: 'health-is-purely-a-biological' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_10', title: 'Personal Hygiene and Community Health',
          caseStudy: { intro: 'When you wash your oily hands after eating a greasy snack like samosas using soap and water, you notice that plain water alone cannot remove the oil, but soap.',
            decisions: [{ prompt: 'What is the primary chemical property of a soap molecule that enables it to remove oily dirt and destroy pathogen cell membranes during.', options: [
                { text: 'A soap molecule has a dual structure containing a hydrophobic (water-fearing) hydrocarbon', outcome: 'A soap molecule has a dual structure containing a hydrophobic (water-fearing) hydrocarbon tail that.' },
                { text: 'disinfectants', outcome: 'Not quite — Students often believe that "disinfectants" and "soaps" perform the exact same chemical function.', reveals: 'disinfectants-and-soaps-perform-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_11', title: 'Mental Health: Stress, Anxiety, and Well-Being',
          caseStudy: { intro: 'Observe how your body reacts when you are running late for school or facing an unexpected examination question: your heart beats faster, your breathing.',
            decisions: [{ prompt: 'What is the primary physiological hormone released by the adrenal glands during acute stress that prepares the body for a "fight or flight".', options: [
                { text: 'adrenaline (or epinephrine/cortisol)', outcome: 'The correct answer is adrenaline (or epinephrine/cortisol). A wrong answer reveals a confusion.' },
                { text: 'just in the mind', outcome: 'Not quite — Students often believe that mental health has no physical or chemical basis in the body, viewing.', reveals: 'mental-health-has-no-physical' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch2_12', title: 'Public Health Measures: Sanitation, Safe Water, Clean Environment',
          scaffold: { problem: 'A water treatment plant in Delhi processes 10,000 liters of turbid Yamuna river water per hour.',
            steps: [
            { text: 'Identify the given values: water volume per hour = 10,000 L, operating time = 8 hours, alum dosage = 30 mg/L.' },
            { text: 'Calculate the total volume of water processed in 8 hours by multiplying hourly volume by total hours ($10,000 \\, L/h.' },
            { text: 'Calculate the total mass of alum required in milligrams by multiplying total water volume by the dosage ($80,000 \\,.' },
            { text: 'Convert the mass from milligrams to grams by dividing by 1,000 ($2,400,000 \\, mg \\div 1,000 = 2,400 \\, g$).' },
            { text: 'Convert the mass from grams to kilograms by dividing by 1,000 ($2,400 \\, g \\div 1,000 = 2.4 \\, kg$).', faded: true, blankAnswer: '2.4 kg of alum' }
            ] } },
        { type: 'case', nodeId: 'c8_bio_ch2_3', title: 'Diseases: Causes and Types (Infectious and Non-Infectious)',
          caseStudy: { intro: 'When a student notices they catch a cold after sitting next to a sneezing classmate, but their grandparent\'s diabetes does not spread to anyone in the family.',
            decisions: [{ prompt: 'Which of the following describes an infectious disease? A) Diabetes caused by improper insulin production B) Scurvy caused by Vitamin.', options: [
                { text: 'C', outcome: 'The correct answer is C. Tuberculosis is caused by a pathogen (bacterium) that can be transmitted.' },
                { text: 'catching', outcome: 'Not quite — Students often assume that any illness that makes a person look weak or feel sick is "catching".', reveals: 'any-illness-that-makes-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_bio_ch2_10', title: 'Identify each idea',
          dissect: { specimen: 'Health: The Ultimate Treasure · Part 1/2', spots: [
            { id: 's1', label: 'Health Definition Physical Mental and Social Well-Being', prompt: 'Which idea is this? — Health is defined as a state of complete physical, mental, and social well-being, and not.', answer: 'Health Definition Physical Mental and Social Well-Being', options: ['Health Definition Physical Mental and Social Well-Being', 'Personal Hygiene and Community Health', 'Mental Health Stress Anxiety and Well-Being', 'Ayurveda and Holistic Health Dinacharya and Ritucharya'] },
            { id: 's2', label: 'Personal Hygiene and Community Health', prompt: 'Which idea is this? — Personal hygiene refers to individual self-care practices—such as proper handwashing with.', answer: 'Personal Hygiene and Community Health', options: ['Personal Hygiene and Community Health', 'Health Definition Physical Mental and Social Well-Being', 'Mental Health Stress Anxiety and Well-Being', 'Ayurveda and Holistic Health Dinacharya and Ritucharya'] },
            { id: 's3', label: 'Mental Health Stress Anxiety and Well-Being', prompt: 'Which idea is this? — Mental health refers to a state of emotional, psychological, and social well-being in.', answer: 'Mental Health Stress Anxiety and Well-Being', options: ['Mental Health Stress Anxiety and Well-Being', 'Health Definition Physical Mental and Social Well-Being', 'Personal Hygiene and Community Health', 'Ayurveda and Holistic Health Dinacharya and Ritucharya'] },
            { id: 's4', label: 'Ayurveda and Holistic Health Dinacharya and Ritucharya', prompt: 'Which idea is this? — Ayurveda and Holistic Health: Dinacharya (daily routine) and Ritucharya (seasonal.', answer: 'Ayurveda and Holistic Health Dinacharya and Ritucharya', options: ['Ayurveda and Holistic Health Dinacharya and Ritucharya', 'Health Definition Physical Mental and Social Well-Being', 'Personal Hygiene and Community Health', 'Mental Health Stress Anxiety and Well-Being'] },
            { id: 's5', label: 'Diseases Causes and Types Infectious and Non-Infectious', prompt: 'Which idea is this? — Disease is any condition that disturbs the normal working of the body or mind.', answer: 'Diseases Causes and Types Infectious and Non-Infectious', options: ['Diseases Causes and Types Infectious and Non-Infectious', 'Health Definition Physical Mental and Social Well-Being', 'Personal Hygiene and Community Health', 'Mental Health Stress Anxiety and Well-Being'] }
          ] } },
        { type: 'case', nodeId: 'c8_bio_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate tops every exam, never falls sick and jogs daily, but lately he eats lunch alone, snaps at friends and says he feels constantly tense. He insists, \'I am perfectly healthy — look at my report card and my stamina.\'',
            decisions: [{ prompt: 'Is he healthy by the full definition?', options: [
                { text: 'Not fully — health means complete physical, mental and social well-being together. His body is fine, but the tension (mental) and isolation and conflict (social) mean a dimension is failing, and a strong report card does not patch it.', outcome: 'This applies the three-dimension definition: no-disease-plus-fitness is only one third of health.' },
                { text: 'He is right — health is a medical state, and since he has no disease and good stamina, nothing else counts.', outcome: 'That is the narrow view the definition rejects; mental strain and broken social ties are health problems even with a perfect body.', reveals: 'health-is-no-disease' },
                { text: 'He is unhealthy only if the stress gives him a fever — until a physical symptom appears, mental and social issues are separate matters.', outcome: 'Waiting for a fever confuses dimensions with symptoms; anxiety and loneliness already impair the mental and social dimensions directly.', reveals: 'wait-for-fever' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'Health is three treasures in one chest — body, mind, relationships. Germs threaten the first; stress and isolation threaten the rest. Guarding all three is the real work.',
            decisions: [{ prompt: 'What comes next? Health: The Ultimate Treasure · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Health: The Ultimate Treasure · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_bio_ch2_1', difficulty: 'standard',
          question: 'Health is defined as a state of complete physical, mental, and social.',
          hint: 'Review how everyday objects are classified by multiple properties (appearance, hardness.',
          misconception: 'Students often think that "health" is purely a biological or medical state where having no fever, cough, or broken.',
          parts: [
                { id: 'a', prompt: 'What are the three dimensions that make up the complete definition of health according to modern health standards?', answer: 'The three dimensions are physical, mental, and social well-being',
                  options: ['The three dimensions are physical, mental, and social well-being', 'health'],
                  hint: 'Review how everyday objects are classified by multiple properties (appearance, hardness.',
                  misconception: 'Students often think that "health" is purely a biological or medical state where having no fever, cough, or broken bones means a person.' },
                { id: 'b', prompt: 'Analyze the statement: "Health is an individual matter and has nothing to do with society." Why is this statement scientifically incorrect?', answer: 'This statement is incorrect',
                  options: ['This statement is incorrect', 'health'],
                  hint: 'Review how everyday objects are classified by multiple properties (appearance, hardness.',
                  misconception: 'Students often think that "health" is purely a biological or medical state where having no fever, cough, or broken bones means a person.' }
          ],
            remediations: { 'health-is-purely-a-biological': { steps: ['To fix this misconception, ask the student to recall a time when they felt very stressed or sad (mental/social issue).', 'Explain that the mind and body are deeply connected, and human beings depend on community interaction, making mental.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "health" is purely a biological or medical state where having no fever, cough, or broken.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether a person who exercises daily and eats well, but has no friends and feels constant depression, can be classified as healthy.', answer: 'The person cannot be classified as healthy',
                  options: ['The person cannot be classified as healthy', 'health'],
                  hint: 'Review how everyday objects are classified by multiple properties (appearance, hardness.',
                  misconception: 'Students often think that "health" is purely a biological or medical state where having no fever, cough, or broken bones means a person.' }
          ],
            remediations: { 'health-is-purely-a-biological': { steps: ['To fix this misconception, ask the student to recall a time when they felt very stressed or sad (mental/social issue).', 'Explain that the mind and body are deeply connected, and human beings depend on community interaction, making mental.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_10', difficulty: 'standard',
          question: 'Personal hygiene refers to individual self-care practices—such as proper.',
          hint: 'Review solubility properties of materials and how substances interact with water from.',
          misconception: 'Students often believe that "disinfectants" and "soaps" perform the exact same chemical function, thinking that soaps.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Personal hygiene refers to individual self-care practices—such as proper handwashing with',
                  options: ['Personal hygiene refers to individual self-care practices—such as proper handwashing with', 'Health is defined as a state of complete physical, mental, and social well-being, and not', 'Mental health refers to a state of emotional, psychological, and social well-being in a', 'Public health measures encompass community-level chemical and biological interventions'],
                  hint: 'Review solubility properties of materials and how substances interact with water from Class 6.',
                  misconception: 'Students often believe that "disinfectants" and "soaps" perform the exact same chemical function, thinking that soaps kill germs directly.' }
          ],
            remediations: { 'disinfectants-and-soaps-perform-the': { steps: ['To correct this, have the student perform a simple kitchen experiment: mix a few drops of edible oil in a glass.', 'Then, add a few drops of liquid soap, stir, and observe that the oil disperses uniformly into tiny droplets suspended.', 'Explain that soap surrounds the oil and germs with its hydrophobic tail, allowing water to wash them away safely.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_11', difficulty: 'standard',
          question: 'Mental health refers to a state of emotional, psychological, and social.',
          hint: 'Review the basics of health definitions and how organ systems coordinate in c8_bio_ch2_1.',
          misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety.',
          parts: [
                { id: 'a', prompt: 'What is the primary physiological hormone released by the adrenal glands during acute stress that prepares the body for a "fight or flight" response?', answer: 'adrenaline (or epinephrine/cortisol)',
                  options: ['adrenaline (or epinephrine/cortisol)', 'just in the mind'],
                  hint: 'Review the basics of health definitions and how organ systems coordinate in c8_bio_ch2_1.',
                  misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as purely imaginary.' }
          ],
            remediations: { 'mental-health-has-no-physical': { steps: ['To correct this, guide the student through a simple observation of their own body: ask them to recall a time they felt.', 'Explain that these physical changes are caused by real chemical messengers (hormones) traveling through their blood.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_12', difficulty: 'standard',
          question: 'Public health measures encompass community-level chemical and biological.',
          hint: 'Review solubility and separation techniques from Class 6 and 7 chemistry before.',
          misconception: 'Students often believe that clear, transparent water is automatically safe to drink, confusing physical clarity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Public health measures encompass community-level chemical and biological interventions',
                  options: ['Public health measures encompass community-level chemical and biological interventions', 'Health is defined as a state of complete physical, mental, and social well-being, and not', 'Personal hygiene refers to individual self-care practices—such as proper handwashing with', 'Mental health refers to a state of emotional, psychological, and social well-being in a'],
                  hint: 'Review solubility and separation techniques from Class 6 and 7 chemistry before attempting.',
                  misconception: 'Students often believe that clear, transparent water is automatically safe to drink, confusing physical clarity (absence of suspended.' }
          ],
            remediations: { 'clear': { steps: ['Demonstrate by taking a clear sample of stagnant pond water that contains invisible pathogens or dissolved chemical.', 'Emphasize that physical filtration only removes undissolved solids, while chemical disinfection or boiling is mandatory.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_2', difficulty: 'standard',
          question: 'Ayurveda and Holistic Health: Dinacharya (daily routine) and Ritucharya.',
          hint: 'Review the basics of chemical changes in biological systems and how environmental factors.',
          misconception: 'Students often think that biological routines like Dinacharya are just cultural traditions with no underlying.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ayurveda and Holistic Health: Dinacharya (daily routine) and Ritucharya (seasonal',
                  options: ['Ayurveda and Holistic Health: Dinacharya (daily routine) and Ritucharya (seasonal', 'Health is defined as a state of complete physical, mental, and social well-being, and not', 'Personal hygiene refers to individual self-care practices—such as proper handwashing with', 'Mental health refers to a state of emotional, psychological, and social well-being in a'],
                  hint: 'Review the basics of chemical changes in biological systems and how environmental factors influence.',
                  misconception: 'Students often think that biological routines like Dinacharya are just cultural traditions with no underlying biochemical or physiological.' }
          ],
            remediations: { 'biological-routines-like-dinacharya-are': { steps: ['Review how environmental cues like light and temperature regulate body temperature and hormone levels in living.', 'Connect these cues to internal chemical reactions such as enzyme activity and cellular respiration.', 'Emphasize that biological systems respond directly to physical changes in their surroundings.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_3', difficulty: 'standard',
          question: 'Disease is any condition that disturbs the normal working of the body or mind.',
          hint: 'Review the definition of health in c8_bio_ch2_1 and practice understanding how the body.',
          misconception: 'Students often assume that any illness that makes a person look weak or feel sick is "catching" or infectious, leading.',
          parts: [
                { id: 'a', prompt: 'Which of the following describes an infectious disease? A) Diabetes caused by improper insulin production B) Scurvy caused by Vitamin C deficiency C).', answer: 'Tuberculosis caused by Mycobacterium tuberculosis',
                  options: ['Tuberculosis caused by Mycobacterium tuberculosis', 'catching'],
                  hint: 'Review the definition of health in c8_bio_ch2_1 and practice understanding how the body works.',
                  misconception: 'Students often assume that any illness that makes a person look weak or feel sick is "catching" or infectious, leading them to believe that.' },
                { id: 'b', prompt: 'Why are non-infectious diseases like heart disease not transmitted from an infected person to a healthy person through casual contact?', answer: 'Because they do not involve external pathogens or contagious agents',
                  options: ['Because they do not involve external pathogens or contagious agents', 'catching'],
                  hint: 'Review the definition of health in c8_bio_ch2_1 and practice understanding how the body works.',
                  misconception: 'Students often assume that any illness that makes a person look weak or feel sick is "catching" or infectious, leading them to believe that.' }
          ],
            remediations: { 'any-illness-that-makes-a': { steps: ['To correct this, guide the student through a two-step checklist for any disease: 1) Look for the microscopic pathogen.', '2) Ask if the condition can be passed to another person via air, water, vectors, or contact.', 'If no pathogen is transmitted, emphasize that the malfunction is internal or environmental (non-infectious).'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
