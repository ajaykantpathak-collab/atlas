import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch18_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch18_p2: SimDef = {
    id: 'v3_c10_engl_ch18_p2',
    title: 'The Book That Saved the Earth · Part 2/2',
    subtitle: 'Repel a Martian invasion with nothing but nursery rhymes',
    classLevel: 10, subject: 'engl', topic: 'The Book That Saved the Earth · Part 2/2',
    chapters: ['c10_engl_ch18'],
    nodeIds: ['c10_engl_cbse_18_007', 'c10_engl_cbse_18_008', 'c10_engl_cbse_18_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Martian fleet commander decoding Earth\'s secrets', intro: 'The year is 2040. Your fleet lands at a strange Earth building called a \'library\' — a warehouse of primitive \'books.\' Somewhere in those paper rectangles must be the secret of this planet\'s power.', goal: 'See how satire uses dramatic irony: the \'backward\' humans win because the \'advanced\' invaders cannot read without arrogance.' },
    discovery: {
        question: 'In 2040, Martian invaders land on Earth to conquer it — but flee in terror after \'decoding\' a book of nursery rhymes, convinced that Earthlings have explosive weapons and interstellar reach. How did a children\'s book defeat an invasion?',
        options: ['The Martians misread rhymes as military intelligence — \'Humpty Dumpty\' proved Earth\'s violent power', 'The rhymes contained a hidden code planted by Earth\'s scientists', 'The book emitted radiation that poisoned the Martian fleet', 'The Historian hypnotised the invaders through the museum display'],
        answer: 'The Martians misread rhymes as military intelligence — \'Humpty Dumpty\' proved Earth\'s violent power',
        hook: 'The Martians were defeated by their own arrogance: they \'translated\' Mother Goose into a weapons manual. A book only \'saves the Earth\' because the invaders couldn\'t imagine being wrong.',
    },
    teaching: [
        { title: 'Theme: The Power of Books and the Absurdity of Misunderstanding', text: 'The theme "The Power of Books and the Absurdity of Misunderstanding" refers to the central idea that books (and by extension, knowledge and culture) can have unexpected power to influence events.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_18_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Command a Martian space fleet invading a library, assign \'experts\' to decode a mysterious Earth book — and watch your mighty armada retreat before Mother Goose.',
        labels: ['Theme: The Power', 'Drama as a Genre', 'Irony and Humour'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_007', title: 'Theme: The Power of Books and the Absurdity of Misunderstanding',
          caseStudy: { intro: 'Imagine you are a Martian who has never seen a children\'s book.',
            decisions: [{ prompt: 'What is the central theme of the play "The Book That Saved the Earth" as reflected in the title?', options: [
                { text: 'The central theme is the power of books (specifically a book of nursery rhymes) to', outcome: 'The central theme is the power of books (specifically a book of nursery rhymes) to inadvertently.' },
                { text: 'books are powerful', outcome: 'Not quite — Students often think the theme is simply "books are powerful" or "misunderstandings are funny." The.', reveals: 'the-theme-is-simply-books' },
                { text: 'misunderstanding is funny', outcome: 'Not quite — Students often think the theme is simply "books are powerful" or "misunderstandings are funny." The.', reveals: 'the-theme-is-simply-books' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_008', title: 'Drama as a Genre: Stage Directions, Dialogue and Character Roles',
          caseStudy: { intro: 'Imagine you are watching a scene from *The Book That Saved the Earth* where Think‑Tank holds a book upside down and declares it a "communication sandwich." You.',
            decisions: [{ prompt: 'What is the primary function of stage directions in a play script?', options: [
                { text: 'Stage directions instruct actors and directors on physical actions, movements, facial', outcome: 'Stage directions instruct actors and directors on physical actions, movements, facial expressions.' },
                { text: 'Stage directions are the lines spoken by characters', outcome: 'Not quite — Students often treat stage directions as "extra description" and only quote dialogue in answers.', reveals: 'students-often-treat-stage-directions' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_009', title: 'Irony and Humour: A Comic Play About the Power of Literature',
          caseStudy: { intro: 'Imagine watching a horror movie where the character opens a door you know hides a kitten, but the character thinks it\'s a monster — that tension is dramatic.',
            decisions: [{ prompt: 'Define dramatic irony and give one example from "The Book That Saved the Earth" where the audience knows more than Think-Tank.', options: [
                { text: 'Dramatic irony occurs when the audience possesses knowledge that a character lacks,', outcome: 'Dramatic irony occurs when the audience possesses knowledge that a character lacks, creating.' },
                { text: 'Think-Tank is funny', outcome: 'Not quite — Students often think "irony" just means "funny coincidence" or "sarcasm." In board exams, they.', reveals: 'irony-just-means-funny-coincidence' },
                { text: 'just means', outcome: 'Not quite — Students often think "irony" just means "funny coincidence" or "sarcasm." In board exams, they.', reveals: 'irony-just-means-funny-coincidence' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate skims a poem for two minutes, then announces to the class that it\'s obviously a coded protest anthem — \'the poem mentions a river, and rivers always mean rebellion.\' He is completely confident and completely wrong.',
            decisions: [{ prompt: 'Which character from \'The Book That Saved the Earth\' is he imitating, and what is the lesson?', options: [
                { text: 'He is doing a Think-Tank — the Martian commander who confidently \'decoded\' a book of nursery rhymes as military secrets and surrendered to Earth over \'Humpty Dumpty.\' The play satirises exactly this: arrogant misreading, where supreme confidence replaces actual understanding, and the reader\'s ego, not the text, supplies the meaning.', outcome: 'The comedy works because Think-Tank never doubts himself — and the classmate\'s confident nonsense about rivers shows the same error the play skewers.' },
                { text: 'His confident reading is fine — a poem means whatever the reader first thinks it means, so he cannot be wrong.', outcome: 'Think-Tank is a warning against precisely this — his confident misreading of \'Mistress Mary\' as explosives nearly caused a war; interpretation has to answer to the text.', reveals: 'any-reading-is-valid' },
                { text: 'He is right that nursery rhymes and poems are too trivial to matter — only the Martians were foolish enough to take a book seriously.', outcome: 'The joke cuts the other way — the \'trivial\' book saved an entire planet; the play insists the written word is more powerful than invading fleets.', reveals: 'books-are-trivial' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_009', title: 'You made it',
          caseStudy: { intro: 'The invasion failed not with a bang but with a nursery rhyme. Superior technology lost to a superior imagination — Earth\'s, and the playwright\'s.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_007', difficulty: 'standard',
          question: 'The theme "The Power of Books and the Absurdity of Misunderstanding" refers.',
          hint: 'If stuck, review the table of nursery rhymes vs. Martian interpretations in node.',
          misconception: 'Students often think the theme is simply "books are powerful" or "misunderstandings are funny." The specific error.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Martians\' misunderstanding of the nursery rhymes is considered "absurd" rather than just a simple mistake.', answer: 'The misunderstanding is absurd',
                  options: ['The misunderstanding is absurd', 'they didn\'t know English well', 'they were stupid', 'books are powerful'],
                  hint: 'If stuck, review the table of nursery rhymes vs. Martian interpretations in node.',
                  misconception: 'Students often think the theme is simply "books are powerful" or "misunderstandings are funny." The specific error is missing the ironic.' }
          ],
            remediations: { 'the-theme-is-simply-books': { steps: ['If a student shows this misconception, do the following: 1.', 'Ask them to list the three nursery rhymes and the Martians\' interpretations side by side with the actual meaning.', 'Have them answer: "Did the book intend to threaten the Martians?" (No.) 3.', 'Then ask: "So what actually saved Earth?" (The Martians\' own flawed thinking.) 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the theme is simply "books are powerful" or "misunderstandings are funny." The specific error.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The play suggests that books are dangerous because they can be misunderstood." Do you agree or disagree?', answer: 'Disagree',
                  options: ['Disagree', 'books are powerful', 'misunderstandings are funny', 'the theme is simply "books are powerful" or "misunderstandings are funny'],
                  hint: 'If stuck, review the table of nursery rhymes vs. Martian interpretations in node.',
                  misconception: 'Students often think the theme is simply "books are powerful" or "misunderstandings are funny." The specific error is missing the ironic.' }
          ],
            remediations: { 'the-theme-is-simply-books': { steps: ['If a student shows this misconception, do the following: 1.', 'Ask them to list the three nursery rhymes and the Martians\' interpretations side by side with the actual meaning.', 'Have them answer: "Did the book intend to threaten the Martians?" (No.) 3.', 'Then ask: "So what actually saved Earth?" (The Martians\' own flawed thinking.) 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_008', difficulty: 'standard',
          question: 'Drama as a genre is a literary work written for performance, where the story.',
          hint: 'Review the script layout of *The Book That Saved the Earth* (or any Class 9 play) and.',
          misconception: 'Students often treat stage directions as "extra description" and only quote dialogue in answers.',
          parts: [
                { id: 'a', prompt: 'In *The Book That Saved the Earth*, the stage direction "[Think‑Tank holds the book upside down, peers at it]" appears.', answer: 'The direction visually demonstrates Think‑Tank\'s ignorance and arrogance: he',
                  options: ['The direction visually demonstrates Think‑Tank\'s ignorance and arrogance: he', 'It shows he is reading carefully', 'analyse'],
                  hint: 'Review the script layout of *The Book That Saved the Earth* (or any Class 9 play) and practice.',
                  misconception: 'Students often treat stage directions as "extra description" and only quote dialogue in answers.' },
                { id: 'b', prompt: 'Compare how stage directions and dialogue *together* establish the comic tone in the scene where the Martians mistake nursery rhymes for Earth\'s defence codes.', answer: 'Stage direction: "[Omega and Iota turn pages with exaggerated care]" shows mock',
                  options: ['Stage direction: "[Omega and Iota turn pages with exaggerated care]" shows mock', 'analyse'],
                  hint: 'Review the script layout of *The Book That Saved the Earth* (or any Class 9 play) and practice.',
                  misconception: 'Students often treat stage directions as "extra description" and only quote dialogue in answers.' }
          ],
            remediations: { 'students-often-treat-stage-directions': { steps: ['Give the student a one‑page excerpt from the play with all stage directions highlighted in yellow and dialogue in pink.', 'Ask them to read only the highlighted stage directions aloud and act them out (e.g., "hold book upside down," "wave.', 'Have them match each action to the dialogue that follows and state the character trait revealed (e.g., "upside‑down.', 'Finally, ask them to rewrite a previous answer inserting one stage‑direction reference using the PEEL structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality, where the.',
          hint: 'Review c10_engl_cbse_18_008 (Drama as a Genre) for dialogue/stage direction analysis, and.',
          misconception: 'Students often think "irony" just means "funny coincidence" or "sarcasm." In board exams, they write "It\'s ironic that.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the ending — where a Mother Goose book causes the Martians to flee — is an example of situational irony.', answer: 'Situational irony happens when the outcome is the opposite of what is expected',
                  options: ['Situational irony happens when the outcome is the opposite of what is expected', 'It\'s ironic because books are for reading', 'just means', 'sarcasm'],
                  hint: 'Review c10_engl_cbse_18_008 (Drama as a Genre) for dialogue/stage direction analysis, and.',
                  misconception: 'Students often think "irony" just means "funny coincidence" or "sarcasm." In board exams, they write "It\'s ironic that Think-Tank is dumb".' },
                { id: 'b', prompt: 'Compare the humour in Think-Tank\'s misreading of "The cow jumped over the moon" with the humour in Noodle\'s quiet corrections.', answer: 'Think-Tank\'s humour is loud, arrogant, and absurd',
                  options: ['Think-Tank\'s humour is loud, arrogant, and absurd', 'just means', 'sarcasm', 'It\'s ironic that Think-Tank is dumb'],
                  hint: 'Review c10_engl_cbse_18_008 (Drama as a Genre) for dialogue/stage direction analysis, and.',
                  misconception: 'Students often think "irony" just means "funny coincidence" or "sarcasm." In board exams, they write "It\'s ironic that Think-Tank is dumb".' }
          ],
            remediations: { 'irony-just-means-funny-coincidence': { steps: ['Have the student create a three-column table: Column A = What Think-Tank thinks the rhyme means; Column B = What the.', 'Ask: "If Think-Tank weren\'t arrogant, would the irony work?" Guide them to see arrogance *creates* the knowledge gap.', 'Give a non-play example: A fire station burns down.', 'Why is it not just bad luck?" Build the definition from there.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
