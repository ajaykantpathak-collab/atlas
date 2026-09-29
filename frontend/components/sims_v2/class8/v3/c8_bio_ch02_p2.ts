import type { SimDef } from '../../engine/types';

/** v3 generated — c8_bio_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_bio_ch02_p2: SimDef = {
    id: 'v3_c8_bio_ch02_p2',
    title: 'Health: The Ultimate Treasure · Part 2/2',
    subtitle: 'Protect a treasure that has three locks, not one',
    classLevel: 8, subject: 'biology', topic: 'Health: The Ultimate Treasure · Part 2/2',
    chapters: ['c8_bio_ch02'],
    nodeIds: ['c8_bio_ch2_4', 'c8_bio_ch2_5', 'c8_bio_ch2_6', 'c8_bio_ch2_7', 'c8_bio_ch2_8', 'c8_bio_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a health detective', intro: 'A school notices some students fall sick often while others struggle silently without a single symptom. Your job: figure out what \'healthy\' really means — and what actually protects it.', goal: 'Define health holistically, distinguish communicable from non-communicable diseases, and explain how immunity and prevention work.' },
    discovery: {
        question: 'Two students sit in the same class. One has a cold; the other is perfectly disease-free but anxious, friendless and can\'t sleep. A doctor says BOTH might be unhealthy. How can someone with zero disease still be unwell?',
        options: ['Health means complete physical, mental AND social well-being — not merely the absence of disease', 'The doctor is wrong — no symptoms means healthy', 'Only contagious diseases count as real illness', 'Mental states can\'t affect health, only germs can'],
        answer: 'Health means complete physical, mental AND social well-being — not merely the absence of disease',
        hook: 'Health isn\'t just \'no fever.\' A body can be disease-free while the mind struggles and friendships fail — the WHO definition counts all three, and they feed into each other.',
    },
    teaching: [
        { title: 'Infectious Diseases: Bacterial, Viral, and Fungal', text: 'Infectious diseases are illnesses caused by microscopic pathogens such as bacteria, viruses, and fungi that invade the body, multiply, and disrupt normal physiological functions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_bio_ch2_4', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Guard the treasure: separate infectious diseases from lifestyle diseases, trace how germs jump between people, and build a defence plan using immunity, vaccines and hygiene.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c8_bio_ch2_5', title: 'Transmission of Diseases: Direct and Indirect Contact',
          caseStudy: { intro: 'Observe how a common cold spreads rapidly in a crowded classroom after one student sneezes or shares a water bottle with another.',
            decisions: [{ prompt: 'Which of the following is a classic example of direct contact transmission of an infectious disease?', options: [
                { text: 'C', outcome: 'The correct answer is C. Direct contact transmission involves physical transfer of microorganisms.' },
                { text: 'airborne transmission', outcome: 'Not quite — Students often confuse "airborne transmission" with "droplet transmission," assuming that any.', reveals: 'students-often-confuse-airborne-transmission' },
                { text: 'droplet transmission', outcome: 'Not quite — Students often confuse "airborne transmission" with "droplet transmission," assuming that any.', reveals: 'students-often-confuse-airborne-transmission' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_6', title: 'Non-Infectious Diseases: Diabetes, Heart Disease, Lifestyle',
          caseStudy: { intro: 'Observe how elders in our families often monitor their sugar intake or blood pressure, or how staying physically inactive and consuming excessive oily.',
            decisions: [{ prompt: 'Which of the following is a characteristic feature of non-infectious diseases?', options: [
                { text: 'C', outcome: 'The correct answer is C. Non-infectious diseases are non-transmissible and develop due to genetic.' },
                { text: 'non-infectious', outcome: 'Not quite — Students often think that "non-infectious" means "completely harmless or minor" because it doesn\'t.', reveals: 'non-infectious-means-completely-harmless' },
                { text: 'completely harmless or minor', outcome: 'Not quite — Students often think that "non-infectious" means "completely harmless or minor" because it doesn\'t.', reveals: 'non-infectious-means-completely-harmless' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_7', title: 'Nutrition and Health: Balanced Diet and Nutrients',
          caseStudy: { intro: 'When you eat a balanced meal like dal, rice, roti, sabzi, and curd, your body breaks down these foods into fundamental chemical units during digestion.',
            decisions: [{ prompt: 'Which class of organic macromolecules is primarily responsible for tissue growth, cellular repair, and the synthesis of biological.', options: [
                { text: 'Proteins are the correct answer', outcome: 'Proteins are the correct answer because they are polymers of amino acids linked by peptide bonds.' },
                { text: 'fat-free', outcome: 'Not quite — Students often believe that "fat-free" diets are entirely beneficial for health and that all fats.', reveals: 'fat-free-diets-are-entirely' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_9', title: 'Vaccines: How They Work and Their Importance',
          caseStudy: { intro: 'When a child receives the polio drops at a local government dispensary, they are not getting medicine to cure a current sickness; they are receiving a safe.',
            decisions: [{ prompt: 'What is the primary biological component contained in a standard vaccine that triggers an immune response?', options: [
                { text: 'The primary component is a weakened, killed, or fragmented pathogen (antigen)', outcome: 'The primary component is a weakened, killed, or fragmented pathogen (antigen).' },
                { text: 'ready-made antibodies', outcome: 'Not quite — Students often believe that vaccines contain live, fully virulent disease-causing germs that will.', reveals: 'vaccines-contain-live' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_bio_ch2_5', title: 'Identify each idea',
          dissect: { specimen: 'Health: The Ultimate Treasure · Part 2/2', spots: [
            { id: 's1', label: 'Infectious Diseases Bacterial Viral and Fungal', prompt: 'Which idea is this? — Infectious diseases are illnesses caused by microscopic pathogens such as bacteria.', answer: 'Infectious Diseases Bacterial Viral and Fungal', options: ['Infectious Diseases Bacterial Viral and Fungal', 'Transmission of Diseases Direct and Indirect Contact', 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle', 'Nutrition and Health Balanced Diet and Nutrients'] },
            { id: 's2', label: 'Transmission of Diseases Direct and Indirect Contact', prompt: 'Which idea is this? — Transmission of diseases refers to the mechanisms by which infectious pathogens (such.', answer: 'Transmission of Diseases Direct and Indirect Contact', options: ['Transmission of Diseases Direct and Indirect Contact', 'Infectious Diseases Bacterial Viral and Fungal', 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle', 'Nutrition and Health Balanced Diet and Nutrients'] },
            { id: 's3', label: 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle', prompt: 'Which idea is this? — Non-infectious diseases are medical conditions that cannot be transmitted from person.', answer: 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle', options: ['Non-Infectious Diseases Diabetes Heart Disease Lifestyle', 'Infectious Diseases Bacterial Viral and Fungal', 'Transmission of Diseases Direct and Indirect Contact', 'Nutrition and Health Balanced Diet and Nutrients'] },
            { id: 's4', label: 'Nutrition and Health Balanced Diet and Nutrients', prompt: 'Which idea is this? — A balanced diet is a daily nutritional intake that provides all essential macro-nutrients.', answer: 'Nutrition and Health Balanced Diet and Nutrients', options: ['Nutrition and Health Balanced Diet and Nutrients', 'Infectious Diseases Bacterial Viral and Fungal', 'Transmission of Diseases Direct and Indirect Contact', 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle'] },
            { id: 's5', label: 'Immunity Bodys Defence Against Diseases', prompt: 'Which idea is this? — Immunity is the body\'s inbuilt ability to defend itself against disease-causing microbes.', answer: 'Immunity Bodys Defence Against Diseases', options: ['Immunity Bodys Defence Against Diseases', 'Infectious Diseases Bacterial Viral and Fungal', 'Transmission of Diseases Direct and Indirect Contact', 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle'] },
            { id: 's6', label: 'Vaccines How They Work and Their Importance', prompt: 'Which idea is this? — Vaccines are biological preparations containing weakened, killed, or fragmented parts.', answer: 'Vaccines How They Work and Their Importance', options: ['Vaccines How They Work and Their Importance', 'Infectious Diseases Bacterial Viral and Fungal', 'Transmission of Diseases Direct and Indirect Contact', 'Non-Infectious Diseases Diabetes Heart Disease Lifestyle'] }
          ] } },
        { type: 'case', nodeId: 'c8_bio_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate tops every exam, never falls sick and jogs daily, but lately he eats lunch alone, snaps at friends and says he feels constantly tense. He insists, \'I am perfectly healthy — look at my report card and my stamina.\'',
            decisions: [{ prompt: 'Is he healthy by the full definition?', options: [
                { text: 'Not fully — health means complete physical, mental and social well-being together. His body is fine, but the tension (mental) and isolation and conflict (social) mean a dimension is failing, and a strong report card does not patch it.', outcome: 'This applies the three-dimension definition: no-disease-plus-fitness is only one third of health.' },
                { text: 'He is right — health is a medical state, and since he has no disease and good stamina, nothing else counts.', outcome: 'That is the narrow view the definition rejects; mental strain and broken social ties are health problems even with a perfect body.', reveals: 'health-is-no-disease' },
                { text: 'He is unhealthy only if the stress gives him a fever — until a physical symptom appears, mental and social issues are separate matters.', outcome: 'Waiting for a fever confuses dimensions with symptoms; anxiety and loneliness already impair the mental and social dimensions directly.', reveals: 'wait-for-fever' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Health is three treasures in one chest — body, mind, relationships. Germs threaten the first; stress and isolation threaten the rest. Guarding all three is the real work.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_bio_ch2_4', difficulty: 'standard',
          question: 'Infectious diseases are illnesses caused by microscopic pathogens such.',
          hint: 'Review basic cell biology and the differences between living cells and non-living.',
          misconception: 'Students often believe that antibiotics can cure all infectious diseases, including viral infections like the common.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Infectious diseases are illnesses caused by microscopic pathogens such as bacteria,',
                  options: ['Infectious diseases are illnesses caused by microscopic pathogens such as bacteria,', 'Health is defined as a state of complete physical, mental, and social well-being, and not', 'Personal hygiene refers to individual self-care practices—such as proper handwashing with', 'Mental health refers to a state of emotional, psychological, and social well-being in a'],
                  hint: 'Review basic cell biology and the differences between living cells and non-living particles from.',
                  misconception: 'Students often believe that antibiotics can cure all infectious diseases, including viral infections like the common cold or influenza.' }
          ],
            remediations: { 'antibiotics-can-cure-all-infectious': { steps: ['To correct this, have the student compare the structure of a bacterium (with a cell wall, cytoplasm, and ribosomes).', 'Explain that antibiotics act as chemical keys that fit locks unique to bacterial machinery; since viruses lack those.', 'Review how biological specificity works in chemical and cellular reactions.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_5', difficulty: 'standard',
          question: 'Transmission of diseases refers to the mechanisms by which infectious pathogens.',
          hint: 'Review node c8_bio_ch2_4 to reinforce the characteristics of bacterial, viral, and fungal.',
          misconception: 'Students often confuse "airborne transmission" with "droplet transmission," assuming that any disease spread through.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a classic example of direct contact transmission of an infectious disease?', answer: 'Contracting chickenpox through direct physical touch of fluid from skin lesions',
                  options: ['Contracting chickenpox through direct physical touch of fluid from skin lesions', 'airborne transmission', 'droplet transmission'],
                  hint: 'Review node c8_bio_ch2_4 to reinforce the characteristics of bacterial, viral, and fungal pathogens.',
                  misconception: 'Students often confuse "airborne transmission" with "droplet transmission," assuming that any disease spread through coughing or sneezing.' },
                { id: 'b', prompt: 'Why is sharing a drinking glass considered an indirect contact transmission method rather than direct contact?', answer: 'Because the pathogen is transferred via an inanimate object (fomit',
                  options: ['Because the pathogen is transferred via an inanimate object (fomit', 'airborne transmission', 'droplet transmission'],
                  hint: 'Review node c8_bio_ch2_4 to reinforce the characteristics of bacterial, viral, and fungal pathogens.',
                  misconception: 'Students often confuse "airborne transmission" with "droplet transmission," assuming that any disease spread through coughing or sneezing.' },
                { id: 'c', prompt: 'During an epidemic investigation, health officials find that an entire neighborhood fell ill after drinking from a common well that was flooded during heavy.', answer: 'Indirect waterborne transmission',
                  options: ['Indirect waterborne transmission', 'airborne transmission', 'droplet transmission'],
                  hint: 'Review node c8_bio_ch2_4 to reinforce the characteristics of bacterial, viral, and fungal pathogens.',
                  misconception: 'Students often confuse "airborne transmission" with "droplet transmission," assuming that any disease spread through coughing or sneezing.' }
          ],
            remediations: { 'students-often-confuse-airborne-transmission': { steps: ['To correct this, have students visualize the difference between heavy water drops falling straight down when shaking.', 'Emphasize that distance from the infected person and ventilation are key factors separating the two pathways.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_6', difficulty: 'standard',
          question: 'Non-infectious diseases are medical conditions that cannot be transmitted from.',
          hint: 'Review c8_bio_ch2_3 to reinforce the fundamental differences in disease causes and.',
          misconception: 'Students often think that "non-infectious" means "completely harmless or minor" because it doesn\'t spread like a cold.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a characteristic feature of non-infectious diseases?', answer: 'They are non-transmissible and often linked to lifestyle or genetics',
                  options: ['They are non-transmissible and often linked to lifestyle or genetics', 'non-infectious', 'completely harmless or minor'],
                  hint: 'Review c8_bio_ch2_3 to reinforce the fundamental differences in disease causes and transmission.',
                  misconception: 'Students often think that "non-infectious" means "completely harmless or minor" because it doesn\'t spread like a cold or flu, failing.' },
                { id: 'b', prompt: 'A 45-year-old person has a sedentary lifestyle, eats fried snacks daily, and has a blood test showing high LDL (bad cholesterol) levels.', answer: 'Accumulation of plaque in blood vessels leading to cardiovascular disease',
                  options: ['Accumulation of plaque in blood vessels leading to cardiovascular disease', 'non-infectious', 'completely harmless or minor'],
                  hint: 'Review c8_bio_ch2_3 to reinforce the fundamental differences in disease causes and transmission.',
                  misconception: 'Students often think that "non-infectious" means "completely harmless or minor" because it doesn\'t spread like a cold or flu, failing.' }
          ],
            remediations: { 'non-infectious-means-completely-harmless': { steps: ['To correct this, emphasize that while you cannot "catch" diabetes or heart disease from someone else, these chronic.', 'Compare it to a slow chemical corrosion of metal: just as slow oxidation weakens an iron bridge without any germ.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_7', difficulty: 'standard',
          question: 'A balanced diet is a daily nutritional intake that provides all essential.',
          hint: 'Review basic food components and energy changes in food from Class 6 chemistry.',
          misconception: 'Students often believe that "fat-free" diets are entirely beneficial for health and that all fats are harmful chemical.',
          parts: [
                { id: 'a', prompt: 'Which class of organic macromolecules is primarily responsible for tissue growth, cellular repair, and the synthesis of biological catalysts known as enzymes?', answer: 'Proteins are the correct answer',
                  options: ['Proteins are the correct answer', 'fat-free'],
                  hint: 'Review basic food components and energy changes in food from Class 6 chemistry.',
                  misconception: 'Students often believe that "fat-free" diets are entirely beneficial for health and that all fats are harmful chemical substances that.' },
                { id: 'b', prompt: 'A student analyzes a food sample and finds it contains carbon, hydrogen, oxygen, and nitrogen in specific amino acid arrangements.', answer: 'Identify the nutrient as protein based on the presence of nitrogen',
                  options: ['Identify the nutrient as protein based on the presence of nitrogen', 'fat-free'],
                  hint: 'Review basic food components and energy changes in food from Class 6 chemistry.',
                  misconception: 'Students often believe that "fat-free" diets are entirely beneficial for health and that all fats are harmful chemical substances that.' }
          ],
            remediations: { 'fat-free-diets-are-entirely': { steps: ['Clarify that lipids (fats) are essential macro-nutrients required for cell membrane integrity, hormone synthesis, and.', 'Explain the chemical difference between harmful trans/saturated fats and beneficial unsaturated fats found in nuts and.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "fat-free" diets are entirely beneficial for health and that all fats are harmful chemical.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Water does not provide any chemical energy or calories, therefore it is not a nutrient and can be largely eliminated from a balanced diet.', answer: 'The claim is completely false',
                  options: ['The claim is completely false', 'fat-free'],
                  hint: 'Review basic food components and energy changes in food from Class 6 chemistry.',
                  misconception: 'Students often believe that "fat-free" diets are entirely beneficial for health and that all fats are harmful chemical substances that.' }
          ],
            remediations: { 'fat-free-diets-are-entirely': { steps: ['Clarify that lipids (fats) are essential macro-nutrients required for cell membrane integrity, hormone synthesis, and.', 'Explain the chemical difference between harmful trans/saturated fats and beneficial unsaturated fats found in nuts and.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_8', difficulty: 'standard',
          question: 'Immunity is the body\'s inbuilt ability to defend itself against disease-causing.',
          hint: 'Review node c8_bio_ch2_4 on infectious diseases caused by bacteria and viruses.',
          misconception: 'Students often confuse \'antigens\' and \'antibodies\', thinking that antibodies are the disease-causing germs and antigens.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Immunity is the body\'s inbuilt ability to defend itself against disease-causing microbes',
                  options: ['Immunity is the body\'s inbuilt ability to defend itself against disease-causing microbes', 'Health is defined as a state of complete physical, mental, and social well-being, and not', 'Personal hygiene refers to individual self-care practices—such as proper handwashing with', 'Mental health refers to a state of emotional, psychological, and social well-being in a'],
                  hint: 'Review node c8_bio_ch2_4 on infectious diseases caused by bacteria and viruses.',
                  misconception: 'Students often confuse \'antigens\' and \'antibodies\', thinking that antibodies are the disease-causing germs and antigens are the body\'s.' }
          ],
            remediations: { 'students-often-confuse-antigens-and': { steps: ['Review the root meanings of the terms: \'Anti-gen\' means antibody generator (the foreign particle), and \'antibody\' means.', 'Draw a simple sketch showing a foreign pathogen with triangular spikes (antigens) and a matching Y-shaped protein.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_9', difficulty: 'standard',
          question: 'Vaccines are biological preparations containing weakened, killed, or fragmented.',
          hint: 'Review c8_bio_ch2_8 to reinforce how the immune system identifies foreign substances and.',
          misconception: 'Students often believe that vaccines contain live, fully virulent disease-causing germs that will give them the.',
          parts: [
                { id: 'a', prompt: 'What is the primary biological component contained in a standard vaccine that triggers an immune response?', answer: 'The primary component is a weakened, killed, or fragmented pathogen (antigen)',
                  options: ['The primary component is a weakened, killed, or fragmented pathogen (antigen)', 'ready-made antibodies'],
                  hint: 'Review c8_bio_ch2_8 to reinforce how the immune system identifies foreign substances and mounts.',
                  misconception: 'Students often believe that vaccines contain live, fully virulent disease-causing germs that will give them the disease, confusing.' }
          ],
            remediations: { 'vaccines-contain-live': { steps: ['Clarify that vaccines undergo rigorous attenuation (weakening) or chemical inactivation where the genetic replication.', 'Explain using an analogy: showing a picture of a tiger (the vaccine) teaches the security guard (the immune system).'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
