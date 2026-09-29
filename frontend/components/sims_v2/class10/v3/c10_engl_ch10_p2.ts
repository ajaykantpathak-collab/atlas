import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch10_p2: SimDef = {
    id: 'v3_c10_engl_ch10_p2',
    title: 'A Triumph of Surgery · Part 2/2',
    subtitle: 'Diagnose a dog whose only disease is too much love',
    classLevel: 10, subject: 'engl', topic: 'A Triumph of Surgery · Part 2/2',
    chapters: ['c10_engl_ch10'],
    nodeIds: ['c10_engl_cbse_10_007', 'c10_engl_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a veterinary surgeon facing a pampered patient', intro: 'A wealthy lady arrives at your clinic in tears: her little dog refuses food, vomits, and can barely waddle. She insists he needs more nourishment. You suspect the opposite.', goal: 'Distinguish real illness from overindulgence, and explain why responsible care sometimes means withholding what a pet loves.' },
    discovery: {
        question: 'Mrs. Pumphrey feeds Tricki malt, cod-liver oil, Horlicks, cream cakes and chocolates because she believes he is weak and suffering. The vet, Mr. Herriot, takes Tricki away and gives him NO medicine at all — yet the dog recovers completely. What actually cured him?',
        options: ['A normal diet, exercise and play with other dogs — the \'illness\' was overfeeding, not disease', 'A secret injection the vet hid from Mrs. Pumphrey', 'Being separated from his owner lowered his stress hormones', 'The surgery hinted at in the story\'s title'],
        answer: 'A normal diet, exercise and play with other dogs — the \'illness\' was overfeeding, not disease',
        hook: 'The \'triumph of surgery\' is ironic — no surgery ever happens. Love expressed as unlimited treats made Tricki ill, and simple discipline cured him.',
    },
    teaching: [
        { title: 'Character Analysis: Mr Herriot as a Wise and Practical Veterinary Surgeon', text: 'From \'A Triumph of Surgery\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play the vet: examine an overweight, listless dog, separate real symptoms from an owner\'s anxious guesses, and design a recovery plan using only food, exercise and company.',
        labels: ['Character Analysis: Mr Herriot', 'Irony and Humour: Mrs'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_007', title: 'Character Analysis: Mr Herriot as a Wise and Practical Veterinary Surgeon',
          caseStudy: { intro: 'Imagine you are a vet called to treat a dog that is "like a bloated sausage" because its wealthy owner feeds it cream cakes and wine. What would you do first?',
            decisions: [{ prompt: 'What is the primary method Mr. Herriot uses to diagnose Tricki\'s condition during his first visit?', options: [
                { text: 'Mr', outcome: 'Mr. Herriot diagnoses Tricki by observing his physical appearance ("bloated sausage," "bloodshot.' },
                { text: 'He uses X-rays or blood tests', outcome: 'Not quite — Students often write: "Mr. Herriot is kind because he loves animals." This is vague and earns.', reveals: 'students-often-write-mr' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_008', title: 'Irony and Humour: Mrs Pumphrey\'s Misconception of the Treatment',
          caseStudy: { intro: 'Imagine you are watching a friend panic over a "sick" plant, buying expensive fertilizers and special lights, while you know the plant just needs less water.',
            decisions: [{ prompt: 'Define situational irony and give one example from "A Triumph of Surgery" where Mrs Pumphrey\'s expectation of Tricki\'s treatment contrasts.', options: [
                { text: 'Situational irony occurs when the outcome of a situation is the opposite of what is', outcome: 'Situational irony occurs when the outcome of a situation is the opposite of what is expected.' },
                { text: 'sarcasm', outcome: 'Not quite — Students often confuse *verbal irony* (saying the opposite of what you mean) with *situational.', reveals: 'students-often-confuse-verbal-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family adores their dog so much that they feed him sweets, fried snacks and extra helpings all day. He grows fat, listless and refuses walks. An aunt insists, \'He just needs more treats — food is how we show love.\'',
            decisions: [{ prompt: 'What does \'A Triumph of Surgery\' say is really going on?', options: [
                { text: 'The dog is being loved to death — exactly like Tricki, whose real illness was Mrs. Pumphrey\'s indulgence, not any disease. What cured Tricki was not medicine but a stern cut in food and normal exercise; the \'treatment\' the family needs is to stop mistaking feeding for caring.', outcome: 'The story\'s irony is that the cure was discipline, not surgery — the vet\'s job was managing the owner\'s love, and this family needs the same prescription.' },
                { text: 'The aunt is right — a well-fed, fat pet is a healthy and happy one, so more treats will fix the listlessness.', outcome: 'Overfeeding caused the listlessness; Tricki\'s bloated misery lifted only when the extras stopped and he had to run with other dogs.', reveals: 'overfeeding-is-love' },
                { text: 'The dog needs immediate surgery or strong medicine, since only medical intervention can fix a pet this sick.', outcome: 'The story\'s title is ironic — no surgery happened; rest, diet and play cured Tricki, and this dog most likely needs the same ordinary discipline.', reveals: 'illness-always-needs-medicine' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_10_008', title: 'You made it',
          caseStudy: { intro: 'Pampering can be a slow-acting poison. Tricki didn\'t need medicine — he needed someone brave enough to say \'no more cream cakes.\'',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_007', difficulty: 'standard',
          question: 'From \'A Triumph of Surgery\': the skill or concept this node teaches, applied.',
          hint: 'Review PEEL structure from c9_engl_ch1_2 and re-read the first three pages of the story.',
          misconception: 'Students often write: "Mr. Herriot is kind because he loves animals." This is vague and earns partial marks.',
          parts: [
                { id: 'a', prompt: 'Compare Mr. Herriot\'s approach to Tricki\'s treatment with a vet who might prescribe medicines and supplements.', answer: 'Herriot uses only a strict diet and exercise',
                  options: ['Herriot uses only a strict diet and exercise', 'He didn\'t have medicines'],
                  hint: 'Review PEEL structure from c9_engl_ch1_2 and re-read the first three pages of the story focusing.',
                  misconception: 'Students often write: "Mr. Herriot is kind because he loves animals." This is vague and earns partial marks. The board exam expects: "Mr.' }
          ],
            remediations: { 'students-often-write-mr': { steps: ['If a student writes generic traits, do this: 1) Have them re-read the first two pages and highlight every *action*.', '2) For each action, ask: "What professional quality does this show?" 3) Force them to write one PEEL paragraph per.', '4) Check that each "Evidence" is a specific textual detail, not a plot summary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write: "Mr. Herriot is kind because he loves animals." This is vague and earns partial marks.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Mr. Herriot\'s decision to keep Tricki for a fortnight without updating Mrs. Pumphrey daily was professionally justified.', answer: 'Yes, justified',
                  options: ['Yes, justified', 'It was wrong because she was worried'],
                  hint: 'Review PEEL structure from c9_engl_ch1_2 and re-read the first three pages of the story focusing.',
                  misconception: 'Students often write: "Mr. Herriot is kind because he loves animals." This is vague and earns partial marks. The board exam expects: "Mr.' }
          ],
            remediations: { 'students-often-write-mr': { steps: ['If a student writes generic traits, do this: 1) Have them re-read the first two pages and highlight every *action*.', '2) For each action, ask: "What professional quality does this show?" 3) Force them to write one PEEL paragraph per.', '4) Check that each "Evidence" is a specific textual detail, not a plot summary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_10_008', difficulty: 'standard',
          question: 'From \'A Triumph of Surgery\': the skill or concept this node teaches, applied.',
          hint: 'Review c10_engl_cbse_10_004 (Mrs Pumphrey\'s Extravagance) to recall the exact textual.',
          misconception: 'Students often confuse *verbal irony* (saying the opposite of what you mean) with *situational irony* (outcome opposite.',
          parts: [
                { id: 'a', prompt: 'Compare the humour in Mrs Pumphrey\'s misconception with the humour in the Class 6 story "Animals, Birds, and Dr. Dolittle" (where Dr.', answer: 'In "A Triumph of Surgery," humour comes from situational irony',
                  options: ['In "A Triumph of Surgery," humour comes from situational irony', 'both are funny because animals act like humans'],
                  hint: 'Review c10_engl_cbse_10_004 (Mrs Pumphrey\'s Extravagance) to recall the exact textual details.',
                  misconception: 'Students often confuse *verbal irony* (saying the opposite of what you mean) with *situational irony* (outcome opposite to expectation).' }
          ],
            remediations: { 'students-often-confuse-verbal-irony': { steps: ['If a student makes the above error: 1.', 'Ask them to reread the definition of situational irony vs.', 'Have them complete a two-column table: Column A = "What Mrs Pumphrey EXPECTS the wine/eggs to do" (cure, strengthen).', 'Ask: "Is Mrs Pumphrey joking?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
