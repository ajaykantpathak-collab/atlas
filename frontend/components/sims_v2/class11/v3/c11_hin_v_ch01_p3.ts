import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p3: SimDef = {
    id: 'v3_c11_hin_v_ch01_p3',
    title: 'tc lsD\'ku vkfI+kQlj · Part 3/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'tc lsD\'ku vkfI+kQlj · Part 3/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_013', 'c11_hin_v_cbse_01_014', 'c11_hin_v_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s arguments, evidence, and underlying assumptions to form an independent, reasoned judgment about its meaning.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are watching a heated debate between a novelist and a painter about which art form is "superior." The novelist argues words capture the inner soul.',
            decisions: [{ prompt: 'What is the central thesis (pramukh pratipadya) that the author, Upendranath Ashk, establishes in the essay "Hkkjrh; xkf;dkvksa esa.', options: [
                { text: 'The central thesis is that visual art (chitrakala) is the primal, more universal, and', outcome: 'The central thesis is that visual art (chitrakala) is the primal, more universal, and more.' },
                { text: 'both are equal', outcome: 'Not quite — Students often confuse **\'Critical Analysis\' with \'Finding Faults\' (Dos nikalna)**.', reveals: 'students-often-confuse-critical-analysis' },
                { text: 'literary art is superior', outcome: 'Not quite — Students often confuse **\'Critical Analysis\' with \'Finding Faults\' (Dos nikalna)**.', reveals: 'students-often-confuse-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 5-mark question: "How does Valmiki establish that visual art is not subordinate to literary art?" Most students freeze.',
            decisions: [{ prompt: 'What is the PEEL structure for writing analytical answers, and what does each letter stand for in the context of Hindi literary analysis?', options: [
                { text: 'PEEL stands for Point (main claim), Evidence (textual reference from the chapter),', outcome: 'PEEL stands for Point (main claim), Evidence (textual reference from the chapter), Explanation.' },
                { text: 'Point means topic sentence', outcome: 'Not quite — Students believe "writing based on the chapter" means summarizing the story or listing the author\'s.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students believe "writing based on the chapter" means summarizing the story or listing the author\'s.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are at a village haat (fair) and see a Madhubani painter selling work beside a classically trained artist — who decides which art is "superior"?',
            decisions: [{ prompt: 'What is the author\'s primary argument regarding the relationship between classical (shastriya) and folk (lok) painting in the essay?', options: [
                { text: 'The author argues that folk painting is not inferior to classical painting but possesses', outcome: 'The author argues that folk painting is not inferior to classical painting but possesses its own.' },
                { text: 'folk painting is simpler', outcome: 'Not quite — Students treat "discussion" as a round-robin of personal opinions ("I feel folk art is beautiful").', reveals: 'students-treat-discussion-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck, review **Node 006 (Primary Theme)** to re-identify the thesis, and **Node 012.',
          misconception: 'Students often confuse **\'Critical Analysis\' with \'Finding Faults\' (Dos nikalna)**.',
          parts: [
                { id: 'a', prompt: 'The author uses a personal anecdote about hearing a mysterious sound (Loj) in his room to introduce the artist Yaksh Eksadjak.', answer: 'The anecdote establishes that sound (Loj)',
                  options: ['The anecdote establishes that sound (Loj)', 'the author met a painter'],
                  hint: 'If stuck, review **Node 006 (Primary Theme)** to re-identify the thesis, and **Node 012.',
                  misconception: 'Students often confuse **\'Critical Analysis\' with \'Finding Faults\' (Dos nikalna)**.' }
          ],
            remediations: { 'students-often-confuse-critical-analysis': { steps: ['If a student writes a "fault-finding" response: 1.', '**Stop and Define**: Ask: "If a structural engineer \'critically analyzes\' a bridge, do they just say \'it\'s ugly\'?', 'No, they check load-bearing logic.', 'We are checking *argumentative load-bearing logic*." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck, review c11_hin_v_cbse_01_013 (Critical Thinking) to relearn how to extract.',
          misconception: 'Students believe "writing based on the chapter" means summarizing the story or listing the author\'s opinions.',
          parts: [
                { id: 'a', prompt: 'In Valmiki\'s essay, he argues that visual art creates "xkuiu" (aesthetic experience) through three feuV (brushstrokes).', answer: 'The three feuV are Loj (sound), y',
                  options: ['The three feuV are Loj (sound), y', 'color, line, shape', 'writing based on the chapter'],
                  hint: 'If stuck, review c11_hin_v_cbse_01_013 (Critical Thinking) to relearn how to extract arguable.',
                  misconception: 'Students believe "writing based on the chapter" means summarizing the story or listing the author\'s opinions.' },
                { id: 'b', prompt: 'Compare the author\'s view of the artist\'s relationship with society in visual art versus literary art.', answer: 'The author argues visual art is inherently democratic',
                  options: ['The author argues visual art is inherently democratic', 'more people see paintings than read books', 'writing based on the chapter'],
                  hint: 'If stuck, review c11_hin_v_cbse_01_013 (Critical Thinking) to relearn how to extract arguable.',
                  misconception: 'Students believe "writing based on the chapter" means summarizing the story or listing the author\'s opinions.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student writes summary instead of analysis: (1) Have them highlight every sentence in their answer — if.', '(2) Give them a 3-column template: Column 1 = Claim, Column 2 = Quote/Reference (para #), Column 3 = Explanation of how.', '(3) Practice converting one summary sentence into PEEL: "Visual art reaches everyone" → Point: "Visual art.', 'vkèks rkyksa\'" | Explanation: "Illiterate audiences access art through rhythm/color without literacy barrier" | Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing based on the chapter" means summarizing the story or listing the author\'s opinions.',
          parts: [
                { id: 'a', prompt: 'Critique this student claim: "Valmiki says visual art is better than literary art because it uses color and sound." Is this an accurate representation of the.', answer: 'No, this misrepresents the thesis',
                  options: ['No, this misrepresents the thesis', 'different but equal', 'better', 'writing based on the chapter'],
                  hint: 'If stuck, review c11_hin_v_cbse_01_013 (Critical Thinking) to relearn how to extract arguable.',
                  misconception: 'Students believe "writing based on the chapter" means summarizing the story or listing the author\'s opinions.' },
                { id: 'b', prompt: 'Draft a 100-word response to: "Explain how Valmiki\'s personal experience with the painter Yeark Eakselji illustrates his theoretical position on visual art.".', answer: 'A strong response: Valmiki\'s encounter with Yeark begins with sensory immersion',
                  options: ['A strong response: Valmiki\'s encounter with Yeark begins with sensory immersion', 'writing based on the chapter'],
                  hint: 'If stuck, review c11_hin_v_cbse_01_013 (Critical Thinking) to relearn how to extract arguable.',
                  misconception: 'Students believe "writing based on the chapter" means summarizing the story or listing the author\'s opinions.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student writes summary instead of analysis: (1) Have them highlight every sentence in their answer — if.', '(2) Give them a 3-column template: Column 1 = Claim, Column 2 = Quote/Reference (para #), Column 3 = Explanation of how.', '(3) Practice converting one summary sentence into PEEL: "Visual art reaches everyone" → Point: "Visual art.', 'vkèks rkyksa\'" | Explanation: "Illiterate audiences access art through rhythm/color without literacy barrier" | Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the "Theme: Primary Theme and Message" (c11_hin_v_cbse_01_006) and.',
          misconception: 'Students treat "discussion" as a round-robin of personal opinions ("I feel folk art is beautiful") rather than.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author rejects the question "What is the place of folk painting in classical literature?" as invalid.', answer: 'The author rejects the question',
                  options: ['The author rejects the question', 'because folk painting is not in books'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" (c11_hin_v_cbse_01_006) and "Literary.',
                  misconception: 'Students treat "discussion" as a round-robin of personal opinions ("I feel folk art is beautiful") rather than a textual interrogation.' },
                { id: 'b', prompt: 'Compare the author\'s view of "xuiu" (spontaneity/creative impulse) in folk painting with its role in classical painting as implied in the text.', answer: 'In folk painting, xuiu is the *primary driving force* (mul adhar)',
                  options: ['In folk painting, xuiu is the *primary driving force* (mul adhar)', 'inspiration'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" (c11_hin_v_cbse_01_006) and "Literary.',
                  misconception: 'Students treat "discussion" as a round-robin of personal opinions ("I feel folk art is beautiful") rather than a textual interrogation.' }
          ],
            remediations: { 'students-treat-discussion-as-a': { steps: ['**Interrupt the opinion loop**: When a student offers an unsupported view, say: "That\'s an interesting reaction — now.', '**Model the move**: Take their idea, locate the textual anchor yourself aloud ("Here in para 3, Verma writes.', '**Anchor chart**: Post a 3-step stem on the board: *Claim → "In paragraph X, Verma writes..." → "This means..."*.', '**Peer-enforce**: Assign a "Textual Evidence Monitor" in each group whose only job is to tap the table when a claim.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
