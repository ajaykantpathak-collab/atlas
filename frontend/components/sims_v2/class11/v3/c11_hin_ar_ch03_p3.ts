import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p3',
    title: 'gfj\'kadj ijlkbZ · Part 3/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'gfj\'kadj ijlkbZ · Part 3/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_013', 'c11_hin_ar_cbse_03_014', 'c11_hin_ar_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the systematic process of examining a text\'s explicit and implicit meanings by evaluating evidence, identifying patterns, questioning assumptions, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re watching a play rehearsal where everything goes wrong — actors forget lines, props break, the director panics — but somehow the final.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "viw osQ lkFk <kbZ lky" and how does it shape the reader\'s understanding of the events?', options: [
                { text: 'The story uses a first-person participant narrator (the playwright himself) who is both', outcome: 'The story uses a first-person participant narrator (the playwright himself) who is both creator and.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often confuse "critical analysis" with "finding faults" — they list what went wrong in the.', reveals: 'students-often-confuse-critical-analysis' },
                { text: 'critical analysis', outcome: 'Not quite — Students often confuse "critical analysis" with "finding faults" — they list what went wrong in the.', reveals: 'students-often-confuse-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a theater group rehearsing a street play about a struggling artist — how would you convince your team to highlight the humor in failure.',
            decisions: [{ prompt: 'What is the primary objective of a \'discussion point\' activity in the CBSE ASL framework for a dramatic text like "viw osQ lkFk <kbZ lky"?', options: [
                { text: 'The primary objective is to assess', outcome: 'The primary objective is to assess a student\'s ability to orally analyze literary elements (theme.' },
                { text: 'to memorize dialogues', outcome: 'Not quite — Students treat "discussion points" as oral summaries — they retell the plot chronologically instead.', reveals: 'students-treat-discussion-points-as' },
                { text: 'to summarize the plot', outcome: 'Not quite — Students treat "discussion points" as oral summaries — they retell the plot chronologically instead.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the systematic process of examining.',
          hint: 'Review c11_hin_ar_cbse_03_006 (Theme: Primary Theme) and c11_hin_ar_cbse_03_008 (Literary.',
          misconception: 'Students often confuse "critical analysis" with "finding faults" — they list what went wrong in the rehearsal (broken.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how the child actors (playing "Hkwyks" and the orphans) and the adult actors (Jhfuokl, the director) respond to the rehearsal crises.', answer: 'The children respond with instinctive, embodied truth',
                  options: ['The children respond with instinctive, embodied truth', 'children cried, adults didn\'t', 'critical analysis', 'finding faults'],
                  hint: 'Review c11_hin_ar_cbse_03_006 (Theme: Primary Theme) and c11_hin_ar_cbse_03_008 (Literary Devices.',
                  misconception: 'Students often confuse "critical analysis" with "finding faults" — they list what went wrong in the rehearsal (broken props, bad weather.' }
          ],
            remediations: { 'students-often-confuse-critical-analysis': { steps: ['Ask the student to re-read the final paragraph where the narrator says "the play happened in the preparation" — have.', 'Create a two-column chart: left column "Rehearsal Disaster," right column "Artistic Revelation" — guide them to match.', 'Have them rewrite their "failure" paragraph as a "revelation" paragraph using the same facts but inverted perspective.', 'Connect to their own experience: "When did a \'messy\' process teach you more than a \'perfect\' result?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_014', difficulty: 'standard',
          question: 'Writing skills based on a literary chapter refer to the ability to compose.',
          hint: 'यदि फँसे तो c11_hin_ar_cbse_03_013 (Critical Thinking) पर लौटें और \'थीम-ट्रैकिंग\' चार्ट.',
          misconception: 'विद्यार्थी समझते हैं कि \'पाठ पर आधारित लेखन कौशल\' का अर्थ है **पाठ का सारांश लिखना** या **पात्रों के नाम गिनाना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on a literary chapter refer to the ability to compose structured,',
                  options: ['Writing skills based on a literary chapter refer to the ability to compose structured,', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and Narrative Structure refers to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'यदि फँसे तो c11_hin_ar_cbse_03_013 (Critical Thinking) पर लौटें और \'थीम-ट्रैकिंग\' चार्ट बनाएँ.',
                  misconception: 'विद्यार्थी समझते हैं कि \'पाठ पर आधारित लेखन कौशल\' का अर्थ है **पाठ का सारांश लिखना** या **पात्रों के नाम गिनाना**। वे PEEL संरचना को \'कठिन\'.' }
          ],
            remediations: { 'peel': { steps: ['विद्यार्थी से कहें: "एक बोर्ड प्रश्न चुनो। उसका उत्तर **बिना पाठ देखे** लिखो। फिर अपने उत्तर में तीन रंगों से चिह्नित.', 'यदि कोई रंग गायब है, वही चरण अभ्यास हेतु चुना जाए। 3.', 'उस चरण का मॉडल उत्तर दिखाएं (ऊपर दिए गए कार्य-उदाहरणों से)। 4.', 'विद्यार्थी को उसी प्रश्न का उत्तर पुनः लिखने दें, इस बार लापता चरण पर ध्यान देकर। 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review "Critical Thinking: Analysis and Interpretation".',
          misconception: 'Students treat "discussion points" as oral summaries — they retell the plot chronologically instead of analyzing.',
          parts: [
                { id: 'a', prompt: 'What is the primary objective of a \'discussion point\' activity in the CBSE ASL framework for a dramatic text like "viw osQ lkFk <kbZ lky"?', answer: 'The primary objective is to assess',
                  options: ['The primary objective is to assess', 'to memorize dialogues', 'to summarize the plot'],
                  hint: 'If stuck, review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_03_013).',
                  misconception: 'Students treat "discussion points" as oral summaries — they retell the plot chronologically instead of analyzing a focused theme, character.' },
                { id: 'b', prompt: 'Explain why the incident of the two different dogs playing "Hkwyks" (pages 36-37) is a more effective discussion starter than the playwright\'s description.', answer: 'The two-dog incident embodies dramatic irony, visual humor, and meta-theatrical',
                  options: ['The two-dog incident embodies dramatic irony, visual humor, and meta-theatrical', 'both are events in the story'],
                  hint: 'If stuck, review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_03_013).',
                  misconception: 'Students treat "discussion points" as oral summaries — they retell the plot chronologically instead of analyzing a focused theme, character.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Model a 60-second "bad discussion" (plot retelling) vs.', '"good discussion" (theme + evidence + question) using the same scene (e.g., the rain disruption).', 'Give students a Discussion Template card: "Claim → Evidence (page/line) → Analysis → Link to Theme → Question for.', 'Practice with low-stakes topics (e.g., "Best/worst rehearsal moment") before literary themes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
