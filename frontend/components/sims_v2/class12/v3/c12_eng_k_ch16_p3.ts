import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch16_p3: SimDef = {
    id: 'v3_c12_eng_k_ch16_p3',
    title: 'Film-Making (Non-fiction) · Part 3/3',
    subtitle: 'The conjurer\'s secret: you sit in darkness 27 minutes an hour',
    classLevel: 12, subject: 'eng_k', topic: 'Film-Making (Non-fiction) · Part 3/3',
    chapters: ['c12_eng_k_ch16'],
    nodeIds: ['c12_eng_k_cbse_16_013', 'c12_eng_k_cbse_16_014', 'c12_eng_k_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Film-craft essayist', intro: 'The \'poet of the human face\' explains why a screenplay can never contain a film — and why that\'s the point.', goal: 'Understand Bergman\'s film-as-rhythm philosophy, the conjurer and cathedral metaphors, and the adaptation debate with Eco.' },
    discovery: {
        question: 'Bergman calls the film-maker a conjurer whose audience sits in total darkness 27 minutes of every hour. What\'s the deception?',
        options: ['Persistence of vision — 24 still frames per second with dark gaps between them read as continuous motion; cinema is an illusion that works on the eye', 'Film is fake — nothing moves', 'Audiences nap during films', 'Projectors steal time'],
        answer: 'Persistence of vision — 24 still frames per second with dark gaps between them read as continuous motion; cinema is an illusion that works on the eye',
        hook: 'Bergman insists film is closer to music than literature — it hits emotion through rhythm and montage, not intellect. That\'s why he calls the script \'a very imperfect technical basis\': dialogue survives translation, but a film\'s breathing — its moods, tones, tensions — never fits into words.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Film-Making\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_16_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Argue film vs literature like Bergman: test the conjurer metaphor on a famous scene\'s editing rhythm, then cross-examine Eco\'s regret that an adaptation fixes \'how the reader must imagine.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Film-Making\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is Bergman\'s central metaphor for the film-maker\'s craft, and what specific childhood experience does he link to it?', options: [
                { text: 'Bergman\'s central metaphor is the film-maker as **conjurer** (magician), exploiting the', outcome: 'Bergman\'s central metaphor is the film-maker as **conjurer** (magician), exploiting the.' },
                { text: 'director as author', outcome: 'Not quite — **Misconception**: "Critical analysis of this chapter means summarizing Bergman\'s biography and.', reveals: 'misconception-critical-analysis-of-this' },
                { text: 'film as literature', outcome: 'Not quite — **Misconception**: "Critical analysis of this chapter means summarizing Bergman\'s biography and.', reveals: 'misconception-critical-analysis-of-this' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Film-Making\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'Define the PEEL structure for a CBSE English long answer and state the function of each component in one sentence.', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (direct quote or', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (direct quote or precise.' },
                { text: 'How does Bergman use autobiography to explain his art?', outcome: 'Not quite — Students treat \'Writing Skills\' as *summarising the chapter in their own words*.', reveals: 'students-treat-writing-skills-as' },
                { text: 'Compare Bergman and Eco on adaptation', outcome: 'Not quite — Students treat \'Writing Skills\' as *summarising the chapter in their own words*.', reveals: 'students-treat-writing-skills-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Film-Making\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the central metaphor Bergman uses to describe the relationship between a film-maker and the audience, and what does it imply about.', options: [
                { text: 'Bergman uses the metaphor of a "conjurer" (magician) performing tricks with an apparatus', outcome: 'Bergman uses the metaphor of a "conjurer" (magician) performing tricks with an apparatus that.' },
                { text: 'director is a teacher', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat or rote memorization of answers.', reveals: 'students-treat-speaking-and-listening' },
                { text: 'film is a mirror', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat or rote memorization of answers.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A studio buys rights to a dense literary novel and instructs the director: \'translate it page-for-page — faithfulness is everything.\'',
            decisions: [{ prompt: 'Would Bergman sign off?', options: [
                { text: 'No — Bergman says film and literature are different languages; a literal translation wastes enormous effort for little fruit — reinvent the story in film\'s own terms or don\'t adapt it.', outcome: 'The conjurer works with rhythm and image on the nerves, not with sentences; fidelity to the letter can betray the spirit.' },
                { text: 'Yes — faithful means page-for-page, anything less betrays the book.', outcome: 'Bergman\'s warning is that the \'complicated adjustments\' of literal adaptation usually bear no fruit; faithfulness is to the experience, not the page order.', reveals: 'faithful-equals-literal' },
                { text: 'Adapt anything — a film is basically an illustrated book anyway.', outcome: 'That erases the medium\'s distinct address to emotion; film isn\'t literature with pictures.', reveals: 'film-is-illustrated-text' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'You can now defend cinema as its own language — rhythm and illusion, not filmed prose. Bergman gives you a craftsman\'s manifesto for an entire art form.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_013', difficulty: 'standard',
          question: 'Critical thinking on \'Film-Making\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, revisit **c11_eng_h_cbse_01_013** (Class 11 Hornbill Critical Thinking).',
          misconception: '**Misconception**: "Critical analysis of this chapter means summarizing Bergman\'s biography and listing his film.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Film-Making\'',
                  options: ['Critical thinking on \'Film-Making\'', '\'Film-Making\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Film-Making\'', 'The setting of \'Film-Making\''],
                  hint: 'If stuck, revisit **c11_eng_h_cbse_01_013** (Class 11 Hornbill Critical Thinking) — specifically.',
                  misconception: '**Misconception**: "Critical analysis of this chapter means summarizing Bergman\'s biography and listing his film titles, then doing the.' }
          ],
            remediations: { 'misconception-critical-analysis-of-this': { steps: ['If a student falls into the biography-summary trap: 1.', 'Tell me in one sentence: What is Bergman *arguing* about film vs.', '**Model**: Show a 2-column table: LEFT = "What Bergman/Eco *say* (claims)", RIGHT = "How they *support*.', 'Fill one row together: Claim: "Film is rhythm, not story." Evidence: "27 minutes of darkness per hour," "music works.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Critical analysis of this chapter means summarizing Bergman\'s biography and listing his film.',
          parts: [
                { id: 'a', prompt: 'Evaluate Eco\'s statement: "I discovered that 80 per cent of readers read the book after the movie.', answer: '**Yes, the pain is justified**',
                  options: ['**Yes, the pain is justified**', 'both hate adaptations', 'summary-based'],
                  hint: 'If stuck, revisit **c11_eng_h_cbse_01_013** (Class 11 Hornbill Critical Thinking) — specifically.',
                  misconception: '**Misconception**: "Critical analysis of this chapter means summarizing Bergman\'s biography and listing his film titles, then doing the.' }
          ],
            remediations: { 'misconception-critical-analysis-of-this': { steps: ['If a student falls into the biography-summary trap: 1.', 'Tell me in one sentence: What is Bergman *arguing* about film vs.', '**Model**: Show a 2-column table: LEFT = "What Bergman/Eco *say* (claims)", RIGHT = "How they *support*.', 'Fill one row together: Claim: "Film is rhythm, not story." Evidence: "27 minutes of darkness per hour," "music works.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_014', difficulty: 'standard',
          question: 'Writing skills from \'Film-Making\' — using the text as a model or springboard.',
          hint: 'If stuck, return to c12_eng_k_cbse_16_013 (Critical Thinking) and re-do the \'Talking.',
          misconception: 'Students treat \'Writing Skills\' as *summarising the chapter in their own words*.',
          parts: [
                { id: 'a', prompt: 'Using the \'club sandwich\' metaphor from the Eco interview, write a 3-sentence PEEL Explanation analysing how this metaphor critiques film adaptation.', answer: 'Eco\'s \'club sandwich\' metaphor',
                  options: ['Eco\'s \'club sandwich\' metaphor', 'How does Bergman use autobiography to explain his art?', 'Compare Bergman and Eco on adaptation'],
                  hint: 'If stuck, return to c12_eng_k_cbse_16_013 (Critical Thinking) and re-do the \'Talking about the.',
                  misconception: 'Students treat \'Writing Skills\' as *summarising the chapter in their own words*.' },
                { id: 'b', prompt: 'Compare Bergman\'s \'conjurer\' analogy (para 4) and Eco\'s \'Chinese wise man\' storytelling (interview opening).', answer: 'Bergman\'s \'conjurer\' metaphor',
                  options: ['Bergman\'s \'conjurer\' metaphor', 'How does Bergman use autobiography to explain his art?', 'Compare Bergman and Eco on adaptation'],
                  hint: 'If stuck, return to c12_eng_k_cbse_16_013 (Critical Thinking) and re-do the \'Talking about the.',
                  misconception: 'Students treat \'Writing Skills\' as *summarising the chapter in their own words*.' }
          ],
            remediations: { 'students-treat-writing-skills-as': { steps: ['Give the student a 6-mark question from a past CBSE paper (e.g., "Autobiographical accounts make interesting reading.', 'Have them highlight every sentence that is *not* a direct answer to the question (i.e., pure narration).', 'Delete all highlighted sentences.', 'For each remaining idea, force a PEEL rewrite: "What is your POINT? What is your EVIDENCE (quote)?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_015', difficulty: 'standard',
          question: 'Discussion points on \'Film-Making\' — speaking and listening around the text.',
          hint: 'If stuck, return to c12_eng_k_cbse_16_013 "Critical Thinking" and re-do the "Talking.',
          misconception: 'Students treat "Speaking and Listening" as informal chat or rote memorization of answers.',
          parts: [
                { id: 'a', prompt: 'Using the PEEL structure, construct a 90-second spoken response to: "Eco says 80% of readers read the book after the movie.', answer: 'A strong response: Point — It is a violation',
                  options: ['A strong response: Point — It is a violation', 'What do you think?', 'I think it\'s good', 'Bergman says X (quote)'],
                  hint: 'If stuck, return to c12_eng_k_cbse_16_013 "Critical Thinking" and re-do the "Talking about the.',
                  misconception: 'Students treat "Speaking and Listening" as informal chat or rote memorization of answers.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['Have the student re-read the "Stop and Think" questions in the NCERT text — these are ready-made discussion prompts.', 'Practice the "Listen-Build-Challenge" drill: Student A makes a claim with evidence; Student B repeats the claim, adds.', 'Record a 1-minute response to Diagnostic Question 3, transcribe it, and highlight every claim not backed by a textual.', 'Re-do until 100% claims are evidenced.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
