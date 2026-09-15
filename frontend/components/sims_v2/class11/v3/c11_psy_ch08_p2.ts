import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch08_p2: SimDef = {
    id: 'v3_c11_psy_ch08_p2',
    title: 'Motivation and Emotion · Part 2/2',
    subtitle: 'Read the motivational cycle as a loop — and hunger as more than a reflex.',
    classLevel: 11, subject: 'psychology', topic: 'Motivation and Emotion · Part 2/2',
    chapters: ['c11_psy_ch08'],
    nodeIds: ['c11_psy_cbse_08_007', 'c11_psy_cbse_08_008', 'c11_psy_cbse_08_009', 'c11_psy_cbse_08_010', 'c11_psy_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a psychologist tracking a need that keeps coming back', intro: 'Low blood sugar, a favourite smell, a skipped lunch, a festival fast — the same body state produces wildly different hunger.', goal: 'Model motivation as a recurring cycle and explain biological motives\' cortical and cultural modulation.' },
    discovery: {
        question: 'You eat, arousal drops — so the motivational cycle is finished forever?',
        options: ['No — it\'s a loop, not a line: need rebuilds, arousal returns, and the cycle recurs as long as the need can recur', 'Yes — reduction of arousal ends motivation', 'Yes — that\'s why it\'s called a terminal state', 'No — because hunger is psychological, not biological'],
        answer: 'No — it\'s a loop, not a line: need rebuilds, arousal returns, and the cycle recurs as long as the need can recur',
        hook: 'And hunger isn\'t a glucose reflex — cortical signals, attention, stress and culture modulate the same empty stomach into different urgency.',
    },
    teaching: [
        { title: 'Cognitive Bases of Emotion: Schachter-Singer Two-Factor Theory', text: 'The Schachter-Singer Two-Factor Theory proposes that emotion is determined by two factors: (1) physiological arousal, and (2) a cognitive label for that arousal based on the situational context.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rediagram the cycle as a genuine loop, then weigh the claim that arousal-reduction makes all human behaviour selfish.',
        labels: ['Cognitive Bases of Emotion', 'Cultural Bases of Emotion', 'Expression of Emotions: Facial', 'Managing Negative Emotions: Coping', 'Enhancing Positive Emotions'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_007', title: 'Cognitive Bases of Emotion: Schachter-Singer Two-Factor Theory',
          caseStudy: { intro: 'Imagine you are walking alone at night and suddenly hear footsteps behind you. Your heart pounds, palms sweat, and breathing quickens.',
            decisions: [{ prompt: 'What are the two factors in the Schachter-Singer Two-Factor Theory of emotion?', options: [
                { text: 'The two factors are (1) general physiological arousal and (2) cognitive labeling of that', outcome: 'The two factors are (1) general physiological arousal and (2) cognitive labeling of that arousal.' },
                { text: 'physiological arousal and behavioral response', outcome: 'Not quite — Students frequently believe the Two-Factor Theory claims "cognition causes emotion" in a simple.', reveals: 'students-frequently-believe-the-two' },
                { text: 'cognitive appraisal and physiological response', outcome: 'Not quite — Students frequently believe the Two-Factor Theory claims "cognition causes emotion" in a simple.', reveals: 'students-frequently-believe-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_008', title: 'Cultural Bases of Emotion: Universality and Cultural Variation',
          caseStudy: { intro: 'Imagine you are watching a cricket match: an Indian player gets out for zero and covers his face with his cap, while an Australian player slams his bat on the.',
            decisions: [{ prompt: 'Name the six basic emotions identified by Paul Ekman as universal across cultures, and state the key methodological evidence he used.', options: [
                { text: 'The six basic emotions are anger, disgust, fear, happiness, sadness, and surprise', outcome: 'The six basic emotions are anger, disgust, fear, happiness, sadness, and surprise.' },
                { text: 'love, jealousy, pride', outcome: 'Not quite — Students often believe "universality means everyone expresses emotions the same way" — they.', reveals: 'universality-means-everyone-expresses-emotions' },
                { text: 'universality means everyone expresses emotions the same way', outcome: 'Not quite — Students often believe "universality means everyone expresses emotions the same way" — they.', reveals: 'universality-means-everyone-expresses-emotions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_009', title: 'Expression of Emotions: Facial Expressions and Body Language',
          caseStudy: { intro: 'Imagine you are watching a Bharatanatyam performance: the dancer lowers her eyes, curves her fingers into a specific mudra, and shifts her weight — you.',
            decisions: [{ prompt: 'Name the six basic emotions identified by Paul Ekman as having universal facial expressions across cultures.', options: [
                { text: 'The six universal basic emotions are happiness, sadness, anger, fear, disgust, and', outcome: 'The six universal basic emotions are happiness, sadness, anger, fear, disgust, and surprise.' },
                { text: 'jealousy', outcome: 'Not quite — Students often believe "body language is universal and unambiguous — crossed arms *always* mean.', reveals: 'body-language-is-universal-and' },
                { text: '"body language is universal and unambiguous', outcome: 'Not quite — Students often believe "body language is universal and unambiguous — crossed arms *always* mean.', reveals: 'body-language-is-universal-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_010', title: 'Managing Negative Emotions: Coping Strategies',
          caseStudy: { intro: 'Imagine you have just received your Class 11 mid-term results and your Physics score is 15 marks below your target — your stomach tightens, thoughts race.',
            decisions: [{ prompt: 'Define "coping" according to Lazarus and Folkman\'s transactional model and distinguish it from "defense mechanisms" in terms.', options: [
                { text: 'Coping refers to constantly changing cognitive and behavioral efforts to manage specific', outcome: 'Coping refers to constantly changing cognitive and behavioral efforts to manage specific.' },
                { text: 'any way of handling stress', outcome: 'Not quite — Students believe "coping = staying positive / avoiding negative thoughts" and equate.', reveals: 'coping-staying-positive-avoiding-negative' },
                { text: 'explain the difference between coping and defense mechanisms with examples', outcome: 'Not quite — Students believe "coping = staying positive / avoiding negative thoughts" and equate.', reveals: 'coping-staying-positive-avoiding-negative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_011', title: 'Enhancing Positive Emotions and Emotional Well-being',
          caseStudy: { intro: 'Imagine you just received your Class 11 mid-term results and they\'re disappointing — you feel deflated and anxious about the future.',
            decisions: [{ prompt: 'A student says: "If I just stop feeling anxious and sad, I\'ll automatically become happy and optimistic." Using the NCERT distinction.', options: [
                { text: 'Correct answer: The statement incorrectly assumes positive and negative emotions exist on', outcome: 'Correct answer: The statement incorrectly assumes positive and negative emotions exist on a single.' },
                { text: 'hydraulic model', outcome: 'Not quite — Students believe "enhancing positive emotions" means forcing oneself to feel happy all the time and.', reveals: 'enhancing-positive-emotions-means-forcing' },
                { text: 'enhancing positive emotions', outcome: 'Not quite — Students believe "enhancing positive emotions" means forcing oneself to feel happy all the time and.', reveals: 'enhancing-positive-emotions-means-forcing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A peer-mentor explains motivation to juniors: \'The cycle is linear — need, drive, arousal, action, then done forever. And hunger is a simple reflex: glucose drops, you eat.\'',
            decisions: [{ prompt: 'What do the motivational cycle and biological motives really involve?', options: [
                { text: 'Restore the loop and the circuitry: reduction of arousal restores equilibrium only until a new need arises — that\'s why hunger returns in hours; homeostasis is a dynamic range, not an endpoint. And biological motives aren\'t reflexes: hunger integrates glucose signals, hypothalamic on/off centres, hormones like leptin, plus attention and learning — and the sex drive isn\'t homeostatic at all, lacking a set point.', outcome: 'The mentoring improves: motivation is a continuous cycle with physiological pushes gated by cortex and context — not a flowchart that ends.' },
                { text: 'Keep the linear version — once the goal is met, that motivation is finished.', outcome: 'The diagram is a circle, not a flowchart: equilibrium is temporary — new needs restart the cycle, which is why \'done forever\' can\'t explain recurrent hunger.', reveals: 'cycle-terminates-forever' },
                { text: 'Keep the reflex model — low glucose triggers eating automatically.', outcome: 'The same low-glucose state produces different eating depending on attention, stress and learned cues — cortical and inhibitory pathways gate the drive.', reveals: 'hunger-is-simple-reflex' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'The drive reduces, then the need regrows — motivation is a thermostat cycle, not a one-way journey to satisfaction.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_007', difficulty: 'standard',
          question: 'The Schachter-Singer Two-Factor Theory proposes that emotion is determined.',
          hint: 'Review the Physiological Bases of Emotion node (c11_psy_cbse_08_006) and the Nature.',
          misconception: 'Students frequently believe the Two-Factor Theory claims "cognition causes emotion" in a simple linear way, or they.',
          parts: [
                { id: 'a', prompt: 'A student drinks a strong coffee before an important exam. During the exam, she notices her heart racing and hands trembling.', answer: 'Source of arousal: caffeine (coffee)',
                  options: ['Source of arousal: caffeine (coffee)', 'cognition causes emotion'],
                  hint: 'Review the Physiological Bases of Emotion node (c11_psy_cbse_08_006) and the Nature of Emotions.',
                  misconception: 'Students frequently believe the Two-Factor Theory claims "cognition causes emotion" in a simple linear way, or they confuse it with the.' }
          ],
            remediations: { 'students-frequently-believe-the-two': { steps: ['Have the student draw three timeline diagrams side-by-side: James-Lange (Stimulus → Arousal → Emotion), Cannon-Bard.', 'Use the "coffee before exam" scenario: physically act out the arousal (pounding heart) and ask the student to generate.', 'caffeine) and state the resulting emotion.', 'Re-read the epinephrine experiment description in the textbook, highlighting the "uninformed" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe the Two-Factor Theory claims "cognition causes emotion" in a simple linear way, or they.',
          parts: [
                { id: 'a', prompt: 'Design a simple field experiment (in an Indian school setting) to test whether misattribution of arousal can alter the intensity of reported emotion.', answer: 'IV: Source attribution for arousal (two levels: "exercise-induced" vs',
                  options: ['IV: Source attribution for arousal (two levels: "exercise-induced" vs', 'cognition causes emotion'],
                  hint: 'Review the Physiological Bases of Emotion node (c11_psy_cbse_08_006) and the Nature of Emotions.',
                  misconception: 'Students frequently believe the Two-Factor Theory claims "cognition causes emotion" in a simple linear way, or they confuse it with the.' }
          ],
            remediations: { 'students-frequently-believe-the-two': { steps: ['Have the student draw three timeline diagrams side-by-side: James-Lange (Stimulus → Arousal → Emotion), Cannon-Bard.', 'Use the "coffee before exam" scenario: physically act out the arousal (pounding heart) and ask the student to generate.', 'caffeine) and state the resulting emotion.', 'Re-read the epinephrine experiment description in the textbook, highlighting the "uninformed" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_008', difficulty: 'standard',
          question: 'Cultural bases of emotion refer to the systematic influence of cultural norms.',
          hint: 'Revisit c11_psy_cbse_08_005 "Nature of Emotions: Components and Functions" — focus on the.',
          misconception: 'Students often believe "universality means everyone expresses emotions the same way" — they conflate *recognition.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the gaze behavior norms during emotional conversations in (a) Latin American/Southern European cultures and (b) South Asian.', answer: 'Latin American/Southern European norm: Direct eye contact maintained with the',
                  options: ['Latin American/Southern European norm: Direct eye contact maintained with the', 'Indians avoid eye contact', 'Latin Americans stare', 'universality means everyone expresses emotions the same way'],
                  hint: 'Revisit c11_psy_cbse_08_005 "Nature of Emotions: Components and Functions" — focus on the basic.',
                  misconception: 'Students often believe "universality means everyone expresses emotions the same way" — they conflate *recognition universality* (the face.' }
          ],
            remediations: { 'universality-means-everyone-expresses-emotions': { steps: ['Show the student two 10-second clips — a Japanese participant in Ekman\'s 1972 study watching a stressful film alone.', 'Map the student\'s "universality = same expression" onto the clip: "If universality meant identical expression, the.', 'Re-teach the two-layer model: Layer 1 (biological) = facial affect program (universal).', 'Practice with Indian examples: *lajja* masks anger; *namaste* masks pride.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_009', difficulty: 'standard',
          question: 'Expression of emotions refers to the process by which internal emotional states.',
          hint: 'If stuck, revisit the "Nature of Emotions" node (c11_psy_cbse_08_005) for the component.',
          misconception: 'Students often believe "body language is universal and unambiguous — crossed arms *always* mean defensiveness." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Expression of emotions refers to the process by',
                  options: ['Expression of emotions refers to the process by', 'The motivational cycle is a sequential process where a physiological or psychological', 'Biological (physiological) motives are innate, genetically programmed drives arising from', 'Psychosocial motives are learned motivational states that arise from an individual\'s'],
                  hint: 'If stuck, revisit the "Nature of Emotions" node (c11_psy_cbse_08_005) for the component model and.',
                  misconception: 'Students often believe "body language is universal and unambiguous — crossed arms *always* mean defensiveness." This error arises from.' }
          ],
            remediations: { 'body-language-is-universal-and': { steps: ['Show the student two photos of the same person with crossed arms — one shivering in winter, one arguing — and ask.', 'Have them record 30 seconds of their own natural conversation, then replay identifying *their* own posture shifts and.', 'Assign the "cultural script" exercise: interview one elder about gaze norms in their youth vs. now, documenting change.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_010', difficulty: 'standard',
          question: 'Coping strategies are conscious, effortful cognitive and behavioral efforts.',
          hint: 'Revisit Schachter-Singer two-factor theory (c11_psy_cbse_08_007) — specifically the role.',
          misconception: 'Students believe "coping = staying positive / avoiding negative thoughts" and equate emotion-focused coping with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Coping strategies are conscious, effortful cognitive and behavioral efforts to manage',
                  options: ['Coping strategies are conscious, effortful cognitive and behavioral efforts to manage', 'The motivational cycle is a sequential process where a physiological or psychological', 'Biological (physiological) motives are innate, genetically programmed drives arising from', 'Psychosocial motives are learned motivational states that arise from an individual\'s'],
                  hint: 'Revisit Schachter-Singer two-factor theory (c11_psy_cbse_08_007) — specifically the role.',
                  misconception: 'Students believe "coping = staying positive / avoiding negative thoughts" and equate emotion-focused coping with "giving up." They miss.' }
          ],
            remediations: { 'coping-staying-positive-avoiding-negative': { steps: ['Have the student identify a recent negative emotion (anger/anxiety) and write the exact triggering thought ("She.', 'Use the "courtroom technique" — list evidence *for* and *against* the thought on two columns; highlight the cognitive.', 'Co-create a balanced thought ("She may be busy; I\'ll check later") and rate belief (0-100%).', 'Assign a behavioral test (send a neutral message, observe reply).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_08_011', difficulty: 'standard',
          question: 'Enhancing positive emotions refers to the deliberate cultivation of affective.',
          hint: 'If confused about how positive emotions differ from "just not feeling bad," revisit.',
          misconception: 'Students believe "enhancing positive emotions" means forcing oneself to feel happy all the time and suppressing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Enhancing positive emotions refers to the deliberate cultivation of affective states such',
                  options: ['Enhancing positive emotions refers to the deliberate cultivation of affective states such', 'The motivational cycle is a sequential process where a physiological or psychological', 'Biological (physiological) motives are innate, genetically programmed drives arising from', 'Psychosocial motives are learned motivational states that arise from an individual\'s'],
                  hint: 'If confused about how positive emotions differ from "just not feeling bad," revisit.',
                  misconception: 'Students believe "enhancing positive emotions" means forcing oneself to feel happy all the time and suppressing negative feelings — they.' }
          ],
            remediations: { 'enhancing-positive-emotions-means-forcing': { steps: ['Ask the student to read the NCERT lines "Positive emotions give us a greater ability to cope with adverse circumstances.', 'Use the "two continuums" diagram: draw X-axis (negative affect: low to high) and Y-axis (positive affect: low to high).', 'Give a concrete redo: "Rewrite your grandmother example so it acknowledges the grief AND identifies a constructive.', 'Assign a 3-day log: each evening, record one negative emotion felt, one positive emotion cultivated, and one action.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
