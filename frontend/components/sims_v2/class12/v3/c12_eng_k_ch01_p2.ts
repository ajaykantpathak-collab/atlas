import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch01_p2: SimDef = {
    id: 'v3_c12_eng_k_ch01_p2',
    title: 'I Sell My Dreams (Short Story) · Part 2/3',
    subtitle: 'She paid the rent with prophecies — and a wave proved her right',
    classLevel: 12, subject: 'eng_k', topic: 'I Sell My Dreams (Short Story) · Part 2/3',
    chapters: ['c12_eng_k_ch01'],
    nodeIds: ['c12_eng_k_cbse_01_007', 'c12_eng_k_cbse_01_008', 'c12_eng_k_cbse_01_009', 'c12_eng_k_cbse_01_010', 'c12_eng_k_cbse_01_011', 'c12_eng_k_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Latin American literature reader', intro: 'A woman dreams, warns, survives — and nobody in the story finds it strange. Welcome to magical realism.', goal: 'Situate I Sell My Dreams in Marquez\'s magical realism and its dual settings, reading the dream-trade against history.' },
    discovery: {
        question: 'In post-war Vienna — a city of spies, refugees and black markets — a woman earns her living selling her dreams. Why does that setting make the trade plausible?',
        options: ['Chaos craves certainty — a city of displacement and espionage is exactly where prophecy becomes a sellable commodity', 'Dreams were currency back then', 'Vienna banned other jobs for women', 'It\'s a random backdrop'],
        answer: 'Chaos craves certainty — a city of displacement and espionage is exactly where prophecy becomes a sellable commodity',
        hook: 'Magical realism isn\'t fantasy — the impossible is told in a reporter\'s flat voice. Marquez was a journalist; the Havana disaster opens like a news dispatch, and Frau Frieda\'s prophetic dreams are treated as ordinary employment. Blur that register and you misread the whole story.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'I Sell My Dreams\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Straddle two worlds — spy-ring Vienna and hurricane-hit Havana: map the frame narrative, weigh Neruda\'s rationality against Frau Frieda\'s gift, and decide whether her dreams are prophecy or survival strategy.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'I Sell My Dreams\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in your own words and give one example from any story you have studied previously.', options: [
                { text: 'A secondary theme is a supporting idea that recurs throughout a text and deepens the', outcome: 'A secondary theme is a supporting idea that recurs throughout a text and deepens the primary theme.' },
                { text: 'Matilda loses the necklace', outcome: 'Not quite — Students often treat every recurring topic as a "theme" (e.g., "the serpent ring is a theme".', reveals: 'students-often-treat-every-recurring' },
                { text: 'lists a plot event (e', outcome: 'Not quite — Students often treat every recurring topic as a "theme" (e.g., "the serpent ring is a theme".', reveals: 'students-often-treat-every-recurring' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'I Sell My Dreams\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "gustatory imagery" and give one example from the story (quote the exact phrase).', options: [
                { text: 'Gustatory imagery appeals to the sense of taste', outcome: 'Gustatory imagery appeals to the sense of taste. Example: "three whole lobsters, dissecting them.' },
                { text: 'A wrong answer that lists only visual details (', outcome: 'Not quite — Students often treat every descriptive adjective as "imagery" (e.g., calling "bright sun" visual.', reveals: 'students-often-treat-every-descriptive' },
                { text: 'invalid elephant', outcome: 'Not quite — Students often treat every descriptive adjective as "imagery" (e.g., calling "bright sun" visual.', reveals: 'students-often-treat-every-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'I Sell My Dreams\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "I Sell My Dreams" where the outcome directly contradicts what the characters or reader.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is opposite to what was', outcome: 'Situational irony occurs when the actual outcome of a situation is opposite to what was expected.' },
                { text: 'metaphor for Frau Frieda\'s deceit', outcome: 'Not quite — Students confuse *symbolism* with *metaphor* and treat the serpent ring as a "metaphor for Frau.', reveals: 'students-confuse-symbolism-with-metaphor' },
                { text: 'her dreams were a spiderweb', outcome: 'Not quite — Students confuse *symbolism* with *metaphor* and treat the serpent ring as a "metaphor for Frau.', reveals: 'students-confuse-symbolism-with-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'I Sell My Dreams\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: '**REMEMBER:** List the six phrases under \'dream\' and the five phrases under \'sell\' given in the NCERT Language Work section (page 10-11.', options: [
                { text: '**Correct Answer:** **dream:** dream on, dream something away, (not) dream of doing', outcome: '**Correct Answer:** **dream:** dream on, dream something away, (not) dream of doing something.' },
                { text: 'dream come true', outcome: 'Not quite — **The "Dictionary Definition = Contextual Meaning" Fallacy:** Students consistently treat.', reveals: 'the-dictionary-definition-contextual-meaning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'I Sell My Dreams\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is the principle of end-focus in English sentence structure, and which position in a sentence typically receives the least emphasis.', options: [
                { text: 'The principle of end-focus states that the most emphatic position in a sentence is its', outcome: 'The principle of end-focus states that the most emphatic position in a sentence is its end, the.' },
                { text: 'beginning is most emphatic', outcome: 'Not quite — Students believe "emphasis" means using italics, bold, or explicit intensifiers like "very,".', reveals: 'emphasis-means-using-italics' },
                { text: 'all positions are equal', outcome: 'Not quite — Students believe "emphasis" means using italics, bold, or explicit intensifiers like "very,".', reveals: 'emphasis-means-using-italics' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'I Sell My Dreams\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the literal meaning of Frau Frieda\'s statement "I sell my dreams" as described in the story?', options: [
                { text: 'Correct answer: Frau Frieda literally means that her occupation is interpreting dreams', outcome: 'Correct answer: Frau Frieda literally means that her occupation is interpreting dreams for.' },
                { text: 'She sells dreams like merchandise', outcome: 'Not quite — Students often treat inferential questions as "guess what the teacher thinks" or "give your.', reveals: 'students-often-treat-inferential-questions' },
                { text: 'It\'s a metaphor for writing', outcome: 'Not quite — Students often treat inferential questions as "guess what the teacher thinks" or "give your.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A colleague had a vivid dream about a train derailment and wants the whole team to cancel tomorrow\'s site visit. Márquez\'s dream-seller is suddenly the office\'s most quoted source.',
            decisions: [{ prompt: 'Cancel on a dream?', options: [
                { text: 'No — dreams are stories the mind tells, not evidence about the world; check the actual safety record and travel advisories, and treat the dream as a prompt to verify, not to obey.', outcome: 'Frau Frieda\'s dreams sell because they feel prophetic; real decisions still need checkable facts, not portents.' },
                { text: 'Cancel — dreams have predicted things before, so why risk it.', outcome: 'One uncanny hit among thousands of forgotten dreams is an anecdote, not a forecasting system.', reveals: 'anecdote-as-evidence' },
                { text: 'Ignore it entirely — feelings about a trip are irrational noise.', outcome: 'Dismissing the anxiety hides a legitimate prompt to double-check real risks; the dream is data about the dreamer.', reveals: 'dismiss-the-signal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the fantastic as fact and hear how a Nobel journalist-novelist fuses reportage with prophecy. Magical realism stops being a label and becomes a lens.',
            decisions: [{ prompt: 'What comes next? I Sell My Dreams (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — I Sell My Dreams (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes in \'I Sell My Dreams\' — the supporting ideas and motifs that.',
          hint: 'Review c11_eng_h_cbse_01_007 (Class 11 secondary theme lesson) and practice on a familiar.',
          misconception: 'Students often treat every recurring topic as a "theme" (e.g., "the serpent ring is a theme" or "Vienna is a theme").',
          parts: [
                { id: 'a', prompt: 'In the story, the Viennese family consults Frau Frieda at breakfast for daily decisions.', answer: 'The ritual illustrates the secondary theme of "blind faith vs',
                  options: ['The ritual illustrates the secondary theme of "blind faith vs', 'dreams come true'],
                  hint: 'Review c11_eng_h_cbse_01_007 (Class 11 secondary theme lesson) and practice on a familiar story.',
                  misconception: 'Students often treat every recurring topic as a "theme" (e.g., "the serpent ring is a theme" or "Vienna is a theme").' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['Revisit node c12_eng_k_cbse_01_006 (Primary Theme) and list the primary theme in one sentence.', 'Re-read the story with a highlighter: mark every passage NOT directly about dream-selling.', 'Group marked passages into 3 clusters; write a one-sentence thematic statement for each cluster (e.g., "Patriarchy.', 'Verify each statement appears in ≥2 non-consecutive scenes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat every recurring topic as a "theme" (e.g., "the serpent ring is a theme" or "Vienna is a theme").',
          parts: [
                { id: 'a', prompt: 'Evaluate the Portuguese ambassador\'s final statement: "In concrete terms... what did she do? Nothing.', answer: 'It paradoxically validates her power: "nothing" is the ultimate achievement',
                  options: ['It paradoxically validates her power: "nothing" is the ultimate achievement', 'she did nothing'],
                  hint: 'Review c11_eng_h_cbse_01_007 (Class 11 secondary theme lesson) and practice on a familiar story.',
                  misconception: 'Students often treat every recurring topic as a "theme" (e.g., "the serpent ring is a theme" or "Vienna is a theme").' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['Revisit node c12_eng_k_cbse_01_006 (Primary Theme) and list the primary theme in one sentence.', 'Re-read the story with a highlighter: mark every passage NOT directly about dream-selling.', 'Group marked passages into 3 clusters; write a one-sentence thematic statement for each cluster (e.g., "Patriarchy.', 'Verify each statement appears in ≥2 non-consecutive scenes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_008', difficulty: 'standard',
          question: 'Imagery in \'I Sell My Dreams\' — the vivid, sensory language that creates.',
          hint: 'If stuck, review "tenor/vehicle" and "sensory modes" in c11_eng_h_cbse_01_008 worked.',
          misconception: 'Students often treat every descriptive adjective as "imagery" (e.g., calling "bright sun" visual imagery) without.',
          parts: [
                { id: 'a', prompt: 'Define "gustatory imagery" and give one example from the story (quote the exact phrase).', answer: 'Gustatory imagery appeals to the sense of taste',
                  options: ['Gustatory imagery appeals to the sense of taste', 'A wrong answer that lists only visual details (', 'invalid elephant', 'metaphor for evil'],
                  hint: 'If stuck, review "tenor/vehicle" and "sensory modes" in c11_eng_h_cbse_01_008 worked examples.',
                  misconception: 'Students often treat every descriptive adjective as "imagery" (e.g., calling "bright sun" visual imagery) without checking if it evokes.' },
                { id: 'b', prompt: 'Explain in your own words the metaphor "I sell my dreams." Identify the tenor and the vehicle, and state what quality is transferred.', answer: 'Tenor = Frau Frieda\'s livelihood/survival strategy',
                  options: ['Tenor = Frau Frieda\'s livelihood/survival strategy', 'she sells dreams like vegetables', 'like selling', 'metaphor for evil'],
                  hint: 'If stuck, review "tenor/vehicle" and "sensory modes" in c11_eng_h_cbse_01_008 worked examples.',
                  misconception: 'Students often treat every descriptive adjective as "imagery" (e.g., calling "bright sun" visual imagery) without checking if it evokes.' },
                { id: 'c', prompt: 'Analyze how the extended metaphor of the "Renaissance pope" (applied to Neruda) functions across the Barcelona episode.', answer: 'Details: (1) "gluttonous and refined"',
                  options: ['Details: (1) "gluttonous and refined"', 'metaphor for evil'],
                  hint: 'If stuck, review "tenor/vehicle" and "sensory modes" in c11_eng_h_cbse_01_008 worked examples.',
                  misconception: 'Students often treat every descriptive adjective as "imagery" (e.g., calling "bright sun" visual imagery) without checking if it evokes.' }
          ],
            remediations: { 'students-often-treat-every-descriptive': { steps: ['Re-read the story with two highlighters: one for sensory phrases (ask "Can I taste/hear/feel this?"), one for A-is-B.', 'Revisit Class 11 node c11_eng_h_cbse_01_008 (Literary Devices: Imagery and Metaphor) and re-do its worked examples.', 'Write three PEEL paragraphs: one on a visual image, one on a tactile image, one on the central metaphor "I sell.', 'Self-check: Does each paragraph name the device, quote the phrase, identify sense/tenor/vehicle, and link to theme?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_009', difficulty: 'standard',
          question: 'Irony and paradox in \'I Sell My Dreams\' — where opposite things are both true.',
          hint: 'If stuck on symbol vs. metaphor, review c12_eng_k_cbse_01_008 Worked Example 2 where the.',
          misconception: 'Students confuse *symbolism* with *metaphor* and treat the serpent ring as a "metaphor for Frau Frieda\'s deceit.".',
          parts: [
                { id: 'a', prompt: 'Analyze the final exchange between the narrator and the Portuguese ambassador: "\'In concrete terms,\' I asked at last, \'what did she do?\' \'Nothing,\' he said.', answer: 'The ambassador\'s "Nothing',
                  options: ['The ambassador\'s "Nothing', 'the ambassador is disappointed', 'nothing', 'metaphor for Frau Frieda\'s deceit'],
                  hint: 'If stuck on symbol vs. metaphor, review c12_eng_k_cbse_01_008 Worked Example 2 where the.',
                  misconception: 'Students confuse *symbolism* with *metaphor* and treat the serpent ring as a "metaphor for Frau Frieda\'s deceit." A metaphor is a direct.' }
          ],
            remediations: { 'students-confuse-symbolism-with-metaphor': { steps: ['If the student cannot distinguish symbol from metaphor: 1) Return to c12_eng_k_cbse_01_008 (Imagery and Metaphor) and.', 'If the student over-identifies irony: 1) Use the "Irony Test": For each candidate, ask "Whose expectation.', 'What happened?" 2) Discard events where no character holds a clear expectation (e.g., the wave itself).', '3) Practice with c10_engl_cbse_01_007 (Irony in \'A Letter to God\') and c10_engl_cbse_13_008 (Irony: The Thief Who Gets.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_010', difficulty: 'standard',
          question: 'Key vocabulary of \'I Sell My Dreams\' — the words and phrases you must know.',
          hint: 'If unable to distinguish denotation vs. connotation, re-do Worked Example 2 from.',
          misconception: '**The "Dictionary Definition = Contextual Meaning" Fallacy:** Students consistently treat vocabulary questions as \'find.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In the story, Frau Frieda says: *"I sell my dreams."* Later, the narrator says: *"I had always thought her dreams were no more than a stratagem.', answer: '**Correct Answer:** Frau Frieda\'s \'sell\' is literal-survival: she exchanges',
                  options: ['**Correct Answer:** Frau Frieda\'s \'sell\' is literal-survival: she exchanges', 'both mean cheating', 'stratagem is just a fancy word for lie'],
                  hint: 'If unable to distinguish denotation vs. connotation, re-do Worked Example 2 from.',
                  misconception: '**The "Dictionary Definition = Contextual Meaning" Fallacy:** Students consistently treat vocabulary questions as \'find the synonym\'.' },
                { id: 'b', prompt: '**ANALYZE:** The word **"ineffable"** appears in: *"her conversation made it clear that, dream by dream, she had taken over the entire fortune of her ineffable.', answer: '**Correct Answer:** **Reason 1 (Irony):** \'Ineffable\' elevates the patrons to a',
                  options: ['**Correct Answer:** **Reason 1 (Irony):** \'Ineffable\' elevates the patrons to a', 'ineffable means they were nice/rich/quiet'],
                  hint: 'If unable to distinguish denotation vs. connotation, re-do Worked Example 2 from.',
                  misconception: '**The "Dictionary Definition = Contextual Meaning" Fallacy:** Students consistently treat vocabulary questions as \'find the synonym\'.' }
          ],
            remediations: { 'the-dictionary-definition-contextual-meaning': { steps: ['** Re-read the **Language Work section (pages 10-11)** aloud. For each of the 11 phrases, write: (a) dictionary.', '** Pick 5 narrative words (*oracular, stratagem, ineffable, intrepid, disenchantment, clairvoyant, labyrinth, magical.', '** Re-attempt **Diagnostic Questions 2, 4, 5** — they test exactly this annotation skill. **', '** If still stuck, revisit **c11_eng_h_cbse_01_010** (Class 11 Hornbill Vocabulary in Context) — do its Worked Examples.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_011', difficulty: 'standard',
          question: 'Language and style in \'I Sell My Dreams\' — how the writer chose words.',
          hint: 'If stuck, review "Given-New Contract" and "Clause Elements (S, V, O, C, A)" from Class.',
          misconception: 'Students believe "emphasis" means using italics, bold, or explicit intensifiers like "very," "extremely," "most.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'I Sell My Dreams\'',
                  options: ['Language and style in \'I Sell My Dreams\'', '\'I Sell My Dreams\' (Kaleidoscope, ch', 'The plot/narrative arc of \'I Sell My Dreams\'', 'The setting of \'I Sell My Dreams\''],
                  hint: 'If stuck, review "Given-New Contract" and "Clause Elements (S, V, O, C, A)" from Class 10/11.',
                  misconception: 'Students believe "emphasis" means using italics, bold, or explicit intensifiers like "very," "extremely," "most importantly." They miss.' }
          ],
            remediations: { 'emphasis-means-using-italics': { steps: ['Revisit Class 10 grammar node c10_engl_cbse_09_008 (Sentence Transformation) for basic fronting/inversion practice.', 'Do a focused 15-minute exercise: Take 5 sentences from the text, rewrite each three ways (standard, fronted, cleft).', 'Re-attempt Diagnostic Questions 3 and 4.', 'If still stuck, review the NCERT "Language Work B" section (pages 10-11) with a teacher, asking them to model the "Why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension of \'I Sell My Dreams\' — questions answered straight from.',
          hint: 'If stuck, review the plot summary (c12_eng_k_cbse_01_002) and character analysis.',
          misconception: 'Students often treat inferential questions as "guess what the teacher thinks" or "give your personal opinion," not.',
          parts: [
                { id: 'a', prompt: 'Given the description of the Havana Riviera Hotel incident, identify two literal details and one inferential conclusion about the wave\'s force.', answer: 'Correct answer: Literal details',
                  options: ['Correct answer: Literal details', 'the wave was a tsunami', 'The wave was caused by a hurricane'],
                  hint: 'If stuck, review the plot summary (c12_eng_k_cbse_01_002) and character analysis.',
                  misconception: 'Students often treat inferential questions as "guess what the teacher thinks" or "give your personal opinion," not realizing that valid.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['Re-read the story with two colored pens: underline every explicitly stated fact in blue (literal), and circle every.', 'For each red circle, write the blue evidence that supports it.', 'Practice converting three literal questions from the NCERT "Understanding the Text" section into inferential ones.', 'Re-attempt Diagnostic Questions 2 and 4, this time writing the textual evidence beside each answer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
