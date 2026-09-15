import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch06_p2: SimDef = {
    id: 'v3_c12_soc_ch06_p2',
    title: 'Challenges of Cultural Diversity · Part 2/2',
    subtitle: 'Unity in diversity is a policy, not a poster',
    classLevel: 12, subject: 'sociology', topic: 'Challenges of Cultural Diversity · Part 2/2',
    chapters: ['c12_soc_ch06'],
    nodeIds: ['c12_soc_cbse_06_007', 'c12_soc_cbse_06_008', 'c12_soc_cbse_06_009', 'c12_soc_cbse_06_010', 'c12_soc_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Diversity and nationhood analyst', intro: 'One metro coach, five languages, four faiths — the puzzle isn\'t how India differs, it\'s how it holds.', goal: 'Define cultural diversity, distinguish nation from nation-state, and evaluate India\'s state-nation model.' },
    discovery: {
        question: 'In 1956 Sri Lanka declared one national language and slid toward civil war; that same decade India carved its states by language and got \'perfectly consistent to be Kannadiga and Indian\'. Same impulse, opposite result — why?',
        options: ['Sri Lanka\'s assimilation told minorities their identity didn\'t count; India\'s accommodation let regional identities coexist inside national unity', 'India just got lucky', 'Sri Lanka had more diversity to manage', 'Indian languages were easier to reorganise'],
        answer: 'Sri Lanka\'s assimilation told minorities their identity didn\'t count; India\'s accommodation let regional identities coexist inside national unity',
        hook: 'Community identity isn\'t like a professional membership you can resign — it\'s ascriptive, born into you, which is why threats to language or faith ignite so fast. Diversity becomes a \'problem\' only when a state treats difference as disloyalty.',
    },
    teaching: [
        { title: 'The Constitutional Provisions for Protecting Diversity: Articles 29 and 30', text: 'Articles 29 and 30 of the Indian Constitution constitute the Cultural and Educational Rights that protect diversity by guaranteeing: (1) the right of any section of citizens with a distinct language.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast assimilationist and integrationist nation-states with India\'s state-nation model, and test whether accommodating 1,600-odd languages strengthened or strained the union.',
        labels: ['The Constitutional Provisions', 'Linguistic Reorganisation of States', 'Minority Rights and', 'Secularism in India', 'National Integration: Nehru\'s Vision'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_007', title: 'The Constitutional Provisions for Protecting Diversity: Articles 29 and 30',
          caseStudy: { intro: 'Imagine a group of Tamil-speaking families living in Delhi who want to start a school where Tamil is the medium of instruction and Tamil culture is taught.',
            decisions: [{ prompt: 'State the exact wording of Article 29(1) and Article 30(1) from the Constitution as reproduced in NCERT Box 6.7.', options: [
                { text: 'Article 29(1): "Any section of the citizens residing in the territory of India or any', outcome: 'Article 29(1): "Any section of the citizens residing in the territory of India or any part thereof.' },
                { text: 'Article 30(1)', outcome: 'Not quite — Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority.', reveals: 'students-consistently-confuse-article-29' },
                { text: 'A wrong answer (e.g., swapping', outcome: 'Not quite — Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority.', reveals: 'students-consistently-confuse-article-29' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_008', title: 'Linguistic Reorganisation of States (1956) and the SRC Report',
          caseStudy: { intro: 'Imagine you are a student in 1953 Madras Presidency: you speak Telugu but your capital is far away in Madras city, and government jobs and education operate.',
            decisions: [{ prompt: 'What was the immediate trigger for the formation of the States Reorganisation Commission in 1953?', options: [
                { text: 'The immediate trigger was the death of Potti Sriramulu after a 56-day fast unto death in', outcome: 'The immediate trigger was the death of Potti Sriramulu after a 56-day fast unto death in October.' },
                { text: 'the SRC was formed in 1947 as part of the Constitution', outcome: 'Not quite — Students often believe the SRC *only* used language as a criterion and that *every* linguistic.', reveals: 'the-src-only-used-language' },
                { text: 'it was formed due to the Partition', outcome: 'Not quite — Students often believe the SRC *only* used language as a criterion and that *every* linguistic.', reveals: 'the-src-only-used-language' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_009', title: 'Minority Rights and the Protection of Cultural and Educational Rights',
          caseStudy: { intro: 'Imagine a Parsi student in Mumbai who wants to attend a Zoroastrian-run school that teaches Avesta scriptures alongside the state curriculum, while a Muslim.',
            decisions: [{ prompt: 'Define "minority" in the sociological sense used in the NCERT textbook. How does it differ from a purely numerical definition?', options: [
                { text: 'A sociological minority is a relatively small, disadvantaged group with a strong sense of', outcome: 'A sociological minority is a relatively small, disadvantaged group with a strong sense.' },
                { text: 'minority rights = privileges for Muslims/Christians only', outcome: 'Not quite — Students think "minority rights = privileges for Muslims/Christians only." They miss that Articles.', reveals: 'minority-rights-privileges-for-muslims' },
                { text: '"minority rights = privileges for Muslims/Christians only', outcome: 'Not quite — Students think "minority rights = privileges for Muslims/Christians only." They miss that Articles.', reveals: 'minority-rights-privileges-for-muslims' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_011', title: 'National Integration: Nehru\'s Vision and the Challenges to Integration',
          caseStudy: { intro: 'Imagine you are a citizen of a newly independent India in 1950 — you speak Tamil, practice Hinduism, live in Madras Presidency, and your neighbor speaks Telugu.',
            decisions: [{ prompt: 'Define "state-nation" as used in the NCERT textbook (Box 6.2) and explain how it differs from the conventional "nation-state" model.', options: [
                { text: 'A "state-nation" is a political framework where multiple nations (ethnic, religious,', outcome: 'A "state-nation" is a political framework where multiple nations (ethnic, religious, linguistic,.' },
                { text: 'national integration', outcome: 'Not quite — Students often believe "national integration" means creating a single, uniform Indian culture.', reveals: 'national-integration-means-creating-a' },
                { text: 'A concrete wrong answer', outcome: 'Not quite — Students often believe "national integration" means creating a single, uniform Indian culture.', reveals: 'national-integration-means-creating-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A roommate shrugs at a \'locals only\' job drive: \'Just say you\'re from here — community is like a club membership; you join whichever fits.\'',
            decisions: [{ prompt: 'What does the ascriptive/achieved distinction say about that advice?', options: [
                { text: 'It fails — community identity is ascriptive: mother tongue and region are assigned at birth, unconditional and unearned, and others will keep identifying you by them no matter what you claim or learn; achieved identities are the ones you can adopt.', outcome: 'The chapter\'s split: \'what we are\' versus \'what we become\' — fluency and food can be achieved, but the markers the nativist test checks can\'t be switched on demand.' },
                { text: 'The roommate is right — twenty years of living somewhere makes you a local, so identity is flexible.', outcome: 'Assimilation is achieved, belonging is ascribed — the nativist criterion reads mother tongue, not years of residence; adapting your habits doesn\'t rewrite the marker they\'re testing.', reveals: 'living-makes-you-local' },
                { text: 'It\'s about confidence — identity is whatever you identify as, so self-declaration settles it.', outcome: 'Self-declaration doesn\'t control others\' ascription — the chapter\'s point is that community markers stick even when disowned; the drive\'s test is imposed, not chosen.', reveals: 'identity-is-self-declared' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue with data that recognising diversity built Indian unity — while insisting on sameness broke neighbours apart.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_007', difficulty: 'standard',
          question: 'Articles 29 and 30 of the Indian Constitution constitute the Cultural and.',
          hint: 'If stuck on the "any section vs minority" distinction, revisit c11_ps_cbse_11_009 (Class.',
          misconception: 'Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority rights." They write.',
          parts: [
                { id: 'a', prompt: 'A community of 50,000 Marathi-speaking people living in Gujarat wants to preserve its folk songs, dialects, and traditional dress.', answer: 'Article 29(1) protects them',
                  options: ['Article 29(1) protects them', 'minority rights', 'Article 29 protects minority culture', 'any section of citizens'],
                  hint: 'If stuck on the "any section vs minority" distinction, revisit c11_ps_cbse_11_009 (Class 11 PolSc.',
                  misconception: 'Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority rights." They write: "Article 29 protects.' },
                { id: 'b', prompt: 'A Christian missionary trust runs a government-aided college in Kerala.', answer: 'The trust\'s claim fails',
                  options: ['The trust\'s claim fails', 'principled distance', 'minority rights', 'Article 29 protects minority culture'],
                  hint: 'If stuck on the "any section vs minority" distinction, revisit c11_ps_cbse_11_009 (Class 11 PolSc.',
                  misconception: 'Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority rights." They write: "Article 29 protects.' },
                { id: 'c', prompt: 'Compare and contrast the beneficiary class and the substantive right in Article 29(1) vs. Article 30(1).', answer: '| Provision | Beneficiary Class | Substantive Right | Scope Limitation |',
                  options: ['| Provision | Beneficiary Class | Substantive Right | Scope Limitation |', 'minority', 'both protect minorities', 'minority rights'],
                  hint: 'If stuck on the "any section vs minority" distinction, revisit c11_ps_cbse_11_009 (Class 11 PolSc.',
                  misconception: 'Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority rights." They write: "Article 29 protects.' }
          ],
            remediations: { 'students-consistently-confuse-article-29': { steps: ['If the student cannot distinguish the beneficiary class ("any section" vs "minorities") or the substantive right.', 'educational institution administration), do this 3-step remediation: (1) Have them copy the exact text of Articles.', '(2) Give them three mini-scenarios: (i) Adivasi tribe in Odisha wants to document its oral folklore — which article?', '(ii) Urdu speakers in UP want to start a college — which article?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority rights." They write.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Articles 29 and 30 are redundant because Article 15(1) already prohibits discrimination on grounds of religion, race, caste, sex.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'minority rights', 'Article 29 protects minority culture', 'any section of citizens'],
                  hint: 'If stuck on the "any section vs minority" distinction, revisit c11_ps_cbse_11_009 (Class 11 PolSc.',
                  misconception: 'Students consistently confuse Article 29(1) and Article 30(1) by treating both as "minority rights." They write: "Article 29 protects.' }
          ],
            remediations: { 'students-consistently-confuse-article-29': { steps: ['If the student cannot distinguish the beneficiary class ("any section" vs "minorities") or the substantive right.', 'educational institution administration), do this 3-step remediation: (1) Have them copy the exact text of Articles.', '(2) Give them three mini-scenarios: (i) Adivasi tribe in Odisha wants to document its oral folklore — which article?', '(ii) Urdu speakers in UP want to start a college — which article?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_008', difficulty: 'standard',
          question: 'The Linguistic Reorganisation of States (1956) refers to the large-scale.',
          hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) and identify which subjects would.',
          misconception: 'Students often believe the SRC *only* used language as a criterion and that *every* linguistic group got a state.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Linguistic Reorganisation of States (1956) refers to the large-scale redrawing of',
                  options: ['The Linguistic Reorganisation of States (1956) refers to the large-scale redrawing of', 'Cultural diversity refers to the coexistence of multiple distinct social groups and', 'Community identity is an ascriptive identity formed through birth and belonging to a', 'The nation-state is a political entity where a nation (a community of communities bound'],
                  hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) and identify which subjects would be most.',
                  misconception: 'Students often believe the SRC *only* used language as a criterion and that *every* linguistic group got a state.' }
          ],
            remediations: { 'the-src-only-used-language': { steps: ['If the student conflates SRC with pure linguistic partition: (1) Re-read Box 6.3, underlining every criterion mentioned.', '(2) List 3 linguistic groups that did NOT get states (e.g., Tulu, Kodava, Gondi) and research why.', '(3) Write a 100-word paragraph contrasting "language as sole criterion" vs "language as primary but not exclusive.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_009', difficulty: 'standard',
          question: 'Minority rights refer to the constitutional safeguards (Articles 29 and 30).',
          hint: 'Revisit Class 11 Political Science node c11_ps_cbse_03_005 (Formal equality.',
          misconception: 'Students think "minority rights = privileges for Muslims/Christians only." They miss that Articles 29-30 protect.',
          parts: [
                { id: 'a', prompt: 'Compare the "assimilationist" and "integrationist" state strategies described in Box 6.1 with India\'s constitutional approach.', answer: 'Assimilationist: forces uniform culture of dominant group',
                  options: ['Assimilationist: forces uniform culture of dominant group', 'secular like France', 'assimilationist like Pakistan', 'minority rights = privileges for Muslims/Christians only'],
                  hint: 'Revisit Class 11 Political Science node c11_ps_cbse_03_005 (Formal equality vs substantive.',
                  misconception: 'Students think "minority rights = privileges for Muslims/Christians only." They miss that Articles 29-30 protect *linguistic* minorities.' }
          ],
            remediations: { 'minority-rights-privileges-for-muslims': { steps: ['Re-read Box 6.5 (relative size/distribution of religious minorities) and Box 6.7 (Articles 29-30 text).', 'List *five* linguistic minority situations in your state (e.g., Urdu speakers in UP, Konkani speakers in Kerala).', 'For each, identify which clause of Article 29 or 30 applies.', 'Write one paragraph explaining why *linguistic* minorities need Article 29(1) even if they are not religiously distinct.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_010', difficulty: 'standard',
          question: 'Indian secularism is a constitutional principle where the state maintains.',
          hint: 'If stuck on \'why is Art. 30 secular?\', revisit c11_ps_cbse_08_008 (Secularism and.',
          misconception: '**Exact error:** "Indian secularism means the state stays away from religion / separation of religion and state." **Why.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Indian secularism is a constitutional principle where the state maintains **principled',
                  options: ['Indian secularism is a constitutional principle where the state maintains **principled', 'Cultural diversity refers to the coexistence of multiple distinct social groups and', 'Community identity is an ascriptive identity formed through birth and belonging to a', 'The nation-state is a political entity where a nation (a community of communities bound'],
                  hint: 'If stuck on \'why is Art. 30 secular?\', revisit c11_ps_cbse_08_008 (Secularism and minority rights).',
                  misconception: '**Exact error:** "Indian secularism means the state stays away from religion / separation of religion and state." **Why students make it:**.' }
          ],
            remediations: { 'exact-error-indian-secularism-means': { steps: ['Re-read NCERT Box 6.8 ("Secularism") and the two paragraphs after it — highlight every verb showing state *action*.', 'Make a two-column table: **Western Model** (State ⊥ Religion) vs **Indian Model** (State ↔ Religion *on principle*).', 'Fill with: public holidays, Art.', '17 abolition of untouchability, Sabarimala/Triple Talaq interventions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_011', difficulty: 'standard',
          question: 'National integration in Nehru\'s vision refers to the process of forging.',
          hint: 'Revisit Box 6.1 (assimilationist vs integrationist policies) and Box 6.2 (state-nation.',
          misconception: 'Students often believe "national integration" means creating a single, uniform Indian culture (e.g., one language, one.',
          parts: [
                { id: 'a', prompt: 'Nehru initially opposed linguistic reorganization of states (as described in Box 6.3), fearing it would lead to further partition.', answer: 'Linguistic states strengthened unity',
                  options: ['Linguistic states strengthened unity', 'national integration', 'A concrete wrong answer', '"national integration" means creating a single, uniform Indian culture (e'],
                  hint: 'Revisit Box 6.1 (assimilationist vs integrationist policies) and Box 6.2 (state-nation alternative).',
                  misconception: 'Students often believe "national integration" means creating a single, uniform Indian culture (e.g., one language, one religion, one set.' },
                { id: 'b', prompt: 'A state government proposes a law making the majority community\'s language the sole official language for all government jobs and education, arguing this will.', answer: 'This proposal violates the Indian model because: (1) It adopts an',
                  options: ['This proposal violates the Indian model because: (1) It adopts an', 'practical', 'unifying', 'national integration'],
                  hint: 'Revisit Box 6.1 (assimilationist vs integrationist policies) and Box 6.2 (state-nation alternative).',
                  misconception: 'Students often believe "national integration" means creating a single, uniform Indian culture (e.g., one language, one religion, one set.' }
          ],
            remediations: { 'national-integration-means-creating-a': { steps: ['If the student holds the assimilationist misconception: (1) Have them re-read Box 6.1 and Box 6.2 side-by-side.', '"multiple and complementary identities").', '(2) Assign the Sri Lanka/Pakistan comparison in Box 6.3 as a case study — ask: "What happened when a state tried.', 'What happened when India *didn\'t*?" (3) Have them write a 150-word response to: "Why did Ambedkar say minorities \'have.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
