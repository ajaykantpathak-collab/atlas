import type { SimDef } from '../../engine/types';
import C11_PsyThinkingCBSESim from '../../../simulations/c6_12_new/C11_PsyThinkingCBSESim';

/** v3 wrapped master — C11_PsyThinkingCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psythinkingcbsesim: SimDef = {
    id: 'v3w_c11_psythinkingcbsesim',
    title: 'Psy Thinking CBSE',
    subtitle: 'This node covers the NCERT definition of thinking, its core characteristics (internal,.',
    classLevel: 11, subject: 'science', topic: 'Nature of Thinking: Definition and Characteristics',
    chapters: [],
    nodeIds: ['c11_psy_cbse_07_001', 'c11_psy_cbse_07_002', 'c11_psy_cbse_07_003', 'c11_psy_cbse_07_004', 'c11_psy_cbse_07_007', 'c11_psy_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are watching a Class 11 student staring at a complex physics numerical for five minutes without.', goal: 'Master Psy Thinking CBSE.' },
    discovery: {
        question: 'Compare linguistic relativity (Whorf) and cognitive primacy (Piaget) on the thought-language relationship.',
        options: ['Whorf: language structure constrains thought categories (strong determinism) or', 'thinking in words', 'thinking in images'],
        answer: 'Whorf: language structure constrains thought categories (strong determinism) or',
        hook: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs.',
    },
    teaching: [
        { title: 'Thinking is a higher-order, internal.', text: 'Thinking is a higher-order, internal cognitive process that involves the goal-directed manipulation and analysis of acquired information through mental representations (mental images and concepts) to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_07_001', title: 'Thinking is a higher-order, internal.',
          scaffold: { problem: 'A Class 11 student, Priya, needs to prepare for her Psychology exam in 3 days.',
            steps: [
            { text: 'Identify the *goal* — passing the exam (score maximisation) within 3 days/20 hours. This maps to "goal-directed".' },
            { text: 'Identify the *internal manipulation* — Priya *simulates* allocations, *compares* alternatives (e.g., equal time vs.' },
            { text: 'Identify the *organisation* — the plan has sequential steps (review → learn → practice → mock), conditional branches.' },
            { text: 'Identify the *inference from behaviour* — we know she planned because she *opens Chapter 5 first* (not Chapter 1, not a.' },
            { text: 'Verify all four characteristics are distinct: goal (pass exam), internal (mental simulation), organised (structured.', faded: true, blankAnswer: '(1) Goal-directed: maximise exam score in 20h/3days. (2).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_07_002', title: 'The building blocks of thought are the.',
          scaffold: { problem: 'A Class 11 student is asked to solve: "How many windows are in your house?" They report "seeing" each room and counting windows.',
            steps: [
            { text: 'Identify the task type—window counting requires access to specific spatial layout of a particular house (episodic,.' },
            { text: 'Recognize the student\'s report ("seeing each room") indicates mental imagery: a depictive representation preserving.' },
            { text: 'Trace the process: (a) Retrieve house schema from long-term memory, (b) Generate mental image of each room.' },
            { text: 'Contrast with "What is a window?"—this asks for category knowledge (concept), not a specific instance.' },
            { text: 'Explain format difference: Image is analog, modality-specific (visual), particular (this house); concept is amodal,.' },
            { text: 'Note efficiency: Counting via image is slow (serial scan); concept retrieval is fast (parallel access to defining.', faded: true, blankAnswer: 'Window counting uses mental imagery (depictive, analog,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_07_003', title: 'Types of thinking classify cognitive.',
          scaffold: { problem: 'A Class 11 student encounters this physics problem: "A 0.5 kg ball is dropped from 10 m.',
            steps: [
            { text: 'Stage (a) — visualizing the ball falling — uses a mental image of a specific ball, specific height, specific motion;.' },
            { text: 'Stage (b) — selecting v² = u² + 2gh — operates on symbols (v, u, g, h) representing physical quantities as abstract.' },
            { text: 'Stage (c) — substituting and computing — manipulates numerical symbols via algebraic rules; the numbers 0.5, 10, 9.8.' },
            { text: 'Stage (d) — daydreaming "gravity reverses" — generates a scenario violating physical laws for imaginative play,.' },
            { text: 'Verify: Concrete = sensory-bound particular; Abstract = symbolic, general, rule-governed; Autistic = reality-detached,.', faded: true, blankAnswer: '(a) Concrete, (b) Abstract, (c) Abstract, (d) Autistic' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_07_004', title: 'Problem solving is a goal-directed.',
          scaffold: { problem: 'A student has three measuring cylinders: A (12 ml), B (35 ml), C (4 ml). She needs exactly 23 ml of solution for an experiment.',
            steps: [
            { text: 'Identify given: capacities A=12, B=35, C=4; target=23 ml. Standard sequence: B → A → C → C.' },
            { text: 'Simulate B → A: Fill B (35 ml), pour into A until full → B now has 35-12 = 23 ml. A is full (12 ml).' },
            { text: 'Simulate first C transfer: Pour from B into C until C full → B now has 23-4 = 19 ml. C is full (4 ml).' },
            { text: 'Empty C. Simulate second C transfer: Pour from B into C again → B now has 19-4 = 15 ml. C is full (4 ml).' },
            { text: 'Final amount in B = 15 ml ≠ 23 ml. Sequence fails. Check simpler method: Step 2 already gave 23 ml in B after pouring.', faded: true, blankAnswer: 'The B–A–2C sequence yields 15 ml, not 23 ml. The target 23.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_07_007', title: 'Creative thinking is a goal-directed.',
          scaffold: { problem: 'A Class 11 student, Arjun, wants to create a unique science fair project on "Water Conservation." He spends two weeks researching.',
            steps: [
            { text: 'Identify the preparation stage — Arjun\'s two-week research on traditional and modern methods saturates his mind with.' },
            { text: 'Identify the incubation stage — The three-day cricket break where he consciously avoids the problem allows unconscious.' },
            { text: 'Identify the illumination stage — The sudden "hybrid model" insight while washing hands (a mundane, relaxed activity).' },
            { text: 'Identify the verification stage — Building and testing the prototype for a month applies convergent thinking to.' },
            { text: 'Verify completeness — All four stages are present in correct sequence with stage-appropriate activities; no stage is.', faded: true, blankAnswer: 'Preparation = 2-week research; Incubation = 3-day cricket.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_07_008', title: 'Creative thinking is a cognitive.',
          scaffold: { problem: 'A Class 11 student wants to enhance creative thinking for the "KVPY Science Fair Project" using Osborn\'s brainstorming.',
            steps: [
            { text: 'Warm-up (2 min) – Do "Alternative Uses" for a cucumber: list 10 non-food uses (e.g., phone stand, stamp, cooling eye.' },
            { text: 'Problem framing (1 min) – Write the exact challenge: "In how many ways can a student detect pesticide residues on.' },
            { text: 'Idea generation (10 min) – Set timer. Apply four rules: (a) No criticism – even absurd ideas (e.g., "train ants to.' },
            { text: 'Capture method – Use one A4 sheet per idea category (chemical, physical, biological, digital) with sticky notes; no.' },
            { text: 'Post-session clustering (2 min) – Group sticky notes into themes (e.g., "colorimetric," "enzymatic," "sensor-based"),.', faded: true, blankAnswer: 'A structured 15-minute solo brainstorming plan with.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_psy_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Psy Thinking CBSE', spots: [
            { id: 's1', label: 'Thinking is a higher-order internal', prompt: 'Which idea is this? — Thinking is a higher-order, internal cognitive process that involves the goal-directed.', answer: 'Thinking is a higher-order internal', options: ['Thinking is a higher-order internal', 'The building blocks of thought', 'Types of thinking classify cognitive', 'Problem solving is a goal-directed'] },
            { id: 's2', label: 'The building blocks of thought', prompt: 'Which idea is this? — The building blocks of thought are the fundamental mental representations—mental images.', answer: 'The building blocks of thought', options: ['The building blocks of thought', 'Thinking is a higher-order internal', 'Types of thinking classify cognitive', 'Problem solving is a goal-directed'] },
            { id: 's3', label: 'Types of thinking classify cognitive', prompt: 'Which idea is this? — Types of thinking classify cognitive processes based on their relationship to reality and.', answer: 'Types of thinking classify cognitive', options: ['Types of thinking classify cognitive', 'Thinking is a higher-order internal', 'The building blocks of thought', 'Problem solving is a goal-directed'] },
            { id: 's4', label: 'Problem solving is a goal-directed', prompt: 'Which idea is this? — Problem solving is a goal-directed cognitive process that involves identifying a.', answer: 'Problem solving is a goal-directed', options: ['Problem solving is a goal-directed', 'Thinking is a higher-order internal', 'The building blocks of thought', 'Types of thinking classify cognitive'] },
            { id: 's5', label: 'Creative thinking is a goal-directed', prompt: 'Which idea is this? — Creative thinking is a goal-directed cognitive process characterized by the production of.', answer: 'Creative thinking is a goal-directed', options: ['Creative thinking is a goal-directed', 'Thinking is a higher-order internal', 'The building blocks of thought', 'Types of thinking classify cognitive'] },
            { id: 's6', label: 'Creative thinking is a cognitive', prompt: 'Which idea is this? — Creative thinking is a cognitive process characterized by the production of novel,.', answer: 'Creative thinking is a cognitive', options: ['Creative thinking is a cognitive', 'Thinking is a higher-order internal', 'The building blocks of thought', 'Types of thinking classify cognitive'] }
          ] } }
    ],
    explore: { component: C11_PsyThinkingCBSESim, prompt: 'Explore the interactive — Psy Thinking CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_001', difficulty: 'standard',
          question: 'Thinking is a higher-order, internal cognitive process that involves the.',
          hint: 'Revisit Class 10 Biology Chapter 2: "Human Nervous System" (neuron structure) and "Human.',
          misconception: 'Students equate "thinking" with *any* conscious mental activity — daydreaming, worrying, recalling a phone number, or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Thinking is a higher-order, internal cognitive process that involves the goal-directed',
                  options: ['Thinking is a higher-order, internal cognitive process that involves the goal-directed', 'The building blocks of thought are the fundamental mental representations—mental images', 'Types of thinking classify cognitive processes based on their relationship to reality and', 'Problem solving is a goal-directed cognitive process that involves identifying a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "thinking" with *any* conscious mental activity — daydreaming, worrying, recalling a phone number, or perceiving a face.' }
          ],
            remediations: { 'students-equate-thinking-with-any': { steps: ['Ask the student to list five things they "did mentally" in the last hour.', 'For each, ask: "Was there a *goal*? Did you *actively transform* information (compare, combine, infer) or just.', 'Use the NCERT chess player: "The player *simulated moves* — that\'s manipulation.', 'Have them rewrite their example adding a goal and a manipulation step (e.g., "I *compared* two routes to *minimise.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_002', difficulty: 'standard',
          question: 'The building blocks of thought are the fundamental mental.',
          hint: 'Revisit "Nature of Thinking: Definition and Characteristics" (c11_psy_cbse_07_001).',
          misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs.',
          parts: [
                { id: 'a', prompt: 'Compare linguistic relativity (Whorf) and cognitive primacy (Piaget) on the thought-language relationship.', answer: 'Whorf: language structure constrains thought categories (strong determinism) or',
                  options: ['Whorf: language structure constrains thought categories (strong determinism) or', 'thinking in words', 'thinking in images'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' }
          ],
            remediations: { 'thinking-in-words-and-thinking': { steps: ['Have student perform two tasks: (a) mentally rotate letter \'R\' to match target (image-based), (b) evaluate "All A are.', 'Ask: "Which format did each task require?', 'Explain: Cognitive flexibility means selecting representation fit-for-task.', 'Assign: Read Kosslyn\'s "Image and Mind" Ch.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The telegraphic speech stage (two-word utterances) proves children have innate syntactic knowledge because they omit function words but.', answer: 'The claim overinterprets',
                  options: ['The claim overinterprets', 'thinking in words', 'thinking in images', 'I\'m a visual thinker so I can\'t do logic problems'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' },
                { id: 'b', prompt: 'Design a simple experiment to test whether forming a mental image interferes with concurrent visual perception (perceptual interference hypothesis).', answer: 'IV: Task type (mental imagery vs',
                  options: ['IV: Task type (mental imagery vs', 'thinking in words', 'thinking in images', 'I\'m a visual thinker so I can\'t do logic problems'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' },
                { id: 'c', prompt: 'Compare linguistic relativity (Whorf) and cognitive primacy (Piaget) on the thought-language relationship.', answer: 'Whorf: language structure constrains thought categories (strong determinism) or',
                  options: ['Whorf: language structure constrains thought categories (strong determinism) or', 'thinking in words', 'thinking in images', 'I\'m a visual thinker so I can\'t do logic problems'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "thinking in words" and "thinking in images" are mutually exclusive styles (verbalizer vs. visualizer).' }
          ],
            remediations: { 'thinking-in-words-and-thinking': { steps: ['Have student perform two tasks: (a) mentally rotate letter \'R\' to match target (image-based), (b) evaluate "All A are.', 'Ask: "Which format did each task require?', 'Explain: Cognitive flexibility means selecting representation fit-for-task.', 'Assign: Read Kosslyn\'s "Image and Mind" Ch.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_003', difficulty: 'standard',
          question: 'Types of thinking classify cognitive processes based on their relationship to.',
          hint: 'Revisit c11_psy_cbse_07_002 "Building Blocks of Thought" — specifically the distinction.',
          misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.',
          parts: [
                { id: 'a', prompt: 'A student says: "Concrete thinking means thinking about solid objects like tables and chairs, while abstract thinking means thinking about liquids and gases.".', answer: 'The error is confusing "concrete/abstract" as physical states of matter',
                  options: ['The error is confusing "concrete/abstract" as physical states of matter', 'concrete/abstract', 'autistic thinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' },
                { id: 'b', prompt: 'Explain why a 7-year-old child who arranges toy cars by size is demonstrating concrete thinking, while a 15-year-old who designs a traffic flow algorithm using.', answer: 'The 7-year-old\'s thinking is concrete',
                  options: ['The 7-year-old\'s thinking is concrete', 'complexity', 'misses the defining criterion: dependence on vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' },
                { id: 'c', prompt: 'Classify each scenario and justify your classification using one defining criterion per type: (a) A poet imagines a conversation with a river, asking it about.', answer: '(a) **Autistic thinking**',
                  options: ['(a) **Autistic thinking**', 'autistic thinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' }
          ],
            remediations: { 'autistic-thinking-refers-to-autism': { steps: ['If a student confuses autistic thinking with ASD: **Step 1** — Show the etymology: Bleuler (1911) coined *autismus*.', '**Step 2** — Contrast: In ASD, "autistic" describes a neurodevelopmental condition; in thinking types, it describes a.', '**Step 3** — Give a personal example: "When you imagined your acceptance speech for a prize you haven\'t won — that was.', 'Were you disordered?" **Step 4** — Reinforce with NCERT language: "Autistic thinking is characterised by free.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Autistic thinking is inferior to abstract thinking and should be eliminated from education." Use the concepts of *incubation stage in.', answer: '**Refute**',
                  options: ['**Refute**', 'autistic thinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' },
                { id: 'b', prompt: 'Create an original scenario involving a Class 11 student preparing for a physics exam that demonstrates *all three thinking types sequentially* in a single.', answer: '**Scenario**: Riya studies "Electromagnetic Induction." 1',
                  options: ['**Scenario**: Riya studies "Electromagnetic Induction." 1', 'autistic thinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "autistic thinking" refers to **Autism Spectrum Disorder (ASD)** or clinical pathology.' }
          ],
            remediations: { 'autistic-thinking-refers-to-autism': { steps: ['If a student confuses autistic thinking with ASD: **Step 1** — Show the etymology: Bleuler (1911) coined *autismus*.', '**Step 2** — Contrast: In ASD, "autistic" describes a neurodevelopmental condition; in thinking types, it describes a.', '**Step 3** — Give a personal example: "When you imagined your acceptance speech for a prize you haven\'t won — that was.', 'Were you disordered?" **Step 4** — Reinforce with NCERT language: "Autistic thinking is characterised by free.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_004', difficulty: 'standard',
          question: 'Problem solving is a goal-directed cognitive process that involves identifying.',
          hint: 'Revisit c11_psy_cbse_07_001 (Nature of Thinking) and practice inferring mental steps from.',
          misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking.',
          parts: [
                { id: 'a', prompt: 'A student solves five consecutive math problems using the formula "B – A – 2C".', answer: 'The obstacle is mental set—a tendency to repeat a previously successful strategy',
                  options: ['The obstacle is mental set—a tendency to repeat a previously successful strategy', 'mental set', 'functional fixedness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' },
                { id: 'b', prompt: 'You have three bottles: A (15 ml), B (40 ml), C (5 ml). You need exactly 30 ml of water.', answer: 'Step 1: Fill B (40 ml)',
                  options: ['Step 1: Fill B (40 ml)', 'mental set', 'functional fixedness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' },
                { id: 'c', prompt: 'Compare and contrast how "lack of motivation" differs from "mental set" as an obstacle to problem solving in terms of (a) cognitive mechanism, (b) typical.', answer: 'cognitive mechanism, (',
                  options: ['cognitive mechanism, (', 'thinking errors', 'mental set'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' }
          ],
            remediations: { 'mental-set-and-functional-fixedness': { steps: ['**Contrast drill**: Present paired scenarios—one procedural (math strategy), one object-use (hammer vs.', 'book)—and ask student to label the obstacle and justify using the definitions: "Is the rigidity in the *method* or the.', '**Self-monitoring log**: Have student solve 5 insight problems (e.g., Duncker\'s candle, two-string problem) and after.', 'Was I fixated on an object\'s usual use?" 3.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Algorithms guarantee a correct solution, so they are always the best problem-solving strategy." Use the concepts of problem space,.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'mental set', 'functional fixedness', 'being stubborn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' },
                { id: 'b', prompt: 'Design a novel "water bottle" problem (like NCERT Activity 7.2) that *requires* breaking mental set to solve efficiently.', answer: 'Example: Bottles A=8 ml, B=27 ml, C=3 ml',
                  options: ['Example: Bottles A=8 ml, B=27 ml, C=3 ml', 'mental set', 'functional fixedness', 'being stubborn'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "mental set" and "functional fixedness" are synonyms for "being stubborn" or "not thinking creatively." They incorrectly.' }
          ],
            remediations: { 'mental-set-and-functional-fixedness': { steps: ['**Contrast drill**: Present paired scenarios—one procedural (math strategy), one object-use (hammer vs.', 'book)—and ask student to label the obstacle and justify using the definitions: "Is the rigidity in the *method* or the.', '**Self-monitoring log**: Have student solve 5 insight problems (e.g., Duncker\'s candle, two-string problem) and after.', 'Was I fixated on an object\'s usual use?" 3.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_007', difficulty: 'standard',
          question: 'Creative thinking is a goal-directed cognitive process characterized by the.',
          hint: 'Revisit c11_psy_cbse_07_005 (Reasoning) to clarify how deductive reasoning maps to.',
          misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination.',
          parts: [
                { id: 'a', prompt: 'Riya is designing a poster for a "Save Water" campaign. She lists 20 slogans (fluency), categorizes them into humor, fear, and hope appeals (flexibility),.', answer: 'Listing 20 slogans → Fluency',
                  options: ['Listing 20 slogans → Fluency', 'flexibility', 'taking a break'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' },
                { id: 'b', prompt: 'Compare the "vertical thinking" and "lateral thinking" approaches to solving the problem: "Reduce plastic waste in the school canteen." Provide one specific.', answer: 'Vertical thinking: Digging deeper in the same direction',
                  options: ['Vertical thinking: Digging deeper in the same direction', 'Lateral thinking: Digging a hole in a new place', 'A wrong answer that offers two vertical steps (e.g'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' }
          ],
            remediations: { 'the-incubation-stage-is-simply': { steps: ['Ask the student to recall a personal "aha!" moment (e.g., solving a tough math problem).', 'Jointly trace backward: What specific preparation happened *before* the break?', '(e.g., "I tried 3 methods for 45 minutes").', 'Highlight: No preparation → no incubation substrate → no reliable illumination.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination.',
          parts: [
                { id: 'a', prompt: 'Design a 10-minute classroom activity using Osborn\'s brainstorming principles to enhance divergent thinking on the topic "Reducing food waste in the school.', answer: 'Activity: "Wild Ideas Round"',
                  options: ['Activity: "Wild Ideas Round"', 'taking a break', 'procrastinating'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' },
                { id: 'b', prompt: 'Compare the "vertical thinking" and "lateral thinking" approaches to solving the problem: "Reduce plastic waste in the school canteen." Provide one specific.', answer: 'Vertical thinking: Digging deeper in the same direction',
                  options: ['Vertical thinking: Digging deeper in the same direction', 'Lateral thinking: Digging a hole in a new place', 'A wrong answer that offers two vertical steps (e.g', 'fine students'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the incubation stage is simply "taking a break" or "procrastinating," and that illumination strikes randomly during.' }
          ],
            remediations: { 'the-incubation-stage-is-simply': { steps: ['Ask the student to recall a personal "aha!" moment (e.g., solving a tough math problem).', 'Jointly trace backward: What specific preparation happened *before* the break?', '(e.g., "I tried 3 methods for 45 minutes").', 'Highlight: No preparation → no incubation substrate → no reliable illumination.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_008', difficulty: 'standard',
          question: 'Creative thinking is a cognitive process characterized by the production of.',
          hint: 'Revisit the "Divergent thinking abilities generally include fluency, flexibility,.',
          misconception: 'Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They believe originality.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Creative thinking is a cognitive process characterized by the production of novel,',
                  options: ['Creative thinking is a cognitive process characterized by the production of novel,', 'Thinking is a higher-order, internal cognitive process that involves the goal-directed', 'The building blocks of thought are the fundamental mental representations—mental images', 'Types of thinking classify cognitive processes based on their relationship to reality and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They believe originality means "never been done.' }
          ],
            remediations: { 'students-equate-creative-thinking-with': { steps: ['Revisit the divergent thinking components in node c11_psy_cbse_07_007: create a 2x2 matrix (Fluency/Flexibility vs.', 'Practice a daily 5-minute "Alternative Uses" drill for 7 days on common objects (newspaper, chair, pen) – track fluency.', 'For incubation confusion: assign a "problem-loading" exercise – spend 10 minutes intensely analyzing a problem, then.', 'For originality misconception: use the "statistical rarity" definition – have students generate ideas for a prompt,.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They believe originality.',
          parts: [
                { id: 'a', prompt: 'Critique the claim: "Creative people are born with high divergent thinking ability; training can only marginally improve creativity." Use evidence from.', answer: 'The claim is false',
                  options: ['Correct answer: The claim is false', 'talent', 'trained skill', 'taking a break'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "creative thinking" with "artistic talent" or "unconstrained wild ideas." They believe originality means "never been done.' }
          ],
            remediations: { 'students-equate-creative-thinking-with': { steps: ['Revisit the divergent thinking components in node c11_psy_cbse_07_007: create a 2x2 matrix (Fluency/Flexibility vs.', 'Practice a daily 5-minute "Alternative Uses" drill for 7 days on common objects (newspaper, chair, pen) – track fluency.', 'For incubation confusion: assign a "problem-loading" exercise – spend 10 minutes intensely analyzing a problem, then.', 'For originality misconception: use the "statistical rarity" definition – have students generate ideas for a prompt,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
