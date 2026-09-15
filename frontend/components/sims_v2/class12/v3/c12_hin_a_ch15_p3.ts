import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch15_p3: SimDef = {
    id: 'v3_c12_hin_a_ch15_p3',
    title: 'eerk dkfy;k · Part 3/3',
    subtitle: 'The survey line was straight; the damage wasn\'t',
    classLevel: 12, subject: 'hin_a', topic: 'eerk dkfy;k · Part 3/3',
    chapters: ['c12_hin_a_ch15'],
    nodeIds: ['c12_hin_a_cbse_15_013', 'c12_hin_a_cbse_15_014', 'c12_hin_a_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Displacement-narrative reader', intro: 'A dam was drawn on a map; a hundred villages learned they lived inside a line.', goal: 'Read Tedhi Lakeer through development-induced displacement and Renu\'s reportage-fiction method.' },
    discovery: {
        question: 'A surveyor draws a straight red line for a dam across tribal land — on the earth it becomes a crooked scar. Why did Renu name the story \'The Crooked Line\'?',
        options: ['The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth', 'The terrain was hilly', 'Surveyors make mistakes', 'A meandering river'],
        answer: 'The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth',
        hook: 'This is reportage-fiction about a real wound — the Koel-Karo project threatening 120+ villages. Renu captures the pre-movement moment: resistance raw and leaderless, dismissed as backwardness before it could become an Andolan. The deepest irony — the democratic state itself ran the displacement.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the systematic process of examining a text\'s explicit and implicit meanings by evaluating evidence, identifying underlying assumptions, and synthesizing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a journalist visiting Veerji\'s village ten years after the factory was built.',
            decisions: [{ prompt: 'What is the primary function of irony in "tgk¡ dksbZ okilh ugha" as a tool for social critique?', options: [
                { text: '**Correct Answer:** Irony exposes the gap between the state\'s rhetoric of "development"', outcome: '**Correct Answer:** Irony exposes the gap between the state\'s rhetoric of "development" (vikas) and.' },
                { text: 'irony makes the story funny', outcome: 'Not quite — **Misconception:** "Critical analysis means criticizing the author or finding faults in the story.".', reveals: 'misconception-critical-analysis-means-criticizin' },
                { text: 'it shows the villagers are backward', outcome: 'Not quite — **Misconception:** "Critical analysis means criticizing the author or finding faults in the story.".', reveals: 'misconception-critical-analysis-means-criticizin' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine a student staring at a 5-mark question: "How does the author portray the conflict between development and tribal life in \'eerk dkfy;k\'?" They write.',
            decisions: [{ prompt: 'What does PEEL stand for in answer writing, and what is the function of each component?', options: [
                { text: 'PEEL = Point, Evidence, Explanation, Link', outcome: 'PEEL = Point, Evidence, Explanation, Link. Point = topic sentence stating the argument.' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are at a village panchayat meeting where a company wants to build a factory on forest land — how would you express your concern without shouting?',
            decisions: [{ prompt: 'What are the two main discussion formats recommended by CBSE for the Assessment of Speaking and Listening (ASL) that can be applied to this.', options: [
                { text: 'The two main formats are Group Discussion (GD) and Debate', outcome: 'The two main formats are Group Discussion (GD) and Debate. A wrong answer (e.g., "speech and.' },
                { text: 'speech and interview', outcome: 'Not quite — Students think speaking and listening is just about talking fluently in Hindi.', reveals: 'speaking-and-listening-is-just' },
                { text: 'speaking and listening is just about talking fluently in Hindi', outcome: 'Not quite — Students think speaking and listening is just about talking fluently in Hindi.', reveals: 'speaking-and-listening-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a piece on your hometown\'s transformation — the river now a drain, fields under a factory — your editor wants it chronological: \'village past, then highway, then industry, then today.\'',
            decisions: [{ prompt: 'What structure does Renu\'s \'जहाँ कोई वापसी नहीं\' use instead, and why?', options: [
                { text: 'Open in the damaged present, then break into flashes of the lost past with your own commentary between them — the fragmented telling enacts the severed bond between people and land, making the reader live the loss rather than read a progress report.', outcome: 'The chapter\'s point: a linear telling makes change look like neutral sequence; the non-linear juxtaposition of what is against what was is where the critique lives.' },
                { text: 'Go chronological — \'village → factory\' order keeps the article clear and fair to both sides.', outcome: 'Chronology launders the verdict into inevitability; the story opens with the polluted present precisely so the reader enters with the damage already done — \'fair\' sequencing is how loss gets normalised.', reveals: 'chronology-is-neutral' },
                { text: 'Skip the past entirely and report only today\'s conditions — nostalgia is bias.', outcome: 'Without the remembered village the present has no baseline; the story\'s commentary works because the reader holds both timeframes at once — past-only is romance, present-only is bookkeeping.', reveals: 'past-is-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a dam story as an invoice for the city\'s electricity — paid in forests, rivers and a people\'s memory.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the systematic process of examining.',
          hint: 'If stuck, return to the "Irony and Symbolism" node (c12_hin_a_cbse_15_009) and practice.',
          misconception: '**Misconception:** "Critical analysis means criticizing the author or finding faults in the story." **Why students make.',
          parts: [
                { id: 'a', prompt: 'The story describes the village\'s transformation from "cSoqaQB" (self-sufficient) to "dkyk ikuh" (dark well).', answer: '**Correct Answer:** The shift signifies that industrial "development" replaces a',
                  options: ['**Correct Answer:** The shift signifies that industrial "development" replaces a', 'it means the village became modern', 'life got harder'],
                  hint: 'If stuck, return to the "Irony and Symbolism" node (c12_hin_a_cbse_15_009) and practice the "Tone.',
                  misconception: '**Misconception:** "Critical analysis means criticizing the author or finding faults in the story." **Why students make this error:** The.' }
          ],
            remediations: { 'misconception-critical-analysis-means-criticizin': { steps: ['**Revisit Node c12_hin_a_cbse_15_009 (Irony and Symbolism):** Re-learn the *definition* and *function* of irony as.', '**Revisit Node c12_hin_a_cbse_15_006 (Primary Theme):** Map the theme "development vs.', 'displacement" across 5 key scenes using a two-column table: "State\'s Claim" vs.', '**Re-diagnostic:** Take Diagnostic Question 3 again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Critical analysis means criticizing the author or finding faults in the story." **Why students make.',
          parts: [
                { id: 'a', prompt: 'Write a 150-word "counter-narrative" from the perspective of a young tribal person who *accepts* the factory job and sees it as liberation.', answer: '**Criteria for a strong answer:** (1) Authentic voice',
                  options: ['**Criteria for a strong answer:** (1) Authentic voice', 'I hate my culture'],
                  hint: 'If stuck, return to the "Irony and Symbolism" node (c12_hin_a_cbse_15_009) and practice the "Tone.',
                  misconception: '**Misconception:** "Critical analysis means criticizing the author or finding faults in the story." **Why students make this error:** The.' }
          ],
            remediations: { 'misconception-critical-analysis-means-criticizin': { steps: ['**Revisit Node c12_hin_a_cbse_15_009 (Irony and Symbolism):** Re-learn the *definition* and *function* of irony as.', '**Revisit Node c12_hin_a_cbse_15_006 (Primary Theme):** Map the theme "development vs.', 'displacement" across 5 key scenes using a two-column table: "State\'s Claim" vs.', '**Re-diagnostic:** Take Diagnostic Question 3 again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refers to the ability to compose.',
          hint: 'If unable to find evidence, return to node c12_hin_a_cbse_15_012 (Comprehension) and.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'What does PEEL stand for in answer writing, and what is the function of each component?', answer: 'PEEL = Point, Evidence, Explanation, Link',
                  options: ['PEEL = Point, Evidence, Explanation, Link', 'Point, Example, Explain, Conclusion', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If unable to find evidence, return to node c12_hin_a_cbse_15_012 (Comprehension) and practice the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'Compare two student answers to "Explain the irony in the term \'vk/qfud \'kj.kkFkhZ\' (modern pioneers) for the industrialists": Answer A: "It is ironic because.', answer: 'Answer B demonstrates analysis',
                  options: ['Answer B demonstrates analysis', 'writing skills', '"writing skills" means using flowery vocabulary and long sentences'],
                  hint: 'If unable to find evidence, return to node c12_hin_a_cbse_15_012 (Comprehension) and practice the.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['If student writes plot summaries instead of analysis: Step 1 — Take a 5-mark question they attempted.', 'Step 2 — Highlight every sentence: P (point), E (evidence), Ex (explanation), L (link).', 'Step 3 — Count how many sentences are pure plot retelling (mark as "N" for narrative).', 'Step 4 — Rewrite keeping only P/E/Ex/L sentences, replacing N-sentences with evidence+analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core.',
          misconception: 'Students think speaking and listening is just about talking fluently in Hindi.',
          parts: [
                { id: 'a', prompt: 'What are the two main discussion formats recommended by CBSE for the Assessment of Speaking and Listening (ASL) that can be applied to this chapter?', answer: 'The two main formats are Group Discussion (GD) and Debate',
                  options: ['The two main formats are Group Discussion (GD) and Debate', 'speech and interview', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' },
                { id: 'b', prompt: 'Explain why the title "Tahan koi okil nahi" (There is no lawyer there) is an effective discussion starter for this chapter.', answer: 'The title is ironic',
                  options: ['The title is ironic', 'it tells us the setting', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' },
                { id: 'c', prompt: 'Compare the perspectives of the contractor and the tribal elder in the chapter. How would you structure a debate between them?', answer: 'Contractor: "Progress needs sacrifice',
                  options: ['Contractor: "Progress needs sacrifice', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' }
          ],
            remediations: { 'speaking-and-listening-is-just': { steps: ['If a student cannot anchor discussion in text: 1) Have them re-read the Critical Thinking node (c12_hin_a_cbse_15_013).', '2) Practice with a peer using a checklist: State claim → Quote 1 line from text → Explain in own words → Ask "Do you.', 'Repeat until both are yes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
