import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch10_p1: SimDef = {
    id: 'v3_c10_engl_ch10_p1',
    title: 'A Triumph of Surgery · Part 1/2',
    subtitle: 'Diagnose a dog whose only disease is too much love',
    classLevel: 10, subject: 'engl', topic: 'A Triumph of Surgery · Part 1/2',
    chapters: ['c10_engl_ch10'],
    nodeIds: ['c10_engl_cbse_10_001', 'c10_engl_cbse_10_002', 'c10_engl_cbse_10_003', 'c10_engl_cbse_10_004', 'c10_engl_cbse_10_005', 'c10_engl_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a veterinary surgeon facing a pampered patient', intro: 'A wealthy lady arrives at your clinic in tears: her little dog refuses food, vomits, and can barely waddle. She insists he needs more nourishment. You suspect the opposite.', goal: 'Distinguish real illness from overindulgence, and explain why responsible care sometimes means withholding what a pet loves.' },
    discovery: {
        question: 'Mrs. Pumphrey feeds Tricki malt, cod-liver oil, Horlicks, cream cakes and chocolates because she believes he is weak and suffering. The vet, Mr. Herriot, takes Tricki away and gives him NO medicine at all — yet the dog recovers completely. What actually cured him?',
        options: ['A normal diet, exercise and play with other dogs — the \'illness\' was overfeeding, not disease', 'A secret injection the vet hid from Mrs. Pumphrey', 'Being separated from his owner lowered his stress hormones', 'The surgery hinted at in the story\'s title'],
        answer: 'A normal diet, exercise and play with other dogs — the \'illness\' was overfeeding, not disease',
        hook: 'The \'triumph of surgery\' is ironic — no surgery ever happens. Love expressed as unlimited treats made Tricki ill, and simple discipline cured him.',
    },
    teaching: [
        { title: 'Tricki the Dog: Overfeeding and Mrs Pumphrey\'s Pampering', text: 'This topic introduces the opening segment of "A Triumph of Surgery" where the narrator, veterinary surgeon Mr. Herriot, encounters Tricki — a small dog made morbidly obese by his wealthy owner Mrs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play the vet: examine an overweight, listless dog, separate real symptoms from an owner\'s anxious guesses, and design a recovery plan using only food, exercise and company.',
        labels: ['Tricki the Dog: Overfeeding', 'Mr Herriot\'s Diagnosis: Tricki\'s', 'The Hospital Stay: Tricki\'s', 'Mrs Pumphrey\'s Extravagance: Eggs,', 'Tricki\'s Recovery: From', 'Theme: Responsible Pet Ownership'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_001', title: 'Tricki the Dog: Overfeeding and Mrs Pumphrey\'s Pampering',
          caseStudy: { intro: 'Imagine you see a neighbour carrying a chubby pug in a designer bag, feeding it bite of samosa and sips of cold coffee, saying, "He just loves human food, poor.',
            decisions: [{ prompt: 'What is the first physical detail the narrator notices about Tricki when Mrs. Pumphrey brings him to the surgery?', options: [
                { text: 'The narrator describes Tricki as a "bloated sausage" with "bloodshot and rheumy eyes" and', outcome: 'The narrator describes Tricki as a "bloated sausage" with "bloodshot and rheumy eyes" and a tongue.' },
                { text: 'Tricki was barking loudly', outcome: 'Not quite — Students often think Mrs. Pumphrey is a villain who deliberately harms Tricki.', reveals: 'mrs' },
                { text: 'Tricki looked healthy', outcome: 'Not quite — Students often think Mrs. Pumphrey is a villain who deliberately harms Tricki.', reveals: 'mrs' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_002', title: 'Mr Herriot\'s Diagnosis: Tricki\'s Greed and Lack of Exercise',
          caseStudy: { intro: 'Imagine you take your overweight pet to a vet who says, "No medicine needed — just stop the treats and start walking." That\'s exactly what Mr. Herriot does.',
            decisions: [{ prompt: 'What two specific factors does Mr. Herriot identify as the cause of Tricki\'s condition?', options: [
                { text: 'Mr', outcome: 'Mr. Herriot identifies Tricki\'s greed for food and lack of exercise as the causes.' },
                { text: 'malnutrition', outcome: 'Not quite — Students often think Mr. Herriot diagnoses a specific disease (like "tricki-itis") and that the.', reveals: 'mr' },
                { text: 'a virus', outcome: 'Not quite — Students often think Mr. Herriot diagnoses a specific disease (like "tricki-itis") and that the.', reveals: 'mr' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_003', title: 'The Hospital Stay: Tricki\'s Transformation Through Diet and Activity',
          caseStudy: { intro: 'Imagine you are a vet watching a dangerously overweight dog arrive at your clinic. The owner has spoiled it with cream cakes and wine.',
            decisions: [{ prompt: 'What are the two main components of Mr Herriot\'s treatment plan for Tricki during his hospital stay?', options: [
                { text: 'The two main components are a strict controlled diet (starting with only water, then', outcome: 'The two main components are a strict controlled diet (starting with only water, then small meals).' },
                { text: 'medicine', outcome: 'Not quite — Students believe Herriot\'s "triumph of surgery" refers to a medical operation or special medicine.', reveals: 'herriot-s-triumph-of-surgery' },
                { text: 'injections', outcome: 'Not quite — Students believe Herriot\'s "triumph of surgery" refers to a medical operation or special medicine.', reveals: 'herriot-s-triumph-of-surgery' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_004', title: 'Mrs Pumphrey\'s Extravagance: Eggs, Wine and Brandy for Tricki',
          caseStudy: { intro: 'Imagine a relative who sends elaborate care packages — home-cooked meals, expensive supplements, daily video calls — when you have a minor flu, while the.',
            decisions: [{ prompt: 'What specific food and drink items does Mrs. Pumphrey send for Tricki while he is at the surgery, and how frequently do they arrive?', options: [
                { text: 'Mrs', outcome: 'Mrs. Pumphrey sends two dozen eggs at a time, followed by bottles of wine, and later brandy.' },
                { text: 'she sends dog food', outcome: 'Not quite — Students treat Mrs. Pumphrey\'s extravagance as mere comic relief or a display of wealth, writing.', reveals: 'students-treat-mrs' },
                { text: 'she visits daily', outcome: 'Not quite — Students treat Mrs. Pumphrey\'s extravagance as mere comic relief or a display of wealth, writing.', reveals: 'students-treat-mrs' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_005', title: 'Tricki\'s Recovery: From a \'Bloated Sausage\' to a Healthy Dog',
          caseStudy: { intro: 'Imagine you see a neighbour\'s dog that is so overweight it can barely walk — what would you do?',
            decisions: [{ prompt: 'What were the only two things Mr. Herriot gave Tricki during the first two days of his stay at the surgery?', options: [
                { text: 'Correct answer: Water and a warm bed', outcome: 'Correct answer: Water and a warm bed. A wrong answer (e.g., "medicine," "special diet," "eggs and.' },
                { text: 'medicine', outcome: 'Not quite — Students often believe Tricki recovered because Mr. Herriot gave him "special medicine".', reveals: 'tricki-recovered-because-mr' },
                { text: 'special diet', outcome: 'Not quite — Students often believe Tricki recovered because Mr. Herriot gave him "special medicine".', reveals: 'tricki-recovered-because-mr' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_006', title: 'Theme: Responsible Pet Ownership and the Danger of Overindulgence',
          caseStudy: { intro: 'Imagine you see a neighbor feeding their tiny Pomeranian fried chicken, ice cream, and cake daily because "he looks so happy!" — but the dog can barely walk.',
            decisions: [{ prompt: 'What is the central theme of *A Triumph of Surgery* regarding pet ownership, stated in one precise sentence using the term "overindulgence"?', options: [
                { text: 'The central theme is that overindulgence', outcome: 'The central theme is that overindulgence — excessive pampering through rich food and lack.' },
                { text: 'The story is about a dog getting fat and a vet curing him', outcome: 'Not quite — Students often think the theme is simply "don\'t overfeed your pet" — a surface-level moral.', reveals: 'the-theme-is-simply-don' },
                { text: 'don\'t overfeed your pet', outcome: 'Not quite — Students often think the theme is simply "don\'t overfeed your pet" — a surface-level moral.', reveals: 'the-theme-is-simply-don' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family adores their dog so much that they feed him sweets, fried snacks and extra helpings all day. He grows fat, listless and refuses walks. An aunt insists, \'He just needs more treats — food is how we show love.\'',
            decisions: [{ prompt: 'What does \'A Triumph of Surgery\' say is really going on?', options: [
                { text: 'The dog is being loved to death — exactly like Tricki, whose real illness was Mrs. Pumphrey\'s indulgence, not any disease. What cured Tricki was not medicine but a stern cut in food and normal exercise; the \'treatment\' the family needs is to stop mistaking feeding for caring.', outcome: 'The story\'s irony is that the cure was discipline, not surgery — the vet\'s job was managing the owner\'s love, and this family needs the same prescription.' },
                { text: 'The aunt is right — a well-fed, fat pet is a healthy and happy one, so more treats will fix the listlessness.', outcome: 'Overfeeding caused the listlessness; Tricki\'s bloated misery lifted only when the extras stopped and he had to run with other dogs.', reveals: 'overfeeding-is-love' },
                { text: 'The dog needs immediate surgery or strong medicine, since only medical intervention can fix a pet this sick.', outcome: 'The story\'s title is ironic — no surgery happened; rest, diet and play cured Tricki, and this dog most likely needs the same ordinary discipline.', reveals: 'illness-always-needs-medicine' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Pampering can be a slow-acting poison. Tricki didn\'t need medicine — he needed someone brave enough to say \'no more cream cakes.\'',
            decisions: [{ prompt: 'What comes next? A Triumph of Surgery · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Triumph of Surgery · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_001', difficulty: 'standard',
          question: 'This topic introduces the opening segment of "A Triumph of Surgery" where the.',
          hint: 'If stuck, review "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2).',
          misconception: 'Students often think Mrs. Pumphrey is a villain who deliberately harms Tricki.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic introduces the opening segment of "A Triumph of Surgery" where the narrator,',
                  options: ['This topic introduces the opening segment of "A Triumph of Surgery" where the narrator,', 'This topic covers the middle section of "A Triumph of Surgery" where Tricki undergoes a', 'This topic examines how James Herriot uses Mrs', 'Tricki\'s recovery refers to the physical and behavioral transformation of the overfed,'],
                  hint: 'If stuck, review "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2) — practice the.',
                  misconception: 'Students often think Mrs. Pumphrey is a villain who deliberately harms Tricki.' }
          ],
            remediations: { 'mrs': { steps: ['Re-read the first two pages aloud, highlighting every adjective describing Tricki (bloated, rheumy, listless) and every.', 'Make a two-column table: Column A = "What Mrs.', 'Pumphrey SAYS/THINKS" (e.g., "he needs building up"), Column B = "What Herriot SEES" (e.g., "bloated sausage").', 'Discuss: *If a parent force-fed a child cake thinking it\'s medicine, would you call the parent cruel?* This bridges.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Mrs. Pumphrey is a villain who deliberately harms Tricki.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Mrs. Pumphrey\'s actions constitute animal cruelty. Support your judgment with two pieces of evidence from the text.', answer: 'No, it is misguided affection, not cruelty',
                  options: ['No, it is misguided affection, not cruelty', 'yes, it\'s cruelty'],
                  hint: 'If stuck, review "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2) — practice the.',
                  misconception: 'Students often think Mrs. Pumphrey is a villain who deliberately harms Tricki.' }
          ],
            remediations: { 'mrs': { steps: ['Re-read the first two pages aloud, highlighting every adjective describing Tricki (bloated, rheumy, listless) and every.', 'Make a two-column table: Column A = "What Mrs.', 'Pumphrey SAYS/THINKS" (e.g., "he needs building up"), Column B = "What Herriot SEES" (e.g., "bloated sausage").', 'Discuss: *If a parent force-fed a child cake thinking it\'s medicine, would you call the parent cruel?* This bridges.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_003', difficulty: 'standard',
          question: 'This topic covers the middle section of "A Triumph of Surgery" where Tricki.',
          hint: 'If stuck, review c9_engl_ch1_2 (character analysis: tracking changes) and.',
          misconception: 'Students believe Herriot\'s "triumph of surgery" refers to a medical operation or special medicine.',
          parts: [
                { id: 'a', prompt: 'On the third day, Tricki licks the empty supper bowls of the other dogs.', answer: 'Herriot allows it',
                  options: ['Herriot allows it', 'Herriot was careless', 'Tricki was stealing', 'triumph of surgery'],
                  hint: 'If stuck, review c9_engl_ch1_2 (character analysis: tracking changes) and c10_engl_cbse_10_001.',
                  misconception: 'Students believe Herriot\'s "triumph of surgery" refers to a medical operation or special medicine.' }
          ],
            remediations: { 'herriot-s-triumph-of-surgery': { steps: ['Ask the student to find the exact sentence where Herriot says "I did not give him any medicine."', 'Have them list every medical word in the chapter (medicine, injection, operation, pill, tonic) and mark which are.', 'Rewrite the title as "A Triumph of Discipline" and ask: what changed?', 'Assign a 50-word answer: "Explain why the title \'A Triumph of Surgery\' is ironic." This forces confrontation with the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_004', difficulty: 'standard',
          question: 'This topic examines how James Herriot uses Mrs. Pumphrey\'s excessive provisions.',
          hint: 'If stuck, re-read c10_engl_cbse_10_003 (Hospital Stay) and list the exact daily routine.',
          misconception: 'Students treat Mrs. Pumphrey\'s extravagance as mere comic relief or a display of wealth, writing answers like "She was.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Mr. Herriot and his partners consume the eggs, wine, and brandy meant for Tricki.', answer: 'Tricki is on a strict water-only diet for the first two days, then minimal food',
                  options: ['Tricki is on a strict water-only diet for the first two days, then minimal food', 'Herriot steals them', 'Tricki eats them secretly', 'hospital'],
                  hint: 'If stuck, re-read c10_engl_cbse_10_003 (Hospital Stay) and list the exact daily routine Herriot.',
                  misconception: 'Students treat Mrs. Pumphrey\'s extravagance as mere comic relief or a display of wealth, writing answers like "She was rich so she sent.' },
                { id: 'b', prompt: 'Read this hypothetical board exam question: "Quote two phrases from the text that show Mrs.', answer: 'Point: Mrs',
                  options: ['Point: Mrs', 'extravagance', 'villainy'],
                  hint: 'If stuck, re-read c10_engl_cbse_10_003 (Hospital Stay) and list the exact daily routine Herriot.',
                  misconception: 'Students treat Mrs. Pumphrey\'s extravagance as mere comic relief or a display of wealth, writing answers like "She was rich so she sent.' },
                { id: 'c', prompt: 'Compare Mrs. Pumphrey\'s approach to Tricki\'s "recovery" with Mr. Herriot\'s approach.', answer: '| Aspect | Mrs',
                  options: ['| Aspect | Mrs', 'He needs building up', 'He needs discipline', 'hard, muscular, energetic'],
                  hint: 'If stuck, re-read c10_engl_cbse_10_003 (Hospital Stay) and list the exact daily routine Herriot.',
                  misconception: 'Students treat Mrs. Pumphrey\'s extravagance as mere comic relief or a display of wealth, writing answers like "She was rich so she sent.' }
          ],
            remediations: { 'students-treat-mrs': { steps: ['Have the student re-read only the "hospital stay" paragraphs with a highlighter, marking every item sent and every.', 'Ask: "If Tricki ate all this, what would happen?" (Answer: relapse).', 'Ask: "So why does Herriot accept the deliveries?" (Answer: to humour her / avoid conflict / waste not).', 'Co-write a PEEL paragraph where the Point is "Extravagance creates irony," Evidence is the wine/brandies, Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_005', difficulty: 'standard',
          question: 'Tricki\'s recovery refers to the physical and behavioral transformation of the.',
          hint: 'If stuck, review c10_engl_cbse_10_003 (hospital stay routine) and practise listing the.',
          misconception: 'Students often believe Tricki recovered because Mr. Herriot gave him "special medicine" or "nutritious food sent.',
          parts: [
                { id: 'a', prompt: 'What were the only two things Mr. Herriot gave Tricki during the first two days of his stay at the surgery?', answer: 'Correct answer: Water and a warm bed',
                  options: ['Correct answer: Water and a warm bed', 'medicine', 'special diet', 'eggs and wine'],
                  hint: 'If stuck, review c10_engl_cbse_10_003 (hospital stay routine) and practise listing the verbs that.',
                  misconception: 'Students often believe Tricki recovered because Mr. Herriot gave him "special medicine" or "nutritious food sent by Mrs.' },
                { id: 'b', prompt: 'Explain in your own words why Tricki did not eat for the first two days and how this was part of the cure.', answer: 'Correct answer: Tricki refused food',
                  options: ['Correct answer: Tricki refused food', 'he was sad', 'Tricki recovered'],
                  hint: 'If stuck, review c10_engl_cbse_10_003 (hospital stay routine) and practise listing the verbs that.',
                  misconception: 'Students often believe Tricki recovered because Mr. Herriot gave him "special medicine" or "nutritious food sent by Mrs.' },
                { id: 'c', prompt: 'The text says Tricki "joined the gang" and was "jostled," "rolled over," and "hunted rats." Using these details, write a 40-word answer explaining how the.', answer: 'Correct answer: The pack forced Tricki into physical activity',
                  options: ['Correct answer: The pack forced Tricki into physical activity', 'he played with them', 'Tricki recovered'],
                  hint: 'If stuck, review c10_engl_cbse_10_003 (hospital stay routine) and practise listing the verbs that.',
                  misconception: 'Students often believe Tricki recovered because Mr. Herriot gave him "special medicine" or "nutritious food sent by Mrs.' }
          ],
            remediations: { 'tricki-recovered-because-mr': { steps: ['Re-read the surgery paragraphs and highlight every verb describing what Herriot *did* (e.g., "kept him on water," "did.', 'Make a two-column table: "Mrs.', '"Herriot\'s Care" — fill with textual evidence.', 'Write one sentence explaining why *doing less* (no medicine, no rich food) was the effective treatment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_006', difficulty: 'standard',
          question: 'The theme of "Responsible Pet Ownership and the Danger of Overindulgence" in *A.',
          hint: 'If stuck, review c10_engl_cbse_10_003 (hospital routine) and c10_engl_cbse_10_005.',
          misconception: 'Students often think the theme is simply "don\'t overfeed your pet" — a surface-level moral.',
          parts: [
                { id: 'a', prompt: 'What is the central theme of *A Triumph of Surgery* regarding pet ownership, stated in one precise sentence using the term "overindulgence"?', answer: 'The central theme is that overindulgence',
                  options: ['The central theme is that overindulgence', 'The story is about a dog getting fat and a vet curing him', 'don\'t overfeed your pet', 'the theme is simply "don\'t overfeed your pet"'],
                  hint: 'If stuck, review c10_engl_cbse_10_003 (hospital routine) and c10_engl_cbse_10_005 (recovery.',
                  misconception: 'Students often think the theme is simply "don\'t overfeed your pet" — a surface-level moral.' },
                { id: 'b', prompt: 'Analyse how the contrast between Tricki\'s condition at the start ("bloated sausage," "bloodshot eyes") and at the end ("lithe," "hard-muscled," "fighting like.', answer: 'The dramatic physical reversal',
                  options: ['The dramatic physical reversal', 'don\'t overfeed your pet', 'the theme is simply "don\'t overfeed your pet"'],
                  hint: 'If stuck, review c10_engl_cbse_10_003 (hospital routine) and c10_engl_cbse_10_005 (recovery.',
                  misconception: 'Students often think the theme is simply "don\'t overfeed your pet" — a surface-level moral.' }
          ],
            remediations: { 'the-theme-is-simply-don': { steps: ['If a student reduces the theme to "overfeeding is bad," do this: 1) Ask: "Why does Mrs Pumphrey overfeed?', 'Quote her words." (She says "He loves it," "He\'s so weak," "He needs building up.") 2) Highlight: Her *intent* is care.', '3) Contrast: Mr Herriot gives *nothing* extra — no medicine, no special food — just normalcy.', '4) Have them rewrite the theme statement using "misguided affection" and "biological needs vs emotional projection." 5).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
