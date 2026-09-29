import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch03_p3: SimDef = {
    id: 'v3_c12_eng_k_ch03_p3',
    title: 'A Wedding in Brownsville (Short Story) · Part 3/3',
    subtitle: 'At a Brooklyn wedding, the dead take a seat',
    classLevel: 12, subject: 'eng_k', topic: 'A Wedding in Brownsville (Short Story) · Part 3/3',
    chapters: ['c12_eng_k_ch03'],
    nodeIds: ['c12_eng_k_cbse_03_013', 'c12_eng_k_cbse_03_014', 'c12_eng_k_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Jewish literature scholar', intro: 'A Yiddish Nobel laureate sends a tired doctor to a wedding where the guest list includes the dead.', goal: 'Read A Wedding in Brownsville through Holocaust memory, landsmanshaft culture and Singer\'s purposeful surrealism.' },
    discovery: {
        question: 'Dr. Margolin goes to a landsman\'s wedding in Brownsville and meets Raizel — the love he watched die in the Holocaust. A student calls it \'just a dream sequence, doesn\'t count.\' What\'s the flaw?',
        options: ['In Singer\'s surrealism the unreal carries historical truth — trauma blurs life and death for survivors, so the impossible encounter is the most honest realism available', 'None — it was clearly all a dream', 'Raizel survived secretly', 'Weddings cause hallucinations'],
        answer: 'In Singer\'s surrealism the unreal carries historical truth — trauma blurs life and death for survivors, so the impossible encounter is the most honest realism available',
        hook: 'The wedding is no celebration — for a community of shtetl survivors it\'s \'a feast of poisons,\' a ritual of memory. And the landsmanshaft matters: when your town was erased, the people from it become your only family. Surrealism is the only form big enough for what they carry.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'A Wedding in Brownsville\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Senciminer wedding as an outsider-turned-insider: decode the landsman ties, weigh Margolin\'s survivor\'s guilt against the community\'s defiant noise, and follow the taxi into the World of Twilight.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'A Wedding in Brownsville\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the definition of surrealism as a literary movement, and which element in "A Wedding in Brownsville" most clearly exemplifies it?', options: [
                { text: 'Surrealism seeks to express the unconscious mind through illogical, dream-like', outcome: 'Surrealism seeks to express the unconscious mind through illogical, dream-like juxtapositions that.' },
                { text: 'the wedding food descriptions', outcome: 'Not quite — Students often treat the story as a binary puzzle: "Is Raizel real or a hallucination?" They miss.', reveals: 'students-often-treat-the-story' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'A Wedding in Brownsville\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'Define the PEEL structure for literary analysis answers and state what each letter stands for in the context of answering a question on "A.', options: [
                { text: 'PEEL stands for: P', outcome: 'PEEL stands for: P — Point (topic sentence answering the question directly, e.g., "Singer uses.' },
                { text: 'PEEL means Point, Example, Explain, Link', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means summarising the story or writing.', reveals: 'writing-skills-based-on-the' },
                { text: 'Writing Skills based on the chapter', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means summarising the story or writing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'A Wedding in Brownsville\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the two discussion topics explicitly given in the NCERT "Talking about the Text" section for this story?', options: [
                { text: 'The two topics are: (1) Fiction often deals with human consciousness, rather than with', outcome: 'The two topics are: (1) Fiction often deals with human consciousness, rather than with the reality.' },
                { text: 'identity', outcome: 'Not quite — Students treat "discussion" as a round-robin of personal opinions ("I think the story is sad").', reveals: 'students-treat-discussion-as-a' },
                { text: 'themes like "love" or "identity', outcome: 'Not quite — Students treat "discussion" as a round-robin of personal opinions ("I think the story is sad").', reveals: 'students-treat-discussion-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family wedding, an uncle who survived a violent displacement years ago freezes mid-dance, seeing faces that aren\'t there. Relatives hiss, \'it\'s been decades — move on.\'',
            decisions: [{ prompt: 'What does Singer\'s survivor-wedding story suggest instead?', options: [
                { text: 'Acknowledge it gently — \'A Wedding in Brownsville\' shows the dead return uninvited at celebrations; trauma intrudes on joy, and recognition helps more than \'get over it\'.', outcome: 'Survivor memory isn\'t a malfunction to suppress — the story treats the apparition as real grief doing its work.' },
                { text: 'They\'re right — decades should have healed it; the freeze is self-indulgence.', outcome: 'Time doesn\'t auto-delete trauma; the story\'s whole point is that annihilated worlds stay present at the feast.', reveals: 'time-heals-trauma-automatically' },
                { text: 'Whisk him away and never mention it — silence is kindest.', outcome: 'Pretending it didn\'t happen isolates the survivor further; the enclave exists precisely because shared memory needs company.', reveals: 'silence-as-care' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now read surrealism as testimony — the form Singer needed because the Holocaust broke reality itself. Few chapters reward close reading like this one.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking on \'A Wedding in Brownsville\' — analysing the text to reach.',
          hint: 'If unable to move beyond plot summary, revisit the distinction between *literal.',
          misconception: 'Students often treat the story as a binary puzzle: "Is Raizel real or a hallucination?" They miss that Singer.',
          parts: [
                { id: 'a', prompt: 'What is the definition of surrealism as a literary movement, and which element in "A Wedding in Brownsville" most clearly exemplifies it?', answer: 'Surrealism seeks to express the unconscious mind through illogical, dream-like',
                  options: ['Surrealism seeks to express the unconscious mind through illogical, dream-like', 'the wedding food descriptions'],
                  hint: 'If unable to move beyond plot summary, revisit the distinction between *literal comprehension*.',
                  misconception: 'Students often treat the story as a binary puzzle: "Is Raizel real or a hallucination?" They miss that Singer deliberately constructs.' },
                { id: 'b', prompt: 'Explain in your own words why Dr. Margolin feels "ashamed" when taking Gretl to Jewish celebrations, and what this reveals about his identity conflict.', answer: 'Margolin is ashamed',
                  options: ['Margolin is ashamed', 'he dislikes the food'],
                  hint: 'If unable to move beyond plot summary, revisit the distinction between *literal comprehension*.',
                  misconception: 'Students often treat the story as a binary puzzle: "Is Raizel real or a hallucination?" They miss that Singer deliberately constructs.' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Re-read the "Stop and Think" questions in the NCERT text (pages 25, 28, 31, 34) — they scaffold the ambiguity.', 'Create a two-column chart: Column A = "Evidence Margolin is alive at the wedding"; Column B = "Evidence Margolin.', 'Discuss with a peer: "Why does Singer give equal weight to both columns?" 4.', 'Re-attempt Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the story as a binary puzzle: "Is Raizel real or a hallucination?" They miss that Singer.',
          parts: [
                { id: 'a', prompt: 'Evaluate the interpretation that Margolin\'s encounter with Raizel is "just a dream." Defend or refute using evidence from the chapel scene (from "Leaving the.', answer: 'Refute',
                  options: ['Refute', 'just a dream'],
                  hint: 'If unable to move beyond plot summary, revisit the distinction between *literal comprehension*.',
                  misconception: 'Students often treat the story as a binary puzzle: "Is Raizel real or a hallucination?" They miss that Singer deliberately constructs.' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Re-read the "Stop and Think" questions in the NCERT text (pages 25, 28, 31, 34) — they scaffold the ambiguity.', 'Create a two-column chart: Column A = "Evidence Margolin is alive at the wedding"; Column B = "Evidence Margolin.', 'Discuss with a peer: "Why does Singer give equal weight to both columns?" 4.', 'Re-attempt Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_014', difficulty: 'standard',
          question: 'Writing skills from \'A Wedding in Brownsville\' — using the text as a model.',
          hint: 'If stuck on evidence selection: return to c12_eng_k_cbse_03_012 (Comprehension) and re-do.',
          misconception: 'Students believe "Writing Skills based on the chapter" means summarising the story or writing character sketches.',
          parts: [
                { id: 'a', prompt: 'Define the PEEL structure for literary analysis answers and state what each letter stands for in the context of answering a question on "A Wedding.', answer: 'PEEL stands for: P',
                  options: ['PEEL stands for: P', 'PEEL means Point, Example, Explain, Link', 'Writing Skills based on the chapter'],
                  hint: 'If stuck on evidence selection: return to c12_eng_k_cbse_03_012 (Comprehension) and re-do the.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means summarising the story or writing character sketches in isolation.' },
                { id: 'b', prompt: 'A student writes: "Dr Margolin is a tragic character because he lost his family in the Holocaust and his true love Raizel died." Identify the specific weakness.', answer: 'The answer states facts but lacks ANALYSIS',
                  options: ['The answer states facts but lacks ANALYSIS', 'Writing Skills based on the chapter'],
                  hint: 'If stuck on evidence selection: return to c12_eng_k_cbse_03_012 (Comprehension) and re-do the.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means summarising the story or writing character sketches in isolation.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits narrative summary instead of analysis: (1) Highlight every sentence that recounts plot events.', '(2) Ask: "What is your ARGUMENT about this event?" — force a Point sentence.', '(3) Have them replace each yellow sentence with: "This moment demonstrates [theme/device] because [analysis]." (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_015', difficulty: 'standard',
          question: 'Discussion points on \'A Wedding in Brownsville\' — speaking and listening around.',
          hint: 'If stuck, review the "Talking about the Text" section in the NCERT and the Critical.',
          misconception: 'Students treat "discussion" as a round-robin of personal opinions ("I think the story is sad") without anchoring.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what the first discussion topic means: "Fiction often deals with human consciousness, rather than with the reality of existence."', answer: 'The topic asks whether the story prioritizes Dr',
                  options: ['The topic asks whether the story prioritizes Dr', 'consciousness', 'fiction'],
                  hint: 'If stuck, review the "Talking about the Text" section in the NCERT and the Critical Thinking node.',
                  misconception: 'Students treat "discussion" as a round-robin of personal opinions ("I think the story is sad") without anchoring comments in specific.' }
          ],
            remediations: { 'students-treat-discussion-as-a': { steps: ['Revisit c12_eng_k_cbse_03_006 (Primary Theme) and c12_eng_k_cbse_03_007 (Secondary Themes) to gather textual evidence.', 'Pair with a peer; practice the "Point-Evidence-Explanation-Link" structure for one prompt, timing each turn to 90.', 'Record the exchange, then replay to check if each speaker referenced a line, responded to the previous speaker, and.', 'Return to the group with two prepared evidence cards.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
