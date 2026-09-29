import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch02_p1: SimDef = {
    id: 'v3_c7_engl_ch02_p1',
    title: 'Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 1/3',
    subtitle: 'Covers Dr. Dolittle\'s character traits, motivations, and his unique relationship with.',
    classLevel: 7, subject: 'engl', topic: 'Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 1/3',
    chapters: ['c7_engl_ch02'],
    nodeIds: ['c7_engl_ch02_001', 'c7_engl_ch02_002', 'c7_engl_ch02_003', 'c7_engl_ch02_004', 'c7_engl_ch02_005', 'c7_engl_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you have a pet at home who gets sick, and you wish you could talk directly to it to find out where.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A respected human doctor loses every patient because his house overflows with ducks, pigs, and owls — and he chooses the animals anyway. Is he just eccentric, or is something deeper going on?',
        options: ['His radical empathy is a moral choice — he values the wellbeing of animals above wealth, reputation, and polite society', 'He is simply bad at business and cannot help it', 'He lost his medical license for incompetence', 'He is collecting animals to sell them later'],
        answer: 'His radical empathy is a moral choice — he values the wellbeing of animals above wealth, reputation, and polite society',
        hook: 'Dr Dolittle is not merely a funny pet collector. Losing income, patients, and social standing are sacrifices — and when his parrot teaches him that animals have their own language, pets become voices worth listening to, not objects.',
    },
    teaching: [
        { title: 'Character Analysis: Dr. Dolittle and His Love for Animals', text: 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the case for Dr Dolittle — gather three sacrifices he makes for animals and one moment an animal teaches him, then argue whether leaving human medicine was wisdom or folly.',
        labels: ['Character Analysis: Dr. Dolittle', 'Character Analysis: Polynesia', 'Plot: Dr. Dolittle\'s Transition', 'Theme: Communication Between Humans', 'Humour in the Story', 'The Idea That Animals'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch02_003', title: 'Plot: Dr. Dolittle\'s Transition to Animal Doctor',
          caseStudy: { intro: 'Imagine you are running a popular snack shop, but suddenly you decide to stop selling snacks and instead open a free hospital for stray puppies, kittens, and.',
            decisions: [{ prompt: 'What was Dr. Dolittle\'s original profession before he became famous for treating animals?', options: [
                { text: 'Dr', outcome: 'Dr. Dolittle was originally a respected doctor who treated human patients in the quiet town.' },
                { text: 'that Dr', outcome: 'Not quite — Students often believe that Dr. Dolittle woke up one day and immediately decided to stop treating.', reveals: 'dr' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_005', title: 'Humour in the Story: The Cat\'s-food-Man and Conversations',
          caseStudy: { intro: 'Have you ever laughed when someone had a completely serious conversation about something completely silly, like arguing with a pet about what\'s for dinner?',
            decisions: [{ prompt: 'What is the primary source of humour when the Cat\'s-food-Man interacts with Dr. Dolittle in the story?', options: [
                { text: 'the contrast between the ordinary, mundane business of selling cat\'s food and the', outcome: 'The correct answer is the contrast between the ordinary, mundane business of selling cat\'s food and.' },
                { text: 'humour', outcome: 'Not quite — Students often think that "humour" in a story only means someone slipping on a banana peel.', reveals: 'humour-in-a-story-only' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_006', title: 'The Idea That Animals Have Their Own Language',
          caseStudy: { intro: 'Have you ever watched your pet dog or cat make completely different sounds when a stranger knocks at the door versus when you open a packet of biscuits?',
            decisions: [{ prompt: 'In the context of Dr. Dolittle\'s world, how does Polynesia the parrot first explain animal speech to the Doctor?', options: [
                { text: 'B', outcome: 'The correct answer is B. Polynesia explains that animals have multiple distinct languages, such.' },
                { text: 'animal noises', outcome: 'Not quite — Students often confuse "animal noises" (like barking, meowing, or chirping) with the literary.', reveals: 'students-often-confuse-animal-noises' },
                { text: 'animal language', outcome: 'Not quite — Students often confuse "animal noises" (like barking, meowing, or chirping) with the literary.', reveals: 'students-often-confuse-animal-noises' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family friend gives up a high-paying city clinic to run a free shelter for injured street animals. Relatives call it a waste of a medical degree — \'he had everything, and he chose dogs.\'',
            decisions: [{ prompt: 'How would Dr. Dolittle\'s story judge the friend\'s choice?', options: [
                { text: 'As success, not failure — Dolittle was called foolish for the same reason: he preferred animals and meaningful work over wealthy patients and status, and the story shows his devotion made him better at healing, not worse. The friend\'s choice mirrors that — the townspeople\'s verdict measures money, but the chapter measures purpose.', outcome: 'The chapter quietly redefines success: Dolittle\'s \'failure\' by society\'s ledger was a life aligned with what he loved, which is exactly what the friend has chosen.' },
                { text: 'The relatives are right — success is income and status, and the friend traded both away.', outcome: 'That is the townspeople\'s measure in the story — and the story\'s whole point is that it misjudges Dolittle, whose real achievement was a life of purpose.', reveals: 'success-equals-wealth' },
                { text: 'It is admirable but doomed — anyone choosing animals over human patients must fail in the end.', outcome: 'Dolittle\'s life contradicts that — his choice made him uniquely effective and fulfilled; the story predicts flourishing, not failure.', reveals: 'purpose-always-fails' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Real character hides in what a person gives up. Dolittle traded status for compassion — and found his true calling in the bargain.',
            decisions: [{ prompt: 'What comes next? Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch02_001', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches.',
          hint: 'Review c6_english_u2_012 to refresh basic vocabulary and simple character descriptions.',
          misconception: 'Students often assume Dr. Dolittle is merely a eccentric pet lover who is silly or incompetent, failing to recognize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to', 'Polynesia the parrot acts as a wise mentor, translator, and moral compass for Dr', 'The narrative arc that traces Dr', 'The theme of communication between humans and animals explores how empathy, patience, and'],
                  hint: 'Review c6_english_u2_012 to refresh basic vocabulary and simple character descriptions before.',
                  misconception: 'Students often assume Dr. Dolittle is merely a eccentric pet lover who is silly or incompetent, failing to recognize that his deep empathy.' }
          ],
            remediations: { 'dr': { steps: ['If a student struggles to see beyond the humor, guide them by asking: "Why does he prefer animals over humans?" Have.', 'Point out that these sacrifices show deep moral conviction, not just silliness.', 'Re-read sections where he listens patiently to animals to highlight his genuine respect for them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_002', difficulty: 'standard',
          question: 'Polynesia the parrot acts as a wise mentor, translator, and moral compass for.',
          hint: 'Review the basic definition of a mentor and look back at Polynesia\'s first conversation.',
          misconception: 'Students often view Polynesia as merely a comic relief character who talks funny, completely missing her critical.',
          parts: [
                { id: 'a', prompt: 'How does Polynesia demonstrate leadership and wisdom when the Doctor is struggling financially?', answer: 'Steps to solve: (1) Identify the moment when human patients leave the clinic',
                  options: ['Steps to solve: (1) Identify the moment when human patients leave the clinic', 'Polynesia merely repeats words without understanding the situation'],
                  hint: 'Review the basic definition of a mentor and look back at Polynesia\'s first conversation with Dr.',
                  misconception: 'Students often view Polynesia as merely a comic relief character who talks funny, completely missing her critical function as a literary.' }
          ],
            remediations: { 'students-often-view-polynesia-as': { steps: ['If a student struggles to see Polynesia as a guide, stop and ask them to read her dialogue aloud.', 'Point out that she gives direct commands to the Doctor, tells him what to do with his life, and translates foreign.', 'Explain that in literature, a mentor is any character who guides the protagonist toward their true destiny, exactly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_003', difficulty: 'standard',
          question: 'The narrative arc that traces Dr. John Dolittle\'s deliberate transformation.',
          hint: 'Review the sequence of events in Class 6 regarding Dr. Dolittle\'s pets and his human.',
          misconception: 'Students often believe that Dr. Dolittle woke up one day and immediately decided to stop treating humans because.',
          parts: [
                { id: 'a', prompt: 'Why did Dr. Dolittle\'s human patients eventually stop visiting him at his clinic?', answer: 'His human patients stopped coming',
                  options: ['His human patients stopped coming', 'that Dr'],
                  hint: 'Review the sequence of events in Class 6 regarding Dr. Dolittle\'s pets and his human patients.',
                  misconception: 'Students often believe that Dr. Dolittle woke up one day and immediately decided to stop treating humans because he simply got bored.' },
                { id: 'b', prompt: 'How does the introduction of Polynesia the parrot function as a turning point in the plot of Dr. Dolittle\'s career transition?', answer: 'Polynesia does not just provide companionship',
                  options: ['Polynesia does not just provide companionship', 'that Dr'],
                  hint: 'Review the sequence of events in Class 6 regarding Dr. Dolittle\'s pets and his human patients.',
                  misconception: 'Students often believe that Dr. Dolittle woke up one day and immediately decided to stop treating humans because he simply got bored.' }
          ],
            remediations: { 'dr': { steps: ['To fix this, guide the student to trace the timeline of events in the story like a staircase.', 'Ask: "What happened first when people saw his pets?', 'How did his income change?', 'Who spoke to him about a different path?" Have them list three distinct stages: his life with humans, the tipping point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Dr. Dolittle woke up one day and immediately decided to stop treating humans because.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Dr. Dolittle\'s financial struggles as an animal doctor were a necessary plot device for his character\'s development. Defend your answer.', answer: 'Yes, his financial struggles were necessary',
                  options: ['Yes, his financial struggles were necessary', 'that Dr'],
                  hint: 'Review the sequence of events in Class 6 regarding Dr. Dolittle\'s pets and his human patients.',
                  misconception: 'Students often believe that Dr. Dolittle woke up one day and immediately decided to stop treating humans because he simply got bored.' }
          ],
            remediations: { 'dr': { steps: ['To fix this, guide the student to trace the timeline of events in the story like a staircase.', 'Ask: "What happened first when people saw his pets?', 'How did his income change?', 'Who spoke to him about a different path?" Have them list three distinct stages: his life with humans, the tipping point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_004', difficulty: 'standard',
          question: 'The theme of communication between humans and animals explores how empathy.',
          hint: 'Review the scenes where Polynesia explains bird-talk to Dr. Dolittle to see how language.',
          misconception: 'Students often assume that animal communication in the story is magical or that animals simply speak English in secret.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of communication between humans and animals explores how empathy, patience, and',
                  options: ['The theme of communication between humans and animals explores how empathy, patience, and', 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to', 'Polynesia the parrot acts as a wise mentor, translator, and moral compass for Dr', 'The narrative arc that traces Dr'],
                  hint: 'Review the scenes where Polynesia explains bird-talk to Dr. Dolittle to see how language.',
                  misconception: 'Students often assume that animal communication in the story is magical or that animals simply speak English in secret, missing the.' }
          ],
            remediations: { 'animal-communication-in-the-story': { steps: ['Remind the student that Dr.', 'Dolittle did not wake up knowing how to speak to animals overnight.', 'Ask them to look back at how Polynesia taught him the alphabet of bird-talk step by step.', 'Emphasize that learning an animal language required the same discipline as learning French or Sanskrit in school.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_005', difficulty: 'standard',
          question: 'Humour in literature arises from absurd situations, eccentric characters like.',
          hint: 'Review Class 6 dialogue analysis and identify where characters say one thing while the.',
          misconception: 'Students often think that "humour" in a story only means someone slipping on a banana peel or telling a direct joke.',
          parts: [
                { id: 'a', prompt: 'Why does a conversation between a human and an animal (or about animals) often create humour in Dr. Dolittle stories? Explain in one sentence.', answer: 'that it reverses normal human expectations by having animals display very human,',
                  options: ['that it reverses normal human expectations by having animals display very human,', 'humour'],
                  hint: 'Review Class 6 dialogue analysis and identify where characters say one thing while the situation.',
                  misconception: 'Students often think that "humour" in a story only means someone slipping on a banana peel or telling a direct joke.' }
          ],
            remediations: { 'humour-in-a-story-only': { steps: ['If a student fails to spot the humour, guide them by asking: "Is the character panicking or acting completely calm.', 'Point out that the comedy lives in the gap between how normal people act and how these eccentric characters behave.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_006', difficulty: 'standard',
          question: 'The literary concept that non-human animals possess their own structured.',
          hint: 'Review the basic plot points where Dr. Dolittle interacts with his pets in Chapter 2.',
          misconception: 'Students often confuse "animal noises" (like barking, meowing, or chirping) with the literary concept of "animal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The literary concept that non-human animals possess their own structured systems of',
                  options: ['The literary concept that non-human animals possess their own structured systems of', 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to', 'Polynesia the parrot acts as a wise mentor, translator, and moral compass for Dr', 'The narrative arc that traces Dr'],
                  hint: 'Review the basic plot points where Dr. Dolittle interacts with his pets in Chapter 2 before.',
                  misconception: 'Students often confuse "animal noises" (like barking, meowing, or chirping) with the literary concept of "animal language" (possessing.' }
          ],
            remediations: { 'students-often-confuse-animal-noises': { steps: ['If a student struggles to see animal communication as a structured language, guide them through these steps: (1) Ask.', '(2) Point out how characters in the story notice specific repeated sounds for specific needs (e.g., a specific bark for.', 'Dolittle\'s world, these patterns are treated as a dictionary.', '(4) Re-read a passage where Polynesia translates, showing the student that translation requires a source language and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
