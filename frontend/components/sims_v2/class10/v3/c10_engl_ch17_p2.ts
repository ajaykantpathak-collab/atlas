import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch17_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch17_p2: SimDef = {
    id: 'v3_c10_engl_ch17_p2',
    title: 'Bholi · Part 2/2',
    subtitle: 'Watch a mocked girl find the one word that changes her life',
    classLevel: 10, subject: 'engl', topic: 'Bholi · Part 2/2',
    chapters: ['c10_engl_ch17'],
    nodeIds: ['c10_engl_cbse_17_007', 'c10_engl_cbse_17_008', 'c10_engl_cbse_17_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a neglected child discovering her own voice', intro: 'Everyone in the village calls you Bholi — the simpleton who fell off a cot, survived smallpox, and can barely speak. Then the new school opens, and a teacher speaks to you as if you are a person.', goal: 'Show how education and one caring teacher transform neglect into self-respect and moral courage.' },
    discovery: {
        question: 'Sulekha — called \'Bholi\' (simpleton) after a fall injured her brain and smallpox scarred her face — is the neglected, stammering daughter everyone mocks. At her own wedding, she refuses to marry the groom when he demands dowry money. What made the \'simpleton\' suddenly fearless?',
        options: ['Schooling — education gave her self-respect, words, and the courage to judge right from wrong', 'A hidden inheritance made her financially independent', 'Her father finally stood up for her first', 'The village elders ordered her to refuse'],
        answer: 'Schooling — education gave her self-respect, words, and the courage to judge right from wrong',
        hook: 'The girl who couldn\'t finish a sentence without stammering delivered the story\'s most complete sentence: \'No.\' Education didn\'t just teach her to read — it taught her she mattered.',
    },
    teaching: [
        { title: 'Theme: Education as Empowerment and Dignity of the Girl Child', text: 'The theme "Education as Empowerment and Dignity of the Girl Child" in *Bholi* refers to the central idea that formal schooling and supportive mentorship transform a marginalized, voiceless girl into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_17_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Grow up as the daughter nobody wants — scarred, stammering, mocked — then let a patient teacher rebuild you word by word until you can refuse an unjust marriage in front of the whole village.',
        labels: ['Theme: Education as Empowerment', 'Character Analysis: The Teacher\'s', 'Social Commentary: Dowry System'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_007', title: 'Theme: Education as Empowerment and Dignity of the Girl Child',
          caseStudy: { intro: 'Imagine the board exam asks: "How does education empower Bholi to claim her dignity?" Most students freeze because they try to narrate the whole story.',
            decisions: [{ prompt: 'State the core idea of the theme "Education as Empowerment and Dignity of the Girl Child" in one sentence, as you would define it for.', options: [
                { text: 'Correct answer: Education transforms Bholi from a voiceless, neglected girl into a', outcome: 'Correct answer: Education transforms Bholi from a voiceless, neglected girl into a confident young.' },
                { text: 'Bholi goes to school and learns to read', outcome: 'Not quite — Students equate "education" in *Bholi* solely with academic skills (reading/writing) and miss that.', reveals: 'students-equate-education-in-bholi' },
                { text: 'empowerment', outcome: 'Not quite — Students equate "education" in *Bholi* solely with academic skills (reading/writing) and miss that.', reveals: 'students-equate-education-in-bholi' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_008', title: 'Character Analysis: The Teacher\'s Role in Bholi\'s Transformation',
          caseStudy: { intro: 'Think of a teacher who changed your life — not by teaching a formula, but by making you believe you *could* learn.',
            decisions: [{ prompt: 'What is the teacher\'s name in the story *Bholi*, and what is the very first thing she does to make Bholi feel welcome on her first day.', options: [
                { text: 'The teacher is unnamed (referred to only as "the teacher" or "mistress")', outcome: 'The teacher is unnamed (referred to only as "the teacher" or "mistress").' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students conflate "the teacher taught her to read/write" with "the teacher transformed her." They.', reveals: 'students-conflate-the-teacher-taught' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A new girl joins the class and stammers when nervous. Within a week she has a mocking nickname, classmates finish her sentences for her, and she has stopped raising her hand. Some say the teasing is \'just harmless fun.\'',
            decisions: [{ prompt: 'What does \'Bholi\' reveal about what is happening to this girl?', options: [
                { text: 'The nickname is doing real damage — Sulekha was renamed \'Bholi\' until even she accepted the label, and her family\'s neglect hurt her as much as her stammer did. The story shows that mockery and low expectation are choices people make, and that respect plus education — the teacher who treated her as capable — is what lets a labelled child reclaim her real name.', outcome: 'Bholi\'s arc is about identity stolen by a label and recovered through dignity and learning — the classmates finishing the new girl\'s sentences are replaying her family\'s mistake.' },
                { text: 'The teasing is harmless — every kid gets a nickname, and it does not affect who she really is.', outcome: 'The whole story disagrees — \'Bholi\' swallowed \'Sulekha\'; a label repeated by everyone becomes the identity a child believes she deserves.', reveals: 'nicknames-are-harmless' },
                { text: 'The girl\'s stammer is the real problem — once it is fixed the teasing and self-doubt will vanish on their own.', outcome: 'Bholi\'s suffering came as much from being treated as a burden as from her stammer — speech improved only after a teacher first treated her with respect.', reveals: 'fix-the-stammer-first' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_009', title: 'You made it',
          caseStudy: { intro: 'They named her Bholi to mean \'simple.\' School renamed her Sulekha — a girl who could speak, judge, and say no to a greedy bridegroom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_007', difficulty: 'standard',
          question: 'The theme "Education as Empowerment and Dignity of the Girl Child" in *Bholi*.',
          hint: 'If stuck, review the PEEL template and re-read the three anchor scenes (nodes 003, 004.',
          misconception: 'Students equate "education" in *Bholi* solely with academic skills (reading/writing) and miss that the theme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme "Education as Empowerment and Dignity of the Girl Child" in *Bholi* refers to',
                  options: ['The theme "Education as Empowerment and Dignity of the Girl Child" in *Bholi* refers to', 'Bholi (originally named Sulekha) is the protagonist of the chapter, introduced as a', 'This node examines the pivotal incident where the Tehsildar (revenue officer) orders', 'This topic examines the pivotal events of Bholi\'s first day at school in the story'],
                  hint: 'If stuck, review the PEEL template and re-read the three anchor scenes (nodes 003, 004, 006) with.',
                  misconception: 'Students equate "education" in *Bholi* solely with academic skills (reading/writing) and miss that the theme encompasses *voice, critical.' }
          ],
            remediations: { 'students-equate-education-in-bholi': { steps: ['Re-read the three key scenes (first day, study months, wedding) with a highlighter marking only words showing *Bholi\'s.', 'Make a two-column table: Column A = "What education gave her" (voice, literacy, awareness); Column B = "What she did.', 'Practice one PEEL paragraph using only Column A→B pairs.', 'Verify each Point starts with "Education gave her..." not "The teacher gave her..."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_008', difficulty: 'standard',
          question: 'From \'simpleton\': the skill or concept this node teaches, applied to the actual.',
          hint: 'If stuck, re-read the **first day scene** (node 003) and list every adjective used for.',
          misconception: 'Students conflate "the teacher taught her to read/write" with "the teacher transformed her." They write: *"The teacher.',
          parts: [
                { id: 'a', prompt: 'What is the teacher\'s name in the story *Bholi*, and what is the very first thing she does to make Bholi feel welcome on her first day of school?', answer: 'The teacher is unnamed (referred to only as "the teacher" or "mistress")',
                  options: ['The teacher is unnamed (referred to only as "the teacher" or "mistress")', 'A wrong answer (e.g'],
                  hint: 'If stuck, re-read the **first day scene** (node 003) and list every adjective used for the.',
                  misconception: 'Students conflate "the teacher taught her to read/write" with "the teacher transformed her." They write: *"The teacher educated Bholi,.' }
          ],
            remediations: { 'students-conflate-the-teacher-taught': { steps: ['** Re-read the **first day scene** (node 003) and **transformation scene** (node 004) side-by-side.', '** Make a two-column table: Column A = Teacher\'s Action; Column B = Bholi\'s Resulting Change (immediate or long-term).', '** Practice the **PEEL paragraph** for one row: *Point*: The teacher\'s empathy created safety.', '** Repeat for "high expectations" and "long-term consistency." Do not proceed until you can write three distinct PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_009', difficulty: 'standard',
          question: 'Social commentary in literature refers to the author\'s critique of societal.',
          hint: 'Review the scene where Bishamber demands dowry and Bholi\'s response (node.',
          misconception: 'Students often think the story only criticizes dowry as a one-time demand, missing that the entire marriage market.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social commentary in literature refers to the author\'s critique of societal norms,',
                  options: ['Social commentary in literature refers to the author\'s critique of societal norms,', 'Bholi (originally named Sulekha) is the protagonist of the chapter, introduced as a', 'This node examines the pivotal incident where the Tehsildar (revenue officer) orders', 'This topic examines the pivotal events of Bholi\'s first day at school in the story'],
                  hint: 'Review the scene where Bishamber demands dowry and Bholi\'s response (node c10_engl_cbse_17_005 and.',
                  misconception: 'Students often think the story only criticizes dowry as a one-time demand, missing that the entire marriage market treats girls.' }
          ],
            remediations: { 'the-story-only-criticizes-dowry': { steps: ['If a student holds this misconception, guide them to re-read the conversation between Ramlal and his wife about Bholi\'s.', 'Ask: "Why is Ramlal happy about Bishamber\'s proposal initially?" Then connect to the teacher\'s role: education gave.', 'Use a T-chart: "Before Education" vs "After Education" to show the shift from object to subject.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
