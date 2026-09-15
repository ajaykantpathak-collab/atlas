import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch01_p3: SimDef = {
    id: 'v3_c12_eng_k_ch01_p3',
    title: 'I Sell My Dreams (Short Story) · Part 3/3',
    subtitle: 'She paid the rent with prophecies — and a wave proved her right',
    classLevel: 12, subject: 'eng_k', topic: 'I Sell My Dreams (Short Story) · Part 3/3',
    chapters: ['c12_eng_k_ch01'],
    nodeIds: ['c12_eng_k_cbse_01_013', 'c12_eng_k_cbse_01_014', 'c12_eng_k_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Latin American literature reader', intro: 'A woman dreams, warns, survives — and nobody in the story finds it strange. Welcome to magical realism.', goal: 'Situate I Sell My Dreams in Marquez\'s magical realism and its dual settings, reading the dream-trade against history.' },
    discovery: {
        question: 'In post-war Vienna — a city of spies, refugees and black markets — a woman earns her living selling her dreams. Why does that setting make the trade plausible?',
        options: ['Chaos craves certainty — a city of displacement and espionage is exactly where prophecy becomes a sellable commodity', 'Dreams were currency back then', 'Vienna banned other jobs for women', 'It\'s a random backdrop'],
        answer: 'Chaos craves certainty — a city of displacement and espionage is exactly where prophecy becomes a sellable commodity',
        hook: 'Magical realism isn\'t fantasy — the impossible is told in a reporter\'s flat voice. Marquez was a journalist; the Havana disaster opens like a news dispatch, and Frau Frieda\'s prophetic dreams are treated as ordinary employment. Blur that register and you misread the whole story.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the process of actively evaluating a text by questioning its assumptions, interpreting its symbols and themes, analyzing the author\'s narrative choices, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Straddle two worlds — spy-ring Vienna and hurricane-hit Havana: map the frame narrative, weigh Neruda\'s rationality against Frau Frieda\'s gift, and decide whether her dreams are prophecy or survival strategy.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you read a horoscope that says "avoid travel today," so you cancel a trip — and later hear the train derailed.',
            decisions: [{ prompt: 'What is the central symbol in "I Sell My Dreams" that connects the three main encounters (Vienna, Barcelona, Havana), and what does.', options: [
                { text: 'The central symbol is the gold serpent ring with emerald eyes', outcome: 'The central symbol is the gold serpent ring with emerald eyes.' },
                { text: 'the ring represents evil', outcome: 'Not quite — Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the.', reveals: 'the-story-proves-frau-frieda' },
                { text: 'the ring is just jewelry', outcome: 'Not quite — Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the.', reveals: 'the-story-proves-frau-frieda' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you just finished reading *I Sell My Dreams* and your teacher asks: "Write a paragraph explaining how the snake ring functions as a symbol." You might.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature?', options: [
                { text: 'PEEL stands for **Point** (topic sentence stating the argument), **Evidence** (a quote or', outcome: 'PEEL stands for **Point** (topic sentence stating the argument), **Evidence** (a quote or specific.' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students treat "writing skills based on the chapter" as **plot retelling with adjectives**.', reveals: 'students-treat-writing-skills-based' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a CUET interview panel discussing how literature blurs reality and fantasy — you need to speak confidently about Marquez\'s story while.',
            decisions: [{ prompt: 'What is the primary purpose of a literary group discussion in the Class 12 English Board examination context?', options: [
                { text: 'The primary purpose is to assess a student\'s ability to articulate interpretations of a', outcome: 'The primary purpose is to assess a student\'s ability to articulate interpretations of a text.' },
                { text: 'to summarize the plot', outcome: 'Not quite — Students often think a "good discussion" means speaking the most or impressing with vocabulary.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'good discussion', outcome: 'Not quite — Students often think a "good discussion" means speaking the most or impressing with vocabulary.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A colleague had a vivid dream about a train derailment and wants the whole team to cancel tomorrow\'s site visit. Márquez\'s dream-seller is suddenly the office\'s most quoted source.',
            decisions: [{ prompt: 'Cancel on a dream?', options: [
                { text: 'No — dreams are stories the mind tells, not evidence about the world; check the actual safety record and travel advisories, and treat the dream as a prompt to verify, not to obey.', outcome: 'Frau Frieda\'s dreams sell because they feel prophetic; real decisions still need checkable facts, not portents.' },
                { text: 'Cancel — dreams have predicted things before, so why risk it.', outcome: 'One uncanny hit among thousands of forgotten dreams is an anecdote, not a forecasting system.', reveals: 'anecdote-as-evidence' },
                { text: 'Ignore it entirely — feelings about a trip are irrational noise.', outcome: 'Dismissing the anxiety hides a legitimate prompt to double-check real risks; the dream is data about the dreamer.', reveals: 'dismiss-the-signal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now read the fantastic as fact and hear how a Nobel journalist-novelist fuses reportage with prophecy. Magical realism stops being a label and becomes a lens.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the process of actively evaluating.',
          hint: 'If stuck, return to node 009 (Irony and Symbolism) to re-examine the serpent ring and the.',
          misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her.',
          parts: [
                { id: 'a', prompt: 'What is the central symbol in "I Sell My Dreams" that connects the three main encounters (Vienna, Barcelona, Havana), and what does it represent?', answer: 'The central symbol is the gold serpent ring with emerald eyes',
                  options: ['The central symbol is the gold serpent ring with emerald eyes', 'the ring represents evil', 'the ring is just jewelry'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) to re-examine the serpent ring and the final.',
                  misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her and the brother chokes.' },
                { id: 'b', prompt: 'Explain in your own words why the author calls Frau Frieda\'s dreams "a stratagem for surviving" — and why he still never returns to Vienna.', answer: 'The author calls her dreams a survival stratagem',
                  options: ['The author calls her dreams a survival stratagem', 'he believes her dreams were real', 'he forgot about her'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) to re-examine the serpent ring and the final.',
                  misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her and the brother chokes.' },
                { id: 'c', prompt: 'In the Barcelona episode, Neruda says, "Only poetry is clairvoyant." Apply this statement to analyze how Marquez uses *magical realism* in this story — give.', answer: 'Magical realism presents the supernatural as mundane',
                  options: ['Magical realism presents the supernatural as mundane', 'the wave is a metaphor for fate', 'it\'s just a storm'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) to re-examine the serpent ring and the final.',
                  misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her and the brother chokes.' },
                { id: 'd', prompt: 'Compare Frau Frieda and Pablo Neruda as two "dreamers" in the story. How does their contrast structure the story\'s meditation on truth?', answer: 'Frau Frieda sells dreams as a commodity for survival',
                  options: ['Frau Frieda sells dreams as a commodity for survival', 'Neruda is rational, Frau Frieda is magical'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) to re-examine the serpent ring and the final.',
                  misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her and the brother chokes.' }
          ],
            remediations: { 'the-story-proves-frau-frieda': { steps: ['If a student insists the dreams are proven true: 1) Have them re-read the choking scene (paragraph 4 of story) and.', '2) Ask: "Who tells us the dream meant \'don\'t eat sweets\'?" Answer: Frau Frieda.', '3) Compare with the Neruda episode: Neruda dreams *about* her dreaming — a literary mirror, not a confirmation.', '4) Assign a 100-word response: "Why does the author say \'just in case\' if he knows it\'s a stratagem?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her.',
          parts: [
                { id: 'a', prompt: 'Evaluate the final exchange with the Portuguese ambassador: "In concrete terms, what did she do?" "Nothing.', answer: 'It *undermines* her supernatural power but *validates* her real power',
                  options: ['It *undermines* her supernatural power but *validates* her real power', 'it proves she was a fraud', 'it proves dreams are real'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) to re-examine the serpent ring and the final.',
                  misconception: 'Students often believe the story *proves* Frau Frieda\'s dreams were genuinely prophetic because the author obeys her and the brother chokes.' }
          ],
            remediations: { 'the-story-proves-frau-frieda': { steps: ['If a student insists the dreams are proven true: 1) Have them re-read the choking scene (paragraph 4 of story) and.', '2) Ask: "Who tells us the dream meant \'don\'t eat sweets\'?" Answer: Frau Frieda.', '3) Compare with the Neruda episode: Neruda dreams *about* her dreaming — a literary mirror, not a confirmation.', '4) Assign a 100-word response: "Why does the author say \'just in case\' if he knows it\'s a stratagem?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills based on a literary chapter involve the ability to compose.',
          hint: 'If stuck on evidence selection, return to c12_eng_k_cbse_01_012 (Comprehension) and.',
          misconception: 'Students treat "writing skills based on the chapter" as **plot retelling with adjectives**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on a literary chapter involve the ability to compose structured,',
                  options: ['Writing skills based on a literary chapter involve the ability to compose structured,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot refers to the sequence of events as presented in the narrative, while narrative', 'Setting in "I Sell My Dreams" refers to the specific geographical locations (Havana,'],
                  hint: 'If stuck on evidence selection, return to c12_eng_k_cbse_01_012 (Comprehension) and practice "Find.',
                  misconception: 'Students treat "writing skills based on the chapter" as **plot retelling with adjectives**. They write: "The wave was huge and scary.' }
          ],
            remediations: { 'students-treat-writing-skills-based': { steps: ['**Identify the gap**: Ask the student to highlight every sentence in their answer that states a plot fact vs.', 'every sentence that explains *significance*.', 'If >70% are plot facts, they are summarizing.', '**Revisit Node c12_eng_k_cbse_01_013 (Critical Thinking)**: Review how to move from literal to inferential.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit c12_eng_k_cbse_01_013 (Critical Thinking) and practice the.',
          misconception: 'Students often think a "good discussion" means speaking the most or impressing with vocabulary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral communication',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral communication', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot refers to the sequence of events as presented in the narrative, while narrative', 'Setting in "I Sell My Dreams" refers to the specific geographical locations (Havana,'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_01_013 (Critical Thinking) and practice the.',
                  misconception: 'Students often think a "good discussion" means speaking the most or impressing with vocabulary.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['If a student exhibits the above misconception: (1) Show a 2-minute video of a model ASL discussion (available on CBSE.', '(3) Provide a checklist rubric (Content, Coherence, Collaboration, Textual Evidence) and have them self-score.', '(4) Revisit c12_eng_k_cbse_01_013 (Critical Thinking) to reinforce evidence-based reasoning, then re-attempt a full.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
