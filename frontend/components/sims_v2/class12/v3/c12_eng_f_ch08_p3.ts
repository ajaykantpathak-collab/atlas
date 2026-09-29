import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch08_p3: SimDef = {
    id: 'v3_c12_eng_f_ch08_p3',
    title: 'Going Places · Part 3/3',
    subtitle: 'A boutique in the head, a biscuit factory at the gate',
    classLevel: 12, subject: 'eng_f', topic: 'Going Places · Part 3/3',
    chapters: ['c12_eng_f_ch08'],
    nodeIds: ['c12_eng_f_cbse_08_013', 'c12_eng_f_cbse_08_014', 'c12_eng_f_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coming-of-age critic', intro: 'Sophie dreams in colour inside a grey industrial town. The distance between the two is the whole story.', goal: 'Distinguish adolescent fantasy from socio-economic reality in Going Places and unpack its double-edged title.' },
    discovery: {
        question: 'A student summarises Going Places as \'a girl who becomes a fashion designer and meets her footballer.\' What did they mistake for plot?',
        options: ['Sophie\'s fantasies — the boutique and Danny Casey are imagined constructions set against a biscuit-factory future, not events', 'Nothing — that\'s exactly what happens', 'Her real career plan', 'The sequel\'s plot'],
        answer: 'Sophie\'s fantasies — the boutique and Danny Casey are imagined constructions set against a biscuit-factory future, not events',
        hook: 'The title works twice: \'going places\' as ambition and as bitter irony — she\'s a working-class girl earmarked for a factory, unlikely to physically go anywhere. Confusing her daydreams with the story\'s facts is the exact trap the chapter sets.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Going Places\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_08_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map Sophie\'s dream-world against her street: weigh the boutique fantasies and hero worship against the steamy kitchen, grimy father and waiting canal — and decide how the title earns its irony.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Going Places\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the specific writing task suggested in the NCERT textbook at the end of "Going Places"?', options: [
                { text: 'The NCERT writing task asks: "Think of a person who you would like to have as your', outcome: 'The NCERT writing task asks: "Think of a person who you would like to have as your role-model.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often think "writing based on the chapter" means retelling the story.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students often think "writing based on the chapter" means retelling the story.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Going Places\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the two specific discussion prompts given in the NCERT "Talking about the text" section for "Going Places"?', options: [
                { text: 'The two prompts are: (1) "Sophie\'s dreams and disappointments are all in her mind" and', outcome: 'The two prompts are: (1) "Sophie\'s dreams and disappointments are all in her mind" and (2) "It.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat — they share personal opinions ("I think.', reveals: 'students-treat-speaking-and-listening' },
                { text: 'Talk about the story\'s theme', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat — they share personal opinions ("I think.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend from a struggling family talks of opening a boutique and \'meeting famous people\', spinning stories everyone half-believes. As her closest friend, you can choose how to respond.',
            decisions: [{ prompt: 'How do you handle her dreaming?', options: [
                { text: 'Respect the dream but ground it — talk honestly about money, training and next steps; \'Going Places\' shows fantasy becomes painful only when it substitutes for a plan.', outcome: 'Sophie\'s tragedy isn\'t ambition — it\'s that nothing connects the dream to the biscuit factory she\'s earmarked for.' },
                { text: 'Let the stories ride — dreaming costs nothing and planning is a buzzkill.', outcome: 'Sophie\'s Danny Casey fable shows untethered fantasy turns into self-deception and isolation.', reveals: 'fantasy-substitutes-plans' },
                { text: 'Tell her bluntly she\'ll end up at the factory and should stop embarrassing herself.', outcome: 'Mockery kills the aspiration without offering a path — the story critiques the trap, not the dreaming.', reveals: 'mockery-cures-dreaming' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You can now hold a character\'s fantasy and her fate in the same frame — the double vision this story demands and every adolescent knows.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_013', difficulty: 'standard',
          question: 'Critical thinking on \'Going Places\' — analysing the text to reach.',
          hint: 'Review c12_eng_f_cbse_08_009 (Literary Devices: Irony and Symbolism) for narrative.',
          misconception: 'Students frequently interpret Sophie\'s Danny Casey story as a deliberate lie to impress others, missing that.',
          parts: [
                { id: 'a', prompt: 'Explain why Sophie\'s fantasy about Danny Casey is structurally different from her fantasy about the boutique.', answer: 'The boutique fantasy is presented as future-oriented aspiration ("When I leave',
                  options: ['The boutique fantasy is presented as future-oriented aspiration ("When I leave', 'just dreams'],
                  hint: 'Review c12_eng_f_cbse_08_009 (Literary Devices: Irony and Symbolism) for narrative technique.',
                  misconception: 'Students frequently interpret Sophie\'s Danny Casey story as a deliberate lie to impress others, missing that it functions primarily as.' },
                { id: 'b', prompt: 'Apply the concept of "unreliable narrator" to Sophie. Is Sophie an unreliable narrator?', answer: 'Sophie is a character, not the narrator',
                  options: ['Sophie is a character, not the narrator', 'unreliable narrator'],
                  hint: 'Review c12_eng_f_cbse_08_009 (Literary Devices: Irony and Symbolism) for narrative technique.',
                  misconception: 'Students frequently interpret Sophie\'s Danny Casey story as a deliberate lie to impress others, missing that it functions primarily as.' }
          ],
            remediations: { 'students-frequently-interpret-sophie-s': { steps: ['Re-read the canal scene (final 3 paragraphs) aloud, highlighting every phrase indicating Sophie\'s *awareness* of the.', 'Contrast with the opening boutique scene: list three differences in how Sophie *performs* vs *inhabits* each fantasy.', 'Complete this sentence stem: "Sophie\'s fantasy is not a lie because ______." 4.', 'Re-attempt Diagnostic Question 5 with this framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_014', difficulty: 'standard',
          question: 'Writing skills from \'Going Places\' — using the text as a model or springboard.',
          hint: 'If stuck, revisit c12_eng_f_cbse_08_012 (Comprehension) for evidence-finding practice and.',
          misconception: 'Students often think "writing based on the chapter" means retelling the story.',
          parts: [
                { id: 'a', prompt: 'Write a PEEL paragraph analyzing Sophie\'s relationship with her brother Geoff, using one piece of textual evidence.', answer: 'Point: Sophie idolizes Geoff as a gateway to the wider world',
                  options: ['Point: Sophie idolizes Geoff as a gateway to the wider world', 'writing based on the chapter', 'based on', '"writing based on the chapter" means retelling the story'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_08_012 (Comprehension) for evidence-finding practice and.',
                  misconception: 'Students often think "writing based on the chapter" means retelling the story.' },
                { id: 'b', prompt: 'Compare the writing style required for a TV interview script with that of a diary entry from Sophie\'s perspective. How do tone, audience, and purpose differ?', answer: 'A TV interview script is public, structured, and designed to engage an audience',
                  options: ['A TV interview script is public, structured, and designed to engage an audience', 'informal writing', 'writing based on the chapter', 'based on'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_08_012 (Comprehension) for evidence-finding practice and.',
                  misconception: 'Students often think "writing based on the chapter" means retelling the story.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['Re-read the NCERT "Writing" section at the end of the chapter.', 'Identify the exact task: interview questions for YOUR role model.', 'Review the difference between summary and original composition using Worked Example 1.', 'Practice by listing three role models and drafting two questions for each, checking if they are open-ended and thematic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "writing based on the chapter" means retelling the story.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s interview question for a role model: "Are you famous?" Is it effective? Why or why not?', answer: 'Ineffective',
                  options: ['Ineffective', 'writing based on the chapter', 'based on', '"writing based on the chapter" means retelling the story'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_08_012 (Comprehension) for evidence-finding practice and.',
                  misconception: 'Students often think "writing based on the chapter" means retelling the story.' },
                { id: 'b', prompt: 'Create a set of five interview questions for a role model of your choice (e.g., a scientist, athlete, artist) that progress from personal background.', answer: 'Example for Dr',
                  options: ['Example for Dr', 'writing based on the chapter', 'based on', '"writing based on the chapter" means retelling the story'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_08_012 (Comprehension) for evidence-finding practice and.',
                  misconception: 'Students often think "writing based on the chapter" means retelling the story.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['Re-read the NCERT "Writing" section at the end of the chapter.', 'Identify the exact task: interview questions for YOUR role model.', 'Review the difference between summary and original composition using Worked Example 1.', 'Practice by listing three role models and drafting two questions for each, checking if they are open-ended and thematic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_015', difficulty: 'standard',
          question: 'Discussion points on \'Going Places\' — speaking and listening around the text.',
          hint: 'If stuck, return to c12_eng_f_cbse_08_012 (comprehension) to re-locate textual evidence.',
          misconception: 'Students treat "Speaking and Listening" as informal chat — they share personal opinions ("I think Sophie is silly").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Going Places\'',
                  options: ['Discussion points on \'Going Places\'', '\'Going Places\' (Flamingo, ch', 'The plot/narrative arc of \'Going Places\'', 'The setting of \'Going Places\''],
                  hint: 'If stuck, return to c12_eng_f_cbse_08_012 (comprehension) to re-locate textual evidence, and.',
                  misconception: 'Students treat "Speaking and Listening" as informal chat — they share personal opinions ("I think Sophie is silly") without anchoring.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['If a student cannot move beyond personal opinion: (1) Give them the "Evidence First" protocol — before speaking, they.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
