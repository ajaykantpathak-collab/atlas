import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch05_p3: SimDef = {
    id: 'v3_c11_eng_h_ch05_p3',
    title: 'The Ailing Planet: the Green Movement\'s Role · Part 3/3',
    subtitle: 'Tell the Green Movement from the Green Revolution — then read an essay built like a closing argument.',
    classLevel: 11, subject: 'eng_h', topic: 'The Ailing Planet: the Green Movement\'s Role · Part 3/3',
    chapters: ['c11_eng_h_ch05'],
    nodeIds: ['c11_eng_h_cbse_05_013', 'c11_eng_h_cbse_05_014', 'c11_eng_h_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a jury member hearing the planet\'s case', intro: 'The patient says \'I feel fine\'; the blood tests show organ failure. Palkhivala is the doctor-lawyer presenting the chart.', goal: 'Situate the Green Movement historically and analyse the essay\'s argumentative structure.' },
    discovery: {
        question: 'A student writes: \'The Green Movement increased wheat yields in Punjab.\' What went wrong?',
        options: ['They merged two different things — the Green Movement is the post-1972 environmental conscience; the Green Revolution was the 1960s farm technology', 'Nothing — the movement directly raised yields', 'The yields rose but only in Kerala, not Punjab', 'The Green Movement was a farming subsidy scheme'],
        answer: 'They merged two different things — the Green Movement is the post-1972 environmental conscience; the Green Revolution was the 1960s farm technology',
        hook: 'Two \'greens,\' opposite directions — one fed the world quickly, the other asked what that feeding cost the planet.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Adventure\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_05_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read Palkhivala\'s essay as a legal brief — thesis, evidence, authorities, verdict — and spot where he borrows Thatcher\'s \'life tenancy\' and Brown\'s \'borrowed from our children.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Adventure\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the specific historical event that serves as the bifurcation point between the two worlds in "The Adventure," and what are the two.', options: [
                { text: 'The bifurcation point is the Battle of Panipat', outcome: 'The bifurcation point is the Battle of Panipat. In the torn Bakhar page (alternate world).' },
                { text: 'the 1857 revolt or the Independence movement', outcome: 'Not quite — Students often treat "The Adventure" as a simple time-travel story where Gaitonde "goes to the.', reveals: 'students-often-treat-the-adventure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Adventure\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the PEEL structure for writing a long-answer response in CBSE Class 11 English, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual quote or', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual quote or specific.' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the plot in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'step that examiners require for coherence', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the plot in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Adventure\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'List the three discussion prompts given in the "Talking about the text" section of the chapter.', options: [
                { text: 'The three prompts are: (i) A single event may change the course of history of a nation', outcome: 'The three prompts are: (i) A single event may change the course of history of a nation.' },
                { text: 'group discussion is just sharing opinions without evidence', outcome: 'Not quite — Students think group discussion is just sharing opinions without evidence.', reveals: 'group-discussion-is-just-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing an editorial for the school paper on \'the ailing planet\', a student drafts: \'The Green Movement that began in the 1960s fed millions by introducing high-yield wheat and fertilisers in Punjab — proof that the planet is healing.\'',
            decisions: [{ prompt: 'What confusion needs fixing before this goes to print?', options: [
                { text: 'Green Revolution ≠ Green Movement: the Revolution was a 1960s agricultural technology drive (HYV seeds, fertilisers) for food yield; the Movement began with the 1972 Stockholm Conference and champions sustainable development — and Palkhivala\'s article actually critiques the Revolution\'s ecological costs (chemical runoff, falling water tables). The draft praises the very thing the article warns about.', outcome: 'The two \'greens\' are nearly opposite in spirit: one maximises yield, the other asks whether present growth steals from future generations.' },
                { text: 'No fix needed — both are environmental efforts, so the example supports the editorial.', outcome: 'They\'re separable by date, method and goal; conflating them inverts the article\'s argument that yield-obsessed growth is part of the ailment.', reveals: 'green-movement-equals-revolution' },
                { text: 'The Movement is just about planting trees and saving tigers — keep the focus on wildlife.', outcome: 'Stockholm reframed ecology as planetary stewardship and intergenerational equity — a survival logic for economies, not a wildlife charity.', reveals: 'green-means-tigers-and-trees' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'A constitutional lawyer argued the planet\'s case like a court brief — and the verdict he wants is a duty, not a donation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Adventure\' — analysing the text to reach.',
          hint: 'If stuck, review the distinction between "plot summary" and "thematic analysis" using the.',
          misconception: 'Students often treat "The Adventure" as a simple time-travel story where Gaitonde "goes to the past" or "visits.',
          parts: [
                { id: 'a', prompt: 'What is the specific historical event that serves as the bifurcation point between the two worlds in "The Adventure," and what are the two contrasting outcomes.', answer: 'The bifurcation point is the Battle of Panipat',
                  options: ['The bifurcation point is the Battle of Panipat', 'the 1857 revolt or the Independence movement'],
                  hint: 'If stuck, review the distinction between "plot summary" and "thematic analysis" using the worked.',
                  misconception: 'Students often treat "The Adventure" as a simple time-travel story where Gaitonde "goes to the past" or "visits an alternate timeline" like.' },
                { id: 'b', prompt: 'Apply the concept of "lack of determinism in quantum theory" (as explained by Rajendra) to the following scenario: In World A, an electron is in a high-energy.', answer: 'In quantum theory, a system exists in a superposition of states until measured',
                  options: ['In quantum theory, a system exists in a superposition of states until measured', 'dreamt'],
                  hint: 'If stuck, review the distinction between "plot summary" and "thematic analysis" using the worked.',
                  misconception: 'Students often treat "The Adventure" as a simple time-travel story where Gaitonde "goes to the past" or "visits an alternate timeline" like.' }
          ],
            remediations: { 'students-often-treat-the-adventure': { steps: ['Re-read the final conversation between Gaitonde and Rajendra (pages 50-52) with a highlighter, marking every sentence.', 'Draw a two-column table: left column = "Our World (Gaitonde\'s memory)," right column = "Alternate World (Bakhar page).".', 'Explain aloud to a peer: "Why does Rajendra say Gaitonde didn\'t time-travel?', 'What does \'catastrophe\' mean here?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_014', difficulty: 'standard',
          question: 'Writing skills from \'The Adventure\' — using the text as a model or springboard.',
          hint: 'Review c11_eng_h_cbse_05_012 (inferential comprehension) and c11_eng_h_cbse_05_013.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot in their own words.',
          parts: [
                { id: 'a', prompt: 'In "The Adventure," Professor Gaitonde finds a torn page from *Bhausahebanchi Bakhar* showing Vishwasrao missed the bullet.', answer: 'For "alternate history," the torn page is Evidence proving the divergence point',
                  options: ['For "alternate history," the torn page is Evidence proving the divergence point', 'writing skills based on the chapter'],
                  hint: 'Review c11_eng_h_cbse_05_012 (inferential comprehension) and c11_eng_h_cbse_05_013 (critical.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot in their own words.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of an analytical/creative piece: (1) Highlight every sentence that merely.', 'volume five up to Aurangzeb\' — reveals a historian\'s discipline: he verifies before he speculates" (analysis).', '(4) Assign a 3-sentence rewrite using one quote + one inference.', 'Repeat until the student produces zero "narration-only" sentences.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot in their own words.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s opening for an article on "Science Meets History in \'The Adventure\'": "In Jayant Narlikar\'s story, a historian travels to a parallel.', answer: 'Ineffective',
                  options: ['Ineffective', 'writing skills based on the chapter'],
                  hint: 'Review c11_eng_h_cbse_05_012 (inferential comprehension) and c11_eng_h_cbse_05_013 (critical.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot in their own words.' },
                { id: 'b', prompt: 'Create a 50-word diary entry for Professor Gaitonde the night after returning to his world, capturing his regret about the Panipat seminar.', answer: '"October 12',
                  options: ['"October 12', 'writing skills based on the chapter'],
                  hint: 'Review c11_eng_h_cbse_05_012 (inferential comprehension) and c11_eng_h_cbse_05_013 (critical.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot in their own words.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of an analytical/creative piece: (1) Highlight every sentence that merely.', 'volume five up to Aurangzeb\' — reveals a historian\'s discipline: he verifies before he speculates" (analysis).', '(4) Assign a 3-sentence rewrite using one quote + one inference.', 'Repeat until the student produces zero "narration-only" sentences.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_015', difficulty: 'standard',
          question: 'Discussion points on \'The Adventure\' — speaking and listening around the text.',
          hint: 'If stuck, review the "Talking about the text" section in the textbook and the critical.',
          misconception: 'Students think group discussion is just sharing opinions without evidence.',
          parts: [
                { id: 'a', prompt: 'Using the PEEL structure, write a 2-minute speech arguing for or against: "A single event may change the course of history of a nation," using evidence from.', answer: 'Point: State your position clearly (e.g., "I agree")',
                  options: ['Point: State your position clearly (e.g., "I agree")', 'group discussion is just sharing opinions without evidence'],
                  hint: 'If stuck, review the "Talking about the text" section in the textbook and the critical thinking.',
                  misconception: 'Students think group discussion is just sharing opinions without evidence.' }
          ],
            remediations: { 'group-discussion-is-just-sharing': { steps: ['Model a fishbowl discussion with 4 students demonstrating PEEL arguments and active listening while the class observes.', 'Give sentence stems: "The text shows..." "Building on [name]\'s point..." "I see it differently because..." 3.', 'Practice paraphrasing: each speaker must summarize the previous speaker\'s point before adding their own.', 'Use a self-assessment rubric after discussion: Did I cite evidence?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
