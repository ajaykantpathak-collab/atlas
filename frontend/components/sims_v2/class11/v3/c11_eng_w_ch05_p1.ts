import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch05_p1: SimDef = {
    id: 'v3_c11_eng_w_ch05_p1',
    title: 'Pigeons at Daybreak (Short Story) · Part 1/3',
    subtitle: 'Read the pigeons as the story\'s structural heartbeat, not its wallpaper.',
    classLevel: 11, subject: 'eng_w', topic: 'Pigeons at Daybreak (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch05'],
    nodeIds: ['c11_eng_w_cbse_05_001', 'c11_eng_w_cbse_05_002', 'c11_eng_w_cbse_05_003', 'c11_eng_w_cbse_05_004', 'c11_eng_w_cbse_05_005', 'c11_eng_w_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader tracking a motif through one morning routine', intro: 'An old man, a rooftop of pigeons, a son\'s visit that cracks the routine — watch the birds mirror what he can\'t say.', goal: 'Distinguish plot summary from structural analysis and read a recurring motif.' },
    discovery: {
        question: 'Are the pigeons in \'Pigeons at Daybreak\' just set dressing while the real story is a father and son?',
        options: ['No — the pigeons anchor all three structural nodes: the routine, the panic of the confrontation, and the altered ritual at the end', 'Yes — the title is decorative and the plot is the son\'s visit', 'No — the pigeons are the literal antagonists of the story', 'Yes — the birds only establish that the man is old'],
        answer: 'No — the pigeons anchor all three structural nodes: the routine, the panic of the confrontation, and the altered ritual at the end',
        hook: 'A motif that returns at exposition, climax and resolution isn\'t decoration — it\'s the story\'s pulse.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Pappachi\' (Woven Words, ch. 5) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the pigeon motif through the arc\'s nodes and show how the resumed morning ritual has quietly changed by the end.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Pappachi\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the primary purpose of the "Guess the meaning of the following expressions from the context" list provided before the story begins?', options: [
                { text: 'The list primes students to notice key lexical items (e.g., "ignominy of retirement",', outcome: 'The list primes students to notice key lexical items (e.g., "ignominy of retirement", "conical.' },
                { text: 'to test vocabulary before reading', outcome: 'Not quite — Students often treat "Before You Read" as a skippable formality, guessing vocabulary meanings.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Pappachi\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'Define "narrative arc" and name its five standard components in order. How does this differ from a simple chronological summary of events?', options: [
                { text: 'A narrative arc is the structural framework organizing a story\'s events into five', outcome: 'A narrative arc is the structural framework organizing a story\'s events into five components.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students conflate "plot" with "story summary" and "structure" with "chronological order." They.', reveals: 'students-conflate-plot-with-story' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Pappachi\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary physical setting of "Pappachi\'s Moth" and during which historical period does the main action take place?', options: [
                { text: 'The primary physical setting is Ayemenem, Kerala, specifically the family house and its', outcome: 'The primary physical setting is Ayemenem, Kerala, specifically the family house and its.' },
                { text: 'Vienna', outcome: 'Not quite — Students often treat setting as a static backdrop—a list of places and times—rather than an active.', reveals: 'students-often-treat-setting-as' },
                { text: 'British era', outcome: 'Not quite — Students often treat setting as a static backdrop—a list of places and times—rather than an active.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Pappachi\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is Pappachi\'s profession before retirement, and what was his highest rank?', options: [
                { text: 'Pappachi (John Ipe) was an Imperial Entomologist at the Pusa Institute, and by the year', outcome: 'Pappachi (John Ipe) was an Imperial Entomologist at the Pusa Institute, and by the year he retired.' },
                { text: 'he was a pickle-maker', outcome: 'Not quite — Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous.', reveals: 'character-analysis-means-listing-adjectives' },
                { text: 'he was a doctor', outcome: 'Not quite — Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous.', reveals: 'character-analysis-means-listing-adjectives' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Pappachi\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the five supporting characters in "Pappachi\'s Moth" and state one specific action each takes that directly affects Pappachi.', options: [
                { text: 'The five supporting characters are: (1) Mammachi', outcome: 'The five supporting characters are: (1) Mammachi — builds a successful pickle business despite.' },
                { text: 'the moth or the Plymouth car as characters', outcome: 'Not quite — Students often treat supporting characters as "minor" and therefore less important for analysis.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Pappachi\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "Pappachi\'s Moth" in one complete thematic sentence (not a single word or topic).', options: [
                { text: 'Correct answer: The primary theme is the destructive consequences of wounded male pride', outcome: 'Correct answer: The primary theme is the destructive consequences of wounded male pride and.' },
                { text: 'jealousy', outcome: 'Not quite — Students often think the primary theme is "the moth discovery" or "Pappachi\'s career failure".', reveals: 'the-primary-theme-is-the' },
                { text: 'retirement', outcome: 'Not quite — Students often think the primary theme is "the moth discovery" or "Pappachi\'s career failure".', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a family-fiction unit your class reads \'Pappachi\'s Moth\' — an Imperial Entomologist whose new moth is named after someone else, and whose wife\'s pickle business out-earns him. A student says: \'It\'s a sad story about a bitter old man; the science and Kerala details are background flavour.\'',
            decisions: [{ prompt: 'Why do the entomology and setting details matter?', options: [
                { text: 'Because Pappachi\'s wound is professional, not vague: an Imperial Entomologist\'s life\'s honour is a named species, and the \'taxonomic reshuffle\' that denies him the moth is a public, official erasure — inside a rigid post-colonial Kerala hierarchy where rank defines a man. His violence spikes precisely when Mammachi\'s success and his obscurity collide; the moth is the symbol of stolen credit, not set-dressing.', outcome: 'Context — scientific prestige culture plus Kerala\'s hierarchies — turns domestic bitterness into a study of wounded patriarchal pride.' },
                { text: 'The student is right — it\'s a domestic drama; the moth could be any hobby disappointment.', outcome: 'An unnamed-moth discovery is a career-defining honour in taxonomy; swapping it for \'a hobby\' shrinks a public humiliation into a private sulking.', reveals: 'moth-is-just-a-hobby' },
                { text: 'Read it as a feminist triumph only — Mammachi\'s business succeeding is the whole story.', outcome: 'Her success matters, but as a trigger inside a status system: the chapter studies how a man\'s rage feeds on her competence — flattening it to triumph misses the violence.', reveals: 'story-is-only-triumph' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'He feeds the pigeons again at daybreak — same gesture, different man; the motif records what the plot can\'t say.',
            decisions: [{ prompt: 'What comes next? Pigeons at Daybreak (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Pigeons at Daybreak (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_001', difficulty: 'standard',
          question: '\'Pappachi\' (Woven Words, ch. 5) — the context and background to this text: who.',
          hint: 'Review the "Vocabulary in Context" and "Author Background" nodes from Class 9.',
          misconception: 'Students often treat "Before You Read" as a skippable formality, guessing vocabulary meanings in isolation without.',
          parts: [
                { id: 'a', prompt: 'The textbook mentions Pappachi was an "Imperial Entomologist at the Pusa Institute" whose designation changed to "Joint Director, Entomology" after.', answer: 'Pappachi\'s identity is tied to a British imperial title',
                  options: ['Pappachi\'s identity is tied to a British imperial title', 'he will be happy about the promotion'],
                  hint: 'Review the "Vocabulary in Context" and "Author Background" nodes from Class 9 (c9_engl_ch1_6.',
                  misconception: 'Students often treat "Before You Read" as a skippable formality, guessing vocabulary meanings in isolation without connecting them to the.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['Have the student cover the vocabulary list and read only the first two paragraphs of the story.', 'Ask: "Which words here feel heavy with unspoken meaning?" Guide them to "ignominy," "slouch," "weaving sullen circles.".', 'Together, infer meanings from the actions described (Pappachi\'s refusal to help, his pacing).', 'Then reveal the textbook list and match each phrase to the student\'s own inferences.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Pappachi\' — what happens, in what order, and why the.',
          hint: 'Review "The Thief\'s Story" (Class 10) - map Hari Singh\'s theft → return → transformation.',
          misconception: 'Students conflate "plot" with "story summary" and "structure" with "chronological order." They believe identifying.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Pappachi\'',
                  options: ['The plot/narrative arc of \'Pappachi\'', '\'Pappachi\' (Woven Words, ch', 'The setting of \'Pappachi\'', 'Character analysis in \'Pappachi\''],
                  hint: 'Review "The Thief\'s Story" (Class 10) - map Hari Singh\'s theft → return → transformation onto.',
                  misconception: 'Students conflate "plot" with "story summary" and "structure" with "chronological order." They believe identifying *what happens* (event.' }
          ],
            remediations: { 'students-conflate-plot-with-story': { steps: ['Have the student draw Freytag\'s Pyramid on paper and physically place 5-6 key events from the story on it—*not* in the.', 'For each event, ask: "What *caused* this?', 'What *does this cause*?" forcing causal arrows.', 'Compare the linear list vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_003', difficulty: 'standard',
          question: 'The setting of \'Pappachi\' — the place, time and atmosphere the text creates.',
          hint: 'Review "Identifying Sensory Imagery" (c7_engl_ch04_008) and "Setting as Symbol".',
          misconception: 'Students often treat setting as a static backdrop—a list of places and times—rather than an active element that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Pappachi\'',
                  options: ['The setting of \'Pappachi\'', '\'Pappachi\' (Woven Words, ch', 'The plot/narrative arc of \'Pappachi\'', 'Character analysis in \'Pappachi\''],
                  hint: 'Review "Identifying Sensory Imagery" (c7_engl_ch04_008) and "Setting as Symbol" (c8_engl_ch4_8) for.',
                  misconception: 'Students often treat setting as a static backdrop—a list of places and times—rather than an active element that generates atmosphere and.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot move beyond listing settings, guide them through a "sensory mapping" exercise: 1) Draw a floor plan.', '2) For each room, list three sensory details from the text (sight, sound, smell).', '3) Write one sentence per room: "The [room] feels [adjective] because [sensory detail] suggests [emotion]." 4) Connect.', 'This makes setting\'s atmospheric function visible and sequential.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis in \'Pappachi\' — the central figure(s), their traits, and how.',
          hint: 'If stuck, re-read the text focusing only on Pappachi\'s scenes: highlight every action.',
          misconception: 'Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous, violent, proud") without.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why Pappachi resents Mammachi\'s pickle-making success.', answer: 'Pappachi resents Mammachi\'s success',
                  options: ['Pappachi resents Mammachi\'s success', 'he is jealous', 'Pappachi is jealous, violent, proud', 'character analysis means listing adjectives (e'],
                  hint: 'If stuck, re-read the text focusing only on Pappachi\'s scenes: highlight every action, speech, and.',
                  misconception: 'Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous, violent, proud") without proving each trait.' },
                { id: 'b', prompt: 'Compare Pappachi\'s reaction to the moth discovery being named after someone else with his reaction to retirement.', answer: 'Both events wound Pappachi\'s pride',
                  options: ['Both events wound Pappachi\'s pride', 'Pappachi is jealous, violent, proud', 'character analysis means listing adjectives (e'],
                  hint: 'If stuck, re-read the text focusing only on Pappachi\'s scenes: highlight every action, speech, and.',
                  misconception: 'Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous, violent, proud") without proving each trait.' }
          ],
            remediations: { 'character-analysis-means-listing-adjectives': { steps: ['If a student gives a trait list without evidence: 1) Ask them to find the exact sentence where Pappachi\'s jealousy.', '2) Have them write one PEEL paragraph: Point (jealous), Evidence (quote), Explanation (what it shows), Link (to theme.', '3) Repeat for two more traits.', '4) Then ask: "How does the moth discovery connect to his treatment of Mammachi?" to force thematic synthesis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous, violent, proud") without.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Pappachi is a villain with no redeeming qualities." Use textual evidence to support your judgment.', answer: 'The statement is too simplistic',
                  options: ['The statement is too simplistic', 'Pappachi is jealous, violent, proud', 'simply agrees or disagrees without nuance fails the evaluative demand', 'character analysis means listing adjectives (e'],
                  hint: 'If stuck, re-read the text focusing only on Pappachi\'s scenes: highlight every action, speech, and.',
                  misconception: 'Students often think character analysis means listing adjectives (e.g., "Pappachi is jealous, violent, proud") without proving each trait.' }
          ],
            remediations: { 'character-analysis-means-listing-adjectives': { steps: ['If a student gives a trait list without evidence: 1) Ask them to find the exact sentence where Pappachi\'s jealousy.', '2) Have them write one PEEL paragraph: Point (jealous), Evidence (quote), Explanation (what it shows), Link (to theme.', '3) Repeat for two more traits.', '4) Then ask: "How does the moth discovery connect to his treatment of Mammachi?" to force thematic synthesis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_005', difficulty: 'standard',
          question: 'Supporting characters in \'Pappachi\' — the secondary figures who move the story.',
          hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_05_004) — specifically the.',
          misconception: 'Students often treat supporting characters as "minor" and therefore less important for analysis, listing their actions.',
          parts: [
                { id: 'a', prompt: 'List the five supporting characters in "Pappachi\'s Moth" and state one specific action each takes that directly affects Pappachi or responds to his behavior.', answer: 'The five supporting characters are: (1) Mammachi',
                  options: ['The five supporting characters are: (1) Mammachi', 'the moth or the Plymouth car as characters'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_05_004) — specifically the section.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore less important for analysis, listing their actions without explaining.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot move beyond trait-listing: (1) Give them a two-column table: Column A = "What the character.', '(3) Have them complete three rows independently for Chacko, Baby Kochamma, Kochu Maria.', '(4) Ask them to write one PEEL paragraph using their strongest row.', 'This forces the shift from description to analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of \'Pappachi\' — the central idea the whole text returns to.',
          hint: 'Review the difference between topic and theme using the "The Necklace" (Class 10).',
          misconception: 'Students often think the primary theme is "the moth discovery" or "Pappachi\'s career failure" because those are the.',
          parts: [
                { id: 'a', prompt: 'Explain why the moth — which is named after a junior officer Pappachi disliked — becomes a "pernicious ghost" haunting the family, using the concept.', answer: 'Correct answer: The moth symbolizes Pappachi\'s stolen recognition',
                  options: ['Correct answer: The moth symbolizes Pappachi\'s stolen recognition', 'tormented him and his children and his children\'s children', 'the moth discovery', 'Pappachi\'s career failure'],
                  hint: 'Review the difference between topic and theme using the "The Necklace" (Class 10) scaffold: topic.',
                  misconception: 'Students often think the primary theme is "the moth discovery" or "Pappachi\'s career failure" because those are the most unique plot.' },
                { id: 'b', prompt: 'Apply the theme of "wounded pride" to analyze Pappachi\'s refusal to help Mammachi with pickle-making despite her blindness.', answer: 'Correct answer: Pappachi refuses',
                  options: ['Correct answer: Pappachi refuses', 'the moth discovery', 'Pappachi\'s career failure'],
                  hint: 'Review the difference between topic and theme using the "The Necklace" (Class 10) scaffold: topic.',
                  misconception: 'Students often think the primary theme is "the moth discovery" or "Pappachi\'s career failure" because those are the most unique plot.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['If a student cannot distinguish topic from theme, have them complete this scaffold: (1) List five topics in the story.', '(2) For each, write a sentence: "The story suggests that [topic] leads to [consequence] because [textual reason]." (3).', 'Practice with a familiar story like "The Necklace" (Class 10) first: topic = vanity, theme = vanity combined with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
