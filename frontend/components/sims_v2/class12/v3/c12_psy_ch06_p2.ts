import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch06_p2: SimDef = {
    id: 'v3_c12_psy_ch06_p2',
    title: 'Attitude and Social Cognition · Part 2/2',
    subtitle: 'She believes it, feels it — and still doesn\'t do it',
    classLevel: 12, subject: 'psychology', topic: 'Attitude and Social Cognition · Part 2/2',
    chapters: ['c12_psy_ch06'],
    nodeIds: ['c12_psy_cbse_06_007', 'c12_psy_cbse_06_008', 'c12_psy_cbse_06_009', 'c12_psy_cbse_06_010', 'c12_psy_cbse_06_011', 'c12_psy_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Attitude diagnostician', intro: 'Think, feel, do — an attitude is all three at once, and they\'re rarely in perfect agreement.', goal: 'Apply the A-B-C model of attitudes — and why components can disagree without the attitude vanishing.' },
    discovery: {
        question: 'Riya knows exercise is essential and feels great doing it — yet never exercises. Does she have a positive attitude toward it?',
        options: ['Yes — attitude is a latent A-B-C system; her behavioural component is weak but cognition and affect are strong, so the attitude exists, just misaligned', 'No — no action', 'Only halfway', 'It\'s a belief'],
        answer: 'Yes — attitude is a latent A-B-C system; her behavioural component is weak but cognition and affect are strong, so the attitude exists, just misaligned',
        hook: 'Knowing isn\'t an attitude — \'I know junk food is unhealthy\' is only the cognitive third. And a lecture on benefits rarely builds durable attitudes; an experience that engages feeling and doing builds consonance across all three components.',
    },
    teaching: [
        { title: 'Two-Step Concept of Attitude Change: S.M. Mohsin\'s Identification and Imitation', text: 'S.M. Mohsin\'s Two-Step Concept of Attitude Change proposes that attitude change occurs through a sequential process: (1) **Identification** — the target person develops liking and regard for the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dissect attitudes into A-B-C: find the weak component in a real scenario, separate belief from value from attitude, and choose the strategy that builds a lasting one.',
        labels: ['Two-Step Concept of Attitude', 'Factors Influencing Attitude Change', 'Attitude-Behaviour Relationship: LaPiere\'s Study', 'Prejudice and Discrimination: Nature,', 'Sources of Prejudice: Learning,', 'Strategies for Handling Prejudice'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_007', title: 'Two-Step Concept of Attitude Change: S.M. Mohsin\'s Identification and Imitation',
          caseStudy: { intro: 'Imagine your favourite cricket star suddenly switches from endorsing a sugary cola to promoting a millet-based health drink.',
            decisions: [{ prompt: 'State the two steps in S.M. Mohsin\'s Two-Step Concept of Attitude Change and name the role of each participant (target/source) in each step.', options: [
                { text: '**Correct answer:** Step 1 (Identification): The **target** (person whose attitude is to', outcome: '**Correct answer:** Step 1 (Identification): The **target** (person whose attitude is to change).' },
                { text: 'source identifies with target', outcome: 'Not quite — **Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding.', reveals: 'misconception-identification-in-mohsin-s' },
                { text: 'Virat Kohli endorses a brand → fans identify with him → fans buy brand', outcome: 'Not quite — **Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding.', reveals: 'misconception-identification-in-mohsin-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_008', title: 'Factors Influencing Attitude Change: Source, Message and Target Characteristics',
          caseStudy: { intro: 'Imagine you are watching a TV commercial for a new brand of millet-based breakfast cereal.',
            decisions: [{ prompt: 'List the four categories of factors that influence attitude change according to NCERT Class 12 Psychology Chapter 6.', options: [
                { text: 'The four categories are: (1) Characteristics of the existing attitude, (2) Source', outcome: 'The four categories are: (1) Characteristics of the existing attitude, (2) Source characteristics.' },
                { text: 'characteristics of the existing attitude', outcome: 'Not quite — Students often believe that "a credible source always produces more attitude change than.', reveals: 'a-credible-source-always-produces' },
                { text: 'a credible source always produces more attitude change than an attractive source', outcome: 'Not quite — Students often believe that "a credible source always produces more attitude change than.', reveals: 'a-credible-source-always-produces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_009', title: 'Attitude-Behaviour Relationship: LaPiere\'s Study on Attitudes vs Actual Behaviour',
          caseStudy: { intro: 'Imagine a classmate who passionately posts about "saving water" on social media but takes 30-minute showers daily.',
            decisions: [{ prompt: 'What was the key finding of LaPiere\'s (1934) study on attitude-behaviour relationship?', options: [
                { text: 'LaPiere found a significant inconsistency: the Chinese couple was refused service only', outcome: 'LaPiere found a significant inconsistency: the Chinese couple was refused service only once during.' },
                { text: 'attitudes always predict behaviour', outcome: 'Not quite — Students often believe LaPiere\'s study shows "attitudes don\'t matter" or "questionnaires are.', reveals: 'lapiere-s-study-shows-attitudes' },
                { text: 'the couple was refused everywhere', outcome: 'Not quite — Students often believe LaPiere\'s study shows "attitudes don\'t matter" or "questionnaires are.', reveals: 'lapiere-s-study-shows-attitudes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_010', title: 'Prejudice and Discrimination: Nature, Stereotypes and the A-B-C Components',
          caseStudy: { intro: 'Imagine you hear someone say, "All people from that region are lazy and dishonest." Ask yourself: What is the thought behind this statement?',
            decisions: [{ prompt: 'Define prejudice and state its three components (A-B-C) as described in the NCERT textbook.', options: [
                { text: 'Prejudice is a negative attitude toward a group, comprising a cognitive component', outcome: 'Prejudice is a negative attitude toward a group, comprising a cognitive component (stereotypes),.' },
                { text: 'stereotypes', outcome: 'Not quite — Students often think prejudice, stereotype, and discrimination are synonyms.', reveals: 'prejudice' },
                { text: 'discrimination', outcome: 'Not quite — Students often think prejudice, stereotype, and discrimination are synonyms.', reveals: 'prejudice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_011', title: 'Sources of Prejudice: Learning, Ingroup Bias, Scapegoating, Kernel of Truth and Self-Fulfilling Prophecy',
          caseStudy: { intro: 'Imagine you hear a classmate say, "Students from that neighbourhood are always lazy and dishonest." Ask yourself: Where did this belief come from?',
            decisions: [{ prompt: 'Name the five sources of prejudice discussed in the NCERT Class 12 Psychology textbook.', options: [
                { text: 'The five sources are: (1) Learning, (2) Strong social identity and ingroup bias, (3)', outcome: 'The five sources are: (1) Learning, (2) Strong social identity and ingroup bias, (3) Scapegoating.' },
                { text: 'cognitive dissonance', outcome: 'Not quite — Students often think "kernel of truth" means the stereotype is factually correct.', reveals: 'kernel-of-truth-means-the' },
                { text: 'kernel of truth', outcome: 'Not quite — Students often think "kernel of truth" means the stereotype is factually correct.', reveals: 'kernel-of-truth-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_012', title: 'Strategies for Handling Prejudice: Education, Intergroup Contact and Highlighting Individual Identity',
          caseStudy: { intro: 'Imagine you are a school counsellor in a diverse Delhi school where students from different religious backgrounds sit separately in the cafeteria and rarely.',
            decisions: [{ prompt: 'State the three main strategies for handling prejudice mentioned in the NCERT Class 12 textbook, and for each strategy, name ONE necessary.', options: [
                { text: 'The three strategies are: (1) Education and information dissemination', outcome: 'The three strategies are: (1) Education and information dissemination — necessary condition.' },
                { text: 'mere contact', outcome: 'Not quite — Students believe that ANY positive contact between groups reduces prejudice (the "mere contact".', reveals: 'any-positive-contact-between-groups' },
                { text: 'contact reduces prejudice', outcome: 'Not quite — Students believe that ANY positive contact between groups reduces prejudice (the "mere contact".', reveals: 'any-positive-contact-between-groups' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A health NGO wants villagers to stop a harmful practice central to their identity. The strategist asks: \'Do we attack the belief head-on, or first strengthen a related health attitude they already hold?\'',
            decisions: [{ prompt: 'What do the attitude features predict?', options: [
                { text: 'Head-on fails — a central, extreme, negative-leaning attitude resists incongruent change; the smarter lever is congruent change — deepen an existing aligned attitude (like protecting children\'s health) so the shift rides the system\'s own valence rather than fighting it.', outcome: 'The chapter\'s resistance map: centrality and extremeness multiply resistance in the opposite direction — you change a system by working with its gravity, not against it.' },
                { text: 'Go head-on — central beliefs change fastest because they matter most to people.', outcome: 'Centrality raises the stakes of the change, not its ease — the more a belief anchors the rest of the system, the harder incongruent pressure is to move.', reveals: 'central-changes-fast' },
                { text: 'Strategy doesn\'t matter — attitudes change at the same rate regardless of direction.', outcome: 'Valence and direction are exactly the variables — congruent change (more of what\'s felt) is easier than incongruent reversal, and extreme central attitudes make the gap even wider.', reveals: 'all-change-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'You can now read an attitude as three forces — and diagnose which one is dragging when belief and action diverge.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_007', difficulty: 'standard',
          question: 'S.M. Mohsin\'s Two-Step Concept of Attitude Change proposes that attitude change.',
          hint: 'If stuck, revisit **Bandura\'s Observational Learning (c11_psy_cbse_05_006)**.',
          misconception: '**Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding them attractive\'.".',
          parts: [
                { id: 'a', prompt: 'Preeti admires a sportsperson who endorses a soft drink. The sportsperson later switches to endorsing a health drink and stops consuming the soft drink.', answer: '**Correct answer:** Preeti changed',
                  options: ['**Correct answer:** Preeti changed', 'Virat Kohli endorses a brand → fans identify with him → fans buy brand'],
                  hint: 'If stuck, revisit **Bandura\'s Observational Learning (c11_psy_cbse_05_006)** — specifically the.',
                  misconception: '**Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding them attractive\'." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'A teacher wants students to develop a positive attitude toward reading classic literature. The teacher is well-liked but rarely reads classics themselves.', answer: '**Correct answer:** The **senior student** is more likely to succeed',
                  options: ['**Correct answer:** The **senior student** is more likely to succeed', 'Virat Kohli endorses a brand → fans identify with him → fans buy brand'],
                  hint: 'If stuck, revisit **Bandura\'s Observational Learning (c11_psy_cbse_05_006)** — specifically the.',
                  misconception: '**Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding them attractive\'." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'Compare Mohsin\'s Two-Step Concept with (a) Heider\'s Balance Theory and (b) Festinger\'s Cognitive Dissonance.', answer: '**Correct answer:** (a) **vs',
                  options: ['**Correct answer:** (a) **vs', 'Virat Kohli endorses a brand → fans identify with him → fans buy brand'],
                  hint: 'If stuck, revisit **Bandura\'s Observational Learning (c11_psy_cbse_05_006)** — specifically the.',
                  misconception: '**Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding them attractive\'." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-identification-in-mohsin-s': { steps: ['**Revisit the NCERT example (Preeti + sportsperson):** Trace each sentence to Step 1 or Step 2.', 'Highlight "identified herself with the sportsperson" (Step 1) and "sportsperson must first show positive feelings...', 'then actually change her/his own habit" (Step 2).', '**Contrast with Bandura (Class 11 Learning, node c11_psy_cbse_05_006):** Make a two-column table — Bandura.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding them attractive\'.".',
          parts: [
                { id: 'a', prompt: 'Critique this claim: "Mohsin\'s Two-Step Concept is just Bandura\'s Observational Learning applied to attitudes." Defend or refute using specific elements.', answer: '**Correct answer:** **Refute',
                  options: ['**Correct answer:** **Refute', 'Virat Kohli endorses a brand → fans identify with him → fans buy brand'],
                  hint: 'If stuck, revisit **Bandura\'s Observational Learning (c11_psy_cbse_05_006)** — specifically the.',
                  misconception: '**Misconception:** "Identification in Mohsin\'s model just means \'liking the source\' or \'finding them attractive\'." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-identification-in-mohsin-s': { steps: ['**Revisit the NCERT example (Preeti + sportsperson):** Trace each sentence to Step 1 or Step 2.', 'Highlight "identified herself with the sportsperson" (Step 1) and "sportsperson must first show positive feelings...', 'then actually change her/his own habit" (Step 2).', '**Contrast with Bandura (Class 11 Learning, node c11_psy_cbse_05_006):** Make a two-column table — Bandura.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_008', difficulty: 'standard',
          question: 'Attitude change is influenced by four sets of factors: (1) characteristics.',
          hint: 'If stuck, revisit node c12_psy_cbse_06_002 (Features of Attitudes) and create a table.',
          misconception: 'Students often believe that "a credible source always produces more attitude change than an attractive source" or vice.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a positive attitude is generally easier to change than a negative attitude, and why an extreme attitude is harder to change than.', answer: 'Positive attitudes are easier to change',
                  options: ['Positive attitudes are easier to change', 'negative attitudes are stronger', 'a credible source always produces more attitude change than an attractive source', 'message characteristics'],
                  hint: 'If stuck, revisit node c12_psy_cbse_06_002 (Features of Attitudes) and create a table linking each.',
                  misconception: 'Students often believe that "a credible source always produces more attitude change than an attractive source" or vice versa, treating.' }
          ],
            remediations: { 'a-credible-source-always-produces': { steps: ['If the student cannot distinguish the four factor categories or match factors to scenarios: (1) Have them create a 2x2.', '(2) Ask them to re-read the textbook sections "Source characteristics", "Message characteristics", "Target.', '(3) Give them three new mini-scenarios (e.g., a politician\'s speech, a friend\'s restaurant recommendation, a social.', '(4) Re-diagnose with a fresh APPLY-level question similar to DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_009', difficulty: 'standard',
          question: 'The attitude-behaviour relationship refers to the degree of consistency between.',
          hint: 'Revisit c12_psy_cbse_06_001 for A-B-C components and c12_psy_cbse_06_006 for cognitive.',
          misconception: 'Students often believe LaPiere\'s study shows "attitudes don\'t matter" or "questionnaires are invalid." The exact error.',
          parts: [
                { id: 'a', prompt: 'A student strongly believes "plastic waste harms oceans" (strong, central attitude). She is aware of this attitude while shopping.', answer: 'The violated condition is "the person thinks the behaviour would have a positive',
                  options: ['The violated condition is "the person thinks the behaviour would have a positive', 'external pressure', 'evaluation apprehension', 'attitudes don\'t matter'],
                  hint: 'Revisit c12_psy_cbse_06_001 for A-B-C components and c12_psy_cbse_06_006 for cognitive dissonance.',
                  misconception: 'Students often believe LaPiere\'s study shows "attitudes don\'t matter" or "questionnaires are invalid." The exact error: they conflate *one*.' }
          ],
            remediations: { 'lapiere-s-study-shows-attitudes': { steps: ['Re-read the NCERT paragraph on "Psychologists have found that there would be consistency between attitudes and.', 'Watch a 5-min video on "LaPiere\'s study" (search YouTube) to visualize the design.', 'Complete this exercise: think of three personal attitudes (e.g., "exercise is good," "junk food is bad," "honesty.', 'Re-attempt Diagnostic Questions 3 and 4, explaining your reasoning aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_010', difficulty: 'standard',
          question: 'Prejudice is a negative attitude towards a particular group, typically based.',
          hint: 'Revisit the "Green Environment" example in Box 6.1 (node c12_psy_cbse_06_001) and.',
          misconception: 'Students often think prejudice, stereotype, and discrimination are synonyms.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between a stereotype and a prejudice. Can a person hold a stereotype without being prejudiced? Give an example.', answer: 'A stereotype is a cognitive cluster of beliefs about a group\'s characteristics',
                  options: ['A stereotype is a cognitive cluster of beliefs about a group\'s characteristics', 'prejudice, stereotype, and discrimination are synonyms'],
                  hint: 'Revisit the "Green Environment" example in Box 6.1 (node c12_psy_cbse_06_001) and practice.',
                  misconception: 'Students often think prejudice, stereotype, and discrimination are synonyms.' }
          ],
            remediations: { 'prejudice': { steps: ['If the student conflates the three terms, do this: (1) Draw a three-column table labeled Stereotype (Cognitive).', '(2) Give a concrete example (e.g., gender, caste) and ask the student to fill each column with one statement.', '(3) Point out that prejudice includes all three columns, while stereotype is only column 1 and discrimination is only.', '(4) Re-test with Diagnostic Question 2 and 3 until the student can independently sort statements into the correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_011', difficulty: 'standard',
          question: 'Sources of prejudice are the psychological and social mechanisms — learning.',
          hint: 'If stuck, revisit c12_psy_cbse_06_003 (Attitude Formation: Learning) and.',
          misconception: 'Students often think "kernel of truth" means the stereotype is factually correct.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "kernel of truth" and "self-fulfilling prophecy" as sources of prejudice.', answer: 'Kernel of truth relies on the perceiver\'s selective attention: they notice a few',
                  options: ['Kernel of truth relies on the perceiver\'s selective attention: they notice a few', 'kernel of truth', '"kernel of truth" means the stereotype is factually correct'],
                  hint: 'If stuck, revisit c12_psy_cbse_06_003 (Attitude Formation: Learning) and c12_psy_cbse_06_010.',
                  misconception: 'Students often think "kernel of truth" means the stereotype is factually correct.' }
          ],
            remediations: { 'kernel-of-truth-means-the': { steps: ['If a student confuses kernel of truth with factual validity: (1) Have them list 5 people they know from any group and.', '(2) Ask: "If 2 out of 50 group members show a trait, does that make the trait \'true\' for the group?" (3) Re-read the.', '"the group." (4) Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_012', difficulty: 'standard',
          question: 'Strategies for handling prejudice are systematic psychological interventions.',
          hint: 'Revisit c12_psy_cbse_06_010 (definitions of prejudice/discrimination/stereotype) and.',
          misconception: 'Students believe that ANY positive contact between groups reduces prejudice (the "mere contact" fallacy).',
          parts: [
                { id: 'a', prompt: 'State the three main strategies for handling prejudice mentioned in the NCERT Class 12 textbook, and for each strategy, name ONE necessary condition for its.', answer: 'The three strategies are: (1) Education and information dissemination',
                  options: ['The three strategies are: (1) Education and information dissemination', 'mere contact', 'contact reduces prejudice'],
                  hint: 'Revisit c12_psy_cbse_06_010 (definitions of prejudice/discrimination/stereotype) and.',
                  misconception: 'Students believe that ANY positive contact between groups reduces prejudice (the "mere contact" fallacy).' }
          ],
            remediations: { 'any-positive-contact-between-groups': { steps: ['If a student cannot distinguish effective vs.', 'ineffective contact scenarios: Step 1 — Have them re-read the NCERT bullet points under "Increasing intergroup contact.', 'Step 2 — Give them 4 mini-scenarios (competitive sports, cooperative project, passive cultural show, mixed seating.', 'Step 3 — For each failed scenario, ask: "Which specific condition is violated?" Step 4 — Assign them to rewrite the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
