import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch05_p1: SimDef = {
    id: 'v3_c11_psy_ch05_p1',
    title: 'Learning · Part 1/2',
    subtitle: 'Watch a bell stay a bell while quietly becoming a prediction.',
    classLevel: 11, subject: 'psychology', topic: 'Learning · Part 1/2',
    chapters: ['c11_psy_ch05'],
    nodeIds: ['c11_psy_cbse_05_001', 'c11_psy_cbse_05_002', 'c11_psy_cbse_05_003', 'c11_psy_cbse_05_004', 'c11_psy_cbse_05_005', 'c11_psy_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a behaviourist timing the signal before the food', intro: 'The dog salivates to a sound — not because the sound became food, but because it learned to mean food.', goal: 'Explain classical conditioning as signal learning and distinguish learning from performance.' },
    discovery: {
        question: 'After conditioning, the bell \'becomes food\' for Pavlov\'s dog — a fair summary?',
        options: ['No — the bell stays a bell; it gains signal value predicting food, and salivation is a preparatory response, not the food-response moved', 'Yes — the CS replaces the US', 'Yes — the dog now thinks bell is edible', 'No — because dogs can\'t learn sounds'],
        answer: 'No — the bell stays a bell; it gains signal value predicting food, and salivation is a preparatory response, not the food-response moved',
        hook: 'Contiguity isn\'t enough — present the food before the bell (backward conditioning) and the pairing fails; the signal must predict, not just accompany.',
    },
    teaching: [
        { title: 'Nature of Learning: Definition and Key Features', text: 'Learning is any relatively permanent change in behaviour or behavioural potential that results from experience or practice, excluding temporary changes due to fatigue, habituation, drugs,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate learning from performance — the crammed-then-forgotten exam answer — and test whether \'relatively permanent\' survives forgetting.',
        labels: ['Nature of Learning: Definition', 'Classical Conditioning: Pavlov\'s Experiment', 'Classical Conditioning: Key Phenomena', 'Operant Conditioning: Skinner\'s Experiment', 'Operant Conditioning: Schedules', 'Observational Learning: Bandura\'s Modelling'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_001', title: 'Nature of Learning: Definition and Key Features',
          caseStudy: { intro: 'Imagine you stayed up all night studying and now your hands shake while writing — is that learning? No, it\'s fatigue.',
            decisions: [{ prompt: 'State the NCERT definition of learning verbatim, including the two exclusionary criteria for non-learning changes.', options: [
                { text: 'Learning is "any relatively permanent change in behaviour or behavioural potential', outcome: 'Learning is "any relatively permanent change in behaviour or behavioural potential produced.' },
                { text: 'learning is a change in behaviour', outcome: 'Not quite — Students equate "relatively permanent" with "permanent forever" and argue that forgetting disproves.', reveals: 'students-equate-relatively-permanent-with' },
                { text: 'relatively permanent', outcome: 'Not quite — Students equate "relatively permanent" with "permanent forever" and argue that forgetting disproves.', reveals: 'students-equate-relatively-permanent-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_002', title: 'Classical Conditioning: Pavlov\'s Experiment and Principles',
          caseStudy: { intro: 'Imagine you\'re walking past a bakery and suddenly smell fresh bread—your mouth waters before you even see the loaf.',
            decisions: [{ prompt: 'In Pavlov\'s experiment, before any conditioning trials, the sound of the bell elicits alertness but no salivation.', options: [
                { text: 'The bell becomes a Conditioned Stimulus (CS)', outcome: 'The bell becomes a Conditioned Stimulus (CS). A wrong answer (e.g., calling it an Unconditioned.' },
                { text: 'the bell turns into food for the dog', outcome: 'Not quite — Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning.', reveals: 'the-neutral-stimulus-becomes-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_003', title: 'Classical Conditioning: Key Phenomena (Extinction, Spontaneous Recovery, Generalisation)',
          caseStudy: { intro: 'Imagine you have a pet dog that salivates at the sound of a bell because you repeatedly paired the bell with food.',
            decisions: [{ prompt: 'Define extinction in classical conditioning and state one factor that increases resistance to extinction.', options: [
                { text: 'Extinction is the gradual decrease and eventual disappearance of a conditioned response', outcome: 'Extinction is the gradual decrease and eventual disappearance of a conditioned response when the.' },
                { text: 'extinction means the animal forgets the association', outcome: 'Not quite — Students often believe that extinction means the conditioned response is "unlearned" or permanently.', reveals: 'extinction-means-the-conditioned-response' },
                { text: 'unlearned', outcome: 'Not quite — Students often believe that extinction means the conditioned response is "unlearned" or permanently.', reveals: 'extinction-means-the-conditioned-response' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_004', title: 'Operant Conditioning: Skinner\'s Experiment and Reinforcement',
          caseStudy: { intro: 'Imagine you are training a stray dog to sit on command: you say "sit," gently push its hindquarters down, and immediately give a biscuit.',
            decisions: [{ prompt: 'Define "operant" in the context of Skinner\'s experiment and give one example of an operant behaviour a human might emit in a classroom.', options: [
                { text: 'An operant is a voluntary response emitted by an organism that operates on the', outcome: 'An operant is a voluntary response emitted by an organism that operates on the environment.' },
                { text: 'salivating to a bell', outcome: 'Not quite — Students consistently equate "negative reinforcement" with "punishment" because the word "negative".', reveals: 'students-consistently-equate-negative-reinforcem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_005', title: 'Operant Conditioning: Schedules of Reinforcement and Punishment',
          caseStudy: { intro: 'Imagine you are training a stray dog to sit on command using biscuits. At first you give a biscuit **every single time** it sits (continuous reinforcement).',
            decisions: [{ prompt: 'Define "partial reinforcement effect" in one sentence using the terms "resistance to extinction" and "intermittent schedule".', options: [
                { text: 'The partial reinforcement effect is the phenomenon where a response acquired under an', outcome: 'The partial reinforcement effect is the phenomenon where a response acquired under an intermittent.' },
                { text: 'partial reinforcement makes learning faster', outcome: 'Not quite — Students equate **negative reinforcement** with **punishment** because both involve "unpleasant".', reveals: 'students-equate-negative-reinforcement-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_006', title: 'Observational Learning: Bandura\'s Modelling and Bobo Doll Study',
          caseStudy: { intro: 'Imagine you are at a family wedding and see your older cousin confidently negotiating a discount with a street vendor — you\'ve never done that before, but.',
            decisions: [{ prompt: 'What are the four mediational processes Bandura identified as necessary for observational learning to occur?', options: [
                { text: 'The four mediational processes are attention (observer must notice the model), retention', outcome: 'The four mediational processes are attention (observer must notice the model), retention (observer.' },
                { text: 'imitation', outcome: 'Not quite — Students often believe observational learning is simply "copying" or "imitation" and therefore.', reveals: 'observational-learning-is-simply-copying' },
                { text: 'reinforcement', outcome: 'Not quite — Students often believe observational learning is simply "copying" or "imitation" and therefore.', reveals: 'observational-learning-is-simply-copying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A revision group debates two claims: \'Cramming that worked on the test but was forgotten a week later wasn\'t learning — it didn\'t last.\' And \'In Pavlov\'s setup the bell basically became food for the dog.\'',
            decisions: [{ prompt: 'What do the definitions of learning and conditioning say?', options: [
                { text: 'Apply the criteria precisely: learning is a RELATIVELY permanent change from experience — cramming produced real learning (behavioural potential existed at test time); later forgetting is extinction, not absence of learning. And the bell stays a bell: conditioning gives the CS signal value — repeated pairing strengthens a neural pathway so it triggers a preparatory response anticipating food; nothing transforms into the US.', outcome: 'Both myths fall to the definitions: performance can fade after learning occurred, and the conditioned stimulus predicts rather than becomes the unconditioned one.' },
                { text: 'Agree cramming wasn\'t learning — if it\'s gone, it was never learned.', outcome: '\'Relatively permanent\' isn\'t \'permanent forever\': the change existed and decayed — confusing performance-at-a-moment with the learned change itself is the error.', reveals: 'forgotten-means-never-learned' },
                { text: 'Accept bell-becomes-food — after conditioning the CS functions as the US.', outcome: 'The CS gains predictive signal value through contiguity, eliciting an anticipatory response — it signals the US, it doesn\'t turn into it.', reveals: 'cs-becomes-us' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Learning is the underlying change; performance is just its momentary evidence — one can fade while the other looked solid.',
            decisions: [{ prompt: 'What comes next? Learning · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Learning · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_001', difficulty: 'standard',
          question: 'Learning is any relatively permanent change in behaviour or behavioural.',
          hint: 'Revisit Class 10 Biology: Control and Coordination → Reflex Action and Reflex Arc.',
          misconception: 'Students equate "relatively permanent" with "permanent forever" and argue that forgetting disproves learning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Learning is any relatively permanent change in behaviour or behavioural potential that',
                  options: ['Learning is any relatively permanent change in behaviour or behavioural potential that', 'Classical conditioning is a type of learning in', 'In classical conditioning, extinction is the gradual weakening and disappearance of a', 'Operant conditioning is a type of learning in'],
                  hint: 'Revisit Class 10 Biology: Control and Coordination → Reflex Action and Reflex Arc.',
                  misconception: 'Students equate "relatively permanent" with "permanent forever" and argue that forgetting disproves learning.' }
          ],
            remediations: { 'students-equate-relatively-permanent-with': { steps: ['Ask the student to define "relatively permanent" in their own words.', 'Present the cramming-forgetting scenario.', 'Guide them to distinguish *acquisition* (learning happened) from *retention* (forgetting happened later).', 'Use the NCERT phrase "inferred process" — learning is the *inference* drawn from pre-post comparison, not the post-test.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_002', difficulty: 'standard',
          question: 'Classical conditioning is a type of learning in which a neutral stimulus.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically.',
          misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns.',
          parts: [
                { id: 'a', prompt: 'In Pavlov\'s experiment, before any conditioning trials, the sound of the bell elicits alertness but no salivation.', answer: 'The bell becomes a Conditioned Stimulus (CS)',
                  options: ['The bell becomes a Conditioned Stimulus (CS)', 'the bell turns into food for the dog'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically the reflex.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' },
                { id: 'b', prompt: 'A student says: "In delayed conditioning, the CS and US start at the same time, but the CS lasts longer." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the bell turns into food for the dog'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically the reflex.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' },
                { id: 'c', prompt: 'A researcher conditions a rat to fear a tone (CS) by pairing it with a mild electric shock (US). After 10 trials, the tone alone elicits freezing (CR).', answer: 'Acquisition will be faster (fewer trials)',
                  options: ['Acquisition will be faster (fewer trials)', 'no change', 'slower', 'the bell turns into food for the dog'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically the reflex.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' }
          ],
            remediations: { 'the-neutral-stimulus-becomes-the': { steps: ['Draw a two-column table: "Before Conditioning" vs.', '"After Conditioning" with rows for Stimulus and Response.', 'Have the student fill in: Before—Bell → Alertness; Food → Salivation.', 'After—Bell → Salivation; Food → Salivation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns.',
          parts: [
                { id: 'a', prompt: 'A teacher claims: "Backward conditioning (US then CS) is just as effective as delayed conditioning because the two stimuli are still paired contiguously.".', answer: 'The claim is false',
                  options: ['The claim is false', 'the bell turns into food for the dog'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically the reflex.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' },
                { id: 'b', prompt: 'Design a real-life classical conditioning scenario (not from the textbook) involving an **aversive US** that would establish a CR in **one trial**.', answer: 'Example: A child touches a hot stove (US → pain/withdrawal UR)',
                  options: ['Example: A child touches a hot stove (US → pain/withdrawal UR)', 'the bell turns into food for the dog'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 2 "Control and Coordination" – specifically the reflex.',
                  misconception: 'Students believe the neutral stimulus **becomes** the unconditioned stimulus after conditioning (e.g., "the bell turns into food for the.' }
          ],
            remediations: { 'the-neutral-stimulus-becomes-the': { steps: ['Draw a two-column table: "Before Conditioning" vs.', '"After Conditioning" with rows for Stimulus and Response.', 'Have the student fill in: Before—Bell → Alertness; Food → Salivation.', 'After—Bell → Salivation; Food → Salivation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_003', difficulty: 'standard',
          question: 'In classical conditioning, extinction is the gradual weakening and.',
          hint: 'If stuck, revisit the acquisition procedure and terminology in node c11_psy_cbse_05_002.',
          misconception: 'Students often believe that extinction means the conditioned response is "unlearned" or permanently erased, so they are.',
          parts: [
                { id: 'a', prompt: 'A child develops a fear of a white rat after it is paired with a loud noise (US).', answer: 'The phenomenon is stimulus generalisation',
                  options: ['The phenomenon is stimulus generalisation', 'the child is just scared of everything white', 'unlearned'],
                  hint: 'If stuck, revisit the acquisition procedure and terminology in node c11_psy_cbse_05_002 (Pavlov\'s.',
                  misconception: 'Students often believe that extinction means the conditioned response is "unlearned" or permanently erased, so they are surprised.' },
                { id: 'b', prompt: 'Compare and contrast extinction in classical conditioning with extinction in operant conditioning (from node c11_psy_cbse_05_004) in terms of (a) what.', answer: 'what is withheld, (',
                  options: ['what is withheld, (', 'unlearned'],
                  hint: 'If stuck, revisit the acquisition procedure and terminology in node c11_psy_cbse_05_002 (Pavlov\'s.',
                  misconception: 'Students often believe that extinction means the conditioned response is "unlearned" or permanently erased, so they are surprised.' }
          ],
            remediations: { 'extinction-means-the-conditioned-response': { steps: ['Ask the student to draw two parallel lines representing "excitatory association (CS→US)" and "inhibitory association.', 'Have them label the net CR strength as the difference between the two lines.', 'Show that during extinction the inhibitory line rises above the excitatory line, suppressing the CR; after rest, the.', 'For generalisation, give a set of stimuli varying in similarity to the CS and ask the student to plot a generalisation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_004', difficulty: 'standard',
          question: 'Operant conditioning is a type of learning in which voluntary behaviours.',
          hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and practice classifying 10 everyday.',
          misconception: 'Students consistently equate "negative reinforcement" with "punishment" because the word "negative" carries.',
          parts: [
                { id: 'a', prompt: 'Define "operant" in the context of Skinner\'s experiment and give one example of an operant behaviour a human might emit in a classroom.', answer: 'An operant is a voluntary response emitted by an organism that operates on the',
                  options: ['An operant is a voluntary response emitted by an organism that operates on the', 'salivating to a bell'],
                  hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and practice classifying 10 everyday.',
                  misconception: 'Students consistently equate "negative reinforcement" with "punishment" because the word "negative" carries a colloquial meaning of "bad".' }
          ],
            remediations: { 'students-consistently-equate-negative-reinforcem': { steps: ['Draw a 2×2 contingency table on the board: rows = "Stimulus Presented" / "Stimulus Removed"; columns = "Behaviour.', 'Populate only two cells: "Stimulus Removed → Behaviour Increases = Negative Reinforcement (e.g., seatbelt beep stops.', 'Have the student generate one original example for each cell.', 'Explicitly label the other two cells (Positive Reinforcement, Negative Punishment) to complete the matrix, reinforcing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_005', difficulty: 'standard',
          question: 'Schedules of reinforcement are systematic arrangements that determine **when**.',
          hint: 'Revisit c11_psy_cbse_05_004 "Operant Conditioning: Skinner\'s Experiment and.',
          misconception: 'Students equate **negative reinforcement** with **punishment** because both involve "unpleasant" stimuli.',
          parts: [
                { id: 'a', prompt: 'A teacher praises a student **only when the student raises her hand before speaking**. The student now raises her hand more often.', answer: 'The praise is a **positive reinforcer**',
                  options: ['The praise is a **positive reinforcer**', 'negative reinforcement', 'negative', 'rather than'],
                  hint: 'Revisit c11_psy_cbse_05_004 "Operant Conditioning: Skinner\'s Experiment and Reinforcement" and.',
                  misconception: 'Students equate **negative reinforcement** with **punishment** because both involve "unpleasant" stimuli.' }
          ],
            remediations: { 'students-equate-negative-reinforcement-with': { steps: ['Draw a 2×2 matrix on paper: rows = **Add / Remove** stimulus; columns = **Behaviour Increases / Decreases**.', 'Label the four cells: **Positive Reinforcement** (Add + Increase), **Negative Reinforcement** (Remove + Increase).', 'Place each textbook example (seatbelt beep, salary bonus, fine, grounding) into the correct cell.', 'Re-read NCERT Box 5.1 "Classical and Operant Conditioning: Differences" and the paragraph "It may be noted that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_006', difficulty: 'standard',
          question: 'Observational learning is a process through which individuals acquire new.',
          hint: 'If stuck, revisit c11_psy_cbse_05_004 (operant conditioning basics) and.',
          misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast observational learning with operant conditioning on three dimensions: (a) role of direct reinforcement, (b) necessity of the learner\'s own.', answer: 'role of direct reinforcement, (',
                  options: ['role of direct reinforcement, (', 'both need reinforcement', 'copying', 'imitation'],
                  hint: 'If stuck, revisit c11_psy_cbse_05_004 (operant conditioning basics) and c11_psy_cbse_05_005.',
                  misconception: 'Students often believe observational learning is simply "copying" or "imitation" and therefore requires the observer to perform the.' }
          ],
            remediations: { 'observational-learning-is-simply-copying': { steps: ['Re-read the Bobo doll study\'s three conditions and identify which group learned but didn\'t perform — ask: "If they.', 'Draw a flowchart: Model\'s behaviour → Attention → Retention (symbolic coding) → [Learning acquired] → Motivation →.', 'Practice with a new scenario: "You watch a chef on TV but never cook.', 'When would performance occur?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
