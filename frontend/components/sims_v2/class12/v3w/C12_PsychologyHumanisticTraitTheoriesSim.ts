import type { SimDef } from '../../engine/types';
import C12_PsychologyHumanisticTraitTheoriesSim from '../../../simulations/c6_12/C12_PsychologyHumanisticTraitTheoriesSim';

/** v3 wrapped master — C12_PsychologyHumanisticTraitTheoriesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_psychologyhumanistictraittheoriessim: SimDef = {
    id: 'v3w_c12_psychologyhumanistictraittheoriessim',
    title: 'Culture and Self: Western Individualistic vs Indian Collectivistic Perspectives',
    subtitle: 'This node covers the NCERT Section "Culture and Self" (pages 27-28): the distinction.',
    classLevel: 12, subject: 'psychology', topic: 'Culture and Self: Western Individualistic vs Indian Collectivistic Perspectives',
    chapters: [],
    nodeIds: ['c12_psy_cbse_02_003', 'c12_psy_cbse_02_004', 'c12_psy_cbse_02_006', 'c12_psy_cbse_02_005', 'c12_psy_cbse_02_010', 'c12_psy_cbse_02_011', 'c12_psy_cbse_01_001', 'c12_psy_cbse_02_009', 'c12_psy_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine an Indian student, Priya, who gets admitted to a university in the USA.', goal: 'Master Culture and Self: Western Individualistic vs Indian Collectivistic Perspectives.' },
    discovery: {
        question: 'Rahul, raised in a traditional joint family in Varanasi, accepts a job in Mumbai against his parents\' wish that he stay nearby.',
        options: ['Rahul\'s conflict arises', 'Rahul is torn between Indian and Western values', 'This error arises'],
        answer: 'Rahul\'s conflict arises',
        hook: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and.',
    },
    teaching: [
        { title: 'The cultural perspective on self refers to.', text: 'The cultural perspective on self refers to how culture shapes the way individuals define the boundaries between themselves and others.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_psy_cbse_02_003', title: 'The cultural perspective on self refers.',
          scaffold: { problem: 'An Indian engineering student, Arjun, is offered a prestigious internship in Germany for 6 months.',
            steps: [
            { text: 'Identify the two conflicting self-states. When Arjun thinks about his career, his self-boundary is withdrawn — he.' },
            { text: 'Name the cultural scripts. Withdrawn state activates "self-development script" (modern, individualistic,.' },
            { text: 'Explain the oscillation. Unlike a fixed-boundary model where one must choose permanently, the Indian shifting boundary.' },
            { text: 'Contrast with German student. A German student (fixed boundary) would likely frame it as a rational cost-benefit.' },
            { text: 'Predict resolution. Arjun may accept the internship but arrange frequent visits/virtual presence for family events, or.' },
            { text: 'Verify with NCERT. The text says: "our self at one moment of time expands to fuse with the cosmos or include the.', faded: true, blankAnswer: 'Arjun oscillates between withdrawn self (autonomous career.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_02_004', title: 'Type approaches to personality.',
          scaffold: { problem: 'A career counsellor uses Sheldon\'s somatotypes to guide students: "Mesomorphs become athletes; endomorphs become managers; ectomorphs.',
            steps: [
            { text: 'Identify the claim — body build determines vocational fate via temperament.' },
            { text: 'Recall NCERT\'s explicit evaluation: "These body typologies are simple, and have limited use in predicting behaviour of.' },
            { text: 'Apply modern validity criteria — somatotyping has low inter-rater reliability (different observers classify same person.' },
            { text: 'Note ethical issue — deterministic labelling limits student agency and ignores skill development, interests,.' },
            { text: 'Conclude: The practice is pseudoscientific stereotyping, not evidence-based counselling.', faded: true, blankAnswer: 'The practice is invalid because (1) NCERT calls somatotypes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_02_006', title: 'Eysenck\'s theory proposes three.',
          scaffold: { problem: 'A researcher administers both EPQ (Eysenck) and NEO-PI-R (Big Five) to 200 Indian college students.',
            steps: [
            { text: 'Identify the overlapping dimensions — both models have Extraversion (E) and Neuroticism (N) as major factors, so high.' },
            { text: 'Note Eysenck\'s Psychoticism (P) is a single broad dimension combining hostility, impulsivity, and unconventionality,.' },
            { text: 'Recognize that reversing NEO-Agreeableness only captures the hostility component of Psychoticism, missing impulsivity.' },
            { text: 'Conclude that factor structure differences (broad P vs. narrow A, C, O) explain the discrepancy — not measurement error.' },
            { text: 'Verify: This aligns with NCERT statement that Big Five "provides a novel scheme of organising traits" beyond Eysenck\'s.', faded: true, blankAnswer: 'High EPQ-E/NEO-E correlation reflects shared factor.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_02_005', title: 'Trait approaches to personality.',
          scaffold: { problem: 'A school counsellor observes a Class 12 student, Meera. Meera\'s teachers describe her as "exceptionally disciplined," "always helps.',
            steps: [
            { text: 'Identify the life-organizing theme — "desire to become a doctor to serve rural communities shapes subject choices,.' },
            { text: 'Identify cross-situational descriptors used in recommendations — "exceptionally disciplined," "always helps.' },
            { text: 'Identify narrow, situation-specific preferences — "gets anxious during practical exams" (only evaluative contexts),.' },
            { text: 'Map to Cattell 16PF factors using factor definitions: High **Conscientiousness (G - Superego Strength)** from.' },
            { text: 'Synthesize — Cardinal trait (service vocation) drives high G (duty), high A/H (service orientation), high Q3.', faded: true, blankAnswer: 'Cardinal: Service-oriented vocation. Central:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_02_010', title: 'Post-Freudian approaches are.',
          scaffold: { problem: 'A 14-year-old boy, Rohan, is intensely anxious about his changing body and avoids the school locker room.',
            steps: [
            { text: 'Identify the core anxiety source — Horney locates neurosis in *basic anxiety* from disturbed parent-child relations.' },
            { text: 'Recognise the coping strategy — Rohan\'s fear of exposure ("not man enough") and avoidance indicate *moving away from.' },
            { text: 'Contrast with Freud — Freud would interpret locker-room avoidance as castration anxiety / phallic-stage fixation;.' },
            { text: 'Name the neurotic need — "Neurotic need for perfection and unassailability" (Horney\'s 10 needs) drives his avoidance;.' },
            { text: 'Predict intervention focus — Horneyan therapy would target *interpersonal styles* (helping Rohan test reality of peers\'.', faded: true, blankAnswer: 'Rohan\'s anxiety stems from basic anxiety generated by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_02_011', title: 'The Humanistic Approach to personality.',
          scaffold: { problem: 'Arjun, 17, loves painting but his parents say "Art won\'t feed you." He stops painting, studies commerce, feels empty, and snaps at friends.',
            steps: [
            { text: 'Identify Arjun\'s real self — his organismic valuing says "I am a painter; creating art feels authentic and energising."' },
            { text: 'Identify his ideal self — internalised parental message: "I am a successful commerce professional who provides.' },
            { text: 'Name the condition of worth — "I am worthy of love only if I pursue a \'practical\' career." This was communicated via.' },
            { text: 'Trace incongruence manifestations — (a) Denial: he stops painting to avoid anxiety; (b) Distortion: he tells himself "I.' },
            { text: 'Specify therapeutic condition — Unconditional positive regard from a counsellor: "Your worth isn\'t tied to your career.', faded: true, blankAnswer: 'Real self = painter; Ideal self = commerce professional;.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_psy_cbse_02_004', title: 'Identify each idea',
          dissect: { specimen: 'Culture and Self: Western Individualistic vs Indian Collectivistic Perspectives', spots: [
            { id: 's1', label: 'The cultural perspective on self', prompt: 'Which idea is this? — The cultural perspective on self refers to how culture shapes the way individuals define.', answer: 'The cultural perspective on self', options: ['The cultural perspective on self', 'Type approaches to personality categorise', 'Eysencks theory proposes three biologically-based', 'Trait approaches to personality conceptualize'] },
            { id: 's2', label: 'Type approaches to personality categorise', prompt: 'Which idea is this? — Type approaches to personality categorise individuals into discrete, qualitatively.', answer: 'Type approaches to personality categorise', options: ['Type approaches to personality categorise', 'The cultural perspective on self', 'Eysencks theory proposes three biologically-based', 'Trait approaches to personality conceptualize'] },
            { id: 's3', label: 'Eysencks theory proposes three biologically-based', prompt: 'Which idea is this? — Eysenck\'s theory proposes three biologically-based personality dimensions:.', answer: 'Eysencks theory proposes three biologically-based', options: ['Eysencks theory proposes three biologically-based', 'The cultural perspective on self', 'Type approaches to personality categorise', 'Trait approaches to personality conceptualize'] },
            { id: 's4', label: 'Trait approaches to personality conceptualize', prompt: 'Which idea is this? — Trait approaches to personality conceptualize personality as a set of stable, enduring.', answer: 'Trait approaches to personality conceptualize', options: ['Trait approaches to personality conceptualize', 'The cultural perspective on self', 'Type approaches to personality categorise', 'Eysencks theory proposes three biologically-based'] },
            { id: 's5', label: 'Post-Freudian approaches are neo-analytic theories', prompt: 'Which idea is this? — Post-Freudian approaches are neo-analytic theories that modify Freud\'s psychodynamic.', answer: 'Post-Freudian approaches are neo-analytic theories', options: ['Post-Freudian approaches are neo-analytic theories', 'The cultural perspective on self', 'Type approaches to personality categorise', 'Eysencks theory proposes three biologically-based'] },
            { id: 's6', label: 'The Humanistic Approach to personality', prompt: 'Which idea is this? — The Humanistic Approach to personality emphasizes individuals\' innate drive toward.', answer: 'The Humanistic Approach to personality', options: ['The Humanistic Approach to personality', 'The cultural perspective on self', 'Type approaches to personality categorise', 'Eysencks theory proposes three biologically-based'] }
          ] } }
    ],
    explore: { component: C12_PsychologyHumanisticTraitTheoriesSim, prompt: 'Explore the interactive — Culture and Self: Western Individualistic vs Indian Collectivistic Perspectives' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_003', difficulty: 'standard',
          question: 'The cultural perspective on self refers to how culture shapes the way.',
          hint: 'If unclear on personal vs social identity, re-read Node c12_psy_cbse_02_001 Section.',
          misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and.',
          parts: [
                { id: 'a', prompt: 'Rahul, raised in a traditional joint family in Varanasi, accepts a job in Mumbai against his parents\' wish that he stay nearby.', answer: 'Rahul\'s conflict arises',
                  options: ['Rahul\'s conflict arises', 'Rahul is torn between Indian and Western values', 'This error arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' },
                { id: 'b', prompt: 'Compare the implications of fixed vs shifting self-boundary for (a) concept of privacy, (b) decision-making in career choice, and (c) expression of.', answer: '| Domain | Fixed Boundary (Western Individualistic) | Shifting Boundary (Indian',
                  options: ['| Domain | Fixed Boundary (Western Individualistic) | Shifting Boundary (Indian', 'Indians never disagree', 'Westerners never care about family'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' }
          ],
            remediations: { 'indian-collectivistic-self-means-the': { steps: ['Re-read NCERT pages 27-28, focusing on the paragraph starting "The most important distinction..." and Figure 2.1.', 'Revisit Node c12_psy_cbse_02_001 (Concept of Self: Personal and Social Identity) to reinforce that personal identity.', 'Watch a 5-minute video "Independent vs Interdependent Self" (search YouTube for "Markus Kitayama self-construal.', 'Re-attempt Diagnostic Question 2 and 3, writing answers that explicitly use the phrases "expands to include" and.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Western individualistic self is more modern and developed; the Indian collectivistic self is traditional and backward." Use NCERT.', answer: 'The statement is ethnocentric and scientifically invalid',
                  options: ['The statement is ethnocentric and scientifically invalid', 'both have pros and cons', 'This error arises', 'and ignore the NCERT\'s explicit phrase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' },
                { id: 'b', prompt: 'Design a 20-minute classroom activity for Class 12 students that lets them experience the difference between fixed and shifting self-boundaries.', answer: '**Activity: "Circle of Self"** 1',
                  options: ['**Activity: "Circle of Self"** 1', 'This error arises', 'and ignore the NCERT\'s explicit phrase', 'Concrete example'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' },
                { id: 'c', prompt: 'Compare the implications of fixed vs shifting self-boundary for (a) concept of privacy, (b) decision-making in career choice, and (c) expression of.', answer: '| Domain | Fixed Boundary (Western Individualistic) | Shifting Boundary (Indian',
                  options: ['| Domain | Fixed Boundary (Western Individualistic) | Shifting Boundary (Indian', 'Indians never disagree', 'Westerners never care about family', 'This error arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' }
          ],
            remediations: { 'indian-collectivistic-self-means-the': { steps: ['Re-read NCERT pages 27-28, focusing on the paragraph starting "The most important distinction..." and Figure 2.1.', 'Revisit Node c12_psy_cbse_02_001 (Concept of Self: Personal and Social Identity) to reinforce that personal identity.', 'Watch a 5-minute video "Independent vs Interdependent Self" (search YouTube for "Markus Kitayama self-construal.', 'Re-attempt Diagnostic Question 2 and 3, writing answers that explicitly use the phrases "expands to include" and.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_004', difficulty: 'standard',
          question: 'Type approaches to personality categorise individuals into discrete,.',
          hint: 'Revisit the "Concept of Personality" subsection in NCERT Chapter 2 (before Major.',
          misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across.',
          parts: [
                { id: 'a', prompt: 'Name the four personality types proposed by Hippocrates and the bodily humour associated with each type.', answer: 'The four types are: Sanguine (blood',
                  options: ['The four types are: Sanguine (blood', '(dimension), writing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' },
                { id: 'b', prompt: 'A student writes: "In Ayurveda, a person with dominant vata dosha is calm, grounded, and gains weight easily." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '(dimension), writing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' },
                { id: 'c', prompt: 'Rohan is a national-level sprinter with a rectangular, muscular build, high energy, and courage.', answer: 'Rohan: Mesomorph',
                  options: ['Rohan: Mesomorph', '(dimension), writing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' }
          ],
            remediations: { 'students-treat-all-type-theories': { steps: ['Have the student create a 5-column table: Theory | Basis of Classification | Types | Key Descriptors | NCERT Critique.', 'For each theory, write ONE real-life example of a person fitting each type (e.g., "My grandfather = kapha: calm, gains.', 'Ask: "Can a person be both vata and kapha?" → Discuss Ayurveda\'s prakriti as *dominant* dosha, not exclusive.', 'Contrast with trait approach (next node): "If shyness is a trait, you rate 1-10; if introversion is a type, you are IN.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Sheldon\'s somatotypes are scientifically valid because body build determines personality." Use the NCERT\'s own evaluation and modern.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', '(dimension), writing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' }
          ],
            remediations: { 'students-treat-all-type-theories': { steps: ['Have the student create a 5-column table: Theory | Basis of Classification | Types | Key Descriptors | NCERT Critique.', 'For each theory, write ONE real-life example of a person fitting each type (e.g., "My grandfather = kapha: calm, gains.', 'Ask: "Can a person be both vata and kapha?" → Discuss Ayurveda\'s prakriti as *dominant* dosha, not exclusive.', 'Contrast with trait approach (next node): "If shyness is a trait, you rate 1-10; if introversion is a type, you are IN.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_006', difficulty: 'standard',
          question: 'Eysenck\'s theory proposes three biologically-based personality dimensions:.',
          hint: 'If stuck, revisit c12_psy_cbse_02_005 Allport\'s Trait Theory — focus on the section.',
          misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.',
          parts: [
                { id: 'a', prompt: 'List Eysenck\'s three personality dimensions with their high and low pole labels exactly as given in NCERT.', answer: '(1) Extraversion vs',
                  options: ['Correct answer: (1) Extraversion vs', 'Openness', 'Conscientiousness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' },
                { id: 'b', prompt: 'Rahul scores high on Extraversion and low on Neuroticism in both Eysenck\'s EPQ and a Big Five inventory.', answer: 'Correct evaluation: The claim is false',
                  options: ['Correct evaluation: The claim is false', 'they measure the same thing', 'How does Eysenck\'s view of extraversion differ from the Big Five?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' },
                { id: 'c', prompt: 'Analyse the following case using BOTH models: "Anjali is highly imaginative, enjoys abstract art, questions authority, keeps a messy room, misses appointments,.', answer: 'Correct analysis: Eysenck: High Psychoticism (imaginative, questions authority,',
                  options: ['Correct analysis: Eysenck: High Psychoticism (imaginative, questions authority,', 'How does Eysenck\'s view of extraversion differ from the Big Five?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' }
          ],
            remediations: { 'students-often-treat-eysenck-s': { steps: ['If the student conflates the two Extraversions: (1) Re-read NCERT Box 2.2 (Big Five) and the Eysenck section.', '(2) Make a two-column table: Column A = Eysenck\'s E descriptors (active, gregarious, impulsive, thrill-seeking); Column.', '(3) Highlight "impulsive, thrill-seeking" in Column A — note NCERT places these in Eysenck\'s E.', '(4) Check Big Five Conscientiousness pole: "impulsive" is explicitly the LOW pole.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Because Eysenck\'s dimensions are biologically based, they are more scientific and therefore superior to the atheoretical Big Five.".', answer: 'Correct critique: The statement is flawed',
                  options: ['Correct critique: The statement is flawed', 'biological reductionism', 'scientific validity', 'How does Eysenck\'s view of extraversion differ from the Big Five?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' }
          ],
            remediations: { 'students-often-treat-eysenck-s': { steps: ['If the student conflates the two Extraversions: (1) Re-read NCERT Box 2.2 (Big Five) and the Eysenck section.', '(2) Make a two-column table: Column A = Eysenck\'s E descriptors (active, gregarious, impulsive, thrill-seeking); Column.', '(3) Highlight "impulsive, thrill-seeking" in Column A — note NCERT places these in Eysenck\'s E.', '(4) Check Big Five Conscientiousness pole: "impulsive" is explicitly the LOW pole.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_005', difficulty: 'standard',
          question: 'Trait approaches to personality conceptualize personality as a set of stable,.',
          hint: 'If confused about trait vs type: Revisit c12_psy_cbse_02_004 "Type Approaches" — focus on.',
          misconception: 'Students treat Allport\'s three categories as a *trait list* (like "cardinal traits include honesty, ambition...").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trait approaches to personality conceptualize personality as a set of stable, enduring',
                  options: ['Trait approaches to personality conceptualize personality as a set of stable, enduring', 'The cultural perspective on self refers to how culture shapes the way individuals define', 'Type approaches to personality categorise individuals into discrete, qualitatively', 'Eysenck\'s theory proposes three biologically-based personality dimensions:'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Allport\'s three categories as a *trait list* (like "cardinal traits include honesty, ambition...") rather than.' }
          ],
            remediations: { 'students-treat-allport-s-three': { steps: ['**Revisit the "pervasiveness" concept:** Take 3 people you know well.', 'Ask: "Does this trait explain their career, relationships, hobbies, and values?" Only traits answering YES are cardinal.', '**Visualize factor analysis:** Draw 20 surface traits as circles.', 'Draw arrows showing correlations.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_010', difficulty: 'standard',
          question: 'Post-Freudian approaches are neo-analytic theories that modify Freud\'s.',
          hint: 'Revisit c12_psy_cbse_02_007 for structure/consciousness, c12_psy_cbse_02_009 for stages,.',
          misconception: 'Students routinely write "Jung agreed with Freud on the unconscious but added the collective unconscious" — this is.',
          parts: [
                { id: 'a', prompt: 'Name the post-Freudian theorist who proposed the "collective unconscious" containing inherited "archetypes," and give one example of an archetype mentioned in.', answer: 'Carl Jung; example: God or Mother Earth',
                  options: ['Carl Jung; example: God or Mother Earth', 'personal unconscious'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely write "Jung agreed with Freud on the unconscious but added the collective unconscious" — this is *incomplete and.' }
          ],
            remediations: { 'students-routinely-write-jung-agreed': { steps: ['Re-read c12_psy_cbse_02_007 (Freud\'s structure) and c12_psy_cbse_02_009 (psychosexual stages) to re-anchor Freud\'s.', 'Make a 5×4 grid (Theorist × {Kept, Changed, Signature Concept, Key Term}). Fill it from NCERT paragraphs only.', 'Write one 2-line case per theorist showing *only* their lens explains it.', 'Attempt Diagnostic Questions 2–4 again. If still stuck, revisit c11_psy_cbse_01_008 (Class 11 Freud) and.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely write "Jung agreed with Freud on the unconscious but added the collective unconscious" — this is.',
          parts: [
                { id: 'a', prompt: 'Erich Fromm identified five "character orientations" (receptive, exploitative, hoarding, marketing, productive).', answer: 'The claim is *partially correct but incomplete*',
                  options: ['The claim is *partially correct but incomplete*', 'alienation in modern society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely write "Jung agreed with Freud on the unconscious but added the collective unconscious" — this is *incomplete and.' }
          ],
            remediations: { 'students-routinely-write-jung-agreed': { steps: ['Re-read c12_psy_cbse_02_007 (Freud\'s structure) and c12_psy_cbse_02_009 (psychosexual stages) to re-anchor Freud\'s.', 'Make a 5×4 grid (Theorist × {Kept, Changed, Signature Concept, Key Term}). Fill it from NCERT paragraphs only.', 'Write one 2-line case per theorist showing *only* their lens explains it.', 'Attempt Diagnostic Questions 2–4 again. If still stuck, revisit c11_psy_cbse_01_008 (Class 11 Freud) and.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_011', difficulty: 'standard',
          question: 'The Humanistic Approach to personality emphasizes individuals\' innate drive.',
          hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology overview) and.',
          misconception: 'Students often conflate \'unconditional positive regard\' with \'unconditional praise\' or \'permissiveness\', believing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Humanistic Approach to personality emphasizes individuals\' innate drive toward',
                  options: ['The Humanistic Approach to personality emphasizes individuals\' innate drive toward', 'The cultural perspective on self refers to how culture shapes the way individuals define', 'Type approaches to personality categorise individuals into discrete, qualitatively', 'Eysenck\'s theory proposes three biologically-based personality dimensions:'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate \'unconditional positive regard\' with \'unconditional praise\' or \'permissiveness\', believing Rogers advocates never.' }
          ],
            remediations: { 'students-often-conflate-unconditional-positive': { steps: ['If a student confuses unconditional positive regard with permissiveness: (1) Have them re-read Rogers\' quote: "The.', 'but this does not mean the therapist approves of all the client\'s actions." (2) Ask them to role-play: a student cheats.', 'Script two responses — one permissive ("It\'s okay, you tried your best"), one Rogerian ("I care about you, and I\'m.', 'Let\'s talk about what led to this.").'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
