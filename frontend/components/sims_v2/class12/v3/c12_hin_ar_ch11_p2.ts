import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch11_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch11_p2',
    title: 'Q.kh\'oj ukFk js.kq · Part 2/3',
    subtitle: 'The blind man saw the truth; the sighted chose the well',
    classLevel: 12, subject: 'hin_ar', topic: 'Q.kh\'oj ukFk js.kq · Part 2/3',
    chapters: ['c12_hin_ar_ch11'],
    nodeIds: ['c12_hin_ar_cbse_11_007', 'c12_hin_ar_cbse_11_008', 'c12_hin_ar_cbse_11_009', 'c12_hin_ar_cbse_11_010', 'c12_hin_ar_cbse_11_011', 'c12_hin_ar_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Psychoanalytic fiction reader', intro: 'A beggar who cannot see meets a society that refuses to. The story asks whose blindness is real.', goal: 'Read Bazar Darshan through psychoanalytic realism — blindness as epistemological and political condition.' },
    discovery: {
        question: 'A blind beggar is cheated because he can\'t see — but the story insists the real blindness belongs to everyone else. Blindness as what, then?',
        options: ['Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces', 'Poor eyesight only', 'Fate\'s cruelty', 'A medical condition'],
        answer: 'Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces',
        hook: 'This is the psychoanalytic turn in Hindi fiction — after Premchand\'s social realism came Jainendra\'s probe of the unconscious, where blindness is imposed by power and kept by utilitarian logic. The beggar isn\'t a pitiable character; he\'s the site where ideology does its violence.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, issues, or motifs in a literary work that support, complicate, or run parallel to the primary theme.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are at a busy Indian bazaar — you hear the main announcement (primary theme) but also notice the side conversations: a mother bargaining for.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature? How does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that runs alongside the primary theme, often', outcome: 'A secondary theme is a subordinate idea that runs alongside the primary theme, often explored.' },
                { text: 'secondary theme is just a less important theme', outcome: 'Not quite — Students often confuse **secondary themes with subplots**. They think any side story (e.g., the.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'less important', outcome: 'Not quite — Students often confuse **secondary themes with subplots**. They think any side story (e.g., the.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a courtroom drama on OTT: the camera zooms on dust motes dancing in a shaft of light, the sound of a stamp thudding on paper, the.',
            decisions: [{ prompt: 'Define "imagery" (प्रतिबिंब) and "metaphor" (रूपक) in your own words. Give one example of each from daily life (not from the textbook).', options: [
                { text: '**Correct Answer:** Imagery is language that creates sensory experiences (e.g., "The', outcome: '**Correct Answer:** Imagery is language that creates sensory experiences (e.g., "The courtroom.' },
                { text: 'courtroom *like* a furnace', outcome: 'Not quite — **Misconception:** "Imagery is only visual description (चित्रण), and metaphor is just a fancy word.', reveals: 'misconception-imagery-is-only-visual' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you tell a friend "Great job!" after they spill tea on your notes — you\'re using verbal irony.',
            decisions: [{ prompt: 'Define verbal irony and give one example from "cktkj n\'kZu" where a character says something but means the opposite.', options: [
                { text: 'Verbal irony occurs when a speaker\'s intended meaning is the opposite of the literal', outcome: 'Verbal irony occurs when a speaker\'s intended meaning is the opposite of the literal words spoken.' },
                { text: 'unexpected outcome', outcome: 'Not quite — Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this.', reveals: 'irony-is-just-unexpected-outcome' },
                { text: 'object = idea', outcome: 'Not quite — Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this.', reveals: 'irony-is-just-unexpected-outcome' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp chat between two friends discussing money problems — you instantly grasp the surface facts (literal) but also sense the.',
            decisions: [{ prompt: 'Identify the two main characters in the dialogue of "cktkj n\'kZu" and state the central topic of their conversation.', options: [
                { text: 'The two main characters are माँ (mother) and बेटा (son)', outcome: 'The two main characters are माँ (mother) and बेटा (son). The central topic is debt (ck”kkज) — its.' },
                { text: '\'Hkkxr th\' as a character', outcome: 'Not quite — Students treat inferential questions as \'guessing games\' and write personal opinions without.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate pays a \'career guru\' who diagnoses his low marks as a family curse and prescribes an absurd regime — copying his ancestors\' names 500 times. He complied for a month, then quietly stopped going. He\'s still failing.',
            decisions: [{ prompt: 'What does Nirala\'s \'खुजली उखाड़ जासा\' read in this episode?', options: [
                { text: 'The story ends where it began — the patient flees still itching; walking away from a bogus authority returns you to the problem untouched. The satire is that individual escape doesn\'t cure a systemic absurdity — question the prescription, don\'t just flee the clinic.', outcome: 'The circular structure — opening and closing on the itch — exists to show the quest was futile; his problem survives the guru because it was never the itch being treated.' },
                { text: 'At least he escaped before worse harm — quietly quitting was the smart move.', outcome: 'Escape isn\'t the story\'s victory — the patient who runs is still scratching on the last page; leaving the fraud unexamined leaves both the itch and the marketplace of absurd cures intact.', reveals: 'escape-equals-solution' },
                { text: 'The guru\'s method was sound in principle — he just needed to persist longer for results.', outcome: 'That\'s the blind faith in authority the story skewers: the diagnosis was theatrical nonsense from the start, and more obedience only deepens the farce.', reveals: 'persist-with-absurdity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read blindness as a social instrument — and catch the moment a story stops being about a beggar and starts being about us.',
            decisions: [{ prompt: 'What comes next? Q.kh\'oj ukFk js.kq · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Q.kh\'oj ukFk js.kq · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, issues, or motifs in a literary work.',
          hint: 'If stuck, revisit the "Theme: Secondary Themes" node from Class 11 Chapter 1.',
          misconception: 'Students often confuse **secondary themes with subplots**. They think any side story (e.g., the laborers’ brief.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas, issues, or motifs in a literary work that',
                  options: ['Secondary themes are the underlying ideas, issues, or motifs in a literary work that', 'The "Before You Read: Context and Background" section prepares students to engage with', 'Plot and narrative structure refers to the organized sequence of events and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit the "Theme: Secondary Themes" node from Class 11 Chapter 1.',
                  misconception: 'Students often confuse **secondary themes with subplots**. They think any side story (e.g., the laborers’ brief appearance) is a secondary.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Re-read the story and highlight every passage that does NOT directly discuss love/market.', 'Group highlights by recurring idea (e.g., gender, labor, language, class).', 'For each group, write one sentence: "This passage reveals the theme of ______ because ______." 4.', 'Check: Does each theme connect to the primary theme?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_008', difficulty: 'standard',
          question: 'Imagery (प्रतिबिंब/चित्रात्मकता) refers to the use of vivid, sensory language.',
          hint: 'If stuck on tenor/vehicle/ground, review the "Metaphor Surgery" exercise in ON_FAILURE.',
          misconception: '**Misconception:** "Imagery is only visual description (चित्रण), and metaphor is just a fancy word for comparison.',
          parts: [
                { id: 'a', prompt: 'In the opening paragraph, the author writes: "कचहरी के उस खोखले कुएँ में..." (In that hollow well of the court...). Is this imagery, metaphor, or both?', answer: '**Correct Answer:** It is **both**',
                  options: ['**Correct Answer:** It is **both**', 'only imagery'],
                  hint: 'If stuck on tenor/vehicle/ground, review the "Metaphor Surgery" exercise in ON_FAILURE using Class.',
                  misconception: '**Misconception:** "Imagery is only visual description (चित्रण), and metaphor is just a fancy word for comparison (तुलना)." **Why it\'s.' }
          ],
            remediations: { 'misconception-imagery-is-only-visual': { steps: ['**Remediation Path (3 steps):** 1.', '**Revisit Class 11 Node:** `c11_hin_ar_cbse_01_008` (Literary Devices: Imagery and Metaphor) — re-do the "Five Senses.', '**Metaphor Surgery:** Take 5 similes from Class 11 texts (e.g., "बादल *जैसे* जहाज"), convert each to metaphor.', '**Re-diagnostic:** Attempt Diagnostic Questions 2 & 3 again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Imagery is only visual description (चित्रण), and metaphor is just a fancy word for comparison.',
          parts: [
                { id: 'a', prompt: 'The author could have used a simile: "मुकदमा चाकू *की तरह* है" (Litigation is *like* a knife).', answer: '**Correct Answer:** A simile ("like a knife") creates **distance**',
                  options: ['**Correct Answer:** A simile ("like a knife") creates **distance**', 'simile is weaker'],
                  hint: 'If stuck on tenor/vehicle/ground, review the "Metaphor Surgery" exercise in ON_FAILURE using Class.',
                  misconception: '**Misconception:** "Imagery is only visual description (चित्रण), and metaphor is just a fancy word for comparison (तुलना)." **Why it\'s.' }
          ],
            remediations: { 'misconception-imagery-is-only-visual': { steps: ['**Remediation Path (3 steps):** 1.', '**Revisit Class 11 Node:** `c11_hin_ar_cbse_01_008` (Literary Devices: Imagery and Metaphor) — re-do the "Five Senses.', '**Metaphor Surgery:** Take 5 similes from Class 11 texts (e.g., "बादल *जैसे* जहाज"), convert each to metaphor.', '**Re-diagnostic:** Attempt Diagnostic Questions 2 & 3 again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If unable to spot irony, review the definition of situational irony.',
          misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', 'The "Before You Read: Context and Background" section prepares students to engage with', 'Plot and narrative structure refers to the organized sequence of events and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If unable to spot irony, review the definition of situational irony in c11_hin_ar_cbse_11_009 and.',
                  misconception: 'Students often think irony is just "unexpected outcome" and symbolism is "object = idea." In this story, they miss that Hkxr th\'s verbal.' }
          ],
            remediations: { 'irony-is-just-unexpected-outcome': { steps: ['Re-read the climax scene (fair episode) aloud, marking every statement Hkxr th makes about his nose — label each.', 'List three things the nose could symbolize (pride, identity, social mask) and find one textual moment for each.', 'Write a 3-sentence explanation of how the irony in the climax *enacts* the symbolism.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_010', difficulty: 'standard',
          question: 'Vocabulary in Context: Key Words refers to the skill of identifying.',
          hint: 'If the student cannot distinguish contextual meaning from dictionary meaning, have them.',
          misconception: 'Students memorize the \'kCn&Nfo\' list as isolated Hindi–English pairs (e.g., "Li`gk = bPNk") and then hunt for those.',
          parts: [
                { id: 'a', prompt: 'The word **vinkFkZ** (meaning "non-existent / having no real existence") appears in the \'kCn&Nfo\' list.', answer: 'Step 1: Recall vinkFkZ = "ftldk vfLrRo u gks" (that',
                  options: ['Step 1: Recall vinkFkZ = "ftldk vfLrRo u gks" (that', 'ego is fake'],
                  hint: 'If the student cannot distinguish contextual meaning from dictionary meaning, have them compare the.',
                  misconception: 'Students memorize the \'kCn&Nfo\' list as isolated Hindi–English pairs (e.g., "Li`gk = bPNk") and then hunt for those exact words.' }
          ],
            remediations: { 'students-memorize-the-kcn-nfo': { steps: ['**Re-read the \'kCn&Nfo\' list** (end of chapter) and for each word, locate *its exact sentence* in the story.', 'Write the sentence in your notebook.', '**For each word, answer**: "What would change if the author used a simpler synonym?" (e.g., replace v¯dfpRdj with bekar.', '**Re-attempt Diagnostic Questions 2, 4, and 5** after this exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck, review Class 11 Aroh Chapter 11 Grammar node (c11_hin_ar_cbse_11_011).',
          misconception: 'Students treat "language usage" as identifying isolated grammatical terms (e.g., "this is a compound sentence") without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic analysis of grammatical structures,',
                  options: ['Language Usage in the Text refers to the systematic analysis of grammatical structures,', 'The "Before You Read: Context and Background" section prepares students to engage with', 'Plot and narrative structure refers to the organized sequence of events and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 11 Grammar node (c11_hin_ar_cbse_11_011) — specifically the.',
                  misconception: 'Students treat "language usage" as identifying isolated grammatical terms (e.g., "this is a compound sentence") without linking form.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['Re-read only the mother\'s dialogues aloud, marking every sentence-final particle (घ, ही, तो, ना).', 'For each, ask "What would be lost if this particle were removed?" — write the answer in one phrase (e.g., "finality".', 'Compare three narrator sentences with three mother sentences — tabulate: avg.', 'Re-attempt Diagnostic Q2 with this data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck, revisit the \'vH;kl\' (exercise) questions at the end of the chapter — Questions.',
          misconception: 'Students treat inferential questions as \'guessing games\' and write personal opinions without textual anchoring.',
          parts: [
                { id: 'a', prompt: 'Identify the two main characters in the dialogue of "cktkj n\'kZu" and state the central topic of their conversation.', answer: 'The two main characters are माँ (mother) and बेटा (son)',
                  options: ['The two main characters are माँ (mother) and बेटा (son)', '\'Hkkxr th\' as a character'],
                  hint: 'If stuck, revisit the \'vH;kl\' (exercise) questions at the end of the chapter — Questions 1 and 3.',
                  misconception: 'Students treat inferential questions as \'guessing games\' and write personal opinions without textual anchoring.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Have the student re-read only the dialogue sections (marked by "eSaus dgkµ", "cksysµ") and highlight every explicit.', 'For each highlight, ask: "What is the speaker NOT saying directly but implying?" 3.', 'Practice converting 3 literal questions from the textbook (vH;kl section) into inferential ones by adding "What does.', 'Re-attempt Diagnostic Question 3 with the PEEL template provided in Worked Example 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
