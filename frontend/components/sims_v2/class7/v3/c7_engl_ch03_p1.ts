import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch03_p1: SimDef = {
    id: 'v3_c7_engl_ch03_p1',
    title: 'Dreams and Discoveries: My Brother\'s Great Invention · Part 1/3',
    subtitle: 'This node covers analyzing Anand\'s character traits, motivations, and impact on his.',
    classLevel: 7, subject: 'engl', topic: 'Dreams and Discoveries: My Brother\'s Great Invention · Part 1/3',
    chapters: ['c7_engl_ch03'],
    nodeIds: ['c7_engl_ch03_001', 'c7_engl_ch03_002', 'c7_engl_ch03_003', 'c7_engl_ch03_004', 'c7_engl_ch03_005', 'c7_engl_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine your younger sibling spends hours in the garage taking apart old radios, collecting wires, and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A boy builds a burglar alarm that soaks his father and wakes the whole house — then starts sketching the next gadget before the floor is even dry. Is he a pest, or a budding engineer?',
        options: ['A budding inventor — relentless curiosity and resilience turn every disaster into fuel for the next experiment', 'A pest — anyone whose inventions fail is just careless', 'A dreamer — he should give up machines for something safer', 'A copycat — he is only repeating things he saw elsewhere'],
        answer: 'A budding inventor — relentless curiosity and resilience turn every disaster into fuel for the next experiment',
        hook: 'Failure is not foolishness. A room scattered with wires and half-built gadgets mirrors a mind that prioritizes creating over tidying — and real invention has always advanced by trial and error.',
    },
    teaching: [
        { title: 'Character Analysis: Anand the Young Inventor', text: 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Examine the evidence — the messy workshop, the soaked father, the immediate next plan — and write a character verdict on the young inventor that weighs both the chaos and the brilliance.',
        labels: ['Character Analysis: Anand', 'Character Analysis: Anita', 'Plot: The Burglar Alarm', 'Theme: Curiosity, Invention', 'Humour in the Story', 'Setting: A Family Home'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch03_002', title: 'Character Analysis: Anita the Narrator and Sister',
          caseStudy: { intro: 'Imagine you have a sibling who is always building noisy contraptions out of old radio parts, cardboard, and wires right in the middle of the living room, while.',
            decisions: [{ prompt: 'What point of view is used in "My Brother\'s Great Invention" to tell the story through Anita\'s eyes?', options: [
                { text: 'The story is told using first-person narration ("I")', outcome: 'The story is told using first-person narration ("I"). A wrong answer like "third-person omniscient".' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often assume that because Anita is critical or amused by Anand\'s failed inventions, she.', reveals: 'because-anita-is-critical-or' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_003', title: 'Plot: The Burglar Alarm That Goes Wrong',
          caseStudy: { intro: 'Have you ever tried to build something cool—like a homemade robot or a science project—only for it to do the exact opposite of what you wanted, creating.',
            decisions: [{ prompt: 'What is the term for the sequence of events that make up a story, including the beginning, middle, and end?', options: [
                { text: 'the plot', outcome: 'The correct answer is the plot. A wrong answer—such as "setting" or "theme"—reveals that the.' },
                { text: 'setting', outcome: 'Not quite — Students often confuse the "climax" (the moment of highest chaos or turning point) with the.', reveals: 'students-often-confuse-the-climax' },
                { text: 'climax', outcome: 'Not quite — Students often confuse the "climax" (the moment of highest chaos or turning point) with the.', reveals: 'students-often-confuse-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_006', title: 'Setting: A Family Home and the World of a Young Tinkerer',
          caseStudy: { intro: 'Imagine trying to build a giant robotic dinosaur out of old cardboard boxes, broken remote controls, and copper wires right in the middle of your living room.',
            decisions: [{ prompt: 'What specific household room serves as the primary base of operations for Anand\'s tinkering activities and failed inventions in the story?', options: [
                { text: 'Anand\'s primary base of operations is typically his bedroom or a makeshift corner of the', outcome: 'Anand\'s primary base of operations is typically his bedroom or a makeshift corner of the family.' },
                { text: 'setting', outcome: 'Not quite — Students often believe that "setting" in a story is merely a passive description of the background.', reveals: 'setting-in-a-story-is' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s science project has failed three times — the circuit fizzles, the model collapses, the demo won\'t start. She tears up the plans and says, \'Three failures mean I should stop. Inventors don\'t wreck things this often.\'',
            decisions: [{ prompt: 'What would Anand, the story\'s tireless inventor, make of her three failures?', options: [
                { text: 'That three failures are the job, not the verdict — Anand\'s inventions keep failing too, and he keeps building anyway, eyes sparkling at sparking wires while everyone shouts. His character is defined by persistence and curiosity; the flops are the steps. Stopping after three is the only outcome where the failures win.', outcome: 'The chapter presents resilience as the inventor\'s real trait — Anand\'s chaos and cheerfulness after disasters are what keep him, and the story, moving.' },
                { text: 'She is right — real inventors rarely fail, so three flops prove she is not cut out for it.', outcome: 'Anand fails constantly and keeps inventing — the story treats repeated failure as the inventor\'s normal life, not a disqualification.', reveals: 'three-failures-mean-quit' },
                { text: 'She should keep going but hide the failures — success is only meaningful if the flops stay secret.', outcome: 'Anand\'s failures are open and even funny — the chapter treats them as part of the work, not as shameful secrets to bury.', reveals: 'failures-must-be-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every inventor has a trail of glorious disasters behind them. The mess is not the opposite of genius — it is the workshop of it.',
            decisions: [{ prompt: 'What comes next? Dreams and Discoveries: My Brother\'s Great Invention · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Dreams and Discoveries: My Brother\'s Great Invention · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch03_001', difficulty: 'standard',
          question: 'From \'My Brother\': the skill or concept this node teaches, applied to the.',
          hint: 'Review c6_english_u2_012 to practice linking specific character actions to personality.',
          misconception: 'Students often confuse Anand\'s chaotic failures with laziness or stupidity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text',
                  options: ['From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'The plot of a story refers to the sequence of events that make up the narrative,', 'This topic explores the overarching theme of curiosity, invention, and the scientific', 'The literary device of situational humour shown through Papa\'s exasperated, bemused, and'],
                  hint: 'Review c6_english_u2_012 to practice linking specific character actions to personality adjectives.',
                  misconception: 'Students often confuse Anand\'s chaotic failures with laziness or stupidity.' }
          ],
            remediations: { 'students-often-confuse-anand-s': { steps: ['If a student thinks Anand is just unintelligent because his gadgets fail, guide them step-by-step: 1.', 'Ask them to look up what materials Anand uses (dynamos, wires, old clocks).', 'Explain that building a working circuit or alarm requires technical understanding, even if it goes off at the wrong.', 'Read aloud a line where Anand explains *how* his machine works.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_002', difficulty: 'standard',
          question: 'From \'My Brother\': the skill or concept this node teaches, applied to the.',
          hint: 'Review c6_english_u3_022 on character analysis and how authors show personality through.',
          misconception: 'Students often assume that because Anita is critical or amused by Anand\'s failed inventions, she dislikes him or wants.',
          parts: [
                { id: 'a', prompt: 'What point of view is used in "My Brother\'s Great Invention" to tell the story through Anita\'s eyes?', answer: 'The story is told using first-person narration ("I")',
                  options: ['The story is told using first-person narration ("I")', 'third-person omniscient'],
                  hint: 'Review c6_english_u3_022 on character analysis and how authors show personality through what.',
                  misconception: 'Students often assume that because Anita is critical or amused by Anand\'s failed inventions, she dislikes him or wants him to stop.' },
                { id: 'b', prompt: 'Why does Anita help Anand gather old wire and spare parts for his inventions even when she knows they might fail?', answer: 'Anita helps Anand',
                  options: ['Anita helps Anand', 'she wants to become an engineer too'],
                  hint: 'Review c6_english_u3_022 on character analysis and how authors show personality through what.',
                  misconception: 'Students often assume that because Anita is critical or amused by Anand\'s failed inventions, she dislikes him or wants him to stop.' }
          ],
            remediations: { 'because-anita-is-critical-or': { steps: ['Ask the student to find two specific lines where Anita helps Anand or worries about his safety.', 'Remind them: "Teasing a sibling and caring for them happen at the same time in families." Guide them to contrast her.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_003', difficulty: 'standard',
          question: 'The plot of a story refers to the sequence of events that make up the.',
          hint: 'Review basic story mapping by identifying who wants what, what goes wrong, and how.',
          misconception: 'Students often confuse the "climax" (the moment of highest chaos or turning point) with the "resolution" (how the.',
          parts: [
                { id: 'a', prompt: 'What is the term for the sequence of events that make up a story, including the beginning, middle, and end?', answer: 'the plot',
                  options: ['the plot', 'setting', 'climax', 'resolution'],
                  hint: 'Review basic story mapping by identifying who wants what, what goes wrong, and how it gets resolved.',
                  misconception: 'Students often confuse the "climax" (the moment of highest chaos or turning point) with the "resolution" (how the family cleans up and.' },
                { id: 'b', prompt: 'Why does the burglar alarm incident in Anand\'s house create humour rather than actual fear or danger?', answer: 'that the reader knows the alarm is just another one of Anand\'s harmless, faulty',
                  options: ['that the reader knows the alarm is just another one of Anand\'s harmless, faulty', 'because the family actually caught a dangerous thief', 'climax', 'resolution'],
                  hint: 'Review basic story mapping by identifying who wants what, what goes wrong, and how it gets resolved.',
                  misconception: 'Students often confuse the "climax" (the moment of highest chaos or turning point) with the "resolution" (how the family cleans up and.' },
                { id: 'c', prompt: 'If Anand sets his wire-and-pulley alarm across the doorway, and the family pet trips it at midnight, what structural part of the plot does this event represent?', answer: 'the inciting incident or the start of the rising action that triggers the chaos',
                  options: ['the inciting incident or the start of the rising action that triggers the chaos', 'climax', 'resolution', 'this is the final resolution rather than the spark that starts the trouble'],
                  hint: 'Review basic story mapping by identifying who wants what, what goes wrong, and how it gets resolved.',
                  misconception: 'Students often confuse the "climax" (the moment of highest chaos or turning point) with the "resolution" (how the family cleans up and.' },
                { id: 'd', prompt: 'How do Anand\'s previous failed inventions affect the reader\'s expectation of the plot when he announces his new burglar alarm?', answer: 'that past failures create dramatic irony and expectation',
                  options: ['that past failures create dramatic irony and expectation', 'climax', 'resolution'],
                  hint: 'Review basic story mapping by identifying who wants what, what goes wrong, and how it gets resolved.',
                  misconception: 'Students often confuse the "climax" (the moment of highest chaos or turning point) with the "resolution" (how the family cleans up and.' }
          ],
            remediations: { 'students-often-confuse-the-climax': { steps: ['Guide the student by asking: "Does the story stop the exact second the noise starts, or do we see the characters waking.', 'Have them point to the exact paragraph where the noise peaks versus where the family goes back to sleep.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_004', difficulty: 'standard',
          question: 'This topic explores the overarching theme of curiosity, invention, and the.',
          hint: 'Review the difference between what a character does on the surface (plot) and what lesson.',
          misconception: 'Students often confuse curiosity and the scientific spirit with being messy or creating trouble around the house.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the overarching theme of curiosity, invention, and the scientific',
                  options: ['This topic explores the overarching theme of curiosity, invention, and the scientific', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'The plot of a story refers to the sequence of events that make up the narrative,'],
                  hint: 'Review the difference between what a character does on the surface (plot) and what lesson.',
                  misconception: 'Students often confuse curiosity and the scientific spirit with being messy or creating trouble around the house.' }
          ],
            remediations: { 'students-often-confuse-curiosity-and': { steps: ['If a student struggles to see the scientific spirit past the humor, guide them by asking: "Does Anand break things.', 'Show them that true scientific curiosity involves questioning, testing, and redesigning, even when the results look.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_005', difficulty: 'standard',
          question: 'The literary device of situational humour shown through Papa\'s exasperated.',
          hint: 'Review c6_english_u2_011 to see how authors use comical mishaps and character reactions.',
          misconception: 'Students often mistake Papa\'s theatrical sighs and dramatic complaints for genuine anger and cruelty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The literary device of situational humour shown through Papa\'s exasperated, bemused, and',
                  options: ['The literary device of situational humour shown through Papa\'s exasperated, bemused, and', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'The plot of a story refers to the sequence of events that make up the narrative,'],
                  hint: 'Review c6_english_u2_011 to see how authors use comical mishaps and character reactions.',
                  misconception: 'Students often mistake Papa\'s theatrical sighs and dramatic complaints for genuine anger and cruelty.' }
          ],
            remediations: { 'students-often-mistake-papa-s': { steps: ['Remind the student to look at Papa\'s actions *after* the initial shock wears off—does he throw the gadgets away.', 'Read Papa\'s dialogue aloud with a humorous, exaggerated sigh rather than an angry shout.', 'Explain that authors use comedic exaggeration to show relatable family friction, not real malice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_006', difficulty: 'standard',
          question: 'The literary concept of "Setting" in a family home and a young tinkerer\'s world.',
          hint: 'Review Class 6 concepts on plot and setting, specifically focusing on how characters.',
          misconception: 'Students often believe that "setting" in a story is merely a passive description of the background scenery (like.',
          parts: [
                { id: 'a', prompt: 'Analyze how the physical layout and boundaries of a family home create immediate conflict when Anand tests his inventions.', answer: 'Identify the confined space of the home (hallways, doors, living rooms)',
                  options: ['Identify the confined space of the home (hallways, doors, living rooms)', 'setting'],
                  hint: 'Review Class 6 concepts on plot and setting, specifically focusing on how characters interact with.',
                  misconception: 'Students often believe that "setting" in a story is merely a passive description of the background scenery (like weather or furniture) that.' },
                { id: 'b', prompt: 'Compare the quiet, orderly expectations of Papa\'s living room with the chaotic, wire-strewn reality of Anand\'s tinkering space.', answer: 'Examine Papa\'s need for peace and order in common areas',
                  options: ['Examine Papa\'s need for peace and order in common areas', 'setting'],
                  hint: 'Review Class 6 concepts on plot and setting, specifically focusing on how characters interact with.',
                  misconception: 'Students often believe that "setting" in a story is merely a passive description of the background scenery (like weather or furniture) that.' }
          ],
            remediations: { 'setting-in-a-story-is': { steps: ['If a student treats setting as just a list of furniture, guide them by asking two targeted questions: 1.', '"Where exactly is Anand standing, and what objects are touching his hands?" 2.', '"How would this scene change if he were outside in an open playground instead of inside a crowded family home?" Explain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "setting" in a story is merely a passive description of the background scenery (like.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the family home setting is essential to the humor of Anand\'s failed inventions. Defend your judgment with reasoning.', answer: 'State a clear judgment: Yes, the family home is essential',
                  options: ['State a clear judgment: Yes, the family home is essential', 'setting'],
                  hint: 'Review Class 6 concepts on plot and setting, specifically focusing on how characters interact with.',
                  misconception: 'Students often believe that "setting" in a story is merely a passive description of the background scenery (like weather or furniture) that.' }
          ],
            remediations: { 'setting-in-a-story-is': { steps: ['If a student treats setting as just a list of furniture, guide them by asking two targeted questions: 1.', '"Where exactly is Anand standing, and what objects are touching his hands?" 2.', '"How would this scene change if he were outside in an open playground instead of inside a crowded family home?" Explain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
