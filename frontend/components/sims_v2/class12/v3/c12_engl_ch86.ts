import type { SimDef } from '../../engine/types';

/** v3 generated — c12_engl_ch86 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_engl_ch86: SimDef = {
    id: 'v3_c12_engl_ch86',
    title: 'A letter to the editor is a formal letter.',
    subtitle: 'This node covers the letter-to-the-editor genre. Complaint letters to offices share the.',
    classLevel: 12, subject: 'engl', topic: 'A letter to the editor is a formal letter.',
    chapters: ['c12_engl_ch86'],
    nodeIds: ['c12_engl_cbse_86_001', 'c12_engl_cbse_86_002', 'c12_engl_cbse_86_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: '1. Full formal skeleton first — sender\'s address, date, \'The Editor, [newspaper], [city]\', \'Sir/Madam\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A letter to the editor is a formal.', text: 'A letter to the editor is a formal letter written for publication — the complete formal skeleton addressed to \'The Editor\', the conventional opening (\'Through the columns of your esteemed daily,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_engl_cbse_86_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_engl_cbse_86_001', title: 'A letter to the editor is a formal.',
          caseStudy: { intro: '1. Full formal skeleton first — sender\'s address, date, \'The Editor, [newspaper], [city]\', \'Sir/Madam\', subject line. 2.',
            decisions: [{ prompt: 'Which opener fits a letter to the editor: \'Through the columns of your esteemed daily, I wish to draw attention to…\' or \'I wanna tell you.', options: [
                { text: 'The first — the conventional public-voice opener marks the genre', outcome: 'The first — the conventional public-voice opener marks the genre.' },
                { text: 'writing to a newspaper licenses emotional ranting', outcome: 'Not quite — Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.', reveals: 'writing-to-a-newspaper-licenses' }
            ] }] } },
        { type: 'case', nodeId: 'c12_engl_cbse_86_002', title: 'A Class 12 report demands precision on.',
          caseStudy: { intro: '1. Compress the lead to about 25 words: \'On 5 August, the school hosted its annual blood donation camp in the main hall.\' What-When-Where-Who, nothing else. 2.',
            decisions: [{ prompt: 'Which lead is board-grade: \'On 5 August, the school hosted its annual blood donation camp in the main hall\' or \'It was a wonderful morning.', options: [
                { text: 'The first — it compresses What-When-Where-Who into ~25 words with zero evaluation', outcome: 'The first — it compresses What-When-Where-Who into ~25 words with zero evaluation.' },
                { text: '\'detailed\' means \'evaluative\'', outcome: 'Not quite — Students think \'detailed\' means \'evaluative\' — every person \'very happy\', every event \'great\'.', reveals: 'detailed-means-evaluative-every-person' }
            ] }] } },
        { type: 'case', nodeId: 'c12_engl_cbse_86_003', title: 'A Class 12 article keeps the magazine.',
          caseStudy: { intro: '1. Plan before prose: for \'digital distraction\', map the angles — causes (notification design), effects (fractured attention), solutions (app limits.',
            decisions: [{ prompt: 'Which body-plan is stronger for \'Exam Stress\': three paragraphs each saying stress is harmful, or causes → effects → coping?', options: [
                { text: 'Causes → effects → coping', outcome: 'Causes → effects → coping — each paragraph carries a distinct angle, so the argument builds.' },
                { text: 'three full paragraphs automatically equal depth', outcome: 'Not quite — Students believe three full paragraphs automatically equal depth.', reveals: 'three-full-paragraphs-automatically-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_engl_cbse_86_003', title: 'You made it',
          caseStudy: { intro: 'You finished A letter to the editor is a formal letter. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_engl_cbse_86_001', difficulty: 'standard',
          question: 'A letter to the editor is a formal letter written for publication — the.',
          hint: 'Work step by step.',
          misconception: 'Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.',
          parts: [
                { id: 'a', prompt: 'Which opener fits a letter to the editor: \'Through the columns of your esteemed daily, I wish to draw attention to…\' or \'I wanna tell you about the traffic\'?', answer: 'The first — the conventional public-voice opener marks the genre',
                  options: ['The first — the conventional public-voice opener marks the genre', 'writing to a newspaper licenses emotional ranting'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.' },
                { id: 'b', prompt: 'Which close pairs correctly with a letter to the editor?', answer: '\'Yours sincerely\'',
                  options: ['\'Yours sincerely\'', 'writing to a newspaper licenses emotional ranting'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.' },
                { id: 'c', prompt: 'Fix the rant: \'The traffic is very bad and everyone is angry. Something must be done!!\'', answer: 'Reframe as beats: \'The junction at Mall Road has seen three accidents this month',
                  options: ['Reframe as beats: \'The junction at Mall Road has seen three accidents this month', 'writing to a newspaper licenses emotional ranting'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.' }
          ],
            remediations: { 'writing-to-a-newspaper-licenses': { steps: ['Rebuild the beats: state the issue with one concrete specific, add evidence (what happens, for how long, to whom), then.', 'Keep the whole inside the formal skeleton.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_engl_cbse_86_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.',
          parts: [
                { id: 'a', prompt: 'Fill in the blank: A letter to the editor is a formal letter with a ______ voice — the skeleton plus a public argument.', answer: 'public',
                  options: ['public', 'writing to a newspaper licenses emotional ranting'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think writing to a newspaper licenses emotional ranting — \'everyone is angry!!\'.' }
          ],
            remediations: { 'writing-to-a-newspaper-licenses': { steps: ['Rebuild the beats: state the issue with one concrete specific, add evidence (what happens, for how long, to whom), then.', 'Keep the whole inside the formal skeleton.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_engl_cbse_86_002', difficulty: 'standard',
          question: 'A Class 12 report demands precision on top of the pyramid: a lead of about 25.',
          hint: 'Work step by step.',
          misconception: 'Students think \'detailed\' means \'evaluative\' — every person \'very happy\', every event \'great\'.',
          parts: [
                { id: 'a', prompt: 'Fix for report register: \'We organized a great event and everyone loved it.\'', answer: '\'The event was organised by the student council and drew wide participation.\'',
                  options: ['\'The event was organised by the student council and drew wide participation.\'', '\'detailed\' means \'evaluative\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'detailed\' means \'evaluative\' — every person \'very happy\', every event \'great\'.' },
                { id: 'b', prompt: 'Fill in the blank: Objectivity mechanics — ______ voice removes the reporter: \'the winners were felicitated\'.', answer: 'passive',
                  options: ['passive', '\'detailed\' means \'evaluative\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'detailed\' means \'evaluative\' — every person \'very happy\', every event \'great\'.' }
          ],
            remediations: { 'detailed-means-evaluative-every-person': { steps: ['Shrink the lead to ~25 words of pure What-When-Where-Who; convert every \'we/I did\' to passive or objective third.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_engl_cbse_86_003', difficulty: 'standard',
          question: 'A Class 12 article keeps the magazine contract — title, byline, hook.',
          hint: 'Work step by step.',
          misconception: 'Students believe three full paragraphs automatically equal depth.',
          parts: [
                { id: 'a', prompt: 'Which body-plan is stronger for \'Exam Stress\': three paragraphs each saying stress is harmful, or causes → effects → coping?', answer: 'Causes → effects → coping',
                  options: ['Causes → effects → coping', 'three full paragraphs automatically equal depth'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe three full paragraphs automatically equal depth.' },
                { id: 'b', prompt: 'Which opener is article-grade: \'Every night, a million students stare at glowing screens\' or \'This article will discuss digital distraction\'?', answer: 'The first — it hooks with a scene',
                  options: ['The first — it hooks with a scene', 'three full paragraphs automatically equal depth'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe three full paragraphs automatically equal depth.' },
                { id: 'c', prompt: 'Is \'Exams are literally destroying our generation, no cap\' acceptable in a school-magazine article?', answer: 'No — voice is welcome, slang is not',
                  options: ['No — voice is welcome, slang is not', 'three full paragraphs automatically equal depth'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe three full paragraphs automatically equal depth.' }
          ],
            remediations: { 'three-full-paragraphs-automatically-equal': { steps: ['Draw the angle-map first — label each planned paragraph with its angle.', 'If two labels match, merge them and find a new angle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
