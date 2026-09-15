import type { SimDef } from '../../engine/types';
import C11_HomeScienceConceptGrowthDevelopmentSim from '../../../simulations/c6_12/C11_HomeScienceConceptGrowthDevelopmentSim';

/** v3 wrapped master — C11_HomeScienceConceptGrowthDevelopmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_homescienceconceptgrowthdevelopmentsim: SimDef = {
    id: 'v3w_c11_homescienceconceptgrowthdevelopmentsim',
    title: 'Home Science Concept Growth Development',
    subtitle: 'This node covers the definitions of puberty and pubescence, the typical age ranges, the.',
    classLevel: 11, subject: 'science', topic: 'Puberty and Pubescence: Physical and Biological Changes',
    chapters: [],
    nodeIds: ['c11_hs_cbse_02_008', 'c11_hs_cbse_02_001', 'c11_hs_cbse_02_002', 'c11_hs_cbse_02_006', 'c11_hs_cbse_02_010', 'c11_hs_cbse_01_006', 'c11_hs_cbse_08_001', 'c11_hs_cbse_08_002', 'c11_hs_cbse_08_003', 'c11_hs_cbse_08_008', 'c11_hs_cbse_08_010', 'c11_hs_cbse_09_008', 'c11_hs_cbse_09_009', 'c11_hs_cbse_09_010', 'c11_hs_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are looking at two Class 11 students: Rohan, who has a deep voice and facial hair, and Priya, who.', goal: 'Master Home Science Concept Growth Development.' },
    discovery: {
        question: 'A Class 11 student claims, "Menarche is the first sign of puberty in girls." Using the NCERT sequence of changes for girls, explain why this statement is.',
        options: ['The statement is inaccurate', 'menarche', 'start of puberty'],
        answer: 'The statement is inaccurate',
        hook: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the.',
    },
    teaching: [
        { title: 'Puberty is the specific point in time when.', text: 'Puberty is the specific point in time when an individual attains sexual maturity, marked by menarche (first menstruation) in girls and spermatogenesis (production of spermatozoa) in boys.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hs_cbse_02_008', title: 'Puberty is the specific point in time.',
          scaffold: { problem: 'A 12-year-old girl, Anjali, is worried because she has not started menstruating, but she has noticed breast development and pubic hair.',
            steps: [
            { text: 'Recall the NCERT sequence for girls: 1. Breast enlargement (Thelarche), 2. Straight pubic hair, 3. Kinky pubic hair, 4.' },
            { text: 'Map Anjali\'s symptoms: She has completed Step 1 (breast development) and Step 2/3 (pubic hair).' },
            { text: 'Check normative age range: Pubescence for girls is 11-13 years. Anjali is 12, well within the normal range.' },
            { text: 'Synthesize the response: "Anjali is not \'late\'; she is progressing normally through the sequence.' },
            { text: 'Add psychosocial support: Reassure that variation of ±2 years is normal; suggest a pediatrician visit only if no signs.', faded: true, blankAnswer: 'Anjali is in the mid-stages of pubescence (Thelarche and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_02_001', title: 'The **self** is the totality of a.',
          scaffold: { problem: '*Analyse the following "I am" statements from a 16-year-old girl, Meera, and create a dimension-frequency table showing how many statements.',
            steps: [
            { text: 'List the 5 analytical categories (Physical, Emotional, Mental, Social, Agentic) and 2 dimensions (Personal, Social) as.' },
            { text: 'Analyse Statement 1: "5\'2" tall" → Physical characteristic of body → Category: Physical, Dimension: Personal (bodily.' },
            { text: 'Analyse Statement 2: "angry easily" → Emotional tendency → Category: Emotional, Dimension: Personal (feeling).' },
            { text: 'Analyse Statement 3: "good at biology" → Cognitive ability self-assessment → Category: Mental, Dimension: Personal.' },
            { text: 'Analyse Statement 4: "class representative" → Role in school group → Category: Social, Dimension: Social (role).' },
            { text: 'Analyse Statement 5: "Kathak dancer" → Skill + cultural identity → Category: Social (cultural role), Dimension: Social.' },
            { text: 'Analyse Statement 6: "help mother cook" → Action/behaviour → Category: Agentic, Dimension: Personal (doer) — though.' },
            { text: 'Analyse Statement 7: "Gujarati" → Cultural/linguistic group membership → Category: Social, Dimension: Social.' },
            { text: 'Analyse Statement 8: "want to become a doctor" → Aspiration/future self → Category: Mental (cognitive projection),.' },
            { text: 'Analyse Statement 9: "scared of failure" → Emotional response → Category: Emotional, Dimension: Personal.' },
            { text: 'Analyse Statement 10: "write diary daily" → Habitual action → Category: Agentic, Dimension: Personal.' },
            { text: 'Compile frequency table and verify all 10 statements accounted for.', faded: true, blankAnswer: 'Frequency Table: Physical: 1 (P), Emotional: 2 (P), Mental:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_02_002', title: 'Self-concept is the.',
          scaffold: { problem: 'Anjali (17) writes in her diary: "I am a topper in class (rank 3), I play piano beautifully, I am dark-skinned, I am shy with strangers.".',
            steps: [
            { text: 'Identify all self-concept statements (descriptive claims) from the diary entry — separate factual/behavioural claims.' },
            { text: 'Identify the self-esteem statement (the global feeling of worth) — "deeply inadequate and ugly" is the evaluative.' },
            { text: 'Infer the ideal-self standards Anjali is using — "I must be rank 1," "I must be fair-skinned," "I must be socially.' },
            { text: 'Map each self-concept statement against its corresponding ideal standard to locate discrepancies — rank 3 vs rank 1.' },
            { text: 'Explain the self-esteem outcome — the large, immutable discrepancy on a socially valued trait (skin colour) dominates.', faded: true, blankAnswer: 'Anjali\'s low self-esteem stems from a large real-ideal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_02_006', title: 'Adolescence is a critical period for.',
          scaffold: { problem: 'Anjali, 15, lives in a joint family in Jaipur. Her parents expect her to learn traditional cooking and help with younger siblings ("be.',
            steps: [
            { text: 'Identify the developmental stage — Anjali is 15, squarely in adolescence (10–19 years), the period Erikson designates.' },
            { text: 'Apply Reason 1 (intense self-preoccupation) — Anjali\'s feeling "split" and noticing her shifting confidence shows she.' },
            { text: 'Apply Reason 2 (creating lasting selfhood) — The Class 11 stream decision is a *lasting* identity commitment (career.' },
            { text: 'Apply Reason 3 (bio-social mismatch) — Biological maturity (puberty completed) triggers adult-like responsibility.' },
            { text: 'Analyze the cultural script — Joint family + traditional gender roles = Indian interdependence script.' },
            { text: 'Conclude — Anjali is experiencing *normal* identity work for her cultural context.', faded: true, blankAnswer: 'Anjali\'s experience illustrates all three textbook reasons.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_02_010', title: 'The real self is an individual\'s.',
          scaffold: { problem: 'Priya (16, Class 11, humanities) identifies her ideal self as "confident speaker who participates in class discussions." Her real self: "I.',
            steps: [
            { text: 'Decompose the ideal self trait "confident speaker" into 4 observable micro-behaviors ranked by anxiety: (a) ask one.' },
            { text: 'Week 1 — target behavior (a) daily. Record: situation, anxiety (1-10), outcome. Week 2 — add (b) 3×/week.' },
            { text: 'Each Sunday, re-rate congruence on the 1-10 scale for "confident speaker" domain.' },
            { text: 'If congruence rises ≥2 points by Week 4, generalize to new domain (e.g., "confident in family decisions").' },
            { text: 'Document the process in a "Growth Log" linking each micro-success to the ideal self trait — builds self-efficacy.', faded: true, blankAnswer: '4-week graded exposure plan with 4 micro-behaviors, weekly.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_01_006', title: 'Adolescence is a critical transitional.',
          scaffold: { problem: 'Rohan, 13, lives in a peri-urban settlement. His father works double shifts, mother does piece-work embroidery.',
            steps: [
            { text: 'Identify biological ecology changes — growth spurt (10 cm/8 months), increased metabolic demand (constant hunger),.' },
            { text: 'Identify economic ecology constraints — family income instability, hand-me-down clothing (Fabric & Apparel resource.' },
            { text: 'Identify social ecology shifts — peer avoidance due to voice/body changes, reduced peer interaction, family role as.' },
            { text: 'Identify psychological ecology impacts — body discomfort, possible shame/stigma, identity confusion (student vs.' },
            { text: 'Map synergies — Growth spurt + tight clothing + voice change → social withdrawal → lost peer support → increased family.' },
            { text: 'HEFS intervention leverage points — Nutrition: school meal + nutrition education; Clothing: low-cost adaptive garments;.', faded: true, blankAnswer: 'Rohan\'s case shows a turning point where biological.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_02_001', title: 'Identify each idea',
          dissect: { specimen: 'Home Science Concept Growth Development', spots: [
            { id: 's1', label: 'Puberty is the specific point', prompt: 'Which idea is this? — Puberty is the specific point in time when an individual attains sexual maturity, marked.', answer: 'Puberty is the specific point', options: ['Puberty is the specific point', 'The self is the totality', 'Self-concept is the cognitive-descriptive component', 'Adolescence is a critical period'] },
            { id: 's2', label: 'The self is the totality', prompt: 'Which idea is this? — The **self** is the totality of a person\'s experiences, ideas, thoughts, and feelings.', answer: 'The self is the totality', options: ['The self is the totality', 'Puberty is the specific point', 'Self-concept is the cognitive-descriptive component', 'Adolescence is a critical period'] },
            { id: 's3', label: 'Self-concept is the cognitive-descriptive component', prompt: 'Which idea is this? — Self-concept is the cognitive-descriptive component of the self, representing the.', answer: 'Self-concept is the cognitive-descriptive component', options: ['Self-concept is the cognitive-descriptive component', 'Puberty is the specific point', 'The self is the totality', 'Adolescence is a critical period'] },
            { id: 's4', label: 'Adolescence is a critical period', prompt: 'Which idea is this? — Adolescence is a critical period for identity development because it is the developmental.', answer: 'Adolescence is a critical period', options: ['Adolescence is a critical period', 'Puberty is the specific point', 'The self is the totality', 'Self-concept is the cognitive-descriptive component'] },
            { id: 's5', label: 'The real self is an', prompt: 'Which idea is this? — The real self is an individual\'s current, actual perception of their own attributes,.', answer: 'The real self is an', options: ['The real self is an', 'Puberty is the specific point', 'The self is the totality', 'Self-concept is the cognitive-descriptive component'] },
            { id: 's6', label: 'Adolescence is a critical transitional', prompt: 'Which idea is this? — Adolescence is a critical transitional developmental stage (approximately 10-19 years).', answer: 'Adolescence is a critical transitional', options: ['Adolescence is a critical transitional', 'Puberty is the specific point', 'The self is the totality', 'Self-concept is the cognitive-descriptive component'] }
          ] } }
    ],
    explore: { component: C11_HomeScienceConceptGrowthDevelopmentSim, prompt: 'Explore the interactive — Home Science Concept Growth Development' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_008', difficulty: 'standard',
          question: 'Puberty is the specific point in time when an individual attains sexual.',
          hint: 'If stuck on the sequence, revisit **Class 10 Biology Chapter 9 (Heredity and Evolution).',
          misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the.',
          parts: [
                { id: 'a', prompt: 'Define pubescence and state the typical age range for its onset in Indian girls and boys as per the NCERT textbook.', answer: 'Pubescence is the period during',
                  options: ['Pubescence is the period during', 'Distinguish between'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes is.' },
                { id: 'b', prompt: 'A Class 11 student claims, "Menarche is the first sign of puberty in girls." Using the NCERT sequence of changes for girls, explain why this statement is.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'menarche', 'start of puberty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes is.' },
                { id: 'c', prompt: 'Rohan (14 years) and Amit (14 years) are classmates. Rohan has developed kinky pubic hair and his voice is deepening; Amit has only straight pigmented pubic.', answer: '**Rohan is further along.** Sequence for boys: 1',
                  options: ['**Rohan is further along.** Sequence for boys: 1', 'Distinguish between'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes is.' }
          ],
            remediations: { 'misconception-puberty-and-pubescence-are': { steps: ['Terminology Sort.** Create two cards: "PUBESCENCE (Process/Journey)" and "PUBERTY (Event/Milestone)".', 'Sequence Strips.** Give paper strips with the 6-9 changes for girls and boys (mixed).', 'The "Why" Bridge.** Ask: "Why does the textbook say girls\' growth spurt is *before* menarche but boys\' is *after*.', 'Exam Drill.** Practice one 3-marker: "List the sequence of changes in boys up to spermarche" and one 2-marker:.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Pubescence is a universal biological process, therefore all adolescents experience identity development in the same way." Use the.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'Distinguish between'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes is.' }
          ],
            remediations: { 'misconception-puberty-and-pubescence-are': { steps: ['Terminology Sort.** Create two cards: "PUBESCENCE (Process/Journey)" and "PUBERTY (Event/Milestone)".', 'Sequence Strips.** Give paper strips with the 6-9 changes for girls and boys (mixed).', 'The "Why" Bridge.** Ask: "Why does the textbook say girls\' growth spurt is *before* menarche but boys\' is *after*.', 'Exam Drill.** Practice one 3-marker: "List the sequence of changes in boys up to spermarche" and one 2-marker:.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_001', difficulty: 'standard',
          question: 'The **self** is the totality of a person\'s experiences, ideas, thoughts, and.',
          hint: 'If stuck, revisit Class 8 Biology Chapter 2 "Mental Health: Stress, Anxiety, and.',
          misconception: '**Misconception:** *"Personal self = private thoughts; Social self = public behaviour."* Students believe the.',
          parts: [
                { id: 'a', prompt: 'Read the following case: *Rohan, 16, describes himself: "I am a science student. I am terrible at physics. I am the cricket captain. I am short-tempered.', answer: '**Correct mapping:** "I am a science student" → (d) Social role',
                  options: ['**Correct mapping:** "I am a science student" → (d) Social role', 'terrible at physics', 'Rajput'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** *"Personal self = private thoughts; Social self = public behaviour."* Students believe the personal-social distinction.' }
          ],
            remediations: { 'misconception-personal-self-private-thoughts': { steps: ['**Step-by-step remediation:** (1) Ask the student to list 5 roles they occupy (daughter, student, friend, etc.) and 5.', '(2) For each role, ask: *"Can this exist without another specific person or group?"* — No (daughter needs parents,.', 'For each trait, ask: *"Does this trait belong to you even if no one else knows it?"* — Yes (you are tall/kind/anxious.', '(3) Have them re-read NCERT: "Personal self has those aspects which relate **only to you** while social self refers to.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_002', difficulty: 'standard',
          question: 'Self-concept is the cognitive-descriptive component of the self, representing.',
          hint: 'Revisit c11_hs_cbse_02_001 Activity 1: re-do the "I am..." statements and categorise each.',
          misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Self-concept is the cognitive-descriptive component of the self, representing the',
                  options: ['Self-concept is the cognitive-descriptive component of the self, representing the', 'Puberty is the specific point in time when an individual attains sexual maturity, marked', 'The **self** is the totality of a person\'s experiences, ideas, thoughts, and feelings', 'Adolescence is a critical period for identity development'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem is *automatically* high if.' }
          ],
            remediations: { 'students-equate-self-concept-and': { steps: ['Have the student complete NCERT Activity 1 ("I am..." x10).', 'Ask them to label each statement as D (description) or E (evaluation).', 'For every E statement, ask: "What standard are you using to judge this? Where did that standard come from?"', 'Show a case where identical D statements yield different E outcomes due to different standards (Priya/Rahul example).'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Improving self-esteem requires only changing negative self-concept statements to positive ones (e.g., \'I am stupid\' → \'I am smart\').".', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'standards largely influenced by society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem is *automatically* high if.' }
          ],
            remediations: { 'students-equate-self-concept-and': { steps: ['Have the student complete NCERT Activity 1 ("I am..." x10).', 'Ask them to label each statement as D (description) or E (evaluation).', 'For every E statement, ask: "What standard are you using to judge this? Where did that standard come from?"', 'Show a case where identical D statements yield different E outcomes due to different standards (Priya/Rahul example).'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_006', difficulty: 'standard',
          question: 'Adolescence is a critical period for identity development because it is the.',
          hint: 'Revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and.',
          misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence.',
          parts: [
                { id: 'a', prompt: 'According to Erik Erikson, what is the primary psychosocial crisis of adolescence, and what are the two possible outcomes of this crisis?', answer: 'The primary psychosocial crisis of adolescence is **Identity vs Role Confusion**',
                  options: ['The primary psychosocial crisis of adolescence is **Identity vs Role Confusion**', 'trust vs mistrust', 'autonomy vs shame'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence (separation from.' },
                { id: 'b', prompt: 'A 14-year-old boy in a traditional weaving community in Gujarat has been learning the family craft since age 10 and will take over the business at 18.', answer: 'The Mumbai adolescent is more likely to experience role confusion',
                  options: ['The Mumbai adolescent is more likely to experience role confusion', '**Step 3:** Recall textbook', 'traditional = suppressed identity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence (separation from.' }
          ],
            remediations: { 'students-equate-identity-crisis-with': { steps: ['** Re-read textbook pages 15–16 (cultural variations section) and highlight every sentence contrasting Western and.', '** Create a two-column table: Column A = "Western cultural script for adolescent independence" (keywords: separation,.', '** Identify the specific sentence: "In all cultures, however, adolescence is reported to be accompanied by dilemmas and.', '** Practice explaining to a peer: "Identity crisis is the normal developmental *work* of adolescence, not a disease.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "All adolescents experience identity crisis." Using evidence from the textbook about traditional communities where roles are.', answer: '**Position:** Identity crisis is *not* universal in intensity or form',
                  options: ['**Position:** Identity crisis is *not* universal in intensity or form', 'identity vs role confusion', 'delayed development', 'enmeshment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence (separation from.' }
          ],
            remediations: { 'students-equate-identity-crisis-with': { steps: ['** Re-read textbook pages 15–16 (cultural variations section) and highlight every sentence contrasting Western and.', '** Create a two-column table: Column A = "Western cultural script for adolescent independence" (keywords: separation,.', '** Identify the specific sentence: "In all cultures, however, adolescence is reported to be accompanied by dilemmas and.', '** Practice explaining to a peer: "Identity crisis is the normal developmental *work* of adolescence, not a disease.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_010', difficulty: 'standard',
          question: 'The real self is an individual\'s current, actual perception of their own.',
          hint: 'Revisit c11_hs_cbse_02_002 (Self-Concept and Self-Esteem) — specifically the distinction.',
          misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with.',
          parts: [
                { id: 'a', prompt: 'A 14-year-old girl writes in her journal: "I\'m so lazy and undisciplined.', answer: 'Real self: "I\'m so lazy and undisciplined',
                  options: ['Real self: "I\'m so lazy and undisciplined', 'hormones', 'peer pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' },
                { id: 'b', prompt: 'Compare how the real-ideal self gap manifests differently for an adolescent girl in a traditional joint family in rural Rajasthan versus an adolescent boy in a.', answer: 'source of ideal self standards, (',
                  options: ['source of ideal self standards, (', 'ideal self', 'who I want to be when I grow up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' }
          ],
            remediations: { 'the-ideal-self-is-simply': { steps: ['Ask the student to list 5 traits of their "ideal self" *right now* (not future job).', 'For each trait, ask: "What would someone *see you doing* today if you had this trait?" — forcing behavioral.', 'Compare each to a real self behavior from yesterday.', 'Explicitly label: "This *set of trait-behavior pairs* is your ideal self-schema.', 'Assign the Monthly Mapping Template (Diagnostic Q6) for 2 months to internalize the multidimensional structure.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "A large real-ideal self discrepancy always indicates poor mental health and should be minimized as quickly as possible." Defend your.', answer: 'The claim is false',
                  options: ['The claim is false', 'normal part of development', 'ideal self', 'who I want to be when I grow up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' },
                { id: 'b', prompt: 'Create a "Real vs. Ideal Self Mapping Template" for a Class 11 student to use monthly.', answer: '**REAL vs',
                  options: ['**REAL vs', 'ideal self', 'who I want to be when I grow up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' },
                { id: 'c', prompt: 'Compare how the real-ideal self gap manifests differently for an adolescent girl in a traditional joint family in rural Rajasthan versus an adolescent boy in a.', answer: 'source of ideal self standards, (',
                  options: ['source of ideal self standards, (', 'ideal self', 'who I want to be when I grow up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' }
          ],
            remediations: { 'the-ideal-self-is-simply': { steps: ['Ask the student to list 5 traits of their "ideal self" *right now* (not future job).', 'For each trait, ask: "What would someone *see you doing* today if you had this trait?" — forcing behavioral.', 'Compare each to a real self behavior from yesterday.', 'Explicitly label: "This *set of trait-behavior pairs* is your ideal self-schema.', 'Assign the Monthly Mapping Template (Diagnostic Q6) for 2 months to internalize the multidimensional structure.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_01_006', difficulty: 'standard',
          question: 'Adolescence is a critical transitional developmental stage (approximately 10-19.',
          hint: 'Revisit c11_hs_cbse_01_002 (Concept of Ecology: Biological Origin and Human Application).',
          misconception: 'Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height, weight, secondary.',
          parts: [
                { id: 'a', prompt: 'State the age range defined by WHO for adolescence and explain why HEFS specifically identifies this period as a "turning point" in human development rather.', answer: 'WHO defines adolescence as 10-19 years',
                  options: ['WHO defines adolescence as 10-19 years', 'puberty', 'teenage years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "adolescence as a turning point" solely with puberty\'s physical changes (height, weight, secondary sexual characteristics),.' }
          ],
            remediations: { 'students-equate-adolescence-as-a': { steps: ['Ask the student to draw a concept map with "Adolescence" at centre and four branches: Biological, Cognitive, Emotional,.', 'Use coloured pens to draw lines connecting changes across branches (e.g., growth spurt → body image → clothing choices.', 'Ask: "If we only addressed the biological branch, which connections would be broken?"', 'Introduce the HEFS definition: "Turning point = simultaneous multi-domain reorganisation requiring integrated support."', 'Assign a 24-hour observation of one adolescent (self or other) logging moments where two+ domains intersect.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
