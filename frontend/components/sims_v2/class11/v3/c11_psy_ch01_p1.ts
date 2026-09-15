import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch01_p1: SimDef = {
    id: 'v3_c11_psy_ch01_p1',
    title: 'What is Psychology? · Part 1/2',
    subtitle: 'See why two opposite proverbs can both be \'common sense\' — and neither is science.',
    classLevel: 11, subject: 'psychology', topic: 'What is Psychology? · Part 1/2',
    chapters: ['c11_psy_ch01'],
    nodeIds: ['c11_psy_cbse_01_001', 'c11_psy_cbse_01_002', 'c11_psy_cbse_01_003', 'c11_psy_cbse_01_004', 'c11_psy_cbse_01_005', 'c11_psy_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher refusing to accept a proverb as a theory', intro: '\'He\'s aggressive because he\'s frustrated\' sounds right — which is exactly the problem; so would the opposite explanation.', goal: 'Distinguish scientific psychology\'s testable models from common-sense rationalisation.' },
    discovery: {
        question: '\'Absence makes the heart grow fonder\' and \'out of sight, out of mind\' — both wise, both proverbs. Which one is psychology?',
        options: ['Neither — common sense supplies opposite answers on demand; psychology tests which prediction survives evidence', 'Both — folk wisdom is psychology', 'The first — it\'s more romantic', 'The second — it\'s more cynical'],
        answer: 'Neither — common sense supplies opposite answers on demand; psychology tests which prediction survives evidence',
        hook: 'Dweck\'s finding that easy tasks reduced performance persistence is exactly the kind of counterintuitive result proverbs can never produce.',
    },
    teaching: [
        { title: 'Psychology as a Discipline: Definition and Subject Matter', text: 'Psychology is formally defined as the scientific discipline that studies mental processes, experiences, and behaviour in different contexts, using systematic methods from both biological and social.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take the bystander-in-emergency puzzle and separate a retrospective \'people are selfish\' shrug from a testable psychological model.',
        labels: ['Psychology as a Discipline', 'Popular Notions about Psychology', 'Psychology as a Natural', 'Structuralism: Wundt and Introspection', 'Functionalism: William James', 'Behaviourism: Watson and'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_001', title: 'Psychology as a Discipline: Definition and Subject Matter',
          caseStudy: { intro: 'Imagine you\'re watching a cricket match and the batter hits a six — your heart races, you jump up cheering, and you instantly replay the shot in your mind.',
            decisions: [{ prompt: 'Define psychology as a scientific discipline and name its three core subject matters as per the formal definition used in Class 11 NCERT.', options: [
                { text: 'Psychology is the scientific discipline that studies mental processes, experiences, and', outcome: 'Psychology is the scientific discipline that studies mental processes, experiences, and behaviour.' },
                { text: 'experiences', outcome: 'Not quite — Students often believe psychology is "just common sense" or "reading minds" because everyday.', reveals: 'psychology-is-just-common-sense' },
                { text: 'mental processes', outcome: 'Not quite — Students often believe psychology is "just common sense" or "reading minds" because everyday.', reveals: 'psychology-is-just-common-sense' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_002', title: 'Popular Notions about Psychology vs Scientific Psychology',
          caseStudy: { intro: 'Imagine you hear two proverbs: "Out of sight, out of mind" and "Distance makes the heart grow fonder." Both sound wise, but they contradict each other.',
            decisions: [{ prompt: 'Define \'popular notion\' in the context of psychology and give one example from the textbook.', options: [
                { text: 'A popular notion is a common-sense explanation of human behaviour based on cultural', outcome: 'A popular notion is a common-sense explanation of human behaviour based on cultural sayings.' },
                { text: 'Out of sight, out of mind', outcome: 'Not quite — Students often think that because psychology deals with everyday human behaviour, scientific.', reveals: 'because-psychology-deals-with-everyday' },
                { text: 'Distance makes the heart grow fonder', outcome: 'Not quite — Students often think that because psychology deals with everyday human behaviour, scientific.', reveals: 'because-psychology-deals-with-everyday' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_003', title: 'Psychology as a Natural Science and a Social Science',
          caseStudy: { intro: 'Imagine you are watching a cricket match and see a player suddenly freeze before a crucial catch.',
            decisions: [{ prompt: 'What is the primary epistemological difference between psychology as a natural science and psychology as a social science regarding the.', options: [
                { text: 'Natural science psychology assumes behaviour has specific, identifiable causes that can', outcome: 'Natural science psychology assumes behaviour has specific, identifiable causes that can be isolated.' },
                { text: 'natural science uses numbers, social science uses words', outcome: 'Not quite — Students often believe "natural science = biology/brain, social science = society/culture" and that.', reveals: 'natural-science-biology-brain' },
                { text: 'natural science = biology/brain, social science = society/culture', outcome: 'Not quite — Students often believe "natural science = biology/brain, social science = society/culture" and that.', reveals: 'natural-science-biology-brain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_004', title: 'Structuralism: Wundt and Introspection Method',
          caseStudy: { intro: 'Imagine you are in a quiet lab in 1880 Leipzig: a metronome ticks, a light flashes, and you are asked to describe *exactly* what you experience—no.',
            decisions: [{ prompt: 'What was the primary goal of structuralism according to Wilhelm Wundt?', options: [
                { text: 'The primary goal was to analyse the structure of the mind by identifying and classifying', outcome: 'The primary goal was to analyse the structure of the mind by identifying and classifying the basic.' },
                { text: 'to study the function of the mind', outcome: 'Not quite — Students often think "introspection" means *any* self-observation (e.g., "I\'m thinking about.', reveals: 'introspection-means-any-self-observation' },
                { text: 'to study behaviour', outcome: 'Not quite — Students often think "introspection" means *any* self-observation (e.g., "I\'m thinking about.', reveals: 'introspection-means-any-self-observation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_005', title: 'Functionalism: William James and Stream of Consciousness',
          caseStudy: { intro: 'Imagine you\'re watching a cricket match on TV while simultaneously thinking about your upcoming exam, hearing your mother call from the kitchen, and feeling.',
            decisions: [{ prompt: 'What is the central metaphor William James used to describe consciousness, and what does it imply about the nature of mental life?', options: [
                { text: 'James used the "stream of consciousness" metaphor, implying consciousness is continuous,', outcome: 'James used the "stream of consciousness" metaphor, implying consciousness is continuous.' },
                { text: 'consciousness is like a chain of separate links', outcome: 'Not quite — Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce.', reveals: 'students-confuse-stream-of-consciousness' },
                { text: 'a stack of building blocks', outcome: 'Not quite — Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce.', reveals: 'students-confuse-stream-of-consciousness' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_006', title: 'Behaviourism: Watson and the Stimulus-Response Approach',
          caseStudy: { intro: 'Imagine you are watching a Class 11 student, Rohan, flinch and cover his ears instantly when a loud Diwali firecracker explodes nearby.',
            decisions: [{ prompt: 'State Watson\'s definition of psychology as a science and identify the two key components of the S-R unit.', options: [
                { text: 'Correct answer: Watson defined psychology as "the study of behaviour or responses (to', outcome: 'Correct answer: Watson defined psychology as "the study of behaviour or responses (to stimuli).' },
                { text: 'mental processes', outcome: 'Not quite — Students often believe "Behaviourism ignores internal processes entirely" and therefore think.', reveals: 'behaviourism-ignores-internal-processes-entirely' },
                { text: 'consciousness', outcome: 'Not quite — Students often believe "Behaviourism ignores internal processes entirely" and therefore think.', reveals: 'behaviourism-ignores-internal-processes-entirely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a psychology taster session, a student shrugs: \'Psychology is just common sense — everyone knows absent friends fade, out of sight out of mind.\' A classmate counters with the opposite proverb: \'Distance makes the heart grow fonder.\'',
            decisions: [{ prompt: 'What does this contradiction reveal about the discipline?', options: [
                { text: 'Show why science is needed: both proverbs sound wise yet contradict — common sense explains after the fact but can\'t predict. Scientific psychology builds testable models that specify WHEN each holds: e.g., the bystander effect predicts helping falls as witness numbers rise, via diffusion of responsibility — a mechanism, not a trait label like \'people are selfish\'.', outcome: 'The room sees the difference: psychology studies mental processes, experience and behaviour with methods that could turn out wrong — hindsight proverbs can\'t lose.' },
                { text: 'Pick the truer proverb — decide which one matches your own experience.', outcome: 'Choosing by anecdote repeats the problem: both feel true in hindsight; only empirical testing separates when each pattern actually occurs.', reveals: 'pick-the-truer-proverb' },
                { text: 'Conclude psychology is just tidied-up common sense — studies confirm what we already know.', outcome: 'Findings are often counter-intuitive — e.g., easy tasks can reduce persistence — so the discipline exists precisely because intuition is unreliable.', reveals: 'psychology-confirms-common-sense' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Common sense explains everything after the fact and predicts nothing — science earns its name by risking a wrong prediction.',
            decisions: [{ prompt: 'What comes next? What is Psychology? · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — What is Psychology? · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_001', difficulty: 'standard',
          question: 'Psychology is formally defined as the scientific discipline that studies mental.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 (Control and Coordination) — specifically.',
          misconception: 'Students often believe psychology is "just common sense" or "reading minds" because everyday language uses.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why "experiences" are considered subjective and internal, and give one example where the same external situation produces different.', answer: 'Experiences are subjective',
                  options: ['Experiences are subjective', 'observable reactions', 'behaviours', 'just common sense'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 (Control and Coordination) — specifically neuron.',
                  misconception: 'Students often believe psychology is "just common sense" or "reading minds" because everyday language uses psychological terms (memory.' },
                { id: 'b', prompt: 'A researcher measures brain activity (fMRI) while participants solve math problems.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'just common sense', 'reading minds'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 (Control and Coordination) — specifically neuron.',
                  misconception: 'Students often believe psychology is "just common sense" or "reading minds" because everyday language uses psychological terms (memory.' },
                { id: 'c', prompt: 'Compare psychology as a natural science vs. psychology as a social science on: (a) primary assumption about causes of behaviour, (b) research aim, (c) type.', answer: 'primary assumption about causes of behaviour, (',
                  options: ['primary assumption about causes of behaviour, (', 'just common sense', 'reading minds'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 (Control and Coordination) — specifically neuron.',
                  misconception: 'Students often believe psychology is "just common sense" or "reading minds" because everyday language uses psychological terms (memory.' }
          ],
            remediations: { 'psychology-is-just-common-sense': { steps: ['Have the student write down three "obvious" explanations they believe about human behaviour (e.g., "opposites attract,".', 'For each, ask: "What would a study need to measure to TEST this? What would count as evidence AGAINST it?"', 'Show the Dweck study as a worked example of a common-sense prediction (easy success builds confidence) being falsified.', 'Require the student to rephrase their three beliefs as testable hypotheses with independent/dependent variables.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe psychology is "just common sense" or "reading minds" because everyday language uses.',
          parts: [
                { id: 'a', prompt: '"Common sense says: \'Absence makes the heart grow fonder.\' Psychology as a science would reject this as a valid explanation.', answer: 'Common sense relies on hindsight',
                  options: ['Common sense relies on hindsight', 'psychological truth', 'just common sense', 'reading minds'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 (Control and Coordination) — specifically neuron.',
                  misconception: 'Students often believe psychology is "just common sense" or "reading minds" because everyday language uses psychological terms (memory.' }
          ],
            remediations: { 'psychology-is-just-common-sense': { steps: ['Have the student write down three "obvious" explanations they believe about human behaviour (e.g., "opposites attract,".', 'For each, ask: "What would a study need to measure to TEST this? What would count as evidence AGAINST it?"', 'Show the Dweck study as a worked example of a common-sense prediction (easy success builds confidence) being falsified.', 'Require the student to rephrase their three beliefs as testable hypotheses with independent/dependent variables.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_002', difficulty: 'standard',
          question: 'Scientific psychology is the systematic study of mental processes, experiences.',
          hint: 'Review the definition of psychology in node c11_psy_cbse_01_001, focusing on the terms.',
          misconception: 'Students often think that because psychology deals with everyday human behaviour, scientific psychology is just \'common.',
          parts: [
                { id: 'a', prompt: 'Explain why common-sense explanations are considered \'hindsight bias\' using the two proverbs about distance and attraction.', answer: 'Common-sense explanations are hindsight bias',
                  options: ['Common-sense explanations are hindsight bias', 'studies like Dweck\'s merely confirm obvious truths'],
                  hint: 'Review the definition of psychology in node c11_psy_cbse_01_001, focusing on the terms \'mental.',
                  misconception: 'Students often think that because psychology deals with everyday human behaviour, scientific psychology is just \'common sense\' or \'what.' },
                { id: 'b', prompt: 'A teacher believes that giving students only easy problems will build their confidence so they can later solve hard problems.', answer: 'Two groups: Group A gets only easy problems for 25 days',
                  options: ['Two groups: Group A gets only easy problems for 25 days', 'studies like Dweck\'s merely confirm obvious truths'],
                  hint: 'Review the definition of psychology in node c11_psy_cbse_01_001, focusing on the terms \'mental.',
                  misconception: 'Students often think that because psychology deals with everyday human behaviour, scientific psychology is just \'common sense\' or \'what.' }
          ],
            remediations: { 'because-psychology-deals-with-everyday': { steps: ['Ask the student to list three popular sayings about human behaviour that contradict each other.', 'Have them identify which saying would be chosen after a specific outcome (hindsight).', 'Contrast this with Dweck\'s study: show the two-group design and the surprising result.', 'Ask the student to predict the outcome of Dweck\'s study using common sense, then reveal the actual result to highlight.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_003', difficulty: 'standard',
          question: 'Psychology as a natural science uses the hypothetico-deductive model.',
          hint: 'If stuck, revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_002.',
          misconception: 'Students often believe "natural science = biology/brain, social science = society/culture" and that these are separate.',
          parts: [
                { id: 'a', prompt: 'A school wants to reduce bullying. The counsellor proposes: (A) an fMRI study of bullies\' brains to find neural correlates of aggression, (B) a survey.', answer: '(A) Natural science',
                  options: ['(A) Natural science', 'applied', 'natural science = biology/brain, social science = society/culture'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_002 (Dweck\'s.',
                  misconception: 'Students often believe "natural science = biology/brain, social science = society/culture" and that these are separate, non-overlapping.' }
          ],
            remediations: { 'natural-science-biology-brain': { steps: ['If a student cannot distinguish the two approaches beyond "brain vs.', 'society," do this 3-step remediation: (1) Give them *one* phenomenon (e.g., "prayer") and ask: "What would a natural.', '(EEG during meditation, heart rate variability, serotonin).', 'What would a social science psychologist explore?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_004', difficulty: 'standard',
          question: 'Structuralism is the first formal school of psychology founded by Wilhelm.',
          hint: 'If stuck, revisit the definition of "mental processes" in c11_psy_cbse_01_001 and the.',
          misconception: 'Students often think "introspection" means *any* self-observation (e.g., "I\'m thinking about my thoughts right now").',
          parts: [
                { id: 'a', prompt: 'A researcher asks participants to view a red apple and report their conscious experience.', answer: 'The second response aligns',
                  options: ['The second response aligns', 'introspection', 'I\'m thinking about my thoughts right now', 'Introspection is when you ask someone how they feel'],
                  hint: 'If stuck, revisit the definition of "mental processes" in c11_psy_cbse_01_001 and the.',
                  misconception: 'Students often think "introspection" means *any* self-observation (e.g., "I\'m thinking about my thoughts right now").' }
          ],
            remediations: { 'introspection-means-any-self-observation': { steps: ['Ask the student to perform a 30-second "raw sensation" exercise: stare at a coloured pen and describe *only* hue.', 'Point out every time they slip into naming ("it\'s a pen") and label that slip as the *stimulus error*.', 'Have them re-read the NCERT paragraph on "introspection was a procedure...', 'describe in detail their own mental processes" and underline the words *trained*, *detail*, *mental processes*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_005', difficulty: 'standard',
          question: 'Functionalism is a school of psychology founded by William James that studies.',
          hint: 'Revisit c11_psy_cbse_01_004: Focus on why introspection failed as a universal method.',
          misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Functionalism is a school of psychology founded by William James that studies the',
                  options: ['Functionalism is a school of psychology founded by William James that studies the', 'Psychology is formally defined as the scientific discipline that studies mental', 'Scientific psychology is the systematic study of mental processes, experiences, and', 'Psychology as a natural science uses the hypothetico-deductive model, controlled'],
                  hint: 'Revisit c11_psy_cbse_01_004: Focus on why introspection failed as a universal method (subjective.',
                  misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James meant a narrative.' }
          ],
            remediations: { 'students-confuse-stream-of-consciousness': { steps: ['Have the student close their eyes for 30 seconds and notice everything in awareness—sounds, bodily sensations, fleeting.', 'Ask: "Did your awareness come in separate sentences, or as a shifting field where some things were sharp (focus) and.', 'Map their report to James\'s four characteristics using a diagram: draw a river with a bright center (focus) and misty.', 'Contrast with structuralism: "If Wundt asked you to report \'elements,\' what would you have to do to your stream?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_006', difficulty: 'standard',
          question: 'Behaviourism, as founded by John B. Watson, defines psychology as the.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Reflex Action and Reflex Arc" (node.',
          misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that.',
          parts: [
                { id: 'a', prompt: 'A student says: "Watson ignored the mind because he didn\'t believe it existed." Explain why this statement is a misinterpretation of Watson\'s position, using.', answer: 'Correct answer: Watson did not deny the existence of private mental events',
                  options: ['Correct answer: Watson did not deny the existence of private mental events', 'Watson proved the mind doesn\'t exist', 'Behaviourism says thoughts are illusions', 'thinking is subvocal speech'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Reflex Action and Reflex Arc" (node.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking*.' },
                { id: 'b', prompt: 'Apply the S-R framework to this scenario: During a board exam, Priya\'s heart rate increases (internal physiological response) when she sees a difficult.', answer: 'Correct answer: 1',
                  options: ['Correct answer: 1', 'conscious decision to calm down', 'Behaviourism ignores internal processes entirely', 'Watson says we don\'t think, we just react'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Reflex Action and Reflex Arc" (node.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking*.' },
                { id: 'c', prompt: 'Compare and contrast how Structuralism (Wundt), Functionalism (James), and Behaviourism (Watson) would each study "fear of dogs." Create a 3-row table with.', answer: 'Correct answer: | School | Subject Matter | Method | Unit of Analysis |',
                  options: ['Correct answer: | School | Subject Matter | Method | Unit of Analysis |', 'stimulus-response', 'introspection', 'Behaviourism ignores internal processes entirely'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Reflex Action and Reflex Arc" (node.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking*.' }
          ],
            remediations: { 'behaviourism-ignores-internal-processes-entirely': { steps: ['If a student holds this misconception: 1.', 'Show Watson\'s 1919 quote: "Thinking is talking to oneself...', 'it is overt behaviour of a covert kind." 2.', 'Demonstrate with a simple activity: Ask the student to "count to 10 silently" while you place fingers on their throat.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
