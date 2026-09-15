import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p1',
    title: 'ckck lkgsc Hkhejko · Part 1/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'ckck lkgsc Hkhejko · Part 1/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_001', 'c12_hin_ar_cbse_13_002', 'c12_hin_ar_cbse_13_003', 'c12_hin_ar_cbse_13_004', 'c12_hin_ar_cbse_13_005', 'c12_hin_ar_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading section that provides essential information about the author\'s life, the historical and socio-cultural setting of the story, the literary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a period film set in a 1940s Indian village without any introduction — you would struggle with the dialects, customs, and power.',
            decisions: [{ prompt: 'Who is the author of "इग्योका की क्षयद" and what is his recognized contribution to Hindi literature?', options: [
                { text: 'The author is हज़ारी प्रसाद द्विवेदी (Hazari Prasad Dwivedi), born in 1921 in Ballia', outcome: 'The author is हज़ारी प्रसाद द्विवेदी (Hazari Prasad Dwivedi), born in 1921 in Ballia.' },
                { text: 'famous writer', outcome: 'Not quite — Students treat the "Before You Read" box as optional reading — something to skip or memorize dates.', reveals: 'students-treat-the-before-you' },
                { text: 'Premchand or guessing a generic "famous writer', outcome: 'Not quite — Students treat the "Before You Read" box as optional reading — something to skip or memorize dates.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing in that village square hearing the bell clang — "pV~&èkk, fxM+&èkk" — every hour, controlling when people eat, work, and sleep.',
            decisions: [{ prompt: 'What are the three main components of setting in a narrative, and which component is most prominently established in the opening paragraph.', options: [
                { text: 'The three main components are time (historical period, time of day), place (geographical', outcome: 'The three main components are time (historical period, time of day), place (geographical location.' },
                { text: 'village', outcome: 'Not quite — Students often think setting is only "where and when" and atmosphere is just "mood," treating them.', reveals: 'setting-is-only-where-and' },
                { text: 'where and when', outcome: 'Not quite — Students often think setting is only "where and when" and atmosphere is just "mood," treating them.', reveals: 'setting-is-only-where-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re watching a reality show where a talented singer from a small village auditions for a big competition — but the village elder says, "You belong.',
            decisions: [{ prompt: 'What is the protagonist\'s name in "इग्योकु की प्यास" and what is his primary occupation or identity as established in the opening.', options: [
                { text: 'The protagonist is Yug (युग), introduced as an "इग्योकु" (singer) whose voice captivates', outcome: 'The protagonist is Yug (युग), introduced as an "इग्योकु" (singer) whose voice captivates the.' },
                { text: 'the headman or a supporting character', outcome: 'Not quite — Students often equate "character analysis" with listing adjectives (brave, poor, talented) without.', reveals: 'students-often-equate-character-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a historical film about a freedom fighter — the hero\'s speeches inspire, but it\'s the village elder who hides him, the British officer.',
            decisions: [{ prompt: 'Name three supporting characters from "इग्योकु की ख्याद" and state one specific action each takes that directly affects the plot.', options: [
                { text: 'Correct answer: (1) पकीं लेग', outcome: 'Correct answer: (1) पकीं लेग — adopts इग्योकु, teaches him music, and ultimately sends him away.' },
                { text: 'helps the hero', outcome: 'Not quite — Students treat supporting characters as "minor characters" and write only one-sentence descriptions.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are at a village fair in Bihar and you see a folk singer (लोक गायक) performing with immense passion, but the crowd treats it as free entertainment.',
            decisions: [{ prompt: '**REMEMBER:** What is the definition of "primary theme" in literature, and how does it differ from "plot summary" and "moral of the story"?', options: [
                { text: '**Correct Answer:** The primary theme is the central, abstract idea or insight about', outcome: '**Correct Answer:** The primary theme is the central, abstract idea or insight about life/society.' },
                { text: 'Yashoda sings for the king, then the officer, then dies', outcome: 'Not quite — **Specific Error:** Students consistently write: *"The primary theme is the sad life of Yashoda.', reveals: 'specific-error-students-consistently-write' },
                { text: 'we must respect folk artists', outcome: 'Not quite — **Specific Error:** Students consistently write: *"The primary theme is the sad life of Yashoda.', reveals: 'specific-error-students-consistently-write' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'What comes next? ckck lkgsc Hkhejko · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — ckck lkgsc Hkhejko · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading section that.',
          hint: 'If stuck, review Class 11 Chapter 1 "नमक का दरोगा" Before You Read note.',
          misconception: 'Students treat the "Before You Read" box as optional reading — something to skip or memorize dates from.',
          parts: [
                { id: 'a', prompt: 'The context note contrasts "ज्क्त ल्कगच" (king\'s court) with "बफम;क" (the new order).', answer: 'The "king\'s court" represents traditional, personalistic legitimacy',
                  options: ['The "king\'s court" represents traditional, personalistic legitimacy', 'government'],
                  hint: 'If stuck, review Class 11 Chapter 1 "नमक का दरोगा" Before You Read note (c11_hin_ar_cbse_01_001).',
                  misconception: 'Students treat the "Before You Read" box as optional reading — something to skip or memorize dates from.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot articulate the context-themes link: 1.', 'Have them re-read only the first two paragraphs of the context note and underline every noun phrase denoting a social.', 'Ask: "Which of these roles still exist today?', 'Which have vanished?" — this connects past to present.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the sequence of events (plot) and the.',
          hint: 'If stuck, review Class 11 "Plot and Narrative Structure" node (c11_hin_ar_cbse_13_002).',
          misconception: 'Students often confuse \'plot\' (what happens) with \'narrative structure\' (how it is told).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refer to the sequence of events (plot) and the technique',
                  options: ['Plot and narrative structure refer to the sequence of events (plot) and the technique', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist is the systematic examination of the main'],
                  hint: 'If stuck, review Class 11 "Plot and Narrative Structure" node (c11_hin_ar_cbse_13_002) focusing.',
                  misconception: 'Students often confuse \'plot\' (what happens) with \'narrative structure\' (how it is told).' }
          ],
            remediations: { 'students-often-confuse-plot-what': { steps: ['If the student cannot distinguish plot from structure: 1) Have them draw a timeline of 10 key events (plot).', '2) On a second line, mark where the narrative \'pauses\', \'speeds up\', \'looks back\', or \'changes tone\' (structure).', '3) Ask: "Why does the author spend three paragraphs describing the old king\'s court *after* Yagyu is already.', '4) Re-attempt Diagnostic Q4 with this visual aid.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and.',
          misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.',
          parts: [
                { id: 'a', prompt: 'Identify two sensory details from the storm scene (when the bell tower is struck by lightning) and explain how each contributes to the atmosphere of that.', answer: 'Example: "vkd\'k esa rkjs ped jgs Fks" (visual',
                  options: ['Example: "vkd\'k esa rkjs ped jgs Fks" (visual', 'where and when'],
                  hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and practice.',
                  misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.' },
                { id: 'b', prompt: 'Compare the atmosphere of the village during the daily bell routine with the atmosphere after the bell stops ringing permanently.', answer: 'During the routine, the atmosphere is oppressive, mechanical, and fearful',
                  options: ['During the routine, the atmosphere is oppressive, mechanical, and fearful', 'where and when'],
                  hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and practice.',
                  misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.' }
          ],
            remediations: { 'setting-is-only-where-and': { steps: ['If the student cannot link setting details to atmosphere, do this: 1) Pick one setting element (e.g., the bell).', '2) Find three quotes about it (sound, appearance, effect on people).', '3) For each quote, complete the sentence: "This detail makes the reader feel ______ because ______." 4) Write.', 'This forces the connection between concrete detail and emotional effect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to set the climax during a violent storm. Is the storm merely a dramatic backdrop, or does it serve a deeper thematic purpose?', answer: 'The storm is not just backdrop',
                  options: ['The storm is not just backdrop', 'just weather for drama', 'where and when'],
                  hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and practice.',
                  misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.' }
          ],
            remediations: { 'setting-is-only-where-and': { steps: ['If the student cannot link setting details to atmosphere, do this: 1) Pick one setting element (e.g., the bell).', '2) Find three quotes about it (sound, appearance, effect on people).', '3) For each quote, complete the sentence: "This detail makes the reader feel ______ because ______." 4) Write.', 'This forces the connection between concrete detail and emotional effect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist is the systematic examination of the main.',
          hint: 'If stuck, review the plot summary in node c12_hin_ar_cbse_13_002 and the setting analysis.',
          misconception: 'Students often equate "character analysis" with listing adjectives (brave, poor, talented) without anchoring each trait.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist is the systematic examination of the main',
                  options: ['Character analysis of the protagonist is the systematic examination of the main', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events (plot) and the technique', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review the plot summary in node c12_hin_ar_cbse_13_002 and the setting analysis in node.',
                  misconception: 'Students often equate "character analysis" with listing adjectives (brave, poor, talented) without anchoring each trait in a specific.' }
          ],
            remediations: { 'students-often-equate-character-analysis': { steps: ['If a student cannot move beyond trait-listing: (1) Have them reread only the three pivotal scenes (temple singing.', 'Fill Column A together, then let them complete Column B.', '(3) Ask them to rewrite one weak adjective-based sentence into a PEEL paragraph (Point, Evidence, Explanation, Link.', 'Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_005', difficulty: 'standard',
          question: 'Supporting characters are figures in a narrative who are not the central.',
          hint: 'If unable to move beyond trait lists, revisit the "Character Function Table" method.',
          misconception: 'Students treat supporting characters as "minor characters" and write only one-sentence descriptions like "पकीं लेग.',
          parts: [
                { id: 'a', prompt: 'Name three supporting characters from "इग्योकु की ख्याद" and state one specific action each takes that directly affects the plot.', answer: 'Correct answer: (1) पकीं लेग',
                  options: ['Correct answer: (1) पकीं लेग', 'helps the hero'],
                  hint: 'If unable to move beyond trait lists, revisit the "Character Function Table" method taught.',
                  misconception: 'Students treat supporting characters as "minor characters" and write only one-sentence descriptions like "पकीं लेग is इग्योकु\'s teacher.".' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Re-read the story marking every scene where a non-य्कु character speaks or acts decisively.', 'For each such character, complete a 3-column table: Action/Dialogue | Immediate Plot Effect | Thematic Meaning.', 'Re-attempt Diagnostic Questions 2 and 4 using this table.', 'If still stuck, review c11_hin_ar_cbse_13_005 (Class 11 supporting character analysis) for the method of functional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is the central, unifying idea or message.',
          hint: 'If stuck, re-do the **Character-Function Map** from node 005: for each supporting.',
          misconception: '**Specific Error:** Students consistently write: *"The primary theme is the sad life of Yashoda / the struggle of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is the central, unifying idea or message that the',
                  options: ['The primary theme of a literary work is the central, unifying idea or message that the', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events (plot) and the technique', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, re-do the **Character-Function Map** from node 005: for each supporting character, write.',
                  misconception: '**Specific Error:** Students consistently write: *"The primary theme is the sad life of Yashoda / the struggle of a folk singer / the.' }
          ],
            remediations: { 'specific-error-students-consistently-write': { steps: ['**Targeted Remediation (4 steps):** 1.', '**Re-read only the dialogues of power figures** (king, officer, village youth) — highlight every word that reveals *how.', '**Create a 3-column table:** Column A = Power Figure, Column B = What they Take from Yashoda, Column C = What they.', '**Write one sentence** completing: "Renu shows that in India, whether king, officer, or market, power always _______.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
