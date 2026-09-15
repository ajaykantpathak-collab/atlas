import type { SimDef } from '../../engine/types';

/** v3 generated — c9_civ_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_civ_ch01_p2: SimDef = {
    id: 'v3_c9_civ_ch01_p2',
    title: 'Democracy and Its Principles · Part 2/2',
    subtitle: 'Elections alone don\'t make a democracy',
    classLevel: 9, subject: 'civics', topic: 'Democracy and Its Principles · Part 2/2',
    chapters: ['c9_civ_ch01'],
    nodeIds: ['c9_civ_ch1_4', 'c9_civ_ch1_5', 'c9_civ_ch1_6', 'c9_civ_ch1_7', 'c9_civ_ch1_8', 'c9_civ_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a democracy inspector', intro: 'Any regime can stage a vote. Your job: read the Preamble and the Constitution\'s core articles, then judge which \'democracies\' are the real deal and which are wolves counting sheep.', goal: 'Distinguish procedural democracy (elections) from substantive democracy (rights, rule of law, accountability) and see how the Constitution\'s Preamble and Articles 14, 19, 21, 326 operationalise it.' },
    discovery: {
        question: 'A country holds elections every five years — but the opposition is jailed, the media is censored and courts never rule against the government. Is it a democracy?',
        options: ['No — voting is just the procedure; real democracy also demands free speech, independent courts and accountability, which this country lacks', 'Yes — elections are all that matter', 'Yes — the majority won fair and square', 'No — because it lacks a king'],
        answer: 'No — voting is just the procedure; real democracy also demands free speech, independent courts and accountability, which this country lacks',
        hook: 'Two wolves and a lamb voting on lunch is majority rule — not democracy. India\'s Preamble and Articles 14, 19, 21 and 326 exist precisely to cage the majority: 51% of votes never buys unlimited power.',
    },
    teaching: [
        { title: 'Fundamental Rights in a Democracy', text: 'Fundamental rights in a democracy are the basic civil and political guarantees that the state cannot take away from citizens — including right to equality, right to freedom, right against.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_civ_ch1_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit a fake \'democracy\' against the real checklist — popular sovereignty, political equality, rule of law, accountability — then draft a 3-article mini-constitution for a school council that actually delivers each one.',
        labels: ['Fundamental Rights in', 'Representative vs Direct Democracy', 'Parliamentary vs Presidential Democracy', 'Elections and Accountability', 'Role of Media', 'Federalism and Decentralisation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_civ_ch1_4', title: 'Fundamental Rights in a Democracy',
          caseStudy: { intro: 'Imagine a police officer stops you on the street and demands to search your bag without any reason.',
            decisions: [{ prompt: 'List the six fundamental rights guaranteed by the Indian Constitution.', options: [
                { text: 'The six fundamental rights are: (1) Right to Equality (Articles 14-18), (2) Right to', outcome: 'The six fundamental rights are: (1) Right to Equality (Articles 14-18), (2) Right to Freedom.' },
                { text: 'right to vote', outcome: 'Not quite — Students think fundamental rights are absolute — that they can never be restricted.', reveals: 'fundamental-rights-are-absolute-that' },
                { text: 'only "right to vote', outcome: 'Not quite — Students think fundamental rights are absolute — that they can never be restricted.', reveals: 'fundamental-rights-are-absolute-that' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_5', title: 'Representative vs Direct Democracy',
          caseStudy: { intro: 'Imagine your class must decide the menu for the annual day lunch.',
            decisions: [{ prompt: 'Define direct democracy and representative democracy in one sentence each, citing one Indian constitutional example for representative.', options: [
                { text: 'Direct democracy: citizens directly vote on laws/policies (e.g., Gram Sabha under Article', outcome: 'Direct democracy: citizens directly vote on laws/policies (e.g., Gram Sabha under Article 243A).' },
                { text: 'India is direct democracy', outcome: 'Not quite — Students believe "representative democracy means citizens have no direct power" and "direct.', reveals: 'representative-democracy-means-citizens-have' },
                { text: 'representative democracy means citizens have no direct power', outcome: 'Not quite — Students believe "representative democracy means citizens have no direct power" and "direct.', reveals: 'representative-democracy-means-citizens-have' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_6', title: 'Parliamentary vs Presidential Democracy',
          caseStudy: { intro: 'Imagine you are watching the news: the Indian Prime Minister faces a no-confidence motion in Lok Sabha, while the US President cannot be removed by Congress.',
            decisions: [{ prompt: 'What is the constitutional position of the President of India according to Article 74, and how does it differ from the President of the.', options: [
                { text: 'The President of India acts on the aid and advice of the Council of Ministers headed by', outcome: 'The President of India acts on the aid and advice of the Council of Ministers headed by the Prime.' },
                { text: 'President', outcome: 'Not quite — Students often think the Indian President is the real executive head like the US President because.', reveals: 'the-indian-president-is-the' },
                { text: 'the Indian President has real executive power', outcome: 'Not quite — Students often think the Indian President is the real executive head like the US President because.', reveals: 'the-indian-president-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_7', title: 'Elections and Accountability in Democracy',
          caseStudy: { intro: 'Imagine you are a Class 9 student in a village where the local MP has not visited the constituency for three years, but suddenly appears two months before.',
            decisions: [{ prompt: 'What is the constitutional article that establishes the Election Commission of India and vests it with the power of superintendence.', options: [
                { text: 'Article 324', outcome: 'Article 324. A wrong answer (e.g., Article 326 or 356) reveals the student confuses the Election.' },
                { text: 'accountability', outcome: 'Not quite — Students think "accountability" only means "voting out a bad government at the next election." They.', reveals: 'accountability-only-means-voting-out' },
                { text: 'voting out a bad government at the next election', outcome: 'Not quite — Students think "accountability" only means "voting out a bad government at the next election." They.', reveals: 'accountability-only-means-voting-out' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_8', title: 'Role of Media in a Democracy',
          caseStudy: { intro: 'Imagine you see a news report claiming your local municipality has misused funds meant for a community park. You wonder: who verified this?',
            decisions: [{ prompt: 'What constitutional article guarantees the freedom of speech and expression that includes press freedom in India?', options: [
                { text: 'Article 19(1)(a) of the Indian Constitution guarantees freedom of speech and expression', outcome: 'Article 19(1)(a) of the Indian Constitution guarantees freedom of speech and expression, which the.' },
                { text: 'media freedom means media can publish anything without consequences', outcome: 'Not quite — Students often believe "media freedom means media can publish anything without consequences." They.', reveals: 'media-freedom-means-media-can' },
                { text: '"media freedom means media can publish anything without consequences', outcome: 'Not quite — Students often believe "media freedom means media can publish anything without consequences." They.', reveals: 'media-freedom-means-media-can' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_9', title: 'Federalism and Decentralisation of Power',
          caseStudy: { intro: 'Imagine you are a Class 9 student in Nagaland: your state has special powers under Article 371A over religious/social practices and land ownership that Tamil.',
            decisions: [{ prompt: 'What are the three lists in the Seventh Schedule of the Indian Constitution, and which level of government has exclusive power to legislate.', options: [
                { text: 'The three lists are Union List (97 subjects originally, e.g., Defence, Atomic Energy),', outcome: 'The three lists are Union List (97 subjects originally, e.g., Defence, Atomic Energy), State List.' },
                { text: 'States can make laws on Defence during emergencies', outcome: 'Not quite — Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation.', reveals: 'federalism-states-have-sovereign-powers' },
                { text: 'Federalism = States have sovereign powers like in the USA', outcome: 'Not quite — Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation.', reveals: 'federalism-states-have-sovereign-powers' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_4', title: 'A real-world call',
          caseStudy: { intro: 'A democratically elected government can legally pass a law that a minority community experiences as unjust. Everything was done by the rules; the outcome still harms.',
            decisions: [{ prompt: 'Is a law legitimate just because it was democratically passed?', options: [
                { text: 'Yes — process is what makes law law', outcome: 'The procedural answer; but \'legally passed\' has sheltered every unjust law that ever existed.' },
                { text: 'No — rights exist above majority votes', outcome: 'The constitutional answer — democracies have courts precisely for this; the check only works if it\'s allowed to work.' },
                { text: 'Legitimate procedurally, contestable morally', outcome: 'The complete answer — the law is legal AND can still be wrong; democracy\'s test is whether the wrong can be challenged.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A news item describes a country that votes every five years — yet opposition leaders sit in jail, the media is censored, and courts never rule against the government. A classmate shrugs: \'They hold elections, so it\'s a democracy.\'',
            decisions: [{ prompt: 'Does voting alone settle the question?', options: [
                { text: 'No — elections are only the procedure. Substantive democracy also needs political freedom (speech, fair contest), rule of law with independent courts, and rulers accountable to the ruled; India writes these into Articles 19, 14 and 326 precisely so that a ballot cannot coexist with jail cells for critics.', outcome: 'This separates procedural from substantive democracy — the full system is continuous constraints on power, not a single voting day.' },
                { text: 'The classmate is right — a government that won an election carries the people\'s mandate and can govern as it likes.', outcome: 'A mandate is limited authority, not a blank cheque; constitutional rights and courts exist exactly to stop a majority from becoming a tyranny.', reveals: 'mandate-is-unlimited' },
                { text: 'It fails as a democracy only because its elections might be rigged — fair counting would fix everything.', outcome: 'Even honest counting would leave jailed opponents and censored media untouched; the missing pieces are rights and accountability, not arithmetic.', reveals: 'counting-is-democracy' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Democracy isn\'t an event called \'election day\' — it\'s a permanent cage around power. Rights, courts and accountability are what keep majority rule from becoming majority tyranny.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch1_4', difficulty: 'standard',
          question: 'Fundamental rights in a democracy are the basic civil and political guarantees.',
          hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to understand why rights.',
          misconception: 'Students think fundamental rights are absolute — that they can never be restricted.',
          parts: [
                { id: 'a', prompt: 'A factory employs a 12-year-old child to work 10 hours a day. Which fundamental right is violated and how?', answer: 'The Right against Exploitation (Article 24) is violated',
                  options: ['The Right against Exploitation (Article 24) is violated', 'right to freedom', 'fundamental rights are absolute'],
                  hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to understand why rights are.',
                  misconception: 'Students think fundamental rights are absolute — that they can never be restricted.' },
                { id: 'b', prompt: 'A government school denies admission to a student because of their caste. Which fundamental right is violated, and what remedy is available?', answer: 'The Right to Equality (Article 15) is violated',
                  options: ['The Right to Equality (Article 15) is violated', 'fundamental rights are absolute'],
                  hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to understand why rights are.',
                  misconception: 'Students think fundamental rights are absolute — that they can never be restricted.' }
          ],
            remediations: { 'fundamental-rights-are-absolute-that': { steps: ['Give the student a card with one fundamental right (e.g., Right to Equality).', 'Ask them to describe a real-life situation where this right would apply.', 'Then ask: "Can the government restrict this right?', 'Introduce the concept of "reasonable restrictions" with examples (e.g., freedom of speech does not include the right.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think fundamental rights are absolute — that they can never be restricted.',
          parts: [
                { id: 'a', prompt: 'A state government passes a law banning a religious procession by a minority community, citing "public order." The community challenges it in court.', answer: 'Rights at stake: (1) Right to Freedom of Religion (Article 25)',
                  options: ['Rights at stake: (1) Right to Freedom of Religion (Article 25)', 'the government can ban anything for public order', 'fundamental rights are absolute'],
                  hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to understand why rights are.',
                  misconception: 'Students think fundamental rights are absolute — that they can never be restricted.' }
          ],
            remediations: { 'fundamental-rights-are-absolute-that': { steps: ['Give the student a card with one fundamental right (e.g., Right to Equality).', 'Ask them to describe a real-life situation where this right would apply.', 'Then ask: "Can the government restrict this right?', 'Introduce the concept of "reasonable restrictions" with examples (e.g., freedom of speech does not include the right.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_5', difficulty: 'standard',
          question: 'Direct democracy is a system where citizens participate directly.',
          hint: 'Revisit c8_civ_ch1_3 (Article 326) and c8_civ_ch2_4 (Lok Sabha as directly elected house).',
          misconception: 'Students believe "representative democracy means citizens have no direct power" and "direct democracy is more.',
          parts: [
                { id: 'a', prompt: 'A village Gram Sabha (direct democracy) passes a resolution banning plastic use.', answer: 'State law prevails',
                  options: ['State law prevails', 'Gram Sabha wins because it\'s direct democracy', 'representative democracy means citizens have no direct power', 'direct democracy is more democratic'],
                  hint: 'Revisit c8_civ_ch1_3 (Article 326) and c8_civ_ch2_4 (Lok Sabha as directly elected house).',
                  misconception: 'Students believe "representative democracy means citizens have no direct power" and "direct democracy is more democratic." They cite.' },
                { id: 'b', prompt: 'Compare the accountability mechanism in direct democracy (Athenian Assembly) vs. representative democracy (Indian Parliament).', answer: 'In direct democracy, no agent exists',
                  options: ['In direct democracy, no agent exists', 'elections', 'representative democracy means citizens have no direct power', 'direct democracy is more democratic'],
                  hint: 'Revisit c8_civ_ch1_3 (Article 326) and c8_civ_ch2_4 (Lok Sabha as directly elected house).',
                  misconception: 'Students believe "representative democracy means citizens have no direct power" and "direct democracy is more democratic." They cite.' }
          ],
            remediations: { 'representative-democracy-means-citizens-have': { steps: ['Contrast Gram Sabha meeting (watch 5-min video from e-GramSwaraj portal) with Lok Sabha debate — note who speaks, who.', 'Map constitutional articles: Article 243A (Gram Sabha powers) vs Article 79/107 (Parliament lawmaking).', 'Analyze a real case — 2013 Gram Sabha in Odisha\'s Niyamgiri rejected mining lease (direct democracy protecting tribal.', 'Complete a Venn diagram: "Direct power in India" (Gram Sabha, RTI, social audit, recall in some states).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_6', difficulty: 'standard',
          question: 'Parliamentary democracy is a system where the executive (Prime Minister and.',
          hint: 'If stuck, revisit Article 74 and 75 of the Indian Constitution and the Class 8 node.',
          misconception: 'Students often think the Indian President is the real executive head like the US President because both are called.',
          parts: [
                { id: 'a', prompt: 'In a hypothetical scenario, the Indian Prime Minister loses a vote of confidence in Lok Sabha.', answer: 'The Indian PM must resign or advise dissolution of Lok Sabha (Article 85)',
                  options: ['The Indian PM must resign or advise dissolution of Lok Sabha (Article 85)', 'President', 'the US President can be removed by a congressional vote of no confidence'],
                  hint: 'If stuck, revisit Article 74 and 75 of the Indian Constitution and the Class 8 node c8_civ_ch2_1.',
                  misconception: 'Students often think the Indian President is the real executive head like the US President because both are called "President" and both are.' }
          ],
            remediations: { 'the-indian-president-is-the': { steps: ['Use Article 74(1) text: "There shall be a Council of Ministers with the Prime Minister at the head to aid and advise.', 'Then compare with the US Constitution Article II Section 1: "The executive Power shall be vested in a President." Ask.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_7', difficulty: 'standard',
          question: 'Elections in a democracy are a constitutional mechanism (Article 324-329).',
          hint: 'Revisit c8_civ_ch2_6 (Functions of Parliament: Oversight) and c8_civ_ch1_7 (Election.',
          misconception: 'Students think "accountability" only means "voting out a bad government at the next election." They miss that.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional article that establishes the Election Commission of India and vests it with the power of superintendence, direction, and control.', answer: 'Article 324',
                  options: ['Article 324', 'accountability', 'voting out a bad government at the next election', '"accountability" only means "voting out a bad government at the next election'],
                  hint: 'Revisit c8_civ_ch2_6 (Functions of Parliament: Oversight) and c8_civ_ch1_7 (Election Commission.',
                  misconception: 'Students think "accountability" only means "voting out a bad government at the next election." They miss that accountability in.' }
          ],
            remediations: { 'accountability-only-means-voting-out': { steps: ['Show a 5-minute video clip of Lok Sabha Question Hour (available on Sansad TV YouTube) where a Minister is questioned.', 'Ask: "Is the Minister facing an election right now? Then why is he answering?"', 'Map the answer to the concept: "This is institutional accountability – the Executive answering to the Legislature."', 'Contrast with electoral accountability using a timeline: Election -> 5 years -> Election.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_8', difficulty: 'standard',
          question: 'The media in a democracy acts as the "fourth estate" — an independent.',
          hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights in a Democracy) and c8_civ_ch4_7 (Right.',
          misconception: 'Students often believe "media freedom means media can publish anything without consequences." They confuse Article.',
          parts: [
                { id: 'a', prompt: 'A newspaper publishes an investigative report alleging corruption in a government housing scheme, based on documents obtained via an RTI application.', answer: 'Yes, it strengthens democracy',
                  options: ['Yes, it strengthens democracy', 'freedom of press', 'media freedom means media can publish anything without consequences', '"media freedom means media can publish anything without consequences'],
                  hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights in a Democracy) and c8_civ_ch4_7 (Right to Freedom.',
                  misconception: 'Students often believe "media freedom means media can publish anything without consequences." They confuse Article 19(1)(a) (right) with.' }
          ],
            remediations: { 'media-freedom-means-media-can': { steps: ['Show a real example — a 2023 news debate discussing a pending Supreme Court case on electoral bonds, violating the sub.', 'Have the student locate Article 19(2) "contempt of court" and "administration of justice" as grounds for restriction.', 'Ask: "If media tries the case publicly, how does that hurt the accused\'s right to fair trial (Article 21)?"', 'Conclude: Media freedom is not absolute; it is balanced against other democratic rights.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_9', difficulty: 'standard',
          question: 'Federalism in India is a constitutional system of governance where legislative.',
          hint: 'Revisit Class 6 \'Levels of Government: National, State, Local\' (c6_civics_ch11_013) and.',
          misconception: 'Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation = State Government.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Federalism in India is a constitutional system of governance where legislative,',
                  options: ['Federalism in India is a constitutional system of governance where legislative,', 'Democracy is a system of government in', 'Local Governance in India refers to the constitutionally mandated third tier of', 'Women\'s representation in democracy refers to the constitutional and institutional'],
                  hint: 'Revisit Class 6 \'Levels of Government: National, State, Local\' (c6_civics_ch11_013) and Class 7.',
                  misconception: 'Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation = State Government gives powers.' }
          ],
            remediations: { 'federalism-states-have-sovereign-powers': { steps: ['Read Article 1 ("India, that is Bharat, shall be a Union of States") and Article 3 (Parliament can form new.', 'Create a two-column table: "Federal Features" (written constitution, division of powers, independent judiciary.', 'For decentralisation, read Article 243E ("duration of Panchayats...', 'Re-attempt Diagnostic Q5 and Q6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
