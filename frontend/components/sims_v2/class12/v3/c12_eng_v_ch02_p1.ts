import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch02_p1: SimDef = {
    id: 'v3_c12_eng_v_ch02_p1',
    title: 'The Tiger King · Part 1/3',
    subtitle: 'Ninety-nine tigers couldn\'t kill him — a wooden one did',
    classLevel: 12, subject: 'eng_v', topic: 'The Tiger King · Part 1/3',
    chapters: ['c12_eng_v_ch02'],
    nodeIds: ['c12_eng_v_cbse_02_001', 'c12_eng_v_cbse_02_002', 'c12_eng_v_cbse_02_003', 'c12_eng_v_cbse_02_004', 'c12_eng_v_cbse_02_005', 'c12_eng_v_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'A newborn growls \'Let tigers beware!\' A state reorganises itself around a prophecy. Satire at full pounce.', goal: 'Read The Tiger King as political satire on princely arrogance, colonial paramountcy and the delusion of mastering fate.' },
    discovery: {
        question: 'A Maharaja kills 99 real tigers to cheat a prophecy — and dies from a wooden toy tiger\'s splinter. Why does the smallest tiger win?',
        options: ['That\'s the satire\'s engine — power can command armies of death yet not a splinter; hubris is undone by the trivial thing it never deigned to fear', 'Luck — fate is random', 'The toy was actually alive', 'The astrologer lied'],
        answer: 'That\'s the satire\'s engine — power can command armies of death yet not a splinter; hubris is undone by the trivial thing it never deigned to fear',
        hook: 'The fable is double-barrelled satire: a prince who marries for tiger access mocks princely despotism, while a British officer\'s photo-op safaris skewer the Raj. The nonsense initials in his absurd title parody imperial honours — read the laughter as indictment.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section for "The Tiger King" provides essential historical, biographical, and literary framing to understand the story\'s satire.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the hunt and the hubris: unpack the talking-infant prophecy, weigh paramountcy\'s leash on the Maharaja, and trace how a splinter completes what ninety-nine tigers couldn\'t.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a period drama about a Maharaja who talks as a newborn and spends his life hunting tigers to cheat death.',
            decisions: [{ prompt: 'Who is the author of "The Tiger King" and what was his primary profession besides being a writer?', options: [
                { text: 'The author is Kalki, the pen name of R', outcome: 'The author is Kalki, the pen name of R. Krishnamurthy (1899–1954), a Tamil writer, journalist, and.' },
                { text: 'a British officer', outcome: 'Not quite — Students often think "The Tiger King" is a historical account of a real Maharaja or a simple folk.', reveals: 'the-tiger-king-is-a' },
                { text: 'The Tiger King', outcome: 'Not quite — Students often think "The Tiger King" is a historical account of a real Maharaja or a simple folk.', reveals: 'the-tiger-king-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re watching a period drama where the palace glitter hides absurdity — that\'s the world Kalki builds.',
            decisions: [{ prompt: 'Define the difference between "setting" and "atmosphere" in a literary text.', options: [
                { text: 'Setting is the where/when/who-context (Pratibandapuram, colonial era, royal court)', outcome: 'Setting is the where/when/who-context (Pratibandapuram, colonial era, royal court); atmosphere.' },
                { text: 'setting is the mood', outcome: 'Not quite — Students treat setting as a static backdrop — "the story happens in a palace and forests" — and.', reveals: 'students-treat-setting-as-a' },
                { text: 'conflates the two (e', outcome: 'Not quite — Students treat setting as a static backdrop — "the story happens in a palace and forests" — and.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine a leader so terrified of a prediction that he restructures his entire kingdom — banning hunting, bribing colonial officers, marrying for tiger access.',
            decisions: [{ prompt: 'What specific prophecy do the astrologers make about the ten-day-old prince Jung Jung Bahadur, and how does the infant respond?', options: [
                { text: 'The astrologers predict the prince will die', outcome: 'The astrologers predict the prince will die because he was born in the hour of the Bull, and the.' },
                { text: 'and then growls', outcome: 'Not quite — Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.', reveals: 'students-often-mistake-the-maharaja' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.', reveals: 'students-often-mistake-the-maharaja' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re a student who stays up all night "cheating fate" by memorizing only the predicted exam questions, but the paper comes from a completely.',
            decisions: [{ prompt: 'What is the central prophecy made about the Tiger King at his birth, and how does it drive the plot?', options: [
                { text: 'The chief astrologer predicts the prince will die by a tiger', outcome: 'The chief astrologer predicts the prince will die by a tiger because he was born in the hour of the.' },
                { text: 'the prophecy was about a war', outcome: 'Not quite — **Students often think the theme is "killing animals is wrong" or "the Maharaja got what.', reveals: 'students-often-think-the-theme' },
                { text: 'he killed tigers for sport', outcome: 'Not quite — **Students often think the theme is "killing animals is wrong" or "the Maharaja got what.', reveals: 'students-often-think-the-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior\'s horoscope once \'warned\' he\'d fail at his hundredth venture, so he\'s obsessively raced through 99 small projects and is now engineering the hundredth to be bulletproof — while ignoring a trivial, silly flaw in it.',
            decisions: [{ prompt: 'What does \'The Tiger King\' suggest here?', options: [
                { text: 'Watch for the wooden tiger — the Maharaja survives 99 real tigers but is killed by a sliver from a toy; obsession with defeating a prophecy blinds you to the absurd, insignificant thing that actually fulfils it.', outcome: 'The story\'s situational irony is that the prophecy arrives disguised as a birthday gift; treating the threat as a tiger-shaped contest is exactly the blindness that gets the Maharaja.' },
                { text: 'Help him make project number hundred genuinely flawless so the prediction can\'t bite.', outcome: 'That\'s the Maharaja\'s own logic — hunting the 100th tiger harder; the dewan\'s planted, half-dead tiger already shows the real danger isn\'t the one you\'re staging.', reveals: 'perfect-the-hundredth' },
                { text: 'Tell him prophecies are nonsense, so project hundred carries no special risk at all.', outcome: 'The story doesn\'t disprove the prophecy — it fulfils it through the least respected object in the tale; dismissing the warning entirely misses that anxiety about the wrong target is itself the hazard.', reveals: 'prophecy-is-nonsense' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read absurdity as critique — Kalki\'s laughing fable about power, prophecy and the splinter that topples kings.',
            decisions: [{ prompt: 'What comes next? The Tiger King · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Tiger King · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section for "The Tiger King".',
          hint: 'If unclear on "princely states vs British India," review Class 12 History Chapter "The.',
          misconception: 'Students often think "The Tiger King" is a historical account of a real Maharaja or a simple folk tale about hunting.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "The Tiger King" and what was his primary profession besides being a writer?', answer: 'The author is Kalki, the pen name of R',
                  options: ['The author is Kalki, the pen name of R', 'a British officer', 'The Tiger King'],
                  hint: 'If unclear on "princely states vs British India," review Class 12 History Chapter "The Making.',
                  misconception: 'Students often think "The Tiger King" is a historical account of a real Maharaja or a simple folk tale about hunting.' },
                { id: 'b', prompt: 'Analyse why Kalki chooses a *talking newborn* as the narrative device to introduce the astrologer\'s prediction, rather than a straightforward narration.', answer: 'The talking infant establishes the story\'s fable-like, absurd tone immediately',
                  options: ['The talking infant establishes the story\'s fable-like, absurd tone immediately', 'The Tiger King'],
                  hint: 'If unclear on "princely states vs British India," review Class 12 History Chapter "The Making.',
                  misconception: 'Students often think "The Tiger King" is a historical account of a real Maharaja or a simple folk tale about hunting.' }
          ],
            remediations: { 'the-tiger-king-is-a': { steps: ['If the student conflates satire with history/folk tale: (1) Re-read the "Before You Read" box question — discuss how.', '(2) Compare the Maharaja\'s fake titles with real British honours (KCIE, GCSI) — ask: "Why would Kalki invent ridiculous.', '(4) Re-attempt Diagnostic Question 5 — if still stuck, revisit Class 11 Snapshots Chapter 1 "The Summer of the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the organized sequence of events (plot).',
          hint: 'If stuck, review "story vs. discourse" using c11_eng_h_cbse_01_002 (The Portrait of.',
          misconception: 'Students often treat the Maharaja\'s marriage as a romantic subplot rather than a structural device.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refer to the organized sequence of events (plot) and the',
                  options: ['Plot and narrative structure refer to the organized sequence of events (plot) and the', 'The "Before You Read: Context and Background" section for "The Tiger King" provides', 'Setting refers to the time, place, and social-historical context in', 'Character analysis of the protagonist involves examining the main character\'s personality'],
                  hint: 'If stuck, review "story vs. discourse" using c11_eng_h_cbse_01_002 (The Portrait of a Lady) where.',
                  misconception: 'Students often treat the Maharaja\'s marriage as a romantic subplot rather than a structural device.' }
          ],
            remediations: { 'students-often-treat-the-maharaja': { steps: ['If a student cannot distinguish chronological vs.', 'narrative order, have them create a two-column timeline: Column A = events in story-world time (birth → death); Column.', 'Then ask: "Why does the narrator show you the end first?" Guide them to see that the frame narrator controls the.', 'Re-test with Diagnostic Question 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social-historical context in which.',
          hint: 'Review "identifying sensory details that create mood" from Class 11 Hornbill/Snapshots.',
          misconception: 'Students treat setting as a static backdrop — "the story happens in a palace and forests" — and atmosphere as a single.',
          parts: [
                { id: 'a', prompt: 'The story opens with a ten-day-old infant speaking in complete sentences and questioning astrologers.', answer: 'The speaking infant immediately signals a fable/folktale atmosphere',
                  options: ['The speaking infant immediately signals a fable/folktale atmosphere', 'magic realism'],
                  hint: 'Review "identifying sensory details that create mood" from Class 11 Hornbill/Snapshots setting.',
                  misconception: 'Students treat setting as a static backdrop — "the story happens in a palace and forests" — and atmosphere as a single label — "it\'s.' },
                { id: 'b', prompt: 'In Section III, the Maharaja bans tiger hunting by anyone except himself and threatens confiscation of property for "fling[ing] so much as a stone at a tiger.".', answer: 'Physical: "innumerable forests in the Pratibandapuram State"',
                  options: ['Physical: "innumerable forests in the Pratibandapuram State"', 'forest', 'palace'],
                  hint: 'Review "identifying sensory details that create mood" from Class 11 Hornbill/Snapshots setting.',
                  misconception: 'Students treat setting as a static backdrop — "the story happens in a palace and forests" — and atmosphere as a single label — "it\'s.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['If the student cannot separate setting layers or link them to atmosphere shifts: (1) Have them re-read Section I and.', '(2) Give them a 3-column table: Setting Detail | Sensory/Descriptive Language | Atmosphere Created.', '(3) Practice with a micro-passage: "The dewan drove the car straight to the forest where the Maharaja was hunting.', 'When they reached the forest the tiger launched its satyagraha and refused to get out of the car." Ask: What setting.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the main character\'s.',
          hint: 'If stuck, re-do the STEAL chart for the Maharaja using only the first five paragraphs.',
          misconception: 'Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.',
          parts: [
                { id: 'a', prompt: 'What specific prophecy do the astrologers make about the ten-day-old prince Jung Jung Bahadur, and how does the infant respond?', answer: 'The astrologers predict the prince will die',
                  options: ['The astrologers predict the prince will die', 'and then growls', 'A wrong answer (e.g', 'the astrologers predicted death by lion'],
                  hint: 'If stuck, re-do the STEAL chart for the Maharaja using only the first five paragraphs of the story.',
                  misconception: 'Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.' },
                { id: 'b', prompt: 'Why does the Maharaja ban tiger hunting by everyone except himself, and what does this reveal about his understanding of "self-defence"?', answer: 'He bans others to monopolize tiger kills for his tally of 100',
                  options: ['He bans others to monopolize tiger kills for his tally of 100', 'to protect tigers', 'because he loved hunting'],
                  hint: 'If stuck, re-do the STEAL chart for the Maharaja using only the first five paragraphs of the story.',
                  misconception: 'Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.' },
                { id: 'c', prompt: 'Apply the "STEAL" characterization method (Speech, Thoughts, Effect on others, Actions, Looks) to the Maharaja\'s interaction with the British officer\'s.', answer: 'Steps: (1) Speech: He refuses the officer\'s request firmly ("tiger hunt!',
                  options: ['Steps: (1) Speech: He refuses the officer\'s request firmly ("tiger hunt!', 'he was brave'],
                  hint: 'If stuck, re-do the STEAL chart for the Maharaja using only the first five paragraphs of the story.',
                  misconception: 'Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.' }
          ],
            remediations: { 'students-often-mistake-the-maharaja': { steps: ['If a student cannot distinguish performative bravado from true courage: (1) Re-read the three instances where "the.', 'the tiger leapt upon him and he fought the beast with his bare hands." (2) Ask: "Does he hunt bare-handed by choice?', 'What does he do immediately after?', '(He continues shooting.)" (3) Contrast with the wooden tiger scene — he doesn\'t fight the sliver; he pulls it out and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.',
          parts: [
                { id: 'a', prompt: 'Evaluate: Is the Maharaja a tragic hero whose flaw (hubris) leads to his downfall, or a purely satirical figure constructed to mock authoritarianism?', answer: 'He is a satirical figure, not a tragic hero',
                  options: ['He is a satirical figure, not a tragic hero', 'tragic', 'he tried hard'],
                  hint: 'If stuck, re-do the STEAL chart for the Maharaja using only the first five paragraphs of the story.',
                  misconception: 'Students often mistake the Maharaja\'s bare-handed tiger fights as evidence of genuine bravery.' }
          ],
            remediations: { 'students-often-mistake-the-maharaja': { steps: ['If a student cannot distinguish performative bravado from true courage: (1) Re-read the three instances where "the.', 'the tiger leapt upon him and he fought the beast with his bare hands." (2) Ask: "Does he hunt bare-handed by choice?', 'What does he do immediately after?', '(He continues shooting.)" (3) Contrast with the wooden tiger scene — he doesn\'t fight the sliver; he pulls it out and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'If stuck, revisit the "Character Analysis: Supporting Characters" node from Class 11.',
          misconception: 'Students often treat supporting characters as mere "helpers" or "obstacles" to the protagonist\'s goal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining the traits, motivations,',
                  options: ['Character analysis of supporting characters involves examining the traits, motivations,', 'The "Before You Read: Context and Background" section for "The Tiger King" provides', 'Plot and narrative structure refer to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'If stuck, revisit the "Character Analysis: Supporting Characters" node from Class 11 Hornbill.',
                  misconception: 'Students often treat supporting characters as mere "helpers" or "obstacles" to the protagonist\'s goal.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Re-read the text marking every scene where a supporting character speaks or acts without the Maharaja present (e.g.', 'For each, write: "This character represents ______ because ______." 3.', 'Watch a 10-minute video on "Satire in The Tiger King" (search "Kalki Tiger King satire supporting characters").', 'Re-attempt Diagnostic Question 4 — if you can link the hunters and shopkeeper through "fear-driven deceit", you\'ve.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of "The Tiger King" is the **futility of human arrogance.',
          hint: 'If unable to separate plot from theme, revisit c12_eng_v_cbse_02_002 and list 5 major.',
          misconception: '**Students often think the theme is "killing animals is wrong" or "the Maharaja got what he deserved for hunting."**.',
          parts: [
                { id: 'a', prompt: 'What is the central prophecy made about the Tiger King at his birth, and how does it drive the plot?', answer: 'The chief astrologer predicts the prince will die by a tiger',
                  options: ['The chief astrologer predicts the prince will die by a tiger', 'the prophecy was about a war', 'he killed tigers for sport', 'killing animals is wrong'],
                  hint: 'If unable to separate plot from theme, revisit c12_eng_v_cbse_02_002 and list 5 major events; then.',
                  misconception: '**Students often think the theme is "killing animals is wrong" or "the Maharaja got what he deserved for hunting."** This misses the.' },
                { id: 'b', prompt: 'Apply the concept of dramatic irony: The reader knows the Maharaja\'s 100th tiger is a frail zoo animal, but the Maharaja believes he has killed it.', answer: 'Dramatic irony here exposes the **hollowness of the Maharaja\'s power**',
                  options: ['Dramatic irony here exposes the **hollowness of the Maharaja\'s power**', 'he missed the shot', 'killing animals is wrong', 'the Maharaja got what he deserved for hunting'],
                  hint: 'If unable to separate plot from theme, revisit c12_eng_v_cbse_02_002 and list 5 major events; then.',
                  misconception: '**Students often think the theme is "killing animals is wrong" or "the Maharaja got what he deserved for hunting."** This misses the.' },
                { id: 'c', prompt: 'Analyze the shift in the Maharaja\'s attitude toward tigers from the beginning (growling "Let tigers beware!") to the end (playing with a wooden tiger).', answer: 'Initially, tigers are *enemies* to be slaughtered for survival',
                  options: ['Initially, tigers are *enemies* to be slaughtered for survival', 'he became careless', 'killing animals is wrong', 'the Maharaja got what he deserved for hunting'],
                  hint: 'If unable to separate plot from theme, revisit c12_eng_v_cbse_02_002 and list 5 major events; then.',
                  misconception: '**Students often think the theme is "killing animals is wrong" or "the Maharaja got what he deserved for hunting."** This misses the.' }
          ],
            remediations: { 'students-often-think-the-theme': { steps: ['Re-read the **last 3 paragraphs** (from "A few days later the Maharaja\'s son\'s third birthday...").', 'Make a T-chart: **Left column** = Maharaja\'s actions to avoid death (kill 99 tigers, marry for tigers, ban hunting.', '**Right column** = Actual outcome (tigers extinct, dewan tricks him, he misses, wooden tiger kills him).', 'Ask: "Which column \'wins\'?" The right column — *every* action in the left column either fails or backfires.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
