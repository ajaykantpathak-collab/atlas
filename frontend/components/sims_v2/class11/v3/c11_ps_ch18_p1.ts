import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch18_p1: SimDef = {
    id: 'v3_c11_ps_ch18_p1',
    title: 'Constitution as a Living Document · Part 1/2',
    subtitle: 'Learn how a document can be living without being liquid.',
    classLevel: 11, subject: 'political_science', topic: 'Constitution as a Living Document · Part 1/2',
    chapters: ['c11_ps_ch18'],
    nodeIds: ['c11_ps_cbse_18_001', 'c11_ps_cbse_18_002', 'c11_ps_cbse_18_003', 'c11_ps_cbse_18_004', 'c11_ps_cbse_18_005', 'c11_ps_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional historian counting amendments honestly', intro: 'A constitution amended over a hundred times that still reads like itself — the changes are the maintenance, not the malfunction.', goal: 'Evaluate amendment frequency versus stability and the layers of amendment procedure.' },
    discovery: {
        question: '105+ amendments in 74 years — proof the Indian Constitution was defective from the start?',
        options: ['No — most changes were technical or simple-majority; the core held, and the Court struck the few amendments that attacked it', 'Yes — good constitutions never need amending', 'Yes — each amendment shows a design failure', 'No — because all 105 were ceremonial'],
        answer: 'No — most changes were technical or simple-majority; the core held, and the Court struck the few amendments that attacked it',
        hook: '\'Living document\' doesn\'t mean infinitely malleable — the 42nd Amendment learned that when its key provisions were struck down; the document grows within a core.',
    },
    teaching: [
        { title: 'Constitution as a living document: Why constitutions must evolve', text: 'A "living constitution" is a constitutional theory holding that the Constitution\'s meaning evolves through interpretation and amendment to address changing societal conditions, while its core.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_18_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort which changes need Article 368\'s special majority (and which don\'t), then judge whether state ratification makes the system undemocratically rigid.',
        labels: ['Constitution as a living', 'Amendment procedures in India', 'Simple majority vs special', 'Basic structure doctrine: Kesavananda', 'Judicial review of amendments', 'Constitutional amendments and'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_001', title: 'Constitution as a living document: Why constitutions must evolve',
          caseStudy: { intro: 'Imagine a Class 11 student in 2024 reading the original 1950 Constitution and noticing it mentions "telegraphs" but not "internet," protects "personal liberty".',
            decisions: [{ prompt: 'What is the primary constitutional provision that empowers Parliament to amend the Constitution, and what theoretical concept describes.', options: [
                { text: 'Article 368 is the amendment provision', outcome: 'Article 368 is the amendment provision; "living constitution" or "constitution as a living.' },
                { text: 'living document', outcome: 'Not quite — Students often believe "living document" means *any* change is permissible — that the Constitution.', reveals: 'living-document-means-any-change' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_002', title: 'Amendment procedures in India: Article 368 and types of amendments',
          caseStudy: { intro: 'Imagine a news headline: "Parliament passes Bill to change the President\'s term from 5 years to 6 years." As a Class 11 student, you ask: "Can they just.',
            decisions: [{ prompt: 'What is the exact constitutional provision that lays down the procedure for amending the Constitution of India?', options: [
                { text: 'Article 368', outcome: 'Article 368. A wrong answer (e.g., "Article 356" or "Article 370") reveals the student confuses.' },
                { text: 'Article 356', outcome: 'Not quite — Students often believe that **every** constitutional amendment must be passed under Article 368.', reveals: 'every-constitutional-amendment-must-be' },
                { text: 'Article 370', outcome: 'Not quite — Students often believe that **every** constitutional amendment must be passed under Article 368.', reveals: 'every-constitutional-amendment-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_004', title: 'Basic structure doctrine: Kesavananda Bharati case (1973)',
          caseStudy: { intro: 'Imagine you are a law clerk in 1973 reading the 703-page Kesavananda judgment: 13 judges, 11 opinions, no single majority opinion on what constitutes the basic.',
            decisions: [{ prompt: 'What was the precise constitutional question referred to the 13-judge Bench in Kesavananda Bharati v. State of Kerala (1973)?', options: [
                { text: 'The Bench was asked to determine the extent of Parliament\'s power to amend the', outcome: 'The Bench was asked to determine the extent of Parliament\'s power to amend the Constitution under.' },
                { text: 'whether land reform laws are valid', outcome: 'Not quite — Students often believe the Basic Structure Doctrine means "Fundamental Rights cannot be amended.".', reveals: 'the-basic-structure-doctrine-means' },
                { text: 'Fundamental Rights cannot be amended', outcome: 'Not quite — Students often believe the Basic Structure Doctrine means "Fundamental Rights cannot be amended.".', reveals: 'the-basic-structure-doctrine-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_005', title: 'Judicial review of amendments: Limits on the amending power',
          caseStudy: { intro: 'Imagine you read a news headline: "Parliament passes amendment removing judicial review of election disputes." As a Class 11 student, you wonder: can.',
            decisions: [{ prompt: 'Under Article 368 of the Indian Constitution, which body has the power to amend the Constitution, and what is the key limitation on this.', options: [
                { text: 'Parliament has the power to amend the Constitution under Article 368, but this power is', outcome: 'Parliament has the power to amend the Constitution under Article 368, but this power is limited.' },
                { text: 'no limitation exists', outcome: 'Not quite — Students often believe that once Parliament passes a constitutional amendment with the required.', reveals: 'once-parliament-passes-a-constitutional' },
                { text: 'the Constitution has been amended', outcome: 'Not quite — Students often believe that once Parliament passes a constitutional amendment with the required.', reveals: 'once-parliament-passes-a-constitutional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_006', title: 'Constitutional amendments and the balance between rigidity and flexibility',
          caseStudy: { intro: 'Imagine a school rulebook that is too hard to change — it becomes outdated and ignored — or too easy to change, so it loses its authority and purpose.',
            decisions: [{ prompt: 'According to Article 368, which type of constitutional amendment requires a special majority of Parliament and ratification by at least.', options: [
                { text: 'Amendments affecting the federal structure', outcome: 'Amendments affecting the federal structure — such as the election of the President (Articles 54.' },
                { text: 'all amendments require state ratification', outcome: 'Not quite — Students often think "flexibility" means the Constitution can be changed easily by the government.', reveals: 'flexibility-means-the-constitution-can' },
                { text: 'flexibility', outcome: 'Not quite — Students often think "flexibility" means the Constitution can be changed easily by the government.', reveals: 'flexibility-means-the-constitution-can' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a constitution-day editorial, a student claims: \'A living constitution means Parliament can rewrite anything by amendment — the 42nd Amendment was just evolution. And every constitutional change needs the special Article 368 majority.\'',
            decisions: [{ prompt: 'What limits and procedures actually govern amendment?', options: [
                { text: 'Draw both lines: \'living\' means evolving interpretation WITHIN an inviolable core — the basic structure doctrine (Kesavananda Bharati) let the Court strike parts of the 42nd Amendment in Minerva Mills for damaging judicial review and amending power itself. And not all changes need Article 368: creating a state (Art. 3) or a legislative council (Art. 169) proceeds by simple majority, expressly outside 368.', outcome: 'The editorial sharpens: adaptability ≠ malleability — the document bends inside its identity, and the amendment menu is three-tiered, not one.' },
                { text: 'Keep \'anything can change\' — a living document has no fixed core.', outcome: 'The basic structure doctrine exists precisely to bound evolution: Parliament\'s power to amend doesn\'t include the power to destroy the Constitution\'s identity.', reveals: 'living-means-unlimited' },
                { text: 'Insist all amendments need special majority — Article 368 governs constitutional change.', outcome: 'Several articles (4(2), 169, 239A…) expressly declare their changes NOT to be Article 368 amendments — simple majority suffices for those.', reveals: 'all-changes-need-368' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'Adaptability is the feature — a constitution that couldn\'t bend would have broken; the ones that survive are the ones allowed to grow.',
            decisions: [{ prompt: 'What comes next? Constitution as a Living Document · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Constitution as a Living Document · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_001', difficulty: 'standard',
          question: 'A "living constitution" is a constitutional theory holding that the.',
          hint: 'Revisit c10_civ_cbse_02_001 (Federalism) and c8_civ_ch3_9 (Judicial Review) — if you.',
          misconception: 'Students often believe "living document" means *any* change is permissible — that the Constitution has no fixed core.',
          parts: [
                { id: 'a', prompt: 'What is the primary constitutional provision that empowers Parliament to amend the Constitution, and what theoretical concept describes a constitution that.', answer: 'Article 368 is the amendment provision',
                  options: ['Article 368 is the amendment provision', 'living document'],
                  hint: 'Revisit c10_civ_cbse_02_001 (Federalism) and c8_civ_ch3_9 (Judicial Review) — if you cannot explain.',
                  misconception: 'Students often believe "living document" means *any* change is permissible — that the Constitution has no fixed core and can be rewritten.' },
                { id: 'b', prompt: 'A State government argues that the Centre\'s use of Article 356 (President\'s Rule) has evolved from "rare emergency measure" to "routine political tool,".', answer: 'This is constitutional decay',
                  options: ['This is constitutional decay', 'healthy evolution', 'parliamentary sovereignty', 'living document'],
                  hint: 'Revisit c10_civ_cbse_02_001 (Federalism) and c8_civ_ch3_9 (Judicial Review) — if you cannot explain.',
                  misconception: 'Students often believe "living document" means *any* change is permissible — that the Constitution has no fixed core and can be rewritten.' }
          ],
            remediations: { 'living-document-means-any-change': { steps: ['Re-read the Preamble and Article 368 side-by-side. Ask: "What words in the Preamble (sovereign, socialist, secular.', 'Read the *Kesavananda Bharati* holding (summarized in NCERT Class 11 Ch.', 'Apply to the 42nd Amendment — it tried to make Parliament\'s amending power *unlimited* (Clause 4/5 of Art.', 'Write one paragraph distinguishing "amendment within the Constitution" vs. "amendment *of* the Constitution\'s identity."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "living document" means *any* change is permissible — that the Constitution has no fixed core.',
          parts: [
                { id: 'a', prompt: 'Critique the argument: "Frequent amendments (105+ in 74 years) prove the Indian Constitution is defective — a good constitution should rarely need changing.".', answer: 'The argument confuses textual stability with constitutional health',
                  options: ['The argument confuses textual stability with constitutional health', 'living document'],
                  hint: 'Revisit c10_civ_cbse_02_001 (Federalism) and c8_civ_ch3_9 (Judicial Review) — if you cannot explain.',
                  misconception: 'Students often believe "living document" means *any* change is permissible — that the Constitution has no fixed core and can be rewritten.' },
                { id: 'b', prompt: 'Draft a 150-word preamble for a hypothetical "Constitution Amendment Review Commission" report that articulates the philosophical criteria for judging whether.', answer: 'A strong answer will articulate criteria such as: "Does the amendment expand',
                  options: ['A strong answer will articulate criteria such as: "Does the amendment expand', 'living document'],
                  hint: 'Revisit c10_civ_cbse_02_001 (Federalism) and c8_civ_ch3_9 (Judicial Review) — if you cannot explain.',
                  misconception: 'Students often believe "living document" means *any* change is permissible — that the Constitution has no fixed core and can be rewritten.' }
          ],
            remediations: { 'living-document-means-any-change': { steps: ['Re-read the Preamble and Article 368 side-by-side. Ask: "What words in the Preamble (sovereign, socialist, secular.', 'Read the *Kesavananda Bharati* holding (summarized in NCERT Class 11 Ch.', 'Apply to the 42nd Amendment — it tried to make Parliament\'s amending power *unlimited* (Clause 4/5 of Art.', 'Write one paragraph distinguishing "amendment within the Constitution" vs. "amendment *of* the Constitution\'s identity."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_002', difficulty: 'standard',
          question: 'Article 368 of the Indian Constitution prescribes the procedure for amending.',
          hint: 'Revisit Class 8 Civics Chapter 2 (Parliament) and Class 10 Civics Chapter 2 (Federalism).',
          misconception: 'Students often believe that **every** constitutional amendment must be passed under Article 368 with a special.',
          parts: [
                { id: 'a', prompt: 'What is the exact constitutional provision that lays down the procedure for amending the Constitution of India?', answer: 'Article 368',
                  options: ['Article 368', 'Article 356', 'Article 370'],
                  hint: 'Revisit Class 8 Civics Chapter 2 (Parliament) and Class 10 Civics Chapter 2 (Federalism) for.',
                  misconception: 'Students often believe that **every** constitutional amendment must be passed under Article 368 with a special majority.' }
          ],
            remediations: { 'every-constitutional-amendment-must-be': { steps: ['Read Article 368(1) text: "Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent.', 'Read Article 4(2): "No such law as aforesaid shall be deemed to be an amendment of this Constitution for the purposes.', 'Make a two-column list: "Under Article 368 (Special Majority ± States)" vs "Excluded from Article 368 (Simple.', 'Practice classifying 5 sample amendments (e.g., GST — 101st Amendment (special majority + states); NCT of Delhi — 69th.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_003', difficulty: 'standard',
          question: 'The Indian Constitution under Article 368 provides three distinct amendment.',
          hint: 'Revisit Article 368 text and the Seventh Schedule (Union/State/Concurrent Lists) to see.',
          misconception: 'Students often think that *any* amendment passed by two-thirds majority in Parliament is a \'special majority\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian Constitution under Article 368 provides three distinct amendment pathways: (1)',
                  options: ['The Indian Constitution under Article 368 provides three distinct amendment pathways: (1)', 'A "living constitution" is a constitutional theory holding that the Constitution\'s', 'Article 368 of the Indian Constitution prescribes the procedure for amending the', 'The Basic Structure Doctrine is a judicial principle established by the Supreme Court of'],
                  hint: 'Revisit Article 368 text and the Seventh Schedule (Union/State/Concurrent Lists) to see which.',
                  misconception: 'Students often think that *any* amendment passed by two-thirds majority in Parliament is a \'special majority\' amendment, ignoring the.' }
          ],
            remediations: { 'any-amendment-passed-by-two': { steps: ['Re-read Article 368 text carefully, noting the two clauses (special majority definition and proviso for ratification).', 'Make a three-column table listing 5-6 provisions under each category using the Constitution\'s schedules (e.g., Art.', 'For each, write *why* it belongs there (federal balance, individual rights, administrative detail).', 'Practice classifying 5 hypothetical amendment Bills using the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_004', difficulty: 'standard',
          question: 'The Basic Structure Doctrine is a judicial principle established by the Supreme.',
          hint: 'Re-read Article 368 and the 24th Amendment (which added Art. 13(4) and Art.',
          misconception: 'Students often believe the Basic Structure Doctrine means "Fundamental Rights cannot be amended." In reality.',
          parts: [
                { id: 'a', prompt: 'What was the precise constitutional question referred to the 13-judge Bench in Kesavananda Bharati v. State of Kerala (1973)?', answer: 'The Bench was asked to determine the extent of Parliament\'s power to amend the',
                  options: ['The Bench was asked to determine the extent of Parliament\'s power to amend the', 'whether land reform laws are valid', 'Fundamental Rights cannot be amended', 'the Basic Structure Doctrine means "Fundamental Rights cannot be amended'],
                  hint: 'Re-read Article 368 and the 24th Amendment (which added Art. 13(4) and Art.',
                  misconception: 'Students often believe the Basic Structure Doctrine means "Fundamental Rights cannot be amended." In reality, Kesavananda explicitly held.' },
                { id: 'b', prompt: 'A constitutional amendment passed by special majority under Article 368 replaces the parliamentary system with a presidential system and abolishes judicial.', answer: 'Step 1: Identify the basic structure elements affected',
                  options: ['Step 1: Identify the basic structure elements affected', 'valid because passed by special majority', 'Fundamental Rights cannot be amended', 'the Basic Structure Doctrine means "Fundamental Rights cannot be amended'],
                  hint: 'Re-read Article 368 and the 24th Amendment (which added Art. 13(4) and Art.',
                  misconception: 'Students often believe the Basic Structure Doctrine means "Fundamental Rights cannot be amended." In reality, Kesavananda explicitly held.' }
          ],
            remediations: { 'the-basic-structure-doctrine-means': { steps: ['If the student conflates "basic structure" with "Fundamental Rights," have them: (1) Read the 24th Amendment text.', '(2) List the six basic features from Sikri CJ\'s summary and mark which are Fundamental Rights vs.', '(3) Apply to a hypothetical: "Amendment converting India to a monarchy" — violates basic structure (republican form).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_005', difficulty: 'standard',
          question: 'Judicial review of amendments is the power of the Supreme Court and High Courts.',
          hint: 'If stuck, revisit c11_ps_cbse_18_002 for Article 368 procedure and c11_ps_cbse_18_004 for.',
          misconception: 'Students often believe that once Parliament passes a constitutional amendment with the required special majority under.',
          parts: [
                { id: 'a', prompt: 'A constitutional amendment is passed by Parliament with the required special majority under Article 368, inserting a new article that states: "Notwithstanding.', answer: 'No, the amendment would be unconstitutional',
                  options: ['No, the amendment would be unconstitutional', 'valid because special majority was followed', 'the Constitution has been amended', 'passed correctly'],
                  hint: 'If stuck, revisit c11_ps_cbse_18_002 for Article 368 procedure and c11_ps_cbse_18_004 for the.',
                  misconception: 'Students often believe that once Parliament passes a constitutional amendment with the required special majority under Article 368,.' }
          ],
            remediations: { 'once-parliament-passes-a-constitutional': { steps: ['If a student holds this misconception, take them through a three-step correction: (1) Read Article 368 text - it says.', 'in accordance with the procedure laid down in this article" - it does not say "and such amendment shall not.', 'Coelho (Ninth Schedule amendments post-1973 reviewable).', '(3) Apply to a concrete case: The 39th Amendment (1975) placed PM\'s election beyond judicial review.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_006', difficulty: 'standard',
          question: 'The balance between rigidity and flexibility in the Indian Constitution refers.',
          hint: 'Review Article 368 and the classification of amendments in node c11_ps_cbse_18_002 and.',
          misconception: 'Students often think "flexibility" means the Constitution can be changed easily by the government of the day, and.',
          parts: [
                { id: 'a', prompt: 'According to Article 368, which type of constitutional amendment requires a special majority of Parliament and ratification by at least half of the state.', answer: 'Amendments affecting the federal structure',
                  options: ['Amendments affecting the federal structure', 'all amendments require state ratification', 'flexibility', 'rigidity'],
                  hint: 'Review Article 368 and the classification of amendments in node c11_ps_cbse_18_002 and.',
                  misconception: 'Students often think "flexibility" means the Constitution can be changed easily by the government of the day, and "rigidity" means it can.' }
          ],
            remediations: { 'flexibility-means-the-constitution-can': { steps: ['If a student holds this misconception, have them create a three-column table: Column 1: Provision (e.g., "Admission.', 'Column 2: Majority required (Simple, Special, Special+States).', 'Column 3: Reason for that level of rigidity (administrative, rights protection, federal balance).', 'Use the text of Article 368 and the proviso to Article 368(2) to fill the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
