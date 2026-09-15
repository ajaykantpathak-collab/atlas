import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p1: SimDef = {
    id: 'v3_c12_hin_a_ch09_p1',
    title: 'Hkh"e lkguh · Part 1/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'Hkh"e lkguh · Part 1/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_001', 'c12_hin_a_cbse_09_002', 'c12_hin_a_cbse_09_003', 'c12_hin_a_cbse_09_004', 'c12_hin_a_cbse_09_005', 'c12_hin_a_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride and spite', 'A pen name for style', 'An apology'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and literary framework needed to understand the poet ?kukuan (1673–1760) and the two devotional poems.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you receive a heartfelt letter written in a dialect you barely know, from a person who claims they were exiled by a king because their guru cursed them.',
            decisions: [{ prompt: 'Who was ?kukuan’s guru, and what pivotal event altered the poet’s life trajectory?', options: [
                { text: '?kukuan’s guru was Latu (lqtku)', outcome: '?kukuan’s guru was Latu (lqtku). Because of his close relationship with Latu, ?kukuan gained.' },
                { text: 'Surdas', outcome: 'Not quite — Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are.', reveals: 'students-often-confuse-kukuan-with' },
                { text: 'Kabir or Tulsidas as guru, or missing the exile/curse', outcome: 'Not quite — Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are.', reveals: 'students-often-confuse-kukuan-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are listening to a friend recount a dramatic incident — they don\'t just blurt the ending; they set the scene, build tension, reach a turning point.',
            decisions: [{ prompt: 'What are the five standard stages of a narrative arc, and which stage typically contains the poem\'s turning point?', options: [
                { text: 'The five stages are exposition, rising action, climax, falling action, and denouement', outcome: 'The five stages are exposition, rising action, climax, falling action, and denouement.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza.', reveals: 'students-often-treat-plot-in' },
                { text: 'beginning, middle, end" or placing the turning point in the exposition', outcome: 'Not quite — Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza.', reveals: 'students-often-treat-plot-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are sitting in your grandmother\'s courtyard at dusk, hearing a folk song about a woman waiting for her husband who has gone to the city.',
            decisions: [{ prompt: 'What is the primary temporal setting indicated in the first doha of Kakuan, and which word signals it?', options: [
                { text: 'The primary temporal setting is late night or the small hours before dawn, signaled by', outcome: 'The primary temporal setting is late night or the small hours before dawn, signaled by the word.' },
                { text: '\'setting\' means only the physical location (e', outcome: 'Not quite — Students often think \'setting\' means only the physical location (e.g., \'a village\') and.', reveals: 'setting-means-only-the-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you receive a voice note from a friend who sounds completely different from their usual texts — their voice cracks, they pause, they repeat a name.',
            decisions: [{ prompt: 'Who is the protagonist in Kukuan\'s dohas, and what is his primary relationship that drives the poem?', options: [
                { text: 'The protagonist is the poetic speaker (Kukuan himself as the lover-poet), and his primary', outcome: 'The protagonist is the poetic speaker (Kukuan himself as the lover-poet), and his primary.' },
                { text: 'Lakshmi is the protagonist', outcome: 'Not quite — Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing.', reveals: 'students-treat-the-protagonist-as' },
                { text: 'the sakhi', outcome: 'Not quite — Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing.', reveals: 'students-treat-the-protagonist-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are reading a love letter where the writer never describes the recipient\'s appearance but constantly compares them to the moon, a cool breeze, and.',
            decisions: [{ prompt: 'In the first poem, the poet addresses Latika with the phrase "पकड़ पियु ;स लंसलक्स य्स लतिका द्स" (Pakad piyu ;s lansalaks ys latika ds).', options: [
                { text: 'The phrase means "Hold [my] hand', outcome: 'The phrase means "Hold [my] hand, this is for Latika" or "Catch hold, beloved, these verses are for.' },
                { text: 'The poet is asking Latika to hold his hand physically', outcome: 'Not quite — Students often treat Latika as a *historical person* with a recoverable biography (e.g., "She was.', reveals: 'students-often-treat-latika-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are listening to a friend describe a heartbreak — they don\'t just say "I\'m sad"; they describe the empty chair, the song that plays on repeat, the.',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a poem, and how does it differ from a \'summary of events\'?', options: [
                { text: 'The primary theme is the central abstract idea (e.g., \'the transformative power of', outcome: 'The primary theme is the central abstract idea (e.g., \'the transformative power of longing\') that.' },
                { text: 'devotion to Krishna', outcome: 'Not quite — Students often believe the primary theme is simply "devotion to Krishna" or "love for God" —.', reveals: 'the-primary-theme-is-simply' },
                { text: 'love for God', outcome: 'Not quite — Students often believe the primary theme is simply "devotion to Krishna" or "love for God" —.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'What comes next? Hkh"e lkguh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hkh"e lkguh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
          misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and.',
          parts: [
                { id: 'a', prompt: 'Who was ?kukuan’s guru, and what pivotal event altered the poet’s life trajectory?', answer: '?kukuan’s guru was Latu (lqtku)',
                  options: ['?kukuan’s guru was Latu (lqtku)', 'Surdas', 'Kabir or Tulsidas as guru, or missing the exile/curse'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' },
                { id: 'b', prompt: 'Explain why ?kukuan is described as "lk{kkr jlewfrZ" (intense emotional poet) and how his language reflects this intensity.', answer: '?kukuan earners the label "lk{kkr jlewfrZ"',
                  options: ['?kukuan earners the label "lk{kkr jlewfrZ"', 'Braj language', 'emotion', 'Surdas'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' },
                { id: 'c', prompt: 'Compare the emotional tone of Poem 1 (viraha/longing) with Poem 2 (samvad/challenge). What does this shift reveal about ?kukuan’s conception of guru-bhakti?', answer: 'Poem 1 is inward, private, soaked in separation-pain (viraha)',
                  options: ['Poem 1 is inward, private, soaked in separation-pain (viraha)', 'Surdas'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' }
          ],
            remediations: { 'students-often-confuse-kukuan-with': { steps: ['Re-read the NCERT introductory paragraph (before the poems) and underline every biographical fact (dates, guru’s name.', 'Create a two-column table: left column = life event, right column = poetic consequence (e.g., exile → wandering.', 'Watch a 5-minute YouTube lecture on "Braj Bhakti poets: ?kukuan" (search exactly) to hear the dialect pronunciation.', 'Re-attempt Diagnostic Questions 1 and 4; if still incorrect, revisit Class 11 node c11_hin_ar_cbse_09_001.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "?kukuan’s use of folk dialects (e.g., \'owQdHkjh\', \'cgjk;cs\') weakens his literary status compared to poets who use pure Braj." Defend your.', answer: 'The claim is false',
                  options: ['The claim is false', 'Surdas'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' }
          ],
            remediations: { 'students-often-confuse-kukuan-with': { steps: ['Re-read the NCERT introductory paragraph (before the poems) and underline every biographical fact (dates, guru’s name.', 'Create a two-column table: left column = life event, right column = poetic consequence (e.g., exile → wandering.', 'Watch a 5-minute YouTube lecture on "Braj Bhakti poets: ?kukuan" (search exactly) to hear the dialect pronunciation.', 'Re-attempt Diagnostic Questions 1 and 4; if still incorrect, revisit Class 11 node c11_hin_ar_cbse_09_001.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized sequence.',
          hint: 'Review the narrative arc mapping exercise from Class 11 Chapter 1.',
          misconception: 'Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza breaks, line enjambment.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in poetry refers to the organized sequence of events,',
                  options: ['Plot and narrative structure in poetry refers to the organized sequence of events,', '"Before You Read: Context and Background" provides the essential historical,', 'Setting and atmosphere in poetry refer to the time, place, physical environment, and the', 'Character analysis of the protagonist in poetry involves examining the poetic persona'],
                  hint: 'Review the narrative arc mapping exercise from Class 11 Chapter 1 (c11_hin_ar_cbse_01_002) where.',
                  misconception: 'Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza breaks, line enjambment, and speaker shifts.' }
          ],
            remediations: { 'students-often-treat-plot-in': { steps: ['Have the student re-read the first poem and physically mark each stanza with a label: E (exposition), R (rising),.', 'Ask them to justify each label with one line reference.', 'If they cannot distinguish rising from climax, give a mini-lesson using a familiar Hindi film song with clear narrative.', 'Re-assess by having them analyze the second poem\'s dialogue turns as structural beats.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_003', difficulty: 'standard',
          question: 'Setting and atmosphere in poetry refer to the time, place, physical.',
          hint: 'If stuck, review the \'Imagery Identification\' exercise in c11_hin_ar_cbse_01_003 and.',
          misconception: 'Students often think \'setting\' means only the physical location (e.g., \'a village\') and \'atmosphere\' means a single.',
          parts: [
                { id: 'a', prompt: 'In the second doha, the poet addresses the beloved as \'एकस गव लकसा नसफ[ककस\' (ekas gava lasa nasf[kakas).', answer: 'Yes, the address shifts the setting',
                  options: ['Yes, the address shifts the setting', '\'setting\' means only the physical location (e'],
                  hint: 'If stuck, review the \'Imagery Identification\' exercise in c11_hin_ar_cbse_01_003 and practice with.',
                  misconception: 'Students often think \'setting\' means only the physical location (e.g., \'a village\') and \'atmosphere\' means a single adjective like \'sad\'.' }
          ],
            remediations: { 'setting-means-only-the-physical': { steps: ['Revisit c11_hin_ar_cbse_01_003 (Setting and Atmosphere in Class 11) and re-do the worked example on identifying.', 'Take the first doha of Kakuan and make a three-column table: Column A – word/phrase, Column B – sensory modality.', 'Write a 50-word paragraph explaining how the table proves the atmosphere is \'desolate longing\'.', 'Self-check using the diagnostic question 2 rubric.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the poetic.',
          hint: 'If stuck on "who is speaking?", return to the biography in c12_hin_a_cbse_09_001 — Kukuan.',
          misconception: 'Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing "the poet creates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the poetic persona',
                  options: ['Character analysis of the protagonist in poetry involves examining the poetic persona', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting and atmosphere in poetry refer to the time, place, physical environment, and the'],
                  hint: 'If stuck on "who is speaking?", return to the biography in c12_hin_a_cbse_09_001 — Kukuan *names.',
                  misconception: 'Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing "the poet creates a character who.' }
          ],
            remediations: { 'students-treat-the-protagonist-as': { steps: ['Re-read both dohas aloud, circling every first-person pronoun/verb (मैं, मेरा, चाहूं, देखूं, सुनूं, भयो).', 'List only what the *speaker* says/does — ignore Lakshmi\'s actions or the sakhi\'s mention.', 'Revisit Class 11 node **c11_hin_ar_cbse_09_004** (Character Analysis: Protagonist) for the "speaker vs.', 'character" distinction in Kabir/Dadu.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves examining how.',
          hint: 'If stuck, re-read the two poems focusing *only* on lines where "लतिका" or second-person.',
          misconception: 'Students often treat Latika as a *historical person* with a recoverable biography (e.g., "She was a courtesan," "She.',
          parts: [
                { id: 'a', prompt: 'In the first poem, the poet addresses Latika with the phrase "पकड़ पियु ;स लंसलक्स य्स लतिका द्स" (Pakad piyu ;s lansalaks ys latika ds).', answer: 'The phrase means "Hold [my] hand',
                  options: ['The phrase means "Hold [my] hand', 'The poet is asking Latika to hold his hand physically'],
                  hint: 'If stuck, re-read the two poems focusing *only* on lines where "लतिका" or second-person pronouns.',
                  misconception: 'Students often treat Latika as a *historical person* with a recoverable biography (e.g., "She was a courtesan," "She was his wife") and.' },
                { id: 'b', prompt: 'The first poem uses the line "द्ग द्ग व्कौ न्छ्य्स एउह्कौ द्स" (dag dag vkau Nchys euHkkou ds) and "क्स्ग क्स्ग ज्क्क्फ्र घ न्सा न्सा लुएकु द्स" (xfg xfg.', answer: 'The paired contrasts (burning vs',
                  options: ['The paired contrasts (burning vs', 'It shows she is hot and cold', 'lists the images without synthesizing their combined effect (e'],
                  hint: 'If stuck, re-read the two poems focusing *only* on lines where "लतिका" or second-person pronouns.',
                  misconception: 'Students often treat Latika as a *historical person* with a recoverable biography (e.g., "She was a courtesan," "She was his wife") and.' },
                { id: 'c', prompt: 'Compare the portrayal of Latika in Poem 1 (where she is addressed as the *recipient* of verses) with Poem 2 (where she is the *source* of anger/words the.', answer: 'In Poem 1, Latika is the grammatical object ("for Latika"), static and receptive',
                  options: ['In Poem 1, Latika is the grammatical object ("for Latika"), static and receptive', 'She is the same in both'],
                  hint: 'If stuck, re-read the two poems focusing *only* on lines where "लतिका" or second-person pronouns.',
                  misconception: 'Students often treat Latika as a *historical person* with a recoverable biography (e.g., "She was a courtesan," "She was his wife") and.' }
          ],
            remediations: { 'students-often-treat-latika-as': { steps: ['If a student persists in biographical speculation, assign this 3-step remediation: (1) Re-read the two poems and.', '(2) Compare with the Class 11 node c11_hin_ar_cbse_09_005 (Character Analysis: Supporting Characters) where a similar.', '(3) Write a 100-word answer to: "Why does the poet *choose* not to describe Latika\'s appearance?" — forcing focus.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is the central, unifying idea or insight.',
          hint: 'If stuck, revisit the *character analysis of the protagonist* (node 004) — the theme *is*.',
          misconception: 'Students often believe the primary theme is simply "devotion to Krishna" or "love for God" — a *label* they recall from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is the central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is the central, unifying idea or insight about human', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting and atmosphere in poetry refer to the time, place, physical environment, and the'],
                  hint: 'If stuck, revisit the *character analysis of the protagonist* (node 004) — the theme *is* the.',
                  misconception: 'Students often believe the primary theme is simply "devotion to Krishna" or "love for God" — a *label* they recall from the chapter.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['Have the student re-read *only* the two stanzas (ignoring the preface) and list every concrete noun/verb (eyes, path.', 'Group these into two clusters: \'Waiting/Watchfulness\' and \'Suffering/Threat\'.', 'Ask: "What happens to the devotee *because* of these two clusters?" 4.', 'Guide them to formulate: "The waiting and suffering *redefine* the devotee — she becomes the one who can curse." 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
