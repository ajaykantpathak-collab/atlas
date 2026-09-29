import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch20_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch20_p1: SimDef = {
    id: 'v3_c11_eng_w_ch20_p1',
    title: 'Ajamil and the Tigers (Poem) · Part 1/3',
    subtitle: 'Read a shepherd\'s treaty with tigers as Emergency-era satire.',
    classLevel: 11, subject: 'eng_w', topic: 'Ajamil and the Tigers (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch20'],
    nodeIds: ['c11_eng_w_cbse_20_001', 'c11_eng_w_cbse_20_002', 'c11_eng_w_cbse_20_003', 'c11_eng_w_cbse_20_004', 'c11_eng_w_cbse_20_005', 'c11_eng_w_cbse_20_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a leader shake paws with predators', intro: 'The tigers came for the sheep; the shepherd fed them lamb chops and called it diplomacy — and the pond got shared.', goal: 'Distinguish fable from satire and read the treaty as managed, not resolved, conflict.' },
    discovery: {
        question: 'Talking animals, rhyming ease, a shepherd and tigers — a children\'s fable with a tidy moral?',
        options: ['No — the fable form is a set-up: the shepherd collaborates with the tigers, making it a satire of political complicity', 'Yes — animal characters always mean a child\'s moral tale', 'Yes — the ending is a happy treaty, so the moral is trust', 'No — but only because of the leather jackets and swear words'],
        answer: 'No — the fable form is a set-up: the shepherd collaborates with the tigers, making it a satire of political complicity',
        hook: 'The tiger king lies \'we came as friends,\' Ajamil pretends to believe him — and both know the flock pays for the handshake.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Ajamil and the Tigers\' (Woven Words, ch. 20) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_20_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split fable, allegory and satire in the poem, spot the dramatic irony in the tiger king\'s lie, and judge whether the shared-pond ending resolves or merely manages the conflict.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Ajamil and the Tigers\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the primary difference between a fable and an allegory in literary terms?', options: [
                { text: 'A fable is a brief story, often with animal characters, that teaches a clear moral lesson', outcome: 'A fable is a brief story, often with animal characters, that teaches a clear moral lesson (e.g.' },
                { text: 'they are the same', outcome: 'Not quite — Students often believe that because the poem features talking animals and a simple narrative, it.', reveals: 'because-the-poem-features-talking' },
                { text: 'fables are longer', outcome: 'Not quite — Students often believe that because the poem features talking animals and a simple narrative, it.', reveals: 'because-the-poem-features-talking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Ajamil and the Tigers\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the two primary physical settings contrasted in the poem, and what time of day is associated with the tiger king\'s initial.', options: [
                { text: 'The two primary settings are the tigers\' wild territory (associated with "darkness before', outcome: 'The two primary settings are the tigers\' wild territory (associated with "darkness before the.' },
                { text: 'Alone / into the darkness before the dawn', outcome: 'Not quite — Students often treat setting as mere "where and when" and atmosphere as a single static mood (e.g.', reveals: 'students-often-treat-setting-as' },
                { text: 'both settings are the same pasture, or missing the pre-dawn timing', outcome: 'Not quite — Students often treat setting as mere "where and when" and atmosphere as a single static mood (e.g.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Ajamil and the Tigers\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the protagonist\'s name in "Ajamil and the Tigers," and what is his primary occupation as stated in the poem?', options: [
                { text: 'The protagonist is Ajamil, a shepherd', outcome: 'The protagonist is Ajamil, a shepherd. A wrong answer (e.g., naming the tiger king or sheepdog).' },
                { text: 'good shepherding', outcome: 'Not quite — Students often read Ajamil as a "practical leader making hard choices" because the poem\'s closing.', reveals: 'students-often-read-ajamil-as' },
                { text: 'the tiger king or sheepdog', outcome: 'Not quite — Students often read Ajamil as a "practical leader making hard choices" because the poem\'s closing.', reveals: 'students-often-read-ajamil-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Ajamil and the Tigers\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Name the four supporting characters in "Ajamil and the Tigers" and state the human institution or group each allegorically represents.', options: [
                { text: 'The four supporting characters are: (1) Tiger King', outcome: 'The four supporting characters are: (1) Tiger King — the political leader/dictator; (2) Queen Tiger.' },
                { text: 'or the Tiger People as', outcome: 'Not quite — Students often treat the Tiger King as a straightforward villain and the Sheep Dog as a mere animal.', reveals: 'students-often-treat-the-tiger' },
                { text: 'character', outcome: 'Not quite — Students often treat the Tiger King as a straightforward villain and the Sheep Dog as a mere animal.', reveals: 'students-often-treat-the-tiger' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Ajamil and the Tigers\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "Ajamil and the Tigers" in one sentence.', options: [
                { text: 'The primary theme is the betrayal of the governed by a leader who compromises with', outcome: 'The primary theme is the betrayal of the governed by a leader who compromises with oppressive.' },
                { text: 'It is about tigers and sheep learning to live together', outcome: 'Not quite — Students often treat the poem as a simple fable with a moral like "peace requires compromise".', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school magazine\'s satire issue you submit Kolatkar\'s \'Ajamil and the Tigers\'. The editor returns it: \'Talking animals, treaty over lamb chops — this is a children\'s fable. What\'s it doing in a satire issue?\'',
            decisions: [{ prompt: 'How do you defend the submission?', options: [
                { text: 'Argue that the poem hijacks the fable form to subvert it: written during the Emergency era and drawn from Jejuri, it\'s an allegory where the tiger king is the political class, Ajamil the shepherd is the complicit middle class, and the sheep are the common people. The \'happy ending\' is a corrupt bargain — the shepherd pretends to believe the tigers\' lie and peace is bought with \'gifts of sheep.\' The moral isn\'t a lesson; it\'s a cynical exposé.', outcome: 'The editor sees the weapon under the whimsy: fable surface, allegory underneath — the resolution is exploitation dressed as harmony.' },
                { text: 'Withdraw it — the editor\'s right that animal stories with treaties belong in children\'s pages.', outcome: 'The animal fable surface is the disguise, not the genre: coarse language, treaty politics, and sacrificed sheep mark it as adult satire of a political class.', reveals: 'talking-animals-is-childrens-fable' },
                { text: 'Resubmit it as a poem about wildlife conservation — tigers and sheep learning to share the pond.', outcome: 'The shared pond is a full stomach maintained by exploitation; reading it as harmony repeats Ajamil\'s own self-deception.', reveals: 'treaty-is-happy-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_006', title: 'The bigger picture',
          caseStudy: { intro: 'Well-fed tigers, fat sheep, a flute all day — the peace is real only as long as someone keeps paying for it in mutton.',
            decisions: [{ prompt: 'What comes next? Ajamil and the Tigers (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Ajamil and the Tigers (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_001', difficulty: 'standard',
          question: '\'Ajamil and the Tigers\' (Woven Words, ch. 20) — the context and background.',
          hint: 'If stuck, review the "TRY THIS OUT" box on textbook page 143 (difference between fable.',
          misconception: 'Students often believe that because the poem features talking animals and a simple narrative, it is a **fable for.',
          parts: [
                { id: 'a', prompt: 'Why is it significant that Arun Kolatkar wrote *Jejuri* in English rather than Marathi, his mother tongue, and that he was also a painter?', answer: 'Writing in English allowed Kolatkar to reach a global audience and use modernist',
                  options: ['Writing in English allowed Kolatkar to reach a global audience and use modernist', 'he knew English', 'don\'t trust predators'],
                  hint: 'If stuck, review the "TRY THIS OUT" box on textbook page 143 (difference between fable, allegory.',
                  misconception: 'Students often believe that because the poem features talking animals and a simple narrative, it is a **fable for children** with.' },
                { id: 'b', prompt: 'Identify which literary form—fable, allegory, or satire—is best described by this statement: "A story where a shepherd feeds tigers lamb chops to keep them.', answer: 'This is primarily **satire**',
                  options: ['This is primarily **satire**', 'mistakes the animal surface for the form', 'don\'t trust predators'],
                  hint: 'If stuck, review the "TRY THIS OUT" box on textbook page 143 (difference between fable, allegory.',
                  misconception: 'Students often believe that because the poem features talking animals and a simple narrative, it is a **fable for children** with.' },
                { id: 'c', prompt: 'The poem was published in 1976. How does the historical context of the Emergency (1975–77) in India deepen the meaning of the "friendship treaty" between.', answer: 'During the Emergency, democratic rights were suspended, censorship imposed, and',
                  options: ['During the Emergency, democratic rights were suspended, censorship imposed, and', 'don\'t trust predators'],
                  hint: 'If stuck, review the "TRY THIS OUT" box on textbook page 143 (difference between fable, allegory.',
                  misconception: 'Students often believe that because the poem features talking animals and a simple narrative, it is a **fable for children** with.' }
          ],
            remediations: { 'because-the-poem-features-talking': { steps: ['**Revisit definitions**: Have the student write side-by-side definitions of fable, allegory, and satire using a known.', '**Map the poem**: Ask them to list every animal/human in the poem and write what real-world group each represents.', '**Read the "TRY THIS OUT" box** in the textbook (page 143) and research the three terms.', '**Watch a 5-minute video** on the Emergency (1975–77) to grasp the fear and compromise that inform the poem\'s tone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because the poem features talking animals and a simple narrative, it is a **fable for.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Kolatkar uses animals only to make the poem accessible to children; the political meaning is accidental."', answer: 'The claim is false',
                  options: ['The claim is false', 'don\'t trust predators'],
                  hint: 'If stuck, review the "TRY THIS OUT" box on textbook page 143 (difference between fable, allegory.',
                  misconception: 'Students often believe that because the poem features talking animals and a simple narrative, it is a **fable for children** with.' }
          ],
            remediations: { 'because-the-poem-features-talking': { steps: ['**Revisit definitions**: Have the student write side-by-side definitions of fable, allegory, and satire using a known.', '**Map the poem**: Ask them to list every animal/human in the poem and write what real-world group each represents.', '**Read the "TRY THIS OUT" box** in the textbook (page 143) and research the three terms.', '**Watch a 5-minute video** on the Emergency (1975–77) to grasp the fear and compromise that inform the poem\'s tone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Ajamil and the Tigers\' — what happens, in what.',
          hint: 'If stuck, review c6_english_u1_006 (Narrative Poetry and Its Features) for.',
          misconception: 'Students often treat the poem as a simple animal story with a happy ending (tigers and sheep living together).',
          parts: [
                { id: 'a', prompt: 'Analyze how the narrative structure subverts the traditional fable structure. Compare the expected resolution of a fable with the actual resolution in the poem.', answer: 'Traditional fable: predator is defeated or reformed',
                  options: ['Traditional fable: predator is defeated or reformed', 'the tigers become friends'],
                  hint: 'If stuck, review c6_english_u1_006 (Narrative Poetry and Its Features) for stanza-by-stanza summary.',
                  misconception: 'Students often treat the poem as a simple animal story with a happy ending (tigers and sheep living together).' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Have the student list the concrete actions in the last 5 stanzas: tigers eat lamb chops, sign treaty, receive.', 'Ask: "Who provides the lamb chops, leather, and wool?" (The sheep).', 'Ask: "Is the shepherd protecting the sheep or managing the tigers?" 4.', 'Connect to the opening: the dog *stopped* tigers from eating sheep; the shepherd *allows* it via treaty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_003', difficulty: 'standard',
          question: 'The setting of \'Ajamil and the Tigers\' — the place, time and atmosphere the.',
          hint: 'Review "Identifying setting shifts in narrative poetry" from Class 9/10 (e.g.',
          misconception: 'Students often treat setting as mere "where and when" and atmosphere as a single static mood (e.g., "the poem.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Ajamil and the Tigers\'',
                  options: ['The setting of \'Ajamil and the Tigers\'', '\'Ajamil and the Tigers\' (Woven Words, ch', 'The plot/narrative arc of \'Ajamil and the Tigers\'', 'Character analysis in \'Ajamil and the Tigers\''],
                  hint: 'Review "Identifying setting shifts in narrative poetry" from Class 9/10 (e.g., c9_engl_ch7_5 desert.',
                  misconception: 'Students often treat setting as mere "where and when" and atmosphere as a single static mood (e.g., "the poem is tense").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot track setting/atmosphere shifts, have them draw a three-panel storyboard: Panel 1 — Tiger king.', 'Panel 2 — Battle in pasture (dog in "51 places").', 'Panel 3 — Banquet table (forks, knives, flute).', 'Then ask: "What changes in each panel?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_004', difficulty: 'standard',
          question: 'Character analysis in \'Ajamil and the Tigers\' — the central figure(s), their.',
          hint: 'Review c11_eng_w_cbse_20_001 (Context/Background) for the Jejuri allegory framework, then.',
          misconception: 'Students often read Ajamil as a "practical leader making hard choices" because the poem\'s closing lines ("He is free.',
          parts: [
                { id: 'a', prompt: 'What is the protagonist\'s name in "Ajamil and the Tigers," and what is his primary occupation as stated in the poem?', answer: 'The protagonist is Ajamil, a shepherd',
                  options: ['The protagonist is Ajamil, a shepherd', 'good shepherding', 'the tiger king or sheepdog'],
                  hint: 'Review c11_eng_w_cbse_20_001 (Context/Background) for the Jejuri allegory framework, then practice.',
                  misconception: 'Students often read Ajamil as a "practical leader making hard choices" because the poem\'s closing lines ("He is free to play a flute all.' },
                { id: 'b', prompt: 'Explain in your own words why Ajamil refuses to meet the sheepdog\'s eyes after the tigers are captured.', answer: 'Ajamil avoids the sheepdog\'s eyes',
                  options: ['Ajamil avoids the sheepdog\'s eyes', 'good shepherding'],
                  hint: 'Review c11_eng_w_cbse_20_001 (Context/Background) for the Jejuri allegory framework, then practice.',
                  misconception: 'Students often read Ajamil as a "practical leader making hard choices" because the poem\'s closing lines ("He is free to play a flute all.' },
                { id: 'c', prompt: 'Apply the allegorical framework (sheep = citizens, tigers = corrupt politicians, sheepdog = judiciary/law enforcement) to explain what Ajamil\'s signing of the.', answer: 'The treaty represents a politician legitimizing criminal elements through formal',
                  options: ['The treaty represents a politician legitimizing criminal elements through formal', 'good shepherding'],
                  hint: 'Review c11_eng_w_cbse_20_001 (Context/Background) for the Jejuri allegory framework, then practice.',
                  misconception: 'Students often read Ajamil as a "practical leader making hard choices" because the poem\'s closing lines ("He is free to play a flute all.' }
          ],
            remediations: { 'students-often-read-ajamil-as': { steps: ['Have the student list every verb associated with Ajamil: "refused," "pretended," "seemed," "cut," "asked," "proposed,".', 'Categorize each as active choice vs.', 'Ask: "Which verbs show he had power?', 'Which show he chose the tigers?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_005', difficulty: 'standard',
          question: 'Supporting characters in \'Ajamil and the Tigers\' — the secondary figures who.',
          hint: 'Review c11_eng_w_cbse_20_001 (Context and Background) for Kolatkar\'s Jejuri and the.',
          misconception: 'Students often treat the Tiger King as a straightforward villain and the Sheep Dog as a mere animal hero.',
          parts: [
                { id: 'a', prompt: 'Name the four supporting characters in "Ajamil and the Tigers" and state the human institution or group each allegorically represents.', answer: 'The four supporting characters are: (1) Tiger King',
                  options: ['The four supporting characters are: (1) Tiger King', 'or the Tiger People as', 'character', 'symbol'],
                  hint: 'Review c11_eng_w_cbse_20_001 (Context and Background) for Kolatkar\'s Jejuri and the tradition.',
                  misconception: 'Students often treat the Tiger King as a straightforward villain and the Sheep Dog as a mere animal hero.' }
          ],
            remediations: { 'students-often-treat-the-tiger': { steps: ['Have the student reread the "banquet" scene (Tiger King\'s return) and the "treaty" scene side by side.', 'Ask: "What does the King *do* vs.', 'what does he *say*?" Chart the discrepancies.', 'Then ask: "What does the Dog *do* vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_006', difficulty: 'standard',
          question: 'The primary theme of \'Ajamil and the Tigers\' — the central idea the whole text.',
          hint: 'Review the character analysis of Ajamil and the tiger king (nodes c11_eng_w_cbse_20_004.',
          misconception: 'Students often treat the poem as a simple fable with a moral like "peace requires compromise" or "cleverness wins.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'Ajamil and the Tigers\'',
                  options: ['The primary theme of \'Ajamil and the Tigers\'', '\'Ajamil and the Tigers\' (Woven Words, ch', 'The plot/narrative arc of \'Ajamil and the Tigers\'', 'The setting of \'Ajamil and the Tigers\''],
                  hint: 'Review the character analysis of Ajamil and the tiger king (nodes c11_eng_w_cbse_20_004 and.',
                  misconception: 'Students often treat the poem as a simple fable with a moral like "peace requires compromise" or "cleverness wins." They miss that Ajamil.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the three stanzas from the tiger king\'s return ("Nice dog you got there...") to the treaty signing.', 'Highlight every verb that shows Ajamil\'s *active* choice (cut them loose, asked them to stay, proposed, signed).', 'Draw a four-column table: Character | Literal Role | Allegorical Role | Key Action.', 'Fill it for Tiger King, Ajamil, Sheep Dog, Sheep.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
