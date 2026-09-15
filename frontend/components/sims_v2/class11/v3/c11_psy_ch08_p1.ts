import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch08_p1: SimDef = {
    id: 'v3_c11_psy_ch08_p1',
    title: 'Motivation and Emotion · Part 1/2',
    subtitle: 'Read the motivational cycle as a loop — and hunger as more than a reflex.',
    classLevel: 11, subject: 'psychology', topic: 'Motivation and Emotion · Part 1/2',
    chapters: ['c11_psy_ch08'],
    nodeIds: ['c11_psy_cbse_08_001', 'c11_psy_cbse_08_002', 'c11_psy_cbse_08_003', 'c11_psy_cbse_08_004', 'c11_psy_cbse_08_005', 'c11_psy_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a psychologist tracking a need that keeps coming back', intro: 'Low blood sugar, a favourite smell, a skipped lunch, a festival fast — the same body state produces wildly different hunger.', goal: 'Model motivation as a recurring cycle and explain biological motives\' cortical and cultural modulation.' },
    discovery: {
        question: 'You eat, arousal drops — so the motivational cycle is finished forever?',
        options: ['No — it\'s a loop, not a line: need rebuilds, arousal returns, and the cycle recurs as long as the need can recur', 'Yes — reduction of arousal ends motivation', 'Yes — that\'s why it\'s called a terminal state', 'No — because hunger is psychological, not biological'],
        answer: 'No — it\'s a loop, not a line: need rebuilds, arousal returns, and the cycle recurs as long as the need can recur',
        hook: 'And hunger isn\'t a glucose reflex — cortical signals, attention, stress and culture modulate the same empty stomach into different urgency.',
    },
    teaching: [
        { title: 'Nature of Motivation: Cycle of Motivation', text: 'The motivational cycle is a sequential process where a physiological or psychological deficit (need) creates a state of tension (drive) that energises the organism, leading to heightened alertness.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rediagram the cycle as a genuine loop, then weigh the claim that arousal-reduction makes all human behaviour selfish.',
        labels: ['Nature of Motivation: Cycle', 'Types of Motives: Biological', 'Types of Motives: Psychosocial', 'Maslow\'s Hierarchy of Needs', 'Nature of Emotions: Components', 'Physiological Bases of Emotion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_002', title: 'Types of Motives: Biological (Physiological) Motives',
          caseStudy: { intro: 'Imagine you skip breakfast and by 11 AM your stomach growls, you feel irritable, and the smell of samosas from the canteen becomes irresistible—why does your.',
            decisions: [{ prompt: 'What are the two primary internal physiological signals that initiate hunger according to the NCERT textbook, and which brain structure.', options: [
                { text: 'The two primary internal signals are stomach contractions (signaling emptiness) and low', outcome: 'The two primary internal signals are stomach contractions (signaling emptiness) and low blood.' },
                { text: 'empty stomach', outcome: 'Not quite — Students often believe that biological motives operate like simple reflexes: "low glucose →.', reveals: 'biological-motives-operate-like-simple' },
                { text: 'low glucose', outcome: 'Not quite — Students often believe that biological motives operate like simple reflexes: "low glucose →.', reveals: 'biological-motives-operate-like-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_003', title: 'Types of Motives: Psychosocial and Personal Motives',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who stays back after school to organize a charity event, even though he is tired and hungry.',
            decisions: [{ prompt: 'Define "psychosocial motive" and name the four main types discussed in the NCERT textbook for Class 11.', options: [
                { text: 'A psychosocial motive is a learned motivational state arising from social interaction,', outcome: 'A psychosocial motive is a learned motivational state arising from social interaction, not.' },
                { text: 'self-actualisation', outcome: 'Not quite — Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades.', reveals: 'need-for-achievement-n-ach' },
                { text: 'need for achievement', outcome: 'Not quite — Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades.', reveals: 'need-for-achievement-n-ach' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_004', title: 'Maslow\'s Hierarchy of Needs',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who stays up until 3 AM studying for a competitive exam (esteem/self-actualization) but skips dinner and feels exhausted.',
            decisions: [{ prompt: 'State the five levels of Maslow\'s hierarchy in ascending order (from base to peak) using the exact terminology from the NCERT textbook.', options: [
                { text: 'Correct order: Physiological needs → Safety needs → Belongingness needs → Esteem needs →', outcome: 'Correct order: Physiological needs → Safety needs → Belongingness needs → Esteem needs →.' },
                { text: ') reveals the student is relying on pop-psychology versions (often', outcome: 'Not quite — Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1.', reveals: 'students-treat-the-hierarchy-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_005', title: 'Nature of Emotions: Components and Functions',
          caseStudy: { intro: 'Imagine you are waiting for your Class 11 results. Your heart races (physiological), you think "What if I failed?" (cognitive), and you bite your nails.',
            decisions: [{ prompt: 'Define emotion according to the NCERT Class 11 Psychology textbook, explicitly naming its three components.', options: [
                { text: 'Emotion is a complex pattern of arousal involving physiological activation, conscious', outcome: 'Emotion is a complex pattern of arousal involving physiological activation, conscious awareness.' },
                { text: 'cognitive interpretation', outcome: 'Not quite — Students often believe that **physiological arousal alone determines the emotion** (e.g., "My heart.', reveals: 'physiological-arousal-alone-determines-the' },
                { text: 'feeling', outcome: 'Not quite — Students often believe that **physiological arousal alone determines the emotion** (e.g., "My heart.', reveals: 'physiological-arousal-alone-determines-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_006', title: 'Physiological Bases of Emotion: James-Lange and Cannon-Bard Theories',
          caseStudy: { intro: 'Imagine you are walking home at dusk and suddenly hear footsteps running behind you. Your heart pounds, your palms sweat, and you feel intense fear.',
            decisions: [{ prompt: 'State the core sequence of events proposed by the James-Lange theory of emotion in response to an emotion-arousing stimulus.', options: [
                { text: 'Correct answer: Stimulus → Physiological arousal (bodily changes) →', outcome: 'Correct answer: Stimulus → Physiological arousal (bodily changes) → Perception/interpretation.' },
                { text: 'emotion causes physiology', outcome: 'Not quite — Students often believe that the James-Lange theory says "we cry because we are sad" (common sense).', reveals: 'the-james-lange-theory-says' },
                { text: 'we cry because we are sad', outcome: 'Not quite — Students often believe that the James-Lange theory says "we cry because we are sad" (common sense).', reveals: 'the-james-lange-theory-says' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A peer-mentor explains motivation to juniors: \'The cycle is linear — need, drive, arousal, action, then done forever. And hunger is a simple reflex: glucose drops, you eat.\'',
            decisions: [{ prompt: 'What do the motivational cycle and biological motives really involve?', options: [
                { text: 'Restore the loop and the circuitry: reduction of arousal restores equilibrium only until a new need arises — that\'s why hunger returns in hours; homeostasis is a dynamic range, not an endpoint. And biological motives aren\'t reflexes: hunger integrates glucose signals, hypothalamic on/off centres, hormones like leptin, plus attention and learning — and the sex drive isn\'t homeostatic at all, lacking a set point.', outcome: 'The mentoring improves: motivation is a continuous cycle with physiological pushes gated by cortex and context — not a flowchart that ends.' },
                { text: 'Keep the linear version — once the goal is met, that motivation is finished.', outcome: 'The diagram is a circle, not a flowchart: equilibrium is temporary — new needs restart the cycle, which is why \'done forever\' can\'t explain recurrent hunger.', reveals: 'cycle-terminates-forever' },
                { text: 'Keep the reflex model — low glucose triggers eating automatically.', outcome: 'The same low-glucose state produces different eating depending on attention, stress and learned cues — cortical and inhibitory pathways gate the drive.', reveals: 'hunger-is-simple-reflex' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'The drive reduces, then the need regrows — motivation is a thermostat cycle, not a one-way journey to satisfaction.',
            decisions: [{ prompt: 'What comes next? Motivation and Emotion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Motivation and Emotion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_001', difficulty: 'standard',
          question: 'The motivational cycle is a sequential process where a physiological.',
          hint: 'If stuck, revisit the Class 10 Biology concept of **homeostasis** (c10_bio_cbse_02_004.',
          misconception: 'Students often believe the motivational cycle is a **linear, one-way sequence that terminates permanently after.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain the difference between a \'need\' and a \'drive\' using the example of a student who stays up all night to complete a project deadline.', answer: 'Need is the *deficit* (lack of completed project/good grade)',
                  options: ['Need is the *deficit* (lack of completed project/good grade)', 'the need drives me', 'treats them as synonyms (e'],
                  hint: 'If stuck, revisit the Class 10 Biology concept of **homeostasis** (c10_bio_cbse_02_004.',
                  misconception: 'Students often believe the motivational cycle is a **linear, one-way sequence that terminates permanently after \'Reduction of arousal\'**.' }
          ],
            remediations: { 'the-motivational-cycle-is-a': { steps: ['Draw the cycle on paper as a **clock face** (12 o\'clock = Need, 2 = Drive, 4 = Arousal, 6 = Behaviour, 8 = Achievement.', 'Place a pen at 12 and physically rotate it clockwise while saying: "Need creates drive, drive fuels arousal...', 'Ask: "When the clock hits 10 (reduction), does time stop? No – it continues to 12. What need appears next?"', 'Have the student generate three personal examples where a satisfied need re-emerged within 24 hours (hunger, thirst.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_002', difficulty: 'standard',
          question: 'Biological (physiological) motives are innate, genetically programmed drives.',
          hint: 'Revisit the motivational cycle diagram (Fig. 8.1 in NCERT) and practice identifying need.',
          misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biological (physiological) motives are innate, genetically programmed drives arising from',
                  options: ['Biological (physiological) motives are innate, genetically programmed drives arising from', 'The motivational cycle is a sequential process where a physiological or psychological', 'Psychosocial motives are learned motivational states that arise from an individual\'s', 'Maslow\'s Hierarchy of Needs is a motivational theory proposing that human needs are'],
                  hint: 'Revisit the motivational cycle diagram (Fig. 8.1 in NCERT) and practice identifying need, drive.',
                  misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry mouth → automatic.' }
          ],
            remediations: { 'biological-motives-operate-like-simple': { steps: ['If a student holds the reflex misconception, do this 3-step remediation: (1) Have them trace the *full* hunger pathway.', 'POMC neurons) → cortex (insula, orbitofrontal) → conscious urge.', 'Emphasize the *decision points* where learning, attention, and context intervene.', '(2) Give a concrete contrast: "A rat with lateral hypothalamus lesion starves despite food present; a human with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since hunger and thirst are biological motives, they are identical across all humans and unaffected by culture or learning."', answer: 'The statement is false',
                  options: ['The statement is false', 'misconception; a vague', 'low glucose → automatic eating', 'dry mouth → automatic drinking'],
                  hint: 'Revisit the motivational cycle diagram (Fig. 8.1 in NCERT) and practice identifying need, drive.',
                  misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry mouth → automatic.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration (ethical, non-invasive) that would allow Class 11 students to observe the interaction between an internal hunger signal.', answer: 'Independent variable: Presence vs',
                  options: ['Independent variable: Presence vs', 'low glucose → automatic eating', 'dry mouth → automatic drinking', 'set point'],
                  hint: 'Revisit the motivational cycle diagram (Fig. 8.1 in NCERT) and practice identifying need, drive.',
                  misconception: 'Students often believe that biological motives operate like simple reflexes: "low glucose → automatic eating" or "dry mouth → automatic.' }
          ],
            remediations: { 'biological-motives-operate-like-simple': { steps: ['If a student holds the reflex misconception, do this 3-step remediation: (1) Have them trace the *full* hunger pathway.', 'POMC neurons) → cortex (insula, orbitofrontal) → conscious urge.', 'Emphasize the *decision points* where learning, attention, and context intervene.', '(2) Give a concrete contrast: "A rat with lateral hypothalamus lesion starves despite food present; a human with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_003', difficulty: 'standard',
          question: 'Psychosocial motives are learned motivational states that arise from.',
          hint: 'If stuck, revisit the motivational cycle diagram (Figure 8.1) and the biological motives.',
          misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "need for power" is considered a psychosocial motive and not a biological motive, using the concept of homeostasis.', answer: 'Biological motives like hunger and thirst aim to restore homeostasis (internal',
                  options: ['Biological motives like hunger and thirst aim to restore homeostasis (internal', 'need for achievement'],
                  hint: 'If stuck, revisit the motivational cycle diagram (Figure 8.1) and the biological motives table.',
                  misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.' },
                { id: 'b', prompt: 'Compare and contrast the "need for affiliation" and "need for power" in terms of (a) the typical social situation that arouses them, and (b) the behavioral.', answer: 'the typical social situation that arouses them, and (',
                  options: ['the typical social situation that arouses them, and (', 'need for achievement'],
                  hint: 'If stuck, revisit the motivational cycle diagram (Figure 8.1) and the biological motives table.',
                  misconception: 'Students often believe that "need for achievement" (n-Ach) is simply about wanting good grades or winning competitions.' }
          ],
            remediations: { 'need-for-achievement-n-ach': { steps: ['If a student exhibits this misconception, do NOT just re-read the definition.', 'Instead: 1) Present two case vignettes: Student A chooses a very easy project to guarantee an A; Student B chooses.', '2) Ask the student to apply the three criteria (moderate difficulty, feedback-seeking, personal excellence) to each.', '3) Have the student write a one-sentence rule: "High n-Ach is shown by choosing _______ tasks and using feedback.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_004', difficulty: 'standard',
          question: 'Maslow\'s Hierarchy of Needs is a motivational theory proposing that human needs.',
          hint: 'If stuck, revisit c11_psy_cbse_08_001 (motivational cycle diagram) and.',
          misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2.',
          parts: [
                { id: 'a', prompt: 'The textbook states: "Lower level needs dominate as long as they are unsatisfied.', answer: '"Adequately satisfied" means *relatively* or *partially* met, not 100% fulfilled',
                  options: ['"Adequately satisfied" means *relatively* or *partially* met, not 100% fulfilled', 'step-ladder'],
                  hint: 'If stuck, revisit c11_psy_cbse_08_001 (motivational cycle diagram) and c11_psy_cbse_08_002/003.',
                  misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2 appears." This error stems.' },
                { id: 'b', prompt: 'The textbook notes: "Soldiers, police officers, and fire personnel have been known to protect others by facing very endangering situations, seemingly in direct.', answer: 'which higher need(s) override safety, and (',
                  options: ['which higher need(s) override safety, and (', 'training', 'altruism'],
                  hint: 'If stuck, revisit c11_psy_cbse_08_001 (motivational cycle diagram) and c11_psy_cbse_08_002/003.',
                  misconception: 'Students treat the hierarchy as a **rigid, sequential checklist**: "You must 100% finish Level 1 before Level 2 appears." This error stems.' }
          ],
            remediations: { 'students-treat-the-hierarchy-as': { steps: ['**Re-read the textbook\'s exact phrasing**: "Lower level needs dominate *as long as they are unsatisfied*.', 'Once they are *adequately satisfied*..." — highlight "adequately" ≠ "completely." 2.', '**Draw a bar graph**, not a pyramid: five vertical bars showing % satisfaction (e.g., Physio 80%, Safety 60%, Belonging.', 'This visualizes simultaneous partial satisfaction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_005', difficulty: 'standard',
          question: 'Emotion is a complex psychological state involving three distinct components:.',
          hint: 'Revisit the "Motivational Cycle" diagram (Fig 8.1) in c11_psy_cbse_08_001 and identify.',
          misconception: 'Students often believe that **physiological arousal alone determines the emotion** (e.g., "My heart is racing, so.',
          parts: [
                { id: 'a', prompt: 'Rohan sees a snake on a trek. His heart pounds, he thinks "Danger!", and he freezes. Map each of Rohan\'s responses to the three components of emotion.', answer: 'Heart pounding = physiological arousal',
                  options: ['Heart pounding = physiological arousal', 'anxiety', 'My heart is racing, so I must be afraid', '**physiological arousal alone determines the emotion** (e'],
                  hint: 'Revisit the "Motivational Cycle" diagram (Fig 8.1) in c11_psy_cbse_08_001 and identify where.',
                  misconception: 'Students often believe that **physiological arousal alone determines the emotion** (e.g., "My heart is racing, so I must be afraid").' }
          ],
            remediations: { 'physiological-arousal-alone-determines-the': { steps: ['**Re-read the definition** in the NCERT text (Chapter 8, "Nature of Emotions"): "Emotions are a complex pattern.', '**Do the "Same Arousal, Different Label" exercise**: Write three scenarios causing identical physiological arousal.', 'Explicitly write the *cognitive thought* for each (e.g., "Threat," "Insult," "Opportunity").', '**Verify with a peer**: Explain why the James-Lange theory (node c11_psy_cbse_08_006) is a *theory about the sequence*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_006', difficulty: 'standard',
          question: 'The James-Lange theory proposes that emotions arise from the perception.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 7 (Control and Coordination) nodes on human.',
          misconception: 'Students often believe that the James-Lange theory says "we cry because we are sad" (common sense) when it actually.',
          parts: [
                { id: 'a', prompt: 'State the core sequence of events proposed by the James-Lange theory of emotion in response to an emotion-arousing stimulus.', answer: 'Correct answer: Stimulus → Physiological arousal (bodily changes) →',
                  options: ['Correct answer: Stimulus → Physiological arousal (bodily changes) →', 'emotion causes physiology', 'we cry because we are sad', 'we are sad because we cry'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 7 (Control and Coordination) nodes on human brain.',
                  misconception: 'Students often believe that the James-Lange theory says "we cry because we are sad" (common sense) when it actually says "we are sad.' },
                { id: 'b', prompt: 'Explain in your own words why Cannon and Bard argued that the thalamus plays a critical role in emotional experience, and how this differs from James-Lange\'s.', answer: 'Correct answer: Cannon-Bard proposed the thalamus receives the stimulus and',
                  options: ['Correct answer: Cannon-Bard proposed the thalamus receives the stimulus and', 'thalamus creates emotion', 'thalamus is where James-Lange said perception happens', 'we cry because we are sad'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 7 (Control and Coordination) nodes on human brain.',
                  misconception: 'Students often believe that the James-Lange theory says "we cry because we are sad" (common sense) when it actually says "we are sad.' },
                { id: 'c', prompt: 'A student sees a growling dog and immediately feels fear while their heart rate increases.', answer: 'Correct answer: Stimulus (growling dog) → Thalamus → simultaneously (a) Cortex →',
                  options: ['Correct answer: Stimulus (growling dog) → Thalamus → simultaneously (a) Cortex →', 'thalamus stores emotional memories', 'we cry because we are sad', 'we are sad because we cry'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 7 (Control and Coordination) nodes on human brain.',
                  misconception: 'Students often believe that the James-Lange theory says "we cry because we are sad" (common sense) when it actually says "we are sad.' },
                { id: 'd', prompt: 'Compare the predictions of James-Lange and Cannon-Bard for a person who has a spinal cord injury that blocks visceral feedback from reaching the brain.', answer: 'Correct answer: James-Lange predicts reduced emotional intensity',
                  options: ['Correct answer: James-Lange predicts reduced emotional intensity', 'we cry because we are sad', 'we are sad because we cry'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 7 (Control and Coordination) nodes on human brain.',
                  misconception: 'Students often believe that the James-Lange theory says "we cry because we are sad" (common sense) when it actually says "we are sad.' }
          ],
            remediations: { 'the-james-lange-theory-says': { steps: ['Have the student physically act out a scenario (e.g., "pretend to see a snake") and narrate the sequence aloud for each.', 'Use a two-column table on paper: Column A = James-Lange steps, Column B = Cannon-Bard steps.', 'Force the student to fill each cell with one phrase (Stimulus, Thalamus, Cortex, Body, Perception, Emotion).', 'Explicitly contrast the role of the thalamus: "James-Lange doesn\'t need a thalamus; Cannon-Bard makes it the splitter.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
