import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch07_p1: SimDef = {
    id: 'v3_c11_psy_ch07_p1',
    title: 'Thinking · Part 1/2',
    subtitle: 'Draw the line between having thoughts and doing thinking.',
    classLevel: 11, subject: 'psychology', topic: 'Thinking · Part 1/2',
    chapters: ['c11_psy_ch07'],
    nodeIds: ['c11_psy_cbse_07_001', 'c11_psy_cbse_07_002', 'c11_psy_cbse_07_003', 'c11_psy_cbse_07_004', 'c11_psy_cbse_07_005', 'c11_psy_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cognitive scientist policing the definition', intro: 'Your mind wanders all day — but psychology reserves \'thinking\' for the moments it works toward something.', goal: 'Define thinking as goal-directed manipulation and separate format myths from strategy.' },
    discovery: {
        question: '\'Thinking is when thoughts come to mind\' — daydreaming, worrying, recalling a number all qualify?',
        options: ['No — thinking is active, goal-directed manipulation of mental representations; passive mental drift isn\'t thinking in the psychological sense', 'Yes — any mental content is thinking', 'Yes — worrying is thinking about problems', 'No — only logic counts as thinking'],
        answer: 'No — thinking is active, goal-directed manipulation of mental representations; passive mental drift isn\'t thinking in the psychological sense',
        hook: '\'I\'m a visual thinker, not a verbal one\' is a myth — everyone rotates images for one task and runs propositions for another; format follows the task.',
    },
    teaching: [
        { title: 'Nature of Thinking: Definition and Characteristics', text: 'Thinking is a higher-order, internal cognitive process that involves the goal-directed manipulation and analysis of acquired information through mental representations (mental images and concepts).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the exam answer \'thinking is a mental process we can\'t see\' against NCERT criteria, then test whether two-word \'telegraphic\' speech proves innate syntax.',
        labels: ['Nature of Thinking: Definition', 'Building Blocks of Thought', 'Types of Thinking: Concrete,', 'Problem Solving: Stages', 'Reasoning: Deductive and Inductive', 'Decision Making: Heuristics'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_002', title: 'Building Blocks of Thought: Mental Images, Concepts and Language',
          caseStudy: { intro: 'Imagine you are describing your childhood home to a friend who has never seen it—you might "see" the red gate, smell the jasmine, hear the ceiling fan; this.',
            decisions: [{ prompt: 'Define "concept" as used in cognitive psychology and give one example of a natural concept and one artificial concept with their defining.', options: [
                { text: 'A concept is a mental representation of a category of objects, events, or ideas that', outcome: 'A concept is a mental representation of a category of objects, events, or ideas that share common.' },
                { text: 'concept is just a word', outcome: 'Not quite — Students believe "thinking in words" and "thinking in images" are mutually exclusive styles.', reveals: 'thinking-in-words-and-thinking' },
                { text: 'thinking in words', outcome: 'Not quite — Students believe "thinking in words" and "thinking in images" are mutually exclusive styles.', reveals: 'thinking-in-words-and-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_003', title: 'Types of Thinking: Concrete, Abstract and Autistic',
          caseStudy: { intro: 'Imagine a Class 11 student solving "If all roses are flowers, and some flowers fade quickly, can we conclude some roses fade quickly?" — this requires abstract.',
            decisions: [{ prompt: 'A student says: "Concrete thinking means thinking about solid objects like tables and chairs, while abstract thinking means thinking about.', options: [
                { text: 'The error is confusing "concrete/abstract" as physical states of matter', outcome: 'The error is confusing "concrete/abstract" as physical states of matter (solid/liquid/gas) rather.' },
                { text: 'concrete/abstract', outcome: 'Not quite — Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical.', reveals: 'autistic-thinking-refers-to-autism' },
                { text: 'autistic thinking', outcome: 'Not quite — Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical.', reveals: 'autistic-thinking-refers-to-autism' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_004', title: 'Problem Solving: Stages and Strategies',
          caseStudy: { intro: 'Imagine you are the class representative tasked with organizing a Teachers\' Day celebration with a budget of ₹5,000, a two-week deadline, and conflicting.',
            decisions: [{ prompt: 'What are the seven mental operations involved in problem solving, in the correct sequential order as per NCERT Table 7.1?', options: [
                { text: 'The seven operations in order are: (1) Identify the problem, (2) Represent the problem,', outcome: 'The seven operations in order are: (1) Identify the problem, (2) Represent the problem, (3) Plan.' },
                { text: 'find answer quickly', outcome: 'Not quite — Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not.', reveals: 'mental-set-and-functional-fixedness' },
                { text: 'mental set', outcome: 'Not quite — Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not.', reveals: 'mental-set-and-functional-fixedness' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_005', title: 'Reasoning: Deductive and Inductive Reasoning',
          caseStudy: { intro: 'Imagine you are a detective arriving at a crime scene: you see a broken window (observation) and hypothesize a burglary (general conclusion) — that.',
            decisions: [{ prompt: 'Define deductive reasoning and give one example from daily life that is not from the textbook.', options: [
                { text: 'Deductive reasoning is reasoning from a general principle or premise to a specific', outcome: 'Deductive reasoning is reasoning from a general principle or premise to a specific conclusion;.' },
                { text: 'always correct', outcome: 'Not quite — Students often believe deductive reasoning is "always correct" and inductive reasoning is "just.', reveals: 'deductive-reasoning-is-always-correct' },
                { text: 'just guessing', outcome: 'Not quite — Students often believe deductive reasoning is "always correct" and inductive reasoning is "just.', reveals: 'deductive-reasoning-is-always-correct' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_006', title: 'Decision Making: Heuristics and Biases',
          caseStudy: { intro: 'Imagine you are choosing a stream for Class 11: Science, Commerce, or Humanities.',
            decisions: [{ prompt: 'Define "heuristic" in the context of decision making and give one example from daily life.', options: [
                { text: 'A heuristic is a mental shortcut or rule of thumb that reduces the cognitive load of', outcome: 'A heuristic is a mental shortcut or rule of thumb that reduces the cognitive load of decision.' },
                { text: 'heuristic is a bias', outcome: 'Not quite — Students often believe that "heuristic = bias" and that using heuristics means one is being stupid.', reveals: 'heuristic-bias-and-that-using' },
                { text: 'heuristic is a logical formula', outcome: 'Not quite — Students often believe that "heuristic = bias" and that using heuristics means one is being stupid.', reveals: 'heuristic-bias-and-that-using' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a problem-solving elective, a student says: \'Daydreaming about the answer IS thinking — thoughts are thoughts. And I\'m a visual thinker, so logic problems aren\'t for me.\'',
            decisions: [{ prompt: 'What does the psychology of thinking require?', options: [
                { text: 'Apply the goal-directed test: thinking is active manipulation of mental representations toward a goal — generating, evaluating, organising — not passive thoughts drifting by; waiting for inspiration isn\'t thinking until he works the material. And visual vs verbal isn\'t a fixed identity: everyone flexibly uses images and concepts by task — mental rotation calls imagery, syllogisms call propositions.', outcome: 'He stops self-excluding: \'learning styles\' aren\'t cages — thinking is strategy selection among representations, not a personality type.' },
                { text: 'Accept the loose sense — any conscious mental activity counts as thinking.', outcome: 'That erases the definition\'s core: thinking is goal-directed transformation between stimulus and response — the chess player\'s move reveals it, the stare doesn\'t.', reveals: 'any-thought-is-thinking' },
                { text: 'Honour the visualiser label — match him to image tasks and skip logic.', outcome: 'The styles myth misreads flexibility as fixedness: everyone commands both formats; declaring \'I can\'t do logic\' mistakes a preference for a limit.', reveals: 'visual-thinker-cant-do-logic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Recalling a phone number isn\'t thinking — reshaping what you know to reach a goal is.',
            decisions: [{ prompt: 'What comes next? Thinking · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Thinking · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_001', difficulty: 'standard',
          question: 'Thinking is a higher-order, internal cognitive process that involves the.',
          hint: 'Revisit Class 10 Biology Chapter 2: "Human Nervous System" (neuron structure) and "Human.',
          misconception: 'Students equate "thinking" with *any* conscious mental activity — daydreaming, worrying, recalling a phone number,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Thinking is a higher-order, internal cognitive process that involves the goal-directed',
                  options: ['Thinking is a higher-order, internal cognitive process that involves the goal-directed', 'The building blocks of thought are the fundamental mental representations—mental images', 'Types of thinking classify cognitive processes based on their relationship to reality and', 'Problem solving is a goal-directed cognitive process that involves identifying a'],
                  hint: 'Revisit Class 10 Biology Chapter 2: "Human Nervous System" (neuron structure) and "Human Brain".',
                  misconception: 'Students equate "thinking" with *any* conscious mental activity — daydreaming, worrying, recalling a phone number, or perceiving a face.' }
          ],
            remediations: { 'students-equate-thinking-with-any': { steps: ['Ask the student to list five things they "did mentally" in the last hour.', 'For each, ask: "Was there a *goal*? Did you *actively transform* information (compare, combine, infer) or just.', 'Use the NCERT chess player: "The player *simulated moves* — that\'s manipulation.', 'Have them rewrite their example adding a goal and a manipulation step (e.g., "I *compared* two routes to *minimise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_002', difficulty: 'standard',
          question: 'The building blocks of thought are the fundamental mental.',
          hint: 'Revisit "Nature of Thinking: Definition and Characteristics" (c11_psy_cbse_07_001).',
          misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs.',
          parts: [
                { id: 'a', prompt: 'Compare linguistic relativity (Whorf) and cognitive primacy (Piaget) on the thought-language relationship.', answer: 'Whorf: language structure constrains thought categories (strong determinism) or',
                  options: ['Whorf: language structure constrains thought categories (strong determinism) or', 'thinking in words', 'thinking in images', 'I\'m a visual thinker so I can\'t do logic problems'],
                  hint: 'Revisit "Nature of Thinking: Definition and Characteristics" (c11_psy_cbse_07_001) focusing on the.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' }
          ],
            remediations: { 'thinking-in-words-and-thinking': { steps: ['Have student perform two tasks: (a) mentally rotate letter \'R\' to match target (image-based), (b) evaluate "All A are.', 'Ask: "Which format did each task require?', 'Explain: Cognitive flexibility means selecting representation fit-for-task.', 'Assign: Read Kosslyn\'s "Image and Mind" Ch.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The telegraphic speech stage (two-word utterances) proves children have innate syntactic knowledge because they omit function words but.', answer: 'The claim overinterprets',
                  options: ['The claim overinterprets', 'thinking in words', 'thinking in images', 'I\'m a visual thinker so I can\'t do logic problems'],
                  hint: 'Revisit "Nature of Thinking: Definition and Characteristics" (c11_psy_cbse_07_001) focusing on the.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' },
                { id: 'b', prompt: 'Design a simple experiment to test whether forming a mental image interferes with concurrent visual perception (perceptual interference hypothesis).', answer: 'IV: Task type (mental imagery vs',
                  options: ['IV: Task type (mental imagery vs', 'thinking in words', 'thinking in images', 'I\'m a visual thinker so I can\'t do logic problems'],
                  hint: 'Revisit "Nature of Thinking: Definition and Characteristics" (c11_psy_cbse_07_001) focusing on the.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' }
          ],
            remediations: { 'thinking-in-words-and-thinking': { steps: ['Have student perform two tasks: (a) mentally rotate letter \'R\' to match target (image-based), (b) evaluate "All A are.', 'Ask: "Which format did each task require?', 'Explain: Cognitive flexibility means selecting representation fit-for-task.', 'Assign: Read Kosslyn\'s "Image and Mind" Ch.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_003', difficulty: 'standard',
          question: 'Types of thinking classify cognitive processes based on their relationship.',
          hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction.',
          misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.',
          parts: [
                { id: 'a', prompt: 'A student says: "Concrete thinking means thinking about solid objects like tables and chairs, while abstract thinking means thinking about liquids and gases.".', answer: 'The error is confusing "concrete/abstract" as physical states of matter',
                  options: ['The error is confusing "concrete/abstract" as physical states of matter', 'concrete/abstract', 'autistic thinking'],
                  hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction between.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' },
                { id: 'b', prompt: 'Explain why a 7-year-old child who arranges toy cars by size is demonstrating concrete thinking, while a 15-year-old who designs a traffic flow algorithm using.', answer: 'The 7-year-old\'s thinking is concrete',
                  options: ['The 7-year-old\'s thinking is concrete', 'complexity', 'misses the defining criterion: dependence on vs'],
                  hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction between.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' },
                { id: 'c', prompt: 'Classify each scenario and justify your classification using one defining criterion per type: (a) A poet imagines a conversation with a river, asking it about.', answer: '(a) **Autistic thinking**',
                  options: ['(a) **Autistic thinking**', 'autistic thinking'],
                  hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction between.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' }
          ],
            remediations: { 'autistic-thinking-refers-to-autism': { steps: ['If a student confuses autistic thinking with ASD: **Step 1** — Show the etymology: Bleuler (1911) coined *autismus*.', '**Step 2** — Contrast: In ASD, "autistic" describes a neurodevelopmental condition; in thinking types, it describes.', '**Step 3** — Give a personal example: "When you imagined your acceptance speech for a prize you haven\'t won — that was.', 'Were you disordered?" **Step 4** — Reinforce with NCERT language: "Autistic thinking is characterised by free.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_004', difficulty: 'standard',
          question: 'Problem solving is a goal-directed cognitive process that involves identifying.',
          hint: 'Revisit c11_psy_cbse_07_001 (Nature of Thinking) and practice inferring mental steps from.',
          misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking.',
          parts: [
                { id: 'a', prompt: 'A student solves five consecutive math problems using the formula "B – A – 2C".', answer: 'The obstacle is mental set—a tendency to repeat a previously successful strategy',
                  options: ['The obstacle is mental set—a tendency to repeat a previously successful strategy', 'mental set', 'functional fixedness', 'being stubborn'],
                  hint: 'Revisit c11_psy_cbse_07_001 (Nature of Thinking) and practice inferring mental steps from overt.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' },
                { id: 'b', prompt: 'You have three bottles: A (15 ml), B (40 ml), C (5 ml). You need exactly 30 ml of water.', answer: 'Step 1: Fill B (40 ml)',
                  options: ['Step 1: Fill B (40 ml)', 'mental set', 'functional fixedness', 'being stubborn'],
                  hint: 'Revisit c11_psy_cbse_07_001 (Nature of Thinking) and practice inferring mental steps from overt.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' },
                { id: 'c', prompt: 'Compare and contrast how "lack of motivation" differs from "mental set" as an obstacle to problem solving in terms of (a) cognitive mechanism, (b) typical.', answer: 'cognitive mechanism, (',
                  options: ['cognitive mechanism, (', 'thinking errors', 'mental set', 'functional fixedness'],
                  hint: 'Revisit c11_psy_cbse_07_001 (Nature of Thinking) and practice inferring mental steps from overt.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' }
          ],
            remediations: { 'mental-set-and-functional-fixedness': { steps: ['**Contrast drill**: Present paired scenarios—one procedural (math strategy), one object-use (hammer vs.', 'book)—and ask student to label the obstacle and justify using the definitions: "Is the rigidity in the *method* or the.', '**Self-monitoring log**: Have student solve 5 insight problems (e.g., Duncker\'s candle, two-string problem) and after.', 'Was I fixated on an object\'s usual use?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_005', difficulty: 'standard',
          question: 'Reasoning is a goal-directed cognitive process of drawing conclusions.',
          hint: 'Revisit c11_psy_cbse_07_002 (Building Blocks of Thought) to review concepts and mental.',
          misconception: 'Students often believe deductive reasoning is "always correct" and inductive reasoning is "just guessing." They fail.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the conclusion "All crows are black because I have seen 100 black crows" is an inductive argument and not a deductive one.', answer: 'The argument is inductive',
                  options: ['The argument is inductive', 'always correct', 'just guessing', 'All birds fly; Penguins are birds; Therefore penguins fly'],
                  hint: 'Revisit c11_psy_cbse_07_002 (Building Blocks of Thought) to review concepts and mental images, and.',
                  misconception: 'Students often believe deductive reasoning is "always correct" and inductive reasoning is "just guessing." They fail to see that.' },
                { id: 'b', prompt: 'A student argues: "Every time I study with music, I get good marks.', answer: 'This is inductive reasoning (specific instances → general causal claim)',
                  options: ['This is inductive reasoning (specific instances → general causal claim)', 'always correct', 'just guessing', 'All birds fly; Penguins are birds; Therefore penguins fly'],
                  hint: 'Revisit c11_psy_cbse_07_002 (Building Blocks of Thought) to review concepts and mental images, and.',
                  misconception: 'Students often believe deductive reasoning is "always correct" and inductive reasoning is "just guessing." They fail to see that.' },
                { id: 'c', prompt: 'Compare deductive and inductive reasoning on three dimensions: (a) direction of inference, (b) certainty of conclusion, (c) dependence on premise truth.', answer: 'direction of inference, (',
                  options: ['direction of inference, (', 'always correct', 'just guessing', 'All birds fly; Penguins are birds; Therefore penguins fly'],
                  hint: 'Revisit c11_psy_cbse_07_002 (Building Blocks of Thought) to review concepts and mental images, and.',
                  misconception: 'Students often believe deductive reasoning is "always correct" and inductive reasoning is "just guessing." They fail to see that.' }
          ],
            remediations: { 'deductive-reasoning-is-always-correct': { steps: ['Present the "penguin" deductive example above and ask: "Is the logic valid?', 'Have the student write one deductive argument with a false premise and one strong inductive argument, then label each.', 'Use a Venn diagram: draw "Valid Deductive Arguments" and "Sound Deductive Arguments" as nested circles to visualize.', 'Assign a practice set of 5 mixed arguments; require classification + one-sentence justification for each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_006', difficulty: 'standard',
          question: 'Decision making is the cognitive process of selecting a course of action from.',
          hint: 'If stuck, revisit the "Obstacles to Solving Problems" section in c11_psy_cbse_07_004.',
          misconception: 'Students often believe that "heuristic = bias" and that using heuristics means one is being stupid or lazy.',
          parts: [
                { id: 'a', prompt: 'Rahul is buying a smartphone. He sees an advertisement claiming "India\'s No.', answer: 'Bias 1: Bandwagon effect / Social proof bias',
                  options: ['Bias 1: Bandwagon effect / Social proof bias', 'heuristic = bias', '"heuristic = bias" and that using heuristics means one is being stupid or lazy'],
                  hint: 'If stuck, revisit the "Obstacles to Solving Problems" section in c11_psy_cbse_07_004 (mental set.',
                  misconception: 'Students often believe that "heuristic = bias" and that using heuristics means one is being stupid or lazy.' },
                { id: 'b', prompt: 'Compare and contrast the availability heuristic and the representativeness heuristic using the following scenario: "After seeing news reports of airplane.', answer: 'Anika: Availability heuristic',
                  options: ['Anika: Availability heuristic', 'ignoring statistics', 'heuristic = bias', '"heuristic = bias" and that using heuristics means one is being stupid or lazy'],
                  hint: 'If stuck, revisit the "Obstacles to Solving Problems" section in c11_psy_cbse_07_004 (mental set.',
                  misconception: 'Students often believe that "heuristic = bias" and that using heuristics means one is being stupid or lazy.' }
          ],
            remediations: { 'heuristic-bias-and-that-using': { steps: ['Ask the student to define "heuristic" and "bias" separately on a whiteboard.', 'Present a clear case where a heuristic works perfectly (e.g., "If it looks like a snake, run" — recognition heuristic.', 'Present the same heuristic failing in a modern context (e.g., "This stock chart looks like a winner".', 'Have the student complete a table: Heuristic | Adaptive Function | Modern Mismatch | Resulting Bias.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
