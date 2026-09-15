import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch07_p2: SimDef = {
    id: 'v3_c11_psy_ch07_p2',
    title: 'Thinking · Part 2/2',
    subtitle: 'Draw the line between having thoughts and doing thinking.',
    classLevel: 11, subject: 'psychology', topic: 'Thinking · Part 2/2',
    chapters: ['c11_psy_ch07'],
    nodeIds: ['c11_psy_cbse_07_007', 'c11_psy_cbse_07_008', 'c11_psy_cbse_07_009', 'c11_psy_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cognitive scientist policing the definition', intro: 'Your mind wanders all day — but psychology reserves \'thinking\' for the moments it works toward something.', goal: 'Define thinking as goal-directed manipulation and separate format myths from strategy.' },
    discovery: {
        question: '\'Thinking is when thoughts come to mind\' — daydreaming, worrying, recalling a number all qualify?',
        options: ['No — thinking is active, goal-directed manipulation of mental representations; passive mental drift isn\'t thinking in the psychological sense', 'Yes — any mental content is thinking', 'Yes — worrying is thinking about problems', 'No — only logic counts as thinking'],
        answer: 'No — thinking is active, goal-directed manipulation of mental representations; passive mental drift isn\'t thinking in the psychological sense',
        hook: '\'I\'m a visual thinker, not a verbal one\' is a myth — everyone rotates images for one task and runs propositions for another; format follows the task.',
    },
    teaching: [
        { title: 'Nature of Creativity: Process and Stages', text: 'Creative thinking is a goal-directed cognitive process characterized by the production of novel, original, and contextually appropriate ideas or solutions, involving the dynamic interplay.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the exam answer \'thinking is a mental process we can\'t see\' against NCERT criteria, then test whether two-word \'telegraphic\' speech proves innate syntax.',
        labels: ['Nature of Creativity: Process', 'Developing Creative Thinking: Characteristics', 'Barriers to Effective Thinking', 'Relationship between Thought'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_007', title: 'Nature of Creativity: Process and Stages',
          caseStudy: { intro: 'Imagine you are trying to design a low-cost, eco-friendly cooler for a village without electricity.',
            decisions: [{ prompt: 'Define creative thinking according to NCERT Class 11 Psychology, explicitly naming the three criteria that distinguish it from mere novelty.', options: [
                { text: 'Creative thinking is the production of novel and original ideas or solutions that are', outcome: 'Creative thinking is the production of novel and original ideas or solutions that are also.' },
                { text: 'new ideas', outcome: 'Not quite — Students often believe the incubation stage is simply "taking a break" or "procrastinating," and.', reveals: 'the-incubation-stage-is-simply' },
                { text: 'thinking differently', outcome: 'Not quite — Students often believe the incubation stage is simply "taking a break" or "procrastinating," and.', reveals: 'the-incubation-stage-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_008', title: 'Developing Creative Thinking: Characteristics of Creative People',
          caseStudy: { intro: 'Imagine you are tasked with designing a low-cost water purification method for a rural Indian village using only locally available materials.',
            decisions: [{ prompt: 'List the four components of divergent thinking identified by J.P. Guilford and give a one-sentence definition for each.', options: [
                { text: 'Correct answer: (1) Fluency – ability to produce a large number of ideas for a given task', outcome: 'Correct answer: (1) Fluency – ability to produce a large number of ideas for a given task; (2).' },
                { text: 'originality is having many ideas', outcome: 'Not quite — Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They.', reveals: 'students-equate-creative-thinking-with' },
                { text: 'taking a break', outcome: 'Not quite — Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They.', reveals: 'students-equate-creative-thinking-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_009', title: 'Barriers to Effective Thinking and Problem Solving',
          caseStudy: { intro: 'Imagine you\'re trying to open a stuck jar lid. You keep twisting harder the same way—righty-tighty, lefty-loosey—but it won\'t budge.',
            decisions: [{ prompt: 'What are the three major barriers to effective problem solving identified in the NCERT textbook?', options: [
                { text: 'The three major barriers are mental set, functional fixedness, and lack of motivation', outcome: 'The three major barriers are mental set, functional fixedness, and lack of motivation.' },
                { text: 'confirmation bias', outcome: 'Not quite — Students often confuse mental set with functional fixedness, thinking both are "being stuck in old.', reveals: 'students-often-confuse-mental-set' },
                { text: 'availability heuristic', outcome: 'Not quite — Students often confuse mental set with functional fixedness, thinking both are "being stuck in old.', reveals: 'students-often-confuse-mental-set' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_010', title: 'Relationship between Thought and Language',
          caseStudy: { intro: 'Have you ever tried explaining the Hindi word "jootha" (food contaminated by someone\'s saliva) to an English speaker and realised there is no single-word.',
            decisions: [{ prompt: 'Name the three major theoretical perspectives on the relationship between thought and language discussed in Class 11 Psychology, and state.', options: [
                { text: 'The three perspectives are: (1) Whorf\'s Linguistic Relativity Hypothesis', outcome: 'The three perspectives are: (1) Whorf\'s Linguistic Relativity Hypothesis — language determines.' },
                { text: 'only two, or confusing Piaget and Vygotsky\'s developmental sequence', outcome: 'Not quite — Students conflate linguistic determinism (strong Whorf) with linguistic relativity (weak Whorf).', reveals: 'students-conflate-linguistic-determinism-strong' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a problem-solving elective, a student says: \'Daydreaming about the answer IS thinking — thoughts are thoughts. And I\'m a visual thinker, so logic problems aren\'t for me.\'',
            decisions: [{ prompt: 'What does the psychology of thinking require?', options: [
                { text: 'Apply the goal-directed test: thinking is active manipulation of mental representations toward a goal — generating, evaluating, organising — not passive thoughts drifting by; waiting for inspiration isn\'t thinking until he works the material. And visual vs verbal isn\'t a fixed identity: everyone flexibly uses images and concepts by task — mental rotation calls imagery, syllogisms call propositions.', outcome: 'He stops self-excluding: \'learning styles\' aren\'t cages — thinking is strategy selection among representations, not a personality type.' },
                { text: 'Accept the loose sense — any conscious mental activity counts as thinking.', outcome: 'That erases the definition\'s core: thinking is goal-directed transformation between stimulus and response — the chess player\'s move reveals it, the stare doesn\'t.', reveals: 'any-thought-is-thinking' },
                { text: 'Honour the visualiser label — match him to image tasks and skip logic.', outcome: 'The styles myth misreads flexibility as fixedness: everyone commands both formats; declaring \'I can\'t do logic\' mistakes a preference for a limit.', reveals: 'visual-thinker-cant-do-logic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'Recalling a phone number isn\'t thinking — reshaping what you know to reach a goal is.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_007', difficulty: 'standard',
          question: 'Creative thinking is a goal-directed cognitive process characterized by the.',
          hint: 'Revisit c11_psy_cbse_07_005 (Reasoning) to clarify how deductive reasoning maps.',
          misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination.',
          parts: [
                { id: 'a', prompt: 'Riya is designing a poster for a "Save Water" campaign. She lists 20 slogans (fluency), categorizes them into humor, fear, and hope appeals (flexibility).', answer: 'Listing 20 slogans → Fluency',
                  options: ['Listing 20 slogans → Fluency', 'flexibility', 'taking a break', 'procrastinating'],
                  hint: 'Revisit c11_psy_cbse_07_005 (Reasoning) to clarify how deductive reasoning maps to convergent.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' },
                { id: 'b', prompt: 'Compare the "vertical thinking" and "lateral thinking" approaches to solving the problem: "Reduce plastic waste in the school canteen." Provide one specific.', answer: 'Vertical thinking: Digging deeper in the same direction',
                  options: ['Vertical thinking: Digging deeper in the same direction', 'Lateral thinking: Digging a hole in a new place', 'A wrong answer that offers two vertical steps (e.g', 'fine students'],
                  hint: 'Revisit c11_psy_cbse_07_005 (Reasoning) to clarify how deductive reasoning maps to convergent.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' }
          ],
            remediations: { 'the-incubation-stage-is-simply': { steps: ['Ask the student to recall a personal "aha!" moment (e.g., solving a tough math problem).', 'Jointly trace backward: What specific preparation happened *before* the break?', '(e.g., "I tried 3 methods for 45 minutes").', 'Highlight: No preparation → no incubation substrate → no reliable illumination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination.',
          parts: [
                { id: 'a', prompt: 'Design a 10-minute classroom activity using Osborn\'s brainstorming principles to enhance divergent thinking on the topic "Reducing food waste in the school.', answer: 'Activity: "Wild Ideas Round"',
                  options: ['Activity: "Wild Ideas Round"', 'taking a break', 'procrastinating'],
                  hint: 'Revisit c11_psy_cbse_07_005 (Reasoning) to clarify how deductive reasoning maps to convergent.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' }
          ],
            remediations: { 'the-incubation-stage-is-simply': { steps: ['Ask the student to recall a personal "aha!" moment (e.g., solving a tough math problem).', 'Jointly trace backward: What specific preparation happened *before* the break?', '(e.g., "I tried 3 methods for 45 minutes").', 'Highlight: No preparation → no incubation substrate → no reliable illumination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_008', difficulty: 'standard',
          question: 'Creative thinking is a cognitive process characterized by the production.',
          hint: 'Revisit the "Divergent thinking abilities generally include fluency, flexibility.',
          misconception: 'Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They believe originality.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Creative thinking is a cognitive process characterized by the production of novel,',
                  options: ['Creative thinking is a cognitive process characterized by the production of novel,', 'Thinking is a higher-order, internal cognitive process that involves the goal-directed', 'The building blocks of thought are the fundamental mental representations—mental images', 'Types of thinking classify cognitive processes based on their relationship to reality and'],
                  hint: 'Revisit the "Divergent thinking abilities generally include fluency, flexibility, originality, and.',
                  misconception: 'Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They believe originality means "never been done.' }
          ],
            remediations: { 'students-equate-creative-thinking-with': { steps: ['Revisit the divergent thinking components in node c11_psy_cbse_07_007: create a 2x2 matrix (Fluency/Flexibility.', 'Practice a daily 5-minute "Alternative Uses" drill for 7 days on common objects (newspaper, chair, pen) – track fluency.', 'For incubation confusion: assign a "problem-loading" exercise – spend 10 minutes intensely analyzing a problem, then.', 'For originality misconception: use the "statistical rarity" definition – have students generate ideas for a prompt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_009', difficulty: 'standard',
          question: 'Barriers to effective thinking and problem solving are cognitive and.',
          hint: 'Review the "Mental Operations Involved in Solving a Problem" table (Table 7.1) in NCERT.',
          misconception: 'Students often confuse mental set with functional fixedness, thinking both are "being stuck in old ways." Specifically.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast mental set and functional fixedness. How are their cognitive mechanisms similar and different?', answer: 'Similarity: Both involve cognitive rigidity—sticking to familiar patterns',
                  options: ['Similarity: Both involve cognitive rigidity—sticking to familiar patterns', 'phones are for calling', 'being stuck in old ways', 'mental set'],
                  hint: 'Review the "Mental Operations Involved in Solving a Problem" table (Table 7.1) in NCERT Chapter 7.',
                  misconception: 'Students often confuse mental set with functional fixedness, thinking both are "being stuck in old ways." Specifically, they label ANY.' }
          ],
            remediations: { 'students-often-confuse-mental-set': { steps: ['Ask the student to solve the candle problem (attach candle to wall using box of tacks, matches, candle).', 'When they struggle, ask "What is the box for?" If they say "holding tacks," identify this as functional fixedness.', 'Then give them 3 math problems solved by the same method, followed by a 4th requiring a different method.', 'Have them articulate the difference: "Functional fixedness = I can\'t see the box AS a platform.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_010', difficulty: 'standard',
          question: 'The relationship between thought and language refers to the theoretical debate.',
          hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction.',
          misconception: 'Students conflate linguistic determinism (strong Whorf) with linguistic relativity (weak Whorf), believing Whorf.',
          parts: [
                { id: 'a', prompt: 'Name the three major theoretical perspectives on the relationship between thought and language discussed in Class 11 Psychology, and state the core claim.', answer: 'The three perspectives are: (1) Whorf\'s Linguistic Relativity Hypothesis',
                  options: ['The three perspectives are: (1) Whorf\'s Linguistic Relativity Hypothesis', 'only two, or confusing Piaget and Vygotsky\'s developmental sequence'],
                  hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction between.',
                  misconception: 'Students conflate linguistic determinism (strong Whorf) with linguistic relativity (weak Whorf), believing Whorf claimed language makes.' },
                { id: 'b', prompt: 'Compare Piaget\'s and Vygotsky\'s accounts of the developmental relationship between thought and language before age 2.', answer: 'the origin of each, (',
                  options: ['the origin of each, (', 'two independent roots'],
                  hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction between.',
                  misconception: 'Students conflate linguistic determinism (strong Whorf) with linguistic relativity (weak Whorf), believing Whorf claimed language makes.' }
          ],
            remediations: { 'students-conflate-linguistic-determinism-strong': { steps: ['Create a three-column comparison table: Theory | Direction of Causality | Developmental Claim | Key Evidence | Role.', 'Fill it collaboratively with the student.', 'Use the kinship term example (chacha/mama/tau vs uncle) to practice classifying statements as "determinism,".', 'Map the developmental sequence on a timeline: birth — 2 years — 7 years, marking Piaget\'s "preoperational egocentric.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
