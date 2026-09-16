import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch01 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch01: SimDef = {
    id: 'v3_c6_physics_ch01',
    title: 'The Ever-Evolving World of Science',
    subtitle: 'This node covers the definition of science and the basic scientific method (observation.',
    classLevel: 6, subject: 'physics', topic: 'The Ever-Evolving World of Science',
    chapters: ['c6_physics_ch01'],
    nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_002', 'c6_physics_ch01_003', 'c6_physics_ch01_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine your favorite flashlight suddenly stops working; what is the first thing you do?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A flashlight suddenly dies. One friend tosses it in the bin; another guesses the battery is dead, swaps in a fresh one, and it lights up. Only one of them did science — who, and why?',
        options: ['The second friend — they observed the problem, made a guess, and tested it', 'The first friend — deciding it was broken was a fast scientific conclusion', 'Both — science is whatever happens around machines', 'Neither — real science needs a lab coat and test tubes'],
        answer: 'The second friend — they observed the problem, made a guess, and tested it',
        hook: 'Science is not a finished book of facts to memorize. It is a detective loop — observe, question, guess, test — and a careful experiment can even overturn what a textbook says.',
    },
    teaching: [
        { title: 'What is Science and Why It Matters', text: 'Science is a systematic method of exploring the natural world by making observations, asking questions about how things work, and testing those questions to find evidence-based answers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch01_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'A wilting plant and a suspicious bouncing ball both need a detective — run the full observe-question-guess-test loop on each and record your evidence.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch01_002', title: 'The Scientific Method: Observation to Conclusion',
          caseStudy: { intro: 'Imagine your kitchen light doesn\'t turn on when you flip the switch. You notice the darkness (Observation) and wonder, "Why is the light out?" (Question).',
            decisions: [{ prompt: 'What is the very first step in the scientific method?', options: [
                { text: 'The first step is observation', outcome: 'The first step is observation. If a student says "forming a hypothesis," they confuse the *start*.' },
                { text: 'forming a hypothesis', outcome: 'Not quite — Students often think the scientific method is a rigid, linear path that *must* always lead to.', reveals: 'the-scientific-method-is-a' },
                { text: 'correct', outcome: 'Not quite — Students often think the scientific method is a rigid, linear path that *must* always lead to.', reveals: 'the-scientific-method-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch01_003', title: 'Branches of Science and Their Scope',
          caseStudy: { intro: 'Have you ever wondered why your bicycle tyre goes flat, or why a seed turns into a tall tree?',
            decisions: [{ prompt: 'What are the four main branches of science mentioned in the chapter, and what is the primary focus of Physics?', options: [
                { text: 'The four branches are Physics, Chemistry, Biology, and Earth Science', outcome: 'The four branches are Physics, Chemistry, Biology, and Earth Science.' },
                { text: '(forces) of nature', outcome: 'Not quite — Students often think that "Science" is only one subject and that the branches are completely.', reveals: 'science-is-only-one-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch01_004', title: 'Science in Everyday Life',
          caseStudy: { intro: 'Have you ever wondered why your pen suddenly stopped writing even though it looked full of ink?',
            decisions: [{ prompt: 'What is the very first step in the scientific method? A) Testing a guess B) Observing something interesting C) Giving up D) Reading.', options: [
                { text: 'B) Observing something interesting', outcome: 'B) Observing something interesting. A wrong answer suggests the student thinks science starts with.' },
                { text: 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science', outcome: 'Not quite — Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed.', reveals: 'if-their-guess-hypothesis-turns' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch01_005', title: 'Women in Science and Scientific Temper',
          caseStudy: { intro: 'Have you ever wondered why your plant in the corner is wilting while the one on the balcony is growing tall?',
            decisions: [{ prompt: 'What is the first step when you encounter something you do not understand in science?', options: [
                { text: 'The first step is to observe the situation carefully', outcome: 'The first step is to observe the situation carefully. A wrong answer, such as "guessing the answer.' },
                { text: 'guessing the answer immediately', outcome: 'Not quite — Students often believe science is only for experts in white coats in laboratories.', reveals: 'science-is-only-for-experts' },
                { text: 'science is only for experts in white coats in laboratories', outcome: 'Not quite — Students often believe science is only for experts in white coats in laboratories.', reveals: 'science-is-only-for-experts' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two brands of paper towels are in the kitchen, and the family argues about which absorbs more. One kid says, \'Let\'s just ask the shopkeeper.\' Another reaches for a notebook and two bowls.',
            decisions: [{ prompt: 'What does doing science here actually look like?', options: [
                { text: 'Test it fairly — cut equal-sized squares of each towel, dip them in equal amounts of water for the same time, weigh or measure what each holds, and write down the results. Science is a method — observe, predict, test with everything equal except the one thing being compared, record — and anyone can do it, whatever their maths marks.', outcome: 'The notebook kid is doing real science: a controlled test plus recorded data answers the question better than any opinion, including the shopkeeper\'s.' },
                { text: 'Asking the shopkeeper is faster and just as reliable — science is mainly about knowing facts from experts.', outcome: 'An opinion is not a measurement — the method exists so claims can be checked, and the towel test is doable at home in minutes.', reveals: 'science-is-asking-experts' },
                { text: 'Whichever towel feels thicker will absorb more, so no test is needed.', outcome: 'Thickness is a prediction, not a result — the point of the experiment is to check whether the hunch survives a fair test.', reveals: 'skip-the-test' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch01_005', title: 'You made it',
          caseStudy: { intro: 'Science is a verb, not a shelf of facts. Anyone who asks why and then tests the answer is already doing it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch01_001', difficulty: 'standard',
          question: 'Science is a systematic method of exploring the natural world by making.',
          hint: 'Review the act of observing and listing what you see in your own room or backyard.',
          misconception: 'Students often believe that science is "truth" that never changes or that it is only performed by experts in white.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Science is a systematic method of exploring the natural world by making observations,',
                  options: ['Science is a systematic method of exploring the natural world by making observations,', 'The scientific method is a structured, step-by-step process used to explore questions', 'Science is a systematic way of observing, questioning, and experimenting to understand', 'Science is a systematic way of observing our surroundings, asking questions about how'],
                  hint: 'Review the act of observing and listing what you see in your own room or backyard.',
                  misconception: 'Students often believe that science is "truth" that never changes or that it is only performed by experts in white coats.' }
          ],
            remediations: { 'science-is-truth-that-never': { steps: ['If a student thinks science is just facts, have them pick a common item (like a pencil) and ask three "how" or "why".', 'Guide them to propose a test, such as applying different pressures, to find the answer.', 'This shifts their focus from passive memorization to active investigation.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_002', difficulty: 'standard',
          question: 'The scientific method is a structured, step-by-step process used to explore.',
          hint: 'Review the "Curiosity" introduction in the chapter to understand why we ask questions.',
          misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.',
          parts: [
                { id: 'a', prompt: 'What is the very first step in the scientific method?', answer: 'The first step is observation',
                  options: ['The first step is observation', 'forming a hypothesis', 'correct'],
                  hint: 'Review the "Curiosity" introduction in the chapter to understand why we ask questions about our.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' },
                { id: 'b', prompt: 'If you test your hypothesis and find it is wrong, have you failed at doing science?', answer: 'No, you have not failed; you have gained knowledge by ruling out one possibility',
                  options: ['No, you have not failed; you have gained knowledge by ruling out one possibility', 'being right', 'finding the truth', 'correct'],
                  hint: 'Review the "Curiosity" introduction in the chapter to understand why we ask questions about our.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' },
                { id: 'c', prompt: 'You notice your plant in the balcony is wilting. How would you apply the scientific method to find out why?', answer: 'First, observe the plant (it\'s dry)',
                  options: ['First, observe the plant (it\'s dry)', 'correct'],
                  hint: 'Review the "Curiosity" introduction in the chapter to understand why we ask questions about our.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' }
          ],
            remediations: { 'the-scientific-method-is-a': { steps: ['If a student is stuck, tell them: "Think of a detective in a mystery movie." First, they observe the clues; then they.', 'If they find evidence that proves the suspect was elsewhere, they don\'t give up—they change their theory.', 'Ask the student to re-evaluate their hypothesis based on the new evidence rather than abandoning the investigation.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.',
          parts: [
                { id: 'a', prompt: 'If two people look at the same cloud and guess differently about what shape it is, is one of them "doing science" better than the other?', answer: 'Science isn\'t about the guess itself, but how they test it',
                  options: ['Science isn\'t about the guess itself, but how they test it', 'correct', 'science is a collection of static opinions rather than a process of verification'],
                  hint: 'Review the "Curiosity" introduction in the chapter to understand why we ask questions about our.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' }
          ],
            remediations: { 'the-scientific-method-is-a': { steps: ['If a student is stuck, tell them: "Think of a detective in a mystery movie." First, they observe the clues; then they.', 'If they find evidence that proves the suspect was elsewhere, they don\'t give up—they change their theory.', 'Ask the student to re-evaluate their hypothesis based on the new evidence rather than abandoning the investigation.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_003', difficulty: 'standard',
          question: 'Science is a systematic way of observing, questioning, and experimenting.',
          hint: 'Review the introductory section on "The Wonderful World of Science" to see examples.',
          misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate.',
          parts: [
                { id: 'a', prompt: 'What are the four main branches of science mentioned in the chapter, and what is the primary focus of Physics?', answer: 'The four branches are Physics, Chemistry, Biology, and Earth Science',
                  options: ['The four branches are Physics, Chemistry, Biology, and Earth Science', '(forces) of nature'],
                  hint: 'Review the introductory section on "The Wonderful World of Science" to see examples of what.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' },
                { id: 'b', prompt: 'If you are studying why ice melts into water when heated, which branch of science would this primarily fall under and why?', answer: 'This falls under Chemistry',
                  options: ['This falls under Chemistry', 'Biology', 'nature', 'living things'],
                  hint: 'Review the introductory section on "The Wonderful World of Science" to see examples of what.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' },
                { id: 'c', prompt: 'A scientist is tracking the path of a planet through the solar system.', answer: 'This is Astronomy',
                  options: ['This is Astronomy', 'Earth system', 'Universe system', 'Science'],
                  hint: 'Review the introductory section on "The Wonderful World of Science" to see examples of what.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' },
                { id: 'd', prompt: 'Compare the study of a forest (Biology) with the study of the rocks beneath it (Earth Science).', answer: 'They are connected',
                  options: ['They are connected', 'completely unrelated', 'Science'],
                  hint: 'Review the introductory section on "The Wonderful World of Science" to see examples of what.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' }
          ],
            remediations: { 'science-is-only-one-subject': { steps: ['If the student struggles, ask them to pick one object in their room, like a wooden desk.', 'Ask: "Is it alive?" (Biology), "Is it made of wood/atoms?" (Chemistry), "Does it have weight or can it be moved?".', 'By guiding them to ask these three questions about one object, they will see that branches are just different ways.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_004', difficulty: 'standard',
          question: 'Science is a systematic way of observing our surroundings, asking questions.',
          hint: 'Review the "What is Science?" section in the NCERT text to see examples of natural.',
          misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.',
          parts: [
                { id: 'a', prompt: 'What is the very first step in the scientific method? A) Testing a guess B) Observing something interesting C) Giving up D) Reading a textbook', answer: 'B) Observing something interesting',
                  options: ['B) Observing something interesting', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Review the "What is Science?" section in the NCERT text to see examples of natural curiosity.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' },
                { id: 'b', prompt: 'If you guess why a plant is dying, is that the end of the scientific process? Why or why not?', answer: 'No, it is not the end',
                  options: ['No, it is not the end', 'testing', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Review the "What is Science?" section in the NCERT text to see examples of natural curiosity.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' },
                { id: 'c', prompt: 'Your friend says, "Science is only for people in white coats in labs." How do you use the scientific method to prove them wrong?', answer: 'Explain a daily example, like a bicycle repair person finding a flat tire leak',
                  options: ['Explain a daily example, like a bicycle repair person finding a flat tire leak', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Review the "What is Science?" section in the NCERT text to see examples of natural curiosity.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' }
          ],
            remediations: { 'if-their-guess-hypothesis-turns': { steps: ['Explain that scientists often have "wrong" guesses that lead them to the right path.', 'Ask the student to identify one thing they learned from a "mistake" (e.g., "I learned that the bulb wasn\'t the problem.', 'Reframe the process as: "Observation -> Guess -> Test -> Result." Emphasize that the "Result" is the valuable part.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_005', difficulty: 'standard',
          question: 'Scientific temper is a way of thinking that involves being curious, observing.',
          hint: 'Review the section "What is Science?" in the textbook to focus on the definition.',
          misconception: 'Students often believe science is only for experts in white coats in laboratories.',
          parts: [
                { id: 'a', prompt: 'What is the first step when you encounter something you do not understand in science?', answer: 'The first step is to observe the situation carefully',
                  options: ['The first step is to observe the situation carefully', 'guessing the answer immediately', 'science is only for experts in white coats in laboratories'],
                  hint: 'Review the section "What is Science?" in the textbook to focus on the definition of curiosity.',
                  misconception: 'Students often believe science is only for experts in white coats in laboratories.' },
                { id: 'b', prompt: 'If your torch stops glowing, how would you use the scientific method to fix it?', answer: 'First, observe the torch',
                  options: ['First, observe the torch', 'science is only for experts in white coats in laboratories'],
                  hint: 'Review the section "What is Science?" in the textbook to focus on the definition of curiosity.',
                  misconception: 'Students often believe science is only for experts in white coats in laboratories.' }
          ],
            remediations: { 'science-is-only-for-experts': { steps: ['Ask the student to describe a time they fixed a problem at home.', 'Point out that their steps (checking the cause -> trying a fix -> seeing if it worked) are exactly what scientists do.', 'Tell them: "You are already a scientist; you just need to write down your steps next time."'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
