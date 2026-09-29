import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch02_p1: SimDef = {
    id: 'v3_c8_engl_ch02_p1',
    title: 'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 1/3',
    subtitle: 'The forty-eight hours that decided Kashmir',
    classLevel: 8, subject: 'engl', topic: 'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 1/3',
    chapters: ['c8_engl_ch02'],
    nodeIds: ['c8_engl_ch2_1', 'c8_engl_ch2_10', 'c8_engl_ch2_11', 'c8_engl_ch2_12', 'c8_engl_ch2_13', 'c8_engl_ch2_14'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young officer at Srinagar airfield, 1947', intro: 'Invaders are burning Baramulla and marching on your runway — the only way reinforcements can arrive. Understand the accession, the airlift and the battle that followed, before the valley is cut off.', goal: 'Understand the 1947 tribal invasion of Kashmir, the Instrument of Accession, and how Operation Gulmarg and the Battle of Badgam flowed from the defence of Srinagar airport.' },
    discovery: {
        question: 'October 1947: tribal invaders are 20 km from Srinagar and the airport is the valley\'s only lifeline. Why did Indian troops land there on October 27 — and only then?',
        options: ['Maharaja Hari Singh signed the Instrument of Accession on October 26 — Indian troops could only legally enter after Kashmir joined India', 'India had planned to capture Kashmir for months', 'The United Nations ordered the landing', 'The troops were already stationed in Srinagar'],
        answer: 'Maharaja Hari Singh signed the Instrument of Accession on October 26 — Indian troops could only legally enter after Kashmir joined India',
        hook: 'Operation Gulmarg wasn\'t a pre-planned grab — it was an emergency rescue. Invaders reached Baramulla first, the Maharaja acceded in panic, and only then did Indian soldiers fly in to defend the airport. Sequence changes everything.',
    },
    teaching: [
        { title: 'Historical Context: Kashmir Conflict and Operation Gulmarg (1947)', text: 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the political, military, and social circumstances surrounding the tribal invasion of Jammu and Kashmir.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch2_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rebuild the timeline of October 1947: invaders reach Baramulla, the Maharaja signs accession, troops land at Srinagar. Then stand at Badgam on November 3 and see why Major Somnath Sharma\'s stand mattered.',
        labels: ['Historical Context: Kashmir Conflict', 'Comprehension: How 90 Men', 'Critical Thinking: The Meaning', 'Writing: Composing a Tribute', 'Poem: Summary of', 'Poem: Rhyme Scheme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch2_1', title: 'Historical Context: Kashmir Conflict and Operation Gulmarg (1947)',
          caseStudy: { intro: 'Imagine you hear news that your neighboring state is suddenly attacked by armed groups from another country, and your state\'s ruler must decide within hours.',
            decisions: [{ prompt: 'What was the immediate trigger for India\'s military intervention in Jammu and Kashmir in October 1947?', options: [
                { text: 'The immediate trigger was the invasion of Jammu and Kashmir by Pakistani-supported tribal', outcome: 'The immediate trigger was the invasion of Jammu and Kashmir by Pakistani-supported tribal lashkars.' },
                { text: 'India wanted to annex Kashmir', outcome: 'Not quite — Students often believe Operation Gulmarg was India\'s pre-planned offensive to capture Kashmir.', reveals: 'operation-gulmarg-was-india-s' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_10', title: 'Comprehension: How 90 Men Foiled 500 Infiltrators',
          caseStudy: { intro: 'Imagine you\'re a news reporter explaining to your class how a small group of soldiers stopped a much larger invading force—what would you focus on first?',
            decisions: [{ prompt: 'What was the approximate ratio of Indian soldiers to infiltrators in the Battle of Badgam?', options: [
                { text: 'The ratio was approximately 1:5.5 (90 soldiers to 500 infiltrators)', outcome: 'The ratio was approximately 1:5.5 (90 soldiers to 500 infiltrators).' },
                { text: '90 vs 500', outcome: 'Not quite — Students often believe that answering "How 90 men foiled 500 infiltrators" requires only listing.', reveals: 'answering-how-90-men-foiled' },
                { text: 'How 90 men foiled 500 infiltrators', outcome: 'Not quite — Students often believe that answering "How 90 men foiled 500 infiltrators" requires only listing.', reveals: 'answering-how-90-men-foiled' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_11', title: 'Critical Thinking: The Meaning of Valour and Sacrifice',
          caseStudy: { intro: 'Imagine you see a classmate standing up to a bully to protect a younger student, even though they might get hurt.',
            decisions: [{ prompt: 'What is the basic difference between bravery and valour as discussed in relation to Major Somnath Sharma\'s actions?', options: [
                { text: 'Bravery is facing danger without fear, while valour involves courageous action taken for', outcome: 'Bravery is facing danger without fear, while valour involves courageous action taken for a noble.' },
                { text: 'bravery and valour mean the same thing', outcome: 'Not quite — Students often confuse valour with reckless bravery, believing that any dangerous action—like.', reveals: 'students-often-confuse-valour-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_12', title: 'Writing: Composing a Tribute to a National Hero',
          caseStudy: { intro: 'Imagine your school is holding a special assembly on Kargil Vijay Diwas and you are chosen to speak about a Param Vir Chakra awardee.',
            decisions: [{ prompt: 'What is the primary difference between a biography and a tribute when writing about a national hero?', options: [
                { text: 'A biography aims for a comprehensive, chronological, and objective account of a person\'s', outcome: 'A biography aims for a comprehensive, chronological, and objective account of a person\'s entire.' },
                { text: 'a tribute is shorter', outcome: 'Not quite — Students treat a tribute as a "fact dump" — they believe honouring a hero means listing *all* known.', reveals: 'students-treat-a-tribute-as' },
                { text: 'more facts = more respect', outcome: 'Not quite — Students treat a tribute as a "fact dump" — they believe honouring a hero means listing *all* known.', reveals: 'students-treat-a-tribute-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_13', title: 'Poem: Summary of the Patriotic Poem on Soldiers',
          caseStudy: { intro: 'Imagine you\'re at the National War Memorial in Delhi and a younger student asks, "What is that poem about soldiers really saying?" You wouldn\'t recite.',
            decisions: [{ prompt: 'What is the primary purpose of a poem summary, and how does it differ from a paraphrase?', options: [
                { text: 'A poem summary captures the main ideas, narrative arc, and central message in the', outcome: 'A poem summary captures the main ideas, narrative arc, and central message in the student\'s own.' },
                { text: 'rewrite in easy words', outcome: 'Not quite — Students believe a poem summary is a stanza-by-stanza paraphrase — they rewrite each stanza.', reveals: 'a-poem-summary-is-a' },
                { text: 'distill the core meaning', outcome: 'Not quite — Students believe a poem summary is a stanza-by-stanza paraphrase — they rewrite each stanza.', reveals: 'a-poem-summary-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend summarises a chapter on 1947: \'India launched Operation Gulmarg to grab Kashmir, sent troops in first, and the Maharaja signed papers later to make it legal.\' Another student frowns at the sequence.',
            decisions: [{ prompt: 'What does the correct order of events show?', options: [
                { text: 'The invasion came first — tribesmen reached Baramulla by 24 October; the Maharaja signed the Instrument of Accession on 26 October; only then did Indian troops land at Srinagar airport on 27 October. Gulmarg began as an emergency defence of the valley\'s only air lifeline, not a land grab.', outcome: 'This keeps the sequence straight and shows why accession had to precede deployment — Indian entry was legally impossible before it.' },
                { text: 'The friend\'s version works — the paperwork is just a formality that could follow the troops.', outcome: 'Reversing accession and troop landing turns a defensive response into an invasion; the legal accession is what made the deployment possible at all.', reveals: 'troops-before-accession' },
                { text: 'The Maharaja invited Indian troops weeks earlier as part of a pre-planned offensive to take the whole region.', outcome: 'He had actually delayed choosing either country, hoping to stay independent; only the tribal invasion forced his hand — nothing about it was pre-planned expansion.', reveals: 'pre-planned-offensive' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_14', title: 'The bigger picture',
          caseStudy: { intro: 'History turns on sequence: invasion → accession → airlift. The Battle of Badgam wasn\'t aggression — it was a desperate defence of the only runway keeping Kashmir connected to India.',
            decisions: [{ prompt: 'What comes next? A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch2_1', difficulty: 'standard',
          question: 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947).',
          hint: 'If stuck, review c7_engl_ch05_002 (Class 7: Context: India\'s Wars and the Sacrifice.',
          misconception: 'Students often believe Operation Gulmarg was India\'s pre-planned offensive to capture Kashmir, ignoring that it was.',
          parts: [
                { id: 'a', prompt: 'Analyze how the geography of the Kashmir Valley influenced India\'s military strategy during Operation Gulmarg.', answer: 'The Kashmir Valley is surrounded by high mountains with limited access points',
                  options: ['The Kashmir Valley is surrounded by high mountains with limited access points', 'mountains made fighting hard'],
                  hint: 'If stuck, review c7_engl_ch05_002 (Class 7: Context: India\'s Wars and the Sacrifice of Soldiers).',
                  misconception: 'Students often believe Operation Gulmarg was India\'s pre-planned offensive to capture Kashmir, ignoring that it was an emergency response.' }
          ],
            remediations: { 'operation-gulmarg-was-india-s': { steps: ['To fix this, first ask: "What was happening in Srinagar on October 26, 1947, before any Indian troops arrived?" Guide.', 'Then, show a map: mark Srinagar airport, Baramulla, and the invasion route.', 'Emphasize that Indian troops landed Oct 27 *only* after the Maharaja signed accession Oct 26, and their first task was.', 'Use the analogy: "If your house is being broken into, you call police to stop the intruder—not to go rob the neighbor\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Operation Gulmarg was India\'s pre-planned offensive to capture Kashmir, ignoring that it was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Operation Gulmarg was solely a defensive operation with no offensive objectives."', answer: 'This claim is partially correct but incomplete',
                  options: ['This claim is partially correct but incomplete', 'purely offensive'],
                  hint: 'If stuck, review c7_engl_ch05_002 (Class 7: Context: India\'s Wars and the Sacrifice of Soldiers).',
                  misconception: 'Students often believe Operation Gulmarg was India\'s pre-planned offensive to capture Kashmir, ignoring that it was an emergency response.' }
          ],
            remediations: { 'operation-gulmarg-was-india-s': { steps: ['To fix this, first ask: "What was happening in Srinagar on October 26, 1947, before any Indian troops arrived?" Guide.', 'Then, show a map: mark Srinagar airport, Baramulla, and the invasion route.', 'Emphasize that Indian troops landed Oct 27 *only* after the Maharaja signed accession Oct 26, and their first task was.', 'Use the analogy: "If your house is being broken into, you call police to stop the intruder—not to go rob the neighbor\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_10', difficulty: 'standard',
          question: 'Comprehension of historical narratives involves analyzing textual evidence.',
          hint: 'Review c7_engl_ch05_009: Comprehension: Wars Fought by India Post-Independence - focus.',
          misconception: 'Students often believe that answering "How 90 men foiled 500 infiltrators" requires only listing the soldiers\' brave.',
          parts: [
                { id: 'a', prompt: 'What was the approximate ratio of Indian soldiers to infiltrators in the Battle of Badgam?', answer: 'The ratio was approximately 1:5.5 (90 soldiers to 500 infiltrators)',
                  options: ['The ratio was approximately 1:5.5 (90 soldiers to 500 infiltrators)', '90 vs 500', 'How 90 men foiled 500 infiltrators', 'They fought hard'],
                  hint: 'Review c7_engl_ch05_009: Comprehension: Wars Fought by India Post-Independence - focus on questions.',
                  misconception: 'Students often believe that answering "How 90 men foiled 500 infiltrators" requires only listing the soldiers\' brave actions (e.g., "They.' }
          ],
            remediations: { 'answering-how-90-men-foiled': { steps: ['To fix this, guide the student to: 1) Identify all verbs describing soldier actions in the text (e.g., "occupied,".', '2) For each verb, ask: "What specific advantage did this action create?" (e.g., "Occupied the hill" → forced enemy.', '3) Match each advantage to a textual quote or paraphrase.', '4) Conclude by explaining how these advantages *together* countered the numerical disadvantage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_11', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch2\': the skill or concept this node teaches.',
          hint: 'If stuck, review the theme analysis from c8_engl_ch2_6 (Sacrifice, Patriotism, and Duty).',
          misconception: 'Students often confuse valour with reckless bravery, believing that any dangerous action—like charging alone into enemy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c8_engl_ch2\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c8_engl_ch2\': the skill or concept this node teaches, applied to', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'A tribute is a structured piece of writing (speech, essay, or article) that honours a'],
                  hint: 'If stuck, review the theme analysis from c8_engl_ch2_6 (Sacrifice, Patriotism, and Duty).',
                  misconception: 'Students often confuse valour with reckless bravery, believing that any dangerous action—like charging alone into enemy fire without.' }
          ],
            remediations: { 'students-often-confuse-valour-with': { steps: ['To fix this, guide the student to distinguish recklessness from valour using three questions: (1) Was the action taken.', '(2) Was there a reasonable chance of success or meaningful delay of harm?', '(3) Did the person understand the risks and choose duty over self-preservation?', 'Have them re-examine Sharma\'s last message: "The enemy is only 50 yards from us.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_12', difficulty: 'standard',
          question: 'A tribute is a structured piece of writing (speech, essay, or article) that.',
          hint: 'If stuck, review **c8_engl_ch2_2 (Character Analysis)** to re-identify Major Sharma\'s.',
          misconception: 'Students treat a tribute as a "fact dump" — they believe honouring a hero means listing *all* known facts (birth.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A tribute is a structured piece of writing (speech, essay, or article) that honours a',
                  options: ['A tribute is a structured piece of writing (speech, essay, or article) that honours a', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'From \'English chapter c8_engl_ch2\': the skill or concept this node teaches, applied to'],
                  hint: 'If stuck, review **c8_engl_ch2_2 (Character Analysis)** to re-identify Major Sharma\'s core traits.',
                  misconception: 'Students treat a tribute as a "fact dump" — they believe honouring a hero means listing *all* known facts (birth, education, regiment.' }
          ],
            remediations: { 'students-treat-a-tribute-as': { steps: ['**Diagnose:** Ask the student to read their draft aloud.', 'Ask: "Which sentence gives you goosebumps?" If none, the draft is a report.', '**Model the Shift:** Take their first paragraph (usually biographical) and rewrite it live: "Born in 1923" → "In 1947.', '**Constraint Exercise:** Give them a strict 100-word limit and 3 "must-haves": (a) the defining image, (b) the odds.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_13', difficulty: 'standard',
          question: 'A poem summary condenses the narrative, imagery, and emotional arc of.',
          hint: 'Review c7_engl_ch05_011 (Pushp ki Abhilasha summary) and practice the "one word per.',
          misconception: 'Students believe a poem summary is a stanza-by-stanza paraphrase — they rewrite each stanza in simpler language and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A poem summary condenses the narrative, imagery, and emotional arc of a patriotic poem',
                  options: ['A poem summary condenses the narrative, imagery, and emotional arc of a patriotic poem', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'From \'English chapter c8_engl_ch2\': the skill or concept this node teaches, applied to'],
                  hint: 'Review c7_engl_ch05_011 (Pushp ki Abhilasha summary) and practice the "one word per stanza.',
                  misconception: 'Students believe a poem summary is a stanza-by-stanza paraphrase — they rewrite each stanza in simpler language and call it a summary.' }
          ],
            remediations: { 'a-poem-summary-is-a': { steps: ['If a student produces a stanza-list instead of a synthesis, do this: (1) Have them number the stanzas and write *one.', '(2) Ask: "What does stanza 2 *do* that stanza 1 didn\'t?" Force them to name the shift.', '(3) Give them a template: "The poem begins by [stanza 1 function], then moves to [stanza 2 function], which leads.', 'This trains structural thinking over content listing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_14', difficulty: 'standard',
          question: 'Rhyme scheme is the pattern of rhyming words at the end of poetic lines.',
          hint: 'If stuck, review the Class 7 concept of rhyme scheme identification (c7_engl_ch01_012).',
          misconception: 'Students often believe that rhyme scheme requires perfect, identical rhymes and that stanzas must be uniform in length.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rhyme scheme is the pattern of rhyming words at the end of poetic lines, represented by',
                  options: ['Rhyme scheme is the pattern of rhyming words at the end of poetic lines, represented by', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'From \'English chapter c8_engl_ch2\': the skill or concept this node teaches, applied to'],
                  hint: 'If stuck, review the Class 7 concept of rhyme scheme identification (c7_engl_ch01_012).',
                  misconception: 'Students often believe that rhyme scheme requires perfect, identical rhymes and that stanzas must be uniform in length and pattern.' }
          ],
            remediations: { 'rhyme-scheme-requires-perfect': { steps: ['First, have students hum the poem’s rhythm to feel natural pauses (stanza breaks).', 'Next, teach them to say end words slowly to detect near rhymes (e.g., "moon"/"tune" count as B).', 'Then, show a poem with purposeful stanza variation (like a sonnet followed by a couplet) and ask: "Why might the poet.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
