import type { SimDef } from '../../engine/types';
import C6_ScienceTheWonderfulWorldOfScienceSim from '../../../simulations/c6_12/C6_ScienceTheWonderfulWorldOfScienceSim';

/** v3 wrapped master — C6_ScienceTheWonderfulWorldOfScienceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencethewonderfulworldofsciencesim: SimDef = {
    id: 'v3w_c6_sciencethewonderfulworldofsciencesim',
    title: 'What is Science and Why It Matters',
    subtitle: 'This node covers the definition of science and the basic scientific method (observation,.',
    classLevel: 6, subject: 'science', topic: 'What is Science and Why It Matters',
    chapters: [],
    nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_002', 'c6_physics_ch01_003', 'c6_physics_ch01_004', 'c6_chemistry_ch04_001', 'c6_physics_ch02_006', 'c6_physics_ch02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine your favorite flashlight suddenly stops working; what is the first thing you do?', goal: 'Master What is Science and Why It Matters.' },
    discovery: {
        question: 'What is the very first step in the scientific method?',
        options: ['The first step is observation', 'forming a hypothesis', 'correct'],
        answer: 'The first step is observation',
        hook: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.',
    },
    teaching: [
        { title: 'Science is a systematic method of exploring.', text: 'Science is a systematic method of exploring the natural world by making observations, asking questions about how things work, and testing those questions to find evidence-based answers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_physics_ch01_002', title: 'The scientific method is a structured,.',
          caseStudy: { intro: 'Imagine your kitchen light doesn\'t turn on when you flip the switch. You notice the darkness (Observation) and wonder, "Why is the light out?" (Question).',
            decisions: [{ prompt: 'What is the very first step in the scientific method?', options: [
                { text: 'The first step is observation', outcome: 'The first step is observation. If a student says "forming a hypothesis," they confuse the *start*.' },
                { text: 'forming a hypothesis', outcome: 'Not quite — Students often think the scientific method is a rigid, linear path that *must* always lead to a.', reveals: 'the-scientific-method-is-a' },
                { text: 'correct', outcome: 'Not quite — Students often think the scientific method is a rigid, linear path that *must* always lead to a.', reveals: 'the-scientific-method-is-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch01_003', title: 'Science is a systematic way of.',
          scaffold: { problem: 'You observe a magnet picking up iron pins. Identify the branch of science and the process.',
            steps: [
            { text: 'Observe the phenomenon (a magnet attracting metal).' },
            { text: 'Identify the core concept (force and matter).' },
            { text: 'Match to a branch (Physics studies forces and matter).' },
            { text: 'Conclude it is Physics.', faded: true, blankAnswer: 'Physics.' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch01_005', title: 'Scientific temper is a way of thinking.',
          caseStudy: { intro: 'Have you ever wondered why your plant in the corner is wilting while the one on the balcony is growing tall?',
            decisions: [{ prompt: 'What is the first step when you encounter something you do not understand in science?', options: [
                { text: 'The first step is to observe the situation carefully', outcome: 'The first step is to observe the situation carefully. A wrong answer, such as "guessing the answer.' },
                { text: 'guessing the answer immediately', outcome: 'Not quite — Students often believe science is only for experts in white coats in laboratories.', reveals: 'science-is-only-for-experts' },
                { text: 'science is only for experts in white coats in laboratories', outcome: 'Not quite — Students often believe science is only for experts in white coats in laboratories.', reveals: 'science-is-only-for-experts' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch04_001', title: 'Materials are substances used to create.',
          caseStudy: { intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass? To understand this, start by listing every object in your room.',
            decisions: [{ prompt: 'What are the two essential characteristics that define anything as "matter"?', options: [
                { text: 'Matter must occupy space (volume) and have mass', outcome: 'Matter must occupy space (volume) and have mass. A wrong answer—such as "it must be solid"—reveals.' },
                { text: 'it must be solid', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' },
                { text: 'transparent', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch02_006', title: 'Nature is the primary laboratory where.',
          scaffold: { problem: 'A student wants to know if the color of a flower affects how many bees visit it.',
            steps: [
            { text: 'Identify the two variables: flower color and number of bee visits.' },
            { text: 'Choose two different colored flowers in the same garden (e.g., one red, one yellow).' },
            { text: 'Observe for 10 minutes at the same time of day and count the bees visiting each.' },
            { text: 'Record the counts in a notebook.' },
            { text: 'Interpret: If the yellow flower has more bees, conclude that color may influence bee attraction.', faded: true, blankAnswer: 'A data table with counts of bees per flower color.' }
            ] } }
    ],
    explore: { component: C6_ScienceTheWonderfulWorldOfScienceSim, prompt: 'Explore the interactive — What is Science and Why It Matters' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch01_001', difficulty: 'standard',
          question: 'Science is a systematic method of exploring the natural world by making.',
          hint: 'Review the act of observing and listing what you see in your own room or backyard.',
          misconception: 'Students often believe that science is "truth" that never changes or that it is only performed by experts in white.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Science is a systematic method of exploring the natural world by making observations,',
                  options: ['Science is a systematic method of exploring the natural world by making observations,', 'The scientific method is a structured, step-by-step process used to explore questions', 'Science is a systematic way of observing, questioning, and experimenting to understand', 'Scientific temper is a way of thinking that involves being curious, observing the world'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that science is "truth" that never changes or that it is only performed by experts in white coats.' }
          ],
            remediations: { 'science-is-truth-that-never': { steps: ['If a student thinks science is just facts, have them pick a common item (like a pencil) and ask three "how" or "why".', 'Guide them to propose a test, such as applying different pressures, to find the answer.', 'This shifts their focus from passive memorization to active investigation.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_002', difficulty: 'standard',
          question: 'The scientific method is a structured, step-by-step process used to explore.',
          hint: 'Review the "Curiosity" introduction in the chapter to understand why we ask questions.',
          misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.',
          parts: [
                { id: 'a', prompt: 'What is the very first step in the scientific method?', answer: 'The first step is observation',
                  options: ['The first step is observation', 'forming a hypothesis', 'correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' },
                { id: 'b', prompt: 'If you test your hypothesis and find it is wrong, have you failed at doing science?', answer: 'No, you have not failed; you have gained knowledge by ruling out one possibility',
                  options: ['No, you have not failed; you have gained knowledge by ruling out one possibility', 'being right', 'finding the truth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' },
                { id: 'c', prompt: 'You notice your plant in the balcony is wilting. How would you apply the scientific method to find out why?', answer: 'First, observe the plant (it\'s dry)',
                  options: ['First, observe the plant (it\'s dry)', 'correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' }
          ],
            remediations: { 'the-scientific-method-is-a': { steps: ['If a student is stuck, tell them: "Think of a detective in a mystery movie." First, they observe the clues; then they.', 'If they find evidence that proves the suspect was elsewhere, they don\'t give up—they change their theory.', 'Ask the student to re-evaluate their hypothesis based on the new evidence rather than abandoning the investigation.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.',
          parts: [
                { id: 'a', prompt: 'If two people look at the same cloud and guess differently about what shape it is, is one of them "doing science" better than the other?', answer: 'Science isn\'t about the guess itself, but how they test it',
                  options: ['Science isn\'t about the guess itself, but how they test it', 'correct', 'science is a collection of static opinions rather than a process of verification'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the scientific method is a rigid, linear path that *must* always lead to a "correct" discovery.' }
          ],
            remediations: { 'the-scientific-method-is-a': { steps: ['If a student is stuck, tell them: "Think of a detective in a mystery movie." First, they observe the clues; then they.', 'If they find evidence that proves the suspect was elsewhere, they don\'t give up—they change their theory.', 'Ask the student to re-evaluate their hypothesis based on the new evidence rather than abandoning the investigation.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_003', difficulty: 'standard',
          question: 'Science is a systematic way of observing, questioning, and experimenting to.',
          hint: 'Review the introductory section on "The Wonderful World of Science" to see examples of.',
          misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate.',
          parts: [
                { id: 'a', prompt: 'What are the four main branches of science mentioned in the chapter, and what is the primary focus of Physics?', answer: 'The four branches are Physics, Chemistry, Biology, and Earth Science',
                  options: ['The four branches are Physics, Chemistry, Biology, and Earth Science', '(forces) of nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' },
                { id: 'b', prompt: 'If you are studying why ice melts into water when heated, which branch of science would this primarily fall under and why?', answer: 'This falls under Chemistry',
                  options: ['This falls under Chemistry', 'Biology', 'nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' },
                { id: 'c', prompt: 'A scientist is tracking the path of a planet through the solar system.', answer: 'This is Astronomy',
                  options: ['This is Astronomy', 'Earth system', 'Universe system'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Science" is only one subject and that the branches are completely isolated, like separate boxes.' }
          ],
            remediations: { 'science-is-only-one-subject': { steps: ['If the student struggles, ask them to pick one object in their room, like a wooden desk.', 'Ask: "Is it alive?" (Biology), "Is it made of wood/atoms?" (Chemistry), "Does it have weight or can it be moved?".', 'By guiding them to ask these three questions about one object, they will see that branches are just different ways to.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch01_005', difficulty: 'standard',
          question: 'Scientific temper is a way of thinking that involves being curious, observing.',
          hint: 'Review the section "What is Science?" in the textbook to focus on the definition of.',
          misconception: 'Students often believe science is only for experts in white coats in laboratories.',
          parts: [
                { id: 'a', prompt: 'What is the first step when you encounter something you do not understand in science?', answer: 'The first step is to observe the situation carefully',
                  options: ['The first step is to observe the situation carefully', 'guessing the answer immediately', 'science is only for experts in white coats in laboratories'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe science is only for experts in white coats in laboratories.' },
                { id: 'b', prompt: 'If your torch stops glowing, how would you use the scientific method to fix it?', answer: 'First, observe the torch',
                  options: ['First, observe the torch', 'science is only for experts in white coats in laboratories'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe science is only for experts in white coats in laboratories.' }
          ],
            remediations: { 'science-is-only-for-experts': { steps: ['Ask the student to describe a time they fixed a problem at home.', 'Point out that their steps (checking the cause -> trying a fix -> seeing if it worked) are exactly what scientists do.', 'Tell them: "You are already a scientist; you just need to write down your steps next time."'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_001', difficulty: 'standard',
          question: 'Materials are substances used to create objects, and matter is anything that.',
          hint: 'Review the definitions of adjectives describing physical appearance and texture.',
          misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
          parts: [
                { id: 'a', prompt: 'What are the two essential characteristics that define anything as "matter"?', answer: 'Matter must occupy space (volume) and have mass',
                  options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' },
                { id: 'b', prompt: 'If you have a steel spoon and a wooden spoon, why might you classify them differently in a "shiny vs. dull" test?', answer: 'Steel is lustrous (shiny), whereas wood is non-lustrous (dull)',
                  options: ['Steel is lustrous (shiny), whereas wood is non-lustrous (dull)', 'appearance', 'lustre'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' }
          ],
            remediations: { 'students-often-confuse-transparent-with': { steps: ['First, ask the student to look through a piece of colored cellophane paper at a light source.', 'Ask: "Can you see the light even though it is colored?" Explain that if light passes through, it is transparent,.', 'Then, have them compare this to a piece of wood, which blocks all light, to solidify the difference between transparent.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_006', difficulty: 'standard',
          question: 'Nature is the primary laboratory where scientific inquiry begins by.',
          hint: 'Review the "Curiosity" chapter introduction to see how Malli and Valli ask questions.',
          misconception: 'Students often think that "science" only happens in a lab with professional equipment.',
          parts: [
                { id: 'a', prompt: 'What is the most important tool for a scientist exploring nature?', answer: 'The most important tool is careful observation',
                  options: ['The most important tool is careful observation', 'science', '"science" only happens in a lab with professional equipment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' },
                { id: 'b', prompt: 'If you see plants growing toward a window, is this just "nature" or is it a scientific observation? Why?', answer: 'It is a scientific observation',
                  options: ['It is a scientific observation', 'it\'s just nature', 'science'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' },
                { id: 'c', prompt: 'You observe that every time it gets windy, the leaves on a tree fall. How would you collect data on this?', answer: 'Step 1: Observe the tree on calm days vs',
                  options: ['Step 1: Observe the tree on calm days vs', 'science', '"science" only happens in a lab with professional equipment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' }
          ],
            remediations: { 'science-only-happens-in-a': { steps: ['If the student fails to see nature as a lab, ask them to list three things in their house that function based on.', 'Then, have them walk outside and find one "problem" (e.g., "Why is this leaf brown?") and force them to write down.', 'This shifts their mindset from "looking" to "investigating."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
