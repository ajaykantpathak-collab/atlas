import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch11_p2: SimDef = {
    id: 'v3_c11_ps_ch11_p2',
    title: 'Rights in the Indian Constitution · Part 2/2',
    subtitle: 'Learn why the strongest rights still carry asterisks.',
    classLevel: 11, subject: 'political_science', topic: 'Rights in the Indian Constitution · Part 2/2',
    chapters: ['c11_ps_ch11'],
    nodeIds: ['c11_ps_cbse_11_007', 'c11_ps_cbse_11_008', 'c11_ps_cbse_11_009', 'c11_ps_cbse_11_010', 'c11_ps_cbse_11_011', 'c11_ps_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rights lawyer reading the fine print of Article 19', intro: 'The same Article that guarantees your speech lists eight ways it can be reasonably limited — the clause is the design, not the loophole.', goal: 'Apply restriction clauses to fundamental rights and define \'State\' under Article 12.' },
    discovery: {
        question: 'They\'re called *fundamental* rights — so no government can restrict them, ever?',
        options: ['No — \'fundamental\' isn\'t \'absolute\': Article 19(2) alone lists eight grounds for reasonable restriction on free speech', 'Yes — fundamental means untouchable', 'Yes — that\'s what Part III guarantees', 'No — because rights were abolished in 1976'],
        answer: 'No — \'fundamental\' isn\'t \'absolute\': Article 19(2) alone lists eight grounds for reasonable restriction on free speech',
        hook: 'And \'the State\' reaches further than government offices — ONGC, SEBI and aided universities all count under Article 12, though the boundary is a test, not a title.',
    },
    teaching: [
        { title: 'Right against Exploitation (Articles 23-24): Forced labour and child labour', text: 'The Right against Exploitation under Articles 23 and 24 of the Indian Constitution prohibits trafficking in human beings, begar (forced labour without payment), and other similar forms of forced.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Weigh the charge that unelected judges striking laws is anti-democratic, then judge whether Articles 33–34 hole the basic structure.',
        labels: ['Right against Exploitation (Articles', 'Right to Freedom', 'Cultural and Educational Rights', 'Right to Constitutional Remedies', 'Relationship between Fundamental Rights', 'Suspension of Fundamental Rights'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_007', title: 'Right against Exploitation (Articles 23-24): Forced labour and child labour',
          caseStudy: { intro: 'Imagine a 12-year-old working 14-hour shifts in a bangle factory in Firozabad, or a family in rural Bihar trapped for generations repaying a ₹5,000 loan.',
            decisions: [{ prompt: 'State the exact constitutional prohibition under Article 23(1) and the single exception provided in Article 23(2).', options: [
                { text: 'Article 23(1) prohibits "traffic in human beings and begar and other similar forms of', outcome: 'Article 23(1) prohibits "traffic in human beings and begar and other similar forms of forced.' },
                { text: 'Article 23 bans all child labour', outcome: 'Not quite — Students often think Article 23 applies *only* to the government (like Article 14) and that "forced.', reveals: 'article-23-applies-only-to' },
                { text: 'exception includes private employers', outcome: 'Not quite — Students often think Article 23 applies *only* to the government (like Article 14) and that "forced.', reveals: 'article-23-applies-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_008', title: 'Right to Freedom of Religion (Articles 25-28): Secular character',
          caseStudy: { intro: 'Imagine you\'re reading a news report about a temple entry restriction for women of menstruating age, or a hijab ban in Karnataka classrooms, or a debate over.',
            decisions: [{ prompt: 'What is the precise constitutional distinction between Article 25(1) and Article 25(2) regarding the scope of state regulation over.', options: [
                { text: 'Article 25(1) guarantees the fundamental right to freely profess, practice, and propagate', outcome: 'Article 25(1) guarantees the fundamental right to freely profess, practice, and propagate religion.' },
                { text: 'secularism in India means the state has nothing to do with religion', outcome: 'Not quite — Students believe "secularism in India means the state has nothing to do with religion" (strict.', reveals: 'secularism-in-india-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_010', title: 'Right to Constitutional Remedies (Article 32): Heart and soul of the Constitution',
          caseStudy: { intro: 'Imagine you read a news report that a 16-year-old student was detained by police for three days without being produced before a magistrate, and no FIR was.',
            decisions: [{ prompt: 'What is the exact constitutional designation of Article 32 - is it a Fundamental Right, a Directive Principle, or a structural provision?', options: [
                { text: 'Article 32 is a Fundamental Right located in Part III (Fundamental Rights), Chapter', outcome: 'Article 32 is a Fundamental Right located in Part III (Fundamental Rights), Chapter "Right.' },
                { text: 'Article 32 and Article 226 are identical', outcome: 'Not quite — Students often believe Article 32 and Article 226 are identical because both issue writs.', reveals: 'article-32-and-article-226' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_011', title: 'Relationship between Fundamental Rights and Directive Principles',
          caseStudy: { intro: 'Imagine a state government passes a law acquiring private land for a housing project for the poor (a Directive Principle under Article 39(b)), but the law pays.',
            decisions: [{ prompt: 'Which Supreme Court case first held that in case of conflict between Fundamental Rights and Directive Principles, the Fundamental Rights.', options: [
                { text: 'State of Madras v', outcome: 'State of Madras v. Champakam Dorairajan (1951). A wrong answer (e.g., Kesavananda Bharati.' },
                { text: 'just suggestions', outcome: 'Not quite — Students often think Directive Principles are "just suggestions" with no legal force, or that.', reveals: 'directive-principles-are-just-suggestions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a moot-court prep, a student argues: \'Article 19(1)(a) is a Fundamental Right, so the government can\'t touch hate speech — fundamental means absolute.\' He also claims \'rights only bind government offices — a private hospital can\'t violate them.\'',
            decisions: [{ prompt: 'What do the restriction clauses and Article 12 actually say?', options: [
                { text: 'Read the right with its clauses: \'fundamental\' means constitutionally guaranteed and justiciable — not absolute; Article 19(2) lists eight grounds for reasonable restriction including public order and incitement, and Articles 21–24 carry their own limits. And \'State\' under Article 12 reaches beyond government offices — ONGC, SEBI, aided universities — but private bodies count only under \'deep and pervasive\' state control, not merely because they serve the public.', outcome: 'The moot argument gains precision: rights bind an expanded-but-bounded \'State\', and every right is read alongside the restrictions the same Constitution wrote in.' },
                { text: 'Stand on \'absolute\' — calling a right fundamental means no legislature can restrict it.', outcome: 'The Constitution itself writes the exceptions: 19(2), 21, 22 all authorise restrictions — quoting the right while ignoring its clause misreads the text.', reveals: 'fundamental-means-absolute' },
                { text: 'Keep \'government offices only\' — Article 12\'s \'State\' means departments, not companies.', outcome: 'Article 12 deliberately says \'other authorities\': deep and pervasive state control brings corporations and aided bodies in — the test is control, not public function alone.', reveals: 'state-means-only-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_012', title: 'You made it',
          caseStudy: { intro: 'Rights with no restriction clauses would collide with each other — the limits are how many rights can coexist at once.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_007', difficulty: 'standard',
          question: 'The Right against Exploitation under Articles 23 and 24 of the Indian.',
          hint: 'Revisit c11_ps_cbse_11_002 (Fundamental Rights framework) and c11_ps_cbse_11_003 (Article.',
          misconception: 'Students often think Article 23 applies *only* to the government (like Article 14) and that "forced labour" requires.',
          parts: [
                { id: 'a', prompt: 'A brick kiln owner in Tamil Nadu advances ₹20,000 to a migrant family from Odisha.', answer: 'Article 23 violated –',
                  options: ['Article 23 violated –', 'forced labour'],
                  hint: 'Revisit c11_ps_cbse_11_002 (Fundamental Rights framework) and c11_ps_cbse_11_003 (Article 17.',
                  misconception: 'Students often think Article 23 applies *only* to the government (like Article 14) and that "forced labour" requires physical coercion.' },
                { id: 'b', prompt: 'Compare the enforcement mechanism of Article 23 (forced labour) with Article 24 (child labour).', answer: 'Article 23(2) allows State-imposed compulsory public service',
                  options: ['Article 23(2) allows State-imposed compulsory public service', 'forced labour'],
                  hint: 'Revisit c11_ps_cbse_11_002 (Fundamental Rights framework) and c11_ps_cbse_11_003 (Article 17.',
                  misconception: 'Students often think Article 23 applies *only* to the government (like Article 14) and that "forced labour" requires physical coercion.' }
          ],
            remediations: { 'article-23-applies-only-to': { steps: ['Re-read Article 23 text – note "traffic in human beings and begar and *other similar forms of forced labour*" – the.', 'Study *PUDR v. Union of India* (1982) summary – focus on Bhagwati J.\'s definition: "force" includes "compulsion arising.', 'Contrast with Article 14 (State action only) – write one sentence: "Article 23 binds private employers; Article 14.', 'Solve a mini-case: "A domestic worker is not paid for 6 months; employer says \'she agreed to work for food/shelter\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Article 23 applies *only* to the government (like Article 14) and that "forced labour" requires.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the Child Labour (Prohibition and Regulation) Amendment Act, 2016 in light of Article 24.', answer: 'Yes, it dilutes Article 24',
                  options: ['Yes, it dilutes Article 24', 'forced labour'],
                  hint: 'Revisit c11_ps_cbse_11_002 (Fundamental Rights framework) and c11_ps_cbse_11_003 (Article 17.',
                  misconception: 'Students often think Article 23 applies *only* to the government (like Article 14) and that "forced labour" requires physical coercion.' },
                { id: 'b', prompt: 'Draft a one-paragraph provision for a hypothetical "Article 23A" that addresses *modern forms of exploitation* not explicitly covered in 1950 (e.g.', answer: '"Article 23A: Prohibition of Algorithmic and Technological Exploitation',
                  options: ['"Article 23A: Prohibition of Algorithmic and Technological Exploitation', 'forced labour'],
                  hint: 'Revisit c11_ps_cbse_11_002 (Fundamental Rights framework) and c11_ps_cbse_11_003 (Article 17.',
                  misconception: 'Students often think Article 23 applies *only* to the government (like Article 14) and that "forced labour" requires physical coercion.' }
          ],
            remediations: { 'article-23-applies-only-to': { steps: ['Re-read Article 23 text – note "traffic in human beings and begar and *other similar forms of forced labour*" – the.', 'Study *PUDR v. Union of India* (1982) summary – focus on Bhagwati J.\'s definition: "force" includes "compulsion arising.', 'Contrast with Article 14 (State action only) – write one sentence: "Article 23 binds private employers; Article 14.', 'Solve a mini-case: "A domestic worker is not paid for 6 months; employer says \'she agreed to work for food/shelter\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_008', difficulty: 'standard',
          question: 'The Right to Freedom of Religion (Articles 25-28) guarantees every person.',
          hint: 'Revisit Article 19(2)-(6) reasonable restrictions framework.',
          misconception: 'Students believe "secularism in India means the state has nothing to do with religion" (strict separation like the US).',
          parts: [
                { id: 'a', prompt: 'In the Shirur Mutt case (1954), the Supreme Court introduced the "essential religious practices" test.', answer: 'The test was necessary',
                  options: ['The test was necessary', 'the test determines if a practice is religious or secular', 'secularism in India means the state has nothing to do with religion'],
                  hint: 'Revisit Article 19(2)-(6) reasonable restrictions framework in c11_ps_cbse_11_005—Articles 25-28.',
                  misconception: 'Students believe "secularism in India means the state has nothing to do with religion" (strict separation like the US).' },
                { id: 'b', prompt: 'A state government passes a law requiring all religious institutions to disclose their financial accounts annually to a state-appointed auditor.', answer: 'The law likely does NOT violate Article 26',
                  options: ['The law likely does NOT violate Article 26', 'any state interference violates Article 26', 'secularism in India means the state has nothing to do with religion'],
                  hint: 'Revisit Article 19(2)-(6) reasonable restrictions framework in c11_ps_cbse_11_005—Articles 25-28.',
                  misconception: 'Students believe "secularism in India means the state has nothing to do with religion" (strict separation like the US).' },
                { id: 'c', prompt: 'Compare the Indian model of secularism (Articles 25-28) with the US "Establishment Clause" model (First Amendment).', answer: 'Two structural differences: (1) **Positive vs',
                  options: ['Two structural differences: (1) **Positive vs', 'India copied the US model', 'secularism in India means the state has nothing to do with religion'],
                  hint: 'Revisit Article 19(2)-(6) reasonable restrictions framework in c11_ps_cbse_11_005—Articles 25-28.',
                  misconception: 'Students believe "secularism in India means the state has nothing to do with religion" (strict separation like the US).' }
          ],
            remediations: { 'secularism-in-india-means-the': { steps: ['Read Article 25(2) verbatim—notice the phrase "nothing in this article shall affect the operation of any existing law.', 'Compare with the US First Amendment text—identify the absence of any "social welfare and reform" clause.', 'Study the Constituent Assembly debate (CAD Vol. VII, 2-3 December 1948) where K.T.', 'Apply to a live example: the 2019 Triple Talaq Act—Parliament reformed a Muslim personal law practice using Article.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_009', difficulty: 'standard',
          question: 'Cultural and Educational Rights under Articles 29 and 30 of the Indian.',
          hint: 'If stuck, revisit Article 15(1) and Article 19(1)(g) in node c11_ps_cbse_11_004 and.',
          misconception: 'Students often believe Article 30 gives minority institutions *absolute* autonomy – that the government cannot regulate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cultural and Educational Rights under Articles 29 and 30 of the Indian Constitution',
                  options: ['Cultural and Educational Rights under Articles 29 and 30 of the Indian Constitution', 'Rights in a constitution are legally enforceable guarantees that limit state power and', 'Fundamental Rights (Articles 12-35) are justiciable constitutional guarantees in Part III', 'The Right to Equality (Articles 14–18) guarantees that the State shall not deny any'],
                  hint: 'If stuck, revisit Article 15(1) and Article 19(1)(g) in node c11_ps_cbse_11_004 and.',
                  misconception: 'Students often believe Article 30 gives minority institutions *absolute* autonomy – that the government cannot regulate their admissions.' }
          ],
            remediations: { 'article-30-gives-minority-institutions': { steps: ['If the student holds this misconception, do the following: 1.', 'Re-read Article 30(1) text: "right to establish and administer" – highlight that "administer" is not defined.', 'Review the NCERT textbook box on "Minority Rights" (Chapter 2) which states regulations for "educational standards" are.', 'Work through a concrete example: A minority school wants to appoint unqualified teachers; ask "Can the state prescribe.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_010', difficulty: 'standard',
          question: 'Article 32 of the Indian Constitution guarantees the Right to Constitutional.',
          hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights: Articles 12-35) to review the.',
          misconception: 'Students often believe Article 32 and Article 226 are identical because both issue writs.',
          parts: [
                { id: 'a', prompt: 'A citizen\'s right to freedom of speech (Article 19(1)(a)) is violated by a state government order.', answer: 'The Supreme Court would reject the objection',
                  options: ['The Supreme Court would reject the objection', 'Article 32 and Article 226 are identical'],
                  hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights: Articles 12-35) to review the list.',
                  misconception: 'Students often believe Article 32 and Article 226 are identical because both issue writs.' },
                { id: 'b', prompt: 'A municipal corporation refuses to issue a trade license to a street vendor despite the vendor meeting all legal requirements.', answer: 'The appropriate writ is Mandamus ("we command")',
                  options: ['The appropriate writ is Mandamus ("we command")', 'Article 32 and Article 226 are identical'],
                  hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights: Articles 12-35) to review the list.',
                  misconception: 'Students often believe Article 32 and Article 226 are identical because both issue writs.' },
                { id: 'c', prompt: 'Compare the scope of Article 32 (Supreme Court) and Article 226 (High Courts) on three dimensions: (a) territorial jurisdiction, (b) types of rights.', answer: 'territorial jurisdiction, (',
                  options: ['territorial jurisdiction, (', 'Article 32 and Article 226 are identical'],
                  hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights: Articles 12-35) to review the list.',
                  misconception: 'Students often believe Article 32 and Article 226 are identical because both issue writs.' }
          ],
            remediations: { 'article-32-and-article-226': { steps: ['Read Article 32 and Article 226 text side-by-side from the bare Constitution.', 'Create a three-column table: Feature | Article 32 | Article 226.', 'Apply to two scenarios: (a) Violation of Article 19 by state government - where can you go?', 'Read the 44th Amendment change to Article 359 to understand which Fundamental Rights\' enforcement cannot be suspended.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_011', difficulty: 'standard',
          question: 'The relationship between Fundamental Rights (Part III, Articles 12-35) and.',
          hint: 'If stuck, revisit Article 37 (non-justiciability of Directive Principles) and Article 32.',
          misconception: 'Students often think Directive Principles are "just suggestions" with no legal force, or that Fundamental Rights always.',
          parts: [
                { id: 'a', prompt: 'Which Supreme Court case first held that in case of conflict between Fundamental Rights and Directive Principles, the Fundamental Rights would prevail?', answer: 'State of Madras v',
                  options: ['State of Madras v', 'just suggestions'],
                  hint: 'If stuck, revisit Article 37 (non-justiciability of Directive Principles) and Article 32 (remedies.',
                  misconception: 'Students often think Directive Principles are "just suggestions" with no legal force, or that Fundamental Rights always automatically trump.' },
                { id: 'b', prompt: 'A state enacts a law nationalising all private hospitals to implement Article 47 (improving public health). The law provides no compensation.', answer: 'Article 19(1)(g) prevails',
                  options: ['Article 19(1)(g) prevails', 'Directive Principle prevails', 'just suggestions'],
                  hint: 'If stuck, revisit Article 37 (non-justiciability of Directive Principles) and Article 32 (remedies.',
                  misconception: 'Students often think Directive Principles are "just suggestions" with no legal force, or that Fundamental Rights always automatically trump.' }
          ],
            remediations: { 'directive-principles-are-just-suggestions': { steps: ['Re-read Article 31C text (current version) and identify exactly which Directive Principles and which Fundamental Rights.', 'Create a timeline: 1951 Champakam → 1967 Golaknath → 1971 25th Amendment → 1973 Kesavananda → 1976 42nd Amendment →.', 'For each step, write one sentence on what the ruling/amendment did to the relationship.', 'Practice the "harmonious construction" technique: take a Fundamental Right (e.g., Article 19(1)(g)) and a Directive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_012', difficulty: 'standard',
          question: 'Suspension of Fundamental Rights during Emergency refers to the constitutional.',
          hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights list), c11_ps_cbse_11_005.',
          misconception: 'Students commonly believe that "all Fundamental Rights are suspended during Emergency" or that "Article 359 suspends.',
          parts: [
                { id: 'a', prompt: 'Why did the 44th Amendment (1978) restrict the automatic suspension of Article 19 freedoms only to emergencies proclaimed on grounds of "war or external.', answer: 'The 44th Amendment made this distinction',
                  options: ['The 44th Amendment made this distinction', 'no difference', 'armed rebellion is more serious'],
                  hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights list), c11_ps_cbse_11_005 (Article 19.',
                  misconception: 'Students commonly believe that "all Fundamental Rights are suspended during Emergency" or that "Article 359 suspends the rights.' },
                { id: 'b', prompt: 'A National Emergency is proclaimed on grounds of war. The President issues an Order under Article 359 suspending the right to move courts for enforcement.', answer: 'The suspension of Article 21 is constitutionally invalid',
                  options: ['The suspension of Article 21 is constitutionally invalid', 'all are valid', 'only Article 14 is invalid', 'basic structure'],
                  hint: 'If stuck, revisit c11_ps_cbse_11_002 (Fundamental Rights list), c11_ps_cbse_11_005 (Article 19.',
                  misconception: 'Students commonly believe that "all Fundamental Rights are suspended during Emergency" or that "Article 359 suspends the rights.' }
          ],
            remediations: { 'students-commonly-believe-that-all': { steps: ['Re-read Article 359 text carefully - note it says "the right to move any court for the enforcement of such of the.', 'Create a two-column table: Column A "Right Suspended" vs Column B "Remedy Suspended" and classify each Article.', 'Review the 44th Amendment changes using the mnemonic "WAR-19, 20-21-NEVER" (Article 19 auto-suspended only for.', 'Read the ADM Jabalpur vs Shivkant Shukla (1976) case summary to understand the historical consequence of suspending.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
