import type { SimDef } from '../../engine/types';
import C6_ScienceNatureSTreasuresSim from '../../../simulations/c6_12/C6_ScienceNatureSTreasuresSim';

/** v3 wrapped master — C6_ScienceNatureSTreasuresSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencenaturestreasuressim: SimDef = {
    id: 'v3w_c6_sciencenaturestreasuressim',
    title: 'Nature as Our Laboratory',
    subtitle: 'This node covers the philosophy and practice of using nature as an environment for.',
    classLevel: 6, subject: 'science', topic: 'Nature as Our Laboratory',
    chapters: [],
    nodeIds: ['c6_physics_ch02_006', 'c6_physics_ch02_008', 'c6_physics_ch02_009', 'c6_physics_ch01_003', 'c6_physics_ch01_001', 'c6_chemistry_ch04_005', 'c6_physics_ch11_036'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why flowers turn toward the sunlight, or why clouds seem to change color just before.', goal: 'Master Nature as Our Laboratory.' },
    discovery: {
        question: 'What is the most important tool for a scientist exploring nature?',
        options: ['The most important tool is careful observation', 'science', '"science" only happens in a lab with professional equipment'],
        answer: 'The most important tool is careful observation',
        hook: 'Students often think that "science" only happens in a lab with professional equipment.',
    },
    teaching: [
        { title: 'Nature is the primary laboratory where.', text: 'Nature is the primary laboratory where scientific inquiry begins by systematically observing, questioning, and collecting data from the environment.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_physics_ch02_006', title: 'Nature is the primary laboratory where.',
          scaffold: { problem: 'A student wants to know if the color of a flower affects how many bees visit it.',
            steps: [
            { text: 'Identify the two variables: flower color and number of bee visits.' },
            { text: 'Choose two different colored flowers in the same garden (e.g., one red, one yellow).' },
            { text: 'Observe for 10 minutes at the same time of day and count the bees visiting each.' },
            { text: 'Record the counts in a notebook.' },
            { text: 'Interpret: If the yellow flower has more bees, conclude that color may influence bee attraction.', faded: true, blankAnswer: 'A data table with counts of bees per flower color.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch02_008', title: 'Natural indicators are substances.',
          scaffold: { problem: 'You have a solution of soap (base) and a solution of vinegar (acid). You have turmeric paper. Describe the results of testing both.',
            steps: [
            { text: 'Identify the substances (Soap = Base, Vinegar = Acid).' },
            { text: 'Recall the indicator rule (Turmeric turns red-brown in base, no change in acid).' },
            { text: 'Test soap solution: Apply soap to turmeric paper.' },
            { text: 'Result: The paper turns red-brown.' },
            { text: 'Test vinegar: Apply vinegar to turmeric paper.' },
            { text: 'Result: The paper remains yellow.', faded: true, blankAnswer: 'Soap turns turmeric red-brown; Vinegar leaves turmeric.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch02_009', title: 'Exploring the local environment is the.',
          scaffold: { problem: 'You want to document the different types of plants in your school garden. How do you organize your data?',
            steps: [
            { text: 'Define the area you are studying (e.g., the rectangle near the canteen).' },
            { text: 'Walk through the area and count how many different "types" of leaves you see.' },
            { text: 'Create a table with two columns: "Description/Shape of Leaf" and "Number of plants found."' },
            { text: 'Draw a small sketch of each leaf type next to its description.', faded: true, blankAnswer: 'A table with columns for "Leaf Shape" and "Count,".' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c6_chemistry_ch04_005', title: 'Non-metals are materials that generally.',
          scaffold: { problem: 'You have three mystery items: a copper wire, a graphite lead from a pencil, and a piece of dry wood.',
            steps: [
            { text: 'Observe surface for shine (lustre). Copper shines; wood and graphite do not.' },
            { text: 'Test conductivity using a battery and bulb.' },
            { text: 'Copper wire completes the circuit (conductor).' },
            { text: 'Wood and graphite (in the context of basic school sets) fail to conduct or conduct poorly compared to metals.' },
            { text: 'Classify copper as metal, and wood and graphite as non-metals based on these observations.', faded: true, blankAnswer: 'Copper is a metal; wood and graphite are non-metals.' }
            ] } }
    ],
    explore: { component: C6_ScienceNatureSTreasuresSim, prompt: 'Explore the interactive — Nature as Our Laboratory' },
    challenges: [
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
            remediations: { 'science-only-happens-in-a': { steps: ['If the student fails to see nature as a lab, ask them to list three things in their house that function based on.', 'Then, have them walk outside and find one "problem" (e.g., "Why is this leaf brown?") and force them to write down.', 'This shifts their mindset from "looking" to "investigating."'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_008', difficulty: 'standard',
          question: 'Natural indicators are substances derived from plants that change their colour.',
          hint: 'Review the properties of acids and bases in the basic science chapter.',
          misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").',
          parts: [
                { id: 'a', prompt: 'What colour does turmeric powder turn when it comes in contact with a basic substance like soap solution?', answer: 'Turmeric turns red-brown in a basic solution',
                  options: ['Turmeric turns red-brown in a basic solution', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' },
                { id: 'b', prompt: 'If you dip a piece of blue litmus paper into lemon juice, what change do you expect to see, and what does this tell you about the lemon juice?', answer: 'The blue litmus paper will turn red, indicating that lemon juice is an acid',
                  options: ['The blue litmus paper will turn red, indicating that lemon juice is an acid', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' },
                { id: 'c', prompt: 'You have a mystery liquid that turns red cabbage juice from purple to green. Is this liquid an acid or a base?', answer: 'The liquid is a base',
                  options: ['The liquid is a base', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' }
          ],
            remediations: { 'all-natural-indicators-change-to': { steps: ['First, provide a table listing the indicator and its specific reaction to acids and bases.', 'Second, ask the student to perform a "blind test" using three cups: one with vinegar, one with soap water, and one with.', 'Have them record the results in a notebook to visually reinforce that different indicators react differently to the.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").',
          parts: [
                { id: 'a', prompt: 'Imagine you are at a picnic and spill vinegar (an acid) on your white shirt which has a turmeric stain.', answer: 'The stain will remain yellow',
                  options: ['The stain will remain yellow', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' }
          ],
            remediations: { 'all-natural-indicators-change-to': { steps: ['First, provide a table listing the indicator and its specific reaction to acids and bases.', 'Second, ask the student to perform a "blind test" using three cups: one with vinegar, one with soap water, and one with.', 'Have them record the results in a notebook to visually reinforce that different indicators react differently to the.'] } } },
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
            remediations: { 'science-in-the-environment-only': { steps: ['If a student suggests collecting samples, ask: "If you take the leaf away, can you still see how it grows on the.', 'Explain that the best way to be a scientist is to be a quiet observer who leaves the environment exactly as they found.'] } } },
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
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_005', difficulty: 'standard',
          question: 'Non-metals are materials that generally lack metallic properties such as.',
          hint: 'Review the section on lustre and conductivity in Chapter 6.',
          misconception: 'Students often believe that if a material is solid and hard, it must be a metal.',
          parts: [
                { id: 'a', prompt: 'Name two physical properties that distinguish most non-metals from metals.', answer: 'Non-metals are generally dull (lack lustre) and are poor conductors of heat and',
                  options: ['Non-metals are generally dull (lack lustre) and are poor conductors of heat and', 'non-metals are hard and shiny', 'hardness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a material is solid and hard, it must be a metal.' },
                { id: 'b', prompt: 'If you have a piece of sulfur and a piece of iron, how can you test which one is a metal?', answer: 'First, observe if it is shiny (lustre)',
                  options: ['First, observe if it is shiny (lustre)', 'hardness', 'metallic nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a material is solid and hard, it must be a metal.' }
          ],
            remediations: { 'if-a-material-is-solid': { steps: ['Ask the student to compare a piece of coal (non-metal) and a coin (metal).', 'Tell them to rub both on sandpaper and observe the surface; the coin will show a metallic shine, while the coal will.', 'Explain that hardness is a separate property, and they must check for shine and conductivity to confirm if something is.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
