import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch14_p1: SimDef = {
    id: 'v3_c12_eng_k_ch14_p1',
    title: 'Chasing the Rainbow (Non-fiction) · Part 1/3',
    subtitle: 'Two essays, one word \'freedom,\' opposite wars',
    classLevel: 12, subject: 'eng_k', topic: 'Chasing the Rainbow (Non-fiction) · Part 1/3',
    chapters: ['c12_eng_k_ch14'],
    nodeIds: ['c12_eng_k_cbse_14_001', 'c12_eng_k_cbse_14_002', 'c12_eng_k_cbse_14_003', 'c12_eng_k_cbse_14_004', 'c12_eng_k_cbse_14_005', 'c12_eng_k_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Essayist-critic', intro: 'A socialist playwright and a man who refused to be anyone\'s guru both wrote about freedom — and meant entirely different things.', goal: 'Contrast Shaw\'s socio-economic freedom with Krishnamurti\'s psychological freedom, and the historical moments that shaped each.' },
    discovery: {
        question: 'Shaw says discipline can enslave; Krishnamurti says discipline is a prison. A student concludes \'they agree — both hate discipline.\' What\'s flattened?',
        options: ['Different targets — Shaw attacks economic coercion and wants just laws; Krishnamurti attacks psychological conformity and wants no external authority at all', 'Nothing — same word, same idea', 'Shaw actually loves discipline', 'Krishnamurti wants stricter schools'],
        answer: 'Different targets — Shaw attacks economic coercion and wants just laws; Krishnamurti attacks psychological conformity and wants no external authority at all',
        hook: 'Same word, different war: a Fabian socialist in Depression-era Britain fights \'wage slavery\' with structural reform; a teacher who rejected guruhood fights \'conditioning\' in the mind. Freedom for Shaw is fair distribution; for Krishnamurti it\'s self-awakened intelligence. History wrote their definitions.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Freedom\' (Kaleidoscope, ch. 14) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run two definitions of freedom side by side: trace Shaw\'s natural vs unnatural slavery and his jab at voting between \'two rich friends,\' then test Krishnamurti\'s claim that discipline and freedom can\'t share a mind.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Freedom\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the primary purpose of the "Before You Read" stage when approaching a non-fiction text like Shaw\'s "Freedom"?', options: [
                { text: 'The primary purpose is to build a mental framework by researching the author\'s', outcome: 'The primary purpose is to build a mental framework by researching the author\'s background.' },
                { text: 'to summarize the essay', outcome: 'Not quite — Students think "Before You Read" means skimming the "About the Author" box in the textbook and.', reveals: 'before-you-read-means-skimming' },
                { text: 'to answer the questions at the end', outcome: 'Not quite — Students think "Before You Read" means skimming the "About the Author" box in the textbook and.', reveals: 'before-you-read-means-skimming' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Freedom\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary difference between \'plot\' in a fictional short story and \'plot\' in a non-fiction essay like those in Kaleidoscope?', options: [
                { text: 'In fiction, plot is the causal sequence of events driven by character choices and', outcome: 'In fiction, plot is the causal sequence of events driven by character choices and conflicts.' },
                { text: 'both have climax and resolution', outcome: 'Not quite — Students treat non-fiction as "information delivery" and hunt for *facts* to memorize, ignoring.', reveals: 'students-treat-non-fiction-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Freedom\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the original medium of delivery for G.B. Shaw\'s essay "Freedom" and how do you know from the text?', options: [
                { text: 'The essay was originally a radio broadcast ("wireless talk")', outcome: 'The essay was originally a radio broadcast ("wireless talk"). The text explicitly states: "I.' },
                { text: 'I am never controversial over the wireless', outcome: 'Not quite — Students often believe non-fiction texts have no "setting" because they lack fictional.', reveals: 'non-fiction-texts-have-no' },
                { text: 'it was a newspaper article', outcome: 'Not quite — Students often believe non-fiction texts have no "setting" because they lack fictional.', reveals: 'non-fiction-texts-have-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Freedom\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of G.B. Shaw\'s essay "Freedom" as distinct from its subject matter?', options: [
                { text: 'The primary theme is the distinction between natural necessity (slavery to Nature) and', outcome: 'The primary theme is the distinction between natural necessity (slavery to Nature) and social.' },
                { text: 'freedom is important', outcome: 'Not quite — Students consistently confuse "topic" with "theme" in non-fiction.', reveals: 'students-consistently-confuse-topic-with' },
                { text: 'slavery is bad', outcome: 'Not quite — Students consistently confuse "topic" with "theme" in non-fiction.', reveals: 'students-consistently-confuse-topic-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A firm advertises \'total freedom at work\' while wages force everyone into overtime obedience; meanwhile a visiting guru sells \'inner liberation\' workshops to the same exhausted staff.',
            decisions: [{ prompt: 'Shaw and Krishnamurti would diagnose this how?', options: [
                { text: 'Two different cages — Shaw\'s \'wage slavery\' names the economic chain, Krishnamurti\'s \'conditioning\' names the psychological one; fix the pay structure AND the mind, neither talk alone liberates.', outcome: 'Outer constraint and inner conditioning are separate problems; a mindfulness seminar can\'t shorten a workday.' },
                { text: 'The guru is right — freedom is an inner state, so circumstances don\'t matter.', outcome: 'That\'s Krishnamurti without Shaw; the wage chain binds regardless of how free the mind feels.', reveals: 'inner-freedom-fixes-outer-chains' },
                { text: 'Only the law matters — pass rules and freedom follows automatically.', outcome: 'Shaw himself mocks that faith; conditioning survives rulebooks, which is why both diagnoses are needed.', reveals: 'rules-create-freedom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue freedom on two axes — the economic and the psychological — and spot when identical words hide opposite arguments.',
            decisions: [{ prompt: 'What comes next? Chasing the Rainbow (Non-fiction) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chasing the Rainbow (Non-fiction) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_001', difficulty: 'standard',
          question: '\'Freedom\' (Kaleidoscope, ch. 14) — the context and background to this text: who.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Hornbill Ch1 "Before You Read") and redo the.',
          misconception: 'Students think "Before You Read" means skimming the "About the Author" box in the textbook and memorizing birth/death.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of the "Before You Read" stage when approaching a non-fiction text like Shaw\'s "Freedom"?', answer: 'The primary purpose is to build a mental framework by researching the author\'s',
                  options: ['The primary purpose is to build a mental framework by researching the author\'s', 'to summarize the essay', 'to answer the questions at the end', 'Before You Read'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Hornbill Ch1 "Before You Read") and redo the.',
                  misconception: 'Students think "Before You Read" means skimming the "About the Author" box in the textbook and memorizing birth/death dates.' },
                { id: 'b', prompt: 'Analyze the difference in historical context between Shaw\'s "Freedom" (written 1930s) and Krishnamurti\'s talk (likely 1950s-60s).', answer: 'Shaw writes amid the Great Depression, rise of fascism/communism, and industrial',
                  options: ['Shaw writes amid the Great Depression, rise of fascism/communism, and industrial', 'both talk about freedom so they mean the same thing', 'Before You Read', 'About the Author'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Hornbill Ch1 "Before You Read") and redo the.',
                  misconception: 'Students think "Before You Read" means skimming the "About the Author" box in the textbook and memorizing birth/death dates.' }
          ],
            remediations: { 'before-you-read-means-skimming': { steps: ['If a student cannot move beyond biographical trivia: 1) Give them a 2-column template: "Fact from Bio" → "How This.', '4) Re-diagnose with Diagnostic Question 2 — they must now explain the link, not just state the fact.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Before You Read" means skimming the "About the Author" box in the textbook and memorizing birth/death.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s pre-reading note: "Shaw and Krishnamurti both hate discipline. Shaw says it\'s slavery; Krishnamurti says it\'s a prison.', answer: 'No, it\'s a superficial synthesis that conflates two distinct concepts',
                  options: ['No, it\'s a superficial synthesis that conflates two distinct concepts', 'Before You Read', 'About the Author'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Hornbill Ch1 "Before You Read") and redo the.',
                  misconception: 'Students think "Before You Read" means skimming the "About the Author" box in the textbook and memorizing birth/death dates.' },
                { id: 'b', prompt: 'Create a 3-column "Context Comparison Table" for the two essays with these headers: Author & Identity | Historical Moment | Core Metaphor for Unfreedom.', answer: '| Author & Identity | Historical Moment | Core Metaphor for Unfreedom |',
                  options: ['| Author & Identity | Historical Moment | Core Metaphor for Unfreedom |', 'Before You Read', 'About the Author'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Hornbill Ch1 "Before You Read") and redo the.',
                  misconception: 'Students think "Before You Read" means skimming the "About the Author" box in the textbook and memorizing birth/death dates.' }
          ],
            remediations: { 'before-you-read-means-skimming': { steps: ['If a student cannot move beyond biographical trivia: 1) Give them a 2-column template: "Fact from Bio" → "How This.', '4) Re-diagnose with Diagnostic Question 2 — they must now explain the link, not just state the fact.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Freedom\' — what happens, in what order, and why the.',
          hint: 'If stuck, revisit Class 11 Hornbill Chapter 1 "The Portrait of a Lady" (node.',
          misconception: 'Students treat non-fiction as "information delivery" and hunt for *facts* to memorize, ignoring that the *arrangement*.',
          parts: [
                { id: 'a', prompt: 'Compare the narrative structure of G.B. Shaw\'s "Freedom" (from your textbook) with a typical investigative journalism piece.', answer: 'Shaw uses a **conversational/dialectical structure**: he simulates a dialogue,',
                  options: ['Shaw uses a **conversational/dialectical structure**: he simulates a dialogue,', 'both argue a point'],
                  hint: 'If stuck, revisit Class 11 Hornbill Chapter 1 "The Portrait of a Lady" (node c11_eng_h_cbse_01_002).',
                  misconception: 'Students treat non-fiction as "information delivery" and hunt for *facts* to memorize, ignoring that the *arrangement* of facts IS the.' }
          ],
            remediations: { 'students-treat-non-fiction-as': { steps: ['If a student cannot move beyond content-summary: 1.', 'Give them a 3-paragraph op-ed (e.g., on "Should schools ban smartphones?").', 'Ask them to label each paragraph with a *structural tag*: [Hook], [Context], [Claim 1], [Evidence 1].', 'Have them draw a flowchart: Hook → Context → Claim → Evidence → Counter → Rebuttal → CTA.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_003', difficulty: 'standard',
          question: 'The setting of \'Freedom\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck on identifying setting clues, return to c12_eng_k_cbse_14_001 and list all.',
          misconception: 'Students often believe non-fiction texts have no "setting" because they lack fictional world-building, or that.',
          parts: [
                { id: 'a', prompt: 'What is the original medium of delivery for G.B. Shaw\'s essay "Freedom" and how do you know from the text?', answer: 'The essay was originally a radio broadcast ("wireless talk")',
                  options: ['The essay was originally a radio broadcast ("wireless talk")', 'I am never controversial over the wireless', 'it was a newspaper article', 'setting'],
                  hint: 'If stuck on identifying setting clues, return to c12_eng_k_cbse_14_001 and list all proper nouns.',
                  misconception: 'Students often believe non-fiction texts have no "setting" because they lack fictional world-building, or that "atmosphere" only applies.' }
          ],
            remediations: { 'non-fiction-texts-have-no': { steps: ['If the student cannot distinguish setting from content: 1.', 'Revisit c12_eng_k_cbse_14_001 (Before You Read) to rebuild historical context for both authors.', 'Practice the "medium swap" exercise: rewrite the first paragraph of Shaw\'s essay as a newspaper editorial — what.', 'For atmosphere, use the "tone spectrum" activity: place 5 key sentences from each essay on a continuum from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_004', difficulty: 'standard',
          question: 'Character analysis in \'Freedom\' — the central figure(s), their traits, and how.',
          hint: 'If stuck on pronoun/rhetorical-question tracking: revisit c11_eng_w_cbse_01_004 Worked.',
          misconception: 'Students treat \'character analysis\' in non-fiction as **summarising the author\'s biography or stated opinions** (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'Freedom\'',
                  options: ['Character analysis in \'Freedom\'', '\'Freedom\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Freedom\'', 'The setting of \'Freedom\''],
                  hint: 'If stuck on pronoun/rhetorical-question tracking: revisit c11_eng_w_cbse_01_004 Worked Example 2.',
                  misconception: 'Students treat \'character analysis\' in non-fiction as **summarising the author\'s biography or stated opinions** (e.g., "Shaw was.' }
          ],
            remediations: { 'students-treat-character-analysis-in': { steps: ['If a student cannot distinguish author from persona: 1.', '**Revisit c11_eng_w_cbse_01_004 (Character Analysis: Protagonist — Woven Words)** — review the distinction between.', '**Do a micro-exercise**: Take one paragraph from Shaw (e.g., the \'honey/bees\' passage) and one from Krishnamurti (e.g.', 'For each, answer: "What does this voice *want me to feel about myself* right now?" — not "What does the author think?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_005', difficulty: 'standard',
          question: 'Supporting characters in \'Freedom\' — the secondary figures who move the story.',
          hint: 'If stuck, review "authorial framing" in c12_eng_k_cbse_14_004 and practice with a single.',
          misconception: 'Students often treat supporting characters in non-fiction as mere "examples" or "illustrations" — passive decorations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Freedom\'',
                  options: ['Supporting characters in \'Freedom\'', '\'Freedom\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Freedom\'', 'The setting of \'Freedom\''],
                  hint: 'If stuck, review "authorial framing" in c12_eng_k_cbse_14_004 and practice with a single supporting.',
                  misconception: 'Students often treat supporting characters in non-fiction as mere "examples" or "illustrations" — passive decorations for the author\'s.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Revisit c12_eng_k_cbse_14_004 (Protagonist Analysis) to recall the difference between *what a character does* and *how.', 'Take one supporting character from "Chasing the Rainbow" and annotate every authorial choice: which words are quoted.', 'Write a 3-sentence "function statement" for that character: "The author uses [Name] to [rhetorical purpose].', 'Verify with a peer: does your statement explain the *effect on the reader*, not just the content?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_006', difficulty: 'standard',
          question: 'The primary theme of \'Freedom\' — the central idea the whole text returns to.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and Message) and practice.',
          misconception: 'Students consistently confuse "topic" with "theme" in non-fiction.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Shaw argues that "Nature is kind to her slaves" while "the slavery of man to man is hateful to the body and spirit."', answer: 'Shaw contends that natural necessities (eating, sleeping) carry built-in rewards',
                  options: ['Shaw contends that natural necessities (eating, sleeping) carry built-in rewards', 'Nature is nice but people are mean'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and Message) and practice the "author.',
                  misconception: 'Students consistently confuse "topic" with "theme" in non-fiction.' },
                { id: 'b', prompt: 'In Krishnamurti\'s text, he states: "Discipline and freedom are contradictory." Apply this claim to a concrete situation from a student\'s life: a Class 12.', answer: 'It represents discipline (external imposition), not freedom',
                  options: ['It represents discipline (external imposition), not freedom', 'the timetable gives freedom by creating structure'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and Message) and practice the "author.',
                  misconception: 'Students consistently confuse "topic" with "theme" in non-fiction.' }
          ],
            remediations: { 'students-consistently-confuse-topic-with': { steps: ['If a student cannot distinguish topic from theme: (1) Give them Shaw\'s first paragraph and ask: "What is the subject?', 'What is the claim?" (Subject: freedom.', 'Claim: perfect freedom is impossible; we are all slaves to Nature.) (2) Have them complete this frame: "The author.', '(4) Re-diagnose with a fresh non-fiction excerpt (e.g., a newspaper editorial) using the same frame.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
