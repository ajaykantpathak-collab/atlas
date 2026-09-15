import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch12_p1: SimDef = {
    id: 'v3_c10_engl_ch12_p1',
    title: 'The Midnight Visitor · Part 1/2',
    subtitle: 'Outwit an armed spy using nothing but a made-up balcony',
    classLevel: 10, subject: 'engl', topic: 'The Midnight Visitor · Part 1/2',
    chapters: ['c10_engl_ch12'],
    nodeIds: ['c10_engl_cbse_12_001', 'c10_engl_cbse_12_002', 'c10_engl_cbse_12_003', 'c10_engl_cbse_12_004', 'c10_engl_cbse_12_005', 'c10_engl_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a secret agent who looks nothing like one', intro: 'A young writer named Fowler followed you all evening expecting mystery and danger — and got a damp hotel room instead. Then the door opens, and there\'s a man with a gun. Time to become interesting.', goal: 'Show how calm thinking and convincing detail can overturn a physically hopeless situation.' },
    discovery: {
        question: 'Secret agent Ausable is fat, speaks with an American accent, and lives in a gloomy hotel room — nothing like a film spy. When rival agent Max bursts in with a pistol, Ausable wins without firing a shot or throwing a punch. How?',
        options: ['He invents a balcony outside the window so convincingly that Max steps backwards into thin air', 'He secretly signals the police through his telephone', 'He offers Max double the money to switch sides', 'He uses a hidden trapdoor installed by French intelligence'],
        answer: 'He invents a balcony outside the window so convincingly that Max steps backwards into thin air',
        hook: 'Ausable\'s weapon wasn\'t a gun — it was a believable lie told calmly. The story argues presence of mind beats physical strength and spy-movie glamour.',
    },
    teaching: [
        { title: 'Ausable: An Unconventional Secret Agent (Fat, American Accent)', text: 'Ausable is a secret agent who deliberately subverts the stereotypical image of a spy (suave, physically fit, multilingual, operating in exotic locations) by being overweight, speaking with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'You are an unimpressive-looking agent cornered by an armed intruder. Invent a detail so believable that your enemy defeats himself — while a knock at the door keeps raising the stakes.',
        labels: ['Ausable: An Unconventional Secret', 'Fowler: The Disillusioned Writer', 'Max: The Rival Agent', 'Ausable\'s Clever Lie', 'The Midnight Visitor', 'Theme: Wit and Presence'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_001', title: 'Ausable: An Unconventional Secret Agent (Fat, American Accent)',
          caseStudy: { intro: 'Think about every spy movie you\'ve seen — James Bond, Ethan Hunt, or even Indian agents in films like *Ek Tha Tiger*. What do they all have in common?',
            decisions: [{ prompt: 'List three specific physical or behavioural details from the text that make Ausable unlike a traditional fictional spy.', options: [
                { text: 'Correct answer: (1) He is described as "fat" and "sloppy" / "very fat." (2) He speaks', outcome: 'Correct answer: (1) He is described as "fat" and "sloppy" / "very fat." (2) He speaks French and.' },
                { text: 'He is lazy', outcome: 'Not quite — Students consistently write: "Ausable is a bad spy because he is fat and has an American accent.".', reveals: 'students-consistently-write-ausable-is' },
                { text: 'He carries a gun', outcome: 'Not quite — Students consistently write: "Ausable is a bad spy because he is fat and has an American accent.".', reveals: 'students-consistently-write-ausable-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_002', title: 'Fowler: The Disillusioned Writer Seeking Adventure',
          caseStudy: { intro: 'Imagine you\'re a Class 10 student who loves spy movies — fast cars, gadgets, handsome agents.',
            decisions: [{ prompt: 'What is Fowler\'s profession and why does he visit Ausable?', options: [
                { text: 'Fowler is a writer who visits Ausable to gather material for a story, expecting to see a', outcome: 'Fowler is a writer who visits Ausable to gather material for a story, expecting to see a romantic.' },
                { text: 'Fowler is a spy', outcome: 'Not quite — Students often think Fowler is a \'failed\' character because he does nothing heroic.', reveals: 'fowler-is-a-failed-character' },
                { text: 'Fowler visits for an interview', outcome: 'Not quite — Students often think Fowler is a \'failed\' character because he does nothing heroic.', reveals: 'fowler-is-a-failed-character' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_003', title: 'Max: The Rival Agent with a Pistol in Ausable\'s Room',
          caseStudy: { intro: 'Imagine you\'re watching a spy movie: the villain bursts in with a gun, certain he\'s won.',
            decisions: [{ prompt: 'What is Max\'s primary objective when he enters Ausable\'s room with a pistol?', options: [
                { text: 'Max aims to steal the important report about new missiles that Ausable is expecting to', outcome: 'Max aims to steal the important report about new missiles that Ausable is expecting to receive.' },
                { text: 'Max wants to kill Ausable', outcome: 'Not quite — Students often think Max is a "professional" agent because he has a gun and enters silently.', reveals: 'max-is-a-professional-agent' },
                { text: 'Max is there to arrest Ausable', outcome: 'Not quite — Students often think Max is a "professional" agent because he has a gun and enters silently.', reveals: 'max-is-a-professional-agent' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_004', title: 'Ausable\'s Clever Lie: The Non-Existent Balcony',
          caseStudy: { intro: 'Imagine you\'re playing a high-stakes bluffing game where one wrong move gets you eliminated — that\'s exactly Ausable\'s situation when Max points a gun at him.',
            decisions: [{ prompt: 'What specific complaint does Ausable claim to have made to the hotel management about the balcony before the events of the story?', options: [
                { text: 'Ausable claims he complained that the balcony was a "nuisance"', outcome: 'Ausable claims he complained that the balcony was a "nuisance" because people could climb into his.' },
                { text: 'he complained about the view', outcome: 'Not quite — Students believe Ausable\'s balcony lie succeeds because it is *factually detailed* (measurements.', reveals: 'ausable-s-balcony-lie-succeeds' },
                { text: 'he never mentioned it before', outcome: 'Not quite — Students believe Ausable\'s balcony lie succeeds because it is *factually detailed* (measurements.', reveals: 'ausable-s-balcony-lie-succeeds' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_005', title: 'The Midnight Visitor: The Knock on the Door and Max\'s Escape',
          caseStudy: { intro: 'Imagine you\'re watching a thriller movie where the villain has a gun pointed at the hero — what would make you believe the hero has a secret escape route?',
            decisions: [{ prompt: 'What is the immediate cause of Max\'s decision to jump out of the window in "The Midnight Visitor"?', options: [
                { text: 'The knock at the door', outcome: 'The knock at the door, which Ausable claims is the police arriving to check on him, causes Max.' },
                { text: 'Max sees the balcony', outcome: 'Not quite — Students often write that "Max dies because he is foolish" or "Ausable wins because he is smart.".', reveals: 'students-often-write-that-max' },
                { text: 'Ausable attacks Max', outcome: 'Not quite — Students often write that "Max dies because he is foolish" or "Ausable wins because he is smart.".', reveals: 'students-often-write-that-max' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_006', title: 'Theme: Wit and Presence of Mind Over Physical Strength',
          caseStudy: { intro: 'Imagine you are in a tense situation where someone threatens you with a weapon — your instinct might be to freeze or fight back physically.',
            decisions: [{ prompt: 'State the theme of *The Midnight Visitor* in one sentence using the exact phrasing expected in a CBSE board exam answer.', options: [
                { text: 'Correct answer: "The theme of *The Midnight Visitor* is that wit and presence of mind can', outcome: 'Correct answer: "The theme of *The Midnight Visitor* is that wit and presence of mind can triumph.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students believe the theme is "Ausable is lucky" because the waiter knocks at the perfect moment.', reveals: 'the-theme-is-ausable-is' },
                { text: 'Ausable is lucky', outcome: 'Not quite — Students believe the theme is "Ausable is lucky" because the waiter knocks at the perfect moment.', reveals: 'the-theme-is-ausable-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Casting a spy skit for the school function, the class picks the tallest, fittest boy for the agent role because \'a spy has to look like James Bond.\' The teacher quietly suggests the quick-witted boy with the ordinary face instead.',
            decisions: [{ prompt: 'What does \'The Midnight Visitor\' say the teacher knows?', options: [
                { text: 'That real cleverness wears no uniform — Ausable is fat, sloppy and accented, yet he survives a gunman purely by inventing a balcony and a knock at the door, talking Max into his own doom. A spy\'s weapon is presence of mind, not physique — the unremarkable-looking boy is the truer casting.', outcome: 'The story builds its whole joke on the gap between the romantic spy image and the real thing — Ausable wins because Max, like the class, trusted appearances.' },
                { text: 'The class is right — audiences need a spy who looks the part, and quick thinking cannot be acted anyway.', outcome: 'The entire play IS quick thinking — Ausable\'s escape is a dialogue performance of wit under pressure, which an actor of any build can carry off.', reveals: 'hero-must-look-heroic' },
                { text: 'Neither matters — a spy skit succeeds only if there are gadgets and fight scenes, not talking.', outcome: 'The story contains no gadgets or fights at all — its suspense comes entirely from words and a believable lie, which is what makes it dramatic.', reveals: 'drama-needs-action' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'Max brought a pistol; Ausable brought a story. The story won, because a lie believed is stronger than a weapon feared.',
            decisions: [{ prompt: 'What comes next? The Midnight Visitor · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Midnight Visitor · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_001', difficulty: 'standard',
          question: 'Ausable is a secret agent who deliberately subverts the stereotypical image.',
          hint: 'Review c9_engl_ch1_2 (Grandmother\'s character traits) and practice the "Quote ->.',
          misconception: 'Students consistently write: "Ausable is a bad spy because he is fat and has an American accent." This error stems from.',
          parts: [
                { id: 'a', prompt: 'Compare Ausable\'s physical description in the opening paragraph with Max\'s description when he appears later (node c10_engl_cbse_12_003).', answer: 'Correct answer: Ausable is fat, sloppy, American-accented, passive-looking',
                  options: ['Correct answer: Ausable is fat, sloppy, American-accented, passive-looking', 'feature spotting'],
                  hint: 'Review c9_engl_ch1_2 (Grandmother\'s character traits) and practice the "Quote -> Inference ->.',
                  misconception: 'Students consistently write: "Ausable is a bad spy because he is fat and has an American accent." This error stems from conflating.' }
          ],
            remediations: { 'students-consistently-write-ausable-is': { steps: ['Re-read the first two paragraphs aloud, highlighting every phrase that shows Fowler\'s *expectation* (e.g., "romantic.', 'Ausable\'s *reality* ("fat," "sloppy," "American accent").', 'Draw a two-column table: "Spy Stereotype (Fowler\'s mind)" vs.', '"Ausable (Textual Evidence)." Fill it with 5 rows.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write: "Ausable is a bad spy because he is fat and has an American accent." This error stems from.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Ausable\'s American accent is just a random detail; it doesn\'t affect the plot." Defend or refute using evidence from the story\'s.', answer: 'Correct answer: Refute',
                  options: ['Correct answer: Refute', 'author\'s craft'],
                  hint: 'Review c9_engl_ch1_2 (Grandmother\'s character traits) and practice the "Quote -> Inference ->.',
                  misconception: 'Students consistently write: "Ausable is a bad spy because he is fat and has an American accent." This error stems from conflating.' }
          ],
            remediations: { 'students-consistently-write-ausable-is': { steps: ['Re-read the first two paragraphs aloud, highlighting every phrase that shows Fowler\'s *expectation* (e.g., "romantic.', 'Ausable\'s *reality* ("fat," "sloppy," "American accent").', 'Draw a two-column table: "Spy Stereotype (Fowler\'s mind)" vs.', '"Ausable (Textual Evidence)." Fill it with 5 rows.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_002', difficulty: 'standard',
          question: 'Fowler is a young, romantic writer who visits the secret agent Ausable.',
          hint: 'Review "Character Analysis: Tenali Ramakrishna as a Witty Advisor" (c8_engl_ch1_2) for.',
          misconception: 'Students often think Fowler is a \'failed\' character because he does nothing heroic.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Fowler feels \'disillusioned\' when he first meets Ausable.', answer: 'Fowler feels disillusioned',
                  options: ['Fowler feels disillusioned', 'Ausable is fat', 'Fowler is a \'failed\' character'],
                  hint: 'Review "Character Analysis: Tenali Ramakrishna as a Witty Advisor" (c8_engl_ch1_2) for foil.',
                  misconception: 'Students often think Fowler is a \'failed\' character because he does nothing heroic.' },
                { id: 'b', prompt: 'Compare Fowler and Ausable as foils. How does Fowler\'s ordinariness make Ausable\'s cleverness more striking?', answer: 'Fowler is naive, fearful, and stereotypical',
                  options: ['Fowler is naive, fearful, and stereotypical', 'one is fat, one is thin', 'only lists differences (e', 'Fowler is a \'failed\' character'],
                  hint: 'Review "Character Analysis: Tenali Ramakrishna as a Witty Advisor" (c8_engl_ch1_2) for foil.',
                  misconception: 'Students often think Fowler is a \'failed\' character because he does nothing heroic.' }
          ],
            remediations: { 'fowler-is-a-failed-character': { steps: ['If a student holds this misconception, do: (1) Ask: "Who tells us the story?', 'Through whose eyes do we see Ausable?" (2) Have them list what Fowler *does*: he arrives, observes, reacts, narrates.', '(3) Show a two-column table: "Fowler\'s Expectation" vs.', '"Reality" — fill it together.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_003', difficulty: 'standard',
          question: 'Max is the antagonist in "The Midnight Visitor" — a rival secret agent who.',
          hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) for basic trait-evidence linking.',
          misconception: 'Students often think Max is a "professional" agent because he has a gun and enters silently.',
          parts: [
                { id: 'a', prompt: 'Why does Max believe there is a balcony outside Ausable\'s window? Explain using evidence from the text.', answer: 'Max believes the balcony exists',
                  options: ['Max believes the balcony exists', 'Max saw the balcony earlier', 'The text says there is a balcony', 'professional'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) for basic trait-evidence linking, then.',
                  misconception: 'Students often think Max is a "professional" agent because he has a gun and enters silently.' },
                { id: 'b', prompt: 'Apply the concept of "foil character" to Max and Ausable. Identify two contrasting traits and explain how Max\'s presence highlights Ausable\'s intelligence.', answer: 'Step 1: Identify Max\'s traits',
                  options: ['Step 1: Identify Max\'s traits', 'professional', 'Max is a "professional" agent'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) for basic trait-evidence linking, then.',
                  misconception: 'Students often think Max is a "professional" agent because he has a gun and enters silently.' }
          ],
            remediations: { 'max-is-a-professional-agent': { steps: ['If a student insists Max is competent: 1) Re-read the balcony scene aloud — ask "What does Max *verify* before stepping.', '2) Compare Max\'s dialogue (short, reactive) with Ausable\'s (detailed, proactive).', '3) Have the student list Max\'s assumptions vs.', 'reality in a two-column table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_004', difficulty: 'standard',
          question: 'A pivotal plot device in "The Midnight Visitor" where Ausable fabricates.',
          hint: 'If stuck, review c10_engl_cbse_12_003 (Max\'s characterization) and c8_engl_ch3_7.',
          misconception: 'Students believe Ausable\'s balcony lie succeeds because it is *factually detailed* (measurements, previous complaints.',
          parts: [
                { id: 'a', prompt: 'What specific complaint does Ausable claim to have made to the hotel management about the balcony before the events of the story?', answer: 'Ausable claims he complained that the balcony was a "nuisance"',
                  options: ['Ausable claims he complained that the balcony was a "nuisance"', 'he complained about the view', 'he never mentioned it before', 'is mentioned in Act 1 to be'],
                  hint: 'If stuck, review c10_engl_cbse_12_003 (Max\'s characterization) and c8_engl_ch3_7.',
                  misconception: 'Students believe Ausable\'s balcony lie succeeds because it is *factually detailed* (measurements, previous complaints, management.' }
          ],
            remediations: { 'ausable-s-balcony-lie-succeeds': { steps: ['Ask the student: "If you were Max, what would you have done *before* climbing out?" Guide them to: check the window.', 'Show the textual gap: Ausable *never describes the balcony floor* — only its location and history.', 'Connect to c10_engl_cbse_12_003 (Max\'s characterization): Max is established as impulsive ("automatic pistol,".', 'Have the student rewrite the scene with a cautious Max who survives — this proves the lie\'s dependency on character.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_005', difficulty: 'standard',
          question: 'The climax of "The Midnight Visitor" where a knock at the door triggers Max\'s.',
          hint: 'Review c10_engl_cbse_12_004 — specifically the exact wording of Ausable\'s balcony.',
          misconception: 'Students often write that "Max dies because he is foolish" or "Ausable wins because he is smart." The board exam.',
          parts: [
                { id: 'a', prompt: 'What is the immediate cause of Max\'s decision to jump out of the window in "The Midnight Visitor"?', answer: 'The knock at the door',
                  options: ['The knock at the door', 'Max sees the balcony', 'Ausable attacks Max'],
                  hint: 'Review c10_engl_cbse_12_004 — specifically the exact wording of Ausable\'s balcony description and.',
                  misconception: 'Students often write that "Max dies because he is foolish" or "Ausable wins because he is smart." The board exam requires *textual.' },
                { id: 'b', prompt: 'Explain in your own words why Max believes the balcony is real even though he has never seen it.', answer: 'Max believes the balcony exists',
                  options: ['Max believes the balcony exists', 'Max is stupid', 'The balcony was mentioned earlier'],
                  hint: 'Review c10_engl_cbse_12_004 — specifically the exact wording of Ausable\'s balcony description and.',
                  misconception: 'Students often write that "Max dies because he is foolish" or "Ausable wins because he is smart." The board exam requires *textual.' }
          ],
            remediations: { 'students-often-write-that-max': { steps: ['If a student gives the misconception above: (1) Have them reread the exact paragraph where the knock occurs and.', '(2) Ask: "Which of these words are lies?', 'Which are true?" (3) Have them rewrite the answer using the sentence frame: "Ausable says ______, which makes Max.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_006', difficulty: 'standard',
          question: 'The theme "Wit and Presence of Mind Over Physical Strength" refers to the.',
          hint: 'If stuck, review the balcony lie scene (c10_engl_cbse_12_004) and ask: "What specific.',
          misconception: 'Students believe the theme is "Ausable is lucky" because the waiter knocks at the perfect moment.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Ausable\'s physical description (fat, sloppy, American accent) is essential to the theme of wit over strength.', answer: 'Correct answer: Ausable\'s unimpressive appearance creates dramatic irony',
                  options: ['Correct answer: Ausable\'s unimpressive appearance creates dramatic irony', 'It shows he is not a typical spy', 'Ausable is lucky', 'the theme is "Ausable is lucky"'],
                  hint: 'If stuck, review the balcony lie scene (c10_engl_cbse_12_004) and ask: "What specific words does.',
                  misconception: 'Students believe the theme is "Ausable is lucky" because the waiter knocks at the perfect moment.' },
                { id: 'b', prompt: 'Apply the PEEL structure to write a 4-sentence answer proving that Ausable\'s invention of the balcony is an act of wit, not luck. Use one textual detail.', answer: 'Correct answer: Point: Ausable deliberately fabricates the balcony to trap Max',
                  options: ['Correct answer: Point: Ausable deliberately fabricates the balcony to trap Max', 'Explanation', 'Ausable is lucky', 'the theme is "Ausable is lucky"'],
                  hint: 'If stuck, review the balcony lie scene (c10_engl_cbse_12_004) and ask: "What specific words does.',
                  misconception: 'Students believe the theme is "Ausable is lucky" because the waiter knocks at the perfect moment.' }
          ],
            remediations: { 'the-theme-is-ausable-is': { steps: ['Re-read the scene where Ausable says, "I told the waiter to send up a bottle" — highlight it.', 'Draw a two-column table: Column A = Ausable\'s *planned* actions (ordering drinks, inventing balcony); Column B = Max\'s.', 'Verbally explain each row: "Because Ausable did X, Max did Y."', 'Rewrite the theme answer using one row as PEEL evidence. This forces the student to see wit as *agency*, not luck.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
