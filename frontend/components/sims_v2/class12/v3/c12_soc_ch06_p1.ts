import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch06_p1: SimDef = {
    id: 'v3_c12_soc_ch06_p1',
    title: 'Challenges of Cultural Diversity · Part 1/2',
    subtitle: 'Unity in diversity is a policy, not a poster',
    classLevel: 12, subject: 'sociology', topic: 'Challenges of Cultural Diversity · Part 1/2',
    chapters: ['c12_soc_ch06'],
    nodeIds: ['c12_soc_cbse_06_001', 'c12_soc_cbse_06_002', 'c12_soc_cbse_06_003', 'c12_soc_cbse_06_004', 'c12_soc_cbse_06_005', 'c12_soc_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Diversity and nationhood analyst', intro: 'One metro coach, five languages, four faiths — the puzzle isn\'t how India differs, it\'s how it holds.', goal: 'Define cultural diversity, distinguish nation from nation-state, and evaluate India\'s state-nation model.' },
    discovery: {
        question: 'In 1956 Sri Lanka declared one national language and slid toward civil war; that same decade India carved its states by language and got \'perfectly consistent to be Kannadiga and Indian\'. Same impulse, opposite result — why?',
        options: ['Sri Lanka\'s assimilation told minorities their identity didn\'t count; India\'s accommodation let regional identities coexist inside national unity', 'India just got lucky', 'Sri Lanka had more diversity to manage', 'Indian languages were easier to reorganise'],
        answer: 'Sri Lanka\'s assimilation told minorities their identity didn\'t count; India\'s accommodation let regional identities coexist inside national unity',
        hook: 'Community identity isn\'t like a professional membership you can resign — it\'s ascriptive, born into you, which is why threats to language or faith ignite so fast. Diversity becomes a \'problem\' only when a state treats difference as disloyalty.',
    },
    teaching: [
        { title: 'Cultural Diversity in India: Linguistic, Religious, Regional and Ethnic Plurality', text: 'Cultural diversity refers to the coexistence of multiple distinct social groups and communities within a society, differentiated by cultural markers such as language, religion, sect, race, caste.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast assimilationist and integrationist nation-states with India\'s state-nation model, and test whether accommodating 1,600-odd languages strengthened or strained the union.',
        labels: ['Cultural Diversity in India', 'The Concept of Community', 'The Nation-State and Cultural', 'Communalism: Definition, Origins', 'Regionalism and Regional Aspirations', 'Casteism: Caste as'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_001', title: 'Cultural Diversity in India: Linguistic, Religious, Regional and Ethnic Plurality',
          caseStudy: { intro: 'Imagine you\'re in a metro coach in Delhi: you hear Tamil, Bengali, Marathi, Punjabi, and Malayalam within five minutes; you see a Sikh gentleman in a turban,.',
            decisions: [{ prompt: 'Define "cultural diversity" in sociological terms and explain how it differs from "social inequality." Use the NCERT distinction between.', options: [
                { text: 'Cultural diversity refers to the presence of multiple communities distinguished by', outcome: 'Cultural diversity refers to the presence of multiple communities distinguished by cultural markers.' },
                { text: 'The term \'diversity\' emphasises differences rather than inequalities', outcome: 'Not quite — **Misconception:** "Cultural diversity is a problem because it divides people; a strong nation.', reveals: 'misconception-cultural-diversity-is-a' },
                { text: 'challenge', outcome: 'Not quite — **Misconception:** "Cultural diversity is a problem because it divides people; a strong nation.', reveals: 'misconception-cultural-diversity-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_002', title: 'The Concept of Community Identity: Language, Religion and Region as Bases of Identity',
          caseStudy: { intro: 'Imagine you are filling out a college application form that asks for "mother tongue," "religion," and "state of domicile" — why do these three questions appear.',
            decisions: [{ prompt: 'A student writes: "Community identity is the same as professional identity because both give us a sense of belonging." Identify the error.', options: [
                { text: 'The error is conflating ascriptive and achieved identities', outcome: 'The error is conflating ascriptive and achieved identities. Community identity is ascriptive.' },
                { text: 'without preconditions, and yet total', outcome: 'Not quite — Students often think "ascriptive identity = primitive/backward" and "achieved identity.', reveals: 'ascriptive-identity-primitive-backward-and' },
                { text: 'necessary pre-conditions', outcome: 'Not quite — Students often think "ascriptive identity = primitive/backward" and "achieved identity.', reveals: 'ascriptive-identity-primitive-backward-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_004', title: 'Communalism: Definition, Origins and the Politics of Religious Identity',
          caseStudy: { intro: 'Imagine you see a social media post claiming "All members of Religion X are loyal to the nation, while all members of Religion Y are inherently anti-national.".',
            decisions: [{ prompt: 'Define communalism in the South Asian context and state how its meaning differs from the ordinary English word "communal".', options: [
                { text: 'Communalism in South Asia refers to an aggressive political ideology based on religious', outcome: 'Communalism in South Asia refers to an aggressive political ideology based on religious identity.' },
                { text: 'strong religious belief', outcome: 'Not quite — Students often think communalism is simply "strong religious feeling" or "fanaticism." They write.', reveals: 'communalism-is-simply-strong-religious' },
                { text: 'community service', outcome: 'Not quite — Students often think communalism is simply "strong religious feeling" or "fanaticism." They write.', reveals: 'communalism-is-simply-strong-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_005', title: 'Regionalism and Regional Aspirations: Linguistic States and Sons of the Soil Doctrine',
          caseStudy: { intro: 'Imagine you are a Marathi-speaking youth in 1960s Bombay (now Mumbai) watching Gujarati merchants dominate business while your community feels excluded — or.',
            decisions: [{ prompt: 'Define "regionalism" in the Indian context and distinguish it from "separatism" using one specific criterion from the NCERT framework.', options: [
                { text: 'Regionalism seeks greater autonomy or statehood WITHIN the Indian Union (e.g., Telangana', outcome: 'Regionalism seeks greater autonomy or statehood WITHIN the Indian Union (e.g., Telangana 2014).' },
                { text: 'helped strengthen Indian unity', outcome: 'Not quite — Students conflate "regionalism" with "communalism" — they think both are "divisive identity.', reveals: 'students-conflate-regionalism-with-communalism' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A roommate shrugs at a \'locals only\' job drive: \'Just say you\'re from here — community is like a club membership; you join whichever fits.\'',
            decisions: [{ prompt: 'What does the ascriptive/achieved distinction say about that advice?', options: [
                { text: 'It fails — community identity is ascriptive: mother tongue and region are assigned at birth, unconditional and unearned, and others will keep identifying you by them no matter what you claim or learn; achieved identities are the ones you can adopt.', outcome: 'The chapter\'s split: \'what we are\' versus \'what we become\' — fluency and food can be achieved, but the markers the nativist test checks can\'t be switched on demand.' },
                { text: 'The roommate is right — twenty years of living somewhere makes you a local, so identity is flexible.', outcome: 'Assimilation is achieved, belonging is ascribed — the nativist criterion reads mother tongue, not years of residence; adapting your habits doesn\'t rewrite the marker they\'re testing.', reveals: 'living-makes-you-local' },
                { text: 'It\'s about confidence — identity is whatever you identify as, so self-declaration settles it.', outcome: 'Self-declaration doesn\'t control others\' ascription — the chapter\'s point is that community markers stick even when disowned; the drive\'s test is imposed, not chosen.', reveals: 'identity-is-self-declared' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue with data that recognising diversity built Indian unity — while insisting on sameness broke neighbours apart.',
            decisions: [{ prompt: 'What comes next? Challenges of Cultural Diversity · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Challenges of Cultural Diversity · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_001', difficulty: 'standard',
          question: 'Cultural diversity refers to the coexistence of multiple distinct social groups.',
          hint: 'Revisit c11_soc_cbse_02_009 (Identity: Sources and Social Construction) and.',
          misconception: '**Misconception:** "Cultural diversity is a problem because it divides people; a strong nation needs everyone to share.',
          parts: [
                { id: 'a', prompt: 'A student says: "Community identity is just like professional identity — both give you a sense of belonging." Using the concept of *ascriptive identity*.', answer: 'Community identity is *ascriptive*',
                  options: ['Community identity is *ascriptive*', 'normal', '**Why it\'s wrong:** China\'s', 'National cohesion does not require the imposition of a single identity'],
                  hint: 'Revisit c11_soc_cbse_02_009 (Identity: Sources and Social Construction) and c11_soc_cbse_04_009.',
                  misconception: '**Misconception:** "Cultural diversity is a problem because it divides people; a strong nation needs everyone to share one language, one.' }
          ],
            remediations: { 'misconception-cultural-diversity-is-a': { steps: ['If the student holds the above misconception: 1.', '**Revisit the Sri Lanka vs.', 'India comparison** (Box 6.3): Have them trace *exactly* how Sinhala-only (1956) → Tamil alienation → civil war.', '**Re-read Box 6.2 (UNDP "state-nation")**: Highlight the sentence: "Successful strategies to build \'state-nations\' can.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Cultural diversity is a problem because it divides people; a strong nation needs everyone to share.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "India\'s linguistic reorganisation of states (1956) weakened national unity." Use evidence from Box 6.3 (Ramachandra Guha) and the Sri.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'One language, fourteen or fifteen nations', 'normal', '**Why it\'s wrong:** China\'s'],
                  hint: 'Revisit c11_soc_cbse_02_009 (Identity: Sources and Social Construction) and c11_soc_cbse_04_009.',
                  misconception: '**Misconception:** "Cultural diversity is a problem because it divides people; a strong nation needs everyone to share one language, one.' }
          ],
            remediations: { 'misconception-cultural-diversity-is-a': { steps: ['If the student holds the above misconception: 1.', '**Revisit the Sri Lanka vs.', 'India comparison** (Box 6.3): Have them trace *exactly* how Sinhala-only (1956) → Tamil alienation → civil war.', '**Re-read Box 6.2 (UNDP "state-nation")**: Highlight the sentence: "Successful strategies to build \'state-nations\' can.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_002', difficulty: 'standard',
          question: 'Community identity is an ascriptive identity formed through birth and belonging.',
          hint: 'Revisit c11_soc_cbse_02_004 (Status: Ascribed Versus Achieved Status) and.',
          misconception: 'Students often think "ascriptive identity = primitive/backward" and "achieved identity = modern/progressive." They.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Community identity is the same as professional identity because both give us a sense of belonging." Identify the error in this statement and.', answer: 'The error is conflating ascriptive and achieved identities',
                  options: ['The error is conflating ascriptive and achieved identities', 'without preconditions, and yet total', 'necessary pre-conditions', 'ascriptive identity = primitive/backward'],
                  hint: 'Revisit c11_soc_cbse_02_004 (Status: Ascribed Versus Achieved Status) and c11_soc_cbse_02_009.',
                  misconception: 'Students often think "ascriptive identity = primitive/backward" and "achieved identity = modern/progressive." They write: "In modern.' },
                { id: 'b', prompt: 'The NCERT states: "It is an odd fact of social life that people feel a deep sense of security and satisfaction in belonging to communities in which their.', answer: 'Because the membership is unconditional and inescapable',
                  options: ['Because the membership is unconditional and inescapable', 'accidental means it doesn\'t matter', 'ascriptive identity = primitive/backward', 'achieved identity = modern/progressive'],
                  hint: 'Revisit c11_soc_cbse_02_004 (Status: Ascribed Versus Achieved Status) and c11_soc_cbse_02_009.',
                  misconception: 'Students often think "ascriptive identity = primitive/backward" and "achieved identity = modern/progressive." They write: "In modern.' },
                { id: 'c', prompt: 'Apply the concept of ascriptive identity to this situation: A person born into a Tamil-speaking Hindu family in Chennai moves to Mumbai for work, learns.', answer: 'Two ascriptive identities operate: (1) Mother tongue (Tamil)',
                  options: ['Two ascriptive identities operate: (1) Mother tongue (Tamil)', 'they became Marathi by learning the language', 'ascriptive identity = primitive/backward', 'achieved identity = modern/progressive'],
                  hint: 'Revisit c11_soc_cbse_02_004 (Status: Ascribed Versus Achieved Status) and c11_soc_cbse_02_009.',
                  misconception: 'Students often think "ascriptive identity = primitive/backward" and "achieved identity = modern/progressive." They write: "In modern.' }
          ],
            remediations: { 'ascriptive-identity-primitive-backward-and': { steps: ['If the student holds this misconception: Step 1 — Have them re-read the NCERT paragraph: "A second feature.', 'Everyone has a motherland..." Step 2 — Assign a mini-research: Find one example from a developed country (USA,.', 'Step 3 — Ask: "Does this country look \'backward\'?', 'Why does the identity persist?" Step 4 — Re-attempt Diagnostic Question 2 with the new understanding that universality.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_003', difficulty: 'standard',
          question: 'The nation-state is a political entity where a nation (a community.',
          hint: 'If stuck on nation vs state distinction: revisit c11_ps_cbse_07_001 (nation as imagined.',
          misconception: 'Students often conflate "secularism" with "anti-religion" or "strict separation of religion and state" (Western model).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The nation-state is a political entity where a nation (a community of communities bound',
                  options: ['The nation-state is a political entity where a nation (a community of communities bound', 'Cultural diversity refers to the coexistence of multiple distinct social groups and', 'Community identity is an ascriptive identity formed through birth and belonging to a', 'Communalism is an aggressive political ideology that mobilizes religious identity to'],
                  hint: 'If stuck on nation vs state distinction: revisit c11_ps_cbse_07_001 (nation as imagined community).',
                  misconception: 'Students often conflate "secularism" with "anti-religion" or "strict separation of religion and state" (Western model), and therefore see.' }
          ],
            remediations: { 'students-often-conflate-secularism-with': { steps: ['Revisit c11_ps_cbse_08_004 (Indian model of secularism: equal respect) and c11_ps_cbse_08_003 (Western model: wall.', 'Re-read Box 6.6 (Ambedkar) and Box 6.7 (Articles 29-30) — write a 100-word answer: "Why did Ambedkar argue minorities.', 'Re-attempt Diagnostic Question 5 after step 2.', 'If still confused, map the Sri Lanka (Sinhala Only Act) and Pakistan (Urdu imposition) cases to the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_004', difficulty: 'standard',
          question: 'Communalism is an aggressive political ideology that mobilizes religious.',
          hint: 'Revisit c12_soc_cbse_06_002 (Community Identity) and c11_soc_cbse_02_009 (Identity.',
          misconception: 'Students often think communalism is simply "strong religious feeling" or "fanaticism." They write: "Communalism means.',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT textbook insists that "communalism is about politics, not about religion." Give one example of how a devout believer may not be.', answer: 'Communalism is a political ideology that uses religious identity as a tool for',
                  options: ['Communalism is a political ideology that uses religious identity as a tool for', 'strong religious feeling', 'fanaticism', 'Communalism means being very religious and hating other religions'],
                  hint: 'Revisit c12_soc_cbse_06_002 (Community Identity) and c11_soc_cbse_02_009 (Identity: Sources and.',
                  misconception: 'Students often think communalism is simply "strong religious feeling" or "fanaticism." They write: "Communalism means being very religious.' }
          ],
            remediations: { 'communalism-is-simply-strong-religious': { steps: ['If the student conflates religiosity with communalism, do this 3-step remediation: (1) Have them re-read the NCERT.', '(2) Give two biographical sketches — one of a religious leader who opposed communalism (e.g., Maulana Azad) and one.', '(3) Assign a mini-case: "A temple trust runs a free kitchen for all communities.', 'A politician demands the kitchen serve only Hindus.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_005', difficulty: 'standard',
          question: 'Regionalism in India is a political-ideological phenomenon where people\'s.',
          hint: 'If stuck on why linguistic states didn\'t cause breakup: revisit c12_soc_cbse_06_003.',
          misconception: 'Students conflate "regionalism" with "communalism" — they think both are "divisive identity politics." They write.',
          parts: [
                { id: 'a', prompt: 'Apply the "Sons of the Soil" framework to this scenario: In 1980s Assam, the All Assam Students\' Union (AASU) demanded detection and deportation of "illegal.', answer: 'identity-based regionalism and (',
                  options: ['identity-based regionalism and (', 'illegal migration', 'Sons of the Soil'],
                  hint: 'If stuck on why linguistic states didn\'t cause breakup: revisit c12_soc_cbse_06_003 (nation-state.',
                  misconception: 'Students conflate "regionalism" with "communalism" — they think both are "divisive identity politics." They write: "Regionalism divides.' }
          ],
            remediations: { 'students-conflate-regionalism-with-communalism': { steps: ['Re-read NCERT Box 6.3 (linguistic states strengthened unity) and the paragraph on 2000 states (tribal/ecological basis).', 'Make a three-column table: Linguistic Regionalism (1950s) | Tribal-Ecological Regionalism (2000s) | Sons of Soil.', 'Watch the 15-min video "How Linguistic States Saved India" (Pratham/YouTube) to visualise the Sri Lanka/Pakistan.', 'Re-attempt Diagnostic Q2 and Q4 — if you still equate regionalism with separatism, revisit c12_soc_cbse_06_003.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_06_006', difficulty: 'standard',
          question: 'Casteism in politics refers to the mobilisation of caste identities as.',
          hint: 'Revisit c10_civ_cbse_03_006 (Politics in Caste) and c11_ps_cbse_12_004 (FPTP mechanics).',
          misconception: 'Students conflate \'caste politics\' with \'casteism\' as a moral failing of voters.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Casteism in politics refers to the mobilisation of caste identities as a primary basis',
                  options: ['Casteism in politics refers to the mobilisation of caste identities as a primary basis', 'Cultural diversity refers to the coexistence of multiple distinct social groups and', 'Community identity is an ascriptive identity formed through birth and belonging to a', 'The nation-state is a political entity where a nation (a community of communities bound'],
                  hint: 'Revisit c10_civ_cbse_03_006 (Politics in Caste) and c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students conflate \'caste politics\' with \'casteism\' as a moral failing of voters.' }
          ],
            remediations: { 'students-conflate-caste-politics-with': { steps: ['If the student moralises caste voting: Step 1 — Have them simulate a constituency game: 5 groups, FPTP rules, each.', 'Show that *any* rational group coordinates — not just castes.', 'Step 2 — Assign reading: Chandra (2004) *Why Ethnic Parties Succeed* — shows ethnic voting is a *global* FPTP pattern.', 'Step 3 — Re-diagnostic: "In a FPTP constituency with 30% Group A, 25% Group B, 45% Group C, why would Group A and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
