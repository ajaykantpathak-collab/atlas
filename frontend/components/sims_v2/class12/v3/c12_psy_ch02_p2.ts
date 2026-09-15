import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch02_p2: SimDef = {
    id: 'v3_c12_psy_ch02_p2',
    title: 'Self and Personality · Part 2/2',
    subtitle: 'The self that writes and the self that\'s written',
    classLevel: 12, subject: 'psychology', topic: 'Self and Personality · Part 2/2',
    chapters: ['c12_psy_ch02'],
    nodeIds: ['c12_psy_cbse_02_007', 'c12_psy_cbse_02_008', 'c12_psy_cbse_02_009', 'c12_psy_cbse_02_010', 'c12_psy_cbse_02_011', 'c12_psy_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Identity mapper', intro: 'You wrote \'describe yourself in 50 words\' — and smuggled in two kinds of identity and a dual role for the self.', goal: 'Distinguish personal from social identity — and the self as subject and object across cultures.' },
    discovery: {
        question: '\'I am honest, a Hindu, a classical dancer, a daughter.\' A student files \'honest\' under social identity and \'Hindu\' under personal. What\'s backwards?',
        options: ['The criterion — personal identity is what individuates you (honest, dancer); social identity is group membership (Hindu, daughter). They swapped them', 'Both are social', 'Hindu is personal', 'Dancer is social'],
        answer: 'The criterion — personal identity is what individuates you (honest, dancer); social identity is group membership (Hindu, daughter). They swapped them',
        hook: 'The self is both the writer and the written — \'I am studying\' is subject; \'I am a student who procrastinates\' is object. And the Indian self-boundary shifts: it expands to include family at a festival, contracts to career in an interview — context moves the border, not the self.',
    },
    teaching: [
        { title: 'Freud\'s Psychodynamic Approach: Levels of Consciousness and Id, Ego, Superego', text: 'Freud\'s psychodynamic approach conceptualizes the mind as having three levels of consciousness (conscious, preconscious, unconscious) and personality as structured by three interacting systems: the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map a self-description: split personal from social identity, catch subject and object working in one sentence, and weigh how fixed versus shifting boundaries turn family-over-career into guilt in one culture and fulfilment in another.',
        labels: ['Freud\'s Psychodynamic Approach: Levels', 'Ego Defence Mechanisms: Repression,', 'Freud\'s Psychosexual Stages: Oral,', 'Post-Freudian Approaches: Jung, Horney,', 'Humanistic Approach: Rogers\' Self-Theory,', 'Assessment of Personality: Self-report'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_007', title: 'Freud\'s Psychodynamic Approach: Levels of Consciousness and Id, Ego, Superego',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who sees an unattended wallet on a bench.',
            decisions: [{ prompt: 'A student writes: "The unconscious mind contains all our repressed memories, while the preconscious contains memories we are currently.', options: [
                { text: 'Correct answer: (1) The preconscious contains memories/thoughts NOT currently in', outcome: 'Correct answer: (1) The preconscious contains memories/thoughts NOT currently in awareness but.' },
                { text: 'preconscious', outcome: 'Not quite — Students consistently confuse the superego with "conscience" alone and the id with "bad desires.".', reveals: 'students-consistently-confuse-the-superego' },
                { text: 'current focus of attention', outcome: 'Not quite — Students consistently confuse the superego with "conscience" alone and the id with "bad desires.".', reveals: 'students-consistently-confuse-the-superego' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_009', title: 'Freud\'s Psychosexual Stages: Oral, Anal, Phallic, Latency and Genital',
          caseStudy: { intro: 'Imagine a 4‑year‑old who insists on wearing only superhero capes and becomes furious when asked to use the toilet independently.',
            decisions: [{ prompt: 'List the five psychosexual stages in correct developmental order and give the approximate age range for each.', options: [
                { text: 'Oral (0‑18 months), Anal (18‑36 months), Phallic (3‑6 years), Latency (6‑12 years),', outcome: 'Oral (0‑18 months), Anal (18‑36 months), Phallic (3‑6 years), Latency (6‑12 years), Genital.' },
                { text: 'fixation', outcome: 'Not quite — Students often think “fixation” means the person literally behaves like a child of that stage.', reveals: 'fixation-means-the-person-literally' },
                { text: '“fixation” means the person literally behaves like a child of that stage (e', outcome: 'Not quite — Students often think “fixation” means the person literally behaves like a child of that stage.', reveals: 'fixation-means-the-person-literally' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_010', title: 'Post-Freudian Approaches: Jung, Horney, Adler, Fromm and Erikson',
          caseStudy: { intro: 'Imagine a 16-year-old who feels "fundamentally flawed" and compulsively seeks validation on social media — Freud would trace this to unresolved phallic-stage.',
            decisions: [{ prompt: 'Name the post-Freudian theorist who proposed the "collective unconscious" containing inherited "archetypes," and give one example of.', options: [
                { text: 'Carl Jung; example: God or Mother Earth', outcome: 'Carl Jung; example: God or Mother Earth. A wrong answer (e.g., "Adler" or "personal unconscious").' },
                { text: 'personal unconscious', outcome: 'Not quite — Students routinely write "Jung agreed with Freud on the unconscious but added the collective.', reveals: 'students-routinely-write-jung-agreed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_012', title: 'Assessment of Personality: Self-report Measures (MMPI, EPQ, 16PF) and Projective Techniques (Rorschach, TAT)',
          caseStudy: { intro: 'Imagine a school counsellor trying to understand why a Class 12 student suddenly stops attending classes and withdraws from friends.',
            decisions: [{ prompt: 'What is the fundamental assumption behind projective techniques that distinguishes them from self-report measures?', options: [
                { text: 'Projective techniques assume that when presented with unstructured or ambiguous stimuli,', outcome: 'Projective techniques assume that when presented with unstructured or ambiguous stimuli.' },
                { text: 'projective techniques are more objective', outcome: 'Not quite — Students often believe that "projective tests are just unscientific versions of personality.', reveals: 'projective-tests-are-just-unscientific' },
                { text: 'they measure the same traits as questionnaires', outcome: 'Not quite — Students often believe that "projective tests are just unscientific versions of personality.', reveals: 'projective-tests-are-just-unscientific' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate spiralling before boards says three things: \'I\'m basically a failure,\' \'I can\'t crack organic chemistry no matter what,\' and \'I keep scrolling instead of revising.\'',
            decisions: [{ prompt: 'Map the three complaints to the three constructs correctly.', options: [
                { text: 'Self-esteem (\'I\'m a failure\' — global worth), self-efficacy (\'can\'t crack organic chem\' — domain-specific capability belief), and self-regulation (scrolling — the monitoring/directing process breaking down); three different levers, three different fixes.', outcome: 'The chapter\'s triage: evaluation of worth, belief about a specific task, and control of behaviour are distinct — \'he lacks confidence\' flattens all three into one vague problem.' },
                { text: 'All three are low self-esteem — the chemistry and scrolling are just symptoms.', outcome: 'Domain-specific doubt and failed self-monitoring aren\'t global worth judgments — a student can have intact self-esteem and still lack efficacy in chemistry; collapsing them loses the diagnosis the constructs exist to give.', reveals: 'everything-is-self-esteem' },
                { text: 'All three are poor self-regulation — fixing the scrolling fixes the rest.', outcome: 'Regulation directs behaviour but doesn\'t rewrite self-belief — better habits won\'t touch \'I\'m a failure\' or the specific efficacy doubt; the constructs travel together without being the same thing.', reveals: 'habits-fix-beliefs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You can now dissect \'who am I\' into its parts — and see the boundary around \'I\' as something culture taught you to draw.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_007', difficulty: 'standard',
          question: 'Freud\'s psychodynamic approach conceptualizes the mind as having three levels.',
          hint: 'Revisit c11_psy_cbse_01_008 (Psychoanalysis: Freud and the Unconscious Mind) for the.',
          misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The unconscious mind contains all our repressed memories, while the preconscious contains memories we are currently thinking about.".', answer: 'Correct answer: (1) The preconscious contains memories/thoughts NOT currently in',
                  options: ['Correct answer: (1) The preconscious contains memories/thoughts NOT currently in', 'preconscious', 'current focus of attention', 'conscience'],
                  hint: 'Revisit c11_psy_cbse_01_008 (Psychoanalysis: Freud and the Unconscious Mind) for the topographical.',
                  misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The superego tells you right.' },
                { id: 'b', prompt: '"Rahul is on a strict diet. He walks past a bakery and smells fresh chocolate cake.', answer: 'Correct answer: The urge originates in the id (pleasure principle',
                  options: ['Correct answer: The urge originates in the id (pleasure principle', 'conscience', 'bad desires', 'The superego tells you right from wrong'],
                  hint: 'Revisit c11_psy_cbse_01_008 (Psychoanalysis: Freud and the Unconscious Mind) for the topographical.',
                  misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The superego tells you right.' },
                { id: 'c', prompt: 'Compare and contrast the "pleasure principle" and "reality principle" in terms of: (a) time orientation, (b) relationship to external world, (c) primary goal.', answer: 'Correct answer: (a) Pleasure principle: immediate/present',
                  options: ['Correct answer: (a) Pleasure principle: immediate/present', 'conscience', 'bad desires', 'The superego tells you right from wrong'],
                  hint: 'Revisit c11_psy_cbse_01_008 (Psychoanalysis: Freud and the Unconscious Mind) for the topographical.',
                  misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The superego tells you right.' }
          ],
            remediations: { 'students-consistently-confuse-the-superego': { steps: ['Re-read the NCERT paragraphs on "Levels of Consciousness" and "Structure of Personality" (pages 33-35).', 'Draw a two-column table: Column A = Id/Ego/Superego; Column B = Operating Principle / Time Focus / Source of Energy.', 'Take the wallet scenario from the Walkthrough and write a 4-sentence analysis labeling each system\'s role.', 'Attempt Diagnostic Questions 2 and 4 again. If errors persist, revisit Class 11 node c11_psy_cbse_01_008.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement from a Freudian perspective: "A psychologically healthy person has a strong superego that completely controls the id so the.', answer: 'Correct answer: This statement is incorrect in Freudian theory',
                  options: ['Correct answer: This statement is incorrect in Freudian theory', 'superego = good, id = bad', 'conscience', 'bad desires'],
                  hint: 'Revisit c11_psy_cbse_01_008 (Psychoanalysis: Freud and the Unconscious Mind) for the topographical.',
                  misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The superego tells you right.' },
                { id: 'b', prompt: 'Create a brief original scenario (3-4 sentences) involving a Class 12 student facing a moral dilemma (e.g., cheating, lying to parents, bullying).', answer: 'Expected answer: Scenario example',
                  options: ['Expected answer: Scenario example', 'conscience', 'bad desires', 'The superego tells you right from wrong'],
                  hint: 'Revisit c11_psy_cbse_01_008 (Psychoanalysis: Freud and the Unconscious Mind) for the topographical.',
                  misconception: 'Students consistently confuse the superego with "conscience" alone and the id with "bad desires." They write: "The superego tells you right.' }
          ],
            remediations: { 'students-consistently-confuse-the-superego': { steps: ['Re-read the NCERT paragraphs on "Levels of Consciousness" and "Structure of Personality" (pages 33-35).', 'Draw a two-column table: Column A = Id/Ego/Superego; Column B = Operating Principle / Time Focus / Source of Energy.', 'Take the wallet scenario from the Walkthrough and write a 4-sentence analysis labeling each system\'s role.', 'Attempt Diagnostic Questions 2 and 4 again. If errors persist, revisit Class 11 node c11_psy_cbse_01_008.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_008', difficulty: 'standard',
          question: 'Ego defence mechanisms are unconscious psychological strategies employed by the.',
          hint: 'Revisit c12_psy_cbse_02_007 and practice mapping 5 scenarios to the specific anxiety type.',
          misconception: 'Students frequently confuse **rationalisation** with **lying** or **conscious excuse-making**.',
          parts: [
                { id: 'a', prompt: 'A student who habitually cheats in exams strongly believes that "everyone else cheats too" and gets angry when others talk about academic integrity.', answer: 'The student\'s own unacceptable impulse (cheating/dishonesty) creates anxiety',
                  options: ['The student\'s own unacceptable impulse (cheating/dishonesty) creates anxiety', 'the student is just justifying their behaviour'],
                  hint: 'Revisit c12_psy_cbse_02_007 and practice mapping 5 scenarios to the specific anxiety type (e.g.',
                  misconception: 'Students frequently confuse **rationalisation** with **lying** or **conscious excuse-making**.' },
                { id: 'b', prompt: 'Compare and contrast \'denial\' and \'rationalisation\' in terms of: (a) the level of reality distortion, (b) the role of conscious awareness, and (c) the type.', answer: 'the level of reality distortion, (',
                  options: ['the level of reality distortion, (', 'both are excuses', 'it didn\'t happen', 'it happened but for a good reason'],
                  hint: 'Revisit c12_psy_cbse_02_007 and practice mapping 5 scenarios to the specific anxiety type (e.g.',
                  misconception: 'Students frequently confuse **rationalisation** with **lying** or **conscious excuse-making**.' }
          ],
            remediations: { 'students-frequently-confuse-rationalisation-with': { steps: ['If a student cannot distinguish the mechanisms: 1.', '**Revisit c12_psy_cbse_02_007** (Freud\'s Psychodynamic Approach) and re-learn the **id-ego-superego conflict** and.', 'Defence mechanisms are the ego\'s specific responses to these anxieties.', 'Create a **comparison table** with columns: Mechanism | Unconscious Impulse/Anxiety | Distortion Process | Conscious.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_009', difficulty: 'standard',
          question: 'Freud\'s psychosexual stages are five sequential developmental phases (oral.',
          hint: 'If stuck, revisit c12_psy_cbse_02_007 (id/ego/superego dynamics) and c12_psy_cbse_02_008.',
          misconception: 'Students often think “fixation” means the person literally behaves like a child of that stage (e.g., an orally fixated.',
          parts: [
                { id: 'a', prompt: 'A preschooler refuses to let anyone else flush the toilet after a bowel movement, insisting on doing it themselves, and throws tantrums if interrupted.', answer: 'Stage: Anal (18‑36 months)',
                  options: ['Stage: Anal (18‑36 months)', 'fixation', '“fixation” means the person literally behaves like a child of that stage (e'],
                  hint: 'If stuck, revisit c12_psy_cbse_02_007 (id/ego/superego dynamics) and c12_psy_cbse_02_008 (defence.',
                  misconception: 'Students often think “fixation” means the person literally behaves like a child of that stage (e.g., an orally fixated adult crawls and.' }
          ],
            remediations: { 'fixation-means-the-person-literally': { steps: ['Re‑read the “Stages of Personality Development” section in NCERT (Chapter 2, pages 36‑37).', 'Make a five‑column table: Stage | Age | Erogenous Zone | Conflict | Fixation Outcomes (two per stage).', 'For each stage, write one symbolic adult behaviour (not childish behaviour) that illustrates each fixation outcome.', 'Test yourself with the diagnostic questions above; if any answer is incomplete, return to the table and add the missing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_010', difficulty: 'standard',
          question: 'Post-Freudian approaches are neo-analytic theories that modify Freud\'s.',
          hint: 'Revisit c12_psy_cbse_02_007 for structure/consciousness, c12_psy_cbse_02_009 for stages.',
          misconception: 'Students routinely write "Jung agreed with Freud on the unconscious but added the collective unconscious" — this.',
          parts: [
                { id: 'a', prompt: 'Name the post-Freudian theorist who proposed the "collective unconscious" containing inherited "archetypes," and give one example of an archetype mentioned.', answer: 'Carl Jung; example: God or Mother Earth',
                  options: ['Carl Jung; example: God or Mother Earth', 'personal unconscious'],
                  hint: 'Revisit c12_psy_cbse_02_007 for structure/consciousness, c12_psy_cbse_02_009 for stages.',
                  misconception: 'Students routinely write "Jung agreed with Freud on the unconscious but added the collective unconscious" — this is *incomplete and.' }
          ],
            remediations: { 'students-routinely-write-jung-agreed': { steps: ['Re-read c12_psy_cbse_02_007 (Freud\'s structure) and c12_psy_cbse_02_009 (psychosexual stages) to re-anchor Freud\'s.', 'Make a 5×4 grid (Theorist × {Kept, Changed, Signature Concept, Key Term}). Fill it from NCERT paragraphs only.', 'Write one 2-line case per theorist showing *only* their lens explains it.', 'Attempt Diagnostic Questions 2–4 again. If still stuck, revisit c11_psy_cbse_01_008 (Class 11 Freud) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_011', difficulty: 'standard',
          question: 'The Humanistic Approach to personality emphasizes individuals\' innate drive.',
          hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology overview) and.',
          misconception: 'Students often conflate \'unconditional positive regard\' with \'unconditional praise\' or \'permissiveness\', believing.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Rogers\' \'fully functioning person\' and Maslow\'s \'self-actualised person\' on three dimensions: (a) role of social environment, (b) nature.', answer: 'role of social environment, (',
                  options: ['role of social environment, (', 'lists identical traits (e'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology overview) and c11_hs_cbse_02_010 (Real.',
                  misconception: 'Students often conflate \'unconditional positive regard\' with \'unconditional praise\' or \'permissiveness\', believing Rogers advocates never.' }
          ],
            remediations: { 'students-often-conflate-unconditional-positive': { steps: ['If a student confuses unconditional positive regard with permissiveness: (1) Have them re-read Rogers\' quote: "The.', 'but this does not mean the therapist approves of all the client\'s actions." (2) Ask them to role-play: a student cheats.', 'Script two responses — one permissive ("It\'s okay, you tried your best"), one Rogerian ("I care about you, and I\'m.', 'Let\'s talk about what led to this.").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_012', difficulty: 'standard',
          question: 'Personality assessment refers to standardized procedures used to evaluate and.',
          hint: 'If stuck, revisit c12_psy_cbse_02_005 (Allport\'s trait categories) and.',
          misconception: 'Students often believe that "projective tests are just unscientific versions of personality questionnaires" or that.',
          parts: [
                { id: 'a', prompt: 'A student says: "The MMPI and Rorschach both measure personality, so they should give similar results for the same person." Explain why this statement.', answer: 'The MMPI uses 567 structured true/false statements (highly structured stimuli,',
                  options: ['The MMPI uses 567 structured true/false statements (highly structured stimuli,', 'projective tests are just unscientific versions of personality questionnaires'],
                  hint: 'If stuck, revisit c12_psy_cbse_02_005 (Allport\'s trait categories) and c12_psy_cbse_02_007 (Freud\'s.',
                  misconception: 'Students often believe that "projective tests are just unscientific versions of personality questionnaires" or that "the Rorschach is.' },
                { id: 'b', prompt: 'A researcher wants to screen for clinical depression in a large adolescent population using a self-report measure.', answer: 'The MMPI (specifically MMPI-2) is most appropriate',
                  options: ['The MMPI (specifically MMPI-2) is most appropriate', 'projective tests are just unscientific versions of personality questionnaires'],
                  hint: 'If stuck, revisit c12_psy_cbse_02_005 (Allport\'s trait categories) and c12_psy_cbse_02_007 (Freud\'s.',
                  misconception: 'Students often believe that "projective tests are just unscientific versions of personality questionnaires" or that "the Rorschach is.' }
          ],
            remediations: { 'projective-tests-are-just-unscientific': { steps: ['If a student cannot distinguish the theoretical basis of self-report vs.', 'projective techniques: (1) Have them re-read the NCERT section "Projective Techniques" (pp.', '43-46) and highlight every phrase describing assumptions (e.g., "unconscious motives," "less structured stimulus,".', '(2) Create a two-column table: Column A = "Self-report: conscious, structured, quantitative, face-value responses".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
