import type { SimDef } from '../../engine/types';
import C6_ScienceExploringMagnetsSim from '../../../simulations/c6_12/C6_ScienceExploringMagnetsSim';

/** v3 wrapped master — C6_ScienceExploringMagnetsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_scienceexploringmagnetssim: SimDef = {
    id: 'v3w_c6_scienceexploringmagnetssim',
    title: 'Exploring Magnets',
    subtitle: 'This node covers the definition of science and the basic scientific method (observation,.',
    classLevel: 6, subject: 'science', topic: 'What is Science and Why It Matters',
    chapters: [],
    nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_004', 'c6_physics_ch02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine your favorite flashlight suddenly stops working; what is the first thing you do?', goal: 'Master Exploring Magnets.' },
    discovery: {
        question: 'If you guess why a plant is dying, is that the end of the scientific process? Why or why not?',
        options: ['No, it is not the end', 'testing', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
        answer: 'No, it is not the end',
        hook: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.',
    },
    teaching: [
        { title: 'Science is a systematic method of exploring.', text: 'Science is a systematic method of exploring the natural world by making observations, asking questions about how things work, and testing those questions to find evidence-based answers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_physics_ch01_004', title: 'Science is a systematic way of.',
          caseStudy: { intro: 'Have you ever wondered why your pen suddenly stopped writing even though it looked full of ink?',
            decisions: [{ prompt: 'What is the very first step in the scientific method? A) Testing a guess B) Observing something interesting C) Giving up D) Reading a.', options: [
                { text: 'B) Observing something interesting', outcome: 'B) Observing something interesting. A wrong answer suggests the student thinks science starts with.' },
                { text: 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science', outcome: 'Not quite — Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed.', reveals: 'if-their-guess-hypothesis-turns' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch02_009', title: 'Exploring the local environment is the.',
          scaffold: { problem: 'You want to document the different types of plants in your school garden. How do you organize your data?',
            steps: [
            { text: 'Define the area you are studying (e.g., the rectangle near the canteen).' },
            { text: 'Walk through the area and count how many different "types" of leaves you see.' },
            { text: 'Create a table with two columns: "Description/Shape of Leaf" and "Number of plants found."' },
            { text: 'Draw a small sketch of each leaf type next to its description.', faded: true, blankAnswer: 'A table with columns for "Leaf Shape" and "Count,".' }
            ] } }
    ],
    explore: { component: C6_ScienceExploringMagnetsSim, prompt: 'Explore the interactive — Exploring Magnets' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch01_001', difficulty: 'standard',
          question: 'Science is a systematic method of exploring the natural world by making.',
          hint: 'Review the act of observing and listing what you see in your own room or backyard.',
          misconception: 'Students often believe that science is "truth" that never changes or that it is only performed by experts in white.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Science is a systematic method of exploring the natural world by making observations,',
                  options: ['Science is a systematic method of exploring the natural world by making observations,', 'Science is a systematic way of observing our surroundings, asking questions about how', 'Exploring the local environment is the practice of observing and documenting natural'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that science is "truth" that never changes or that it is only performed by experts in white coats.' }
          ],
            remediations: { 'science-is-truth-that-never': { steps: ['If a student thinks science is just facts, have them pick a common item (like a pencil) and ask three "how" or "why".', 'Guide them to propose a test, such as applying different pressures, to find the answer.', 'This shifts their focus from passive memorization to active investigation.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_004', difficulty: 'standard',
          question: 'Science is a systematic way of observing our surroundings, asking questions.',
          hint: 'Review the "What is Science?" section in the NCERT text to see examples of natural.',
          misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.',
          parts: [
                { id: 'a', prompt: 'What is the very first step in the scientific method? A) Testing a guess B) Observing something interesting C) Giving up D) Reading a textbook', answer: 'B) Observing something interesting',
                  options: ['B) Observing something interesting', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' },
                { id: 'b', prompt: 'If you guess why a plant is dying, is that the end of the scientific process? Why or why not?', answer: 'No, it is not the end',
                  options: ['No, it is not the end', 'testing', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' },
                { id: 'c', prompt: 'Your friend says, "Science is only for people in white coats in labs." How do you use the scientific method to prove them wrong?', answer: 'Explain a daily example, like a bicycle repair person finding a flat tire leak',
                  options: ['Explain a daily example, like a bicycle repair person finding a flat tire leak', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' }
          ],
            remediations: { 'if-their-guess-hypothesis-turns': { steps: ['Explain that scientists often have "wrong" guesses that lead them to the right path.', 'Ask the student to identify one thing they learned from a "mistake" (e.g., "I learned that the bulb wasn\'t the problem,.', 'Reframe the process as: "Observation -> Guess -> Test -> Result." Emphasize that the "Result" is the valuable part,.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.',
          parts: [
                { id: 'a', prompt: 'Is it better to do science alone or with others? Justify your choice based on the nature of science.', answer: 'Working with others is often better',
                  options: ['Working with others is often better', 'if their "guess" (hypothesis) turns out to be wrong, they have failed at science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if their "guess" (hypothesis) turns out to be wrong, they have failed at science.' }
          ],
            remediations: { 'if-their-guess-hypothesis-turns': { steps: ['Explain that scientists often have "wrong" guesses that lead them to the right path.', 'Ask the student to identify one thing they learned from a "mistake" (e.g., "I learned that the bulb wasn\'t the problem,.', 'Reframe the process as: "Observation -> Guess -> Test -> Result." Emphasize that the "Result" is the valuable part,.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_009', difficulty: 'standard',
          question: 'Exploring the local environment is the practice of observing and documenting.',
          hint: 'Review basic classification of living vs. non-living things.',
          misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves or.',
          parts: [
                { id: 'a', prompt: 'What are two examples of "natural features" you might observe in your own neighborhood?', answer: 'Examples include trees, birds, insects, soil, or water bodies',
                  options: ['Examples include trees, birds, insects, soil, or water bodies', 'science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves or catching insects).' }
          ],
            remediations: { 'science-in-the-environment-only': { steps: ['If a student suggests collecting samples, ask: "If you take the leaf away, can you still see how it grows on the.', 'Explain that the best way to be a scientist is to be a quiet observer who leaves the environment exactly as they found.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves or.',
          parts: [
                { id: 'a', prompt: 'Is "exploring the environment" only for people living in forests or villages? Why or why not?', answer: 'No, it is for everyone',
                  options: ['No, it is for everyone', 'nature', 'science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves or catching insects).' },
                { id: 'b', prompt: 'Design a simple 3-step plan to study the birds that visit your school balcony.', answer: 'Step 1: Set a specific time to sit quietly for 10 minutes',
                  options: ['Step 1: Set a specific time to sit quietly for 10 minutes', 'science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves or catching insects).' }
          ],
            remediations: { 'science-in-the-environment-only': { steps: ['If a student suggests collecting samples, ask: "If you take the leaf away, can you still see how it grows on the.', 'Explain that the best way to be a scientist is to be a quiet observer who leaves the environment exactly as they found.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
