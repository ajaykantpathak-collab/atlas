import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch20_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch20_p1: SimDef = {
    id: 'v3_c12_eng_k_ch20_p1',
    title: 'The Open Window (Drama) · Part 1/3',
    subtitle: 'She was told she was human — and tried to own the man who said it',
    classLevel: 12, subject: 'eng_k', topic: 'The Open Window (Drama) · Part 1/3',
    chapters: ['c12_eng_k_ch20'],
    nodeIds: ['c12_eng_k_cbse_20_001', 'c12_eng_k_cbse_20_002', 'c12_eng_k_cbse_20_003', 'c12_eng_k_cbse_20_004', 'c12_eng_k_cbse_20_005', 'c12_eng_k_cbse_20_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Drama scholar', intro: 'A Buddhist legend, a Nobel poet\'s scalpel, and a question nobody asks: what happens the day after liberation?', goal: 'Read Chandalika as a tragedy of awakened selfhood — where liberation overshoots into possessiveness.' },
    discovery: {
        question: 'Ananda asks an \'untouchable\' girl for water; she tastes equality for the first time — then uses her mother\'s magic to bind him. Is Chandalika a social reform play?',
        options: ['It\'s a tragedy of self-consciousness — Prakriti\'s liberation is real, but a newly awakened self can\'t yet tell love from possession', 'Yes — caste is wrong, end of story', 'No — it\'s a romance', 'It\'s about Buddhist magic'],
        answer: 'It\'s a tragedy of self-consciousness — Prakriti\'s liberation is real, but a newly awakened self can\'t yet tell love from possession',
        hook: 'Tagore rewrote a crude legend of magic and lust into \'a psychological drama of intense spiritual conflict.\' Prakriti — named for nature\'s raw life-force — gets her humanity in Act I; Act II is the danger: freedom that hasn\'t learned to love without grasping. Self-humiliation, he wrote, is a sin worse than self-murder.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'s devotion but from selfless love that respects the other\' (Kaleidoscope, ch. 20) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_20_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stage the collision: weigh the earth-spell against the monk\'s sadhana, track how gratitude curdles into possession, and judge who pays the price of a consciousness that overreached.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'s devotion but from selfless love that respects the other\', then the period, then the literary context — background turns a text from.',
            decisions: [{ prompt: 'What is the source legend of *Chandalika*, and how does Tagore explicitly describe his transformation of it in the Introduction?', options: [
                { text: 'The source is a Buddhist legend where Ananda, Buddha\'s disciple, asks water from a', outcome: 'The source is a Buddhist legend where Ananda, Buddha\'s disciple, asks water from a *chandalika*.' },
                { text: 'It\'s a story about a witch and a monk', outcome: 'Not quite — Students treat *Chandalika* primarily as a "caste reform play" or "social problem drama".', reveals: 'students-treat-chandalika-primarily-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'s devotion but from selfless love that respects the other\' from opening to close: how it starts, how events/images build, where it lands — the sequence.',
            decisions: [{ prompt: 'What is the inciting incident in *Chandalika*, and why does it disrupt Prakriti\'s equilibrium?', options: [
                { text: 'The inciting incident is Ananda\'s request for water at the well, where he treats Prakriti', outcome: 'The inciting incident is Ananda\'s request for water at the well, where he treats Prakriti as.' },
                { text: 'the mother\'s spell', outcome: 'Not quite — Students often believe the climax is Ananda\'s physical arrival at the door in Act II.', reveals: 'the-climax-is-ananda-s' },
                { text: 'Prakriti\'s song', outcome: 'Not quite — Students often believe the climax is Ananda\'s physical arrival at the door in Act II.', reveals: 'the-climax-is-ananda-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'s devotion but from selfless love that respects the other\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the three primary physical settings in Act I of Chandalika, and what social reality does each represent?', options: [
                { text: 'The three primary physical settings in Act I are: (1) The well', outcome: 'The three primary physical settings in Act I are: (1) The well — a liminal space where caste.' },
                { text: 'village', outcome: 'Not quite — Students often treat setting in Chandalika as a static background — "a village well in ancient.', reveals: 'students-often-treat-setting-in' },
                { text: 'forest', outcome: 'Not quite — Students often treat setting in Chandalika as a static background — "a village well in ancient.', reveals: 'students-often-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'s devotion but from selfless love that respects the other\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the exact words Ananda speaks to Prakriti at the well that trigger her "new birth"?', options: [
                { text: 'Ananda says: "As I am a human being, so also are you, and all water is clean and holy', outcome: 'Ananda says: "As I am a human being, so also are you, and all water is clean and holy that cools.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often treat Prakriti\'s "new birth" as *complete* after Ananda\'s first visit, missing that.', reveals: 'students-often-treat-prakriti-s' },
                { text: 'You are pure', outcome: 'Not quite — Students often treat Prakriti\'s "new birth" as *complete* after Ananda\'s first visit, missing that.', reveals: 'students-often-treat-prakriti-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'s devotion but from selfless love that respects the other\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'What is the Mother\'s immediate reaction when Prakriti tells her about Ananda accepting water from her hands in Act I?', options: [
                { text: 'The Mother reacts with alarm and warns Prakriti of dire consequences: "O, you stupid', outcome: 'The Mother reacts with alarm and warns Prakriti of dire consequences: "O, you stupid girl, how.' },
                { text: 'She is happy for her daughter', outcome: 'Not quite — Students treat Ananda as a "love interest" or romantic lead because Prakriti desires him.', reveals: 'students-treat-ananda-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'s devotion but from selfless love that respects the other\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the single catalytic event in Act I that triggers Prakriti\'s "new birth," and what exact words does Ananda speak that constitute.', options: [
                { text: 'The catalytic event is Ananda asking Prakriti for water at the well', outcome: 'The catalytic event is Ananda asking Prakriti for water at the well.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with.', reveals: 'students-conflate-the-legend-s' },
                { text: 'Ananda teaches her Buddhism', outcome: 'Not quite — Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with.', reveals: 'students-conflate-the-legend-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A long-excluded teammate is suddenly given real authority on the project — and immediately uses it to control and belittle the others.',
            decisions: [{ prompt: 'What does Tagore\'s Chandalika caution?', options: [
                { text: 'That being recognised as human and learning to wield freedom are different steps — Prakriti\'s awakening curdles into possessive power because liberation arrived without maturity; coach her, don\'t just crown or strip her.', outcome: 'The play\'s tragedy is the gap between dignity granted and self-command learned — neither pure empowerment nor revoked authority is the answer.' },
                { text: 'Empowerment alone was the fix — oppression ends the moment power changes hands.', outcome: 'Act II exists precisely to disprove that; freedom without maturity can reproduce the very domination it escaped.', reveals: 'recognition-equals-maturity' },
                { text: 'Take the authority back — this proves the marginalised can\'t handle power.', outcome: 'Tagore\'s point is the opposite: it\'s the long denial of humanity that deforms the first use of it, not unfitness.', reveals: 'failure-proves-unfitness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_20_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the play past its \'caste reform\' surface into Tagore\'s real subject — the dangerous adolescence of a newly freed self.',
            decisions: [{ prompt: 'What comes next? The Open Window (Drama) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Open Window (Drama) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_001', difficulty: 'standard',
          question: '\'s devotion but from selfless love that respects the other\' (Kaleidoscope, ch.',
          hint: 'Review c11_eng_w_cbse_20_001 — specifically the "Introduction" section of *Chitra* where.',
          misconception: 'Students treat *Chandalika* primarily as a "caste reform play" or "social problem drama" — expecting a clear moral.',
          parts: [
                { id: 'a', prompt: 'In the Introduction, Tagore writes: "Self-humiliation is a sin, worse than self-murder." Explain what this means in the context of the *chandalika*\'s lived.', answer: 'For a *chandalika*, self-humiliation is internalised caste oppression',
                  options: ['For a *chandalika*, self-humiliation is internalised caste oppression', 'polite words'],
                  hint: 'Review c11_eng_w_cbse_20_001 — specifically the "Introduction" section of *Chitra* where Tagore.',
                  misconception: 'Students treat *Chandalika* primarily as a "caste reform play" or "social problem drama" — expecting a clear moral: "untouchability.' }
          ],
            remediations: { 'students-treat-chandalika-primarily-as': { steps: ['If a student cannot articulate the legend-to-drama transformation or the "spell of earth vs sadhana" conflict: (1) Have.', '203-206) with a highlighter, marking every contrast Tagore draws (crude plot vs psychological drama, lust vs spiritual.', '(2) Ask them to write two 2-sentence summaries: one of the *original legend*, one of *Tagore\'s version* — then compare.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_1 and DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat *Chandalika* primarily as a "caste reform play" or "social problem drama" — expecting a clear moral.',
          parts: [
                { id: 'a', prompt: 'Evaluate Tagore\'s claim that *Chandalika* is "a tragedy of self-consciousness over-reaching its limit." Is the tragedy Prakriti\'s fault, society\'s fault, or.', answer: 'It is an *inevitable structural contradiction*',
                  options: ['It is an *inevitable structural contradiction*', 'Prakriti\'s pride', 'caste system'],
                  hint: 'Review c11_eng_w_cbse_20_001 — specifically the "Introduction" section of *Chitra* where Tagore.',
                  misconception: 'Students treat *Chandalika* primarily as a "caste reform play" or "social problem drama" — expecting a clear moral: "untouchability.' }
          ],
            remediations: { 'students-treat-chandalika-primarily-as': { steps: ['If a student cannot articulate the legend-to-drama transformation or the "spell of earth vs sadhana" conflict: (1) Have.', '203-206) with a highlighter, marking every contrast Tagore draws (crude plot vs psychological drama, lust vs spiritual.', '(2) Ask them to write two 2-sentence summaries: one of the *original legend*, one of *Tagore\'s version* — then compare.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_1 and DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'s devotion but from selfless love that respects the.',
          hint: 'Review Freytag\'s pyramid using a known story (e.g., *Cinderella*) and practice mapping.',
          misconception: 'Students often believe the climax is Ananda\'s physical arrival at the door in Act II.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the two-act structure (with a fifteen-day gap) shapes the audience\'s experience of the spell\'s working.', answer: 'Act I ends with the spell begun',
                  options: ['Act I ends with the spell begun', 'the gap shows the spell failed', 'Act II is a new story', 'the climax is Ananda\'s physical arrival at the door in Act II'],
                  hint: 'Review Freytag\'s pyramid using a known story (e.g., *Cinderella*) and practice mapping each event.',
                  misconception: 'Students often believe the climax is Ananda\'s physical arrival at the door in Act II.' },
                { id: 'b', prompt: 'Compare the role of the mother in Act I versus Act II: how does her function in the narrative structure shift from reluctant accomplice to sacrificial chorus?', answer: 'In Act I the mother is a gatekeeper who warns, resists, and finally yields',
                  options: ['In Act I the mother is a gatekeeper who warns, resists, and finally yields', 'she just does magic', 'treats her as static ("she just does magic") ignores her structural evolution', 'the climax is Ananda\'s physical arrival at the door in Act II'],
                  hint: 'Review Freytag\'s pyramid using a known story (e.g., *Cinderella*) and practice mapping each event.',
                  misconception: 'Students often believe the climax is Ananda\'s physical arrival at the door in Act II.' }
          ],
            remediations: { 'the-climax-is-ananda-s': { steps: ['If a student cannot distinguish climax from resolution, have them re-read Act II from "PRAKRITI (looks in the mirror.', 'Then map the five pyramid stages on a vertical line, placing each key event on its rung.', 'Finally, have them write a one-sentence summary for each rung.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_003', difficulty: 'standard',
          question: 'The setting of \'s devotion but from selfless love that respects the other\'.',
          hint: 'If stuck on "atmosphere," return to Class 7 node c7_engl_ch04_005 (Atmosphere in "The.',
          misconception: 'Students often treat setting in Chandalika as a static background — "a village well in ancient India" — and atmosphere.',
          parts: [
                { id: 'a', prompt: 'What are the three primary physical settings in Act I of Chandalika, and what social reality does each represent?', answer: 'The three primary physical settings in Act I are: (1) The well',
                  options: ['The three primary physical settings in Act I are: (1) The well', 'village', 'forest'],
                  hint: 'If stuck on "atmosphere," return to Class 7 node c7_engl_ch04_005 (Atmosphere in "The Tunnel") and.',
                  misconception: 'Students often treat setting in Chandalika as a static background — "a village well in ancient India" — and atmosphere as mere weather.' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['If the student cannot move beyond "background" thinking: 1) Have them re-read Act I\'s opening stage direction and.', 'What would change if they met in a temple?" 2) Map the three settings (well, courtyard, road) on paper and annotate.', '3) Watch a 5-minute clip of a Chandalika performance (YouTube: "Chandalika Tagore play") and note how the director uses.', '4) Re-attempt Diagnostic Question 3 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_004', difficulty: 'standard',
          question: 'Character analysis in \'s devotion but from selfless love that respects the.',
          hint: 'If stuck on "how does she change?", re-read c12_eng_k_cbse_20_002 (Plot) and list.',
          misconception: 'Students often treat Prakriti\'s "new birth" as *complete* after Ananda\'s first visit, missing that the play is about.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Prakriti calls her encounter with Ananda a "new birth" rather than just a kind gesture.', answer: 'Because Ananda\'s acceptance of water from her hands',
                  options: ['Because Ananda\'s acceptance of water from her hands', 'he was nice to her'],
                  hint: 'If stuck on "how does she change?", re-read c12_eng_k_cbse_20_002 (Plot) and list Prakriti\'s first.',
                  misconception: 'Students often treat Prakriti\'s "new birth" as *complete* after Ananda\'s first visit, missing that the play is about the *second* birth.' }
          ],
            remediations: { 'students-often-treat-prakriti-s': { steps: ['Re-read Act I focusing *only* on Prakriti\'s speeches — highlight every "I" statement.', 'Make a two-column table: Column A = Act I assertions of self-worth ("I am no slave"); Column B = Act II assertions.', 'Watch/read the mirror scenes (Act II) and note the *exact words* where her tone shifts from "joy hard to name" to "O.', 'Re-attempt Diagnostic Question 3 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_005', difficulty: 'standard',
          question: 'Supporting characters in \'s devotion but from selfless love that respects the.',
          hint: 'Review c11_eng_h_cbse_01_005 worked examples on Madhav/Thakurda as foils in *The Post.',
          misconception: 'Students treat Ananda as a "love interest" or romantic lead because Prakriti desires him.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Mother initially refuses to cast the spell on Ananda, and what changes her mind.', answer: 'The Mother refuses',
                  options: ['The Mother refuses', 'She wants her daughter to be happy'],
                  hint: 'Review c11_eng_h_cbse_01_005 worked examples on Madhav/Thakurda as foils in *The Post Office*.',
                  misconception: 'Students treat Ananda as a "love interest" or romantic lead because Prakriti desires him.' }
          ],
            remediations: { 'students-treat-ananda-as-a': { steps: ['Re-read Act I, Mother\'s lines: "Be warned, Prakriti, these men\'s words are meant only to be heard, not to.', 'Re-read Act II, Prakriti\'s mirror vision: "His face was mazed, his body slack...', 'only a blind and thoughtless compulsion." 3.', 'Complete this sentence frame: "Ananda\'s silence means ______." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_20_006', difficulty: 'standard',
          question: 'The primary theme of \'s devotion but from selfless love that respects the.',
          hint: 'If unable to trace the theme, re-read Act I\'s well scene (pp. 207-209) and Act II\'s.',
          misconception: 'Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with *Tagore\'s* thematic.',
          parts: [
                { id: 'a', prompt: 'What is the single catalytic event in Act I that triggers Prakriti\'s "new birth," and what exact words does Ananda speak that constitute this catalyst?', answer: 'The catalytic event is Ananda asking Prakriti for water at the well',
                  options: ['The catalytic event is Ananda asking Prakriti for water at the well', 'A wrong answer (e.g', 'Ananda teaches her Buddhism'],
                  hint: 'If unable to trace the theme, re-read Act I\'s well scene (pp. 207-209) and Act II\'s mirror visions.',
                  misconception: 'Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with *Tagore\'s* thematic transformation.' },
                { id: 'b', prompt: 'Explain in your own words why Prakriti\'s mother initially resists casting the spell on Ananda, and what this resistance reveals about the play\'s thematic.', answer: 'The mother resists',
                  options: ['The mother resists', 'mother loves daughter'],
                  hint: 'If unable to trace the theme, re-read Act I\'s well scene (pp. 207-209) and Act II\'s mirror visions.',
                  misconception: 'Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with *Tagore\'s* thematic transformation.' },
                { id: 'c', prompt: 'Apply the concept of "self-consciousness over-reaching its limit" (from Tagore\'s introduction) to explain the turning point in Act II when Prakriti looks into.', answer: 'The turning point occurs when Prakriti sees Ananda\'s face "worn, how faded',
                  options: ['The turning point occurs when Prakriti sees Ananda\'s face "worn, how faded', 'she sees him suffering', 'the tortured form I saw was not his only, but mine too'],
                  hint: 'If unable to trace the theme, re-read Act I\'s well scene (pp. 207-209) and Act II\'s mirror visions.',
                  misconception: 'Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with *Tagore\'s* thematic transformation.' },
                { id: 'd', prompt: 'Analyze how the play\'s structure — a single continuous action divided into two acts with a fifteen-day gap — serves the primary theme of consciousness evolving.', answer: 'The fifteen-day gap (Act I to Act II) is not mere elapsed time',
                  options: ['The fifteen-day gap (Act I to Act II) is not mere elapsed time', 'realistic time passage'],
                  hint: 'If unable to trace the theme, re-read Act I\'s well scene (pp. 207-209) and Act II\'s mirror visions.',
                  misconception: 'Students conflate the *legend\'s* plot (girl lusts after monk, uses magic, Buddha saves monk) with *Tagore\'s* thematic transformation.' }
          ],
            remediations: { 'students-conflate-the-legend-s': { steps: ['If the student cannot distinguish the legend from the play: Step 1 — Re-read the Introduction (NCERT pp.', '204-206) and highlight every phrase where Tagore contrasts "the popular tale" with "the psychological drama." Step 2.', 'Step 3 — Re-attempt Diagnostic Question 1 and 2.', 'Step 4 — If still stuck, revisit c12_eng_k_cbse_20_001 (Context and Background) for the Buddhist legend summary, then.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
