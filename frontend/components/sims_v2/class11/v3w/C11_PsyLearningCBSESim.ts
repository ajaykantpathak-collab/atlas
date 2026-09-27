import type { SimDef } from '../../engine/types';
import C11_PsyLearningCBSESim from '../../../simulations/c6_12_new/C11_PsyLearningCBSESim';

/** v3 wrapped master — C11_PsyLearningCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psylearningcbsesim: SimDef = {
    id: 'v3w_c11_psylearningcbsesim',
    title: 'Psy Learning CBSE',
    subtitle: 'This node covers Watson\'s classical behaviourism (1913 manifesto), the S-R unit of.',
    classLevel: 11, subject: 'science', topic: 'Behaviourism: Watson and the Stimulus-Response Approach',
    chapters: [],
    nodeIds: ['c11_psy_cbse_01_006', 'c11_psy_cbse_01_007', 'c11_psy_cbse_01_011', 'c11_psy_cbse_05_001', 'c11_psy_cbse_05_002', 'c11_psy_cbse_05_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are watching a Class 11 student, Rohan, flinch and cover his ears instantly when a loud Diwali.', goal: 'Master Psy Learning CBSE.' },
    discovery: {
        question: 'A student says: "Watson ignored the mind because he didn\'t believe it existed." Explain why this statement is a misinterpretation of Watson\'s position, using.',
        options: ['Correct answer: Watson did not deny the existence of private mental events', 'Watson proved the mind doesn\'t exist', 'Behaviourism says thoughts are illusions'],
        answer: 'Watson did not deny the existence of private mental events',
        hook: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that.',
    },
    teaching: [
        { title: 'Behaviourism, as founded by John B. Watson,.', text: 'Behaviourism, as founded by John B. Watson, defines psychology as the scientific study of observable and measurable behaviour (responses) elicited by environmental stimuli, rejecting introspection.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_006', title: 'Behaviourism, as founded by John B..',
          scaffold: { problem: 'A Class 11 student, Ananya, feels intense anxiety (internal state) before her Psychology exam.',
            steps: [
            { text: 'Identify the antecedent stimuli. The exam paper (external visual S₁), the ticking clock (external auditory S₂), and the.' },
            { text: 'Identify the consequent responses. Foot-tapping (overt motor R₁), sweating (covert physiological R₂), and the.' },
            { text: 'Map S-R pairs. S₁ (exam paper, external) → R₁ (foot-tapping, overt). S₂ (clock, external) → R₂ (sweating, covert).' },
            { text: 'Verify against Watson\'s criteria. All S\'s are observable/measurable (paper, clock, ECG for heartbeat).' },
            { text: 'Interpret. This shows how a complex "emotional state" is decomposed into measurable S-R units — the core behaviourist.', faded: true, blankAnswer: 'Three S-R units: (1) S=exam paper (external),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_007', title: 'Gestalt psychology is a school of.',
          scaffold: { problem: 'A Class 11 student views a Rangoli pattern made of disconnected white dots on a dark floor.',
            steps: [
            { text: 'Identify the sensory input: At both distances, the physical stimuli are identical — an array of discrete white dots on.' },
            { text: 'Apply the law of proximity: At a distance, the visual angle between adjacent dots falls below the resolution threshold.' },
            { text: 'Apply the law of closure: The grouped contours form incomplete circles/petals → the perceptual system "closes" the gaps.' },
            { text: 'Apply figure-ground segregation: The completed flower becomes the "figure" (meaningful object) against the "ground".' },
            { text: 'Explain the shift at close range: Proximity cue weakens (dots resolve as separate) → closure fails (gaps too large.', faded: true, blankAnswer: 'At a distance, proximity and closure laws organize dots.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_011', title: 'Clinical Psychology focuses on the.',
          scaffold: { problem: 'A 17-year-old student, Meera, has been experiencing persistent low mood, loss of interest in badminton (her favourite sport), insomnia, and.',
            steps: [
            { text: 'Identify the key problem for Meera: persistent low mood, anhedonia, insomnia, worthlessness for 8 weeks → meets.' },
            { text: 'Professional A diagnoses and provides CBT for a diagnosable disorder → this is the core scope of Clinical Psychology.' },
            { text: 'Professional B helps with academic workload, teacher communication, adjustment → this addresses everyday functioning.' },
            { text: 'Professional C works at systems level to design assessment policy for a population of students → applies psychological.' },
            { text: 'Verify: Clinical = disorder treatment; Counselling = adjustment/growth; Educational = learning systems/instruction.', faded: true, blankAnswer: 'Professional A = Clinical Psychologist (diagnoses and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_05_001', title: 'Learning is any relatively permanent.',
          scaffold: { problem: 'A researcher tests whether "studying with background music" produces learning.',
            steps: [
            { text: 'Identify the NCERT criteria for learning — relatively permanent change in behaviour/behavioural potential produced by.' },
            { text: 'Compare Post-test 1 (immediate performance) vs Post-test 2 (retention after 1 week) for each group.' },
            { text: 'Assess "relatively permanent" — both groups retain ~60% after 1 week, suggesting some relatively permanent change.' },
            { text: 'Compare groups — difference in retention (9 vs 8) is negligible (1 word).', faded: true, blankAnswer: 'No, background music does not enhance learning. Both groups.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_05_002', title: 'Classical conditioning is a type of.',
          scaffold: { problem: 'A psychologist conducts a trace conditioning experiment with a 500 ms tone (CS) and a 100 ms air puff to the eye (US).',
            steps: [
            { text: 'Identify the US – the air puff to the eye (biologically potent stimulus that elicits a reflex).' },
            { text: 'Identify the UR – the eyeblink/withdrawal reflex to the air puff (unlearned, automatic).' },
            { text: 'Identify the CS – the 500 ms tone (initially neutral, becomes a signal through pairing).' },
            { text: 'Identify the CR – the eyeblink to the tone alone after conditioning (learned, anticipatory).' },
            { text: 'Compare trace vs. delayed conditioning – In trace conditioning, the CS ends **before** the US begins with a temporal.' },
            { text: 'Verify – The scenario explicitly states "tone ends, then 300 ms later air puff begins" = trace conditioning.', faded: true, blankAnswer: 'US = air puff to eye; UR = reflexive eyeblink to air puff;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_05_004', title: 'Operant conditioning is a type of.',
          scaffold: { problem: 'A school introduces a "Green Points" system: students earn 1 point for each day they cycle to school.',
            steps: [
            { text: 'Identify the operant behaviour—cycling to school (voluntary, emitted by student).' },
            { text: 'Classify reinforcers—Green Points are secondary reinforcers (acquired value through pairing with vouchers); canteen.' },
            { text: 'Determine reinforcement schedule—Fixed Ratio 1 (FR-1): 1 point per 1 cycle day (continuous reinforcement during.' },
            { text: 'Analyse the change—Voucher value halved from ₹10 to ₹5 reduces the magnitude/amount of reinforcement; NCERT states "as.' },
            { text: 'Predict—If points are now given intermittently (e.g., random days), partial reinforcement effect would make cycling.', faded: true, blankAnswer: 'Operant = cycling to school; Primary reinforcer = canteen.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_psy_cbse_01_007', title: 'Identify each idea',
          dissect: { specimen: 'Psy Learning CBSE', spots: [
            { id: 's1', label: 'Behaviourism as founded by John', prompt: 'Which idea is this? — Behaviourism, as founded by John B. Watson, defines psychology as the scientific study of.', answer: 'Behaviourism as founded by John', options: ['Behaviourism as founded by John', 'Gestalt psychology is a school', 'Clinical Psychology focuses on the', 'Learning is any relatively permanent'] },
            { id: 's2', label: 'Gestalt psychology is a school', prompt: 'Which idea is this? — Gestalt psychology is a school of thought that emphasizes the human tendency to perceive.', answer: 'Gestalt psychology is a school', options: ['Gestalt psychology is a school', 'Behaviourism as founded by John', 'Clinical Psychology focuses on the', 'Learning is any relatively permanent'] },
            { id: 's3', label: 'Clinical Psychology focuses on the', prompt: 'Which idea is this? — Clinical Psychology focuses on the assessment, diagnosis, treatment, and prevention of.', answer: 'Clinical Psychology focuses on the', options: ['Clinical Psychology focuses on the', 'Behaviourism as founded by John', 'Gestalt psychology is a school', 'Learning is any relatively permanent'] },
            { id: 's4', label: 'Learning is any relatively permanent', prompt: 'Which idea is this? — Learning is any relatively permanent change in behaviour or behavioural potential that.', answer: 'Learning is any relatively permanent', options: ['Learning is any relatively permanent', 'Behaviourism as founded by John', 'Gestalt psychology is a school', 'Clinical Psychology focuses on the'] },
            { id: 's5', label: 'Classical conditioning is a type', prompt: 'Which idea is this? — Classical conditioning is a type of learning in which a neutral stimulus (Conditioned.', answer: 'Classical conditioning is a type', options: ['Classical conditioning is a type', 'Behaviourism as founded by John', 'Gestalt psychology is a school', 'Clinical Psychology focuses on the'] },
            { id: 's6', label: 'Operant conditioning is a type', prompt: 'Which idea is this? — Operant conditioning is a type of learning in which voluntary behaviours (operants) are.', answer: 'Operant conditioning is a type', options: ['Operant conditioning is a type', 'Behaviourism as founded by John', 'Gestalt psychology is a school', 'Clinical Psychology focuses on the'] }
          ] } }
    ],
    explore: { component: C11_PsyLearningCBSESim, prompt: 'Explore the interactive — Psy Learning CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_006', difficulty: 'standard',
          question: 'Behaviourism, as founded by John B. Watson, defines psychology as the.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Reflex Action and Reflex Arc" (node.',
          misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that.',
          parts: [
                { id: 'a', prompt: 'A student says: "Watson ignored the mind because he didn\'t believe it existed." Explain why this statement is a misinterpretation of Watson\'s position, using.', answer: 'Watson did not deny the existence of private mental events',
                  options: ['Correct answer: Watson did not deny the existence of private mental events', 'Watson proved the mind doesn\'t exist', 'Behaviourism says thoughts are illusions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking* or.' },
                { id: 'b', prompt: 'Apply the S-R framework to this scenario: During a board exam, Priya\'s heart rate increases (internal physiological response) when she sees a difficult.', answer: '1',
                  options: ['Correct answer: 1', 'conscious decision to calm down', 'Behaviourism ignores internal processes entirely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking* or.' },
                { id: 'c', prompt: 'Compare and contrast how Structuralism (Wundt), Functionalism (James), and Behaviourism (Watson) would each study "fear of dogs." Create a 3-row table with.', answer: '| School | Subject Matter | Method | Unit of Analysis |',
                  options: ['Correct answer: | School | Subject Matter | Method | Unit of Analysis |', 'stimulus-response', 'introspection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking* or.' }
          ],
            remediations: { 'behaviourism-ignores-internal-processes-entirely': { steps: ['If a student holds this misconception: 1.', 'Show Watson\'s 1919 quote: "Thinking is talking to oneself...', 'it is overt behaviour of a covert kind." 2.', 'Demonstrate with a simple activity: Ask the student to "count to 10 silently" while you place fingers on their throat —.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that.',
          parts: [
                { id: 'a', prompt: 'Critique the claim: "Watson\'s behaviourism makes psychology a natural science exactly like physics because both study observable, measurable events." Evaluate.', answer: 'Correct evaluation: The claim is partially valid but incomplete',
                  options: ['Correct evaluation: The claim is partially valid but incomplete', 'Yes, exactly the same', 'No, totally different', 'Behaviourism ignores internal processes entirely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking* or.' },
                { id: 'b', prompt: 'Design a mini-experiment (3 steps) that a behaviourist could use to demonstrate *stimulus generalisation* in a 5-year-old child\'s fear of white rats, following.', answer: 'Expected answer (criteria for good response): 1',
                  options: ['Expected answer (criteria for good response): 1', 'Behaviourism ignores internal processes entirely', 'Watson says we don\'t think, we just react', 'Watson would deny that *thinking* or *feeling* happens'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Behaviourism ignores internal processes entirely" and therefore think Watson would deny that *thinking* or.' }
          ],
            remediations: { 'behaviourism-ignores-internal-processes-entirely': { steps: ['If a student holds this misconception: 1.', 'Show Watson\'s 1919 quote: "Thinking is talking to oneself...', 'it is overt behaviour of a covert kind." 2.', 'Demonstrate with a simple activity: Ask the student to "count to 10 silently" while you place fingers on their throat —.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_007', difficulty: 'standard',
          question: 'Gestalt psychology is a school of thought that emphasizes the human tendency to.',
          hint: 'Revisit c11_psy_cbse_01_004: focus on the definition of "element" in structuralism and.',
          misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the Gestalt concept of "insight learning" (Köhler\'s chimpanzees) with the behaviourist "trial-and-error learning" (Thorndike\'s cats) on.', answer: 'role of mental representation, (',
                  options: ['role of mental representation, (', 'both show gradual curves', 'insight is just fast trial-and-error'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' }
          ],
            remediations: { 'students-often-confuse-the-whole': { steps: ['Draw two identical dot patterns: Pattern X (random scatter) and Pattern Y (same dots arranged in a circle).', 'Emphasize: Parts are necessary but not sufficient. The *organization* (spatial relation) is the additional causal.', 'Contrast with structuralism: Wundt would analyze X and Y into same elements (dots, positions) and miss the difference.', 'Practice board-style question: "Gestalt psychology ignores the elements of consciousness." → False.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Gestalt principles of perception are universal biological hardwiring, so cultural differences in perception (e.g., Müller-Lyer.', answer: 'The statement is false',
                  options: ['The statement is false', 'illusions are optical, not cultural', 'Gestalt laws are innate so culture irrelevant', 'the whole is greater than the sum of its parts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' },
                { id: 'b', prompt: 'Design a real-world Indian traffic signage system for a chaotic 4-way intersection using at least three Gestalt laws to minimize cognitive load for drivers.', answer: 'Layout: (1) **Proximity**: Group all lane-specific signs (left-turn, straight,',
                  options: ['Layout: (1) **Proximity**: Group all lane-specific signs (left-turn, straight,', 'the whole is greater than the sum of its parts', 'the whole is *made of* parts', 'Gestalt psychology denies the existence of parts/elements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' },
                { id: 'c', prompt: 'Compare and contrast the Gestalt concept of "insight learning" (Köhler\'s chimpanzees) with the behaviourist "trial-and-error learning" (Thorndike\'s cats) on.', answer: 'role of mental representation, (',
                  options: ['role of mental representation, (', 'both show gradual curves', 'insight is just fast trial-and-error', 'the whole is greater than the sum of its parts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' }
          ],
            remediations: { 'students-often-confuse-the-whole': { steps: ['Draw two identical dot patterns: Pattern X (random scatter) and Pattern Y (same dots arranged in a circle).', 'Emphasize: Parts are necessary but not sufficient. The *organization* (spatial relation) is the additional causal.', 'Contrast with structuralism: Wundt would analyze X and Y into same elements (dots, positions) and miss the difference.', 'Practice board-style question: "Gestalt psychology ignores the elements of consciousness." → False.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_011', difficulty: 'standard',
          question: 'Clinical Psychology focuses on the assessment, diagnosis, treatment, and.',
          hint: 'Revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_003 (natural.',
          misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate.',
          parts: [
                { id: 'a', prompt: 'Name the branch of psychology that primarily deals with the assessment, diagnosis, and treatment of mental disorders such as anxiety disorders, depression, and.', answer: 'Clinical Psychology',
                  options: ['Clinical Psychology', 'Counselling Psychology', 'Psychiatry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' },
                { id: 'b', prompt: 'A school principal wants to redesign the Class 9 mathematics curriculum because students consistently perform poorly on word problems.', answer: 'Educational Psychology',
                  options: ['Educational Psychology', 'Clinical Psychology', 'Counselling Psychology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' },
                { id: 'c', prompt: 'Compare and contrast the training and legal scope of practice of a clinical psychologist and a psychiatrist in India.', answer: '| Aspect | Clinical Psychologist | Psychiatrist |',
                  options: ['| Aspect | Clinical Psychologist | Psychiatrist |', 'Clinical Psychology', 'Psychiatry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' }
          ],
            remediations: { 'students-frequently-confuse-clinical-psychology': { steps: ['Draw a three-circle Venn diagram on paper. Label circles: Clinical, Counselling, Psychiatry.', 'In the Clinical circle, write: "M.Phil Clinical Psych (RCI), Psychotherapy, Assessment, NO prescription." In Psychiatry.', 'Write the overlapping area between Clinical and Counselling: "Both do psychotherapy, both are non-medical."', 'Read the NCERT paragraph "Clinical and Counselling Psychology deals with..." and underline "clinical psychologist has a.', 'Practice writing the table from Diagnostic Question 4 from memory.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Educational psychology is just the application of cognitive psychology in schools." Is this statement accurate, partially accurate, or.', answer: 'Partially accurate but incomplete',
                  options: ['Partially accurate but incomplete', 'accurate', 'Clinical Psychology', 'Psychiatry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' }
          ],
            remediations: { 'students-frequently-confuse-clinical-psychology': { steps: ['Draw a three-circle Venn diagram on paper. Label circles: Clinical, Counselling, Psychiatry.', 'In the Clinical circle, write: "M.Phil Clinical Psych (RCI), Psychotherapy, Assessment, NO prescription." In Psychiatry.', 'Write the overlapping area between Clinical and Counselling: "Both do psychotherapy, both are non-medical."', 'Read the NCERT paragraph "Clinical and Counselling Psychology deals with..." and underline "clinical psychologist has a.', 'Practice writing the table from Diagnostic Question 4 from memory.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_001', difficulty: 'standard',
          question: 'Learning is any relatively permanent change in behaviour or behavioural.',
          hint: 'Revisit Class 10 Biology: Control and Coordination → Reflex Action and Reflex Arc.',
          misconception: 'Students equate "relatively permanent" with "permanent forever" and argue that forgetting disproves learning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Learning is any relatively permanent change in behaviour or behavioural potential that',
                  options: ['Learning is any relatively permanent change in behaviour or behavioural potential that', 'Behaviourism, as founded by John B', 'Gestalt psychology is a school of thought that emphasizes the human tendency to perceive', 'Clinical Psychology focuses on the assessment, diagnosis, treatment, and prevention of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "relatively permanent" with "permanent forever" and argue that forgetting disproves learning.' }
          ],
            remediations: { 'students-equate-relatively-permanent-with': { steps: ['Ask the student to define "relatively permanent" in their own words.', 'Present the cramming-forgetting scenario.', 'Guide them to distinguish *acquisition* (learning happened) from *retention* (forgetting happened later).', 'Use the NCERT phrase "inferred process" — learning is the *inference* drawn from pre-post comparison, not the post-test.', 'Have them re-classify the cramming scenario: learning occurred (pre 0 → post 80%), then forgetting occurred (post 80% →.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_002', difficulty: 'standard',
          question: 'Classical conditioning is a type of learning in which a neutral stimulus.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically.',
          misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns.',
          parts: [
                { id: 'a', prompt: 'In Pavlov\'s experiment, before any conditioning trials, the sound of the bell elicits alertness but no salivation.', answer: 'The bell becomes a Conditioned Stimulus (CS)',
                  options: ['The bell becomes a Conditioned Stimulus (CS)', 'the bell turns into food for the dog'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' },
                { id: 'b', prompt: 'A student says: "In delayed conditioning, the CS and US start at the same time, but the CS lasts longer." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the bell turns into food for the dog'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' },
                { id: 'c', prompt: 'A researcher conditions a rat to fear a tone (CS) by pairing it with a mild electric shock (US). After 10 trials, the tone alone elicits freezing (CR).', answer: 'Acquisition will be faster (fewer trials)',
                  options: ['Acquisition will be faster (fewer trials)', 'no change', 'slower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' }
          ],
            remediations: { 'the-neutral-stimulus-becomes-the': { steps: ['Draw a two-column table: "Before Conditioning" vs.', '"After Conditioning" with rows for Stimulus and Response.', 'Have the student fill in: Before—Bell → Alertness; Food → Salivation.', 'After—Bell → Salivation; Food → Salivation.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns.',
          parts: [
                { id: 'a', prompt: 'A teacher claims: "Backward conditioning (US then CS) is just as effective as delayed conditioning because the two stimuli are still paired contiguously.".', answer: 'The claim is false',
                  options: ['The claim is false', 'the bell turns into food for the dog'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' },
                { id: 'b', prompt: 'Design a real-life classical conditioning scenario (not from the textbook) involving an **aversive US** that would establish a CR in **one trial**.', answer: 'Example: A child touches a hot stove (US → pain/withdrawal UR)',
                  options: ['Example: A child touches a hot stove (US → pain/withdrawal UR)', 'the bell turns into food for the dog'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' }
          ],
            remediations: { 'the-neutral-stimulus-becomes-the': { steps: ['Draw a two-column table: "Before Conditioning" vs.', '"After Conditioning" with rows for Stimulus and Response.', 'Have the student fill in: Before—Bell → Alertness; Food → Salivation.', 'After—Bell → Salivation; Food → Salivation.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_004', difficulty: 'standard',
          question: 'Operant conditioning is a type of learning in which voluntary behaviours.',
          hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and practice classifying 10 everyday.',
          misconception: 'Students consistently equate "negative reinforcement" with "punishment" because the word "negative" carries a.',
          parts: [
                { id: 'a', prompt: 'Define "operant" in the context of Skinner\'s experiment and give one example of an operant behaviour a human might emit in a classroom.', answer: 'An operant is a voluntary response emitted by an organism that operates on the',
                  options: ['An operant is a voluntary response emitted by an organism that operates on the', 'salivating to a bell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate "negative reinforcement" with "punishment" because the word "negative" carries a colloquial meaning of "bad".' }
          ],
            remediations: { 'students-consistently-equate-negative-reinforcem': { steps: ['Draw a 2×2 contingency table on the board: rows = "Stimulus Presented" / "Stimulus Removed"; columns = "Behaviour.', 'Populate only two cells: "Stimulus Removed → Behaviour Increases = Negative Reinforcement (e.g., seatbelt beep stops.', 'Have the student generate one original example for each cell.', 'Explicitly label the other two cells (Positive Reinforcement, Negative Punishment) to complete the matrix, reinforcing.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
