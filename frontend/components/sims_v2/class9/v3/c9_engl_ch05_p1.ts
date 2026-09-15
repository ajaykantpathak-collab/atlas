import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch05_p1: SimDef = {
    id: 'v3_c9_engl_ch05_p1',
    title: 'The World of Limitless Possibilities · Part 1/2',
    subtitle: 'One woman\'s medal, one movement\'s history',
    classLevel: 9, subject: 'engl', topic: 'The World of Limitless Possibilities · Part 1/2',
    chapters: ['c9_engl_ch05'],
    nodeIds: ['c9_engl_ch5_1', 'c9_engl_ch5_10', 'c9_engl_ch5_2', 'c9_engl_ch5_3', 'c9_engl_ch5_4', 'c9_engl_ch5_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sports journalist condensing a biography', intro: 'You\'ve got 120-150 words to tell both stories at once: how the Paralympics came to be AND how a paralyzed woman became India\'s first female Paralympic medallist. No fluff survives.', goal: 'Summarise the dual-thread text on the Paralympics and Deepa Malik — institutional history plus personal trajectory — with dates, chronology and a thematic close.' },
    discovery: {
        question: 'A student summarises Deepa Malik\'s story as \'tumor at 29, three surgeries, paralysis, then a silver medal at Rio 2016.\' What\'s missing that would cost exam marks?',
        options: ['The whole other half — the Paralympic movement\'s history (Rome 1960, India\'s debut 1968) that the text weaves around her journey', 'Nothing — her medal is the whole point', 'The name of her doctor', 'A list of every surgery detail'],
        answer: 'The whole other half — the Paralympic movement\'s history (Rome 1960, India\'s debut 1968) that the text weaves around her journey',
        hook: 'This text has two timelines braided together: the Paralympics\' institutional history and one woman\'s personal fight. Summarising only Deepa is like retelling half a braid — the chapter\'s title (\'The World of Limitless Possibilities\') is the knot that ties them.',
    },
    teaching: [
        { title: 'Text Summary: Paralympics and Dr. Deepa Malik\'s Journey', text: 'A text summary is a concise, structured restatement of a non-fiction passage that captures the central subject (the Paralympic movement), the chronological progression of key events (history.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch5_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weave the two timelines into one summary: Paralympics born 1960 → India joins 1968 → Deepa\'s diagnosis → swimming then athletics → Arjuna Award 2012 → Rio silver 2016 → the closing line that ties it all to the title.',
        labels: ['Text Summary: Paralympics', 'Discussion: Inclusion and Accessibility', 'Theme: Resilience and Overcoming', 'Theme: Redefining Possibilities', 'Text Type: Interview Format', 'Character Study: Dr. Deepa'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch5_1', title: 'Text Summary: Paralympics and Dr. Deepa Malik\'s Journey',
          caseStudy: { intro: 'Imagine your younger cousin asks, "Who is Deepa Malik and why is she in our textbook?" You have two minutes before your tuition starts.',
            decisions: [{ prompt: 'What are the three essential components that must appear in the opening sentence of a board-level text summary for this chapter?', options: [
                { text: 'The opening sentence must name: (1) the text\'s dual subject (Paralympic movement AND Dr', outcome: 'The opening sentence must name: (1) the text\'s dual subject (Paralympic movement AND Dr.' },
                { text: 'It\'s about Deepa Malik', outcome: 'Not quite — Students believe a text summary is "the story in fewer words" and therefore: (1) they retell.', reveals: 'a-text-summary-is-the' },
                { text: 'the story in fewer words', outcome: 'Not quite — Students believe a text summary is "the story in fewer words" and therefore: (1) they retell.', reveals: 'a-text-summary-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_10', title: 'Discussion: Inclusion and Accessibility in Sports',
          caseStudy: { intro: 'Imagine your school is planning a sports day, but the only events are standard track races and the playground has no ramps.',
            decisions: [{ prompt: 'Define "accessibility" in the context of sports for persons with disabilities. Give one example from the chapter and one from real life.', options: [
                { text: 'Accessibility in sports means designing environments, rules, and opportunities so', outcome: 'Accessibility in sports means designing environments, rules, and opportunities so athletes with.' },
                { text: 'just building ramps', outcome: 'Not quite — Students often equate "inclusion" with "letting disabled students watch or help" (tokenism).', reveals: 'students-often-equate-inclusion-with' },
                { text: 'special need', outcome: 'Not quite — Students often equate "inclusion" with "letting disabled students watch or help" (tokenism).', reveals: 'students-often-equate-inclusion-with' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_2', title: 'Theme: Resilience and Overcoming Adversity',
          caseStudy: { intro: 'Imagine you failed your math test despite studying hard. You feel like giving up, but instead you ask the teacher for help, change your study method, and ace.',
            decisions: [{ prompt: 'Define "theme" in literature and explain how it differs from "topic" or "plot" using one example from any Class 6-8 text you remember.', options: [
                { text: 'A theme is the universal insight about human experience that a text conveys (e.g.,', outcome: 'A theme is the universal insight about human experience that a text conveys (e.g., "Courage.' },
                { text: 'the theme is disability', outcome: 'Not quite — Students often think "resilience theme = protagonist succeeds in the end." They equate theme with.', reveals: 'resilience-theme-protagonist-succeeds-in' },
                { text: 'resilience theme = protagonist succeeds in the end', outcome: 'Not quite — Students often think "resilience theme = protagonist succeeds in the end." They equate theme with.', reveals: 'resilience-theme-protagonist-succeeds-in' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_3', title: 'Theme: Redefining Possibilities for Differently-Abled Athletes',
          caseStudy: { intro: 'Imagine a Class 9 student who uses a wheelchair thinking, "Sports are not for me because I can\'t run like others." Now, ask: "What if the rules of the game.',
            decisions: [{ prompt: 'Define the phrase "redefining possibilities" in the context of differently-abled athletes as used in this chapter. Answer in one sentence.', options: [
                { text: 'Correct answer: "Redefining possibilities means changing the established narrative that', outcome: 'Correct answer: "Redefining possibilities means changing the established narrative that disability.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students conflate "Redefining Possibilities" with "Overcoming Adversity" (Resilience).', reveals: 'students-conflate-redefining-possibilities-with' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_4', title: 'Text Type: Interview Format and Its Structure',
          caseStudy: { intro: 'Imagine you\'re reading a magazine interview with your favourite sportsperson — notice how the first question is always easy ("Tell us about your childhood").',
            decisions: [{ prompt: 'Define the three main structural stages of a formal interview text and state the purpose of each stage in one sentence.', options: [
                { text: 'The three stages are: (1) Opening/Introduction', outcome: 'The three stages are: (1) Opening/Introduction — establishes rapport, introduces the interviewee.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students believe interview analysis means summarising the interviewee\'s answers.', reveals: 'interview-analysis-means-summarising-the' },
                { text: 'interview analysis means summarising the interviewee\'s answers', outcome: 'Not quite — Students believe interview analysis means summarising the interviewee\'s answers.', reveals: 'interview-analysis-means-summarising-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising the chapter on the Paralympics and Dr. Deepa Malik, a student writes only: \'Deepa got a spinal tumour at 29, survived three surgeries paralysed waist-down, and won silver at Rio 2016.\'',
            decisions: [{ prompt: 'Why does this cost marks despite being accurate?', options: [
                { text: 'The text runs on two rails — the Paralympic movement\'s history (Rome 1960, India\'s 1968 debut) and Deepa\'s personal arc — and the summary must braid both, ending by linking her medal to the chapter\'s title about limitless possibilities; a person-only sketch drops the institutional half.', outcome: 'This mirrors the text\'s dual architecture — board summaries must condense the whole text, not just its hero.' },
                { text: 'It costs nothing — the Paralympic dates are background decoration, and Deepa\'s story is the real chapter.', outcome: 'The institutional history is the frame that gives her medal its meaning — first Indian woman on a Paralympic podium — and omitting it is omitting the text\'s design.', reveals: 'history-is-decoration' },
                { text: 'The fix is emotional language — \'bravely fought a tragic fate\' — since the facts are already there.', outcome: 'Board summaries want factual reporting — diagnosed at 29, three surgeries, Rio 2016 silver — not inspirational adjectives; feeling belongs to personal response.', reveals: 'add-emotion' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_5', title: 'The bigger picture',
          caseStudy: { intro: 'This summary needs dates, not adjectives: \'diagnosed at 29\' beats \'she bravely fought.\' And it must end where the text ends — on the idea that physical limits get redefined by human will.',
            decisions: [{ prompt: 'What comes next? The World of Limitless Possibilities · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The World of Limitless Possibilities · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch5_1', difficulty: 'standard',
          question: 'A text summary is a concise, structured restatement of a non-fiction passage.',
          hint: 'Review c8_engl_ch2_2 (Major Somnath Sharma timeline extraction) and practice converting.',
          misconception: 'Students believe a text summary is "the story in fewer words" and therefore: (1) they retell Deepa\'s personal struggle.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Deepa Malik got a spinal tumor at age 29, had three surgeries, was paralyzed waist down, but then won silver in shot put at Rio 2016." What.', answer: 'The summary omits the Paralympics context entirely',
                  options: ['The summary omits the Paralympics context entirely', 'the story in fewer words', 'she bravely fought', 'tragic accident'],
                  hint: 'Review c8_engl_ch2_2 (Major Somnath Sharma timeline extraction) and practice converting a 200-word.',
                  misconception: 'Students believe a text summary is "the story in fewer words" and therefore: (1) they retell Deepa\'s personal struggle in emotional.' },
                { id: 'b', prompt: 'Given this disordered list of details from the text: (A) Deepa wins Arjuna Award 2012, (B) Paralympics begin in Rome 1960, (C) Deepa diagnosed with spinal.', answer: 'Correct sequence: B (1960) → D (1968) → C (Deepa\'s diagnosis, late 1990s) → F',
                  options: ['Correct sequence: B (1960) → D (1968) → C (Deepa\'s diagnosis, late 1990s) → F', 'the story in fewer words', 'she bravely fought', 'tragic accident'],
                  hint: 'Review c8_engl_ch2_2 (Major Somnath Sharma timeline extraction) and practice converting a 200-word.',
                  misconception: 'Students believe a text summary is "the story in fewer words" and therefore: (1) they retell Deepa\'s personal struggle in emotional.' },
                { id: 'c', prompt: 'Two summaries of the same text are written. Summary X: "The text tells how Paralympics started in 1960 and Deepa Malik overcame paralysis to win medals.".', answer: 'Summary Y is board-competent',
                  options: ['Summary Y is board-competent', 'tells how', 'win medals', 'main idea'],
                  hint: 'Review c8_engl_ch2_2 (Major Somnath Sharma timeline extraction) and practice converting a 200-word.',
                  misconception: 'Students believe a text summary is "the story in fewer words" and therefore: (1) they retell Deepa\'s personal struggle in emotional.' }
          ],
            remediations: { 'a-text-summary-is-the': { steps: ['Give the student a printed copy of the text with three highlighters — yellow for Paralympics history sentences, pink.', 'Ask them to write ONLY the yellow-highlighted facts in order, then ONLY the pink-highlighted facts in order.', 'Show how the text weaves them together (history first, then person).', 'Co-construct a summary using the template: "The Paralympic movement began in [year]... India entered in [year]...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a text summary is "the story in fewer words" and therefore: (1) they retell Deepa\'s personal struggle.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "A good summary of this text should end with Deepa\'s Rio medal because that is her greatest achievement." Defend or critique using board.', answer: 'Critique',
                  options: ['Critique', 'the story in fewer words', 'she bravely fought', 'tragic accident'],
                  hint: 'Review c8_engl_ch2_2 (Major Somnath Sharma timeline extraction) and practice converting a 200-word.',
                  misconception: 'Students believe a text summary is "the story in fewer words" and therefore: (1) they retell Deepa\'s personal struggle in emotional.' }
          ],
            remediations: { 'a-text-summary-is-the': { steps: ['Give the student a printed copy of the text with three highlighters — yellow for Paralympics history sentences, pink.', 'Ask them to write ONLY the yellow-highlighted facts in order, then ONLY the pink-highlighted facts in order.', 'Show how the text weaves them together (history first, then person).', 'Co-construct a summary using the template: "The Paralympic movement began in [year]... India entered in [year]...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_10', difficulty: 'standard',
          question: 'A structured discussion on inclusion and accessibility in sports examines how.',
          hint: 'If stuck, review c9_engl_ch5_5 (Deepa Malik\'s specific struggles with equipment.',
          misconception: 'Students often equate "inclusion" with "letting disabled students watch or help" (tokenism) or "creating separate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A structured discussion on inclusion and accessibility in sports examines how physical,',
                  options: ['A structured discussion on inclusion and accessibility in sports examines how physical,', 'A text summary is a concise, structured restatement of a non-fiction passage that', 'Resilience and Overcoming Adversity as a literary theme refers to the central message', 'The theme "Redefining Possibilities for Differently-Abled Athletes" refers to the central'],
                  hint: 'If stuck, review c9_engl_ch5_5 (Deepa Malik\'s specific struggles with equipment, classification.',
                  misconception: 'Students often equate "inclusion" with "letting disabled students watch or help" (tokenism) or "creating separate events only".' }
          ],
            remediations: { 'students-often-equate-inclusion-with': { steps: ['inclusion**: Show two sports day posters — one with "Special Race for Disabled Students" (segregated), another with.', 'Ask: "Which poster makes the disabled athlete a *competitor*?" 2.', '**Map barriers to solutions**: Give a case study: "A visually impaired student wants to join the cricket team.".', '**Rewrite a tokenistic policy**: Provide a weak school policy ("We allow disabled students to participate if they.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_2', difficulty: 'standard',
          question: 'Resilience and Overcoming Adversity as a literary theme refers to the central.',
          hint: 'If stuck, review the PEEL structure using the *Cherry Tree* theme analysis.',
          misconception: 'Students often think "resilience theme = protagonist succeeds in the end." They equate theme with happy ending.',
          parts: [
                { id: 'a', prompt: 'Read this new 4-line excerpt from a para-athlete\'s diary: "Rain ruined my prosthetic calibration. I missed the qualifier by 0.3 seconds.', answer: 'Adversity: equipment failure + near-miss loss',
                  options: ['Adversity: equipment failure + near-miss loss', 'resilience theme = protagonist succeeds in the end', 'overcoming adversity', 'adversity disappearing'],
                  hint: 'If stuck, review the PEEL structure using the *Cherry Tree* theme analysis (c8_engl_ch4_5).',
                  misconception: 'Students often think "resilience theme = protagonist succeeds in the end." They equate theme with happy ending.' }
          ],
            remediations: { 'resilience-theme-protagonist-succeeds-in': { steps: ['Give the student a two-column table: Column A "Adversity Quoted from Text" (provide 3 quotes), Column B "Her Response.', 'Ask: "Does the adversity vanish after the response?" Guide them to see the wheelchair remains.', 'Have them rewrite the theme statement using this stem: "The text suggests that when humans face ______, they can ______.', 'Connect to Class 8 *Cherry Tree* (c8_engl_ch4_5): the tree remains stunted in harsh soil but fruits — adversity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_3', difficulty: 'standard',
          question: 'The theme "Redefining Possibilities for Differently-Abled Athletes" refers.',
          hint: 'If stuck, review the distinction between "Internal Struggle" (Resilience, Node 2) and.',
          misconception: 'Students conflate "Redefining Possibilities" with "Overcoming Adversity" (Resilience). They cite Dr.',
          parts: [
                { id: 'a', prompt: 'The text mentions Dr. Malik winning a silver medal in shot put at the 2016 Rio Paralympics.', answer: 'Correct answer steps: (1) For policymakers: The medal proved the ROI of funding',
                  options: ['Correct answer steps: (1) For policymakers: The medal proved the ROI of funding', 'it inspired people', 'possibilities'],
                  hint: 'If stuck, review the distinction between "Internal Struggle" (Resilience, Node 2) and "External.',
                  misconception: 'Students conflate "Redefining Possibilities" with "Overcoming Adversity" (Resilience). They cite Dr.' }
          ],
            remediations: { 'students-conflate-redefining-possibilities-with': { steps: ['Give the student a two-column table. Column A: "Evidence of Personal Struggle" (tumor, stitches, bedridden).', 'Ask them to sort 6-7 textual points into the columns.', 'Explain: "Column A = Resilience (Node 2). Column B = Redefining Possibilities (This Node).', 'Practice writing one PEEL paragraph using only Column B evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_4', difficulty: 'standard',
          question: 'An interview is a structured conversation between an interviewer and.',
          hint: 'Review "Dialogue Writing" (c6_english_u2_019) — practise converting a narrative into Q&A.',
          misconception: 'Students believe interview analysis means summarising the interviewee\'s answers.',
          parts: [
                { id: 'a', prompt: 'Define the three main structural stages of a formal interview text and state the purpose of each stage in one sentence.', answer: 'The three stages are: (1) Opening/Introduction',
                  options: ['The three stages are: (1) Opening/Introduction', 'beginning, middle, end', 'interview analysis means summarising the interviewee\'s answers'],
                  hint: 'Review "Dialogue Writing" (c6_english_u2_019) — practise converting a narrative into Q&A format.',
                  misconception: 'Students believe interview analysis means summarising the interviewee\'s answers.' },
                { id: 'b', prompt: 'In the textbook interview with Dr. Deepa Malik, the interviewer asks: "You were diagnosed with a spinal tumour at age 29.', answer: 'This is a probing, open-ended question targeting a turning point',
                  options: ['This is a probing, open-ended question targeting a turning point', 'a difficult question', 'interview analysis means summarising the interviewee\'s answers'],
                  hint: 'Review "Dialogue Writing" (c6_english_u2_019) — practise converting a narrative into Q&A format.',
                  misconception: 'Students believe interview analysis means summarising the interviewee\'s answers.' },
                { id: 'c', prompt: 'Compare these two closing questions from different interviews: (A) "Any final words for our readers?" (B) "Looking at India\'s para-sports ecosystem today, what.', answer: 'Question (B) is superior for thematic analysis',
                  options: ['Question (B) is superior for thematic analysis', 'closing question', 'any last question', 'interview analysis means summarising the interviewee\'s answers'],
                  hint: 'Review "Dialogue Writing" (c6_english_u2_019) — practise converting a narrative into Q&A format.',
                  misconception: 'Students believe interview analysis means summarising the interviewee\'s answers.' }
          ],
            remediations: { 'interview-analysis-means-summarising-the': { steps: ['Give the student two versions of the same interview — one with questions reordered randomly.', 'Have them label each question in the original with: type (open/closed/factual/probing), stage (opening/body/closing).', 'Co-write a PEEL paragraph analysing ONE question\'s placement.', 'Assign independent analysis of a new interview excerpt using the same labelling grid.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_5', difficulty: 'standard',
          question: 'A character study is a detailed analysis of a real or fictional person\'s.',
          hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) practised.',
          misconception: 'Students equate \'trailblazer\' with \'first to achieve X\' (e.g., first Indian woman Paralympic medalist).',
          parts: [
                { id: 'a', prompt: 'In the interview, Dr. Malik says, "I didn\'t want my disability to become my identity." Explain what this statement reveals about her self-concept and how.', answer: 'The statement reveals she refuses to be defined by limitation',
                  options: ['The statement reveals she refuses to be defined by limitation', 'She is brave because she accepts her disability'],
                  hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) practised.',
                  misconception: 'Students equate \'trailblazer\' with \'first to achieve X\' (e.g., first Indian woman Paralympic medalist).' },
                { id: 'b', prompt: 'Using the PEEL structure, write one complete paragraph analysing Dr.', answer: 'Point: Dr',
                  options: ['Point: Dr', 'I never gave up'],
                  hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) practised.',
                  misconception: 'Students equate \'trailblazer\' with \'first to achieve X\' (e.g., first Indian woman Paralympic medalist).' },
                { id: 'c', prompt: 'Compare how Dr. Malik\'s relationship with her family (especially her husband and daughters) functions in the interview versus a typical \'inspirational hero\'.', answer: 'In typical hero narratives, family is background support',
                  options: ['In typical hero narratives, family is background support', 'Her family supported her'],
                  hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) practised.',
                  misconception: 'Students equate \'trailblazer\' with \'first to achieve X\' (e.g., first Indian woman Paralympic medalist).' }
          ],
            remediations: { 'students-equate-trailblazer-with-first': { steps: ['If a student writes a biographical summary instead of a character study: 1) Have them highlight every sentence in their.', 'Force them to fill 3 rows from the interview.', '3) Model converting one row into a PEEL paragraph together.', '4) Assign a new prompt: "Analyse Dr.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
