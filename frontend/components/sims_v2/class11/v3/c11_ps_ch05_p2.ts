import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch05_p2: SimDef = {
    id: 'v3_c11_ps_ch05_p2',
    title: 'Rights · Part 2/2',
    subtitle: 'Discover why your rights predate the documents that list them.',
    classLevel: 11, subject: 'political_science', topic: 'Rights · Part 2/2',
    chapters: ['c11_ps_ch05'],
    nodeIds: ['c11_ps_cbse_05_007', 'c11_ps_cbse_05_008', 'c11_ps_cbse_05_009', 'c11_ps_cbse_05_010', 'c11_ps_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a claimant arguing for a right that isn\'t written yet', intro: 'Majorities have demanded things that were never rights — the test isn\'t popularity, it\'s necessity for a dignified life.', goal: 'Define rights as recognised claims and weigh moral against legal rights.' },
    discovery: {
        question: 'Rights are gifts the government hands down to citizens — agree?',
        options: ['No — rights are claims society recognises as necessary for a life of dignity; the state enforces them, it doesn\'t bestow them', 'Yes — no law, no right', 'Yes — constitutions create rights from nothing', 'No — rights are natural like weather, needing no recognition'],
        answer: 'No — rights are claims society recognises as necessary for a life of dignity; the state enforces them, it doesn\'t bestow them',
        hook: 'The right to privacy was morally real before Puttaswamy made it legally explicit — moral rights lead; legal rights follow and enforce.',
    },
    teaching: [
        { title: 'Economic, social and cultural rights (second generation rights)', text: 'Economic, social and cultural rights (ESCR) are second-generation human rights that require positive state action and resource allocation to ensure conditions for human dignity, such as the right.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Filter \'right to bunk class\' and \'right to clean water\' through the dignity test, then weigh whether legal rights are superior merely because courts enforce them.',
        labels: ['Economic, social and cultural', 'Collective rights and group', 'Rights and duties: Corresponding', 'Criticisms of the rights-based', 'Right to development'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_007', title: 'Economic, social and cultural rights (second generation rights)',
          caseStudy: { intro: 'Imagine a student reading about the Mid-Day Meal Scheme in a newspaper and wondering: "Is free lunch in school a \'right\' like voting, or just a government.',
            decisions: [{ prompt: 'What are the three categories of second-generation rights under the International Covenant on Economic, Social and Cultural Rights (ICESCR)?', options: [
                { text: 'The three categories are: (1) Economic rights (e.g., right to work, fair wages, social', outcome: 'The three categories are: (1) Economic rights (e.g., right to work, fair wages, social security.' },
                { text: 'not real rights', outcome: 'Not quite — Students believe ESCR are "not real rights" because they are in Part IV (Directive Principles).', reveals: 'escr-are-not-real-rights' },
                { text: 'not enforceable by any court', outcome: 'Not quite — Students believe ESCR are "not real rights" because they are in Part IV (Directive Principles).', reveals: 'escr-are-not-real-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_008', title: 'Collective rights and group rights: Minorities and indigenous peoples',
          caseStudy: { intro: 'Imagine a tribal village in Jharkhand where the Gram Sabha rejects a mining lease because it would destroy their sacred grove and disrupt their community.',
            decisions: [{ prompt: 'What is the fundamental distinction between a collective right and an individual right in terms of who holds the right and what it protects?', options: [
                { text: 'A collective right is held by a group as a corporate entity (e.g., a minority community', outcome: 'A collective right is held by a group as a corporate entity (e.g., a minority community or tribal.' },
                { text: 'collective rights are just the sum of individual rights', outcome: 'Not quite — Students often think collective rights mean "special privileges for minorities that violate.', reveals: 'collective-rights-mean-special-privileges' },
                { text: 'special privileges for minorities that violate equality', outcome: 'Not quite — Students often think collective rights mean "special privileges for minorities that violate.', reveals: 'collective-rights-mean-special-privileges' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_010', title: 'Criticisms of the rights-based approach: Communitarian critique',
          caseStudy: { intro: 'Imagine a village panchayat bans loudspeakers for religious processions after 10 PM to protect elderly residents\' sleep — a rights advocate cries "violation.',
            decisions: [{ prompt: 'What is the central communitarian concept of the "unencumbered self," and which liberal theorist is most associated with this conception?', options: [
                { text: 'The "unencumbered self" is the liberal idea that individuals stand prior to their ends,', outcome: 'The "unencumbered self" is the liberal idea that individuals stand prior to their ends, values, and.' },
                { text: 'the self that has no rights', outcome: 'Not quite — Students often equate "communitarian critique" with "anti-rights" or "majoritarian imposition,".', reveals: 'students-often-equate-communitarian-critique' },
                { text: 'the selfish individual', outcome: 'Not quite — Students often equate "communitarian critique" with "anti-rights" or "majoritarian imposition,".', reveals: 'students-often-equate-communitarian-critique' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_011', title: 'Right to development and third generation rights',
          caseStudy: { intro: 'Imagine a tribal community in Chhattisgarh facing displacement due to a mining project approved by the state government; they claim not just compensation (a.',
            decisions: [{ prompt: 'What are the three generations of rights as classified by Karel Vasak, and which generation does the Right to Development belong to?', options: [
                { text: 'First generation: civil and political rights (negative liberties)', outcome: 'First generation: civil and political rights (negative liberties); second generation: economic.' },
                { text: 'just environmental rights', outcome: 'Not quite — Students often think third generation rights are "just environmental rights" or "newer versions.', reveals: 'third-generation-rights-are-just' },
                { text: 'newer versions of second generation rights', outcome: 'Not quite — Students often think third generation rights are "just environmental rights" or "newer versions.', reveals: 'third-generation-rights-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student council petition demands \'the right to unlimited phone data\' and \'the right to bunk class\', arguing \'enough of us want it, so it\'s a right.\' Separately, a senior claims privacy \'became a right only in 2017 — before the judgment, Indians had no such right.\'',
            decisions: [{ prompt: 'What makes a claim a right, and when does a right exist?', options: [
                { text: 'Apply the dignity filter and the moral/legal split: rights are justified claims necessary for a life of respect — collective moral judgement, not popularity; data and bunking fail the test however many sign. And legal recognition isn\'t creation: privacy was a moral right long before Puttaswamy made it judicially enforceable — movements convert moral claims into legal rights; parchment follows the claim, not vice versa.', outcome: 'Both cases resolve: a right needs justification for dignity, not a headcount — and a right can be morally real before a court stamps it legal.' },
                { text: 'Count the signatures — democratic demand is what makes something a right.', outcome: 'Popularity isn\'t the test: even majorities can demand things that fail the dignity-and-well-being standard or violate others\' rights.', reveals: 'popular-demand-makes-right' },
                { text: 'Agree privacy started in 2017 — no law, no right; the judgment created it.', outcome: 'That\'s legal positivism\'s blind spot: moral rights precede codification — earlier dissents and philosophical tradition recognised privacy decades before enforcement arrived.', reveals: 'rights-exist-only-when-legal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'A right that exists only on paper when courts close is weaker than a claim society has learned to defend — recognition is the substance, law the clothing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_007', difficulty: 'standard',
          question: 'Economic, social and cultural rights (ESCR) are second-generation human rights.',
          hint: 'Revisit node c11_ps_cbse_05_003 (Negative vs Positive Rights) for the theoretical.',
          misconception: 'Students believe ESCR are "not real rights" because they are in Part IV (Directive Principles) which Article 37.',
          parts: [
                { id: 'a', prompt: 'Why are economic, social and cultural rights classified as "positive rights" and how does this create a different type of state obligation compared to civil.', answer: 'ESCR are positive rights',
                  options: ['ESCR are positive rights', 'not real rights', 'not enforceable by any court'],
                  hint: 'Revisit node c11_ps_cbse_05_003 (Negative vs Positive Rights) for the theoretical distinction, and.',
                  misconception: 'Students believe ESCR are "not real rights" because they are in Part IV (Directive Principles) which Article 37 declares "not enforceable.' }
          ],
            remediations: { 'escr-are-not-real-rights': { steps: ['If the student holds this misconception: (1) Have them read the *Olga Tellis v.', 'Bombay Municipal Corporation (1985)* judgment where the Court held: "The right to life includes the right.', 'No person can live without the means of living." (2) Show the 86th Amendment (2002) inserting Article 21A (Right.', '(3) Assign a table exercise: Column A = Directive Principle (Art.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_008', difficulty: 'standard',
          question: 'Collective rights (or group rights) are entitlements held by a group as.',
          hint: 'Revisit c11_ps_cbse_05_007 (cultural rights) and c10_civ_cbse_03_004 (secularism as equal.',
          misconception: 'Students often think collective rights mean "special privileges for minorities that violate equality" — they confuse.',
          parts: [
                { id: 'a', prompt: 'Why does the Indian Constitution grant special cultural and educational rights to minorities under Articles 29 and 30, but not to the majority community?', answer: 'Articles 29-30 exist',
                  options: ['Articles 29-30 exist', 'it is reverse discrimination', 'majorities don\'t need rights', 'special privileges for minorities that violate equality'],
                  hint: 'Revisit c11_ps_cbse_05_007 (cultural rights) and c10_civ_cbse_03_004 (secularism as equal respect).',
                  misconception: 'Students often think collective rights mean "special privileges for minorities that violate equality" — they confuse *formal equality*.' },
                { id: 'b', prompt: 'A linguistic minority community in Tamil Nadu establishes a school teaching exclusively in their mother tongue and admits only children from their community.', answer: 'Yes, it is protected',
                  options: ['Yes, it is protected', 'special privileges for minorities that violate equality'],
                  hint: 'Revisit c11_ps_cbse_05_007 (cultural rights) and c10_civ_cbse_03_004 (secularism as equal respect).',
                  misconception: 'Students often think collective rights mean "special privileges for minorities that violate equality" — they confuse *formal equality*.' }
          ],
            remediations: { 'collective-rights-mean-special-privileges': { steps: ['Re-read Article 15(4) and 16(4) (special provisions for socially/educationally backward classes) alongside Articles.', 'Study the *St. Stephen\'s College v. University of Delhi* (1992) judgment where the Court explicitly says minority.', 'Apply the "veil of ignorance" test: if you didn\'t know whether you\'d be born into a majority or minority community.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think collective rights mean "special privileges for minorities that violate equality" — they confuse.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Granting collective rights to minority communities undermines national integration and creates \'a nation within a nation\'." Use the.', answer: 'The argument confuses *integration* with *assimilation*',
                  options: ['The argument confuses *integration* with *assimilation*', 'special privileges for minorities that violate equality'],
                  hint: 'Revisit c11_ps_cbse_05_007 (cultural rights) and c10_civ_cbse_03_004 (secularism as equal respect).',
                  misconception: 'Students often think collective rights mean "special privileges for minorities that violate equality" — they confuse *formal equality*.' }
          ],
            remediations: { 'collective-rights-mean-special-privileges': { steps: ['Re-read Article 15(4) and 16(4) (special provisions for socially/educationally backward classes) alongside Articles.', 'Study the *St. Stephen\'s College v. University of Delhi* (1992) judgment where the Court explicitly says minority.', 'Apply the "veil of ignorance" test: if you didn\'t know whether you\'d be born into a majority or minority community.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_009', difficulty: 'standard',
          question: 'Rights and duties are correlative concepts: every right entails a corresponding.',
          hint: 'Revisit c11_ps_cbse_05_001 (what makes a claim a right) and c8_civ_ch4_9 (Article 51A.',
          misconception: 'Students think Fundamental Duties (Article 51A) are legally enforceable like Fundamental Rights, and that violating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rights and duties are correlative concepts: every right entails a corresponding',
                  options: ['Rights and duties are correlative concepts: every right entails a corresponding', 'A right is a justified claim or entitlement that is recognised by society as necessary', 'Moral rights are justified claims grounded in ethical principles, human dignity, and', 'Negative rights are claims that require the state to refrain from interfering in an'],
                  hint: 'Revisit c11_ps_cbse_05_001 (what makes a claim a right) and c8_civ_ch4_9 (Article 51A text) — then.',
                  misconception: 'Students think Fundamental Duties (Article 51A) are legally enforceable like Fundamental Rights, and that violating a duty (e.g., not.' }
          ],
            remediations: { 'fundamental-duties-article-51a-are': { steps: ['Read Article 51A and Article 32/226 side by side — note \'shall be the duty of every citizen\' vs \'right to move Supreme.', 'Find a news report where a citizen was penalised for not performing a duty (e.g., standing for anthem in cinema).', 'Write one sentence distinguishing: "Duties guide interpretation; Rights enable litigation."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_010', difficulty: 'standard',
          question: 'The communitarian critique argues that the liberal rights-based approach.',
          hint: 'Revisit c11_ps_cbse_05_004 (Locke) and the supplementary reading on Rawls in the NCERT.',
          misconception: 'Students often equate "communitarian critique" with "anti-rights" or "majoritarian imposition," thinking communitarians.',
          parts: [
                { id: 'a', prompt: 'Apply the communitarian critique to the Supreme Court of India\'s Sabarimala judgment (2018) allowing women of menstruating age into the Ayyappa temple.', answer: 'The rights-based approach (Articles 14, 25) treats the claim as individual',
                  options: ['The rights-based approach (Articles 14, 25) treats the claim as individual', 'patriarchy', 'critique of rights-foundationalism', 'rejection of rights-protection'],
                  hint: 'Revisit c11_ps_cbse_05_004 (Locke) and the supplementary reading on Rawls in the NCERT Political.',
                  misconception: 'Students often equate "communitarian critique" with "anti-rights" or "majoritarian imposition," thinking communitarians want the state.' }
          ],
            remediations: { 'students-often-equate-communitarian-critique': { steps: ['Re-read Sandel\'s "The Procedural Republic and the Unencumbered Self" (excerpt in NCERT supplementary reader).', 'Contrast three positions on a case (e.g., hijab ban in Karnataka schools): (a) liberal neutral: ban all religious.', 'Write a 150-word note explaining why (c) is neither (a) nor (b).', 'Discuss with a peer — if they still say "communitarians want majority rule," repeat Step 2 with a new case (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_011', difficulty: 'standard',
          question: 'Third generation rights, also known as solidarity rights, are collective rights.',
          hint: 'Review c11_ps_cbse_05_003 (negative vs positive rights) and c11_ps_cbse_05_007 (second.',
          misconception: 'Students often think third generation rights are "just environmental rights" or "newer versions of second generation.',
          parts: [
                { id: 'a', prompt: 'What are the three generations of rights as classified by Karel Vasak, and which generation does the Right to Development belong to?', answer: 'First generation: civil and political rights (negative liberties)',
                  options: ['First generation: civil and political rights (negative liberties)', 'just environmental rights', 'newer versions of second generation rights'],
                  hint: 'Review c11_ps_cbse_05_003 (negative vs positive rights) and c11_ps_cbse_05_007 (second generation.',
                  misconception: 'Students often think third generation rights are "just environmental rights" or "newer versions of second generation rights." The precise.' },
                { id: 'b', prompt: 'Why is the Right to Development considered a "composite right" rather than a standalone new right?', answer: 'The Right to Development integrates all human rights',
                  options: ['The Right to Development integrates all human rights', 'it is a new right to economic growth', 'just environmental rights', 'newer versions of second generation rights'],
                  hint: 'Review c11_ps_cbse_05_003 (negative vs positive rights) and c11_ps_cbse_05_007 (second generation.',
                  misconception: 'Students often think third generation rights are "just environmental rights" or "newer versions of second generation rights." The precise.' },
                { id: 'c', prompt: 'A state government signs a Memorandum of Understanding with a multinational corporation for a mega-dam project without consulting the affected forest-dwelling.', answer: 'Violation: Right to Development\'s core components',
                  options: ['Violation: Right to Development\'s core components', 'just environmental rights', 'newer versions of second generation rights'],
                  hint: 'Review c11_ps_cbse_05_003 (negative vs positive rights) and c11_ps_cbse_05_007 (second generation.',
                  misconception: 'Students often think third generation rights are "just environmental rights" or "newer versions of second generation rights." The precise.' },
                { id: 'd', prompt: 'Compare the justiciability of first generation rights (e.g., Article 19) and third generation rights (e.g., Right to Development) in the Indian Supreme Court.', answer: 'First generation rights are directly justiciable as Fundamental Rights',
                  options: ['First generation rights are directly justiciable as Fundamental Rights', 'not justiciable at all', 'just environmental rights', 'newer versions of second generation rights'],
                  hint: 'Review c11_ps_cbse_05_003 (negative vs positive rights) and c11_ps_cbse_05_007 (second generation.',
                  misconception: 'Students often think third generation rights are "just environmental rights" or "newer versions of second generation rights." The precise.' }
          ],
            remediations: { 'third-generation-rights-are-just': { steps: ['Re-read the UN Declaration on the Right to Development (1986), Articles 1-3, noting the words "participate,".', 'Compare with the Fundamental Rights (Part III) and Directive Principles (Part IV) in the Indian Constitution — create.', 'Read the Supreme Court\'s *Narmada Bachao Andolan* judgment (2000) paragraphs on "right to development" and "sustainable.', 'Write a 150-word note: "Why the Right to Development cannot be reduced to a scheme or policy."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
