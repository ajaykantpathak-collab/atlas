import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch02_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch02_p2: SimDef = {
    id: 'v3_c10_engl_ch02_p2',
    title: 'Nelson Mandela: Long Walk to Freedom · Part 2/2',
    subtitle: 'Walk out of apartheid\'s cage into a rainbow nation\'s first morning',
    classLevel: 10, subject: 'engl', topic: 'Nelson Mandela: Long Walk to Freedom · Part 2/2',
    chapters: ['c10_engl_ch02'],
    nodeIds: ['c10_engl_cbse_02_007', 'c10_engl_cbse_02_008', 'c10_engl_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a journalist covering 10 May 1994 at the Union Buildings', intro: 'For decades your skin decided your school, your bench, your bus. On one May morning in Pretoria, that entire system bowed to a man it had imprisoned for 27 years.', goal: 'Explain apartheid as a legal-bureaucratic system and read the inauguration as a national ritual of reconciliation.' },
    discovery: {
        question: 'At Mandela\'s 1994 inauguration, the military generals who once would have arrested him now saluted him — and two national anthems played, one for each community. Why sing BOTH anthems?',
        options: ['It was a deliberate act of reconciliation — no group\'s identity was erased in the new nation', 'It was just ceremony — extra songs to fill the program', 'The organisers couldn\'t decide which anthem to keep', 'One anthem was for Mandela, the other for the outgoing president'],
        answer: 'It was a deliberate act of reconciliation — no group\'s identity was erased in the new nation',
        hook: 'That day wasn\'t only about one man\'s freedom — it was a whole country performing a new idea: that the oppressor and the oppressed could belong to the same anthem.',
    },
    teaching: [
        { title: 'Courage and Resilience: Mandela\'s Definition of Bravery', text: 'Courage, as defined by Nelson Mandela in *Long Walk to Freedom*, is not the absence of fear but the triumph over it — the ability to act rightly despite terror.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct the machinery of apartheid — the acts that assigned race, controlled movement, and dictated where people could exist — then weigh what the inauguration dismantled.',
        labels: ['Courage and Resilience: Mandela\'s', 'Theme: Triumph of Justice,', 'Vocabulary in Context: Key'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_007', title: 'Courage and Resilience: Mandela\'s Definition of Bravery',
          caseStudy: { intro: 'Think of a moment you were terrified — maybe before a board exam or a difficult conversation — but you did the right thing anyway.',
            decisions: [{ prompt: 'State Mandela\'s exact definition of courage as written in *Long Walk to Freedom*.', options: [
                { text: 'Correct answer: "I learned that courage was not the absence of fear, but the triumph over', outcome: 'Correct answer: "I learned that courage was not the absence of fear, but the triumph over it.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students often write: "Mandela was courageous because he never gave up" or "He had no fear.', reveals: 'students-often-write-mandela-was' },
                { text: 'Mandela was courageous', outcome: 'Not quite — Students often write: "Mandela was courageous because he never gave up" or "He had no fear.', reveals: 'students-often-write-mandela-was' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_008', title: 'Theme: Triumph of Justice, Equality and Democratic Values',
          caseStudy: { intro: 'Imagine you are watching the 1994 inauguration on television: a Black president taking oath in a country where, just years before, he was a prisoner.',
            decisions: [{ prompt: 'What is the central theme of "Triumph of Justice, Equality and Democratic Values" in the chapter *Long Walk to Freedom*?', options: [
                { text: 'The central theme is that sustained collective struggle against apartheid led to the', outcome: 'The central theme is that sustained collective struggle against apartheid led to the establishment.' },
                { text: 'Mandela became president', outcome: 'Not quite — Students often think the "triumph" refers only to Mandela\'s personal victory (becoming president).', reveals: 'the-triumph-refers-only-to' },
                { text: 'triumph', outcome: 'Not quite — Students often think the "triumph" refers only to Mandela\'s personal victory (becoming president).', reveals: 'the-triumph-refers-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_009', title: 'Vocabulary in Context: Key Terms (Apartheid, Constitution, Emancipation)',
          caseStudy: { intro: 'Imagine you are reading the chapter and come across the sentence: "The Constitution that we adopted was the embodiment of the struggle against apartheid." You.',
            decisions: [{ prompt: 'Define the term \'Apartheid\' as it is used in the chapter "Nelson Mandela: Long Walk to Freedom". Do not use a dictionary definition.', options: [
                { text: 'Correct answer: Apartheid refers to the official government policy of racial segregation', outcome: 'Correct answer: Apartheid refers to the official government policy of racial segregation and.' },
                { text: 'Apartheid means separation', outcome: 'Not quite — Students treat \'Constitution\' as a generic synonym for \'government rules\' and fail to distinguish.', reveals: 'students-treat-constitution-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a class discussion on Mandela\'s \'Long Walk to Freedom\', a student shrugs: \'Apartheid just meant separate buses and schools — unfair but not that evil. Laws are laws.\' The teacher asks the class to respond.',
            decisions: [{ prompt: 'What is the strongest reply to that student?', options: [
                { text: 'Apartheid was not a few separate queues — it was a legal system that defined your race at birth, dictated where you could live and travel, and decided what work and future were open to you. Mandela\'s point is deeper still: such a system cages the oppressors too, so freedom means dismantling the unjust laws themselves, not just swapping who sits where.', outcome: 'Laws like race classification, the pass system and segregated areas made discrimination the structure of the state itself — \'legal\' and \'just\' are not the same thing.' },
                { text: 'The student is basically right — separation was the real harm, and once separate facilities ended, nothing else about apartheid mattered.', outcome: 'That misses how deep it went: apartheid legally fixed identity, movement, residence and opportunity from birth — ending separate benches alone would not undo it.', reveals: 'segregation-was-only-separate-buses' },
                { text: 'Mandela\'s story shows the opposite — that unjust laws should simply be obeyed patiently until rulers change their minds.', outcome: 'Mandela resisted unjust law and went to prison for it; the chapter\'s whole arc is that freedom had to be fought for, not waited for.', reveals: 'unjust-laws-must-be-obeyed' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_02_009', title: 'You made it',
          caseStudy: { intro: 'Apartheid wasn\'t just separate benches; it was a legal machine that defined who you were at birth. Freedom meant dismantling the machine, not just opening the benches.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_007', difficulty: 'standard',
          question: 'Courage, as defined by Nelson Mandela in *Long Walk to Freedom*, is not the.',
          hint: 'Re-read the prison section (Robben Island) and underline every sentence showing a choice.',
          misconception: 'Students often write: "Mandela was courageous because he never gave up" or "He had no fear in prison." This confuses.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Mandela says the brave man is *not* one who feels no fear. Use one example from his life to support your answer.', answer: 'Correct answer: Mandela argues fear is a natural human response to danger',
                  options: ['Correct answer: Mandela argues fear is a natural human response to danger', 'Mandela wasn\'t scared', 'Mandela was courageous', 'He had no fear in prison'],
                  hint: 'Re-read the prison section (Robben Island) and underline every sentence showing a choice made.',
                  misconception: 'Students often write: "Mandela was courageous because he never gave up" or "He had no fear in prison." This confuses *outcome* (not giving.' },
                { id: 'b', prompt: 'In the chapter, Mandela describes how comrades in prison showed courage through small daily acts.', answer: 'Correct answer: (1) Studying secretly despite punishment',
                  options: ['Correct answer: (1) Studying secretly despite punishment', 'triumph over fear', 'they didn\'t give up', 'Mandela was courageous'],
                  hint: 'Re-read the prison section (Robben Island) and underline every sentence showing a choice made.',
                  misconception: 'Students often write: "Mandela was courageous because he never gave up" or "He had no fear in prison." This confuses *outcome* (not giving.' }
          ],
            remediations: { 'students-often-write-mandela-was': { steps: ['Have the student re-read the two paragraphs where Mandela defines courage (after the Rivonia Trial reference and in the.', 'Ask them to highlight every verb showing *action* (learned, conquer, triumph, push, endure).', 'Together, list three moments Mandela *admits* fear (Rivonia, first night on Robben Island, hearing of family troubles).', 'For each, write one sentence: "He felt fear of X, but he did Y — this is triumph over fear."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write: "Mandela was courageous because he never gave up" or "He had no fear in prison." This confuses.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Mandela\'s resilience was only possible because he had exceptional personal strength; ordinary people cannot replicate it." Defend.', answer: 'Correct answer: The text *rejects* this',
                  options: ['Correct answer: The text *rejects* this', 'Mandela was courageous', 'He had no fear in prison'],
                  hint: 'Re-read the prison section (Robben Island) and underline every sentence showing a choice made.',
                  misconception: 'Students often write: "Mandela was courageous because he never gave up" or "He had no fear in prison." This confuses *outcome* (not giving.' },
                { id: 'b', prompt: 'Write a 50-word diary entry from Mandela\'s perspective on Robben Island, showing a moment where he *felt* fear but chose an act of courage/resilience.', answer: 'Criteria for a good answer: (1) First-person voice',
                  options: ['Criteria for a good answer: (1) First-person voice', 'Mandela was courageous', 'He had no fear in prison'],
                  hint: 'Re-read the prison section (Robben Island) and underline every sentence showing a choice made.',
                  misconception: 'Students often write: "Mandela was courageous because he never gave up" or "He had no fear in prison." This confuses *outcome* (not giving.' }
          ],
            remediations: { 'students-often-write-mandela-was': { steps: ['Have the student re-read the two paragraphs where Mandela defines courage (after the Rivonia Trial reference and in the.', 'Ask them to highlight every verb showing *action* (learned, conquer, triumph, push, endure).', 'Together, list three moments Mandela *admits* fear (Rivonia, first night on Robben Island, hearing of family troubles).', 'For each, write one sentence: "He felt fear of X, but he did Y — this is triumph over fear."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_008', difficulty: 'standard',
          question: 'The theme of "Triumph of Justice, Equality and Democratic Values" in Nelson.',
          hint: 'Review c9_engl_ch1_4 (Theme: Literacy as Empowerment) and c9_engl_ch1_5 (Theme.',
          misconception: 'Students often think the "triumph" refers only to Mandela\'s personal victory (becoming president) rather than the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the inauguration ceremony symbolizes the triumph of democratic values. Use two specific details from the text.', answer: 'The inauguration symbolizes democratic triumph',
                  options: ['The inauguration symbolizes democratic triumph', 'Mandela became the first Black president', 'triumph'],
                  hint: 'Review c9_engl_ch1_4 (Theme: Literacy as Empowerment) and c9_engl_ch1_5 (Theme: Determination).',
                  misconception: 'Students often think the "triumph" refers only to Mandela\'s personal victory (becoming president) rather than the systemic triumph.' },
                { id: 'b', prompt: 'Analyze how Mandela\'s definition of courage ("not the absence of fear but the triumph over it") supports the theme of democratic values triumphing over.', answer: 'Conventional courage is often seen as fearlessness',
                  options: ['Conventional courage is often seen as fearlessness', 'triumph'],
                  hint: 'Review c9_engl_ch1_4 (Theme: Literacy as Empowerment) and c9_engl_ch1_5 (Theme: Determination).',
                  misconception: 'Students often think the "triumph" refers only to Mandela\'s personal victory (becoming president) rather than the systemic triumph.' }
          ],
            remediations: { 'the-triumph-refers-only-to': { steps: ['Re-read the inauguration speech excerpt and underline every reference to "we," "our," "nation," "constitution,".', 'Make a two-column table: left column = personal references (I, my), right column = collective references (we, our.', 'Write one sentence explaining why the collective references dominate and what that implies about the theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_02_009', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review c9_engl_ch1_8 (Vocabulary in Context: Key Words from the Story).',
          misconception: 'Students treat \'Constitution\' as a generic synonym for \'government rules\' and fail to distinguish between the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', 'Apartheid was a system of institutionalized racial segregation and discrimination', 'Mandela\'s inauguration on 10 May 1994 was the historic swearing-in ceremony where Nelson', 'The "Rainbow Gathering of Nations" refers to the historic inauguration ceremony on 10 May'],
                  hint: 'If stuck, review c9_engl_ch1_8 (Vocabulary in Context: Key Words from the Story) — practice finding.',
                  misconception: 'Students treat \'Constitution\' as a generic synonym for \'government rules\' and fail to distinguish between the *apartheid-era constitutional.' }
          ],
            remediations: { 'students-treat-constitution-as-a': { steps: ['Have the student locate every occurrence of \'Constitution\' in the chapter (there are 3-4).', 'For each, ask: "Who is the subject? What verb is used? What adjective modifies it?" (e.g., "we adopted", "the new.', 'Create a two-column table: "Pre-1994 context" vs "Post-1994 context".', 'Practice writing one sentence using \'Constitution\' correctly for each context.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
