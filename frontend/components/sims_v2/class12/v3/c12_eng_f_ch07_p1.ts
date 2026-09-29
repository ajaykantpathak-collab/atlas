import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch07_p1: SimDef = {
    id: 'v3_c12_eng_f_ch07_p1',
    title: 'The Interview · Part 1/3',
    subtitle: 'A crime to some, a service to others — the genre that asks for a soul',
    classLevel: 12, subject: 'eng_f', topic: 'The Interview · Part 1/3',
    chapters: ['c12_eng_f_ch07'],
    nodeIds: ['c12_eng_f_cbse_07_001', 'c12_eng_f_cbse_07_002', 'c12_eng_f_cbse_07_003', 'c12_eng_f_cbse_07_004', 'c12_eng_f_cbse_07_005', 'c12_eng_f_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary journalist', intro: 'Every press conference hides a power struggle: who owns the truth — the questioner or the answered? This chapter puts the interview itself on trial.', goal: 'Evaluate the interview as a genre — its intrusions and its service — through celebrity objections and Umberto Eco\'s self-portrait.' },
    discovery: {
        question: 'Kipling called the interview \'immoral, a crime, vile\' — then interviewed Mark Twain himself. What does that contradiction expose about the genre?',
        options: ['The power asymmetry — celebrities condemn intrusion as subjects yet wield the interviewer\'s power when they need it', 'Nothing — people change their minds', 'Kipling was just joking', 'Interviews were illegal then'],
        answer: 'The power asymmetry — celebrities condemn intrusion as subjects yet wield the interviewer\'s power when they need it',
        hook: 'The interview is both \'supremely serviceable\' and an \'ordeal\' — Carroll feared being lionised, Kipling called it assault, yet the same medium lets Eco unpack semiotics on a Sunday. It\'s a genre with two faces, and this chapter is a commentary on the genre itself.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Interview\' (Flamingo, ch. 7) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect the interview as a form: weigh 130 years of celebrity objections against Denis Brian\'s defence, then run Eco\'s \'interstices\' over your own day — and script an interview with signallers that actually flows.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Interview\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the approximate historical period since the interview was invented, according to Christopher Silvester?', options: [
                { text: 'The interview was invented a little over 130 years ago (from the time of writing, roughly', outcome: 'The interview was invented a little over 130 years ago (from the time of writing, roughly late 19th.' },
                { text: '50 years', outcome: 'Not quite — Students often treat this chapter as *just* an interview with Umberto Eco, overlooking that Part.', reveals: 'students-often-treat-this-chapter' },
                { text: 'ancient times', outcome: 'Not quite — Students often treat this chapter as *just* an interview with Umberto Eco, overlooking that Part.', reveals: 'students-often-treat-this-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Interview\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What are the two main structural parts of the chapter "The Interview" and what is the primary purpose of each part?', options: [
                { text: 'The two parts are: Part I', outcome: 'The two parts are: Part I — an expository essay that surveys the history, definitions, and.' },
                { text: 'both parts are interviews', outcome: 'Not quite — Students often treat "plot" as a fiction-only term and assume non-fiction has no narrative.', reveals: 'students-often-treat-plot-as' },
                { text: 'Part I is a story', outcome: 'Not quite — Students often treat "plot" as a fiction-only term and assume non-fiction has no narrative.', reveals: 'students-often-treat-plot-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Interview\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary setting of Part I of "The Interview" — the introduction by Christopher Silvester?', options: [
                { text: 'The primary setting of Part I is the historical and cultural landscape of journalism over', outcome: 'The primary setting of Part I is the historical and cultural landscape of journalism over ~130.' },
                { text: 'a newspaper office', outcome: 'Not quite — Students treat "setting" as only physical location (e.g., "Bologna university," "newspaper office").', reveals: 'students-treat-setting-as-only' },
                { text: 'Silvester\'s study', outcome: 'Not quite — Students treat "setting" as only physical location (e.g., "Bologna university," "newspaper office").', reveals: 'students-treat-setting-as-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Interview\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: '**REMEMBER:** What specific phrase does Umberto Eco use to describe his primary professional identity in the interview?', options: [
                { text: '**Correct answer:** "I am a professor who writes novels on Sundays." **Why wrong answers', outcome: '**Correct answer:** "I am a professor who writes novels on Sundays." **Why wrong answers reveal.' },
                { text: 'I am a professor who writes novels on Sundays', outcome: 'Not quite — **Misconception:** *"Eco is arrogant/intellectually elitist because he dismisses mass appeal.', reveals: 'misconception-eco-is-arrogant-intellectually' },
                { text: 'novelist', outcome: 'Not quite — **Misconception:** *"Eco is arrogant/intellectually elitist because he dismisses mass appeal.', reveals: 'misconception-eco-is-arrogant-intellectually' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Interview\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of the chapter "The Interview" as presented in the NCERT textbook?', options: [
                { text: 'The primary theme is the interview as a communication genre', outcome: 'The primary theme is the interview as a communication genre — its history, its contradictory.' },
                { text: 'Umberto Eco\'s writing habits', outcome: 'Not quite — Students often think the primary theme is "Umberto Eco\'s life and work" because Part II dominates.', reveals: 'the-primary-theme-is-umberto' },
                { text: 'How to conduct an interview', outcome: 'Not quite — Students often think the primary theme is "Umberto Eco\'s life and work" because Part II dominates.', reveals: 'the-primary-theme-is-umberto' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school magazine you must interview a survivor of a public tragedy. A classmate urges you to \'ambush him at home — raw emotion makes the best copy\'.',
            decisions: [{ prompt: 'Ambush or arrange?', options: [
                { text: 'Arrange it with consent and boundaries — \'The Interview\' frames the genre as both a source of truth and a potential intrusion; ethical interviewing gets better answers and doesn\'t prey on pain.', outcome: 'Kipling called interviewing a crime; the craft\'s defence is consent — you can honour the reader and the subject at once.' },
                { text: 'Ambush — public interest justifies catching him off guard.', outcome: 'Surprise buys spectacle, not truth; the chapter\'s whole debate warns that intrusion deforms what it captures.', reveals: 'ends-justify-ambush' },
                { text: 'Cancel it — interviews are inherently invasive, so never do one.', outcome: 'Silvester also calls the interview \'supremely serviceable\' — the flaw is in the method, not the genre.', reveals: 'interviews-are-intrusion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue both sides of the microphone — intrusion vs illumination — and steal Eco\'s trick of working inside life\'s empty spaces.',
            decisions: [{ prompt: 'What comes next? The Interview · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Interview · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_001', difficulty: 'standard',
          question: '\'The Interview\' (Flamingo, ch. 7) — the context and background to this text.',
          hint: 'Review "Text Type: Interview Format and Its Structure" (c9_engl_ch5_4) and "Before You.',
          misconception: 'Students often treat this chapter as *just* an interview with Umberto Eco, overlooking that Part I is a *critical essay.',
          parts: [
                { id: 'a', prompt: 'Apply Umberto Eco\'s concept of "interstices" to your own Class 12 schedule.', answer: 'Example: (1) Waiting for the school bus (15 mins) → revise 5 vocabulary words',
                  options: ['Example: (1) Waiting for the school bus (15 mins) → revise 5 vocabulary words', 'sleeping', 'scrolling phone', 'Time Management'],
                  hint: 'Review "Text Type: Interview Format and Its Structure" (c9_engl_ch5_4) and "Before You Read".',
                  misconception: 'Students often treat this chapter as *just* an interview with Umberto Eco, overlooking that Part I is a *critical essay on the genre* by.' }
          ],
            remediations: { 'students-often-treat-this-chapter': { steps: ['If the student cannot distinguish the two authors/parts: (1) Have them physically draw a line in the textbook between.', '(2) Create a two-column table: Column A = Silvester\'s Essay (history, theory, celebrity quotes), Column B = Eco\'s.', '(3) Re-read the "About the Author" boxes aloud.', '(4) Re-attempt Diagnostic Question 4, which forces the distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat this chapter as *just* an interview with Umberto Eco, overlooking that Part I is a *critical essay.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The interview is a supremely serviceable medium of communication." Use evidence from both Part I and Part II to support your judgment.', answer: 'The statement is *largely valid but incomplete*',
                  options: ['The statement is *largely valid but incomplete*', 'agrees wholly ignores the ethical dimension central to the chapter\'s theme'],
                  hint: 'Review "Text Type: Interview Format and Its Structure" (c9_engl_ch5_4) and "Before You Read".',
                  misconception: 'Students often treat this chapter as *just* an interview with Umberto Eco, overlooking that Part I is a *critical essay on the genre* by.' }
          ],
            remediations: { 'students-often-treat-this-chapter': { steps: ['If the student cannot distinguish the two authors/parts: (1) Have them physically draw a line in the textbook between.', '(2) Create a two-column table: Column A = Silvester\'s Essay (history, theory, celebrity quotes), Column B = Eco\'s.', '(3) Re-read the "About the Author" boxes aloud.', '(4) Re-attempt Diagnostic Question 4, which forces the distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Interview\' — what happens, in what order, and.',
          hint: 'Review the "Noticing discourse linkers and signallers" section in the NCERT textbook.',
          misconception: 'Students often treat "plot" as a fiction-only term and assume non-fiction has no narrative structure.',
          parts: [
                { id: 'a', prompt: 'What are the two main structural parts of the chapter "The Interview" and what is the primary purpose of each part?', answer: 'The two parts are: Part I',
                  options: ['The two parts are: Part I', 'both parts are interviews', 'Part I is a story', 'the text flows well'],
                  hint: 'Review the "Noticing discourse linkers and signallers" section in the NCERT textbook (pages 72-73).',
                  misconception: 'Students often treat "plot" as a fiction-only term and assume non-fiction has no narrative structure.' },
                { id: 'b', prompt: 'Compare the narrative pacing of Part I (essay) and Part II (interview). How does the sentence structure in each part reflect its purpose?', answer: 'Part I uses longer, complex sentences with subordinate clauses (e.g., "Since its',
                  options: ['Part I uses longer, complex sentences with subordinate clauses (e.g., "Since its', 'both are similar', 'the text flows well', 'says "both are similar" overlooks how syntax enacts genre: the essay *argues*'],
                  hint: 'Review the "Noticing discourse linkers and signallers" section in the NCERT textbook (pages 72-73).',
                  misconception: 'Students often treat "plot" as a fiction-only term and assume non-fiction has no narrative structure.' }
          ],
            remediations: { 'students-often-treat-plot-as': { steps: ['Re-read Part I and draw a flowchart: Box 1 = Invention & spread of interviews; Box 2 = Conflicting views (truth/art.', 'Re-read Part II and highlight every signaller phrase in one colour, every linker in another.', 'Write one sentence explaining the difference in function.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_003', difficulty: 'standard',
          question: 'The setting of \'The Interview\' — the place, time and atmosphere the text.',
          hint: 'Review c11_eng_h_cbse_01_003: practice mapping setting-atmosphere in "The Portrait of.',
          misconception: 'Students treat "setting" as only physical location (e.g., "Bologna university," "newspaper office") and "atmosphere".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'The Interview\'',
                  options: ['The setting of \'The Interview\'', '\'The Interview\' (Flamingo, ch', 'The plot/narrative arc of \'The Interview\'', 'Character analysis in \'The Interview\''],
                  hint: 'Review c11_eng_h_cbse_01_003: practice mapping setting-atmosphere in "The Portrait of a Lady".',
                  misconception: 'Students treat "setting" as only physical location (e.g., "Bologna university," "newspaper office") and "atmosphere" as generic mood labels.' }
          ],
            remediations: { 'students-treat-setting-as-only': { steps: ['Re-read Part I listing only the *names* cited (Naipaul, Carroll, Kipling, Wells, Bellow, Brian).', 'Ask: "What *conversation* are they having across time?" That conversation *is* the setting.', 'Re-read Part II highlighting every "(Laughs)", "Aah", "shrugs", and metaphor ("interstices", "Chinese wise man").', 'Ask: "If this were a play, what stage directions would the director write?" Those directions *are* the atmosphere.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_004', difficulty: 'standard',
          question: 'Character analysis in \'The Interview\' — the central figure(s), their traits.',
          hint: 'If stuck on speaker attribution: Review `c12_eng_f_cbse_07_002` (Plot and Narrative.',
          misconception: '**Misconception:** *"Eco is arrogant/intellectually elitist because he dismisses mass appeal (\'people like trash\') and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'The Interview\'',
                  options: ['Character analysis in \'The Interview\'', '\'The Interview\' (Flamingo, ch', 'The plot/narrative arc of \'The Interview\'', 'The setting of \'The Interview\''],
                  hint: 'If stuck on speaker attribution: Review `c12_eng_f_cbse_07_002` (Plot and Narrative Structure) —.',
                  misconception: '**Misconception:** *"Eco is arrogant/intellectually elitist because he dismisses mass appeal (\'people like trash\') and corrects the.' }
          ],
            remediations: { 'misconception-eco-is-arrogant-intellectually': { steps: ['**Re-read only Eco\'s lines** (ignore interviewer\'s questions) — highlight every "I" statement.', '**Sort highlights into 3 columns:** Identity | Work Habit | Philosophy.', '**Revisit node `c11_eng_h_cbse_01_004` (Character Analysis: Protagonist)** — practice the same 3-column method on.', '**Re-diagnostic:** Answer Diagnostic Question 2 again, now requiring *two* pieces of evidence per trait.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Interview\' — the secondary figures who move the.',
          hint: 'If unclear on why these six specific writers were chosen, revisit c12_eng_f_cbse_07_001.',
          misconception: 'Students treat "supporting characters" in this non-fiction text as merely "people mentioned" and write descriptive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'The Interview\'',
                  options: ['Supporting characters in \'The Interview\'', '\'The Interview\' (Flamingo, ch', 'The plot/narrative arc of \'The Interview\'', 'The setting of \'The Interview\''],
                  hint: 'If unclear on why these six specific writers were chosen, revisit c12_eng_f_cbse_07_001 (Context.',
                  misconception: 'Students treat "supporting characters" in this non-fiction text as merely "people mentioned" and write descriptive summaries (e.g.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['Re-read Part I and create a two-column table: Column A = Name, Column B = Exact phrase showing their view on interviews.', 'Group the six views into clusters (e.g., "violation of self," "necessary evil," "powerful medium").', 'Ask: "Why did Silvester order them this way? What does the sequence Naipaul → Carroll → Kipling → Wells → Bellow →.', 'Re-attempt Diagnostic Question 2. If still stuck, review node c12_eng_f_cbse_07_002 (Plot and Narrative Structure).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_006', difficulty: 'standard',
          question: 'The primary theme of \'The Interview\' — the central idea the whole text returns.',
          hint: 'If stuck, revisit c12_eng_f_cbse_07_002 (Plot and Narrative Structure) and map the two.',
          misconception: 'Students often think the primary theme is "Umberto Eco\'s life and work" because Part II dominates the page count and.',
          parts: [
                { id: 'a', prompt: 'What is the primary theme of the chapter "The Interview" as presented in the NCERT textbook?', answer: 'The primary theme is the interview as a communication genre',
                  options: ['The primary theme is the interview as a communication genre', 'Umberto Eco\'s writing habits', 'How to conduct an interview', 'Umberto Eco\'s life and work'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_07_002 (Plot and Narrative Structure) and map the two parts: Part.',
                  misconception: 'Students often think the primary theme is "Umberto Eco\'s life and work" because Part II dominates the page count and feels more concrete.' }
          ],
            remediations: { 'the-primary-theme-is-umberto': { steps: ['If the student conflates the case study (Eco) with the theme (the interview genre), do this 3-step remediation: (1).', '(2) Ask: "What do ALL these voices have in common?" Guide them to: "They are all *about the interview itself*." (3).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
