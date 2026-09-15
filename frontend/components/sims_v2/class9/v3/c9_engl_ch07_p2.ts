import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch07_p2: SimDef = {
    id: 'v3_c9_engl_ch07_p2',
    title: 'Carrier of Words · Part 2/2',
    subtitle: 'The postman the desert couldn\'t stop',
    classLevel: 9, subject: 'engl', topic: 'Carrier of Words · Part 2/2',
    chapters: ['c9_engl_ch07'],
    nodeIds: ['c9_engl_ch7_6', 'c9_engl_ch7_7', 'c9_engl_ch7_8', 'c9_engl_ch7_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler of everyday heroes', intro: 'No roads, no buses, sandstorms on schedule — and the mail still arrives. Learn to summarise Khetaram\'s route by picking only the details that carry the story.', goal: 'Summarise \'Carrier of Words\' — protagonist, Thar setting, the challenge of desert mail delivery and its resolution — with selected facts, causal sentences and zero opinion.' },
    discovery: {
        question: 'By noon the Thar sand is so hot it would melt cycle tyres — so Khetaram walks the last five kilometres with a wet cloth on his head. What\'s he carrying that\'s worth it?',
        options: ['Letters, money orders and pension forms — for villages no road reaches, his leather bag is the only link to the outside world', 'Just junk mail', 'Newspapers for tourists', 'Nothing — he just likes walking'],
        answer: 'Letters, money orders and pension forms — for villages no road reaches, his leather bag is the only link to the outside world',
        hook: 'A summary is a map, not a photograph — \'Khetaram is very brave and I feel sad\' fails because feelings and morals aren\'t facts. The exam wants the route: 5 a.m. start, bicycle till noon, then five kilometres on foot to Dhani Maliyon.',
    },
    teaching: [
        { title: 'Literary Device: Descriptive Language and Imagery', text: 'Descriptive language refers to the deliberate use of vivid adjectives, strong verbs, sensory details, and figurative expressions to create a concrete mental picture of a person, place, object,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch7_6', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compress Khetaram\'s daily odyssey into 100-150 words: who he is (Gramin Dak Sewak), where he works (Thar villages), what he battles (sandstorms, 50°C heat), why it matters (pensions, letters, government schemes) — no opinions allowed.',
        labels: ['Literary Device: Descriptive Language', 'Vocabulary in Context: Words', 'Real-Life Context: Gramin Dak', 'Values: Perseverance, Commitment'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch7_6', title: 'Literary Device: Descriptive Language and Imagery',
          caseStudy: { intro: 'Imagine you are describing a scorching afternoon in the Thar Desert to a friend who has never left a hill station.',
            decisions: [{ prompt: 'Define "imagery" in the context of literary analysis and list the five types of sensory imagery.', options: [
                { text: 'Imagery is the use of language that appeals to the five senses to create a sensory', outcome: 'Imagery is the use of language that appeals to the five senses to create a sensory experience for.' },
                { text: 'descriptive words', outcome: 'Not quite — Students often believe that “imagery” means only visual description (pictures in the mind) and that.', reveals: 'imagery-means-only-visual-description' },
                { text: 'pictures in the mind', outcome: 'Not quite — Students often believe that “imagery” means only visual description (pictures in the mind) and that.', reveals: 'imagery-means-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_7', title: 'Vocabulary in Context: Words Related to Desert and Postal Service',
          caseStudy: { intro: 'Imagine you are reading the sentence: "The *scorching* wind whipped across the *dunes*, but the *Gramin Dak Sewak* kept pedaling." You might know "wind" and.',
            decisions: [{ prompt: 'Define "context clue" and name the four main types used to determine word meaning in a text.', options: [
                { text: 'A context clue is a hint within the surrounding text (sentences before/after) that helps', outcome: 'A context clue is a hint within the surrounding text (sentences before/after) that helps a reader.' },
                { text: 'looking in a dictionary', outcome: 'Not quite — Students believe **"Vocabulary in Context" means "Guess the meaning from the sentence alone."**.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'guessing', outcome: 'Not quite — Students believe **"Vocabulary in Context" means "Guess the meaning from the sentence alone."**.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_8', title: 'Real-Life Context: Gramin Dak Sewaks and Rural Postal System',
          caseStudy: { intro: 'Imagine you live in a remote village in Rajasthan where the nearest town is 50 km away — how does your pension money, Aadhaar update, or a letter from your.',
            decisions: [{ prompt: 'What is the primary difference between a Gramin Dak Sewak and a Departmental Postman in the Indian postal system?', options: [
                { text: 'A Gramin Dak Sewak is a part-time, contract-based worker engaged for 4-5 hours daily with', outcome: 'A Gramin Dak Sewak is a part-time, contract-based worker engaged for 4-5 hours daily with.' },
                { text: 'GDS are volunteers', outcome: 'Not quite — Students confuse GDS with "village postmen" of the past — imagining a simple mail-delivery role.', reveals: 'students-confuse-gds-with-village' },
                { text: 'both are same', outcome: 'Not quite — Students confuse GDS with "village postmen" of the past — imagining a simple mail-delivery role.', reveals: 'students-confuse-gds-with-village' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_9', title: 'Values: Perseverance, Commitment and Public Service',
          caseStudy: { intro: 'Imagine you are a Class 9 student who has just read about Khetaram walking 15 km daily across scorching sand dunes to deliver letters.',
            decisions: [{ prompt: 'What is the definition of \'perseverance\' as demonstrated by a literary character?', options: [
                { text: 'Perseverance is the continued effort to achieve something despite difficulties, failure,', outcome: 'Perseverance is the continued effort to achieve something despite difficulties, failure, or delay.' },
                { text: 'perseverance means working hard once', outcome: 'Not quite — Students often treat perseverance, commitment, and public service as synonyms for "hard work." They.', reveals: 'students-often-treat-perseverance' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'Khetaram, the Gramin Dak Sewak,\' a student writes: \'Khetaram is a very brave man walking in the hot desert. I feel sad for him in the sandstorms. The story teaches us to work hard.\'',
            decisions: [{ prompt: 'What rules of summary does this break?', options: [
                { text: 'Two at once: \'I feel sad\' is a personal reaction and \'teaches us to work hard\' is a moral — both interpretation, not plot. A summary reports objectively: a Gramin Dak Sewak crossing the Thar by bicycle and on foot through 50°C heat so isolated villages get letters, pensions and government notices.', outcome: 'This swaps evaluation for evidence — the factual who-where-what of the route and its stakes, which is all a summary is permitted to carry.' },
                { text: 'None — feelings and morals show the student understood the story deeply, which examiners reward.', outcome: 'Emotional response is a different question type entirely; inside a summary it is ruled out, and \'work hard\' replaces the story\'s actual content.', reveals: 'feelings-count' },
                { text: 'The only fix needed is naming every village on Khetaram\'s route, since thoroughness makes a summary complete.', outcome: 'A travelogue of every stop violates conciseness; a summary selects representative detail — it is a map, not a photograph.', reveals: 'list-all-villages' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_9', title: 'You made it',
          caseStudy: { intro: 'One man, one leather bag, an entire desert — the Gramin Dak Sewak keeps cut-off villages connected to the world. And a summary of it needs cause-and-effect sentences, not \'he walked a lot.\'',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch7_6', difficulty: 'standard',
          question: 'Descriptive language refers to the deliberate use of vivid adjectives, strong.',
          hint: 'Review Class 8 node c8_engl_ch4_7 (Imagery of Nature) and practice the five-colour.',
          misconception: 'Students often believe that “imagery” means only visual description (pictures in the mind) and that any adjective.',
          parts: [
                { id: 'a', prompt: 'Given the following new sentence about the same setting: “A dry wind scraped the skin, carrying the faint scent of camel dung and roasted cumin,” identify all.', answer: 'Tactile: “scraped the skin”, “dry wind”',
                  options: ['Tactile: “scraped the skin”, “dry wind”', 'smell and touch', 'gustatory', 'imagery'],
                  hint: 'Review Class 8 node c8_engl_ch4_7 (Imagery of Nature) and practice the five-colour highlighting.',
                  misconception: 'Students often believe that “imagery” means only visual description (pictures in the mind) and that any adjective counts as imagery.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Give the student a short prose extract (not a poem) from the chapter and ask them to highlight words for each sense.', 'Have them label each highlight with V, A, T, O, G.', 'Ask: “If you remove all tactile words, what happens to the reader’s sense of Khetaram’s struggle?” 4.', 'Guide them to write a two-sentence explanation linking the remaining sensory gaps to the theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that “imagery” means only visual description (pictures in the mind) and that any adjective.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the author’s choice to use predominantly tactile and visual imagery (rather than auditory or olfactory) in the passage describing.', answer: 'The choice is highly effective',
                  options: ['The choice is highly effective', 'it is good because it describes well', 'imagery'],
                  hint: 'Review Class 8 node c8_engl_ch4_7 (Imagery of Nature) and practice the five-colour highlighting.',
                  misconception: 'Students often believe that “imagery” means only visual description (pictures in the mind) and that any adjective counts as imagery.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Give the student a short prose extract (not a poem) from the chapter and ask them to highlight words for each sense.', 'Have them label each highlight with V, A, T, O, G.', 'Ask: “If you remove all tactile words, what happens to the reader’s sense of Khetaram’s struggle?” 4.', 'Guide them to write a two-sentence explanation linking the remaining sensory gaps to the theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_7', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review **Class 6/7/8 Vocabulary in Context nodes** (especially.',
          misconception: 'Students believe **"Vocabulary in Context" means "Guess the meaning from the sentence alone."** They read only the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', 'A text summary is a concise, objective restatement of a story\'s main events, central', 'Communication infrastructure refers to the physical and organizational systems—such as', 'A character study is a detailed analysis of a literary figure\'s personality traits,'],
                  hint: 'If stuck, review **Class 6/7/8 Vocabulary in Context nodes** (especially c6_english_u1_007.',
                  misconception: 'Students believe **"Vocabulary in Context" means "Guess the meaning from the sentence alone."** They read only the immediate sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['**Re-read the *entire* paragraph** containing the word, not just the sentence.', 'Ask: "What is the author *doing* here?', '**Highlight the specific clue type**: Circle signal words (means, is, unlike, but, for example).', 'Label: Def, Syn, Ant, Inf.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_8', difficulty: 'standard',
          question: 'Gramin Dak Sewaks (GDS) are part-time postal employees who form the backbone.',
          hint: 'Review the "Branch Office vs Sub Post Office vs Head Post Office" hierarchy from Class 8.',
          misconception: 'Students confuse GDS with "village postmen" of the past — imagining a simple mail-delivery role.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Gramin Dak Sewaks (GDS) are part-time postal employees who form the backbone of India\'s',
                  options: ['Gramin Dak Sewaks (GDS) are part-time postal employees who form the backbone of India\'s', 'A text summary is a concise, objective restatement of a story\'s main events, central', 'Communication infrastructure refers to the physical and organizational systems—such as', 'A character study is a detailed analysis of a literary figure\'s personality traits,'],
                  hint: 'Review the "Branch Office vs Sub Post Office vs Head Post Office" hierarchy from Class 8 Civics.',
                  misconception: 'Students confuse GDS with "village postmen" of the past — imagining a simple mail-delivery role.' }
          ],
            remediations: { 'students-confuse-gds-with-village': { steps: ['1) Show the student the *India Post Payments Bank GDS Services* poster (available online) listing 12+ financial.', '2) Ask them to match each service to a villager\'s need in the story (e.g., "Which service helps the old widow get her.', '3) Have them rewrite Khetaram\'s "micro-ATM" sentence from the text as a bullet list of 3 actual transactions he likely.', '4) Connect to c9_engl_ch7_4 (Connectivity theme) — the post office is now a *financial* connectivity node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_9', difficulty: 'standard',
          question: 'Perseverance, commitment, and public service are core values demonstrated.',
          hint: 'If stuck, review the "Character Study: Khetaram\'s Dedication in the Thar" (c9_engl_ch7_2).',
          misconception: 'Students often treat perseverance, commitment, and public service as synonyms for "hard work." They write: "Khetaram.',
          parts: [
                { id: 'a', prompt: 'In "Carrier of Words," Khetaram delivers mail even during sandstorms. Explain how this action shows commitment, not just perseverance.', answer: 'Commitment is a promise or obligation one binds oneself to',
                  options: ['Commitment is a promise or obligation one binds oneself to', 'it shows he is brave'],
                  hint: 'If stuck, review the "Character Study: Khetaram\'s Dedication in the Thar" (c9_engl_ch7_2) and list.',
                  misconception: 'Students often treat perseverance, commitment, and public service as synonyms for "hard work." They write: "Khetaram works hard, so he has.' },
                { id: 'b', prompt: 'Compare how perseverance is shown in Khetaram\'s daily 15 km walk versus his decision to carry a sick villager to the health center.', answer: 'Carrying the sick villager demonstrates higher perseverance',
                  options: ['Carrying the sick villager demonstrates higher perseverance', 'both are same'],
                  hint: 'If stuck, review the "Character Study: Khetaram\'s Dedication in the Thar" (c9_engl_ch7_2) and list.',
                  misconception: 'Students often treat perseverance, commitment, and public service as synonyms for "hard work." They write: "Khetaram works hard, so he has.' }
          ],
            remediations: { 'students-often-treat-perseverance': { steps: ['Ask the student to list three separate incidents from the text.', 'For each incident, ask: "What specific obstacle?', 'Label each choice with the correct value using the definitions.', 'Have them write one sentence per value using the formula: "When Khetaram [action], he shows [value] because [reason.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
