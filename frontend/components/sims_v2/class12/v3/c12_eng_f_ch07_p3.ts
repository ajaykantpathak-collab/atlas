import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch07_p3: SimDef = {
    id: 'v3_c12_eng_f_ch07_p3',
    title: 'The Interview · Part 3/3',
    subtitle: 'A crime to some, a service to others — the genre that asks for a soul',
    classLevel: 12, subject: 'eng_f', topic: 'The Interview · Part 3/3',
    chapters: ['c12_eng_f_ch07'],
    nodeIds: ['c12_eng_f_cbse_07_013', 'c12_eng_f_cbse_07_014', 'c12_eng_f_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary journalist', intro: 'Every press conference hides a power struggle: who owns the truth — the questioner or the answered? This chapter puts the interview itself on trial.', goal: 'Evaluate the interview as a genre — its intrusions and its service — through celebrity objections and Umberto Eco\'s self-portrait.' },
    discovery: {
        question: 'Kipling called the interview \'immoral, a crime, vile\' — then interviewed Mark Twain himself. What does that contradiction expose about the genre?',
        options: ['The power asymmetry — celebrities condemn intrusion as subjects yet wield the interviewer\'s power when they need it', 'Nothing — people change their minds', 'Kipling was just joking', 'Interviews were illegal then'],
        answer: 'The power asymmetry — celebrities condemn intrusion as subjects yet wield the interviewer\'s power when they need it',
        hook: 'The interview is both \'supremely serviceable\' and an \'ordeal\' — Carroll feared being lionised, Kipling called it assault, yet the same medium lets Eco unpack semiotics on a Sunday. It\'s a genre with two faces, and this chapter is a commentary on the genre itself.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Interview\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_07_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect the interview as a form: weigh 130 years of celebrity objections against Denis Brian\'s defence, then run Eco\'s \'interstices\' over your own day — and script an interview with signallers that actually flows.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Interview\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'In Part I, Silvester writes: "Some might make quite extravagant claims for it as being, in its highest form, a source of truth, and, in its.', options: [
                { text: 'Correct answer: The phrase "in its highest form" suggests a conditional or idealized view', outcome: 'Correct answer: The phrase "in its highest form" suggests a conditional or idealized view.' },
                { text: 'The author believes all interviews are truthful', outcome: 'Not quite — Students equate "critical thinking" with "giving my opinion" or "finding faults." In "The.', reveals: 'students-equate-critical-thinking-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Interview\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the primary difference between a verbatim interview transcript and an interview report?', options: [
                { text: 'A verbatim transcript reproduces every word spoken by both interviewer and interviewee in', outcome: 'A verbatim transcript reproduces every word spoken by both interviewer and interviewee in exact.' },
                { text: 'report is just shorter', outcome: 'Not quite — Students treat the writing task as "summarize the interview" by deleting sentences from the.', reveals: 'students-treat-the-writing-task' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Interview\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'Define "discourse linkers" and "signallers" in the context of a structured conversation like an interview, and give one example of each.', options: [
                { text: 'Discourse linkers are cohesive devices (reference pronouns like "that," "this," "which"', outcome: 'Discourse linkers are cohesive devices (reference pronouns like "that," "this," "which" or lexical.' },
                { text: 'I think interviews are bad', outcome: 'Not quite — Students treat "Speaking and Listening: Discussion Points" as informal chat where they share.', reveals: 'students-treat-speaking-and-listening' },
                { text: 'reference to text', outcome: 'Not quite — Students treat "Speaking and Listening: Discussion Points" as informal chat where they share.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school magazine you must interview a survivor of a public tragedy. A classmate urges you to \'ambush him at home — raw emotion makes the best copy\'.',
            decisions: [{ prompt: 'Ambush or arrange?', options: [
                { text: 'Arrange it with consent and boundaries — \'The Interview\' frames the genre as both a source of truth and a potential intrusion; ethical interviewing gets better answers and doesn\'t prey on pain.', outcome: 'Kipling called interviewing a crime; the craft\'s defence is consent — you can honour the reader and the subject at once.' },
                { text: 'Ambush — public interest justifies catching him off guard.', outcome: 'Surprise buys spectacle, not truth; the chapter\'s whole debate warns that intrusion deforms what it captures.', reveals: 'ends-justify-ambush' },
                { text: 'Cancel it — interviews are inherently invasive, so never do one.', outcome: 'Silvester also calls the interview \'supremely serviceable\' — the flaw is in the method, not the genre.', reveals: 'interviews-are-intrusion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue both sides of the microphone — intrusion vs illumination — and steal Eco\'s trick of working inside life\'s empty spaces.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Interview\' — analysing the text to reach.',
          hint: 'If stuck, return to node c12_eng_f_cbse_07_012 (Comprehension) and practice writing one.',
          misconception: 'Students equate "critical thinking" with "giving my opinion" or "finding faults." In "The Interview," they write: "I.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Interview\'',
                  options: ['Critical thinking on \'The Interview\'', '\'The Interview\' (Flamingo, ch', 'The plot/narrative arc of \'The Interview\'', 'The setting of \'The Interview\''],
                  hint: 'If stuck, return to node c12_eng_f_cbse_07_012 (Comprehension) and practice writing one PEEL.',
                  misconception: 'Students equate "critical thinking" with "giving my opinion" or "finding faults." In "The Interview," they write: "I think Eco is arrogant".' }
          ],
            remediations: { 'students-equate-critical-thinking-with': { steps: ['Have the student re-read Part I and highlight every evaluative adjective used to describe interviews (e.g.', 'Ask: "Which words belong to Silvester?', 'Which belong to the people he quotes?" — this separates the author\'s voice from reported voices.', 'In Part II, have them circle every metaphor Eco uses (interstices, thumbprints on windpipe, Chinese wise man) and write.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_014', difficulty: 'standard',
          question: 'Writing skills from \'The Interview\' — using the text as a model or springboard.',
          hint: 'If stuck on selecting salient points, revisit node 013 (Critical Thinking) questions.',
          misconception: 'Students treat the writing task as "summarize the interview" by deleting sentences from the transcript.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills from \'The Interview\'',
                  options: ['Writing skills from \'The Interview\'', '\'The Interview\' (Flamingo, ch', 'The plot/narrative arc of \'The Interview\'', 'The setting of \'The Interview\''],
                  hint: 'If stuck on selecting salient points, revisit node 013 (Critical Thinking) questions on Eco\'s.',
                  misconception: 'Students treat the writing task as "summarize the interview" by deleting sentences from the transcript.' }
          ],
            remediations: { 'students-treat-the-writing-task': { steps: ['Give the student a 5-sentence verbatim exchange and ask them to rewrite it as ONE reported-speech paragraph using "When.', 'Provide the Eco interview segmented into 4 thematic chunks (Identity, Time Management, Academic Style, Fiction.', 'Assemble paragraphs into full report with headline/byline.', 'Compare their report with a model — highlight where they kept Q&A format or direct speech.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_015', difficulty: 'standard',
          question: 'Discussion points on \'The Interview\' — speaking and listening around the text.',
          hint: 'If stuck, review c12_eng_f_cbse_07_013 (Critical Thinking) for evidence-use practice and.',
          misconception: 'Students treat "Speaking and Listening: Discussion Points" as informal chat where they share personal opinions without.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Umberto Eco says he "works in empty spaces" (interstices), and connect this to the broader theme of time management in creative.', answer: 'Eco uses "interstices"',
                  options: ['Eco uses "interstices"', 'interstices', 'Talking about the text', 'I think interviews are bad'],
                  hint: 'If stuck, review c12_eng_f_cbse_07_013 (Critical Thinking) for evidence-use practice and the.',
                  misconception: 'Students treat "Speaking and Listening: Discussion Points" as informal chat where they share personal opinions without textual anchoring.' },
                { id: 'b', prompt: 'Analyze how the interviewer Mukund Padmanabhan uses signallers to structure the Eco interview.', answer: '1) "Which brings me to my next question"',
                  options: ['1) "Which brings me to my next question"', 'Over 40', 'Noticing discourse linkers and signallers', 'I think interviews are bad'],
                  hint: 'If stuck, review c12_eng_f_cbse_07_013 (Critical Thinking) for evidence-use practice and the.',
                  misconception: 'Students treat "Speaking and Listening: Discussion Points" as informal chat where they share personal opinions without textual anchoring.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['If a student cannot anchor opinions in textual evidence or use discourse markers: (1) Have them re-read the "Noticing.', '(2) Practice a 2-minute "PEEL drill": give a prompt (e.g., "Should celebrities be interviewed?"), require one textual.', '(3) Record and replay their attempt — they self-identify missing elements.', '(4) Revisit c12_eng_f_cbse_07_013 (Critical Thinking) to strengthen evidence-use before re-attempting discussion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Speaking and Listening: Discussion Points" as informal chat where they share personal opinions without.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The interview is a supremely serviceable medium of communication" (Denis Brian, Part I).', answer: 'The statement holds but requires qualification',
                  options: ['The statement holds but requires qualification', 'I think interviews are bad', 'reference to text', 'use of discourse markers'],
                  hint: 'If stuck, review c12_eng_f_cbse_07_013 (Critical Thinking) for evidence-use practice and the.',
                  misconception: 'Students treat "Speaking and Listening: Discussion Points" as informal chat where they share personal opinions without textual anchoring.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['If a student cannot anchor opinions in textual evidence or use discourse markers: (1) Have them re-read the "Noticing.', '(2) Practice a 2-minute "PEEL drill": give a prompt (e.g., "Should celebrities be interviewed?"), require one textual.', '(3) Record and replay their attempt — they self-identify missing elements.', '(4) Revisit c12_eng_f_cbse_07_013 (Critical Thinking) to strengthen evidence-use before re-attempting discussion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
