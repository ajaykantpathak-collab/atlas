import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch02 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch02: SimDef = {
    id: 'v3_c6_physics_ch02',
    title: 'Exploring Science Through Nature',
    subtitle: 'This node covers the philosophy and practice of using nature as an environment for.',
    classLevel: 6, subject: 'physics', topic: 'Exploring Science Through Nature',
    chapters: ['c6_physics_ch02'],
    nodeIds: ['c6_physics_ch02_006', 'c6_physics_ch02_008', 'c6_physics_ch02_009', 'c6_physics_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why flowers turn toward the sunlight, or why clouds seem to change color just before.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You spend twenty minutes watching an ant haul a crumb across the garden, noting its path and speed. Your sibling laughs that you are wasting time. Who is right?',
        options: ['You are — tracking the ant, recording what it does, and asking why is real scientific data collection', 'Your sibling — science only counts inside a laboratory', 'Neither — watching insects is just a hobby', 'You are — but only because ants are famous'],
        answer: 'You are — tracking the ant, recording what it does, and asking why is real scientific data collection',
        hook: 'Nature is the oldest laboratory in the world. Long before buildings and equipment existed, humans survived by noticing patterns — and the most important scientific tool is still careful observation, not a microscope.',
    },
    teaching: [
        { title: 'Nature as Our Laboratory', text: 'Nature is the primary laboratory where scientific inquiry begins by systematically observing, questioning, and collecting data from the environment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch02_006', title: 'Your mission',
          mission: { widget: 'cycle', validate: 'cycle:heat=60',
            instruction: 'On the lab: add heat to 60 — how does the cycle respond?.',
        context: 'Take a nature walk as a field scientist — pick one small mystery like a line of ants or a drying puddle, form a testable question, and record what changes over time.',
            observePrompt: 'What did the cycle interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch02_006', title: 'Nature as Our Laboratory',
          caseStudy: { intro: 'Have you ever wondered why flowers turn toward the sunlight, or why clouds seem to change color just before it rains? You are already a scientist!',
            decisions: [{ prompt: 'What is the most important tool for a scientist exploring nature?', options: [
                { text: 'The most important tool is careful observation', outcome: 'The most important tool is careful observation. If a student answers "a microscope" or "a.' },
                { text: 'science', outcome: 'Not quite — Students often think that "science" only happens in a lab with professional equipment.', reveals: 'science-only-happens-in-a' },
                { text: '"science" only happens in a lab with professional equipment', outcome: 'Not quite — Students often think that "science" only happens in a lab with professional equipment.', reveals: 'science-only-happens-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch02_007', title: 'Science Fairs and Sharing Discoveries',
          caseStudy: { intro: 'Have you ever made a discovery at home, like noticing that salt dissolves faster in warm water than cold, and wanted to tell someone about it?',
            decisions: [{ prompt: 'What are the two most important steps in the scientific process that happen after you have finished your experiment?', options: [
                { text: 'The steps are drawing conclusions and communicating your results', outcome: 'The steps are drawing conclusions and communicating your results.' },
                { text: 'conclusion', outcome: 'Not quite — Students often believe that the "conclusion" is just the result of the experiment.', reveals: 'the-conclusion-is-just-the' },
                { text: 'the "conclusion" is just the result of the experiment', outcome: 'Not quite — Students often believe that the "conclusion" is just the result of the experiment.', reveals: 'the-conclusion-is-just-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch02_008', title: 'Testing Substances with Natural Indicators',
          caseStudy: { intro: 'Have you ever noticed how your clothes might change colour if you spill lemon juice or soap on a turmeric stain?',
            decisions: [{ prompt: 'What colour does turmeric powder turn when it comes in contact with a basic substance like soap solution?', options: [
                { text: 'Turmeric turns red-brown in a basic solution', outcome: 'Turmeric turns red-brown in a basic solution. If a student says it turns green or blue, they are.' },
                { text: 'everything turns red in acid', outcome: 'Not quite — Students often believe that all natural indicators change to the same colour (e.g., "everything.', reveals: 'all-natural-indicators-change-to' },
                { text: 'all natural indicators change to the same colour (e', outcome: 'Not quite — Students often believe that all natural indicators change to the same colour (e.g., "everything.', reveals: 'all-natural-indicators-change-to' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch02_009', title: 'Exploring the Local Environment',
          caseStudy: { intro: 'Imagine you are walking from your front door to the school gate; how many things do you see that are part of "science"?',
            decisions: [{ prompt: 'What are two examples of "natural features" you might observe in your own neighborhood?', options: [
                { text: 'Examples include trees, birds, insects, soil, or water bodies', outcome: 'Examples include trees, birds, insects, soil, or water bodies.' },
                { text: 'science', outcome: 'Not quite — Students often believe that "science" in the environment only involves collecting samples (like.', reveals: 'science-in-the-environment-only' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch02_010', title: 'Recording and Documenting Observations',
          caseStudy: { intro: 'Have you ever tried to remember exactly what happened during a science experiment three days after you did it, only to find the details fuzzy?',
            decisions: [{ prompt: 'What are the four essential pieces of information that should be included in every scientific observation record?', options: [
                { text: 'The essential pieces are date, time, location, and the specific conditions or description', outcome: 'The essential pieces are date, time, location, and the specific conditions or description of the.' },
                { text: 'observation', outcome: 'Not quite — Students often believe that "observation" only means the final result (e.g., "the salt remained").', reveals: 'observation-only-means-the-final' },
                { text: 'the salt remained', outcome: 'Not quite — Students often believe that "observation" only means the final result (e.g., "the salt remained").', reveals: 'observation-only-means-the-final' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch02_006', title: 'Use it in the wild',
          caseStudy: { intro: 'A courtyard puddle vanishes by evening, and a student wants to prove the sun did it. His plan: \'Just watch one puddle disappear — that proves the sun evaporated it.\'',
            decisions: [{ prompt: 'How should he actually test whether the sun matters?', options: [
                { text: 'Compare two matched puddles — pour equal water in two identical spots, shade one and leave one in the sun, then measure how much each loses. If only the sunny one shrinks faster, the sun\'s role is shown; and every step must be written down, because memory forgets numbers that a notebook keeps.', outcome: 'The single-puddle watch proves only that water disappears — the paired test isolates the sun as the one difference, which is what turns an observation into evidence.' },
                { text: 'His plan works — watching one puddle vanish while the sun is out already proves the sun caused it.', outcome: 'Correlation is not cause — the puddle might have drained into the ground or dried by wind; only a shaded twin puddle separates the sun\'s effect.', reveals: 'watching-proves-cause' },
                { text: 'The test is impossible at home — questions like this need a laboratory to answer.', outcome: 'Two cups of water, one shaded and one sunny, is the whole experiment — science at home is how this chapter is meant to be used.', reveals: 'science-needs-a-lab' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch02_010', title: 'You made it',
          caseStudy: { intro: 'The difference between looking and observing is a notebook. Step outside, ask what is happening here, and the backyard becomes a lab.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cycle', prompt: 'Explore the cycle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cycle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch02_006', difficulty: 'standard',
          question: 'Nature is the primary laboratory where scientific inquiry begins.',
          hint: 'Review the "Curiosity" chapter introduction to see how Malli and Valli ask questions.',
          misconception: 'Students often think that "science" only happens in a lab with professional equipment.',
          parts: [
                { id: 'a', prompt: 'What is the most important tool for a scientist exploring nature?', answer: 'The most important tool is careful observation',
                  options: ['The most important tool is careful observation', 'science', '"science" only happens in a lab with professional equipment'],
                  hint: 'Review the "Curiosity" chapter introduction to see how Malli and Valli ask questions about their.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' },
                { id: 'b', prompt: 'If you see plants growing toward a window, is this just "nature" or is it a scientific observation? Why?', answer: 'It is a scientific observation',
                  options: ['It is a scientific observation', 'it\'s just nature', 'science', '"science" only happens in a lab with professional equipment'],
                  hint: 'Review the "Curiosity" chapter introduction to see how Malli and Valli ask questions about their.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' },
                { id: 'c', prompt: 'You observe that every time it gets windy, the leaves on a tree fall. How would you collect data on this?', answer: 'Step 1: Observe the tree on calm days vs',
                  options: ['Step 1: Observe the tree on calm days vs', 'science', '"science" only happens in a lab with professional equipment'],
                  hint: 'Review the "Curiosity" chapter introduction to see how Malli and Valli ask questions about their.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' },
                { id: 'd', prompt: 'Why is nature considered the "oldest laboratory"?', answer: 'It is the oldest',
                  options: ['It is the oldest', 'science', '"science" only happens in a lab with professional equipment'],
                  hint: 'Review the "Curiosity" chapter introduction to see how Malli and Valli ask questions about their.',
                  misconception: 'Students often think that "science" only happens in a lab with professional equipment.' }
          ],
            remediations: { 'science-only-happens-in-a': { steps: ['If the student fails to see nature as a lab, ask them to list three things in their house that function based.', 'Then, have them walk outside and find one "problem" (e.g., "Why is this leaf brown?") and force them to write down.', 'This shifts their mindset from "looking" to "investigating."'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_007', difficulty: 'standard',
          question: 'A science fair is a structured event where students present their scientific.',
          hint: 'Review the definition of a hypothesis as an "educated guess."',
          misconception: 'Students often believe that the "conclusion" is just the result of the experiment.',
          parts: [
                { id: 'a', prompt: 'What are the two most important steps in the scientific process that happen after you have finished your experiment?', answer: 'The steps are drawing conclusions and communicating your results',
                  options: ['The steps are drawing conclusions and communicating your results', 'conclusion', 'the "conclusion" is just the result of the experiment'],
                  hint: 'Review the definition of a hypothesis as an "educated guess."',
                  misconception: 'Students often believe that the "conclusion" is just the result of the experiment.' },
                { id: 'b', prompt: 'Why is it not enough to just perform an experiment without sharing the results at a science fair?', answer: 'Science is a collective effort',
                  options: ['Science is a collective effort', 'conclusion', 'the "conclusion" is just the result of the experiment'],
                  hint: 'Review the definition of a hypothesis as an "educated guess."',
                  misconception: 'Students often believe that the "conclusion" is just the result of the experiment.' },
                { id: 'c', prompt: 'If you want to know if salt or sugar dissolves faster, what is the very first thing you must do before you start mixing things?', answer: 'You must form a research question and then a hypothesis (your educated guess)',
                  options: ['You must form a research question and then a hypothesis (your educated guess)', 'trial and error', 'conclusion', 'the "conclusion" is just the result of the experiment'],
                  hint: 'Review the definition of a hypothesis as an "educated guess."',
                  misconception: 'Students often believe that the "conclusion" is just the result of the experiment.' }
          ],
            remediations: { 'the-conclusion-is-just-the': { steps: ['Ask the student to look at their project data and ask: "So what?" Help them see that the data is just the "what.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the "conclusion" is just the result of the experiment.',
          parts: [
                { id: 'a', prompt: 'Is a project "complete" if you have a perfect conclusion but no way to explain it to others? Why or why not?', answer: 'No, it is incomplete',
                  options: ['No, it is incomplete', 'conclusion', 'the "conclusion" is just the result of the experiment'],
                  hint: 'Review the definition of a hypothesis as an "educated guess."',
                  misconception: 'Students often believe that the "conclusion" is just the result of the experiment.' }
          ],
            remediations: { 'the-conclusion-is-just-the': { steps: ['Ask the student to look at their project data and ask: "So what?" Help them see that the data is just the "what.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_008', difficulty: 'standard',
          question: 'Natural indicators are substances derived from plants that change their colour.',
          hint: 'Review the properties of acids and bases in the basic science chapter.',
          misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").',
          parts: [
                { id: 'a', prompt: 'What colour does turmeric powder turn when it comes in contact with a basic substance like soap solution?', answer: 'Turmeric turns red-brown in a basic solution',
                  options: ['Turmeric turns red-brown in a basic solution', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Review the properties of acids and bases in the basic science chapter.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' },
                { id: 'b', prompt: 'If you dip a piece of blue litmus paper into lemon juice, what change do you expect to see, and what does this tell you about the lemon juice?', answer: 'The blue litmus paper will turn red, indicating that lemon juice is an acid',
                  options: ['The blue litmus paper will turn red, indicating that lemon juice is an acid', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Review the properties of acids and bases in the basic science chapter.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' },
                { id: 'c', prompt: 'You have a mystery liquid that turns red cabbage juice from purple to green. Is this liquid an acid or a base?', answer: 'The liquid is a base',
                  options: ['The liquid is a base', 'everything turns red in acid', 'all natural indicators change to the same colour (e'],
                  hint: 'Review the properties of acids and bases in the basic science chapter.',
                  misconception: 'Students often believe that all natural indicators change to the same colour (e.g., "everything turns red in acid").' }
          ],
            remediations: { 'all-natural-indicators-change-to': { steps: ['First, provide a table listing the indicator and its specific reaction to acids and bases.', 'Second, ask the student to perform a "blind test" using three cups: one with vinegar, one with soap water, and one with.', 'Have them record the results in a notebook to visually reinforce that different indicators react differently to the.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_009', difficulty: 'standard',
          question: 'Exploring the local environment is the practice of observing and documenting.',
          hint: 'Review basic classification of living vs. non-living things.',
          misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves.',
          parts: [
                { id: 'a', prompt: 'What are two examples of "natural features" you might observe in your own neighborhood?', answer: 'Examples include trees, birds, insects, soil, or water bodies',
                  options: ['Examples include trees, birds, insects, soil, or water bodies', 'science'],
                  hint: 'Review basic classification of living vs. non-living things.',
                  misconception: 'Students often believe that "science" in the environment only involves collecting samples (like picking leaves or catching insects).' }
          ],
            remediations: { 'science-in-the-environment-only': { steps: ['If a student suggests collecting samples, ask: "If you take the leaf away, can you still see how it grows on the.', 'Explain that the best way to be a scientist is to be a quiet observer who leaves the environment exactly as they found.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch02_010', difficulty: 'standard',
          question: 'Recording observations is the systematic process of writing down what is seen.',
          hint: 'Review basic descriptive adjectives and units of time.',
          misconception: 'Students often believe that "observation" only means the final result (e.g., "the salt remained").',
          parts: [
                { id: 'a', prompt: 'You are observing how long it takes for salt water to evaporate in a bowl. You note "It evaporated fast." Is this a good record? Why or why not?', answer: 'No, it is not a good record',
                  options: ['No, it is not a good record', 'observation', 'the salt remained', '"observation" only means the final result (e'],
                  hint: 'Review basic descriptive adjectives and units of time.',
                  misconception: 'Students often believe that "observation" only means the final result (e.g., "the salt remained").' }
          ],
            remediations: { 'observation-only-means-the-final': { steps: ['If a student misses the context, ask: "If your friend did this same experiment in a cold, dark room, would they get the.'], labTask: { instruction: 'On the interactive: add heat to 60 — how does the cycle respond? — then check.', widget: 'cycle', validate: 'cycle:heat=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
